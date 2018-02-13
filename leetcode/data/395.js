{
	"difficulty":"2",
	"submit_num":"61992",
	"show_id":"395",
	"leetcode_id":"395",
	"answers":[
		{
			"lc_ans_id":"87768",
			"view":"18741",
			"top":"0",
			"title":"4 lines Python",
			"vote":"55",
			"content":"## Update:\\n\\nAs pointed out by @hayleyhu, I can just take the first too rare character instead of a rarest. Submitted once, accepted in 48 ms.\\n\\n    def longestSubstring(self, s, k):\\n        for c in set(s):\\n            if s.count(c) < k:\\n                return max(self.longestSubstring(t, k) for t in s.split(c))\\n        return len(s)\\n\\n## Original:\\n\\n    def longestSubstring(self, s, k):\\n        if len(s) < k:\\n            return 0\\n        c = min(set(s), key=s.count)\\n        if s.count(c) >= k:\\n            return len(s)\\n        return max(self.longestSubstring(t, k) for t in s.split(c))\\n\\nIf every character appears at least k times, the whole string is ok. Otherwise split by a least frequent character (because it will always be too infrequent and thus can't be part of any ok substring) and make the most out of the splits.\\n\\nAs usual for Python here, the runtime varies a lot, this got accepted in times from 32 ms to 74 ms."
		},
		{
			"lc_ans_id":"87739",
			"view":"12342",
			"top":"1",
			"title":"Java Strict O(N) Two-Pointer Solution",
			"vote":"49",
			"content":"For each h, apply two pointer technique to find the longest substring with at least K repeating characters and the number of unique characters in substring is h. \\n```\\npublic class Solution {\\n    public int longestSubstring(String s, int k) {\\n        char[] str = s.toCharArray();\\n        int[] counts = new int[26];\\n        int h, i, j, idx, max = 0, unique, noLessThanK;\\n        \\n        for (h = 1; h <= 26; h++) {\\n            Arrays.fill(counts, 0);\\n            i = 0; \\n            j = 0;\\n            unique = 0;\\n            noLessThanK = 0;\\n            while (j < str.length) {\\n                if (unique <= h) {\\n                    idx = str[j] - 'a';\\n                    if (counts[idx] == 0)\\n                        unique++;\\n                    counts[idx]++;\\n                    if (counts[idx] == k)\\n                        noLessThanK++;\\n                    j++;\\n                }\\n                else {\\n                    idx = str[i] - 'a';\\n                    if (counts[idx] == k)\\n                        noLessThanK--;\\n                    counts[idx]--;\\n                    if (counts[idx] == 0)\\n                        unique--;\\n                    i++;\\n                }\\n                if (unique == h && unique == noLessThanK)\\n                    max = Math.max(j - i, max);\\n            }\\n        }\\n        \\n        return max;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"87741",
			"view":"18999",
			"top":"2",
			"title":"Java divide and conquer(recursion) solution",
			"vote":"49",
			"content":"    public int longestSubstring(String s, int k) {\\n        char[] str = s.toCharArray();\\n        return helper(str,0,s.length(),k);\\n    }\\n    private int helper(char[] str, int start, int end,  int k){\\n        if(end-start<k) return 0;//substring length shorter than k.\\n        int[] count = new int[26];\\n        for(int i = start;i<end;i++){\\n            int idx = str[i]-'a';\\n            count[idx]++;\\n        }\\n        for(int i = 0;i<26;i++){\\n            if(count[i]<k&&count[i]>0){ //count[i]=0 => i+'a' does not exist in the string, skip it.\\n                for(int j = start;j<end;j++){\\n                    if(str[j]==i+'a'){\\n                        int left = helper(str,start,j,k);\\n                        int right = helper(str,j+1,end,k);\\n                        return Math.max(left,right);\\n                    }\\n                }\\n            }\\n        }\\n        return end-start;\\n    }"
		},
		{
			"lc_ans_id":"87736",
			"view":"5949",
			"top":"3",
			"title":"C++ recursive solution",
			"vote":"35",
			"content":"1. in the first pass I record counts of every character in a hashmap\\n2. in the second pass I locate the first character that appear less than k times in the string. this character is definitely not included in the result, and that separates the string into two parts.\\n3. keep doing this recursively and the maximum of the left/right part is the answer.\\n```\\n    int longestSubstring(string s, int k) {\\n        if(s.size() == 0 || k > s.size())   return 0;\\n        if(k == 0)  return s.size();\\n        \\n        unordered_map<char,int> Map;\\n        for(int i = 0; i < s.size(); i++){\\n            Map[s[i]]++;\\n        }\\n        \\n        int idx =0;\\n        while(idx <s.size() && Map[s[idx]] >= k)    idx++;\\n        if(idx == s.size()) return s.size();\\n        \\n        int left = longestSubstring(s.substr(0 , idx) , k);\\n        int right = longestSubstring(s.substr(idx+1) , k);\\n        \\n        return max(left, right);\\n        \\n    }\\n```"
		},
		{
			"lc_ans_id":"87749",
			"view":"7152",
			"top":"4",
			"title":"Two short C++ solutions (3ms and 6ms)",
			"vote":"22",
			"content":"**Sol1:** a simple improvement on the naive quaratic solution. The idea is that if a locally longest substr is found, there's no need to check substrs overlapping it.\\nSol1 can run O(n) times in some cases, but worst case is O(n2). Anyway the C++ run time is 3ms.\\n\\n```\\nint longestSubstring(string s, int k) {\\n   int max_len = 0;\\n   for (int first = 0; first+k <= s.size();) {\\n       int count[26] = {0};\\n       int mask = 0;\\n       int max_last = first;\\n       for (int last = first; last < s.size(); ++last) {\\n           int i = s[last] - 'a';\\n           count[i]++;\\n           if (count[i]<k) mask |= (1 << i);\\n           else   mask &= (~(1 << i));\\n           \\n           if (mask == 0) {\\n               max_len = max(max_len, last-first+1);\\n               max_last = last;\\n           }\\n       }\\n       first = max_last + 1;\\n   }\\n   return max_len;\\n}\\n```\\n\\n**Sol2:** recursive: split the string into substrs by characters of occurrence less than k. Then recursively apply the problem to each substr.\\nWorst case of Sol2 is O(n), because there are at most 26 levels of recursions. The C++ impl. runs 6ms. I suspect this is because the current test cases does not cover enough cases  in favor of this solution in run time. \\n```\\nint longestSubstring(string s, int k) {\\n    return longestSubstring_recur(s, k, 0, s.size());\\n}\\n\\nint longestSubstring_recur(const string& s, int k, int first, int last) {\\n    int count[26] = {0};\\n    for (int j = first; j < last; ++j) ++count[s[j] - 'a'];\\n    \\n    int max_len = 0;\\n    for (int j = first; j < last;) {\\n        while (j < last && count[s[j]-'a']<k) ++j;\\n        if (j == last) break;\\n        int l = j;\\n        while (l < last && count[s[l]-'a']>=k) ++l;\\n        //all chars appear more than k times\\n        if (j == first && l == last) return last-first; \\n        max_len = max(max_len, longestSubstring_recur(s, k, j, l));\\n        j = l;\\n    }\\n    return max_len;\\n}\\n```"
		},
		{
			"lc_ans_id":"87761",
			"view":"1316",
			"top":"5",
			"title":"Java D & C Solution",
			"vote":"9",
			"content":"The idea is pretty basic, find the point where we should split the string, eg, the position of character which total count is <k, then dfs it then find the max.\\nFor Example: bbcddefegaghfh and 2, so we shall dfs on \"bb\", \"ddefeg\", \"ghfh\", since a , c only appears1 for once.\\n\\n ```java\\npublic int longestSubstring(String s, int k) {\\n        if (s == null || s.length() == 0 || k == 0) return 0;\\n        int max = 0;\\n        int[] count = new int[26];\\n        int res = 0;\\n        for (int i = 0; i < s.length(); i++) {\\n            count[s.charAt(i) - 'a']++;\\n        }\\n        List<Integer> pos = new ArrayList<Integer>();\\n        for (int i = 0; i < s.length(); i++) {\\n            if (count[s.charAt(i) - 'a'] < k) pos.add(i);\\n        }\\n        if (pos.size() == 0) return s.length();\\n        pos.add(0, -1);\\n        pos.add(s.length());\\n        for (int i = 1; i < pos.size(); i++) {\\n            int start = pos.get(i-1) + 1;\\n            int end = pos.get(i);\\n            int next = longestSubstring(s.substring(start, end), k);\\n            res = Math.max(res, next);\\n        }\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"87775",
			"view":"1838",
			"top":"6",
			"title":"Java HashMap Solution, worst case O((n^2)*26)",
			"vote":"7",
			"content":"These commented blocks are for speeding up the code, in case of Time Limit Exceed.Basically,denote index as the position of each character in String s,I use a HashMap<index,int[]> to store the occurence of all characters in input s[0,index],index inclusively,which, ranges from 0 to s.length()-1;every substring then can be expressed as map.get(i)-map.get(j), 0<=j<i, we can just check whether if it's valid,update the maxLen and also the hashmap.\\n\\nI was totally inspired by a guy and he gave an idea of solving subarray/substring problem, and it's stunning!\\nhttps://discuss.leetcode.com/topic/33537/java-o-n-explain-how-i-come-up-with-this-idea\\n\\n\\n\\n```\\npublic class Solution {\\n    public int longestSubstring(String s, int k) {\\n        HashMap<Integer,int[]> map=new HashMap<>();\\n        int maxLen=0;\\n        map.put(-1,new int[26]);\\n        for(int i=0;i<s.length();i++){\\n            int[] curr=Arrays.copyOf(map.get(i-1),26);\\n            curr[s.charAt(i)-'a']++;\\n            // if(i+1<k){\\n            //     map.put(i,curr);\\n            //     continue;\\n            // }\\n            for(int j=-1;j<i;j++){\\n                // if(i-j<k){\\n                //     continue;\\n                // }\\n                int[] tmp=map.get(j);\\n                boolean flag=true;\\n                for(int m=0;m<26;m++){\\n                    if(curr[m]!=tmp[m]&&curr[m]-tmp[m]<k){\\n                        flag=false;\\n                        break;\\n                    }\\n                }\\n                \\n                if(flag){\\n\\t\\t    maxLen=Math.max(maxLen,i-j);\\n                    break;\\n                }\\n            }\\n            map.put(i,curr);\\n       }\\n       return maxLen;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"87748",
			"view":"1213",
			"top":"7",
			"title":"Java O(n^2) iterator and backtracking solution.",
			"vote":"5",
			"content":"The first one is a simple solution of O(n^2), we find the max length starting at each character in s.  The three if statement in for loop is to check if the string is satisfied, I use math methods instead of iterator the map each time to save time.\\n\\n![0_1473033447412_Screen Shot 2016-09-04 at 4.21.35 PM.png](/uploads/files/1473033447854-screen-shot-2016-09-04-at-4.21.35-pm.png) \\n\\nThis is a backtracking solution with O(nlogn), worst case O(n ^2), from my schoolmate.\\nsplit the string by the minimal apperence character  temp in string, if count(temp) >= k, we just return s, else, we split the string by temp since temp can't be included. \\n![0_1473033614238_Screen Shot 2016-09-04 at 4.59.40 PM.png](/uploads/files/1473033614684-screen-shot-2016-09-04-at-4.59.40-pm.png)"
		},
		{
			"lc_ans_id":"87742",
			"view":"308",
			"top":"8",
			"title":"C++, O(n), Divide and Conquer",
			"vote":"4",
			"content":"In every step of DC, at least 1 character, let's say, 'a', is chosen to divide the string, then all substrings in following recursive calls have no 'a'. The level of DC is at most 26, otherwise you run out of character to divide, and each level is O(n).  The run time is 3 ms.\\n```\\nclass Solution {\\npublic:\\n    int longestSubstring(string s, int k) {\\n        int n = s.size();\\n        return helper(s, 0, n-1, k);\\n    }\\nprivate:\\n    // looking for longest string within index range [l, r]\\n    int helper(string& s, int l, int r, int k) {\\n        vector<int> mp(26, 0);\\n        for (int i = l; i <= r; i++) mp[s[i]-'a']++;\\n       // check whether the whole string meets requirement\\n        bool pass = true;\\n        for (int i = 0; i < 26 && pass; i++) {\\n            if (mp[i] && mp[i] < k)\\n                pass = false;\\n        }\\n        if (pass) return r-l+1;\\n        // using all characters with occurrence > 0 && < k to divide the string\\n        int i = l, ans = 0;\\n        for (int j = l; j <= r; j++) {\\n            if (mp[s[j]-'a'] && mp[s[j]-'a'] < k) {\\n                ans = max(ans, helper(s, i, j-1, k));\\n                i = j+1;\\n            }\\n        }\\n        return max(ans, helper(s, i, r, k));\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"87738",
			"view":"1247",
			"top":"9",
			"title":"Java 20 lines very easy solution 7ms with explanation",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public int longestSubstring(String s, int k) {\\n        if (s == null || s.length() == 0) return 0;\\n        char[] chars = new char[26];\\n        // record the frequency of each character\\n        for (int i = 0; i < s.length(); i += 1) chars[s.charAt(i) - 'a'] += 1;\\n        boolean flag = true;\\n        for (int i = 0; i < chars.length; i += 1) {\\n            if (chars[i] < k && chars[i] > 0) flag = false;\\n        }\\n        // return the length of string if this string is a valid string\\n        if (flag == true) return s.length();\\n        int result = 0;\\n        int start = 0, cur = 0;\\n        // otherwise we use all the infrequent elements as splits\\n        while (cur < s.length()) {\\n            if (chars[s.charAt(cur) - 'a'] < k) {\\n                result = Math.max(result, longestSubstring(s.substring(start, cur), k));\\n                start = cur + 1;\\n            }\\n            cur++;\\n        }\\n        result = Math.max(result, longestSubstring(s.substring(start), k));\\n        return result;\\n    }\\n}\\n```\\nIn each step, just find the infrequent elements (show less than k times) as splits since any of these infrequent elements couldn't be any part of the substring we want."
		}
	],
	"id":"395",
	"title":"Longest Substring with At Least K Repeating Characters",
	"content":"<p>\r\nFind the length of the longest substring <b><i>T</i></b> of a given string (consists of lowercase letters only) such that every character in <b><i>T</i></b> appears no less than <i>k</i> times.\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\nInput:\r\ns = \"aaabb\", k = 3\r\n\r\nOutput:\r\n3\r\n\r\nThe longest substring is \"aaa\", as 'a' is repeated 3 times.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\nInput:\r\ns = \"ababbc\", k = 2\r\n\r\nOutput:\r\n5\r\n\r\nThe longest substring is \"ababb\", as 'a' is repeated 2 times and 'b' is repeated 3 times.\r\n</pre>\r\n</p>",
	"frequency":"383",
	"ac_num":"22295"
}