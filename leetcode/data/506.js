{
	"difficulty":"1",
	"submit_num":"46324",
	"show_id":"521",
	"leetcode_id":"521",
	"answers":[
		{
			"lc_ans_id":"99410",
			"view":"18906",
			"top":"0",
			"title":"I feel this problem is just perfect for April Fools' day",
			"vote":"112",
			"content":"I know this problem may seem obviously trivial for many programming masters, but not for me; actually I was really over-thinking into it and wondering why it's only a 3-point problem.\\n\\nTo the problem contributor: you really got me this time! (if the baffling problem description is intentional)\\n\\nAnyone has the same feeling?"
		},
		{
			"lc_ans_id":"99409",
			"view":"11356",
			"top":"1",
			"title":"Java 1-liner",
			"vote":"21",
			"content":"```\\npublic int findLUSlength(String a, String b) {\\n    return a.equals(b) ? -1 : Math.max(a.length(), b.length());\\n}\\n```"
		},
		{
			"lc_ans_id":"99403",
			"view":"5457",
			"top":"2",
			"title":"Python, Simple Explanation",
			"vote":"5",
			"content":"For strings **A**, **B**, when len(**A**) > len(**B**), the longest possible subsequence of either **A** or **B** is **A**, and no subsequence of **B** can be equal to **A**.  Answer: len(**A**).\\n\\nWhen len(**A**) == len(**B**), the only subsequence of **B** equal to **A** is **B**; so as long as **A** != **B**, the answer remains len(**A**).\\n\\nWhen **A** == **B**, any subsequence of **A** can be found in **B** and vice versa, so the answer is -1.\\n\\n```\\ndef findLUSlength(self, A, B):\\n    if A == B:\\n        return -1\\n    return max(len(A), len(B))\\n```"
		},
		{
			"lc_ans_id":"99405",
			"view":"965",
			"top":"3",
			"title":"This is a silly question",
			"vote":"4",
			"content":"Seriously? Wtf."
		},
		{
			"lc_ans_id":"99411",
			"view":"1990",
			"top":"4",
			"title":"This is a boring word game",
			"vote":"3",
			"content":"This is a boring word game"
		},
		{
			"lc_ans_id":"99426",
			"view":"139",
			"top":"5",
			"title":"Intuitive Javascript Solution",
			"vote":"1",
			"content":"```\\nvar findLUSlength = function(a, b) {\\n    // identical strings don't have uncommon subsequence\\n    if (a === b) return -1;\\n    // the longer string itself is the longest uncommon subsequence\\n    else return Math.max(a.length, b.length);\\n};\\n```"
		},
		{
			"lc_ans_id":"99434",
			"view":"544",
			"top":"6",
			"title":"Read and think before coding - Clean and clear Java solution",
			"vote":"1",
			"content":"It's always about the interpretation of the problem.\\n\\nAs long as you realize you can always choose the longer string as the \"Subsequence\", and surely it cannot be the subsequence of the shorter one, the problem becomes a piece of cake.\\n\\nPS: I'm not a big fan of minimizing the lines of code. I think readability is more important :)\\n```\\npublic class Solution {\\n    public int findLUSlength(String a, String b) {\\n        int lenA=a.length(), lenB=b.length();\\n        \\n        if(a.equals(b))  return -1;\\n        else    return Math.max(lenA, lenB);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99429",
			"view":"967",
			"top":"7",
			"title":"C++ one line Solution",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    int findLUSlength(string a, string b) {\\n        return a == b?-1:max(a.size(), b.size());\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99436",
			"view":"725",
			"top":"8",
			"title":"O(n)time, O(1)space C++ solution, interesting.......",
			"vote":"1",
			"content":"```\\nint findLUSlength(string a, string b) {\\n        if(a.size()!=b.size()) return max(a.size(), b.size());\\n        else {\\n            if(a!=b) return b.size();\\n        }\\n        return -1;\\n    }"
		},
		{
			"lc_ans_id":"99433",
			"view":"735",
			"top":"9",
			"title":"c# solution",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int FindLUSlength(string a, string b) {\\n        if(a.Length!=b.Length) {\\n            return a.Length>b.Length?a.Length:b.Length;\\n        }\\n        else if(a.Equals(b)){\\n            return -1;\\n        }\\n        else{\\n            return a.Length;\\n        }\\n    }\\n}\\n```"
		}
	],
	"id":"506",
	"title":"Longest Uncommon Subsequence I ",
	"content":"<p>\r\nGiven a group of two strings, you need to find the longest uncommon subsequence of this group of two strings.\r\nThe longest uncommon subsequence is defined as the longest subsequence of one of these strings and this subsequence should not be <b>any</b> subsequence of the other strings.\r\n</p>\r\n\r\n<p>\r\nA <b>subsequence</b> is a sequence that can be derived from one sequence by deleting some characters without changing the order of the remaining elements. Trivially, any string is a subsequence of itself and an empty string is a subsequence of any string.\r\n</p>\r\n\r\n<p>\r\nThe input will be two strings, and the output needs to be the length of the longest uncommon subsequence. If the longest uncommon subsequence doesn't exist, return -1.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"aba\", \"cdc\"\r\n<b>Output:</b> 3\r\n<b>Explanation:</b> The longest uncommon subsequence is \"aba\" (or \"cdc\"), <br/>because \"aba\" is a subsequence of \"aba\", <br/>but not a subsequence of any other strings in the group of two strings. \r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<ol>\r\n<li>Both strings' lengths will not exceed 100.</li>\r\n<li>Only letters from a ~ z will appear in input strings. </li>\r\n</ol>\r\n</p>",
	"frequency":"249",
	"ac_num":"25767"
}