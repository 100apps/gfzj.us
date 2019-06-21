{
	"difficulty":"2",
	"submit_num":"64109",
	"show_id":"417",
	"leetcode_id":"417",
	"answers":[
		{
			"lc_ans_id":"90733",
			"view":"19758",
			"top":"0",
			"title":"Java BFS & DFS from Ocean",
			"vote":"109",
			"content":"1. Two Queue and add all the Pacific border to one queue; Atlantic border to another queue.\\n2. Keep a visited matrix for each queue. In the end, add the cell visited by two queue to the result.\\nBFS: Water flood from ocean to the cell. Since water can only flow from high/equal cell to low cell, add the neighboor cell with height larger or equal to current cell to the queue and mark as visited.\\n```\\npublic class Solution {\\n    int[][]dir = new int[][]{{1,0},{-1,0},{0,1},{0,-1}};\\n    public List<int[]> pacificAtlantic(int[][] matrix) {\\n        List<int[]> res = new LinkedList<>();\\n        if(matrix == null || matrix.length == 0 || matrix[0].length == 0){\\n            return res;\\n        }\\n        int n = matrix.length, m = matrix[0].length;\\n        //One visited map for each ocean\\n        boolean[][] pacific = new boolean[n][m];\\n        boolean[][] atlantic = new boolean[n][m];\\n        Queue<int[]> pQueue = new LinkedList<>();\\n        Queue<int[]> aQueue = new LinkedList<>();\\n        for(int i=0; i<n; i++){ //Vertical border\\n            pQueue.offer(new int[]{i, 0});\\n            aQueue.offer(new int[]{i, m-1});\\n            pacific[i][0] = true;\\n            atlantic[i][m-1] = true;\\n        }\\n        for(int i=0; i<m; i++){ //Horizontal border\\n            pQueue.offer(new int[]{0, i});\\n            aQueue.offer(new int[]{n-1, i});\\n            pacific[0][i] = true;\\n            atlantic[n-1][i] = true;\\n        }\\n        bfs(matrix, pQueue, pacific);\\n        bfs(matrix, aQueue, atlantic);\\n        for(int i=0; i<n; i++){\\n            for(int j=0; j<m; j++){\\n                if(pacific[i][j] && atlantic[i][j])\\n                    res.add(new int[]{i,j});\\n            }\\n        }\\n        return res;\\n    }\\n    public void bfs(int[][]matrix, Queue<int[]> queue, boolean[][]visited){\\n        int n = matrix.length, m = matrix[0].length;\\n        while(!queue.isEmpty()){\\n            int[] cur = queue.poll();\\n            for(int[] d:dir){\\n                int x = cur[0]+d[0];\\n                int y = cur[1]+d[1];\\n                if(x<0 || x>=n || y<0 || y>=m || visited[x][y] || matrix[x][y] < matrix[cur[0]][cur[1]]){\\n                    continue;\\n                }\\n                visited[x][y] = true;\\n                queue.offer(new int[]{x, y});\\n            } \\n        }\\n    }\\n}\\n````\\nDFS version:\\n```\\npublic class Solution {\\n    public List<int[]> pacificAtlantic(int[][] matrix) {\\n        List<int[]> res = new LinkedList<>();\\n        if(matrix == null || matrix.length == 0 || matrix[0].length == 0){\\n            return res;\\n        }\\n        int n = matrix.length, m = matrix[0].length;\\n        boolean[][]pacific = new boolean[n][m];\\n        boolean[][]atlantic = new boolean[n][m];\\n        for(int i=0; i<n; i++){\\n            dfs(matrix, pacific, Integer.MIN_VALUE, i, 0);\\n            dfs(matrix, atlantic, Integer.MIN_VALUE, i, m-1);\\n        }\\n        for(int i=0; i<m; i++){\\n            dfs(matrix, pacific, Integer.MIN_VALUE, 0, i);\\n            dfs(matrix, atlantic, Integer.MIN_VALUE, n-1, i);\\n        }\\n        for (int i = 0; i < n; i++) \\n            for (int j = 0; j < m; j++) \\n                if (pacific[i][j] && atlantic[i][j]) \\n                    res.add(new int[] {i, j});\\n        return res;\\n    }\\n    \\n    int[][]dir = new int[][]{{0,1},{0,-1},{1,0},{-1,0}};\\n    \\n    public void dfs(int[][]matrix, boolean[][]visited, int height, int x, int y){\\n        int n = matrix.length, m = matrix[0].length;\\n        if(x<0 || x>=n || y<0 || y>=m || visited[x][y] || matrix[x][y] < height)\\n            return;\\n        visited[x][y] = true;\\n        for(int[]d:dir){\\n            dfs(matrix, visited, matrix[x][y], x+d[0], y+d[1]);\\n        }\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"90739",
			"view":"4689",
			"top":"1",
			"title":"Python DFS bests 85%. Tips for all DFS in matrix question.",
			"vote":"29",
			"content":"The DFS solution is straightforward. Starting from each point, and dfs its neighbor if the neighbor is equal or less than itself. And maintain two boolean matrix for two oceans, indicating an ocean can reach to that point or not. Finally go through all nodes again and see if it can be both reached by two oceans. The trick is if a node is already visited, no need to visited again. Otherwise it will reach the recursion limits.\\n\\nThis question is very similar to https://leetcode.com/problems/longest-increasing-path-in-a-matrix/ And here are some common tips for this kind of question\\n1. init a directions var like `self.directions = [(1,0),(-1,0),(0,1),(0,-1)]` so that when you want to explore from a node, you can just do \\n```\\nfor direction in self.directions:\\n            x, y = i + direction[0], j + direction[1]\\n```\\n\\n2. this is a what I normally do for a dfs helper method for exploring a matrix\\n```\\ndef dfs(self, i, j, matrix, visited, m, n):\\n  if visited: \\n    # return or return a value\\n  for dir in self.directions:\\n    x, y = i + direction[0], j + direction[1]\\n        if x < 0 or x >= m or y < 0 or y >= n or matrix[x][y] <= matrix[i][j] (or a condition you want to skip this round):\\n           continue\\n        # do something like\\n        visited[i][j] = True\\n        # explore the next level like\\n        self.dfs(x, y, matrix, visited, m, n)\\n```\\nHope it helps\\n\\n*Solution*\\n```\\nclass Solution(object):\\n    def pacificAtlantic(self, matrix):\\n        \"\"\"\\n        :type matrix: List[List[int]]\\n        :rtype: List[List[int]]\\n        \"\"\"\\n        if not matrix: return []\\n        self.directions = [(1,0),(-1,0),(0,1),(0,-1)]\\n        m = len(matrix)\\n        n = len(matrix[0])\\n        p_visited = [[False for _ in range(n)] for _ in range(m)]\\n        \\n        a_visited = [[False for _ in range(n)] for _ in range(m)]\\n        result = []\\n        \\n        for i in range(m):\\n            # p_visited[i][0] = True\\n            # a_visited[i][n-1] = True\\n            self.dfs(matrix, i, 0, p_visited, m, n)\\n            self.dfs(matrix, i, n-1, a_visited, m, n)\\n        for j in range(n):\\n            # p_visited[0][j] = True\\n            # a_visited[m-1][j] = True\\n            self.dfs(matrix, 0, j, p_visited, m, n)\\n            self.dfs(matrix, m-1, j, a_visited, m, n)\\n            \\n        for i in range(m):\\n            for j in range(n):\\n                if p_visited[i][j] and a_visited[i][j]:\\n                    result.append([i,j])\\n        return result\\n                \\n                \\n    def dfs(self, matrix, i, j, visited, m, n):\\n        # when dfs called, meaning its caller already verified this point \\n        visited[i][j] = True\\n        for dir in self.directions:\\n            x, y = i + dir[0], j + dir[1]\\n            if x < 0 or x >= m or y < 0 or y >= n or visited[x][y] or matrix[x][y] < matrix[i][j]:\\n                continue\\n            self.dfs(matrix, x, y, visited, m, n)\\n# 113 / 113 test cases passed.\\n# Runtime: 196 ms\\n```\\n\\n*Solution for longest increasing path in matrix*\\n```\\nclass Solution(object):\\n    def longestIncreasingPath(self, matrix):\\n        \"\"\"\\n        :type matrix: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        if not matrix: return 0\\n        self.directions = [(1,0),(-1,0),(0,1),(0,-1)]\\n        m = len(matrix)\\n        n = len(matrix[0])\\n        cache = [[-1 for _ in range(n)] for _ in range(m)]\\n        res = 0\\n        for i in range(m):\\n            for j in range(n):\\n                cur_len = self.dfs(i, j, matrix, cache, m, n)\\n                res = max(res, cur_len)\\n        return res\\n        \\n    def dfs(self, i, j, matrix, cache, m, n):\\n        if cache[i][j] != -1:\\n            return cache[i][j]\\n        res = 1\\n        for direction in self.directions:\\n            x, y = i + direction[0], j + direction[1]\\n            if x < 0 or x >= m or y < 0 or y >= n or matrix[x][y] <= matrix[i][j]:\\n                continue\\n            length = 1 + self.dfs(x, y, matrix, cache, m, n)\\n            res = max(length, res)\\n        cache[i][j] = res\\n        return res\\n```"
		},
		{
			"lc_ans_id":"90747",
			"view":"6882",
			"top":"2",
			"title":"Very Concise C++ solution using DFS and bit mask",
			"vote":"29",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<pair<int, int>> res;\\n    vector<vector<int>> visited;\\n    void dfs(vector<vector<int>>& matrix, int x, int y, int pre, int preval){\\n        if (x < 0 || x >= matrix.size() || y < 0 || y >= matrix[0].size()  \\n                || matrix[x][y] < pre || (visited[x][y] & preval) == preval) \\n            return;\\n        visited[x][y] |= preval;\\n        if (visited[x][y] == 3) res.push_back({x, y});\\n        dfs(matrix, x + 1, y, matrix[x][y], visited[x][y]); dfs(matrix, x - 1, y, matrix[x][y], visited[x][y]);\\n        dfs(matrix, x, y + 1, matrix[x][y], visited[x][y]); dfs(matrix, x, y - 1, matrix[x][y], visited[x][y]);\\n    }\\n\\n    vector<pair<int, int>> pacificAtlantic(vector<vector<int>>& matrix) {\\n        if (matrix.empty()) return res;\\n        int m = matrix.size(), n = matrix[0].size();\\n        visited.resize(m, vector<int>(n, 0));\\n        for (int i = 0; i < m; i++) {\\n            dfs(matrix, i, 0, INT_MIN, 1);\\n            dfs(matrix, i, n - 1, INT_MIN, 2);\\n        }\\n        for (int i = 0; i < n; i++) {\\n            dfs(matrix, 0, i, INT_MIN, 1);\\n            dfs(matrix, m - 1, i, INT_MIN, 2);\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"90758",
			"view":"2257",
			"top":"3",
			"title":"Not understanding the problem. Could someone please explain?",
			"vote":"16",
			"content":"Hi Guys,\\n\\nSorry for the noob question. I actually don't understand the problem very well. Where I am not understanding the problem is that, in the matrix given in the problem, if the water can flow only in 4 directions, why is it spilling diagonally to 2nd row 3rd column (5)? How is water going from (5) -> (7)? \\n\\nCould someone please help me understand the problem? \\n\\nThank you! \\n\\n```java\\nGiven the following 5x5 matrix:\\n\\n  Pacific ~   ~   ~   ~   ~ \\n       ~  1   2   2   3  (5) *\\n       ~  3   2   3  (4) (4) *\\n       ~  2   4  (5)  3   1  *\\n       ~ (6) (7)  1   4   5  *\\n       ~ (5)  1   1   2   4  *\\n          *   *   *   *   * Atlantic\\n\\nReturn:\\n\\n[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).```"
		},
		{
			"lc_ans_id":"90812",
			"view":"4257",
			"top":"4",
			"title":"Simple commented java solution with thinking progress O(n)",
			"vote":"11",
			"content":"```\\n/*\\n1.Naive solution:\\n    Standard dfs, which means for each point, we check if it can reach both pacific and atlantic, \\n    for each point, we can possibly check all the rest of points, O(m*n * m*n)\\n\\n2.A little improvement:\\n    What about we 4 hash tables, they keep track of all the points we know so far that \\n        can reach atlantic\\n        cannot reach atlantic\\n        can reach pacific\\n        cannot reach pacific\\n    It's doable, still hit TLE, although I didn't hit TLE when not submitting the code, but running it using the provided testing environment\\n\\n3.On the other hand, we can consider the flip side\\n    We can let the pacific and atlantic ocean \"flow into\" the matrix as much as possible,\\n    using 2 boolean arrays, one for each ocean. \\n    The result are the points that are true in both boolean table\\n*/\\n\\n\\npublic class Solution {\\n    public List<int[]> pacificAtlantic(int[][] matrix) {\\n        List<int[]> result = new ArrayList<int[]>();\\n        if(matrix.length == 0 || matrix[0].length == 0) return result;   \\n        boolean[][] pacific = new boolean[matrix.length][matrix[0].length];  // the pacific boolean table\\n        boolean[][] atlantic = new boolean[matrix.length][matrix[0].length]; // the atlantic booean table\\n        //initially, all the top and left cells are flooded with pacific water\\n        //and all the right and bottom cells are flooded with atlantic water\\n        for(int i = 0; i < matrix.length; i++){\\n            pacific[i][0] = true;\\n            atlantic[i][matrix[0].length-1] = true;\\n        }\\n        for(int i = 0; i < matrix[0].length; i++){\\n            pacific[0][i] = true;\\n            atlantic[matrix.length-1][i] = true; \\n        }\\n        //we go around the matrix and try to flood the matrix from 4 side.\\n        for(int i = 0; i < matrix.length; i++){\\n            boolean[][] pacificVisited = new boolean[matrix.length][matrix[0].length];\\n            boolean[][] atlanticVisited = new boolean[matrix.length][matrix[0].length];\\n            water(pacific, pacificVisited, matrix, i,0);\\n            water(atlantic, atlanticVisited, matrix, i, matrix[0].length - 1);            \\n        }\\n        for(int i = 0; i < matrix[0].length; i++){\\n            boolean[][] pacificVisited = new boolean[matrix.length][matrix[0].length];\\n            boolean[][] atlanticVisited = new boolean[matrix.length][matrix[0].length];\\n            water(pacific, pacificVisited, matrix, 0,i);\\n            water(atlantic, atlanticVisited, matrix, matrix.length - 1, i);            \\n        }\\n        //check the shared points among 2 tables\\n        for(int i = 0; i < matrix.length; i++){\\n            for(int j = 0; j < matrix[0].length; j++){\\n                if(pacific[i][j] && atlantic[i][j]){\\n                    int[] element = {i,j};\\n                    result.add(element);\\n                }\\n            }\\n        }\\n        return result;\\n    }\\n    //the flood function\\n    private void water(boolean[][] wet, boolean[][] visited, int[][] matrix, int i , int j){\\n        wet[i][j] = true;\\n        visited[i][j] = true;\\n        int[] x = {0,0,1,-1};\\n        int[] y = {1,-1,0,0};\\n        for(int k = 0; k < 4; k++){\\n            if(i+y[k] >= 0 && i+y[k] < matrix.length && j+x[k] >= 0 && j+x[k] < matrix[0].length \\n                && !visited[i+y[k]][j+x[k]] && matrix[i+y[k]][j+x[k]] >= matrix[i][j]){\\n                water(wet, visited, matrix, i+y[k], j+x[k]);\\n            }\\n        }\\n    }\\n}````\\n\\nP.S Sometimes you choose an option just because the alternative is just worse....."
		},
		{
			"lc_ans_id":"90749",
			"view":"2012",
			"top":"5",
			"title":"JAVA 17ms Solution, Simple and Clear, similar to Number of Islands's idea",
			"vote":"6",
			"content":"The idea is as following:\\n\\nFirst, we can separate Pacific and Atlantic ocean into two, they share the same idea. The only difference is the starting position.\\n\\nSecond, we think this problem in the opposite way: all the valid positions must have at least one path to connect to the ocean, so we start from the ocean to find out all the paths.\\n\\n1, 1, 1, 1\\n1, 0, 0, 0\\n1, 0, 0, 0\\n1, 0, 0, 0\\n\\nThen we create a new boolean[][] matrix like above, all the beaches is marked as True (1) in the beginning, which means they can connect to the ocean, then we explore from the beach to find out all the paths. The idea is the same for Pacific and Atlantic.\\n\\nThe last step is to use && to find positions satisfy both Pacific and Atlantic.\\n\\nHere comes the solution:\\n\\n\\n\\n    static int[] dx = {-1,0,0,1};\\n    static int[] dy = {0,1,-1,0};\\n    public List<int[]> pacificAtlantic(int[][] matrix) {\\n        List<int[]> res = new ArrayList<>();\\n        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return res;\\n        boolean[][] pacific = new boolean[matrix.length][matrix[0].length];\\n        boolean[][] atlantic = new boolean[matrix.length][matrix[0].length];\\n        for (int i = 0; i < matrix.length; i++){\\n            pacific[i][0] = true;\\n            atlantic[i][matrix[0].length-1] = true;\\n        }\\n        for (int j = 0; j < matrix[0].length; j++){\\n            pacific[0][j] = true;\\n            atlantic[matrix.length-1][j] = true;\\n        }\\n        for (int i = 0; i < matrix.length; i++){\\n            explore(pacific, matrix, i, 0);\\n            explore(atlantic, matrix, i, matrix[0].length-1);\\n        }\\n        for (int j = 0; j < matrix[0].length; j++){\\n            explore(pacific, matrix, 0, j);\\n            explore(atlantic, matrix, matrix.length-1, j);\\n        }\\n        for (int i = 0; i < matrix.length; i++){\\n            for (int j = 0; j < matrix[0].length; j++){\\n                if (pacific[i][j] && atlantic[i][j] == true)\\n                    res.add(new int[]{i,j});\\n            }\\n        }\\n        return res;\\n        \\n    }\\n    private void explore(boolean[][] grid, int[][] matrix, int i, int j){\\n        grid[i][j] = true;\\n        for (int d = 0; d < dx.length; d++){\\n            if (i+dy[d] < grid.length && i+dy[d] >= 0 && \\n                j + dx[d] < grid[0].length && j + dx[d] >= 0 && \\n                grid[i+dy[d]][j+dx[d]] == false && matrix[i+dy[d]][j+dx[d]] >= matrix[i][j])\\n                    explore(grid, matrix, i+dy[d], j+dx[d]);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"90810",
			"view":"794",
			"top":"6",
			"title":"Java 28ms BFS solution using one queue",
			"vote":"4",
			"content":"I use two bits to save the information of pacific ocean and atlantic ocean.\\n`00`: cannot reach any ocean\\n`01`: can reach pacific ocean\\n`10`: can reach atlantic ocean\\n`11`: can reach two oceans\\n\\n**Step 1**: Update the status of border cells and put them into the queue\\n**Step 2**: Iterate the queue and explore the four directions. We only put a new cell into the queue if :\\n- row and col index are valid\\n- the height of the new cell is larger or equals to the height of the current cell\\n- the new cell can benifit from the current cell (check status)\\n\\n```java\\npublic class Solution {\\n    public List<int[]> pacificAtlantic(int[][] matrix) {\\n        List<int[]> res = new ArrayList<>();\\n        int m = matrix.length;\\n        if (m == 0) return res;\\n        int n = matrix[0].length;\\n        int[][] state = new int[m][n];\\n        Queue<int[]> q = new LinkedList<>();\\n        for (int i = 0; i < m; i++) {\\n            state[i][0] |= 1;\\n            if (i == m - 1 || n == 1) state[i][0] |= 2;\\n            if (state[i][0] == 3) res.add(new int[]{i, 0});\\n            q.add(new int[]{i, 0});\\n            if (n > 1) {\\n                state[i][n - 1] |= 2;\\n                if (i == 0) state[i][n - 1] |= 1;\\n                if (state[i][n - 1] == 3) res.add(new int[]{i, n - 1});\\n                q.add(new int[]{i, n - 1});\\n            }\\n        }\\n        for (int j = 1; j < n - 1; j++) {\\n            state[0][j] |= 1;\\n            if (m == 1) state[0][j] |= 2;\\n            if (state[0][j] == 3) res.add(new int[]{0, j});\\n            q.add(new int[]{0, j});\\n            if (m > 1) {\\n                state[m - 1][j] |= 2;\\n                if (state[m - 1][j] == 3) res.add(new int[]{m - 1, j});\\n                q.add(new int[]{m - 1, j});\\n            }\\n        }\\n        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};\\n        while (!q.isEmpty()) {\\n            int[] cell = q.poll();\\n            for (int[] dir : dirs) {\\n                int row = cell[0] + dir[0];\\n                int col = cell[1] + dir[1];\\n                if (row < 0 || col < 0 || row == m || col == n || matrix[row][col] < matrix[cell[0]][cell[1]] || ((state[cell[0]][cell[1]] | state[row][col]) == state[row][col])) continue;\\n                state[row][col] |= state[cell[0]][cell[1]];\\n                if (state[row][col] == 3) res.add(new int[]{row, col});\\n                q.add(new int[]{row, col});\\n            }\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"90828",
			"view":"421",
			"top":"7",
			"title":"Simple java dfs solution",
			"vote":"3",
			"content":"Build two sets for Pacific and Atlantic. The result is the intersection of them.\\n```\\n private int[][] direction = new int[][]{{1, 0},{0, 1},{-1, 0},{0, -1}};\\n    public List<int[]> pacificAtlantic(int[][] matrix) {\\n        List<int[]> result = new ArrayList<>();\\n        if (matrix.length == 0) return result;\\n        Set<Integer> pacific = new HashSet<>();\\n        Set<Integer> atlantic = new HashSet<>();\\n        for (int i = 0; i < matrix[0].length; i++) {\\n            dfs(matrix, 0, i, pacific);\\n            dfs(matrix, matrix.length - 1, i, atlantic);\\n        }\\n        for (int i = 0; i < matrix.length; i++) {\\n            dfs(matrix, i, 0, pacific);\\n            dfs(matrix, i, matrix[0].length - 1, atlantic);\\n        }\\n        \\n        for (int i: pacific) {\\n            if (atlantic.contains(i)) {\\n                result.add(decode(i, matrix));\\n            }\\n        }\\n        return result;\\n    }\\n    \\n    private void dfs(int[][] matrix, int i, int j, Set<Integer> result) {\\n        if (!result.add(encode(i, j, matrix))) return;\\n        for (int[] dir: direction) {\\n            int x = dir[0] + i;\\n            int y = dir[1] + j;\\n            if (x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length && matrix[x][y] >= matrix[i][j]) {\\n                dfs(matrix, x, y, result);\\n            }\\n        }\\n    }\\n    \\n    private int[] decode(int i, int[][] matrix) {\\n        return new int[]{i / matrix[0].length, i % matrix[0].length};\\n    }\\n    \\n    private int encode(int i, int j, int[][] matrix) {\\n        return i * matrix[0].length + j;\\n    }\\n```"
		},
		{
			"lc_ans_id":"90762",
			"view":"990",
			"top":"8",
			"title":"Straightforward efficient C++ solution using stack",
			"vote":"3",
			"content":"The code is rather long, but very easy to understand.\\nBasically, we use two tables to record if the water can flow to pacific or atlantic. To determine the element, we use a stack structure to search the element on the four sides of a certain element.\\nIn the test the runtime is 55ms.\\n```\\nclass Solution {\\npublic:\\n    vector<pair<int, int>> pacificAtlantic(vector<vector<int>>& matrix) {\\n        vector<pair<int,int>> result;\\n        int m=matrix.size();\\n        if (m==0) return result;\\n        int n=matrix[0].size();\\n        int pacific[m][n];\\n        int atlantic[m][n];\\n        for(int i=0;i<m;i++){\\n            for(int j=0;j<n;j++){\\n                pacific[i][j]=0;\\n                atlantic[i][j]=0;\\n            }\\n        }\\n        stack<pair<int,int>> sp;\\n        stack<pair<int,int>> sa;\\n        for (int i=0;i<m;i++){\\n            pacific[i][0]=1;\\n            sp.push(make_pair(i,0));\\n        }\\n        for(int i=1;i<n;i++){\\n            pacific[0][i]=1;\\n            sp.push(make_pair(0,i));\\n        }\\n        while(!sp.empty()){\\n            pair<int, int> index=sp.top();\\n            int x=index.first;\\n            int y=index.second;\\n            sp.pop();\\n            if (x-1>=0&&pacific[x-1][y]==0&&matrix[x-1][y]>=matrix[x][y]){\\n                sp.push(make_pair(x-1,y));\\n                pacific[x-1][y]=1;\\n            }\\n            if (x+1<m&&pacific[x+1][y]==0&&matrix[x+1][y]>=matrix[x][y]){\\n                sp.push(make_pair(x+1,y));\\n                pacific[x+1][y]=1;\\n            }\\n            if (y-1>=0&&pacific[x][y-1]==0&&matrix[x][y-1]>=matrix[x][y]){\\n                sp.push(make_pair(x,y-1));\\n                pacific[x][y-1]=1;\\n            }\\n            if (y+1<n&&pacific[x][y+1]==0&&matrix[x][y+1]>=matrix[x][y]){\\n                sp.push(make_pair(x,y+1));\\n                pacific[x][y+1]=1;\\n            }\\n        }\\n        for (int i=0;i<m;i++){\\n            atlantic[i][n-1]=1;\\n            sa.push(make_pair(i,n-1));\\n        }\\n        for(int i=0;i<n-1;i++){\\n            atlantic[m-1][i]=1;\\n            sa.push(make_pair(m-1,i));\\n        }\\n        while(!sa.empty()){\\n            pair<int, int> index=sa.top();\\n            int x=index.first;\\n            int y=index.second;\\n            sa.pop();\\n            if (x-1>=0&&atlantic[x-1][y]==0&&matrix[x-1][y]>=matrix[x][y]){\\n                sa.push(make_pair(x-1,y));\\n                atlantic[x-1][y]=1;\\n            }\\n            if (x+1<m&&atlantic[x+1][y]==0&&matrix[x+1][y]>=matrix[x][y]){\\n                sa.push(make_pair(x+1,y));\\n                atlantic[x+1][y]=1;\\n            }\\n            if (y-1>=0&&atlantic[x][y-1]==0&&matrix[x][y-1]>=matrix[x][y]){\\n                sa.push(make_pair(x,y-1));\\n                atlantic[x][y-1]=1;\\n            }\\n            if (y+1<n&&atlantic[x][y+1]==0&&matrix[x][y+1]>=matrix[x][y]){\\n                sa.push(make_pair(x,y+1));\\n                atlantic[x][y+1]=1;\\n            }\\n        }\\n        for(int i=0; i<m;i++){\\n            for(int j=0;j<n;j++){\\n                if (atlantic[i][j]==1&&pacific[i][j]==1){\\n                    result.push_back(make_pair(i,j));\\n                }\\n            }\\n        }\\n        return result;\\n    }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"90753",
			"view":"149",
			"top":"9",
			"title":"Simple and Elegant Python DFS solution",
			"vote":"2",
			"content":"Simply do two DFS, each time starting from the edges that belong to the Pacific and Atlantic Ocean.\\n\\n`nodes = set(coords[type]) | set(zip(*coords)[type])` is a really neat trick to get the cells for each ocean. When `type` is 0, you will get the Pacific Ocean cells, when `type` is -1, you will get the Atlantic Ocean cells.\\n\\nThe rest is standard DFS code already presented multiple times by others.\\n\\n\\n```\\nclass Solution(object):\\n    def pacificAtlantic(self, matrix):\\n        \"\"\"\\n        :type matrix: List[List[int]]\\n        :rtype: List[List[int]]\\n        \"\"\"\\n        if not len(matrix) or not len(matrix[0]):\\n            return []\\n        rows, cols = len(matrix), len(matrix[0])\\n        coords = [[(row, col) for col in range(cols)] for row in range(rows)]\\n        def ocean_nodes(type):\\n            nodes = set(coords[type]) | set(zip(*coords)[type])\\n            traversable = set()\\n            def traverse(node):\\n                if node in traversable:\\n                    return\\n                traversable.add(node)\\n                curr_height = matrix[node[0]][node[1]]\\n                for direction in ((0, 1), (0, -1), (1, 0), (-1, 0)):\\n                    row, col = node[0] + direction[0], node[1] + direction[1]\\n                    if 0 <= row < rows and 0 <= col < cols and curr_height <= matrix[row][col]:\\n                        traverse((row, col))\\n            [traverse(node) for node in nodes]\\n            return traversable\\n        return list(ocean_nodes(0) & ocean_nodes(-1))          \\n```"
		}
	],
	"id":"417",
	"title":"Pacific Atlantic Water Flow",
	"content":"<p>Given an <code>m x n</code> matrix of non-negative integers representing the height of each unit cell in a continent, the \"Pacific ocean\" touches the left and top edges of the matrix and the \"Atlantic ocean\" touches the right and bottom edges.</p>\r\n\r\n<p>Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower.</p>\r\n\r\n<p>Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.</p>\r\n\r\n<p><b>Note:</b><br />\r\n<ol>\r\n<li>The order of returned grid coordinates does not matter.</li>\r\n<li>Both <i>m</i> and <i>n</i> are less than 150.</li>\r\n</ol>\r\n</p>\r\n<p><b>Example:</b>\r\n<pre>\r\nGiven the following 5x5 matrix:\r\n\r\n  Pacific ~   ~   ~   ~   ~ \r\n       ~  1   2   2   3  (5) *\r\n       ~  3   2   3  (4) (4) *\r\n       ~  2   4  (5)  3   1  *\r\n       ~ (6) (7)  1   4   5  *\r\n       ~ (5)  1   1   2   4  *\r\n          *   *   *   *   * Atlantic\r\n\r\nReturn:\r\n\r\n[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).\r\n</pre>\r\n</p>",
	"frequency":"226",
	"ac_num":"22169"
}