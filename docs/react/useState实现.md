---
sidebar_position: 1
---

# useState 简单实现

```js
let componentHooks = []
let currentHookIndex = 0

// How useState works inside React (simplified).
function useState(initialState) {
  let pair = componentHooks[currentHookIndex]
  if (pair) {
    // This is not the first render,
    // so the state pair already exists.
    // Return it and prepare for next Hook call.
    currentHookIndex++
    return pair
  }

  // This is the first time we're rendering,
  // so create a state pair and store it.
  pair = [initialState, setState]

  function setState(nextState) {
    // When the user requests a state change,
    // put the new value into the pair.
    pair[0] = nextState
    updateDOM()
  }

  // Store the pair for future renders
  // and prepare for the next Hook call.
  componentHooks[currentHookIndex] = pair
  currentHookIndex++
  return pair
}
```
