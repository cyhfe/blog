# Shell scripting with Node.js

Node 写 web 服务器的教程网上一大堆,如何写脚本的教程却寥寥无几.

查资料的时候发现了个宝贝 [https://exploringjs.com/nodejs-shell-scripting/toc.html](https://exploringjs.com/nodejs-shell-scripting/toc.html)

早期学 js 的时候就看过他的书,受益匪浅.

当前的目标是创建一个`webpack-react-ts`的脚手架,先粗略过一遍

## Property "bin" of package.json

This is how we can tell npm to install modules as shell scripts:

```js
"bin": {
  "my-shell-script": "./src/shell/my-shell-script.mjs",
  "another-script": "./src/shell/another-script.mjs"
}
```

If we install a package with this "bin" value globally, Node.js ensures that the commands my-shell-script and another-script become available at the command line.

If we install the package locally, we can use the two commands in package scripts or via the npx command.
