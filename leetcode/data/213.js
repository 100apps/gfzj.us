{
	"difficulty":"2",
	"submit_num":"201792",
	"show_id":"213",
	"leetcode_id":"213",
	"answers":[
		{
			"lc_ans_id":"59934",
			"view":"28857",
			"top":"0",
			"title":"Simple AC solution in Java in O(n) with explanation",
			"vote":"220",
			"content":"Since this question is a follow-up to House Robber, we can assume we already have a way to solve the simpler question, i.e. given a 1 row of house, we know how to rob them. So we already have such a helper function. We modify it a bit to rob a given range of houses.\\n    \\n    private int rob(int[] num, int lo, int hi) {\\n        int include = 0, exclude = 0;\\n        for (int j = lo; j <= hi; j++) {\\n            int i = include, e = exclude;\\n            include = e + num[j];\\n            exclude = Math.max(e, i);\\n        }\\n        return Math.max(include, exclude);\\n    }\\n\\nNow the question is how to rob a circular row of houses. It is a bit complicated to solve like the simpler question. It is because in the simpler question whether to rob *num[lo]* is entirely our choice. But, it is now constrained by whether *num[hi]* is robbed. \\n\\nHowever, since we already have a nice solution to the simpler problem. We do not want to throw it away. Then, it becomes how can we reduce this problem to the simpler one. Actually, extending from the logic that if house i is not robbed, then you are free to choose whether to rob house i + 1, you can break the circle by assuming a house is not robbed.\\n\\nFor example, 1 -> 2 -> 3 -> 1 becomes 2 -> 3 if 1 is not robbed.\\n\\nSince every house is either robbed or not robbed and at least half of the houses are not robbed, the solution is simply the larger of two cases with consecutive houses, i.e. house i not robbed, break the circle, solve it, or house i + 1 not robbed. Hence, the following solution. I chose i = n and i + 1 = 0 for simpler coding. But, you can choose whichever two consecutive ones.\\n\\n    public int rob(int[] nums) {\\n        if (nums.length == 1) return nums[0];\\n        return Math.max(rob(nums, 0, nums.length - 2), rob(nums, 1, nums.length - 1));\\n    }"
		},
		{
			"lc_ans_id":"59921",
			"view":"10765",
			"top":"1",
			"title":"9-lines 0ms O(1)-Space C++ solution",
			"vote":"100",
			"content":"This problem is a little tricky at first glance. However, if you have finished the **House Robber** problem, this problem can simply  be **decomposed into two House Robber problems**. \\n    Suppose there are `n` houses, since house `0` and `n - 1` are now neighbors, we cannot rob them together and thus the solution is now the maximum of\\n\\n 1. Rob houses `0` to `n - 2`;\\n 2. Rob houses `1` to `n - 1`.\\n\\nThe code is as follows. Some edge cases (`n < 2`) are handled explicitly.\\n\\n    class Solution {\\n    public:\\n        int rob(vector<int>& nums) {\\n            int n = nums.size(); \\n            if (n < 2) return n ? nums[0] : 0;\\n            return max(robber(nums, 0, n - 2), robber(nums, 1, n - 1));\\n        }\\n    private:\\n        int robber(vector<int>& nums, int l, int r) {\\n            int pre = 0, cur = 0;\\n            for (int i = l; i <= r; i++) {\\n                int temp = max(pre + nums[i], cur);\\n                pre = cur;\\n                cur = temp;\\n            }\\n            return cur;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"59944",
			"view":"6859",
			"top":"2",
			"title":"Twice pass solution, C++",
			"vote":"36",
			"content":"Twice pass:\\n\\n1. not rob nums[n-1]\\n2. not rob nums[0]\\n\\nand the other is same as [House Robber](https://leetcode.com/problems/house-robber/ ).\\n\\n    int rob(vector<int>& nums)\\n    {\\n        if(nums.size() == 0)\\n            return 0;\\n        if(nums.size() == 1)\\n            return nums[0];\\n        \\n        int pre1 = 0, cur1 = 0;\\n        for(int i = 0; i < nums.size() - 1; ++ i)\\n        {\\n            int temp = pre1;\\n            pre1 = cur1;\\n            cur1 = max(temp + nums[i], pre1);\\n        }\\n        \\n        int pre2 = 0, cur2 = 0;\\n        for(int i = 1; i < nums.size(); ++ i)\\n        {\\n            int temp = pre2;\\n            pre2 = cur2;\\n            cur2 = max(temp + nums[i], pre2);\\n        }\\n        \\n        return max(cur1, cur2);\\n    }"
		},
		{
			"lc_ans_id":"59986",
			"view":"4223",
			"top":"3",
			"title":"[C++] Super Simple 0ms solution with explanation",
			"vote":"32",
			"content":"Since you cannot rob both the first and last house, just create two separate vectors, one excluding the first house, and another excluding the last house. The best solution generated from these two vectors using the original House Robber DP algorithm is the optimal one. \\n\\n    class Solution {\\n    public:\\n    \\n        int robOriginal(vector<int>& nums) {\\n            int a = 0, b = 0, res = 0;\\n            \\n            for(int i = 0; i < nums.size(); ++i){\\n                res = max(b + nums[i], a);\\n                b = a;\\n                a = res;\\n            }\\n            \\n            return res;\\n        }\\n    \\n        int rob(vector<int>& nums) {\\n            if(nums.empty()) return 0;\\n            if(nums.size() == 1) return nums[0];\\n            \\n            vector<int> numsA(nums.begin() + 1, nums.end());\\n            vector<int> numsB(nums.begin(), nums.end()-1);\\n            \\n            return max(robOriginal(numsA), robOriginal(numsB));\\n        }\\n    };"
		},
		{
			"lc_ans_id":"59929",
			"view":"5386",
			"top":"4",
			"title":"Java clean short solution DP",
			"vote":"18",
			"content":"    public class Solution {\\n\\tpublic int rob(int[] nums) {\\n\\t\\treturn Math.max(rob(nums, 0, nums.length-2), rob(nums, 1, nums.length-1));\\n\\t}\\n\\t\\n    public int rob(int[] nums, int lo, int hi) {\\n        int preRob = 0, preNotRob = 0, rob = 0, notRob = 0;\\n        for (int i = lo; i <= hi; i++) {\\n          \\trob = preNotRob + nums[i];\\n        \\tnotRob = Math.max(preRob, preNotRob);\\n        \\t\\n        \\tpreNotRob = notRob;\\n        \\tpreRob = rob;\\n        }\\n        return Math.max(rob, notRob);\\n    }\\n}"
		},
		{
			"lc_ans_id":"60044",
			"view":"2082",
			"top":"5",
			"title":"Good performance DP solution using Java",
			"vote":"16",
			"content":"    public class Solution {\\n        public int rob(int[] nums) {\\n            if (nums.length == 0)\\n                return 0;\\n            if (nums.length < 2)\\n                return nums[0];\\n            \\n            int[] startFromFirstHouse = new int[nums.length + 1];\\n            int[] startFromSecondHouse = new int[nums.length + 1];\\n            \\n            startFromFirstHouse[0]  = 0;\\n            startFromFirstHouse[1]  = nums[0];\\n            startFromSecondHouse[0] = 0;\\n            startFromSecondHouse[1] = 0;\\n            \\n            for (int i = 2; i <= nums.length; i++) {\\n                startFromFirstHouse[i] = Math.max(startFromFirstHouse[i - 1], startFromFirstHouse[i - 2] + nums[i-1]);\\n                startFromSecondHouse[i] = Math.max(startFromSecondHouse[i - 1], startFromSecondHouse[i - 2] + nums[i-1]);\\n            }\\n            \\n            return Math.max(startFromFirstHouse[nums.length - 1], startFromSecondHouse[nums.length]);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"60034",
			"view":"1303",
			"top":"6",
			"title":"Simple and easy C++ solution modified from the best solution of House Robber (Easy)",
			"vote":"12",
			"content":"    int rob_line(vector<int>& nums, int start, int end) {\\n        int odd_sum=0;\\n        int even_sum=0;\\n        \\n        for(int i=start; i<end; i++) {\\n            if(i%2)\\n                odd_sum = max(even_sum, odd_sum+nums[i]);\\n            else\\n                even_sum = max(odd_sum, even_sum+nums[i]);\\n        }\\n        \\n        return max(odd_sum, even_sum);\\n    }\\n    \\n    int rob(vector<int>& nums) {\\n        if(nums.size()==0) return 0;\\n        else if(nums.size()==1) return nums[0];\\n        else return max(rob_line(nums,0,nums.size()-1), rob_line(nums,1,nums.size()));\\n    }"
		},
		{
			"lc_ans_id":"60015",
			"view":"1445",
			"top":"7",
			"title":"0ms O(N) time O(1) space C++ solution",
			"vote":"12",
			"content":"This solution is based on house robber 1. The idea is that either the first house or the last house is not robbed. The final solution is max of (house robber without last element) and (house robber without the first element). Note *endIndex* is not inclusive in the second rob function.\\n\\n    class Solution {\\n    public:\\n    int rob(vector<int>& nums) {\\n        if (nums.size() == 0) return 0;\\n        if (nums.size() == 1) return nums[0];\\n        \\n        return max(rob(nums, 0, nums.size()-1), rob(nums, 1, 0));\\n    }\\n\\n    int rob(vector<int>& nums, int startIndex, int endIndex) {\\n        int p = 0, q = 0;\\n        for (int i = startIndex; i != endIndex; /* do nothing */) {\\n            int tmp = p;\\n            p = max(p, q + nums[i]);\\n            q = tmp;\\n            i = (i + 1) % nums.size();\\n        }\\n        return p;\\n    }\\n    };"
		},
		{
			"lc_ans_id":"59978",
			"view":"2203",
			"top":"8",
			"title":"6 lines function body",
			"vote":"11",
			"content":"Standard solution, I guess, except I take a shortcut for the one-house case.\\n\\n    class Solution:\\n        def rob(self, nums):\\n            def rob(nums):\\n                now = prev = 0\\n                for n in nums:\\n                    now, prev = max(now, prev + n), now\\n                return now\\n            return max(rob(nums[len(nums) != 1:]), rob(nums[:-1]))"
		},
		{
			"lc_ans_id":"60020",
			"view":"1275",
			"top":"9",
			"title":"Jave O(1) space, O(n) time optimal solution",
			"vote":"8",
			"content":"Helper method returns DP solution from 0 - n-2  and 1 - n-1. Final answer is the max between two. \\n\\n \\n\\n      public class Solution {\\n            public int rob(int[] nums) {\\n                if (nums == null || nums.length == 0)\\n                    return 0;\\n                int n = nums.length;\\n                if (n == 1) {\\n                    return nums[0];\\n                }\\n                return Math.max(robHelper(nums, 0, n - 2), robHelper(nums, 1, n - 1));\\n            }\\n            \\n            private int robHelper(int[] nums, int start, int end) {\\n                int curr, prev, prev2;\\n                curr = prev = prev2 = 0;\\n                for (int i = start; i <= end; i++) {\\n                    curr = Math.max(prev2 + nums[i], prev);\\n                    prev2 = prev;\\n                    prev = curr;\\n                }\\n                return curr;\\n            }\\n        }"
		}
	],
	"id":"213",
	"title":"House Robber II",
	"content":"<p><b>Note:</b> This is an extension of <a href=\"https://leetcode.com/problems/house-robber/\">House Robber</a>.</p>\r\n\r\n<p>After robbing those houses on that street, the thief has found himself a new place for his thievery so that he will not get too much attention. This time, all houses at this place are <strong>arranged in a circle.</strong> That means the first house is the neighbor of the last one. Meanwhile, the security system for these houses remain the same as for those in the previous street. </p>\r\n\r\n<p>Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight <strong>without alerting the police</strong>.</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/Freezen\">@Freezen</a> for adding this problem and creating all test cases.</p>",
	"frequency":"258",
	"ac_num":"69640"
}