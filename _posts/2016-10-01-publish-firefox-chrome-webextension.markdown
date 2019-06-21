---
layout: post
title: "firefox/chrome extension开发"
date: 2016-10-01 17:10:31 +800
categories: 
by: gf
description: 开发了一个简单的浏览器扩展，这里记录一下整个过程
img: /images/server-spy.png
---

# 起因

由于我们现在用了[API的环境和版本号一定要在URL里面支持](/2016/07/11/info-in-url.html)的方案。导致我们的开发、线上、灰度、测试的域名是一样的。很多同事抱怨说，浏览器打开一个页面比如<https://www.houpix.com>，我根本不知道它是哪个环境的。我们的临时方案是挂上Charles看一下，overview里面当然有IP信息，就知道是哪个环境了；如果没有挂Charles，通过开发者工具栏看一下network请求也能知道。无论如何，还是感觉有点麻烦，没有那种一抬眼就能解决的办法。

起初找到一个插件[Header Spy](https://addons.mozilla.org/en-us/firefox/addon/header-spy/)，应该可以解决我们的需求。我们的openresty配置中，不同环境的Server字段返回时不同的：

```bash
#开发环境：
more_set_headers "Server: gf-dev";
more_set_headers "Server: xt-dev";
……
#测试环境
more_set_headers "Server: test";
#灰度环境
more_set_headers "Server: gray";
#线上正常环境
more_set_headers "Server: openresty";
```

所以我们只需要看一下Server字段就知道是什么环境了。不过很可惜Header Spy已经很多年不维护了，新版本的firefox无法安装。然后又Google了一两个小时，还是没有找到一个合适的。记得2010年左右，我自己写过几个firefox的扩展，心想实在不行自己写一个。

于是看了一下最新的[官方文档](https://developer.mozilla.org/en-US/Add-ons)，有一种[WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)扩展，能支持chrome以及更多浏览器，肯定就是用这种了。

开发过程非常简单。我非就是hook一下当服务器返回数据以后，获取header、ip、更新UI。真正的代码肯定在100行以内。

有一个地方非常坑，js不能和html写在一个文件里面。chrome的[官网给了解释](https://developer.chrome.com/extensions/contentSecurityPolicy#JSExecution)，这里浪费了一些时间，踩坑了。

最后实现的效果类似：
![ServerSpy](/images/server-spy.png)

# 上架

从开始着手开发到开发完也就用了一个上午。接下来是发布和整理文档，用了一个下午，和开发时间差不多。

首先是上架到[firefox addons](https://addons.mozilla.org/ZH-cn/developers/)，首先把目录压缩一下：

```bash
cd $YOUR_WORKING_DIR
zip -r /ramdisk/server-spy.zip *
```

然后按照要求一步步填写即可。

接着上架到Chrome Web Store，官方有一篇[指导文档](https://developer.chrome.com/webstore/publish)。由于我没有开通chrome开发者帐号，所以填完所有信息以后，最后一步是需要一张信用卡支付5美金。master card的信用卡不能用，于是用了老婆的visa卡，连续点击了6次，每次扣款1美金：
![扣钱](/images/IMG_2017.jpg)

联系了Google客服，客服说解决不了需要联系她们的专家。不得不吐槽，Google客服在线聊天界面只能发纯文本，太弱了啊。最后改了一下账单地址到新加坡，成功付款。

Chrome Web Store的审核应该是自动的，因为很快就上架了。

# 使用

- 代码：<https://github.com/100apps/ServerSpy>
- firefox安装：<https://addons.mozilla.org/zh-cn/firefox/addon/server-spy2/>
- chrome安装：<https://chrome.google.com/webstore/detail/server-spy/mcgbfbichapcffmamnmgcobomdpgeagf>


