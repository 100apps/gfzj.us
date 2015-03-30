---
layout: post
title: "Kerberized Hadoop系列(1)-Kerberized HDFS"
date: 2015-03-30 17:17:04
categories: series kerberized hadoop
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

将KDC server安装到node21，集群中所有的节点都要安装krb5-workstation，因为每个节点都是一个workstation，即kerberose的client。

安装KDC(在node21):

	#yum install krb5-server krb5-libs krb5-auth-dialog krb5-workstation  -y

在所有节点安装workstation:

	#yum install krb5-devel krb5-workstation -y

###配置###



###初始化###


###启动Kerberos###


##Java相关##
