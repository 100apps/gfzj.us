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

#### Spark 1.6 递归读取给定目录下的所有csv文件

一开始使用databricks的spark-csv，load到的只能是目录下的所有文件，如果目录下有子目录，就会直接报错。现需要递归load给定目录下所有的文件（包括子目录下的文件）：

```
  private def createDataFrame(sqlContext: SQLContext,
                              dataPath: String,
                              delimiter: String
                             ): DataFrame = {
    val data: RDD[String] = getDataRDD(sqlContext.sparkContext, dataPath)

    val splitRDD = data.map(_.split(delimiter))

    generateDataFrame(sqlContext, splitRDD, length)
  }

  private def generateDataFrame(sqlContext: SQLContext, 
                                splitRDD: RDD[Array[String]], 
                                length: Int
                                ): DataFrame = {
    val fields = {
      for (index <- 0 until length) yield {
        StructField("C" + index, StringType, nullable = true)
      }
    }
    val schema = new StructType(fields.toArray)
    val rowRDD = splitRDD.map {
      record =>
        Row.fromSeq(record)
    }
    sqlContext.createDataFrame(rowRDD, schema)
  }

  private def getDataRDD(sparkContext: SparkContext, 
                         dataPath: String
                         ): RDD[String] = {
    val allFiles = listFiles(dataPath)
    val allRDDs = for (one <- allFiles) yield sparkContext.textFile(one)

    sparkContext.union(allRDDs)
  }
  
  private def listFiles(dataPath: String): List[String] {
	val conf = new Configuration()
	val fs = FileSystem.get(conf)
    val filePath = new Path(file)
    require(fs.exists(filePath), s"Data directory [$file] does not exists.")

    val allSubFiles = fs.listStatus(filePath)
    val allDataFiles = new ListBuffer[String]
    for (subFile <- allSubFiles) {
      if (subFile.isDirectory)
        allDataFiles ++= listFiles(subFile.getPath.toString)
      else
        allDataFiles += subFile.getPath.toString
    }
    allDataFiles.toList
  }

```

思路很简单，就是先递归读取文件内容，存为rdd，然后将rdd转化为dataframe。

#### DataFrame cast column type

假设给定一个DataFrame（df），其中有一列（C1）存储的是省份信息（如上海等），将该列转化为double（理论上来说应该报错），使用如下方式：

```
df.withColumn("C1",dfWithoutNullTargetColumn("C1").cast(DoubleType))
```

但是结果是该列全部变为null，并没有抛出异常说类型转换失败。仅记录一下该问题。可以先检查该列的类型再做转换。
