---
layout: post
title: "gradle小系列(2)--gradle构建具有多个子项目的java工程"
date: 2014-12-10 18:15:04
category: tech/zj/gradle
by: zj
keyword: gradle,java,子项目
description: 构建一个具有maven目录结构的java项目，且该工程包含多个子项目
---
一个java项目如果是由多个子项目构成，该如何构建和管理项目？简单记录一下Gradle进行多个子项目工程的构建和管理。

假设有项目项目GradleTest，包括两个子项目SubPro1和SubPro2。

##Gradle构建项目##

1. 创建目录GradleTest，并在该目录下建立文件build.gradle和settings.gradle，另外建立子项目目录SubPro1、SubPro2。GradleTest内文件如下：
![GradleTest文件结构](/images/gradle-java-multiprojects.png)

2. 进入目录SubPro1，初始为空，命令行下定位到该目录，执行命令`gradle init --type java-library`，SubPro1目录下会生成maven格式的java项目目录结构。

3. 对于子项目SubPro2，执行和SubPro1同样的操作即可。

4. 修改GradleTest下的配置文件settings.gradle，添加
		include 'SubPro1','SubPro2'
表示该项目包括SubPro1和SubPro2两个子项目。

5. 修改GradleTest下的配置文件build.gradle。添加(下面配置是项目的所有子项目都共享的配置，此处我们使用java和eclipse两个插件。
)：
        subprojects{
        	apply plugin: 'java'
        	apply plugin: 'eclipse'
        	repositories {
        		mavenCentral()
        	}
        	dependencies {
        
        	}
        }
        
6. 在子项目SubPro1和SubPro2中，只需要配置build.gradle即可，由于此处没有特殊需求，可以将其中内容都删除即可。

##生成Eclipse工程##

在根目录下直接执行命令：gradle eclipse即可


[gradle小系列(1)–gradle构建java工程][link1]

[gradle小系列(3)–gradle构建java工程][link3]


[link1]:http://www.gfzj.us/tech/zj/gradle/2014/12/09/gradle%E5%B0%8F%E7%B3%BB%E5%88%97(1)--gradle%E6%9E%84%E5%BB%BAjava%E5%B7%A5%E7%A8%8B.html
[link3]:http://www.gfzj.us/tech/zj/gradle/2014/12/11/gradle%E5%B0%8F%E7%B3%BB%E5%88%97(3)--gradle%E5%AD%90%E9%A1%B9%E7%9B%AE%E4%BE%9D%E8%B5%96%E5%8F%A6%E4%B8%80%E5%AD%90%E9%A1%B9%E7%9B%AE%E9%97%AE%E9%A2%98.html
