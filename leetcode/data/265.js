{
	"difficulty":"3",
	"submit_num":"73499",
	"show_id":"265",
	"leetcode_id":"265",
	"answers":[
		{
			"lc_ans_id":"69492",
			"view":"15167",
			"top":"0",
			"title":"AC Java solution without extra space",
			"vote":"95",
			"content":"The idea is similar to the problem Paint House I, for each house and each color, the minimum cost of painting the house with that color should be the minimum cost of painting previous houses, and make sure the previous house doesn't paint with the same color.\\n\\nWe can use min1 and min2 to track the indices of the 1st and 2nd smallest cost till previous house, if the current color's index is same as min1, then we have to go with min2, otherwise we can safely go with min1.\\n\\nThe code below modifies the value of costs[][] so we don't need extra space.\\n\\n    public int minCostII(int[][] costs) {\\n        if (costs == null || costs.length == 0) return 0;\\n            \\n        int n = costs.length, k = costs[0].length;\\n        // min1 is the index of the 1st-smallest cost till previous house\\n        // min2 is the index of the 2nd-smallest cost till previous house\\n        int min1 = -1, min2 = -1;\\n        \\n        for (int i = 0; i < n; i++) {\\n            int last1 = min1, last2 = min2;\\n            min1 = -1; min2 = -1;\\n            \\n            for (int j = 0; j < k; j++) {\\n                if (j != last1) {\\n                    // current color j is different to last min1\\n                    costs[i][j] += last1 < 0 ? 0 : costs[i - 1][last1];\\n                } else {\\n                    costs[i][j] += last2 < 0 ? 0 : costs[i - 1][last2];\\n                }\\n                \\n                // find the indices of 1st and 2nd smallest cost of painting current house i\\n                if (min1 < 0 || costs[i][j] < costs[i][min1]) {\\n                    min2 = min1; min1 = j;\\n                } else if (min2 < 0 || costs[i][j] < costs[i][min2]) {\\n                    min2 = j;\\n                }\\n            }\\n        }\\n        \\n        return costs[n - 1][min1];\\n    }"
		},
		{
			"lc_ans_id":"69495",
			"view":"8461",
			"top":"1",
			"title":"Fast DP Java solution Runtime O(nk) space O(1)",
			"vote":"58",
			"content":"Explanation:  dp[i][j] represents the min paint cost from house 0 to house i when house i use color j; The formula will be dp[i][j] = Math.min(any k!= j| dp[i-1][k]) + costs[i][j]. \\n\\nTake a closer look at the formula, we don't need an array to represent dp[i][j], we only need to know the min cost to the previous house of any color and if the color j is used on previous house to get prev min cost, use the second min cost that are not using color j on the previous house. So I have three variable to record: prevMin, prevMinColor, prevSecondMin. and the above formula will be translated into: dp[currentHouse][currentColor] = (currentColor == prevMinColor? prevSecondMin: prevMin) + costs[currentHouse][currentColor].\\n\\n    public class Solution {\\n    public int minCostII(int[][] costs) {\\n        if(costs == null || costs.length == 0 || costs[0].length == 0) return 0;\\n        \\n        int n = costs.length, k = costs[0].length;\\n        if(k == 1) return (n==1? costs[0][0] : -1);\\n        \\n        int prevMin = 0, prevMinInd = -1, prevSecMin = 0;//prevSecMin always >= prevMin\\n        for(int i = 0; i<n; i++) {\\n            int min = Integer.MAX_VALUE, minInd = -1, secMin = Integer.MAX_VALUE;\\n            for(int j = 0; j<k;  j++) {\\n                int val = costs[i][j] + (j == prevMinInd? prevSecMin : prevMin);\\n                if(minInd< 0) {min = val; minInd = j;}//when min isn't initialized\\n                else if(val < min) {//when val < min, \\n                    secMin = min;\\n                    min = val;\\n                    minInd = j;\\n                } else if(val < secMin) { //when min<=val< secMin\\n                    secMin = val;\\n                }\\n            }\\n            prevMin = min;\\n            prevMinInd = minInd;\\n            prevSecMin = secMin;\\n        }\\n        return prevMin;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"69509",
			"view":"4476",
			"top":"2",
			"title":"Easiest O(1) space JAVA solution",
			"vote":"32",
			"content":"To solve this DP problem:\\n\\n- If there's no constraint, we choose min cost for each house.\\n- Since `house[i]` and `house[i - 1]` cannot have the same color `j`, we should choose 2nd min color for `house[i - 1]`.\\n- If we choose the 3rd min color for `house[i - 1]`, we might miss potential min cost.\\n- `min(i) = min(cost[i][j] + 1st min / 2nd min), 0 < j < n`.\\n- Since current row only relies on last row for getting mins and avoiding same color,  `O(1)` space is enough.\\n\\n<hr>\\n\\n    public int minCostII(int[][] costs) {\\n        if (costs.length == 0) {\\n            return 0;\\n        }\\n        int min1 = 0, min2 = 0, index1 = -1;\\n        \\n        for (int i = 0; i < costs.length; i++) {\\n            int m1 = Integer.MAX_VALUE, m2 = Integer.MAX_VALUE, idx1 = -1;\\n            \\n            for (int j = 0; j < costs[0].length; j++) {\\n                int cost = costs[i][j] + (j != index1 ? min1 : min2);\\n\\n                 if (cost < m1) {           // cost < m1 < m2\\n                    m2 = m1; m1 = cost; idx1 = j; \\n                \\n                } else if (cost < m2) {    // m1 < cost < m2\\n                    m2 = cost;\\n                }\\n            }\\n            \\n            min1 = m1; min2 = m2; index1 = idx1;\\n        }\\n        return min1;\\n    }"
		},
		{
			"lc_ans_id":"69541",
			"view":"5397",
			"top":"3",
			"title":"C++ DP time O(nk)  space O(k)",
			"vote":"21",
			"content":"maintain the minimum two costs min1(smallest) and min2 (second to smallest) after painting i-th house. \\n\\n    int minCostII(vector<vector<int>>& costs) {\\n        int n = costs.size();\\n        if(n==0) return 0;\\n        int k = costs[0].size();\\n        if(k==1) return costs[0][0];\\n\\n        vector<int> dp(k, 0);\\n        int min1, min2;\\n\\n        for(int i=0; i<n; ++i){\\n            int min1_old = (i==0)?0:min1;\\n            int min2_old = (i==0)?0:min2;\\n            min1 = INT_MAX;\\n            min2 = INT_MAX;\\n            for(int j=0; j<k; ++j){\\n                if(dp[j]!=min1_old || min1_old==min2_old){\\n                    dp[j] = min1_old + costs[i][j];\\n                }else{//min1_old occurred when painting house i-1 with color j, so it cannot be added to dp[j]\\n                    dp[j] = min2_old + costs[i][j];\\n                }\\n\\n                if(min1<=dp[j]){\\n                    min2 = min(min2, dp[j]);\\n                }else{\\n                    min2 = min1;\\n                    min1 = dp[j];\\n                }\\n            }\\n        }\\n\\n        return min1;\\n    }"
		},
		{
			"lc_ans_id":"69532",
			"view":"2660",
			"top":"4",
			"title":"Accepted Simple JAVA O(NK) solution",
			"vote":"9",
			"content":"    public class Solution {\\n        public int minCostII(int[][] costs) {\\n            if (costs.length == 0 || costs[0].length == 0) {\\n                return 0;\\n            }\\n            int m = costs.length, n = costs[0].length, m1 = 0, m2 = 0;\\n            int[] dp = new int[n];\\n            for (int i = 0; i < m; i++) {\\n                int t1 = m1, t2 = m2;\\n                m1 = Integer.MAX_VALUE;\\n                m2 = Integer.MAX_VALUE;\\n                for (int j = 0; j < n; j++) {\\n                    dp[j] = (dp[j] == t1 ? t2 : t1) + costs[i][j];\\n                    if (m1 <= dp[j]) {\\n                        m2 = Math.min(dp[j], m2);\\n                    }\\n                    else {\\n                        m2 = m1;\\n                        m1 = dp[j];\\n                    }\\n                }\\n            }\\n            \\n            return m1;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"69559",
			"view":"936",
			"top":"5",
			"title":"Java typical DP solution",
			"vote":"5",
			"content":"\\n\\npublic class Solution {\\n\\t\\n    public int minCostII(int[][] costs) {\\n    \\tif (costs.length == 0 || costs[0].length == 0) {\\n    \\t\\treturn 0;\\n    \\t}\\n        int n = costs.length, k = costs[0].length;\\n        \\n        //dp[i][j] indicate the optimal cost for the house i if it is painted with color j.\\n        int[][] dp = new int[n][k];\\n        for (int j = 0; j < k; j++) \\n        \\tdp[0][j] = costs[0][j];\\n        \\n        for (int i = 1; i < n; i++) {\\n        \\tfor (int j = 0; j < k; j++) {\\n        \\t\\tdp[i][j] = minCost(dp[i-1], j) + costs[i][j];\\n        \\t}\\n        }\\n        return minCost(dp[n-1], -1);\\n    }\\n\\n    //find the minimum cost if the current house is painted with different color except j.\\n    //if j == -1, then find minimum cost for the current house comparing different color.\\n\\tprivate int minCost(int[] dp, int j) {\\n\\t\\tint min = Integer.MAX_VALUE;\\n\\t\\tint i = 0; \\n\\t\\twhile (i < dp.length) {\\n\\t\\t\\tif (j != -1 && i == j) \\n\\t\\t\\t\\t;\\n\\t\\t\\telse\\n\\t\\t\\t\\tmin = Math.min(min, dp[i]);\\n\\t\\t\\ti++;\\n\\t\\t}\\n\\t\\treturn min;\\n\\t}\\n}"
		},
		{
			"lc_ans_id":"69490",
			"view":"2514",
			"top":"6",
			"title":"1 line Python solution, UPDATE to O(nk)",
			"vote":"5",
			"content":"Almost same as my original [Paint House solution][1]:\\n\\n    return min(reduce(lambda x, y: [y[i] + min(x[i+1:]+x[0:i] or [0]) for i in range(len(x))], costs)) if costs else 0\\n\\n\\n  [1]: https://leetcode.com/discuss/51741/my-1-lines-python-solution\\n\\n\\n`O(nk)` solution:\\n\\n    class Solution:\\n        # @param {integer[][]} costs\\n        # @return {integer}\\n        def minCostII(self, costs):\\n            return min(reduce(lambda x, y: self.combine(y, x), costs)) if costs else 0\\n    \\n        def combine(self, house, tmp):\\n            m, n, i = min(tmp), len(tmp), tmp.index(min(tmp))\\n            tmp = [m]*i + [min(tmp[0:i]+tmp[i+1:])] + [m]*(n-i-1)\\n            return [sum(i) for i in zip(house, tmp)]"
		},
		{
			"lc_ans_id":"69494",
			"view":"919",
			"top":"7",
			"title":"In an interview, are we really expected to come up with the O(nk) time solution? It seems very difficult",
			"vote":"3",
			"content":"I feel like the O(nk) time solution is pretty hard to come up with in an interview, but the O(nk^2) solution is easier. Would we actually be expected to get the O(nk) solution in facebook interview? Did anyone pass with giving the O(nk^2) solution?"
		},
		{
			"lc_ans_id":"69502",
			"view":"361",
			"top":"8",
			"title":"Evolve from brute force to optimal",
			"vote":"2",
			"content":"This is similar to [paint house](https://discuss.leetcode.com/topic/76607/evolve-from-brute-force-to-optimal).\\n1. O((k-1)^n) brute force\\n```\\n    int minCostII(vector<vector<int>>& costs) {\\n        if(costs.empty()) return 0;\\n        return minCost(-1,-1,costs);        \\n    }\\n    int minCost(int i,int j, vector<vector<int>>& costs) { //minCost starting from house i with color j\\n        if(i==costs.size()) return 0;\\n        int mc = INT_MAX;\\n        for(int k=0;k<costs[0].size();k++) if(k!=j) mc = min(mc, minCost(i+1,k,costs));\\n        return i<0? mc : mc+costs[i][j];\\n    }\\n```\\n2. O(nk^2) Memoization\\n```\\n    int minCostII(vector<vector<int>>& costs) {\\n        if(costs.empty()) return 0;\\n        vector<vector<int>> mem(costs.size(),vector<int>(costs[0].size()));\\n        return minCost(-1,-1,mem,costs);        \\n    }\\n    int minCost(int i,int j, vector<vector<int>>& mem, vector<vector<int>>& costs) {\\n        if(i==costs.size()) return 0;\\n        if(i>0 && mem[i][j]) return mem[i][j];\\n        int mc = INT_MAX;\\n        for(int k=0;k<costs[0].size();k++) if(k!=j) mc = min(mc, minCost(i+1,k,mem,costs));\\n        return i<0? mc : mem[i][j]=mc+costs[i][j];\\n    }\\n```\\n3. O(nk^2) dp\\n```\\n    int minCostII(vector<vector<int>>& costs) {\\n        if(costs.empty()) return 0;\\n        int n = costs.size(), k = costs[0].size();\\n        vector<vector<int>> dp(n+1,vector<int>(k));\\n        for(int i=n-1;i>=0;i--)\\n            for(int j=0;j<k;j++)\\n                dp[i][j]=getMin(j,dp[i+1]) + costs[i][j];\\n        return getMin(-1, dp[0]);        \\n    }\\n    int getMin(int j, vector<int> &pre) {\\n        int mc = INT_MAX;\\n        for(int i=0;i<pre.size();i++) if(i!=j) mc = min(mc,pre[i]);\\n        return mc;\\n    }\\n```\\n4. O(nk) dp\\n```\\n    int minCostII(vector<vector<int>>& costs) {\\n        int pre1=0,pre2=0,c1=-1;\\n        for(auto &v:costs) {\\n            int cur1=INT_MAX,cur2,co1;\\n            for(int i=0;i<v.size();i++) {\\n                int c = v[i]+ (i==c1?pre2:pre1);\\n                if(c<cur1) {\\n                    cur2 = cur1;\\n                    co1 = i;\\n                    cur1 = c;\\n                } else if (c<cur2) cur2 = c;\\n            }\\n            pre1 = cur1;\\n            pre2 = cur2;\\n            c1 = co1;\\n        }\\n        return pre1;\\n    }\\n```"
		},
		{
			"lc_ans_id":"69521",
			"view":"401",
			"top":"9",
			"title":"Python O(nk) beat 95% solution with explaination",
			"vote":"2",
			"content":"```\\nclass Solution(object):\\n    def minCostII(self, costs):\\n        \"\"\"\\n        :type costs: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        if not costs: return 0\\n        n, k = len(costs), len(costs[0])\\n        for i in xrange(1, n):\\n            min1 = min(costs[i-1])\\n            idx = costs[i-1].index(min1)\\n            min2 = min(costs[i-1][:idx] + costs[i-1][idx+1:])\\n            for j in xrange(k):\\n                if j == idx:\\n                    costs[i][j] += min2\\n                else:\\n                    costs[i][j] += min1\\n        return min(costs[-1])\\n```\\nThis is a Markov Chain (dp) with k states ```(color 1, color 2...color k)``` and n stages, we simply update the ```costs``` matrix to keep track of the optimal value for each state at current stage.\\n```min1``` means we paint all other states with the minimum cost, while ```min2``` means we cannot paint consecutive houses with same color so we choose the second lowest cost to add up with."
		}
	],
	"id":"265",
	"title":"Paint House II",
	"content":"<p>\r\nThere are a row of <i>n</i> houses, each house can be painted with one of the <i>k</i> colors. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.\r\n</p>\r\n<p>\r\nThe cost of painting each house with a certain color is represented by a <code><i>n</i> x <i>k</i></code> cost matrix. For example, <code>costs[0][0]</code> is the cost of painting house 0 with color 0; <code>costs[1][2]</code> is the cost of painting house 1 with color 2, and so on... Find the minimum cost to paint all houses.\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\nAll costs are positive integers.</p>\r\n\r\n<p><b>Follow up:</b><br>\r\nCould you solve it in <i>O</i>(<i>nk</i>) runtime?</p>",
	"frequency":"118",
	"ac_num":"28191"
}