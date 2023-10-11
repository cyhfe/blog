# 多态/渲染委托模式

https://medium.com/@bryanmylee/aschild-in-react-svelte-vue-and-solid-for-render-delegation-645c73650ced

在构建 Web 组件库时，让用户能够自定义要使用的底层元素或组件通常很有用。

```jsx
// 某些库在其组件上提供 as 属性，允许用户指定要使用的特定组件或 HTML 标记。

() => (
  <Button as="a" href="#">
    Back to top
  </Button>
);

() => (
  // How do we use a custom component for `<Link />` as well?
  <Button as={Link} href="#">
    Back to top
  </Button>
);
```

### Radix-ui asChild

```jsx
import { Slot } from "@radix-ui/react-slot";

function Button({ children, asChild, ...props }) {
  const Comp = asChild ? Slot : "button";
  return <Comp {...props}>{children}</Comp>;
}

export default function App() {
  return (
    <div className="App">
      <Button asChild onClick={() => console.log("1")}>
        <a onClick={() => console.log("2")}>link</a>
      </Button>
    </div>
  );
}
```

Merging props and node references

渲染委派时需要注意的一个行为是，props 和事件处理程序可以在两个位置定义 — 在父组件和子组件上。

因此，我们必须定义规则，使合并父道具和子道具的过程可预测且直观。

1. if a prop exists on both, the child prop overrides the parent prop
2. if an event handler exists on both, both handlers are called with the child handler being called before the parent handler.
3. if a class or className prop exists on both, both class lists are joined.
4. if a style prop exists on both, they are merged with the child styles overriding the parent styles.
5. DOM node references are provided to both the user and the parent component’s internal handlers, either in the form of React’s callback refs or Svelte’s bind:this.
