---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】关于fix-broken install"
uuid: bdd6d6c0-4897-11ed-a53e-e64c03c09981
version: 3
created: Sun, 13 Jun 2021 14:30:04 +0000
tags:
- imported/evernote
---

我的发行版是Linux mint 19.3\
在安装一个包时，死活装不上，各种clean，overwrite，-f，fix-broken都无法解决\
最后，找到一个方法，干脆全部关于这个包的依赖全卸载了就可以了。。。。\
虽然最后还是没有安装，但起码不影响以后安装其他包。。。\
方法：

1. 打开synaptic Package Manager (也可用命令行打开：pkexec synaptic)

1. 左边选择状态（Status）

1. 点击Broken选项

1. 把红色的安装包设为卸载

1. 最后应用即可