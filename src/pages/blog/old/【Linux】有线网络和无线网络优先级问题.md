---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】有线网络和无线网络优先级问题"
uuid: be87b832-4897-11ed-8fd9-f296579e3926
version: 3
created: Sun, 13 Jun 2021 14:31:06 +0000
tags:
- imported/evernote
---

问题：有线连接内网服务器，无线连接外网，linux无法通过无线上网\
原因：因为有线的优先级更高，所以，系统默认走有线\
解决：

1. 利用 ip route命令修改默认路由：\
ip route default 0.0.0.0 dev wlan0\
ip route 10.0.0.0 dev eth0

1. 利用network管理器修改：\
打开网络管理器，修改有线端口的设置，选择ipv4选项卡，路由设置里，把“仅将此连接用于其网络上的资源”打勾即可\
注意：修改后，如果以后要通过有线上网，需要再改回来。避免麻烦，可以用网络管理器，创建一个新的连接