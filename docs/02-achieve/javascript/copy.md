---
sidebar_position: 1
---

# 对象和数组的拷贝

## 浅拷贝

### 解构拷贝

```js
const copyOfObject = { ...originalObject }
const copyOfArray = [...originalArray]
```

解构拷贝会有一些限制

1. 对象解构会丢失 prototype

```js
import { strict as assert } from "assert"

class MyClass {}

const original = new MyClass()
assert.equal(original instanceof MyClass, true)

const copy = { ...original }
assert.equal(copy instanceof MyClass, false)

// 这两个方法是等价的
// obj instanceof SomeClass
// SomeClass.prototype.isPrototypeOf(obj)

// 可以给拷贝的对象添加原型绑定，由于性能问题不推荐
// Object.setPrototypeOf(obj, prototype)
```

2. 内建对象会丢失数据（RegExp、Date 等）

```js
const now = new Date()
const copy = { ...now } // {}
```

3. 只有可枚举的属性会被拷贝

4. 自定义属性并不会完全拷贝

```js
const original = Object.defineProperties(
  {},
  {
    prop: {
      value: 1,
      writable: false,
      configurable: false,
      enumerable: true,
    },
  }
)
assert.deepEqual(original, { prop: 1 })

const copy = { ...original }
// Attributes `writable` and `configurable` of copy are different:
assert.deepEqual(Object.getOwnPropertyDescriptors(copy), {
  prop: {
    value: 1,
    writable: true,
    configurable: true,
    enumerable: true,
  },
})
```

5. 拷贝是浅拷贝

### `Object.assign`

```js
const copy1 = { ...original }
const copy2 = Object.assign({}, original)
```

这两种方法基本上是一致的，只有细微区别：

- Object.assign() 使用赋值操作创建属性.
- ...展开式 定义新属性.

## 深拷贝

### 手动嵌套展开式

```js
const original = { name: "Jane", work: { employer: "Acme" } }
const copy = { name: original.name, work: { ...original.work } }

// We copied successfully:
assert.deepEqual(original, copy)
// The copy is deep:
assert.ok(original.work !== copy.work)
```

### hack: 通过 JSON API

```js
function jsonDeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}
```

缺点：JSON 不支持的数据类型会被忽略

JSON 支持的类型：

- a string.
- a number.
- an object (JSON object)
- an array.
- a boolean.
- null.

```js
assert.deepEqual(
  jsonDeepCopy({
    // Symbols are not supported as keys
    [Symbol("a")]: "abc",
    // Unsupported value
    b: function () {},
    // Unsupported value
    c: undefined,
  }),
  {} // empty object
)
```

### 实现通用的深拷贝

```js
function deepCopy(original) {
  if (Array.isArray(original)) {
    const copy = []
    for (const [index, value] of original.entries()) {
      copy[index] = deepCopy(value)
    }
    return copy
  } else if (typeof original === "object" && original !== null) {
    const copy = {}
    for (const [key, value] of Object.entries(original)) {
      copy[key] = deepCopy(value)
    }
    return copy
  } else {
    // Primitive value: atomic, no need to copy
    return original
  }
}
```

我们只是解决深拷贝的问题，其他特性还是存在：
原型不会被复制
特殊对象
non-enumerable 属性被忽略
