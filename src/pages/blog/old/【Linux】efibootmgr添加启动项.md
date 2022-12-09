---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】efibootmgr添加启动项"
uuid: bebed3ee-4897-11ed-b511-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:22:38 +0000
tags:
- imported/evernote
---

efibootmgr -c -w -L "BootOptionName" -d /dev/sdb -p 1 -l \\EFI\\Boot\\bootx64.efi\
\#我的启动分区所在的硬盘为/dev/sdb