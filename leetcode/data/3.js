{
	"difficulty":"2",
	"submit_num":"1721469",
	"show_id":"3",
	"leetcode_id":"3",
	"answers":[
		{
			"lc_ans_id":"1729",
			"view":"99252",
			"top":"0",
			"title":"11-line simple Java solution, O(n) with explanation",
			"vote":"407",
			"content":"the basic idea is, keep a hashmap which stores the characters in string as keys and their positions as values, and keep two pointers which define the max substring. move the right pointer to scan through the string , and meanwhile update the hashmap. If the character is already in the hashmap, then move the left pointer to the right of the same character last found. Note that the two pointers can only move forward. \\n\\n       public int lengthOfLongestSubstring(String s) {\\n            if (s.length()==0) return 0;\\n            HashMap<Character, Integer> map = new HashMap<Character, Integer>();\\n            int max=0;\\n            for (int i=0, j=0; i<s.length(); ++i){\\n                if (map.containsKey(s.charAt(i))){\\n                    j = Math.max(j,map.get(s.charAt(i))+1);\\n                }\\n                map.put(s.charAt(i),i);\\n                max = Math.max(max,i-j+1);\\n            }\\n            return max;\\n        }"
		},
		{
			"lc_ans_id":"1737",
			"view":"44953",
			"top":"1",
			"title":"C++ code in 9 lines.",
			"vote":"187",
			"content":"    int lengthOfLongestSubstring(string s) {\\n            vector<int> dict(256, -1);\\n            int maxLen = 0, start = -1;\\n            for (int i = 0; i != s.length(); i++) {\\n                if (dict[s[i]] > start)\\n                    start = dict[s[i]];\\n                dict[s[i]] = i;\\n                maxLen = max(maxLen, i - start);\\n            }\\n            return maxLen;\\n        }"
		},
		{
			"lc_ans_id":"1812",
			"view":"22487",
			"top":"2",
			"title":"Share my Java solution using HashSet",
			"vote":"131",
			"content":"The idea is use a hash set to track the longest substring without repeating characters so far, use a fast pointer j to see if character j is in the hash set or not, if not, great, add it to the hash set, move j forward and update the max length, otherwise, delete from the head by using a slow pointer i until we can put character j to the hash set.\\n\\n    public int lengthOfLongestSubstring(String s) {\\n        int i = 0, j = 0, max = 0;\\n        Set<Character> set = new HashSet<>();\\n        \\n        while (j < s.length()) {\\n            if (!set.contains(s.charAt(j))) {\\n                set.add(s.charAt(j++));\\n                max = Math.max(max, set.size());\\n            } else {\\n                set.remove(s.charAt(i++));\\n            }\\n        }\\n        \\n        return max;\\n    }"
		},
		{
			"lc_ans_id":"1730",
			"view":"34061",
			"top":"3",
			"title":"Shortest O(n) DP solution with explanations",
			"vote":"120",
			"content":"    /**\\n     * Solution (DP, O(n)):\\n     * \\n     * Assume L[i] = s[m...i], denotes the longest substring without repeating\\n     * characters that ends up at s[i], and we keep a hashmap for every\\n     * characters between m ... i, while storing <character, index> in the\\n     * hashmap.\\n     * We know that each character will appear only once.\\n     * Then to find s[i+1]:\\n     * 1) if s[i+1] does not appear in hashmap\\n     *    we can just add s[i+1] to hash map. and L[i+1] = s[m...i+1]\\n     * 2) if s[i+1] exists in hashmap, and the hashmap value (the index) is k\\n     *    let m = max(m, k), then L[i+1] = s[m...i+1], we also need to update\\n     *    entry in hashmap to mark the latest occurency of s[i+1].\\n     * \\n     * Since we scan the string for only once, and the 'm' will also move from\\n     * beginning to end for at most once. Overall complexity is O(n).\\n     *\\n     * If characters are all in ASCII, we could use array to mimic hashmap.\\n     */\\n\\n    int lengthOfLongestSubstring(string s) {\\n        // for ASCII char sequence, use this as a hashmap\\n        vector<int> charIndex(256, -1);\\n        int longest = 0, m = 0;\\n\\n        for (int i = 0; i < s.length(); i++) {\\n            m = max(charIndex[s[i]] + 1, m);    // automatically takes care of -1 case\\n            charIndex[s[i]] = i;\\n            longest = max(longest, i - m + 1);\\n        }\\n\\n        return longest;\\n    }\\n\\n\\nHope you like it :)"
		},
		{
			"lc_ans_id":"1731",
			"view":"28879",
			"top":"4",
			"title":"A Python solution - 85ms - O(n)",
			"vote":"80",
			"content":"    class Solution:\\n        # @return an integer\\n        def lengthOfLongestSubstring(self, s):\\n            start = maxLength = 0\\n            usedChar = {}\\n            \\n            for i in range(len(s)):\\n                if s[i] in usedChar and start <= usedChar[s[i]]:\\n                    start = usedChar[s[i]] + 1\\n                else:\\n                    maxLength = max(maxLength, i - start + 1)\\n    \\n                usedChar[s[i]] = i\\n    \\n            return maxLength"
		},
		{
			"lc_ans_id":"2294",
			"view":"12673",
			"top":"5",
			"title":"My O(n) Solution",
			"vote":"35",
			"content":"if only use DP, it's an O(n*n) solution, adding a map to get O(n).\\n    \\n    class Solution {\\n        public:\\n            int lengthOfLongestSubstring(string s) {\\n                if(s.size()<2) return s.size();\\n                int d=1, maxLen=1;\\n                unordered_map<char,int> map;\\n                map[s[0]]=0;\\n                for(int i=1;i<s.size();i++)\\n                {\\n                    if(map.count(s[i])==0 || map[s[i]]<i-d)\\n                        d++;\\n                    else\\n                        d= i- map[s[i]];\\n                    map[s[i]]=i;\\n                    if(d>maxLen)\\n                        maxLen = d;\\n                }\\n                return maxLen;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"1738",
			"view":"4830",
			"top":"6",
			"title":"4ms C code in 12 lines",
			"vote":"31",
			"content":"    int lengthOfLongestSubstring(char* s)\\n    {\\n    \\tint len=0;\\n        char *end=s,*temp;\\n    \\tchar* addressTable[128]={NULL};\\n    \\twhile(*end){\\n    \\t\\ttemp = addressTable[*end];\\n    \\t\\taddressTable[*end]=end;\\n    \\t\\tif(temp>=s){\\n    \\t\\tlen=end-s>len?end-s:len;\\n    \\t\\ts = temp+1;\\n    \\t\\t}end++;\\n    \\t}\\n    \\tlen=end-s>len?end-s:len;\\n    \\treturn len;\\n    }"
		},
		{
			"lc_ans_id":"1781",
			"view":"3300",
			"top":"7",
			"title":"Python solution with comments.",
			"vote":"27",
			"content":"        \\n    def lengthOfLongestSubstring(self, s):\\n        dic, res, start, = {}, 0, 0\\n        for i, ch in enumerate(s):\\n            if ch in dic:\\n                # update the res\\n                res = max(res, i-start)\\n                # here should be careful, like \"abba\"\\n                start = max(start, dic[ch]+1)\\n            dic[ch] = i\\n        # return should consider the last \\n        # non-repeated substring\\n        return max(res, len(s)-start)"
		},
		{
			"lc_ans_id":"1864",
			"view":"5798",
			"top":"8",
			"title":"O(n) time O(1) space solution using Kadane's algo in Java",
			"vote":"21",
			"content":"Idea is that, while we traverse form left to right if we see a character at position j is a duplicate of a character at a position i < j on the left then we know that we can't start the substring from i anymore. So, we need to start a new substring from i+1 position. While doing this we also need to update the length of current substring and start of current substring. Important part of this process is to make sure that we always keep the latest position of the characters we have seen so far. Below is a simple O(n) implementation of this logic.\\n\\n\\n    public class Solution {\\n        public int lengthOfLongestSubstring(String s) {\\n            int lastIndices[] = new int[256];\\n            for(int i = 0; i<256; i++){\\n                lastIndices[i] = -1;\\n            }\\n            \\n            int maxLen = 0;\\n            int curLen = 0;\\n            int start = 0;\\n            int bestStart = 0;\\n            for(int i = 0; i<s.length(); i++){\\n                char cur = s.charAt(i);\\n                if(lastIndices[cur]  < start){\\n                    lastIndices[cur] = i;\\n                    curLen++;\\n                }\\n                else{\\n                    int lastIndex = lastIndices[cur];\\n                    start = lastIndex+1;\\n                    curLen = i-start+1;\\n                    lastIndices[cur] = i;\\n                }\\n                \\n                if(curLen > maxLen){\\n                    maxLen = curLen;\\n                    bestStart = start;\\n                }\\n            }\\n            \\n            return maxLen;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"2291",
			"view":"1509",
			"top":"9",
			"title":"9 line JavaScript solution",
			"vote":"21",
			"content":"    function lengthOfLongestSubstring(s) {\\n        const map = {};\\n        var left = 0;\\n        \\n        return s.split('').reduce((max, v, i) => {\\n            left = map[v] >= left ? map[v] + 1 : left;\\n            map[v] = i;\\n            return Math.max(max, i - left + 1);\\n        }, 0);\\n    }"
		}
	],
	"id":"3",
	"title":"Longest Substring Without Repeating Characters",
	"content":"<p>Given a string, find the length of the <b>longest substring</b> without repeating characters.</p>\r\n\r\n<p><b>Examples:</b></p>\r\n\r\n<p>Given <code>\"abcabcbb\"</code>, the answer is <code>\"abc\"</code>, which the length is 3.</p>\r\n\r\n<p>Given <code>\"bbbbb\"</code>, the answer is <code>\"b\"</code>, with the length of 1.</p>\r\n\r\n<p>Given <code>\"pwwkew\"</code>, the answer is <code>\"wke\"</code>, with the length of 3. Note that the answer must be a <b>substring</b>, <code>\"pwke\"</code> is a <i>subsequence</i> and not a substring.</p>",
	"frequency":"614",
	"ac_num":"423312"
}