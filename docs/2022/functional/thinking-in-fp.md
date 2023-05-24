# thinking functionally

## do something only once

```js
const once = (f) => {
  let done = false
  return (...args) => {
    if (!done) {
      f(...args)
      done = true
    }
  }
}

// 不加变量版本
const once = (f, done = false) => {
  return (...args) => {
    if (!done) {
      f(...args)
      done = true
    }
  }
}
```

```js
const onceAndAfter = (f, g) => {
  let done = false
  return (...args) => {
    if (!done) {
      f(...args)
    } else {
      g(...args)
    }
  }
}
```

```js
const thisMantTimes = (fn, n) => {
  let counter = 0
  return (...args) => {
    if (counter < n) {
      fn(...args)
      counter++
    }
  }
}
```

## Alternating functions

```js
let sayA = () => console.log("A")
let sayB = () => console.log("B")
let alt = alternator(sayA, sayB)
alt() // A
alt() // B
alt() // A
alt() // B alt(); // A alt(); // B

function alternator(f, g) {
  let counter = 0
  return () => {
    if (counter % 2 === 0) {
      f()
      counter++
    } else {
      g()
      counter++
    }
  }
}
```
