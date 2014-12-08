---
layout: post
title: "关于 Java的class.forName"
date: 2008-08-27 21:58:00
category: tech
by: gf
description: Class.forName(xxx.xx.xx)返回的是一个类,.newInstance()后才创建一个对象Class.forName(xxx.xx.xx);的作用是要求JVM查找并加载指定的类，也就是说JVM会执行该类的静态代
permalink: /tech/183.html
---
Class.forName(xxx.xx.xx) 返回的是一个类, .newInstance() 后才创建一个对象 Class.forName(xxx.xx.xx);的作用是要求JVM查找并加载指定的类，也就是说JVM会执行该类的静态代码段

Class aClass = Class.forName(xxx.xx.xx);
Object anInstance = aClass.newInstance();


Class.forName("").newInstance()返回的是object
but there is some limit for this method to create instance
that is your class constructor should no contain parameters, and you should cast the instance manually.

Class Driver\{
protected static Driver current;
public static Driver getDriver()\{
return current;
\}
\}

Class MyDriver extends Driver\{
static\{
Driver.current=new MyDriver();
\}
MyDriver()\{\}
\}

用时:
Class.forName("MyDriver");
Driver d=Driver.getDriver();

有的jdbc连接数据库的写法里是Class.forName(xxx.xx.xx);而有一些：Class.forName(xxx.xx.xx).newInstance()，为什么会有这两种写法呢？

Class.forName(xxx.xx.xx) 返回的是一个类,
.newInstance() 后才创建一个对象

Class.forName(xxx.xx.xx);的作用是要求JVM查找并加载指定的类，也就是说JVM会执行该类的静态代码段

在JDBC规范中明确要求这个Driver类必须向DriverManager注册自己，即任何一个JDBC Driver的Driver类的代码都必须类似如下：
public class MyJDBCDriver implements Driver \{
static \{
DriverManager.registerDriver(new MyJDBCDriver());
\}
\}

所以我们在使用JDBC时只需要Class.forName(XXX.XXX);就可以了

we just want to load the driver to jvm only, but not need to user the instance of driver, so call Class.forName(xxx.xx.xx) is enough, if you call Class.forName(xxx.xx.xx).newInstance(), the result will same as calling Class.forName(xxx.xx.xx), because Class.forName(xxx.xx.xx).newInstance() will load driver first, and then create instance, but the instacne you will never use in usual, so you need not to create it.

在JDBC驱动中，有一块静态代码，也叫静态初始化块，它执行的时间是当class调入到内存中就执行（你可以想像成，当类调用到内存后就执行一个方法）。所以很多人把jdbc driver调入到内存中，再实例化对象是没有意义的