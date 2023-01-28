---
title:  Git 使用初始化
description: 用户名、用户邮箱、默认分支名称、ssh密钥
date: 2022-04-03 12:58
update: 2022-04-03 12:58
tags:
  - application
head:
  - - meta
    - name: keywords
      content: git ssh branch
---


## 目录


## git配置

### 全局配置

```bash
# 查看全局配置
git config --global --list

# 全局配置 用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "Your Email"

# 默认分支名称
## master -> main
git config --global init.defaultBranch main

# 修改现有分支名称
git branch -m main
```

### 本地配置

```bash
# 查看本地配置
git config --local --list

# 本地配置 用户名和邮箱
git config --local user.name "Your Name"
git config --local user.email "Your Email"
```

### 多用户配置

```bash
# ~/.ssh/config
# personal
Host gitee
HostName gitee.com
User Your Name
# 对应的ssh key
IdentityFile ~/.ssh/id_rsa

# work
Host 192.168.1.19
HostName 192.168.1.19
User Your Name
# 对应的ssh key，生成时指定能区分的名字然后写到这里 例：id_rsa_work
IdentityFile ~/.ssh/id_rsa_work
```

## 生成SSH密钥

> [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
)

```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# Note: If you are using a legacy system that doesn't support the Ed25519 algorithm, use:
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### 添加到ssh-agent（可选）

> [Agent admitted failure to sign using the key](https://docs.github.com/cn/authentication/troubleshooting-ssh/error-agent-admitted-failure-to-sign)


```bash
# start the ssh-agent in the background
eval "$(ssh-agent -s)"

# 添加到ssh-agent
ssh-add ~/.ssh/id_ed25519

# 查看ssh-agent
ssh-add -l
```

### 自动启动ssh-agent（可选）

> [在 Git for Windows 上自动启动 ssh-agent](https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/working-with-ssh-key-passphrases#auto-launching-ssh-agent-on-git-for-windows)

```bash
# ~/.bashrc
# 使用Zsh则为 ~/.zshrc
# 复制以下行并将其粘贴到 ~/.bashrc 或 ~/.zshrc 中
env=~/.ssh/agent.env

agent_load_env () { test -f "$env" && . "$env" >| /dev/null ; }

agent_start () {
    (umask 077; ssh-agent >| "$env")
    . "$env" >| /dev/null ; }

agent_load_env

# agent_run_state: 0=agent running w/ key; 1=agent w/o key; 2=agent not running
agent_run_state=$(ssh-add -l >| /dev/null 2>&1; echo $?)

if [ ! "$SSH_AUTH_SOCK" ] || [ $agent_run_state = 2 ]; then
    agent_start
    ssh-add
elif [ "$SSH_AUTH_SOCK" ] && [ $agent_run_state = 1 ]; then
    ssh-add
fi

unset env
```

## 参考

https://www.cnblogs.com/cangqinglang/p/12462272.html  
https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/about-ssh
