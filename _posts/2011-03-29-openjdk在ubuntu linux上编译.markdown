---
layout: post
title: "openjdk在ubuntu linux上编译"
date: 2011-03-29 23:17:54
category: tech
by: gf
description: linux版本：sin@sin-desktop:~/openjdk/build/linux-amd64/bin$uname-aLinuxsin-desktop2.6.32-30-generic#59-UbuntuSMPTueMar121:30:46UTC2011x86_64GNU/Li
permalink: /tech/8.html
---
linux版本： sin@sin-desktop:~/openjdk/build/linux-amd64/bin$ uname -aLinux sin-desktop 2.6.32-30-generic \#59-Ubuntu SMP Tue Mar 1 21:30:46 UTC 2011 x86\_64 GNU/Linux openjdk版本：openjdk-7-ea-src-b133-10\_mar\_2011.zip 然后就可以make以下，看看缺什么少什么，一样样的来。   alsa-driver/alsa-lib和cpus都很容易就configure&&make&&make install了。但是freetype让我费了很大劲，最后还是通过： sudo apt-get install libfreetype6 sudo apt-get install libfreetype6-dev 还有几个需要安装的： sudo apt-get install libx11-dev //sudo apt-get install libxt-dev libxaw7-dev   不确定是佛必须 sudo apt-get install xorg-dev 有JAVA\_HOME的时候会出问题。所以make以前要先： unset JAVA\_HOME 然后， export LANG=C ALT\_BOOTDIR=/usr/lib/jvm/java-6-sun 然后就是 make ALLOW\_DOWNLOADS=true 此处必须有ALLOW\_DOWNLOADS=true。否则编译jaxp的时候会出错，因为jaxp的源代码是临时下载的。 [关于编译的warning和log，可以看附件。][warning_log]  


[warning_log]: http://liuguangfeng.googlecode.com/files/buildjdk.tar.gz
