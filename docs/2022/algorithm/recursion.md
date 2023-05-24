---
sidebar_position: 1
---

# 递归

[Recursion in Programming - Full Course](https://www.youtube.com/watch?v=IJDJ0kBx2LM&t=528s)

## 排队

我想知道自己在第几个，我问前面一个人，前面的人也不知道，他也需要往前问，直到问到第一个人。

第一个人知道自己的位置（终止条件）， 他告诉第二个人，直到累加到自己。

```js
function getMyPositionInLine(person) {
  if (person.next === null) {
    return 1
  }
  return 1 + getMyPositionInLine(person.next)
}
```
