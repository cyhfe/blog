# 微任务

## UI 线程的宏观架构

javascript 是运行在 UI 线程中的，我们可以通过回调函数异步执行。

![https://static001.geekbang.org/resource/image/b5/e1/b5c6a4cd613d262047a4339adb4eb8e1.jpg](https://static001.geekbang.org/resource/image/b5/e1/b5c6a4cd613d262047a4339adb4eb8e1.jpg)

## 异步回调函数的调用时机

![https://static001.geekbang.org/resource/image/87/44/874d4d0f49645dc211899b224f146644.jpg](https://static001.geekbang.org/resource/image/87/44/874d4d0f49645dc211899b224f146644.jpg)

通过 setTimeout 的执行流程其实是比较简单的，在 setTimeout 函数内部封装回调消息，并将回调消息添加进消息队列，然后主线程从消息队列中取出回调事件，并执行。

还有一类比较复杂一点的流程，最典型的是通过 XMLHttpRequest 所触发的回调，它和 setTimeout 有一些区别。

因为 XMLHttpRequest 是用来下载网络资源的，但是实际的下载过程却并不适合在主线程上执行，因为下载任务会消耗比较久的时间，如果在 UI 线程上执行，那么会阻塞 UI 线程，这就会拖慢 UI 界面的交互和绘制的效果。所以当主线程从消息队列中取出来了这类下载任务之后，会将其分配给网络线程，让其在网络线程上执行下载过程，这样就不会影响到主线程的执行了。

![https://static001.geekbang.org/resource/image/94/42/942abef74c09cb43c0ffc94d0e836142.jpg](https://static001.geekbang.org/resource/image/94/42/942abef74c09cb43c0ffc94d0e836142.jpg)

结合上图，我们就可以来分析下通用的 UI 线程是如何处理下载事件的，大致可以分为以下几步：

1. UI 线程会从消息队列中取出一个任务，并分析该任务。
2. 分析过程中发现该任务是一个下载请求，那么主线程就会将该任务交给网络线程去执行。
3. 网络线程接到请求之后，便会和服务器端建立连接，并发出下载请求；
4. 网络线程不断地收到服务器端传过来的数据；
5. 网络线程每次接收到数据时，都会将设置的回调函数和返回的数据信息，如大小、返回了多少字节、返回的数据在内存中存放的位置等信息封装成一个新的事件，并将该事件放到消息队列中 ;
6. UI 线程继续循环地读取消息队列中的事件，如果是下载状态的事件，那么 UI 线程会执行回调函数，程序员便可以在回调函数内部编写更新下载进度的状态的代码；
7. 直到最后接收到下载结束事件，UI 线程会显示该页面下载完成。
