{
	"difficulty":"2",
	"submit_num":"477410",
	"show_id":"54",
	"leetcode_id":"54",
	"answers":[
		{
			"lc_ans_id":"20599",
			"view":"53847",
			"top":"0",
			"title":"Super Simple and Easy to Understand Solution",
			"vote":"354",
			"content":"This is a very simple and easy to understand solution. I traverse right and increment rowBegin, then traverse down and decrement colEnd, then I traverse left and decrement rowEnd, and finally I traverse up and increment colBegin.\\n\\nThe only tricky part is that when I traverse left or up I have to check whether the row or col still exists to prevent duplicates. If anyone can do the same thing without that check, please let me know!\\n\\nAny comments greatly appreciated.\\n\\n    public class Solution {\\n        public List<Integer> spiralOrder(int[][] matrix) {\\n            \\n            List<Integer> res = new ArrayList<Integer>();\\n            \\n            if (matrix.length == 0) {\\n                return res;\\n            }\\n            \\n            int rowBegin = 0;\\n            int rowEnd = matrix.length-1;\\n            int colBegin = 0;\\n            int colEnd = matrix[0].length - 1;\\n            \\n            while (rowBegin <= rowEnd && colBegin <= colEnd) {\\n                // Traverse Right\\n                for (int j = colBegin; j <= colEnd; j ++) {\\n                    res.add(matrix[rowBegin][j]);\\n                }\\n                rowBegin++;\\n                \\n                // Traverse Down\\n                for (int j = rowBegin; j <= rowEnd; j ++) {\\n                    res.add(matrix[j][colEnd]);\\n                }\\n                colEnd--;\\n                \\n                if (rowBegin <= rowEnd) {\\n                    // Traverse Left\\n                    for (int j = colEnd; j >= colBegin; j --) {\\n                        res.add(matrix[rowEnd][j]);\\n                    }\\n                }\\n                rowEnd--;\\n                \\n                if (colBegin <= colEnd) {\\n                    // Traver Up\\n                    for (int j = rowEnd; j >= rowBegin; j --) {\\n                        res.add(matrix[j][colBegin]);\\n                    }\\n                }\\n                colBegin ++;\\n            }\\n            \\n            return res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"20573",
			"view":"14256",
			"top":"1",
			"title":"A concise C++ implementation based on Directions",
			"vote":"86",
			"content":"When traversing the matrix in the spiral order, at any time we follow one out of the following four directions: RIGHT DOWN LEFT UP. Suppose we are working on a 5 x 3 matrix as such:\\n\\n0  1   2   3   4   5\\n    6   7   8   9   10\\n   11 12 13 14 15\\n\\nImagine a cursor starts off at (0, -1), i.e. the position at '0', then we can achieve the spiral order by doing the following:\\n\\n1. Go right 5 times \\n2. Go down 2 times\\n3. Go left 4 times\\n4. Go up 1 times.\\n5. Go right 3 times\\n6. Go down 0 times -> quit\\n  \\nNotice that the directions we choose always follow the order 'right->down->left->up', and for horizontal movements, the number of shifts follows:{5, 4, 3}, and vertical movements follows {2, 1, 0}. \\n\\nThus, we can make use of a direction matrix that records the offset for all directions, then an array of two elements that stores the number of shifts for horizontal and vertical movements, respectively. This way, we really just need one for loop instead of four.\\n\\nAnother good thing about this implementation is that: If later we decided to do spiral traversal on a different direction (e.g. Counterclockwise), then we only need to change the Direction matrix; the main loop does not need to be touched.\\n\\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\\n        vector<vector<int> > dirs{{0, 1}, {1, 0}, {0, -1}, {-1, 0}};\\n        vector<int> res;\\n        int nr = matrix.size();     if (nr == 0) return res;\\n        int nc = matrix[0].size();  if (nc == 0) return res;\\n        \\n        vector<int> nSteps{nc, nr-1};\\n        \\n        int iDir = 0;   // index of direction.\\n        int ir = 0, ic = -1;    // initial position\\n        while (nSteps[iDir%2]) {\\n            for (int i = 0; i < nSteps[iDir%2]; ++i) {\\n                ir += dirs[iDir][0]; ic += dirs[iDir][1];\\n                res.push_back(matrix[ir][ic]);\\n            }\\n            nSteps[iDir%2]--;\\n            iDir = (iDir + 1) % 4;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"20719",
			"view":"9231",
			"top":"2",
			"title":"0ms Clear C++ Solution",
			"vote":"72",
			"content":"The idea is just to add the elements in the spiral order. First the up-most row (`u`), then the right-most column (`r`), then the down-most row (`d`), and finally the left-most column (`l`). After finishing a row or a column, update the corresponding variable to continue the process.\\n\\nThe code is as follows.\\n\\n    class Solution {\\n    public:\\n        vector<int> spiralOrder(vector<vector<int>>& matrix) {\\n            if (matrix.empty()) return {};\\n            int m = matrix.size(), n = matrix[0].size();\\n            vector<int> spiral(m * n);\\n            int u = 0, d = m - 1, l = 0, r = n - 1, k = 0;\\n            while (true) {\\n                // up\\n                for (int col = l; col <= r; col++) spiral[k++] = matrix[u][col];\\n                if (++u > d) break;\\n                // right\\n                for (int row = u; row <= d; row++) spiral[k++] = matrix[row][r];\\n                if (--r < l) break;\\n                // down\\n                for (int col = r; col >= l; col--) spiral[k++] = matrix[d][col];\\n                if (--d < u) break;\\n                // left\\n                for (int row = d; row >= u; row--) spiral[k++] = matrix[row][l];\\n                if (++l > r) break;\\n            }\\n            return spiral;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"20571",
			"view":"11896",
			"top":"3",
			"title":"1-liner in Python",
			"vote":"58",
			"content":"Take the first row plus the spiral order of the rotated remaining matrix. Inefficient for large matrices, but here I got it accepted in 40 ms, one of the fastest Python submissions.\\n\\n    def spiralOrder(self, matrix):\\n        return matrix and list(matrix.pop(0)) + self.spiralOrder(zip(*matrix)[::-1])"
		},
		{
			"lc_ans_id":"20579",
			"view":"6858",
			"top":"4",
			"title":"Simple Python solution by mutating the matrix",
			"vote":"36",
			"content":"The con is mutating the matrix, if this is not allowed, we can make a deep copy of the matrix first. And of course it comes with the additional memory usage.\\n\\n      \\n    def spiralOrder(self, matrix):\\n        ret = []\\n        while matrix:\\n            ret += matrix.pop(0)\\n            if matrix and matrix[0]:\\n                for row in matrix:\\n                    ret.append(row.pop())\\n            if matrix:\\n                ret += matrix.pop()[::-1]\\n            if matrix and matrix[0]:\\n                for row in matrix[::-1]:\\n                    ret.append(row.pop(0))\\n        return ret"
		},
		{
			"lc_ans_id":"20773",
			"view":"4598",
			"top":"5",
			"title":"Elegant and fast Java solution (240ms)",
			"vote":"24",
			"content":"        public List<Integer> spiralOrder(int[][] matrix) {\\n        List<Integer> spiralList = new ArrayList<>();\\n        if(matrix == null || matrix.length == 0) return spiralList;\\n        \\n        // declare indices\\n        int top = 0;\\n        int bottom = matrix.length - 1;\\n        int left = 0;\\n        int right = matrix[0].length - 1;\\n        \\n        while(true){\\n            // 1. print top row\\n            for(int j=left; j <=right;j++){\\n                spiralList.add(matrix[top][j]);\\n            }\\n            top++;\\n            if(boundriesCrossed(left,right,bottom,top))\\n                break;\\n            \\n            // 2. print rightmost column\\n            for(int i=top; i <= bottom; i++){\\n                spiralList.add(matrix[i][right]);\\n            }\\n            right--;\\n            if(boundriesCrossed(left,right,bottom,top))\\n                break;\\n                \\n            // 3. print bottom row\\n            for(int j=right; j >=left; j--){\\n                spiralList.add(matrix[bottom][j]);\\n            }\\n            bottom--;\\n            if(boundriesCrossed(left,right,bottom,top))\\n                break;    \\n                \\n            // 4. print leftmost column\\n            for(int i=bottom; i >= top; i--){\\n                spiralList.add(matrix[i][left]);\\n            }\\n            left++;\\n            if(boundriesCrossed(left,right,bottom,top))\\n                break;    \\n        }// end while true\\n        \\n        return spiralList;\\n    }\\n    \\n    private boolean boundriesCrossed(int left,int right,int bottom,int top){\\n        if(left>right || bottom<top)\\n            return true;\\n        else\\n            return false;\\n    }"
		},
		{
			"lc_ans_id":"20570",
			"view":"2463",
			"top":"6",
			"title":"Clean Java, readable, human friendly code",
			"vote":"21",
			"content":"    public class Solution {\\n        public List<Integer> spiralOrder(int[][] matrix) {\\n            List<Integer> res = new ArrayList<Integer>();\\n            if(matrix.length == 0 || matrix[0].length == 0) return res;\\n            \\n            int top = 0;\\n            int bottom = matrix.length-1;\\n            int left = 0;\\n            int right = matrix[0].length-1;\\n            \\n            while(true){\\n                for(int i = left; i <= right; i++) res.add(matrix[top][i]);\\n                top++;\\n                if(left > right || top > bottom) break;\\n                \\n                for(int i = top; i <= bottom; i++) res.add(matrix[i][right]);\\n                right--;\\n                if(left > right || top > bottom) break;\\n                \\n                for(int i = right; i >= left; i--) res.add(matrix[bottom][i]);\\n                bottom--;\\n                if(left > right || top > bottom) break;\\n                \\n                for(int i = bottom; i >= top; i--) res.add(matrix[i][left]);\\n                left++;\\n                if(left > right || top > bottom) break;\\n            }\\n            \\n            return res;\\n        }\\n        \\n    }"
		},
		{
			"lc_ans_id":"20656",
			"view":"1996",
			"top":"7",
			"title":"AC Python 32ms solution",
			"vote":"19",
			"content":"    def spiralOrder(self, matrix):\\n        if not matrix or not matrix[0]:\\n            return []\\n        ans = []\\n        m, n = len(matrix), len(matrix[0])\\n        u, d, l, r = 0, m - 1, 0, n - 1\\n        while l < r and u < d:\\n            ans.extend([matrix[u][j] for j in xrange(l, r)])\\n            ans.extend([matrix[i][r] for i in xrange(u, d)])\\n            ans.extend([matrix[d][j] for j in xrange(r, l, -1)])\\n            ans.extend([matrix[i][l] for i in xrange(d, u, -1)])\\n            u, d, l, r = u + 1, d - 1, l + 1, r - 1\\n        if l == r:\\n            ans.extend([matrix[i][r] for i in xrange(u, d + 1)])\\n        elif u == d:\\n            ans.extend([matrix[u][j] for j in xrange(l, r + 1)])\\n        return ans\\n\\n\\n    # 22 / 22 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 32 ms\\n    # 100%"
		},
		{
			"lc_ans_id":"20874",
			"view":"2954",
			"top":"8",
			"title":"An easy to understand solution",
			"vote":"11",
			"content":"This solution use a most left up point and a most right bottom point to act as limiters, and traverse around directly. I think it's quite easy to understand.\\n\\n    public List<Integer> spiralOrder(int[][] matrix) {\\n        List<Integer> list = new LinkedList<Integer>();\\n        if (matrix == null) return list;\\n        int m = matrix.length;\\n        if (m == 0) return list;\\n        int n = matrix[0].length;\\n        int x0 = 0, y0 = 0; // most left up point\\n        int x1 = m-1, y1 = n-1; // most right bottom point\\n        int x = 0, y = 0;\\n        while(x0 < x1 && y0 < y1) {\\n            x = x0; // after one loop, (x, y) goes back to original position, must set them 'forward'\\n            y = y0;\\n            // traverse around\\n            while (y < y1) list.add(matrix[x][y++]);\\n            while (x < x1) list.add(matrix[x++][y]);\\n            while (y > y0) list.add(matrix[x][y--]);\\n            while (x > x0) list.add(matrix[x--][y]);\\n            // move limiters to center\\n            x0++; \\n            y0++;\\n            x1--;\\n            y1--;\\n        }\\n        x = x0;\\n        y = y0;\\n        // deal with one row or col left case\\n        if (x0 == x1 && y0 <= y1) {\\n            while (y <= y1) list.add(matrix[x][y++]);\\n        } else if (y0 == y1 && x0 <= x1) {\\n            while (x <= x1) list.add(matrix[x++][y]);\\n        }\\n        return list;\\n    }"
		},
		{
			"lc_ans_id":"20606",
			"view":"1543",
			"top":"9",
			"title":"Very Easy to Understand Python Solution",
			"vote":"10",
			"content":"    def spiralOrder(self, matrix):\\n        res = []\\n        if not matrix:\\n            return []\\n        i,j,di,dj = 0,0,0,1\\n        m, n = len(matrix),len(matrix[0])\\n        for v in xrange(m * n):\\n            res.append(matrix[i][j])\\n            matrix[i][j] = ''\\n            if matrix[(i+di)%m][(j+dj)%n] == '':\\n                di, dj = dj, -di\\n            i += di\\n            j += dj\\n        return res"
		}
	],
	"id":"54",
	"title":"Spiral Matrix",
	"content":"<p>Given a matrix of <i>m</i> x <i>n</i> elements (<i>m</i> rows, <i>n</i> columns), return all elements of the matrix in spiral order.\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven the following matrix:\r\n</p>\r\n<pre>\r\n[\r\n [ 1, 2, 3 ],\r\n [ 4, 5, 6 ],\r\n [ 7, 8, 9 ]\r\n]\r\n</pre>\r\n<p>\r\nYou should return <code>[1,2,3,6,9,8,7,4,5]</code>.\r\n</p>",
	"frequency":"504",
	"ac_num":"128588"
}