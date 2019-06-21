{
	"difficulty":"3",
	"submit_num":"7398",
	"show_id":"660",
	"leetcode_id":"660",
	"answers":[
		{
			"lc_ans_id":"106561",
			"view":"3721",
			"top":"0",
			"title":"One Line Java Solution",
			"vote":"34",
			"content":"This is a radix problem.\\nJust change decimal to 9-based.\\n```java\\npublic int newInteger(int n) {\\n    return Integer.parseInt(Integer.toString(n, 9));\\n}\\n```\\n\\nOf course, you can write it yourself.\\n```java\\npublic int newInteger(int n) {\\n\\tint ans = 0;\\n\\tint base = 1;\\n\\t\\t\\n\\twhile (n > 0){\\n\\t\\tans += n % 9 * base;\\n\\t\\tn /= 9;\\n\\t\\tbase *= 10;\\n\\t}\\n\\treturn ans;\\n}\\n```"
		},
		{
			"lc_ans_id":"106583",
			"view":"1365",
			"top":"1",
			"title":"Python, Straightforward with Explanation",
			"vote":"15",
			"content":"The set of numbers without 9s is the same as the set of base-9 numbers, and they occur in the same order.  The answer is therefore just the n-th base-9 number.\\n\\n```\\ndef newInteger(self, n):\\n    ans = ''\\n    while n:\\n        ans = str(n%9) + ans\\n        n /= 9\\n    return int(ans)\\n```"
		},
		{
			"lc_ans_id":"106558",
			"view":"1714",
			"top":"2",
			"title":"what if remove number 7?",
			"vote":"7",
			"content":"is there any one rememeber there is a leetcode question about how to calculate how many number which contains like number #7?"
		},
		{
			"lc_ans_id":"106578",
			"view":"502",
			"top":"3",
			"title":"Share my O(logn) C++ solution with thinking process and explanation",
			"vote":"5",
			"content":"---\\n## 1. Problem\\n\\n---\\nStart from integer 1, remove any integer that contains 9 such as 9, 19, 29...\\n\\nSo now, you will have a new integer sequence: 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, ...\\n\\nGiven a positive integer n, you need to return the n-th integer after removing. Note that 1 will be the first integer.\\n\\n**Example 1:**\\n```\\nInput: 9\\nOutput: 10\\n```\\n\\n**Hint:** n will not exceed ```9 x 10^8```. \\n\\n---\\n## 2. Thinking process\\n\\n---\\n#### 2.1 Find the rule\\n\\n---\\nWe can write some numbers **(including 0, as the 0th number)** in the sequence as follows:\\n\\n---\\n> #### 0, 1, 2, 3, 4, 5, 6, 7, 8 **(9 removed, 0th ~ 8th)**\\n> #### 10, 11, 12, 13, 14, 15, 16, 17, 18 **(19 removed, 9th ~ 17th)**\\n> #### ....................\\n> #### 80, 81, 82, 83, 84, 85, 86, 87, 88 **(89 removed, 72nd ~ 80th)**\\n> #### **(90~99 removed)**\\n> #### 100, 101, 102, 103, 104, 105, 106, 107, 108 **(109 removed, 81st ~ 89th)**\\n> #### ............................................\\n\\n---\\n\\nHave you found some rules?\\n\\n- the **next number of '8' is '10'**.\\n- the **next number of '18' is '20'**.\\n- ..................\\n- the **next number of '88' is '100'**.\\n\\n---\\n\\nAfter **removing 9 from the sequence of natural numbers**,\\n\\n> #### The sequence becomes an ***novenary sequence***.\\n\\nwhich means\\n\\n>#### The ***n-th number in the novenary sequence*** is a **decimal base integer**.\\n>#### **The decimal base integer has the *same format* as *n's novenary format***.\\n\\n---\\nSince the result should be returned as an decimal-based integer, we need to solve the problem in 2 steps:\\n\\n>#### **Step 1: translate n to its novenary format n'**.\\n\\n>#### **Step 2: treat n' as a decimal-based integer and output**.\\n\\n---\\nFor example:\\n\\nIf I want to get the **81st number in the sequence**,\\n\\n- First, **change the decimal number 81 to it's novenary format  \"100\". (81 = 9^2)**.\\n\\n- Second, **treat novenary format number \"100\" as a decimal-based integer 100**.\\n\\n- **Output 100**.\\n\\n---\\n#### 2.2 Algorithm design\\n\\n---\\n\\nBy dividing n by 9 and getting the remainder,  n's novenary format can be obtained digit by digit.\\n\\nAt the same time, the final result can also be obtained digit-by-digit.\\n\\n---\\n## 3. Complexity analysis\\n\\n---\\n#### 3.1 Time complexity\\n\\n---\\nSince n's novenary format and the final result are generated digit by digit,\\n\\n> #### **The time complexity is O(log9(n)) = O(logn).**\\n\\n---\\n#### 3.2 Space complexity\\n\\n---\\n\\nSince only constant space is used, \\n\\n> #### **The space complexity is O(1).**\\n\\n---\\n## 4. Code\\n\\n---\\n\\n```\\nclass Solution {\\npublic:    \\n    int newInteger(int n) {\\n        int ans = 0;\\n        int base = 1;\\n        while(n != 0)\\n        {\\n            ans = ans + (n % 9) * base;\\n            n /= 9;\\n            base *= 10;\\n        }\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"106560",
			"view":"1175",
			"top":"4",
			"title":"6 lines c++ solution, decimal to nonary conversion",
			"vote":"4",
			"content":"```\\nint newInteger(int n) {\\n    int res = 0, s = 1;\\n    while (n > 0) {\\n        res += n % 9 * s;\\n        n /= 9;\\n        s *= 10;\\n    }\\n    return res;\\n}\\n```\\nYou may already know binary and decimal where number goes up to a more significant digit when it hits two or ten. e.g. 2^1=>10, 2^2=>100, 2^3=>1000.\\nThe problem here is almost the same. When it hits 9 it goes up. e.g. 9^1=>10, 9^2=>100, 9^3=>1000, etc. Simply use our math knowledge to convert back making use of division and modulo."
		},
		{
			"lc_ans_id":"106586",
			"view":"101",
			"top":"5",
			"title":"JavaScript 3 approaches (includes a one-liner)",
			"vote":"2",
			"content":"This question is essentially about converting the number to base 9.\\n\\n**First approach** - Built-in base conversion.\\n```\\nvar newInteger = function(n) {\\n    return parseInt(n.toString(9), 10);\\n};\\n```\\n\\n**Second approach** - Intermediate result is number.\\n```\\nvar newInteger = function(n) {\\n    let pow = 0, res = 0;\\n    while (n > 0) {\\n        res += Math.pow(10, pow) * (n % 9);\\n        pow++;\\n        n = Math.floor(n / 9);\\n    }\\n    return res;\\n};\\n```\\n\\n**Third approach** - Intermediate result is string.\\n```\\nvar newInteger = function(n) {\\n    let res = '';\\n    while (n > 0) {\\n        res = (n % 9) + res;\\n        n = Math.floor(n / 9);\\n    }\\n    return parseInt(res, 10);\\n};\\n```"
		},
		{
			"lc_ans_id":"106569",
			"view":"128",
			"top":"6",
			"title":"A general solution in java, useful if some number other than 9 is removed",
			"vote":"1",
			"content":"The radix solution to this problem is cool. However, what if the question requests to remove some other number? e.g. to remove 4, or even remove both 4 and 7. \\n\\nHere, I will give a general solution to this kind of questions. \\n\\nGeneral ideas: \\nThe question is \"Given a positive integer n, you need to return the n-th integer after removing (remove 9 in this question)\". Assume we got the result, x, which means that within the range [1, x], there are (x - n) integers that contains 9, right?\\n\\nFirst, we'd like to find a method to get \"how many integers contains 9 within the range [1, x]\". \\nlet's see the regular pattern in each range:\\n[1-9] = 1\\n[10-89] = 9\\n[90-99] = 10            \\n=> [10-99] = [10-89] + [90-99]\\n[100-899] = 9 *  [10-99] \\n[900-999] = 100     \\n=> [100-999] = [100-899] + [900-999] \\n[1000-8999] = 9 * [100-999] \\n[9000-9999] = 1000\\n[1000-9999] = [1000-8999] + [9000-9999]\\n...\\nThus, we can use dynamic programming to get the number of integers that contains 9 in each [10^n, 10^(n + 1) - 1] range. Then, for a specific number, we can split this number digit by digit. \\nFor example: given an integer 74925\\n[1-74925] = [1-69999] + [70000 -74925] = 7 * [1-9999] + [70000 -74925]\\n[70000 -74925] = [1-4925]\\nwe've already got the [1-9999], so we continue to split [1-4925]\\n[1-4925] = [1-3999] + [4000-4925] = 4 * [1-999] + [1-925]\\nagain, we got [1-999], continue:\\n[1-925] = [1-899] + [900-925] = 9 * [1-99] + [900-925]\\nHere, we should take notice: within this range [900-925] every integer contains 9. Therefore, we do not need to split this range any more (It means, from left to right, once you hit the first 9, no need to split the number any more) \\n[900-925] = 25 + 1\\nLet's review the procedure: \\n74925 = 7 * [1-9999] + 4 * [1-999] + 9 * [1-99] + 25 + 1;\\nIt seems we got the method \"numOf9\" to find how many integers contains 9 within [1,x]. \\n\\nSecond, I think no need to talk too much, we can use binary search to find x, where \"x - numOf9(x) == n\"\\nBUT, I'd like to emphasize that x should not contains 9. Thus, pay a little more attention during binary search to make x not contains 9. \\n\\n```\\npublic class Solution {\\n    int[] dp;\\n    public int newInteger(int n) {\\n        if (n < 9) return n;\\n        dp = new int[10];  \\n       //dp[n] corresponds to range[10^(n - 1), 10^n - 1], e.g. dp[2] is the number of 9 within [10, 99]\\n        dp[0] = 0;\\n        dp[1] = 1;\\n        int p = 10;\\n        for (int i = 2; i < 10; i++) {\\n            dp[i] = dp[i - 1] * 9 + p;\\n            p *= 10;\\n        }\\n        int left = n;\\n        int right = Integer.MAX_VALUE;\\n        while (left <= right) {\\n            int mid = left + (right - left) / 2;\\n            if (mid - numOf9(mid) >= n) {  // make sure the result does not contains 9\\n                right = mid - 1;\\n            } else {\\n                left = mid + 1;\\n            }\\n        }\\n        return left;\\n    }\\n    private int numOf9(int x) {  // 10 <= x <= MAX_INT \\n        int res = 0;\\n        int num = x;\\n        int i = 0;\\n        int p = 1;\\n        while (num != 0) {\\n            int lastdigit = num % 10;\\n            if (lastdigit == 9) {\\n                res = 9 * dp[i] + x % p + 1;\\n            } else {\\n                res += lastdigit * dp[i];\\n            }\\n            i++;\\n            p *= 10;\\n            num /= 10;\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106573",
			"view":"105",
			"top":"7",
			"title":"Alternative solution applicable to the general case",
			"vote":"1",
			"content":"As shown by others, this problem is equivalent to converting `n` to a number in base `9` and then evaluating it in base `10`. This is of course a very elegant solution to the original problem. However, in case you fail to identify this nice observation, here is an alternative solution which is also applicable to the general case where we can remove integers containing any of the digit from `1` to `9`.\\n\\n---\\n**`I -- General ideas`**\\n\\nAssume we want to remove integers containing digit `d`. For any integer `m` that does not contain digit `d`, before removing, it will be the `m-th` integer in the integer sequence starting from `1`. After removing, it will be the `m'-th` integer in the new sequence, where `m' = m - f(1, m)` and `f(i, j)` denotes the total number of integers in the range `[i, j]` (both inclusive) that contains digit `d`. Our goal is to find the integer `m` such that `m - f(1, m) = n`.\\n\\nSo our solution will be focused on how to solve the equation above. If `f(1, m)` is some simple function of `m`, we might solve for `m` analytically. Unfortunately, this is not the case, as I will show shortly. However, this does not necessarily mean we cannot find a solution. The approach taken here is an iterative method: we approximate the value of `m` in each iterative step until the actual value of `m` is reached.\\n\\nAt the beginning, no integers is removed, so the integer at the `n-th` position will be `m_0 = n`. But we know it will get shifted to the left by `f(1, m_0)` positions after removing all integers in the range `[1, m_0]` containing digit `d`. So after `1st` removing, the new integer at the `n-th` position will be `m_1 = m_0 + f(1, m_0)`. But again, we know it will get shifted to the left by `f(m_0 + 1, m_1)` positions after removing all integers in the range `[m_0 + 1, m_1]` containing digit `d`. Therefore after the `2nd` removing, the new integer at the `n-th` position will be `m_2 = m_1 + f(m_0 + 1, m_1)`. Note that the function `f(i, j)` has the following property: `f(i, k) + f(k + 1, j) = f(i, j)`, which enables us to rewrite `m_2 = m_1 + f(m_0 + 1, m_1) = m_0 + f(1, m_0) + f(m_0 + 1, m_1) = m_0 + f(1, m_1)`. We can continue in this fashion and get a series of candidate integers that appear in the `n-th` position, where after the `k-th` removing, the candidate integer will be `m_k = m_0 + f(1, m_k-1)`, with `m_0 = n`.\\n\\nOkay, we get this series of candidate integers, but which one of them will be the `m` we are looking for? Without loss of generality, assume `m_k = m`. Note that `m - f(1, m) = n`, from which we have `m_k - f(1, m_k) = n`. This further leads to `m_k = n + f(1, m_k)`. On the other hand, we know `m_k` is generated through the iterative process described above, then `m_k = m_0 + f(1, m_k-1) = n + f(1, m_k-1)`. Comparing these two equations, we get `f(1, m_k-1) = f(1, m_k)`. Therefore, we just need to find the first integer `m_k` in the series, such that `f(1, m_k-1) = f(1, m_k)`, then `m_k` will be the target integer we are looking for.\\n\\nSo our core task now is to compute `f(1, m)`, which denotes the total number of integers in the range `[1, m]` that contains digit `d`. This will be explained in the following section.\\n\\n---\\n**`II -- How to compute f(1, m) efficiently`**\\n\\nNaive way of computing `f(1, m)` would be checking each integer in the range `[1, m]` one by one and see if it contains digit `d`. This works for small `m` but definitely not for `m` as large as `9 * 10^8`. Our strategy here is to break the range down to smaller ones, taking advantage of the property of `f(i, j)` mentioned above.\\n\\nFirst let's work out `f(1, m)` for some simple cases where `m = 10^i - 1` (i.e., `m = 9, 99, 999, 9999, ...`). It's not to hard to conclude that `T(1, 10^i - 1) = 10^i - 9^i`, for `i = 0, 1, 2, 3, ...`. This is done by dividing the range `[1, 10^i - 1]` into ten smaller ones: `[1, 10^(i-1) - 1], [10^(i-1), 2 * 10^(i-1) - 1], ..., [d * 10^(i-1), (d + 1) * 10^(i-1) - 1], ..., [9 * 10^(i-1), 10^i - 1]`. The number of integers containing digit `d` in the range `[d * 10^(i-1), (d + 1) * 10^(i-1) - 1]` is `10^(i-1)`, while the numbers of integers containing digit `d` for all the other `9` ranges are the same, which is `T(1, 10^(i-1) - 1)`, therefore we obtain the following recurrence relation: `T(1, 10^i - 1) = 9 * T(1, 10^(i-1) - 1) + 10^(i-1)` with initial condition `T(1, 10^0 - 1) = 0`.\\n\\nNext we will find `f(1, m)` for arbitrary `m`. The way we break down the ranges depends on its decimal decomposition: `m = a_i * 10^i + a_i-1 * 10^(i-1) + ... + a_0`. Starting from the most significant digit (MSD), the smaller ranges are: `[1, 10^i - 1], [10^i, 2 * 10^i - 1], ..., [(a_i - 1) * 10^i, a_i * 10^i - 1], [a_i  * 10^i, m]`. The number of integers containing digit `d` depends on the relation between `a_i` and `d`. We have three cases:\\n\\n1. `a_i < d`: for this case, except for the last range, the numbers of integers containing digit `d` for all the previous `a_i` ranges are the same, which is given by `10^i - 9^i`. To find the number of integers containing digit `d` in the last range `[a_i  * 10^i, m]`, since `a_i < d`, we can subtract all numbers in the range by `a_i * 10^i` and it will be equivalent to finding the numbers of integers containing digit `d` in the range `[1, m % 10^i]`. This can be solved recursively using the method described here: `T(1, m) = a_i * (10^i - 9^i) + T(1, m % 10^i)`.\\n\\n2. `a_i = d`: for this case, again the numbers of integers containing digit `d` for all the first `a_i` ranges are the same, which is `10^i - 9^i`. Since now `a_i = d`, all integers in the last range will contain digit `d`, the number of which will be given by `m % 10^i + 1`. So we find the total number of integers containing digit `d` for this case as `T(1, m) = a_i * (10^i - 9^i) + m % 10^i + 1`.\\n\\n3. `a_i > d`: for this case, out of the first `a_i` ranges, one will consist of integers all containing digit `d` while the remaining `a_i - 1` ranges have the same number of integers containing digit `d`. To find the number of integers containing digit `d` in the last range, we can do the same as in case `1`. Therefore, we have `T(1, m) = (a_i - 1) * (10^i - 9^i) + 10^i + T(1, m % 10^i) = a_i * (10^i - 9^i) + 9^i + T(1, m % 10^i)`.\\n\\n---\\n**`III -- Solutions and complexity analyses`**\\n\\nPutting everything together, here is the Java program for solving `f(1, m)`. It takes two parameters: `m` is the upper limit of the range `[1, m]` while `d` is the digit contained by integers that we want to remove. Note we take an bottom-up iterative approach here instead of recursion.\\n\\n```\\nprivate long f(long m, long d) {\\n    long res = 0, p = 1, q = 1;\\n    \\n    for (long n = m; n >= 10; n /= 10, p *= 10, q *= 9);\\n    \\n    for (long n = m; n >= d; n %= p, p /= 10, q /= 9) {\\n        long a = n / p;\\n        res += a * (p - q);\\n        \\t\\n        if (a == d) {\\n            res += n % p + 1;\\n            break;\\n        } else if (a > d) {\\n            res += q;\\n        }\\n    }\\n    \\n    return res;\\n}\\n```\\nand here is the main program for solving `m`:\\n\\n```\\npublic int newInteger(int n) {\\n    long d = 9, pre = 0, cur = 0;\\n        \\n    do {\\n        pre = cur;\\n        cur = f(n + cur, d);\\n    } while (pre != cur);\\n        \\n    return (int)Math.min(n + cur, Integer.MAX_VALUE);\\n}\\n```\\n\\nAs for complexities of the solution, the space cost is obviously `O(1)`. The time cost of the `f(m, d)` function depends on the number of digits in `m`, and for `m <= 9 * 10^8`, this is essentially `O(1)`. The time complexity for the main function is a little bit tricky, which relies on how many iterations will be done inside the `do-while` loop. This, in turn, will depend on the frequency of appearance of integers containing digit `d` in a given range. Assume this frequency is `alpha`, the value of which apparently depends on the range under consideration. But on average `alpha` will be some value in between `0` and `1`: `0 <= alpha < 1`. The number of new integers containing digit `d` after each time of removing in part `I` will decrease like `alpha, alpha^2, alpha^3, ...`. So the total number of iterations needed will go like `logn` (this is a very rough estimate, though. I did some quick tests for random values of `n` and the maximum number of iterations found is around `50`, consistent with this estimate).\\n\\nNote the solution above applies to the general case where `d` can be any value in the range `[1, 9]`. Anyway, hope it helps for your understanding of this problem."
		},
		{
			"lc_ans_id":"106559",
			"view":"273",
			"top":"8",
			"title":"3 ms C++ Recursive Solution 3 line function body",
			"vote":"1",
			"content":"Binary numbers (Base 2) are from 0 to 1 and next numbers are 10,11,100.........\\n\\noctal numbers (Base 8) are from 0 to 7 and next numbers are 10,11,12.......17,20,............ \\n\\nwhen we remove all 9's the numbers are from 0 to 8 and next numbers are 10,11,12....18,20,.....\\n\\nhence after removing 9 we get Base 9. so finding this Base 9 number is similar to Binary Number (Base 2) & octal numbers (Base 8).\\n\\nwe need to use Division and modulo of 9 instead of 2 (for Binary) or 8 (for octal).\\n\\nExample:\\n if n = 10;\\n 10%9 * 10^0 + (10/9)%9*10^1;\\n1+10 = 11;\\n```\\nclass Solution {\\npublic:\\n    int sum = 0, i = 0 ;\\n    int newInteger(int n) {\\n        if(n == 0) return sum;  \\n       sum += n%9*pow(10,i++);\\n       return newInteger(n/9); \\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"106590",
			"view":"548",
			"top":"9",
			"title":"Java solution, divide 9",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int newInteger(int n) {\\n        int res = 0, pow = 1;\\n        while (n > 0) {\\n            res += n % 9 * pow;\\n            pow *= 10;\\n            n /=  9;\\n        }\\n        return res;\\n    }\\n}\\n```"
		}
	],
	"id":"637",
	"title":"Remove 9",
	"content":"<p>Start from integer 1, remove any integer that contains 9 such as 9, 19, 29... </p>\r\n\r\n<p>So now, you will have a new integer sequence: 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, ...</p>\r\n\r\n<p>Given a positive integer <code>n</code>, you need to return the n-th integer after removing. Note that 1 will be the first integer.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> 9\r\n<b>Output:</b> 10\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b> Hint</b>: n will not exceed <code>9 x 10^8</code>.\r\n</p>",
	"frequency":"102",
	"ac_num":"3604"
}