---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 1] Appointment"
uuid: 82b44106-2f27-11ed-ab02-c2af19d2d6e3
version: 107
created: Thu, 12 Sep 2022 03:37:05 GMT
tags: [ "type/resource", "areas/pentest", "status/draft" ]
---

**TASK 1**

**What does the acronym SQL stand for?** Structured Query Language

**TASK 2**

**What is one of the most common type of SQL vulnerabilities?** SQL injection

**TASK 3**

**What does PII stand for?** Personally Identifiable Information

**TASK 4**

**What does the OWASP Top 10 list name the classification for this vulnerability?** A03:2021-Injection

**TASK 5**

**What service and version are running on port 80 of the target?** Apache httpd 2.4.38 ((Debian))

**TASK 6**

**What is the standard port used for the HTTPS protocol?** 443

**TASK 7**

**What is one luck-based method of exploiting login pages?** brute-forcing

**TASK 8**

**What is a folder called in web-application terminology?** directory

**TASK 9**

**What response code is given for "Not Found" errors?** 404

**TASK 10**

**What switch do we use with Gobuster to specify we're looking to discover directories, and not subdomains?** dir

**TASK 11**

**What symbol do we use to comment out parts of the code?** #

**SUBMIT FLAG**

Steps:

nmap  -sC  -sV  ip

gobuster   dir  --url  http://ip/  --wordlist  /usr/share/dirub/directory-list-2.3-small.txt

Here is an example of how authentication works using PHP & SQL:

```
<?php
mysql_connect("localhost", "db_username", "db_password"); # Connection to the SQL
Database.
mysql_select_db("users"); # Database table where user information is stored.
$username=$_POST['username']; # User-specified username.
$password=$_POST['password']; #User-specified password.
#######注意以下这行代码
$sql="SELECT * FROM users WHERE username='$username' AND password='$password'";
#######
# Query for user/pass retrieval from the DB.
$result=mysql_query($sql);
# Performs query stored in $sql and stores it in $result.
$count=mysql_num_rows($result);
# Sets the $count variable to the number of rows stored in $result.
if ($count==1){
 # Checks if there's at least 1 result, and if yes:
 $_SESSION['username'] = $username; # Creates a session with the specified $username.
 $_SESSION['password'] = $password; # Creates a session with the specified $password.
 header("location:home.php"); # Redirect to homepage
}
else { # If there's no singular result of a user/pass combination:
 header("location:login.php");
 # No redirection, as the login failed in the case the $count variable is not equal to
1, HTTP Response code 200 OK.
}
?>
```

在登录页面中，输入Username: admin'#，密码无所谓，点击登录即可成功注入

**Note:**
ref: [A03 Injection - OWASP Top 10:2021](https://www.bing.com/ck/a?!&&p=954d862a78695fa0JmltdHM9MTY2Mjk0MDgwMCZpZ3VpZD0xMjM0MWNiNi1mYzM3LTYyZWYtMGRjZC0wZDQyZmRlNTYzNjImaW5zaWQ9NTE2Ng&ptn=3&hsh=3&fclid=12341cb6-fc37-62ef-0dcd-0d42fde56362&u=a1aHR0cHM6Ly9vd2FzcC5vcmcvVG9wMTAvQTAzXzIwMjEtSW5qZWN0aW9uLw&ntb=1) 