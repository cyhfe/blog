function singleNumber(nums) {
  const map = {}
  for (let i = 0; i < nums.length; i++) {
    if (!map[nums[i]]) {
      map[nums[i]] = true
    } else {
      map[nums[i]] = false
    }
  }

  for (let key in map) {
    if (map[key]) {
      return key
    }
  }
}
