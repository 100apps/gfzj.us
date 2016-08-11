---
layout: post
title: "Kerberized Hadoop系列(3)-Kerberized ZooKeeper"
date: 2015-04-17 15:37:57
categories: series kerberized_hadoop
by: zj
keyword: kerberos,zookeeper 
description: 配置ZooKeeper的Kerberos
---

集群配置和Kerberos安装配置如[Kerberized_HDFS][link1].Zookeeper的Kerberos配置过程如下所示。

#  #Kerberos parts##

#  ##添加principals###

在KDC上创建ZooKeeper principals，并随机生成密钥：

{% highlight java %}

#   kadmin.local
addprinc -randkey zookeeper/node21@HADOOP
addprinc -randkey zookeeper/node22@HADOOP
addprinc -randkey zookeeper/node23@HADOOP
listprincs

{% endhighlight %}

#  ##生成keytab文件###

为集群中每个节点生成相应的zookeeper.keytab文件。

创建名为/tmp/zookeeper_keytabs的目录，在该目录下执行：

{% highlight java %}

#   kadmin.local 
ktadd -k zookeeper_21.keytab zookeeper/node21@HADOOP
ktadd -k zookeeper_22.keytab zookeeper/node22@HADOOP
ktadd -k zookeeper_23.keytab zookeeper/node23@HADOOP

{% endhighlight %}

#  ##部署keytab文件###

将每个keytab文件拷贝到相应的节点的/etc下，并重命名为zookeeper.keytab：

	# scp zookeeper_21.keytab root@node21:/etc/zookeeper.keytab
	# scp zookeeper_22.keytab root@node22:/etc/zookeeper.keytab
	# scp zookeeper_23.keytab root@node23:/etc/zookeeper.keytab

在每个节点上将keytab文件的owner改为zookeeper:hadoop，权限改为400:

	# chown zookeeper:hadoop /etc/zookeeper.keytab; chmod 400 /etc/zookeeper.keytab

#  #ZooKeeper Part##

#  ##修改zoo.cfg###

在node21上修改配置文件/ZOOKEEPER_CONF/zoo.cfg(ZOOKEEPER_CONF为ZooKeeper的配置文件路径)，添加：

	authProvider.1=org.apache.zookeeper.server.auth.SASLAuthenticationProvider
	jaasLoginRenew=3600000

将上述修改同步到ZooKeeper集群的其他节点。

#  ##创建JAAS文件###

在/ZOOKEEPER_CONF/创建JAAS（Java Authentication and Authorization Service）配置文件，内容如下（每个节点的principal不同，以node21为例）：

{% highlight java %}

Server {
  com.sun.security.auth.module.Krb5LoginModule required
  useKeyTab=true
  keyTab="/etc/zookeeper.keytab"
  storeKey=true
  useTicketCache=false
  principal="zookeeper/node21@HADOOP";
};

{% endhighlight %}

节点node22，node23也要创建JAAS文件。

#  ##创建java.env文件###

在/ZOOKEEPER_CONF/创建java.env，添加如下内容：

	export JVMFLAGS="-Djava.security.auth.login.config=/ZOOKEEPER_CONF/jaas.conf"

记得将ZOOKEEPER_CONF替换为实际的配置文件所在目录的路径。

#  ##重启集群###

在集群中的每个节点上，执行如下（以node21为例）：

	# kinit -k -t /etc/zookeeper.keytab zookeeper/node21@HADOOP
	# klist                 //查看ticket信息
	# service zookeeper-server restart 

[link1]: http://www.gfzj.us/series/kerberized_hadoop/2015/03/31/Kerberized_HDFS.html "Kerberized_HDFS"
