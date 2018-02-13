{
	"difficulty":"1",
	"submit_num":"35456",
	"show_id":"598",
	"leetcode_id":"598",
	"answers":[
		{
			"lc_ans_id":"103595",
			"view":"5470",
			"top":"0",
			"title":"Java Solution, find Min",
			"vote":"14",
			"content":"```\\npublic class Solution {\\n    public int maxCount(int m, int n, int[][] ops) {\\n        if (ops == null || ops.length == 0) {\\n            return m * n;\\n        }\\n        \\n        int row = Integer.MAX_VALUE, col = Integer.MAX_VALUE;\\n        for(int[] op : ops) {\\n            row = Math.min(row, op[0]);\\n            col = Math.min(col, op[1]);\\n        }\\n        \\n        return row * col;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103610",
			"view":"1753",
			"top":"1",
			"title":"Python solution , beat 100%",
			"vote":"6",
			"content":"An operation [a,b] add by one for all 0 <= i < a and 0 <= j < b.\\nSo the number of maximum integers in the matrix after performing all the operations or the integers in matrix that get added by 1 by all operations are the integers that in *0 <=i<min_a* and *0<=i<min_b* or **min_a * min_b**\\n```class Solution(object):\\n    def maxCount(self, m, n, ops):\\n        \"\"\"\\n        :type m: int\\n        :type n: int\\n        :type ops: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        if not ops:\\n            return m*n\\n        return min(op[0] for op in ops)*min(op[1] for op in ops)"
		},
		{
			"lc_ans_id":"103633",
			"view":"1255",
			"top":"2",
			"title":"Java simple solution",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public int maxCount(int m, int n, int[][] ops) {\\n        int rowMin = m;\\n        int colMin = n;\\n        for (int[] pair : ops) {\\n            rowMin = Math.min(rowMin, pair[0]);\\n            colMin = Math.min(colMin, pair[1]);\\n        }\\n        return rowMin * colMin;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103612",
			"view":"1364",
			"top":"3",
			"title":"Python, Straightforward with Explanation",
			"vote":"3",
			"content":"Say the operations are ```[(x_1, y_1), (x_2, y_2), ..., (x_n, y_n)]```.  The top left square is clearly incremented by every operation.  If some square ```(x, y)``` has ```x >= x_i```, then it will not be marked by operation ```i```.  So all squares ```(x, y)``` with ```x >= min_i(x_i)``` do not get marked.  \\n\\nThus, when there is atleast one operation, all squares ```(x, y)``` with ```0 <= x < min(x_1, x_2, ..., x_n) and 0 <= y < min(y_1, y_2, ..., y_n)``` get marked; and there are ```min_i(x_i) * min_i(y_i)``` of them.  If there are no operations, then what is marked is the entire board.\\n\\n```\\ndef maxCount(self, R, C, ops):\\n    if not ops: return R * C\\n    X, Y = zip(*ops)\\n    return min(X) * min(Y)\\n```"
		},
		{
			"lc_ans_id":"103638",
			"view":"623",
			"top":"4",
			"title":"C++ short solution",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    int maxCount(int m, int n, vector<vector<int>>& ops) {\\n        for (int i = 0; i < ops.size(); ++i) {\\n            m = min(m, ops[i][0]);\\n            n = min(n, ops[i][1]);\\n        }\\n        return m*n;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103621",
			"view":"197",
			"top":"5",
			"title":"Java easy to understand",
			"vote":"1",
			"content":"this is my code:\\n```\\npublic class Solution {\\n    public int maxCount(int m, int n, int[][] ops) {\\n        for(int i=0;i<ops.length;i++){\\n            if(ops[i][0]<m) m=ops[i][0];\\n            if(ops[i][1]<n) n=ops[i][1];\\n        }\\n        return m*n;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103620",
			"view":"1774",
			"top":"6",
			"title":"[C++] [Java] Clean Code",
			"vote":"1",
			"content":"**C++**\\n```\\nclass Solution {\\npublic:\\n    int maxCount(int m, int n, vector<vector<int>>& ops) {\\n        for (auto op : ops) {\\n//          if (op[0] == 0 || op[1] == 0)  continue;\\n            m = min(op[0], m);\\n            n = min(op[1], n);\\n        }\\n        return m * n;\\n    }\\n};\\n```\\n\\n**Java**\\n```\\npublic class Solution {\\n    public int maxCount(int m, int n, int[][] ops) {\\n        for (int[] op : ops) {\\n            m = Math.min(op[0], m);\\n            n = Math.min(op[1], n);\\n        }\\n        return m * n;        \\n    }\\n}\\n```\\n\\nBecause there is no test case for operation contains 0. Without the sanity check it still pass. In fact the test implementation behind is not checking this and returns 0 for customized test case like:\\n```\\n3\\n3\\n[[2,2],[3,3], [3,0]]\\n```\\n\\n**Update**\\nThanks @sqfan pointing out this check is not needed:\\n```\\n//          if (op[0] == 0 || op[1] == 0)  continue;\\n```"
		},
		{
			"lc_ans_id":"103596",
			"view":"25",
			"top":"7",
			"title":"C++ 2-Liner O(N) Time O(1) Space",
			"vote":"0",
			"content":"```\\nclass Solution {\\npublic:\\n    int maxCount(int m, int n, vector<vector<int>>& ops) {\\n        for (auto op: ops) { m = min(m, op[0]); n = min(n, op[1]); }\\n        return m * n;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103597",
			"view":"26",
			"top":"8",
			"title":"My one line solution (Python)",
			"vote":"0",
			"content":"```\\nclass Solution:  \\n    def maxCount(self, m, n, ops):\\n        if(ops.append([m,n])==None): return min([op1[0] for op1 in ops])*min([op2[1] for op2 in ops])\\n```"
		},
		{
			"lc_ans_id":"103598",
			"view":"34",
			"top":"9",
			"title":"1 line methods in python",
			"vote":"0",
			"content":"method 1:\\n```\\n    def maxCount1(self, m, n, ops):\\n        \"\"\"\\n        :type m: int\\n        :type n: int\\n        :type ops: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        from operator import mul\\n        return mul(*map(min, zip(*ops))) if ops else m * n\\n```\\nmethod 2, I want to use numpy, but the server cannot work well, but works well on my own machine:\\n```\\n    def maxCount2(self, m, n, ops):\\n        \"\"\"\\n        :type m: int\\n        :type n: int\\n        :type ops: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        import numpy as np\\n        return np.prod(np.min(ops, axis=0)) if ops else m * n"
		}
	],
	"id":"577",
	"title":"Range Addition II",
	"content":"<p>Given an m * n matrix <b>M</b> initialized with all <b>0</b>'s and several update operations.</p>\r\n<p>Operations are represented by a 2D array, and each operation is represented by an array with two <b>positive</b> integers <b>a</b> and <b>b</b>, which means <b>M[i][j]</b> should be <b>added by one</b> for all <b>0 <= i < a</b> and <b>0 <= j < b</b>. </p>\r\n<p>You need to count and return the number of maximum integers in the matrix after performing all the operations.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nm = 3, n = 3\r\noperations = [[2,2],[3,3]]\r\n<b>Output:</b> 4\r\n<b>Explanation:</b> \r\nInitially, M = \r\n[[0, 0, 0],\r\n [0, 0, 0],\r\n [0, 0, 0]]\r\n\r\nAfter performing [2,2], M = \r\n[[1, 1, 0],\r\n [1, 1, 0],\r\n [0, 0, 0]]\r\n\r\nAfter performing [3,3], M = \r\n[[2, 2, 1],\r\n [2, 2, 1],\r\n [1, 1, 1]]\r\n\r\nSo the maximum integer in M is 2, and there are four of it in M. So return 4.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The range of m and n is [1,40000].</li>\r\n<li>The range of a is [1,m], and the range of b is [1,n].</li>\r\n<li>The range of operations size won't exceed 10,000.</li>\r\n</ol>\r\n</p>",
	"frequency":"190",
	"ac_num":"17135"
}