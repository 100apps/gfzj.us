{
	"difficulty":"2",
	"submit_num":"27311",
	"show_id":"576",
	"leetcode_id":"576",
	"answers":[
		{
			"lc_ans_id":"102966",
			"view":"5837",
			"top":"0",
			"title":"C++ 6 lines DP O(N * m * n), 6 ms",
			"vote":"25",
			"content":"The number of paths for N moves is the sum of paths for N - 1 moves from the adjacent cells. If an adjacent cell is out of the border, the number of paths is 1.\\n```\\nint findPaths(int m, int n, int N, int i, int j) {\\n  uint dp[51][50][50] = {};\\n  for (auto Ni = 1; Ni <= N; ++Ni)\\n    for (auto mi = 0; mi < m; ++mi)\\n      for (auto ni = 0; ni < n; ++ni)\\n        dp[Ni][mi][ni] = ((mi == 0 ? 1 : dp[Ni - 1][mi - 1][ni]) + (mi == m - 1? 1 : dp[Ni - 1][mi + 1][ni])\\n            + (ni == 0 ? 1 : dp[Ni - 1][mi][ni - 1]) + (ni == n - 1 ? 1 : dp[Ni - 1][mi][ni + 1])) % 1000000007;\\n  return dp[N][i][j];\\n}\\n```\\nWe can also reduce the memory usage by using two grids instead of N, as we only need to look one step back. We can use N % 2 and (N + 1) % 2 to alternate grids so we do not have to copy.\\n```\\nint findPaths(int m, int n, int N, int i, int j) {\\n    unsigned int g[2][50][50] = {};\\n    while (N-- > 0)\\n        for (auto k = 0; k < m; ++k)\\n            for (auto l = 0, nc = (N + 1) % 2, np = N % 2; l < n; ++l)\\n                g[nc][k][l] = ((k == 0 ? 1 : g[np][k - 1][l]) + (k == m - 1 ? 1 : g[np][k + 1][l])\\n                    + (l == 0 ? 1 : g[np][k][l - 1]) + (l == n - 1 ? 1 : g[np][k][l + 1])) % 1000000007;\\n    return g[1][i][j];\\n}\\n```\\nAs suggested by @mingthor, we can further decrease the memory usage (2 * m * n >> m * (n + 1)) as we only looking one row up. We will store new values for the current row in an array, and write these values back to the matrix as we process cells in the next row. This approach, however, impacts the runtime as we need extra copying for each step.\\n\\nI experimented with different n and m (50 - 500), and N (5,000 - 50,000), and the second solution is approximately 10% faster than this one.\\n```\\nint findPaths(int m, int n, int N, int i, int j) {\\n    unsigned int g[50][50] = {}, r[50];\\n    while (N-- > 0)\\n        for (auto k = 0; k <= m; ++k)\\n            for (auto l = 0; l < n; ++l) {\\n                auto tmp = r[l];\\n                r[l] = (k == m ? 0 : ((k == 0 ? 1 : g[k - 1][l]) + (k == m - 1 ? 1 : g[k + 1][l])\\n                    + (l == 0 ? 1 : g[k][l - 1]) + (l == n - 1 ? 1 : g[k][l + 1])) % 1000000007);\\n                if (k > 0) g[k - 1][l] = tmp;\\n            }\\n    return g[i][j];\\n}\\n```"
		},
		{
			"lc_ans_id":"102967",
			"view":"4177",
			"top":"1",
			"title":"Java Solution, DP with space compression",
			"vote":"20",
			"content":"```DP[i][j][k]``` stands for how many possible ways to walk into cell ```j,k``` in step ```i```, ```DP[i][j][k]``` only depends on ```DP[i - 1][j][k]```, so we can compress 3 dimensional dp array to 2 dimensional. \\n\\n```\\npublic class Solution {\\n    public int findPaths(int m, int n, int N, int i, int j) {\\n        if (N <= 0) return 0;\\n        \\n        final int MOD = 1000000007;\\n        int[][] count = new int[m][n];\\n        count[i][j] = 1;\\n        int result = 0;\\n        \\n        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};\\n        \\n        for (int step = 0; step < N; step++) {\\n            int[][] temp = new int[m][n];\\n            for (int r = 0; r < m; r++) {\\n                for (int c = 0; c < n; c++) {\\n                    for (int[] d : dirs) {\\n                        int nr = r + d[0];\\n                        int nc = c + d[1];\\n                        if (nr < 0 || nr >= m || nc < 0 || nc >= n) {\\n                            result = (result + count[r][c]) % MOD;\\n                        }\\n                        else {\\n                            temp[nr][nc] = (temp[nr][nc] + count[r][c]) % MOD;\\n                        }\\n                    }\\n                }\\n            }\\n            count = temp;\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102971",
			"view":"1387",
			"top":"2",
			"title":"Clean Code - 8 Solutions (6 C++ & 2 java)",
			"vote":"8",
			"content":"<h3>Java</h3>\\n**3D DP - space O(N.m.n)**\\n```\\npublic class Solution {\\n    public int findPaths(int m, int n, int N, int i0, int j0) {\\n        long limit = 1000000007;\\n        long[][][] dp = new long[N + 1][m][n];\\n        for (int k = 1; k <= N; k++) {\\n            for (int i = 0; i < m; i++) {\\n                for (int j = 0; j < n; j++) {\\n                    dp[k][i][j] += i == 0     ? 1 : dp[k - 1][i - 1][j];\\n                    dp[k][i][j] += i == m - 1 ? 1 : dp[k - 1][i + 1][j];\\n                    dp[k][i][j] += j == 0     ? 1 : dp[k - 1][i][j - 1];\\n                    dp[k][i][j] += j == n - 1 ? 1 : dp[k - 1][i][j + 1];\\n                    dp[k][i][j] %= limit;\\n                }\\n            }\\n        }\\n        return (int)dp[N][i0][j0];        \\n    }\\n}\\n```\\n**Rolling Matrix - space O(m.n)**\\n```\\npublic class Solution {\\n    public int findPaths(int m, int n, int N, int i0, int j0) {\\n        long limit = 1000000007;\\n        long[][][] dp = new long[2][m][n];\\n        for (int k = 1; k <= N; k++) {\\n            for (int i = 0; i < m; i++) {\\n                for (int j = 0; j < n; j++) {\\n                    dp[k % 2][i][j] =((i == 0     ? 1 : dp[(k - 1) % 2][i - 1][j])\\n                                    + (i == m - 1 ? 1 : dp[(k - 1) % 2][i + 1][j])\\n                                    + (j == 0     ? 1 : dp[(k - 1) % 2][i][j - 1])\\n                                    + (j == n - 1 ? 1 : dp[(k - 1) % 2][i][j + 1])) % limit;\\n                }\\n            }\\n        }\\n        return (int)dp[N % 2][i0][j0];        \\n    }\\n}\\n```\\n\\n<h3> C++</h3>\\n**1. 3D DP**\\n```\\nclass Solution {\\npublic:\\n    int findPaths(int m, int n, int N, int i, int j) {\\n        size_t limit = 1000000007;\\n        vector<vector<vector<size_t>>> dp(N + 1, vector<vector<size_t>>(m, vector<size_t>(n, 0)));\\n        for (int k = 1; k <= N; k++) {\\n            for (int i = 0; i < m; i++) {\\n                for (int j = 0; j < n; j++) {\\n                    dp[k][i][j] += i == 0     ? 1 : dp[k - 1][i - 1][j];\\n                    dp[k][i][j] += i == m - 1 ? 1 : dp[k - 1][i + 1][j];\\n                    dp[k][i][j] += j == 0     ? 1 : dp[k - 1][i][j - 1];\\n                    dp[k][i][j] += j == n - 1 ? 1 : dp[k - 1][i][j + 1];\\n                    dp[k][i][j] %= limit;\\n                }\\n            }\\n        }\\n        return dp[N][i][j];\\n    }\\n};\\n```\\n\\n**2. Functor**\\n```\\nclass Solution {\\npublic:\\n    int findPaths(int m, int n, int N, int i0, int j0) {\\n        vector<vector<vector<uint>>> dp(N + 1, vector<vector<uint>>(m, vector<uint>(n, 0)));\\n        auto paths = [&](int k, int i, int j) { return (i < 0 || i >= m || j < 0 || j >= n) ? 1 : dp[k][i][j]; };\\n        for (int k = 1; k <= N; k++) {\\n            for (int i = 0; i < m; i++) {\\n                for (int j = 0; j < n; j++) {\\n                    dp[k][i][j] = paths(k - 1, i - 1, j) + paths(k - 1, i + 1, j) + paths(k - 1, i, j - 1) + paths(k - 1, i, j + 1);\\n                    dp[k][i][j] %= 1000000007;\\n                }\\n            }\\n        }\\n        return dp[N][i0][j0];\\n    }\\n};\\n```\\n**3. Functor & Rolling Matrix**\\n```\\nclass Solution {\\npublic:\\n    int findPaths(int m, int n, int N, int i0, int j0) {\\n        vector<vector<vector<uint>>> dp(N + 1, vector<vector<uint>>(m, vector<uint>(n, 0)));\\n        auto paths = [&](int k, int i, int j) { return (i < 0 || i >= m || j < 0 || j >= n) ? 1 : dp[k % 2][i][j]; };\\n        for (int k = 1; k <= N; k++) {\\n            for (int i = 0; i < m; i++) {\\n                for (int j = 0; j < n; j++) {\\n                    dp[k % 2][i][j] = paths(k - 1, i - 1, j) + paths(k - 1, i + 1, j) + paths(k - 1, i, j - 1) + paths(k - 1, i, j + 1);\\n                    dp[k % 2][i][j] %= 1000000007;\\n                }\\n            }\\n        }\\n        return dp[N % 2][i0][j0];\\n    }\\n};\\n```\\n**4. Use Functor for Rolling**\\n```\\nclass Solution {\\npublic:\\n    int findPaths(int m, int n, int N, int i0, int j0) {\\n        vector<vector<vector<uint>>> dp(2, vector<vector<uint>>(m, vector<uint>(n, 0)));\\n        auto paths = [&](int k, int i, int j) ->uint& { uint one = 1; return (i < 0 || i >= m || j < 0 || j >= n) ? one : dp[k % 2][i][j]; };\\n        for (int k = 1; k <= N; k++) {\\n            for (int i = 0; i < m; i++) {\\n                for (int j = 0; j < n; j++) {\\n                    paths(k, i, j) = paths(k - 1, i - 1, j) + paths(k - 1, i + 1, j) + paths(k - 1, i, j - 1) + paths(k - 1, i, j + 1);\\n                    paths(k, i, j) %= 1000000007;\\n                }\\n            }\\n        }\\n        return paths(N, i0, j0);\\n    }\\n};\\n```\\n**5. Functor Rolling Array & Delta Sequence**\\n```\\nclass Solution {\\npublic:\\n    int findPaths(int m, int n, int N, int i0, int j0) {\\n        vector<vector<vector<uint>>> dp(2, vector<vector<uint>>(m, vector<uint>(n, 0)));\\n        auto paths = [&](int k, int i, int j) ->uint& { uint one = 1; return (i < 0 || i >= m || j < 0 || j >= n) ? one : dp[k % 2][i][j]; };\\n        int delta[4][2] = {-1, 0, 1, 0, 0, -1, 0, 1};\\n        for (int k = 1; k <= N; k++) {\\n            for (int i = 0; i < m; i++) {\\n                for (int j = 0; j < n; j++) {\\n                    paths(k, i, j) = 0; // reset before reuse\\n                    for (int d = 0; d < 4; d++) {\\n                        paths(k, i, j) += paths(k - 1, i + delta[d][0], j + delta[d][1]);\\n                    }\\n                    paths(k, i, j) %= 1000000007;\\n                }\\n            }\\n        }\\n        return paths(N, i0, j0);\\n    }\\n};\\n```\\n\\n**6. DFS - TLE :(**\\n```\\nclass Solution {\\npublic:\\n    int findPaths(int m, int n, int N, int i, int j) {\\n        int limit = 1000000007;\\n        int paths = 0;\\n        dfs(m, n, N, i, j, paths, limit);\\n        return paths;\\n    }\\n\\nprivate:\\n    void dfs(int m, int n, int N, int i, int j, int& paths, int limit) {\\n        if (N > 0 && paths < limit && i >= 0 && i < m && j >= 0 && j < n) {\\n            if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {\\n                paths += i == 0;\\n                paths += i == m - 1;\\n                paths += j == 0;\\n                paths += j == n - 1;\\n                if (N == 0 || paths >= limit)\\n                    return;\\n            }\\n\\n            dfs(m, n, N - 1, i + 1, j, paths, limit);\\n            dfs(m, n, N - 1, i - 1, j, paths, limit);\\n            dfs(m, n, N - 1, i, j + 1, paths, limit);\\n            dfs(m, n, N - 1, i, j - 1, paths, limit);\\n        }\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103001",
			"view":"1029",
			"top":"3",
			"title":"Fast Python solution using NumPy",
			"vote":"5",
			"content":"Fastest posted Python solution so far. Takes about 120 ms, of which about 80 ms are for judge overhead and importing NumPy. The other three Python solutions posted so far take about 350-850 ms, of which about 40 ms are for judge overhead.\\n\\nMy two-dimensional `paths` array tells the number of paths ending at each cell with the moves made so far. So initially all zeros except for the starting position, which has one path (the empty path). The for each move, I spread each path number in all four directions.\\n\\nThis only keeps track of the paths staying **inside** the boundary. To compute how many paths went **outside** in the latest move, I take all previous paths, multiply them by 4 (for the four directions) and subtract the new number of inside-paths after the move.\\n```\\nimport numpy as np\\n\\nclass Solution(object):\\n    def findPaths(self, m, n, N, i, j):\\n        paths = np.zeros((m, n), dtype=np.int64)\\n        paths[i][j] = 1\\n        out = 0\\n        mod = 10**9 + 7\\n        for _ in range(N):\\n            prev = paths % mod\\n            paths = prev - prev\\n            paths[1:] += prev[:-1]\\n            paths[:-1] += prev[1:]\\n            paths[:,1:] += prev[:,:-1]\\n            paths[:,:-1] += prev[:,1:]\\n            out += 4 * prev.sum() - paths.sum()\\n        return int(out % mod)\\n```\\nA slightly shorter version using Python `int`s (which can grow arbitrarily large) and doing mod 10<sup>9</sup>-7 only at the end:\\n```\\nimport numpy as np\\n\\nclass Solution(object):\\n    def findPaths(self, m, n, N, i, j):\\n        paths = np.zeros((m, n), dtype=object)\\n        paths[i][j] = 1\\n        out = 0\\n        for _ in range(N):\\n            prev = paths\\n            paths = prev * 0\\n            paths[1:] += prev[:-1]\\n            paths[:-1] += prev[1:]\\n            paths[:,1:] += prev[:,:-1]\\n            paths[:,:-1] += prev[:,1:]\\n            out += 4 * prev.sum() - paths.sum()\\n        return out % (10**9 + 7)\\n ```\\nStill fairly fast, about 190 ms."
		},
		{
			"lc_ans_id":"102993",
			"view":"1192",
			"top":"4",
			"title":"Python, Straightforward with Explanation",
			"vote":"4",
			"content":"At time t, let's maintain ```cur[r][c]``` = the number of paths to ```(r, c)``` with ```t``` moves, and ```nxt[r][c]``` = the number of paths to ```(r, c)``` with ```t+1``` moves.\\n\\nA ball at ```(r, c)``` at time ```t```, can move in one of four directions.  If it stays on the board, then it contributes to a path that takes ```t+1``` moves.  If it falls off the board, then it contributes to the final answer.\\n\\n```\\ndef findPaths(self, R, C, N, sr, sc):\\n    MOD = 10**9 + 7\\n    nxt = [[0] * C for _ in xrange(R)]\\n    nxt[sr][sc] = 1\\n    \\n    ans = 0\\n    for time in xrange(N):\\n        cur = nxt\\n        nxt = [[0] * C for _ in xrange(R)]\\n        for r, row in enumerate(cur):\\n            for c, val in enumerate(row):\\n                for nr, nc in ((r-1, c), (r+1, c), (r, c-1), (r, c+1)):\\n                    if 0 <= nr < R and 0 <= nc < C:\\n                        nxt[nr][nc] += val\\n                        nxt[nr][nc] %= MOD\\n                    else:\\n                        ans += val\\n                        ans %= MOD\\n        \\n    return ans\\n```"
		},
		{
			"lc_ans_id":"102975",
			"view":"147",
			"top":"5",
			"title":"Python 1 line solution",
			"vote":"2",
			"content":"`````\\ndef findPaths(self, m, n, N, x, y):\\n        M = [[0 for i in range(n)] for j in range(m)]\\n        for _ in range(N):\\n            M = [[(i == 0 or M[i - 1][j]) + (i + 1 == m or M[i + 1][j])\\n                  + (j == 0 or M[i][j - 1]) + (j + 1 == n or M[i][j + 1])\\n                  for j in range(n)] for i in range(m)]\\n        return M[x][y] % (10 ** 9 + 7)\\n`````\\nMake it 1-line:\\n`````\\ndef findPaths(self, m, n, N, x, y):\\n        return reduce(lambda M, _:\\n              [[(i == 0 or M[i - 1][j]) + (i + 1 == m or M[i + 1][j])\\n              + (j == 0 or M[i][j - 1]) + (j + 1 == n or M[i][j + 1])\\n              for j in range(n)] for i in range(m)], range(N),\\n              [[0 for i in range(n)] for j in range(m)])[x][y] % (10 ** 9 + 7)"
		},
		{
			"lc_ans_id":"103007",
			"view":"433",
			"top":"6",
			"title":"dp(m*n*N) time, java",
			"vote":"2",
			"content":"```\\nprivate int sum=0;\\n    int [][]dirs={{1,0},{0,1},{-1,0},{0,-1}};\\n    public int findPaths(int m, int n, int N, int i, int j) {\\n        long [][][]dp=new long[m+2][n+2][N+1];\\n        \\n        dp[i+1][j+1][0]=1;\\n        for(int k=0;k<N;k++){\\n            for(int p=0;p<m+2;p++)\\n            for(int q=0;q<n+2;q++)\\n            {\\n                for(int []d:dirs){\\n                    int x=p+d[0],y=q+d[1];\\n                    if(x>=1&&y>=1&&x<=m&&y<=n)\\n                        dp[p][q][k+1]+=(dp[x][y][k]%(1000000007)+(1000000007))%(1000000007);\\n                }\\n                if(p==0||q==0||p==m+1||q==n+1)\\n                {\\n                    sum+=((long)dp[p][q][k+1]%(1000000007));\\n                    sum=sum%(1000000007);\\n                }\\n            }\\n        }\\n        return (int)sum;\\n    }\\n```"
		},
		{
			"lc_ans_id":"103009",
			"view":"737",
			"top":"7",
			"title":"Easy-understanding C++ & Python solution with explanation",
			"vote":"2",
			"content":"The time complexity of answer is O(m*n*N).\\n\\nAnd we need to use **dynamic programming (for remembering the existing searching)** and **DFS (for searching the answer)** to solve this problem.\\n\\nC++ version:\\n```\\nclass Solution {\\nprivate:\\n    int m, n, N, dx[4] = {-1, 1, 0, 0}, dy[4] = {0, 0, -1, 1};\\n    const int mod = 1e9 + 7;\\n    bool check(int i, int j) {return i >= m || j >= n || i < 0 || j < 0;}\\npublic:\\n    int findPaths(int m, int n, int N, int i, int j) {\\n        this->m = m, this->n = n, this->N = N;\\n        vector<vector<int>> dp(m * n, vector<int>(N, -1));\\n        return solve(i, j, N, dp, 0);\\n    }\\n    int solve(int i, int j, int step, vector<vector<int>>& dp, int ans) {\\n        if (check(i, j)) return 1; // out of boundary, count as 1 way\\n        if (step == 0) return 0; // without steps but not out of bounday, don't count as a way\\n        if (dp[i*n + j][step-1] == -1) {\\n            // the answer came from 4 paths: top, down, left, right\\n            for (int k=0; k<4; ++k) \\n                ans = (ans + solve(i + dx[k], j + dy[k], step-1, dp, 0) % mod) % mod;\\n            dp[i*n + j][step-1] = ans;\\n        }\\n        return dp[i*n + j][step-1];\\n    }\\n};\\n```\\nPython version:\\n```\\nclass Solution(object):\\n    dx = [-1,1,0,0]\\n    dy = [0,0,-1,1]\\n    lc = 1e9 + 7\\n\\n    def solve(self, i, j, step, dp, ans, m, n, N):\\n        if i >= m or j >= n or i < 0 or j < 0:\\n            return 1\\n        if step == 0:\\n            return 0\\n        if dp[i*n +j][step - 1] == -1:\\n            for k in xrange(4):\\n                ans = (ans + self.solve(i + self.dx[k], j + self.dy[k], step-1, dp, 0, m, n, N) % self.lc) % self.lc\\n            dp[i*n + j][step - 1] = ans\\n        return int(dp[i*n + j][step - 1])\\n        \\n    def findPaths(self, m, n, N, i, j):\\n        dp = [[-1 for t in xrange(N)] for k in xrange(m*n)]\\n        return self.solve(i, j, N, dp, 0, m, n, N)\\n```"
		},
		{
			"lc_ans_id":"102977",
			"view":"97",
			"top":"8",
			"title":"C++ Solution, DFS",
			"vote":"1",
			"content":"a simple solution using dfs,a trick is used to avoid over flow\\n```\\nclass Solution {\\npublic:\\n    int findPaths(int m, int n, int N, int i, int j) {\\n        \\n        vector<vector<vector<int>>> memory(m,vector<vector<int>>(n,vector<int>(N+1,0)));\\n        dfs(m,n,0,N,i,j,memory);\\n        return memory[i][j][N];\\n    }\\n    int dfs(int m,int n, int times, int N,int i,int j,vector<vector<vector<int>>>& memory) {\\n        \\n        if(i<0||i>=m||j<0||j>=n||times>=N) return 0;\\n        if (i-(N-times) >= 0 && i + (N-times) < m && j - (N-times) >=0 && j + (N-times) < n) return 0; // key constraint\\n        if(times<N&&memory[i][j][N-times]>0) return memory[i][j][N-times];\\n        if((i==0||i==m-1||j==0||j==n-1)&&times<N) {\\n            if(i==0) memory[i][j][N-times]++;\\n            if(i==m-1) memory[i][j][N-times]++;\\n            if(j==0) memory[i][j][N-times]++;\\n            if(j==n-1) memory[i][j][N-times]++;\\n\\n        }\\n        memory[i][j][N-times]=memory[i][j][N-times]%1000000007;\\n        memory[i][j][N-times]=(memory[i][j][N-times]+dfs(m,n,times+1,N,i+1,j,memory))%1000000007;\\n        memory[i][j][N-times]=(memory[i][j][N-times]+dfs(m,n,times+1,N,i-1,j,memory))%1000000007;\\n        memory[i][j][N-times]=(memory[i][j][N-times]+dfs(m,n,times+1,N,i,j+1,memory))%1000000007;\\n        memory[i][j][N-times]=(memory[i][j][N-times]+dfs(m,n,times+1,N,i,j-1,memory))%1000000007;\\n        return memory[i][j][N-times];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"102999",
			"view":"187",
			"top":"9",
			"title":"C++ 3ms O(min(N^3, mnN)) Time, O(mn) Space Solution, w/ Explanation",
			"vote":"1",
			"content":"I don't do a line by line scan, instead, I do a diagonal scan. And I also only scan what should be updated, and ignore most others.\\nSo my algorithm runs with a O(N^3) time complexity instead of O(mnN). And of course, it doesn't scan a cell out of boundaries so the worst case will be O(mnN), when N^3 > mnN. This makes it faster than a line by line O(mnN) solution.\\n\\n\\nAnd also, my algorithm only needs O(mn) space. Note, It is entirely possible to reduce the space to O(min(N^2, mn)) too using my algorithm, if we just store all reachable cells in a N^2 space. However, it will make the implementation utterly messy, so I will still use the traditional O(mn) grid.\\n\\nShow an example of my idea:\\nInput, 5,5,3,2,2\\nAt the very beginning, only position 2,2 has a value 1, means by 0 move, there is only 1 unique way to reach (2,2), and 0 unique ways to reach all other places:\\n```\\n0 0 0 0 0\\n0 0 0 0 0\\n0 0 1 0 0\\n0 0 0 0 0\\n0 0 0 0 0\\n````\\nMy algorithm scans this way:\\n```\\n0 0 0 0 0\\n0 0 \\\\ 0 0\\n0 \\\\ 1 \\\\ 0\\n0 0 \\\\ 0 0\\n0 0 0 0 0\\n```\\n\"\\\\\\\\\" means it scans from top-left to bottom-right, and it only scans the cells marked with a \"\\\\\\\\\". So to calculate move #1, it only scans 4 positions instead of all 25 positions.\\nAll scanned positions will add the values from all its neighbors. The result after first round of update:\\n```\\n0 0 0 0 0\\n0 0 1 0 0\\n0 1 1 1 0\\n0 0 1 0 0\\n0 0 0 0 0\\n```\\nThen it scans this way:\\n```\\n0 0 \\\\ 0 0\\n0 \\\\ 1 \\\\ 0\\n\\\\ 1 \\\\ 1 \\\\\\n0 \\\\ 1 \\\\ 0\\n0 0 \\\\ 0 0\\n```\\nResults after 2nd round:\\n```\\n0 0 1 0 0\\n0 2 1 2 0\\n1 1 4 1 1\\n0 2 1 2 0\\n0 0 1 0 0\\n```\\nFor all those cells that touches borders, the number of ways the ball can get out from this cell is the number on that cell times the number of directions it can get out. \\nFor example, a cell at corners have 2 directions to get out, but the one on the border just has 1. So if a corner cell has a value K, the sum should add 2K.\\n\\nThe implementation of this algorithm is rather more complicated than it appears, because you need to do a lot of corner case handling when scanning diagonally. Here is the implementation:\\n```\\nstruct Solution {\\n    const static int BASE = 1000000007;\\n    int findPaths(int height, int width, int maxmove, const int si, const int sj) {\\n        int grid[height][width];\\n        memset(grid, 0, sizeof(int) * height * width);\\n        int sum = 0;\\n        for (int k = 0; k < maxmove; ++k)\\n            for (int d = si - sj + k, r = k; d >= si - sj - k; d -= 2, r --)\\n                for(int i = max(max(sj - r,0)+ d,0), j = i - d; i < height && j < width && i <= si + r; i ++, j ++)\\n                {\\n                    grid[i][j] = (k == 0);\\n                    int bound = 4;\\n                    if (i - 1 >= 0)\\n                        grid[i][j] = (grid[i][j] + grid[i - 1][j]) % BASE, bound --;\\n                    if (i + 1 < height)\\n                        grid[i][j] = (grid[i][j] + grid[i + 1][j]) % BASE, bound --;\\n                    if (j - 1 >= 0)\\n                        grid[i][j] = (grid[i][j] + grid[i][j - 1]) % BASE, bound --;\\n                    if (j + 1 < width)\\n                        grid[i][j] = (grid[i][j] + grid[i][j + 1]) % BASE, bound --;\\n                    sum = (sum + bound * (long long)grid[i][j]) % BASE;\\n                }\\n        return sum;\\n    }\\n};  \\n```"
		}
	],
	"id":"557",
	"title":"Out of Boundary Paths",
	"content":"<p>There is an <b>m</b> by <b>n</b> grid with a ball. Given the start coordinate <b>(i,j)</b> of the ball, you can move the ball to <b>adjacent</b> cell or cross the grid boundary in four directions (up, down, left, right). However, you can <b>at most</b> move <b>N</b> times. Find out the number of paths to move the ball out of grid boundary. The answer may be very large, return it after mod 10<sup>9</sup> + 7.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>m = 2, n = 2, N = 2, i = 0, j = 0\r\n<b>Output:</b> 6\r\n<b>Explanation:</b>\r\n<img src=\"/static/images/problemset/out_of_boundary_paths_1.png\" width = \"40%\" />\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b>m = 1, n = 3, N = 3, i = 0, j = 1\r\n<b>Output:</b> 12\r\n<b>Explanation:</b>\r\n<img src=\"/static/images/problemset/out_of_boundary_paths_2.png\" width = \"37%\" />\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>Once you move the ball out of boundary, you cannot move it back.</li>\r\n<li>The length and height of the grid is in range [1,50].</li>\r\n<li>N is in range [0,50].</li>\r\n</ol>\r\n</p>",
	"frequency":"61",
	"ac_num":"8411"
}