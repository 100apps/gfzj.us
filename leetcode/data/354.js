{
	"difficulty":"3",
	"submit_num":"82001",
	"show_id":"354",
	"leetcode_id":"354",
	"answers":[
		{
			"lc_ans_id":"82763",
			"view":"25893",
			"top":"0",
			"title":"Java NLogN Solution with Explanation",
			"vote":"207",
			"content":" 1. Sort the array. Ascend on width and descend on height if width are same.\\n 2. Find the [longest increasing subsequence][1] based on height. \\n\\n\\n----------\\n\\n - Since the width is increasing, we only need to consider height. \\n - [3, 4] cannot contains [3, 3], so we need to put [3, 4] before [3, 3] when sorting otherwise it will be counted as an increasing number if the order is [3, 3], [3, 4]\\n\\n\\n----------\\n\\n\\n    public int maxEnvelopes(int[][] envelopes) {\\n        if(envelopes == null || envelopes.length == 0 \\n           || envelopes[0] == null || envelopes[0].length != 2)\\n            return 0;\\n        Arrays.sort(envelopes, new Comparator<int[]>(){\\n            public int compare(int[] arr1, int[] arr2){\\n                if(arr1[0] == arr2[0])\\n                    return arr2[1] - arr1[1];\\n                else\\n                    return arr1[0] - arr2[0];\\n           } \\n        });\\n        int dp[] = new int[envelopes.length];\\n        int len = 0;\\n        for(int[] envelope : envelopes){\\n            int index = Arrays.binarySearch(dp, 0, len, envelope[1]);\\n            if(index < 0)\\n                index = -(index + 1);\\n            dp[index] = envelope[1];\\n            if(index == len)\\n                len++;\\n        }\\n        return len;\\n    }\\n\\n\\n  [1]: https://leetcode.com/problems/longest-increasing-subsequence/"
		},
		{
			"lc_ans_id":"82759",
			"view":"10383",
			"top":"1",
			"title":"Simple DP solution",
			"vote":"28",
			"content":"    public int maxEnvelopes(int[][] envelopes) {\\n        if (   envelopes           == null\\n            || envelopes.length    == 0\\n            || envelopes[0]        == null\\n            || envelopes[0].length == 0){\\n            return 0;    \\n        }\\n        \\n        Arrays.sort(envelopes, new Comparator<int[]>(){\\n            @Override\\n            public int compare(int[] e1, int[] e2){\\n                return Integer.compare(e1[0], e2[0]);\\n            }\\n        });\\n        \\n        int   n  = envelopes.length;\\n        int[] dp = new int[n];\\n        \\n        int ret = 0;\\n        for (int i = 0; i < n; i++){\\n            dp[i] = 1;\\n            \\n            for (int j = 0; j < i; j++){\\n                if (   envelopes[i][0] > envelopes[j][0]\\n                    && envelopes[i][1] > envelopes[j][1]){\\n                    dp[i] = Math.max(dp[i], 1 + dp[j]);    \\n                }\\n            }\\n            \\n            ret = Math.max(ret, dp[i]);\\n        }\\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"82757",
			"view":"2207",
			"top":"2",
			"title":"[[1,3],[3,5],[6,7],[6,8],[8,4],[9,5]] should be 4 not 3",
			"vote":"20",
			"content":"[1,3] -> [3,5] -> [8,4] -> [9,5]\\n\\nDon't tell me that you can't rotate the envelope...coz that is silly.\\n\\nHowever, if the rotation is allowed, the O(n) algorithm will not work. You have to solve the longest path in the DAG.\\n\\nThe question should clearly say the rotation is not allowed."
		},
		{
			"lc_ans_id":"82761",
			"view":"5566",
			"top":"3",
			"title":"Python O(nlogn) O(n) solution, beats 97%, with explanation",
			"vote":"15",
			"content":"    class Solution(object):\\n        def maxEnvelopes(self, envs):\\n            def liss(envs):\\n                def lmip(envs, tails, k):\\n                    b, e = 0, len(tails) - 1\\n                    while b <= e:\\n                        m = (b + e) >> 1\\n                        if envs[tails[m]][1] >= k[1]:\\n                            e = m - 1\\n                        else:\\n                            b = m + 1\\n                    return b\\n                \\n                tails = []\\n                for i, env in enumerate(envs):\\n                    idx = lmip(envs, tails, env)\\n                    if idx >= len(tails):\\n                        tails.append(i)\\n                    else:\\n                        tails[idx] = i\\n                return len(tails)\\n            \\n            \\n            def f(x, y):\\n                return -1 if (x[0] < y[0] or x[0] == y[0] and x[1] > y[1]) else 1\\n                \\n            envs.sort(cmp=f)\\n            return liss(envs)\\n\\n    # Runtime: 100ms\\n\\nThe idea is to order the envelopes and then calculate the longest increasing subsequence (LISS). We first sort the envelopes by width, and we also make sure that when the width is the same, the envelope with greater height comes first. Why? This makes sure that when we calculate the LISS, we don't have a case such as [3, 4] [3, 5] (we could increase the LISS but this would be wrong as the width is the same. It can't happen when [3, 5] comes first in the ordering).\\n\\nWe could calculate the LISS using the standard DP algorithm (quadratic runtime), but we can just use the tails array method with a twist: we store the index of the tail, and we do leftmost insertion point as usual to find the right index in `nlogn` time. Why not rightmost? Think about the case [1, 1], [1, 1], [1, 1]."
		},
		{
			"lc_ans_id":"82808",
			"view":"1471",
			"top":"4",
			"title":"C++ 9-line Short and Clean O(nlogn) solution (plus classic O(n^2) dp solution).",
			"vote":"12",
			"content":"    ///O(nlogn)\\n\\n    struct Solution {\\n        int maxEnvelopes(vector<pair<int, int>>& es) {\\n            sort(es.begin(), es.end(), [](pair<int, int> a, pair<int, int> b){\\n                return a.first < b.first || (a.first == b.first && a.second > b.second);});\\n            vector<int> dp;\\n            for (auto e : es)\\n            {\\n                auto iter = lower_bound(dp.begin(), dp.end(), e.second);\\n                if (iter == dp.end())\\n                    dp.push_back(e.second);\\n                else if (e.second < *iter)\\n                    *iter = e.second;\\n            }\\n            return dp.size();\\n        }\\n    };\\n\\n    ///DP\\n    \\n    struct Solution {\\n        int maxEnvelopes(vector<pair<int, int>>& envelopes) {\\n            if (envelopes.empty()) return 0;\\n            sort(envelopes.begin(), envelopes.end());\\n            vector<int> dp(envelopes.size(), 1);\\n            for (int i = 0; i < envelopes.size(); ++i)\\n                for (int j = 0; j < i; ++j)\\n                    if (envelopes[j].first < envelopes[i].first && envelopes[j].second < envelopes[i].second)\\n                        dp[i]  = max(dp[i] , dp[j] + 1);\\n            return *max_element(dp.begin(), dp.end());\\n        }\\n    };"
		},
		{
			"lc_ans_id":"82810",
			"view":"2954",
			"top":"5",
			"title":"Short and simple Java solution (15 lines)",
			"vote":"11",
			"content":" \\n    public int maxEnvelopes(int[][] envelopes) {\\n        Arrays.sort(envelopes, (a, b) -> a[0] - b[0]);\\n        int max = 0;\\n        int dp [] = new int [envelopes.length];\\n        for(int i = 0; i < envelopes.length; i++){\\n            dp[i] = 1;\\n            for(int j = 0; j < i; j++){\\n                if(envelopes[j][0] < envelopes[i][0] && envelopes[j][1] < envelopes[i][1])\\n                    dp[i] = Math.max(dp[i], dp[j] + 1);\\n            }\\n            max = Math.max(dp[i], max);\\n        }\\n        return max;\\n    }"
		},
		{
			"lc_ans_id":"82776",
			"view":"2664",
			"top":"6",
			"title":"Clean and short nlogn solution",
			"vote":"8",
			"content":"See more explanation in [Longest Increasing Subsequence Size (N log N)][1]\\n\\n    def maxEnvelopes(self, envelopes):\\n        def bin_search(A, key):\\n            l, r = 0, len(A)\\n            while l < r:\\n                mid = (l+r)/2\\n                if A[mid][1] < key[1]:\\n                    l = mid + 1\\n                else:\\n                    r = mid\\n            return l\\n        envelopes.sort(\\n            cmp = lambda x,y: x[0]-y[0] if x[0] != y[0] else y[1]-x[1])\\n        n = len(envelopes)\\n        tails = []\\n        for i in range(n):\\n            e = envelopes[i]\\n            p = bin_search(tails, e)\\n            if p == len(tails):\\n                tails.append(e)\\n            else:\\n                tails[p] = e\\n        return len(tails)\\n\\n\\n  [1]: http://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/"
		},
		{
			"lc_ans_id":"82778",
			"view":"1280",
			"top":"7",
			"title":"Two solutions in C++, well-explained",
			"vote":"7",
			"content":"### Solutions\\n\\n#### DP\\nIt's quite intuitive to adopt DP to solve this problem: \\n\\n- sorting the envelopes first via its first value (width)\\n- allocating an array to record the maximal amount for each envelope (the maximal amount we can get ending with the current envelope)\\n\\nDirectly the time cost here will be o(nlogn+n^2) which is o(n^2) and meantime taking up o(n) extra space.\\n\\n```\\nint maxenvelopes(vector<pair<int, int>>& envelopes) \\n{\\n\\tint size = envelopes.size();\\n\\tif(!size) return 0;\\n\\tsort(envelopes.begin(), envelopes.end());\\n\\tint maxrolls[size]{0}, maxroll = 1;\\n\\tmaxrolls[0] = 1;\\n\\tfor(int i = 1; i < size; ++i)\\n\\t{\\n\\t\\tmaxrolls[i] = 1;\\n\\t\\tfor(int j = i-1; j >= 0; --j)\\n\\t\\t\\tif(envelopes[i].first>envelopes[j].first && envelopes[i].second>envelopes[j].second)\\n\\t\\t\\t\\tmaxrolls[i] = max(maxrolls[i], maxrolls[j]+1);\\n\\t\\tmaxroll = max(maxroll, maxrolls[i]);\\n\\t}\\n\\treturn maxroll;\\n}\\n```\\n\\n#### LIS\\nActually here we are counting the **longest increasing sequence** as well except there are two dimensions we need to consider. And also we should remember the o(nlogn) solution in LIS, where the essential greedy concept is trying to \\n\\n1. make the all the elements in the collector as small as possible, especially the last one which is the gate to control the size of the collector - the longest length;\\n2. append the bigger ones to the collector;\\n\\nBut here we need to make some modifications since there are two dimensions to consider. To ensure the two dimensions array can be compressed into one dimension and meantime the requirements of the two conditions above are also properly met, just sorting is not enough here.\\n\\n- we need to convert this 2-dimentsion problem to a 1-dimension LIS: first sort the array via the width in ascending order and then sort the sub-array with the same width in descending order (the height) then the two conditions in LIS will also be met traversing from the smallest width to the biggest: and the height will be used as that in LIS - the last element will be updated to be as smaller as possible and meantime maintain the envelopes constraint since its width order will always be valid, furthermore the condition 2 is also met just as that in LIS.\\n\\n> **Note** if we do not sort the sub-arrays (with the same width) in descending order, the LIS in the height is then invalid. Suppose the sub-arrays are also sorted in ascending order, the height in the same width will be appended in our LIS method, wrong result. To sort the heights in the same width in descending order will avoid this case by updating the height in the same width since we are using `lower_bound`.\\n\\nTime complexity now becomes O(nlogn) taking up O(n) space.\\n\\n```\\nint maxEnvelopes(vector<pair<int, int>>& envelopes) \\n{\\n\\tint size = envelopes.size();\\n\\tsort(envelopes.begin(), envelopes.end(), [](pair<int, int> a, pair<int, int>b){\\n\\t\\treturn a.first<b.first || (a.first==b.first && a.second>b.second);\\n\\t});\\n\\tvector<int> collector;\\n\\tfor(auto& pair: envelopes)\\n\\t{\\n\\t\\tauto iter = lower_bound(collector.begin(), collector.end(), pair.second);\\n\\t\\tif(iter == collector.end()) collector.push_back(pair.second);\\n\\t\\telse if(*iter > pair.second) *iter = pair.second;\\n\\t}\\n\\treturn collector.size();\\n}\\n```\\n\\n##### lower_bound\\n- On random-access iterators, logarithmic in the distance between first and last: Performs approximately log2(N)+1 element comparisons (where N is this distance).\\n- On non-random-access iterators, the iterator advances produce themselves an additional linear complexity in N on average.\\nAlways welcome new ideas and `practical` tricks, just leave them in the comments!"
		},
		{
			"lc_ans_id":"82818",
			"view":"1449",
			"top":"8",
			"title":"C++ DP version, Time O(N^2) Space O(N)",
			"vote":"7",
			"content":"       bool cmp (pair<int, int> i, pair<int, int> j) {\\n            if (i.first == j.first)\\n                return i.second < j.second;\\n            return i.first < j.first;\\n        }\\n        \\n        class Solution {\\n        public:\\n            int maxEnvelopes(vector<pair<int, int>>& envelopes) {\\n                int N = envelopes.size();\\n                vector<int> dp(N, 1);\\n                int mx = (N == 0) ? 0 : 1;\\n                sort(envelopes.begin(), envelopes.end(), cmp);\\n                for (int i = 0; i < N; i++) {\\n                    for (int j = i - 1; j >= 0; j--) {\\n                        if (envelopes[i].first > envelopes[j].first && envelopes[i].second > envelopes[j].second) {\\n                            dp[i] = max(dp[i], dp[j] + 1);\\n                            mx = max(dp[i], mx);\\n                        }\\n                    }\\n                }\\n                return mx;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"82796",
			"view":"587",
			"top":"9",
			"title":"A Trick to solve this problem.",
			"vote":"6",
			"content":"You can solve this problem in this way :\\n\\nlet's suppose the values are given as...\\n[2,3]\\n[4,6]\\n[3,7]\\n[4,8]\\n\\nIf we **Sort** this envelopes in a tricky way that *Sort the envelopes according to width BUT when the values of height are same, we can sort it in reverse way* like this :\\n\\n[2,3]\\n[3,7]\\n**[4,8]\\n[4,6]**\\n\\nNow just **Do LIS on the all height values, you will get the answer**"
		}
	],
	"id":"354",
	"title":"Russian Doll Envelopes",
	"content":"<p>You have a number of envelopes with widths and heights given as a pair of integers <code>(w, h)</code>. One envelope can fit into another if and only if both the width and height of one envelope is greater than the width and height of the other envelope.</p>\r\n\r\n<p>\r\nWhat is the maximum number of envelopes can you Russian doll? (put one inside other)\r\n</p>\r\n\r\n<p><b>Example:</b><br />\r\nGiven envelopes = <code>[[5,4],[6,4],[6,7],[2,3]]</code>, the maximum number of envelopes you can Russian doll is <code>3</code> ([2,3] => [5,4] => [6,7]).\r\n</p>",
	"frequency":"286",
	"ac_num":"26720"
}