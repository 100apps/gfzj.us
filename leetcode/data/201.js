{
	"difficulty":"2",
	"submit_num":"182308",
	"show_id":"201",
	"leetcode_id":"201",
	"answers":[
		{
			"lc_ans_id":"56729",
			"view":"23050",
			"top":"0",
			"title":"Bit operation solution(JAVA)",
			"vote":"191",
			"content":"The idea is very simple: \\n\\n1. last bit of (odd number & even number) is 0.   \\n2. when m != n, There is at least an odd number and an even number, so the last bit position result is 0.   \\n3. Move m and n rigth a position.\\n\\nKeep doing step 1,2,3 until m equal to n, use a factor to record the iteration time.\\n\\n    public class Solution {\\n        public int rangeBitwiseAnd(int m, int n) {\\n            if(m == 0){\\n                return 0;\\n            }\\n            int moveFactor = 1;\\n            while(m != n){\\n                m >>= 1;\\n                n >>= 1;\\n                moveFactor <<= 1;\\n            }\\n            return m * moveFactor;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"56746",
			"view":"9909",
			"top":"1",
			"title":"One line C++ solution",
			"vote":"104",
			"content":"   Consider the bits from low to high. if n > m, the lowest bit will be 0, and then we could transfer the problem to sub-problem:  rangeBitwiseAnd(m>>1, n>>1).  \\n\\n    int rangeBitwiseAnd(int m, int n) {\\n        return (n > m) ? (rangeBitwiseAnd(m/2, n/2) << 1) : m;\\n    }"
		},
		{
			"lc_ans_id":"56721",
			"view":"6689",
			"top":"2",
			"title":"2 line Solution with detailed explanation",
			"vote":"64",
			"content":"     public int rangeBitwiseAnd(int m, int n) {\\n            while(m<n) n = n & (n-1);\\n            return n;\\n        }\\n\\nThe key point:  reduce n by removing the rightest '1' bit until n<=m;\\n\\n\\n**(1)if n>m**,suppose m = yyyzzz, n = xxx100, because m is less than n, m can be equal to three cases:\\n\\n    (a) xxx011 (if yyy==xxx)\\n    (b) less than xxx011 (if yyy==xxx)\\n    (c) yyyzzz (if yyy<xxx)\\n   \\n   for case (a), and (b), xxx011 will always be ANDed to the result, which results in xxx011 & xxx100 = uuu000(uuu == yyy&xxx == xxx);\\n\\n   for case (c), xxx000/xxx011 will always be ANDed to the result, which results in yyyzzz & xxx000 & xxx011 & xxx100 = uuu000 (uuu <= yyy & xxx)\\n \\n   => for any case, you will notice that: rangBitWiseAnd(vvvzzz,xxx100) == **uuu000** == rangBitWiseAnd(vvvzzz,xxx000), (not matter what the value of\"uuu\" will be, the last three digits will be all zero)\\n\\n   => This is why the rightest '1' bit can be removed by : n = n & (n-1);\\n  \\n    \\n**(2)when n==m,** obviously n is the result.\\n\\n **(3)when n < m**, suppose we reduce n from rangBitWiseAnd(yyyzzz,xxx100) to rangBitWiseAnd(yyyzzz,xxx000);\\n\\n  i)  xxx100 >yyyzzz => xxx >= yyy;\\n\\n  ii) xxx000 < yyyzzz => xxx <= yyy;\\n\\n=> xxx == yyy;\\n\\n=> rangBitWiseAnd(yyyzzz,xxx000) == rangeBitWiseAnd(xxxzzz,xxx000); \\n\\n=>result is xxx000, which is also n;"
		},
		{
			"lc_ans_id":"56845",
			"view":"6344",
			"top":"3",
			"title":"My simple java solution(3 lines)",
			"vote":"56",
			"content":"The idea is to use a mask to find the leftmost common digits of m and n. \\nExample: m=1110001, n=1110111, and you just need to find 1110000 and it will be the answer.\\n\\n    public class Solution {\\n    public int rangeBitwiseAnd(int m, int n) {\\n        int r=Integer.MAX_VALUE;\\n        while((m&r)!=(n&r))  r=r<<1;\\n        return n&r;\\n    }\\n}"
		},
		{
			"lc_ans_id":"56753",
			"view":"5274",
			"top":"4",
			"title":"Accepted C solution with simple explanation",
			"vote":"49",
			"content":"    int rangeBitwiseAnd(int m, int n) {\\n    \\tint c=0;\\n    \\twhile(m!=n){\\n    \\t\\tm>>=1;\\n    \\t\\tn>>=1;\\n    \\t\\t++c;\\n    \\t}\\n    \\treturn n<<c;\\n    }\\n\\n----------\\n\\nthe result of a range bitwise is the common 'left header' of m and n."
		},
		{
			"lc_ans_id":"56719",
			"view":"2879",
			"top":"5",
			"title":"Java/Python easy solution with explanation",
			"vote":"47",
			"content":"First let's think what does bitwise AND do to two numbers, for example ( 0b means base 2)\\n\\n    4 & 7 = 0b100 & 0b111 = 0b100\\n    5 & 7 = 0b101 & 0b111 = 0b101\\n    5 & 6 = 0b101 & 0b110 = 0b100\\n\\nThe operator & is keeping those bits which is set in both number.\\n\\nFor several numbers, the operator & is keeping those bits which is 1 in every number.\\n\\nIn other word, a bit is 0 in any number will result in 0 in the answer's corresponding bit.\\n\\nNow consider a range \\n\\n    [m = 0bxyz0acd, n=0bxyz1rst]\\n\\nhere xyzpacdrst all are digits in base 2.\\n\\nWe can find two numbers that are special in the range [m, n]\\n\\n    (1) m' = 0bxyz0111\\n    (2) n' = 0bxyz1000\\n\\nThe bitwise AND of all the numbers in range [m, n] is just the bitwise AND of the two special number\\n\\n    rangeBitwiseAnd(m, n) = m' & n' = 0bxyz0000\\n\\nThis tells us, the bitwise and of the range is keeping the common bits of m and n from left to right until the first bit that they are different, padding zeros for the rest. \\n\\n**Java**\\n\\n    public int rangeBitwiseAnd(int m, int n) {\\n        int i = 0;\\n        for (; m != n; ++i) {\\n            m >>= 1;\\n            n >>= 1;\\n        }\\n        return n << i;\\n    }\\n\\n    // 8266 / 8266 test cases passed.\\n    // Status: Accepted\\n    // Runtime: 8 ms\\n\\n**Python**\\n\\n    def rangeBitwiseAnd(self, m, n):\\n        i = 0\\n        while m != n:\\n            m >>= 1\\n            n >>= 1\\n            i += 1\\n        return n << i\\n\\n    # 8266 / 8266 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 208 ms"
		},
		{
			"lc_ans_id":"56849",
			"view":"2011",
			"top":"6",
			"title":"Simple and easy to understand java solution",
			"vote":"36",
			"content":"    public class Solution {\\n        public int rangeBitwiseAnd(int m, int n) {\\n            int diffBits = 0;\\n            while (m != n) {\\n                m >>= 1;\\n                n >>= 1;\\n                diffBits++;\\n            }\\n            return n<<diffBits;\\n        }\\n    }\\n\\nIt's a problem that can be reduced to find the same prefix of the numbers in this range."
		},
		{
			"lc_ans_id":"56803",
			"view":"2157",
			"top":"7",
			"title":"Share my simple java solution",
			"vote":"31",
			"content":"The little trick is to return the left common parts of two numbers.  When not equal, move right for 1 bit, util equal, return the common parts.\\n \\n\\n    public int rangeBitwiseAnd(int m, int n) {\\n            int count = 0;\\n    \\t\\twhile(m != n){\\n    \\t\\t\\tm >>= 1;\\n    \\t\\t\\tn >>= 1;\\n    \\t\\t\\tcount++;\\n    \\t\\t}\\n    \\t\\treturn m<<=count;\\n        }"
		},
		{
			"lc_ans_id":"56827",
			"view":"2128",
			"top":"8",
			"title":"Fast three line C++ solution and explanation with no loops or recursion and one extra variable",
			"vote":"20",
			"content":"Whenever a bit changes when counting from `m` to `n`, that bit will be 0 in the AND of the range. So we consider the XOR `x` of `m` and `n`. The leftmost 1 bit in `x` is the last bit that changes at some point when counting from `m` to `n`. This bit and the bits to the right of it are all 0 in the AND of the range. We can easily fill all the bits to the right of that bit with 1s using the OR operations below to create a mask. This technique \"smears\" the 1 bits in `x` to the right. Then it's just a matter of returning the rest of `m` excluding those bits (the bits in `m` that did not change when counting up to `n`), which is precisely the AND of the range from `m` to `n`.\\n\\n    class Solution {\\n    public:\\n        int rangeBitwiseAnd(int m, int n) {\\n            unsigned int x = m ^ n;\\n            x |= x >> 1, x |= x >> 2, x |= x >> 4, x |= x >> 8, x |= x >> 16;\\n            return m & ~x;  \\n        }\\n    };"
		},
		{
			"lc_ans_id":"56735",
			"view":"1413",
			"top":"9",
			"title":"Java 8 ms one-liner, O(1), no loop, no log",
			"vote":"13",
			"content":"    public int rangeBitwiseAnd(int m, int n) {\\n        return m == n ? m : m & ~((Integer.highestOneBit(m ^ n) << 1) - 1);\\n    }\\n\\nThe idea here is pretty simple: when we go from `m` to `n` some higher part may remain the same. The lower part changes. If we take the highest bit that is different, then it must be true that it is `1` in `n` and `0` in `m`, simply because `n` is larger than `m`. That means that at some point it went from `0` to `1`, and at that very point the lower digits must have all turned to zeroes, just like it happens in decimal when we go up to 1000 from 999. That means that all lower bits will be zero in the result. The differing bit will also be zero for obvious reasons. The higher part (if any) will remain as it is because it didn't change at all.\\n\\nTherefore, we take that differing bit (`Integer.highestOneBit(m ^ n)`) and then create a mask that fills the whole thing with `1` to the right, including that bit. We achieve that by shifting that bit left (we can do it because we know that `n < Integer.MAX_VALUE`), then we subtract `1` so that bit goes to zero and everything to the right turns into ones. Then we bit-reverse the mask and apply it either to `m` or to `n`, doesn't matter because the higher part is identical.\\n\\nUnfortunately, that doesn't quite work when `m == n` because then `m ^ n` will be zero and we'll end up zeroing the whole thing.\\n\\nBut it doesn't end here. As noted by @gorokhovsky in a comment below, we don't even have to shift the mask at all, but then we'll *have* to apply it to `m`. We can do this because we know that the highest differing bit is zero in `m`, so it doesn't really matter whether it's zero or one in the mask. This leads to the following solution:\\n\\n    public int rangeBitwiseAnd(int m, int n) {\\n        return m == n ? m : m & ~(Integer.highestOneBit(m ^ n) - 1);\\n    }\\n\\nNow, if you have a good understanding of two's complement, you should instantly recognize that `~(something - 1)` is just `something` negated, which leads us to @gorokhovsky's solution, refactored into one-liner:\\n\\n    public int rangeBitwiseAnd(int m, int n) {\\n        return m == n ? m : m & -Integer.highestOneBit(m ^ n);\\n    }\\n\\n\\nIn case anyone feels like using `Integer.highestOneBit` is cheating, here is it's code, from the standard Java library:\\n\\n        i |= (i >>  1);\\n        i |= (i >>  2);\\n        i |= (i >>  4);\\n        i |= (i >>  8);\\n        i |= (i >> 16);\\n        return i - (i >>> 1);\\n\\nDoesn't look *that* complicated, does it? (If you think it does, look at `Integer.reverse` or something.)\\n\\nWhat happens here is that we first OR bit pair-wise. If any bit was `1` to begin with or had `1` to the left, it will now be `1`. Then we do the same thing with resulting pairs. Now every bit will be `1` if at least one of the following is true:\\n\\n- it was `1` to begin with;\\n- its left neighbor was `1` (so it became `1` on the previous step);\\n- its next left neighbor was `1` (because now we OR exactly with this next neighbor);\\n- its next-next left neighbor was `1` (because now we OR exactly with this next neighbor and that neighbor was ORed with its neighbor on the previous step).\\n\\nSo each *ith* bit will be `1` if at least of the bits `i + 1`, `i + 2`, `i + 3` was `1`. Note that the code uses signed shifting, but it doesn't really matter because if `i` is negative we'll fill everything with `1` anyway.\\n\\nBy repeating this process we finally have a mask that fills everything with `1` from the highest bit and to the right. By shifting it and subtracting we get the highest bit. Speaking of which, looks like we can use this code directly to solve our problem, although it won't be a one-liner any more:\\n\\n    public int rangeBitwiseAnd(int m, int n) {\\n        if (m == n) {\\n            return m;\\n        }\\n        int i = m ^ n;\\n        i |= (i >>> 1);\\n        i |= (i >>> 2);\\n        i |= (i >>> 4);\\n        i |= (i >>> 8);\\n        i |= (i >>> 16);\\n        return m & ~i;\\n    }"
		}
	],
	"id":"201",
	"title":"Bitwise AND of Numbers Range",
	"content":"<p>Given a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise AND of all numbers in this range, inclusive.</p>\r\n\r\n<p>\r\nFor example, given the range [5, 7], you should return 4.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/amrsaqr\">@amrsaqr</a> for adding this problem and creating all test cases.</p>",
	"frequency":"362",
	"ac_num":"62526"
}