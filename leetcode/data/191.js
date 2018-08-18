{
	"difficulty":"1",
	"submit_num":"447787",
	"show_id":"191",
	"leetcode_id":"191",
	"answers":[
		{
			"lc_ans_id":"55099",
			"view":"31944",
			"top":"0",
			"title":"Simple Java Solution, Bit Shifting",
			"vote":"203",
			"content":"```\\npublic static int hammingWeight(int n) {\\n\\tint ones = 0;\\n    \\twhile(n!=0) {\\n    \\t\\tones = ones + (n & 1);\\n    \\t\\tn = n>>>1;\\n    \\t}\\n    \\treturn ones;\\n}\\n```\\n - An Integer in Java has 32 bits, e.g. 00101000011110010100001000011010.\\n - To count the 1s in the Integer representation we put the input int\\n   n in bit AND with 1 (that is represented as\\n   00000000000000000000000000000001, and if this operation result is 1,\\n   that means that the last bit of the input integer is 1. Thus we add it to the 1s count.\\n\\n> ones = ones + (n & 1);\\n\\n - Then we shift the input Integer by one on the right, to check for the\\n   next bit.\\n\\n> n = n>>>1;\\n\\nWe need to use bit shifting unsigned operation **>>>** (while **>>** depends on sign extension)\\n\\n - We keep doing this until the input Integer is 0.\\n\\nIn Java we need to put attention on the fact that the maximum integer is 2147483647. Integer type in Java is signed and there is no unsigned int. So the input 2147483648 is represented in Java as -2147483648 (in java int type has a cyclic representation, that means **Integer.MAX_VALUE+1==Integer.MIN_VALUE**).\\nThis force us to use \\n\\n> n!=0\\n\\n in the while condition and we cannot use \\n\\n> n>0\\n\\nbecause the input 2147483648 would correspond to -2147483648 in java and the code would not enter the while if the condition is n>0 for n=2147483648."
		},
		{
			"lc_ans_id":"55120",
			"view":"11234",
			"top":"1",
			"title":"Short code of C++, O(m) by time, m is the count of 1's,  and another several method of O(1) time",
			"vote":"69",
			"content":"Each time of \"n &= n - 1\", we delete one '1' from n.\\n\\n    int hammingWeight(uint32_t n)\\n    {\\n        int res = 0;\\n        while(n)\\n        {\\n            n &= n - 1;\\n            ++ res;\\n        }\\n        return res;\\n    }\\n\\nAnother several method of O(1) time.\\n\\nAdd 1 by Tree:\\n\\n    // This is a naive implementation, shown for comparison, and to help in understanding the better functions. \\n    // It uses 24 arithmetic operations (shift, add, and).\\n    int hammingWeight(uint32_t n)\\n    {\\n        n = (n & 0x55555555) + (n >>  1 & 0x55555555); // put count of each  2 bits into those  2 bits \\n        n = (n & 0x33333333) + (n >>  2 & 0x33333333); // put count of each  4 bits into those  4 bits \\n        n = (n & 0x0F0F0F0F) + (n >>  4 & 0x0F0F0F0F); // put count of each  8 bits into those  8 bits \\n        n = (n & 0x00FF00FF) + (n >>  8 & 0x00FF00FF); // put count of each 16 bits into those 16 bits \\n        n = (n & 0x0000FFFF) + (n >> 16 & 0x0000FFFF); // put count of each 32 bits into those 32 bits \\n        return n;\\n    }\\n\\n    // This uses fewer arithmetic operations than any other known implementation on machines with slow multiplication.\\n    // It uses 17 arithmetic operations.\\n    int hammingWeight(uint32_t n)\\n    {\\n        n -= (n >> 1) & 0x55555555; //put count of each 2 bits into those 2 bits\\n        n = (n & 0x33333333) + (n >> 2 & 0x33333333); //put count of each 4 bits into those 4 bits\\n        n = (n + (n >> 4)) & 0x0F0F0F0F; //put count of each 8 bits into those 8 bits\\n        n += n >> 8; // put count of each 16 bits into those 8 bits\\n        n += n >> 16; // put count of each 32 bits into those 8 bits\\n        return n & 0xFF;\\n    }\\n\\n    // This uses fewer arithmetic operations than any other known implementation on machines with fast multiplication.\\n    // It uses 12 arithmetic operations, one of which is a multiply.\\n    int hammingWeight(uint32_t n)\\n    {\\n        n -= (n >> 1) & 0x55555555; // put count of each 2 bits into those 2 bits\\n        n = (n & 0x33333333) + (n >> 2 & 0x33333333); // put count of each 4 bits into those 4 bits\\n        n = (n + (n >> 4)) & 0x0F0F0F0F; // put count of each 8 bits into those 8 bits \\n        return n * 0x01010101 >> 24; // returns left 8 bits of x + (x<<8) + (x<<16) + (x<<24)\\n    }\\n\\n\\u2014\\u2014From Wikipedia."
		},
		{
			"lc_ans_id":"55255",
			"view":"7663",
			"top":"2",
			"title":"C++ Solution: n & (n - 1)",
			"vote":"56",
			"content":"    int hammingWeight(uint32_t n) {\\n        int count = 0;\\n        \\n        while (n) {\\n            n &= (n - 1);\\n            count++;\\n        }\\n        \\n        return count;\\n    }\\n\\nn & (n - 1) drops the lowest set bit. It's a neat little bit trick.\\n\\nLet's use n = 00101100 as an example. This binary representation has three 1s.\\n\\nIf n = 00101100, then n - 1 = 00101011, so n & (n - 1) = 00101100 & 00101011 = 00101000. Count = 1.\\n\\nIf n = 00101000, then n - 1 = 00100111, so n & (n - 1) = 00101000 & 00100111 = 00100000. Count = 2.\\n\\nIf n = 00100000, then n - 1 = 00011111, so n & (n - 1) = 00100000 & 00011111 = 00000000. Count = 3.\\n\\nn is now zero, so the while loop ends, and the final count (the numbers of set bits) is returned."
		},
		{
			"lc_ans_id":"55108",
			"view":"4653",
			"top":"3",
			"title":"Readable simple JAVA solution O(1)",
			"vote":"31",
			"content":"In the following solution:\\n1. Iterate over 32 bits since its a 32-bit integer. This will be O(1) since it is in constant time\\n2. Left shift the number by i to get the LSB value\\n3. Do an AND of the number obtained from step 2 with 1. If the result of the AND is 1 then increment the count because the LSB value of that bit was 1.\\n\\n```\\n public int hammingWeight(int n) {\\n        int count = 0;\\n        for(int i=0; i<32; i++){\\n            count += (n >> i & 1) == 1 ? 1: 0;\\n        }\\n        return count;\\n    }\\n\\n```"
		},
		{
			"lc_ans_id":"55194",
			"view":"4762",
			"top":"4",
			"title":"Use n=n&(n-1) trick to clear the least bit",
			"vote":"29",
			"content":"    public int hammingWeight(int n) {\\n        int count = 0;\\n        for (;n!=0;n = n & (n-1))\\n            count++;\\n        return count;\\n    }\\n\\nn=n&(n-1) trick to clear the least significant bit"
		},
		{
			"lc_ans_id":"55434",
			"view":"2111",
			"top":"5",
			"title":"Concise Java Solution x & (x-1)",
			"vote":"21",
			"content":"x & (x-1) helps to remove right most 1 for x. For reference, see [Bit Hacks][1]\\n\\n    public class Solution {\\n        // you need to treat n as an unsigned value\\n        public int hammingWeight(int n) {\\n            int count = 0;\\n            while(n != 0){\\n                n = n & (n-1);\\n                count++;\\n            }\\n            return count;\\n        }\\n    }\\n\\n  [1]: http://www.catonmat.net/blog/low-level-bit-hacks-you-absolutely-must-know/"
		},
		{
			"lc_ans_id":"55211",
			"view":"2822",
			"top":"6",
			"title":"0 ms C solution!",
			"vote":"20",
			"content":"    int hammingWeight(uint32_t n) {\\n        int count = n ? 1 : 0;\\n        while(n &= (n-1)) count++;\\n        return count;\\n    }\\n\\nEdit: Updated code to make it more readable. Still 0 ms."
		},
		{
			"lc_ans_id":"55402",
			"view":"4048",
			"top":"7",
			"title":"Java solution, no need to iterate all 32 bits all the time",
			"vote":"17",
			"content":"No need to iterate all 32 bits all the time, for the example provided, only 4 iterations required.\\n\\n    public int hammingWeight(int n) {\\n            int result = 0;\\n            while (n != 0) {\\n                if ((n & 1) == 1) {\\n                    result++;\\n                }\\n                n >>>= 1;\\n            }\\n            return result;\\n        }"
		},
		{
			"lc_ans_id":"55319",
			"view":"1709",
			"top":"8",
			"title":"The fastest C++ solution - O(log n) time, O(1) space",
			"vote":"15",
			"content":"    int hammingWeight(uint32_t n) {\\n        int res =0;\\n        while (n!=0)\\n        {\\n            n = n & (n-1);\\n            res++;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"55352",
			"view":"1433",
			"top":"9",
			"title":"Super simple Java solution",
			"vote":"13",
			"content":"This is about the easiest possible answer in Java :)\\n\\n    public class Solution {\\n        // you need to treat n as an unsigned value\\n        public int hammingWeight(int n) {\\n            return Integer.bitCount(n);\\n        }\\n    }"
		}
	],
	"id":"191",
	"title":"Number of 1 Bits",
	"content":"<p>Write a function that takes an unsigned integer and returns the number of ’1' bits it has (also known as the <a href=\"http://en.wikipedia.org/wiki/Hamming_weight\">Hamming weight</a>).</p>\n\n<p>For example, the 32-bit integer ’11' has binary representation <code>00000000000000000000000000001011</code>, so the function should return 3.</p>\n\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/ts\">@ts</a> for adding this problem and creating all test cases.</p>",
	"frequency":"590",
	"ac_num":"179876"
}