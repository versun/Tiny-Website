---
layout: ../../layouts/BlogPost.astro
title: Bulma CSS框架快速入门
uuid: eac9611a-5a68-11ed-b709-4aba79ab6e09
version: 373
created: Wed, 02 Nov 2022 04:43:37 +0000
tags:
- y-type/resource
- z-class/career/program/css
- x-status/publish/blog
---

**Status: 博文待更新**

由于我的博客并没有使用任何的框架，纯原生，所以css样式一直很混乱，

所以最近在考虑使用css框架，加个类名就能完成样式简直不要太爽。

在框架的选择上，我在tailwind、bootstrap、bulma之间徘徊了很久。

由于我更喜欢简洁纯粹的代码，所以先排除使用了javascript的bootstrap，

然后tailwind确实很好看，但是貌似功能太多，太多细节了，而且文档貌似整理的不是很好，不能很快的找到需要的信息，

因此最后选择了[Bulma](https://bulma.io/)，纯css实现，官网首页还着重标记了“**No CSS knowledge required**”，很适合我这种菜鸟。。

### <mark>开始使用</mark>

使用Bulma很简单，只要在html头加入一个link标签就可以导入使用了：

` <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">`

[官方文档](https://bulma.io/documentation/overview/start/)同时也建议使用HTML5格式 

`<!DOCTYPE html>`

同时，在head内加一个meta标签：

 `<meta name="viewport" content="width=device-width, initial-scale=1">`

### <mark>快速一览</mark>

可以看下官方的模板，真的很简洁直观：

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello Bulma!</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  </head>
  <body>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Hello World
      </h1>
      <p class="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
    </div>
  </section>
  </body>
</html>
```

### <mark>主要结构</mark>

首先介绍下Bulma建议的[结构框架](https://bulma.io/documentation/layout/)关系

- 一级(放在<body>内)

    - [navbar](Bulma%20CSS框架快速入门.md#____Navbar__) 

    - [hero](https://bulma.io/documentation/layout/hero/) 

    - [section](https://bulma.io/documentation/layout/section/) 

    - [footer](https://bulma.io/documentation/layout/footer/) 

- 二级(放在一级标签内)

    - [container](https://bulma.io/documentation/layout/container/) 

    - [tile](https://bulma.io/documentation/layout/tiles/) 

    - [media](https://bulma.io/documentation/layout/media-object/) 

    - [level](https://bulma.io/documentation/layout/level/) 

以上只是建议，老手随意组合哈，新手建议老老实实先按这个架构来组织页面，当然小改动还是可以的，比如互相嵌套。

我一般对于要全屏的页面会选用section，然后需要居中的模块使用container，然后二级标签，我都会放在container下。

### 导航栏：[<mark>Navbar</mark>﻿﻿](https://bulma.io/documentation/components/navbar/)

该类其实是一个组件，并不是一个Layout标签，但通常直接放在body头部。

架构如下：

- navbar ：整个导航栏的主容器

    - navbar-brand ：网站的标识，比如Logo或站名，会一直显示，不会隐藏

        - navbar-burger ：只在小屏上显示，比如手机上

    - navbar-menu ：导航栏下的内容/菜单容器

        - navbar-start / navbar-end ：start下的菜单显示在左边，end下的菜单显示在右边

            - navbar-item ：菜单类，即每个菜单都需包含该类

                - navbar-link ：

                - navbar-dropdown

                    - navbar-divider