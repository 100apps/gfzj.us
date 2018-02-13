{
	"difficulty":"2",
	"submit_num":"1102004",
	"show_id":"5",
	"leetcode_id":"5",
	"answers":[
		{
			"lc_ans_id":"2928",
			"view":"106998",
			"top":"0",
			"title":"Very simple clean java solution",
			"vote":"237",
			"content":"The performance is pretty good, surprisingly.\\n\\n    public class Solution {\\n\\tprivate int lo, maxLen;\\n\\t\\n    public String longestPalindrome(String s) {\\n    \\tint len = s.length();\\n    \\tif (len < 2)\\n    \\t\\treturn s;\\n    \\t\\n        for (int i = 0; i < len-1; i++) {\\n         \\textendPalindrome(s, i, i);  //assume odd length, try to extend Palindrome as possible\\n         \\textendPalindrome(s, i, i+1); //assume even length.\\n        }\\n        return s.substring(lo, lo + maxLen);\\n    }\\n\\n\\tprivate void extendPalindrome(String s, int j, int k) {\\n\\t\\twhile (j >= 0 && k < s.length() && s.charAt(j) == s.charAt(k)) {\\n\\t\\t\\tj--;\\n\\t\\t\\tk++;\\n\\t\\t}\\n\\t\\tif (maxLen < k - j - 1) {\\n\\t\\t\\tlo = j + 1;\\n\\t\\t\\tmaxLen = k - j - 1;\\n\\t\\t}\\n\\t}}"
		},
		{
			"lc_ans_id":"2923",
			"view":"59032",
			"top":"1",
			"title":"Simple C++ solution (8ms, 13 lines)",
			"vote":"168",
			"content":"    string longestPalindrome(string s) {\\n        if (s.empty()) return \"\";\\n        if (s.size() == 1) return s;\\n        int min_start = 0, max_len = 1;\\n        for (int i = 0; i < s.size();) {\\n          if (s.size() - i <= max_len / 2) break;\\n          int j = i, k = i;\\n          while (k < s.size()-1 && s[k+1] == s[k]) ++k; // Skip duplicate characters.\\n          i = k+1;\\n          while (k < s.size()-1 && j > 0 && s[k + 1] == s[j - 1]) { ++k; --j; } // Expand.\\n          int new_len = k - j + 1;\\n          if (new_len > max_len) { min_start = j; max_len = new_len; }\\n        }\\n        return s.substr(min_start, max_len);\\n    }"
		},
		{
			"lc_ans_id":"3060",
			"view":"36991",
			"top":"2",
			"title":"(AC) relatively short and very clear Java solution",
			"vote":"117",
			"content":"**Key idea, every time we move to right, we only need to consider whether using this new character as tail could produce new palindrome string of length (current length +1) or (current length +2)**\\n\\n    public class Solution {\\n        public String longestPalindrome(String s) {\\n            String res = \"\";\\n            int currLength = 0;\\n            for(int i=0;i<s.length();i++){\\n                if(isPalindrome(s,i-currLength-1,i)){\\n                    res = s.substring(i-currLength-1,i+1);\\n                    currLength = currLength+2;\\n                }\\n                else if(isPalindrome(s,i-currLength,i)){\\n                    res = s.substring(i-currLength,i+1);\\n                    currLength = currLength+1;\\n                }\\n            }\\n            return res;\\n        }\\n        \\n        public boolean isPalindrome(String s, int begin, int end){\\n            if(begin<0) return false;\\n            while(begin<end){\\n            \\tif(s.charAt(begin++)!=s.charAt(end--)) return false;\\n            }\\n            return true;\\n        }\\n    }\\n\\nFor friends who are confused about the key idea to check only new palindrome with length = current length +2 or +1, I add some more explanation here.\\n\\n    Example: \"xxxbcbxxxxxa\", (x is random character, not all x are equal) now we \\n              are dealing with the last character 'a'. The current longest palindrome\\n              is \"bcb\" with length 3.\\n    1. check \"xxxxa\" so if it is palindrome we could get a new palindrome of length 5.\\n    2. check \"xxxa\" so if it is palindrome we could get a new palindrome of length 4.\\n    3. do NOT check \"xxa\" or any shorter string since the length of the new string is \\n       no bigger than current longest length.\\n    4. do NOT check \"xxxxxa\" or any longer string because if \"xxxxxa\" is palindrome \\n       then \"xxxx\" got  from cutting off the head and tail is also palindrom. It has \\n       length > 3 which is impossible.'"
		},
		{
			"lc_ans_id":"2921",
			"view":"33837",
			"top":"3",
			"title":"Share my Java solution using dynamic programming",
			"vote":"85",
			"content":"`dp(i, j)` represents whether `s(i ... j)` can form a palindromic substring, `dp(i, j)` is true when `s(i)` equals to `s(j)` and `s(i+1 ... j-1)` is a palindromic substring. When we found a palindrome, check if it's the longest one. Time complexity O(n^2).\\n\\n    public String longestPalindrome(String s) {\\n      int n = s.length();\\n      String res = null;\\n        \\n      boolean[][] dp = new boolean[n][n];\\n        \\n      for (int i = n - 1; i >= 0; i--) {\\n        for (int j = i; j < n; j++) {\\n          dp[i][j] = s.charAt(i) == s.charAt(j) && (j - i < 3 || dp[i + 1][j - 1]);\\n                \\n          if (dp[i][j] && (res == null || j - i + 1 > res.length())) {\\n            res = s.substring(i, j + 1);\\n          }\\n        }\\n      }\\n        \\n      return res;\\n    }"
		},
		{
			"lc_ans_id":"2925",
			"view":"22042",
			"top":"4",
			"title":"Python O(n^2) method with some optimization, 88ms.",
			"vote":"60",
			"content":"Basic thought is simple.  when you increase s by 1 character, you could only increase maxPalindromeLen by 1 or 2, and that new maxPalindrome includes this new character.  Proof: if on adding 1 character, maxPalindromeLen increased by 3 or more, say the new maxPalindromeLen  is Q, and the old maxPalindromeLen  is P, and Q>=P+3. Then it would mean, even without this new character, there would be a palindromic substring ending in the last character, whose length is at least Q-2. Since Q-2 would be >P, this contradicts the condition that P is the maxPalindromeLen without the additional character.\\n\\nSo, it becomes simple, you only need to scan from beginning to the end, adding one character at a time, keeping track of maxPalindromeLen, and for each added character, you check if the substrings ending with this new character, with length P+1 or P+2, are palindromes, and update accordingly.\\n\\nNow, this is O(n^2) as taking substrings and checking palindromicity seem O(n) time.  We can speed up it by realizing that strings are immutable, and there are memory slicing tricks will help to speed these operations up.  comparing string equality with \"==\" is O(1), and using slicing to substring and reverse is  \\u0336a\\u0336l\\u0336s\\u0336o\\u0336 \\u0336O\\u0336(\\u03361\\u0336)\\u0336 \\u0336(\\u0336n\\u0336o\\u0336t\\u0336 \\u0336t\\u0336o\\u0336t\\u0336a\\u0336l\\u0336l\\u0336y\\u0336 \\u0336s\\u0336u\\u0336r\\u0336e\\u0336 \\u0336a\\u0336b\\u0336o\\u0336u\\u0336t\\u0336 \\u0336t\\u0336h\\u0336e\\u0336 \\u0336s\\u0336l\\u0336i\\u0336c\\u0336i\\u0336n\\u0336g\\u0336 \\u0336t\\u0336h\\u0336o\\u0336u\\u0336g\\u0336h\\u0336.\\u0336 \\u0336 \\u0336I\\u0336 \\u0336t\\u0336h\\u0336i\\u0336n\\u0336k\\u0336 \\u0336i\\u0336t\\u0336 \\u0336i\\u0336s\\u0336 \\u0336O\\u0336(\\u03361\\u0336)\\u0336,\\u0336 \\u0336b\\u0336u\\u0336t\\u0336 \\u0336c\\u0336o\\u0336u\\u0336l\\u0336d\\u0336 \\u0336n\\u0336o\\u0336t\\u0336 \\u0336f\\u0336i\\u0336n\\u0336d\\u0336 \\u0336a\\u0336n\\u0336y\\u0336 \\u0336s\\u0336o\\u0336l\\u0336i\\u0336d\\u0336 \\u0336l\\u0336i\\u0336t\\u0336e\\u0336r\\u0336a\\u0336t\\u0336u\\u0336r\\u0336e\\u0336 \\u0336a\\u0336b\\u0336o\\u0336u\\u0336t\\u0336 \\u0336i\\u0336t\\u0336.\\u0336   O(n) (thanks to ChuntaoLu).  But as slicing is optimized by the interpreter's C code, it should run pretty fast.  I'm pretty new to Python.  Would appreciate you would give more insights or further optimization.\\n\\nThus, here is the O(n) method:\\n\\n\\tclass Solution:\\n\\t    # @return a string\\n\\t    def longestPalindrome(self, s):\\n\\t        if len(s)==0:\\n\\t        \\treturn 0\\n\\t        maxLen=1\\n\\t        start=0\\n\\t        for i in xrange(len(s)):\\n\\t        \\tif i-maxLen >=1 and s[i-maxLen-1:i+1]==s[i-maxLen-1:i+1][::-1]:\\n\\t        \\t\\tstart=i-maxLen-1\\n\\t        \\t\\tmaxLen+=2\\n\\t        \\t\\tcontinue\\n\\n\\t        \\tif i-maxLen >=0 and s[i-maxLen:i+1]==s[i-maxLen:i+1][::-1]:\\n\\t        \\t\\tstart=i-maxLen\\n\\t        \\t\\tmaxLen+=1\\n\\t        return s[start:start+maxLen]"
		},
		{
			"lc_ans_id":"2929",
			"view":"17351",
			"top":"5",
			"title":"Accepted 4ms c++ solution.",
			"vote":"52",
			"content":"    class Solution {\\n    public:\\n        std::string longestPalindrome(std::string s) {\\n            if (s.size() < 2)\\n                return s;\\n            int len = s.size(), max_left = 0, max_len = 1, left, right;\\n            for (int start = 0; start < len && len - start > max_len / 2;) {\\n                left = right = start;\\n                while (right < len - 1 && s[right + 1] == s[right])\\n                    ++right;\\n                start = right + 1;\\n                while (right < len - 1 && left > 0 && s[right + 1] == s[left - 1]) {\\n                    ++right;\\n                    --left;\\n                }\\n                if (max_len < right - left + 1) {\\n                    max_left = left;\\n                    max_len = right - left + 1;\\n                }\\n            }\\n            return s.substr(max_left, max_len);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"2954",
			"view":"7482",
			"top":"6",
			"title":"Python easy to understand solution with comments (from middle to two ends).",
			"vote":"40",
			"content":"        \\n    def longestPalindrome(self, s):\\n        res = \"\"\\n        for i in xrange(len(s)):\\n            # odd case, like \"aba\"\\n            tmp = self.helper(s, i, i)\\n            if len(tmp) > len(res):\\n                res = tmp\\n            # even case, like \"abba\"\\n            tmp = self.helper(s, i, i+1)\\n            if len(tmp) > len(res):\\n                res = tmp\\n        return res\\n     \\n    # get the longest palindrome, l, r are the middle indexes   \\n    # from inner to outer\\n    def helper(self, s, l, r):\\n        while l >= 0 and r < len(s) and s[l] == s[r]:\\n            l -= 1; r += 1\\n        return s[l+1:r]"
		},
		{
			"lc_ans_id":"2967",
			"view":"6301",
			"top":"7",
			"title":"22-line C++ Manacher\\u2019s Algorithm O(n) Solution",
			"vote":"22",
			"content":"This implements the Manacher's Algorithm, which is illustrated here: http://articles.leetcode.com/2011/11/longest-palindromic-substring-part-ii.html. Although there are nested loops, there is shortcut in computation, so it is still O(n). \\n\\n\\n    class Solution {\\n    public:\\n        string longestPalindrome(string s) \\n        {\\n            string T;// Transform S to T\\n            for(int i=0;i<s.size();i++)\\n                T+=\"#\"+s.substr(i,1);\\n            T.push_back('#');\\n    \\n            vector<int> P(T.size(),0); // Array to record longest palindrome\\n            int center=0,boundary=0,maxLen=0,resCenter=0;\\n            for(int i=1;i<T.size()-1;i++) {\\n                int iMirror=2*center-i; // calc mirror i = center-(i-center)\\n                P[i]=(boundary>i)?min(boundary-i,P[iMirror]):0; // shortcut\\n                while(i-1-P[i]>=0&&i+1+P[i]<=T.size()-1&&T[i+1+P[i]] == T[i-1-P[i]]) // Attempt to expand palindrome centered at i\\n                    P[i]++;\\n                if(i+P[i]>boundary) { // update center and boundary\\n                    center = i;\\n                    boundary = i+P[i];\\n                }\\n                if(P[i]>maxLen) { // update result\\n                    maxLen = P[i];\\n                    resCenter = i;\\n                }    \\n            }\\n            return s.substr((resCenter - maxLen)/2, maxLen);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"3337",
			"view":"5223",
			"top":"8",
			"title":"Manacher algorithm in Python O(n)",
			"vote":"20",
			"content":"    class Solution:\\n        #Manacher algorithm\\n        #http://en.wikipedia.org/wiki/Longest_palindromic_substring\\n        \\n        def longestPalindrome(self, s):\\n            # Transform S into T.\\n            # For example, S = \"abba\", T = \"^#a#b#b#a#$\".\\n            # ^ and $ signs are sentinels appended to each end to avoid bounds checking\\n            T = '#'.join('^{}$'.format(s))\\n            n = len(T)\\n            P = [0] * n\\n            C = R = 0\\n            for i in range (1, n-1):\\n                P[i] = (R > i) and min(R - i, P[2*C - i]) # equals to i' = C - (i-C)\\n                # Attempt to expand palindrome centered at i\\n                while T[i + 1 + P[i]] == T[i - 1 - P[i]]:\\n                    P[i] += 1\\n        \\n                # If palindrome centered at i expand past R,\\n                # adjust center based on expanded palindrome.\\n                if i + P[i] > R:\\n                    C, R = i, i + P[i]\\n        \\n            # Find the maximum element in P.\\n            maxLen, centerIndex = max((n, i) for i, n in enumerate(P))\\n            return s[(centerIndex  - maxLen)//2: (centerIndex  + maxLen)//2]\\n\\nBased on this  article: http://articles.leetcode.com/2011/11/longest-palindromic-substring-part-ii.html"
		},
		{
			"lc_ans_id":"3308",
			"view":"8877",
			"top":"9",
			"title":"Easy java solution with O(1) space and O(n^2) time",
			"vote":"19",
			"content":"The basic idea is to traverse all the palindromes with its pivot range from the first char of string s to the last char of string s (consider both even length and odd length situation). Use StringBuilder to minimize the space complexity. Here is the code, feast yourself:\\n\\n    public class Solution {\\n    StringBuilder longest = new StringBuilder(\"\");\\n    \\n    public String longestPalindrome(String s) {\\n        if (s.length() <= 1) return s;\\n        \\n        for (int i = 0; i < s.length(); i++) {\\n            expand(s, longest, i, i); //odd\\n            expand(s, longest, i, i + 1); //even\\n        }\\n        \\n        return longest.toString();\\n    }\\n    \\n    private void expand(String s, StringBuilder longest, int i, int j) {\\n        while (i >= 0 && j < s.length()) {\\n            if (s.charAt(i) == s.charAt(j)) {\\n                if (j - i + 1 > longest.length()) {\\n                    longest.delete(0, longest.length());\\n                    longest.append(s.substring(i, j + 1));\\n                }\\n                i--;\\n                j++;\\n            }\\n            else\\n                break;\\n        }\\n    }\\n}"
		}
	],
	"id":"5",
	"title":"Longest Palindromic Substring",
	"content":"<p>Given a string <strong>s</strong>, find the longest palindromic substring in <strong>s</strong>. You may assume that the maximum length of <strong>s</strong> is 1000.</p>\r\n\r\n<p><strong>Example:</strong></p>\r\n\r\n<pre>\r\n<strong>Input:</strong> &quot;babad&quot;\r\n\r\n<strong>Output:</strong> &quot;bab&quot;\r\n\r\n<strong>Note:</strong> &quot;aba&quot; is also a valid answer.\r\n</pre>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Example:</strong></p>\r\n\r\n<pre>\r\n<strong>Input:</strong> &quot;cbbd&quot;\r\n\r\n<strong>Output:</strong> &quot;bb&quot;\r\n</pre>\r\n\r\n<p>&nbsp;</p>\r\n",
	"frequency":"601",
	"ac_num":"277204"
}