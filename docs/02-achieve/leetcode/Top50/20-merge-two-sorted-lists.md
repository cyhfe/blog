---
sidebar_position: 20
tags:
  - 算法
---

# merge-two-sorted-lists

[merge-two-sorted-lists](https://leetcode.com/problems/merge-two-sorted-lists/)

```js
if (!list1 || !list2) return list1 ? list1 : list2

const output = { val: -1, next: null }
let head = output

while (list1 && list2) {
  const v1 = list1.val
  const v2 = list2.val
  if (v1 < v2) {
    head.next = { val: v1, next: null }
    head = head.next
    list1 = list1.next
  } else {
    head.next = { val: v2, next: null }
    head = head.next
    list2 = list2.next
  }
}

if (list1) {
  head.next = list1
}

if (list2) {
  head.next = list2
}

return output.next
```
