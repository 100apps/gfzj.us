---
layout: post
title: "OpenShare实现(1)：why"
date: 2015-05-08 18:41:45
categories: series openshare
by: gf
description: 介绍一下为什么要做OpenShare项目
permalink: /series/openshare/
---

开发[喜地iOS版](http://www.xidibuy.com/)的时候，商品需要分享到微信、QQ、微博之类的社交网络。按照传统的方法，去各个官方平台的开发者网站，下载SDK，然后集成进去。这样做会导致最后打包的app体积增大不少，而且每个平台API使用方法都不统一，研究每个平台分享、登录功能，也浪费了不少时间。

于是为什么不封装一下呢？就像iOS `Social` framework。默认已经封装了下面几种社交网络：

{%highlight objc%}
#  SLServiceTypes.h
SOCIAL_EXTERN NSString *const SLServiceTypeTwitter NS_AVAILABLE(10_8, 6_0);
SOCIAL_EXTERN NSString *const SLServiceTypeFacebook NS_AVAILABLE(10_8, 6_0);
SOCIAL_EXTERN NSString *const SLServiceTypeSinaWeibo NS_AVAILABLE(10_8, 6_0);
SOCIAL_EXTERN NSString *const SLServiceTypeTencentWeibo NS_AVAILABLE(10_9, 7_0);
SOCIAL_EXTERN NSString *const SLServiceTypeLinkedIn NS_AVAILABLE(10_9, NA);
{%endhighlight%}
比如我们想分享到新浪微博：

{%highlight objc%}
if([SLComposeViewController isAvailableForServiceType:SLServiceTypeSinaWeibo]) {
    SLComposeViewController *controller = [SLComposeViewController composeViewControllerForServiceType:SLServiceTypeSinaWeibo];
    SLComposeViewControllerCompletionHandler myBlock = ^(SLComposeViewControllerResult result){
        if (result == SLComposeViewControllerResultCancelled) {
            NSLog(@"Cancelled");
        } else
        {
            NSLog(@"Done");
        }
        [controller dismissViewControllerAnimated:YES completion:Nil];
    };
    controller.completionHandler =myBlock;
    [controller setInitialText:@"Hellow world"];
    [controller addURL:[NSURL URLWithString:@"http://openshare.gfzj.us/"]];
    [controller addImage:[UIImage imageNamed:@"test.png"]];
    [self presentViewController:controller animated:YES completion:Nil];
}
else{
    NSLog(@"SinaWeibo UnAvailable");
}
{%endhighlight%}
如果想换成twitter，只需要把`SLServiceTypeSinaWeibo`换成`SLServiceTypeTwitter`就可以了。非常简单易用。

`SLComposeViewController`的分享并不用转到响应的社交网络客户端，只需要在系统中配置账号就可以了。对于其他类型的社交网络，比如微信暂时并没有集成，而且不支持「第三方登录」，不能设置appkey从而带个尾巴（也是一件好事，这样不用开发者去各自平台申请key了），也不能实现平台官方支持的分享类型。

Social framework是一个很好的设计，但是还是没有官方SDK提供的功能多。那我们能不能研究一下各个平台SDK和客户端通信的机制？然后对各个平台进行封装，这样就能想Social framework一样方便调用，又有官方SDK的功能？

实际上是可以的，而且已经实现了：<https://github.com/100apps/openshare>

![OpenShare](/images/openshare-demo.gif)
