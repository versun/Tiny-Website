---
layout: ../../../layouts/BlogPost.astro
title: "【Pydata】Numpy"
uuid: c16f7b52-4897-11ed-b511-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:32:52 +0000
tags:
- imported/evernote
---

import numpy as np\
x = np.array(\[1,2,3\])\
x.dtype\
x.shape\
np.eye(N) # NxN单位矩阵,主对角线上全是 1\
np.diag(\[1,2,3,4\]) #对角矩阵,主对角线值为1，2，3，4\
np.zero((shape))\
np.ones((shape))\
np.full((shape),5)

np.arange(20)\
np.arange(start,stop) # \[start, stop) 内并均匀分布的值\
np.arange(start,stop,step) # \[start, stop) 内并均匀分布的值，step 表示两个相邻值之间的差\
np.linspace(start, stop, N) # N 个在闭区间 \[start, stop\] 内均匀分布的数\
np.linspace(0,50,10, endpoint=False)

np.reshape(x,(shape))\
np.arange(20).reshape(4, 5)\
np.random.random(shape) # \[0.0, 1.0) 内的随机浮点数\
np.random.randint(start, stop, size = shape) # 特定范围的随机数\
np.random.randint(4,15,size=(3,2))

np.delete(x, 0, axis=1)\
np.delete(x, \[0,4\], axis=1)\
np.append(Y, \[\[7,8,9\]\], axis=0)\
np.append(Y, \[\[9\],\[10\]\], axis=1)\
np.insert(ndarray, index, elements, axis)\
np.insert(Y,1,\[4,5,6\],axis=0)\
np.insert(Y,1,5, axis=1)

np.vstack((x,Y)) # 垂直堆叠\
np.hstack((x,Y)) # 水平堆叠

x\[:2,2:4\]\
x\[\[0,1\],2:4\]\
np.unique(x)\
X\[(X > 10) & (X < 17)\]\
X\[(X > 10) & (X < 17)\] = -1\
np.intersect1d(x,y) # both in x and y\
np.setdiff1d(x,y) # in x that are not in y\
np.union1d(x,y) # All

np.sort() # 非就地排序\
ndarray.sort() # 就地排序\
np.sort(X, axis = 0) # 按列排序

np.sqrt(x)\
x+y # 加运算，每个元素进行相加\
x-y\
x.min()\
x.max(axis=1)\
3 \* x # x的每个元素乘3