---
sidebar_position: 8
---

# 性能优化

1. 优化 DOM 操作

- key: 更新属性而不必删除创建
- 避免重排操作.特别是动画.(transform,animation, ) > (position,width, height)

1. 优化重新渲染(渲染指调用组件函数生成 vdom 及 Fiber 的过程)
   - useCallback, memo, 巧用 ref, 减少重新渲染
   - useMemo 缓存计算量大的操作

## 惰性初始化

`useState`可以接受一个函数并把返回值作为初始值。

如果初始值是个需要耗时的任务，每次更新都会重复计算，而`useState`更新时会忽略初始值，是个没有必要的计算。

```jsx
function expensiveInitial() {
  return initialState;
}
const [state, setState] = useState(() => expensiveInitial());
```

### useRef: 实例化需要昂贵的计算

[https://github.com/facebook/react/issues/14490#issuecomment-454973512](https://github.com/facebook/react/issues/14490#issuecomment-454973512)

```jsx
function Foo() {
  const instanceRef = useRef(null);

  function getInstance() {
    let instance = instanceRef.current;
    if (instance !== null) {
      return instance;
    }
    // Lazy init
    let newInstance = new Instance();
    instanceRef.current = newInstance;
    return newInstance;
  }

  // Whenever you need it...
  const instance = getInstance();
  // ...
}
```

## 状态下沉

尽可能将状态下沉避免不必要的重新渲染。

每次 setState 都会导致从状态改变的组件开始递归向下重新渲染。

比如有一个`input`搜索按钮，如果它的状态在应用上层，每次输入变化都会使整个应用重新渲染，这是没必要的。

让它自己维护状态，在提交时再去改变应用的状态。

## React.memo

正常情况下，状态改变会使子组件也重新渲染。React.memo 缓存组件，只有 props 改变时才会重新渲染。

闭包会占用内存，js 执行是快的。所以并不是所有组件都包裹 memo 就是优化了，一般遇到大量计算的组件才考虑使用。
