---
title: WSL2 & Arch 安装及一些初始配置
description: WSL2 & Arch 安装及一些初始配置
date: 2022-05-18 10:32
update: 2022-05-18 10:32
tags:
  - wsl
  - linux
head:
  - - meta
    - name: keywords
      content: wsl wsl2 arch
---

## 目录


## 启用 WSL

> WSL2  
> [ WSL 的手动安装步骤 | Microsoft Docs](https://docs.microsoft.com/zh-cn/windows/wsl/install-manual#step-3---enable-virtual-machine-feature)

### 启用适用于 Linux 的 Windows 子系统

```bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

### 启用虚拟机功能

```bash
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
**重启电脑**

### 下载 Linux 内核更新包

[下载 Linux 内核更新包](https://docs.microsoft.com/zh-cn/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package) 并安装


### 将 WSL 2 设置为默认版本

```bash
wsl --set-default-version 2
```

## 安装 Arch

###  进入 ArchWSL 仓库下载最新 release 中的 zip 包

> 建议选择无 online 后缀的包

[Github](https://github.com/yuk7/ArchWSL) /  [Gitee](https://gitee.com/yuk7/archwsl-mirror)  

### 解压到有读写权限的目录中，点击运行其中的 Arch.exe

> 后面使用过程中，运行 wsl 产生的文件也是放在这个目录中的，注意空间足够  
> 更改 “Arch.exe” 中的 “Arch”  就可以得到不同名字的 wsl 了，且各个 wsl 之间不产生冲突

## 配置 Arch

> 经过上面的安装后，现在到 terminal 中输入 wsl 运行即可  
> 
> （如果已经在使用其他的wsl系统了，那么此时直接输入wsl 并不能启动刚刚新安装的Arch，需要在终端中打开上面安装（含有 Arch.exe）时的目录，输入 `.\Arch.exe` 进行运行；  
> 或者修改默认的 WSL 为刚刚安装的 Arch [设置默认 Linux 发行版 | WSL 的基本命令 | Microsoft Docs](https://docs.microsoft.com/zh-cn/windows/wsl/basic-commands#set-default-linux-distribution)）
>

### 修改 root 密码

```bash
passwd
```

### 开放  sudo 权限

```bash
echo "%wheel ALL=(ALL) ALL" > /etc/sudoers.d/wheel
```

### 添加用户并分配用户组
```bash
useradd -m -G wheel {username}
```
 如  `useradd -m -G wheel aabbcc`

### 配置密码

```bash
passwd {username}
```
如  `passwd aabbcc`

### 配置下载镜像

> 手动添加镜像地址

```bash
echo "Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/\$repo/os/\$arch" >> /etc/pacman.d/mirrorlist
```

### 退出wsl

```bash
exit
```

### 设置默认用户

在终端中打开上面安装（含有 Arch.exe）时的目录，输入以下命令及参数
```bash
.\Arch.exe config --default-user {username}
```
如 `.\Arch.exe config --default-user aabbcc`


设置完默认用户后重新打开 wsl

### 初始化密钥环（keyring）

```bash
sudo pacman-key --init
```

```bash
sudo pacman-key --populate
```

```bash
sudo pacman -Syy archlinux-keyring
```

### 添加中国镜像仓库

> [archlinuxcn | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/archlinuxcn/)

```bash
sudo vim /etc/pacman.conf
```

按 i 进入编辑模式，将下面的内容放到末尾（vim 里面的粘贴快捷键为 ctrl + shift + v）

```
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

按 Esc 退出编辑模式，
输入 :wq 保存并退出（注意不要丢下冒号）

安装 keyring

```bash
sudo pacman -Syy archlinuxcn-keyring
```

### 更新包（建议）

```bash
sudo pacman -Syyu
```

## 其它  (可选)

### 配置下载镜像（自动生成，推荐）

> 利用 [Reflector](https://wiki.archlinux.org/title/Reflector)，自动生成，生成时可设置过滤条件

reflector 初始并没有安装，先安装
> 会有可能因为网络的问题导致一些包依赖下载错误，如一直错误可直接选择上面的手动版
```bash
sudo pacman -S reflector
```

镜像文件生成

> 下面这条命令意思是，地址为中国、最近12小时活跃、https协议、速度排序、生成镜像文件
```bash
sudo reflector --country China --age 12 --protocol https --sort rate --save /etc/pacman.d/mirrorlist
```

完成后可以输入下面的命令查看生成的镜像列表

```bash
cat /etc/pacman.d/mirrorlist
```


### 安装一些工具

```bash
sudo pacman -S which openssh git zsh tree wget unzip
```

### 安装 AUR

> 这里挑选了 paru

>  [Arch User Repository](https://wiki.archlinux.org/title/Arch_User_Repository)  
>  [AUR helpers - ArchWiki (archlinux.org)](https://wiki.archlinux.org/title/AUR_helpers)

需要提前安装 git base-devel

> 如有提示 fakeroot 已配置忽略升级，输入 n 不进行升级即可
```bash
sudo pacman -S git base-devel
```

```bash
git clone https://aur.archlinux.org/paru.git
```

```bash
cd paru
```

安装

> 如有多个 repo 供选择 ，输入 rust 对应的编号即可

```bash
makepkg -si
```

## ArchWSL 的一些使用

>  在终端中进入 Arch.exe 所在的目录，运行 `.\Arch.exe help` 可查看详细命令说明

### 备份

> 备份格式参数可选：tar  tgz  vhdx  vhdxgz  reg

```bash
.\Arch.exe backup --tar
```

### 恢复

> 从备份安装 wsl

```bash
.\Arch.exe install /to/file/path/backup.tar
```

### 卸载

```bash
>.\Arch.exe clean
```
