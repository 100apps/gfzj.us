{
	"difficulty":"2",
	"submit_num":"177523",
	"show_id":"216",
	"leetcode_id":"216",
	"answers":[
		{
			"lc_ans_id":"60614",
			"view":"19489",
			"top":"0",
			"title":"Simple and clean Java code, backtracking.",
			"vote":"59",
			"content":"     public List<List<Integer>> combinationSum3(int k, int n) {\\n        List<List<Integer>> ans = new ArrayList<>();\\n        combination(ans, new ArrayList<Integer>(), k, 1, n);\\n        return ans;\\n    }\\n\\n\\tprivate void combination(List<List<Integer>> ans, List<Integer> comb, int k,  int start, int n) {\\n\\t\\tif (comb.size() == k && n == 0) {\\n\\t\\t\\tList<Integer> li = new ArrayList<Integer>(comb);\\n\\t\\t\\tans.add(li);\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\t\\tfor (int i = start; i <= 9; i++) {\\n\\t\\t\\tcomb.add(i);\\n\\t\\t\\tcombination(ans, comb, k, i+1, n-i);\\n\\t\\t\\tcomb.remove(comb.size() - 1);\\n\\t\\t}\\n\\t}"
		},
		{
			"lc_ans_id":"60621",
			"view":"9793",
			"top":"1",
			"title":"My C++ solution, backtracking.",
			"vote":"38",
			"content":"    class Solution {\\n    public:\\n      void combination(vector<vector<int>>& result, vector<int> sol, int k, int n) {\\n        if (sol.size() == k && n == 0) { result.push_back(sol); return ; }\\n        if (sol.size() < k) {\\n          for (int i = sol.empty() ? 1 : sol.back() + 1; i <= 9; ++i) {\\n            if (n - i < 0) break;\\n            sol.push_back(i);\\n            combination(result, sol, k, n - i);\\n            sol.pop_back();\\n          }\\n        }\\n      }\\n    \\n      vector<vector<int>> combinationSum3(int k, int n) {\\n        vector<vector<int>> result;\\n        vector<int> sol;\\n        combination(result, sol, k, n);\\n        return result;\\n      }\\n    };"
		},
		{
			"lc_ans_id":"60629",
			"view":"3760",
			"top":"2",
			"title":"Use backtrack c++ solution, easy to understand.",
			"vote":"20",
			"content":"    vector<vector<int>> combinationSum3(int k, int n) {\\n        vector<vector<int>> result;\\n        vector<int> path;\\n        backtrack(result, path, 1, k, n);\\n        return result;\\n    }\\n    \\n    void backtrack(vector<vector<int>> &result, vector<int> &path, int start, int k, int target){\\n        if(target==0&&k==0){\\n            result.push_back(path);\\n            return;\\n        }\\n        for(int i=start;i<=10-k&&i<=target;i++){\\n            path.push_back(i);\\n            backtrack(result,path,i+1,k-1,target-i);\\n            path.pop_back();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"60631",
			"view":"5493",
			"top":"3",
			"title":"Fast, easy Java code, with explanation!",
			"vote":"19",
			"content":"Used backtracking to solve this.\\nBuild an array to apply to \"subset\" template. Each time we add an element to the \"list\", for the next step, target= target - num[i]. Since we have already added one element, for the next step, we can only add k-1 elements. Since no duplicated elements accept, for the next loop, the \"start\" should point to the next index of current index. The `list.remove(list.size() - 1)` here means, we need to change the element here. I know it is hard to understand it, let me give you an example.\\nWhen `k=3, n=9`, my answer works like this:\\n[1]->[1,2]->[1,2,3]. Since now sum is not 9, no more backtracking, so after  `list.remove(list.size() - 1)`, it is [1,2]. Then next follows [1,2,4], sum is not 9, repeat process above untill [1,2,6]. When go to next backtracking, the list will be added to `result`, and for this list, no more backtracking.\\nNow we can go back to a previous backtracking, which is [1,3]->[1,3,4], fail. [1,4,]->[1,4,5], fail. And so one.\\nSo the point of  `list.remove(list.size() - 1)` is, after each \"fail\" or \"success\", since we don't need to do further attempts given such a condition, we delete the last element, and then end current backtracking. Next step is, add the next element to the deleted index, go on attempting. \\n\\nIf you have other questions, just reply me. \\n\\n\\n\\n\\n  \\n\\n    public class Solution {\\n    public List<List<Integer>> combinationSum3(int k, int n) {\\n        int[] num = {1,2,3,4,5,6,7,8,9};\\n        List<List<Integer>> result = new ArrayList<List<Integer>>();\\n        helper(result, new ArrayList<Integer>(), num, k, n,0);\\n        return result;\\n        }\\n    \\n    public void helper(List<List<Integer>> result, List<Integer> list, int[] num, int k, int target, int start){\\n        if (k == 0 && target == 0){\\n            result.add(new ArrayList<Integer>(list));\\n        } else {\\n            for (int i = start; i < num.length && target > 0 && k >0; i++){\\n                list.add(num[i]);\\n                helper(result, list, num, k-1,target-num[i],i+1);\\n                list.remove(list.size()-1);\\n            }\\n        }\\n    }\\n}"
		},
		{
			"lc_ans_id":"60624",
			"view":"1641",
			"top":"4",
			"title":"Clean 1/6/7-liners (AC)",
			"vote":"10",
			"content":"**Batteries Included**  \\nAC in 44ms\\n\\nFirst the obligatory *\"use the darn library\"* solution. Create all k-combinations of digits and keep those with sum n:\\n\\n    from itertools import combinations\\n\\n    class Solution:\\n        def combinationSum3(self, k, n):\\n            return [c for c in combinations(range(1, 10), k) if sum(c) == n]\\n\\n---\\n\\n**Recursive**  \\nAC in 48 ms\\n\\nBut it's more interesting to do it on your own. Here I use a recursive helper function getting the same k and n as the main function, and an additional cap under which all the numbers have to be:\\n\\n    class Solution:\\n        def combinationSum3(self, k, n):\\n            def combs(k, n, cap):\\n                if not k:\\n                    return [[]] * (not n)\\n                return [comb + [last]\\n                        for last in range(1, cap)\\n                        for comb in combs(k-1, n-last, last)]\\n            return combs(k, n, 10)\\n\\n---\\n\\n**Iterative**  \\nAC in 56 ms\\n\\nAnd an iterative version doing pretty much the same thing, except this time I prepend elements on the left, and use the first element of a partial combination as the cap.\\n\\n    class Solution:\\n        def combinationSum3(self, k, n):\\n            combs = [[]]\\n            for _ in range(k):\\n                combs = [[first] + comb\\n                         for comb in combs\\n                         for first in range(1, comb[0] if comb else 10)]\\n            return [c for c in combs if sum(c) == n]\\n\\n---\\n\\n**Reduce**  \\nAC in 44 ms\\n\\nAnd here's a \"one-liner\" version of the iterative solution using `reduce` instead of the loop:\\n\\n    class Solution:\\n        def combinationSum3(self, k, n):\\n            return [c for c in\\n                    reduce(lambda combs, _: [[first] + comb\\n                                             for comb in combs\\n                                             for first in range(1, comb[0] if comb else 10)],\\n                           range(k), [[]])\\n                    if sum(c) == n]\\n\\n---\\n\\nI note that all these solutions also correctly solve the cases with k=0 and/or n=0 (but leetcode sadly doesn't test those)."
		},
		{
			"lc_ans_id":"60719",
			"view":"884",
			"top":"5",
			"title":"Combination Sum I, II and III Java solution (see the similarities yourself)",
			"vote":"9",
			"content":"Combination Sum I\\n\\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\\n        List<List<Integer>> list = new ArrayList<>();\\n        Arrays.sort(candidates);\\n        backtrack(list, new ArrayList<Integer>(), candidates, target, 0);\\n        return list;\\n    }\\n\\n    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] cand, int remain, int start) {\\n        if (remain < 0) return; /** no solution */\\n        else if (remain == 0) list.add(new ArrayList<>(tempList));\\n        else{\\n            for (int i = start; i < cand.length; i++) { \\n                tempList.add(cand[i]);\\n                backtrack(list, tempList, cand, remain-cand[i], i);\\n                tempList.remove(tempList.size()-1);\\n            } \\n        }\\n\\n    }\\n\\nCombination Sum II\\n\\n    public List<List<Integer>> combinationSum2(int[] candidates, int target) {\\n       List<List<Integer>> list = new LinkedList<List<Integer>>();\\n       Arrays.sort(candidates);\\n       backtrack(list, new ArrayList<Integer>(), candidates, target, 0);\\n       return list;\\n    }\\n    \\n    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] cand, int remain, int start) {\\n       \\n       if(remain < 0) return; /** no solution */\\n       else if(remain == 0) list.add(new ArrayList<>(tempList));\\n       else{\\n          for (int i = start; i < cand.length; i++) {\\n             if(i > start && cand[i] == cand[i-1]) continue; /** skip duplicates */\\n             tempList.add(cand[i]);\\n             backtrack(list, tempList, cand, remain - cand[i], i+1);\\n             tempList.remove(tempList.size() - 1);\\n          }\\n       }\\n    }\\n\\nCombination Sum III\\n\\n    public List<List<Integer>> combinationSum3(int k, int n) {\\n        List<List<Integer>> list = new ArrayList<>();\\n        backtrack(list, new ArrayList<Integer>(), k, n, 1);\\n        return list;\\n    }\\n    \\n    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int k, int remain, int start) {\\n        if(tempList.size() > k) return; /** no solution */\\n        else if(tempList.size() == k && remain == 0) list.add(new ArrayList<>(tempList));\\n        else{\\n            for (int i = start; i <= 9; i++) {\\n                tempList.add(i);\\n                backtrack(list, tempList, k, remain-i, i+1);\\n                tempList.remove(tempList.size() - 1);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"60805",
			"view":"833",
			"top":"6",
			"title":"Easy to understand Python solution (backtracking).",
			"vote":"9",
			"content":"    def combinationSum3(self, k, n):\\n        res = []\\n        self.dfs(xrange(1,10), k, n, 0, [], res)\\n        return res\\n        \\n    def dfs(self, nums, k, n, index, path, res):\\n        if k < 0 or n < 0: # backtracking \\n            return \\n        if k == 0 and n == 0: \\n            res.append(path)\\n        for i in xrange(index, len(nums)):\\n            self.dfs(nums, k-1, n-nums[i], i+1, path+[nums[i]], res)"
		},
		{
			"lc_ans_id":"60636",
			"view":"3253",
			"top":"7",
			"title":"Concise python solution using DFS",
			"vote":"9",
			"content":"    class Solution:\\n        # @param {integer} k\\n        # @param {integer} n\\n        # @return {integer[][]}\\n        def combinationSum3(self, k, n):\\n            if n > sum([i for i in range(1, 11)]):\\n                return []\\n    \\n            res = []\\n            self.sum_help(k, n, 1, [], res)\\n            return res\\n    \\n    \\n        def sum_help(self, k, n, curr, arr, res):\\n            if len(arr) == k:\\n                if sum(arr) == n:\\n                    res.append(list(arr))\\n                return\\n    \\n            if len(arr) > k or curr > 9:\\n                return\\n            \\n            for i in range(curr, 10):\\n                arr.append(i)\\n                self.sum_help(k, n, i + 1, arr, res)\\n                arr.pop()"
		},
		{
			"lc_ans_id":"60746",
			"view":"4632",
			"top":"8",
			"title":"Accepted recursive Java solution, easy to understand",
			"vote":"9",
			"content":"The idea is to choose proper number for 1,2..kth position in ascending order, and for each position, we only iterate through (prev_num, n/k]. Time comlexity O(k)\\n\\n    public class Solution {\\n        private List<List<Integer>> res = new ArrayList<List<Integer>>();\\n        public List<List<Integer>> combinationSum3(int k, int n) {\\n            findCombo( k, n, 1, new LinkedList<Integer>() );\\n            return res;\\n        }\\n        public void findCombo(int k, int n, int start, List<Integer> list){\\n            if( k == 1 ){\\n                if( n < start || n > 9 ) return;\\n                list.add( n );\\n                res.add( list );\\n                return;\\n            }\\n            for( int i = start; i <= n / k && i < 10; i++ ){\\n                List<Integer> subList = new LinkedList<Integer>( list );\\n                sub.add( i );\\n                findCombo( k - 1, n - i, i + 1, subList );\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"60751",
			"view":"361",
			"top":"9",
			"title":"Input [1, 100], why expected [[100]]",
			"vote":"8",
			"content":"when I provide the input k = 1, n = 100, the oj gives me the answer [[100]]. I think it is not correct, cause we can only use number 1-9. Any comment?"
		}
	],
	"id":"216",
	"title":"Combination Sum III",
	"content":"<div>\r\n<p>Find all possible combinations of <i><b>k</b></i> numbers that add up to a number <i><b>n</b></i>, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.</p>\r\n</div>\r\n<div>\r\n<br>\r\n<p> <i><b>Example 1:</b></i></p>\r\n<p>Input:  <i><b>k</b></i> = 3,  <i><b>n</b></i> = 7</p>\r\n<p>Output: </p>\r\n<p><pre>\r\n[[1,2,4]]\r\n</pre></p>\r\n<br>\r\n<p> <i><b>Example 2:</b></i></p>\r\n<p>Input:  <i><b>k</b></i> = 3,  <i><b>n</b></i> = 9</p>\r\n<p>Output: </p>\r\n<p><pre>\r\n[[1,2,6], [1,3,5], [2,3,4]]\r\n</pre></p>\r\n</div>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/mithmatt\">@mithmatt</a> for adding this problem and creating all test cases.</p>",
	"frequency":"328",
	"ac_num":"82736"
}