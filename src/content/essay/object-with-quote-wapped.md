---
update: 2023-07-08 12:09
title: 解析被引号包裹的对象
description: 利用Function构造函数或JSON5解析被引号包裹的对象
date: 2023-07-08 12:00
tags:
  - js
  - object
head:
  - - meta
    - name: keywords
      content: js 引号 对象 json5 function
---

## 目录

## 情景

在某些情况下，我得到了一个被引号包裹的对象（非JSON），如下：

```js
const str = '{name: "zhangsan", age: 18}'
```

我想要得到一个对象，如下：

```js
const obj = {
  name: 'zhangsan',
  age: 18
}
```

## 解决方案

> 

### 利用Function构造函数

利用Function构造函数，如下：

```js
function looseJsonParse(obj) {

  return window.Function(`"use strict";return (${obj});`)()
}

const str = '{name: "zhangsan", age: 18}'
const obj = looseJsonParse(str)
```

### JSON5

利用 [JSON5](https://github.com/json5/json5)，如下：

```js
import JSON5 from 'json5'

const str = '{name: "zhangsan", age: 18}'
const obj = JSON5.parse(str)
```

