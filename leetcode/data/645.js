{
	"difficulty":"3",
	"submit_num":"11842",
	"show_id":"668",
	"leetcode_id":"668",
	"answers":[
		{
			"lc_ans_id":"106977",
			"view":"5815",
			"top":"0",
			"title":"Java solution, binary search",
			"vote":"33",
			"content":"```\\nclass Solution {\\n    public int findKthNumber(int m, int n, int k) {\\n    \\tint low = 1 , high = m * n + 1;\\n        \\n    \\twhile (low < high) {\\n    \\t    int mid = low + (high - low) / 2;\\n    \\t    int c = count(mid, m, n);\\n    \\t    if (c >= k) high = mid;\\n            else low = mid + 1;\\n    \\t}\\n        \\n    \\treturn high;\\n    }\\n    \\n    private int count(int v, int m, int n) {\\n\\tint count = 0;\\n\\tfor (int i = 1; i <= m; i++) {\\n\\t    int temp = Math.min(v / i , n);\\n\\t    count += temp;\\n\\t}\\n\\treturn count;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106981",
			"view":"1923",
			"top":"1",
			"title":"This name is very miss leading",
			"vote":"14",
			"content":"The name and description are very misleading. This should be the kth smallest number."
		},
		{
			"lc_ans_id":"106991",
			"view":"1610",
			"top":"2",
			"title":"This problem is found on another Online Judge",
			"vote":"9",
			"content":"This exact problem is found on the Codeforces OJ on this link:\\nhttp://codeforces.com/contest/448/problem/D\\nIts solution is also fully written on stack overflow on this link:\\nhttps://stackoverflow.com/questions/33464901/using-binary-search-to-find-k-th-largest-number-in-nm-multiplication-table\\n\\nI found several people who blindly copied that code and got AC!. The reason I know this problem was on Stackoverflow was because **I** was the one who asked that question in 2015!!"
		},
		{
			"lc_ans_id":"106984",
			"view":"1432",
			"top":"3",
			"title":"Python, Straightforward with Explanation",
			"vote":"6",
			"content":"Let's binary search for the answer `A`.\\n\\nSay `enough(x)` is true if and only if there are `k` or more values in the multiplication table that are less than or equal to `x`.  Colloquially, `enough` describes whether `x` is large enough to be the `k-th` value in the multiplication table.\\n\\nThen (for our answer `A`), whenever `x >= A`, `enough(x)` is `True`; and whenever `x < A`, `enough(x)` is `False`.\\n\\nIn our binary search, our loop invariant is that `enough(hi) = True`.  More specifically, if we were to apply `enough` onto each argument in the interval `[lo, hi]`, we would see 0 or more `False`, followed by 1 or more `True`.  Once `lo == hi`, we know that `enough(lo) = True`, and it must have been the smallest such one, because `lo` must have been `hi-1` or `hi-2` at some point, and `mi = hi-1` would have been checked.\\n\\nThis leaves us with the task of counting how many values are less than or equal to `x`.  For each of `m` rows, the `i`-th row looks like `[i, 2*i, 3*i, ..., n*i]`, and there are `min(x // i, n)` values in that row that are less than or equal to `x`.\\n\\n```\\ndef findKthNumber(self, m, n, k):\\n    def enough(x):\\n        return sum(min(x / i, n) for i in xrange(1, m+1)) >= k\\n\\n    lo, hi = 1, m*n\\n    while lo < hi:\\n        mi = (lo + hi) / 2\\n        if not enough(mi):\\n            lo = mi + 1\\n        else:\\n            hi = mi\\n    return lo\\n```"
		},
		{
			"lc_ans_id":"106990",
			"view":"983",
			"top":"4",
			"title":"solution like Kth Smallest Number in Sorted Matrix",
			"vote":"3",
			"content":"\\n\\n\\n\\nclass Solution {\\n    public int findKthNumber(int m, int n, int k) {\\n        int left = 1 * 1;\\n        int right = m * n;   \\n        while (left < right) {\\n            int mid = left + (right - left) / 2;\\n            int count = count(mid, m, n);\\n            if (count < k) {\\n                left = mid + 1;\\n            } else {\\n                right = mid;\\n            }\\n        }\\n        return right;\\n    }\\n    \\n    private int count(int value, int m, int n) {\\n        int i = m, j = 1;\\n        int count = 0;\\n        while (i >= 1 && j <= n) {\\n            if (i * j <= value) {\\n                count += i;\\n                j++;\\n            } else {\\n                i--;\\n            }\\n        }\\n        return count;\\n    }\\n}"
		},
		{
			"lc_ans_id":"106985",
			"view":"302",
			"top":"5",
			"title":"oneliner",
			"vote":"2",
			"content":"```\\ndef find_kth_number(m, n, k)\\n  (1..m*n).bsearch { |x| (1..m).map { |i| [x / i, n].min }.sum >= k }\\nend\\n```"
		},
		{
			"lc_ans_id":"106994",
			"view":"442",
			"top":"6",
			"title":"My 8 Lines C++ Solution",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    int findKthNumber(int m, int n, int k) {\\n        int left = 1, right = m * n;\\n        while (left < right) {\\n            int mid = left + (right - left) / 2, cnt = 0;\\n            for (int i = 1; i <= m; ++i) {\\n                cnt += (mid / i <= n) ? (mid / i) : n;\\n            }\\n            if (cnt < k) left = mid + 1;\\n            else right = mid;\\n        }\\n        return left;\\n    }\\n};"
		},
		{
			"lc_ans_id":"106988",
			"view":"220",
			"top":"7",
			"title":"C++, binary search",
			"vote":"1",
			"content":"This is essentially the same problem as [378. Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix); the solution for this problem is simpler (and faster) due to the property that each row or column is an arithmetic sequence. The complexity can be optimized to O(min(m,n)log(mn)):\\n\\n    int findKthNumber(int m, int n, int k)\\n    {\\n        int low = 1, high = m * n;\\n        \\n        while(low < high)\\n        {\\n            int count = 0;\\n            int mid = (low + high) / 2;\\n\\n            if(m < n)            \\n            {    \\n                for(int i = 1; i <= m; i++)\\n                {\\n                    count += min(mid / i, n);\\n                }\\n            }\\n            else\\n            {\\n                for(int i = 1; i <= n; i++)\\n                {\\n                    count += min(mid / i, m);\\n                }                \\n            }\\n            \\n            if(count < k)\\n            {\\n                low = mid + 1;\\n            }\\n            else\\n            {\\n                high = mid;\\n            }\\n        }\\n        \\n        return low;\\n    }"
		},
		{
			"lc_ans_id":"106995",
			"view":"326",
			"top":"8",
			"title":"Easy to Understand Java Solution",
			"vote":"1",
			"content":"The helper function is learned from @shawngao solution(https://discuss.leetcode.com/topic/101132/java-solution-binary-search/6), much efficient than what I initially thought...\\n```\\nclass Solution {\\n    public int findKthNumber(int m, int n, int k) {\\n        int low = 1, high = m * n;\\n        while (low <= high) {\\n            int mid = low + (high - low) / 2;\\n            int count = helper(m, n, mid);\\n            if (count >= k) high = mid - 1;\\n            else low = mid + 1;\\n        }\\n        return low;\\n    }\\n    private int helper(int m, int n, int num) {\\n        int count = 0;\\n        for (int i = 1; i <= m; i++) {\\n            count += Math.min(num / i, n);\\n        }\\n        return count;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106978",
			"view":"28",
			"top":"9",
			"title":"668.Kth Smallest Number in Multiplication Table, beats 100% with Python",
			"vote":"0",
			"content":"easy Python code for 668. Kth Smallest Number in Multiplication Table, and **beats 100% with 488ms runtime**.\\nBased on https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/discuss/, 5.solution like Kth Smallest Number in Sorted Matrix, I just improve it by **asserting m <= n**.\\n\\n<pre>\\nclass Solution(object):\\n    def findKthNumber(self, m, n, k):\\n        \"\"\"\\n        :type m: int\\n        :type n: int\\n        :type k: int\\n        :rtype: int\\n        \"\"\"\\n        def countLessThan(x, m, n):\\n            assert m <= n\\n            count = 0\\n            for i in xrange(1, m+1):\\n                if x/i < n:\\n                    count += x/i\\n                else:\\n                    count += n\\n            return count\\n        if m > n:\\n            m, n = n, m\\n        lo, hi = 1, m*n\\n        while lo < hi:\\n            mid = (lo + hi)/2\\n            if countLessThan(mid, m, n) < k:\\n                lo = mid + 1\\n            else:\\n                hi = mid\\n        return lo"
		}
	],
	"id":"645",
	"title":"Kth Smallest Number in Multiplication Table",
	"content":"<p>\r\nNearly every one have used the <a href=\"https://en.wikipedia.org/wiki/Multiplication_table\">Multiplication Table</a>. But could you find out the <code>k-th</code> smallest number quickly from the multiplication table?\r\n</p>\r\n\r\n<p>\r\nGiven the height <code>m</code> and the length <code>n</code> of a <code>m * n</code> Multiplication Table, and a positive integer <code>k</code>, you need to return the <code>k-th</code> smallest number in this table.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> m = 3, n = 3, k = 5\r\n<b>Output:</b> \r\n<b>Explanation:</b> \r\nThe Multiplication Table:\r\n1\t2\t3\r\n2\t4\t6\r\n3\t6\t9\r\n\r\nThe 5-th smallest number is 3 (1, 2, 2, 3, 3).\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> m = 2, n = 3, k = 6\r\n<b>Output:</b> \r\n<b>Explanation:</b> \r\nThe Multiplication Table:\r\n1\t2\t3\r\n2\t4\t6\r\n\r\nThe 6-th smallest number is 6 (1, 2, 2, 3, 4, 6).\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The <code>m</code> and <code>n</code> will be in the range [1, 30000].</li>\r\n<li>The <code>k</code> will be in the range [1, m * n]</li>\r\n</ol>\r\n</p>",
	"frequency":"74",
	"ac_num":"4673"
}