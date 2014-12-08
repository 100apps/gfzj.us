---
layout: post
title: "LinkedList遍历"
date: 2012-11-15 10:16:00
category: tech
by: gf
description: 今天发现有一段程序出奇地慢，重新查看了一下代码，有一行：LinkedListwd=getDownloadList(list);for(inti=0;i&lt;wd.size();i++){sb.append(wd.get(i)).append(&quot;\\n&quot;
permalink: /tech/59.html
---
今天发现有一段程序出奇地慢，重新查看了一下代码，有一行：

``````````
LinkedList wd = getDownloadList(list);
for (int i = 0; i < wd.size(); i++) {
   sb.append(wd.get(i)).append("\\n");
  }
``````````

怪不得慢，抓紧改成下面这样

``````````
for (String w : wd) {
   sb.append(w).append("\\n");
  }
``````````

当wd.size=465842的时候，瞬间完成了。晕死。喝多了，才会像上面那样遍历linkedlist吧。

另外，能用现成的工具处理的文本，自己就不用写程序了。神器比如，cut split wc 。效率没得说，飞一样。