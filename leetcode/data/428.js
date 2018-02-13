{
	"difficulty":"1",
	"submit_num":"92400",
	"show_id":"434",
	"leetcode_id":"434",
	"answers":[
		{
			"lc_ans_id":"91607",
			"view":"12107",
			"top":"0",
			"title":"Clean java solution O(n)",
			"vote":"47",
			"content":"    public int countSegments(String s) {\\n        int res=0;\\n        for(int i=0; i<s.length(); i++)\\n            if(s.charAt(i)!=' ' && (i==0 || s.charAt(i-1)==' '))\\n                res++;        \\n        return res;\\n    }\\n\\t\\n\\tTime complexity:  O(n)\\n\\tSpace complexity: O(1)"
		},
		{
			"lc_ans_id":"91638",
			"view":"3221",
			"top":"1",
			"title":"O(n) sentinel value concise solution, C++",
			"vote":"17",
			"content":"```\\nclass Solution {\\npublic:\\n    int countSegments(string s) {\\n        int res = 0;\\n        s.push_back(' ');\\n        for(int i = 1; i < s.size(); ++i)\\n          if(s[i] == ' ' && s[i-1] != ' ') ++res;\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"91651",
			"view":"6473",
			"top":"2",
			"title":"one-liners",
			"vote":"14",
			"content":"Ruby:\\n```\\ndef count_segments(s)\\n  s.split.size\\nend\\n```\\nPython:\\n\\n    def countSegments(self, s):\\n        return len(s.split())\\n\\nJava:\\n\\n    public int countSegments(String s) {\\n        return (\"x \" + s).split(\" +\").length - 1;\\n    }\\n\\nC++:\\n\\n    int countSegments(string s) {\\n        return regex_replace(regex_replace(s, regex(\"\\\\\\\\S+\"), \"x\"), regex(\" \"), \"\").size();\\n    }"
		},
		{
			"lc_ans_id":"91616",
			"view":"2981",
			"top":"3",
			"title":"AC Solution Java with trim() and split()",
			"vote":"5",
			"content":"    public int countSegments(String s) {\\n        String trimmed = s.trim();\\n        if (trimmed.length() == 0) return 0;\\n        else return trimmed.split(\"\\\\\\\\s+\").length;\\n    }"
		},
		{
			"lc_ans_id":"91675",
			"view":"2154",
			"top":"4",
			"title":"C++ concise three line solutions",
			"vote":"5",
			"content":"```\\nclass Solution {\\npublic:\\n    int countSegments(string s) {\\n        int res = 0;\\n        for (int i = 0; i < s.size(); i++) \\n            res += s[i] != ' ' && (i + 1 == s.size() || s[i + 1] == ' ');\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"91688",
			"view":"276",
			"top":"5",
			"title":"2-line C++ solution simply using stringstream >> operator",
			"vote":"4",
			"content":"The `stringstream >>` operator will output strings separated by white spaces until exhausting all strings.\\n```\\n    int countSegments(string s) {\\n      stringstream ss(s); int res = 0;\\n      while (ss >> s) ++res; return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"91689",
			"view":"543",
			"top":"6",
			"title":"One line python solution",
			"vote":"3",
			"content":"class Solution(object):\\n    def countSegments(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: int\\n        \"\"\"\\n        return len(s.split())"
		},
		{
			"lc_ans_id":"91609",
			"view":"42",
			"top":"7",
			"title":"Javascript oneline",
			"vote":"1",
			"content":"```js\\n/**\\n * @param {string} s\\n * @return {number}\\n */\\nvar countSegments = function(s) {\\n    return s.split(\" \").filter(function(n){return n}).length;\\n};\\n```\\nin the javascript ,wo can clear the 0  or \"\"  in the Array, in two ways:\\n1. \\n```js\\nArray.prototype.clean = function(deleteValue) {  \\n  for (var i = 0; i < this.length; i++) {  \\n    if (this[i] == deleteValue) {           \\n      this.splice(i, 1);//\\u8fd4\\u56de\\u6307\\u5b9a\\u7684\\u5143\\u7d20  \\n      i--;  \\n    }  \\n  }  \\n  return this;  \\n};  \\n```\\n2.\\n\\n```js\\narr.filter(function(n){return n}); \\n```"
		},
		{
			"lc_ans_id":"91619",
			"view":"169",
			"top":"8",
			"title":"Python One-liner without split",
			"vote":"1",
			"content":"Just increment count when we encounter a letter following a space.\\n```\\n    def countSegments(self, s):\\n\\n        return sum(s[i] != ' ' and (i == 0 or s[i-1] == ' ') for i in range(len(s)))\\n```"
		},
		{
			"lc_ans_id":"91625",
			"view":"295",
			"top":"9",
			"title":"My JavaScript Solution",
			"vote":"1",
			"content":"```\\nvar countSegments = function(s) {\\n    s = s.trim();\\n    return (s.length === 0 ? 0 : s.replace(/\\\\s{2,}/g,\" \").split(\" \").length);\\n};\\n```"
		}
	],
	"id":"428",
	"title":"Number of Segments in a String",
	"content":"<p>Count the number of segments in a string, where a segment is defined to be a contiguous sequence of non-space characters.</p>\r\n\r\n<p>Please note that the string does not contain any <b>non-printable</b> characters.</p>\r\n\r\n<p><b>Example:</b></p>\r\n<pre>\r\n<b>Input:</b> \"Hello, my name is John\"\r\n<b>Output:</b> 5\r\n</pre>\r\n</p>",
	"frequency":"154",
	"ac_num":"33914"
}