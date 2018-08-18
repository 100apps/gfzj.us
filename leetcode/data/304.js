{
	"difficulty":"2",
	"submit_num":"152595",
	"show_id":"304",
	"leetcode_id":"304",
	"answers":[
		{
			"lc_ans_id":"75350",
			"view":"11190",
			"top":"0",
			"title":"Clean C++ Solution and Explaination - O(mn) space with O(1) time",
			"vote":"110",
			"content":"Construct a 2D array `sums[row+1][col+1]`\\n\\n(**notice**: we add additional blank row `sums[0][col+1]={0}` and blank column `sums[row+1][0]={0}` to remove the edge case checking), so, we can have the following definition \\n\\n`sums[i+1][j+1]` represents the sum of area from `matrix[0][0]` to `matrix[i][j]`\\n\\nTo calculate sums, the ideas as below\\n\\n    +-----+-+-------+     +--------+-----+     +-----+---------+     +-----+--------+\\n    |     | |       |     |        |     |     |     |         |     |     |        |\\n    |     | |       |     |        |     |     |     |         |     |     |        |\\n    +-----+-+       |     +--------+     |     |     |         |     +-----+        |\\n    |     | |       |  =  |              |  +  |     |         |  -  |              |\\n    +-----+-+       |     |              |     +-----+         |     |              |\\n    |               |     |              |     |               |     |              |\\n    |               |     |              |     |               |     |              |\\n    +---------------+     +--------------+     +---------------+     +--------------+\\n    \\n       sums[i][j]      =    sums[i-1][j]    +     sums[i][j-1]    -   sums[i-1][j-1]   +  \\n\\n                            matrix[i-1][j-1]\\n\\nSo, we use the same idea to find the specific area's sum.\\n\\n\\n\\n    +---------------+   +--------------+   +---------------+   +--------------+   +--------------+\\n    |               |   |         |    |   |   |           |   |         |    |   |   |          |\\n    |   (r1,c1)     |   |         |    |   |   |           |   |         |    |   |   |          |\\n    |   +------+    |   |         |    |   |   |           |   +---------+    |   +---+          |\\n    |   |      |    | = |         |    | - |   |           | - |      (r1,c2) | + |   (r1,c1)    |\\n    |   |      |    |   |         |    |   |   |           |   |              |   |              |\\n    |   +------+    |   +---------+    |   +---+           |   |              |   |              |\\n    |        (r2,c2)|   |       (r2,c2)|   |   (r2,c1)     |   |              |   |              |\\n    +---------------+   +--------------+   +---------------+   +--------------+   +--------------+\\n\\nAnd we can have the following code\\n\\n   \\n    class NumMatrix {\\n    private:\\n        int row, col;\\n        vector<vector<int>> sums;\\n    public:\\n        NumMatrix(vector<vector<int>> &matrix) {\\n            row = matrix.size();\\n            col = row>0 ? matrix[0].size() : 0;\\n            sums = vector<vector<int>>(row+1, vector<int>(col+1, 0));\\n            for(int i=1; i<=row; i++) {\\n                for(int j=1; j<=col; j++) {\\n                    sums[i][j] = matrix[i-1][j-1] + \\n                                 sums[i-1][j] + sums[i][j-1] - sums[i-1][j-1] ;\\n                }\\n            }\\n        }\\n    \\n        int sumRegion(int row1, int col1, int row2, int col2) {\\n            return sums[row2+1][col2+1] - sums[row2+1][col1] - sums[row1][col2+1] + sums[row1][col1];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"75358",
			"view":"12227",
			"top":"1",
			"title":"Clean and easy to understand java solution",
			"vote":"62",
			"content":"    private int[][] dp;\\n\\n    public NumMatrix(int[][] matrix) {\\n        if(   matrix           == null\\n           || matrix.length    == 0\\n           || matrix[0].length == 0   ){\\n            return;   \\n        }\\n        \\n        int m = matrix.length;\\n        int n = matrix[0].length;\\n        \\n        dp = new int[m + 1][n + 1];\\n        for(int i = 1; i <= m; i++){\\n            for(int j = 1; j <= n; j++){\\n                dp[i][j] = dp[i - 1][j] + dp[i][j - 1] -dp[i - 1][j - 1] + matrix[i - 1][j - 1] ;\\n            }\\n        }\\n    }\\n\\n    public int sumRegion(int row1, int col1, int row2, int col2) {\\n        int iMin = Math.min(row1, row2);\\n        int iMax = Math.max(row1, row2);\\n        \\n        int jMin = Math.min(col1, col2);\\n        int jMax = Math.max(col1, col2);\\n        \\n        return dp[iMax + 1][jMax + 1] - dp[iMax + 1][jMin] - dp[iMin][jMax + 1] + dp[iMin][jMin];    \\n    }"
		},
		{
			"lc_ans_id":"75381",
			"view":"2603",
			"top":"2",
			"title":"C++ with helper",
			"vote":"12",
			"content":"My `accu[i][j]` is the sum of `matrix[0..i][0..j]`, and `a(i, j)` helps with edge cases.\\n\\n    class NumMatrix {\\n    public:\\n        NumMatrix(vector<vector<int>> &matrix) {\\n            accu = matrix;\\n            for (int i=0; i<matrix.size(); ++i)\\n                for (int j=0; j<matrix[0].size(); ++j)\\n                    accu[i][j] += a(i-1, j) + a(i, j-1) - a(i-1, j-1);\\n        }\\n    \\n        int sumRegion(int row1, int col1, int row2, int col2) {\\n            return a(row2, col2) - a(row1-1, col2) - a(row2, col1-1) + a(row1-1, col1-1);\\n        }\\n    \\n    private:\\n        vector<vector<int>> accu;\\n        int a(int i, int j) {\\n            return i >= 0 && j >= 0 ? accu[i][j] : 0;\\n        }\\n    };\\n\\n---\\n\\n**Afterthought**\\n\\nInstead of\\n\\n                    accu[i][j] += a(i-1, j) + a(i, j-1) - a(i-1, j-1);\\n\\nI could use\\n\\n                    accu[i][j] += a(i, j) - sumRegion(i, j, i, j);\\n\\nwhich is shorter but I think less clear. I do like already using `sumRegion` in the precomputation, though."
		},
		{
			"lc_ans_id":"75357",
			"view":"3313",
			"top":"3",
			"title":"Very clean and fast java solution",
			"vote":"10",
			"content":"    private int[][] sumRegion;\\n\\n    public NumMatrix(int[][] matrix) {\\n        if (matrix.length != 0)  sumRegion = new int[matrix.length + 1][matrix[0].length + 1];\\n        \\n        for (int i = 0; i < matrix.length; i++) {\\n            int sum = 0;\\n            for (int j = 0; j < matrix[0].length; j++) {\\n                sum += matrix[i][j];\\n                sumRegion[i + 1][j + 1] = sum + sumRegion[i][j + 1]; \\n            }\\n        }\\n    }\\n\\n    public int sumRegion(int row1, int col1, int row2, int col2) {\\n        return sumRegion[row2 + 1][col2 + 1] - sumRegion[row1][col2 + 1] - sumRegion[row2 + 1][col1] + sumRegion[row1][col1];\\n    }"
		},
		{
			"lc_ans_id":"75448",
			"view":"1953",
			"top":"4",
			"title":"Sharing My Python solution",
			"vote":"9",
			"content":"The idea is simple, just precompute sums for all matrices with (0, 0) as top left corner and (i, j) as bottom right corner. There are O(n^2) of these matrices, so we store them in a 2D table. In order to make code simpler, I add an extra column and row, filled with 0. \\n\\n    class NumMatrix(object):\\n          def __init__(self, matrix):\\n              if matrix is None or not matrix:\\n                  return\\n              n, m = len(matrix), len(matrix[0])\\n              self.sums = [ [0 for j in xrange(m+1)] for i in xrange(n+1) ]\\n              for i in xrange(1, n+1):\\n                  for j in xrange(1, m+1):\\n                      self.sums[i][j] = matrix[i-1][j-1] + self.sums[i][j-1] + self.sums[i-1][j] - self.sums[i-1][j-1]\\n        \\n\\n          def sumRegion(self, row1, col1, row2, col2):\\n              row1, col1, row2, col2 = row1+1, col1+1, row2+1, col2+1\\n              return self.sums[row2][col2] - self.sums[row2][col1-1] - self.sums[row1-1][col2] + self.sums[row1-1][col1-1]"
		},
		{
			"lc_ans_id":"75415",
			"view":"996",
			"top":"5",
			"title":"Clean C++ 15 lines solution.",
			"vote":"8",
			"content":"    class NumMatrix {\\n    public:\\n        NumMatrix(vector<vector<int>> &matrix) {\\n            if (matrix.size() == 0) return;\\n            sum = vector<vector<int>>(matrix.size()+1, vector<int>(matrix[0].size()+1, 0));\\n            for (int i = 0; i < matrix.size(); ++i) {\\n                for (int j = 0; j < matrix[0].size(); ++j) {\\n                    sum[i+1][j+1] = matrix[i][j] + sum[i][j+1] + sum[i+1][j] -sum[i][j];\\n                }\\n            }\\n        }\\n        int sumRegion(int row1, int col1, int row2, int col2) {\\n            return sum[row2+1][col2+1] - sum[row2+1][col1] -sum[row1][col2+1] +sum[row1][col1];\\n        }\\n    private:\\n        vector<vector<int>> sum;\\n    };"
		},
		{
			"lc_ans_id":"75346",
			"view":"820",
			"top":"6",
			"title":"3 ms Java Solution",
			"vote":"4",
			"content":"standard DP solution. 3 ms, beat 100 %\\n```\\npublic class NumMatrix {\\n    int [][] sum;\\n    public NumMatrix(int[][] matrix) {\\n        if (matrix.length == 0 || matrix[0].length == 0)\\n            return;\\n        sum = new int[matrix.length+1][matrix[0].length+1];\\n        for (int i=0; i<matrix.length; i++) {\\n            int tmp = 0;\\n            for (int j=0; j<matrix[0].length; j++) {\\n                tmp += matrix[i][j];\\n                sum[i+1][j+1] = sum[i][j+1] + tmp;\\n            }\\n        }\\n    }\\n\\n    public int sumRegion(int row1, int col1, int row2, int col2) {\\n        if (sum.length == 0)\\n            return 0;\\n        return sum[row2+1][col2+1] - sum[row2+1][col1] - sum[row1][col2+1] + sum[row1][col1];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"75430",
			"view":"1060",
			"top":"7",
			"title":"DP Java solution",
			"vote":"4",
			"content":"The ideal is to store the sum in the rectangle of (0, 0) to (i, j).\\n\\npublic class NumMatrix {\\n\\n    private int[][] sum2Origin = null;\\n    public NumMatrix(int[][] matrix) {\\n        if (matrix == null || matrix.length <= 0)\\n\\t\\t\\treturn;\\n\\t\\tsum2Origin = new int[matrix.length + 1][matrix[0].length + 1];\\n\\t\\tfor (int i = 1; i <= matrix.length; i ++)\\n\\t\\t\\tfor (int j = 1; j <= matrix[0].length; j ++)\\n\\t\\t\\t\\tsum2Origin[i][j] = sum2Origin[i][j - 1] + sum2Origin[i - 1][j] - sum2Origin[i - 1][j - 1] + matrix[i - 1][j - 1];\\n\\t\\treturn;\\n    }\\n\\n    public int sumRegion(int row1, int col1, int row2, int col2) {\\n        if (sum2Origin == null)\\n            return 0;\\n        return sum2Origin[row2 + 1][col2 + 1] - sum2Origin[row2 + 1][col1] - sum2Origin[row1][col2 + 1] + sum2Origin[row1][col1];\\n\\n    }\\n}"
		},
		{
			"lc_ans_id":"75398",
			"view":"743",
			"top":"8",
			"title":"My simple Java solution",
			"vote":"3",
			"content":"public class NumMatrix {\\n\\n// I define a matrix called sum that each element sum[i][j] is the sum of all the element in the rectangle from matrix[0][0] to matrix[i-1][j-1]. We keep an extra row and col of 0s in sum matrix so that we do not need to check whether the input col1 or row1 is 0. \\n\\n// if matrix = {\\n\\n{1, 2, 3},\\n\\n{4, 5, 6},\\n\\n{7, 8, 9}}\\n\\nthen the sum matrix would be:{\\n\\n{0,   0,   0,   0},\\n\\n{0,   1,   3,    6},\\n\\n{0,   5,   12,   21},\\n\\n{0,  12,  27,  45}}\\n\\n    private int[][] sum = null;\\n\\n    public NumMatrix(int[][] matrix) {\\n        if(matrix == null || matrix.length == 0){return;}\\n        sum = new int[matrix.length + 1][matrix[0].length + 1];\\n        sum[1][1] = matrix[0][0];\\n        for(int i = 1; i < sum.length; i++){\\n            sum[i][1] = sum[i-1][1] + matrix[i-1][0];\\n        }\\n\\n        for(int j = 1; j < sum[0].length; j++){\\n            sum[1][j] = sum[1][j-1] + matrix[0][j-1];\\n        }\\n        \\n        for(int i = 2; i < sum.length; i++){\\n            for(int j = 2; j < sum[0].length; j++){\\n                sum[i][j] = sum[i][j-1] + sum[i-1][j] - sum[i-1][j-1] + matrix[i-1][j-1];\\n            }\\n        }\\n        \\n    }\\n\\n    public int sumRegion(int row1, int col1, int row2, int col2) {\\n        return sum[row2+1][col2+1] - sum[row1][col2+1] - sum[row2+1][col1] + sum[row1][col1];\\n    }\\n}"
		},
		{
			"lc_ans_id":"75400",
			"view":"1324",
			"top":"9",
			"title":"Summed Area Table, a.k.a. Integral Image",
			"vote":"3",
			"content":"This is a well-studied problem and can be solved using a structure called Summed  Area Table. This method is also known as Integral Image in Computer Vision. It has\\n\\n - Space Complexity: O(M*N)\\n - Time Complexity for Range Sum Query: O(1)\\n - Time Complexity to Update a Value in Matrix: O(M*N)\\n\\nFor comparison, complexity of a naive approach which directly compute range sum from matrix is listed below.\\n\\n - Space Complexity: O(1)\\n - Time Complexity for Range Sum Query: O(M*N)\\n - Time Complexity to Update a Value in Matrix: O(1)\\n\\nAn algorithm comes between them is called 2D Fenwick Tree (a.k.a. Binary Indexed Tree), which achieves log complexity for both range sum query and value update.\\n\\n[https://en.wikipedia.org/wiki/Summed_area_table][1]\\n\\n[https://www.topcoder.com/community/data-science/data-science-tutorials/binary-indexed-trees/#2d][2]\\n\\n#\\n\\n    class NumMatrix {\\n    public:\\n        vector<vector<int>> sat;\\n        bool empty=true;\\n        \\n        NumMatrix(vector<vector<int>> &matrix) {\\n            int row = matrix.size();\\n            if(row == 0) return;\\n            int col = matrix[0].size();\\n            if(col == 0) return;\\n            empty = false;\\n            \\n            sat = vector<vector<int>>(row + 1, vector<int>(col + 1));\\n            \\n            for(int i = 1; i <= row; i++)\\n                for(int j = 1; j <= col; j++)\\n                    sat[i][j] = sat[i-1][j] + sat[i][j-1] - sat[i-1][j-1] + matrix[i-1][j-1];\\n        }\\n        \\n        int sumRegion(int row1, int col1, int row2, int col2) {\\n            return empty? 0 : sat[row2+1][col2+1] - (sat[row2+1][col1] + sat[row1][col2+1] - sat[row1][col1]);\\n        }\\n    };\\n\\n\\n  [1]: https://en.wikipedia.org/wiki/Summed_area_table\\n\\n  [2]: https://www.topcoder.com/community/data-science/data-science-tutorials/binary-indexed-trees/#2d"
		}
	],
	"id":"304",
	"title":"Range Sum Query 2D - Immutable",
	"content":"<p>Given a 2D matrix <i>matrix</i>, find the sum of the elements inside the rectangle defined by its upper left corner (<i>row</i>1, <i>col</i>1) and lower right corner (<i>row</i>2, <i>col</i>2).</p>\r\n\r\n<p>\r\n<img src=\"/static/images/courses/range_sum_query_2d.png\" border=\"0\" alt=\"Range Sum Query 2D\" /><br />\r\n<small>The above rectangle (with the red border) is defined by (row1, col1) = <b>(2, 1)</b> and (row2, col2) = <b>(4, 3)</b>, which contains sum = <b>8</b>.</small>\r\n</p>\r\n\r\n<p><b>Example:</b><br>\r\n<pre>\r\nGiven matrix = [\r\n  [3, 0, 1, 4, 2],\r\n  [5, 6, 3, 2, 1],\r\n  [1, 2, 0, 1, 5],\r\n  [4, 1, 0, 1, 7],\r\n  [1, 0, 3, 0, 5]\r\n]\r\n\r\nsumRegion(2, 1, 4, 3) -> 8\r\nsumRegion(1, 1, 2, 2) -> 11\r\nsumRegion(1, 2, 2, 4) -> 12\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>You may assume that the matrix does not change.</li>\r\n<li>There are many calls to <i>sumRegion</i> function.</li>\r\n<li>You may assume that <i>row</i>1 &le; <i>row</i>2 and <i>col</i>1 &le; <i>col</i>2.</li>\r\n</ol>\r\n</p>",
	"frequency":"308",
	"ac_num":"40715"
}