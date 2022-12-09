---
layout: ../../../layouts/BlogPost.astro
title: "【Anaconda】conda环境激活Jupyter Notebook"
uuid: bc4f5e4e-4897-11ed-bf7e-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:38:39 +0000
tags:
- imported/evernote
---

首先进入你要激活的环境，比如：my_env conda activate my_env\
安装ipykernel conda install ipykernel\
激活 python -m ipykernel install --user --name my_env\
完成 打开jupyter notebook 菜单栏kernel下，可以选择刚刚激活的环境