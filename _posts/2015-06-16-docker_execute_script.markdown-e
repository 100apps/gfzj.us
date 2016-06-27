---
layout: post
title: "Docker执行脚本"
date: 2015-06-16 12:02:38
categories: 
by: zj
description: 如何用docker执行自己定义的脚本
---

在生成的image时，在Dockerfile中将脚本test放到/root(任何合理的路径都可)下，并为其添加执行权限：

	ADD test /root/
	RUN chmod +x /root/test

test内容如下：

	echo "hello..."

用该Dockerfile创建的新image假设名为new_image，执行如下命令可运行脚本：
	
	docker run new_image /root/test

但是会报错如下：

	exec format error Error response from daemon: Cannot start container XXX

原因是docker不知道该怎样执行test，修改test内容如下

	#!/bin/sh
	echo "hello..."

重新生成image，并执行该脚本成功。

