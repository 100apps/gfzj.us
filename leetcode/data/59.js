{
	"difficulty":"2",
	"submit_num":"233424",
	"show_id":"59",
	"leetcode_id":"59",
	"answers":[
		{
			"lc_ans_id":"22282",
			"view":"11241",
			"top":"0",
			"title":"4-9 lines Python solutions",
			"vote":"102",
			"content":"**Solution 1: *Build it inside-out*** - 44 ms, 5 lines\\n\\nStart with the empty matrix, add the numbers in reverse order until we added the number 1. Always rotate the matrix clockwise and add a top row:\\n\\n        ||  =>  |9|  =>  |8|      |6 7|      |4 5|      |1 2 3|\\n                         |9|  =>  |9 8|  =>  |9 6|  =>  |8 9 4|\\n                                             |8 7|      |7 6 5|\\n\\nThe code:\\n\\n    def generateMatrix(self, n):\\n        A, lo = [], n*n+1\\n        while lo > 1:\\n            lo, hi = lo - len(A), lo\\n            A = [range(lo, hi)] + zip(*A[::-1])\\n        return A\\n\\nWhile this isn't O(n^2), it's actually quite fast, presumably due to me not doing much in Python but relying on `zip` and `range` and `+` being fast. I got it accepted in 44 ms, matching the fastest time for recent Python submissions (according to the submission detail page).\\n\\n---\\n\\n**Solution 2: *Ugly inside-out*** - 48 ms, 4 lines\\n\\nSame as solution 1, but without helper variables. Saves a line, but makes it ugly. Also, because I access A[0][0], I had to handle the n=0 case differently.\\n\\n    def generateMatrix(self, n):\\n        A = [[n*n]]\\n        while A[0][0] > 1:\\n            A = [range(A[0][0] - len(A), A[0][0])] + zip(*A[::-1])\\n        return A * (n>0)\\n\\n---\\n\\n**Solution 3: *Walk the spiral*** - 52 ms, 9 lines\\n\\nInitialize the matrix with zeros, then walk the spiral path and write the numbers 1 to n*n. Make a right turn when the cell ahead is already non-zero.\\n\\n    def generateMatrix(self, n):\\n        A = [[0] * n for _ in range(n)]\\n        i, j, di, dj = 0, 0, 0, 1\\n        for k in xrange(n*n):\\n            A[i][j] = k + 1\\n            if A[(i+di)%n][(j+dj)%n]:\\n                di, dj = dj, -di\\n            i += di\\n            j += dj\\n        return A"
		},
		{
			"lc_ans_id":"22289",
			"view":"12991",
			"top":"1",
			"title":"My Super Simple Solution. Can be used for both Spiral Matrix I and II",
			"vote":"74",
			"content":"This is my solution for Spiral Matrix I, [https://oj.leetcode.com/discuss/12228/super-simple-and-easy-to-understand-solution][1]. If you can understand that, this one is a no brainer :)\\n\\nGuess what? I just made several lines of change (with comment \"//change\") from that and I have the following AC code:\\n\\n    public class Solution {\\n        public int[][] generateMatrix(int n) {\\n            // Declaration\\n            int[][] matrix = new int[n][n];\\n            \\n            // Edge Case\\n            if (n == 0) {\\n                return matrix;\\n            }\\n            \\n            // Normal Case\\n            int rowStart = 0;\\n            int rowEnd = n-1;\\n            int colStart = 0;\\n            int colEnd = n-1;\\n            int num = 1; //change\\n            \\n            while (rowStart <= rowEnd && colStart <= colEnd) {\\n                for (int i = colStart; i <= colEnd; i ++) {\\n                    matrix[rowStart][i] = num ++; //change\\n                }\\n                rowStart ++;\\n                \\n                for (int i = rowStart; i <= rowEnd; i ++) {\\n                    matrix[i][colEnd] = num ++; //change\\n                }\\n                colEnd --;\\n                \\n                for (int i = colEnd; i >= colStart; i --) {\\n                    if (rowStart <= rowEnd)\\n                        matrix[rowEnd][i] = num ++; //change\\n                }\\n                rowEnd --;\\n                \\n                for (int i = rowEnd; i >= rowStart; i --) {\\n                    if (colStart <= colEnd)\\n                        matrix[i][colStart] = num ++; //change\\n                }\\n                colStart ++;\\n            }\\n            \\n            return matrix;\\n        }\\n    }\\n\\nObviously, you could merge colStart and colEnd into rowStart and rowEnd because it is a square matrix. But this is easily extensible to matrices that are m*n.\\n\\nHope this helps :)\\n\\n\\n  [1]: https://oj.leetcode.com/discuss/12228/super-simple-and-easy-to-understand-solution"
		},
		{
			"lc_ans_id":"22309",
			"view":"8028",
			"top":"2",
			"title":"Simple C++ solution(with explaination)",
			"vote":"49",
			"content":"   \\n    class Solution {\\n        public:\\n            vector<vector<int> > generateMatrix(int n) {\\n                vector<vector<int> > ret( n, vector<int>(n) );\\n            \\tint k = 1, i = 0;\\n            \\twhile( k <= n * n )\\n            \\t{\\n            \\t\\tint j = i;\\n                        // four steps\\n            \\t\\twhile( j < n - i )             // 1. horizonal, left to right\\n            \\t\\t\\tret[i][j++] = k++;\\n            \\t\\tj = i + 1;\\n            \\t\\twhile( j < n - i )             // 2. vertical, top to bottom\\n            \\t\\t\\tret[j++][n-i-1] = k++;\\n            \\t\\tj = n - i - 2;\\n            \\t\\twhile( j > i )                  // 3. horizonal, right to left \\n            \\t\\t\\tret[n-i-1][j--] = k++;\\n            \\t\\tj = n - i - 1;\\n            \\t\\twhile( j > i )                  // 4. vertical, bottom to  top \\n            \\t\\t\\tret[j--][i] = k++;\\n            \\t\\ti++;      // next loop\\n            \\t}\\n            \\treturn ret;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"22292",
			"view":"5745",
			"top":"3",
			"title":"Share my java solution",
			"vote":"33",
			"content":"    public static int[][] generateMatrix(int n) {\\n\\t\\tint[][] ret = new int[n][n];\\n\\t\\tint left = 0,top = 0;\\n\\t\\tint right = n -1,down = n - 1;\\n\\t\\tint count = 1;\\n\\t\\twhile (left <= right) {\\n\\t\\t\\tfor (int j = left; j <= right; j ++) {\\n\\t\\t\\t\\tret[top][j] = count++;\\n\\t\\t\\t}\\n\\t\\t\\ttop ++;\\n\\t\\t\\tfor (int i = top; i <= down; i ++) {\\n\\t\\t\\t\\tret[i][right] = count ++;\\n\\t\\t\\t}\\n\\t\\t\\tright --;\\n\\t\\t\\tfor (int j = right; j >= left; j --) {\\n\\t\\t\\t\\tret[down][j] = count ++;\\n\\t\\t\\t}\\n\\t\\t\\tdown --;\\n\\t\\t\\tfor (int i = down; i >= top; i --) {\\n\\t\\t\\t\\tret[i][left] = count ++;\\n\\t\\t\\t}\\n\\t\\t\\tleft ++;\\n\\t\\t}\\n\\t\\treturn ret;\\n\\t}"
		},
		{
			"lc_ans_id":"22466",
			"view":"3205",
			"top":"4",
			"title":"My AC solution with using direction variable",
			"vote":"18",
			"content":"      \\n     vector<vector<int> > generateMatrix(int n) {\\n                int dir = 0;\\n                vector< vector<int> > matrix(n, vector<int> (n, 0));\\n                int i = 0, j = 0, k = 1;\\n                while (k <= n * n) {\\n                    matrix[i][j] = k++;\\n                    if (dir == 0){\\n                        j++;\\n                        if (j == n || matrix[i][j] != 0) dir = 1, j--, i++;\\n                    } else\\n                    if (dir == 1) {\\n                        i++;\\n                        if (i == n || matrix[i][j] != 0) dir = 2, i--, j--;\\n                    } else\\n                    if (dir == 2) {\\n                        j--;\\n                        if (j < 0 || matrix[i][j] != 0) dir = 3, j++, i--;\\n                    } else\\n                    if (dir == 3) {\\n                        i--;\\n                        if (i < 0 || matrix[i][j] != 0) dir = 0, i++, j++;\\n                    }\\n                }\\n                return matrix;\\n            }"
		},
		{
			"lc_ans_id":"22454",
			"view":"1260",
			"top":"5",
			"title":"Simple C++ solution",
			"vote":"12",
			"content":"    class Solution {\\n    public:\\n        vector<vector<int> > generateMatrix(int n) {\\n            vector<vector<int> > vv(n, vector<int>(n));\\n        \\n            int rowStart = 0, rowEnd = n - 1;\\n            int colStart = 0, colEnd = n - 1;\\n            int cnt = 1;\\n        \\n            while(rowStart <= rowEnd && colStart <= colEnd)\\n            {\\n                for(int i = colStart; i<= colEnd; i++)\\n                    vv[rowStart][i] = cnt++;\\n                rowStart++;\\n            \\n                for(int i = rowStart; i<= rowEnd; i++)\\n                    vv[i][colEnd] = cnt++;\\n                colEnd--;\\n            \\n                for(int i = colEnd; i>= colStart; i--)\\n                    vv[rowEnd][i] = cnt++;\\n                rowEnd--;\\n            \\n                for(int i = rowEnd; i>= rowStart; i--)\\n                    vv[i][colStart] = cnt++;\\n                colStart++;\\n            }\\n        \\n            return vv;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"22295",
			"view":"1489",
			"top":"6",
			"title":"Java, simple and clear, easy understood",
			"vote":"8",
			"content":"```\\npublic class Solution {\\n    public int[][] generateMatrix(int n) {\\n        // similar to spiral matrix I,done by myself\\n        int[][] rs = new int[n][n];\\n        int top = 0,bottom = n-1,left = 0,right = n-1;\\n        int num = 1;\\n        \\n        while(left<=right && top <=bottom){\\n            for(int i=left;i<=right;i++){\\n                rs[top][i] = num++;\\n            }\\n            top++;\\n            for(int i= top;i<=bottom;i++){\\n                rs[i][right] = num++;\\n            }\\n            right--;\\n            for(int i= right;i>=left;i-- ){\\n                rs[bottom][i] = num++;\\n            }\\n            bottom--;\\n            for(int i = bottom;i>=top;i--){\\n                rs[i][left] = num++;\\n            }\\n            left++;\\n        }\\n        return rs;\\n    }\\n}"
		},
		{
			"lc_ans_id":"22409",
			"view":"852",
			"top":"7",
			"title":"C++ concise solution.",
			"vote":"8",
			"content":"        \\n    vector<vector<int>> generateMatrix(int n) {\\n        vector<vector<int>> res(n, vector<int> (n, 1));\\n        int left, right, top, down, index;\\n        left = top = index = 0, right = down = n-1;\\n        while (left <= right && top <= down) {\\n            for (unsigned int j = left; j <= right; j++)\\n                res[top][j] = ++index;\\n            top++;\\n            for (unsigned int i = top; i <= down; i++)\\n                res[i][right] = ++index;\\n            right--;\\n            for (int j = right; j >= left; j--)\\n                res[down][j] = ++index;\\n            down--;\\n            for (int i = down; i >= top; i--)\\n                res[i][left] = ++index;\\n            left++;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"22469",
			"view":"814",
			"top":"8",
			"title":"If we can't write data to the matrix, we change the direction,a simple python solution",
			"vote":"8",
			"content":"    class Solution:\\n    # @return a list of lists of integer\\n    def generateMatrix(self, n):\\n        matrix = [[0]*n for _ in range(n)]\\n        directions = ((0, 1), (1, 0), (0, -1), (-1, 0))\\n        d = 0\\n        y, x = 0, 0\\n        for i in range(1, n*n+1):\\n            matrix[y][x] = i\\n            dy, dx = directions[d % 4]\\n            if -1 < y+dy < n and -1 < x+dx < n and matrix[y+dy][x+dx] == 0:\\n                y, x = y+dy, x+dx\\n            else:\\n                d += 1\\n                dy, dx = directions[d % 4]\\n                y, x = y+dy, x+dx\\n        return matrix\\n\\nChange the direction If the we can't write to the matrix"
		},
		{
			"lc_ans_id":"22473",
			"view":"834",
			"top":"9",
			"title":"Share my simple solution with graphical explanation - Java",
			"vote":"7",
			"content":"If n is odd, only the first direction will cover it (top left -> right, shown as # in the graph), because the other three direction all start from the next position( +1 or -1).\\n\\n    /**\\n    \\t * -> -> ->\\n    \\t * ^      |\\n    \\t * |      |\\n    \\t * <- <-- V\\n    \\t * \\n    \\t * # # # #\\n    \\t * %     $\\n    \\t * %     $\\n    \\t * & & & $\\n    \\t *     \\n    \\t */\\n        public static int[][] generateMatrix(int n) {\\n        \\tint[][] res = new int[n][n];\\n        \\t\\n        \\tint num = 1;\\n        \\tint level = (int) Math.ceil(n / 2.);\\n        \\t\\n        \\tfor(int i = 0; i < level; i++) {\\n        \\t\\t\\n        \\t\\t// top left -> right, shown as #\\n        \\t\\tfor(int j = i; j < n - i; j++)\\n        \\t\\t\\tres[i][j] = num++;\\n        \\t\\t\\n        \\t\\t// top right + 1 -> bot, shown as $\\n        \\t\\tfor(int j = i + 1; j < n - i; j++)\\n        \\t\\t\\tres[j][n - i - 1] = num++;\\n        \\t\\t\\n        \\t\\t// bot right - 1 -> left, shown as &\\n        \\t\\tfor(int j = n - i - 2; j >= i; j--)\\n        \\t\\t\\tres[n - i - 1][j] = num++;\\n        \\t\\t\\n        \\t\\t// bot left -1 -> top + 1, shown as %\\n        \\t\\tfor(int j = n - i - 2; j > i; j--)\\n        \\t\\t\\tres[j][i] = num++;\\n        \\t}\\n        \\treturn res;\\n        }"
		}
	],
	"id":"59",
	"title":"Spiral Matrix II",
	"content":"<p>Given an integer <i>n</i>, generate a square matrix filled with elements from 1 to <i>n</i><sup>2</sup> in spiral order.</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven <i>n</i> = <code>3</code>,\r\n</p>\r\nYou should return the following matrix:\r\n<pre>\r\n[\r\n [ 1, 2, 3 ],\r\n [ 8, 9, 4 ],\r\n [ 7, 6, 5 ]\r\n]\r\n</pre>",
	"frequency":"412",
	"ac_num":"94867"
}