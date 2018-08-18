{
	"difficulty":"1",
	"submit_num":"297011",
	"show_id":"172",
	"leetcode_id":"172",
	"answers":[
		{
			"lc_ans_id":"52371",
			"view":"34028",
			"top":"0",
			"title":"My one-line solutions in 3 languages",
			"vote":"234",
			"content":"This question is pretty straightforward.\\n\\nBecause all trailing 0 is from factors 5 * 2. \\n\\nBut sometimes one number may have several 5 factors, for example, 25 have two 5 factors, 125 have three 5 factors. In the n! operation, factors 2 is always ample.  So we just count how many 5 factors in all number from 1 to n. \\n\\nOne line code:\\n\\nJava:\\n\\n        return n == 0 ? 0 : n / 5 + trailingZeroes(n / 5);\\n\\nC++:\\n\\n        return n == 0 ? 0 : n / 5 + trailingZeroes(n / 5);\\n\\nPython:\\n\\n        return 0 if n == 0 else n / 5 + self.trailingZeroes(n / 5)"
		},
		{
			"lc_ans_id":"52373",
			"view":"17585",
			"top":"1",
			"title":"Simple C/C++ Solution (with detailed explaination)",
			"vote":"180",
			"content":"The idea is: \\n\\n 1. The ZERO comes from 10.  \\n 2. The 10 comes from 2 x 5 \\n 3. And we need to account for all the products of 5 and 2. likes 4\\xd75 = 20 ...\\n 4. So, if we take all the numbers with 5 as a factor, we'll have way  more than enough even numbers to pair with them to get factors of 10\\n\\n**Example One**\\n\\nHow many multiples of 5 are between 1 and 23? There is 5, 10, 15, and 20, for four multiples of 5. Paired with 2's from the even factors, this makes for four factors of 10, so: **23! has 4 zeros**.\\n\\n\\n**Example Two**\\n\\nHow many multiples of 5 are there in the numbers from 1 to 100? \\n\\nbecause   100 \\xf7 5 = 20, so, there are twenty multiples of 5 between 1 and 100.\\n\\nbut wait, actually 25 is 5\\xd75, so each multiple of 25 has an extra factor of 5, e.g. 25 \\xd7 4 = 100\\uff0cwhich introduces extra of zero.\\n\\nSo, we need know how many multiples of 25 are between 1 and 100? Since 100 \\xf7 25 = 4, there are four multiples of 25 between 1 and 100.\\n\\nFinally, we get 20 + 4 = 24 trailing zeroes in 100!\\n\\n\\nThe above example tell us, we need care about 5, 5\\xd75, 5\\xd75\\xd75, 5\\xd75\\xd75\\xd75 ....\\n\\n**Example Three**\\n\\nBy given number 4617.\\n\\n5^1 :  4617 \\xf7 5 = 923.4, so we get 923 factors of 5\\n\\n5^2 :  4617 \\xf7 25 = 184.68, so we get 184 additional factors of 5\\n\\n5^3 :  4617 \\xf7 125 = 36.936, so we get 36 additional factors of 5\\n\\n5^4 :  4617 \\xf7 625 = 7.3872, so we get 7 additional factors of 5\\n\\n5^5 :  4617 \\xf7 3125 = 1.47744, so we get 1 more factor of 5\\n\\n5^6 :  4617 \\xf7 15625 = 0.295488, which is less than 1, so stop here.\\n\\nThen 4617! has 923 + 184 + 36 + 7 + 1 = 1151 trailing zeroes.\\n\\nC/C++ code \\n\\n    int trailingZeroes(int n) {\\n        int result = 0;\\n        for(long long i=5; n/i>0; i*=5){\\n            result += (n/i);\\n        }\\n        return result;\\n    }\\n\\n\\n---------update-----------\\n\\nTo avoid the integer overflow as **@localvar** mentioned below(in case of 'n >=1808548329' ), the expression \" i <= INT_MAX/5\" is not a good way to prevent overflow, because 5^13 is > INT_MAX/5 and it's valid. \\n\\nSo, if you want to use \"multiply\", consider define the 'i' as 'long long' type.\\n\\nOr, take the solution **@codingryan** mentioned in below answer!"
		},
		{
			"lc_ans_id":"52367",
			"view":"15378",
			"top":"2",
			"title":"My explanation of the Log(n) solution",
			"vote":"119",
			"content":"10 is the product of 2 and 5. In n!, we need to know how many 2 and 5, and the number of zeros is the minimum of the number of 2 and the number of 5.\\n\\nSince multiple of 2 is more than multiple of 5, the number of zeros is dominant by the number of 5.\\n\\nHere we expand  \\n\\n      2147483647!\\n    =2 * 3 * ...* 5 ... *10 ... 15* ... * 25 ... * 50 ... * 125 ... * 250...\\n    =2 * 3 * ...* 5 ... * (5^1*2)...(5^1*3)...*(5^2*1)...*(5^2*2)...*(5^3*1)...*(5^3*2)... (Equation 1)\\n\\nWe just count the number of 5 in Equation 1.\\n\\nMultiple of 5 provides one 5, multiple of 25 provides two 5 and so on.\\n\\nNote the duplication: multiple of 25 is also multiple of 5, so multiple of 25 only provides one extra 5.\\n\\nHere is the basic solution:\\n\\n    return n/5 + n/25 + n/125 + n/625 + n/3125+...;\\n\\nYou can easily rewrite it to a loop."
		},
		{
			"lc_ans_id":"52506",
			"view":"6820",
			"top":"3",
			"title":"O(log_5(N)) solution, java",
			"vote":"39",
			"content":"O(log_5(N)) (base 5!) is faster than any polynomial. You need no more than 14 iterations to get the result. You just need to count how many times 5 appears in n! during multiplication in different forms: 5, 25, 125, 625, ... . when any 5 is multiplied by 2 (we have many of them) then we get 0 at the end. That's it.\\n\\n    public class Solution {\\n        public int trailingZeroes(int n) {\\n            int r = 0;\\n            while (n > 0) {\\n                n /= 5;\\n                r += n;\\n            }\\n            return r;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"52493",
			"view":"4976",
			"top":"4",
			"title":"Simple C++ solution!!!",
			"vote":"25",
			"content":"Because from 1 to n, the number of 2 factors is always bigger than the number of 5 factors. So we only need to find the number of 5 factors among 1...n.\\n\\n1st loop: 5, 10, 15, 20, 25, 30, ....\\n\\n2nd loop:                      25              50         ......\\n.....\\n\\ncode:\\n\\n    class Solution {\\n    public:\\n        int trailingZeroes(int n) {\\n            int res=0;\\n            while(n){\\n                n/=5;\\n                res+=n;\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"52470",
			"view":"1754",
			"top":"5",
			"title":"4-lines 4ms C++ Solution with Explanations",
			"vote":"24",
			"content":"Well, to compute the number of trailing zeros, we need to first think clear about what will generate a trailing `0`? Obviously, a number multiplied by `10` will have a trailing `0` added to it. So we only need to find out how many `10`'s will appear in the expression of the factorial. Since `10 = 2 * 5` and there are a bunch more `2`'s (each even number will contribute at least one `2`), we only need to count the number of `5`'s.\\n\\nNow let's see what numbers will contribute a `5`. Well, simply the multiples of `5`, like `5, 10, 15, 20, 25, 35, ...`. So is the result simply `n / 5`? Well, not that easy. Notice that some numbers may contribute more than one `5`, like `25 = 5 * 5`. Well, what numbers will contribute more than one `5`? Ok, you may notice that only multiples of the power of `5` will contribute more than one `5`. For example, multiples of `25` will contribute at least two `5`'s.\\n\\nWell, how to count them all? If you try some examples, you may finally get the result, which is `n / 5 + n / 25 + n / 125 + ...`. The idea behind this expression is: all the multiples of `5` will contribute one `5`, the multiples of `25` will contribute one more `5` and the multiples of `125` will contribute another one more `5`... and so on. Now, we can write down the following code, which is pretty short.\\n\\n    class Solution {\\n    public:\\n        int trailingZeroes(int n) { \\n            int count = 0;\\n            for (long long i = 5; n / i; i *= 5)\\n                count += n / i;\\n            return count;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"52432",
			"view":"3416",
			"top":"6",
			"title":"3 lines of Java, O(logn) time, O(1) space",
			"vote":"16",
			"content":"    public class Solution {\\n        public int trailingZeroes(int n) {\\n            int s = 0;\\n            while (n>4) s += (n/=5);\\n            return s;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"52480",
			"view":"1545",
			"top":"7",
			"title":"Share my 3ms solution in C",
			"vote":"16",
			"content":"int trailingZeroes(int n) {\\n    int res = 0;\\n\\n    do\\n    {\\n        res += n/5;\\n    }while(n /= 5);\\n    \\n    return res;\\n}"
		},
		{
			"lc_ans_id":"52510",
			"view":"1540",
			"top":"8",
			"title":"O(log5_n) solution, python.",
			"vote":"16",
			"content":"1. meet the number that can be dived by 5, the Trailing will have 1 more zero.\\n\\n2 .meet the number that can be dived by 5*5, the Trailing will have 2 more zero.\\n..\\n\\n..\\n\\n..\\n\\nand so on.\\n\\n\\nso we just find how many number can be dived by 5, can be dived by 5*5 ...  and sum up.\\n\\n\\n        def trailingZeroes(self, n):\\n            r = 0\\n            while n > 0:\\n                n /= 5\\n                r += n\\n            return r"
		},
		{
			"lc_ans_id":"52399",
			"view":"1842",
			"top":"9",
			"title":"My python solution in O(1) space O(logN) time",
			"vote":"15",
			"content":"**Concept:**\\n\\nSince 0 only company with 5*2\\nSo only need to count the volume of 5 factor. (because 2 always enough)\\n\\nSo..\\n100! 's  zero has => floor(100/5) + floor(100/25) =  floor(100/5) + floor((100/5)/5) \\n\\n**Code:**\\n\\n    class Solution(object):\\n        def trailingZeroes(self, n):\\n            zeroCnt = 0\\n            while n > 0:\\n                n = n/5; zeroCnt += n\\n            \\n            return zeroCnt"
		}
	],
	"id":"172",
	"title":"Factorial Trailing Zeroes",
	"content":"<p>Given an integer <i>n</i>, return the number of trailing zeroes in <i>n</i>!.</p>\r\n\r\n<p><b>Note: </b>Your solution should be in logarithmic time complexity.</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/ts\">@ts</a> for adding this problem and creating all test cases.</p>",
	"frequency":"563",
	"ac_num":"109057"
}