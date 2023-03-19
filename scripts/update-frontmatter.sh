#!/bin/bash

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
