---
layout: post
title: "shell版douban音乐"
date: 2014-01-20 21:02:23
category: tech
by: gf
keyword: shell,douban
description: 最近在ipad上下载了一个豆瓣音乐的APP，默认的播放列表挺好的，但是在电脑上一直找不到这个“兆赫”，于是在air上启动charles，ipad上配置一下代理，看看请求的地址：http://www.douban
permalink: /tech/114.html
---
最近在ipad上下载了一个豆瓣音乐的APP，默认的播放列表挺好的，但是在电脑上一直找不到这个“兆赫”，于是在air上启动charles，ipad上配置一下代理，看看请求的地址：

    http://www.douban.com/j/app/radio/people?type=n&formats=aac&pt=0.0&channel=1&app_name=radio_ipad&version=2

每请求一下都是随机的，既然都有播放地址了，我们直接MPlayer一下，连浏览器也省了：

    #!/bin/sh
    while true;do echo 下载播放列表; curl "http://www.douban.com/j/app/radio/people?type=n&formats=aac&pt=0.0&channel=1&app_name=radio_ipad&version=2" |sed 's/\\\\//g'|pcregrep -o1 -o2 -o4 --om-separator=" " 'artist":"(.*?)","url":"(.*?)"(.*?)title":"(.*?)"'|tail -4|while read a b c;do echo;echo; echo 正在播放: $a-$c;echo;echo;mplayer "$b";done;done

为了方便也可以把这条命令保存到类似/usr/local/bin/douban.sh里面，这样只需要执行douban.sh就能播放了。 [![shell版douban音乐][shell_douban]][shell_douban_shell_douban] 同样，我们也可以添加其他“兆赫” 我们办公室里有个linux server，没有启动x环境，只能通过ssh连接，接个音响，也能听douban音乐了。 os x默认并没有安装mplayer、pcregrep之类的工具，缺什么就brew什么把。

### update 2014年02月24日16:38:53 ###

mac下面还可以选择声卡。比如我只把MPlayer输出到音响，默认的输出设备是耳机，这样，其他程序用默认耳机输出，就不会打扰到音响放歌了。淘宝上买usb声卡大概5块钱一个，相当便宜。

    mplayer -ao coreaudio:device_id=list a.mp3

上面的命令会显示可用的输出设备，找到对应的就可以了。

### update 2014年02月24日16:52:01 ###

两遍for的时候，MPlayer快捷键就不能用了。如果我们想用快捷键，可以用：

    while true;do echo 下载播放列表; curl "http://www.douban.com/j/app/radio/people?type=n&formats=aac&pt=0.0&channel=1&app_name=radio_ipad&version=2" |sed 's/\\\\//g'|pcregrep -o2 --om-separator=" " 'artist":"(.*?)","url":"(.*?)"(.*?)title":"(.*?)"'|tail -4 > /tmp/douban.playlist.m3u;mplayer -ao coreaudio:device_id=64 -playlist /tmp/douban.playlist.m3u;done

这样就可以用MPlayer的快捷键了：

    Basic keys: (complete list in the man page, also check input.conf)
     <-  or  ->       seek backward/forward 10 seconds
     down or up       seek backward/forward  1 minute
     pgdown or pgup   seek backward/forward 10 minutes
     < or >           step backward/forward in playlist
     p or SPACE       pause movie (press any key to continue)
     q or ESC         stop playing and quit program
     + or -           adjust audio delay by +/- 0.1 second
     o                cycle OSD mode:  none / seekbar / seekbar + timer
     * or /           increase or decrease PCM volume
     x or z           adjust subtitle delay by +/- 0.1 second
     r or t           adjust subtitle position up/down, also see -vf expand

## update 2014年04月19日13:10:57 ##

更新了添加音频输出设备id的功能

    #!/bin/sh
    
    #set device id
    device=69
    if [ $1"x" != "x" ] 
    then
     device=$1
    fi
    
    while true;do echo 下载播放列表; curl "http://www.douban.com/j/app/radio/people?type=n&formats=aac&pt=0.0&channel=1&app_name=radio_ipad&version=2" |sed 's/\\\\//g'|pcregrep -o2 --om-separator=" " 'artist":"(.*?)","url":"(.*?)"(.*?)title":"(.*?)"'|tail -4 > /tmp/douban.playlist.m3u;mplayer -ao coreaudio:device_id=$device -playlist /tmp/douban.playlist.m3u;done


[shell_douban]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/33b63611b4e0901a6cf4452a57d8704f.jpg
[shell_douban_shell_douban]: http://www.gfzj.us/wp-content/uploads/2014/01/shell版douban音乐.jpg