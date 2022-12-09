---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】Kali linux安装bcm无线网卡"
uuid: bf109a30-4897-11ed-a53e-e64c03c09981
version: 3
created: Sun, 13 Jun 2021 14:37:18 +0000
tags:
- imported/evernote
---

apt-get update apt-get install linux-image-(*uname* − *r*|*sed*′*s*, \[−\] \* − \[−\] \* −,, ′)*linux* − *headers*−(uname -r|sed ‘s,\[^-\]*-\[^-\]*-,,’) broadcom-sta-dkms\
modprobe -r b44 b43 b43legacy ssb brcmsmac bcma modprobe wl reboot\
适合一下网卡型号: Broadcom BCM4311, BCM4312, BCM4313, BCM4321, BCM4322, BCM43224, BCM43225, BCM43227, BCM43228, BCM43142, BCM4331, BCM4352, BCM4360 devices (wl)