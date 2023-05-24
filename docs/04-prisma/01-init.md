# 初始化项目

```bash
npm install typescript ts-node @types/node --save-dev

npx tsc --init

npm install prisma --save-dev

# 初始化 schema
npx prisma init --datasource-provider sqlite

# 初次 migrate
npx prisma migrate dev --name init

# 数据库可视化UI
npx prisma studio
```
