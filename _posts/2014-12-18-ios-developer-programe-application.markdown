---
layout: post
title: "iOS开发者账号申请流程"
date: 2014-12-18 13:24:43
by: gf
description: iOS开发者账号有两类：99$的App Store上架发布的账号和299$的内部发布用的enterprise账号。其中App Store上架用的账号又分为company和personal两种。这三种账号正好我都申请了一下，现在记录一下申请过程。
---

[iOS开发者账号](https://developer.apple.com/programs/)有两类：

1. 99$的App Store上架发布的账号
	1. company
	2. personal
2. 299$的内部发布用的enterprise账号。这种账号不能上架App Store。

这三种账号正好我都申请了一下，现在记录一下申请过程。

company和enterprise都可以建立子账号，在<https://developer.apple.com/membercenter/index.action#allpeople>通过邮箱邀请就可以，还是很方便的。另外，一个apple id只能绑定这三种账号中的一种。比如你需要company和enterprise账号，那么就需要两个apple id（也就是两个邮箱）。

#  Personal账号注册

只要有一张支持visa／master card的信用卡即可。一般一天之内就能搞定了。下面是申请日志：

|时间|操作|
| 2014年9月29日(星期一) 下午4:30| 进入[官网](https://developer.apple.com/programs/start/standard/create.php)申请，用信用卡付款，记住一定要写`有效的姓名`（身份证／护照出现的），中文可以写信用卡上的名称（一般是全拼）|
| 2014年9月29日(星期一) 下午4:55| App Store发来邮件*订单确认 W29020xxxx*|
| 2014年9月29日(星期一) 下午5:14| APPLE STOR 发来邮件 *E-invoice for your order #25253xxxx*|
| 2014年9月30日(星期二) 上午7:04|Apple Developer Support 发来邮件*Thank You for Joining an Apple Developer Program*|
| 2014年9月30日(星期二) 上午7:14|chinadev发来邮件*Apple Developer Program Enrollment *|

至此，个人版的开发者账号就申请下来了，以前的时候付款还要传真确认单，现在都不需要了，信用卡扣款就搞定了。顺利的话，24小时之内账号到手。

#  company账号和enterprise账号申请

company和enterprise申请都需要[邓白氏编码（D-U-N-S® Number）](http://zh.wikipedia.org/wiki/%E9%82%93%E7%99%BD%E6%B0%8F),这个如果单独申请时需要付费的。如果我们没有邓白氏编码，可以通过Apple提供的链接直接申请，是免费的。我们公司当时并没有邓白氏编码，所以一切从头开始。而且是同时申请的，如下图

![同时申请company和enterprise账号](/images/company-enterprise-allinone.png)

|时间|操作|
|2014年12月11日 17:02|进入[官网](https://developer.apple.com/programs/start/enterprise/)开始申请，注意公司名称可以用Google翻译，但是要和`营业执照`上的一样，不要增加或减少。因为没有邓白氏编码，所以通过[apple提供的链接](https://developer.apple.com/ios/enroll/dunsLookupForm.action)申请。|
|2014-12-15 09:20:57|因为是上周五申请的，所以周一一过来就发邮件给<appdeveloper@dnb.com>, <chinadev@asia.apple.com>询问邓白氏编码申请状态|
|2014-12-15 15:26:20|上海邓白氏（电话61961650）打来电话验证，询问了几个简单的问题如实回答一下，就通过了，然后收到dsmmssqladmin发的邮件，说`You may start using your number in 14 days. `|
|2014-12-16 13:13|发现在apple后台发现邓白氏已经同步过来了，可以进行下一步了。说是14天，实际上感觉1天之内apple就能同步过来，所以邓白氏申请下来以后，要每天都要去apple后台试一下。|
|2014-12-16 13:30:22|收到Apple Developer Support发来的邮件* Your Apple Developer Program Enrollment Request*|
|2014-12-17 09:48:43|给apple打电话（号码4006701855），询问为什么还没有审核通过，对方很nice，说会帮我加急，一定要问一下case number，这样下次打电话的时候能省不少事|
|2014-12-17 16:46:18|apple电话服务时间是9：00-17：00，眼看他们要下班了，我还没收到回复，所以赶紧再催一下，直接提供case number，对方说两分钟以后就给我回电话确认|
|2014-12-17 16:50:05|当时填的是公司座机，apple就打这个座机了，然后询问了几个简单的问题，问问能否代表公司申请之类的，并承诺5分钟之内就可以收到确认邮件。我强调，我有两个账号同时申请的，他说都没问题，会依次给我发送确认邮件。|
|2014-12-17 16:59:16|enterprise账号收到Apple Developer Support 发来的邮件`Apple Developer Program Enrollment Update`，去后台同意协议，准备用信用卡付款|
|2014-12-17 17:01:43|company账号收到Apple Developer Support 发来的邮件`Apple Developer Program Enrollment Update`，去后台同意协议，准备用信用卡付款|
|2014-12-17 17:21:38|Apple Store 发来邮件`订单确认_W47808xxxx`|
| 2014-12-17 17:26:09|Apple Developer Support发来邮件`Thank You for Joining an Apple Developer Program`|
|2014-12-18 08:34:50|Apple Support发来邮件`您的_Apple_Developer_Program_Support_体验`。至此，账号申请完毕，可以用了。|
|2014-12-18 12:19:18|APPLE STORE发来邮件E-invoice for your order #254509xxxx，可以把这个电子发票交给财物了|

#  总结
现在申请开发者账号还是很快的，如果想更快的话，就要不停地发邮件／打电话催。个人版的话24小时，企业版的话，加上邓白氏申请，加上周末两天，一共用去6天时间，所以一周应该足够了。如果有邓白氏编码，估计2天之内也能搞定。
