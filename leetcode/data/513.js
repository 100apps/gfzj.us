{
	"difficulty":"2",
	"submit_num":"29525",
	"show_id":"529",
	"leetcode_id":"529",
	"answers":[
		{
			"lc_ans_id":"99826",
			"view":"9382",
			"top":"0",
			"title":"Java Solution, DFS + BFS",
			"vote":"37",
			"content":"This is a typical ```Search``` problem, either by using ```DFS``` or ```BFS```. Search rules:\\n1. If click on a mine ('```M```'), mark it as '```X```', stop further search.\\n2. If click on an empty cell ('```E```'), depends on how many surrounding mine:\\n2.1 Has surrounding mine(s), mark it with number of surrounding mine(s), stop further search.\\n2.2 No surrounding mine, mark it as '```B```', continue search its ```8``` neighbors. \\n\\nDFS solution. \\n\\n```\\npublic class Solution {\\n    public char[][] updateBoard(char[][] board, int[] click) {\\n        int m = board.length, n = board[0].length;\\n        int row = click[0], col = click[1];\\n        \\n        if (board[row][col] == 'M') { // Mine\\n            board[row][col] = 'X';\\n        }\\n        else { // Empty\\n            // Get number of mines first.\\n            int count = 0;\\n            for (int i = -1; i < 2; i++) {\\n                for (int j = -1; j < 2; j++) {\\n                    if (i == 0 && j == 0) continue;\\n                    int r = row + i, c = col + j;\\n                    if (r < 0 || r >= m || c < 0 || c < 0 || c >= n) continue;\\n                    if (board[r][c] == 'M' || board[r][c] == 'X') count++;\\n                }\\n            }\\n            \\n            if (count > 0) { // If it is not a 'B', stop further DFS.\\n                board[row][col] = (char)(count + '0');\\n            }\\n            else { // Continue DFS to adjacent cells.\\n                board[row][col] = 'B';\\n                for (int i = -1; i < 2; i++) {\\n                    for (int j = -1; j < 2; j++) {\\n                        if (i == 0 && j == 0) continue;\\n                        int r = row + i, c = col + j;\\n                        if (r < 0 || r >= m || c < 0 || c < 0 || c >= n) continue;\\n                        if (board[r][c] == 'E') updateBoard(board, new int[] {r, c});\\n                    }\\n                }\\n            }\\n        }\\n        \\n        return board;\\n    }\\n}\\n```\\n\\nBFS solution. As you can see the basic logic is almost the same as DFS. Only added a queue to facilitate BFS.\\n```\\npublic class Solution {\\n    public char[][] updateBoard(char[][] board, int[] click) {\\n        int m = board.length, n = board[0].length;\\n        Queue<int[]> queue = new LinkedList<>();\\n        queue.add(click);\\n        \\n        while (!queue.isEmpty()) {\\n            int[] cell = queue.poll();\\n            int row = cell[0], col = cell[1];\\n            \\n            if (board[row][col] == 'M') { // Mine\\n                board[row][col] = 'X';\\n            }\\n            else { // Empty\\n                // Get number of mines first.\\n                int count = 0;\\n                for (int i = -1; i < 2; i++) {\\n                    for (int j = -1; j < 2; j++) {\\n                        if (i == 0 && j == 0) continue;\\n                        int r = row + i, c = col + j;\\n                        if (r < 0 || r >= m || c < 0 || c < 0 || c >= n) continue;\\n                        if (board[r][c] == 'M' || board[r][c] == 'X') count++;\\n                    }\\n                }\\n                \\n                if (count > 0) { // If it is not a 'B', stop further BFS.\\n                    board[row][col] = (char)(count + '0');\\n                }\\n                else { // Continue BFS to adjacent cells.\\n                    board[row][col] = 'B';\\n                    for (int i = -1; i < 2; i++) {\\n                        for (int j = -1; j < 2; j++) {\\n                            if (i == 0 && j == 0) continue;\\n                            int r = row + i, c = col + j;\\n                            if (r < 0 || r >= m || c < 0 || c < 0 || c >= n) continue;\\n                            if (board[r][c] == 'E') {\\n                                queue.add(new int[] {r, c});\\n                                board[r][c] = 'B'; // Avoid to be added again.\\n                            }\\n                        }\\n                    }\\n                }\\n            }\\n        }\\n        \\n        return board;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99841",
			"view":"2725",
			"top":"1",
			"title":"Straight forward Java solution",
			"vote":"8",
			"content":"```\\npublic class Solution {\\n    public char[][] updateBoard(char[][] board, int[] click) {\\n        int x = click[0], y = click[1];\\n        if (board[x][y] == 'M') {\\n            board[x][y] = 'X';\\n            return board;\\n        }\\n        \\n        dfs(board, x, y);\\n        return board;\\n    }\\n    \\n    int[] dx = {-1, 0, 1, -1, 1, 0, 1, -1};\\n    int[] dy = {-1, 1, 1, 0, -1, -1, 0, 1};\\n    private void dfs(char[][] board, int x, int y) {\\n        if (x < 0 || x >= board.length || y < 0 || y >= board[0].length || board[x][y] != 'E')  return;\\n        \\n        int num = getNumsOfBombs(board, x, y);\\n    \\n        if (num == 0) {\\n            board[x][y] = 'B';\\n            for (int i = 0; i < 8; i++) {\\n                int nx = x + dx[i], ny = y + dy[i];\\n                dfs(board, nx, ny);\\n            }\\n        } else {\\n            board[x][y] = (char)('0' + num);\\n        }\\n        \\n    }\\n    \\n    private int getNumsOfBombs(char[][] board, int x, int y) {\\n        int num = 0;\\n        for (int i = -1; i <= 1; i++) {\\n            for (int j = -1; j <= 1; j++) {\\n                int nx = x + i, ny = y + j;\\n                if (nx < 0 || nx >= board.length || ny < 0 || ny >= board[0].length)    continue;\\n                if (board[nx][ny] == 'M' || board[nx][ny] == 'X') {\\n                    num++;\\n                }\\n            }\\n        }\\n        return num;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99832",
			"view":"1657",
			"top":"2",
			"title":"Simple Python (DFS)",
			"vote":"5",
			"content":"Maintain a todo list (***stack***) of squares left to reveal.  For each square S to be revealed, if S contains a mine, put an X in it.  If there are mines adjacent to S, then put that number of mines in it.  If there are no mines adjacent to S, then put a B in it, and add adjacent squares to S that are unrevealed  (*in 'ME'*) that were not previously added (***nei** not in seen*) to your todo list.\\n```\\ndef updateBoard(self, A, click):\\n    click = tuple(click)\\n    R, C = len(A), len(A[0])\\n    \\n    def neighbors(r, c):\\n        for dr in xrange(-1, 2):\\n            for dc in xrange(-1, 2):\\n                if (dr or dc) and 0 <= r + dr < R and 0 <= c + dc < C:\\n                    yield r + dr, c + dc\\n    \\n    stack = [click]\\n    seen = {click}\\n    while stack:\\n        r, c = stack.pop()\\n        if A[r][c] == 'M':\\n            A[r][c] = 'X'\\n        else:\\n            mines_adj = sum( A[nr][nc] in 'MX' for nr, nc in neighbors(r, c) )\\n            if mines_adj:\\n                A[r][c] = str(mines_adj)\\n            else:\\n                A[r][c] = 'B'\\n                for nei in neighbors(r, c):\\n                    if A[nei[0]][nei[1]] in 'ME' and nei not in seen:\\n                        stack.append(nei)\\n                        seen.add(nei)\\n    return A\\n```"
		},
		{
			"lc_ans_id":"99897",
			"view":"1400",
			"top":"3",
			"title":"10 line python solution",
			"vote":"4",
			"content":"```\\ndef updateBoard(self, board, click):\\n    (row, col), directions = click, ((-1, 0), (1, 0), (0, 1), (0, -1), (-1, 1), (-1, -1), (1, 1), (1, -1))\\n    if 0 <= row < len(board) and 0 <= col < len(board[0]):\\n        if board[row][col] == 'M':\\n            board[row][col] = 'X'\\n        elif board[row][col] == 'E':\\n            n = sum([board[row + r][col + c] == 'M' for r, c in directions if 0 <= row + r < len(board) and 0 <= col + c < len(board[0])])\\n            board[row][col] = str(n or 'B')\\n            for r, c in directions * (not n): self.updateBoard(board, [row + r, col + c])\\n    return board\\n```\\n\\n@StefanPochmann Suggested a one line for loop to replace my map function, the line used to be like this :)\\n```not n and map(self.updateBoard, (board,) * 8, [(row + d[0], col + d[1]) for d in directions])```"
		},
		{
			"lc_ans_id":"99899",
			"view":"2056",
			"top":"4",
			"title":"C++ DFS solution, easy to understand",
			"vote":"4",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<vector<char>> updateBoard(vector<vector<char>>& board, vector<int>& click) {\\n        if(board[click[0]][click[1]] == 'M'){\\n            board[click[0]][click[1]] = 'X';\\n            return board;\\n        }\\n        reveal(board,click[0],click[1]);\\n        return board;\\n    }\\n    \\n    bool inboard(const vector<vector<char>>& board, int x, int y){\\n        return ( x>=0 && x<board.size() && y>=0 && y<board[0].size() );\\n    }\\n    \\n    void reveal(vector<vector<char>>& board, int x, int y){\\n        if(!inboard(board,x,y)) return;\\n        if(board[x][y] == 'E'){\\n            //search 8 adjacent squares\\n            int count = 0;\\n            if(inboard(board,x-1,y-1) && board[x-1][y-1] == 'M') count++;\\n            if(inboard(board,x-1,y  ) && board[x-1][y  ] == 'M') count++;\\n            if(inboard(board,x-1,y+1) && board[x-1][y+1] == 'M') count++;\\n            if(inboard(board,x  ,y-1) && board[x  ][y-1] == 'M') count++;\\n            if(inboard(board,x  ,y+1) && board[x  ][y+1] == 'M') count++;\\n            if(inboard(board,x+1,y-1) && board[x+1][y-1] == 'M') count++;\\n            if(inboard(board,x+1,y  ) && board[x+1][y  ] == 'M') count++;\\n            if(inboard(board,x+1,y+1) && board[x+1][y+1] == 'M') count++;\\n\\n            if(count>0)\\n                board[x][y] = '0'+count;\\n            else{\\n                board[x][y] = 'B';\\n                reveal(board,x-1,y-1);\\n                reveal(board,x-1,y  );\\n                reveal(board,x-1,y+1);\\n                reveal(board,x  ,y-1);\\n                reveal(board,x  ,y+1);\\n                reveal(board,x+1,y-1);\\n                reveal(board,x+1,y  );\\n                reveal(board,x+1,y+1);\\n            }\\n        }\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99834",
			"view":"190",
			"top":"5",
			"title":"Python Solution - DFS - Simple code - No hashtable Required",
			"vote":"2",
			"content":"````\\nimport collections\\nclass Solution(object):\\n    def updateBoard(self, board, click):\\n        if not board:\\n            return\\n        m, n = len(board), len(board[0])\\n        queue = collections.deque()\\n        queue.append((click[0], click[1]))\\n        valid_neighbours = lambda (i, j): 0<=i<m and 0<=j<n\\n\\n        while queue:\\n            x, y = queue.pop()\\n            if board[x][y] == 'M':\\n                board[x][y] = 'X'\\n            else:\\n                # Filter out the valid neighbours\\n                neighbours = filter(valid_neighbours, [(x-1, y), (x+1, y), \\n                    (x, y-1), (x, y+1), (x-1, y-1), (x+1, y-1), (x-1, y+1), (x+1, y+1)])\\n                # Count the number of mines amongst the neighbours\\n                mine_count = sum([board[i][j]=='M' for i, j in neighbours])\\n                # If at least one neighbour is a potential mine, store the mine count.\\n                if mine_count > 0:\\n                    board[x][y] = str(mine_count)\\n                # If no neighbour is a mine, then add all unvisited neighbours\\n                # to the queue for future processing\\n                else:\\n                    board[x][y] = 'B'\\n                    queue.extend([(i, j) for (i, j) in neighbours if board[i][j]=='E'])\\n        return board\\n````"
		},
		{
			"lc_ans_id":"99857",
			"view":"614",
			"top":"6",
			"title":"Java naive solution with explanation",
			"vote":"2",
			"content":"Make sure you know the rule of updating the board.\\n1. When clicking on the unrevealed mine, just update the current cell to 'X'.\\n2. When clicking on the cell with mines nearby (8 neighbors including diagonals), just update the count of mines in the neighborhood.\\n3. When clicking on the cell with 0 mine nearby, all the 8 neighbors also need to be checked and updated. And since once a cell is visited, its character will be changed for sure, the board will record the visited cells itself so no worry about revisiting.\\n\\nps: I know the format is somewhat stupid lol.\\n  \\n    public char[][] updateBoard(char[][] board, int[] click) {\\n        int x = click[0];\\n        int y = click[1];\\n        if(board[x][y] == 'M') board[x][y] = 'X';\\n        else if(countmines(board,x,y)>0) board[x][y] = (char)(countmines(board,x,y) + '0');\\n        else update(board,x,y);\\n        return board;\\n    }\\n    private void update(char[][] board, int i, int j){\\n        if(i<0||i>=board.length||j<0||j>=board[0].length) return;\\n        if(board[i][j]=='E'){\\n            if(countmines(board,i,j)==0) {\\n                board[i][j] = 'B';\\n                update(board,i,j-1);\\n                update(board,i-1,j);\\n                update(board,i,j+1);\\n                update(board,i+1,j);\\n                update(board,i-1,j-1);\\n                update(board,i+1,j+1);\\n                update(board,i+1,j-1);\\n                update(board,i-1,j+1);\\n            }\\n            else{\\n                board[i][j] = (char)(countmines(board,i,j) + '0');\\n            }\\n        }\\n    }\\n    \\n    private int countmines(char[][] board,int i, int j){ // just count mines in the neighborhood.\\n        int count = 0;\\n        if(i-1>=0&&board[i-1][j]=='M')count++;\\n        if(i+1<board.length&&board[i+1][j]=='M')count++;\\n        if(j-1>=0&&board[i][j-1]=='M')count++;\\n        if(j+1<board[0].length&&board[i][j+1]=='M')count++;\\n        if(i-1>=0&&j-1>=0&&board[i-1][j-1]=='M')count++;\\n        if(i+1<board.length&&j+1<board[0].length&&board[i+1][j+1]=='M') count++;\\n        if(i-1>=0&&j+1<board[0].length&&board[i-1][j+1]=='M') count++;\\n        if(i+1<board.length&&j-1>=0&&board[i+1][j-1]=='M') count++;\\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"99838",
			"view":"114",
			"top":"7",
			"title":"Easy BFS Java code",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public char[][] updateBoard(char[][] board, int[] click) {\\n        int m = board.length, n = board[0].length;\\n        Queue<int[]> q = new LinkedList<>();\\n        \\n        if(board[click[0]][click[1]] == 'M') {\\n            board[click[0]][click[1]] = 'X';\\n            return board;\\n        } else {\\n            board[click[0]][click[1]] = 'B';\\n        }\\n        \\n        int[] dx = {1, 1, 0, -1, -1, -1,  0, 1};\\n        int[] dy = {0, 1, 1,  1,  0, -1, -1, -1};\\n        \\n        q.offer(click);\\n        \\n        while(!q.isEmpty()) {\\n            int[] cur = q.poll();\\n            \\n            int count = 0;\\n            \\n            for(int k = 0; k < 8; k++) {\\n                int i = cur[0] + dx[k], j = cur[1] + dy[k];\\n                if(i < 0 || i >= m || j < 0 || j >= n) continue;\\n                if(board[i][j] == 'M') {\\n                    count++;\\n                }\\n            }\\n            \\n            if(count != 0) {\\n                board[cur[0]][cur[1]] = (char)('0' + count);\\n            } else {\\n                for(int k = 0; k < 8; k++) {\\n                    int i = cur[0] + dx[k], j = cur[1] + dy[k];\\n\\n                    if(i < 0 || i >= m || j < 0 || j >= n) continue;\\n                    if(board[i][j] == 'E') {\\n                        board[i][j] = 'B';\\n                        q.offer(new int[] {i, j});\\n                    }\\n                }\\n            }\\n        }\\n        \\n        return board;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99896",
			"view":"122",
			"top":"8",
			"title":"C++_AC_Using DFS method",
			"vote":"1",
			"content":"    class Solution {\\n    public:\\n    vector<pair<int,int>> link = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};\\n    vector<char> mines = {'B', '1','2','3','4','5','6','7','8'};\\n    vector<vector<char>> updateBoard(vector<vector<char>>& board, vector<int>& click) {\\n        int m = board.size();\\n        int n = board[0].size();\\n        if(board[click[0]][click[1]] == 'M') {board[click[0]][click[1]] = 'X'; return board;}\\n        dfs(board, click[0], click[1], m, n);\\n        return board;\\n    }\\n    \\n    void dfs(vector<vector<char>>& board, int i, int j, int m, int n){\\n        if(i < 0 || i >= m || j < 0 || j >= n) return;\\n        if(board[i][j] == 'E'){\\n            int count = 0;\\n            for(auto d : link){\\n                int tmpi = i + d.first;\\n                int tmpj = j + d.second;\\n                if(tmpi >= 0 && tmpi < m && tmpj >= 0 && tmpj < n){\\n                    if(board[tmpi][tmpj] == 'M') count++;\\n                }\\n            }\\n            board[i][j] = mines[count];\\n            if(board[i][j] == 'B'){\\n                for(auto lk : link){\\n                    dfs(board, i+lk.first, j+lk.second, m, n);\\n                }\\n            }\\n        }\\n    }\\n    };"
		},
		{
			"lc_ans_id":"99885",
			"view":"1192",
			"top":"9",
			"title":"C++ 16 lines BFS",
			"vote":"1",
			"content":"This is the updated solution per @Hanafubuki suggestions. It minimizes the space requirements for the queue by updating node status before it enters the queue.\\n```\\nvector<vector<char>> updateBoard(vector<vector<char>>& board, vector<int>& click) {\\n    deque<pair<int, int>> q({ { click[0], click[1] } });\\n    while (!q.empty()) {\\n        auto c = q.front().first, r = q.front().second, mines = 0;\\n        vector<pair<int, int>> neighbours;\\n        if (board[c][r] == 'M') board[c][r] = 'X';\\n        else for (auto i = -1; i <= 1; ++i) {\\n            for (auto j = -1; j <= 1; ++j) {\\n                if (c + i >= 0 && r + j >= 0 && c + i < board.size() && r + j < board[0].size()) {\\n                    if (board[c + i][r + j] == 'M') ++mines;\\n                    else if (mines == 0 && board[c + i][r + j] == 'E') neighbours.push_back({ c + i, r + j});\\n                }\\n            }\\n        }\\n        if (mines > 0) board[c][r] = '0' + mines;\\n        else for (auto n : neighbours) {\\n            board[n.first][n.second] = 'B';\\n            q.push_back(n);\\n        }\\n        q.pop_front();\\n    }\\n    return board;\\n}\\n```"
		}
	],
	"id":"513",
	"title":"Minesweeper",
	"content":"<p>Let's play the minesweeper game (<a href=\"https://en.wikipedia.org/wiki/Minesweeper_(video_game)\">Wikipedia</a>, <a href=\"http://minesweeperonline.com\">online game</a>)! </p>\r\n\r\n<p>You are given a 2D char matrix representing the game board. <b>'M'</b> represents an <b>unrevealed</b> mine, <b>'E'</b> represents an <b>unrevealed</b> empty square, <b>'B'</b> represents a <b>revealed</b> blank square that has no adjacent (above, below, left, right, and all 4 diagonals) mines, <b>digit</b> ('1' to '8') represents how many mines are adjacent to this <b>revealed</b> square, and finally <b>'X'</b> represents a <b>revealed</b> mine.</p>\r\n\r\n<p>Now given the next click position (row and column indices) among all the <b>unrevealed</b> squares ('M' or 'E'), return the board after revealing this position according to the following rules:</p> \r\n\r\n<p>\r\n<ol>\r\n<li>If a mine ('M') is revealed, then the game is over - change it to <b>'X'</b>.</li>\r\n<li>If an empty square ('E') with <b>no adjacent mines</b> is revealed, then change it to revealed blank ('B') and all of its adjacent <b>unrevealed</b> squares should be revealed recursively.</li>\r\n<li>If an empty square ('E') with <b>at least one adjacent mine</b> is revealed, then change it to a digit ('1' to '8') representing the number of adjacent mines.</li>\r\n<li>Return the board when no more squares will be revealed.</li>\r\n</ol>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n\r\n[['E', 'E', 'E', 'E', 'E'],\r\n ['E', 'E', 'M', 'E', 'E'],\r\n ['E', 'E', 'E', 'E', 'E'],\r\n ['E', 'E', 'E', 'E', 'E']]\r\n\r\nClick : [3,0]\r\n\r\n<b>Output:</b> \r\n\r\n[['B', '1', 'E', '1', 'B'],\r\n ['B', '1', 'M', '1', 'B'],\r\n ['B', '1', '1', '1', 'B'],\r\n ['B', 'B', 'B', 'B', 'B']]\r\n\r\n<b>Explanation:</b>\r\n<img src=\"/static/images/problemset/minesweeper_example_1.png\" width = \"40%\" />\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n\r\n[['B', '1', 'E', '1', 'B'],\r\n ['B', '1', 'M', '1', 'B'],\r\n ['B', '1', '1', '1', 'B'],\r\n ['B', 'B', 'B', 'B', 'B']]\r\n\r\nClick : [1,2]\r\n\r\n<b>Output:</b> \r\n\r\n[['B', '1', 'E', '1', 'B'],\r\n ['B', '1', 'X', '1', 'B'],\r\n ['B', '1', '1', '1', 'B'],\r\n ['B', 'B', 'B', 'B', 'B']]\r\n\r\n<b>Explanation:</b>\r\n<img src=\"/static/images/problemset/minesweeper_example_2.png\" width = \"40%\" />\r\n</pre>\r\n</p>\r\n\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The range of the input matrix's height and width is [1,50].</li>\r\n<li>The click position will only be an unrevealed square ('M' or 'E'), which also means the input board contains at least one clickable square.</li>\r\n<li>The input board won't be a stage when game is over (some mines have been revealed).</li>\r\n<li>For simplicity, not mentioned rules should be ignored in this problem. For example, you <b>don't</b> need to reveal all the unrevealed mines when the game is over, consider any cases that you will win the game or flag any squares.</li>\r\n</ol>\r\n</p>",
	"frequency":"213",
	"ac_num":"14663"
}