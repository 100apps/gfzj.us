{
	"difficulty":"1",
	"submit_num":"111404",
	"show_id":"441",
	"leetcode_id":"441",
	"answers":[
		{
			"lc_ans_id":"92274",
			"view":"15485",
			"top":"0",
			"title":"[JAVA] Clean Code with Explanations and Running Time [2 Solutions]",
			"vote":"44",
			"content":"<h3>[JAVA] Clean Code with Explanations and Running Time [2 Solutions]</h3>\\n<a href=https://ratchapong.com/algorithm-practice/leetcode/arranging-coins>Full Solutions and Explanations</a>\\n<h3><b>Solution 1</b></h3>\\n```\\npublic class Solution {\\n    public int arrangeCoins(int n) {\\n        int start = 0;\\n        int end = n;\\n        int mid = 0;\\n        while (start <= end){\\n            mid = (start + end) >>> 1;\\n            if ((0.5 * mid * mid + 0.5 * mid ) <= n){\\n                start = mid + 1;\\n            }else{\\n                end = mid - 1;\\n            }\\n        }\\n        return start - 1;\\n    }\\n}\\n```\\n\\n<div class=\"margin-bottom-20\"><h4 class=\"text-uppercase margin-bottom-10\">Complexity Analysis</h4><p>Uniform cost model is used as Cost Model and `n` is the input number. `b` in this case would be `2`.</p><p><b>Time Complexity:</b><ul><li>Best Case `O(log_b(n))` : With respect to the input, the algorithm will always depend on the value of input.</li><li>Average Case `O(log_b(n))` : With respect to the input, the algorithm will always depend on the value of input.</li><li>Worst Case `O(log_b(n))` : With respect to the input, the algorithm will always depend on the value of input.</li></ul></p><p><b>Auxiliary Space:</b><ul><li>Worst Case `O(1)` : Additional variables are of constant size.</li></ul></p></div><div class=\"margin-bottom-20\"><h4 class=\"text-uppercase margin-bottom-10\">Algorithm</h4><p><b>Approach:</b> Binary Search</p><p>The problem is basically asking the maximum length of consecutive number that has the running sum lesser or equal to `n`. In other word, find `x` that satisfy the following condition:</p><div class=\"margin-left-50 margin-bottom-10\">`1 + 2 + 3 + 4 + 5 + 6 + 7 + ... + x &lt= n`</div><div class=\"margin-left-50 margin-bottom-10\">`sum_{i=1}^x i &lt= n`</div><p>Running sum can be simplified,</p><div class=\"margin-left-50 margin-bottom-10\">`(x * ( x + 1)) / 2 &lt= n`</div><p>Binary search is used in this case to slowly narrow down the `x` that will satisfy the equation. Note that <code>0.5 * mid * mid + 0.5 * mid</code> does not have overflow issue as the intermediate result is implicitly autoboxed to <code>double</code> data type.</p></div>\\n<hr>\\n\\n<h3><b>Solution 2</b></h3>\\n```\\npublic class Solution {\\n    public int arrangeCoins(int n) {\\n        return (int) ((Math.sqrt(1 + 8.0 * n) - 1) / 2);\\n    }\\n}\\n```\\n\\n<div class=\"margin-bottom-20\"><h4 class=\"text-uppercase margin-bottom-10\">Complexity Analysis</h4><p>Uniform cost model is used as Cost Model and `n` is the input number. `b` in this case would be `2`.</p><p><b>Time Complexity:</b><ul><li>Best Case `O(1)` : With respect to the input, the algorithm will always perform basic mathematical operation that run in constant time.</li><li>Average Case `O(1)` : With respect to the input, the algorithm will always perform basic mathematical operation that run in constant time.</li><li>Worst Case `O(1)` : With respect to the input, the algorithm will always perform basic mathematical operation that run in constant time.</li></ul></p><p><b>Auxiliary Space:</b><ul><li>Worst Case `O(1)` : No extra space is used.</li></ul></p></div><div class=\"margin-bottom-20\"><h4 class=\"text-uppercase margin-bottom-10\">Algorithm</h4><p><b>Approach:</b> Mathematics</p><p>The problem is basically asking the maximum length of consecutive number that has the running sum lesser or equal to `n`. In other word, find `x` that satisfy the following condition:</p><div class=\"margin-left-50 margin-bottom-10\">`1 + 2 + 3 + 4 + 5 + 6 + 7 + ... + x &lt= n`</div><div class=\"margin-left-50 margin-bottom-10\">`sum_{i=1}^x i &lt= n`</div><p>Running sum can be simplified,</p><div class=\"margin-left-50 margin-bottom-10\">`(x * ( x + 1)) / 2 &lt= n`</div><p>Using quadratic formula, `x` is evaluated to be,</p><div class=\"margin-left-50 margin-bottom-10\">`x = 1 / 2 * (-sqrt(8 * n + 1)-1)` (Inapplicable) or `x = 1 / 2 * (sqrt(8 * n + 1)-1)`</div><p>Negative root is ignored and positive root is used instead. Note that <code>8.0 * n</code> is very important because it will cause Java to implicitly autoboxed the intermediate result into <code>double</code> data type. The code will not work if it is simply <code>8 * n</code>. Alternatively, an explicit casting can be done <code>8 * (long) n)</code>.</p></div>\\n<hr>"
		},
		{
			"lc_ans_id":"92298",
			"view":"12161",
			"top":"1",
			"title":"Java O(1) Solution - Math Problem",
			"vote":"22",
			"content":"The idea is about quadratic equation, the formula to get the sum of arithmetic progression is\\nsum = (x + 1) * x / 2\\nso for this problem, if we know the the sum, then we can know the x = (-1 + sqrt(8 * n + 1)) / 2\\n\\n```\\npublic class Solution {\\n    public int arrangeCoins(int n) {\\n        return (int)((-1 + Math.sqrt(1 + 8 * (long)n)) / 2);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"92365",
			"view":"3928",
			"top":"2",
			"title":"C++ 1 line code",
			"vote":"12",
			"content":"Concept:\\n\\n1+2+3+...+x = n\\n-> (1+x)x/2 = n\\n-> x^2+x = 2n\\n-> x^2+x+1/4 = 2n +1/4\\n-> (x+1/2)^2 = 2n +1/4\\n-> (x+0.5) = sqrt(2n+0.25)\\n-> x = -0.5 + sqrt(2n+0.25)\\n\\nint arrangeCoins(int n) {\\nreturn floor(-0.5+sqrt((double)2*n+0.25));\\n}"
		},
		{
			"lc_ans_id":"92276",
			"view":"1908",
			"top":"3",
			"title":"441. Arranging Coins - Python solution",
			"vote":"6",
			"content":"<code>\\n```Python\\nclass Solution(object):\\n     def arrangeCoins(self, n):\\n         from math import sqrt\\n         return int((sqrt(1+8*n) - 1) / 2)\\n```\\n</code>"
		},
		{
			"lc_ans_id":"92297",
			"view":"349",
			"top":"4",
			"title":"3 lines C++ easy to understand",
			"vote":"5",
			"content":"```\\n    int arrangeCoins(int n) {\\n        int i = 1;\\n        while(n >= i) n -= i, i++;\\n        return i - 1;\\n    }\\n```"
		},
		{
			"lc_ans_id":"92281",
			"view":"272",
			"top":"5",
			"title":"[JAVA] Cleaner and easier to understand solution.",
			"vote":"4",
			"content":"```class Solution {\\n    public int arrangeCoins(int n) {\\n        if(n < 1)\\n            return 0;\\n        for(int i = 1; ;i++){\\n            n -=i;\\n            if(n < 0)\\n                return i-1;\\n        }\\n    }\\n}\\n```\\nAs coins increase by 1 in every row beginning from 1. keep on subtracting same number of coins from the 'n' until it goes negative. When it goes negative, current iteration 'i' is half filled. So, definitely previous row will be fully filled."
		},
		{
			"lc_ans_id":"92304",
			"view":"5159",
			"top":"6",
			"title":"O(logn) binary search java solution",
			"vote":"4",
			"content":"```\\npublic int arrangeCoins(int n) {   \\n        //convert int to long to prevent integer overflow\\n        long nLong = (long)n;\\n        \\n        long st = 0;\\n        long ed = nLong;\\n        \\n        long mid = 0;\\n        \\n        while (st <= ed){\\n            mid = st + (ed - st) / 2;\\n            \\n            if (mid * (mid + 1) <= 2 * nLong){\\n                st = mid + 1;\\n            }else{\\n                ed = mid - 1;\\n            }\\n        }\\n        \\n        return (int)(st - 1);\\n    }\\n```"
		},
		{
			"lc_ans_id":"92306",
			"view":"763",
			"top":"7",
			"title":"[C][JAVA] Elegant One Line of Code, Clear Explanation Provided",
			"vote":"3",
			"content":"**C solution:**\\n```\\nint arrangeCoins(int n) {\\n    return (int) floor((-1 + sqrt(1+8L*n))/2.0);\\n}\\n```\\n\\n**Java solution:**\\n```\\npublic int arrangeCoins(int n) {\\n        return (int) Math.floor((-1 + Math.sqrt(1+8L*n))/2.0);\\n}\\n```\\n\\n**Explanation:**\\n\\nThe solution starts with the following mathematical expression:\\n```\\n1+ 2 + 3 + ... + x = n\\n=> (x (x + 1))/2 = n  \\n```\\nn is the input of the problem, we need to solve for x the following quadratic equation:\\n```\\nx (x + 1)= 2n \\n=> x^2 + x - 2n = 0\\n```\\nResulting with the final formula:\\n```\\nusing: x= (-b + sqrt[ b^2 - 4 a* c])/2a  { a=1, b=1, c=-2 }\\n\\nx= floor((-1 + sqrt(1+8*n))/2);\\n```"
		},
		{
			"lc_ans_id":"92382",
			"view":"1344",
			"top":"8",
			"title":"Python 1-line solution by solving a quadratic equation",
			"vote":"3",
			"content":"Look for k in the quadratic equation: k(k+1)/2 = n. \\n```\\ndef arrangeCoins(self, n):\\n        \"\"\"\\n        :type n: int\\n        :rtype: int\\n        \"\"\"\\n        return int((1+8*n)**0.5 - 1) / 2\\n```"
		},
		{
			"lc_ans_id":"92314",
			"view":"3756",
			"top":"9",
			"title":"C++ Three solutions: O(n), O(logn), O(1)",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    int way1(int n) {\\n        int level = 1;\\n        for (long sum = 0; sum <= n; level++) \\n            sum += level;\\n        return max(level - 2, 0);    \\n    }\\n    \\n    int way2(int n) {\\n        return sqrt(2 * (long)n + 1 / 4.0) - 1 / 2.0;\\n    }\\n    \\n    int arrangeCoins(int n) {\\n        long low = 1, high = n;\\n        while (low < high) {\\n            long mid = low + (high - low + 1) / 2;\\n            if ((mid + 1) * mid / 2.0 <= n) low = mid;\\n            else high = mid - 1;\\n        }\\n        return high;\\n    }\\n};\\n```"
		}
	],
	"id":"435",
	"title":"Arranging Coins",
	"content":"<p>You have a total of <i>n</i> coins that you want to form in a staircase shape, where every <i>k</i>-th row must have exactly <i>k</i> coins.</p>\r\n \r\n<p>Given <i>n</i>, find the total number of <b>full</b> staircase rows that can be formed.</p>\r\n\r\n<p><i>n</i> is a non-negative integer and fits within the range of a 32-bit signed integer.</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\nn = 5\r\n\r\nThe coins can form the following rows:\r\n¤\r\n¤ ¤\r\n¤ ¤\r\n\r\nBecause the 3rd row is incomplete, we return 2.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\nn = 8\r\n\r\nThe coins can form the following rows:\r\n¤\r\n¤ ¤\r\n¤ ¤ ¤\r\n¤ ¤\r\n\r\nBecause the 4th row is incomplete, we return 3.\r\n</pre>\r\n</p>",
	"frequency":"180",
	"ac_num":"40512"
}