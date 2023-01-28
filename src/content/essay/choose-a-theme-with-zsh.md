---
title: Zsh 挑选安装显示node版本号的主题
description: Zsh 挑选安装显示node版本号的主题
date: 2022-04-04 19:00
update: 2022-04-04 19:00
tags:
  - linux
head:
  - - meta
    - name: keywords
      content: zsh node 版本号
---


## 目录

## ohmyzsh内置主题列表

进入 [ohmyzsh内置主题列表](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) 查看截图挑选(或者浏览器ctrl+f,使用关键词查询)，然后修改.zshrc文件中的ZSH_THEME变量，然后重启zsh即可。

```
# ~/.zshrc
# robbyrussell 改为需要使用目标主题名称
ZSH_THEME="robbyrussell"
```

```bash
# 然后重启zsh即可
source ~/.zshrc
```

## 更多主题

> Due to the massive amount of themes bundled with OMZ, new themes are not accepted.  
> 由于OMZ内置主题过多，新主题不再内置。

进入 [External themes](https://github.com/ohmyzsh/ohmyzsh/wiki/External-themes) 查看截图挑选(或者浏览器ctrl+f,使用关键词查询)，进入对于主题的仓库，根据各自的介绍安装

### Spaceship

我挑选的是 [Spaceship](https://github.com/spaceship-prompt/spaceship-prompt) 主题，[点击查看具备的完整功能](https://github.com/spaceship-prompt/spaceship-prompt#features)，  
主要看重了可以显示当前使用的node版本，并且对git的状态也有不少的图式


#### Spaceship 安装

> [更多安装方式](https://github.com/spaceship-prompt/spaceship-prompt#installing)

由于安装安装了 oh-my-zsh，所以这里我选择了下面的[安装方式](https://github.com/spaceship-prompt/spaceship-prompt#oh-my-zsh)

```bash
# 先检查一下 $ZSH_CUSTOM 是否存在
echo $ZSH_CUSTOM

# 打印为空时，编辑 ~/.zshrc，将 `export ZSH_CUSTOM=$ZSH/custom` 放到 `export ZSH=$HOME/.oh-my-zsh` 下面
# ~/.zshrc
export ZSH_CUSTOM=$ZSH/custom
# 然后重启zsh
source ~/.zshrc

# 将项目克隆到本地
git clone https://github.com/spaceship-prompt/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" --depth=1

# 创建文件链接
ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"

# 在zdh配置文件中修改主题
# ~/.zshrc
ZSH_THEME="spaceship"

# 重启zsh
source ~/.zshrc
```

#### 安装字体（可选）

直接安装使用Spaceship可能会由于子体缺失导致某些图示无法正常显示，所以需要再安装字体，[Requirements](https://github.com/spaceship-prompt/spaceship-prompt#requirements)
