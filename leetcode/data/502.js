{
	"difficulty":"2",
	"submit_num":"59386",
	"show_id":"516",
	"leetcode_id":"516",
	"answers":[
		{
			"lc_ans_id":"99101",
			"view":"25960",
			"top":"0",
			"title":"Straight forward Java DP solution",
			"vote":"82",
			"content":"```dp[i][j]```: the longest palindromic subsequence's length of substring(i, j)\\n```State transition```: \\n```dp[i][j] = dp[i+1][j-1] + 2``` if s.charAt(i) == s.charAt(j)\\n                                     otherwise, ```dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1])```\\n```Initialization```: ```dp[i][i] = 1```\\n```\\npublic class Solution {\\n    public int longestPalindromeSubseq(String s) {\\n        int[][] dp = new int[s.length()][s.length()];\\n        \\n        for (int i = s.length() - 1; i >= 0; i--) {\\n            dp[i][i] = 1;\\n            for (int j = i+1; j < s.length(); j++) {\\n                if (s.charAt(i) == s.charAt(j)) {\\n                    dp[i][j] = dp[i+1][j-1] + 2;\\n                } else {\\n                    dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);\\n                }\\n            }\\n        }\\n        return dp[0][s.length()-1];\\n    }\\n}\\n```\\n\\n\\nTop bottom recursive method with memoization\\n```\\npublic class Solution {\\n    public int longestPalindromeSubseq(String s) {\\n        return helper(s, 0, s.length() - 1, new Integer[s.length()][s.length()]);\\n    }\\n    \\n    private int helper(String s, int i, int j, Integer[][] memo) {\\n        if (memo[i][j] != null) {\\n            return memo[i][j];\\n        }\\n        if (i > j)      return 0;\\n        if (i == j)     return 1;\\n        \\n        if (s.charAt(i) == s.charAt(j)) {\\n            memo[i][j] = helper(s, i + 1, j - 1, memo) + 2;\\n        } else {\\n            memo[i][j] = Math.max(helper(s, i + 1, j, memo), helper(s, i, j - 1, memo));\\n        }\\n        return memo[i][j];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99111",
			"view":"5530",
			"top":"1",
			"title":"Evolve from brute force to dp",
			"vote":"32",
			"content":"1. O(2^n) Brute force. If the two ends of a string are the same, then they must be included in the longest palindrome subsequence. Otherwise, both ends cannot be included in the longest palindrome subsequence.\\n```\\n    int longestPalindromeSubseq(string s) {\\n        return longestPalindromeSubseq(0,s.size()-1,s); \\n    }\\n    int longestPalindromeSubseq(int l, int r, string &s) {\\n        if(l==r) return 1;\\n        if(l>r) return 0;  //happens after \"aa\" \\n        return s[l]==s[r] ? 2 + longestPalindromeSubseq(l+1,r-1, s) : \\n            max(longestPalindromeSubseq(l+1,r, s),longestPalindromeSubseq(l,r-1, s)); \\n    }\\n```\\n2. O(n^2) Memoization\\n```\\n    int longestPalindromeSubseq(string s) {\\n        int n = s.size();\\n        vector<vector<int>> mem(n,vector<int>(n));\\n        return longestPalindromeSubseq(0,n-1, s,mem); \\n    }\\n    int longestPalindromeSubseq(int l, int r, string &s, vector<vector<int>>& mem) {\\n        if(l==r) return 1;\\n        if(l>r) return 0;\\n        if(mem[l][r]) return mem[l][r];\\n        return mem[l][r] = s[l]==s[r] ? 2 + longestPalindromeSubseq(l+1,r-1, s,mem) : \\n            max(longestPalindromeSubseq(l+1,r, s,mem),longestPalindromeSubseq(l,r-1, s,mem)); \\n        \\n    }\\n```\\n3. O(n^2) dp\\n```\\n    int longestPalindromeSubseq(string s) {\\n        int n = s.size();\\n        vector<vector<int>> dp(n+1,vector<int>(n));\\n        for(int i=0;i<n;i++) dp[1][i]=1;\\n        for(int i=2;i<=n;i++) //length\\n            for(int j=0;j<n-i+1;j++) {//start index \\n                dp[i][j] = s[j]==s[i+j-1]?2+dp[i-2][j+1]:max(dp[i-1][j],dp[i-1][j+1]);\\n        return dp[n][0]; \\n    }\\n```\\n4. O(n^2) time, O(n) space dp. In #3, the current row is computed from the previous 2 rows only. So we don't need to keep all the rows.\\n```\\n    int longestPalindromeSubseq(string s) {\\n        int n = s.size();\\n        vector<int> v0(n), v1(n,1), v(n), *i_2=&v0, *i_1=&v1, *i_=&v;\\n        for(int i=2;i<=n;i++) {//length\\n            for(int j=0;j<n-i+1;j++)//start index\\n                i_->at(j) = s[j]==s[i+j-1]?2+i_2->at(j+1):max(i_1->at(j),i_1->at(j+1));\\n            swap(i_1,i_2);    \\n            swap(i_1,i_); //rotate i_2, i_1, i_\\n        }\\n        return i_1->at(0); \\n    }\\n```"
		},
		{
			"lc_ans_id":"99129",
			"view":"6752",
			"top":"2",
			"title":"Python DP O(n) space O(n^2) time",
			"vote":"14",
			"content":"**Idea:**\\ndp[i][j] = longest palindrome subsequence of s[i to j].\\nIf s[i] == s[j], dp[i][j] = 2 + dp[i+1][j - 1]\\nElse, dp[i][j] = max(dp[i+1][j], dp[i][j-1])\\n\\n**Rolling array O(2n) space**\\n```\\nclass Solution(object):\\n    def longestPalindromeSubseq(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: int\\n        \"\"\"\\n        n = len(s)\\n        dp = [[1] * 2 for _ in range(n)]\\n        for j in xrange(1, len(s)):\\n            for i in reversed(xrange(0, j)):\\n                if s[i] == s[j]:\\n                    dp[i][j%2] = 2 + dp[i + 1][(j - 1)%2] if i + 1 <= j - 1 else 2\\n                else:\\n                    dp[i][j%2] = max(dp[i + 1][j%2], dp[i][(j - 1)%2])\\n        return dp[0][(n-1)%2]\\n```\\n\\n**Further improve space to O(n)**\\n```\\nclass Solution(object):\\n    def longestPalindromeSubseq(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: int\\n        \"\"\"\\n        n = len(s)\\n        dp = [1] * n\\n        for j in xrange(1, len(s)):\\n            pre = dp[j]\\n            for i in reversed(xrange(0, j)):\\n                tmp = dp[i]\\n                if s[i] == s[j]:\\n                    dp[i] = 2 + pre if i + 1 <= j - 1 else 2\\n                else:\\n                    dp[i] = max(dp[i + 1], dp[i])\\n                pre = tmp\\n        return dp[0]\\n```"
		},
		{
			"lc_ans_id":"99153",
			"view":"2556",
			"top":"3",
			"title":"Fast and concise Python solution that actually gets AC",
			"vote":"12",
			"content":"I noticed that some of the most voted python solutions here got TLE, so here is an optimized solution.\\n```\\nclass Solution(object):\\n    def longestPalindromeSubseq(self, s):\\n        d = {}\\n        def f(s):\\n            if s not in d:\\n                maxL = 0    \\n                for c in set(s):\\n                    i, j = s.find(c), s.rfind(c)\\n                    maxL = max(maxL, 1 if i==j else 2+f(s[i+1:j]))\\n                d[s] = maxL\\n            return d[s]\\n        return f(s)\\n```"
		},
		{
			"lc_ans_id":"99110",
			"view":"694",
			"top":"4",
			"title":"What is the meaning of example 1?",
			"vote":"8",
			"content":"Hi,\\n\\nI am kind of confused of the first example, which says \"bbbab\"'s  longest palindromic subsequence is \"bbbb\". Is this a typo or I didn't get the point?\\n\\nThanks in advance!"
		},
		{
			"lc_ans_id":"99107",
			"view":"4633",
			"top":"5",
			"title":"Sharing my clean O(n^2) C++ DP solution, super easy and clear",
			"vote":"8",
			"content":"Maybe not the best DP solution yet, but very easy to understand and systematic.\\n\\nThe DP state longest[i][j] means for substring between [i, j] inclusive the longest palindromic subsequence.\\n\\nBasic cases:\\nif i == j, then longest[i][j] = 1, naturally\\nif i+1 == j, then longest[i][j] = 2 if s[i] == s[j]\\n                         longest[i][j] = 1 otherwise\\nTransition rule:\\n1) s[i] == s[j]\\ndp[i][j] = max(dp[i+1][j], dp[i][j-1], dp[i+1][j-1] + 2)\\n2) s[i] != s[j]\\ndp[i][j] = max(dp[i+1][j], dp[i][j-1], dp[i+1][j-1])\\n\\nThe condition that only **subsequence** made it quite simply because at any range [i, j], the s[i], s[j] can be omitted to make the rest range [i+1, j] or [i, j-1] our valid longest palindromic subsequence.\\n\\nCode:\\n```\\nclass Solution {\\npublic:\\n    //lhs means left hand side, rhs means right hand side\\n    int longestPalindromeSubseq(string s) {\\n        if (s.empty()) return 0;\\n        \\n        vector<vector<int>> longest(s.size(), vector<int>(s.size()));\\n        for (int len=1; len<=s.size(); len++) {\\n            for (int lhs=0; lhs+len<=s.size(); lhs++) {\\n                int rhs = lhs+len-1;\\n                if (lhs == rhs) {\\n                    longest[lhs][rhs] = 1;\\n                } else if (lhs+1 == rhs) {\\n                    longest[lhs][rhs] = (s[lhs] == s[rhs]) ? 2 : 1;\\n                } else {\\n                    int add = s[lhs] == s[rhs] ? 2 : 0;\\n                    longest[lhs][rhs] = max(max(longest[lhs][rhs-1], longest[lhs+1][rhs]), longest[lhs+1][rhs-1] + add);\\n                }\\n            }\\n        }\\n        \\n        return longest[0].back();\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99117",
			"view":"1154",
			"top":"6",
			"title":"Python standard DP beats 100% (with \"pre-processing\")",
			"vote":"7",
			"content":"I found that for python, the standard DP solutions (time `O(n^2)`, space `O(n^2)`) might get TLE, while the O(n) space solutions can get accepted in ~1400ms.\\n\\nBut if we simply check if `s` itself is a palindrome first, we could reduce a lot of unnecessary dp steps to speed it up. \\n\\n\\n<br>\\n\\n**This space `O(n)` DP solution got accepted in 619 ms, beating 100%.**\\n```\\n    def longestPalindromeSubseq(self, s):\\n        if s == s[::-1]:\\n            return len(s)\\n\\n        n = len(s)\\n        dp = [0 for j in xrange(n)]\\n        dp[n-1] = 1\\n\\n        for i in xrange(n-1, -1, -1):   # can actually start with n-2...\\n            newdp = dp[:]\\n            newdp[i] = 1\\n            for j in xrange(i+1, n):\\n                if s[i] == s[j]:\\n                    newdp[j] = 2 + dp[j-1]\\n                else:\\n                    newdp[j] = max(dp[j], newdp[j-1])\\n            dp = newdp\\n                    \\n        return dp[n-1]\\n\\n```\\n\\n<br>\\n<br>\\n\\n**This standard dp solution (space O(n<sup>2</sup>) with the same trick got accepted in ~900 ms**\\n\\n```\\n    def longestPalindromeSubseq(self, s):\\n        if s == s[::-1]:\\n            return len(s)\\n\\n        n = len(s)\\n        dp = [[0 for j in xrange(n)] for i in xrange(n)]\\n\\n        for i in xrange(n-1, -1, -1):\\n            dp[i][i] = 1\\n            for j in xrange(i+1, n):\\n                if s[i] == s[j]:\\n                    dp[i][j] = 2 + dp[i+1][j-1]\\n                else:\\n                    dp[i][j] = max(dp[i+1][j], dp[i][j-1])\\n                    \\n        return dp[0][n-1]\\n\\n```"
		},
		{
			"lc_ans_id":"99154",
			"view":"1108",
			"top":"7",
			"title":"short java solution,beats 99%,with explanation",
			"vote":"7",
			"content":"It is a typical DP problem. let's use a[i][j] represent the longest Palindromic Subsequence of S[i:j] (i,j inclusive). \\nSo a[i][j]=\\n(1) a[i+1][j-1]+2               if S[i] == S[j]\\n(2) Max( a[i+1][j], a[i][j-1] )   if S[i]! = S[j]\\n\\n```\\npublic class Solution {\\n    public int longestPalindromeSubseq(String s) {\\n        int n=s.length();\\n        int[][] a=new int[n][n];\\n        for(int i=0;i<n;i++) a[i][i]=1;\\n        return helper(a,0,n-1,s);\\n    }\\n    private int helper(int[][] a,int i,int j,String s){\\n        if(i>j || a[i][j]!=0) return a[i][j];\\n        if(s.charAt(i)==s.charAt(j)) a[i][j]=helper(a,i+1,j-1,s)+2;\\n        else a[i][j]=Math.max(helper(a,i,j-1,s),helper(a,i+1,j,s) );\\n        return a[i][j];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99151",
			"view":"278",
			"top":"8",
			"title":"Super simple solution using reversed string",
			"vote":"5",
			"content":"If you know how to find LCS between 2 strings, then this problems can be reduced to finding the LCS between the original string and its reversed form:\\n\\n```java\\n    public int longestPalindromeSubseq(String s) {\\n        if (s == null || s.isEmpty()) return 0;\\n        int len = s.length();\\n        int[][] dp = new int[len + 1][len + 1];\\n        String t = new StringBuilder(s).reverse().toString();\\n        for (int i = len - 1; i >= 0; i--) {\\n            for (int j = len - 1; j >= 0; j--) {\\n                if (s.charAt(i) == t.charAt(j)) {\\n                    dp[i][j] = 1 + dp[i+1][j+1];\\n                } else {\\n                    dp[i][j] = Math.max(dp[i+1][j], dp[i][j+1]);\\n                }\\n            }\\n        }\\n        return dp[0][0];\\n    }\\n```"
		},
		{
			"lc_ans_id":"99176",
			"view":"1378",
			"top":"9",
			"title":"Java DP Solution",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public int longestPalindromeSubseq(String s) {\\n        int len = s.length();\\n        int[][] dp = new int[len][len];\\n        for(int i = 0;i < len;i++){\\n            dp[i][i] = 1;\\n        }\\n        //for each interval length\\n        for(int l = 2;l <= len;l++){\\n            //for each interval with the same length\\n            for(int st = 0;st <= len-l;st++){\\n                int ed = st+l-1;\\n                //if left end equals to right end or not\\n                dp[st][ed] = s.charAt(st)==s.charAt(ed)? dp[st+1][ed-1]+2 : Math.max(dp[st+1][ed], dp[st][ed-1]);\\n            }\\n        }\\n        return dp[0][len-1];\\n    }\\n}\\n````"
		}
	],
	"id":"502",
	"title":"Longest Palindromic Subsequence",
	"content":"<p>\r\nGiven a string s, find the longest palindromic subsequence's length in s. You may assume that the maximum length of s is 1000.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br>\r\nInput: \r\n<pre>\r\n\"bbbab\"\r\n</pre>\r\nOutput: \r\n<pre>\r\n4\r\n</pre>\r\nOne possible longest palindromic subsequence is \"bbbb\".\r\n</p>\r\n\r\n<p><b>Example 2:</b><br>\r\nInput:\r\n<pre>\r\n\"cbbd\"\r\n</pre>\r\nOutput:\r\n<pre>\r\n2\r\n</pre>\r\nOne possible longest palindromic subsequence is \"bb\".\r\n</p>",
	"frequency":"301",
	"ac_num":"25410"
}