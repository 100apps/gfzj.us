{
	"difficulty":"2",
	"submit_num":"412091",
	"show_id":"62",
	"leetcode_id":"62",
	"answers":[
		{
			"lc_ans_id":"22954",
			"view":"33147",
			"top":"0",
			"title":"0ms, 5-lines DP Solution in C++ with Explanations",
			"vote":"225",
			"content":"This is a fundamental DP problem. First of all, let's make some observations.\\n\\nSince the robot can only move right and down, when it arrives at a point, there are only two possibilities:\\n\\n 1. It arrives at that point from above (moving down to that point);\\n 2. It arrives at that point from left (moving right to that point).\\n\\nThus, we have the following state equations: suppose the number of paths to arrive at a point `(i, j)` is denoted as `P[i][j]`, it is easily concluded that `P[i][j] = P[i - 1][j] + P[i][j - 1]`.\\n\\nThe boundary conditions of the above equation occur at the leftmost column (`P[i][j - 1]` does not exist) and the uppermost row (`P[i - 1][j]` does not exist). These conditions can be handled by initialization (pre-processing) --- initialize `P[0][j] = 1, P[i][0] = 1` for all valid `i, j`. Note the initial value is `1` instead of `0`!\\n\\nNow we can write down the following (unoptimized) code.\\n    \\n    class Solution {\\n        int uniquePaths(int m, int n) {\\n            vector<vector<int> > path(m, vector<int> (n, 1));\\n            for (int i = 1; i < m; i++)\\n                for (int j = 1; j < n; j++)\\n                    path[i][j] = path[i - 1][j] + path[i][j - 1];\\n            return path[m - 1][n - 1];\\n        }\\n    };\\n\\nAs can be seen, the above solution runs in `O(n^2)` time and costs `O(m*n)` space. However, you may have observed that each time when we update `path[i][j]`, we only need `path[i - 1][j]` (at the same column) and `path[i][j - 1]` (at the left column). So it is enough to maintain two columns (the current column and the left column) instead of maintaining the full `m*n` matrix. Now the code can be optimized to have `O(min(m, n))` space complexity.\\n\\n    class Solution {\\n        int uniquePaths(int m, int n) {\\n            if (m > n) return uniquePaths(n, m); \\n            vector<int> pre(m, 1);\\n            vector<int> cur(m, 1);\\n            for (int j = 1; j < n; j++) {\\n                for (int i = 1; i < m; i++)\\n                    cur[i] = cur[i - 1] + pre[i];\\n                swap(pre, cur);\\n            }\\n            return pre[m - 1];\\n        }\\n    };\\n\\nFurther inspecting the above code, we find that keeping two columns is used to recover `pre[i]`, which is just `cur[i]` before its update. So there is even no need to use two vectors and one is just enough. Now the space is further saved and the code also gets much shorter.\\n\\n    class Solution {\\n        int uniquePaths(int m, int n) {\\n            if (m > n) return uniquePaths(n, m);\\n            vector<int> cur(m, 1);\\n            for (int j = 1; j < n; j++)\\n                for (int i = 1; i < m; i++)\\n                    cur[i] += cur[i - 1]; \\n            return cur[m - 1];\\n        }\\n    }; \\n\\nWell, till now, I guess you may even want to optimize it to `O(1)` space complexity since the above code seems to rely on only `cur[i]` and `cur[i - 1]`. You may think that 2 variables is enough? Well, it is not. Since the whole `cur` needs to be updated for `n - 1` times, it means that all of its values need to be saved for next update and so two variables is not enough."
		},
		{
			"lc_ans_id":"22981",
			"view":"22462",
			"top":"1",
			"title":"My AC solution using formula",
			"vote":"120",
			"content":"Binomial coefficient:\\n \\n\\n    class Solution {\\n        public:\\n            int uniquePaths(int m, int n) {\\n                int N = n + m - 2;// how much steps we need to do\\n                int k = m - 1; // number of steps that need to go down\\n                double res = 1;\\n                // here we calculate the total possible path number \\n                // Combination(N, k) = n! / (k!(n - k)!)\\n                // reduce the numerator and denominator and get\\n                // C = ( (n - k + 1) * (n - k + 2) * ... * n ) / k!\\n                for (int i = 1; i <= k; i++)\\n                    res = res * (N - k + i) / i;\\n                return (int)res;\\n            }\\n        };\\n\\nFirst of all you should understand that we need to do n + m - 2 movements : m - 1 down, n - 1 right, because we start from cell (1, 1).\\n\\nSecondly, the path it is the sequence of movements( go down / go right), \\ntherefore we can say that two paths are different \\nwhen there is  i-th (1 .. m + n - 2)  movement in path1 differ  i-th movement in path2.\\n\\nSo, how we can build paths.\\nLet's choose (n - 1) movements(number of steps to the right) from (m + n - 2), \\nand rest (m - 1) is (number of steps down).\\n\\nI think now it is obvious that count of different paths are all combinations (n - 1) movements from (m + n-2)."
		},
		{
			"lc_ans_id":"22953",
			"view":"20333",
			"top":"2",
			"title":"Java DP solution with complexity O(n*m)",
			"vote":"63",
			"content":"   \\n\\n     public class Solution {\\n        public int uniquePaths(int m, int n) {\\n            Integer[][] map = new Integer[m][n];\\n            for(int i = 0; i<m;i++){\\n                map[i][0] = 1;\\n            }\\n            for(int j= 0;j<n;j++){\\n                map[0][j]=1;\\n            }\\n            for(int i = 1;i<m;i++){\\n                for(int j = 1;j<n;j++){\\n                    map[i][j] = map[i-1][j]+map[i][j-1];\\n                }\\n            }\\n            return map[m-1][n-1];\\n        }\\n    }\\n\\n\\nThe assumptions are \\n\\n 1. When (n==0||m==0) the function always returns 1 since the robot\\n    can't go left or up.\\n 2. For all other cells. The result = uniquePaths(m-1,n)+uniquePaths(m,n-1)\\n\\nTherefore I populated the edges with 1 first and use DP to get the full 2-D array.\\n\\nPlease give any suggestions on improving the code."
		},
		{
			"lc_ans_id":"22958",
			"view":"14265",
			"top":"3",
			"title":"Math solution, O(1) space",
			"vote":"61",
			"content":"This is a combinatorial problem and can be solved without DP. For mxn grid, robot has to move exactly m-1 steps down and n-1 steps right and these can be done in any order.\\n\\nFor the eg., given in question, 3x7 matrix, robot needs to take 2+6 = 8 steps with 2 down and 6 right in any order. That is nothing but a permutation problem. Denote down as 'D' and right as 'R', following is one of the path :-\\n\\nD R R R D R R R\\n\\nWe have to tell the total number of permutations of the above given word. So, decrease both m & n by 1 and apply following formula:-\\n\\nTotal permutations = (m+n)! / (m! * n!)\\n\\nFollowing is my code doing the same :-\\n\\n    public class Solution {\\n        public int uniquePaths(int m, int n) {\\n            if(m == 1 || n == 1)\\n                return 1;\\n            m--;\\n            n--;\\n            if(m < n) {              // Swap, so that m is the bigger number\\n                m = m + n;\\n                n = m - n;\\n                m = m - n;\\n            }\\n            long res = 1;\\n            int j = 1;\\n            for(int i = m+1; i <= m+n; i++, j++){       // Instead of taking factorial, keep on multiply & divide\\n                res *= i;\\n                res /= j;\\n            }\\n                \\n            return (int)res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"22980",
			"view":"8939",
			"top":"4",
			"title":"Clean and simple DP java",
			"vote":"29",
			"content":"    public class Solution {\\n    public int uniquePaths(int m, int n) {\\n        int[][] grid = new int[m][n];\\n        for(int i = 0; i<m; i++){\\n            for(int j = 0; j<n; j++){\\n                if(i==0||j==0)\\n                    grid[i][j] = 1;\\n                else\\n                    grid[i][j] = grid[i][j-1] + grid[i-1][j];\\n            }\\n        }\\n        return grid[m-1][n-1];\\n    }\\n}"
		},
		{
			"lc_ans_id":"22988",
			"view":"3801",
			"top":"5",
			"title":"Simple C++ version using Math",
			"vote":"25",
			"content":"    class Solution {\\n    public:\\n        int uniquePaths(int m, int n) {\\n            if(m <=0 || n <= 0) return 0;\\n            long long res = 1;\\n            for(int i = n; i < m+n-1 ; i++){\\n                res = res * i / (i- n + 1);\\n            }\\n            return (int)res;\\n        }\\n    };\\n\\nThe total step number should be m+n-2. This means that we have to move down for m-1 steps and move right n-1 steps to reach the definition. Then different choice number would be:\\n\\n\\n----------\\nUniqueStepNum = choose (m-1) from (m+n-2) = choose (n-1) from (m+n-2)\\n\\n----------\\n = (m+n-2)! / [(m-1)! * (n-1)!] \\n\\n----------\\n = ( (m+n-2) / (m-1) ) * ( (m+n-3) / (m-2) ) * ... * (n / 1)"
		},
		{
			"lc_ans_id":"23090",
			"view":"2389",
			"top":"6",
			"title":"JAVA solution 0ms 4lines",
			"vote":"23",
			"content":"If you mark the south move as '1' and the east move as '0'. This problem shall be equal to :\\nGiven (m+n-2) bits. you can fill in '1' for (m-1) times and '0' for (n-1) times, what is the number of different numbers?\\n the result is clear that the formula shall be C(m-1)(m+n-2), where m-1 is the superscript behind C and m+n-2 is the subscript behind C.\\nTo avoid overflow, I write the program in this manner.\\n\\npublic class Solution {\\n\\n    public int uniquePaths(int m, int n) {\\n\\n         long result = 1;\\n         for(int i=0;i<Math.min(m-1,n-1);i++)\\n             result = result*(m+n-2-i)/(i+1); \\n         return (int)result;\\n\\n    }\\n}"
		},
		{
			"lc_ans_id":"23234",
			"view":"2239",
			"top":"7",
			"title":"Accpeted simple Python DP solution.",
			"vote":"21",
			"content":"    class Solution:\\n        # @return an integer\\n        def uniquePaths(self, m, n):\\n            aux = [[1 for x in range(n)] for x in range(m)]\\n            for i in range(1, m):\\n                for j in range(1, n):\\n                    aux[i][j] = aux[i][j-1]+aux[i-1][j]\\n            return aux[-1][-1]"
		},
		{
			"lc_ans_id":"23003",
			"view":"3286",
			"top":"8",
			"title":"1 Line Math Solution (Python)",
			"vote":"20",
			"content":"    class Solution(object):\\n        def uniquePaths(self, m, n):\\n            \"\"\"\\n            :type m: int\\n            :type n: int\\n            :rtype: int\\n            \"\"\"\\n            return math.factorial(m+n-2)/math.factorial(m-1)/math.factorial(n-1)"
		},
		{
			"lc_ans_id":"23230",
			"view":"2209",
			"top":"9",
			"title":"Java DP with O(n) space",
			"vote":"17",
			"content":"We only need to store the previous row/column to perform the calculation for the next one. So an 1-d array would suffice. You could also choose to iterate through m or n depending on which direction you choose to go (by row or by column). Note that the first element of the array will always be 1.\\n\\n    public class Solution {\\n        public int uniquePaths(int m, int n) {\\n            int[] arr = new int[m];\\n            for (int i = 0; i < m; i++) {\\n                arr[i] = 1;\\n            }\\n            for (int i = 1; i < n; i++) {\\n                for (int j = 1; j < m; j++) {\\n                    arr[j] = arr[j] + arr[j-1];\\n                }\\n            }\\n            return arr[m-1];\\n        }\\n    }"
		}
	],
	"id":"62",
	"title":"Unique Paths",
	"content":"<p>A robot is located at the top-left corner of a <i>m</i> x <i>n</i> grid (marked 'Start' in the diagram below).</p>\r\n\r\n<p>The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).</p>\r\n\r\n<p>How many possible unique paths are there?</p>\r\n\r\n<p>\r\n<img src=\"/static/images/problemset/robot_maze.png\" /><br />\r\n<p style=\"font-size: 11px\">Above is a 3 x 7 grid. How many possible unique paths are there?\r\n</p>\r\n\r\n<p><b>Note:</b> <i>m</i> and <i>n</i> will be at most 100.</p>",
	"frequency":"447",
	"ac_num":"174538"
}