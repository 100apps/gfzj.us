---
layout: post
title: "Spark ML 数据预处理问题集合"
date: 2016-09-30 10:32:15
categories: 
by: zj
description: spark ml data preprocessing
---

#### SPARK ML VectorAssembler对input columns的要求

1. 该列类型如果是string、double等简单类型，则其schema的nullable必须为false；
2. 该列类型为vector，则无要求。

就是说训练模型使用的数据中的string、double等类型不允许有null值（即使你的数据中没有null，schema中每个属性的nullable也必须为false，真是呵呵了）

如果要把schema中所有列nullable改为false，代码如下：

    var newDF = df.sqlContext.createDataFrame(df.rdd, StructType(df.schema.map(_.copy(nullable = false))))
    
#### Spark, ML, StringIndexer: handling unseen labels

如果训练集中某一列值包含（红，黄，绿）三种，训练时使用了一个StringIndexer，将该列转化为数字；之后用同样的流程处理一个测试数据集，如果该列出现了“黑”，那么encoder不能识别这个新家伙，如果不做特殊处理，一般会报错。可以选择过滤掉这样不认识的列值所在行：

https://issues.apache.org/jira/browse/SPARK-8764

```
val categoryIndexerModel = new StringIndexer()
  .setInputCol("category")
  .setOutputCol("indexedCategory")
  .setHandleInvalid("skip") // new method.  values are "error" or "skip"
```

#### Spark, ML, OneHotEncoder处理的列中不能包含空字符串

假设有一列（列名为C2）数据中包含（安徽，河南，“”），先使用StringIndexer对该列进行简单的编码，生成新列indexedColumn，其metadata为{"ml_attr":{"vals":["河南","安徽",""],"type":"nominal","name":"C2"}}。在indexedColumn基础上进行one hot encoding，如下：

    val oneHotEncoder = new OneHotEncoder()
        .setInputCol(indexedColumn)
        .setOutputCol(encodedColumnName)
    oneHotEncoder.transform(dataframe)
    
执行上述代码会报错如下：

    java.lang.IllegalArgumentException: requirement failed: Cannot have an empty string for name.
    
就是说oneHotEncoder会使用原有的列值作为二值列的列名，该列名不能为空。那么，随便把空字符串换成其他字符串（如“none”），再做encode工作就可以了，encode完后得到的列属性（组合属性）：

    {"ml_attr":{"attrs":{"binary":[{"idx":0,"name":"河南"},{"idx":1,"name":"安徽"},{"idx":2,"name":"none"}]},"num_attrs":3}}
    