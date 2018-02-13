{
	"difficulty":"1",
	"submit_num":"716632",
	"show_id":"69",
	"leetcode_id":"69",
	"answers":[
		{
			"lc_ans_id":"25047",
			"view":"65238",
			"top":"0",
			"title":"A Binary Search Solution",
			"vote":"173",
			"content":"Instead of using fancy Newton's method, this plain binary search approach also works.\\n\\n    public int sqrt(int x) {\\n        if (x == 0)\\n            return 0;\\n        int left = 1, right = Integer.MAX_VALUE;\\n        while (true) {\\n            int mid = left + (right - left)/2;\\n            if (mid > x/mid) {\\n                right = mid - 1;\\n            } else {\\n                if (mid + 1 > x/(mid + 1))\\n                    return mid;\\n                left = mid + 1;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"25057",
			"view":"38689",
			"top":"1",
			"title":"3-4 short lines, Integer Newton, Every Language",
			"vote":"129",
			"content":"Quite a few people used Newton already, but I didn't see someone make it this short. Same solution in every language. Explanation under the solutions.\\n\\n**C++ and C**\\n\\n        long r = x;\\n        while (r*r > x)\\n            r = (r + x/r) / 2;\\n        return r;\\n\\n**Python**\\n\\n        r = x\\n        while r*r > x:\\n            r = (r + x/r) / 2\\n        return r\\n\\n**Ruby**\\n\\n        r = x\\n        r = (r + x/r) / 2 while r*r > x\\n        r\\n\\n**Java and C#**\\n\\n        long r = x;\\n        while (r*r > x)\\n            r = (r + x/r) / 2;\\n        return (int) r;\\n\\n**JavaScript**\\n\\n        r = x;\\n        while (r*r > x)\\n            r = ((r + x/r) / 2) | 0;\\n        return r;\\n\\n---\\n\\n**Explanation**\\n\\nApparently, [using only integer division for the Newton method works](https://en.wikipedia.org/wiki/Integer_square_root#Using_only_integer_division). And I guessed that if I start at x, the root candidate will decrease monotonically and never get too small.\\n\\nThe above solutions all got accepted, and in C++ I also verified it locally on my PC for all possible inputs (0 to 2147483647):\\n\\n    #include <iostream>\\n    #include <climits>\\n    using namespace std;\\n    \\n    int mySqrt(int x) {\\n        long long r = x;\\n        while (r*r > x)\\n            r = (r + x/r) / 2;\\n        return r;\\n    }\\n    \\n    int main() {\\n        for (long long x=0; x<=INT_MAX; ++x) {\\n            long long r = mySqrt(x);\\n            if (r<0 || r*r > x || (r+1)*(r+1) <= x)\\n                cout << \"false: \" << x << \" \" << r << endl;\\n            if (x % 10000000 == 0)\\n                cout << x << endl;\\n        }\\n        cout << \"all checked\" << endl;\\n    }"
		},
		{
			"lc_ans_id":"25048",
			"view":"22983",
			"top":"2",
			"title":"Share my O(log n) Solution using bit manipulation",
			"vote":"73",
			"content":"## Basic Idea: ##\\n\\n----------\\nSince sqrt(x) is composed of binary bits, I calculate sqrt(x) by deciding every bit from the most significant to least significant. **Since an integer n can have O(log n) bits with each bit decided within constant time, this algorithm has time limit O(log n), actually, because an Integer can have at most 32 bits, I can also say this algorithm takes O(32)=O(1) time.**\\n\\n----------\\n  \\n\\n     public int sqrt(int x) {\\n        if(x==0)\\n            return 0;\\n        int h=0;\\n        while((long)(1<<h)*(long)(1<<h)<=x) // firstly, find the most significant bit\\n            h++;\\n        h--;\\n        int b=h-1;\\n        int res=(1<<h);\\n        while(b>=0){  // find the remaining bits\\n            if((long)(res | (1<<b))*(long)(res |(1<<b))<=x)\\n                res|=(1<<b);\\n            b--;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"25066",
			"view":"16740",
			"top":"3",
			"title":"Solve this problem with  Binary Search",
			"vote":"50",
			"content":"    class Solution {\\n    public:\\n        int sqrt(int x) {\\n            if (0 == x) return 0;\\n            int left = 1, right = x, ans;\\n            while (left <= right) {\\n                int mid = left + (right - left) / 2;\\n                if (mid <= x / mid) {\\n                    left = mid + 1;\\n                    ans = mid;\\n                } else {\\n                    right = mid - 1;\\n                }\\n            }\\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"25255",
			"view":"10136",
			"top":"4",
			"title":"Newton's Iterative Method in C++",
			"vote":"31",
			"content":"    int sqrt(int x) {\\n        double ans    = x;\\n        double delta  = 0.0001;\\n        while (fabs(pow(ans, 2) - x) > delta) {\\n            ans = (ans + x / ans) / 2;\\n        }\\n        return ans;\\n    }\\n\\nThe key point is the average result is calculate by \"ans = (ans + x / ans) / 2\";\\n\\nFor instance, when calculate sqrt(2) :\\n\\n       Guess Result        Quotient                             Average Result\\n              1          2 / 1 = 2                            (2 + 1) / 2 = 1.5\\n             1.5      2 / 1.5 = 1.3333                (1.3333 + 1.5) / 2 = 1.4167\\n           1.4167    2 / 1.4167 = 1.4118          (1.4167 + 1.4118) / 2 = 1.4142\\n            ... ..."
		},
		{
			"lc_ans_id":"25068",
			"view":"4856",
			"top":"5",
			"title":"Share my 2ms and 4lines JAVA code,",
			"vote":"27",
			"content":"My idea is, for any non-negative number N, sqrt(N) = 2/2*sqrt(N) =2*sqrt(1/4)*sqrt(N) = 2*sqrt(N/4). And for the Ns that are not multiple of 4, for example, 9, 25 or 49, the actual result should be 1+2*sqrt(N/4), because we need to take remainders into account.\\n\\n    public int mySqrt(int x) {\\n        if(x < 4) return x == 0 ? 0 : 1;\\n        int res = 2 * mySqrt(x/4);\\n        if((res+1) * (res+1) <= x && (res+1) * (res+1) >= 0) return res+1;\\n        return res;\\n    }\\n\\nHope it helps."
		},
		{
			"lc_ans_id":"25130",
			"view":"3794",
			"top":"6",
			"title":"My clean C++ code 8ms",
			"vote":"23",
			"content":"Binary search and high is always converged to the one that 1 larger than the result.\\n\\n    class Solution {\\n    public:\\n        int mySqrt(int x) {\\n            int low = 0,  high = x, mid;\\n            if(x<2) return x; // to avoid mid = 0\\n            while(low<high)\\n            {\\n                mid = (low + high)/2;\\n                if(x/mid >= mid) low = mid+1;\\n                else high = mid;\\n            }\\n            return high-1;\\n            \\n        }\\n    };"
		},
		{
			"lc_ans_id":"25198",
			"view":"2142",
			"top":"7",
			"title":"3 JAVA solutions with explanation",
			"vote":"16",
			"content":"The three solutions are as the follows, solution1 and solution3 are pretty straight forward. \\n\\n     Look for the critical point: i * i <= x && (i+1)(i+1) > x\\n\\n A little trick is using i <=  x / i for comparison, instead of i * i <= x, to avoid exceeding integer upper limit.\\n\\n**Solution1 - Binary Search Solution: Time complexity = O(lg(x)) = O(32)=O(1)**\\n\\n\\n    public int mySqrt(int x) {\\n    \\tif (x == 0) return 0;\\n    \\tint start = 1, end = x;\\n    \\twhile (start < end) { \\n    \\t\\tint mid = start + (end - start) / 2;\\n    \\t\\tif (mid <= x / mid && (mid + 1) > x / (mid + 1))// Found the result\\n    \\t\\t\\treturn mid; \\n    \\t\\telse if (mid > x / mid)// Keep checking the left part\\n    \\t\\t\\tend = mid;\\n    \\t\\telse\\n    \\t\\t\\tstart = mid + 1;// Keep checking the right part\\n    \\t}\\n    \\treturn start;\\n    }\\n\\n**Solution2 - Newton Solution: Time complexity = O(lg(x))**\\n\\nI think Newton solution will not be faster than Solution1(Binary Search), because i = (i + x / i) / 2, the two factors i and x / i are with opposite trends. So time complexity in the best case is O(lgx). \\n\\n**Anyone can give the accurate time complexity? Appreciate it!**\\n\\n    public int mySqrt(int x) {\\n        if (x == 0) return 0;\\n    \\tlong i = x;\\n    \\twhile(i > x / i)  \\n    \\t\\ti = (i + x / i) / 2;\\t    \\t\\n    \\treturn (int)i;\\n    }\\n\\n**Solution3 - Brute Force: Time complexity = O(sqrt(x))**\\n\\n    public int mySqrt(int x) { \\n    \\tif (x == 0) return 0;\\n    \\tfor (int i = 1; i <= x / i; i++) \\t\\t\\n    \\t\\tif (i <= x / i && (i + 1) > x / (i + 1))// Look for the critical point: i*i <= x && (i+1)(i+1) > x\\n    \\t\\t\\treturn i;\\t\\t\\n    \\treturn -1;\\n    }"
		},
		{
			"lc_ans_id":"25215",
			"view":"1311",
			"top":"8",
			"title":"Change x to double and the return value to double please",
			"vote":"15",
			"content":"that will make sense. How do you expect the sqrt of 2 is  integer too?"
		},
		{
			"lc_ans_id":"25258",
			"view":"3817",
			"top":"9",
			"title":"Using binary search accepted, but one question",
			"vote":"15",
			"content":"    int sqrt(int x) {\\n            if(x == 0 || x == 1){\\n                return x;\\n            }\\n            int l = 1, r = x, res;\\n            while(l <= r){\\n                int m = (l + r)/2;\\n                if(m == x / m){ \\n                    return m;\\n                }else if(m > x / m){\\n                    r = m - 1;\\n                }else{\\n                    l = m + 1;\\n                    res = m;\\n                }\\n            }\\n            return res;\\n        }\\n\\nMy question is:\\nIf using `if(m * m == x)` instead of `if(m == x / m)` (and `if(m * m > x)` instead of `if(m > x / m)` ), I will get \"Time Limit Exceeded\" on case 2147395599. Why that happens?\\n\\nThank you in advance!"
		}
	],
	"id":"69",
	"title":"Sqrt(x)",
	"content":"<p>Implement <code>int sqrt(int x)</code>.</p>\r\n\r\n<p>Compute and return the square root of <i>x</i>.</p>\r\n\r\n<p><b>x</b> is guaranteed to be a non-negative integer.</p>\r\n\r\n<br />\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b> 4\r\n<b>Output:</b> 2\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b> 8\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> The square root of 8 is 2.82842..., and since we want to return an integer, the decimal part will be truncated.\r\n</pre>\r\n</p>",
	"frequency":"477",
	"ac_num":"204976"
}