---
update: 2023-04-02 21:34
title: 让你的锚点跳转位置更精确
description: 拦截事件默认行为, 自定位跳转位置, 避免在header固定时锚点的跳转会被header遮挡
date: 2023-04-02 14:20
tags:
  - javascript
  - html
head:
  - - meta
    - name: keywords
      content: javascript html 锚点跳转
---

## 目录

## 问题

在 html 页面中锚点跳转默认时会将指向的锚点位置放在页面顶部, 但是当页面有固定的 header 时, 会被遮挡, 这时候我们需要自定义锚点跳转的位置, 使其不被遮挡. 

## 解决

### 拦截锚点跳转事件默认行为

```js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    event.preventDefault()
    // do something
  })
})

// 或者利用冒泡做事件委托也可以
document.querySelector('parent-of-a').addEventListener('click', event => {
  if (
    event.target
    && event.target instanceof HTMLAnchorElement
    && event.target.hash.startsWith('#')
  ) {
    event.preventDefault()
    // do something
  }
})
```

### 获取锚点跳转目标元素

```js
// 对 hash 进行解码
const hash = decodeURIComponent(event.target.hash)
const target = document.querySelector(hash)
```

### 跳转到目标元素

```js
window.scrollTo({
  top: targte.offsetTop - 100, // 这里的 100 为 header 的高度
  behavior: 'smooth',
})
```

### 向浏览器历史记录添加新的记录

> 这一步是为了让浏览器的前进后退按钮能正常工作

```js
history.pushState(null, null, event.target.hash)
```

## 完整代码

```js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    event.preventDefault()
    try {
      // 解码这一步会有失败的可能, 这里使用 try catch 进行捕获
      const hash = decodeURIComponent(event.target.hash)
      const target = document.querySelector(hash)
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth',
      })
      history.pushState(null, null, event.target.hash)
    } catch (error) {
      console.error(error)
    }
  })
})
```
