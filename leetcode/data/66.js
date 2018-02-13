{
	"difficulty":"1",
	"submit_num":"545774",
	"show_id":"66",
	"leetcode_id":"66",
	"answers":[
		{
			"lc_ans_id":"24082",
			"view":"43050",
			"top":"0",
			"title":"My Simple Java Solution",
			"vote":"354",
			"content":"    public int[] plusOne(int[] digits) {\\n            \\n        int n = digits.length;\\n        for(int i=n-1; i>=0; i--) {\\n            if(digits[i] < 9) {\\n                digits[i]++;\\n                return digits;\\n            }\\n            \\n            digits[i] = 0;\\n        }\\n        \\n        int[] newNumber = new int [n+1];\\n        newNumber[0] = 1;\\n        \\n        return newNumber;\\n    }"
		},
		{
			"lc_ans_id":"24084",
			"view":"20855",
			"top":"1",
			"title":"Is it a simple code(C++)?",
			"vote":"185",
			"content":"    void plusone(vector<int> &digits)\\n    {\\n    \\tint n = digits.size();\\n    \\tfor (int i = n - 1; i >= 0; --i)\\n    \\t{\\n    \\t\\tif (digits[i] == 9)\\n    \\t\\t{\\n    \\t\\t\\tdigits[i] = 0;\\n    \\t\\t}\\n    \\t\\telse\\n    \\t\\t{\\n    \\t\\t\\tdigits[i]++;\\n    \\t\\t\\treturn;\\n    \\t\\t}\\n    \\t}\\n    \\t\\tdigits[0] =1;\\n    \\t\\tdigits.push_back(0);\\n    \\t\\t\\n    }"
		},
		{
			"lc_ans_id":"24139",
			"view":"10675",
			"top":"2",
			"title":"Simple java solution",
			"vote":"33",
			"content":"\\n    public int[] plusOne(int[] digits) {\\n        for (int i = digits.length - 1; i >=0; i--) {\\n            if (digits[i] != 9) {\\n                digits[i]++;\\n                break;\\n            } else {\\n                digits[i] = 0;\\n            }\\n        }\\n        if (digits[0] == 0) {\\n            int[] res = new int[digits.length+1];\\n            res[0] = 1;\\n            return res;\\n        }\\n        return digits;\\n    }"
		},
		{
			"lc_ans_id":"24094",
			"view":"3917",
			"top":"3",
			"title":"I cannot fully understand the meaning of question 'Plus One'",
			"vote":"31",
			"content":"Could someone explain this to me? And please don't show up the code. Thanks"
		},
		{
			"lc_ans_id":"24130",
			"view":"6426",
			"top":"4",
			"title":"To avoid confusion, please mention that the lowest digit is on the right end",
			"vote":"24",
			"content":"The question description does not explicitly say that. \\nI found that is the case."
		},
		{
			"lc_ans_id":"24122",
			"view":"6339",
			"top":"5",
			"title":"My C++ Solution with few lines",
			"vote":"23",
			"content":"    class Solution {\\n    public:\\n        vector<int> plusOne(vector<int> &digits) {\\n            bool carry = true;\\n            \\n            for(int i=digits.size()-1; i >= 0 && carry; i--) {\\n                carry = (++digits[i]%=10) == 0;\\n            }\\n    \\n            if(carry) {\\n                digits.insert(digits.begin(), 1);\\n            }\\n        \\n            return digits;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"24085",
			"view":"9286",
			"top":"6",
			"title":"Simple Python solution with explanation (Plus One)",
			"vote":"21",
			"content":"    def plusOne(digits):\\n        num = 0\\n        for i in range(len(digits)):\\n        \\tnum += digits[i] * pow(10, (len(digits)-1-i))\\n        return [int(i) for i in str(num+1)]\\n\\nWe're given a list of digits, and the idea here is to convert that list to an integer, *num*. So each digit is multiplied by the proper place value and added to *num*. For example, if *digits* = [3, 8, 2, 5] then on the first iteration 3 is multiplied by 10 to the power of 4-1-0 = 3, so this results in 3000, which is added to *num*. Then 8 is multiplied by 10^2 and added to *num*, and so on.\\n\\nThe last step is to add 1 to *num*, convert it to a list and return that list."
		},
		{
			"lc_ans_id":"24289",
			"view":"1802",
			"top":"7",
			"title":"Java concise solution with early return.",
			"vote":"17",
			"content":"    \\n    public int[] plusOne(int[] digits) {\\n        int carry = 1;\\n        for (int i = digits.length-1; i>= 0; i--) {\\n            digits[i] += carry;\\n            if (digits[i] <= 9) // early return \\n                return digits;\\n            digits[i] = 0;\\n        }\\n        int[] ret = new int[digits.length+1];\\n        ret[0] = 1;\\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"24461",
			"view":"2589",
			"top":"8",
			"title":"Fastest and simplest C++ solution",
			"vote":"14",
			"content":"    class Solution {\\n    public:\\n        vector<int> plusOne(vector<int> &digits) {\\n            int i,j,carry=1;\\n            // traditional long addition..\\n            for(i=digits.size()-1;i>=0&&carry;i--){\\n                int sum=carry+digits[i];\\n                carry=sum/10;\\n                digits[i]=sum%10;\\n            }\\n            if(carry){ // if carry is 1, then digits must be all 99..999\\n                digits[0]=1;\\n                digits.push_back(0);\\n            }\\n            return digits;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"24414",
			"view":"2258",
			"top":"9",
			"title":"Missing information",
			"vote":"13",
			"content":"When I started writing the solution I was thinking we were talking about binary digits, please add this information to the text of the problem. The numerical base requested.\\n\\nWould be cool to have a more general problem that also passes the numerical base to the function ;-)"
		}
	],
	"id":"66",
	"title":"Plus One",
	"content":"<p>Given a non-negative integer represented as a <b>non-empty</b> array of digits, plus one to the integer.</p>\r\n\r\n<p>You may assume the integer do not contain any leading zero, except the number 0 itself.</p>\r\n\r\n<p>The digits are stored such that the most significant digit is at the head of the list.</p>",
	"frequency":"600",
	"ac_num":"215267"
}