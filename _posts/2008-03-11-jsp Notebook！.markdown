---
layout: post
title: "jsp Notebook！"
date: 2008-03-11 22:29:00
category: tech
by: gf
description: 1.access连接数据库必须close（）不然添加不进去，---事务提交《commit》2.文本文件必须家‘’否则中文事有困难啊！3.才发现String的split方法很好用，返回一个数组。。4.碰见一个
permalink: /tech/193.html
---
1.access连接数据库必须close（）不然添加不进去，---事务提交《commit》

2.文本文件必须家‘’否则中文事有困难啊！

3.才发现String的split方法很好用，返回一个数组。。

4.碰见一个for(String x:y)\{

                           System.out.println(x);

                \}

的写法，感觉很好！其中y是一个String类型的数组，遍历了，相当于。

5.strus2 if标签的问题，，可能会碰到说“ According to TLD or attribute directive in tag file, attribute test does not accept any expressions”这是strust2版本的问题，**struts2** \_2.0.11   版本不支持 s **标签**嵌套 EL  
struts2\_2.0.08 这个支持但是不支持集合封装pojo。**struts2**.0**标签**主要支持的是ognl**表达式**  
所以把<s:elseif test="$\{age > 35\}">  
改为<s:elseif test="\#age>35">  
就ok了

就是说用到的struts2版本不同支持的表达式也可能不同，$\{expression\}是EL表达式，\#expression是ognl表达式。。。

6.struts2的标签的错误：**quote** **symbol** **expected**  
多是因为“引用错误”即表达式错误引起比如少了“”等等

7.eclipse开发web应用时class下的.xml文件丢失。。。

因为我把struts.xml放在了class目录下面，每次preoject->clean以后发现struts.xml文件就没有了，郁闷！

才发现原因，clean是重建的意思，他根据src文件里的.java文件从新编译成.class文件，并放到class文件夹下面，也就是说class文件夹先被删除，然后重建，，，，所以struts.xml也就没了，所以最好是把struts.xml文件放到src下面（或者default package，如果没建包的话）这样在class文件夹下面也有了，而且clean以后依然存在。

8.mysql hibernate中文问题

很老的问题了，一直都是忍着。。今天打算彻底解决一下子，就google了一下，大部分是说在jdbc url中添加参数，比如在hibernate-cfg.xml中

<property name="hibernate.connection.url">  
    jdbc:mysql://121.250.215.39:3306/hbpcp2?useUnicode=true&characterEncoding=utf8&mysqlEncoding=utf8     
   </property>

可是这样在Mysql command line client中还是？？？，在命令行中添加的中文在hibernate中也是乱码或者？？？，郁闷！看来只改正hibernate的配置文件还是不行。。。。

所以修改mysql的my.ini修改default-character-set为GBK，再试一下，ok！

note:修改成utf8还是不行，乱码，不是？？？了，呵呵所以修改成了gbk，gbk当然也有局限，比如韩语就不行了，我试了一下，日语ok。反正韩语也ok！

事实上，我们修改了hibernate的property，通过hibernate insert和select没有问题的，都能显示正确，但是在command line clinet中就是乱码，究其原因，就是因为my.ini中mysql默认编码的原因，所以修改之，ok！

我不知道hibernate默认的是什么字符集，反正必须得加上参数useUnicode=true&characterEncoding=utf8&mysqlEncoding=utf8     
，否则，真的不行。。
