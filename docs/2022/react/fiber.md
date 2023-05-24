# inside fiber

## React elements

react 应用使用 JSX(createElement) 返回一个树结构的对象(react elements)

```js
[
    {
        $$typeof: Symbol(react.element),
        type: 'button',
        key: "1",
        props: {
            children: 'Update counter',
            onClick: () => { ... }
        }
    },
    {
        $$typeof: Symbol(react.element),
        type: 'span',
        key: "2",
        props: {
            children: 0
        }
    }
]
```

## fiber

每个 React element 都有一个对应的 fiber 节点.

每次 render,react elements 都会重新创建(从 setState 的节点开始).

fiber 会尽可能的复用

react elements 是树结构的对象, fiber 是链表结构的对象

concurrent mode 是可中断的,在浏览器空闲的时候执行一个单元任务(a unit of work)

fiber node 就是代表一个单元任务(a unit of work)的数据结构

可以被跟踪,调度,暂停和放弃.

第一次创建时,根据 react element 创建 fiber node.

更新时,重用 fiber node,只更新必要的属性.

还可能根据 key 值只移动 node 节点.

![](https://images.indepth.dev/images/2019/07/image-51.png)

## Current and work in progress trees

react 有 2 棵 fiber 树

- current: 当前页面显示的 fiber 树
- workInProgress: 即将更新的 fiber 树

## General algorithm

react 任务分为两个部分:render 和 commit
