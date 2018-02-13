{
	"difficulty":"2",
	"submit_num":"397909",
	"show_id":"40",
	"leetcode_id":"40",
	"answers":[
		{
			"lc_ans_id":"16861",
			"view":"23958",
			"top":"0",
			"title":"Java solution using dfs, easy understand",
			"vote":"71",
			"content":"     public List<List<Integer>> combinationSum2(int[] cand, int target) {\\n        Arrays.sort(cand);\\n        List<List<Integer>> res = new ArrayList<List<Integer>>();\\n        List<Integer> path = new ArrayList<Integer>();\\n        dfs_com(cand, 0, target, path, res);\\n        return res;\\n    }\\n    void dfs_com(int[] cand, int cur, int target, List<Integer> path, List<List<Integer>> res) {\\n        if (target == 0) {\\n            res.add(new ArrayList(path));\\n            return ;\\n        }\\n        if (target < 0) return;\\n        for (int i = cur; i < cand.length; i++){\\n            if (i > cur && cand[i] == cand[i-1]) continue;\\n            path.add(path.size(), cand[i]);\\n            dfs_com(cand, i+1, target - cand[i], path, res);\\n            path.remove(path.size()-1);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"16878",
			"view":"10055",
			"top":"1",
			"title":"Combination Sum I, II and III Java solution (see the similarities yourself)",
			"vote":"39",
			"content":"Combination Sum I\\n\\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\\n        List<List<Integer>> list = new ArrayList<>();\\n        Arrays.sort(candidates);\\n        backtrack(list, new ArrayList<Integer>(), candidates, target, 0);\\n        return list;\\n    }\\n\\n    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] cand, int remain, int start) {\\n        if (remain < 0) return; /** no solution */\\n        else if (remain == 0) list.add(new ArrayList<>(tempList));\\n        else{\\n            for (int i = start; i < cand.length; i++) { \\n                tempList.add(cand[i]);\\n                backtrack(list, tempList, cand, remain-cand[i], i);\\n                tempList.remove(tempList.size()-1);\\n            } \\n        }\\n\\n    }\\n\\nCombination Sum II\\n\\n    public List<List<Integer>> combinationSum2(int[] candidates, int target) {\\n       List<List<Integer>> list = new LinkedList<List<Integer>>();\\n       Arrays.sort(candidates);\\n       backtrack(list, new ArrayList<Integer>(), candidates, target, 0);\\n       return list;\\n    }\\n    \\n    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] cand, int remain, int start) {\\n       \\n       if(remain < 0) return; /** no solution */\\n       else if(remain == 0) list.add(new ArrayList<>(tempList));\\n       else{\\n          for (int i = start; i < cand.length; i++) {\\n             if(i > start && cand[i] == cand[i-1]) continue; /** skip duplicates */\\n             tempList.add(cand[i]);\\n             backtrack(list, tempList, cand, remain - cand[i], i+1);\\n             tempList.remove(tempList.size() - 1);\\n          }\\n       }\\n    }\\n\\nCombination Sum III\\n\\n    public List<List<Integer>> combinationSum3(int k, int n) {\\n        List<List<Integer>> list = new ArrayList<>();\\n        backtrack(list, new ArrayList<Integer>(), k, n, 1);\\n        return list;\\n    }\\n    \\n    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int k, int remain, int start) {\\n        if(tempList.size() > k) return; /** no solution */\\n        else if(tempList.size() == k && remain == 0) list.add(new ArrayList<>(tempList));\\n        else{\\n            for (int i = start; i <= 9; i++) {\\n                tempList.add(i);\\n                backtrack(list, tempList, k, remain-i, i+1);\\n                tempList.remove(tempList.size() - 1);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"16862",
			"view":"11022",
			"top":"2",
			"title":"C++ backtracking solution with detailed explanation",
			"vote":"29",
			"content":"At the beginning, I stuck on this problem. After careful thought, I think this kind of backtracking contains a  iterative component and a resursive component so I'd like to give more details to help beginners save time. The revursive component tries the elements after the current one and also tries duplicate elements. So we can get correct answer for cases like [1 1] 2. The iterative component checks duplicate combinations and skip it if it is. So we can get correct answer for cases like [1 1 1] 2.\\n\\n\\n    class Solution {\\n    public:\\n        vector<vector<int> > combinationSum2(vector<int> &num, int target) \\n        {\\n            vector<vector<int>> res;\\n            sort(num.begin(),num.end());\\n            vector<int> local;\\n            findCombination(res, 0, target, local, num);\\n            return res;\\n        }\\n        void findCombination(vector<vector<int>>& res, const int order, const int target, vector<int>& local, const vector<int>& num)\\n        {\\n            if(target==0)\\n            {\\n                res.push_back(local);\\n                return;\\n            }\\n            else\\n            {\\n                for(int i = order;i<num.size();i++) // iterative component\\n                {\\n                    if(num[i]>target) return;\\n                    if(i&&num[i]==num[i-1]&&i>order) continue; // check duplicate combination\\n                    local.push_back(num[i]),\\n                    findCombination(res,i+1,target-num[i],local,num); // recursive componenet\\n                    local.pop_back();\\n                }\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"16870",
			"view":"7256",
			"top":"3",
			"title":"DP solution in Python",
			"vote":"14",
			"content":"I also did it with recursion, turns out the DP solution is 3~4 times faster.\\n    \\n    def combinationSum2(self, candidates, target):\\n        candidates.sort()\\n        table = [None] + [set() for i in range(target)]\\n        for i in candidates:\\n            if i > target:\\n                break\\n            for j in range(target - i, 0, -1):\\n                table[i + j] |= {elt + (i,) for elt in table[j]}\\n            table[i].add((i,))\\n        return map(list, table[target])"
		},
		{
			"lc_ans_id":"16944",
			"view":"2190",
			"top":"4",
			"title":"Beating 98%  Python solution using recursion with comments",
			"vote":"12",
			"content":"    def combinationSum2(self, candidates, target):\\n        # Sorting is really helpful, se we can avoid over counting easily\\n        candidates.sort()                      \\n        result = []\\n        self.combine_sum_2(candidates, 0, [], result, target)\\n        return result\\n        \\n    def combine_sum_2(self, nums, start, path, result, target):\\n        # Base case: if the sum of the path satisfies the target, we will consider \\n        # it as a solution, and stop there\\n        if not target:\\n            result.append(path)\\n            return\\n        \\n        for i in xrange(start, len(nums)):\\n            # Very important here! We don't use `i > 0` because we always want \\n            # to count the first element in this recursive step even if it is the same \\n            # as one before. To avoid overcounting, we just ignore the duplicates\\n            # after the first element.\\n            if i > start and nums[i] == nums[i - 1]:\\n                continue\\n\\n            # If the current element is bigger than the assigned target, there is \\n            # no need to keep searching, since all the numbers are positive\\n            if nums[i] > target:\\n                break\\n\\n            # We change the start to `i + 1` because one element only could\\n            # be used once\\n            self.combine_sum_2(nums, i + 1, path + [nums[i]], \\n                               result, target - nums[i])"
		},
		{
			"lc_ans_id":"16933",
			"view":"2986",
			"top":"5",
			"title":"My 84ms python recursive solution.",
			"vote":"9",
			"content":"    class Solution:\\n        def combinationSum2(self, candidates, target):\\n            candidates.sort()\\n            return self.search(candidates, 0 ,target)\\n    \\n        def search(self, candidates, start, target):\\n            if target==0:\\n                return [[]]\\n            res=[]\\n            for i in xrange(start,len(candidates)):\\n                if i!=start and candidates[i]==candidates[i-1]:\\n                    continue\\n                if candidates[i]>target:\\n                    break\\n                for r in self.search(candidates, i+1, target-candidates[i]):\\n                    res.append([candidates[i]]+r)\\n            return res"
		},
		{
			"lc_ans_id":"16877",
			"view":"2904",
			"top":"6",
			"title":"Java - short and recursive, clean code.",
			"vote":"8",
			"content":"    public List<List<Integer>> combinationSum2(int[] candidates, int target) {\\n\\t\\tList<List<Integer>> ans = new ArrayList<>();\\n\\t\\tList<Integer> comb = new ArrayList<>();\\n\\t\\tArrays.sort(candidates); // need sort to make this work.\\n\\t\\tcombination(candidates, target, 0, comb, ans);\\n\\t\\treturn ans;\\n\\t}\\n\\n\\tprivate void combination(int[] candi, int target, int start,\\n\\t\\t\\tList<Integer> comb, List<List<Integer>> ans) {\\n\\t\\tfor (int i = start; i < candi.length; i++) {\\n\\t\\t\\tif (i > start && candi[i] == candi[i - 1]) //remove duplicates.\\n\\t\\t\\t\\tcontinue;\\n\\t\\t\\tif (candi[i] == target) {\\n\\t\\t\\t\\t//recursion exit.\\n\\t\\t\\t\\tList<Integer> newComb = new ArrayList<>(comb);\\n\\t\\t\\t\\tnewComb.add(candi[i]);\\n\\t\\t\\t\\tans.add(newComb);\\n\\t\\t\\t} else if (candi[i] < target) {\\n\\t\\t\\t\\t//continue to look for the rest.\\n\\t\\t\\t\\tList<Integer> newComb = new ArrayList<>(comb);\\n\\t\\t\\t\\tnewComb.add(candi[i]);\\n\\t\\t\\t\\tcombination(candi, target - candi[i], i + 1, newComb, ans);\\n\\t\\t\\t} else \\n\\t\\t\\t\\tbreak; //invalid path, return nothing.\\n\\t\\t}\\n\\t}"
		},
		{
			"lc_ans_id":"16958",
			"view":"2331",
			"top":"7",
			"title":"8ms C++ backtracking easy to understand",
			"vote":"8",
			"content":"    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {\\n        vector<vector<int>> res;\\n        vector<int> current;\\n        sort(candidates.begin(),candidates.end());\\n        backTracking(candidates.begin(),current,res,candidates,target);\\n        return res;\\n    }\\n    \\n    void backTracking(vector<int>::iterator n, vector<int>& current,vector<vector<int>>& res, const vector<int>& candidates, int target){\\n        if(!target) res.push_back(current);\\n        else if(target>0){\\n            for(;n!=candidates.end()&&*n<=target;++n){\\n                current.push_back(*n);\\n                backTracking(n+1,current,res,candidates,target-*n);\\n                current.pop_back();\\n                while(n+1!=candidates.end()&&*(n+1)==*n) ++n;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"16916",
			"view":"522",
			"top":"8",
			"title":"Understanding the differences between the DP solution and simple recursive. Which one is really better?",
			"vote":"6",
			"content":"DP Solution:\\n1. Start by creating an array of [target+1]. Call it arr.\\n2. Initialize value at arr[candidates[i]] to be a set only containing {candidates[i]}.\\n3. If there are any other indices j of arr that are non-empty, populate the arr[j+candidates[i]] with the set of arr[j] + candidates[i].\\n\\nGood for:\\nIf target is relatively small, and/or numbers in candidates are very dense.\\nO(M*N) where M is target, and N is candidates.size()\\n\\nRecursive Solution:\\n1. Start by recursing with an empty set on every element.\\n2. DFS by adding the ith element on the temporary vector, calling the recursive function with the ith element added, then remove it. \\n3. When the remaining is 0(we subtract target by candidate[i] every recursive call to candidate[i]), we add the result into the vector<vector<int>>. \\n\\nGood for:\\nIf M is overwhelmingly large.\\n\\nSo I have an additional question: Though I see these 2 tradeoffs, in reality which one would dominate in terms of usefulness in the test cases given by whoever wrote them on leetcode?"
		},
		{
			"lc_ans_id":"16985",
			"view":"1466",
			"top":"9",
			"title":"Java solutions beats 99,87%",
			"vote":"6",
			"content":"    public class Solution {\\n        public List<List<Integer>> combinationSum2(int[] candidates, int target) {\\n            Arrays.sort(candidates);\\n            List<List<Integer>> results = new ArrayList<>();\\n            calcCombinationSum2(candidates, 0, new int[candidates.length], 0, target, results);\\n            return results;\\n        }\\n        \\n        private void calcCombinationSum2(int[] candidates, int cindex, int[] list, int lindex, int target, List<List<Integer>> results) {\\n            if (target == 0) {\\n                List<Integer> result = new ArrayList<>();\\n                for (int i = 0; i < lindex; i++) {\\n                    result.add(list[i]);\\n                }\\n                results.add(result);\\n                return;\\n            }\\n            \\n            int prev = 0;\\n            for (int i = cindex; i < candidates.length; i++) {\\n                if (candidates[i] != prev) {\\n                    if (target - candidates[i] < 0) {\\n                        break;\\n                    }\\n                    \\n                    list[lindex] = candidates[i];\\n                    calcCombinationSum2(candidates, i + 1, list, lindex + 1, target - candidates[i], results);\\n                    prev = candidates[i];\\n                }\\n            }\\n        }\\n    }"
		}
	],
	"id":"40",
	"title":"Combination Sum II",
	"content":"<p>\r\nGiven a collection of candidate numbers (<b><i>C</i></b>) and a target number (<b><i>T</i></b>), find all unique combinations in <b><i>C</i></b> where the candidate numbers sums to <b><i>T</i></b>.\r\n</p>\r\n\r\n<p>Each number in <b><i>C</i></b> may only be used <b>once</b> in the combination.\r\n</p>\r\n<p><b>Note:</b><br />\r\n<ul>\r\n<li>All numbers (including target) will be positive integers.</li>\r\n<li>The solution set must not contain duplicate combinations.</li>\r\n</ul>\r\n</p>\r\n\r\n<p>\r\nFor example, given candidate set <code>[10, 1, 2, 7, 6, 1, 5]</code> and target <code>8</code>, <br />\r\nA solution set is: <br />\r\n<pre>\r\n[\r\n  [1, 7],\r\n  [1, 2, 5],\r\n  [2, 6],\r\n  [1, 1, 6]\r\n]\r\n</pre>\r\n</p>",
	"frequency":"216",
	"ac_num":"140606"
}