var titleToNumber = function (columnTitle) {
  let output = 0
  let j = 0
  for (let i = columnTitle.length - 1; i >= 0; i--) {
    output += (columnTitle[i].charCodeAt(0) - 64) * Math.pow(26, j)
    j++
  }
  return output
}
