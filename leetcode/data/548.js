{
	"difficulty":"2",
	"submit_num":"47445",
	"show_id":"567",
	"leetcode_id":"567",
	"answers":[
		{
			"lc_ans_id":"102588",
			"view":"10607",
			"top":"0",
			"title":"Java Solution, Sliding Window",
			"vote":"53",
			"content":"1. How do we know string ```p``` is a permutation of string ```s```? Easy, each character in ```p``` is in ```s``` too. So we can abstract all permutation strings of ```s``` to a map (Character -> Count). i.e. ```abba``` -> ```{a:2, b:2}```. Since there are only 26 lower case letters in this problem, we can just use an array to represent the map. \\n2. How do we know string ```s2``` contains a permutation of ```s1```?  We just need to create a sliding window with length of ```s1```, move from beginning to the end of ```s2```. When a character moves in from right of the window, we subtract ```1``` to that character count from the map. When a character moves out from left of the window, we add ```1``` to that character count. So once we see all zeros in the map, meaning equal numbers of every characters between ```s1``` and the substring in the sliding window, we know the answer is true.\\n```\\npublic class Solution {\\n    public boolean checkInclusion(String s1, String s2) {\\n        int len1 = s1.length(), len2 = s2.length();\\n        if (len1 > len2) return false;\\n        \\n        int[] count = new int[26];\\n        for (int i = 0; i < len1; i++) {\\n            count[s1.charAt(i) - 'a']++;\\n            count[s2.charAt(i) - 'a']--;\\n        }\\n        if (allZero(count)) return true;\\n        \\n        for (int i = len1; i < len2; i++) {\\n            count[s2.charAt(i) - 'a']--;\\n            count[s2.charAt(i - len1) - 'a']++;\\n            if (allZero(count)) return true;\\n        }\\n        \\n        return false;\\n    }\\n    \\n    private boolean allZero(int[] count) {\\n        for (int i = 0; i < 26; i++) {\\n            if (count[i] != 0) return false;\\n        }\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102590",
			"view":"4909",
			"top":"1",
			"title":"8 lines slide window solution in Java",
			"vote":"31",
			"content":"\\n```\\n    public boolean checkInclusion(String s1, String s2) {\\n        int[] count = new int[128];\\n        for(int i = 0; i < s1.length(); i++) count[s1.charAt(i)]--;\\n        for(int l = 0, r = 0; r < s2.length(); r++) {\\n            if (++count[s2.charAt(r)] > 0)\\n                while(--count[s2.charAt(l++)] != 0) { /* do nothing */}\\n            else if ((r - l + 1) == s1.length()) return true;\\n        }\\n        return s1.length() == 0;\\n    }\\n```\\n\\n**Update**:\\n\\nI gonna use pictures to describe what the above code does. The first \"*for*\" loop counts all chars we need to find in a way like digging holes on the ground:\\n\\n![0_1493821046494_Screen Shot 2017-05-03 at 8.56.24 AM.png](/uploads/files/1493821047834-screen-shot-2017-05-03-at-8.56.24-am.png) \\nBlank bars are the holes that we need to fill.\\n\\nWe scan each one char of the string *s2* (by moving index **r** in above code) and put it in the right hole:\\n![0_1493821246327_Screen Shot 2017-05-03 at 8.56.46 AM.png](/uploads/files/1493821247502-screen-shot-2017-05-03-at-8.56.46-am.png) \\nThe blue blocks are chars from s2.\\n\\nBut if the char in s2 is not in s1, or, the count of the char is more than the count of the same char in s1, we got some thing like this:\\n![0_1493822441927_Screen Shot 2017-05-03 at 8.57.32 AM.png](/uploads/files/1493822440796-screen-shot-2017-05-03-at-8.57.32-am.png) \\nNote the last blue block sticks out of ground. Any time we encounter a sticking out block - meaning a block with value 1 - we stop scanning (that is moving \"***r***\"). At this point, there is only one sticking out block.\\n\\nNow, we have an invalid substring with either invalid char or invalid number of chars. How to remove the invalid char and continue our scan? We use a left index (\"***l***\" in above code) to remove chars in the holes in the same order we filled them into the holes. We stop removing chars until the only sticking out block is fixed - it has a value of 0 after fixing. Then, we continue our scanning by moving right index \"***r***\".\\n\\nOur target is to get:\\n![0_1493823560108_Screen Shot 2017-05-03 at 9.02.56 AM.png](/uploads/files/1493823558513-screen-shot-2017-05-03-at-9.02.56-am.png) \\nTo check if all holes are filled perfectly - no more, no less, all have value of 0 - we just need to make sure (r - l + 1) == s1.length().\\n\\n**Update 2:**\\nThanks to  mylemoncake comment. I have updated the last line to :  return s1.length() == 0;  This takes care of the case s1 is an empty string."
		},
		{
			"lc_ans_id":"102594",
			"view":"2693",
			"top":"2",
			"title":"Python, Simple with Explanation",
			"vote":"8",
			"content":"For each ```window``` representing a substring of ```s2``` of length ```len(s1)```, we want to check if the count of the window is equal to the count of ```s1```.  Here, the count of a string is the list of: [the number of ```a```'s it has, the number of ```b```'s,... , the number of ```z```'s.]\\n\\nWe can maintain the window by deleting the value of s2[i - len(s1)] when it gets larger than ```len(s1)```.  After, we only need to check if it is equal to the target.  Working with list values of [0, 1,..., 25] instead of 'a'-'z' makes it easier to count later.\\n\\n```\\ndef checkInclusion(self, s1, s2):\\n    A = [ord(x) - ord('a') for x in s1]\\n    B = [ord(x) - ord('a') for x in s2]\\n    \\n    target = [0] * 26\\n    for x in A:\\n        target[x] += 1\\n    \\n    window = [0] * 26\\n    for i, x in enumerate(B):\\n        window[x] += 1\\n        if i >= len(A):\\n            window[B[i - len(A)]] -= 1\\n        if window == target:\\n            return True\\n    return False\\n```"
		},
		{
			"lc_ans_id":"102642",
			"view":"1216",
			"top":"3",
			"title":"Java Solution Two pointers",
			"vote":"6",
			"content":"```\\npublic class Solution {\\n    public boolean checkInclusion(String s1, String s2) {\\n        if(s1.length()>s2.length()) return false;\\n        int[] alphabets = new int[26];\\n        int len =s1.length();\\n        for(char ch : s1.toCharArray()){\\n            alphabets[ch-'a']++;\\n        }\\n        int cnt =len;\\n        char[] sArr = s2.toCharArray();\\n        \\n        int start =0;\\n        int end =0;\\n        while(end<sArr.length){\\n            if(alphabets[sArr[end++]-'a']-->0) cnt--;\\n            while(cnt==0){\\n               // System.out.println(end+\",\"+start);\\n                if(end-start == len) return true;\\n                if(alphabets[sArr[start++]-'a']++==0) cnt++;\\n            }\\n            \\n        }\\n        \\n        return false;\\n        \\n    }\\n    \\n}\\n```"
		},
		{
			"lc_ans_id":"102604",
			"view":"2234",
			"top":"4",
			"title":"\"Oneliners\" in Python and C++",
			"vote":"4",
			"content":"Well, one line in addition to copying&pasting my [old solution](https://discuss.leetcode.com/topic/20692/12-lines-python) for an [old problem](https://leetcode.com/problems/minimum-window-substring).\\n```\\nclass Solution(object):\\n    def checkInclusion(self, s1, s2):\\n        return len(self.minWindow(s2, s1)) == len(s1)\\n    \\n    # Copied&pasted old problem's solution\\n    def minWindow(self, s, t):\\n        need, missing = collections.Counter(t), len(t)\\n        i = I = J = 0\\n        for j, c in enumerate(s, 1):\\n            missing -= need[c] > 0\\n            need[c] -= 1\\n            if not missing:\\n                while i < j and need[s[i]] < 0:\\n                    need[s[i]] += 1\\n                    i += 1\\n                if not J or j - i <= J - I:\\n                    I, J = i, j\\n        return s[I:J]\\n```\\nEdit: As [pointed out](https://discuss.leetcode.com/topic/87897/sliding-window-in-java-very-similar-to-find-all-anagrams-in-a-string) by @FionaFang, another [old problem](https://leetcode.com/problems/find-all-anagrams-in-a-string) is similar to this one (and its solution can be used here to create a \"oneliner\"):\\n```\\nclass Solution {\\npublic:\\n    bool checkInclusion(string s1, string s2) {\\n        return findAnagrams(s2, s1).size();\\n    }\\n    \\n    // Copied&pasted old problem's solution\\n    vector<int> findAnagrams(string s, string p) {\\n        int miss[256] = {}, missSum = p.size();\\n        for (char c : p)\\n            miss[c]++;\\n        vector<int> result;\\n        for (int i=0; i<s.size(); i++) {\\n            missSum -= miss[s[i]]-- > 0;\\n            int start = i+1 - p.size();\\n            if (!missSum)\\n                result.push_back(start);\\n            missSum += start >= 0 && ++miss[s[start]] > 0;\\n        }\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"102644",
			"view":"1643",
			"top":"5",
			"title":"[C++] [Java] Clean Code with Explanation",
			"vote":"3",
			"content":"**C++**\\n```\\n/**\\n * 1. try find a window (i, j) where s2.substr(i, j + 1 - i) contains all chars in s1;\\n * 2. once found, try reduce window(i, j) such that j + 1 - i == s1.size() while the window still contains all chars in s1 by moving i, return true;\\n * 3. if windows no longer contain all chars in s1, keep moving j forward;\\n */\\nclass Solution {\\npublic:\\n    bool checkInclusion(string s1, string s2) {\\n        vector<int> cnts(256, 0);\\n        for (char ch : s1) {\\n            cnts[ch]++;\\n        }\\n\\n        int left = s1.size();\\n        for (int i = 0, j = 0; j < s2.size(); j++) {\\n            if (cnts[s2[j]]-- > 0) {\\n                left--;\\n            }\\n\\n            while (left == 0) {\\n                if (j + 1 - i == s1.size()) {\\n                    return true;\\n                }\\n                if (++cnts[s2[i++]] > 0) {\\n                    left++;\\n                }\\n            }\\n        }\\n\\n        return false;\\n    }\\n};\\n```\\n**Java**\\n```\\npublic class Solution {\\n    public boolean checkInclusion(String s1, String s2) {\\n        char[] ca1 = s1.toCharArray(), ca2 = s2.toCharArray();\\n        int[] cnts = new int[256];\\n        for (char ch : ca1) cnts[ch]++;\\n\\n        int left = ca1.length;\\n        for (int i = 0, j = 0; j < ca2.length; j++) {\\n            if (cnts[ca2[j]]-- > 0) left--;\\n\\n            while (left == 0) {\\n                if (j + 1 - i == ca1.length) return true;\\n                if (++cnts[ca2[i++]] > 0) left++;\\n            }\\n        }\\n\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102629",
			"view":"357",
			"top":"6",
			"title":"C++ 6 lines O(n)",
			"vote":"2",
			"content":"```\\nbool checkInclusion(string s1, string s2) {\\n    int s1s = s1.size(), s2s = s2.size(), start = 0, cnt = 0, arr[26] = {};\\n    for (auto l : s1) ++arr[l - 'a'];\\n    for (auto i = 0; i < s2s && cnt < s1s; ++i) {\\n        if (arr[s2[i] - 'a'] > 0) --arr[s2[i] - 'a'], ++cnt;\\n        else while (s2[start++] != s2[i]) ++arr[s2[start - 1] - 'a'], --cnt;\\n    }\\n    return cnt == s1s;\\n}\\n```"
		},
		{
			"lc_ans_id":"102598",
			"view":"376",
			"top":"7",
			"title":"Sliding Window in Java, very similar to Find All Anagrams in a String",
			"vote":"2",
			"content":"Let's take a look at a solution using sliding window in Find All Anagrams in a String( https://leetcode.com/problems/find-all-anagrams-in-a-string/#/description )\\n````\\n    public List<Integer> findAnagrams(String s, String p) {\\n        List<Integer> res = new ArrayList<Integer>();\\n        if(s == null || s.length() == 0 || p == null || p.length() == 0) return res;\\n        int begin = 0, end = 0;\\n        Map<Character, Integer> map = new HashMap<>();\\n        for(char c : p.toCharArray()) {\\n            map.put(c, map.getOrDefault(c, 0) + 1);\\n        }\\n        int counter = map.size();\\n        while(end < s.length()){\\n            char ch = s.charAt(end);\\n            if(map.containsKey(ch)) {\\n                map.put(ch, map.get(ch) - 1);\\n                if(map.get(ch) == 0) {\\n                    counter--;\\n                }\\n            }\\n            while(counter == 0) {\\n                if(end - begin + 1 == p.length()) { \\n                    res.add(begin);\\n                }\\n                char temp = s.charAt(begin);\\n                if(map.containsKey(temp)) {\\n                    map.put(temp, map.get(temp) + 1);\\n                    if(map.get(temp) > 0) {\\n                        counter++;\\n                    }\\n                }\\n                begin++;\\n            }\\n            end++;\\n        }\\n        return res;\\n}\\n````\\nThen is my solution for this problem, it's a little bit long but this template can be applied to a lot of problems.\\n\\n````\\n    public boolean checkInclusion(String s1, String s2) {\\n        if(s1 == null || s2 == null) {\\n            return false;\\n        }\\n        int len = s1.length();\\n        Map<Character, Integer> map = new HashMap<>();\\n        for(char c : s1.toCharArray()) {\\n            map.put(c, map.getOrDefault(c, 0) + 1);\\n        }\\n        int count = map.size();\\n        int begin = 0;\\n        int end = 0;\\n        while(end < s2.length()) {\\n            char ch = s2.charAt(end);\\n            if(map.containsKey(ch)) {\\n                map.put(ch, map.get(ch) - 1);\\n                if(map.get(ch) == 0) {\\n                    count--;\\n                }\\n            }\\n            while(count == 0) {\\n                if(end - begin + 1 == len) {\\n                    return true;\\n                }\\n                char temp = s2.charAt(begin);\\n                if(map.containsKey(temp)) {\\n                    map.put(temp, map.get(temp) + 1);\\n                    if(map.get(temp) > 0) {\\n                        count++;\\n                    }\\n                }\\n                begin++;\\n            }\\n            end++;\\n        }\\n        return false;\\n    }\\n````\\nSimilar problems:\\n\\nMinimum window substring\\nLongest Substring without Repeating Characters\\nLongest Substring with at most 2 Distinct Characters\\nLongest Substring with at most k Distinct Characters\\n\\nhope this helps!"
		},
		{
			"lc_ans_id":"102640",
			"view":"458",
			"top":"8",
			"title":"Simple & clear Java solution",
			"vote":"2",
			"content":"```\\n// The idea is to create one base array, another moving array\\n// tell the arrays are equal or not during each iteration\\n\\npublic boolean checkInclusion(String s1, String s2) {\\n        int n1=s1.length(),n2=s2.length();\\n        int[] f1=new int[26];\\n        for(int i=0;i<n1;i++) f1[s1.charAt(i)-'a']++;\\n        \\n        int[] f2=new int[26];\\n        for(int j=0;j<n2;j++){\\n            f2[s2.charAt(j)-'a']++;\\n            if(j>=n1) f2[s2.charAt(j-n1)-'a']--;\\n            if(Arrays.equals(f2,f1)) return true;\\n        }\\n        return false;\\n    }\\n\\n```"
		},
		{
			"lc_ans_id":"102597",
			"view":"137",
			"top":"9",
			"title":"Smart C++ Solution with hash",
			"vote":"1",
			"content":"```c++\\nclass Solution {\\npublic:\\n    bool checkInclusion(string s1, string s2) {\\n        int hash1 = hash(s1);\\n        int len1 = s1.size(), len2 = s2.size();\\n        if(len1>len2) return false;\\n        for(int i=0;i<=len2-len1;i++){\\n            int hash2 = hash(s2.substr(i,len1));\\n            if(hash1==hash2) return true;\\n        }\\n        return false;\\n    }\\n    inline int hash(string s){\\n        int ret = 1;\\n        for(char i:s)\\n            ret *= ((i-'a')*(i-'a') + (i-'a')+41) % INT_MAX;\\n        return ret;\\n    }\\n};\\n```"
		}
	],
	"id":"548",
	"title":"Permutation in String",
	"content":"Given two strings <b>s1</b> and <b>s2</b>, write a function to return true if <b>s2</b> contains the permutation of <b>s1</b>. In other words, one of the first string's permutations is the <b>substring</b> of the second string.\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>s1 = \"ab\" s2 = \"eidbaooo\"\r\n<b>Output:</b>True\r\n<b>Explanation:</b> s2 contains one permutation of s1 (\"ba\").\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b>s1= \"ab\" s2 = \"eidboaoo\"\r\n<b>Output:</b> False\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The input strings only contain lower case letters.</li>\r\n<li>The length of both given strings is in range [1, 10,000].</li>\r\n</ol>\r\n</p>",
	"frequency":"122",
	"ac_num":"17389"
}