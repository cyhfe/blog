# 深入理解 reduce

## polyfill

```js
Array.prototype.reduce = function (callbackFn, initialValue) {
  if (!callbackFn || typeof callbackFn !== "function") throw TypeError()
  var len = this.length
  var i = 0
  if (typeof initialValue === "undefined" || initialValue === null) {
    initialValue = this[0]
    ++i
  }
  for (; i < len; i++) {
    initialValue = callbackFn.apply(this, [initialValue, this[i], i, this])
  }
  return initialValue
}
```

## redux 中的 compose

```js
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => {
    return a(b(...args))
  })
}
```

```js
function logger({ getState }) {
  // dispatch({ type: "add" })
  // 不能在这里调dispatch

  // (store.dispatch)
  return (next) => (action) => {
    console.log("will dispatch", action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log("state after dispatch", getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

const chain = middlewares.map((middleware) => middleware(middlewareAPI))
// 当调用dispatch时，调用所有中间间
dispatch = compose(...chain)(store.dispatch)
```
