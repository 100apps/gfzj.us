{
	"difficulty":"2",
	"submit_num":"98276",
	"show_id":"494",
	"leetcode_id":"494",
	"answers":[
		{
			"lc_ans_id":"97334",
			"view":"36394",
			"top":"0",
			"title":"Java (15 ms) C++ (3 ms) O(ns) iterative DP solution using subset sum with explanation",
			"vote":"189",
			"content":"The recursive solution is very slow, because its runtime is exponential\\n\\nThe original problem statement is equivalent to:\\nFind a **subset** of ```nums``` that need to be positive, and the rest of them negative, such that the sum is equal to ```target```\\n\\nLet ```P``` be the positive subset and ```N``` be the negative subset\\nFor example:\\nGiven ```nums = [1, 2, 3, 4, 5]``` and ```target = 3``` then one possible solution is ```+1-2+3-4+5 = 3```\\nHere positive subset is ```P = [1, 3, 5]``` and negative subset is ```N = [2, 4]```\\n\\nThen let's see how this can be converted to a subset sum problem:\\n```\\n                  sum(P) - sum(N) = target\\nsum(P) + sum(N) + sum(P) - sum(N) = target + sum(P) + sum(N)\\n                       2 * sum(P) = target + sum(nums)\\n``` \\nSo the original problem has been converted to a subset sum problem as follows:\\nFind a **subset** ```P``` of ```nums``` such that ```sum(P) = (target + sum(nums)) / 2```\\n\\nNote that the above formula has proved that ```target + sum(nums)``` must be even\\nWe can use that fact to quickly identify inputs that do not have a solution (Thanks to @BrunoDeNadaiSarnaglia for the suggestion)\\nFor detailed explanation on how to solve subset sum problem, you may refer to [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)\\n\\nHere is Java solution (15 ms)\\n```\\n    public int findTargetSumWays(int[] nums, int s) {\\n        int sum = 0;\\n        for (int n : nums)\\n            sum += n;\\n        return sum < s || (s + sum) % 2 > 0 ? 0 : subsetSum(nums, (s + sum) >>> 1); \\n    }   \\n\\n    public int subsetSum(int[] nums, int s) {\\n        int[] dp = new int[s + 1]; \\n        dp[0] = 1;\\n        for (int n : nums)\\n            for (int i = s; i >= n; i--)\\n                dp[i] += dp[i - n]; \\n        return dp[s];\\n    } \\n```\\n\\nHere is C++ solution (3 ms)\\n```\\nclass Solution {\\npublic:\\n    int findTargetSumWays(vector<int>& nums, int s) {\\n        int sum = accumulate(nums.begin(), nums.end(), 0);\\n        return sum < s || (s + sum) & 1 ? 0 : subsetSum(nums, (s + sum) >> 1); \\n    }   \\n\\n    int subsetSum(vector<int>& nums, int s) {\\n        int dp[s + 1] = { 0 };\\n        dp[0] = 1;\\n        for (int n : nums)\\n            for (int i = s; i >= n; i--)\\n                dp[i] += dp[i - n];\\n        return dp[s];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"97335",
			"view":"19644",
			"top":"1",
			"title":"Short Java DP Solution with Explanation",
			"vote":"75",
			"content":"```\\npublic class Solution {\\n    public int findTargetSumWays(int[] nums, int s) {\\n        int sum = 0; \\n        for(int i: nums) sum+=i;\\n        if(s>sum || s<-sum) return 0;\\n        int[] dp = new int[2*sum+1];\\n        dp[0+sum] = 1;\\n        for(int i = 0; i<nums.length; i++){\\n            int[] next = new int[2*sum+1];\\n            for(int k = 0; k<2*sum+1; k++){\\n                if(dp[k]!=0){\\n                    next[k + nums[i]] += dp[k];\\n                    next[k - nums[i]] += dp[k];\\n                }\\n            }\\n            dp = next;\\n        }\\n        return dp[sum+s];\\n    }\\n}\\n```\\n\\n![0_1485048724190_Screen Shot 2017-01-21 at 8.31.48 PM.jpg](/uploads/files/1485048726667-screen-shot-2017-01-21-at-8.31.48-pm.jpg)"
		},
		{
			"lc_ans_id":"97333",
			"view":"10047",
			"top":"2",
			"title":"Java simple DFS with memorization",
			"vote":"28",
			"content":"I'm quite surprised that simple DFS could pass the test since for DFS solution there are obvious a lot of overlap subproblems. So I used a map to record the intermediate result while we are walking along the recursion tree.\\n```\\npublic class Solution {\\n    public int findTargetSumWays(int[] nums, int S) {\\n        if (nums == null || nums.length == 0){\\n            return 0;\\n        }\\n        return helper(nums, 0, 0, S, new HashMap<>());\\n    }\\n    private int helper(int[] nums, int index, int sum, int S, Map<String, Integer> map){\\n        String encodeString = index + \"->\" + sum;\\n        if (map.containsKey(encodeString)){\\n            return map.get(encodeString);\\n        }\\n        if (index == nums.length){\\n            if (sum == S){\\n                return 1;\\n            }else {\\n                return 0;\\n            }\\n        }\\n        int curNum = nums[index];\\n        int add = helper(nums, index + 1, sum - curNum, S, map);\\n        int minus = helper(nums, index + 1, sum + curNum, S, map);\\n        map.put(encodeString, add + minus);\\n        return add + minus;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97343",
			"view":"6109",
			"top":"3",
			"title":"Python DP",
			"vote":"19",
			"content":"```\\nclass Solution(object):\\n    def findTargetSumWays(self, nums, S):\\n        if not nums:\\n            return 0\\n        dic = {nums[0]: 1, -nums[0]: 1} if nums[0] != 0 else {0: 2}\\n        for i in range(1, len(nums)):\\n            tdic = {}\\n            for d in dic:\\n                tdic[d + nums[i]] = tdic.get(d + nums[i], 0) + dic.get(d, 0)\\n                tdic[d - nums[i]] = tdic.get(d - nums[i], 0) + dic.get(d, 0)\\n            dic = tdic\\n        return dic.get(S, 0)\\n```"
		},
		{
			"lc_ans_id":"97371",
			"view":"7587",
			"top":"4",
			"title":"Java Short DFS Solution",
			"vote":"16",
			"content":"This is a pretty easy problem. Just do DFS and try both \"+\" and \"-\" at every position. Easy version of ```Expression Add Operators``` https://leetcode.com/problems/expression-add-operators/\\n\\n```\\npublic class Solution {\\n    int result = 0;\\n\\t\\n    public int findTargetSumWays(int[] nums, int S) {\\n        if (nums == null || nums.length == 0) return result;\\n        helper(nums, S, 0, 0);\\n        return result;\\n    }\\n    \\n    public void helper(int[] nums, int target, int pos, long eval){\\n        if (pos == nums.length) {\\n            if (target == eval) result++;\\n            return;\\n        }\\n        helper(nums, target, pos + 1, eval + nums[pos]);\\n        helper(nums, target, pos + 1, eval - nums[pos]);\\n    }\\n}\\n```\\n\\nOptimization: The idea is ```If the sum of all elements left is smaller than absolute value of target, there will be no answer following the current path. Thus we can return.```\\n```\\npublic class Solution {\\n    int result = 0;\\n\\t\\n    public int findTargetSumWays(int[] nums, int S) {\\n        if(nums == null || nums.length == 0) return result;\\n        \\n        int n = nums.length;\\n        int[] sums = new int[n];\\n        sums[n - 1] = nums[n - 1];\\n        for (int i = n - 2; i >= 0; i--)\\n            sums[i] = sums[i + 1] + nums[i];\\n        \\n        helper(nums, sums, S, 0);\\n        return result;\\n    }\\n    public void helper(int[] nums, int[] sums, int target, int pos){\\n        if(pos == nums.length){\\n            if(target == 0) result++;\\n            return;\\n        }\\n        \\n        if (sums[pos] < Math.abs(target)) return;\\n        \\n        helper(nums, sums, target + nums[pos], pos + 1);\\n        helper(nums, sums, target - nums[pos], pos + 1);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97369",
			"view":"1915",
			"top":"5",
			"title":"Evolve from brute force to dp",
			"vote":"14",
			"content":"This is similar to [Partition Equal Subset Sum](https://discuss.leetcode.com/topic/80074/evolve-from-brute-force-to-dp).\\n1. O(2^n) brute force \\n```\\n    int findTargetSumWays(vector<int>& nums, int S) {\\n        return find(0,nums,S);    \\n    }\\n    int find(int p, vector<int>& nums, int sum) {\\n        if(p==nums.size()) return sum==0;\\n        return find(p+1,nums,sum+nums[p])+find(p+1,nums,sum-nums[p]);\\n    }\\n```\\n2. O(ns) Memoization. There is redundancy in brute force. A call to find() with the same start index and target sum can be made multiple times. We can use a 2d table to cache the result to avoid duplicate calls with the same state.\\n```\\n    int findTargetSumWays(vector<int>& nums, int S) {\\n        vector<unordered_map<int,int>> mem(nums.size());\\n        return find(0,nums,S,mem);    \\n    }\\n    int find(int p, vector<int>& nums, int sum, vector<unordered_map<int,int>>& mem) {\\n        if(p==nums.size()) return sum==0;\\n        auto it = mem[p].find(sum);\\n        if(it != mem[p].end()) return it->second;\\n        return mem[p][sum]=find(p+1,nums,sum+nums[p],mem)+find(p+1,nums,sum-nums[p],mem);\\n    }\\n```\\n3. O(ns) pseudo polynomial dp, s is the target sum. Most dp problems visits continuous states and this is a great example to use hashtable to visit valid states only.\\n```\\n    int findTargetSumWays(vector<int>& nums, int S) {\\n        int n = nums.size();\\n        vector<unordered_map<int,int>> dp(n+1);\\n        dp[0][0]=1;\\n        for(int i=0;i<n;i++)\\n            for(auto &p:dp[i]) {\\n                dp[i+1][p.first+nums[i]] += p.second; \\n                dp[i+1][p.first-nums[i]] += p.second;\\n            }\\n        return dp[n][S];\\n    }\\n```\\n4. O(ns) time, linear space dp.\\n```\\n    int findTargetSumWays(vector<int>& nums, int S) {\\n        unordered_map<int,int> cur({{0,1}}), nxt, *p_cur=&cur, *p_nxt=&nxt;\\n        for(int i=0;i<nums.size();i++) {\\n            for(auto &p:*p_cur) {\\n                (*p_nxt)[p.first+nums[i]] += p.second; \\n                (*p_nxt)[p.first-nums[i]] += p.second;\\n            }\\n            swap(p_cur,p_nxt);\\n            p_nxt->clear();\\n        }\\n        return (*p_cur)[S];\\n    }\\n```\\n5. O(ns) dp with continuous states. When hashtable is replaced by vector, test cases show significant runtime improvement. #4 is theoretically better because it does not visit invalid states.\\n```\\n    int findTargetSumWays(vector<int>& nums, int S) {\\n        int sum = accumulate(nums.begin(),nums.end(),0);\\n        if(S>sum || S<-sum) return 0;\\n        vector<int> cur(2*sum+1), nxt(2*sum+1), *p_cur = &cur, *p_nxt = &nxt;\\n        cur[sum] = 1;\\n        for(int i=0;i<nums.size();i++) {\\n            for(int j=0;j<=2*sum;j++) \\n                if(p_cur->at(j)) {\\n                    p_nxt->at(j+nums[i]) += p_cur->at(j);\\n                    p_nxt->at(j-nums[i]) += p_cur->at(j);\\n                }\\n            swap(p_cur,p_nxt);\\n            p_nxt->assign(2*sum+1,0);\\n        }\\n        return p_cur->at(S+sum);\\n    }\\n```"
		},
		{
			"lc_ans_id":"97424",
			"view":"983",
			"top":"6",
			"title":"Python intuitive DFS solution with memorization",
			"vote":"11",
			"content":"At first I just remember the current index and current target, and for each index, either subtract the nums[i] from S or add it to S. But this got TLE, them I came up with this solution. Just store the intermediate result with (index, s) and this got accepted.\\n```\\nclass Solution(object):\\n    def findTargetSumWays(self, nums, S):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type S: int\\n        :rtype: int\\n        \"\"\"\\n        def findTarget(i, s):\\n            if (i, s) not in cache:\\n                r = 0\\n                if i == len(nums):\\n                    if s == 0:\\n                        r = 1\\n                else:\\n                    r = findTarget(i+1, s-nums[i]) + findTarget(i+1, s+nums[i])\\n                cache[(i, s)] = r\\n            return cache[(i, s)]\\n        \\n        cache = {}\\n        return findTarget(0, S)\\n```"
		},
		{
			"lc_ans_id":"97363",
			"view":"1581",
			"top":"7",
			"title":"C++ iterative with unordered_map",
			"vote":"10",
			"content":"```\\n// OJ: https://leetcode.com/problems/target-sum\\n// Author: github.com/lzl124631x\\n// Time: O(2^N)\\n// Space: O(2^N)\\nclass Solution {\\npublic:\\n  int findTargetSumWays(vector<int>& nums, int S) {\\n    unordered_map<int, int> ans;\\n    ans[0] = 1;\\n    for (int n : nums) {\\n      unordered_map<int, int> newAns;\\n      for (auto p : ans) {\\n        int sum = p.first, cnt = p.second;\\n        newAns[sum + n] += cnt;\\n        newAns[sum - n] += cnt;\\n      }\\n      ans = newAns;\\n    }\\n    return ans[S];\\n  }\\n};\\n```\\n\\n---\\n\\nUpdated with other solutions\\n```\\n// OJ: https://leetcode.com/problems/target-sum\\n// Author: github.com/lzl124631x\\n// Time: O(2^N)\\n// Space: O(N)\\nclass Solution {\\nprivate:\\n  int cnt = 0;\\n  void dfs(vector<int>& nums, int S, int start) {\\n    if (start == nums.size()) {\\n      cnt += !S;\\n      return;\\n    }\\n    dfs(nums, S + nums[start], start + 1);\\n    dfs(nums, S - nums[start], start + 1);\\n  }\\npublic:\\n  int findTargetSumWays(vector<int>& nums, int S) {\\n    dfs(nums, S, 0);\\n    return cnt;\\n  }\\n};\\n```\\n\\n```\\n// OJ: https://leetcode.com/problems/target-sum\\n// Author: github.com/lzl124631x\\n// Time: O(2^N)\\n// Space: O(2^N)\\nclass Solution {\\nprivate:\\n  vector<unordered_map<int, int>> memo;\\n  int dfs(vector<int>& nums, int S, int start) {\\n    if (start == nums.size()) return !S ? 1 : 0;\\n    if (memo[start].count(S)) return memo[start][S];\\n    return memo[start][S] = dfs(nums, S + nums[start], start + 1)\\n                            + dfs(nums, S - nums[start], start + 1);\\n  }\\npublic:\\n  int findTargetSumWays(vector<int>& nums, int S) {\\n    memo = vector<unordered_map<int, int>>(nums.size());\\n    return dfs(nums, S, 0);\\n  }\\n};\\n```\\n\\n```\\n// OJ: https://leetcode.com/problems/target-sum\\n// Author: github.com/lzl124631x\\n// Time: O(NS)\\n// Space: O(S)\\n// Ref: https://discuss.leetcode.com/topic/76243/java-15-ms-c-3-ms-o-ns-iterative-dp-solution-using-subset-sum-with-explanation\\nclass Solution {\\nprivate:\\n  int subsetSum(vector<int> &nums, int S) {\\n    vector<int> dp(S + 1, 0);\\n    dp[0] = 1;\\n    for (int n : nums)\\n      for (int i = S; i >= n; --i) dp[i] += dp[i - n];\\n    return dp[S];\\n  }\\npublic:\\n  int findTargetSumWays(vector<int>& nums, int S) {\\n    int sum = accumulate(nums.begin(), nums.end(), 0);\\n    return sum < S || (sum + S) % 2 ? 0 : subsetSum(nums, (sum + S) / 2);\\n  }\\n};\\n```"
		},
		{
			"lc_ans_id":"97439",
			"view":"1455",
			"top":"8",
			"title":"Easily understood solution in 8 lines",
			"vote":"8",
			"content":"I used python, but it's really easy to understand.\\nTo make it clear for everyone,  find following the syntax for get() method of dictionary(hase map)\\n````\\ndict.get(key, default)\\n````\\nThe method get() returns a value for the given key. If key is not available then returns default value. \\n\\n\\n````\\ndef findTargetSumWays(self, nums, S):\\n    count = {0: 1}\\n    for x in nums:\\n      count2 = {}\\n      for tmpSum in count:\\n        count2[tmpSum + x] = count2.get(tmpSum + x, 0) + count[tmpSum]\\n        count2[tmpSum - x] = count2.get(tmpSum - x, 0) + count[tmpSum]\\n      count = count2\\n    return count.get(S, 0)\\n````"
		},
		{
			"lc_ans_id":"97340",
			"view":"1091",
			"top":"9",
			"title":"C++ short dp solution",
			"vote":"3",
			"content":"    int findTargetSumWays(vector<int>& nums, int S) {\\n        int sum = 0;\\n        for (auto n : nums) sum += n;\\n        if ((sum + S) % 2 == 1 || S > sum || S < -sum) return 0;\\n        int newS = (sum + S) / 2;\\n        vector<int> dp(newS + 1, 0);\\n        dp[0] = 1;\\n        for (int i = 0; i < nums.size(); ++i) {\\n            for (int j = newS; j >= nums[i]; --j) {\\n                dp[j] += dp[j - nums[i]];\\n            }\\n        }\\n        return dp[newS];\\n    }"
		}
	],
	"id":"485",
	"title":"Target Sum",
	"content":"<p>\r\nYou are given a list of non-negative integers, a1, a2, ..., an, and a target, S. Now you have 2 symbols <code>+</code> and <code>-</code>. For each integer, you should choose one from <code>+</code> and <code>-</code> as its new symbol.\r\n</p> \r\n\r\n<p>Find out how many ways to assign symbols to make sum of integers equal to target S.  \r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> nums is [1, 1, 1, 1, 1], S is 3. \r\n<b>Output:</b> 5\r\n<b>Explanation:</b> \r\n\r\n-1+1+1+1+1 = 3\r\n+1-1+1+1+1 = 3\r\n+1+1-1+1+1 = 3\r\n+1+1+1-1+1 = 3\r\n+1+1+1+1-1 = 3\r\n\r\nThere are 5 ways to assign symbols to make the sum of nums be target 3.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The length of the given array is positive and will not exceed 20. </li>\r\n<li>The sum of elements in the given array will not exceed 1000.</li>\r\n<li>Your output answer is guaranteed to be fitted in a 32-bit integer.</li>\r\n</ol>\r\n</p>",
	"frequency":"184",
	"ac_num":"43070"
}