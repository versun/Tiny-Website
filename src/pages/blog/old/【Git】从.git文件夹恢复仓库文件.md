---
layout: ../../../layouts/BlogPost.astro
title: "【Git】从.git文件夹恢复仓库文件"
uuid: bd2cbd98-4897-11ed-a53e-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:29:46 +0000
tags:
- imported/evernote
---

cd repo.git

# 创建budele文件

git bundle create ./reponame.bundle --all

# 从bundle文件中clone出代码

git clone ./reponame.bundle reponame

# 这是文件夹内会出现一个 reponame 文件夹，这个文件夹内就是所有的代码文件

# 并且还可以恢复其他分支的代码

git clone -b release ./reponame.bundle reponame

# 新建新的git仓库 名为 newrepo

git remote rm origin

# url.git 为新的git仓库地址

git remote add origin newrepo.git