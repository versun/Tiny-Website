---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】挂载img文件"
uuid: bdbe4e20-4897-11ed-b511-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:34:17 +0000
tags:
- imported/evernote
---

首先查看空闲的loop\
losetup -f\
然后挂载\
losetup /dev/loop13 something.img\
kpartx -av /dev/loop13

mkdir /mnt/img\
mount /dev/mapper/loop13p1 /mnt/img\
注意：所有操作均在sudo下