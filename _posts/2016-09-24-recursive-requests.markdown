---
layout: post
title: "请求的递归和死锁"
date: 2016-09-24 17:39:25 +800
categories: series 如何搞死服务器
by: gf
img: /images/recurrence.jpg
description: 如何搞死服务器系列之请求的递归和死锁
---

## 请求的递归

如果你的网站根目录的`index.php`中的内容是这样：

```php
<?php
echo file_get_contents("http://127.0.0.1/index.php");
?>
```

可以预想到，你的请求永远也不会停止，会卡在那里，耗尽服务器资源。因为这里产生了递归，自己请求自己，所以停止不了。很快其他所有的请求都返回502，重启php-fpm，才解决问题。

## 请求的死锁

请求自己这个错误，大家都会避免，但是还有一个情况，可能很难想到，比如：

```java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URL;
import java.util.Date;
import java.util.Scanner;
import java.util.concurrent.Executors;
import java.util.logging.Logger;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Server {
	static String fileGetContents(String url) throws IOException {
		return new Scanner(new URL(url).openStream(), "UTF-8").useDelimiter("\\A").next();
	}

	public static void main(String[] args) throws IOException {
		int nThreads = args.length > 0 ? Integer.parseInt(args[0]) : 1;
		int port = args.length > 1 ? Integer.parseInt(args[1]) : 12345;
		Logger log = Logger.getLogger("Server");

		HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

		server.createContext("/time", new HttpHandler() {
			public void handle(HttpExchange t) throws IOException {
				log.info("/time " + t.getRemoteAddress());
				String time = String.valueOf(System.currentTimeMillis());
				t.sendResponseHeaders(200, time.length());
				t.getResponseBody().write(time.getBytes("UTF-8"));
				t.close();// resource don't release if not close
			}
		});

		server.createContext("/date", new HttpHandler() {
			public void handle(HttpExchange t) throws IOException {
				log.info("/date" + " " + t.getRemoteAddress());
				String time = fileGetContents("http://127.0.0.1:" + port + "/time");
				String date = new Date(Long.parseLong(time)).toString();
				t.sendResponseHeaders(200, date.length());
				t.getResponseBody().write(date.getBytes("UTF-8"));
				t.close();
			}
		});

		server.setExecutor(Executors.newFixedThreadPool(nThreads));
		log.info("server started :" + port + " with " + nThreads + " threads");
		server.start();

	}

}

```

我们运行下面的命令启动服务器：

```bash
javac Server.java
java Server
```

然后请求：

```bash
$ curl 127.0.0.1:12345/time
1474710615204
$ curl 127.0.0.1:12345/date
#卡住，没有返回。
```

注意这里没有自己请求自己，自己请求的自己服务器上的别的url。如果我们的server启动两个线程接收请求：

```bash
java Server 2
#然后请求：
$ curl 127.0.0.1:12345/date
Sat Sep 24 17:51:39 CST 2016
```

这时候可以返回正确的结果。但是我们如果用两个线程请求：

```
$ ab -n 2 -c 2 http://127.0.0.1:12345/date
This is ApacheBench, Version 2.3 <$Revision: 1663405 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)...apr_pollset_poll: The timeout specified has expired (70007)

```

请求会卡住，没有返回。


## 分析

如果我们的服务器只有一个线程接收请求。那么随然请求的url不是自己，但是服务器也会卡在那里，实际上造成了死锁。因为/date请求等待/time返回，而/time等待/date结束才能处理并返回。

一种解决方案是，增加服务器的线程。/date请求在一个线程，/time在一个。这样大家就会都能返回。

但是如果客户端是并发请求的，还是有可能造成死锁。因为/date中发送的/time请求有可能被/date线程处理。那么这个线程肯定死锁，废掉，直到超时。

## 递归的应对

code review，递归必须有停止条件。递归没有停止条件是一个严重的程序bug。

## 死锁的应对

1. 增加server的线程数，比如服务器端预备一万个线程，那么理论上，最好的情况下可以应对客户端的5000个并发。
2. 设置超时。当/time超时，/date进入异常，释放资源。
3. 可以每个域名(或者service)用一个pool。同一个service之间不要通过http调用，而是走function。这样理论上可以防止死锁。

对于php-fpm，参考设置：

```ini
pm = dynamic
#每个child按照32M内存算。总内存/2/32 可以配置当前机器的child数目
pm.max_children = 2048
pm.start_servers = 128
pm.min_spare_servers = 100
pm.max_spare_servers = 256
pm.max_requests = 10240
request_slowlog_timeout = 3s
request_terminate_timeout = 60s
```