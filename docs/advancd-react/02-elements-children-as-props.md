# Elements, children as props

props 传递 children 不会触发 re-render

[https://codesandbox.io/s/practical-matsumoto-3qtwwn?file=/src/App.js:58-462](https://codesandbox.io/s/practical-matsumoto-3qtwwn?file=/src/App.js:58-462)

```jsx
// Child 会重新渲染
import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Parent />
    </div>
  );
}

function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p onClick={() => setCount((prev) => prev + 1)}>{count}</p>
      <Child />
    </div>
  );
}

function Child() {
  console.log("child");
  return <div>child</div>;
}
```

```jsx
// Child 组件不会重新渲染
import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Parent>
        <Child />
      </Parent>
    </div>
  );
}

function Parent({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p onClick={() => setCount((prev) => prev + 1)}>{count}</p>
      {children}
    </div>
  );
}

function Child() {
  console.log("child");
  return <div>child</div>;
}
```

## 问题

在主页面加一个滚动监听到某个位置出现内容(比如次级导航)

```jsx
const MainScrollableArea = () => {
  const [position, setPosition] = useState(300);
  const onScroll = (e) => {
    // calculate position based on the scrolled value const calculated = getPosition(e.target.scrollTop); // save it to state
    setPosition(calculated);
  };
  return (
    <div className="scrollable-block" onScroll={onScroll}>
      {/* pass position value to the new movable component */}{" "}
      <MovingBlock position={position} />
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

当滚动时,整个应用都会重新渲染

## 解决方法: 作为 props 传递

```jsx
// add "content" property to the component
const ScrollableWithMovingBlock = ({ content }) => {
  const [position, setPosition] = useState(0);
  const onScroll = () => {}; // same as before
  return (
    <div className="scrollable-block" onScroll={onScroll}>
      <MovingBlock position={position} />
      {content}
    </div>
  );
};

const App = () => {
  return (
    <ScrollableWithMovingBlock>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </ScrollableWithMovingBlock>
  );
};
```

## 总结

- 重新渲染就是 React 调用组件函数的过程。组件会在其元素对象发生变化时重新渲染，这是通过在重新渲染前后使用 Object.is 比较来确定的。

- 当元素作为 props 传递给组件时，如果组件通过状态更新触发重新渲染，作为 props 传递的元素不会重新渲染。

- "children" 只是 props，并且在使用 JSX 嵌套语法传递时，它们的行为与其他 props 相同。
