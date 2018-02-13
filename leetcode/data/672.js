{
	"difficulty":"1",
	"submit_num":"34013",
	"show_id":"695",
	"leetcode_id":"695",
	"answers":[
		{
			"lc_ans_id":"108533",
			"view":"5876",
			"top":"0",
			"title":"[Java/C++] Straightforward  dfs solution",
			"vote":"23",
			"content":"The idea is to count the area of each island using dfs. During the dfs, we set the value of each point in the island to ```0```. The time complexity is ```O(mn)```. \\n\\nJava version:\\n```\\n    public int maxAreaOfIsland(int[][] grid) {\\n        int max_area = 0;\\n        for(int i = 0; i < grid.length; i++)\\n            for(int j = 0; j < grid[0].length; j++)\\n                if(grid[i][j] == 1)max_area = Math.max(max_area, AreaOfIsland(grid, i, j));\\n        return max_area;\\n    }\\n    \\n    public int AreaOfIsland(int[][] grid, int i, int j){\\n        if( i >= 0 && i < grid.length && j >= 0 && j < grid[0].length && grid[i][j] == 1){\\n            grid[i][j] = 0;\\n            return 1 + AreaOfIsland(grid, i+1, j) + AreaOfIsland(grid, i-1, j) + AreaOfIsland(grid, i, j-1) + AreaOfIsland(grid, i, j+1);\\n        }\\n        return 0;\\n    }\\n```\\n\\nC++ version:\\n```\\n    int maxAreaOfIsland(vector<vector<int>>& grid) {\\n        int max_area = 0;\\n        for(int i = 0; i < grid.size(); i++)\\n            for(int j = 0; j < grid[0].size(); j++)\\n                if(grid[i][j] == 1)max_area = max(max_area, AreaOfIsland(grid, i, j));\\n        return max_area;\\n    }\\n    \\n    int AreaOfIsland(vector<vector<int>>& grid, int i, int j){\\n        if( i >= 0 && i < grid.size() && j >= 0 && j < grid[0].size() && grid[i][j] == 1){\\n            grid[i][j] = 0;\\n            return 1 + AreaOfIsland(grid, i+1, j) + AreaOfIsland(grid, i-1, j) + AreaOfIsland(grid, i, j-1) + AreaOfIsland(grid, i, j+1);\\n        }\\n        return 0;\\n    }\\n```"
		},
		{
			"lc_ans_id":"108541",
			"view":"1593",
			"top":"1",
			"title":"easy python",
			"vote":"8",
			"content":"```\\n    def maxAreaOfIsland(self, grid):\\n        m, n = len(grid), len(grid[0])\\n\\n        def dfs(i, j):\\n            if 0 <= i < m and 0 <= j < n and grid[i][j]:\\n                grid[i][j] = 0\\n                return 1 + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i + 1, j) + dfs(i, j - 1)\\n            return 0\\n\\n        areas = [dfs(i, j) for i in range(m) for j in range(n) if grid[i][j]]\\n        return max(areas) if areas else 0"
		},
		{
			"lc_ans_id":"108565",
			"view":"2289",
			"top":"2",
			"title":"4 lines",
			"vote":"6",
			"content":"    def maxAreaOfIsland(self, grid):\\n        grid = {i + j*1j: val for i, row in enumerate(grid) for j, val in enumerate(row)}\\n        def area(z):\\n            return grid.pop(z, 0) and 1 + sum(area(z + 1j**k) for k in range(4))\\n        return max(map(area, set(grid)))\\n\\nComplex numbers making things simple..."
		},
		{
			"lc_ans_id":"108529",
			"view":"2873",
			"top":"3",
			"title":"Very simple DFS Java solution",
			"vote":"6",
			"content":"```\\n    public int maxAreaOfIsland(int[][] grid) {\\n        if (grid == null || grid.length == 0) {\\n            return 0;\\n        }\\n        int m = grid.length;\\n        int n = grid[0].length;\\n        int max = 0;\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                if (grid[i][j] == 1) {\\n                    int area = dfs(grid, i, j, m, n, 0);\\n                    max = Math.max(area, max);\\n                }\\n            }\\n        }\\n        return max;\\n    }\\n\\n    int dfs(int[][] grid, int i, int j, int m, int n, int area) {\\n        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 0) {\\n            return area;\\n        }\\n        grid[i][j] = 0;\\n        area++;\\n        area = dfs(grid, i + 1, j, m, n, area);\\n        area = dfs(grid, i, j + 1, m, n, area);\\n        area = dfs(grid, i - 1, j, m, n, area);\\n        area = dfs(grid, i, j - 1, m, n, area);\\n        return area;\\n    }\\n```"
		},
		{
			"lc_ans_id":"108578",
			"view":"1481",
			"top":"4",
			"title":"C++, BFS/DFS, concise code",
			"vote":"5",
			"content":"The solution is to search each island. Remember marking grid[r][c] = 2 as visited.\\n\\nDFS\\n```\\nclass Solution {\\npublic:\\n    int maxAreaOfIsland(vector<vector<int>>& grid) {\\n        int m = grid.size(), n = grid[0].size(), ans = 0;\\n        for (int i = 0; i < m; i++) \\n            for (int j = 0; j < n; j++) \\n                if (grid[i][j] == 1) ans = max(ans, dfs(grid, i, j));\\n        return ans;\\n    }\\nprivate:\\n    int dfs(vector<vector<int>>& grid, int row, int col) {\\n        int m = grid.size(), n = grid[0].size(), area = 1;\\n        grid[row][col] = 2;\\n        vector<int> dir({-1,0,1,0,-1});\\n        for (int i = 0; i < 4; i++) {\\n            int r = row+dir[i], c = col+dir[i+1];\\n            if (r >= 0 && r < m && c >= 0 && c < n && grid[r][c] == 1) \\n                area += dfs(grid, r, c);\\n        }\\n        return area;\\n    }\\n};\\n```\\nBFS\\n```\\nclass Solution {\\npublic:\\n    int maxAreaOfIsland(vector<vector<int>>& grid) {\\n        int m = grid.size(), n = grid[0].size(), ans = 0;\\n        for (int i = 0; i < m; i++) \\n            for (int j = 0; j < n; j++) \\n                if (grid[i][j] == 1) ans = max(ans, area(grid, i, j));\\n        return ans;\\n    }\\nprivate:\\n    int area(vector<vector<int>>& grid, int row, int col) {\\n        int m = grid.size(), n = grid[0].size(), area = 1;\\n        queue<pair<int,int>> myq;\\n        myq.push({row, col});\\n        grid[row][col] = 2;\\n        vector<int> dir({-1,0,1,0,-1});\\n        while (!myq.empty()) {\\n            int z = myq.front().first, x = myq.front().second;\\n            myq.pop();\\n            for (int i = 0; i < 4; i++) {\\n                int r = z+dir[i], c = x+dir[i+1];\\n                if (r >= 0 && r < m && c >= 0 && c < n && grid[r][c] == 1) {\\n                    grid[r][c] = 2;\\n                    area++;\\n                    myq.push({r,c});\\n                }\\n            }\\n        }\\n        return area;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108580",
			"view":"734",
			"top":"5",
			"title":"[Java/C++] Clean Code",
			"vote":"3",
			"content":"**Java DFS**\\n```\\nclass Solution {\\n    public int maxAreaOfIsland(int[][] grid) {\\n        int m = grid.length, n = grid[0].length, maxarea = 0;\\n        for (int i = 0; i < m; i++)\\n            for (int j = 0; j < n; j++)\\n                maxarea = Math.max(maxarea, dfs(i, j, grid));\\n        return maxarea;\\n    }\\n\\n    private int dfs(int i, int j, int[][] grid) {\\n        return (i < 0 || grid.length <= i || j < 0 || grid[0].length <= j || grid[i][j] <= 0) ? 0\\n            : grid[i][j]-- + dfs(i, j+1, grid) + dfs(i+1, j, grid) + dfs(i, j-1, grid) + dfs(i-1, j, grid);\\n    }\\n}\\n```\\n**C++ DFS**\\n```\\nclass Solution {\\npublic:\\n    int maxAreaOfIsland(vector<vector<int>>& grid) {\\n        int m = grid.size(), n = grid[0].size(), maxarea = 0;\\n        for (int i = 0; i < m; i++)\\n            for (int j = 0; j < n; j++)\\n                maxarea = max(maxarea, dfs(i, j, grid));\\n        return maxarea;\\n    }\\n\\nprivate:\\n    int dfs(int i, int j, vector<vector<int>>& grid) {\\n        return (i < 0 || grid.size() <= i || j < 0 || grid[0].size() <= j || grid[i][j] <= 0) ? 0\\n            : grid[i][j]-- + dfs(i, j+1, grid) + dfs(i+1, j, grid) + dfs(i, j-1, grid) + dfs(i-1, j, grid);\\n    }\\n};\\n```\\n**C++ Lambda**\\n```\\nclass Solution {\\npublic:\\n    int maxAreaOfIsland(vector<vector<int>>& grid) {\\n        int m = grid.size(), n = grid[0].size(), maxarea = 0;\\n        auto valid = [&](int i, int j) { return 0 <= i && i < m && 0 <= j && j < n && grid[i][j]; };\\n        std::function<int(int, int)> dfs = [&](int i, int j){ return !valid(i, j) ? 0 : grid[i][j]-- + dfs(i, j+1) + dfs(i+1, j) + dfs(i, j-1) + dfs(i-1, j);};\\n        for (int i = 0; i < m; i++)\\n            for (int j = 0; j < n; j++)\\n                maxarea = max(maxarea, dfs(i, j));\\n        return maxarea;\\n    }\\n};\\n```\\nThis is very similar to https://leetcode.com/problems/number-of-islands\\n**Number Of Island**\\n```\\nclass Solution {\\npublic:\\n    int numIslands(vector<vector<char>>& b) {\\n        if (!b.size() || !b[0].size())  return 0;\\n        int m = b.size(), n = b[0].size(), islands = 0;\\n        for (int i = 0; i < m; i++)\\n            for (int j = 0; j < n; j++)\\n                islands += dfs(b, i, j) > 0;\\n        return islands;\\n    }\\n\\nprivate:\\n    int dfs(vector<vector<char>>& b, int i, int j) {\\n        return (i >= 0 && i < b.size() && j >= 0 && j < b[0].size() && b[i][j] == '1') ? b[i][j] = 'v', 1 + dfs(b, i - 1, j) + dfs(b, i + 1, j) + dfs(b, i, j - 1) + dfs(b, i, j + 1) : 0;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108537",
			"view":"695",
			"top":"6",
			"title":"Easy to Understand Python",
			"vote":"1",
			"content":"Perform DFS on each cell, mark each visited cells as -1 and increment a `size` variable as we traverse to valid neighbors.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def maxAreaOfIsland(self, grid):\\n        max_size = 0\\n        rows, cols = len(grid), len(grid[0])\\n        def dfs(i, j, size):\\n            if not (0 <= i < rows and 0 <= j < cols) or grid[i][j] in (-1, 0):\\n                return\\n            size[0] += 1\\n            grid[i][j] = -1\\n            for direction in ((0, 1), (1, 0), (-1, 0), (0, -1)):\\n                dfs(i + direction[0], j + direction[1], size)\\n        for i in range(rows):\\n            for j in range(cols):\\n                size = [0]\\n                dfs(i, j, size)\\n                max_size = max(max_size, size[0])\\n        return max_size\\n\\n```"
		},
		{
			"lc_ans_id":"108570",
			"view":"145",
			"top":"7",
			"title":"python solution, do changes in place",
			"vote":"1",
			"content":"change the value of the given grid in place, \\n```\\n    def maxAreaOfIsland(self, grid):\\n        m, n = len(grid), len(grid[0])\\n\\n        def dfs(i, j):\\n            if 0 <= i < m and 0 <= j < n and grid[i][j]:\\n                grid[i][j] = 0\\n                return 1 + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i + 1, j) + dfs(i, j - 1)\\n            return 0\\n\\n        result = 0\\n        for x in range(m):\\n            for y in range(n):\\n                if grid[x][y]:\\n                    result = max(result, dfs(x, y))\\n        return result"
		},
		{
			"lc_ans_id":"108575",
			"view":"274",
			"top":"8",
			"title":"My BFS solution in Java",
			"vote":"1",
			"content":"```\\npublic int maxAreaOfIsland(int[][] grid) {\\n    if(grid == null || grid.length == 0 || grid[0].length == 0) return 0;\\n    int m = grid.length, n = grid[0].length;\\n    boolean[][] visited = new boolean[m][n];\\n    int res = 0;\\n    for(int i = 0; i < grid.length; i++) {\\n        for(int j = 0; j < grid[i].length; j++) {\\n            if(!visited[i][j] && grid[i][j] == 1) res = Math.max(res, bfs(grid, visited, i, j));\\n        }\\n    }\\n    return res;\\n}\\n\\nint[][] moves = new int[][]{{0, 1}, {0, -1}, {1, 0}, {-1, 0}};\\nprivate int bfs(int[][] grid, boolean[][] visited, int row, int col) {\\n    Queue<int[]> q = new LinkedList<>();\\n    int res = 1;\\n    q.add(new int[]{row, col});\\n    visited[row][col] = true;\\n    while(!q.isEmpty()) {\\n        int[] curCoor = q.poll();\\n        for(int[] move : moves) {\\n            int i = curCoor[0] + move[0];\\n            int j = curCoor[1] + move[1];\\n            if(isLegal(grid, i, j) && grid[i][j] == 1 && !visited[i][j]) {\\n                visited[i][j] = true;\\n                res++;\\n                q.add(new int[]{i, j});\\n            }\\n        }\\n    }\\n    return res;\\n}\\nprivate boolean isLegal(int[][] grid, int row ,int col) {\\n    return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;\\n}\\n```"
		},
		{
			"lc_ans_id":"108524",
			"view":"8",
			"top":"9",
			"title":"C solution using region growing",
			"vote":"0",
			"content":"```\\nint** regionGrow(int** grid, int gridRowSize, int gridColSize, int i, int j, int tagRegion) {\\n    grid[i][j] = tagRegion;\\n    if (i-1 >= 0 && grid[i-1][j] == 1) {\\n        grid = regionGrow(grid, gridRowSize, gridColSize, i-1, j, tagRegion);\\n    }\\n    if (i+1 < gridRowSize && grid[i+1][j] == 1) {\\n        grid = regionGrow(grid, gridRowSize, gridColSize, i+1, j, tagRegion);\\n    }\\n    if (j-1 >= 0 && grid[i][j-1] == 1) {\\n        grid = regionGrow(grid, gridRowSize, gridColSize, i, j-1, tagRegion);\\n    }\\n    if (j+1 < gridColSize && grid[i][j+1] == 1) {\\n        grid = regionGrow(grid, gridRowSize, gridColSize, i, j+1, tagRegion);\\n    }\\n    return grid;\\n}\\n\\nint maxAreaOfIsland(int** grid, int gridRowSize, int gridColSize) {\\n    int i, j;\\n    int *area, max = 0;\\n    int tagRegion = 2;\\n\\n    for (i=0;i<gridRowSize;i++) {\\n        for (j=0;j<gridColSize;j++) {\\n            if (grid[i][j] == 1) {\\n                grid = regionGrow(grid, gridRowSize, gridColSize, i, j, tagRegion);\\n                tagRegion++;\\n            }\\n        }\\n    }\\n\\n    area = malloc(sizeof(int)*(tagRegion-2));\\n    \\n    for (i=0; i < tagRegion-2; i++) {\\n        area[i] = 0;\\n    }\\n    \\n    for (i=0;i<gridRowSize;i++) {\\n        for (j=0;j<gridColSize;j++) {\\n            if (grid[i][j] > 0) {\\n                area[grid[i][j] - 2] += 1;\\n            }\\n        }\\n    }\\n        \\n    for (i=0; i < tagRegion-2; i++) {\\n        if (area[i] > max) {\\n            max = area[i];\\n        }\\n    }\\n    \\n    free(area);\\n    \\n    return max;\\n}\\n```"
		}
	],
	"id":"672",
	"title":"Max Area of Island",
	"content":"<p><p>Given a non-empty 2D array <code>grid</code> of 0's and 1's, an <b>island</b> is a group of <code>1</code>'s (representing land) connected 4-directionally (horizontal or vertical.)  You may assume all four edges of the grid are surrounded by water.</p>\r\n<p>\r\nFind the maximum area of an island in the given 2D array.\r\n(If there is no island, the maximum area is 0.)\r\n</p>\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n[[0,0,1,0,0,0,0,1,0,0,0,0,0],\r\n [0,0,0,0,0,0,0,1,1,1,0,0,0],\r\n [0,1,1,0,1,0,0,0,0,0,0,0,0],\r\n [0,1,0,0,1,1,0,0,<b>1</b>,0,<b>1</b>,0,0],\r\n [0,1,0,0,1,1,0,0,<b>1</b>,<b>1</b>,<b>1</b>,0,0],\r\n [0,0,0,0,0,0,0,0,0,0,<b>1</b>,0,0],\r\n [0,0,0,0,0,0,0,1,1,1,0,0,0],\r\n [0,0,0,0,0,0,0,1,1,0,0,0,0]]\r\n</pre>\r\nGiven the above grid, return <code>6</code>.\r\n\r\nNote the answer is not 11, because the island must be connected 4-directionally.\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>[[0,0,0,0,0,0,0,0]]</pre>\r\nGiven the above grid, return <code>0</code>.\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe length of each dimension in the given <code>grid</code> does not exceed 50.\r\n</p>",
	"frequency":"385",
	"ac_num":"17723"
}