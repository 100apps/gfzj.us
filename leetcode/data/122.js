{
	"difficulty":"1",
	"submit_num":"382368",
	"show_id":"122",
	"leetcode_id":"122",
	"answers":[
		{
			"lc_ans_id":"39402",
			"view":"73431",
			"top":"0",
			"title":"Is this question a joke?",
			"vote":"291",
			"content":"    public class Solution {\\n    public int maxProfit(int[] prices) {\\n        int total = 0;\\n        for (int i=0; i< prices.length-1; i++) {\\n            if (prices[i+1]>prices[i]) total += prices[i+1]-prices[i];\\n        }\\n        \\n        return total;\\n    }\\n\\nA simple code like this. The designer of this question must thought of something too complicated."
		},
		{
			"lc_ans_id":"39420",
			"view":"17520",
			"top":"1",
			"title":"Three lines in C++, with explanation",
			"vote":"62",
			"content":"  First we post the code here.\\n\\n    int maxProfit(vector<int> &prices) {\\n        int ret = 0;\\n        for (size_t p = 1; p < prices.size(); ++p) \\n          ret += max(prices[p] - prices[p - 1], 0);    \\n        return ret;\\n    }\\n\\nSecond, suppose the first sequence is \"a <= b <= c <= d\", the profit is \"d - a = (b - a) + (c - b) + (d - c)\" without a doubt.  And suppose another one is \"a <= b >= b' <= c <= d\", the profit is not difficult to be figured out as \"(b - a) + (d - b')\". So you just target at monotone sequences."
		},
		{
			"lc_ans_id":"39531",
			"view":"14246",
			"top":"2",
			"title":"Java O(n) solution if we're not greedy",
			"vote":"48",
			"content":"Hi guys!\\n\\nThe greedy pair-wise approach mentioned in other posts is great for this problem indeed, but if we're not allowed to buy and sell stocks within the same day it can't be applied (logically, of course; the answer will be the same). Actually, the straight-forward way of finding next local minimum and next local maximum is not much more complicated, so, just for the sake of having an alternative I share the code in Java for such case.\\n\\n    public int maxProfit(int[] prices) {\\n        int profit = 0, i = 0;\\n        while (i < prices.length) {\\n            // find next local minimum\\n            while (i < prices.length-1 && prices[i+1] <= prices[i]) i++;\\n            int min = prices[i++]; // need increment to avoid infinite loop for \"[1]\"\\n            // find next local maximum\\n            while (i < prices.length-1 && prices[i+1] >= prices[i]) i++;\\n            profit += i < prices.length ? prices[i++] - min : 0;\\n        }\\n        return profit;\\n    }\\n\\nHappy coding!"
		},
		{
			"lc_ans_id":"39406",
			"view":"9096",
			"top":"3",
			"title":"Clear 1-line Python Solution",
			"vote":"30",
			"content":"Basically, if tomorrow's price is higher than today's, we buy it today and sell tomorrow. Otherwise, we don't. Here is the code:\\n\\n    class Solution(object):\\n        def maxProfit(self, prices):\\n            return sum(max(prices[i + 1] - prices[i], 0) for i in range(len(prices) - 1))"
		},
		{
			"lc_ans_id":"39441",
			"view":"7948",
			"top":"4",
			"title":"A simple solution with O(n) time and O(1) space",
			"vote":"16",
			"content":" //now we try to improve the solution above.\\n        //(a[i]-a[i-1])+(a[i-1]-a[i-2])=a[i]-a[i-2] which is the profits created by i and i-2\\n        //so we travel from the end of the array and continually calculate the differece of i and i-1,\\n        //we only sum those positive profits then the final results is the maximum profits\\n\\n        if(prices.size()==0|| prices.size()==1) return 0;\\n        int max_pro=0;\\n        for(int i=prices.size()-1;i>0;i--){\\n            if(prices[i]-prices[i-1]>0) max_pro+=prices[i]-prices[i-1];\\n        }\\n        return max_pro;"
		},
		{
			"lc_ans_id":"39507",
			"view":"1933",
			"top":"5",
			"title":"8ms c++ solution with only 6 lines of code",
			"vote":"14",
			"content":"    int maxProfit(vector<int>& prices) {\\n      if(prices.size() <= 1) return 0;\\n\\n      int res = 0;\\n\\n      for( size_t i = 1; i < prices.size(); i++)\\n        if( prices[i] - prices[i-1] > 0 ) \\n          res += prices[i] - prices[i-1];\\n      \\n      return res;\\n    }"
		},
		{
			"lc_ans_id":"39404",
			"view":"2949",
			"top":"6",
			"title":"Shortest and fastest solution with explanation. You can never beat this.",
			"vote":"14",
			"content":"For Buy and Sell 1, we were limited to 1 transaction, so we had to find the largest sum of contiguous ints in an array of price differences. \\n\\nQ: Why does finding the most profitable transaction boils down to finding the largest sum of contiguous ints in the array of price differences?\\n\\nA: Define D[i] = Prices[i] - Prices[i-1] (difference between 2 consecutive prices)\\n\\nD[i] is essentially a \"delta\" trade. \\n\\nA transaction is defined as buying at Prices[X] and selling at Prices[Y], \\n\\n    the profit of the transaction\\n    = Prices[Y] - Prices[X] \\n    = Prices[Y] - Prices[Y-1] +\\n       Prices[Y-1] - Prices[Y-2] ...\\n        ....\\n       Prices[X+1] - Prices[X] \\n    = D[Y] + D[Y-1] + ... + D[X+1]\\n    = sum of D from X+1 to Y\\n   \\nThe problem is to find max(Prices[Y] - Prices[X]) which is equivalent to finding the largest sum of contiguous D's.\\n\\nTo illustrate, if D[Y+1] is positive, it means  Prices[Y+1] > Prices[Y], which implies I should sell at Prices[Y+1] instead of Prices[Y]. Basically it means I just add D[Y+1] to D[Y] + ... + D[X+1].  \\n\\nNote that there could be a negative or zero D in the best running sequence. It doesn't matter so long the  sum of the sequence is the largest.\\n\\nNow we are allowed unlimited transactions. So if there is a negative D, we could just break the sequence into 2, that is, into 2 transactions so as to avoid the negative element. \\n\\nThis boils the whole problem down to adding up all positive sums of contiguous ints in D, which simplifies to  just adding up all the positive ints.\\n\\n    class Solution {\\n    public:\\n        int maxProfit(vector<int>& prices) {\\n            const size_t n = prices.size();\\n            int ans = 0;\\n            for (size_t i=1;i<n;i++)\\n                ans += max(0,prices[i]-prices[i-1]);\\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"39582",
			"view":"744",
			"top":"7",
			"title":"Quite easy, share my C code with explanation",
			"vote":"10",
			"content":"###1. Calculate `prices[i+1]-prices[i]`\\n\\n###2. Turn the array `prices[] = [1,2,4,2,5,7,2,4,9,0]` into \\n`difference[] = [+1,+2,-2,+3,+2,-5,+2,+5,-9]`\\n\\n###3. Then add all positive numbers `sum = 1+2+3+2+2+5 = 15` in difference\\n###4. Return `15`\\n\\n\\n*The code is a simplified and optimized version.*\\n\\n#Code:\\n\\n    int maxProfit(int prices[], int n){\\n        int profit = 0;\\n        for(int i=0;i<n-1;i++){\\n            int temp = prices[i+1]-prices[i];\\n            if(temp>0)\\n                profit += temp;\\n        }\\n        return profit;\\n    }"
		},
		{
			"lc_ans_id":"39474",
			"view":"4747",
			"top":"8",
			"title":"Why the greedy algorithm works (pairwise differences only)?",
			"vote":"10",
			"content":"Hello,\\n\\nI'd like to know why the greedy algorithm that takes pairwise profits if they are positive only?\\n\\nThanks"
		},
		{
			"lc_ans_id":"39536",
			"view":"1330",
			"top":"9",
			"title":"Simple 4-line Solution - Sorry angie yunqi! :D",
			"vote":"8",
			"content":"    public int maxProfit(int[] prices) {\\n        int result = 0;\\n        for (int i = 1; i < prices.length; i++)\\n            result += Math.max(prices[i] - prices[i - 1], 0);\\n        return result;\\n    }"
		}
	],
	"id":"122",
	"title":"Best Time to Buy and Sell Stock II",
	"content":"<p>Say you have an array for which the <i>i</i><sup>th</sup> element is the price of a given stock on day <i>i</i>.</p>\r\n\r\n<p>Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times). However, you may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).</p>",
	"frequency":"595",
	"ac_num":"182705"
}