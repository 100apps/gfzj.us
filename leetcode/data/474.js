{
	"difficulty":"1",
	"submit_num":"65686",
	"show_id":"482",
	"leetcode_id":"482",
	"answers":[
		{
			"lc_ans_id":"96512",
			"view":"11913",
			"top":"0",
			"title":"Java 5 lines clean solution",
			"vote":"40",
			"content":"```\\n    public String licenseKeyFormatting(String s, int k) {\\n        StringBuilder sb = new StringBuilder();\\n        for (int i = s.length() - 1; i >= 0; i--)\\n            if (s.charAt(i) != '-')\\n                sb.append(sb.length() % (k + 1) == k ? '-' : \"\").append(s.charAt(i));\\n        return sb.reverse().toString().toUpperCase();\\n    } \\n```"
		},
		{
			"lc_ans_id":"96528",
			"view":"2192",
			"top":"1",
			"title":"Easy to understand using StringBuilder",
			"vote":"7",
			"content":"```\\npublic class Solution {\\n    public String licenseKeyFormatting(String S, int K) {\\n        // Replacing all - and converting all letters to uppercase\\n        String S1 = S.replace(\"-\",\"\");\\n        S1 = S1.toUpperCase();\\n        \\n        // Making stringBuilder \\n        StringBuilder sb = new StringBuilder();\\n         for(int i=0; i<S1.length();i++) {\\n            sb.append(S1.charAt(i));\\n        }\\n        int len = sb.toString().length();\\n        // Inserting '-' from back at every K position\\n        for(int i=K; i < len; i=i+K) {\\n                sb.insert(len-i,'-');\\n            }\\n        return sb.toString();   \\n    }\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"96506",
			"view":"3669",
			"top":"2",
			"title":"4-line C++ concise solution to scan string backward",
			"vote":"7",
			"content":"**Key observation:** every `(K+1)`th character from the tail of the formatted string must be a `'-'`.\\n```\\n    string licenseKeyFormatting(string S, int K) {\\n      string res;\\n      for (auto i = S.rbegin(); i < S.rend(); i++)\\n        if (*i != '-') (res.size()%(K+1)-K? res : res+='-') += toupper(*i);\\n      return reverse(res.begin(), res.end()), res;\\n    }\\n```\\nA rewritten version for readability:\\n```\\n    string licenseKeyFormatting(string S, int K) {\\n      string res;\\n      for (auto i = S.rbegin(); i < S.rend(); i++)\\n        if (*i != '-') { // ignore '-' in original string\\n          if (res.size()%(K+1) == K) res += '-'; // every (K+1)th char is '-' from tail\\n          res += toupper(*i);\\n        }\\n        \\n      reverse(res.begin(), res.end());\\n      return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"96497",
			"view":"3161",
			"top":"3",
			"title":"Python solution",
			"vote":"7",
			"content":"```\\nclass Solution(object):\\n    def licenseKeyFormatting(self, S, K):\\n        \"\"\"\\n        :type S: str\\n        :type K: int\\n        :rtype: str\\n        \"\"\"\\n        S = S.upper().replace('-','')\\n        size = len(S)\\n        s1 = K if size%K==0 else size%K\\n        res = S[:s1]\\n        while s1<size:\\n            res += '-'+S[s1:s1+K]\\n            s1 += K\\n        return res\\n```"
		},
		{
			"lc_ans_id":"96562",
			"view":"542",
			"top":"4",
			"title":"Java easy to understand solution",
			"vote":"3",
			"content":"    public String licenseKeyFormatting(String S, int K) {\\n        \\n        S = S.replaceAll(\"[-]\", \"\");\\n        S = S.toUpperCase();\\n\\n        StringBuilder sb = new StringBuilder();\\n        sb.append(S);\\n\\n        int i=sb.length()-K;\\n        while(i>0) {\\n            sb.insert(i, '-');\\n            i = i-K;\\n        }\\n\\n        return sb.toString();\\n    }"
		},
		{
			"lc_ans_id":"96574",
			"view":"749",
			"top":"5",
			"title":"Golang beats 100% at 6ms",
			"vote":"3",
			"content":"```\\nimport (\\n\\t\"fmt\"\\n\\t\"strings\"\\n)\\n\\nfunc licenseKeyFormatting(S string, K int) string {\\n        S = strings.Replace(S, \"-\", \"\", -1)\\n        S = strings.ToUpper(S)\\n        mod := len(S) % K\\n        \\n        if mod == 0 {\\n            mod += K\\n        }\\n        for mod < len(S) {\\n            S = S[:mod] + \"-\" + S[mod:]\\n            mod += K + 1\\n        }\\n        return S\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"96520",
			"view":"88",
			"top":"6",
			"title":"Share my Java Solution beating 83.10% 22ms",
			"vote":"2",
			"content":"```\\n\\npublic class Solution {\\n    public String licenseKeyFormatting(String S, int K) {\\n        if (S == null || S.length() == 0) return \"\";\\n        String[] ss = S.split(\"-\");\\n        StringBuilder sb = new StringBuilder();\\n        for (String s : ss) sb.append(s);\\n        String noDashS = sb.toString();\\n        sb = new StringBuilder();\\n        int firstK = noDashS.length() % K;\\n        if (firstK == 0) firstK = K;\\n        for (int i = 0; i < noDashS.length();) {\\n            if (i == 0) {\\n                if (i + firstK < noDashS.length()) sb.append(noDashS.substring(i, i + firstK));\\n                else sb.append(noDashS.substring(i, noDashS.length()));\\n                i += firstK;\\n                continue;\\n            } else if (i + K < noDashS.length()) sb.append(\"-\" + noDashS.substring(i, i + K));\\n            else sb.append(\"-\" + noDashS.substring(i, noDashS.length()));\\n            i += K;\\n        }\\n        return sb.toString().toUpperCase();\\n    }\\n}\\n\\n```\\n[submission](https://leetcode.com/submissions/detail/96985307/)"
		},
		{
			"lc_ans_id":"96553",
			"view":"987",
			"top":"7",
			"title":"Easy Understand Java solution using StringBuilder",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    public String licenseKeyFormatting(String S, int K) {\\n        String[] strs = S.split(\"-\");\\n        StringBuilder rst = new StringBuilder();\\n        int gap = 'A' - 'a';\\n        \\n        for (String str : strs) {\\n            rst.append(str);\\n        }\\n        \\n        int len = rst.length();\\n        \\n        for (int i = 0; i < len; i++) {\\n            char c = rst.charAt(i);\\n            if (c>='a' && c<='z') {\\n                rst.setCharAt(i, (char)(c+gap));\\n            }\\n        }\\n\\n        for (int i = len-K; i > 0; i -= K) {\\n            rst.insert(i, '-');\\n        }\\n        return rst.toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"96511",
			"view":"406",
			"top":"8",
			"title":"Python solution based on regex",
			"vote":"2",
			"content":"```\\nclass Solution(object):\\n    def licenseKeyFormatting(self, S, K):\\n        \"\"\"\\n        :type S: str\\n        :type K: int\\n        :rtype: str\\n        \"\"\"\\n        formatted = S.replace(\"-\",\"\",len(S)).upper()[::-1]\\n        formatted = re.sub(r'(\\\\w{' + str(K) + r'})', r'\\\\1-', formatted)\\n        formatted = formatted[::-1]\\n        formatted = re.sub(r'^-',r'', formatted)\\n        return formatted\\n```"
		},
		{
			"lc_ans_id":"96491",
			"view":"50",
			"top":"9",
			"title":"JavaScript 6-liner. 89ms. Beats 100%",
			"vote":"1",
			"content":"The code is pretty self-explanatory.\\n\\n*By Yangshun*\\n\\n```\\nvar licenseKeyFormatting = function(S, K) {\\n    const raw = S.replace(/-/g, '').toUpperCase();\\n    let length = raw.length, chunks = [];\\n    while (length > 0) {\\n        chunks.push(raw.substring(length - K, length));\\n        length -= K;\\n    }\\n    return chunks.reverse().join('-');\\n};\\n```"
		}
	],
	"id":"474",
	"title":"License Key Formatting",
	"content":"<p>You are given a license key represented as a string S which consists only alphanumeric character and dashes. The string is separated into N+1 groups by N dashes.</p>\r\n\r\n<p>Given a number K, we would want to reformat the strings such that each group contains <i>exactly</i> K characters, except for the first group which could be shorter than K, but still must contain at least one character. Furthermore, there must be a dash inserted between two groups and all lowercase letters should be converted to uppercase.</p>\r\n\r\n<p>Given a non-empty string S and a number K, format the string according to the rules described above.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> S = \"5F3Z-2e-9-w\", K = 4\r\n\r\n<b>Output:</b> \"5F3Z-2E9W\"\r\n\r\n<b>Explanation:</b> The string S has been split into two parts, each part has 4 characters.\r\nNote that the two extra dashes are not needed and can be removed.\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> S = \"2-5g-3-J\", K = 2\r\n\r\n<b>Output:</b> \"2-5G-3J\"\r\n\r\n<b>Explanation:</b> The string S has been split into three parts, each part has 2 characters except the first part as it could be shorter as mentioned above.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The length of string S will not exceed 12,000, and K is a positive integer.</li>\r\n<li>String S consists only of alphanumerical characters (a-z and/or A-Z and/or 0-9) and dashes(-).</li>\r\n<li>String S is non-empty.</li>\r\n</ol>\r\n</p>",
	"frequency":"260",
	"ac_num":"26602"
}