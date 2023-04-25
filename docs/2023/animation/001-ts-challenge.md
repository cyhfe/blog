---
sidebar_position: 2
---

# Typescript 类型体操

## Pick

从类型 T 中选择出属性 K，构造成一个新的类型

```tsx
type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};
```

## await

```tsx
type MyAwaited<T extends PromiseLike<any | PromiseLike<any>>> =
  T extends PromiseLike<infer V>
    ? V extends PromiseLike<any>
      ? MyAwaited<V>
      : V
    : never;
```

## if

```tsx
type If<C extends boolean, T, F> = C extends true ? T : F;
```

## concat

```tsx
type Tuple = readonly unknown[];
type Concat<T extends Tuple, U extends Tuple> = [...T, ...U];
```
