# 微任务

当 V8 执行一段 JavaScript 时，会为这段代码创建一个环境对象，微任务队列就是存放在该环境对象中的。

当你通过 Promise.resolve 生成一个微任务，该微任务会被 V8 自动添加进微任务队列，等整段代码快要执行结束时，该环境对象也随之被销毁，但是在销毁之前，V8 会先处理微任务队列中的微任务。

理解微任务的执行时机，你只需要记住以下两点：

- 首先，如果当前的任务中产生了一个微任务，通过 Promise.resolve() 或者 Promise.reject() 都会触发微任务，触发的微任务不会在当前的函数中被执行，所以执行微任务时，不会导致栈的无限扩张；

- 其次，和异步调用不同，微任务依然会在当前任务执行结束之前被执行，这也就意味着在当前微任务执行结束之前，消息队列中的其他任务是不可能被执行的。

```js
function bar() {
  console.log("bar")
  Promise.resolve().then((str) => console.log("micro-bar"))
  setTimeout((str) => console.log("macro-bar"), 0)
}
function foo() {
  console.log("foo")
  Promise.resolve().then((str) => console.log("micro-foo"))
  setTimeout((str) => console.log("macro-foo"), 0)
  bar()
}
foo()
console.log("global")
Promise.resolve().then((str) => console.log("micro-global"))
setTimeout((str) => console.log("macro-global"), 0)
```

![https://static001.geekbang.org/resource/image/34/db/34fb1a481b60708360b48ba04821f6db.jpg](https://static001.geekbang.org/resource/image/34/db/34fb1a481b60708360b48ba04821f6db.jpg)
