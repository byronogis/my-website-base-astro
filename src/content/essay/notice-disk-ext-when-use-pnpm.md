---
title: pnpm 注意磁盘文件系统的支持与否
description: 注意使用的文件系统是否支持硬链接
date: 2021-11-24 15:20
update: 2021-11-24 15:20
tags:
  - computer
  - pnpm
head:
  - - meta
    - name: keywords
      content: vue pnpm 硬链接 exFAT
---


## 目录

## 情况描述

依靠 pnpm 使用脚手架创建 vue 项目时，在移动硬盘上安装 node 包发生以下报错 "command failed: pnpm install --reporter silent --shamefully-hoist"，寻查无果，后觉察到是由于使用的文件系统（exFAT）不支持硬链接所致

> 最后在移动硬盘上创建项目时不得不临时指定使用其它包管理器 `vue create vue-demo -m npm`
> vue create 命令可选项：`-m, --packageManager <command>`  在安装依赖时使用指定的 npm 客户端

![](/essay-assets/pnpm-heardlink/2554471-20211124161048627-54887928.png)



## 报错页面

![](/essay-assets/pnpm-heardlink/2554471-20211124150659092-370043771.png)

## 参考资料

- [pnpm](https://pnpm.io/zh/faq)
- [文件系统功能比较](https://docs.microsoft.com/zh-cn/windows/win32/fileio/filesystem-functionality-comparison?redirectedfrom=MSDN)
- [vue create 命令可选项](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)
