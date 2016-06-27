---
layout: post
title: "nginx+mysql+php 在linux/mac下的编译"
date: 2013-04-30 23:16:37
category: tech
by: gf
description: 早期的时候，感觉挺难的，不是这个错误，就是那个错误，而且配置起来感觉也很吃力。久病成良医，尤其是把配置文件搞得比较熟了以后，编辑就不是什么问题了。至少从心理上觉得不难了。如
permalink: /tech/70.html
---
早期的时候，感觉挺难的，不是这个错误，就是那个错误，而且配置起来感觉也很吃力。久病成良医，尤其是把配置文件搞得比较熟了以后，编辑就不是什么问题了。至少从心理上觉得不难了。如果觉得很难的话，弄个虚拟机，多搞几次，就可以了。

不建议用一键安装包：比如，http://lnmp.org/。无非就3个东西，自己手动搞一下，至少知道怎么回事，印象更深刻一些。

我用的环境是Ubuntu 13.04

    Linux gongchang 3.8.0-19-generic #29-Ubuntu SMP Wed Apr 17 18:16:28 UTC 2013 x86_64 x86_64 x86_64 GNU/Linux

### nginx编译 ###

nginx真是不错的东西，小巧，强大，nginx在配置比较好的机器上，可能几秒钟就搞定了。

    ./configure --prefix=`pwd`-build 
    make install

nginx就搞定了，很快

### mysql编译 ###

不要先编译php，因为php一般用到mysql，除非你的php不用mysql或者你有其他版本的mysql。

    cmake -DCMAKE_INSTALL_PREFIX=`pwd`-build -DMYSQL_UNIX_ADDR=/tmp/mysql.sock -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DWITH_EXTRA_CHARSETS=all -DWITH_MYISAM_STORAGE_ENGINE=1 -DWITH_INNOBASE_STORAGE_ENGINE=1 -DWITH_READLINE=1 -DENABLED_LOCAL_INFILE=1
    make install

然后到mysql-build目录。

    scripts/mysql_install_db
     cp support-files/my-default.cnf bin/my.cnf
    support-files/mysql.server start
    ./bin/mysqladmin -u root password 'xxx'

这样mysql就算搞定啦。mysql 编译还算比较慢的，在我的服务器上，用了足足一个小时才搞定。但是在我用的mac os下面，几分钟就可以搞定了。

### php编译 ###

    ./configure --prefix=`pwd`-build --enable-fpm --enable-mbstring --with-zlib --with-mysql=/opt/server/mysql-5.6.11-build/ --with-mysql-sock=/tmp/mysql.sock --with-mysqli=/opt/server/mysql-5.6.11-build/bin/mysql_config

php编译还算比较快。然后就是改一下php.ini和 php-fpm.conf

    cp ../php-5.4.14/php.ini-production lib/php.ini
    vi lib/php.ini
    #修改第919行：
    date.timezone =Asia/Shanghai
    
    #编辑php-fpm.conf
     cp php-fpm.conf{.default,}
    #主要是修改监听方式为unixsocket
    
    listen = /tmp/php-fpm.socket
    其他的根据实际情况改一下即可。

### nginx配置文件修改 ###

其他类似，php用：

    location ~ \\.php$ {
                fastcgi_pass   unix:/tmp/php-fpm.socket;
                fastcgi_index  index.php;
                fastcgi_param  SCRIPT_FILENAME  $document_root/$fastcgi_script_name;
                include        fastcgi_params;
            }

### 总结 ###

如果是新安装的ubuntu，肯定会遇到缺这个少那个的问题。一般都是apt-cache search xxx然后再apt-get install xxx-dev就可以了

### *update 2014年04月29日11:32:27* ###

注意mysql编译的时候字符集的问题。因为数据和程序是分离的，所以升级版本相当简单。比如要升级mysql，编译好了以后，把my.cnf复制到mysql-build就完了，根本不用设置任何东西，nginx也类似。php5.2.x没有内置php-fpm，再加上libxml版本有问题，编译起来参数比较复杂：

    ./configure --with-libxml-dir=/opt/server/libxml2-2.6.30-build/ --enable-fastcgi --enable-fpm --with-zlib --enable-mbstring --enable-pdo --with-curl --disable-debug --with-pic --disable-rpath --enable-inline-optimization --enable-xml --with-zlib --enable-sockets --enable-sysvsem --enable-sysvshm --enable-pcntl --enable-mbregex --with-mhash --with-xsl --enable-zip --with-pcre-regex --with-mysql=/opt/server/mysql-5.6.17-build/ --with-mysql-sock=/tmp/mysql.sock --prefix=/opt/server/php-5.2.17-build --with-mysqli=/opt/server/mysql-5.6.17-build/bin/mysql_config