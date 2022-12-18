---
layout: ../../layouts/BlogPost.astro
title: Metasploitable3虚拟机安装(windows)
uuid: c9bce3ee-4897-11ed-b511-e64c03c09981
version: 4
created: Sun, 13 Jun 2021 14:35:24 +0000
tags:
- z-class/career/personal/it/tips
- y-type/archived
- x-status/publish/blog
---

Title: metasploitable3虚拟机安装（win） Date: 2019-06-28 13:42\
项目地址：[https://github.com/rapid7/metasploitable3](https://github.com/rapid7/metasploitable3)\
需求软件： [Packer](https://www.packer.io/intro/getting-started/install.html) [Vagrant](https://www.vagrantup.com/docs/installation/) [Vagrant Reload Plugin](https://github.com/aidanns/vagrant-reload#installation) [VirtualBox](https://www.virtualbox.org/wiki/Downloads), libvirt/qemu-kvm, or vmware (paid license required) 除了Packer，下载完解压后，把Packer.exe放到系统Path里面去，然后在cmd里面测试packer就行了 其他都是软件包安装，很方便\
接下来就是重头戏了 该命令需要在poweshell上执行，不能在cmd中执行\
错误1： 图片:\
![](/images/a623e534-a780-4dcf-be82-3bfcc249064a.jpg)\
解决1： 管理员运行PoweShell 执行 Set-ExecutionPolicy RemoteSigned 输入y回车\
错误2： 图片:\
![](/images/b3cc0b0a-e920-4f77-b79b-45773c864cb0.jpg)\
解决2： 文本编辑 build.ps1 把： $actualVersion = $actualVersion.split(“.”) 改为已安装的virtualbox的版本号：(需要你自己打开virtualbox查看版本) $actualVersion = “6.0.8” 保存\
最后重新执行命令，等等即可。 完成