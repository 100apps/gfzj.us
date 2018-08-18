{
	"difficulty":"1",
	"submit_num":"611632",
	"show_id":"121",
	"leetcode_id":"121",
	"answers":[
		{
			"lc_ans_id":"39038",
			"view":"53440",
			"top":"0",
			"title":"Kadane's Algorithm - Since no one has mentioned about this so far :) (In case if interviewer twists the input)",
			"vote":"316",
			"content":"The logic to solve this problem is same as \"max subarray problem\" using `Kadane's Algorithm`. Since no body has mentioned this so far, I thought it's a good thing for everybody to know. \\n\\nAll the straight forward solution should work, but if the interviewer twists the question slightly by giving the ***difference array of prices***, Ex: for `{1, 7, 4, 11}`, if he gives `{0, 6, -3, 7}`, you might end up being confused. \\n\\nHere, the logic is to calculate the difference (`maxCur += prices[i] - prices[i-1]`) of the original array, and find a contiguous subarray giving maximum profit. If the difference falls below 0, reset it to zero.\\n\\n\\n        public int maxProfit(int[] prices) {\\n            int maxCur = 0, maxSoFar = 0;\\n            for(int i = 1; i < prices.length; i++) {\\n                maxCur = Math.max(0, maxCur += prices[i] - prices[i-1]);\\n                maxSoFar = Math.max(maxCur, maxSoFar);\\n            }\\n            return maxSoFar;\\n        }\\n\\n*`maxCur = current maximum value`\\n\\n*`maxSoFar = maximum value found so far`"
		},
		{
			"lc_ans_id":"39039",
			"view":"29037",
			"top":"1",
			"title":"Sharing my simple and clear C++ solution",
			"vote":"201",
			"content":"    int maxProfit(vector<int> &prices) {\\n        int maxPro = 0;\\n        int minPrice = INT_MAX;\\n        for(int i = 0; i < prices.size(); i++){\\n            minPrice = min(minPrice, prices[i]);\\n            maxPro = max(maxPro, prices[i] - minPrice);\\n        }\\n        return maxPro;\\n    }\\n\\nminPrice is the minimum price from day 0 to day i. And maxPro is the maximum profit we can get from day 0 to day i. \\n\\nHow to get maxPro? Just get the larger one between current maxPro and prices[i] - minPrice."
		},
		{
			"lc_ans_id":"39036",
			"view":"12088",
			"top":"2",
			"title":"Please explain the problem more clearly!!!",
			"vote":"95",
			"content":"\"If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.\"\\n\\nI misunderstood the above sentence as at most either buy or sell one share of stock on a single day. In that case, I buy at a local minimum price and sell it at a local maximum to reach a maximum total profit.\\n\\nPlease consider changing it to something like the following:\\n\\n`If you were only permitted to complete at most one buy and at most one sell during the whole period of days, design an algorithm such that your profit, i.e., sell price minus buy price, is maximized. Note that you can only not sell a stock before you buy one.`\\n\\n`For example:`\\n\\n`[1,2,3,4] ==> returns 3 (buy at 1 and sell at 4)`\\n\\n`[4,3,2,1] ==> returns 0 (don't buy)`\\n\\n`[4,10,25,2,10] ==> returns 21 (buy at 4 and sell at 25)`"
		},
		{
			"lc_ans_id":"39062",
			"view":"16734",
			"top":"3",
			"title":"My jave accepted solution with O(N) time and O(1) space",
			"vote":"56",
			"content":"The idea is to find so far min price.\\n\\n     public int maxProfit(int[] prices) {\\n    \\t\\t if (prices.length == 0) {\\n    \\t\\t\\t return 0 ;\\n    \\t\\t }\\t\\t\\n    \\t\\t int max = 0 ;\\n    \\t\\t int sofarMin = prices[0] ;\\n    \\t     for (int i = 0 ; i < prices.length ; ++i) {\\n    \\t    \\t if (prices[i] > sofarMin) {\\n    \\t    \\t\\t max = Math.max(max, prices[i] - sofarMin) ;\\n    \\t    \\t } else{\\n    \\t    \\t\\tsofarMin = prices[i];  \\n    \\t    \\t }\\n    \\t     }\\t     \\n    \\t    return  max ;\\n    \\t }"
		},
		{
			"lc_ans_id":"39075",
			"view":"22831",
			"top":"4",
			"title":"A O(1*n)  solution",
			"vote":"56",
			"content":"1.for prices[0] .... prices[n], prices[n+1].....\\nif (prices[n] < prices[0]) then, the max profit is in prices[0]...prices[n], or begin from prices[n+1],\\notherwise, suppose prices[n+1] > prices[0], and max profit is happened between prices[n+1] , and \\nprices[n+k](k>1), then if we buy at day 0, and sell at day n+k, we get a bigger profit.\\n\\nBase on logic above, we can have a O(1*n) solution:\\n\\n    public class Solution {\\n        public int maxProfit(int[] prices) {\\n            \\n            if (prices.length == 0)\\n            {\\n                return 0;\\n            }\\n            \\n            int max = 0, min = prices[0];\\n            int profit = 0;\\n            \\n            for (int i = 1; i < prices.length; i++)\\n            {\\n                if (prices[i] < min)\\n                {\\n                    \\n                    min = prices[i];\\n                }\\n                else\\n                {\\n                    if (prices[i] - min > profit)\\n                    {\\n                        profit = prices[i] - min;\\n                    }\\n                    \\n                }\\n            }\\n         \\n       \\n         \\n         return profit;\\n         \\n        }\\n    }"
		},
		{
			"lc_ans_id":"39060",
			"view":"5869",
			"top":"5",
			"title":"Very Simple Java Solution with detail explanation (1ms, beats 96%)",
			"vote":"36",
			"content":"We take prices array as [5, 6, 2, 4, 8, 9, 5, 1, 5]\\nIn the given problem, we assume the first element as the stock with lowest price. \\nNow we will traverse the array from left to right. So in the given array 5 is the stock we bought. So next element is 6. If we sell the stock at that price we will earn profit of $1. \\n\\n    Prices:      [5, 6, 2, 4, 8, 9, 5, 1, 5]\\n\\n    Profit:       Bought:5     Sell:6               Profit:$1             max profit=$1\\n\\nNow the next element is 2 which have lower price than the stock we bought previously which was 5. So if we buy this stock at price $2 and sells it in future then we will surely earn more profit than the stock we bought at price 5. So we bought  stock at $2. \\n\\n    Profit:      Bought:2     Sell:-              Profit:-                  max profit=$1\\n\\nNext element is 4 which has higher price than the stock we bought. So if we sell the stock at this price.\\n\\n    Profit:      Bought:2     Sell:4              Profit:$2               max profit=$2\\n\\nMoving further, now the next stockprice is $8. We still have $2 stock we bought previously. If instead of selling it at price $4, if we sell it for $8 then the profit would be $6.\\n\\n    Profit:      Bought:2     Sell:8              Profit:$6                max profit=$6\\n\\nNow next stock is of $9 which is also higher than the price we bought at ($2). \\n\\n    Profit:      Bought:2     Sell:9              Profit:$7                max profit=$7\\n\\nNow the next stock is $5. If we sell at this price then we will earn profit of $3, but we already have a max profit of $7 because of our previous transaction.  \\n\\n    Profit:      Bought:2     Sell:5              Profit:$3                max profit=$7\\n\\nNow next stock price is $1 which is less than the stock we bought of $2. And if we buy this stock and sell it in future then obviously we will gain more profit. So the value of bought will become $1.\\n\\n    Profit:      Bought:1     Sell:-              Profit:-                   max profit=$7\\n\\nNow next stock is of $5. So this price is higher than the stock we bought. \\n\\n    Profit:      Bought:1     Sell:5              Profit:$4                max profit=$7\\n\\nBut our maximum profit will be $7.\\n\\n\\n    public int maxProfit(int[] prices) {\\n                int ans=0;\\n                if(prices.length==0)\\n                {\\n                    return ans;\\n                }\\n                int bought=prices[0];                                \\n                for(int i=1;i<prices.length;i++)\\n                {\\n                    if(prices[i]>bought)\\n                    {\\n                        if(ans<(prices[i]-bought))\\n                        {\\n                            ans=prices[i]-bought;\\n                        }\\n                    }\\n                    else\\n                    {\\n                        bought=prices[i];\\n                    }\\n                }\\n         return ans;\\n    }"
		},
		{
			"lc_ans_id":"39049",
			"view":"4122",
			"top":"6",
			"title":"Easy O(n) Python solution",
			"vote":"22",
			"content":"    def maxProfit(prices):\\n        max_profit, min_price = 0, float('inf')\\n        for price in prices:\\n            min_price = min(min_price, price)\\n            profit = price - min_price\\n            max_profit = max(max_profit, profit)\\n        return max_profit"
		},
		{
			"lc_ans_id":"39230",
			"view":"1882",
			"top":"7",
			"title":"5 line CPP solution",
			"vote":"21",
			"content":"\\n    int maxProfit(vector<int>& prices) {\\n        int maxPro = 0, minPrice = INT_MAX;\\n        for(int i = 0; i < prices.size(); i++) {\\n            minPrice = min(minPrice, prices[i]);\\n            maxPro = max(prices[i] - minPrice, maxPro);\\n        }\\n        return maxPro;\\n    }"
		},
		{
			"lc_ans_id":"39171",
			"view":"2804",
			"top":"8",
			"title":"Java 6 lines, 4 lines, 2 lines solutions",
			"vote":"19",
			"content":"I only count the new lines of code that I've written, i.e. everything except for the method definition and the method closing bracket.\\n\\nProper Java - 6 lines:\\n\\n    public int maxProfit(int[] prices) {\\n         int min = Integer.MAX_VALUE, max = 0;\\n         for (int i = 0; i < prices.length; i++) {\\n             min = Math.min(min, prices[i]);\\n             max = Math.max(max, prices[i] - min);\\n         }\\n         return max;\\n     }  \\n\\nProper Java with shortcuts - 4 lines:\\n  \\n    public int maxProfit(int[] prices) {\\n        int min = Integer.MAX_VALUE, max = 0;\\n        for (int i = 0; i < prices.length; i++)\\n            max = Math.max(max, prices[i] - (min = Math.min(min, prices[i])));\\n        return max;\\n    }\\n\\nJava 8 streams - 2 lines:\\n\\n    int min = Integer.MAX_VALUE;\\n    public int maxProfit(int[] prices) {\\n        return Arrays.stream(prices).map(i -> i - (min = Math.min(min, i))).max().orElse(0);\\n    }"
		},
		{
			"lc_ans_id":"39281",
			"view":"2002",
			"top":"9",
			"title":"Java simple solution",
			"vote":"14",
			"content":"  public int maxProfit(int[] prices) {\\n    \\n        int le = prices.length, maxD = 0, min = Integer.MAX_VALUE;\\n    \\n        for (int i = 0; i < le; i++){ \\n            min = Math.min(min, prices[i]);\\n            maxD = Math.max(maxD, prices[i] - min);\\n        }\\n\\n        return maxD;       \\n}"
		}
	],
	"id":"121",
	"title":"Best Time to Buy and Sell Stock",
	"content":"<p>Say you have an array for which the <i>i</i><sup>th</sup> element is the price of a given stock on day <i>i</i>.</p>\r\n\r\n<p>If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\nInput: [7, 1, 5, 3, 6, 4]\r\nOutput: 5\r\n\r\nmax. difference = 6-1 = 5 (not 7-1 = 6, as selling price needs to be larger than buying price)\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\nInput: [7, 6, 4, 3, 1]\r\nOutput: 0\r\n\r\nIn this case, no transaction is done, i.e. max profit = 0.\r\n</pre>\r\n</p>",
	"frequency":"581",
	"ac_num":"259915"
}