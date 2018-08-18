{
	"difficulty":"3",
	"submit_num":"336592",
	"show_id":"123",
	"leetcode_id":"123",
	"answers":[
		{
			"lc_ans_id":"39611",
			"view":"60501",
			"top":"0",
			"title":"Is it Best Solution with O(n), O(1).",
			"vote":"277",
			"content":"The thinking is simple and is inspired by the best solution from Single Number II (I read through the discussion after I use DP). \\nAssume we only have 0 money at first;\\n4 Variables to maintain some interested 'ceilings' so far:\\nThe maximum of if we've just buy 1st stock, if we've just sold 1nd stock, if we've just buy  2nd stock, if we've just sold 2nd stock.\\nVery simple code too and work well. I have to say the logic is simple than those in Single Number II.\\n\\n    public class Solution {\\n        public int maxProfit(int[] prices) {\\n            int hold1 = Integer.MIN_VALUE, hold2 = Integer.MIN_VALUE;\\n            int release1 = 0, release2 = 0;\\n            for(int i:prices){                              // Assume we only have 0 money at first\\n                release2 = Math.max(release2, hold2+i);     // The maximum if we've just sold 2nd stock so far.\\n                hold2    = Math.max(hold2,    release1-i);  // The maximum if we've just buy  2nd stock so far.\\n                release1 = Math.max(release1, hold1+i);     // The maximum if we've just sold 1nd stock so far.\\n                hold1    = Math.max(hold1,    -i);          // The maximum if we've just buy  1st stock so far. \\n            }\\n            return release2; ///Since release1 is initiated as 0, so release2 will always higher than release1.\\n        }\\n    }"
		},
		{
			"lc_ans_id":"39608",
			"view":"44968",
			"top":"1",
			"title":"A clean DP solution which generalizes to k transactions",
			"vote":"238",
			"content":"Solution is commented in the code. Time complexity is O(k*n), space complexity can be O(n) because this DP only uses the result from last step. But for cleaness this solution still used O(k*n) space complexity to preserve similarity to the equations in the comments.\\n\\n    class Solution {\\n    public:\\n        int maxProfit(vector<int> &prices) {\\n            // f[k, ii] represents the max profit up until prices[ii] (Note: NOT ending with prices[ii]) using at most k transactions. \\n            // f[k, ii] = max(f[k, ii-1], prices[ii] - prices[jj] + f[k-1, jj]) { jj in range of [0, ii-1] }\\n            //          = max(f[k, ii-1], prices[ii] + max(f[k-1, jj] - prices[jj]))\\n            // f[0, ii] = 0; 0 times transation makes 0 profit\\n            // f[k, 0] = 0; if there is only one price data point you can't make any money no matter how many times you can trade\\n            if (prices.size() <= 1) return 0;\\n            else {\\n                int K = 2; // number of max transation allowed\\n                int maxProf = 0;\\n                vector<vector<int>> f(K+1, vector<int>(prices.size(), 0));\\n                for (int kk = 1; kk <= K; kk++) {\\n                    int tmpMax = f[kk-1][0] - prices[0];\\n                    for (int ii = 1; ii < prices.size(); ii++) {\\n                        f[kk][ii] = max(f[kk][ii-1], prices[ii] + tmpMax);\\n                        tmpMax = max(tmpMax, f[kk-1][ii] - prices[ii]);\\n                        maxProf = max(f[kk][ii], maxProf);\\n                    }\\n                }\\n                return maxProf;\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"39613",
			"view":"12598",
			"top":"2",
			"title":"My C++ solution (O(N) time, O(1) space, 8ms)",
			"vote":"89",
			"content":"It is similar to other buy/sell problems. just do DP and define an array of states to track the current maximum profits at different stages. For example, in the below code\\n\\n - states[][0]: one buy\\n - states[][1]: one buy, one sell\\n - states[][2]: two buys, one sell\\n - states[][3]: two buy, two sells\\n\\nThe states transistions occurs when buy/sell operations are executed. For example, state[][0] can move to state[][1] via one sell operation. \\n\\n    class Solution {\\n    public:\\n        int maxProfit(vector<int>& prices) {\\n            int states[2][4] = {INT_MIN, 0, INT_MIN, 0}; // 0: 1 buy, 1: one buy/sell, 2: 2 buys/1 sell, 3, 2 buys/sells\\n            int len = prices.size(), i, cur = 0, next =1;\\n            for(i=0; i<len; ++i)\\n            {\\n                states[next][0] = max(states[cur][0], -prices[i]);\\n                states[next][1] = max(states[cur][1], states[cur][0]+prices[i]);\\n                states[next][2] = max(states[cur][2], states[cur][1]-prices[i]);\\n                states[next][3] = max(states[cur][3], states[cur][2]+prices[i]);\\n                swap(next, cur);\\n            }\\n            return max(states[cur][1], states[cur][3]);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"39615",
			"view":"13389",
			"top":"3",
			"title":"My explanation for O(N) solution!",
			"vote":"87",
			"content":"First assume that we have no money, so buy1 means that we have to borrow money from others,  we want to borrow less so that we have to make our balance as max as we can(because this is negative).\\n\\nsell1 means we decide to sell the stock, after selling it we have price[i] money and we have to give back the money we owed, so we have price[i] - |buy1| = prices[i ] + buy1, we want to make this max.\\n\\nbuy2 means we want to buy another stock, we already have sell1 money, so after buying stock2 we have buy2 = sell1 - price[i] money left, we want more money left, so we make it max\\n\\nsell2 means we want to sell stock2, we can have price[i] money after selling it, and we have buy2 money left before, so sell2 = buy2 + prices[i], we make this max.\\n\\nSo sell2 is the most money we can have.\\n\\nHope it is helpful and welcome quesions!\\n\\n    public int maxProfit(int[] prices) {\\n    \\t\\tint sell1 = 0, sell2 = 0, buy1 = Integer.MIN_VALUE, buy2 = Integer.MIN_VALUE;\\n    \\t\\tfor (int i = 0; i < prices.length; i++) {\\n    \\t\\t\\tbuy1 = Math.max(buy1, -prices[i]);\\n    \\t\\t\\tsell1 = Math.max(sell1, buy1 + prices[i]);\\n    \\t\\t\\tbuy2 = Math.max(buy2, sell1 - prices[i]);\\n    \\t\\t\\tsell2 = Math.max(sell2, buy2 + prices[i]);\\n    \\t\\t}\\n    \\t\\treturn sell2;\\n    \\t}"
		},
		{
			"lc_ans_id":"39653",
			"view":"13499",
			"top":"4",
			"title":"2ms Java DP Solution",
			"vote":"48",
			"content":"Sorry for my poor English\\n\\n    public int maxProfit(int[] prices) {\\n        // these four variables represent your profit after executing corresponding transaction\\n        // in the beginning, your profit is 0. \\n        // when you buy a stock ,the profit will be deducted of the price of stock.\\n        int firstBuy = Integer.MIN_VALUE, firstSell = 0;\\n        int secondBuy = Integer.MIN_VALUE, secondSell = 0;\\n\\n        for (int curPrice : prices) {\\n            if (firstBuy < -curPrice) firstBuy = -curPrice; // the max profit after you buy first stock\\n            if (firstSell < firstBuy + curPrice) firstSell = firstBuy + curPrice; // the max profit after you sell it\\n            if (secondBuy < firstSell - curPrice) secondBuy = firstSell - curPrice; // the max profit after you buy the second stock\\n            if (secondSell < secondBuy + curPrice) secondSell = secondBuy + curPrice; // the max profit after you sell the second stock\\n        }\\n        \\n        return secondSell; // secondSell will be the max profit after passing the prices\\n    }"
		},
		{
			"lc_ans_id":"39665",
			"view":"4918",
			"top":"5",
			"title":"Java solution with just two traverses.",
			"vote":"37",
			"content":"Go from left to right and calculate max profit for each index (i). Go from right to left and calculate max profit  for (i). Add max right profit for (i) and max left profit for (i-1) and check if it's max profit.\\n\\n    public int maxProfit(int[] prices) {\\n\\t\\tif (prices == null || prices.length == 0) return 0;\\n\\t\\tint lenght = prices.length;\\n\\t\\t\\n\\t\\tint[] leftProfit = new int[lenght];\\n\\t\\tint leftMaxProfit = 0;\\n\\t\\tint leftMin = prices[0];\\n        for (int i=0; i<lenght; i++) {\\n        \\tif (prices[i] < leftMin) leftMin = prices[i];\\n        \\tif (prices[i] - leftMin > leftMaxProfit) leftMaxProfit = prices[i]-leftMin;\\n        \\tleftProfit[i] = leftMaxProfit;\\n        }\\n        \\n        int maxProfit = 0;\\n        int rightMaxProfit = 0;\\n\\t\\tint rightMax = prices[lenght-1];\\n\\t\\tfor (int i=lenght-1; i>=0; i--) {\\n        \\tif (prices[i] > rightMax) rightMax = prices[i];\\n        \\tif (rightMax - prices[i] > rightMaxProfit) rightMaxProfit = rightMax - prices[i];\\n        \\tint currentProfit = rightMaxProfit + (i>0 ? leftProfit[i-1] : 0);\\n        \\tif (currentProfit > maxProfit) {\\n        \\t\\tmaxProfit = currentProfit;\\n        \\t}\\n        }\\n\\t\\t\\n        return maxProfit;\\n    }"
		},
		{
			"lc_ans_id":"39690",
			"view":"2357",
			"top":"6",
			"title":"A solution not so dynamic programming.",
			"vote":"27",
			"content":"I think the most difficult part is how to connect the first transaction to the second transaction. The final target is to get the maximum value of profit2. You must try to get money as much as possible after you buy the stock second time. Then after the second time of sell, with the as high as possible price, you get the maximum profit. \\n\\n    class Solution {\\n    public:\\n        int maxProfit(vector<int>& prices) {\\n            int size=prices.size();\\n            int profit1=0;\\n            int profit2=0;\\n            int o1=INT_MAX;\\n            int o2=INT_MIN;\\n            for(int i=0; i<size; ++i){\\n                o1=min(o1, prices[i]);\\n                profit1=max(profit1, prices[i]-o1);\\n                o2=max(o2, profit1-prices[i]);\\n                profit2=max(profit2, prices[i]+o2);\\n            }\\n            return profit2;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"39727",
			"view":"2026",
			"top":"7",
			"title":"A clear o(n) time and space Java Solution",
			"vote":"22",
			"content":"    public class Solution { \\n        public int maxProfit(int[] prices) {\\n            int len = prices.length;\\n            if (len < 2)\\n                return 0;\\n            int [] maxBefore = new int[len];\\n            int min = prices[0];\\n            for(int i=1; i<len; i++)\\n            {\\n                maxBefore[i] = Math.max(maxBefore[i-1], prices[i] - min);\\n                min = Math.min(min, prices[i]);\\n            }\\n            int max = prices[len-1];\\n            int ret = 0;\\n            for (int i=len-2; i>=0; i--)\\n            {\\n                max = Math.max(prices[i], max);\\n                ret = Math.max(ret, max - prices[i] + maxBefore[i]);   \\n            }\\n            return ret;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"39691",
			"view":"3845",
			"top":"8",
			"title":"Simple DP 8ms Solution for Best Time to Buy and Sell Stock III",
			"vote":"17",
			"content":" \\n        int maxProfit(vector<int>& prices) {\\n        int size = prices.size();\\n        if(size==0 || size ==1) return 0;\\n        int profit[size];\\n        int profit1[size];\\n        int local_min=prices[0];\\n        int local_max = prices[size-1];\\n        int j = size-2;\\n        int result=0;\\n        profit[0]=0;\\n        profit1[size-1] = 0;\\n        for(int i = 1;i<size+1 && j >=0;i++,j--)\\n        {\\n            profit[i] = max(profit[i-1],prices[i]-local_min);\\n            local_min= min(local_min,prices[i]);\\n            profit1[j] = max(profit1[j+1],local_max-prices[j]);\\n            local_max = max(local_max,prices[j]);\\n        }\\n        for(int i = 1; i<size; i++)\\n        {\\n            result = max(result,profit[i]+profit1[i]);\\n        }\\n        return result;\\n    }\\n};"
		},
		{
			"lc_ans_id":"39700",
			"view":"6729",
			"top":"9",
			"title":"Don't need DP to solve it within O(n)",
			"vote":"15",
			"content":"Don't need DP to solve this problem. It is still O(n) and basically use the same algorithm solving \"Stock I\" four times. \\n\\n1. Get the max profit with one transaction to the **full array**. Keep down the start and end positions.\\n2. the start and end positions will be included in the result of two transaction. It falls into two categories:\\nA) it is one full transaction, B) they belong to two separate transactions(start belongs to first transaction and end belongs to second transaction).\\n\\n3. if A)-- get max profit with one transaction to subarray from **0 to start** ; get max profit with one transaction to subarray from **end to prices.length**.\\n\\n4. if B)-- get the max profit with one transaction within ****start and end** in **reverse order****\\n\\n5. return the max profit in those cases."
		}
	],
	"id":"123",
	"title":"Best Time to Buy and Sell Stock III",
	"content":"<p>Say you have an array for which the <i>i</i><sup>th</sup> element is the price of a given stock on day <i>i</i>.</p>\r\n\r\n<p>Design an algorithm to find the maximum profit. You may complete at most <i>two</i> transactions.</p>\r\n\r\n<p><b>Note:</b><br />\r\nYou may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).</p>",
	"frequency":"439",
	"ac_num":"101454"
}