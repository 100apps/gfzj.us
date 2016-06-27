---
layout: post
title: "gitcafe＋github＋万网dns解析让屌丝网站立刻逆袭"
date: 2014-11-17 16:33:55
category: tech
by: gf
keyword: github,gitcafe,pages,免费做网站
description: 用Githubpages做的网站在国内访问速度还是有问题。这时候我们可以在gitcafe也托管一份，配合dns解析，国内访问gitcafe；国外访问github。速度非常非常的快。屌丝网站访问速度马上飞起来。
permalink: /tech/208.html
---
###update 2014-12-18
gitcafe pages最终还是因为备案问题挂了，很遗憾

以前的时候介绍过 [帝国CMS+github pages+qiniu存储网站制作][CMS_github pages_qiniu],用了一段时间以后发现有问题，七牛cdn更新比较慢，同步过去需要等待时间比较长，感觉没有github的fastly给力，另外，dnspod免费版不能区分国内／国外解析，太蛋疼了。今天分享一种升级版解决方案。

首先说，这些服务都是免费的，你只需要一个域名。实际上某些后缀的域名也可以免费注册，具体可以Google一下，这样就真的成了0费用建站。

## 第一步：确定自己已经注册好账号 ##

1.  Github注册地址：[https://github.com/join][https_github.com_join]
2.  Gitcafe注册地址：[https://gitcafe.com/signup][https_gitcafe.com_signup]
3.  万网云解析：[http://www.net.cn/domain/dns][http_www.net.cn_domain_dns]

百度云和360也有免费解析服务，为毛不用呢？当然可以用，只要能区分国内／国外解析都行。所以dnspod不行，屌丝哪有钱买付费服务啊。

## 第二步：创建Repository ##

在github和gitcafe上创建新的代码仓库，**一定不要创建什么.gitignore/README之类的文件**。这里假设我们创建的Repository名称是**repo**(下文中请替换成自己的)

## 第三步，安装Jekyll ##

apt-get或者brew，随意吧。创建一个目录。假设叫做pages，里面就可以放你的网站了。为了测试，我们 `cd pages``jekyll new .``jekyll server`然后在浏览器打开 [http://0.0.0.0:4000/][http_0.0.0.0_4000]就可以看到当前网站的样子了。真tmd库。看到这一切，我都后悔前段时间用帝国了。帝国太大了，对于简单的博客系统来说。基本上绝大多数功能都用不上，博客就要用博客系统，比如Jekyll，千万别用Wordpress，那是高富帅才玩得起的，因为那货实在太浪费资源了。

## 第四步，同步到git服务器 ##

    //配置，只需要运行一次
    git init
    git remote add hub https://github用户名:github密码@github.com/你的用户名/repo.git
    git remote add cafe https://gitcafe用户名:gitcafe密码@gitcafe.com/你的用户名/repo.git
    
    //保存修改，每次修改之后都需要运行
    git add .
    git commit -m "测试"
    
    //提交，每次提交都要运行
    git push -v cafe HEAD:gitcafe-pages
    git push -v hub HEAD:gh-pages

为了以后方便，可以添加.bash\_profile的alias：

    alias pushpages='git push -v cafe HEAD:gitcafe-pages && git push -v hub HEAD:gh-pages'

这样，以后每次本地commit之后，需要运行`pushpages`就可以了。

现在你可以通过(注意替换name为你自己的用户名，repo替换为自己的repo名称)一下链接看效果了：

 *  [http://gitcafename.gitcafe.com/repo/][http_gitcafename.gitcafe.com_repo]
 *  [http://githubname.github.com/repo/][http_githubname.github.com_repo]

## 第五步，解析和绑定域名 ##

去阿里云dns后台，添加www的CNAME，国内到：gitcafename.gitcafe.com，国外到：githubname.github.com。github可以通过CNAME绑定，gitcafe直接在project后台就可以添加了。不建议绑定多个域名，免得出现多个页面。

经测试，github的CNAME文件是可以绑定多个域名的。但是优先级始终没有搞懂，因为github会把CNAME绑定的所有域名都301到一个，但是具体事哪一个，我测试了昨天和今天大结果不一样。比较郁闷，所以刚脆只绑定一个好了。


[CMS_github pages_qiniu]: http://www.gfzj.us/tech/116.html
[https_github.com_join]: https://github.com/join
[https_gitcafe.com_signup]: https://gitcafe.com/signup
[http_www.net.cn_domain_dns]: http://www.net.cn/domain/dns
[http_0.0.0.0_4000]: http://0.0.0.0:4000/
[http_gitcafename.gitcafe.com_repo]: http://gitcafename.gitcafe.com/repo/
[http_githubname.github.com_repo]: http://githubname.github.com/repo/