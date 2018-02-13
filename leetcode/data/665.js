{
	"difficulty":"2",
	"submit_num":"13233",
	"show_id":"688",
	"leetcode_id":"688",
	"answers":[
		{
			"lc_ans_id":"108181",
			"view":"3397",
			"top":"0",
			"title":"My accepted DP solution",
			"vote":"13",
			"content":"```\\nint[][] moves = {{1, 2}, {1, -2}, {2, 1}, {2, -1}, {-1, 2}, {-1, -2}, {-2, 1}, {-2, -1}};\\npublic double knightProbability(int N, int K, int r, int c) {\\n    int len = N;\\n    double dp0[][] = new double[len][len];\\n    for(double[] row : dp0) Arrays.fill(row, 1);\\n    for(int l = 0; l < K; l++) {\\n        double[][] dp1 = new double[len][len];\\n        for(int i = 0; i < len; i++) {\\n            for(int j = 0; j < len; j++) {\\n                for(int[] move : moves) {\\n                    int row = i + move[0];\\n                    int col = j + move[1];\\n                    if(isLegal(row, col, len)) dp1[i][j] += dp0[row][col];\\n                }\\n            }\\n        }\\n        dp0 = dp1;\\n    }\\n    return dp0[r][c] / Math.pow(8, K); \\n}\\nprivate boolean isLegal(int r, int c, int len) {\\n    return r >= 0 && r < len && c >= 0 && c < len;\\n}\\n```"
		},
		{
			"lc_ans_id":"108187",
			"view":"2006",
			"top":"1",
			"title":"C++/Java, DP, concise solution",
			"vote":"5",
			"content":"For this problem, I think memoization is more optimal than direct DP. The reason is that memoization can avoid a lot of unnecessary subproblems. \\nThe runtime is O(KN^2).\\n\\nC++ \\n```\\nclass Solution {\\npublic:\\n    double knightProbability(int N, int K, int r, int c) {\\n        vector<vector<vector<double>>> dp(K+1, vector<vector<double>>(N, vector<double>(N, -1.0)));\\n        return helper(dp, N, K, r, c)/pow(8, K);\\n    }\\nprivate:\\n    double helper(vector<vector<vector<double>>>& dp, int N, int k, int r, int c) {\\n        // if out of board, return 0.0\\n        if (r < 0 || r >= N || c < 0 || c >= N) return 0.0;\\n        // when k = 0, no more move, so it's 100% safe\\n        if (k == 0) return 1.0;\\n        if (dp[k][r][c] != -1.0) return dp[k][r][c];\\n        dp[k][r][c] = 0.0;\\n        for (int i = -2; i <= 2; i++) {\\n            if (i == 0) continue;\\n            dp[k][r][c] += helper(dp, N, k-1, r+i, c+3-abs(i)) + helper(dp, N, k-1, r+i, c-(3-abs(i)));\\n        }      \\n        return dp[k][r][c];\\n    }\\n};\\n```\\nJava\\n```\\nclass Solution {\\n    int[][] moves = {{1,2},{1,-2},{-1,2},{-1,-2},{2,-1},{2,1},{-2,-1},{-2,1}};\\n    public double knightProbability(int N, int K, int r, int c) {\\n        double[][][] dp = new double[K+1][N][N];\\n        return helper(dp, N, K, r, c)/Math.pow(8.0, K);\\n    }\\n    private double helper(double[][][] dp, int N, int k, int r, int c) {\\n        if (r < 0 || r >= N || c < 0 || c >= N) return 0.0;\\n        if (k == 0) return 1.0;\\n        if (dp[k][r][c] != 0.0) return dp[k][r][c];\\n        for (int i = 0; i < 8; i++)  \\n            dp[k][r][c] += helper(dp, N, k-1, r+moves[i][0], c+moves[i][1]);\\n        return dp[k][r][c]; \\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108209",
			"view":"713",
			"top":"2",
			"title":"Any help with this algorithm please?",
			"vote":"3",
			"content":"My idea is as the below code speaks, it passed 11/21 test cases.\\nI couldn't wrack my brain out of this what could be the bug/flaw of this algorithm.\\nAny 2nd eye look would be greatly appreciated!\\n\\n```\\npublic double knightProbability(int N, int K, int r, int c) {\\n            int[][] directions = {{-2, 1}, {-1, 2}, {1, 2}, {2, 1}, {2, -1}, {1, -2}, {-1, -2}, {-2, -1}};\\n            Queue<int[]> queue = new LinkedList<>();\\n            queue.offer(new int[]{r, c});\\n            double prob = 1.0;\\n            while (!queue.isEmpty() && K-- > 0) {\\n                int[] curr = queue.poll();\\n                int[] positive = new int[1];\\n                for (int i = 0; i < directions.length; i++) {\\n                    int[] direction = directions[i];\\n                    int x = curr[0] + direction[0];\\n                    int y = curr[1] + direction[1];\\n                    check(N, queue, positive, x, y);\\n                }\\n                prob *= (double) positive[0] / 8;\\n            }\\n            return prob;\\n        }\\n\\n        private void check(int N, Queue<int[]> queue, int[] positive, int x, int y) {\\n            if (x >= 0 && x < N && y >= 0 && y < N) {\\n                queue.offer(new int[]{x, y});\\n                positive[0]++;\\n            }\\n        }\\n```"
		},
		{
			"lc_ans_id":"108214",
			"view":"527",
			"top":"3",
			"title":"My easy understand dp solution",
			"vote":"3",
			"content":"```java\\nclass Solution {\\n    private int[][] dirs = new int[][]{{1, 2}, {2, 1}, {2, -1}, {1, -2}, {-1, -2}, {-2, -1}, {-2, 1}, {-1, 2}};\\n    public double knightProbability(int N, int K, int r, int c) {\\n        double[][][] dp = new double[K + 1][N][N];\\n        dp[0][r][c] = 1;\\n        for (int step = 1; step <= K; step++) {\\n            for (int i = 0; i < N; i++) {\\n                for (int j = 0; j < N; j++) {\\n                    for (int[] dir : dirs) {\\n                        int x = dir[0] + i;\\n                        int y = dir[1] + j;\\n                        if (x < 0 || x >= N || y < 0 || y >= N) continue;\\n                        dp[step][i][j] += dp[step - 1][x][y] * 0.125;\\n                    }\\n                }\\n            }\\n        }\\n        double res = 0;\\n        for (int i = 0; i < N; i++) {\\n            for (int j = 0; j < N; j++) {\\n                res += dp[K][i][j];\\n            }\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108193",
			"view":"899",
			"top":"4",
			"title":"Python",
			"vote":"3",
			"content":"At the start, the knight is at (r, c) with probability 1 (and anywhere else with probability 0). Then update those probabilities over K moves.\\n\\n    def knightProbability(self, N, K, r, c):\\n        p = {(r, c): 1}\\n        for _ in range(K):\\n            p = {(r, c): sum(p.get((r+i, c+j), 0) + p.get((r+j, c+i), 0) for i in (1, -1) for j in (2, -2)) / 8\\n                 for r in range(N) for c in range(N)}\\n        return sum(p.values())\\n\\nShorter and maybe nicer version, influenced a bit by @flamesofmoon's [solution](https://discuss.leetcode.com/topic/105934/python-with-explanations):\\n\\n    def knightProbability(self, N, K, r, c):\\n        p = {(r, c): 1}\\n        for _ in range(K):\\n            p = {(r, c): sum(p.get((r+i, c+j), 0) for x in (1, 2) for i in (x, -x) for j in (3-x, x-3)) / 8\\n                 for r in range(N) for c in range(N)}\\n        return sum(p.values())"
		},
		{
			"lc_ans_id":"108205",
			"view":"417",
			"top":"5",
			"title":"My short DFS with memory C++ code",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    int movement[8][2] = {{1, 2},{1, -2},{-1, 2}, {-1, -2}, {2, 1}, {2, -1}, {-2, 1},{-2, -1}};\\n    double mem[100][25][25] = {0};\\n    double knightProbability(int N, int K, int r, int c) {\\n        double inside = 0;\\n        if(K){\\n            for(auto &i : movement)\\n                if(r + i[0] < N && r + i[0] >= 0 && c + i[1] < N && c + i[1] >= 0)\\n                    inside += 0.125* (mem[K-1][r+i[0]][c + i[1]]? \\n                                      mem[K-1][r+i[0]][c + i[1]] : knightProbability(N, K-1, r+i[0], c + i[1]));\\n            mem[K][r][c] = inside;\\n            return inside;\\n        }\\n        return 1;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108182",
			"view":"30",
			"top":"6",
			"title":"8ms clean Java memo",
			"vote":"0",
			"content":"Quite self-explanatory. Compared with bottom-up/tabulation where space complexity can be optimized to 2D, top-down/memoization has to keep a 3D matrix, which makes it consume more space. Any suggestions?\\n\\n```\\nclass Solution {\\n    int[][] moves = {{1, 2}, {1, -2}, {2, 1}, {2, -1}, {-1, 2}, {-1, -2}, {-2, 1}, {-2, -1}};\\n    \\n    public double knightProbability(int N, int K, int r, int c) {\\n        double[][][] dp = new double[N][N][K+1];\\n        \\n        return dfs(N, dp, K, r, c);\\n    }\\n    \\n    private double dfs(int N, double[][][] dp, int K, int i, int j){\\n        if(i<0 || i>=N || j< 0 || j>=N) return 0;\\n        \\n        if(K == 0) return 1;\\n        \\n        if(dp[i][j][K] > 0) return dp[i][j][K];\\n        \\n        double ret = 0;\\n        \\n        for(int[] dir : moves)\\n            ret += 0.125*dfs(N, dp, K-1, i+dir[0], j+dir[1]);\\n        \\n        dp[i][j][K] = ret;\\n        \\n        return ret;\\n    }\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"108183",
			"view":"32",
			"top":"7",
			"title":"C++ Dynamic Programming, O(K * N^2) Time O(N^2) Space",
			"vote":"0",
			"content":"```\\nclass Solution {\\npublic:\\n    double knightProbability(int N, int K, int r, int c) {\\n        vector<pair<int,int>> const c_moves = {{2, 1}, {2, -1}, {1, 2}, {-1, 2}, {-2, 1}, {-2, -1}, {1, -2}, {-1, -2}};\\n        vector<double> v(N * N);\\n        v[N * r + c] = 1;\\n        for (int istep = 0; istep < K; ++istep) {\\n            vector<double> vn(N * N);\\n            for (int i = 0; i < N; ++i) {\\n                for (int j = 0; j < N; ++j) {\\n                    if (v[N * i + j] != 0) {\\n                        for (auto& pm: c_moves) {\\n                            int in = i + pm.first, jn = j + pm.second;\\n                            if (in >= 0 && in < N && jn >= 0 && jn < N)\\n                                vn[N * in + jn] += v[N * i + j];\\n                        }\\n                    }\\n                }\\n            }\\n            v = vn;\\n        }\\n        return accumulate(v.begin(), v.end(), 0.0, plus<double>()) / pow(8, K);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108184",
			"view":"35",
			"top":"8",
			"title":"My accepted C++ easy understand solution",
			"vote":"0",
			"content":"```\\nclass Solution {\\npublic:\\n    double knightProbability(int N, int K, int r, int c)\\n    {\\n        vector<vector<double>> prob1(N, vector<double>(N, 0));\\n        vector<vector<double>> prob2(N, vector<double>(N, 0));\\n        vector<vector<double>> *pprob1 = &prob1;\\n        vector<vector<double>> *pprob2 = &prob2;\\n        \\n        double prob = 1.0;\\n        prob1[r][c] = 1.0;\\n        \\n        for(int i = 0; i < K; i++)\\n        {\\n            prob = knightInBoardProb(N, *pprob1, *pprob2);\\n            cleanup(*pprob1);\\n            swap(pprob1, pprob2);\\n        }\\n        \\n        return prob;\\n    }\\n    \\n    double knightInBoardProb(int N, vector<vector<double>> &prev, vector<vector<double>> &curr)\\n    {\\n        \\n        static int dirs[][2] = {{-2, 1}, {-1, 2}, {1, 2}, {2, 1}, {2, -1}, {1,-2}, {-1,-2},{-2, -1}};\\n        \\n        double prob = 0;\\n        \\n        for(int i = 0; i < prev.size(); i++)\\n        {\\n            for(int j = 0; j < prev[i].size(); j++)\\n            {\\n                if(prev[i][j] != 0)\\n                {\\n                    for(int m = 0; m<sizeof(dirs)/sizeof(dirs[0]); m++)\\n                    {\\n                        int x = i + dirs[m][0];\\n                        int y = j + dirs[m][1];\\n                        \\n                        if(isInBoard(N, x, y))\\n                        {\\n                            curr[x][y] += prev[i][j]/8.0;\\n                            prob += prev[i][j]/8.0;\\n                        }\\n                    }\\n                }\\n            }\\n        }\\n        \\n        return prob;\\n    }\\n    \\n    bool isInBoard(int N, int r, int c)\\n    {\\n        return (r >= 0 && c >= 0 && r < N && c < N);\\n    }\\n    \\n    void cleanup(vector<vector<double>> &m)\\n    {\\n        for(int i = 0; i < m.size(); i++)\\n        {\\n            for(int j = 0; j < m[i].size(); j++)\\n            {\\n                m[i][j] = 0;\\n            }\\n        }\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108185",
			"view":"44",
			"top":"9",
			"title":"Python recursive solution with cache",
			"vote":"0",
			"content":"```\\nclass Solution:\\n    def work(self, N, K, r, c, onboard, cache):\\n        offboard = r < 0 or c < 0 or r >= N or c >= N\\n        if K == 0 or offboard:\\n            if not offboard:\\n                onboard += 1\\n            return onboard\\n        if (K, r, c) in cache:\\n            return cache[(K, r, c)]\\n\\n        count = self.work(N, K - 1, r + 1, c + 2, onboard, cache) + \\\\\\n            self.work(N, K - 1, r + 1, c - 2, onboard, cache) + \\\\\\n            self.work(N, K - 1, r - 1, c + 2, onboard, cache) + \\\\\\n            self.work(N, K - 1, r - 1, c - 2, onboard, cache) + \\\\\\n            self.work(N, K - 1, r + 2, c + 1, onboard, cache) + \\\\\\n            self.work(N, K - 1, r + 2, c - 1, onboard, cache) + \\\\\\n            self.work(N, K - 1, r - 2, c + 1, onboard, cache) + \\\\\\n            self.work(N, K - 1, r - 2, c - 1, onboard, cache)\\n        cache[(K, r, c)] = count\\n        return count\\n\\n\\n    def knightProbability(self, N, K, r, c):\\n        \"\"\"\\n        :type N: int\\n        :type K: int\\n        :type r: int\\n        :type c: int\\n        :rtype: float\\n        \"\"\"\\n        cache = {}\\n        onboard = self.work(N, K, r, c, 0, cache)\\n        return onboard / (8 ** K)\\n```"
		}
	],
	"id":"665",
	"title":"Knight Probability in Chessboard",
	"content":"<p>\r\nOn an <code>N</code>x<code>N</code> chessboard, a knight starts at the <code>r</code>-th row and <code>c</code>-th column and attempts to make exactly <code>K</code> moves.  The rows and columns are 0 indexed, so the top-left square is <code>(0, 0)</code>, and the bottom-right square is <code>(N-1, N-1)</code>.\r\n</p>\r\n\r\n<p>\r\nA chess knight has 8 possible moves it can make, as illustrated below.  Each move is two squares in a cardinal direction, then one square in an orthogonal direction.\r\n</p>\r\n\r\n<img src=\"/static/images/problemset/knight.png\" style=\"width:200px; height:200px\"></img>\r\n\r\n<p>\r\nEach time the knight is to move, it chooses one of eight possible moves uniformly at random (even if the piece would go off the chessboard) and moves there.\r\n</p>\r\n\r\n<p>\r\nThe knight continues moving until it has made exactly <code>K</code> moves or has moved off the chessboard.  Return the probability that the knight remains on the board after it has stopped moving.\r\n</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> 3, 2, 0, 0\r\n<b>Output:</b> 0.0625\r\n<b>Explanation:</b> There are two moves (to (1,2), (2,1)) that will keep the knight on the board.\r\nFrom each of those positions, there are also two moves that will keep the knight on the board.\r\nThe total probability the knight stays on the board is 0.0625.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\n<li><code>N</code> will be between 1 and 25.</li>\r\n<li><code>K</code> will be between 0 and 100.</li>\r\n<li>The knight always initially starts on the board.</li>\r\n</p>",
	"frequency":"96",
	"ac_num":"5265"
}