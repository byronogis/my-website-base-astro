---
title: Zsh 安装及初始化配置
description: 切换默认shell为zsh，自动补全和历史记录插件，ohmyzsh
date: 2022-04-02 22:44
update: 2022-04-02 22:44
tags:
  - application
head:
  - - meta
    - name: keywords
      content: zsh ohmyzsh
---

## 目录

> [Zsh](https://zsh.sourceforge.io/) is a shell designed for interactive use, although it is also a powerful scripting language. 

## Zsh 安装

```bash
# 查看当前使用的shell
echo $SHELL
# /bin/bash 默认是bash

# 查看有哪些shells
cat /etc/shells

# 安装 zsh
sudo apt-get install zsh -y

# 查看zsh版本
zsh --version

# 安装后zsh 后cat /etc/shells 才有/bin/zsh /usr/bin/zsh

# 切换成zsh
chsh -s $(which zsh)
# 或者这条命令
chsh -s /usr/bin/zsh
```

## ohmyzsh 安装

> [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) is an open source, community-driven framework for managing your zsh configuration.


```bash
# 安装 ohmyzsh
git clone https://github.com/ohmyzsh/ohmyzsh.git ~/.oh-my-zsh

# 使用预置配置文件
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
```

## Zsh插件

```bash
# 高亮 zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 自动提示 zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

```shell
# ~/.zshrc
# 启用插件
plugins=(
  # 内置插件，直接填写启用即可（选择）
  # git
  git
  # 根据过往目录切换记录快速跳转
  z
  # 按两下esc键，用sudo权限
  sudo

  # 记录历史输入的zsh命令，自动提示，快速使用
  zsh-autosuggestions
  # zsh 命令高亮
  zsh-syntax-highlighting
)
```

```bash
# 每次修改了这个`.zshrc`配置文件，需要重载一下，才能生效。
source ~/.zshrc

# 也可以封装成一个简写命令 alias，这样每次输入rl就可以重载
alias rl='source ~/.zshrc'
```

## 参考

[使用 ohmyzsh 打造 windows、ubuntu、mac 系统高效终端命令行工具 (qq.com)](https://mp.weixin.qq.com/s/MHngeDABRV3z2HmN5DRrEw)
