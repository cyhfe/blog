---
sidebar_position: 1
---

# typescript 笔记

## Index signatures

```ts
const phones = {
  home: { country: "+1", area: "211", number: "652-4515" },
  work: { country: "+1", area: "670", number: "752-5856" },
  fax: { country: "+1", area: "322", number: "525-4357" },
}

const phones: {
  [k: string]: {
    country: string
    area: string
    number: string
  }
} = {}

// Record<string, Item> 作用相同
```

## Tuples

Sometimes we may want to work with a multi-element, ordered data structure, where position of each item has some special meaning or convention. This kind of structure is often called a tuple.

```ts
let myCar: [number, string, string] = [2002, "Toyota", "Corolla"]
```

### 限制

```ts
const numPair: [number, number] = [4, 5]
numPair.push(6) // [4, 5, 6]
numPair.pop() // [4, 5]
numPair.pop() // [4]
numPair.pop() // []
```

## unkonwn

```ts
let a: unknown = 30
let b = a === 123
let c = a + 10 //error

if (typeof a === "number") {
  let d = a + 10
}
```

1. ts 不会自动推断 unkonwn 类型， 你必须显示声明它
2. 你可以使用 unkonw 比较类型
3. 可以假设 unkonw 为特定类型

## object

ts 中的对象属于结构声明（也叫鸭子类型）

### index signatures

```ts
let a: {
  b: number
  c?: string
  [key: number]: boolean
} = {
  b: 1,
  c: "2",
  12: true,
  2: false,
}
```

### tuples

```ts
const a: [number, number, string] = [1, 2, "3"]
```

### 函数返回值

- null
  空值

- undefined
  未定义

- void
  没有返回语句

- never
  永远不返回

### Enums

枚举值

```ts
const enum Flippable {
  Buger = "Buger",
  Chair = "Cup",
}

function flip(f: Flippable) {
  return "flipped it"
}

flip(Flippable.Buger)
flip(Flippable.Chair)
```

## class

### 属性权限

public 默认值。可以从任何地方获取

protected 当前类或子类

private 当前类的实例

## 函数声明

```ts
function add(a: number, b: number): number {
  return a + b
}
```

```ts
type Add = (a: number, b: number) => number

const add: Add = (a, b) => a + b
```

### 函数重载

```ts
type CreateElement = {
  (tag: "a"): HTMLAnchorElement
  (tag: "canvas"): HTMLCanvasElement
}
```

### 范型

范型定义在调用签名前，在函数调用时绑定具体的类型

```ts
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}

const filter: Filter = (array, f) => {
  return array
}
```

范性定义在 Filter 上，当我们使用时必须显式绑定类型

```ts
type Filter<T> = {
  (array: T[], f: (item: T) => boolean): T[]
}

const filter: Filter<string> = (array, f) => {
  return array
}
```

### 声明范型的几种形式

```ts
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}
type Filter = <T>(array: T[], f: (item: T) => boolean): T[]
let filter: Filter = //...

type Filter<T> = {
  (array: T[], f: (item: T) => boolean): T[]
}
type Filter<T> = (array: T[], f: (item: T) => boolean): T[]
let filter = Filter<number> //...

function filter<T>(array: T[], f: (item: T) => boolean):T[]{

}

```

```ts
type MyEvent<T> = {
  target: T
  type: string
}
```
