{
	"difficulty":"3",
	"submit_num":"85924",
	"show_id":"340",
	"leetcode_id":"340",
	"answers":[
		{
			"lc_ans_id":"80047",
			"view":"17608",
			"top":"0",
			"title":"15 lines java solution using slide window",
			"vote":"68",
			"content":"feel it is not a new question, just use num to track the number of distinct characters within the slide window\\n\\n    public class Solution {\\n        public int lengthOfLongestSubstringKDistinct(String s, int k) {\\n            int[] count = new int[256];\\n            int num = 0, i = 0, res = 0;\\n            for (int j = 0; j < s.length(); j++) {\\n                if (count[s.charAt(j)]++ == 0) num++;\\n                if (num > k) {\\n                    while (--count[s.charAt(i++)] > 0);\\n                    num--;\\n                }\\n                res = Math.max(res, j - i + 1);\\n            }\\n            return res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"80044",
			"view":"4700",
			"top":"1",
			"title":"Java O(nlogk) using TreeMap to keep last occurrence Interview \"follow-up\" question!",
			"vote":"25",
			"content":"Solving the problem with O(n) time is not enough, some interviewer may require this solution as a followup. Instead of recording each char's count, we keep track of char's last occurrence.  If you consider k as constant, it is also a O(n) algorithm.\\n\\ninWindow keeps track of each char in window and its last occurrence position\\n \\nlastOccurrence is used to find the char in window with left most last occurrence. A better idea is to use a PriorityQueue, as it takes O(1) to getMin,  However Java's PQ does not support O(logn) update a internal node, it takes O(n).  TreeMap takes O(logn) to do both getMin and update.\\nEvery time when the window is full of k distinct chars, we lookup TreeMap to find the one with leftmost last occurrence and set left bound j to be 1 + first to exclude the char to allow new char coming into window.\\n\\n       public class Solution {\\n            public int lengthOfLongestSubstringKDistinct(String str, int k) {\\n                if (str == null || str.isEmpty() || k == 0) {\\n                    return 0;\\n                }\\n                TreeMap<Integer, Character> lastOccurrence = new TreeMap<>();\\n                Map<Character, Integer> inWindow = new HashMap<>();\\n                int j = 0;\\n                int max = 1;\\n                for (int i = 0; i < str.length(); i++) {\\n                    char in = str.charAt(i);\\n                    while (inWindow.size() == k && !inWindow.containsKey(in)) {\\n                        int first = lastOccurrence.firstKey();\\n                        char out = lastOccurrence.get(first);\\n                        inWindow.remove(out);\\n                        lastOccurrence.remove(first);\\n                        j = first + 1;\\n                    }\\n                    //update or add in's position in both maps\\n                    if (inWindow.containsKey(in)) {\\n                        lastOccurrence.remove(inWindow.get(in));\\n                    }\\n                    inWindow.put(in, i);\\n                    lastOccurrence.put(i, in);\\n                    max = Math.max(max, i - j + 1);\\n                }\\n                return max;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"80052",
			"view":"4304",
			"top":"2",
			"title":"10-line Python Solution using dictionary with easy to understand explanation",
			"vote":"23",
			"content":"    class Solution(object):\\n        \\n        \"\"\"\\n        The general idea is to iterate over string s.\\n        Always put the character c and its location i in the dictionary d.\\n        1) If the sliding window contains less than or equal to k distinct characters, simply record the return value, and move on.\\n        2) Otherwise, we need to remove a character from the sliding window.\\n           Here's how to find the character to be removed:\\n           Because the values in d represents the rightmost location of each character in the sliding window, in order to find the longest substring T, we need to locate the smallest location, and remove it from the dictionary, and then record the return value.\\n        \"\"\"\\n        def lengthOfLongestSubstringKDistinct(self, s, k):\\n            \"\"\"\\n            :type s: str\\n            :type k: int\\n            :rtype: int\\n            \"\"\"\\n            # Use dictionary d to keep track of (character, location) pair,\\n            # where location is the rightmost location that the character appears at\\n            d = {}\\n            low, ret = 0, 0\\n            for i, c in enumerate(s):\\n                d[c] = i\\n                if len(d) > k:\\n                    low = min(d.values())\\n                    del d[s[low]]\\n                    low += 1\\n                ret = max(i - low + 1, ret)\\n            return ret"
		},
		{
			"lc_ans_id":"80060",
			"view":"4998",
			"top":"3",
			"title":"8 lines C++, O(n) 8ms",
			"vote":"15",
			"content":"**Solution 1** (array, 8ms)\\n\\n    int lengthOfLongestSubstringKDistinct(string s, int k) {\\n        int ctr[256] = {}, j = -1, distinct = 0, maxlen = 0;\\n        for (int i=0; i<s.size(); ++i) {\\n            distinct += ctr[s[i]]++ == 0;\\n            while (distinct > k)\\n                distinct -= --ctr[s[++j]] == 0;\\n            maxlen = max(maxlen, i - j);\\n        }\\n        return maxlen;\\n    }\\n\\n---\\n\\n**Solution 2** (unordered_map, 56ms)\\n\\n    int lengthOfLongestSubstringKDistinct1(string s, int k) {\\n        unordered_map<char, int> ctr;\\n        int j = -1, maxlen = 0;\\n        for (int i=0; i<s.size(); ++i) {\\n            ++ctr[s[i]];\\n            while (ctr.size() > k)\\n                if (--ctr[s[++j]] == 0)\\n                    ctr.erase(s[j]);\\n            maxlen = max(maxlen, i - j);\\n        }\\n        return maxlen;\\n    }"
		},
		{
			"lc_ans_id":"80055",
			"view":"2525",
			"top":"4",
			"title":"Generic solution in Java that can be used for Unicode",
			"vote":"7",
			"content":"This problem can be solved using two pointers.  The important part is `while (map.size() > k)`, we move left pointer to make sure the map size is less or equal to `k`.  This can be easily extended to any number of unique characters.\\n\\n\\n    public int lengthOfLongestSubstringKDistinct(String s, int k) {\\n        Map<Character, Integer> map = new HashMap<>();\\n        int left = 0;\\n        int best = 0;\\n        for(int i = 0; i < s.length(); i++) {\\n            // character at the right pointer\\n            char c = s.charAt(i);\\n            map.put(c, map.getOrDefault(c, 0) + 1);\\n            // make sure map size is valid, no need to check left pointer less than s.length()\\n            while (map.size() > k) {\\n                char leftChar = s.charAt(left);\\n                map.put(leftChar, map.get(leftChar) - 1);                     \\n                if (map.get(leftChar) == 0) { \\n                    map.remove(leftChar);\\n                }\\n                left++;\\n            }\\n            best = Math.max(best, i - left + 1);\\n        }\\n        return best;\\n    }"
		},
		{
			"lc_ans_id":"80140",
			"view":"1288",
			"top":"5",
			"title":"Same idea from Longest Substring Without Repeating Characters",
			"vote":"5",
			"content":"#da jia zhao gong zuo jia you!!!\\ntwo cases:\\n1. when there are less than k chars in the hash table we put the char in the hash table\\n\\n2. when there are exactly distinct k chars in the hash table and we need to add a new char, we delete the left most char\\n\\n\\n\\n\\n#\\n\\n    class Solution(object):\\n        def lengthOfLongestSubstringKDistinct(self, s, k):\\n            \"\"\"\\n            :type s: str\\n            :type k: int\\n            :rtype: int\\n            \"\"\"\\n            if k == 0:\\n                return 0\\n            start = 0\\n            char_hash = {}\\n            max_len = 0\\n            for char in s:\\n                if len(char_hash) < k:\\n                    if char not in char_hash:\\n                        char_hash[char] = 1\\n                    else:\\n                        char_hash[char] += 1\\n                elif len(char_hash) == k:\\n                    if char not in char_hash:\\n                        max_len = max(max_len, sum(char_hash.values()))\\n                        while len(char_hash) == k:\\n                            char_hash[s[start]] -= 1\\n                            if char_hash[s[start]] == 0:\\n                                del char_hash[s[start]]\\n                            start += 1\\n                        char_hash[char] = 1\\n                    else:\\n                        char_hash[char] += 1\\n            max_len = max(max_len, sum(char_hash.values()))\\n            return max_len"
		},
		{
			"lc_ans_id":"80108",
			"view":"548",
			"top":"6",
			"title":"C++ two concise solutions: hash + two pointers for short string, and hash for super long string",
			"vote":"4",
			"content":"(1) For a string of regular length, it could be fully loaded in memory, so we could access any char in string anytime, and we want to take advantage of that. Here's the O(n) solution:\\n```\\nint lengthOfLongestSubstringKDistinct(string s, int k) {        \\n        int l = 0, r = 0;\\n        unordered_map<char, int> freqs;\\n        \\n        for (int n = 0; r < s.length(); r++) {\\n            if (freqs[s[r]]++ == 0) { n++; }\\n            if (n > k && --freqs[s[l++]] == 0) { n--; }\\n        }\\n        \\n        return r - l;\\n}\\n```\\nAnother version of the same idea:\\n```\\nint lengthOfLongestSubstringKDistinct(string s, int k) {\\n        int ans = 0, l = 0, r = 0;\\n        unordered_map<char, int> freqs;\\n        \\n        for (; r < s.length(); r++) {\\n            freqs[s[r]]++;\\n            if (freqs.size() > k) {\\n                ans = max(ans, r - l);              // update ans\\n                \\n                while (freqs.size() > k) {          // move l until freqs only contains k distinct chars\\n                    if (--freqs[s[l++]] == 0) { freqs.erase(s[l - 1]); }\\n                }\\n            }\\n        }\\n        \\n        return max(ans, r - l);                     // don't miss the last one\\n}\\n```\\n\\n(1) In case of a super long string, memory may not be large enough to load the entire of it, so we'll treat it as a string stream. The downside of it is that we won't be able to access any char any time, and as a result the above solution won't work anymore. One workaround is to store each char's rightmost position, and everytime we want to drop one char from current substring, we can simply drop the char with smallest(leftmost) rightmost position. Also because we have a const=256 different chars, runtime is still O(n). If we want to go even further to deal with unlimited number of different chars, we can use a heap instead, and the runtime will become O(n * logk):\\n```\\nint lengthOfLongestSubstringKDistinct(string s, int k) {\\n        int ans = 0, l = 0, r = 0;\\n        unordered_map<char, int> pos;           // record the rightmost pos of each char\\n        \\n        istringstream iss(s);                   // treat string as a string stream\\n        for (char c; iss >> c; r++) {\\n            pos[c] = r;\\n            if (pos.size() > k) {\\n                ans = max(ans, r - l);          // update ans\\n                \\n                auto minIt = pos.begin();\\n                for (auto it = pos.begin(); it != pos.end(); it++) {\\n                    if (it->second < minIt->second) { minIt = it; }     // find the leftmost char\\n                }\\n                \\n                l = minIt->second + 1;          // move l to the new start position\\n                pos.erase(minIt);               // get rid of the leftmost char so that pos only contains k distinct chars\\n            }\\n        }\\n        \\n        return max(ans, r - l);                 // don't miss the last one\\n}\\n```"
		},
		{
			"lc_ans_id":"80068",
			"view":"316",
			"top":"7",
			"title":"Share my Java solution using slide window beating 98.03% inspired by @jiangbowei2010",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    public int lengthOfLongestSubstringKDistinct(String s, int k) {\\n        int[] count = new int[256];\\n        char[] cs = s.toCharArray();\\n        int distinctNum = 0, leftI = 0, res = 0;\\n        for (int rightI = 0; rightI < cs.length; rightI++) {\\n            if (count[cs[rightI]]++ == 0) distinctNum++;\\n            if (distinctNum > k) {\\n                while (--count[cs[leftI++]] > 0);\\n                distinctNum--;\\n            }\\n            res = Math.max(res, rightI - leftI + 1);\\n        }\\n        return res;\\n    }\\n}\\n```\\n\\nSubmission link: [https://leetcode.com/submissions/detail/97037506/](https://leetcode.com/submissions/detail/97037506/)\\nbeating **98.03%**\\n![0_1491001787639_Screen Shot 2017-03-31 at 5.08.59 PM.png](/uploads/files/1491001788128-screen-shot-2017-03-31-at-5.08.59-pm.png)\\n\\nInspired by [https://discuss.leetcode.com/topic/41671/15-lines-java-solution-using-slide-window](https://discuss.leetcode.com/topic/41671/15-lines-java-solution-using-slide-window)\\nI made two improvements:\\n1. Used char[] array for indexing a character instead of doing that in a substring. For instance, used\\n```\\ncs[rightI]\\n```\\ninstead of \\n```\\ns.charAt(rightI)\\n```\\n2. Renamed variable to made the code easier to understand\\nThe variables below are the same meaning:\\nnum, distinctNum: number of distinct characters inside the slide window\\ni, leftI: left index of the slide window\\nj, rightI: right index of the slide window\\n```\\nnum, i, j\\n```\\n```\\ndistinctNum, leftI, rightI\\n```\\n```\\npublic class Solution {\\n    public int lengthOfLongestSubstringKDistinct(String s, int k) {\\n        int[] count = new int[256];\\n        int distinctNum = 0, leftI = 0, res = 0;\\n        for (int rightI = 0; rightI < s.length(); rightI++) {\\n            if (count[s.charAt(rightI)]++ == 0) distinctNum++;\\n            if (distinctNum > k) {\\n                while (--count[s.charAt(leftI++)] > 0);\\n                distinctNum--;\\n            }\\n            res = Math.max(res, rightI - leftI + 1);\\n        }\\n        return res;\\n    }\\n}\\n```\\nsubmission link: \\n[https://leetcode.com/submissions/detail/97037987/](https://discuss.leetcode.com/topic/41671/15-lines-java-solution-using-slide-window)\\nbeating 80.86%\\nauthor: @jiangbowei2010"
		},
		{
			"lc_ans_id":"80082",
			"view":"152",
			"top":"8",
			"title":"Solution to the follow up",
			"vote":"2",
			"content":"The basic approach is using sliding window. But then I realized that there is no need to record the times character occurs in the String.  Since when the number of unique characters reaches the boundary, what we what to do is increase the `left index` to remove character until the number of unique characters reduce by 1. So we can directly store the final position the character occurs in the previous string and every time we remove the character with the `smallest final position`. Also we are scanning from small index to large index, the character with the smallest final position is the character we least recently encountered. This is similar to the idea of LRU Cache. Therefore, we can use `LinkedHashMap` to record the character. This solution will then solve the follow up like input string are streamed and still solve in O(n) time.\\n\\n```java\\npublic int lengthOfLongestSubstringKDistinct(String s, int k) {\\n        if(s==null || s.length()==0 || k<=0) return 0;\\n        int len=s.length();\\n        int i=0, j=0;\\n        int maxLen=0;\\n        LinkedHashMap<Character,Integer> map=new LinkedHashMap<Character,Integer>();\\n        for(char x:s.toCharArray()){\\n            if(map.containsKey(x)){\\n                map.remove(x);\\n                map.put(x,j);\\n            }else{\\n                if(map.size()==k){\\n                    maxLen=Math.max(maxLen,j-i);\\n                    char toRemove=map.keySet().iterator().next();\\n                    i=map.get(toRemove)+1;\\n                    map.remove(toRemove);\\n                }\\n                map.put(x,j);\\n            }\\n            j++;\\n        }\\n        maxLen=Math.max(maxLen,j-i);\\n        return maxLen;\\n    }\\n```"
		},
		{
			"lc_ans_id":"80117",
			"view":"588",
			"top":"9",
			"title":"Sliding Window Solution (Java)",
			"vote":"2",
			"content":"\\n    public int lengthOfLongestSubstringKDistinct(String s, int k) {\\n        if(null == s || k <=0 )\\n            return 0;\\n\\n        int len = s.length();\\n        if(len <= 1)\\n            return len;\\n\\n        int h=0, l=0, max =0;\\n        HashMap<Character, Integer> map = new HashMap<>();\\n\\n        while(h < len){\\n            if(map.size() <= k){\\n                map.put(s.charAt(h), h);\\n            }\\n\\n            if(map.size() > k){\\n                int leftmost = Integer.MAX_VALUE;\\n                for(int n : map.values()){\\n                    leftmost = Math.min(leftmost, n);\\n                }\\n                \\n                l = leftmost + 1;\\n                map.remove(s.charAt(leftmost));\\n            }\\n            \\n            max = Math.max(max, h - l + 1);\\n            h++;\\n        }\\n        \\n        return max;        \\n    }"
		}
	],
	"id":"340",
	"title":"Longest Substring with At Most K Distinct Characters",
	"content":"<p>\nGiven a string, find the length of the longest substring T that contains at most <i>k</i> distinct characters.\n</p>\n\n<p>\nFor example,\n\nGiven s = <code>“eceba”</code> and k = 2,\n</p>\n\n<p>\nT is \"ece\" which its length is 3.\n</p>",
	"frequency":"318",
	"ac_num":"33713"
}