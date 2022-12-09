---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 1] Pennyworth"
uuid: d76cc974-38d8-11ed-a1d6-5ac3aea65f93
version: 74
created: Tue, 20 Sep 2022 11:39:09 +0000
tags:
- y-type/resource
- z-class/career/pentest
- x-status/publish/writeup
---

Task 1

What does the acronym CVE stand for? Common Vulnerabilities and Exposures

Task 2

What do the three letters in CIA, referring to the CIA triad in cybersecurity, stand for? confidentiality, integrity, availability

Task 3

What is the version of the service running on port 8080? Jetty 9.4.39.v20210325

![](/images/d76cc974-38d8-11ed-a1d6-5ac3aea65f93/4d27cf05-d5cf-4f19-86e7-211951c197e9.png)

Task 4

What version of Jenkins is running on the target? 2.289.1

![](/images/d76cc974-38d8-11ed-a1d6-5ac3aea65f93/adad5364-7fc2-43ef-92de-6b5cfa894879.png)

Task 5

What type of script is accepted as input on the Jenkins Script Console? Groovy

Task 6

What would the "String cmd" variable from the Groovy Script snippet be equal to if the Target VM was running Windows? cmd.exe

Task 7

What is a different command than "ip a" we could use to display our network interfaces' information on Linux? ifconfig

Task 8

What switch should we use with netcat for it to use UDP transport mode? -u

Task 9

What is the term used to describe making a target host initiate a connection back to the attacker host? reverse shell

Submit Flag

尝试用最常用的密码可以成功登录

```
admin:admin
admin:password
root:root
root:password
```

然后点击Build Executor Status，选择Master，点击左边的Script Console

就可以执行任何命令了

![](/images/d76cc974-38d8-11ed-a1d6-5ac3aea65f93/37a50093-4ffc-4f4e-a232-ff769359e7b8.png)

Note:

[Pennyworth.pdf](/attachments/Pennyworth.pdf)

[https://github.com/gquere/pwn_jenkins](https://github.com/gquere/pwn_jenkins) 

[https://devco.re/blog/2019/01/16/hacking-Jenkins-part1-play-with-dynamic-routing/](https://devco.re/blog/2019/01/16/hacking-Jenkins-part1-play-with-dynamic-routing/) 

[https://paper.seebug.org/648/](https://paper.seebug.org/648/) 