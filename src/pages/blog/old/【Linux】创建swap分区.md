---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】创建swap分区"
uuid: bda4801c-4897-11ed-99fe-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:39:53 +0000
tags:
- imported/evernote
---

1\.创建要作为swap分区的文件:增加1GB大小的交换分区，则命令写法如下，其中的count等于想要的块的数量（bs\*count=文件大小）。 dd if=/dev/zero of=/var/swapfile bs=1M count=1024\
2\.格式化为交换分区文件: mkswap /var/swapfile #建立swap的文件系统\
3\.启用交换分区文件: swapon /var/swapfile #启用swap文件\
4\.使系统开机时自启用，在文件/etc/fstab中添加一行： /var/swapfile swap swap defaults 0 0