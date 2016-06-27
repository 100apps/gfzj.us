---
layout: post
title: "iOS应用内部发布"
date: 2014-12-10 11:00:47
category: tech
by: gf
description: 通过Safari安装内测版的iOS应用
---
开发了一个应用，如果想让内部的人参与测试，除了官方推荐的[testflight](https://developer.apple.com/app-store/testflight/)以外，还可以通过Safari直接安装。这样更加方便，只需要扫描一个二维码即可。由于开发者账号类型不同也分两种情况：

#企业版账号
这个没什么好说的，直接可以打包分发，直接把ipa上传到<http://fir.im>即可。只是每年需要299$。

#个人版账号
和企业版唯一的区别是需要先获得用户的udid，然后把udid打包到应用里面，该设备才能通过Safari点击安装。获取方法也不难，比如：<http://fir.im/udid>,对于Xcode 6+,需要先进入<https://developer.apple.com/account/ios/device/deviceList.action>添加设备，然后编辑`XC Ad Hoc: *`的Provisioning Profile，把新增加都设备添加进来。然后用xcode archive就可以了。如果出现证书问题，直接点击*try again*。