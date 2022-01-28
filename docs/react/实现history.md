---
sidebar_position: 2
---

# history 简单实现

## 为什么需要 history

- 浏览器默认行为

  - 当我们点击 a 标签，href 指向一个新的 url，window.history 更新，浏览器向新的 url 请求资源渲染页面。

- 前端路由

  - 当我们切换页面的时候，希望更新 history（地址栏也会随之更新），但是不向服务器请求新的页面。我们还需要监听 url 的变化以渲染对应的页面。

```jsx
;<a
  href="/contact"
  onClick={(event) => {
    // stop the browser from changing the URL and requesting the new document
    event.preventDefault()
    // push an entry into the browser history stack and change the URL
    window.history.pushState({}, undefined, "/contact")
  }}
/>

window.addEventListener("popstate", () => {
  // URL changed!
})
```

> But that only fires when the user clicks the back or forward buttons. There is no event for when the programmer called window.history.pushState or window.history.replaceState.

`popstate`事件只在用户点击前进或后退或调用`history.go`，`history.back`，`history.forward`时触发

调用`window.history.pushState`或`window.history.replaceState`不会触发

所以我们需要`history`这个库

```js
let history = createBrowserHistory()
history.listen((location, action) => {
  // this is called whenever new locations come in
  // the action is POP, PUSH, or REPLACE
})
```

[https://reactrouter.com/docs/en/v6/getting-started/concepts](https://reactrouter.com/docs/en/v6/getting-started/concepts)

## 如何使用

```js
// Create your own history instance.
import { createBrowserHistory } from "history"
let history = createBrowserHistory()

// ... or just import the browser history singleton instance.
import history from "history/browser"

// Alternatively, if you're using hash history import
// the hash history singleton instance.
// import history from 'history/hash';

// Get the current location.
let location = history.location

// Listen for changes to the current location.
let unlisten = history.listen(({ location, action }) => {
  console.log(action, location.pathname, location.state)
})

// Use push to push a new entry onto the history stack.
history.push("/home", { some: "state" })

// Use replace to replace the current entry in the stack.
history.replace("/logged-in")

// Use back/forward to navigate one entry back or forward.
history.back()

// To stop listening, call the function returned from listen().
unlisten()

let unblock = history.block((tx) => {
  // Navigation was blocked! Let's show a confirmation dialog
  // so the user can decide if they actually want to navigate
  // away and discard changes they've made in the current page.
  let url = tx.location.pathname
  if (window.confirm(`Are you sure you want to go to ${url}?`)) {
    // Unblock the navigation.
    unblock()

    // Retry the transition.
    tx.retry()
  }
})
```

## 简单实现

```js
function createBrowserHistory() {
  let action = "pop"
  let location = window.location

  let listeners = []

  let globalHistory = window.history

  function handlePop() {
    action = "pop"
    listeners.forEach((l) => l())
  }

  // back、forward、go
  window.addEventListener("popstate", handlePop)

  function push(to) {
    action = "push"
    globalHistory.pushState({}, "", to)
    listeners.forEach((l) => l())
  }

  function replace(to) {
    action = "replace"
    globalHistory.replaceState({}, "", to)
    listeners.forEach((l) => l())
  }

  function go(num) {
    // 触发popstate
    globalHistory.go(num)
  }

  const history = {
    // 每次都能获得最新值
    get action() {
      return action
    },
    location,

    push,
    replace,
    go,
    back() {
      go(-1)
    },
    forward() {
      go(1)
    },

    listen(listener) {
      listeners.push(listener)
      return () => {
        listeners.filter((l) => l !== listener)
      }
    },
  }
  return history
}
```
