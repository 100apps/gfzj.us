---
layout: post
title: "HBASE_CLASSPATH"
date: 2014-06-11 10:02:19
category: tech
by: zj
description: HBASE_CLASSPATHshouldbethepathofjarsyouwishtousewithyourHBase.Forexample,ifyouhavewrittenacustomHBasefiltertheninordertomakeitavai
permalink: /tech/141.html
---
HBASE\_CLASSPATH should be the path of jars you wish to use with your HBase. For example, if you have written a custom HBase filter then in order to make it available and use it in your app you need to uncomment and edit HBASE\_CLASSPATH in the hbase-env.sh to point it at the jar containing the filter.

IMHO, if you are going to use only the classes provided by HBase then you should not face any difficulty if you do not set this property, provided your HBase setups is proper.
