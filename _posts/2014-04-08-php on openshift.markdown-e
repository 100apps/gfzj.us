---
layout: post
title: "php on openshift"
date: 2014-04-08 09:53:27
category: tech
by: gf
keyword: 免费,云服务,openshift
description: Openshift确实是一个不错的云计算平台，而且还提供3个免费application，每个应用1G硬盘空间，支持所有常用的环境，比如php、mysql之类的，官方提供了用git传输的方法，但是，这货居然可以
permalink: /tech/126.html
---
[Openshift][]确实是一个不错的云计算平台，而且还提供3个免费application，每个应用1G硬盘空间，支持所有常用的环境，比如php、mysql之类的，官方提供了用git传输的方法，但是，这货居然可以直接ssh登录！我们可以直接用ssh操作一切，其实每个application相当于1个免费vps，只是这个vps硬盘只有1G，但是流量不限制。

openshift的ssh可以用来-D来做代理，也可以用sftp或者rsync、scp等命令上传文件，和普通的linux vps无异。openshift的服务器是架设在aws上面的，所以注册一个账户相当于拥有了3个亚马逊vps，相当给力。

## STEP 1：注册 ##

通过[https://www.openshift.com/app/account/new][https_www.openshift.com_app_account_new]注册。

## STEP 2: 生成密钥(新账户创建第一个应用的时候需要) ##

openshift的ssh(git)只允许用私钥登录,所以建立第一个应用的时候，我们可以把~/.ssh/id\_rsa.pub贴过去。windows下生成密钥的方法，可以用[puttygen.exe][]

## STEP 3:创建应用 ##

openshift可以创建很多环境，也可以通过命令行增加，但是我们都不需要，我们只要一个php环境即可。通过[https://openshift.redhat.com/app/console/application\_type/cart!php-5.4][https_openshift.redhat.com_app_console_application_type_cart_php-5.4]可以创建一个有php5.4运行环境的application，只需要填写以下 Public URL，然后点击Create Application即可。

## STEP 4:通过ssh同步网站 ##

应用创建完成以后，服务器返回一个ssh地址，比如：

    ssh://534217a5e0b8cd5f38000500@php-sbjq.rhcloud.com/~/git/php.git/

我们可以用 ssh 534217a5e0b8cd5f38000500@php-sbjq.rhcloud.com直接登录服务器，注意这时候用的验证方式是私钥，不是密码。网站根目录在/var/lib/openshift/**534217a5e0b8cd5f38000500(此处是你的用户名)**/app-root/runtime/repo,注意硬盘空间是1G，支持htaccess。通过 ping php-sbjq.rhcloud.com可以得到服务器的ip地址。我们轻易就能获得：

    ping php-sbjq.rhcloud.com
    PING ec2-54-224-132-165.compute-1.amazonaws.com (54.224.132.165): 56 data bytes
    64 bytes from 54.224.132.165: icmp_seq=0 ttl=42 time=480.044 ms

openshift其实是用的aws的云服务。所以此时，一个应用就相当于一台只有1G硬盘的Amazon vps。而且是免费的，绝对超值！

## 注意事项 ##

免费的东西就容易被滥用，比如gae，openshift也一样，很多人用来翻墙，导致服务器被墙了。如果直接访问二级域名，比如 [php-sbjq.rhcloud.com][]可能会连接被重置，我们需要用https://php-sbjq.rhcloud.com来连接。其实这时候，我们可以直接用cloudflare，更靠谱一些。


[Openshift]: https://www.openshift.com/
[https_www.openshift.com_app_account_new]: https://www.openshift.com/app/account/new
[puttygen.exe]: http://the.earth.li/~sgtatham/putty/latest/x86/puttygen.exe
[https_openshift.redhat.com_app_console_application_type_cart_php-5.4]: https://openshift.redhat.com/app/console/application_type/cart!php-5.4
[php-sbjq.rhcloud.com]: http://www.gfzj.us/php-sbjq.rhcloud.com