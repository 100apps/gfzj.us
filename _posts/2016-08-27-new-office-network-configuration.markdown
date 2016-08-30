---
layout: post
title: "办公室网络配置"
date: 2016-08-27 15:16:29 +800
img: /images/office-server.jpg
categories: 
by: gf
description: 最近办公室搬家，记录网络迁移过程。
---

最近公司搬家，从漕河泾搬回了浦东。说起来简单，其实事情也挺繁琐，原来办公室局域网内有5台服务器，部署了开发、测试、gitlab、ci、共享文件、打印机等服务。这些东西，当然也是要迁移的。新办公室我们扯了一根单独的网线，理论上所有的东西只要直接搬过去就行了。

所有服务器上面的设置，我都门儿清，因为基本上是我一手搭建的。只是路由器和交换机这一套，当时不是我搞的，所以多少有些麻烦。不过只要能上Google，所有问题，无论花费多少时间，最终还是能解决。

我们不可能去购买新的网络设备，我们有的设备有：

1. juniper srx240 1台
2. cisco 2960x 48口交换机 两台
3. Sundray 无线控制器＋6个AP
4. 华为百兆交换机四台

因为juniper和cisco以前的设置并没有任何配置说明文档，所以也不知道连接哪个口怎么登陆。所以第一件事儿就是重置设置。当然，只能通过console控制线连接。电脑端用[Secure CRT](http://www.xdowns.com/soft/softdown.asp?softid=23625)连接。

对于juniper，crt的配置：![juniper-crt](/images/juniper-crt.png)
对于cisco，crt的配置和上面一样，应该是自动适应的。

# juniper设置

```bash
%cli
>configure
#load factory-default
#set system root-authentication plain-text-password
#commit and-quit
```

默认情况下，把网线连接到除了ge-0/0/0以外的任何端口。电脑会自动获得IP，然后浏览器访问<https://192.168.1.1> 就可以进入设置界面了。这时候启用一个向导。一步步设置。我们用的最简单的网络连接方式，把1-7这7个端口放到一个子网里(掩码是255.255.0.0)面，这样办公室、服务器各出去一根线，他们可以很方便的互通。按照向导设置完以后，路由器就算是配置完了。

一个很坑的地方是，dhcp服务器非常慢，一开始我们根本无法获取到IP，这时候，实在没辙了，重启了一下dhcp服务器：

```bash
>run restart dhcp-service
```

有时候web管理界面很卡，这时候也可以重启一下：

```bash
>run restart web-management 
```
或者重启电源：

```bash
>request system (halt | power-off | reboot) 
```

# cisco配置
通过console线控制，首先初始化设置：

```bash
>enable
#write erase
#reload
```

默认就是傻瓜式的交换机，任何一个口插入网络进线，其他口出就可以了。

# sundary配置
sundray 无线控制器和AP全部连接到cisco 2940x上面，cisco已经支持PoE供电了，所以AP可以直接启动。首先用电脑连接无线控制器的manage口,配置电脑的ip为192.168.252.x，网关255.255.255.0，然后浏览器打开<https://10.252.252.252/>，首先恢复出厂设置一下。

AP是自动发现的，这时候可以设置建立热点等操作，通过浏览器图形界面非常简单。需要注意的是接入点的`数据模式`选择的是本地转发，因为集中转发，始终没有成功，原因未知。

这时候把电脑也连接到cisco上面，运行[AP诊断工具](http://www.sundray.com.cn/data/34.html)，扫描一下，能发现所有的AP。因为控制器的IP也是自动获得的，下次重启坑找不到，用诊断工具扫描一下AP连接的连接信息就能看到控制器了。

# 配置Juniper端口转发

NAT分为source NAT、destination NAT、static NAT，内网电脑通过juniper上网用的就是Source NAT。端口映射，外面的机器访问我们局域网内的机器，需要端口转发，即Destination NAT。
![dest-nat.png](/images/dest-nat.png)
如果只是设置了dest-nat恐怕还是不能访问内部机器，因为还有个防火墙策略。我们现在有两个zone：internet和internal。internet 默认是不能访问internal的，配置：
![dest-nat-fw.png](/images/dest-nat-fw.png)

# 感悟

在创业公司，永远都有各种从未遇到过的问题，这时候你是兴奋还是恐惧？

![images/office-server.jpg](/images/office-server.jpg)

