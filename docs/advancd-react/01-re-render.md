# re-render

重新渲染是从树向下,而不会向上

## 问题

假设有个需求.你需要在一个复杂应用中加入一个按钮,显示一个弹窗.

```jsx
const App = () => {
  // add some state
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="layout">
      {/* add the button */}
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      {/* add the dialog itself */}{" "}
      {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
      <VerySlowComponent />
    </div>
  );
};
```

当你点击按钮,整个应用都会重新渲染

## 解决方法: 状态下沉

```jsx
const ButtonWithModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  // render only Button and ModalDialog here
  return (
    <>
      <Button onClick={() => setIsOpen(true)}> Open dialog</Button>
      {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
    </>
  );
};

const App = () => {
  return (
    <div className="layout">
      {/* here it goes, component with the state inside */}{" "}
      <ButtonWithModalDialog />
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

## hook 中的状态更新触发的重新渲染

```jsx
const useResizeDetector = () => {
const [width, setWidth] = useState(0);
useEffect(() => {
const listener = () => {
setWidth(window.innerWidth); };
window.addEventListener('resize', listener);
return () => window.removeEventListener('resize', listener);
}, []);
  return null;
}
const useModalDialog = () => {
// I don't even use it, just call it here useResizeDetector();
  // return is the same
return ...
}
const App = () => {
// this hook uses useResizeDetector underneath that triggers
state update on resize
// the entire App will re-render on every resize! const { isOpen, open, close } = useModalDialog();
return // same return }
}
```

## 总结

- 重新渲染是 React 使用新数据更新组件的方式。没有重新渲染，我们的应用程序将无法实现交互性。状态更新是所有重新渲染的初始源头。

- 如果触发了组件的重新渲染，该组件内部的所有嵌套组件都将被重新渲染。在正常的 React 重新渲染周期中（没有使用 memo），props 的改变并不重要：即使组件没有任何 props，它们也会重新渲染。

- 在大型应用程序中，我们可以使用被称为“将状态向下传递”的模式来防止不必要的重新渲染。在 hook 中的状态更新将触发使用该 hook 的组件的重新渲染，即使状态本身没有被使用。

- 在嵌套使用 hook 的情况下，该 hook 链中的任何状态更新都将触发使用第一个 hook 的组件的重新渲染。
