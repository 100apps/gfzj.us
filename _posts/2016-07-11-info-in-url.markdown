---
layout: post
title: "API的环境和版本号一定要在URL里面支持"
date: 2016-07-11 18:10:14 +800
categories: 
by: gf
img: /images/info-in-url.png
description: API是有版本的，API是有环境区别的，如何区分呢？我们最后才用了在url里区分，这里分享一下踩过的坑。
---

去年我们刚开始我们的项目的时候，app更新到第二版，出现一个问题，就是API的版本问题。我们业务变化很快，不稳定，所以需要API兼容。比如我们的app版本号是`a.b.c`，有几种兼容方案：

1. 全兼容。不分版本，后台只有一个目录，如果有新API就加新路径。不论app是什么版本，如果想要最新的API都可以轻易获得。但是有个问题，就是如果这个API想做兼容，比如某个版本返回什么，新版本返回什么，需要很多if-else判断，所以对于这种API，就采用路径区分，尽量做到老的接口的数据结构兼容不变，防止老版本app崩溃。
2. 每个版本一个目录。由于我们的业务很不稳定，原来有的功能，很可能到了新版本被砍掉了，或者完全变了。代码写在一起，很容易臃肿，所以我们想拆分版本。每上线一个版本，就放在一个目录里面。开发新版本的时候只需要把老代码拉一份出来，完全不用考虑其他版本，只要这一个版本测试OK就可以了。但是如果修改了公共方法就悲剧了。比如老版本里面有一个bug，如果这个bug在一个公共方法里面，那就惨了，所有版本都要修改。比如我们首页的四个跳转链接原来是写死在代码里了，不是从数据库里面获取的，现在要改一个icon，可能要改好几个目录，苦不堪言。
3. 兼容到中间版本。折中方案。a.b.x，对于小版本x做兼容处理。中间版本一个版本一个目录。比如2.1、2.2都是一个目录，如果我们没有开发新功能，只是bugfix，或者更新功能很小，就走小版本。

我们最终采取了方案3，但是也有个问题，就是版本区分不清，事实上，最小的版本号是用来做bugfix的，不适合在上面开发新功能。比如，我们现在又个版本是2.1.0，比如开发一个新功能，大概需要一周，如果这个版本叫做2.1.1的话，那么万一2.1.0有bug需要hotfix怎么办？该叫什么版本？2.1.0a,2.1.0b这种吗？这个问题需要提前考虑清楚。

我们后台如何区分版本呢？有几种方案：

1. 放在User-Agent里面，因为的ua里面必然有版本号，nginx正则取出来，对前后台都透明，非常方便。
2. 根据host区分。比如：v1.1.api.houpix.com这种，只需要解析*.api.houpix.com即可。nginx转发。
3. 放在路径里面api.houpix.com/v2.1/这种，nginx转发。
4. 通过http header中的accept字段区分。阮一峰的[理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful.html)推荐了这种方法。

因为1和4其时是差不多的，再加上大v的推荐，所以我们用了1，但是最后发现是个巨坑。比如，如果是js无法改变ua怎么办（方案4不存在这个问题，因为可以修改accept字段）？如果是别的系统回调怎么办？比如支付宝的回调，如何区分版本（这种系统最好做成全兼容的就不存在问题，但是前期很难全兼容）？

其实1、2、3、4其时可以同时支持。只需要在nginx里面配置一下就行了。我们现在的线上支持1和3这两种指定版本的方法。

除了版本以外，还有一个问题，就是环境。比如我们有线上环境：

```
api.houpix.com
mysql.houpix.com(仅内网访问)
redis.houpix.com(仅内网访问)
```

那么他们对应的测试环境有可能有以下几种方案：

1. 方案一

```
api.test.houpix.com
```

2. 方案二

```
test.api.houpix.com
```

3. 方案三

```
api.houpix.com（所有域名相同，通过配置局域网的dns和本机hosts实现切分）
```

4. 方案四

```
api-test.houpix.com
```

对于方案一和方案二。一个核心原因是，看待测试环境的角度。基于整个系统的角度，整个系统的线上环境是：houpix.com，那么里面有api，mysql，redis，fastdfs等等。整个系统还有测试环境test.houpix.com。或者(houpix-test.com，比建议走两个域名，坑太多，所以走了test.houpix.com)，那么，他也有api，mysql，redis，fastdfs等等。同样的dev.houpix.com这个系统，也有这些子系统。

方案二的角度是：mysql、redis这些都是一个*独立*的系统。mysql.houpix.com对应的线上，有一个测试环境test.mysql.houpix.com同样www.houpix.com有test.www.houpix.com

另外一个需要考虑的问题是https证书问题。方案三最方便。其他情况下，都需要重新搞证书（方案四支持*.houpix.com的证书通用）。

我们面临的问题有：

1. 微信支付，只能绑定一个host，不能通过host支持环境切换。开发和测试的时候需要手动改hosts文件
2. 支付宝微信支付、快递状态推送等，第三方需要回调我们的url，给我们传数据，只能制定url，其他都无法控制。
3. 开发和测试环境，原则上是不暴露给外网了。

我们最后才用了第三种方案。如何切环境呢？

1. 通过dns。我们办公室配置几个Wi-Fi热点，YuYueWorkgroup-test，YuYueWorkgroup-dev，YuYueWorkgroup-gray，连接这几个热点以后，自动切换dns，方便测试。
2. url支持制定版本，解决上面的问题2。比如api.houpix.com/env-test/v2.1/xxx，可以指定环境和版本，线上的nginx把请求转到办公室内的局域网。如果办公室有固定IP，可以指定只有线上的IP可以连接，如果没有固定IP，可以通过[ngrok](https://ngrok.com/)反向转发。

总结一下，最大的坑就是。API首先分环境，其次分版本。调用我们API的除了客户端（可以控制整个请求，很方便），还有web浏览器（控制http request能力有限），甚至是第三方服务。这三种情况都要考虑到。能满足上面三种情况的前提下，最好能固定schema和host，这样能尽量保证测试和线上环境一致，比如nginx配置文件，可以直接推上去，https证书可以直接复用，这样就只能把差异放在path里面了。

其他没有想到的，欢迎留言补充，感激不尽！

### update 2016年 8月12日 星期五 09时47分01秒 CST
上面的方案，我们自己是不区分各种环境的。但是有时候，还需要考虑和第三方交互的问题，因为部门不可能测试环境和线上环境实时同步，比如，user表就是相互独立的，在不同的环境中uid为1的用户可能完全不同。比如我们要绑定环信，这时候如果用uid绑定，一定要加前缀。同样的还有极光推送，有赞等。

另外还有cdn问题。测试环境可能不走cdn，请求的图片路径可能和线上不一样，因为图片服务器同样有测试和开发环境的区别。这时候可以通过开关开启。比如debug模式，就不走。

服务器端还有一个第三方回调的问题，通过上面的讨论，我们最终用/evn-xxx/来解决的。

# date 2016/09/24

nginx配置demo：

```
server {
       	server_name  api.houpix.com;
       	include common_server.conf;
       	include ssl/houpix.com.conf;
       	include log_rotate.conf;

       	location ~ ^/env-(.*?)/(.*)$ {
       		proxy_pass https://内网IP/$2;
       		proxy_set_header Env   	$1;
       		proxy_set_header Host api-proxy.houpix.com;
       	}

       	set $request_url $request_uri;
       	set $request_ver 2.2;

       	if ($http_user_agent ~ "houpixapp/(\d+)\.(\d+)\."){
       		set $request_ver $1.$2;
       	}

       	if ($request_url ~ "^/v(\d+)\.(\d+)/(.*)$"){
       		set $request_ver $1.$2;
       		set $request_url /$3;
       		rewrite ^/v(\d+)\.(\d+)/(.*)$ /$3;
       	}

       	root /opt/houstack/data/nginx/api.houpix.com/$request_ver/web;
       	location / {
       		try_files $uri $uri/ /index.php?$args;
       	}
       	location ~ \.php$ {
       		fastcgi_pass   unix:/opt/houstack/tmp/php-fpm-houpix.com.sock;
       		fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
       		include        fastcgi_params;
       		fastcgi_param  REQUEST_URI        $request_url;
       	}
}

#内网接收线上转发过来请求的的api-proxy.houpix.com
#测试环境来分发不通的来自线上的请求。
map $http_env $env {
       	default false;
       	"env1" 150;
       	"env2" 24;
       	"env3" 24;
}

server {
       	server_name  api-proxy.houpix.com;
       	include ssl/houpix.com.conf;
       	include common_server.conf;

       	location / {
       		proxy_pass http://192.168.50.$env;
       		proxy_set_header Host api.houpix.com;
       	}
}


```