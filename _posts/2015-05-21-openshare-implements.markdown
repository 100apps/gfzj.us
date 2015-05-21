---
layout: post
title: "OpenShare实现(3)：implement"
date: 2015-05-21 13:20:50
categories: series openshare
by: gf
description: 介绍OpenShare的设计理念和实现方法
---
我们已经知道如何和官方客户端通信了，通过hook也知道通信格式了。下面就是对这些平台进行封装。有一些基本要求：

1. 因为我们并不知道OpenShare到底要支持多少平台，所以必须提供扩展机制。
2. 必须有全局的保存appKey等变量的地方，可以考虑单例模式或类变量。
3. 分享、登录完成以后，要方便回调，可以考虑block。

对于objc基本上有两种思路：继承(subclass)和分类(category)

用继承的话，就是做一个OpenShare的基类，然后各个平台的调用用子类实现，但是这样的话，调用的地方需要先实例化，然后调用对象方法，略有不便，最后我选择了用category，每个平台都去扩展OpenShare的类方法，这样OpenShare就变得越来越完善，支持的平台越来越多。

另外，还需要封装OpenShare和官方客户端通信的message，也就是OpenShare中的`OSMessage`

`OSMessage`类，保存OpenShare向客户端发送的消息。分享的消息基本上有以下几种情况：

1. 纯文本
2. 图片
3. 链接
4. 其他格式多媒体(声音、视频、文件等)

这样对应OSMessage中的属性：

{%highlight objc%}
@property NSString* title;
@property NSString* desc;
@property NSString* link;
@property NSData* image;
@property NSData* thumbnail;
@property OSMultimediaType multimediaType;
//for 微信
@property NSString* extInfo;
@property NSString* mediaDataUrl;
@property NSString* fileExt;
{%endhighlight%}      

比如一个文本消息，可以只设置title，其他不管；发送一个图片，只需要设置image/thumbnail/title/desc，其他不用设置。对于其他多媒体消息，可以用multimediaType来标示。所以OSMessage可以封装所有app向客户端发的各类分享请求。

另外，还需要解决的是，客户端分先完成以后回调app的功能。我们熟悉的是block方法。而不是每个平台都到application:openURL:sourceApplication:annotation:中判断。比如最好是这样的：

{%highlight objc%}
OSMessage *msg=[[OSMessage alloc] init];
msg.title=@"Hello World";
//分享到微信
[OpenShare shareToWeixinSession:msg Success:^(OSMessage *message) {
	ULog(@"微信分享到会话成功：\n%@",message);
} Fail:^(OSMessage *message, NSError *error) {
	ULog(@"微信分享到会话失败：\n%@\n%@",error,message);
}];
//分享到QQ
[OpenShare shareToQQFriends:msg Success:^(OSMessage *message) {
	ULog(@"分享到QQ好友成功:%@",msg);
} Fail:^(OSMessage *message, NSError *error) {
	ULog(@"分享到QQ好友失败:%@\n%@",msg,error);
}];
{%endhighlight%}





##如何使用

*第零步*: 修改`Info.plist`添加`URLSchemes`，让客户端可以回调app

{%highlight xml%}
<!--  OpenShare添加回调urlschemes  -->
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>OpenShare</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <!--      微信          -->
            <string>wxd930ea5d5a258f4f</string>
            <!--       QQ         -->
            <string>tencent1103194207</string>
            <string>tencent1103194207.content</string>
            <string>QQ41C1685F</string>
            <!--微博-->
            <string>wb402180334</string>
            <!--人人-->
            <string>renrenshare228525</string>
            <!--facebook-->
            <string>fb776442542471056</string>

        </array>
    </dict>
</array>
{%endhighlight%}

*第一步*：到`AppDelegate`中的`application:didFinishLaunchingWithOptions:`中全局注册appId/appKey

{%highlight objc%}
//全局注册appId，别忘了#import "OpenShareHeader.h"
[OpenShare connectQQWithAppId:@"1103194207"];
[OpenShare connectWeiboWithAppKey:@"402180334"];
[OpenShare connectWeixinWithAppId:@"wxd930ea5d5a258f4f"];
[OpenShare connecRenrenWithAppId:@"228525" AndAppKey:@"1dd8cba4215d4d4ab96a49d3058c1d7f"];
{%endhighlight%} 

*第二步*：到`AppDelegate中`的`application:openURL:sourceApplication:annotation:`中添加整体回调：

{%highlight objc%}
//如果OpenShare能处理这个回调，就调用block中的方法，如果不能处理，就交给其他（比如支付宝）。
if ([OpenShare handleOpenURL:url]) {
	return YES;
}
{%endhighlight%}   

*第三步*：在需要分享、OAuth的地方调用：

{%highlight objc%}
//比如微信登录，其他登录可以参考文档或者代码，或者让Xcode自动提示。
[OpenShare WeixinAuth:@"snsapi_userinfo" Success:^(NSDictionary *message) {
	ULog(@"微信登录成功:\n%@",message);
} Fail:^(NSDictionary *message, NSError *error) {
	ULog(@"微信登录失败:\n%@\n%@",message,error);
}];
//分享纯文本消息到微信朋友圈，其他类型可以参考示例代码
OSMessage *msg=[[OSMessage alloc]init];
msg.title=@"Hello msg.title";
[OpenShare shareToWeixinTimeline:msg Success:^(OSMessage *message) {
	ULog(@"微信分享到朋友圈成功：\n%@",message);
} Fail:^(OSMessage *message, NSError *error) {
	ULog(@"微信分享到朋友圈失败：\n%@\n%@",error,message);
}];
{%endhighlight%}

##扩展支持更多平台

现在的社交网络各种各样，如何把这些平台集成到OpenShare中呢？就像插件一样，可以把自己实现的`OpenShare+foobar.h`和`OpenShare+foobar.m`添加进来就可以了。[这里](http://openshare.gfzj.us/#plugins)提供了一个模板工具，只需要输入你想扩展的平台的名称，就会自动生成`.h`和`.m`文件，然后基于这个模板修改即可。
