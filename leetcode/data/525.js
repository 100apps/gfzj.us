{
	"difficulty":"1",
	"submit_num":"73352",
	"show_id":"541",
	"leetcode_id":"541",
	"answers":[
		{
			"lc_ans_id":"100866",
			"view":"12415",
			"top":"0",
			"title":"Java Concise Solution",
			"vote":"47",
			"content":"```\\npublic class Solution {\\n    public String reverseStr(String s, int k) {\\n        char[] arr = s.toCharArray();\\n        int n = arr.length;\\n        int i = 0;\\n        while(i < n) {\\n            int j = Math.min(i + k - 1, n - 1);\\n            swap(arr, i, j);\\n            i += 2 * k;\\n        }\\n        return String.valueOf(arr);\\n    }\\n    private void swap(char[] arr, int l, int r) {\\n        while (l < r) {\\n            char temp = arr[l];\\n            arr[l++] = arr[r];\\n            arr[r--] = temp;\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100887",
			"view":"5983",
			"top":"1",
			"title":"[C++][Java] Clean Code",
			"vote":"18",
			"content":"**C++**\\n```\\nclass Solution {\\npublic:\\n    /**\\n     * 0            k           2k          3k\\n     * |-----------|-----------|-----------|---\\n     * +--reverse--+           +--reverse--+\\n     */\\n    string reverseStr(string s, int k) {\\n        for (int left = 0; left < s.size(); left += 2 * k) {\\n            for (int i = left, j = min(left + k - 1, (int)s.size() - 1); i < j; i++, j--) {\\n                swap(s[i], s[j]);\\n            }\\n        }\\n        return s;\\n    }\\n};\\n```\\n\\n**Java**\\n```\\npublic class Solution {\\n    public String reverseStr(String s, int k) {\\n        char[] ca = s.toCharArray();\\n        for (int left = 0; left < ca.length; left += 2 * k) {\\n            for (int i = left, j = Math.min(left + k - 1, ca.length - 1); i < j; i++, j--) {\\n                char tmp = ca[i];\\n                ca[i] = ca[j];\\n                ca[j] = tmp;\\n            }\\n        }\\n        return new String(ca);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100890",
			"view":"3928",
			"top":"2",
			"title":"Python, Straightforward with Explanation",
			"vote":"13",
			"content":"For every block of 2k characters starting with position i, we want to replace S[i:i+k] with it's reverse.\\n```\\ndef reverseStr(self, s, k):\\n    s = list(s)\\n    for i in xrange(0, len(s), 2*k):\\n        s[i:i+k] = reversed(s[i:i+k])\\n    return \"\".join(s)\\n```"
		},
		{
			"lc_ans_id":"100893",
			"view":"3220",
			"top":"3",
			"title":"One line C++",
			"vote":"11",
			"content":"```\\nclass Solution {\\npublic:\\n    string reverseStr(string s, int k) {\\n        for (int i = 0; i < s.size(); i += 2*k) reverse(s.begin()+i, min(s.begin()+i+k, s.end()));\\n        return s;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"100870",
			"view":"2427",
			"top":"4",
			"title":"1 line simple recursive Python",
			"vote":"11",
			"content":"```\\nclass Solution(object):\\n    def reverseStr(self, s, k):\\n        \"\"\"\\n        :type s: str\\n        :type k: int\\n        :rtype: str\\n        \"\"\"\\n        return s[:k][::-1] + s[k:2*k] + self.reverseStr(s[2*k:], k) if s else \"\"\\n```"
		},
		{
			"lc_ans_id":"100907",
			"view":"607",
			"top":"5",
			"title":"6 lines java solution with O(n) runtime",
			"vote":"5",
			"content":"```\\n    public String reverseStr(String s, int k) {\\n        StringBuilder res = new StringBuilder();\\n        for (int i = 0; i < s.length(); i++) {\\n            if (i % (2 * k) < k) res.insert(i - i % (2 * k), s.charAt(i));\\n            else res.append(s.charAt(i));\\n        }\\n        return res.toString();\\n    }\\n```"
		},
		{
			"lc_ans_id":"100881",
			"view":"1084",
			"top":"6",
			"title":"Verbose Java Solution, StringBuilder(s)",
			"vote":"4",
			"content":"Tried to maximize usage of ```StringBuilder``` :)\\n```\\npublic class Solution {\\n    public String reverseStr(String s, int k) {\\n        StringBuilder sb = new StringBuilder();\\n        \\n        int i = 0, j = 0;\\n        while (i < s.length()) {\\n            // first k\\n            j = i + k <= s.length() ? i + k : s.length();\\n            sb.append((new StringBuilder(s.substring(i, j))).reverse().toString());\\n            \\n            if (j >= s.length()) break;\\n            \\n            // second k\\n            i = j;\\n            j = i + k <= s.length() ? i + k : s.length();\\n            sb.append(s.substring(i, j));\\n            \\n            i = j;\\n        }\\n        \\n        return sb.toString();\\n    }\\n    \\n}\\n```"
		},
		{
			"lc_ans_id":"100885",
			"view":"125",
			"top":"7",
			"title":"4 lines C++ Solution",
			"vote":"3",
			"content":"  ````\\nstring reverseStr(string s, int k) {\\n        for(int i=0; i<s.length();i+=2*k)\\n            if(i+k<=s.length()) reverse(s.begin()+i,s.begin()+i+k);\\n            else reverse(s.begin()+i,s.end());\\n        return s;\\n    }\\n````"
		},
		{
			"lc_ans_id":"100894",
			"view":"586",
			"top":"8",
			"title":"Python simple solution",
			"vote":"3",
			"content":"```\\nclass Solution(object):\\n    def reverseStr(self, s, k):\\n        \"\"\"\\n        :type s: str\\n        :type k: int\\n        :rtype: str\\n        \"\"\"\\n        news = ''\\n        n = (len(s) // (2 * k)) * 2 * k\\n        for i in range(0, n, 2 * k):\\n            news += s[i:i + k][::-1]\\n            news += s[i + k:i + 2 * k]\\n        if len(s) - n < k:\\n            news += s[n:][::-1]\\n        else:\\n            news += s[n:n + k][::-1]\\n            news += s[n + k:]\\n        return news\\n```"
		},
		{
			"lc_ans_id":"100879",
			"view":"73",
			"top":"9",
			"title":"JavaScript solution (not faster .just an idea)",
			"vote":"2",
			"content":"```javascript\\nvar reverseStr = function(s, k) {\\n    if(s.length <= k ) return s.split(\"\").reverse().join(\"\");\\n    var res = [];\\n    s = s.split(\"\");\\n    while(s.length>k){\\n        res.push(...(s.splice(0,k).reverse()));\\n        res = res.concat(s.splice(0,k));\\n    }\\n    res.push(...(s.reverse()));\\n    return res.join(\"\");\\n};\\n```"
		}
	],
	"id":"525",
	"title":"Reverse String II",
	"content":"</p>\r\nGiven a string and an integer k, you need to reverse the first k characters for every 2k characters counting from the start of the string. If there are less than k characters left, reverse all of them. If there are less than 2k but greater than or equal to k characters, then reverse the first k characters and left the other as original.\r\n</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> s = \"abcdefg\", k = 2\r\n<b>Output:</b> \"bacdfeg\"\r\n</pre>\r\n</p>\r\n\r\n<b>Restrictions:</b> </b>\r\n<ol>\r\n<li> The string consists of lower English letters only.</li>\r\n<li> Length of the given string and k will in the range [1, 10000]</li>\r\n</ol>",
	"frequency":"246",
	"ac_num":"32127"
}