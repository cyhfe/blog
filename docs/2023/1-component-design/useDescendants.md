---
sidebar_position: 7
---

# 后代元素识别

[https://github.com/reach/reach-ui/tree/dev/packages/descendants](https://github.com/reach/reach-ui/tree/dev/packages/descendants)

## 问题

如下例子，我们使用了复合组件的组合模式。

Tabs 中有当前激活 tab 的 index，我点击了其中一个 tab 需要切换状态，问题是我如何知道我点击了第几个 tab

```jsx
function Example() {
  return (
    <Tabs>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>
    </Tabs>
  );
}
```

## 方案 1 map

```jsx
function Example() {
  return (
    <Tabs>
      <TabList>
        {tabs.map((Tab, index) => {
          return <Tab index={index} />;
        })}
      </TabList>
    </Tabs>
  );
}
```

## 方案 2 类型检测 和 cloneElement

```jsx
function TabList({ children }) {
  return <>
    {
    React.Children.map(children, (child, index) =>
      React.cloneElement(child, { index, activeIndex })
    );
  }</>
}
```

## 方案 3 手动注册后代

以上方法不能解决嵌套的后代

```jsx
<TabList>
  <div>
    <Tab/>
  <div>
  <Tab/>
</TabList>
```

我们用一个数组去保存后代（dom），在后代渲染时注册 useEffect(register ,[])
注册时根据 dom 的前后位置放入 dom

```tsx
import React, { useCallback, useLayoutEffect } from "react";

type SomeElement<T> = T extends Element ? T : HTMLElement;

export interface Descendant<ElementType = HTMLElement> {
  element: SomeElement<ElementType> | null;
  index: number;
}

function useForceUpdate() {
  const [, setState] = React.useState(Object.create(null));
  return useCallback(() => {
    setState(Object.create(null));
  }, []);
}

interface DescendantContextValue<DescendantType extends Descendant> {
  descendants: DescendantType[];
  registerDescendant: (descendant: DescendantType) => void;
}

function insertAt<T extends any[]>(
  array: T,
  item: T[number],
  index?: number
): T {
  if (index === undefined || !(index in array)) {
    return [...array, item] as T;
  }
  return [...array.slice(0, index), item, ...array.slice(index)] as T;
}

function createDescendantContext<DescendantType extends Descendant>(
  name: string,
  initialValue = {}
) {
  const descendants: DescendantType[] = [];

  type T = DescendantContextValue<DescendantType>;

  const Ctx = React.createContext<T>({
    descendants,
    registerDescendant: () => {},
    ...initialValue,
  });

  Ctx.displayName = name;
  return Ctx;
}

function useDescendants<DescendantType extends Descendant>(
  Ctx: React.Context<DescendantContextValue<DescendantType>>
) {
  return React.useContext(Ctx).descendants;
}

function DescendantProvider<DescendantType extends Descendant>({
  Ctx,
  children,
  items,
  set,
}: {
  Ctx: React.Context<DescendantContextValue<DescendantType>>;
  children: React.ReactNode;
  items: DescendantType[];
  set: React.Dispatch<React.SetStateAction<DescendantType[]>>;
}) {
  const registerDescendant = React.useCallback(
    ({
      element,
      index: explicitIndex,
      ...rest
    }: Omit<DescendantType, "index"> & { index?: number | undefined }) => {
      if (!element) return;
      set((items) => {
        if (explicitIndex !== undefined && explicitIndex !== -1) {
          return insertAt(
            items,
            { element, index: explicitIndex, ...rest } as DescendantType,
            explicitIndex
          );
        }

        if (items.length === 0) {
          return [{ ...rest, element, index: 0 } as DescendantType];
        }

        let index = items.findIndex((item) => {
          if (!item.element) return false;
          // element是否在item.element之前
          return Boolean(
            item.element.compareDocumentPosition(element) &
              Node.DOCUMENT_POSITION_PRECEDING
          );
        });

        let newItems: DescendantType[];

        if (index === -1) {
          newItems = [
            ...items,
            { ...rest, element, index: items.length } as DescendantType,
          ];
        } else {
          newItems = insertAt(
            items,
            { ...rest, element, index } as DescendantType,
            index
          );
        }

        return newItems;
      });

      return function unRegisterDescendant() {
        if (!element) return;
        set((items) => items.filter((item) => item.element !== element));
      };
    },
    []
  );

  const value = React.useMemo(() => {
    return {
      descendants: items,
      registerDescendant,
    };
  }, [items, registerDescendant]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function useDescendant<DescendantType extends Descendant>(
  descendant: Omit<DescendantType, "index">,
  Ctx: React.Context<DescendantContextValue<DescendantType>>,
  indexProp?: number
) {
  let { registerDescendant, descendants } = React.useContext(Ctx);
  const forceUpdate = useForceUpdate();

  const index =
    indexProp ??
    descendants.findIndex((item) => item.element === descendant.element);

  useLayoutEffect(() => {
    // 初次渲染时，ref为null
    if (!descendant.element) forceUpdate();

    return registerDescendant({
      ...descendant,
      index,
    } as DescendantType);
  }, [
    descendant,
    forceUpdate,
    index,
    registerDescendant,
    ...Object.values(descendant),
  ]);

  return index;
}

function useDescendantsInit<DescendantType extends Descendant>() {
  return React.useState<DescendantType[]>([]);
}

export {
  createDescendantContext,
  useDescendants,
  DescendantProvider,
  useDescendant,
  useDescendantsInit,
};
```
