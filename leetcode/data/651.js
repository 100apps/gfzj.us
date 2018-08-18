{
	"difficulty":"1",
	"submit_num":"54194",
	"show_id":"674",
	"leetcode_id":"674",
	"answers":[
		{
			"lc_ans_id":"107365",
			"view":"5483",
			"top":"0",
			"title":"[Java/C++]Clean solution",
			"vote":"15",
			"content":"The idea is to use ```cnt``` to record the length of the current continuous increasing subsequence which ends with ```nums[i]```, and use ```res``` to record the maximum ```cnt```.\\n\\nJava version:\\n```\\n    public int findLengthOfLCIS(int[] nums) {\\n        int res = 0, cnt = 0;\\n        for(int i = 0; i < nums.length; i++){\\n            if(i == 0 || nums[i-1] < nums[i]) res = Math.max(res, ++cnt);\\n            else cnt = 1;\\n        }\\n        return res;\\n    }\\n```\\n\\nC++ version:\\n```\\n    int findLengthOfLCIS(vector<int>& nums) {\\n        int res = 0, cnt = 0;\\n        for(int i = 0; i < nums.size(); i++){\\n            if(i == 0 || nums[i-1] < nums[i]) res = max(res, ++cnt);\\n            else cnt = 1;\\n        }\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"107352",
			"view":"945",
			"top":"1",
			"title":"Java code---6 liner",
			"vote":"7",
			"content":"```\\nclass Solution {\\n    public int findLengthOfLCIS(int[] nums) {\\n        int length=0;\\n        int tmp=1;\\n        if(nums.length==0) return 0;\\n        for(int i=0; i<nums.length-1;i++){\\n            if(nums[i]<nums[i+1]) {tmp++; length=Math.max(length,tmp); }\\n            if(nums[i]>=nums[i+1]) {tmp=1;}   \\n        }\\n        return Math.max(length,1);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107392",
			"view":"1496",
			"top":"2",
			"title":"Python Simple Solution",
			"vote":"5",
			"content":"A continuous subsequence is essentially a subarray. Hence this question is asking for the longest increasing subarray and I have no idea why the question calls it continuous subsequence to confuse the readers. \\n\\nAnyway, we can make one pass of the array and keep track of the current streak of increasing elements, reset it when it does not increase.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def findLengthOfLCIS(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        # Time: O(n)\\n        # Space: O(1)\\n        max_len = i = 0\\n        while i < len(nums):\\n            curr = 1\\n            while i + 1 < len(nums) and nums[i] < nums[i + 1]:\\n                curr, i = curr + 1, i + 1\\n            max_len = max(max_len, curr)\\n            i += 1\\n        return max_len\\n```"
		},
		{
			"lc_ans_id":"107389",
			"view":"969",
			"top":"3",
			"title":"[C++/Java] Clean Code - 3 liner [2 Pointers]",
			"vote":"3",
			"content":"**C++ record length**\\n```\\nclass Solution {\\npublic:\\n    int findLengthOfLCIS(vector<int>& a) {\\n        int mx = 0, len = 0;\\n        for (int i = 0; i < a.size(); i++) {\\n            if (i == 0 || a[i] <= a[i - 1]) len = 0;\\n            mx = max(mx, ++len);\\n        }\\n        return mx;\\n    }\\n};\\n```\\n**C++ 2 pointer**\\n```\\nclass Solution {\\npublic:\\n    int findLengthOfLCIS(vector<int>& a) {\\n        int mx = 0;\\n        for (int i = 0, j = 0; j < a.size(); j++) {\\n            if (j == 0 || a[j] <= a[j - 1]) i = j;\\n            mx = max(mx, j - (i - 1))\\n        }\\n        return mx;\\n    }\\n};\\n```\\n3 liner\\n```\\nclass Solution {\\npublic:\\n    int findLengthOfLCIS(vector<int>& a) {\\n        int mx = 0;\\n        for (int i = 0, j = 0; j < a.size(); i = (j == 0 || a[j] <= a[j - 1]) ? j : i, mx = max(mx, j - (i - 1)), j++) { }\\n        return mx;\\n    }\\n};\\n```\\n**Java - 2 pointer**\\n```\\nclass Solution {\\n    public int findLengthOfLCIS(int[] a) {\\n        int mx = 0;\\n        for (int i = 0, j = 0; j < a.length; i = (j == 0 || a[j] <= a[j - 1]) ? j : i, mx = Math.max(mx, j - i + 1), j++) { }\\n        return mx;\\n    }\\n}\\n```\\n\\n**Java length variable**\\n```\\nclass Solution {\\n    public int findLengthOfLCIS(int[] a) {\\n        int mx = 0, len = 0;\\n        for (int i = 0; i < a.length; i++) {\\n            if (i == 0 || a[i] <= a[i - 1]) len = 0;\\n            mx = Math.max(mx, ++len);\\n        }\\n        return mx;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107351",
			"view":"1692",
			"top":"4",
			"title":"Java solution, DP",
			"vote":"2",
			"content":"```\\nclass Solution {\\n    public int findLengthOfLCIS(int[] nums) {\\n        if (nums == null || nums.length == 0) return 0;\\n        int n = nums.length;\\n        int[] dp = new int[n];\\n        \\n        int max = 1;\\n        dp[0] = 1;\\n        for (int i = 1; i < n; i++) {\\n            if (nums[i] > nums[i - 1]) {\\n                dp[i] = dp[i - 1] + 1;\\n            }\\n            else {\\n                dp[i] = 1;\\n            }\\n            max = Math.max(max, dp[i]);\\n        }\\n        \\n        return max;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107343",
			"view":"21",
			"top":"5",
			"title":"Different outputs on \"RunCode\" and \"Submit\".",
			"vote":"0",
			"content":"Can anyone please tell why i am getting different output on \"RunCode\" and \"Submit\".\\nWhat is wrong with this code?\\n\\n![0_1512838145796_code.PNG](/assets/uploads/files/1512838155507-code.png) \\n![0_1512838077560_Capture.PNG](/assets/uploads/files/1512838086388-capture-resized.png)"
		},
		{
			"lc_ans_id":"107344",
			"view":"25",
			"top":"6",
			"title":"[Java] clean and easy to understand solution",
			"vote":"0",
			"content":"I know it is an easy question, but just want to have a taste of sharing solution :0\\n\\nIn the for loop, I choose to start from index 1 rather than 0, since except for edge cases, the length should be at least 1.\\n\\n```\\nclass Solution {\\n    public int findLengthOfLCIS(int[] nums) {\\n        if(nums.length < 2) return nums.length; // edge cases  \\n        int maxLen = 1, curLen = 1;   // ** length is at least 1\\n        for(int i = 1; i < nums.length; i++){\\n            if(nums[i] > nums[i-1]){\\n                curLen++;\\n                maxLen = Math.max(maxLen, curLen);\\n            }else curLen = 1;        // ** length is at least 1\\n        }\\n        return maxLen;\\n    }\\n}\\n```\\nTime: O(n)\\nSpace: O(1)"
		},
		{
			"lc_ans_id":"107345",
			"view":"25",
			"top":"7",
			"title":"Python solution",
			"vote":"0",
			"content":"```\\nclass Solution:\\n    def findLengthOfLCIS(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        \\n        if nums ==[]:\\n            return 0\\n\\n        maxCount = tmpCount = 1\\n        for i in range(len(nums)-1):\\n            if nums[i] < nums[i+1]:\\n                tmpCount +=1\\n                maxCount = max(maxCount,tmpCount)\\n            else:\\n                tmpCount = 1  \\n        return maxCount\\n```"
		},
		{
			"lc_ans_id":"107346",
			"view":"32",
			"top":"8",
			"title":"A simple C solution [Accepted]",
			"vote":"0",
			"content":"```\\nint findLengthOfLCIS(int* nums, int numsSize) {\\n    if(numsSize==0)\\n    {\\n        return 0;\\n    }\\n    int temp=1;\\n    int result=1;\\n    for(int i=1;i<numsSize;i++)\\n    {\\n        if(nums[i]>nums[i-1])\\n        {temp++;}\\n        else\\n        {\\n            if(result<temp)\\n            {result=temp;}\\n            temp=1;\\n        }\\n    }    \\n    if(result<temp)\\n    {result=temp;}\\n    return result;\\n}\\n````"
		},
		{
			"lc_ans_id":"107347",
			"view":"27",
			"top":"9",
			"title":"[Java] Easy solution",
			"vote":"0",
			"content":"```\\nclass Solution {\\n    public int findLengthOfLCIS(int[] nums) {\\n        if (nums.length == 0) return 0;\\n        int seq = 1, cis = 1; \\n        for (int i = 0; i < nums.length - 1; ++i) {\\n            if (nums[i] - nums[i + 1] < 0) seq++;\\n            cis = Math.max(cis, seq);\\n            if (nums[i] - nums[i + 1] >= 0) seq = 1;    \\n        }\\n        return cis;\\n    }\\n}\\n```"
		}
	],
	"id":"651",
	"title":"Longest Continuous Increasing Subsequence",
	"content":"<p>\r\nGiven an unsorted array of integers, find the length of longest <code>continuous</code> increasing subsequence (subarray).\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,3,5,4,7]\r\n<b>Output:</b> 3\r\n<b>Explanation:</b> The longest continuous increasing subsequence is [1,3,5], its length is 3. \r\nEven though [1,3,5,7] is also an increasing subsequence, it's not a continuous one where 5 and 7 are separated by 4. \r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [2,2,2,2,2]\r\n<b>Output:</b> 1\r\n<b>Explanation:</b> The longest continuous increasing subsequence is [2], its length is 1. \r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nLength of the array will not exceed 10,000.\r\n</p>",
	"frequency":"260",
	"ac_num":"23002"
}