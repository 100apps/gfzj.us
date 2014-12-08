---
layout: post
title: "google处理location.hash"
date: 2012-08-15 09:04:08
category: tech
by: gf
description: google蜘蛛到底有多强？看一个搜索结果http://www.google.com.hk/search?q=nexus%207搜索结果中的url带#的。都是带hash的，对服务器而言，http://www.google.com/nexus/#/7和http
permalink: /tech/42.html
---
google蜘蛛到底有多强？看一个搜索结果 http://www.google.com.hk/search?q=nexus%207 搜索结果中的url带\#的。都是带hash的，对服务器而言，http://www.google.com/nexus/\#/7和http://www.google.com/nexus/\#/galaxy是同一个url。通过http://tools.ietf.org/html/rfc2616我们可以知道，通常情况下，客户端是不会把\#后面的发送到服务器，可以试一下curl是如何处理的：

``````````
root@localhost:~# curl -Iv http://www.google.com/nexus/#/galaxy
* About to connect() to www.google.com port 80 (#0)
*   Trying 2001:4860:800a::69... connected
> HEAD /nexus/ HTTP/1.1
> User-Agent: curl/7.22.0 (i686-pc-linux-gnu) libcurl/7.22.0 OpenSSL/1.0.1 zlib/1.2.3.4 libidn/1.23 librtmp/2.3
> Host: www.google.com
> Accept: */*
``````````

或者我们看看chrome浏览器如何处理

``````````
zenith@MacBook:/sshfs/bbs/opt/myservice$ nc -lv 8888
Connection from 127.0.0.1 port 8888 [tcp/*] accepted
GET /path HTTP/1.1
Host: localhost:8888
Connection: keep-alive
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.19 (KHTML, like Gecko) Ubuntu/12.04 Chromium/18.0.1025.168 Chrome/18.0.1025.168 Safari/535.19
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Encoding: gzip,deflate,sdch
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3
``````````

服务器根本就不知道\#后面的东西。因为客户端没有发送，按照规范，也不会发送。 所以区别\#的只有客户端，比如浏览器，文档加载完以后定位到相应的元素。js可以用location.hash获取，然后做相应处理。所以就出现一个问题，制作对同一个url识别出不同的内容。基本上只能靠解析javascript和解析处理后的dom。这基本是一个技术问题吧，所以google蜘蛛处理js的能力可见一斑。 实际上对于\#!格式，google爬虫会转义。这需要服务器的配合。https://developers.google.com/webmasters/ajax-crawling/docs/specification 但是文档中并没有说明\#格式的处理。所以有了以上猜测：这是google爬出自己处理的结果。