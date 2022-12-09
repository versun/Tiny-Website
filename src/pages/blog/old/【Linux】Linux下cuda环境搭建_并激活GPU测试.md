---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】Linux下cuda环境搭建，并激活GPU测试"
uuid: bf588ae8-4897-11ed-8fd9-f296579e3926
version: 2
created: Sun, 13 Jun 2021 14:38:51 +0000
tags:
- imported/evernote
---

本教程基于[官方教程](https://keras-cn.readthedocs.io/en/latest/for_beginners/keras_linux/)\
首先安装系统要安装一下包 nvidia nvidia-utils cuda\
然后基于Anaconda： conda install tensorflow-gpu，cudnn\
测试文件：[mnist_cnn.py](https://github.com/keras-team/keras/tree/master/examples/mnist_cnn.py)\
一般一个epoch 15秒以内 cpu的话就会很长