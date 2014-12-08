---
layout: post
title: "帝国CMS+github pages+qiniu存储网站制作"
date: 2014-02-06 19:16:15
category: tech
by: gf
keyword: github,网站空间
description: 感谢GitHub，为众屌丝提供了一个方便的免费空间，现在貌似空间大小也不限制了，基本上秒杀任何静态空间。GitHubPages入门可以参考这篇文章，我们对jekyll并不熟悉，其实我们可以用帝
permalink: /tech/116.html
---
感谢GitHub，为众屌丝提供了一个方便的免费空间，现在貌似空间大小也不限制了，基本上秒杀任何静态空间。[GitHub Pages入门可以参考这篇文章][GitHub Pages]，我们对jekyll并不熟悉，其实我们可以用帝国CMS，因为帝国静态化功能足够强大。对于图片、附件、js、css等资源，如果感觉GitHub速度有问题的话，国内可以用七牛存储来锦上添花。

## STEP1.本地环境搭建 ##

比如我的域名是test.gfzj.us。我们首先本地hosts解析到本机，然后安装帝国。假设我们的目录是/data/websites/test.gfzj.us，我们按照传统的方法建立好一个网站，然后全部刷新一下。这样就生成了全部静态文件。

## STEP2.git设置 ##

首先注册一个[GitHub][]账号，然后创建一个repository,比如：web.gfzj.us

然后本地，先转到工作目录：cd /data/websites/test.gfzj.us

创建.gitignore文件，里面写上不上传的文件，比如：

``````````
.DS_Store 
.gitignore
d
e
testdata
``````````

然后运行:

``````````
git init
git checkout --orphan gh-pages
git add .
git commit -m "提交注释,比如 first post"
git remote add origin https://github用户名:github密码@github.com/你的用户名/web.gfzj.us.git
git push origin gh-pages
``````````

*update 2014年04月07日11:06:48*,可以通过编辑.git/config来设置一些配置。

稍等片刻，就可以通过https://github.com/**你的用户名**/web.gfzj.us 来访问了。update 2014年10月12日11:35:56 通过 **http://用户名.github.io/项目名** 来访问

## 绑定域名 ##

建立CNAME文件。写入要绑定的域名，比如 web.gfzj.us。然后git add && git commit -m "CNAME" && git push 就可以了。

然后设置DNS,解析web.gfzj.us到103.245.222.133。这个ip是http://pages.github.com/的ip。可以用http://alibench.com/找一个较快的ip即可。

## 国内加速 ##

通过七牛存储提供的工具，把静态资源上传，然后建立帝国模板和写文章的时候，注意路径就可以了。需要注意的是，七牛存储提供[每月10G流量，总共10G空间][10G_10G]的存储，对于一般网站，足够用了。如果不放心，可以多建立几个七牛存储的账号，分开存储。另外为了防止七牛挂掉，最好在帝国里面用变量控制路径根域名。另外GitHub也有可能被墙，所以最好做好“第二服务器”，方便随时切换。

感谢GitHub、感谢七牛存储、感谢帝国CMS，这些开源的优秀的产品！

## update 2014年10月23日08:38:54 ##

可以通过cname绑定域名。github请cname到pages.github.io，七牛cname到bucket.qiniudn.com。另外，七牛一定要配置好 `.qrignore文件`，sync完了以后，如果需要更新已有文章，请手动运行：

``````````
qboxrsctl refresh gfzj
``````````


[GitHub Pages]: http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html
[GitHub]: https://github.com/
[10G_10G]: http://www.qiniu.com/pricing