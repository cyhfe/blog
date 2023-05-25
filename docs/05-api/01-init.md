# 初始化项目

## 依赖

```json
{
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/morgan": "^1.9.4",
    "@types/node": "^20.2.3",
    "nodemon": "^2.0.22",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.4"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "morgan": "^1.10.0"
  }
}
```

## script

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc"
  }
}
```

## 文件结构

```bash
├── package-lock.json
├── package.json
├── src
│   ├── handlers
│   ├── index.ts
│   ├── modules
│   ├── router.ts
│   └── server.ts
└── tsconfig.json
```

```ts
// index.ts
import * as dotenv from "dotenv";
dotenv.config();
import app from "./server";

app.listen(3001, () => {
  console.log("serve on http://localhost:3001");
});
```

```ts
// server.ts
import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
// @ts-ignore
app.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: `had an error: ${err}` });
});

export default app;
```

```ts
// router.ts
import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ msg: "hello " });
});
export default router;
```

## 初始化 prisma

```bash
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
npm install @prisma/client
```

```ts
// db.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

```bash
# Whenever you make changes to your database that are reflected in the Prisma schema, you need to manually re-generate Prisma Client to update the generated code in the node_modules/.prisma/client directory:
prisma generate

```
