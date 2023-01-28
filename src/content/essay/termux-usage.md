---
title: Termux 使用
description: 安卓手机上运行Linux系统  
date: 2022-08-28 09:47
update: 2022-08-28 09:47
tags:
  - linux
  - android
head:
  - - meta
    - name: keywords
      content: termux linux android
---

## 目录

> [Termux](https://github.com/termux/termux-app)  
> Termux is an Android terminal emulator and Linux environment app that works directly with no rooting or setup required. A minimal base system is installed automatically - additional packages are available using the APT package manager.  
> Termux 是一种 Android 终端仿真器和Linux环境应用程序，直接工作，无需 root 或设置。自动安装最小的基本系统 - 使用 APT 软件包管理器提供其他软件包。  


## 安装包

- [F-Droid](https://f-droid.org/en/packages/com.termux/)
- [Github Releases](https://github.com/termux/termux-app/releases)

## 使用

### 使用 ssh

```bash
## termux ssh 端口号为 8022，连接时需要指定端口号
## ssh <user>@<ip> -p 8022

# 配置密码
passwd
# 查看用户名
whoami
# 查看 ip
ipconfig
# 安装软件包
pkg install openssh
# 启动服务
sshd
```

### 更换镜像源


```bash
termux-change-repo
```

### 安装 proot-distro

```bash
pkg update
pkg install proot-distro 
```

##### proot-distro 基本使用

```bash
## 查看帮助
proot-distro --help
## 可用系统列表
proot-distro list
## 安装系统 <alias> 为 list 中打印的系统别名
proot-distro install <alias>
## 启动系统 
### 默认用户为 root
### 指定用户名 --user <用户名>
proot-distro login <alias>
```

### proot-distro 使用

```bash
# 以 archlinux 为例
## archlinux 来自 `proot-distro list` 中的 alias
proot-distro install archlinux
proot-distro login archlinux
```

```bash
# archlinux

# 配置秘密
passwd

# 先安装 vim 编辑器
pacman -S vim

# 更换镜像源
## Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxarm/$arch/$repo
vim /etc/pacman.d/mirrorlist
pacman -Syy

pacman -Syyu
pacman -S base base-devel
```

