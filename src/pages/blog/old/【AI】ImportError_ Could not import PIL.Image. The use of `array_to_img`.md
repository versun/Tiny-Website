---
layout: ../../../layouts/BlogPost.astro
title: "【AI】ImportError_ Could not import PIL.Image. The use of `array_to_img`"
uuid: bbd3f664-4897-11ed-af17-f296579e3926
version: 3
created: Sun, 13 Jun 2021 14:37:48 +0000
tags:
- imported/evernote
---

在用keras做练习时，导入图片，遇到了该错误： ImportError: Could not import PIL.Image. The use of array_to_img\
谷歌了一下，发现是没有安装pillow包，所以，补装上就行 conda install pillow