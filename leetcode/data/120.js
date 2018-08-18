{
	"difficulty":"2",
	"submit_num":"359066",
	"show_id":"120",
	"leetcode_id":"120",
	"answers":[
		{
			"lc_ans_id":"38730",
			"view":"45552",
			"top":"0",
			"title":"DP Solution for Triangle",
			"vote":"351",
			"content":"This problem is quite well-formed in my opinion. The triangle has a tree-like structure, which would lead people to think about traversal algorithms such as DFS. However, if you look closely, you would notice that the adjacent nodes always share a 'branch'. In other word, there are **overlapping subproblems**. Also, suppose x and y are 'children' of k. Once minimum paths from x and y to the bottom are known, the minimum path starting from k can be decided in O(1), that is **optimal substructure**. Therefore, dynamic programming would be the best solution to this problem in terms of time complexity.\\n\\nWhat I like about this problem even more is that the difference between 'top-down' and 'bottom-up' DP can be 'literally' pictured in the input triangle. For 'top-down' DP, starting from the node on the very top, we recursively find the minimum path sum of each node. When a path sum is calculated, we store it in an array (memoization); the next time we need to calculate the path sum of the same node, just retrieve it from the array. However, you will need a cache that is at least the same size as the input triangle itself to store the pathsum, which takes O(N^2) space. With some clever thinking, it might be possible to release some of the memory that will never be used after a particular point, but the order of the nodes being processed is not straightforwardly seen in a recursive solution, so deciding which part of the cache to discard can be a hard job.\\n\\n'Bottom-up' DP, on the other hand, is very straightforward: we start from the nodes on the bottom row; the min pathsums for these nodes are the values of the nodes themselves. From there, the min pathsum at the ith node on the kth row would be the lesser of the pathsums of its two children plus the value of itself, i.e.:\\n\\n    minpath[k][i] = min( minpath[k+1][i], minpath[k+1][i+1]) + triangle[k][i];\\n\\nOr even better, since the row minpath[k+1] would be useless after minpath[k] is computed, we can simply set minpath as a 1D array, and iteratively update itself:\\n\\n    For the kth level:\\n    minpath[i] = min( minpath[i], minpath[i+1]) + triangle[k][i]; \\n\\nThus, we have the following solution\\n\\n    int minimumTotal(vector<vector<int> > &triangle) {\\n        int n = triangle.size();\\n        vector<int> minlen(triangle.back());\\n        for (int layer = n-2; layer >= 0; layer--) // For each layer\\n        {\\n            for (int i = 0; i <= layer; i++) // Check its every 'node'\\n            {\\n                // Find the lesser of its two children, and sum the current value in the triangle with it.\\n                minlen[i] = min(minlen[i], minlen[i+1]) + triangle[layer][i]; \\n            }\\n        }\\n        return minlen[0];\\n    }"
		},
		{
			"lc_ans_id":"38724",
			"view":"12379",
			"top":"1",
			"title":"7 lines neat Java Solution",
			"vote":"78",
			"content":"    public int minimumTotal(List<List<Integer>> triangle) {\\n        int[] A = new int[triangle.size()+1];\\n        for(int i=triangle.size()-1;i>=0;i--){\\n            for(int j=0;j<triangle.get(i).size();j++){\\n                A[j] = Math.min(A[j],A[j+1])+triangle.get(i).get(j);\\n            }\\n        }\\n        return A[0];\\n    }"
		},
		{
			"lc_ans_id":"38732",
			"view":"12426",
			"top":"2",
			"title":"My 8 line DP Java code(4 meaningful lines) with O(1) space",
			"vote":"65",
			"content":"    public class Solution {\\n        public int minimumTotal(List<List<Integer>> triangle) {\\n            for(int i = triangle.size() - 2; i >= 0; i--)\\n                for(int j = 0; j <= i; j++)\\n                    triangle.get(i).set(j, triangle.get(i).get(j) + Math.min(triangle.get(i + 1).get(j), triangle.get(i + 1).get(j + 1)));\\n            return triangle.get(0).get(0);\\n        }\\n    }\\n\\nThe idea is simple. \\n\\n1) Go from bottom to top.\\n\\n2) We start form the row above the bottom row [size()-2].\\n\\n3) Each number add the smaller number of two numbers that below it. \\n\\n4) And finally we get to the top we the smallest sum."
		},
		{
			"lc_ans_id":"38737",
			"view":"4859",
			"top":"3",
			"title":"Bottom Up 5 line C++ Solution",
			"vote":"27",
			"content":"    class Solution {\\n    public:\\n        int minimumTotal(vector<vector<int> > &triangle) \\n        {\\n            vector<int> mini = triangle[triangle.size()-1];\\n            for ( int i = triangle.size() - 2; i>= 0 ; --i )\\n                for ( int j = 0; j < triangle[i].size() ; ++ j )\\n                    mini[j] = triangle[i][j] + min(mini[j],mini[j+1]);\\n            return mini[0];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"38735",
			"view":"5085",
			"top":"4",
			"title":"Python easy to understand solutions (top-down, bottom-up).",
			"vote":"26",
			"content":"        \\n    # O(n*n/2) space, top-down \\n    def minimumTotal1(self, triangle):\\n        if not triangle:\\n            return \\n        res = [[0 for i in xrange(len(row))] for row in triangle]\\n        res[0][0] = triangle[0][0]\\n        for i in xrange(1, len(triangle)):\\n            for j in xrange(len(triangle[i])):\\n                if j == 0:\\n                    res[i][j] = res[i-1][j] + triangle[i][j]\\n                elif j == len(triangle[i])-1:\\n                    res[i][j] = res[i-1][j-1] + triangle[i][j]\\n                else:\\n                    res[i][j] = min(res[i-1][j-1], res[i-1][j]) + triangle[i][j]\\n        return min(res[-1])\\n        \\n    # Modify the original triangle, top-down\\n    def minimumTotal2(self, triangle):\\n        if not triangle:\\n            return \\n        for i in xrange(1, len(triangle)):\\n            for j in xrange(len(triangle[i])):\\n                if j == 0:\\n                    triangle[i][j] += triangle[i-1][j]\\n                elif j == len(triangle[i])-1:\\n                    triangle[i][j] += triangle[i-1][j-1]\\n                else:\\n                    triangle[i][j] += min(triangle[i-1][j-1], triangle[i-1][j])\\n        return min(triangle[-1])\\n        \\n    # Modify the original triangle, bottom-up\\n    def minimumTotal3(self, triangle):\\n        if not triangle:\\n            return \\n        for i in xrange(len(triangle)-2, -1, -1):\\n            for j in xrange(len(triangle[i])):\\n                triangle[i][j] += min(triangle[i+1][j], triangle[i+1][j+1])\\n        return triangle[0][0]\\n    \\n    # bottom-up, O(n) space\\n    def minimumTotal(self, triangle):\\n        if not triangle:\\n            return \\n        res = triangle[-1]\\n        for i in xrange(len(triangle)-2, -1, -1):\\n            for j in xrange(len(triangle[i])):\\n                res[j] = min(res[j], res[j+1]) + triangle[i][j]\\n        return res[0]"
		},
		{
			"lc_ans_id":"38831",
			"view":"3077",
			"top":"5",
			"title":"Java solution -- dynamic programming",
			"vote":"23",
			"content":"    public int minimumTotal(List<List<Integer>> trgl) {\\n        int sz = trgl.size();\\n        int[] results = new int[sz+1];\\n        \\n        for(int i=sz-1; i>=0; i--) {\\n            List<Integer> tmp = trgl.get(i);\\n            \\n            for(int j=0; j<tmp.size(); j++) {\\n                results[j] = Math.min(results[j], results[j+1]) + tmp.get(j);\\n            }\\n        }\\n        return results[0];\\n    }"
		},
		{
			"lc_ans_id":"38918",
			"view":"1206",
			"top":"6",
			"title":"C++ top-down and bottom-up solutions.",
			"vote":"17",
			"content":"        \\n    // top-down \\n    int minimumTotal1(vector<vector<int>>& triangle) {\\n        vector<int> res(triangle.size(), triangle[0][0]);\\n        for (unsigned int i = 1; i < triangle.size(); i++) \\n            for (int j = i; j >= 0; j--) {\\n                if (j == 0)\\n                    res[0] += triangle[i][j];\\n                else if (j == i)\\n                    res[j] = triangle[i][j] + res[j-1];\\n                else \\n                    res[j] = triangle[i][j] + min(res[j-1], res[j]);\\n            }\\n        return *min_element(res.begin(), res.end());\\n    }\\n    \\n    // bottom-up\\n    int minimumTotal(vector<vector<int>>& triangle) {\\n        vector<int> res = triangle.back();\\n        for (int i = triangle.size()-2; i >= 0; i--) \\n            for (unsigned int j = 0; j <= i; j++) \\n                res[j] = triangle[i][j] + min(res[j], res[j+1]);\\n        return res[0];\\n    }"
		},
		{
			"lc_ans_id":"38827",
			"view":"3995",
			"top":"7",
			"title":"One-liner in Python",
			"vote":"13",
			"content":"**Solution**\\n\\n    def minimumTotal(self, t):\\n        return reduce(lambda a,b:[f+min(d,e)for d,e,f in zip(a,a[1:],b)],t[::-1])[0]\\n\\n---\\n\\n**Explanation**\\n\\nStarting with the bottom row, I move upwards, always combining the current row and the next upper row. At the end, I have combined everything into the top row and simply return its only element. Here's a longer version with meaningful variable names:\\n\\n    def minimumTotal(self, triangle):\\n        def combine_rows(lower_row, upper_row):\\n            return [upper + min(lower_left, lower_right)\\n                    for upper, lower_left, lower_right in\\n                    zip(upper_row, lower_row, lower_row[1:])]\\n        return reduce(combine_rows, triangle[::-1])[0]"
		},
		{
			"lc_ans_id":"38857",
			"view":"2155",
			"top":"8",
			"title":"1 ms Java dp solution beats 99.91% O(n) extra space without modifying the triangle",
			"vote":"10",
			"content":"The idea is to storage the min path sum so far at current level in the array dp[] of max length triangle.size(), then deduce the array values at the next level. When it reaches the triangle.size(), return the minimum of the dp[] array.\\n\\n    public int minimumTotal(List<List<Integer>> triangle) {\\n\\t\\t\\tif (triangle.size() == 0)\\n\\t\\t\\t\\treturn 0;\\n\\t\\t\\tif (triangle.size() == 1)\\n\\t\\t\\t\\treturn triangle.get(0).get(0);\\n\\n\\t\\t\\tint[] dp = new int[triangle.size()];\\n\\t\\t\\tdp[0] = triangle.get(0).get(0);\\n\\t\\t\\treturn minimumTotal(triangle, dp, 1);\\n\\t\\t}\\n\\n\\t\\tpublic int minimumTotal(List<List<Integer>> triangle, int[] dp, int lvlidx) {\\n\\t\\t\\t/**\\n\\t\\t\\t * dp: dp[i]_lvlidx = the min path sum up to current level and up to\\n\\t\\t\\t * index i\\n\\t\\t\\t * \\n\\t\\t\\t * dp[0]_lvlidx = this_level_list[0] + dp[0]_(lvlidx-1);\\n\\t\\t\\t * dp[end]_lvlidx = this_level_list[end] + dp[end-1]_(lvlidx-1);\\n\\t\\t\\t * \\n\\t\\t\\t * dp[i]_lvlidx = this_level_list[i] + min{ dp[i-1]_(lvlidx-1),\\n\\t\\t\\t * dp[i]_(lvlidx-1) };\\n\\t\\t\\t */\\n\\n\\t\\t\\tList<Integer> list = triangle.get(lvlidx);\\n\\t\\t\\tint pre = dp[0], temp;\\n\\t\\t\\tdp[0] += list.get(0);\\n\\t\\t\\tfor (int i = 1; i < lvlidx; i++) {\\n\\t\\t\\t\\ttemp = dp[i];\\n\\t\\t\\t\\tdp[i] = list.get(i) + Math.min(pre, dp[i]);\\n\\t\\t\\t\\tpre = temp;\\n\\t\\t\\t}\\n\\t\\t\\tdp[lvlidx] = pre + list.get(lvlidx);\\n\\n\\t\\t\\tif (lvlidx + 1 == triangle.size()) {\\n\\t\\t\\t\\tint res = dp[0];\\n\\t\\t\\t\\tfor (int i = 1; i <= lvlidx; i++)\\n\\t\\t\\t\\t\\tres = Math.min(res, dp[i]);\\n\\t\\t\\t\\treturn res;\\n\\t\\t\\t}\\n\\n\\t\\t\\treturn minimumTotal(triangle, dp, lvlidx + 1);\\n\\t\\t}"
		},
		{
			"lc_ans_id":"38943",
			"view":"941",
			"top":"9",
			"title":"My C++ code (Bottom up DP, 8ms)",
			"vote":"10",
			"content":"Just do bottom up DP, it is easier and cleaner than top-down DP.\\n\\n    class Solution {\\n    \\n        public:\\n            int minimumTotal(vector<vector<int>>& triangle) {\\n                for(int i= triangle.size()-2; i>=0; --i)\\n                    for(int j=0; j<triangle[i].size();++j)\\n                        triangle[i][j] += min(triangle[i+1][j],triangle[i+1][j+1]);\\n                return triangle[0][0];        \\n            }\\n        };\\n\\n// another version, without modifying the input array\\n\\n    class Solution {\\n    public:\\n        int minimumTotal(vector<vector<int>>& triangle) {\\n            vector<int> res(triangle[triangle.size()-1]);\\n            for(int i= triangle.size()-2; i>=0; --i)\\n                for(int j=0; j<triangle[i].size();++j)\\n                    res[j] = triangle[i][j] + min(res[j],res[j+1]);\\n            return res[0];        \\n        }\\n    };"
		}
	],
	"id":"120",
	"title":"Triangle",
	"content":"<p>Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.</p>\r\n\r\n<p>\r\nFor example, given the following triangle<br />\r\n<pre>\r\n[\r\n     [<font color=\"red\">2</font>],\r\n    [<font color=\"red\">3</font>,4],\r\n   [6,<font color=\"red\">5</font>,7],\r\n  [4,<font color=\"red\">1</font>,8,3]\r\n]\r\n</pre>\r\n</p>\r\n<p>\r\nThe minimum path sum from top to bottom is <code>11</code> (i.e., <font color=\"red\">2</font> + <font color=\"red\">3</font> + <font color=\"red\">5</font> + <font color=\"red\">1</font> = 11).\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br />\r\nBonus point if you are able to do this using only <i>O</i>(<i>n</i>) extra space, where <i>n</i> is the total number of rows in the triangle.\r\n</p>",
	"frequency":"451",
	"ac_num":"124379"
}