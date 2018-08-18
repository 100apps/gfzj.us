{
	"difficulty":"2",
	"submit_num":"25511",
	"show_id":"490",
	"leetcode_id":"490",
	"answers":[
		{
			"lc_ans_id":"97071",
			"view":"8087",
			"top":"0",
			"title":"Easy-understanding Java bfs solution.",
			"vote":"24",
			"content":"Solution of *The Maze II*: https://discuss.leetcode.com/topic/77472/similar-to-the-maze-easy-understanding-java-bfs-solution\\nSolution of *The Maze III*: https://discuss.leetcode.com/topic/77474/similar-to-the-maze-ii-easy-understanding-java-bfs-solution\\n\\nA standart bfs solution.\\n``` java\\npublic class Solution {\\n    class Point {\\n        int x,y;\\n        public Point(int _x, int _y) {x=_x;y=_y;}\\n    }\\n    public boolean hasPath(int[][] maze, int[] start, int[] destination) {\\n        int m=maze.length, n=maze[0].length;\\n        if (start[0]==destination[0] && start[1]==destination[1]) return true;\\n        int[][] dir=new int[][] {{-1,0},{0,1},{1,0},{0,-1}};\\n        boolean[][] visited=new boolean[m][n];\\n        LinkedList<Point> list=new LinkedList<>();\\n        visited[start[0]][start[1]]=true;\\n        list.offer(new Point(start[0], start[1]));\\n        while (!list.isEmpty()) {\\n            Point p=list.poll();\\n            int x=p.x, y=p.y;\\n            for (int i=0;i<4;i++) {\\n                int xx=x, yy=y;\\n                while (xx>=0 && xx<m && yy>=0 && yy<n && maze[xx][yy]==0) {\\n                    xx+=dir[i][0];\\n                    yy+=dir[i][1];\\n                }\\n                xx-=dir[i][0];\\n                yy-=dir[i][1];\\n                if (visited[xx][yy]) continue;\\n                visited[xx][yy]=true;\\n                if (xx==destination[0] && yy==destination[1]) return true;\\n                list.offer(new Point(xx, yy));\\n            }\\n        }\\n        return false;\\n        \\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97067",
			"view":"4949",
			"top":"1",
			"title":"Simple Java DFS with comments",
			"vote":"18",
			"content":"- Search in the four possible directions when coming to a stopping point (i.e. a new starting point).\\n- Keep track of places that you already started at in case you roll back to that point.\\n\\n```\\npublic class Solution {\\n    public boolean hasPath(int[][] maze, int[] start, int[] destination) {\\n        boolean[][] startedHere = new boolean[maze.length][maze[0].length]; // mark visited starting points\\n        return dfs(maze, startedHere, start, destination);\\n    }\\n    \\n    private boolean dfs(int[][] maze, boolean[][] startedHere, int[] start, int[] destination) {\\n        if (startedHere[start[0]][start[1]]) return false;\\n        if (Arrays.equals(start, destination)) return true;\\n        \\n        startedHere[start[0]][start[1]] = true; // in case we roll back to a point we already started at\\n        \\n        BiPredicate<Integer, Integer> roll = (rowInc, colInc) -> {\\n            int row = start[0], col = start[1]; // init new start row and col\\n            while (canRoll(maze, row + rowInc, col + colInc)) {\\n                row += rowInc;\\n                col += colInc;\\n            }\\n            return dfs(maze, startedHere, new int[]{row, col}, destination); // pass in new start to dfs\\n        };\\n        \\n        if (roll.test(1, 0)) return true; // roll up\\n        if (roll.test(0, 1)) return true; // roll right\\n        if (roll.test(-1, 0)) return true; // roll down\\n        if (roll.test(0, -1)) return true; // roll left\\n        \\n        return false; // return false if no paths led to destination\\n    }\\n    \\n    private boolean canRoll(int[][] maze, int row, int col) {\\n        if (row >= maze.length || row < 0 || col >= maze[0].length || col < 0) return false; // stop at borders\\n        return maze[row][col] != 1; // stop at walls (1 -> wall)\\n    }\\n}\\n```\\n\\nUPDATE: Also including one without using BiPredicate on every recursive call since it runs faster\\n\\n```\\npublic class Solution {\\n    \\n    private static final int[] DIRECTIONS = { 0, 1, 0, -1, 0 };\\n    \\n    public boolean hasPath(int[][] maze, int[] start, int[] destination) {\\n        boolean[][] startedHere = new boolean[maze.length][maze[0].length];\\n        return dfs(maze, startedHere, start, destination);\\n    }\\n    \\n    private boolean dfs(int[][] maze, boolean[][] startedHere, int[] start, int[] destination) {\\n        if (startedHere[start[0]][start[1]]) return false;\\n        if (Arrays.equals(start, destination)) return true;\\n        \\n        startedHere[start[0]][start[1]] = true;\\n        \\n        for (int i = 0; i < DIRECTIONS.length - 1; i++) {\\n            int[] newStart = roll(maze, start[0], start[1], DIRECTIONS[i], DIRECTIONS[i + 1]);\\n            if (dfs(maze, startedHere, newStart, destination)) return true;\\n        }\\n        \\n        return false;\\n    }\\n    \\n    private int[] roll(int[][] maze, int row, int col, int rowInc, int colInc) {\\n        while (canRoll(maze, row + rowInc, col + colInc)) {\\n            row += rowInc;\\n            col += colInc;\\n        }\\n        \\n        return new int[]{row, col};\\n    }\\n    \\n    private boolean canRoll(int[][] maze, int row, int col) {\\n        if (row >= maze.length || row < 0 || col >= maze[0].length || col < 0) return false;\\n        return maze[row][col] != 1; // 1 is a wall\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97074",
			"view":"1410",
			"top":"2",
			"title":"Python BFS solution",
			"vote":"9",
			"content":"```\\ndef hasPath(self, maze, start, destination):\\n\\n        Q = [start]\\n        n = len(maze)\\n        m = len(maze[0])\\n        dirs = ((0, 1), (0, -1), (1, 0), (-1, 0))\\n        \\n        while Q:\\n            # Use Q.pop() as DFS or Q.popleft() with deque from collections library for better performance. Kudos to @whglamrock\\n            i, j = Q.pop(0)\\n            maze[i][j] = 2\\n\\n            if i == destination[0] and j == destination[1]:\\n                return True\\n            \\n            for x, y in dirs:\\n                row = i + x\\n                col = j + y\\n                while 0 <= row < n and 0 <= col < m and maze[row][col] != 1:\\n                    row += x\\n                    col += y\\n                row -= x\\n                col -= y\\n                if maze[row][col] == 0:\\n                    Q.append([row, col])\\n        \\n        return False\\n```"
		},
		{
			"lc_ans_id":"97114",
			"view":"1503",
			"top":"3",
			"title":"Simple C++ DFS solution, using set to mark the visited end points",
			"vote":"5",
			"content":"Use set to marked the end points, preventing duplicate search.\\nUse go to the end function to move to the end of this direction.\\n```\\nclass Solution {\\npublic:\\n    bool hasPath(vector<vector<int>>& maze, vector<int>& start, vector<int>& destination) {\\n        set<vector<int>> visited;\\n        return helper(maze, start, destination, visited);\\n    }\\n    bool helper(vector<vector<int>>& maze, vector<int>& start, vector<int>& destination, set<vector<int>>& visited) {\\n        if(start == destination) return true;\\n        if(visited.find(start) != visited.end()) return false;\\n        visited.insert(start);\\n        vector<vector<int>> dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};\\n        for(int i = 0; i < 4; i++) {\\n            vector<int> res = go2End(maze, start, dirs[i]);\\n            if(res == destination || helper(maze, res, destination, visited)) return true;\\n        }\\n        return false;\\n    }\\n    vector<int> go2End(vector<vector<int>>& maze, vector<int>& start, vector<int>& dir) {\\n        int i = start[0] + dir[0];\\n        int j = start[1] + dir[1];\\n        int m = maze.size();\\n        int n = maze[0].size();\\n        if(i < 0 || i >= m || j < 0 || j >= n || maze[i][j] == 1) {\\n            return start;\\n        }\\n        vector<int> newStart = {i, j};\\n        return go2End(maze, newStart, dir);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"97099",
			"view":"258",
			"top":"4",
			"title":"Simple Python DFS",
			"vote":"4",
			"content":"    class Solution(object):\\n        def hasPath(self, maze, start, destination):\\n            return self.helper(maze, destination, start[0], start[1])\\n            \\n        \\n        def helper(self, maze, dest, i, j):\\n            if [i, j] == dest:\\n                return True\\n            if maze[i][j] == 2:\\n                return False\\n            up, down, left, right = i, i, j, j\\n            while up > 0 and maze[up-1][j] != 1:\\n                up -= 1\\n            while down < len(maze)-1 and maze[down+1][j] != 1:\\n                down += 1\\n            while left > 0 and maze[i][left-1] != 1:\\n                left -= 1\\n            while right < len(maze[0])-1 and maze[i][right+1] != 1:\\n                right += 1\\n            maze[i][j] = 2\\n            return self.helper(maze, dest, up, j) or self.helper(maze, dest, down, j) or self.helper(maze, dest, i, left) or self.helper(maze, dest, i, right)"
		},
		{
			"lc_ans_id":"97068",
			"view":"705",
			"top":"5",
			"title":"Simple DFS solution, beat 97%",
			"vote":"4",
			"content":"Simple DFS solution\\nLogic:\\nthe ball can roll four directions. If visited, marked as visited.\\n```\\npublic class Solution {\\n    public boolean hasPath(int[][] maze, int[] start, int[] destination) {\\n        // dfs\\n        if (maze == null || start == null || destination == null) {\\n            return false;\\n        }\\n        boolean[][] visited = new boolean[maze.length][maze[0].length];\\n        return hasPath(maze, start, destination, visited);\\n    }\\n    private boolean hasPath(int[][] maze, int[] start, int[] dest, boolean[][] visited) {\\n        int y = start[0];\\n        int x = start[1];\\n        if (visited[y][x]) return false;\\n        visited[y][x] = true;\\n        if (x == dest[1] && y == dest[0]) {\\n            return true;\\n        }\\n        // left\\n        if (x > 0 && maze[y][x-1] != 1) {\\n            int i = x - 1;\\n            while (i > 0 && maze[y][i-1] != 1) i--;\\n            if (hasPath(maze, new int[]{y, i}, dest, visited)) return true;\\n        }\\n        //right\\n        if (x < maze[0].length - 1 && maze[y][x+1] != 1) {\\n            int i = x + 1;\\n            while (i < maze[0].length-1 && maze[y][i+1] != 1)  i++;\\n            if (hasPath(maze, new int[]{y, i}, dest, visited)) return true;\\n        }\\n        //up\\n        if (y > 0 && maze[y-1][x] != 1) {\\n            int i = y - 1;\\n            while (i > 0 && maze[i-1][x] != 1) i--;\\n            if (hasPath(maze, new int[]{i, x}, dest, visited)) return true;\\n        }\\n        //down\\n        if (y < maze.length - 1 && maze[y+1][x] != 1) {\\n            int i = y + 1;\\n            while (i < maze.length-1 && maze[i+1][x] != 1) i++;\\n            if (hasPath(maze, new int[]{i, x}, dest, visited)) return true;\\n        }\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97081",
			"view":"1687",
			"top":"6",
			"title":"Java BFS solution",
			"vote":"4",
			"content":"I'm sure there is some way to speed up the search :)\\nI tried checking if the destination exists on the path while the ball is rolling before it hits the wall, if the destination doesn't have any wall around, then it's definitely not able to stop there. But it didn't speed up the runtime :(\\nLook forward to some smart optimized solutions!\\n```\\npublic class Solution {\\n    public boolean hasPath(int[][] maze, int[] start, int[] destination) {\\n        int m = maze.length, n = maze[0].length;\\n        boolean[][] visited = new boolean[m][n];\\n        int[] dx = new int[]{0, -1, 0, 1};\\n        int[] dy = new int[]{1, 0, -1, 0};\\n        \\n        Queue<int[]> queue = new LinkedList<>();\\n        queue.offer(start);\\n        visited[start[0]][start[1]] = true;\\n        \\n        while (!queue.isEmpty()) {\\n            int[] curPos = queue.poll();\\n            if (curPos[0] == destination[0] && curPos[1] == destination[1]) {\\n                return true;\\n            }\\n            // try four direction until it hits the wall\\n            for (int direction = 0; direction < 4; direction++) {\\n                int nx = curPos[0], ny = curPos[1];\\n                while (nx >= 0 && nx < m && ny >= 0 && ny < n && maze[nx][ny] == 0) {\\n                    nx += dx[direction];\\n                    ny += dy[direction];\\n                }\\n                \\n                //back one step\\n                nx -= dx[direction];\\n                ny -= dy[direction];\\n                \\n                if (!visited[nx][ny]) {\\n                    visited[nx][ny] = true;\\n                    queue.offer(new int[]{nx, ny});\\n                }\\n            }\\n        }\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97095",
			"view":"158",
			"top":"7",
			"title":"Java AC 11ms DFS Beats 97% With Comments - Easy to Understand",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    public boolean hasPath(int[][] maze, int[] start, int[] destination) {\\n        if (maze == null || maze.length == 0) return false;\\n        \\n        boolean[][] visited = new boolean[maze.length][maze[0].length];\\n        return dfs(maze, start, visited, destination);\\n    }\\n    \\n    private boolean dfs(int[][] maze, int[] start, boolean[][] visited, int[] destination) {\\n        if (start[0] == destination[0] && start[1] == destination[1]) return true;\\n        if (visited[start[0]][start[1]]) return false;\\n        \\n        visited[start[0]][start[1]] = true;\\n        \\n        for (int i = 0; i < 4; ++i) {//roll to four directions: 0 for up, 1 for down, 2 for left, 3 for right\\n            int[] next = rolling(start, maze, i);\\n            if (dfs(maze, next, visited, destination)) {\\n                return true;\\n            }\\n        }\\n        \\n        return false;\\n    }\\n    \\n    private int[] rolling(int[] start, int[][] maze, int dir) {\\n        int row = start[0], col = start[1];\\n        \\n        if (dir == 0 || dir == 1) { //up and down\\n            while (dir == 0 ? row - 1 >= 0 && maze[row - 1][col] == 0 : row + 1 < maze.length && maze[row + 1][col] == 0) {\\n                row = dir == 0 ? row - 1 : row + 1;\\n            }\\n        }\\n        else if (dir == 2 || dir == 3) { //left and right\\n            while (dir == 2 ? col - 1 >= 0 && maze[row][col - 1] == 0 : col + 1 < maze[0].length && maze[row][col + 1] == 0) {\\n                col = dir == 2 ? col - 1 : col + 1;\\n            }\\n        }\\n        \\n        return new int[]{row, col};\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97112",
			"view":"236",
			"top":"8",
			"title":"Short Java DFS 13ms Solution",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};\\n\\n    private boolean dfs(int[][] maze, int[] current, int[] destination, boolean[][] visited) {\\n        if (current[0] == destination[0] && current[1] == destination[1]) return true;\\n        int x = current[0], y = current[1];\\n        if (x < 0 || y < 0 || x > maze.length || y > maze[0].length || visited[x][y]) return false;\\n        visited[x][y] = true;\\n        for (int i = 0; i < directions.length; i++) {\\n            int xx = x, yy = y;\\n            while (xx >= 0 && xx < maze.length && yy >= 0 && yy < maze[0].length && maze[xx][yy] == 0) {\\n                xx += directions[i][0]; yy += directions[i][1];\\n            }\\n            if (dfs(maze, new int[]{xx-directions[i][0], yy-directions[i][1]}, destination, visited)) return true;\\n        }\\n        return false;\\n    }\\n\\n    public boolean hasPath(int[][] maze, int[] start, int[] destination) {\\n        if (maze.length == 0 || maze[0].length == 0) return false;\\n        return dfs(maze, start, destination, new boolean[maze.length][maze[0].length]);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97089",
			"view":"694",
			"top":"9",
			"title":"Java DFS solution, could anyone tell me how to calculate the time complexity?",
			"vote":"2",
			"content":"The idea is straight forward, start from start point, go through four directions, once we meet destination return true. else return false. I use a memo matrix to store temporary result.\\n\\n````\\npublic class Solution {\\n    \\n    int[][] dirs = new int[][]{{1,0},{-1,0},{0,1},{0,-1}};\\n    public boolean hasPath(int[][] maze, int[] start, int[] destination) {\\n        if(maze.length ==0){\\n            return false;\\n        }\\n        if(maze[start[0]][start[1]] == 1 || maze[destination[0]][destination[1]] ==1){\\n            return false;\\n        }\\n        \\n        int row = maze.length;\\n        int col = maze[0].length;\\n        Boolean[][] memo = new Boolean[row][col];\\n        return helper(maze, memo, start[0], start[1], destination[0], destination[1], row, col);\\n        \\n    }\\n    \\n    \\n    public boolean helper(int[][] maze, Boolean[][] memo, int si, int sj, int di, int dj, int row, int col){\\n        if(si == di && sj == dj){\\n            return true;\\n        }\\n        \\n        if(memo[si][sj] != null){\\n            return memo[si][sj];\\n        }\\n        \\n        maze[si][sj] = -1; // mark as visited.\\n        \\n        boolean res = false;\\n        for(int[] dir : dirs){\\n            // until we reach the edge or wall;\\n            \\n            int x = si;\\n            int y = sj;\\n            \\n            while(x+dir[0] >=0 && x+dir[0] < row && y+dir[1] >=0 && y+dir[1] < col && maze[x+dir[0]][y+dir[1]] != 1){\\n                x+=dir[0];\\n                y+=dir[1];\\n            }\\n            \\n            //so that x,y is the next point in this direction;\\n            \\n            if(maze[x][y] != -1){\\n                res |=helper(maze, memo, x, y, di, dj, row, col);\\n            }\\n        }\\n        \\n        maze[si][sj] = 0;\\n        memo[si][sj] = res;\\n        \\n        return res;\\n    }\\n}\\n```\\n\\nNot quite sure of the time complexity. Could anybody help me with this? \\n\\nThanks."
		}
	],
	"id":"481",
	"title":"The Maze",
	"content":"<p>There is a <b>ball</b> in a maze with empty spaces and walls. The ball can go through empty spaces by rolling <b>up</b>, <b>down</b>, <b>left</b> or <b>right</b>, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.</p>\r\n\r\n<p>Given the ball's <b>start position</b>, the <b>destination</b> and the <b>maze</b>, determine whether the ball could stop at the destination.</p>\r\n\r\n<p>The maze is represented by a binary 2D array. 1 means the wall and 0 means the empty space. You may assume that the borders of the maze are all walls. The start and destination coordinates are represented by row and column indexes.</p>\r\n\r\n<p>\r\n<b>Example 1</b>\r\n<pre>\r\n<b>Input 1:</b> a maze represented by a 2D array\r\n\r\n0 0 1 0 0\r\n0 0 0 0 0\r\n0 0 0 1 0\r\n1 1 0 1 1\r\n0 0 0 0 0\r\n\r\n<b>Input 2:</b> start coordinate (rowStart, colStart) = (0, 4)\r\n<b>Input 3:</b> destination coordinate (rowDest, colDest) = (4, 4)\r\n\r\n<b>Output:</b> true\r\n<b>Explanation:</b> One possible way is : left -> down -> left -> down -> right -> down -> right.\r\n<img src=\"/static/images/problemset/maze_1_example_1.png\" width = \"30%\" />\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Example 2</b>\r\n<pre>\r\n<b>Input 1:</b> a maze represented by a 2D array\r\n\r\n0 0 1 0 0\r\n0 0 0 0 0\r\n0 0 0 1 0\r\n1 1 0 1 1\r\n0 0 0 0 0\r\n\r\n<b>Input 2:</b> start coordinate (rowStart, colStart) = (0, 4)\r\n<b>Input 3:</b> destination coordinate (rowDest, colDest) = (3, 2)\r\n\r\n<b>Output:</b> false\r\n<b>Explanation:</b> There is no way for the ball to stop at the destination.\r\n<img src=\"/static/images/problemset/maze_1_example_2.png\" width = \"30%\" />\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>There is only one ball and one destination in the maze.</li>\r\n<li>Both the ball and the destination exist on an empty space, and they will not be at the same position initially.</li>\r\n<li>The given maze does not contain border (like the red rectangle in the example pictures), but you could assume the border of the maze are all walls.</li>\r\n<li>The maze contains at least 2 empty spaces, and both the width and height of the maze won't exceed 100.</li>\r\n</ol>\r\n</p>",
	"frequency":"63",
	"ac_num":"11112"
}