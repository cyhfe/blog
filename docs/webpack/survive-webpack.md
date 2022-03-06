# survive webpack

## Resource
[survive webpack](https://survivejs.com/webpack/preface/)


## 开发环境

`--watch`: 文件变化重新 build

### webpack-dev-server

将文件加载进内存(不会构建)

```json
    "start": "webpack serve --open --mode development",
```

### 配置文件

使用`webpack-merge`分割配置文件

```js

const commonConfig = {
  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  },
  plugins: [new HtmlWebpackPlugin()],
}

const productionConfig = {}

const developmentConfig = {
  devServer: {
    static: "./dist",
  },
}

module.exports = (env, args) => {
  switch (args.mode) {
    case "development":
      return merge(commonConfig, developmentConfig, { mode: args.mode })
    case "production":
      return merge(commonConfig, productionConfig, { mode: args.mode })
    default:
      throw new Error("No matching configuration was found!")
  }
}
```

## style

`css-loader`根据`@import` and `url()`查找本地文件(跳过远程文件),加入打包的输出文件

`style-loader`将样式插入 html 的 `style` 标签中

`mini-css-extract-plugin`: 通过 JavaScript 插入样式并不理想,我们需要将 css 分离到自己的文件中

`PurgeCSS`: 移除未使用的 css

`postcss-loader`: 自动添加前缀

## assets

### javascript

// 
