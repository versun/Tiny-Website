---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】修改开机启动级别"
uuid: be6f319a-4897-11ed-b511-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:40:05 +0000
tags:
- imported/evernote
---

1、切换为图形模式\
sudo systemctl set-default graphical.target\
或者\
sudo systemctl set-default runlevel5.target\
2、切换为文本命令模式\
sudo systemctl set-default multi-user.target\
或者\
sudo systemctl set-default runlevel3.target\
3、直接启动图形界面\
systemctl start lightdm