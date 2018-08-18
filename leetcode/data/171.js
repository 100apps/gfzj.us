{
	"difficulty":"1",
	"submit_num":"323072",
	"show_id":"171",
	"leetcode_id":"171",
	"answers":[
		{
			"lc_ans_id":"52107",
			"view":"23989",
			"top":"0",
			"title":"My solutions in 3 languages, does any one have one line solution in Java or C++?",
			"vote":"60",
			"content":"Java:\\n\\n    int result = 0;\\n    for (int i = 0; i < s.length(); result = result * 26 + (s.charAt(i) - 'A' + 1), i++);\\n    return result;\\n\\n\\nC++:\\n\\n    int result = 0;\\n    for (int i = 0; i < s.size(); result = result * 26 + (s.at(i) - 'A' + 1), i++);\\n    return result;\\n\\n\\nPython:\\n\\n    return reduce(lambda x, y : x * 26 + y, [ord(c) - 64 for c in list(s)])\\n\\nPython version is beautiful because reduce function and list comprehensive.\\n\\nI don't know whether exist similar approach to achieve one line solution in Java or C++.\\nOne possible way is defining another method like this:\\n\\n    public int titleToNumber(int num, String s)\\n\\nto store previous result and make recursive call.\\nBut this add much more lines."
		},
		{
			"lc_ans_id":"52232",
			"view":"12425",
			"top":"1",
			"title":"Asked this question on an interview",
			"vote":"47",
			"content":"I was asked of this question during an interview with microsoft. The interviewer asked whether I want a coding question or a brain teaser, I asked for the latter and here comes the question. I did not do it very well at that time, though."
		},
		{
			"lc_ans_id":"52091",
			"view":"9805",
			"top":"2",
			"title":"Here is my java solution",
			"vote":"33",
			"content":"Here is my Java solution. Similar to the number to title.\\n\\n    public int titleToNumber(String s) {\\n        int result = 0;\\n        for(int i = 0 ; i < s.length(); i++) {\\n          result = result * 26 + (s.charAt(i) - 'A' + 1);\\n        }\\n        return result;\\n      }"
		},
		{
			"lc_ans_id":"52124",
			"view":"6829",
			"top":"3",
			"title":"My 2ms JAVA solution",
			"vote":"22",
			"content":"    public class Solution {\\n        public int titleToNumber(String s) {\\n        \\n            int result  = 0;\\n            for (int i = 0; i < s.length(); i++){\\n                result *= 26;\\n                result += ((s.charAt(i) - 'A') + 1);    \\n            }\\n        \\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"52289",
			"view":"1761",
			"top":"4",
			"title":"Explanation in Python",
			"vote":"12",
			"content":"Observe that this is basically the same thing as converting between base 26 and base 10.\\n\\nStart with this:\\n\\n    def titleToNumber(s):\\n        s = s[::-1]\\n        sum = 0\\n        for exp, char in enumerate(s):\\n            sum += (ord(char) - 65 + 1) * (26 ** exp)\\n        return sum\\n\\nThis reverses the string, starts a sum at 0, creates a list of tuples of the index of each character in the reversed string (which corresponds to the exponent) and character itself. Add them up. We take ord(char) to turn the character to an integer, subtract 65 = ord('A') from it, and add one because we want A to equal 1, not 0.\\n\\nYou can do this in one line:\\n\\n    def titleToNumber(s):\\n        return sum((ord(char) - 64) * (26 ** exp) for exp, char in enumerate(s[::-1]))"
		},
		{
			"lc_ans_id":"52087",
			"view":"4099",
			"top":"5",
			"title":"One line python code using Map/Reduce",
			"vote":"12",
			"content":"    def titleToNumber(self, s):\\n        return reduce(lambda x,y:x*26+y,map(lambda x:ord(x)-ord('A')+1,s))"
		},
		{
			"lc_ans_id":"52108",
			"view":"3217",
			"top":"6",
			"title":"A 8ms C++ Solution",
			"vote":"11",
			"content":"    class Solution {\\n    public:\\n        int titleToNumber(string s) {\\n            int col = 0;\\n            for(int i = s.length(); i > 0; i--) {\\n                col += (s[i - 1] - 'A' + 1) * pow(26, (s.length() - i));\\n            }\\n            return col;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"52253",
			"view":"1178",
			"top":"7",
			"title":"2ms java solution",
			"vote":"9",
			"content":"    public class Solution {\\n        public int titleToNumber(String s) {\\n            char[] title = s.toCharArray();\\n            int number = 0;\\n            for(char c: title) {\\n                number = number * 26 + (c - 'A' + 1);\\n            }\\n            return number;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"52325",
			"view":"829",
			"top":"8",
			"title":"A 4ms C solution",
			"vote":"9",
			"content":"    int titleToNumber(char* s) {\\n        int number = 0;\\n        for (int i = 0; s[i] != 0; i++) {\\n            number = number*26 + s[i] - 'A' + 1;\\n        }\\n        return number;\\n    }\\n\\nThe question can be rephrased as \"Convert base 26 to base 10\"."
		},
		{
			"lc_ans_id":"52274",
			"view":"801",
			"top":"9",
			"title":"Easy java solution 3ms",
			"vote":"8",
			"content":"\\n    public static int titleToNumber(String s) {\\n\\t     int number=0;\\n\\t     for(int i=0;i<s.length();i++)\\n\\t     {\\n\\t    \\tnumber=26*number+(s.charAt(i)-'A')+1; \\n\\t     }\\n\\t     return number;\\n    }"
		}
	],
	"id":"171",
	"title":"Excel Sheet Column Number",
	"content":"<p>Related to question <a href=\"https://leetcode.com/problems/excel-sheet-column-title/\">Excel Sheet Column Title</a></p>\r\n<p>Given a column title as appear in an Excel sheet, return its corresponding column number.</p>\r\n\r\n<p>For example:</p>\r\n<pre>    A -&gt; 1\r\n    B -&gt; 2\r\n    C -&gt; 3\r\n    ...\r\n    Z -&gt; 26\r\n    AA -&gt; 27\r\n    AB -&gt; 28 </pre>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/ts\">@ts</a> for adding this problem and creating all test cases.</p>",
	"frequency":"560",
	"ac_num":"155512"
}