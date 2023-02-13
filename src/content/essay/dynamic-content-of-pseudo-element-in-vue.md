---
title: vue 中动态设置伪元素内容
description: 
tags:
  - vue
  - html
date: 2023-02-13 23:25
update: 2023-02-13 23:25
---

## 目录

## 在 vue 中动态设置伪元素的内容

> 用 `attr()` 获取元素属性值的方式代替 `var()` 获取 css 变量的方式  

vue中，想要通过操控伪元素content属性动态显示内容时，

如果通过css变量传递会因为生成后的css变量值不是由双引号包裹而使得content属性失效，继而伪元素失效；

可以通过动态属性(比如自定义数据属性)直接传递，然后以attr查找。



假定动态值通过变量 foo 传递

### 生效

```vue
<template>
  <!-- 下面的动态内容失效 -->
  <span class="dynamic-content" :style="{ '--dynamic-content': foo }" />
</template>

<style>
    .dynamic-content::before {
        content: var(--dynamic-content);
    }
</style>
```

### 不生效

```vue
<template>
  <!-- 下面的动态内容生效 -->
  <span class="dynamic-content" :data-dynamic-content="foo" />
</template>

<style>
    .dynamic-content::before {
        content: attr(data-dynamic-content);
    }
</style>
```

