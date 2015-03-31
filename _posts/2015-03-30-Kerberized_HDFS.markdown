---
layout: post
title: "Kerberized Hadoop系列(2)-Kerberized HDFS"
date: 2015-03-30 17:17:04
categories: series kerberized_hadoop
by: zj
keyword: kerberos,hdfs 
description: 配置HDFS的Kerberos
---

##集群配置##

Hadoop集群中有三个节点，/etc/hosts文件内容如下：

	168.16.1.21 node21
	168.16.1.22 node22
	168.16.1.23 node23

必须配置集群hosts。Namenode在节点node21上，Datanode在三个节点都有安装。

##安装Kerberos##

###安装###

将KDC server安装到node21，集群中所有的节点都要安装krb5-workstation，因为每个节点都是一个workstation，即kerberos的client。

安装KDC(在node21):

	#yum install krb5-server krb5-libs krb5-auth-dialog krb5-workstation  -y

在所有节点安装workstation:

	#yum install krb5-devel krb5-workstation -y

###配置###
我的realm名为HADOOP，在配置kerberos时使用。

#####配置KDC#####

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

[logging]是配置日志目录；配置默认realm为HADOOP；[realms]则是配置每个realm的kdc和admin_server所在节点，此处只有HADOOP的信息，如果有多个realms，可直接追加即可。在admin_server所在节点，如果用户有root权限，就可以直接执行命令kadmin.local，进入kerberos，执行一系列操作。

修改/var/kerberos/krb5kdc/kdc.conf，内容如下：



###初始化###


###启动Kerberos###


##Java相关##
