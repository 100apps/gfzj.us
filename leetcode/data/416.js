{
	"difficulty":"2",
	"submit_num":"93920",
	"show_id":"416",
	"leetcode_id":"416",
	"answers":[
		{
			"lc_ans_id":"90592",
			"view":"24947",
			"top":"0",
			"title":"0/1 knapsack detailed explanation",
			"vote":"130",
			"content":"This problem is essentially let us to find whether there are several numbers in a set which are able to sum to a specific value (in this problem, the value is sum/2). \\n\\nActually, this is a 0/1 knapsack problem, for each number, we can pick it or not. Let us assume dp[i][j] means whether the specific sum j can be gotten from the first i numbers. If we can pick such a series  of numbers from 0-i whose sum is j, dp[i][j] is true, otherwise it is false. \\n\\nBase case: dp[0][0] is true; (zero number consists of sum 0 is true)\\n\\nTransition function: For each number, if we don't pick it, dp[i][j] = dp[i-1][j], which means if the first i-1 elements has made it to j, dp[i][j] would also make it to j (we can just ignore nums[i]). If we pick nums[i]. dp[i][j] = dp[i-1][j-nums[i]], which represents that j is composed of the current value nums[i] and the remaining composed of other previous numbers. Thus, the transition function is dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i]]\\n\\ntalking is cheap:\\n\\n    public boolean canPartition(int[] nums) {\\n        int sum = 0;\\n        \\n        for (int num : nums) {\\n            sum += num;\\n        }\\n        \\n        if ((sum & 1) == 1) {\\n            return false;\\n        }\\n        sum /= 2;\\n\\n        int n = nums.length;\\n        boolean[][] dp = new boolean[n+1][sum+1];\\n        for (int i = 0; i < dp.length; i++) {\\n            Arrays.fill(dp[i], false);\\n        }\\n        \\n        dp[0][0] = true;\\n        \\n        for (int i = 1; i < n+1; i++) {\\n            dp[i][0] = true;\\n        }\\n        for (int j = 1; j < sum+1; j++) {\\n            dp[0][j] = false;\\n        }\\n        \\n        for (int i = 1; i < n+1; i++) {\\n            for (int j = 1; j < sum+1; j++) {\\n                dp[i][j] = dp[i-1][j];\\n                if (j >= nums[i-1]) {\\n                    dp[i][j] = (dp[i][j] || dp[i-1][j-nums[i-1]]);\\n                }\\n            }\\n        }\\n       \\n        return dp[n][sum];\\n    }\\n\\n\\nBut can we optimize it? It seems that we cannot optimize it in time. But we can optimize in space. We currently use two dimensional array to solve it, but we can only use one dimensional array. \\n\\nSo the code becomes:\\n\\n    public boolean canPartition(int[] nums) {\\n        int sum = 0;\\n        \\n        for (int num : nums) {\\n            sum += num;\\n        }\\n        \\n        if ((sum & 1) == 1) {\\n            return false;\\n        }\\n        sum /= 2;\\n        \\n        int n = nums.length;\\n        boolean[] dp = new boolean[sum+1];\\n        Arrays.fill(dp, false);\\n        dp[0] = true;\\n        \\n        for (int num : nums) {\\n            for (int i = sum; i > 0; i--) {\\n                if (i >= num) {\\n                    dp[i] = dp[i] || dp[i-num];\\n                }\\n            }\\n        }\\n        \\n        return dp[sum];\\n    }\\n\\nFor Chinese user: http://love-oriented.com/pack/P01.html is good explanation."
		},
		{
			"lc_ans_id":"90627",
			"view":"18756",
			"top":"1",
			"title":"Java Solution similar to backpack problem - Easy to understand",
			"vote":"44",
			"content":"```\\npublic class Solution {\\n    public boolean canPartition(int[] nums) {\\n        // check edge case\\n        if (nums == null || nums.length == 0) {\\n            return true;\\n        }\\n        // preprocess\\n        int volumn = 0;\\n        for (int num : nums) {\\n            volumn += num;\\n        }\\n        if (volumn % 2 != 0) {\\n            return false;\\n        }\\n        volumn /= 2;\\n        // dp def\\n        boolean[] dp = new boolean[volumn + 1];\\n        // dp init\\n        dp[0] = true;\\n        // dp transition\\n        for (int i = 1; i <= nums.length; i++) {\\n            for (int j = volumn; j >= nums[i-1]; j--) {\\n                dp[j] = dp[j] || dp[j - nums[i-1]];\\n            }\\n        }\\n        return dp[volumn];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"90590",
			"view":"9015",
			"top":"2",
			"title":"Simple C++ 4-line solution using a bitset",
			"vote":"38",
			"content":"Note: as @zhoudayang2 pointed out, the question description has changed (max array size 100 ==> 200). I have modified my code below according to the new description, and also made it a bit easier to understand.\\n\\nTime complexity O(n), size of the bitset is 1256 bytes\\n```\\nclass Solution {\\npublic:\\n    bool canPartition(vector<int>& nums) {\\n        const int MAX_NUM = 100;\\n        const int MAX_ARRAY_SIZE = 200;\\n        bitset<MAX_NUM * MAX_ARRAY_SIZE / 2 + 1> bits(1);\\n        int sum = 0;\\n        for (auto n : nums) {\\n            sum += n;\\n            bits |= bits << n;\\n        }\\n        return !(sum % 2) && bits[sum / 2];\\n    }\\n};\\n```\\nIt's possible to shorten the solution to 4 lines, by using std::accumulate(), but that doesn't really make you type less or make it run faster though...\\n```\\nclass Solution {\\npublic:\\n    bool canPartition(vector<int>& nums) {\\n        bitset<10001> bits(1);\\n        int sum = accumulate(nums.begin(), nums.end(), 0);\\n        for (auto n : nums) bits |= bits << n;\\n        return !(sum & 1) && bits[sum >> 1];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"90588",
			"view":"7078",
			"top":"3",
			"title":"Concise C++ Solution summary with DFS, DP, BIT",
			"vote":"15",
			"content":"1. DFS solution: \\n```\\nclass Solution {\\npublic:\\n    bool backtrack(vector<int>& nums, int start, int target) {\\n        if (target <= 0) return target == 0;\\n        for (int i = start; i < nums.size(); i++) \\n            if (backtrack(nums, i + 1, target - nums[i])) return true;\\n        return false;\\n    }\\n    \\n    bool canPartition(vector<int>& nums) {\\n        int sum = accumulate(nums.begin(), nums.end(), 0);\\n        return !(sum & 1) && backtrack(nums, 0, sum >> 1);\\n    }\\n};\\n```\\n\\n2. DFS can't pass the OJ, as more test cases are added. So here comes a DP solution based on @Hermits [solution](https://discuss.leetcode.com/topic/62466/concise-c-dp-solution)\\n```\\nbool canPartition(vector<int>& nums) {\\n    int sum = accumulate(nums.begin(), nums.end(), 0), target = sum >> 1;\\n    if (sum & 1) return false;\\n    vector<int> dp(target + 1, 0);\\n    dp[0] = 1;\\n    for(auto num : nums) \\n        for(int i = target; i >= num; i--)\\n            dp[i] = dp[i] || dp[i - num];\\n    return dp[target];\\n}\\n```\\n3. A very fast and cool Bit solution by @alvin-777 [solution](https://discuss.leetcode.com/topic/62334/simple-c-4-line-solution-using-a-bitset/2)\\n\\n```\\nbool canPartition(vector<int>& nums) {\\n    bitset<5001> bits(1);\\n    int sum = accumulate(nums.begin(), nums.end(), 0);\\n    for (auto n : nums) bits |= bits << n;\\n    return !(sum & 1) && bits[sum >> 1];\\n}\\n```"
		},
		{
			"lc_ans_id":"90639",
			"view":"5538",
			"top":"4",
			"title":"Java Solution similar to 'Subset Sum Problem'",
			"vote":"11",
			"content":"It's similar to ```Subset Sum Problem```which asks us to find if there is a subset whose sum equals to target value. For this problem, the target value is exactly the half of sum of array. Let's see the code.\\n```\\npublic class Solution {\\n    public boolean canPartition(int[] nums) {\\n        int sum = 0;\\n        for(int num: nums) sum += num;\\n        if(sum % 2 == 1) return false;\\n        \\n        int target = sum / 2;\\n        boolean[][] dp = new boolean[nums.length][target + 1];\\n        // deal with the first row\\n        if(nums[0] <= target) dp[0][nums[0]] = true;\\n        \\n        // deal with the first col\\n        for(int i = 0; i < nums.length; i++) dp[i][0] = true;\\n        \\n        // deal with the rest\\n        for(int i = 1; i < dp.length; i++) {\\n            for(int j = 1; j < dp[0].length; j++) {\\n                if(j < nums[i]) {\\n                    dp[i][j] = dp[i - 1][j];\\n                } else {\\n                    dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]];\\n                }\\n            }\\n        }\\n        return dp[dp.length - 1][dp[0].length - 1];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"90607",
			"view":"1824",
			"top":"5",
			"title":"My Simple C++ DP Code with Comments",
			"vote":"8",
			"content":"```\\nclass Solution {\\npublic:\\n    bool canPartition(vector<int>& nums) {\\n        int sum = accumulate(nums.begin(), nums.end(), 0);\\n        if (sum & 1) return false;\\n        int half = sum >> 1;\\n        \\n        vector<bool> accessibility(half + 1, false);\\n        accessibility[0] = true;    // '0' is always reachable\\n        //For all num in nums, check the accessibility from half - num to 0. \\n        //If 'i' is accessible by former numbers, then 'i + num' is also accessible. (DP Algorithm)\\n        for(auto num : nums) \\n       //Below here we must start from 'half' downto 'num', otherwise current 'num' might be multiply used. \\n       //e.g.: If num == 2, then we will have 2, 4, 6... will all be accessible and lead to wrong answer. \\n            for(int i = half; i >= num; i--){\\n                if (accessibility[i - num] == true){\\n                    accessibility[i] = true;\\n                }\\n            }\\n        return accessibility[half];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"90615",
			"view":"3890",
			"top":"6",
			"title":"Java Dynamic Programming Solution (21ms, with explanation)",
			"vote":"6",
			"content":"```\\npublic boolean canPartition(int[] nums) {\\n\\tint total = 0;\\n\\tfor(int i : nums) total+=i; // compute the total sum of the input array\\n\\tif(total%2 != 0) return false; // if the array sum is not even, we cannot partition it into 2 equal subsets \\n\\tint max = total/2; // the maximum for a subset is total/2\\n\\tint[][] results = new int[nums.length][max]; // integer matrix to store the results, so we don't have to compute it more than one time\\n\\treturn isPartitionable(max,0,0,nums,results);\\n}\\n\\npublic boolean isPartitionable(int max,int curr, int index, int[] nums, int[][] results) {\\n\\tif(curr>max || index>nums.length-1) return false; // if we passed the max, or we reached the end of the array, return false\\n\\tif(curr==max) return true; // if we reached the goal (total/2) we found a possible partition\\n\\tif(results[index][curr]==1) return true; // if we already computed teh result for the index i with the sum current, we retrieve this result (1 for true)\\n\\tif(results[index][curr]==2) return false; // if we already computed teh result for the index i with the sum current, we retrieve this result (2 for false)\\n\\tboolean res = isPartitionable(max, curr+nums[index], index+1, nums, results) || isPartitionable(max, curr, index+1, nums, results); // else try to find the equal partiion, taking this element, or not taking it\\n\\tresults[index][curr] = res ? 1 : 2; // store the result for this index and this current sum, to use it in dynamic programming\\n\\treturn res;\\n}\\n```"
		},
		{
			"lc_ans_id":"90618",
			"view":"3007",
			"top":"7",
			"title":"7 Lines 59ms Recursive Python Solution",
			"vote":"6",
			"content":"Seek whether there's a combination has the sum equal to half of total sum.\\nSimply return False if sum of the list is not even.\\nTarget minus each element as Target for next recursion of the rest elements.\\n\\nBase case:\\nTarget < 0 (ignore)\\nTarget == 0 (return True)\\n\\nRecursive case:\\nOtherwise\\n\\n```\\nclass Solution(object):\\n    def canPartition(self, nums):\\n        nums.sort(reverse=True)\\n        def helper(start, target):         # Here path is not needed\\n            if target < 0: return\\n            elif target == 0: return True\\n            for i in xrange(start, len(nums)):\\n                if helper(i+1, target-nums[i]): return True\\n            return False\\n\\n        return False if sum(nums)%2 else helper(0, sum(nums)/2)\\n```\\n**EDIT:**\\nmodified based on @WKVictor 's advise.\\n\\n**EDIT 2:**\\nThanks @whglamrock 's advise, added one line for new test case. => nums.sort(reverse = True)"
		},
		{
			"lc_ans_id":"90613",
			"view":"551",
			"top":"8",
			"title":"c++ backtracking solution, 6ms.",
			"vote":"5",
			"content":"```\\nclass Solution {\\npublic:\\n    bool canPartition(vector<int>& nums) {\\n        int sum = 0;\\n        for(int i =0;i<nums.size();i++){\\n            sum+= nums[i];\\n        }\\n        if(sum%2) return false;\\n        sum /= 2;\\n        sort(nums.rbegin(),nums.rend());\\n        return helper(nums, sum, 0);\\n    }\\n    bool helper(vector<int>& nums, int sum, int index){\\n        if(sum == nums[index]) return true;\\n        if(sum < nums[index]) return false;\\n        return helper(nums,sum-nums[index],index+1) || helper(nums,sum,index+1);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"90628",
			"view":"884",
			"top":"9",
			"title":"4 line passed python solution",
			"vote":"5",
			"content":"```\\nclass Solution(object):\\n    def canPartition(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: bool\\n        \"\"\"\\n        possible_sums = {0}\\n        for n in nums:\\n            possible_sums.update({(v + n) for v in possible_sums})\\n        return (sum(nums) / 2.)  in possible_sums  \\n````"
		}
	],
	"id":"416",
	"title":"Partition Equal Subset Sum",
	"content":"<p>Given a <b>non-empty</b> array containing <b>only positive integers</b>, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\n<ol>\r\n<li>Each of the array element will not exceed 100.</li>\r\n<li>The array size will not exceed 200.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\nInput: [1, 5, 11, 5]\r\n\r\nOutput: true\r\n\r\nExplanation: The array can be partitioned as [1, 5, 5] and [11].\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\nInput: [1, 2, 3, 5]\r\n\r\nOutput: false\r\n\r\nExplanation: The array cannot be partitioned into equal sum subsets.\r\n</pre>\r\n</p>",
	"frequency":"212",
	"ac_num":"36812"
}