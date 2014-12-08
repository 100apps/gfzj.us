---
layout: post
title: " IEEE pdf Express出现Font Times New Roman is not embedded错误"
date: 2014-04-25 10:22:03
category: tech
by: zj
description: 我的.tex文件是KSRDB.tex1、先在TeXMaker中使用latex编译生成.dvi文件2、再texmaker的dvi-&gt;ps编译生成.ps文件3、命令行ps2pdf14-dPDFSETTINGS=/prepressKSRDB.pdfKSRDB-
permalink: /tech/132.html
---
我的.tex文件是KSRDB.tex 1、先在TeXMaker中使用latex编译生成.dvi文件 2、再texmaker的dvi->ps编译生成.ps文件 3、命令行ps2pdf14 -dPDFSETTINGS=/prepress KSRDB.pdf KSRDB-output.pdf 4、KSRDB-output.pdf就ok啦