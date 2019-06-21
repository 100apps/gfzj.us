{
	"difficulty":"2",
	"submit_num":"131655",
	"show_id":"309",
	"leetcode_id":"309",
	"answers":[
		{
			"lc_ans_id":"75927",
			"view":"73918",
			"top":"0",
			"title":"Share my thinking process",
			"vote":"777",
			"content":"The series of problems are typical dp. The key for dp is to find the variables to represent the states and deduce the transition function.\\n\\nOf course one may come up with a O(1) space solution directly, but I think it is better to be generous when you think and be greedy when you implement.\\n\\nThe natural states for this problem is the 3 possible transactions : `buy`, `sell`, `rest`. Here `rest` means no transaction on that day (aka cooldown).\\n\\nThen the transaction sequences can end with any of these three states.\\n\\nFor each of them we make an array, `buy[n]`, `sell[n]` and `rest[n]`. \\n\\n`buy[i]` means before day `i` what is the maxProfit for any sequence end with `buy`.\\n\\n`sell[i]` means before day `i` what is the maxProfit for any sequence end with `sell`.\\n\\n`rest[i]` means before day `i` what is the maxProfit for any sequence end with `rest`.\\n\\nThen we want to deduce the transition functions for `buy` `sell` and `rest`. By definition we have:\\n\\n    buy[i]  = max(rest[i-1]-price, buy[i-1]) \\n    sell[i] = max(buy[i-1]+price, sell[i-1])\\n    rest[i] = max(sell[i-1], buy[i-1], rest[i-1])\\n\\t\\nWhere `price` is the price of day `i`. All of these are very straightforward. They simply represents : \\n\\n    (1) We have to `rest` before we `buy` and \\n    (2) we have to `buy` before we `sell`\\n\\nOne tricky point is how do you make sure you `sell` before you `buy`, since from the equations it seems that `[buy, rest, buy]` is entirely possible.\\n\\nWell, the answer lies within the fact that `buy[i] <= rest[i]` which means `rest[i] = max(sell[i-1], rest[i-1])`. That made sure `[buy, rest, buy]` is never occurred.\\n\\nA further observation is that  and `rest[i] <= sell[i]` is also true therefore\\n\\n    rest[i] = sell[i-1]\\n\\t\\nSubstitute this in to `buy[i]` we now have 2 functions instead of 3:\\n    \\n\\tbuy[i] = max(sell[i-2]-price, buy[i-1])\\n\\tsell[i] = max(buy[i-1]+price, sell[i-1])\\n\\t\\nThis is better than 3, but \\n\\n**we can do even better**\\n\\nSince states of day `i` relies only on `i-1` and `i-2` we can reduce the O(n) space to O(1). And here we are at  our final solution:\\n\\n**Java**\\n\\n    public int maxProfit(int[] prices) {\\n        int sell = 0, prev_sell = 0, buy = Integer.MIN_VALUE, prev_buy;\\n        for (int price : prices) {\\n            prev_buy = buy;\\n            buy = Math.max(prev_sell - price, prev_buy);\\n            prev_sell = sell;\\n            sell = Math.max(prev_buy + price, prev_sell);\\n        }\\n        return sell;\\n    }\\n\\n**C++**\\n\\n    int maxProfit(vector<int> &prices) {\\n        int buy(INT_MIN), sell(0), prev_sell(0), prev_buy;\\n        for (int price : prices) {\\n            prev_buy = buy;\\n            buy = max(prev_sell - price, buy);\\n            prev_sell = sell;\\n            sell = max(prev_buy + price, sell);\\n        }\\n        return sell;\\n    }\\n\\nFor this problem it is ok to use `INT_MIN` as initial value, but in general we would like to avoid this. We can do the same as the following python:\\n\\t\\n**Python**\\n\\n    def maxProfit(self, prices):\\n        if len(prices) < 2:\\n            return 0\\n        sell, buy, prev_sell, prev_buy = 0, -prices[0], 0, 0\\n        for price in prices:\\n            prev_buy = buy\\n            buy = max(prev_sell - price, prev_buy)\\n            prev_sell = sell\\n            sell = max(prev_buy + price, prev_sell)\\n        return sell"
		},
		{
			"lc_ans_id":"75928",
			"view":"32585",
			"top":"1",
			"title":"Share my DP solution (By State Machine Thinking)",
			"vote":"546",
			"content":"Hi,\\n\\nI just come across this problem, and it's very frustating since I'm bad at DP.\\n\\nSo I just draw all the actions that can be done.\\n\\nHere is the drawing (Feel like an elementary ...)\\n\\n![enter image description here][1]\\n\\n\\n  [1]: http://i.imgur.com/wvR4TN8.png?1\\n\\nThere are three states, according to the action that you can take.\\n\\nHence, from there, you can now the profit at a state at time i as:\\n\\n    s0[i] = max(s0[i - 1], s2[i - 1]); // Stay at s0, or rest from s2\\n    s1[i] = max(s1[i - 1], s0[i - 1] - prices[i]); // Stay at s1, or buy from s0\\n    s2[i] = s1[i - 1] + prices[i]; // Only one way from s1\\n\\nThen, you just find the maximum of s0[n] and s2[n], since they will be the maximum profit we need (No one can buy stock and left with more profit that sell right :) )\\n\\nDefine base case:\\n\\n    s0[0] = 0; // At the start, you don't have any stock if you just rest\\n    s1[0] = -prices[0]; // After buy, you should have -prices[0] profit. Be positive!\\n    s2[0] = INT_MIN; // Lower base case\\n\\nHere is the code :D\\n\\n    class Solution {\\n    public:\\n    \\tint maxProfit(vector<int>& prices){\\n    \\t\\tif (prices.size() <= 1) return 0;\\n    \\t\\tvector<int> s0(prices.size(), 0);\\n    \\t\\tvector<int> s1(prices.size(), 0);\\n    \\t\\tvector<int> s2(prices.size(), 0);\\n    \\t\\ts1[0] = -prices[0];\\n    \\t\\ts0[0] = 0;\\n    \\t\\ts2[0] = INT_MIN;\\n    \\t\\tfor (int i = 1; i < prices.size(); i++) {\\n    \\t\\t\\ts0[i] = max(s0[i - 1], s2[i - 1]);\\n    \\t\\t\\ts1[i] = max(s1[i - 1], s0[i - 1] - prices[i]);\\n    \\t\\t\\ts2[i] = s1[i - 1] + prices[i];\\n    \\t\\t}\\n    \\t\\treturn max(s0[prices.size() - 1], s2[prices.size() - 1]);\\n    \\t}\\n    };"
		},
		{
			"lc_ans_id":"75931",
			"view":"18514",
			"top":"2",
			"title":"Easiest JAVA solution with explanations",
			"vote":"219",
			"content":"Here I share my no brainer weapon when it comes to this kind of problems.\\n\\n<hr>\\n\\n**1. Define States**\\n\\nTo represent the decision at index i:\\n\\n- `buy[i]`: Max profit till index i. The series of transaction is ending with a **buy**.\\n- `sell[i]`: Max profit till index i. The series of transaction is ending with a **sell**.\\n\\nTo clarify:\\n\\n- Till index `i`, the **buy / sell** action must happen and must be the **last action**. It may not happen at index `i`. It may happen at `i - 1, i - 2, ... 0`.\\n- In the end `n - 1`, return `sell[n - 1]`. Apparently we cannot finally end up with a buy. In that case, we would rather take a rest at `n - 1`.\\n- For special case no transaction at all, classify it as `sell[i]`, so that in the end, we can still return `sell[n - 1]`.  Thanks @alex153 @kennethliaoke  @anshu2. \\n<hr>\\n\\n**2. Define Recursion**\\n\\n- `buy[i]`: To make a decision whether to buy at `i`, we either take a rest, by just using the old decision at `i - 1`, or sell at/before `i - 2`, then buy at `i`, We cannot sell at `i - 1`, then buy at `i`, because of **cooldown**.\\n- `sell[i]`: To make a decision whether to sell at `i`, we either take a rest, by just using the old decision at `i - 1`, or buy at/before `i - 1`, then sell at `i`.\\n\\nSo we get the following formula:\\n\\n    buy[i] = Math.max(buy[i - 1], sell[i - 2] - prices[i]);   \\n    sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i]);\\n\\n<hr>\\n\\n**3. Optimize to O(1) Space**\\n\\nDP solution only depending on `i - 1` and `i - 2` can be optimized using O(1) space.\\n\\n- Let `b2, b1, b0` represent `buy[i - 2], buy[i - 1], buy[i]`\\n- Let `s2, s1, s0` represent `sell[i - 2], sell[i - 1], sell[i]`\\n\\nThen arrays turn into Fibonacci like recursion:\\n\\n    b0 = Math.max(b1, s2 - prices[i]);\\n    s0 = Math.max(s1, b1 + prices[i]);\\n\\n<hr>\\n\\n**4. Write Code in 5 Minutes**\\n\\nFirst we define the initial states at `i = 0`:\\n\\n- We can buy. The max profit at `i = 0` ending with a **buy** is `-prices[0]`.\\n- We cannot sell. The max profit at `i = 0` ending with a **sell** is `0`.\\n\\n<hr>\\n\\nHere is my solution. Hope it helps!    \\n\\n    public int maxProfit(int[] prices) {\\n        if(prices == null || prices.length <= 1) return 0;\\n      \\n        int b0 = -prices[0], b1 = b0;\\n        int s0 = 0, s1 = 0, s2 = 0;\\n     \\n        for(int i = 1; i < prices.length; i++) {\\n        \\tb0 = Math.max(b1, s2 - prices[i]);\\n        \\ts0 = Math.max(s1, b1 + prices[i]);\\n        \\tb1 = b0; s2 = s1; s1 = s0; \\n        }\\n        return s0;\\n    }"
		},
		{
			"lc_ans_id":"75929",
			"view":"9491",
			"top":"3",
			"title":"7-line Java: only consider sell and cooldown",
			"vote":"95",
			"content":"Define:\\n\\n    profit1[i] = max profit on day i if I sell\\n\\n    profit2[i] = max profit on day i if I do nothing\\n\\nHow will those profits on day i+1 relate to profits on day i ?\\n\\n\\n    1. profit1[i+1] means I must sell on day i+1, and there are 2 cases:\\n    \\n    a. If I just sold on day i, then I have to buy again on day i and sell on day i+1\\n    \\n    b. If I did nothing on day i, then I have to buy today and sell today \\n    \\n    Taking both cases into account, profit1[i+1] = max(profit1[i]+prices[i+1]-prices[i], profit2[i])\\n    \\n    2. profit2[i+1] means I do nothing on day i+1, so it will be max(profit1[i], profit2[i])\\n\\nAnd the code:\\n\\n    public int maxProfit(int[] prices) {\\n        int profit1=0, profit2=0;   \\n        for(int i=1; i<prices.length; i++){\\n            int copy=profit1;\\n            profit1=Math.max(profit1+prices[i]-prices[i-1], profit2);\\n            profit2=Math.max(copy, profit2);\\n        }\\n        return Math.max(profit1, profit2);\\n    }"
		},
		{
			"lc_ans_id":"75930",
			"view":"9322",
			"top":"4",
			"title":"Very Easy to Understand One Pass O(n) Solution with No Extra Space",
			"vote":"79",
			"content":"The idea is as follows:\\n\\nFirst, think about what we can do on day `i`? You either have one stock or you don't on day `i`. For each case, you have two options, making a total of four possible actions on day `i`:\\n\\n 1. you have 1 stock and you sell it\\n 2. you have 1 stock and you do nothing\\n 3. you have 0 stock and you buy stock `i`\\n 4. you have 0 stock and you do nothing\\n\\nAs you can imagine, these four actions are correlated between day `i-1` and day `i`. For example, if you take action 1 on day `i`, you then have either taken action 2 or 3 on day `i-1` but not 1 or 4. In precise, two consecutive days are related as follows:\\n\\n 1. if you take action 1 on day `i` ==> you have either taken action 2 or 3 on day `i-1`\\n 2. if you take action 2 on day `i` ==> you have either taken action 2 or 3 on day `i-1`\\n 3. if you take action 3 on day `i` ==> you must have taken action 4 on day `i-1` (you can not sell on day `i-1` due to cool down)\\n 4. if you take action 4 on day `i` ==> you have either taken action 1 or 4 on day `i-1`\\n\\nNow you want to maximize your total profit, but you don't know what action to take on day `i` such that you get the total maximum profit, so `you try all 4 actions on every day`. Suppose you take action 1 on day `i`, since there are two possible actions on day `i-1`, namely actions 2 and 3, you would definitely choose the one that makes your profit on day `i` more. Same thing for actions 2 and 4. So we now have an iterative algorithm.\\n\\nBefore coding, one detail to emphasize is that the initial value on day `0` is important. You basically cannot take action 1, so the corresponding profits should be 0. You cannot take action 2 in practice, but you cannot set up the profit to 0, because that means you don't have a stock to sell on day `1`. Therefore, the initial profit should be negative value of the first stock. You can also think of it as you buy the stock on day `-1` and do nothing on day `0`.\\n\\nHere comes the code in Java:\\n\\n    public int maxProfit(int[] prices) {\\n    \\tint L = prices.length;\\n    \\tif(L < 2) return 0;\\n\\n    \\tint has1_doNothing = -prices[0];\\n    \\tint has1_Sell = 0;\\n    \\tint has0_doNothing = 0;\\n    \\tint has0_Buy = -prices[0];\\n    \\tfor(int i=1; i<L; i++) {\\n    \\t\\thas1_doNothing = has1_doNothing > has0_Buy ? has1_doNothing : has0_Buy;\\n    \\t\\thas0_Buy = -prices[i] + has0_doNothing;\\n    \\t\\thas0_doNothing = has0_doNothing > has1_Sell ? has0_doNothing : has1_Sell;\\n    \\t\\thas1_Sell = prices[i] + has1_doNothing;\\n    \\t}\\n    \\treturn has1_Sell > has0_doNothing ? has1_Sell : has0_doNothing;\\n    }\\n\\nPlease leave your comment if any question.\\n\\nIf you are interested in my other posts, please feel free to check my Github page here: [https://github.com/F-L-A-G/Algorithms-in-Java][1]\\n\\n\\n  [1]: https://github.com/F-L-A-G/Algorithms-in-Java"
		},
		{
			"lc_ans_id":"75957",
			"view":"3854",
			"top":"5",
			"title":"An 8ms C++ DP solution, easy to understand",
			"vote":"35",
			"content":"I think my solution is not very difficult to understand.\\n\\nDefine `buy[i]` as the max profit when you buy the stock at day i. `sell[i]` as the max profit when you sell the stock at day i. Therefore set `buy[0] = -prices[0]`, that if you buy the stock at first day, the profit is -prices[0], also set `sell[0] = 0`, that you do nothing in the first day.\\n\\n    sell[i]=max(buy[i-1]+prices[i], sell[i-1]-prices[i-1]+prices[i]);\\n\\n`buy[i-1]+prices[i]` represents buy the stock on day i-1 and sell it on day i; `sell[i-1]-prices[i-1]+prices[i]` represents you didn't sell the stock on day i-1 but sell it on day i (bought stock back and sell it on day i).\\n\\n    buy[i]=max(sell[i-2]-prices[i], buy[i-1]+prices[i-1]-prices[i]);\\n\\n`sell[i-2]-prices[i]` means sold the stock on day i-2 and buy it on day i (day i-1 is cooldown). `buy[i-1]+prices[i-1]-prices[i]` means you didn't buy the stock on day i-1 but buy it on day i.\\n\\nNo doubt that the max profit would appear in sell[i].\\n\\n    int maxProfit(vector<int>& p) \\n    {\\n    \\tif (p.size() < 2)\\n    \\t\\treturn 0;\\n    \\tint i, sz = p.size();\\n    \\tint ret = 0;\\n    \\tvector<int> buy(sz, 0);\\n    \\tvector<int> sell(sz, 0);\\n    \\tbuy[0] = -p[0];\\n    \\tfor (i = 1; i < sz; ++i)\\n    \\t{\\n    \\t\\tsell[i] = max(buy[i - 1] + p[i], sell[i - 1] - p[i - 1] + p[i]);\\n    \\t\\tif (ret < sell[i]) //record the max sell[i]\\n    \\t\\t\\tret = sell[i];\\n    \\t\\tif (1 == i)\\n    \\t\\t\\tbuy[i] = buy[0] + p[0] - p[1];\\n    \\t\\telse\\n    \\t\\t\\tbuy[i] = max(sell[i - 2] - p[i], buy[i - 1] + p[i - 1] - p[i]);\\n    \\t}\\n    \\treturn ret;\\n    }"
		},
		{
			"lc_ans_id":"75942",
			"view":"2684",
			"top":"6",
			"title":"4-line Python solution, 52 ms",
			"vote":"33",
			"content":"The key is 3 states and 5 edges for state transition. 3 states are `notHold (stock)`, `hold (stock)`,  and `notHold_cooldown`. The initial values of the latter two are negative infinity since they are meaningless, i.e. you won't hold stocks at first and there's no cooldown at first. The 5 edges:\\n\\n`hold` -----do nothing----->`hold`\\n\\n`hold` -----sell----->`notHold_cooldown`\\n\\n`notHold` -----do nothing -----> `notHold`\\n\\n`notHold` -----buy-----> `hold`\\n\\n`notHold_cooldown` -----do nothing----->`notHold`\\n\\n    def maxProfit(self, prices):\\n        notHold, notHold_cooldown, hold = 0, float('-inf'), float('-inf')\\n        for p in prices:\\n            hold, notHold, notHold_cooldown = max(hold, notHold - p), max(notHold, notHold_cooldown), hold + p\\n        return max(notHold, notHold_cooldown)"
		},
		{
			"lc_ans_id":"76005",
			"view":"2442",
			"top":"7",
			"title":"O(n) JAVA solution 3ms",
			"vote":"26",
			"content":"Basically for day i there are three types of action we can consider: sell, buy and cooldown.\\n\\nIf we want to buy, then i-1 day must be cooldown, so after buy today our portfolio value should be cooldown-prices[i]. if this number is small than buy itself, then we don't buy today.\\n\\nIf we want to cooldown, then i-1 day must be cooldown or sell. So we take the max of these two.\\n\\nIf we want to sell, then before day i, we must have position, so after sell our portfolio value should be day i-1's buy+prices[i]. if this value is smaller than sell itself, then we don't sell today.\\n    \\t\\n\\n              if (prices.length<2) return 0;\\n    \\tint buy = -prices[0], sell = 0, cooldown = 0;\\n    \\tfor(int i=1; i<prices.length; i++) {\\n    \\t\\tint temp = buy;\\n    \\t\\tbuy = Math.max(buy, cooldown-prices[i]);\\n    \\t\\tcooldown = Math.max(sell, cooldown);\\n    \\t\\tsell = Math.max(sell, temp+prices[i]);    \\t\\t\\n    \\t}\\n    \\treturn sell>cooldown?sell:cooldown;"
		},
		{
			"lc_ans_id":"75940",
			"view":"2646",
			"top":"8",
			"title":"5 lines Python, O(n) time, O(1) space",
			"vote":"18",
			"content":"    def maxProfit(self, prices):\\n        free = 0\\n        have = cool = float('-inf')\\n        for p in prices:\\n            free, have, cool = max(free, cool), max(have, free - p), have + p\\n        return max(free, cool)\\n\\n`free` is the maximum profit I can have while being free to buy.  \\n`have` is the maximum profit I can have while having stock.  \\n`cool` is the maximum profit I can have while cooling down."
		},
		{
			"lc_ans_id":"75995",
			"view":"2598",
			"top":"9",
			"title":"10 line constant space O(n) complexity dp solution in c++ (4ms) [added explanation]",
			"vote":"18",
			"content":"Four states are used for the dp: buy, sell, coolDown and noOp, where noOp happens between buy and sell, coolDown happens between sell and buy.\\n\\nIt is actually much more straight forward if you use O(n) space. \\n\\nbuy[i] -- buy stock i\\n\\nsell[i] -- sell stock i\\n\\nnoOp[i] -- no operation for stock i, but have one stock at hand\\n\\ncoolDown[i] -- no operation for stock i, and have no stock at hand.\\n\\n\\nThen the update works as buy[i] = coolDown[i-1]-prices[i], coolDown[i] = max(coolDown[i-1], sell[i-1]), noOp[i] = max[noOp[i-1], buy[i-1]]] and sell[i] = max(noOp[i-1], buy[i-1]) + prices[i].\\n\\nThe constant space solution readily follows this since current states for price i only depends on previous states for price i-1.\\n\\n    class Solution {\\n    public:\\n        int maxProfit(vector<int>& prices) {\\n            int buy = INT_MIN, noOp = INT_MIN;\\n            int coolDown = 0, sell = 0;\\n            for (int p : prices) {\\n                noOp = max(noOp, buy);\\n                buy = coolDown - p;\\n                coolDown = max(coolDown, sell);\\n                sell = noOp + p;\\n            }\\n            return max(coolDown, sell);\\n        }\\n    };"
		}
	],
	"id":"309",
	"title":"Best Time to Buy and Sell Stock with Cooldown",
	"content":"<p>Say you have an array for which the <i>i</i><sup>th</sup> element is the price of a given stock on day <i>i</i>.</p>\r\n\r\n<p>Design an algorithm to find the maximum profit. You may complete as many transactions as you like\r\n(ie, buy one and sell one share of the stock multiple times) with the following restrictions:</p>\r\n\r\n<ul>\r\n    <li>You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).</li>\r\n    <li>After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)</li>\r\n</ul>\r\n\r\n<p><b>Example:</b><br></p>\r\n<pre>\r\nprices = [1, 2, 3, 0, 2]\r\nmaxProfit = 3\r\ntransactions = [buy, sell, cooldown, buy, sell]\r\n</pre>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/dietpepsi\">@dietpepsi</a> for adding this problem and creating all test cases.</p>",
	"frequency":"382",
	"ac_num":"54944"
}