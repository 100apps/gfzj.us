---
layout: post
title: "删除pdf文件中的水印"
date: 2015-03-06 13:32:09
category: tech
by: gf
description: 下载了一些电子书，但是里面包括了一种类似页脚的东西，全是某个网站的链接。写了一个小程序出去这些链接
---
pdf是一种很常用的格式，但是不像纯文本我们可以直接`sed`，但是我们可以先研究一下pdf的格式，然后删除。java程序如下：
{%highlight java%}
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.BitSet;

/**
 * @author loganliu 通过关键字删除pdf中的某些obj。重要针对图书加水印的情况
 */
public class WatermarkRemover {

	public static void main(String[] args) {
		if (args.length < 2) {
			System.err
					.println("\n对于filename文件，删除含有keywords(不区分大小写)的obj\n\tjava WatermarkRemover filename keywords [newfilename]");
			System.exit(1);
		}
		byte[] ret = new WatermarkRemover().deleteWatermark(args[0], args[1]);
		String newFn = args.length > 2 ? args[2] : args[0];
		try {
			Files.write(Paths.get(newFn), ret);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	boolean arrayEquals(byte[] a, byte[] b, int start) {
		boolean eq = true;
		for (int i = 0; i < a.length; i++) {
			if (a[i] != b[i + start]) {
				eq = false;
				break;
			}
		}
		return eq;
	}

	private byte[] deleteWatermark(String fn, String str) {
		try {
			str = str.toLowerCase();
			byte[] bs = Files.readAllBytes(Paths.get(fn));
			BitSet ignoreBits = new BitSet(bs.length);
			ignoreBits.set(0, ignoreBits.length(), false);
			int from = 0;
			byte[] obj = "obj\n<<".getBytes();
			byte[] endobj = ">>\nendobj".getBytes();

			for (int i = 0; i < bs.length; i++) {
				if (bs[i] == 10) {// \n
					String line = new String(bs, from, i - from);
					if (line.toLowerCase().contains(str)) {
						if (line.endsWith(")Tj")) {
							int a = i, b = i;
							for (; a > 0; a--) {
								if (bs[a] == 66 && bs[a + 1] == 84
										&& bs[a + 2] == 10) {
									break;
								}
							}
							for (; b < bs.length; b++) {
								if (bs[b - 2] == 69 && bs[b - 1] == 84
										&& bs[b] == 10) {
									break;
								}
							}
							b++;
							ignoreBits.set(a, b, true);
						} else if (line.startsWith("\n/URI (")) {

							int a = i, b = i;
							for (; a > 0; a--) {
								if (arrayEquals(obj, bs, a))
									break;
							}
							a += 7;
							for (; b < bs.length; b++) {
								if (arrayEquals(endobj, bs, b))
									break;
							}
							// System.out.println(lineCount+"\t"+a + "-" + b);
							// System.out.println("---"+new
							// String(bs,a,b-a)+"-----\n\n\n");
							ignoreBits.set(a, b, true);
						} else
							ignoreBits.set(from, i, true);
					}
					from = i;
				}
			}
			ByteArrayOutputStream bo = new ByteArrayOutputStream();
			for (int i = 0; i < bs.length; i++) {
				if (!ignoreBits.get(i)) {
					bo.write(bs[i]);
				}
			}
			return bo.toByteArray();
		} catch (Exception e) {
			e.printStackTrace();
			return new byte[] {};
		}
	}
}

{%endhighlight%}

编译：

	javac WatermarkRemover.java

运行：

	java WatermarkRemover a.pdf b.pdf

效果
![pdf去处水印效果](/images/pdf-watermark-remover.png)