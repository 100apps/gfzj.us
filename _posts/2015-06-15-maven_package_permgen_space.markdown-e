---
layout: post
title: "maven打包报出permgen space"
date: 2015-06-15 15:38:15
categories: series maven
by: zj
description: des
---

今天执行命令`mvn clean package -DskipTests`，报出如下错误：

	permgen space

在执行上述命令之前，执行如下命令：

	export MAVEN_OPTS="-Xms1024m -Xmx2048m -XX:PermSize=256m -XX:MaxPermSize=512m"

再执行maven，通过。

