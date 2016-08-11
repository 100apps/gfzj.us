---
layout: post
title: "AppleScript解决自动连接ADSL的问题"
date: 2014-05-20 17:25:18
category: tech
by: gf
description: 这个问题困扰了好几年，始终没有解决好。就是：很多情况下，我们需要重连adsl，以获得一个新ip，比如采集某些网站的时候，linux和window下面都可以很方便的切换，但是mac却不行mac连接也
permalink: /tech/135.html
---
这个问题困扰了好几年，始终没有解决好。就是：

> 很多情况下，我们需要重连adsl，以获得一个新ip，比如采集某些网站的时候，linux和window下面都可以很方便的切换，但是mac却不行

mac连接也是用 [ppp][]这个改造过的开源程序，[apple公布了源代码][apple]，自己编译的话，有好几个依赖关系，懒得弄了，今天用AppleScript很方便的解决了：

    #!/bin/bash
    osascript <<'END'
    tell application "System Events"
     tell network preferences
      connect service "PPPoE"
     end tell
    end tell
    END

同样，断开连接。我们可以用killadd pppd但是，需要root权限，所以还是用AppleScript：

    #!/bin/bash
    osascript <<'END'
    tell application "System Events"
     tell network preferences
      disconnect service "PPPoE"
     end tell
    end tell
    END

当然AppleScript，这个mac下的按键精灵，还可以实现很多快捷功能，比如你去上厕所，打开屏保：

    osascript -e 'tell application id "com.apple.ScreenSaver.Engine" to launch'

#  # 写一个小脚本，可以在命令行里面链接和断开 ##

    #!/bin/bash
    if [ x$1 = "xdis" ] 
    then
    
    osascript <<'END'
    tell application "System Events"
     tell network preferences
      disconnect service "PPPoE"
     end tell
    end tell
    END
    
    else
    
    osascript <<'END'
    tell application "System Events"
     tell network preferences
      connect service "PPPoE"
     end tell
    end tell
    END
    
    fi


[ppp]: https://ppp.samba.org/
[apple]: https://opensource.apple.com/release/mac-os-x-1085/
