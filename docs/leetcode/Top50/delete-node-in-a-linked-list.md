---
sidebar_position: 11
tags:
  - 算法
---

[delete-node-in-a-linked-list](https://leetcode.com/problems/delete-node-in-a-linked-list/)

```js
var deleteNode = function (node) {
  node.val = node.next.val
  node.next = node.next.next
}
```
