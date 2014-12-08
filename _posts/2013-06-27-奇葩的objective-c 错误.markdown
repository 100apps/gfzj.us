---
layout: post
title: "奇葩的objective-c 错误"
date: 2013-06-27 14:09:53
category: tech
by: gf
description: 看看这段代码-(void)showNews:(int)id{//TODO}本来觉得很正常啊，用来显示id是x的新闻，一开始运行也正常。后来想加个for循环，发现xcode死活不给提示。真是邪门了。看我强势
permalink: /tech/82.html
---
看看这段代码

``````````
-(void)showNews:(int)id{
  //TODO
 }
``````````

本来觉得很正常啊，用来显示id是x的新闻，一开始运行也正常。后来想加个for循环，发现xcode死活不给提示。![输入for，xcode的提示][for_xcode]

真是邪门了。看我强势插入for语句。xcode竟然出错了！![xcode for循环提示错误][xcode for]

这有什么错误的呢？明明很正确啊。

真是想不通。给的提示也看不懂，不经意间发现。这里居然有个id

``````````
-(void)showNews:(int)id{
  //TODO
 }
``````````

然后这个id和类型id混了。果断把参数id改成aid，正常了。![for循环正常了][for]

我和小伙伴们都惊呆了！


[for_xcode]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/b10c0907ae7310637111b5190d9b2000.jpg
[xcode for]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/5d91d842d1b462f8f0b287390c297a01.jpg
[for]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/e14508a3aef85aa2e38f1383b4a62d77.jpg