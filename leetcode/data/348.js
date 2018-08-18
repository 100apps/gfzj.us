{
	"difficulty":"2",
	"submit_num":"44457",
	"show_id":"348",
	"leetcode_id":"348",
	"answers":[
		{
			"lc_ans_id":"81898",
			"view":"19390",
			"top":"0",
			"title":"Java O(1) solution, easy to understand",
			"vote":"171",
			"content":"Initially, I had not read the Hint in the question and came up with an O(n) solution.  After reading the extremely helpful hint; a much easier approach became apparent.  The key observation is that in order to win Tic-Tac-Toe you must have the entire row or column.  Thus, we don't need to keep track of an entire n^2 board.  We only need to keep a count for each row and column.  If at any time a row or column matches the size of the board then that player has won. \\n\\nTo keep track of which player, I add one for Player1 and -1 for Player2.  There are two additional variables to keep track of the count of the diagonals.  Each time a player places a piece we just need to check the count of that row, column, diagonal and anti-diagonal. \\n\\nAlso see a very similar answer that I believe had beaten me to the punch.  We came up with our solutions independently but they are very similar in principle. \\n[Aeonaxx's soln][1]\\n\\n    public class TicTacToe {\\n    private int[] rows;\\n    private int[] cols;\\n    private int diagonal;\\n    private int antiDiagonal;\\n    \\n    /** Initialize your data structure here. */\\n    public TicTacToe(int n) {\\n        rows = new int[n];\\n        cols = new int[n];\\n    }\\n    \\n    /** Player {player} makes a move at ({row}, {col}).\\n        @param row The row of the board.\\n        @param col The column of the board.\\n        @param player The player, can be either 1 or 2.\\n        @return The current winning condition, can be either:\\n                0: No one wins.\\n                1: Player 1 wins.\\n                2: Player 2 wins. */\\n    public int move(int row, int col, int player) {\\n        int toAdd = player == 1 ? 1 : -1;\\n        \\n        rows[row] += toAdd;\\n        cols[col] += toAdd;\\n        if (row == col)\\n        {\\n            diagonal += toAdd;\\n        }\\n        \\n        if (col == (cols.length - row - 1))\\n        {\\n            antiDiagonal += toAdd;\\n        }\\n        \\n        int size = rows.length;\\n        if (Math.abs(rows[row]) == size ||\\n            Math.abs(cols[col]) == size ||\\n            Math.abs(diagonal) == size  ||\\n            Math.abs(antiDiagonal) == size)\\n        {\\n            return player;\\n        }\\n        \\n        return 0;\\n    }\\n}\\n\\n\\n  [1]: https://leetcode.com/discuss/101123/simple-o-1-time-c-solution-following-provided-hints"
		},
		{
			"lc_ans_id":"81913",
			"view":"4255",
			"top":"1",
			"title":"Simple O(1) time C++ solution following provided hints",
			"vote":"15",
			"content":"    class TicTacToe {\\n    public:\\n        TicTacToe(int n) : sz(n) {\\n            rows.resize(n, 0), cols.resize(n, 0);\\n            diagonal = anti_diagonal = 0;\\n        }\\n        \\n        int move(int row, int col, int player) {\\n            if (player == 1) {\\n                ++rows[row], ++cols[col];\\n                if (row == col)\\n                    ++diagonal;\\n                if (row == sz - 1 - col)\\n                    ++anti_diagonal;\\n                if (rows[row] == sz || cols[col] == sz || diagonal == sz || anti_diagonal == sz)\\n                    return 1;\\n            }\\n            else {\\n                --rows[row], --cols[col];\\n                if (row == col)\\n                    --diagonal;\\n                if (row == sz - 1 - col)\\n                    --anti_diagonal;\\n                if (rows[row] == -sz || cols[col] == -sz || diagonal == -sz || anti_diagonal == -sz)\\n                    return 2;\\n            }\\n            return 0;\\n        }\\n    \\n    private:\\n        vector<int> rows, cols;\\n        int diagonal, anti_diagonal;\\n        int sz;\\n    };"
		},
		{
			"lc_ans_id":"81912",
			"view":"2091",
			"top":"2",
			"title":"C++ time O(1) space O(n) short simple solution",
			"vote":"10",
			"content":"new version:\\n\\n    class TicTacToe {\\n    private:\\n        //count parameter: player 1 + : player 2: -\\n        vector<int> rowJudge;\\n        vector<int> colJudge;\\n        int diag, anti;\\n        int total;\\n    public:\\n        /** Initialize your data structure here. */\\n\\n        TicTacToe(int n):total(n), rowJudge(n), colJudge(n),diag(0),anti(0){}\\n    \\n        int move(int row, int col, int player) {\\n            int add = player == 1 ? 1 : -1;\\n            diag += row == col ? add : 0;\\n            anti += row == total - col - 1 ? add : 0;\\n            rowJudge[row] += add;\\n            colJudge[col] += add;\\n            if(abs(rowJudge[row]) == total || abs(colJudge[col]) == total || abs(diag) == total || abs(anti) == total) \\n                return player;\\n            return 0;\\n        }\\n    };\\n\\nold version:\\n\\n    class TicTacToe {\\n    private:\\n        //status:\\n        // 0: no one fill\\n        // 1 or 2: player fill\\n        //-1 : invalid\\n        //pair: \\n        //first:player, second:count\\n        vector<pair<int,int>> rowJudge;\\n        vector<pair<int,int>> colJudge;\\n        pair<int,int> diag, anti;\\n        int total;\\n    public:\\n        /** Initialize your data structure here. */\\n        TicTacToe(int n):total(n), rowJudge(n), colJudge(n){}\\n        \\n        /** Player {player} makes a move at ({row}, {col}).\\n            @param row The row of the board.\\n            @param col The column of the board.\\n            @param player The player, can be either 1 or 2.\\n            @return The current winning condition, can be either:\\n                    0: No one wins.\\n                    1: Player 1 wins.\\n                    2: Player 2 wins. */\\n        int move(int row, int col, int player) {\\n            if(rowJudge[row].first == 0 || rowJudge[row].first == player){\\n                rowJudge[row].first = player;\\n                rowJudge[row].second++;\\n                if(rowJudge[row].second == total){\\n                    return player;\\n                }\\n            }\\n            else {\\n                rowJudge[row].first = -1;\\n            }\\n            \\n            if(colJudge[col].first == 0 || colJudge[col].first == player){\\n                colJudge[col].first = player;\\n                colJudge[col].second++;\\n                if(colJudge[col].second == total){\\n                    return player;\\n                }\\n            }\\n            else {\\n                colJudge[col].first = -1;\\n            }\\n            \\n            \\n            if(row == col){\\n                if(diag.first == 0 || diag.first == player){\\n                    diag.first = player;\\n                    diag.second++;\\n                    if(diag.second == total){\\n                        return player;\\n                    }\\n                }\\n                else{\\n                    diag.first = -1;\\n                }\\n            }\\n            if(row + col == total - 1){\\n                if(anti.first == 0 || anti.first == player){\\n                    anti.first = player;\\n                    anti.second++;\\n                    if(anti.second == total){\\n                        return player;\\n                    }\\n                }\\n                else{\\n                    anti.first = -1;\\n                }\\n            }\\n            return 0;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"81896",
			"view":"3638",
			"top":"3",
			"title":"7/8 lines O(1) Java/Python",
			"vote":"7",
			"content":"**Java**\\n\\n    public class TicTacToe {\\n    \\n        public TicTacToe(int n) {\\n            count = new int[6*n][3];\\n        }\\n        \\n        public int move(int row, int col, int player) {\\n            int n = count.length / 6;\\n            for (int x : new int[]{row, n+col, 2*n+row+col, 5*n+row-col})\\n                if (++count[x][player] == n)\\n                    return player;\\n            return 0;\\n        }\\n        \\n        int[][] count;\\n    }\\n\\n**Python**\\n\\n    class TicTacToe(object):\\n        def __init__(self, n):\\n            count = collections.Counter()\\n            def move(row, col, player):\\n                for i, x in enumerate((row, col, row+col, row-col)):\\n                    count[i, x, player] += 1\\n                    if count[i, x, player] == n:\\n                        return player\\n                return 0\\n            self.move = move"
		},
		{
			"lc_ans_id":"81939",
			"view":"554",
			"top":"4",
			"title":"Easy understanding java solution",
			"vote":"4",
			"content":"    int[] rows, cols;\\n    int diagonal, anti_diagonal, target;\\n    \\n    public TicTacToe(int n) {\\n        rows = new int[n];\\n        cols = new int[n];\\n        diagonal = 0;\\n        anti_diagonal = 0;\\n        target = n;\\n    }\\n    \\n    public int move(int row, int col, int player) {\\n        int sign = player == 1 ? 1 : -1, res = sign * target;\\n        rows[row] += sign;\\n        cols[col] += sign;\\n        if(row == col) diagonal += sign;\\n        if(row == target-1-col) anti_diagonal += sign;\\n        if(rows[row] == res || cols[col] == res || diagonal == res || anti_diagonal == res) return player;\\n        else return 0;\\n    }"
		},
		{
			"lc_ans_id":"81946",
			"view":"1573",
			"top":"5",
			"title":"Share my Java Solution",
			"vote":"4",
			"content":"\\n    \\n    public class TicTacToe {\\n    \\n    \\tprivate int[] rows;\\n    \\tprivate int[] cols;\\n    \\tprivate int size;\\n    \\tprivate int diagonal;\\n    \\tprivate int anti_diagonal;\\n    \\t/** Initialize your data structure here. */\\n        public TicTacToe(int n) {\\n        \\tsize = n;\\n            rows = new int[n];\\n            cols = new int[n];\\n        }\\n        \\n        /** Player {player} makes a move at ({row}, {col}).\\n            @param row The row of the board.\\n            @param col The column of the board.\\n            @param player The player, can be either 1 or 2.\\n            @return The current winning condition, can be either:\\n                    0: No one wins.\\n                    1: Player 1 wins.\\n                    2: Player 2 wins. */\\n        public int move(int row, int col, int player) {\\n            int add = player == 1 ? 1 : -1;\\n            if(col == row){\\n            \\tdiagonal += add;\\n            }\\n            if(col == size - 1 - row){\\n            \\tanti_diagonal += add;\\n            }\\n            rows[row] += add;\\n            cols[col] += add;\\n            if(Math.abs(rows[row]) == size || Math.abs(cols[col]) == size|| Math.abs(diagonal) == size || Math.abs(anti_diagonal) == size){\\n            \\treturn player;\\n            }\\n            return 0;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"81932",
			"view":"475",
			"top":"6",
			"title":"Python 13 lines, easy to understand",
			"vote":"2",
			"content":"Record the number of moves for each rows, columns, and two diagonals.\\nFor each move, we -1 for each player 1's move and +1 for player 2's move.\\nThen we just need to check whether any of the recored numbers equal to n or -n.\\n\\n```\\nclass TicTacToe(object):\\n\\n    def __init__(self, n):\\n        self.row, self.col, self.diag, self.anti_diag, self.n = [0] * n, [0] * n, 0, 0, n\\n        \\n    def move(self, row, col, player):\\n        offset = player * 2 - 3\\n        self.row[row] += offset\\n        self.col[col] += offset\\n        if row == col:\\n            self.diag += offset\\n        if row + col == self.n - 1:\\n            self.anti_diag += offset\\n        if self.n in [self.row[row], self.col[col], self.diag, self.anti_diag]:\\n            return 2\\n        if -self.n in [self.row[row], self.col[col], self.diag, self.anti_diag]:\\n            return 1\\n        return 0\\n```"
		},
		{
			"lc_ans_id":"81936",
			"view":"400",
			"top":"7",
			"title":"C++ Solution with O(1) time complexity for move and O(n) space",
			"vote":"2",
			"content":"    class TicTacToe {\\n    public:\\n        /** Initialize your data structure here. */\\n        TicTacToe(int n) {\\n            rows.resize(n);\\n            cols.resize(n);\\n            diag = antidiag = 0;\\n            bnd = n;\\n        }\\n        \\n        /** Player {player} makes a move at ({row}, {col}).\\n            @param row The row of the board.\\n            @param col The column of the board.\\n            @param player The player, can be either 1 or 2.\\n            @return The current winning condition, can be either:\\n                    0: No one wins.\\n                    1: Player 1 wins.\\n                    2: Player 2 wins. */\\n        int move(int row, int col, int player) {\\n            int res = 0;\\n            int add = player == 1?1:-1;\\n            rows[row] += add;\\n            cols[col] += add;\\n            diag += row == col?add:0;\\n            antidiag += row == bnd - 1 - col?add:0;\\n            if(abs(rows[row]) == bnd || abs(cols[col]) == bnd || abs(diag) == bnd || abs(antidiag) == bnd )\\n                res = player == 1?1:2;\\n            return res;\\n        }\\n    private:\\n    vector<int> rows, cols;\\n    int bnd, diag, antidiag;\\n    };\\n    \\n    /**\\n     * Your TicTacToe object will be instantiated and called as such:\\n     * TicTacToe obj = new TicTacToe(n);\\n     * int param_1 = obj.move(row,col,player);\\n     */"
		},
		{
			"lc_ans_id":"81938",
			"view":"637",
			"top":"8",
			"title":"Simple Java O(1) time O(N) Space",
			"vote":"2",
			"content":"    public class TicTacToe {\\n        \\n        int size;\\n        int[][] h, v, d;\\n    \\n        /** Initialize your data structure here. */\\n        public TicTacToe(int n) {\\n            \\n            h = new int[2][n];\\n            v = new int[2][n];\\n            d = new int[2][2];\\n            size = n;\\n        }\\n        \\n        /** Player {player} makes a move at ({row}, {col}).\\n            @param row The row of the board.\\n            @param col The column of the board.\\n            @param player The player, can be either 1 or 2.\\n            @return The current winning condition, can be either:\\n                    0: No one wins.\\n                    1: Player 1 wins.\\n                    2: Player 2 wins. */\\n        public int move(int row, int col, int player) {\\n            \\n            h[player-1][row] += 1;\\n            v[player-1][col] += 1;\\n            \\n            if ( row == col )\\n                d[player-1][0] += 1;\\n            if ( row + col == size - 1 )\\n                d[player-1][1] += 1;\\n                \\n            if ( h[player-1][row] == size || v[player-1][col] == size || d[player-1][0] == size || d[player-1][1] == size )\\n                return player;\\n            else\\n                return 0;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"81925",
			"view":"140",
			"top":"9",
			"title":"Python O(1) Time For Move, O(n) Space",
			"vote":"1",
			"content":"    class TicTacToe(object):\\n    \\n        def __init__(self, n):\\n            self.n = n\\n            self.rows = [0 for _ in range(n)]\\n            self.colums = [0 for _ in range(n)]\\n            self.diag = [0,0]\\n    \\n        def move(self, row, col, player):\\n            value = (1.5 - player) * 2\\n            self.rows[row] += value\\n            self.colums[col] += value\\n            if row == col:\\n                self.diag[0] += value\\n            if row + col == self.n-1:\\n                self.diag[1] += value\\n            if abs(self.rows[row]) == self.n or abs(self.colums[col]) == self.n or abs(self.diag[0]) == self.n or abs(self.diag[1]) == self.n:\\n                return player\\n            return 0"
		}
	],
	"id":"348",
	"title":"Design Tic-Tac-Toe",
	"content":"<p>Design a Tic-tac-toe game that is played between two players on a <i>n</i> x <i>n</i> grid.\r\n</p>\r\n\r\n<p>You may assume the following rules:\r\n<ol>\r\n<li>A move is guaranteed to be valid and is placed on an empty block.</li>\r\n<li>Once a winning condition is reached, no more moves is allowed.</li>\r\n<li>A player who succeeds in placing <i>n</i> of their marks in a horizontal, vertical, or diagonal row wins the game.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\nGiven <i>n</i> = 3, assume that player 1 is \"X\" and player 2 is \"O\" in the board.\r\n\r\nTicTacToe toe = new TicTacToe(3);\r\n\r\ntoe.move(0, 0, 1); -> Returns 0 (no one wins)\r\n|X| | |\r\n| | | |    // Player 1 makes a move at (0, 0).\r\n| | | |\r\n\r\ntoe.move(0, 2, 2); -> Returns 0 (no one wins)\r\n|X| |O|\r\n| | | |    // Player 2 makes a move at (0, 2).\r\n| | | |\r\n\r\ntoe.move(2, 2, 1); -> Returns 0 (no one wins)\r\n|X| |O|\r\n| | | |    // Player 1 makes a move at (2, 2).\r\n| | |X|\r\n\r\ntoe.move(1, 1, 2); -> Returns 0 (no one wins)\r\n|X| |O|\r\n| |O| |    // Player 2 makes a move at (1, 1).\r\n| | |X|\r\n\r\ntoe.move(2, 0, 1); -> Returns 0 (no one wins)\r\n|X| |O|\r\n| |O| |    // Player 1 makes a move at (2, 0).\r\n|X| |X|\r\n\r\ntoe.move(1, 0, 2); -> Returns 0 (no one wins)\r\n|X| |O|\r\n|O|O| |    // Player 2 makes a move at (1, 0).\r\n|X| |X|\r\n\r\ntoe.move(2, 1, 1); -> Returns 1 (player 1 wins)\r\n|X| |O|\r\n|O|O| |    // Player 1 makes a move at (2, 1).\r\n|X|X|X|\r\n</pre>\r\n</p>\r\n\r\n<p><b>Follow up:</b><br />\r\nCould you do better than O(<i>n</i><sup>2</sup>) per <code>move()</code> operation?\r\n</p>",
	"frequency":"265",
	"ac_num":"20461"
}