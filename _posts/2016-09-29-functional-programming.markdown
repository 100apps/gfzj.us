---
layout: post
title: "函数式编程Tips"
date: 2016-09-29 15:22:11
categories: 
by: zj
description: functional programming
---

1. 函数：即对输入做相应变化，输出所需结果，使用函数名抽象表达“变化”。

2. 关注what，而非how：从A=>B的转换，而不关注A如何一步一步转换为B的。

如，现在写一个函数，将一个string list中的空字符串全部过滤掉，函数API为：

```
def filterEmptyString(list: List[String]): List[String]
```

用以前写java程序的模式来实现这个函数，有如下一段scala程序：

```
  def filterEmptyString(list: List[String]): List[String] = {
    val newList = collection.mutable.ListBuffer[String]()
    for (str <- list) {
      if (str.length != 0)
        newList.append(str)
    }

    newList.toList
  }

```

代码详细的表达了该怎么处理list中的每个string，这就是之前所说的how，现在，优化上述代码：

```
 def filterEmptyString(list: List[String]): List[String] = {
    list.filter(str => str.length != 0)
  }

```

简单告知，我只要非empty的string，简洁明了。