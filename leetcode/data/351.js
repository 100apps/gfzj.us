{
	"difficulty":"2",
	"submit_num":"41689",
	"show_id":"351",
	"leetcode_id":"351",
	"answers":[
		{
			"lc_ans_id":"82463",
			"view":"20860",
			"top":"0",
			"title":"Java DFS solution with clear explanations and optimization, beats 97.61% (12ms)",
			"vote":"206",
			"content":"The optimization idea is that 1,3,7,9 are symmetric, 2,4,6,8 are also symmetric. Hence we only calculate one among each group and multiply by 4.\\n\\n    public class Solution {\\n        // cur: the current position\\n        // remain: the steps remaining\\n        int DFS(boolean vis[], int[][] skip, int cur, int remain) {\\n            if(remain < 0) return 0;\\n            if(remain == 0) return 1;\\n            vis[cur] = true;\\n            int rst = 0;\\n            for(int i = 1; i <= 9; ++i) {\\n                // If vis[i] is not visited and (two numbers are adjacent or skip number is already visited)\\n                if(!vis[i] && (skip[cur][i] == 0 || (vis[skip[cur][i]]))) {\\n                    rst += DFS(vis, skip, i, remain - 1);\\n                }\\n            }\\n            vis[cur] = false;\\n            return rst;\\n        }\\n        \\n        public int numberOfPatterns(int m, int n) {\\n            // Skip array represents number to skip between two pairs\\n            int skip[][] = new int[10][10];\\n            skip[1][3] = skip[3][1] = 2;\\n            skip[1][7] = skip[7][1] = 4;\\n            skip[3][9] = skip[9][3] = 6;\\n            skip[7][9] = skip[9][7] = 8;\\n            skip[1][9] = skip[9][1] = skip[2][8] = skip[8][2] = skip[3][7] = skip[7][3] = skip[4][6] = skip[6][4] = 5;\\n            boolean vis[] = new boolean[10];\\n            int rst = 0;\\n            // DFS search each length from m to n\\n            for(int i = m; i <= n; ++i) {\\n                rst += DFS(vis, skip, 1, i - 1) * 4;    // 1, 3, 7, 9 are symmetric\\n                rst += DFS(vis, skip, 2, i - 1) * 4;    // 2, 4, 6, 8 are symmetric\\n                rst += DFS(vis, skip, 5, i - 1);        // 5\\n            }\\n            return rst;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"82476",
			"view":"7607",
			"top":"1",
			"title":"Description should be clear about a move like 1-8",
			"vote":"81",
			"content":"I thought 1-8 touches 4 and 5, and they should be tested. However my code with such a check fails. Then I removed this test, and my code passed."
		},
		{
			"lc_ans_id":"82464",
			"view":"7279",
			"top":"2",
			"title":"Simple and concise Java solution in 69ms",
			"vote":"33",
			"content":"The general idea is DFS all the possible combinations from 1 to 9 and skip invalid moves along the way. \\n\\nWe can check invalid moves by using a jumping table. e.g. If a move requires a jump and the key that it is crossing is not visited, then the move is invalid. Furthermore, we can utilize symmetry to reduce runtime, in this case it reduced from ~120ms to ~70ms.\\n\\nI felt clueless when first encountered this problem, and considered there must be lots of edge cases. Turns out, it's pretty straight forward. Hope this solution helps :D\\n\\n    private int[][] jumps;\\n    private boolean[] visited;\\n    \\n    public int numberOfPatterns(int m, int n) {\\n        jumps = new int[10][10];\\n        jumps[1][3] = jumps[3][1] = 2;\\n        jumps[4][6] = jumps[6][4] = 5;\\n        jumps[7][9] = jumps[9][7] = 8;\\n        jumps[1][7] = jumps[7][1] = 4;\\n        jumps[2][8] = jumps[8][2] = 5;\\n        jumps[3][9] = jumps[9][3] = 6;\\n\\t\\tjumps[1][9] = jumps[9][1] = jumps[3][7] = jumps[7][3] = 5;\\n        visited = new boolean[10];\\n        int count = 0;\\n\\t\\tcount += DFS(1, 1, 0, m, n) * 4; // 1, 3, 7, 9 are symmetrical\\n\\t\\tcount += DFS(2, 1, 0, m, n) * 4; // 2, 4, 6, 8 are symmetrical\\n\\t\\tcount += DFS(5, 1, 0, m, n);\\n\\t\\treturn count;\\n    }\\n    \\n    private int DFS(int num, int len, int count, int m, int n) {\\n\\t\\tif (len >= m) count++; // only count if moves are larger than m\\n\\t\\tlen++;\\n\\t\\tif (len > n) return count;\\n        visited[num] = true;\\n        for (int next = 1; next <= 9; next++) {\\n            int jump = jumps[num][next];\\n            if (!visited[next] && (jump == 0 || visited[jump])) {\\n                count = DFS(next, len, count, m, n);\\n            }\\n        }\\n\\t\\tvisited[num] = false; // backtracking\\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"82472",
			"view":"2950",
			"top":"3",
			"title":"Can't understand how numberOfPatterns(1,2) should return 65 (Solved via DFS, answer inside)",
			"vote":"22",
			"content":"My solutions returns 49: basically it's 9 cases of 1 number and 40 of 2 paths between close neighbors\\n\\nWhich cases am I missing?"
		},
		{
			"lc_ans_id":"82459",
			"view":"1308",
			"top":"4",
			"title":"How many people thought from 1 to 8 should visit both 4 and 5?",
			"vote":"15",
			"content":"I kept failing on test case 2,2\\nI drew the picture on a paper and thought the answer should be (3+5)*4 + 8 = 40. But the answer 56..\\n\\nI tried several times and then started to wonder **if I am stupid, or my parents are siblings.**\\n\\nI bought a new android phone to ACTUALLY test it.\\n\\nSomehow I realized, based on the description, Android has a sufficiently advanced technology which provides you a directly path from 1 - 8..without touching 4 and 5....\\n\\n...\\n....\\n.....\\n\\nGood luck guys, I am trying to return this phone and get refund."
		},
		{
			"lc_ans_id":"82483",
			"view":"1601",
			"top":"5",
			"title":"Sharing my bitmask dynamic programming solution (4ms)",
			"vote":"11",
			"content":"I've basically reused the idea from [zzz1322's Java code][1] and reimplemented the idea using bitmask based DP.\\n\\n`dp[len][state][endnode]` indicates the number of patterns with length ``len``, visited nodes equal to ``state`` and the last node in the pattern is ``endnode``. The state transition part is fairly straightforward.\\n\\n    int dp[10][1 << 9][10];\\n    int skip[10][10];\\n    bool initialized;\\n    \\n    class Solution {\\n    private:\\n        void InitSkipArray() {\\n            memset(skip, 0, sizeof(skip));\\n            skip[1][3] = skip[3][1] = 2;\\n            skip[1][7] = skip[7][1] = 4;\\n            skip[3][9] = skip[9][3] = 6;\\n            skip[7][9] = skip[9][7] = 8;\\n            skip[1][9] = skip[9][1] = skip[3][7] = skip[7][3] = skip[2][8] = skip[8][2] = skip[4][6] = skip[6][4] = 5;\\n        }\\n        \\n        void calcDP() {\\n            initialized = true;\\n            InitSkipArray();\\n            memset(dp, 0, sizeof(dp));\\n            for (int i = 1; i <= 9; i++)\\n                dp[1][1 << (i - 1)][i] = 1;\\n            for (int len = 1; len < 9; len++) {\\n                for (int state = 0; state < (1 << 9); state++) {\\n                    for (int endNode = 1; endNode <= 9; endNode++) {\\n                        if (dp[len][state][endNode]) {\\n                            for (int i = 1; i <= 9; i++) {\\n                                if ((state & (1 << (i - 1))) == 0) {\\n                                    int nextState = (state | (1 << (i - 1)));\\n                                    if (skip[endNode][i] == 0 || ((state & (1 << (skip[endNode][i] - 1))) != 0))\\n                                        dp[len + 1][nextState][i] += dp[len][state][endNode];\\n                                }\\n                            }\\n                        }\\n                    }\\n                }\\n            }\\n        }\\n    public:\\n        int numberOfPatterns(int m, int n) {\\n           if (!initialized) {\\n               calcDP();\\n           }\\n           int ans = 0;\\n           for (int state = 0; state < (1 << 9); state++) {\\n               for (int len = m; len <= n; len++) {\\n                   for (int endNode = 1; endNode <= 9; endNode++) {\\n                       ans += dp[len][state][endNode];\\n                   }\\n               }\\n           }\\n           return ans;\\n        }\\n    };\\n\\n\\n  [1]: https://leetcode.com/discuss/104500/java-solution-with-clear-explanations-and-optimization-81ms"
		},
		{
			"lc_ans_id":"82475",
			"view":"4409",
			"top":"6",
			"title":"Short C++ solution",
			"vote":"11",
			"content":"    class Solution {\\n    public:\\n        int numberOfPatterns(int m, int n) {\\n            return count(m, n, 0, 1, 1, 1, 1);\\n        }\\n    private:\\n        int count(int m, int n, int used, int i1, int j1, int i2, int j2) {\\n            int number = m <= 0;\\n            if (!n) return 1;\\n            for (int i=0; i<3; i++) {\\n                for (int j=0; j<3; j++) {\\n                    int I = i2 + i, J = j2 + j, used2 = used | (1 << (i*3 + j));\\n                    if (used2 > used && (I % 2 || J % 2 || used2 & (1 << (I/2*3 + J/2))))\\n                        number += count(m-1, n-1, used2, i2, j2, i, j);\\n                }\\n            }\\n            return number;\\n        }\\n    };\\n\\n`used` is the 9-bit bitmask telling which keys have already been used and `(i1,j1)` and `(i2,j2)` are the previous two key coordinates. A step is valid if...\\n\\n- `I % 2`: It goes to a neighbor row or\\n- `J % 2`: It goes to a neighbor column or\\n- `used2 & (1 << (I/2*3 + J/2)))`: The key in the middle of the step has already been used."
		},
		{
			"lc_ans_id":"82466",
			"view":"830",
			"top":"7",
			"title":"Java 0ms solution LOL",
			"vote":"7",
			"content":"LOL just kidding, but works.\\n\\n    public class Solution {\\n        public int numberOfPatterns(int m, int n) {\\n            int[] arr = {9,56,320,1624,7152, 26016,72912,140704,140704};\\n            int sum = 0;\\n            for (int i = m; i <= n; i++) {\\n                sum += arr[i - 1];    \\n            }\\n            return sum;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"82542",
			"view":"1359",
			"top":"8",
			"title":"Short Hack in Python",
			"vote":"7",
			"content":"    def numberOfPatterns(self, m, n, patterns=[]):\\n        while len(patterns) <= n:\\n            bad = '[^2]*(13|31)|[^4]*(17|71)|[^8]*(79|97)|[^6]*(39|93)|[^5]*(19|28|37|46|64|73|82|91)'\\n            bad = re.compile(bad).match\\n            patterns += sum(not bad(''.join(p))\\n                            for p in itertools.permutations('123456789', len(patterns))),\\n        return sum(patterns[m:n+1])\\n\\n---\\n\\nA faster version without `itertools`:\\n\\n    def numberOfPatterns(self, m, n, patterns=[['']]):\\n        while len(patterns) <= n:\\n            bad = '[^2]*(13|31)|[^4]*(17|71)|[^8]*(79|97)|[^6]*(39|93)|[^5]*(19|28|37|46|64|73|82|91)'\\n            bad = re.compile(bad).match\\n            patterns += [p+d for p in patterns[-1] for d in '123456789'\\n                         if d not in p and not bad(p+d)],\\n        return sum(map(len, patterns[m:n+1]))"
		},
		{
			"lc_ans_id":"82515",
			"view":"2776",
			"top":"9",
			"title":"Java easy understand DFS solution (72ms)",
			"vote":"6",
			"content":"If we use the symmetry, we can only start from 1, 2 and 5 then multiply the results of 1 and 2 by 4. (170ms) Thanks to [@woaizuguo999][1]\\n\\n    \\n    int res=0;\\n    public int numberOfPatterns(int m, int n) {\\n        boolean[][] keyboard = new boolean[3][3];\\n        int ret=0;\\n        for (int p=m;p<=n;p++){\\n            for (int i=0;i<2;i++){\\n                for (int j=0;j<2;j++){\\n                    if (j == 0 && i == 1) continue;\\n                    keyboard[i][j] = true;\\n                    helper(keyboard,p-1,i,j);\\n                    keyboard[i][j] = false;\\n                    ret += (i == 1 && j == 1)? res:4*res;\\n                    res=0;\\n                }\\n            }\\n        }\\n        return ret;\\n    }\\n    private void helper(boolean[][] keyboard,int left, int x, int y){\\n        if (left == 0){\\n            res++;\\n            return;\\n        }\\n        for (int i=0;i<3;i++){\\n            for (int j=0;j<3;j++){\\n                if (keyboard[i][j] \\n                    ||  (x==i && Math.abs(y-j)>1) && !keyboard[x][1]\\n                    ||  (y==j && Math.abs(x-i)>1) && !keyboard[1][y]\\n                    ||  (x+y == i+j) && Math.abs(x-i) >1 && !keyboard[1][1]\\n                    ||  (x-y == i-j) && Math.abs(x-i) >1 && !keyboard[1][1]\\n                    ||  (x == i && y == j)) {\\n                    continue;\\n                }\\n                else{\\n                    keyboard[i][j] = true;\\n                    helper(keyboard,left-1,i,j);\\n                    keyboard[i][j] = false;\\n                }\\n            }\\n        }\\n    }\\n\\n\\nAnd we can continue improving the performance by using symmetry in step 1, which is the next step after start. For start from 1, only consider 2 6 and 5. For start from 2, only consider 3,6,9 and 5. For start from 5, only consider 1 and 2.(72 ms)\\n\\n    int res=0;\\n    public int numberOfPatterns(int m, int n) {\\n        boolean[][] keyboard = new boolean[3][3];\\n        int ret=0;\\n        for (int p=m;p<=n;p++){\\n            for (int i=0;i<2;i++){\\n                for (int j=0;j<2;j++){\\n                    if (j == 0 && i == 1) continue;\\n                    keyboard[i][j] = true;\\n                    helper(keyboard,p-1,i,j,true);\\n                    keyboard[i][j] = false;\\n                    ret += (i == 1 && j == 1)? res:4*res;\\n                    res=0;\\n                }\\n            }\\n        }\\n        return ret;\\n    }\\n    \\n    private void dfshelper(boolean[][] keyboard, int left, int x, int y){\\n        keyboard[x][y] = true;\\n        helper(keyboard,left,x,y,false);\\n        keyboard[x][y] = false;\\n    }\\n    \\n    private void helper(boolean[][] keyboard,int left, int x, int y, boolean step1){\\n        if (left == 0){\\n            res++;\\n            return;\\n        }\\n        if (step1){\\n            if (x == 0 && y == 0){\\n                dfshelper(keyboard,left-1,0,1);\\n                dfshelper(keyboard,left-1,1,2);\\n                int temp = 2*res;\\n                res = 0;\\n                dfshelper(keyboard,left-1,1,1);\\n                res += temp;\\n            }\\n            if (x == 0 && y == 1){\\n                dfshelper(keyboard,left-1,0,2);\\n                dfshelper(keyboard,left-1,1,2);\\n                dfshelper(keyboard,left-1,2,2);\\n                int temp = 2*res;\\n                res = 0;\\n                dfshelper(keyboard,left-1,1,1);\\n                res += temp;\\n            }\\n            if (x == 1 && y == 1){\\n                dfshelper(keyboard,left-1,0,0);\\n                dfshelper(keyboard,left-1,0,1);\\n                res=res*4;\\n            }\\n        }\\n        else{\\n            for (int i=0;i<3;i++){\\n                for (int j=0;j<3;j++){\\n                    if (keyboard[i][j] \\n                        ||  (x==i && Math.abs(y-j)>1) && !keyboard[x][1]\\n                        ||  (y==j && Math.abs(x-i)>1) && !keyboard[1][y]\\n                        ||  (x+y == i+j) && Math.abs(x-i) >1 && !keyboard[1][1]\\n                        ||  (x-y == i-j) && Math.abs(x-i) >1 && !keyboard[1][1]\\n                        ||  (x == i && y == j)) {\\n                        continue;\\n                    }\\n                    else{\\n                        keyboard[i][j] = true;\\n                        helper(keyboard,left-1,i,j,false);\\n                        keyboard[i][j] = false;\\n                    }\\n                }\\n            }\\n        }\\n    }\\n\\n\\n  [1]: http://%20woaizuguo999"
		}
	],
	"id":"351",
	"title":"Android Unlock Patterns",
	"content":"<p>\r\nGiven an Android <b>3x3</b> key lock screen and two integers <b>m</b> and <b>n</b>, where  1 &le; m &le; n &le; 9, count the total number of unlock patterns of the Android lock screen, which consist of minimum of <b>m</b> keys and maximum <b>n</b> keys.</p>\r\n\r\n<p><b>Rules for a valid pattern:</b><br />\r\n<ol>\r\n<li>Each pattern must connect at least <b>m</b> keys and at most <b>n</b> keys.</li>\r\n<li>All the keys must be distinct.</li>\r\n<li>If the line connecting two consecutive keys in the pattern passes through any other keys, the other keys must have previously selected in the pattern. No jumps through non selected key is allowed.</li>\r\n<li>The order of keys used matters.</li>\r\n</ol>\r\n</p>\r\n\r\n<img src=\"/static/images/problemset/android-unlock.png\" />\r\n\r\n<p><b>Explanation:</b><br />\r\n\r\n<pre>| 1 | 2 | 3 |\r\n| 4 | 5 | 6 |\r\n| 7 | 8 | 9 |</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Invalid move:</b> <code>4 - 1 - 3 - 6 </code><br />\r\n\r\nLine  1 - 3 passes through key 2 which had not been selected in the pattern.</p>\r\n\r\n<p><b>Invalid move:</b> <code>4 - 1 - 9 - 2</code><br />\r\n\r\nLine  1 - 9 passes through key 5 which had not been selected in the pattern.</p>\r\n\r\n<p><b>Valid move:</b> <code>2 - 4 - 1 - 3 - 6</code><br />\r\n\r\nLine 1 - 3 is valid because it passes through key 2, which had been selected in the pattern</p>\r\n\r\n<p><b>Valid move:</b> <code>6 - 5 - 4 - 1 - 9 - 2</code><br />\r\n\r\nLine 1 - 9 is valid because it passes through key 5, which had been selected in the pattern.</p>\r\n\r\n<p><b>Example:</b><br />\r\nGiven <b>m</b> = 1, <b>n</b> = 1, return 9.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://discuss.leetcode.com/user/elmirap\">@elmirap</a> for adding this problem and creating all test cases.</p>",
	"frequency":"179",
	"ac_num":"18638"
}