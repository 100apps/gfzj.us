---
layout: post
title: "Linode: account termination"
date: 2013-05-16 09:28:31
category: tech
by: gf
keyword: linode
description: Linode现在越来越碉堡了，以前我们最初用的时候，还是一般得公司，现在配置翻番了，腰板挺直了，尼玛开始封账户了。被封原因很简单，频繁被投诉，违反linode的TosItappearsthatthecon
permalink: /tech/73.html
---
Linode现在越来越碉堡了，以前我们最初用的时候，还是一般得公司，现在配置翻番了，腰板挺直了，尼玛开始封账户了。

被封原因很简单，频繁被投诉，违反linode的Tos

    It appears that the content has been removed at this time. I've set this ticket to automatically close in 48 hours as we monitor for additional complaints. Please note that any further copyright infringement will result in account termination. I would recommend familiarizing yourself with our Terms of Service, and verifying that all content hosted on your Linode meets these terms:
    
    http://www.linode.com/tos.cfm
    
    Thank you for your cooperation.

过了几个小时，不知道怎么寻思回味儿来了，又直接给发了一个

    As the content has been placed back up, we will be terminating your account in 24 hours. At that time, all your Linodes will be removed and you will receive a prorated refund for remaining paid time.

然后尝试着解释了一下，无果，被封了。封账户估计需要manager操作，回来换了一个人。

    I apologize for any confusion, but we will not be able to allow your account to remain open. It will be terminated in 8 hours.

然后再解释

    Your account is being terminated for repeated terms of service violations. We take our terms of service and US law very seriously, and cannot allow your account to remain open. Your account will be terminated in approximately 7 hours.

封账户其实也无可厚非，老外版权意识好，同时也可见 [DMCA][]在国外的执行力。可是上面有40+个linode节点，数据量比较大，在短时间内迁移走是个问题。幸好人多力量大，最后八九不离十，大部分数据保住了。

大家一般都会压缩一下再传 tar czf xx.tar.gz xxx/ yyy/,但是如果空间不够，就不能压缩了。所以还是推荐 nc搭配tar

    sender: tar cf - xxx/ yyy/ | nc -lv 1111
     receiver: nc sender 1111 > file.tar

快速，无需其他空间，缺点是不能显示进度，不可恢复。

#  # 教训 ##

老外版权意识强，如果发信说被投诉，要立马解决，千万不要耽搁。人家有自己的监控系统，估计也是怕机器被搬走。

鸡蛋不能放到同一个篮子里，万一篮子破了，覆巢之下，岂有完卵？

备份，vps并不可靠，至少本地还要有一份备份。

#  # update 2013年05月16日14:01:20 ##

给linode发email，没有回信。

打电话给linode。确定impossible找回数据。


[DMCA]: http://zh.wikipedia.org/zh-cn/%E6%95%B8%E5%AD%97%E5%8D%83%E5%B9%B4%E7%89%88%E6%AC%8A%E6%B3%95
