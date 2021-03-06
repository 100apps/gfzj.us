---
layout: post
title: "HBase学习记录"
date: 2015-05-15 11:09:06
categories: hbase basics
by: zj
description: 记录一些hbase中的小点
---
#  #table schema设计##

1. column families（cf）数：越少越好。hbase中的flush和compaction操作基于region进行，若某个cf的数据较大，会频繁引起flush，其他cfs同时也要flush，但是其他cfs可能数据量较小；所以，若cf数很大，频繁flush，导致频繁compaction，最终导致很大且不必要的i/o开销。
2. rowkey设计：避免热点；salt，提高write的吞吐量，但是read开销增大；Hashing；Reversing the Key；row和column名的size尽量小，因为每个cell都有一个meta信息，由rowkey、column名组成，若太大，会造成hfile indexes占据大量内存；block size可以设置到一个较大的合理的值（理由？？？？）。
3. pre-splitting：合理预划分regions。


#  #表操作##

1. delete：非即时操作，仅将删除的数据标记为为“删除”（marker），对用户不可见，数据实际上并没有进行删除，只有在数据所在region发生major compaction时才会真正删除数据。
2. delete mask put：数据被mark为delete后，数据对应的所有cells对于用户来说都是不可见的。在T时插入一行A，在T+X时，删除该行，那么scan该行\[0, T+1)时间范围插入的数据，结果为空。另外，如果现在重新插入A行，使用的timestamp<T+X，那么仍旧是查不到这条新插入的数据。为解决上述问题，可 HColumnDescriptor.setKeepDeletedCells(true)以使deleted cells像普通的cell一样。这个[链接](http://comments.gmane.org/gmane.comp.java.hadoop.hbase.user/28421)是个不错的例子。
3. disable：如果disable一个表test，hbase client发出该请求，zookeeper会将释放test上的lock（region server在之前拥有test的lock），HMaster则会获取test的lock，之后其组件AssignmentManager执行diable test的操作（即将test的所有regions在zookeeper上存储的状态从open改为close），使得test的所有regions都被offline，完成test的disable。（该过程为猜测，不确定，待修改）

#  #背后的故事##

#  ##create table###

client向master发出创建表的请求：

	hbase> create 'test','cf'

Master则干下面的活儿：

- 存储表的schema信息
- 根据key-splits信息创建regions，若是没有提供splits，则默认创建一个region
- 将regions分配给Region Servers，即写.META.表

具体流程如下所示：

![create_table][image1]

#  ##write table###

在执行put、delete等写操作时，会发生如下：

- client会向zookeeper询问.META.在哪儿
- client遍历.META.，根据插入数据的rowkey，获取处理该数据的region server
- client向region server发出请求，执行相应操作
- region server处理请求，将其转给该rowkey所属的region进行处理
	- 写WAL
	- 添加k/v到MemStore

上述流程如下所示：

![write_table][image2]

#  ##read table###

读取hbase表中的数据流程与write table一致：

- client会向zookeeper询问.META.在哪儿
- client遍历.META.，根据读取数据的rowkey，获取该数据所在的region server
- client向region server发出请求，获取数据
- region server处理请求，将其转给该rowkey所属的region进行处理
	- 从MemStore和Store Files中获取数据


#  ##HIndex###

在Server端实现index，在read/write时，处理索引元数据。

HIndex利用coprocessor（CP）实现。原表的索引元数据存储在HBase的另一张表中；原表在创建时，HMaster端CP创建索引表，表的删除也是如此；在写数据时，CP从写入原表的数据中取出data，从而创建meta data，写入索引表，数据的删除也是如此。

为了保证性能，原表的每个region与其对应的索引表region应该在同一个server上，所以索引表与原表有相同的region数和rowkey范围。原表region的split或者变动都会引起索引表相似的变化，也是通过CP实现。另外，无论原表对多少列建立索引，都只有一个索引表。

#  ###Write data with index

执行Put向原表插入数据时，从Put中获取信息以生成索引表数据。CP按照如下方式创建索引表rowkey：

	index table rowkey = region startkey + index name + indexed column(S) value(S) + origin table rowkey

以上方式能够使生成的索引表tall、narrow。若索引的列不只一列，则把多列对应的值追加写入index rowkey的indexed column(S) value(S)部分。

#  ###read data with index

对原表进行scan的话，CP会创建一个索引表的scanner，根据原表的indexed列信息，scanner能够从索引表中获取相应数据，该数据包含原表的rowkey信息，使用该信息就能获取原表相应的数据，即scan结果。

#  ##GlobalIndex

HIndex本质上是local index，即region级别的索引。GlobalIndex则是table级别的索引，不限制原表region与对应索引表region在同一server上，这样的话，用户请求可能需要多出一次RPC。

#  ##HBase flush strategy

HBase关于flush memstore，到底是如何操作呢？

flush策略包括region级别和列族级别两种。

Region级别的flush策略，只要当前memstore的size超过hbase.hregion.memstore.flush.size就会执行flush操作。当然，在一个真实的集群中，一个region server上是有多个表的多个regions的，所以很难有足够的内存让memstore增长到配置的flush size。HBase默认是预留40%的堆内存（hbase.regionserver.global.memstore.upperLimit）给所有表的所有regions的memstore，如果达到该阈值，则某些memstores会开始进行flushing直到内存使用率下降到35%以下（下限）。另一种情况就是，如果一个列族用于存储lob（large object），那么flush频率就会很高，导致其他列族flush出大量的小文件，这并不是什么好的事情。所以，引入列族级别的flush策略。

启用列族级别的flush策略，配置hbase.hregion.memstore.percolumnfamilyflush.enabled为true，开启此项后需要配合hbase.hregion.memstore.percolumnfamilyflush.flush.size设置flush阈值，该值是对所有的列族都生效的，并不是那么实用，最好根据实际情况修改列族的meta信息，设置合理的flushsize（当然，该值肯定是小于hbase.hregion.memstore.flush.size的值的）。

单独为一个列族设置flushsize，有两种方式：

1. hbase shell：`alter 'tableA',{NAME=>'cf1',METADATA=>{'flushsize'=>'67108864'}}`

2. API：

	HColumnDescriptor cf1 = new HColumnDescriptor("cf1");
	cf1.setValue(HConstants.HREGION_MEMSTORE_SPECIAL_COLUMN_FAMILY_FLUSHSIZE_KEY, 1024 * 1024 * 64 + ""); 

关于flush更为详细的内容，有个很好的链接，[press here][link1]。

#  ##Catalog Tables

在hbase 0.96 之前的版本中，hbase catalog包括-ROOT-和.META.两个表，但是在0.96以及之后的hbase版本中，-ROOT-表被废弃，只有hbase:meta（即.META.）。HBase的meta信息存储在表hbase:meta中，该表也是一个hbase表，但是在habase shell下执行list命令时，会将该表过滤掉。

在hbase:meta中，存储着所有regions的信息，且该表的位置记录在zookeeper中，而无需-ROOT-。该表的表结构描述如下：

1. Key：([table_name],[region_start_key],[region_id])
2. Values：

{% highlight java %}

info:regioninfo (region的HRegionInfo实例序列化信息)
info:server (region所属的RegionServer对应的server:port)
info:serverstartcode (region所属的RegionServer进程启动时间)

{% endhighlight %}

当一个表发生splitting，会为splitted region在meta表对应的row添加两列，即info:splitA和info:splitB，当成功split后，该row被删除，同时会有两个新的regions添加到meta表中。

#  ##HBase Client

HBase 1.1.0之前的版本使用HTable与hbase集群进行交互，HTable实例不是线程安全的，同一时刻仅能有一个线程使用HTable实例。另外，如果创建多个HTable实例，建议使用同一个HBaseConfiguration实例，以共享Zookeeper和与regionserver建立的socket实例。

#  ##RegionServer Splitting

RegionServer收到写请求时，将数据存放在memstore中，当memstore数据达到指定阈值时，就会被写入磁盘，生成storefiles，该过程就是memestore flush。随着storefiles数量的增加，RegionServer会将这些文件合并为更大的storefiles，以减少文件数量。每次flush后，对应region中的数据量就会增加，RegionServer此时会根据split策略决定是否需要将这个region分裂。

逻辑上来说，一个region分裂为两个，就是从自己的数据中找到一个合适的point，在此处分裂为两个region。当一个region分裂时，创建两个子regions，这两个regions并不会立即将父region中属于自己的数据拷贝过来，而是创建引用文件(reference files，类似于软链接)，指向父region的对应数据范围。当有新的数据写入时，子region的数据量也会增长，并发生合并操作，此时才真正从父region那里获取数据，并删除引用文件，就此，子region不再有引用文件，那么就能够在以后执行split操作了。

在split过程中，RegionServer需要与多方协调。在split前后，RegionServer都需要与Master报告，以更新.META.表，保证clients能够访问子regions，同时，调整HDFS中的目录结构和数据文件。另外，对于split这种多任务过程，RegionServer在内存中维护一个日志，保留执行状态，以防发生错误需要回滚。Split的详细过程描述如下图所示：

![split-process][image3]

上图每一个步骤描述如下：

1. RegionServer决定split region，并做相应的准备工作。首先，RegionServer获取region所属的表的共享读琐，以防在split过程中有人修改表的schema。然后，RegionServer在zookeeper创建一个znode，即/hbase/region-in-transition/region-name，并将其状态设置为splitting。
2. Master监控zookeeper的/hbase/region-in-transition，所以会获悉/hbase/region-in-transition/region-name的存在。
3. RegionServer在父region的HDFS目录下创建子目录.splits
4. RegionServer关闭父region，在本地将其标记为offline。如果此时有client请求该region中的数据，会收到NotServingRegionException。
5. RegionServer为子regions A和B在.splits目录下创建相应的目录和必要的数据结构，然后为父region中的storefiles创建相应的引用文件。
6. RegionServer为A和B在HDFS创建实际的region目录，与父region的目录在同一目录下，并将第5步中创建的引用文件拿过来。
7. RegionServer发送一个Put请求到.META.表中，将父region设置为offline，并添加子region信息。此时，每个子region在.META.表中并没有相应的记录。
8. RegionServer打开A和B。
9. RegionServer将A和B两个子regions信息加入.META.表，处于online状态，能够为clients提供服务。
10. RegionServer修改zookeeper的/hbase/region-in-transition/region-name状态为split，Master获悉后，能够做一些负载均衡的事情。
11. 关于A和B的引用文件会在region发生合并时被删除，引用的数据也会转移到A和B下的相应文件中。


 

[image1]:/images/hbase_create_table.png "create_table"
[image2]:/images/write_table.png "write_table"
[image3]:/images/split_process.png "split region process"
[link1]:http://tech.uc.cn/?p=56 "flush"
