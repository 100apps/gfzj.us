{
	"difficulty":"1",
	"submit_num":"29100",
	"show_id":"661",
	"leetcode_id":"661",
	"answers":[
		{
			"lc_ans_id":"106602",
			"view":"5765",
			"top":"0",
			"title":"Very Clean Solution in Java",
			"vote":"13",
			"content":"Here we have a check function to check the boundary and a inner double loop to traverse the 9 potential candidates:\\n\\n```\\npublic class ImageSmoother {\\n\\n    public int[][] imageSmoother(int[][] M) {\\n        if (M == null) return null;\\n        int rows = M.length;\\n        if (rows == 0) return new int[0][];\\n        int cols = M[0].length;\\n\\n        int result[][] = new int[rows][cols];\\n\\n        for (int row = 0; row < rows; row++) {\\n            for (int col = 0; col < cols; col++) {\\n                int count = 0;\\n                int sum = 0;\\n                for (int incR : new int[]{-1, 0, 1}) {\\n                    for (int incC : new int[]{-1, 0, 1}) {\\n                        if (isValid(row + incR, col + incC, rows, cols)) {\\n                            count++;\\n                            sum += M[row + incR][col + incC];\\n                        }\\n                    }\\n                }\\n                result[row][col] = sum / count;\\n            }\\n        }\\n\\n        return result;\\n\\n    }\\n\\n    private boolean isValid(int x, int y, int rows, int cols) {\\n        return x >= 0 && x < rows && y >= 0 && y < cols;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106593",
			"view":"2517",
			"top":"1",
			"title":"C++ O(1) space using \"game of life\" idea",
			"vote":"11",
			"content":"Derived from StefanPochmann's idea in \"game of life\": the board has ints  in [0, 255], hence only 8-bit is used, we can use the middle 8-bit to store the new state (average value),  replace the old state with the new state by shifting all values 8 bits to the right.\\n```\\n    vector<vector<int>> imageSmoother(vector<vector<int>>& M) {\\n        int m = M.size(), n = M[0].size();\\n        if (m == 0 || n == 0) return {{}};\\n        vector<vector<int>> dirs = {{0,1},{0,-1},{1,0},{-1,0},{-1,-1},{1,1},{-1,1},{1,-1}};\\n        for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                int sum = M[i][j], cnt = 1;\\n                for (int k = 0; k < dirs.size(); k++) {\\n                    int x = i + dirs[k][0], y = j + dirs[k][1];\\n                    if (x < 0 || x > m - 1 || y < 0 || y > n - 1) continue;\\n                    sum += (M[x][y] & 0xFF);\\n                    cnt++;\\n                }\\n                M[i][j] |= ((sum / cnt) << 8);\\n            }\\n        }\\n         for (int i = 0; i < m; i++) {\\n            for (int j = 0; j < n; j++) {\\n                M[i][j] >>= 8;\\n            }\\n         }\\n        return M;\\n    }\\n\\n```"
		},
		{
			"lc_ans_id":"106598",
			"view":"1909",
			"top":"2",
			"title":"Straightforward python solution",
			"vote":"6",
			"content":"```\\nfrom copy import deepcopy as copy\\n\\nclass Solution(object):\\n    def imageSmoother(self, M):\\n        \"\"\"\\n        :type M: List[List[int]]\\n        :rtype: List[List[int]]\\n        \"\"\"\\n        x_len = len(M)\\n        y_len = len(M[0]) if x_len else 0\\n        res = copy(M)\\n        for x in range(x_len):\\n            for y in range(y_len):\\n                neighbors = [\\n                    M[_x][_y]\\n                    for _x in (x-1, x, x+1)\\n                    for _y in (y-1, y, y+1)\\n                    if 0 <= _x < x_len and 0 <= _y < y_len\\n                ]\\n                res[x][y] = sum(neighbors) // len(neighbors)\\n        return res\\n```"
		},
		{
			"lc_ans_id":"106596",
			"view":"794",
			"top":"3",
			"title":"Super clean and easy solution",
			"vote":"2",
			"content":"Given a 2D integer matrix M representing the gray scale of an image, you need to design a smoother to make the gray scale of each cell becomes the average gray scale (rounding down) of ****all the 8 surrounding cells and itself****. If a cell has less than 8 surrounding cells, then use as many as you can.\\n\\nfor every element, represented by M[i][j], the average of M[i][j] and its neighbors should be the sum of (itself and its **valid** neighbors' value) divided by **valid** count\\n\\nfor every M[i][j], there are 8 neighbors, some of them may be index out of boundary, If it's neighbor's index is valid, then add it to sum, and count++\\n\\ncode below\\n\\n```\\nclass Solution {\\n    public int[][] imageSmoother(int[][] M) {\\n        if(M==null||M.length==0) return new int[][];\\n        int n=M.length;\\n        int m=M[0].length;\\n        int res[][]=new int[n][m];\\n        \\n        for(int i=0;i<n;i++){\\n            for(int j=0;j<m;j++){\\n                res[i][j]=avg(M,i,j,n,m);\\n            }\\n        }\\n        return res;\\n    }\\n    \\n    public int avg(int[][] M,int x,int y,int n,int m){\\n        int sum=0;\\n        int count=0;\\n        int[] valueAndCount=new int[]{0,0};\\n        \\n        for(int[] co:new int[][]{{x,y},{x,y-1},{x,y+1},{x-1,y},{x+1,y},{x+1,y-1},{x+1,y+1},{x-1,y-1},{x-1,y+1}}){\\n            valueAndCount=valueAndCount(M,co[0],co[1],n,m);\\n            sum+=valueAndCount[0];\\n            count+=valueAndCount[1]; \\n        }\\n        return sum/count;\\n    }\\n    \\n    public int[] valueAndCount(int[][] M,int x,int y,int n,int m){\\n        boolean valid=x>=0&&x<n&&y>=0&&y<m;\\n        return new int[]{valid?M[x][y]:0,valid?1:0};\\n    }\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"106641",
			"view":"1704",
			"top":"4",
			"title":"Basic Java Solution : 33ms",
			"vote":"2",
			"content":"Check the numbers around on valid indices and increment the sum and quotient(count) for average whenever you find a valid occurrence. \\n``` \\npublic int[][] imageSmoother(int[][] M) {\\n        int[][] res = new int[M.length][M[0].length];\\n        int count = 0;\\n        int sum = 0;\\n        for(int i = 0 ; i < M.length ; i++){\\n            \\n            for(int j = 0 ; j < M[0].length ; j++){\\n                sum =M[i][j];\\n                count=1;\\n                \\n                if(i-1>=0){\\n                    sum+=M[i-1][j];\\n                    count++;\\n                    if(j-1>=0){\\n                        sum+=M[i-1][j-1];\\n                        count++;\\n                    } \\n                    if(j+1<M[0].length){\\n                        sum+=M[i-1][j+1];\\n                        count++;  \\n                    }\\n                }\\n            \\n                if(j+1<M[0].length){\\n                    sum+=M[i][j+1];\\n                    count++;\\n                }\\n                \\n                if(j-1>=0){\\n                    sum+=M[i][j-1];\\n                    count++;\\n                    if(i+1<M.length){\\n                        sum+=M[i+1][j-1];\\n                        count++;\\n                    }\\n                }\\n                \\n                if(i+1<M.length){\\n                    sum+=M[i+1][j];\\n                    count++;\\n                    \\n                    if(j+1<M[0].length){\\n                        sum+=M[i+1][j+1];\\n                        count++;\\n                    }\\n                }\\n                res[i][j] = (int)Math.floor(sum/count);\\n            }\\n        }\\n        \\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"106622",
			"view":"322",
			"top":"5",
			"title":"Simple Python Solution by Enlarging Matrix",
			"vote":"1",
			"content":"We can simply add a group of things around the original matrix. So for each element in the original matrix, it is surrounded by 8 numbers and there will be no index problem any longer. When calculating the average, we can simply discard those added things and focus on the real numbers. For example, in my code, I added some -1 to the original matrix.\\n<pre>\\nclass Solution(object):\\n    def imageSmoother(self, M):\\n        \"\"\"\\n        :type M: List[List[int]]\\n        :rtype: List[List[int]]\\n        \"\"\"\\n        N = [[0]*len(M[0]) for i in range(len(M))]\\n        M.insert(0,[-1]*(len(M[0])+2))\\n        M.append([-1]*len(M[0]))\\n        for i in range(1,len(M)-1):\\n            M[i].insert(0,-1)\\n            M[i].append(-1)\\n        for i in range(1,len(M)-1):\\n            for j in range(1,len(M[0])-1):\\n                count = 0\\n                Sum = 0\\n                for k in range(-1,2):\\n                    for l in range(-1,2):\\n                        if M[i+k][j+l] != -1:\\n                            count += 1\\n                            Sum += M[i+k][j+l]\\n                N[i-1][j-1] = int(Sum/count)\\n        return N"
		},
		{
			"lc_ans_id":"106600",
			"view":"223",
			"top":"6",
			"title":"There is no tricky part of this problem, just coding as normal",
			"vote":"1",
			"content":"I am wondering that new Leetcode questions are much worse than old questions.\\nI don't know why Leetcode increase its number of questions really fast but ignore the quality of the new questions."
		},
		{
			"lc_ans_id":"106631",
			"view":"174",
			"top":"7",
			"title":"JAVA - 10 LINES OF CODE - E A S Y",
			"vote":"1",
			"content":"```\\nclass Solution {\\n    public int[][] imageSmoother(int[][] M) {\\n        int[][] ret = new int[M.length][M[0].length];\\n        for(int i = 0; i < M.length; i++) for(int j = 0; j < M[0].length; j++) smooth(M, ret, i, j);\\n        return ret;\\n    }\\n    \\n//use a loop instead of writing out all surrounding indexes...(='D)\\n    public void smooth(int[][] source, int[][] dest, int row, int col) {\\n        int count = 0, sum = 0;\\n        for(int i = row-1; i < row-1+3; i++) {\\n            for(int j = col-1; j < col-1+3; j++) {\\n                if(i < 0 || j < 0 || i > source.length-1 || j > source[0].length-1) continue;\\n                count++;\\n                sum += source[i][j];\\n            }\\n        }\\n        dest[row][col] = (int)Math.floor(sum/count);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106632",
			"view":"142",
			"top":"8",
			"title":"C++ 22line",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<vector<int>> imageSmoother(vector<vector<int>>& M) {\\n        if(M.empty()) return vector<vector<int>>();\\n        vector<vector<int>> result(M.size(), vector<int>(M[0].size(),0));\\n        vector<pair<int,int>> dir({{-1,-1}, {0,-1}, {1,-1}, {-1,0}, {0,0}, {1,0}, {-1,1}, {0,1}, {1,1}});\\n        for(int i=0; i<M.size(); i++) {\\n            for(int j=0; j<M[0].size(); j++) {\\n                int nume = 0, deno = 0;\\n                for(const auto& d:dir) {\\n                    int ii = i+d.first, jj = j+d.second;\\n                    if(ii>=0 && ii<M.size() && jj>=0 && jj<M[0].size()) {\\n                        deno++;\\n                        nume+=M[ii][jj];\\n                    }\\n                }\\n                result[i][j]=nume/deno;\\n            }\\n        }\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"106635",
			"view":"145",
			"top":"9",
			"title":"python O(m*n)",
			"vote":"1",
			"content":"Just process each cell as what it is asked in the description.\\n```\\nclass Solution(object):\\n    def imageSmoother(self, M):\\n        if not M: return M\\n        new = [[0 for _ in range(len(M[0]))] for _ in range(len(M))]\\n        directions = ((0, 0), (0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (-1, -1), (-1, 1), (1, -1))\\n        for i in range(len(new)):\\n            for j in range(len(new[0])):\\n                total = 0\\n                count = 0\\n                for r, c in directions:\\n                    if i + r < 0 or j + c < 0 or i + r >= len(M) or j + c >= len(M[0]):\\n                        continue\\n                    total += M[i + r][j + c]\\n                    count += 1\\n                new[i][j] = total/count\\n        return new"
		}
	],
	"id":"638",
	"title":"Image Smoother",
	"content":"<p>Given a 2D integer matrix M representing the gray scale of an image, you need to design a smoother to make the gray scale of each cell becomes the average gray scale (rounding down) of all the 8 surrounding cells and itself.  If a cell has less than 8 surrounding cells, then use as many as you can.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n[[1,1,1],\r\n [1,0,1],\r\n [1,1,1]]\r\n<b>Output:</b>\r\n[[0, 0, 0],\r\n [0, 0, 0],\r\n [0, 0, 0]]\r\n<b>Explanation:</b>\r\nFor the point (0,0), (0,2), (2,0), (2,2): floor(3/4) = floor(0.75) = 0\r\nFor the point (0,1), (1,0), (1,2), (2,1): floor(5/6) = floor(0.83333333) = 0\r\nFor the point (1,1): floor(8/9) = floor(0.88888889) = 0\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The value in the given matrix is in the range of [0, 255].</li>\r\n<li>The length and width of the given matrix are in the range of [1, 150].</li>\r\n</ol>\r\n</p>",
	"frequency":"279",
	"ac_num":"13385"
}