{
	"difficulty":"2",
	"submit_num":"31808",
	"show_id":"646",
	"leetcode_id":"646",
	"answers":[
		{
			"lc_ans_id":"105602",
			"view":"6915",
			"top":"0",
			"title":"easy dp",
			"vote":"25",
			"content":"```\\n    public int findLongestChain(int[][] pairs) {\\n        if (pairs == null || pairs.length == 0) return 0;\\n        Arrays.sort(pairs, (a, b) -> (a[0] - b[0]));\\n        int[] dp = new int[pairs.length];\\n        Arrays.fill(dp, 1);\\n        for (int i = 0; i < dp.length; i++) {\\n            for (int j = 0; j < i; j++) {\\n                dp[i] = Math.max(dp[i], pairs[i][0] > pairs[j][1]? dp[j] + 1 : dp[j]);\\n            }\\n        }\\n        return dp[pairs.length - 1];\\n    }\\n```"
		},
		{
			"lc_ans_id":"105607",
			"view":"2321",
			"top":"1",
			"title":"4-Liner Python Greedy",
			"vote":"19",
			"content":"    def findLongestChain(self, pairs):\\n        cur, res = float('-inf'), 0\\n        for p in sorted(pairs, key=lambda x: x[1]):\\n            if cur < p[0]: cur, res = p[1], res + 1\\n        return res"
		},
		{
			"lc_ans_id":"105610",
			"view":"6787",
			"top":"2",
			"title":"Java O(nlog(n)) Time O(1) Space",
			"vote":"15",
			"content":"This is equivalent to interval scheduling problem.\\n\\n```\\npublic int findLongestChain(int[][] pairs) {\\n    Arrays.sort(pairs, (a,b) -> a[1] - b[1]);\\n    int sum = 0, n = pairs.length, i = -1;\\n    while (++i < n) {\\n        sum++;\\n        int curEnd = pairs[i][1];\\n        while (i+1 < n && pairs[i+1][0] <= curEnd) i++;\\n    }\\n    return sum;\\n}\\n```"
		},
		{
			"lc_ans_id":"105617",
			"view":"2792",
			"top":"3",
			"title":"[C++] Clean Code",
			"vote":"10",
			"content":"1. sort the pairs by their end in increasing order;\\n2. at any point, choose the pair that start after the tail end, then use it as the new tail;\\n\\n```\\nclass Solution {\\npublic:\\n    int findLongestChain(vector<vector<int>>& pairs) {\\n        sort(pairs.begin(), pairs.end(), cmp);\\n        int cnt = 0;\\n        vector<int>& pair = pairs[0];\\n        for (int i = 0; i < pairs.size(); i++) {\\n            if (i == 0 || pairs[i][0] > pair[1]) {\\n                pair = pairs[i];\\n                cnt++;\\n            }\\n        }\\n        return cnt;\\n    }\\n\\nprivate:\\n    static bool cmp(vector<int>& a, vector<int>&b) {\\n        return a[1] < b[1] || a[1] == b[1] && a[0] < b[0];\\n    }\\n};\\n```\\nIn fact the comparator does not even need to compare the begin:\\n```\\nclass Solution {\\npublic:\\n    int findLongestChain(vector<vector<int>>& pairs) {\\n        sort(pairs.begin(), pairs.end(), cmp);\\n        int cnt = 0;\\n        for (int i = 0, j = 0; j < pairs.size(); j++) {\\n            if (j == 0 || pairs[i][1] < pairs[j][0]) {\\n                cnt++;\\n                i = j;\\n            }\\n        }\\n        return cnt;\\n    }\\n\\nprivate:\\n    static bool cmp(vector<int>& a, vector<int>&b) {\\n        return a[1] < b[1];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"105649",
			"view":"795",
			"top":"4",
			"title":"Earliest Deadline first algorithm (greedy). Same as Maximum jobs we can accomplish.",
			"vote":"8",
			"content":"Consider pairs as jobs, with [start time, end time], \\nThen the problem is converted to ask the maximum jobs we can accomplish.\\n\\n```\\npublic class Solution {\\n    public int findLongestChain(int[][] pairs) {\\n        if(pairs == null || pairs.length ==0 ) return 0;\\n        Arrays.sort(pairs, (a, b) -> (a[1] - b[1]));\\n        int res=1, end = pairs[0][1];\\n        for(int i =1; i<pairs.length; i++) {\\n            if(pairs[i][0]>end){\\n                res++;\\n                end = pairs[i][1];\\n            }\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105623",
			"view":"227",
			"top":"5",
			"title":"[Java] Very Simple without DP",
			"vote":"7",
			"content":"This question actually can be transferred into a similar problem, \\n\"**Maximum Length of Increasing Subsequence of Integer Array -- The subsequence can be formed in any order**\".\\nThe slight difference is that you need detect the overlap between current pair and previous pair.\\nI just solved this problem by the rule I observed instead of by the thoughts of DP.\\n\\nTime: **O(N logN)**\\nSpace: **O(1)**\\n```\\npublic int findLongestChain(int[][] pairs) {\\n    Arrays.sort(pairs, (p1, p2)->p1[0]-p2[0]);\\n    int len = 0;\\n    int pre = Integer.MIN_VALUE;\\n    for(int[] pair : pairs){\\n        if(pair[0] > pre){  // not overlap\\n            len++;\\n            pre = pair[1];\\n         }else if(pair[1] < pre){ // overlap but with smaller second element\\n            pre = pair[1];\\n        }\\n    }\\n    return len;\\n}\\n```"
		},
		{
			"lc_ans_id":"105613",
			"view":"4220",
			"top":"6",
			"title":"Java solution, 10 lines, DP",
			"vote":"6",
			"content":"Reference: http://www.geeksforgeeks.org/dynamic-programming-set-20-maximum-length-chain-of-pairs/\\n```\\npublic class Solution {\\n    public int findLongestChain(int[][] pairs) {\\n        Arrays.sort(pairs, (a, b) -> (a[0] - b[0]));\\n        \\n        int i, j, max = 0, n = pairs.length;\\n        int dp[] = new int[n];\\n      \\n        for (i = 0; i < n; i++) dp[i] = 1;\\n        \\n        for (i = 1; i < n; i++)\\n            for (j = 0; j < i; j++)\\n                if (pairs[i][0] > pairs[j][1] && dp[i] < dp[j] + 1)\\n                    dp[i] = dp[j] + 1;\\n\\n        for (i = 0; i < n; i++) if (max < dp[i]) max = dp[i];\\n        \\n        return max;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105642",
			"view":"245",
			"top":"7",
			"title":"Java one pass solution after sorting using heap.",
			"vote":"2",
			"content":"public class Solution {\\n    public int findLongestChain(int[][] pairs) {\\n        if(pairs.length==0) return 0;\\n        Arrays.sort(pairs,new Comparator<int[]>(){\\n            public int compare(int[] a,int[] b){\\n                return a[0]-b[0];\\n            }\\n        });\\n        PriorityQueue<Integer> pq=new PriorityQueue<Integer>(Collections.reverseOrder());\\n        pq.offer(pairs[0][1]);\\n        for(int i=1;i<pairs.length;i++){\\n            //if the max number of the chain greater than cur right number, replace the max with the smaller one\\n            if(pq.peek()>pairs[i][1]){\\n                pq.poll();\\n                pq.offer(pairs[i][1]);\\n            }\\n            else{\\n                //add the cur right number if chain can be formed;\\n                if(pq.peek()<pairs[i][0]) pq.offer(pairs[i][1]);\\n            }\\n        }\\n        return pq.size();\\n    }\\n}"
		},
		{
			"lc_ans_id":"105651",
			"view":"184",
			"top":"8",
			"title":"C++ code with detailed explanation",
			"vote":"2",
			"content":"```\\nclass Solution {\\nprivate:\\n    //Our compare function to make sure the pairs is in ascending order\\n    static bool compare(vector<int>& a, vector<int>&b) {\\n        return a[1] < b[1];\\n    }\\n    \\npublic:\\n    int findLongestChain(vector<vector<int>>& pairs) {\\n        //Sort the pairs by the second element in the pair\\n        //Because the chain is based on (a,b)->(c,d) if and only if b<c, so the smallest\\n        //one in the chain always start with the smallest \"b\", which is the second element\\n        //in the pair\\n        sort(pairs.begin(), pairs.end(), compare);\\n        //Count the length of chain\\n        int count = 0;\\n        for (int i = 0, j = 0; j < pairs.size(); j++) {\\n            //If it is the first time, we increase the count to 1\\n            //If for the two pairs (a,b)->(c,d), b is smaller than c, then we find it\\n            //After increase the count, we make i equal to j because we need to maintain\\n            //the chain's property, make sure the second smallest one in the chain and \\n            //the following third smallest one in the chain in the chain fulfill\\n            //the property (a,b)->(c,d) if and only if b<c\\n            if (j == 0 || pairs[i][1] < pairs[j][0]) {\\n                count++;\\n                i = j;\\n            }\\n        }\\n        return count;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"105629",
			"view":"363",
			"top":"9",
			"title":"6 Line Python Soln",
			"vote":"2",
			"content":"Straight forward solution\\n'''\\n<pre><code class=\"python\">\\nclass Solution(object):\\n    def findLongestChain(self, pairs):\\n        pairs = sorted(pairs, key=lambda x: x[1])\\n        newli = [pairs[0]]\\n        for i in range(0, len(pairs)-1):\\n            if newli[len(newli)-1][1] < pairs[i + 1][0]:\\n                newli.append(pairs[i + 1])\\n        return len(newli)\\n</code></pre>\\n'''"
		}
	],
	"id":"623",
	"title":"Maximum Length of Pair Chain",
	"content":"<p>\r\nYou are given <code>n</code> pairs of numbers. In every pair, the first number is always smaller than the second number.\r\n</p>\r\n\r\n<p>\r\nNow, we define a pair <code>(c, d)</code> can follow another pair <code>(a, b)</code> if and only if <code>b < c</code>. Chain of pairs can be formed in this fashion. \r\n</p>\r\n\r\n<p>\r\nGiven a set of pairs, find the length longest chain which can be formed. You needn't use up all the given pairs. You can select pairs in any order.\r\n</p>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [[1,2], [2,3], [3,4]]\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> The longest chain is [1,2] -> [3,4]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The number of given pairs will be in the range [1, 1000].</li>\r\n</ol>\r\n</p>",
	"frequency":"183",
	"ac_num":"15123"
}