{
	"difficulty":"2",
	"submit_num":"30269",
	"show_id":"518",
	"leetcode_id":"518",
	"answers":[
		{
			"lc_ans_id":"99212",
			"view":"10313",
			"top":"0",
			"title":"Knapsack problem - Java solution with thinking process O(nm) Time and O(m) Space",
			"vote":"56",
			"content":"This is a classic knapsack problem. Honestly, I'm not good at knapsack problem, it's really tough for me.\\n\\n```dp[i][j]``` : the number of combinations to make up amount ```j``` by using the first ```i``` types of coins\\n```State transition```:\\n1. not using the ```i```th coin, only using the first ```i-1``` coins to make up amount ```j```, then we have  ```dp[i-1][j]``` ways.\\n2. using the ```i```th coin, since we can use unlimited same coin, we need to know how many way to make up amount ```j - coins[i]``` by using first ```i``` coins(including ```i```th), which is ```dp[i][j-coins[i]]```\\n\\n```Initialization```: ```dp[i][0] = 1```\\n\\nOnce you figure out all these, it's easy to write out the code:\\n\\n```\\n    public int change(int amount, int[] coins) {\\n        int[][] dp = new int[coins.length+1][amount+1];\\n        dp[0][0] = 1;\\n        \\n        for (int i = 1; i <= coins.length; i++) {\\n            dp[i][0] = 1;\\n            for (int j = 1; j <= amount; j++) {\\n                dp[i][j] = dp[i-1][j] + (j >= coins[i-1] ? dp[i][j-coins[i-1]] : 0);\\n            }\\n        }\\n        return dp[coins.length][amount];\\n    }\\n```\\n\\nNow we can see that ```dp[i][j]``` only rely on ```dp[i-1][j]``` and ```dp[i][j-coins[i]]```, then we can optimize the space by only using one-dimension array.\\n```\\n    public int change(int amount, int[] coins) {\\n        int[] dp = new int[amount + 1];\\n        dp[0] = 1;\\n        for (int coin : coins) {\\n            for (int i = coin; i <= amount; i++) {\\n                dp[i] += dp[i-coin];\\n            }\\n        }\\n        return dp[amount];\\n    }\\n```"
		},
		{
			"lc_ans_id":"99210",
			"view":"4268",
			"top":"1",
			"title":"python O(n) space dp solution",
			"vote":"11",
			"content":"```\\n    def change(self, amount, coins):\\n        \"\"\"\\n        :type amount: int\\n        :type coins: List[int]\\n        :rtype: int\\n        \"\"\"\\n        dp = [0] * (amount + 1)\\n        dp[0] = 1\\n        for i in coins:\\n            for j in range(1, amount + 1):\\n               if j >= i:\\n                   dp[j] += dp[j - i]\\n        return dp[amount]\\n```"
		},
		{
			"lc_ans_id":"99239",
			"view":"1809",
			"top":"2",
			"title":"C# - DFS with memorization - of course DP is better",
			"vote":"7",
			"content":"Here's a memorization solution, of course the straight DP is better but thought I'd offer it here for comparison.\\n\\n```\\n    public int Change(int amount, int[] coins)\\n    {\\n        // order coins in order to prune recursion\\n        Array.Sort(coins);\\n        \\n        // init memorization to -1 (unvisited)\\n        int[,] map = new int[amount + 1, coins.Length];\\n        for (int i = 0; i < map.GetLength(0); i++)\\n        {\\n            for (int j = 0; j < map.GetLength(1); j++) map[i, j] = -1;\\n        }\\n        \\n        // DFS\\n        return Count(coins, amount, 0, map);\\n    }\\n\\n    public int Count(int[] coins, int amount, int index, int[,] map)\\n    {\\n        if (amount == 0) return 1;\\n        if (index == coins.Length) return 0;\\n        if (map[amount, index] != -1) return map[amount, index];\\n\\n        int cnt = 0;\\n        for (int i = index; i < coins.Length; i++)\\n        {\\n            if (coins[i] > amount) break;\\n\\n            // using this coin as many times as possible before going to next coin\\n            int times = 1;\\n            while (times * coins[i] <= amount)\\n            {\\n                cnt += Count(coins, amount - times * coins[i], i + 1, map);\\n                times++;\\n            }\\n        }\\n\\n        // memorize\\n        map[amount, index] = cnt;\\n        return cnt;\\n    }\\n```"
		},
		{
			"lc_ans_id":"99231",
			"view":"3240",
			"top":"3",
			"title":"Classic Coin Change Problem, Java DP 6 Lines",
			"vote":"5",
			"content":"```\\npublic class Solution {\\n    public int change(int amount, int[] coins) {\\n        int[] dp = new int[amount + 1];\\n        dp[0] = 1;\\n        for (int coin : coins) {\\n            for (int i = 1; i <= amount; i++) {\\n                if (i >= coin) dp[i] += dp[i - coin];\\n            }\\n        }\\n        return dp[amount];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99223",
			"view":"3428",
			"top":"4",
			"title":"C++ DP Solution with O(nm) Time Complexity and O(m) Space Complexity",
			"vote":"5",
			"content":"```\\nclass Solution {\\npublic:\\n    int change(int amount, vector<int>& coins) {\\n        if(amount == 0)\\n            return 1;\\n        if(coins.size() == 0)\\n            return 0;\\n        vector<int> dp(amount + 1, 0);\\n        dp[0] = 1;\\n        for(int i = 0; i < coins.size(); ++ i){\\n            for(int j = coins[i]; j <= amount; ++ j){\\n                dp[j] += dp[j - coins[i]];\\n            }\\n        }\\n        return dp[amount];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99235",
			"view":"729",
			"top":"5",
			"title":"Classic problem, python clean DP O(MN)",
			"vote":"2",
			"content":"```\\ndef change(self, amount, coins):\\n    dp = [1] + [0] * amount\\n    for c in coins:\\n        for i in range(1, amount + 1):\\n            if i >= c:\\n                dp[i] += dp[i - c]\\n    return dp[-1]\\n```"
		},
		{
			"lc_ans_id":"99246",
			"view":"587",
			"top":"6",
			"title":"Java DP solution",
			"vote":"1",
			"content":"This is more verbose than the other DP solution posted, but the formatting is different so it might be clearer. Note the completely unnecessary initialization of one type of base case (setting certain matrix cells to 0) for the sake of clarity and visual flow.\\n\\ndp[i][j] stores the number of ways to form the amount i with the first j coins. After specifying the base cases, this can be expressed as: dp[i][j - 1] (the number of ways you can form the sum without considering coin j) + dp[i - coins[j - 1]][j] (the number of ways you can form the amount without coin[j - 1]; not always added, since the coin may be too large to matter).\\n\\n```\\npublic class Solution {\\n    public int change(int amount, int[] coins) {\\n        int[][] dp = new int[amount + 1][coins.length + 1];\\n        \\n        dp[0][0] = 1;\\n        for (int i = 1; i < amount + 1; ++i) {\\n            dp[i][0] = 0;\\n        }\\n        \\n        for (int j = 1; j < coins.length + 1; ++j) {\\n            dp[0][j] = 1;\\n        }\\n        \\n        for (int i = 1; i < amount + 1; ++i) {\\n            for (int j = 1; j < coins.length + 1; ++j) {\\n                dp[i][j] = dp[i][j - 1];\\n                \\n                if (coins[j - 1] <= i) {\\n                    dp[i][j] += dp[i - coins[j - 1]][j];\\n                }\\n            }\\n        }\\n        \\n        return dp[amount][coins.length];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99230",
			"view":"1543",
			"top":"7",
			"title":"7-lines Simple Java DP Solution",
			"vote":"1",
			"content":"``` java\\npublic class Solution {\\n    public int change(int amount, int[] coins) {\\n        int[][] dp=new int[coins.length+1][amount+1];\\n        dp[0][0]=1;\\n        for (int i=1;i<=coins.length;i++)\\n            for (int j=0;j<=amount;j++)\\n                for (int k=0;k<=(coins[i-1]==0?0:j/coins[i-1]);k++) // for test case 0, [0]\\n                    dp[i][j]+=dp[i-1][j-k*coins[i-1]];\\n        return dp[coins.length][amount];\\n    }\\n}\\n```\\n\\nBy the way, *1 <= coin <= 5000*, but one of the test cases:\\n```\\n0\\n[0]\\n```\\nI think this should be fixed. @viacheslav"
		},
		{
			"lc_ans_id":"99225",
			"view":"1152",
			"top":"8",
			"title":"C++ DFS with memorization",
			"vote":"1",
			"content":"There's no solution post till now, so I decided to put up my submission.\\n\\nThis is a rather straight-forward approach, and it's pretty slow. Anyway, it passed all the test cases.\\n```\\nclass Solution {\\nprivate:\\n    int _a;\\n    vector<int>* _c;\\n    map<pair<int, int>, int> mem;\\n    int DFS(int i, int cur)\\n    {\\n        auto ms = mem.find(make_pair(i, cur));\\n        if (ms != mem.end()) return ms->second;\\n        if (i == _c->size())\\n        {\\n            return (cur == _a);\\n        } else if (i == _c->size() - 1 && (_a - cur)%(*_c)[i])\\n        {\\n            mem.emplace(make_pair(i, cur), 0);\\n            return 0;\\n        }\\n        int next = cur;\\n        int ct = 0;\\n        while (next <= _a)\\n        {\\n            ct += DFS(i + 1, next);\\n            next += (*_c)[i];\\n        }\\n        mem.emplace(make_pair(i, cur), ct);\\n        return ct;\\n    }\\npublic:\\n    int change(int amount, vector<int>& coins) {\\n        if (amount == 0) return 1;\\n        _a = amount;\\n        _c = &coins;\\n        mem.clear();\\n        sort(coins.begin(), coins.end(), greater<int>());\\n        return DFS(0, 0);\\n    }\\n};\\n```\\nI need to learn DP badly!"
		},
		{
			"lc_ans_id":"99209",
			"view":"18",
			"top":"9",
			"title":"Python Recursive Solution (Slow)",
			"vote":"0",
			"content":"This is a recursive solution written in Python. This will time out on Leetcode. However, I think understanding the approach is helpful. \\n\\nThe DP method is definitely the time efficient way to go.\\n```\\nclass Solution(object):\\n    def change(self, amount, coins):\\n        \"\"\"\\n        :type amount: int\\n        :type coins: List[int]\\n        :rtype: int\\n        \"\"\"\\n        #If we found a way to create the desired amount\\n        if amount == 0: \\n            return 1 \\n        \\n        #If we went over our amount or we have no more coins left\\n        if amount < 0 or len(coins) == 0:\\n            return 0 \\n\\n        #Our solutions can be divided into two sets,\\n        #   1) Solutions that cointain the coin at the end of the coins array \\n        #   2) Solutions that don't contain that coin \\n        return self.change(amount - coins[-1], coins) + self.change(amount, coins[:-1]) \\n```"
		}
	],
	"id":"504",
	"title":"Coin Change 2",
	"content":"<p>\r\nYou are given coins of different denominations and a total amount of money. Write a function to compute the number of combinations that make up that amount. You may assume that you have infinite number of each kind of coin.\r\n</p>\r\n\r\n<p><b>Note:</b> \r\nYou can assume that\r\n<ul>\r\n<li> 0 <= amount <= 5000</li>\r\n<li> 1 <= coin <= 5000</li>\r\n<li> the number of coins is less than 500 </li>\r\n<li> the answer is guaranteed to fit into signed 32-bit integer\r\n</ul>\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b> amount = 5, coins = [1, 2, 5]\r\n<b>Output:</b> 4\r\n<b>Explanation:</b> there are four ways to make up the amount:\r\n5=5\r\n5=2+2+1\r\n5=2+1+1+1\r\n5=1+1+1+1+1\r\n</pre></p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b> amount = 3, coins = [2]\r\n<b>Output:</b> 0\r\n<b>Explanation:</b> the amount of 3 cannot be made up just with coins of 2.\r\n</pre></p>\r\n\r\n<p><b>Example 3:</b>\r\n<pre>\r\n<b>Input:</b> amount = 10, coins = [10] \r\n<b>Output:</b> 1\r\n</pre></p>\r\n",
	"frequency":"452",
	"ac_num":"10358"
}