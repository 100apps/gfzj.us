---
layout: post
title: "RushPlayer流媒体地址提取"
date: 2014-07-03 21:06:49
category: tech
by: gf
keyword: rushplay,vlc,流媒体播放地址,网络电视,网络电台
description: RushPlayer是一个不错的播放器，功能挺全的，不过开发起来应该难度不大，因为libvlc基本上把底层的工作做了，只需要做个界面就差不多了，比较有意思的是，内置了一个流媒体，用了vlc的同
permalink: /tech/145.html
---
![元首万岁思密达][c5006725817bce353f665bc70c5b4c59.jpg]

[RushPlayer][]是一个不错的播放器，功能挺全的，不过开发起来应该难度不大，因为libvlc基本上把底层的工作做了，只需要做个界面就差不多了，比较有意思的是，内置了一个流媒体，用了vlc的同学很开心，因为地址都有了，直接用vlc打开就可以了啊，相当于RushPlayer为大家整理了一个流媒体列表，相当不错。

RushPlayer的流媒体播放地址在：

``````````
http://rushplayer.com/wapstream.aspx?t=1&v=1.53&app=1000
``````````

首先写个程序，把这个列表抓下来，然后保存成json格式，方便后期处理，用java确实不是很方便，因为代码太长了，估计Python，10行就能搞定。但是熟能生巧，用起来顺手，没办法。

``````````
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * http://rushplayer.com/wapstream.aspx?t=1&v=1.53&app=1000
 * 把rushplayer的播放列表转成json格式。
 * 
 * @author GF<gf@gfzj.us>
 *
 */
public class RushPlayer {
 Logger log = Logger.getLogger("RushPlayer");

 private byte[] Input2Byte(InputStream in) {
  byte[] buf = new byte[2048];
  try {
   ByteArrayOutputStream bo = new ByteArrayOutputStream();
   int len = -1;
   while ((len = in.read(buf)) > 0) {
    bo.write(buf, 0, len);
   }
   in.close();
   buf = bo.toByteArray();
   bo.close();
  } catch (IOException e) {
   e.printStackTrace();
  }
  return buf;
 }

 public byte[] get(String url) {
  HttpURLConnection con = null;
  log.info(url);
  try {
   con = (HttpURLConnection) new URL(url).openConnection();
   con.addRequestProperty("Accept-Language",
     "zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3");
   con.setRequestProperty(
     "User-Agent",
     "Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3");
   con.setReadTimeout(10000);
   con.setConnectTimeout(5000);
   return Input2Byte(con.getInputStream());// new
  } catch (IOException e) {
   e.printStackTrace();
   System.out.println(new String(Input2Byte(con.getErrorStream())));
  }
  return null;
 }

 public String getStr(String url) {
  try {
   return new String(get(url), "UTF-8");
  } catch (UnsupportedEncodingException e) {
   e.printStackTrace();
   return null;
  }
 }

 Pattern Pone = Pattern.compile("<a href=\\"(.*?)\\">(.*?)</a>",
   Pattern.DOTALL | Pattern.MULTILINE);

 public String getOne(String url) {
  String html = getStr(url);
  html = html.substring(html.lastIndexOf("suggestlist"));
  Matcher m = Pone.matcher(html);
  StringBuilder sb = new StringBuilder();
  while (m.find()) {
   sb.append(",\\n\\"").append(m.group(1).trim().replace("\\"", "\\\\\\""))
     .append("\\":\\"")
     .append(m.group(2).trim().replace("\\"", "\\\\\\""))
     .append("\\"");
  }
  return sb.length() > 0 ? sb.substring(2) : "";
 }

 public String getAll() {
  StringBuilder sb = new StringBuilder();
  Pattern Ptitle = Pattern.compile("color:Wheat;\\">(.*?)</span>");
  Pattern Plist = Pattern.compile("<a  href=\\"(.*?)\\">(.*?)</a>",
    Pattern.DOTALL | Pattern.MULTILINE);
  for (int i = 0; i < 3; i++) {
   String html = getStr("http://rushplayer.com/wapstream.aspx?v=1.53&app=1000&t="
     + i);
   Matcher m = Ptitle.matcher(html);
   if (m.find()) {
    String title = m.group(1).trim();
    sb.append(",\\n\\"").append(title).append("\\":{\\n");
    html = html.substring(html.indexOf("suggestlist"));
    Matcher m1 = Plist.matcher(html);
    StringBuilder lists = new StringBuilder();
    while (m1.find()) {
     lists.append(",\\n").append("\\"")
       .append(m1.group(2).trim().replace("\\"", "\\\\\\""))
       .append("\\":{");
     lists.append(
       getOne("http://rushplayer.com/"
         + (m1.group(1).trim()))).append("\\n");
     lists.append("}");
    }
    if (lists.length() > 0)
     sb.append(lists.substring(2));
    sb.append("\\n}");
   }
  }
  return "{\\n" + sb.substring(2) + "\\n}";
 }

 public static void main(String[] args) {
  RushPlayer rp = new RushPlayer();
  System.out.println(rp.getAll());
 }

}
``````````

使用：

1.  编译：javac RushPlayer.java -encoding utf-8
2.  运行: java RushPlayer > playlist.json

下面就可以通过处理这个json文件来处理这个列表了。javascript或者node.js或者php都可以啊。下面这个列表是我在2014年07月03日提出出来的，rushplayer可能有更新，建议自己生成。[点击下载rushplayer流媒体列表][rushplayer]

举个例子，我用js处理这个json文件成vlc播放列表：

``````````
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title></title>
<script type="text/javascript" src="rushplayer.json"></script>
</head>
<body>
<textarea id="result" name="" cols="80" rows="10"></textarea>
<script>
var result='<?xml version="1.0" encoding="UTF-8"?>\\n<playlist xmlns="http://xspf.org/ns/0/" xmlns:vlc="http://www.videolan.org/vlc/playlist/ns/0/" version="1">\\n<title>RushPlayer</title>\\n<trackList>';
for(var i in s){
 console.log(i);
 for(var j in s[i]){
  console.log(j);
  for(var k in s[i][j]){
   result+="<track><title>"+(i+"/"+j+"/"+s[i][j][k])+"</title><location>"+k+"</location></track>\\n";
  }
 }
}
result+="</trackList></playlist>";
result=result.replace(/&/g,'&');
document.getElementById("result").value=result;
</script> 
</body>
</html>
``````````

现在你可以下载这个播放列表直接用vlc打开：[rushplayer.xspf][]

## 意外发现 ##

今天发现一个朝鲜电视台：mmst://112.170.78.145/chosun 主持人说话都带哭的，真受不鸟。大家一定要自己用MPlayer或者vlc感受一下。


[c5006725817bce353f665bc70c5b4c59.jpg]: http://www.gfzj.us/gfzjus_blog/tech/2014-10-22/c5006725817bce353f665bc70c5b4c59.jpg
[RushPlayer]: http://itunes.apple.com/cn/app/rushplayer/id452990487?mt=8
[rushplayer]: http://gfzj.us/wp-content/uploads/2014/07/rushplayer.json_.7z
[rushplayer.xspf]: http://gfzj.us/wp-content/uploads/2014/07/rushplayer.xspf_.7z