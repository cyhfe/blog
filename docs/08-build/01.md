# webpack

## 构建产物

```bash
./dist/static
├── css
│   ├── index.cc4caada.css
│   └── index.cc4caada.css.map
├── js
│   ├── index.2e0bbdb4.js
│   ├── index.2e0bbdb4.js.map
│   ├── runtime.7e80dd86.js
│   ├── runtime.7e80dd86.js.map
│   ├── vendors.dc781d86.js
│   ├── vendors.dc781d86.js.LICENSE.txt
│   └── vendors.dc781d86.js.map
└── media
    └── img.3d75a34f42dfe8c84e00.png
```

## environment

[https://webpack.js.org/guides/production/](https://webpack.js.org/guides/production/)

```bash
├── README.md
├── dist
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
├── tsconfig.json
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

## HtmlWebpackPlugin

React 需要挂载 DOM, 使用自定义模版

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```js
{
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
}
```

## webpack-manifest-plugin

```js
{
  "plugins": [
    new WebpackManifestPlugin()
  ],
}
```

## resolve

```js
{
  resolve: {
    // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
    extensions: [".tsx", ".ts", ".js"],
  }
}
```

## output

```js
  output: {
    // 不同类型分文件夹保存,方便 nginx 设置缓存

    // 入口文件
    filename: "static/js/[name].[contenthash:8].js",

    // chunk 文件: node_modules单独打包vendor chunk
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",

    // 资源文件
    assetModuleFilename: "static/media/[name].[hash][ext]",

    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
```

## loader

```js
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
```

## typescript

[https://webpack.js.org/guides/typescript/#root](https://webpack.js.org/guides/typescript/#root)

```json
// tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react-jsx",
    "allowJs": true,
    "moduleResolution": "node",
    "sourceMap": true
  }
}
```

## 资源类型声明文件

`import img from "./assets/image.png"`
直接导入资源报错,需要资源类型声明文件

```ts
// env.d.ts
declare module "*.jpg" {
  const src: string;
  export default src;
}

...
```

## 优化

### js

[https://webpack.js.org/guides/caching/](https://webpack.js.org/guides/caching/)

```json
  optimization: {
    // 将 runtime 代码拆分为一个单独的 chunk。将其设置为 single 来为所有 chunk 创建一个 runtime bundle：
    runtimeChunk: "single",

    //将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用 client 的长效缓存机制，命中缓存来消除请求，并减少向 server 获取资源，同时还能保证 client 代码和 server 代码版本一致。
    moduleIds: "deterministic",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
```

```bash
./dist/static/js
├── index.55a2dec0.js
├── index.55a2dec0.js.map
├── runtime.9473fc4f.js
├── runtime.9473fc4f.js.map
├── vendors.3fc966ce.js
└── vendors.3fc966ce.js.map
```

### css

#### mini-css-extract-plugin

[https://webpack.js.org/plugins/mini-css-extract-plugin/#root](https://webpack.js.org/plugins/mini-css-extract-plugin/#root)

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

#### CssMinimizerWebpackPlugin

[https://webpack.js.org/plugins/css-minimizer-webpack-plugin/](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/)

```json
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
```

## eslint

用`create-react-app`的配置

```bash
npm install --save-dev eslint-config-react-app eslint
```

```json
// .eslintrc.json
{
  "extends": "react-app"
}
```
