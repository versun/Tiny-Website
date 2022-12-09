---
layout: ../../../layouts/BlogPost.astro
title: "【Anaconda】修改conda环境默认路径和缓存路径无标题笔记"
uuid: bc31ed96-4897-11ed-9b7b-f296579e3926
version: 3
created: Sun, 13 Jun 2021 14:31:18 +0000
tags:
- imported/evernote
---

很简单，找到“.condarc”,一般在用户目录下“C:\\Users\\XXX” 添加以下新配置：\
envs_dirs: ##默认环境路径

- D:\\data\\xxx\\conda\\envs ##第一个为默认路径

- C:\\Users\\xxx\\AppData\\Local\\conda\\conda\\envs ##按需求添加，也可只有默认路径\
pkgs_dirs: ##默认缓存路径

- D:\\data\\xxx\\conda\\pkgs ##第一个为默认路径

- C:\\Users\\xxx\\AppData\\Local\\conda\\conda\\pkgs