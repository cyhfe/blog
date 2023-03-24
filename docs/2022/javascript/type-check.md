# 类型检测

## 判断原始类型

`typeof`适合检测原始类型

typeof 安全判断 `undefined`
```js
a === 'undefined' //ReferenceError

typeof b === 'undefined'

```

 `typeof null === object`
 
  用typeof 来判断对象

  ```js
  function isObject(){
    return typeof value === 'object' && value !== null
  }
  ```

## 判断对象

### instanceof

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

### contructor

实例的constructor(实际上是原型对象的 constructor)指向构造函数
## 检测 NaN

`isNaN(undefined) === true`

`Number.isNaN`比较合适

## 检测数组

```js
// 1. es6
Array.isArray(value)

// 2. instanceof
value instanceof Array

// 3. constructor 不可靠
value.constructor === Array

// 4. toString
Object.prototype.toString.call(value) === '[object Array]'

```

## 通用检测

```js
function type(value) {
  var regex = /^[object (S+?)]$/;
  var matches = Object.prototype.toString.call(value).match(regex) || [];
  return (matches[1] || 'undefined').toLowerCase();
}
```