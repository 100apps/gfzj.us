{
	"difficulty":"1",
	"submit_num":"815644",
	"show_id":"9",
	"leetcode_id":"9",
	"answers":[
		{
			"lc_ans_id":"5127",
			"view":"71278",
			"top":"0",
			"title":"9-line accepted Java code, without the need of handling overflow",
			"vote":"401",
			"content":"compare half of the digits in x, so don't need to deal with overflow.\\n\\n    public boolean isPalindrome(int x) {\\n        if (x<0 || (x!=0 && x%10==0)) return false;\\n        int rev = 0;\\n        while (x>rev){\\n        \\trev = rev*10 + x%10;\\n        \\tx = x/10;\\n        }\\n        return (x==rev || x==rev/10);\\n    }"
		},
		{
			"lc_ans_id":"5165",
			"view":"34899",
			"top":"1",
			"title":"An easy c++ 8 lines code (only reversing till half and then compare)",
			"vote":"266",
			"content":"    class Solution {\\n    public:\\n        bool isPalindrome(int x) {\\n            if(x<0|| (x!=0 &&x%10==0)) return false;\\n            int sum=0;\\n            while(x>sum)\\n            {\\n                sum = sum*10+x%10;\\n                x = x/10;\\n            }\\n            return (x==sum)||(x==sum/10);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"5130",
			"view":"27071",
			"top":"2",
			"title":"This problem is meanless",
			"vote":"101",
			"content":"- Impossible to solve without extra space. Always need space for constants, variables or whatever. Recursion calls will take space for call stack.\\n\\n- If you are talking about constant space, then even declaring a string / stack will take constant space. (In fact at most (log(10, INT_MAX) * sizeof char), which is no worse than declaring an integer or more). Actually, even recursion will take constant space."
		},
		{
			"lc_ans_id":"5145",
			"view":"16252",
			"top":"3",
			"title":"-2147447412 is not a palindromic number",
			"vote":"87",
			"content":"I am wondering how the other people got their code ACed, the testing result of **\"-2147447412\"** seems a little odd to me. Should it be a palindromic number or not?\\n\\nNote: I believe the range of int is [-2147483648, 2147483647] and **\"-2147447412\"** is not overflowed, plus I handled the overflow cases already (test case \"-2147483648\" in particular).\\n\\n\\n11499 / 11502 test cases passed.\\n\\nStatus: Wrong Answer\\n\\n\\nInput:\\t-2147447412\\n\\nOutput:\\ttrue\\n\\nExpected:\\tfalse\\n\\n------------------------------------------------------------------\\nHere's my second question:\\n\\n**Why does the function take \"int\" as input instead of \"unsigned int\", when we assume all negative numbers are NOT palindromic.**"
		},
		{
			"lc_ans_id":"5188",
			"view":"22494",
			"top":"4",
			"title":"O(1) space, O(lgn) time java solution, no overflow risk",
			"vote":"64",
			"content":"    public boolean isPalindrome(int x) {\\n        \\n        if (x < 0) return false;\\n\\n        int p = x; \\n        int q = 0; \\n        \\n        while (p >= 10){\\n            q *=10; \\n            q += p%10; \\n            p /=10; \\n        }\\n        \\n        return q == x / 10 && p == x % 10;\\n    }\\n\\n// so the reversed version of int is always  1 time short in the factor of 10s . \\n\\nin case of Int16,  check 63556  will finally check if (6553 == 6355 && 6 == 63556%10)  so there will have no concerns about the overflow."
		},
		{
			"lc_ans_id":"5262",
			"view":"5404",
			"top":"5",
			"title":"Neat AC java code. O(n) time complexity.",
			"vote":"31",
			"content":"    public boolean isPalindrome(int x) {\\n            int palindromeX = 0;\\n            int inputX = x;\\n            while(x>0){\\n                palindromeX = palindromeX*10 + (x % 10);\\n                x = x/10;\\n            }\\n            return palindromeX==inputX;\\t\\n        }"
		},
		{
			"lc_ans_id":"5230",
			"view":"3942",
			"top":"6",
			"title":"7 line simple C++ solution beats 90% submissions in O(1) space, two pointers",
			"vote":"26",
			"content":"Use two pointers concept, find the half point, and compare first half and 2nd half. \\n\\nVariable ***revhalf*** is the reversed 2nd half(x has even number of digits), or 2nd half with the middle digit(if x has odd number of digits)\\n\\n    class Solution {\\n    public:\\n        bool isPalindrome(int x) {\\n            if(x < 0) return false;\\n            int revhalf = 0, slow = x, fast = x;\\n            while(fast){ \\n                revhalf = revhalf * 10 + slow % 10;\\n                slow /= 10;\\n                fast /= 100;\\n            }\\n            return slow == revhalf || slow == revhalf / 10;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"5408",
			"view":"3512",
			"top":"7",
			"title":"Simple JAVA O(1) space solution",
			"vote":"23",
			"content":"    public boolean isPalindrome(int x) {\\n        if(x<0 || (x!=0 && x%10==0))\\n        return false;\\n        int res = 0;\\n           while(x>res){\\n            res = res*10 + x%10;\\n            x = x/10;\\n           }\\n        return (x==res || x==res/10);\\n    }"
		},
		{
			"lc_ans_id":"5133",
			"view":"2708",
			"top":"8",
			"title":"My C++ solution..",
			"vote":"21",
			"content":"    class Solution {\\n\\npublic:\\n\\n    bool isPalindrome(int x) {\\n        if(x<0)\\n            return false;\\n\\n        int num=x;\\n        int a=0;\\n        while(x)\\n        {\\n            a=a*10 + x%10;\\n            x=x/10;\\n        }\\n        if(a==num)\\n            return true;\\n        else\\n            return false;\\n        \\n    }\\n};\\n\\n\\n----------\\n## Heading ##"
		},
		{
			"lc_ans_id":"5583",
			"view":"2417",
			"top":"9",
			"title":"Is this simple enough? What is the so-called generic way",
			"vote":"20",
			"content":"    class Solution {\\n    public:\\n        bool isPalindrome(int x) {\\n            int i = 0;;\\n            if ((x % 10 == 0 && x != 0) || x < 0) return false;\\n            while (i < x) {\\n                i = i * 10 + x % 10;\\n                x = x / 10;\\n            }\\n            return (i == x || i / 10 == x);        \\n        }\\n    };"
		}
	],
	"id":"9",
	"title":"Palindrome Number",
	"content":"<p>Determine whether an integer is a palindrome. Do this without extra space.</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show spoilers.</a></p>\r\n\r\n<div class=\"spoilers\"><b>Some hints:</b>\r\n\r\n<p>Could negative integers be palindromes? (ie, -1)</p>\r\n\r\n<p>If you are thinking of converting the integer to string, note the restriction of using extra space.</p>\r\n\r\n<p>You could also try reversing an integer. However, if you have solved the problem \"Reverse Integer\", you know that the reversed integer might overflow. How would you handle such case?</p>\r\n\r\n<p>There is a more generic way of solving this problem.</p>\r\n\r\n</div>",
	"frequency":"615",
	"ac_num":"290890"
}