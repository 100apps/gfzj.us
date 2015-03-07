---
layout: post
title: "linux下恢复被rm的文件"
date: 2015-03-07 11:49:40
category: tech
by: gf
description: 今天在vps上写了一个脚本，本来要清除缓存目录下的文件，运行rm * ，目录下的go.sh也被删了。用debugfs恢复成功，记录一下。
---

今天在vps上写了一个脚本，本来要清除缓存目录下的文件，运行rm * ，目录下的go.sh也被删了。用debugfs恢复成功，记录一下。

核心是rm只删除索引，并没有删除磁盘上的文件，所以我们可以用dd直接复制出来，但是我们首先需要知道被删除的文件的位置。可以用debugfs获取。

#查看被删除文件在哪个磁盘上：

	root@localhost:/tmp/book# df -h
	Filesystem      Size  Used Avail Use% Mounted on
	devtmpfs        997M  4.0K  997M   1% /dev
	none            200M  168K  200M   1% /run
	none            5.0M     0  5.0M   0% /run/lock
	none            998M     0  998M   0% /run/shm
	none            100M     0  100M   0% /run/user
	/dev/xvda        47G   40G  5.2G  89% /

#找到inode, 尖括号里面的就是inode号


	debugfs:  ls -d /tmp/book
	 71295  (12) .    42696  (12) ..    71296  (36) html   <5179106> (16) go.sh
	 71297  (4036) pdf   <4275938> (4024) .go.sh.swp
	<4275939> (4004) .go.sh.swx


#找到offset, 其中12029952就是offset


	debugfs:  logdump -i <5179106>
	Inode 5179106 is at group 367, block 12025858, offset 128
	Journal starts at block 3753, transaction 3861264
	  FS block 12025858 logged at sequence 3861311, journal block 55 (flags 0x2)
	    (inode block for inode 5179106):
	    Inode: 5179106   Type: regular        Mode:  0755   Flags: 0x0
	    Generation: 498584329    Version: 0x00000000
	    User:     0   Group:     0   Size: 1231
	    File ACL: 0    Directory ACL: 0
	    Links: 1   Blockcount: 8
	    Fragment:  Address: 0    Number: 0    Size: 0
	    ctime: 0x54fa736f -- Sat Mar  7 11:41:35 2015
	    atime: 0x54fa6353 -- Sat Mar  7 10:32:51 2015
	    mtime: 0x54fa736f -- Sat Mar  7 11:41:35 2015
	    Blocks:  (0+1): 12029952

执行`quit`退出debugfs

#dd出来

注意bs是文件长度。估计4096比较大了，但是可以vi编辑一下就可以了。


	root@localhost:/tmp/book# dd if=/dev/xvda of=/tmp/go.rev.sh bs=4096 count=1 skip=12029952
	1+0 records in
	1+0 records out
	4096 bytes (4.1 kB) copied, 0.000407597 s, 10.0 MB/s
	root@localhost:/tmp/book# vi /tmp/go.rev.sh

