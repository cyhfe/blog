# 使用 MERN 构建应用

以之前做的书架应用为例

[https://github.com/cyhfe/book-shelf/tree/main/server](https://github.com/cyhfe/book-shelf/tree/main/server)

## 文件结构

```js
   └── src
        ├── app.js // express 实例
        ├── auth.js // 鉴权路由
        ├── books.json
        ├── index.js // http server
        ├── init.js
        └── resource // restful风格
            ├── book
            │   ├── book.controller.js // 逻辑处理
            │   ├── book.model.js // mongoose schema
            │   └── book.router.js // 路由
            ├── list
            │   ├── list.controller.js
            │   ├── list.model.js
            │   └── list.router.js
            └── user
                ├── user.controller.js
                ├── user.model.js
                └── user.router.js

```

## express 应用实例入口

```js file="index.js"
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cors = require("cors")
const { me, login, logout, register, protect } = require("./auth")
const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

const booksRouter = require("./resource/book/book.router")
const listRouter = require("./resource/list/list.router")

// 跨域
app.use(cors())

// 解析req.body
app.use(express.json())

// 开放静态文件目录
app.use(express.static(path.resolve(__dirname, "../public")))

// 登录注册
app.post("/me", me)
app.post("/register", register)
app.post("/login", login)
app.post("/logout", logout)

// api鉴权保护
app.use("/api", protect)

// 提供restful接口
app.use("/api/book", booksRouter)
app.use("/api/list", listRouter)

// react app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"))
})

// 连接数据库
async function start() {
  await mongoose.connect(MONGO_URL)
  console.log("connected to database")
  // 监听端口
  app.listen(PORT, () => {
    console.log("server running in " + PORT)
  })
}

// 启动服务
start()

module.exports = app
```

## 存储密码时加密

```js
// mongoose hook

// 保存密码前加密
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

// 提供方法解密校验密码
userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, function (err, result) {
      if (err) return reject(err)
      return resolve(result)
    })
  })
}
```

## 鉴权

```js
// 注册时生成token,保存在user中 token保存用户信息

async function register(req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: "缺少用户名或密码" })
  }

  let user
  try {
    user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({ message: "用户名已存在" })
    }

    user = await User.create({ username, password })
    const token = newToken(user)
    user.token = token
    await user.save()
    return res.status(201).json({
      id: user.id,
      token,
      username: user.username,
    })
  } catch (error) {
    res.status(500).send()
  }
}

// 登陆时返回token
async function login(req, res) {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ message: "用户名不存在" })
    }
    const result = await user.checkPassword(password)
    if (!result) {
      return res.status(400).json({ message: "密码错误" })
    }

    if (!user.token) {
      user.token = newToken(user)
    }
    await user.save()
    return res.status(200).json({
      id: user.id,
      token: user.token,
      username: user.username,
    })
  } catch (error) {
    res.status(500).send()
  }
}
```

```js
// 路由鉴权
async function protect(req, res, next) {
  const token = getToken(req.headers.authorization)
  if (!token) {
    return res.status(401).send()
  }
  let payload
  let user

  try {
    payload = await verifyToken(token)
    user = await User.findOne({
      _id: payload.id,
      token,
    }).select("-password")
  } catch (error) {
    return res.status(500).send()
  }

  if (!user || !payload) {
    return res.status(401).send()
  }

  req.user = user
  next()
}
```

## CRUD

```js
async function addToListItem(req, res) {
  const { id } = req.user
  const { bookId } = req.body
  try {
    const book = await List.findOne({
      createdBy: id,
      "books.book": bookId,
    })
    if (book) {
      return res.status(409).json({ message: "this book has existed" })
    }
    const item = await List.findOneAndUpdate(
      {
        createdBy: id,
      },
      {
        $push: {
          books: {
            book: bookId,
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    )

    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
async function removeFromListItem(req, res) {
  const { id } = req.user
  const { bookId } = req.body
  try {
    const item = await List.findOneAndUpdate(
      {
        createdBy: id,
      },
      {
        $pull: {
          books: {
            book: bookId,
          },
        },
      }
    )
    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
async function getList(req, res) {
  const { id } = req.user
  try {
    let list = await List.findOne({
      createdBy: id,
    }).populate("books.book")

    if (!list) {
      list = await List.create({
        createdBy: id,
      })
      list = await list.populate("books.book")
    }

    res.status(200).json(list)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function modifyListItem(req, res) {
  const { id } = req.user
  const { bookId, status, notes } = req.body
  try {
    const list = await List.findOneAndUpdate(
      {
        createdBy: id,
        "books.book": bookId,
      },
      {
        $set: {
          "books.$.status": status,
          "books.$.notes": notes,
        },
      },
      { new: true }
    )

    if (!list) {
      return res.status(404).send()
    }

    res.status(200).json(list)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
```
