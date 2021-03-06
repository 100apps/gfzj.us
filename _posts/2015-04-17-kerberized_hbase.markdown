---
layout: post
title: "Kerberized Hadoop系列(4)-Kerberized HBase"
date: 2015-04-17 16:12:13
categories: series kerberized_hadoop
by: zj
keyword: kerberos,hbase 
description: 配置HBase的Kerberos
---

集群配置和Kerberos安装配置如[Kerberized_HDFS][link1].HBase的Kerberos配置过程如下所示。

#  #Kerberos parts##

#  ##添加principals###

在KDC上创建HBase principals，并随机生成密钥：

{% highlight java %}

#   kadmin.local
addprinc -randkey hbase/node21@HADOOP
addprinc -randkey hbase/node22@HADOOP
addprinc -randkey hbase/node23@HADOOP
listprincs

{% endhighlight %}

#  ##生成keytab文件###

为集群中每个节点生成相应的hbase.keytab文件。

创建名为/tmp/hbase_keytabs的目录，在该目录下执行：

{% highlight java %}

#   kadmin.local 
ktadd -k hbase_21.keytab hbase/node21@HADOOP
ktadd -k hbase_22.keytab hbase/node22@HADOOP
ktadd -k hbase_23.keytab hbase/node23@HADOOP

{% endhighlight %}

#  ##部署keytab文件###

将每个keytab文件拷贝到相应的节点的/etc下，并重命名为hbase.keytab：

	# scp hbase_21.keytab root@node21:/etc/hbase.keytab
	# scp hbase_22.keytab root@node22:/etc/hbase.keytab
	# scp hbase_23.keytab root@node23:/etc/hbase.keytab

在每个节点上将keytab文件的owner改为hbase:hadoop，权限改为400:

	# chown hbase:hadoop /etc/hbase.keytab; chmod 400 /etc/hbase.keytab

#  #HBase Part##

#  ##修改hbase-site.xml###

在HBase的配置目录下修改hbase-site.xml，具体修改如下：

#  ###启动HBase认证####

添加：

{% highlight java %}
<property>
    <name>hbase.security.authentication</name>
    <value>kerberos</value>
  </property>
  <property>
    <name>hbase.rpc.engine</name>
    <value>org.apache.hadoop.hbase.ipc.SecureRpcEngine</value>
  </property>
{% endhighlight %}

#  ###启动HBase授权####

HBase 授权是建立在Coprocessors框架之上的，尤其是AccessController Coprocessor。在hbase-site.xml添加：

{% highlight java %}
<property>
    <name>hbase.security.authorization</name>
    <value>true</value>
  </property>
 <property>
    <name>hbase.coprocessor.master.classes</name>
    <value>org.apache.hadoop.hbase.master.ThemisMasterObserver,org.apache.hadoop.hbase.security.access.AccessController</value>
  </property>
  <property>
    <name>hbase.coprocessor.region.classes</name>
    <value>org.apache.hadoop.hbase.themis.cp.ThemisServiceImpl,org.apache.hadoop.hbase.themis.cp.ThemisScanObserver,org.apache.hadoop.hbase.regionserver.ThemisRegionObserver,org.apache.hadoop.hbase.secondaryindex.coprocessor.Indexer,org.apache.hadoop.hbase.security.access.AccessController,org.apache.hadoop.hbase.security.token.TokenProvider</value>
  </property>
{% endhighlight %}

#  ###配置principal####

{% highlight java %}
<property>
    <name>hbase.regionserver.kerberos.principal</name>
    <value>hbase/_HOST@HADOOP</value>
  </property>
  <property>
    <name>hbase.regionserver.keytab.file</name>
    <value>/etc/hbase.keytab</value>
  </property>
  <property>
    <name>hbase.master.kerberos.principal</name>
    <value>hbase/_HOST@HADOOP</value>
  </property>
  <property>
    <name>hbase.master.keytab.file</name>
    <value>/etc/hbase.keytab</value>
  </property>
  <property>
    <name>hbase.thrift.kerberos.principal</name>
    <value>hbase/_HOST@HADOOP</value>
  </property>
 <property>
    <name>hbase.thrift.kerberos.principal</name>
    <value>hbase/_HOST@HADOOP</value>
  </property>
  <property>
    <name>hbase.thrift.keytab.file</name>
    <value>/etc/hbase.keytab</value>
  </property>
{% endhighlight %}

将修改好的hbase-site.xml拷贝到集群所有的机器上。

#  ##配置hbase认证一个Secure Zookeeper###

配置HBase JVMs（所有的masters、region servers、clients）使用JAAS（Java Authentication and Authorization Service）。

#  ###zk-jaas.conf####

在HBase的配置目录下创建文件zk-jaas.conf，内容如下：

{% highlight java %}

Client {

com.sun.security.auth.module.Krb5LoginModule required

useKeyTab=true

useTicketCache=false

keyTab="/etc/hbase.keytab"

principal="hbase/node21@HADOOP";

};

{% endhighlight %}

#  ###修改hbase-env.sh####

在hbase的配置目录下，修改hbase-env.sh，添加如下内容：

	export HBASE_OPTS="$HBASE_OPTS -Djava.security.auth.login.config=$HBASE_HOME/conf/zk-jaas.conf"
	export HBASE_MANAGES_ZK=false

#  ###修改zoo.cfg####

在zookeeper的配置目录下，修改zoo.cfg，添加如下：

	kerberos.removeHostFromPrincipal=true
	kerberos.removeRealmFromPrincipal=true

集群所有节点进行上述修改。

重启Zookeeper、Hyperbase，启动成功，则配置成功。

#  #授权管理##

HBase是通过ACL对clients进行授权管理的。

对于一个用户，如zj（已是认证用户，对应principal为zj@HADOOP），在未对其授权之前，zj使用hbase shell：

	hbase(main):001:0> create 'student','grade','course'

报错ERROR: org.apache.hadoop.hbase.security.AccessDeniedException: Insufficient permissions for user 'zj' (global, action=CREATE)

也就是说，zj没有权限创建表，需要hbase的superuser对zj进行授权。

用户hbase就是所谓的superuser，以hbase用户身份使用hbase shell，授权用户zj权限RWC（read、write、create）：

	# kinit -k -t /etc/hbase.keytab hbase/tw-node130@TDH
	hbase(main):001:0> grant 'zj', 'RWC'

再重新以test身份使用hbase shell:

	# kinit zj@TDH
	# hbase shell
	hbase(main):001:0> create 'student','grade','course'

成功。

hbase权限管理详见链接

	http://archive.cloudera.com/cdh5/cdh/5/hbase/book/hbase.accesscontrol.configuration.html

