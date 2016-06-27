---
layout: post
title: "maven编译包含指定meta信息的jar包"
date: 2015-07-30 16:54:21
categories: series maven
by: zj
description: 在使用maven编译源码获取的jar包中，其meta信息如何才能包含很多有用的信息，如svn revision、build time等等。
---

使用maven进行编译，想使编译出的jar包meta信息中包含一些信息，以便能直接晓得是哪个用户在什么时候从svn哪个分支或者trunk的某个版本编译出的该jar包。要做到上述几件事情，就需要修改pom.xml。主要添加以下内容：

# ###添加scm

我使用的是svn，所以添加的scm信息如下：

	<scm>
		<connection>scm:svn:http://127.0.0.1/dummy</connection>
		<developerConnection>scm:svn:https://127.0.0.1/dummy</developerConnection>
		<tag>HEAD</tag>
		<url>http://127.0.0.1/dummy</url>
	</scm>

# ###添加buildnumber-maven-plugin

在pom.xml的

	<pluginManagement>
		<plugins>

		</plugins>
	</pluginManagement>

中添加如下内容：

 	<plugin>
		<groupId>org.codehaus.mojo</groupId>
		<artifactId>buildnumber-maven-plugin</artifactId>
		<executions>
			<execution>
				<phase>validate</phase>
				<goals>
					<goal>create</goal>
				</goals>
            		</execution>
          	</executions>
		<configuration>
			<doCheck>false</doCheck>
			<doUpdate>false</doUpdate>
			<revisionOnScmFailure>${REVISION}</revisionOnScmFailure>
			<buildNumberPropertyName>buildRev</buildNumberPropertyName>
			<timestampFormat>{0,date,yyyy-MM-dd HH:mm:ss}</timestampFormat>
		</configuration>
	</plugin>

上述代码中，插件buildnumber-maven-plugin会执行方法create，该方法返回变量buildRev，即svn的版本号；如果执行失败，则将REVISION的值赋给buildRev。同样，build time的时间展示格式也定义为date yyyy-MM-dd HH:mm:ss。而buildRev这个变量则用于maven-jar-plugin，之后会提到。

在pom.xml的

	<build>
		<plugins>

		</plugins>
	</build>

中添加如下内容：

	<plugin>
		<groupId>org.codehaus.mojo</groupId>
		<artifactId>buildnumber-maven-plugin</artifactId>
		<version>1.3</version>
	</plugin>

# ###添加maven-jar-plugin

在pom.xml的

	<pluginManagement>
		<plugins>

		</plugins>
	</pluginManagement>

中添加如下内容：

	<plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-jar-plugin</artifactId>
		<version>2.2</version>
		<configuration>
			<archive>
				<manifest>
					<addDefaultImplementationEntries>true</addDefaultImplementationEntries>
				</manifest>
				<manifestEntries>
					<BuildScmBranch>${scmBranch}</BuildScmBranch>
					<Build-Revision>${buildRev}</Build-Revision>
					<Build-Time>${timestamp}</Build-Time>
				</manifestEntries>
			</archive>
		</configuration>
	</plugin>

该插件使用变量buildRev、timestamp，以及scmBranch。scmBranch的值即为所编译的源码来自的branch。
