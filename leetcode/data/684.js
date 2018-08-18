{
	"difficulty":"2",
	"submit_num":"22221",
	"show_id":"718",
	"leetcode_id":"718",
	"answers":[
		{
			"lc_ans_id":"109039",
			"view":"3880",
			"top":"0",
			"title":"Concise Java DP: Same idea of Longest Common Substring",
			"vote":"9",
			"content":"The code explains itself:\\n```\\n\\nclass Solution {\\n    public int findLength(int[] A, int[] B) {\\n        if(A == null||B == null) return 0;\\n        int m = A.length;\\n        int n = B.length;\\n        int max = 0;\\n        //dp[i][j] is the length of longest common subarray ending with nums[i] and nums[j]\\n        int[][] dp = new int[m + 1][n + 1];\\n        for(int i = 0;i <= m;i++){\\n            for(int j = 0;j <= n;j++){\\n                if(i == 0 || j == 0){\\n                    dp[i][j] = 0;\\n                }\\n                else{\\n                    if(A[i - 1] == B[j - 1]){\\n                        dp[i][j] = 1 + dp[i - 1][j - 1];\\n                        max = Math.max(max,dp[i][j]);\\n                    }\\n                }\\n            }\\n        }\\n        return max;\\n    }\\n}\\n```\\nHope it helps!"
		},
		{
			"lc_ans_id":"109068",
			"view":"1115",
			"top":"1",
			"title":"[Java/C++] Clean Code - 8 lines",
			"vote":"6",
			"content":"**DP formula**\\n```\\n/**\\n * dp[i][j] = a[i] == b[j] ? dp[i + 1][j + 1] : 0;\\n * dp[i][j] : max lenth of common subarray start at a[i] & b[j];\\n */\\n```\\n**Java - DP matrix**\\n```\\nclass Solution {\\n    public int findLength(int[] a, int[] b) {\\n        int m = a.length, n = b.length;\\n        if (m == 0 || n == 0) return 0;\\n        int[][] dp = new int[m + 1][n + 1];\\n        int max = 0;\\n        for (int i = m - 1; i >= 0; i--)\\n            for (int j = n - 1; j >= 0; j--)\\n                max = Math.max(max, dp[i][j] = a[i] == b[j] ? 1 + dp[i + 1][j + 1] : 0);\\n        return max;        \\n    }\\n}\\n```\\n**Java - DP array**\\n```\\nclass Solution {\\n    public int findLength(int[] a, int[] b) {\\n        int m = a.length, n = b.length;\\n        if (m == 0 || n == 0) return 0;\\n        int[] dp = new int[n + 1];\\n        int max = 0;\\n        for (int i = m - 1; i >= 0; i--)\\n            for (int j = 0; j < n; j++)\\n                max = Math.max(max, dp[j] = a[i] == b[j] ? 1 + dp[j + 1] : 0);\\n        return max;        \\n    }\\n}\\n```\\n**C++ - DP array**\\n```\\nclass Solution {\\npublic:\\n    int findLength(vector<int>& a, vector<int>& b) {\\n        int m = a.size(), n = b.size();\\n        if (!m || !n) return 0;\\n        vector<int> dp(n + 1);\\n        int res = 0;\\n        for (int i = m - 1; i >= 0; i--) {\\n            for (int j = 0; j < n; j++) {\\n                res = max(res, dp[j] = a[i] == b[j] ? 1 + dp[j + 1] : 0);\\n            }\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109026",
			"view":"960",
			"top":"2",
			"title":"Python Concise DP",
			"vote":"4",
			"content":"This is essentially the same question as longest common substring.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def findLength(self, A, B):\\n        dp = [[0 for _ in range(len(B) + 1)] for _ in range(len(A) + 1)]\\n        for i in range(1, len(A) + 1):\\n            for j in range(1, len(B) + 1):\\n                if A[i - 1] == B[j - 1]:\\n                    dp[i][j] = dp[i - 1][j - 1] + 1\\n        return max(max(row) for row in dp)\\n```"
		},
		{
			"lc_ans_id":"109054",
			"view":"1517",
			"top":"3",
			"title":"Simple Java solution using HashMap",
			"vote":"3",
			"content":"```\\nclass Solution {\\n    public int findLength(int[] A, int[] B) {\\n        int l1 = A.length, l2 = B.length, ans = 0;\\n        if (l1 == 0 || l2 == 0)\\n            return 0;        \\n        HashMap < Integer, List < Integer >> map = new HashMap < > ();\\n        List < Integer > list;\\n        for (int i = 0; i < l1; i++) {\\n            int n = A[i];\\n            list = map.getOrDefault(n, new ArrayList<Integer>());\\n            list.add(i);\\n            map.put(n, list);\\n        }\\n        \\n        for (int i = 0; i < l2 && l2-i > ans; i++) {\\n            int n = B[i];\\n            if (map.containsKey(n)){\\n                list = map.get(n);\\n                for (int m: list) {\\n                    if (l1 - m < ans)\\n                        break;                \\n                    int count = 1, k = m + 1;\\n                    for (int j = i + 1; j < l2 && k < l1; j++, k++) {\\n                        if (B[j] == A[k]) {\\n                            count++;\\n                        } else {\\n                            break;\\n                        }\\n                    }\\n                    ans = Math.max(ans, count);                \\n                }\\n            }\\n        }\\n\\n        return ans;\\n    }\\n}\\n```\\nUpdate: I have updated my code. Thanks for suggestions."
		},
		{
			"lc_ans_id":"109062",
			"view":"259",
			"top":"4",
			"title":"Brute Force Python",
			"vote":"2",
			"content":"I just try to longer and longer lengths, stopping at the first length where there's no common subarray of that length.\\n\\n    def findLength(self, A, B):\\n        A = bytes(A)\\n        B = bytes(B)\\n        for length in range(len(A) + 1):\\n            if not any(A[i:i+length] in B for i in range(len(A) - length + 1)):\\n                return length - 1\\n        return length\\n\\nShorter version:\\n\\n    def findLength(self, A, B):\\n        A, B = bytes(A), bytes(B)\\n        return next(k - 1\\n                    for k in range(len(A) + 2)\\n                    if not any(A[i:i+k] in B for i in range(len(A) - k + 1)))\\n\\nIt's O(n<sup>4</sup>) or more precisely O(|A|<sup>3</sup> &sdot; |B|), though I'm not sure that's a tight bound. Anyway, this gets accepted (in about 7000 ms) despite the poor complexity, thanks to using LeetCode's high time limit for Python (because Python code is slow) and builtin functionality written in C and fast.\\n\\nThe above is for Python 3, here's a Python 2 version that's a bit longer and which only got accepted (in about 6400 ms) two times in six submissions I just tried, because the Python 2 time limit is smaller than the Python 3 time limit for this problem:\\n\\n    def findLength(self, A, B):\\n        A = ''.join(map(chr, A))\\n        B = ''.join(map(chr, B))\\n        for length in xrange(len(A) + 1):\\n            if not any(A[i:i+length] in B for i in xrange(len(A) - length + 1)):\\n                return length - 1\\n        return length\\n\\nAnd here's a faster version (takes about 770 ms), using binary search for finding the length but still using the fast brute force for checking whether a length works.\\n\\n    def findLength(self, A, B):\\n        A, B = bytes(A), bytes(B)\\n        lo, hi = 0, len(A)\\n        while lo < hi:\\n            length = (lo + hi + 1) // 2\\n            if any(A[i:i+length] in B for i in range(len(A) - length + 1)):\\n                lo = length\\n            else:\\n                hi = length - 1\\n        return lo"
		},
		{
			"lc_ans_id":"109063",
			"view":"177",
			"top":"5",
			"title":"Simple O(nm) DP solution",
			"vote":"2",
			"content":"dp[i][j] is the max repeated length if the subarray in a ends at index i-1 and subarray in b ends at index j-1\\n\\n\\n\\n```\\nclass Solution {\\npublic:\\n    int findLength(vector<int>& a, vector<int>& b) {\\n        int na = a.size(), nb= b.size();\\n        int dp[na+1][nb+1] = {};\\n        int mx = 0;\\n        for (int i = 1; i <= na; ++i) for (int j = 1; j <=nb; ++j) {\\n            if (a[i-1] == b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;\\n            mx = max(mx,dp[i][j]);\\n        }\\n        \\n        return mx;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109064",
			"view":"130",
			"top":"6",
			"title":"Easy O(n^2) Time, O(1) Space solution, No DP",
			"vote":"2",
			"content":"```java\\nclass Solution {\\n    public int findLength(int[] A, int[] B) {\\n        int n1 = A.length, n2 = B.length;\\n        int res = 0;\\n        for (int offset = -n1; offset < n2; offset++) {\\n            int count = 0;\\n            for (int i = Math.max(offset, 0); i - offset < n1 && i < n2; i++) {\\n                if (A[i - offset] == B[i]) {\\n                    count++;\\n                    res = Math.max(res, count);\\n                } else {\\n                    count = 0;\\n                }\\n            }\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109050",
			"view":"276",
			"top":"7",
			"title":"Unexpected Memory Limit Exceeded -- Possible LeetCode bug!",
			"vote":"2",
			"content":"During the contest, I had to code this question twice, because my first attempt got memory limit exceeded. After the contest, I saw similar solutions to my MLE solution got accepted! Here is the solution that gets MLE:\\n\\n```\\nclass Solution {\\npublic:\\n    int findLength(vector<int>& A, vector<int>& B) {\\n        vector<vector<int>> DP(1001, vector<int>(1001));\\n        int ans = 0;\\n        for (int i = A.size()-1; i >= 0; --i) {\\n        \\tfor (int j = 0; j < B.size(); ++j) {\\n        \\t\\tif (A[i] == B[j]) {\\n        \\t\\t\\tDP[i][j] = DP[i+1][j+1]+1;\\n                    ans = max(ans, DP[i][j]);\\n        \\t\\t}\\n        \\t}\\n        }\\n        return ans;\\n    }\\n};\\n```\\n\\nI want to point out that this appears to be a faithful, idomatic C++ translation of the intended solution. So it is unfair that it should MLE.\\n\\nIf I replace vectors with static arrays, or dynamically allocated arrays, it passes. It is ONLY vectors that fail. Can anyone explain this? Is it a problem with leetcode? Running on my machine, I cannot find a case that causes much more memory usage than with other methods, including the breaking case that gets MLE on leetcode. They all use < 8MB on my machine.\\n\\nThis equivalent code passes:\\n\\n```\\nclass Solution {\\npublic:\\n    int findLength(vector<int>& A, vector<int>& B) {\\n        int DP[1001][1001];\\n        for (int i = 0; i <= A.size(); ++i) {\\n            for (int j = 0; j <= B.size(); ++j) {\\n                DP[i][j] = 0;\\n            }\\n        }\\n        int ans = 0;\\n        for (int i = A.size()-1; i >= 0; --i) {\\n        \\tfor (int j = 0; j < B.size(); ++j) {\\n        \\t\\tif (A[i] == B[j]) {\\n        \\t\\t\\tDP[i][j] = DP[i+1][j+1]+1;\\n                    ans = max(ans, DP[i][j]);\\n        \\t\\t}\\n        \\t}\\n        }\\n        return ans;\\n    }\\n};\\n```\\n\\nUPDATE:\\n\\nI have done some more testing, and I definitely think something strange is going on with LeetCode. The code below passes. Also, running the MLE test case on my machine using this code (compiled under G++ 6.3.0 in Ubuntu 17.04) only uses around 6616 KB at peak memory usage, while the accepted code uses around 7192 KB, which is more! Both are still very small, however.\\n\\nI also experimented using the MLE and the accepted code below with the MLE test case from LeetCode, and running the test case 100 times. I was thinking perhaps something odd is going on with the vector destructor in the STL. However, this produced the exactly same peak memory as before.\\n\\nThus, I make the tentative claim that this is a bug in LeetCode's system.\\n\\n```\\nvector<vector<int>> DP(1001, vector<int>(1001));\\nclass Solution {\\npublic:\\n    int findLength(vector<int>& A, vector<int>& B) {\\n        for (int i = 0; i < A.size()+1; ++i) {\\n            for (int j = 0; j < B.size()+1; ++j) {\\n                DP[i][j] = 0;\\n            }\\n        }\\n        int ans = 0;\\n        for (int i = A.size()-1; i >= 0; --i) {\\n        \\tfor (int j = 0; j < B.size(); ++j) {\\n        \\t\\tif (A[i] == B[j]) {\\n        \\t\\t\\tDP[i][j] = DP[i+1][j+1]+1;\\n                    ans = max(ans, DP[i][j]);\\n        \\t\\t}\\n        \\t}\\n        }\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109033",
			"view":"786",
			"top":"8",
			"title":"Solution 1: DP O(n^2) with O(n) space; Solution 2: Stringify",
			"vote":"2",
			"content":"Solution 1: DP (~40ms)\\n\\n    public int findLength(int[] A, int[] B) {\\n        int n = A.length, m = B.length, max = 0;\\n        int[] dp = new int[m+1];\\n        for(int i = 1; i <= n; i++)\\n            for(int j = m; j > 0; j--)\\n                max = Math.max(max, dp[j] = A[i-1] == B[j-1] ? dp[j-1] + 1 : 0);\\n        return max;\\n    }\\n\\nSolution 2 (~75ms): binary search + stringify A and B, then use HashSet to check if there are duplicated substrings:\\n```\\n    String Sa = null, Sb = null;\\n    public int findLength(int[] A, int[] B) {\\n        Sa = stringify(A);\\n        Sb = stringify(B);\\n        int l = 0, r = Math.min(A.length, B.length);\\n        while(l < r) {\\n            int mid = (l + r + 1) / 2;\\n            if (check(mid))\\n                l = mid;\\n            else\\n                r = mid - 1;\\n        }\\n        return l;\\n    }\\n    \\n    private String stringify(int[] a) {\\n        StringBuilder sb = new StringBuilder();\\n        for(int x : a)\\n            sb.append((char)x);\\n        return sb.toString();\\n    }\\n    \\n    private boolean check(int len) {\\n        Set<String> set = new HashSet<>();\\n        for(int l = 0, r = len; r <= Sa.length(); l++, r++)\\n            set.add(Sa.substring(l, r));\\n        for(int l = 0, r = len; r <= Sb.length(); l++, r++)\\n            if (set.contains(Sb.substring(l,r))) return true;\\n        return false;\\n    }\\n```"
		},
		{
			"lc_ans_id":"109051",
			"view":"603",
			"top":"9",
			"title":"Why my dp solution get memory exceed limit error?",
			"vote":"2",
			"content":"If using vector<vector<int>> dp  to store the result, I get memory exceed limit error, while using int[][] dp, my submission is accepted. \\n\\nI am wondering why vector<vector<int>> consumes more memory than int[][]."
		}
	],
	"id":"684",
	"title":"Maximum Length of Repeated Subarray",
	"content":"<p>Given two integer arrays <code>A</code> and <code>B</code>, return the maximum length of an subarray that appears in both arrays.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\nA: [1,2,3,2,1]\r\nB: [3,2,1,4,7]\r\n<b>Output:</b> 3\r\n<b>Explanation:</b> \r\nThe repeated subarray with maximum length is [3, 2, 1].\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>1 <= len(A), len(B) <= 1000</li>\r\n<li>0 <= A[i], B[i] < 100</li>\r\n</ol>\r\n</p>",
	"frequency":"214",
	"ac_num":"9117"
}