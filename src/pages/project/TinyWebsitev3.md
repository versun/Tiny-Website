---
layout: ../../layouts/BlogPost.astro
title: Tiny Website v3
uuid: e079930a-768e-11ed-912d-9e6dd13ceda2
version: 187
created: Thu, 08 Dec 2022 00:25:52 +0000
tags:
- z-class/career/it
- y-type/resource
- x-status/publish/project
---

**Created: 2022-12-08**

**Status: In Progress**

**目的：**优化笔记到博客的发布流程

**开发日志：**

原先以为只是一个格式转换问题 (amplenote导出笔记 -> astro框架可用的markdown)

但在实施的过程中，发现问题没那么简单。。。

因此记录下整个过程。

首先介绍下原来的博客发布流程：

在amplenote撰写 -> 导出为md文件 -> 添加astro参数 -> astro build -> 预览 -> git push

更新后的流程：

在amplenote撰写 -> 定期导出全部md文件 -> 预览 -> git push

因此需要自动化脚本来添加astro的参数，还有astro的构建

同时，新建一个git repo，只push astro build后的dist下的文件，这样cloudflare pages就无需任何的构建设置。

这次页面的框架也会稍做修改，更方便后期维护。

这次所有v3的代码将会放在原v2的单独文件夹下

### **自动化脚本**