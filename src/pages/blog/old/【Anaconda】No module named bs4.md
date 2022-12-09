---
layout: ../../../layouts/BlogPost.astro
title: "【Anaconda】No module named 'bs4'"
uuid: bc8a6a02-4897-11ed-b511-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:39:37 +0000
tags:
- imported/evernote
---

之前使用：conda install beautifulsoup4\
确认已经安装了正确的beautifulsoup4，对应py3版本\
在Ipython下也能正常import\
但是在jupyter-notebook下无法找到该模块\
**解决方法：**\
使用以下命令，查询当前的Kernel是否对应正确的路径\
import sys print(sys.path)\
我的环境正好是这个问题，所以重新运行命令，把环境导入到jupyter-notebook即可\
conda activate my_env #改为你的环境名\
conda install -y ipython jupyter ipykernel jupyter_nbextensions_configurator jupyter_contrib_nbextensions\
jupyter contrib nbextension install --user\
jupyter nbextensions_configurator enable --user\
python -m ipykernel install --user --name my_env\
完成