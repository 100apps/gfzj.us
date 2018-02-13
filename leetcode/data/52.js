{
	"difficulty":"3",
	"submit_num":"154601",
	"show_id":"52",
	"leetcode_id":"52",
	"answers":[
		{
			"lc_ans_id":"20058",
			"view":"13566",
			"top":"0",
			"title":"Accepted Java Solution",
			"vote":"94",
			"content":"    /**\\n     * don't need to actually place the queen,\\n     * instead, for each row, try to place without violation on\\n     * col/ diagonal1/ diagnol2.\\n     * trick: to detect whether 2 positions sit on the same diagnol:\\n     * if delta(col, row) equals, same diagnol1;\\n     * if sum(col, row) equals, same diagnal2.\\n     */\\n    private final Set<Integer> occupiedCols = new HashSet<Integer>();\\n    private final Set<Integer> occupiedDiag1s = new HashSet<Integer>();\\n    private final Set<Integer> occupiedDiag2s = new HashSet<Integer>();\\n    public int totalNQueens(int n) {\\n        return totalNQueensHelper(0, 0, n);\\n    }\\n    \\n    private int totalNQueensHelper(int row, int count, int n) {\\n        for (int col = 0; col < n; col++) {\\n            if (occupiedCols.contains(col))\\n                continue;\\n            int diag1 = row - col;\\n            if (occupiedDiag1s.contains(diag1))\\n                continue;\\n            int diag2 = row + col;\\n            if (occupiedDiag2s.contains(diag2))\\n                continue;\\n            // we can now place a queen here\\n            if (row == n-1)\\n                count++;\\n            else {\\n                occupiedCols.add(col);\\n                occupiedDiag1s.add(diag1);\\n                occupiedDiag2s.add(diag2);\\n                count = totalNQueensHelper(row+1, count, n);\\n                // recover\\n                occupiedCols.remove(col);\\n                occupiedDiag1s.remove(diag1);\\n                occupiedDiag2s.remove(diag2);\\n            }\\n        }\\n        \\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"20048",
			"view":"8031",
			"top":"1",
			"title":"Easiest Java Solution (1ms, 98.22%)",
			"vote":"31",
			"content":"This is a classic backtracking problem. \\n\\nStart row by row, and loop through columns. At each decision point, skip unsafe positions by using three boolean arrays.\\n\\nStart going back when we reach row n.\\n\\nJust FYI, if using HashSet, running time will be at least 3 times slower!\\n\\n    public class Solution {\\n        int count = 0;\\n        public int totalNQueens(int n) {\\n            boolean[] cols = new boolean[n];     // columns   |\\n            boolean[] d1 = new boolean[2 * n];   // diagonals \\\\\\n            boolean[] d2 = new boolean[2 * n];   // diagonals /\\n            backtracking(0, cols, d1, d2, n);\\n            return count;\\n        }\\n        \\n        public void backtracking(int row, boolean[] cols, boolean[] d1, boolean []d2, int n) {\\n            if(row == n) count++;\\n    \\n            for(int col = 0; col < n; col++) {\\n                int id1 = col - row + n;\\n                int id2 = col + row;\\n                if(cols[col] || d1[id1] || d2[id2]) continue;\\n                \\n                cols[col] = true; d1[id1] = true; d2[id2] = true;\\n                backtracking(row + 1, cols, d1, d2, n);\\n                cols[col] = false; d1[id1] = false; d2[id2] = false;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"20077",
			"view":"6228",
			"top":"2",
			"title":"C++ solution - DFS - easy understanding",
			"vote":"15",
			"content":"    int totalNQueens(int n) {\\n        vector<bool> col(n, true);\\n        vector<bool> anti(2*n-1, true);\\n        vector<bool> main(2*n-1, true);\\n        vector<int> row(n, 0);\\n        int count = 0;\\n        dfs(0, row, col, main, anti, count);\\n        return count;\\n    }\\n    void dfs(int i, vector<int> &row, vector<bool> &col, vector<bool>& main, vector<bool> &anti, int &count) {\\n            if (i == row.size()) {\\n                count++;\\n                return;\\n            }\\n           for (int j = 0; j < col.size(); j++) {\\n             if (col[j] && main[i+j] && anti[i+col.size()-1-j]) {\\n                 row[i] = j; \\n                 col[j] = main[i+j] = anti[i+col.size()-1-j] = false;\\n                 dfs(i+1, row, col, main, anti, count);\\n                 col[j] = main[i+j] = anti[i+col.size()-1-j] = true;\\n          }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"20046",
			"view":"2534",
			"top":"3",
			"title":"Share my Java code (beats 97.83% run times)",
			"vote":"13",
			"content":"    /*\\n        \\u5e38\\u89c4n-queens\\u89e3\\u6cd5, \\u6570\\u7b54\\u6848\\u4e2a\\u6570.\\n        \\u7528column\\u6807\\u8bb0\\u6b64\\u884c\\u4e4b\\u524d\\u7684\\u54ea\\u4e9bcolumn\\u5df2\\u7ecf\\u653e\\u7f6e\\u4e86queen. \\u68cb\\u76d8\\u5750\\u6807(row, col)\\u5bf9\\u5e94column\\u7684\\u7b2ccol\\u4f4d(LSB --> MSB, \\u4e0b\\u540c).\\n        \\u7528diag\\u6807\\u8bb0\\u6b64\\u4f4d\\u7f6e\\u4e4b\\u524d\\u7684\\u54ea\\u4e9b\\u4e3b\\u5bf9\\u89d2\\u7ebf\\u5df2\\u7ecf\\u653e\\u7f6e\\u4e86queen. \\u68cb\\u76d8\\u5750\\u6807(row, col)\\u5bf9\\u5e94diag\\u7684\\u7b2c(n - 1 + row - col)\\u4f4d.\\n        \\u7528antiDiag\\u6807\\u8bb0\\u6b64\\u4f4d\\u7f6e\\u4e4b\\u524d\\u7684\\u54ea\\u4e9b\\u526f\\u5bf9\\u89d2\\u7ebf\\u5df2\\u7ecf\\u653e\\u7f6e\\u4e86queen. \\u68cb\\u76d8\\u5750\\u6807(row, col)\\u5bf9\\u5e94antiDiag\\u7684\\u7b2c(row + col)\\u4f4d.\\n    */\\n    public class Solution {\\n        int count = 0;\\n        \\n        public int totalNQueens(int n) {\\n            dfs(0, n, 0, 0, 0);\\n            return count;\\n        }\\n        \\n        private void dfs(int row, int n, int column, int diag, int antiDiag) {\\n            if (row == n) {\\n                ++count;\\n                return;\\n            }\\n            for (int i = 0; i < n; ++i) {\\n                boolean isColSafe = ((1 << i) & column) == 0;\\n                boolean isDiagSafe = ((1 << (n - 1 + row - i)) & diag) == 0;\\n                boolean isAntiDiagSafe = ((1 << (row + i)) & antiDiag) == 0;\\n                if (isColSafe && isDiagSafe && isAntiDiagSafe) {\\n                    dfs(row + 1, n, (1 << i) | column, (1 << (n - 1 + row - i)) | diag, (1 << (row + i)) | antiDiag);\\n                }\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"20141",
			"view":"2801",
			"top":"4",
			"title":"Never write codes like this - lets do eval",
			"vote":"7",
			"content":"Following codes got AC. But you should never write some codes like this. This is post is just for joking.\\n\\n    /**\\n     * @param {number} n\\n     * @return {number}\\n     */\\n    var totalNQueens = function(n) {\\n        var p = '', s = 0, l;\\n        for (var i = 0; i < n; i++) {\\n            l = '\\\\nfor (var s# = 0; s# < ' + n + '; s#++)';\\n            for (var j = 0; j < i; j++)\\n                l += 'if (s# !== s@ && Math.abs(s# - s@) !== (# - @)) '.replace(/@/g, j);\\n            p += l.replace(/#/g, i);\\n        }\\n        p += '\\\\ns++;\\\\ns';\\n        return eval(p);\\n    };"
		},
		{
			"lc_ans_id":"20147",
			"view":"830",
			"top":"5",
			"title":"Python recursive dfs solution.",
			"vote":"6",
			"content":"The idea here is quite similar to [N-Queens ][1] while we don't need to record the path, and as the return value is a number not a list, it's better to use a global variable to record the result.\\n       \\n    def totalNQueens(self, n):\\n        self.res = 0\\n        self.dfs([-1]*n, 0)\\n        return self.res\\n        \\n    def dfs(self, nums, index):\\n        if index == len(nums):\\n            self.res += 1\\n            return \\n        for i in xrange(len(nums)):\\n            nums[index] = i\\n            if self.valid(nums, index):\\n                self.dfs(nums, index+1)\\n        \\n    def valid(self, nums, n):\\n        for i in xrange(n):\\n            if nums[i] == nums[n] or abs(nums[n]-nums[i]) == n-i:\\n                return False\\n        return True\\n\\n\\n  [1]: https://leetcode.com/discuss/53764/python-recursive-dfs-solution-with-comments"
		},
		{
			"lc_ans_id":"20094",
			"view":"666",
			"top":"6",
			"title":"A classic C solution using bitwise operations (0ms)",
			"vote":"5",
			"content":"The code is very short and simple:\\n\\n    int next(int row, unsigned int vertMask, unsigned int leftMask, unsigned int rightMask, unsigned int rangeMask) {\\n        if (row == 0)\\n            return 1;\\n            \\n        unsigned int mask = rangeMask & ~(leftMask | rightMask | vertMask);\\n        int r = 0;\\n        while (mask) {\\n            unsigned int queenFlag = mask & -mask;\\n            r += next(\\n                    row-1, \\n                    (  vertMask | queenFlag ), \\n                    (  leftMask | queenFlag ) << 1, \\n                    ( rightMask | queenFlag ) >> 1, \\n                    rangeMask\\n                );\\n            mask ^= queenFlag;\\n        }\\n        return r;\\n    }\\n\\n    int totalNQueens(int n) {\\n        return next(n, 0, 0, 0, ((unsigned int)-1) >> (32-n));\\n    }\\n    \\n\\nThe main idea is each bit represent a position. If a bit is set to 1, it means this position is unavailable to put a queen into. So with 32-bit integer this way can solve no more than 32-queens problem. \\n\\nAssume current is first row, and N == 5. So rangeMask will be 0b 0001 1111. \\nThis line\\n\\nmask = rangeMask & ~(leftMask | rightMask | vertMask)\\n\\nmake available bits set to 1. So mask = 0b 0001 1111. mask & -mask is a trick to get the lowest 1-bit. Now set a queen at position queenFlag, and try next row.\\n\\nAssume row N has a queen at column 3. The arguments for next(N-1, ...) will be:\\n\\nTo shift left/right queenFlag by 1 will make the positions the queen could attack to set to 1. I set the masks' type to unsigned to avoid signed right shift could cause a bug when N = 32."
		},
		{
			"lc_ans_id":"20128",
			"view":"2069",
			"top":"7",
			"title":"Shortest C++ solution in 0ms",
			"vote":"5",
			"content":"Idea is to  use vectors to keep track of invalid positions , so validity can be checked in O(1) and put a queen in each column\\n     \\n    #include<vector>\\n    using namespace std;\\n    class Solution {\\n    public:\\n        int find(int n, int left, int i, int r, vector<int>&rows,vector<int>&d1,vector<int>&d2){\\n            if (left == 0)\\n                return 1;\\n            int j,sum=0;\\n                for (j=r; j<n; j++){\\n                    if (rows[j] || d1[i+j] || d2[n-1+i-j])\\n                        continue;\\n                    rows[j]=d1[i+j]=d2[n-1+i-j]=1;\\n                    sum += find(n, left-1, i+1, 0,rows,d1,d2 );\\n                    rows[j]=d1[i+j]=d2[n-1+i-j]=0;\\n                }\\n            return sum;\\n        }\\n        int totalNQueens(int n) {\\n            vector<int>  rows(n),d1(2*n-1),d2(2*n-1);\\n            return find(n,n,0,0,rows,d1,d2);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"20114",
			"view":"390",
			"top":"8",
			"title":"[recommend for beginners]clean C++ implementation with detailed explanation",
			"vote":"4",
			"content":"    class Solution {\\n    public:\\n        int totalNQueens(int n) {\\n            int result=0;\\n            vector<int> solution(n);\\n            help(n, 0, solution, result);\\n            return result;\\n        }\\n        /** n:#-of-rows   row:current-#-of-row  solution:store-n-row's-col-index result:final result**/\\n        void help(int n, int row, vector<int>& solution, int& result){\\n            for(int i=0; i<n; i++){\\n                if(check(i, row, solution)){\\n                    if(row+1==n){\\n                        result++;\\n                        continue;\\n                    }\\n                    solution[row]=i;\\n                    help(n, row+1, solution, result);\\n                }\\n            }\\n        }\\n        /*** check the cur-col-choise is valid or not **/\\n        bool check(int col, int row, vector<int>& solution){\\n            for(int i=0; i<row; i++){\\n                if(col==solution[i] || abs(col-solution[i])==abs(row-i))  \\n                    return false;\\n            }\\n            return true;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"20166",
			"view":"1277",
			"top":"9",
			"title":"Meaning of *distinct* solutions in N-Queens II",
			"vote":"4",
			"content":"Should we exclude rotations and reflections of the chessboard?\\n\\nFor instance, consider the 2 solutions of 4-queens in N-Queen. Actually you can get the 2nd solution by rotating the 1st solution 180-degree clockwise.\\n\\nLikewise, if we exclude rotations and reflections, 8-queens actually has 12 distinct solutions instead of 92."
		}
	],
	"id":"52",
	"title":"N-Queens II",
	"content":"<p>Follow up for N-Queens problem.</p>\r\n\r\n<p>Now, instead outputting board configurations, return the total number of distinct solutions.</p>\r\n\r\n<p><img src=\"/static/images/problemset/8-queens.png\" /></p>",
	"frequency":"372",
	"ac_num":"71582"
}