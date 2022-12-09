---
layout: ../../layouts/BlogPost.astro
title: Linux 添加service服务文件
uuid: be4fe376-4897-11ed-9b7b-f296579e3926
version: 9
created: Sun, 13 Jun 2021 14:31:32 +0000
tags:
- y-type/archived
- z-class/career/personal/it/tips
- x-status/publish/blog
---

vim /lib/systemd/system/jupyter.service //这个目录不同发行版可能也不同

```
[Unit]
Description=jupyter
After=network.target
[Service]
Tpye=forking
EnvironmentFile=/usr/local/bin/jupyter-notebook
ExecStart=/usr/local/bin/jupyter-notebook
ExecStop=/usr/bin/pkill jupyter-notebook
KillMode=process
Restart=on-failure
RestartSec=30s
[Install]
WantedBy=multi-user.target
```

\
创建好之后再操作下就行了\
\# systemctl daemon-reload\
\# systemctl start jupyter\
\# systemctl enable jupyter