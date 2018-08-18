{
	"difficulty":"1",
	"submit_num":"185812",
	"show_id":"461",
	"leetcode_id":"461",
	"answers":[
		{
			"lc_ans_id":"94698",
			"view":"53489",
			"top":"0",
			"title":"Java 1 Line Solution :D",
			"vote":"107",
			"content":"What does come to your mind first when you see this sentence ```\"corresponding bits are different\"```? Yes, ```XOR```! Also, do not forget there is a decent function Java provided: ```Integer.bitCount()``` ~~~\\n```\\npublic class Solution {\\n    public int hammingDistance(int x, int y) {\\n        return Integer.bitCount(x ^ y);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"94705",
			"view":"24467",
			"top":"1",
			"title":"My C++ solution using bit manipulation",
			"vote":"76",
			"content":"```\\nclass Solution {\\npublic:\\n    int hammingDistance(int x, int y) {\\n        int dist = 0, n = x ^ y;\\n        while (n) {\\n            ++dist;\\n            n &= n - 1;\\n        }\\n        return dist;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"94697",
			"view":"22518",
			"top":"2",
			"title":"Python 1 line 49ms",
			"vote":"35",
			"content":"```class Solution(object):\\n    def hammingDistance(self, x, y):\\n        \"\"\"\\n        :type x: int\\n        :type y: int\\n        :rtype: int\\n        \"\"\"\\n        return bin(x^y).count('1')\\n```"
		},
		{
			"lc_ans_id":"94693",
			"view":"27454",
			"top":"3",
			"title":"Java 3-Line Solution",
			"vote":"28",
			"content":"```\\npublic int hammingDistance(int x, int y) {\\n    int xor = x ^ y, count = 0;\\n    for (int i=0;i<32;i++) count += (xor >> i) & 1;\\n    return count;\\n}\\n```"
		},
		{
			"lc_ans_id":"94704",
			"view":"2824",
			"top":"4",
			"title":"Javascript one line solution",
			"vote":"21",
			"content":"```\\n/**\\n * @param {number} x\\n * @param {number} y\\n * @return {number}\\n */\\nvar hammingDistance = function(x, y) {\\n    return (x ^ y).toString(2).replace(/0/g, '').length;\\n};"
		},
		{
			"lc_ans_id":"94879",
			"view":"8319",
			"top":"5",
			"title":"C simple solution, 0MS",
			"vote":"21",
			"content":"```\\nint hammingDistance(int x, int y) {\\n    \\n    int tmpInt=x^y;\\n    int dis=0;\\n    \\n    while(tmpInt)\\n    {\\n        if((tmpInt>>1)<<1 != tmpInt)\\n        {\\n            ++dis;\\n        }\\n        \\n        tmpInt>>=1;\\n    }\\n    \\n    return dis;\\n}\\n```"
		},
		{
			"lc_ans_id":"94713",
			"view":"2588",
			"top":"6",
			"title":"Java solution",
			"vote":"14",
			"content":"The problem is basically the same as counting the 1 bits in an integer, and the useful trick to do that is : xor & (xor - 1) will eliminate the last 1 bit in a integer.\\n\\n```\\n    public int hammingDistance(int x, int y) {\\n        int xor = x ^ y, count = 0;\\n        \\n        while (xor != 0) {\\n            xor &= (xor - 1);\\n            count++;\\n        }\\n        return count;\\n    }\\n```"
		},
		{
			"lc_ans_id":"94789",
			"view":"3727",
			"top":"7",
			"title":"Beats 100% Python",
			"vote":"11",
			"content":"```\\nclass Solution(object):\\n    def hammingDistance(self, x, y):\\n        \"\"\"\\n        :type x: int\\n        :type y: int\\n        :rtype: int\\n        \"\"\"\\n        x = x ^ y\\n        y = 0\\n        while x:\\n            y += 1\\n            x = x & (x - 1)\\n        return y\\n```"
		},
		{
			"lc_ans_id":"94731",
			"view":"1775",
			"top":"8",
			"title":"C# - Simple solution",
			"vote":"9",
			"content":"- Do XOR between the numbers which then gives the difference bits as '1'  \\n- Calculate those difference no.of bits by bit-END operation on preceding numbers until it is zero  \\n...............\\npublic int HammingDistance(int x, int y) {\\n        int z = x ^ y;\\n        int n = 0;\\n        while(z > 0)\\n        {\\n            z = z & (z-1);\\n            ++n;\\n        }\\n        return n;\\n    }\\n..............."
		},
		{
			"lc_ans_id":"94701",
			"view":"2857",
			"top":"9",
			"title":"Python Explanation",
			"vote":"8",
			"content":"We can find the i-th bit (from the right) of a number by dividing by 2 i times, then taking the number mod 2.\\n\\nUsing this, lets compare each of the i-th bits, adding 1 to our answer when they are different.\\n\\nCode:\\n```\\nans = 0\\nwhile x or y:\\n  ans += (x % 2) ^ (y % 2)\\n  x /= 2\\n  y /= 2\\nreturn ans\\n```"
		}
	],
	"id":"455",
	"title":"Hamming Distance",
	"content":"<p>The <a href=\"https://en.wikipedia.org/wiki/Hamming_distance\" target=\"_blank\">Hamming distance</a> between two integers is the number of positions at which the corresponding bits are different.</p>\r\n\r\n<p>Given two integers <code>x</code> and <code>y</code>, calculate the Hamming distance.</p>\r\n\r\n<p><b>Note:</b><br />\r\n0 &le; <code>x</code>, <code>y</code> &lt; 2<sup>31</sup>.\r\n</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n<b>Input:</b> x = 1, y = 4\r\n\r\n<b>Output:</b> 2\r\n\r\n<b>Explanation:</b>\r\n1   (0 0 0 1)\r\n4   (0 1 0 0)\r\n       &uarr;   &uarr;\r\n\r\nThe above arrows point to positions where the corresponding bits are different.\r\n</pre>\r\n</p>",
	"frequency":"622",
	"ac_num":"129502"
}