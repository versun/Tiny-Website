---
layout: ../../layouts/BlogPost.astro
title: Migadu邮箱服务的使用配置
uuid: 0579ae20-609a-11ed-8694-aec53b9d6759
version: 639
created: Thu, 10 Nov 2022 01:50:13 GMT
tags: [ "y-type/resource", "z-class/career/it/mail-hosting", "x-status/closed/published" ]
---

在个人域名的邮箱服务商的选择上，看似很多其实好用的不多，

比如国内的阿里云腾讯网易等，国外的gmail，zoho，mail还有各大域名注册商也有提供，

但用了一圈下来，没有一个能同时满足隐私性，自定义性，国内网络易用，费用低，稳定的要求。

所以后来我一直使用的是icloud和cloudflare的邮件路由功能，cloudflare确实很强大且稳定还免费，但唯一缺点就是无法用收件的地址发信，虽然发的不多，但硌得慌。

直到我找到了[Migadu](https://www.migadu.com/) ，他们的宣发真是太低调了，直到最近我才发现到它。

同时，也很心水他们的网页设计和创办理念，收费方式是根据使用量而不是功能，简直是一股清流，二话不说果断转移。

官网也放出了[优缺点](https://www.migadu.com/procon/)供参考。

<mark>价格:</mark>

不同档位的区别主要就是收发邮件的数量限制，域名子域名设置都不限制，14天免费试用，还有[网页端](https://webmail.migadu.com)可用。

最低档一天可以收200封发20封，同时官方允许25%的超量，对于个人来说，这个量完全够用。

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/ec576f5f-6c24-42bd-89b6-ac31d322230a.png)

在注册后，首先要修改些信息，保证账户安全

1. <mark>开启两步验证和恢复用的邮箱</mark>

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/d7f363ac-0e4d-43d2-9c76-846e88ea6b29.png)

由于我在注册后，就把登录邮箱改为了设置的域名邮箱，所以为了防止未来Migadu的服务器出现问题，无法登录收发邮件重置密码的情况，所以恢复用的邮箱设置为第三方服务的邮箱，比如谷歌或者微软的邮箱。

2. <mark>增加通知邮箱，理由同上</mark>

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/9e7e94e2-ca72-4360-baeb-77e5ab78b133.png)

3. <mark>添加域名</mark>

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/d0fd4c3c-d3b2-402a-8ecd-5e9e14d94796.png)

不建议使用Migadu的Nameservers，这不是它们的主业，建议使用cloudflare

4. <mark>添加DNS解析记录</mark>

在点击Add Email Domain后，会跳到DNS设置页面(**DNS Setup Instructions**)，需要添加的记录巨多，建议使用BIND zone records来批量添加

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/cd16ac2e-bf3e-4d29-a9a5-03a63b886ee8.png)

复制所有的记录到txt文档中，然后在cloudflare的DNS管理页面，使用导入功能

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/46db6342-322e-46b7-b057-78e9fa4ba446.png)

导入完成后，稍等1分钟左右，回到Migadu点击检查按钮

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/fc387ee2-5aab-4a2f-94fe-1bd9746150e4.png)

检查通过的话，该按钮会消失，可以点击Overview查看状态

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/c8a7228b-7a85-4588-82a5-b164be6839a5.png)

如果有问题的话，可以点击Diagnostics来查看具体哪些记录没有生效

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/20918349-aa83-4e9f-8833-1411589639d9.png)

5. <mark>添加邮箱</mark>

点击New Mailbox就可以按需添加邮箱，

个人建议添加一个即可，然后在Address Aliases或者Pattern Rewrites来设置不同前缀的邮箱，方便一个邮箱收发多个地址，

建议使用Pattern Rewrites设置，会方便很多

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/f9b5e8a2-347b-4332-b713-5180f3f3daef.png)

6. <mark>设置Pattern Rewrites (模式重写?)</mark>

该功能是我主要使用的，对于保护个人隐私非常有用，

比如不同网站，如果都是同一个邮箱注册的话，若其中一家网站被拖库(数据泄露)，则黑客就可以用该邮箱在不同的网站上尝试撞库，当然你也可以使用密码管理器来设置不同密码，但是，该功能还可以防止大数据通过同一个邮箱来得到你的个人画像。

所以，使用不同邮箱地址来注册账户，就相对解决了以上问题，为什么说相对呢，如果还想进一步保护个人隐私，可以查看 **这里**。

配置可参考如下图，设置的功能是，所有发送到signup-开头的邮箱地址，均发到me@versun.me的邮箱里，

比如signup-amazon@versun.me和signup-google@versun.me，对外界来说是2个不同的邮箱，但实际上都是发送到me@versun.me里面去，

这样就能实现不同的注册邮箱地址，一个邮箱接收。 

接下来就是设置可以从不同的邮箱地址发送邮件

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/94398b83-9ed6-4262-8f70-ed84e6145f78.png)

7. <mark>设置Wildcard Sender (通配符发件人)</mark>

这个的作用，就是允许不同的邮箱前缀通过versun.me这个域名来发送邮件，就不用单独为一个账户创建一个邮箱。

比如我可以使用signup-amazon@versun.me这个邮箱来回复邮件, 当然邮件客户端上也要添加该别名

![](https://images.amplenote.com/0579ae20-609a-11ed-8694-aec53b9d6759/d3a957d4-22f6-40f0-8f00-e62f5555cfe7.png)

8. <mark>邮件客户端添加邮箱别名</mark>

这里以我用的Canary为例，在Settings下，点击要添加别名的主邮箱，然后在Aliases里面添加别名即可: signup-amazon@versun.me

之后发送邮件时，就可以选择该邮箱地址为发件人。

以上就是我个人使用Migadu的一些主要配置，如有疑问，欢迎留言。