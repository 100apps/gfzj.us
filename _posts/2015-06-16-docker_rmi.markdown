---
layout: post
title: "Docker删除image失败"
date: 2015-06-16 10:43:33
categories: 
by: zj
description: des
---

Docker中删除image命令`docker rmi ID`，执行失败，报出如下错误：

	Error response from daemon: No such image: b727f46c8e2791c7196819d06eeb59ddd4f4d51bf59d76b34b9cf09bc7b37890
	2015/06/16 10:37:48 Error: failed to remove one or more images

在网上能搜到很多类似的问题，基本解决方法就是先删除该image对应存在的containers，再删除该image。我用了无效。

执行`docker ps -a`，查看containers信息，发现最近有几个containers的STATUS不是0，那就是有问题咯，对应的COMMAND则是我执行失败的命令，把这些containers删除即可。

上述containers的image ID并不是我要删除的那个image的ID，我的image是通过Dockerfile生成的，在执行Dockerfile时，有命令执行失败，导致这些异常的containers。
