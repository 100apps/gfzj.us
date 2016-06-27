---
layout: post
title: "Dockerfile如何设置PATH"
date: 2015-07-07 16:16:02
categories: 
by: zj
description: 在Dockerfile中如何设置PATH
---
使用背景：Jenkins以Docker container作为slave，是通过ssh与container通信的，那么在通过执行`/usr/sbin/sshd -D`启用container时，使用想要的PATH，该如何去做呢？

假设需要将java bin添加到PATH中，尝试如下方式：

# ###ENV

在Dockerfile中添加如下

	ENV PATH /usr/java/jdk1.7.0_71/bin/:$PATH

生成image，执行`/usr/sbin/sshd -D`启动container，因为jenkins是通过ssh与container进行通信的。再重开一个终端，ssh到该container，`echo $PATH`，执行结果也没有java。

# ###使用参数-e

在Dockerfile不作任何PATH相关的设置，在生成image后，使用参数`-e`设置，如下：

	docker run -P -e PATH=/usr/java/jdk1.7.0_71/bin/:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin test /usr/sbin/sshd -D

再重开一个终端，ssh到该container，`echo $PATH`，执行结果并不是所设置那样。但是，这种方式如果是执行/bin/bash，PATH则如设置那样。

# ###/etc/profile

在Dockerfile中，在合适的位置添加如下：

	RUN echo "export PATH=/usr/java/jdk1.7.0_71/bin/:$PATH" >> /etc/profile

生成image，执行`/usr/sbin/sshd -D`启动container，再重开一个终端，ssh到该container，`echo $PATH`，执行结果如设置一样。





