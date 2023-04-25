---
sidebar_position: 2
---

# lineChart

## 1. 获取数据

```js
// {
//   "temperatureMax": 25.79,
//   "date": "2018-01-02"
//   ...
// },

const dataset = await d3.json("./../../my_weather_data.json")

const yAccessor = (d) => d.temperatureMax
// 将date字符串转化为对象
const dateParser = d3.timeParse("%Y-%m-%d")
const xAccessor = (d) => dateParser(d.date)
```

## 2. 确定图表的位置

```js
let dimensions = {
  width: window.innerWidth * 0.9,
  height: 400,
  margin: {
    top: 15,
    right: 15,
    bottom: 40,
    left: 60,
  },
}
dimensions.boundedWidth =
  dimensions.width - dimensions.margin.left - dimensions.margin.right
dimensions.boundedHeight =
  dimensions.height - dimensions.margin.top - dimensions.margin.bottom
```

## 3. 创建 svg

```js
const svg = d3
  .select("#wrapper")
  .append("svg")
  .attr("width", dimensions.width)
  .attr("height", dimensions.height)

const bounds = svg
  .append("g")
  .style(
    "transform",
    `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
  )
```

## 4. 创建 scales

```js
const yScale = d3
  .scaleLinear()
  .domain(d3.extent(dataset, yAccessor)) //[min, max]
  .range([dimensions.boundedHeight, 0])

const xScale = d3
  .scaleTime()
  .domain(d3.extent(dataset, xAccessor))
  .range([0, dimensions.boundedWidth])
```

## 5. 绘制路径

```js
const lineGenerator = d3
  .line()
  .x((d) => xScale(xAccessor(d)))
  .y((d) => yScale(yAccessor(d)))

const line = bounds
  .append("path")
  .attr("d", lineGenerator(dataset))
  .attr("fill", "none")
  .attr("stroke", "#af9358")
  .attr("stroke-width", 2)
```

## 6. 绘制坐标轴

```js
const yAxisGenerator = d3.axisLeft().scale(yScale)

const yAxis = bounds.append("g").call(yAxisGenerator)

const xAxisGenerator = d3.axisBottom().scale(xScale)

const xAxis = bounds
  .append("g")
  .call(xAxisGenerator)
  .style("transform", `translateY(${dimensions.boundedHeight}px)`)
```
