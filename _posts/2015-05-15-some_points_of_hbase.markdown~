---
layout: post
title: "HBase学习记录"
date: 2015-05-15 11:09:06
categories: hbase basics
by: zj
description: 记录一些hbase中的小点
---
##table schema设计##

1. column families（cf）数：越少越好。hbase中的flush和compaction操作基于region进行，若某个cf的数据较大，会频繁引起flush，其他cfs同时也要flush，但是其他cfs可能数据量较小；所以，若cf数很大，频繁flush，导致频繁compaction，最终导致很大且不必要的i/o开销。
2. rowkey设计：避免热点；salt，提高write的吞吐量，但是read开销增大；Hashing；Reversing the Key；row和column名的size尽量小，因为每个cell都有一个meta信息，由rowkey、column名组成，若太大，会造成hfile indexes占据大量内存；block size可以设置到一个较大的合理的值（理由？？？？）。
3. pre-splitting：合理预划分regions。


##表操作##

1. delete：非即时操作，仅将删除的数据标记为为“删除”（marker），对用户不可见，数据实际上并没有进行删除，只有在数据所在region发生major compaction时才会真正删除数据。
2. delete mask put：数据被mark为delete后，数据对应的所有cells对于用户来说都是不可见的。在T时插入一行A，在T+X时，删除该行，那么scan该行\[0, T+1)时间范围插入的数据，结果为空。另外，如果现在重新插入A行，使用的timestamp<T+X，那么仍旧是查不到这条新插入的数据。为解决上述问题，可 HColumnDescriptor.setKeepDeletedCells(true)以使deleted cells像普通的cell一样。这个[链接](http://comments.gmane.org/gmane.comp.java.hadoop.hbase.user/28421)是个不错的例子。

##背后的故事##

###create table###

client向master发出创建表的请求：

	hbase> create 'test','cf'

Master则干下面的活儿：

- 存储表的schema信息
- 根据key-splits信息创建regions，若是没有提供splits，则默认创建一个region
- 将regions分配给Region Servers，即写.META.表

具体流程如下所示：

![create_table][image1]

###write table###

在执行put、delete等写操作时，会发生如下：

- client会向zookeeper询问.META.在哪儿
- client遍历.META.，根据插入数据的rowkey，获取处理该数据的region server
- client向region server发出请求，执行相应操作
- region server处理请求，将其转给该rowkey所属的region进行处理
	- 写WAL
	- 添加k/v到MemStore

上述流程如下所示：

![write_table][image2]

###read table###

读取hbase表中的数据流程与write table一致：

- client会向zookeeper询问.META.在哪儿
- client遍历.META.，根据读取数据的rowkey，获取该数据所在的region server
- client向region server发出请求，获取数据
- region server处理请求，将其转给该rowkey所属的region进行处理
	- 从MemStore和Store Files中获取数据

###hbase index###

####HIndex####

在Server端实现index，在read/write时，处理索引元数据。

HIndex利用coprocessor（CP）实现。原表的索引元数据存储在HBase的另一张表中；原表在创建时，HMaster端CP创建索引表，表的删除也是如此；在写数据时，CP从写入原表的数据中取出data，从而创建meta data，写入索引表，数据的删除也是如此。

为了保证性能，原表的每个region与其对应的索引表region应该在同一个server上，所以索引表与原表有相同的region数和rowkey范围。原表region的split或者变动都会引起索引表相似的变化，也是通过CP实现。另外，无论原表对多少列建立索引，都只有一个索引表。

#####Write data with index

执行Put向原表插入数据时，从Put中获取信息以生成索引表数据。CP按照如下方式创建索引表rowkey：

	index table rowkey = region startkey + index name + indexed column(S) value(S) + origin table rowkey

以上方式能够使生成的索引表tall、narrow。若索引的列不只一列，则把多列对应的值追加写入index rowkey的indexed column(S) value(S)部分。

#####read data with index

对原表进行scan的话，CP会创建一个索引表的scanner，根据原表的indexed列信息，scanner能够从索引表中获取相应数据，该数据包含原表的rowkey信息，使用该信息就能获取原表相应的数据，即scan结果。



[image1]:/images/hbase_create_table.png "create_table"
[image2]:/images/write_table "write_table"
