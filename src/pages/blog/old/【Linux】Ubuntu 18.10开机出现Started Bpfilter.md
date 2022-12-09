---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】Ubuntu 18.10开机出现Started Bpfilter"
uuid: bfa2ea02-4897-11ed-b511-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:37:26 +0000
tags:
- imported/evernote
---

Title: Ubuntu 18.10开机出现Started Bpfilter Date: 2018-12-16 19:50\
开机出现 Started Bpfilter\
这是18.10的bug，可以查看这个 [帖子](https://askubuntu.com/questions/1032639/ubuntu-18-04-stuck-in-boot-after-starting-gnome-display-manager-on-intel-graphic)\
初步判断是因为英伟达显卡驱动问题，\
解决方案有3种： \* 卸载nvidia的驱动 \* 可以换个桌面管理软件，比如安装切换到 lightdm \* 或者多次尝试重启即可，坐等官方修复这个bug