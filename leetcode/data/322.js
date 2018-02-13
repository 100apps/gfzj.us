{
	"difficulty":"2",
	"submit_num":"310306",
	"show_id":"322",
	"leetcode_id":"322",
	"answers":[
		{
			"lc_ans_id":"77360",
			"view":"22374",
			"top":"0",
			"title":"[C++] O(n*amount) time O(amount) space DP solution",
			"vote":"71",
			"content":"    class Solution {\\n    public:\\n        int coinChange(vector<int>& coins, int amount) {\\n            int Max = amount + 1;\\n            vector<int> dp(amount + 1, Max);\\n            dp[0] = 0;\\n            for (int i = 1; i <= amount; i++) {\\n                for (int j = 0; j < coins.size(); j++) {\\n                    if (coins[j] <= i) {\\n                        dp[i] = min(dp[i], dp[i - coins[j]] + 1);\\n                    }\\n                }\\n            }\\n            return dp[amount] > amount ? -1 : dp[amount];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"77368",
			"view":"21776",
			"top":"1",
			"title":"*Java* Both iterative and recursive solutions with explanations",
			"vote":"57",
			"content":"#Recursive Method:#\\nThe idea is very classic dynamic programming: think of the last step we take. Suppose we have already found out the best way to sum up to amount `a`, then for the last step, we can choose any coin type which gives us a remainder `r` where `r = a-coins[i]` for all `i`'s. For every remainder, go through exactly the same process as before until either the remainder is 0 or less than 0 (meaning not a valid solution). With this idea, the only remaining detail is to store the minimum number of coins needed to sum up to `r` so that we don't need to recompute it over and over again.\\n\\nCode in Java:\\n\\n    public class Solution {\\n    public int coinChange(int[] coins, int amount) {\\n        if(amount<1) return 0;\\n        return helper(coins, amount, new int[amount]);\\n    }\\n    \\n    private int helper(int[] coins, int rem, int[] count) { // rem: remaining coins after the last step; count[rem]: minimum number of coins to sum up to rem\\n        if(rem<0) return -1; // not valid\\n        if(rem==0) return 0; // completed\\n        if(count[rem-1] != 0) return count[rem-1]; // already computed, so reuse\\n        int min = Integer.MAX_VALUE;\\n        for(int coin : coins) {\\n            int res = helper(coins, rem-coin, count);\\n            if(res>=0 && res < min)\\n                min = 1+res;\\n        }\\n        count[rem-1] = (min==Integer.MAX_VALUE) ? -1 : min;\\n        return count[rem-1];\\n    }\\n    }\\n\\n\\n\\n#Iterative Method:#\\nFor the iterative solution, we think in bottom-up manner. Suppose we have already computed all the minimum counts up to `sum`, what would be the minimum count for `sum+1`?\\n\\nCode in Java:\\n\\n    public class Solution {\\n    public int coinChange(int[] coins, int amount) {\\n        if(amount<1) return 0;\\n        int[] dp = new int[amount+1];\\n        int sum = 0;\\n        \\n    \\twhile(++sum<=amount) {\\n    \\t\\tint min = -1;\\n        \\tfor(int coin : coins) {\\n        \\t\\tif(sum >= coin && dp[sum-coin]!=-1) {\\n        \\t\\t\\tint temp = dp[sum-coin]+1;\\n        \\t\\t\\tmin = min<0 ? temp : (temp < min ? temp : min);\\n        \\t\\t}\\n        \\t}\\n        \\tdp[sum] = min;\\n    \\t}\\n    \\treturn dp[amount];\\n    }\\n    }\\n\\nIf you are interested in my other posts, please feel free to check my Github page here: [https://github.com/F-L-A-G/Algorithms-in-Java][1]\\n\\n\\n  [1]: https://github.com/F-L-A-G/Algorithms-in-Java"
		},
		{
			"lc_ans_id":"77378",
			"view":"12405",
			"top":"2",
			"title":"Easy-To-Understand Recursive DP solution using Java (with explanations)",
			"vote":"45",
			"content":"This is a very classic dynamic programming algorithm. However, for someone not familiar with the concept, it can be tricky. Here we tackle the problem recursively, for each coin, if I take that coin into account, then the fewest number of coins we can get is 1+coinChange(amount-that_coin_value). So for all the coins, we return the smallest number as min(1+coinChange(amount-coin1_value), 1+coinChange(amount-coin2_value, ......).\\n\\nAs we can see it is recursive, the solution is as below, this solution of upper time complexity O(c^n) where c is number of different denominations and n is the amount given, which is exponential:\\n\\n    public class Solution {\\n        public int coinChange(int[] coins, int amount) {\\n            if(amount==0)\\n                return 0;\\n            int n = amount+1;\\n            for(int coin : coins) {\\n                int curr = 0;\\n                if (amount >= coin) {\\n                    int next = coinChange(coins, amount-coin);\\n                    if(next >= 0)\\n                        curr = 1+next;\\n                }\\n                if(curr > 0)\\n                    n = Math.min(n,curr);\\n            }\\n            int finalCount = (n==amount+1) ? -1 : n;\\n            return finalCount;\\n        }\\n    }\\n\\nThen we observed that this algorithm may compute coinChange of same amount for many times, which are kind of duplicate, if we can store \"amount->fewest_coin_count\" into hashtble, then we don't need to recompute again. Actually, this is DP (dynamic programming), aka. Memorization. So the final solution is to add hashtbl implementation to the previous solution and problem solved, this is of upper time complexity O(n^c), which is polynomial:\\n\\n    public class Solution {\\n        Map<Integer,Integer> amountDict = new HashMap<Integer,Integer>();\\n        public int coinChange(int[] coins, int amount) {\\n            if(amount==0)\\n                return 0;\\n            if(amountDict.containsKey(amount))\\n                return amountDict.get(amount);\\n            int n = amount+1;\\n            for(int coin : coins) {\\n                int curr = 0;\\n                if (amount >= coin) {\\n                    int next = coinChange(coins, amount-coin);\\n                    if(next >= 0)\\n                        curr = 1+next;\\n                }\\n                if(curr > 0)\\n                    n = Math.min(n,curr);\\n            }\\n            int finalCount = (n==amount+1) ? -1 : n;\\n            amountDict.put(amount,finalCount);\\n            return finalCount;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"77361",
			"view":"7585",
			"top":"3",
			"title":"Fast Python BFS Solution",
			"vote":"30",
			"content":"This solution is inspired by the BFS solution for problem [Perfect Square][1]. Since it is to find the least coin solution (like a shortest path from 0 to amount), using BFS gives results much faster than DP.\\n\\n    class Solution(object):\\n        def coinChange(self, coins, amount):\\n            \"\"\"\\n            :type coins: List[int]\\n            :type amount: int\\n            :rtype: int\\n            \"\"\"\\n            if amount == 0:\\n                return 0\\n            value1 = [0]\\n            value2 = []\\n            nc =  0\\n            visited = [False]*(amount+1)\\n            visited[0] = True\\n            while value1:\\n                nc += 1\\n                for v in value1:\\n                    for coin in coins:\\n                        newval = v + coin\\n                        if newval == amount:\\n                            return nc\\n                        elif newval > amount:\\n                            continue\\n                        elif not visited[newval]:\\n                            visited[newval] = True\\n                            value2.append(newval)\\n                value1, value2 = value2, []\\n            return -1\\n\\n\\n  [1]: https://leetcode.com/discuss/62229/short-python-solution-using-bfs"
		},
		{
			"lc_ans_id":"77372",
			"view":"3940",
			"top":"4",
			"title":"Clean dp python code",
			"vote":"26",
			"content":"Assume `dp[i]` is the fewest number of coins making up amount `i`, then for every `coin` in `coins`, dp[i] = min(dp[i - coin] + 1). \\n\\nThe time complexity is `O(amount * coins.length)` and the space complexity is `O(amount)`\\n\\n    class Solution(object):\\n        def coinChange(self, coins, amount):\\n            MAX = float('inf')\\n            dp = [0] + [MAX] * amount\\n    \\n            for i in xrange(1, amount + 1):\\n                dp[i] = min([dp[i - c] if i - c >= 0 else MAX for c in coins]) + 1\\n    \\n            return [dp[amount], -1][dp[amount] == MAX]"
		},
		{
			"lc_ans_id":"77404",
			"view":"6513",
			"top":"5",
			"title":"JAVA---Easy Version To Understand!!!!!",
			"vote":"22",
			"content":"    public static int coinChange(int[] coins, int amount) {\\n\\t\\tif (coins == null || coins.length == 0 || amount <= 0)\\n\\t\\t\\treturn 0;\\n\\t\\tint[] minNumber = new int[amount + 1];\\n\\t\\tfor (int i = 1; i <= amount; i++) {\\n\\t\\t\\tminNumber[i] = Integer.MAX_VALUE;\\n\\t\\t\\tfor (int j = 0; j < coins.length; j++) {\\n\\t\\t\\t\\tif (coins[j] <= i && minNumber[i - coins[j]] != Integer.MAX_VALUE)\\n\\t\\t\\t\\t\\tminNumber[i] = Integer.min(minNumber[i], 1 + minNumber[i - coins[j]]);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tif (minNumber[amount] == Integer.MAX_VALUE)\\n\\t\\t\\treturn -1;\\n\\t\\telse\\n\\t\\t\\treturn minNumber[amount];\\n\\t}"
		},
		{
			"lc_ans_id":"77417",
			"view":"1871",
			"top":"6",
			"title":"C++ dp solution, O(N*M) time, O(M) space",
			"vote":"16",
			"content":"dp[i] means the solution of amount 'i'. Initialise each element of the dp array to -1, then for each coin value c:\\n\\n1). if i - c < 0, do nothing.\\n\\n2). if i - c >= 0 and dp[i - c] != -1, means there is a solution of amount 'i - c', dp[i] = min(dp[i], dp[i - c] + 1)\\n\\n    class Solution\\n    {\\n    public:\\n        int coinChange(vector<int>& coins, int amount) \\n        {\\n            vector<int> dp(amount + 1, -1);\\n            dp[0] = 0;\\n            \\n            for (int i = 1; i <= amount; ++i)\\n                for (auto & c : coins)\\n                    if (i - c >= 0 && dp[i - c] != -1)\\n                        dp[i] = dp[i] > 0 ? min(dp[i], dp[i - c] + 1) : dp[i - c] + 1;\\n            \\n            return dp[amount];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"77385",
			"view":"2404",
			"top":"7",
			"title":"DP AC JAVA Solution 18ms Beating 95%",
			"vote":"14",
			"content":"\\n    public int coinChange(int[] coins, int amount) {\\n        if (amount < 1) return 0;\\n        int[] dp = new int[amount + 1]; \\n        Arrays.fill(dp, Integer.MAX_VALUE);\\n        dp[0] = 0;\\n        for (int coin : coins) {\\n            for (int i = coin; i <= amount; i++) {\\n                if (dp[i - coin] != Integer.MAX_VALUE) {\\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\\n                }\\n            }\\n        }\\n        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];\\n    }"
		},
		{
			"lc_ans_id":"77570",
			"view":"2054",
			"top":"8",
			"title":"Simple Java solution: O(amount) space, O(n*amount) time complexity",
			"vote":"14",
			"content":"Java solution: O(amount) space, O(n*amount) time complexity\\n\\n    public class Solution {\\n        public int coinChange(int[] coins, int amount) {\\n            if (coins == null || coins.length == 0)\\n    \\t\\t\\treturn -1;\\n    \\n    \\t\\tif (amount <= 0)\\n    \\t\\t\\treturn 0;\\n    \\n    \\t\\tint dp[] = new int[amount + 1];\\n    \\t\\tfor (int i = 1; i < dp.length; i++) {\\n    \\t\\t\\tdp[i] = Integer.MAX_VALUE;\\n    \\t\\t}\\n    \\n    \\t\\tfor (int am = 1; am < dp.length; am++) {\\n    \\t\\t\\tfor (int i = 0; i < coins.length; i++) {\\n    \\t\\t\\t\\tif (coins[i] <= am) {\\n    \\t\\t\\t\\t\\tint sub = dp[am - coins[i]];\\n    \\t\\t\\t\\t\\tif (sub != Integer.MAX_VALUE)\\n    \\t\\t\\t\\t\\t\\tdp[am] = Math.min(sub + 1, dp[am]);\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\treturn dp[dp.length - 1] == Integer.MAX_VALUE ? -1 : dp[dp.length - 1];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"77438",
			"view":"4214",
			"top":"9",
			"title":"Java recursive solution 3ms",
			"vote":"12",
			"content":"    public class Solution {\\n        int total = Integer.MAX_VALUE;\\n        public int coinChange(int[] coins, int amount) {\\n            if (amount == 0) return 0;\\n    \\t\\tArrays.sort(coins);\\n    \\t\\tcount(amount, coins.length-1, coins, 0);\\n    \\t\\treturn total == Integer.MAX_VALUE?-1:total;\\n        }\\n    \\tvoid count(int amount, int index, int[] coins, int count){\\n    \\t\\tif (index<0 || count>=total-1) return;\\n    \\t\\tint c = amount/coins[index];\\n    \\t    for (int i = c;i>=0;i--){\\n    \\t\\t\\tint newCount = count + i;\\n    \\t\\t\\tint rem = amount - i*coins[index];\\n    \\t\\t\\t\\n    \\t\\t\\tif (rem>0 && newCount<total)\\n    \\t\\t\\t    count(rem, index-1, coins, newCount);\\n    \\t\\t\\telse if (newCount<total)\\n    \\t\\t\\t    total = newCount;\\n    \\t\\t\\telse if (newCount>=total-1)\\n    \\t\\t\\t\\tbreak;\\n    \\t\\t}\\n    \\t}\\n    }"
		}
	],
	"id":"322",
	"title":"Coin Change",
	"content":"<p>\r\nYou are given coins of different denominations and a total amount of money <i>amount</i>. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return <code>-1</code>.\r\n</p>\r\n\r\n<p>\r\n<b>Example 1:</b><br>\r\ncoins = <code>[1, 2, 5]</code>, amount = <code>11</code><br>\r\nreturn <code>3</code> (11 = 5 + 5 + 1)\r\n</p>\r\n\r\n<p>\r\n<b>Example 2:</b><br>\r\ncoins = <code>[2]</code>, amount = <code>3</code><br>\r\nreturn <code>-1</code>.\r\n</p>\r\n\r\n<p>\r\n<b>Note</b>:<br>\r\nYou may assume that you have an infinite number of each kind of coin.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"372",
	"ac_num":"82801"
}