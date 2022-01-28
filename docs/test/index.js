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

  min() {
    if (this.root === null) return null
    let current = this.root
    while (true) {
      if (current.left === null) {
        return current.value
      } else {
        current = current.left
      }
    }
  }

  max() {
    if (this.root === null) return null
    let current = this.root
    while (true) {
      if (current.right === null) {
        return current.value
      } else {
        current = current.right
      }
    }
  }

  minR() {
    if (this.root === null) return null
    return this.minNode(this.root)
  }

  minNode(node) {
    if (node.left === null) return node.value
    return this.minNode(node.left)
  }

  //inOrderTraverse
  // 中序遍历 （从小到大）
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }

  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.value)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.value)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
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

// const min = tree.min()
// const minR = tree.minR()
// const max = tree.max()
// console.log(min, minR, max)

// const array = []
// tree.inOrderTraverse((v) => array.push(v))
// console.log(array)

//     9
//  4     20
//1  6  15  170

function traverse(node) {
  const tree = { value: node.value }
  tree.left = node.left === null ? null : traverse(node.left)
  tree.right = node.right === null ? null : traverse(node.right)
  return tree
}
