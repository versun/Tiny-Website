---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 1] Tactics"
uuid: 7ff4e6fe-397d-11ed-a709-5ac3aea65f93
version: 55
created: Wed, 21 Sep 2022 07:17:47 GMT
tags: [ "type/resource", "areas/pentest", "status/draft" ]
---

Task 1

Which Nmap switch can we use to enumerate machines when our packets are otherwise blocked by the Windows firewall? -Pn

![](https://images.amplenote.com/7ff4e6fe-397d-11ed-a709-5ac3aea65f93/53c95b4a-9f1d-462f-b2c7-95bfad1022ef.png)

Task 2

What does the 3-letter acronym SMB stand for? Server message block

Task 3

What port does SMB use to operate at? 445

Task 4

What command line argument do you give to \`smbclient\` to list available shares? -L

![](https://images.amplenote.com/7ff4e6fe-397d-11ed-a709-5ac3aea65f93/417842d9-fa55-44fd-9524-e281c01ff50b.png)

Task 5

What character at the end of a share name indicates it's an administrative share? $

Task 6

Which Administrative share is accessible on the box that allows users to view the whole file system? C$

Task 7

What command can we use to download the files we find on the SMB Share? get

Task 8

Which tool that is part of the Impacket collection can be used to get an interactive shell on the system? psexec.py

Submit Flag

![](https://images.amplenote.com/7ff4e6fe-397d-11ed-a709-5ac3aea65f93/3391d7d8-2a6e-4d66-9176-c2efb08cdf7e.png)

flag在C:\\Users\\Administrator\\Desktop路径下

Note:

[Tactics.pdf](attachment://7d598a7a-a1aa-48a0-9684-c59fcad3df3f)