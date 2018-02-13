{
	"difficulty":"1",
	"submit_num":"287419",
	"show_id":"290",
	"leetcode_id":"290",
	"answers":[
		{
			"lc_ans_id":"73402",
			"view":"49593",
			"top":"0",
			"title":"8 lines simple Java",
			"vote":"145",
			"content":"    public boolean wordPattern(String pattern, String str) {\\n        String[] words = str.split(\" \");\\n        if (words.length != pattern.length())\\n            return false;\\n        Map index = new HashMap();\\n        for (Integer i=0; i<words.length; ++i)\\n            if (index.put(pattern.charAt(i), i) != index.put(words[i], i))\\n                return false;\\n        return true;\\n    }\\n\\nI go through the pattern letters and words in parallel and compare the indexes where they last appeared.\\n\\n**Edit 1:** Originally I compared the **first** indexes where they appeared, using `putIfAbsent` instead of `put`. That was based on [mathsam's solution](https://leetcode.com/discuss/36438/1-liner-in-python?show=39066#a39066) for the old [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) problem. But then [czonzhu's answer](https://leetcode.com/discuss/62374/9-lines-simple-java?show=62383#a62383) below made me realize that `put` works as well and why.\\n\\n**Edit 2:** Switched from\\n\\n        for (int i=0; i<words.length; ++i)\\n            if (!Objects.equals(index.put(pattern.charAt(i), i),\\n                                index.put(words[i], i)))\\n                return false;\\n\\nto the current version with `i` being an `Integer` object, which allows to compare with just `!=` because there's no autoboxing-same-value-to-different-objects-problem anymore. Thanks to lap_218 for somewhat pointing that out in the comments."
		},
		{
			"lc_ans_id":"73409",
			"view":"14385",
			"top":"1",
			"title":"Short C++, read words on the fly",
			"vote":"88",
			"content":"I think all previous C++ solutions read all words into a vector at the start. Here I read them on the fly.\\n\\n    bool wordPattern(string pattern, string str) {\\n        map<char, int> p2i;\\n        map<string, int> w2i;\\n        istringstream in(str);\\n        int i = 0, n = pattern.size();\\n        for (string word; in >> word; ++i) {\\n            if (i == n || p2i[pattern[i]] != w2i[word])\\n                return false;\\n            p2i[pattern[i]] = w2i[word] = i + 1;\\n        }\\n        return i == n;\\n    }"
		},
		{
			"lc_ans_id":"73399",
			"view":"12041",
			"top":"2",
			"title":"Very fast (3ms) Java Solution using HashMap",
			"vote":"56",
			"content":"    public class Solution {\\n        public boolean wordPattern(String pattern, String str) {\\n            String[] arr= str.split(\" \");\\n            HashMap<Character, String> map = new HashMap<Character, String>();\\n            if(arr.length!= pattern.length())\\n                return false;\\n            for(int i=0; i<arr.length; i++){\\n                char c = pattern.charAt(i);\\n                if(map.containsKey(c)){\\n                    if(!map.get(c).equals(arr[i]))\\n                        return false;\\n                }else{\\n                    if(map.containsValue(arr[i]))\\n                        return false;\\n                    map.put(c, arr[i]);\\n                }    \\n            }\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"73433",
			"view":"10375",
			"top":"3",
			"title":"Short in Python",
			"vote":"52",
			"content":"This problem is pretty much equivalent to [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/). Let me reuse two old solutions.\\n\\nFrom [here](https://leetcode.com/discuss/36438/1-liner-in-python?show=39070#c39070):\\n\\n    def wordPattern(self, pattern, str):\\n        s = pattern\\n        t = str.split()\\n        return map(s.find, s) == map(t.index, t)\\n\\nImproved version also from there:\\n\\n    def wordPattern(self, pattern, str):\\n        f = lambda s: map({}.setdefault, s, range(len(s)))\\n        return f(pattern) == f(str.split())\\n\\nFrom [here](https://leetcode.com/discuss/41379/1-line-in-python?show=41382#a41382):\\n        \\n    def wordPattern(self, pattern, str):\\n        s = pattern\\n        t = str.split()\\n        return len(set(zip(s, t))) == len(set(s)) == len(set(t)) and len(s) == len(t)\\n\\nThanks to zhang38 for pointing out the need to check len(s) == len(t) here."
		},
		{
			"lc_ans_id":"73434",
			"view":"5934",
			"top":"4",
			"title":"0ms C++ solution using istringstream and double maps",
			"vote":"21",
			"content":"        bool wordPattern(string pattern, string str) {\\n            istringstream strcin(str);\\n            string s;\\n            vector<string> vs;\\n            while(strcin >> s) vs.push_back(s);\\n            if (pattern.size() != vs.size()) return false;\\n            map<string, char> s2c;\\n            map<char, string> c2s;\\n            for (int i = 0; i < vs.size(); ++i) {\\n                if (s2c[vs[i]] == 0 && c2s[pattern[i]] == \"\") { \\n                    s2c[vs[i]] = pattern[i]; \\n                    c2s[pattern[i]] = vs[i]; \\n                    continue; \\n                }\\n                if (s2c[vs[i]] != pattern[i]) return false;\\n            }\\n            return true;\\n        }"
		},
		{
			"lc_ans_id":"73411",
			"view":"1481",
			"top":"5",
			"title":"My solution in python",
			"vote":"12",
			"content":"    class Solution(object):\\n        def wordPattern(self, pattern, str):\\n            \"\"\"\\n            :type pattern: str\\n            :type str: str\\n            :rtype: bool\\n            \"\"\"\\n            x = str.split(' ')\\n            lsp = len(set(pattern))\\n            lsx = len(set(x))\\n            return len(x)==len(pattern) and lsx==lsp and lsp== len(set(zip(pattern, x)))\\n\\nplease point out if there's anything i should improve"
		},
		{
			"lc_ans_id":"73519",
			"view":"1396",
			"top":"6",
			"title":"Haven't seen a C solution, post mine here",
			"vote":"10",
			"content":"    bool wordPattern(char* pattern, char* str)\\n    {\\n            int i, j, len = strlen(pattern);\\n            int search[len];\\n            char *token, *saveptr; char strtmp[strlen(str)];\\n            for(i = 0; i < len; i++) search[i] = -1;\\n    \\n            strcpy(strtmp, str);\\n            token = strtok_r(strtmp, \" \", &saveptr);\\n            for(i = 0; i < len; i++)\\n            {\\n                    int a = strchr(pattern, pattern[i]) - pattern;\\n    \\n                    if(token == NULL) break;\\n                    int b = strstr(str, token) - str;\\n    \\n                    for(j = 0; j < a; j++)\\n                            if(search[j] == b) return false;\\n                    if(search[a] == -1) search[a] = b;\\n                    else if(search[a]!= b) return false;\\n                    token = strtok_r(NULL, \" \", &saveptr);\\n            }\\n            if((token == NULL) ^ (i== len)) return false;\\n            return true;\\n    }"
		},
		{
			"lc_ans_id":"73613",
			"view":"2548",
			"top":"7",
			"title":"My 3ms java solution using only one hashmap",
			"vote":"8",
			"content":"\\n    public boolean wordPattern(String pattern, String str) {\\n        if (pattern == null || str == null) {\\n            return false;\\n        }\\n        char[] patterns = pattern.toCharArray();\\n        String[] strs = str.split(\" \");\\n        if (patterns.length != strs.length) {\\n            return false;\\n        }\\n        Map<Character, String> map = new HashMap<Character, String>();\\n        for (int i=0; i<patterns.length; i++) {\\n            if (map.containsKey(patterns[i])) {\\n                if (!map.get(patterns[i]).equals(strs[i])) {\\n                    return false;\\n                }\\n            } else if (map.containsValue(strs[i])) {\\n                return false;\\n            }\\n            map.put(patterns[i], strs[i]);\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"73533",
			"view":"952",
			"top":"8",
			"title":"Java Solution with a hashmap and a hashset",
			"vote":"7",
			"content":"    public class Solution {\\n        public boolean wordPattern(String pattern, String str) {\\n            String[] words = str.split(\" \");\\n            if (words.length != pattern.length()) {\\n      \\t\\t\\treturn false;\\n            }\\n            \\n            Map<Character, String> dict = new HashMap();\\n            Set<String> set = new HashSet();\\n            \\n            for (int i = 0; i < words.length; ++i) {\\n            \\tchar c = pattern.charAt(i);\\n            \\tif (!dict.containsKey(c)) {\\n            \\t    if (!set.add(words[i])) {\\n            \\t        return false;\\n            \\t    }\\n            \\t\\tdict.put(c, words[i]);\\n            \\t} else if (!dict.get(c).equals(words[i])) {\\n            \\t\\treturn false;\\n            \\t}\\n            }\\n            \\n            return true;\\n        }\\n\\n}"
		},
		{
			"lc_ans_id":"73591",
			"view":"1586",
			"top":"9",
			"title":"My Java Hashtable Solution",
			"vote":"7",
			"content":"    import java.util.Hashtable;\\n    public class Solution {\\n        public boolean wordPattern(String pattern, String str) {\\n            String[] arr = str.split(\" \");\\n            int len = pattern.length();\\n            if(arr.length != len){\\n                return false;\\n            }\\n            Hashtable<Character, String> table = new Hashtable<Character, String>();\\n            for( int i = 0; i < len; i++){\\n                char c = pattern.charAt(i);\\n                if( table.containsKey(c) && !table.get(c).equals(arr[i])){\\n                    return false;\\n                }\\n                else if( !table.containsKey(c) && table.contains(arr[i])){\\n                    return false;\\n                }\\n                else{\\n                    table.put(c, arr[i]);\\n                }\\n            }\\n            return true;\\n        }\\n    }"
		}
	],
	"id":"290",
	"title":"Word Pattern",
	"content":"<p>Given a <code>pattern</code> and a string <code>str</code>, find if <code>str</code> follows the same pattern.</p>\r\n<p> Here <b>follow</b> means a full match, such that there is a bijection between a letter in <code>pattern</code> and a <b>non-empty</b> word in <code>str</code>.</p>\r\n<p>\r\n<b>Examples:</b><br>\r\n<ol>\r\n<li>pattern = <code>\"abba\"</code>, str = <code>\"dog cat cat dog\"</code> should return true.</li>\r\n<li>pattern = <code>\"abba\"</code>, str = <code>\"dog cat cat fish\"</code> should return false.</li>\r\n<li>pattern = <code>\"aaaa\"</code>, str = <code>\"dog cat cat dog\"</code> should return false.</li>\r\n<li>pattern = <code>\"abba\"</code>, str = <code>\"dog dog dog dog\"</code> should return false.</li>\r\n</ol>\r\n</p>\r\n\r\n<p>\r\n<b>Notes:</b><br>\r\nYou may assume <code>pattern</code> contains only lowercase letters, and <code>str</code> contains lowercase letters separated by a single space.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/minglotus6\">@minglotus6</a> for adding this problem and creating all test cases.</p>",
	"frequency":"392",
	"ac_num":"95835"
}