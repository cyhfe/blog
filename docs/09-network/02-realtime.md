# realtime

## long polling

### server

```ts
app.post("/poll", (req, res) => {
  const { user, text } = req.body;
  console.log(req.body);
  msg.push({
    user,
    text,
  });
  res.json({ msg: "ok" });
});

app.get("/poll", (req, res) => {
  res.json({ msg });
});
```

### setTimeout

为什么用`setTimeout`而不是`setInterval`

`setInterval`无法控制请求顺序

`setTimeout` + `await`保证上一个请求结束后再调度一个`setTimeout`

```ts
useEffect(() => {
  let timerId: NodeJS.Timeout;
  async function getMsg() {
    const res: any = await fetch("http://localhost:3000/poll");
    const data = await res.json();
    setMsg(data.msg);
    timerId = setTimeout(() => {
      getMsg();
    }, 3000);
  }
  getMsg();
  return () => {
    timerId && clearTimeout(timerId);
  };
}, []);
```

### requestAnimationFrame

`setTimeout`递归会无限运行

使用`requestAnimationFrame`在`unfocus`的时候暂停

```ts
useEffect(() => {
  let rafId: number;
  let timeToMakeNextRequest = 0;
  async function getMsg() {
    const res: any = await fetch("http://localhost:3000/poll");
    const data = await res.json();
    setMsg(data.msg);
  }
  async function rafTimer(time: number) {
    if (time >= timeToMakeNextRequest) {
      await getMsg();
      timeToMakeNextRequest = time + 3000;
    }
    requestAnimationFrame(rafTimer);
  }
  rafId = requestAnimationFrame(rafTimer);
  return () => {
    rafId && cancelAnimationFrame(rafId);
  };
}, []);
```

## HTTP2 push

[https://developer.chrome.com/blog/removing-push/](https://developer.chrome.com/blog/removing-push/)

## websocket
