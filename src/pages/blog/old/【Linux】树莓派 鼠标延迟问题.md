---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】树莓派 鼠标延迟问题"
uuid: be37246c-4897-11ed-b511-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:23:47 +0000
tags:
- imported/evernote
---

sd卡根目录，编辑cmdline.txt文件，添加：\
usbhid.mousepoll=0\
不要另起一行添加，直接空格添加到末尾即可\
重启解决。