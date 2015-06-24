---
layout: post
title: "Charles Web Debugging Proxy Hacking"
date: 2015-06-24 10:57:33
category: tech
by: gf
description: 破解Charles Web Debugging Proxy
---
[Charles Web Debugging Proxy](http://www.charlesproxy.com/)可能是最好用的网络代理，用Java写的，跨平台。用起来比Fiddler顺手很多，而且更强大。由于是Java写的，所以更容易「破解」。

对于Java反编译，[jad](https://en.wikipedia.org/wiki/JAD_%28JAva_Decompiler%29)已经过时了。强烈推荐[jadx](https://github.com/skylot/jadx)，设置好参数，几乎可以完美反编译Charles的Licence.class。

![jadx setting](/images/jadx-setting.png)

`Licence.java`是一个独立类，没有引用其他第三方文件，所以调试起来非常方便。虽然有了代码，但是想做一个「注册机」还是有难度的。各种位操作眼花缭乱，还不如直接在验证函数上返回`true`，然后替换原有的Licence.class更省事儿。

>一下操作仅适用于`3.10.1`，其他版本请自行解决，方法类似。


{%highlight bash%}
#0 如果已经安装了其他版本，请先移除
rm -rf /Applications/Charles.app

#1. 下载3.10.1并安装
wget http://www.charlesproxy.com/assets/release/3.10.1/charles-proxy-3.10.1-applejava.dmg
open charles-proxy-3.10.1-applejava.dmg
cp -r /Volumes/Charles\ Proxy\ v3.10.1/Charles.app /Applications/
#测试一下，打开试用版，确认可以打开(必选步骤)
open /Applications/Charles.app
#现在可以退出Charles了。

#2 替换Licence
cd /Applications/Charles.app/Contents/Resources/Java/
wget https://raw.githubusercontent.com/100apps/charles-hacking/master/Licence.java
javac -source 1.6 -target 1.6 -d . Licence.java
jar -uvf charles.jar com/xk72/charles/gui/Licence*
rm -rf com
rm Licence.java
open /Applications/Charles.app
#此时启动的是已经注册过的版本了。

{%endhighlight%}

如果你不想自己DIY，可以拿我做好的`charles.jar`替换即可。

{%highlight bash%}
wget https://raw.githubusercontent.com/100apps/charles-hacking/master/charles.jar -O /Applications/Charles.app/Contents/Resources/Java/charles.jar
{%endhighlight%}

#额外收获

研究Charles破解的过程中，学习了java的`-agentpath`参数。并且体会到了[btrace](https://github.com/jbachorik/btrace)的强大功能。

{%highlight java%}
import com.sun.btrace.annotations.*;
import static com.sun.btrace.BTraceUtils.*;

// @BTrace annotation tells that this is a BTrace program
@BTrace
public class HelloWorld {

    // @OnMethod annotation tells where to probe.
    // In this example, we are interested in entry
    // into the Thread.start() method.
    @OnMethod(
        // clazz="/.*\\.Licence/",
        // method="/.*/"

        // clazz="com.xk72.charles.gui.Licence",

        clazz="/com.xk72.*/",
        method="/.*/"

    )
    public static void func(@Self Object self, @ProbeClassName String pcn, @ProbeMethodName String pmn) {
        println(self+"\t"+pcn+"\t"+pmn);
    }

}
{%endhighlight%}

注意btrace现在的版本还不能在oracle jvm over mac上运行，可以参考：<https://github.com/jbachorik/btrace/pull/128>
