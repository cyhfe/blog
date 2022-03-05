---
sidebar_position: 2
---

- [Functions](#functions)
  - [Declaring and Invoking Functions](#declaring-and-invoking-functions)
    - [this](#this)
    - [call signatures](#call-signatures)
    - [Overloaded Function Types](#overloaded-function-types)
      - [generic type](#generic-type)
        - [when are generics bound?](#when-are-generics-bound)
        - [where you can declare generics?](#where-you-can-declare-generics)

# Functions

## Declaring and Invoking Functions

```ts
// named function
function greet(name: string){
  return 'hello ' + name
}

// function expression
let greet2 = function(name: string){
  return 'hello ' + name
}

// arrow function
let greet3 = (name: string) => 'hello ' + name
```

### this
```ts
function fancyDate(this: Date) {
  return this.getFullYear() + "/" + this.getMonth() + "/" + this.getDate()
}

const now = new Date()

console.log(fancyDate.call(now))
```

### call signatures

```ts
type Greet = (name: string) => string

type Log = (message: string, userId?: string) => void

type SumVariadicSafe = (...numbers: number[]) => number
```
### Overloaded Function Types
```ts
// shorthand
type Log = (message: string, userId?: string) => void

// full call signatures
type Log = {
  (message: string, userId?: string): void
}
```

```ts
type Reverse = {
  (from: Date): Reservation
  (from: Date, destination: string): Reservation
}
```

#### generic type

we don’t know what this type will be ahead of time
TypeScript infers from the type we pass in for . 
Once TypeScript infers what is for a given call to , it substitutes that type in for every it sees. 
is like a placeholder type, to be filled in by the typechecker from context; 

```ts
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}

```

##### when are generics bound?

Generally, TypeScript will bind concrete types to your generic when you use the generic: for functions, it’s when you call them; for classes, it’s when you instantiate them (more on that in “Polymorphism”); and for type aliases and interfaces (see “Interfaces”), it’s when you use or implement them.

```ts
// 1
let filter: Filter<number> = (array, f) => // ...

// 2
type StringFilter = Filter<string>
let stringFilter: StringFilter = (array, f) => // ...
```

##### where you can declare generics?

```ts
// A full call signature, with scoped to an individual signature. Because is scoped to a single signature, TypeScript will bind the in this
// signature to a concrete type when you call a function of type . Each call to will get its own binding for T.
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}

// or
type Filter = <T>(array: T[], f: (item: T) => boolean): T[]

let filter: Filter = (array, f) => {
  const output = []
  for (let i = 0; i < array.length; i++) {
    f(array[i]) && output.push(array[i])
  }
  return output
}

// A full call signature, with T scoped to all of the signatures. Because T is declared as part of Filter’s type (and not part of a specific signature’s type), TypeScript will bind when you declare a function of type Filter
// .
type Filter<T> = {
  (array: T[], f: (item: T) => boolean): T[]
}

// or
type Filter<T> = (array: T[], f: (item: T) => boolean): T[]

let filter: Filter<number> = // ...

// named function
function filter<T>(array: T[], f: (item: T) => boolean): T[]{
  // ...
}
```

```ts
interface Array<T> {
  filter(
    callbackfn: (value: T, index: number, array: T[]) => any
    thisArg?: any
  ): T[]
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U
    thisArg?: any
  ): U[]
}
```


