# searchParams

```js
const url = "https://fliggy.com/demo?name=feizhu&from=home&job=frontend&extraInfo=%7B%22a%22%3A%22b%22%2C%22c%22%3A%22d%22%7D"

function searchParams(url){
  const sliceUrl = url.split('?').pop().split('#').shift()

  const decodeQuery = decodeURIComponent(sliceUrl).split('&')

  const output = {}

  decodeQuery.forEach(item => {
    const [key, value] = item.split('=')
    const parsedValue = parse(value)
    output[key] = parsedValue
  })

  return output
}

function parse(v){
  try {
    return JSON.parse(v)
  } catch (e) {
    return v
  }
}

```