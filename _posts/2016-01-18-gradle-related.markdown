---
layout: post
title: "gradle小系列(5)--Gradle使用记录"
date: 2016-01-18 19:39:21
categories: series gradle
by: zj
description: gradle dependency exclude
---

在build.gradle文件中，如何满足如下需求：

	1. 依赖自定义目录下jar包
	2. build出来的jar包中包含junit相关测试类
	3. build出来的jar包中不包含某个类型的资源文件

# ###Point 1####

假设当前工程根目录下有一子目录libs，其中包含编译时需要依赖的一堆jar包，在build.gradle文件中需要做如下配置：

	dependencies {
		compile fileTree(dir: 'libs', include: '*.jar')
	}

# ###Point 2####

假设工程当前使用junit写了一些测试类，需要打包到工程的jar包中（默认exclude test classes），在build.gradle文件中需要做如下配置：

	task packageAll(type: Jar) {
    		from sourceSets.main.output
    		from sourceSets.test.output
	}

执行命令 `gradle packageAll` 即可。

# ###Point 3####

假设工程中有些资源是在调试时使用，打包时并需要将其包含在内，只需在build.gradle文件中需要做如下配置(假设不要jar包根目录下的xml文件)：

	task packageExclude(type: Jar) {
   		 exclude("*.xml")
	}

执行命令 `gradle packageExclude` 即可。

如果同时需要Point 2 和Point 3，将二者的内容放到同一个task中即可。

