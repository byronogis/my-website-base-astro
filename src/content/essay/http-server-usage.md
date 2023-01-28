---
title: http-server 快速启动一个本地服务
description: 使用 http-server 包快速启动一个本地服务, 比如用来做局域网传输
date: 	2022-08-01 22:52
update: 	2022-08-01 22:52
tags:
  - js
  - node
head:
  - - meta
    - name: keywords
      content: http-server npm 本地服务 局域网传输
---

## 目录

> [http-server](https://www.npmjs.com/package/http-server)

## http-server 简单介绍

### 启动

1. 利用 npx 直接启动

```bash
npx http-server [path] [options]
```

2. 安装后启动

```bash
# 安装 -g --global --location-global 效果相同
npm install --location-global http-server

# 启动
http-server [path] [options]
```

### 参数

#### path 

缺省时的优先级：`./public` -> `./`

#### options

> [user-content-available-options](https://www.npmjs.com/package/http-server#user-content-available-options)

- -p 端口，默认8080，被占用则自增
- -o 随服务自动打开浏览器
- ...

## 使用

- 新建文件夹， 进入新建的文件夹

```bash
mkdir server && cd server
```

- 新建 index.html 文件

> 按需要编辑

```bash
echo "success" > index.html

# 如想要起一个简单局域网文件下载
echo '<a download href="./temp.txt">下载</a>' > index.html
```

- 启动

```bash
npx http-server

# 之后启动时如无必要可以利用参数跳过检查直接使用本地
npx --prefer-offline http-server
```
