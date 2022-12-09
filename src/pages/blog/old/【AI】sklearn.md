---
layout: ../../../layouts/BlogPost.astro
title: "【AI】sklearn"
uuid: bbf4c6aa-4897-11ed-9b7b-f296579e3926
version: 2
created: Sun, 13 Jun 2021 14:35:59 +0000
tags:
- imported/evernote
---

# 训练模型

逻辑回归\
from sklearn.linear_model import LogisticRegression\
classifier = LogisticRegression()\
classifier.fit(X,y)\
神经网络\
from sklearn.neural_network import MLPClassifier\
classifier = MLPClassifier()\
classifier.fit(X,y)\
决策树\
from sklearn.neural_network import DecisionTreeClassifier\
classifier = DecisionTreeClassifier()\
classifier.fit(X,y)\
支持向量机\
from sklearn.neural_network import SVC\
classifier = SVC()\
classifier.fit(X,y)

# 评估指标

from sklearn.linear_model import LinearRegression\
classifier = LinearRegression()\
classifier.fit(X,y)\
guesses = classifier.predict(x)\
平均绝对误差\
from sklearn.metrics import mean_absolute_error\
error = mean_absolute_error(y,guesses)\
均方误差\
from sklearn.metrics import mean_squared_error\
error = mean_squared_error(y,guesses)\
R2\
from sklearn.metrics import r2_score\
y_true = \[1,2,4\]\
y_pred = \[1.3,2.5,3.7\]\
r2_score(y_true,y_pred)

# 模型选择

K 折交叉验证\
from sklearn.model_selection import KFold\
kf = KFold( 12,3,shuffle = True ) shuffle随机开关\
网络搜索 GridSearchCV\
from sklearn.model_selection import GridSearchCV\
parameters = {'kernel':\['poly', 'rbf'\],'C':\[0.1, 1, 10\]}

from sklearn.metrics import make_scorer\
from sklearn.metrics import f1_score\
scorer = make_scorer(f1_score)

# Create the object.

grid_obj = GridSearchCV(clf, parameters, scoring=scorer)\
\# Fit the data\
grid_fit = grid_obj.fit(X, y)

best_clf = grid_fit.best_estimator_\
数据分割和重排\
from sklearn.model_selection import train_test_split\
X_train, X_test, y_train, y_test = train_test_split(features, prices, test_size=0.2, random_state=55)