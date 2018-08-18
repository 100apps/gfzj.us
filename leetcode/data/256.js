{
	"difficulty":"1",
	"submit_num":"67870",
	"show_id":"256",
	"leetcode_id":"256",
	"answers":[
		{
			"lc_ans_id":"68211",
			"view":"16928",
			"top":"0",
			"title":"Simple java DP solution",
			"vote":"95",
			"content":"The 1st row is the prices for the 1st house, we can change the matrix to present sum of prices from the 2nd row. i.e, the costs[1][0] represent minimum price to paint the second house red plus the 1st house.\\n\\n    public class Solution {\\n    public int minCost(int[][] costs) {\\n        if(costs==null||costs.length==0){\\n            return 0;\\n        }\\n        for(int i=1; i<costs.length; i++){\\n            costs[i][0] += Math.min(costs[i-1][1],costs[i-1][2]);\\n            costs[i][1] += Math.min(costs[i-1][0],costs[i-1][2]);\\n            costs[i][2] += Math.min(costs[i-1][1],costs[i-1][0]);\\n        }\\n        int n = costs.length-1;\\n        return Math.min(Math.min(costs[n][0], costs[n][1]), costs[n][2]);\\n    }\\n}"
		},
		{
			"lc_ans_id":"68203",
			"view":"6356",
			"top":"1",
			"title":"Share my very simple Java solution with explanation.",
			"vote":"62",
			"content":"The basic idea is when we have painted the first i houses, and want to paint the i+1 th house, we have 3 choices: paint it either red, or green, or blue. If we choose to paint it red, we have the follow deduction:\\n\\n    paintCurrentRed = min(paintPreviousGreen,paintPreviousBlue) + costs[i+1][0]\\n\\nSame for the green and blue situation. And the initialization is set to costs[0], so we get the code:\\n\\n    public class Solution {\\n    public int minCost(int[][] costs) {\\n        if(costs.length==0) return 0;\\n        int lastR = costs[0][0];\\n        int lastG = costs[0][1];\\n        int lastB = costs[0][2];\\n        for(int i=1; i<costs.length; i++){\\n            int curR = Math.min(lastG,lastB)+costs[i][0];\\n            int curG = Math.min(lastR,lastB)+costs[i][1];\\n            int curB = Math.min(lastR,lastG)+costs[i][2];\\n            lastR = curR;\\n            lastG = curG;\\n            lastB = curB;\\n        }\\n        return Math.min(Math.min(lastR,lastG),lastB);\\n    }\\n}"
		},
		{
			"lc_ans_id":"68252",
			"view":"2146",
			"top":"2",
			"title":"Simple 15 line code with O(n) time and O(1) memory solution(Java)",
			"vote":"14",
			"content":"    public class Solution {\\n        public int minCost(int[][] costs) {\\n            \\n            if(costs==null || costs.length==0) return 0;\\n            int[] prevRow = costs[0];\\n             for(int i=1;i<costs.length;i++)\\n            {\\n                int[] currRow = new int[3];\\n                for(int j=0;j<3;j++)\\n                    currRow[j]=costs[i][j]+Math.min(prevRow[(j+1)%3],prevRow[(j+2)%3]);\\n                prevRow = currRow;\\n            }\\n            return Math.min(prevRow[0],Math.min(prevRow[1],prevRow[2]));\\n        }\\n    }"
		},
		{
			"lc_ans_id":"68209",
			"view":"3559",
			"top":"3",
			"title":"1+ lines Ruby, Python",
			"vote":"14",
			"content":"First two solutions could easily be generalized to arbitrary number of colors.\\n\\n**Solution 1** ... **Ruby**\\n\\n    def min_cost(costs)\\n      costs.reduce([0]*3) { |prev, now| now.map { |n| n + prev.rotate![0,2].min } }.min\\n    end\\n\\n**Solution 2** ... **Python**\\n\\n    def minCost(self, costs):\\n        prev = [0] * 3\\n        for now in costs:\\n            prev = [now[i] + min(prev[:i] + prev[i+1:]) for i in range(3)]\\n        return min(prev)\\n\\n**Solution 3** ... **Python**\\n\\n    def minCost(self, costs):\\n        return min(reduce(lambda (A,B,C), (a,b,c): (a+min(B,C), b+min(A,C), c+min(A,B)),\\n                          costs, [0]*3))"
		},
		{
			"lc_ans_id":"68241",
			"view":"2547",
			"top":"4",
			"title":"Python DP solution, O(n) time, O(1) space",
			"vote":"11",
			"content":"the idea is to store current house's minimum cost in different colors.\\n\\n    def minCost(self, costs):\\n        size = len(costs)\\n        if size == 0:\\n            return 0\\n            \\n        pre = costs[0][:]\\n        now = [0]*3\\n        \\n        for i in xrange(size-1):\\n            now[0] = min(pre[1], pre[2]) + costs[i+1][0]\\n            now[1] = min(pre[0], pre[2]) + costs[i+1][1]\\n            now[2] = min(pre[0], pre[1]) + costs[i+1][2]\\n            pre[:] = now[:]\\n        \\n        return min(pre)"
		},
		{
			"lc_ans_id":"68233",
			"view":"1492",
			"top":"5",
			"title":"O(n) Time and O(1) Space C++ Solution",
			"vote":"9",
			"content":"We can simply use `costs` to do the DP in place. Here is the code:\\n\\n    int minCost(vector<vector<int>>& costs) {\\n        int n = costs.size();\\n        for (int i = 1; i < n; i++) {\\n            costs[i][0] += std::min(costs[i - 1][1], costs[i - 1][2]);\\n            costs[i][1] += std::min(costs[i - 1][0], costs[i - 1][2]);\\n            costs[i][2] += std::min(costs[i - 1][0], costs[i - 1][1]);\\n        }\\n        return (n == 0) ? 0 : (std::min(costs[n - 1][0], std::min(costs[n - 1][1], costs[n - 1][2])));\\n    }"
		},
		{
			"lc_ans_id":"68243",
			"view":"929",
			"top":"6",
			"title":"Java solution - Not limited to 3 colors - No change to original input",
			"vote":"5",
			"content":"    public int minCost(int[][] costs) {\\n        if(costs.length == 0 || costs[0].length == 0)\\n            return 0;\\n        int m = costs.length, n = costs[0].length;\\n        \\n        //initialize dp matrix\\n        int[][] dp = new int[m][n];\\n        for(int j = 0; j < n; j++) \\n            dp[0][j] = costs[0][j];\\n            \\n        //fill the dp matrix\\n        for(int i = 1; i < m; i++) {\\n            for(int j = 0; j < n; j++)\\n                dp[i][j] = costs[i][j] + findMinInOneRow(i - 1, j, dp);\\n        }\\n        \\n        return findMinInOneRow(m - 1, -1, dp);\\n    }\\n    \\n    private int findMinInOneRow(int i, int j, int[][] matrix) {\\n        int min = Integer.MAX_VALUE;\\n        for(int k = 0; k < matrix[0].length; k++) {\\n            if(k == j)\\n                continue;\\n            min = Math.min(min, matrix[i][k]);\\n        }\\n        return min;\\n    }\\n\\n1. The code can handle n colors rather than 3.\\n2. I am a guy don't like to mess up original input, so I create a new array called dp."
		},
		{
			"lc_ans_id":"68256",
			"view":"422",
			"top":"7",
			"title":"Python solutions with different space usages.",
			"vote":"5",
			"content":"        \\n    # O(n*3) space\\n    def minCost1(self, costs):\\n        if not costs:\\n            return 0\\n        r, c = len(costs), len(costs[0])\\n        dp = [[0 for _ in xrange(c)] for _ in xrange(r)]\\n        dp[0] = costs[0]\\n        for i in xrange(1, r):\\n            dp[i][0] = costs[i][0] + min(dp[i-1][1:3])\\n            dp[i][1] = costs[i][1] + min(dp[i-1][0], dp[i-1][2])\\n            dp[i][2] = costs[i][2] + min(dp[i-1][:2])\\n        return min(dp[-1])\\n     \\n    # change original matrix   \\n    def minCost2(self, costs):\\n        if not costs:\\n            return 0\\n        for i in xrange(1, len(costs)):\\n            costs[i][0] += min(costs[i-1][1:3])\\n            costs[i][1] += min(costs[i-1][0], costs[i-1][2])\\n            costs[i][2] += min(costs[i-1][:2])\\n        return min(costs[-1])\\n    \\n    # O(1) space    \\n    def minCost3(self, costs):\\n        if not costs:\\n            return 0\\n        dp = costs[0]\\n        for i in xrange(1, len(costs)):\\n            pre = dp[:] # here should take care\\n            dp[0] = costs[i][0] + min(pre[1:3])\\n            dp[1] = costs[i][1] + min(pre[0], pre[2])\\n            dp[2] = costs[i][2] + min(pre[:2])\\n        return min(dp)\\n    \\n    # O(1) space, shorter version, can be applied \\n    # for more than 3 colors\\n    def minCost(self, costs):\\n        if not costs:\\n            return 0\\n        dp = costs[0]\\n        for i in xrange(1, len(costs)):\\n            pre = dp[:] # here should take care\\n            for j in xrange(len(costs[0])):\\n                dp[j] = costs[i][j] + min(pre[:j]+pre[j+1:])\\n        return min(dp)"
		},
		{
			"lc_ans_id":"68245",
			"view":"632",
			"top":"8",
			"title":"Viterbi Algorithm Implementation",
			"vote":"3",
			"content":"    public class Solution {\\n        public int minCost(int[][] costs) {\\n            int len = costs.length;\\n            if(len==0) return 0;\\n            for(int i=1; i<len; i++){\\n                costs[i][0] += Math.min(costs[i-1][1], costs[i-1][2]);\\n                costs[i][1] += Math.min(costs[i-1][0], costs[i-1][2]);\\n                costs[i][2] += Math.min(costs[i-1][0], costs[i-1][1]);\\n            }\\n            return Math.min(costs[len-1][0], Math.min(costs[len-1][1], costs[len-1][2]));\\n        }\\n    }"
		},
		{
			"lc_ans_id":"68255",
			"view":"890",
			"top":"9",
			"title":"My 1 line Python solution",
			"vote":"3",
			"content":"Use second parameter n to inidicate colors number.\\nSo this solution can support not only three colors.\\n\\n\\n    class Solution:\\n        # @param {integer[][]} costs\\n        # @return {integer}\\n        def minCost(self, costs, n=3):\\n            tmp = [0] * n\\n            for i in costs: tmp = [i[j] + min((tmp[j:]+tmp[0:j])[1:]) for j in range(n)]\\n            return min(tmp)\\n\\nUPDATE, thanks for @StefanPochmann:\\n\\n    class Solution:\\n        # @param {integer[][]} costs\\n        # @return {integer}\\n        def minCost(self, costs, n=3):\\n            tmp = [0] * n\\n            for i in costs:\\n                tmp = [i[j] + min(tmp[j+1:]+tmp[0:j]) for j in range(n)]\\n            return min(tmp)\\n\\n\\nUPDATE, 1 line solution:\\n\\n    class Solution:\\n        # @param {integer[][]} costs\\n        # @return {integer}\\n        def minCost(self, costs, n=3):\\n            return min(reduce(lambda x, y: [y[i] + min(x[i+1:]+x[0:i]) for i in range(n)], costs, [0]*n))"
		}
	],
	"id":"256",
	"title":"Paint House",
	"content":"<p>\r\nThere are a row of <i>n</i> houses, each house can be painted with one of the three colors: red, blue or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.\r\n</p>\r\n<p>\r\nThe cost of painting each house with a certain color is represented by a <code><i>n</i> x <i>3</i></code> cost matrix. For example, <code>costs[0][0]</code> is the cost of painting house 0 with color red; <code>costs[1][2]</code> is the cost of painting house 1 with color green, and so on... Find the minimum cost to paint all houses.\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\nAll costs are positive integers.</p>",
	"frequency":"252",
	"ac_num":"31470"
}