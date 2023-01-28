---
title: Arch 使用指纹
description: 20XKA001CD ThinkPad T14 Gen 2a & KDE + SDDM  
date: 2022-06-03 22:13
update: 2022-06-03 22:13
tags:
  - linux
head:
  - - meta
    - name: keywords
      content: Arch 指纹 KDE SDDM  
---

## 目录

> 20XKA001CD ThinkPad T14 Gen 2a  
> KDE + SDDM  
>
> [arch wiki](https://wiki.archlinux.org/title/Fprint)

## 电脑固件更新管理（可选）

```bash
# 安装固件管理软件包
pacman -S fwupd
# 查看电脑相关硬件设备
fwupdmgr get-devices
# 刷新设备版本状态
fwupdmgr refresh --force
# 获取更新
fwupdmgr get-updates
# 安装更新
fwupdmgr update
```

## 指纹模块

```bash
# 先检查电是否也指纹设备
## 是否有 Fingerprint Reader 或相关字样
pacman -S usbutils
lsusb

# 安装指纹模块包
pacman -S fprintd imagemagick 

# 同一时间可以对指纹或密码做验证
## 而非密码不通过再去验证指纹以及对立情况
paru -S  pam-fprint-grosshack
```

## `/etc/pam.d/` 下文件编辑

```bash
## 特殊处理 sddm 和 kde 文件单独处理
## https://wiki.archlinux.org/title/SDDM#Using_a_fingerprint_reader
## 为了使得不影响 kwallet 随登录自启动，开机第一次解锁时以数字密码解锁
## 后面屏幕解锁可在密码输入框直接回车，待提示指纹时已指纹解锁
# sddm
auth 			[success=1 new_authtok_reqd=1 default=ignore]  	pam_unix.so try_first_pass likeauth nullok
auth 			sufficient  	pam_fprintd.so
# kde
auth 			sufficient  	pam_unix.so try_first_pass likeauth nullok
auth 			sufficient  	pam_fprintd.so
```

```bash
# `/etc/pam.d/` 下其余文件都可以在文件头部添加下面两行内容
## 也可以择选日常情况使用会经常涉及到的，如：polkit-1 sudo
### [polki](https://wiki.archlinux.org/title/Polkit_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
auth		sufficient  	pam_fprintd_grosshack.so
auth		sufficient  	pam_unix.so try_first_pass nullok
```

## 添加指纹

```bash
# 命令行
fprintd-enroll

# 或 GUI 界面 (KDE)
##系统设置 -> 用户 -> 配置指纹身份认证
```
