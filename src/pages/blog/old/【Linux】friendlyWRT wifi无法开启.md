---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】friendlyWRT wifi无法开启"
uuid: bed5548e-4897-11ed-b511-e64c03c09981
version: 3
created: Sun, 13 Jun 2021 14:23:58 +0000
tags:
- imported/evernote
---

1. ssh到friendlywrt

1. rm /etc/config/wireless #删除无线配置文件

1. wifi config > /etc/config/wireless #重建无线配置文件

1. vi /etc/config/wireless #删除或注释掉option disabled 1这句，没有就跳过

1. wifi up\
完成