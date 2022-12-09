---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 1] Ignition"
uuid: dc68685c-33d8-11ed-8ea4-9e3dc202409c
version: 121
created: Wed, 14 Sep 2022 02:56:39 +0000
tags:
- z-class/career/pentest
- y-type/resource
- x-status/publish/writeup
---

**TASK 1**

**Which service version is found to be running on port 80?**nginx 1.14.2

**TASK 2**

**What is the 3-digit HTTP status code returned when you visit http://{machine IP}/?**302

**TASK 3**

**What is the virtual host name the webpage expects to be accessed by?**ignition.htb

**TASK 4**

**What is the full path to the file on a Linux computer that holds a local list of domain name to IP address pairs?**/etc/hosts

**TASK 5**

**What is the full URL to the Magento login page?**http://ignition.htb/admin

**TASK 6**

**What password provides access as admin to Magento?**qwerty123

它的普通用户的密码要求。。

![](/images/dc68685c-33d8-11ed-8ea4-9e3dc202409c/1ede8e06-d4c7-49df-8887-609830a14476.png)

Magento官方的Admin密码要求，比普通用户的还要低。。。。

[Configuring Admin Security](https://docs.magento.com/user-guide/stores/security-admin.html) 

![](/images/dc68685c-33d8-11ed-8ea4-9e3dc202409c/af5a47b0-d905-4eff-9527-a6b3ea325dc9.png)

默认密码试了下不行

[Default password list ](https://github.com/ihebski/DefaultCreds-cheat-sheet) 

![](/images/dc68685c-33d8-11ed-8ea4-9e3dc202409c/0b9d379d-3073-4a94-8b3b-0f6030c07b9d.png)

由于没有找到有用的信息，卡了很久，最后去搜了别人的答案，原来这题无解，只是一个个试试，不过想了想，现实里这种情况其实很常见的，教你重新做人了这个任务。

我这里使用这SecList的密码本`2020-200_most_used_passwords.txt`，根据上面的要求，密码至少8位，且必须含有数字和字符，则可以筛选下：

```
sed -ri '/^.{,7}$/d' passwords.txt            # remove shorter than 8
sed -ri '/[0-9]+/!d' passwords.txt            # remove no numbers
sed -ri '/[a-zA-Z]+/!d' passwords.txt            # remove no letters
```

如果要作弊一下的话，通过HTB的页面提示，应该有9位，且结尾为3，则可以筛选出很少的结果

登录进去后就可以看到flag 了

[Ignition.pdf](/attachments/Ignition.pdf)