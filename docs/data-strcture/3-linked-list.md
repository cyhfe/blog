---
sidebar_position: 3
---

# linked-list

![](/img/data-structure/linkedlist.png)

## linked-list 实现

```js
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor(value) {
    this.head = new Node(value)
    this.tail = this.head
    this.length = 1
  }

  append(value) {
    const newNode = new Node(value)
    this.tail.next = newNode
    this.tail = newNode
    this.length++
  }

  prepend(value) {
    const newNode = new Node(value)
    newNode.next = this.head
    this.head = newNode
    this.length++
  }

  printList() {
    const output = []
    let current = this.head
    while (current !== null) {
      output.push(current.value)
      current = current.next
    }
    console.log(output)
  }

  insert(value, index) {
    if (index >= this.length) {
      return this.append(value)
    }

    if (index === 0) {
      return this.prepend(value)
    }

    const newNode = new Node(value)
    const leader = this.traverseToIndex(index - 1)
    const fllower = leader.next

    newNode.next = fllower
    leader.next = newNode
    this.length++
  }

  traverseToIndex(index) {
    let node = this.head
    let count = 0
    while (count < index) {
      if (node.next === null) return undefined
      node = node.next
      count++
    }
    return node
  }

  remove(index) {
    if (index > this.length - 1 || index < 0) return
    if (index === 0) {
      this.head = this.next
      this.length--
      return
    }

    const leader = this.traverseToIndex(index - 1)
    const fllower = leader.next.next
    leader.next = fllower
    this.length--
  }

  reverse() {
    let prev = null
    let current = this.head
    this.tail = this.head
    while (current) {
      // 保存next， 不能改变它，需要连接到后面的数据
      const next = current.next
      if (next === null) {
        this.head = current
      }

      current.next = prev

      prev = current
      current = next
    }
  }
}

// test
const list = new LinkedList(1)
list.append(2)
list.append(3)
list.prepend(0)
list.reverse()
list.printList()
console.log(list)
```
