{
	"difficulty":"2",
	"submit_num":"103571",
	"show_id":"392",
	"leetcode_id":"392",
	"answers":[
		{
			"lc_ans_id":"87254",
			"view":"16895",
			"top":"0",
			"title":"Straight forward Java simple solution",
			"vote":"55",
			"content":"Just use two pointers:\\n```\\npublic class Solution {\\n    public boolean isSubsequence(String s, String t) {\\n        if (s.length() == 0) return true;\\n        int indexS = 0, indexT = 0;\\n        while (indexT < t.length()) {\\n            if (t.charAt(indexT) == s.charAt(indexS)) {\\n                indexS++;\\n                if (indexS == s.length()) return true;\\n            }\\n            indexT++;\\n        }\\n        return false;\\n    }\\n}"
		},
		{
			"lc_ans_id":"87272",
			"view":"11626",
			"top":"1",
			"title":"3 lines C",
			"vote":"53",
			"content":"```\\nbool isSubsequence(char* s, char* t) {\\n    while (*t)\\n        s += *s == *t++;\\n    return !*s;\\n}\\n```\\nJust go through t and \"cross off\" the matching characters in s. Then return whether there's nothing left in s.\\n\\nSometimes, C makes things easier... here it's helpful that C strings are null terminated and that I can easily pop off a string's first character in constant time just by incrementing the pointer."
		},
		{
			"lc_ans_id":"87302",
			"view":"10360",
			"top":"2",
			"title":"Binary search solution for follow-up with detailed comments",
			"vote":"46",
			"content":"Re: [Java binary search using TreeSet got TLE](/topic/57994/java-binary-search-using-treeset-got-tle) \\n\\nI think the Map and TreeSet could be simplified by Array and binarySearch. Since we scan T from beginning to the end (index itself is in increasing order), List will be sufficient. Then we can use binarySearch to replace with TreeSet ability which is a little overkill for this problem. Here is my solution.\\n\\n```java\\n    // Follow-up: O(N) time for pre-processing, O(Mlog?) for each S.\\n    // Eg-1. s=\"abc\", t=\"bahbgdca\"\\n    // idx=[a={1,7}, b={0,3}, c={6}]\\n    //  i=0 ('a'): prev=1\\n    //  i=1 ('b'): prev=3\\n    //  i=2 ('c'): prev=6 (return true)\\n    // Eg-2. s=\"abc\", t=\"bahgdcb\"\\n    // idx=[a={1}, b={0,6}, c={5}]\\n    //  i=0 ('a'): prev=1\\n    //  i=1 ('b'): prev=6\\n    //  i=2 ('c'): prev=? (return false)\\n    public boolean isSubsequence(String s, String t) {\\n        List<Integer>[] idx = new List[256]; // Just for clarity\\n        for (int i = 0; i < t.length(); i++) {\\n            if (idx[t.charAt(i)] == null)\\n                idx[t.charAt(i)] = new ArrayList<>();\\n            idx[t.charAt(i)].add(i);\\n        }\\n        \\n        int prev = 0;\\n        for (int i = 0; i < s.length(); i++) {\\n            if (idx[s.charAt(i)] == null) return false; // Note: char of S does NOT exist in T causing NPE\\n            int j = Collections.binarySearch(idx[s.charAt(i)], prev);\\n            if (j < 0) j = -j - 1;\\n            if (j == idx[s.charAt(i)].size()) return false;\\n            prev = idx[s.charAt(i)].get(j) + 1;\\n        }\\n        return true;\\n    }\\n```"
		},
		{
			"lc_ans_id":"87258",
			"view":"5780",
			"top":"3",
			"title":"2 lines Python",
			"vote":"28",
			"content":"    def isSubsequence(self, s, t):\\n        t = iter(t)\\n        return all(c in t for c in s)\\n\\nJust testing whether all characters in s are also in t (in order).\\n\\nBased on falsetru's code on StackOverflow which I improved a while ago, [see here](http://stackoverflow.com/a/24017747)."
		},
		{
			"lc_ans_id":"87264",
			"view":"7523",
			"top":"4",
			"title":"Easy to understand binary search solution",
			"vote":"26",
			"content":"```\\nfrom collections import defaultdict\\nfrom bisect import bisect_left\\nclass Solution(object):\\n    \\n    def createMap(self, s):\\n        # create a map. key is char. value is index of apperance in acending order. \\n        posMap = defaultdict(list)\\n        for i, char in enumerate(s):\\n            posMap[char].append(i)\\n        return posMap\\n        \\n    \\n    def isSubsequence(self, s, t):\\n        \"\"\"\\n        :type s: str\\n        :type t: str\\n        :rtype: bool\\n        \"\"\"\\n        posMap = self.createMap(t)\\n        # lowBound is the minimum index the current char has to be at.\\n        lowBound = 0\\n        for char in s:\\n            if char not in posMap: return False\\n            charIndexList = posMap[char]\\n            # try to find an index that is larger than or equal to lowBound\\n            i = bisect_left(charIndexList, lowBound)\\n            if i == len(charIndexList): return False\\n            lowBound = charIndexList[i] + 1\\n        return True\\n```"
		},
		{
			"lc_ans_id":"87268",
			"view":"1841",
			"top":"5",
			"title":"Java code for the follow-up question",
			"vote":"22",
			"content":"    /**\\n     * Follow-up\\n     * If we check each sk in this way, then it would be O(kn) time where k is the number of s and t is the length of t. \\n     * This is inefficient. \\n     * Since there is a lot of s, it would be reasonable to preprocess t to generate something that is easy to search for if a character of s is in t. \\n     * Sounds like a HashMap, which is super suitable for search for existing stuff. \\n     */\\n    public boolean isSubsequence(String s, String t) {\\n        if (s == null || t == null) return false;\\n        \\n        Map<Character, List<Integer>> map = new HashMap<>(); //<character, index>\\n        \\n        //preprocess t\\n        for (int i = 0; i < t.length(); i++) {\\n            char curr = t.charAt(i);\\n            if (!map.containsKey(curr)) {\\n                map.put(curr, new ArrayList<Integer>());\\n            }\\n            map.get(curr).add(i);\\n        }\\n        \\n        int prev = -1;  //index of previous character\\n        for (int i = 0; i < s.length(); i++) {\\n            char c = s.charAt(i);\\n            \\n            if (map.get(c) == null)  {\\n                return false;\\n            } else {\\n                List<Integer> list = map.get(c);\\n                prev = binarySearch(prev, list, 0, list.size() - 1);\\n                if (prev == -1) {\\n                    return false;\\n                }\\n                prev++;\\n            }\\n        }\\n        \\n        return true;\\n    }\\n    \\n    private int binarySearch(int index, List<Integer> list, int start, int end) {\\n        while (start <= end) {\\n            int mid = start + (end - start) / 2;\\n            if (list.get(mid) < index) {\\n                start = mid + 1;\\n            } else {\\n                end = mid - 1;\\n            }\\n        }\\n        \\n        return start == list.size() ? -1 : list.get(start);\\n    }"
		},
		{
			"lc_ans_id":"87297",
			"view":"6012",
			"top":"6",
			"title":"Java. Only 2ms. Much faster than normal 2 pointers.",
			"vote":"19",
			"content":"Actually another way of 2 pointers, guess indexOf() performs better.\\n\\nTested with other 2-pointers methods in discussion, both took 30ms+.\\n\\nThe one below only takes 2ms.\\n\\n```Java\\npublic class Solution \\n{\\n    public boolean isSubsequence(String s, String t) \\n    {\\n        if(t.length() < s.length()) return false;\\n        int prev = 0;\\n        for(int i = 0; i < s.length();i++)\\n        {\\n            char tempChar = s.charAt(i);\\n            prev = t.indexOf(tempChar,prev);\\n            if(prev == -1) return false;\\n            prev++;\\n        }\\n        \\n        return true;\\n    }\\n}\\n```\\n\\nThanks to @Ankai.Liang who looked into both functions and provided us the answer.\\n\\nIn case you guys do not notice, I post Liang Ankai's answer.\\n\\n\\n@Ankai.Liang said \\n> Hi, good solution.\\n> I checked the origin code of func \"indexOf\" and \"charAt\". These two solution both traversed the char of String one by one to search the first occurrence specific char.\\n> The difference is that indexOf only call once function then traversed in \"String.value[]\" arr, but we used multiple calling function \"charAt\" to get the value in \"String.value[]\" arr.\\n> The time expense of calling function made the difference."
		},
		{
			"lc_ans_id":"87402",
			"view":"1477",
			"top":"7",
			"title":"C++ 4 lines simple solution",
			"vote":"12",
			"content":"Iterate t, advance index of s when we found a matched char in t.\\nStop the loop whenever it reaches the end of t or we found all characters  in s.\\nAfter the loop, return true if index of s is equal to its length. Otherwise, return false.\\n    \\n    bool isSubsequence(string s, string t) {\\n        int sLen = s.length(), sIdx = 0, tLen = t.length();\\n        for (int i=0; i<tLen && sIdx<sLen; i++) \\n            if (t[i]==s[sIdx]) sIdx++;\\n        return sIdx==sLen;\\n    }"
		},
		{
			"lc_ans_id":"87421",
			"view":"1132",
			"top":"8",
			"title":"Python simple solution",
			"vote":"9",
			"content":"```\\nclass Solution(object):\\n    def isSubsequence(self, s, t):\\n        \"\"\"\\n        :type s: str\\n        :type t: str\\n        :rtype: bool\\n        \"\"\"\\n        if len(s) == 0:\\n            return True\\n        if len(t) == 0:\\n            return False \\n        i, j = 0, 0\\n        while i < len(s) and j < len(t):\\n            if s[i] == t[j]:\\n                i += 1\\n            j += 1\\n        return True if i == len(s) else False\\n```"
		},
		{
			"lc_ans_id":"87408",
			"view":"1153",
			"top":"9",
			"title":"Binary search solution to cope with input with many Ss(with explanation)",
			"vote":"8",
			"content":"```\\nclass Solution {\\npublic:\\n    bool isSubsequence(string s, string t) {\\n        //build a record the index of each char in t\\n        vector<vector<int>> record(26);\\n        //add indexs\\n        for(int i = 0; i < t.size(); i++) {\\n            record[t[i]-'a'].push_back(i);\\n        }\\n        //check if each char in s is in the legal place\\n        int index = -1;\\n        for(int i = 0; i < s.size(); i++) {\\n            auto iter = upper_bound(record[s[i]-'a'].begin(), record[s[i]-'a'].end(), index);\\n            if(iter == record[s[i]-'a'].end()) return false;\\n            index = *iter;\\n        }\\n        return true;\\n    }\\n};"
		}
	],
	"id":"392",
	"title":"Is Subsequence",
	"content":"<p>\r\nGiven a string <b>s</b> and a string <b>t</b>, check if <b>s</b> is subsequence of <b>t</b>.\r\n</p>\r\n\r\n<p>\r\nYou may assume that there is only lower case English letters in both <b>s</b> and <b>t</b>. <b>t</b> is potentially a very long (length ~= 500,000) string, and <b>s</b> is a short string (<=100).\r\n</p>\r\n\r\n<p>\r\nA subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, <code>\"ace\"</code> is a subsequence of <code>\"abcde\"</code> while <code>\"aec\"</code> is not).\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<b>s</b> = <code>\"abc\"</code>, <b>t</b> = <code>\"ahbgdc\"</code>\r\n</p>\r\n<p>\r\nReturn <code>true</code>.\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<b>s</b> = <code>\"axc\"</code>, <b>t</b> = <code>\"ahbgdc\"</code>\r\n</p>\r\n<p>\r\nReturn <code>false</code>.\r\n</p>\r\n\r\n<p><b>Follow up:</b><br />\r\nIf there are lots of incoming S, say S1, S2, ... , Sk where k >= 1B, and you want to check one by one to see if T has its subsequence. In this scenario, how would you change your code?</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/pbrother/\">@pbrother</a> for adding this problem and creating all test cases.</p>",
	"frequency":"232",
	"ac_num":"46292"
}