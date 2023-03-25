---
update: 2023-03-25 17:19
title: "CSS 粘性定位吸底"
description: "A CSS position: sticky but bottom example"
date: 2023-03-25 13:00
tags:
  - css
  - layout
---

## 目录

## 情景

主体内容区域中的部分需要吸底, 剩余部分高度自适应且滚动, 滚动到底部时吸底部分随后续滚动而滚动.

## 方案

- **注意: **吸底部分元素在主体内容中排在最前面, 以便在滚动的顶部时, 吸底部分可以正常显示
- 主体使用 `position: relative` 定位
- 主体中的吸底部分使用 `position: sticky` , 然后确定吸底部分的高度, 计算得到 top 值
- 主体中的剩余滚动区域使用 `position: relative` 定位, 向上偏移吸底部分的高度
- 注意声明 `z-index` 排在前面的吸底部分元素的层级高于后面的滚动区域元素

## Demo

<iframe src="https://codesandbox.io/embed/daily-css-e0t4ur?autoresize=1&fontsize=14&hidenavigation=0&initialpath=/practice/20230325-粘性定位吸底.html&module=/practice/20230325-粘性定位吸底.html&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="daily-css"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
