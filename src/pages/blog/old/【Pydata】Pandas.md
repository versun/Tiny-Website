---
layout: ../../../layouts/BlogPost.astro
title: "【Pydata】Pandas"
uuid: c63c402a-4897-11ed-bf7e-e64c03c09981
version: 2
created: Sun, 13 Jun 2021 14:36:28 +0000
tags:
- imported/evernote
---

import pandas as pd

p = pd.Series(data = \[1,2,3\], index = \['a',2,'c'\])\
p.values\
p.index\
p.shape\
p.size\
p.ndim\
p.iloc\[\[0,1\]\] #索引位置0和1的data\
p.loc\['eggs'\] #index标签为eggs的data\
p.loc\[\['eggs','milk'\]\]\
p\[\['eggs','milk'\]\]\
p.index\[0\]\
p.values\[0\]

nf = pd.Series(index = \['a','b','c'\],data = \[1,2,3\])\
nf + 2 每个值加2\
np.sqrt(nf)\
nf\['a'\] + 2\
nf\[\['a','b'\]\] + 2\
nf.iloc\[0\] + 2

nf\[nf > 40\]

p1 = p #引用\
p1 = pd.Series( data = p.values, index = p.index ) #复制副本

pdd = pd.DataFrame( dic ) ## dic = { 'A':p1,'B':p2 } p1和p2标签可以不一样，没有值的会显示NaN\
pdd = pd.DataFrame(pdic,columns=\['A'\])\
pdd = pd.DataFrame(pdic,index=\['a','b'\])\
pdd = pd.DataFrame(pdic,columns=\['A'\],index=\['a'\])

df = pd.DataFrame(data) ## data = {'Integers' : \[1,2,3\], 'Floats' : \[4.5, 8.2, 9.6\]} 标签默认为索引值（0，1，2...）\
df = pd.DataFrame(data,index=\['l1','l2','l3'\])\
store_items = pd.DataFrame(items2,index = \['store 1', 'store 2'\]) ## items2 = \[{'bikes': 20, 'pants': 30, 'watches': 35},

store_items\[\['bikes'\]\]\
store_items\[\['bikes', 'pants'\]\]\
store_items.loc\[\['store 1'\]\]\
store_items\['bikes'\]\['store 2'\] # dataframe\[column\]\[row\]\
store_items\['shirts'\] = \[15,2\]\
store_items\['suits'\] = store_items\['pants'\] + store_items\['shirts'\]\
store_items.head() # 前5行数据\
store_items.tail(10) # 最后10行数据\
store_items.isnull().any() #查看是否有任何NaN值

store_items = store_items.append(new_store)\
store_items\['new watches'\] = store_items\['watches'\]\[1:\]\
store_items.insert(4, 'shoes', \[8,5,0\]) # 插入新列 dataframe.insert(loc,label,data)

store_items.pop('new watches') # pop只能删除列\
store_items = store_items.drop(\['watches', 'shoes'\], axis = 1) # drop可以删除指定行和列，1删除列，0删除行\
store_items = store_items.drop(\['store 2', 'store 1'\], axis = 0) # 删除行 rows

store_items = store_items.rename(columns = {'bikes': 'hats'}) # 更改 列标签\
store_items = store_items.rename(index = {'store 3': 'last store'}) #更改 行标签\
store_items = store_items.set_index('pants') # DataFrame 中的某个列改为索引

store_items.count() # 非NaN的值的数量,返回一个 Pandas Series\
store_items.isnull() # NaN的数量，返回一个 Pandas Series

store_items.dropna(axis = 1) # 删除含有NaN值的列，非就地删除\
store_items.dropna(axis = 1, inplace = True) # 就地删除\
store_items.fillna(0) # 将NaN值设为0\
store_items.fillna(method = 'backfill', axis = 1) # 把NaN值替换它所在列的下个值，非就地（inplace）\
store_items.fillna(method = 'ffill', axis = 0) # 把NaN值替换它所在行的上个值，非就地（inplace）\
store_items.interpolate(method = 'linear', axis = 0) # 线性插值来替换NaN值

best_rated = book_ratings\[(book_ratings == 5).any(axis = 1)\]\['Book Title'\].values

store_items.describe()\
store_items\['watches'\].describe()\
store_items.mean()\
store_items.corr()

data = pd.read_csv('./fake_company.csv')\
data.groupby(\['Year'\])\['Salary'\].sum() ## 按年份对数据分组，然后使用 .sum() 方法将所有员工的薪资相加\
data.groupby(\['Year', 'Department'\])\['Salary'\].sum() ## 每年每个部门的薪资分配状况