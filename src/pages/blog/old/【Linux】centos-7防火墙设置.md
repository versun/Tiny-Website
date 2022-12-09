---
layout: ../../../layouts/BlogPost.astro
title: "【Linux】centos-7防火墙设置"
uuid: bea28fea-4897-11ed-9b7b-f296579e3926
version: 2
created: Sun, 13 Jun 2021 14:38:02 +0000
tags:
- imported/evernote
---

iptables添加的规则貌似不生效\
需要使用firewall-cmd来创建规则才可以\
查看已经开放的端口：\
firewall-cmd --list-ports\
开启端口\
firewall-cmd --zone=public --add-port=80/tcp --permanent\
命令含义：\
–zone #作用域\
–add-port=80/tcp #添加端口，格式为：端口/通讯协议\
–permanent #永久生效，没有此参数重启后失效\
重启防火墙\
firewall-cmd --reload #重启firewall\
systemctl stop firewalld.service #停止firewall\
systemctl disable firewalld.service #禁止firewall开机启动firewall-cmd --state