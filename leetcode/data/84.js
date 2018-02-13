{
	"difficulty":"3",
	"submit_num":"400472",
	"show_id":"84",
	"leetcode_id":"84",
	"answers":[
		{
			"lc_ans_id":"28905",
			"view":"31138",
			"top":"0",
			"title":"My concise C++ solution, AC 90 ms",
			"vote":"98",
			"content":"I push a sentinel node back into the end of height to make the code logic more concise.\\n  \\n\\n      class Solution {\\n        public:\\n            int largestRectangleArea(vector<int> &height) {\\n                \\n                int ret = 0;\\n                height.push_back(0);\\n                vector<int> index;\\n                \\n                for(int i = 0; i < height.size(); i++)\\n                {\\n                    while(index.size() > 0 && height[index.back()] >= height[i])\\n                    {\\n                        int h = height[index.back()];\\n                        index.pop_back();\\n                        \\n                        int sidx = index.size() > 0 ? index.back() : -1;\\n                        if(h * (i-sidx-1) > ret)\\n                            ret = h * (i-sidx-1);\\n                    }\\n                    index.push_back(i);\\n                }\\n                \\n                return ret;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"28900",
			"view":"35937",
			"top":"1",
			"title":"O(n) stack based JAVA solution",
			"vote":"85",
			"content":"For explanation, please see http://www.geeksforgeeks.org/largest-rectangle-under-histogram/\\n\\n    public class Solution {\\n        public int largestRectangleArea(int[] height) {\\n            int len = height.length;\\n            Stack<Integer> s = new Stack<Integer>();\\n            int maxArea = 0;\\n            for(int i = 0; i <= len; i++){\\n                int h = (i == len ? 0 : height[i]);\\n                if(s.isEmpty() || h >= height[s.peek()]){\\n                    s.push(i);\\n                }else{\\n                    int tp = s.pop();\\n                    maxArea = Math.max(maxArea, height[tp] * (s.isEmpty() ? i : i - 1 - s.peek()));\\n                    i--;\\n                }\\n            }\\n            return maxArea;\\n        }\\n    }\\n\\nOP's Note: Two years later I need to interview again. I came to this problem and I couldn't understand this solution. After reading the explanation through the link above, I finally figured this out again. \\nTwo key points that I found helpful while understanding the solution: \\n1. Do push all heights including 0 height. \\n2. ``i - 1 - s.peek()`` uses the starting index where ``height[s.peek() + 1] >= height[tp]``, because the index on top of the stack right now is the first index left of ``tp`` with height smaller than tp's height."
		},
		{
			"lc_ans_id":"28910",
			"view":"8750",
			"top":"2",
			"title":"Simple Divide and Conquer AC solution without Segment Tree",
			"vote":"60",
			"content":"The idea is simple: for a given range of bars, the maximum area can either from left or right half of the bars, or from the area containing the middle two bars. For the last condition, expanding from the middle two bars to find a maximum area is `O(n)`, which makes a typical Divide and Conquer solution with `T(n) = 2T(n/2) + O(n)`. Thus the overall complexity is `O(nlgn)` for time and `O(1)` for space (or `O(lgn)` considering stack usage). \\n\\nFollowing is the code accepted with 44ms. I posted this because I didn't find a similar solution, but only the RMQ idea which seemed less straightforward to me.\\n\\n    class Solution {\\n        int maxCombineArea(const vector<int> &height, int s, int m, int e) {\\n            // Expand from the middle to find the max area containing height[m] and height[m+1]\\n            int i = m, j = m+1;\\n            int area = 0, h = min(height[i], height[j]);\\n            while(i >= s && j <= e) {\\n                h = min(h, min(height[i], height[j]));\\n                area = max(area, (j-i+1) * h);\\n                if (i == s) {\\n                    ++j;\\n                }\\n                else if (j == e) {\\n                    --i;\\n                }\\n                else {\\n                    // if both sides have not reached the boundary,\\n                    // compare the outer bars and expand towards the bigger side\\n                    if (height[i-1] > height[j+1]) {\\n                        --i;\\n                    }\\n                    else {\\n                        ++j;\\n                    }\\n                }\\n            }\\n            return area;\\n        }\\n        int maxArea(const vector<int> &height, int s, int e) {\\n            // if the range only contains one bar, return its height as area\\n            if (s == e) {\\n                return height[s];\\n            }\\n            // otherwise, divide & conquer, the max area must be among the following 3 values\\n            int m = s + (e-s)/2;\\n            // 1 - max area from left half\\n            int area = maxArea(height, s, m);\\n            // 2 - max area from right half\\n            area = max(area, maxArea(height, m+1, e));\\n            // 3 - max area across the middle\\n            area = max(area, maxCombineArea(height, s, m, e));\\n            return area;\\n        }\\n    public:\\n        int largestRectangleArea(vector<int> &height) {\\n            if (height.empty()) {\\n                return 0;\\n            }\\n            return maxArea(height, 0, height.size()-1);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"28902",
			"view":"10130",
			"top":"3",
			"title":"5ms O(n) Java solution explained (beats 96%)",
			"vote":"50",
			"content":"For any bar `i` the maximum rectangle is of width `r - l - 1` where r - is the last coordinate of the bar to the **right** with height `h[r] >= h[i]` and l - is the last coordinate of the bar to the **left** which height `h[l] >= h[i]`\\n\\nSo if for any `i` coordinate we know his utmost higher (or of the same height) neighbors to the right and to the left, we can easily find the largest rectangle:\\n\\n    int maxArea = 0;\\n    for (int i = 0; i < height.length; i++) {\\n        maxArea = Math.max(maxArea, height[i] * (lessFromRight[i] - lessFromLeft[i] - 1));\\n    }\\n\\nThe main trick is how to effectively calculate `lessFromRight` and `lessFromLeft` arrays. The trivial solution is to use **O(n^2)** solution and for each `i` element first find his left/right heighbour in the second inner loop just iterating back or forward:\\n\\n    for (int i = 1; i < height.length; i++) {              \\n        int p = i - 1;\\n        while (p >= 0 && height[p] >= height[i]) {\\n            p--;\\n        }\\n        lessFromLeft[i] = p;              \\n    }\\n\\nThe only line change shifts this algorithm from **O(n^2)** to **O(n)** complexity: we don't need to rescan each item to the left - we can reuse results of previous calculations and \"jump\" through indices in quick manner:\\n\\n    while (p >= 0 && height[p] >= height[i]) {\\n          p = lessFromLeft[p];\\n    }\\n\\nHere is the whole solution:\\n\\n    public static int largestRectangleArea(int[] height) {\\n        if (height == null || height.length == 0) {\\n            return 0;\\n        }\\n        int[] lessFromLeft = new int[height.length]; // idx of the first bar the left that is lower than current\\n        int[] lessFromRight = new int[height.length]; // idx of the first bar the right that is lower than current\\n        lessFromRight[height.length - 1] = height.length;\\n        lessFromLeft[0] = -1;\\n\\n        for (int i = 1; i < height.length; i++) {\\n            int p = i - 1;\\n\\n            while (p >= 0 && height[p] >= height[i]) {\\n                p = lessFromLeft[p];\\n            }\\n            lessFromLeft[i] = p;\\n        }\\n\\n        for (int i = height.length - 2; i >= 0; i--) {\\n            int p = i + 1;\\n\\n            while (p < height.length && height[p] >= height[i]) {\\n                p = lessFromRight[p];\\n            }\\n            lessFromRight[i] = p;\\n        }\\n\\n        int maxArea = 0;\\n        for (int i = 0; i < height.length; i++) {\\n            maxArea = Math.max(maxArea, height[i] * (lessFromRight[i] - lessFromLeft[i] - 1));\\n        }\\n\\n        return maxArea;\\n    }"
		},
		{
			"lc_ans_id":"28917",
			"view":"4514",
			"top":"4",
			"title":"AC Python clean solution using stack 76ms",
			"vote":"44",
			"content":"    def largestRectangleArea(self, height):\\n        height.append(0)\\n        stack = [-1]\\n        ans = 0\\n        for i in xrange(len(height)):\\n            while height[i] < height[stack[-1]]:\\n                h = height[stack.pop()]\\n                w = i - stack[-1] - 1\\n                ans = max(ans, h * w)\\n            stack.append(i)\\n        height.pop()\\n        return ans\\n\\n\\n\\n    # 94 / 94 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 76 ms\\n    # 97.34%\\n\\nThe stack maintain the indexes of buildings with ascending height. Before adding a new building pop the building who is taller than the new one. The building popped out represent the height of a rectangle with the new building as the right boundary and the current stack top as the left boundary. Calculate its area and update ans of maximum area. Boundary is handled using dummy buildings."
		},
		{
			"lc_ans_id":"28959",
			"view":"7684",
			"top":"5",
			"title":"My concise code (20ms, stack based, O(n)), one trick used",
			"vote":"35",
			"content":"The idea is simple, use a stack to save the index of each vector entry in a ascending order; once the current entry is smaller than the one with the index s.top(), then that means the rectangle with the height height[s.top()] ends at the current position, so calculate its area and update the maximum. \\nThe only trick I use to avoid checking whether the stack is empty (due to pop) and also avoiding emptying the stack at the end (i.e. after going through the vector, s is not empty and we have to consider those in the stack) is to put a dummy \"0\" at the beginning of vector \"height\" and the end of \"height\": the first one makes sure the stack will never be empty (since all the height entries are >=0) and the last one will flush all the remaining non-zero entries of the stack at the end of \"for\" iteration. This trick helps us keep the code concise.\\n\\n    class Solution {\\n    public:\\n        int largestRectangleArea(vector<int>& height) {\\n            height.insert(height.begin(),0); // dummy \"0\" added to make sure stack s will never be empty\\n            height.push_back(0); // dummy \"0\" added to clear the stack at the end\\n            int len = height.size();\\n            int i, res = 0, idx;\\n            stack<int> s; // stack to save \"height\" index\\n            s.push(0); // index to the first dummy \"0\"\\n            for(i=1;i<len;i++)\\n            {\\n                while(height[i]<height[idx = s.top()]) // if the current entry is out of order\\n                {\\n                    s.pop();\\n                    res = max(res, height[idx] * (i-s.top()-1) ); // note how the width is calculated, use the previous index entry\\n                }\\n                s.push(i);\\n            }\\n            height.erase(height.begin()); // remove two dummy \"0\"\\n            height.pop_back();\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"29010",
			"view":"12021",
			"top":"6",
			"title":"My modified answer from GeeksforGeeks, in JAVA",
			"vote":"28",
			"content":"I was stuck and took an eye on Geeks4Geeks. I got the idea and tried to figure it out by myself...\\nIt takes me a lot of time to make it through....\\n\\n**EDITED:** Now it is pretty concise....\\n\\n    public class Solution {\\n    public int largestRectangleArea(int[] height) {\\n        if (height==null) return 0;//Should throw exception\\n        if (height.length==0) return 0;\\n        \\n        Stack<Integer> index= new Stack<Integer>();\\n        index.push(-1);\\n        int max=0;\\n        \\n        for  (int i=0;i<height.length;i++){\\n                //Start calculate the max value\\n            while (index.peek()>-1)\\n                if (height[index.peek()]>height[i]){\\n                    int top=index.pop();                    \\n                    max=Math.max(max,height[top]*(i-1-index.peek()));  \\n                }else break;\\n                \\n            index.push(i);\\n        }\\n        while(index.peek()!=-1){\\n        \\tint top=index.pop();\\n            max=Math.max(max,height[top]*(height.length-1-index.peek()));\\n        }        \\n        return max;\\n    }\\n}"
		},
		{
			"lc_ans_id":"29018",
			"view":"2619",
			"top":"7",
			"title":"AC clean Java solution using stack",
			"vote":"26",
			"content":"    public int largestRectangleArea(int[] h) {\\n      int n = h.length, i = 0, max = 0;\\n        \\n      Stack<Integer> s = new Stack<>();\\n        \\n      while (i < n) {\\n        // as long as the current bar is shorter than the last one in the stack\\n        // we keep popping out the stack and calculate the area based on\\n        // the popped bar\\n        while (!s.isEmpty() && h[i] < h[s.peek()]) {\\n          // tricky part is how to handle the index of the left bound\\n          max = Math.max(max, h[s.pop()] * (i - (s.isEmpty() ? 0 : s.peek() + 1)));\\n        }\\n        // put current bar's index to the stack\\n        s.push(i++);\\n      }\\n        \\n      // finally pop out any bar left in the stack and calculate the area based on it\\n      while (!s.isEmpty()) {\\n        max = Math.max(max, h[s.pop()] * (n - (s.isEmpty() ? 0 : s.peek() + 1)));\\n      }\\n        \\n      return max;\\n    }"
		},
		{
			"lc_ans_id":"28953",
			"view":"1671",
			"top":"8",
			"title":"Java O(n) left/right arrays solution, 4ms beats 96%",
			"vote":"13",
			"content":"Basically, you run 3 passes:\\n\\n1. Scan from left to right to compute left[], which represents the left most boundary of current height.\\n\\n2. Scan from right to left to compute right[], which represents the right most boundary of current height.\\n\\n3. Scan from left to right again to compute rectangle area based on the height of that each position.\\n\\n\\n----------\\n\\n\\n    public class Solution {\\n        public int largestRectangleArea(int[] heights) {\\n            // validate input\\n            if(heights == null || heights.length == 0) {\\n                return 0;\\n            }\\n            \\n            // init\\n            int n = heights.length;\\n            int[] left = new int[n];\\n            int[] right = new int[n];\\n            int result = 0;\\n            \\n            // build left\\n            left[0] = 0;\\n            for(int i = 1; i < n; i++) {\\n                int currentLeft = i-1;\\n                while(currentLeft >= 0 && heights[currentLeft] >= heights[i]) {\\n                    currentLeft = left[currentLeft]-1;\\n                }\\n                    \\n                left[i] = currentLeft+1;\\n            }\\n            \\n            // build right\\n            right[n-1] = n-1;\\n            for(int i = n-2; i >= 0; i--) {\\n                int currentRight = i+1;\\n                while(currentRight < n && heights[i] <= heights[currentRight]) {\\n                    currentRight = right[currentRight]+1;\\n                }\\n                    \\n                right[i] = currentRight-1;\\n            }\\n            \\n            // compare height\\n            for(int i = 0; i < n; i++) {\\n                result = Math.max(result, (right[i]-left[i]+1)*heights[i]);\\n            }\\n            \\n            // return\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"28954",
			"view":"2809",
			"top":"9",
			"title":"Share my 2ms Java solution. Beats 100% Java submissions",
			"vote":"13",
			"content":"    public class Solution {\\n        public int largestRectangleArea(int[] heights) {\\n            if (heights == null || heights.length == 0) return 0;\\n            return getMax(heights, 0, heights.length);\\n        }    \\n        int getMax(int[] heights, int s, int e) {\\n            if (s + 1 >= e) return heights[s];\\n            int min = s;\\n            boolean sorted = true;\\n            for (int i = s; i < e; i++) {\\n                if (i > s && heights[i] < heights[i - 1]) sorted = false;\\n                if (heights[min] > heights[i]) min = i;\\n            }\\n            if (sorted) {\\n                int max = 0;\\n                for (int i = s; i < e; i++) {\\n                    max = Math.max(max, heights[i] * (e - i));\\n                }\\n                return max;\\n            }\\n            int left = (min > s) ? getMax(heights, s, min) : 0;\\n            int right = (min < e - 1) ? getMax(heights, min + 1, e) : 0;\\n            return Math.max(Math.max(left, right), (e - s) * heights[min]);\\n        }\\n    }"
		}
	],
	"id":"84",
	"title":"Largest Rectangle in Histogram",
	"content":"<p>\r\nGiven <i>n</i> non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.\r\n</p>\r\n\r\n<p>\r\n<img src=\"/static/images/problemset/histogram.png\" /><br />\r\n<p style=\"font-size: 11px\">Above is a histogram where width of each bar is 1, given height = <code>[2,1,5,6,2,3]</code>.</p>\r\n</p>\r\n\r\n<p>\r\n<img src=\"/static/images/problemset/histogram_area.png\" /><br />\r\n<p style=\"font-size: 11px\">The largest rectangle is shown in the shaded area, which has area = <code>10</code> unit.</p>\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven heights = <code>[2,1,5,6,2,3]</code>,<br />\r\nreturn <code>10</code>.\r\n</p>",
	"frequency":"386",
	"ac_num":"109615"
}