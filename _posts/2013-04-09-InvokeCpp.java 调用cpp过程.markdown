---
layout: post
title: "InvokeCpp.java 调用cpp过程"
date: 2013-04-09 16:21:47
category: tech
by: zj
description: 其实，碰到的只有一个问题，就是粗心！！！！1、eclipse自动编译的InvokeCpp.class可以直接用来生成.h文件。2、因为InvokeCpp.java放在DPP包中，所以在J:\\workspace\\KW-Index\\bin目录下执
permalink: /tech/65.html
---
其实，碰到的只有一个问题，就是粗心！！！！ 1、eclipse自动编译的InvokeCpp.class可以直接用来生成.h文件。 2、因为InvokeCpp.java放在DPP包中，所以在J:\\\\workspace\\\\KW-Index\\\\bin目录下执行 javah DPP.InvokeCpp(不是InvokeCpp.class,带上包名和“.”)，生成DPP\_InvokeCpp.h文件。 3、对于DPP\_InvokeCpp.h

``````````
#include <jni.h> 改为#include "jni.h"
``````````

把jni.h（在C:\\\\Program Files\\\\Java\\\\jdk1.7.0\_09\\\\include下）拷贝到c++工程目录下； 把jni\_md.h（在C:\\\\Program Files\\\\Java\\\\jdk1.7.0\_09\\\\include\\\\win32下）拷贝到c++工程目录下。 4、编写DPP\_InvokeCpp.cpp 遇到java string 和c++ string互相转换的问题： (1) jstring-->string

``````````
//Get the native string from javaString  cn is jstring
const char *nativeString = env->GetStringUTFChars(cn, 0);
``````````

一定要记得 env->ReleaseStringUTFChars(cn, nativeString); (2)string-->jstring

``````````
const char *aa = reStr.c_str();
jstring jstrBuf = env->NewStringUTF(aa);
``````````

``````````
reStr是之前得到的结果，string类型
``````````

5、在eclipse设置c++ build 模式用release，不要用debug，否则java程序调用生成的dll会报以下错误 Exception in thread "main" java.lang.UnsatisfiedLinkError: 6、编译的时候如果报以下错误，解决方法就是在.cpp文件里添加一个int mian()方法： undefined reference to \`WinMain@16' 7、因为c++代码中有很多个文件，在生成dll文件时，用如下命令 g++ -I  -Wl,-–add-stdcall-alias -shared -o InvokeCpp.dll \*.o 8、写程序的时候一定要细心，错一点的代价就是一下午都在找那个错误  