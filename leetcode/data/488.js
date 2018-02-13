{
	"difficulty":"2",
	"submit_num":"33447",
	"show_id":"498",
	"leetcode_id":"498",
	"answers":[
		{
			"lc_ans_id":"97712",
			"view":"11762",
			"top":"0",
			"title":"Concise Java Solution",
			"vote":"52",
			"content":"I don't think this is a hard problem. It is easy to figure out the walk pattern. Anyway...\\nWalk patterns:\\n- If out of ```bottom border``` (row >= m) then row = m - 1; col += 2; change walk direction.\\n- if out of ```right border``` (col >= n) then col = n - 1; row += 2; change walk direction.\\n- if out of ```top border``` (row < 0)  then row = 0; change walk direction.\\n- if out of ```left border``` (col < 0)  then col = 0; change walk direction.\\n- Otherwise, just go along with the current direction.\\n\\nTime complexity: O(m * n), m = number of rows, n = number of columns.\\nSpace complexity: O(1).\\n\\n```\\npublic class Solution {\\n    public int[] findDiagonalOrder(int[][] matrix) {\\n        if (matrix == null || matrix.length == 0) return new int[0];\\n        int m = matrix.length, n = matrix[0].length;\\n        \\n        int[] result = new int[m * n];\\n        int row = 0, col = 0, d = 0;\\n        int[][] dirs = {{-1, 1}, {1, -1}};\\n        \\n        for (int i = 0; i < m * n; i++) {\\n            result[i] = matrix[row][col];\\n            row += dirs[d][0];\\n            col += dirs[d][1];\\n            \\n            if (row >= m) { row = m - 1; col += 2; d = 1 - d;}\\n            if (col >= n) { col = n - 1; row += 2; d = 1 - d;}\\n            if (row < 0)  { row = 0; d = 1 - d;}\\n            if (col < 0)  { col = 0; d = 1 - d;}\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97711",
			"view":"3257",
			"top":"1",
			"title":"Java 15 lines without using boolean",
			"vote":"31",
			"content":"```\\n    public int[] findDiagonalOrder(int[][] matrix) {\\n        if (matrix.length == 0) return new int[0];\\n        int r = 0, c = 0, m = matrix.length, n = matrix[0].length, arr[] = new int[m * n];\\n        for (int i = 0; i < arr.length; i++) {\\n            arr[i] = matrix[r][c];\\n            if ((r + c) % 2 == 0) { // moving up\\n                if      (c == n - 1) { r++; }\\n                else if (r == 0)     { c++; }\\n                else            { r--; c++; }\\n            } else {                // moving down\\n                if      (r == m - 1) { c++; }\\n                else if (c == 0)     { r++; }\\n                else            { r++; c--; }\\n            }   \\n        }   \\n        return arr;\\n    }\\n```"
		},
		{
			"lc_ans_id":"97733",
			"view":"3335",
			"top":"2",
			"title":"C++ without paying too much attention on direction switch",
			"vote":"13",
			"content":"Put all diagonal sequences from top-right to bottom-left to an array and then combine all sequence together by reversing odd sequences.\\n\\n```\\nclass Solution {\\npublic:\\n    vector<int> findDiagonalOrder(vector<vector<int>>& matrix) {\\n        int m = matrix.size();\\n        if (m == 0) return vector<int>();\\n        int n = matrix[0].size();\\n        vector<vector<int>> tmp (m+n-1);\\n        for (int i = 0; i < m+n-1 ; i++) {\\n            int row = max(0, i-n+1);\\n            int col = min(i, n-1);\\n            for (; col >= 0 && row < m; row++, col--) {\\n                tmp[i].push_back(matrix[row][col]);\\n            }\\n        }\\n        vector<int> res;\\n        for (int i = 0; i< tmp.size(); i++) {\\n            if (i % 2) res.insert(res.end(), tmp[i].begin(), tmp[i].end());\\n            else res.insert(res.end(), tmp[i].rbegin(), tmp[i].rend());\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"97719",
			"view":"2427",
			"top":"3",
			"title":"sorting and normal Python",
			"vote":"10",
			"content":"**Solution 1**, annotate the matrix entries with coordinate information so that we can just sort them by that.\\n\\n    def findDiagonalOrder(self, matrix):\\n        entries = [(i+j, (j, i)[(i^j)&1], val)\\n                   for i, row in enumerate(matrix)\\n                   for j, val in enumerate(row)]\\n        return [e[2] for e in sorted(entries)]\\n\\nI just saw that @\\\\_aig_ does it very similarly, [but sorting coordinates](https://discuss.leetcode.com/topic/77889/3-line-python-solution). Not sure what I like better.\\n\\n**Solution 2**, just walk over the matrix in the desired order. My `d` is the diagonal number, i.e., `i+j`. So I can compute `j` as `d-i`.\\n\\n    def findDiagonalOrder(self, matrix):\\n        m, n = len(matrix), len(matrix and matrix[0])\\n        return [matrix[i][d-i]\\n                for d in range(m+n-1)\\n                for i in range(max(0, d-n+1), min(d+1, m))[::d%2*2-1]]\\n\\nWhy the range `range(max(0, d-n+1), min(d+1, m))`? Well I need `0 <= i < m` and `0 <= j < n`. As said above, `j` is `d-i`, so I have `0 <= d-i < n`. Isolating `i` gives me `i <= d` and `i > d-n`. Since we're dealing with integers, they're equivalent to `i < d+1` and `i >= d-n+1`. So my `i` needs to be in the range [0, m) as well as in the range [d-n+1, d+1). And my range is simply the intersection of those two ranges."
		},
		{
			"lc_ans_id":"97751",
			"view":"2137",
			"top":"4",
			"title":"My 8ms Short Solution, 9line",
			"vote":"5",
			"content":"```\\npublic int[] findDiagonalOrder(int[][] matrix) {\\n\\tif (matrix.length == 0) return new int[0];\\n\\tint h = matrix.length, w = matrix[0].length, id = 0;\\n\\tint[] res  = new int[h*w];\\n\\tfor (int i = 0; i < h+w; i++) {\\n\\t\\t// find lower bound and upper bound\\n\\t\\tint lb = (int)Math.max(0, i-w+1), ub = (int)Math.min(i,h-1);\\n\\t\\tif (i%2 == 0) for (int j = ub; j >= lb; j--) res[id++] = matrix[j][i-j];\\n\\t\\telse for (int j = lb;j <= ub; j++) res[id++] = matrix[j][i-j];\\n\\t}\\n\\treturn res;\\n}\\n```"
		},
		{
			"lc_ans_id":"97779",
			"view":"314",
			"top":"5",
			"title":"Python solution with detailed explanation (deque)",
			"vote":"3",
			"content":"**Solution**\\n\\n**Diagonal Traverse** https://leetcode.com/problems/diagonal-traverse/?tab=Description\\n\\n**Deque & Dictionary - O(MN)**\\n* Property for the diagonals is that: row + col = constant. This constant varies from 0 to M+N-2.\\n* The direction of the diagonal is top to bottom or bottom to top. The direction depends if constant is even or odd.\\n* Iterate the matrix. Maintain a dictionary with key as integer and value as a deque. \\n* The key will be row+col and deque will have all elements which have the same row +col. Depending whether row+col is even or odd, we will either append or appendleft.\\n\\n```\\nfrom collections import deque, defaultdict\\nclass Solution(object):\\n    def findDiagonalOrder(self, matrix):\\n        \"\"\"\\n        :type matrix: List[List[int]]\\n        :rtype: List[int]\\n        \"\"\"\\n        if matrix == []:\\n            return []\\n        M, N = len(matrix), len(matrix[0])\\n        result = defaultdict(deque)\\n        max_sum, top_down = M+N-2, True\\n        for i in range(M):\\n            for j in range(N):\\n                s = i+j\\n                if s&1:\\n                    result[s].append(matrix[i][j])\\n                else:\\n                    result[s].appendleft(matrix[i][j])\\n        output = []\\n        for s in range(max_sum+1):\\n            output.extend(result[s])\\n        return output\\n```"
		},
		{
			"lc_ans_id":"97789",
			"view":"1350",
			"top":"6",
			"title":"3-line Python solution",
			"vote":"3",
			"content":"Within diagonal row+col is same, so we first sort index pairs by row+col, and within diagonal sort them either by row or by column index depending if row+col is odd/even. \\n```\\ndef findDiagonalOrder(self, matrix):\\n        l = [[i,j] for i in range(len(matrix)) for j in range(len(matrix[0]))]\\n        l.sort(key=lambda x: float(x[0]+x[1])-float(x[(x[0]+x[1])%2])*0.00000001 )\\n        return [matrix[x][y] for [x,y] in l]\\n```"
		},
		{
			"lc_ans_id":"97725",
			"view":"306",
			"top":"7",
			"title":"5 lines of Java",
			"vote":"2",
			"content":"Short and quite simple: `d` iterates through every diagonal (i.e. `d < m.length + m[0].length - 1`), we calculate the start (`lo`) and end (`hi`) columns, and advance them towards each other:\\n```java\\nint[] findDiagonalOrder(int[][] m) {\\n  int[] result = new int[(m.length == 0) ? 0 : m.length * m[0].length];\\n  for (int d = 0, i = 0; i < result.length; d++)\\n    for (int lo = d - min(d, m.length - 1), hi = min(d, m[0].length - 1); lo <= hi; )\\n      result[i++] = ((d & 1) == 0) ? m[d - lo][lo++] : m[d - hi][hi--];\\n  return result;\\n}\\n```"
		},
		{
			"lc_ans_id":"97767",
			"view":"216",
			"top":"8",
			"title":"Simply Python Solution",
			"vote":"2",
			"content":"Simple two step approach:\\n1- Group numbers according to diagonals. Sum of row+col in same diagonal is same.\\n2- Reverse numbers in odd diagonals before adding numbers to result list.\\n\\n```\\nclass Solution(object):\\n    def findDiagonalOrder(self, matrix):\\n        \"\"\"\\n        :type matrix: List[List[int]]\\n        :rtype: List[int]\\n        \"\"\"\\n        result = [ ]\\n        dd = collections.defaultdict(list)\\n        if not matrix: return result\\n        # Step 1: Numbers are grouped by the diagonals.\\n        # Numbers in same diagonal have same value of row+col\\n        for i in range(0, len(matrix)):\\n            for j in range(0, len(matrix[0])):\\n                dd[i+j+1].append(matrix[i][j]) # starting indices from 1, hence i+j+1.\\n        # Step 2: Place diagonals in the result list.\\n        # But remember to reverse numbers in odd diagonals.\\n        for k, v in dd.iteritems():\\n            if k%2==1: dd[k].reverse()\\n            result += dd[k]\\n        return result\\n```"
		},
		{
			"lc_ans_id":"97775",
			"view":"211",
			"top":"9",
			"title":"6-liner C++ O(m*n) print values by diagonals (with explanation)",
			"vote":"2",
			"content":"**Key Observation:** \\n1. For each diagonal, all entries `a[i][j]` have constant index sum `i+j`.\\n2. Print a diagonal towards upper right direction iff `i+j` is even.\\n```\\n    vector<int> findDiagonalOrder(vector<vector<int>>& a) {\\n      int m, n, L, R; vector<int> res;\\n      if ((m = a.size()) && (n = a[0].size()))\\n        for (int i=0; L=max(i-m+1,0), R=min(n-1,i), i<m+n-1; ++i)\\n          if (i%2) for (int j = R; j >= L; --j) res.push_back(a[i-j][j]);\\n          else     for (int j = L; j <= R; ++j) res.push_back(a[i-j][j]);\\n\\n      return res;\\n    }\\n```"
		}
	],
	"id":"488",
	"title":"Diagonal Traverse",
	"content":"<p>\r\nGiven a matrix of M x N elements (M rows, N columns), return all elements of the matrix in diagonal order as shown in the below image. \r\n</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n[\r\n [ 1, 2, 3 ],\r\n [ 4, 5, 6 ],\r\n [ 7, 8, 9 ]\r\n]\r\n<b>Output:</b>  [1,2,4,7,5,3,6,8,9]\r\n<b>Explanation:</b>\r\n<img src=\"/static/images/problemset/diagonal_traverse.png\" width = \"20%\" />\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The total number of elements of the given matrix will not exceed 10,000.</li>\r\n</ol>\r\n</p>",
	"frequency":"292",
	"ac_num":"15475"
}