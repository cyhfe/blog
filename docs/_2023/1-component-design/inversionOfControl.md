---
sidebar_position: 1
---

# 控制反转

## 1. 控制反转

### 1-1 概念

控制反转（Inversion of Control，IoC）是一种软件设计原则和编程模式，旨在解耦软件组件之间的依赖关系。在传统的编程模型中，组件间通常直接依赖于其他组件，导致高耦合度和难以重用的代码。控制反转通过将组件的依赖关系交由外部容器来管理，实现了组件之间的解耦和灵活性。

### 1-2 案例

现在我们有个需求,需要过滤数组中的布尔转换为 false 的值.
通过配置是这样实现的

```js
function filter(
  array,
  {
    filterNull = true,
    filterUndefined = true,
    filterZero = true,
    filterEmptyString = true,
  } = {}
) {
  let newArray = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (
      (filterNull && element === null) ||
      (filterUndefined && element === undefined) ||
      (filterZero && element === 0) ||
      (filterEmptyString && element === "")
    ) {
      continue;
    }

    newArray[newArray.length] = element;
  }
  return newArray;
}
```

需求总是会变的,如果跟着需求修改配置项来实现功能.代码会变得臃肿难以维护.

通过依赖注入的方式来实现控制反转.

```js
function filter(array, filterFn) {
  let newArray = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (filterFn(element)) {
      newArray[newArray.length] = element;
    }
  }
  return newArray;
}
```

控制反转的思想就是只抽象通用的部分,将控制权更多的交给用户.

可能会觉得这样代码会变得更繁琐(我要写的代码更多了).

```js
// before
filter([0, 1, undefined, 2, null, 3, "four", ""]);

// after
filter(
  [0, 1, undefined, 2, null, 3, "four", ""],
  (el) => el !== null && el !== undefined
);
```

低程度的抽象可以根据具体需求二次封装

```js
function filterWithOptions(
  array,
  {
    filterNull = true,
    filterUndefined = true,
    filterZero = false,
    filterEmptyString = false,
  } = {}
) {
  return filter(
    array,
    (element) =>
      !(
        (filterNull && element === null) ||
        (filterUndefined && element === undefined) ||
        (filterZero && element === 0) ||
        (filterEmptyString && element === "")
      )
  );
}
```

### 1-2 在 React 中如何应用

通过渲染 children,也就是复合组件.将控制权更多的交给用户.

```jsx
function Example() {
  return (
    <Tabs>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

这样的 API 可能看起来很繁琐,但是它提供了超强的可拓展性.

1. dataTabs

```js
// 封装
const DataTabs = ({ data }: DataTabsProps) => {
  return (
    <Tabs>
      <TabList>
        {data.map(({ label, id }) => (
          <Tab key={id}>{label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map(({ content, id }) => (
          <TabPanel key={id}>{content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

// 使用
<DataTabs data={data} />;
```

2. 动画,修改 DOM 结构等

参考 Dialog 组件.

我是先写逻辑后写动画.

可以在不变更原有代码的基础上添加功能.

```jsx
// import { Dialog } from './index';
import AnimatedDialog from "./AnimatedDialog";
```

## 2 状态管理

复合组件的状态分为两部分:

- 组件间共享的状态,通过 `Context`传递.Provider 的 value 用 useMemo 包裹.每次 value 变化所有 consumer 都会重新渲染.
- 组件维护自身的状态.在性能优化的概念下,尽可能下沉状态.以减少重复渲染.

参考 createContext

## 3 受控与非受控

受控: 组件外部状态控制
非受控: 组件自身维护状态

通过 `value` 确定受控与否,通过 `onChange`提供给外部组件更新状态

参考 useControlledState
