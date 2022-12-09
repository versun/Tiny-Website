---
layout: ../../../layouts/BlogPost.astro
title: "【Other】VirtualBox无法打开虚拟机（rc=-1908）"
uuid: c008bf4e-4897-11ed-9b7b-f296579e3926
version: 2
created: Sun, 13 Jun 2021 14:39:13 +0000
tags:
- imported/evernote
---

无法打开虚拟机，提示： virtualbox Kernel driver not installed (rc=-1908)\
解决方法很简单，只要启动vboxdrv即可 sudo modprobe vboxdrv