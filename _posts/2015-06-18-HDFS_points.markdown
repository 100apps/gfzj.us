---
layout: post
title: "HDFS学习记录"
date: 2015-06-18 14:09:02
categories: 
by: zj
description: 关于HDFS安全模式和HA
---

#  ## HDFS安全模式

HDFS进入安全模式的原因一般包括如下几个：

1. 在HDFS启动时，有datanode启动失败
2. NameNode的磁盘已满
3. 强制关机，可能会引起block损坏和chcksum不一致

离开安全模式前一定要保证HDFS已经恢复正常。

#  ## HDFS HA

Hadoop2引入HA，用于解决NameNode单点故障问题。

元信息由fsimage + edit_logs组成，Hadoop1将二者均放置在一个节点，发生节点故障，HDFS就不能提供服务，直至恢复。Hadoop2中，有一个主NameNode和一个Standby NameNode，两者只存储fsimage，edit_logs则是存储在一个集群上，该集群中的节点称为journal node。

主NameNode和Standby NameNode两者的fsimage并不要求是一致的，但是二者和journal node上对应的edit logs可以构成相同的元数据信息。
