---
title: NVS node版本管理工具简单介绍及使用
description: Node Version Switcher
date: 2022-04-04 13:01
update: 2022-04-04 13:01
tags:
  - application
head:
  - - meta
    - name: keywords
      content: node nvs
---


## 目录


> [Node Version Switcher](https://github.com/jasongin/nvs)  
> windows上也可以使用的node版本管理工具  

## 安装

> [安装](https://github.com/jasongin/nvs#setup)

## 使用

> [全部命令](https://github.com/jasongin/nvs#command-reference)

```bash
# 查看当前使用的nvs版本
nvs --version
# 或者
nvs -v

# 列出所有可用的nvs版本
# 可供下载
nvs ls-remote
# 本地已下载
nvs ls

# 下载指定版本，如 nvs add 16、nvs add 16.14、nvs add lts
nvs add <version>

# 删除指定版本，如 nvs rm 16、nvs rm 16.14、nvs rm lts
nvs rm <version>

# 切换到指定版本，如 nvs use 16、nvs use 16.14、nvs use lts
# 仅在此次终端会话有效，下次终端会话重新使用默认版本
nvs use <version>

# 指定默认的版本，如 nvs link 16
nvs link <version>
# 这样就可以使用 nvs use 默认版本
nvs use default
# 或直接运行
nvs use

# 查看当前使用的node版本
nvs which
```

### 自动切换node版本

> 在windows以及wsl上测试，只会在当前命令行生效，重新打开命令行后失效  
> 想要使用需要再次运行 `nvs auto on`


在目标目录下创建一个.node-version 文件或者 .nvmrc 文件，内容为需要使用的node版本，如：

```
# .node-version 或者 .nvmrc
16.14.2
```

然后运行以下命令：

```bash
nvs auto on
```

此时，进入包含上述文件的目录时，nvs会自动切换到指定的node版本，如果指定的版本不存在，则会**直接安装**然后切换
退出包含上述文件的目录时，会自动切换至默认版本

```bash
# 也可手动切换，此时直接运行
nvs use
```

### 全局模块安装

在使用nvs的情况下，安装的全局模块并不会随着node版本的切换而在新的版本中可用  
可以使用以下命令将某一个版本中的全局模块安装到另一个版本中

```bash
# from 为先前已经安装过全局模块的版本 to 为即将安装全局模块的版本，  
# 例如：nvs migrate 14 16，表示将14版本中的全局模块也安装到16版本中
nvs migrate <from> <to>
```

## 参考

https://github.com/jasongin/nvs
