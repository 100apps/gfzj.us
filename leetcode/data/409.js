{
	"difficulty":"1",
	"submit_num":"125499",
	"show_id":"409",
	"leetcode_id":"409",
	"answers":[
		{
			"lc_ans_id":"89604",
			"view":"22125",
			"top":"0",
			"title":"Simple HashSet solution Java",
			"vote":"83",
			"content":"```\\npublic int longestPalindrome(String s) {\\n        if(s==null || s.length()==0) return 0;\\n        HashSet<Character> hs = new HashSet<Character>();\\n        int count = 0;\\n        for(int i=0; i<s.length(); i++){\\n            if(hs.contains(s.charAt(i))){\\n                hs.remove(s.charAt(i));\\n                count++;\\n            }else{\\n                hs.add(s.charAt(i));\\n            }\\n        }\\n        if(!hs.isEmpty()) return count*2+1;\\n        return count*2;\\n}\\n```"
		},
		{
			"lc_ans_id":"89587",
			"view":"10759",
			"top":"1",
			"title":"What are the odds? (Python & C++)",
			"vote":"42",
			"content":"I count how many letters appear an odd number of times. Because we can use **all** letters, except for each odd-count letter we must leave one, except one of them we can use.\\n\\nPython:\\n\\n    def longestPalindrome(self, s):\\n        odds = sum(v & 1 for v in collections.Counter(s).values())\\n        return len(s) - odds + bool(odds)\\n\\nC++:\\n\\n    int longestPalindrome(string s) {\\n        int odds = 0;\\n        for (char c='A'; c<='z'; c++)\\n            odds += count(s.begin(), s.end(), c) & 1;\\n        return s.size() - odds + (odds > 0);\\n    }\\n\\nSimilar solutions (I actually like the `use` solutions better than the above, but I'm just so fond of my topic title :-)\\n\\n    def longestPalindrome(self, s):\\n        use = sum(v & ~1 for v in collections.Counter(s).values())\\n        return use + (use < len(s))\\n\\n    def longestPalindrome(self, s):\\n        counts = collections.Counter(s).values()\\n        return sum(v & ~1 for v in counts) + any(v & 1 for v in counts)\\n\\n    int longestPalindrome(string s) {\\n        int use = 0;\\n        for (char c='A'; c<='z'; c++)\\n            use += count(s.begin(), s.end(), c) & ~1;\\n        return use + (use < s.size());\\n    }\\n\\n    int longestPalindrome(string s) {\\n        vector<int> count(256);\\n        for (char c : s)\\n            ++count[c];\\n        int odds = 0;\\n        for (int c : count)\\n            odds += c & 1;\\n        return s.size() - odds + (odds > 0);\\n    }\\n\\n    int longestPalindrome(string s) {\\n        vector<int> count(256);\\n        int odds = 0;\\n        for (char c : s)\\n            odds += ++count[c] & 1 ? 1 : -1;\\n        return s.size() - odds + (odds > 0);\\n    }"
		},
		{
			"lc_ans_id":"89606",
			"view":"6958",
			"top":"2",
			"title":"JAVA Solution. Simple and Clear, Using int[26]",
			"vote":"16",
			"content":"\\n    public int longestPalindrome(String s) {\\n        int[] lowercase = new int[26];\\n        int[] uppercase = new int[26];\\n        int res = 0;\\n        for (int i = 0; i < s.length(); i++){\\n            char temp = s.charAt(i);\\n            if (temp >= 97) lowercase[temp-'a']++;\\n            else uppercase[temp-'A']++;\\n        }\\n        for (int i = 0; i < 26; i++){\\n            res+=(lowercase[i]/2)*2;\\n            res+=(uppercase[i]/2)*2;\\n        }\\n        return res == s.length() ? res : res+1;\\n            \\n    }"
		},
		{
			"lc_ans_id":"89610",
			"view":"3106",
			"top":"3",
			"title":"Simple Java Solution in One Pass",
			"vote":"11",
			"content":"Count duplicates in the pass, then check if we have an extra character to fix in the middle.\\n```\\npublic int longestPalindrome(String s) {\\n        boolean[] map = new boolean[128];\\n        int len = 0;\\n        for (char c : s.toCharArray()) {\\n            map[c] = !map[c];         // flip on each occurrence, false when seen n*2 times\\n            if (!map[c]) len+=2;\\n        }\\n        if (len < s.length()) len++; // if more than len, atleast one single is present\\n        return len;\\n    }\\n```"
		},
		{
			"lc_ans_id":"89627",
			"view":"4753",
			"top":"4",
			"title":"Easy to understand accepted solution with explanation",
			"vote":"8",
			"content":"First, characters are counted. Even occurring characters (v[i]%2 == 0) can always be used to build a palindrome. For every odd occurring character (v[i]%2 == 1), v[i]-1 characters can be used. Res is incremented if there is at least one character with odd occurrence number.\\n```\\n    int longestPalindrome(string s) {\\n        vector<int> v(256,0);\\n        for(int i = 0; i < s.size(); ++i)\\n           ++v[s[i]];\\n        int res = 0;\\n        bool odd = false;\\n        for(int i = 0; i < 256; ++i)\\n           if(v[i]%2 == 0)\\n               res += v[i];\\n            else\\n            {\\n               res += v[i] - 1;\\n               odd = true;\\n            }\\n        if(odd)\\n          ++res;\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"89721",
			"view":"860",
			"top":"5",
			"title":"PYTHON - 35ms 99th percentile O(n) solution",
			"vote":"6",
			"content":"\\n\\nclass Solution(object):\\n\\n    def longestPalindrome(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: int\\n        \"\"\"\\n        ctmap = {}\\n        for c in s:\\n            if c not in ctmap:\\n                ctmap[c] = 1\\n            else:\\n                ctmap[c] += 1\\n\\n        ret = 0\\n        singleCharFound = 0\\n        for key in ctmap:\\n            if ctmap[key] % 2 == 0:\\n                ret += ctmap[key]\\n            else:\\n                ret += ctmap[key] - 1\\n                singleCharFound = 1\\n        \\n        return ret + singleCharFound"
		},
		{
			"lc_ans_id":"89686",
			"view":"3806",
			"top":"6",
			"title":"5 lines C++",
			"vote":"6",
			"content":"```\\nclass Solution {\\npublic:\\n    int longestPalindrome(string s) {\\n        vector<int> m(256, 0);        \\n        for (auto& c : s) m[c-'\\\\0']++;\\n        int result = 0;\\n        for (auto& i : m) result += i%2 ? (result%2 ? i-1 : i) : i;\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"89641",
			"view":"204",
			"top":"7",
			"title":"very simple Java solution use boolean[]",
			"vote":"4",
			"content":"    public int longestPalindrome(String s) {\\n        boolean[] set = new boolean[256];\\n        int count = 0;\\n        for (int i = 0; i < s.length(); i++) {\\n            count += set[s.charAt(i)]?2:0;\\n            set[s.charAt(i)] = !set[s.charAt(i)];\\n        }\\n        if (count < s.length()) count++;\\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"89614",
			"view":"113",
			"top":"8",
			"title":"python simple set solution",
			"vote":"3",
			"content":"```\\nclass Solution(object):\\n    def longestPalindrome(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: int\\n        \"\"\"\\n        hash = set()\\n        for c in s:\\n            if c not in hash:\\n                hash.add(c)\\n            else:\\n                hash.remove(c)\\n        # len(hash) is the number of the single letters\\n        return len(s) - len(hash) + 1 if len(hash) > 0 else len(s)\\n```"
		},
		{
			"lc_ans_id":"89619",
			"view":"179",
			"top":"9",
			"title":"Simple Java beat 99.67%",
			"vote":"3",
			"content":"```\\npublic int longestPalindrome(String s) {\\n        int[] chars = new int[128];\\n        char[] t = s.toCharArray();\\n        for(char c:t){\\n            chars[c]++;\\n        }\\n        int single = 0;\\n        for(int n:chars){\\n            if(n%2!=0){\\n                single++;\\n            }\\n        }\\n        return single>1?t.length-single+1:t.length;\\n    }\\n```"
		}
	],
	"id":"409",
	"title":"Longest Palindrome",
	"content":"<p>Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those letters.</p>\r\n\r\n<p>This is case sensitive, for example <code>\"Aa\"</code> is not considered a palindrome here.</p>\r\n\r\n<p><b>Note:</b><br />\r\nAssume the length of given string will not exceed 1,010.\r\n</p>\r\n\r\n<p><b>Example: </b>\r\n<pre>\r\nInput:\r\n\"abccccdd\"\r\n\r\nOutput:\r\n7\r\n\r\nExplanation:\r\nOne longest palindrome that can be built is \"dccaccd\", whose length is 7.\r\n</pre>\r\n</p>",
	"frequency":"203",
	"ac_num":"57432"
}