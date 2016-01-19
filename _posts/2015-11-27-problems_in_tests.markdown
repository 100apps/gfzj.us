---
layout: post
title: "工作中遇到的问题记录"
date: 2015-11-27 10:04:36
categories: 
by: zj
description: 问题记录
---

1. 脚本除了注释是必须的，还有什么是必需的？

我这两天在迁移别人整理的测试cases，在调用这些cases中的脚本时，经常会报错说找不到数据文件。查看脚本发现，脚本使用与其在同一目录下的数据文件，且脚本只能在当前目录执行，可是，实际上，我并不是在当前目录执行脚本，而是在这个case本身所在的目录调用脚本，所以，就在脚本的开始加入了以下两句：

	basedir=`dirname $0`
	cd $basedir

2. timestamp数据类型带来的疑惑

有一个测试case，测试jdbc sql执行，准备的标准结果集中timestamp对应的列是到秒级的，如2008-03-18 06:46:48，但是case执行结果中的timestamp查询结果是2008-03-18 06:46:48.0，多出“.0”。经过检查发现，这个case是通过调用jdbc进行查询，查到的timestamp类型为java.sql.Timestamp，它的toString方法是会带 .0。

3. 关于mysql权限的问题

在使用jdbc连接mysql时，执行如下创建connection：

	DriverManager.getConnection(url, USERNAME, PASSWORD)

总是报错

	`java.sql.SQLException: Access denied for user ''@'X.X.X.X'`

其中 X.X.X.X 为程序所在机器的IP地址。很显然，是权限问题，但是用户名和密码并没有错。在mysql server所在节点登录mysql，执行如下语句：

{% highlight java %}

mysql> use mysql;
mysql> SELECT host, user FROM user;
+------------+----------+
| host       | user     |
+------------+----------+
| %          | aaa      |
| 127.0.0.1  | root     |
| localhost  | root     |
+------------+----------+

{% endhighlight %}

就是说我使用的root帐号，只能从mysql server所在的节点登录，因为匹配的host只有 127.0.0.1 和 localhost，而不能在网络上其他任何一个节点连接mysql。但是，我必须要从别的节点连接mysql，那么执行如下语句：

{% highlight java %}

mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
mysql> SELECT host, user FROM user;
+------------+----------+
| host       | user     |
+------------+----------+
| %          | aaa      |
| %          | root     |
| 127.0.0.1  | root     |
| localhost  | root     |
+------------+----------+

{% endhighlight %}

此时root帐号就能通过'%'保证接受来自任一节点的连接请求。
