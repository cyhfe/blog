# 注册登录与路由保护

## 需求

- /user 创建一个新用户,密码加密存储,返回 token
- /signin 登录接口,用户名和密码,返回 token
- /api 登录之后才能访问.使用 token 验证身份

```ts
// server.ts
app.post("/user", createNewUser);
app.post("/signin", signin);
app.use("/api", protect, router);
```

## prisma

```prisma
model User {
  id        String    @id @default(uuid())
  createdAt DateTime  @default(now())
  username  String    @unique
  password  String
}
```

```bash
npx prisma migrate dev --name first-migration
npx prisma generate
```

```ts
// router
router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users });
});
```

## 创建用户

### hash passwords

```ts
// module/auth.ts
export const hashPassword = (password: User["password"]) => {
  return bcrypt.hash(password, 5);
};
```

### 创建 token

```ts
// module/auth.ts
export const createJWT = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET
  );
  return token;
};
```

```ts
//user.ts
export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};
```

```ts
// server.ts
app.post("/user", createNewUser);
```

## 登录

```ts
// modules/user.ts
export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
```

```ts
// handles/user.ts
export const signin: RequestHandler = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "nope" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
```

```ts
// server.ts
app.post("/signin", signin);
```

## 路由保护

通过 token 解码 payload 并挂载 到 req 对象中,以便后续路由识别身份

```ts
export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};
```

```ts
// server.ts
app.use("/api", protect, router);
```

### 如何使 token 失效

更换签发密钥

### Typescript: 如何扩展`Request`对象

[https://blog.logrocket.com/extend-express-request-object-typescript/](https://blog.logrocket.com/extend-express-request-object-typescript/)

[https://stackoverflow.com/questions/71122741/how-do-i-add-custom-property-to-express-request-in-typescript](https://stackoverflow.com/questions/71122741/how-do-i-add-custom-property-to-express-request-in-typescript)

```ts
declare module "express-serve-static-core" {
  interface Request {
    myProp?: boolean;
  }
}
```
