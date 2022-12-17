---
layout: ../../layouts/BlogPost.astro
title: Tiny Website v3
uuid: e079930a-768e-11ed-912d-9e6dd13ceda2
version: 510
created: Thu, 08 Dec 2022 00:25:52 +0000
tags:
- z-class/career/it
- y-type/resource
- x-status/publish/project
---

**Created: 2022-12-08**

**Status: Completed**

**目的**  优化笔记到博客的发布流程

**开发日志**

原先以为只是一个格式转换问题 (amplenote导出笔记 -> astro框架可用的markdown)

但在实施的过程中，发现问题没那么简单。。。

因此记录下整个过程。

首先介绍下原来的博客发布流程：

在amplenote撰写 -> 导出为md文件 -> 添加astro参数 -> astro build -> 预览 -> git push

更新后的流程：

在amplenote撰写 -> 定期导出全部md文件 -> 预览 -> git push

因此需要自动化脚本来添加astro的参数，还有astro的构建

同时，新建一个git repo，只push astro build后的dist下的文件，这样cloudflare pages就无需任何的构建设置。

这次页面的框架也会稍做修改，更方便后期维护。

### [自动化脚本](https://github.com/versun/Tiny-Website/blob/main/amplenote2astro.sh)

主要作用就是把amplenote导出的笔记格式化成astro可识别的md文件，然后把文件名中的非常规字符删除，最后就是astro build

```
#!/bin/bash
astro_path="/workspaces/Tiny-Website"
amplenote_path="/workspaces/Tiny-Website/notes"
astro_markdown_layout="layout: ../../layouts/BlogPost.astro"
publish_tags=(
  "x-status/publish/project"
  "x-status/publish/blog"
  "x-status/publish/writeup"
  "x-status/publish/read"
  "x-status/publish/weekly"
  "x-status/publish/misc"
  "x-status/publish/sketch" 
)
astro_pages_folder=(
  "project"
  "blog"
  "writeup"
  "read"
  "weekly"
  "misc"
  "sketch"
)
find  "$astro_path/src/" -name "*.md" -type f|xargs rm -v ;   #remove all current markdown file
rm -rf "$astro_path/public/images"
rm -rf "$astro_path/public/attachments"
#format filename
(cd $amplenote_path; rename -e "s/[\[\]{}\s]//g" *.md)

for file in $amplenote_path/*.md
do
  for index in "${!publish_tags[@]}"
  do
    if grep "${publish_tags[index]}" "$file"
    then
      #sed -i 's/\!\[\](images\//\!\[\](https:\/\/images.versun.me\/images\//g' "$file" #use R2 CDN
      sed -i 's/\!\[\](images\//\!\[\](\/images\//g' "$file"
      sed -i 's/\](attachments\//\](\/attachments\//g' "$file"
      sed -i '/^layout:/d' "$file"
      sed -i "1 a $astro_markdown_layout" "$file"
      mv "$file" "$astro_path/src/pages/${astro_pages_folder[index]}/" 
      break
    fi
  done
done

mv "$amplenote_path/images" "$astro_path/public/"
mv "$amplenote_path/attachments" "$astro_path/public/"
(cd $astro_path; npx astro build;)
(cd $astro_path/src/; date +"%Y/%m/%d" > lastUpdate.md)
```

### 框架修改

- 把所有内容放在[主页](https://github.com/versun/Tiny-Website/blob/main/src/pages/index.astro)上，方便浏览，不用跳来跳去

- 添加[PostList](https://github.com/versun/Tiny-Website/blob/main/src/layouts/PostList.astro)和[SubPage](https://github.com/versun/Tiny-Website/blob/main/src/layouts/SubPage.astro)布局文件，统一文章列表的显示，也方便后期修改

### Git repo整理

由于之前v1和v2都是单独的一个repo，由于都是同一个项目，没必要分开，所以这次趁着v3，全部整合到一起，

把v1和v2设置为分支(branch)，main分支保证最新，即目前的v3，以下是这次整理的相关命令，供参考

1. 首先把旧版本v1,v2, v3都clone下来，然后删除v1,v2里面的.git文件，防止和最终版v3的git记录冲突

1. 在v3的repo文件夹下(Tiny Website)，删除所有文件，除了.git

1. add并commit

```
git add .
git commit -m "prepare for new branch"
```

1. 新建branch v1和v2

```
git branch v1
git branch v2
```

1. 把旧版本的数据复制过来，并push到github上

```
git checkout v1
cp -r ../v1/* .
git add .
git commit -m "v1 initial commit"
git push origin v1

git checkout v2
cp -r ../v2/* .
git add .
git commit -m "v2 initial commit"
git push origin v2
```

1. 把最新版本的代码复制到main中，并push

```
git checkout main
cp -r ../v3/* .
git add .
git commit -m "v3 initial commit"
git push origin main
```

1. 完成

最后就是在Cloudflare的Pages服务下，把跟目录设置为dist文件夹(astro build后的文件夹)

![](/images/e079930a-768e-11ed-912d-9e6dd13ceda2/b09cb008-8fbb-4e1c-a812-b37b7cb42347.png) [^1]

当然，你也可以保持原来的构建设置，让cloudflare自动构建。

[^1]: Build configurations
    Specify build settings specific to your repository. DE Configuring builds
    Build command:
    Build output directory:
    Root directory:
    /dist
    Build comments on pull requests: Enabled

