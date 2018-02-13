{
	"difficulty":"2",
	"submit_num":"254627",
	"show_id":"240",
	"leetcode_id":"240",
	"answers":[
		{
			"lc_ans_id":"66140",
			"view":"36700",
			"top":"0",
			"title":"My concise O(m+n) Java solution",
			"vote":"376",
			"content":"We start search the matrix from top right corner, initialize the current position to top right corner, if the target is greater than the value in current position, then the target can not be in entire row of current position because the row is sorted, if the target is less than the value in current position, then the target can not in the entire column because the column is sorted too. We can rule out one row or one column each time, so the time complexity is O(m+n).\\n\\n    public class Solution {\\n        public boolean searchMatrix(int[][] matrix, int target) {\\n            if(matrix == null || matrix.length < 1 || matrix[0].length <1) {\\n                return false;\\n            }\\n            int col = matrix[0].length-1;\\n            int row = 0;\\n            while(col >= 0 && row <= matrix.length-1) {\\n                if(target == matrix[row][col]) {\\n                    return true;\\n                } else if(target < matrix[row][col]) {\\n                    col--;\\n                } else if(target > matrix[row][col]) {\\n                    row++;\\n                }\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"66142",
			"view":"11762",
			"top":"1",
			"title":"C++ with O(m+n) complexity",
			"vote":"55",
			"content":"    bool searchMatrix(vector<vector<int>>& matrix, int target) {\\n        int m = matrix.size();\\n        if (m == 0) return false;\\n        int n = matrix[0].size();\\n\\n        int i = 0, j = n - 1;\\n        while (i < m && j >= 0) {\\n            if (matrix[i][j] == target)\\n                return true;\\n            else if (matrix[i][j] > target) {\\n                j--;\\n            } else \\n                i++;\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"66147",
			"view":"11414",
			"top":"2",
			"title":"*Java* an easy-to-understand divide and conquer method",
			"vote":"52",
			"content":"The coding seems to be much more complex than those smart methods such as [this one][1], but the idea behind is actually quite straightforward. `Unfortunately, it is not as fast as the smart ones.`\\n\\nFirst, we divide the matrix into four quarters as shown below:\\n\\n      zone 1      zone 2\\n    *  *  *  * | *  *  *  *\\n    *  *  *  * | *  *  *  *\\n    *  *  *  * | *  *  *  *\\n    *  *  *  * | *  *  *  *\\n    -----------------------\\n    *  *  *  * | *  *  *  *\\n    *  *  *  * | *  *  *  *\\n    *  *  *  * | *  *  *  *\\n    *  *  *  * | *  *  *  *\\n      zone 3      zone 4\\n\\nWe then compare the element in the center of the matrix with the target. There are three possibilities:\\n\\n\\n - center < target. In this case, we discard zone 1 because all elements in zone 1 are less than target.\\n\\n - center > target. In this case, we discard zone 4.\\n\\n - center == target. return true.\\n\\nFor time complexity, if the matrix is a square matrix of size `nxn`, then for the worst case, \\n\\n    T(nxn) = 3T(n/2 x n/2)\\n\\nwhich makes \\n  \\n    T(nxn) = O(n^log3)\\n\\nCode in Java:\\n\\n     public boolean searchMatrix(int[][] matrix, int target) {\\n        int m = matrix.length;\\n        if(m<1) return false;\\n        int n = matrix[0].length;\\n        \\n        return searchMatrix(matrix, new int[]{0,0}, new int[]{m-1, n-1}, target);\\n    }\\n    \\n    private boolean searchMatrix(int[][] matrix, int[] upperLeft, int[] lowerRight, int target) {\\n    \\tif(upperLeft[0]>lowerRight[0] || upperLeft[1]>lowerRight[1]\\n    \\t\\t\\t|| lowerRight[0]>=matrix.length || lowerRight[1]>=matrix[0].length) \\n    \\t\\treturn false;\\n    \\tif(lowerRight[0]-upperLeft[0]==0 && lowerRight[1]-upperLeft[1]==0)\\n    \\t\\treturn matrix[upperLeft[0]][upperLeft[1]] == target;\\n    \\tint rowMid = (upperLeft[0] + lowerRight[0]) >> 1;\\n    \\tint colMid = (upperLeft[1] + lowerRight[1]) >> 1;\\n    \\tint diff = matrix[rowMid][colMid] - target;\\n    \\tif(diff > 0) {\\n    \\t\\treturn searchMatrix(matrix, upperLeft, new int[]{rowMid, colMid}, target)\\n    \\t\\t\\t\\t|| searchMatrix(matrix, new int[]{upperLeft[0],colMid+1}, new int[]{rowMid, lowerRight[1]}, target)\\n    \\t\\t\\t\\t|| searchMatrix(matrix, new int[]{rowMid+1,upperLeft[1]}, new int[]{lowerRight[0], colMid}, target);\\n    \\t}\\n    \\telse if(diff < 0) {\\n     \\t\\treturn searchMatrix(matrix, new int[]{upperLeft[0], colMid+1}, new int[]{rowMid, lowerRight[1]}, target)\\n    \\t\\t\\t\\t|| searchMatrix(matrix, new int[]{rowMid+1, upperLeft[1]}, new int[]{lowerRight[0], colMid}, target)\\n    \\t\\t\\t\\t|| searchMatrix(matrix, new int[]{rowMid+1, colMid+1}, lowerRight, target);\\n    \\t}\\n    \\telse return true;\\n    }\\n\\n\\n  [1]: https://leetcode.com/discuss/48852/my-concise-o-m-n-java-solution"
		},
		{
			"lc_ans_id":"66247",
			"view":"4931",
			"top":"3",
			"title":"Java short code, O(m+n)",
			"vote":"34",
			"content":"    public class Solution {\\n    public boolean searchMatrix(int[][] matrix, int target) {\\n        int m=matrix.length, n=matrix[0].length, i=0, j=n-1;\\n        while (i<m && j>=0) {\\n            if (matrix[i][j]==target) return true;\\n            else if (matrix[i][j]<target) i++;\\n            else j--;\\n        }\\n        return false;\\n    }\\n}"
		},
		{
			"lc_ans_id":"66163",
			"view":"7783",
			"top":"4",
			"title":"C++ two solutions (O(m+n), O(mlogn))",
			"vote":"32",
			"content":"1. O(m+n) solution\\n\\n        bool searchMatrix(vector<vector<int>>& matrix, int target) {\\n        int i = 0;\\n        int j = matrix[0].size() - 1;\\n        \\n        while(i < matrix.size() && j >= 0) {\\n            if(matrix[i][j] == target)\\n                return true;\\n            \\n            if(matrix[i][j] < target)\\n                i++;\\n            else\\n                j--;\\n        }\\n        \\n        return false;\\n        }\\n\\n\\n\\n\\n2. O(mlogn) solution\\n\\n        bool searchMatrix(vector<vector<int>>& matrix, int target) {\\n\\t\\treturn searchMatrix(matrix, target, 0, matrix.size() - 1);\\n\\t    }\\n\\n\\t    bool searchMatrix(vector<vector<int>>& matrix, int target, int top, int bottom) {\\n\\t\\tif (top > bottom)\\n\\t\\t\\treturn false;\\n\\n\\t\\tint mid = top + (bottom - top) / 2;\\n\\t\\tif (matrix[mid].front() <= target && target <= matrix[mid].back())\\n\\t\\t\\tif (searchVector(matrix[mid], target)) return true;\\n\\n\\t\\tif (searchMatrix(matrix, target, top, mid - 1)) return true;\\n\\t\\tif (searchMatrix(matrix, target, mid + 1, bottom)) return true;\\n\\n\\t\\treturn false;\\n\\t    }\\n\\n\\t    bool searchVector(vector<int>& v, int target) {\\n\\t\\tint left = 0, right = v.size() - 1;\\n\\n\\t\\twhile (left <= right) {\\n\\t\\t\\tint mid = left + (right - left) / 2;\\n\\t\\t\\tif (v[mid] == target)\\n\\t\\t\\t\\treturn true;\\n\\t\\t\\tif (v[mid] < target)\\n\\t\\t\\t\\tleft = mid + 1;\\n\\t\\t\\telse\\n\\t\\t\\t\\tright = mid - 1;\\n\\t\\t}\\n\\n\\t\\treturn false;\\n\\t    }"
		},
		{
			"lc_ans_id":"66139",
			"view":"4252",
			"top":"5",
			"title":"6-9 lines C++/Python Solutions with Explanations",
			"vote":"29",
			"content":"Well, the idea is to search from the **top-right** element and then reduce the range for further searching by comparisons between `target` and the current element.\\n \\nLet's take the matrix in the problem statement as an example.\\n\\n    [\\n      [1,   4,  7, 11, 15],\\n      [2,   5,  8, 12, 19], \\n      [3,   6,  9, 16, 22],\\n      [10, 13, 14, 17, 24],\\n      [18, 21, 23, 26, 30]\\n    ] \\n\\nSuppose we want to search for `12`. We first initialize `r = 0` and `c = 4`. We compare `12` with `matrix[r][c] = matrix[0][4] = 15` and `12 < 15`, so `12` cannot appear in the column of `15` since all elements below `15` are not less than `15`. Thus, we decrease `c` by `1` and reduce the search range by a column. Now we compare `12` with `matrix[r][c] = matrix[0][3] = 11` and `12 > 11`, so `12` cannot appear in the row of `11` since all elements left to `11` are not greater than `11`. Thus, we increase `r` by `1` and reduce the search range by a row. Then we reach `matrix[1][3] = 12 = target` and we are done (return `true`). If we have moved beyond the matrix and have not found the `target`, return `false`. \\n\\nPutting these together, we will have the following short codes.\\n\\n----------\\n**C++**\\n\\n    class Solution {\\n    public:\\n        bool searchMatrix(vector<vector<int>>& matrix, int target) {\\n            int m = matrix.size(), n = matrix[0].size(), r = 0, c = n - 1;\\n            while (r < m && c >= 0) {\\n                if (matrix[r][c] == target) return true;\\n                if (matrix[r][c] > target) c--;\\n                else r++;\\n            }\\n            return false;\\n        } \\n    };\\n\\n----------\\n**Python**\\n\\n    class Solution:\\n        # @param {integer[][]} matrix\\n        # @param {integer} target\\n        # @return {boolean}\\n        def searchMatrix(self, matrix, target):\\n            m, n, r, c = len(matrix), len(matrix[0]), 0, n - 1\\n            while r < m and c >= 0:\\n                if matrix[r][c] == target:\\n                    return True\\n                if matrix[r][c] > target:\\n                    c -= 1\\n                else: \\n                    r += 1\\n            return False"
		},
		{
			"lc_ans_id":"66160",
			"view":"3437",
			"top":"6",
			"title":"AC clean Java solution",
			"vote":"28",
			"content":"If we stand on the top-right corner of the matrix and look diagonally, it's kind of like a BST, we can go through this matrix to find the target like how we traverse the BST.\\n\\n    public boolean searchMatrix(int[][] matrix, int target) {\\n        if (matrix == null || matrix.length == 0 || matrix[0].length == 0)\\n            return false;\\n\\n        int n = matrix.length, m = matrix[0].length;\\n        int i = 0, j = m - 1;\\n        \\n        while (i < n && j >= 0) {\\n            int num = matrix[i][j];\\n            \\n            if (num == target)\\n                return true;\\n            else if (num > target)\\n                j--;\\n            else\\n                i++;\\n        }\\n        \\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"66207",
			"view":"2980",
			"top":"7",
			"title":"My C++ soluation using Binary search Tree model beats 100%~~~~",
			"vote":"20",
			"content":"at first i use binary search method, but i found it's hard to pruning Redundant situation,and i just found we can treat the left bottom as a root of a BST so we only need o(m+N) to find the target.\\n\\n    class Solution {\\n    public:\\n        bool searchMatrix(vector<vector<int>>& matrix, int target) {\\n            int row = matrix.size();\\n            int col = matrix[0].size();\\n            int i = row-1,j =0;\\n            while(i>=0&&j<=col-1)\\n            {\\n                if(target>matrix[i][j])\\n                {\\n                    j++;\\n                }\\n                else if(target<matrix[i][j])\\n                {\\n                    i--;\\n                }\\n                else\\n                {\\n                    return true;\\n                }\\n            }\\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"66277",
			"view":"2267",
			"top":"8",
			"title":"So clear solve for c++",
			"vote":"16",
			"content":"    class Solution {\\n    public:\\n        bool searchMatrix(vector<vector<int>>& matrix, int target) {\\n            if(matrix.size() == 0)return false;\\n            return searchMatrix(matrix, 0, matrix[0].size() - 1, target);\\n        }\\n        bool searchMatrix(vector<vector<int>>& matrix, int x, int y, int target) {\\n            if(x >= matrix.size() || y < 0)return false;\\n            if(matrix[x][y] == target)return true;\\n            else if(matrix[x][y] < target) return searchMatrix(matrix, x + 1, y, target);\\n            else if(matrix[x][y] > target) return searchMatrix(matrix, x, y - 1, target);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"66168",
			"view":"2499",
			"top":"9",
			"title":"4 lines C, 6 lines Ruby, 7 lines Python, 1-liners",
			"vote":"14",
			"content":"Same O(m+n) method as most, just a bit different style/languages.\\n\\n---\\n\\n**C**\\n\\nCheck the top-right corner. If it's not the target, then remove the top row or rightmost column.\\n\\n    bool searchMatrix(int** A, int m, int n, int target) {\\n        int x = ~target;\\n        while (m && n && (x = A[0][n-1]) != target)\\n            x < target ? A++, m-- : n--;\\n        return x == target;\\n    }\\n\\n**Ruby**\\n\\n    def search_matrix(matrix, target)\\n        j = -1\\n        matrix.each { |row|\\n            j -= 1 while row[j] && row[j] > target\\n            return true if row[j] == target\\n        }\\n        false\\n    end\\n\\n**Python**\\n\\n    def searchMatrix(self, matrix, target):\\n        j = -1\\n        for row in matrix:\\n            while j + len(row) and row[j] > target:\\n                j -= 1\\n            if row[j] == target:\\n                return True\\n        return False\\n\\n**1-liners**\\n\\nRelax, I know they're O(mn). This is just for fun (although they did get accepted):\\n\\nPython (204 ms):\\n\\n    def searchMatrix(self, matrix, target):\\n        return any(target in row for row in matrix)\\n\\nRuby (828 ms):\\n\\n    def search_matrix(matrix, target)\\n        matrix.any? { |row| row.include? target }\\n    end"
		}
	],
	"id":"240",
	"title":"Search a 2D Matrix II",
	"content":"<p>Write an efficient algorithm that searches for a value in an <i>m</i> x <i>n</i> matrix. This matrix has the following properties:</p>\r\n\r\n<p>\r\n<ul>\r\n<li>Integers in each row are sorted in ascending from left to right.</li>\r\n<li>Integers in each column are sorted in ascending from top to bottom.</li>\r\n</ul>\r\n</p>\r\n\r\n<p>\r\nFor example,</p>\r\n<p>\r\nConsider the following matrix:\r\n</p>\r\n<pre>\r\n[\r\n  [1,   4,  7, 11, 15],\r\n  [2,   5,  8, 12, 19],\r\n  [3,   6,  9, 16, 22],\r\n  [10, 13, 14, 17, 24],\r\n  [18, 21, 23, 26, 30]\r\n]\r\n</pre>\r\n\r\n<p>Given <b>target</b> = <code>5</code>, return <code>true</code>.</p>\r\n<p>Given <b>target</b> = <code>20</code>, return <code>false</code>.</p>",
	"frequency":"456",
	"ac_num":"99488"
}