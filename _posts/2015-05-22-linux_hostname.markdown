---
layout: post
title: "一直都弄不懂的hostname"
date: 2015-05-22 11:05:09
categories: 
by: zj
description: 关于/etc/hosts和/etc/sysconfig/network
---

#  #/etc/hosts

hosts文件是一个本地DNS服务，比如我们用浏览器直接访问www.baidu.com的时候，浏览器最终会吧www.baidu.com转化为ip:80的形式和服务器建立socket连接。这个域名到ip的转换就是域名解析。域名解析要用到DNS，但是操作系统还有一个优先级最高的NDS服务，那就是hosts文件，如果域名在hosts文件中有记录，那就不用请求DNS服务器了。在＊nix系的操作系统中，hosts文件在/etc/hosts，windows中在c:/windows/system32/drives/etc/hosts。

举个例子，比如在hosts文件中添加一条：

	173.194.14.51 www.baidu.com

重启浏览器（清空浏览器DNS缓存），那么再打开www.baidu.com，就跳到Google去了。这是因为hosts文件「截胡」了正常的外部DNS服务器解析。

hosts文件有几个妙用：

#  ###1. 别名

假设现在有一个集群，有三个节点，对应IP为：

	168.16.3.11
	168.16.3.12
	168.16.3.13

从168.16.3.11登录到168.16.3.12，在终端输入`ssh root@168.16.3.12`。一般情况下，人对于数字的记忆总不及具有意义的单词或者词组，所以，给每个节点一个有一定意义的名字还是有必要的。现在修改168.16.3.11的/etc/hosts，内容包括如下：

	168.16.3.11 node1
	168.16.3.12 node2
	168.16.3.13 node3

那么从168.16.3.11登录到168.16.3.12，在终端输入`ssh root@node2`即可，该命令执行时，会读取/etc/hosts文件，找到"node2"对应的IP地址，使用该IP地址执行ssh命令。可见，/etc/hosts就是用于本地域名解析。

#  ###2. 翻墙

国家防火墙通过DNS污染来封杀网站，比如我们正常请求www.google.com的ip，被返回一个不正确的ip，这样就不能访问Google了。但是如果在hosts里面添加一条：

	173.194.14.51 www.google.com

这时候google又可以正常打开了。那么其他被封的域名呢？可以通过类似于[smarthosts](https://code.google.com/p/smarthosts/)、[smartladder](https://code.google.com/p/smartladder/)之类的「云hosts」解决

#  ###3. 防毒

比如有些钓鱼欺诈类的网站，我们知道他们的域名，这是可以「手动污染」他们，比如

	0.0.0.0 www.ccb-1.com.cn

这样当我们被引导打开www.ccb-1.com.cn的时候，根本就打不开。同样我们也可以使用「云hosts」[ MWSL-hosts](http://www.mwsl.org.cn/)来更新。


#  #/etc/sysconfig/network

这个文件本身是一个网络配置文件，有几个可选项（可以[参考文档](https://www.centos.org/docs/5/html/5.2/Deployment_Guide/s2-sysconfig-network.html)）：

	NETWORK=yes/no	 //表示网络是否被配置
	HOSTNAME=hostname	 //表示服务器的主机名
	GATEWAY=gw-ip	//表示网络网关的ip地址
	FORWARD_IPV4=yes/no	 //是否开启ip转发功能
	GATEWAYDEV=gw-dev gw-dw	 //表示网关的设备名称，如eth0等等
	NISDOMAIN=dom-name	 //表示NIS域

操作系统通过这个文件来配置网络。修改这个文件如果想生效，需要重启机器。
