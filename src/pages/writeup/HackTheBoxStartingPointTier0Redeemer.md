---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 0] Redeemer"
uuid: 8f72e3fa-2f10-11ed-a165-327ebed86db8
version: 66
created: Thu, 08 Sep 2022 00:52:49 +0000
tags:
- z-class/career/pentest
- y-type/resource
- x-status/publish/writeup
---

### **TASK 1**

**Which TCP port is open on the machine?**

6379

### **TASK 2**

**Which service is running on the port that is open on the machine?**

redis

### **TASK 3**

**What type of database is Redis? Choose from the following options: (i) In-memory Database, (ii) Traditional Database**

In-memory Database

### **TASK 4**

**Which command-line utility is used to interact with the Redis server? Enter the program name you would enter into the terminal without any arguments.**

redis-cli

### **TASK 5**

**Which flag is used with the Redis command-line utility to specify the hostname?**

\-h

### **TASK 6**

**Once connected to a Redis server, which command is used to obtain the information and statistics about the Redis server?**

info

### **TASK 7**

**What is the version of the Redis server being used on the target machine?**

5\.0.7

### **TASK 8**

**Which command is used to select the desired database in Redis?**

select

### **TASK 9**

**How many keys are present inside the database with index 0?**

4

### **TASK 10**

**Which command is used to obtain all the keys in a database?**

keys \*

### **SUBMIT FLAG**

try yourself

---

### Note:

nmap  -sV  -p-  -T5  ip

sudo apt install redis-tools

redis-cli  -h  ip

    >info

    >select o

    >keys \*

    >get flag