---
layout: post
title: "用node.js实现一个dns服务器"
date: 2015-04-09 10:53:02
category: tech
by: gf
description: nodejs这东西越用越顺手，以前用java实现过smtp/pop/imap协议，还没有hack过dns协议。有个小项目需要用到动态dns，干脆把域名的NS设置成自己的服务器，动态解析，方便极了。
---

nodejs这东西越用越顺手，以前用java实现过smtp/pop/imap协议，还没有hack过dns协议。有个小项目需要用到动态dns，干脆把域名的NS设置成自己的服务器，动态解析，方便极了。
//TODO