{
	"difficulty":"1",
	"submit_num":"467902",
	"show_id":"168",
	"leetcode_id":"168",
	"answers":[
		{
			"lc_ans_id":"51398",
			"view":"37112",
			"top":"0",
			"title":"My 1 lines code in Java, C++, and Python",
			"vote":"173",
			"content":"Java:\\n\\n    return n == 0 ? \"\" : convertToTitle(--n / 26) + (char)('A' + (n % 26));\\n\\nC++:\\n\\n    return n == 0 ? \"\" : convertToTitle(n / 26) + (char) (--n % 26 + 'A');\\n\\nupdate: because the behavior of different compilers, the safe version should be:\\n\\n    return n == 0 ? \"\" : convertToTitle((n - 1) / 26) + (char) ((n - 1) % 26 + 'A');\\n\\nPython:\\n\\n    return \"\" if num == 0 else self.convertToTitle((num - 1) / 26) + chr((num - 1) % 26 + ord('A'))"
		},
		{
			"lc_ans_id":"51399",
			"view":"22066",
			"top":"1",
			"title":"Accepted Java solution",
			"vote":"96",
			"content":"    public class Solution {\\n        public String convertToTitle(int n) {\\n            StringBuilder result = new StringBuilder();\\n    \\n            while(n>0){\\n                n--;\\n                result.insert(0, (char)('A' + n % 26));\\n                n /= 26;\\n            }\\n    \\n            return result.toString();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"51421",
			"view":"7708",
			"top":"2",
			"title":"Share my simple solution, just a little trick to handle corner case 26",
			"vote":"45",
			"content":"    string convertToTitle(int n) {\\n            string ans;\\n            while (n) {\\n                ans = char ((n - 1) % 26 + 'A') + ans;\\n                n = (n - 1) / 26;\\n            }\\n            return ans;\\n        }"
		},
		{
			"lc_ans_id":"51404",
			"view":"6943",
			"top":"3",
			"title":"Python solution with explanation",
			"vote":"42",
			"content":"Let's see the relationship between the Excel sheet column title and the number:\\n\\n    A   1     AA    26+ 1     BA  2\\xd726+ 1     ...     ZA  26\\xd726+ 1     AAA  1\\xd726\\xb2+1\\xd726+ 1\\n    B   2     AB    26+ 2     BB  2\\xd726+ 2     ...     ZB  26\\xd726+ 2     AAB  1\\xd726\\xb2+1\\xd726+ 2\\n    .   .     ..    .....     ..  .......     ...     ..  ........     ...  .............   \\n    .   .     ..    .....     ..  .......     ...     ..  ........     ...  .............\\n    .   .     ..    .....     ..  .......     ...     ..  ........     ...  .............\\n    Z  26     AZ    26+26     BZ  2\\xd726+26     ...     ZZ  26\\xd726+26     AAZ  1\\xd726\\xb2+1\\xd726+26\\n\\nNow we can see that ABCD\\uff1dA\\xd726\\xb3\\uff0bB\\xd726\\xb2\\uff0bC\\xd726\\xb9\\uff0bD\\uff1d1\\xd726\\xb3\\uff0b2\\xd726\\xb2\\uff0b3\\xd726\\xb9\\uff0b4\\n\\nBut how to get the column title from the number? We can't simply use the n%26 method because:\\n\\nZZZZ\\uff1dZ\\xd726\\xb3\\uff0bZ\\xd726\\xb2\\uff0bZ\\xd726\\xb9\\uff0bZ\\uff1d26\\xd726\\xb3\\uff0b26\\xd726\\xb2\\uff0b26\\xd726\\xb9\\uff0b26\\n\\nWe can use (n-1)%26 instead, then we get a number range from 0 to 25.\\n\\n    class Solution:\\n        # @return a string\\n        def convertToTitle(self, num):\\n            capitals = [chr(x) for x in range(ord('A'), ord('Z')+1)]\\n            result = []\\n            while num > 0:\\n                result.append(capitals[(num-1)%26])\\n                num = (num-1) // 26\\n            result.reverse()\\n            return ''.join(result)"
		},
		{
			"lc_ans_id":"51401",
			"view":"8581",
			"top":"4",
			"title":"My easy to understand JAVA solution",
			"vote":"38",
			"content":"Instead of 1 -> A, 26 -> Z, we can assume that 0 -> A, 25 -> Z, and then here comes the base 26 representation, it's similar when you convert a number from base 10 to base 2\\n\\n    public class Solution {\\n    public String convertToTitle(int n) {\\n        String res = \"\";\\n        while(n != 0) {\\n            char ch = (char)((n - 1) % 26 + 65);\\n            n = (n - 1) / 26;\\n            res = ch + res;\\n        }\\n        return res;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"51541",
			"view":"4088",
			"top":"5",
			"title":"Readable C++ code within 1ms",
			"vote":"29",
			"content":"class Solution {\\n\\npublic:\\n\\n    string convertToTitle(int n) {\\n\\n        string res;\\n\\n        char tmp;\\n\\n        while(n){\\n\\n            n -= 1;\\n\\n            tmp = 'A' + n % 26;\\n\\n            res = tmp + res;\\n\\n            n /= 26;\\n\\n        }\\n\\n        return res;\\n\\n    }\\n\\n};"
		},
		{
			"lc_ans_id":"51532",
			"view":"2366",
			"top":"6",
			"title":"Share my java solusion",
			"vote":"25",
			"content":"    public String convertToTitle(int n) {\\n            String res = \"\";\\n            while(n != 0) {\\n                res = (char)('A' + (n - 1) % 26) + res;\\n                n = (n - 1) / 26;\\n            }\\n            return res;\\n    }"
		},
		{
			"lc_ans_id":"51543",
			"view":"1102",
			"top":"7",
			"title":"Note the difference between this counting system and the normal base-10 system",
			"vote":"23",
			"content":"consider the letter 'A' to have a value of 1, 'B'->2 ..... 'Z'->26\\nnote that in the above notation, values are 1-based\\n\\nhere our Radix (R) == 26\\n\\nthe final value of a number X Y Z = X * R^2 + Y * R + Z\\n\\nthis looks similar to base-10 decimal number but the biggest difference is that the numbers on every digit starts with 1, instead of 0., and the max on each digit goes up to R (Radix) instead of R-1\\n\\nfor example\\nZ== Radix\\nthen next number is AA = R + 1 = Z+1\\nZZ = R * R + R\\nnext number is  AAA = 1*R^2 + 1 * R + 1 = ZZ +1\\n\\nso from the AAA notation to their sequence number (decimal) it's easy, but the other way is a bit tricky due to the way % and / operates"
		},
		{
			"lc_ans_id":"51465",
			"view":"2719",
			"top":"8",
			"title":"Solution with Explanation",
			"vote":"17",
			"content":"The idea behind this problem is as follows: \\n\\nConsider getting the characters for 28: It's 26^1 * (first Character) + 26^0 * (second Character), which in this case is 26*'A' + 1*'B' . Therefore to get the last character mod by 26. Then to get the character prior to that divide by 26 then mod by 26 and so on till what remains is zero.\\n\\n    string convertToTitle(int n) {\\n    \\tstring res=\"\";\\n        while(n>0){\\n    \\t\\tres=char('A'+(n-1)%26)+res;\\n    \\t\\tn=(n-1)/26;\\n    \\t}\\n    \\treturn res;\\n    }"
		},
		{
			"lc_ans_id":"51561",
			"view":"809",
			"top":"9",
			"title":"Straightforward Python solution",
			"vote":"13",
			"content":"Conversion from 10-ary numbers to 26-ary numbers. The tricky part is the lack of the equivalent number '0' in the 26-ary system.\\n\\n    def convertToTitle(self, n):\\n        r = ''\\n        while(n>0):\\n            n -= 1\\n            r = chr(n%26+65) + r\\n            n /= 26\\n        return r"
		}
	],
	"id":"168",
	"title":"Excel Sheet Column Title",
	"content":"<p>Given a positive integer, return its corresponding column title as appear in an Excel sheet.</p>\r\n\r\n<p>For example:</p>\r\n<pre>\r\n    1 -> A\r\n    2 -> B\r\n    3 -> C\r\n    ...\r\n    26 -> Z\r\n    27 -> AA\r\n    28 -> AB </pre>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/ifanchu\">@ifanchu</a> for adding this problem and creating all test cases.</p>",
	"frequency":"429",
	"ac_num":"126361"
}