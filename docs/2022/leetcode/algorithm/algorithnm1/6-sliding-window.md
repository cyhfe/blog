---
sidebar_position: 6
---

# sliding window

## 3. 无重复字符的最长子串

```js
function lengthOfLongestSubstring(s: string): number {
  let maxLen = 0
  // 迭代每一项
  for (let i = 0; i < s.length; i++) {
    let noRepeat = s[i]
    // 不重复就累加
    for (let j = i + 1; j < s.length; j++) {
      if (noRepeat.indexOf(s[j]) < 0) {
        noRepeat += s[j]
      } else {
        break
      }
    }
    maxLen = Math.max(maxLen, noRepeat.length)
  }
  return maxLen
}
```

```js
var lengthOfLongestSubstring = function (s) {
  let max = 0
  let j = 0
  const seen = new Set()
  for (let i = 0; i < s.length; i++) {
    while (seen.has(s[i])) {
      seen.delete(s[j])
      j++
    }
    seen.add(s[i])
    max = Math.max(max, i - j + 1)
  }
  return max
}
```

## 567. 字符串的排列

```js
// 水平不够，无法理解。
// 有空再见
```
