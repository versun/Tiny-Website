---
layout: ../../../layouts/BlogPost.astro
title: "【DNS】Ubuntu下利用CoreDNS启用DNS-over-TLS (DoT)"
uuid: bcc3d026-4897-11ed-99fe-e64c03c09981
version: 3
created: Sun, 13 Jun 2021 14:21:46 +0000
tags:
- imported/evernote
---

DoT的工具有很多，这里我选用的是cloudflare家的工具，毕竟大厂，放心。\
步骤：

1. 下载 CoreDNS：[website](https://coredns.io/), 解压到 /usr/bin 并设置权限 (sudo chmod +x /usr/bin/coredns)

1. 安装 resolvconf 来管理 /etc/resolv.conf: sudo apt install resolvconf

1. 添加 dns=default 到 /etc/NetworkManager/NetworkManager.conf

1. 添加 nameserver 127.0.0.1 到 /etc/resolvconf/resolv.conf.d/head

1. 创建文件夹和文件： /etc/coredns/Corefile 粘贴以下内容并保存：\
.:53 {\
forward . [tls://2606:4700:4700::1111](tls://2606:4700:4700::1111/) [tls://1.1.1.1](tls://1.1.1.1/)\
log\
errors\
cache\
}

1. 创建新用户 CoreDNS: sudo useradd -d /var/lib/coredns -m coredns

1. 设置权限: sudo chown coredns:coredns /usr/bin/coredns

1. 下载 SystemD service 的文件 [coredns/coredns](https://github.com/coredns/deployment/tree/master/systemd) 到 /etc/systemd/system/coredns.service

1. 禁用 SystemD 默认的 DNS server: sudo systemctl stop systemd-resolved && sudo systemctl disable systemd-resolved

1. 注意：有些系统（比如kali）的服务名是 resolvconf-pull-resolved.path

1. 设置开机启动并且开启服务: sudo systemctl enable coredns && sudo systemctl start coredns

1. 完成，可以用dig +short [kit.edu](http://kit.edu/). 如果能正常放回即表示成功

1. Firefox浏览器，需要在网络设置里面，打开DNS-over-TLS，自定义地址为127.0.0.1

1. 可以去这里检查下是否正常：[https://www.cloudflare.com/ssl/encrypted-sni/](https://www.cloudflare.com/ssl/encrypted-sni/) 前3个为绿色打钩状态即表示成功了。\
转载自：[https://dev.to/n1try/how-to-enable-dns-over-tls-on-ubuntu-using-coredns-18mp](https://dev.to/n1try/how-to-enable-dns-over-tls-on-ubuntu-using-coredns-18mp) 