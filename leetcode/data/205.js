{
	"difficulty":"1",
	"submit_num":"367120",
	"show_id":"205",
	"leetcode_id":"205",
	"answers":[
		{
			"lc_ans_id":"57796",
			"view":"39671",
			"top":"0",
			"title":"My 6 lines solution",
			"vote":"178",
			"content":"    class Solution {\\n    public:\\n        bool isIsomorphic(string s, string t) {\\n            int m1[256] = {0}, m2[256] = {0}, n = s.size();\\n            for (int i = 0; i < n; ++i) {\\n                if (m1[s[i]] != m2[t[i]]) return false;\\n                m1[s[i]] = i + 1;\\n                m2[t[i]] = i + 1;\\n            }\\n            return true;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"57810",
			"view":"20673",
			"top":"1",
			"title":"Short Java solution without maps",
			"vote":"76",
			"content":"Hi guys!\\n\\nThe main idea is to store the last seen positions of current (i-th) characters in both strings. If previously stored positions are different then we know that the fact they're occuring in the current i-th position simultaneously is a mistake. We could use a map for storing but as we deal with chars which are basically ints and can be used as indices we can do the whole thing with an array.\\n\\nCheck the code below. Happy coding! \\n\\n----------\\n\\n    public class Solution {\\n        public boolean isIsomorphic(String s1, String s2) {\\n            int[] m = new int[512];\\n            for (int i = 0; i < s1.length(); i++) {\\n                if (m[s1.charAt(i)] != m[s2.charAt(i)+256]) return false;\\n                m[s1.charAt(i)] = m[s2.charAt(i)+256] = i+1;\\n            }\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"57941",
			"view":"7325",
			"top":"2",
			"title":"Python different solutions (dictionary, etc).",
			"vote":"50",
			"content":"    def isIsomorphic1(self, s, t):\\n        d1, d2 = {}, {}\\n        for i, val in enumerate(s):\\n            d1[val] = d1.get(val, []) + [i]\\n        for i, val in enumerate(t):\\n            d2[val] = d2.get(val, []) + [i]\\n        return sorted(d1.values()) == sorted(d2.values())\\n            \\n    def isIsomorphic2(self, s, t):\\n        d1, d2 = [[] for _ in xrange(256)], [[] for _ in xrange(256)]\\n        for i, val in enumerate(s):\\n            d1[ord(val)].append(i)\\n        for i, val in enumerate(t):\\n            d2[ord(val)].append(i)\\n        return sorted(d1) == sorted(d2)\\n        \\n    def isIsomorphic3(self, s, t):\\n        return len(set(zip(s, t))) == len(set(s)) == len(set(t))\\n        \\n    def isIsomorphic4(self, s, t): \\n        return [s.find(i) for i in s] == [t.find(j) for j in t]\\n        \\n    def isIsomorphic5(self, s, t):\\n        return map(s.find, s) == map(t.find, t)\\n    \\n    def isIsomorphic(self, s, t):\\n        d1, d2 = [0 for _ in xrange(256)], [0 for _ in xrange(256)]\\n        for i in xrange(len(s)):\\n            if d1[ord(s[i])] != d2[ord(t[i])]:\\n                return False\\n            d1[ord(s[i])] = i+1\\n            d2[ord(t[i])] = i+1\\n        return True"
		},
		{
			"lc_ans_id":"57802",
			"view":"12726",
			"top":"3",
			"title":"Java solution using HashMap",
			"vote":"35",
			"content":"    public class Solution {\\n        public boolean isIsomorphic(String s, String t) {\\n            if(s == null || s.length() <= 1) return true;\\n            HashMap<Character, Character> map = new HashMap<Character, Character>();\\n            for(int i = 0 ; i< s.length(); i++){\\n                char a = s.charAt(i);\\n                char b = t.charAt(i);\\n                if(map.containsKey(a)){\\n                     if(map.get(a).equals(b))\\n                    continue;\\n                    else\\n                    return false;\\n                }else{\\n                    if(!map.containsValue(b))\\n                    map.put(a,b);\\n                    else return false;\\n                    \\n                }\\n            }\\n            return true;\\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"58066",
			"view":"6854",
			"top":"4",
			"title":"My C 0ms solution",
			"vote":"34",
			"content":"    bool isIsomorphic(char* s, char* t) {\\n    \\tchar charArrS[256] = { 0 };\\n    \\tchar charArrT[256] = { 0 };\\n    \\tint i = 0;\\n    \\twhile (s[i] !=0)\\n    \\t{\\n    \\t\\tif (charArrS[s[i]] == 0 && charArrT[t[i]] == 0)\\n    \\t\\t{\\n    \\t\\t\\tcharArrS[s[i]] = t[i];\\n    \\t\\t\\tcharArrT[t[i]] = s[i];\\n    \\t\\t}\\n    \\t\\telse\\n    \\t\\tif (charArrS[s[i]] != t[i] || charArrT[t[i]] != s[i])\\n    \\t\\t\\treturn false;\\n    \\t\\ti++;\\n    \\t}\\n    \\n    \\treturn true;\\n    }"
		},
		{
			"lc_ans_id":"57874",
			"view":"5625",
			"top":"5",
			"title":"Java solution with 1 line core code",
			"vote":"28",
			"content":"    public boolean isIsomorphic(String s1, String s2) {\\n            Map<Character, Integer> m1 = new HashMap<>();\\n            Map<Character, Integer> m2 = new HashMap<>();\\n        \\n            for(Integer i = 0; i < s1.length(); i++) {\\n    \\n                if(m1.put(s1.charAt(i), i) != m2.put(s2.charAt(i), i)) {\\n                    return false;\\n                }\\n            }\\n            return true;\\n        }"
		},
		{
			"lc_ans_id":"57963",
			"view":"4370",
			"top":"6",
			"title":"8ms C++ Solution without Hashmap",
			"vote":"28",
			"content":"    bool isIsomorphic(string s, string t) {\\n            char map_s[128] = { 0 };\\n            char map_t[128] = { 0 };\\n            int len = s.size();\\n            for (int i = 0; i < len; ++i)\\n            {\\n                if (map_s[s[i]]!=map_t[t[i]]) return false;\\n                map_s[s[i]] = i+1;\\n                map_t[t[i]] = i+1;\\n            }\\n            return true;    \\n        }"
		},
		{
			"lc_ans_id":"57838",
			"view":"2662",
			"top":"7",
			"title":"1 line in Python",
			"vote":"25",
			"content":"    def isIsomorphic(self, s, t):\\n            return len(set(zip(s, t))) == len(set(s)) and len(set(zip(t, s))) == len(set(t))"
		},
		{
			"lc_ans_id":"57807",
			"view":"3161",
			"top":"8",
			"title":"Java 3ms beats 99.25%",
			"vote":"24",
			"content":"Since all the test cases use ASCII characters, you can use small arrays as a lookup tables.\\n\\n    public class Solution {\\n        \\n        public boolean isIsomorphic(String sString, String tString) {\\n    \\n            char[] s = sString.toCharArray();\\n            char[] t = tString.toCharArray();\\n    \\n            int length = s.length;\\n            if(length != t.length) return false;\\n    \\n            char[] sm = new char[256];\\n            char[] tm = new char[256];\\n    \\n            for(int i=0; i<length; i++){\\n                char sc = s[i];\\n                char tc = t[i];\\n                if(sm[sc] == 0 && tm[tc] == 0){\\n                    sm[sc] = tc;\\n                    tm[tc] = sc;\\n                }else{\\n                    if(sm[sc] != tc || tm[tc] != sc){\\n                        return false;\\n                    }\\n                }\\n            }\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"57809",
			"view":"4755",
			"top":"9",
			"title":"5 lines simple Java",
			"vote":"14",
			"content":"    public boolean isIsomorphic(String s, String t) {\\n        Map m = new HashMap();\\n        for (Integer i=0; i<s.length(); ++i)\\n            if (m.put(s.charAt(i), i) != m.put(t.charAt(i)+\"\", i))\\n                return false;\\n        return true;\\n    }\\n\\nBased on my [earlier solution for another problem](https://leetcode.com/discuss/62374/8-lines-simple-java). There I was matching chars and strings, which allowed me to use the same map for both. Here I only have chars, so I turn the chars from `t` into strings."
		}
	],
	"id":"205",
	"title":"Isomorphic Strings",
	"content":"<p>Given two strings <b><i>s</i></b> and <b><i>t</i></b>, determine if they are isomorphic.</p>\r\n\r\n<p>Two strings are isomorphic if the characters in <b><i>s</i></b> can be replaced to get <b><i>t</i></b>.</p>\r\n\r\n<p>All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.</p>\r\n\r\n<p>For example,<br>\r\nGiven <code>\"egg\"</code>, <code>\"add\"</code>, return true.</p>\r\n\r\n<p>Given <code>\"foo\"</code>, <code>\"bar\"</code>, return false.</p>\r\n\r\n<p>Given <code>\"paper\"</code>, <code>\"title\"</code>, return true.</p>\r\n\r\n<p><b>Note:</b><br>\r\nYou may assume both <b><i>s</i></b> and <b><i>t</i></b> have the same length.</p>",
	"frequency":"433",
	"ac_num":"126607"
}