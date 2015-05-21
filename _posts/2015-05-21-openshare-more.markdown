---
layout: post
title: "OpenShare实现(4): more"
date: 2015-05-21 14:22:36
categories: series openshare
by: gf
description: 我们把openshare实现以后，还需要进行托管，分享。实用Github托管，实用cocoapods分享。
---

开源虽易，让别人用就很难。比如我做了一个openshare，自己感觉很好用，想让更多的人使用，或者去骗一些star，如果不推广，扔到Github上不管，估计一年以后也没人用，毕竟辛辛苦苦，前前后后用了半个月的晚上时间来做。还是希望能得到一些star的。开源也是一个圈子，是需要「混」的，iOS圈里面的「明星」还是少数，他们随便扔一个项目，都能star超过1k，像我这种无名小卒，没有follower，不推广，star很难超过两位数.所以这里就记录一下openshare的推广情况。

首先我把它放到Github上，然后写上[readme](https://github.com/100apps/openshare)，写好[文档](http://openshare.gfzj.us/),甚至还拼凑了一个[logo](https://raw.githubusercontent.com/100apps/openshare/gh-pages/images/slogo.png)。然后让它支持CocoaPods:

	pod trunk register gf@gfzj.us 'Logan' --description='iMac'
	pod trunk push

然后静候佳音，等待审核。


