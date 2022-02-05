# V8 是如何查找变量的

## 作用域

作用域就是存放变量和函数的地方。

全局环境有全局作用域，全局作用域中存放了全局变量和全局函数。

每个函数也有自己的作用域，函数作用域中存放了函数中定义的变量。

全局作用域是在 V8 启动过程中就创建了，且一直保存在内存中不会被销毁的，直至 V8 退出。 而函数作用域是在执行该函数时创建的，当函数执行结束之后，函数作用域就随之被销毁掉了。

## 作用域链

**因为 JavaScript 是基于词法作用域的，词法作用域就是指，查找作用域的顺序是按照函数定义时的位置来决定的。**

```js
var name = "极客时间"
var type = "global"
function foo() {
  var name = "foo"
  console.log(name)
  console.log(type)
}
function bar() {
  var name = "bar"
  var type = "function"
  foo()
}
bar()
```

这里创建了 3 个作用域

![作用域](https://static001.geekbang.org/resource/image/9d/d5/9dc20e0f38d04ae96296787c7190cad5.jpg)

因为作用域链是基于词法作用域的

所以作用域链并不是从 Foo => Bar => Global

而是 Foo => Global, Bar => Global

![作用域](https://static001.geekbang.org/resource/image/82/8c/82c84c81f8c94915d4965ce38d285e8c.jpg)

## 闭包

```js
function foo() {
  let a = 0
  return function bar() {
    console.log(a++)
  }
}

const baz = foo()

baz()
```

foo 执行完退出，作用域也销毁了。

bar 被 baz 保存在全局作用域中。

baz 函数有个[[scope]]属性，是一个数组，第一项 closure 里面存储着该函数引用的变量（只存储函数引用的变量）

baz 函数执行时查找变量就是从闭包中获取的，闭包的变量存储在堆中
