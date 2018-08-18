{
	"difficulty":"1",
	"submit_num":"63770",
	"show_id":"628",
	"leetcode_id":"628",
	"answers":[
		{
			"lc_ans_id":"104729",
			"view":"11216",
			"top":"0",
			"title":"Java O(1) space O(n) time solution beat 100%",
			"vote":"47",
			"content":"Simply find out the three largest numbers and the two smallest numbers using one pass.\\n```\\n    public int maximumProduct(int[] nums) {\\n        int max1 = Integer.MIN_VALUE, max2 = Integer.MIN_VALUE, max3 = Integer.MIN_VALUE, min1 = Integer.MAX_VALUE, min2 = Integer.MAX_VALUE;\\n        for (int n : nums) {\\n            if (n > max1) {\\n                max3 = max2;\\n                max2 = max1;\\n                max1 = n;\\n            } else if (n > max2) {\\n                max3 = max2;\\n                max2 = n;\\n            } else if (n > max3) {\\n                max3 = n;\\n            }\\n\\n            if (n < min1) {\\n                min2 = min1;\\n                min1 = n;\\n            } else if (n < min2) {\\n                min2 = n;\\n            }\\n        }\\n        return Math.max(max1*max2*max3, max1*min1*min2);\\n    }\\n```"
		},
		{
			"lc_ans_id":"104755",
			"view":"7681",
			"top":"1",
			"title":"Java Easy AC...",
			"vote":"19",
			"content":"```\\n    public int maximumProduct(int[] nums) {\\n        \\n         Arrays.sort(nums);\\n         //One of the Three Numbers is the maximum value in the array.\\n\\n         int a = nums[nums.length - 1] * nums[nums.length - 2] * nums[nums.length - 3];\\n         int b = nums[0] * nums[1] * nums[nums.length - 1];\\n         return a > b ? a : b;\\n    }\\n```\\npython3\\n```\\n def maximumProduct(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        nums.sort()\\n        a = nums[-1] * nums[-2] * nums[-3]\\n        b = nums[0] * nums[1] * nums[-1]\\n        return max(a,b)\\n```"
		},
		{
			"lc_ans_id":"104739",
			"view":"3444",
			"top":"2",
			"title":"Python concise solution, O(N) and 1 line",
			"vote":"12",
			"content":"My first solution using ```sort```\\n````\\ndef maximumProduct(self, nums):\\n        nums.sort()\\n        return max(nums[-1] * nums[-2] * nums[-3], nums[0] * nums[1] * nums[-1])\\n`````\\nI found a exactly same solution in discuss. Anyway, O(NlogN) is not adorable and O(N) is possible.\\n````\\ndef maximumProduct(self, nums):\\n        a, b = heapq.nlargest(3, nums), heapq.nsmallest(2, nums)\\n        return max(a[0] * a[1] * a[2], b[0] * b[1] * a[0])\\n`````\\nMake it 1 line if you like:\\n````\\n    def maximumProduct(self, nums):\\n        return max(nums) * max(a * b for a, b in [heapq.nsmallest(2, nums), heapq.nlargest(3, nums)[1:]])"
		},
		{
			"lc_ans_id":"104779",
			"view":"2171",
			"top":"3",
			"title":"Python, Straightforward with Explanation",
			"vote":"4",
			"content":"Sort the array.  Any \"middle\" numbers not in the first 3 or last 3 cannot be used in the final answer.  If we are using a middle number, it must have both a left-neighbor and a right-neighbor, and switching to one of these neighbors will increase the product. \\n\\n```\\ndef maximumProduct(self, A):\\n    A.sort()\\n    if len(A) > 6:\\n        A = A[:3] + A[-3:]\\n    \\n    return max(A[i] * A[j] * A[k]\\n    \\t       for i in xrange(len(A))\\n    \\t       for j in xrange(i+1, len(A))\\n    \\t       for k in xrange(j+1, len(A)))\\n```"
		},
		{
			"lc_ans_id":"104743",
			"view":"2816",
			"top":"4",
			"title":"C++ Solution with explanation",
			"vote":"4",
			"content":"Either product of 3 biggest positive values will be maxProduct or if there are negative values then pick the 2 biggest negative values and multiply with biggest positive value\\n\\nSort the Array and compare above mentioned products\\n\\n\\n    int maximumProduct(vector<int>& nums) {\\n        sort(nums.begin(), nums.end());\\n        int n = nums.size();\\n        int temp1 = nums[n-1]*nums[n-2]*nums[n-3];\\n        int temp2 = nums[0]*nums[1]*nums[n-1];\\n        return temp1>temp2?temp1:temp2;\\n    }"
		},
		{
			"lc_ans_id":"104761",
			"view":"53",
			"top":"5",
			"title":"Share my python solution: one pass, O(n) time O(1) space",
			"vote":"2",
			"content":"```\\n        max1,max2,max3,min1,min2 = float('-Inf'),float('-Inf'),float('-Inf'),float('Inf'),float('Inf')\\n        for num in nums:\\n            if num >= max1:\\n                max3,max2,max1 = max2,max1,num\\n            elif num >= max2:\\n                max3,max2 = max2,num\\n            elif num > max3:\\n                max3 = num\\n            if num <= min1:\\n                min2,min1 = min1,num\\n            elif num < min2:\\n                min2 = num\\n        return max(max1*max2*max3,min1*min2*max1)\\n```\\nNo need to sort but more typing~"
		},
		{
			"lc_ans_id":"104780",
			"view":"336",
			"top":"6",
			"title":"python use no sort, but slow",
			"vote":"2",
			"content":"Time O(n), Space O(1) ?\\n```\\nclass Solution(object):\\n    def maximumProduct(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        hi = max(nums[0],nums[1])\\n        lo = min(nums[0],nums[1])\\n        \\n        hiprod2 = nums[0]*nums[1]\\n        loprod2 = nums[0]*nums[1]\\n        \\n        hiprod3 = nums[0]*nums[1]*nums[2]\\n        \\n        for num in nums[2:]:\\n            hiprod3 = max(hiprod3, hiprod2 * num, loprod2 * num)\\n            \\n            hiprod2 = max(hiprod2, hi * num, lo * num)\\n            loprod2 = min(loprod2, hi * num, lo * num)\\n            \\n            hi = max(num, hi)\\n            lo = min(num, lo)\\n            \\n        return hiprod3\\n```"
		},
		{
			"lc_ans_id":"104782",
			"view":"574",
			"top":"7",
			"title":"Share my Python solution",
			"vote":"2",
			"content":"Sort the array, the maximum product happens in two situations:\\nthe last three or the first two with the last one.\\nHere is the Python code!\\n```\\nclass Solution(object):\\n    def maximumProduct(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        nums.sort()\\n        return max(nums[-1]*nums[-2]*nums[-3], nums[0]*nums[1]*nums[-1])\\n```"
		},
		{
			"lc_ans_id":"104803",
			"view":"175",
			"top":"8",
			"title":"2-liner Python solution with explanations",
			"vote":"2",
			"content":"There are two possible ways to get the largest number:\\n1. biggest number * 2nd biggest * 3rd biggest\\n2. biggest number * smallest number * 2nd smallest number (if the two smallest numbers are negative)\\n\\nThis formula will also work in the case there are all negative numbers, in which the smallest negative number will be the result (based on condition 1).\\n\\nWe can simply sort the numbers and retrieve the biggest/smallest numbers at the two ends of the array.\\n\\n```\\ndef maximumProduct(self, nums):\\n  \"\"\"\\n  :type nums: List[int]\\n  :rtype: int\\n  \"\"\"\\n  nums = sorted(nums)\\n  return max(nums[0]*nums[1]*nums[-1], nums[-3]*nums[-2]*nums[-1])\\n```"
		},
		{
			"lc_ans_id":"104812",
			"view":"669",
			"top":"9",
			"title":"Java sort, 3 lines",
			"vote":"2",
			"content":"```\\npublic int maximumProduct(int[] a) {\\n        Arrays.sort(a);\\n        int len = a.length;\\n        return Math.max(a[0] * a[1] * a[len-1], a[len-1] * a[len-2] * a[len-3]);\\n\\n    }\\n```"
		}
	],
	"id":"606",
	"title":"Maximum Product of Three Numbers",
	"content":"<p>Given an integer array, find three numbers whose product is maximum and output the maximum product.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,3]\r\n<b>Output:</b> 6\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,3,4]\r\n<b>Output:</b> 24\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The length of the given array will be in range [3,10<sup>4</sup>] and all elements are in the range [-1000, 1000].</li>\r\n<li>Multiplication of any three numbers in the input won't exceed the range of 32-bit signed integer.</li>\r\n</ol>\r\n</p>",
	"frequency":"406",
	"ac_num":"28637"
}