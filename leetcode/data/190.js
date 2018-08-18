{
	"difficulty":"1",
	"submit_num":"420549",
	"show_id":"190",
	"leetcode_id":"190",
	"answers":[
		{
			"lc_ans_id":"54741",
			"view":"31316",
			"top":"0",
			"title":"O(1) bit operation C++ solution (8ms)",
			"vote":"203",
			"content":"    class Solution {\\n    public:\\n        uint32_t reverseBits(uint32_t n) {\\n            n = (n >> 16) | (n << 16);\\n            n = ((n & 0xff00ff00) >> 8) | ((n & 0x00ff00ff) << 8);\\n            n = ((n & 0xf0f0f0f0) >> 4) | ((n & 0x0f0f0f0f) << 4);\\n            n = ((n & 0xcccccccc) >> 2) | ((n & 0x33333333) << 2);\\n            n = ((n & 0xaaaaaaaa) >> 1) | ((n & 0x55555555) << 1);\\n            return n;\\n        }\\n    };\\n\\nfor 8 bit binary number *abcdefgh*, the process is as follow:\\n\\n*abcdefgh -> efghabcd -> ghefcdab -> hgfedcba*"
		},
		{
			"lc_ans_id":"54746",
			"view":"32530",
			"top":"1",
			"title":"Java Solution and Optimization",
			"vote":"135",
			"content":"The Java solution is straightforward, just bitwise operation:\\n\\n    public int reverseBits(int n) {\\n        int result = 0;\\n        for (int i = 0; i < 32; i++) {\\n            result += n & 1;\\n            n >>>= 1;   // CATCH: must do unsigned shift\\n            if (i < 31) // CATCH: for last digit, don't shift!\\n                result <<= 1;\\n        }\\n        return result;\\n    }\\n\\nHow to optimize if this function is called multiple times? We can divide an int into 4 bytes, and reverse each byte then combine into an int. For each byte, we can use cache to improve performance.\\n\\n    // cache\\n    private final Map<Byte, Integer> cache = new HashMap<Byte, Integer>();\\n    public int reverseBits(int n) {\\n        byte[] bytes = new byte[4];\\n        for (int i = 0; i < 4; i++) // convert int into 4 bytes\\n            bytes[i] = (byte)((n >>> 8*i) & 0xFF);\\n        int result = 0;\\n        for (int i = 0; i < 4; i++) {\\n            result += reverseByte(bytes[i]); // reverse per byte\\n            if (i < 3)\\n                result <<= 8;\\n        }\\n        return result;\\n    }\\n    \\n    private int reverseByte(byte b) {\\n        Integer value = cache.get(b); // first look up from cache\\n        if (value != null)\\n            return value;\\n        value = 0;\\n        // reverse by bit\\n        for (int i = 0; i < 8; i++) {\\n            value += ((b >>> i) & 1);\\n            if (i < 7)\\n                value <<= 1;\\n        }\\n        cache.put(b, value);\\n        return value;\\n    }"
		},
		{
			"lc_ans_id":"54760",
			"view":"9486",
			"top":"2",
			"title":"My 3ms pure C solution",
			"vote":"74",
			"content":"    uint32_t reverseBits(uint32_t n) {\\n        uint32_t m = 0;\\n        for (int i = 0; i < 32; i++, n >>= 1) {\\n            m <<= 1;\\n            m |= n & 1;\\n        }\\n        return m;\\n    }\\n\\nThe process is straightforward, just iterate over all bits."
		},
		{
			"lc_ans_id":"54738",
			"view":"11838",
			"top":"3",
			"title":"Sharing my 2ms Java Solution with Explanation",
			"vote":"71",
			"content":"\\n\"\\nWe first intitialize result to 0. We then iterate from\\n0 to 31 (an integer has 32 bits).  In each iteration:  \\n  We first shift result to the left by 1 bit.\\n  Then, if the last digit of input n is 1, we add 1 to result. To\\n  find the last digit of n, we just do: (n & 1)\\n    Example, if n=5 (101), n&1 = 101 & 001 = 001 = 1;\\n    however, if n = 2 (10), n&1 = 10 & 01 = 00 = 0).\\n\\n  Finally, we update n by shifting it to the right by 1 (n >>= 1). This is because the last digit is already taken care of, so we need to drop it by shifting n to the right by 1.\\n\\nAt the end of the iteration, we return result.\\n\\nExample, if input n = 13 (represented in binary as\\n0000_0000_0000_0000_0000_0000_0000_1101, the \"_\" is for readability),\\ncalling reverseBits(13) should return:\\n1011_0000_0000_0000_0000_0000_0000_0000\\n\\nHere is how our algorithm would work for input n = 13:\\n\\nInitially, result = 0 = 0000_0000_0000_0000_0000_0000_0000_0000,\\nn = 13 = 0000_0000_0000_0000_0000_0000_0000_1101\\n\\nStarting for loop:\\n  i = 0:\\n    result = result << 1 = 0000_0000_0000_0000_0000_0000_0000_0000.\\n    n&1 = 0000_0000_0000_0000_0000_0000_0000_1101 \\n           & 0000_0000_0000_0000_0000_0000_0000_0001 \\n           = 0000_0000_0000_0000_0000_0000_0000_0001 = 1\\n          therefore result = result + 1 =\\n          0000_0000_0000_0000_0000_0000_0000_0000 \\n       + 0000_0000_0000_0000_0000_0000_0000_0001 \\n       = 0000_0000_0000_0000_0000_0000_0000_0001 = 1\\n    \\nNext, we right shift n by 1 (n >>= 1) (i.e. we drop the least significant bit) to get:\\n    n = 0000_0000_0000_0000_0000_0000_0000_0110.\\n    We then go to the next iteration.\\n\\n  i = 1:\\n    result = result << 1 = 0000_0000_0000_0000_0000_0000_0000_0010;\\n    n&1 = 0000_0000_0000_0000_0000_0000_0000_0110 &\\n          0000_0000_0000_0000_0000_0000_0000_0001\\n        = 0000_0000_0000_0000_0000_0000_0000_0000 = 0;\\n    therefore we don't increment result.\\n    We right shift n by 1 (n >>= 1) to get:\\n    n = 0000_0000_0000_0000_0000_0000_0000_0011.\\n    We then go to the next iteration.\\n\\n  i = 2:\\n    result = result << 1 = 0000_0000_0000_0000_0000_0000_0000_0100.\\n    n&1 = 0000_0000_0000_0000_0000_0000_0000_0011 &\\n          0000_0000_0000_0000_0000_0000_0000_0001 =\\n          0000_0000_0000_0000_0000_0000_0000_0001 = 1\\n          therefore result = result + 1 =\\n          0000_0000_0000_0000_0000_0000_0000_0100 +\\n          0000_0000_0000_0000_0000_0000_0000_0001 =\\n          result = 0000_0000_0000_0000_0000_0000_0000_0101\\n    We right shift n by 1 to get:\\n    n = 0000_0000_0000_0000_0000_0000_0000_0001.\\n    We then go to the next iteration.\\n\\n  i = 3:\\n    result = result << 1 = 0000_0000_0000_0000_0000_0000_0000_1010. \\n    n&1 = 0000_0000_0000_0000_0000_0000_0000_0001 &\\n              0000_0000_0000_0000_0000_0000_0000_0001 =\\n              0000_0000_0000_0000_0000_0000_0000_0001 = 1\\n          therefore result = result + 1 =\\n                           = 0000_0000_0000_0000_0000_0000_0000_1011\\n    We right shift n by 1 to get:\\n    n = 0000_0000_0000_0000_0000_0000_0000_0000 = 0.\\n\\n  Now, from here to the end of the iteration, n is 0, so (n&1)\\n  will always be 0 and and n >>=1 will not change n. The only change\\n  will be for result <<=1, i.e. shifting result to the left by 1 digit.\\n  Since there we have i=4 to i = 31 iterations left, this will result\\n  in padding 28 0's to the right of result. i.e at the end, we get\\n  result = 1011_0000_0000_0000_0000_0000_0000_0000\\n\\n  This is exactly what we expected to get\\n\"\\n\\n    \\n    public int reverseBits(int n) {\\n        if (n == 0) return 0;\\n        \\n        int result = 0;\\n        for (int i = 0; i < 32; i++) {\\n            result <<= 1;\\n            if ((n & 1) == 1) result++;\\n            n >>= 1;\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"54772",
			"view":"7434",
			"top":"4",
			"title":"The concise C++ solution(9ms)",
			"vote":"41",
			"content":"    class Solution {\\n    public:\\n        uint32_t  reverseBits(uint32_t n) {\\n            uint32_t result= 0;\\n            for(int i=0; i<32; i++)\\n                result = (result<<1) + (n>>i &1);\\n            \\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"54950",
			"view":"4451",
			"top":"5",
			"title":"Concise Java Solution",
			"vote":"28",
			"content":"     public int reverseBits(int n) {\\n\\t  int result = 0;\\n\\t  for (int i = 0; i < 32; ++i) {\\n\\t    result = result<<1  | (n & 1);\\n\\t    n >>>= 1;\\n\\t  }\\n\\treturn result;  }"
		},
		{
			"lc_ans_id":"54740",
			"view":"4077",
			"top":"6",
			"title":"Python AC with 63ms, 3lines",
			"vote":"27",
			"content":"    class Solution:\\n        # @param n, an integer\\n        # @return an integer\\n        def reverseBits(self, n):\\n            oribin='{0:032b}'.format(n)\\n            reversebin=oribin[::-1]\\n            return int(reversebin,2)"
		},
		{
			"lc_ans_id":"54938",
			"view":"2721",
			"top":"7",
			"title":"A short simple Java solution",
			"vote":"17",
			"content":"public int reverseBits(int n) {\\n\\n        int res=0;\\n        for(int i=0;i<32;i++){\\n        \\tres= ( res << 1 ) | ( n & 1 );         \\n        \\tn = n >> 1;                  \\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"54873",
			"view":"1419",
			"top":"8",
			"title":"Java, two methods, using String or bit operation, 6ms and 2ms, easy understand",
			"vote":"14",
			"content":"`method1 : using String, 6ms`\\n\\n    //\\u65b9\\u6cd51\\uff1a\\u4f7f\\u7528\\u5b57\\u7b26\\u4e32(\\u6ce8\\u610f-1\\uff1affffffff\\u6700\\u540e\\u4e00\\u6b65r=Inteter.MAX_VALUE+(1<<31)\\u662fMIN_VALUE,\\u7ed3\\u679c\\u521a\\u597d\\u8fd8\\u662f-1)\\n        public int reverseBits(int n) {\\n        \\tStringBuffer sb = new StringBuffer();\\n        \\tString s = Integer.toBinaryString(n);\\n        \\tfor(int i = 0; i < 32-s.length(); i++)\\n        \\t\\tsb.append('0');\\n        \\ts = sb.toString() + s;\\n            char[]  c = s.toCharArray();\\n            int r = 0;\\n            for(int i = 0; i < 32; i++){\\n            \\tif(c[i] == '1')\\n            \\t\\tr += (1 << i);\\n            }\\n            return r;\\n        }\\n`method2:using bit opeeation, 2ms`\\n\\n    //\\u65b9\\u6cd52\\uff1a\\u4f7f\\u7528\\u4f4d\\u64cd\\u4f5c\\n    \\tpublic int reverseBits2(int n){\\n    \\t\\tn = ((n & 0xAAAAAAAA ) >>> 1) | ((n & 0x55555555) << 1);\\n    \\t\\tn = ((n & 0xCCCCCCCC ) >>> 2) | ((n & 0x33333333) << 2);\\n    \\t\\tn = ((n & 0xf0f0f0f0 ) >>> 4) | ((n & 0x0f0f0f0f) << 4);\\n    \\t\\tn = ((n & 0xff00ff00 ) >>> 8) | ((n & 0x00ff00ff) << 8);\\n    \\t\\tn = ((n & 0xffff0000 ) >>> 16) | ((n & 0x0000ffff) << 16);\\n    \\t\\treturn n;\\n    \\t}\\n\\n         /*\\n    \\t * \\u5229\\u7528\\u9ad8\\u5730\\u4f4d\\u4ea4\\u6362\\u5b9e\\u73b0\\u9006\\u5e8f\\n    \\t * \\u4e24\\u4f4d\\u4e00\\u7ec4\\uff0c\\u9ad8\\u4f4e\\u4f4d\\u4e92\\u6362\\uff0c\\u65b9\\u6cd5\\u662f\\uff08\\u53d6\\u5947\\u6570\\u4f4d\\uff0c\\u5076\\u6570\\u4f4d\\u88650\\uff0c\\u53f3\\u79fb1\\u4f4d\\uff09| \\uff08\\u53d6\\u5076\\u6570\\u4e3a\\uff0c\\u5947\\u6570\\u4f4d\\u88650\\uff0c\\u5de6\\u79fb1\\u4f4d\\uff09\\n    \\t * \\u4f9d\\u6b21\\u56db\\u4f4d\\u4e00\\u7ec4\\uff0c\\u516b\\u4f4d\\u4e00\\u7ec4\\uff0c\\u5341\\u516d\\u4f4d\\u4e00\\u7ec4\\uff0c\\u4e09\\u5341\\u4e8c\\u4f4d\\u4e00\\u7ec4\\n    \\t * \\u7531\\u4e8e\\u662f\\u65e0\\u7b26\\u53f7\\u4f4d\\uff0c\\u6240\\u4ee5\\u6ce8\\u610f\\u5f97\\u662f\\u903b\\u8f91\\u53f3\\u79fb\\n    \\t */"
		},
		{
			"lc_ans_id":"54751",
			"view":"2264",
			"top":"9",
			"title":"C++ solution (9ms) without loop, without calculation",
			"vote":"14",
			"content":"    class Solution {\\n    public:\\n        uint32_t reverseBits(uint32_t n) {\\n            struct bs\\n            {\\n                unsigned int _00:1; unsigned int _01:1; unsigned int _02:1; unsigned int _03:1;\\n                unsigned int _04:1; unsigned int _05:1; unsigned int _06:1; unsigned int _07:1;\\n                unsigned int _08:1; unsigned int _09:1; unsigned int _10:1; unsigned int _11:1;\\n                unsigned int _12:1; unsigned int _13:1; unsigned int _14:1; unsigned int _15:1;\\n                unsigned int _16:1; unsigned int _17:1; unsigned int _18:1; unsigned int _19:1;\\n                unsigned int _20:1; unsigned int _21:1; unsigned int _22:1; unsigned int _23:1;\\n                unsigned int _24:1; unsigned int _25:1; unsigned int _26:1; unsigned int _27:1;\\n                unsigned int _28:1; unsigned int _29:1; unsigned int _30:1; unsigned int _31:1;\\n            } *b = (bs*)&n, \\n            c = \\n            {\\n                  b->_31, b->_30, b->_29, b->_28\\n                , b->_27, b->_26, b->_25, b->_24\\n                , b->_23, b->_22, b->_21, b->_20\\n                , b->_19, b->_18, b->_17, b->_16\\n                , b->_15, b->_14, b->_13, b->_12\\n                , b->_11, b->_10, b->_09, b->_08\\n                , b->_07, b->_06, b->_05, b->_04\\n                , b->_03, b->_02, b->_01, b->_00\\n            };\\n    \\n            return *(unsigned int *)&c;\\n        }\\n    };"
		}
	],
	"id":"190",
	"title":"Reverse Bits",
	"content":"<p>Reverse bits of a given 32 bits unsigned integer.</p>\r\n\r\n<p>For example, given input 43261596 (represented in binary as <b>00000010100101000001111010011100</b>), return 964176192 (represented in binary as <b>00111001011110000010100101000000</b>).</p>\r\n\r\n<p>\r\n<b>Follow up</b>:<br />\r\nIf this function is called many times, how would you optimize it?\r\n</p>\r\n\r\n<p>Related problem: <a href=\"/problems/reverse-integer/\">Reverse Integer</a></p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/ts\">@ts</a> for adding this problem and creating all test cases.</p>",
	"frequency":"433",
	"ac_num":"123920"
}