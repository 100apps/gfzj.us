{
	"difficulty":"2",
	"submit_num":"390230",
	"show_id":"63",
	"leetcode_id":"63",
	"answers":[
		{
			"lc_ans_id":"23250",
			"view":"20865",
			"top":"0",
			"title":"Short JAVA solution",
			"vote":"124",
			"content":"    public int uniquePathsWithObstacles(int[][] obstacleGrid) {\\n        int width = obstacleGrid[0].length;\\n        int[] dp = new int[width];\\n        dp[0] = 1;\\n        for (int[] row : obstacleGrid) {\\n            for (int j = 0; j < width; j++) {\\n                if (row[j] == 1)\\n                    dp[j] = 0;\\n                else if (j > 0)\\n                    dp[j] += dp[j - 1];\\n            }\\n        }\\n        return dp[width - 1];\\n    }"
		},
		{
			"lc_ans_id":"23248",
			"view":"13821",
			"top":"1",
			"title":"My C++ Dp solution , very simple!",
			"vote":"60",
			"content":"just use dp to find the answer , if there is a obstacle at (i,j), then dp[i][j] = 0. \\ntime is O(n*m) , space is O(n*m) . \\nhere is my code:\\n\\n    class Solution {\\n    public:\\n        int uniquePathsWithObstacles(vector<vector<int> > &obstacleGrid) {\\n            int m = obstacleGrid.size() , n = obstacleGrid[0].size();\\n            vector<vector<int>> dp(m+1,vector<int>(n+1,0));\\n            dp[0][1] = 1;\\n            for(int i = 1 ; i <= m ; ++i)\\n                for(int j = 1 ; j <= n ; ++j)\\n                    if(!obstacleGrid[i-1][j-1])\\n                        dp[i][j] = dp[i-1][j]+dp[i][j-1];\\n            return dp[m][n];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"23252",
			"view":"7640",
			"top":"2",
			"title":"4ms O(n) DP Solution in C++ with Explanations",
			"vote":"42",
			"content":"Well, this problem is similar to **Unique Paths**. The introduction of obstacles only changes the boundary conditions and make some points unreachable (simply set to `0`).\\n\\nDenote the number of paths to arrive at point `(i, j)` to be `P[i][j]`, the state equation is `P[i][j] = P[i - 1][j] + P[i][j - 1]` if `obstacleGrid[i][j] != 1` and `0` otherwise. \\n\\nNow let's finish the boundary conditions. In the **Unique Paths** problem, we initialize `P[0][j] = 1, P[i][0] = 1` for all valid `i, j`. Now, due to obstacles, some boundary points are no longer reachable and need to be initialized to `0`. For example, if `obstacleGrid` is like `[0, 0, 1, 0, 0]`, then the last three points are not reachable and need to be initialized to be `0`. The result is `[1, 1, 0, 0, 0]`.\\n\\nNow we can write down the following (unoptimized) code. Note that we pad the `obstacleGrid` by `1` and initialize `dp[0][1] = 1` to unify the boundary cases. \\n\\n    class Solution {\\n    public:\\n        int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {\\n            int m = obstacleGrid.size(), n = obstacleGrid[0].size();\\n            vector<vector<int> > dp(m + 1, vector<int> (n + 1, 0));\\n            dp[0][1] = 1;\\n            for (int i = 1; i <= m; i++)\\n                for (int j = 1; j <= n; j++)\\n                    if (!obstacleGrid[i - 1][j - 1])\\n                        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\\n            return dp[m][n];\\n        } \\n    };\\n\\nWell, the code is accepted but it has some obvious redundancy. There are two major concerns:\\n\\n 1. Each time when we update `path[i][j]`, we only need `path[i  - 1][j]` (at the same column) and `path[i][j - 1]` (at the left column), so it is unnecessary to maintain the full `m*n` matrix. Maintaining two columns is enough.\\n 2. There are some cases that the loop can be terminated earlier. Suppose `obstacleGrid = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]`, then we can see that it is impossible to reach the bottom-right corner after updating the second column since the number of paths to reach each element in the second column is `0`.\\n\\nTaken these into considerations, we write down the following optimized code.\\n    \\n    class Solution {\\n    public: \\n        int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {\\n            int m = obstacleGrid.size();\\n            int n = obstacleGrid[0].size();\\n            vector<int> pre(m, 0);\\n            vector<int> cur(m, 0);\\n            for (int i = 0; i < m; i++) {\\n                if (!obstacleGrid[i][0])\\n                    pre[i] = 1;\\n                else break;\\n            }\\n            for (int j = 1; j < n; j++) {\\n                bool flag = false;\\n                if (!obstacleGrid[0][j]) {\\n                    cur[0] = pre[0];\\n                    if (cur[0]) flag = true; \\n                }\\n                else cur[0] = 0;\\n                for (int i = 1; i < m; i++) {\\n                    if (!obstacleGrid[i][j]) {\\n                        cur[i] = cur[i - 1] + pre[i];\\n                        if (cur[i]) flag = true;\\n                    }\\n                    else cur[i] = 0;\\n                }\\n                if (!flag) return 0;\\n                swap(pre, cur);\\n            }\\n            return pre[m - 1];\\n        }\\n    }; \\n\\nFurther inspecting the above code, keeping two vectors only serve for the purpose of recovering `pre[i]`, which is simply `cur[i]` before its update. So we can use only one vector and the space is further optimized.\\n\\n    class Solution {\\n    public:\\n        int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {\\n            int m = obstacleGrid.size();\\n            int n = obstacleGrid[0].size();\\n            vector<int> cur(m, 0);\\n            for (int i = 0; i < m; i++) {\\n                if (!obstacleGrid[i][0])\\n                    cur[i] = 1;\\n                else break;\\n            }\\n            for (int j = 1; j < n; j++) {\\n                bool flag = false;\\n                if (obstacleGrid[0][j])\\n                    cur[0] = 0;\\n                else flag = true;\\n                for (int i = 1; i < m; i++) {\\n                    if (!obstacleGrid[i][j]) {\\n                        cur[i] += cur[i - 1]; \\n                        if (cur[i]) flag = true;\\n                    }\\n                    else cur[i] = 0; \\n                }\\n                if (!flag) return 0;\\n            }\\n            return cur[m - 1];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"23291",
			"view":"9206",
			"top":"3",
			"title":"Java Solution using Dynamic Programming, O(1) space",
			"vote":"35",
			"content":"    public class Solution {\\n        public int uniquePathsWithObstacles(int[][] obstacleGrid) {\\n            \\n            //Empty case\\n            if(obstacleGrid.length == 0) return 0;\\n            \\n            int rows = obstacleGrid.length;\\n            int cols = obstacleGrid[0].length;\\n            \\n            for(int i = 0; i < rows; i++){\\n                for(int j = 0; j < cols; j++){\\n                    if(obstacleGrid[i][j] == 1)\\n                        obstacleGrid[i][j] = 0;\\n                    else if(i == 0 && j == 0)\\n                        obstacleGrid[i][j] = 1;\\n                    else if(i == 0)\\n                        obstacleGrid[i][j] = obstacleGrid[i][j - 1] * 1;// For row 0, if there are no paths to left cell, then its 0,else 1\\n                    else if(j == 0)\\n                        obstacleGrid[i][j] = obstacleGrid[i - 1][j] * 1;// For col 0, if there are no paths to upper cell, then its 0,else 1\\n                    else\\n                        obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1];\\n                }\\n            }\\n            \\n            return obstacleGrid[rows - 1][cols - 1];\\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"23436",
			"view":"3917",
			"top":"4",
			"title":"Easy Java solution, in-place, DP",
			"vote":"13",
			"content":"   \\nThe idea is simple, set all obstacles to be 0 while doing the DP. No extra space is used.\\n\\n     public class Solution {\\n            public int uniquePathsWithObstacles(int[][] obstacleGrid) {\\n                int m = obstacleGrid.length;\\n                int n = obstacleGrid[0].length;\\n        \\n                obstacleGrid[0][0]^=1;\\n                for(int i = 1;i<m;i++){\\n                    obstacleGrid[i][0]=(obstacleGrid[i][0]==1)? 0:obstacleGrid[i-1][0];\\n                }\\n                \\n                for(int j = 1;j<n;j++){\\n                    obstacleGrid[0][j] =(obstacleGrid[0][j]==1)? 0: obstacleGrid[0][j-1];\\n                }\\n                for(int i = 1;i<m;i++){\\n                    for(int j =1;j<n;j++){\\n                        obstacleGrid[i][j] =(obstacleGrid[i][j]==1)? 0: obstacleGrid[i-1][j]+obstacleGrid[i][j-1];\\n                    }\\n                }\\n                return obstacleGrid[m-1][n-1];\\n            }\\n        }"
		},
		{
			"lc_ans_id":"23273",
			"view":"2607",
			"top":"5",
			"title":"Accepted simple Python in-place solution",
			"vote":"8",
			"content":"As below. Any comments on how to make it shorter? Thx!\\n\\n    class Solution:\\n        # @param obstacleGrid, a list of lists of integers\\n        # @return an integer\\n        def uniquePathsWithObstacles(self, obstacleGrid):\\n            m = len(obstacleGrid)\\n            n = len(obstacleGrid[0])\\n            obstacleGrid[0][0] = 1 - obstacleGrid[0][0]\\n            \\n            for i in range(1, n):\\n                if not obstacleGrid[0][i]:\\n                    obstacleGrid[0][i] = obstacleGrid[0][i-1]\\n                else:\\n                    obstacleGrid[0][i] = 0\\n                    \\n            for i in range(1, m):\\n                if not obstacleGrid[i][0]:\\n                    obstacleGrid[i][0] = obstacleGrid[i-1][0]\\n                else:\\n                    obstacleGrid[i][0] = 0\\n                    \\n            for i in range(1, m):\\n                for j in range(1, n):\\n                    if not obstacleGrid[i][j]:\\n                        obstacleGrid[i][j] = obstacleGrid[i][j-1]+obstacleGrid[i-1][j]\\n                    else:\\n                        obstacleGrid[i][j] = 0\\n                        \\n            return obstacleGrid[-1][-1]"
		},
		{
			"lc_ans_id":"23430",
			"view":"1508",
			"top":"6",
			"title":"Bottom up iterative solution, O(mn), no extra space",
			"vote":"7",
			"content":"     public int uniquePathsWithObstacles(int[][] obstacleGrid) {\\n        int m = obstacleGrid.length;\\n        int n = obstacleGrid[0].length;\\n        \\n        for (int r = m - 1; r >= 0; r--) {\\n            for (int c = n - 1; c >= 0; c--) {\\n                if (obstacleGrid[r][c] == 1) obstacleGrid[r][c] = 0;\\n                else {\\n                    if (r == m - 1 && c == n - 1) obstacleGrid[r][c] = 1;\\n                    else if (r == m - 1) obstacleGrid[r][c] = obstacleGrid[r][c + 1];\\n                    else if (c == n - 1) obstacleGrid[r][c] = obstacleGrid[r + 1][c];\\n                    else obstacleGrid[r][c] = obstacleGrid[r][c + 1] + obstacleGrid[r + 1][c];\\n                }\\n            }\\n        }\\n        \\n        return obstacleGrid[0][0];\\n    }"
		},
		{
			"lc_ans_id":"23411",
			"view":"905",
			"top":"7",
			"title":"C++ O(MN) time, O(1) space (use obstacleGrid)",
			"vote":"6",
			"content":"use obstacleGrid to save result\\n\\n    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {\\n        int h = obstacleGrid.size();\\n        if(h == 0) return 0;\\n        int w = obstacleGrid[0].size();\\n        if(w == 0) return 0;\\n        if(obstacleGrid[0][0]) return 0;\\n        \\n        // first cell has 1 path\\n        obstacleGrid[0][0] = 1;\\n        \\n        // first row all are '1' until obstacle (from left only)\\n        for(int i=1; i<w; i++){\\n            obstacleGrid[0][i] = obstacleGrid[0][i] ? 0 : obstacleGrid[0][i-1];\\n        }\\n\\n        for(int j=1; j<h; j++){\\n            // first column is like first row (from top only)\\n            obstacleGrid[j][0] = obstacleGrid[j][0] ? 0 : obstacleGrid[j-1][0];\\n            \\n            // others are up+left\\n            for(int i=1; i<w; i++){\\n                obstacleGrid[j][i] = obstacleGrid[j][i] ? 0 : obstacleGrid[j-1][i] + obstacleGrid[j][i-1];\\n            }\\n        }\\n        \\n        return obstacleGrid[h-1][w-1];\\n    }"
		},
		{
			"lc_ans_id":"23373",
			"view":"961",
			"top":"8",
			"title":"Simple Java DP solution",
			"vote":"5",
			"content":"    public class Solution {\\n    public int uniquePathsWithObstacles(int[][] obstacleGrid) {\\n        int m = obstacleGrid.length;\\n        int n = obstacleGrid[0].length;\\n        int[][] s = new int[m][n];\\n        s[0][0] = obstacleGrid[0][0]==0 ? 1:0;\\n        if(s[0][0] == 0) return 0;\\n        for(int i=0;i<m;i++){\\n            for(int j=0;j<n;j++){\\n                if(obstacleGrid[i][j] == 1) s[i][j] = 0;\\n                else if(i==0){\\n                    if(j>0) s[i][j] = s[i][j-1];\\n                }\\n                else if(j==0){\\n                    if(i>0) s[i][j] = s[i-1][j];\\n                }\\n                else s[i][j] = s[i-1][j] + s[i][j-1];\\n            }\\n        }\\n        return s[m-1][n-1];\\n    }\\n}"
		},
		{
			"lc_ans_id":"23443",
			"view":"1125",
			"top":"9",
			"title":"Share my Java solution: O(m*n) time complexity, no extra space.",
			"vote":"5",
			"content":"Obviously, this is a DP problem.\\n\\nLet F(i,j) denotes the paths from top left to cell (i,j).\\n\\n\\nIf cell (i,j) has an obstacle, then F(i,j) = 0.\\nelse \\n\\n\\nfor j>0, F(0,j) = F(0,j-1)\\n   \\n\\nfor i>0, F(i,0) = F(i-1,0)\\n    \\n\\nfor i>0&&j>0, F(i,j) = F(i-1,j)+F(i,j-1)\\n\\nWe can take advantage of the obstacle array without using extra space.         \\n\\n        if(obstacleGrid==null||obstacleGrid.length==0)\\n        \\treturn 0;\\n\\n        for(int i=0;i<obstacleGrid.length;i++)\\n        \\tfor(int j=0;j<obstacleGrid[0].length;j++)\\n        \\t{\\n        \\t\\tif(i==0)\\n        \\t\\t{\\n        \\t\\t\\tif(j==0)\\n        \\t\\t\\t\\tobstacleGrid[0][0] = 1 - obstacleGrid[0][0];\\n        \\t\\t\\telse\\n        \\t\\t\\t\\tobstacleGrid[0][j] = obstacleGrid[0][j]==1?0:obstacleGrid[0][j-1];\\n        \\t\\t}\\n        \\t\\telse \\n        \\t\\t{\\n        \\t\\t\\tif(j==0)\\n        \\t\\t\\t\\tobstacleGrid[i][0] = obstacleGrid[i][0]==1?0:obstacleGrid[i-1][0];\\n        \\t\\t\\telse \\n        \\t\\t\\t\\tobstacleGrid[i][j] = obstacleGrid[i][j]==1?0:(obstacleGrid[i-1][j]+obstacleGrid[i][j-1]);\\n\\t\\t\\t\\t}\\n        \\t}\\n        return obstacleGrid[obstacleGrid.length-1][obstacleGrid[0].length-1];"
		}
	],
	"id":"63",
	"title":"Unique Paths II",
	"content":"<p>Follow up for \"Unique Paths\":</p>\r\n\r\n<p>Now consider if some obstacles are added to the grids. How many unique paths would there be?</p>\r\n\r\n<p>An obstacle and empty space is marked as <code>1</code> and <code>0</code> respectively in the grid.</p>\r\n\r\n<p>For example,<br />\r\n<p>There is one obstacle in the middle of a 3x3 grid as illustrated below.</p>\r\n<pre>\r\n[\r\n  [0,0,0],\r\n  [0,1,0],\r\n  [0,0,0]\r\n]\r\n</pre>\r\n<p>The total number of unique paths is <code>2</code>.</p>\r\n\r\n<p><b>Note:</b> <i>m</i> and <i>n</i> will be at most 100.</p>",
	"frequency":"225",
	"ac_num":"125181"
}