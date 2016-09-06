---
layout: post
title: "Spark DataFrame Operations"
date: 2016-09-06 17:47:00
categories: 
by: zj
description: some operations of spark dataframe
---

#### 过滤掉指定列为空值占位符的行

忽略大小写

```
// df is DataFrame instance
val NULL_VALUES = Set("-", "nan", "null", "none", "_", "", "na")

val nullValues = NULL_VALUES.mkString("'","','", "'")

val dfWithoutNull = df.filter(s"lower($columnName) not in ($nullValues)")
```

(未完待续)
