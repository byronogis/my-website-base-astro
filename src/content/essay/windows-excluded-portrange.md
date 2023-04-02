---
update: 2023-04-02 21:34
title: Windows 查看系统保留端口
description: 使用 v2rayn 时提示端口使用失败，检查端口使用情况
tags:
  - windows
  - 端口
date: 2022-10-24 10:36
head:
  - - meta
    - name: keywords
      content: windows 端口 v2rayn
---

## 目录

## 查看系统保留端口

> https://zhuanlan.zhihu.com/p/341274233

```bash
netsh interface ipv4 show excludedportrange protocol=tcp
```
