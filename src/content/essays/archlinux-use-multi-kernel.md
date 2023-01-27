---
title: Archlinux 安装切换内核
description: systemd-boot 下配置切换使用其它内核， kernel kernel-zen kernel-lts  
date: 2022-08-24 22:16
update: 2022-08-24 22:16
tags:
  - linux
head:
  - - meta
    - name: keywords
      content: Arch kernel linux systemd-boot 
---

[[toc]]

## 安装

> [Kernel](https://wiki.archlinux.org/title/Kernel)

```bash
# 安装打算使用的内核, 如 linux-zen
sudo pacman -S linux-zen
```

## 添加配置

> 添加 systemd-boot 启动项

```bash
# 再现有配置的基础上复制进行修改
cp /boot/loader/entries/arch.conf /boot/loader/entries/arch-zen.conf
cp /boot/loader/entries/arch-fallback.conf /boot/loader/entries/arch-fallback-zen.conf

# 编辑上面新文件的内容 old => new
## arch-zen.conf
linux /vmlinuz-linux => linux /vmlinuz-linux-zen
initrd /initramfs-linux.img => initrd /initramfs-linux-zen.img
## arch-fallback-zen.conf
linux /vmlinuz-linux => linux /vmlinuz-linux-zen
initrd /initramfs-linux-fallback.img => initrd /initramfs-linux-zen-fallback.img

# 配置默认启动项 对应上面的文件名称，`.conf`不可省略
## /boot/loader/loader.conf 
default arch-zen.conf
```
