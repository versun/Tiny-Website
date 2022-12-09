---
layout: ../../../layouts/BlogPost.astro
title: "【Docker】 普通用户运行权限问题"
uuid: bcdf9cde-4897-11ed-af17-f296579e3926
version: 2
created: Sun, 13 Jun 2021 14:21:02 +0000
tags:
- imported/evernote
---

错误提示：\
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.40/version": dial unix /var/run/docker.sock: connect: permission denied\
问题：普通用户无权限允许docker,即使添加了用户和组依旧无法解决\
解决方法：\
sudo chmod 666 /var/run/docker.sock