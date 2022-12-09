---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 0] Dancing"
uuid: 48d3a2d2-2f0f-11ed-9847-c2af19d2d6e3
version: 39
created: Thu, 08 Sep 2022 00:43:40 GMT
tags: [ "type/resource", "areas/pentest" ]
---

### **TASK 1**

**What does the 3-letter acronym SMB stand for?**

Server Message Block

### **TASK 2**

**What port does SMB use to operate at?**

445

### **TASK 3**

**What is the service name for port 445 that came up in our Nmap scan?**

microsoft-ds

### **TASK 4**

**What is the 'flag' or 'switch' we can use with the SMB tool to 'list' the contents of the share?**

\-L

### **TASK 5**

**How many shares are there on Dancing?**

4

### **TASK 6**

**What is the name of the share we are able to access in the end with a blank password?**

WorkShares

### **TASK 7**

**What is the command we can use within the SMB shell to download the files we find?**

get

### **SUBMIT FLAG**

try your self

---

### Note:

smbclient -L ip

smbclient \\\\\\\\ip\\\\WorkShares