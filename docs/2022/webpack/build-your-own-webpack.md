---
sidebar_position: 1
---

# 自己实现一个打包工具

## 准备我们的 example ，作为打包的目标

```
├── bundle.js
└── example
  ├── entry.js
  ├── message.js
  └── name.js
```

```js title="entry.js"
import message from "./message"
console.log(message)
```

```js title="message.js"
import { name } from "./name"
export default `hello ${name}`
```

```js title="name.js"
export const name = "chen"
```

## 打包工具实现

```js title="bundle.js"
const fs = require("fs")
const path = require("path")
const babylon = require("babylon")
const traverse = require("babel-traverse").default
const babel = require("babel-core")

let ID = 0
function createAsset(filename) {
  const content = fs.readFileSync(filename, "utf-8")
  const ast = babylon.parse(content, {
    sourceType: "module",
  })

  const dependencies = []

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value)
    },
  })

  const id = ID++

  const { code } = babel.transformFromAst(ast, null, {
    presets: ["env"],
  })

  return {
    id,
    filename,
    dependencies,
    code,
  }
}

function createGraph(entry) {
  const mainAsset = createAsset(entry)

  const queue = [mainAsset]

  for (const asset of queue) {
    const dirname = path.dirname(asset.filename)
    asset.mapping = {}
    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath)

      const child = createAsset(absolutePath)
      asset.mapping[relativePath] = child.id
      queue.push(child)
    })
  }
  return queue
}

function bundle(graph) {
  let modules = ""

  graph.forEach((mod) => {
    modules += `${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],`
  })

  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(name) {
          return require(mapping[name]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      }
      require(0);
    })({${modules}})
  `
  return result
}

const graph = createGraph("./example/entry.js")
const result = bundle(graph)

console.log(result)
```

```js
// 输出内容分析
;(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id]
    function localRequire(name) {
      return require(mapping[name])
    }
    const module = { exports: {} }
    fn(localRequire, module, module.exports)
    return module.exports
  }
  require(0)
})({
  0: [
    function (require, module, exports) {
      "use strict"

      var _message = require("./message.js")

      var _message2 = _interopRequireDefault(_message)

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj }
      }

      console.log(_message2.default)
    },
    { "./message.js": 1 },
  ],
  1: [
    function (require, module, exports) {
      "use strict"

      Object.defineProperty(exports, "__esModule", {
        value: true,
      })

      var _name = require("./name.js")

      exports.default = "hello " + _name.name
    },
    { "./name.js": 2 },
  ],
  2: [
    function (require, module, exports) {
      "use strict"

      Object.defineProperty(exports, "__esModule", {
        value: true,
      })
      var name = (exports.name = "chen")
    },
    {},
  ],
})
```
