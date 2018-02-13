{
	"difficulty":"2",
	"submit_num":"51085",
	"show_id":"542",
	"leetcode_id":"542",
	"answers":[
		{
			"lc_ans_id":"101021",
			"view":"14346",
			"top":"0",
			"title":"Java Solution, BFS",
			"vote":"45",
			"content":"General idea is ```BFS```. Some small tricks:\\n1. At beginning, set cell value to ```Integer.MAX_VALUE``` if it is not ```0```.\\n2. If newly calculated distance ```>=``` current distance, then we don't need to explore that cell again.\\n```\\npublic class Solution {\\n    public List<List<Integer>> updateMatrix(List<List<Integer>> matrix) {\\n        int m = matrix.size();\\n        int n = matrix.get(0).size();\\n        \\n        Queue<int[]> queue = new LinkedList<>();\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                if (matrix.get(i).get(j) == 0) {\\n                    queue.offer(new int[] {i, j});\\n                }\\n                else {\\n                    matrix.get(i).set(j, Integer.MAX_VALUE);\\n                }\\n            }\\n        }\\n        \\n        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};\\n        \\n        while (!queue.isEmpty()) {\\n            int[] cell = queue.poll();\\n            for (int[] d : dirs) {\\n                int r = cell[0] + d[0];\\n                int c = cell[1] + d[1];\\n                if (r < 0 || r >= m || c < 0 || c >= n || \\n                    matrix.get(r).get(c) <= matrix.get(cell[0]).get(cell[1]) + 1) continue;\\n                queue.add(new int[] {r, c});\\n                matrix.get(r).set(c, matrix.get(cell[0]).get(cell[1]) + 1);\\n            }\\n        }\\n        \\n        return matrix;\\n    }\\n}\\n```\\n\\nLeetCode has changed the function signature. Updated code:\\n```\\npublic class Solution {\\n    public int[][] updateMatrix(int[][] matrix) {\\n        int m = matrix.length;\\n        int n = matrix[0].length;\\n        \\n        Queue<int[]> queue = new LinkedList<>();\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                if (matrix[i][j] == 0) {\\n                    queue.offer(new int[] {i, j});\\n                }\\n                else {\\n                    matrix[i][j] = Integer.MAX_VALUE;\\n                }\\n            }\\n        }\\n        \\n        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};\\n        \\n        while (!queue.isEmpty()) {\\n            int[] cell = queue.poll();\\n            for (int[] d : dirs) {\\n                int r = cell[0] + d[0];\\n                int c = cell[1] + d[1];\\n                if (r < 0 || r >= m || c < 0 || c >= n || \\n                    matrix[r][c] <= matrix[cell[0]][cell[1]] + 1) continue;\\n                queue.add(new int[] {r, c});\\n                matrix[r][c] = matrix[cell[0]][cell[1]] + 1;\\n            }\\n        }\\n        \\n        return matrix;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101039",
			"view":"6339",
			"top":"1",
			"title":"Java 33ms solution with two sweeps in O(n)",
			"vote":"16",
			"content":"In the first sweep, we visit each entry in natural order and answer[i][j] = min(Integer.MAX_VALUE, min(answer[i - 1][j], answer[i][j - 1]) + 1).\\nin the second sweep, we visit each entry in reverse order and answer[i][j] = min(answer[i][j], min(answer[i + 1][j], answer[i][j + 1]) + 1).\\n```\\npublic List<List<Integer>> updateMatrix(List<List<Integer>> matrix) {\\n        List<List<Integer>> answer = new LinkedList();\\n\\t\\tif(matrix.size() == 0) return answer;\\n\\t\\tint[][] array = new int[matrix.size()][matrix.get(0).size()];\\n\\t\\tint i = 0, j = 0;\\n\\t\\tfor(List<Integer> list : matrix) {\\n\\t\\t\\tfor(Integer x : list) {\\n\\t\\t\\t\\tif(x == 0) {\\n\\t\\t\\t\\t\\tarray[i][j] = 0;\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\telse {\\n\\t\\t\\t\\t\\tint left = Integer.MAX_VALUE - 1, top = Integer.MAX_VALUE - 1;\\n\\t\\t\\t\\t\\tif(i - 1 >= 0) top = array[i - 1][j];\\n\\t\\t\\t\\t\\tif(j - 1 >= 0) left = array[i][j - 1];\\n\\t\\t\\t\\t\\tarray[i][j] = Math.min(Integer.MAX_VALUE - 1, Math.min(top, left) + 1);\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\tj++;\\n\\t\\t\\t}\\n\\t\\t\\tj = 0;\\n\\t\\t\\ti++;\\n\\t\\t}\\n\\t\\tfor(int k = array.length - 1; k >= 0; k--) {\\n\\t\\t\\tfor(int m = array[0].length - 1; m >= 0; m--) {\\n\\t\\t\\t\\tif(array[k][m] != 0 && array[k][m] != 1) {\\n\\t\\t\\t\\t\\tint down = Integer.MAX_VALUE - 1, right = Integer.MAX_VALUE - 1;\\n\\t\\t\\t\\t\\tif(k + 1 < array.length) down = array[k + 1][m];\\n\\t\\t\\t\\t\\tif(m + 1 < array[0].length) right = array[k][m + 1];\\n\\t\\t\\t\\t\\tarray[k][m] = Math.min(array[k][m], Math.min(down, right) + 1);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tfor(int[] l : array) {\\n\\t\\t\\tList<Integer> tmp = new LinkedList();\\n\\t\\t\\tfor(int n : l) {\\n\\t\\t\\t\\ttmp.add(n);\\n\\t\\t\\t}\\n\\t\\t\\tanswer.add(tmp);\\n\\t\\t}\\n\\t\\treturn answer;\\n    }\\n```"
		},
		{
			"lc_ans_id":"101102",
			"view":"3817",
			"top":"2",
			"title":"Short solution - Each path needs at most one turn",
			"vote":"14",
			"content":"    def updateMatrix(self, matrix):\\n        answer = [[10000 * x for x in row] for row in matrix]\\n        for _ in range(4):\\n            for row in answer:\\n                for j in range(1, len(row)):\\n                    row[j] = min(row[j], row[j-1] + 1)\\n            answer = map(list, zip(*answer[::-1]))\\n        return answer\\n\\nBased on @qswawrq's [solution](https://discuss.leetcode.com/topic/83558/java-33ms-solution-with-two-sweeps-in-o-n) which only considers down/right paths (meaning a combination of only down and right moves, from some 0 to some 1) and up/left paths. When I realized why that works, I realized that we don't even need paths like `down,right,down,right`. We can instead go just `down,down,right,right` or `right,right,down,down`. Just one turn (change of direction). It's the same length, and all of the intermediate cells must be `1` because otherwise `down,right,down,right` wouldn't have been an optimal path in the first place.\\n\\nSo in my solution I simply **optimize in each direction, one after the other**. For this I **\"optimize rightwards\"** and **\"rotate the matrix by 90 degrees\"** four times. Then I have covered every pair of directions, which is enough to cover every straight path and every single-turn path."
		},
		{
			"lc_ans_id":"101070",
			"view":"1635",
			"top":"3",
			"title":"Can you change the input and return type to be a int[][] for Java ?",
			"vote":"10",
			"content":"List seems to be weird. Other similar matrix problems all use int[][]. why is this special?"
		},
		{
			"lc_ans_id":"101023",
			"view":"6373",
			"top":"4",
			"title":"18-line C++ DP Solution, O(n), Easy to Understand",
			"vote":"8",
			"content":"Simple DP, just check if the neigbours know how far are they to the nearest 0 when I don't know\\n```\\nclass Solution {\\npublic:\\n    vector<vector<int>> updateMatrix(vector<vector<int>>& matrix) {\\n        int h=matrix.size(), w=matrix[0].size();\\n        vector<vector<int>> dp(h,vector<int>(w,INT_MAX));\\n        for(int times=0;times<=1;times++) // two passes, first forward then backward\\n            for(int i=times?h-1:0;times?i>=0:i<h;times?i--:i++) \\n                for(int j=times?w-1:0;times?j>=0:j<w;times?j--:j++)\\n                        if(matrix[i][j]==0)\\n                            dp[i][j]=0;\\n                        else {\\n                            if(i&&dp[i-1][j]!=INT_MAX&&dp[i][j]>dp[i-1][j]+1) // look up\\n                                dp[i][j]=dp[i-1][j]+1;\\n                            if(j&&dp[i][j-1]!=INT_MAX&&dp[i][j]>dp[i][j-1]+1) // look left\\n                                dp[i][j]=dp[i][j-1]+1;\\n                            if(i<h-1&&dp[i+1][j]!=INT_MAX&&dp[i][j]>dp[i+1][j]+1) // look down\\n                                dp[i][j]=dp[i+1][j]+1;\\n                            if(j<w-1&&dp[i][j+1]!=INT_MAX&&dp[i][j]>dp[i][j+1]+1) // look right\\n                                dp[i][j]=dp[i][j+1]+1;\\n                        }\\n        return dp;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"101051",
			"view":"823",
			"top":"5",
			"title":"Simple Java solution beat 99% (use DP)",
			"vote":"6",
			"content":"\\n    public int[][] updateMatrix(int[][] matrix) {\\n        if (matrix.length == 0 || matrix[0].length == 0) {\\n            return matrix;\\n        }\\n        int[][] dis = new int[matrix.length][matrix[0].length];\\n        int range = matrix.length * matrix[0].length;\\n        \\n        for (int i = 0; i < matrix.length; i++) {\\n            for (int j = 0; j < matrix[0].length; j++) {\\n                if (matrix[i][j] == 0) {\\n                    dis[i][j] = 0;\\n                } else {\\n                    int upCell = (i > 0) ? dis[i - 1][j] : range;\\n                    int leftCell = (j > 0) ? dis[i][j - 1] : range;\\n                    dis[i][j] = Math.min(upCell, leftCell) + 1;\\n                }\\n            }\\n        }\\n        \\n        for (int i = matrix.length - 1; i >= 0; i--) {\\n            for (int j = matrix[0].length - 1; j >= 0; j--) {\\n                if (matrix[i][j] == 0) {\\n                    dis[i][j] = 0;\\n                } else {\\n                    int downCell = (i < matrix.length - 1) ? dis[i + 1][j] : range;\\n                    int rightCell = (j < matrix[0].length - 1) ? dis[i][j + 1] : range;\\n                    dis[i][j] = Math.min(Math.min(downCell, rightCell) + 1, dis[i][j]);\\n                }\\n            }\\n        }\\n        \\n        return dis;\\n    }"
		},
		{
			"lc_ans_id":"101080",
			"view":"1260",
			"top":"6",
			"title":"Python, Simple with Explanation",
			"vote":"6",
			"content":"Do a BFS on multiple sources: the squares of the given matrix that have a 0.\\nEvery time you visit a node, it will be from a path of predecessors that is of shortest distance to a zero.\\n\\n```\\ndef updateMatrix(self, A):\\n    R, C = len(A), len(A[0])\\n    def neighbors(r, c):\\n        for cr, cc in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):\\n            if 0 <= cr < R and 0 <= cc < C:\\n                yield cr, cc\\n                \\n    q = collections.deque([((r, c), 0) \\n            for r in xrange(R) \\n            for c in xrange(C) \\n            if A[r][c] == 0])\\n    seen = {x for x,_ in q}\\n    ans = [[0]*C for _ in A]\\n    while q:\\n        (r, c), depth = q.popleft()\\n        ans[r][c] = depth\\n        for nei in neighbors(r, c):\\n            if nei not in seen:\\n                seen.add(nei)\\n                q.append((nei, depth + 1))\\n    \\n    return ans\\n```"
		},
		{
			"lc_ans_id":"101060",
			"view":"646",
			"top":"7",
			"title":"Java DFS solution beat %95",
			"vote":"3",
			"content":"Using DFS method. \\n1. Assigned a large value to all the positions with value 1 and don't have 0 neighbors\\n2. Start dfs search from positions whose value is 1\\n\\n```\\npublic class Solution {\\n    public int[][] updateMatrix(int[][] matrix) {\\n        if(matrix.length==0) return matrix;\\n        \\n        for(int i = 0; i<matrix.length; i++)\\n            for(int j = 0; j<matrix[0].length; j++)\\n                if(matrix[i][j]==1&&!hasNeiberZero(i, j,matrix)) \\n                    matrix[i][j] = matrix.length+matrix[0].length+1;\\n        \\n        for(int i = 0; i<matrix.length; i++)\\n            for(int j = 0; j<matrix[0].length; j++)\\n                if(matrix[i][j]==1)\\n                    dfs(matrix, i, j, -1);\\n        \\n        return matrix;\\n    }\\n    private void dfs(int[][] matrix, int x, int y, int val){\\n        if(x<0||y<0||y>=matrix[0].length||x>=matrix.length||matrix[x][y]<=val)\\n            return;\\n        \\n        if(val>0) matrix[x][y] = val;\\n        \\n        dfs(matrix, x+1, y, matrix[x][y]+1);\\n        dfs(matrix, x-1, y, matrix[x][y]+1);\\n        dfs(matrix, x, y+1, matrix[x][y]+1);\\n        dfs(matrix, x, y-1, matrix[x][y]+1);\\n        \\n    }\\n    private boolean hasNeiberZero(int x, int y, int[][] matrix){\\n        if(x>0&&matrix[x-1][y]==0) return true;\\n        if(x<matrix.length-1&&matrix[x+1][y]==0) return true;\\n        if(y>0&&matrix[x][y-1]==0) return true;\\n        if(y<matrix[0].length-1&&matrix[x][y+1]==0) return true;\\n        \\n        return false;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"101034",
			"view":"712",
			"top":"8",
			"title":"python BFS solution",
			"vote":"3",
			"content":"Here used some tricks learned from @StefanPochmann \\n\\n```\\nclass Solution(object):\\n    def updateMatrix(self, matrix):\\n        q, m, n = [], len(matrix), len(matrix[0])\\n        for i in xrange(m):\\n            for j in xrange(n):\\n                if matrix[i][j] != 0:\\n                    matrix[i][j] = 0x7fffffff\\n                else:\\n                    q.append((i, j))\\n        for i, j in q:\\n            for r, c in ((i, 1+j), (i, j-1), (i+1, j), (i-1, j)):\\n                z = matrix[i][j] + 1\\n                if 0 <= r < m and 0 <= c < n and matrix[r][c] > z:\\n                    matrix[r][c] = z\\n                    q.append((r, c))\\n        return matrix"
		},
		{
			"lc_ans_id":"101054",
			"view":"368",
			"top":"9",
			"title":"Java in-place DP two traversal AC solution. O(mn) No BFS needed.",
			"vote":"2",
			"content":"\\n```\\npublic class Solution {\\n    public List<List<Integer>> updateMatrix(List<List<Integer>> matrix) {\\n        final int MAX = matrix.size() + matrix.get(0).size();\\n        for (int i = 0; i < matrix.size(); i++) {\\n            for (int j = 0; j < matrix.get(i).size(); j++) {\\n                if (matrix.get(i).get(j) == 0) {\\n                    continue;\\n                }\\n                int left = j == 0 ? MAX : matrix.get(i).get(j - 1);\\n                int up = i == 0 ? MAX : matrix.get(i - 1).get(j);\\n                matrix.get(i).set(j, Math.min(left, up) + 1);\\n            }\\n        }\\n        \\n        for (int i = matrix.size() - 1; i >= 0; i--) {\\n            for (int j = matrix.get(i).size() - 1; j >= 0; j--) {\\n                if (matrix.get(i).get(j) == 0) {\\n                    continue;\\n                }\\n                int right = j == matrix.get(i).size() - 1 ? MAX : matrix.get(i).get(j + 1);\\n                int down = i == matrix.size() - 1 ? MAX : matrix.get(i + 1).get(j);\\n                matrix.get(i).set(j, Math.min(matrix.get(i).get(j), Math.min(right, down) + 1));\\n            }\\n        }\\n        return matrix;\\n    }\\n}\\n```"
		}
	],
	"id":"526",
	"title":"01 Matrix",
	"content":"<p>\r\nGiven a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.\r\n</p>\r\nThe distance between two adjacent cells is 1.\r\n\r\n<p><b>Example 1: </b><br>\r\nInput:\r\n<pre>\r\n0 0 0\r\n0 1 0\r\n0 0 0\r\n</pre>\r\nOutput:\r\n<pre>\r\n0 0 0\r\n0 1 0\r\n0 0 0\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2: </b><br>\r\nInput:\r\n<pre>\r\n0 0 0\r\n0 1 0\r\n1 1 1\r\n</pre>\r\nOutput:\r\n<pre>\r\n0 0 0\r\n0 1 0\r\n1 2 1\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The number of elements of the given matrix will not exceed 10,000.</li>\r\n<li>There are at least one 0 in the given matrix.</li>\r\n<li>The cells are adjacent in only four directions: up, down, left and right.</li>\r\n</ol>\r\n</p>\r\n",
	"frequency":"255",
	"ac_num":"16811"
}