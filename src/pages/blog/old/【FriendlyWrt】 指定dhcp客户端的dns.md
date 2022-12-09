---
layout: ../../../layouts/BlogPost.astro
title: "【FriendlyWrt】 指定dhcp客户端的dns"
uuid: bd140ece-4897-11ed-b511-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:21:24 +0000
tags:
- imported/evernote
---

因为搭了一个pi-hole，想把主路由R1S dhcp下发的客户端dns改为pihole，但是\
通过luci修改或者/etc/config/dhcp修改，都是无效的！！！\
只能通过修改/etc/dnsmasq.conf 才有效，添加如下字段：\
\# 仅对 LAN 提供服务\
interface=LAN

# 不读取 /etc/resolv.conf 作为上游 DNS 服务器

no-resolv\
\# 配置上游 DNS 服务器为 114.114.114.114\
server=114.114.114.114\
\# DNS 记录缓存数量为 10000\
cache-size=10000

# DHCP IP 范围，由 192.168.88.50 到 192.168.88.150

\# 子网掩码为 255.255.255.0，DHCP 租约有效期为 1 小时\
dhcp-range=192.168.88.50,192.168.88.150,255.255.255.0,1h\
\# DHCP 选项，下发给客户端的 DNS 服务器为 192.168.88.1\
dhcp-option=option:dns-server,192.168.88.1\
可根据实际情况，自己做删减