---
sidebar_position: 2
---

# the-ultimate-git-course

[the-ultimate-git-course](https://codewithmosh.com/p/the-ultimate-git-course)

## config

```bash
# 默认编辑器
git config --global core.editor "code --wait"

# 打开编辑器配置
git config --global -e

# crlf
git config --global core.autocrlf input # windows 值为true

# 配置diff tool
git config --global diff.tool vscode

# 配置vscode cmd
git config --blobal difftool.vscode.cmd "code --wait --diff $LOCAL $REMOTE"

```

## basic

```bash
# 查看git跟踪的文件
git ls-files

# 移除跟踪文件
git rm --cache <file>

## diff暂存区
git diff --staged

## 从暂存区恢复
git restore --staged

## 从历史记录恢复
git restore --source=<branch> <file>

## test2

## rebase

## r1

## r2

#1

#2

h1

h2
```
