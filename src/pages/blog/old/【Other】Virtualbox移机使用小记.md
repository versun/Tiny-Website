---
layout: ../../../layouts/BlogPost.astro
title: "【Other】Virtualbox移机使用小记"
uuid: c026261a-4897-11ed-af17-f296579e3926
version: 2
created: Sun, 13 Jun 2021 14:32:39 +0000
tags:
- imported/evernote
---

因为目前我所有的虚拟机都放在固态的移动硬盘里，方便公司和家里都能用\
在公司都配置好后，用家里的电脑却打不开vbox文件，提示“different image”错误信息\
解决方案： 要先导入vdi硬盘文件，管理--》虚拟介质管理 在虚拟介质管理中，添加你要导入的所有的硬盘文件，如果有快照，也要把快照文件导入\
然后再打开vbox，就可以了