---
sidebar_position: 1
---

# typescript

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