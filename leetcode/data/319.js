{
	"difficulty":"2",
	"submit_num":"106671",
	"show_id":"319",
	"leetcode_id":"319",
	"answers":[
		{
			"lc_ans_id":"77104",
			"view":"31086",
			"top":"0",
			"title":"Math solution..",
			"vote":"478",
			"content":"    int bulbSwitch(int n) {\\n        return sqrt(n);\\n    }\\n\\nA bulb ends up on iff it is switched an odd number of times.\\n\\nCall them bulb 1 to bulb n. Bulb i is switched in round d if and only if d divides i. So bulb i ends up on if and only if it has an odd number of divisors.\\n\\nDivisors come in pairs, like i=12 has divisors 1 and 12, 2 and 6, and 3 and 4. Except when i is a square, like 36 has divisors 1 and 36, 2 and 18, 3 and 12, 4 and 9, and double divisor 6. So bulb i ends up on if and only if i is a square.\\n\\n**So just count the square numbers.**\\n\\nLet R = int(sqrt(n)). That's the root of the largest square in the range [1,n]. And 1 is the smallest root. So you have the roots from 1 to R, that's R roots. Which correspond to the R squares. So int(sqrt(n)) is the answer. (C++ does the conversion to int automatically, because of the specified return type)."
		},
		{
			"lc_ans_id":"77112",
			"view":"13812",
			"top":"1",
			"title":"Share my o(1) solution with explanation",
			"vote":"179",
			"content":"    class Solution {\\n    public:\\n        int bulbSwitch(int n) {\\n            return sqrt(n);\\n        }\\n    };\\n As we know that there are n bulbs, let's name them as 1, 2, 3, 4, ..., n.  \\n\\n 1. You first turn on all the bulbs.\\n 2. Then, you turn off every second bulb.(2, 4, 6, ...)\\n 3. On the third round, you toggle every third bulb.(3, 6, 9, ...) \\n 4. For the ith round, you toggle every i bulb.(i, 2i, 3i, ...)\\n 5. For the nth round, you only toggle the last bulb.(n)\\n\\n\\n----------\\n\\n\\nIf n > 6, you can find that bulb 6 is toggled in round 2 and 3. \\n\\nLater, it will also be toggled in round 6, and round 6 will be the last round when bulb 6 is toggled.\\n\\nHere, **2,3 and 6 are all *factors* of 6 (except 1).**\\n\\n----------\\n**Prove:**\\n----------\\n\\nWe can come to the conclusion that **the bulb *i* is toggled *k* times.**\\n\\nHere, ***k*** is **the number of *i*'s factors (except 1)**.\\n\\n***k* + 1** will be **the total number of *i*'s factors**\\n\\n\\n----------\\n\\n\\nFor example:\\n\\n - **Factors of 6: 1, 2, 3, 6 (3 factors except 1, so it will be toggled 3 times)**\\n - **Factors of 7: 1, 7 (1 factors except 1, so it will be toggled once)**\\n....\\n\\nNow, the key problem here is to judge **whether *k* is *even* or *odd*.**\\n\\n----------\\n\\nSince **all bulbs are on at the beginning**, we can get:\\n\\n - **If *k* is *odd*, the bulb will be *off* in the end.(after odd times of toggling).**\\n - **If *k* is *even*, the bulb i will be *on* in the end (after even times of toggling).**\\n\\nAs we all know, **a natural number can divided by 1 and itself**, and **all factors appear *in pairs***.\\n\\n**When we know that *p* is *i*'s factor, we are sure *q* = *i/p* is also *i*'s factor.**\\n\\n**If *i* has no factor *p* that makes *p* = *i/p*, *k*+ 1 is even.**\\n\\n**If *i* has a factor *p* that makes *p* = *i/p* (*i* = *p*^2, *i* is a perfect square of *p*), *k*+ 1 is odd.**\\n\\n\\n----------\\n\\n\\nSo we get that **in the end**:\\n\\n - If ***i*** is a **perfect square** , *k*+ 1 is odd, ***k* is even (bulb *i* is on)**.\\n - If ***i*** is **NOT** a **perfect square** , *k*+ 1 is even, ***k* is odd (bulb *i* is off)**.\\n\\n----------\\n\\nWe want to find **how many *bulbs* are on** after *n* rounds (**In the end**).\\n\\nThat means we need to find out **how many *perfect square numbers* are NO MORE than *n***.\\n\\nThe **number of *perfect square numbers* which are no more than *n***, is the ***square root* of the *maximum perfect square number* which is NO MORE than *n***\\n\\n----------\\n**Result:**\\n----------\\n\\nThe ***square root* of the *maximum perfect square number* which is NO MORE than *n*** is the \\n***integer part* of *sqrt(n)*.**\\n\\n(**If *i* = 1, it will NEVER be toggled, *k* is 0 (even) here which meets the requirement.**)"
		},
		{
			"lc_ans_id":"77133",
			"view":"5880",
			"top":"2",
			"title":"My 0 ms C++ solution with explanation",
			"vote":"49",
			"content":"    int bulbSwitch(int n) {\\n        int counts = 0;\\n        \\n        for (int i=1; i*i<=n; ++i) {\\n            ++ counts;    \\n        }\\n        \\n        return counts;\\n    }\\n\\nExplanation:  \\nA light will be toggled only during the round of its factors, e.g.  number 6 light will be toggled at 1,2,3,6 and light 12 will be toggled at 1,2,3,4,6,12.   The final state of a light is on and off only depends on if the number of its factor is odd or even.    If odd, the light is on and if even the light is off.   The number of one number's factor is odd if and only if it is a perfect square!   \\nSo we will only need to loop to find all the perfect squares that are smaller than n!"
		},
		{
			"lc_ans_id":"77132",
			"view":"5208",
			"top":"3",
			"title":"The simplest and most efficient solution well-explained",
			"vote":"37",
			"content":"### Solution\\nBefore we take a jump to the solution, let's first try to clear out what exactly the problem is talking about: \\n - every i-th distance you switch the bulb to the opposite state (from on to off, or from off to on); actually suppose the bulbs are labelled from 1 to n then the every second bulb will mean that 2, 4, 6, 8, ... all even numbers less than n; while every third bulb will be 3, 6, 9, 12, ... all multiples of 3 that is less than n and so on; \\n - since the bulb will only have two different states - on or off, the result will be quite clear now; odd switching operations will result in bulb-on state (since original state is bulb-off) while even switching operations will give us bulb-off state;\\n\\nNow the purpose here is clear searching for the **odd-operation numbers**: \\n - as for primes, they only have 1 and itself as their factors, even-operation numbers;\\n - as for non-primes, normally they will have different pairs of factors like 12 whose factors are (1, 12), (3, 4), (2, 6) - 6 different factors, also even-operation numbers;\\n - but among non-primes, there are some special numbers, perfect square numbers like 9 whose factors are (1, 9) and (3, 3) - odd-operation numbers, which means there will be only three different numbers that will affect the current bulb and result in bulb-on state!\\n\\nSo that's all we need to know to hack this problem now. But how to get the amount of squares that are less than n, quite simple. Sqrt(n) is the answer, since all square numbers that is less than n will be 1, 4, 9 ... n and their corresponding square roots will be 1, 2, 3,... sqrt(n).\\n\\n - Space cost O(1)\\n - Time cost O(1)\\n\\n```\\n//AC - 0ms;\\nint bulbSwitch(int n) {\\n\\treturn sqrt(n);\\n}\\n```\\nAlways welcome new ideas and `practical` tricks, just leave them in the comments!"
		},
		{
			"lc_ans_id":"77144",
			"view":"5144",
			"top":"4",
			"title":"One line java with explanation",
			"vote":"33",
			"content":"factor of 6: 1,2,3,6\\nfactor of 7: 1,7 \\nfactor of 9: 1,3,9\\n\\nso all number have even number of factors except square number(e.g: factor of 9:1,3,9). \\nsquare number must turn on because of odd number of factors(9: turn on at 1st, off at 3rd, on at 9th)\\nother number must turn off(6: turn on at 1st, off at 2nd, on at 3rd, off at 6th)\\nso we only need to compute the number of square number less equal than n\\n\\n    public class Solution {\\n        public int bulbSwitch(int n) {\\n            return (int)Math.sqrt(n);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"77145",
			"view":"3320",
			"top":"5",
			"title":"Crystal clear explanation, one line c++ code",
			"vote":"25",
			"content":"Ok, very verbose explanation, but clear enough for everyone to understand.\\n\\nthe initial state all bulbs are off.\\n\\nif at last the bulb was toggled odd number of times, it is on.\\nif toggled even number of times, it is off.\\n\\nsimple enough, and that number is determined by how many factors a number has.\\nnote that every number has 1 and itself as a factor. and if it has multiple times of a factor\\nit only counted once.\\n\\n1 --------- 1\\n\\n2 --------- 1, 2\\n\\n3 --------- 1, 3\\n\\n4 --------- 1, 2, 4\\n\\n5 --------- 1, 5\\n\\n6 --------- 1, 2, 3, 6\\n\\n7 --------- 1, 7\\n\\n8 --------- 1, 2, 4, 8\\n\\n9 --------- 1, 3, 9\\n\\nsee that only square numbers like 1, 4 and 9 has odd number of factors.\\nbulbs at those numbers will left on after all the rounds of toggle.\\n\\nso basically, we calculate how many square numbers are there within a given number.\\nand we can get it simply by calculate the square root of that number. of course the decimal part is eliminated.\\n\\n\\n    class Solution {\\n    public:\\n        int bulbSwitch(int n) {\\n            return sqrt(n);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"77136",
			"view":"1915",
			"top":"6",
			"title":"The original question should be updated",
			"vote":"23",
			"content":"It only stated the first, second, third, and last round. Should be updated as follows:\\n\\nThere are n bulbs that are initially off. You first turn on all the bulbs. Then, you turn off every second bulb. On the third round, you toggle every third bulb (turning on if it's off or turning off if it's on). **For the ith round, you toggle every i bulb.** For the nth round, you only toggle the last bulb. Find how many bulbs are on after n rounds."
		},
		{
			"lc_ans_id":"77147",
			"view":"2780",
			"top":"7",
			"title":"One Line Math Solution with some explanation",
			"vote":"16",
			"content":"    // For prime numbers, they must be off because we can reach them only twice (The first round and their own round).\\n    /* For other numbers, if we can reach them odd times, then they are on; otherwise, they are off. So only \\n     those numbers who have square root will be reached odd times and there are sqrt(n) of them because\\n     for every x > sqrt(n), x*x > n and thus should not be considered as the answer. */\\n    \\n     return (int)sqrt(n);"
		},
		{
			"lc_ans_id":"77129",
			"view":"1114",
			"top":"8",
			"title":"C Solution with 0ms",
			"vote":"12",
			"content":"    We are toggling the nth bulb that much number of times as much there are factors of it. Thus number i with even number of factors will be off and bulb at number j with odd number of factors will be on.\\n    And only square numbers have odd number of factors. E.g 1(only 1), 4(1,2,4) ,  9(1,3,9), 16(1,2,4,8,16)...and so on...thus we have to find number of perfect squares within n which can be simply reduced to square root of n.\\n    \\n        int bulbSwitch(int n) {\\n            int i;\\n            for(i=1; i*i<=n; i++);\\n            return i-1;\\n        }"
		},
		{
			"lc_ans_id":"77146",
			"view":"1395",
			"top":"9",
			"title":"One line Python Solution of O(1)",
			"vote":"6",
			"content":"    class Solution(object):\\n        def bulbSwitch(self, n):\\n            return int(n**(0.5))"
		}
	],
	"id":"319",
	"title":"Bulb Switcher",
	"content":"<p>\r\nThere are <i>n</i> bulbs that are initially off. You first turn on all the bulbs. Then, you turn off every second bulb. On the third round, you toggle every third bulb (turning on if it's off or turning off if it's on). For the <i>i</i>th round, you toggle every <i>i</i> bulb. For the <i>n</i>th round, you only toggle the last bulb.\r\n\r\nFind how many bulbs are on after <i>n</i> rounds.\r\n</p>\r\n\r\n<p>\r\n<b>Example:</b><br></p>\r\n<pre>\r\nGiven <i>n</i> = 3. <br>\r\nAt first, the three bulbs are <b>[off, off, off]</b>.\r\nAfter first round, the three bulbs are <b>[on, on, on]</b>.\r\nAfter second round, the three bulbs are <b>[on, off, on]</b>.\r\nAfter third round, the three bulbs are <b>[on, off, off]</b>. <br>\r\nSo you should return 1, because there is only one bulb is on.\r\n</pre>",
	"frequency":"533",
	"ac_num":"45699"
}