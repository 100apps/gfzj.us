{
	"difficulty":"1",
	"submit_num":"111289",
	"show_id":"476",
	"leetcode_id":"476",
	"answers":[
		{
			"lc_ans_id":"96017",
			"view":"24051",
			"top":"0",
			"title":"3 line C++",
			"vote":"80",
			"content":"```\\nclass Solution {\\npublic:\\n    int findComplement(int num) {\\n        unsigned mask = ~0;\\n        while (num & mask) mask <<= 1;\\n        return ~mask & ~num;\\n    }\\n};\\n```\\n\\nFor example,\\n```\\nnum          = 00000101\\nmask         = 11111000\\n~mask & ~num = 00000010\\n```"
		},
		{
			"lc_ans_id":"95992",
			"view":"32320",
			"top":"1",
			"title":"Java 1 line bit manipulation solution",
			"vote":"56",
			"content":"I post solution first and then give out explanation. Please think why does it work before read my explanation.\\n\\n```\\npublic class Solution {\\n    public int findComplement(int num) {\\n        return ~num & ((Integer.highestOneBit(num) << 1) - 1);\\n    }\\n}\\n```\\n\\nAccording to the problem, the result is\\n1. The ```flipped``` version of the original ```input``` but\\n2. Only flip ```N``` bits within the range from ```LEFTMOST``` bit of ```1``` to ```RIGHTMOST```. \\nFor example input = ```5``` (the binary representation is ```101```), the ```LEFTMOST``` bit of ```1``` is the third one from ```RIGHTMOST``` (```100```, ```N``` =  3). Then we need to flip 3 bits from ```RIGHTMOST``` and the answer is ```010```\\n\\nTo achieve above algorithm, we need to do 3 steps:\\n1. Create a bit mask which has ```N``` bits of ```1``` from ```RIGHTMOST```. In above example, the mask is ```111```. And we can use the decent Java built-in function ```Integer.highestOneBit``` to get the ```LEFTMOST``` bit of ```1```, left shift one, and then minus one. Please remember this wonderful trick to create bit masks with ```N``` ones at ```RIGHTMOST```, you will be able to use it later.\\n2. Negate the whole input number.\\n3. ```Bit AND``` numbers in step ```1``` and ```2```.\\n\\nThree line solution if you think one line solution is too confusing:\\n```\\npublic class Solution {\\n    public int findComplement(int num) {\\n        int mask = (Integer.highestOneBit(num) << 1) - 1;\\n        num = ~num;\\n        return num & mask;\\n    }\\n}\\n```\\n\\n```UPDATE```\\nAs several people pointed out, we don't need to left shift 1. That's true because the highest ```1``` bit will always become ```0``` in the ```Complement``` result. So we don't need to take care of that bit.\\n\\n```\\npublic class Solution {\\n    public int findComplement(int num) {\\n        return ~num & (Integer.highestOneBit(num) - 1);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"96103",
			"view":"8483",
			"top":"2",
			"title":"maybe fewest operations",
			"vote":"36",
			"content":"```\\nint findComplement(int num) {\\n    int mask = num;\\n    mask |= mask >> 1;\\n    mask |= mask >> 2;\\n    mask |= mask >> 4;\\n    mask |= mask >> 8;\\n    mask |= mask >> 16;\\n    return num ^ mask;\\n}\\n```"
		},
		{
			"lc_ans_id":"96018",
			"view":"11390",
			"top":"3",
			"title":"Java, very simple code and self-evident, explanation",
			"vote":"35",
			"content":"for example:\\n100110, its complement is 011001, the sum is 111111. So we only need get the min number large or equal to num, then do substraction\\n```\\n    public int findComplement(int num) \\n    {\\n        int i = 0;\\n        int j = 0;\\n        \\n        while (i < num)\\n        {\\n            i += Math.pow(2, j);\\n            j++;\\n        }\\n        \\n        return i - num;\\n    }\\n```"
		},
		{
			"lc_ans_id":"96009",
			"view":"13744",
			"top":"4",
			"title":"Simple Python",
			"vote":"35",
			"content":"```\\nclass Solution(object):\\n    def findComplement(self, num):\\n        i = 1\\n        while i <= num:\\n            i = i << 1\\n        return (i - 1) ^ num\\n```"
		},
		{
			"lc_ans_id":"96026",
			"view":"1867",
			"top":"5",
			"title":"Python 4 ways",
			"vote":"20",
			"content":"1. Flip bit by bit.\\n```\\nclass Solution(object):\\n    def findComplement(self, num):\\n        i = 1\\n        while num >= i:\\n            num ^= i\\n            i <<= 1\\n        return num\\n```\\n2. Find the bit length (say L) and flip num by **num ^ 11...1**   (L ones).\\n```\\n    def findComplement(self, num):\\n        return num ^ ((1<<num.bit_length())-1)\\n```\\n3. Again find the bit length first.\\n```\\n    def findComplement(self, num):\\n        return num ^ ((1 << len(bin(num)) - 2) - 1)\\n```\\n4.\\n```\\ndef findComplement(self, num):\\n        return num ^ ((2<<int(math.log(num, 2)))-1)\\n```\\nWe can also flip num first (including the leading zeros) using ```~num``` and then get the last L bits by ```& 11...1``` (L ones).\\n\\nFor example,\\n```\\n    def findComplement(self, num):\\n        return ~num & ((1<<num.bit_length())-1)\\n```"
		},
		{
			"lc_ans_id":"96130",
			"view":"2986",
			"top":"6",
			"title":"Oneline C++ Solution",
			"vote":"13",
			"content":"~~For some strange reason when I submit it fails the last test case,but if you run that test on its own in the custom testcase it passes. So I think something is wrong with the testing.~~\\n\\n```class Solution {\\npublic:\\n    int findComplement(int num) {\\n        return ~num & ((1 <<(int)log2(num))-1);\\n    }\\n};"
		},
		{
			"lc_ans_id":"96022",
			"view":"1134",
			"top":"7",
			"title":"3 line pure C",
			"vote":"8",
			"content":"```\\nint findComplement(long num) {\\n    long i;\\n    for(i=1;i<=num;i*=2) num^=i; \\n    return num;\\n}\\n```\\nI basically check every bit of number by XOR'ing it with appropriate power of 2 which leads to its invertion.\\nFor example:\\n```\\nEntered: 4=>100;\\n100 ^ 001 = 101;\\n101 ^ 010 = 111;\\n111 ^ 100 = 011;\\nOut:     011=>3;\\n```"
		},
		{
			"lc_ans_id":"96126",
			"view":"3965",
			"top":"8",
			"title":"Java one line solution without using AND (&) or XOR (^)",
			"vote":"7",
			"content":"To find complement of ```num = 5``` which is ```101``` in binary.\\nFirst ```~num``` gives ```...11111010``` but we only care about the rightmost 3 bits.\\nThen to erase the ```1```s before ```010``` we can add ```1000```\\n\\n```\\n    public int findComplement(int num) {\\n        return ~num + (Integer.highestOneBit(num) << 1);\\n    }\\n```"
		},
		{
			"lc_ans_id":"96217",
			"view":"2208",
			"top":"9",
			"title":"Wrong Judgment",
			"vote":"6",
			"content":"My solution to Number Complement was judged wrongly.\\n[Here is my submission result.](https://leetcode.com/contest/leetcode-weekly-contest-14/submissions/detail/88323029/) However, when I copied my code and test case to the problem, I got the correct answer.\\n\\n**UPD:** Fixed, thanks Leetcode Team."
		}
	],
	"id":"469",
	"title":"Number Complement",
	"content":"<p>Given a positive integer, output its complement number. The complement strategy is to flip the bits of its binary representation.</p>\n\n<p><b>Note:</b><br>\n<ol>\n<li>The given integer is guaranteed to fit within the range of a 32-bit signed integer.</li>\n<li>You could assume no leading zero bit in the integer’s binary representation.</li>\n</ol>\n</p>\n\n<p><b>Example 1:</b><br />\n<pre>\n<b>Input:</b> 5\n<b>Output:</b> 2\n<b>Explanation:</b> The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.\n</pre>\n</p>\n\n<p><b>Example 2:</b><br />\n<pre>\n<b>Input:</b> 1\n<b>Output:</b> 0\n<b>Explanation:</b> The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.\n</pre>\n</p>",
	"frequency":"451",
	"ac_num":"67972"
}