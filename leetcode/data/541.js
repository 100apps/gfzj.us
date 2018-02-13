{
	"difficulty":"2",
	"submit_num":"67242",
	"show_id":"560",
	"leetcode_id":"560",
	"answers":[
		{
			"lc_ans_id":"102106",
			"view":"15351",
			"top":"0",
			"title":"Java Solution, PreSum + HashMap",
			"vote":"70",
			"content":"Solution 1. Brute force. We just need two loops (i, j) and test if ```SUM[i, j]``` = k. Time complexity O(n^2), Space complexity O(1). I bet this solution will TLE.\\n\\nSolution 2. From solution 1, we know the key to solve this problem is ```SUM[i, j]```. So if we know ```SUM[0, i - 1]``` and ```SUM[0, j]```, then we can easily get ```SUM[i, j]```. To achieve this, we just need to go through the array, calculate the current sum and save number of all seen ```PreSum``` to a HashMap. Time complexity O(n), Space complexity O(n).\\n```\\npublic class Solution {\\n    public int subarraySum(int[] nums, int k) {\\n        int sum = 0, result = 0;\\n        Map<Integer, Integer> preSum = new HashMap<>();\\n        preSum.put(0, 1);\\n        \\n        for (int i = 0; i < nums.length; i++) {\\n            sum += nums[i];\\n            if (preSum.containsKey(sum - k)) {\\n                result += preSum.get(sum - k);\\n            }\\n            preSum.put(sum, preSum.getOrDefault(sum, 0) + 1);\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102111",
			"view":"4473",
			"top":"1",
			"title":"Python, Simple with Explanation",
			"vote":"16",
			"content":"Let's remember count[V], the number of previous prefix sums with value V.  If our newest prefix sum has value W, and W-V == K, then we add count[V] to our answer.  \\n\\nThis is because at time t, ```A[0] + A[1] + ... + A[t-1] = W```, and there are ```count[V]``` indices ```j``` with ```j < t-1``` and ```A[0] + A[1] + ... + A[j] = V```.  Thus, there are ```count[V]``` subarrays ```A[j+1] + A[j+2] + ... + A[t-1] = K```.\\n\\n```\\ndef subarraySum(self, A, K):\\n    count = collections.Counter()\\n    count[0] = 1\\n    ans = su = 0\\n    for x in A:\\n        su += x\\n        ans += count[su-K]\\n        count[su] += 1\\n    return ans\\n```"
		},
		{
			"lc_ans_id":"102121",
			"view":"4316",
			"top":"2",
			"title":"C++ prefix sum + map",
			"vote":"9",
			"content":"```\\nclass Solution {\\npublic:\\n    int subarraySum(vector<int>& nums, int k) {\\n        int cum=0; // cumulated sum\\n        map<int,int> rec; // prefix sum recorder\\n        int cnt = 0; // number of found subarray\\n        rec[0]++; // to take into account those subarrays that begin with index 0\\n        for(int i=0;i<nums.size();i++){\\n            cum += nums[i];\\n            cnt += rec[cum-k];\\n            rec[cum]++;\\n        }\\n        return cnt;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"102119",
			"view":"1267",
			"top":"3",
			"title":"Super Simple Python",
			"vote":"5",
			"content":"```\\n    def subarraySum(self, nums, k):\\n\\n        sums = {0:1} # prefix sum array\\n        res = s = 0\\n        for n in nums:\\n            s += n # increment current sum\\n            res += sums.get(s - k, 0) # check if there is a prefix subarray we can take out to reach k\\n            sums[s] = sums.get(s, 0) + 1 # add current sum to sum count\\n        return res\\n```"
		},
		{
			"lc_ans_id":"102153",
			"view":"2256",
			"top":"4",
			"title":"Basic Java solution",
			"vote":"4",
			"content":"```\\npublic int subarraySum(int[] nums, int k) {\\n        int count=0;\\n        for(int i=0;i<nums.length;i++){\\n            int sum=nums[i];\\n            if(sum==k){\\n                count++;\\n            }\\n            for(int j=i+1;j<nums.length;j++){\\n                sum+=nums[j];\\n                if(sum==k) count++;\\n            }\\n        }\\n        return count;\\n    }\\n```"
		},
		{
			"lc_ans_id":"102108",
			"view":"4581",
			"top":"5",
			"title":"Share my O(n) time solution",
			"vote":"3",
			"content":"basically use a hashmap to store how many subarrays that can sum up to a number.  \\n```\\npublic int subarraySum(int[] a, int k) {\\n        int sum = 0;\\n\\t\\tHashMap<Integer, Integer> map = new HashMap<>();\\n\\t\\tmap.put(0, 1);\\n\\t\\tint count = 0;\\n\\t\\tfor (int i = 0; i < a.length; i++) {\\n\\t\\t\\tsum += a[i];\\n\\t\\t\\tif (map.containsKey(sum - k)) {\\n\\t\\t\\t\\tcount += map.get(sum-k);\\n\\t\\t\\t}\\n\\t\\t\\tif (!map.containsKey(sum)) {\\n\\t\\t\\t\\tmap.put(sum, 1);\\n\\t\\t\\t} else {\\n\\t\\t\\t    map.put(sum, map.get(sum) + 1);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn count;\\n    }\\n```"
		},
		{
			"lc_ans_id":"102125",
			"view":"248",
			"top":"6",
			"title":"Python O(n) Solution using Map",
			"vote":"1",
			"content":"    \\n    def subarraySum(self, nums, k):\\n        dic = {0:1}\\n        res, total = 0, 0\\n        for i in range(len(nums)):\\n            total += nums[i]\\n            res += dic.get(total-k, 0)\\n            dic[total] = dic.get(total, 0) + 1\\n        return res\\n      \\ninitial with {0:1} in case of total == k. \\nwe calculate the sum from the first element, we record the appearance time of each different sum.\\nwe try to find the (sum-k), since if k + (some sum appeared already)  = sum means that k could equal to (sum-some sum appeared already)  this continuous subarrays"
		},
		{
			"lc_ans_id":"102135",
			"view":"253",
			"top":"7",
			"title":"Doesn't empty array count as a sub-array?",
			"vote":"1",
			"content":"I don't see why the answer to ```nums = [1], k = 0``` should be 0\\n\\nThe problem statement does not say that we only consider non-empty sub-array.\\nAccording to this [Stanford lecture](https://web.stanford.edu/class/cs9/lectures/04/Subarray%20Sums.pdf) \\n***A subarray of an array is a consecutive sequence of zero or more values taken out of that array.***\\n\\nSo empty array does count as a sub-array."
		},
		{
			"lc_ans_id":"102139",
			"view":"155",
			"top":"8",
			"title":"Pretty easy O(n) Solution",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int SubarraySum(int[] nums, int k)\\n        {\\n            if (nums == null) return 0;\\n            int sum = 0; int count = 0;\\n            Dictionary<int, int> map = new Dictionary<int, int>();\\n            map.Add(0, 1);\\n            for (int i = 0; i < nums.Length; i++)\\n            {\\n                sum += nums[i];\\n                if (map.ContainsKey(sum - k))\\n                    count += map[sum - k];\\n                AddorUpdateDict(map, sum);\\n            }\\n            return count;\\n        }\\n        void AddorUpdateDict(Dictionary<int, int> map, int sum)\\n        {\\n            if (map.ContainsKey(sum))\\n                map[sum]++;\\n            else\\n                map.Add(sum, 1);\\n        }\\n}\\n```"
		},
		{
			"lc_ans_id":"102146",
			"view":"719",
			"top":"9",
			"title":"C++ 4 lines O(n)",
			"vote":"1",
			"content":"```\\nint subarraySum(vector<int>& nums, int k) {\\n    unordered_map<int, int> sums({{0, 1}});\\n    for (auto i = 0, sum = 0, res = 0; i < nums.size(); sum += nums[i++], ++sums[sum]) {\\n        res += sums[sum + nums[i] - k];\\n        if (i == nums.size() - 1) return res;\\n    }\\n}\\n```\\nAlso a three-liner:\\n```\\nint subarraySum(vector<int>& nums, int k) {\\n    unordered_map<int, int> sums({{0, 1}});\\n    for (auto i = 0, sum = 0; i < nums.size(); sum += nums[i++], sums[INT_MAX] += sums[sum - k], ++sums[sum]);\\n    return sums[INT_MAX];\\n}\\n```"
		}
	],
	"id":"541",
	"title":"Subarray Sum Equals K",
	"content":"<p>Given an array of integers and an integer <b>k</b>, you need to find the total number of continuous subarrays whose sum equals to <b>k</b>.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>nums = [1,1,1], k = 2\r\n<b>Output:</b> 2\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The length of the array is in range [1, 20,000].</li>\r\n<li>The range of numbers in the array is [-1000, 1000] and the range of the integer <b>k</b> is [-1e7, 1e7].</li>\r\n</ol>\r\n</p>\r\n",
	"frequency":"305",
	"ac_num":"27211"
}