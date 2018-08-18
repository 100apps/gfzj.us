{
	"difficulty":"1",
	"submit_num":"1444403",
	"show_id":"7",
	"leetcode_id":"7",
	"answers":[
		{
			"lc_ans_id":"4060",
			"view":"101276",
			"top":"0",
			"title":"My accepted 15 lines of code for Java",
			"vote":"328",
			"content":"Only 15 lines.\\nIf overflow exists, the new result will not equal previous one.\\nNo flags needed. No hard code like 0xf7777777 needed.\\nSorry for my bad english.\\n\\n    public int reverse(int x)\\n    {\\n        int result = 0;\\n\\n        while (x != 0)\\n        {\\n            int tail = x % 10;\\n            int newResult = result * 10 + tail;\\n            if ((newResult - tail) / 10 != result)\\n            { return 0; }\\n            result = newResult;\\n            x = x / 10;\\n        }\\n\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"4056",
			"view":"46816",
			"top":"1",
			"title":"Very Short (7 lines) and Elegant Solution",
			"vote":"81",
			"content":"    public int reverse(int x) {\\n            long rev= 0;\\n            while( x != 0){\\n                rev= rev*10 + x % 10;\\n                x= x/10;\\n                if( rev > Integer.MAX_VALUE || rev < Integer.MIN_VALUE)\\n                    return 0;\\n            }\\n            return (int) rev;\\n        }"
		},
		{
			"lc_ans_id":"4055",
			"view":"21047",
			"top":"2",
			"title":"Golfing in Python",
			"vote":"58",
			"content":"Get the `s`ign, get the `r`eversed absolute integer, and return their product if `r` didn't \"overflow\".\\n\\n    def reverse(self, x):\\n        s = cmp(x, 0)\\n        r = int(`s*x`[::-1])\\n        return s*r * (r < 2**31)\\n\\nAs compressed one-liner, for potential comparison:\\n\\n    def reverse(self, x):\\n        s=cmp(x,0);r=int(`s*x`[::-1]);return(r<2**31)*s*r\\n\\nAnybody got something shorter?"
		},
		{
			"lc_ans_id":"4057",
			"view":"31590",
			"top":"3",
			"title":"Shortest code possible in c++",
			"vote":"58",
			"content":"long long make res a 64 bit number, the overflow is checked.\\n\\n    class Solution {\\n    public:\\n        int reverse(int x) {\\n            long long res = 0;\\n            while(x) {\\n                res = res*10 + x%10;\\n                x /= 10;\\n            }\\n            return (res<INT_MIN || res>INT_MAX) ? 0 : res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"4124",
			"view":"17088",
			"top":"4",
			"title":"8 ms simple C++ solution which checks overflow",
			"vote":"46",
			"content":"    class Solution {\\n    public:\\n        int reverse(int x) {\\n            int ans = 0;\\n            while (x) {\\n                int temp = ans * 10 + x % 10;\\n                if (temp / 10 != ans)\\n                    return 0;\\n                ans = temp;\\n                x /= 10;\\n            }\\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"4127",
			"view":"7439",
			"top":"5",
			"title":"Simple Java Solution O(N) time and O(1) space.",
			"vote":"37",
			"content":"Simply just modulo the input by 10, add it to a long-integer variable as the result.\\nRepeat. When the result is > max integer or < min integer, return 0. Hence, return the result as an integer\\n\\n    public class Solution {\\n        public int reverse(int x) {\\n            long result =0;\\n            while(x != 0)\\n            {\\n                result = (result*10) + (x%10);\\n                if(result > Integer.MAX_VALUE) return 0;\\n                if(result < Integer.MIN_VALUE) return 0;\\n                x = x/10;\\n            }\\n            return (int)result;\\n            \\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"4109",
			"view":"4462",
			"top":"6",
			"title":"A simple C solution with 5ms",
			"vote":"29",
			"content":"    int reverse(int x) {\\n        long long val = 0;\\n    \\tdo \\n    \\t{\\n    \\t\\tval = val * 10 + x % 10;\\n    \\t\\tx /= 10;\\n    \\t} while (x);\\n    \\t\\n    \\treturn (val > INT_MAX || val < INT_MIN) ? 0 : val;\\n    }"
		},
		{
			"lc_ans_id":"4155",
			"view":"39506",
			"top":"7",
			"title":"How do we handle the overflow case?",
			"vote":"29",
			"content":"Throw an exception? Good, but what if throwing an exception is not an option? You would then have to re-design the function (ie, add an extra parameter)."
		},
		{
			"lc_ans_id":"4071",
			"view":"3013",
			"top":"8",
			"title":"Reverse Integer in JavaScript",
			"vote":"28",
			"content":"Does it really makes sense to emulate overflow in JavaScript? There is no int in JS. Number type is a floating point type. If overflow has to be simulated, \"integer\" cell size should be defined as something in the task, e.g. double word."
		},
		{
			"lc_ans_id":"4131",
			"view":"8215",
			"top":"9",
			"title":"Number in Python doesn't have limit, for the overflow case.",
			"vote":"21",
			"content":"Number in Python doesn't have limit, either the input or output number won't overflow anyway.\\nBut OJ still requires 0 as outcome of the huge reversed number."
		}
	],
	"id":"7",
	"title":"Reverse Integer",
	"content":"<p>Given a 32-bit signed integer, reverse digits of an integer.</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b> 123\r\n<b>Output:</b>  321\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b> -123\r\n<b>Output:</b> -321\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b>\r\n<pre>\r\n<b>Input:</b> 120\r\n<b>Output:</b> 21\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\nAssume we are dealing with an environment which could only hold integers within the 32-bit signed integer range. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.\r\n</p>",
	"frequency":"608",
	"ac_num":"352654"
}