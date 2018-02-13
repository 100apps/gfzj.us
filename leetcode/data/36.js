{
	"difficulty":"2",
	"submit_num":"383862",
	"show_id":"36",
	"leetcode_id":"36",
	"answers":[
		{
			"lc_ans_id":"15464",
			"view":"33540",
			"top":"0",
			"title":"My short solution by C++. O(n2)",
			"vote":"234",
			"content":"Three flags are used to check whether a number appear.\\n\\nused1: check each row\\n\\nused2: check each column\\n\\nused3: check each sub-boxes\\n \\n    class Solution\\n    {\\n    public:\\n        bool isValidSudoku(vector<vector<char> > &board)\\n        {\\n            int used1[9][9] = {0}, used2[9][9] = {0}, used3[9][9] = {0};\\n            \\n            for(int i = 0; i < board.size(); ++ i)\\n                for(int j = 0; j < board[i].size(); ++ j)\\n                    if(board[i][j] != '.')\\n                    {\\n                        int num = board[i][j] - '0' - 1, k = i / 3 * 3 + j / 3;\\n                        if(used1[i][num] || used2[j][num] || used3[k][num])\\n                            return false;\\n                        used1[i][num] = used2[j][num] = used3[k][num] = 1;\\n                    }\\n            \\n            return true;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"15450",
			"view":"32514",
			"top":"1",
			"title":"Shared my concise Java code",
			"vote":"222",
			"content":"    public boolean isValidSudoku(char[][] board) {\\n        for(int i = 0; i<9; i++){\\n            HashSet<Character> rows = new HashSet<Character>();\\n            HashSet<Character> columns = new HashSet<Character>();\\n            HashSet<Character> cube = new HashSet<Character>();\\n            for (int j = 0; j < 9;j++){\\n                if(board[i][j]!='.' && !rows.add(board[i][j]))\\n                    return false;\\n                if(board[j][i]!='.' && !columns.add(board[j][i]))\\n                    return false;\\n                int RowIndex = 3*(i/3);\\n                int ColIndex = 3*(i%3);\\n                if(board[RowIndex + j/3][ColIndex + j%3]!='.' && !cube.add(board[RowIndex + j/3][ColIndex + j%3]))\\n                    return false;\\n            }\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"15472",
			"view":"14822",
			"top":"2",
			"title":"Short+Simple Java using Strings",
			"vote":"141",
			"content":"Collect the set of things we see, encoded as strings. For example:\\n\\n- `'4' in row 7` is encoded as `\"(4)7\"`.\\n- `'4' in column 7` is encoded as `\"7(4)\"`.\\n- `'4' in the top-right block` is encoded as `\"0(4)2\"`.\\n\\nScream `false` if we ever fail to add something because it was already added (i.e., seen before).\\n\\n    public boolean isValidSudoku(char[][] board) {\\n        Set seen = new HashSet();\\n        for (int i=0; i<9; ++i) {\\n            for (int j=0; j<9; ++j) {\\n                if (board[i][j] != '.') {\\n                    String b = \"(\" + board[i][j] + \")\";\\n                    if (!seen.add(b + i) || !seen.add(j + b) || !seen.add(i/3 + b + j/3))\\n                        return false;\\n                }\\n            }\\n        }\\n        return true;\\n    }\\n\\n---\\n\\n**Edit:** Just occurred to me that we can also make it really clear and self-explaining. I'm loving it.\\n\\n    public boolean isValidSudoku(char[][] board) {\\n        Set seen = new HashSet();\\n        for (int i=0; i<9; ++i) {\\n            for (int j=0; j<9; ++j) {\\n                char number = board[i][j];\\n                if (number != '.')\\n                    if (!seen.add(number + \" in row \" + i) ||\\n                        !seen.add(number + \" in column \" + j) ||\\n                        !seen.add(number + \" in block \" + i/3 + \"-\" + j/3))\\n                        return false;\\n            }\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"15634",
			"view":"16994",
			"top":"3",
			"title":"Sharing my easy-understand java solution using set",
			"vote":"91",
			"content":"    public class Solution {\\n    public boolean isValidSudoku(char[][] board) {\\n        for (int i=0; i<9; i++) {\\n            if (!isParticallyValid(board,i,0,i,8)) return false;\\n            if (!isParticallyValid(board,0,i,8,i)) return false;\\n        }\\n        for (int i=0;i<3;i++){\\n            for(int j=0;j<3;j++){\\n                if (!isParticallyValid(board,i*3,j*3,i*3+2,j*3+2)) return false;\\n            }\\n        }\\n        return true;\\n    }\\n    private boolean isParticallyValid(char[][] board, int x1, int y1,int x2,int y2){\\n        Set singleSet = new HashSet();\\n        for (int i= x1; i<=x2; i++){\\n            for (int j=y1;j<=y2; j++){\\n                if (board[i][j]!='.') if(!singleSet.add(board[i][j])) return false;\\n            }\\n        }\\n        return true;\\n    }\\n}\\n\\nEach time send the coordinates to check if the board is partially valid."
		},
		{
			"lc_ans_id":"15452",
			"view":"8673",
			"top":"4",
			"title":"C++ very simple and easy understand. using bit operation",
			"vote":"79",
			"content":"       bool isValidSudoku(vector<vector<char>>& board) {\\n        vector<short> col(9, 0);\\n        vector<short> block(9, 0);\\n        vector<short> row(9, 0);\\n        for (int i = 0; i < 9; i++)\\n         for (int j = 0; j < 9; j++) {\\n             if (board[i][j] != '.') {\\n                 int idx = 1 << (board[i][j] - '0');\\n                 if (row[i] & idx || col[j] & idx || block[i/3 * 3 + j / 3] & idx)\\n                    return false;\\n                row[i] |= idx;\\n                col[j] |= idx;\\n                block[i/3 * 3 + j/3] |= idx;\\n             }\\n         }\\n         return true;\\n      }"
		},
		{
			"lc_ans_id":"15560",
			"view":"5776",
			"top":"5",
			"title":"Yet another java 2ms solution",
			"vote":"62",
			"content":"    public boolean isValidSudoku(char[][] board) {\\n        int [] vset = new int [9];\\n        int [] hset = new int [9];\\n        int [] bckt = new int [9];\\n        int idx = 0;\\n        for (int i = 0; i < 9; i++) {\\n            for (int j = 0; j < 9; j++) {\\n                if (board[i][j] != '.') {\\n                    idx = 1 << (board[i][j] - '0') ;\\n                    if ((hset[i] & idx) > 0 ||\\n                        (vset[j] & idx) > 0 ||\\n                        (bckt[(i / 3) * 3 + j / 3] & idx) > 0) return false;\\n                    hset[i] |= idx;\\n                    vset[j] |= idx;\\n                    bckt[(i / 3) * 3 + j / 3] |= idx;\\n                }\\n            }\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"15460",
			"view":"7675",
			"top":"6",
			"title":"1-7 lines Python, 4 solutions",
			"vote":"61",
			"content":"**Idea**\\n\\nJust go through all you see (like \"7 in row 3\") and check for duplicates.\\n\\n**Solution 1**\\n\\nUsing `Counter`. One logical line, seven physical lines.\\n\\n    def isValidSudoku(self, board):\\n        return 1 == max(collections.Counter(\\n            x\\n            for i, row in enumerate(board)\\n            for j, c in enumerate(row)\\n            if c != '.'\\n            for x in ((c, i), (j, c), (i/3, j/3, c))\\n        ).values() + [1])\\n\\nThe ` + [1]` is only for the empty board, where `max` would get an empty list and complain. It's not necessary to get it accepted here, as the empty board isn't among the test cases, but it's good to have.\\n\\n**Solution 2**\\n\\nUsing `len(set)`.\\n\\n    def isValidSudoku(self, board):\\n        seen = sum(([(c, i), (j, c), (i/3, j/3, c)]\\n                    for i, row in enumerate(board)\\n                    for j, c in enumerate(row)\\n                    if c != '.'), [])\\n        return len(seen) == len(set(seen))\\n\\n**Solution 3**\\n\\nUsing `any`.\\n\\n    def isValidSudoku(self, board):\\n        seen = set()\\n        return not any(x in seen or seen.add(x)\\n                       for i, row in enumerate(board)\\n                       for j, c in enumerate(row)\\n                       if c != '.'\\n                       for x in ((c, i), (j, c), (i/3, j/3, c)))\\n\\n**Solution 4**\\n\\nIterating a different way.\\n\\n    def isValidSudoku(self, board):\\n        seen = sum(([(c, i), (j, c), (i/3, j/3, c)]\\n                    for i in range(9) for j in range(9)\\n                    for c in [board[i][j]] if c != '.'), [])\\n        return len(seen) == len(set(seen))"
		},
		{
			"lc_ans_id":"15616",
			"view":"2535",
			"top":"7",
			"title":"My 12 lines C/C++ solution with 1 time traversal and 9x9x3 memory",
			"vote":"39",
			"content":"\\n    int isValidSudoku(char** board, int boardRowSize, int boardColSize) {\\n        int rows[9][9]={0}; //rows[5][0] means whether number 1('0'+1) in row 5 has appeared.\\n    \\tint cols[9][9]={0}; //cols[3][8] means whether number 9('8'+1) in col 3 has appeared.\\n    \\tint blocks[3][3][9]={0};//blocks[0][2][5] means whether number '6' in block 0,2 (row 0~2,col 6~8) has appeared.\\n    \\tfor(int r=0;r<9;r++)    //traverse board r,c\\n    \\t\\tfor(int c=0;c<9;c++)\\n    \\t\\t\\tif(board[r][c]!='.'){   //skip all number '.'\\n    \\t\\t\\t\\tint number=board[r][c]-'1'; //calculate the number's index(board's number minus 1)\\n    \\t\\t\\t\\tif(rows[r][number]++) return 0; //if the number has already appeared once, return false.\\n    \\t\\t\\t\\tif(cols[c][number]++) return 0;\\n    \\t\\t\\t\\tif(blocks[r/3][c/3][number]++) return 0;\\n    \\t\\t\\t}\\n    \\treturn 1;\\n    }"
		},
		{
			"lc_ans_id":"15451",
			"view":"2129",
			"top":"8",
			"title":"A readable Python solution",
			"vote":"34",
			"content":"Apparently not the shortest solution but I think it's easy to follow the logic.\\n\\n    \\n    def isValidSudoku(self, board):\\n        return (self.is_row_valid(board) and\\n                self.is_col_valid(board) and\\n                self.is_square_valid(board))\\n    \\n    def is_row_valid(self, board):\\n        for row in board:\\n            if not self.is_unit_valid(row):\\n                return False\\n        return True\\n    \\n    def is_col_valid(self, board):\\n        for col in zip(*board):\\n            if not self.is_unit_valid(col):\\n                return False\\n        return True\\n        \\n    def is_square_valid(self, board):\\n        for i in (0, 3, 6):\\n            for j in (0, 3, 6):\\n                square = [board[x][y] for x in range(i, i + 3) for y in range(j, j + 3)]\\n                if not self.is_unit_valid(square):\\n                    return False\\n        return True\\n        \\n    def is_unit_valid(self, unit):\\n        unit = [i for i in unit if i != '.']\\n        return len(set(unit)) == len(unit)"
		},
		{
			"lc_ans_id":"15643",
			"view":"2362",
			"top":"9",
			"title":"Simple clear java solution",
			"vote":"23",
			"content":"    public class Solution {\\n        public boolean isValidSudoku(char[][] board) {\\n            \\n           boolean[][] row = new boolean[9][9];\\n           boolean[][] column = new boolean[9][9];\\n           boolean[][] block = new boolean[9][9];\\n           \\n           for(int i = 0;i<9;i++){\\n               for(int j=0;j<9;j++){\\n                    int c = board[i][j] - '1';       \\n                    if(board[i][j]=='.'){\\n                        continue;\\n                    }\\n                    if(row[i][c]||column[j][c]||block[i - i % 3 + j / 3][c]){\\n                        return false;\\n                    }\\n                    row[i][c] = column[j][c] = block[i - i % 3 + j / 3][c] = true;\\n               }\\n           }\\n           return true;\\n        }\\n    }"
		}
	],
	"id":"36",
	"title":"Valid Sudoku",
	"content":"<p>Determine if a Sudoku is valid, according to: <a href=\"http://sudoku.com.au/TheRules.aspx\">Sudoku Puzzles - The Rules</a>.</p>\r\n\r\n<p>The Sudoku board could be partially filled, where empty cells are filled with the character <code>'.'</code>.</p>\r\n\r\n<p>\r\n<img src=\"http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png\" /><br />\r\n<p style=\"font-size: 11px\">A partially filled sudoku which is valid.</p>\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\nA valid Sudoku board (partially filled) is not necessarily solvable. Only the filled cells need to be validated.\r\n</p>",
	"frequency":"510",
	"ac_num":"142189"
}