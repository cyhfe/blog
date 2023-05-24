---
sidebar_position: 1
---

# 异步请求 hook 封装

这是我在[Epic React](https://epicreact.dev/)上学到的。

与其他请求库不同之处，就是返回的`run`函数。

`run`接受一个 promise 去更新状态。

`run`是交给用户去调用的。

```jsx
useEffect(() => {
  run(request(state))
}, [state, run])
```

为了让抽象有更高的自由度，将控制权交给外部。

这种模式叫`inversion-of-control`。

举个例子：

```js
// filter抽象了过滤功能
// 将具体怎么过滤交给callback去控制
const array = [1, 2, 3]
const callback = (v = v > 1)
array.filter(callback)
```

具体概念可以参考这篇博客:

[inversion-of-control](https://kentcdodds.com/blog/inversion-of-control)

## 使用方式

```jsx
import React, { useEffect, useState } from "react"

const request = (state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      !!state
        ? resolve("Submitted successfully 🙌")
        : reject("Oh no there was an error 😞")
    }, 1000)
  })
}

const Demo = () => {
  const { isLoading, data, error, run } = useAsync()

  //highlight-start
  useEffect(() => {
    run(request(state))
  }, [state, run])
  //highlight-end

  const renderContent = () => {
    if (isLoading) {
      return <div>loading...</div>
    }
    if (error) {
      return <div>{JSON.stringify(error)}</div>
    }
    if (data) return <div>{JSON.stringify(data)}</div>
  }
  return <div>{renderContent()}</div>
}

export default Demo
```

## useSafeDispatch

解决的问题：当一个异步请求发送出去，还未响应之前，如果卸载了组件（比如切换 tab），callback 调用 dispatch 就会抛出错误。

```jsx
import { useCallback, useLayoutEffect, useRef } from "react"

// 接受一个 dispatch（useReducer 返回值的第二个参数），返回新的 safeDispatch。
export default function useSafeDispatch(dispatch) {
  const mountedRef = useRef(false)

  useLayoutEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  // 在组件卸载之后，不再调用 dispatch。
  const safeDispatch = useCallback(
    (...arg) => {
      mountedRef.current ? dispatch(...arg) : void 0
    },
    [dispatch]
  )

  return safeDispatch
}
```

## useAsync

```jsx
import { useReducer, useCallback } from "react"

// 使用useReducer管理状态
export function reducer(state, action) {
  switch (action.type) {
    case "pending": {
      return {
        ...state,
        status: "pending",
        error: null,
        data: null·,
      }
    }
    case "resolve": {
      return {
        ...state,
        data: action.payload,
        error: null,
        status: "idle",·
      }
    }
    case "reject": {
      return {
        ...state,
        error: action.payload,
        status: "idle",
        data: null,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type} `)
    }
  }
}

export default function useAsync(initialState) {
  const [state, dispatch] = useReducer(reducer, {
    status: "idle",
    error: null,
    data: null,
    ...initialState,
  })

  const safeDispatch = useSafeDispatch(dispatch)

  const { status, data, error } = state

  const isIdle = status === "idle"
  const isLoading = status === "pending"

  // highlight-start
  const run = useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error("run need promise as params")
      }
      safeDispatch({ type: "pending" })
      promise.then(
        (data) => safeDispatch({ type: "resolve", payload: data }),
        (error) => safeDispatch({ type: "reject", payload: error })
      )
    },
    [safeDispatch]
  )
  // highlight-end


  return {
    status,
    error,
    data,

    isIdle,
    isLoading,

    run,
  }
}
```
