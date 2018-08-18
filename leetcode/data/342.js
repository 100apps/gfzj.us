{
	"difficulty":"1",
	"submit_num":"202977",
	"show_id":"342",
	"leetcode_id":"342",
	"answers":[
		{
			"lc_ans_id":"80457",
			"view":"27815",
			"top":"0",
			"title":"Java 1-line (cheating for the purpose of not using loops)",
			"vote":"142",
			"content":"        public boolean isPowerOfFour(int num) {\\n            return num > 0 && (num&(num-1)) == 0 && (num & 0x55555555) != 0;\\n            //0x55555555 is to get rid of those power of 2 but not power of 4\\n            //so that the single 1 bit always appears at the odd position \\n        }"
		},
		{
			"lc_ans_id":"80460",
			"view":"17303",
			"top":"1",
			"title":"1 line C++ solution without confusing bit manipulations",
			"vote":"92",
			"content":"    bool isPowerOfFour(int num) {\\n        return num > 0 && (num & (num - 1)) == 0 && (num - 1) % 3 == 0;\\n    }"
		},
		{
			"lc_ans_id":"80456",
			"view":"15360",
			"top":"2",
			"title":"O(1) one-line solution without loops",
			"vote":"61",
			"content":"    public class Solution {\\n        public boolean isPowerOfFour(int num) {\\n            return (num > 0) && ((num & (num - 1)) == 0) && ((num & 0x55555555) == num);\\n        }\\n    }\\n\\nThe basic idea is from power of 2, We can use \"n&(n-1) == 0\" to determine if n is power of 2. For power of 4, the additional restriction is that in binary form, the only \"1\" should always located at the odd position.  For example, 4^0 = 1, 4^1 = 100, 4^2 = 10000. So we can use \"num & 0x55555555==num\" to check if \"1\" is located at the odd position."
		},
		{
			"lc_ans_id":"80448",
			"view":"7115",
			"top":"3",
			"title":"Simple C++ O(1) solution without 0x55555555",
			"vote":"40",
			"content":"    class Solution {\\n    public:\\n        bool isPowerOfFour(int num) {\\n            return ((num-1)&num)==0 && (num-1)%3==0;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"80461",
			"view":"3659",
			"top":"4",
			"title":"Python one line solution with explanations",
			"vote":"28",
			"content":"    def isPowerOfFour(self, num):\\n            return num != 0 and num &(num-1) == 0 and num & 1431655765== num\\n\\n\\nConsider the valid numbers within 32 bit, and turn them into binary form, they are:\\n\\n    1\\n    100\\n    10000\\n    1000000\\n    100000000\\n    10000000000\\n    1000000000000\\n    100000000000000\\n    10000000000000000\\n    1000000000000000000\\n    100000000000000000000\\n    10000000000000000000000\\n    1000000000000000000000000\\n    100000000000000000000000000\\n    10000000000000000000000000000\\n    1000000000000000000000000000000\\n\\nAny other number not it the list should be considered as invalid.\\nSo if you XOR them altogether, you will get a mask value, which is:\\n\\n \\n\\n    1010101010101010101010101010101 (1431655765)\\n\\nAny number which is power of 4, it should be power of 2, I use num &(num-1) == 0 to make sure of that.\\nObviously 0 is not power of 4, I have to check it.\\nand finally I need to check that if the number 'AND' the mask value is itself, to make sure it's in the list above.\\n\\nhere comes the final code:\\n\\nreturn num != 0 and num &(num-1) == 0 and num & 1431655765== num"
		},
		{
			"lc_ans_id":"80589",
			"view":"1909",
			"top":"5",
			"title":"C++ simple code with comments (no loops/recursion)",
			"vote":"24",
			"content":"Idea is simple.  Powers of four are 1, 4, 16..  or in binary, 0x0001, 0x0100, etc.  Only one bit is ever set, and it's always an odd bit.  So simply check for that...\\n\\n  This does not use any loops or recursion,  is O(1) time and O(1) space.\\n\\n    class Solution {\\n    public:\\n        bool isPowerOfFour(int num) {\\n            // first check only one bit is set:\\n            if ((num & (num -1)) != 0) return false;\\n            // next check if it's a bit in pos 1, 3, 5 ... 31\\n            if (num & 0x55555555) return true;\\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"80583",
			"view":"4193",
			"top":"6",
			"title":"Simplest C++ solution maybe?",
			"vote":"24",
			"content":"    class Solution {\\n    public:           \\n        bool isPowerOfFour(int num) {\\n            return !(num & (num - 1)) && (num & 0x55555555);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"80464",
			"view":"1477",
			"top":"7",
			"title":"My non-loop solution with no relation to the bit length of int",
			"vote":"21",
			"content":"\\n\\n    class Solution {\\n    public:\\n        bool isPowerOfFour(int num) {\\n            if (num <= 0) return false;\\n            if (num & num - 1) return false;\\n            return num % 3 == 1;\\n        }\\n    };\\n\\nI observed that `2 ** k % 3 = 1` if and only if `k` is even, that is, `2 ** k` is a power of 4.\\nSo we can just check whether these three conditions are all true:\\n\\n 1. `num` must be positive\\n 2. `num` must be power of 2\\n 3. `num` mod 3 must be 1"
		},
		{
			"lc_ans_id":"80490",
			"view":"4388",
			"top":"8",
			"title":"Java 1 line of code and can be extended to any radix solution",
			"vote":"17",
			"content":"The idea is that numbers in quaternary system that is power of 4 will be like 10, 100, 1000 and such.  Similar to binary case.  And this can be extended to any radix.\\n\\n    public boolean isPowerOfFour(int num) {\\n        return Integer.toString(num, 4).matches(\"10*\");\\n    }"
		},
		{
			"lc_ans_id":"80617",
			"view":"2438",
			"top":"9",
			"title":"One line in JAVA without loops/recursion which is extensible.",
			"vote":"16",
			"content":"public class Solution {\\n\\n    public boolean isPowerOfFour(int num) {\\n        return (num&(num-1))==0 && num>0 && (num-1)%3==0;\\n    }\\n}\\n\\nThe first two conditions are for power of 2.\\nOne additional condition: (num-1) can be divided by 3."
		}
	],
	"id":"342",
	"title":"Power of Four",
	"content":"<p>\r\nGiven an integer (signed 32 bits), write a function to check whether it is a power of 4.\r\n</p>\r\n<p><b>Example:</b><br>\r\nGiven num = 16, return true.\r\nGiven num = 5, return false.\r\n</p>\r\n<p>\r\n<b>Follow up</b>: Could you solve it without loops/recursion?\r\n</p>\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/yukuairoy\">@yukuairoy </a> for adding this problem and creating all test cases.</p>",
	"frequency":"311",
	"ac_num":"79015"
}