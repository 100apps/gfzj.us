{
	"difficulty":"2",
	"submit_num":"94513",
	"show_id":"357",
	"leetcode_id":"357",
	"answers":[
		{
			"lc_ans_id":"83041",
			"view":"22336",
			"top":"0",
			"title":"JAVA DP O(1) solution.",
			"vote":"97",
			"content":" Following the hint. Let f(n) = count of number with unique digits of length n.\\n\\nf(1) = 10.  (0, 1, 2, 3, ...., 9)\\n\\nf(2) = 9 * 9. Because for each number i from 1, ..., 9, we can pick j to form a 2-digit number ij and there are 9 numbers that are different from i for j to choose from.  \\n\\nf(3) = f(2) * 8 = 9 * 9 * 8. Because for each number with unique digits of length 2, say ij, we can pick k to form a 3 digit number ijk and there are 8 numbers that are different from i and j  for k to choose from.\\n\\nSimilarly f(4) = f(3) * 7 = 9 * 9 * 8 * 7....\\n\\n...\\n\\nf(10) = 9 * 9 * 8 * 7 * 6 * ... * 1\\n\\nf(11) = 0 = f(12) = f(13)....\\n\\nany number with length > 10  couldn't be unique digits number.\\n\\nThe problem is asking for numbers from 0 to 10^n. Hence return f(1) + f(2) + .. + f(n)\\n\\n\\nAs @4acreg suggests,  There are only 11 different ans. You can create a lookup table for it. This problem is O(1) in essence.\\n\\n      public int countNumbersWithUniqueDigits(int n) {\\n            if (n == 0)     return 1;\\n            \\n            int res = 10;\\n            int uniqueDigits = 9;\\n            int availableNumber = 9;\\n            while (n-- > 1 && availableNumber > 0) {\\n                uniqueDigits = uniqueDigits * availableNumber;\\n                res += uniqueDigits;\\n                availableNumber--;\\n            }\\n            return res;\\n        }"
		},
		{
			"lc_ans_id":"83061",
			"view":"8473",
			"top":"1",
			"title":"Java, O(1), with explanation",
			"vote":"52",
			"content":"This is a digit combination problem. Can be solved in at most 10 loops.\\n\\nWhen n == 0, return 1. I got this answer from the test case.\\n\\nWhen n == 1, _ can put 10 digit in the only position. [0, ... , 10]. Answer is 10.\\n\\nWhen n == 2, _ _ first digit has 9 choices [1, ..., 9], second one has 9 choices excluding the already chosen one. So totally 9 * 9 = 81. answer should be 10 + 81 = 91\\n\\nWhen n == 3, _ _ _ total choice is 9 * 9 * 8 = 684. answer is 10 + 81 + 648 = 739\\n\\nWhen n == 4, _ _ _ _ total choice is 9 * 9 * 8 * 7.\\n\\n...\\n\\nWhen n == 10, _ _ _ _ _ _ _ _ _ _ total choice is 9 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1\\n\\nWhen n == 11,  _ _ _ _ _ _ _ _ _ _ _ total choice is 9 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1 * 0 = 0\\n\\n    public static int countNumbersWithUniqueDigits(int n) {\\n        if (n == 0) {\\n            return 1;\\n        }\\n        int ans = 10, base = 9;\\n        for (int i = 2; i <= n && i <= 10; i++) {\\n            base = base * (9 - i + 2);\\n            ans += base;\\n        }\\n        return ans;\\n    }"
		},
		{
			"lc_ans_id":"83054",
			"view":"9694",
			"top":"2",
			"title":"Backtracking solution",
			"vote":"28",
			"content":"The idea is to append one digit at a time recursively (only append digits that has not been appended before). Number zero is a special case, because we don't want to deal with the leading zero, so it is counted separately at the beginning of the program. The running time for this program is O(10!) worst case, or O(n!) if n < 10.\\n\\nThe OJ gives wrong answer when n = 0 and n = 1. The correct answer should be:\\n\\n> 0, 1 \\n\\n> 1, 10\\n\\n> 2, 91\\n\\n> 3, 739\\n\\n>4, 5275\\n\\n>5, 32491\\n\\n> 6, 168571\\n\\n> 7, 712891\\n\\n> 8, 2345851\\n\\n> 9, 5611771\\n\\n> 10 and beyond, 8877691\\n\\n\\n----------\\n\\n\\n    public class Solution {\\n    \\tpublic static int countNumbersWithUniqueDigits(int n) {\\n    \\t\\tif (n > 10) {\\n    \\t\\t\\treturn countNumbersWithUniqueDigits(10);\\n    \\t\\t}\\n    \\t\\tint count = 1; // x == 0\\n    \\t\\tlong max = (long) Math.pow(10, n);\\n    \\n    \\t\\tboolean[] used = new boolean[10];\\n    \\n    \\t\\tfor (int i = 1; i < 10; i++) {\\n    \\t\\t\\tused[i] = true;\\n    \\t\\t\\tcount += search(i, max, used);\\n    \\t\\t\\tused[i] = false;\\n    \\t\\t}\\n    \\n    \\t\\treturn count;\\n    \\t}\\n    \\n    \\tprivate static int search(long prev, long max, boolean[] used) {\\n    \\t\\tint count = 0;\\n    \\t\\tif (prev < max) {\\n    \\t\\t\\tcount += 1;\\n    \\t\\t} else {\\n    \\t\\t\\treturn count;\\n    \\t\\t}\\n    \\n    \\t\\tfor (int i = 0; i < 10; i++) {\\n    \\t\\t\\tif (!used[i]) {\\n    \\t\\t\\t\\tused[i] = true;\\n    \\t\\t\\t\\tlong cur = 10 * prev + i;\\n    \\t\\t\\t\\tcount += search(cur, max, used);\\n    \\t\\t\\t\\tused[i] = false;\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\n    \\t\\treturn count;\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"83056",
			"view":"4541",
			"top":"3",
			"title":"Share my 0ms C++ solution with proof and explanation",
			"vote":"27",
			"content":"Q: Given a **non-negative** integer n, count all numbers with **unique digits**, x, where 0 \\u2264 x < 10^n\\n\\nA: Here I choose a math solution based on **permutation**:\\n\\n - **P(n, r) = n * (n - 1) * (n - 2) * ... * (n - r + 1)**\\n\\n----------\\n## Just take a try\\n\\n 1. When **n = 0**, ***0 \\u2264 x < 1*** with **unique digits** is 0, ***A(0) = 1***\\n\\n 2. When **n = 1**, ***0 \\u2264 x < 10*** can be divided into \\n\\n      - ***0 \\u2264 x < 1*** (calculated in 1): ***A(0) = 1***\\n\\n      - ***1 \\u2264 x < 10*** (all numbers with **ONLY 1** digit)\\n\\n      As they are **all unique**: ***A(1) = P(10,1) - 1***\\n\\n 3. When **n = 2**, ***0 \\u2264 x < 100*** with **unique digits** can be divided into\\n\\n      - ***0 \\u2264 x < 1*** (calculated in 1): ***A(0) = 1***\\n\\n      - ***1 \\u2264 x < 10*** (all numbers with **ONLY 1** digit): ***A(1) = P(10,1) - 1***\\n\\n      - ***10 \\u2264 x < 100*** (all numbers with **ONLY 2** digits)\\n\\n      As the numbers have **ONLY 2** digits, if they are with **unique digits**:\\n\\n      We need to choose **2 different digits** from **{1,2,3,4,5,6,7,8,9,0}**: ***P(10,2)***\\n\\n      And we must **filter out** the permutations **started by 0**: ***P(9,1)***\\n\\n     ***A(2) = P(10,2) - P(9,1)***\\n\\n----------\\n## Think about A(n)\\n\\n 1. When **n > 10**, ***10^(n-1) \\u2264 x < 10^n*** **MUST** have **MORE THAN 10** digits.\\n\\n  As the [Pigeonhole principle][1] says, there **MUST** be **AT LEAST N - 9** repeating numbers.\\n\\n  All numbers should be ignored, which means ***A(n) = 0 (n  > 10)***.\\n\\n 2. When **n \\u2264 10**, ***10^(n-1) \\u2264 x < 10^n*** (all numbers with **ONLY n** digits) have **unique digits** :\\n\\n - **Choose n different digits** from **{1,2,3,4,5,6,7,8,9,0}**: ***P(10,n)***\\n\\n - **Filter out** the permutations **started by 0**: ***P(9,n-1)***\\n\\n - Get **A(n) = P(10,n) - P(9,n-1) = 9 * P(9,n-1)**\\n\\n----------\\n## Combine all Intervals\\n\\n - As\\n\\n    - ***A(n) = 1 (n = 0)***\\n\\n    - ***A(n) = 9 * P(9,n-1) (0 < n \\u2264 10)***\\n\\n    -  ***A(n) = 0 (n > 10)***\\n\\n - Since we need to count all **x (0 \\u2264 x < 10^n)** with **unique digits** , we can just combine all Intervals:\\n\\n    - ***S(n) = A(0) + A(1) + A(2) + .....+ A(n)***\\n\\n - S(n) is the final answer.\\n\\n----------\\n## Code\\n\\n    class Solution {\\n    public:\\n        int permutation(int n, int r)\\n        {\\n            if(r == 0)\\n            {\\n                return 1;\\n            }else{\\n                return n * permutation(n - 1, r - 1);\\n            }\\n        }\\n        int countNumbersWithUniqueDigits(int n) {\\n            int sum = 1;\\n            if(n > 0)\\n            {\\n               int end = (n > 10)? 10 : n;\\n               for(int i = 0; i < end; i++)\\n               {\\n                   sum += 9 * permutation(9, i);\\n               }\\n            }\\n            return sum;\\n        }\\n    };\\n\\n----------\\n  [1]: https://en.wikipedia.org/wiki/Pigeonhole_principle"
		},
		{
			"lc_ans_id":"83040",
			"view":"2403",
			"top":"4",
			"title":"Simple Python solution, 90%",
			"vote":"16",
			"content":"```\\nclass Solution(object):\\n    def countNumbersWithUniqueDigits(self, n):\\n        \"\"\"\\n        :type n: int\\n        :rtype: int\\n        \"\"\"\\n        choices = [9, 9, 8, 7, 6, 5, 4, 3, 2, 1]\\n        ans, product = 1, 1\\n        \\n        for i in range(n if n <= 10 else 10):\\n            product *= choices[i]\\n            ans += product\\n            \\n        return ans\\n```\\n\\nFor the first (most left) digit, we have 9 options (no zero); for the second digit we used one but we can use 0 now, so 9 options; and we have 1 less option for each following digits. Number can not be longer than 10 digits."
		},
		{
			"lc_ans_id":"83052",
			"view":"1302",
			"top":"5",
			"title":"Clear c++ explanation of combinatorics, using DP method",
			"vote":"8",
			"content":"when n is 0, it is clear that there is just one number 0.\\n\\nwhen n is 1, it is trivial that there are 10 numbers: 0,1,2...9.\\n\\nwhen n is 2, the range is [0, 99]. The total unique digits is divided to two part: just one digit or two digit.\\n\\n              **dp[2]  = dp[1] + the combination with  two digits.** \\n\\n'0' could only be at unit digit. so when '0' is at unit digit, there are 9 kinds of. when there is no '0', there are 9 kinds of numbers at tens digit, and 8 kinds of numbers at unit digit. So the combination with two digits are: 9 + 9*8  is equal to \\n\\n                                       9 * (1+8) = 9 * 9.\\n\\nwhen n is 3, the range is [0, 999]. The total unique digits is divided to two part: less than 3 digit or 3 digit.\\n\\n              **dp[3]  = dp[2] + the combination with  3 digits.** \\n\\n'0' could only be at unit digit and ten's digit.\\n\\nWhen '0' is at unit digit, there are 9 * 8 kind of numbers(9 is the kind of numbers at hundred's digit, 8 is the kind of numbers at ten's digit);\\n\\nWhen '0' is at ten's digit, there are 9 * 8 kind of numbers(9 is the kind of numbers at hundred's digit, 8 is the kind of numbers at unit digit);\\n\\nWhen there is no '0', there are 9 * 8 * 7 kinds of numbers(9 is the kind of numbers at hundred's digit, 8 is the kind of numbers at ten's digit, 7 is the kind of numbers at unit digit).\\n\\nSo there are:\\n\\n                 9 * 8  + 9 * 8 + 9 * 8 * 7  = 9 * 8 * (1 + 1 + 8 ) = 9 * 9 * 8 \\n\\nkinds of combinations with three digits.\\n\\n.........\\n\\nThan it is easy to understand the DP solution of this problem.\\n\\n\\n    class Solution {\\n    public:\\n        int countNumbersWithUniqueDigits(int n) {\\n            vector<int> dp(n+1);\\n            dp[0] = 1;\\n            dp[1] = 10;\\n            for(int i = 2;i<=n;i++){\\n                dp[i] = 9;\\n                int k = 9;\\n                int count = 1;\\n                while( count <i){\\n                    dp[i] *= k;\\n                    k--;\\n                    count++;\\n                }\\n                dp[i] +=dp[i-1];\\n            }\\n            return dp[n];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"83037",
			"view":"1412",
			"top":"6",
			"title":"Very simple 15-line backtrack solution",
			"vote":"7",
			"content":"Re: [Backtracking solution](/topic/48001/backtracking-solution)\\n\\nThanks for sharing. I think it could be simplified further. This problem is kind of like permutation + subset, so we start from 0 every recursion and count through the path. Forgive me if anything unclear, here is the code:\\n\\n```java\\n    public int countNumbersWithUniqueDigits(int n) {\\n        return doCount(n, new boolean[10], 0);\\n    }\\n    \\n    private int doCount(int n, boolean[] used, int d) {\\n        if (d == n) return 1;\\n        int total = 1;\\n        for (int i = (d == 0) ? 1 : 0; i <= 9; i++) {\\n            if (!used[i]) {\\n                used[i] = true;\\n                total += doCount(n, used, d + 1);\\n                used[i] = false;\\n            }\\n        }\\n        return total;\\n    }\\n```"
		},
		{
			"lc_ans_id":"83072",
			"view":"1558",
			"top":"7",
			"title":"Java simple code O(1) space O(n) time with combinatorics knowledge",
			"vote":"7",
			"content":"test case is wrong when n==1, it should be 11 instead of 10, from 0 to 10 inclusively \\n\\nn=2  10+9 * 9\\n\\nn=3  10+9 * 9+9 * 9 * 8 \\n\\nn=4  10+9 * 9+9 * 9 * 8+9 * 9 * 8 * 7\\n\\n...\\n\\nwhen n > 10, the total number won't increase any more, so we set n=10 in that case \\n\\n    public class Solution {\\n        public int countNumbersWithUniqueDigits(int n) {\\n            if (n == 0) {\\n                return 2;\\n            }\\n            if (n == 1) {\\n                return 10; // should be 11\\n            }\\n            n = Math.min(n, 10);\\n            int sum = 10;\\n            int tmp = 9;\\n            for (int i = 1; i < n; i++) {\\n                tmp *= 10 - i;\\n                sum += tmp;\\n            }\\n            return sum;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83094",
			"view":"639",
			"top":"8",
			"title":"Simple JAVA Solution with explanation.",
			"vote":"6",
			"content":"The problem is a simple Math problem:\\n\\nLet res[i] represents the number of unique numbers among i-digit numbers.\\nFor example:\\n\\n* res[0] = 1, since there is only 0.\\n* res[1] = 9, because all one-digit numbers are unique : 1,2,3,4,5,6,7,8,9.\\n* res[2] = 81, \\nBecause among all two-digit numbers (10 - 99), the number with unique digits = 9 * 9.\\nThe first digit is chosen from (1,2,3,4,5,6,7,8,9), so there are 9 choices,\\nThe second digit is chosen from (0,1,2,3,4,5,6,7,8,9) except the one has been chosen as the first digit, so there are 9 choices.\\n\\n* res[3] = 9 * 9 * 8 = 648.\\n\\n* res[4] = 9 * 9 * 8 * 7.\\n\\nAnd so on so forth.\\nThe result is the sum from res[0] to res[n].\\n\\nWe can notice that:\\nres[0] = 1,\\nres[1] = 9,\\nres[2] = 9 * 9           = 9 * res[1],\\nres[3] = 9 * 9 * 8      = 8 * res[2],\\nres[4] = 9 * 9 * 8 * 7 = 7 * res[3].\\n\\nApparently, we can compute the latter one using DP.\\n\\nCode:\\n\\n```\\npublic class Solution {\\n    public int countNumbersWithUniqueDigits(int n) {\\n        int res[] = new int[n + 1];\\n        res[0] = 1;\\n        int sum = 1;\\n        int k = 9;\\n        for(int i = 1; i <= n && k > 0; i++){\\n               if(i == 1) res[i] += res[i - 1] * 9;\\n               else res[i] += res[i - 1] * k--;\\n               sum += res[i];\\n        }\\n        return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"83167",
			"view":"1109",
			"top":"9",
			"title":"11 lines C++ solution with detailed explanation",
			"vote":"4",
			"content":" It's a statistical solution.\\n\\nSay we have an i-bit-number, the MSB is not 0. \\n\\nFor the MSB, we can put 1 ~ 9, that is **9** options. \\n\\nAnd for the second MSB, we can put 0 ~ 9 exclude the digit we already used for the MSB, so that should be **9** options.\\n\\nThen, the third MSB, put 0 ~ 9 exclude the digits we used for the left two bits. That's **8** options.\\n\\n...\\n\\nTotally, we have **9 * 9 * 8 * 7 * ...** till the LSB.\\n\\nConsider numbers with 1 to n digits. Then I came into the following solution.\\n\\n\\n\\n       int countNumbersWithUniqueDigits(int n) \\n            {\\n                int num = 0;\\n                for(int i = n; i >= 1; --i)\\n                {\\n                    int part = 9;\\n                    for(int j = 0; j < i - 1; ++j)\\n                    {\\n                        part *= 9 - j;\\n                    }\\n                    num += part; \\n                }\\n                return num + 1;  //Include 0.\\n            }"
		}
	],
	"id":"357",
	"title":"Count Numbers with Unique Digits",
	"content":"<p>Given a <b>non-negative</b> integer n, count all numbers with unique digits, x, where 0 &le; x &lt; 10<sup>n</sup>.</p>\r\n\r\n<p>\r\n    <b>Example:</b><br/>\r\nGiven n = 2, return 91. (The answer should be the total numbers in the range of 0 &le; x &lt; 100, excluding <code>[11,22,33,44,55,66,77,88,99]</code>)\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://discuss.leetcode.com/user/memoryless\">@memoryless</a> for adding this problem and creating all test cases.</p>",
	"frequency":"336",
	"ac_num":"43562"
}