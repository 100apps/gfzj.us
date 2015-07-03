---
layout: post
title: "越狱后的iOS开发"
date: 2015-07-01 13:36:40
category: tech
by: gf
description: 作为一名普通的iOS开发者，手里的测试机器必须是越狱后的。因为对于开发来说，越狱给我们带来很多便利。
---

感谢[太极越狱](http://www.taig.com/)，我们现在已经能在iOS 8.4上完美越狱了。越狱过程很简单，相信任何人都能搞定。作为iOS开发者，越狱之后应该做什么？

1. 安装openssh-server（通过Cydia「主页」的链接安装）
2. 安装 `BigBoss Recommended Tools`，这样常用的命令都可以通过ssh运行了。现在你的iPhone已经和普通的vps差不多了。有人甚至用iPad当Git服务器，作为待机之王，iPad终于有了新的用处。
3. 安装Reveal Loader、clutch、[dumpdecrypted](https://github.com/stefanesser/dumpdecrypted)、[FLEXLoader
](https://github.com/qiaoxueshi/FLEXLoader)。reveal可以查看其他app的UI，这样如果产品跟你说，就做成xxx的效果，通过reveal可以实现像素级复制，就像firebug一样；clutch和dumpdecrypted主要用来砸壳，看其他app的头文件，用过class-dump的应该都知道。dumpdecrypted砸壳例子：
{%highlight bash%}
cd /usr/lib 
DYLD_INSERT_LIBRARIES=dumpdecrypted.dylib /var/mobile/Containers/Bundle/Application/8C1AB88B-5AB3-4F28-8CDC-C08A3A39BA43/imeituan.app/imeituan mach-o decryption dumper
class-dump -H imeituan.decrypted -o /tmp/imeituan/
{%endhighlight%}
4. [Introspy](https://isecpartners.github.io/Introspy-iOS/)监控app API调用／网络情况等

作为开发机，一定要保证玩坏了还能越狱。iOS越狱失败或者不能开机都不要紧，只需要开机的时候按住Home键，就能进入DFU模式，用iTunes就能恢复成最新的iOS，所以如果最新版iOS能越狱，基本上可以随便玩。如果不能越狱了，就要小心了，玩坏了可就不能再越狱了。所以我一般会把手上的设备全部越狱，对其中一台折腾，其他的要保证Reveal可以用。



