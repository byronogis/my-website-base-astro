---
update: 2023-03-21 23:48
title: "使用 Git 钩子和 Bash 脚本自动更新 Markdown 文件的 frontmatter"
description: "使用 Git 钩子和 Bash 脚本自动更新 Markdown 文件的 frontmatter"
date: 2023-03-19 12:40
tags:
  - git
  - bash
  - markdown
  - frontmatter
head:
  - - meta
    - name: "keywords"
      content: "git, bash, markdown, frontmatter"
---

## 目录

## 情景

当你编写或更新 Markdown 文件时，通常需要手动更新 Front Matter 中的日期或其他元数据，以确保信息的准确性和完整性。这项任务可能会很繁琐，并且容易被遗忘或者忽略。

在这种情况下，自动化这项任务可能会帮助你提高工作效率和生产力。这篇随笔将为你介绍如何使用 Git 钩子和 Bash 脚本自动更新 Markdown 文件的 Front Matter。

Git 钩子是一些可配置的脚本，可以在 Git 命令执行之前或之后自动运行。你可以使用 Git 钩子来验证代码、运行测试、格式化代码、提交代码等操作。

## 准备

在使用本文中的脚本之前，需要安装 Git 和 Bash。

## 实现

### Bash 脚本

新建文件 `./scripts/update-frontmatter.sh`

```bash
#!/bin/bash

# 获取当前时间
DATE=$(date +"%Y-%m-%d %H:%M")

# 获取待提交的 Markdown 文件名
FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.md$')

# 遍历每个待提交的 Markdown 文件并更新其 Front Matter
for FILE in $FILES; do
  # 判断文件是否包含 Front Matter
  if grep -q '^---' "$FILE"; then
    # 使用 awk 在第二个 '---' 行之前的内容，匹配 'update' 字段
    FRONT_MATTER=$(awk '/^---/{n++;next} n==2{exit} {print}' "$FILE")
    if echo "$FRONT_MATTER" | grep -q 'update:'; then
      # 更新 'update' 字段的时间戳
      sed -i "0,/update:/s/\(update:\s*\).*/\1$DATE/" "$FILE"
    else
      # 如果 Front Matter 中不存在 'update' 字段，则在第一个 '---' 行之后添加
      sed -i "0,/^---/{/^---/a update: $DATE
      :b;n;bb}" "$FILE"
    fi
  else
    # 如果文件没有 Front Matter，则在开头添加 Front Matter 和 'update' 字段
    sed -i "1i---\nupdate: $DATE\n---\n" "$FILE"
  fi
done

git add $FILES

exit 0
```

### 借助 husky 管理 Git 钩子

#### 初始化

```bash
npx husky-init && npm install
```

#### 配置钩子文件

编辑/新建 `./.husky/pre-commit` 文件

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo -e "Updating Front Matter..."

./scripts/update-frontmatter.sh

echo -e "Front Matter updated."
```

## 完成

现在，我们就完成了 md 文件 frontmatter 自动更新的功能，并且实现了自动化处理。每次 Git 提交时，如果有 md 文件被修改，脚本就会自动更新 frontmatter 中的时间戳，不需要手动修改，省去了大量的时间和精力。

这个功能对于那些需要记录更新时间的项目非常有用，例如博客、文档等。
