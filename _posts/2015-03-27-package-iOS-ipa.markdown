---
layout: post
title: "iOS应用从命令行打包分发"
date: 2015-03-27 16:38:46
category: tech
by: gf
description: 命令行打包到ipa，是持续集成的第一步，iOS应用现在一般都是用xcode图形界面打包，通过命令行和svn/git hook可以实现自动发布
---

命令行打包到ipa，是持续集成的第一步，iOS应用现在一般都是用xcode图形界面打包，通过命令行和svn/git hook可以实现自动发布。

如果只是打包*.xcodeproj，最简单了。只需要在*.xcodeproj所在目录运行`xcodebuild`就可以了。这样就会在`build/Release-iphoneos/app.app`目录生成app文件夹。下一步，用:

	xcrun -sdk iphoneos PackageApplication -v build/Release-iphoneos/app.app -o /ramdisk/xx.ipa

就可以生成xx.ipa了。然后用scp覆盖到服务器上，也是分分钟的事情。

如果对于xcworkspace，比如用了CocoaPods，生成*.app的时候需要加个参数：

	xcodebuild -workspace app.xcworkspace -scheme app -configuration Release -derivedDataPath build

在当前目录的build/Build/Products/Release-iphoneos/会生成app文件