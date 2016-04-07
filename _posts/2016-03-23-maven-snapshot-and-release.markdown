---
layout: post
title: "maven snapshot和release"
date: 2016-03-23 11:38:05
categories: series maven
by: zj
description: snapshot和release的区别
---

如果工程依赖的是一个snapshot，那么就是说这个jar包仍在开发过程中，不是一个稳定的版本，那么在每次执行编译时，maven都会从repo拉取最新的snapshot jar包（也可设定拉取的频率）。Snapshot的特征是其version名包含-SNAPSHOT。
