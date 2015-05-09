---
layout: post
title: "OpenShare开放协议(5)：protocol"
date: 2015-05-09 18:41:46
categories: series openshare
by: gf
description: 介绍一下开发协议的规划
---

主要定义 app 之间的常用通信协议，如果遵循大家都遵循这个协议，就不需要各自造轮子了，省掉很多sdk。我们参考 url get/post 传参数的方式，对于简单的参数，推荐用 get 传递，二进制数据，如图片，用粘贴板传递。

# 数据流

调用者app (request)→ 调起 app (response)→ 返回。

### 请求的格式：

```
server://path/command?appId=xxx&sign=xxx&k1=v1&k2=v2&pb=1
如果使用粘贴板，请用 pb 参数指定。其中 appId 和 sign 必选。
```

返回的格式：

```
client://path/command?code=200&msg=xxx&k1=v2&k2=v2 
其中 code 和 msg 为必选参数
```

### path 的可选项：

```
auth、pay、share
```

### path 对应的参数：

1. auth

request：scope 需要哪些字段，如 userName、avatar

response：

openId：用户 openId（必须）
其他 scope 指定的字段 

2. pay

request：

1) amount 支付的金额
2) title 商品名称
3) description 商品描述

response：无需额外参数

3. share

request：

1) title：分享标题
2) description：分享描述
3) image: 分享标题
4) thumbnil：缩略图
5) link: 分享链接


response: 无需额外参数




