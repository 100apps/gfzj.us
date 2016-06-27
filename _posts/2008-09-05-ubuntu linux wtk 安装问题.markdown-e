---
layout: post
title: "ubuntu linux wtk 安装问题"
date: 2008-09-05 22:49:00
category: tech
by: gf
description: 0.报错说：FailedtoextractJavaVersionTesterclass解决方案：依次执行LANG2=$LANGLANG=sv_SE.ISO8859-1.wtk.bin(下载下来的wtk）一步步安装就可以了。1.报错说：
permalink: /tech/181.html
---
0.报错说：Failed to extract JavaVersionTester class  
解决方案：依次执行  
LANG2=$LANG  
LANG=sv\_SE.ISO8859-1  
. wtk.bin(下载下来的wtk）  
一步步安装就可以了。  
1.报错说：  
**Exception** in **thread** " **AWT-EventQueue-0**" **java.lang.NullPointerException**  
    
   at com.sun.java.swing.plaf.gtk.GTKLookAndFeel.initSystemColorDefaults(GTKLookAndFeel.java:1267)  
    at com.sun.java.swing.plaf.gtk.GTKLookAndFeel.loadStyles(GTKLookAndFeel.java:1509)  
    at com.sun.java.swing.plaf.gtk.GTKLookAndFeel.access$000(GTKLookAndFeel.java:37)  
    at com.sun.java.swing.plaf.gtk.GTKLookAndFeel$WeakPCL$1.run(GTKLookAndFeel.java:1449)  
    at java.awt.event.InvocationEvent.dispatch(InvocationEvent.java:209)  
    at java.awt.EventQueue.dispatchEvent(EventQueue.java:597)  
    at java.awt.EventDispatchThread.pumpOneEventForFilters(EventDispatchThread.java:273)  
    at java.awt.EventDispatchThread.pumpEventsForFilter(EventDispatchThread.java:183)  
    at java.awt.EventDispatchThread.pumpEventsForHierarchy(EventDispatchThread.java:173)  
    at java.awt.EventDispatchThread.pumpEvents(EventDispatchThread.java:168)  
    at java.awt.EventDispatchThread.pumpEvents(EventDispatchThread.java:160)  
    at java.awt.EventDispatchThread.run(EventDispatchThread.java:121)  
  
    如果通过命令行直接启动WTK会遇到如下情况：  
(<unknown>:14996): Gtk-WARNING \*\*: Attempting to add a widget with type GtkButton to a GtkComboBoxEntry (need an instance of GtkEntry or of a subclass)  
  
(<unknown>:14996): Gtk-CRITICAL \*\*: gtk\_widget\_realize: assertion \`GTK\_WIDGET\_ANCHORED (widget) || GTK\_IS\_INVISIBLE (widget)' failed  
  
(<unknown>:14996): Gtk-CRITICAL \*\*: gtk\_paint\_box: assertion \`style->depth == gdk\_drawable\_get\_depth (window)' failed  
  
(<unknown>:14996): Gtk-CRITICAL \*\*: gtk\_paint\_box: assertion \`style->depth == gdk\_drawable\_get\_depth (window)' failed  
  
   这些错误是应用WTK及其模拟器采用了Java中的UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());语句来使用系统自身的lookandfeel，而 **Ubuntu**系统中没有安装对应的主题导致的错误，而目前本人并没有在安装包中找到相关的主题安装内容（注意：不代表不存在，只是本人没有找到而已），如果有哪位同行找到也请发布上来，谢谢。  
    在当前情况下如何解决这一个问题是关键，这里本人给出了如下解决办法：  
    首先找到你的WTK的安装目录，在bin中找到ktoolbar和emulator这两个文件，这两个是启动WTK和Emulator的两个启动文件，使用vi或者gedit来对这两个文件进行编辑，在两个文件中的相关位置添加如下一行即可：  
   －Dswing.systemlaf="javax.swing.plaf.metal.MetalLookAndFeel" \\\\  
    添加后的ktoolbar如下(注意红色标注的那行即可)：  
![5f9f56339934dcadc0c149928814263d.gif][]\#!/bin/sh  
![5f9f56339934dcadc0c149928814263d.gif][]  
![5f9f56339934dcadc0c149928814263d.gif][]javapathtowtk=/usr/java/jdk1.6.0\_05/bin/  
![5f9f56339934dcadc0c149928814263d.gif][]  
![5f9f56339934dcadc0c149928814263d.gif][]PRG=$0  
![5f9f56339934dcadc0c149928814263d.gif][]  
![5f9f56339934dcadc0c149928814263d.gif][]\# Resolve soft links  
![5f9f56339934dcadc0c149928814263d.gif][]while \[ -h "$PRG" \]; do  
![5f9f56339934dcadc0c149928814263d.gif][]     ls=\`/bin/ls -ld "$PRG"\`  
![5f9f56339934dcadc0c149928814263d.gif][]     link=\`/usr/bin/expr "$ls" : '.\*-> (.\*)$'\`  
![5f9f56339934dcadc0c149928814263d.gif][]    if /usr/bin/expr "$link" : '^/' > /dev/null 2>&1; then  
![5f9f56339934dcadc0c149928814263d.gif][]         PRG="$link"  
![5f9f56339934dcadc0c149928814263d.gif][]    else  
![5f9f56339934dcadc0c149928814263d.gif][]         PRG="\`/usr/bin/dirname $PRG\`/$link"  
![5f9f56339934dcadc0c149928814263d.gif][]     fi  
![5f9f56339934dcadc0c149928814263d.gif][]done  
![5f9f56339934dcadc0c149928814263d.gif][]  
![5f9f56339934dcadc0c149928814263d.gif][]KVEM\_BIN=\`dirname $PRG\`  
![5fd353a0c9e01ebe82f863e803d8bce1.gif][] ![914da57c5f34f76ae7e90ca99e06389a.gif][]KVEM\_HOME=\`cd $...\{KVEM\_BIN\}/.. ; pwd\`  
![5f9f56339934dcadc0c149928814263d.gif][]KVEM\_LIB="$\{KVEM\_HOME\}/wtklib"  
![5f9f56339934dcadc0c149928814263d.gif][]KVEM\_API="$\{KVEM\_HOME\}/lib"  
![5f9f56339934dcadc0c149928814263d.gif][]export MMAPI\_GM\_SOUNDBANK="$\{KVEM\_API\}/soundbank.dls"  
![5f9f56339934dcadc0c149928814263d.gif][]  
![5f9f56339934dcadc0c149928814263d.gif][]"$\{javapathtowtk\}java" -Dkvem.home="$\{KVEM\_HOME\}" \\\\  
![5f9f56339934dcadc0c149928814263d.gif][]    -Djava.library.path="$\{KVEM\_HOME\}/bin" \\\\  
![5f9f56339934dcadc0c149928814263d.gif][]    -Dswing.systemlaf="javax.swing.plaf.metal.MetalLookAndFeel" \\\\  
![5f9f56339934dcadc0c149928814263d.gif][]    -cp "$\{KVEM\_LIB\}/kenv.zip:$\{KVEM\_LIB\}/ktools.zip:$\{KVEM\_BIN\}/JadTool.jar:$\{KVEM\_BIN\}/MEKeyTool.jar:$\{KVEM\_LIB\}/customjmf.jar:$\{KVEM\_API\}/ **j2me**\-ws.jar:$\{KVEM\_BIN\}/schema2beansdev.jar:$\{KVEM\_BIN\}/j2me\_sg\_ri.jar:$\{KVEM\_BIN\}/jaxrpc-impl.jar:$\{KVEM\_BIN\}/jaxrpc-api.jar:$\{KVEM\_BIN\}/jaxrpc-spi.jar:$\{KVEM\_BIN\}/activation.jar:$\{KVEM\_BIN\}/mail.jar:$\{KVEM\_BIN\}/saaj-api.jar:$\{KVEM\_BIN\}/saaj-impl.jar:$\{KVEM\_BIN\}/xsdlib.jar:$\{KVEM\_LIB\}/nist-sip-1.2.jar:$\{KVEM\_LIB\}/JainSipApi1.1.jar:$\{KVEM\_LIB\}/jain-sip-presence-proxy.jar"  
![5f9f56339934dcadc0c149928814263d.gif][]     com.sun.kvem.toolbar.Main "$@"  
修改后的emulator文件内容如下：  
![5f9f56339934dcadc0c149928814263d.gif][]\#!/bin/sh  
![5f9f56339934dcadc0c149928814263d.gif][]  
![5f9f56339934dcadc0c149928814263d.gif][]javapathtowtk=/usr/java/jdk1.6.0\_05/bin/  
![5f9f56339934dcadc0c149928814263d.gif][]  
![5f9f56339934dcadc0c149928814263d.gif][]PRG=$0  
![5f9f56339934dcadc0c149928814263d.gif][]  
![5f9f56339934dcadc0c149928814263d.gif][]\# Resolve soft links  
![5f9f56339934dcadc0c149928814263d.gif][]while \[ -h "$PRG" \]; do  
![5f9f56339934dcadc0c149928814263d.gif][]     ls=\`/bin/ls -ld "$PRG"\`  
![5f9f56339934dcadc0c149928814263d.gif][]     link=\`/usr/bin/expr "$ls" : '.\*-> (.\*)$'\`  
![5f9f56339934dcadc0c149928814263d.gif][]    if /usr/bin/expr "$link" : '^/' > /dev/null 2>&1; then  
![5f9f56339934dcadc0c149928814263d.gif][]         PRG="$link"  
![5f9f56339934dcadc0c149928814263d.gif][]    else  
![5f9f56339934dcadc0c149928814263d.gif][]         PRG="\`/usr/bin/dirname $PRG\`/$link"  
![5f9f56339934dcadc0c149928814263d.gif][]     fi  
![5f9f56339934dcadc0c149928814263d.gif][]done  
![5f9f56339934dcadc0c149928814263d.gif][]  
![5f9f56339934dcadc0c149928814263d.gif][]KVEM\_BIN=\`dirname "$PRG"\`  
![5f9f56339934dcadc0c149928814263d.gif][]KVEM\_HOME=\`cd "$\{KVEM\_BIN\}/.." ; pwd\`  
![5f9f56339934dcadc0c149928814263d.gif][]KVEM\_LIB="$\{KVEM\_HOME\}/wtklib"  
![5f9f56339934dcadc0c149928814263d.gif][]export MMAPI\_GM\_SOUNDBANK="$\{KVEM\_HOME\}/lib/soundbank.dls"  
![5f9f56339934dcadc0c149928814263d.gif][]  
![5f9f56339934dcadc0c149928814263d.gif][]"$\{javapathtowtk\}java" -Dkvem.home="$\{KVEM\_HOME\}" \\\\  
![5f9f56339934dcadc0c149928814263d.gif][]    -Djava.library.path="$\{KVEM\_HOME\}/bin" \\\\  
![5f9f56339934dcadc0c149928814263d.gif][]    -Dswing.systemlaf="javax.swing.plaf.metal.MetalLookAndFeel" \\\\  
![5f9f56339934dcadc0c149928814263d.gif][]    -cp "$\{KVEM\_LIB\}/kenv.zip:$\{KVEM\_LIB\}/ktools.zip:$\{KVEM\_LIB\}/customjmf.jar"  
![5f9f56339934dcadc0c149928814263d.gif][]     com.sun.kvem.environment.EmulatorWrapper "$@" 0  
好了，大功告成，现在可以运行WTK和Emulator了，而且还是中文的


[5f9f56339934dcadc0c149928814263d.gif]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/5f9f56339934dcadc0c149928814263d.gif
[5fd353a0c9e01ebe82f863e803d8bce1.gif]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/5fd353a0c9e01ebe82f863e803d8bce1.gif
[914da57c5f34f76ae7e90ca99e06389a.gif]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/914da57c5f34f76ae7e90ca99e06389a.gif