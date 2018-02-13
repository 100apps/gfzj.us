{
	"difficulty":"1",
	"submit_num":"183725",
	"show_id":"389",
	"leetcode_id":"389",
	"answers":[
		{
			"lc_ans_id":"86825",
			"view":"28034",
			"top":"0",
			"title":"Java solution using bit manipulation",
			"vote":"109",
			"content":"```\\npublic char findTheDifference(String s, String t) {\\n\\tchar c = 0;\\n\\tfor (int i = 0; i < s.length(); ++i) {\\n\\t\\tc ^= s.charAt(i);\\n\\t}\\n\\tfor (int i = 0; i < t.length(); ++i) {\\n\\t\\tc ^= t.charAt(i);\\n\\t}\\n\\treturn c;\\n}\\n```\\n\\nmaybe a more elegant version:\\n```\\npublic char findTheDifference(String s, String t) {\\n\\tint n = t.length();\\n\\tchar c = t.charAt(n - 1);\\n\\tfor (int i = 0; i < n - 1; ++i) {\\n\\t\\tc ^= s.charAt(i);\\n\\t\\tc ^= t.charAt(i);\\n\\t}\\n\\treturn c;\\n}"
		},
		{
			"lc_ans_id":"86850",
			"view":"14458",
			"top":"1",
			"title":"Simple JAVA 8ms solution, 4 lines",
			"vote":"67",
			"content":"```\\npublic class Solution {\\n    public char findTheDifference(String s, String t) {\\n        // Initialize variables to store sum of ASCII codes for \\n        // each string\\n        int charCodeS = 0, charCodeT = 0;\\n        // Iterate through both strings and char codes\\n        for (int i = 0; i < s.length(); ++i) charCodeS += (int)s.charAt(i);\\n        for (int i = 0; i < t.length(); ++i) charCodeT += (int)t.charAt(i);\\n        // Return the difference between 2 strings as char\\n        return (char)(charCodeT - charCodeS);\\n    }\\n}\\n\\nUPDATE:\\nThanks to @zzhai for providing this optimization! :) \\n\"1 optimization: As t.length() is just 1 character longer than s.length(), we can use 1 pass to process both strings (20% better runtime performance).\"\\npublic char findTheDifference(String s, String t) {\\n        int charCode = t.charAt(s.length());\\n        // Iterate through both strings and char codes\\n        for (int i = 0; i < s.length(); ++i) {\\n              charCode -= (int)s.charAt(i);\\n              charCode += (int)t.charAt(i); \\n        }\\n        return (char)charCode;\\n    }\\n```"
		},
		{
			"lc_ans_id":"86826",
			"view":"8181",
			"top":"2",
			"title":"Concise C++ solution using XOR",
			"vote":"34",
			"content":"It is the same idea with 136. Single Number (https://leetcode.com/problems/single-number/)\\n\\n```\\nclass Solution {\\npublic:\\n    char findTheDifference(string s, string t) {\\n        char r=0;\\n        for(char c:s) r ^=c;\\n        for(char c:t) r ^=c;\\n        return r;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"86844",
			"view":"6320",
			"top":"3",
			"title":"Java Solution using array: 6ms",
			"vote":"18",
			"content":"Hi. There are several methods you can try to solve this. HashMap, Arrays, Bits, etc. Here, we're going to use a simple array of size 26 for alphabets. Then for each character in **s**, increment the count. \\n\\nThen for each character in **t**, you should decrement the count. Now if at any point, the count goes below 0, then the character isn't present in **t**\\n```int[] alpha = new int[26];\\n        for (int i = 0; i < 26; i++) alpha[i] = 0;\\n        for (char c : s.toCharArray())\\n            alpha[ c - 'a' ]++;\\n\\n        for (char c : t.toCharArray()) {\\n           //could do decrement first, then check but yeah\\n            if (--alpha[c - 'a'] < 0)\\n                return c;\\n        }\\n\\n        return 0;"
		},
		{
			"lc_ans_id":"86845",
			"view":"7743",
			"top":"4",
			"title":"1-liners and 2-liner in Python",
			"vote":"18",
			"content":"Using XOR:\\n\\n```\\nclass Solution(object):\\n    def findTheDifference(self, s, t):\\n        return chr(reduce(operator.xor, map(ord, s + t)))\\n```\\nUsing `collections.Counter()`:\\n```\\nclass Solution(object):\\n    def findTheDifference(self, s, t):\\n        return list((collections.Counter(t) - collections.Counter(s)))[0]\\n```\\nA 2-liner here using `sorted()`:\\n```\\nclass Solution(object):\\n    def findTheDifference(self, s, t):\\n        s, t = sorted(s), sorted(t)\\n        return t[-1] if s == t[:-1] else [x[1] for x in zip(s, t) if x[0] != x[1]][0]\\n```"
		},
		{
			"lc_ans_id":"86904",
			"view":"2252",
			"top":"5",
			"title":"3 Different Python Solutions (Dictionary, Difference, XOR)",
			"vote":"16",
			"content":"```\\nclass Solution(object):\\n    \"\"\"\\n    dictionary\\n    \"\"\"\\n    def findTheDifference(self, s, t):\\n        dic = {}\\n        for ch in s:\\n            dic[ch] = dic.get(ch, 0) + 1\\n        for ch in t:\\n            if dic.get(ch, 0) == 0:\\n                return ch\\n            else:\\n                dic[ch] -= 1\\n```\\n\\n```\\nclass Solution(object):\\n    \"\"\"\\n    difference\\n    \"\"\"\\n    def findTheDifference(self, s, t):\\n        diff = 0\\n        for i in range(len(s)):\\n            diff -= ord(s[i])\\n            diff += ord(t[i])\\n        diff += ord(t[-1])\\n        return chr(diff)\\n```\\n\\n```\\nclass Solution(object):\\n    \"\"\"\\n    xor\\n    \"\"\"\\n    def findTheDifference(self, s, t):\\n        code = 0\\n        for ch in s + t:\\n            code ^= ord(ch)\\n        return chr(code)\\n```"
		},
		{
			"lc_ans_id":"86881",
			"view":"1705",
			"top":"6",
			"title":"Python solution which beats 96%",
			"vote":"11",
			"content":"    def findTheDifference(self, s, t):\\n        \"\"\"\\n        :type s: str\\n        :type t: str\\n        :rtype: str\\n        \"\"\"\\n        ans = 0\\n        for c in s + t:\\n            ans ^= ord(c)\\n        return chr(ans)\\n\\nI used XOR to find a single character."
		},
		{
			"lc_ans_id":"86855",
			"view":"637",
			"top":"7",
			"title":"Output:\"e\" Expected:'e'",
			"vote":"10",
			"content":"What is wrong with leetcode judging system?\\nNo matter what language I try, it always says:\\n--> Output:\"e\" Expected:'e'\\nAren't them the same :| ?"
		},
		{
			"lc_ans_id":"86828",
			"view":"1820",
			"top":"8",
			"title":"Java 5 ms Beats 98.12%",
			"vote":"10",
			"content":"```public class Solution {\\n    public char findTheDifference(String s, String t) {\\n        char[] array1 = s.toCharArray();\\n        char[] array2 = t.toCharArray();\\n        \\n        int asciis = 0;\\n        int asciit = 0;\\n        \\n        for(int i = 0; i < array1.length; i++){\\n            asciis += (int)array1[i];\\n        }\\n        \\n        for(int i = 0; i < array2.length; i++){\\n            asciit += (int)array2[i];\\n        }\\n        \\n        return (char)(asciit-asciis);\\n    }\\n}```"
		},
		{
			"lc_ans_id":"86870",
			"view":"803",
			"top":"9",
			"title":"Javascript solution using sum of characters",
			"vote":"8",
			"content":"```\\nvar findTheDifference = function(s, t) {\\n    if (s.length === 0) return t;\\n    var letters = 'abcdefghijklmnopqrstuvwxyz';\\n    var sSum = s.split('').map(e => e.charCodeAt(0) - 'a'.charCodeAt(0)).reduce((a, b) => a + b);\\n    var tSum = t.split('').map(e => e.charCodeAt(0) - 'a'.charCodeAt(0)).reduce((a, b) => a + b);\\n    return letters[tSum -sSum];\\n};\\n```"
		}
	],
	"id":"389",
	"title":"Find the Difference",
	"content":"<p>\r\nGiven two strings <b><i>s</i></b> and <b><i>t</i></b> which consist of only lowercase letters.</p>\r\n\r\n<p>String <b><i>t</i></b> is generated by random shuffling string <b><i>s</i></b> and then add one more letter at a random position.</p>\r\n\r\n<p>Find the letter that was added in <b><i>t</i></b>.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nInput:\r\ns = \"abcd\"\r\nt = \"abcde\"\r\n\r\nOutput:\r\ne\r\n\r\nExplanation:\r\n'e' is the letter that was added.\r\n</pre>",
	"frequency":"370",
	"ac_num":"93969"
}