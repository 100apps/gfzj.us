---
layout: post
title: "Fiddler调试java http(s)程序"
date: 2013-11-16 10:13:07
category: tech
by: gf
keyword: java,ssl,安全,http
description: Fiddler真是程序员必备神器之一，不用windows的同学，完全可以用个virtualbox搞定。用来调试网页，用firefox、Chrome之类的就不用说了。遇到https的时候，直接导入fiddler声称在De
permalink: /tech/103.html
---
[Fiddler][]真是程序员必备神器之一，不用windows的同学，完全可以用个virtualbox搞定。用来调试网页，用firefox、Chrome之类的就不用说了。遇到https的时候，直接导入fiddler声称在Desktop上的证书，就能监控加密过的数据传输过程了。现在遇到的有个java程序，用了https协议和服务器通信，并且这个java程序也已经生成了exe，不能添加启动参数，也更不可能更改源代码。这是应该怎样监控https连接呢？

#  # STEP1：修改jre/lib/net.properties ##

通过这个配置文件，我们可以修改jvm默认的网络连接方式，配置默认使用http(s)代理

    http.proxyHost=127.0.0.1
     http.proxyPort=8888
     https.proxyHost=127.0.0.1
     https.proxyPort=8888

#  # STEP2:添加证书 ##

默认情况下，jvm信任的证书存放在jre/lib/security/cacerts下面。现在需要把fiddler生成的证书导入到这个默认信任列表里面。

    bin/keytool -keystore lib/security/cacerts -storepass changeit -importcert -file ~/Downloads/FiddlerRoot.cer

在mac/linux下面可能需要sudo，你懂得。

这样启动程序就能在fiddler中监控了。 ![Fiddler监控https][Fiddler_https]

#   如果可以修改程序，但是不能修改jvm配置文件 #

比如，我们不想影响其他程序，或者我们根本没有权限修改jvm配置文件，但是程序是我们自己写的。这时候我们可以通过修改程序，来使用Fiddler。

#  # STEP1:导出证书 ##

    "JDK_HOME\\bin\\keytool.exe" -import -file C:\\Users\\user\\Desktop\\FiddlerRoot.cer -keystore fiddlerkeystore -alias Fiddler

#  # STEP2:配置实用代理 ##

    //设置使用代理
      System.setProperty("http.proxyHost", "172.16.3.226");
      System.setProperty("https.proxyHost", "172.16.3.226");
      System.setProperty("http.proxyPort", "8888");
      System.setProperty("https.proxyPort", "8888");
      //配置证书位置
      System.setProperty("javax.net.ssl.trustStore", "path\\to\\FiddlerKeystore");
      System.setProperty("javax.net.ssl.trustStorePassword", "Password");

当然，也可以通过java -D传递以上参数。如果有没有源代码的话。

#  # STEP0:另外一种方法就是直接让jvm忽略证书验证,就像curl -k参数 ##

    直接google出来的源代码，贴过来吧：java ssl ignore certificate validation

--------------------

update 2013年11月23日16:14:59

用 [Charles][]可以监控socks，而且支持SSL。比Fiddler更牛叉。

update 2014年07月15日16:08:10

今天从stackoverflow上发现两个新的参数：

    System.setProperty("sun.security.ssl.allowUnsafeRenegotiation", "true");       
    System.setProperty("javax.net.debug","all");

update Wed Dec 17 14:12:26 CST 2014

设置socks proxy

	System.setProperty("socksProxyHost", "127.0.0.1");
	System.setProperty("socksProxyPort", "8889");

[Fiddler]: http://fiddler2.com/
[Fiddler_https]: /gfzjus_blog/tech/2014-10-22/4728bd11b921c30906926f31b87093d6.png
[Charles]: http://www.charlesproxy.com/documentation/using-charles/ssl-certificates/
