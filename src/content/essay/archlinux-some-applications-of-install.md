---
title: Arch 一些软件安装
description: archlinux 使用中一些自用软件的安装记录
date: 2022-06-03 12:12
update: 2022-12-12 13:00
tags:
  - linux
  - application
---

## 目录

> 省略了相关的 sudo，提示需要权限提升时行首添加 sudo 重新执行即可  
> AUR 选用的是 paru（无强制关联）
> 由于使用的kde所以部分首选了kde配套的应用

## 软件集


- [Arch General recommendations ](https://wiki.archlinux.org/title/General_recommendations_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
- [Awesome Linux Software 里面有中文版](https://github.com/luong-komorebi/Awesome-Linux-Software)

## 简单安装

```bash
# vim
# wget curl 	命令行下载工具
# aria2			下载（断点续传分块下载）
# git 			版本管理
# zsh 			shell
# tree 			树形展示文件/夹
# chromium 		浏览器
# neofetch 		系统信息打印
# obs-studio	屏录录制
# gwenview		看图
# kamoso		相机
# kate			文本编辑
# kcalc			计算器
# konsole		终端
# kwave			声音录制
# obsidian		md知识管理库
# okular		文档查看
# spectacle		截图
# vlc			音视频播放
# yakuake		下拉式终端
sudo pacman -S vim wget curl aria2 git zsh tree chromium neofetch obs-studio gwenview kamoso kate kcalc konsole kwave okular spectacle vlc yakuake


# typora 					MD编辑器
# visual-studio-code-bin 	VScode代码编辑器
# wechat-uos				微信 统信 UOS 魔改版 功能简单
# listen1-desktop-appimage  music
# rustdesk-bin				远控
paru -S typora visual-studio-code-bin wechat-uos listen1-desktop-appimage rustdesk-bin
```

## VirtualBox 虚拟机

> [arch wiki](https://wiki.archlinux.org/title/VirtualBox)

```bash
uname

sudo pacman -S  virtualbox 
# 根据上面打印的名字二选一安装vbox 内核模块
virtualbox-host-modules-arch # linux
virtualbox-host-dkms		 # 其它 如:linux-lts

# 立即加载vboxdrv 模块 
# 或重启，启动时会自动加载所有vbox相关模块
modprobe vboxdrv

# 添加用户到 vboxusers 用户组
sudo usermod -aG vboxusers $(whoami)

# 安装功能扩展包 或配置archlinuxcn 后直接 pacman
sudo paru -S  virtualbox-ext-oracle

# The official VirtualBox Guest Additions ISO image
# 使用共享剪切板或拖放所需
## 也可以不安装，在虚拟机里点击相应高级功能时会提示下载
sudo pacman -S --asdeps  virtualbox-guest-iso
```

## qemu/kvm 虚拟机


```bash
# 安装软件包
sudo pacman -S qemu-full virt-manager

# 启动服务
sudo systemctl enable --now libvirtd.service

# 添加用户到用户组
sudo usermod -aG libvirt $(whoami)


# 检查是否支持cpu虚拟化
## 对于 Intel 处理器来说是 VT-x，对于 AMD 处理器来说是 AMD-V
LC_ALL=C lscpu | grep Virtualization

# 嵌套虚拟化
## amd, intel 注意替换 为 kvm_intel
modprobe -r kvm_amd
modprobe kvm_amd nested=1
## 永久生效
## 编辑(创建)/etc/modprobe.d/kvm_amd.conf, 内容如下:
options kvm_amd nested=1
```

### windows虚拟机调整分辨率

> [virtio-win](https://aur.archlinux.org/packages/virtio-win)  

```bash
# 安装驱动 virtio-win 
paru -S virtio-win
# or archlinuxcn
sudo pacman -S virtio-win

# 然后将 iso 挂载到虚拟机里面安装
# /var/lib/libvirt/images
```


## LibreOffice office套件

> [arch wiki](https://wiki.archlinux.org/title/LibreOffice)

```bash
# 本体
sudo pacman -S libreoffice-still 

# 中文包
sudo pacman -S --asdeps libreoffice-still-zh-cn
```

## ~~TeamViewer 远控~~

> 推荐 rustdesk `sudo paru rustdesk-bin`  

```bash
sudo pacman -S teamviewer

# 安装完成后终端有如下提示，即要运行需要提前启动后台守护服务
## The Teamviewer daemon must be running for Teamviewer to work.
## Execute 'sudo systemctl enable teamviewerd' in a terminal.
# 设置该服务以后开机自启以及当下立即运行
sudo systemctl enable --now teamviewerd
```


## qBittorrent

```bash
sudo pacman -S qbittorrent

# tracker github
https://ngosang.github.io/trackerslist/trackers_all_ip.txt
```

## timeshift 快照

> 推荐 btrfs 配合 @ @home 子卷使用

```bash
paru -S timeshift-bin timeshift-autosnap
```

## flameshot 截图钉图

> 火焰截图
> [arch wiki](https://wiki.archlinux.org/title/Flameshot#Installation)
> [github](https://github.com/flameshot-org/flameshot#usage)

```bash
sudo pacman -S flameshot

# 有可选依赖说以支持 wayland，但现在在用x11所以实际未测试效果
## xdg-desktop-portal: for wayland support, you will need the implementation for your wayland desktop environment
sudo pacman -S xdg-desktop-portal

# kde 快捷键文件(可选)
## 系统设置 -> 快捷键 -> 自定义快捷键， 导入后记得检查一些命令涉及目录的存在，
## 以及是否与现有快捷键冲突
## raw.githubusercontent.com 可能由于dns污染打不开，并不是被Q了
wget https://raw.githubusercontent.com/flameshot-org/flameshot/master/docs/shortcuts-config/flameshot-shortcuts-kde.khotkeys
```

## scrcpy 投屏镜像

> [scrcpy](https://github.com/Genymobile/scrcpy)		命令行 
> [qtscrcpy](https://github.com/barry-ran/QtScrcpy)		scrcpy 的 第三方 gui 版

```bash
sudo pacman -S scrcpy

# 或
paru -S qtscrcpy
```

### scrcpy 命令行使用

```bash
# 开启投屏
scrcpy

# change size
scrcpy -m 1024

# change bit-rate， default bit-rate is 8 Mbps
scrcpy -b 2M

# 录屏
scrcpy -r file.mkv
# 无镜像录屏
scrcpy -Nr file.mkv

# ...
```

## v2ray 代理

> [arch wiki 代理](https://wiki.archlinux.org/title/General_recommendations_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E4%BB%A3%E7%90%86)  
> [arch&qv2ray使用](https://github.com/ArchLinuxStudio/ArchLinuxTutorial/blob/master/docs/rookie/transparentProxy.md)  
> [Qv2ray](https://github.com/Qv2ray/Qv2ray)  
> [cgproxy 透明代理](https://github.com/springzfx/cgproxy)  
> [透明代理](https://arch.icekylin.online/rookie/transparent.html)

```bash
sudo pacman -S v2ray

# 图形界面管理及功能扩展
paru -S qv2ray  qv2ray-plugin-ssr-git  qv2ray-plugin-command-git  cgproxy

# cgproxy 配置文件
vim /etc/cgproxy/config.json

# 启用与停用
systemctl start cgproxy.service
systemctl stop cgproxy.service
```

```bash
# 终端代理（当前会话）
export https_proxy=http://127.0.0.1:8889
export http_proxy=http://127.0.0.1:8889
export all_proxy=http://127.0.0.1:8889
```

## docker

```bash
# 安装
sudo pacman -S docker

# 添加用户组(以使当前用户直接执行 docker)
usermod -aG docker ${USER}

# 启动服务
systemctl start docker

# 检查
docker -v
docker info
```

## 坚果云

```bash
# 安装 archlinux/aur
sudo pacman -S nutstore

# 选择性同步配置文件
# ~/.nutstore/db/customExtRules.conf
```

## 罗技 Logitech

> [Logitech Unifying Receiver](https://wiki.archlinux.org/title/Logitech_Unifying_Receiver)  
> 使用接收器而非蓝牙时

```bash
# 管理程序
sudo pacman -S solaar

sudo udevadm control --reload-rules
```

## pacman 的一些参数使用

> [pacman](https://wiki.archlinux.org/title/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
>
> [pacman/Tips and tricks](https://wiki.archlinux.org/title/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/Tips_and_tricks_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

```bash
# 推荐

## 安装时
### 1. 查看软件包的详情（里面可以看到依赖包以及可选依赖包）
pacman -Si package_name
### 2. 当单独安装一个本地软件包的可选依赖时
pacman -S --asdeps package_name
### 3. 改变本地包类型（安装原因）为依赖包
pacman -D --asdeps package_name

## 卸载时
### 1. 同时删除目标的依赖包（但不包含同时被其它本地包所依赖的包，当然了～）
pacman -Rs package_name

## 查询时
### 1. 打印不被当前所有安装的本地包所依赖的包（检查已准备清理依赖）
pacman -Qdt

### 2. 打印显式安装的软件包（元软件包所包含的包也会一起打印）
pacman -Qe

### 3. 打印已安装的依赖包
pacman -Qd

### 4. 打印本地软件包所包含的文件
pacman -Ql package_name

### 5. 打印本地包的详细信息，并包含包含文件的修改状态
pacman -Qii package_name

### 6. 打印非镜像仓库中的包（一般是aur的包，但也可能是安装后被从镜像仓库中剔除的包）
pacman -Qm

### 7. 打印镜像仓库中安装的包
pacman -Qn
```

