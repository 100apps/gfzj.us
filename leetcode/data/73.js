{
	"difficulty":"2",
	"submit_num":"349552",
	"show_id":"73",
	"leetcode_id":"73",
	"answers":[
		{
			"lc_ans_id":"26014",
			"view":"46916",
			"top":"0",
			"title":"Any shorter O(1) space solution?",
			"vote":"440",
			"content":"My idea is simple: store states of each row in the first of that row, and store states of each column in the first of that column. Because the state of row0 and the state of column0 would occupy the same cell, I let it be the state of row0, and use another variable \"col0\" for column0. In the first phase, use matrix elements to set states in a top-down way. In the second phase, use states to set matrix elements in a bottom-up way.\\n\\n    void setZeroes(vector<vector<int> > &matrix) {\\n        int col0 = 1, rows = matrix.size(), cols = matrix[0].size();\\n    \\n        for (int i = 0; i < rows; i++) {\\n            if (matrix[i][0] == 0) col0 = 0;\\n            for (int j = 1; j < cols; j++)\\n                if (matrix[i][j] == 0)\\n                    matrix[i][0] = matrix[0][j] = 0;\\n        }\\n    \\n        for (int i = rows - 1; i >= 0; i--) {\\n            for (int j = cols - 1; j >= 1; j--)\\n                if (matrix[i][0] == 0 || matrix[0][j] == 0)\\n                    matrix[i][j] = 0;\\n            if (col0 == 0) matrix[i][0] = 0;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"26008",
			"view":"23445",
			"top":"1",
			"title":"My AC java O(1) solution (easy to read)",
			"vote":"141",
			"content":"    public class Solution {\\n    public void setZeroes(int[][] matrix) {\\n        boolean fr = false,fc = false;\\n        for(int i = 0; i < matrix.length; i++) {\\n            for(int j = 0; j < matrix[0].length; j++) {\\n                if(matrix[i][j] == 0) {\\n                    if(i == 0) fr = true;\\n                    if(j == 0) fc = true;\\n                    matrix[0][j] = 0;\\n                    matrix[i][0] = 0;\\n                }\\n            }\\n        }\\n        for(int i = 1; i < matrix.length; i++) {\\n            for(int j = 1; j < matrix[0].length; j++) {\\n                if(matrix[i][0] == 0 || matrix[0][j] == 0) {\\n                    matrix[i][j] = 0;\\n                }\\n            }\\n        }\\n        if(fr) {\\n            for(int j = 0; j < matrix[0].length; j++) {\\n                matrix[0][j] = 0;\\n            }\\n        }\\n        if(fc) {\\n            for(int i = 0; i < matrix.length; i++) {\\n                matrix[i][0] = 0;\\n            }\\n        }\\n        \\n    }\\n}"
		},
		{
			"lc_ans_id":"26038",
			"view":"10457",
			"top":"2",
			"title":"My C++ O(1) yoooooo",
			"vote":"32",
			"content":"I find the last row which has 0, and use it to store the 0-collumns.\\nThen go row by row set them to 0.\\nThen go column by column set them to 0.\\nFinally set the last row which has 0. It's long but hey it's O(1) \\n\\n\\n    class Solution {\\n    public:\\n        void setZeroes(vector<vector<int> > &matrix) {\\n            \\n            int H = matrix.size();\\n            int W = matrix[0].size();\\n            \\n            // find the last 0 row\\n            int last_0_row = -1;\\n            for (int y = H - 1; y >= 0 && last_0_row == -1; y--)\\n                for (int x = 0; x < W; x++)\\n                    if (matrix[y][x] == 0)\\n                    {\\n                        last_0_row = y;\\n                        break;\\n                    }\\n            if (last_0_row == -1)\\n                return;\\n            \\n            // go row by row\\n            for (int y = 0; y < last_0_row; y++)\\n            {\\n                bool this_is_a_0_row = false;\\n                \\n                for (int x = 0; x < W; x++)\\n                {\\n                    if (matrix[y][x] == 0)\\n                    {\\n                        this_is_a_0_row = true;\\n                        matrix[last_0_row][x] = 0;\\n                    }\\n                }\\n                \\n                if (this_is_a_0_row)\\n                for (int x = 0; x < W; x++)\\n                {\\n                    matrix[y][x] = 0;\\n                }\\n            }\\n            \\n            // set collums to 0\\n            for (int y = 0; y < H; y++)\\n            for (int x = 0; x < W; x++)\\n            {\\n                if (matrix[last_0_row][x] == 0)\\n                    matrix[y][x] = 0;\\n            }\\n            \\n            // set the last 0 row \\n            for (int x = 0; x < W; x++)\\n            {\\n                matrix[last_0_row][x] = 0;\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"26166",
			"view":"9337",
			"top":"3",
			"title":"My java O(1) solution (easy to understand)",
			"vote":"28",
			"content":"    public class Solution {\\n        public void setZeroes(int[][] matrix) {\\n            if(matrix==null){\\n                return;\\n            }\\n            \\n            int m = matrix.length;\\n            int n = matrix[0].length;\\n            \\n            boolean rowHasZero = false;\\n            boolean colHasZero = false;\\n            \\n            for(int i=0; i<n; i++){\\n                if(matrix[0][i]==0){\\n                    rowHasZero = true;\\n                    break;\\n                }\\n            }\\n            \\n            for(int i=0; i<m; i++){\\n                if(matrix[i][0]==0){\\n                    colHasZero = true;\\n                    break;\\n                }\\n            }\\n            \\n            for(int i=1; i<m; i++){\\n                for(int j=1; j<n; j++){\\n                    if(matrix[i][j]==0){\\n                        matrix[i][0] = 0;\\n                        matrix[0][j] = 0;\\n                    }\\n                }\\n            }\\n            \\n    \\n            \\n            for(int j=1;j<n; j++){\\n                if(matrix[0][j]==0){\\n                    nullifyCol(matrix, j, m, n);\\n                }\\n            }\\n            \\n            for(int i=1; i<m; i++){\\n                if(matrix[i][0]==0){\\n                    nullifyRow(matrix, i, m, n);\\n                }\\n            }\\n            \\n            if(rowHasZero){\\n                nullifyRow(matrix, 0, m, n);\\n            }\\n            if(colHasZero){\\n                nullifyCol(matrix, 0, m, n);\\n            }\\n            \\n        }\\n        \\n        public void nullifyRow(int[][] matrix, int i, int m, int n){\\n            for(int col=0; col<n; col++){\\n                matrix[i][col] = 0;\\n            }\\n        }\\n        \\n        public void nullifyCol(int[][] matrix, int j, int m, int n){\\n            for(int row=0; row<m; row++){\\n                matrix[row][j] = 0;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"26037",
			"view":"7607",
			"top":"4",
			"title":"O(1) JAVA, straightforward idea",
			"vote":"19",
			"content":"Use the first column and the first row as marker:\\n1. first scan through the whole matrix, and if one row i has zero, label matrix[i][0] = 0, if column j has zero, then label matrix[0][j] = 0.\\nif we find the first row has zero, then mark a boolean row = true, if the first column has zeros, mark a boolean col = true;\\n\\n2. By the markers on the first row and first col, set the other columns and rows to zeros. (first row and first column already contain zeros)\\n\\n3. According to booleans row and col, decide whether to set first row and column to zeros.\\n\\n        public class Solution {\\n        public void setZeroes(int[][] matrix) {\\n            if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return;\\n            int m = matrix.length, n = matrix[0].length;\\n            boolean row = false, col = false;\\n            for (int i = 0; i < m; i++)\\n                for (int j = 0; j < n; j++){\\n                    if (matrix[i][j] == 0) {\\n                        matrix[0][j] = 0;\\n                        matrix[i][0] = 0;\\n                        if (i == 0) row = true;\\n                        if (j == 0) col = true;\\n                    }\\n                }\\n            for (int i = 1; i < m; i++){\\n                if (matrix[i][0] == 0){\\n                    for (int j = 1; j < n;j++)\\n                        matrix[i][j] = 0;\\n                }\\n            }\\n            for (int j = 1; j < n; j++){\\n                if (matrix[0][j] == 0){\\n                    for (int i = 1; i < m; i++)\\n                        matrix[i][j] = 0;\\n                }\\n            }\\n            if (row){\\n                for (int j = 0; j < n; j++)\\n                    matrix[0][j] = 0;\\n            }\\n            if (col){\\n                for(int i = 0; i < m; i++)\\n                    matrix[i][0] = 0;\\n            }\\n        }\\n}"
		},
		{
			"lc_ans_id":"26113",
			"view":"1456",
			"top":"5",
			"title":"21 lines concise and easy understand C++ solution, O(1) space, three steps",
			"vote":"17",
			"content":"    class Solution {\\n    public:\\n        void setZeroes(vector<vector<int>>& matrix) {\\n            bool row = false, col = false;\\n            for(int i = 0; i < matrix.size(); i++){\\n                for(int j = 0; j < matrix[0].size(); j++){\\n                    if(matrix[i][j] == 0) {\\n                        if(i == 0) row = true;\\n                        if(j == 0) col = true;\\n                        matrix[0][j] = matrix[i][0] = 0;\\n                    }\\n                }\\n            }\\n            for(int i = 1; i < matrix.size(); i++){\\n                for(int j = 1; j < matrix[0].size(); j++){\\n                    if(matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;\\n                }\\n            }\\n            if(col){\\n                for(int i = 0; i < matrix.size(); i++) matrix[i][0] = 0;\\n            }\\n            if(row){\\n                for(int j = 0; j < matrix[0].size(); j++) matrix[0][j] = 0;\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"26026",
			"view":"3843",
			"top":"6",
			"title":"O(1) space solution in Python",
			"vote":"15",
			"content":"    class Solution:\\n    # @param {integer[][]} matrix\\n    # @return {void} Do not return anything, modify matrix in-place instead.\\n    def setZeroes(self, matrix):\\n        m = len(matrix)\\n        if m == 0:\\n            return\\n        n = len(matrix[0])\\n        \\n        row_zero = False\\n        for i in range(m):\\n            if matrix[i][0] == 0:\\n                row_zero = True\\n        col_zero = False\\n        for j in range(n):\\n            if matrix[0][j] == 0:\\n                col_zero = True\\n                \\n        for i in range(1, m):\\n            for j in range(1, n):\\n                if matrix[i][j] == 0:\\n                    matrix[i][0] = 0\\n                    matrix[0][j] = 0\\n        \\n        for i in range(1, m):\\n            if matrix[i][0] == 0:\\n                for j in range(1, n):\\n                    matrix[i][j] = 0\\n                    \\n        for j in range(1, n):\\n            if matrix[0][j] == 0:\\n                for i in range(1, m):\\n                    matrix[i][j] = 0\\n        \\n        if col_zero:\\n            for j in range(n):\\n                matrix[0][j] = 0\\n        if row_zero:\\n            for i in range(m):\\n                matrix[i][0] = 0"
		},
		{
			"lc_ans_id":"26115",
			"view":"2904",
			"top":"7",
			"title":"Java/Python O(1) space 11 lines solution",
			"vote":"13",
			"content":"**Java**\\n\\n    public void setZeroes(int[][] matrix) {\\n        int m = matrix.length, n = matrix[0].length, k = 0;\\n        // First row has zero?\\n        while (k < n && matrix[0][k] != 0) ++k;\\n        // Use first row/column as marker, scan the matrix\\n        for (int i = 1; i < m; ++i)\\n            for (int j = 0; j < n; ++j)\\n                if (matrix[i][j] == 0)\\n                    matrix[0][j] = matrix[i][0] = 0;\\n        // Set the zeros\\n        for (int i = 1; i < m; ++i)\\n            for (int j = n - 1; j >= 0; --j)\\n                if (matrix[0][j] == 0 || matrix[i][0] == 0)\\n                    matrix[i][j] = 0;\\n        // Set the zeros for the first row\\n        if (k < n) Arrays.fill(matrix[0], 0);\\n    }\\n\\n**Python**\\n\\n    def setZeroes(self, matrix):\\n        # First row has zero?\\n        m, n, firstRowHasZero = len(matrix), len(matrix[0]), not all(matrix[0])\\n        # Use first row/column as marker, scan the matrix\\n        for i in xrange(1, m):\\n            for j in xrange(n):\\n                if matrix[i][j] == 0:\\n                    matrix[0][j] = matrix[i][0] = 0\\n        # Set the zeros\\n        for i in xrange(1, m):\\n            for j in xrange(n - 1, -1, -1):\\n                if matrix[i][0] == 0 or matrix[0][j] == 0:\\n                    matrix[i][j] = 0\\n        # Set the zeros for the first row\\n        if firstRowHasZero:\\n            matrix[0] = [0] * n"
		},
		{
			"lc_ans_id":"26087",
			"view":"1580",
			"top":"8",
			"title":"Java easy to understand O(1) space solution with 2 passes",
			"vote":"12",
			"content":"    public class Solution {\\n    \\n    public void setZeroes(int[][] matrix) {\\n        if(matrix==null || matrix.length==0){\\n            return;\\n        }\\n        \\n        boolean setFirstRowToZeroes = false;\\n        boolean setFirstColumnToZeroes = false;\\n        \\n        //check if first column needs to be set to zero\\n        for(int row=0;row<matrix.length;row++){\\n            if(matrix[row][0] == 0){\\n                setFirstColumnToZeroes=true;\\n                break;\\n            }\\n        }\\n        \\n        //check if first row needs to be set to zero\\n        for(int col=0;col<matrix[0].length;col++){\\n            if(matrix[0][col] == 0){\\n                setFirstRowToZeroes=true;\\n                break;\\n            }\\n        }\\n        \\n        //mark columns and rows to be set to zero\\n        for(int row=1;row<matrix.length;row++){\\n            for(int col=1;col<matrix[0].length;col++){\\n                if(matrix[row][col]==0){\\n                    matrix[row][0]=0;\\n                    matrix[0][col]=0;\\n                }\\n            }\\n        }\\n        \\n        // make rows zero\\n        for(int row=1;row<matrix.length;row++){\\n            if(matrix[row][0]==0){\\n                for(int col=1;col<matrix[0].length;col++){\\n                    matrix[row][col]=0;\\n                }\\n            }\\n        }\\n        \\n        // make columns zero\\n        for(int col=1;col<matrix[0].length;col++){\\n            if(matrix[0][col]==0){\\n                for(int row=1;row<matrix.length;row++){\\n                    matrix[row][col]=0;\\n                }\\n            }\\n        }\\n        \\n        // zero out first row (if needed)\\n        if(setFirstRowToZeroes){\\n            for(int col=0;col<matrix[0].length;col++){\\n                matrix[0][col]=0;\\n            }\\n        }\\n        \\n        // zero out first column (if needed)\\n        if(setFirstColumnToZeroes){\\n            for(int row=0;row<matrix.length;row++){\\n                matrix[row][0]=0;\\n            }\\n        }\\n        \\n    }\\n}"
		},
		{
			"lc_ans_id":"26151",
			"view":"1949",
			"top":"9",
			"title":"Constant Space Java solution",
			"vote":"12",
			"content":" a b b \\n\\n   b c c\\n\\n   b c c\\n\\nStep1: Determine row1 and col1. Need to go through the first col and first row. Use two vars to store that information.\\nStep2: Use \"c\" to determine \"b\". Need to go through the entire matrix. Once \"c\" is zero, set its corresponding two \"b\"s to zero.\\nStep3: Use \"b\" to set \"c\". If \"b\" is zero, its corresponding row or col are set to all zero.\\nStep4: Use previous row1 and col1 information to set col1 and row1.\\n\\n    public class Solution {\\n        public void setZeroes(int[][] matrix) {\\n            boolean firstColZero = false, firstRowZero = false;\\n            for(int i = 0;i < matrix.length;i++)\\n                if(matrix[i][0] == 0)\\n                    firstColZero = true;\\n            for(int j = 0;j < matrix[0].length;j++)\\n                if(matrix[0][j] == 0)\\n                    firstRowZero = true;\\n            for(int i = 1;i < matrix.length;i++)\\n                for(int j = 1;j < matrix[0].length;j++)\\n                    if(matrix[i][j] == 0)\\n                        matrix[i][0] = matrix[0][j] = 0;\\n            for(int i = 1;i < matrix.length;i++)\\n                if(matrix[i][0] == 0)\\n                    for(int j = 0;j < matrix[0].length;j++)\\n                        matrix[i][j] = 0;\\n            for(int j = 1;j < matrix[0].length;j++)\\n                if(matrix[0][j] == 0)\\n                    for(int i = 0;i < matrix.length;i++)\\n                        matrix[i][j] = 0;\\n            if(firstColZero)\\n                for(int i = 0;i < matrix.length;i++)\\n                    matrix[i][0] = 0;\\n            if(firstRowZero)\\n                for(int j = 0;j < matrix[0].length;j++)\\n                    matrix[0][j] = 0;\\n                    \\n        }\\n    }"
		}
	],
	"id":"73",
	"title":"Set Matrix Zeroes",
	"content":"<p>\r\nGiven a <i>m</i> x <i>n</i> matrix, if an element is 0, set its entire row and column to 0. Do it in place.\r\n</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show follow up.</a></p>\r\n\r\n<div class=\"spoilers\"><b>Follow up:</b>\r\n\r\n<p>\r\nDid you use extra space?<br />\r\nA straight forward solution using O(<i>m</i><i>n</i>) space is probably a bad idea.<br />\r\nA simple improvement uses O(<i>m</i> + <i>n</i>) space, but still not the best solution.<br />\r\nCould you devise a constant space solution?\r\n</p>\r\n</div>",
	"frequency":"472",
	"ac_num":"127192"
}