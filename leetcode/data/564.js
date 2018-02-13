{
	"difficulty":"2",
	"submit_num":"31813",
	"show_id":"583",
	"leetcode_id":"583",
	"answers":[
		{
			"lc_ans_id":"103214",
			"view":"8809",
			"top":"0",
			"title":"Java DP Solution (Longest Common Subsequence)",
			"vote":"39",
			"content":"To make them identical, just find the longest common subsequence. The rest of the characters have to be deleted from the both the strings, which does not belong to longest common subsequence.\\n\\n    public int minDistance(String word1, String word2) {\\n        int dp[][] = new int[word1.length()+1][word2.length()+1];\\n        for(int i = 0; i <= word1.length(); i++) {\\n            for(int j = 0; j <= word2.length(); j++) {\\n                if(i == 0 || j == 0) dp[i][j] = 0;\\n                else dp[i][j] = (word1.charAt(i-1) == word2.charAt(j-1)) ? dp[i-1][j-1] + 1\\n                        : Math.max(dp[i-1][j], dp[i][j-1]);\\n            }\\n        }\\n        int val =  dp[word1.length()][word2.length()];\\n        return word1.length() - val + word2.length() - val;\\n    }"
		},
		{
			"lc_ans_id":"103217",
			"view":"3481",
			"top":"1",
			"title":"Java DP Solution, same as Edit Distance",
			"vote":"10",
			"content":"```\\npublic class Solution {\\n    public int minDistance(String word1, String word2) {\\n        int len1 = word1.length(), len2 = word2.length();\\n        if (len1 == 0) return len2;\\n        if (len2 == 0) return len1;\\n        \\n        // dp[i][j] stands for distance of first i chars of word1 and first j chars of word2\\n        int[][] dp = new int[len1 + 1][len2 + 1];\\n        for (int i = 0; i <= len1; i++)\\n            dp[i][0] = i;\\n        for (int j = 0; j <= len2; j++)\\n            dp[0][j] = j;\\n            \\n        for (int i = 1; i <= len1; i++) {\\n            for (int j = 1; j <= len2; j++) {\\n                if (word1.charAt(i - 1) == word2.charAt(j - 1))\\n                    dp[i][j] = dp[i - 1][j - 1];\\n                else\\n                    dp[i][j] = Math.min(Math.min(dp[i - 1][j - 1] + 2, dp[i - 1][j] + 1), dp[i][j - 1] + 1);\\n            }\\n        }\\n        \\n        return dp[len1][len2];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103259",
			"view":"1336",
			"top":"2",
			"title":"Longest Common Subsequence DP Java Solution",
			"vote":"8",
			"content":"Since the only operation allowed is deletion, this problem actually becomes finding the longest common subsequence.\\n```\\npublic int minDistance(String word1, String word2) {\\n  int longest = findLongestCommonSubSequence(word1, word2);\\n  return word1.length() - longest + word2.length() - longest;\\n}\\n\\nprivate int findLongestCommonSubSequence(String word1, String word2) {\\n  int[][] matrix = new int[word1.length() + 1][word2.length() + 1];\\n  int re = 0;\\n  for (int i = 1; i <= word1.length(); i++) {\\n    for (int j = 1; j <= word2.length(); j++) {\\n      if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\\n        matrix[i][j] = matrix[i - 1][j - 1] + 1;\\n      } else {\\n\\tmatrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);\\n      }\\n      re = Math.max(matrix[i][j], re);\\n      }\\n    }\\n  return re;\\n}\\n```\\nThe way to calculate longest common subsequence (LCS) is the following. Assume we have two strings \"seat\", \"ocean\" and '#' denotes to empty position.\\n1. We first create a matrix of (n + 1) * (m+1) where n is the length of word1 and m is the length of word2. The reason why we need to plus 1 is so we can handle some edge case like when the first character is the same. \\n\\\\# | \\\\# | s | e | a | t\\n\\\\# | 0  | 0 | 0 | 0 | 0\\n o | 0  | 0 | 0 | 0 | 0\\n c | 0  | 0 | 0 | 0 | 0\\n e | 0  | 0 | 0 | 0 | 0\\n a | 0  | 0 | 0 | 0 | 0\\n n | 0  | 0 | 0 | 0 | 0\\n2. We start comparing word1 and word2. In this case, we first calculate the first row. Since o is not equal to any character in \"seat\", the length of longest common subsequence will be zeron. Same case for character c.\\n\\\\# | \\\\# | s | e | a | t\\n\\\\# | 0  | 0 | 0 | 0 | 0\\n **o | 0  | 0 | 0 | 0 | 0**\\n **c | 0  | 0 | 0 | 0 | 0**\\n e | 0  | 0 | 0 | 0 | 0\\n a | 0  | 0 | 0 | 0 | 0\\n n | 0  | 0 | 0 | 0 | 0\\n3. We now calculate row 'e'. e doesn't equal to s, so the length of LCS is 0.\\n\\\\# | \\\\# | s | e | a | t\\n\\\\# | 0  | 0 | 0 | 0 | 0\\n o | 0  | 0 | 0 | 0 | 0\\n c | 0  | 0 | 0 | 0 | 0\\n e | 0 | **0** | 0 | 0 | 0\\n a | 0  | 0 | 0 | 0 | 0\\n n | 0  | 0 | 0 | 0 | 0\\n=> Now, we compare 'e' with 'se', since the character is the same, we now the length of LCS between \"se\" and \"oce\" is the length of LCS between \"s\" and \"oc\" plus one. That's why we have this code:\\n ```\\nif (word1.charAt(i - 1) == word2.charAt(j - 1)) {\\n  matrix[i][j] = matrix[i - 1][j - 1] + 1;} \\n```\\nNow, the matrix becomes the following:\\n\\\\# | \\\\# | s | e | a | t\\n\\\\# | 0  | 0 | 0 | 0 | 0\\n o | 0  | 0 | 0 | 0 | 0\\n c | 0  | **0** | 0 | 0 | 0\\n e | 0 | 0 | **1** | 0 | 0\\n a | 0  | 0 | 0 | 0 | 0\\n n | 0  | 0 | 0 | 0 | 0\\nNext, we compare c with a, since 'e' doesn't equal to 'a', we then know that, the length of LCS between 'oce' and 'sea' is the larger one of LCS('coe', 'se') and LCS('oc', 'sea').That's why we have the else statement written as below:\\n```\\nelse {\\n  matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);\\n}\\n```\\nThere are plenty of videos explaning LCS online, I didn't include the part about how to actually find the subsequence here since we only care about the length of the LCS.\\nHope this will help."
		},
		{
			"lc_ans_id":"103246",
			"view":"1072",
			"top":"3",
			"title":"Python DP solution",
			"vote":"6",
			"content":"The same as finding longest common sub sequence:\\n`````\\ndef minDistance(self, w1, w2):\\n        m, n = len(w1), len(w2)\\n        dp = [[0] * (n + 1) for i in range(m + 1)]\\n        for i in range(m):\\n            for j in range(n):\\n                dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j], dp[i][j] + (w1[i] == w2[j]))\\n        return m + n - 2 * dp[m][n]"
		},
		{
			"lc_ans_id":"103211",
			"view":"261",
			"top":"4",
			"title":"[Java/C++] Clean Code",
			"vote":"4",
			"content":"DP Formula\\n```\\n/**\\n * dp[i][j] = a[i] == b[j] ? dp[i + 1][j + 1] :\\n *            min(1 + dp[i + 1][j],  // delete a[i] + mindist between a.substr(i+1), b.substr(j)\\n *                1 + dp[i][j + 1])  // delete b[j] + mindist between a.substr(i), b.substr(j+1)\\n */\\n```\\n**Java**\\n```\\nclass Solution {\\n    public int minDistance(String word1, String word2) {\\n        int m = word1.length(), n = word2.length(), MAX = Integer.MAX_VALUE;\\n        char[] a = word1.toCharArray(), b = word2.toCharArray();\\n        int[][] dp = new int[m + 1][n + 1];\\n        for (int i = m; i >= 0; i--) {\\n            for (int j = n; j >= 0; j--) {\\n                if (i < m || j < n)\\n                    dp[i][j] = i < m && j < n && a[i] == b[j] ?\\n                        dp[i + 1][j + 1] : 1 + Math.min((i < m ? dp[i + 1][j] : MAX), (j < n ? dp[i][j + 1] : MAX));\\n            }\\n        }\\n        return dp[0][0];\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int minDistance(string a, string b) {\\n        int m = a.size(), n = b.size();\\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\\n        for (int i = m; i >= 0; i--) {\\n            for (int j = n; j >= 0; j--) {\\n                if (i < m || j < n)\\n                    dp[i][j] = i < m && j < n && a[i] == b[j] ?\\n                        dp[i + 1][j + 1] : 1 + min((i < m ? dp[i + 1][j] : INT_MAX), (j < n ? dp[i][j + 1] : INT_MAX));\\n            }\\n        }\\n        return dp[0][0];\\n    }\\n};\\n```\\n\\n**C++ unsigned int**\\n```\\nclass Solution {\\npublic:\\n    int minDistance(string a, string b) {\\n        int m = a.size(), n = b.size();\\n        vector<vector<uint>> dp(m + 2, vector<uint>(n + 2, -1));\\n        for (int i = m; i >= 0; i--)\\n            for (int j = n; j >= 0; j--)\\n                dp[i][j] = i < m && j < n && a[i] == b[j] ? dp[i + 1][j + 1] : 1 + min(dp[i + 1][j], dp[i][j + 1]);\\n        return dp[0][0];\\n    }\\n};\\n```\\n```\\nclass Solution {\\npublic:\\n    int minDistance(string a, string b) {\\n        vector<vector<uint>> dp(a.size() + 2, vector<uint>(b.size() + 2, -1));\\n        for (int i = a.size(); i >= 0; i--)\\n            for (int j = b.size(); j >= 0; j--)\\n                dp[i][j] = i < a.size() && j < b.size() && a[i] == b[j] ? dp[i + 1][j + 1] : 1 + min(dp[i + 1][j], dp[i][j + 1]);\\n        return dp[0][0];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103223",
			"view":"345",
			"top":"5",
			"title":"Short java DP solution O(n) space (48ms)",
			"vote":"3",
			"content":"```\\npublic int minDistance(String word1, String word2) {\\n        int[] dp = new int[word2.length()];\\n        int lcs = 0;\\n        for(int i = 0; i < word1.length(); i++){\\n            int cur_max = 1;\\n            for(int j = 0; j < word2.length(); j++){\\n                int temp = dp[j];\\n                if(word2.charAt(j) == word1.charAt(i)) dp[j] = cur_max;\\n                cur_max = Math.max(temp+1, cur_max);\\n                lcs = Math.max(lcs, dp[j]);\\n            }\\n        }\\n        return word1.length() - lcs + word2.length() - lcs;\\n    }\\n```\\nUse O(n) space, in i-th iteration over word1, update max possible length of common subsequence end up with word1.charAt(i) in word2 and store in the dp array."
		},
		{
			"lc_ans_id":"103267",
			"view":"1240",
			"top":"6",
			"title":"Python, Straightforward with Explanation",
			"vote":"3",
			"content":"Let ```dp(i, j)``` be the answer for strings ```A[i:]``` and ```B[j:]```.  Let's try to compute it by a top-down dp:\\n* When ```i == len(A) or j == len(B)```, one of the strings is empty, so the answer is just the sum of the remaining lengths.\\n* When ```A[i] == B[j]```, the answer is just ```dp(i+1, j+1)```.  For example, when evaluating the distance between \"acai\" and \"apple\", we only need to look at the distance between \"cai\" and \"pple\".\\n* When ```A[i] != B[j]```, then they both cannot be in the final word, so we either delete ```A[i]``` or ```B[j]```.  Thus, our answer is ```1 + min(dp(i+1, j), dp(i, j+1))```.\\n\\n```\\ndef minDistance(self, A, B):\\n    memo = {}\\n    def dp(i, j):\\n        if (i, j) not in memo:\\n            if i == len(A) or j == len(B):\\n                ans = len(A) + len(B) - i - j\\n            elif A[i] == B[j]:\\n                ans = dp(i+1, j+1)\\n            else:\\n                ans = 1 + min(dp(i+1, j), dp(i, j+1))\\n            memo[i, j] = ans\\n        return memo[i, j]\\n    return dp(0, 0)\\n```\\n\\n\\nWe could have also attempted a bottom-up DP, as shown below.\\n```\\ndef minDistance(self, A, B):\\n    M, N = len(A), len(B)\\n    dp = [[0] * (N+1) for _ in xrange(M+1)]\\n    \\n    for i in xrange(M):\\n        dp[i][-1] = M-i\\n    for j in xrange(N):\\n        dp[-1][j] = N-j\\n        \\n    for i in xrange(M-1, -1, -1):\\n        for j in xrange(N-1, -1, -1):\\n            if A[i] == B[j]:\\n                dp[i][j] = dp[i+1][j+1]\\n            else:\\n                dp[i][j] = 1 + min(dp[i+1][j], dp[i][j+1])\\n    \\n    return dp[0][0]\\n```"
		},
		{
			"lc_ans_id":"103236",
			"view":"179",
			"top":"7",
			"title":"Java solution [longest common subsequence]",
			"vote":"2",
			"content":"The remaining will be the longest common subsequence of the two input strings.\\n```java\\npublic class Solution {\\n    public int minDistance(String word1, String word2) {\\n        int len1 = word1.length();\\n        int len2 = word2.length();\\n        \\n        // #1 Calculate the longest common subseq\\n        int[][] dp = new int[len1+1][len2+1];\\n        for (int row=1; row<=len1; row++) {\\n            for (int col=1; col<=len2; col++) {\\n                dp[row][col] = word1.charAt(row-1) == word2.charAt(col-1)\\n                        ? dp[row][col] = dp[row-1][col-1] + 1\\n                        : Math.max(dp[row-1][col], dp[row][col-1]);\\n            }\\n        }\\n        int maxSubseq = dp[len1][len2];\\n        \\n        // #2 Calculate the required steps\\n        return word1.length() + word2.length() - 2 * maxSubseq;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103232",
			"view":"444",
			"top":"8",
			"title":"[Java/C++] Clean Code",
			"vote":"2",
			"content":"DP Formula\\n```\\n/**\\n * dp[i][j] = a[i] == b[j] ? dp[i + 1][j + 1] :\\n *            min(1 + dp[i + 1][j],  // delete a[i] + mindist between a.substr(i+1), b.substr(j)\\n *                1 + dp[i][j + 1])  // delete b[j] + mindist between a.substr(i), b.substr(j+1)\\n */\\n```\\n**Java**\\n```\\nclass Solution {\\n    public int minDistance(String word1, String word2) {\\n        int m = word1.length(), n = word2.length(), MAX = Integer.MAX_VALUE;\\n        char[] a = word1.toCharArray(), b = word2.toCharArray();\\n        int[][] dp = new int[m + 1][n + 1];\\n        for (int i = m; i >= 0; i--) {\\n            for (int j = n; j >= 0; j--) {\\n                if (i < m || j < n)\\n                    dp[i][j] = i < m && j < n && a[i] == b[j] ?\\n                        dp[i + 1][j + 1] : 1 + Math.min((i < m ? dp[i + 1][j] : MAX), (j < n ? dp[i][j + 1] : MAX));\\n            }\\n        }\\n        return dp[0][0];\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int minDistance(string a, string b) {\\n        int m = a.size(), n = b.size();\\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\\n        for (int i = m; i >= 0; i--) {\\n            for (int j = n; j >= 0; j--) {\\n                if (i < m || j < n)\\n                    dp[i][j] = i < m && j < n && a[i] == b[j] ?\\n                        dp[i + 1][j + 1] : 1 + min((i < m ? dp[i + 1][j] : INT_MAX), (j < n ? dp[i][j + 1] : INT_MAX));\\n            }\\n        }\\n        return dp[0][0];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103229",
			"view":"145",
			"top":"9",
			"title":"Java DP solution with optimized O(N) space",
			"vote":"1",
			"content":"This solution use O(N2) Space, but it more readable:\\n\\n```\\npublic class Solution {\\n    public int minDistance(String word1, String word2) {\\n        int len1 = word1.length();\\n        int len2 = word2.length();\\n        int[][] map = new int[len1+1][len2+1];\\n        \\n        for (int i=0; i<=len1; i++) {\\n            map[i][0] = i;\\n        }\\n        \\n        for (int j=0; j<=len2; j++) {\\n            map[0][j] = j;\\n        }\\n        \\n        for (int i=0; i<len1; i++) {\\n            for (int j=0; j<len2; j++) {\\n                if (word1.charAt(i) == word2.charAt(j)) {\\n                    map[i+1][j+1] = map[i][j];\\n                } else {\\n                    map[i+1][j+1] = Math.min(map[i][j+1], map[i+1][j]) + 1;\\n                }\\n            }\\n        }\\n        \\n        return map[len1][len2];\\n    }\\n}\\n```\\n\\nThis next solution is based on the above, but is optimized to use one O(N) space:\\n\\n```\\npublic class Solution {\\n    public int minDistance(String word1, String word2) {\\n        int len1 = word1.length();\\n        int len2 = word2.length();\\n        int[] map = new int[len2+1];\\n        \\n        for (int j=0; j<=len2; j++) {\\n            map[j] = j;\\n        }\\n        \\n        for (int i=0; i<len1; i++) {\\n            int[] newmap = new int[len2+1];\\n            newmap[0] = i + 1;\\n            for (int j=0; j<len2; j++) {\\n                if (word1.charAt(i) == word2.charAt(j)) {\\n                    newmap[j+1] = map[j];\\n                } else {\\n                    newmap[j+1] = Math.min(map[j+1], newmap[j]) + 1;\\n                }\\n            }\\n            map = newmap;\\n        }\\n        \\n        return map[len2];\\n    }\\n}\\n```"
		}
	],
	"id":"564",
	"title":"Delete Operation for Two Strings",
	"content":"<p>\r\nGiven two words <i>word1</i> and <i>word2</i>, find the minimum number of steps required to make <i>word1</i> and <i>word2</i> the same, where in each step you can delete one character in either string.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"sea\", \"eat\"\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> You need one step to make \"sea\" to \"ea\" and another step to make \"eat\" to \"ea\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The length of given words won't exceed 500.</li>\r\n<li>Characters in given words can only be lower-case letters.</li>\r\n</ol>\r\n</p>",
	"frequency":"173",
	"ac_num":"14187"
}