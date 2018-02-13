{
	"difficulty":"2",
	"submit_num":"163444",
	"show_id":"289",
	"leetcode_id":"289",
	"answers":[
		{
			"lc_ans_id":"73223",
			"view":"41623",
			"top":"0",
			"title":"Easiest JAVA solution with explanation",
			"vote":"550",
			"content":"To solve it in place, we use 2 bits to store 2 states:\\n\\n    [2nd bit, 1st bit] = [next state, current state]\\n\\n    - 00  dead (next) <- dead (current)\\n    - 01  dead (next) <- live (current)  \\n    - 10  live (next) <- dead (current)  \\n    - 11  live (next) <- live (current) \\n\\n- In the beginning, every cell is either `00` or `01`.\\n- Notice that `1st` state is independent of `2nd` state.\\n- Imagine all cells are instantly changing from the `1st` to the `2nd` state, at the same time.\\n- Let's count # of neighbors from `1st` state and set `2nd` state bit.\\n- Since every `2nd` state is by default dead, no need to consider transition `01 -> 00`.\\n- In the end, delete every cell's `1st` state by doing `>> 1`.\\n\\nFor each cell's `1st` bit, check the 8 pixels around itself, and set the cell's `2nd` bit.\\n\\n- Transition `01 -> 11`: when `board == 1` and `lives >= 2 && lives <= 3`.\\n- Transition `00 -> 10`: when `board == 0`  and  `lives == 3`.\\n\\n\\nTo get the current state, simply do\\n\\n    board[i][j] & 1\\n\\nTo get the next state, simply do\\n\\n    board[i][j] >> 1\\n\\nHope this helps!\\n\\n    public void gameOfLife(int[][] board) {\\n        if (board == null || board.length == 0) return;\\n        int m = board.length, n = board[0].length;\\n    \\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                int lives = liveNeighbors(board, m, n, i, j);\\n    \\n                // In the beginning, every 2nd bit is 0;\\n                // So we only need to care about when will the 2nd bit become 1.\\n                if (board[i][j] == 1 && lives >= 2 && lives <= 3) {  \\n                    board[i][j] = 3; // Make the 2nd bit 1: 01 ---> 11\\n                }\\n                if (board[i][j] == 0 && lives == 3) {\\n                    board[i][j] = 2; // Make the 2nd bit 1: 00 ---> 10\\n                }\\n            }\\n        }\\n    \\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                board[i][j] >>= 1;  // Get the 2nd state.\\n            }\\n        }\\n    }\\n    \\n    public int liveNeighbors(int[][] board, int m, int n, int i, int j) {\\n        int lives = 0;\\n        for (int x = Math.max(i - 1, 0); x <= Math.min(i + 1, m - 1); x++) {\\n            for (int y = Math.max(j - 1, 0); y <= Math.min(j + 1, n - 1); y++) {\\n                lives += board[x][y] & 1;\\n            }\\n        }\\n        lives -= board[i][j] & 1;\\n        return lives;\\n    }"
		},
		{
			"lc_ans_id":"73230",
			"view":"21158",
			"top":"1",
			"title":"C++ O(1) space, O(mn) time",
			"vote":"172",
			"content":"Since the board has ints but only the 1-bit is used, I use the 2-bit to store the new state. At the end, replace the old state with the new state by shifting all values one bit to the right.\\n\\n    void gameOfLife(vector<vector<int>>& board) {\\n        int m = board.size(), n = m ? board[0].size() : 0;\\n        for (int i=0; i<m; ++i) {\\n            for (int j=0; j<n; ++j) {\\n                int count = 0;\\n                for (int I=max(i-1, 0); I<min(i+2, m); ++I)\\n                    for (int J=max(j-1, 0); J<min(j+2, n); ++J)\\n                        count += board[I][J] & 1;\\n                if (count == 3 || count - board[i][j] == 3)\\n                    board[i][j] |= 2;\\n            }\\n        }\\n        for (int i=0; i<m; ++i)\\n            for (int j=0; j<n; ++j)\\n                board[i][j] >>= 1;\\n    }\\n\\nNote that the above `count` counts the live ones among a cell's neighbors and the cell itself. Starting with `int count = -board[i][j]` counts only the live neighbors and allows the neat\\n\\n    if ((count | board[i][j]) == 3)\\n\\ntest. Thanks to aileenbai for showing that one in the comments."
		},
		{
			"lc_ans_id":"73217",
			"view":"13855",
			"top":"2",
			"title":"Infinite board solution",
			"vote":"50",
			"content":"For the second follow-up question, here's a solution for an infinite board. Instead of a two-dimensional array of ones and zeros, I represent the board as a set of live cell coordinates.\\n\\n    def gameOfLifeInfinite(self, live):\\n        ctr = collections.Counter((I, J)\\n                                  for i, j in live\\n                                  for I in range(i-1, i+2)\\n                                  for J in range(j-1, j+2)\\n                                  if I != i or J != j)\\n        return {ij\\n                for ij in ctr\\n                if ctr[ij] == 3 or ctr[ij] == 2 and ij in live}\\n\\nAnd here's a wrapper that uses the above infinite board solution to solve the problem we have here at the OJ (submitted together, this gets accepted):\\n\\n    def gameOfLife(self, board):\\n        live = {(i, j) for i, row in enumerate(board) for j, live in enumerate(row) if live}\\n        live = self.gameOfLifeInfinite(live)\\n        for i, row in enumerate(board):\\n            for j in range(len(row)):\\n                row[j] = int((i, j) in live)"
		},
		{
			"lc_ans_id":"73252",
			"view":"5361",
			"top":"3",
			"title":"C++ AC Code  O(1) space, O(mn) time",
			"vote":"46",
			"content":"    // Game of Life\\n    /*\\n    \\u72b6\\u6001: \\u524d\\u4e00\\u4f4d\\u8868\\u793a\\u4e0b\\u4e00\\u4ee3\\u7684\\u72b6\\u6001,\\u540e\\u4e00\\u4f4d\\u8868\\u793a\\u5f53\\u524d\\u7684\\u72b6\\u6001\\n    00: \\u6b7b->\\u6b7b\\n    10: \\u6b7b->\\u6d3b\\n    01: \\u6d3b->\\u6b7b\\n    11: \\u6d3b->\\u6d3b\\n    */\\n    class Solution {\\n    public:\\n        void gameOfLife(vector<vector<int>>& board) {\\n            int d[][2] = {{1,-1},{1,0},{1,1},{0,-1},{0,1},{-1,-1},{-1,0},{-1,1}};\\n            for(int i = 0; i < board.size(); i++){\\n                for(int j = 0; j < board[0].size(); j++){\\n                    int live = 0;\\n                    for(int k = 0; k < 8; k++){\\n                        int x = d[k][0] + i;\\n                        int y = d[k][1] + j;\\n                        if(x < 0 || x >= board.size() || y < 0 || y >= board[0].size()) {\\n                            continue;\\n                        }\\n                        if(board[x][y] & 1) {\\n                            live++;\\n                        }\\n                    }\\n                    // \\u6b7b\\u7684\\n                    if(board[i][j] == 0) {\\n                        if(live == 3){\\n                            board[i][j] = 2; // 2 : (10)\\n                        }\\n                    }\\n                    // \\u6d3b\\u7684\\n                    else {\\n                        if(live < 2 || live > 3){\\n                            board[i][j] = 1; // 1 : (01)\\n                        }else{\\n                            board[i][j] = 3; // 3 : (11)   \\n                        }\\n                    }\\n                }\\n            }\\n            for(int i = 0; i < board.size(); i++){\\n                for(int j=0; j < board[0].size(); j++){\\n                    board[i][j] >>=1;\\n                }\\n            }\\n        }\\n    };enter code here"
		},
		{
			"lc_ans_id":"73366",
			"view":"8433",
			"top":"4",
			"title":"Clean O(1) space O(mn) time Java Solution",
			"vote":"39",
			"content":"    public class Solution {\\n    int[][] dir ={{1,-1},{1,0},{1,1},{0,-1},{0,1},{-1,-1},{-1,0},{-1,1}};\\n    public void gameOfLife(int[][] board) {\\n        for(int i=0;i<board.length;i++){\\n            for(int j=0;j<board[0].length;j++){\\n                int live=0;\\n                for(int[] d:dir){\\n                    if(d[0]+i<0 || d[0]+i>=board.length || d[1]+j<0 || d[1]+j>=board[0].length) continue;\\n                    if(board[d[0]+i][d[1]+j]==1 || board[d[0]+i][d[1]+j]==2) live++;\\n                }\\n                if(board[i][j]==0 && live==3) board[i][j]=3;\\n                if(board[i][j]==1 && (live<2 || live>3)) board[i][j]=2;\\n            }\\n        }\\n        for(int i=0;i<board.length;i++){\\n            for(int j=0;j<board[0].length;j++){\\n                board[i][j] %=2;\\n            }\\n        }\\n    }\\n}"
		},
		{
			"lc_ans_id":"73335",
			"view":"2124",
			"top":"5",
			"title":"C++ O(mn)-time, O(1)-space sol",
			"vote":"30",
			"content":"First this solution does not involve bit-manipulation and only involves addition of integers.\\n\\nThe idea is to go through the matrix from top-left corner to the bottom-right corner, and check only 4 cells (\"accumulate\" scores \"for both cells\" if the other cell is originally a 1). Graphically speaking, it is like this: \\n\\n    O O O \\n    O @ X\\n    X X X\\n\\nwhere the @ cell is the one that you are working on, 0 cells are those you have gone through (don't work on them again!), and the X cells are those you have not gone through and should work on. For example, if one X cell is originally a 1, you should add C (a constant) to @ cell, and simultaneously if @ cell is originally a 1, you add C to that X  cell. \\n\\nThe constant C can be 2. If it is 2 then when you will find that after done working on the current cell if it's value is 5 or 7 (cell @ is originally a 1 and have 2 or 3 neighbours) or 6 (cell @ is originally a 0 and have 3 neighbours), then you should reset it to be 1 (live), otherwise reset it to be zero (dead). And when accumulating scores, you know a cell is originally a 1 if it has odd-numbered score, and it is originally a 0 if it has even-numbered score. The code is\\n\\n    class Solution {\\n    public:\\n        void gameOfLife(vector<vector<int>>& board) {\\n            if(board.empty()) return;\\n            const int m = board.size();\\n            const int n = board[0].size();\\n            for(int i=0; i<m; i++) {\\n                for(int j=0; j<n; j++) {\\n                    check(board,i,j,i+1,j-1);\\n                    check(board,i,j,i+1,j);\\n                    check(board,i,j,i+1,j+1);\\n                    check(board,i,j,i,j+1);\\n                    if(board[i][j]>=5 && board[i][j]<=7) board[i][j]=1;\\n                    else board[i][j]=0;\\n                }\\n            }\\n        }\\n    private:\\n        void check(vector<vector<int>>& board, int i, int j, int a, int b) {\\n            const int m = board.size();\\n            const int n = board[0].size();\\n            if(a>=m || b<0 || b>=n) return;\\n            if(board[i][j]%2!=0) board[a][b]+=2;\\n            if(board[a][b]%2!=0) board[i][j]+=2;\\n        } \\n    };"
		},
		{
			"lc_ans_id":"73255",
			"view":"2297",
			"top":"6",
			"title":"What if the input matrix is a boolean[][]?",
			"vote":"21",
			"content":"It seems that encoding inside original int[][] just utilized spare spaces from matrix. What if the input matrix is a boolean matrix? Is there still a way to solve it without extra space? Thanks."
		},
		{
			"lc_ans_id":"73216",
			"view":"3413",
			"top":"7",
			"title":"Java Solution using 2 bits: beats 99.75%",
			"vote":"18",
			"content":"       \\n    // use the 1st bit to represent next generation \\n    // use the 2nd bit to present current generation\\n\\n     public class Solution {\\n            public void gameOfLife(int[][] board) {\\n                int rows=board.length;\\n                int cols=board[0].length;\\n                for(int i=0;i<rows;++i){\\n                    for(int j=0;j<cols;++j){\\n                        int neighbors = getNeighbour(board, i, j);\\n                        if(board[i][j]==1){\\n                            if(neighbors==2 || neighbors==3)\\n                                board[i][j]=3;\\n                        }else{\\n                            if(neighbors==3)\\n                                board[i][j]=2;\\n                        }\\n                    }\\n                }    \\n                for(int i=0;i<rows;++i){\\n                    for(int j=0;j<cols;++j){\\n                        board[i][j]>>=1;\\n                    }\\n                }\\n            }\\n            \\n            private int getNeighbour(int[][] board, int row, int col){\\n                int cnt=0;\\n                for(int i=row-1;i<=row+1;++i){\\n                    for(int j=col-1;j<=col+1;++j){\\n                        if(i>=0 && i<board.length && j>=0 && j<board[0].length){\\n                            cnt += board[i][j]&1;\\n                        }\\n                    }\\n                }\\n                cnt-=board[row][col]&1;\\n                return cnt;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"73229",
			"view":"3283",
			"top":"8",
			"title":"Python solution, easy to understand..",
			"vote":"16",
			"content":"0,2 are \"dead\", and \"dead->live\"\\n1,3 are \"live\", and \"live->dead\"\\n\\n    def gameOfLife(self, board):\\n        m,n = len(board), len(board[0])\\n        for i in range(m):\\n            for j in range(n):\\n                if board[i][j] == 0 or board[i][j] == 2:\\n                    if self.nnb(board,i,j) == 3:\\n                        board[i][j] = 2\\n                else:\\n                    if self.nnb(board,i,j) < 2 or self.nnb(board,i,j) >3:\\n                        board[i][j] = 3\\n        for i in range(m):\\n            for j in range(n):\\n                if board[i][j] == 2: board[i][j] = 1\\n                if board[i][j] == 3: board[i][j] = 0\\n                \\n    def nnb(self, board, i, j):\\n        m,n = len(board), len(board[0])\\n        count = 0\\n        if i-1 >= 0 and j-1 >= 0:   count += board[i-1][j-1]%2\\n        if i-1 >= 0:                count += board[i-1][j]%2\\n        if i-1 >= 0 and j+1 < n:    count += board[i-1][j+1]%2\\n        if j-1 >= 0:                count += board[i][j-1]%2\\n        if j+1 < n:                 count += board[i][j+1]%2\\n        if i+1 < m and j-1 >= 0:    count += board[i+1][j-1]%2\\n        if i+1 < m:                 count += board[i+1][j]%2\\n        if i+1 < m and j+1 < n:     count += board[i+1][j+1]%2\\n        return count"
		},
		{
			"lc_ans_id":"73244",
			"view":"1932",
			"top":"9",
			"title":"Clear Java Solution",
			"vote":"12",
			"content":"    public class Solution {\\n        public void gameOfLife(int[][] board) {\\n            int m = board.length, n = board[0].length;\\n            int[][] result = new int[m][n];\\n            for (int i = 0; i < m; i++) {\\n                for (int j = 0; j < n; j++) {\\n                    int countLive = 0;\\n                    for (int p = Math.max(i-1,0); p < Math.min(i+2,m); p++) {\\n                        for (int q = Math.max(j-1,0); q < Math.min(j+2,n); q++) {\\n                            if (board[p][q]==2||board[p][q]==1) countLive++;//count status 0 is live\\n                        }\\n                    }\\n                    countLive -= board[i][j];\\n                    if (board[i][j] == 0 && countLive == 3) board[i][j] = 3; //status 0 is dead,next status is live\\n                    if (board[i][j] == 1 && (countLive < 2 || countLive > 3)) board[i][j] = 2; //status 0 is live,next status is dead\\n                    \\n                }\\n            }\\n            for (int i = 0; i < m; i++) {\\n                for (int j = 0; j < n; j++) {\\n                    board[i][j] %= 2;\\n                }\\n            }\\n        }\\n    }"
		}
	],
	"id":"289",
	"title":"Game of Life",
	"content":"<p>\r\nAccording to the <a href=\"https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life\" target=\"_blank\">Wikipedia's article</a>: \"The <b>Game of Life</b>, also known simply as <b>Life</b>, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.\"\r\n</p>\r\n\r\n<p>\r\nGiven a <i>board</i> with <i>m</i> by <i>n</i> cells, each cell has an initial state <i>live</i> (1) or <i>dead</i> (0). Each cell interacts with its <a href=\"https://en.wikipedia.org/wiki/Moore_neighborhood\" target=\"_blank\">eight neighbors</a> (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):\r\n</p>\r\n\r\n<p>\r\n<ol>\r\n<li>Any live cell with fewer than two live neighbors dies, as if caused by under-population.</li>\r\n<li>Any live cell with two or three live neighbors lives on to the next generation.</li>\r\n<li>Any live cell with more than three live neighbors dies, as if by over-population..</li>\r\n<li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>\r\n</ol>\r\n</p>\r\n\r\n<p>\r\nWrite a function to compute the next state (after one update) of the board given its current state.</p>\r\n\r\n<p>\r\n<b>Follow up</b>: <br>\r\n<ol>\r\n<li>Could you solve it in-place? Remember that the board needs to be updated at the same time: You cannot update some cells first and then use their updated values to update other cells.</li>\r\n<li>In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches the border of the array. How would you address these problems?</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"465",
	"ac_num":"60889"
}