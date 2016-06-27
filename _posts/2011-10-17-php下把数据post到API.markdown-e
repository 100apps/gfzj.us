---
layout: post
title: "php下把数据post到API"
date: 2011-10-17 10:41:05
category: tech
by: gf
description: 前面内容可忽略，直接看示例API如此强大，不论是什么风格的API，restfull,rmi或者soap，也不论返回的结果是xml，json或者plaintext。要调用基于httpapi，首先要向服务器发出请求，这里有
permalink: /tech/20.html
---
## 前面内容可忽略，直接看[示例][Link 1] ##

API如此强大，不论是什么风格的API，restfull,rmi或者soap，也不论返回的结果是xml，json或者plaintext。要调用**基于http**api，首先要向服务器发出请求，这里有个示例。我们需要向http://$SERVER/insert.php这个地址post一些数据，就像通过浏览器提交一个html表单一样。用php的话，简单一点，可以用curl。

    function post($url, $params)
    {
     $ch = curl_init();
     curl_setopt($ch, CURLOPT_URL, $url);
     curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
     curl_setopt($ch, CURLOPT_POST, true);
     curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
     $returnTransfer = curl_exec($ch);
     curl_close($ch);
     return $returnTransfer;
    }
    function addpost($server,$post){
     return post($server."/insert.php?client=php&cmd=addpost", array("post"=>$post));
    }

直接调用adddpost()就ok了。其中$server就是http://xxx。$post是字符串，格式是

    标题
        链接(原始链接。后台会自动转换)
        回答1
        回答2
        ……

**简单的说，就是把原来那个textarea的文本赋值给$post。**

## 示例 ##

用php添加一个问题：

    $post=<<<EOF
    我是问题标题
    描述
    关键词
    你要添加的url。以http开头
    这一行是回答1
    这一行是回答2
    如果有更多答案，注意一行一个。
    EOF;
    addpost("http://symons.sinaapp.com", $post);

这样一个问题就添加上了，批量提交，你懂得。ps:别忘了**set\_time\_limit (0);**哦~


[Link 1]: http://www.gfzj.us#ex