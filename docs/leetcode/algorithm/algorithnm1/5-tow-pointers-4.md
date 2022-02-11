---
sidebar_position: 5
---

# two pointers 4

## 876 链表的中间节点

```js
// fast移动2次， slow移动一次
var middleNode = function (head) {
  let fast = head
  let slow = head
  while (fast) {
    fast = fast.next
    if (!fast) break
    fast = fast.next
    slow = slow.next
  }
  return slow
}
```

## 19. 删除链表的倒数第 N 个结点

```js
let fast = head
let slow = head

for (let i = 0; i < n; i++) {
  fast = fast.next
}

if (!fast) return head.next

while (fast.next) {
  fast = fast.next
  slow = slow.next
}

slow.next = slow.next.next

return head
```
