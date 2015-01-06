---
layout: post
title: "Hadoop小文件问题[译]"
date: 2015-1-6 11:19:04
categories: series small-files
by: zj
description: Hadoop小文件问题及可用的解决方案
keywords: java
---
原文：[The Small Files Problem][link1]。本文非直译，有一些改变。

海量小文件对于Hadoop来说是一个灾难。
如果不可避免的要使用Hadoop处理小文件，此处提供一些方案。

###Problems with small files and HDFS###

小文件是指那些文件大小比HDFS block size（默认64M）小很多的文件。每个小文件即使size很小，
仍旧会占用一个block，不会多个小文件共用一个block。如果你在使用Hadoop
时需要存储小文件，那么就意味着你可能有很多小文件，否则不会选择使用Hadoop。但是，问题
就在于HDFS不能处理大量的文件。

HDFS中每一个文件、目录或是block在namenode的内存中都对应一个对象，每个对象占用150个
字节，因此，一千万个小文件，每个占用一个block，那么namenode就要消耗大约2G的内存。
如果有更多的小文件，意味着namenode需要消耗更多的内存，而现有的计算机硬件可能会
难以满足相应需求，且会导致集群难以扩展。

另外，HDFS并不是为了有效地访问小文件而设计的：其初衷是为了流式访问大文件。如果访问
大量小文件，需要执行大量的seeks操作，并需要不断地从一个datanode跳到另一个
datanode，从而获取每个小文件，然而，上述每个操作都是低效的数据访问方式。

###Problems with small files and MapReduce###

Map tasks通常是以block为单位进行数据的处理。如果文件非常小且文件数量极大，那么每个map
task处理的数据就非常少，且需要启动大量的map tasks，而记录每个map task信息（bookkeeping）也需要一定的开销。
举个例子：一个是单独的1GB的文件，在HDFS中存储到16个64MB blocks；另一个是10000个
100KB的小文件，大约共1GB。这10000个文件每个都用一个map task处理，那么处理这些文件所需的
时间要比第一种情况慢上十倍甚至百倍。

Hadoop提供了一些方法用于减少bookkeeping带来的开销：设置mapred.job.reuse.jvm.num.tasks
属性，允许一个JVM同时执行多个map tasks，以这种重用task JVM的方式减少启动多个JVM的开销；
使用MultiFileInputSplit，每个map task可处理多个blocks数据。

###One Example###

一个非常典型的小文件案例就是存储海量图片，每个图片是一个单独的小文件，这种情况就需要
使用一个容器把图片进行分组打包存储。

###HAR files###

[待续...]

PS:
>bookkeeping
>>bookkeeping是指在一个job的初始化阶段记录每个task的状态和进度。

[link1]:http://blog.cloudera.com/blog/2009/02/the-small-files-problem/ "The Small Files Problem"