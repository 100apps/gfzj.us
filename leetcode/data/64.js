{
	"difficulty":"2",
	"submit_num":"341421",
	"show_id":"64",
	"leetcode_id":"64",
	"answers":[
		{
			"lc_ans_id":"23457",
			"view":"19661",
			"top":"0",
			"title":"10-lines 28ms O(n)-space DP solution in C++ with Explanations",
			"vote":"152",
			"content":"This is a typical DP problem. Suppose the minimum path sum of arriving at point `(i, j)` is `S[i][j]`, then the state equation is `S[i][j] = min(S[i - 1][j], S[i][j - 1]) + grid[i][j]`.\\n\\nWell, some boundary conditions need to be handled. The boundary conditions happen on the topmost row (`S[i - 1][j]` does not exist) and the leftmost column (`S[i][j - 1]` does not exist). Suppose `grid` is like `[1, 1, 1, 1]`, then the minimum sum to arrive at each point is simply an accumulation of previous points and the result is `[1, 2, 3, 4]`.\\n\\nNow we can write down the following (unoptimized) code.\\n\\n    class Solution {\\n    public:\\n        int minPathSum(vector<vector<int>>& grid) {\\n            int m = grid.size();\\n            int n = grid[0].size(); \\n            vector<vector<int> > sum(m, vector<int>(n, grid[0][0]));\\n            for (int i = 1; i < m; i++)\\n                sum[i][0] = sum[i - 1][0] + grid[i][0];\\n            for (int j = 1; j < n; j++)\\n                sum[0][j] = sum[0][j - 1] + grid[0][j];\\n            for (int i = 1; i < m; i++)\\n                for (int j = 1; j < n; j++)\\n                    sum[i][j]  = min(sum[i - 1][j], sum[i][j - 1]) + grid[i][j];\\n            return sum[m - 1][n - 1];\\n        }\\n    };\\n\\nAs can be seen, each time when we update `sum[i][j]`, we only need `sum[i - 1][j]` (at the current column) and `sum[i][j - 1]` (at the left column). So we need not maintain the full `m*n` matrix. Maintaining two columns is enough and now we have the following code.\\n\\n    class Solution {\\n    public:\\n        int minPathSum(vector<vector<int>>& grid) {\\n            int m = grid.size();\\n            int n = grid[0].size();\\n            vector<int> pre(m, grid[0][0]);\\n            vector<int> cur(m, 0);\\n            for (int i = 1; i < m; i++)\\n                pre[i] = pre[i - 1] + grid[i][0];\\n            for (int j = 1; j < n; j++) { \\n                cur[0] = pre[0] + grid[0][j]; \\n                for (int i = 1; i < m; i++)\\n                    cur[i] = min(cur[i - 1], pre[i]) + grid[i][j];\\n                swap(pre, cur); \\n            }\\n            return pre[m - 1];\\n        }\\n    };\\n\\nFurther inspecting the above code, it can be seen that maintaining `pre` is for recovering `pre[i]`, which is simply `cur[i]` before its update. So it is enough to use only one vector. Now the space is further optimized and the code also gets shorter.\\n\\n    class Solution {\\n    public:\\n        int minPathSum(vector<vector<int>>& grid) {\\n            int m = grid.size();\\n            int n = grid[0].size();\\n            vector<int> cur(m, grid[0][0]);\\n            for (int i = 1; i < m; i++)\\n                cur[i] = cur[i - 1] + grid[i][0]; \\n            for (int j = 1; j < n; j++) {\\n                cur[0] += grid[0][j]; \\n                for (int i = 1; i < m; i++)\\n                    cur[i] = min(cur[i - 1], cur[i]) + grid[i][j];\\n            }\\n            return cur[m - 1];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"23471",
			"view":"18258",
			"top":"1",
			"title":"My java solution using DP and no extra space",
			"vote":"73",
			"content":"\\tpublic int minPathSum(int[][] grid) {\\n\\t\\tint m = grid.length;// row\\n\\t\\tint n = grid[0].length; // column\\n\\t\\tfor (int i = 0; i < m; i++) {\\n\\t\\t\\tfor (int j = 0; j < n; j++) {\\n\\t\\t\\t\\tif (i == 0 && j != 0) {\\n\\t\\t\\t\\t\\tgrid[i][j] = grid[i][j] + grid[i][j - 1];\\n\\t\\t\\t\\t} else if (i != 0 && j == 0) {\\n\\t\\t\\t\\t\\tgrid[i][j] = grid[i][j] + grid[i - 1][j];\\n\\t\\t\\t\\t} else if (i == 0 && j == 0) {\\n\\t\\t\\t\\t\\tgrid[i][j] = grid[i][j];\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\tgrid[i][j] = Math.min(grid[i][j - 1], grid[i - 1][j])\\n\\t\\t\\t\\t\\t\\t\\t+ grid[i][j];\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\treturn grid[m - 1][n - 1];\\n\\t}"
		},
		{
			"lc_ans_id":"23477",
			"view":"7714",
			"top":"2",
			"title":"DP Solution, Linear space",
			"vote":"29",
			"content":"You can only reach a cell by going from its left or top neighbor.\\n\\n    class Solution {\\n    public:\\n        int minPathSum(vector<vector<int> > &grid) {\\n            if(!grid.size())return 0;\\n            const int rows=grid.size(),cols=grid[0].size();\\n            // r[i] == min path sum to previous row's column i.\\n            vector<int> r(cols,0);\\n            int i,j;\\n            r[0]=grid[0][0];\\n            for(j=1;j<cols;j++){\\n                r[j]=grid[0][j]+r[j-1];       \\n            }\\n            for(i=1;i<rows;i++){\\n                r[0]+=grid[i][0];\\n                for(j=1;j<cols;j++){\\n                    r[j]=min(r[j-1],r[j])+grid[i][j];\\n                }\\n            }\\n            return r[cols-1];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"23647",
			"view":"4372",
			"top":"3",
			"title":"My 8 lines simple solution",
			"vote":"18",
			"content":"    int m = grid.length, n = grid[0].length;\\n    for(int i = 0; i < m; i++){\\n    \\tfor(int j = 0; j < n; j++){\\n    \\tif(i == 0 && j != 0) grid[i][j] += grid[i][j-1];\\n    \\tif(i != 0 && j == 0) grid[i][j] += grid[i-1][j];\\n    \\tif (i != 0 && j != 0) grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);\\n    \\t}\\n    }\\n    return grid[m-1][n-1];"
		},
		{
			"lc_ans_id":"23466",
			"view":"3626",
			"top":"4",
			"title":"Simple python dp 70ms",
			"vote":"17",
			"content":"\\n\\n    def minPathSum(self, grid):\\n        m = len(grid)\\n        n = len(grid[0])\\n        for i in range(1, n):\\n            grid[0][i] += grid[0][i-1]\\n        for i in range(1, m):\\n            grid[i][0] += grid[i-1][0]\\n        for i in range(1, m):\\n            for j in range(1, n):\\n                grid[i][j] += min(grid[i-1][j], grid[i][j-1])\\n        return grid[-1][-1]"
		},
		{
			"lc_ans_id":"23589",
			"view":"6581",
			"top":"5",
			"title":"Minimum Path Sum ---------How can I reduce the memory.",
			"vote":"12",
			"content":"Here is the idea:\\n\\n 1. f[m][n] is a matrix store the min value of every location we can\\n    get.\\n 2. f[0][0] =grid[0][0], f[i][0]=f[i-1][0]+grid[i][0],\\n    f[0][j]=f[0][j-1]+grid[0][j]\\n 3. f[i][j]=min(f[i-1][j],f[i][j-1])+grid[i][j].\\n 4. at last return the f[m-1][n-1]\\n\\n----------\\n\\n\\n    class Solution {\\n            public:\\n                int minPathSum(vector<vector<int> > &grid) {\\n                    // IMPORTANT: Please reset any member data you declared, as\\n                    // the same Solution instance will be reused for each test case.\\n                    int m=grid.size();\\n                    int n=grid[0].size();\\n                    int** f;\\n                    f=new int*[m];\\n                    for(int i=0;i<m;i){\\n                        f[i]=new int[n];\\n                    }\\n                    f[0][0]=grid[0][0];\\n                    for(int i=1;i<m;i++){\\n                        f[i][0]=f[i-1][0]+grid[i][0];\\n                    }\\n                    for(int i=1;i<n;i++){\\n                        f[0][i]=f[0][i-1]+grid[0][i];\\n                    }\\n                    for(int i=1;i<m;i++){\\n                        for(int j=1;j<n;j++)\\n                            f[i][j]=min(f[i-1][j],f[i][j-1])+grid[i][j];\\n                    }\\n                    return f[m-1][n-1];\\n                }\\n                int min(int a,int b){\\n                    if(a>b)\\n                        return b;\\n                    else\\n                        return a;\\n                }\\n            };"
		},
		{
			"lc_ans_id":"23555",
			"view":"2083",
			"top":"6",
			"title":"AC Java DP solution v.s. TLE Dijstra solution",
			"vote":"11",
			"content":"When I looked at this question, the first thought was the Dijkstra solution, which is a very fast algorithm to calculate the shortest path. But this solution got TLE in this question, while DP solution worked fine.\\n\\nI will talk about the Dijkstra solution first, as it's the first though came into my mind, and there is already discussions on the DP solution. If you are not interested in the Dijkstra solution, you can jump to the latter part of this post, which is about the DP solution, which is accepted.\\n\\n**Dijkstra**\\nThe idea of Dijkstra algorithm is to divide the graph into 2 parts, visited and unvisited. \\nFor every node in the visited part has a *dist* value. Then we need to exam every edges across the visited part and the unvisited parts, which are edges that its start node is in the visited part, while its end node is in the unvisited part. What we are looking for is one edge, which has the minimum value of (dist(start node) + the edge's value). Then we put this node into the visited part and exam the edges again.\\n\\nFollowing is the code. It uses a Java Heap, PriorityQueue to keep track of the minimum (dist(start node) + the edge's value), but in this question, the edge value is in the node itself, which is the same for every edges ending to it, so actually the heap just keeps track of the mimimum dist(start node) of every unvisited nodes around the boarder between visited and unvisited.\\n\\n    public class Solution_dijkstra {\\n\\t\\n\\tclass PointComparator implements Comparator<int[]>{\\n    \\tint[][] dist;\\n    \\tpublic PointComparator(int[][] dist){\\n    \\t\\tthis.dist = dist;\\n    \\t}\\n    \\t@Override\\n    \\tpublic int compare(int[] o1, int[] o2) {\\n    \\t\\tint[] point1 = (int[])o1;\\n            int[] point2 = (int[])o2;\\n            return Integer.valueOf(dist[point1[0]][point1[1]])\\n                .compareTo(Integer.valueOf(dist[point2[0]][point2[1]]));\\n        }\\n    }\\n    \\t\\n    public int minPathSum(int[][] grid) {\\n        if(grid == null || grid.length == 0) return 0;\\n        int m = grid.length;\\n        int n = grid[0].length;\\n        \\n        boolean[][] visited = new boolean[m][n];\\n        int[][] dist = new int[m][n];\\n        \\n        for(int x = 0; x < m; x++){\\n            for(int y = 0; y < n; y++){\\n                dist[x][y] = Integer.MAX_VALUE;\\n            }\\n        }\\n        \\n        dist[0][0] = grid[0][0];\\n        \\n        PriorityQueue<int[]> pq = new PriorityQueue<int[]>( m*n, new PointComparator(dist));\\n        \\n        pq.add(new int[]{0, 0});\\n        \\n        while(!pq.isEmpty()){\\n            \\n            int[] point = pq.poll();\\n            int x = point[0];\\n            int y = point[1];\\n            int d = dist[x][y];\\n            \\n            if(x == n-1 && y == m-1){\\n                return d;\\n            }\\n            \\n            visited[x][y] = true;\\n            \\n            if((y+1 < n) && !visited[x][y+1]){\\n                dist[x][y+1] = min(\\n                    dist[x][y+1],\\n                    d + grid[x][y+1]);\\n                pq.add(new int[]{x, y+1});\\n            }\\n            \\n            if((x+1 < m ) && !visited[x+1][y]){\\n                dist[x+1][y] = min(\\n                    dist[x+1][y],\\n                    d + grid[x+1][y]);\\n                pq.add(new int[]{x+1, y});\\n            }\\n        }\\n        return 0;\\n        \\n    }\\n    \\n    private int min(int i1, int i2){\\n    \\treturn i1 < i2 ? i1 : i2;\\n    }\\n\\n\\n} \\n\\n\\nThis solution got LTE error, mostly because of the priority queue and doesn't consider the special condition here that it's a grid and directed, which means a node can only be accessed from it's left and upper nodes. Put all these into consideration, we have the DP solution. It's essentially formula is\\n\\ndist(node) = min( dist(upper node), dist(left node)) + node's value\\n\\n**DP**\\nhere is the code:\\n\\n    public class Solution_dp {\\n\\t\\n\\tprivate int getDist(int[][] dist, int x, int y){\\n\\t\\tif(x < 0 || y < 0){\\n\\t\\t\\treturn Integer.MAX_VALUE;\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn dist[x][y];\\t\\t\\n\\t}\\n\\t\\n\\tprivate int min(int i1, int i2){\\n\\t\\treturn i1 < i2 ? i1 : i2;\\n\\t}\\n\\t\\n\\t\\n\\tpublic int minPathSum(int[][] grid) {\\n\\n\\t\\tif(grid == null || grid.length == 0) return 0;\\n\\t\\t\\n\\t\\tint m = grid.length;\\n\\t\\tint n = grid[0].length;\\n\\t\\t\\n\\t\\tint[][] dist = new int[m][n];\\n\\t\\t\\n\\t\\t\\t\\t\\n\\t\\t\\n\\t\\tfor(int x = 0; x < m; x++){\\n\\t\\t\\tfor(int y = 0; y < n; y++){\\n\\t\\t\\t\\t\\n\\t\\t\\t\\tif(x == 0 && y == 0){\\n\\t\\t\\t\\t\\tdist[0][0] = grid[0][0];\\n\\t\\t\\t\\t}else{\\n\\t\\t\\t\\t\\tdist[x][y] = min(getDist(dist, x-1, y), getDist(dist, x, y-1))  + grid[x][y];\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\t\\t\\t\\n\\t\\t}\\n\\t\\n\\t\\treturn dist[m-1][n-1];\\n\\t\\t\\t\\t\\n\\t}\\n}"
		},
		{
			"lc_ans_id":"23678",
			"view":"967",
			"top":"7",
			"title":"C++  easy solution using dp.  space compexity : O(1)",
			"vote":"9",
			"content":"    class Solution {\\n    public:\\n        int minPathSum(vector<vector<int>>& a) {\\n            int m=a.size();\\n            if(m==0) return 0;\\n            int n= a[0].size();\\n            \\n            for(int i = 0 ; i<m; i++  ){\\n                for(int j=0; j<n ; j++){\\n                    int left= (j==0) ? INT_MAX : a[i][j-1];\\n                    int up = (i==0) ? INT_MAX : a[i-1][j];\\n                    if(i==0 && j==0) continue;\\n                    a[i][j] += min(left, up );\\n                }\\n            }\\n            return a[m-1][n-1];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"23613",
			"view":"844",
			"top":"8",
			"title":"Python solutions (O(m*n), O(n) space).",
			"vote":"8",
			"content":"        \\n    # O(m*n) space\\n    def minPathSum(self, grid):\\n        if not grid:\\n            return \\n        r, c = len(grid), len(grid[0])\\n        dp = [[0 for _ in xrange(c)] for _ in xrange(r)]\\n        dp[0][0] = grid[0][0]\\n        for i in xrange(1, r):\\n            dp[i][0] = dp[i-1][0] + grid[i][0]\\n        for i in xrange(1, c):\\n            dp[0][i] = dp[0][i-1] + grid[0][i]\\n        for i in xrange(1, len(grid)):\\n            for j in xrange(1, len(grid[0])):\\n                dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]\\n        return dp[-1][-1]\\n                \\n    # O(2*n) space\\n    def minPathSum2(self, grid):\\n        if not grid:\\n            return \\n        r, c = len(grid), len(grid[0])\\n        pre = cur = [0] * c\\n        pre[0] = grid[0][0] \\n        for i in xrange(1, c):\\n            pre[i] = pre[i-1] + grid[0][i]\\n        for i in xrange(1, r):\\n            cur[0] = pre[0] + grid[i][0]\\n            for j in xrange(1, c):\\n                cur[j] = min(cur[j-1], pre[j]) + grid[i][j]\\n            pre = cur\\n        return cur[-1]\\n        \\n    # O(n) space\\n    def minPathSum(self, grid):\\n        if not grid:\\n            return \\n        r, c = len(grid), len(grid[0])\\n        cur = [0] * c\\n        cur[0] = grid[0][0] \\n        for i in xrange(1, c):\\n            cur[i] = cur[i-1] + grid[0][i]\\n        for i in xrange(1, r):\\n            cur[0] += grid[i][0]\\n            for j in xrange(1, c):\\n                cur[j] = min(cur[j-1], cur[j]) + grid[i][j]\\n        return cur[-1]\\n    \\n    # change the grid itself  \\n    def minPathSum4(self, grid):\\n        if not grid:\\n            return \\n        r, c = len(grid), len(grid[0])\\n        for i in xrange(1, c):\\n            grid[0][i] += grid[0][i-1]\\n        for i in xrange(1, r):\\n            grid[i][0] += grid[i-1][0]\\n        for i in xrange(1, r):\\n            for j in xrange(1, c):\\n                grid[i][j] += min(grid[i-1][j], grid[i][j-1])\\n        return grid[-1][-1]"
		},
		{
			"lc_ans_id":"23617",
			"view":"768",
			"top":"9",
			"title":"C++ solution, beat 98.59%",
			"vote":"7",
			"content":"    int minPathSum(vector<vector<int>>& grid) {\\n        if(grid.empty())\\n            return 0;\\n        \\n        vector<int> res(grid[0].size(),INT_MAX);\\n        res[0] = 0;\\n        \\n        for(int i=0;i<grid.size();i++)\\n            for(int j=0;j<grid[0].size();j++)\\n                if(j > 0)\\n                    res[j] = min(res[j-1],res[j]) + grid[i][j];\\n                else\\n                    res[j] = res[j] + grid[i][j];\\n        \\n        return res[grid[0].size()-1];\\n    }"
		}
	],
	"id":"64",
	"title":"Minimum Path Sum",
	"content":"<p>Given a <i>m</i> x <i>n</i> grid filled with non-negative numbers, find a path from top left to bottom right which <i>minimizes</i> the sum of all numbers along its path.</p>\r\n\r\n<p><b>Note:</b> You can only move either down or right at any point in time.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n[[1,3,1],\r\n [1,5,1],\r\n [4,2,1]]\r\n</pre>\r\nGiven the above grid map, return <code>7</code>. Because the path 1&rarr;3&rarr;1&rarr;1&rarr;1 minimizes the sum.\r\n</p>",
	"frequency":"449",
	"ac_num":"136354"
}