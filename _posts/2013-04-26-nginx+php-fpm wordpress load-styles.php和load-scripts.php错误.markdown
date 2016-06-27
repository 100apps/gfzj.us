---
layout: post
title: "nginx+php-fpm wordpress load-styles.php和load-scripts.php错误"
date: 2013-04-26 13:35:51
category: tech
by: gf
description: wordpress后台js和style有个合并机制，减少服务器请求次数。但是js和css都是后台动态生成的，所以文件一大，对nginx有个fastcgi_buffers的问题。一般的表现就是后台编辑器不能用
permalink: /tech/69.html
---
wordpress 后台js和style有个合并机制，减少服务器请求次数。但是js和css都是后台动态生成的，所以文件一大，对nginx有个fastcgi\_buffers的问题。

一般的表现就是后台编辑器不能用，样式错位等。用firebug打开。有个js报错，jquery未定义等

![wordpress jquery未定义等错误][wordpress jquery]

因为返回的js/css被阶段了。显然js会运行错误。一般是因为fastcgi\_temp/目录读写权限造成的，比如。/root/目录下的文件夹，即使改成777，nobody还是无法写。

为什么会写这个文件呢？因为php生成的内容过大，超过了fastcgi\_buffers限制，nginx就会写文件。所以要解决这个问题，增大fastcgi\_buffers是一个方法。

    fastcgi_buffers 256 4k;

1M缓存，一般足够了。还是不放心，于是

    fastcgi_max_temp_file_size  0;

世界清净多了

# ## 关于fastcgi\_buffer ###

浏览器和nginx建立连接，nginx发现请求的不是静态文件，而是php脚本，于是把请求转给php-fpm,php-fpm生成内容，转给nginx，nginx再转给浏览器。php返回的东西可能很长，甚至不是一下子返回的，nginx 缓存起来，处理一下(替换/gzip等)再返给浏览器。过大的话，经常会出现502 bad gateway。大概就是这个原因。

buffer并不都是好的，比如

    <?php
    for($i=0;$i<3;$i++){
            echo $i."\\n";flush();sleep(1);
    }

我们期望，每隔一秒返回一个数，但是实际上nginx是一下子返回的。就是因为buffer。


[wordpress jquery]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/02a66a26911132e285459169bcd05229.jpg
