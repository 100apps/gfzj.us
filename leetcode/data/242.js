{
	"difficulty":"1",
	"submit_num":"410425",
	"show_id":"242",
	"leetcode_id":"242",
	"answers":[
		{
			"lc_ans_id":"66484",
			"view":"38183",
			"top":"0",
			"title":"Accepted Java O(n) solution in 5 lines",
			"vote":"145",
			"content":"The idea is simple. It creates a size 26 int arrays as buckets for each letter in alphabet. It increments the bucket value with String s and decrement with string t. So if they are anagrams, all buckets should remain with initial value which is zero. So just checking that and return\\n\\n    public class Solution {\\n        public boolean isAnagram(String s, String t) {\\n            int[] alphabet = new int[26];\\n            for (int i = 0; i < s.length(); i++) alphabet[s.charAt(i) - 'a']++;\\n            for (int i = 0; i < t.length(); i++) alphabet[t.charAt(i) - 'a']--;\\n            for (int i : alphabet) if (i != 0) return false;\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"66519",
			"view":"15535",
			"top":"1",
			"title":"2 C++ Solutions with Explanations",
			"vote":"62",
			"content":"----------\\n**Hash Table**\\n\\nThis idea uses a hash table to record the times of appearances of each letter in the two strings `s` and `t`. For each letter in `s`, it increases the counter by `1` while for each letter in `t`, it decreases the counter by `1`. Finally, all the counters will be `0` if they two are anagrams of each other.\\n\\nThe first implementation uses the built-in `unordered_map` and takes 36 ms.\\n\\n    class Solution {\\n    public:\\n        bool isAnagram(string s, string t) {\\n            if (s.length() != t.length()) return false;\\n            int n = s.length();\\n            unordered_map<char, int> counts;\\n            for (int i = 0; i < n; i++) {\\n                counts[s[i]]++;\\n                counts[t[i]]--;\\n            }\\n            for (auto count : counts)\\n                if (count.second) return false;\\n            return true;\\n        }\\n    };\\n\\nSince the problem statement says that \"the string contains only lowercase alphabets\", we can simply use an array to simulate the `unordered_map` and speed up the code. The following implementation takes 12 ms.\\n\\n    class Solution {\\n    public:\\n        bool isAnagram(string s, string t) {\\n            if (s.length() != t.length()) return false;\\n            int n = s.length();\\n            int counts[26] = {0};\\n            for (int i = 0; i < n; i++) { \\n                counts[s[i] - 'a']++;\\n                counts[t[i] - 'a']--;\\n            }\\n            for (int i = 0; i < 26; i++)\\n                if (counts[i]) return false;\\n            return true;\\n        }\\n    };\\n\\n----------\\n**Sorting**\\n\\nFor two anagrams, once they are sorted in a fixed order, they will become the same. This code is much shorter (this idea can be done in just 1 line using Python as [here][1]). However, it takes much longer time --- 76 ms in C++.\\n\\n    class Solution {\\n    public:\\n        bool isAnagram(string s, string t) { \\n            sort(s.begin(), s.end());\\n            sort(t.begin(), t.end());\\n            return s == t; \\n        }\\n    };\\n\\n  [1]: https://leetcode.com/discuss/49372/python-1-line-solution-88ms"
		},
		{
			"lc_ans_id":"66550",
			"view":"9266",
			"top":"2",
			"title":"Share my java solution",
			"vote":"35",
			"content":"        public class Solution {\\n        public boolean isAnagram(String s, String t) {\\n            if(s.length()!=t.length()){\\n                return false;\\n            }\\n            int[] count = new int[26];\\n            for(int i=0;i<s.length();i++){\\n                count[s.charAt(i)-'a']++;\\n                count[t.charAt(i)-'a']--;\\n            }\\n            for(int i:count){\\n                if(i!=0){\\n                    return false;\\n                }\\n            }\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"66499",
			"view":"9194",
			"top":"3",
			"title":"Python solutions (sort and dictionary).",
			"vote":"32",
			"content":"        \\n    def isAnagram1(self, s, t):\\n        dic1, dic2 = {}, {}\\n        for item in s:\\n            dic1[item] = dic1.get(item, 0) + 1\\n        for item in t:\\n            dic2[item] = dic2.get(item, 0) + 1\\n        return dic1 == dic2\\n        \\n    def isAnagram2(self, s, t):\\n        dic1, dic2 = [0]*26, [0]*26\\n        for item in s:\\n            dic1[ord(item)-ord('a')] += 1\\n        for item in t:\\n            dic2[ord(item)-ord('a')] += 1\\n        return dic1 == dic2\\n        \\n    def isAnagram3(self, s, t):\\n        return sorted(s) == sorted(t)"
		},
		{
			"lc_ans_id":"66789",
			"view":"8338",
			"top":"4",
			"title":"Simple fast java solution (beats 97%)",
			"vote":"24",
			"content":"    public boolean isAnagram(String s, String t) {\\n        \\n        int[] charsMap = new int['z'-'a'+1];\\n        \\n        for(char c: s.toCharArray()) {\\n            int pos = c - 'a';\\n            charsMap[pos]++;\\n        }\\n        \\n        for(char c: t.toCharArray()) {\\n            int pos = c - 'a';\\n            charsMap[pos]--;\\n        }\\n        \\n        for(int count: charsMap) {\\n            if(count != 0) {\\n                return false;\\n            }\\n        }\\n        \\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"66881",
			"view":"2642",
			"top":"5",
			"title":"Jave simple and efficient solution",
			"vote":"20",
			"content":"    public boolean isAnagram(String s, String t) {\\n            if(s == null || t == null || s.length() != t.length()) return false;\\n            int[] count = new int[26];\\n            int len = t.length();\\n            for(int i = 0; i < len; i++) {\\n                count[t.charAt(i) - 'a']++;\\n            }\\n            for(int i = 0; i < len; i++) {\\n                char c = s.charAt(i);\\n                if(count[c - 'a'] > 0) {\\n                    count[c - 'a']--;\\n                } else {\\n                    return false;\\n                }\\n            }\\n            return true;\\n        }"
		},
		{
			"lc_ans_id":"66509",
			"view":"1873",
			"top":"6",
			"title":"C array[26] simple solution",
			"vote":"19",
			"content":"use array[26] and update the array\\n\\n    bool isAnagram(char* s, char* t) {\\n        if(s==NULL && t==NULL) return true;\\n        if(strlen(s) != strlen(t)) return false;\\n        \\n        int a[26]={0};\\n        for(int i=0;i<strlen(s);i++){\\n            a[s[i]-'a']++;\\n            a[t[i]-'a']--;\\n        }\\n    \\n        for(int i=0;i<26;i++){\\n            if(a[i]<0) return false;\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"66761",
			"view":"3087",
			"top":"7",
			"title":"0ms C++solution,O(n)time",
			"vote":"19",
			"content":"      bool isAnagram(string s, string t) {\\n        int alp[26]={};\\n        for (int i = 0; i < s.length(); i++) \\n            alp[s.at(i) - 'a']++;\\n        for (int i = 0; i < t.length(); i++)\\n            alp[t.at(i) - 'a']--;\\n        for (int i=0;i<26;i++)\\n            if (alp[i] != 0) \\n                return false;\\n            return true;\\n       }"
		},
		{
			"lc_ans_id":"66651",
			"view":"2801",
			"top":"8",
			"title":"Java solution using sort",
			"vote":"17",
			"content":"    public class Solution {\\n    public boolean isAnagram(String s, String t) \\n    {\\n        char[] sChar = s.toCharArray();\\n        char[] tChar = t.toCharArray();\\n        \\n        Arrays.sort(sChar);\\n        Arrays.sort(tChar);\\n        \\n        return Arrays.equals(sChar, tChar);   \\n    }\\n}"
		},
		{
			"lc_ans_id":"66795",
			"view":"1364",
			"top":"9",
			"title":"9ms Java solution",
			"vote":"14",
			"content":"public class Solution {\\n    \\n    public boolean isAnagram(String s, String t) {\\n        \\n        if(s.length() != t.length()) {\\n            return false;\\n        }\\n        \\n        int[] count = new int[26];\\n\\n        for(int i = 0; i < s.length(); i++) {\\n            count[s.charAt(i) - 'a']++;\\n            count[t.charAt(i) - 'a']--;\\n        }\\n        \\n        for(int x : count) {\\n            if(x != 0) return false;\\n        }\\n        \\n        return true;\\n    }\\n}"
		}
	],
	"id":"242",
	"title":"Valid Anagram",
	"content":"<p>Given two strings <i>s</i> and <i>t</i>, write a function to determine if <i>t</i> is an anagram of <i>s</i>.</p> \r\n\r\n<p>For example,<br>\r\n<i>s</i> = \"anagram\", <i>t</i> = \"nagaram\", return true.<br>\r\n<i>s</i> = \"rat\", <i>t</i> = \"car\", return false.\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\nYou may assume the string contains only lowercase alphabets.</p>\r\n\r\n<p><b>Follow up:</b><br>\r\nWhat if the inputs contain unicode characters? How would you adapt your solution to such case?</p>",
	"frequency":"506",
	"ac_num":"193746"
}