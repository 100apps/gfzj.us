{
	"difficulty":"1",
	"submit_num":"20429",
	"show_id":"696",
	"leetcode_id":"696",
	"answers":[
		{
			"lc_ans_id":"108600",
			"view":"4310",
			"top":"0",
			"title":"Java O(n) Time O(1) Space",
			"vote":"54",
			"content":"```\\npublic int countBinarySubstrings(String s) {\\n    int prevRunLength = 0, curRunLength = 1, res = 0;\\n    for (int i=1;i<s.length();i++) {\\n        if (s.charAt(i) == s.charAt(i-1)) curRunLength++;\\n        else {\\n            prevRunLength = curRunLength;\\n            curRunLength = 1;\\n        }\\n        if (prevRunLength >= curRunLength) res++;\\n    }\\n    return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"108625",
			"view":"1600",
			"top":"1",
			"title":"Python easy and concise solution (only 2 lines)",
			"vote":"15",
			"content":"First, I count the number of 1 or 0 grouped consecutively.\\nFor example \"0110001111\" will be ```[1, 2, 3, 4]```.\\n\\nSecond, for any possible substrings with 1 and  0 grouped consecutively, the number of valid substring will be the minimum number of 0 and 1.\\nFor example \"0001111\", will be ```min(3, 4) = 3```,  (```\"01\", \"0011\", \"000111\"```)\\n\\n````\\ndef countBinarySubstrings(self, s):\\n        s = map(len, s.replace('01', '0 1').replace('10', '1 0').split())\\n        return sum(min(a, b) for a, b in zip(s, s[1:]))"
		},
		{
			"lc_ans_id":"108610",
			"view":"850",
			"top":"2",
			"title":"Acceptable JAVA solution with explaination",
			"vote":"8",
			"content":"It takes me some time to understand this problem, after look at the top solution. I figured out how to solve it, Thanks to @compton_scatter, here is just some explaination of his solution: \\n1. preRun count the same item happend before (let say you have 0011, preRun = 2 when you hit the first 1, means there are two zeros before first '1')\\n2. curRun count the current number of items (let say you have 0011, curRun = 2 when you hit the second 1, means there are two 1s so far)\\n3. Whenever item change (from 0 to 1 or from 1 to 0), preRun change to curRun, reset curRun to 1 (store the curRun number into PreRun, reset curRun)\\n4. Every time preRun >= curRun means there are more 0s before 1s, so could do count++ . (This was the tricky one, ex. 0011 when you hit the first '1', curRun = 1, preRun = 2, means 0s number is larger than 1s number, so we could form \"01\" at this time, count++ .  When you hit the second '1', curRun = 2, preRun = 2, means 0s' number equals to 1s' number, so we could form \"0011\" at this time, that is why count++)\\n```\\nclass Solution {\\npublic int countBinarySubstrings(String s) {\\nif (s == null || s.length() == 0) return 0;\\n        int preRun = 0;\\n        int curRun =1;\\n        int count = 0;\\n        for (int i = 1; i < s.length(); i++){\\n            if (s.charAt(i) == s.charAt(i-1)) curRun++;\\n            else {\\n                preRun = curRun;\\n                curRun = 1;\\n            }\\n            if (preRun >= curRun) count++;\\n        }\\n        return count;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108585",
			"view":"1002",
			"top":"3",
			"title":"C++ easy understanding solution",
			"vote":"7",
			"content":"```\\nclass Solution {\\npublic:\\n    int countBinarySubstrings(string s) {\\n        vector<int> rec;\\n        int count = 1;\\n        for(int i=1, n=s.size(); i<=n; ++i){\\n            if(s[i] == s[i-1]){\\n                ++count;\\n            }else{\\n                rec.push_back(count);\\n                count = 1;\\n            }\\n        }\\n        int res = 0;\\n        for(int i=1, n=rec.size(); i<n; ++i){\\n            res += min(rec[i-1], rec[i]);\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108626",
			"view":"443",
			"top":"4",
			"title":"Python intuitive approaches with explanation (3-liner)",
			"vote":"4",
			"content":"*Scroll to the bottom for the 3-liner*\\n\\nAn intuitive approach will be to group the binary string into chunks of 0s and 1s (sort of like compressing). The answer will be simply to sum the min of length of neighboring chunks together.\\n\\nHere are some examples:\\n\\n- `'00001111'` => `[4, 4]` => `min(4, 4)` => `4`\\n- `'00110'` => `[2, 2, 1]` => `min(2, 2) + min(2, 1)` => `3`\\n- `'10101'` => `[1, 1, 1, 1, 1]` => `4`\\n\\n```\\nclass Solution(object):\\n    def countBinarySubstrings(self, s):\\n        chunks, consecutive, res = [], 1, 0\\n        for i in range(1, len(s)):\\n            if s[i] == s[i - 1]:\\n                consecutive += 1\\n            else:\\n                chunks.append(consecutive)\\n                consecutive = 1\\n        chunks.append(consecutive)\\n        for i in range(1, len(chunks)):\\n            res += min(chunks[i], chunks[i - 1])\\n        return res\\n```\\n\\nAn alternative way is to find the positions where the bits flip and we can derive the chunks from the positions of the flips.\\n\\n```\\nclass Solution(object):\\n    def countBinarySubstrings(self, s):\\n        flips, res = [0], 0\\n        for i in range(1, len(s)):\\n            if s[i] != s[i - 1]:\\n                flips.append(i)\\n        flips.append(len(s))\\n        chunks = [a - b for (a, b) in zip(flips[1:], flips)]\\n        for i in range(1, len(chunks)):\\n            res += min(chunks[i], chunks[i - 1])\\n        return res\\n```\\n\\nA compressed 3-liner version of the above will look like this:\\n\\n```\\nclass Solution(object):\\n    def countBinarySubstrings(self, s):\\n        flips = [0] + [i for i in range(1, len(s)) if s[i] != s[i - 1]] + [len(s)]\\n        chunks = [a - b for (a, b) in zip(flips[1:], flips)]\\n        return sum(min(a, b) for a, b in zip(chunks, chunks[1:]))\\n```\\n\\n*- Yangshun*"
		},
		{
			"lc_ans_id":"108604",
			"view":"485",
			"top":"5",
			"title":"1-liners",
			"vote":"2",
			"content":"Two adjacent streaks contribute as many substrings as the length of the shorter streak (e.g., \"111\" followed by \"00000\" contribute \"10\", \"1100\" and \"111000\"). So determine the streaks, get their sizes, take each consecutive pair, get each pair's minimum, and sum those minimums. Literal translation of the previous sentence to Ruby:\\n```\\ndef count_binary_substrings(s)\\n  s.scan(/0+|1+/).map(&:size).each_cons(2).map(&:min).sum\\nend\\n```\\nPython version, not quite as nice but still decent:\\n\\n    def countBinarySubstrings(self, s):\\n        lengths = map(len, re.findall('0+|1+', s))\\n        return sum(map(min, lengths[:-1], lengths[1:]))\\n\\nAnd a Python oneliner using a regex that gives me *pairs* of adjacent streaks so I don't have to pair them myself afterwards:\\n\\n    def countBinarySubstrings(self, s):\\n        return sum(min(map(len, pair)) for pair in re.findall('(0+|1+)(?=(0+|1*))', s))"
		},
		{
			"lc_ans_id":"108590",
			"view":"776",
			"top":"6",
			"title":"Python Concise Solution",
			"vote":"2",
			"content":"```\\n    def countBinarySubstrings(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: int\\n        \"\"\"\\n        n=len(s)\\n        res=0\\n        start=0\\n        lastcount=1\\n        for i in xrange(1,n):\\n            if s[i]!=s[i-1]:\\n                res+=1\\n                lastcount=i-start\\n                start=i\\n            else:\\n                if i-start<lastcount:\\n                    res+=1\\n        return res"
		},
		{
			"lc_ans_id":"108595",
			"view":"75",
			"top":"7",
			"title":"Jave O(n) time O(1) space with explanation",
			"vote":"1",
			"content":"```\\npublic int countBinarySubstrings(String s) {\\n        // only update res when current position is last char or current char not the same as next char\\n        // e.g. 00111, update res at 2nd 0 and 3rd 1. at 2nd 0, prvCount is 0, therefore res += 0\\n        // at 3rd 1, prvCount is 2, curCount is 3, res += 2\\n        // once res updated, assign curCount to prvCount, then reset curCount\\n        int prvCount = 0, curCount = 0, res = 0;\\n        for (int i = 0; i < s.length(); i++) {\\n            curCount ++;\\n            if (i == s.length()-1 || s.charAt(i) != s.charAt(i+1)) {\\n                res += Math.min(prvCount, curCount);\\n                prvCount = curCount;\\n                curCount = 0;\\n            }\\n        }\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"108596",
			"view":"52",
			"top":"8",
			"title":"JavaScript 116ms",
			"vote":"1",
			"content":"var countBinarySubstrings = function(s) {\\n    var ary = s.split(''),\\n        counter = 1,\\n        temp = ary[0],\\n        cache = [],\\n        result = 0\\n    for (var i = 1, len = ary.length; i < len; i++) {\\n        if (ary[i] === temp) {\\n            counter++\\n        } else {\\n            cache.push(counter)\\n            temp = ary[i]\\n            counter = 1\\n        }\\n    }\\n    cache.push(counter)\\n    for (var i = 0, len = cache.length; i < len - 1; i++) {\\n        result += Math.min(cache[i], cache[i + 1])\\n    }\\n    return result\\n};"
		},
		{
			"lc_ans_id":"108632",
			"view":"214",
			"top":"9",
			"title":"C++: Like Longest Palindromic Substring (Approach #4)",
			"vote":"1",
			"content":"This is pretty similar to checking for Longest Palindromic Substring (approach #4) expand around the center (https://leetcode.com/problems/longest-palindromic-substring/solution/#approach-4-expand-around-center-accepted):\\n\\n```\\nclass Solution {\\npublic:\\n    int countLikePalindrome(string& s, int i, int j) {\\n        int ans=0;\\n        \\n        while(i>=0 && j<s.size() && s[i]=='0' && s[j]=='1') {\\n            ans++;\\n            i--;\\n            j++;\\n            if(s[i]=='1' && s[j]=='0')\\n                return ans;\\n        }        \\n        \\n        while(i>=0 && j<s.size() && s[i]=='1' && s[j]=='0') {\\n            ans++;\\n            i--;\\n            j++;\\n            if(s[i]=='0' && s[j]=='1')\\n                return ans;\\n        }\\n        \\n        return ans;\\n    }\\n    \\n    int countBinarySubstrings(string s) {\\n        if(s.empty())\\n            return 0;\\n        \\n        int ans=0;\\n        for(int i=0; i<s.size()-1; i++) {\\n            ans+=countLikePalindrome(s, i, i+1);\\n        }\\n        \\n        return ans;\\n    }\\n};\\n\\n```"
		}
	],
	"id":"673",
	"title":"Count Binary Substrings",
	"content":"<p>Give a string <code>s</code>, count the number of non-empty (contiguous) substrings that have the same number of 0's and 1's, and all the 0's and all the 1's in these substrings are grouped consecutively. \r\n</p>\r\n<p>Substrings that occur multiple times are counted the number of times they occur.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"00110011\"\r\n<b>Output:</b> 6\r\n<b>Explanation:</b> There are 6 substrings that have equal number of consecutive 1's and 0's: \"0011\", \"01\", \"1100\", \"10\", \"0011\", and \"01\".\r\n<br>Notice that some of these substrings repeat and are counted the number of times they occur.\r\n<br>Also, \"00110011\" is not a valid substring because <b>all</b> the 0's (and 1's) are not grouped together.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"10101\"\r\n<b>Output:</b> 4\r\n<b>Explanation:</b> There are 4 substrings: \"10\", \"01\", \"10\", \"01\" that have equal number of consecutive 1's and 0's.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li><code>s.length</code> will be between 1 and 50,000.</li>\r\n<li><code>s</code> will only consist of \"0\" or \"1\" characters.</li>\r\n</p>",
	"frequency":"312",
	"ac_num":"10502"
}