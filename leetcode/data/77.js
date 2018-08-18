{
	"difficulty":"2",
	"submit_num":"331342",
	"show_id":"77",
	"leetcode_id":"77",
	"answers":[
		{
			"lc_ans_id":"27002",
			"view":"23496",
			"top":"0",
			"title":"Backtracking Solution Java",
			"vote":"89",
			"content":"        public static List<List<Integer>> combine(int n, int k) {\\n    \\t\\tList<List<Integer>> combs = new ArrayList<List<Integer>>();\\n    \\t\\tcombine(combs, new ArrayList<Integer>(), 1, n, k);\\n    \\t\\treturn combs;\\n    \\t}\\n    \\tpublic static void combine(List<List<Integer>> combs, List<Integer> comb, int start, int n, int k) {\\n    \\t\\tif(k==0) {\\n    \\t\\t\\tcombs.add(new ArrayList<Integer>(comb));\\n    \\t\\t\\treturn;\\n    \\t\\t}\\n    \\t\\tfor(int i=start;i<=n;i++) {\\n    \\t\\t\\tcomb.add(i);\\n    \\t\\t\\tcombine(combs, comb, i+1, n, k-1);\\n    \\t\\t\\tcomb.remove(comb.size()-1);\\n    \\t\\t}\\n    \\t}"
		},
		{
			"lc_ans_id":"27019",
			"view":"13586",
			"top":"1",
			"title":"A short recursive Java solution based on C(n,k)=C(n-1,k-1)+C(n-1,k)",
			"vote":"81",
			"content":"Basically, this solution follows the idea of the mathematical formula C(n,k)=C(n-1,k-1)+C(n-1,k).\\n\\nHere C(n,k) is divided into two situations. Situation one, number n is selected, so we only need to select k-1 from n-1 next. Situation two, number n is not selected, and the rest job is selecting k from n-1.\\n\\n    public class Solution {\\n        public List<List<Integer>> combine(int n, int k) {\\n            if (k == n || k == 0) {\\n                List<Integer> row = new LinkedList<>();\\n                for (int i = 1; i <= k; ++i) {\\n                    row.add(i);\\n                }\\n                return new LinkedList<>(Arrays.asList(row));\\n            }\\n            List<List<Integer>> result = this.combine(n - 1, k - 1);\\n            result.forEach(e -> e.add(n));\\n            result.addAll(this.combine(n - 1, k));\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"26992",
			"view":"9279",
			"top":"2",
			"title":"Short Iterative C++ Answer 8ms",
			"vote":"75",
			"content":"    class Solution {\\n    public:\\n    \\tvector<vector<int>> combine(int n, int k) {\\n    \\t\\tvector<vector<int>> result;\\n    \\t\\tint i = 0;\\n    \\t\\tvector<int> p(k, 0);\\n    \\t\\twhile (i >= 0) {\\n    \\t\\t\\tp[i]++;\\n    \\t\\t\\tif (p[i] > n) --i;\\n    \\t\\t\\telse if (i == k - 1) result.push_back(p);\\n    \\t\\t\\telse {\\n    \\t\\t\\t    ++i;\\n    \\t\\t\\t    p[i] = p[i - 1];\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\treturn result;\\n    \\t}\\n    };"
		},
		{
			"lc_ans_id":"27111",
			"view":"9796",
			"top":"3",
			"title":"My shortest c++ solution,using dfs",
			"vote":"39",
			"content":"my idea is using backtracking ,every time I push a number into vector,then I push a bigger one into it;\\nthen  i pop the latest one,and push a another bigger one...\\nand if I has push k number into vector,I push this into result;\\n\\n**this solution take 24 ms.**\\n\\n\\n\\n    class Solution {\\n    public:\\n        vector<vector<int> > combine(int n, int k) {\\n            vector<vector<int> >res;\\n            if(n<k)return res;\\n            vector<int> temp(0,k);\\n            combine(res,temp,0,0,n,k);\\n            return res;\\n        }\\n        \\n        void combine(vector<vector<int> > &res,vector<int> &temp,int start,int num,int n ,int k){\\n            if(num==k){\\n                res.push_back(temp);\\n                return;\\n            }\\n            for(int i = start;i<n;i++){\\n                temp.push_back(i+1);\\n                combine(res,temp,i+1,num+1,n,k);\\n                temp.pop_back();\\n                }\\n            }\\n    };"
		},
		{
			"lc_ans_id":"27024",
			"view":"6602",
			"top":"4",
			"title":"1-liner, 3-liner, 4-liner",
			"vote":"38",
			"content":"**Library - AC in 64 ms**\\n\\nFirst the obvious solution - Python already provides this functionality and it's not forbidden, so let's take advantage of it.\\n\\n    from itertools import combinations\\n    \\n    class Solution:\\n        def combine(self, n, k):\\n            return list(combinations(range(1, n+1), k))\\n\\n---\\n\\n**Recursive - AC in 76 ms**\\n\\nBut doing it yourself is more interesting, and not that hard. Here's a recursive version.\\n\\n    class Solution:\\n        def combine(self, n, k):\\n            if k == 0:\\n                return [[]]\\n            return [pre + [i] for i in range(1, n+1) for pre in self.combine(i-1, k-1)]\\n\\n---\\n\\n**Iterative - AC in 76 ms**\\n\\nAnd here's an iterative one. \\n\\n    class Solution:\\n        def combine(self, n, k):\\n            combs = [[]]\\n            for _ in range(k):\\n                combs = [[i] + c for c in combs for i in range(1, c[0] if c else n+1)]\\n            return combs\\n\\n---\\n\\n**Reduce - AC in 76 ms**\\n\\nSame as that iterative one, but using `reduce` instead of a loop:\\n\\n    class Solution:\\n      def combine(self, n, k):\\n        return reduce(lambda C, _: [[i]+c for c in C for i in range(1, c[0] if c else n+1)],\\n                      range(k), [[]])"
		},
		{
			"lc_ans_id":"27029",
			"view":"6632",
			"top":"5",
			"title":"AC Python backtracking iterative solution 60 ms",
			"vote":"22",
			"content":"    def combine(self, n, k):\\n        ans = []\\n        stack = []\\n        x = 1\\n        while True:\\n            l = len(stack)\\n            if l == k:\\n                ans.append(stack[:])\\n            if l == k or x > n - k + l + 1:\\n                if not stack:\\n                    return ans\\n                x = stack.pop() + 1\\n            else:\\n                stack.append(x)\\n                x += 1\\n\\n    # 26 / 26 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 60 ms\\n    # 98.51%\\n\\n\\nCombinations is typical application for backtracking. Two conditions for back track: (1) the stack length is already k (2) the current value is too large for the rest slots to fit in since we are using ascending order to make sure the uniqueness of each combination."
		},
		{
			"lc_ans_id":"27090",
			"view":"4750",
			"top":"6",
			"title":"DP for the problem",
			"vote":"19",
			"content":"I didn't see any DP solution for this problem, so I share mine:\\nThe idea is simple, if the combination k out of n (select k elements from [1,n]) is combine(k, n).\\n\\nLet's consider how can we get combine(k, n) by adding the last element n to something we already have (combine(k - 1, n - 1) and combine(k, n - 1)). Actually, the combine(k, n) has two parts, one part is all combinations without n, it's combine(k, n - 1), another is all combinations with n, which can be gotten by appending n to every element in combine(k - 1, n - 1). Note, the combine(i, i) is what we can get directly.\\n\\nBelow is my code:\\n\\n\\n    public class Solution\\n    {\\n        // Combine(n, n).\\n        private List<Integer> allContain(int n)\\n        {\\n            final List<Integer> result = new ArrayList<>();\\n            for (int i = 1; i <= n; ++i)\\n            {\\n                result.add(i);\\n            }\\n            \\n            return result;\\n        }\\n        \\n        public List<List<Integer>> combine(int n, int k)\\n        {\\n            List<List<List<Integer>>> previous = new ArrayList<>();\\n            \\n            for (int i = 0; i <= n; ++i)\\n            {\\n                previous.add(Collections.singletonList(Collections.<Integer>emptyList()));\\n            }\\n            \\n            for (int i = 1; i <= k; ++i)\\n            {\\n                final List<List<List<Integer>>> current = new ArrayList<>();\\n                current.add(Collections.singletonList(allContain(i)));\\n                \\n                // Combine(i, j).\\n                for (int j = i + 1; j <= n; ++j)\\n                {\\n                    final List<List<Integer>> list = new ArrayList<>();\\n                    \\n                    // Combine(i, j - 1).\\n                    list.addAll(current.get(current.size() - 1));\\n                    \\n                    // Comine(i - 1, j - 1).\\n                    for (final List<Integer> item : previous.get(current.size()))\\n                    {\\n                        final List<Integer> newItem = new ArrayList<>(item);\\n                        newItem.add(j);\\n                        list.add(newItem);\\n                    }\\n                    \\n                    current.add(list);\\n                }\\n                \\n                previous = current;\\n            }\\n            \\n            return (previous.size() == 0) ? Collections.<List<Integer>>emptyList() : previous.get(previous.size() - 1);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"27032",
			"view":"3750",
			"top":"7",
			"title":"Iterative Java solution",
			"vote":"18",
			"content":"Hi guys!\\n\\nThe idea is to iteratively generate combinations for all lengths from 1 to k. We start with a list of all numbers <= n as combinations for k == 1. When we have all combinations of length k-1, we can get the new ones for a length k with trying to add to each one all elements that are <= n and greater than the last element of a current combination. \\n\\nI think the code here will be much more understandable than further attempts to explain. :) See below.\\n\\nHope it helps!\\n\\n----------\\n\\n    public class Solution {\\n        public List<List<Integer>> combine(int n, int k) {\\n            if (k == 0 || n == 0 || k > n) return Collections.emptyList();\\n            List<List<Integer>> combs = new ArrayList<>();\\n            for (int i = 1; i <= n; i++) combs.add(Arrays.asList(i));\\n            for (int i = 2; i <= k; i++) {\\n                List<List<Integer>> newCombs = new ArrayList<>();\\n                for (int j = i; j <= n; j++) {\\n                    for (List<Integer> comb : combs) {\\n                        if (comb.get(comb.size()-1) < j) {\\n                            List<Integer> newComb = new ArrayList<>(comb);\\n                            newComb.add(j);\\n                            newCombs.add(newComb);\\n                        }\\n                    }\\n                }\\n                combs = newCombs;\\n            }\\n            return combs;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"27015",
			"view":"1680",
			"top":"8",
			"title":"3 ms Java Solution",
			"vote":"13",
			"content":"    public class Solution {\\n        public List<List<Integer>> combine(int n, int k) {\\n            List<List<Integer>> result = new ArrayList<List<Integer>>();\\n            if (k > n || k < 0) {\\n                return result;\\n            }\\n            if (k == 0) {\\n                result.add(new ArrayList<Integer>());\\n                return result;\\n            }\\n            result = combine(n - 1, k - 1);\\n            for (List<Integer> list : result) {\\n                list.add(n);\\n            }\\n            result.addAll(combine(n - 1, k));\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"27081",
			"view":"2626",
			"top":"9",
			"title":"C++ concise recursive solution  C(n,k) ->C(n-1,k-1) / 8ms",
			"vote":"13",
			"content":"    class Solution {\\n    public:\\n        vector<vector<int>> combine(int n, int k) {\\n            vector<vector<int>> ans;\\n            vector<int> temp;\\n            combine(1,n,k,ans,temp); //call fuction to get combination of k numbers which range is 1-n\\n            return ans;\\n        }\\n    private:\\n           void combine(int begin,int n, int k, vector<vector<int>> &ans, vector<int>& temp){\\n                if(k==0){ \\n                    ans.push_back(temp);\\n                    return;\\n                } \\n                //condition : n-i+1 is the range, range must greater than k\\n                for(int i=begin;n-i+1>=k;i++){ // for the ith iteration, get the combination of i and k-1 numbers differ from i.\\n                    temp.push_back(i); \\n                    combine(i+1,n,k-1,ans,temp);// get the combination of k-1 numbers which range is(i+1,n) \\n                    temp.pop_back();\\n                }\\n            }\\n    };"
		}
	],
	"id":"77",
	"title":"Combinations",
	"content":"<p>\r\nGiven two integers <i>n</i> and <i>k</i>, return all possible combinations of <i>k</i> numbers out of 1 ... <i>n</i>.\r\n</p>\r\n<p>\r\nFor example,<br />\r\nIf <i>n</i> = 4 and <i>k</i> = 2, a solution is:\r\n</p>\r\n\r\n<pre>\r\n[\r\n  [2,4],\r\n  [3,4],\r\n  [2,3],\r\n  [1,2],\r\n  [1,3],\r\n  [1,4],\r\n]\r\n</pre>",
	"frequency":"372",
	"ac_num":"135118"
}