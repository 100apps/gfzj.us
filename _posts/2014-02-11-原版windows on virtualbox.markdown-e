---
layout: post
title: "原版windows on virtualbox"
date: 2014-02-11 16:23:45
category: tech
by: gf
keyword: virtualBox,vdi,原版windows,windows sn
description: 先说一下在virtualbox里面安装原版操作系统，首先去http://msdn.itellyou.cn/下载最新的操作系统，然后新建一个虚拟机，接着选择iso文件，安装即可。激活可以选用序列号激活，这个对
permalink: /tech/117.html
---
先说一下在virtualbox里面安装原版操作系统，首先去[http://msdn.itellyou.cn/][http_msdn.itellyou.cn]下载最新的操作系统，然后新建一个虚拟机，接着选择iso文件，安装即可。激活可以选用序列号激活，这个对系统没有什么改变，应该是最理想的一种方法，当然如果能买正版的就更好了。一般可以去淘宝搜索，5块钱以内，一般都能搞定，实际上网上也有很多现成的，尤其是win7，比如,通过我买的win7的key [J78FT-J48BQ-HH2M7-CYVTM-MXRHY][]可以找到：

1.  [http://www.landiannews.com/key%E5%88%86%E4%BA%AB][http_www.landiannews.com_key_E5_88_86_E4_BA_AB]
2.  [http://winba.me/win8-office2013-key.html][http_winba.me_win8-office2013-key.html]

这两个网址都比较靠谱，可以试试。win8.1实在没找到，所以也只能求助大淘宝了，花了8块钱买到：

    快捷键 win（windows键）+R，输入slui 3，点击确定，-输入密钥-点击激活
    KG6MK-NKGYX-DGXHT-RTRDF-HQVQQ

一开始提示失效，经卖家提示重启，就ok了！另外Office2013确实不错，也可以用同样的方法安装。

最后安装并激活了4个操作系统：

1.  zh-hans\_windows\_xp\_professional\_with\_service\_pack\_3\_x86\_cd\_vl\_x14-74070
2.  cn\_windows\_7\_enterprise\_x86\_dvd\_x15-70737
3.  cn\_windows\_7\_ultimate\_with\_sp1\_x86\_dvd\_u\_677486
4.  cn\_windows\_8\_1\_enterprise\_x86\_dvd\_2972257

打包一下vdi文件，以后想用的时候只需解压出来，然后运行：

    VBoxManage internalcommands sethduuid cn_windows_7_enterprise_x86_dvd_x15-70737.vdi

这样新建一个虚拟机，选择一下虚拟磁盘，然后启动就可以了

![新建虚拟机][624d16617874092c6299fdd4b2eaf66a.jpg]

## vdi打包文件下载地址： ##

    http://pan.baidu.com/s/1o66V3nk

网盘中没有打包vbox xml配置文件，所以需要clone的话，需要先新建一个。下载下来的压缩包最好不要删，需要建立新的时候，解压出来直接用，就又是一个纯净版的系统了。


[http_msdn.itellyou.cn]: http://msdn.itellyou.cn/
[J78FT-J48BQ-HH2M7-CYVTM-MXRHY]: https://www.google.com.hk/search?q=J78FT-J48BQ-HH2M7-CYVTM-MXRHY
[http_www.landiannews.com_key_E5_88_86_E4_BA_AB]: http://www.landiannews.com/key%E5%88%86%E4%BA%AB
[http_winba.me_win8-office2013-key.html]: http://winba.me/win8-office2013-key.html
[624d16617874092c6299fdd4b2eaf66a.jpg]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/624d16617874092c6299fdd4b2eaf66a.jpg