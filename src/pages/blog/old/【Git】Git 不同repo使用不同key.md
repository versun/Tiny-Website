---
layout: ../../../layouts/BlogPost.astro
title: "【Git】Git 不同repo使用不同key"
uuid: bd42794e-4897-11ed-af17-f296579e3926
version: 2
created: Sun, 13 Jun 2021 14:36:28 +0000
tags:
- imported/evernote
---

[github - How to manage one only key per each git repository? - Stack Overflow](https://stackoverflow.com/questions/22768517/how-to-manage-one-only-key-per-each-git-repository)

~/.ssh/config~\
`~Host github1~`\
~\`  HostName github.com  User git  IdentityFile~ /.ssh/id_repo1\`

`Host github2`\
\`  HostName github.com  User git  IdentityFile \~/.ssh/id_repo2\`

nstead of using [git@gihub.com](mailto:git@gihub.com):user/repo1, you would use:\
`git@github1:user/repo1`