---
sidebar_position: 10
---

# 监控 DOM 位置属性变化

## api

```tsx
function observeRect(dom: HTMLElement, onChange: (rect: DOMRect) => void) => {observe, unobserve}
```

[https://stackblitz.com/edit/vitejs-vite-x1hsdo?file=index.html,src%2Fmain.ts,src%2FobserveRect.ts&terminal=dev](https://stackblitz.com/edit/vitejs-vite-x1hsdo?file=index.html,src%2Fmain.ts,src%2FobserveRect.ts&terminal=dev)

## 核心思路

一个全局`Map`集合,保存订阅的 DOM 和对应的`DOMRect`属性。

函数`observeRect`返回订阅和取消订阅两个方法。接受 onChange 参数回调将更改通知到外部。

订阅：

1. 检查 Map，该 DOM 不存在，将 DOM 和 Rect 保存在 Map 中。已存在，将 onChange push 到 callbacks 中
2. 调用`requestAnimationFrame`，遍历 Map 中的 DOM，查询最新的 Rect 并与旧 Rect 对比，如果变更了通过 onChange 通知

取消订阅：
将 DOM 从 Map 集合中移除。如果 Map 为空，停止`requestAnimationFrame`递归

```tsx | pure
const observable = new Map<HTMLElement, RectProps>()
```

```tsx | pure
// DOMRect属性不可枚举，Object.keys拿不到
const rectKeys: (keyof DOMRect)[] = [
  "bottom",
  "height",
  "left",
  "right",
  "top",
  "width",
  "x",
  "y",
]

interface RectProps {
  rect: DOMRect
  callbacks: ((rect: DOMRect) => void)[]
}

let rid: number | null = null
const observable = new Map<HTMLElement, RectProps>()

function hasChanged(prev: DOMRect, curr: DOMRect) {
  let changed = false
  rectKeys.forEach((key) => {
    if (prev[key] !== curr[key]) {
      changed = true
      return
    }
  })
  return changed
}

function run(observable: Map<HTMLElement, RectProps>) {
  observable.forEach((prevRectProps, element) => {
    const currRect = element.getBoundingClientRect()
    const changed = hasChanged(prevRectProps.rect, currRect)
    if (changed) {
      const nextRectProps = {
        ...prevRectProps,
        rect: currRect,
      }
      observable.set(element, nextRectProps)
      nextRectProps.callbacks.forEach((cb) => cb(currRect))
    }
  })
  rid = requestAnimationFrame(() => {
    run(observable)
  })
}

function observeRect(dom: HTMLElement, onChange: (rect: DOMRect) => void) {
  function observe() {
    if (!observable.has(dom)) {
      const rect = dom.getBoundingClientRect()
      observable.set(dom, {
        callbacks: [onChange],
        rect,
      })
      onChange(rect)
    } else {
      const currentrectProps = observable.get(dom)!
      currentrectProps.callbacks.push(onChange)
    }

    if (observable.size > 0 && rid === null) {
      rid = requestAnimationFrame(() => {
        run(observable)
      })
    }
  }
  function unobserve() {
    observable.delete(dom)
    if (observable.size === 0 && rid !== null) {
      cancelAnimationFrame(rid)
      rid = null
    }
  }
  return {
    observable,
    observe,
    unobserve,
  }
}

export default observeRect
```

## 在 React 中使用: useRect

```tsx | pure
import { useStableCallback } from "rcl/useStableCallback"
import React from "react"
import observeRect from "./observeRect"

function useRect(
  ref: React.RefObject<HTMLElement | null>,
  options: {
    observe?: boolean
    onChange?: (rect: DOMRect) => void
  } = { observe: true }
) {
  const { observe, onChange } = options

  // onChange作为依赖，详见博客
  const stableOnchange = useStableCallback(onChange)

  const [rect, setRect] = React.useState<DOMRect | null>(null)

  // ref不触发重新渲染，effect在重新渲染之后才执行: 详见博客
  // 将element作为状态
  const [element, setElement] = React.useState(ref.current)

  // 初始化不订阅的时候，我们要手动设置element的rect
  const initialRectIsSet = React.useRef(false)

  React.useEffect(() => {
    setElement(ref.current)
    return () => {
      setElement(null)
    }
  }, [ref])

  // useLayoutEffect避免屏幕闪烁
  React.useLayoutEffect(() => {
    if (!element) return

    //初始化不订阅的时候，我们要手动设置element的rect
    if (!observe) {
      if (!initialRectIsSet.current) {
        setRect(element.getBoundingClientRect())
        stableOnchange(element.getBoundingClientRect())
      }
      return
    }
    let observal = observeRect(element, (rect) => {
      setRect(rect)
      stableOnchange(rect)
    })

    observal.observe()
    return () => {
      observal.unobserve()
    }
  }, [element, observe, stableOnchange])
  return rect
}

export default useRect
```

## 性能考虑

一般情况下，我们直接通过`el.getBoundingRect`获取元素位置信息就好，随用随取。

我在写`Tooltip`的时候，popup 的元素使用`portal`渲染在外部，trigger 元素在组件内部。

如何让 popup 定位到指定位置，我需要 trigger 和 popup 的元素位置信息去计算。

trigger 随时会变化，有些可以通过`onScroll, onResize`来重新计算，但是有 DOM 内容等其他无法捕获的改变。

`useRect`接受`observe`选项来控制订阅。所以可以只在`tooltip`组件`visible`的时候订阅。
