---
layout: post
title: "从源代码编译objc runtime"
date: 2015-04-01 14:30:01
category: tech
by: gf
description: 最近很多人发文章写objc runtime，我们知道runtime是开源的，如何从源代码编译并且使用自己编译出来的libobjc.A.dylib呢？
---

 最近很多人发文章写objc runtime，我们知道runtime是开源的，如何从源代码编译并且使用自己编译出来的libobjc.A.dylib呢？自己尝试了一下，很多问题。一直不能成功，于是发帖子问了一下：

- <http://www.zhihu.com/question/29215296>
- <http://stackoverflow.com/questions/29383436/how-to-compile-and-use-objc-runtime-from-apples-source-code>
- <http://segmentfault.com/q/1010000002640513>
- <https://www.v2ex.com/t/180839>

还在微博上@了一下大牛，也没有什么回复。

这篇文章持续更新，直到我得到我想要的答案。

查看libobjc.A.dylib的函数

	nm -gU /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator.sdk/usr/lib/libobjc.A.dylib
	nm -gU /usr/lib/libobjc.A.dylib

<http://stackoverflow.com/questions/25590945/trouble-when-linking-objective-c-program-with-my-own-libobjc-a-dylib> 解释了如何替换`libobjc.A.dylib`

[The Objective-C Runtime:  Understanding and Abusing](http://phrack.org/issues/66/4.html)

	OBJC_HELP=1 ./a.out #显示debug 信息
	NSObjCMessageLoggingEnabled=Yes ./a.out


<https://github.com/RetVal/objc4-532.2> build on OSX Yosemite 10.10.2 (14C109)