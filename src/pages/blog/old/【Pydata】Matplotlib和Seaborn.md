---
layout: ../../../layouts/BlogPost.astro
title: "【Pydata】Matplotlib和Seaborn"
uuid: c153b3a4-4897-11ed-af17-f296579e3926
version: 2
created: Sun, 13 Jun 2021 14:40:39 +0000
tags:
- imported/evernote
---

[在线文档](https://seaborn.pydata.org/generated/seaborn.countplot.html)\
条形图 sb.countplot\
import seaborn as sb\
import matplotlib.pyplot as plt

base_color = sb.color_palette()\[0\]\
sb.countplot(data = df, x = 'cat_var', color = base_color)

cat_order = df\['cat_var'\].value_counts().index\
sb.countplot(data = df, x = 'cat_var', color = base_color, order = cat_order)\
plt.xticks(rotation = 90) 标签夹角度数

'''绘制比例条形图\
1\.算出比例最高的数值，用做X轴的最大值\
2\.创建X轴的比例尺和标签\
3\.顺序从大到小\
4\.创建条形图\
5\.利用plt修改条形图为比例图\
6\.加上‘propotion标签’\
'''\
all_points = pokemon.shape\[0\]\
max_c = pkmn_types\['type'\].value_counts().max()\
max_p = max_c/all_points

x_numbers = np.arange(0,max_p,0.02)\
x_label = \['{:0.2f}'.format(v) for v in x_numbers\]

type_order = pkmn_types\['type'\].value_counts().index\
sb.countplot(data=pkmn_types,y = 'type',color=base_color,order=type_order)\
plt.xticks(x_numbers\*all_points,x_label)\
plt.xlabel('proportion')\
饼状图 plt.pie\
sorted_counts = df\['cat_var'\].value_counts()\
plt.pie(sorted_counts, labels = sorted_counts.index, startangle = 90,\
counterclock = False) # 可添加wedgeprops = {'width' : 0.4} 变为环形图\
plt.axis('square') # 使 x 和 y 轴的刻度相等。不调用此函数的话，最终的图形可能看起来不像圆形\
直方图 plt.hist\
bin_edges = np.arange(0, df\['num_var'\].max()+1, 1)\
plt.hist(data = df, x = 'num_var', bins = bin_edges)\
并排排列\
plt.figure(figsize = \[10, 5\]) # larger figure size for subplots

# histogram on left, example of too-large bin size

plt.subplot(1, 2, 1) # 1 row, 2 cols, subplot 1\
bin_edges = np.arange(0, df\['num_var'\].max()+4, 4)\
plt.hist(data = df, x = 'num_var', bins = bin_edges)

# histogram on right, example of too-small bin size

plt.subplot(1, 2, 2) # 1 row, 2 cols, subplot 2\
bin_edges = np.arange(0, df\['num_var'\].max()+1/4, 1/4)\
plt.hist(data = df, x = 'num_var', bins = bin_edges)\
修改x轴坐标，放大局部数据\
plt.xlim(10,50)\
修改标尺为对数标尺（10，20，40，80）\
plt.xscale('log')\
标尺和变换\
print(np.log(pokemon\['weight'\].describe()))\
bins = 10 \*\* np.arange(-2.3,6.9+0.1,0.1)\
ticks = \[0.1,0.3,1,3,10,30,100,300,1000\]\
lables = \['{}'.format(v) for v in ticks\]\
plt.hist(data = pokemon,x = 'weight',bins = bins);\
plt.xscale('log');\
plt.xticks(ticks,lables);\
plt.xlim(0.1,1100)\
散点图 plt.scatter\
plt.scatter(data = df, x = 'num_var1', y = 'num_var2')

# Seaborn 的 regplot 函数会创建散点图并进行回归函数拟合：

sb.regplot(data = df, x = 'num_var1', y = 'num_var2')

# 添加透明度, alpha,0透明，1不透明

plt.scatter(data = df, x = 'disc_var1', y = 'disc_var2', alpha = 1/5)

# 添加抖动 x_jitter，y_jitter

sb.regplot(data = df, x = 'disc_var1', y = 'disc_var2', fit_reg = False,\
x_jitter = 0.2, y_jitter = 0.2, scatter_kws = {'alpha' : 1/3})\
热图 plt.hist2d\
plt.hist2d(data = df, x = 'disc_var1', y = 'disc_var2',\
bins = \[bins_x, bins_y\])\
plt.colorbar(); # 添加色条

# cmap选择调色板，cmin达到最低值才能绘制出来

plt.hist2d(data = df, x = 'disc_var1', y = 'disc_var2',\
bins = \[bins_x, bins_y\], cmap = 'viridis_r', cmin = 0.5)\
小提琴图 sb.violinplot\
sb.violinplot(data = df, x = 'cat_var', y = 'num_var')

base_color = sb.color_palette()\[0\]\
sb.violinplot(data = df, x = 'cat_var', y = 'num_var', color = base_color,\
inner = None)