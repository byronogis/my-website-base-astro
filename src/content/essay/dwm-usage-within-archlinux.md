---
title: 在 archlinux 中使用 dwm
description: 
tags:
  - linux
date: 2022-12-10 06:21
update: 2022-12-12 12:30
---

## 目录

> [dwm](https://wiki.archlinux.org/title/Dwm) 是一个足够轻量的 动态[WM](https://wiki.archlinux.org/title/Window_manager)  

## 安装

```bash
git clone git://git.suckless.org/dwm ~/.dwm
cd ~/.dwm
sudo make clean install
```

## 启动方式

### 通过startx命令方式启动

> [xinit](https://wiki.archlinux.org/title/Xinit)  

1. 在用户目录下创建一份默认执行文件  

```bash
cp /etc/X11/xinit/xinitrc ~/.xinitrc

# 使可执行
chmod +x ~/.xinitrc
```

2. 去掉不需要的命令

```diff
# ~/.xinitrc

- twm &
- xclock -geometry 50x50-1+1 &
- xterm -geometry 80x50+494+51 &
- xterm -geometry 80x20+494-0 &
- exec xterm -geometry 80x66+0+0 -name login
```

3. 尾部添加 dwm

```diff
# ~/.xinitrc

+ exec dwm
```

4. tty 下启动

```bash
startx
```

### 通过显示管理器启动

比如选择 [sddm](https://wiki.archlinux.org/title/SDDM)

```bash
sudo pacman -S sddm

sudo systemctl enable sddm.service
```

#### 手动创建启动选项


1. 创建启动项文件

```bash
mkdir -p /usr/share/xsessions
touch /usr/share/xsessions/dwm.desktop
```

2. 编辑上面新建的启动项文件

```diff
# /usr/share/xsessions/dwm.desktop

+ [Desktop Entry]
+ Encoding=UTF-8
+ Name=dwm
+ Comment=Dynamic Window Manager
+ Exec=/usr/local/bin/dwm
+ TryExec=/usr/local/bin/dwm
+ Type=XSession
```

3. 重启进入显示管理器, 选择 `dwm` 项

#### 自动添加启动选项

> 利用软件包 [xinit-xsession](/usr/share/xsessions/dwm.desktop)  

1. 创建 `~/.xinitrc` 文件

见 [通过startx命令方式启动](#通过startx命令方式启动) 的 1,2,3 步骤

2. 安装 `xinit-xsession`

```bash
# 1. 利用 aur 助手, 如 paru
paru -S xinit-xsession

# 2. 或如果配置了 archlinuxcn
sudo pacman -S xinit-xsession
```

3. 重启进入显示管理器, 选择 `dwm` 项

