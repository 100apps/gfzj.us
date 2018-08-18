{
	"difficulty":"2",
	"submit_num":"581404",
	"show_id":"79",
	"leetcode_id":"79",
	"answers":[
		{
			"lc_ans_id":"27658",
			"view":"62065",
			"top":"0",
			"title":"Accepted very short Java solution. No additional space.",
			"vote":"211",
			"content":"Here accepted solution based on recursion. To save memory I decuded to apply bit mask for every visited cell. Please check board[y][x] ^= 256;\\n\\n    public boolean exist(char[][] board, String word) {\\n        char[] w = word.toCharArray();\\n        for (int y=0; y<board.length; y++) {\\n        \\tfor (int x=0; x<board[y].length; x++) {\\n        \\t\\tif (exist(board, y, x, w, 0)) return true;\\n        \\t}\\n        }\\n        return false;\\n    }\\n\\t\\n\\tprivate boolean exist(char[][] board, int y, int x, char[] word, int i) {\\n\\t\\tif (i == word.length) return true;\\n\\t\\tif (y<0 || x<0 || y == board.length || x == board[y].length) return false;\\n\\t\\tif (board[y][x] != word[i]) return false;\\n\\t\\tboard[y][x] ^= 256;\\n\\t\\tboolean exist = exist(board, y, x+1, word, i+1)\\n\\t\\t\\t|| exist(board, y, x-1, word, i+1)\\n\\t\\t\\t|| exist(board, y+1, x, word, i+1)\\n\\t\\t\\t|| exist(board, y-1, x, word, i+1);\\n\\t\\tboard[y][x] ^= 256;\\n\\t\\treturn exist;\\n\\t}"
		},
		{
			"lc_ans_id":"27811",
			"view":"18025",
			"top":"1",
			"title":"My Java solution",
			"vote":"50",
			"content":"    public class Solution {\\n        static boolean[][] visited;\\n        public boolean exist(char[][] board, String word) {\\n            visited = new boolean[board.length][board[0].length];\\n            \\n            for(int i = 0; i < board.length; i++){\\n                for(int j = 0; j < board[i].length; j++){\\n                    if((word.charAt(0) == board[i][j]) && search(board, word, i, j, 0)){\\n                        return true;\\n                    }\\n                }\\n            }\\n            \\n            return false;\\n        }\\n        \\n        private boolean search(char[][]board, String word, int i, int j, int index){\\n            if(index == word.length()){\\n                return true;\\n            }\\n            \\n            if(i >= board.length || i < 0 || j >= board[i].length || j < 0 || board[i][j] != word.charAt(index) || visited[i][j]){\\n                return false;\\n            }\\n            \\n            visited[i][j] = true;\\n            if(search(board, word, i-1, j, index+1) || \\n               search(board, word, i+1, j, index+1) ||\\n               search(board, word, i, j-1, index+1) || \\n               search(board, word, i, j+1, index+1)){\\n                return true;\\n            }\\n            \\n            visited[i][j] = false;\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"27675",
			"view":"20508",
			"top":"2",
			"title":"My 19ms accepted C++ code",
			"vote":"41",
			"content":"       class Solution {\\n        public:\\n        \\t bool exist(vector<vector<char> > &board, string word) {\\n        \\t\\t m=board.size();\\n        \\t\\t n=board[0].size();\\n                for(int x=0;x<m;x++)\\n                    for(int y=0;y<n;y++)\\n                    {\\n        \\t\\t\\t\\tif(isFound(board,word.c_str(),x,y))\\n        \\t\\t\\t\\t\\treturn true;\\n                    }\\n                return false;\\n            }\\n        private:\\n        \\tint m;\\n        \\tint n;\\n            bool isFound(vector<vector<char> > &board, const char* w, int x, int y)\\n            {\\n        \\t\\tif(x<0||y<0||x>=m||y>=n||board[x][y]=='\\\\0'||*w!=board[x][y])\\n        \\t\\t\\treturn false;\\n                if(*(w+1)=='\\\\0')\\n                    return true;\\n        \\t\\tchar t=board[x][y];\\n        \\t\\tboard[x][y]='\\\\0';\\n        \\t\\tif(isFound(board,w+1,x-1,y)||isFound(board,w+1,x+1,y)||isFound(board,w+1,x,y-1)||isFound(board,w+1,x,y+1))\\n        \\t\\t\\treturn true; \\n        \\t\\tboard[x][y]=t;\\n                return false;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"27834",
			"view":"11443",
			"top":"3",
			"title":"Simple solution",
			"vote":"39",
			"content":"    public boolean exist(char[][] board, String word) {\\n        for (int i = 0; i < board.length; i++) {\\n            for (int j = 0; j < board[i].length; j++) {\\n                if(exist(board, i, j, word, 0)) return true;\\n            }\\n        }\\n        return false;\\n    }\\n\\n    private boolean exist(char[][] board, int x, int y, String word, int start) {\\n        if(start >= word.length()) return true;\\n        if(x < 0 || x >= board.length || y < 0 || y >= board[0].length) return false;\\n        if (board[x][y] == word.charAt(start++)) {\\n            char c = board[x][y];\\n            board[x][y] = '#';\\n            boolean res = exist(board, x + 1, y, word, start) || exist(board, x - 1, y, word, start) ||\\n            exist(board, x, y + 1, word, start) || exist(board, x, y - 1, word, start);\\n            board[x][y] = c;\\n            return res;\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"27660",
			"view":"8559",
			"top":"4",
			"title":"Python dfs solution with comments.",
			"vote":"39",
			"content":"        \\n    def exist(self, board, word):\\n        if not board:\\n            return False\\n        for i in xrange(len(board)):\\n            for j in xrange(len(board[0])):\\n                if self.dfs(board, i, j, word):\\n                    return True\\n        return False\\n    \\n    # check whether can find word, start at (i,j) position    \\n    def dfs(self, board, i, j, word):\\n        if len(word) == 0: # all the characters are checked\\n            return True\\n        if i<0 or i>=len(board) or j<0 or j>=len(board[0]) or word[0]!=board[i][j]:\\n            return False\\n        tmp = board[i][j]  # first character is found, check the remaining part\\n        board[i][j] = \"#\"  # avoid visit agian \\n        # check whether can find \"word\" along one direction\\n        res = self.dfs(board, i+1, j, word[1:]) or self.dfs(board, i-1, j, word[1:]) \\\\\\n        or self.dfs(board, i, j+1, word[1:]) or self.dfs(board, i, j-1, word[1:])\\n        board[i][j] = tmp\\n        return res"
		},
		{
			"lc_ans_id":"27739",
			"view":"8191",
			"top":"5",
			"title":"My DFS + Backtracking C++ solution (16ms)",
			"vote":"29",
			"content":"Typical dfs+backtracking question. It compare board[row][col] with word[start], if they match, change board[row][col] to '*' to mark it as visited. Then move to the next one (i.e. word[start+1]) and compare it to the current neighbors ( doing it by recursion)\\n\\n    class Solution {\\n    private:\\n        bool dfs(vector<vector<char>>& board, int row, int col, const string &word, int start, int M, int N, int sLen)\\n        {\\n            char curC;\\n            bool res = false;\\n            if( (curC = board[row][col]) != word[start]) return false;\\n            if(start==sLen-1) return true;\\n            board[row][col] = '*';\\n            if(row>0) res = dfs(board, row-1, col, word, start+1, M, N, sLen);\\n            if(!res && row < M-1) res = dfs(board, row+1, col, word, start+1, M, N, sLen);\\n            if(!res && col > 0)   res = dfs(board, row, col-1, word, start+1, M, N, sLen);\\n            if(!res && col < N-1) res = dfs(board,  row, col+1, word, start+1, M, N, sLen);\\n            board[row][col] = curC;\\n            return res;\\n        }\\n        \\n    public:\\n        bool exist(vector<vector<char>>& board, string word) {\\n            int M,N,i,j,sLen = word.size();\\n            if( (M=board.size()) && (N=board[0].size()) && sLen)\\n            {\\n                for(i=0; i<M; ++i)\\n                    for(j=0; j<N; ++j)\\n                        if(dfs(board, i, j, word, 0, M, N, sLen)) return true;\\n            }\\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"27892",
			"view":"7648",
			"top":"6",
			"title":"AC in 84ms, by using DFS.",
			"vote":"14",
			"content":"I used DFS,  and got AC in 84ms, any improvement?\\n\\n    class Solution {\\n    private:\\n        vector<vector<char> > *board;\\n        string *word;\\n        bool **used;\\n    private:\\n        bool isInboard(int i, int j)\\n        {\\n            if(i < 0)return false;\\n            if(i >= board->size())return false;\\n            if(j < 0)return false;\\n            if(j >= (*board)[i].size())return false;\\n            return true;\\n        }\\n        \\n        bool DFS(int si, int sj, int n)\\n        {\\n            if(n == word->size())return true;\\n            if(isInboard(si, sj))\\n            {\\n                if(!used[si][sj] && (*board)[si][sj] == (*word)[n])\\n                {\\n                    used[si][sj] = true;\\n                    bool ret = false;\\n                    if(DFS(si+1, sj, n+1))\\n                        ret = true;\\n                    else if(DFS(si-1, sj, n+1))\\n                        ret = true;\\n                    else if(DFS(si, sj+1, n+1))\\n                        ret = true;\\n                    else if(DFS(si, sj-1, n+1))\\n                        ret = true;\\n                    used[si][sj] = false;\\n                    return ret;\\n                }\\n            }\\n            return false;\\n        }\\n        \\n    public:\\n        bool exist(vector<vector<char> > &board, string word) {\\n            if(board.size() == 0)return false;\\n            this->board = &board;\\n            this->word = &word;\\n            used = new bool*[board.size()];\\n            for(int i = 0; i < board.size(); i ++)\\n            {\\n                used[i] = new bool[board[i].size()];\\n                for(int j = 0; j < board[i].size(); j ++)\\n                    used[i][j] = false;\\n            }\\n            for(int i = 0; i < board.size(); i ++)\\n                for(int j = 0; j < board[i].size(); j ++)\\n                    if(DFS(i, j, 0))return true;\\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"27765",
			"view":"4402",
			"top":"7",
			"title":"Java DFS solution, beats 97.64%",
			"vote":"12",
			"content":"    public class Solution {\\n        public boolean exist(char[][] board, String word) {\\n            if (word == null || word.length() == 0) {\\n                return true;\\n            }\\n            char[] chs = word.toCharArray();\\n            for (int i = 0; i < board.length; i++) {\\n                for (int j = 0; j < board[0].length; j++) {\\n                    if(dfs(board, chs, 0, i, j)) {\\n                        return true;\\n                    }\\n                }\\n            }\\n            return false;\\n        }\\n        \\n        private boolean dfs(char[][] board, char[] words, int idx, int x, int y) {\\n            if (idx == words.length) {\\n                return true;\\n            } \\n            if (x < 0 || x == board.length || y < 0 || y == board[0].length) {\\n                return false;\\n            }\\n            if (board[x][y] != words[idx]) {\\n                return false;\\n            }\\n            board[x][y] ^= 256;\\n            boolean exist = dfs(board, words, idx + 1, x, y + 1) ||\\n            dfs(board, words, idx + 1, x, y - 1) || dfs(board, words, idx + 1, x + 1, y) ||\\n            dfs(board, words, idx + 1, x - 1, y) ;\\n            board[x][y] ^= 256;\\n            return exist;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"27665",
			"view":"2778",
			"top":"8",
			"title":"Python simple dfs solution",
			"vote":"12",
			"content":"    def exist(self, board, word):\\n        if not word:\\n            return True\\n        if not board:\\n            return False\\n        for i in range(len(board)):\\n            for j in range(len(board[0])):\\n                if self.exist_helper(board, word, i, j):\\n                    return True\\n        return False\\n                        \\n    def exist_helper(self, board, word, i, j):\\n        if board[i][j] == word[0]:\\n            if not word[1:]:\\n                return True\\n            board[i][j] = \" \" # indicate used cell\\n            # check all adjacent cells\\n            if i > 0 and self.exist_helper(board, word[1:], i-1, j):\\n                return True\\n            if i < len(board)-1 and self.exist_helper(board, word[1:], i+1, j):\\n                return True\\n            if j > 0 and self.exist_helper(board, word[1:], i, j-1):\\n                return True\\n            if j < len(board[0])-1 and self.exist_helper(board, word[1:], i, j+1):\\n                return True\\n            board[i][j] = word[0] # update the cell to its original value\\n            return False\\n        else:\\n            return False"
		},
		{
			"lc_ans_id":"27960",
			"view":"889",
			"top":"9",
			"title":"[word search] wrong instruction about the input (board) datatype",
			"vote":"10",
			"content":"In the instructions, it is said that the board as input would be \"a list of list of 1 length string\".\\n\\n\"For example,\\nGiven board =\\n<pre>\\n<code>\\n[\\n  [\"ABCE\"],\\n  [\"SFCS\"],\\n  [\"ADEE\"]\\n]\\n</code>\\n</pre>\\n\"\\n\\nHowever, all actual test cases have a different datatype --- the board is a list of strings. \\n\\nWith the same example above, the actual board =\\n<pre>\\n<code>\\n[\\n  \"ABCE\",\\n  \"SFCS\",\\n  \"ADEE\"\\n]\\n</code>\\n</pre>"
		}
	],
	"id":"79",
	"title":"Word Search",
	"content":"<p>\r\nGiven a 2D board and a word, find if the word exists in the grid.\r\n</p>\r\n<p>\r\nThe word can be constructed from letters of sequentially adjacent cell, where \"adjacent\" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven <b>board</b> = \r\n<pre>\r\n[\r\n  ['A','B','C','E'],\r\n  ['S','F','C','S'],\r\n  ['A','D','E','E']\r\n]\r\n</pre>\r\n\r\n<b>word</b> = <code>\"ABCCED\"</code>, -> returns <code>true</code>,<br />\r\n<b>word</b> = <code>\"SEE\"</code>, -> returns <code>true</code>,<br />\r\n<b>word</b> = <code>\"ABCB\"</code>, -> returns <code>false</code>.<br />\r\n</p>",
	"frequency":"467",
	"ac_num":"161590"
}