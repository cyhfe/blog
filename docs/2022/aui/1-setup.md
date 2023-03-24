---
sidebar_position: 1
---

# 环境搭建

我选择了`dumi`开箱即用的组件库环境搭建

```bash
npx @umijs/create-dumi-lib
```

## 文档部署

文档站点部署在`netlify`,相比于 `github pages`访问速度更快.
[https://cyh-aui.netlify.app](https://cyh-aui.netlify.app/)

## 发布 npm 包

1. 打包

```bash
yarn build
```

2. package.json

```json
  "name": "@cyhfe/aui",
  "version": "1.0.1",
  "main": "es/index.js",
  "homepage": "https://cyh-aui.netlify.app/",
  "repository": {
    "type": "git",
    "url": "https://github.com/cyhfe/aui"
  },
```

3. 发布

```bash
npm login

npm version patch

npm publish --access public 
```

## style

样式方案选择`emotion`

```bash
pnpm i @emotion/react @emotion/styled
```

## icons

icon 选择`react icons`

```bash
pnpm i react-icons
```
