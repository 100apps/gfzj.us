---
layout: post
title: "用gitlab做开发"
date: 2016-08-16 17:04:49 +800
categories: 
by: gf
description: gitlab flow的一些思考
img: /images/gitlab.png
---

[GitLab](https://about.gitlab.com/)确实是一款不可夺得的神器。当然如果有条件可以使用Github，国内的话可以使用coding等服务。但是如果你想体验100M/s的clone速度，而且可以更“安全”的话，可能还是会想在局域网搞一个gitlab。不过最好不要按照文档一步步去安装，太麻烦了，而且还有各种坑，还是推荐用解压即用的[Bitnami GitLab](https://bitnami.com/stack/gitlab)。所以这里可省略安装步骤了。

# 配置ldap
局域网内的VPN、samba服务器都是用统一的ldap服务器，所以gitlab肯定不能自己去维护一套用户，改一下配置文件，支持ldap登陆：

```bash
vi ./apps/gitlab/htdocs/config/gitlab.yml

183   ldap:
184     enabled: true
185     servers:
186       ##########################################################################
187       #
188       # Since GitLab 7.4, LDAP servers get ID's (below the ID is 'main'). GitLab
189       # Enterprise Edition now supports connecting to multiple LDAP servers.
190       #
191       # If you are updating from the old (pre-7.4) syntax, you MUST give your
192       # old server the ID 'main'.
193       #
194       ##########################################################################
195       main: # 'main' is the GitLab 'provider ID' of this LDAP server
196         ## label
197         #
198         # A human-friendly name for your LDAP server. It is OK to change the label later,
199         # for instance if you find out it is too large to fit on the web page.
200         #
201         # Example: 'Paris' or 'Acme, Ltd.'
202         label: 'LDAP'
203
204         host: '192.168.1.200'
205         port: 389
206         uid: 'sAMAccountName'
207         method: 'plain' # "tls" or "ssl" or "plain"
208         bind_dn: 'CN=马云腾,OU=开发一组,OU=信息技术部,OU=寓悦科技,DC=yykj,DC=com'
209         password: '***'
210         admin_group: 'administrators'
211
```
另外，首页也需要更新一下。隐藏用户名登录，只显示ldap登录。

# 备份
一旦用了gitlab，运维同事的工作又多了一项：保证代码安全。我们的gitlab部署到了virtual box里面（使用phpvirtualbox管理），定时快照，然后同步到备份服务器上。这样虽然有单点问题，但是好呆恢复的时候非常快。

# ci
gitlab ci还是挺不错的，完全够用。gitlab ci首先要安装`gitlab-ci-multi-runner`：

```bash
# For Debian/Ubuntu
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.deb.sh | sudo bash
sudo apt-get install gitlab-ci-multi-runner

# For CentOS
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | sudo bash
sudo yum install gitlab-ci-multi-runner

#For Mac
brew install gitlab-ci-multi-runner
```
然后注册一个runner：
```bash
gitlab-ci-multi-runner register
```
核心是token问题，可以为每个项目指定一个runner。用管理员登录gitlab，可以设置全局的runner。我们设置了一个全局runner，用来部署php、web这些项目。像iOS这种项目，肯定是一个单独的mac机器上面的runner（mac也是运行在虚拟机中的）。

对于简单的通用项目，我们现在只用来部署（提测）。比如我们的php项目，其` .gitlab-ci.yml `文件：

```bash
#合并到TEST分支以后执行
deploy_test:
  stage: deploy
  script:
    - bash deploy.sh test
  only:
    - dev

#合并到master上面以后执行
deploy_prod:
  stage: test
  script:
    - bash deploy.sh prod
  only:
    - master

#所有提交都必须执行的代码
common:
  stage: build
  script:
   - bash deploy.sh common
```

其中`deploy.sh`为：

```bash
#!/usr/bin/env bash
if [ "x$1" = "xtest" ];then
	echo "deploy to TEST";
elif [ "x$1" = "xprod" ]; then
	echo "deploy to PROD";

elif [ "x$1" = "xcommon" ]; then
	echo "common commit";

fi

deploy(){
	if [ "x$1" = "x" ]; then
		echo "no deploy directory specified";
		exit 1;
	fi
	rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --progress --exclude ".git*" --exclude "*.sh" . --exclude "*.md" houstack@$1
}

```

这样，我们的真正服务器上是不需要运行runner的，都是通过在shared runner上面ssh操作。同样的iOS项目也一样，无非就是脚本的区别。

# flow
我们尝试过git flow，感觉还是比较抽象，因为并没有把code review强行加进去。gitlab flow做得不错，merge request的时候强制引入一个点击Accept的人，对部署（持续集成）负责。并且结合gitlab的code review功能，非常方便。总体上说，我们的项目有2个稳定分支（master和dev），和一个进行中的开发分支，比如v2.8.0。拿到产品文档以后，我们都会在2.8.0上面干，最后所有人都提交到2.8.0，提测的时候，大家进行code review，和视效核对UI，和产品核对需求。team leader去发起merge request，测试leader去accept，部署完成之后大家会收到邮件，xxx提测了，开始测试。

测试过程中不断进行2.8.0向dev的合并，每次合并都会自动部署打包。最终确认没问题，测试经理从dev发起到master的merge request，运维去accept，部署到线上（灰度），或者通过命令行上传到App Store（客户端的话还是测试经理accept，需要进行testflight测试）。当发布的时候别忘了在master上面打tag。

借助gitlab flow整个开发上线流程就清晰了。并且正常情况下，没有人去碰服务器，都是脚本自动做了。

以前看过一个twitter工程师的演讲，说应该把一流的人才拉去做“工具”。每一个团队都需要一个很好的开发流程和工具。一个团队在没有流畅的流程和工具的时候，千万不要猛招人，不要扩大规模。



