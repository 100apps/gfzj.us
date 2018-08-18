{
	"difficulty":"1",
	"submit_num":"85293",
	"show_id":"276",
	"leetcode_id":"276",
	"answers":[
		{
			"lc_ans_id":"71156",
			"view":"26112",
			"top":"0",
			"title":"O(n) time java solution, O(1) space",
			"vote":"265",
			"content":"    public int numWays(int n, int k) {\\n        if(n == 0) return 0;\\n        else if(n == 1) return k;\\n        int diffColorCounts = k*(k-1);\\n        int sameColorCounts = k;\\n        for(int i=2; i<n; i++) {\\n            int temp = diffColorCounts;\\n            diffColorCounts = (diffColorCounts + sameColorCounts) * (k-1);\\n            sameColorCounts = temp;\\n        }\\n        return diffColorCounts + sameColorCounts;\\n    }\\n\\nWe divided it into two cases. \\n\\n1. the last two posts have the same color, the number of ways to paint in this case is *sameColorCounts*.\\n\\n2. the last two posts have different colors, and the number of ways in this case is *diffColorCounts*.\\n\\nThe reason why we have these two cases is that we can easily compute both of them, and that is all I do. When adding a new post, we can use the same color as the last one (if allowed) or different color. If we use different color, there're *k-1* options, and the outcomes shoule belong to the *diffColorCounts* category. If we use same color, there's only one option, and we can only do this when the last two have different colors (which is the diffColorCounts). There we have our induction step.\\n\\nHere is an example, let's say we have 3 posts and 3 colors. The first two posts we have 9 ways to do them, (1,1), (1,2), (1,3), (2,1), (2,2), (2,3), (3,1), (3,2), (3,3). Now we know that\\n\\n    diffColorCounts = 6;\\nAnd\\n\\n    sameColorCounts = 3;\\n\\nNow for the third post, we can compute these two variables like this: \\n\\nIf we use different colors than the last one (the second one), these ways can be added into *diffColorCounts*, so if the last one is 3, we can use 1 or 2, if it's 1, we can use 2 or 3, etc. Apparently there are `(diffColorCounts + sameColorCounts) * (k-1)` possible ways. \\n\\nIf we use the same color as the last one, we would trigger a violation in these three cases (1,1,1), (2,2,2) and (3,3,3). This is because they already used the same color for the last two posts. So is there a count that rules out these kind of cases? YES, the *diffColorCounts*. So in cases within *diffColorCounts*, we can use the same color as the last one without worrying about triggering the violation. And now as we append a same-color post to them, the former *diffColorCounts* becomes the current *sameColorCounts*.\\n\\nThen we can keep going until we reach the n. And finally just sum up these two variables as result.\\n\\nHope this would be clearer."
		},
		{
			"lc_ans_id":"71150",
			"view":"7135",
			"top":"1",
			"title":"Python solution with explanation",
			"vote":"89",
			"content":"If n == 1, there would be k-ways to paint.\\n\\nif n == 2, there would be two situations:\\n\\n - 2.1 You paint same color with the previous post: k*1 ways to paint, named it as `same`\\n - 2.2 You paint differently with the previous post: k*(k-1) ways to paint this way, named it as `dif`\\n\\nSo, you can think, if n >= 3, you can always maintain these two situations, \\n`You either paint the same color with the previous one, or differently`.\\n\\nSince there is a rule: \"no more than two adjacent fence posts have the same color.\"\\n\\nWe can further analyze: \\n\\n - from 2.1, since previous two are in the same color, next one you could only paint differently, and it would form one part of \"paint differently\" case in the n == 3 level, and the number of ways to paint this way would equal to `same*(k-1)`.\\n - from 2.2, since previous two are not the same, you can either paint the same color this time (`dif*1`) ways to do so, or stick to paint differently (`dif*(k-1)`) times.\\n\\nHere you can conclude, when seeing back from the next level, ways to paint the same, or variable `same` would equal to `dif*1 = dif`, and ways to paint differently, variable `dif`, would equal to `same*(k-1)+dif*(k-1) = (same + dif)*(k-1)`\\n\\nSo we could write the following codes:\\n\\n            \\n        if n == 0:\\n            return 0\\n        if n == 1:\\n            return k\\n        same, dif = k, k*(k-1)\\n        for i in range(3, n+1):\\n            same, dif = dif, (same+dif)*(k-1)\\n        return same + dif"
		},
		{
			"lc_ans_id":"71159",
			"view":"5005",
			"top":"2",
			"title":"Clarify on \"no more than two adjacent fence posts\"",
			"vote":"81",
			"content":"There can be multiple 2 adjacent posts have same colors--a more clear way to put it is \"no 3 adjacent posts have the same color\"\\n\\nfor 4 post 2 color case (0 for black, 1 for red)  \\n0011 is a valid solution,  \\n0001 is not"
		},
		{
			"lc_ans_id":"71162",
			"view":"6411",
			"top":"3",
			"title":"Easy to understand Java O(n) runtime, O(1) space",
			"vote":"45",
			"content":"w(n) number of ways to paint n posts\\n\\np(n) color of the nth post\\n\\nw(n) consists of two cases:\\n\\n1.p(n) == p(n - 1)\\n\\n2.p(n) != p(n - 1)\\n\\ncase 2 is easy. for every way of painting all previous (n - 1) posts, you have (k - 1) ways to paint p(n)\\nbecause you can choose k - 1 different color rather than the same color as p(n - 1)\\n\\nso w(n - 1) * (k - 1)\\n\\nnotice that for p(n) == p(n - 1), p(n - 1) must be not equal to p(n - 2), this is equalvalent to replace n by n - 1\\nfor the formular above, essentially the same as case2 but for a smaller n.\\nso w(n - 1 - 1) * (k - 1)\\n\\nso w(n) = (k - 1) * (w(n - 1) + w(n - 2))\\n\\n    public class Solution {\\n        public int numWays(int n, int k) {\\n            if ((n == 0 || k == 0) || (k == 1 && n >= 3))\\n                return 0;\\n            int w1 = k;\\n            int w2 = k * k;\\n            int w3; \\n            if (n == 1)\\n                return w1;\\n            if (n == 2)\\n                return w2;\\n            for (int i = 0; i <= n - 3; i++) {\\n                w3 = (k - 1) * (w2 + w1);\\n                w1 = w2;\\n                w2 = w3;\\n            }\\n            return w2; // wrong if you return w3, w3 may not be initialized.\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71182",
			"view":"4681",
			"top":"4",
			"title":"Java DP solution",
			"vote":"31",
			"content":"     public int numWays(int n, int k) {\\n        if (n == 0 || k == 0) return 0;\\n        if (n == 1) return k;\\n        // same[i] means the ith post has the same color with the (i-1)th post.\\n        int[] same = new int[n];\\n        // diff[i] means the ith post has a different color with the (i-1)th post.\\n        int[] diff = new int[n];\\n        same[0] = same[1] = k;\\n        diff[0] = k;\\n        diff[1] = k * (k - 1);\\n        for (int i = 2; i < n; ++i) {\\n            same[i] = diff[i-1];\\n            diff[i] = (k - 1) * same[i-1] + (k - 1) * diff[i-1];\\n        }\\n        return same[n-1] + diff[n-1];\\n    }"
		},
		{
			"lc_ans_id":"71151",
			"view":"3534",
			"top":"5",
			"title":"Lucas formula, maybe \"O(1)\", and 3/4-liners",
			"vote":"25",
			"content":"If `ways[i]` is the number of ways to paint `i` posts, then:\\n\\n`ways[0] = 0` (I think it should be 1, but whatever...)  \\n`ways[1] = k`  \\n`ways[2] = k * k`  \\n`ways[i>2] = (ways[i-1] + ways[i-2]) * (k - 1)`\\n\\nThe `i>2` case is like that because you can use the color for the last post just for the last post or for the two last posts, extending either the `i-1` or the `i-2` case, and in both cases, you must choose from the `k-1` colors that the case you're extending didn't end with.\\n\\n---\\n\\n**\"Normal\" solutions**\\n\\nRuby\\n\\n    def num_ways(n, k)\\n      w = [0, k, k*k]\\n      w << (w[-1] + w[-2]) * (k-1) until w[n]\\n      w[n]\\n    end\\n\\nPython\\n\\n    def numWays(self, n, k):\\n        w = [0, k, k*k]\\n        while len(w) <= n:\\n            w += sum(w[-2:]) * (k-1),\\n        return w[n]\\n\\nRuby, but instead of the full array just hold the two latest values in two variables:\\n\\n    def num_ways(n, k)\\n      return 0 if n == 0\\n      a, b = k, k * k\\n      (n - 1).times { a, b = b, (a + b) * (k - 1) }\\n      a\\n    end\\n\\n---\\n\\n**Using a [Lucas sequence formula](https://en.wikipedia.org/wiki/Lucas_sequence#Distinct_roots)**\\n\\nLucas sequences have recurrence relation x<sub>n</sub> = P x<sub>n\\u22121</sub> \\u2212 Q x<sub>n\\u22122</sub> and our recurrence relation here is like that, with P = k-1 and Q = -(k-1).\\n\\nPython:\\n\\n    def numWays(self, n, k):\\n        if k == 0 or n == 0:\\n            return 0\\n        if k == 1:\\n            return int(n < 3)\\n        P = k - 1\\n        D = P * (P + 4)\\n        a = (P + D ** 0.5) / 2\\n        return int(a ** (n + 1) / D ** 0.5 * k / P + 0.5)\\n\\nRecently I tried to find out how Python (and other languages) implements powers and I couldn't really find it, but I suspect it does something like normalize the arguments and then use a fixed number of Taylor series elements, possibly making it \"O(1)\" time (see [this possible implementation](http://www.netlib.org/fdlibm/e_pow.c), especially the `t1  = z - t*(P1+t*(P2+t*(P3+t*(P4+t*P5))))` line). Not sure, though, I didn't dig deep enough and didn't think it all through. But this speed test seems to suggest constant time as well:\\n\\n    >>> from timeit import timeit\\n\\n    >>> timeit('1.234567 ** e', 'e = 3',    number=10000000)\\n    3.2585193067939144\\n    >>> timeit('1.234567 ** e', 'e = 3000', number=10000000)\\n    3.25025353457022\\n\\n    >>> timeit('1.0001 ** e', 'e = 2',       number=10000000)\\n    3.2604847208940555\\n    >>> timeit('1.0001 ** e', 'e = 1000000', number=10000000)\\n    3.2623635387462855"
		},
		{
			"lc_ans_id":"71152",
			"view":"6924",
			"top":"6",
			"title":"Dynamic programming, C++, O(n) time, O(1) space, 0ms",
			"vote":"25",
			"content":"Need two one-dimensional array dp1 and dp2,\\ndp1[i] means the number of solutions when the color of last two fences (whose indexes are i-1,i-2) are same.\\ndp2[i] means the number of solutions when the color of last two fences are different.\\n\\nSo\\n\\n **dp1[i]=dp2[i-1],**\\n\\n**dp2[i]=(k-1)*(dp1[i-1]+dp2[i-1]) =(k-1)*(dp2[i-2]+dp2[i-1])**\\n\\nFinal result is dp1[n-1]+dp2[n-1];\\n\\nIn the code, variable *a,c* mean the last two items of dp1, variable *b,d* mean the last two items of dp2, and c could be eliminated.\\n\\n    class Solution {\\n    public:\\n        int numWays(int n, int k) {\\n            if(n<=1 || k==0)return n*k;\\n            int a=k,b=k*(k-1),c=0,d=0;\\n            for(int i=2;i<n;++i){\\n                d=(k-1)*(a+b);\\n                a=b;b=d;\\n            }\\n            return a+b;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"71185",
			"view":"2430",
			"top":"7",
			"title":"Explanation of DP, O(n) time complexity, O(1) space complexity",
			"vote":"15",
			"content":"Given an 'n', there are two kinds of color combinations.\\n\\n 1. The last two colors are the **same**, which is denoted as **fsame** in my code.\\n 2. The last two colors are **different**, which is denoted as **fdiff** in my code.\\n\\nNow consider  'n+1' and its two kinds of solutions.\\n\\n 1. Regarding case 1, the new fsame equals the old fdiff, right? Otherwise, there would be three adjacent walls with the same color.\\n 2. Regarding case 2, all old combinations with length 'n' are legally combined with one of remaining (k-1) colors.\\n\\nSo the update formula is\\n\\n 1. fsame(n + 1) = fdiff(n)\\n 2. fdiff(n + 1) = (fsame(n) + fdiff(n)) * (k - 1)\\n\\nAs no need to keep all history of fsame and fdiff, so the space complexity is O(1). The code is as follows.\\n\\n    class Solution {\\n     public:\\n      int numWays(int n, int k) {\\n        if (n == 0) {\\n          return 0;\\n        }\\n        if (n == 1) {\\n          return k;\\n        }\\n        if (n == 2) {\\n          return k * k;\\n        }\\n    \\n        // fsame(n): the number of combs, whose last digits are the same.\\n        // fdiff(n): the number of combs, whose last digits are different.\\n        int fsame = k, fdiff = k * (k - 1);\\n        for (int p = 3; p <= n; ++p) {\\n          auto fsame1 = fdiff;\\n          auto fdiff1 = (fsame + fdiff) * (k - 1);\\n          fsame = fsame1;\\n          fdiff = fdiff1;\\n        }\\n    \\n        return fsame + fdiff;\\n      }\\n    };\\n\\nTian Xia"
		},
		{
			"lc_ans_id":"71203",
			"view":"2082",
			"top":"8",
			"title":"Simple Java dp solution for with O(n) time and space, can be reduced to O(1) space",
			"vote":"14",
			"content":"    public class Solution {\\n        public int numWays(int n, int k) {\\n            if(n == 0 || k == 0) return 0;\\n            int[] dp = new int[n];\\n            for(int i = 0; i < n; i++){\\n                if(i == 0){\\n                    dp[i] = k;\\n                }\\n                else if(i == 1){\\n                    dp[i] = k*k;\\n                }\\n                else{\\n                    dp[i] = dp[i-1]*(k-1) + dp[i-2]*(k-1);\\n                }\\n            }\\n            return dp[n-1];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71200",
			"view":"1523",
			"top":"9",
			"title":"Complete Explanation O(n) time +O(1) Space",
			"vote":"9",
			"content":"Explanation:\\nAs we can paint at most two adjacent posts with same color, we can never have such a situation: For example: BBBW or WWWB or BWWW or BWWW. Here B = Black, W = White.\\n\\nLet's say we start painting from left side. Posts will look like this:\\n|^|..|^|..|^|..|^|\\n\\nHere there are 4 posts. So n = 4.\\n\\nNow for painting, i = 1,  Post #1, we have.\\n\\n     1. sameColor = 0 as there is no Post #(i-1)\\n     2. diffColor = k. because we can use any 1 of the k colors.\\n     3. total = sameColor + diffColor = 0 + k = k\\n\\nAt any given Post i, i > 1, we can have two ways\\n\\n     1. sameColor = Paint with same color as Post #(i-1)\\n     2. diffColor = Paint with different color than Post #(i-1)\\n     3. total = sameColor + diffColor\\nOr, \\n\\n     1. sameColor = diffColor*1 = diffColor of Post #(i-1)\\n     2. diffColor = (k-1)*total at Post #(i-1)\\n     3. total = sameColor + diffColor\\n\\nFor diffColor, We multiply total by k-1 because you can use any color except 1 color which was the previous.\\n\\n\\n<pre><code>\\n    class Solution {\\n    public:\\n        int numWays(int n, int k) {\\n            if(k==0 || n == 0 || (n>2 && k==1) ) return 0;\\n            int sameColor = 0;\\n            int diffColor = k;\\n            int total = diffColor + sameColor;\\n            for(int i=2; i<=n; i++){\\n                sameColor = diffColor; \\n                diffColor = (k-1)*total;\\n                total = (diffColor+sameColor);\\n            }\\n            return total;\\n        }\\n    };\\n</pre></code>\\n\\n\\nAsk me anything. No question is silly."
		}
	],
	"id":"276",
	"title":"Paint Fence",
	"content":"<p>\r\nThere is a fence with n posts, each post can be painted with one of the k colors.</p>\r\n<p>You have to paint all the posts such that no more than two adjacent fence posts have the same color. </p>\r\n<p>Return the total number of ways you can paint the fence. </p>\r\n\r\n<p><b>Note:</b><br>\r\nn and k are non-negative integers. </p>",
	"frequency":"236",
	"ac_num":"29779"
}