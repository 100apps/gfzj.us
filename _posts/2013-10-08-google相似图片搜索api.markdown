---
layout: post
title: "google相似图片搜索api"
date: 2013-10-08 10:44:12
category: tech
by: gf
keyword: cv,google,相似图片搜索
description: google的很多产品都有api，但是相似图片搜索一直没有找到。昨天看到导报说：Chrome30正式版发布，简化图片搜索功能,我的浏览器自动升级到chrome30，但是没有发现右键图片搜索。于
permalink: /tech/102.html
---
google的很多产品都有api，但是相似图片搜索一直没有找到。昨天看到导报说：[Chrome 30 正式版发布，简化图片搜索功能][Chrome 30],我的浏览器自动升级到chrome30，但是没有发现右键图片搜索。于是google了一下，发现google为chrome和firefox都开发了相应的扩展(Search Google with this image)。于是抓紧下载了一下。

研究了一下源文件，发现两种相似图片调用的方法：

# # 直接post到google服务器 ##

chrome下面的插件默认的是这种方式，把图片base64编码，然后构造一个form，直接提交给google，这样应该是最快的了。用java实现应该是非常简单的：

    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    
    public class ImageSearch {
    
     String encode(String path) {
      try {
       byte[] b = Files.readAllBytes(Paths.get(path));
       return new sun.misc.BASE64Encoder().encode(b).replace("\\n", "")
         .trim().replace('+', '-').replace('/', '_')
         .replace('.', '=');
      } catch (IOException e) {
       e.printStackTrace();
      }
    
      return null;
    
     }
    
     String toHtml(String path) {
      StringBuilder sb = new StringBuilder(
        "<form id='f' method='POST' action='https://www.google.com/searchbyimage/upload' enctype='multipart/form-data'>\\n");
      sb.append("<input type='hidden' name='image_content' value='")
        .append(encode(path)).append("' />");
      sb.append("</form>\\n<script>document.getElementById('f').submit();</script>");
      return sb.toString();
     }
    
     public static void main(String[] args) {
      ImageSearch is = new ImageSearch();
      System.out.println(is.toHtml("/ramdisk/a.jpg"));
    
     }
    
    }

# # 直接给url ##

firefox下的插件默认是这种方法。通过一个传递一个url参数，google自动抓取，然后搜索。

    http://www.google.com/searchbyimage?sbisrc=ff_1_1_2&image_url=http%3A%2F%2Fwww.baidu.com%2Fimg%2Fbdlogo.gif

如果我们使用的话，需要一个中转服务器。先把图片上传，然后得到url，传给google，中间多了一步。

记得很早以前，大概读大二的时候吧，一个老师来学校演讲。提到计算机视觉，说我们以后见到一种花，不知道是什么，直接拍一张照片，一搜索，就知道了。现在google已经做得很好了，不知道谁能做一个手机上的应用？来解救一下无知的劳苦大众。


[Chrome 30]: http://www.oschina.net/news/44704/chrome-30-final-simplifies-image-searching
