---
layout: post
title: "tinycore remastering on mac"
date: 2014-01-02 15:20:53
category: tech
by: gf
keyword: tinycore
description: TinyCore确实是一个不错的系统，有点像PE，或者DOS工具箱，只是TinyCore虽然体积小，但是功能全，甚至还提供了tce-ab软件仓库，就像Ubuntu上的apt-get，非常强大。最近要做一个系统，每次
permalink: /tech/112.html
---
[TinyCore][]确实是一个不错的系统，有点像PE，或者DOS工具箱，只是TinyCore虽然体积小，但是功能全，甚至还提供了tce-ab软件仓库，就像Ubuntu上的apt-get，非常强大。最近要做一个系统，每次重启都是一个新系统，没有任何cache，TinyCore真是天生就是干这事儿的。但是官方只提供三个版本，需要手动改造一下。

我们需要ssh和nginx，于是拿最小版本Core-current.iso来改造

#  # STEP 0:前期准备 ##

linux系统可以参考[官方文档(wiki:remastering)][wiki_remastering],用到的几个工具一般linux发行版都自带了。但是mac没有mkisofs，首先需要：

    brew install cdrtools

另外，要注意，mac的非系统盘分区，chown不好用。所以最好解压到系统分区的某个文件夹，解压到RAMDisk可能有问题。比如我是用的工作目录是/tmp/

#  # STEP 1:解压 ##

    hdiutil mount Core-current.iso
    cp -a /Volumes/Core/boot .
    mkdir extract
    cd extract
    sudo tar xzfv ../boot/core.gz

#  # STEP 2: 修改 ##

现在整个文件系统就已经显示在extract文件夹里面了，一般的扩展，只需从系统里面的/tmp/tcloop目录复制出来，修复一下权限即可。

首先，从光盘启动TinyCore，运行tce安装openssh，到/usr/local/etc/ssh/里面，把两个.example重命名，就可以通过sudo /usr/local/etc/init.d/openssh start启动openssh了。现在的OpenSSH是可以用的，需要把这个“固化”出来。

把/tmp/tcloop里面各自文件夹的usr合并，复制出来，合并到extract/usr里面。可以用nc+virtualbox port forward，再把/usr/local/etc/ssh/里面生成的文件复制出来，合并。

编译nginx需要先安装compiletc扩展，然后就是下载nginx源代码，然后configure和make了。make好以后，复制出来放到configure配置的--prefix里面就可以了。

修改opt/bootlocal.sh，把nginx和openssh都添加到启动项即可。

#  # STEP 3:打包 ##

现在可以重新打包core了。新建一个文件夹newiso

    mkdir newiso
    cp -r boot newiso

修改一下newiso/boot/isolinux/isolinux.cfg,把timeout改成1

    sudo chmod +w newiso/boot/isolinux/isolinux.cfg 
    sudo vi newiso/boot/isolinux/isolinux.cfg 
    sudo chmod -w newiso/boot/isolinux/isolinux.cfg

    cd extract
    find . |sudo cpio -o -H newc|gzip > ../tinycore.gz
    cp tinycore.gz newiso/boot/core.gz
    sudo mkisofs -l -J -R -V TC-custom -no-emul-boot -boot-load-size 4 -boot-info-table -b boot/isolinux/isolinux.bin  -c boot/isolinux/boot.cat -o TC-remastered.iso newiso

可以尝试用virtualbox从生成的光盘启动测试一下了。


[TinyCore]: http://distro.ibiblio.org/tinycorelinux/
[wiki_remastering]: http://wiki.tinycorelinux.net/wiki:remastering
