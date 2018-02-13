{
	"difficulty":"2",
	"submit_num":"144369",
	"show_id":"161",
	"leetcode_id":"161",
	"answers":[
		{
			"lc_ans_id":"50098",
			"view":"21413",
			"top":"0",
			"title":"My CLEAR JAVA solution with explanation",
			"vote":"139",
			"content":"    /*\\n     * There're 3 possibilities to satisfy one edit distance apart: \\n     * \\n     * 1) Replace 1 char:\\n     \\t  s: a B c\\n     \\t  t: a D c\\n     * 2) Delete 1 char from s: \\n    \\t  s: a D  b c\\n    \\t  t: a    b c\\n     * 3) Delete 1 char from t\\n    \\t  s: a   b c\\n    \\t  t: a D b c\\n     */\\n    public boolean isOneEditDistance(String s, String t) {\\n        for (int i = 0; i < Math.min(s.length(), t.length()); i++) { \\n        \\tif (s.charAt(i) != t.charAt(i)) {\\n        \\t\\tif (s.length() == t.length()) // s has the same length as t, so the only possibility is replacing one char in s and t\\n        \\t\\t\\treturn s.substring(i + 1).equals(t.substring(i + 1));\\n    \\t\\t\\telse if (s.length() < t.length()) // t is longer than s, so the only possibility is deleting one char from t\\n    \\t\\t\\t\\treturn s.substring(i).equals(t.substring(i + 1));\\t        \\t\\n    \\t\\t\\telse // s is longer than t, so the only possibility is deleting one char from s\\n    \\t\\t\\t\\treturn t.substring(i).equals(s.substring(i + 1));\\n        \\t}\\n        }       \\n        //All previous chars are the same, the only possibility is deleting the end char in the longer one of s and t \\n        return Math.abs(s.length() - t.length()) == 1;        \\n    }"
		},
		{
			"lc_ans_id":"50101",
			"view":"8041",
			"top":"1",
			"title":"Easy understood Java solution",
			"vote":"38",
			"content":"    public boolean isOneEditDistance(String s, String t) {\\n        if(Math.abs(s.length()-t.length()) > 1) return false;\\n        if(s.length() == t.length()) return isOneModify(s,t);\\n        if(s.length() > t.length()) return isOneDel(s,t);\\n        return isOneDel(t,s);\\n    }\\n    public boolean isOneDel(String s,String t){\\n        for(int i=0,j=0;i<s.length() && j<t.length();i++,j++){\\n            if(s.charAt(i) != t.charAt(j)){\\n                return s.substring(i+1).equals(t.substring(j));\\n            }\\n        }\\n        return true;\\n    }\\n    public boolean isOneModify(String s,String t){\\n        int diff =0;\\n        for(int i=0;i<s.length();i++){\\n            if(s.charAt(i) != t.charAt(i)) diff++;\\n        }\\n        return diff==1;\\n    }"
		},
		{
			"lc_ans_id":"50108",
			"view":"5633",
			"top":"2",
			"title":"4ms 11-lines C++ Solution with Explanations",
			"vote":"29",
			"content":"To solve this problem, you first need to know what is *edit distance*. You may refer to this [wikipedia article][1] for more information.\\n\\nFor this problem, it implicitly assumes to use the classic **Levenshtein distance**, which involves **insertion**, **deletion** and **substitution** operations and all of them are of the same cost. Thus, if `S` is one edit distance apart from `T`, `T` is automatically one edit distance apart from `S`.\\n\\nNow let's think about all the possible cases for two strings to be one edit distance apart. Well, that means, we can transform `S` to `T` by using exactly one edit operation. There are three possible cases:\\n\\n 1. We insert a character into `S` to get `T`.\\n 2. We delete a character from `S` to get `T`.\\n 3. We substitute a character of `S` to get `T`.\\n\\nFor cases 1 and 2, `S` and `T` will be one apart in their lengths. For cases 3, they are of the same length.\\n\\nIt is relatively easy to handle case 3. We simply traverse both of them and compare the characters at the corresponding positions. If we find exactly one mismatch during the traverse, they are one edit distance apart.\\n\\nNow let's move on to cases 1 and 2. In fact, they can be merged into one case, that is, to delete a character from the longer string to get the shorter one, or equivalently, to insert a character into the shorter string to get the longer one.\\n \\nWe will handle cases 1 and 2 using the shorter string as the reference. We traverse the two strings, once we find a mismatch. We know this position is where the deletion in the longer string happens. For example, suppose `S = \"kitten\"` and `T = \"kiten\"`, we meet the first mismatch in the `4`-th position (`1`-based), which corresponds to the deleted character below, shown in between `*`. We then continue to compare the remaining sub-string of `T` (`en`) with the remaining sub-string of `S` (`en`) and find them to be the same. So they are one edit distance apart. \\n\\n`S: k i t t e n` \\n\\n`T: k i t *t* e n`\\n\\nIn fact, cases 1, 2 and 3 can be further handled using the same piece of code. For strings of the same length, once we find a mismatch, we just substitute one to be another and check whether they are now the same. For strings of one apart in lengths, we insert the deleted character of the longer string into the shorter one and compare whether they are the same. \\n\\nThe code is as follows. If you find the first half of the return statement (`!mismatch && (n - m == 1)`) hard to understand, run the code on cases that the mismatch only occurs at the last character of the longer string, like `S = \"ab\"` and `T = \"abc\"`. \\n\\n    class Solution {\\n    public:\\n        bool isOneEditDistance(string s, string t) {\\n            int m = s.length(), n = t.length();\\n            if (m > n) return isOneEditDistance(t, s);\\n            if (n - m > 1) return false;\\n            bool mismatch = false;\\n            for (int i = 0; i < m; i++) {\\n                if (s[i] != t[i]) {\\n                    if (m == n) s[i] = t[i];\\n                    else s.insert(i, 1, t[i]);\\n                    mismatch = true; \\n                    break;\\n                }\\n            }\\n            return (!mismatch && n - m == 1) || (mismatch && s == t);\\n        }\\n    };\\n\\n  [1]: https://en.wikipedia.org/wiki/Edit_distance"
		},
		{
			"lc_ans_id":"50096",
			"view":"1611",
			"top":"3",
			"title":"Clarify the meaning of one edit distance apart",
			"vote":"17",
			"content":"One edit means remove/add/change 1 character.\\n\\nA tip: the problem asks if they are EXACTLY one edit distance apart"
		},
		{
			"lc_ans_id":"50159",
			"view":"5204",
			"top":"4",
			"title":"My solutions in 3 languages with one for loop",
			"vote":"16",
			"content":"Java:\\n\\n\\n    for (int i = 0; i < Math.min(s.length(), t.length()); i++) {\\n        if (s.charAt(i) != t.charAt(i)) {\\n            return s.substring(i + (s.length() >= t.length() ? 1 : 0)).equals(t.substring(i + (s.length() <= t.length() ? 1 : 0)));\\n        }\\n    }\\n    return Math.abs(s.length() - t.length()) == 1;\\n\\nC++:\\n\\n        for (int i = 0; i < min(s.size(), t.size()); i++) {\\n            if (s.at(i) != t.at(i)) {\\n                return s.substr(i + (s.size() >= t.size() ? 1 : 0)).compare(t.substr(i + (s.size() <= t.size() ? 1 : 0))) == 0;\\n            }\\n        }\\n        return s.size() - t.size() == 1 || s.size() - t.size() == -1;\\n\\nPython:\\n\\n        for i in range(min(len(s), len(t))):\\n            if s[i] != t[i]:\\n                return s[i + (1 if len(s) >= len(t) else 0):] == t[i + (1 if len(s) <= len(t) else 0):]\\n        return abs(len(s) - len(t)) == 1"
		},
		{
			"lc_ans_id":"50107",
			"view":"2634",
			"top":"5",
			"title":"Accepted clean Java solution with explanation (two pointers)",
			"vote":"15",
			"content":"The basic idea is we keep comparing s and t from the beginning, once there's a difference, we try to replace s(i) with t(j) or insert t(j) to s(i) and see if the rest are the same.\\n\\nExample: i and j are the two pointers of S and T, we found that 'b' != 'c' and we try to replace it:\\n\\n         i                           i\\n    S: a c d      replace       S: a b d\\n    T: a b c d   --------->     T: a b c d    --->  \"d\" != \"cd\", no good\\n         j                           j\\n\\nnow we try to insert T(j) to S(i) and we get:\\n\\n         i                           i\\n    S: a c d      insert        S: a b c d\\n    T: a b c d   --------->     T: a b c d    --->  \"cd\" == \"cd\", viola!\\n         j                           j\\n\\n\\nTo keep the code simple, we make s is always shorter than t, so we don't need to try deletion.\\n\\nCode:\\n\\n    public boolean isOneEditDistance(String s, String t) {\\n      if (s == null || t == null)\\n        return false;\\n          \\n      if (s.length() > t.length())\\n        return isOneEditDistance(t, s);\\n          \\n      int i = 0, j = 0;\\n      \\n      while (i < s.length() && j < t.length()) {\\n        if (s.charAt(i) != t.charAt(j)) {\\n          // we try to replace s[i] with s[j] or insert s[j] to s[i]\\n          // then compare the rest and see if they are the same\\n          return s.substring(i + 1).equals(t.substring(j + 1)) ||\\n                 s.substring(i).equals(t.substring(j + 1));\\n        }\\n        \\n        i++; j++;\\n      }\\n      \\n      return t.length() - j == 1;\\n    }"
		},
		{
			"lc_ans_id":"50095",
			"view":"2153",
			"top":"6",
			"title":"Python concise solution with comments.",
			"vote":"14",
			"content":"        \\n    def isOneEditDistance(self, s, t):\\n        if s == t:\\n            return False\\n        l1, l2 = len(s), len(t)\\n        if l1 > l2: # force s no longer than t\\n            return self.isOneEditDistance(t, s)\\n        if l2 - l1 > 1:\\n            return False\\n        for i in xrange(len(s)):\\n            if s[i] != t[i]:\\n                if l1 == l2:\\n                    s = s[:i]+t[i]+s[i+1:]  # replacement\\n                else:\\n                    s = s[:i]+t[i]+s[i:]  # insertion\\n                break\\n        return s == t or s == t[:-1]"
		},
		{
			"lc_ans_id":"50204",
			"view":"1079",
			"top":"7",
			"title":"Simple Java solution",
			"vote":"7",
			"content":"    public class Solution {\\n    public boolean isOneEditDistance(String s, String t) {\\n        if(Math.abs(s.length() - t.length()) > 1)  return false;\\n        int i = 0, j = 0,err = 0;\\n        while(i<s.length() && j<t.length())\\n        {\\n            if(s.charAt(i) != t.charAt(j))\\n            {\\n                err++;\\n                if(err > 1)\\n                    return false;\\n                if(s.length() > t.length())\\n                    j--;\\n                else if(s.length() < t.length())\\n                    i--;\\n            }\\n            i++;\\n            j++;\\n        }\\n        return (err == 1 || (err == 0 && t.length() != s.length()))? true: false;\\n    }\\n}"
		},
		{
			"lc_ans_id":"50190",
			"view":"1559",
			"top":"8",
			"title":"Java/Python two pointer solution",
			"vote":"6",
			"content":"If `s` and `t` are one distance away then no matter it is insert or delete or replace the count of common characters must be `max(m, n) - 1`, where `m` is the length of `s` and `n` is the length of `t`. It is easy to see that the reverse is also true.\\n\\n\\n\\nAssume the length of common prefix (from left to right) is `i` and the length of common suffix after `i` (from right to left) is `j`, the answer is then `max(m, n) - 1 == i + j`\\n\\nExample 1 (1 replace)\\n\\n    s = \"abcdefg\", m = 7\\n    t = \"abcxefg\", n = 7 \\n    i = 3, j = 3\\n    max(m, n) - 1 == i + j is true\\n\\nExample 2 (0 edit)\\n\\n    s = \"abcdefg\", m = 7\\n    t = \"abcdefg\", n = 7 \\n    i = 7, j = 0\\n    max(m, n) - 1 == i + j is false\\n\\nExample 3 (1 insert)\\n\\n    s = \"abcdefg\", m = 7\\n    t = \"abcefg\", n = 6 \\n    i = 3, j = 3\\n    max(m, n) - 1 == i + j is true\\n\\nExample 4 (1 delete 1 insert)\\n\\n    s = \"abcdefg\", m = 7\\n    t = \"abcefgh\", n = 7 \\n    i = 3, j = 0\\n    max(m, n) - 1 == i + j is false\\n\\n\\nThe method is O(m+n) since any character is visited at most once.\\n\\n**Java**\\n\\n    public boolean isOneEditDistance(String s, String t) {\\n        int m = s.length(), n = t.length();\\n        if (Math.abs(m - n) > 1) return false;\\n        int k = Math.min(m, n);\\n        int i = 0, j = 0;\\n        while (i < k && s.charAt(i) == t.charAt(i)) ++i;\\n        while (j < k - i && s.charAt(m - 1 - j) == t.charAt(n - 1 - j)) ++j;\\n        return m + n - k - 1 == i + j;\\n    }\\n    // Runtime : 2ms\\n\\n**Python**\\n\\n    def isOneEditDistance(self, s, t):\\n        n, m = len(s), len(t)\\n        if abs(n - m) > 1:\\n            return False\\n        k = min(n, m)\\n        i = j = 0\\n        while i < k and s[i] == t[i]:\\n            i += 1\\n        while j < k - i and s[~j] == t[~j]:\\n            j += 1\\n        return max(n, m) - (i + j) == 1\\n\\n\\n    # 129 / 129 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 40 ms\\n    # 96.05%"
		},
		{
			"lc_ans_id":"50104",
			"view":"585",
			"top":"9",
			"title":"C++ solution for stream/file where you don't know the length of the strings",
			"vote":"5",
			"content":"If it is a file or stream where you have iterator only moves forward, and you only know the size when you hit the end, we have to split into 3 cases when first difference occurs.\\nI use s.size() and t.size() in the code but they can be easily translated into iter!=s.end()\\n\\n    bool isOneEditDistance(string s, string t) {\\n        int i =0;\\n        while(i<s.size() && i<t.size() && s[i]==t[i]){\\n             ++i;\\n        }\\n        \\n        if(i==s.size() && i==t.size()) return false;\\n        else if(i==s.size() && i+1==t.size() || i==t.size() && i+1==s.size()) return true;\\n        else if(i<s.size() && i<t.size()){\\n            ++i;\\n            bool s1=true, s2=true, s3=true;//3 senarios\\n            while(i<s.size() && i<t.size()){\\n            if(s[i]!=t[i-1]) s1=false;\\n            if(s[i]!=t[i]) s2=false;\\n            if(s[i-1]!=t[i]) s3=false;\\n            if(!s1 && !s2 && !s3) return false;\\n            ++i;\\n            }\\n            if(s1 && i+1==s.size() && s[i]==t[i-1]) return true;\\n            if(s2 && i==s.size() && i==t.size()) return true;\\n            if(s3 && i+1==t.size() && s[i-1]==t[i]) return true;\\n            return false;\\n        }\\n    }"
		}
	],
	"id":"161",
	"title":"One Edit Distance",
	"content":"<p>Given two strings S and T, determine if they are both one edit distance apart.</p>",
	"frequency":"324",
	"ac_num":"45783"
}