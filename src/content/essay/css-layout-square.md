---
title: CSS  “广场”布局(flex&grid)
description: CSS  “广场”布局(flex&grid)
date: 2022-05-23 18:29
update: 2022-05-23 18:29
tags:
  - css
head:
  - - meta
    - name: keywords
      content: CSS flex grid
---

## 目录

## 页面

![](/essay-assets/css-square-flex-grid.png)
<!-- ![](/public/) -->


## 结构

```html
  <div class="container">
    <div class="square">1</div>
    <div class="square">2</div>
    <div class="square">3</div>
    <div class="square">4</div>
    <div class="round">5</div>
  </div>
```

## 样式

### flex

```css
    .container {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      width: 210px;
    }
    .square,
    .round {
      width: 100px;
      height: 100px;
      background-color: #ccc;
      line-height: 100px;
      text-align: center;
      vertical-align: middle;
    }
    .square:nth-child(2n + 1) {
      margin-right: 10px;
    }
    .square:nth-child(-n + 2) {
      margin-bottom: 10px;
    }
    .round {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      border: 10px solid #fff;
      border-radius: 50%;
    }
```

### grid

```css
    .container {
      position: relative;
      display: inline-grid;
      grid-template-columns: 100px 100px;
      grid-template-rows: 100px 100px;
      grid-gap: 10px;
    }
    .square,
    .round {
      width: 100px;
      height: 100px;
      background-color: #ccc;
      display: grid;
      place-items: center;
    }
    .round {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      border: 10px solid #fff;
      border-radius: 50%;
    }
```
