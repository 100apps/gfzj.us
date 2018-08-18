{
	"difficulty":"2",
	"submit_num":"10051",
	"show_id":"712",
	"leetcode_id":"712",
	"answers":[
		{
			"lc_ans_id":"108810",
			"view":"2012",
			"top":"0",
			"title":"Concise DP solution",
			"vote":"9",
			"content":"The same idea as edit distance. Straightforward 19 lines.\\n\\n```\\nclass Solution {\\n    public int minimumDeleteSum(String s1, String s2) {\\n        int[][] count = new int[s1.length() + 1][s2.length() + 1];\\n        for(int i = 1; i < count.length; i++){\\n            count[i][0] = count[i-1][0] + s1.charAt(i-1);\\n        }\\n        for(int i = 1; i < count[0].length; i++){\\n            count[0][i] = count[0][i-1] + s2.charAt(i-1);\\n        }\\n        for(int i = 1; i < count.length; i++){\\n            for(int j = 1; j < count[0].length; j++){\\n                int cost = (s1.charAt(i-1) == s2.charAt(j-1))? 0 : s1.charAt(i-1) + s2.charAt(j-1);\\n                count[i][j] = Math.min(count[i-1][j] + s1.charAt(i-1), count[i][j-1] + s2.charAt(j-1));\\n                count[i][j] = Math.min(count[i][j], count[i-1][j-1] + cost);\\n            }\\n        }\\n        return count[s1.length()][s2.length()];   \\n    }\\n}\\n``"
		},
		{
			"lc_ans_id":"108814",
			"view":"849",
			"top":"1",
			"title":"[Java/C++] Clean Code",
			"vote":"8",
			"content":"**DP Formula**\\n```\\n/**\\n * dp[i][j] = a[i] == b[j] ? dp[i + 1][j + 1] :\\n *            min(a[i] + dp[i + 1][j],  // delete a[i] + minimumDeleteSum(a.substr(i+1), b.substr(j))\\n *                b[j] + dp[i][j + 1])  // delete b[j] + minimumDeleteSum(a.substr(i), b.substr(j+1))\\n */\\n```\\n**Java**\\n```\\nclass Solution {\\n    public int minimumDeleteSum(String s1, String s2) {\\n        int m = s1.length(), n = s2.length(), MAX = Integer.MAX_VALUE;\\n        char[] a = s1.toCharArray(), b = s2.toCharArray();\\n        int[][] dp = new int[m + 1][n + 1];\\n        for (int i = m; i >= 0; i--) {\\n            for (int j = n; j >= 0; j--) {\\n                if (i < m || j < n)\\n                    dp[i][j] = i < m && j < n && a[i] == b[j] ?\\n                        dp[i + 1][j + 1] : Math.min((i < m ? a[i] + dp[i + 1][j] : MAX), (j < n ? b[j] + dp[i][j + 1] : MAX));\\n            }\\n        }\\n        return dp[0][0];\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int minimumDeleteSum(string a, string b) {\\n        int m = a.size(), n = b.size();\\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\\n        for (int i = m; i >= 0; i--) {\\n            for (int j = n; j >= 0; j--) {\\n                if (i < m || j < n)\\n                    dp[i][j] = i < m && j < n && a[i] == b[j] ?\\n                        dp[i + 1][j + 1] : min((i < m ? a[i] + dp[i + 1][j] : INT_MAX), (j < n ? b[j] + dp[i][j + 1] : INT_MAX));\\n            }\\n        }\\n        return dp[0][0];        \\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108828",
			"view":"1656",
			"top":"2",
			"title":"C++, DP, with explanation",
			"vote":"8",
			"content":"This is clearly a DP problem.  \\n```\\ndp[i][j] is the cost for s1.substr(0,i) and s2.substr(0, j). Note s1[i], s2[j] not included in the substring.\\n\\nBase case: dp[0][0] = 0\\ntarget: dp[m][n]\\n\\nif s1[i-1] = s2[j-1]   // no deletion\\n    dp[i][j] = dp[i-1][j-1];\\nelse   // delete either s1[i-1] or s2[j-1]\\n    dp[i][j] = min(dp[i-1][j]+s1[i-1], dp[i][j-1]+s2[j-1]);\\n``` \\nWe can use a 2D vector, or an optimized O(n) extra space. See below. The run time is O(mn).\\n```\\nclass Solution {\\npublic:\\n    int minimumDeleteSum(string s1, string s2) {\\n        int m = s1.size(), n = s2.size();\\n        vector<vector<int>> dp(m+1, vector<int>(n+1, 0));\\n        for (int j = 1; j <= n; j++)\\n            dp[0][j] = dp[0][j-1]+s2[j-1];\\n        for (int i = 1; i <= m; i++) {\\n            dp[i][0] = dp[i-1][0]+s1[i-1];\\n            for (int j = 1; j <= n; j++) {\\n                if (s1[i-1] == s2[j-1])\\n                    dp[i][j] = dp[i-1][j-1];\\n                else \\n                    dp[i][j] = min(dp[i-1][j]+s1[i-1], dp[i][j-1]+s2[j-1]);\\n            }\\n        }\\n        return dp[m][n];\\n    }\\n};\\n```\\nOptimized O(n) extra space\\n```\\nclass Solution {\\npublic:\\n    int minimumDeleteSum(string s1, string s2) {\\n        int m = s1.size(), n = s2.size();\\n        vector<int> dp(n+1, 0);\\n        for (int j = 1; j <= n; j++)\\n            dp[j] = dp[j-1]+s2[j-1];\\n        for (int i = 1; i <= m; i++) {\\n            int t1 = dp[0];\\n            dp[0] += s1[i-1];\\n            for (int j = 1; j <= n; j++) {\\n                int t2 = dp[j];\\n                dp[j] = s1[i-1] == s2[j-1]? t1:min(dp[j]+s1[i-1], dp[j-1]+s2[j-1]);\\n                t1 = t2;\\n            }\\n        }\\n        return dp[n];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108813",
			"view":"404",
			"top":"3",
			"title":"C++ O(nm) based on longest common subsequence",
			"vote":"3",
			"content":"We calculate the LCS of two strings, except that now each character as a weight. The algorithm is essentially the same. The delete sum is then the ASCII sum of the two strings minus the LCS value.\\n\\n```\\nclass Solution {\\npublic:\\n    int minimumDeleteSum(string s1, string s2) {\\n        int n1 = s1.size(), n2 = s2.size();\\n        int dp[n1+1][n2+1] = {};\\n        for (int i1 = 1; i1 <=n1; ++i1) for (int i2 = 1; i2 <=n2; ++i2)  {\\n            int ans = 0;\\n            ans = max(dp[i1][i2-1], dp[i1-1][i2]);\\n            if (s1[i1-1]==s2[i2-1]) ans = max(ans, (int)s1[i1-1] + dp[i1-1][i2-1]);\\n            dp[i1][i2] = ans;\\n        }\\n        int ret = 0;\\n        for (auto c:s1) ret +=c;\\n        for (auto c:s2) ret +=c;\\n        ret -= 2*dp[n1][n2];\\n        return ret;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108823",
			"view":"278",
			"top":"4",
			"title":"Java O(n) Similar idea of Edit Distance and LC 524",
			"vote":"2",
			"content":"LC 72 Edit Distance and  LC 524 Longest Word through Deleting share the same idea as this one. The difference lies in the \"cost\" definition, this question defines \"cost\" as the ASCII sum while the other two as the distance. We just need to simply apply the definition in the program.\\n```\\nclass Solution {\\n    public int minimumDeleteSum(String word1, String word2) {\\n\\t        int m = word1.length();\\n\\t        int n = word2.length();\\n\\t        int[][] dp = new int[m+1][n+1];\\n\\t        for(int i = 0;i <= m;i++){\\n\\t            for(int j = 0;j <= n;j++){\\n\\t                if(i == 0&&j == 0){\\n\\t                    dp[i][j] = 0;\\n\\t                }\\n\\t                else if(i == 0){\\n\\t                    dp[0][j] = dp[0][j-1] + (int)word2.charAt(j-1);\\n\\t                }\\n\\t                else if(j == 0){\\n\\t                    dp[i][0] = dp[i-1][0] + (int)word1.charAt(i-1);\\n\\t                }\\n\\t                else{\\n\\t                    int last = dp[i-1][j-1];\\n\\t                    if(word1.charAt(i-1) != word2.charAt(j-1)){\\n\\t                        last += (int)word1.charAt(i-1) + (int)word2.charAt(j-1);\\n\\t                    }\\n\\t                    dp[i][j] = Math.min(last,Math.min(dp[i-1][j]+(int)word1.charAt(i-1),dp[i][j-1]+(int)word2.charAt(j-1)));\\n\\t                }\\n\\t            }\\n\\t        }\\n\\t        return dp[m][n];\\n\\t    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108821",
			"view":"548",
			"top":"5",
			"title":"LCS variation solution, python & c++",
			"vote":"2",
			"content":"to get the minimal cost, we need to find the common subsequences, and among all the common subsequences, we need to find the minimal cost.\\n\\nit is very like to find the longest common subsequence, but this time, we need to find the max ascii common subsequence, then the minimal cost is the two fixed ascii sum of two origin strings, minus the max ascii common subsequence we have found.\\n\\npython code:\\n```\\nclass Solution(object):\\n    def minimumDeleteSum(self, s1, s2):\\n        \"\"\"\\n        :type s1: str\\n        :type s2: str\\n        :rtype: int\\n        \"\"\"\\n        l1 = len(s1)\\n        l2 = len(s2)\\n        dp = [[0] * (l2 + 1) for i in xrange(l1 + 1)]\\n        for i in xrange(l1):\\n            for j in xrange(l2):\\n                if s1[i] == s2[j]:\\n                    dp[i+1][j+1] = dp[i][j] + ord(s1[i]) * 2\\n                else:\\n                    dp[i+1][j+1] = max(dp[i+1][j], dp[i][j+1])\\n        n1 = sum(ord(c) for c in s1)\\n        n2 = sum(ord(c) for c in s2)\\n        return n1 + n2 - dp[l1][l2]\\n``` \\nc++ code:\\n```\\nclass Solution {\\npublic:\\n    int minimumDeleteSum(string s1, string s2) {\\n        int dp[1001][1001] = {0};\\n        for ( int i = 0; i < s1.size(); ++i ) {\\n            for ( int j = 0; j < s2.size(); ++j ) {\\n                if ( s1[i] == s2[j] ) {\\n                    dp[i+1][j+1] = dp[i][j] + int(s1[i]) * 2;\\n                } else {\\n                    dp[i+1][j+1] = max(dp[i+1][j], dp[i][j+1]);\\n                }\\n            }\\n        }\\n        int n1 = accumulate(s1.begin(), s1.end(), 0);\\n        int n2 = accumulate(s2.begin(), s2.end(), 0);\\n        return n1 + n2 - dp[s1.size()][s2.size()];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108811",
			"view":"225",
			"top":"6",
			"title":"[Java]{DP}(With Explanation)",
			"vote":"1",
			"content":"Very Similar to Longest Common Subsequence Problem.\\n\\nLet, s1 & s2 be the two strings with 1 based indexes.\\nNow assume, dp[i][j] = minimumDeleteSum( s1[0,i], s2[0,j])\\n\\n**Base case**:\\nWhen either of the strings is empty, then whole of the other string has to be deleted.\\nfor e.g. if s1 = \"\", s2 = \"abc\", then only way we could match these strings by deleting characters is by dropping 'a','b','c' of s2 to make it empty like s1.\\n\\nThus, whenever one of them is empty(i.e. i==0 or j==0) then answer is sum of ASCII code of the characters of the other string.\\n\\nHence the ***1st*** rule: **dp[i][j] =** \\n\\n* **sum_ascii(s2) -> if i==0**\\n* **sum_ascii(s1) -> if j==0**\\n\\n**Non-Base case**\\n\\nOf the two strings, if both of their last characters match then certainly the answer comes from skipping those characters. \\ni.e. Answer(\"zca\",\"bza\") = Answer(\"zc\",\"bz\")\\n\\nHence the ***2nd*** rule: **dp[i][j] =** \\n\\n* **dp[i-1][j-1] -> if s1[i]==s2[j]**\\n\\nFinally, if the last characters are different then its one of the three situations:\\n\\n* drop s1's last character (ASCII(s1's last) + dp[i-1][j])\\n* drop s2's last character (ASCII(s2's last) + dp[i][j-1])\\n* drop both last characters (ASCII(s1's last) + ASCII(s2's last) + dp[i-1[[j-1])\\n\\nHence the ***3rd*** rule: **dp[i][j] =** \\n\\n* **Min((ASCII(s1's last) + dp[i-1][j]),(ASCII(s2's last) + dp[i][j-1]),(ASCII(s1's last) + ASCII(s2's last) + dp[i-1[[j-1]))**\\n\\nCombining these 3 rules gives us an elegant solution.\\n```\\npublic int minimumDeleteSum(String s1, String s2) {\\n        int m = s1.length();\\n        int n = s2.length();\\n        int[][] dp = new int[m+1][n+1];\\n        for(int i=0;i<=m;i++){\\n            for(int j=0;j<=n;j++){\\n                if(i==0 || j==0){\\n                    int a = 0;\\n                    for(int z=1;z<=Math.max(j,i);z++){\\n                        a += (i==0?s2.charAt(z-1):s1.charAt(z-1));\\n                    }\\n                    dp[i][j] = a;\\n                }\\n                else if(s1.charAt(i-1)==s2.charAt(j-1)){\\n                    dp[i][j] = dp[i-1][j-1];\\n                }\\n                else{\\n                    dp[i][j] = Math.min(s1.charAt(i-1)+dp[i-1][j],s2.charAt(j-1)+dp[i][j-1]);\\n                    dp[i][j] = Math.min(dp[i][j],s1.charAt(i-1)+s2.charAt(j-1)+dp[i-1][j-1]);\\n                }\\n            }\\n        }\\n        return dp[m][n];\\n    }\\n```"
		},
		{
			"lc_ans_id":"108804",
			"view":"31",
			"top":"7",
			"title":"Memory Limit exceeded. All test cases passed?",
			"vote":"0",
			"content":"Hello,\\n\\nI received \"Memory Limit exceeded\", but it also said 93/93 test cases passed. My code in Javascript:\\n\\n```\\n/**\\n * @param {string} s1\\n * @param {string} s2\\n * @return {number}\\n */\\nlet minimumDeleteSum = function(s1, s2) {\\n  return minimumDeleteSumDp(s1, s2, []);\\n};\\n\\nfunction minimumDeleteSumDp(str1, str2, dp) {\\n  // base cases\\n  if (str1 === \"\" && str2 === \"\") return 0;\\n  if (str1 === \"\" && str2 !== \"\") return getAsciiTotal(str2);\\n  if (str1 !== \"\" && str2 === \"\") return getAsciiTotal(str1);\\n  if (str1 === str2) return 0;\\n\\n  // if last character matches\\n  let lastChar1 = str1[str1.length - 1];\\n  let lastChar2 = str2[str2.length - 1];\\n  let subStr1 = str1.substring(0, str1.length-1);\\n  let subStr2 = str2.substring(0, str2.length-1);\\n  if (lastChar1 === lastChar2) {\\n    // check if we already have this stored in dp\\n    let key = subStr1 + \"---\" + subStr2;\\n    if (typeof dp[key] === \"undefined\") dp[key] = minimumDeleteSumDp(subStr1, subStr2, dp);\\n\\n    return dp[key];\\n  }\\n  else {\\n    let keyRemoveLastChar2 = str1 + \"---\" + subStr2;\\n    if (typeof dp[keyRemoveLastChar2] === \"undefined\") dp[keyRemoveLastChar2] = minimumDeleteSumDp(str1, subStr2, dp);\\n\\n    let keyRemoveLastChar1 = subStr1 + \"---\" + str2;\\n    if (typeof dp[keyRemoveLastChar1] === \"undefined\") dp[keyRemoveLastChar1] = minimumDeleteSumDp(subStr1, str2, dp);\\n\\n    return Math.min(\\n      dp[keyRemoveLastChar2] + lastChar2.charCodeAt(0),\\n      dp[keyRemoveLastChar1] + lastChar1.charCodeAt(0)\\n    );\\n  }\\n}\\n\\nfunction getAsciiTotal(str) {\\n  let total = 0;\\n  for (let i=0; i < str.length; i++) {\\n    total += str.charCodeAt(i);\\n  }\\n  return total;\\n}\\n```"
		},
		{
			"lc_ans_id":"108806",
			"view":"41",
			"top":"8",
			"title":"Simple Python DP O(n) space",
			"vote":"0",
			"content":"~~~\\nclass Solution(object):\\n    def minimumDeleteSum(self, s1, s2):\\n        \"\"\"\\n        :type s1: str\\n        :type s2: str\\n        :rtype: int\\n        \"\"\"\\n        m,n=len(s1)+1,len(s2)+1\\n        dp=[0]\\n        for c in s2:\\n            dp.append(dp[-1]+ord(c))\\n        s1=\" \"+s1\\n        s2=' '+s2\\n        for i in xrange(1,m):\\n            pre=dp[0]\\n            dp[0]+=ord(s1[i])\\n            for j in xrange(1,n):\\n                tmp=dp[j]\\n                if s1[i]==s2[j]:\\n                    dp[j]=pre\\n                else:\\n                    dp[j]=min(pre+ord(s1[i])+ord(s2[j]),dp[j]+ord(s1[i]),dp[j-1]+ord(s2[j])) \\n                    #if we're at dp[j], means we will add dp[j] to the deleted character.\\n                pre=tmp\\n        return dp[-1]"
		},
		{
			"lc_ans_id":"108807",
			"view":"54",
			"top":"9",
			"title":"elegant python solution using dp",
			"vote":"0",
			"content":"```\\n    def minimumDeleteSum(self, s1, s2):\\n        \"\"\"\\n        :type s1: str\\n        :type s2: str\\n        :rtype: int\\n        \"\"\"\\n        l1, l2 = len(s1), len(s2)\\n        dp = [[0] * (l2 + 1) for _ in range(l1 + 1)]\\n        for i in range(l1):\\n            for j in range(l2):\\n                if s1[i] == s2[j]:\\n                    dp[i + 1][j + 1] = dp[i][j] + ord(s1[i])\\n                else:\\n                    dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j])\\n        result = sum(map(ord, s1 + s2)) - dp[l1][l2] * 2\\n        return result"
		}
	],
	"id":"678",
	"title":"Minimum ASCII Delete Sum for Two Strings",
	"content":"<p>Given two strings <code>s1, s2</code>, find the lowest ASCII sum of deleted characters to make two strings equal.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> s1 = \"sea\", s2 = \"eat\"\r\n<b>Output:</b> 231\r\n<b>Explanation:</b> Deleting \"s\" from \"sea\" adds the ASCII value of \"s\" (115) to the sum.\r\nDeleting \"t\" from \"eat\" adds 116 to the sum.\r\nAt the end, both strings are equal, and 115 + 116 = 231 is the minimum sum possible to achieve this.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> s1 = \"delete\", s2 = \"leet\"\r\n<b>Output:</b> 403\r\n<b>Explanation:</b> Deleting \"dee\" from \"delete\" to turn the string into \"let\",\r\nadds 100[d]+101[e]+101[e] to the sum.  Deleting \"e\" from \"leet\" adds 101[e] to the sum.\r\nAt the end, both strings are equal to \"let\", and the answer is 100+101+101+101 = 403.\r\nIf instead we turned both strings into \"lee\" or \"eet\", we would get answers of 433 or 417, which are higher.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li><code>0 < s1.length, s2.length <= 1000</code>.</li>\r\n<li>All elements of each string will have an ASCII value in <code>[97, 122]</code>.</li> \r\n</p>",
	"frequency":"159",
	"ac_num":"5165"
}