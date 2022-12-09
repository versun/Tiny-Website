---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】Linux搭建keras环境"
uuid: bf3fd32c-4897-11ed-a53e-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:37:06 +0000
tags:
- imported/evernote
---

keras环境要求python>=2.7 <3.6 ##注意官方更新\
建议安装Anaconda，来建立环境，很方便的 本教程基于Anaconda\
创建一个名为keras的新环境 conda create -n keras python=3.6 激活keras环境 conda activate keras 安装相关包 conda install keras numpy pandas\
完成 如果你要在新的keras环境中激活jupyter notebook，可以查看：\
[【Anaconda】conda环境激活Jupyter Notebook](https://www.notion.so/Anaconda-conda-Jupyter-Notebook-93a218fd95164616905081de2b71923c)