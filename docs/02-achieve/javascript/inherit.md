# 继承

实例对象的**proto**指向构造函数的 prototype（原型对象）
原型链就是通过**proto**连接的
实现继承就是让继承的构造函数的原型对象的**proto**指向父构造函数的原型对象

## es5 实现

```js
function SuperType(name) {
  this.name = name
  this.colors = ["red", "blue", "green"]
}
SuperType.prototype.sayName = function () {
  console.log(this.name)
}
function SubType(name, age) {
  // 借用构造函数
  // 属性是定义在自身实例上
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function () {
  console.log(this.age)
}
```

上述模式有些个问题：

- SuperType 调用了 2 次，一个作为原型对象，一个作为借用继承父类的属性

- 作为原型对象的父类实例没必要带属性

```js
// 原型式继承

// 以o为原型，创建一个空对象
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function inherit(Subtype, SuperType) {
  const prototype = object(SuperType.prototype)
  prototype.constructor = SubType
  Subtype.prototype = prototype
}
// SubType的原型对象__proto__指向父类的原型对象
```

![prototype](/img/inherit/inherit.png)
