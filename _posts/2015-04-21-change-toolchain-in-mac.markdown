---
layout: post
title: "mac中切换构建工具链(toolchain)"
date: 2015-04-21 17:05:10
category: tech
by: gf
description: 有的时候我们的mac安装了多个版本的工具链，比如不同版本的xcode，不同版本的jdk。我们想临时指定使用特定版本，但是又不影响整个系统，这时候可以用几个特殊的环境变量控制。
---

今天编译jdk9的时候，根据<http://hg.openjdk.java.net/jdk9/jdk9/raw-file/6c9904922128/README-builds.html>，需要使用*XCode 5.1.1 or newer*，很明显，官方是在XCode 5.1.1下编译的。但是我的电脑用了xcode 6.3，编译器版本都不一样了，很容易fail，所以需要切换XCode 5.1.1 的环境。

以前都用`xcode-select`命令，但是今天这货死活不起作用，switch以后，在print一下，还是原来的路径。无意中man 了一下，发现里面有一段：

	 -s <path>, --switch <path>
	              Sets the active developer directory to the given path, for exam-
	              ple /Applications/Xcode-DP.app. This command must  be  run  with
	              superuser  permissions  (see sudo(8)), and will affect all users
	              on the system. To set the path without superuser permissions  or
	              only  for the current shell session, use the DEVELOPER_DIR envi-
	              ronment variable instead (see ENVIRONMENT).

看来官方想得很周到，可以用`DEVELOPER_DIR`环境变量控制，真是峰回路转！

果断运行:

	export DEVELOPER_DIR=/Developer/Xcode5.1.1.app/Contents/Developer/

然后运行：

	gcc -v

果然gcc版本变了！

但是还有个问题，我的电脑上安装了jdk7和jdk8，编译jdk9需要jdk8，这时候通过：

	export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)

来临时指定用jdk8，再运行`java -version`试试，版本已改。

所以要想在Yosemite下编译jdk9，只需要：

1. 下载XCode 5.1.1(官方地址：<https://developer.apple.com/downloads/index.action> 需要开发者账号)
2. 下载xquartz 2.7.5(下载地址：<http://xquartz.macosforge.org/trac/wiki/Releases>,注意版本)
3. 设置DEVELOPER_DIR和JAVA_HOME
4. config：./configure --enable-debug --with-target-bits=64 --with-freetype=/usr/X11
5. make JOBS=2

Mac下面还有几个特殊的跟构建工具链有关的变量：

	DEVELOPER_DIR=$(xcode-select -print-path)
	export PATH=$(/usr/sbin/sysctl -n user.cs_path):${DEVELOPER_DIR}/bin:${DEVELOPER_DIR}/sbin
	export MACOSX_DEPLOYMENT_TARGET=$(sw_vers -productVersion | cut -d. -f-2)
	export SDKROOT=$(xcodebuild -version -sdk macosx${MACOSX_DEPLOYMENT_TARGET} | sed -n '/^Path: /s///p')
	export CC=$(xcrun -find gcc)
	export CXX=$(xcrun -find g++)
	export CPPFLAGS="-isysroot ${SDKROOT}"
	export LDFLAGS="-Wl,-syslibroot,${SDKROOT}"

