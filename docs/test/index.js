class Node {
  constructor(value) {
    this.left = null
    this.right = null
    this.value = value
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }
  insert(value) {
    const newNode = new Node(value)
    if (this.root === null) {
      this.root = newNode
    } else {
      let current = this.root
      while (current) {
        if (value < current.value) {
          if (current.left === null) {
            current.left = newNode
            return
          } else {
            current = current.left
          }
        } else {
          if (current.right === null) {
            current.right = newNode
            return
          } else {
            current = current.right
          }
        }
      }
    }
  }
  lookup(value) {
    if (this.root === null) return false
    let current = this.root
    while (current) {
      if (value === current.value) return true
      if (value < current.value) {
        current = current.left
      } else {
        current = current.right
      }
    }
    return false
  }

  // todo
  remove(value) {}
}

const tree = new BinarySearchTree()
tree.insert(9)
tree.insert(4)
tree.insert(6)
tree.insert(20)
tree.insert(170)
tree.insert(15)
tree.insert(1)
let r = JSON.stringify(traverse(tree.root))
console.log(tree.lookup(171))

//     9
//  4     20
//1  6  15  170

function traverse(node) {
  const tree = { value: node.value }
  tree.left = node.left === null ? null : traverse(node.left)
  tree.right = node.right === null ? null : traverse(node.right)
  return tree
}
