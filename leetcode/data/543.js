{
	"difficulty":"2",
	"submit_num":"14544",
	"show_id":"562",
	"leetcode_id":"562",
	"answers":[
		{
			"lc_ans_id":"102266",
			"view":"4593",
			"top":"0",
			"title":"Java O(nm) Time DP Solution",
			"vote":"38",
			"content":"```\\npublic int longestLine(int[][] M) {\\n    int n = M.length, max = 0;\\n    if (n == 0) return max;\\n    int m = M[0].length;\\n    int[][][] dp = new int[n][m][4];\\n    for (int i=0;i<n;i++) \\n        for (int j=0;j<m;j++) {\\n            if (M[i][j] == 0) continue;\\n            for (int k=0;k<4;k++) dp[i][j][k] = 1;\\n            if (j > 0) dp[i][j][0] += dp[i][j-1][0]; // horizontal line\\n            if (j > 0 && i > 0) dp[i][j][1] += dp[i-1][j-1][1]; // anti-diagonal line\\n            if (i > 0) dp[i][j][2] += dp[i-1][j][2]; // vertical line\\n            if (j < m-1 && i > 0) dp[i][j][3] += dp[i-1][j+1][3]; // diagonal line\\n            max = Math.max(max, Math.max(dp[i][j][0], dp[i][j][1]));\\n            max = Math.max(max, Math.max(dp[i][j][2], dp[i][j][3]));\\n        }\\n    return max;\\n}\\n```\\n\\nNote that each cell of the DP table only depends on the current row or previous row so you can easily optimize the above algorithm to use only O(m) space."
		},
		{
			"lc_ans_id":"102264",
			"view":"982",
			"top":"1",
			"title":"[Java/C++] Clean Code - No Cache",
			"vote":"7",
			"content":"**Java**\\n```\\nclass Solution {\\n    public int longestLine(int[][] M) {\\n        if (M.length == 0 || M[0].length == 0) return 0;\\n        int m = M.length, n = M[0].length;\\n        int max = 0, hori = 0, vert = 0, inc = 0, desc = 0;\\n        for (int i = 0; i < m; i++, hori = 0) {\\n            for (int j = 0; j < n; j++) {\\n                hori = M[i][j] > 0 ? hori + 1 : 0;\\n                max = Math.max(max, hori);\\n            }\\n        }\\n        for (int j = 0; j < n; j++, vert = 0) {\\n            for (int i = 0; i < m; i++) {\\n                vert = M[i][j] > 0 ? vert + 1 : 0;\\n                max = Math.max(max, vert);\\n            }\\n        }\\n        for (int k = 0; k < m + n; k++, inc = 0, desc = 0) {\\n            // increasing start from left cells then bottom cells\\n            for (int i = Math.min(k, m - 1), j = Math.max(0, k - m); i >= 0 && j < n; i--, j++) {\\n                inc = M[i][j] > 0 ? inc + 1 : 0;\\n                max = Math.max(max, inc);\\n            }\\n            // decreasing start from left cells then top cells;\\n            for (int i = Math.max(m - 1 - k, 0), j = Math.max(0, k - m); i < m && j < n; i++, j++) {\\n                desc = M[i][j] > 0 ? desc + 1 : 0;\\n                max = Math.max(max, desc);\\n            }\\n        }\\n        return max;        \\n    }\\n}\\n```\\n**c++**\\n```\\nclass Solution {\\npublic:\\n    int longestLine(vector<vector<int>>& M) {\\n        if (M.empty() || M[0].empty()) return 0;\\n        int m = M.size(), n = M[0].size();\\n        int maxl = 0, hori = 0, vert = 0, inc = 0, desc = 0;\\n        for (int i = 0; i < m; i++)\\n            for (int j = 0, hori = 0; j < n; j++, maxl = max(maxl, hori))\\n                hori = M[i][j] ? hori + 1 : 0;\\n\\n        for (int j = 0; j < n; j++)\\n            for (int i = 0, vert = 0; i < m; i++, maxl = max(maxl, vert))\\n                vert = M[i][j] ? vert + 1 : 0;\\n\\n        for (int k = 0; k < m + n; k++) {\\n            for (int i = min(k, m - 1), j = max(0, k - m), inc = 0; i >= 0 && j < n; i--, j++, maxl = max(maxl, inc))\\n                inc = M[i][j] ? inc + 1 : 0;\\n            for (int i = max(m - 1 - k, 0), j = max(0, k - m), desc = 0; i < m && j < n; i++, j++, maxl = max(maxl, desc))\\n                desc = M[i][j] ? desc + 1 : 0;\\n        }\\n        return maxl;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"102270",
			"view":"1178",
			"top":"2",
			"title":"Verbose Java Solution, HashSet, only search later cells",
			"vote":"6",
			"content":"For each ```unvisited``` direction of each ```1```, we search length of adjacent ```1```s and mark those ```1```s as ```visited``` in that direction. And we only need to search 4 directions: ```right, down, down-right, down-left```. We only access each cell at max 4 times, so time complexity is O(mn). m = number of rows, n = number of columns.\\n```\\npublic class Solution {\\n    public int longestLine(int[][] M) {\\n        int m = M.length;\\n        if (m <= 0) return 0;\\n        int n = M[0].length;\\n        if (n <= 0) return 0;\\n        \\n        Set<String> horizontal = new HashSet<>();\\n        Set<String> vertical = new HashSet<>();\\n        Set<String> diagonal = new HashSet<>();\\n        Set<String> antidiagonal = new HashSet<>();\\n        int max = 0;\\n        \\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                if (M[i][j] == 0) continue;\\n                String pos = i + \",\" + j;\\n                if (!horizontal.contains(pos)) {\\n                    int count = 0;\\n                    for (int k = j; k < n; k++) {\\n                        if (M[i][k] == 1) {\\n                            count++;\\n                            horizontal.add(i + \",\" + k);\\n                        }\\n                        else break;\\n                    }\\n                    max = Math.max(max, count);\\n                }\\n                if (!vertical.contains(pos)) {\\n                    int count = 0;\\n                    for (int k = i; k < m; k++) {\\n                        if (M[k][j] == 1) {\\n                            count++;\\n                            vertical.add(k + \",\" + j);\\n                        }\\n                        else break;\\n                    }\\n                    max = Math.max(max, count);\\n                }\\n                if (!diagonal.contains(pos)) {\\n                    int count = 0;\\n                    for (int k = i, l = j; k < m && l < n; k++, l++) {\\n                        if (M[k][l] == 1) {\\n                            count++;\\n                            diagonal.add(k + \",\" + l);\\n                        }\\n                        else break;\\n                    }\\n                    max = Math.max(max, count);\\n                }\\n                if (!antidiagonal.contains(pos)) {\\n                    int count = 0;\\n                    for (int k = i, l = j; k < m && l >= 0; k++, l--) {\\n                        if (M[k][l] == 1) {\\n                            count++;\\n                            antidiagonal.add(k + \",\" + l);\\n                        }\\n                        else break;\\n                    }\\n                    max = Math.max(max, count);\\n                }\\n            }\\n        }\\n        \\n        return max;\\n    }\\n}\\n```\\n\\nA more concise version.\\n```\\npublic class Solution {\\n    public int longestLine(int[][] M) {\\n        int m = M.length;\\n        if (m <= 0) return 0;\\n        int n = M[0].length;\\n        if (n <= 0) return 0;\\n        \\n        int max = 0;\\n        int[][] dirs = {{0, 1}, {1, 0}, {1, 1}, {1, -1}};\\n        List<Set<String>> memo = new ArrayList<>();\\n        for (int i = 0; i < 4; i++) {\\n            memo.add(new HashSet<String>());\\n        }\\n        \\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                if (M[i][j] == 0) continue;\\n                String pos = i + \",\" + j;\\n                for (int k = 0; k < 4; k++) {\\n                    if (!memo.get(k).contains(pos)) {\\n                        int count = 0;\\n                        for (int r = i, c = j; r < m && r >= 0 && c < n && c >= 0; r += dirs[k][0], c += dirs[k][1]) {\\n                            if (M[r][c] == 1) {\\n                                count++;\\n                                memo.get(k).add(r + \",\" + c);\\n                            }\\n                            else break;\\n                        }\\n                        max = Math.max(max, count);\\n                    }\\n                }\\n            }\\n        }\\n        \\n        return max;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102296",
			"view":"927",
			"top":"3",
			"title":"Simple and Concise Java Solution (Easy to Understand O(m+n) space)",
			"vote":"5",
			"content":"\\n    public int longestLine(int[][] M) {\\n        if (M.length == 0 || M[0].length == 0) {\\n            return 0;\\n        }\\n        int max = 0;\\n        int[] col = new int[M[0].length];\\n        int[] diag = new int[M.length + M[0].length];\\n        int[] antiD = new int[M.length + M[0].length];\\n        for (int i = 0; i < M.length; i++) {\\n            int row = 0;\\n            for (int j = 0; j < M[0].length; j++) {\\n                if (M[i][j] == 1) {\\n                    row++;\\n                    col[j]++;\\n                    diag[j + i]++;\\n                    antiD[j - i + M.length]++;\\n                    max = Math.max(max, row);\\n                    max = Math.max(max, col[j]);\\n                    max = Math.max(max, diag[j + i]);\\n                    max = Math.max(max, antiD[j - i + M.length]);\\n                } else {\\n                    row = 0;\\n                    col[j] = 0;\\n                    diag[j + i] = 0;\\n                    antiD[j - i + M.length] = 0;\\n                }\\n            }\\n        }\\n        return max;\\n}\\n\\nBtw, I realized this is very similar to N-Queens. You can use the above approach and DFS to easily tackle down N-Queens problems."
		},
		{
			"lc_ans_id":"102310",
			"view":"947",
			"top":"4",
			"title":"Java Straightforward Solution",
			"vote":"5",
			"content":"Very straightforward solution. Easy to understand. Prerequisite for DP solution. No comment is needed. \\n```\\npublic class Solution {\\n    public int longestLine(int[][] M) {\\n        if(M == null) return 0;\\n        int res = 0;\\n        for(int i =0;i<M.length;i++){\\n            for(int j = 0;j<M[0].length;j++){\\n                if(M[i][j] == 1){\\n                    res = Math.max(res,getMaxOneLine(M, i, j));\\n                }\\n            }\\n        }\\n        return res;\\n    }\\n    final int [][] dirs = new int[][]{{1,0},{0,1},{1,1},{1,-1}};\\n    private int getMaxOneLine(int [][] M, int x, int y){\\n        int res = 1;\\n        for(int [] dir:dirs){\\n            int i = x+dir[0];\\n            int j = y+dir[1];\\n            int count = 1;\\n            while(isValidPosition(M, i, j) && M[i][j] == 1){\\n                i+=dir[0];\\n                j+=dir[1];\\n                count++;\\n            }\\n            res = Math.max(count,res);\\n        }\\n        return res;\\n    }\\n    \\n    private boolean isValidPosition(int M[][], int i, int j){\\n        return (i<M.length && j<M[0].length && i>=0 && j>=0);\\n    }\\n}"
		},
		{
			"lc_ans_id":"102312",
			"view":"327",
			"top":"5",
			"title":"10-line C++ DP O(n) Solution",
			"vote":"2",
			"content":"O(n) where n is the input size, elements in the matrix.\\n\\n```\\nclass Solution {\\npublic:\\n    int longestLine(vector<vector<int>>& M) {\\n        int H = M.size(), W = H?M[0].size():0, res = 0;\\n        vector<vector<vector<int>>> dp(H, vector<vector<int>>(W, vector<int>(4, 0)));\\n        for(int i=0;i<H;i++) \\n            for(int j=0;j<W;j++)\\n                if(M[i][j]==1) {\\n                    res=max(res,  dp[i][j][0]= 1 + (j?dp[i][j-1][0]:0)  ); // horizontal\\n                    res=max(res,  dp[i][j][1]= 1 + (i?dp[i-1][j][1]:0)  ); // vertical\\n                    res=max(res,  dp[i][j][2]= 1 + (i&&j?dp[i-1][j-1][2]:0)  ); // diagonal\\n                    res=max(res,  dp[i][j][3]= 1 + (i&&j<W-1?dp[i-1][j+1][3]:0)  ); // anti-diagonal\\n                }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"102277",
			"view":"86",
			"top":"6",
			"title":"C++ O(mn) time O(m+n) space",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    int longestLine(vector<vector<int>>& M) {\\n        int h = M.size(), w = h ? M[0].size():0;\\n        if (!h) return 0;\\n        \\n        vector<int> row(h, 0), col(w, 0), diag(h+w+1, 0), adiag(h+w+1, 0);\\n        int maxlen = 0;\\n        for (int i = 0; i < h; ++i) {\\n            for (int j = 0; j < w; ++j) {\\n                if (!M[i][j]) {\\n                    row[i] = col[j] = diag[w+i-j] = adiag[i+j] = 0;\\n                } else {\\n                    ++row[i], ++col[j], ++diag[w+i-j], ++adiag[i+j];\\n                    maxlen = max(maxlen, max(row[i], max(col[j], max(diag[w+i-j], adiag[i+j]))));\\n                }\\n            }\\n        }\\n        return maxlen;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"102306",
			"view":"209",
			"top":"7",
			"title":"Java short dp AC solution",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    int[][] directions = { { 0, -1 }, { -1, -1 }, { -1, 0 }, { -1, 1 } };\\n    public int longestLine(int[][] matrix) {\\n        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {\\n            return 0;\\n        }\\n        int m = matrix.length;\\n        int n = matrix[0].length;\\n        int[][][] lengths = new int[m][n][4];\\n        int max = 0;\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                if (matrix[i][j] == 0) {\\n                    continue;\\n                }\\n                int k = 0;\\n                for (int[] direction : directions) {\\n                    int row = i + direction[0];\\n                    int col = j + direction[1];\\n                    lengths[i][j][k] = row >= 0 && col >= 0 && col < n ? lengths[row][col][k] + 1 : 1;\\n                    max = Math.max(max, lengths[i][j][k]);\\n                    k++;\\n                }\\n            }\\n        }\\n        return max;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102288",
			"view":"443",
			"top":"8",
			"title":"DFS straightforward",
			"vote":"1",
			"content":"not optimal solution, but accepted.\\n```\\n    int maxLen=0;\\n    public int longestLine(int[][] M) {\\n        if(M==null||M.length==0||M[0].length==0) return 0;\\n        int A=M.length;int B=M[0].length;\\n        for(int i=0;i<A;i++)\\n        for(int j=0;j<B;j++){\\n            if(M[i][j]==1){\\n                dfs(M,i,j,0);\\n                dfs(M,i,j,1);\\n                dfs(M,i,j,2);\\n                dfs(M,i,j,3);\\n            }\\n        }\\n        return maxLen;\\n    }\\n    \\n    int [][]dir={{1,0},{0,1},{-1,-1},{-1,1}};\\n    \\n    private void dfs(int[][] M,int i,int j,int mode){\\n        \\n        int len=0;int A=M.length;int B=M[0].length;\\n        int x=i,y=j;\\n        while(x>=0&&x<A&&y>=0&&y<B&&M[x][y]==1){\\n            x=x+dir[mode][0];\\n            y=y+dir[mode][1];\\n            len++;\\n        }\\n        maxLen=Math.max(maxLen,len);\\n        \\n    }\\n```"
		},
		{
			"lc_ans_id":"102275",
			"view":"371",
			"top":"9",
			"title":"Python, Simple with Explanation",
			"vote":"1",
			"content":"We can separate the problem into two subproblems.  The first subproblem is, given a 1 dimensional list of 0's and 1's, what is the longest chain of consecutive 1s?  The second subproblem is to generate every line (row, column, diagonal, and anti-diagonal).\\n\\nThe first problem is common.  We keep track of the number of 1's we've seen before.  If we see a 1, we add to our count and update our answer.  If we see a 0, we reset.  Alternatively, we can also use ```itertools.groupby```.  Straightforward code for the first part looks like this:\\n```\\ndef score(line):\\n  ans = count = 0\\n  for x in line:\\n    if x:\\n      count += 1\\n      ans = max(ans, count)\\n    else:\\n      count = 0\\n  return ans\\n```\\n\\nThe second part is more complex.  We can try to manipulate indices of the grid, but there is a trick.  Each element in the grid belongs to exactly 4 lines: the r-th row, c-th column, (r+c)-th diagonal, and (r-c)-th anti-diagonal.  We scan from left to right, top to bottom, adding each element's value to it's respective 4 groups.  As we visited in reading order, our lines will be appended to in that order, which is suitable for our purposes.\\n\\n```\\ndef longestLine(self, A):\\n    if not A: return 0\\n    \\n    def score(line):\\n        return max(len(list(v)) if k else 0 \\n                   for k, v in itertools.groupby(line))\\n    \\n    groups = collections.defaultdict(list)\\n    for r, row in enumerate(A):\\n        for c, val in enumerate(row):\\n            groups[0, r] += [val]\\n            groups[1, c] += [val]\\n            groups[2, r+c] += [val]\\n            groups[3, r-c] += [val]\\n    \\n    return max(map(score, groups.itervalues()))\\n```"
		}
	],
	"id":"543",
	"title":"Longest Line of Consecutive One in Matrix",
	"content":"Given a 01 matrix <b>M</b>, find the longest line of consecutive one in the matrix. The line could be horizontal, vertical, diagonal or anti-diagonal.\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n[[0,1,1,0],\r\n [0,1,1,0],\r\n [0,0,0,1]]\r\n<b>Output:</b> 3\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Hint:</b>\r\nThe number of elements in the given matrix will not exceed 10,000.\r\n</p>",
	"frequency":"70",
	"ac_num":"6008"
}