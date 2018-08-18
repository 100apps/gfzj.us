{
	"difficulty":"1",
	"submit_num":"55821",
	"show_id":"504",
	"leetcode_id":"504",
	"answers":[
		{
			"lc_ans_id":"98347",
			"view":"6106",
			"top":"0",
			"title":"Simple Java, oneliner Ruby",
			"vote":"18",
			"content":"**Java recursion:**\\n\\n    public String convertTo7(int num) {\\n        if (num < 0)\\n            return '-' + convertTo7(-num);\\n        if (num < 7)\\n            return num + \"\";\\n        return convertTo7(num / 7) + num % 7;\\n    }\\n\\n**Ruby oneliner:**\\n\\n```\\ndef convert_to7(num)\\n  num.to_s(7)\\nend\\n```"
		},
		{
			"lc_ans_id":"98364",
			"view":"3048",
			"top":"1",
			"title":"Python easy understand solution",
			"vote":"14",
			"content":"Recursion will simplify the function. \\n```\\ndef convertTo7(self, num):\\n    if num < 0: return '-' + self.convertTo7(-num)\\n    if num < 7: return str(num)\\n    return self.convertTo7(num // 7) + str(num % 7)\\n\\n````\\n\\nGeneral iteration methode:\\n````\\ndef convertTo7(self, num):\\n    if num == 0: return '0'\\n    n, res = abs(num), ''\\n    while n:\\n      res = str(n % 7) + res\\n      n //= 7\\n    return res if num > 0 else '-' + res"
		},
		{
			"lc_ans_id":"98385",
			"view":"2823",
			"top":"2",
			"title":"3-liner C++ to build string backward + 1-liner recursive solutions",
			"vote":"11",
			"content":"**Iterative Version:** Note that the input `n` is guaranteed to be in range of [-1e7, 1e7] by the problem, so `abs(n)` won't overflow since `n` cannot be `INT_MIN`.\\n```\\n    string convertToBase7(int n) {\\n      int x = abs(n); string res;\\n      do res = to_string(x%7)+res; while(x/=7);\\n      return (n>=0? \"\" : \"-\") + res;\\n    }\\n```\\n**Recursive Version:**\\n```\\n    string convertToBase7(int n) {\\n      return n>=0? n>=7? convertToBase7(n/7)+to_string(n%7) : to_string(n) : '-'+convertToBase7(-n);\\n    }\\n```"
		},
		{
			"lc_ans_id":"98363",
			"view":"4839",
			"top":"3",
			"title":"Verbose Java Solution",
			"vote":"9",
			"content":"Just keep dividing the current number by 7...\\n\\n```\\npublic class Solution {\\n    public String convertTo7(int num) {\\n        if (num == 0) return \"0\";\\n        \\n        StringBuilder sb = new StringBuilder();\\n        boolean negative = false;\\n        \\n        if (num < 0) {\\n            negative = true;\\n        }\\n        while (num != 0) {\\n            sb.append(Math.abs(num % 7));\\n            num = num / 7;\\n        }\\n        \\n        if (negative) {\\n            sb.append(\"-\");\\n        }\\n        \\n        return sb.reverse().toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98386",
			"view":"2387",
			"top":"4",
			"title":"1 line",
			"vote":"5",
			"content":"\\n        return Integer.toString(Integer.parseInt(num+\"\", 10), 7); \\nor just:         \\n\\n          return Integer.toString(num, 7);\\n\\nThe formula for converting from one base to another is: \\n\\n         return Integer.toString(Integer.parseInt(number, base1), base2);"
		},
		{
			"lc_ans_id":"98351",
			"view":"95",
			"top":"5",
			"title":"3ms C++ 3 lines Solution",
			"vote":"3",
			"content":"````   \\n string convertToBase7(int num) {\\n        int res = 0;\\n        for(int i=0; num!=0; res += pow(10,i++)*(num % 7), num /= 7) {}\\n        return to_string(res);\\n    }\\n````"
		},
		{
			"lc_ans_id":"98379",
			"view":"255",
			"top":"6",
			"title":"my java solution w/o string helper",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    public String convertToBase7(int num) {\\n        int base = 1, result = 0;\\n        while (num != 0) {\\n            result += base * (num % 7);\\n            num /= 7;\\n            base *= 10;\\n        }\\n        return String.valueOf(result);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98389",
			"view":"598",
			"top":"7",
			"title":"C++ solution",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    string convertTo7(int num) {\\n        if(num == 0) return \"0\";\\n        string str =\"\";\\n        \\n        if(num < 0) return \"-\" + convertTo7(-num);\\n        while( num > 0){\\n            int rem = num % 7;\\n            num = num/7;\\n            \\n            str = to_string(rem) + str;\\n        }\\n        \\n        return str;\\n    }\\n\\n        return str;"
		},
		{
			"lc_ans_id":"98391",
			"view":"862",
			"top":"8",
			"title":"Java 1 Liner + Standard Solution",
			"vote":"2",
			"content":"```\\npublic String convertTo7(int num) {\\n    return Integer.toString(num, 7);\\n}\\n```\\n\\nNot using standard library:\\n\\n```\\n    public String convertTo7(int num) {\\n        if (num == 0) return \"0\";\\n        String res = \"\";\\n        boolean isNeg = num < 0;\\n        while (num != 0) {\\n            res = Math.abs((num % 7)) + res;\\n            num /= 7;\\n        }\\n        return isNeg ? \"-\" + res : res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"98356",
			"view":"89",
			"top":"9",
			"title":"Easy Java beat 94%",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public String convertToBase7(int num) {\\n        if(num == 0) return \"0\";\\n        \\n        boolean negative = false;\\n        if(num < 0) {\\n            num = num * -1;\\n            negative = true;\\n        }\\n        \\n        String res = \"\";\\n        \\n        while(num != 0){\\n            \\n            res = num % 7 + res;\\n            num = num/7;\\n            \\n        }\\n        \\n        return negative == true ? \"-\" + res : res;\\n        \\n    }\\n}\\n```"
		}
	],
	"id":"494",
	"title":"Base 7",
	"content":"<p>Given an integer, return its base 7 string representation.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> 100\r\n<b>Output:</b> \"202\"\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> -7\r\n<b>Output:</b> \"-10\"\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe input will be in range of [-1e7, 1e7].\r\n</p>",
	"frequency":"161",
	"ac_num":"24606"
}