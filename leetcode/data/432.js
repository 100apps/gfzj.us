{
	"difficulty":"1",
	"submit_num":"159237",
	"show_id":"438",
	"leetcode_id":"438",
	"answers":[
		{
			"lc_ans_id":"92007",
			"view":"26602",
			"top":"0",
			"title":"Sliding Window algorithm template to solve all the Leetcode substring search problem.",
			"vote":"155",
			"content":"**Among all leetcode questions, I find that there are at least 5 substring search problem which could be solved by the sliding window algorithm.** \\nso I sum up the algorithm template here. wish it will help you!\\n\\n1) ***the template***:\\n```\\npublic class Solution {\\n    public List<Integer> slidingWindowTemplateByHarryChaoyangHe(String s, String t) {\\n        //init a collection or int value to save the result according the question.\\n        List<Integer> result = new LinkedList<>();\\n        if(t.length()> s.length()) return result;\\n        \\n        //create a hashmap to save the Characters of the target substring.\\n        //(K, V) = (Character, Frequence of the Characters)\\n        Map<Character, Integer> map = new HashMap<>();\\n        for(char c : t.toCharArray()){\\n            map.put(c, map.getOrDefault(c, 0) + 1);\\n        }\\n        //maintain a counter to check whether match the target string.\\n        int counter = map.size();//must be the map size, NOT the string size because the char may be duplicate.\\n        \\n        //Two Pointers: begin - left pointer of the window; end - right pointer of the window\\n        int begin = 0, end = 0;\\n        \\n        //the length of the substring which match the target string.\\n        int len = Integer.MAX_VALUE; \\n        \\n        //loop at the begining of the source string\\n        while(end < s.length()){\\n            \\n            char c = s.charAt(end);//get a character\\n            \\n            if( map.containsKey(c) ){\\n                map.put(c, map.get(c)-1);// plus or minus one\\n                if(map.get(c) == 0) counter--;//modify the counter according the requirement(different condition).\\n            }\\n            end++;\\n            \\n            //increase begin pointer to make it invalid/valid again\\n            while(counter == 0 /* counter condition. different question may have different condition */){\\n                \\n                char tempc = s.charAt(begin);//***be careful here: choose the char at begin pointer, NOT the end pointer\\n                if(map.containsKey(tempc)){\\n                    map.put(tempc, map.get(tempc) + 1);//plus or minus one\\n                    if(map.get(tempc) > 0) counter++;//modify the counter according the requirement(different condition).\\n                }\\n                \\n                /* save / update(min/max) the result if find a target*/\\n                // result collections or result int value\\n                \\n                begin++;\\n            }\\n        }\\n        return result;\\n    }\\n}\\n````\\n\\n1) Firstly, here is my sliding solution this question. I will sum up the template below this code.\\n\\n\\n**2) the similar questions are:**\\n\\nhttps://leetcode.com/problems/minimum-window-substring/\\nhttps://leetcode.com/problems/longest-substring-without-repeating-characters/\\u2028https://leetcode.com/problems/substring-with-concatenation-of-all-words/\\nhttps://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/\\nhttps://leetcode.com/problems/find-all-anagrams-in-a-string/\\n\\n**3) I will give my solution for these questions use the above template one by one** \\n\\n**Minimum-window-substring**\\nhttps://leetcode.com/problems/minimum-window-substring/\\n```\\npublic class Solution {\\n    public String minWindow(String s, String t) {\\n        if(t.length()> s.length()) return \"\";\\n        Map<Character, Integer> map = new HashMap<>();\\n        for(char c : t.toCharArray()){\\n            map.put(c, map.getOrDefault(c,0) + 1);\\n        }\\n        int counter = map.size();\\n        \\n        int begin = 0, end = 0;\\n        int head = 0;\\n        int len = Integer.MAX_VALUE;\\n        \\n        while(end < s.length()){\\n            char c = s.charAt(end);\\n            if( map.containsKey(c) ){\\n                map.put(c, map.get(c)-1);\\n                if(map.get(c) == 0) counter--;\\n            }\\n            end++;\\n            \\n            while(counter == 0){\\n                char tempc = s.charAt(begin);\\n                if(map.containsKey(tempc)){\\n                    map.put(tempc, map.get(tempc) + 1);\\n                    if(map.get(tempc) > 0){\\n                        counter++;\\n                    }\\n                }\\n                if(end-begin < len){\\n                    len = end - begin;\\n                    head = begin;\\n                }\\n                begin++;\\n            }\\n            \\n        }\\n        if(len == Integer.MAX_VALUE) return \"\";\\n        return s.substring(head, head+len);\\n    }\\n}\\n````\\nyou may find that I only change a little code above to solve the question \"Find All Anagrams in a String\":\\nchange \\n```\\n                if(end-begin < len){\\n                    len = end - begin;\\n                    head = begin;\\n                }\\n````\\nto\\n```\\n                if(end-begin == t.length()){\\n                    result.add(begin);\\n                }\\n````\\n\\n**longest substring without repeating characters**\\nhttps://leetcode.com/problems/longest-substring-without-repeating-characters/\\u2028\\n```\\npublic class Solution {\\n    public int lengthOfLongestSubstring(String s) {\\n        Map<Character, Integer> map = new HashMap<>();\\n        int begin = 0, end = 0, counter = 0, d = 0;\\n\\n        while (end < s.length()) {\\n            // > 0 means repeating character\\n            //if(map[s.charAt(end++)]-- > 0) counter++;\\n            char c = s.charAt(end);\\n            map.put(c, map.getOrDefault(c, 0) + 1);\\n            if(map.get(c) > 1) counter++;\\n            end++;\\n            \\n            while (counter > 0) {\\n                //if (map[s.charAt(begin++)]-- > 1) counter--;\\n                char charTemp = s.charAt(begin);\\n                if (map.get(charTemp) > 1) counter--;\\n                map.put(charTemp, map.get(charTemp)-1);\\n                begin++;\\n            }\\n            d = Math.max(d, end - begin);\\n        }\\n        return d;\\n    }\\n}\\n````\\n**Longest Substring with At Most Two Distinct Characters**\\nhttps://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/\\n```\\npublic class Solution {\\n    public int lengthOfLongestSubstringTwoDistinct(String s) {\\n        Map<Character,Integer> map = new HashMap<>();\\n        int start = 0, end = 0, counter = 0, len = 0;\\n        while(end < s.length()){\\n            char c = s.charAt(end);\\n            map.put(c, map.getOrDefault(c, 0) + 1);\\n            if(map.get(c) == 1) counter++;//new char\\n            end++;\\n            while(counter > 2){\\n                char cTemp = s.charAt(start);\\n                map.put(cTemp, map.get(cTemp) - 1);\\n                if(map.get(cTemp) == 0){\\n                    counter--;\\n                }\\n                start++;\\n            }\\n            len = Math.max(len, end-start);\\n        }\\n        return len;\\n    }\\n}\\n````\\n\\n**Substring with Concatenation of All Words**\\nhttps://leetcode.com/problems/substring-with-concatenation-of-all-words/\\n```\\npublic class Solution {\\n    public List<Integer> findSubstring(String S, String[] L) {\\n        List<Integer> res = new LinkedList<>();\\n        if (L.length == 0 || S.length() < L.length * L[0].length())   return res;\\n        int N = S.length();\\n        int M = L.length; // *** length\\n        int wl = L[0].length();\\n        Map<String, Integer> map = new HashMap<>(), curMap = new HashMap<>();\\n        for (String s : L) {\\n            if (map.containsKey(s))   map.put(s, map.get(s) + 1);\\n            else                      map.put(s, 1);\\n        }\\n        String str = null, tmp = null;\\n        for (int i = 0; i < wl; i++) {\\n            int count = 0;  // remark: reset count \\n            int start = i;\\n            for (int r = i; r + wl <= N; r += wl) {\\n                str = S.substring(r, r + wl);\\n                if (map.containsKey(str)) {\\n                    if (curMap.containsKey(str))   curMap.put(str, curMap.get(str) + 1);\\n                    else                           curMap.put(str, 1);\\n                    \\n                    if (curMap.get(str) <= map.get(str))    count++;\\n                    while (curMap.get(str) > map.get(str)) {\\n                        tmp = S.substring(start, start + wl);\\n                        curMap.put(tmp, curMap.get(tmp) - 1);\\n                        start += wl;\\n                        \\n                        //the same as https://leetcode.com/problems/longest-substring-without-repeating-characters/\\n                        if (curMap.get(tmp) < map.get(tmp)) count--;\\n                        \\n                    }\\n                    if (count == M) {\\n                        res.add(start);\\n                        tmp = S.substring(start, start + wl);\\n                        curMap.put(tmp, curMap.get(tmp) - 1);\\n                        start += wl;\\n                        count--;\\n                    }\\n                }else {\\n                    curMap.clear();\\n                    count = 0;\\n                    start = r + wl;//not contain, so move the start\\n                }\\n            }\\n            curMap.clear();\\n        }\\n        return res;\\n    }\\n}\\n````\\n\\n**Find All Anagrams in a String**\\nhttps://leetcode.com/problems/find-all-anagrams-in-a-string/\\n```\\npublic class Solution {\\n    public List<Integer> findAnagrams(String s, String t) {\\n        List<Integer> result = new LinkedList<>();\\n        if(t.length()> s.length()) return result;\\n        Map<Character, Integer> map = new HashMap<>();\\n        for(char c : t.toCharArray()){\\n            map.put(c, map.getOrDefault(c, 0) + 1);\\n        }\\n        int counter = map.size();\\n        \\n        int begin = 0, end = 0;\\n        int head = 0;\\n        int len = Integer.MAX_VALUE;\\n        \\n        \\n        while(end < s.length()){\\n            char c = s.charAt(end);\\n            if( map.containsKey(c) ){\\n                map.put(c, map.get(c)-1);\\n                if(map.get(c) == 0) counter--;\\n            }\\n            end++;\\n            \\n            while(counter == 0){\\n                char tempc = s.charAt(begin);\\n                if(map.containsKey(tempc)){\\n                    map.put(tempc, map.get(tempc) + 1);\\n                    if(map.get(tempc) > 0){\\n                        counter++;\\n                    }\\n                }\\n                if(end-begin == t.length()){\\n                    result.add(begin);\\n                }\\n                begin++;\\n            }\\n            \\n        }\\n        return result;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"92015",
			"view":"50580",
			"top":"1",
			"title":"Shortest/Concise JAVA O(n) Sliding Window Solution",
			"vote":"117",
			"content":"Same idea from a fantastic sliding window template, please refer:\\nhttps://discuss.leetcode.com/topic/30941/here-is-a-10-line-template-that-can-solve-most-substring-problems \\n\\nTime Complexity will be O(n) because the \"start\" and \"end\" points will only move from left to right once.\\n\\n    public List<Integer> findAnagrams(String s, String p) {\\n        List<Integer> list = new ArrayList<>();\\n        if (s == null || s.length() == 0 || p == null || p.length() == 0) return list;\\n        int[] hash = new int[256]; //character hash\\n        //record each character in p to hash\\n        for (char c : p.toCharArray()) {\\n            hash[c]++;\\n        }\\n        //two points, initialize count to p's length\\n        int left = 0, right = 0, count = p.length();\\n        while (right < s.length()) {\\n            //move right everytime, if the character exists in p's hash, decrease the count\\n            //current hash value >= 1 means the character is existing in p\\n            if (hash[s.charAt(right++)]-- >= 1) count--; \\n            \\n            //when the count is down to 0, means we found the right anagram\\n            //then add window's left to result list\\n            if (count == 0) list.add(left);\\n        \\n            //if we find the window's size equals to p, then we have to move left (narrow the window) to find the new match window\\n            //++ to reset the hash because we kicked out the left\\n            //only increase the count if the character is in p\\n            //the count >= 0 indicate it was original in the hash, cuz it won't go below 0\\n            if (right - left == p.length() && hash[s.charAt(left++)]++ >= 0) count++;\\n        }\\n        return list;\\n    }"
		},
		{
			"lc_ans_id":"92068",
			"view":"14776",
			"top":"2",
			"title":"17ms Java sliding window",
			"vote":"19",
			"content":"\\n    public List<Integer> findAnagrams(String s, String p) {\\n        int[] chars = new int[26];\\n        List<Integer> result = new ArrayList<>();\\n    \\n        if (s == null || p == null || s.length() < p.length())\\n            return result;\\n        for (char c : p.toCharArray())\\n            chars[c-'a']++;\\n    \\n        int start = 0, end = 0, count = p.length();\\n        // Go over the string\\n        while (end < s.length()) {\\n            // If the char at start appeared in p, we increase count\\n            if (end - start == p.length() && chars[s.charAt(start++)-'a']++ >= 0)\\n                count++;\\n            // If the char at end appeared in p (since it's not -1 after decreasing), we decrease count\\n            if (--chars[s.charAt(end++)-'a'] >= 0)\\n                count--;\\n            if (count == 0)\\n                result.add(start);\\n\\t    }\\n\\t    \\n\\t    return result;\\n\\t}"
		},
		{
			"lc_ans_id":"92027",
			"view":"11572",
			"top":"3",
			"title":"C++ O(n) sliding window concise solution with explanation",
			"vote":"18",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<int> findAnagrams(string s, string p) {\\n        vector<int> pv(26,0), sv(26,0), res;\\n        if(s.size() < p.size())\\n           return res;\\n        // fill pv, vector of counters for pattern string and sv, vector of counters for the sliding window\\n        for(int i = 0; i < p.size(); ++i)\\n        {\\n            ++pv[p[i]-'a'];\\n            ++sv[s[i]-'a'];\\n        }\\n        if(pv == sv)\\n           res.push_back(0);\\n\\n        //here window is moving from left to right across the string. \\n        //window size is p.size(), so s.size()-p.size() moves are made \\n        for(int i = p.size(); i < s.size(); ++i) \\n        {\\n             // window extends one step to the right. counter for s[i] is incremented \\n            ++sv[s[i]-'a'];\\n            \\n            // since we added one element to the right, \\n            // one element to the left should be forgotten. \\n            //counter for s[i-p.size()] is decremented\\n            --sv[s[i-p.size()]-'a']; \\n\\n            // if after move to the right the anagram can be composed, \\n            // add new position of window's left point to the result \\n            if(pv == sv)  \\n               res.push_back(i-p.size()+1);\\n        }\\n        return res;\\n    }\\n};\\n```\\n256 character version:\\n```\\nclass Solution {\\npublic:\\n    vector<int> findAnagrams(string s, string p) {\\n        vector<int> pv(256,0), sv(256,0), res;\\n        if(s.size() < p.size())\\n           return res;\\n        for(int i = 0; i < p.size(); ++i)\\n        {\\n            ++pv[p[i]];\\n            ++sv[s[i]];\\n        }\\n        if(pv == sv)\\n           res.push_back(0);\\n        for(int i = p.size(); i < s.size(); ++i)\\n        {\\n            ++sv[s[i]];\\n            --sv[s[i-p.size()]];\\n            if(pv == sv)\\n               res.push_back(i-p.size()+1);\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"92032",
			"view":"7031",
			"top":"4",
			"title":"Java using isAnagram() helper function, easy to understand",
			"vote":"14",
			"content":"```\\npublic class Solution {\\n    public List<Integer> findAnagrams(String s, String p) {\\n        List<Integer> res = new ArrayList<>();\\n        if (p == null || s == null || s.length() < p.length()) return res;\\n        int m = s.length(), n = p.length();\\n        for (int i = 0; i < m-n+1; i++) {\\n            String cur = s.substring(i, i+n);\\n            if (helper(cur, p)) res.add(i);\\n        }\\n        return res;\\n    }\\n    public boolean helper(String a, String b) {\\n        if (a == null || b == null || a.length() != b.length()) return false;\\n        int[] dict = new int[26];\\n        for (int i = 0; i < a.length(); i++) {\\n            char ch = a.charAt(i);\\n            dict[ch-'a']++;\\n        }\\n        for (int i = 0; i < b.length(); i++) {\\n            char ch = b.charAt(i);\\n            dict[ch-'a']--;\\n            if (dict[ch-'a'] < 0) return false;\\n        }\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"92009",
			"view":"7858",
			"top":"5",
			"title":"Python Sliding Window Solution using Counter",
			"vote":"13",
			"content":"Maintain a window of len(p) in s, and slide to right until finish. Time complexity is O(len(s)).\\n```\\n    from collections import Counter\\n\\n    def findAnagrams(self, s, p):\\n        \"\"\"\\n        :type s: str\\n        :type p: str\\n        :rtype: List[int]\\n        \"\"\"\\n        res = []\\n        pCounter = Counter(p)\\n        sCounter = Counter(s[:len(p)-1])\\n        for i in range(len(p)-1,len(s)):\\n            sCounter[s[i]] += 1   # include a new char in the window\\n            if sCounter == pCounter:    # This step is O(1), since there are at most 26 English letters \\n                res.append(i-len(p)+1)   # append the starting index\\n            sCounter[s[i-len(p)+1]] -= 1   # decrease the count of oldest char in the window\\n            if sCounter[s[i-len(p)+1]] == 0:\\n                del sCounter[s[i-len(p)+1]]   # remove the count if it is 0\\n        return res\\n```"
		},
		{
			"lc_ans_id":"92059",
			"view":"809",
			"top":"6",
			"title":"O(n) Sliding Window JAVA Solution, Extremely Detailed Explanation",
			"vote":"8",
			"content":"I saw a lot of explanations of this including this link\\n\\nhttps://discuss.leetcode.com/topic/30941/here-is-a-10-line-template-that-can-solve-most-substring-problems\\n\\nand couldn't understand any of it until staring at it for an hour or so, to help solidify it I wrote my own version with extensive comments for each line. Now I think I finally get how the sliding window works.\\n\\n```\\npublic class Solution {\\n    public List<Integer> findAnagrams(String s, String p) {\\n       ///We will use sliding window template\\n       \\n       ArrayList<Integer> soln = new ArrayList<Integer>();\\n       \\n       //Check for bad input\\n       if (s.length() == 0 || p.length() == 0 || s.length() < p.length()){\\n           return new ArrayList<Integer>();\\n       }\\n       \\n       //Set up character hash\\n       //Keep track of how many times each character appears\\n       int[] chars = new int[26];\\n       for (Character c : p.toCharArray()){\\n           //Increment to setup hash of all characters currently in the window\\n           //Later on, these get DECREMENTED when a character is found\\n           //A positive count later on means that the character is still \"needed\" in the anagram\\n           //A negative count means that either the character was found more times than necessary\\n           //Or that it isn't needed at all\\n           chars[c-'a']++;\\n       }\\n       \\n       //Start = start poniter, end = end pointer,\\n       //len = length of anagram to find\\n       //diff = length of currently found anagram. If it equals\\n       //the length of anagram to find, it must have been found\\n       int start = 0, end = 0, len = p.length(), diff = len;\\n       \\n       char temp;\\n       //Before we begin this, the \"window\" has a length of 0, start and\\n       //end pointers both at 0\\n       for (end = 0; end < len; end++){\\n           //Process current char\\n           temp = s.charAt(end);\\n           \\n           //As discussed earlier, decrement it\\n           chars[temp-'a']--;\\n           \\n           //If it's still >= 0, the anagram still \"needed\" it so we count it towards the anagram by\\n           //decrementing diff\\n           if (chars[temp-'a'] >= 0){\\n               diff--;\\n           }\\n       }\\n       \\n       //This would mean that s began with an anagram of p\\n       if (diff == 0){\\n           soln.add(0);\\n       }\\n       \\n       //At this point, start remains at 0, end has moved so that the window is the length of the anagram\\n       //from this point on we are going to be moving start AND end on each iteration, to shift the window\\n       //along the string\\n       while (end < s.length()){\\n           \\n           //Temp represents the current first character of the window. The character that is\\n           //going to be \"left behind\" as the window moves. \\n           temp = s.charAt(start);\\n           \\n           //If it's not negative, this means that the character WAS part of the anagram. That means we\\n           //are one step \"farther away\" from completing an anagram. So we must increment diff.\\n           if (chars[temp-'a'] >= 0){\\n               diff++;\\n           }\\n           \\n           //Increment the hash value for this character, because it is no longer contained in the window\\n           chars[temp-'a']++;\\n           \\n           //Increment start to start shifting the window over by 1\\n           start++;\\n           \\n           //Temp represents the last character of the window, the \"new\" character from the window shift.\\n           //This character \"replaces\" the one we removed before so the window stays the same length (p.length())\\n           temp = s.charAt(end);\\n           \\n           //Decrement hash value for this character, because it is now a part of the window\\n           chars[temp-'a']--;\\n           \\n           //Again, if it's not negative it is part of the anagram. So decrement diff\\n           if (chars[temp-'a'] >= 0){\\n               diff--;\\n           }\\n           \\n           //If diff has reached zero, that means for the last p.length() iterations, diff was decremented and\\n           //NOT decremented, which means every one of those characters was in the anagram, so it must be an anagram\\n           \\n           //Note: If many windows in a row find anagrams, then each iteration will have diff incremented then decremented again\\n           if (diff == 0){\\n               soln.add(start);\\n           }\\n           \\n           //Increment for next iteration\\n           end++;\\n           \\n       }\\n       \\n       return soln;\\n       \\n       \\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"92123",
			"view":"2767",
			"top":"7",
			"title":"Simplest AC java sliding window solution with comments",
			"vote":"7",
			"content":"```\\n    private List<Integer> findAnagrams(String s, String p) {\\n        List<Integer> res = new ArrayList<>();\\n        int[] win = new int[256];\\n        int[] pFixWin = new int[256];\\n\\n        if (s.length() == 0 || p.length() == 0 || p.length() > s.length()) {\\n            return res;\\n        }\\n\\n        /// pre - load the pWin\\n        for (int i = 0; i < p.length(); i++) {\\n            pFixWin[p.charAt(i)]++;\\n        }\\n\\n        // pre-load the moving  window\\n        for (int i = 0; i < p.length(); i++) {\\n            win[s.charAt(i)]++;\\n        }\\n\\n        for (int i = 0; i < s.length(); i++) {\\n            // for each position check if the numbers of each letter\\n            // coincide in the window and the fixed window\\n            if (isPContainedInS(pFixWin, win)) {\\n                res.add(i);\\n            }\\n\\n            // evict from the window the char we just passed in S\\n            // add from the S window the next character\\n            if ((i + p.length()) < s.length()) {\\n                win[s.charAt(i)]--;\\n                win[s.charAt(i + p.length())]++;\\n            } else {\\n                break;\\n            }\\n\\n        }\\n        return res;\\n\\n    }\\n\\n    private boolean isPContainedInS(int[] pFixWin, int[] win) {\\n        for (int i = 0; i < pFixWin.length; i++) {\\n            if (pFixWin[i] != win[i]) {\\n                return false;\\n            }\\n        }\\n        return true;\\n    }\\n```"
		},
		{
			"lc_ans_id":"92016",
			"view":"3558",
			"top":"8",
			"title":"Python O(n) Time, O(1) Space",
			"vote":"7",
			"content":"Hash the number of times each character appears in p. Iterate over s with a sliding window and maintain a similar hash. If these two hashes are ever the same, add that to the result.\\n\\nEach of the hashes have a finite (a-z, A-Z) number of possible characters, so the space used is O(1)\\n\\nWe iterate over s linearly, comparing constant length hashes at each iteration so each iteration is also O(1), so the runtime is O(n)\\n\\n```\\nclass Solution(object):\\n    def findAnagrams(self, s, p):\\n        \"\"\"\\n        :type s: str\\n        :type p: str\\n        :rtype: List[int]\\n        \"\"\"\\n        res = []\\n        n, m = len(s), len(p)\\n        if n < m: return res\\n        phash, shash = [0]*123, [0]*123\\n        for x in p:\\n            phash[ord(x)] += 1\\n        for x in s[:m-1]:\\n            shash[ord(x)] += 1\\n        for i in range(m-1, n):\\n            shash[ord(s[i])] += 1\\n            if i-m >= 0:\\n                shash[ord(s[i-m])] -= 1\\n            if shash == phash:\\n                res.append(i - m + 1)\\n        return res\\n```"
		},
		{
			"lc_ans_id":"92076",
			"view":"3037",
			"top":"9",
			"title":"java O(n) using HashMap easy understanding",
			"vote":"7",
			"content":"```\\npublic class Solution {\\n    public List<Integer> findAnagrams(String s, String p) {\\n        List<Integer> result = new ArrayList<>();\\n        if (s == null || s.length() == 0) {\\n            return result;\\n        }\\n        if (p.length() > s.length()) {\\n            return result;\\n        }\\n        Map<Character, Integer> map = new HashMap<>();\\n        for (int i = 0; i < p.length(); i++) {\\n            char c = p.charAt(i);\\n            if (map.containsKey(c)) {\\n                map.put(c, map.get(c) + 1);\\n            } else {\\n                map.put(c, 1);\\n            }\\n        }\\n        int match = 0;\\n        for (int i = 0; i < s.length(); i++) {\\n            char c = s.charAt(i);\\n            if (map.containsKey(c)) {\\n                map.put(c, map.get(c) - 1);\\n                if (map.get(c) == 0) {\\n                    match++;\\n                }\\n            }\\n            if (i >= p.length()) {\\n                c = s.charAt(i - p.length());\\n                if (map.containsKey(c)) {\\n                    map.put(c, map.get(c) + 1);\\n                    if (map.get(c) == 1) {\\n                        match--;\\n                    }\\n                }\\n            }\\n            if (match == map.size()) {\\n                result.add(i - p.length() + 1);\\n            }\\n        }\\n        return result;\\n    }\\n}\\n\\n```"
		}
	],
	"id":"432",
	"title":"Find All Anagrams in a String",
	"content":"<p>Given a string <b>s</b> and a <b>non-empty</b> string <b>p</b>, find all the start indices of <b>p</b>'s anagrams in <b>s</b>.</p>\r\n\r\n<p>Strings consists of lowercase English letters only and the length of both strings <b>s</b> and <b>p</b> will not be larger than 20,100.</p>\r\n\r\n<p>The order of output does not matter.</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b>\r\ns: \"cbaebabacd\" p: \"abc\"\r\n\r\n<b>Output:</b>\r\n[0, 6]\r\n\r\n<b>Explanation:</b>\r\nThe substring with start index = 0 is \"cba\", which is an anagram of \"abc\".\r\nThe substring with start index = 6 is \"bac\", which is an anagram of \"abc\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b>\r\ns: \"abab\" p: \"ab\"\r\n\r\n<b>Output:</b>\r\n[0, 1, 2]\r\n\r\n<b>Explanation:</b>\r\nThe substring with start index = 0 is \"ab\", which is an anagram of \"ab\".\r\nThe substring with start index = 1 is \"ba\", which is an anagram of \"ab\".\r\nThe substring with start index = 2 is \"ab\", which is an anagram of \"ab\".\r\n</pre>\r\n</p>",
	"frequency":"270",
	"ac_num":"54089"
}