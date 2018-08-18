{
	"difficulty":"2",
	"submit_num":"33824",
	"show_id":"467",
	"leetcode_id":"467",
	"answers":[
		{
			"lc_ans_id":"95439",
			"view":"12326",
			"top":"0",
			"title":"Concise Java solution using DP",
			"vote":"129",
			"content":"After failed with pure math solution and time out with DFS solution, I finally realized that this is a DP problem... \\nThe idea is, if we know the max number of unique substrings in ```p``` ends with ```'a', 'b', ..., 'z'```, then the summary of them is the answer. Why is that?\\n1. The max number of unique substring ends with a letter equals to the length of max contiguous substring ends with that letter. Example ```\"abcd\"```, the max number of unique substring ends with ```'d'``` is 4, apparently they are ```\"abcd\", \"bcd\", \"cd\" and \"d\"```.\\n2. If there are overlapping, we only need to consider the longest one because it covers all the possible substrings. Example: ```\"abcdbcd\"```, the max number of unique substring ends with ```'d'``` is 4 and all substrings formed by the 2nd ```\"bcd\"``` part are covered in the 4 substrings already.\\n3. No matter how long is a contiguous substring in ```p```, it is in ```s``` since ```s``` has infinite length.\\n4. Now we know the max number of unique substrings in ```p``` ends with ```'a', 'b', ..., 'z'``` and those substrings are all in ```s```. Summary is the answer, according to the question.\\n\\nHope I made myself clear...\\n```\\npublic class Solution {\\n    public int findSubstringInWraproundString(String p) {\\n        // count[i] is the maximum unique substring end with ith letter.\\n        // 0 - 'a', 1 - 'b', ..., 25 - 'z'.\\n        int[] count = new int[26];\\n        \\n        // store longest contiguous substring ends at current position.\\n        int maxLengthCur = 0; \\n\\n        for (int i = 0; i < p.length(); i++) {\\n            if (i > 0 && (p.charAt(i) - p.charAt(i - 1) == 1 || (p.charAt(i - 1) - p.charAt(i) == 25))) {\\n                maxLengthCur++;\\n            }\\n            else {\\n                maxLengthCur = 1;\\n            }\\n            \\n            int index = p.charAt(i) - 'a';\\n            count[index] = Math.max(count[index], maxLengthCur);\\n        }\\n        \\n        // Sum to get result\\n        int sum = 0;\\n        for (int i = 0; i < 26; i++) {\\n            sum += count[i];\\n        }\\n        return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95448",
			"view":"3860",
			"top":"1",
			"title":"C++ Concise Solution",
			"vote":"18",
			"content":"```\\nint findSubstringInWraproundString(string p) {\\n        vector<int> letters(26, 0);\\n        int res = 0, len = 0;\\n        for (int i = 0; i < p.size(); i++) {\\n            int cur = p[i] - 'a';\\n            if (i > 0 && p[i - 1] != (cur + 26 - 1) % 26 + 'a') len = 0;\\n            if (++len > letters[cur]) {\\n                res += len - letters[cur];\\n                letters[cur] = len;\\n            }\\n        }\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"95463",
			"view":"952",
			"top":"2",
			"title":"Concise O(n) 6-liner in Python",
			"vote":"5",
			"content":"Record the longest length for the substrings that end with each letter.\\n\\nUse ```'abcdefghijklmnopqrstuvwxyza\\u2019``` to check if two letters are near each other.\\n\\n```\\nclass Solution(object):\\n    def findSubstringInWraproundString(self, p):\\n        p, d, lo = '0'+p, collections.defaultdict(int), 0\\n        for hi in range(1, len(p)):\\n            if p[hi-1]+p[hi] not in 'abcdefghijklmnopqrstuvwxyza':\\n                lo = hi\\n            d[p[hi]] = max(d[p[hi]], hi+1-lo)\\n        return sum(d.values())\\n```"
		},
		{
			"lc_ans_id":"95474",
			"view":"1907",
			"top":"3",
			"title":"Python O(n) DP",
			"vote":"5",
			"content":"I use cmap[c] to store the maximum length of sub-string starts with c.\\n\\nThe time complexity of the code below is  O(n) as well.\\n\\n```\\nclass Solution(object):\\n    def findSubstringInWraproundString(self, p):\\n        \"\"\"\\n        :type p: str\\n        :rtype: int\\n        \"\"\"\\n        pattern = 'zabcdefghijklmnopqrstuvwxyz'\\n        cmap = collections.defaultdict(int)\\n        start = end = 0\\n        for c in range(len(p)):\\n            if c and p[c-1:c+1] not in pattern:\\n                for x in range(start, end):\\n                    cmap[p[x]] = max(end - x, cmap[p[x]])\\n                start = c\\n            end = c + 1\\n        for x in range(start, end):\\n            cmap[p[x]] = max(end - x, cmap[p[x]])\\n        return sum(cmap.values())\\n```"
		},
		{
			"lc_ans_id":"95454",
			"view":"800",
			"top":"4",
			"title":"Evolve from brute force to optimal",
			"vote":"4",
			"content":"1. O(n^3) check each substr, a hashtable is used to remove duplicate strings.\\n```\\n    int findSubstringInWraproundString(string p) {\\n        int n = p.size();\\n        unordered_set<string> ht;\\n        for(int i=0;i<n;i++)\\n            for(int j=i;j<n;j++) {\\n                if(j>i && p[j-1]+1!=p[j] && p[j-1]-p[j]!=25) break;\\n                ht.insert(p.substr(i,j-i+1));\\n            }\\n        return ht.size();\\n    }\\n```\\n2. O(n^2 logn), Each valid substr can be represented by the first char and the length, instead of the whole string.\\n```\\n    int findSubstringInWraproundString(string p) {\\n        int n = p.size();\\n        set<pair<char,int>> bst;\\n        for(int i=0;i<n;i++)\\n            for(int j=i;j<n;j++) {\\n                if(j>i && p[j-1]+1!=p[j] && p[j-1]-p[j]!=25) break;\\n                bst.insert(pair<char,int>(p[i],j-i+1));\\n            }\\n        return bst.size();\\n    }\\n```\\n3. O(n^2). For substrs starting at the same char, we only need to record the longest one. Because it covers all the shorter substrs starting from the char. The length is the number of substrings starting at the char.\\n```\\n    int findSubstringInWraproundString(string p) {\\n        int n = p.size(), len[26]={0};\\n        for(int i=0;i<n;i++)\\n            for(int j=i;j<n;j++) {\\n                if(j>i && p[j-1]+1!=p[j] && p[j-1]-p[j]!=25) break;\\n                len[p[i]-'a'] = max(len[p[i]-'a'],j-i+1);\\n            }\\n        return accumulate(len,len+26,0);\\n    }\\n```\\n4. O(n). Getting the longest substr starting from each char can be done in linear time. We can use two pointers to keep track of the current valid substring.\\n```\\n    int findSubstringInWraproundString(string p) {\\n        int len[26]={0}, i = 0, n = p.size();\\n        for(int j=0;j<n;j++)\\n            if(j>i && p[j-1]+1!=p[j] && p[j-1]-p[j]!=25) {\\n                for(int k=i;k<min(j,i+26);k++) len[p[k]-'a'] = max(len[p[k]-'a'],j-k);\\n                i=j--;\\n            }\\n        for(int k=i;k<min(n,i+26);k++) len[p[k]-'a'] = max(len[p[k]-'a'],n-k);\\n        return accumulate(len,len+26,0);\\n    }\\n```"
		},
		{
			"lc_ans_id":"95447",
			"view":"963",
			"top":"5",
			"title":"C++ two passes, O(1) space. find the longest substring starting from each letter",
			"vote":"3",
			"content":"example: xyzabcefg\\nlongest(x) = 6, ==> we get 6 sub strings started from x, x xy xyz xyza xyzab xyzabc\\nlongest(y) = 5 ==> y yz yza yzab yzabc\\nlongest(c) = longest(g) = 1 ==> c, g \\n\\nadd 26 longest values together\\n```\\nclass Solution {\\npublic:\\n    int findSubstringInWraproundString(string p) {\\n        vector<int> longest(26, 0);\\n        int i = 0, left = 0;\\n        while (i < p.size()) {\\n            if (i + 1 == p.size() || (i + 1 < p.size() && (p[i] - 'a' + 1) % 26 != (p[i+1] - 'a'))) {\\n                //from left to i;\\n                for (int j = left; j <= i; j++) {\\n                    longest[p[j] - 'a'] = max(longest[p[j] - 'a'], i - j + 1);\\n                }\\n                left = i+1;\\n            }\\n            i++;\\n        }\\n        \\n        int ret = 0;\\n        for (int k = 0; k < 26; k++) {\\n            ret += longest[k]; \\n        }\\n        return ret;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"95473",
			"view":"1717",
			"top":"6",
			"title":"Java two different solutions with explanation",
			"vote":"3",
			"content":"Hi there! I am sharing two different solutions with explanations.\\n\\nWell, the first solution idea is  Optimized brute force. The 'naivest' way is for each substring of p in alphabetic order (with rotation %26) brute force all substrings and add to some set. Then at last just return size of the set. That method works but it has two problems, they are:\\n * Memory limit\\n * Time limit\\n\\nBecause it works for O(n^3) time and O(n^2) space.\\nHow can we optimize memory?  Because we are considering only strings in alphabetic order, it is sufficient to remember the first character index, last character index and the length for each found substring. This way we replace set of strings to 3D boolean array.\\nWell, how can we optimize time complexity? We can increase performance of counting unique substrings for already found substring, which size is greater than 26. The evidence mentioned above helps us again, because we just need to consider combinations of first 26 character and the last 26 characters for different length, by incrementing length by 26. Such a way we get algorithm that runs for O(26*n) time and O((26^2)*n) space complexities.\\n```\\npublic class Solution {\\n    public int findSubstringInWraproundString(String p) {\\n        if(p == null || p.isEmpty()) return 0;\\n        boolean [][][] set = new boolean[26][26][p.length()+1];\\n        int i = 0;\\n        int count = 0;\\n        boolean [] visited = new boolean[26];\\n        StringBuilder build = new StringBuilder();\\n        char [] s = p.toCharArray();\\n        int n = s.length;\\n        while(i<n){\\n            char prev = s[i];\\n            build.append(prev);\\n            i++;\\n            while(i<p.length() && s[i]-'a' == (prev-'a'+1)%26){\\n                prev = s[i];\\n                build.append(prev);\\n                i++;\\n            }\\n            \\n            String next = build.toString();\\n            int l = next.charAt(0)-'a';\\n            int r = next.charAt(next.length()-1)-'a';\\n            if(!set[l][r][next.length()]){\\n                count++;\\n                set[l][r][next.length()] = true;\\n                count+= countUniqueSubstr(next, set);\\n            }\\n            build.setLength(0);\\n        }\\n        return count;\\n    }\\n    \\n   \\n    public int countUniqueSubstr(String str, boolean [][][] set){\\n        int count = 0;\\n        if(str.length()>26){\\n            int n = str.length();\\n            for(int i = 0;i<26;i++){\\n                int l = str.charAt(i)-'a';\\n                for(int j = n-1;j>=n-26;j--){\\n                    int r = str.charAt(j)-'a';\\n                    int limit = j-i+1;\\n                    int start = r-l+1;\\n                    if(r<l){\\n                        start = 27-l+r;\\n                    }\\n                    for(int size = start;size<=limit;size+=26){\\n                        if(!set[l][r][size]){\\n                            count++;\\n                            set[l][r][size] = true;\\n                        }\\n                    }\\n                }\\n            }\\n            \\n        } else {\\n            for(int size = 1;size<str.length();size++){\\n                for(int i = 0;i<=str.length()-size;i++){\\n                    String s = str.substring(i, i+size);\\n                    int l = s.charAt(0)-'a';\\n                    int r = s.charAt(s.length()-1)-'a';\\n                    if(!set[l][r][s.length()]){\\n                        count++;\\n                        set[l][r][s.length()] = true;\\n                    }\\n                }\\n            }\\n        }\\n        return count;\\n    }\\n}\\n```\\nThe second solution is simple, just keep track of maximum length of alphabetic substrings ending at certain character then sum them up. \\n\\n```\\npublic class Solution {\\n    public int findSubstringInWraproundString(String p) {\\n        if(p == null || p.isEmpty()) return 0;\\n        int dp[] = new int[26];\\n        int i = 0;\\n        int n = p.length();\\n        char [] s = p.toCharArray();\\n        int len = 1;\\n        while(i<n){\\n            char prev = s[i];\\n            i++;\\n            dp[prev - 'a'] = Math.max(dp[prev-'a'], len);\\n            while(i<p.length() && s[i]-'a' == (prev-'a'+1)%26){\\n                prev = s[i];\\n                len++;\\n                i++;\\n                dp[prev - 'a'] = Math.max(dp[prev-'a'], len);\\n            }\\n            dp[prev - 'a'] = Math.max(dp[prev-'a'], len);\\n            len = 1;\\n        }\\n        int count = 0;\\n        for(int j = 0;j<26;j++) count+=dp[j];\\n        return count;\\n    }\\n}\\n```\\nP.S: Sorry for poor and dirty code. I hope it will be understandable anyway"
		},
		{
			"lc_ans_id":"95458",
			"view":"231",
			"top":"7",
			"title":"Java DP Solution, easy understand",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int findSubstringInWraproundString(String p) {\\n        int[] alphabets=new int[26];\\n        if(p.isEmpty()) return 0;\\n         int len=1;\\n         alphabets[p.charAt(0)-'a']=1;\\n        for(int i=1;i<p.length();i++)\\n        {\\n            int current=p.charAt(i)-'a';\\n            int prev =p.charAt(i-1)-'a';\\n            if((prev+1)%26==current)\\n             len++;\\n            else len=1;\\n            alphabets[current]=Math.max(alphabets[current],len);\\n        }\\n        int sum=0;\\n        for(int i:alphabets) sum+=i;\\n        return sum;\\n\\n        \\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95464",
			"view":"385",
			"top":"8",
			"title":"Python Solution",
			"vote":"1",
			"content":"This solution might look a bit verbose but it is straight forward. `dp[i]` is the number of qualified substrings ending at the position `i` in `p`, `seen` is a dictionary keyed by the character `c` that maintains the greatest number of qualified substrings ending at the char `c`.\\n\\n    class Solution(object):\\n        def findSubstringInWraproundString(self, p):\\n            \"\"\"\\n            :type p: str\\n            :rtype: int\\n            \"\"\"\\n\\n            N = len(p)\\n            if N <= 1: return N\\n\\n            dp = [0 for i in range(N)]\\n            start, seen = 0, {}\\n            dp[0], seen[p[0]] = 1, 1\\n\\n            for i in range(1, N):\\n                if p[i - 1] == 'z' and p[i] == 'a' or ord(p[i - 1]) + 1 == ord(p[i]):\\n                    x = i - start + 1\\n                    if p[i] not in seen:\\n                        dp[i] = x\\n                        seen[p[i]] = dp[i]\\n                    else:\\n                        if x > seen[p[i]]:\\n                            dp[i] = x - seen[p[i]]\\n                            seen[p[i]] = x\\n                        else:\\n                            dp[i] = 0\\n                else:\\n                    if p[i] not in seen:\\n                        dp[i] = 1\\n                        seen[p[i]] = dp[i]\\n                    else:\\n                        dp[i] = 0\\n\\n                    start = i\\n\\n            return sum(dp)"
		},
		{
			"lc_ans_id":"95468",
			"view":"179",
			"top":"9",
			"title":"Solution explained and Python + Ruby implementation",
			"vote":"1",
			"content":"http://ruslanledesma.com/2016/12/10/unique-substrings-in-wraparound-string.html"
		}
	],
	"id":"461",
	"title":"Unique Substrings in Wraparound String",
	"content":"<p>Consider the string <code>s</code> to be the infinite wraparound string of \"abcdefghijklmnopqrstuvwxyz\", so <code>s</code> will look like this: \"...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd....\".</p>\r\n\r\n<p>Now we have another string <code>p</code>. Your job is to find out how many unique non-empty substrings of <code>p</code> are present in <code>s</code>. In particular, your input is the string <code>p</code> and you need to output the number of different non-empty substrings of <code>p</code> in the string <code>s</code>.</p>\r\n\r\n<p><b>Note:</b> <code>p</code> consists of only lowercase English letters and the size of p might be over 10000.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"a\"\r\n<b>Output:</b> 1\r\n\r\n<b>Explanation:</b> Only the substring \"a\" of string \"a\" is in the string \u0010s.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"cac\"\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> There are two substrings \"a\", \"c\" of string \"cac\" in the string s.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b> \"zab\"\r\n<b>Output:</b> 6\r\n<b>Explanation:</b> There are six substrings \"z\", \"a\", \"b\", \"za\", \"ab\", \"zab\" of string \"zab\" in the string s.\r\n</pre>\r\n</p>",
	"frequency":"132",
	"ac_num":"11232"
}