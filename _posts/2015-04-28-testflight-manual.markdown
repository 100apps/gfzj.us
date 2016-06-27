---
layout: post
title: "testflight使用"
date: 2015-04-28 08:42:17
category: tech
by: gf
description: Apple很早就收购了testflight，现在testflight早已集成到iTunes Connect中了，方便内测。
---
description: Apple很早就收购了testflight，现在testflight早已集成到iTunes Connect中了，方便内测。。最近项目用到了testflight，记录一下使用方法。

testflight账号分两大类：

1. 内部测试员 
2. 外部测试员

# 内部测试员 

内部测试账号是从「用户和职能」中的「iTunes Connect 用户」中选择的。只有「管理」和「技术」组的「iTunes Connect 用户」才能成为「内部测试员」。内部测试账号是全局的，不能根据app来区分，而且一旦成为内部测试员，这个账号可以登录iTunes Connect查看或者管理app后台。简单的说，内部测试员必须是公司内部员工，方便自己人内测用的。

内部测试员想测试一个应用不用通过Apple的beta review，app从Xcode中上传完毕，大概等10分钟左右，以内部测试员账号登录的testfligth客户端，就能收到push消息：

![testflight 收到push消息](/images/tf-push.png)

此时内部账号就能测试了。每个内部测试账号，最多可以使用10个设备，最多可以有25个内部测试账号。

我们采用的是，所有测试设备都用同一个内部账号登录。

# 外部测试员

外部测试员只需要邮箱即可，可以给老板／客户使用，最多每个应用可以有1000个外部测试员，但是每个版本要想能邀请外部测试员，必须要通过Apple的beta review，我提交的等了2天还在waiting状态，看来还是比较慢的。如果要等一周，跟正式版review一样漫长，那就太慢了。

# 总结

testfligth使用还是很方便的，能主动push版本更新，使用简便。testflight还有统计功能，后台可以看看，哪个设备安装了哪个版本。但是testflight目前还不支持安装历史版本，一旦一个新的build上传，原来的老版本就会变得不可用，这个有时候是不科学的。

如果只是公司内部开发和测试用，还是建议用原来的打包ipa内网直接点击下载的方法，如果没有enterprise账号，因为是自己人，所以搜集udid应该也不难。而且放在内网，速度也快，方便自己控制。但是如果要展示给客户／老板看内测版本，用testfligth的「外部测试员」功能还是很方便的，只需要搜集一个邮箱即可。当然如果有enterprise账号，用testflight就纯属没麻烦给自己制造麻烦了。

