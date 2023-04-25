---
sidebar_position: 1
---

## 动画性能

修改 DOM 和样式会导致浏览器重新绘制，浏览器绘制有 3 种方式：重排（布局，宽，高等），重绘（颜色，背景，透明度等），合成（transform）

流程： 重排 > 重绘 > 合成

以下网站展示了对应属性修改的绘制方式

[https://csstriggers.com/](https://csstriggers.com/)

```js
function reflow(el) {
  el.offsetHeight //访问dom几何属性会强制重排,可以用来实现重新开始动画
}

function restartAnimation(el) {
  el.style.animation = "none"
  reflow(el)
  el.style.animation = null
}
```

## animation-timing-function

`cubic-bezier(0.5, 0, 0.5, 1)`: 一个好用的缓冲弹性函数

## 动画编排

```html
<div class="container">
  <div class="ball" style="--i: 0"></div>
  <div class="ball" style="--i: 1"></div>
  <div class="ball" style="--i: 2"></div>
  <div class="ball" style="--i: 3"></div>
</div>
<button id="trigger">restart</button>
```

```css
.container {
  --duration: 1s;
  --stagger: 0.8s;
  --delay: calc(var(--duration) - var(--stagger));
}

.ball {
  height: 5vmin;
  width: 5vmin;
  border-radius: 50%;
  background: radial-gradient(circle at bottom right, #fb2324, #fe932a);
  animation: slide-right var(--duration) calc(var(--delay) * var(--i))
    cubic-bezier(0.5, 0, 0.5, 1) both;
}

@keyframes slide-right {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(10vw);
  }
}
```

```js
const btn = document.getElementById("trigger")
const balls = document.getElementsByClassName("ball")

function reflow(el) {
  el.offsetHeight //访问dom几何属性会强制重排,可以用来实现重新开始动画
}

function restartAnimation(el) {
  el.style.animation = "none"
  reflow(el)
  el.style.animation = null
}

btn.onclick = () => {
  Array.from(balls).forEach((ball) => {
    restartAnimation(ball)
  })
}
```
