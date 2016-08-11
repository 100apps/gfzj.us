---
layout: post
title: "HBase使用小记(2)--部署HBase服务器端代码"
date: 2014-07-15 16:33:55
categories: series hbase
by: zj
keyword: HBase,部署
description: 如何部署编写的HBase服务器端代码，如自定义的Comparator
---
之前介绍过对于HBase 0.96，如何自定义Comparator。那么定义Comparator后，如何部署自定义的Comparator，能够在执行HBase查询时可以使用该Comparator。

这里介绍两种方法来部署HBase服务器端代码。

当然，首先将代码打包，假设为MyComparator.jar。

#  #第一种方法##

将MyComparator.jar拷贝到HBase集群中每个服务器下的$HBASE_HOME/lib目录下，并
重启HBase集群。

#  #第二种方法##

将MyComparator.jar放在HBase集群中每个服务器下的指定路径（每个服务器都相同），然后修改hbase-env.sh中变量HBASE_CLASSPATH的
值，添加MyComparator.jar的路径，将该修改拷贝到集群中所有的服务器上，并重启HBase集群。

例如：

	export HBASE_CUSTOMCODE=/home/jzhou/hbase-0.96.0-hadoop1/lib/CustomCode
	export HBASE_CLASSPATH=$HBASE_CUSTOMCODE/MyComparator.jar

**总结**：上述两种方式有同一个地方需要注意，就是修改后都要重启HBase集群，否则修改无效。
