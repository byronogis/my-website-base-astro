---
title: vue的三种渲染定义方式
description: 'vue的三种渲染定义方式: template, render, app.mount()'
tags:
  - vue
date: 2022-11-20 20:10
---

## 目录

## vue的三种渲染定义方式

> 需要编译时注意选择使用包含编译器的 vue 构建版本  

### template

> [vue-api: template](https://cn.vuejs.org/api/options-rendering.html#template)  

属性值为字符串, 会被编译器分析并生成渲染函数

字符串如果以 `#` 开头, 则代表该值为一个css 选择器, 供 `querySelector` 使用, 选择器的目标内容作为模板字符串被用作编译

### render

> [vue-api: render](https://cn.vuejs.org/api/options-rendering.html#render)  

一个方法, 渲染函数, 预编译的模板(字符串)最终都会被编译为渲染函数,
方法的返回值为虚拟DOM, 等待被渲染到页面.

**与 template 同时存在时, render 优先级更高**

### app.mount()

> [vue-api: app.mount()](https://cn.vuejs.org/api/application.html#app-mount)  

如果同时定义了 template 或 render, 则替换 mount 目标的内容为 template/render 的内容,
否则直接使用 mount 目标的内容作为模板进行编译.

