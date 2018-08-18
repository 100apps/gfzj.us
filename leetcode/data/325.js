{
	"difficulty":"2",
	"submit_num":"101364",
	"show_id":"325",
	"leetcode_id":"325",
	"answers":[
		{
			"lc_ans_id":"77784",
			"view":"31086",
			"top":"0",
			"title":"O(n) super clean 9-line Java solution with HashMap",
			"vote":"161",
			"content":"    public int maxSubArrayLen(int[] nums, int k) {\\n        int sum = 0, max = 0;\\n        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();\\n        for (int i = 0; i < nums.length; i++) {\\n            sum = sum + nums[i];\\n            if (sum == k) max = i + 1;\\n            else if (map.containsKey(sum - k)) max = Math.max(max, i - map.get(sum - k));\\n            if (!map.containsKey(sum)) map.put(sum, i);\\n        }\\n        return max;\\n    }\\n\\nThe HashMap stores the sum of all elements before index i as key, and i as value. For each i, check not only the current sum but also (currentSum - previousSum) to see if there is any that equals k, and update max length.\\n\\nPS: An \"else\" is added. Thanks to beckychiu1988 for comment."
		},
		{
			"lc_ans_id":"77778",
			"view":"15820",
			"top":"1",
			"title":"Java O(n) explain how I come up with this idea",
			"vote":"98",
			"content":"The subarray sum reminds me the range sum problem. Preprocess the input array such that you get\\nthe range sum in constant time.\\nsum[i] means the sum from 0 to i inclusively\\nthe sum from i to j is sum[j] -  sum[i - 1] except that from 0 to j is sum[j].\\n\\nj-i is equal to the length of subarray of original array. we want to find the max(j - i)\\nfor any sum[j] we need to find if there is a previous sum[i] such that sum[j] - sum[i] = k\\nInstead of scanning from 0 to j -1 to find such i, we use hashmap to do the job in constant time.\\nHowever, there might be duplicate value of of sum[i] we should avoid overriding its index as we want the max j - i, so we want to keep i as left as possible.\\n\\n    public class Solution {\\n        public int maxSubArrayLen(int[] nums, int k) {\\n            if (nums == null || nums.length == 0)\\n                return 0;\\n            int n = nums.length;\\n            for (int i = 1; i < n; i++)\\n                nums[i] += nums[i - 1];\\n            Map<Integer, Integer> map = new HashMap<>();\\n            map.put(0, -1); // add this fake entry to make sum from 0 to j consistent\\n            int max = 0;\\n            for (int i = 0; i < n; i++) {\\n                if (map.containsKey(nums[i] - k))\\n                    max = Math.max(max, i - map.get(nums[i] - k));\\n                if (!map.containsKey(nums[i])) // keep only 1st duplicate as we want first index as left as possible\\n                    map.put(nums[i], i);\\n            }\\n            return max;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"77807",
			"view":"6910",
			"top":"2",
			"title":"Clean python solution, one pass",
			"vote":"24",
			"content":"Revised code, 84ms, thanks Stefan !\\n\\n    def maxSubArrayLen(self, nums, k):\\n        ans, acc = 0, 0               # answer and the accumulative value of nums\\n        mp = {0:-1}                 #key is acc value, and value is the index\\n        for i in xrange(len(nums)):\\n            acc += nums[i]\\n            if acc not in mp:\\n                mp[acc] = i \\n            if acc-k in mp:\\n                ans = max(ans, i-mp[acc-k])\\n        return ans"
		},
		{
			"lc_ans_id":"77834",
			"view":"6900",
			"top":"3",
			"title":"Is this really an \"easy\" problem",
			"vote":"18",
			"content":"It took me much more time to solve this question than any other \"Easy\" problem.\\nI think that who ever classified this problem as easy made a mistake.\\nThis is a medium level question. What makes this question harder, is the handling of 0."
		},
		{
			"lc_ans_id":"77793",
			"view":"5943",
			"top":"4",
			"title":"O(n) C++ solution using unordered_map",
			"vote":"18",
			"content":"    class Solution {\\n    public:\\n        int maxSubArrayLen(vector<int>& nums, int k) {\\n            unordered_map<int, int> sums;\\n            int cur_sum = 0;\\n            int max_len = 0;\\n            for (int i = 0; i < nums.size(); i++) {\\n                cur_sum += nums[i];\\n                if (cur_sum == k) {\\n                    max_len = i + 1;\\n                } else if (sums.find(cur_sum - k) != sums.end()) {\\n                    max_len = max(max_len, i - sums[cur_sum - k]);\\n                }\\n                if (sums.find(cur_sum) == sums.end()) {\\n                    sums[cur_sum] = i;\\n                }            \\n            }\\n            return max_len;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"77844",
			"view":"2165",
			"top":"5",
			"title":"Java with newer methods",
			"vote":"7",
			"content":"The algorithm is pretty simple and already explained by others, I just want to point out `putIfAbsent` and `getOrDefault`:\\n\\n    public int maxSubArrayLen(int[] nums, int k) {\\n        Map<Integer, Integer> index = new HashMap();\\n        index.put(0, -1);\\n        int sum = 0, max = 0;\\n        for (int i=0; i<nums.length; i++) {\\n            sum += nums[i];\\n            max = Math.max(max, i - index.getOrDefault(sum - k, i));\\n            index.putIfAbsent(sum, i);\\n        }\\n        return max;\\n    }\\n\\nThough while `putIfAbsent` is perfect here, I admit that my usage of `getOrDefault` is a bit of a hack here."
		},
		{
			"lc_ans_id":"77832",
			"view":"1792",
			"top":"6",
			"title":"Java 37ms HashMap",
			"vote":"6",
			"content":"    public int maxSubArrayLen(int[] nums, int k) {\\n            if(nums == null || nums.length == 0) return 0;\\n            int length = nums.length, sum = 0, maxSubLen = 0;\\n            //Using a hash map to store the sum of all the values before and include nums[i]\\n            Map<Integer, Integer> map = new HashMap();\\n            for(int i = 0; i < length; i++) {\\n                sum += nums[i];\\n                if(sum == k) {\\n                    maxSubLen = Math.max(maxSubLen, i + 1);\\n                } else if(map.containsKey(sum - k)) {\\n                    maxSubLen = Math.max(maxSubLen, i - map.get(sum - k));\\n                }\\n                \\n                if(!map.containsKey(sum)) {\\n                    map.put(sum, i);\\n                }\\n            }\\n            return maxSubLen;\\n        }"
		},
		{
			"lc_ans_id":"77777",
			"view":"134",
			"top":"7",
			"title":"Definition of \"Subarray\"?",
			"vote":"5",
			"content":"The questions states(on June/17):\\n>Given an array nums and a target value k, find the maximum length of a subarray that sums to k. If there isn't one, return 0 instead.\\n\\nBeware of the definition of \"subarray\", subarray don't have to be continuous.[What is difference between subarray and contiguous subarray?](https://www.quora.com/What-is-difference-between-subarray-and-contiguous-subarray)\\n\\nI tried test case: [1,-2,3], 4.\\n\\nThe top-voted solution and the OJ both return 0, rather than 2 ({1,3}).\\n![0_1496536668876_\\u6355\\u83b7.JPG](/assets/uploads/files/1496536675119-\\u6355\\u83b7-resized.jpg) \\n\\nLet's assume the question take non-continuous subarray into account, any idea on solving the non-continuous subarray case? It seems that O(N) time is hard.\\n\\nThanks in advance."
		},
		{
			"lc_ans_id":"77833",
			"view":"1342",
			"top":"8",
			"title":"Python step-by-step solution beating 100%",
			"vote":"5",
			"content":"    class Solution(object):\\n        def maxSubArrayLen(self, nums, k):\\n            \"\"\"\\n            :type nums: List[int]\\n            :type k: int\\n            :rtype: int\\n            \"\"\"\\n            sum2pos = {0:0}\\n            ans = None\\n            tsum = 0\\n            for i in xrange(len(nums)):\\n                tsum += nums[i]\\n                wanted = tsum - k\\n                if wanted in sum2pos:\\n                    length = i + 1 - sum2pos[wanted]\\n                    if ans is None or length > ans:\\n                        ans = length\\n                if tsum not in sum2pos:\\n                    sum2pos[tsum] = i + 1\\n            return ans or 0\\n\\nI don't know why it beats 100%, probably because of system error."
		},
		{
			"lc_ans_id":"77776",
			"view":"787",
			"top":"9",
			"title":"C++ easy understand solution with comment",
			"vote":"4",
			"content":"    // O(n) complexity.\\n    // Core idea: for the same cumulative sum value, we\\n    // only keep it's first appearance, so at last the\\n    // subarray is guaranteed to be the longest.\\n    // Also, note the brilliant idea of using the sum value\\n    // as the key of the map.\\n    int maxSubArrayLen(vector<int>& nums, int k) {\\n        unordered_map<int, int> m;\\n        m[0] = -1;\\n        int sum = 0;\\n        int maxLen = 0;\\n        for (int i = 0; i < nums.size(); i++) {\\n            sum += nums[i];\\n            if (!m.count(sum)) m[sum] = i;\\n            if (m.count(sum - k)) maxLen = max(maxLen, i - m[sum - k]);\\n        }\\n        return maxLen;\\n    }"
		}
	],
	"id":"325",
	"title":"Maximum Size Subarray Sum Equals k",
	"content":"<p>\r\nGiven an array <i>nums</i> and a target value <i>k</i>, find the maximum length of a subarray that sums to <i>k</i>. If there isn't one, return 0 instead.\r\n</p>\r\n\r\n<p>\r\n    <b>Note:</b><br/>\r\nThe sum of the entire <i>nums</i> array is guaranteed to fit within the 32-bit signed integer range.\r\n</p>\r\n\r\n<p>\r\n    <b>Example 1:</b><br/>\r\n</p>\r\n<p>\r\nGiven <i>nums</i> = <code>[1, -1, 5, -2, 3]</code>, <i>k</i> = <code>3</code>,<br>\r\nreturn <code>4</code>. (because the subarray <code>[1, -1, 5, -2]</code> sums to 3 and is the longest)\r\n</p>\r\n\r\n<p>\r\n    <b>Example 2:</b><br/>\r\n</p>\r\n<p>\r\nGiven <i>nums</i> = <code>[-2, -1, 2, 1]</code>, <i>k</i> = <code>1</code>,<br>\r\nreturn <code>2</code>. (because the subarray <code>[-1, 2]</code> sums to 1 and is the longest)\r\n</p>\r\n\r\n<p>\r\n    <b>Follow Up:</b><br/>\r\n    Can you do it in O(<i>n</i>) time?\r\n</p>",
	"frequency":"281",
	"ac_num":"43850"
}