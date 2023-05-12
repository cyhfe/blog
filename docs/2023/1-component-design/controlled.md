---
sidebar_position: 3
---

# 受控和非受控组件

API：value, default, onChange

受控：组件状态由外部组件提供,提供 onChange 回调让外部更新状态
非受控：组件自身维护状态

```tsx
// 通过有没有value值判断是否受控：1.受控自己维护状态 2.非受控使用外部值，set为空函数
function useControlledState<T = any>(
  value: T | undefined,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [unControlledState, setUnControlledState] =
    React.useState(defaultValue);
  const wasControlled = value !== undefined;
  const isControlledRef = React.useRef(wasControlled);

  if (isControlledRef.current !== wasControlled) {
    console.warn(
      `Components should not switch from controlled to uncontrolled `
    );
  }

  const set: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (nextState) => {
      if (!isControlledRef.current) {
        setUnControlledState(nextState);
      }
    },
    []
  );

  return [isControlledRef.current ? (value as T) : unControlledState, set];
}
```

```tsx
// 使用
<button
  type="button"
  onClick={() => {
    // 受控：空函数 非受控：更新状态
    ctx.setCount((c) => c + 1);
    // 不管受控与否，将最新的值提供给外部。如果是受控，外部组件可以更新状态。
    ctx.onChange(ctx.count + 1);
  }}
>
  +
</button>
```
