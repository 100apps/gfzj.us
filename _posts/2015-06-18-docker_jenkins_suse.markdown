---
layout: post
title: "Docker ssh配置"
date: 2015-06-18 17:02:12
categories: 
by: zj
description: 以sles-11-sp3为基础，创建提供ssh服务的image
---

jenkins中，master是通过ssh与其slave进行通信的，Docker的一个container可以作为一个slave提供服务。在为suse创建提供ssh服务的image时，编写的Dockerfile多次修改，终于搞定，jenkins相关部分如下：

	#for jenkins
	RUN echo 'root:root' | chpasswd
	EXPOSE 22
	CMD ["/usr/sbin/sshd", "-D"]

对于suse的ssh来说，只需要配置用户名和密码，晕~~~


