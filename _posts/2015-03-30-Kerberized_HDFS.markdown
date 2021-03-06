---
layout: post
title: "Kerberized Hadoop系列(2)-Kerberized HDFS"
date: 2015-03-30 17:17:04
categories: series kerberized_hadoop
by: zj
keyword: kerberos,hdfs 
description: 配置HDFS的Kerberos
---

#  #集群配置##

Hadoop集群中有三个节点，/etc/hosts文件内容如下：

	168.16.1.21 node21
	168.16.1.22 node22
	168.16.1.23 node23

必须配置集群hosts。Namenode在节点node21上，Datanode在三个节点都有安装。

#  #安装Kerberos##

#  ##安装###

将KDC server安装到node21，集群中所有的节点都要安装krb5-workstation，因为每个节点都是一个workstation，即kerberos的client。

安装KDC(在node21):

	#yum install krb5-server krb5-libs krb5-auth-dialog krb5-workstation  -y

在所有节点安装workstation:

	#yum install krb5-devel krb5-workstation -y

#  ##配置###
我的realm名为HADOOP，在配置kerberos时使用。

#  ###配置KDC####

在node21上修改文件/etc/krb5.conf，内容如下：

{% highlight java %}
[logging]
	default = FILE:/var/log/krb5libs.log
	kdc = FILE:/var/log/krb5kdc.log
	admin_server = FILE:/var/log/kadmind.log

[libdefaults]
	default_realm = HADOOP
	dns_lookup_realm = false
	dns_lookup_kdc = false
	ticket_lifetime = 24h
	renew_lifetime = 7d
	forwardable = true
	allow_weak_crypto = true
	default_tkt_enctypes = rc4-hmac
	default_tgs_enctypes = rc4-hmac

[realms]
	HADOOP = {
		kdc = node21
		admin_server = node21
	}
{% endhighlight %}

[logging]是配置日志文件路径；配置默认realm为HADOOP；[realms]则是配置每个realm的kdc和admin_server所在节点，此处只有HADOOP的信息，如果有多个realms，可直接追加即可。在admin_server所在节点，如果管理员有root权限，就可以直接执行命令kadmin.local，进入kerberos shell，执行一系列操作，如添加principal等。

修改/var/kerberos/krb5kdc/kdc.conf，内容如下：
	
{% highlight java %}
[kdcdefaults]
	kdc_ports = 88
	kdc_tcp_ports = 88

[realms]
	HADOOP = {
		kadmind_port = 749
		#master_key_type = aes256-cts
		acl_file = /var/kerberos/krb5kdc/kadm5.acl
		dict_file = /usr/share/dict/words
		admin_keytab = /var/kerberos/krb5kdc/kadm5.keytab
		supported_enctypes = aes256-cts:normal aes128-cts:normal des3hmac-sha1:normal arcfour-hmac:normal des-hmac-sha1:normal des-cbc-md5:normal des-cbc-crc:normal
	}
{% endhighlight %}
上述是对realm进行详细配置，如访问控制列表（ACL）文件路径，支持的加密方式等。

修改ACL文件内容，即/var/kerberos/krb5kdc/kadm5.acl，内容如下：

	*/admin@HADOOP	*	

之前提到过可以在admin_server所在节点以root身份直接进入kerberos shell进行admin操作，但是，并不是所有的管理员都具有root权限，所以配置ACL文件，给予格式为*/admin@HADOOP的principals管理权限，即使不在admin_server节点，也能够远程登录KDC执行授权的admin操作。

#  ###配置workstation####

将在KDC server配置的文件/etc/krb5.conf 拷贝到集群中所有的workstations即可。
	
(省去node21，因为已有）

	# scp /etc/krb5.conf node22:/etc/krb5.conf
	# scp /etc/krb5.conf node23:/etc/krb5.conf

#  ##初始化###

为realm HADOOP创建相应的数据库，在node21上执行命令

	# kdb5_util -P 123456 -r HADOOP create -s

该命令默认创建一个名为principal的数据库，当然也可以指定要创建的数据库名，使用-d。如果遇到数据库已经存在的情况，直接删除掉 /var/kerberos/krb5kdc/下与数据库名相关的文件。

#  ##启动Kerberos###

在node21上执行如下命令启动kerberos服务：

	# chkconfig --level 35 krb5kdc on
	# chkconfig --level 35 kadmin on
	# service krb5kdc start
	# service kadmin start


#  ##创建管理员###

管理kerberose，可以使用kadmin.local或kadmin。如果有访问 kdc 服务器的 root 权限，但是没有 kerberos admin 账户，使用 kadmin.local。如果没有访问 kdc 服务器的 root 权限，但是用 kerberos admin 账户，使用 kadmin。

创建远程管理的管理员，在node21上执行命令：

	# kadmin.local -q "addprinc root/admin@HADOOP"

手动输入两次密码即可。

#  ##Java相关###

在配置kdc.conf时，支持的加密方式有AES-256，对于使用 centos5. 6及以上的系统，默认使用 AES-256 来加密的，java默认不支持，需换jar包。到oracle官网下载相应版本的JCE jar（点击下载[java7 JCE](http://www.oracle.com/technetwork/java/embedded/embedded-se/downloads/jce-7-download-432124.html "java7 JCE")），解压zip文件后，将jar文件拷贝到目录$JAVA_HOME/jre/lib/security。

#  #配置Kerberized HDFS##

主要分为两个部分：在KDC为HDFS添加相关信息，如principal；修改HDFS配置文件，启用安全模式，并设置kerberos相关信息。

#  ##Kerberos端的工作###

#  ###创建HDFS principals####

NameNode 和 DataNode 是通过用户hdfs启动的，故为集群中每个服务器节点添加hdfs的principal；另外为每个节点添加HTTP的principal。

在KDC (即node21)上创建hdfs principle，并随机生成密钥

	#kadmin.local
	addprinc -randkey hdfs/node21@HADOOP
	addprinc -randkey hdfs/node22@HADOOP
	addprinc -randkey hdfs/node23@HADOOP


创建HTTP principle：

	addprinc -randkey hdfs/node21@HADOOP
	addprinc -randkey hdfs/node22@HADOOP
	addprinc -randkey hdfs/node23@HADOOP


#  ###生成keytab文件####

每个节点上只存储自己对应的principals的keytab文件。 keytab文件名必须是生成principals对应的服务名称，如果你为 HDFS 生成一个 keytab文件，则文件名必须为 hdfs.keytab 。

创建一个名为/tmp/hdfs_keytabs 的目录。
在该目录下，执行

	# kadmin.local 
	ktadd -k hdfs_21.keytab hdfs/node21@HADOOP
	ktadd -k hdfs_21.keytab HTTP/node21@HADOOP
	ktadd -k hdfs_22.keytab hdfs/node22@HADOOP
	ktadd -k hdfs_22.keytab HTTP/node22@HADOOP
	ktadd -k hdfs_23.keytab hdfs/node23@HADOOP
	ktadd -k hdfs_23.keytab HTTP/node23@HADOOP

生成的keytab文件就在 /tmp/hdfs_keytabs下。

#  ###部署keytab文件####

将每个keytab文件拷贝到相应的节点的/etc下，并命名为hdfs.keytab文件：

	# scp hdfs_21.keytab root@node21:/etc/hdfs.keytab
	# scp hdfs_22.keytab root@node22:/etc/hdfs.keytab
	# scp hdfs_23.keytab root@node23:/etc/hdfs.keytab
	
keytab文件内容敏感，在每个节点上将其owner改为hdfs:hadoop，权限改为400:

	# chown hdfs:hadoop /etc/hdfs.keytab; chmod 400 /etc/hdfs.keytab

#  ##HDFS端的工作###

停掉集群。

#  ###启动安全模式####

修改集群中所有节点的core-site.xml，添加如下内容：

{% highlight xml %}
<property>
    <name>hadoop.security.authentication</name>
    <value>kerberos</value>
</property>
<property>
  <name>hadoop.security.authorization</name>
  <value>true</value>
</property>
{% endhighlight %}


#  ###配置hdfs-site.xml####

分别为NameNode、JounalNode、Secondary NameNode、DataNode等配置principal及其keytab文件的路径。

为NameNode添加安全配置：

{% highlight xml %}
  <property>
    <name>dfs.namenode.keytab.file</name>
    <value>/etc/hdfs.keytab</value>
  </property>
  <property>
    <name>dfs.namenode.kerberos.principal</name>
    <value>hdfs/_HOST@HADOOP</value>
  </property>
  <property>
    <name>dfs.namenode.kerberos.internal.spnego.principal</name>
    <value>HTTP/_HOST@HADOOP</value>
  </property>
  <property>
    <name>dfs.journalnode.keytab.file</name>
    <value>/etc/hdfs.keytab</value>
  </property>
  <property>
    <name>dfs.journalnode.kerberos.principal</name>
    <value>hdfs/_HOST@HADOOP</value>
  </property>
  <property>
    <name>dfs.journalnode.kerberos.internal.spnego.principal</name>
    <value>HTTP/_HOST@HADOOP</value>
  </property>
{% endhighlight %}

_HOST会在HDFS启动登录KDC时替换为hostname。在以上配置中看到，对jounalnode进行了配置，这样的话，就要求此时Zookeeper已经配置了Kerberos，同时不需要再配置secondary namenode了，但是如果需要配置secondary namenode，就再添加如下内容：

{% highlight xml %}
  <property>
    <name>dfs.secondary.namenode.keytab.file</name>
    <value>/etc/hdfs.keytab</value> 
  </property>
  <property>
    <name>dfs.secondary.namenode.kerberos.principal</name>
    <value>hdfs/_HOST@HADOOP</value>
  </property>
  <property>
    <name>dfs.secondary.namenode.kerberos.internal.spnego.principal</name>
    <value>HTTP/_HOST@HADOOP</value>
  </property>
{% endhighlight %}

为DataNode进行安全配置：

{% highlight xml %}
<property>
    <name>dfs.datanode.data.dir.perm</name>   <!--该属性原文件已有，此处修改-->
    <value>700</value>
  </property>
  <property>
    <name>dfs.datanode.keytab.file</name>
    <value>/etc/hdfs.keytab</value> 
  </property>
  <property>
    <name>dfs.datanode.kerberos.principal</name>
    <value>hdfs/_HOST@HADOOP</value>
  </property>
  <property>
    <name>dfs.web.authentication.kerberos.principal</name>
    <value>HTTP/_HOST@HADOOP</value>
  </property>
  <property>
    <name>dfs.web.authentication.kerberos.keytab</name>
    <value>/etc/hdfs.keytab</value>
  </property>
 <property>
    <name>dfs.datanode.address</name>      <!--该属性原文件已有，此处修改-->
    <value>0.0.0.0:1002</value>
  </property>
  <property>
    <name>dfs.datanode.http.address</name>    <!--该属性原文件已有，此处修改-->
    <value>0.0.0.0:1004</value>
  </property>
{% endhighlight %}

dfs.datanode.address表示 data transceiver RPC server 所绑定的 hostname 或 IP 地址，如果开启 security，端口号必须小于 1024(privileged port)，否则的话启动 datanode 时候会报 Cannot start secure cluster without privileged resources 错误。

#  ###启动集群####

重启已经停掉的集群

#  ####启动NameNode#####

在node21上启动，启动前先获取所需要的ticket，即用户hdfs的principal hdfs/node21@HADOOP的TGT： 

	# kinit -k -t /etc/hdfs.keytab hdfs/node21@HADOOP
	# klist                 //查看ticket信息
	# service hadoop-hdfs-namenode start     //启动NameNode
	# service hadoop-hdfs-namenode status    //看一下是否启动成功。

#  ####启动DataNode#####

启动node21 DataNode：

       # service hadoop-hdfs-datanode start

启动node22 DataNode（在node22）：

       # kinit -k -t /etc/hdfs.keytab hdfs/node22@HADOOP

       # service hadoop-hdfs-datanode start

node23 DataNode的启动如node22一样.

#  ##测试###

执行：
	# klist

查看当前是否有Ticket，因为之前在每个节点上都执行了kinit，所以应该是有的。但是，一个HDFS用户一般是没有hdfs principal的Ticket的，所以默认应该是没有Ticket的，执行：

	# kdestroy

清空一下cache。

在cache中没有任何Ticket的情况下执行：

	# hdfs dfs -ls /

报错：会报出错误No valid credentials provided (Mechanism level: Failed to find any Kerberos tgt)]，就是说，当前用户没有通过认证，无法访问HDFS。

所以现在为当前用户添加一个principal，在node21上：

	# kadmin.local
	kadmin.local:  addprinc test@HADOOP        //会要求输入密码，输入即可，记住此密码
	kadmin.local:  exit
	# kinit test@HADOOP
	# hdfs dfs -ls /          //成功
