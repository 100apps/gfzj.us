---
layout: post
title: "mac os 运行hadoop 2.2.0 问题总结"
date: 2014-02-18 11:20:34
category: tech
by: zj
description: 1、warning：UnabletoloadrealminfofromSCDynamicStore两种方式：（1）在~/bash_profile中添加exportHADOOP_OPTS=&quot;-Djava.security.krb5.realm=-Djava.security.krb5.kdc=&quot;
permalink: /tech/120.html
---
1、warning：Unable to load realm info from SCDynamicStore 两种方式： （1）在~/bash\_profile中添加 export HADOOP\_OPTS="-Djava.security.krb5.realm= -Djava.security.krb5.kdc=" （This works on Java 6, but not on Java 7） 如果是java 7：In the `hadoop-env.sh` file, change the `JAVA_HOME` setting to

    export JAVA_HOME=`/usr/libexec/java_home -v 1.6`

` 如果hbase遇到这个问题，则把上述设置加入conf/hbase-env.sh ` （2）修改 <HADOOP\_HOME>/etc/hadoop/hadoop-env.sh `export` `JAVA_HOME=$(/usr/libexec/java_home -d 64 -``v` `1.6)` `export` `HADOOP_OPTS=``"$HADOOP_OPTS -Djava.security.krb5.realm=OX.AC.UK -Djava.security.krb5.kdc=kdc0.ox.ac.uk:kdc1.ox.ac.uk"` 2、warning：WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable 原因：编译的64bits hadoop 2.2.0中没有lib。解决方法：在core-site.xml中添加 <property> <name>io.native.lib.available</name> <value>false</value> <description>default value is true:Should native hadoop libraries, if present, be used.</description> </property> 经测试，上述方法没用。。原因：however it looks like it only affects zlib. Since we always load the native library this means we may use native libraries even if io.native.lib.available is set to false.参考https://issues.apache.org/jira/browse/HADOOP-8642解决该问题（就是修改源代码，然后再重新编译就行了）      
