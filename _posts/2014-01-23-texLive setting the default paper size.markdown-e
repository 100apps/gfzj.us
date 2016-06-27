---
layout: post
title: "texLive setting the default paper size"
date: 2014-01-23 16:22:14
category: tech
by: zj
description: paperpaper(a4|letter)(xdvi|pdftex|dvips|dvipdfmx|dvipdfm|context)paper(papersize|--list)Withnoarguments(tlmgrpaper),showsthedefaultpapersizesetting
permalink: /tech/115.html
---
## paper ##

**paper \[a4|letter\]**

**\[xdvi|pdftex|dvips|dvipdfmx|dvipdfm|context\] paper \[*papersize*|--list\]**

With no arguments (`tlmgr paper`), shows the default paper size setting for all known programs. With one argument (e.g., `tlmgr paper a4`), sets the default for all known programs to that paper size. With a program given as the first argument and no paper size specified (e.g., `tlmgr dvips paper`), shows the default paper size for that program. With a program given as the first argument and a paper size as the last argument (e.g., `tlmgr dvips paper a4`), set the default for that program to that paper size. With a program given as the first argument and `--list` given as the last argument (e.g., `tlmgr dvips paper --list`), shows all valid paper sizes for that program. The first size shown is the default. Incidentally, this syntax of having a specific program name before the `paper` keyword may seem strange. It is inherited from the longstanding `texconfig` script, which supports other configuration settings for some programs, notably `dvips`.`tlmgr` does not support those extra settings at present.  