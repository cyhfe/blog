---
sidebar_position: 2
---

# 如何高效地使用 React context

Provider中value变化，会导致所有Consumer更新，所以我们用memo包一层

```tsx
// createContext
import React, { PropsWithChildren } from 'react';

type ContextProvider<T> = React.FC<PropsWithChildren<T>>;

function createContext<ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContextValue?: ContextValueType,
): [
  ContextProvider<ContextValueType>,
  (callerComponentName: string) => ContextValueType,
] {
  const Ctx = React.createContext(defaultContextValue);

  function Provider(props: PropsWithChildren<ContextValueType>) {
    const { children, ...context } = props;

    const deps = Object.values(context);

    const value = React.useMemo(() => {
      return context;
    }, deps) as ContextValueType;

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }

  function useContext(callerComponentName: string) {
    const context = React.useContext(Ctx);
    if (context) return context;
    if (defaultContextValue) return defaultContextValue;
    throw Error(
      `${callerComponentName} must be rendered inside of a ${rootComponentName} component.`,
    );
  }

  Ctx.displayName = `${rootComponentName}Context`;
  Provider.displayName = `${rootComponentName}Provider`;

  return [Provider, useContext];
}

export { createContext };

```

```tsx
// 实现
import React, { PropsWithChildren } from 'react';

import { createContext } from '../createContext/index';

import { useControlledState } from '../useControlledState/index';

interface ConterProviderValueType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  onChange: (count: number) => void;
}

const [CounterProvider, useCounter] =
  createContext<ConterProviderValueType>('Counter');
interface CounterProps {
  value?: number;
  defaultValue?: number;
  onChange?: (count: number) => void;
}

function Counter(props: PropsWithChildren<CounterProps>) {
  const { value, defaultValue = 0, onChange = () => {} } = props;

  const [count, setCount] = useControlledState(value, defaultValue);

  return (
    <CounterProvider count={count} setCount={setCount} onChange={onChange}>
      {props.children}
    </CounterProvider>
  );
}

function Trigger() {
  const ctx = useCounter('Trigger');
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          ctx.setCount((c) => c + 1);
          ctx.onChange(ctx.count + 1);
        }}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => {
          ctx.setCount((c) => c - 1);
          ctx.onChange(ctx.count - 1);
        }}
      >
        -
      </button>
    </div>
  );
}

function Display() {
  const ctx = useCounter('Display');
  return <div>{ctx.count}</div>;
}

export { Counter, Trigger, Display };

```

```tsx
// 使用
function Demo() {
  return (
    <Counter defaultValue={2} onChange={(c) => console.log(c)}>
      <Display />
      <Trigger />
    </Counter>
  );
}
```
