---
layout: post
title: "fakeserver监控http服务请求"
date: 2014-05-27 11:38:32
category: tech
by: gf
keyword: php,fakeserver
description: 最近有同事，vps流量过大，被vps提供商强行停止服务。我们可以通过apache或者nginx的log去看看到底是哪些请求用去了比较大的流量，但是log比较分散，因为不同的域名，设置了不同的log
permalink: /tech/137.html
---
最近有同事，vps流量过大，被vps提供商强行停止服务。我们可以通过apache或者nginx的log去看看到底是哪些请求用去了比较大的流量，但是log比较分散，因为不同的域名，设置了不同的log路径，想起php现在已经提供了build-in server，我们可以用这个功能，替代http服务器，监控请求。

## 使用方法 ##

首先停止原先的http服务器，比如sudo /opt/lampp/lampp stopapache 或者sudo nginx -s stop。然后启动fakeserver：

``````````
sudo php -S 0.0.0.0:80 fakeserver.php  
#在后台启用。如果要停止的话，可以killall。
``````````

现在就可以随时统计了：php fakeserver.php

## 禁用蜘蛛 ##

有的蜘蛛就是垃圾，比如阿里云的、bing的，没多少流量，但是胃口不小，尤其是在宕机恢复以后，我们可以通过iptables把这些蜘蛛ip禁用掉，通过上面的分析我们已经得到常用的这些ip。还有一种方法，通过http服务器判断useragent，比如apache，在Directory里添加：

``````````
BrowserMatchNoCase "bingbot" badguy
deny from env=badguy
``````````

## 下载 ##

[fakeserver][]

附带fakeserver.php源码，粘贴过去直接运行即可。

`<?php $fn="fakeserver.log"; if(PHP_SAPI == 'cli'){ $log=array(); if (($handle = fopen($fn, "r")) !== FALSE) { while (($data = fgetcsv($handle, 0, "\\t")) !== FALSE) $log[]=$data; fclose($handle); } $name=array("时间"); foreach (array("时间"=>0,"IP"=>1,"域名"=>3,"路径"=>4,"useragent"=>5) as $name=>$i){ if($i==0){ $min=PHP_INT_MAX;$max=0;$count=0; foreach ($log as $line){ $v=intval($line[0]); if($v<$min)$min=$v; if($v>$max)$max=$v; $count++; } echo "\\n\\n#".$name."\\n\\n"; echo "在 ".($max-$min)." 秒时间内，共有 ".$count." 次请求.\\n"; continue; } $result=array(); $kv=array(); foreach ($log as $line){ $result[$line[$i]]=isset($result[$line[$i]])?$result[$line[$i]]+1:1; $kv[$line[$i]]=implode("\\t", $line); } arsort($result,SORT_NUMERIC); echo "\\n\\n#".$name."\\n\\n"; $count=0; foreach ($result as $k=>$v){ if($count++>10)break; echo $v."\\t".$kv[$k]."\\n"; } } //var_dump($log); die("ok"); } /*创造一个假的服务器，用来统计谁在访问服务器。*/ $log=$_SERVER["REQUEST_TIME"]."\\t".$_SERVER["REMOTE_ADDR"]."\\t".$_SERVER["REMOTE_PORT"]."\\t".$_SERVER["HTTP_HOST"]."\\t".$_SERVER["REQUEST_URI"]."\\t".$_SERVER["HTTP_USER_AGENT"]."\\n"; file_put_contents($fn, $log,FILE_APPEND| LOCK_EX ); //return 503 $protocol = "HTTP/1.0"; if ( "HTTP/1.1" == $_SERVER["SERVER_PROTOCOL"] ) $protocol = "HTTP/1.1"; header( "$protocol 503 Service Unavailable", true, 503 ); header( "Retry-After: 3600" ); die("<h1>503 Service Unavailable</h1>");`


[fakeserver]: http://gfzj.us/wp-content/uploads/2014/05/fakeserver.7z