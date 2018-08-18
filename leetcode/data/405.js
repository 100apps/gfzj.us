{
	"difficulty":"1",
	"submit_num":"76439",
	"show_id":"405",
	"leetcode_id":"405",
	"answers":[
		{
			"lc_ans_id":"89253",
			"view":"17538",
			"top":"0",
			"title":"Simple Java solution with comment",
			"vote":"80",
			"content":"```\\n/*\\nBasic idea: each time we take a look at the last four digits of\\n            binary verion of the input, and maps that to a hex char\\n            shift the input to the right by 4 bits, do it again\\n            until input becomes 0.\\n\\n*/\\n\\npublic class Solution {\\n    \\n    char[] map = {'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'};\\n    \\n    public String toHex(int num) {\\n        if(num == 0) return \"0\";\\n        String result = \"\";\\n        while(num != 0){\\n            result = map[(num & 15)] + result; \\n            num = (num >>> 4);\\n        }\\n        return result;\\n    }\\n    \\n    \\n}````"
		},
		{
			"lc_ans_id":"89238",
			"view":"5230",
			"top":"1",
			"title":"Concise C++ Solution",
			"vote":"17",
			"content":"```\\nconst string HEX = \"0123456789abcdef\";\\nclass Solution {\\npublic:\\n    string toHex(int num) {\\n        if (num == 0) return \"0\";\\n        string result;\\n        int count = 0;\\n        while (num && count++ < 8) {\\n            result = HEX[(num & 0xf)] + result;\\n            num >>= 4;\\n        }\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"89261",
			"view":"2122",
			"top":"2",
			"title":"easy 10-line python solution with inline explanation",
			"vote":"13",
			"content":"```\\n    def toHex(self, num):\\n        if num==0: return '0'\\n        mp = '0123456789abcdef'  # like a map\\n        ans = ''\\n        for i in range(8):\\n            n = num & 15       # this means num & 1111b\\n            c = mp[n]          # get the hex char \\n            ans = c + ans\\n            num = num >> 4\\n        return ans.lstrip('0')  #strip leading zeroes\\n```"
		},
		{
			"lc_ans_id":"89326",
			"view":"3300",
			"top":"3",
			"title":"1-liner in Python",
			"vote":"13",
			"content":"```\\nclass Solution(object):\\n    def toHex(self, num):\\n        return   ''.join(\\n                        '0123456789abcdef'[(num >> 4 * i) & 15] \\n                        for i in range(8)\\n                        )[::-1].lstrip('0') or '0'\\n```"
		},
		{
			"lc_ans_id":"89244",
			"view":"3957",
			"top":"4",
			"title":"[JAVA] Clean Code with Explanations and Running Time [2 Solutions]",
			"vote":"9",
			"content":"<h3>[JAVA] Clean Code with Explanations and Running Time [2 Solutions]</h3>\\n<a href=https://ratchapong.com/algorithm-practice/leetcode/convert-a-number-to-hexadecimal>Full Solutions and Explanations</a>\\n<h3><b>Solution 1</b></h3>\\n```\\npublic class Solution {\\n    public String toHex(int num) {\\n        long n = num & 0x00000000ffffffffL;\\n        char[] map = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};\\n        StringBuilder sb = new StringBuilder();\\n        while (n > 0) {\\n            sb.insert(0, map[(int) (n % 16)]);\\n            n = n / 16;\\n        }\\n        return num == 0 ? \"0\" : sb.toString();\\n    }\\n}\\n```\\n\\n<div class=\"margin-bottom-20\"><h4 class=\"text-uppercase margin-bottom-10\">Complexity Analysis</h4><p>Uniform cost model is used as Cost Model and `n` is the input number. `b` in this case would be `16.</p><p><b>Time Complexity:</b><ul><li>Best Case `O(log_b(n))` : With respect to the input, the algorithm will always depend on the size of input.</li><li>Average Case `O(log_b(n))` : With respect to the input, the algorithm will always depend on the size of input.</li><li>Worst Case `O(log_b(n))` : With respect to the input, the algorithm will always depend on the size of input.</li></ul></p><p><b>Auxiliary Space:</b><ul><li>Worst Case `O(log_b(n))` : With respect to the input, the algorithm will always depend on the size of input.</li></ul></p></div><div class=\"margin-bottom-20\"><h4 class=\"text-uppercase margin-bottom-10\">Algorithm</h4><p><b>Approach:</b> Divide and Modding</p><p>To deal with negative number, the number is masked against <code>long</code> data type. This process will convert it to a positive long number. A simple while loop is then use to extract each base digit until number becomes `0`.</p><p>For <code>Integer.MAX_VALUE</code> or <code>Integer.MIN_VALUE</code> or any input with 8 Hexadecimal characters where the iterations would last the longest. For <code>Integer.MAX_VALUE</code> the algorithm will run for at most `ceil(log_16 (2^31 - 1) + 1) = 8` times.</p></div>\\n<hr>\\n\\n<h3><b>Solution 2</b></h3>\\n```\\npublic class Solution {\\n    public String toHex(int num) {\\n        if (num == 0) return \"0\";\\n        char[] map = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};\\n        StringBuilder sb = new StringBuilder();\\n        while (num != 0) {\\n            sb.insert(0, map[num & 0b1111]);\\n            num = num >>> 4;\\n        }\\n        return sb.toString();\\n    }\\n}\\n```\\n\\n<div class=\"margin-bottom-20\"><h4 class=\"text-uppercase margin-bottom-10\">Complexity Analysis</h4><p>Uniform cost model is used as Cost Model and `n` is the input number. `b` in this case would be `16.</p><p><b>Time Complexity:</b><ul><li>Best Case `O(log_b(n))` : With respect to the input, the algorithm will always depend on the size of input.</li><li>Average Case `O(log_b(n))` : With respect to the input, the algorithm will always depend on the size of input.</li><li>Worst Case `O(log_b(n))` : With respect to the input, the algorithm will always depend on the size of input.</li></ul></p><p><b>Auxiliary Space:</b><ul><li>Worst Case `O(log_b(n))` : With respect to the input, the algorithm will always depend on the size of input.</li></ul></p></div><div class=\"margin-bottom-20\"><h4 class=\"text-uppercase margin-bottom-10\">Algorithm</h4><p><b>Approach:</b> Shifting and Masking</p><p>Number is masked against binary of <code>1111</code> each time to get the component value which is then mapped to corresponding character. <code>&gt&gt&gt</code> is used to right-shifted `4` bit positions with zero-extension. The zero-extension will naturally deal with negative number.</p><p><code>StringBuilder</code> is used due to its efficiently in inserting character to existing <code>StringBuilder</code> object. If normal <code>String</code> is used then each insertion by <code>+</code> operation will have to copy over the immutable <code>String</code> object which is highly inefficient.</p><p>For <code>Integer.MAX_VALUE</code> or <code>Integer.MIN_VALUE</code> or any input with 8 Hexadecimal characters where the iterations would last the longest. For <code>Integer.MAX_VALUE</code> the algorithm will run for at most `ceil(log_16 (2^31 - 1) + 1) = 8` times.</p></div>\\n<hr>"
		},
		{
			"lc_ans_id":"89338",
			"view":"2492",
			"top":"5",
			"title":"Java solution",
			"vote":"6",
			"content":"```\\n  public String toHex(int dec) {\\n      if (dec == 0) return \"0\";\\n      StringBuilder res = new StringBuilder();\\n      \\n      while (dec != 0) {\\n          int digit = dec & 0xf;\\n          res.append(digit < 10 ? (char)(digit + '0') : (char)(digit - 10 + 'a'));\\n          dec >>>= 4;\\n      }\\n      \\n    return res.reverse().toString();\\n  }\\n```"
		},
		{
			"lc_ans_id":"89278",
			"view":"3099",
			"top":"6",
			"title":"C++  0ms",
			"vote":"4",
			"content":"```\\nclass Solution {\\npublic:\\n    string toHex(int num) {\\n        int count = 0;\\n        if(!num) return \"0\";\\n        string result;\\n        while (num && count < 8)\\n        {\\n            int temp = num & 15;\\n            if (temp<10)    result.push_back('0'+ temp);\\n            else result.push_back('a'+temp-10);\\n            num = num >> 4;\\n            count++;\\n        }\\n        reverse(result.begin(),result.end());\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"89250",
			"view":"1260",
			"top":"7",
			"title":"Python solution",
			"vote":"3",
			"content":"     \\n      def toHex(self, num):\\n        ans = []\\n        dic = {10:\"a\", 11:\"b\", 12:\"c\", 13:\"d\", 14:\"e\", 15:\"f\"}\\n        if num == 0:\\n            return \"0\"\\n        if num < 0:\\n            num = num + 2**32\\n\\n        while num > 0:\\n            digit = num % 16\\n            num = (num-digit)/16\\n            if  digit > 9 and digit < 16:\\n                digit = dic[digit]\\n            else:\\n                digit = str(digit)\\n            ans.append(digit)\\n        return \"\".join(ans[::-1]\\n    \\n    Main ideal is to flip the negative number to positive by using following code:\\n    # num = num + 2**32\\n   Things need to know\\n   In two's complement:\\n   zero is 000....0000 = 0 \\n   Most negative number is -2^(n-1)\\n   Most positive number   is 2^(n-1) -1"
		},
		{
			"lc_ans_id":"89276",
			"view":"151",
			"top":"8",
			"title":"Simple C# solution",
			"vote":"2",
			"content":"Unlike Java which has `>>>` operator, C# only has `>>` which fills in `1` on left parts when shift **negative** number to right. To avoid dead loop, I use a counter to make sure it counts at most 8 times.\\n\\n```csharp\\npublic class Solution {\\n    public string ToHex(int num) {\\n        // handle edge cases\\n        if (num == 0) {\\n            return \"0\";\\n        }\\n        \\n        string result = string.Empty;\\n        int count = 0;\\n        \\n        // Use f as mask to check every 4 bits from right to left.\\n        // when shift negative number to the right, C# adds 1 to fill in left part.\\n        // We need to use variable count to avoid infinite loop here.\\n        while(num != 0 && count < 8) {\\n            count ++;\\n            \\n            // save the result\\n            int tempNum = num & 15;\\n            result = GetHex(tempNum) + result;\\n\\n            // Move to next 4 bits on left\\n            num = num >> 4;\\n        }\\n        \\n        return result;\\n    }\\n    \\n    public char GetHex(int num) {\\n        if (num >= 0 && num <= 9) {\\n            return (char)(num + '0');\\n        } else {\\n            return (char)((num - 10) + 'a');\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"89316",
			"view":"601",
			"top":"9",
			"title":"Beat 90% Java solution. Long but easy understand. Any advice?",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    public String toHex(int num) {\\n        StringBuilder sb = new StringBuilder();\\n        if (num == 0) return sb.append(0).toString();\\n        int sign = 1;\\n        int bitNum = 8;\\n        if (num < 0) {\\n            num = -num - 1;\\n            sign = -1;\\n        }\\n        \\n        while (sign == 1 && num != 0) {  // num is positive\\n            int rest = num % 16;\\n            if (rest < 10) {\\n                sb.append(rest);\\n            }\\n            else {\\n                sb.append((char)('a' + rest - 10));\\n            }\\n            num /= 16;\\n        }\\n        \\n        while (sign == -1 && bitNum > 0) {  // num is negative\\n            int rest = num % 16;\\n            if (rest < 6) {\\n                sb.append((char)('f' - rest));\\n            }\\n            else {\\n                sb.append(15 - rest);\\n            }\\n            num /= 16;\\n            bitNum--;\\n        }\\n        \\n        return sb.reverse().toString();\\n    }\\n}\\n```"
		}
	],
	"id":"405",
	"title":"Convert a Number to Hexadecimal",
	"content":"<p>\nGiven an integer, write an algorithm to convert it to hexadecimal. For negative integer, <a href=\"https://en.wikipedia.org/wiki/Two%27s_complement\" target=\"_blank\">two’s complement</a> method is used.\n</p>\n\n<p><b>Note:</b>\n<ol>\n<li>All letters in hexadecimal (<code>a-f</code>) must be in lowercase.</li>\n<li>The hexadecimal string must not contain extra leading <code>0</code>s. If the number is zero, it is represented by a single zero character <code>'0'</code>; otherwise, the first character in the hexadecimal string will not be the zero character.</li>\n<li>The given number is guaranteed to fit within the range of a 32-bit signed integer.</li>\n<li>You <b>must not use <i>any</i> method provided by the library</b> which converts/formats the number to hex directly.</li>\n</ol>\n</p>\n\n<p><b>Example 1:</b>\n<pre>\nInput:\n26\n\nOutput:\n\"1a\"\n</pre>\n</p>\n\n<p><b>Example 2:</b>\n<pre>\nInput:\n-1\n\nOutput:\n\"ffffffff\"\n</pre>\n</p>",
	"frequency":"154",
	"ac_num":"31388"
}