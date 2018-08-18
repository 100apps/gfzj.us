{
	"difficulty":"3",
	"submit_num":"127575",
	"show_id":"329",
	"leetcode_id":"329",
	"answers":[
		{
			"lc_ans_id":"78308",
			"view":"26599",
			"top":"0",
			"title":"15ms Concise Java Solution",
			"vote":"153",
			"content":"To get max length of increasing sequences:\\n\\n 1. Do `DFS` from every cell\\n 2. Compare every 4 direction and skip cells that are out of boundary or smaller\\n 3. Get matrix `max` from every cell's `max`\\n 4. Use `matrix[x][y] <= matrix[i][j]` so we don't need a `visited[m][n]` array\\n 4. The key is to `cache` the distance because it's highly possible to revisit a cell\\n\\nHope it helps!\\n\\n    public static final int[][] dirs = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};\\n    \\n    public int longestIncreasingPath(int[][] matrix) {\\n        if(matrix.length == 0) return 0;\\n        int m = matrix.length, n = matrix[0].length;\\n        int[][] cache = new int[m][n];\\n        int max = 1;\\n        for(int i = 0; i < m; i++) {\\n            for(int j = 0; j < n; j++) {\\n                int len = dfs(matrix, i, j, m, n, cache);\\n                max = Math.max(max, len);\\n            }\\n        }   \\n        return max;\\n    }\\n    \\n    public int dfs(int[][] matrix, int i, int j, int m, int n, int[][] cache) {\\n        if(cache[i][j] != 0) return cache[i][j];\\n        int max = 1;\\n        for(int[] dir: dirs) {\\n            int x = i + dir[0], y = j + dir[1];\\n            if(x < 0 || x >= m || y < 0 || y >= n || matrix[x][y] <= matrix[i][j]) continue;\\n            int len = 1 + dfs(matrix, x, y, m, n, cache);\\n            max = Math.max(max, len);\\n        }\\n        cache[i][j] = max;\\n        return max;\\n    }"
		},
		{
			"lc_ans_id":"78334",
			"view":"6011",
			"top":"1",
			"title":"Python solution, memoization dp, 288ms",
			"vote":"33",
			"content":"We can find longest decreasing path instead, the result will be the same. Use `dp` to record previous results and choose the max `dp` value of smaller neighbors.\\n\\n    def longestIncreasingPath(self, matrix):\\n        def dfs(i, j):\\n            if not dp[i][j]:\\n                val = matrix[i][j]\\n                dp[i][j] = 1 + max(\\n                    dfs(i - 1, j) if i and val > matrix[i - 1][j] else 0,\\n                    dfs(i + 1, j) if i < M - 1 and val > matrix[i + 1][j] else 0,\\n                    dfs(i, j - 1) if j and val > matrix[i][j - 1] else 0,\\n                    dfs(i, j + 1) if j < N - 1 and val > matrix[i][j + 1] else 0)\\n            return dp[i][j]\\n\\n        if not matrix or not matrix[0]: return 0\\n        M, N = len(matrix), len(matrix[0])\\n        dp = [[0] * N for i in range(M)]\\n        return max(dfs(x, y) for x in range(M) for y in range(N))"
		},
		{
			"lc_ans_id":"78313",
			"view":"9643",
			"top":"2",
			"title":"Java 14ms relative short & easy to code solution with explanation. O(mn) time O(mn) space. DFS + DP",
			"vote":"30",
			"content":"The idea is simple and intuitive:  \\n    1. For each cell, try it's left, right, up and down for smaller number.  \\n    2. If it's smaller, means we are on the right track and we should keep going. If larger, stop and return.  \\n    3. Treat each cell as a start cell. Calculate and memorize the longest distance for this cell, so we don't need to calculate it again in the future.  \\n\\nQuestions and advices are welcome.\\n\\n    public class Solution {\\n        public int longestIncreasingPath(int[][] matrix) {\\n            if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {\\n                return 0;\\n            }\\n            int[][] cache = new int[matrix.length][matrix[0].length];\\n            int max = 0;\\n            for (int i = 0; i < matrix.length; i++) {\\n                for (int j = 0; j < matrix[0].length; j++) {\\n                    int length = findSmallAround(i, j, matrix, cache, Integer.MAX_VALUE);\\n                    max = Math.max(length, max);\\n                }\\n            }\\n            return max;\\n        }\\n        private int findSmallAround(int i, int j, int[][] matrix, int[][] cache, int pre) {\\n            // if out of bond OR current cell value larger than previous cell value.\\n            if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[0].length || matrix[i][j] >= pre) {\\n                return 0;\\n            }\\n            // if calculated before, no need to do it again\\n            if (cache[i][j] > 0) {\\n                return cache[i][j];\\n            } else {\\n                int cur = matrix[i][j];\\n                int tempMax = 0;\\n                tempMax = Math.max(findSmallAround(i - 1, j, matrix, cache, cur), tempMax);\\n                tempMax = Math.max(findSmallAround(i + 1, j, matrix, cache, cur), tempMax);\\n                tempMax = Math.max(findSmallAround(i, j - 1, matrix, cache, cur), tempMax);\\n                tempMax = Math.max(findSmallAround(i, j + 1, matrix, cache, cur), tempMax);\\n                cache[i][j] = ++tempMax;\\n                return tempMax;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"78336",
			"view":"5515",
			"top":"3",
			"title":"Graph theory, Java solution, O(v^2), no DFS",
			"vote":"25",
			"content":"Treat matrix as a graph. Then we find the longest path in graph. In this way, it can be solved in polynomial time. I drew a picture in my blog, check my [blog][1]\\n\\n    public static class Point{\\n        int x;\\n        int y;\\n        public Point(int x, int y) {\\n            this.x = x;\\n            this.y = y;\\n        }\\n    }\\n\\n    public static int longestIncreasingPath(int[][] matrix) {\\n        if (matrix == null || matrix.length == 0 || matrix[0] == null || matrix[0].length == 0)\\n            return 0;\\n        int n = matrix.length, m = matrix[0].length, count = m * n, ans = 0;\\n        while (count > 0) {\\n            HashSet<Point> remove = new HashSet<Point>();\\n            // each round, remove the peak number.\\n            for (int i = 0; i < n; i++) {\\n                for (int j = 0; j < m; j++) {\\n                    if (matrix[i][j] == Integer.MIN_VALUE)\\n                        continue;\\n                    boolean up = (i == 0 || matrix[i][j] >= matrix[i - 1][j]);\\n                    boolean bottom = (i == n - 1 || matrix[i][j] >= matrix[i + 1][j]);\\n                    boolean left = (j == 0 || matrix[i][j] >= matrix[i][j - 1]);\\n                    boolean right = (j == m - 1 || matrix[i][j] >= matrix[i][j + 1]);\\n                    if (up && bottom && left && right)\\n                        remove.add(new Point(i, j));\\n                }\\n            }\\n            for (Point point : remove) {\\n                matrix[point.x][point.y] = Integer.MIN_VALUE;\\n                count--;\\n            }\\n            ans++;\\n        }\\n        return ans;\\n    }\\n\\n  [1]: http://www.allenlipeng47.com/blog/index.php/2016/01/22/longest-increasing-path-in-a-matrix/"
		},
		{
			"lc_ans_id":"78317",
			"view":"5677",
			"top":"4",
			"title":"C++ DP / DFS solution sharing",
			"vote":"16",
			"content":"    class Solution {\\n    public:\\n        int longestIncreasingPath(vector<vector<int>>& matrix) {\\n            int rows = matrix.size();\\n            if (!rows) return 0;\\n            int cols = matrix[0].size();\\n            \\n            vector<vector<int>> dp(rows, vector<int>(cols, 0));\\n            std::function<int(int, int)> dfs = [&] (int x, int y) {\\n                if (dp[x][y]) return dp[x][y];\\n                vector<vector<int>> dirs = {{-1, 0}, {1, 0}, {0, 1}, {0, -1}};\\n                for (auto &dir : dirs) {\\n                    int xx = x + dir[0], yy = y + dir[1];\\n                    if (xx < 0 || xx >= rows || yy < 0 || yy >= cols) continue;\\n                    if (matrix[xx][yy] <= matrix[x][y]) continue;\\n                    dp[x][y] = std::max(dp[x][y], dfs(xx, yy));\\n                }\\n                return ++dp[x][y];\\n            };\\n            \\n            int ret = 0;\\n            for (int i = 0; i < rows; ++i) {\\n                for (int j = 0; j < cols; ++j) {\\n                    ret = std::max(ret, dfs(i, j));\\n                }\\n            }\\n            \\n            return ret;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"78375",
			"view":"2988",
			"top":"5",
			"title":"Easy Java Solution!",
			"vote":"12",
			"content":"    public class Solution {\\n    \\n    \\tpublic int longestIncreasingPath(int[][] matrix) {\\n    \\n    \\t\\tif (matrix == null || matrix.length < 1 || matrix[0].length < 1)\\n    \\t\\t\\treturn 0;\\n    \\n    \\t\\tint max = 0, n = matrix.length, m = matrix[0].length;\\n    \\n    \\t\\t// create a cache matrix\\n    \\t\\tint[][] cache = new int[n][m];\\n    \\n    \\t\\t// dfs search on every element in matrix\\n    \\t\\tfor (int i = 0; i < n; i++) {\\n    \\t\\t\\tfor (int j = 0; j < m; j++) {\\n    \\t\\t\\t\\tmax = Math.max(dfs(matrix, Integer.MIN_VALUE, i, j, n, m, cache), max);\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\treturn max;\\n    \\t}\\n    \\n    \\tint dfs(int[][] matrix, int min, int i, int j, int n, int m, int[][] cache) {\\n    \\n    \\t\\t// check boundary limits\\n    \\t\\tif (i < 0 || j < 0 || i >= n || j >= m)\\n    \\t\\t\\treturn 0;\\n    \\n    \\t\\t// check min condition\\n    \\t\\tif (matrix[i][j] <= min)\\n    \\t\\t\\treturn 0;\\n    \\n    \\t\\t// check into cache\\n    \\t\\tif (cache[i][j] != 0)\\n    \\t\\t\\treturn cache[i][j];\\n    \\n    \\t\\t// update min\\n    \\t\\tmin = matrix[i][j];\\n    \\n    \\t\\t// run dfs in all four directions\\n    \\t\\tint a = dfs(matrix, min, i - 1, j, n, m, cache) + 1;\\n    \\t\\tint b = dfs(matrix, min, i + 1, j, n, m, cache) + 1;\\n    \\t\\tint c = dfs(matrix, min, i, j - 1, n, m, cache) + 1;\\n    \\t\\tint d = dfs(matrix, min, i, j + 1, n, m, cache) + 1;\\n    \\n    \\t\\t// find max and update cache\\n    \\t\\tint max = Math.max(a, Math.max(b, Math.max(c, d)));\\n    \\t\\tcache[i][j] = max;\\n    \\n    \\t\\treturn max;\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"78381",
			"view":"2777",
			"top":"6",
			"title":"Short Python...",
			"vote":"12",
			"content":"Solution 1\\n-\\n\\nBottom-up DP, about 480 ms.\\n\\n    def longestIncreasingPath(self, matrix):\\n        matrix = {i + j*1j: val\\n                  for i, row in enumerate(matrix)\\n                  for j, val in enumerate(row)}\\n        length = {}\\n        for z in sorted(matrix, key=matrix.get):\\n            length[z] = 1 + max([length[Z]\\n                                 for Z in z+1, z-1, z+1j, z-1j\\n                                 if Z in matrix and matrix[z] > matrix[Z]]\\n                                or [0])\\n        return max(length.values() or [0])\\n\\n---\\n\\nSolution 2\\n-\\n\\nTop-down DP, about 560 ms.\\n\\n    def longestIncreasingPath(self, matrix):\\n        def length(z):\\n            if z not in memo:\\n                memo[z] = 1 + max([length(Z)\\n                                   for Z in z+1, z-1, z+1j, z-1j\\n                                   if Z in matrix and matrix[z] > matrix[Z]]\\n                                  or [0])\\n            return memo[z]\\n        memo = {}\\n        matrix = {i + j*1j: val\\n                  for i, row in enumerate(matrix)\\n                  for j, val in enumerate(row)}\\n        return max(map(length, matrix) or [0])"
		},
		{
			"lc_ans_id":"78463",
			"view":"2550",
			"top":"7",
			"title":"Java DFS + DP Solution",
			"vote":"10",
			"content":"    public class Solution {\\n    int[][] dis = {{1,0},{-1,0},{0,1},{0,-1}};\\n    public int longestIncreasingPath(int[][] matrix) {\\n      if(matrix.length == 0 ){\\n            return 0;\\n      }\\n      int[][] state = new int[matrix.length][matrix[0].length];\\n      int res = 0;\\n      for(int i = 0; i < matrix.length; i++){\\n          for(int j = 0; j < matrix[0].length; j++){\\n             res = Math.max(res,dfs(i,j,matrix,state));\\n          }\\n      }\\n      return res;\\n    }\\n      public int dfs(int i, int j, int[][] matrix,int[][] state){\\n          if(state[i][j] > 0) return state[i][j];\\n          int max = 0;\\n          for(int m = 0; m < dis.length; m++){\\n              if(i + dis[m][0] >= 0 && i + dis[m][0] < matrix.length && j + dis[m][1] >= 0 && j + dis[m][1] < matrix[0].length && matrix[i+dis[m][0]][j+dis[m][1]] > matrix[i][j]){\\n                  max = Math.max(max,dfs(i + dis[m][0],j + dis[m][1],matrix,state));\\n              }\\n          }\\n          state[i][j] = 1 + max;\\n          return state[i][j];\\n          \\n      }\\n    \\n \\n}"
		},
		{
			"lc_ans_id":"78433",
			"view":"2667",
			"top":"8",
			"title":"My DP solution with Explanation, Search nearby using DFS. O(MN), Easy to read",
			"vote":"10",
			"content":"The question is just a 2 dimensional version of LIS. We can use brute force, but it is too costful. By storing the longest number of increasing subsequence starting from the node (i,j) in a 2d array, we can effectively prune many redundant recursive computations (although it's a dfs).  \\n\\n    int longestpath(vector<vector<int>>& matrix, vector<vector<int>>& states, int i, int j, int m, int n) {\\n        if(states[i][j] > 0)\\n            return states[i][j];\\n        \\n        int maxd = 0;\\n        \\n        if(j>0 && matrix[i][j-1] < matrix[i][j]) {\\n            int left = longestpath(matrix, states, i, j-1, m, n);\\n            maxd = max(maxd, left); \\n        }\\n        if(j<n-1 && matrix[i][j+1] < matrix[i][j]) {\\n            \\n            int right = longestpath(matrix, states, i, j+1, m, n);\\n            maxd = max(maxd, right);\\n        };\\n        if(i>0 && matrix[i-1][j] < matrix[i][j]) {\\n            int up = longestpath(matrix, states, i-1, j, m, n);\\n            maxd = max(maxd, up);\\n            \\n        };\\n        if(i<m-1 && matrix[i+1][j] < matrix[i][j]) {\\n            int down = longestpath(matrix, states, i+1, j, m, n);\\n            maxd = max(maxd, down);\\n        };\\n        \\n        states[i][j] = maxd + 1;\\n        return states[i][j];\\n        \\n    }\\n\\n    int longestIncreasingPath(vector<vector<int>>& matrix) {\\n        \\n        \\n        int m = matrix.size(); \\n        if (m == 0) return 0;\\n        int n = matrix[0].size();\\n        int res = 0;\\n        \\n        vector<vector<int>> states(m, vector<int>(n, 0));\\n        \\n        for(int i = 0; i < m; ++ i) {\\n            \\n            for(int j = 0; j < n; ++ j) {\\n             //each element\\n             \\n             res = max(res, longestpath(matrix, states, i, j, m, n));\\n\\n            }\\n            \\n        }\\n        \\n        return res;        \\n        \\n    }"
		},
		{
			"lc_ans_id":"78341",
			"view":"1669",
			"top":"9",
			"title":"Simple C++ solution",
			"vote":"9",
			"content":"    class Solution {\\n    public:\\n        int DFS(vector<vector<int>>& matrix, int y, int x, int val, vector<vector<int>>& hash)\\n        {\\n            if(y < 0 || y >= matrix.size() || x <0 || x >= matrix[0].size())\\n                return 0;\\n            if(matrix[y][x] > val)\\n            {\\n                if(hash[y][x] != 0) return hash[y][x]; //if this path has been searched\\n                int a = DFS(matrix, y, x+1,matrix[y][x], hash) + 1;\\n                int b = DFS(matrix, y, x-1,matrix[y][x], hash) + 1;\\n                int c = DFS(matrix, y+1, x,matrix[y][x], hash) + 1;\\n                int d = DFS(matrix, y-1, x,matrix[y][x], hash) + 1;\\n                hash[y][x] = max(a, max(b,max(c, d)));\\n                return hash[y][x];\\n            }\\n            return 0;\\n        }\\n        int longestIncreasingPath(vector<vector<int>>& matrix) {\\n            if(matrix.size() == 0) return 0;\\n            int Max = 0;\\n            vector<int> tem(matrix[0].size(),0);\\n            vector<vector<int>> hash(matrix.size(), tem);\\n            for(int i = 0; i< matrix.size(); i++)\\n                for(int j = 0; j < matrix[0].size(); j++)\\n                    Max = max(DFS(matrix, i, j, INT_MIN, hash), Max);\\n            return Max;\\n        }\\n    };"
		}
	],
	"id":"329",
	"title":"Longest Increasing Path in a Matrix",
	"content":"<p>Given an integer matrix, find the length of the longest increasing path.</p>\r\n\r\n<p>\r\nFrom each cell, you can either move to four directions: left, right, up or down. You may NOT move diagonally or move outside of the boundary (i.e. wrap-around is not allowed).</p>\r\n\r\n<p>\r\n<b>Example 1:</b>\r\n<pre>\r\nnums = [\r\n  [<font color=\"red\">9</font>,9,4],\r\n  [<font color=\"red\">6</font>,6,8],\r\n  [<font color=\"red\">2</font>,<font color=\"red\">1</font>,1]\r\n]\r\n</pre>\r\n</p>\r\n\r\n<p>\r\nReturn <code>4</code><br/>\r\n\r\nThe longest increasing path is <code>[1, 2, 6, 9]</code>.</p>\r\n\r\n<p>\r\n<b>Example 2:</b>\r\n<pre>\r\nnums = [\r\n  [<font color=\"red\">3</font>,<font color=\"red\">4</font>,<font color=\"red\">5</font>],\r\n  [3,2,<font color=\"red\">6</font>],\r\n  [2,2,1]\r\n]\r\n</pre>\r\n</p>\r\n\r\n<p>\r\nReturn <code>4</code><br/>\r\n\r\nThe longest increasing path is <code>[3, 4, 5, 6]</code>. Moving diagonally is not allowed.</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/dietpepsi\">@dietpepsi</a> for adding this problem and creating all test cases.</p>",
	"frequency":"309",
	"ac_num":"47438"
}