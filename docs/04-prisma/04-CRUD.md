# 增删改查

[https://www.prisma.io/docs/concepts/components/prisma-client/crud](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

## Create

```ts
const user = await prisma.user.create({
  data: {
    email: "elsa@prisma.io",
    name: "Elsa Prisma",
  },
});
```

```ts
const createMany = await prisma.user.createMany({
  data: [
    { name: "Bob", email: "bob@prisma.io" },
    { name: "Bobo", email: "bob@prisma.io" }, // Duplicate unique key!
    { name: "Yewande", email: "yewande@prisma.io" },
    { name: "Angelique", email: "angelique@prisma.io" },
  ],
  skipDuplicates: true, // Skip 'Bobo'
});
```

## Read

### Get record by ID or unique identifier

```ts
// By unique identifier
const user = await prisma.user.findUnique({
  where: {
    email: "elsa@prisma.io",
  },
});

// By ID
const user = await prisma.user.findUnique({
  where: {
    id: 99,
  },
});
```

### Get record by compound ID or compound unique identifier

```ts
model TimePeriod {
  year    Int
  quarter Int
  total   Decimal

  @@id([year, quarter])
}

const timePeriod = await prisma.timePeriod.findUnique({
  where: {
    year_quarter: {
      quarter: 4,
      year: 2020,
    },
  },
})

// custom name
model TimePeriod {
  year    Int
  quarter Int
  total   Decimal

  @@unique(fields: [year, quarter], name: "timePeriodId")
}
```

### Get all records

```ts
// get all
const users = await prisma.user.findMany();

// pagination
const results = await prisma.post.findMany({
  skip: 3,
  take: 4,
});
```

### Get the first record that matches a specific criteria

```ts
const findUser = await prisma.user.findFirst({
  where: {
    posts: {
      some: {
        likes: {
          gt: 100,
        },
      },
    },
  },
  orderBy: {
    id: "desc",
  },
});
```

### filter

```ts
const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: "prisma.io",
    },
    posts: {
      some: {
        published: false,
      },
    },
  },
});
```

## Update

### Update a single record

```ts
const updateUser = await prisma.user.update({
  where: {
    email: "viola@prisma.io",
  },
  data: {
    name: "Viola the Magnificent",
  },
});
```

### Update multiple records

```ts
const updateUsers = await prisma.user.updateMany({
  where: {
    email: {
      contains: "prisma.io",
    },
  },
  data: {
    role: "ADMIN",
  },
});
```

### Update or create records

```ts
const upsertUser = await prisma.user.upsert({
  where: {
    email: "viola@prisma.io",
  },
  update: {
    name: "Viola the Magnificent",
  },
  create: {
    email: "viola@prisma.io",
    name: "Viola the Magnificent",
  },
});
```

## Delete

### Delete a single record

```ts
const deleteUser = await prisma.user.delete({
  where: {
    email: "bert@prisma.io",
  },
});
```

### Delete multiple records

```ts
const deleteUsers = await prisma.user.deleteMany({
  where: {
    email: {
      contains: "prisma.io",
    },
  },
});
```

### Delete all records

```ts
const deleteUsers = await prisma.user.deleteMany({});
```
