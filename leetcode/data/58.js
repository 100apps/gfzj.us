{
	"difficulty":"1",
	"submit_num":"550309",
	"show_id":"58",
	"leetcode_id":"58",
	"answers":[
		{
			"lc_ans_id":"21892",
			"view":"9869",
			"top":"0",
			"title":"7-lines 4ms C++ Solution",
			"vote":"83",
			"content":"Well, the basic idea is very simple. Start from the tail of `s` and move backwards to find the first non-space character. Then from this character, move backwards and count the number of non-space characters until we pass over the head of `s` or meet a space character. The count will then be the length of the last word.\\n\\n    class Solution {\\n    public:\\n        int lengthOfLastWord(string s) { \\n            int len = 0, tail = s.length() - 1;\\n            while (tail >= 0 && s[tail] == ' ') tail--;\\n            while (tail >= 0 && s[tail] != ' ') {\\n                len++;\\n                tail--;\\n            }\\n            return len;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"21955",
			"view":"17198",
			"top":"1",
			"title":"My simple solution in C++",
			"vote":"64",
			"content":"I've noticed that a lot of solutions use available library functions that return directly the positions of certain characters or do other operations like \"split\". I personally don't think that's a good idea. Firstly, these functions take some time and usually involve with iteration through the whole string. Secondly, questions like this one is intended to be a practice of detail implementation, not calling other functions. My solution like below uses only the most basic string operations and probably beats many other solutions which call other existing functions.\\n\\n     int lengthOfLastWord(const char* s) {\\n            int len = 0;\\n            while (*s) {\\n                if (*s++ != ' ')\\n                    ++len;\\n                else if (*s && *s != ' ')\\n                    len = 0;\\n        \\n            }\\n            return len;\\n        }"
		},
		{
			"lc_ans_id":"21878",
			"view":"19362",
			"top":"2",
			"title":"A single line of Code in Java",
			"vote":"47",
			"content":"    public int lengthOfLastWord(String s) {\\n        return s.trim().length()-s.trim().lastIndexOf(\" \")-1;\\n    }"
		},
		{
			"lc_ans_id":"21944",
			"view":"7147",
			"top":"3",
			"title":"This problem is not fun at all.",
			"vote":"29",
			"content":"This problem is not fun at all.\\n\\nYou spend 0.1% of the time on thinking of the algorithm, while 99.9% of the time on fighting against the ' ' and 'a' cases."
		},
		{
			"lc_ans_id":"21927",
			"view":"8326",
			"top":"4",
			"title":"My 3 line 0 ms java solution",
			"vote":"16",
			"content":"        public int lengthOfLastWord(String s) {\\n    \\ts = s.trim();\\n        int lastIndex = s.lastIndexOf(' ') + 1;\\n        return s.length() - lastIndex;        \\n    }"
		},
		{
			"lc_ans_id":"22201",
			"view":"1652",
			"top":"5",
			"title":"228ms Java Solution",
			"vote":"13",
			"content":"1 - Use 2 loops. One to locate the last non-space character, one to count.\\n\\n\\n    public int lengthOfLastWord(String s) {\\n        //228ms\\n        int lenIndex = s.length()-1;\\n        int len = 0;\\n\\n        /*can also use while here, resulting in 264ms\\n        while (lenIndex>=0 && s.charAt(lenIndex)==' ') lenIndex--;*/\\n        \\n        /*or use trim - 324ms\\n        s = s.trim();*/\\n\\n        for (int i=lenIndex; i>=0 && s.charAt(i)==' '; i--) \\n            lenIndex--;\\n        \\n        for (int i=lenIndex; i>=0 && s.charAt(i)!=' '; i--) \\n            len++;\\n        return len;\\n    }\\n\\n\\n\\n\\n2 - Use split\\n\\n        //292ms\\n        String[] words = s.split(\" \");\\n        if (words.length==0) return 0;\\n        else return words[words.length-1].length();\\n \\n\\n3 - use lastIndexOf\\n       \\n        //308ms\\n        return s.trim().length() - s.trim().lastIndexOf(\" \") - 1;"
		},
		{
			"lc_ans_id":"21901",
			"view":"4255",
			"top":"6",
			"title":"One line Python solution",
			"vote":"13",
			"content":"    def lengthOfLastWord(self, s):\\n        return len(s.rstrip(' ').split(' ')[-1])\\n\\nI know this is not the solution that the question wants. Just for fun."
		},
		{
			"lc_ans_id":"22061",
			"view":"2075",
			"top":"7",
			"title":"Simple java solution",
			"vote":"12",
			"content":"\\n    public int lengthOfLastWord(String s) {\\n        String use = s.trim();\\n        int count = 0;\\n        for (int i = use.length() - 1; i >= 0; i--) {\\n            if (use.charAt(i) != ' ') count++;\\n            else break;\\n        }\\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"22049",
			"view":"2076",
			"top":"8",
			"title":"My C++ Solution",
			"vote":"9",
			"content":"    class Solution {\\n    public:\\n        int lengthOfLastWord(const char *s) {\\n            int len = strlen(s);\\n    \\t\\tif (!len) return 0;\\n    \\t\\tint n=0,  i = len-1;\\n    \\t\\twhile (s[i] == ' ') i--;\\n    \\t\\tfor (; i >= 0; i--,n++)\\n    \\t\\t\\tif (s[i] == ' ')\\n    \\t\\t\\t\\treturn n;\\n    \\t\\treturn n;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"21961",
			"view":"1887",
			"top":"9",
			"title":"My 36 ms Python solution",
			"vote":"8",
			"content":"\\n    def lengthOfLastWord(self, s):\\n        ls = len(s)\\n        # slow and fast pointers\\n        slow = -1\\n        # iterate over trailing spaces\\n        while slow >= -ls and s[slow] == ' ':\\n            slow-=1\\n        fast = slow\\n        # iterate over last word\\n        while fast >= -ls and s[fast] != ' ':\\n            fast-=1\\n        return slow - fast"
		}
	],
	"id":"58",
	"title":"Length of Last Word",
	"content":"<p>Given a string <i>s</i> consists of upper/lower-case alphabets and empty space characters <code>' '</code>, return the length of last word in the string.</p>\r\n\r\n<p>If the last word does not exist, return 0.</p>\r\n\r\n<p><b>Note:</b> A word is defined as a character sequence consists of non-space characters only.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n<b>Input:</b> \"Hello World\"\r\n<b>Output:</b> 5\r\n</pre>\r\n</p>",
	"frequency":"379",
	"ac_num":"176336"
}