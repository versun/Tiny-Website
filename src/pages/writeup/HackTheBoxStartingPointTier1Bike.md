---
layout: ../../layouts/BlogPost.astro
title: "[Hack The Box] [Starting Point] [Tier 1] Bike"
uuid: eab5af94-34c5-11ed-8ea4-9e3dc202409c
version: 369
created: Thu, 15 Sep 2022 07:13:34 +0000
tags:
- z-class/career/pentest
- y-type/resource
- x-status/publish/writeup
---

**TASK 1**

**What TCP ports does nmap identify as open? Answer with a list of ports seperated by commas with no spaces, from low to high.** 22,80

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/7cf46d8d-0531-41de-9f9f-c93768ad72c4.png)

**TASK 2**

**What software is running the service listening on the http/web port identified in the first question?** Node.js

**TASK 3**

**What is the name of the Web Framework according to Wappalyzer?** Express

**TASK 4**

**What is the name of the vulnerability we test for by submitting {{7\*7}}?** Server Side Template Injection

**TASK 5**

**What is the templating engine being used within Node.JS?** Handlebars

根据[SSTI (Server Side Template Injection) - HackTrick](https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection)   按流程来判断，

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/a4a7ae07-ff93-435d-9911-ee01e1750aa2.png)

输入 ${7\*7}，没有报错，接着尝试{{7\*7}}，成功报错：

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/643fc142-5b33-4b78-84cc-a2edd6d406a1.png)

**TASK 6**

**What is the name of the BurpSuite tab used to encode text?** Decoder

**TASK 7**

**In order to send special characters in our payload in an HTTP request, we'll encode the payload. What type of encoding do we use?** URL

**TASK 8**

**When we use a payload from HackTricks to try to run system commands, we get an error back. What is "not defined" in the response error?** require

尝试{{7\*'7'}}，也成功报错，可以判断存在SSTI注入的可能

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/5a16f1ce-dd67-4a7d-a1dc-ae452812cd7d.png)

接下来就是直接使用handlebar模板的注入代码：[SSTI (Server Side Template Injection) - HackTricks](https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection#handlebars-nodejs) 

首先看能不能路径穿越，爆出error，失败了

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/6218a7f7-8b0c-4fa7-9cf7-12d3866df110.png)

那直接用提供的URLencoded:

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/235a4c19-8e40-45e5-88f6-cfddb5fcbaf1.png)

**TASK 9**

**What variable is the name of the top-level scope in Node.JS?** global

**TASK 10**

**By exploiting this vulnerability, we get command execution as the user that the webserver is running as. What is the name of that user?** root

require 是JavaScript的关键词，但这里却显示没有定义，可能和node.js的关键词冲突了，查了下[官方文档](https://nodejs.org/api/globals.html#global-objects) ，可以看出，require不是global范围的

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/e755a15c-4e62-49c7-bdb6-d6ce5b3cbab1.png)

我们先查看下注入的代码：`{{this.push "return **require**('child_process').exec('whoami');"}}`

代码里要调用的是`child_process`，查看[文档](https://nodejs.org/api/child_process.html) 可知，这个功能有用到process![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/559e6464-4843-4125-b518-6ca43052dda8.png)

我们来尝试看看能不能返回个process:

把上面那一行代码改为 `{{this.push "return process;"}}`,可以通过[URLencoded](https://www.urlencoder.io/) 工具，编码了重新发送，成功执行：

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/d095ed65-f343-43ff-96a8-895424cd74f4.png)

然后试了好几个process文档中的函数，貌似都没有可以执行特定命令的

不过注意到`process.mainModule`是快过期的一个函数，后续将会被require.main代替，可以试一试

使用`{{this.push "return **process.mainModule**;"}}`可以成功调用,　

直接注入：`{{this.push "return **process.mainModule**('child_process').exec('whoami');"}}`，并没有成功爆出

通过[文档](https://nodejs.org/api/child_process.html)可知，可以利用另一个`{{this.push "return process.mainModule('child_process').**execSync**('whoami');"}}`,成功执行：

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/c4fc6382-1c78-42d2-96ba-48ebdd2a3543.png)

接下来就简单了，正常flag是在主目录下，找下就ok啦

Note:

[Bike.pdf](/attachments/Bike.pdf)

Ref:

[Server-side template injection | Web Security Academy (portswigger.net)](https://portswigger.net/web-security/server-side-template-injection) 

The following is a list of important (but not limited) template engines for Node.js

- [Jade](https://github.com/jadejs/jade) 

- [Vash](https://github.com/kirbysayshi/vash) 

- [EJS](https://github.com/tj/ejs) 

- [Mustache](https://github.com/janl/mustache.js) 

- [Dust.js](https://github.com/linkedin/dustjs) 

- [Nunjucks](https://github.com/mozilla/nunjucks) 

- [Handlebars](https://github.com/wycats/handlebars.js) 

- [atpl](https://github.com/soywiz/atpl.js) 

- [haml](https://github.com/tj/haml.js) 

 