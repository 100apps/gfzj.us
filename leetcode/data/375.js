{
	"difficulty":"2",
	"submit_num":"77571",
	"show_id":"375",
	"leetcode_id":"375",
	"answers":[
		{
			"lc_ans_id":"84764",
			"view":"31899",
			"top":"0",
			"title":"Simple DP solution with explanation~~",
			"vote":"135",
			"content":"For each number x in range[i~j]\\nwe do:  result_when_pick_x = x + **max**{DP([i~x-1]),  DP([x+1, j])}    \\n                 --> *// the max means whenever you choose a number, the feedback is always bad and therefore leads you to a worse branch.*\\nthen we get  DP([i~j]) = **min**{xi, ... ,xj}    \\n                 --> *// this min makes sure that you are minimizing your cost.*\\n\\n```\\npublic class Solution {\\n    public int getMoneyAmount(int n) {\\n        int[][] table = new int[n+1][n+1];\\n        return DP(table, 1, n);\\n    }\\n    \\n    int DP(int[][] t, int s, int e){\\n        if(s >= e) return 0;\\n        if(t[s][e] != 0) return t[s][e];\\n        int res = Integer.MAX_VALUE;\\n        for(int x=s; x<=e; x++){\\n            int tmp = x + Math.max(DP(t, s, x-1), DP(t, x+1, e));\\n            res = Math.min(res, tmp);\\n        }\\n        t[s][e] = res;\\n        return res;\\n    }\\n}\\n```\\n\\nHere is a bottom up solution.\\n\\n```\\npublic class Solution {\\n    public int getMoneyAmount(int n) {\\n        int[][] table = new int[n+1][n+1];\\n        for(int j=2; j<=n; j++){\\n            for(int i=j-1; i>0; i--){\\n                int globalMin = Integer.MAX_VALUE;\\n                for(int k=i+1; k<j; k++){\\n                    int localMax = k + Math.max(table[i][k-1], table[k+1][j]);\\n                    globalMin = Math.min(globalMin, localMax);\\n                }\\n                table[i][j] = i+1==j?i:globalMin;\\n            }\\n        }\\n        return table[1][n];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"84762",
			"view":"6670",
			"top":"1",
			"title":"Improve the Question and Example",
			"vote":"67",
			"content":"Can you guys define the problem a little more and improve the test case. \\n\\nThe example provided for n=10 does not actually give the solution to the problem (it shows 21 as the result of the provided guessing pattern); however, if you run a custom testcase the leetcode server say the answer is 16.  Can you explain how we arrive at 16.  If the number is 8 and we choose 5 7 9, we pay $21.  How does one do better than that?\\n\\nAdditionally, the question states:  Given a particular n \\u2265 1, find out how much money you need to have to guarantee a win.  Well, this wording is ambiguous, as I should be able to always return n(n+1)/2 to give the sum of all numbers from 1 to n.  That would certainly guarantee a win, right?  I think you are looking for the **minimum** amount of money you need to guarantee a win.  If so, can you specify that and improve the example to reflect it (and show how the answer 16 is achieved)."
		},
		{
			"lc_ans_id":"84787",
			"view":"13673",
			"top":"2",
			"title":"Java DP solution",
			"vote":"57",
			"content":"Definition of ```dp[i][j]```: minimum number of money to guarantee win for subproblem ```[i, j]```.\\n\\nTarget: ```dp[1][n]```\\n\\nCorner case: ```dp[i][i] = 0``` (because the only element must be correct)\\n\\nEquation: we can choose ```k (i<=k<=j)``` as our guess, and pay price ```k```. After our guess, the problem is divided into two subproblems. Notice we do not need to pay the money for both subproblems. We only need to pay the worst case (because the system will tell us which side we should go) to guarantee win. So ```dp[i][j] = min (i<=k<=j) { k + max(dp[i][k-1], dp[k+1][j]) }```\\n\\n```\\npublic class Solution {\\n    public int getMoneyAmount(int n) {\\n        if (n == 1) {\\n            return 0;\\n        }\\n        int[][] dp = new int[n + 1][n + 1];\\n        for (int jminusi = 1; jminusi < n; jminusi++) {\\n            for (int i = 0; i + jminusi <= n; i++) {\\n                int j = i + jminusi;\\n                dp[i][j] = Integer.MAX_VALUE;\\n                for (int k = i; k <= j; k++) {\\n                    dp[i][j] = Math.min(dp[i][j],\\n                                        k + Math.max(k - 1 >= i ? dp[i][k - 1] : 0,\\n                                                     j >= k + 1 ? dp[k + 1][j] : 0));\\n                }\\n            }\\n        }\\n        return dp[1][n];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"84766",
			"view":"3977",
			"top":"3",
			"title":"Clarification on the problem description. [Problem description need to be updated !!! ]",
			"vote":"54",
			"content":"It is actually confusing that the example shown in the problem description is not the best stragety to guess the final target number, and the problem itself is asking for the lowest cost achieved by best guessing strategy.\\nThe example description should be updated.\\n\\n\\n```---POSSIBLY, it can also add some example about the BEST Strategy---```\\nThe example description should be:\\n\\nfirst introducebest strategyto guess:\\n\\n1. ```for one number```, like 1, best strategy is 0$\\n2. ```for two number```, like 3,4, best strategy is 3$, which can be understood in this way: you have two way to guess: a) start by guess 4 is the target, (the worst case is) if wrong, you get charged $4, then immediately you know 3 is the target number, get get charged $0 by guessing that, and finally you get charged $4. b) similarly, if you start by 3, (the worst case is) if wrong, you get charged $3, then you immediately know that 4 is the target number, and get charged $0 for guessing this, and finally you get charged $3. In summary:\\nrange ---------> best strategy cost\\n3, 4 ---------> $3\\n5, 6 ---------> $5\\n...\\n3. ```for three number```, the best strategy is guess the middle number first, and (worst case is) if wrong, you get charged that middle number money, and then you immediately know what target number is by using \"lower\" or \"higher\" response, so in summary:\\nrange ---------> best strategy cost\\n3, 4, 5 ---------> $4\\n7, 8, 9 ---------> $8\\n...\\n4. ```for more numbers```, it can simply be reduced them into smaller ranges, and here is why DP solution make more sense in solving this.\\nsuppose the range is [start, end]\\nthe strategy here is to iterate through all number possible and select it as the starting point, say for any k between start and end, the worst cost for this is: k+DP( start, k-1 ) + DP(k+1, end ), and the goal is minimize the cost, so you need the minimum one among all those k between start and end"
		},
		{
			"lc_ans_id":"84807",
			"view":"6139",
			"top":"4",
			"title":"Java commented DP solution",
			"vote":"33",
			"content":"***Big Idea: Given any n, we make a guess k. Then we break the interval [1,n] into [1,k - 1] and [k + 1,n]. The min of worst case cost can be calculated recursively as***\\n\\n***cost[1,n] = k + max{cost[1,k - 1] + cost[k+1,n]}***\\nAlso, it takes a while for me to wrap my head around \"min of max cost\". My understand is that: you strategy is the best, but your luck is the worst. You only guess right when there is no possibilities to guess wrong.\\n```Java\\npublic class Solution {\\n    public int getMoneyAmount(int n) {\\n        // all intervals are inclusive\\n        // uninitialized cells are assured to be zero\\n        // the zero column and row will be uninitialized\\n        // the illegal cells will also be uninitialized\\n        // add 1 to the length just to make the index the same as numbers used\\n        int[][] dp = new int[n + 1][n + 1]; // dp[i][j] means the min cost in the worst case for numbers (i...j)\\n\\n        // iterate the lengths of the intervals since the calculations of longer intervals rely on shorter ones\\n        for (int l = 2; l <= n; l++) {\\n            // iterate all the intervals with length l, the start of which is i. Hence the interval will be [i, i + (l - 1)]\\n            for (int i = 1; i <= n - (l - 1); i++) {\\n                dp[i][i + (l - 1)] = Integer.MAX_VALUE;\\n                // iterate all the first guesses g\\n                for (int g = i; g <= i + (l - 1); g++) {\\n                    int costForThisGuess;\\n                    // since if g is the last integer, g + 1 does not exist, we have to separate this case\\n                    // cost for [i, i + (l - 1)]: g (first guess) + max{the cost of left part [i, g - 1], the cost of right part [g + 1, i + (l - 1)]}\\n                    if (g == n) {\\n                        costForThisGuess = dp[i][g - 1] + g;\\n                    } else {\\n                        costForThisGuess = g + Math.max(dp[i][g - 1], dp[g + 1][i + (l - 1)]);\\n                    }\\n                    dp[i][i + (l - 1)] = Math.min(dp[i][i + (l - 1)], costForThisGuess); // keep track of the min cost among all first guesses\\n                }\\n            }\\n        }\\n        return dp[1][n];\\n    }\\n}\\n```\\nAny questions, suggestions & criticism welcomed!"
		},
		{
			"lc_ans_id":"84769",
			"view":"4836",
			"top":"5",
			"title":"Two Python solutions",
			"vote":"18",
			"content":"To find out how much money I need to win the range lo..hi (the game starts with the range 1..n), I try each possible x in the range (except hi, which is pointless because hi-1 costs less and provides more information), calculate how much I need when using that x, and take the minimum of those amounts.\\n\\nBottom-up dynamic programming:\\n\\n    def getMoneyAmount(self, n):\\n        need = [[0] * (n+1) for _ in range(n+1)]\\n        for lo in range(n, 0, -1):\\n            for hi in range(lo+1, n+1):\\n                need[lo][hi] = min(x + max(need[lo][x-1], need[x+1][hi])\\n                                   for x in range(lo, hi))\\n        return need[1][n]\\n\\nTop-down with memoization, subclassing `dict` for convenience. Simpler than bottom-up because I don't need to specify ranges/loops for `lo` and `hi` and don't need to think about their orders and how big my DP matrix needs to be. On the other hand, it's slower.\\n\\n    def getMoneyAmount(self, n):\\n        class Need(dict):\\n            def __missing__(self, (lo, hi)):\\n                if lo >= hi:\\n                    return 0\\n                ret = self[lo, hi] = min(x + max(self[lo, x-1], self[x+1, hi])\\n                                         for x in range(lo, hi))\\n                return ret\\n        return Need()[1, n]\\n\\nGot the motivation to use tuples as indexes from @agave. I had used that myself sometimes in the past, but thought it would be very slow. Turns out it's not that slow. I should do some timings to get a better feeling for it..."
		},
		{
			"lc_ans_id":"84778",
			"view":"1526",
			"top":"6",
			"title":"Recursion + Memization",
			"vote":"15",
			"content":"Let's take an instance, for n = 3, we have 3 choices either to choose 1 or 2 or 3.\\nLet's say we choose 1. There are 2 possible chances,\\n* [Case X]: 1 is the actual number so you pay 0$ or,\\n* [Case Y]: 1 is not the actual number so you pay 1$ (now you know that the actual number is > 1 because for every guess we will know if its less than or greater than, in our case it can only be greater than) and have the subproblem (2, 3). To choose from (2, 3) again recursively applying the same method, you can choose either 2 or 3. If you pick 2, you have 2 possible outcomes again. 2 is the actual number and you pay 0$ for this choice or 2 is not the actual number and you pay 2$ for this choice and you know 3 is the answer since that's the only one left. On the other hand, if you had picked 3, then either 3 is correct or you pay 3$ and know 2 is the actual answer since it's the only one left. So to sum up this, you pay 2$ in the worst case if you choose 2 or pay 3$ in the worst case if you pick 3$. So we will pick the min of the worst cases which is 2$ and hence 2 is the answer for (2, 3) subproblem. (Notice the minimax? ;) ) So, the total cost paid in this is 1$ + 2$ = 3$.\\n\\nLet's say you picked 2 initially. You have 2 possible outcomes.\\n* 2 is the actual number and you pay 0$ or,\\n* 2 is not the actual number and you pay 2$. At this point, you get to know if the actual number is less than or greater than the actual number. So, you will know the answer right away without another guess. So you end up paying 2$.\\nSo, if you choose 2 initially, you risk paying 2$ at most.\\nSimilarly, if you had chosen 3 initially, you risk paying 4$ at most. Hence picking 2 initially is the best option and you risk at most 2$.\\n\\nThis leads to a natural recursion, which you can find in the code below. I have memoized it in a matrix.\\n\\n```\\npublic class Solution {\\n    int[][] dp;\\n    public int solve(int l, int r){\\n        if(l >= r) return 0;\\n        if(dp[l][r] != Integer.MAX_VALUE) return dp[l][r];\\n        for(int i = l; i <= r; i++){\\n            dp[l][r] = Math.min(dp[l][r], Math.max(i + solve(l, i-1), i + solve(i+1, r)));\\n        }\\n        return dp[l][r];\\n    }\\n    public int getMoneyAmount(int n) {\\n        dp = new int[n+1][n+1];\\n        for(int[] row: dp){\\n            Arrays.fill(row, Integer.MAX_VALUE);\\n        }\\n        return solve(1, n);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"84826",
			"view":"2196",
			"top":"7",
			"title":"An O(n^2) DP Solution, Quite Hard.",
			"vote":"15",
			"content":"Algorithm description: http://artofproblemsolving.com/community/c296841h1273742\\n\\n\\n```\\n#include <vector>\\n#include <deque>\\nusing namespace std;\\n\\nclass Solution {\\npublic:\\n    int getMoneyAmount(int n) {\\n        vector<vector<int>> u(n + 2, vector<int>(n + 2));\\n        for (int b = 2; b <= n; ++b) {\\n            int k0 = b - 1;\\n            deque<pair<int, int>> v;\\n            for (int a = b - 1; a; --a) {\\n                while (u[a][k0 - 1] > u[k0 + 1][b]) {\\n                    if (!v.empty() && v.front().second == k0) v.pop_front();\\n                    --k0;\\n                }\\n                int vn = a + u[a + 1][b];\\n                while (!v.empty() && vn < v.back().first) v.pop_back();\\n                v.emplace_back(vn, a);\\n                int u1 = u[a][k0] + k0 + 1;\\n                int u2 = v.front().first;\\n                u[a][b] = u1 < u2 ? u1 : u2;\\n            }\\n        }\\n        return u[1][n];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"84775",
			"view":"1740",
			"top":"8",
			"title":"3ms Java DP solution",
			"vote":"11",
			"content":"Similar to other DP solutions, but with two improvements.\\n1. One more corner case: if the range is less or equal to 3 (start >= end - 2), the cost will be the upper boundary minus 1 (end - 1).\\n2. When selecting the first guess, the loop starts from one index left to the middle ((start + end) / 2 - 1), and the loop break when the cost of left part is higher than the cost of right part.\\n\\nI think this problem is more similar to Burst Balloons #312.\\n\\n```\\npublic class Solution {\\n    int[][] dp;\\n    public int getMoneyAmount(int n) {\\n        dp = new int[n + 1][n + 1];\\n        return helper(1, n);\\n    }\\n    \\n    private int helper(int start, int end) {\\n        if (dp[start][end] != 0) {\\n            return dp[start][end];\\n        }\\n        if (start >= end) {\\n            return 0;\\n        }\\n        if (start >= end - 2) {\\n            return dp[start][end] = end - 1;\\n        }\\n        int mid = (start + end) / 2 - 1, min = Integer.MAX_VALUE;\\n        while (mid < end) {\\n            int left = helper(start, mid - 1);\\n            int right = helper(mid + 1, end);\\n            min = Math.min(min, mid + Math.max(left, right));\\n            if (right <= left) break;\\n            mid++;\\n        }\\n        return dp[start][end] = min;\\n    }\\n    //runtime 3ms\\n}\\n```"
		},
		{
			"lc_ans_id":"84794",
			"view":"1127",
			"top":"9",
			"title":"DP JAVA O(n^3) Solution With Explanation, 15ms, 17 lines",
			"vote":"6",
			"content":"Think about this question for three days, read the hint, still had no thought, but minimax did help, finally got this O(n^3) DP solution.  Thanks @yygy for correcting me.\\n\\nJust use an example here for explaining how to find this approach.\\nSuppose n is 5, draw a tree to find the minimum cost in worst cases.\\n![0_1469332171930_IMG_3175.JPG](/uploads/files/1469332173789-img_3175.jpg) \\n\\n\\nThrough the tree, find the transition function:\\n- f(i,j) stands for the minimum lost between guessing i and j.\\n- f(i,0) = 0, f(i,i) = 0\\n- f(i, i) = 0\\n- f(i,i+1) = i\\n- f(i,j) = min[( k from i to j) max(k+f(i,k-1), k+f(k+1,j)]\\n- the answer for this problem is f(1,n)\\n\\nThen find a way to calculate the final answer. Draw a square matrix, the value will be filled in like this:\\n![0_1469332203192_FullSizeRender.jpg](/uploads/files/1469332203662-fullsizerender.jpg) \\nHere is the code:\\n```\\n    public int getMoneyAmount(int n) {\\n        int[][] f = new int[n+2][n+2];\\n        for(int i = 1; i <  n; i++) f[i][i+1] = i;\\n        for(int k = 1; k <= n-2; k++){\\n            for(int left = n-k-1, right = n; right >= k+2; left--,right--)\\n            {        \\n                int min = Integer.MAX_VALUE;\\n            \\tfor(int i = left; i <= right; i++){\\n            \\t\\tint max = Math.max(i+f[left][i-1], i+f[i+1][right]);\\n            \\t\\tif(max < min) min = max;\\n            \\t}\\n            \\tf[left][right] = min;\\n            }\\n        }\\n        return f[1][n];\\n    }\\n```"
		}
	],
	"id":"375",
	"title":"Guess Number Higher or Lower II",
	"content":"<p>We are playing the Guess Game. The game is as follows:<p> \r\n\r\n<p>I pick a number from <strong>1</strong> to <strong>n</strong>. You have to guess which number I picked.</p>\r\n\r\n<p>Every time you guess wrong, I'll tell you whether the number I picked is higher or lower. </p>\r\n\r\n<p>However, when you guess a particular number x,  and you guess wrong, you pay <b>$x</b>. You win the game when you guess the number I picked.</p>\r\n\r\n<p>\r\n<b>Example:</b>\r\n<pre>\r\nn = 10, I pick 8.\r\n\r\nFirst round:  You guess 5, I tell you that it's higher. You pay $5.\r\nSecond round: You guess 7, I tell you that it's higher. You pay $7.\r\nThird round:  You guess 9, I tell you that it's lower. You pay $9.\r\n\r\nGame over. 8 is the number I picked.\r\n\r\nYou end up paying $5 + $7 + $9 = $21.\r\n</pre>\r\n</p>\r\n\r\n<p>Given a particular <strong>n &ge; 1</strong>, find out how much money you need to have to guarantee a <b>win</b>.</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/agave/\">@agave</a> and <a href=\"https://leetcode.com/stefanpochmann/\">@StefanPochmann</a> for adding this problem and creating all test cases.</p>",
	"frequency":"303",
	"ac_num":"27970"
}