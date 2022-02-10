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
//   // 待排序
//   for (let i = 1; i < nums.length; i++) {
//     //已排序
//     let j = i
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

function mergeSort(nums) {
  let output
  if (nums.length > 1) {
    const mid = Math.floor(nums.length / 2)
    const left = mergeSort(nums.slice(0, mid))
    const right = mergeSort(nums.slice(mid))
    output = merge(left, right)
  }
  return output
}
