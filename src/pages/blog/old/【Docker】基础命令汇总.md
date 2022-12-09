---
layout: ../../../layouts/BlogPost.astro
title: "【Docker】基础命令汇总"
uuid: bcfa0506-4897-11ed-a53e-e64c03c09981
version: 3
created: Sun, 13 Jun 2021 14:23:13 +0000
tags:
- imported/evernote
---

- docker run ubuntu:latest /bin/echo "Hello World!"

- docker run -i -t ubuntu:latest /bin/bash

    - t: 在新容器内指定一个伪终端或终端。

    - i: 允许你对容器内的标准输入 (STDIN) 进行交互。

- docker ps\
查看正在运行的容器

- docker logs \[容器名称或者ID\]\
查看容器的标准输出

- docker stop 容器ID/名称

- docker run -d -p 5000:5000 training/webapp python [app.py](http://app.py/) 

    - d: 让容器在后台运行。

    - p: 将容器内部使用的5000端口映射到我们使用的主机的5000端口上。

- docker port 容器ID

- docker top

- docker inspect 容器ID

    - 查看 Docker容器 的底层信息