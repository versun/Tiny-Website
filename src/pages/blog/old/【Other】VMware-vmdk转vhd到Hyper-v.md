---
layout: ../../../layouts/BlogPost.astro
title: "【Other】VMware-vmdk转vhd到Hyper-v"
uuid: c0462af0-4897-11ed-8fd9-f296579e3926
version: 2
created: Sun, 13 Jun 2021 14:37:37 +0000
tags:
- imported/evernote
---

原文链接：[https://blogs.msdn.microsoft.com/timomta/2015/06/11/how-to-convert-a-vmware-vmdk-to-hyper-v-vhd/](https://blogs.msdn.microsoft.com/timomta/2015/06/11/how-to-convert-a-vmware-vmdk-to-hyper-v-vhd/)\
第一步，下载安装微软官方的[转换软件](http://www.microsoft.com/en-us/download/details.aspx?id=42497)\
第二步，管理员打开PowerShell，导入模块 Import-Module 'C:\\Program Files\\Microsoft Virtual Machine Converter\\MvmcCmdlet.psd1'\
第三步，使用命令开始转换，注意更改路径 ConvertTo-MvmcVirtualHardDisk -SourceLiteralPath d:\\scratch\\vmx\\VM-disk1.vmdk -VhdType DynamicHardDisk -VhdFormat vhdx -destination c:\\vm-disk1\
完成