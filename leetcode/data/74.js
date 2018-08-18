{
	"difficulty":"2",
	"submit_num":"423737",
	"show_id":"74",
	"leetcode_id":"74",
	"answers":[
		{
			"lc_ans_id":"26220",
			"view":"32873",
			"top":"0",
			"title":"Don't treat it as a 2D matrix, just treat it as a sorted list",
			"vote":"206",
			"content":"Use binary search. \\n\\nn * m matrix convert to an array => matrix[x][y] => a[x * m + y]\\n\\nan array convert to n * m matrix => a[x] =>matrix[x / m][x % m];\\n\\n    class Solution {\\n    public:\\n        bool searchMatrix(vector<vector<int> > &matrix, int target) {\\n            int n = matrix.size();\\n            int m = matrix[0].size();\\n            int l = 0, r = m * n - 1;\\n            while (l != r){\\n                int mid = (l + r - 1) >> 1;\\n                if (matrix[mid / m][mid % m] < target)\\n                    l = mid + 1;\\n                else \\n                    r = mid;\\n            }\\n            return matrix[r / m][r % m] == target;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"26219",
			"view":"15558",
			"top":"1",
			"title":"Binary search on an ordered matrix",
			"vote":"50",
			"content":"\\t/**\\n\\t *  Do binary search in this \"ordered\" matrix\\n\\t */\\n\\tpublic boolean searchMatrix(int[][] matrix, int target) {\\n\\t\\t\\n\\t\\tint row_num = matrix.length;\\n\\t\\tint col_num = matrix[0].length;\\n\\t\\t\\n\\t\\tint begin = 0, end = row_num * col_num - 1;\\n\\t\\t\\n\\t\\twhile(begin <= end){\\n\\t\\t\\tint mid = (begin + end) / 2;\\n\\t\\t\\tint mid_value = matrix[mid/col_num][mid%col_num];\\n\\t\\t\\t\\n\\t\\t\\tif( mid_value == target){\\n\\t\\t\\t\\treturn true;\\n\\t\\t\\t\\n\\t\\t\\t}else if(mid_value < target){\\n\\t\\t\\t\\t//Should move a bit further, otherwise dead loop.\\n\\t\\t\\t\\tbegin = mid+1;\\n\\t\\t\\t}else{\\n\\t\\t\\t\\tend = mid-1;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn false;\\n\\t}"
		},
		{
			"lc_ans_id":"26292",
			"view":"8393",
			"top":"2",
			"title":"Java clear solution",
			"vote":"19",
			"content":"  The basic idea is from right corner, if the current number greater than target col - 1 in same row, else if the current number less than target, row + 1 in same column, finally if they are same, we find it, and return return.\\n\\n      public boolean searchMatrix(int[][] matrix, int target) {\\n                int i = 0, j = matrix[0].length - 1;\\n                while (i < matrix.length && j >= 0) {\\n                        if (matrix[i][j] == target) {\\n                            return true;\\n                        } else if (matrix[i][j] > target) {\\n                            j--;\\n                        } else {\\n                            i++;\\n                        }\\n                    }\\n                \\n                return false;\\n            }"
		},
		{
			"lc_ans_id":"26201",
			"view":"4843",
			"top":"3",
			"title":"A Python binary search solution - O(logn)",
			"vote":"16",
			"content":"It is basically an advanced version of the binary search\\n\\n    class Solution:\\n        # @param matrix, a list of lists of integers\\n        # @param target, an integer\\n        # @return a boolean\\n        # 8:21\\n        def searchMatrix(self, matrix, target):\\n            if not matrix or target is None:\\n                return False\\n    \\n            rows, cols = len(matrix), len(matrix[0])\\n            low, high = 0, rows * cols - 1\\n            \\n            while low <= high:\\n                mid = (low + high) / 2\\n                num = matrix[mid / cols][mid % cols]\\n    \\n                if num == target:\\n                    return True\\n                elif num < target:\\n                    low = mid + 1\\n                else:\\n                    high = mid - 1\\n            \\n            return False"
		},
		{
			"lc_ans_id":"26226",
			"view":"4245",
			"top":"4",
			"title":"C++ 12ms, O(log(mn)), no library functions, treat matrix as an array",
			"vote":"12",
			"content":"    bool searchMatrix(vector<vector<int>>& matrix, int target) {\\n        // treat the matrix as an array, just taking care of indices\\n        // [0..n*m]\\n        // (row, col) -> row*n + col\\n        // i -> [i/n][i%n]\\n        if(matrix.empty() || matrix[0].empty())\\n        {\\n            return false;\\n        }\\n        int m = matrix.size(), n = matrix[0].size();\\n        int start = 0, end = m*n - 1;\\n        while(start <= end)\\n        {\\n            int mid = start + (end - start)/2;\\n            int e = matrix[mid/n][mid%n];\\n            if(target < e)\\n            {\\n                end = mid - 1;\\n            }\\n            else if(target > e)\\n            {\\n                start = mid + 1;\\n            }\\n            else\\n            {\\n                return true;\\n            }\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"26204",
			"view":"3175",
			"top":"5",
			"title":"Share my two O(logm + logn) solutions",
			"vote":"9",
			"content":" Solution1:\\n\\nTreat the matrix as a sorted list, and use  binary search.\\n\\n    class Solution {\\n    public:\\n        bool searchMatrix(vector<vector<int> > &matrix, int target)\\n        {\\n            if(matrix.empty())  return false;\\n            \\n        \\tint height = matrix.size();\\n        \\tint width = matrix[0].size();\\n        \\n        \\tif(matrix[0][0] > target || matrix[height-1][width-1] < target)\\treturn false;\\t\\n        \\n        \\tint head = 0,tail = height*width-1;\\n        \\tint mid,midRow,midCol;\\n    \\n        \\twhile(head <= tail)\\n        \\t{\\n        \\t\\tmid = (head+tail)/2;\\n        \\t\\tmidCol = mid%width;\\n        \\t    midRow = mid/width;\\n        \\t\\tif(matrix[midRow][midCol] < target)\\n        \\t\\t\\thead = mid+1;\\n        \\t\\telse if(matrix[midRow][midCol] > target)\\n        \\t\\t\\ttail = mid-1;\\n        \\t\\telse\\n        \\t\\t\\treturn true;\\n        \\t}\\n        \\treturn false;\\n        }\\n    };\\n\\nSolution2:\\n\\nUse binary search for matrix[i][0] to find the row where target is in, and then use  binary search for matrix[row][j] to find target. This solution is better because it avoids multiplication overflow(height*width) and / and % while it's complexity is the  same as solution1.\\n\\n    class Solution {\\n    public:\\n        bool searchMatrix(vector<vector<int> > &matrix,int target)\\n        {\\n            if(matrix.empty())  return false;\\n            \\n        \\tint heigth = matrix.size();\\n        \\tint width = matrix[0].size();\\n        \\t\\n        \\tif(matrix[0][0] > target || matrix[heigth-1][width-1] < target)\\t\\treturn false;\\n        \\n        \\tint head = 0;\\n        \\tint tail = heigth-1;\\n        \\tint mid;\\n        \\twhile(head != tail && matrix[tail][0] > target)\\n        \\t{\\n        \\t\\tmid = (head+tail+1)/2;\\n        \\t\\tif(matrix[mid][0] < target)\\t\\thead = mid;\\n        \\t\\telse if(matrix[mid][0] > target)\\ttail = mid-1;\\t\\n        \\t\\telse \\treturn true;\\n        \\t}\\n        \\tint row = tail;\\n        \\thead = 0,tail = width-1;\\n        \\twhile(head <= tail)\\n        \\t{\\n        \\t\\tmid = (head+tail)/2;\\n        \\t\\tif(matrix[row][mid] < target)\\n        \\t\\t\\thead = mid + 1;\\n        \\t\\telse if(matrix[row][mid] > target)\\n        \\t\\t\\ttail = mid -1;\\n        \\t\\telse return true;\\n        \\t}\\n        \\treturn false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"26350",
			"view":"1161",
			"top":"6",
			"title":"C++ 12ms Solution using Binary Search [O(log(m) + log(n))]",
			"vote":"8",
			"content":"    class Solution {\\n    public:\\n        bool searchMatrix(vector<vector<int>>& matrix, int target) {\\n            int m = matrix.size(), n = matrix[0].size(), x, y;\\n            int lo = 0, hi = m*n-1, mid;\\n            if (hi == 0) return (matrix[0][0] == target);\\n            while (lo <= hi)\\n            {\\n                mid = lo + (hi-lo)/2;\\n                x = mid / n; y = mid % n;\\n                if (matrix[x][y] == target)\\n                    return true;\\n                else if (matrix[x][y] > target)\\n                    hi = mid-1;\\n                else\\n                    lo = mid+1;\\n            }\\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"26215",
			"view":"1075",
			"top":"7",
			"title":"An Easy Solution in Java",
			"vote":"7",
			"content":"    public boolean searchMatrix(int[][] matrix, int target) {\\n        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {\\n            return false;\\n        }\\n        int row = 0;\\n        int col = matrix[0].length - 1;\\n        while (row < matrix.length && col >= 0) {\\n            if (matrix[row][col] == target) {\\n                return true;\\n            } else if (matrix[row][col] < target) {\\n                row++;\\n            } else {\\n                col--;\\n            }\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"26430",
			"view":"1961",
			"top":"8",
			"title":"Share my O(n + m) solution",
			"vote":"6",
			"content":"  \\n\\n      Solution {  public:\\n        bool searchMatrix(vector<vector<int> > &matrix, int target) {\\n            int n = (int)matrix.size();\\n            int m = (int)matrix[0].size();\\n            --n; --m;\\n            while(n > 0 && matrix[n - 1][m] >= target) --n;\\n            while(m > 0 && matrix[n][m - 1] >= target) --m;\\n            return (matrix[n][m] == target);\\n        }\\n    };\\nI just used that fact, that number in the matrix increases"
		},
		{
			"lc_ans_id":"26248",
			"view":"1715",
			"top":"9",
			"title":"6-12 lines, O(log(m) + log(n)), myself+library",
			"vote":"5",
			"content":"I have two solutions, one without and one with using the library. Both have runtime O(log(m) + log(n)), or in other words, O(log(mn)).\\n\\n---\\n**Solution 1: *One Binary Search*** (48 ms, 12 lines)\\n\\nHere I treat the matrix like a single big list of length m*n and use a simple binary search. I only have to convert the list indexes to matrix indexes on the fly.\\n\\n    def searchMatrix(self, matrix, target):\\n        n = len(matrix[0])\\n        lo, hi = 0, len(matrix) * n\\n        while lo < hi:\\n            mid = (lo + hi) / 2\\n            x = matrix[mid/n][mid%n]\\n            if x < target:\\n                lo = mid + 1\\n            elif x > target:\\n                hi = mid\\n            else:\\n                return True\\n        return False\\n\\n---\\n**Solution 2: *Using the library*** (48 ms, 6 lines)\\n\\nIf there were a library function doing the 2D search, it would be boring, but there isn't. So it's still a little challenge to figure out how to use the 1D functions that *are* there. Here I use `bisect` to (approximately) find the candidate row and then `bisect_left` to find the candidate cell in that row.\\n\\n    def searchMatrix(self, matrix, target):\\n        i = bisect.bisect(matrix, [target])\\n        if i < len(matrix) and matrix[i][0] == target:\\n            return True\\n        row = matrix[i-1]\\n        j = bisect.bisect_left(row, target)\\n        return j < len(row) and row[j] == target"
		}
	],
	"id":"74",
	"title":"Search a 2D Matrix",
	"content":"<p>Write an efficient algorithm that searches for a value in an <i>m</i> x <i>n</i> matrix. This matrix has the following properties:</p>\r\n\r\n<p>\r\n<ul>\r\n<li>Integers in each row are sorted from left to right.</li>\r\n<li>The first integer of each row is greater than the last integer of the previous row.</li>\r\n</ul>\r\n</p>\r\n\r\n<p>\r\nFor example,</p>\r\n<p>\r\nConsider the following matrix:\r\n</p>\r\n<pre>\r\n[\r\n  [1,   3,  5,  7],\r\n  [10, 11, 16, 20],\r\n  [23, 30, 34, 50]\r\n]\r\n</pre>\r\n\r\n<p>Given <b>target</b> = <code>3</code>, return <code>true</code>.</p>",
	"frequency":"335",
	"ac_num":"147479"
}