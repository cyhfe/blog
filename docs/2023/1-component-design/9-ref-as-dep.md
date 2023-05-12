---
sidebar_position: 9
---

# 不要将 ref 作为 useEffect 依赖

ref 不会触发重新渲染，而 useEffect 是 DOM 更新之后的副作用。

在 effect 中使用的任何在更新时不会触发重新渲染的东西都不应该进入依赖数组。

```tsx
// ref值变了，effect没有重新执行
export default function App() {
  const ref = React.useRef(0)
  React.useEffect(() => {
    console.log(ref.current)
  }, [ref.current])
  return (
    <div>
      <button onClick={() => ref.current++}>+</button>
    </div>
  )
}
```

如果 effect 依赖 ref

1. forceUpdate
2. 可以将 ref 保存到 state 中。

```tsx
export default function App() {
  const [, forceUpdate] = React.useState({})
  const countRef = React.useRef(0)
  React.useEffect(() => {
    console.log(countRef)
  }, [countRef.current])
  return (
    <div>
      <button
        onClick={() => {
          countRef.current++
          forceUpdate({})
        }}
      >
        change
      </button>
    </div>
  )
}
```

[https://epicreact.dev/why-you-shouldnt-put-refs-in-a-dependency-array/](https://epicreact.dev/why-you-shouldnt-put-refs-in-a-dependency-array/)
