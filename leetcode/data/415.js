{
	"difficulty":"1",
	"submit_num":"120740",
	"show_id":"415",
	"leetcode_id":"415",
	"answers":[
		{
			"lc_ans_id":"90436",
			"view":"19336",
			"top":"0",
			"title":"Straightforward Java 8 main lines 25ms",
			"vote":"64",
			"content":"```\\npublic class Solution {\\n    public String addStrings(String num1, String num2) {\\n        StringBuilder sb = new StringBuilder();\\n        int carry = 0;\\n        for(int i = num1.length() - 1, j = num2.length() - 1; i >= 0 || j >= 0 || carry == 1; i--, j--){\\n            int x = i < 0 ? 0 : num1.charAt(i) - '0';\\n            int y = j < 0 ? 0 : num2.charAt(j) - '0';\\n            sb.append((x + y + carry) % 10);\\n            carry = (x + y + carry) / 10;\\n        }\\n        return sb.reverse().toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"90453",
			"view":"8237",
			"top":"1",
			"title":"C++_Accepted_13ms",
			"vote":"16",
			"content":"    class Solution {\\n    public:\\n    string addStrings(string num1, string num2) {\\n        int i = num1.size() - 1;\\n        int j = num2.size() - 1;\\n        int carry = 0;\\n        string res = \"\";\\n        while(i>=0 || j>=0 || carry){\\n            long sum = 0;\\n            if(i >= 0){sum += (num1[i] - '0');i--;}\\n            if(j >= 0){sum += (num2[j] - '0');j--;}\\n            sum += carry; \\n            carry = sum / 10;\\n            sum = sum % 10;\\n            res =  res + to_string(sum);\\n        }\\n        reverse(res.begin(), res.end());\\n        return res;\\n    }\\n    };"
		},
		{
			"lc_ans_id":"90474",
			"view":"779",
			"top":"2",
			"title":"straightforward python solution",
			"vote":"7",
			"content":"```\\nclass Solution(object):\\n    def addStrings(self, num1, num2):\\n        \"\"\"\\n        :type num1: str\\n        :type num2: str\\n        :rtype: str\\n        \"\"\"\\n        num1, num2 = list(num1), list(num2)\\n        carry, res = 0, []\\n        while len(num2) > 0 or len(num1) > 0:\\n            n1 = ord(num1.pop())-ord('0') if len(num1) > 0 else 0\\n            n2 = ord(num2.pop())-ord('0') if len(num2) > 0 else 0\\n            \\n            temp = n1 + n2 + carry \\n            res.append(temp % 10)\\n            carry = temp // 10\\n        if carry: res.append(carry)\\n        return ''.join([str(i) for i in res])[::-1]\\n```"
		},
		{
			"lc_ans_id":"90491",
			"view":"4786",
			"top":"3",
			"title":"[JAVA] Simple and Clean with Explanations [29 ms]",
			"vote":"7",
			"content":"https://ratchapong.com/algorithm-practice/leetcode/add-strings [Full Solutions]\\n```\\npublic class Solution {\\n    public String addStrings(String num1, String num2) {\\n        int i = num1.length() - 1;\\n        int j = num2.length() - 1;\\n        int carry = 0;\\n        char[] num1Array = num1.toCharArray();\\n        char[] num2Array = num2.toCharArray();\\n        StringBuilder sb = new StringBuilder();\\n        while (i >= 0 || j >= 0 || carry == 1) {\\n            int a = i >= 0 ? (num1Array[i--] - '0') : 0;\\n            int b = j >= 0 ? (num2Array[j--] - '0') : 0;\\n            int sum = a + b + carry;\\n            sb.insert(0, sum % 10);\\n            carry = sum / 10;\\n        }\\n        return sb.toString();\\n    }\\n}\\n```\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Complexity Analysis</h4>\\n    <p>\\n        <b>Time Complexity:</b>\\n        `O(m + n)` (Average Case) and `O(m + n)` (Worst Case) where `m` and `n` are the total number of characters in\\n        the  first and second input respectively. The algorithm evaluate each character for potential carry.\\n    </p>\\n    <p>\\n        <b>Auxiliary Space:</b>\\n        `O(m + n)` space is used where `m` and `n` are the total number of characters in the\\n        first and second input respectively. Converting both input to character array required extra space.\\n    </p>\\n</div>\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Algorithm</h4>\\n    <p>\\n        <b>Approach:</b>\\n        Iterative\\n    </p>\\n    <p>\\n        The while loop will run as long as there are characters left in one of the strings or when there is a carry in\\n        remaining.\\n        Starting from right to left, each character is converted to integer by the mean of offsetting its ASCII value.\\n        If the shorter string is exhausted first, the value will be forced to `0` as default from there onwards.\\n        Sum for that particular position is conveniently calculated and a modulus of `10` will extract the digit\\n        portion in case the sum is bigger than 10. Carry in is extracted by flooring the number after division by\\n        `10`. <code>StringBuilder</code> is used due to its\\n        efficiently in inserting character to existing <code>StringBuilder</code> object. If normal <code>String</code>\\n        is used then each insertion by <code>+</code> operation will have to copy over the immutable <code>String</code>\\n        object which is highly inefficient.\\n    </p>\\n</div>"
		},
		{
			"lc_ans_id":"90449",
			"view":"4516",
			"top":"4",
			"title":"Python: 7-line & 52ms (+ 1-liner for fun)",
			"vote":"7",
			"content":"```\\ndef addStrings(self, num1, num2):\\n    z = itertools.izip_longest(num1[::-1], num2[::-1], fillvalue='0')\\n    res, carry, zero2 = [], 0, 2*ord('0')\\n    for i in z:\\n        cur_sum = ord(i[0]) + ord(i[1]) - zero2 + carry\\n        res.append(str(cur_sum % 10))\\n        carry = cur_sum // 10\\n    return ('1' if carry else '') + ''.join(res[::-1])\\n```\\n\\nThe above I think would be the expected answer in an interview. But just for fun based on a similar idea we can have a (rather long :-) one-liner. It technically satisfies the problem conditions, although it may warrant disqualification from the contest, depending on interpretation:\\n - \"You must not use any built-in BigInteger library\" -> I don't use a library; I am just making use of the fact that Python's standard int supports arbitrarily large integers.\\n - \"or convert the inputs to integer directly\" -> I don't; I sum them digit by digit. It is the result that I convert to integer and back.\\n\\nFormated for added clarity, although everything can be put on the same line:\\n```\\ndef addStrings(self, num1, num2):\\n     return str(\\n              reduce(lambda a, b: 10*a + b, \\n                 map(lambda x: ord(x[0])+ord(x[1])-2*ord('0'),\\n                   list(itertools.izip_longest(num1[::-1], num2[::-1], fillvalue='0'))[::-1]\\n                 ) \\n              )\\n            )\\n```\\n\\nWould the one liner be acceptable in the contest?"
		},
		{
			"lc_ans_id":"90522",
			"view":"3693",
			"top":"5",
			"title":"3ms 5 lines Concise C++ Solution without extra space. The loop should stop early!",
			"vote":"6",
			"content":"Modified to be more concise\\n```\\nclass Solution {\\npublic:\\n    string addStrings(string num1, string num2) {\\n        if (num1.size() < num2.size()) return addStrings(num2, num1);\\n        int carry = 0, i = num1.size() - 1, j = num2.size() - 1;\\n        for (; i >= 0 && (carry || j >= 0); i--, j--, carry /= 10) \\n            num1[i] = (carry += num1[i] - '0' + (j >= 0 ? num2[j] - '0' : 0)) % 10 + '0';\\n        return (carry ? \"1\" : \"\") + num1;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"90512",
			"view":"811",
			"top":"6",
			"title":"Java, clean code.",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public String addStrings(String num1, String num2) {\\n        if(num1 == null || num2 == null) return null;\\n        StringBuilder sb = new StringBuilder();\\n        int carry = 0;\\n        int l1 = num1.length()-1;\\n        int l2 = num2.length()-1;\\n        \\n        while(l1>=0 || l2>=0){\\n            int n1 = l1>=0 ? num1.charAt(l1)-'0' : 0;\\n            int n2 = l2>=0 ? num2.charAt(l2)-'0' : 0;\\n            int sum = n1 + n2 + carry;\\n            carry = sum > 9 ? 1 : 0;\\n            sb.insert(0, sum%10);\\n            l1--;\\n            l2--;\\n        }\\n        \\n        if(carry == 1) sb.insert(0, 1);\\n        \\n        return sb.toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"90503",
			"view":"3037",
			"top":"7",
			"title":"Easy to understand Java Solution",
			"vote":"4",
			"content":"```\\npublic String addStrings(String num1, String num2) {\\n        int len1=num1.length()-1;\\n        int len2=num2.length()-1;\\n        \\n        StringBuilder sb=new StringBuilder();\\n        int sum=0,carry=0;\\n        while(len1>=0 || len2>=0) {\\n            int first=len1>=0?num1.charAt(len1)-'0':0;\\n            int second=len2>=0?num2.charAt(len2)-'0':0;\\n            sum=carry+first+second;\\n            if(sum<=9){\\n                sb.insert(0,sum);\\n                sum=0;\\n                carry=0;\\n            } else {\\n                sb.insert(0,sum%10);\\n                sum=0;\\n                carry=1;\\n            }\\n            len1--;\\n            len2--;\\n        }\\n    if(carry==1)sb.insert(0,\"1\");\\n    return sb.toString();\\n    }\\n```"
		},
		{
			"lc_ans_id":"90505",
			"view":"1246",
			"top":"8",
			"title":"Very easy to understand Python solution",
			"vote":"3",
			"content":"```\\nclass Solution(object):\\n    def addStrings(self, num1, num2):\\n        def additionStrings(num1, num2, carry):\\n            if not num1 and not num2: \\n                if carry: res.append(carry)\\n                return\\n            a, b = num1.pop() if num1 else 0, num2.pop() if num2 else 0\\n            carry, digit = divmod(a + b + carry, 10)\\n            res.append(digit)\\n            additionStrings(num1, num2, carry)\\n        \\n        res = []\\n        additionStrings([int(c) for c in num1], \\n                        [int(c) for c in num2],\\n                        0)\\n        \\n        return \"\".join([str(num) for num in res[::-1]])\\n```"
		},
		{
			"lc_ans_id":"90487",
			"view":"359",
			"top":"9",
			"title":"My easy c++ solution",
			"vote":"2",
			"content":"```\\nstring addStrings(string num1, string num2) {\\n    int sum = 0, i = num1.length() - 1, j = num2.length() - 1;\\n    string str;\\n    while (i >= 0 || j >= 0 || sum > 0) {\\n        if (i >= 0) sum += (num1[i--] - '0');\\n        if (j >= 0) sum += (num2[j--] - '0');\\n        str.insert(0, 1, (sum % 10) + '0');\\n        sum /= 10;\\n    }\\n    return str;\\n}\\n```"
		}
	],
	"id":"415",
	"title":"Add Strings",
	"content":"<p>Given two non-negative integers <code>num1</code> and <code>num2</code> represented as string, return the sum of <code>num1</code> and <code>num2</code>.</p>\r\n\r\n<p><b>Note:</b>\r\n<ol>\r\n<li>The length of both <code>num1</code> and <code>num2</code> is < 5100.</li>\r\n<li>Both <code>num1</code> and <code>num2</code> contains only digits <code>0-9</code>.</li>\r\n<li>Both <code>num1</code> and <code>num2</code> does not contain any leading zero.</li>\r\n<li>You <b>must not use any built-in BigInteger library</b> or <b>convert the inputs to integer</b> directly.</li>\r\n</ol>\r\n</p>",
	"frequency":"314",
	"ac_num":"50392"
}