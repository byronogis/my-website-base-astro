---
title: 给 systemd-boot 设置默认启动项
description: 安装 windows 和 linux 双系统后, 设置 windows 为默认启动项
tags:
  - linux
date: 2022-10-19 15:35
---

## 目录

> 安装 archlinux 时默认包含了 systemd-boot, 可直接安装  
> systemd-boot 会自动扫描 Windows 启动管理器添加到启动项  


## 打印可用的启动项

> 其中每一项的 id 在下面设置默认启动项时作为值会用得到

```bash
# 打印可用的启动项
bootctl list
```

## 设置默认启动项

> [Adding loaders](https://wiki.archlinux.org/title/Systemd-boot#Adding_loaders)

添加(已有则修改) default 项
`<bootid>` 为上面打印出的想要设为默认项的 id 字段对应的值

> 双系统下, systemd-boot 扫描出的 windows 启动项的 id 为 auto-windows  

```bash
# /boot/loader/loader.conf

default <bootid>
# 默认启动 windows
default auto-windows
```
