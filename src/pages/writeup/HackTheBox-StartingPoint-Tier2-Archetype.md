---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 2] Archetype"
uuid: a7069e48-3a33-11ed-b622-9e3dc202409c
version: 204
created: Thu, 22 Sep 2022 05:01:40 GMT
tags: [ "status/draft", "type/resource", "areas/pentest" ]
---

**Task 1**

**Which TCP port is hosting a database server? 1433**

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/26c073b9-9105-4e57-af00-cf2bca0e0163.png)

**Task 2**

**What is the name of the non-Administrative share available over SMB? backups**

**Task 3**

**What is the password identified in the file on the SMB share? M3g4c0rp123**

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/ca9b7bdf-5205-4a15-96e1-7b4d9d4e5e53.png)

该文档含有密码和user id

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/1b611190-34da-4eec-80b8-ba79defcf892.png)

**Task 4**

**What script from Impacket collection can be used in order to establish an authenticated connection to a Microsoft SQL Server? mssqlclient.py**

**Task 5**

**What extended stored procedure of Microsoft SQL Server can be used in order to spawn a Windows command shell? xp_cmdshell**

**Task 6**

**What script can be used in order to search possible paths to escalate privileges on Windows hosts? winpeas**

**Task 7**

**What file contains the administrator's password? ConsoleHost_history.txt**

通过mssqlclient可以登录上sql服务，尝试 xp_cmdshell提示错误，需要admin权限

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/da8e5465-0593-4c8b-80fd-1559a14e0af7.png)

尝试直接enable_xp_cmdshell，竟然成功了

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/6c785cfd-812c-4369-a791-f4ae055ae69f.png)

然后在kali上下载[nc64](https://github.com/int0x33/nc.exe/blob/master/nc64.exe)，并打开一个http server和创建一个nc隧道

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/d6f6a499-168f-48fe-8cf2-f73e1b70093c.png)

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/855ff71d-ff57-497f-b13b-fc857ae987b9.png)

在目标机器上，下载nc64到Downloads下

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/867b921c-1428-4d8b-802e-e474916f06fb.png)

然后执行nc命令

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/355e8378-9a1e-424f-8c8c-7d1dceadce87.png)

就能成功获取到返回的shell

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/0bd7e7c2-5c51-4d52-b834-2b45af24a371.png)

这个返回shell的过程，我在自己的kali上或者vps的kali上，都无法成功下载文件，可能是网卡没有开启混杂模式，所以只能在HTB的PWNbox下操作

接着就是下载[winPEASany.exe](https://github.com/carlospolop/PEASS-ng/releases)到目标机上，并执行 .\\winPEASany.exe

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/31a30c2f-4168-4659-98b6-fa3fec3c2417.png)

找到这些有用的文件

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/8ebfdab1-efb6-45c3-bb58-f47ac1621deb.png)

查看powershell的执行历史记录，类似Linux下的.bash_history文件，windows下是ConsoleHost_history.txt

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/130c362c-c85e-43b2-ae71-47c31be684ba.png)

找到了管理员的密码，接下来就简单了

![](https://images.amplenote.com/a7069e48-3a33-11ed-b622-9e3dc202409c/b810c667-5e28-455f-b980-7543b30c64f9.png)

之后进入管理员和用户的桌面，就可以看到flag了

Note:

[Archetype.pdf](attachment://5ad75728-ae54-4e58-a3f7-a71a4a5f0d37)

[https://book.hacktricks.xyz/windows-hardening/windows-local-privilege-escalation](https://book.hacktricks.xyz/windows-hardening/windows-local-privilege-escalation) 

[https://vk9-sec.com/winpeas-windows-enum/](https://vk9-sec.com/winpeas-windows-enum/) [MyCuboxLinx](https://cubox.pro/my/card?id=ff80808183786179018378ce3ed856fc) 

[https://pentestmonkey.net/cheat-sheet/sql-injection/mssql-sql-injection-cheat-sheet](https://pentestmonkey.net/cheat-sheet/sql-injection/mssql-sql-injection-cheat-sheet) [MyCuboxLink](https://cubox.pro/my/card?id=ff80808183785f4b018378cdb7fc3669) 