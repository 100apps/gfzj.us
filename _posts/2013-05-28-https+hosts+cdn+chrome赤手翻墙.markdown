---
layout: post
title: "https+hosts+cdn+chrome赤手翻墙"
date: 2013-05-28 22:29:16
category: tech
by: gf
keyword: https,hosts,cdn,chrome,翻墙
description: 据初步猜测，墙掉一个网站，基本上有这几种方法封ip封域名/内容过滤dns污染对于封ip，如果一个网站用了cdn，就很难封了，因为ip很多。比如google、cloudflare。这样的网站，封起来太
permalink: /tech/77.html
---
据初步猜测，墙掉一个网站，基本上有这几种方法

1.  封ip
2.  封域名/内容过滤
3.  dns污染

对于封ip，如果一个网站用了cdn，就很难封了，因为ip很多。比如google、cloudflare。这样的网站，封起来太困难了，如果把所有ip段都封了，那基本上就是撕破脸了。所以一般会采用封掉域名的方法，比如facebook/twitter/appspot都是这样挂的。

封域名/内容过滤，用http协议发送数据的时候，墙检测到你要发送的域名，然后给你过滤掉，返回空或者出错等。用https可以解决这个问题，因为墙不知道你发送的是什么数据。如果用了https，因为无法检测内容，所以墙会在dns解析的时候，返回给你错误ip，dns没有加密，所以同样虽然用了https，但由于dns解析错误，还是无法访问网站。

dns污染，最好的解决方法是本地hosts文件修改，不请求dns了。以前用just-ping.com的方法得到ip的办法局限性太大。可以用第二种方法封掉。证明：

    能打开http://just-ping.com/
    但是当我们请求的时候：http://just-ping.com/index.php?vh=savedbythegoog.appspot.com&c=&s=ping%21 就打不开了。相当于url过滤。如果just-ping提供https服务，基本上应该能解决了。

虽然just-ping不能用了。国外还是有很多提供online dns服务器的网站，google一个，比如 [http://www.dnsqueries.com/en/dns\_lookup.php][http_www.dnsqueries.com_en_dns_lookup.php]我们查询savedbythegoog.appspot.com。返回了结果：173.194.70.141。我们添加到hosts，发现可用。那就用这个ip吧。如果不能用，说明该ip被封了，可以用其他网站在测试一下，可能能找到能用ip。

明白了被封的基本原理，做一个例子。比如：[https://code.google.com/apis/ajax/playground/?type=visualization\#geo\_map][https_code.google.com_apis_ajax_playground_type_visualization_geo_map]这个打不开。解决方法如下：

#  # STEP 1:添加hosts记录 ##

我们用chrome开发工具发现，有一个域名savedbythegoog.appspot.com打不开了。所以添加记录

    173.194.70.141 savedbythegoog.appspot.com

但是比较杯具的是，173.194.70.141 savedbythegoog.appspot.com在原网页中引用的时候，居然是http协议，这样会被第二种方法封掉。所以要强制改成https。

#  # STEP 2:chrome强制https ##

用**chrome浏览器**打开chrome://net-internals/。找到左侧导航中的HSTS，点击，在"Add domain"中添加一个domain: savedbythegoog.appspot.com 。然后点击"Add"

用了这种方法，还是有问题。我们发现控制台报错

    Uncaught ReferenceError: google is not defined

这是由于chrome的安全策略，Blocking insecure content from http://。所以需要：

#  ## STEP 3:更改chrome安全策略。 ###

右键chrome的快捷方式，点击属性。然后在把目标改成类似：

    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --allow-running-insecure-content

也就是加一个--allow-running-insecure-content选项。

![chrome安全设置][chrome]

经过这三部设置。我们就可以打开google playground的了。

![google-playground][]

#  # What's more ##

用同样的思路，我们可以搞定这些奇葩网站：

![facebook-youtube][]

另外，别忘了有个前提，那就是网站用了cdn，有N多ip，粗鲁地封ip的话，影响面太广，所以存在一些能用的ip。如果一个网站没用用cdn，那就扯淡了。直接封了ip，就只能用VPN了。比如[http://www.slideshare.net/][http_www.slideshare.net]

再另外，你知道吗？当代年轻人的四项必备技能：外语、驾车、计算机、翻墙。

#  # update 2013年6月1日20:45:37 ##

昨天听说wikipedia，http可以打开，https则显示连接被重置，应该是封了端口吧，太赤裸裸了。不能过滤，索性不能打开。


[http_www.dnsqueries.com_en_dns_lookup.php]: http://www.dnsqueries.com/en/dns_lookup.php
[https_code.google.com_apis_ajax_playground_type_visualization_geo_map]: https://code.google.com/apis/ajax/playground/?type=visualization#geo_map
[chrome]: /gfzjus_blog/tech/2014-10-22/172a33d86577a031ce498b44f026e35a.png
[google-playground]: /gfzjus_blog/tech/2014-10-22/c439d2fc610fe94a9d3e3d438c916034.png
[facebook-youtube]: /gfzjus_blog/tech/2014-10-22/dac69dff53dd584e32ab232beabf585d.png
[http_www.slideshare.net]: http://www.slideshare.net/
