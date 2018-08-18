{
	"difficulty":"1",
	"submit_num":"29172",
	"show_id":"724",
	"leetcode_id":"724",
	"answers":[
		{
			"lc_ans_id":"109249",
			"view":"1756",
			"top":"0",
			"title":"Java 6 liner",
			"vote":"9",
			"content":"```\\nclass Solution {\\n    public int pivotIndex(int[] nums) {\\n        int sum = 0, left = 0;\\n        for (int i = 0; i < nums.length; i++) sum += nums[i];\\n        \\n        for (int i = 0; i < nums.length; i++) {\\n            if (i != 0) left += nums[i - 1];\\n            if (sum - left - nums[i] == left) return i;\\n        }\\n        \\n        return -1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109255",
			"view":"721",
			"top":"1",
			"title":"Short Python O(n) time O(1) space with Explanation",
			"vote":"4",
			"content":"As we iterate through the array of numbers, we need to keep track of the sum of the values on the current number's left and its right. The following debugger trace demonstrates the values of the variables in each loop before the `left == right` line\\n\\nInput: `[1, 7, 3, 6, 5, 6]`\\n\\n1. `index`: 0, `num`: 1, `left`: 0, `right`: 27\\n1. `index`: 1, `num`: 7, `left`: 1, `right`: 20\\n1. `index`: 2, `num`: 3, `left`: 8, `right`: 17\\n1. `index`: 3, `num`: 6, `left`: 11, `right`: 11 <-- Found!!!\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def pivotIndex(self, nums):\\n        # Time: O(n)\\n        # Space: O(1)\\n        left, right = 0, sum(nums)\\n        for index, num in enumerate(nums):\\n            right -= num\\n            if left == right:\\n                return index\\n            left += num\\n        return -1\\n```"
		},
		{
			"lc_ans_id":"109274",
			"view":"947",
			"top":"2",
			"title":"[Java/C++] Clean Code",
			"vote":"4",
			"content":"**Java**\\n```\\nclass Solution {\\n    public int pivotIndex(int[] nums) {\\n        int total = 0, sum = 0\\n        for (int num : nums) total += num;\\n        for (int i = 0; i < nums.length; sum += nums[i++])\\n            if (sum * 2 == total - nums[i]) return i;\\n        return -1;  \\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int pivotIndex(vector<int>& nums) {\\n        int total = 0;\\n        for (int num : nums) total += num;\\n        int sum = 0;\\n        for (int i = 0; i < nums.size(); sum += nums[i++])\\n            if (sum * 2 == total - nums[i])\\n                return i;\\n        \\n        return -1;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109261",
			"view":"197",
			"top":"3",
			"title":"Very easy understandable JAVA solution with O(N) time complexity and O(1) space complexity",
			"vote":"1",
			"content":"```\\nclass Solution {\\n    public int pivotIndex(int[] nums) {\\n        int sum = 0;\\n       //Get the sum of the array\\n        for (int i = 0; i < nums.length; i++) {\\n            sum += nums[i];\\n        }\\n        int preSum = 0;\\n        for (int i = 0; i < nums.length; i++) {\\n            //if if sum - nums[i] == preSum * 2, mean left sum equals to right sum\\n            if (sum - nums[i] == preSum * 2) {\\n                return i;\\n            }\\n            preSum += nums[i];\\n        }\\n        //not found the index\\n        return -1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109239",
			"view":"15",
			"top":"4",
			"title":"easy python",
			"vote":"0",
			"content":"```\\nclass Solution(object):\\n    def pivotIndex(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        if len(nums) == 0:\\n            return -1\\n        left = [0, nums[0]]\\n        right = [0, nums[-1]]\\n        for i in range(1, len(nums) - 1):\\n            left.append(nums[i] + left[-1])\\n            right.append(nums[len(nums) - 1 - i] + right[-1])\\n        right = right[::-1]\\n        for i in range(len(left)):\\n            if left[i] == right[i]:\\n                return i\\n        return -1"
		},
		{
			"lc_ans_id":"109240",
			"view":"23",
			"top":"5",
			"title":"DP solution in JAVA",
			"vote":"0",
			"content":"DP solution in Java\\n```\\n    public int pivotIndex(int[] nums) {\\n        if (nums == null || nums.length <= 2) {\\n            return -1;\\n        }\\n\\n        int n = nums.length;\\n        int[] lr = new int[n];\\n        int[] rl = new int[n];\\n        for (int i = 1 ; i < n; i++) {\\n            lr[i] = nums[i - 1] + lr[i - 1];\\n        }\\n        for (int i = n - 2; i >= 0; i--) {\\n            rl[i] = rl[i + 1] + nums[i + 1];\\n        }\\n\\n        for (int i = 0; i < n; i++) {\\n            if (lr[i] == rl[i]) {\\n                return i;\\n            }\\n        }\\n        return -1;\\n    }\\n```\\n\\nNot the optimized in term of space. But this kind of thinking can be applied to multiple problems.\\n\\nScan the nums twice - left to right and right to left. Keep track of the sum from left to right and right to left. Then compare and find the same value."
		},
		{
			"lc_ans_id":"109241",
			"view":"27",
			"top":"6",
			"title":"Straightforward Java Solution, beat 96.33% for now.",
			"vote":"0",
			"content":"```\\nclass Solution {\\n    public int pivotIndex(int[] nums) {\\n        int pivot = -1;\\n        int n = nums.length;\\n        if(nums == null || n == 0) return pivot;\\n        \\n        int left = 0, right = nums[0];\\n        for(int i = 1; i < n; i++){\\n            right += nums[i];\\n        }\\n        \\n        for(int i = 0; i < n; i++){\\n            right -= nums[i];\\n            if(left == right) return i;\\n            left += nums[i];\\n        }\\n        \\n        return pivot;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109242",
			"view":"31",
			"top":"7",
			"title":"4-liner straighforward O(N) time O(1) space",
			"vote":"0",
			"content":"```cpp\\nint pivotIndex(vector<int>& nums) \\n    {\\n        int sum = accumulate(nums.begin(), nums.end(), 0);        \\n        for (int i = 0, leftSum = 0; i < nums.size(); leftSum += nums[i++])\\n            if (2*leftSum == sum - nums[i]) return i;\\n\\n        return -1;\\n    }\\n```"
		},
		{
			"lc_ans_id":"109243",
			"view":"25",
			"top":"8",
			"title":"Python o(n) time",
			"vote":"0",
			"content":"```python\\nclass Solution(object):\\n    def pivotIndex(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        ret = sum(nums)\\n        left = 0\\n        for k, v in enumerate(nums):\\n            if left * 2 + v == ret:\\n                return k\\n            left += v\\n        return -1\\n\\n```"
		},
		{
			"lc_ans_id":"109244",
			"view":"37",
			"top":"9",
			"title":"5 lines C++",
			"vote":"0",
			"content":"```\\nclass Solution {\\npublic:\\n    int pivotIndex(vector<int>& nums) {\\n        int n = nums.size(), left = 0, right = 0;\\n        for(int x: nums) right += x;\\n        for(int i = 0; i < n; left += nums[i], right -= nums[i], i++) \\n            if(left == right - nums[i]) return i;\\n        return -1;\\n    }\\n};\\n```"
		}
	],
	"id":"690",
	"title":"Find Pivot Index",
	"content":"<p>Given an array of integers <code>nums</code>, write a method that returns the \"pivot\" index of this array.\r\n</p><p>\r\nWe define the pivot index as the index where the sum of the numbers to the left of the index is equal to the sum of the numbers to the right of the index.\r\n</p><p>\r\nIf no such index exists, we should return -1. If there are multiple pivot indexes, you should return the left-most pivot index.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nnums = [1, 7, 3, 6, 5, 6]\r\n<b>Output:</b> 3\r\n<b>Explanation:</b> \r\nThe sum of the numbers to the left of index 3 (nums[3] = 6) is equal to the sum of numbers to the right of index 3.\r\nAlso, 3 is the first index where this occurs.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nnums = [1, 2, 3]\r\n<b>Output:</b> -1\r\n<b>Explanation:</b> \r\nThere is no index that satisfies the conditions in the problem statement.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>The length of <code>nums</code> will be in the range <code>[0, 10000]</code>.</li>\r\n<li>Each element <code>nums[i]</code> will be an integer in the range <code>[-1000, 1000]</code>.</li>\r\n</p>",
	"frequency":"159",
	"ac_num":"11677"
}