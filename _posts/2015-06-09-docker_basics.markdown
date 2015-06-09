---
layout: post
title: "Docker学习记录"
date: 2015-06-09 09:58:12
categories: 
by: zj
description: basic knowledge about docker
---

##Docker架构

Docker使用client-server架构，Docker client与Docker daemon进行交互，daemon负责构建、执行、发布Docker containers。client和daemon可以在同一个节点上，也可以在不同的节点上。Docker架构图如下：

![docker architecture][image1]

1. Docker daemon: daemon运行在某一主机上，用户不与其直接交互，而是通过Docker client。
2. Docker client: 即命令docker，用户可使用该命令与daemon进行沟通。
3. Docker image: 即一个只读模板，用于创建Docker containers，是Docker的build组件。
4. Docker registries: 保存images，有public和static两种，用户可上传images到registry，也可从其下载images。Public的registry就是Docker Hub，提供大量可用的images。Docker registries是Docker的distribution组件。
5. Docker containers: 类似于一个目录，包含执行一个应用所需的所有资源。每个container都是从一个image创建而来的，可对其执行、启动、停止、移动、删除等操。Docker containers是Docker的run组件。




[image1]:/images/docker_arch.png "docker architecture"
