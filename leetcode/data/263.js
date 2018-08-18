{
	"difficulty":"1",
	"submit_num":"294551",
	"show_id":"263",
	"leetcode_id":"263",
	"answers":[
		{
			"lc_ans_id":"69214",
			"view":"31751",
			"top":"0",
			"title":"2-4 lines, every language",
			"vote":"159",
			"content":"Just divide by 2, 3 and 5 as often as possible and then check whether we arrived at 1. Also try divisor 4 if that makes the code simpler / less repetitive.\\n\\n**C++ / C**\\n\\n    for (int i=2; i<6 && num; i++)\\n        while (num % i == 0)\\n            num /= i;\\n    return num == 1;\\n\\n**Ruby**\\n\\n    (2..5).each { |i| num /= i while num % i == 0 } if num > 0\\n    num == 1\\n\\nOr:\\n\\n    require 'prime'\\n    num > 0 && num.prime_division.all? { |p, _| p < 6 }\\n\\n**Python**\\n\\n    for p in 2, 3, 5:\\n        while num % p == 0 < num:\\n            num /= p\\n    return num == 1\\n\\n**Java / C#**\\n\\n    for (int i=2; i<6 && num>0; i++)\\n        while (num % i == 0)\\n            num /= i;\\n    return num == 1;\\n\\n**Javascript**\\n\\n    for (var p of [2, 3, 5])\\n        while (num && num % p == 0)\\n            num /= p;\\n    return num == 1;\\n\\n---\\n\\n**General**\\n\\nWould be a bit cleaner if I did the zero-test outside, and discarding negative numbers right away can speed things up a little, but meh... I don't want to add another line and indentation level :-)\\n\\n    if (num > 0)\\n        for (int i=2; i<6; i++)\\n            while (num % i == 0)\\n                num /= i;\\n    return num == 1;"
		},
		{
			"lc_ans_id":"69225",
			"view":"12435",
			"top":"1",
			"title":"My 2ms java solution",
			"vote":"55",
			"content":"    public boolean isUgly(int num) {\\n        if(num==1) return true;\\n        if(num==0) return false;\\n    \\twhile(num%2==0) num=num>>1;\\n    \\twhile(num%3==0) num=num/3;\\n    \\twhile(num%5==0) num=num/5;\\n        return num==1;\\n    }"
		},
		{
			"lc_ans_id":"69332",
			"view":"5704",
			"top":"2",
			"title":"Simple java solution with explanation",
			"vote":"33",
			"content":"    public boolean isUgly(int num) {\\n        if (num <= 0) {return false;}\\n        if (num == 1) {return true;}\\n        if (num % 2 == 0) {\\n            return isUgly(num/2);\\n        }\\n        if (num % 3 == 0) {\\n            return isUgly(num/3);\\n        }\\n        if (num % 5 == 0) {\\n            return isUgly(num/5);\\n        }\\n        return false;\\n    }\\n\\n\\n----------\\nidea: \\n\\n - (1) basic cases: <= 0 and == 1\\n - (2) other cases: since the number can contain the factors of 2, 3, 5, I just remove those factors. So now, I have a number without any factors of 2, 3, 5. \\n - (3) after the removing, the number (new number) can contain a) the factor that is prime and meanwhile it is >= 7, or b) the factor that is not the prime and the factor is not comprised of 2, 3 or 5. In both cases, it is false (not ugly number). \\n\\nFor example, new number can be 11, 23 --> not ugly number (case a)). new number also can be 49, 121 --> not ugly number (case b))"
		},
		{
			"lc_ans_id":"69308",
			"view":"3909",
			"top":"3",
			"title":"Java solution, greatest divide by 2, 3, 5",
			"vote":"23",
			"content":"clean solution to greatest divide the num using 2, 3, and 5.\\n\\n    public class Solution {\\n        public static boolean isUgly(int num) {\\n            if (num <= 0) {\\n                return false;\\n            }\\n            \\n            int[] divisors = {2, 3, 5};\\n            \\n            for(int d : divisors) {\\n                while (num % d == 0) {\\n                    num /= d;\\n                }\\n            }\\n            return num == 1;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"69305",
			"view":"3764",
			"top":"4",
			"title":"My python solution",
			"vote":"22",
			"content":"\\n    def isUgly(self, num):\\n        \"\"\"\\n        :type num: int\\n        :rtype: bool\\n        \"\"\"\\n        if num <= 0:\\n            return False\\n        for x in [2, 3, 5]:\\n            while num % x == 0:\\n                num = num / x\\n        return num == 1"
		},
		{
			"lc_ans_id":"69353",
			"view":"2198",
			"top":"5",
			"title":"Simple C++ solution",
			"vote":"16",
			"content":"    bool isUgly(int num) {\\n        if(num == 0) return false;\\n        \\n        while(num%2 == 0) num/=2;\\n        while(num%3 == 0) num/=3;\\n        while(num%5 == 0) num/=5;\\n        \\n        return num == 1;\\n    }"
		},
		{
			"lc_ans_id":"69235",
			"view":"1326",
			"top":"6",
			"title":"Share my simple Java solution",
			"vote":"11",
			"content":"Continually divide the number by 2,3,5. If it's ugly, the result must be 1.\\n\\n    public class Solution {\\n        public boolean isUgly(int num) {\\n            if(num <= 0) return false;\\n            while((num % 2) == 0) num /= 2;\\n            while((num % 3) == 0) num /= 3;\\n            while((num % 5) == 0) num /= 5;\\n            return num == 1;\\n        }\\n    }\\n\\nThanks to braydenCN's advice. Revised some code."
		},
		{
			"lc_ans_id":"69279",
			"view":"2069",
			"top":"7",
			"title":"Java clean solution is this O(logn) time?",
			"vote":"10",
			"content":"    public class Solution {\\n        public boolean isUgly(int num) {\\n            if (num == 0) {\\n                return false;\\n            }\\n            int[] divisors = {2, 3, 5};\\n            for (int divisor : divisors) {\\n                while(num % divisor == 0) {\\n                    num /= divisor;\\n                }\\n            }\\n            return num == 1;\\n        }\\n    }\\n\\nif the num == 2^30, then we divide it by 2, 30 times which is log2(n). but what if it has all 2,3,5 factors.\\nStill log(n) ?"
		},
		{
			"lc_ans_id":"69232",
			"view":"2980",
			"top":"8",
			"title":"Python: 1-line solution",
			"vote":"9",
			"content":"    class Solution(object):\\n        def isUgly(self, num):\\n            \"\"\"\\n            :type num: int\\n            :rtype: bool\\n            \"\"\"\\n            #n = (2**30)*(3**20)*(5**13) = 4570198050078720000000000000L\\n            return False if num < 1 or (4570198050078720000000000000L)%num != 0 else True\\n\\n\\nbut my runtime is 60 ms.How should i improve it?"
		},
		{
			"lc_ans_id":"69289",
			"view":"1893",
			"top":"9",
			"title":"2ms Solution in JAVA",
			"vote":"9",
			"content":"public class Solution {\\n    \\n    public boolean isUgly(int num) {\\n        if(num == 0) {\\n            return false;\\n        }\\n        while(num % 5 == 0) {\\n            num /= 5;\\n        }\\n        while(num % 3 == 0) {\\n            num /= 3;\\n        }\\n        while(num % 2 == 0) {\\n            num /= 2;\\n        }\\n        if(num == 1) {\\n            return true;\\n        }\\n        return false;\\n    }\\n}"
		}
	],
	"id":"263",
	"title":"Ugly Number",
	"content":"<p>\r\nWrite a program to check whether a given number is an ugly number.\r\n</p>\r\n\r\n<p>\r\nUgly numbers are positive numbers whose prime factors only include <code>2, 3, 5</code>. For example, <code>6, 8</code> are ugly while <code>14</code> is not ugly since it includes another prime factor <code>7</code>.\r\n</p>\r\n\r\n<p>\r\nNote that <code>1</code> is typically treated as an ugly number.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"454",
	"ac_num":"116530"
}