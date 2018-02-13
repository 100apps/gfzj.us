{
	"difficulty":"2",
	"submit_num":"92914",
	"show_id":"286",
	"leetcode_id":"286",
	"answers":[
		{
			"lc_ans_id":"72745",
			"view":"21364",
			"top":"0",
			"title":"Java BFS Solution-O(mn) Time",
			"vote":"146",
			"content":"Push all gates into queue first. Then for each gate update its neighbor cells and push them to the queue. \\n\\nRepeating above steps until there is nothing left in the queue.\\n\\n    public class Solution {\\n        public void wallsAndGates(int[][] rooms) {\\n            if (rooms.length == 0 || rooms[0].length == 0) return;\\n            Queue<int[]> queue = new LinkedList<>();\\n            for (int i = 0; i < rooms.length; i++) {\\n                for (int j = 0; j < rooms[0].length; j++) {\\n                    if (rooms[i][j] == 0) queue.add(new int[]{i, j});\\n                }\\n            }\\n            while (!queue.isEmpty()) {\\n                int[] top = queue.remove();\\n                int row = top[0], col = top[1];\\n                if (row > 0 && rooms[row - 1][col] == Integer.MAX_VALUE) {\\n                    rooms[row - 1][col] = rooms[row][col] + 1;\\n                    queue.add(new int[]{row - 1, col});\\n                }\\n                if (row < rooms.length - 1 && rooms[row + 1][col] == Integer.MAX_VALUE) {\\n                    rooms[row + 1][col] = rooms[row][col] + 1;\\n                    queue.add(new int[]{row + 1, col});\\n                }\\n                if (col > 0 && rooms[row][col - 1] == Integer.MAX_VALUE) {\\n                    rooms[row][col - 1] = rooms[row][col] + 1;\\n                    queue.add(new int[]{row, col - 1});\\n                }\\n                if (col < rooms[0].length - 1 && rooms[row][col + 1] == Integer.MAX_VALUE) {\\n                    rooms[row][col + 1] = rooms[row][col] + 1;\\n                    queue.add(new int[]{row, col + 1});\\n                }\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"72746",
			"view":"9242",
			"top":"1",
			"title":"My short java solution, very easy to understand",
			"vote":"105",
			"content":"    public void wallsAndGates(int[][] rooms) {\\n        for (int i = 0; i < rooms.length; i++)\\n            for (int j = 0; j < rooms[0].length; j++)\\n                if (rooms[i][j] == 0) dfs(rooms, i, j, 0);\\n    }\\n    \\n    private void dfs(int[][] rooms, int i, int j, int d) {\\n        if (i < 0 || i >= rooms.length || j < 0 || j >= rooms[0].length || rooms[i][j] < d) return;\\n        rooms[i][j] = d;\\n        dfs(rooms, i - 1, j, d + 1);\\n        dfs(rooms, i + 1, j, d + 1);\\n        dfs(rooms, i, j - 1, d + 1);\\n        dfs(rooms, i, j + 1, d + 1);\\n    }"
		},
		{
			"lc_ans_id":"72748",
			"view":"8737",
			"top":"2",
			"title":"Benchmarks of DFS and BFS",
			"vote":"93",
			"content":"Better view [here](http://algobox.org/walls-and-gates/)\\n### The Solutions\\n\\nThe Multi End BFS solution used is this\\n\\n    public static final int[] d = {0, 1, 0, -1, 0};\\n\\n    public void wallsAndGates(int[][] rooms) {\\n        if (rooms.length == 0) return;\\n        int m = rooms.length, n = rooms[0].length;\\n\\n        Deque<Integer> queue = new ArrayDeque<>();\\n        for (int i = 0; i < m; ++i)\\n            for (int j = 0; j < n; ++j)\\n                if (rooms[i][j] == 0) queue.offer(i * n + j); // Put gates in the queue\\n\\n        while (!queue.isEmpty()) {\\n            int x = queue.poll();\\n            int i = x / n, j = x % n;\\n            for (int k = 0; k < 4; ++k) {\\n                int p = i + d[k], q = j + d[k + 1]; // empty room\\n                if (0 <= p && p < m && 0 <= q && q < n && rooms[p][q] == Integer.MAX_VALUE) {\\n                    rooms[p][q] = rooms[i][j] + 1;\\n                    queue.offer(p * n + q);\\n                }\\n            }\\n        }\\n    }\\n\\nThe Naive BFS solution used is this\\n\\n    public static final int[] d = {0, 1, 0, -1, 0};\\n\\n    public void wallsAndGates(int[][] rooms) {\\n        if (rooms.length == 0) return;\\n        for (int i = 0; i < rooms.length; ++i)\\n            for (int j = 0; j < rooms[0].length; ++j)\\n                if (rooms[i][j] == 0) bfs(rooms, i, j);\\n    }\\n\\n    private void bfs(int[][] rooms, int i, int j) {\\n        int m = rooms.length, n = rooms[0].length;\\n        Deque<Integer> queue = new ArrayDeque<>();\\n        queue.offer(i * n + j); // Put gate in the queue\\n        while (!queue.isEmpty()) {\\n            int x = queue.poll();\\n            i = x / n; j = x % n;\\n            for (int k = 0; k < 4; ++k) {\\n                int p = i + d[k], q = j + d[k + 1];\\n                if (0 <= p && p < m && 0 <= q && q < n && rooms[p][q] > rooms[i][j] + 1) {\\n                    rooms[p][q] = rooms[i][j] + 1;\\n                    queue.offer(p * n + q);\\n                }\\n            }\\n        }\\n    }\\n\\nAnd the DFS solution used is this\\n\\n    private static int[] d = {0, 1, 0, -1, 0};\\n\\n    public void wallsAndGates(int[][] rooms) {\\n        for (int i = 0; i < rooms.length; i++)\\n            for (int j = 0; j < rooms[0].length; j++)\\n                if (rooms[i][j] == 0) dfs(rooms, i, j);\\n    }\\n\\n    public void dfs(int[][] rooms, int i, int j) {\\n        for (int k = 0; k < 4; ++k) {\\n            int p = i + d[k], q = j + d[k + 1];\\n            if (0<= p && p < rooms.length && 0<= q && q < rooms[0].length && rooms[p][q] > rooms[i][j] + 1) {\\n                rooms[p][q] = rooms[i][j] + 1;\\n                dfs(rooms, p, q);\\n            }\\n        }\\n    }\\n\\n\\n\\n## Some benchmark:\\n\\n### CASE 1: n by n matrix with all empty rooms except one gate at upper left corner.\\nThe case generator is like this:\\n\\n    public static int[][] generateSingleGate(int n) {\\n        int[][] rooms = new int[n][n];\\n        for (int i = 0; i < n; ++i)\\n            for (int j = 0; j < n; ++j)\\n                rooms[i][j] = Integer.MAX_VALUE;\\n        rooms[0][0] = 0;\\n        return rooms;\\n    }\\n\\nThe results are\\n\\n     n\\tMEBFS\\t\\tNaiveBFS\\tDFS\\n     10\\t0.161 ms\\t0.157 ms\\t0.715 ms\\n     20\\t0.848 ms\\t0.482 ms\\t3.913 ms  \\n     40\\t2.672 ms\\t1.009 ms\\t25.429 ms\\n     80\\t5.974 ms\\t3.879 ms\\t241.825 ms\\n    160\\t9.282 ms\\t9.687 ms\\tStackOverflowError\\n\\nFor this case due to the deep recursion, DFS is much slower than BFS. DFS is repeatedly updating the cell distance. Since there is only one gate in this case, NaiveBFS is expected to perform just like the MultiEndBFS.\\n\\n\\n### CASE 2: n by n matrix with a lot of gates.\\nThe case generator is like this\\n\\n    public static int[][] generateMassiveGates(int n) {\\n        int[][] rooms = new int[n][n];\\n        for (int i = 0; i < n; ++i)\\n            for (int j = 0; j < n; ++j)\\n                if (i % 2 != 0 || j % 2 != 0)\\n                    rooms[i][j] = Integer.MAX_VALUE;\\n        return rooms;\\n    }\\n\\n\\nThe results are:\\n\\n     n\\tMEBFS\\t\\tNaiveBFS\\tDFS\\n     10\\t0.244 ms\\t0.783 ms\\t0.471 ms\\n     20\\t0.611 ms\\t3.064 ms\\t1.941 ms\\n     40\\t1.616 ms\\t10.370 ms\\t7.248 ms\\n     80\\t6.220 ms\\t26.910 ms\\t68.338 ms\\n    160\\t12.291 ms\\t95.291 ms\\tstackoverflow/915.517 ms\\n\\t320 27.790 ms\\t435.643 ms\\tstackoverflow/12719.976 ms\\n    640\\t85.793 ms\\t3502.662 ms\\n\\nLike expected, the DFS is much slower, and it is again overflowed.\\nThe Naive BFS out performs DFS starting from n = 80.\\nIf we change the vm options to -Xss20m, DFS will run in 915 ms for n=160.\\nFitting the time vs n, I found that the MEBFS is O(n^2), NaiveBFS is O(n^3), DFS is O(n^4) for these cases.\\n\\n\\n### CASE 3: n by n matrix with a lot of gates but rooms are isolated by walls and gates\\n\\nThe case generator is this:\\n\\n    public static int[][] generateIsolateRooms(int n) {\\n        int[][] rooms = new int[n][n];\\n        for (int i = 0; i < n; ++i)\\n            for (int j = 0; j < n; ++j)\\n                if (i % 2 != 0 && j % 2 != 0)\\n                    rooms[i][j] = Integer.MAX_VALUE;\\n        return rooms;\\n    }\\n\\nThe results are\\n\\n     n\\tMEBFS\\t\\tNaiveBFS\\tDFS\\n     10\\t0.167 ms\\t0.268 ms\\t0.049 ms\\n     20\\t0.593 ms\\t0.865 ms\\t0.196 ms  \\n     40\\t2.073 ms\\t2.096 ms\\t1.117 ms\\n     80\\t7.347 ms\\t4.471 ms\\t2.598 ms\\n    160\\t7.223 ms\\t4.232 ms\\t2.730 ms\\n\\nOnly in this case DFS wins. Since rooms are isolated, there will be limited recalculation and very shallow recursion.\\nThe currently testcases in the OJ must somewhat in this catergory which results in a bias of DFS solutions.\\n\\n### Conclusions\\n\\nThe performances of MultiEnd is very stable and have time complexities of O(n^2) for a `n x n` square matrix.\\n\\nThe time complexity for NaiveBFS should be O(n^4) in the worst case. However is not shown in our tests.\\n\\nThe performance of recursive DFS is very unstable. It is much slower than BFS if the rooms are interconnected. It is only faster than BFS when small groups of rooms are isolated. In the worst case the time complexity is also O(n^4).\\n\\nThus, for this problem we should prefer BFS over DFS. And the best Solution is Multi End BFS.\\n\\nAnd I suggest admin to add more test cases to emphasize this preference."
		},
		{
			"lc_ans_id":"72793",
			"view":"4063",
			"top":"3",
			"title":"C++ BFS, clean solution with simple explanations",
			"vote":"23",
			"content":"    void wallsAndGates(vector<vector<int>>& rooms) {\\n        const int row = rooms.size();\\n        if (0 == row) return;\\n        const int col = rooms[0].size();\\n        queue<pair<int, int>> canReach;  // save all element reachable\\n        vector<pair<int, int>> dirs = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}}; // four directions for each reachable\\n        for(int i = 0; i < row; i++){\\n            for(int j = 0; j < col; j++){\\n                if(0 == rooms[i][j])\\n                    canReach.emplace(i, j);\\n            }\\n        }\\n        while(!canReach.empty()){\\n            int r = canReach.front().first, c = canReach.front().second;\\n            canReach.pop();\\n            for (auto dir : dirs) {\\n                int x = r + dir.first,  y = c + dir.second;\\n                // if x y out of range or it is obstasle, or has small distance aready\\n                if (x < 0 || y < 0 || x >= row || y >= col || rooms[x][y] <= rooms[r][c]+1) continue;\\n                rooms[x][y] = rooms[r][c] + 1;\\n                canReach.emplace(x, y);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"72753",
			"view":"3909",
			"top":"4",
			"title":"6 lines O(mn) Python BFS",
			"vote":"23",
			"content":"Some hacks, but whatever.\\n\\n    def wallsAndGates(self, rooms):\\n        q = [(i, j) for i, row in enumerate(rooms) for j, r in enumerate(row) if not r]\\n        for i, j in q:\\n            for I, J in (i+1, j), (i-1, j), (i, j+1), (i, j-1):\\n                if 0 <= I < len(rooms) and 0 <= J < len(rooms[0]) and rooms[I][J] > 2**30:\\n                    rooms[I][J] = rooms[i][j] + 1\\n                    q += (I, J),"
		},
		{
			"lc_ans_id":"72804",
			"view":"4389",
			"top":"5",
			"title":"Beautiful Java Solution 10 lines.",
			"vote":"19",
			"content":"    public class Solution {\\n    int[][] dir ={{0,1},{0,-1},{1,0},{-1,0}};\\n    public void wallsAndGates(int[][] rooms) {\\n        for(int i=0;i<rooms.length;i++){\\n            for(int j=0;j<rooms[0].length;j++){\\n                if(rooms[i][j]==0)\\n                    bfs(rooms,i,j);\\n            }\\n        }\\n    }\\n    public void bfs(int[][] rooms,int i,int j){\\n        for(int[] d:dir){\\n            if(i+d[0]>=0 && i+d[0]<rooms.length && j+d[1]>=0 && j+d[1]<rooms[0].length && rooms[i+d[0]][j+d[1]]>rooms[i][j]+1){\\n                rooms[i+d[0]][j+d[1]]=rooms[i][j]+1;\\n                bfs(rooms,i+d[0],j+d[1]);\\n            }\\n        }\\n    }\\n}"
		},
		{
			"lc_ans_id":"72758",
			"view":"3062",
			"top":"6",
			"title":"Java easiest DFS, quicker than BFS",
			"vote":"13",
			"content":"Start from gates `0`, use `dfs` to fill nearby rooms with distances, and return if `(i, j)` is out of boundary or has smaller `distance` filled.\\n\\n<hr>\\n<h3>Version 1:</h3>\\n<hr>\\n\\n    public void wallsAndGates(int[][] rooms) {\\n        for(int i = 0; i < rooms.length; i++) {\\n            for(int j = 0; j < rooms[0].length; j++) {\\n                if(rooms[i][j] == 0) dfs(rooms, i, j, 0);\\n            }\\n        }\\n    }\\n    \\n    public void dfs(int[][] rooms, int i, int j, int d) {\\n        if(i < 0 || i >= rooms.length || j < 0 || j >= rooms[0].length || rooms[i][j] < d) return;\\n        rooms[i][j] = d;\\n        dfs(rooms, i - 1, j, d + 1);\\n        dfs(rooms, i, j - 1, d + 1);\\n        dfs(rooms, i + 1, j, d + 1);\\n        dfs(rooms, i, j + 1, d + 1);\\n    }\\n\\n<hr>\\n<h3>Version 2:</h3>\\n<hr>\\n\\n    int[][] dirs = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};\\n    \\n    public void wallsAndGates(int[][] rooms) {\\n        for(int i = 0; i < rooms.length; i++) {\\n            for(int j = 0; j < rooms[0].length; j++) {\\n                if(rooms[i][j] == 0) {\\n                    dfs(rooms, i, j);\\n                }              \\n            }\\n        }\\n    }\\n    \\n    public void dfs(int[][] rooms, int i, int j) {\\n        for(int[] dir : dirs) {\\n            int x = i + dir[0], y = j + dir[1];\\n            if(x < 0 || x >= rooms.length || y < 0 || y >= rooms[0].length || rooms[x][y] <= rooms[i][j]) continue;\\n            rooms[x][y] = rooms[i][j] + 1;\\n            dfs(rooms, x, y);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"72799",
			"view":"916",
			"top":"7",
			"title":"My C++ solution - easy to understand!!",
			"vote":"9",
			"content":"    class Solution {\\n    public:\\n        void wallsAndGates(vector<vector<int>>& rooms) {\\n            if(rooms.size() == 0) {\\n                return;\\n            }\\n            for(int i = 0 ; i < rooms.size() ; ++i) {\\n                for(int j = 0 ; j < rooms[0].size() ; ++j) {\\n                    if(rooms[i][j] == 0) {\\n                        helper(rooms, i, j, 0);\\n                    }\\n                }\\n            }\\n        }\\n    private:\\n        void helper(vector<vector<int>>& rooms, int i, int j, int distance) {\\n            if(i < 0 || i == rooms.size() || j < 0 || j == rooms[0].size() || rooms[i][j] < distance) {\\n                return;\\n            }\\n            rooms[i][j] = distance;\\n            helper(rooms, i - 1, j, distance + 1);\\n            helper(rooms, i, j - 1, distance + 1);\\n            helper(rooms, i + 1, j, distance + 1);\\n            helper(rooms, i, j + 1, distance + 1);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"72779",
			"view":"1597",
			"top":"8",
			"title":"Java solution(beat 90.72%) very easy to understand",
			"vote":"7",
			"content":"    public class Solution {\\n    private void bfs(int[][] rooms, int i, int j, int distance) {\\n        if (i < 0 || i >= rooms.length || j < 0 ||  j >= rooms[0].length) {\\n            return ;\\n        }\\n        if (rooms[i][j] < distance) {\\n            return ;\\n        } else {\\n            rooms[i][j] = distance;\\n            bfs(rooms, i + 1, j, distance + 1);\\n            bfs(rooms, i - 1, j, distance + 1);\\n            bfs(rooms, i, j + 1, distance + 1);\\n            bfs(rooms, i, j - 1, distance + 1);\\n        }\\n    }\\n    public void wallsAndGates(int[][] rooms) {\\n        if (rooms == null || rooms.length == 0 || rooms[0].length == 0) {\\n            return ;\\n        }\\n        for (int i = 0; i < rooms.length; ++i) {\\n            for (int j = 0; j < rooms[0].length; ++j) {\\n                if (rooms[i][j] == 0) {\\n                    bfs(rooms, i, j, 0);\\n                }\\n            }\\n        }\\n    }\\n    }"
		},
		{
			"lc_ans_id":"72809",
			"view":"933",
			"top":"9",
			"title":"Little bit confused about the time complexity here",
			"vote":"7",
			"content":"I think the time complexity of BFS and DFS are almost the same at the worst case, if we take care of the base case in recursion, we return as long as the current step is smaller than the cumulative one. Time(BFS) = Time(DFS) + 4mn\\n\\nI am confused about the time complexity here, what is the TC of DFS here, is it O((mn)^2)? If this is the worst case than what about the TC of BFS? Could someone help?..."
		}
	],
	"id":"286",
	"title":"Walls and Gates",
	"content":"<p>\r\nYou are given a <i>m x n</i> 2D grid initialized with these three possible values.</p>\r\n\r\n<ol>\r\n<li><code>-1</code> - A wall or an obstacle.</li>\r\n<li><code>0</code> - A gate.</li>\r\n<li><code>INF</code> - Infinity means an empty room. We use the value <code>2<sup>31</sup> - 1 = 2147483647</code> to represent <code>INF</code> as you may assume that the distance to a gate is less than <code>2147483647</code>.</li>\r\n</ol>\r\n\r\n<p>\r\nFill each empty room with the distance to its <i>nearest</i> gate. If it is impossible to reach a gate, it should be filled with <code>INF</code>.</p>\r\n\r\n<p>\r\nFor example, given the 2D grid:<br>\r\n<pre>\r\nINF  -1  0  INF\r\nINF INF INF  -1\r\nINF  -1 INF  -1\r\n  0  -1 INF INF</pre>\r\n</p>\r\n\r\n<p>\r\nAfter running your function, the 2D grid should be:<br>\r\n<pre>\r\n  3  -1   0   1\r\n  2   2   1  -1\r\n  1  -1   2  -1\r\n  0  -1   3   4</pre>\r\n</p>",
	"frequency":"219",
	"ac_num":"41980"
}