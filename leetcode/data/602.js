{
	"difficulty":"1",
	"submit_num":"27123",
	"show_id":"624",
	"leetcode_id":"624",
	"answers":[
		{
			"lc_ans_id":"104613",
			"view":"6211",
			"top":"0",
			"title":"Java Solution, Min and Max",
			"vote":"34",
			"content":"```\\npublic class Solution {\\n    public int maxDistance(int[][] arrays) {\\n        int result = Integer.MIN_VALUE;\\n        int max = arrays[0][arrays[0].length - 1];\\n        int min = arrays[0][0];\\n        \\n        for (int i = 1; i < arrays.length; i++) {\\n            result = Math.max(result, Math.abs(arrays[i][0] - max));\\n            result = Math.max(result, Math.abs(arrays[i][arrays[i].length - 1] - min));\\n            max = Math.max(max, arrays[i][arrays[i].length - 1]);\\n            min = Math.min(min, arrays[i][0]);\\n        }\\n        \\n        return result;\\n    }\\n}\\n```\\nLeetCode updated the input to List.\\n```\\npublic class Solution {\\n    public int maxDistance(List<List<Integer>> arrays) {\\n        int result = Integer.MIN_VALUE;\\n        int max = arrays.get(0).get(arrays.get(0).size() - 1);\\n        int min = arrays.get(0).get(0);\\n        \\n        for (int i = 1; i < arrays.size(); i++) {\\n            result = Math.max(result, Math.abs(arrays.get(i).get(0) - max));\\n            result = Math.max(result, Math.abs(arrays.get(i).get(arrays.get(i).size() - 1) - min));\\n            max = Math.max(max, arrays.get(i).get(arrays.get(i).size() - 1));\\n            min = Math.min(min, arrays.get(i).get(0));\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104651",
			"view":"2085",
			"top":"1",
			"title":"Share My O(n) solution",
			"vote":"9",
			"content":"```\\npublic int maxDistance(int[][] arrays) {\\n\\t\\tif (arrays == null || arrays.length == 0) return 0;\\n\\t\\t\\n\\t\\tint diff = Integer.MIN_VALUE;\\n\\t\\tint m = arrays.length;\\n\\t\\t\\n\\t\\tint min =  arrays[0][0], max = arrays[0][arrays[0].length-1];\\n\\t\\tfor (int i = 1; i < m; i++) {\\n\\t\\t\\tint head = arrays[i][0];\\n\\t\\t\\tint tail = arrays[i][arrays[i].length-1];\\n\\t\\t\\tdiff = Math.max(Math.abs(max-head), diff);\\n                        diff = Math.max(Math.abs(tail-min), diff);\\n\\t\\t\\tmax = Math.max(tail, max);\\n\\t\\t\\tmin = Math.min(head, min);\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn diff;\\n    }\\n```"
		},
		{
			"lc_ans_id":"104623",
			"view":"707",
			"top":"2",
			"title":"5-liner C++ and Python O(m) simple solution, O(1) space",
			"vote":"8",
			"content":"Because each array is sorted, just need to consider the first and last elements in each array.\\n\\nWhen you scan another array `a`, the answer `maxDif` is simply given by\\n```cpp\\nmaxDif = max(maxDif, max(a.back()-curMin, curMax-a.front()));\\n```\\nwhere `curMin` and `curMax` are current min and max values in all previous arrays.\\n```cpp\\n    int maxDistance(vector<vector<int>>& arrays) {\\n        int maxDif = 0, curMin = 10000, curMax = -10000;\\n        for (auto& a : arrays) {\\n            maxDif = max(maxDif, max(a.back()-curMin, curMax-a.front()));\\n            curMin = min(curMin, a.front()), curMax = max(curMax, a.back());\\n        }\\n        return maxDif;\\n    }\\n```\\nPython:\\n```py\\n    def maxDistance(self, arrays):\\n        res, curMin, curMax = 0, 10000, -10000\\n        for a in arrays :\\n            res = max(res, max(a[-1]-curMin, curMax-a[0]))\\n            curMin, curMax = min(curMin, a[0]), max(curMax, a[-1])\\n        return res\\n```"
		},
		{
			"lc_ans_id":"104659",
			"view":"1489",
			"top":"3",
			"title":"C++ O(n)",
			"vote":"8",
			"content":"```\\nclass Solution {\\npublic:\\n    int maxDistance(vector<vector<int>>& arrays) {\\n        int left = arrays[0][0], right = arrays[0].back(), ans = 0;\\n        for(int i = 1; i < arrays.size(); i++)\\n        {\\n            ans = max(ans, max(abs(arrays[i][0] - right), abs(arrays[i].back() - left)));\\n            left = min(left, arrays[i][0]);\\n            right = max(right, arrays[i].back());\\n        }\\n        return ans;\\n    }\\n};"
		},
		{
			"lc_ans_id":"104615",
			"view":"1447",
			"top":"4",
			"title":"Straightforward AC Java Solution with Explanation",
			"vote":"6",
			"content":"The max distance must exist in one of these three differences, 1. difference between maximum and minimum, or 2. difference between 2nd maximum(the num that is only smaller than the maximum) or minimum, or 3. difference between maximum or 2nd minimum(the num that is only bigger than the minimum). Therefore, we just need to find these numbers.\\n\\nBesides, the link below is a more efficient solution by shawngao\\n[https://discuss.leetcode.com/topic/92859/java-solution-min-and-max](https://discuss.leetcode.com/topic/92859/java-solution-min-and-max)\\n\\n```\\npublic class Solution {\\n    public int maxDistance(int[][] a) {\\n        int min = Integer.MAX_VALUE; // max\\n        int max = Integer.MIN_VALUE; // min\\n        int k = 0, m =0;\\n        for(int i =0;i<a.length;i++){\\n            if(a[i][0]<min){\\n                min = a[i][0];\\n                k = i; \\n            }\\n            if(a[i][a[i].length-1]>max){\\n                max = a[i][a[i].length-1];\\n                m = i;\\n            }\\n        }\\n        if(k!=m) return max - min; // if max and min not in same array then return diff\\n        int ndMin = Integer.MAX_VALUE; // 2nd min\\n        for(int i = 0;i<a.length;i++){\\n            if(i==k) continue; // exclude the array with min\\n            ndMin = Math.min(ndMin,a[i][0]);\\n        }\\n        int ndMax = Integer.MIN_VALUE; // 2nd max\\n        for(int i = 0;i<a.length;i++){\\n            if(i==m) continue; // exclude the array with max\\n            ndMax = Math.max(ndMax,a[i][a[i].length-1]);\\n        }\\n        return Math.max(max - ndMin,ndMax - min);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104658",
			"view":"524",
			"top":"5",
			"title":"Short Python",
			"vote":"4",
			"content":"Since all arrays are sorted, just find the ```MAX``` and ```MIN``` from the head and the tail. Remember keep track of the index of ```MAX``` and ```MIN``` since the two numbers can **NOT** be in the same array.\\n```\\nclass Solution(object):\\n    def maxDistance(self, arrays):\\n        \"\"\"\\n        :type arrays: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        m = len(arrays)\\n        MAX, max_i = max([(arrays[i][-1], i) for i in range(m)])\\n        MIN, min_i = min([(arrays[i][0], i) for i in range(m)])\\n        a = max(abs(arrays[i][0] - MAX) for i in range(m) if i != max_i)\\n        b = max(abs(arrays[i][-1] - MIN) for i in range(m) if i != min_i)\\n        return max(a, b)\\n```"
		},
		{
			"lc_ans_id":"104646",
			"view":"234",
			"top":"6",
			"title":"O(N) time O(1) space one pass w/ short C++ & Python solutions",
			"vote":"3",
			"content":"we can treat each array as an interval, to find the max abs diff, we just need to compare the start and end with each other\\n\\npython solution:\\n```\\nclass Solution(object):\\n    def maxDistance(self, arrays):\\n        result, start, end = 0, arrays[0][0], arrays[0][-1]\\n        for i in xrange(1, len(arrays)):\\n            result = max(result, abs(arrays[i][0] - end))\\n            result = max(result, abs(arrays[i][-1] - start))\\n            start = min(start, arrays[i][0])\\n            end = max(end, arrays[i][-1])\\n        return result\\n```\\nc++ solution:\\n```\\nclass Solution {\\npublic:\\n    int maxDistance(vector<vector<int>>& arrays) {\\n        int result = 0, start = arrays[0][0], end = arrays[0].back();\\n        for ( int i = 1, n = arrays.size(); i < n; ++i ) {\\n            result = max(result, abs(arrays[i].back() - start));\\n            result = max(result, abs(arrays[i][0] - end));\\n            start = min(start, arrays[i][0]);\\n            end = max(end, arrays[i].back());\\n        }\\n        return result;\\n    }\\n};\\n```\\nDiscuss: This problem is tagged with Hash Table, but I don't find a proper way to do it, only c++ seems ok because it has sorted map... this solution is a bit slow and cost more space\\n```\\nclass Solution {\\npublic:\\n    int maxDistance(vector<vector<int>>& arrays) {\\n        int result = 0;\\n        map<int, int> starts;\\n        for ( auto && A : arrays )\\n            ++starts[A[0]];\\n        for ( auto && A : arrays ) {\\n            if ( --starts[A[0]] == 0 )\\n                starts.erase(A[0]);\\n            result = max(result, abs(A[0] - starts.begin()->first));\\n            result = max(result, abs(A.back() - starts.begin()->first));\\n            ++starts[A[0]];\\n        }\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"104611",
			"view":"72",
			"top":"7",
			"title":"Python solution with detailed explanation",
			"vote":"1",
			"content":"**Maximum Distance in Arrays** https://leetcode.com/problems/maximum-distance-in-arrays/description/\\n\\n**Linear time and constant memory algorithm**\\n* We need to find first two minimum and first two maximum numbers to solve this problem. In addition, we also need the indices to which these minimum and maximum numbers belong to. Once we have this information, we can check all the four possible pairs while discounting the ones where min and max belong to the same index.\\n* There is another simpler method - initialize the min and max as the first and last element of the first array.\\n* Now iterate from element 1 to end of array and test for a solution using min and last element and max and first element. Then update min and max.\\n* Time is O(N) and Space is O(1).\\n```\\nclass Solution:\\n    def maxDistance(self, arrays):\\n        \"\"\"\\n        :type arrays: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        minn, maxn = arrays[0][0], arrays[0][-1]\\n        result = float('-inf')\\n        for i in range(1, len(arrays)):\\n            result = max(result, abs(minn-arrays[i][-1]))\\n            result = max(result, abs(maxn-arrays[i][0]))\\n            minn, maxn = min(arrays[i][0], minn), max(arrays[i][-1], maxn)\\n        return result\\n```"
		},
		{
			"lc_ans_id":"104619",
			"view":"94",
			"top":"8",
			"title":"Python O(n) Solution",
			"vote":"1",
			"content":"    def maxDistance(self, arrays):\\n        cur_min, cur_max = arrays[0][0], arrays[0][-1]\\n        res = 0 \\n        for i in range(1, len(arrays)):\\n            res = max(res,max(abs(arrays[i][0] - cur_max), abs(arrays[i][-1] - cur_min)))\\n            cur_min = min(cur_min, arrays[i][0])\\n            cur_max = max(cur_max, arrays[i][-1])\\n        return res"
		},
		{
			"lc_ans_id":"104620",
			"view":"154",
			"top":"9",
			"title":"Python simple solution",
			"vote":"1",
			"content":"```\\ndef maxDistance(self, arrays):\\n        a, b = heapq.nsmallest(2, [(l[0], i) for i, l in enumerate(arrays)])\\n        d, c = heapq.nlargest(2, [(l[-1], i) for i, l in enumerate(arrays)])\\n        return d[0] - a[0] if d[1] != a[1] else max(d[0] - b[0], c[0] - a[0])"
		}
	],
	"id":"602",
	"title":"Maximum Distance in Arrays",
	"content":"<p>\r\nGiven <code>m</code> arrays, and each array is sorted in ascending order. Now you can pick up two integers from two different arrays (each array picks one) and calculate the distance. We define the distance between two integers <code>a</code> and <code>b</code> to be their absolute difference <code>|a-b|</code>. Your task is to find the maximum distance.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n[[1,2,3],\r\n [4,5],\r\n [1,2,3]]\r\n<b>Output:</b> 4\r\n<b>Explanation:</b> \r\nOne way to reach the maximum distance 4 is to pick 1 in the first or third array and pick 5 in the second array.\r\n</pre>\r\n</p>\r\n\t\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>Each given array will have at least 1 number. There will be at least two non-empty arrays.</li>\r\n<li>The total number of the integers in <b>all</b> the <code>m</code> arrays will be in the range of [2, 10000].</li>\r\n<li>The integers in the <code>m</code> arrays will be in the range of [-10000, 10000].</li>\r\n</ol>\r\n</p>",
	"frequency":"124",
	"ac_num":"9454"
}