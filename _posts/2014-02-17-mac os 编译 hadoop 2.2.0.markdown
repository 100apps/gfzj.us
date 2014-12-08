---
layout: post
title: "mac os 编译 hadoop 2.2.0"
date: 2014-02-17 16:06:08
category: tech
by: zj
description: MacOS上编译hadoop2.2.0一、需要下载安装maven、protobuf、cmake(brewinstall)安装make：通过AppStore安装好Xcode之后，打开Xcode，菜单Xcode&gt;&gt;OpenDeveloperTool&gt;&gt;Mor
permalink: /tech/118.html
---
Mac OS 上编译hadoop 2.2.0 一、需要下载安装maven、protobuf、cmake (brew install) 安装make：通过AppStore安装好Xcode之后，打开Xcode，菜单Xcode >> Open Developer Tool >>More Developer Tools，这时Safari出现了，开始注册填写信息然后进入Apple Developer的下载站点，搜索Command Line Tools把它下载下来，建议使用迅雷 for mac，下载好了安装，它会给我们提供命令行工具包括make

``````````
目前的2.2.0 的Source Code 压缩包解压出来的code有个bug 需要patch后才能编译。否则编译hadoop-auth 会出错误。
解决办法如下：
修改下面的pom文件。该文件在hadoop源码包下寻找：
hadoop-common-project/hadoop-auth/pom.xml
打开上面的的pom文件，在54行加入如下的依赖：
     <dependency>
       <groupId>org.mortbay.jetty</groupId>
      <artifactId>jetty-util</artifactId>
      <scope>test</scope>
     </dependency>
     <dependency>
       <groupId>org.mortbay.jetty</groupId>
       <artifactId>jetty</artifactId>
       <scope>test</scope>
     </dependency>
``````````

二、错误处理 运行 clean install  package -Pdist -P-cbuild  -DskipTests  -Dtar  报各种错误 1、报错\[ERROR\] Failed to execute goal org.codehaus.mojo:native-maven-plugin:1.0-alpha-7:javah (default) on project hadoop-common: Error running javah command: Error executing command line. Exit code:1 -> \[Help 1\] 修改hadoop-common-project/hadoop-common/pom.xml 文件中，env.JAVA\_HOME改为java.home 2、报错 /hadoop-2.2.0-src/hadoop-common-project/hadoop-common/src/main/native/src/org/apache/hadoop/security/JniBasedUnixGroupsNetgroupMapping.c:77:26: error: invalid operands to binary expression ('void' and 'int') \[exec\] if(setnetgrent(cgroup) == 1) \{ \[exec\] ~~~~~~~~~~~~~~~~~~~ ^ ~ \[exec\] 1 error generated. \[exec\] make\[2\]: \*\*\* \[CMakeFiles/hadoop.dir/main/native/src/org/apache/hadoop/security/JniBasedUnixGroupsNetgroupMapping.c.o\] Error 1 \[exec\] make\[1\]: \*\*\* \[CMakeFiles/hadoop.dir/all\] Error 2 \[exec\] make: \*\*\* \[all\] Error 2 \[ERROR\] Failed to execute goal org.apache.maven.plugins:maven-antrun-plugin:1.6:run (make) on project hadoop-common: An Ant BuildException has occured: exec returned: 2 -> \[Help 1\] 修改mvn3的配置文件：/opt/local/share/java/maven3/settings.xml 在<mirrors>…</mirrors>里添加国内源： <mirrors> <mirror> <id>nexus-osc</id> <mirrorOf>\*</mirrorOf> <name>Nexusosc</name> <url>http://maven.oschina.net/content/groups/public/</url> </mirror> </mirrors> 在<profiles>...</profiles>标签中增加以下内容： <profile> <id>jdk-1.7</id> <activation> <jdk>1.7<k> </activation> <repositories> <repository> <id>nexus</id> <name>local private nexus</name> <url>http://maven.oschina.net/content/groups/public/</url> <releases> <enabled>true</enabled> </releases> <snapshots> <enabled>false</enabled> </snapshots> </repository> </repositories> <pluginRepositories> <pluginRepository> <id>nexus</id> <name>local private nexus</name> <url>http://maven.oschina.net/content/groups/public/</url> <releases> <enabled>true</enabled> </releases> <snapshots> <enabled>false</enabled> </snapshots> </pluginRepository> </pluginRepositories> </profile> </profiles> 注意修改jdk version number 将刚才的maven 配置文件拷贝到当前用户的home目录下: settings.xml   copy 到  your\_hadoop\_usr\_home/.m2/ cp settings.xml ~/.m2 3、报错\[ERROR\] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:2.5.1:compile (default-compile) on project hadoop-hdfs: Fatal error compiling: Error while executing the compiler. InvocationTargetException: Java heap space 分配内存不足,参考如下为maven配置JVM参数: export MAVEN\_OPTS="-Xms256m -Xmx512m -Djava.awt.headless=true" 4、报错 \[ERROR\] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:2.5.1:compile (default-compile) on project hadoop-hdfs: Compilation failure \[ERROR\] Failure executing javac, but could not parse the error: 执行maven clean，然后再 export MAVEN\_OPTS="-Xms256m -Xmx512m -Djava.awt.headless=true" 三、最重要的一点，build your code是使用这个command line(Only for Mac OS): **mvn clean install -P-cbuild** 编译之前， 你在hadoop-2.2.0-src目录（/Users/JuneMAC/hadoop/release-2.2.0）下执行 mvn clean install –DskipTests 上面的成功后，执行下面这个，生成安装包 mvn clean install  package -Pdist -P-cbuild  -DskipTests  -Dtar 执行完成后，可以在/Users/JuneMAC/hadoop/release-2.2.0/hadoop-dist/target/ 下找到 hadoop-2.2.0.tar.gz 将上面这个编译好的源码包解压到： /Users/JuneMAC/hadoop/ 然后进行相关配置 解压之后的源码包和官网下载下来的源码包相对比，没有lib目录 相关解释： “Here we use the additional options to stop compiling the native code. this is the key reason why we need use -P-cbuild option” 上面这个是原因，好像不是很重要。实际上如果指定-Pdist,native 生成native lib 不成功，查阅有关官方介绍发现：Hadoop本地库只支持\*nix平台，已经广泛使用在GNU/Linux平台上，但是不支持 Cygwin  和 Mac OS X 。 部分参考：http://hi.baidu.com/az\_lanan/item/cffe17008d10ff6ed55a1144