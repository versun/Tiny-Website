---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 0] Preignition"
uuid: f2ca74b2-2f11-11ed-8be5-327ebed86db8
version: 40
created: Thu, 08 Sep 2022 01:02:45 +0000
tags:
- z-class/career/pentest
- y-type/resource
- x-status/publish/writeup
---

### **TASK 1**

**Directory Brute-forcing is a technique used to check a lot of paths on a web server to find hidden pages. Which is another name for this? (i) Local File Inclusion, (ii) dir busting, (iii) hash cracking.**

dir busting

### **TASK 2**

**What switch do we use for nmap's scan to specify that we want to perform version detection**

\-sV

### **TASK 3**

**What does Nmap report is the service identified as running on port 80/tcp?**

http

### **TASK 4**

**What server name and version of service is running on port 80/tcp?**

nginx 1.14.2

### **TASK 5**

**What switch do we use to specify to Gobuster we want to perform dir busting specifically?**

dir

### **TASK 6**

**When using gobuster to dir bust, what switch do we add to make sure it finds PHP pages?**

\-x php

### **TASK 7**

**What page is found during our dir busting activities?**

admin.php

### **TASK 8**

**What is the HTTP status code reported by Gobuster for the discovered page?**

200

### **SUBMIT FLAG**

try yourself

---

Note:

sudo apt install golang-go

go install github.com/OJ/gobuster/v3@latest

gobuster  dir   --url ip  --wordlist  /usr/share/wordlists/dirb/common.txt

admin:admin