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


# iOS ci脚本

```
#合并到TEST分支以后执行
deploy_test:
  stage: deploy
  script:
    - bash gitlab_ci.sh test
  only:
    - dev

#合并到master上面以后执行
deploy_prod:
  stage: test
  script:
    - bash gitlab_ci.sh prod
  only:
    - master

#所有提交都必须执行的代码
common:
  stage: build
  script:
   - bash gitlab_ci.sh common
```

```bash
#!/usr/bin/env bash

WORKSPACE_PATH=`pwd`/YuYueiPhone
WORKSPACE_NAME="YuYueiPhone"
SCHEME="YuYueiPhone"

#生成的APP名称，根据xcode项目 plist来定
APPNAME="YuYueiPhone"

#输出ipa文件的路径, 最好是绝对路径
OUTDIR="${WORKSPACE_PATH}/output"

buildnum=`/usr/libexec/PlistBuddy -c "Print CFBundleVersion" YuYueiPhone/YuYueiPhone/Info.plist`
version=`/usr/libexec/PlistBuddy -c "Print CFBundleShortVersionString" YuYueiPhone/YuYueiPhone/Info.plist`

#发送邮件参数主题
sendMail(){
    curl -v http://git.yuyue.work:8000/ -d "to[]=kaifa" -d "subject=$1 version=${version} build=${buildnum}" -d 'html=<p>下载地址：<a href="http://fir.im/houpix">http://fir.im/houpix</a></p><p>扫码安装：<img src="http://qr.liantu.com/api.php?text=http://fir.im/houpix"></p>'
}
#打包 参数分别是 Release Debug AdHoc
packaging(){
    rm -f "${OUTDIR}/${APPNAME}.ipa"
    if [ ! -f $PROVISIONING_PROFILE ]; then
    echo "Please download the provision file for " ${PROVISIONING_PROFILE}
    exit 1;
    fi
    echo "~~~~~~~~~~~~~~~~清理工程~~~~~~~~~~~~~~~~编译工程~~~~~~~"
    echo "${OUTDIR}${APPNAME}.ipa"
    echo "xcodebuild -workspace ${WORKSPACE_NAME}.xcworkspace -scheme ${SCHEME} -configuration  $1 clean build -sdk iphoneos CONFIGURATION_BUILD_DIR=${OUTDIR}"
    xcodebuild -workspace "${WORKSPACE_PATH}/${WORKSPACE_NAME}.xcworkspace" -scheme "${SCHEME}" -configuration $1 clean build -sdk iphoneos CONFIGURATION_BUILD_DIR=${OUTDIR} 1> build.log 2>&1
    #打包成 .ipa
    echo "~~~~~~~~~~~${APPNAME}.ipa}~~~scuess"
    echo "xcrun -sdk iphoneos PackageApplication -v ${OUTDIR}/${APPNAME}.app -o ${OUTDIR}/${APPNAME}.ipa --sign ${IDENTITY} --embed ${PROVISIONING_PROFILE}"
    xcrun -sdk iphoneos PackageApplication -v "${OUTDIR}/${APPNAME}.app" -o "${OUTDIR}/${APPNAME}.ipa"
    # --sign "${IDENTITY}" --embed "${PROVISIONING_PROFILE}"
    if [ -e "${OUTDIR}/${APPNAME}.app" ]; then
        return 0
    fi
    return 1
}

uploadFir(){
    #FIR 秘钥
    FIRTOKEN="DEMOTOKEN"
    #上传到测试平台 -> fir.im
    echo "-------->fir.im---------"
    fir p "${OUTDIR}/${SCHEME}.ipa" -T "${FIRTOKEN}"
}
upload2AppStore(){
    USER=appstore@account.com
    PASS=ThisPass

    # App id as in itunes store create, not in your developer account
    APP_ID='1053336048'

    IPA_FILE=$1
    IPA_FILENAME=$(basename $IPA_FILE)

    MD5=$(md5 -q $IPA_FILE)
    BYTESIZE=$(stat -f "%z" $IPA_FILE)

    TEMPDIR=/tmp/itsmp
    # Remove previous temp
    test -d ${TEMPDIR} && rm -rf ${TEMPDIR}
    mkdir ${TEMPDIR}
    mkdir -pv ${TEMPDIR}/mybundle.itmsp

    # You can see this debug info when you manually do an app upload with the Application Loader
    # It's when you click activity

    cat <<EOM > ${TEMPDIR}/mybundle.itmsp/metadata.xml
<?xml version="1.0" encoding="UTF-8"?>
<package version="software4.7" xmlns="http://apple.com/itunes/importer">
    <software_assets apple_id="$APP_ID">
        <asset type="bundle">
            <data_file>
                <file_name>$IPA_FILENAME</file_name>
                <checksum type="md5">$MD5</checksum>
                <size>$BYTESIZE</size>
            </data_file>
        </asset>
    </software_assets>
</package>
EOM

    cp ${IPA_FILE} $TEMPDIR/mybundle.itmsp/${IPA_FILENAME}
    cd "/Applications/Xcode.app/Contents/Applications/Application Loader.app/Contents/itms"
    java -cp lib/itmstransporter-launcher.jar com.apple.transporter.Application -m upload -f ${TEMPDIR} -u "$USER" -p "$PASS" -v detailed

}

if [ "x$1" = "xcommon" ];then
  echo "任何包都需要做的事情，比如语法检查，看看能否build成功之类的。"
elif [ "x$1" = "xtest" ];then
  echo "给测试出的包"

    if packaging Debug ; then
        uploadFir
        sendMail "dev iOS打包完成已经上传到fir"
    else
        sendMail "dev iOS打包出错"
    fi
    
elif [ "x$1" = "xprod" ];then
  echo "上线，编译并且提交到App Store"
    
    if packaging Release ; then
        upload2AppStore "${OUTDIR}/${SCHEME}.ipa"
        sendMail "master iOS包已经提交到AppStore"
        if packaging AdHoc ; then
            uploadFir
            sendMail "Release iOS打包完成已经上传到fir"
        else
            sendMail "Release iOS打包出错"
        fi
    else
        sendMail "master iOS打包出错"
    fi
fi
```

php项目的脚本

```
#!/usr/bin/env bash

#可以自定义成自己的目录。如果是按照域名来定的，可以按照下面的方式自动获得。
dir=`basename "$PWD"`

#发送邮件函数
sendMail(){
    curl -v http://git.yuyue.work:8000/ -d "to[]=kaifa" -d "subject=$1" -d "html=http://$dir";
}

#部署
deployTo(){
  if [ "x$1" = "x" ]; then
    echo "no deploy directory specified";
    exit 1;
  fi
  host=`echo $1|cut -d ":" -f1`
  path=`echo $1|cut -d ":" -f2`
  if ssh houstack@${host} "tar czf `dirname $path`/${dir}-`date +%s`.tar.gz ${path}" ; then
    echo "备份成功" 
  else
    sendMail "${dir}备份失败"
    return;
  fi

  if rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --exclude "*.swp" --exclude ".git*" --exclude "*.sh" . houstack@$1 ;then
    sendMail "${dir}已经部署到了$2"
  else
    sendMail "${dir}部署到$2失败了"
  fi

}

if [ "x$1" = "xcommon" ];then
  echo "任何包都需要做的事情，比如语法检查，看看能否build成功之类的。"

elif [ "x$1" = "xtest" ];then
  echo "开始部署到测试环境"
  deployTo 192.168.50.150:/opt/houstack/data/nginx/${dir}/ "测试环境"
    
elif [ "x$1" = "xprod" ];then
  echo "部署到线上环境"
  deployTo 202.101.1.118:/opt/houstack/data/nginx/${dir}/ "线上环境"
fi

```


### update 2016年 9月 1日 星期四 16时11分11秒 CST

有同学提到merge request冲突的问题。这个解决方案有两种，要不发起者解决，要不接收者解决。解决方案一样。就是把对方的代码拉下拉，合并，然后提交。比如，发起者解决(我们项目里全部是发起者解决，接收者只管点击Accept按钮)

```bash
#把远程项目的某个分支拉下来
git fetch git://git.yuyue.work/原作者的项目.git master
# 切换分支
git checkout -b xxx FETCH_HEAD

# 这时候可以看看具体哪些修改之类的。或者通过IDE运行一下。
#然后回到原来的分支
git checkout master
#合并
git merge xxx
#然后提交push，这时候再去gitlab上看对应的merge request，就已经可以自动合并了
```
