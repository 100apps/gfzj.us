---
layout: post
title: "在int数组里面找出某个范围内的数，并排序"
date: 2015-07-10 09:14:57
category: tech
by: gf
description: 给定一个 int 数组，长度 200，里面的元素是 0-2000 内的随机数。找出 50-100 之间的所有数，并排序。
---

给定一个 int 数组，长度 200，里面的元素是 0-2000 内的随机数。找出 50-100 之间的所有数，并排序。首先，无论是先排序再查找，还是先查找在排序，肯定都不是最优算法，因为排序的算法复杂度在那里放着。所以一开始我想既然长度和范围都给了，那我就用一个长度是2000的bitset，来表示是否存在，这样就天然能排序了。但是这样不能解决重复问题。所以干脆用一个长度是2000的int数组，初始化为0，遇见一次就+1。后来在[v2ex](https://v2ex.com/t/204509)上跟大家讨论了一下。初始化max-min=50个桶就足够了。


{%highlight java%}
import java.util.Arrays;
import java.util.Random;

public class SortTest {
	public static void main(String[] args) {
		// 初始化
		int inputArrLength = 200;
		int maxValue = 2000;
		int min = 50, max = 100;

		int input[] = new int[inputArrLength];
		Random rand = new Random();
		System.out.println("input:");
		for (int i = 0; i < input.length; i++) {
			input[i] = rand.nextInt(maxValue);
			if (input[i] >= min && input[i] < max) {
				System.out.print(input[i] + ",");
			}
		}
		System.out.println();

		// bitset排序
		int bitset[] = new int[maxValue];
		Arrays.fill(bitset, 0);
		for (int i : input) {
			if (i >= min && i < max) {
				bitset[i]++;
			}
		}
		for (int i = 0; i < bitset.length; i++) {
			if (bitset[i] > 0) {
				for (int j = 0; j < bitset[i]; j++) {
					System.out.print(i + ",");
				}
			}
		}
		System.out.println();
		// 桶排序
		int bucket[] = new int[max - min];
		Arrays.fill(bucket, 0);
		for (int i : input) {
			if (i >= min && i < max) {
				bucket[i - min]++;
			}
		}
		for (int i = 0; i < bucket.length; i++) {
			if (bucket[i] > 0) {
				for (int j = 0; j < bucket[i]; j++) {
					System.out.print((i + min) + ",");
				}
			}
		}
	}
}

{%endhighlight%}

![Yosemite](/images/Yosemite.jpg)
有时候看看这张Yosemite的壁纸，感觉非常像学习一个东西的过程。我学习iOS开发，就好像从最左边开始爬山，一个人自学成才在最开始很容易走弯路，我现在的水平应该在那片小树林的位置，感觉很多东西要学，听说过很多名词，技术，但是都没有明白其中的原理，但是毕竟已经知道「世界这么大」了。只要努力把自己知道的都学习一下，爬过这个坎，就能穿过下树林，爬过一个陡峭的崖壁，到达「中级」的水品，就可以俯瞰这些小树林了。我想现在国内绝大部分高手也处在「中级」的这个水品，至于「顶点」，可能就是高山仰止的神龙见首不见尾的大牛了吧。

然而就想我知道的，学习的最好途径就是[观摩别人的代码](http://www.gfzj.us/series/learn-iOS-from-source-code/)，我相信只要我坚持下去，肯定能到「中级」的水品。因为到达这个地步，除了懒惰，没有敌人。
