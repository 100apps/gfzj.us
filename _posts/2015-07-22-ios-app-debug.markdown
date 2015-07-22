---
layout: post
title: "iOS app调试"
date: 2015-07-22 11:21:01
category: tech
by: gf
description: 纪录一些调试的时候常用到的方法
---

>特别感谢腾讯bugly团队的某位大神客服的指导。通过他的提示我Google了一下，学到很多东西。

为了方便，首先清空`设置`->`隐私`->`诊断与用量`中的数据。如果选择了`自动发送`，每次上传完毕会清空手机上的日志；如果选择`不发送`，连上电脑，打开iTunes，日志就自动同步到电脑上来了(存放在 ~/Library/Logs/CrashReporter/MobileDevice/<手机名称>/)，手机中自动清空。为了调试方便，我们肯定要选择`不发送`。

---



