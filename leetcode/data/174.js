{
	"difficulty":"3",
	"submit_num":"193007",
	"show_id":"174",
	"leetcode_id":"174",
	"answers":[
		{
			"lc_ans_id":"52774",
			"view":"16101",
			"top":"0",
			"title":"C++ DP solution",
			"vote":"109",
			"content":"Use hp[i][j] to store the min hp needed at position (i, j), then do the calculation from right-bottom to left-up.\\n\\nNote: adding dummy row and column would make the code cleaner.\\n\\n    class Solution {\\n    public:\\n        int calculateMinimumHP(vector<vector<int> > &dungeon) {\\n            int M = dungeon.size();\\n            int N = dungeon[0].size();\\n            // hp[i][j] represents the min hp needed at position (i, j)\\n            // Add dummy row and column at bottom and right side\\n            vector<vector<int> > hp(M + 1, vector<int>(N + 1, INT_MAX));\\n            hp[M][N - 1] = 1;\\n            hp[M - 1][N] = 1;\\n            for (int i = M - 1; i >= 0; i--) {\\n                for (int j = N - 1; j >= 0; j--) {\\n                    int need = min(hp[i + 1][j], hp[i][j + 1]) - dungeon[i][j];\\n                    hp[i][j] = need <= 0 ? 1 : need;\\n                }\\n            }\\n            return hp[0][0];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"52790",
			"view":"10890",
			"top":"1",
			"title":"My AC Java Version, Suggestions are welcome",
			"vote":"50",
			"content":"    public int calculateMinimumHP(int[][] dungeon) {\\n        if (dungeon == null || dungeon.length == 0 || dungeon[0].length == 0) return 0;\\n        \\n        int m = dungeon.length;\\n        int n = dungeon[0].length;\\n        \\n        int[][] health = new int[m][n];\\n\\n        health[m - 1][n - 1] = Math.max(1 - dungeon[m - 1][n - 1], 1);\\n\\n        for (int i = m - 2; i >= 0; i--) {            \\n            health[i][n - 1] = Math.max(health[i + 1][n - 1] - dungeon[i][n - 1], 1);\\n        }\\n\\n        for (int j = n - 2; j >= 0; j--) {\\n            health[m - 1][j] = Math.max(health[m - 1][j + 1] - dungeon[m - 1][j], 1);\\n        }\\n\\n        for (int i = m - 2; i >= 0; i--) {\\n            for (int j = n - 2; j >= 0; j--) {\\n                int down = Math.max(health[i + 1][j] - dungeon[i][j], 1);\\n                int right = Math.max(health[i][j + 1] - dungeon[i][j], 1);\\n                health[i][j] = Math.min(right, down);\\n            }\\n        }\\n\\n        return health[0][0];\\n    }"
		},
		{
			"lc_ans_id":"52805",
			"view":"10056",
			"top":"2",
			"title":"Best solution I have found with explanations",
			"vote":"42",
			"content":"\\n\\nhttp://leetcodesolution.blogspot.com/2015/01/leetcode-dungeon-game.html\\n\\nseems pretty simple... and easy to understand explanations...\\n\\n\\nIt is easy to know that at grid P, since \" at any point his health point drops to 0 or below, he dies immediately\", the remaining health value should be at least 1,  that is, initialHealth + dungeon >= 1, we have initialHealth = max(1, 1 - dungeon[i][j]).  (Notice, at any grid, the initial health should be at least 1 (for example,  test case [1,0,0] require initial health 1 even though it has positive remaining health at grid[0][1] and grid[0][2])\\nSimilarly, to satisfy the initial health of dungeon[i][j], the initial health of dungeon[i-1][j] (or dungeon[i][j-1]) should be at least initialHealth[i-1][j] + dungeon[i-1][j] = initialHealth[i][j], that is, initialHealth[i][j] = initialHealth[i][j] - dungeon[i-1][j]. \\nIn addition, if grid[i][j] can go both grid[i+1][j] and grid[i][j+1] to P,  we should choose a path with less initial health between grid[i+1][j] and grid[i][j+1] since it require less initial health of grid[i][j].\\nWe can simply code the solution by having the dynamic programming equations. \\n\\n\\n         int calculateMinimumHP(vector &dungeon) {\\n        int m = dungeon.size();\\n        int n = dungeon[0].size();\\n        vector minInitHealth(m, vector<int>(n,0));\\n        for(int i=m-1; i>=0; i--)\\n        {\\n            for (int j=n-1; j>=0; j--)\\n            {\\n                if (i == m-1 && j == n-1)\\n                {\\n                    minInitHealth[i][j] = max(1, 1 - dungeon[i][j]);\\n                }  \\n                else if (i == m-1)\\n                {\\n                    minInitHealth[i][j] = max(1, minInitHealth[i][j+1] - dungeon[i][j]);\\n                }  \\n                else if (j == n-1)\\n                {\\n                    minInitHealth[i][j] = max(1, minInitHealth[i+1][j] - dungeon[i][j]);\\n                }  \\n                else\\n                {\\n                    minInitHealth[i][j] = max(1, min(minInitHealth[i+1][j],minInitHealth[i][j+1]) - dungeon[i][j]);\\n                }  \\n            }\\n        }\\n        \\n        return  minInitHealth[0][0];\\n    }"
		},
		{
			"lc_ans_id":"52887",
			"view":"4817",
			"top":"3",
			"title":"Sharing my solution with O(n) space, O(mn) runtime",
			"vote":"25",
			"content":"Here is my solution using dp and rolling array --Dungeon Game:\\n\\n    int calculateMinimumHP(vector<vector<int> > &dungeon) {\\n        const int m = dungeon.size();\\n        const int n = dungeon[0].size();\\n        vector<int> dp(n + 1, INT_MAX);\\n        dp[n - 1] = 1; \\n        for(int i = m - 1; i >= 0; --i)\\n            for(int j = n - 1; j >= 0; --j)\\n                dp[j] = getMin(min(dp[j], dp[j + 1]) - dungeon[i][j]);\\n        return dp[0];\\n    }\\n    int getMin(int n){\\n        return n <= 0 ? 1 : n;\\n    }\\n\\nNote: Update from right to left and from bottom up."
		},
		{
			"lc_ans_id":"52897",
			"view":"4216",
			"top":"4",
			"title":"My java solution with explanation in detail",
			"vote":"23",
			"content":"With a health array to store each grid's health, we should get the result at [0][0].\\n\\nNow the question become to how to create a health array using dungeon.\\n\\ndungeon\\n\\n    -2,-3,3\\n    -5,-10,1\\n    10,30,-5\\n\\nFrom the Dungeon grid, we can simply compute health for the [last row][last column].\\n\\nNow we get\\n\\n    ?,?,?\\n    ?,?,?\\n    ?,?,6\\n\\nNow because the knight can only move rightward or downward in each step, we can compute all the health value for last row from right to left using its rightward neighbor. we can also compute all the health value for last column from bottom to up using its downward neighbor.\\n\\n    ?,?,2\\n    ?,?,5\\n    1,1,6\\n\\nNow, we can compute all the health value using its downward neighbor and rightward neighbor(we use the min value of these 2 health value).\\n\\n    7,5,2\\n    6,11,5\\n    1,1,6\\n\\nNow we get the answer [0][0], which is 7.\\n\\n\\n\\n        public int calculateMinimumHP(int[][] dungeon) {\\n\\n            int row = dungeon.length;\\n            int column = dungeon[0].length;\\n\\n            int[][] tem = new int[row][];\\n            for (int i = 0; i < tem.length; i++) {\\n                tem[i] = new int[column];\\n            }\\n\\n            if (dungeon[row - 1][column - 1] >= 0) {\\n                tem[row - 1][column - 1] = 1;\\n            } else {\\n                tem[row - 1][column - 1] = 1 - dungeon[row - 1][column - 1];\\n            }\\n\\n            for (int i = row - 2; i >= 0; i--) {\\n                tem[i][column - 1] = c(dungeon[i][column - 1],\\n                        tem[i + 1][column - 1]);\\n            }\\n\\n            for (int j = column - 2; j >= 0; j--) {\\n                tem[row - 1][j] = c(dungeon[row - 1][j], tem[row - 1][j + 1]);\\n            }\\n\\n            for (int i = row - 2; i >= 0; i--) {\\n                for (int j = column - 2; j >= 0; j--) {\\n                    tem[i][j] = Math.min(c(dungeon[i][j], tem[i + 1][j]),\\n                            c(dungeon[i][j], tem[i][j + 1]));\\n                }\\n            }\\n\\n            return tem[0][0];\\n        }\\n\\n        private int c(int value, int preResult) {\\n            if (value == 0)\\n                return preResult;\\n\\n            if (value > 0) {\\n                if (value >= preResult)\\n                    return 1;\\n                return preResult - value;\\n            }\\n\\n            return preResult - value;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"52843",
			"view":"2021",
			"top":"5",
			"title":"6 lines, 16 ms,  C++, O(mn) Time, O(n) Space,",
			"vote":"18",
			"content":"    struct Solution {\\n        int calculateMinimumHP(vector<vector<int>>& d) {\\n            vector<int> dp(d.size() + 1, INT_MAX);\\n            dp[d.size() - 1] = 1;\\n            for (int i = d[0].size() - 1; i >= 0; --i)\\n                for (int j = d.size() - 1; j >= 0; --j)\\n                    dp[j] = max(1, min(dp[j + 1], dp[j]) - d[j][i]);\\n            return dp[0];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"52857",
			"view":"1461",
			"top":"6",
			"title":"A 12 ms C++ solution, DP",
			"vote":"15",
			"content":"This problem is quite like #64 Minimum Path Sum.\\n\\nThe trick is where is the Starting point. This problem ask us to find the least hp in top-left. So in the most optimistic situation, bottom-right value can be determined as 1. Then bottom-right is the starting point.\\n\\n    int calculateMinimumHP(vector<vector<int>>& dun) \\n    {\\n    \\tif (!dun.size() || !dun[0].size())\\n    \\t\\treturn 1;\\n    \\tint nrow = dun.size();\\n    \\tint ncol = dun[0].size();\\n    \\tvector<int> row(ncol + 1, INT_MAX);\\n    \\trow[ncol - 1] = 1;\\n    \\tint i, j, t;\\n    \\tfor (i = nrow - 1; i >= 0; --i)\\n    \\t{\\n    \\t\\tfor (j = ncol - 1; j >= 0; --j)\\n    \\t\\t{\\n    \\t\\t\\tt = min(row[j], row[j + 1]) - dun[i][j];\\n    \\t\\t\\trow[j] = max(t, 1); //row[j]=smaller value from below and right, but no smaller than 1.\\n    \\t\\t}\\n    \\t}\\n    \\treturn row[0];\\n    }"
		},
		{
			"lc_ans_id":"52792",
			"view":"2175",
			"top":"7",
			"title":"6 lines Python, 8 lines Ruby",
			"vote":"13",
			"content":"Just some DP.\\n\\n---\\n\\n**Python**\\n\\n    def calculateMinimumHP(self, dungeon):\\n        n = len(dungeon[0])\\n        need = [2**31] * (n-1) + [1]\\n        for row in dungeon[::-1]:\\n            for j in range(n)[::-1]:\\n                need[j] = max(min(need[j:j+2]) - row[j], 1)\\n        return need[0]\\n\\nGot accepted in 52 ms, faster than all other recent Python submissions (best was 56 ms, achieved by 5.7692%).\\n\\n---\\n\\n**Ruby**\\n\\n    def calculate_minimum_hp(dungeon)\\n        n = dungeon[0].size - 1\\n        need = [1/0.0] * n + [1]\\n        dungeon.reverse_each do |row|\\n            n.downto(0) do |j|\\n                need[j] = [need[j..j+1].min - row[j], 1].max\\n            end\\n        end\\n        need[0]\\n    end"
		},
		{
			"lc_ans_id":"52826",
			"view":"993",
			"top":"8",
			"title":"A very clean and intuitive solution (with explanation)",
			"vote":"10",
			"content":"**Dynamic Programming**\\nFirst, we need to define the subproblem somewhat a little clever. If we define: \\n*dp[i][j] = minimum cost from (0, 0) to (i, j)*\\nIt won't help solving the problem, because the result of dp[i + 1][j + 1] does not depends only on previous solve subproblems, but also future unsolved subproblems. So, how about let's define the subproblem from the other end of the puzzle?\\n***dp[i][j] = minimum health level required to reach the princess when entering (i, j)***\\n\\nSo, what is dp[i + 1][j + 1] then? It depends on the minimum between dp[i][j + 1] and dp[i + 1][j], because we want to choose the cheapest way to go. Of course we also need to add or deduct the value from dungeon matrix. But be careful, if we find that the minimum required health level is less that 0, we need to set it to 0, because we are not allowed to overdraft health. With that said:\\n***dp[i + 1][j + 1] = max(min(dp[i][j + 1], dp[i + 1][j]) - dungeon[i + 1][j + 1], 0);***\\n\\n**Implementation**\\nTo get the code cleaner, I created the dp matrix 1 row and 1 column bigger that the original input. But we need to be careful when initializing the extra row and column, everything is initialized to Infinite except cell (m, n - 1) and (m - 1, n), which should be initialized to 0.\\nI attached a picture to illustrate the idea (based on the test case given in the problem statement). Then code becomes very readable.\\n\\n![0_1470070141386_dungeon.png](/uploads/files/1470070031420-dungeon.png) \\n\\n\\n```\\npublic class Solution {\\n    public int calculateMinimumHP(int[][] dungeon) {\\n\\t\\tint m = dungeon.length;\\n\\t\\tint n = m == 0 ? 0 : dungeon[0].length;\\n\\t\\tint[][] minRequred = new int[m + 1][n + 1];\\n\\n\\t\\tfor (int i = 0; i < m + 1; i++) {\\n\\t\\t\\tminRequred[i][n] = Integer.MAX_VALUE;\\n\\t\\t}\\n\\t\\tfor (int j = 0; j < n + 1; j++) {\\n\\t\\t\\tminRequred[m][j] = Integer.MAX_VALUE;\\n\\t\\t}\\n\\t\\tminRequred[m][n - 1] = 0;\\n\\t\\tminRequred[m - 1][n] = 0;\\n\\t\\t\\n                for (int i = m - 1; i >= 0; i--) {\\n\\t\\t\\tfor (int j = n - 1; j >= 0; j--) {\\n\\t\\t\\t\\tminRequred[i][j] = Math.max(\\n\\t\\t\\t\\t\\t\\tMath.min(minRequred[i + 1][j], minRequred[i][j + 1]) - dungeon[i][j], 0);\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\treturn minRequred[0][0] + 1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"52784",
			"view":"2423",
			"top":"9",
			"title":"Who can explain why \\u201cfrom the bottom right corner to left top.\\u201d",
			"vote":"8",
			"content":"Why we fill the table from the bottom right corner to left top?"
		}
	],
	"id":"174",
	"title":"Dungeon Game",
	"content":"<style>\r\ntable.dungeon, .dungeon th, .dungeon td {\r\n  border:3px solid black;\r\n}\r\n\r\n .dungeon th, .dungeon td {\r\n    text-align: center;\r\n    height: 70px;\r\n    width: 70px;\r\n}\r\n</style>\r\n\r\n<p>The demons had captured the princess (<b>P</b>) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (<b>K</b>) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess. </p>\r\n<p>The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately. </p>\r\n<p>Some of the rooms are guarded by demons, so the knight loses health (<i>negative</i> integers) upon entering these rooms; \r\nother rooms are either empty (<i>0's</i>) or contain magic orbs that increase the knight's health (<i>positive</i> integers).</p>\r\n<p>In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step. </p>\r\n\r\n<br>\r\n<p><b>Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.</b></p>\r\n<p>For example, given the dungeon below, the initial health of the knight must be at least <b>7</b> if he follows the optimal path <code>RIGHT-> RIGHT -> DOWN -> DOWN</code>.</p>\r\n\r\n<table class=\"dungeon\">\r\n<tr> \r\n<td>-2 (K)</td> \r\n<td>-3</td> \r\n<td>3</td> \r\n</tr> \r\n<tr> \r\n<td>-5</td> \r\n<td>-10</td> \r\n<td>1</td> \r\n</tr> \r\n<tr> \r\n<td>10</td> \r\n<td>30</td> \r\n<td>-5 (P)</td> \r\n</tr> \r\n</table>\r\n<!---2K   -3  3\r\n-5   -10   1\r\n10 30   5P-->\r\n\r\n<br>\r\n<p><b>Notes:</b>\r\n<ul>\r\n<li>The knight's health has no upper bound.</li>\r\n<li>Any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.  </li>\r\n</ul>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/stellari\">@stellari</a> for adding this problem and creating all test cases.</p>",
	"frequency":"305",
	"ac_num":"46409"
}