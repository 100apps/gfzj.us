---
layout: post
title: "linux java 中文字体"
date: 2012-07-19 19:07:08
category: tech
by: gf
description: 在一台美国的vps上用java处理图片，在图片上加中文文字。发现出来的都是方块。应该是字体问题，于是用fc-cache-fv但是没有这个命令。需要apt-getinstallfontconfigapt-cache
permalink: /tech/39.html
---
在一台美国的vps上用java处理图片，在图片上加中文文字。发现出来的都是方块。应该是字体问题，于是用 fc-cache -fv 但是没有这个命令。需要 apt-get install fontconfig apt-cache search fc-cache 竟然没有结果，耽误时间。 最后用java程序检测一下，是否可以正常显示：

    import java.awt.Color;
    import java.awt.Graphics;
    import java.awt.image.BufferedImage;
    import java.io.File;
    import java.util.HashMap;
    
    import javax.imageio.ImageIO;
    
    public class Test {
     public static void main(String[] args) {
      try {
       BufferedImage i = ImageIO.read(new File("/tmp/a.jpg"));
       Graphics g = i.getGraphics();
       g.setFont(g.getFont().deriveFont(15f));
       HashMap t = new HashMap();
       t.put("罗马尼亚", "﻿Te iubesc");
       t.put("加泰隆语", "﻿t'estimo");
       t.put("越南语", "﻿Anh yêu em");
       t.put("土耳其语", "﻿Seni seviyorum");
       t.put("挪威语", "﻿Jeg elsker deg");
       t.put("海地克里奥尔语", "﻿Mwen renmen ou");
       t.put("Hmong Daw", "﻿kuv hlub koj");
       t.put("匈牙利语", "﻿Szeretlek");
       t.put("拉脱维亚语", "﻿Es tevi mīlu");
       t.put("印地语", "﻿मुझे तुमसे प्यार है");
       t.put("立陶宛语", "﻿Myliu");
       t.put("简体中文", "﻿我爱你");
       t.put("泰语", "﻿ฉันรักเธอ");
       t.put("德语", "﻿Ich liebe dich");
       t.put("繁体中文", "﻿我愛你");
       t.put("印度尼西亚语", "﻿Aku cinta kamu");
       t.put("芬兰语", "﻿Minä rakastan sinua");
       t.put("瑞典语", "﻿Jag älskar dig");
       t.put("法语", "﻿Je t'aime");
       t.put("保加利亚语", "﻿Обичам те");
       t.put("斯洛文尼亚语", "﻿Ljubim te");
       t.put("斯洛伐克语", "﻿Milujem ťa");
       t.put("乌克兰语", "﻿Я тебе кохаю");
       t.put("丹麦语", "﻿Jeg elsker dig");
       t.put("意大利语", "﻿Ti amo");
       t.put("朝鲜语", "﻿당신을 사랑해요");
       t.put("阿拉伯语", "﻿أحبك");
       t.put("希伯来语", "﻿אני אוהב אותך");
       t.put("捷克语", "﻿Miluju tě");
       t.put("希腊语", "﻿Σε αγαπώ");
       t.put("葡萄牙语", "﻿Eu te amo");
       t.put("波兰语", "﻿Kocham cię");
       t.put("英语", "﻿i love you");
       t.put("俄语", "﻿Я тебя люблю");
       t.put("爱沙尼亚语", "﻿Ma armastan sind");
       t.put("西班牙语", "﻿Te quiero");
       t.put("荷兰语", "﻿Ik hou van jou");
       t.put("日语", "﻿愛しています");
       int c = 1;
       g.setColor(Color.BLUE);
       for (String key : t.keySet()) {
        System.out.println(key + ":"
          + (g.getFont().canDisplayUpTo(t.get(key)) == -1));
        g.drawString(t.get(key), 10, 15 * (c++));
       }
       g.dispose();
       ImageIO.write(i, "jpg", new File("/tmp/out.jpg"));
      } catch (Exception e) {
       e.printStackTrace();
      }
     }
    }
