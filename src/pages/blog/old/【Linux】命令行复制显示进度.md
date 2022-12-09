---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】命令行复制显示进度"
uuid: bdec24a8-4897-11ed-a53e-e64c03c09981
version: 8
created: Sun, 13 Jun 2021 14:26:33 +0000
tags:
- imported/evernote
---

方法一：scp命令（推荐）

scp -r /mnt root@127.0.0.1:/home (拷贝文件夹要加参数 -r，拷贝文件不需要)

（显示拷贝速度、剩余时间、已拷贝大小、进度%，不显示总大小，一般速度为10M/s）

方法二：rsync命令

rsync -av --progress /mnt /home

（显示拷贝速度、剩余时间、已拷贝大小、进度%，不显示总大小，一般速度为300kb/s）