{
	"difficulty":"2",
	"submit_num":"21027",
	"show_id":"713",
	"leetcode_id":"713",
	"answers":[
		{
			"lc_ans_id":"108830",
			"view":"2665",
			"top":"0",
			"title":"C++, concise solution, O(n)",
			"vote":"8",
			"content":"Here are two solutions with similar ideas.\\n\\nFor nums[i], count range [left, i], whose product is just < k\\n```\\nclass Solution {\\npublic:\\n    int numSubarrayProductLessThanK(vector<int>& nums, int k) {\\n        if (k <= 1) return 0;\\n        int n = nums.size(), prod = 1, ans = 0, left = 0;\\n        for (int i = 0; i < n; i++) {\\n            prod *= nums[i];\\n            while (prod >= k) prod /= nums[left++];\\n            ans += i - left + 1;\\n        }\\n        return ans;\\n    }\\n};\\n```\\nFor nums[i], count range [i, j) \\n```\\nclass Solution {\\npublic:\\n    int numSubarrayProductLessThanK(vector<int>& nums, int k) {\\n        int n = nums.size(), ans = 0, prod = 1, j = 0;\\n        for (int i = 0; i < n; i++) {\\n            if (i > 0 && i <= j) \\n                prod =  prod/nums[i-1];\\n            else \\n                j = i;\\n            while (j < n &&  prod*nums[j] < k) prod *= nums[j++];\\n            ans += j-i;\\n        }\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108834",
			"view":"1081",
			"top":"1",
			"title":"Java Two Pointers O(n) time O(1) space",
			"vote":"4",
			"content":"```\\nclass Solution {\\n    public int numSubarrayProductLessThanK(int[] nums, int k) {\\n        int n = nums.length;\\n        long p = 1l;\\n        int i = 0;\\n        int j = 0;\\n        int total = 0;\\n        while(j < n){\\n            p *= nums[j];\\n            while(i <= j&&p >= k){\\n                p /= nums[i];\\n                i++;\\n            }\\n            total += (j - i + 1);\\n            j++;\\n        }\\n        return total;\\n    }\\n}"
		},
		{
			"lc_ans_id":"108832",
			"view":"1992",
			"top":"2",
			"title":"Straightforward Solution",
			"vote":"3",
			"content":"Thanks for @ohazyi and @awice pointing it out. I've updated my code below and it passes all test cases now.\\n```\\npublic int numSubarrayProductLessThanK(int[] nums, int k) {\\n            if (k < 2) {\\n                return 0;\\n            }\\n            int result = 0;\\n            int product = 1;\\n            for (int i = 0, right = 0; right < nums.length; right++) {\\n                product *= nums[right];\\n                while (i < nums.length && product >= k) {\\n                    product /= nums[i++];\\n                }\\n                result += right - i + 1;\\n            }\\n            return result;\\n        }\\n```"
		},
		{
			"lc_ans_id":"108861",
			"view":"130",
			"top":"3",
			"title":"[Java/C++] Clean Code with Explanation",
			"vote":"2",
			"content":"1. The idea is always keep an `max-product-window` less than `K`;\\n2. Every time shift window by adding a new number on the right(`j`), if the product is greater than k, then try to reduce numbers on the left(`i`), until the subarray product fit less than `k` again, (subarray could be empty);\\n3. Each step introduces `x` new subarrays, where x is the size of the current window `(j + 1 - i)`;\\nexample:\\n for window (5, 2), when 6 is introduced, it add 3 new subarray:   (5, (2, (6)))\\n\\n```\\n        (6)\\n     (2, 6)\\n  (5, 2, 6)\\n```\\n\\n**Java**\\n```\\nclass Solution {\\n    public int numSubarrayProductLessThanK(int[] nums, int k) {\\n        if (k == 0) return 0;\\n        int cnt = 0;\\n        int pro = 1;\\n        for (int i = 0, j = 0; j < nums.length; j++) {\\n            pro *= nums[j];\\n            while (i <= j && pro >= k) {\\n                pro /= nums[i++];\\n            }\\n            cnt += j - i + 1;\\n        }\\n        return cnt;        \\n    }\\n}\\n```\\n**C++**\\n```\\n/**\\n * The idea is always keep an max-product-window less than K;\\n * Every time add a new number on the right(j), reduce numbers on the left(i), until the subarray product fit less than k again, (subarray could be empty);\\n * Each step introduces x new subarrays, where x is the size of the current window (j + 1 - i);\\n * example:\\n * for window (5, 2, 6), when 6 is introduced, it add 3 new subarray:\\n *       (6)\\n *    (2, 6)\\n * (5, 2, 6)\\n */\\nclass Solution {\\npublic:\\n    int numSubarrayProductLessThanK(vector<int>& nums, int k) {\\n        if (k == 0) return 0;\\n        int cnt = 0;\\n        int pro = 1;\\n        for (int i = 0, j = 0; j < nums.size(); j++) {\\n            pro *= nums[j];\\n            while (i <= j && pro >= k) {\\n                pro /= nums[i++];\\n            }\\n            cnt += j - i + 1;\\n        }\\n        return cnt;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108831",
			"view":"91",
			"top":"4",
			"title":"straightforward two-pointer python O(n) solution",
			"vote":"1",
			"content":"        status = (1, 0) # (product of elements in window, left window)\\n        result = 0\\n        for i, num in enumerate(nums):\\n            product, left = status\\n            product *= num\\n            while product >= k and left < i+1:\\n                product /= nums[left]\\n                left += 1\\n            status = (product, left)\\n            result += i - left + 1          \\n        return result"
		},
		{
			"lc_ans_id":"108858",
			"view":"58",
			"top":"5",
			"title":"C++ O(n) two-pointer concise solution",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    int numSubarrayProductLessThanK(vector<int>& a, int k) {\\n        int p = 1, j = 0, ans = 0;\\n        for (int i = 0; i < a.size(); ++i) {\\n            while (j < a.size() && p * a[j] < k) p *= a[j++];\\n            ans += j-i;\\n            if (i == j) ++j, p = 1;\\n            else p/=a[i];\\n        }\\n        \\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108857",
			"view":"495",
			"top":"6",
			"title":"the problem specification fools me",
			"vote":"1",
			"content":"in the problem description, it specially notes that ``0 < nums.length <= 50000.`` which means O(n^2) brute force solution is not acceptable, however, it does!!\\nI spent much time to figure out a fast solution, but you only need to write a brute force solution in a contest, to get 7 points, just need to be brave enough and endurable for the potential 5 minutes penalty!!\\n\\nI really hope the contest editor can seriously honor your problem specification and test cases.\\n\\nthe damm brute force solution in python, it runs 375ms in contest total 64 cases, but runs 3160ms for single case which nums=[1]* 10000, k=2:\\n```\\nclass Solution(object):\\n    def numSubarrayProductLessThanK(self, nums, k):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type k: int\\n        :rtype: int\\n        \"\"\"\\n        ret = 0\\n        for i in xrange(len(nums)):\\n            p = 1\\n            for j in xrange(i, len(nums)):\\n                p *= nums[j]\\n                if p >= k:\\n                    break\\n                ret += 1\\n        return ret\\n```\\nthe ugly but faster solution I write in contest, it only runs 6ms for nums=[1]*10000, k=2\\n```\\nclass Solution(object):\\n    def numSubarrayProductLessThanK(self, nums, k):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type k: int\\n        :rtype: int\\n        \"\"\"\\n        if k == 0:\\n            return 0\\n        ret = 0\\n        s = 0\\n        e = -1\\n        p = 1\\n        while s < len(nums):\\n            for i in xrange(e + 1, len(nums) + 1):\\n                if i >= len(nums):\\n                    e = i - 1\\n                    break\\n                p *= nums[i]\\n                if p >= k:\\n                    p /= nums[i]\\n                    e = i - 1\\n                    break\\n            l = e - s + 1\\n            if l > 0:\\n                ret += l * (1 + l) / 2 - (l - 1) * l / 2\\n                p /= nums[s]\\n            s += 1\\n        return ret\\n```"
		},
		{
			"lc_ans_id":"108865",
			"view":"413",
			"top":"7",
			"title":"Java O(n) solution with brief explaination",
			"vote":"1",
			"content":"The optimizing way is, for subarray start at position i, if the subarray ends at i + 1, i + 2...i + ct - 1 is correct. Then for the next start point i + 1, you don't have to check these ends again, because these subarrays products are all smaller than nums[i] * nums[i+1] * ...* nums[i + ct - 1]. You can directly start from checking the end of i + ct.\\n\\nEach element would be considered as start once, and each element would be considered as end once. So it's O(n).\\n\\n'''\\n\\n    public int numSubarrayProductLessThanK(int[] nums, int k) {\\n        int ct = 0;\\n        int prod = 1;\\n        int sol = 0;\\n        for (int i = 0; i < nums.length; i++) {\\n            if (ct == 0) {\\n                prod = 1;\\n            } else {\\n                ct--;\\n                prod /= nums[i-1];\\n            }\\n            for (int j = i + ct; j < nums.length; j++) {\\n                if (prod * nums[j] < k) {\\n                    ct++;\\n                    prod *= nums[j];\\n                } else break;\\n            }\\n            sol += ct;\\n        }\\n        return sol;\\n    }\\n\\n\\n\\n'''"
		},
		{
			"lc_ans_id":"108864",
			"view":"212",
			"top":"8",
			"title":"C# Solution",
			"vote":"1",
			"content":"C# solution\\n\\nIterate over the array and add the length of the maximum subarray for each location.\\n\\nFor e.g.input array nums = [10, 5, 2, 6] and k = 100\\n\\nlengths at each location are [1, 2, 2, 3] \\nreturn sum of all lengths, that is 1 + 2 + 2 + 3 = 8;\\n\\nFor corner cases like k = 0 and k = 1 return meaningful values.\\n\\n```\\npublic int NumSubarrayProductLessThanK(int[] nums, int k) {\\n            if (nums == null || k == 0 || k == 1)\\n            {\\n                return 0;\\n            }\\n\\n            int p = 1;\\n            int i = 0;\\n            int len = 0;\\n            int count = 0;\\n\\n            while (i < nums.Length)\\n            {\\n                p *= nums[i];\\n\\n                if (p < k)\\n                {\\n                    count += ++len;\\n                }\\n                else\\n                {\\n                    while (p >= k)\\n                    {\\n                        p /= nums[i - len];\\n                        len--;\\n                    }\\n\\n                    count += ++len;\\n                }\\n\\n                i++;\\n            }\\n\\n            return count;\\n    }\\n```"
		},
		{
			"lc_ans_id":"108833",
			"view":"37",
			"top":"9",
			"title":"o(n)\\u7684c++\\u7b97\\u6cd5",
			"vote":"0",
			"content":"    class Solution {\\n    public:\\n    int numSubarrayProductLessThanK(vector<int>& nums, int k) {\\n        int res = 0;\\n        \\n        // // \\u6734\\u7d20\\u601d\\u60f3\\n        // for (int i = 0; i != nums.size(); i++) {\\n        //     int j = i - 1;\\n        //     float product = (float)k / nums[i];\\n        //     int len = product > 1 ? 1: 0;\\n        //     while (j >= 0 && product > nums[j]) {\\n        //         len++;\\n        //         product /= nums[j];\\n        //         j--;\\n        //     }\\n        //     res += len;\\n        // }\\n        \\n        // \\u5728\\u6734\\u7d20\\u601d\\u60f3\\u7684\\u57fa\\u7840\\u4e0a\\u4f18\\u5316\\u4e86\\u5de6\\u8fb9\\u754c\\u7684\\u5bfb\\u627e\\n        if (k <= 1) return 0;\\n        float product = 1;\\n        int left = 0;\\n        for (int i = 0; i != nums.size(); i++) {\\n            product *= nums[i];\\n            while (product >= k) product /= nums[left++];\\n            res += i - left + 1;\\n        }\\n        \\n        return res;\\n    }\\n    };\\n\\n    /*\\n    \\u8981\\u70b9\\u662f\\u5982\\u4f55\\u6570\\u5b50\\u6570\\u7ec4\\u4fdd\\u8bc1\\u4e0d\\u91cd\\u590d\\u3002\\u8fd9\\u91cc\\u662f\\u9009\\u5b9a\\u6570\\u4f5c\\u4e3a\\u5b50\\u6570\\u7ec4\\u7684\\u8fb9\\u754c\\uff0c\\u4e0d\\u540c\\u8fb9\\u754c\\u4e0b\\u6765\\u67e5\\u627e\\u7b26\\u5408\\u6761\\u4ef6\\u7684\\u5b50\\u6570\\u7ec4\\n    */"
		}
	],
	"id":"679",
	"title":"Subarray Product Less Than K",
	"content":"<p>Your are given an array of positive integers <code>nums</code>.</p>\r\n<p>Count and print the number of (contiguous) subarrays where the product of all the elements in the subarray is less than <code>k</code>.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> nums = [10, 5, 2, 6], k = 100\r\n<b>Output:</b> 8\r\n<b>Explanation:</b> The 8 subarrays that have product less than 100 are: [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6].\r\nNote that [10, 5, 2] is not included as the product of 100 is not strictly less than k.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li><code>0 < nums.length <= 50000</code>.</li>\r\n<li><code>0 < nums[i] < 1000</code>.</li>\r\n<li><code>0 <= k < 10^6</code>.</li>\r\n</p>",
	"frequency":"119",
	"ac_num":"6958"
}