{
	"difficulty":"3",
	"submit_num":"275384",
	"show_id":"85",
	"leetcode_id":"85",
	"answers":[
		{
			"lc_ans_id":"29054",
			"view":"73317",
			"top":"0",
			"title":"Share my DP solution",
			"vote":"576",
			"content":"The DP solution proceeds row by row, starting from the first row. Let the maximal rectangle area at row i and column j be computed by [right(i,j) - left(i,j)]*height(i,j).\\n\\nAll the 3 variables left, right, and height can be determined by the information from previous row, and also information from the current row. So it can be regarded as a DP solution. The transition equations are:\\n\\n> left(i,j) = max(left(i-1,j), cur_left), cur_left can be determined from the current row\\n\\n> right(i,j) = min(right(i-1,j), cur_right), cur_right can be determined from the current row \\n\\n> height(i,j) = height(i-1,j) + 1,  if matrix[i][j]=='1'; \\n\\n> height(i,j) = 0,  if matrix[i][j]=='0'\\n\\n\\n\\nThe code is as below. The loops can be combined for speed but I separate them for more clarity of the algorithm.\\n\\n    class Solution {public:\\n    int maximalRectangle(vector<vector<char> > &matrix) {\\n        if(matrix.empty()) return 0;\\n        const int m = matrix.size();\\n        const int n = matrix[0].size();\\n        int left[n], right[n], height[n];\\n        fill_n(left,n,0); fill_n(right,n,n); fill_n(height,n,0);\\n        int maxA = 0;\\n        for(int i=0; i<m; i++) {\\n            int cur_left=0, cur_right=n; \\n            for(int j=0; j<n; j++) { // compute height (can do this from either side)\\n                if(matrix[i][j]=='1') height[j]++; \\n                else height[j]=0;\\n            }\\n            for(int j=0; j<n; j++) { // compute left (from left to right)\\n                if(matrix[i][j]=='1') left[j]=max(left[j],cur_left);\\n                else {left[j]=0; cur_left=j+1;}\\n            }\\n            // compute right (from right to left)\\n            for(int j=n-1; j>=0; j--) {\\n                if(matrix[i][j]=='1') right[j]=min(right[j],cur_right);\\n                else {right[j]=n; cur_right=j;}    \\n            }\\n            // compute the area of rectangle (can do this from either side)\\n            for(int j=0; j<n; j++)\\n                maxA = max(maxA,(right[j]-left[j])*height[j]);\\n        }\\n        return maxA;\\n    }\\n};\\n\\n\\nIf you think this algorithm is not easy to understand, you can try this example:\\n\\n    0 0 0 1 0 0 0 \\n    0 0 1 1 1 0 0 \\n    0 1 1 1 1 1 0\\n\\nThe vector \"left\" and \"right\" from row 0 to row 2 are as follows\\n\\nrow 0:\\n \\n\\n    l: 0 0 0 3 0 0 0\\n    r: 7 7 7 4 7 7 7\\n\\nrow 1:\\n\\n    l: 0 0 2 3 2 0 0\\n    r: 7 7 5 4 5 7 7 \\n\\nrow 2:\\n\\n    l: 0 1 2 3 2 1 0\\n    r: 7 6 5 4 5 6 7\\n\\nThe vector \"left\" is computing the left boundary. Take (i,j)=(1,3) for example. On current row 1, the left boundary is at j=2. However, because matrix[1][3] is 1, you need to consider the left boundary on previous row as well, which is 3. So the real left boundary at (1,3) is 3. \\n\\nI hope this additional explanation makes things clearer."
		},
		{
			"lc_ans_id":"29064",
			"view":"35571",
			"top":"1",
			"title":"A O(n^2) solution based on Largest Rectangle in Histogram",
			"vote":"198",
			"content":"This question is similar as [\\\\[Largest Rectangle in Histogram\\\\]][1]:\\n\\nYou can maintain a row length of Integer array H recorded its height of '1's, and scan and update row by row to find out the largest rectangle of each row.\\n\\nFor each row, if matrix[row][i] == '1'. H[i] +=1, or reset the H[i] to zero.\\nand accroding the algorithm of [Largest Rectangle in Histogram], to update the maximum area.\\n\\n    public class Solution {\\n        public int maximalRectangle(char[][] matrix) {\\n            if (matrix==null||matrix.length==0||matrix[0].length==0)\\n                return 0;\\n            int cLen = matrix[0].length;    // column length\\n            int rLen = matrix.length;       // row length\\n            // height array \\n            int[] h = new int[cLen+1];\\n            h[cLen]=0;\\n            int max = 0;\\n            \\n            \\n            for (int row=0;row<rLen;row++) {\\n                Stack<Integer> s = new Stack<Integer>();\\n                for (int i=0;i<cLen+1;i++) {\\n                    if (i<cLen)\\n                        if(matrix[row][i]=='1')\\n                            h[i]+=1;\\n                        else h[i]=0;\\n                    \\n                    if (s.isEmpty()||h[s.peek()]<=h[i])\\n                        s.push(i);\\n                    else {\\n                        while(!s.isEmpty()&&h[i]<h[s.peek()]){\\n                            int top = s.pop();\\n                            int area = h[top]*(s.isEmpty()?i:(i-s.peek()-1));\\n                            if (area>max)\\n                                max = area;\\n                        }\\n                        s.push(i);\\n                    }\\n                }\\n            }\\n            return max;\\n        }\\n    }\\n\\n  [1]: http://oj.leetcode.com/problems/largest-rectangle-in-histogram/"
		},
		{
			"lc_ans_id":"29055",
			"view":"15218",
			"top":"2",
			"title":"My java solution based on Maximum Rectangle in Histogram with explanation",
			"vote":"82",
			"content":"We can apply the maximum in histogram in each row of the 2D matrix. What we need is to maintain an int array for each row, which represent for the height of the histogram.\\n\\nPlease refer to https://leetcode.com/problems/largest-rectangle-in-histogram/      first.\\n\\n\\nSuppose there is a 2D matrix like\\n\\n1 1 0 1 0 1\\n\\n0 1 0 0 1 1\\n\\n1 1 1 1 0 1\\n\\n1 1 1 1 0 1\\n\\n\\nFirst initiate the height array as 1 1 0 1 0 1, which is just a copy of the first row. Then we can easily calculate the max area is 2.\\n\\nThen update the array. We scan the second row, when the matrix[1][i] is 0, set the height[i] to 0; else height[i] += 1, which means the height has increased by 1. So the height array again becomes 0 2 0 0 1 2. The max area now is also 2.\\n\\nApply the same method until we scan the whole matrix. the last height arrays is 2 4 2 2 0 4, so the max area has been found as 2 * 4 = 8.\\n\\nThen reason we scan the whole matrix is that the maximum value may appear in any row of the height.\\n\\n\\nCode as follows: \\n\\n    public class Solution {\\n    public int maximalRectangle(char[][] matrix) {\\n        if(matrix == null || matrix.length == 0 || matrix[0].length == 0) return 0;\\n        \\n        int[] height = new int[matrix[0].length];\\n        for(int i = 0; i < matrix[0].length; i ++){\\n            if(matrix[0][i] == '1') height[i] = 1;\\n        }\\n        int result = largestInLine(height);\\n        for(int i = 1; i < matrix.length; i ++){\\n            resetHeight(matrix, height, i);\\n            result = Math.max(result, largestInLine(height));\\n        }\\n        \\n        return result;\\n    }\\n    \\n    private void resetHeight(char[][] matrix, int[] height, int idx){\\n        for(int i = 0; i < matrix[0].length; i ++){\\n            if(matrix[idx][i] == '1') height[i] += 1;\\n            else height[i] = 0;\\n        }\\n    }    \\n    \\n    public int largestInLine(int[] height) {\\n        if(height == null || height.length == 0) return 0;\\n        int len = height.length;\\n        Stack<Integer> s = new Stack<Integer>();\\n        int maxArea = 0;\\n        for(int i = 0; i <= len; i++){\\n            int h = (i == len ? 0 : height[i]);\\n            if(s.isEmpty() || h >= height[s.peek()]){\\n                s.push(i);\\n            }else{\\n                int tp = s.pop();\\n                maxArea = Math.max(maxArea, height[tp] * (s.isEmpty() ? i : i - 1 - s.peek()));\\n                i--;\\n            }\\n        }\\n        return maxArea;\\n    }\\n    \\n\\n}"
		},
		{
			"lc_ans_id":"29065",
			"view":"7627",
			"top":"3",
			"title":"AC Python DP solutioin 120ms based on largest rectangle in histogram",
			"vote":"40",
			"content":"    def maximalRectangle(self, matrix):\\n        if not matrix or not matrix[0]:\\n            return 0\\n        n = len(matrix[0])\\n        height = [0] * (n + 1)\\n        ans = 0\\n        for row in matrix:\\n            for i in xrange(n):\\n                height[i] = height[i] + 1 if row[i] == '1' else 0\\n            stack = [-1]\\n            for i in xrange(n + 1):\\n                while height[i] < height[stack[-1]]:\\n                    h = height[stack.pop()]\\n                    w = i - 1 - stack[-1]\\n                    ans = max(ans, h * w)\\n                stack.append(i)\\n        return ans\\n\\n    # 65 / 65 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 120 ms\\n    # 100%\\n\\nThe solution is based on [largest rectangle in histogram][1] solution. Every row in the matrix is viewed as the ground with some buildings on it. The building height is the count of consecutive 1s from that row to above rows. The rest is then the same as [this solution for largest rectangle in histogram][2]\\n\\n\\n  [1]: https://leetcode.com/problems/largest-rectangle-in-histogram/\\n  [2]: https://leetcode.com/discuss/65647/ac-python-clean-solution-using-stack-76ms"
		},
		{
			"lc_ans_id":"29059",
			"view":"6929",
			"top":"4",
			"title":"Sharing my straightforward C++ solution with O(n^2) time with explanation",
			"vote":"22",
			"content":"    int maximalRectangle(vector<vector<char> > &matrix) {\\n        if(matrix.empty()){\\n            return 0;\\n        }\\n        int maxRec = 0;\\n        vector<int> height(matrix[0].size(), 0);\\n        for(int i = 0; i < matrix.size(); i++){\\n            for(int j = 0; j < matrix[0].size(); j++){\\n                if(matrix[i][j] == '0'){\\n                    height[j] = 0;\\n                }\\n                else{\\n                    height[j]++;\\n                }\\n            }\\n            maxRec = max(maxRec, largestRectangleArea(height));\\n        }\\n        return maxRec;\\n    }\\n    \\n    int largestRectangleArea(vector<int> &height) {\\n        stack<int> s;\\n        height.push_back(0);\\n        int maxSize = 0;\\n        for(int i = 0; i < height.size(); i++){\\n            if(s.empty() || height[i] >= height[s.top()]){\\n                s.push(i);\\n            }\\n            else{\\n                int temp = height[s.top()];\\n                s.pop();\\n                maxSize = max(maxSize, temp * (s.empty() ? i : i - 1 - s.top()));\\n                i--;\\n            }\\n        }\\n        return maxSize;\\n    }\\n\\nIn order to solve this problem, I use the solution from \"Largest Rectangle in Histogram\". \\n\\nNow I assume you already know how to solve \"Largest Rectangle in Histogram\".\\n\\nWe can regard a matrix as many histograms. For example, given a matrix below:\\n\\n1 0 1 0\\n\\n0 1 0 1\\n\\n0 1 1 0\\n\\n1 0 1 0\\n\\n1 0 1 1\\n\\nFrom top to bottom, we can find these histograms:\\n\\nNumber 1: 1 0 1 0\\n\\nNumber 2: 0 1 0 1\\n\\nNumber 3: 0 2 1 0\\n\\nNumber 4: 1 0 2 0\\n\\nNumber 5: 2 0 3 1\\n\\nPass all of these histograms to the function which can solve \"Largest Rectangle in Histogram\". And then find the maximum one. \\n\\nFinally, we get the answer."
		},
		{
			"lc_ans_id":"29109",
			"view":"1857",
			"top":"5",
			"title":"Maximal or minimal?",
			"vote":"17",
			"content":"I am confused about the requirement. If it is maximal rectangle that contains all the 1s, I could just return the size of the input if any 1 is detected anywhere..."
		},
		{
			"lc_ans_id":"29140",
			"view":"2699",
			"top":"6",
			"title":"Pyrhon O(n^2) solution based on Largest Rectangle in Histogram",
			"vote":"16",
			"content":"    class Solution:\\n    # @param matrix, a list of lists of 1 length string\\n    # @return an integer\\n    def maximalRectangle(self, matrix):\\n        if not matrix:\\n            return 0\\n        h, w = len(matrix), len(matrix[0])\\n        m = [[0]*w for _ in range(h)]\\n        for j in range(h):\\n            for i in range(w):\\n                if matrix[j][i] == '1':\\n                    m[j][i] = m[j-1][i] + 1\\n        return max(self.largestRectangleArea(row) for row in m)\\n\\n    def largestRectangleArea(self, height):\\n        height.append(0)\\n        stack, size = [], 0\\n        for i in range(len(height)):\\n            while stack and height[stack[-1]] > height[i]:\\n                h = height[stack.pop()]\\n                w = i if not stack else i-stack[-1]-1\\n                size = max(size, h*w)\\n            stack.append(i)\\n        return size\\n\\nm is every row height, it is easy to convert this to Largest Rectangle in Histogram"
		},
		{
			"lc_ans_id":"29172",
			"view":"2362",
			"top":"7",
			"title":"My O(n^3) solution for your reference",
			"vote":"16",
			"content":"    class Solution {\\n    public:\\n        int maximalRectangle(vector<vector<char> > &matrix) {\\n            int num_i=matrix.size();\\n            if (num_i==0) return 0;\\n            int num_j=matrix[0].size();\\n            if (num_j==0) return 0;\\n            vector<vector<int>> max_x(num_i,vector<int>(num_j,0));  //number of consecutive 1s to the left of matrix[i][j], including itself\\n    \\n            int area=0;\\n            for (int i=0;i<num_i;i++){\\n                for (int j=0;j<num_j;j++){\\n                    if (matrix[i][j]=='1'){\\n                        if (j==0) max_x[i][j]=1;\\n                        else max_x[i][j]=max_x[i][j-1]+1;\\n                        int y=1;\\n                        int x=num_j;\\n                        while((i-y+1>=0)&&(matrix[i-y+1][j]=='1')){\\n                            x=min(x, max_x[i-y+1][j]);\\n                            area=max(area,x*y);\\n                            y++;\\n                        } \\n                    }\\n                }\\n            }\\n            \\n    \\n            \\n            return area;\\n            \\n            \\n        }\\n    };"
		},
		{
			"lc_ans_id":"29134",
			"view":"929",
			"top":"8",
			"title":"Question on test case input format for two dimensional char arrays",
			"vote":"10",
			"content":"Since the input is a two dimensional char array, I wrote my test case as:\\n\\n[['1', '0', '0', '0'], ['0', '1', '1', '1'], ['0', '0', '1', '0'], ['0', '0', '0', '1']]\\n\\nI got the following results:\\n\"\\nRun Code Status: Runtime Error\\n\\nRun Code Result:\\n\\nYour input\\n\\n[['1', '0', '0', '0'], ['0', '1', '1', '1'], ['0', '0', '1', '0'], ['0', '0', '0', '1']]\\nYour answer\\n\\n\\nExpected answer\\n\\n\\nRuntime: N/A\\n\"\\n\\nThen, I changed the input to: [\\u201c1000\\u201d, \\u201c0111\\u201d, \\u201c0010\\u201d, \\u201c0010\\u201d]; this time everything is good. It did not take me too much time to realize that the input should be changed as so, because I encountered similar issues before for other problems.\\n\\nThough the first format for two dimensional char array is correct, I personally prefer the second format, because the second format requres less typing.\\n\\nMy concern is that, LeetCode should indicate somewhere that, the second format is what LeetCode accepts. Otherwise, people who think the first format is the only correct format will get confused, especially the people who first encountered this issue."
		},
		{
			"lc_ans_id":"29080",
			"view":"2813",
			"top":"9",
			"title":"My solution on Java using DP",
			"vote":"9",
			"content":"Open matrix from top to the bottom line by line, counting height of each column. Then check for each  column (only if it wasn't counted already) how many times it appears to the right and to the left.  Area = (left+right)*height. Just pick the max one. Pretty fast\\n\\n    public class Solution {\\n        public int maximalRectangle(char[][] matrix) {\\n            int area = 0, new_area, r, l;\\n            if(matrix.length > 0){\\n                int[] line = new int[matrix[0].length];\\n                boolean[] is_processed = new boolean[matrix[0].length];\\n                for(int i = 0; i < matrix.length; i++){\\n                    for(int j = 0; j < matrix[i].length; j++){\\n                        if (matrix[i][j] == '1') {\\n                            line[j]++;\\n                            is_processed[j] = false;\\n                        } else {\\n                            line[j] = 0;\\n                            is_processed[j] = true;\\n                        }\\n                    }\\n                    for(int j = 0; j < matrix[i].length; j++){\\n                        if(is_processed[j]) continue;\\n                        r = l = 1;\\n                        while((j + r < line.length)&&(line[j + r] >= line[j])){\\n                            if(line[j + r] == line[j]) is_processed[j + r] = true;\\n                            r++;\\n                        }\\n                        while((j - l >= 0)&&(line[j - l] >= line[j])) l++;\\n                        new_area = (r + l - 1)*line[j];\\n                        if (new_area > area) area = new_area;\\n                    }\\n                }\\n            } return area;\\n        }\\n    }"
		}
	],
	"id":"85",
	"title":"Maximal Rectangle",
	"content":"<p>\r\nGiven a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.\r\n</p>\r\n\r\n<p>For example, given the following matrix:\r\n<pre>\r\n1 0 1 0 0\r\n1 0 <font color=\"red\">1</font> <font color=\"red\">1</font> <font color=\"red\">1</font>\r\n1 1 <font color=\"red\">1</font> <font color=\"red\">1</font> <font color=\"red\">1</font>\r\n1 0 0 1 0\r\n</pre>\r\nReturn 6.\r\n</p>",
	"frequency":"516",
	"ac_num":"80436"
}