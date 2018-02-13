{
	"difficulty":"2",
	"submit_num":"114096",
	"show_id":"343",
	"leetcode_id":"343",
	"answers":[
		{
			"lc_ans_id":"80721",
			"view":"28171",
			"top":"0",
			"title":"Why factor 2 or 3? The math behind this problem.",
			"vote":"173",
			"content":"I saw many solutions were referring to factors of 2 and 3. But why these two magic numbers? Why other factors do not work?\\nLet's study the math behind it.\\n\\nFor convenience, say **n** is sufficiently large and can be broken into any smaller real positive numbers. We now try to calculate which real number generates the largest product.\\nAssume we break **n** into **(n / x)**  **x**'s, then the product will be **x<sup>n/x</sup>**, and we want to maximize it.\\n\\nTaking its derivative gives us **n * x<sup>n/x-2</sup> * (1 - ln(x))**.\\nThe derivative is positive when **0 < x < e**, and equal to **0** when **x = e**, then becomes negative when **x > e**,\\nwhich indicates that the product increases as **x** increases, then reaches its maximum when **x = e**, then starts dropping.\\n\\nThis reveals the fact that if **n** is sufficiently large and we are allowed to break **n** into real numbers,\\nthe best idea is to break it into nearly all **e**'s.\\nOn the other hand, if **n** is sufficiently large and we can only break **n** into integers, we should choose integers that are closer to **e**.\\nThe only potential candidates are **2** and **3** since **2 < e < 3**, but we will generally prefer **3** to **2**. Why?\\n\\nOf course, one can prove it based on the formula above, but there is a more natural way shown as follows.\\n\\n**6 = 2 + 2 + 2 = 3 + 3**. But **2 * 2 * 2 < 3 * 3**.\\nTherefore, if there are three **2**'s in the decomposition, we can replace them by two **3**'s to gain a larger product.\\n\\nAll the analysis above assumes **n** is significantly large. When **n** is small (say **n <= 10**), it may contain flaws.\\nFor instance, when **n = 4**, we have **2 * 2 > 3 * 1**.\\nTo fix it, we keep breaking **n** into **3**'s until **n** gets smaller than **10**, then solve the problem by brute-force."
		},
		{
			"lc_ans_id":"80689",
			"view":"16535",
			"top":"1",
			"title":"A simple explanation of the math part and a O(n) solution",
			"vote":"118",
			"content":"The first thing we should consider is : What is the max product if we break a number N into two factors?\\n\\nI use a function to express this product: f=x(N-x)\\n\\nWhen x=N/2, we get the maximum of this function.\\n\\nHowever, factors should be integers. Thus the maximum is (N/2)*(N/2) when N is even or (N-1)/2 *(N+1)/2 when N is odd.\\n\\nWhen the maximum of f is larger than N, we should do the break.\\n\\n(N/2)*(N/2)>=N, then N>=4\\n\\n(N-1)/2 *(N+1)/2>=N, then N>=5\\n\\nThese two expressions mean that factors should be less than 4, otherwise we can do the break and get a better product. The factors in last result should be 1, 2 or 3. Obviously, 1 should be abandoned. Thus, the factors of the perfect product should be 2 or 3.\\n\\nThe reason why we should use 3 as many as possible is \\n\\nFor 6, 3 * 3>2 * 2 * 2. Thus, the optimal product should contain no more than three 2. \\n\\nBelow is my accepted, O(N) solution.\\n\\n    public class Solution {\\n        public int integerBreak(int n) {\\n            if(n==2) return 1;\\n            if(n==3) return 2;\\n            int product = 1;\\n            while(n>4){\\n                product*=3;\\n                n-=3;\\n            }\\n            product*=n;\\n            \\n            return product;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"80694",
			"view":"12874",
			"top":"2",
			"title":"Java DP solution",
			"vote":"54",
			"content":"    public int integerBreak(int n) {\\n           int[] dp = new int[n + 1];\\n           dp[1] = 1;\\n           for(int i = 2; i <= n; i ++) {\\n               for(int j = 1; j < i; j ++) {\\n                   dp[i] = Math.max(dp[i], (Math.max(j,dp[j])) * (Math.max(i - j, dp[i - j])));\\n               }\\n           }\\n           return dp[n];\\n        }"
		},
		{
			"lc_ans_id":"80785",
			"view":"9700",
			"top":"3",
			"title":"O(log(n)) Time solution with explanation",
			"vote":"46",
			"content":"Given a number n lets say we have a possible product P = p1 * p2 * ... *pk. Then we notice what  would happen if we could break pi up into two more terms lets say one of the terms is 2 we would get the terms  pi-2 and 2 so if 2*(pi-2) > pi we would get a bigger product and this happens if pi > 4. since there is one other possible number less then 4 that is not 2  aka 3. Likewise for 3 if we instead breakup the one of the terms into pi-3 and 3 we would get a bigger product if 3*(pi-3) > pi which happens if  pi > 4.5.\\n\\nHence we see that all of the terms in the product must be 2's and 3's. So we now just need to write n = a*3 + b*2 such that P =  (3^a) * (2^b) is maximized. Hence we should favor more 3's then 2's in the product then 2's if possible. \\n\\nSo if n = a*3 then the answer will just be 3^a. \\n\\nif n = a*3 + 2 then the answer will be 2*(3^a).\\n\\nand if n = a*3  + 2*2  then the answer will be 2 * 2 * 3^a\\n\\nThe above three cover all cases  that n can be written as and the Math.pow() function takes O(log n) time to preform hence that is the running time.\\n\\n\\n    public class Solution {\\n        public int integerBreak(int n) {\\n            if(n == 2)\\n                return 1;\\n            else if(n == 3)\\n                return 2;\\n            else if(n%3 == 0)\\n                return (int)Math.pow(3, n/3);\\n            else if(n%3 == 1)\\n                return 2 * 2 * (int) Math.pow(3, (n - 4) / 3);\\n            else \\n                return 2 * (int) Math.pow(3, n/3);\\n        }\\n                \\n    }"
		},
		{
			"lc_ans_id":"80720",
			"view":"4094",
			"top":"4",
			"title":"Easy to understand C++ with explanation",
			"vote":"20",
			"content":"For any integer `p` strictly greater than `4`, it has the property such that `3 * (p - 3) > p`, which means breaking it into two integers `3` and `p - 3` makes the product larger while keeping the sum unchanged. If `p - 3` is still greater than `4`, we should break it again into `3` and `p - 6`, giving `3 * 3 * (p - 6)`, and so on, until we cannot break it (less than or equal to 4) anymore. \\n\\nFor integer `4`, breaking it into `2 * 2` or keeping it as `4` does not change its contribution to the product. \\nWe cannot have more than two `4`s, because `2 * 3 * 3 > 4 * 4`. We cannot have more than three `2`s because `3 * 3 > 2 * 2 * 2`. \\n\\n\\n    class Solution {\\n    public:\\n        long long integerBreak(long long n) {\\n            if(n == 2) return 1;\\n            if(n == 3) return 2;\\n            if(n == 4) return 4;\\n            if(n == 5) return 6;\\n            if(n == 6) return 9;\\n            return 3 * integerBreak(n - 3);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"80772",
			"view":"1918",
			"top":"5",
			"title":"C++ dynamic programming solution",
			"vote":"16",
			"content":"    class Solution {\\n    public:\\n        int integerBreak(int n) {\\n            \\n            if (n <= 2)\\n                return 1;\\n\\n            vector<int> maxArr(n+1, 0);\\n                        \\n            /** For a number i: write i as a sum of integers, then take the product of those integers.\\n            maxArr[i] = maximum of all the possible products */\\n            \\n            maxArr[1] = 0;\\n            maxArr[2] = 1; // 2=1+1 so maxArr[2] = 1*1\\n            \\n            for (int i=3; i<=n; i++) {\\n                for (int j=1; j<i; j++) {\\n                    /** Try to write i as: i = j + S where S=i-j corresponds to either one number or a sum of two or more numbers\\n                    \\n                    Assuming that j+S corresponds to the optimal solution for maxArr[i], we have two cases:\\n                    (1) i is the sum of two numbers, i.e. S=i-j is one number, and so maxArr[i]=j*(i-j)\\n                    (2) i is the sum of at least three numbers, i.e. S=i-j is a sum of at least 2 numbers,\\n                    and so the product of the numbers in this sum for S is maxArr[i-j]\\n                    (=maximum product after breaking up i-j into a sum of at least two integers):\\n                    maxArr[i] = j*maxArr[i-j]\\n                    */\\n                    maxArr[i] = max(maxArr[i], max(j*(i-j), j*maxArr[i-j]));\\n                }\\n            }\\n            return maxArr[n];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"80832",
			"view":"2076",
			"top":"6",
			"title":"Share some thought process about this problem",
			"vote":"16",
			"content":"    If we want to break a number, breaking it into 3s turns out to be the most efficient.\\n    2^3 < 3^2\\n    4^3 < 3^4\\n    5^3 < 3^5\\n    6^3 < 3^6\\n    ...\\n    \\n    Therefore, intuitively, we want as many 3 as possible \\n    if a number % 3 == 0, we just break it into 3s -> the product is Math.pow(3, n/3)\\n\\n    As for numbers % 3 == 1, we don't want the 'times * 1' in the end; \\n        borrowing a 3 is a natural thought. \\n        if we borrow a 3, 3 can be divided into \\n             case 1: 1 + 2 -> with the extra 1, we have 2*2 = 4\\n             case 2: (0) + 3 -> with the extra 1, we have 4\\n             turns out these two cases have the same results\\n        so, for numbers % 3 == 1 -> the result would be Math.pow(3, n/3-1)*4\\n\\n    Then we have the numbers % 3 == 2 left\\n         again, we try to borrow a 3,\\n             case 1: 1+2 -> with the extra 2, we have 1*5 or 3*2 => 3*2 is better\\n             case 2: 0+3 -> with the extra 2, we have 2*3 or 5 => 2*3 is better\\n         and we actually just end up with not borrowing at all! \\n         so we can just *2 if we have an extra 2 -> the result would be Math.pow(3, n/3)*2\\n\\n    Then, we have a couple corner cases two deal with since so far we only looked at \\n    numbers  that are larger than 3 -> luckily, we only have 2 and 3 left, \\n    which are pretty easy to figure out\\n    \\n    Thus my final solution is \\n\\n    public class Solution {\\n        public int integerBreak(int n) {\\n            if(n <= 3) return n-1; //assuming n >= 2\\n            return n%3 == 0 ? (int)Math.pow(3, n/3) : n%3 == 1 ? (int)Math.pow(3, n/3-1)*4 : (int)Math.pow(3, n/3)*2;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"80780",
			"view":"1862",
			"top":"7",
			"title":"C++ O(n) solution with DP",
			"vote":"13",
			"content":"    class Solution {\\n    public:\\n        int integerBreak(int n) {\\n            int dp[n + 1];\\n            dp[0] = 0;\\n            dp[1] = 1;\\n            dp[2] = 1;\\n            dp[3] = 2;\\n            dp[4] = 4;\\n            for (int i = 5; i <= n; ++i) {\\n                dp[i] = 3 * max(i - 3, dp[i - 3]);\\n            }\\n            return dp[n];\\n        }\\n    };\\n\\n2 => 1, 1 => 1  \\n3 => 2, 1 => 2  \\n4 => 2, 2 => 4  \\n5 => 3, 2 => 6  \\n6 => 3, 3 => 9  \\n7 => 3, 4 => 12  \\n8 => 3, 5 => 18  \\n9 => 3, 6 => 27  \\n10 => 3, 7 => 36  \\n\\nBy observation, when you get maximum, one of the num is always 3.   \\nAfter 3, the result will be larger than or equal the number itself."
		},
		{
			"lc_ans_id":"80723",
			"view":"1305",
			"top":"8",
			"title":"Simple Java solution",
			"vote":"13",
			"content":"    Basic idea is to divide your number into threes unless when the last number is 4\\nEg : \\n\\n    7 = 3 * 2 * 2\\n    8 = 3 * 3 * 2\\n    9 = 3 * 3 * 3\\n    10 = 3 * 3 * 2 * 2\\n    11 = 3 * 3 * 3 * 2\\n    12 = 3 * 3 * 3 * 3\\n    13 = 3 * 3 * 3 * 2 * 2\\nSee, the pattern?\\n\\n   \\tpublic static int integerBreak(int n) {\\n\\t\\tif(n==2||n==3) return n-1;\\n\\t\\tif(n==4) return 4;\\n\\t\\tint temp = n;\\n\\t\\tint sum = 1;\\n\\t\\twhile(temp>4){\\n\\t\\t\\ttemp = temp -3;\\n\\t\\t\\tsum = sum*3;\\n\\t\\t}\\n\\t\\t\\treturn sum*temp;\\n\\t}"
		},
		{
			"lc_ans_id":"80818",
			"view":"2510",
			"top":"9",
			"title":"Java O(n) DP solution, store and reuse products",
			"vote":"12",
			"content":"This is an O(n) solution, the idea is to store all previously calculated product, note any <code>n>4</code> will guarantee to have a factor of <code>3</code>. Modifed per suggestion of @jianbao.tao and @ericxliu, Thank you!\\n\\n\\n    public int integerBreak(int n) {\\n        if (n <= 2) return 1;\\n        if (n == 3) return 2;\\n        if (n == 4) return 4;\\n        int[] p = new int[n+1];\\n        p[2] = 2;\\n        p[3] = 3;\\n        p[4] = 4;\\n        for (int i = 5; i <= n; ++i) {\\n            p[i] = 3 * p[i-3];\\n        }\\n        return p[n];\\n    }\\n\\nWhy the max product of any <code>n>4</code> must contain a factor of 3? <br>\\n1. It can't contain any factor x that is >= 5, o.w., we can further increase the max product by decomposing x, as the decomposed x when x>=5 is strictly greater than x;<br>\\n2. Out of 1, 2, 3, 4, we know 1 won't be a factor of n when <code>n>4</code>, if n is an odd number, 3 must be there as a factor (2 and 4 can't add up to an odd number); <br>\\n3. Now say n is an even number (<code>n>4</code>) and only has factor of 2 and 4, we can always split a <code>6</code> to <code>3X3</code>, which is better than <code>2X2X2</code>.<br>\\nTherefore, the max product of any n (<code>n>4</code>) must contain a factor of 3. The recurrence relation holds.\\n\\nFurther, as it holds for all n (<code>n>4</code>), we will be only using 3 as factor for n (<code>n>4</code>), we keep subtracting 3 until <code>n<=4</code>, and adopt the remaining factor. This leads to the closed form answer:\\n\\n    public int integerBreak(int n) {\\n        if (n <= 2) return 1;\\n        if (n == 3) return 2;\\n        if (n % 3 == 0) return (int)Math.pow(3, (n/3));\\n        else if (n % 3 == 1) return 4 * (int)Math.pow(3, (n-4)/3);\\n        else return 2 * (int)Math.pow(3, (n-2)/3);\\n    }\\n\\nAs for the complexity of the close form solution, it depends on the implementation of the build-in pow, it could be O(logn) (as a simple O(logn) implementation exists), but not necessarily. The build-in pow could be better than that by using caching or bit level manipulation. I don\\u2019t know the answer though."
		}
	],
	"id":"343",
	"title":"Integer Break",
	"content":"<p>\r\nGiven a positive integer <i>n</i>, break it into the sum of <b>at least</b> two positive integers and maximize the product of those integers. Return the maximum product you can get.\r\n</p>\r\n\r\n<p>\r\nFor example, given <i>n</i> = 2, return 1 (2 = 1 + 1); given <i>n</i> = 10, return 36 (10 = 3 + 3 + 4).\r\n</p>\r\n\r\n<p>\r\n<b>Note</b>: You may assume that <i>n</i> is not less than 2 and not larger than 58.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"366",
	"ac_num":"52966"
}