---
layout: post
title: "gradle构建java工程"
date: 2014-12-9 10:49:13
category: tech/zj/gradle
by: zj
keyword: gradle,java
description: 构建一个具有maven目录结构的java工程
---
一直都是手工建立一个java工程，生成src/main/java、src/test/java等目录。在网上找了数种方式代替手工方法，终于找到最为便利的了。（原谅我这个工程小白）

1. 安装gradle
2. 新建java工程目录，如Test
3. 命令行下，在Test目录下，执行命令`gradle init --type java-library`,得到如下目录结构的java工程：

![java工程目录结构][image1]

[gradle小系列(2)--gradle构建具有多个子项目的java工程][link1]

[image1]:/images/gradle-java-project.png
[link1]:/_posts/2014-12-10-gradle小系列(2)--gradle构建具有多个子项目的java工程.markdown