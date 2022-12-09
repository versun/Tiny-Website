---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 1] Sequel"
uuid: 042afe18-2f29-11ed-9703-327ebed86db8
version: 61
created: Thu, 12 Sep 2022 03:47:51 GMT
tags: [ "areas/pentest", "type/resource", "status/draft" ]
---

**TASK 1**

**What does the acronym SQL stand for?** Structured Query Language

**TASK 2**

**During our scan, which port running mysql do we find?** 3306

**TASK 3**

**What community-developed MySQL version is the target running?** MariaDB

**TASK 4**

**What switch do we need to use in order to specify a login username for the MySQL service?** -u

**TASK 5**

**Which username allows us to log into MariaDB without providing a password?** root

**TASK 6**

**What symbol can we use to specify within the query that we want to display everything inside a table?** \*

**TASK 7**

**What symbol do we need to end each query with?** ;

**SUBMIT FLAG**

Steps:

mysql  -u  root  -h  ip

>show databases;

>use htb;

>show tables;

>select \* from config;

---

Note:
[MySQL Commands: Full List With Examples - InterviewBit](https://www.interviewbit.com/blog/mysql-commands/) 

sudo apt install mysql\*