---
layout: post
title: "charles破解 sn 注册码"
date: 2014-12-20 13:32:08
by: gf
description: charles是一个非常好用的跨平台代理工具，比fiddler功能更多，支持socks代理。
---
# update 2016.8.24
for charles 4.0, just download [charlse](https://charles-52f.kxcdn.com//release/4.0/charles-proxy-4.0.dmg) and drag Charles to /Application. replace `charles.jar` with:
	
	curl -Lv "https://github.com/100apps/charles-hacking/blob/master/charles.jar?raw=true" -o /Applications/Charles.app/Contents/Java/charles.jar

if you're running charles on windows or linux, just download [charles.jar](https://github.com/100apps/charles-hacking/blob/master/charles.jar?raw=true) and replace the original *charles.jar*.

Or, you can hack it by:

```bash
charles=/Applications/Charles.app/Contents/Java/charles.jar
dir=charleshack

mkdir $dir
cd $dir
cat >> License.java <<EOF
package com.xk72.charles;
public final class License {
	public static boolean a() { return true; }
	public static String b() { return "http://www.gfzj.us"; }
	public static String a(String name, String key) { return null; }
}
EOF
javac -encoding UTF-8 License.java -d .&& jar -uvf $charles com/xk72/charles/License.class
cd .. && rm -rf $dir
```

#  update 2015.10.29

for charles 3.11.1, just download [charlse](http://www.charlesproxy.com/assets/release/3.11.1/charles-proxy-3.11.1.dmg) and drag Charles to /Application. replace `charles.jar` with:
	
	curl -Lv "https://github.com/100apps/charles-hacking/blob/master/charles.jar?raw=true" -o /Applications/Charles.app/Contents/Java/charles.jar


#  update 2015.06.24
for charles 3.10.1, please go to </tech/2015/06/24/charles-hacking.html>

[charles](http://www.charlesproxy.com/)是一个非常好用的跨平台代理工具，比fiddler功能更多，支持socks代理。
方便购买的还是请自己购买，对于学生党和屌丝党，我们可以从官方下载试用版，然后用注册码激活。

charles 3.9.3 下载地址：<br>
<http://www.charlesproxy.com/latest-release/download.do>

for mac:<br>
<http://www.charlesproxy.com/assets/release/3.9.3/charles-proxy-3.9.3-applejava.dmg>

注册码：

	Registered Name: http://ninjasaga.cheat.center
	Licence Key: 18e69f6d5bc820d4d3
	Versi: 3.9.3
