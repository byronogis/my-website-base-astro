---
title: 网站置灰
description: filter backdrop-filter mix-blend-mode
tags:
  - css
date: 2022-12-07 15:15
---

## 目录

## filter

> 目标元素本身添加效果  

```css
html {
  filter: grayscale(.95);
}
```

## backdrop-filter

> 目标元素后面的区域添加效果 
> `pointer-events: none;` 保证页面本身交互  

```css
/* 实现仅首屏置灰 */
html {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
}

html::before {
  content: "";
  position: absolute;
  inset: 0; /** top: 0; bottom: 0; left: 0; right: 0; 的简写 */
  z-index: 10;
  backdrop-filter: grayscale(.95);
  pointer-events: none;
}
```

## 混合模式

> `mix-blend-mode` `background-blend-mode`   
> 相比 `backdrop-filter` 兼容性更好  

```css
/* 实现仅首屏置灰 */
html {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: #fff; /** 注意设置白色背景 */
}

html::before {
  content: "";
  position: absolute;
  inset: 0; /** top: 0; bottom: 0; left: 0; right: 0; 的简写 */
  z-index: 10;
  /* backdrop-filter: grayscale(.95); */
  background: rgba(0, 0, 0, 1);
  mix-blend-mode: color;
  pointer-events: none;
}
```
