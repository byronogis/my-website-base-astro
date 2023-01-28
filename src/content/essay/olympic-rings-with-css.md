---
title: 用css写一个奥运五环
description: 用css写一个奥运五环
tags:
  - css
date: 2022-12-23 14:00
---

## 目录

## 效果

![奥运五环](/essay-assets/olympic-rings.png)

## 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>奥运五环</title>
  <style>
    :root {
      --olympic-blue: #006BB0;
      --olympic-yellow: #EFA90D;
      --olympic-black: #1D1815;
      --olympic-green: #059341;
      --olympic-rad: #DC2F1F;
      --size: 30vw;
      --thickness: 3vw;
    }

    /* 布局 */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      min-height: 100vh;
      /* min-width: calc(var(--size) * 5); */
      display: flex;
      justify-content: center;
      align-items: center;
      /* background-color: #ccc; */
    }
    .olympic {
      width: calc(var(--size) * 3.5);
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .olympic .ring {
      position: relative;
      margin-right: calc(var(--size) * 0.06);
      width: var(--size);
      height: var(--size);
      border: var(--thickness) solid #ddd;
      border-radius: 50%;
    }
    .olympic .ring:nth-child(n + 4) {
      /* transform: translateY(calc(var(--size) * -0.5)); */
      top: calc(var(--size) * -0.5);
    }

    /* 上色 */
    .olympic .ring:nth-child(1) {
      border-color: var(--olympic-blue);
    }
    .olympic .ring:nth-child(2) {
      border-color: var(--olympic-black);
    }
    .olympic .ring:nth-child(3) {
      border-color: var(--olympic-rad);
    }
    .olympic .ring:nth-child(4) {
      border-color: var(--olympic-yellow);
    }
    .olympic .ring:nth-child(5) {
      border-color: var(--olympic-green);
    }

    /* 层叠 */
    .olympic .ring:nth-child(n)::before {
      content: "";
      position: absolute;
      z-index: 10;
      inset: calc(var(--thickness) * -1);
      border: var(--thickness) solid transparent;
      border-radius: 50%;
    }
    .olympic .ring:nth-child(1)::before {
      border-right-color: var(--olympic-blue);
    }
    .olympic .ring:nth-child(2)::before {
      border-right-color: var(--olympic-black);
      border-bottom-color: var(--olympic-black);
    }
    .olympic .ring:nth-child(3)::before {
      border-bottom-color: var(--olympic-rad);
    }
    .olympic .ring:nth-child(5)::before {
      border-left-color: var(--olympic-green);
    }
  </style>
</head>
<body>
  <div class="olympic">
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="ring"></div>
  </div>
</body>
</html>
```

