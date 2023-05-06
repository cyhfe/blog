# barChart race

```js
function createChart() {
  const data = getData();
  // 本质上是个柱状图 x: 品牌价值, y: 排名
  // 我们还有另外一个维度的数据需要展示: date
  // date => data 的关系可以用过渡动画来表达
  // 数据很大,只展示前几名,所以data需要准备好排序以便裁切
  const keyframs = createKeyframs(data);

  function animation(keyframs) {}

  function update() {
    animation(keyframs);
  }

  return {
    keyframs,
    animation,
    update,
  };
}

const chart = createChart();
chart.animation();
onclick = chart.update();
```
