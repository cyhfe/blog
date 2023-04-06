# React 组件设计模式

复合组件使用 context 进行状态管理，封装`createContext`
组件状态可以自己维护（uncontrolled）也可以由用户提供(controlled),封装`useControlledState`

```tsx
import React, { PropsWithChildren, useCallback, useEffect } from "react";

type ContextProvider<T> = React.FC<React.PropsWithChildren<T>>;

function createContext<ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType
): [
  ContextProvider<ContextValueType>,
  (callerComponentName: string) => ContextValueType
] {
  const Ctx = React.createContext(defaultContext);

  function Provider(props: PropsWithChildren<ContextValueType>) {
    const { children, ...context } = props;

    const deps = Object.values(context);

    const value = React.useMemo(() => context, deps) as ContextValueType;

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }

  function useContext(callerComponentName?: string) {
    const context = React.useContext(Ctx);
    if (context) return context;
    if (defaultContext) return defaultContext;
    throw Error(
      `${callerComponentName} must be rendered inside of a ${rootComponentName} component.`
    );
  }

  Ctx.displayName = `${rootComponentName}Context`;
  Provider.displayName = `${rootComponentName}Provider`;

  return [Provider, useContext];
}

interface CounterContextValue {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  onChange: (count: number) => void;
}

const [CounterProvider, useCounter] =
  createContext<CounterContextValue>("Counter");

interface CounterProps {
  value?: number;
  onChange?: (count: number) => void;
  defaultValue?: number;
}

function Counter({
  value,
  onChange = () => {},
  defaultValue = 0,
}: CounterProps) {
  const [count, setCount] = useControlledState(value, defaultValue);

  return (
    <CounterProvider count={count} setCount={setCount} onChange={onChange}>
      <Display />
      <Trigger />
    </CounterProvider>
  );
}

function useControlledState<T = any>(
  value: T | undefined,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const wasControlled = value !== undefined;
  const isControlledRef = React.useRef(wasControlled);

  const [valueState, setValue] = React.useState(
    isControlledRef.current ? value! : defaultValue
  );

  const set: React.Dispatch<React.SetStateAction<T>> = useCallback((n) => {
    if (!isControlledRef.current) {
      setValue(n);
    }
  }, []);

  return [isControlledRef.current ? (value as T) : valueState, set];
}

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <Counter
      value={count}
      onChange={(v) => {
        console.log(v);
        setCount(v);
      }}
    />
  );
}

function Display() {
  const ctx = useCounter("Display");
  return <div>{ctx.count}</div>;
}

function Trigger() {
  const ctx = useCounter("Trigger");
  return (
    <div>
      <button
        onClick={() => {
          ctx.setCount((c) => c + 1);
          ctx.onChange(ctx.count + 1);
        }}
      >
        +
      </button>
      <button
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

export default App;
```
