{
	"difficulty":"1",
	"submit_num":"26295",
	"show_id":"693",
	"leetcode_id":"693",
	"answers":[
		{
			"lc_ans_id":"108427",
			"view":"3504",
			"top":"0",
			"title":"Oneliners (C++, Java, Ruby, Python)",
			"vote":"25",
			"content":"### Solution 1 - Cancel Bits\\n\\n    bool hasAlternatingBits(int n) {\\n        return !((n ^= n/4) & n-1);\\n    }\\n\\nXor the number with itself shifted right twice and check whether everything after the leading 1-bit became/stayed 0. Xor is 0 iff the bits are equal, so we get 0-bits iff the pair of leading 1-bit and the 0-bit in front of it are repeated until the end.\\n\\n        000101010\\n      ^ 000001010\\n      = 000100000\\n \\n### Solution 2 - Complete Bits\\n\\n    bool hasAlternatingBits(int n) {\\n        return !((n ^= n/2) & n+1);\\n    }\\n\\nXor the number with itself shifted right once and check whether everything after the leading 1-bit became/stayed 1. Xor is 1 iff the bits differ, so we get 1-bits iff starting with the leading 1-bit, the bits alternate between 1 and 0.\\n\\n        000101010\\n      ^ 000010101\\n      = 000111111\\n\\n### Solution 3 - Positive RegEx\\n\\n    public boolean hasAlternatingBits(int n) {\\n        return Integer.toBinaryString(n).matches(\"(10)*1?\");\\n    }\\n\\nIt's simple to describe with a regular expression.\\n<br>\\n\\n### Solution 4 - Negative RegEx\\n\\n    def has_alternating_bits(n)\\n      n.to_s(2) !~ /00|11/\\n    end\\n\\nIt's even simpler to describe what we **don't** want: two zeros or ones in a row.\\n<br>\\n\\n### Solution 5 - Negative String\\n\\n    def hasAlternatingBits(self, n):\\n        return '00' not in bin(n) and '11' not in bin(n)\\n\\nSame as before, just not using regex.\\n<br>\\n\\n### Solution 6 - Golfed\\n\\n    def has_alternating_bits(n)\\n      (n^=n/2)&n+1<1\\n    end\\n\\n### Solution 7 - Recursion\\n\\n    def has_alternating_bits(n)\\n      n < 3 || n%2 != n/2%2 && has_alternating_bits(n/2)\\n    end\\n\\nCompare the last two bits and recurse with the last bit shifted out.\\n<br>\\n\\n### Solution 8 - Complete Bits + RegEx\\n\\n    public boolean hasAlternatingBits(int n) {\\n        return Integer.toBinaryString(n ^ n/2).matches(\"1+\");\\n    }"
		},
		{
			"lc_ans_id":"108460",
			"view":"1936",
			"top":"1",
			"title":"Why not give the fu*king precise definition of the fuc*king \"Alternating bits\"?",
			"vote":"12",
			"content":"Why not give the fu*king precise definition of the fuc*king \"Alternating bits\"?"
		},
		{
			"lc_ans_id":"108447",
			"view":"2344",
			"top":"2",
			"title":"[Java/C++] Very simple solution - 1 line",
			"vote":"9",
			"content":"If ```n``` has alternating bits, then  ```(n>>1) + n ``` must be like ```111...11```. \\n\\nNow, let's consider the case when ```n``` does not have alternating bits, that is,  ```n``` has at least one subsequence with continuous ```1``` or ```0``` (we assume ```n``` has continuous ```1``` in the after) . We write ```n``` in its binary format as ```xxx011...110xxx```, where ```xxx0``` and ```0xxx``` could be empty. Denote ```A``` as ```xxx0```, ```B``` as  ```11...11```  and ```C``` as  ```0xxx```, ```n``` then can be expressed as ```ABC```. We can observe that, \\n1. If the leftmost bit of ```C + C>>1``` is ```1```, then the leftmost two bits of ```C+(1C)>>1``` is ```10```.  E.g., if ```C = 011```, then ```C + (1C)>>1 = 011 + 101 =  1000 ```. So ```n + (n>>1)``` will have a bit with ```0```.\\n2. If the leftmost bit of ```C + C>>1``` is ```0```, then the leftmost two bits of ```1C+(11C)>>1``` is also ```10```. E.g.,  if  C = ```010```, then ```1C + (11C)>>1 =  1010 + 1101 = 10111```. Note that ```B``` has a length of at least ```2```. So ```n + (n>>1)``` will also have a bit with ```0```.\\n\\nSimilar analysis can be done when ```n``` has continuous ```0```. Therefore, if ```n``` does not have alternating bits, then  ```(n>>1) + n ``` must **Not** be like ```111...11```. \\n\\nAt last, for solving this quesiton, we just need to check if ```(n>>1) + n + 1``` is power of 2. \\n\\nJava version:\\n```\\n    public boolean hasAlternatingBits(int n) {\\n        return ( ((long)n + (n>>1) + 1) & ( (long)n + (n>>1) )) == 0;\\n    }\\n```\\n\\nC++ version:\\n```\\n    bool hasAlternatingBits(int n) {\\n        return ( ( long(n) + (n>>1) + 1) & ( long(n) + (n>>1) ) ) == 0;\\n    }\\n```"
		},
		{
			"lc_ans_id":"108468",
			"view":"922",
			"top":"3",
			"title":"C++, concise code",
			"vote":"6",
			"content":"The solution is to use bit manipulation. And d is last digit of n.\\n```\\nclass Solution {\\npublic:\\n    bool hasAlternatingBits(int n) {\\n        int d = n&1;\\n        while ((n&1) == d) {\\n            d = 1-d;\\n            n >>= 1;\\n        }\\n        return n == 0;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108456",
			"view":"115",
			"top":"4",
			"title":"easy python",
			"vote":"1",
			"content":"```\\n    def hasAlternatingBits(self, n):\\n        s = bin(n)\\n        return '00' not in s and '11' not in s"
		},
		{
			"lc_ans_id":"108425",
			"view":"18",
			"top":"5",
			"title":"Python O(1)",
			"vote":"0",
			"content":"Basically, it is the same idea as the solution (divide by 2), but I just want to point out that the order is important if we use bit operator instead of divmod function.  We always want to use n&1 to get the last digit first and apply n>>=1 to divided the number by 2. \\nclass Solution(object):\\n    def hasAlternatingBits(self, n):\\n        \"\"\"\\n        :type n: int\\n        :rtype: bool\\n        \"\"\"\\n        \\n        cur=n&1\\n        n>>=1\\n        while n:\\n            if cur==n&1:\\n                return False\\n            cur=n&1\\n            n>>=1         \\n         return True"
		},
		{
			"lc_ans_id":"108426",
			"view":"25",
			"top":"6",
			"title":"2-line Python,beats 48%",
			"vote":"0",
			"content":"```\\nclass Solution(object):\\n    def hasAlternatingBits(self, n):\\n        \"\"\"\\n        :type n: int\\n        :rtype: bool\\n        \"\"\"\\n        a = n ^ (n>>1)\\n        return a & (a+1) ==0\\n```\\nfor example:\\n    10 = 1010\\n    10>>1 = 0101\\n    a = 1010 ^ 0101 = 1111\\n    if a only contains 1,the function should return true.\\nWhy not  a = n ^ (n<<1)?\\nfor another example:\\n   2 = 10\\n   2<<1 = 100\\n   a = 10 ^ 100 = 110\\n   the answer is false.While it should be true."
		},
		{
			"lc_ans_id":"108428",
			"view":"21",
			"top":"7",
			"title":"Precompute possibilities, then O(1)",
			"vote":"0",
			"content":"There are only 31 possible positive integers, each of which is computed by doubling the previous integer than adding 1 if it ended in zero.\\nNow we can repeatedly call hasAlternatingBits() in O(1) time.\\n```\\nclass Solution(object):\\n    def __init__(self):\\n        self.alternating = set([1])\\n        n = 1\\n        for i in range(30):\\n            digit = n % 2\\n            n = n * 2 + (1 - digit)     # add 1 if digit == 0\\n            self.alternating.add(n)\\n        \\n    def hasAlternatingBits(self, n):\\n        return n in self.alternating"
		},
		{
			"lc_ans_id":"108429",
			"view":"24",
			"top":"8",
			"title":"use constants to judge",
			"vote":"0",
			"content":"'''\\nbool hasAlternatingBits(int n) {    \\n    switch (n)\\n    {\\n        case 0x0:         case 0x1:        case 0x2:             case 0x5:\\n        case 0xa:         case 0x15:       case 0x2a:            case 0x55:\\n        case 0xaa:        case 0x155:      case 0x2aa:           case 0x555:\\n        case 0xaaa:       case 0x1555:     case 0x2aaa:          case 0x5555:\\n        case 0xaaaa:      case 0x15555:    case 0x2aaaa:         case 0x55555:\\n        case 0xaaaaa:     case 0x155555:   case 0x2aaaaa:        case 0x555555:\\n        case 0xaaaaaa:    case 0x1555555:  case 0x2aaaaaa:       case 0x5555555:\\n        case 0xaaaaaaa:   case 0x15555555: case 0x2aaaaaaa:      case 0x55555555:\\n            return true;\\n        default:\\n            return false;\\n    }\\n}\\n'''"
		},
		{
			"lc_ans_id":"108430",
			"view":"38",
			"top":"9",
			"title":"01010101 XOR 10101010 becomes 11111111, just check all bits are 1",
			"vote":"0",
			"content":"```\\nclass Solution {\\npublic:\\n    bool hasAlternatingBits(int n) {\\n        n ^= (n >> 1);\\n        while (n)\\n        {\\n            if ((n & 1) == 0)\\n                return false;\\n            n >>= 1;\\n        }\\n        return true;\\n    }\\n};\\n```"
		}
	],
	"id":"670",
	"title":"Binary Number with Alternating Bits",
	"content":"<p>Given a positive integer, check whether it has alternating bits: namely, if two adjacent bits will always have different values.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> 5\r\n<b>Output:</b> True\r\n<b>Explanation:</b>\r\nThe binary representation of 5 is: 101\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> 7\r\n<b>Output:</b> False\r\n<b>Explanation:</b>\r\nThe binary representation of 7 is: 111.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b> 11\r\n<b>Output:</b> False\r\n<b>Explanation:</b>\r\nThe binary representation of 11 is: 1011.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 4:</b><br />\r\n<pre>\r\n<b>Input:</b> 10\r\n<b>Output:</b> True\r\n<b>Explanation:</b>\r\nThe binary representation of 10 is: 1010.\r\n</pre>\r\n</p>",
	"frequency":"185",
	"ac_num":"14601"
}