// function bubbleSort(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = 0; j < nums.length - 1; j++) {
//       if (nums[j] > nums[j + 1]) {
//         ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
//       }
//     }
//   }
//   return nums
// }

// console.log(bubbleSort([1, 3, 4, 5, 2, 0]))

// function selectedSort(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     let minIndex = i
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[j] < nums[minIndex]) {
//         minIndex = j
//       }
//     }
//     ;[nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
//   }
//   return nums
// }

// console.log(selectedSort([1, 3, 4, 5, 2, 0]))

// function insertSort(nums) {
//   // i 待排序
//   for (let i = 1; i < nums.length; i++) {
//     let j = i // j 插入位置
//     let temp = nums[i]
//     while (j > 0 && nums[j - 1] > temp) {
//       nums[j] = nums[j - 1]
//       j--
//     }
//     nums[j] = temp
//   }

//   return nums
// }
// console.log(insertSort([1, 3, 4, 5, 2, 0]))

// function mergeSort(nums) {
//   if (nums.length > 1) {
//     const mid = Math.floor(nums.length / 2)
//     const left = mergeSort(nums.slice(0, mid))
//     const right = mergeSort(nums.slice(mid))
//     return merge(left, right)
//   }
//   return nums
// }

// // 把问题变成排序两个有序数组
// function merge(left, right) {
//   let i = 0
//   let j = 0
//   const output = []
//   while (i < left.length && j < right.length) {
//     if (left[i] > right[j]) {
//       output.push(right[j])
//       j++
//     } else {
//       output.push(left[i])
//       i++
//     }
//   }
//   if (i < left.length) {
//     return output.concat(left.slice(i))
//   }
//   if (j < right.length) {
//     return output.concat(right.slice(j))
//   }
// }

// console.log(mergeSort([1, 3, 4, 5, 2, 0]))

// function quickSort(nums) {
//   quick(nums, 0, nums.length - 1)
//   return nums
// }

// function quick(nums, start, end) {
//   if (end <= start) return
//   const pivot = partition(nums, start, end)
//   quick(nums, start, pivot - 1)
//   quick(nums, pivot + 1, end)
// }

// function partition(nums, start, end) {
//   let pivot = end
//   let counter = start
//   for (let i = start; i < end; i++) {
//     if (nums[i] < nums[pivot]) {
//       ;[nums[counter], nums[i]] = [nums[i], nums[counter]]
//       counter++
//     }
//   }
//   ;[nums[counter], nums[pivot]] = [nums[pivot], nums[counter]]
//   return counter
// }

console.log(quickSort([1, 3, 4, 5, 2, 0]))

function quickSort(nums) {
  quick(nums, 0, nums.length - 1)
  return nums
}

function quick(nums, start, end) {
  if (end <= start) return
  const pivot = partition(nums, start, end)
  quick(nums, start, pivot - 1)
  quick(nums, pivot + 1, end)
}

function partition(nums, start, end) {
  let counter = start
  let pivot = end
  for (let i = start; i < end; i++) {
    if (nums[i] < nums[pivot]) {
      ;[nums[counter], nums[i]] = [nums[i], nums[counter]]
      counter++
    }
  }
  ;[nums[counter], nums[pivot]] = [nums[pivot], nums[counter]]
  return counter
}
