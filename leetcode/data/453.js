{
	"difficulty":"1",
	"submit_num":"121663",
	"show_id":"459",
	"leetcode_id":"459",
	"answers":[
		{
			"lc_ans_id":"94334",
			"view":"18851",
			"top":"0",
			"title":"Easy python solution with explaination",
			"vote":"134",
			"content":"Basic idea:\\n\\n1) First char of input string is first char of repeated substring\\n2) Last char of input string is last char of repeated substring\\n3) Let S1 = S + S (where S in input string)\\n4) Remove 1 and last char of S1. Let this be S2\\n5) If S exists in S2 then return true else false\\n6) Let i be index in S2 where S starts then repeated substring length i + 1 and repeated substring S[0: i+1] \\n\\n```\\ndef repeatedSubstringPattern(self, str):\\n\\n        \"\"\"\\n        :type str: str\\n        :rtype: bool\\n        \"\"\"\\n        if not str:\\n            return False\\n            \\n        ss = (str + str)[1:-1]\\n        return ss.find(str) != -1\\n```"
		},
		{
			"lc_ans_id":"94352",
			"view":"35902",
			"top":"1",
			"title":"Java Simple Solution with Explanation",
			"vote":"105",
			"content":"```\\npublic boolean repeatedSubstringPattern(String str) {\\n\\tint l = str.length();\\n\\tfor(int i=l/2;i>=1;i--) {\\n\\t\\tif(l%i==0) {\\n\\t\\t\\tint m = l/i;\\n\\t\\t\\tString subS = str.substring(0,i);\\n\\t\\t\\tStringBuilder sb = new StringBuilder();\\n\\t\\t\\tfor(int j=0;j<m;j++) {\\n\\t\\t\\t\\tsb.append(subS);\\n\\t\\t\\t}\\n\\t\\t\\tif(sb.toString().equals(str)) return true;\\n\\t\\t}\\n\\t}\\n\\treturn false;\\n}\\n```\\n1. The length of the repeating substring must be a divisor of the length of the input string\\n2. Search for all possible divisor of `str.length`, starting for `length/2`\\n3. If `i` is a divisor of `length`, repeat the substring from `0` to `i` the number of times `i` is contained in `s.length`\\n4. If the repeated substring is equals to the input `str` return `true`"
		},
		{
			"lc_ans_id":"94340",
			"view":"16753",
			"top":"2",
			"title":"Java & O(n)",
			"vote":"36",
			"content":"```\\npublic boolean repeatedSubstringPattern(String str) {\\n\\t        //This is the kmp issue\\n\\t        int[] prefix = kmp(str);\\n\\t        int len = prefix[str.length()-1];\\n\\t        int n = str.length();\\n\\t        return (len > 0 && n%(n-len) == 0);\\n\\t    }\\n\\t    private int[] kmp(String s){\\n\\t        int len = s.length();\\n\\t        int[] res = new int[len];\\n\\t        char[] ch = s.toCharArray();\\n\\t        int i = 0, j = 1;\\n\\t        res[0] = 0;\\n\\t        while(i < ch.length && j < ch.length){\\n\\t            if(ch[j] == ch[i]){\\n\\t                res[j] = i+1;\\n\\t                i++;\\n\\t                j++;\\n\\t            }else{\\n\\t                if(i == 0){\\n\\t                    res[j] = 0;\\n\\t                    j++;\\n\\t                }else{\\n\\t                    i = res[i-1];\\n\\t                }\\n\\t            }\\n\\t        }\\n\\t        return res;\\n\\t    }"
		},
		{
			"lc_ans_id":"94346",
			"view":"5957",
			"top":"3",
			"title":"29 ms CPP simple solution. No KMP.",
			"vote":"27",
			"content":"```\\nclass Solution {\\npublic:\\n    bool repeatedSubstringPattern(string str) {\\n        string nextStr = str;\\n        int len = str.length();\\n        if(len < 1) return false;\\n        for(int i = 1; i <= len / 2; i++){\\n            if(len % i == 0){\\n                nextStr = leftShift(str, i);\\n                if(nextStr == str) return true;\\n            }\\n        }\\n        return false;\\n    }\\n    \\n    string leftShift(string &str, int l){\\n        string ret = str.substr(l);\\n        ret += str.substr(0, l);\\n        return ret;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"94397",
			"view":"10420",
			"top":"4",
			"title":"C++ O(n) using KMP, 32ms, 8 lines of code with brief explanation.",
			"vote":"27",
			"content":"First, we build the KMP table. \\n1) Roughly speaking, dp[i+1] stores the maximum number of characters that the string is repeating itself up to position i.\\n2) Therefore, if a string repeats a length 5 substring 4 times, then the last entry would be of value 15.\\n3) To check if the string is repeating itself, we just need the last entry to be non-zero and  str.size() to divide (str.size()-last entry).\\n```\\n    bool repeatedSubstringPattern(string str) {\\n        int i = 1, j = 0, n = str.size();\\n        vector<int> dp(n+1,0);\\n        while( i < str.size() ){\\n            if( str[i] == str[j] ) dp[++i]=++j;\\n            else if( j == 0 ) i++;\\n            else j = dp[j];\\n        }\\n        return dp[n]&&dp[n]%(n-dp[n])==0;\\n    }\\n```"
		},
		{
			"lc_ans_id":"94382",
			"view":"4252",
			"top":"5",
			"title":"From intuitive-but-slow to really-fast-but-a-little-hard-to-comprehend.",
			"vote":"20",
			"content":"Solution 1:\\nLet us start with the very naive solution. It uses 188 ms to solve 100 test cases. The idea is that when we see a character in *str* that matches the very first character of *str*, we can start to hoping that *str* is a built by copies of the substring composed by all characters before the reappearance of the its first character. \\n```\\npublic class Solution {\\n    public boolean repeatedSubstringPattern(String str) {\\n        int l = str.length();\\n        if(l == 1) {\\n            return false;\\n        }\\n        StringBuilder sb = new StringBuilder();\\n        char first = str.charAt(0);\\n        sb.append(first);\\n        int i = 1;\\n        while(i <= l / 2) {\\n            char c = str.charAt(i++);\\n            if(c == first && isCopies(str, sb.toString())) {\\n                return true;\\n            }else {\\n                sb.append(c);\\n            }\\n        }\\n        return false;\\n    }\\n    private boolean isCopies(String str, String substr) {\\n        if(str.length() % substr.length() != 0) {\\n            return false;\\n        }\\n        for(int i = substr.length(); i < str.length(); i += substr.length()){\\n            if(!str.substring(i).startsWith(substr)){\\n                return false;\\n            }\\n        }\\n        return true;\\n    }\\n}\\n```\\nSolution 2:\\nThe problem of the first solution is that we do not use the knowledge of failed matching, and the Knuth-Morris-Pratt algorithm is a classic example of how knowledge of failed tries can be use to guide future search. \\n\\nIn fact we only need to compute the pattern table (the lps array, see below) in the Knuth-Morris-Pratt algorithm. \\n\\nThe entry lps[i] is the length of the longest proper prefix that is also a suffix of (s[0], ..., s[i]), or equivalently, length of the longest prefix that is also a proper suffix of (s[0], ..., s[i]). lps[0] is 0, since a single - character string has no proper prefix or proper suffix. [Here](http://www.geeksforgeeks.org/searching-for-patterns-set-2-kmp-algorithm/)  is a very detailed explanation on the KMP algorithm and how lps is computed dynamically.\\n    \\nAfter we get lps, we relate the property of the lps table to the property of a string being constructed by joining copies of its substring. \\n\\nOne on hand, if *str = (s[0], ..., s[km - 1])* is constructed by joining m copies of its substring *substr = (s[0], ..., s[k-1])*, and assuming that *substr* is the finest making block*str* can be boiled down to, meaning *str* is not constructed by joining copies of any proper substring of *substr*. Then we must have lps[km - 1] equals (m - 1)k. \\n\\nOn the other hand, assuming that the longest proper *prefix* of string *str* that is also a *suffix*, and the remaining string *remainderStr* obtained by removing *prefix* from *str* satisfies the following 3 properties:\\n1. *remainderStr* is a proper substring of *str*,\\n2. |str| is divisiable by |remainderStr|,\\n2. *remainderStr* is a prefix of *prefixStr*.\\n\\nWe can show by induction that *str* is constructed by joining copies of *remainderStr*.\\nHere is the code. It solve the 100 test cases in 29ms. A great improvement over the native approach! Remember the statement above, since we are going to use it again.\\n```\\npublic class Solution {\\n    public boolean repeatedSubstringPattern(String str) {\\n        int l = str.length();\\n        int[] lps = new int[l];\\n        int leading = 1;\\n        int chasing = 0;\\n        while(leading < l) {\\n            if(str.charAt(chasing) == str.charAt(leading)) {\\n                chasing++;\\n                lps[leading] = chasing;\\n                leading++;\\n            }else {\\n                if(chasing > 0) {\\n                    chasing = lps[chasing - 1];\\n                }else {\\n                    chasing = 0;\\n                    leading++;\\n                }\\n            }\\n        }\\n        int lp = lps[l - 1];\\n        return (lp > 0 && l % (l - lp) == 0 && str.startsWith(str.substring(lp)));\\n    }\\n}\\n```\\nSolution 3:\\nCan the problem be solved efficiently without KMP? The following solution runs even faster (23ms on 100 test cases)\\n```\\npublic class Solution {\\n    public boolean repeatedSubstringPattern(String str) {\\n        int l = str.length();\\n        for(int i = l / 2; i > 0; i--) {\\n            if(l % i == 0) {\\n                String substr = str.substring(0, i);\\n                int j = i;\\n                while(j < l) {\\n                    if(!str.substring(j, j + i).equals(substr)){\\n                        break;\\n                    }else {\\n                        j += i;\\n                    }\\n                }\\n                if(j == l) {\\n                    return true;\\n                }\\n            }\\n        }\\n        return false;\\n    }\\n}\\n```\\nSolution 4:\\nWant clearer code that runs even faster ? Here is it. The idea is stated at the end of the explanation for solution 2. Without really find the longest proper prefix that is also a suffix as in solution 2 and see whether the three properties are matched, we just test each *remainderStr*, from the longest possible that satisfies condition 1 and 2, that  whether the corresponding prefix and suffix match each other. It solve 100 test cases in 16ms. So maybe now, you really want to prove the statement since it lead to such a clean and fast solution? It is not hard to prove by induction.\\n```\\npublic class Solution {\\n    public boolean repeatedSubstringPattern(String str) {\\n        int l = str.length();\\n        for(int i = (l + 1) / 2; i < l; i++) {\\n            if(l % (l - i) == 0) {\\n                String prefix = str.substring(0, i);\\n                String remainder = str.substring(i);\\n                String suffix = str.substring(l - i);\\n                if(str.startsWith(remainder) && suffix.equals(prefix)){\\n                    return true;\\n                }\\n            }\\n        }\\n        return false;\\n```"
		},
		{
			"lc_ans_id":"94344",
			"view":"1667",
			"top":"6",
			"title":"Simple Java solution, 2 lines",
			"vote":"17",
			"content":"```\\n    public boolean repeatedSubstringPattern(String str) {\\n        String s = str + str;\\n        return s.substring(1, s.length() - 1).contains(str);\\n    }\\n```"
		},
		{
			"lc_ans_id":"94360",
			"view":"1205",
			"top":"7",
			"title":"My one-line c++ solution",
			"vote":"11",
			"content":"```\\nbool repeatedSubstringPattern(string str) \\n    {\\n        return (str + str).substr(1, str.size() * 2 - 2).find(str)!=-1;\\n    }\\n```"
		},
		{
			"lc_ans_id":"94368",
			"view":"3793",
			"top":"8",
			"title":"Share my simple solution",
			"vote":"10",
			"content":"Try every possible substring, then check.\\n\\n```java\\npublic class Solution {\\n    public boolean repeatedSubstringPattern(String str) {\\n        int len = str.length();\\n        if(len<2) return false;\\n        for(int i=2;i<=len;i++){\\n            if(len%i!=0) continue;\\n            if(check(str, i)) return true;\\n        }\\n        return false;\\n    }\\n    public boolean check(String str, int repeat){\\n        int len = str.length();\\n        String cand = str.substring(0, len/repeat);\\n        for(int i=0;i<len;i++){\\n            if(str.charAt(i)!=cand.charAt(i%(len/repeat))) return false;\\n        }\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"94455",
			"view":"1674",
			"top":"9",
			"title":"1 line in Python",
			"vote":"9",
			"content":"```\\nclass Solution(object):\\n    def repeatedSubstringPattern(self, s):\\n        return any(s[:i] * (len(s) / i) == s for i in range(1, len(s)) if len(s) % i == 0)\\n```\\n\\nTime complexity is O(n<sup>1.5</sup>) because I do for O(n<sup>0.5</sup>)   times (number of divisors of n) an O(n) operation, i.e.,  `s[:i] * (len(s) / d) == s `. Space complexity is O(n)."
		}
	],
	"id":"453",
	"title":"Repeated Substring Pattern",
	"content":"Given a non-empty string check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.  You may assume the given string consists of lowercase English letters only and its length  will not exceed 10000. \r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"abab\"\r\n\r\n<b>Output:</b> True\r\n\r\n<b>Explanation:</b> It's the substring \"ab\" twice.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"aba\"\r\n\r\n<b>Output:</b> False\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b> \"abcabcabcabc\"\r\n\r\n<b>Output:</b> True\r\n\r\n<b>Explanation:</b> It's the substring \"abc\" four times. (And the substring \"abcabc\" twice.)\r\n</pre>\r\n</p>",
	"frequency":"216",
	"ac_num":"46440"
}