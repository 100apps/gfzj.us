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

#### 将所有空值占位符全部转化为空字符串

```
val NULL_VALUES = Set("-", "nan", "null", "none", "_", "", "na")
val nullValues = NULL_VALUES.mkString("'", "','", "'")

val selectCondition = df.columns.map(x => s"(case when lower(trim($x)) in ($nullValues) then '' else trim($x) end) as $x").mkString(",")
val tableName = "table"
df.registerTempTable(tableName)

val dfWithZeroLengthStringAsNull = sqlContext.sql(s"select $selectCondition from $table")

(未完待续)
