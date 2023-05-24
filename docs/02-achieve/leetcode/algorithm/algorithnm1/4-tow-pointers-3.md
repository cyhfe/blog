---
sidebar_position: 4
---

# two pointers 3

## 344 反转字符串

```js
var reverseString = function (s) {
  let start = 0
  let end = s.length - 1
  while (start < end) {
    ;[s[start], s[end]] = [s[end], s[start]]
    start++
    end--
  }
}
```

## 557. 反转字符串中的单词 3

```js
var reverseWords = function (s) {
  return s
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ")
}
```
