---
title: Arch 安装及初始化配置
description: UEFI system-boot btrfs  @ @home kde plasma
date: 	2022-05-31 23:28
update: 	2022-12-12 12:30
tags:
  - linux
head:
  - - meta
    - name: keywords
      content: Arch 安装 UEFI systemd-boot crypt btrfs  @ @home @var @swap kde plasma sddm 休眠 交换文件 timeshift aur aur-helper
---

## 目录

> [arch wiki](https://wiki.archlinux.org/title/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  
> [安装参考1](https://www.bilibili.com/video/BV1ub4y1Y7pK?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click) | 
> [安装参考2](https://www.bilibili.com/video/BV1Wu411o7Kd) | 
> [安装参考3](https://www.jianshu.com/p/7c2ab582e13d) | 
> [安装参考4](https://www.jianshu.com/p/5e7726d1cb16) | 
> [安装参考5](https://github.com/ArchLinuxStudio/ArchLinuxTutorial)  | 
> [安装参考6](https://www.youtube.com/watch?v=HIXnT178TgI&list=PL-odKaUzOz3IT3FLQlXFaRVyNpWW1nj68&index=204) | 
> [安装参考7](https://www.youtube.com/watch?v=BAQ78pBPjjc) |
>
> UEFI systemd-boot  
>
> crypt 磁盘加密 
>  
> btrfs 子卷：@ @home @var @swap  
> 
> 使用交换文件进行休眠  
>
> kde plasma + sddm  
> 
> timeshift 快照备份  
> 

## 调整控制台字体（可选）

> [终端字体](https://wiki.archlinux.org/title/Linux_console_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E7%BB%88%E7%AB%AF%E5%AD%97%E4%BD%93)  
> 以大号字体显示  

```bash
setfont ter-132n
```

## 修改 root 密码

```bash
passwd
```

## 无线连接

> [iwd: iNet wireless daemon](https://wiki.archlinux.org/title/Iwd_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  

```bash
iwctl

device list

# <name> 为 device list 打印列表你中的名字，如 `station wlan0 scan`
station <name> scan

station <name> get-networks

# <ssid> 为 wifi名称
station <name> connect <ssid>

quit

# 测试网络连接
ping archlinux.org
```

## ssh 安装 （可选）

> 以远控安装, cv用起来～  
> 远控安装时建议目标机器一直处于 ping 状态  
> [OpenSSH](https://wiki.archlinux.org/title/OpenSSH)  

```bash
# openssh 在安装环境下已经预置了，不需要再安装, 验证 `pacman -Qi openssh`
# pacman -Syy openssh

# 启动服务
systemctl start sshd

# 查看 ip
ip addr
```

### ssh 连接

```bash
# 另一台电脑 提示输入密码为前面设置的 root 密码
# <ip> 为上面查到的ip 地址，如： 192.168.1.80
ssh root@<ip>
```

## 更新系统时间

```bash
timedatectl set-ntp true

# 检查服务状态
timedatectl status
```

## 生成镜像源

> [镜像源](https://wiki.archlinux.org/title/Mirrors_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  
> [reflector](https://wiki.archlinux.org/title/Reflector_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))   

```bash
# 先停用自动更新服务，以防后面安装过程中进行自动更新把手动生成的覆盖掉
systemctl stop reflector.service

# 然后手动按需生成
## 位于中国 近12小时活跃 https协议 按速度排序 文件保存
reflector --country China --age 12 --protocol https --sort rate --save /etc/pacman.d/mirrorlist

# 查看生成结果
cat /etc/pacman.d/mirrorlist

# 刷新源
pacman -Syy
```

## 磁盘分区

> [gPT fdisk](https://wiki.archlinux.org/title/GPT_fdisk_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  

```bash
# 查看磁盘及分区
lsblk

# <disk> 为 lsblk 中对应的磁盘名，如 `gdisk /dev/nvme0n1`
gdisk /dev/<disk>

# ? 查看帮助 p 打印分区 d 删除分区 n 新建分区 w 应用修改且退出 q 直接退出


# 1 ef00 +512M
n
1
ENTER for default first sector
+512M
ef00

# 2 8300 
n
2
ENTER for default first sector
ENTER for default last sector
ENTER for default type linux

# 保存并退出
w

# 确认分区
Y

# 查看磁盘分区情况
gdisk -l /dev/<disk>
```

## 格式化

> [File systems](https://wiki.archlinux.org/title/File_systems_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  
> [创建文件系统](https://wiki.archlinux.org/title/File_systems_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E5%88%9B%E5%BB%BA%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F)  

```bash
lsblk

# <part> 为 lsblk 中 ef00 对应的分区名，如 `mkfs.fat -F 32 /dev/nvme0n1p1`
## 效果同 `mkfs.vfat /dev/<part>
mkfs.fat -F 32 /dev/<part>

# <part> 为 lsblk 中 8300 对应的分区名，如 `cryptsetup luksFormat /dev/nvme0n1p2`
# 下面的 cryptroot 可自定义，但要注意后边安装过程也要保持一致  
cryptsetup luksFormat /dev/<part>
YES
cryptsetup luksOpen /dev/<part> cryptroot
mkfs.btrfs /dev/mapper/cryptroot

# 查看格式化结果
lsblk -f
```

## btrfs 子卷

> [Btrfs](https://wiki.archlinux.org/title/Btrfs_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  
> 很大原因是为以后如果要使用 timeshift 的 btrfs 类型备份时做预备  
> [In BTRFS mode, snapshots are taken using the in-built features of the BTRFS filesystem. BTRFS snapshots are supported only on BTRFS systems having an Ubuntu-type subvolume layout (with @ and @home subvolumes).](https://github.com/linuxmint/timeshift)  

```bash
# 先挂载根分区，用以在根分区上创建 btrfs 子卷  
mount /dev/mapper/cryptroot /mnt

# 添加子卷 @ @home @var @swap
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@var
btrfs subvolume create /mnt/@swap

ls /mnt

umount /mnt
```

## 挂载

> [挂载文件系统](https://wiki.archlinux.org/title/File_systems_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E6%8C%82%E8%BD%BD%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F)  

```bash
# 挂载 @
mount -o noatime,space_cache=v2,compress=zstd,ssd,discard=async,subvol=@ /dev/mapper/cryptroot /mnt 

# 创建@home 及 efi 等挂载位置
mkdir -p /mnt/{boot,home,var,swap}

# 挂载 @home
mount -o noatime,space_cache=v2,compress=zstd,ssd,discard=async,subvol=@home /dev/mapper/cryptroot /mnt/home

# 挂载 @var
mount -o noatime,space_cache=v2,compress=zstd,ssd,discard=async,subvol=@var /dev/mapper/cryptroot /mnt/var

# 挂载 @swap
mount -o noatime,space_cache=v2,ssd,subvol=@swap /dev/mapper/cryptroot /mnt/swap

# 挂载 efi
# <part> 为 lsblk 中 ef00 对应的分区名，如 `mount /dev/nvme0n1p1 /mnt/boot`
mount /dev/<part> /mnt/boot

# 查看结果
lsblk
```

## 安装系统基本软件包

> [安装必需的软件包](https://wiki.archlinux.org/title/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E5%AE%89%E8%A3%85%E5%BF%85%E9%9C%80%E7%9A%84%E8%BD%AF%E4%BB%B6%E5%8C%85)  

```bash
# btrfs-progs  btrfs 所需
pacstrap /mnt base base-devel linux linux-firmware linux-headers btrfs-progs 
```

## 生成 fstab 文件

> [fstab](https://wiki.archlinux.org/title/Fstab_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  

```bash
# 用 -U 或 -L 选项设置 UUID 或卷标
genfstab -U /mnt >> /mnt/etc/fstab

# 查看生成的文件
cat /mnt/etc/fstab
```

## 进入安装的系统

> [Chroot](https://wiki.archlinux.org/title/Chroot_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  

```bash
arch-chroot /mnt

pacman -Syy
```

## 修改 root 密码

```bash
passwd
```

## 添加普通用户

> [用户管理](https://wiki.archlinux.org/title/Users_and_groups_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86)  

```bash
echo "%wheel ALL=(ALL) ALL" > /etc/sudoers.d/wheel

# liamrad 可自定义，但要注意后边的要和自定义的一致  
useradd -m liamrad

# 用户组
usermod -aG wheel liamrad

# 配置密码
passwd liamrad
```

## 添加中国仓库源（可选）

> [archlinuxcn](https://mirrors.tuna.tsinghua.edu.cn/help/archlinuxcn/)  
> [Official repositories](https://wiki.archlinux.org/title/Official_repositories)  

```bash
# 编辑 /etc/pacman.conf
echo "\
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/\$arch" >> /etc/pacman.conf

# 查看编辑结果
cat /etc/pacman.conf

# 安装 keyring
pacman -Syy archlinuxcn-keyring
```

## 时区

> [时区](https://wiki.archlinux.org/title/System_time#Time_zone)  
> [硬件时钟](https://wiki.archlinux.org/title/System_time#Hardware_clock)  

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

hwclock --systohc
```

## 语言环境

> [Locale](https://wiki.archlinux.org/title/Locale_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  

```bash
echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen
echo 'zh_CN.UTF-8 UTF-8' >> /etc/locale.gen

cat /etc/locale.gen

locale-gen

echo 'LANG=en_US.UTF-8' > /etc/locale.conf

cat /etc/locale.conf
```

## 网络配置

> [设置计算机名](https://wiki.archlinux.org/title/Network_configuration_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E8%AE%BE%E7%BD%AE%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%90%8D)  

```bash
# 配置主机名
# archlinux 可自定义，但要注意后边的要和自定义的一致  
echo archlinux > /etc/hostname

# archlinux 为上面定义的主机名
echo "\
127.0.0.1	localhost
::1		localhost
127.0.1.1	archlinux.localdomain	archlinux" >> /etc/hosts

# 查看 hosts
cat /etc/hosts

# 安装网络管理器
pacman -S networkmanager
# 自启动
systemctl enable NetworkManager
```


## 配置Initramfs

```bash
# 先安装一下 vim，一个编辑器
pacman -Sy vim

# 编辑文件
vim /etc/mkinitcpio.conf

# 对应修改，添加 btrfs encrypt, 注意位置顺序
MODULES=(btrfs)
HOOKS=(base udev autodetect modconf block encrypt filesystems keyboard fsck)

# 生成新的参数配置
mkinitcpio -p linux
```


## 配置引导程序

> [systemd-boot](https://wiki.archlinux.org/title/Systemd-boot_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  
> [Microcode](https://wiki.archlinux.org/title/Microcode_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  

```bash
# amd-ucode / intel-ucode
pacman -S efibootmgr amd-ucode

# 安装 EFI 启动管理器
bootctl --path=/boot install

# 启动选单配置
echo "\
timeout 10
default arch.conf" >> /boot/loader/loader.conf 

# 增加启动选项 arch
## 其中的 nvme0n1p2 替换为前面 8300 对应的分区
## 其中的 nvme0n1p2 替换为前面 8300 对应的分区
## 其中的 nvme0n1p2 替换为前面 8300 对应的分区
echo -e "\
title Arch Linux
linux /vmlinuz-linux
initrd /initramfs-linux.img
options cryptdevice=UUID=`blkid -s UUID -o value /dev/nvme0n1p2`:cryptroot root=/dev/mapper/cryptroot rw rootflags=subvol=@ \c" > /boot/loader/entries/arch.conf

# 增加启动选项 arch-fallback
## 其中的 nvme0n1p2 替换为前面 8300 对应的分区
## 其中的 nvme0n1p2 替换为前面 8300 对应的分区
## 其中的 nvme0n1p2 替换为前面 8300 对应的分区
echo -e "\
title Arch Linux
linux /vmlinuz-linux
initrd /initramfs-linux-fallback.img
options cryptdevice=UUID=`blkid -s UUID -o value /dev/nvme0n1p2`:cryptroot root=/dev/mapper/cryptroot rw rootflags=subvol=@ \c" > /boot/loader/entries/arch-fallback.conf
```

## 显卡驱动

> [Xorg: 驱动安装](https://wiki.archlinux.org/title/Xorg_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E9%A9%B1%E5%8A%A8%E5%AE%89%E8%A3%85)  

```bash
# amd
## GCN 3(不包含) 之前的需要安装 xf86-video-ati 替换 xf86-video-amdgpu
## 现在新电脑无脑 xf86-video-amdgpu 就可以
pacman -S xf86-video-amdgpu vulkan-radeon mesa

# inter（未自测）
pacman -S xf86-video-inter vulkan-inter mesa

# nvidia（未自测）
pacman -S nvidia nvidia-setings nvidia-utils
```

## 字体

> [Fonts](https://wiki.archlinux.org/title/Fonts_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  

```bash
# 英文
pacman -S ttf-dejavu 

# 中文
pacman -S wqy-zenhei wqy-microhei noto-fonts-cjk

# emoji
pacman -S noto-fonts-emoji
```

```bash
# 更多可按需添加，部分罗列
ttf-dejavu ttf-droid ttf-hack ttf-font-awesome otf-font-awesome ttf-lato ttf-liberation ttf-linux-libertine ttf-opensans ttf-roboto ttf-ubuntu-font-family 

ttf-hannom noto-fonts noto-fonts-extra noto-fonts-emoji noto-fonts-cjk adobe-source-code-pro-fonts adobe-source-sans-fonts adobe-source-serif-fonts adobe-source-han-sans-cn-fonts adobe-source-han-sans-hk-fonts adobe-source-han-sans-tw-fonts adobe-source-han-serif-cn-fonts wqy-zenhei wqy-microhei
```

## 蓝牙

> [蓝牙](https://wiki.archlinux.org/title/Bluetooth_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  
> 安装在虚拟机可不用安装，直接在虚拟机软件里使用宿主机的设备就可以  

```bash
pacman -S bluez bluez-utils

# 蓝牙服务自启动
systemctl enable bluetooth
```

## 声音

> [Advanced Linux Sound Architecture，ALSA](https://wiki.archlinux.org/title/Advanced_Linux_Sound_Architecture_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))    
> ~~[PulseAudio](https://wiki.archlinux.org/title/PulseAudio_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))~~  
> [PipeWire](https://wiki.archlinux.org/title/PipeWire)  

```bash
#pacman -S alsa-utils pulseaudio pulseaudio-bluetooth
pacman -S pipewire pipewire-alsa pipewire-pulse pipewire-jack xdg-desktop-portal xdg-desktop-portal-kde
```

## 打印机

> [CUPS](https://wiki.archlinux.org/title/CUPS_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  

```bash
pacman -S cups

# 打印机服务自启动
systemctl enable cups
```

## 输入法

> [Fcitx5 是继 Fcitx 后的新一代输入法框架。](https://wiki.archlinux.org/title/Fcitx5_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  

```bash
pacman -S fcitx5-im fcitx5-chinese-addons

# 字库（推荐）
pacman -S fcitx5-pinyin-zhwiki

# 配置环境变量,以在应用程序中正常使用
echo "\
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx" >> /etc/environment 

# 检查编辑结果
cat /etc/environment 
```


## 图形界面

> [Xorg](https://wiki.archlinux.org/title/Xorg_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  
> [Desktop environment 桌面环境](https://wiki.archlinux.org/title/Desktop_environment_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  
> [Display manager 显示管理器](https://wiki.archlinux.org/title/Display_manager_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  
> [kde](https://wiki.archlinux.org/title/KDE_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))  

```bash
pacman -S xorg 

# 桌面环境 plasma & 显示管理器 sddm
## plasma-wayland-session 可选
pacman -S plasma sddm

# sddm 自启动
systemctl enable sddm

# 一些应用
## kde-applications 全套kde应用安装
pacman -S kde-applications 
## 1. 也可以自己挑选单独的子软件包组按需安装 
### https://archlinux.org/packages/extra/any/kde-applications-meta/
pacman -S kde-accessibility-meta kde-system-meta ...
## 2. 或单独安装所需的软件：文件管理器 浏览器 文本编辑器 终端
pacman -S dolphin chromium kate konsole

# 一些工具软件（可选）
# vim 终端中的文本编辑器
# git 分布式版本管理工具
# openssh ssh
# bash-completion bash命令补全
# reflector 镜像列表生成
# print-manager kde 上的打印机 GUI 管理
pacman -S vim git openssh bash-completion reflector print-manager 
```

## 重启进入系统界面

> 安装完毕，至日常可用状态

```bash
# 退出 chroot 环境
exit

# 手动卸载被挂载的分区（可选）
## 这有助于发现任何「繁忙」的分区，并通过 fuser(1) 查找原因
umount -R /mnt

# systemd 将自动卸载仍然挂载的任何分区
reboot
```

## 交换文件（推荐）

> [Btrfs: 交换文件](https://wiki.archlinux.org/title/Btrfs#Swap_file)  
> [Swap File](https://wiki.archlinux.org/title/Swap#Manually)  
> [swap 分区大小参考](https://blog.csdn.net/sirchenhua/article/details/87861709)  

### 创建交换文件

```bash
# root 用户模式
su

# 创建交换文件
## 文件大小建议为内存的1-1.5倍，我的内存是32G, 设置 40960 为40G （40 * 1024）
btrfs filesystem mkswapfile --size=40g /swap/swapfile

# 启用 swap
swapon /swap/swapfile

# 编辑表文件
echo '/swap/swapfile none swap defaults 0 0' >> /etc/fstab

# 检查
cat /proc/swaps
free -h
```

### 删除交换文件

```bash
# 先关闭 swap
swapoff /swap/swapfile

# 然后删除文件
rm -rf /swap/swapfile

# 编辑 /etc/fstab 移除创建时添加的行
## 如移除：/swap/swapfile none swap defaults 0 0
vim /etc/fstab
```

## 休眠（推荐）

> 休眠到交换文件  
> [休眠](https://wiki.archlinux.org/title/Power_management_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/Suspend_and_hibernate_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E4%BC%91%E7%9C%A0)  
>
>

```bash
# root 用户模式
su

# 打印 resume_offset
btrfs inspect-internal map-swapfile -r /swap/swapfile

# 打印 resume
blkid -s UUID -o value /dev/mapper/cryptroot 

# 存到会话变量里
export myresumeoffset=`btrfs inspect-internal map-swapfile -r /swap/swapfile`
export myresume=`blkid -s UUID -o value /dev/mapper/cryptroot`

# 配置引导程序
## 在起初创建文件时使用了 -e 参数以及 \c 特殊字符，这两个作用就是在最后不添加换行符号
## 以便在这里将新内容直接添加在 options 所在行
echo "resume=UUID=$myresume resume_offset=$myresumeoffset" >> /boot/loader/entries/arch.conf
echo "resume=UUID=$myresume resume_offset=$myresumeoffset" >> /boot/loader/entries/arch-fallback.conf

# 配置Initramfs
vim /etc/mkinitcpio.conf

# 对应修改，添加 resume，注意位置顺序
HOOKS=(base udev autodetect modconf block encrypt filesystems resume keyboard fsck)

# 生成新的参数配置
mkinitcpio -p linux

# 重启以应用
reboot

# 验证
while true ; do date ; sleep 1 ; done

# 重新开一个终端
# 休眠
systemctl hibernate

# 然后开机，查看用于验证的终端是否再继续打印，以及中间有一段时间的空闲，那是电脑休眠的时间
```


## AUR（推荐）

> paru——一个 [aur助手](https://wiki.archlinux.org/title/AUR_helpers_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))，集成下载构建安装  
>

```bash
# 准备克隆
sudo pacman -S git

git clone https://aur.archlinux.org/paru-bin

cd paru-bin

# （在非root用户下执行）
makepkg -si

# 使用帮助
paru --help
```

## timeshift（推荐）

> 快照备份

```bash
paru -S timeshift-bin 

# 自动备份（可选）
## 更新时自动增加更新前的快照
paru -S timeshift-autosnap
```


## 更多

### 软件包存档

> [archive](https://archive.archlinux.org/packages/)  

### 启用 root 的 ssh 连接

> 不推荐，不过可以在安装完后再改回去
> `#PermitRootLogin prohibit-password`

```bash
# 需要先安装 ssh 才有这个文件
pacman -S openssh

vim /etc/ssh/sshd_config
# 将 PermitRootLogin 值改为 yes 并取消注释
```

### 命令行配置网络

> [NetworkManager](https://wiki.archlinux.org/title/NetworkManager_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))   

```bash
# 获取网络设备名称(因为新系统不一定与前面获取的一致)
ip addr

# 进入 tui
nmtui

# edit a connection
# Add
# Wi-Fi
# Device: 网络设备名称
# SSID: 无线名称
# Security: WPA & WPA2 Personal
# Password: 无线密码
# Ok
# Back
# Quit

ip addr

# 测试网络连接
ping -c 4 baidu.com
```

### 清除缓存

```bash
pacman -Scc
```

###  freetype2 渲染

```bash
# freetype2 渲染
vim /etc/profile.d/freetype2.sh 

# 去除注释 export ...
```

### 禁用蜂鸣器

```bash
su

rmmod pcspkr

echo "blacklist pcspkr" >> /etc/modprobe.d/nobeep.conf

exit
```

### ssd优化

#### TRIM

```bash
pacman -S util-linux

# 定时任务
systemctl enable fstrim.timer
```

#### 性能

> [arch wiki](https://wiki.archlinux.org/title/Solid_state_drive_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E6%8F%90%E5%8D%87%E6%80%A7%E8%83%BD)  

```bash
# pacman -S nvme-cli
```


### discover: not application  back-ends found

> [解决方案](https://wiki.archlinux.org/title/KDE_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#Discover%E4%B8%8D%E6%98%BE%E7%A4%BA%E4%BB%BB%E4%BD%95%E7%A8%8B%E5%BA%8F)  
>

```bash
pacman -S packagekit-qt5 
```

### KDE WALLET

> `kde Writing login information to the keychain failed with error 'GDBus.Error:org.freedesktop.DBus.Error.ServiceUnknown: The name org.freedesktop.secrets was not provided by any .service files'.`   
> [github issue](https://github.com/microsoft/vscode/issues/104319)  
> [pr](https://invent.kde.org/frameworks/kwallet/-/merge_requests/11#note_407985)   
>

```bash
# 暂未合并, 目前可以通过 aur 安装
paru -S kwallet-secrets

# 或
pacman -S gnome-keyring
```

### 固定DNS以防被污染

```bash
vim /etc/resolv.conf

# 填入以下内容
nameserver 8.8.8.8
nameserver 114.114.114.114

# 只读文件保存并退出 :wq!

# 防止程序覆盖 
chattr +i /etc/resolv.conf
```

### makepfg

[减少编译时间](https://wiki.archlinux.org/title/Makepkg_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E5%87%8F%E5%B0%91%E7%BC%96%E8%AF%91%E6%97%B6%E9%97%B4)  

```bash
# 获得可用处理器的个数
nproc

vim /etc/makepkg.conf
# 将 MAKEFLAGS 后面值中的数字部分改为不大于上面个数的数字，并取消注释
```

### linux 关机时间长

> [通过减少默认停止超时来加快 Linux 中的关机速度](https://linux.cn/article-12635-1.html)  

```bash
vim /etc/systemd/system.conf

# 修改 DefaultTimeoutStopSec 并取消注释
## 如 5秒
DefaultTimeoutStopSec=5s
```

### pacman 一些偏好设置

```bash
vim /etc/pacman.conf

# 并行下载（默认依次下载）
## 修改 ParalleDownloads 为正整数，正整数就是所要并行下载的包的数量

# 升级前对比版本
## 要查看旧版和新版的有效安装包，请取消/etc/pacman.conf中"VerbosePkgLists"的注释
```

### zram

> [zram](https://wiki.archlinux.org/title/Improving_performance_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#zram_%E6%88%96_zswap)  
>
> zramd: Automatically setup swap on zram

```bash
# 禁用zswap
echo 0 > /sys/module/zswap/parameters/enabled

# 安装（其中某些文件可能需要T）
paru -S zramd

# 配置文件
vim /etc/default/zramd

# 启动
## --now Start or stop unit after enabling or disabling it
systemctl enable --now zramd.service

# 查看是否多出一个swap 设备
lsblk
```

### sddm 开启虚拟键盘

> [arch wiki](https://wiki.archlinux.org/title/SDDM#Enable_virtual_keyboard)  

```bash
# 安装
pacman -S qt5-virtualkeyboard

# 配置
# /etc/sddm.conf.d/virtualkbd.conf
[General]
InputMethod=qtvirtualkeyboard
```
