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

###创建表###



###插入数据###

