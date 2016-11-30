---
layout: post
title: "抓包调试方法"
date: 2016-11-29 16:41:42 +800
categories: tech
by: gf
description: 真机远程调试html页面
---

以前介绍过[Fiddler调试http](/tech/103.html)但是用过firebug或者chrome开发者工具的同学在真机调试html页面的时候，可能想要不仅仅是抓包，还希望有console、css等功能。

微信的开发者工具以前是有这个功能的，更新以后找不到了。微信开发者工具用的是[weinre](https://people.apache.org/~pmuellr/weinre/docs/latest/Home.html)，但是调试https比较麻烦，后来发现有一个打包的工具叫做[spy-debugger](https://github.com/wuchangming/spy-debugger)，证书也直接继承了，扫码安装非常方便。以后就用它了。

spy-debugger按照作者的话就是：

>>> 微信调试，各种WebView样式调试、手机浏览器的页面真机调试。便捷的远程调试手机页面、抓包工具，支持：HTTP/HTTPS 

实际上，还有一些非通用的方案：

1. [iOS真机上的Safari](https://developer.apple.com/library/content/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/GettingStarted/GettingStarted.html)
2. [webview in android](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/?utm_source=dcc&utm_medium=redirect&utm_campaign=2016q3)
