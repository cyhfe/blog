---
sidebar_position: 1
---

# useRef

## useRef lazy init

[https://github.com/facebook/react/issues/14490](https://github.com/facebook/react/issues/14490)

```jsx
const instance = React.useRef(null)
if (instance.current == null) {
  instance.current = {
    // whatever you need
  }
}
```
