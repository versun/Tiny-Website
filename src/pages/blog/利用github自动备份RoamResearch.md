---
layout: ../../layouts/BlogPost.astro
title: 利用github自动备份Roam Research
uuid: c6552248-4897-11ed-9b7b-f296579e3926
version: 4
created: Mon, 14 Jun 2021 13:36:41 +0000
tags:
- z-class/career/personal/it/tips
- y-type/archived
- x-status/publish/blog
---

- 来源

- https://github.com/MatthieuBizien/roam-to-git

- https://github.com/wshuyi/demo-roam-image-bak/blob/master/roam_image_backup.py

- 步骤

- github创建一个私有库：Roam

- 进入Roam库的settings/secrets页面

- 添加3个secrets，value值自行填写:

- ROAMRESEARCH_USER

- ROAMRESEARCH_PASSWORD

- ROAMRESEARCH_DATABASE

- 根目录添加新文件:

- \[\[.github/workflows/main.yml\]\]

- \[\[scripts/roam_image_back.py\]\]

- 完成，去action查看执行结果