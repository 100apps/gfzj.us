{
	"difficulty":"3",
	"submit_num":"12335",
	"show_id":"664",
	"leetcode_id":"664",
	"answers":[
		{
			"lc_ans_id":"106793",
			"view":"5516",
			"top":"0",
			"title":"Java solution, DP",
			"vote":"19",
			"content":"```\\nclass Solution {\\n    public int strangePrinter(String s) {\\n        int n = s.length();\\n        if (n == 0) return 0;\\n        \\n        int[][] dp = new int[101][101];\\n        for (int i = 0; i < n; i++) dp[i][i] = 1;\\n        \\n        for (int i = 1; i < n; i++) {\\n            for (int j = 0; j < n - i; j++) {\\n                dp[j][j + i] = i + 1;\\n                for (int k = j + 1; k <= j + i; k++) {\\n                    int temp = dp[j][k - 1] + dp[k][j + i];\\n                    if (s.charAt(k - 1) == s.charAt(j + i)) temp--;\\n                    dp[j][j + i] = Math.min(dp[j][j + i], temp);\\n                }\\n            }\\n        }\\n        return dp[0][n - 1];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106795",
			"view":"3014",
			"top":"1",
			"title":"Python, Straightforward DP with Explanation",
			"vote":"15",
			"content":"Let ```dp(i, j)``` be the number of turns needed to print ```S[i:j+1]```.\\n\\nNote that whichever turn creates the final print of S[i], might as well be the first turn, and also there might as well only be one print, since any later prints on interval [i, k] could just be on [i+1, k].\\n\\nSo suppose our first print was on [i, k].  We only need to consider prints where S[i] == S[k], because we could instead take our first turn by printing up to the last printed index where S[k] == S[i] to get the same result.  \\n\\nThen, when trying to complete the printing of interval [i, k] (with S[i] == S[k]), the job will take the same number of turns as painting [i, k-1].  This is because it is always at least as good to print [i, k] first in one turn rather than separately.\\n\\nAlso, we would need to complete [k+1, j].  So in total, our candidate answer is dp(i, k-1) + dp(k+1, j).  Of course, when k == i, our candidate is 1 + dp(i+1, j): we paint S[i] in one turn, then paint the rest in dp(i+1, j) turns.\\n\\n```\\ndef strangePrinter(self, S):\\n    memo = {}\\n    def dp(i, j):\\n        if i > j: return 0\\n        if (i, j) not in memo:\\n            ans = dp(i+1, j) + 1\\n            for k in xrange(i+1, j+1):\\n                if S[k] == S[i]:\\n                    ans = min(ans, dp(i, k-1) + dp(k+1, j))\\n            memo[i, j] = ans\\n        return memo[i, j]\\n\\n    return dp(0, len(S) - 1)\\n```"
		},
		{
			"lc_ans_id":"106792",
			"view":"1676",
			"top":"2",
			"title":"Java O(n^3) short DP Solution",
			"vote":"8",
			"content":"f[i][j] represents the number we need to print the substring [i,j]\\nBoundary condition:\\nf[i][i]=1\\nf[i][i-1]=0\\n\\nFor every i<j\\nf[i][j]=min{\\n                1+f[i+1][j], \\n                f[i+1][k-1]+f[k][j] (when i<k<=j, s.charAt(i)==s.charAt(k))\\n               }\\n\\n```\\nclass Solution {\\n    public int strangePrinter(String s) {\\n        int n=s.length();\\n        int[][] f=new int[n][n];\\n        for (int i=n-1;i>=0;i--) \\n            for (int j=i;j<n;j++) \\n            {\\n                f[i][j]=(i==j)?1:1+f[i+1][j];\\n                for (int k=i+1;k<=j;k++) \\n                    if (s.charAt(k)==s.charAt(i)) f[i][j]=Math.min(f[i][j],f[i+1][k-1]+f[k][j]);\\n            }\\n        return (n==0?0:f[0][n-1]);\\n    }  \\n}\\n```"
		},
		{
			"lc_ans_id":"106813",
			"view":"2086",
			"top":"3",
			"title":"Same as Remove Boxes",
			"vote":"7",
			"content":"checkout 546. Remove Boxes, it is almost the same question"
		},
		{
			"lc_ans_id":"106811",
			"view":"1616",
			"top":"4",
			"title":"C++ 29ms DP solution",
			"vote":"4",
			"content":"This problem is simiiar to [#546 Remove Boxes](https://leetcode.com/problems/remove-boxes/description/) which uses `f[l][r][k]` to store the maximum points of range `[l, r]` with `k` boxes equal to `r`. But for this problem, we can use 2D-array DP instead of 3D-array DP because the store of `k` is useless.\\n\\n`f[i][j]` represents the minumum turns to print the sequence from `i` to `j`. The transition function should be: \\n```\\nf[i][j] = min(f[i][k] + f[k+1][j-1]) for each k where i<k<j and s[k]=s[j]\\n```\\nDo not forget the common transition:\\n```\\nf[i][j] = f[i][j-1] + 1\\n```\\nAnd the border condition:\\n```\\nf[i][j] = 0 where i>j\\n```\\n\\nMy C++ code is shown as below(with memorization):\\n```\\n#include <string>\\n#include <cmath>\\n\\nclass Solution\\n{\\nprivate:\\n    int f[100][100];\\n    \\nprivate:\\n    int dfs(const std::string& s, int l, int r)\\n    {\\n        if (l > r) return 0;\\n        if (f[l][r]) return f[l][r];\\n        f[l][r] = dfs(s, l, r - 1) + 1;\\n        for (int i = l; i < r; ++i)\\n        {\\n            if (s[i] == s[r])\\n            {\\n                f[l][r] = std::min(f[l][r], dfs(s, l, i) + dfs(s, i + 1, r - 1));\\n            }\\n        }\\n        return f[l][r];\\n    }\\n    \\npublic:\\n    int strangePrinter(std::string s)\\n    {\\n        memset(f, 0, sizeof(f));\\n        int len = (int)s.size();\\n        return dfs(s, 0, len - 1);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"106808",
			"view":"396",
			"top":"5",
			"title":"C++, DP 15ms with detailed explanation, O(n^3)",
			"vote":"3",
			"content":"This problem can be solved by two dimensional DP, but the transition formula is a bit tricky.\\n\\n1) dp[i][j] represents the minimum turns required for the left inclusive sequence [i, j). I use memoization and DFS to avoid solving a large amount of unnecessary subproblems.\\n2) Greedy choice: For any sequence, we can always begin with printing the first character. Let's say the first character s[0] = 'a'. If there is an optimized solution, which prints s[0] for the range [0, k) as non-first step, we can move this step as the first and keep other steps in the original order. If any printing earlier than s[0]'s original order starts before k, we modify the range to start from k.\\n\\nBased on different ways to combine s[0] = 'a' with other segment of 'a'. We have\\n```\\ndp[i][j] = min(dp[i][j], dp[start][k]+dp[k][end]), for each k where s[k] == s[i]\\nHere start is first character not of s[i], and end is after last character not of s[i] \\n```    \\nFor example, given a sequence \"aaa bcd aaa def aaa ccd aaa\", we have 3 choices to combine s[0] = 'a' with other segment of 'a'.\\nbcd + aaa aaa def aaa ccd aaa, which is the same as  bcd + aaa def aaa ccd\\nbcd aaa def + aaa ccd\\nbcd aaa def aaa ccd + aaa\\n```\\nclass Solution {\\npublic:\\n    int strangePrinter(string s) {\\n        int n = s.size();\\n        vector<vector<int>> dp(n+1, vector<int>(n+1, 0));\\n        return helper(s, dp, 0, n);\\n    }\\nprivate:\\n    int helper(string& str, vector<vector<int>>& dp, int s, int e) {\\n        if (s >= e) return 0;\\n        if (dp[s][e]) return dp[s][e];\\n        // handle leading and trailing characters of str[s]\\n        // Note the range is left inclusive [s,e) [l,r)\\n        int l = s, r = e;\\n        while (l < e && str[l] == str[s]) l++;\\n        while (r > l && str[r-1] == str[s]) r--;\\n        dp[s][e] = 1+helper(str, dp, l, r);\\n        for (int i = l; i < r; i++) {\\n            if (str[i] == str[s]) {\\n                dp[s][e] = min(dp[s][e], helper(str,dp,l,i)+helper(str,dp,i,r));\\n                while (i < e && str[i] == str[s]) i++;\\n            }   \\n        }\\n        return dp[s][e];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"106810",
			"view":"412",
			"top":"6",
			"title":"Java O(n^3) DP Solution with Explanation and Simple Optimization",
			"vote":"3",
			"content":"The problem wants us to find the number of ways to do something without giving specific steps like how to achieve it. This can be a typical signal that dynamic programming may come to help.\\n\\n`dp[i][j]` stands for the minimal turns we need for string from index `i` to index `j`.\\nSo we have\\n- `dp[i][i] = 1`: we need 1 turn to paint a single character.\\n- `dp[i][i + 1] `\\n  - `dp[i][i + 1] = 1` if `s.chartAt(i) == s.charAt(i + 1)`\\n  - `dp[i][i + 1] = 2` if `s.chartAt(i) != s.charAt(i + 1)`\\n\\nThen we can iteration `len` from 2 to possibly n. For each iteration, we iteration `start` index from 0 to the farthest possible.\\n\\n- The maximum turns for `dp[start][start + len]` is `len + 1`, i.e. print one character each time.\\n- We can further divide the substring to two parts: **start -> start+k** and **start+k+1 -> start+len**. It is something as following:\\n  ```\\n  index |start  ...  start + k| |start + k + 1 ... start + len|\\n  char  |  a    ...       b   | |      c       ...      b     |\\n  ```\\n    - As shown above, if we have `s.charAt(start + k) == s.charAt(start + len)`, we can **make it in one turn when we print this character (i.e. `b` here)**\\n    - This case we can reduce our turns to `dp[start][start + k] + dp[start + k + 1][start + len] - 1`\\n\\nComplete codes are here\\n```java\\nclass Solution {\\n    public int strangePrinter(String s) {\\n        if (s == null || s.length() == 0) {\\n            return 0;\\n        }\\n        \\n        int n = s.length();\\n        int[][] dp = new int[n][n];\\n        for (int i = 0; i < n; i++) {\\n            dp[i][i] = 1;\\n            if (i < n - 1) {\\n                dp[i][i + 1] = s.charAt(i) == s.charAt(i + 1) ? 1 : 2;\\n            }\\n        }\\n        \\n        for (int len = 2; len < n; len++) {\\n            for (int start = 0; start + len < n; start++) {\\n                dp[start][start + len] = len + 1;\\n                for (int k = 0; k < len; k++) {\\n                    int temp = dp[start][start + k] + dp[start + k + 1][start + len];\\n                    dp[start][start + len] = Math.min(\\n                        dp[start][start + len],\\n                        s.charAt(start + k) == s.charAt(start + len) ? temp - 1 : temp\\n                    );\\n                }\\n            }\\n        }\\n        \\n        return dp[0][n - 1];\\n    }\\n}\\n```\\nTime complexity is `O(n^3)`\\n\\nSome simple optimization. Consecutive repeating characters do not affect our printing as we can always print them together. i.e `aaabbb` is equivalent with `ab`. So we can reduce the string first which somehow reduce `n`\\n\\n```java\\nStringBuilder sb = new StringBuilder();\\nfor (int i = 0; i < s.length(); i++) {\\n    if (i > 0 && s.charAt(i) == s.charAt(i - 1)) {\\n        continue;\\n    }\\n    sb.append(s.charAt(i));\\n}\\ns = sb.toString();\\n```\\nThis helps reduce running time from 60ms to 53ms."
		},
		{
			"lc_ans_id":"106791",
			"view":"189",
			"top":"7",
			"title":"Can someone please reword the question?",
			"vote":"2",
			"content":"This might be a dumb question. But I can't seem to understand the constraints of the question:\\n\\n* The printer can only print a sequence of the same character each time.\\n  \\n*  At each turn, the printer can print new characters starting from and ending at any places, and will cover the original existing characters.\\n\\nFor example:\\nFor the string \"abcabc\", the answer is 5\\nWhy can't we print \"aaaa\" covering 'a' to 'a', then \"bbbb\" covering 'b' to 'b' and then \"cccc\" covering 'c' to 'c'. making  it 3.\\n\\nTrivially the answer will end up to be the # of unique chars in the string, which obviously is not the case!\\n\\nCan someone please reword the question?"
		},
		{
			"lc_ans_id":"106812",
			"view":"194",
			"top":"8",
			"title":"Java DP + Memorization",
			"vote":"2",
			"content":"```\\n   public int strangePrinter(String s) {\\n        if (s == null || s.length() == 0) {\\n            return 0;\\n        }\\n\\n        int size = s.length();\\n        int[][] dp = new int[size][size];\\n\\n        for (int i = 0; i < size; i++) {\\n            dp[i][i] = 1;\\n        }\\n\\n        return helper(dp, 0, size - 1, s);\\n\\n    }\\n\\n    private int helper(int[][] dp, int x, int y, String s) {\\n        int size = s.length();\\n\\n        if (x < 0 || x >= size || y < 0 || y >= size) {\\n            return 0;\\n        } else if (x > y) {\\n            return 0;\\n        } else if (dp[x][y] != 0) {\\n            return dp[x][y];\\n        } else {\\n\\n            if (s.charAt(y) != s.charAt(y - 1)) {\\n                dp[x][y] = helper(dp, x, y - 1, s) + 1;\\n            } else {\\n                dp[x][y] = helper(dp, x, y-1, s);\\n            }\\n\\n            for (int i = 0; i < y; i++) {\\n                if (s.charAt(i) == s.charAt(y)) {\\n                    dp[x][y] = Math.min(dp[x][y], helper(dp, x, i, s) + helper(dp, i + 1, y - 1, s));\\n                }\\n            }\\n\\n            return dp[x][y];\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"106794",
			"view":"277",
			"top":"9",
			"title":"One suggestion for all solutions",
			"vote":"1",
			"content":"I suggest to do this treatment, before go directly DP.\\n\\nShorten the original string, like reduce ```aaabbb``` to ```ab```.\\n\\nThe same consecutive characters won't change the result and this really help improve the efficiency.\\n \\nBesides, in python, it takes only 1 line to do it:\\n```\\ns = ''.join(a for a, b in zip(s, '#' + s) if a != b)\\n````\\nor use regex\\n````\\ns = re.sub(r'(.)\\\\1*', r'\\\\1', s)\\n`````\\n\\nEdited after stefan's suggestion."
		}
	],
	"id":"641",
	"title":"Strange Printer",
	"content":"<p>\r\nThere is a strange printer with the following two special requirements:\r\n\r\n<ol>\r\n<li>The printer can only print a sequence of the same character each time.</li>\r\n<li>At each turn, the printer can print new characters starting from and ending at any places, and will cover the original existing characters.</li>\r\n</ol>\r\n\r\n</p>\r\n\r\n<p>\r\nGiven a string consists of lower English letters only, your job is to count the minimum number of turns the printer needed in order to print it.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"aaabbb\"\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> Print \"aaa\" first and then print \"bbb\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"aba\"\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> Print \"aaa\" first and then print \"b\" from the second place of the string, which will cover the existing character 'a'.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Hint</b>: Length of the given string will not exceed 100.</p>",
	"frequency":"210",
	"ac_num":"4146"
}