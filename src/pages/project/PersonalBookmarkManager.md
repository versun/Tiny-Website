---
layout: ../../layouts/BlogPost.astro
title: Personal Bookmark Manager
uuid: 7d439054-63df-11ed-8694-aec53b9d6759
version: 895
created: Mon, 14 Nov 2022 05:45:00 +0000
tags:
- y-type/resource
- z-class/career/it
- x-status/publish/project
---

**Created: 2022-11-14**

**Status: In Progress**

## Idea

我原先一直使用的是[start.me](https://www.start.me/) 的书签管理，但网络访问一直不是很顺畅，加载的很慢，可能我的书签太多了吧，再加上最近一直弹窗广告。。。

所以就有了迁移的念头了，这几周试用过国内外不同的在线书签管理应用，但都没有一个能满足需求的

因此就萌生了这么个想法。

## Build

下面介绍下主要的几个开发重点，如需查看具体的开发过程(流水账)，请查看这里。

首先，在[Codepen](https://codepen.io/)上建个pen，方便实施查看，也不用本地搭建环境，在公司或者在家里都可以继续编程。

然后先用模板代码：

```
<!DOCTYPE html> 
<html lang="en"> 
  <head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"> 
    <title>My Bookmarks</title> 
  </head> 
  <body> 
    <header> 
      <nav> </nav> 
    </header> 
  <main> </main> 
  <footer> </footer> 
</body> 
</html>
```

是的，依旧使用[Bulma](https://bulma.io)的css框架， 真的很好用。

整体的UI设计参考[Linkding](https://demo.linkding.link)的，简洁直观，个人很喜欢它的风格

![](/images/7d439054-63df-11ed-8694-aec53b9d6759/7efe475d-5d1a-4bcb-83e4-83fb2b591701.png)

我的设计呢，很简单，单栏模式，所有的操作均在当前页面上完成，减少跳转，比如点击书签编辑按钮，直接浮现对话框来修改。

经过几天的调试，整体效果如下：

![](/images/7d439054-63df-11ed-8694-aec53b9d6759/e4edab9a-6c88-46b8-91ec-621239929e15.png)

发布第一版[代码](https://github.com/versun/Personal-Bookmark-Manager/commit/fa344eb12a196483a62b7ca2a08678dd7016e69a) ，并部署到Cloudflare的Pages上

接下来就是编写功能代码了，原先想直接使用Flask来搭建，毕竟用python真的很爽，但后来想了下，这个项目主要的目的是深入熟悉JavaScript和DOM，所以决定还是用纯js来实现。

考虑到数据存储，用SQLite最方便，但不知道cloudflare的Pages服务要怎么使用SQLite数据库。

搜索了下[官方文档](https://developers.cloudflare.com/pages/platform/functions/bindings/#d1-databases)，发现还真可以，使用[D1 databases](https://developers.cloudflare.com/d1/get-started/)即可实现，因为这个服务还是Alpha阶段，所以是免费的，看来还得做好备份。。

首先，创建个数据库

![](/images/7d439054-63df-11ed-8694-aec53b9d6759/9c4da506-e2c1-4c47-b6ad-61f672d74fe8.png)

然后还需要创建个worker来供pages去操作这个db

![](/images/7d439054-63df-11ed-8694-aec53b9d6759/51cf3525-06ca-46db-ab25-9999ba097c4c.png)

创建完以后，进入Pages，选择对应的网站名称，进入Settings下的Funstions设置

![](/images/7d439054-63df-11ed-8694-aec53b9d6759/b2e45599-895f-4efd-b79c-fb4bf0ad6ba9.png)

在Functions的下方，绑定刚刚创建的D1数据库

![](/images/7d439054-63df-11ed-8694-aec53b9d6759/b9aa6d43-eb98-4f91-890f-e28dc3e06730.png)

注意，Prodction和Preview都需要绑定，如下图

![](/images/7d439054-63df-11ed-8694-aec53b9d6759/0c27ceef-93bd-4cdc-9e1f-85179fa05341.png)

![](/images/7d439054-63df-11ed-8694-aec53b9d6759/2274d7ca-60a7-4b66-be3b-6f356cb5ee38.png)

接着绑定worker，同理，production和preview都要绑定，这里我使用同一个service和db，你也可以单独创建专用与preview的db和worker

![](/images/7d439054-63df-11ed-8694-aec53b9d6759/452e1401-9da0-4a89-9995-60dc6ea9e817.png)

由于要在本地操作db，所以本地需要安装wrangler:  `npm install -g wrangler`

然后登录cloudfalre `npx wrangler login`

登录成功后，使用默认配置来初始化: `npx wrangler init worker-bookmarks`

然后，修改`worker-bookmarks/wrangler.toml`配置文件：

![](/images/7d439054-63df-11ed-8694-aec53b9d6759/c191fad0-ad7c-4a05-840e-8c779de389ef.png)

本地创建个测试db: `npx wrangler d1 create d1_bookmarks`。

接着新建一个sql文件来新建table，关于字段类型，可查看[该文档](https://www.sqlite.org/datatype3.html) 

```
/*createTable.sql*/
DROP TABLE IF EXISTS main;
CREATE TABLE main (id INTEGER,title TEXT,url TEXT,tag TEXT,page INTEGER,description TEXT,note TEXT,PRIMARY KEY (`id`));
INSERT INTO main(id,title,url,tag,page,description,note) VALUES (1,'Google','https://www.google.com','#search',0,'This is a description','This is a note'),(2,'Google','https://www.google.com','#search #google',1,'This is a description','This is a note');
```

这里我创建了以下几个列：

id    text

title    text

url    text

tag    text

page    integer

description    text

note    text

对本地的db进行操作：`npx wrangler d1 execute d1_bookmarks --local  --file=./createTable.sql`

测试下：`npx wrangler d1 execute d1_bookmarks --local --command='SELECT \* FROM main'`

没问题后，就可以往云上的db进行操作

`npx wrangler d1 execute d1_bookmarks --file=./createTable.sql`

测试下：`npx wrangler d1 execute d1_bookmarks --command='SELECT \* FROM main'`

然后发布这个woker的设置：`npx wrangler publish`

由于我们在网页端已经创建了同名的worker，所以它会提示是否覆盖，选择y即可

![](/images/7d439054-63df-11ed-8694-aec53b9d6759/06b97607-2979-4592-8930-ef6f9c1a54cc.png)

接下来就是编写api，涉及到fetch函数，完全不懂。。。看下[MDN资料](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) ，同时参考官方的[demo](https://github.com/cloudflare/d1-northwind)，照猫画虎下就可以了：

```
/*worker-bookmarks/index.ts*/
export interface Env {
	DB:D1Database;
}

export default {
	async fetch(request: Request, env: Env) {
	  const url = new URL(request.url);
	  const q = url.searchParams.get('q');
	  const getByPage = env.DB.prepare("SELECT * FROM main WHERE page = ?");
	  const getById = env.DB.prepare("SELECT * FROM main WHERE id = ?");
	  const getByTag = env.DB.prepare("SELECT * FROM main WHERE tag LIKE ?");
	  const getBySearch = env.DB.prepare("SELECT * FROM main WHERE title LIKE ?1 OR tag LIKE ?1 OR description LIKE ?1 OR note LIKE ?1");
	  var results;
	  if(!q){return new Response("Call /api/id/q?=1");}

	  switch(url.pathname){
		case "/api/id":
			results = await (await getById.bind(q).all()).results;
			break;
		case "/api/page":
			results = await (await getByPage.bind(q).all()).results;
			break;
		case "/api/tag":
			results = await (await getByTag.bind(`%${q}%`).all()).results;
			break;
		case "/api/search":
			results = await (await getBySearch.bind(`%${q}%`).all()).results;
			break;
		default:
	  }

	  return results ? Response.json(results) : new Response("Call /api/id/q?=1");
	},
  };
```

打开本地server服务：`npx wrangler dev --local --persist`，测试正常

在找资料的时候，发现SQLite是有[rowid(oid)](https://www.sqlite.org/autoinc.html)的，也就是说，其实不用专门添加一个id的列来自动递增，而且添加的id列貌似检索起来没有自带的rowid快，所以把id列删除，重新建表

```
/*createTable.sql*/
DROP TABLE IF EXISTS main;
CREATE TABLE main (title TEXT,url TEXT,tag TEXT,page INTEGER,description TEXT,note TEXT);
INSERT INTO main(title,url,tag,page,description,note) VALUES ('Google','https://www.google.com','#search #google',0,'first description','first note'),('Baidu','https://www.baidu.com','#search #baidu',1,'second description','second note');
```

通过几天的摸索，基本完成了初步的API编写，具体的index.ts代码可[查看这里](https://github.com/versun/Personal-Bookmark-Manager/commit/8c55c28a42c43e77da33e9dcfd8b100aa7b90a9c#diff-733121cdf5237e992a0aff2489956b817faa59a8d6f9766bf0ab2ee65295dbab)，返回代码和测试代码还没有编写。。但影响不大，应该能用，以后有空了再写。。。

接下来，就是给网站添加js代码了，

首先需要自动获取url的meta信息，比如标题和描述，同样，需要使用cloudflare的worker，新建一个worker，这次直接在CLI中创建：`npx wrangler init getUrlMeta`

查看[官方文档](https://developers.cloudflare.com/workers/runtime-apis/request/)，可以使用API: request

### 2022-12-06

几天下来没有明显进展，获取meta信息的功能一直实现不出来，主要是底层的原理不是很懂，先放一边吧。。

先做导入书签的功能，尽快做出能用的最小版本，先上线用了再说。

## Conclusion

## References: