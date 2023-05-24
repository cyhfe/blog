---
sidebar_position: 2
---

# react-router 简单实现

## 简单实现

![](/img/router.gif)

```js
import React, { createContext, useContext, useRef, useState } from "react"
import reactDOM from "react-dom"

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

export default function App() {
  const [, setState] = useState({})

  return (
    <Router forceUpdate={() => setState({})}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </div>
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}

const HistoryContext = createContext(null)
function Router({ forceUpdate, children }) {
  let historyRef = React.useRef()
  if (historyRef.current == null) {
    let history = createBrowserHistory()
    history.listen(() => {
      forceUpdate()
    })
    historyRef.current = history
  }

  return (
    <>
      <HistoryContext.Provider value={historyRef.current}>
        {children}
      </HistoryContext.Provider>
    </>
  )
}

function Link({ to, children }) {
  const history = useContext(HistoryContext)
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault()
        history.push(to)
      }}
    >
      {children}
    </a>
  )
}

function Route({ path, children }) {
  const {
    location: { pathname },
  } = useContext(HistoryContext)
  return path.match(new RegExp(pathname)) ? children : null
}

const root = document.getElementById("app")
reactDOM.render(<App />, root)
```
