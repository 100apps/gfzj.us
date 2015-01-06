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

海量小文件对于Hadoop来说是一个灾难。如果不可避免的要使用Hadoop处理小文件，此处提供一些方案。

###Problems with small files and HDFS###

小文件是指那些文件大小比HDFS block size（默认64M）小很多的文件。每个小文件即使size很小，仍旧会占用一个block，不会多个小文件共用一个block。如果你在使用Hadoop时需要存储小文件，那么就意味着你可能有很多小文件，否则不会选择使用Hadoop。但是，问题就在于HDFS不能处理大量的文件。

HDFS中每一个文件、目录或是block在namenode的内存中都对应一个对象，每个对象占用150个字节，因此，一千万个小文件，每个占用一个block，那么namenode就要消耗大约2G的内存。如果有更多的小文件，意味着namenode需要消耗更多的内存，而现有的计算机硬件可能会难以满足相应需求，且会导致集群难以扩展。

另外，HDFS并不是为了有效地访问小文件而设计的：其初衷是为了流式访问大文件。如果访问大量小文件，需要执行大量的seeks操作，并需要不断地从一个datanode跳到另一个datanode，从而获取每个小文件，然而，上述每个操作都是低效的数据访问方式。

###Problems with small files and MapReduce###

Map tasks通常是以block为单位进行数据的处理。如果文件非常小且文件数量极大，那么每个map task处理的数据就非常少，且需要启动大量的map tasks，而记录每个map task信息（bookkeeping）也需要一定的开销。举个例子：一个是单独的1GB的文件，在HDFS中存储到16个64MB blocks；另一个是10000个100KB的小文件，大约共1GB。这10000个文件每个都用一个map task处理，那么处理这些文件所需的时间要比第一种情况慢上十倍甚至百倍。

Hadoop提供了一些方法用于减少bookkeeping带来的开销：设置mapred.job.reuse.jvm.num.tasks属性，允许一个JVM同时执行多个map tasks，以这种重用task JVM的方式减少启动多个JVM的开销；使用MultiFileInputSplit，每个map task可处理多个blocks数据。

###One Example###

一个非常典型的小文件案例就是存储海量图片，每个图片是一个单独的小文件，这种情况就需要使用一个容器把图片进行分组打包存储。

###HAR files###

为了缓解大量小文件带给namenode内存的压力，Hadoop 0.18.0引入了[Hadoop Archives][link2](HAR files)，其本质就是在HDFS之上构建一个分层文件系统。通过执行`hadoop archive`命令就可以创建一个HAR文件。在命令行下，用户可使用一个以`har://`开头的URL就可以访问HAR文件中的小文件。使用HAR files可以减少HDFS中的文件数量。

下图为HAR文件的文件结构，可以看出来访问一个指定的小文件需要访问两层索引文件才能获取小文件在HAR文件中的存储位置，因此，访问一个HAR文件的效率可能会比直接访问HDFS文件要低。对于一个MapReduce任务来说，如果使用HAR文件作为其输入，仍旧是其中每个小文件对应一个Map task，效率低下。所以，HAR files最好是用于文件归档。

![HAR File Layout][image1]

###Sequence Files###

除了HAR files，另一种可选是SequenceFile，其核心是以文件名为key、文件内容为value组织小文件。回到之前提到的10000个100KB大小的文件，你可以编写程序将这些文件放到一个SequenceFile文件，然后就以数据流的方式处理这些文件，也可以使用MapReduce进行处理。一个SequenceFile是可分割的，所以MapReduce可将文件切分成块，每一块独立操作。不像HARs，SequenceFile支持压缩。在大多数情况下，以block为单位进行压缩是最好的选择，因为一个block包含多条记录，压缩作用在block之上，比Record压缩方式（一条一条记录进行压缩）的压缩比高。

把已有的数据转存为SequenceFile比较慢。比起先写小文件，再将小文件写入SequenceFile，一个更好的选择是直接将数据写入一个SequenceFile文件，省去小文件作为中间媒介。

下图为SequenceFile的文件结构。HAR files可以列出所有keys，但是SequenceFile是做不到的，因此，在访问时，只能从文件头顺序访问。

![SequenceFile File Layout][image2]

###HBase###

HBase也可用于存储小文件，前提是文件真的很小。

###个人总结###

对于海量小文件，该如何处理：

1. 如果文件大小能保证在一个较小的范围内，使用HBase

2. 如果小文件的大小不能保证，考虑将文件直接写入HDFS，并在HBase中存储其实际地址

3. 如果小文件是每天都产生，那么可以考虑使用HAR files或者SequenceFile(或基于其的方式，如MapFile)，并将源文件删除。

**PS:**

bookkeeping是指在一个job的初始化阶段记录每个task的状态和进度。

[link1]:http://blog.cloudera.com/blog/2009/02/the-small-files-problem/ "The Small Files Problem"
[link2]:http://hadoop.apache.org/docs/r1.0.4/cn/hadoop_archives.html "Hadoop Archives"
[image1]:images/har.png "HAR File Layout"
[image2]:images/sequencefile.png "SequenceFile File Layout"