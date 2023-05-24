# 数据库迁移

Prisma Migrate 是一个命令式数据库架构迁移工具

- 随着数据库架构的发展，保持数据库 `schema` 与 Prisma `schema` 同步
- 维护数据库中的现有数据

## 保持与数据库同步

每次修改`schema`都要保持与数据库同步

```bash
npx prisma migrate dev --name first-migration
```

[https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate](https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate)

## 从已有数据库迁移

### 自检数据库

```bash
prisma db pull
```

### 创建迁移基线

1. 移除`migrations`文件夹

2. 新建文件

```bash
mkdir -p prisma/migrations/0_init
```

3. diff

```bash
npx prisma migrate diff \
--from-empty \
--to-schema-datamodel prisma/schema.prisma \
--script > prisma/migrations/0_init/migration.sql
```

4. 提交

```bash
npx prisma migrate resolve --applied 0_init
```
