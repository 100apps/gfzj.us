{
	"difficulty":"2",
	"submit_num":"60940",
	"show_id":"419",
	"leetcode_id":"419",
	"answers":[
		{
			"lc_ans_id":"90902",
			"view":"23137",
			"top":"0",
			"title":"Simple Java Solution",
			"vote":"127",
			"content":"Going over all cells, we can count only those that are the \"first\" cell of the battleship. First cell will be defined as the most top-left cell. We can check for first cells by only counting cells that do not have an 'X' to the left _and_ do not have an 'X' above them.\\n\\n```\\n\\n    public int countBattleships(char[][] board) {\\n        int m = board.length;\\n        if (m==0) return 0;\\n        int n = board[0].length;\\n        \\n        int count=0;\\n        \\n        for (int i=0; i<m; i++) {\\n            for (int j=0; j<n; j++) {\\n                if (board[i][j] == '.') continue;\\n                if (i > 0 && board[i-1][j] == 'X') continue;\\n                if (j > 0 && board[i][j-1] == 'X') continue;\\n                count++;\\n            }\\n        }\\n        \\n        return count;\\n    }\\n```"
		},
		{
			"lc_ans_id":"90913",
			"view":"9206",
			"top":"1",
			"title":"Share my 7-line code, 1-line core code, 3ms, super easy",
			"vote":"39",
			"content":"No need to modify the input matrix.\\n\\n\\n```\\npublic int countBattleships(char[][] board) {\\n    int count = 0;\\n    for(int i=0;i<board.length;i++)\\n        for(int j=0;j<board[0].length;j++)\\n            if(board[i][j]=='X' && (i==0 || board[i-1][j]!='X') && (j==0 || board[i][j-1]!='X')) count++;\\n    return count;\\n}\\n```"
		},
		{
			"lc_ans_id":"90912",
			"view":"4327",
			"top":"2",
			"title":"Python solution",
			"vote":"14",
			"content":"```\\nclass Solution(object):\\n    def countBattleships(self, board):\\n        if len(board) == 0: return 0\\n        m, n = len(board), len(board[0])\\n        count = 0\\n        for i in range(m):\\n            for j in range(n):\\n                if board[i][j] == 'X' and (i == 0 or board[i-1][j] == '.') and (j == 0 or board[i][j-1] == '.'):\\n                    count += 1\\n        return count\\n```"
		},
		{
			"lc_ans_id":"90901",
			"view":"2890",
			"top":"3",
			"title":"Confused with test cases",
			"vote":"11",
			"content":"[\"XXXX\",\"...X\",\"...X\"] returns 1\\n[\".X..\",\"XXXX\",\".X..\"] returns 2\\nwhat's the rule here?"
		},
		{
			"lc_ans_id":"90940",
			"view":"2670",
			"top":"4",
			"title":"4ms Java Optimized code",
			"vote":"9",
			"content":"> A `head` of a battleship means the `top most` or `left most` cell with value 'X'.\\nThus, we only need to count those `heads`.\\n\\nThere are three rules to tell if a cell is a 'head':\\n* The cell is a 'X' (`board[i][j] == 'X'`)\\n* No left side neighbor, or the left neighbor is a '.' (`i == 0 || board[i - 1][j] == '.'`)\\n* No right side neighbor, or the right neighbor is a '.' (`j == 0 || board[i][j - 1] == '.'`)\\n\\nCode:\\n```\\npublic int countBattleships(char[][] board) {\\n\\tif (board == null || board.length == 0 || board[0].length == 0) return 0;\\n\\tint R = board.length, C = board[0].length, cnt = 0;\\n\\tfor (int i = 0; i < R; i++) {\\n\\t\\tfor (int j = 0; j < C; j++) {\\n\\t\\t\\tif (board[i][j] == 'X' && (i == 0 || board[i - 1][j] == '.') && (j == 0 || board[i][j - 1] == '.'))\\n\\t\\t\\t\\tcnt++;\\n\\t\\t}\\n\\t}\\n\\t\\n\\treturn cnt;\\n}\\n```\\n\\n...Note...\\nFor a statement like `if (A && B && C)`, when `A` is false, the program will not compute `B` and `C`.\\nSo, for the best performance, we write the program in this way, instead of using a lot of if statements."
		},
		{
			"lc_ans_id":"90909",
			"view":"2228",
			"top":"5",
			"title":"C++ 3ms 6 lines solution with runtime O(n) and space O(1)",
			"vote":"8",
			"content":"Idea is to define upper left ```X``` as the head of battle ship. We simply need to count the number of heads.\\n\\n```\\nint countBattleships(vector<vector<char>>& board) {\\n        if (board.empty() || board[0].empty()) { return 0; }\\n        int m = board.size(), n = board[0].size(), cnt = 0;\\n        \\n        for (int r = 0; r < m; r++)\\n            for (int c = 0; c < n; c++)\\n                cnt += board[r][c] == 'X' && (r == 0 || board[r - 1][c] != 'X') && (c == 0 || board[r][c - 1] != 'X');\\n        \\n        return cnt;\\n}\\n```"
		},
		{
			"lc_ans_id":"90957",
			"view":"4242",
			"top":"6",
			"title":"DFS & BFS Flood Fill Algorithm with C++",
			"vote":"6",
			"content":"Standard Flood Fill algorithm implementation.\\n\\nDFS:\\n```\\nclass Solution {\\npublic:\\n    int m, n; \\n    vector<vector<bool>> flag;\\n    int go[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\\n\\n    void dfs(vector<vector<char>>& board, int i, int j) {\\n        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] == '.' || flag[i][j]) return;\\n        flag[i][j] = true;\\n        for (int d = 0; d < 4; ++d) dfs(board, i+go[d][0], j+go[d][1]);\\n    }\\n\\n    int countBattleships(vector<vector<char>>& board) {\\n        if (board.empty()) return 0;\\n        m = board.size(), n = board[0].size();\\n        flag.resize(m, vector<bool>(n, false));\\n        int result = 0;\\n        for (int i = 0; i < m; ++i)\\n            for (int j = 0; j < n; ++j)\\n                if (board[i][j] == 'X' && !flag[i][j]) {\\n                    ++result;\\n                    dfs(board, i, j);\\n                }\\n        return result;\\n    }\\n};\\n```\\n\\nBFS:\\n```\\nclass Solution {\\npublic:\\n    int go[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\\n    int countBattleships(vector<vector<char>>& board) {\\n        if (board.empty()) return 0;\\n        int m = board.size(), n = board[0].size();\\n        vector<vector<bool>> flag(m, vector<bool>(n, false));\\n        int result = 0;\\n        for (int i = 0; i < m; ++i) {\\n            for (int j = 0; j < n; ++j) {\\n                if (board[i][j] == 'X' && !flag[i][j]) {\\n                    ++result;\\n\\n                    queue<pair<int, int>> q;\\n                    q.push({i, j});\\n                    while (!q.empty()) {\\n                        auto t = q.front(); q.pop();\\n                        flag[t.first][t.second] = true;\\n                        for (int d = 0; d < 4; ++d) {\\n                            int ni = t.first+go[d][0], nj = t.second+go[d][1];\\n                            if (ni < 0 || ni >= m || nj < 0 || nj >= n || board[ni][nj] == '.' || flag[ni][nj]) continue;\\n                            q.push({ni, nj});\\n                        }\\n                    }\\n                }\\n            }\\n        }\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"90935",
			"view":"916",
			"top":"7",
			"title":"O(n^2) time and O(1) space without modifying the board",
			"vote":"5",
			"content":"```\\npublic class Solution {\\n    public int countBattleships(char[][] board) {\\n        int count = 0;\\n        for (int i = 0; i < board.length; i++) {\\n            for (int j = 0; j < board[0].length; j++) {\\n                if (board[i][j] == 'X' && (i == 0 || board[i-1][j] == '.') && (j == 0 || board[i][j-1] == '.')) {\\n                    count++;\\n                }\\n            }\\n        }\\n        return count;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"90985",
			"view":"726",
			"top":"8",
			"title":"Very easy to understand java solution",
			"vote":"3",
			"content":"```\\n    public int countBattleships(char[][] board) {\\n        int result = 0;\\n        for (int i = 0; i < board.length; i++) {\\n            for (int j = 0; j < board[0].length; j++) {\\n                if (board[i][j] == 'X' &&\\n                        (i == 0 || board[i - 1][j] == '.') &&\\n                        (j == 0 || board[i][j - 1] == '.')) {\\n                    result++;\\n                }\\n\\n            }\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"90910",
			"view":"160",
			"top":"9",
			"title":"Description is completely wrong",
			"vote":"2",
			"content":"Based on the description, there is no way that there are two different battleships in the following array.\\n\\n```\\nX..X\\n...X\\n...X\\n```"
		}
	],
	"id":"419",
	"title":"Battleships in a Board",
	"content":"Given an 2D board, count how many battleships are in it. The battleships are represented with <code>'X'</code>s, empty slots are represented with <code>'.'</code>s. You may assume the following rules:\r\n\r\n<ul>\r\n<li>You receive a valid board, made of only battleships or empty slots.</li>\r\n<li>Battleships can only be placed horizontally or vertically. In other words, they can only be made of the shape <code>1xN</code> (1 row, N columns) or <code>Nx1</code> (N rows, 1 column), where N can be of any size.</li>\r\n<li>At least one horizontal or vertical cell separates between two battleships - there are no adjacent battleships.</li>\r\n</ul>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>X..X\r\n...X\r\n...X\r\n</pre>\r\nIn the above board there are 2 battleships.\r\n\r\n<p><b>Invalid Example:</b><br />\r\n<pre>...X\r\nXXXX\r\n...X\r\n</pre>\r\nThis is an invalid board that you will not receive - as battleships will always have a cell separating between them.\r\n<p></p>\r\n<p><b>Follow up:</b><br>Could you do it in <b>one-pass</b>, using only <b>O(1) extra memory</b> and <b>without modifying</b> the value of the board?</p>",
	"frequency":"523",
	"ac_num":"38202"
}