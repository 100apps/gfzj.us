{
	"difficulty":"1",
	"submit_num":"360686",
	"show_id":"258",
	"leetcode_id":"258",
	"answers":[
		{
			"lc_ans_id":"68580",
			"view":"28364",
			"top":"0",
			"title":"Accepted C++ O(1)-time O(1)-space 1-Line Solution with Detail Explanations",
			"vote":"186",
			"content":"The problem, widely known as *digit root* problem, has a congruence formula:\\n\\n    https://en.wikipedia.org/wiki/Digital_root#Congruence_formula\\n\\nFor base *b* (decimal case *b* = 10), the digit root of an integer is:\\n\\n- dr(*n*) = 0  if *n* == 0\\n- dr(*n*) = (*b*-1)  if *n* != 0 and *n* % (*b*-1) == 0\\n- dr(*n*) = *n* mod (*b*-1) if *n* % (*b*-1) != 0\\n\\nor\\n\\n- dr(*n*) = 1 + (*n* - 1) % 9\\n\\nNote here, when *n* = 0, since (*n* - 1) % 9 = -1, the return value is zero (correct).\\n\\nFrom the formula, we can find that the result of this problem is immanently periodic, with period (*b*-1).\\n\\nOutput sequence for decimals (*b* = 10):\\n\\n~input: 0 1 2 3 4 ...  \\noutput: 0 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 ....\\n\\n\\nHenceforth, we can write the following code, whose time and space complexities are both *O*(1).\\n\\n    class Solution {\\n    public:\\n        int addDigits(int num) {\\n            return 1 + (num - 1) % 9;\\n        }\\n    };\\n\\nThanks for reading. :)"
		},
		{
			"lc_ans_id":"68776",
			"view":"9920",
			"top":"1",
			"title":"Two lines C code, with explanation",
			"vote":"61",
			"content":"    int addDigits(int num) {\\n        int res = num % 9;\\n        return (res != 0 || num == 0) ? res : 9;\\n    }\\n\\nThe essence of this problem is that 10^n \\u2261 1 (mod 9), and thus a_n*10^n + ... + a_1*10 + a_0 \\u2261 a_n + ... + a_1 + a_0 (mod 9). This process can be continued until a number less than 9 is gotten, i.e. num % 9. For any digit n, n = n % 9 unless n = 9. The only confusing case is n % 9 = 0, but addDigits(num) = 0 if and only if num = 0, otherwise it should be 9 in fact."
		},
		{
			"lc_ans_id":"68572",
			"view":"8970",
			"top":"2",
			"title":"3 methods for python with explains",
			"vote":"52",
			"content":"   \\n 2. Iteration method\\n\\n  \\n\\n          class Solution(object):\\n          def addDigits(self, num):\\n            \"\"\"\\n            :type num: int\\n            :rtype: int\\n            \"\"\"\\n            while(num >= 10):\\n                temp = 0\\n                while(num > 0):\\n                    temp += num % 10\\n                    num /= 10\\n                num = temp\\n            return num\\n\\n\\n\\n\\n 1. Digital Root\\n\\n\\nthis method depends on the truth:\\n\\nN=(a[0] * 1 + a[1] * 10 + ...a[n] * 10 ^n),and a[0]...a[n] are all between [0,9]\\n\\nwe set M = a[0] + a[1] + ..a[n]\\n\\nand another truth is that:\\n\\n1 % 9 = 1\\n\\n10 % 9 = 1\\n\\n100 % 9 = 1\\n\\nso N % 9 = a[0] + a[1] + ..a[n]\\n\\nmeans N % 9 = M\\n\\nso N = M (% 9)\\n\\nas 9 % 9 = 0,so we can make (n - 1) % 9 + 1 to help us solve the problem when n is 9.as N is 9, ( 9 - 1) % 9 + 1 = 9\\n\\n\\n   \\n\\n    class Solution(object):\\n    def addDigits(self, num):\\n        \"\"\"\\n        :type num: int\\n        :rtype: int\\n        \"\"\"\\n        if num == 0 : return 0\\n        else:return (num - 1) % 9 + 1"
		},
		{
			"lc_ans_id":"68588",
			"view":"21007",
			"top":"3",
			"title":"1 line Java Solution",
			"vote":"43",
			"content":"    public class Solution {\\n    \\n        public int addDigits(int num) {\\n    \\n            return num==0?0:(num%9==0?9:(num%9));\\n    \\n        }\\n    \\n    }"
		},
		{
			"lc_ans_id":"68796",
			"view":"8251",
			"top":"4",
			"title":"O(1) solution with mod operation",
			"vote":"35",
			"content":"If an integer is like 100a+10b+c, then (100a+10b+c)%9=(a+99a+b+9b+c)%9=(a+b+c)%9\\n\\n    class Solution:\\n        # @param {integer} num\\n        # @return {integer}\\n        def addDigits(self, num):\\n            if num==0:\\n                return 0\\n            return num%9 if num%9!=0 else 9"
		},
		{
			"lc_ans_id":"68667",
			"view":"5825",
			"top":"5",
			"title":"Simple Java Solution No recursion/ loop",
			"vote":"33",
			"content":"    public class Solution {\\n        public int addDigits(int num) {\\n            if (num == 0){\\n                return 0;\\n            }\\n            if (num % 9 == 0){\\n                return 9;\\n            }\\n            else {\\n                return num % 9;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"68622",
			"view":"2239",
			"top":"6",
			"title":"Java Code with Explanation",
			"vote":"18",
			"content":"Let's take a couple of example to check the input and expected output of the given problem.\\nExample 1:\\nInput:  267\\nStep 1: 2+6+7 = 15\\nStep 2: 1+5 = 6 (Expected output as this number has single digit)\\n\\nExample 2:\\nInput: 7714\\nStep 1: 7+7+1+4 = 19\\nStep 2: 1+ 9 = 10\\nStep 3: 1+0 = 1 (Expected output as this number has only 1 digit)\\n\\nBy looking at the above examples the first solution that comes to mind is that we can take the input number and find the sum of individual digits by using recursion (or iteration). If the result is not a single digit code we ill process the result again and keep doing it until it returns a single digits. This methods is correct and works for all the valid inputs. The code for this algorithm can be writtes as follows:\\n    public int addDigits(int num) {\\n        while(num/10>0){\\n            num = sumDigits(num);\\n        }\\n        return num;\\n    }\\n    \\n    public int sumDigits(int n){\\n        if(n==0)\\n            return 0;\\n        return (n%10) + sumDigits(n/10);\\n    }\\n\\nCan we find anything better than the above solution. Let's take a couple of more example and see if we can deduce some pattern for the result:\\nExample 3:\\nInput:  10\\nStep 1: 1+0  = 1 (Expected output)\\n\\nExample 4:\\nInput:  11\\nStep 1: 1+1 = 2 (Expected output)\\n\\nExample 5:\\nInput:  12\\nStep 1: 1+2 = 3 (Expected output)\\n\\n\\nExample 6:\\nInput:  18\\nStep 1: 1+8 = 9 (Expected output)\\n\\nArguments: In mathematics we have learnt that any number that is divisible by 9, the sum of the digits in the number is also divisible by 9. Also, here we know that the result of the problem is an integer lying in the range [0,9] . \\n\\nFrom the above arguments and samples, we can see that the result depends on the divisibility of a number by 9. The code can be written as follows: \\n\\n    public int addDigits(int num) {\\n    if(num<10)\\n        return num;\\n    else if(num%9 ==0)\\n        return 9;\\n    else\\n        return num%9;        \\n    }\\n\\n\\nThanks. Happy Coding :)"
		},
		{
			"lc_ans_id":"68720",
			"view":"2507",
			"top":"7",
			"title":"Java O(1) Solution for Positive and Negative numbers",
			"vote":"16",
			"content":"Even though question asks answer for non-negative integer, this one works for +ve and -ve numbers.\\nI referred this [code on stackoverflow][1].\\n\\nNote: Negative numbers have digit sum as negative number. If positive digit sum needed for negative numbers then Math.abs() can be used while returning result.\\n\\n\\n    public class Solution {\\n        public int addDigits(int num) {\\n            return 1 + (num-1)%9;\\n        }\\n    }\\n\\n\\n  [1]: http://stackoverflow.com/questions/1057072/calculating-digital-root-is-there-a-better-way"
		},
		{
			"lc_ans_id":"68703",
			"view":"1326",
			"top":"8",
			"title":"One Line Java Solution",
			"vote":"15",
			"content":"Observe the pattern of repeat from 1 to 9 except if num = 0.\\nSo we can do:\\n\\n    public int addDigits(int num) {\\n        return (num - 1)%9 + 1;\\n    }"
		},
		{
			"lc_ans_id":"68726",
			"view":"2790",
			"top":"9",
			"title":"Java one line simple answer",
			"vote":"15",
			"content":"According to [WIKI][1], we could compute the congruent root easily.\\n\\n    public int addDigits(int num) \\n    {\\n        //For number that from 0 to 9, the answer is themselves\\n        //For number that is divisible by 9, the answer is 9\\n        //Otherwise, the answer is the reminder after divided by 9\\n        return num>9?(num%9==0?9:num%9):num;\\n    }\\n\\n\\n  [1]: https://en.wikipedia.org/wiki/Congruence_relation"
		}
	],
	"id":"258",
	"title":"Add Digits",
	"content":"<p>\r\nGiven a non-negative integer <code>num</code>, repeatedly add all its digits until the result has only one digit. \r\n</p>\r\n\r\n<p>\r\nFor example:\r\n</p>\r\n<p>\r\nGiven <code>num = 38</code>, the process is like: <code>3 + 8 = 11</code>, <code>1 + 1 = 2</code>. Since <code>2</code> has only one digit, return it.\r\n</p>\r\n\r\n<p><b>Follow up:</b><br>\r\nCould you do it without any loop/recursion in O(1) runtime?\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"582",
	"ac_num":"186237"
}