---
title: fnm node版本管理工具
description: Fast Node Manager
date: 	2022-05-03 19:47
update: 	2022-07-31 19:54
tags:
  - application
head:
  - - meta
    - name: keywords
      content: wsl fnm node版本管理工具
---


## 目录


> [Fast and simple Node.js version manager, built in Rust](https://github.com/Schniz/fnm)  

## 安装

### linux

```bash
# 初始安装
curl -fsSL https://fnm.vercel.app/install | bash

# 后续升级
curl -fsSL https://fnm.vercel.app/install | bash -s -- --skip-shell

# ~/.zshrc 修改
# 支持自动根据项目 .nvmrc 文件自动切换版本，使用镜像避免可能存在的 fnm install 问题
- eval "$(fnm env)"
+ eval "$(fnm env --use-on-cd --node-dist-mirror=https://repo.huaweicloud.com/nodejs/)"
```

### windows

> [scoop/choco/cargo/binary](https://github.com/Schniz/fnm#manually)

#### with binary

1. 下载 [fnm-windows.zip](https://github.com/Schniz/fnm/releases)
2. 解压出 exe 文件, 复制 exe 文件所在文件夹路径
3. 编辑用户环境变量, 添加上面复制的路径
4. 编辑用户文件夹下的 `.bashrc` 文件, 添加 `eval "$(fnm env --use-on-cd)"`

#### with cargo

1. [Install Rust and Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)
2. `cargo install fnm`
3. edit `.bashrc`

#### Git Bash issues

> [Git Bash issues](https://github.com/Schniz/fnm/issues/390#issuecomment-776240883)

```bash
eval $(fnm env | sed 1d)
export PATH=$(cygpath $FNM_MULTISHELL_PATH):$PATH

if [[ -f .node-version || -f .nvmrc ]]; then
    fnm use
fi
```

## 常用命令

> [docs](https://github.com/Schniz/fnm/blob/master/docs/commands.md)

```bash
# 命令帮助
fnm --help

# node 已安装列表
fnm list

# node 安装
fnm install 版本号(支持模糊/lts)

# node 卸载
fnm uninstall 版本号

# node 切换
fnm use 版本号

# node 设置默认
fnm default 版本号
```
