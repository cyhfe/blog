# npmdocs 笔记

## 版本管理

| description                               | version |
| ----------------------------------------- | ------- |
| First release                             | 1.0.0   |
| Backward compatible bug fixes             | 1.0.1   |
| Backward compatible new features          | 1.1.0   |
| Changes that break backward compatibility | 2.0.0   |

```bash
# bug fixes: 1.0.0 => 1.0.1
npm version patch

# new features 1.0.0 => 1.1.0
npm version minor

# breaking change 1.0.0 => 2.0.0
npm version major
```

版本计算器: [https://semver.npmjs.com/#syntax-examples](https://semver.npmjs.com/#syntax-examples)

视频: [https://www.youtube.com/watch?v=kK4Meix58R4&t=150s](https://www.youtube.com/watch?v=kK4Meix58R4&t=150s)

- 只接受 bug 修复的小版本更新
  `1.0`
  `1.0.x`
  `~1.0.4`

- 接受新特性的更新
  `1`
  `1.x`
  `^1.0.4`

## 依赖

- "dependencies": Packages required by your application in production.
- "devDependencies": Packages that are only needed for local development and testing.
- "peerDependencies": it is not automatically installed. Instead, the code that includes the package must include it as its dependency.

## folders

- Local install (default): puts stuff in ./node_modules of the current package root.
- Global install (with -g): puts stuff in /usr/local or wherever node is installed.
- Install it locally if you're going to require() it.
- Install it globally if you're going to run it on the command line.
- If you need both, then install it in both places, or use npm link.

## Common errors

### Generating and locating npm-debug.log files

```bash
npm install --timing
npm publish --timing
```

You can find the npm-debug.log file in your .npm directory. To find your .npm directory, use npm config get cache.

### Random errors

- Some strange issues can be resolved by simply running `npm cache clean` and trying again.
- If you are having trouble with npm install, use the `-verbose` option to see more details.
