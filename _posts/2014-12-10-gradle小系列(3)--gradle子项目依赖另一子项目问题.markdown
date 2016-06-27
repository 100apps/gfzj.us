---
layout: post
title: "gradle小系列(3)--gradle子项目依赖另一子项目问题"
date: 2014-12-10 19:11:41
categories: series gradle
by: zj
keyword: gradle,java,子项目,依赖
description: 构建一个具有maven目录结构的java项目，且该工程包含多个子项目，某子项目依赖另一子项目的处理
---
一个java项目如果是由多个子项目构成，如果其中某一子项目依赖另一子项目，gradle该如何配置呢？

假设有项目项目GradleTest，包括两个子项目SubPro1和SubPro2，其中**SubPro1依赖SubPro2**，二者都**依赖junit**。

根据[gradle小系列(2)--gradle构建具有多个子项目的java工程][link2]构建工程。

# ##配置子项目依赖###

在子项目SubPro1中，配置build.gradle即可，内容如下：

	dependencies {
		compile project(":SubPro2")
	}
	
上述依赖表示SubPro1依赖子项目SubPro2，使得在SubPro1编译之前先编译SubPro2。

# ##配置依赖jar包###

SubPro1和SubPro2都使用junit，那么我们修改SubPro2的build.gradle文件即可，内容如下：

	dependencies {
		testCompile 'junit:junit:4.11'
	}

那么SubPro1因依赖SubPro2而获取了对junit jar包的依赖。
