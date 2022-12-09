---
layout: ../../../layouts/BlogPost.astro
title: "【Windows】LTSC等版本安装应用商店"
uuid: c6b07aa8-4897-11ed-af17-f296579e3926
version: 3
created: Sun, 13 Jun 2021 14:34:46 +0000
tags:
- imported/evernote
---

打开网址 https://store.rg-adguard.net/以 PackageFamilyName 方式搜索 Microsoft.WindowsStore_8wekyb3d8bbwe根据系统选择对应的包，每一种都要下载，x64和x86版本都要下载，appx格式的在下载目录按住 shift 键，然后鼠标右键，打开 Powershell执行安装命令

安装该路径下所有包

Add-AppxPackage \*此时点击开始菜单应该就能看到应用商店了