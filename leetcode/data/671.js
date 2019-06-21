{
	"difficulty":"2",
	"submit_num":"12310",
	"show_id":"694",
	"leetcode_id":"694",
	"answers":[
		{
			"lc_ans_id":"108474",
			"view":"3386",
			"top":"0",
			"title":"[Java/C++] Clean Code",
			"vote":"14",
			"content":"**Java**\\n```\\nclass Solution {\\n    private static int[][] delta = { {0, 1}, {1, 0}, {0, -1}, {-1, 0} };\\n\\n    public int numDistinctIslands(int[][] grid) {\\n        int m = grid.length, n = grid[0].length;\\n        Set<List<List<Integer>>> islands = new HashSet<>();\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                List<List<Integer>> island = new ArrayList<>();\\n                if (dfs(i, j, i, j, grid, m, n, island))\\n                    islands.add(island);\\n            }\\n        }\\n        return islands.size();\\n    }\\n\\n    private boolean dfs(int i0, int j0, int i, int j, int[][] grid, int m, int n, List<List<Integer>> island) {\\n        if (i < 0 || m <= i || j < 0 || n <= j || grid[i][j] <= 0) return false;\\n        island.add(Arrays.asList(i - i0, j - j0));\\n        grid[i][j] *= -1;\\n        for (int d = 0; d < 4; d++) {\\n            dfs(i0, j0, i + delta[d][0], j + delta[d][1], grid, m, n, island);\\n        }\\n        return true;\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int numDistinctIslands(vector<vector<int>>& grid) {\\n        int m = grid.size(), n = grid[0].size();\\n        set<vector<vector<int>>> islands;\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                vector<vector<int>> island;\\n                if (dfs(i, j, i, j, grid, m, n, island))\\n                    islands.insert(island);\\n            }\\n        }\\n        return islands.size();\\n    }\\n\\nprivate:\\n    int delta[4][2] = { 0, 1, 1, 0, 0, -1, -1, 0};\\n\\n    bool dfs(int i0, int j0, int i, int j, vector<vector<int>>& grid, int m, int n, vector<vector<int>>& island) {\\n        if (i < 0 || m <= i || j < 0 || n <= j || grid[i][j] <= 0) return false;\\n        island.push_back({i - i0, j - j0});\\n        grid[i][j] *= -1;\\n        for (int d = 0; d < 4; d++) {\\n            dfs(i0, j0, i + delta[d][0], j + delta[d][1], grid, m, n, island);\\n        }\\n        return true;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108475",
			"view":"2108",
			"top":"1",
			"title":"Java very Elegant and concise DFS Solution(Beats 100%)",
			"vote":"9",
			"content":"```\\nclass Solution {\\n   \\n    int[][] dirs= new int[][]{{1,0},{0,1},{-1,0},{0,-1}};\\n    public int numDistinctIslands(int[][] grid) {\\n         Set<String> set= new HashSet<>();\\n        int res=0;\\n        \\n        for(int i=0;i<grid.length;i++){\\n            for(int j=0;j<grid[0].length;j++){\\n                if(grid[i][j]==1) {\\n                    StringBuilder sb= new StringBuilder();\\n                    helper(grid,i,j,0,0, sb);\\n                    String s=sb.toString();\\n                    if(!set.contains(s)){\\n                    res++;\\n                    set.add(s);\\n}\\n                }\\n            }\\n        }\\n            return res;\\n    }\\n    \\n    public  void helper(int[][] grid,int i,int j, int xpos, int ypos,StringBuilder sb){\\n        grid[i][j]=0;\\n        sb.append(xpos+\"\"+ypos);\\n        for(int[] dir : dirs){\\n            int x=i+dir[0];\\n            int y=j+dir[1];\\n            if(x<0 || y<0 || x>=grid.length || y>=grid[0].length || grid[x][y]==0) continue;\\n            helper(grid,x,y,xpos+dir[0],ypos+dir[1],sb);\\n        }\\n    }\\n}\\n```\\n\\n\\nUPDATE: We can use direction string instead of using number string in set.\\nBelow is @wavy  code using direction string.\\n\\n\\n```\\npublic int numDistinctIslands(int[][] grid) {\\n    Set<String> set = new HashSet<>();\\n    for(int i = 0; i < grid.length; i++) {\\n        for(int j = 0; j < grid[i].length; j++) {\\n            if(grid[i][j] != 0) {\\n                StringBuilder sb = new StringBuilder();\\n                dfs(grid, i, j, sb, \"o\"); // origin\\n                grid[i][j] = 0;\\n                set.add(sb.toString());\\n            }\\n        }\\n    }\\n    return set.size();\\n}\\nprivate void dfs(int[][] grid, int i, int j, StringBuilder sb, String dir) {\\n    if(i < 0 || i == grid.length || j < 0 || j == grid[i].length \\n       || grid[i][j] == 0) return;\\n    sb.append(dir);\\n    grid[i][j] = 0;\\n    dfs(grid, i-1, j, sb, \"u\");\\n    dfs(grid, i+1, j, sb, \"d\");\\n    dfs(grid, i, j-1, sb, \"l\");\\n    dfs(grid, i, j+1, sb, \"r\");\\n    sb.append(\"b\"); // back\\n}\\n```"
		},
		{
			"lc_ans_id":"108480",
			"view":"601",
			"top":"2",
			"title":"Simple Python 169ms",
			"vote":"5",
			"content":"This question is very similar to the [Max Area of Island](https://leetcode.com/problems/max-area-of-island/description/) question but here instead of counting the area for each island, we find out the shape of each island. \\n\\nThe shape of the island can be represented by taking the relative position of the connected cells from the leftmost cell on the top row of the island (the first cell of each island we will visit). For each island we visit, we are guaranteed to visit the top row's leftmost cell first if we iterate the matrix row by row, left to right direction. We will get the same order of cells for islands of the same shape if we perform the search in a consistent manner.\\n\\nHere are some examples of how to represent the shape of each island by using cell positions relative to the top left cell.\\n\\n```\\n# First coordinate is row difference, \\n# Second coordinate is column difference.\\n11 -> ((0, 1)) # One cell to the right\\n\\n11 -> ((0, 1), (1, 1)) # One cell to the right, one cell to the right and bottom\\n01\\n```\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def numDistinctIslands(self, grid):\\n        \"\"\"\\n        :type grid: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        island_shapes = set()\\n        rows, cols = len(grid), len(grid[0])\\n        def dfs(i, j, positions, rel_pos):\\n            grid[i][j] = -1\\n            for direction in ((0, 1), (1, 0), (-1, 0), (0, -1)):\\n                next_i, next_j = i + direction[0], j + direction[1]\\n                if (0 <= next_i < rows and 0 <= next_j < cols) and grid[next_i][next_j] == 1:\\n                    new_rel_pos = (rel_pos[0] + direction[0], rel_pos[1] + direction[1])\\n                    positions.append(new_rel_pos)\\n                    dfs(next_i, next_j, positions, new_rel_pos)\\n        for i in range(rows):\\n            for j in range(cols):\\n                if grid[i][j] == 1:\\n                    positions = []\\n                    dfs(i, j, positions, (0, 0))\\n                    island_shapes.add(tuple(positions))\\n        return len(island_shapes)\\n```"
		},
		{
			"lc_ans_id":"108508",
			"view":"266",
			"top":"3",
			"title":"Clean recursive C++ solution by creating unique string based on turn taken",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    // we need the depth to differentiate between [[1,0],[1,1],[1,0]] (dddr) and [1,0],[1,0],[1,1] (dddr) \\n    void colorIsland(vector<vector<int>>& grid, int i, int j, int color, string &x, int d) {\\n        if(!grid[i][j]) {\\n            return;\\n        }\\n        x += to_string(d);\\n        grid[i][j] = color;\\n        if(i < grid.size() - 1 && grid[i+1][j] == 1){\\n            x = x + \"d\";\\n            colorIsland(grid, i+1, j, color, x, d+1);\\n        }\\n        if(i > 0 && grid[i-1][j] == 1) {\\n            x = x + \"u\";\\n            colorIsland(grid, i-1, j, color, x, d+1);\\n        }\\n        if(j < grid[i].size() - 1 && grid[i][j+1] == 1){\\n            x = x + \"r\";\\n            colorIsland(grid, i, j+1, color, x, d+1);\\n        }\\n        if(j > 0 && grid[i][j-1] == 1) {\\n            x = x + \"l\";\\n            colorIsland(grid, i, j-1, color, x, d+1);\\n        }\\n    }\\n\\n    int numDistinctIslands(vector<vector<int>>& grid) {\\n        int count = 0;\\n        unordered_set<string> shape;\\n        for(int i=0; i<grid.size(); i++) {\\n            for(int j=0; j<grid[i].size(); j++) {\\n                if(grid[i][j] == 1) {\\n                    string x;\\n                    colorIsland(grid, i, j, 2, x, 0);\\n                    if(shape.find(x) == shape.end()) {\\n                        shape.insert(x);\\n                        count++;\\n                    }\\n                }\\n            }\\n        }\\n        return count;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108511",
			"view":"202",
			"top":"4",
			"title":"Simple Python Code using BFS and HashSet with Explanation",
			"vote":"1",
			"content":"  The test case:\\n  \\n   11000\\n   10000\\n   00110\\n   00100\\n\\n\\nThe first island:\\n11\\n1\\n`[(0,0), (0,1), (1,0)] - (0,0) = [(0,0), (0,1), (1,0)] `\\n\\nislands = set( '[(0,0), (0,1), (1,0)] ' )\\n\\nThe second island:(the same one)\\n`[(2,2), (2,3), (3,2)] - (2,2) = [(0,0), (0,1), (1,0)] `\\n`str(island) ` is already in the islands(hashSet).\\n\\n```\\n# Time: O(m*n) \\n# Space: O(m*n)\\n# 694. Number of Distinct Islands \\n\\nclass Solution(object):\\n    def numDistinctIslands(self, grid):\\n        \"\"\"\\n        :type grid: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        islands = set()  \\n        \\n        for i in range(len(grid)):\\n            for j in range(len(grid[i])):\\n                island = []\\n                front = [(i,j)]\\n                \\n                while front:\\n                    nxt = []\\n                    for x,y in front:\\n                        if 0 <= x < len(grid) and 0 <= y < len(grid[x]) and grid[x][y] == 1:\\n                            grid[x][y] = 0\\n                            island.append((x-i,y-j))  # minus the current (i,j) in the big for loop \\n                            for m,n in (x+1, y), (x-1,y), (x, y+1), (x, y-1):\\n                                nxt.append((m,n))\\n                    front = nxt \\n                \\n                if island and str(island) not in islands:\\n                    islands.add(str(island))\\n                    \\n        return len(islands)\\n```"
		},
		{
			"lc_ans_id":"108522",
			"view":"290",
			"top":"5",
			"title":"My BFS Solution in Java",
			"vote":"1",
			"content":"```\\npublic int numDistinctIslands(int[][] grid) {\\n    if(grid == null || grid.length == 0 || grid[0].length == 0) return 0;\\n    int m = grid.length, n = grid[0].length;\\n    boolean[][] visited = new boolean[m][n];\\n    Set<String> st = new HashSet<>();\\n    for(int i = 0; i < grid.length; i++) {\\n        for(int j = 0; j < grid[i].length; j++) {\\n            if(!visited[i][j] && grid[i][j] == 1) {\\n                String str = bfs(grid, visited, i, j);\\n                st.add(str);\\n            }\\n        }\\n    }\\n    return st.size();\\n}\\nint[][] moves = new int[][]{{0, 1}, {0, -1}, {1, 0}, {-1, 0}};\\nprivate String bfs(int[][] grid, boolean[][] visited, int row, int col) {\\n    Queue<int[]> q = new LinkedList<>();\\n    StringBuilder sb = new StringBuilder();\\n    q.add(new int[]{row, col});\\n    visited[row][col] = true;\\n    while(!q.isEmpty()) {\\n        int[] curCoor = q.poll();\\n        for(int i = 0; i < moves.length; i++) {\\n            int[] move = moves[i];\\n            int x = curCoor[0] + move[0];\\n            int y = curCoor[1] + move[1];\\n            if(isLegal(grid, x, y) && grid[x][y] == 1 && !visited[x][y]) {\\n                visited[x][y] = true;\\n                q.add(new int[]{x, y});\\n                sb.append(i);\\n            }\\n        }\\n        sb.append(',');\\n    }\\n    return sb.toString();\\n}\\nprivate boolean isLegal(int[][] grid, int row ,int col) {\\n    return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;\\n}\\n```"
		},
		{
			"lc_ans_id":"108486",
			"view":"501",
			"top":"6",
			"title":"Simple python solution using DFS and transformation",
			"vote":"1",
			"content":"\\nThe idea is to find the islands using dfs.\\nEach position in the matrix is encoded using the get_index() function that returns the 1-D equivalent of the\\nrow and column value. \\nFor every island, the co-ordinates are encoded using get_index() and sorted first. Then they are transformed to \\norigin 0, by subtracting the first element from every element of the array.\\nThe transformed island is encoded as a concatenated string and finally the islands are converted to set to eliminate duplicates\\n\\n\\n```\\nclass Solution:\\n    def numDistinctIslands(self, grid):\\n        results = [self.dfs(r, c, grid) for r in range(len(grid)) for c in range(len(grid[0]))]\\n        l = ['_'.join(map(str, self.transform(sorted(r)))) for r in results if len(r) != 0]\\n        return len(set(l))\\n\\n    def transform(self, l):\\n        first = l[0]\\n        return [x-first for x in l]\\n\\n    def dfs(self, r, c, grid):\\n        if not (0 <= r < len(grid) and (0 <= c < len(grid[0])) and grid[r][c]):\\n            return []\\n        grid[r][c] = 0\\n        return list(chain.from_iterable([self.dfs(r+x[0], c+x[1], grid) for x in [(0,1), (0,-1), (1, 0), (-1, 0)]])) + [self.get_index(r, c, grid)]\\n\\n    def get_index(self, r, c, grid):\\n        return r * len(grid[0]) + c\\n```"
		},
		{
			"lc_ans_id":"108473",
			"view":"8",
			"top":"7",
			"title":"Question about the time complexity when hashing long direction/offset strings",
			"vote":"0",
			"content":"It is true that generally, inserting into a hash set is O(1). However, in many of these solutions, people make long strings with the directions that they traversed the islands in or the coordinates with an offset, and then they put these strings in a hashset. Surely computing the hash code for such long strings is not really O(1), right? When we analyze the time complexity for this question, are we still allowed to assume O(1) given that the hashed strings can be so long?"
		},
		{
			"lc_ans_id":"108476",
			"view":"23",
			"top":"8",
			"title":"749 / 759 test cases passed , Help needed!!",
			"vote":"0",
			"content":"My basic idea is to use BFS+set in python to store the path the BFS explore, but now it can only passes 749/759, any advices will be welcomed\\n\\n```\\nfrom collections import deque\\nclass Solution(object):\\n    def dfs(self,grid,path,queue,myset):\\n        while len(queue)!=0:\\n            level=len(queue)\\n            while level!=0:\\n                cur=queue.popleft()\\n                level-=1\\n                x=cur[0]\\n                y=cur[1]\\n                step=cur[2]\\n                path.append(step)\\n                #try left,up,right,down\\n                if y-1>=0 and grid[x][y-1]==1:\\n                    grid[x][y-1]=0\\n                    queue.append((x,y-1,'L'))\\n                if x-1>=0 and grid[x-1][y]==1:\\n                    grid[x-1][y]=0\\n                    queue.append((x-1,y,'U'))\\n                if y+1<len(grid[0]) and grid[x][y+1]==1:\\n                    grid[x][y+1]=0\\n                    queue.append((x,y+1,'R'))\\n                if x+1<len(grid) and grid[x+1][y]==1:\\n                    grid[x+1][y]=0\\n                    queue.append((x+1,y,'D'))\\n            path.append('#')\\n        myset.add(''.join(path))\\n        \\n            \\n                        \\n            \\n            \\n        \\n    def numDistinctIslands(self, grid):\\n        \"\"\"\\n        :type grid: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        myset=set()\\n        for i in xrange(len(grid)):\\n            for j in xrange(len(grid[0])):\\n                if grid[i][j]==1:\\n                    grid[i][j]=0\\n                    self.dfs(grid,[],deque([(i,j,'N')]),myset)\\n        print myset\\n        return len(myset)\\n        \\n```"
		},
		{
			"lc_ans_id":"108477",
			"view":"38",
			"top":"9",
			"title":"Share my C++ DFS solution",
			"vote":"0",
			"content":"```\\nclass Solution {\\npublic:\\n    int numDistinctIslands(vector<vector<int>>& grid) {\\n        unordered_map<int, vector<vector<int>>>mp;\\n        int count = 0, m = grid.size(), n = grid[0].size();\\n        for(int i = 0; i < m; i++)\\n            for(int j = 0; j < n; j++)\\n                if(grid[i][j] == 1){\\n                    int area = 0;\\n                    DFS(grid, i, j, m, n, area);\\n                    bool equal = false;\\n                    for(auto x: mp[area]){\\n                        int S = 0;\\n                        vector<vector<int>>visited(m, vector<int>(n));\\n                        DFS(grid, i, j, x[0], x[1], m, n, S, visited);\\n                        if(S == area){ equal = true; break; }\\n                    }\\n                    if(!equal) count++, mp[area].push_back({i, j});\\n                }\\n        return count;\\n    }\\n    \\n    void DFS(vector<vector<int>>& grid, int r, int c, int m, int n, int& area){\\n        if(r < 0 || c < 0 || r == m || c == n || !grid[r][c] || grid[r][c] == 2) return;\\n        area++;\\n        grid[r][c] = 2;\\n        for(int i = 0; i < 4; i++) DFS(grid, r + d[i][0], c + d[i][1], m, n, area);\\n    }\\n    \\n    void DFS(vector<vector<int>>& grid, int r, int c, int R, int C, int m, int n, int& S, vector<vector<int>>& visited){\\n        if(r < 0 || c < 0 || R < 0 || C < 0 || r == m || R == m || c == n || C == n || visited[r][c]) return;\\n        if(!grid[r][c] && !grid[R][C] || grid[r][c] != grid[R][C]) return;\\n        S++;\\n        visited[r][c] = 1;\\n        for(int i = 0; i < 4; i++) DFS(grid, r + d[i][0], c + d[i][1], R + d[i][0], C + d[i][1], m, n, S, visited);\\n    }\\n\\nprivate:\\n    vector<vector<int>>d = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};\\n};\\n```"
		}
	],
	"id":"671",
	"title":"Number of Distinct Islands",
	"content":"<p>Given a non-empty 2D array <code>grid</code> of 0's and 1's, an <b>island</b> is a group of <code>1</code>'s (representing land) connected 4-directionally (horizontal or vertical.)  You may assume all four edges of the grid are surrounded by water.</p>\r\n\r\n<p>Count the number of <b>distinct</b> islands.  An island is considered to be the same as another if and only if one island can be translated (and not rotated or reflected) to equal the other.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n11000\r\n11000\r\n00011\r\n00011\r\n</pre>\r\nGiven the above grid map, return <code>1</code>.\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>11011\r\n10000\r\n00001\r\n11011</pre>\r\nGiven the above grid map, return <code>3</code>.<br /><br />\r\nNotice that:\r\n<pre>\r\n11\r\n1\r\n</pre>\r\nand\r\n<pre>\r\n 1\r\n11\r\n</pre>\r\nare considered different island shapes, because we do not consider reflection / rotation.\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe length of each dimension in the given <code>grid</code> does not exceed 50.\r\n</p>",
	"frequency":"43",
	"ac_num":"5598"
}