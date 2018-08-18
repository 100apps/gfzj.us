{
	"difficulty":"2",
	"submit_num":"50453",
	"show_id":"525",
	"leetcode_id":"525",
	"answers":[
		{
			"lc_ans_id":"99646",
			"view":"15729",
			"top":"0",
			"title":"Easy Java O(n) Solution, PreSum + HashMap",
			"vote":"97",
			"content":"The idea is to change ```0``` in the original array to ```-1```. Thus, if we find ```SUM[i, j] == 0``` then we know there are even number of ```-1``` and ```1``` between index ```i``` and ```j```. Also put the ```sum``` to ```index``` mapping to a HashMap to make search faster.\\n\\n```\\npublic class Solution {\\n    public int findMaxLength(int[] nums) {\\n        for (int i = 0; i < nums.length; i++) {\\n            if (nums[i] == 0) nums[i] = -1;\\n        }\\n        \\n        Map<Integer, Integer> sumToIndex = new HashMap<>();\\n        sumToIndex.put(0, -1);\\n        int sum = 0, max = 0;\\n        \\n        for (int i = 0; i < nums.length; i++) {\\n            sum += nums[i];\\n            if (sumToIndex.containsKey(sum)) {\\n                max = Math.max(max, i - sumToIndex.get(sum));\\n            }\\n            else {\\n                sumToIndex.put(sum, i);\\n            }\\n        }\\n        \\n        return max;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99655",
			"view":"5337",
			"top":"1",
			"title":"Python O(n) Solution with Visual Explanation",
			"vote":"63",
			"content":"My idea is very similar to others, but let me try to explain it more visually. My thought was inspired by 121. Best Time to Buy and Sell Stock.\\n\\nLet's have a variable `count` initially equals 0 and traverse through `nums`. Every time we meet a 0, we decrease `count` by 1, and increase `count` by 1 when we meet 1. It's pretty easy to conclude that we have a contiguous subarray with equal number of 0 and 1 when `count` equals 0. \\n\\nWhat if we have a sequence `[0, 0, 0, 0, 1, 1]`? the maximum length is 4, the `count` starting from 0, will equal -1, -2, -3, -4, -3, -2, and won't go back to 0 again. But wait, the longest subarray with equal number of 0 and 1 started and ended when `count` equals -2. We can plot the changes of `count` on a graph, as shown below. Point (0,0) indicates the initial value of `count` is 0, so we count the sequence starting from index 1. The longest subarray is from index 2 to 6.\\n\\n![0_1487543028189_figure_1.png](/uploads/files/1487543036101-figure_1.png) \\n\\nFrom above illustration, we can easily understand that two points with the same y-axis value indicates the sequence between these two points has equal number of 0 and 1.\\n\\nAnother example, sequence `[0, 0, 1, 0, 0, 0, 1, 1]`, as shown below,\\n\\n![0_1487543752969_figure_2.png](/uploads/files/1487543760956-figure_2.png) \\n\\nThere are 3 points have the same y-axis value -2. So subarray from index 2 to 4 has equal number of 0 and 1, and subarray from index 4 to 8 has equal number of 0 and 1. We can add them up to form the longest subarray from index 2 to 8, so the maximum length of the subarray is 8 - 2 = 6.\\n\\nYet another example, sequence [0, 1, 1, 0, 1, 1, 1, 0], as shown below. The longest subarray has the y-axis value of 0.\\n\\n![0_1487544400951_figure_3.png](/uploads/files/1487544408978-figure_3.png) \\n\\nTo find the maximum length, we need a dict to store the value of `count` (as the key) and its associated index (as the value). We only need to save a `count` value and its index at the first time, when the same `count` values appear again, we use the new index subtracting the old index to calculate the length of a subarray. A variable `max_length` is used to to keep track of the current maximum length.\\n\\n```python\\nclass Solution(object):\\n    def findMaxLength(self, nums):\\n        count = 0\\n        max_length=0\\n        table = {0: 0}\\n        for index, num in enumerate(nums, 1):\\n            if num == 0:\\n                count -= 1\\n            else:\\n                count += 1\\n            \\n            if count in table:\\n                max_length = max(max_length, index - table[count])\\n            else:\\n                table[count] = index\\n        \\n        return max_length\\n```"
		},
		{
			"lc_ans_id":"99652",
			"view":"4023",
			"top":"2",
			"title":"One pass,use a HashMap to record 0-1 count difference",
			"vote":"32",
			"content":"```\\npublic class Solution {\\n    public int findMaxLength(int[] nums) {\\n        HashMap<Integer,Integer> map=new HashMap<>();\\n        map.put(0,-1);\\n        \\n        int zero=0;\\n        int one=0;\\n        int len=0;\\n        for(int i=0;i<nums.length;i++){\\n            if(nums[i]==0){\\n                zero++;\\n            }else{\\n                one++;\\n            }\\n            \\n            if(map.containsKey(zero-one)){\\n                len=Math.max(len,i-map.get(zero-one));\\n            }else{\\n                map.put(zero-one,i);\\n            }\\n        }\\n        \\n        return len;\\n    }\\n}"
		},
		{
			"lc_ans_id":"99658",
			"view":"2705",
			"top":"3",
			"title":"Python and Java with little tricks (incl. a oneliner :-)",
			"vote":"16",
			"content":"Keeping track of the balance (number of ones minus number of zeros) and storing the first index where each balance occurred.\\n\\n---\\n\\n**Python**\\n\\nKeeping the balance in units of 0.5 which makes the update expression short (not that `num * 2 - 1` or `1 if num else -1` would be terribly long):\\n\\n    def findMaxLength(self, nums):\\n        index = {0: -1}\\n        balance = maxlen = 0\\n        for i, num in enumerate(nums):\\n            balance += num - 0.5\\n            maxlen = max(maxlen, i - index.setdefault(balance, i))\\n        return maxlen\\n\\nJust for fun as an ugly one-liner:\\n\\n    def findMaxLength(self, nums):\\n        return reduce(lambda(f,b,m),(i,x):(f,b+x-.5,max(m,i-f.setdefault(b+x-.5,i))),enumerate(nums),({0:-1},0,0))[2]\\n\\n---\\n\\n**Java**\\n\\nUsing `putIfAbsent` so I only need one map function call per number.\\n\\n    public int findMaxLength(int[] nums) {\\n        Map<Integer, Integer> index = new HashMap<>();\\n        index.put(0, -1);\\n        int balance = 0, maxlen = 0;\\n        for (int i = 0; i < nums.length; i++) {\\n            balance += nums[i] * 2 - 1;\\n            Integer first = index.putIfAbsent(balance, i);\\n            if (first != null)\\n                maxlen = Math.max(maxlen, i - first);\\n        }\\n        return maxlen;\\n    }\\n\\nCould avoid using `Math.max` like this:\\n\\n            if (first != null && i - first > maxlen)\\n                maxlen = i - first;"
		},
		{
			"lc_ans_id":"99688",
			"view":"2978",
			"top":"4",
			"title":"Share my DP&Map solution, one pass",
			"vote":"10",
			"content":"```\\npublic int findMaxLength(int[] nums) {\\n\\tint n = nums.length, res = 0;\\n\\tMap<Integer, Integer> map = new HashMap<>();\\n\\tint[][] dp = new int[n+1][2];\\n\\tfor (int i = 1; i < dp.length; i++) {\\n\\t\\tif (nums[i-1] == 0) {\\n\\t\\t\\tdp[i][0] = dp[i-1][0]+1;\\n\\t\\t\\tdp[i][1] = dp[i-1][1];\\n\\t\\t}else {\\n\\t\\t\\tdp[i][0] = dp[i-1][0];\\n\\t\\t\\tdp[i][1] = dp[i-1][1]+1;\\n\\t\\t}\\n\\t\\tif (dp[i][0] == dp[i][1]) res = Math.max(res, dp[i][0]*2);\\n\\t\\telse {\\n\\t\\t\\tint dif = dp[i][1]-dp[i][0];\\n\\t\\t\\tif (map.containsKey(dif)) res = Math.max(res, 2*(dp[i][0]-dp[map.get(dif)][0]));\\n\\t\\t\\telse map.put(dif, i);\\n\\t\\t}\\n\\t}\\n\\treturn res;\\n}\\n```"
		},
		{
			"lc_ans_id":"99689",
			"view":"1511",
			"top":"5",
			"title":"C++ O(N), array instead of unordered_map.",
			"vote":"6",
			"content":"This is the same as \"325. Maximum Size Subarray Sum Equals k\" (https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/), where zeros are -1, ones are ones, and k is zero. Since in this problem the range of possible sums is [-size...size], we can use an array instead of unordered_map. We can consider size as the zero point, so the array indexes will be [0... 2 * size].\\n```\\nint findMaxLength(vector<int>& nums) {\\n    int size = nums.size(), ballance = size, max_len = 0;\\n    int ballances[size * 2 + 1] = {};\\n    for (auto i = 0; i < size; ++i) {\\n        ballance += nums[i] == 0 ? -1 : 1;\\n        if (ballance == size) max_len = i + 1;\\n        else {\\n            if (ballances[ballance] != 0) max_len = max(max_len, i - ballances[ballance] + 1);\\n            else ballances[ballance] = i + 1;\\n        }\\n    }\\n    return max_len;\\n}\\n```"
		},
		{
			"lc_ans_id":"99657",
			"view":"1309",
			"top":"6",
			"title":"Java one pass O(n) solution with explanation",
			"vote":"4",
			"content":"diff[i] is \"count of 1s\" minus \"count of 0s\" so far.\\n\\nFor given i and j, if diff[i] == diff[j], then the subarray between i and j is a contiguous array as defined in the questions.\\n\\nFor any value of diff[], we save the index of the first item in the hashmap. Then once the value appears again, we get the length of the subarray between the current index and the index of the first item.\\n\\n    public int findMaxLength(int[] nums) {\\n        int res = 0;\\n        int n = nums.length;\\n        \\n        int[] diff = new int[n + 1];\\n        \\n        Map<Integer, Integer> map = new HashMap<>();\\n        map.put(0, 0);\\n        \\n        for (int i = 1; i <= n; i++) {\\n            diff[i] = diff[i - 1] + (nums[i - 1] == 0 ? -1 : 1);\\n\\n            if (!map.containsKey(diff[i]))\\n                map.put(diff[i], i);\\n            else\\n                res = Math.max(res, i - map.get(diff[i]));\\n        }\\n\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"99648",
			"view":"377",
			"top":"7",
			"title":"O(n) fast C++ solution",
			"vote":"3",
			"content":"\\n    int findMaxLength(vector<int>& nums) {\\n        map<int, int> myMap;\\n        map<int, int>::iterator it;\\n        int sum = 0;\\n        int maxLen = 0;\\n        myMap[0] = -1;\\n        for (int i = 0; i < nums.size(); i++)\\n        {\\n            sum += (nums[i] == 0) ? -1 : 1;\\n            it = myMap.find(sum); \\n            if (it != myMap.end())\\n                maxLen = max(maxLen, i - it->second);\\n            else\\n                myMap[sum] = i;\\n        }\\n        return maxLen;\\n    }"
		},
		{
			"lc_ans_id":"99701",
			"view":"315",
			"top":"8",
			"title":"Java Divide-and-conquer",
			"vote":"3",
			"content":"Though not optimal, a divide-and-conquer approach is still interesting to write.\\nTime = O(n log n), peak space = O(n).\\n\\n```Java\\npublic int findMaxLength(int[] nums) {\\n    return dfs(nums, 0, nums.length - 1);\\n}\\n\\nprivate int dfs(int[] a, int l, int r) {\\n    if (l >= r) return 0;\\n    int mid = (l + r) / 2;\\n\\n    Map<Integer, Integer> map = new HashMap<>();\\n    for (int i = mid, one = 0, zero = 0; i >= l; i--) {\\n        if (a[i] == 0) zero++;\\n        else one++;\\n        map.put(zero - one, zero + one);\\n    }\\n    int max = 0;\\n    for (int i = mid + 1, one = 0, zero = 0; i <= r; i++) {\\n        if (a[i] == 0) zero++;\\n        else one++;\\n        if (map.containsKey(one - zero)) max = Math.max(max, map.get(one - zero) + zero + one);\\n    }\\n\\n    return Math.max(max, Math.max(dfs(a, l, mid), dfs(a, mid + 1, r)));\\n}\\n```"
		},
		{
			"lc_ans_id":"99672",
			"view":"176",
			"top":"9",
			"title":"[C++] [Java] Clean Code - Overflow Map",
			"vote":"1",
			"content":"**C++**\\n```\\nclass Solution {\\npublic:\\n    /**\\n     * 1. keep track of accumulated 1s at each point.\\n     * 2. at each point, if there is more 1s than 0s, we call it an one-overflow;\\n     * 3. if no previous record, record the position where this overflow happend;\\n     * 4. if there is previous record, cut off sub-array where that overflow first occur will give you the even 2nd part;\\n     */\\n    int findMaxLength(vector<int>& nums) {\\n        int maxsize = 0;\\n        int ones = 0;\\n\\n        map<int, int> map;\\n        map[0] = -1;\\n        for (int i = 0; i < nums.size(); i++) {\\n            ones += nums[i];\\n            int overflow = ones - (i + 1 - ones);\\n            if (map.count(overflow)) {\\n                maxsize = max(maxsize, i - map[overflow]);\\n            }\\n            else {\\n                map[overflow] = i;\\n            }\\n        }\\n\\n        return maxsize;\\n    }\\n};\\n```\\n\\n**Java**\\n```\\npublic class Solution {\\n    public int findMaxLength(int[] nums) {\\n        int maxsize = 0;\\n        int ones = 0;\\n\\n        Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n        map.put(0, -1);\\n        for (int i = 0; i < nums.length; i++) {\\n            ones += nums[i];\\n            int overflow = ones - (i + 1 - ones);   // extra 1s than 0s\\n            if (map.containsKey(overflow)) {\\n                maxsize = Math.max(maxsize, i - map.get(overflow));\\n            }\\n            else {\\n                map.put(overflow, i);\\n            }\\n        }\\n\\n        return maxsize;        \\n    }\\n}\\n```"
		}
	],
	"id":"510",
	"title":"Contiguous Array",
	"content":"<p>Given a binary array, find the maximum length of a contiguous subarray with equal number of 0 and 1. </p>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [0,1]\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> [0, 1] is the longest contiguous subarray with equal number of 0 and 1.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [0,1,0]\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe length of the given binary array will not exceed 50,000.\r\n</p>",
	"frequency":"143",
	"ac_num":"20852"
}