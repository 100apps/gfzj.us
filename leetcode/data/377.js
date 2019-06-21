{
	"difficulty":"2",
	"submit_num":"124378",
	"show_id":"377",
	"leetcode_id":"377",
	"answers":[
		{
			"lc_ans_id":"85036",
			"view":"35540",
			"top":"0",
			"title":"1ms Java DP Solution with Detailed Explanation",
			"vote":"184",
			"content":"Think about the recurrence relation first. How does the # of combinations of the `target` related to the # of combinations of numbers that are smaller than the `target`? \\n\\nSo we know that `target` is the sum of numbers in the array. Imagine we only need one more number to reach target, this number can be any one in the array, right? So the # of combinations of `target`, `comb[target] = sum(comb[target - nums[i]]), where 0 <= i < nums.length, and target >= nums[i]`. \\n\\nIn the example given, we can actually find the # of combinations of 4 with the # of combinations of 3(4 - 1), 2(4- 2) and 1(4 - 3). As a result, `comb[4] = comb[4-1] + comb[4-2] + comb[4-3] = comb[3] + comb[2] + comb[1]`. \\n\\nThen think about the base case. Since if the target is 0, there is only one way to get zero, which is using 0, we can set `comb[0] = 1`. \\n\\nEDIT: The problem says that target is a positive integer that makes me feel it's unclear to put it in the above way. Since `target == 0` only happens when in the previous call, target = nums[i], we know that this is the only combination in this case, so we return 1. \\n\\nNow we can come up with at least a recursive solution. \\n```\\npublic int combinationSum4(int[] nums, int target) {\\n    if (target == 0) {\\n        return 1;\\n    }\\n    int res = 0;\\n    for (int i = 0; i < nums.length; i++) {\\n        if (target >= nums[i]) {\\n            res += combinationSum4(nums, target - nums[i]);\\n        }\\n    }\\n    return res;\\n}\\n```\\n\\nNow for a DP solution, we just need to figure out a way to store the intermediate results, to avoid the same combination sum being calculated many times. We can use an array to save those results, and check if there is already a result before calculation. We can fill the array with -1 to indicate that the result hasn't been calculated yet. 0 is not a good choice because it means there is no combination sum for the target. \\n\\n```\\nprivate int[] dp;\\n\\npublic int combinationSum4(int[] nums, int target) {\\n    dp = new int[target + 1];\\n    Arrays.fill(dp, -1);\\n    dp[0] = 1;\\n    return helper(nums, target);\\n}\\n\\nprivate int helper(int[] nums, int target) {\\n    if (dp[target] != -1) {\\n        return dp[target];\\n    }\\n    int res = 0;\\n    for (int i = 0; i < nums.length; i++) {\\n        if (target >= nums[i]) {\\n            res += helper(nums, target - nums[i]);\\n        }\\n    }\\n    dp[target] = res;\\n    return res;\\n}\\n```\\n\\nEDIT: The above solution is top-down. How about a bottom-up one?\\n```\\npublic int combinationSum4(int[] nums, int target) {\\n    int[] comb = new int[target + 1];\\n    comb[0] = 1;\\n    for (int i = 1; i < comb.length; i++) {\\n        for (int j = 0; j < nums.length; j++) {\\n            if (i - nums[j] >= 0) {\\n                comb[i] += comb[i - nums[j]];\\n            }\\n        }\\n    }\\n    return comb[target];\\n}\\n```"
		},
		{
			"lc_ans_id":"85079",
			"view":"17941",
			"top":"1",
			"title":"My 3ms Java DP solution",
			"vote":"82",
			"content":"Wish to learn better solutions from you guys.\\n\\n```\\npublic class Solution {\\n    public int combinationSum4(int[] nums, int target) {\\n        Arrays.sort(nums);\\n        int[] res = new int[target + 1];\\n        for (int i = 1; i < res.length; i++) {\\n\\t    for (int num : nums) {\\n\\t        if (num > i)\\n\\t\\t    break;\\n\\t\\telse if (num == i)\\n\\t\\t    res[i] += 1;\\n\\t\\telse\\n\\t\\t    res[i] += res[i-num];\\n\\t    }\\n\\t}\\n        return res[target];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85120",
			"view":"6208",
			"top":"2",
			"title":"C++ template for ALL Combination Problem Set",
			"vote":"49",
			"content":"\\n**Firstly, the Combination Sum 1 & 4 are similar, and Combination Sum 2 & 3 are similar !!!  Combination Sum 3 is the special case of Combination Sum 2, and the Combination Sum 4 return the count while Combination Sum return all the combination !**\\n**k sum problem is a good extension for the combination sum problem, k-sum 1 is to return the count while k-sum 2 return all the possible results** \\n\\n\\n* ****DP:  when solve the problem return the count****\\n\\n* **DFS :  for return all the possible result**\\n\\n**Update@08/05/2016 :**\\n\\nThere are 2 more interesting problem,  let us check it now !\\n\\n[**k Sum 1 & 2**](http://www.lintcode.com/en/problem/k-sum/)\\n\\n1.  return the count  Given n distinct positive integers, integer k (k <= n) and a number target.  Find k numbers where sum is target. Calculate how many solutions there are?\\n2. return alll \\n\\n**Solution to ksum-1  :**\\n\\n```\\nclass Solution {\\npublic:\\n    /**\\n     * @param A: an integer array.\\n     * @param k: a positive integer (k <= length(A))\\n     * @param target: a integer\\n     * @return an integer\\n     */\\n    int kSum(vector<int> A, int k, int target) {\\n        // wirte your code here\\n        const int n = A.size();\\n        /** dp[i][j][target] : # of ways to start from vector[0..i-1], choose j elements to sum to target **/\\n        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(k + 1, vector<int>(target + 1, 0)));\\n        \\n        for(int i = 1; i <= n; i++) {\\n            if(A[i-1] <= target) {\\n                for(int j = i; j <= n; j++) {\\n                    dp[j][1][A[i-1]] =1;\\n                }\\n            }\\n        }\\n        /** for position i, we can choose it or not **/\\n        for(int i = 1; i <= n; i++) {\\n            for(int j = min(i, k); j > 1; j--) {\\n                for(int p = 1; p <= target; p++) {\\n                    dp[i][j][p] = dp[i - 1][j][p];\\n                    if(p - A[i - 1] >= 0) {\\n                        dp[i][j][p] += dp[i - 1][j - 1][p - A[i - 1]];\\n                    }\\n                }\\n            }\\n        }\\n        return dp[n][k][target];\\n    }\\n};\\n```\\n**Update @ 2016/09/07**\\nThere is a more easy to grasp solution :\\n\\n```\\nclass Solution {\\npublic:\\n    /**\\n     * @param A: an integer array.\\n     * @param k: a positive integer (k <= length(A))\\n     * @param target: a integer\\n     * @return an integer\\n     */\\nint kSum(vector<int> A, int k, int target) {\\n        // wirte your code here\\n        const int n = A.size();\\n        /** dp[i][j][target] : # of ways to start from vector[0..i-1], choose j elements to sum to target **/\\n        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(k + 1, vector<int>(target + 1, 0)));\\n        \\n        for(int i = 0; i < A.size(); i++) {\\n            dp[i][0][0] = 1;\\n        }\\n        /** for position i, we can choose it or not **/\\n        for(int i = 1; i <= n; i++) {\\n            for(int j =1; j <= k; j++) {\\n                for(int p = 1; p <= target; p++) {\\n                    if (j > i) dp[i][j][p] = 0; \\n                    else dp[i][j][p] = dp[i-1][j][p];\\n                    if(p - A[i - 1] >= 0) {\\n                        dp[i][j][p] += dp[i - 1][j - 1][p - A[i - 1]];\\n                    }\\n                }\\n            }\\n        }\\n        return dp[n][k][target];\\n    }\\n};\\n```\\n\\n**Solution to ksum-2  :**\\n\\n```\\nclass Solution {\\npublic:\\n    /**\\n     * @param A: an integer array.\\n     * @param k: a positive integer (k <= length(A))\\n     * @param target: a integer\\n     * @return a list of lists of integer\\n     */\\n    vector<vector<int>> kSumII(vector<int> A, int k, int target) {\\n        vector<vector<int>> ans;\\n        vector<int> curr;\\n        helper(A, k, 0, target, curr, ans);\\n        return ans;\\n    }\\n\\n    void helper(vector<int> A, int k, int start, int target, vector<int>& curr, vector<vector<int>> & ans) {\\n        if (k < 0 || target < 0) {\\n            return;\\n        }\\n\\n        if (k == 0 && target == 0) {\\n            ans.emplace_back(curr);\\n            return;\\n        }\\n\\n        for (int i = start; i <= A.size() - k; i++) {\\n            curr.emplace_back(A[i]);\\n            helper(A, k - 1, i + 1, target - A[i], curr, ans);\\n            curr.pop_back();\\n        }\\n    }\\n};\\n```\\n\\n\\n***[Problem 39    Given a set of candidate numbers (C) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.  The same repeated number may be chosen from C unlimited number of times.](https://leetcode.com/problems/combination-sum/)***\\n \\n```\\nclass Solution {\\npublic:\\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\\n        sort(candidates.begin(), candidates.end());\\n        vector<vector<int>> result;\\n        vector<int> combination;\\n        dfs(candidates, target, result, combination, 0);\\n        return result;\\n    }\\n    \\n    void dfs(vector<int>& nums, int target, vector<vector<int>>& result, vector<int>& combination, int begin) {\\n        if (!target) {\\n            result.push_back(combination);\\n            return;\\n        }\\n        for (int i = begin; i < nums.size() && target >= nums[i]; i++) {\\n            combination.push_back(nums[i]);\\n            dfs(nums, target - nums[i], result, combination, i);\\n            combination.pop_back();\\n        }\\n    }\\n};\\n```\\n\\n\\n***[Problem 40    Given a collection of candidate numbers (C) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.  Each number in C may only be used once in the combination.](https://leetcode.com/problems/combination-sum-ii/)***\\n\\n```\\nclass Solution {\\npublic:\\n    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {\\n        sort(candidates.begin(), candidates.end());\\n        vector<vector<int>> result;\\n        vector<int> combination;\\n        dfs(candidates, target, result, combination, 0);\\n        return result;\\n    }\\n    \\n    void dfs(vector<int>& nums, int target, vector<vector<int>>& result, vector<int>& combination, int begin) {\\n        if (!target) {\\n            result.push_back(combination);\\n            return;\\n        }\\n        for (int i = begin; i < nums.size() && target >= nums[i]; i++) {\\n            combination.push_back(nums[i]);\\n            //combinationSum1 : dfs(nums, target - nums[i], result, combination, i);\\n            dfs(nums, target - nums[i], result, combination, i + 1);\\n            combination.pop_back();\\n            //combinationSum1 : no this line to filter the duplicate cases \\n            while (i < nums.size() && nums[i] == nums[i+1]) i++;\\n        }\\n    }\\n};\\n```\\n  \\n***[Problem 216    Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.](https://leetcode.com/problems/combination-sum-iii/)***    \\n\\nThis problem is different from the 1 & 2, our choice is constrained to be [1,9], and our target is valid, then our bigest number is just sum from 1 to 9, our result is that number 1 to 9 can only be choosed for one time. All in all, this problem is a special case of the Combination Problem 2 \\n\\n```\\nclass Solution {\\npublic:\\n    vector<vector<int>> combinationSum3(int k, int n) {\\n        vector<vector<int>> result;\\n        vector<int> path;\\n        dfs(1, path, result, k, n);\\n        return result;\\n    }\\n    \\n    void dfs(int pos, vector<int>& path, vector<vector<int>>& result, int k, int n) {\\n        //cut edge\\n        if (n < 0) return;\\n        //valid cases\\n        if (n == 0 && k == path.size()) result.push_back(path);\\n        for (int i = pos; i <= 9; i++) {\\n            path.push_back(i);\\n            dfs(i + 1, path, result, k, n - i);\\n            path.pop_back();\\n        }\\n    }\\n};\\n```\\n\\n***[Problem 377   Given an integer array with all positive numbers and no duplicates, find the number of possible combinations that add up to a positive integer target.](https://leetcode.com/problems/combination-sum-iv/)***    \\n\\nThis problem is just similar to the Combination Problem 1 , we only need to return the count but not all the possible result .\\n\\n\\n* dp[i] : record the possible combination count to sum to target value of i\\n```\\nclass Solution {\\npublic:\\n    int combinationSum4(vector<int>& nums, int target) {\\n        vector<int> dp(target + 1);\\n        dp[0] = 1;\\n        sort (nums.begin(), nums.end());\\n        for (int i = 1; i <= target; i++) {\\n            for (auto num : nums) {\\n                if (i < num) break;\\n                dp[i] += dp[i - num];\\n            }\\n        }\\n        return dp.back();\\n    }\\n};\\n```\\n\\n[***Problem  77  Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.***](https://leetcode.com/problems/combinations/) \\n\\nThis problem is the almost same as the problem Combination sum 2, only with different ending conditions !\\n```\\nclass Solution {\\npublic:\\n    vector<vector<int> > combine(int n, int k) {\\n        vector<vector<int> > res;\\n        vector<int> path;\\n        dfs(1, path, res, n, k);\\n        return res;\\n    }\\n    void dfs(int pos, vector<int> &path, vector<vector<int> > &res, int n, int k) {\\n        if (path.size() == k) res.push_back(path);\\n        else {\\n            for (int i = pos; i <= n; ++i) {\\n                path.push_back(i);\\n                dfs(i + 1, path, res, n, k);\\n                path.pop_back();\\n            }\\n        }\\n    }\\n};\\n```\\n\\n\\n***[Problem 17  Letter Combination  Given a digit string, return all possible letter combinations that the number could represent.  A mapping of digit to letters (just like on the telephone buttons) is given below.](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)***  \\n\\n```\\nclass Solution {\\npublic:\\n    vector<string> letterCombinations(string digits) {\\n        vector<string> res;\\n        if (digits.empty()) return res;\\n        vector<string> dict{\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\\n        dfs(digits, dict, 0, \"\", res);\\n        return res;\\n    }\\n    void dfs(string digits, vector<string>& dict, int pos, string path, vector<string> &res) {\\n        if (pos == digits.size()) res.push_back(path);\\n        else {\\n            string str = dict[digits[pos] - '0'];\\n            for (int i = 0; i < str.size(); ++i) {\\n                path.push_back(str[i]);\\n                dfs(digits, dict, pos + 1, path, res);\\n                path.pop_back();\\n            }\\n        }\\n    }\\n};\\n```\\n\\n***Problem 254   Write a function that takes an integer n and return all possible combinations of its factors.  Note:  Each combination's factors must be sorted ascending, for example: The factors of 2 and 6 is [2, 6], not [6, 2]. You may assume that n is always positive.***\\n\\n```\\nclass Solution {\\npublic:\\n    vector<vector<int>> getFactors(int n) {\\n        vector<vector<int>> result;\\n        vector<int> path;\\n        helper(n, 2, path, result);\\n        return result;\\n    }\\n    void helper(int remain, int start, vector<int> path, vector<vector<int>> &result) {\\n        if (remain == 1) {\\n            if (path.size() > 1) result.push_back(path);\\n        } else {\\n            for (int i = start; i <= remain; ++i) {\\n                if (remain % i == 0) {\\n                    path.push_back(i);\\n                    helper(remain / i, i, path, result);\\n                    path.pop_back();\\n                }\\n            }\\n        }\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"85060",
			"view":"7069",
			"top":"3",
			"title":"JAVA recursion solution using HashMap as memory.",
			"vote":"33",
			"content":"The DP solution goes through every possible sum from 1 to target one by one.\\nUsing recursion can skip those sums that are not the combinations of the numbers in the given array. Also, there is no need to sort the array first. \\n```\\npublic class Solution {\\n    Map<Integer, Integer> map = new HashMap<>();\\n    public int combinationSum4(int[] nums, int target) {\\n        int count = 0;\\n        if (nums == null || nums.length ==0 || target < 0 ) return 0;\\n        if ( target ==0 ) return 1;\\n        if (map.containsKey(target)) return map.get(target);\\n        for (int num: nums){\\n            count += combinationSum4(nums, target-num);\\n        }\\n        map.put(target, count);\\n        return count;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85041",
			"view":"6838",
			"top":"4",
			"title":"7-liner in Python, and follow-up question",
			"vote":"27",
			"content":"```\\nclass Solution(object):\\n    def combinationSum4(self, nums, target):\\n        nums, combs = sorted(nums), [1] + [0] * (target)\\n        for i in range(target + 1):\\n            for num in nums:\\n                if num  > i: break\\n                if num == i: combs[i] += 1\\n                if num  < i: combs[i] += combs[i - num]\\n        return combs[target]\\n\\n# 17 / 17 test cases passed.\\n# Status: Accepted\\n# Runtime: 116 ms\\n```\\n\\n\\nThis is a 4-line top-down solution that doesn't get accepted due to recursion limit.\\n\\n```\\nclass Solution(object):\\n    def combinationSum4(self, nums, target, memo=collections.defaultdict(int)):\\n        if target < 0: return 0\\n        if target not in memo:\\n            memo[target] += sum((1, self.combinationSum4(nums, target - num))[target != num] \\n                                for num in nums)\\n        return memo[target]\\n```\\n\\nThe problem with negative numbers is that now the combinations could be potentially of infinite length. Think about `nums = [-1, 1]` and `target = 1`. We can have all sequences of arbitrary length that follow the patterns  `-1, 1, -1, 1, ..., -1, 1, 1` and `1, -1, 1, -1, ..., 1, -1, 1` (there are also others, of course, just to give an example). So we should limit the *length* of the combination sequence, so as to give a bound to the problem.\\n\\nThis is a recursive Python code that solves the above follow-up problem, so far it's passed all my test cases but comments are welcome.\\n\\n```\\nclass Solution(object):\\n    def combinationSum4WithLength(self, nums, target, length, memo=collections.defaultdict(int)):\\n        if length <= 0: return 0\\n        if length == 1: return 1 * (target in nums)\\n        if (target, length) not in memo: \\n            for num in nums:\\n                memo[target, length] += self.combinationSum4(nums, target - num, length - 1)\\n        return memo[target, length]\\n```"
		},
		{
			"lc_ans_id":"85038",
			"view":"2667",
			"top":"5",
			"title":"JAVA: follow-up using recursion and memorization.",
			"vote":"23",
			"content":"In order to allow negative integers, the length of the combination sum needs to be restricted, or the search will not stop. This is a modification from my [previous solution](https://discuss.leetcode.com/topic/52255/java-recursion-solution-using-hashmap-as-memory), which also use memory to avoid repeated calculations.\\n\\n```\\nMap<Integer, Map<Integer,Integer>> map2 = new HashMap<>();\\n    private int helper2(int[] nums, int len, int target, int MaxLen) {\\n    \\tint count = 0;\\n        if (  len > MaxLen  ) return 0;\\n        if ( map2.containsKey(target) && map2.get(target).containsKey(len)) { \\n        \\treturn map2.get(target).get(len);\\n        }\\n        if ( target == 0 )   count++;\\n        for (int num: nums) {\\n            count+= helper2(nums, len+1, target-num, MaxLen);\\n        }\\n        if ( ! map2.containsKey(target) ) map2.put(target, new HashMap<Integer,Integer>());\\n        Map<Integer,Integer> mem = map2.get(target);\\n        mem.put(len, count);\\n        return count;\\n    }\\n       \\n    public int combinationSum42(int[] nums, int target, int MaxLen) {\\n        if (nums == null || nums.length ==0 || MaxLen <= 0 ) return 0;\\n        map2 = new HashMap<>();\\n        return helper2(nums, 0,target, MaxLen);\\n    }\\n```"
		},
		{
			"lc_ans_id":"85095",
			"view":"931",
			"top":"6",
			"title":"Are you kidding me? It is Combination??",
			"vote":"17",
			"content":"[1,1,2] and [2, 1, 1] are two different combinations, never heard this before...\\nMr. Permutation is unhappy and angry~"
		},
		{
			"lc_ans_id":"85074",
			"view":"5910",
			"top":"7",
			"title":"6 lines C++ DP solution",
			"vote":"17",
			"content":"result[i] is the possible combination of i.\\n```\\n    int combinationSum4(vector<int>& nums, int target) {\\n        vector<int> result(target + 1);\\n        result[0] = 1;\\n        for (int i = 1; i <= target; ++i) {\\n            for (int x : nums) {\\n                if (i >= x) {\\n                    result[i] += result[i - x];\\n                }\\n            }\\n        }\\n        \\n        return result[target];\\n    }\\n```"
		},
		{
			"lc_ans_id":"85097",
			"view":"3006",
			"top":"8",
			"title":"What if negative numbers are allowed in the given array?",
			"vote":"11",
			"content":"Anyone has concise solution for this case? If we still need to use the same code, it will lead to infinite loop? how to fix it?"
		},
		{
			"lc_ans_id":"85106",
			"view":"932",
			"top":"9",
			"title":"A summary of all combination sum problem in LC, C++",
			"vote":"5",
			"content":"\\n### Solutions\\n\\n#### Primitive\\n\\n[test](https://leetcode.com/problems/combination-sum/)\\n\\n- try each number and then to the next level with target `chopped off` by the number;\\n- since we can use the number unlimited times, which means as long as we don't traverse back, it will be okay;\\n- once the target is equal to zero, we get it and we can collect the `stack`.\\n```\\nclass Solution {\\nprivate:\\n    int size;\\n    void search(vector<int>& candidates, int pos, int target, vector<int>& v, vector<vector<int>>& vv) {\\n        if(target < 0) return;\\n        if(target == 0) { vv.push_back(v); return ; }\\n        for(int i = pos; i < size; ++i) {\\n            v.push_back(candidates[i]);\\n            search(candidates, pos, target-candidates[i], v, vv);\\n            v.pop_back();\\n        }\\n    }\\npublic:\\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\\n        size = candidates.size();  \\n        vector<int> v;\\n        vector<vector<int>> vv;\\n        search(candidates, 0, target, v, vv);\\n        return vv;\\n    }\\n};\\n```\\n\\n#### Follow-up 1\\n[test](https://leetcode.com/problems/combination-sum-iii/)\\n- each number can only be used once, so label the position and move forward one step each time;\\n- there are only k numbers in a combination, so update the k properly each time;\\n\\n```\\nclass Solution {\\nprivate:\\n    void search(int n, int pos, int k, vector<int>& v, vector<vector<int>>& vv) {\\n        if(n < 0) return ;\\n        if(k == 0) { if(n == 0) vv.push_back(v); return ;}\\n        for(int i = pos; i < 10; ++i) {\\n            v.push_back(i);\\n            search(n-i, i+1, k-1, v, vv);\\n            v.pop_back();\\n        }\\n    }\\npublic:\\n    vector<vector<int>> combinationSum3(int k, int n) {\\n        vector<int> v;\\n        vector<vector<int>> vv;\\n        search(n, 1, k, v, vv);\\n        return vv;\\n    }\\n};\\n```\\n\\n#### Follow-up 2\\n[test](https://leetcode.com/problems/combination-sum-ii/)\\n- since we can use the number only once, so we have to move forward by one each time;\\n- to avoid duplicate set, we have to avoid try the same number in the same recursive level;\\n\\n```\\nclass Solution {\\nprivate:\\n    int size;\\n    vector<vector<int>> vv;\\n    void search(vector<int>& candidates, int pos, int target, vector<int>& v, vector<vector<int>>& vv) {\\n        if(target < 0) return;\\n        if(target == 0) { vv.push_back(v); return ; }\\n        for(int i = pos; i < size; ++i) {\\n            if(i==pos || candidates[i]!=candidates[i-1]) {\\n                v.push_back(candidates[i]);\\n                search(candidates, i+1, target-candidates[i], v, vv);\\n                v.pop_back();\\n            }\\n        }\\n    }\\npublic:\\n    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {\\n        sort(candidates.begin(), candidates.end());\\n        size = candidates.size();  \\n        vector<int> v;\\n        search(candidates, 0, target, v);\\n        return vv;\\n    }\\n};\\n```\\n\\n#### Follow-up 3\\n[test](https://leetcode.com/problems/combination-sum-iv/)\\n- recursive backtracking is okay but inefficient, so we have to adopt `Memoization`;\\n- using map is for better robustness, while an array also does and can be more efficient.\\n\\n```\\nclass Solution {\\nprivate:\\n    unordered_map<int, int> map;\\npublic:\\n    int combinationSum4(vector<int>& nums, int target) {\\n        if(nums.empty() || target<0) return 0;\\n        if(target == 0) return 1;\\n        if(map.count(target)) return map[target];\\n        long count = 0;\\n        for(int i = 0; i < nums.size(); ++i)\\n            count += combinationSum4(nums, target-nums[i]);\\n        return map[target] = count;\\n    }\\n};\\n```\\n\\n- actually we can do better using DP.\\n\\n```\\nclass Solution {\\npublic:\\n    int combinationSum4(vector<int>& nums, int target) {\\n        int arr[target+1]{1, 0};\\n        for(int i = 1, size = nums.size(); i <= target; ++i)\\n            for(int j = 0; j < size; ++j)\\n                if(i>=nums[j]) arr[i] += arr[i-nums[j]];\\n        return arr[target];\\n    }\\n};\\n```\\n\\nAlways welcome new ideas and `practical` tricks, just leave them in the comments!"
		}
	],
	"id":"377",
	"title":"Combination Sum IV",
	"content":"<p> Given an integer array with all positive numbers and no duplicates, find the number of possible combinations that add up to a positive integer target.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n<i><b>nums</b></i> = [1, 2, 3]\r\n<i><b>target</b></i> = 4\r\n\r\nThe possible combination ways are:\r\n(1, 1, 1, 1)\r\n(1, 1, 2)\r\n(1, 2, 1)\r\n(1, 3)\r\n(2, 1, 1)\r\n(2, 2)\r\n(3, 1)\r\n\r\nNote that different sequences are counted as different combinations.\r\n\r\nTherefore the output is <i><b>7</i></b>.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Follow up:</b><br />\r\nWhat if negative numbers are allowed in the given array?<br />\r\nHow does it change the problem?<br />\r\nWhat limitation we need to add to the question to allow negative numbers? </p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/pbrother/\">@pbrother</a> for adding this problem and creating all test cases.</p>",
	"frequency":"267",
	"ac_num":"53007"
}