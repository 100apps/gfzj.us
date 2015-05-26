---
layout: post
title: "OpenShare实现(4): more"
date: 2015-05-21 14:22:36
categories: series openshare
by: gf
description: 我们把openshare实现以后，还需要进行托管，分享。实用Github托管，实用cocoapods分享。
---

开源虽易，让别人用就很难。毕竟我以前做了四年多的SEO，推广的难度，心知肚明。 比如我做了一个openshare，自己感觉很好用，想让更多的人使用，顺便骗一些star，如果不推广，扔到Github上不管，估计一年以后也没人用，想想自己辛辛苦苦，前前后后用了半个月的晚上时间来做，还是希望能得到一些star来填补强烈的虚荣满足感的。开源也是一个圈子，是需要「混」的，iOS圈里面的「明星」还是少数，他们随便扔一个项目，都能star超过1k，像我这种无名小卒，没有follower，不推广，star很难超过两位数.所以这里就记录一下openshare的推广情况。

首先我把它放到Github上，然后写上[readme](https://github.com/100apps/openshare)，写好[文档](http://openshare.gfzj.us/),甚至还拼凑了一个[logo](https://raw.githubusercontent.com/100apps/openshare/gh-pages/images/slogo.png)。然后让它支持CocoaPods:

	pod trunk register gf@gfzj.us 'Logan' --description='iMac'
	pod trunk push

不到一天，发现github上有一个fork，一个star，估计cocoapods审核通过了，去<https://cocoapods.org/>搜索了一下，果然已经收录了：

![cocoapods](/images/openshare-cocoapods.png)

然后去论坛／社交网络发帖推广一下：

2015/05/22 11:58 在v2ex上发了一个[帖子](https://www.v2ex.com/t/192942)，求关注。一个小时收获了9个star。

2015/05/22 13:18 在微博上@了一下iOS圈内的大牛们。求扩散。可能是因为我这个账号过于弱，目前（25/5）没有任何效果。

不得不说，v2ex社区的用户素质还是很高的，比oschina强不少，通过v2ex上很多用户点star，OpenShare已经排在了[Github trending objc栏目](https://github.com/trending?l=objective-c)的前五名。这样每天会带来10个左右的star。

2015/05/24 	周日，star已经过百。意外惊喜！
