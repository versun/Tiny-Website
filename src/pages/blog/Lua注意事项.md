---
layout: ../../layouts/BlogPost.astro
title: Lua注意事项
uuid: bfd37ae6-4897-11ed-8fd9-f296579e3926
version: 3
created: Sun, 13 Jun 2021 14:38:28 +0000
tags:
- z-class/career/personal/it/tips
- y-type/archived
- x-status/publish/blog
---

1. 默认所有的变量均为全局变量，无论是函数内还是外，除非用local声明

1. 尽可能使用局部变量，因为访问局部变量的速度比全局变量更快

1. 除了”和‘，也可以用 2 个方括号 "\[\[\]\]" 来表示"一块"字符串

1. 使用 .. 来连接字符串

1. 使用 # 来计算字符串/table的长度，放在字符串前面：#“hi”

1. 在使用#table时，会按下标开始计算，遇到nil则停止，类似ipairs，所以，无序下标的table数量无法用#来计算。大部分table的函数都是如此，比如table.concat()也是。

1. 在 Lua 里表的默认初始索引一般以 1 开始

1. 遇到赋值语句Lua会先计算右边所有的值然后再执行赋值操作，所以我们可以这样进行交换变量的值：x,y=y,x

1. ipairs 仅仅遍历值，按照索引升序遍历，索引中断停止遍历。即不能返回 nil,只能返回数字 0，如果遇到 nil 则退出。它只能遍历到集合中出现的第一个不是整数的 key。

1. pairs 能遍历集合的所有元素。即 pairs 可以遍历集合中所有的 key，并且除了迭代器本身以及遍历表本身还可以返回 nil。