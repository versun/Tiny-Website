---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】Ubuntu 18.04 修改默认启动级别"
uuid: bf8c7c40-4897-11ed-9b7b-f296579e3926
version: 2
created: Sun, 13 Jun 2021 14:35:14 +0000
tags:
- imported/evernote
---

Ubuntu 18.04 修改默认启动级别\
sudo systemctl set-default graphical.target

sudo systemctl set-default runlevel3.target\
systemctl stop lightdm