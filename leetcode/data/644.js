{
	"difficulty":"2",
	"submit_num":"15052",
	"show_id":"667",
	"leetcode_id":"667",
	"answers":[
		{
			"lc_ans_id":"106948",
			"view":"5576",
			"top":"0",
			"title":"[C++] [Java] Clean Code 4-liner",
			"vote":"46",
			"content":"if you have `n` number, the maximum `k` can be `n - 1`;\\nif `n` is 9, max `k` is 8.\\nThis can be done by picking numbers interleavingly from head and tail, \\n```\\n// start from i = 1, j = n;\\n// i++, j--, i++, j--, i++, j--\\n\\n1   2   3   4   5\\n  9   8   7   6\\nout: 1 9 2 8 3 7 6 4 5\\ndif:  8 7 6 5 4 3 2 1\\n```\\nAbove is a case where `k` is exactly `n - 1`\\nWhen k is less than that, simply lay out the rest `(i, j)` in incremental\\n order(all diff is 1). Say if k is 5:\\n```\\n     i++ j-- i++ j--  i++ i++ i++ ...\\nout: 1   9   2   8    3   4   5   6   7\\ndif:   8   7   6   5    1   1   1   1 \\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    vector<int> constructArray(int n, int k) {\\n        vector<int> res;\\n        for (int i = 1, j = n; i <= j; ) {\\n            if (k > 1) {\\n                res.push_back(k-- % 2 ? i++ : j--);\\n            }\\n            else {\\n                res.push_back(i++);\\n            }\\n        }\\n\\n        return res;\\n    }\\n};\\n```\\n\\n**C++ Compact**\\n```\\nclass Solution {\\npublic:\\n    vector<int> constructArray(int n, int k) {\\n        vector<int> res;\\n        for (int i = 1, j = n; i <= j; )\\n            res.push_back(k > 1 ? (k-- % 2 ? i++ : j--) : i++;\\n        return res;\\n    }\\n};\\n```\\n**Java**\\n```\\nclass Solution {\\n    public int[] constructArray(int n, int k) {\\n        int[] res = new int[n];\\n        for (int i = 0, l = 1, r = n; l <= r; i++)\\n            res[i] = k > 1 ? (k-- % 2 != 0 ? l++ : r--) : l++;\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106957",
			"view":"1681",
			"top":"1",
			"title":"C++, concise code, O(n)",
			"vote":"10",
			"content":"The requirement of k distinct distance can be achieved from 1, 2, ..., k+1 (<= n), by the following strategy:\\n```\\n1, k+1, 2, k, 3, k-1 ...;\\nThe distance of this sequence is k, k-1, k-2, ..., 2, 1\\n```\\nThen append the remaining numbers to the list.\\n```\\nclass Solution {\\npublic:\\n    vector<int> constructArray(int n, int k) {\\n        int l = 1, r = k+1;\\n        vector<int> ans;\\n        while (l <= r) {\\n            ans.push_back(l++);\\n            if (l <= r) ans.push_back(r--);\\n        }\\n        for (int i = k+2; i <= n; i++)\\n            ans.push_back(i);\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"106965",
			"view":"1020",
			"top":"2",
			"title":"Python, Straightforward with Explanation",
			"vote":"9",
			"content":"When `k = n-1`, a valid construction is `[1, n, 2, n-1, 3, n-2, ....]`.  One way to see this is, we need to have a difference of `n-1`, which means we need `1` and `n` adjacent; then, we need a difference of `n-2`, etc.\\n\\nThis leads to the following idea:  we will put `[1, 2, ...., n-k-1]` first, and then we have `N = k+1` adjacent numbers left, of which we want `k` different differences.  This is just the answer above translated by `n-k-1`: we'll put `[n-k, n, n-k+1, n-1, ....]` after.\\n\\n```\\ndef constructArray(self, n, k):\\n    ans = range(1, n - k)\\n    for d in xrange(k+1):\\n        if d % 2 == 0:\\n            ans.append(n-k + d/2)\\n        else:\\n            ans.append(n - d/2)\\n\\n    return ans\\n```"
		},
		{
			"lc_ans_id":"106971",
			"view":"412",
			"top":"3",
			"title":"Java, easy to understand with explanation",
			"vote":"5",
			"content":"1,n,2,n-1,3,n-2,4... ==> Diff:  n-1, n-2, n-3, n-4, n-5...\\nBy following this pattern, k numbers will have k-1 distinct difference values; \\nand all the rest numbers should have |ai - a_i-1| = 1; \\nIn total, we will have k-1+1 = k distinct values.\\n\\n```\\nclass Solution {\\n    public int[] constructArray(int n, int k) {\\n        if(k>=n) return null;\\n        int[] arr = new int[n];\\n        int i = 0, small = 1, large = n;        \\n        while(i<k){ \\n            arr[i++] = small++;\\n            if(i<k) arr[i++] = large--;\\n        }        \\n        if(k%2 == 0){ // k==2 ==> 1, 6, 5,4,3,2\\n            while(i<arr.length) arr[i++] = large--;\\n        } else { // k==3 ==> 1,6,2,3,4,5\\n            while(i<arr.length) arr[i++] = small++;\\n        }\\n        return arr;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106955",
			"view":"430",
			"top":"4",
			"title":"Short+simple with explanation",
			"vote":"4",
			"content":"Start with the numbers sorted, e.g., `1 2 3 4 5 6 7 8 9 10`. Then we only have difference 1, many times. We can create the largest possible difference by making the smallest and largest number neighbors. In the example, let's bring 10 next to 1. If we do this by reversing the whole subarray from 2 to 10, then no other neighborships in 2 to 10 are affected: `1 10 9 8 7 6 5 4 3 2`. To create the next larger possible difference, we can bring 2 next to 10 by reversing the subarray from 9 to 2: `1 10 2 3 4 5 6 7 8 9`. And so on, reversing shorter and shorter suffixes. Just create as many differences as requested.\\n\\nPython\\n\\n    def constructArray(self, n, k):\\n        a = range(1, n+1)\\n        for i in range(1, k):\\n            a[i:] = a[:i-1:-1]\\n        return a\\n\\nRuby\\n```\\ndef construct_array(n, k)\\n  a = (1..n).to_a\\n  (1...k).each { |i| a[i..-1] = a[i..-1].reverse }\\n  a\\nend\\n```"
		},
		{
			"lc_ans_id":"106950",
			"view":"522",
			"top":"5",
			"title":"3 Lines Python",
			"vote":"4",
			"content":"    def constructArray(self, n, k):\\n        res = range(1, n+1)\\n        for i in range(2, k+1): res = res[:i-1] + res[i-1:][::-1]\\n        return res\\n\\nExample: n = 7\\nk = 1, 1234567\\nk = 2, 1765432\\nk = 3, 1723456\\n...."
		},
		{
			"lc_ans_id":"106954",
			"view":"586",
			"top":"6",
			"title":"Unexpected TLE",
			"vote":"3",
			"content":"I'm not certain this code produces the correct answer, however I was surprised to get TLE. I originally was using `push_back` on the vector, but even with a size initializer to avoid multiple heap allocations it still takes too long on the input `(9999,9998)`. On my machine, this code runs in about 8 *micro*seconds, or about 2.5 clocks per `n`, so I don't really know what's going on here.\\n```\\nvector<int> constructArray(int n, int k) {\\n    vector<int> ret(n);\\n    int d = n - 1;\\n    int c = 1;\\n    bool low = true;\\n    int idx = 0;\\n    ret[idx++] = c;\\n    for (int i = 0; i < k - 1; i++)\\n    {\\n        if (low) c += d--;\\n        else c -= d--;\\n        ret[idx++] = c;\\n        low = !low;\\n    }\\n    for (int i = k; i < n; i++)\\n    {\\n        if (low) c++;\\n        else c--;\\n        ret[idx++] = c;\\n    }\\n    return ret;\\n}\\n```\\n\\n**Edit:**\\nI even tried alexander's \"[Clean Code 4-liner](https://discuss.leetcode.com/topic/101113/c-java-clean-code-4-liner)\" solution and it takes over 8 times as long, mostly spent in vector-realloc.\\n\\n**Edit 2:**\\nOk so I just resubmitted this code as-is and it was accepted... Wouldn't have impacted my ranking in the contest much, but still I'd like to know what might have caused TLE in the first place.  In case it matters, my submissions were all within about 10 minutes of the end of the contest."
		},
		{
			"lc_ans_id":"106963",
			"view":"167",
			"top":"7",
			"title":"Java simple solution",
			"vote":"2",
			"content":"    public int[] constructArray(int n, int k) {\\n        //number 1-n. if ascending order, always has diff = 1. \\n        //reorder to be 1, k+1, 2, k, 3 ... so have diff = k,k-1,k-2....1\\n        int[] res = new int[n];\\n        int inc = 1, dec = k+1;\\n        for(int i=0;i<=k;i++){\\n            if(i%2==0)\\n                res[i] = inc++;\\n            else\\n                res[i] = dec--;\\n        }\\n       \\n        for(int i=k+1;i<n;i++){\\n            res[i] = i+1;\\n        }\\n        \\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"106949",
			"view":"77",
			"top":"8",
			"title":"My construction use 7 as example",
			"vote":"1",
			"content":"Use 7 as an example, we can obtain some clue about the construction of the array.\\n7, 1\\n[1,2,3,4,5,6,7]  => [1,1,1,1,1,1]\\n\\n7,2\\n[1,7,6,5,4,3,2] => [6,1,1,1,1,1]\\n\\n7,3\\n[1,7,2,3,4,5,6] => [6,5,1,1,1,1]\\n\\n7,4\\n[1,7,2,6,5,4,3] => [6,5,4,1,1,1]\\n\\n7,5\\n[1,7,2,6,3,4,5] => [6,5,4,3,1,1]\\n\\n7,6\\n[1,7,2,6,3,5,4] => [6,5,4,3,2,1]\\n\\nBelow is my code implementation\\n```\\nclass Solution {\\n    public int[] constructArray(int n, int k) {\\n        int[] res = new int[n];\\n        int i, j = 1, m = n, s;\\n        for(i = 0; i < k; i ++) {\\n            if(i % 2 == 0) {\\n                res[i] = j;\\n                j ++;\\n            }\\n            else {\\n                res[i] = m;\\n                m --;\\n            }\\n        }\\n        s = i;\\n        if(s % 2 == 1) {\\n            for(s = i; s < n; s ++) {\\n                res[s] = j;\\n                j ++;\\n            }\\n        }\\n        else {\\n            for(s = i; s < n; s ++) {\\n                res[s] = m;\\n                m --;\\n            }\\n        }\\n        return res;\\n    }\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"106970",
			"view":"183",
			"top":"9",
			"title":"Java O(n) Solution",
			"vote":"1",
			"content":"    public int[] constructArray(int n, int k) {\\n        int[] ret = new int[n];\\n        int hi = n;\\n        int lo = 2;\\n        ret[0] = 1;\\n        boolean last_hi = false;\\n        for (int i = 1; i < n; i++) {\\n            if (k > 1) {\\n                if (!last_hi){\\n                    ret[i] = hi;\\n                    hi --;\\n                }\\n                else {\\n                    ret[i] = lo;\\n                    lo ++;\\n                }\\n                last_hi = !last_hi;\\n                k--;\\n            }\\n            else {\\n                if (last_hi) {\\n                    ret[i] = hi;\\n                    hi--;\\n                }\\n                else {\\n                    ret[i] = lo;\\n                    lo++;\\n                }\\n            }\\n        }\\n        return ret;\\n    }"
		}
	],
	"id":"644",
	"title":"Beautiful Arrangement II",
	"content":"<p>\r\nGiven two integers <code>n</code> and <code>k</code>, you need to construct a list which contains <code>n</code> different positive integers ranging from <code>1</code> to <code>n</code> and obeys the following requirement: <br/>\r\n\r\nSuppose this list is [a<sub>1</sub>, a<sub>2</sub>, a<sub>3</sub>, ... , a<sub>n</sub>], then the list [|a<sub>1</sub> - a<sub>2</sub>|, |a<sub>2</sub> - a<sub>3</sub>|, |a<sub>3</sub> - a<sub>4</sub>|, ... , |a<sub>n-1</sub> - a<sub>n</sub>|] has exactly <code>k</code> distinct integers.\r\n</p>\r\n\r\n<p>\r\nIf there are multiple answers, print any of them.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br/>\r\n<pre>\r\n<b>Input:</b> n = 3, k = 1\r\n<b>Output:</b> [1, 2, 3]\r\n<b>Explanation:</b> The [1, 2, 3] has three different positive integers ranging from 1 to 3, and the [1, 1] has exactly 1 distinct integer: 1.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> n = 3, k = 2\r\n<b>Output:</b> [1, 3, 2]\r\n<b>Explanation:</b> The [1, 3, 2] has three different positive integers ranging from 1 to 3, and the [2, 1] has exactly 2 distinct integers: 1 and 2.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The <code>n</code> and <code>k</code> are in the range 1 <= k < n <= 10<sup>4</sup>.</li>\r\n</ol>\r\n</p>",
	"frequency":"253",
	"ac_num":"7777"
}