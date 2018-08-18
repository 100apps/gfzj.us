{
	"difficulty":"2",
	"submit_num":"357171",
	"show_id":"48",
	"leetcode_id":"48",
	"answers":[
		{
			"lc_ans_id":"18872",
			"view":"52196",
			"top":"0",
			"title":"A common method to rotate the image",
			"vote":"538",
			"content":"here give a common method to solve the image rotation problems.\\n    \\n    /*\\n     * clockwise rotate\\n     * first reverse up to down, then swap the symmetry \\n     * 1 2 3     7 8 9     7 4 1\\n     * 4 5 6  => 4 5 6  => 8 5 2\\n     * 7 8 9     1 2 3     9 6 3\\n    */\\n    void rotate(vector<vector<int> > &matrix) {\\n        reverse(matrix.begin(), matrix.end());\\n        for (int i = 0; i < matrix.size(); ++i) {\\n            for (int j = i + 1; j < matrix[i].size(); ++j)\\n                swap(matrix[i][j], matrix[j][i]);\\n        }\\n    }\\n    \\n    /*\\n     * anticlockwise rotate\\n     * first reverse left to right, then swap the symmetry\\n     * 1 2 3     3 2 1     3 6 9\\n     * 4 5 6  => 6 5 4  => 2 5 8\\n     * 7 8 9     9 8 7     1 4 7\\n    */\\n    void anti_rotate(vector<vector<int> > &matrix) {\\n        for (auto vi : matrix) reverse(vi.begin(), vi.end());\\n        for (int i = 0; i < matrix.size(); ++i) {\\n            for (int j = i + 1; j < matrix[i].size(); ++j)\\n                swap(matrix[i][j], matrix[j][i]);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"18879",
			"view":"28109",
			"top":"1",
			"title":"AC Java in place solution with explanation Easy to understand.",
			"vote":"147",
			"content":"The idea was firstly transpose the matrix and then flip it symmetrically. For instance, \\n\\n    1  2  3             \\n    4  5  6\\n    7  8  9\\n\\nafter transpose, it will be swap(matrix[i][j], matrix[j][i])\\n\\n    1  4  7\\n    2  5  8\\n    3  6  9\\n\\nThen flip the matrix horizontally.  (swap(matrix[i][j], matrix[i][matrix.length-1-j])\\n\\n    7  4  1\\n    8  5  2\\n    9  6  3\\n\\nHope this helps.\\n\\n    public class Solution {\\n        public void rotate(int[][] matrix) {\\n            for(int i = 0; i<matrix.length; i++){\\n                for(int j = i; j<matrix[0].length; j++){\\n                    int temp = 0;\\n                    temp = matrix[i][j];\\n                    matrix[i][j] = matrix[j][i];\\n                    matrix[j][i] = temp;\\n                }\\n            }\\n            for(int i =0 ; i<matrix.length; i++){\\n                for(int j = 0; j<matrix.length/2; j++){\\n                    int temp = 0;\\n                    temp = matrix[i][j];\\n                    matrix[i][j] = matrix[i][matrix.length-1-j];\\n                    matrix[i][matrix.length-1-j] = temp;\\n                }\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"18884",
			"view":"17006",
			"top":"2",
			"title":"Seven Short Solutions (1 to 7 lines)",
			"vote":"113",
			"content":"While these solutions are Python, I think they're understandable/interesting for non-Python coders as well. But before I begin: No mathematician would call a matrix `matrix`, so I'll use the usual `A`. Also, btw, the 40 ms reached by two of the solutions is I think the fastest achieved by Python solutions so far.\\n\\n---\\n\\n**Most Pythonic - `[::-1]` and `zip`** - 44 ms\\n\\nThe most pythonic solution is a simple one-liner using `[::-1]` to flip the matrix upside down and then `zip` to transpose it. It assigns the result back into `A`, so it's \"in-place\" in a sense and the OJ accepts it as such, though some people might not.\\n\\n    class Solution:\\n        def rotate(self, A):\\n            A[:] = zip(*A[::-1])\\n\\n---\\n\\n**Most Direct** - 52 ms\\n\\nA 100% in-place solution. It even reads and writes each matrix element only once and doesn't even use an extra temporary variable to hold them. It walks over the *\"top-left quadrant\"* of the matrix and directly rotates each element with the three corresponding elements in the other three quadrants. Note that I'm moving the four elements in parallel and that `[~i]` is way nicer than `[n-1-i]`.\\n\\n    class Solution:\\n        def rotate(self, A):\\n            n = len(A)\\n            for i in range(n/2):\\n                for j in range(n-n/2):\\n                    A[i][j], A[~j][i], A[~i][~j], A[j][~i] = \\\\\\n                             A[~j][i], A[~i][~j], A[j][~i], A[i][j]\\n\\n---\\n\\n**Clean Most Pythonic** - 56 ms\\n\\nWhile the OJ accepts the above solution, the the result rows are actually tuples, not lists, so it's a bit dirty. To fix this, we can just apply `list` to every row:\\n\\n    class Solution:\\n        def rotate(self, A):\\n            A[:] = map(list, zip(*A[::-1]))\\n\\n---\\n\\n**List Comprehension** - 60 ms\\n\\nIf you don't like `zip`, you can use a nested list comprehension instead:\\n\\n    class Solution:\\n        def rotate(self, A):\\n            A[:] = [[row[i] for row in A[::-1]] for i in range(len(A))]\\n\\n---\\n\\n**Almost as Direct** - 40 ms\\n\\nIf you don't like the little repetitive code of the above \"Most Direct\" solution, we can instead do each four-cycle of elements by using three swaps of just two elements.\\n\\n    class Solution:\\n        def rotate(self, A):\\n            n = len(A)\\n            for i in range(n/2):\\n                for j in range(n-n/2):\\n                    for _ in '123':\\n                        A[i][j], A[~j][i], i, j = A[~j][i], A[i][j], ~j, ~i\\n                    i = ~j\\n\\n---\\n\\n**Flip Flip** - 40 ms\\n\\nBasically the same as the first solution, but using `reverse` instead of `[::-1]` and transposing the matrix with loops instead of `zip`. It's 100% in-place, just instead of only moving elements around, it also moves the rows around.\\n\\n    class Solution:\\n        def rotate(self, A):\\n            A.reverse()\\n            for i in range(len(A)):\\n                for j in range(i):\\n                    A[i][j], A[j][i] = A[j][i], A[i][j]\\n\\n---\\n\\n**Flip Flip, all by myself** - 48 ms\\n\\nSimilar again, but I first transpose and then flip left-right instead of upside-down, and do it all by myself in loops. This one is 100% in-place again in the sense of just moving the elements.\\n\\n    class Solution:\\n        def rotate(self, A):\\n            n = len(A)\\n            for i in range(n):\\n                for j in range(i):\\n                    A[i][j], A[j][i] = A[j][i], A[i][j]\\n            for row in A:\\n                for j in range(n/2):\\n                    row[j], row[~j] = row[~j], row[j]"
		},
		{
			"lc_ans_id":"19002",
			"view":"8876",
			"top":"3",
			"title":"4ms few lines C++ code Rotate Image 90 degree for O(1) space",
			"vote":"44",
			"content":"    void rotate(vector<vector<int>>& matrix) {\\n            int n = matrix.size();\\n            int a = 0;\\n            int b = n-1;\\n            while(a<b){\\n                for(int i=0;i<(b-a);++i){\\n                    swap(matrix[a][a+i], matrix[a+i][b]);\\n                    swap(matrix[a][a+i], matrix[b][b-i]);\\n                    swap(matrix[a][a+i], matrix[b-i][a]);\\n                }\\n                ++a;\\n                --b;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"19123",
			"view":"5953",
			"top":"4",
			"title":"6 lines of code and with O(1) space in c++",
			"vote":"33",
			"content":"First we transpose the matrix and then reverse every row:\\n \\n   \\n    void rotate(vector<vector<int>>& m) {\\n            int n = m.size();\\n            \\n            for(int i=0; i<n; i++)\\n                for(int j=0; j<i; j++)\\n                    swap(m[i][j], m[j][i]);\\n            \\n            for(int i=0; i<n; i++)\\n                reverse(m[i].begin(), m[i].end());\\n        }"
		},
		{
			"lc_ans_id":"18895",
			"view":"3871",
			"top":"5",
			"title":"Clear Java solution",
			"vote":"32",
			"content":"    public class Solution {\\n    public void rotate(int[][] matrix) {\\n        int n=matrix.length;\\n        for (int i=0; i<n/2; i++) \\n            for (int j=i; j<n-i-1; j++) {\\n                int tmp=matrix[i][j];\\n                matrix[i][j]=matrix[n-j-1][i];\\n                matrix[n-j-1][i]=matrix[n-i-1][n-j-1];\\n                matrix[n-i-1][n-j-1]=matrix[j][n-i-1];\\n                matrix[j][n-i-1]=tmp;\\n            }\\n        }\\n}"
		},
		{
			"lc_ans_id":"18888",
			"view":"1780",
			"top":"6",
			"title":"1 line in Python",
			"vote":"12",
			"content":"    class Solution(object):\\n        def rotate(self, matrix):\\n            \"\"\"\\n            :type matrix: List[List[int]]\\n            :rtype: void Do not return anything, modify matrix in-place instead.\\n            \"\"\"\\n            matrix[::] = zip(*matrix[::-1])"
		},
		{
			"lc_ans_id":"19098",
			"view":"1614",
			"top":"7",
			"title":"A Simple and In-Place Solution in Java",
			"vote":"11",
			"content":"    public void rotate(int[][] matrix) {\\n        if (matrix == null || matrix.length <= 1) {\\n            return;\\n        }\\n        int n = matrix.length;\\n        for (int i = 0; i < n; i++) {\\n            for (int j = i; j < n; j++) {\\n                int temp = matrix[i][j];\\n                matrix[i][j] = matrix[j][i];\\n                matrix[j][i] = temp;\\n            }\\n        }\\n        for (int i = 0; i < n; i++) {\\n            int head = 0;\\n            int tail = n - 1;\\n            while (head < tail) {\\n                int temp = matrix[i][head];\\n                matrix[i][head] = matrix[i][tail];\\n                matrix[i][tail] = temp;\\n                head++;\\n                tail--;\\n            }\\n        }\\n    }\\nFor example, if the matrix is:<br>\\n1 2 3<br>\\n4 5 6<br>\\n7 8 9<br>\\nthen after the first for loop, it becomes: <br>\\n1 4 7<br>\\n2 5 8<br>\\n3 6 9<br>\\nthen after the second for loop, it becomes: <br>\\n7 4 1<br>\\n8 5 2<br>\\n9 6 3<br>"
		},
		{
			"lc_ans_id":"19148",
			"view":"1450",
			"top":"8",
			"title":"C 2ms solution, O(1) extra space",
			"vote":"11",
			"content":"    void rotate(int **matrix, int n) {\\n        for (int i=0; i<n/2; ++i)\\n        {\\n            for (int j=i; j<n-1-i; ++j)\\n            {\\n                int z = matrix[i][j];\\n                matrix[i][j] = matrix[n-j-1][i];\\n                matrix[n-j-1][i] = matrix[n-i-1][n-j-1];\\n                matrix[n-i-1][n-j-1] = matrix[j][n-i-1];\\n                matrix[j][n-i-1] = z;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"19168",
			"view":"1955",
			"top":"9",
			"title":"Share my inplace solution",
			"vote":"11",
			"content":"        class Solution {\\n    public:\\n        //fold for the middle, fold for the diagnal\\n        void rotate(vector<vector<int> > &matrix) {\\n            //find middle\\n            int mid = matrix.size()/2;\\n            int n = matrix.size();\\n            //swap, i swap with matrix.size()-1-i\\n            for(int i = 0; i < mid; i++){\\n                for(int j = 0; j < n; j++){\\n                    swap(matrix[i][j], matrix[n-1-i][j]);\\n                }\\n            }\\n            //swap, i,j swap with j,i\\n            for(int i = 0; i < n; i++){\\n                for(int j = i; j < n; j++){\\n                    swap(matrix[i][j], matrix[j][i]);\\n                }\\n            }\\n        }\\n    };\\n\\nFold matrix once to the middle line. Fold matrix one more time along the diagonal line."
		}
	],
	"id":"48",
	"title":"Rotate Image",
	"content":"<p>You are given an <i>n</i> x <i>n</i> 2D matrix representing an image.</p>\r\n\r\n<p>Rotate the image by 90 degrees (clockwise).</p>\r\n\r\n<p><b>Note:</b><br />\r\nYou have to rotate the image <b>in-place</b>, which means you have to modify the input 2D matrix directly. <b>DO NOT</b> allocate another 2D matrix and do the rotation.\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\nGiven <b>input matrix</b> = \r\n[\r\n  [1,2,3],\r\n  [4,5,6],\r\n  [7,8,9]\r\n],\r\n\r\nrotate the input matrix <b>in-place</b> such that it becomes:\r\n[\r\n  [7,4,1],\r\n  [8,5,2],\r\n  [9,6,3]\r\n]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\nGiven <b>input matrix</b> =\r\n[\r\n  [ 5, 1, 9,11],\r\n  [ 2, 4, 8,10],\r\n  [13, 3, 6, 7],\r\n  [15,14,12,16]\r\n], \r\n\r\nrotate the input matrix <b>in-place</b> such that it becomes:\r\n[\r\n  [15,13, 2, 5],\r\n  [14, 3, 4, 1],\r\n  [12, 6, 8, 9],\r\n  [16, 7,10,11]\r\n]\r\n</pre>\r\n</p>",
	"frequency":"537",
	"ac_num":"145789"
}