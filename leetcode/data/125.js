{
	"difficulty":"1",
	"submit_num":"757402",
	"show_id":"125",
	"leetcode_id":"125",
	"answers":[
		{
			"lc_ans_id":"40029",
			"view":"35899",
			"top":"0",
			"title":"Accepted pretty Java solution(271ms)",
			"vote":"72",
			"content":"    public class Solution {\\n        public boolean isPalindrome(String s) {\\n            if (s.isEmpty()) {\\n            \\treturn true;\\n            }\\n            int head = 0, tail = s.length() - 1;\\n            char cHead, cTail;\\n            while(head <= tail) {\\n            \\tcHead = s.charAt(head);\\n            \\tcTail = s.charAt(tail);\\n            \\tif (!Character.isLetterOrDigit(cHead)) {\\n            \\t\\thead++;\\n            \\t} else if(!Character.isLetterOrDigit(cTail)) {\\n            \\t\\ttail--;\\n            \\t} else {\\n            \\t\\tif (Character.toLowerCase(cHead) != Character.toLowerCase(cTail)) {\\n            \\t\\t\\treturn false;\\n            \\t\\t}\\n            \\t\\thead++;\\n            \\t\\ttail--;\\n            \\t}\\n            }\\n            \\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"40048",
			"view":"15222",
			"top":"1",
			"title":"Here's a clean C++ solution",
			"vote":"59",
			"content":"    bool isPalindrome(string s) {\\n        for (int i = 0, j = s.size() - 1; i < j; i++, j--) { // Move 2 pointers from each end until they collide\\n            while (isalnum(s[i]) == false && i < j) i++; // Increment left pointer if not alphanumeric\\n            while (isalnum(s[j]) == false && i < j) j--; // Decrement right pointer if no alphanumeric\\n            if (toupper(s[i]) != toupper(s[j])) return false; // Exit and return error if not match\\n        }\\n        \\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"39981",
			"view":"15127",
			"top":"2",
			"title":"My three line java solution",
			"vote":"55",
			"content":"    public class Solution {\\n        public boolean isPalindrome(String s) {\\n            String actual = s.replaceAll(\"[^A-Za-z0-9]\", \"\").toLowerCase();\\n            String rev = new StringBuffer(actual).reverse().toString();\\n            return actual.equals(rev);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"39982",
			"view":"8520",
			"top":"3",
			"title":"Python in-place two-pointer solution.",
			"vote":"32",
			"content":"        \\n    def isPalindrome(self, s):\\n        l, r = 0, len(s)-1\\n        while l < r:\\n            while l < r and not s[l].isalnum():\\n                l += 1\\n            while l <r and not s[r].isalnum():\\n                r -= 1\\n            if s[l].lower() != s[r].lower():\\n                return False\\n            l +=1; r -= 1\\n        return True"
		},
		{
			"lc_ans_id":"40261",
			"view":"4869",
			"top":"4",
			"title":"Passed clean c++ code",
			"vote":"29",
			"content":"    bool isPalindrome(string s) {\\n\\t\\tint start=0, end=s.length()-1;\\n\\t\\twhile(start<end) {\\n\\t\\t\\tif (!isalnum(s[start])) start++;\\n\\t\\t\\telse if (!isalnum(s[end])) end--;\\n\\t\\t\\telse {\\n\\t\\t\\t\\tif (tolower(s[start++])!=tolower(s[end--])) return false;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn true;\\n    }"
		},
		{
			"lc_ans_id":"40094",
			"view":"3738",
			"top":"5",
			"title":"Challenge me - Shortest possible answer in python for Valid Palindrome (Life is short, we need python)",
			"vote":"21",
			"content":"    class Solution:\\n    def isPalindrome(self, s):\\n        newS= [i.lower() for i in s if i.isalnum()]\\n        return newS == newS[::-1]\\n        #return newS[:len(newS)/2] == newS[(len(newS)+1)/2:][::-1]  # This one is better, but too long"
		},
		{
			"lc_ans_id":"40095",
			"view":"7177",
			"top":"6",
			"title":"Any other easy solution beside using regex?",
			"vote":"20",
			"content":"    s=s.toLowerCase();\\n\\t\\ts=s.replaceAll(\"[^0-9a-zA-Z]\", \"\");\\n\\t\\tchar c[]=s.toCharArray();\\n\\t\\tint counthead=0,counttail=s.length()-1;\\n\\t\\twhile(counthead<=s.length()-1&&counttail>=0){\\n\\t\\t\\tif(c[counthead]!=c[counttail]) return false;\\n\\t\\t\\tcounthead++;\\n\\t\\t\\tcounttail--;\\n\\t\\t}\\n\\t\\treturn true;\\n\\nI have tried normal way but it is complex to judge if a char is not alphanumeric"
		},
		{
			"lc_ans_id":"40385",
			"view":"2653",
			"top":"7",
			"title":"Neat O(n), O(1) solution with isalnum()",
			"vote":"19",
			"content":"    class Solution {\\n    public:\\n    \\tbool isPalindrome(string s) {\\n    \\n    \\t\\tint i = 0, j = s.size() - 1;\\n    \\t\\twhile(i < j)\\n    \\t\\t{\\n    \\t\\t\\twhile(i < j && !isalnum(s[i])) i++;\\n    \\t\\t\\twhile(i < j && !isalnum(s[j])) j--;\\n    \\t\\t\\tif (toupper(s[i])!=toupper(s[j]))\\n    \\t\\t\\t\\treturn false;\\n    \\t\\t\\ti++;j--;\\n    \\t\\t}\\n    \\t\\treturn true;\\n    \\t}\\n    };"
		},
		{
			"lc_ans_id":"40142",
			"view":"1233",
			"top":"8",
			"title":"C solution, 9 lines, 4ms, using pointer",
			"vote":"14",
			"content":"    bool isPalindrome(char* s) {\\n        int len = strlen(s);\\n        if(!len) return true;\\n        char *p1 = s, *p2 = s + len - 1;\\n        while(p1 < p2){\\n            if(!isalnum(*p1)){p1++;continue;}\\n            if(!isalnum(*p2)){p2--;continue;}\\n            if(tolower(*p1++) != tolower(*p2--)) return false;\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"40215",
			"view":"2788",
			"top":"9",
			"title":"Two lines in Java",
			"vote":"14",
			"content":"    s=s.toLowerCase().replaceAll(\"[^a-z0-9]\", \"\");\\n    return new StringBuilder(s).reverse().toString().equals(s);"
		}
	],
	"id":"125",
	"title":"Valid Palindrome",
	"content":"<p>\r\nGiven a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\n<code>\"A man, a plan, a canal: Panama\"</code> is a palindrome.<br />\r\n<code>\"race a car\"</code> is <i>not</i> a palindrome.\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br />\r\nHave you consider that the string might be empty? This is a good question to ask during an interview.</p>\r\n<p>\r\nFor the purpose of this problem, we define empty string as valid palindrome.\r\n</p>",
	"frequency":"433",
	"ac_num":"203189"
}