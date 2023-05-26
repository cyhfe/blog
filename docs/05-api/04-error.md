# 错误处理

## 中间件处理

```ts
// handler/user.ts
export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

// server.ts

只处理 `app`的路由错误,如果有子路由,子路由也要加上中间件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.json({ message: `had an error`, code: 500 });
});
```

## node 处理

```ts
//index.ts
process.on("uncaughtException", (error) => {
  console.log(error);
});

process.on("unhandledRejection", (error) => {
  console.log(error);
});
```
