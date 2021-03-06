---
sidebar_position: 2
---

# 浅谈网络协议

## IP UDP TCP

互联网中的数据是通过数据包来传输的。如果发送的数据很大，那么该数据就会被拆分为很多小数据包来传输。

1. IP：把数据包送达目的主机

计算机的地址就称为 IP 地址，访问任何网站实际上只是你的计算机向另外一台计算机请求信息。

2. UDP：把数据包送达应用程序

IP 通过 IP 地址信息把数据包发送给指定的电脑，而 UDP 通过端口号把数据包分发给正确的程序。

在使用 UDP 发送数据时，有各种因素会导致数据包出错，虽然 UDP 可以校验数据是否正确，但是对于错误的数据包，UDP 并不提供重发机制，只是丢弃当前的包，而且 UDP 在发送之后也无法知道是否能达到目的地。

虽说 UDP 不能保证数据可靠性，但是传输速度却非常快

3. TCP：把数据完整地送达应用程序

UDP 的 2 个问题：

- 数据包在传输过程中容易丢失；

- 大文件会被拆分成很多小的数据包来传输，这些小的数据包会经过不同的路由，并在不同的时间到达接收端，而 UDP 协议并不知道如何组装这些数据包，从而把这些数据包还原成完整的文件。

TCP（Transmission Control Protocol，传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议。相对于 UDP，TCP 有下面两个特点:

- 对于数据包丢失的情况，TCP 提供重传机制；

- TCP 引入了数据包排序机制，用来保证把乱序的数据包组合成一个完整的文件。

![](https://static001.geekbang.org/resource/image/94/32/943ac29f7d5b45a8861b0cde5da99032.png)

![](https://static001.geekbang.org/resource/image/44/44/440ee50de56edc27c6b3c992b3a25844.png)

## HTTP

HTTP 协议，正是建立在 TCP 连接基础之上的。HTTP 是一种允许浏览器向服务器获取资源的协议，是 Web 的基础，通常由浏览器发起请求，用来获取不同类型的文件，例如 HTML 文件、CSS 文件、JavaScript 文件、图片、视频等。

![](https://static001.geekbang.org/resource/image/12/80/1277f342174b23f9442d3b27016d7980.png)
