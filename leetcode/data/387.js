{
	"difficulty":"1",
	"submit_num":"207701",
	"show_id":"387",
	"leetcode_id":"387",
	"answers":[
		{
			"lc_ans_id":"86348",
			"view":"41932",
			"top":"0",
			"title":"Java 7 lines solution 29ms",
			"vote":"96",
			"content":"Hey guys. My solution is pretty straightforward. It takes O(n) and goes through the string twice:\\n1) Get the frequency of each character.\\n2) Get the first character that has a frequency of one.\\n\\nActually the code below passes all the cases. However, according to @xietao0221, we could change the size of the frequency array to 256 to store other kinds of characters. Thanks for all the other comments and suggestions. Fight on!\\n```\\npublic class Solution {\\n    public int firstUniqChar(String s) {\\n        int freq [] = new int[26];\\n        for(int i = 0; i < s.length(); i ++)\\n            freq [s.charAt(i) - 'a'] ++;\\n        for(int i = 0; i < s.length(); i ++)\\n            if(freq [s.charAt(i) - 'a'] == 1)\\n                return i;\\n        return -1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"86351",
			"view":"6718",
			"top":"1",
			"title":"Python 3 lines beats 100% (~ 60ms) !",
			"vote":"15",
			"content":"```   \\n    def firstUniqChar(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: int\\n        \"\"\"\\n        \\n        letters='abcdefghijklmnopqrstuvwxyz'\\n        index=[s.index(l) for l in letters if s.count(l) == 1]\\n        return min(index) if len(index) > 0 else -1\\n```"
		},
		{
			"lc_ans_id":"86340",
			"view":"12264",
			"top":"2",
			"title":"Java two pointers (slow and fast) solution (18 ms)",
			"vote":"12",
			"content":"The idea is to use a slow pointer to point to the current unique character and a fast pointer to scan the string. The fast pointer not only just add the count of the character. Meanwhile, when fast pointer finds the identical character of the character at the current slow pointer, we move the slow pointer to the next unique character or **not visited** character. (20 ms)\\n\\n```\\npublic class Solution {\\n    public int firstUniqChar(String s) {\\n        if (s==null || s.length()==0) return -1;\\n        int len = s.length();\\n        if (len==1) return 0;\\n        char[] cc = s.toCharArray();\\n        int slow =0, fast=1;\\n        int[] count = new int[256];\\n        count[cc[slow]]++;\\n        while (fast < len) {\\n            count[cc[fast]]++;\\n            // if slow pointer is not a unique character anymore, move to the next unique one\\n            while (slow < len && count[cc[slow]] > 1) slow++;  \\n            if (slow >= len) return -1; // no unique character exist\\n            if (count[cc[slow]]==0) { // not yet visited by the fast pointer\\n                count[cc[slow]]++; \\n                fast=slow; // reset the fast pointer\\n            }\\n            fast++;\\n        }\\n        return slow;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"86338",
			"view":"11807",
			"top":"3",
			"title":"C++ 2 solutions",
			"vote":"12",
			"content":"Brute force solution, traverse string s 2 times. First time, store counts of every character into the hash table, second time, find the first character that appears only once.\\n```\\nclass Solution {\\npublic:\\n    int firstUniqChar(string s) {\\n        unordered_map<char, int> m;\\n        for (auto &c : s) {\\n            m[c]++;\\n        }\\n        for (int i = 0; i < s.size(); i++) {\\n            if (m[s[i]] == 1) return i;\\n        }\\n        return -1;\\n    }\\n};\\n```\\nif the string is extremely long, we wouldn't want to traverse it twice, so instead only storing just counts of a char, we also store the index, and then traverse the hash table.\\n\\n```\\nclass Solution {\\npublic:\\n    int firstUniqChar(string s) {\\n        unordered_map<char, pair<int, int>> m;\\n        int idx = s.size();\\n        for (int i = 0; i < s.size(); i++) {\\n            m[s[i]].first++;\\n            m[s[i]].second = i;\\n        }\\n        for (auto &p : m) {\\n            if (p.second.first == 1) idx = min(idx, p.second.second);\\n        }\\n        return idx == s.size() ? -1 : idx;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"86385",
			"view":"7234",
			"top":"4",
			"title":"1-liners in Python, 76ms",
			"vote":"10",
			"content":"```\\nclass Solution(object):\\n    def firstUniqChar(self, s):\\n        return min([s.find(c) for c in string.ascii_lowercase if s.count(c)==1] or [-1])\\n```\\nIt gave me 76ms.\\n\\nOr\\n```\\nclass Solution(object):\\n    def firstUniqChar(self, s):\\n        return min([s.find(c) for c,v in collections.Counter(s).iteritems() if v==1] or [-1])\\n```\\nwhich is slower."
		},
		{
			"lc_ans_id":"86511",
			"view":"2260",
			"top":"5",
			"title":"Java One Pass Solution with LinkedHashMap",
			"vote":"9",
			"content":"LinkedHashMap will not be the fastest answer for this question because the input characters are just from 'a' to 'z', but in other situations it might be faster than two pass solutions. I post this just for inspiration.\\n```\\npublic int firstUniqChar(String s) {\\n        Map<Character, Integer> map = new LinkedHashMap<>();\\n        Set<Character> set = new HashSet<>();\\n        for (int i = 0; i < s.length(); i++) {\\n            if (set.contains(s.charAt(i))) {\\n                if (map.get(s.charAt(i)) != null) {\\n                    map.remove(s.charAt(i));\\n                }\\n            } else {\\n                map.put(s.charAt(i), i);\\n                set.add(s.charAt(i));\\n            }\\n        }\\n        return map.size() == 0 ? -1 : map.entrySet().iterator().next().getValue();\\n    }\\n```"
		},
		{
			"lc_ans_id":"86356",
			"view":"833",
			"top":"6",
			"title":"JavaScript solution",
			"vote":"9",
			"content":" \\n    var firstUniqChar = function(s) {\\n       for(i=0;i<s.length;i++){\\n           if (s.indexOf(s[i])===s.lastIndexOf(s[i])){\\n              return i;\\n          } \\n       }\\n       return -1;\\n    };\\n\\nOR hash map method\\n\\n     var firstUniqChar = function(s) \\n        var map=new Map();\\n        for(i=0;i<s.length;i++){\\n             if(map.has(s[i])){\\n                 map.set(s[i],2);\\n             }\\n             else{\\n                 map.set(s[i],1);\\n             }\\n         }\\n    \\n        for(i=0;i<s.length;i++){\\n            if(map.has(s[i]) && map.get(s[i])===1){\\n                return i;\\n            }\\n        }\\n        return -1;\\n     } ;"
		},
		{
			"lc_ans_id":"86359",
			"view":"7370",
			"top":"7",
			"title":"my 4 lines Java solution",
			"vote":"8",
			"content":"```\\npublic static int firstUniqChar(String s) {\\n        \\n\\t\\tchar[] a = s.toCharArray();\\n\\t\\t\\n\\t\\tfor(int i=0; i<a.length;i++){\\n\\t\\t\\tif(s.indexOf(a[i])==s.lastIndexOf(a[i])){return i;}\\n\\t\\t}\\n\\t\\treturn -1;\\n    }"
		},
		{
			"lc_ans_id":"86379",
			"view":"828",
			"top":"8",
			"title":"Python Dictionary, collections.Counter and count 3 ways",
			"vote":"5",
			"content":"```\\nclass Solution(object):\\n    def firstUniqChar(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: int\\n        \"\"\"\\n\\n        for i in range(len(s)):\\n            c = s[i]\\n            if s.count(c)==1:\\n                return i\\n\\n        return -1\\n\\n    def firstUniqChar2(self, s):\\n\\n        from collections import Counter\\n        sc = Counter(s)\\n        for i in range(len(s)):\\n            c = s[i]\\n            if sc.get(c,0)==1:\\n                return i\\n\\n        return -1\\n\\n    def firstUniqChar3(self, s):\\n\\n        d = {}\\n        for c in s:\\n            if c in d.keys():\\n                d[c] += 1\\n            else:\\n                d[c] = 1\\n\\n        for i in range(len(s)):\\n            c = s[i]\\n            if d[c]==1:\\n                return i\\n\\n        return -1 \\n```"
		},
		{
			"lc_ans_id":"86471",
			"view":"762",
			"top":"9",
			"title":"my C++ 6 lines Solution",
			"vote":"5",
			"content":"```\\nclass Solution {\\npublic:\\n    int firstUniqChar(string s) {\\n        int list[256] = {0};\\n        for(auto i: s)\\n            list[i] ++;\\n        for(int i=0; i<s.length();i++)\\n            if(list[s[i]]==1) return i;\\n        return -1;\\n    }\\n};\\n```"
		}
	],
	"id":"387",
	"title":"First Unique Character in a String",
	"content":"<p>\r\nGiven a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.\r\n</p>\r\n<p><b>Examples:</b>\r\n<pre>\r\ns = \"leetcode\"\r\nreturn 0.\r\n\r\ns = \"loveleetcode\",\r\nreturn 2.\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b> You may assume the string contain only lowercase letters.\r\n</p>",
	"frequency":"482",
	"ac_num":"98218"
}