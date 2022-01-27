---
sidebar_position: 13
tags:
  - 算法
---

# valid-anagram

[valid-anagram](https://leetcode.com/problems/valid-anagram/)

```js
var maxProfit = function (prices) {
  if (s.length !== t.length) return false
  const mapS = {}
  for (let i = 0; i < s.length; i++) {
    if (!mapS[s[i]]) {
      mapS[s[i]] = 1
    } else {
      mapS[s[i]] = mapS[s[i]] + 1
    }
  }

  const mapT = {}
  for (let i = 0; i < t.length; i++) {
    if (!mapT[t[i]]) {
      mapT[t[i]] = 1
    } else {
      mapT[t[i]] = mapT[t[i]] + 1
    }
  }

  for (const [key, value] of Object.entries(mapS)) {
    if (mapS[key] !== mapT[key]) {
      return false
    }
  }

  return true
}
```
