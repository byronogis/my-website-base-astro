---
title: 利用 pnpm patch 编辑项目依赖
description: 在依赖的第三方包的默认行为不贴合实际应用时, 可简单修改依赖源码以本地打补丁的方式进行修改
tags:
  - node
  - pnpm
date: 2022-12-25 11:15
---

## 目录

## 非pnpm项目

使用第三方包 [patch-package](https://github.com/ds300/patch-package)

## pnpm项目

> pnpm@>=7.4.0  

- `pnpm patch <pkg>`
- `pnpm patch-commit <path>`

**注意: 打补丁的包的版本需要和 `package.json` 中包的版本号一致**

```bash
# 假设需要打补丁的包 `need-patch`

# 执行命令, 创建包含需要打补丁包的临时目录
## 此时终端会打印该临时目录位置 `You can now edit the following folder: /path/to/tmp/***`
pnpm patch need-patch

# 进入打印的临时目录, 编辑依赖源码
## 编辑完成后, 提交补丁到本地项目
## 提交后, 项目根目录下会生成 patches 目录, 里面就是依赖包的所打补丁的详情
## 以及 `package.json` 中会提供一个 `pnpm.patchedDependencies` 进行记录
pnpm patch-commit /path/to/tmp/***
```

