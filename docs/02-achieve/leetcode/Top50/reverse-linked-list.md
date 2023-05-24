---
sidebar_position: 7
tags:
  - 算法
---

[reverse-linked-list](https://leetcode.com/problems/reverse-linked-list/)

```js
var reverseList = function (head) {
  if (!head) return null
  let prev = head
  let next = head.next
  head.next = null
  while (next) {
    const temp = next
    next = next.next
    temp.next = prev
    prev = temp
  }
  return prev
}
```
