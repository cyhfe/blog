---
sidebar_position: 1
---

# 控制反转

## 问题

想象一个场景：你在写一些可重用的代码（function, component, hook 等）。

现在来了一些新的需求，你的代码不支持这些用例，所以你加了一些配置（config， options）和对应的逻辑实现来支持这些用例。

重复上述步骤，你的代码会变得难以维护，API 复杂臃肿。

## 进入控制反转的世界

这是 wiki 的解释：

> ..in traditional programming, the custom code that expresses the purpose of the program calls into reusable libraries to take care of generic tasks, but with inversion of control, it is the framework that calls into the custom, or task-specific, code.

简单的说就是：代码抽象关注的是通用逻辑，具体用例交给用户来实现。

## 案例：filter

```js
// filter配置实现
function filter(
  array,
  {
    filterNull = true,
    filterUndefined = true,
    filterZero = false,
    filterEmptyString = false,
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

```js
// filter 回调实现
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

你可能会觉得： 我们要做的事情更多了，这样不是更糟糕的 API 吗？

```js
// before
filter([0, 1, undefined, 2, null, 3, "four", ""]);

// after
filter(
  [0, 1, undefined, 2, null, 3, "four", ""],
  (el) => el !== null && el !== undefined
);
```

其实不然，抽象程度低的代码可以根据需求再封装，可以实现同样的 API

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

## 在 React 中使用

在函数中我们可以使用 callback 控制反转，在 React 中我们可以使用复合组件（渲染 children）

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

```jsx
// 根据需求再封装
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
```

## 总结

之前看开源库的时候，关注点在代码是怎么实现的。在了解控制反转之后，对为什么这样设计有了新的理解。

控制反转是我在组件设计中学到的最重要的概念之一，感谢 kentcdodds 的这篇文章:

[https://kentcdodds.com/blog/inversion-of-control](https://kentcdodds.com/blog/inversion-of-control)
