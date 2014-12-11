---
layout: post
title: "gradle小系列(4)--gradle打包java项目"
date: 2014-12-11 18:35:57
categories: series gradle
by: zj
keyword: gradle,java,子项目,依赖
description: 对于一个具有maven目录结构的java项目打包发布
---
以gradle小系列所举例子为示例，在此处介绍两种gradle发布java项目的方法：

###fat jar方式###

该种方法将工程所依赖的jar包等资源都会打到一个可执行jar包中，生成的jar包很大。

在GradleTest项目中，我们对SubPro1进行打包，所以需要修改SubPro1下的build.gradle文件：
	
	jar {
		from { 
			configurations.compile.collect { it.isDirectory() ? it : zipTree(it) } 
		}
		manifest {
			attributes 'Main-Class': 'hello.HelloWorld'
		}
	}

	dependencies {
		compile project(":SubPro2")
	}

上述配置添加了jar task，from是对SubPro1的依赖进行打包，manifest 则生成对main的配置信息，即包hello下的HelloWorld.java是工程入口

在项目GradleTest的根目录下执行命令`gradle build`，即可生成jar包

###使用gradle的application插件###

fat jar并不总是一个合适的选择，比如需要依赖跟jar分离、软件能在*nix和windows下都有启动的script等。
那么使用gradle的application插件就可以做到了。

在GradleTest项目中，我们对SubPro1的build.gradle进行如下修改：删除jar task；添加application插件；
配置main class（设置mainClassName的值即可）。修改结果如下：

	apply plugin: 'application'

	mainClassName = 'hello.HelloWorld'

	dependencies {
		compile project(":SubPro2")
	}

Application插件提供5个tasks实现项目的发布，分别是

	run、startScript、installApp、distZip、distTar

我假设使用distZip，在根目录下运行命令`gradle distZip`，在SubPro1的build/distributions中，可以看到zip文件，其中包含了bin和lib文件夹，bin下有软件启动脚本，lib则是软件jar包和其所有依赖。
