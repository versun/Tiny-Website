---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】Hash Sum mismatch 解决方案"
uuid: bef70700-4897-11ed-af17-f296579e3926
version: 2
created: Sun, 13 Jun 2021 14:26:06 +0000
tags:
- imported/evernote
---

在VM中的Kali linux，apt update的时候，出现Hash Sum mismatch问题，尝试了网上各种clean，删除list文件等方法，均无效。\
后来看到新的解决方案，该问题出在win10的虚拟机机制上 ，关掉即可，cmd管理员运行以下命令：\
bcdedit /set hypervisorlaunchtype off\
然后计算机重启，就可以了\
解决方案出处：[Reddit](https://www.reddit.com/r/Kalilinux/comments/h8o0xh/aptget_update_always_ends_up_in_hashsum_mismatch/)