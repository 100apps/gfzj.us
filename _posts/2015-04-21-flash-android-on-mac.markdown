---
layout: post
title: "在Mac上给android刷机"
date: 2015-04-21 13:50:24
category: tech
by: gf
description: 前两天在淘宝上买了个nexus 6，下载了官方Rom，想刷机，但是遇到一些问题，纪录一下。
---
前两天在淘宝上买了个nexus 6，下载了官方Rom，想刷机，但是遇到一些问题，纪录一下。

#准备工具

首先Mac上面是不需要安装android驱动的。但是需要`fastboot`和`adb（可选）`。这个可以通过下载：

	https://dl-ssl.google.com/android/repository/platform-tools_r22-macosx.zip
	#其中r22是API版本号，查版本号：
	http://source.android.com/source/build-numbers.html

同样的，其他平台，也可以这样下载，具体可以通过下面的地址查询。

	https://dl.google.com/android/repository/repository-10.xml

所以刷机是不需要下载android sdk的。

#解锁bootloader

如果已经可以用`adb`连接手机，那么直接运行：
	
	adb reboot bootloader

> 如果运行adb devices看不到自己的设备，可能是没有开启「开发者选项」。如果在「设置」里面看不到，可以到「关于手机」，点击7下「版本号」，就出来了。

如果不想用adb重启，可以直接关机，按住电源键＋声音下，就进入bootloader了。

这时候看看手机上的显示，device是否unlock，如果是locked，就运行：

	fastboot oem unlock
	#终于用上这货了。

#刷系统
从[Google官方Factory Images for Nexus Devices](https://developers.google.com/android/nexus/images)下载最新的系统，然后解压。按照传统方法，直接运

	./flash-all.sh

但是奇怪的是刷5.1的时候会报错：

	target reported max download size of 536870912 bytes
	archive does not contain 'boot.sig'
	archive does not contain 'recovery.sig'
	fastboot(1742,0xa03021a8) malloc: *** mach_vm_map(size=1779851264) failed (error code=3)
	*** error: can't allocate region
	*** set a breakpoint in malloc_error_break to debug
	failed to allocate 1778070480 bytes
	error: update package missing system.img

看样子，难道是因为`image-shamu-lmy47i.zip`太大了？既然这样就只能手动一个个的刷了。首先解压`image-shamu-lmy47i.zip`,然后依次运行

	fastboot flash bootloader bootloader-shamu-moto-apq8084-71.08.img
	fastboot reboot-bootloader
	fastboot flash radio radio-shamu-d4.0-9625-02.95.img
	fastboot reboot-bootloader
	fastboot flash system system.img
	fastboot flash userdata userdata.img 
	fastboot flash boot boot.img

然后用音量键，选择"Recoery"，点击电源键，重启。此时会进入一个android小图标，没有其他显示，不要怕，短按 音量键上＋电源键。如果没反应，就松手，继续按几下，不出意外应该就会进入recovery模式了。选择
`Wipe data/factory data reset"`，然后重启。这次重启可能持续的时候会比较长（我的手机用了大概2分钟）。