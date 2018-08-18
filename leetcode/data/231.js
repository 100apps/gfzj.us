{
	"difficulty":"1",
	"submit_num":"395331",
	"show_id":"231",
	"leetcode_id":"231",
	"answers":[
		{
			"lc_ans_id":"63974",
			"view":"31705",
			"top":"0",
			"title":"Using n&(n-1) trick",
			"vote":"238",
			"content":"Power of 2 means only one bit of n is '1', so use the trick n&(n-1)==0 to judge whether that is the case\\n \\n\\n    class Solution {\\n    public:\\n        bool isPowerOfTwo(int n) {\\n            if(n<=0) return false;\\n            return !(n&(n-1));\\n        }\\n    };"
		},
		{
			"lc_ans_id":"63972",
			"view":"13701",
			"top":"1",
			"title":"One line java solution using bitCount",
			"vote":"84",
			"content":"This is kind of cheating, but the idea is that a power of two in binary form has and only has one \"1\".\\n\\n    public class Solution {\\n        public boolean isPowerOfTwo(int n) {\\n            return n>0 && Integer.bitCount(n) == 1;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"63966",
			"view":"7911",
			"top":"2",
			"title":"4 different ways to solve -- Iterative / Recursive / Bit operation / Math",
			"vote":"58",
			"content":"This question is not an difficult one, and there are many ways to solve it. \\n\\n**Method 1: Iterative**\\n\\ncheck if n can be divided by 2. If yes, divide n by 2 and check it repeatedly.\\n\\n    if(n==0) return false;\\n    while(n%2==0) n/=2;\\n    return (n==1);\\n\\nTime complexity = O(log n)\\n\\n**Method 2: Recursive**\\n\\n    return n>0 && (n==1 || (n%2==0 && isPowerOfTwo(n/2)));\\n\\nTime complexity = O(log n)\\n        \\n**Method 3: Bit operation**\\n\\nIf n is the power of two:\\n\\n - n = 2 ^ 0 = 1 = 0b0000...00000001, and (n - 1) = 0 = 0b0000...0000.\\n - n = 2 ^ 1 = 2 = 0b0000...00000010, and (n - 1) = 1 = 0b0000...0001.\\n - n = 2 ^ 2 = 4 = 0b0000...00000100, and (n - 1) = 3 = 0b0000...0011.\\n - n = 2 ^ 3 = 8 = 0b0000...00001000, and (n - 1) = 7 = 0b0000...0111.\\n\\nwe have n & (n-1) == 0b0000...0000 == 0\\n\\nOtherwise, n & (n-1) != 0. \\n\\nFor example,  n =14 = 0b0000...1110, and (n - 1) = 13 = 0b0000...1101.\\n\\n    return n>0 && ((n & (n-1)) == 0);\\n\\nTime complexity = O(1)\\n        \\n**Method 4: Math derivation**\\n\\nBecause the range of an integer = -2147483648 (-2^31) ~ 2147483647 (2^31-1), the max possible power of two = 2^30 = 1073741824.\\n\\n(1) If n is the power of two, let n = 2^k, where k is an integer.\\n\\nWe have 2^30 = (2^k) * 2^(30-k), which means (2^30 % 2^k) == 0.\\n\\n(2) If n is not the power of two, let n = j*(2^k), where k is an integer and j is an odd number.\\n\\nWe have (2^30 % j*(2^k)) == (2^(30-k) % j) != 0. \\n\\n    return n>0 && (1073741824 % n == 0);\\n\\nTime complexity = O(1)"
		},
		{
			"lc_ans_id":"63993",
			"view":"8514",
			"top":"3",
			"title":"One line of C++",
			"vote":"56",
			"content":"I used n&(n-1), but, attention the 0.\\n\\n\\n    class Solution {\\n    public:\\n        bool isPowerOfTwo(int n) {\\n            return n > 0 && !(n&(n-1));\\n        }\\n    };"
		},
		{
			"lc_ans_id":"64127",
			"view":"6683",
			"top":"4",
			"title":"One line Java solution",
			"vote":"33",
			"content":"     public boolean isPowerOfTwo(int n) {\\n        return ((n & (n-1))==0 && n>0);\\n    }"
		},
		{
			"lc_ans_id":"64130",
			"view":"1850",
			"top":"5",
			"title":"Share my one line C++",
			"vote":"28",
			"content":"    class Solution {\\n    public:\\n        bool isPowerOfTwo(int n) {\\n            return n>0 && !(n&(n-1));\\n        }\\n    };"
		},
		{
			"lc_ans_id":"64121",
			"view":"1414",
			"top":"6",
			"title":"One line java solution",
			"vote":"25",
			"content":"    public class Solution {\\n    public boolean isPowerOfTwo(int n) {//if n is power  of  2 ,n just has one bit is 1\\n        return n>0 && (n&(n-1))==0;\\n    }\\n}"
		},
		{
			"lc_ans_id":"64156",
			"view":"1282",
			"top":"7",
			"title":"My 1 line C code",
			"vote":"24",
			"content":"bool isPowerOfTwo(int n) {\\n  \\n    return (n>0) &&!(n&(n-1));\\n}"
		},
		{
			"lc_ans_id":"64027",
			"view":"3017",
			"top":"8",
			"title":"Python one line solution",
			"vote":"23",
			"content":"    class Solution(object):\\n        def isPowerOfTwo(self, n):\\n            \"\"\"\\n            :type n: int\\n            :rtype: bool\\n            \"\"\"\\n            return n > 0 and not (n & n-1)"
		},
		{
			"lc_ans_id":"64004",
			"view":"2353",
			"top":"9",
			"title":"5 lines O(1) space&time C++ solution, no hash",
			"vote":"19",
			"content":"    class Solution { \\n    public: \\n        bool isPowerOfTwo(int n) { \\n            if (n <= 0) {\\n                return false;\\n            }\\n            n &= (n - 1);\\n            return n == 0;\\n        } \\n    };\\n\\nthe basic idea is that if n is a power of two, its binary form contains only one \"1\"\\nwelcome to visit more answers on github.com/fanfank/leetcode"
		}
	],
	"id":"231",
	"title":"Power of Two",
	"content":"<p>\r\nGiven an integer, write a function to determine if it is a power of two.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"469",
	"ac_num":"160357"
}