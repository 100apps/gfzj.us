{
	"difficulty":"1",
	"submit_num":"92615",
	"show_id":"520",
	"leetcode_id":"520",
	"answers":[
		{
			"lc_ans_id":"99248",
			"view":"13830",
			"top":"0",
			"title":"3 Lines",
			"vote":"46",
			"content":"```\\npublic class Solution {\\n    public boolean detectCapitalUse(String word) {\\n        int cnt = 0;\\n        for(char c: word.toCharArray()) if('Z' - c >= 0) cnt++;\\n        return ((cnt==0 || cnt==word.length()) || (cnt==1 && 'Z' - word.charAt(0)>=0));\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99249",
			"view":"7425",
			"top":"1",
			"title":"Python has useful methods...",
			"vote":"41",
			"content":"    def detectCapitalUse(self, word):\\n        return word.isupper() or word.islower() or word.istitle()"
		},
		{
			"lc_ans_id":"99298",
			"view":"12299",
			"top":"2",
			"title":"Java 1-Liner",
			"vote":"36",
			"content":"Regex again.\\n\\n```Java\\npublic boolean detectCapitalUse(String word) {\\n    return word.matches(\"[A-Z]+|[a-z]+|[A-Z][a-z]+\");\\n}\\n```"
		},
		{
			"lc_ans_id":"99274",
			"view":"7240",
			"top":"3",
			"title":"Simple Java Solution O(n) time O(1) space",
			"vote":"21",
			"content":"```\\n    public boolean detectCapitalUse(String word) {\\n        return word.equals(word.toUpperCase()) || \\n               word.equals(word.toLowerCase()) ||\\n               Character.isUpperCase(word.charAt(0)) && \\n               word.substring(1).equals(word.substring(1).toLowerCase());\\n    }\\n```\\n\\nA slightly more verbose, but more efficient solution:\\n\\n```\\n    public boolean detectCapitalUse(String word) {\\n        int numUpper = 0;\\n        for (int i=0;i<word.length();i++)\\n            if (Character.isUpperCase(word.charAt(i))) numUpper++;\\n        if (numUpper == 1) return Character.isUpperCase(word.charAt(0));\\n        return numUpper == 0 || numUpper == word.length();\\n    }\\n\\n```"
		},
		{
			"lc_ans_id":"99279",
			"view":"2740",
			"top":"4",
			"title":"Java short solution using built-in String methods",
			"vote":"15",
			"content":"The string can be correctly capitalized if either: it's shorter than 2 characters, or if it's all lower case, or if it's all upper case, or if from position 1 onward there are only lowercase letters.\\n```\\npublic boolean detectCapitalUse(String word) {\\n        if (word.length() < 2) return true;\\n        if (word.toUpperCase().equals(word)) return true;\\n        if (word.substring(1).toLowerCase().equals(word.substring(1))) return true;\\n        return false;\\n}\\n```"
		},
		{
			"lc_ans_id":"99267",
			"view":"1936",
			"top":"5",
			"title":"C++ Solution",
			"vote":"10",
			"content":"```\\nclass Solution {\\npublic:\\n    bool detectCapitalUse(string word) {\\n\\t\\tint size=word.size(),count=0;\\n\\t\\tif(size<=1)\\n\\t\\t\\treturn true;\\n\\t\\tfor (int i = 1; i < size; i++){\\n\\t\\t\\tif(word[i]>='a'&&word[i]<='z')\\n\\t\\t\\t\\tcount+=1;\\n\\t\\t\\telse\\n\\t\\t\\t\\tcount+=2;\\n\\t\\t}\\n\\t\\tif(count==size-1)\\n\\t\\t\\treturn true;\\n\\t\\telse if(count==2*(size-1))\\n\\t\\t\\treturn word[0]>='A'&&word[0]<='Z';\\n\\t\\telse \\n\\t\\t\\treturn false;\\n    }\\n};\\n```\\nFrom 1~size-1,if we meet with a-z,we add 1,else we add 2.Then we can get the result that if the second to last letter is all lowercase or all upcase."
		},
		{
			"lc_ans_id":"99385",
			"view":"325",
			"top":"6",
			"title":"Intuitive Javascript Solution",
			"vote":"5",
			"content":"```\\nvar detectCapitalUse = function(word) {\\n    // either all capitals, all small cases, or Capital follow by small cases\\n    return /^[A-Z]+$|^[a-z]+$|^[A-Z][a-z]+$/.test(word);\\n};\\n```"
		},
		{
			"lc_ans_id":"99367",
			"view":"426",
			"top":"7",
			"title":"C++ 1-liner",
			"vote":"3",
			"content":"May be duplicate with other posts.\\n\\n```\\nclass Solution {\\npublic:\\n    bool detectCapitalUse(string word) {\\n        return regex_match(word, regex(\"[A-Z]+|[a-z]+|[A-Z][a-z]*\"));\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99343",
			"view":"1304",
			"top":"8",
			"title":"6ms 2 lines C++ solution",
			"vote":"3",
			"content":"```\\nclass Solution {\\npublic:\\n    bool detectCapitalUse(string word) {\\n        int capCnt = count_if(word.begin(), word.end(), [](char c){return c <= 'Z';});\\n        return !capCnt || capCnt == word.size() || (capCnt == 1 && word[0] <= 'Z');\\n    }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"99300",
			"view":"153",
			"top":"9",
			"title":"1-line JavaScript solution, no regex",
			"vote":"2",
			"content":"```\\nvar detectCapitalUse = function(word) {\\n    return word === word.toUpperCase() || word === word[0] + word.substr(1).toLowerCase();\\n};\\n```"
		}
	],
	"id":"505",
	"title":"Detect Capital",
	"content":"<p>\r\nGiven a word, you need to judge whether the usage of capitals in it is right or not.\r\n</p>\r\n\r\n<p>\r\nWe define the usage of capitals in a word to be right when one of the following cases holds:\r\n<ol>\r\n<li>All letters in this word are capitals, like \"USA\".</li>\r\n<li>All letters in this word are not capitals, like \"leetcode\".</li>\r\n<li>Only the first letter in this word is capital if it has more than one letter, like \"Google\".</li>\r\n</ol>\r\nOtherwise, we define that this word doesn't use capitals in a right way.\r\n</p>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"USA\"\r\n<b>Output:</b> True\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"FlaG\"\r\n<b>Output:</b> False\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe input will be a non-empty word consisting of uppercase and lowercase latin letters.\r\n</p>",
	"frequency":"188",
	"ac_num":"48182"
}