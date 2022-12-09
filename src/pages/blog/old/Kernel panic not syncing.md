---
layout: ../../../layouts/BlogPost.astro
title: "Kernel panic not syncing : System is deadlocked on memory"
uuid: bbd3f664-4897-11ed-af17-f296579e3926
version: 1
created: 1 Dec 2022
tags:
---
今天在升级虚拟机的ubuntu 22.04系统时，由于升级了内核，需要重启，
但重启后出现错误“Kernel panic not syncing : System is deadlocked on memory”，无法进入系统
原来的内存是512M，我加到了1G后，便可以顺利进入系统