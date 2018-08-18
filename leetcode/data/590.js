{
	"difficulty":"2",
	"submit_num":"34028",
	"show_id":"611",
	"leetcode_id":"611",
	"answers":[
		{
			"lc_ans_id":"104174",
			"view":"7903",
			"top":"0",
			"title":"Java O(n^2) Time O(1) Space",
			"vote":"63",
			"content":"```\\npublic static int triangleNumber(int[] A) {\\n    Arrays.sort(A);\\n    int count = 0, n = A.length;\\n    for (int i=n-1;i>=2;i--) {\\n        int l = 0, r = i-1;\\n        while (l < r) {\\n            if (A[l] + A[r] > A[i]) {\\n                count += r-l;\\n                r--;\\n            }\\n            else l++;\\n        }\\n    }\\n    return count;\\n}\\n```"
		},
		{
			"lc_ans_id":"104169",
			"view":"2943",
			"top":"1",
			"title":"Java Solution, 3 pointers",
			"vote":"11",
			"content":"Same as https://leetcode.com/problems/3sum-closest\\n\\nAssume ```a``` is the longest edge, ```b``` and ```c``` are shorter ones, to form a triangle, they need to satisfy ```len(b) + len(c) > len(a)```.\\n\\n```\\npublic class Solution {\\n    public int triangleNumber(int[] nums) {\\n        int result = 0;\\n        if (nums.length < 3) return result;\\n        \\n        Arrays.sort(nums);\\n\\n        for (int i = 2; i < nums.length; i++) {\\n            int left = 0, right = i - 1;\\n            while (left < right) {\\n                if (nums[left] + nums[right] > nums[i]) {\\n                    result += (right - left);\\n                    right--;\\n                }\\n                else {\\n                    left++;\\n                }\\n            }\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104164",
			"view":"2541",
			"top":"2",
			"title":"Can this problem  possibly be solved by python?",
			"vote":"6",
			"content":"O(n^2) python solution got TLE.\\nI assume no faster solutions exist, right?"
		},
		{
			"lc_ans_id":"104177",
			"view":"548",
			"top":"3",
			"title":"O(N^2) solution for C++ & Python",
			"vote":"4",
			"content":"c++\\n```\\nclass Solution {\\npublic:\\n    int triangleNumber(vector<int>& nums) {\\n        vector<int> snums(nums);\\n        sort(snums.begin(), snums.end());\\n        int count = 0;\\n        for ( int n = nums.size(), k = n - 1; k > 1; --k ) {\\n            int i = 0, j = k - 1;\\n            while ( i < j ) {\\n                // any value x between i...j will satisfy snums[x] + snums[j] > snums[k]\\n                // and because snums[k] > snums[j] > snums[x] >= 0, they will always satisfy\\n                // snums[k] + snums[x] > snums[j] and snums[k] + snums[j] > snums[x]\\n                if ( snums[i] + snums[j] > snums[k] )\\n                    count += --j - i + 1;\\n                else\\n                    ++i;\\n            }\\n        }\\n        return count;\\n    }\\n};\\n\\n// 243 / 243 test cases passed.\\n// Status: Accepted\\n// Runtime: 59 ms\\n```\\npython solution, sometimes it might fail TLE\\n```\\nclass Solution(object):\\n    def triangleNumber(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        nums, count, n = sorted(nums, reverse=1), 0, len(nums)\\n        for i in xrange(n):\\n            j, k = i + 1, n - 1\\n            while j < k:\\n                # any value x between j...k will satisfy nums[j] + nums[x] > nums[i]\\n                # and because nums[i] > nums[j] > nums[x] >= 0, they will always satisfy\\n                # nums[i] + nums[x] > nums[j] and nums[i] + nums[j] > nums[x]\\n                if nums[j] + nums[k] > nums[i]:\\n                    count += k - j\\n                    j += 1\\n                else:\\n                    k -= 1\\n        return count\\n\\n# 243 / 243 test cases passed.\\n# Status: Accepted\\n# Runtime: 1855 ms\\n```"
		},
		{
			"lc_ans_id":"104204",
			"view":"1489",
			"top":"4",
			"title":"Python, Straightforward with Explanation",
			"vote":"2",
			"content":"Sort the array.  For every pair of sticks u, v with stick u occuring before v (u <= v), we want to know how many w occuring after v have w < u + v.\\n\\nFor every middle stick B[j] = v, we can use two pointers: one pointer i going down from j to 0, and one pointer k going from the end to j.  This is because if we have all w such that w < u + v, then decreasing u cannot make this set larger.\\n\\nLet's look at an extension where our sorted array is grouped into counts of it's values.  For example, instead of dealing with A = [2,2,2,2,3,3,3,3,3,4,4,4], we should deal with only B = [2, 3, 4] and keep a sidecount of C[2] = 4, C[3] = 5, C[4] = 3.  We'll also keep a prefix sum P[k] = C[B[0]] + C[B[1]] + ... + C[B[k-1]]  (and P[0] = 0.)\\n\\nWhen we are done setting our pointers and want to add the result, we need to add the result taking into account multiplicities (how many times each kind of triangle occurs.)  When i == j or j == k, this is a little tricky, so let's break it down case by case.\\n\\n* When i < j, we have C[B[i]] * C[B[j]] * (P[k+1] - P[j+1]) triangles where the last stick has a value > B[j].  Then, we have another C[B[i]] * (C[B[j]] choose 2) triangles where the last stick has value B[j].\\n* When i == j, we have (C[B[i]] choose 2) * (P[k+1] - P[j+1]) triangles where the last stick has value > B[j].  Then, we have another (C[B[i]] choose 3) triangles where the last stick has value B[j].\\n\\n```\\ndef triangleNumber(self, A):\\n    C = collections.Counter(A)\\n    C.pop(0, None)\\n    B = sorted(C.keys())\\n    P = [0]\\n    for x in B:\\n        P.append(P[-1] + C[x])\\n        \\n    ans = 0\\n    for j, v in enumerate(B):\\n        k = len(B) - 1\\n        i = j\\n        while 0 <= i <= j <= k:\\n            while k > j and B[i] + B[j] <= B[k]:\\n                k -= 1\\n            if i < j:\\n                ans += C[B[i]] * C[B[j]] * (P[k+1] - P[j+1])\\n                ans += C[B[i]] * C[B[j]] * (C[B[j]] - 1) / 2\\n            else:\\n                ans += C[B[i]] * (C[B[i]] - 1) / 2 * (P[k+1] - P[j+1])\\n                ans += C[B[i]] * (C[B[i]] - 1) * (C[B[i]] - 2) / 6\\n            i -= 1\\n    return ans\\n```"
		},
		{
			"lc_ans_id":"104200",
			"view":"1398",
			"top":"5",
			"title":"Solution Similar to Leetcode 259. 3Sum Smaller",
			"vote":"2",
			"content":" /** we need to find 3 number,  i < j < k, and a[i] + a[j] > a[k];\\n\\t *  if we sort the array, then we can easily use two pointer to find all the pairs we need.\\n\\t *  if at some point a[left] + a[right] > a[i], all the elements from left to right-1 are valid.\\n\\t *  because they are all greater then a[left];\\n\\t *  so we do count += right - left;  and right--\\n\\t *  \\n\\t *  otherwise, we increment left till we get a valid pair.\\n\\n\\n```\\npublic int triangleNumber(int[] nums) {\\n\\t\\tif (nums == null || nums.length <= 2) {\\n\\t\\t\\treturn 0;\\n\\t\\t}\\n\\t\\tArrays.sort(nums);\\n\\t\\tint count = 0;\\n\\t\\t\\n\\t\\tfor (int i = 0; i < nums.length; i++) {\\n\\t\\t\\tint left = 0, right = i-1;\\n\\t\\t\\twhile (left < right) {\\n\\t\\t\\t\\tif (nums[left] + nums[right] > nums[i]) {\\n\\t\\t\\t\\t\\tcount += right - left;\\n\\t\\t\\t\\t\\tright--;\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\tleft++;\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn count;\\n    }\\n```"
		},
		{
			"lc_ans_id":"104173",
			"view":"152",
			"top":"6",
			"title":"Java backtrack",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    \\n    int count = 0;\\n    \\n    public int triangleNumber(int[] nums) {\\n        int len = nums.length;\\n        if(len<3){\\n            return 0;\\n        }\\n        Arrays.sort(nums);\\n        \\n        backtrack(nums,0,0,0,0);\\n        return count;\\n    }\\n    \\n    public void backtrack(int[] nums, int index, int sideused, int sum, int cur){        \\n        if(sideused>3){\\n            return;\\n        }        \\n        //\\u8fd9\\u91cc\\u4e00\\u5b9a\\u8981\\u662f3\\uff0c\\u8fd9\\u6837\\u624d\\u80fd\\u904d\\u5386\\u5b8c\\u5168\\u90e8\\u53ef\\u80fd\\uff0c\\u5982\\u679c\\u662f2\\uff0c\\u90a3\\u4e48\\u7b2c\\u4e09\\u4e2a\\u6570\\u5c31\\u53ea\\u80fd\\u5230\\u7b2c\\u4e8c\\u4e2a\\u6570\\u7684index+1,\\u4e0d\\u80fd\\u5230index+2\\u6216\\u8005\\u66f4\\u591a\\u3002\\n        if(sideused==3 && sum-cur>cur){\\n           \\n            count++;\\n            return;\\n        }\\n        for(int i=index;i<nums.length;i++){\\n            if(i>=nums.length || sideused>=3){\\n                return;\\n            }\\n            if(nums[i]==0){\\n                continue;\\n            }           \\n            backtrack(nums,i+1,sideused+1,sum+nums[i],nums[i]);    \\n        }\\n    }\\n    \\n    \\n}\\n```"
		},
		{
			"lc_ans_id":"104187",
			"view":"135",
			"top":"7",
			"title":"Python O(n^2) solution, 526 ms",
			"vote":"1",
			"content":"  \\n    def triangleNumber(self, nums):\\n        nums = sorted(nums)\\n        total = 0\\n        for i in range(len(nums)-2):\\n            if nums[i] == 0:\\n                continue\\n            end = i + 2\\n            for j in range(i+1, len(nums)-1):\\n                while end < len(nums) and nums[end] < (nums[i] + nums[j]):\\n                    end += 1\\n                total += end - j - 1\\n        return total"
		},
		{
			"lc_ans_id":"104191",
			"view":"233",
			"top":"8",
			"title":"Java O(n^2) solution, similar to 3 sum problem",
			"vote":"1",
			"content":"We only need to satisfy the condition that the sum of the two shorter edges is strictly greater than the longest edge.\\n```\\n    public int triangleNumber(int[] nums) {\\n        int n = nums.length;\\n        if (n < 3) return 0;\\n        Arrays.sort(nums);\\n        int ans = 0;\\n        for (int i = 0; i < nums.length-2; i++) {\\n            for (int j = i+1, k = i+2; k < nums.length; k++) {\\n                while (j < k && nums[i]+nums[j] <= nums[k]) j++;\\n                ans += k-j;\\n            }\\n        }\\n        return ans;\\n    }\\n```"
		},
		{
			"lc_ans_id":"104179",
			"view":"674",
			"top":"9",
			"title":"Python O(n^2)",
			"vote":"1",
			"content":"```\\nclass Solution(object):\\n    def triangleNumber(self, nums):\\n        nums.sort()\\n        nums = nums[::-1]\\n        \\n        sol = 0\\n        \\n        for i in range(len(nums) - 2):\\n            k = len(nums) - 1\\n            for j in range(i + 1, k):\\n                if j >= k:\\n                    break\\n                diff = nums[i] - nums[j]\\n                while nums[k] <= diff and k > j:\\n                    k -= 1\\n                sol += (k - j)\\n        return sol\\n```"
		}
	],
	"id":"590",
	"title":"Valid Triangle Number",
	"content":"Given an array consists of non-negative integers,  your task is to count the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [2,2,3,4]\r\n<b>Output:</b> 3\r\n<b>Explanation:</b>\r\nValid combinations are: \r\n2,3,4 (using the first 2)\r\n2,3,4 (using the second 2)\r\n2,2,3\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The length of the given array won't exceed 1000.</li>\r\n<li>The integers in the given array are in the range of [0, 1000].</li>\r\n</ol>\r\n</p>\r\n",
	"frequency":"173",
	"ac_num":"14420"
}