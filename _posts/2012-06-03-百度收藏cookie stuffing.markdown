---
layout: post
title: "百度收藏cookie stuffing"
date: 2012-06-03 18:34:04
category: tech
by: gf
description: 先看看效果：在百度首页开启百度收藏有两个条件：官方文档已登录在搜索设置中开启结果收藏现在百度默认是不启用结果搜藏的。不过我们相信，等条件成熟，百度应该默认会开启的
permalink: /tech/36.html
---
# 先看看效果： #

![1761eb9d8fbbd44a79c3cbd0ed126480.png][]

在百度首页开启百度收藏有两个条件：[官方文档][Link 1]

1.  已登录
2.  在搜索设置中开启结果收藏
    
    ![fb7c43dd3c121e2e0cd3d54608ddea4e.png][]
    
    现在百度默认是不启用结果搜藏的。不过我们相信，等条件成熟，百度应该默认会开启的。因为确实有助于用户体验，
    
    想想pinterest，不就是一个搜索结果搜藏吗？
    
     

# 如何控制用户搜藏 #

当然是cookie stuffing！用了一下午时间做了一个工具。地址是：

[http://ooxxbaidu.sinaapp.com/][http_ooxxbaidu.sinaapp.com]

只需两步就可以控制用户的收藏了：

1.  添加一个新的词：包括3部分
    
    1.  显示的词：类似上面的"百度官方网站"
    2.  url：不用说了
    3.  搜索词，就是当用户搜索这个词的时候显示收藏结果
2.  添加后找到对应的嵌入的js的网址。比如[http://ooxxbaidu.sinaapp.com/1.js][http_ooxxbaidu.sinaapp.com_1.js] 添加到任何用户可以访问的页面里面。
    
    <script src="嵌入的js的网址"></script> 这样，当用户访问这个页面的时候，用户的cookie就被悄悄的stuffing了。当用户再次搜索这个词的时候就会看到收藏结果了。
    
     

# 效果测试 #

1. 首先登陆你的百度账户，然后开启结果收藏。

2．然后[刷新][Link 2]这个页面

3．最后去[百度搜索干爹][Link 3]。

看到了吗？

![2a1726783c4a2f21f58de0fe195506bc.png][]

# 应用 #

暂时想到的一种应用是，自动添加当前页面的keywords到用户的收藏里面，比如这个页面的keyword是 破碎机、破碎机厂家。那么当用户搜索这个两个词中任何一个的时候，都是这个页面。在最上面啊。直接把百科给秒了。更牛逼的应用还是等各位看官来发掘吧。


[1761eb9d8fbbd44a79c3cbd0ed126480.png]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/1761eb9d8fbbd44a79c3cbd0ed126480.png
[Link 1]: http://www.baidu.com/search/favo/help.html
[fb7c43dd3c121e2e0cd3d54608ddea4e.png]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/fb7c43dd3c121e2e0cd3d54608ddea4e.png
[http_ooxxbaidu.sinaapp.com]: http://ooxxbaidu.sinaapp.com/
[http_ooxxbaidu.sinaapp.com_1.js]: http://ooxxbaidu.sinaapp.com/1.js
[Link 2]: http://gfzj.sinaapp.com/285.html
[Link 3]: http://www.baidu.com/s?wd=干爹
[2a1726783c4a2f21f58de0fe195506bc.png]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/2a1726783c4a2f21f58de0fe195506bc.png