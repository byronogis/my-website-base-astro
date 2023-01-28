---
title: 只在打印时出现指定内容
description: 方案一:监听打印事件动态插入内容; 方案二:利用媒体查询针对性设置样式
tags:
  - html
date: 2022-12-19 16:31
update: 2022-12-19 23:00

---

## 目录

## 方案一:监听打印事件动态插入内容

### 操作步骤

> [Window.matchMedia() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia)  
> [MediaQueryList | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList)  
> [matches | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList/matches)  

- 向 `window.matchMedia()`, 传入可用于媒体查询解析的字符串参数, 
- 返回一个 `MediaQueryList` 实例, 
- 实例添加 `change` 事件监听, 
- 判断当事件对象上的属性 `matches` 
- 为真是, 动态添加内容,
- 为假时,将添加的内容是移除


### 最小实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>print</title>
</head>
<body>
  <script>
      const print = window.matchMedia('print')
      print.addEventListener('change', ({ matches }) => {
        if (matches) {
          const new = document.createElement('div')
          new.className = 'new'
          new.innerText = '会出现在打印界面的内容'
          document.body.appendChild(new)
        } else {
          const new = document.querySelector('.new')
          document.body.removeChild(new)
        }
      })
  </script>
</body>
</html>
```

## 方案二:利用媒体查询针对性设置样式

### 最小实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>print</title>
  <style>
    .example {
      display: none;
    }
    @media print {
      .example {
        display: block;
      }

    }
  </style>
</head>
<body>
  <p class="example">打印设备中显示</p>
</body>
</html>
```
