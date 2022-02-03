---
sidebar_position: 10
---

```jsx
function useLocalStorageState(
  key,
  initialValue = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = localStorage.getItem(key)
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage)
      } catch (err) {
        localStorage.removeItem(key)
      }
    }
    return typeof initialValue === "function" ? initialValue() : initialValue
  })
  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  })

  return [state, setState]
}
```
