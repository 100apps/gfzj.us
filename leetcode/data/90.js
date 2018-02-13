{
	"difficulty":"2",
	"submit_num":"360699",
	"show_id":"90",
	"leetcode_id":"90",
	"answers":[
		{
			"lc_ans_id":"30168",
			"view":"28048",
			"top":"0",
			"title":"C++ solution and explanation",
			"vote":"179",
			"content":"To solve this problem, it is helpful to first think how many subsets are there. If there is no duplicate element, the answer is simply 2^n, where n is the number of elements. This is because you have two choices for each element, either putting it into the subset or not. So all subsets for this no-duplicate set can be easily constructed:\\nnum of subset\\n\\n -  (1        to 2^0) empty set is the first subset\\n -  (2^0+1 to 2^1) add the first element into subset from (1)\\n -  (2^1+1 to 2^2) add the second element into subset (1 to 2^1)\\n -  (2^2+1 to 2^3) add the third element into subset (1 to 2^2)\\n - ....\\n -  (2^(n-1)+1 to 2^n) add the nth element into subset(1 to 2^(n-1))\\n\\nThen how many subsets are there if there are duplicate elements? We can treat duplicate element as a spacial element. For example, if we have duplicate elements (5, 5), instead of treating them as two elements that are duplicate, we can treat it as one special element 5, but this element has more than two choices: you can either NOT put it into the subset, or put ONE 5 into the subset, or put TWO 5s into the subset. Therefore, we are given an array (a1, a2, a3, ..., an) with each of them appearing (k1, k2, k3, ..., kn) times, the number of subset is (k1+1)*(k2+1)*...(kn+1). We can easily see how to write down all the subsets similar to the approach above.\\n\\n        class Solution {\\n    public:\\n        vector<vector<int> > subsetsWithDup(vector<int> &S) {\\n            vector<vector<int> > totalset = {{}};\\n            sort(S.begin(),S.end());\\n            for(int i=0; i<S.size();){\\n                int count = 0; // num of elements are the same\\n                while(count + i<S.size() && S[count+i]==S[i])  count++;\\n                int previousN = totalset.size();\\n                for(int k=0; k<previousN; k++){\\n                    vector<int> instance = totalset[k];\\n                    for(int j=0; j<count; j++){\\n                        instance.push_back(S[i]);\\n                        totalset.push_back(instance);\\n                    }\\n                }\\n                i += count;\\n            }\\n            return totalset;\\n            }\\n    };"
		},
		{
			"lc_ans_id":"30137",
			"view":"18997",
			"top":"1",
			"title":"Simple iterative solution",
			"vote":"101",
			"content":"If we want to insert an element which is a dup, we can only insert it after the newly inserted elements from last step.\\n\\n    vector<vector<int> > subsetsWithDup(vector<int> &S) {\\n        sort(S.begin(), S.end());\\n        vector<vector<int>> ret = {{}};\\n        int size = 0, startIndex = 0;\\n        for (int i = 0; i < S.size(); i++) {\\n            startIndex = i >= 1 && S[i] == S[i - 1] ? size : 0;\\n            size = ret.size();\\n            for (int j = startIndex; j < size; j++) {\\n                vector<int> temp = ret[j];\\n                temp.push_back(S[i]);\\n                ret.push_back(temp);\\n            }\\n        }\\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"30164",
			"view":"11207",
			"top":"2",
			"title":"Accepted 10ms c++ solution use backtracking, only 10 lines, easy understand.",
			"vote":"68",
			"content":"**The characteristics of C++ reference is an outstanding tool for backtracking algorithm!**\\n\\nlet us use [1,2,3,4] as an example to explain my solution:\\n\\n    subsets([1,2,3,4]) = []\\n                         // push(1)\\n                         [1, subsets([2,3,4])] // if push N times in subsets([2,3,4]), the pop times is also N, so vec is also [1] after backtrack.\\n                         // pop(), push(2)\\n                         [2, subsets([3,4])]\\n                         // pop(), push(3)\\n                         [3, subsets([4])]\\n                         // pop(), push(4)\\n                         [4, subsets([])]\\n                         // pop()\\n\\nAccepted 10ms c++ solution use backtracking for [Subsets ][1]\\n\\n    class Solution {\\n    public:\\n        std::vector<std::vector<int> > subsets(std::vector<int> &nums) {\\n    \\t\\tstd::sort(nums.begin(), nums.end());\\n            std::vector<std::vector<int> > res;\\n    \\t\\tstd::vector<int> vec;\\n    \\t\\tsubsets(res, nums, vec, 0);\\n    \\t\\treturn res;\\n        }\\n    private:\\n    \\tvoid subsets(std::vector<std::vector<int> > &res, std::vector<int> &nums, std::vector<int> &vec, int begin) {\\n    \\t\\tres.push_back(vec);\\n    \\t\\tfor (int i = begin; i != nums.size(); ++i) {\\n    \\t\\t\\tvec.push_back(nums[i]);\\n    \\t\\t\\tsubsets(res, nums, vec, i + 1);\\n    \\t\\t\\tvec.pop_back();\\n    \\t\\t}\\n    \\t}\\n    };\\n\\n\\nAccepted 10ms c++ solution use backtracking for [Subsets II][2]\\n\\n    class Solution {\\n    public:\\n        std::vector<std::vector<int> > subsetsWithDup(std::vector<int> &nums) {\\n    \\t\\tstd::sort(nums.begin(), nums.end());\\n            std::vector<std::vector<int> > res;\\n    \\t\\tstd::vector<int> vec;\\n    \\t\\tsubsetsWithDup(res, nums, vec, 0);\\n    \\t\\treturn res;\\n        }\\n    private:\\n    \\tvoid subsetsWithDup(std::vector<std::vector<int> > &res, std::vector<int> &nums, std::vector<int> &vec, int begin) {\\n    \\t\\tres.push_back(vec);\\n    \\t\\tfor (int i = begin; i != nums.size(); ++i)\\n    \\t\\t\\tif (i == begin || nums[i] != nums[i - 1]) { \\n    \\t\\t\\t\\tvec.push_back(nums[i]);\\n    \\t\\t\\t\\tsubsetsWithDup(res, nums, vec, i + 1);\\n    \\t\\t\\t\\tvec.pop_back();\\n    \\t\\t\\t}\\n    \\t}\\n    };\\n\\n\\n  [1]: https://leetcode.com/problems/subsets/\\n  [2]: https://leetcode.com/problems/subsets-ii/"
		},
		{
			"lc_ans_id":"30166",
			"view":"6939",
			"top":"3",
			"title":"Simple python solution without extra space.",
			"vote":"62",
			"content":"    class Solution:\\n        # @param num, a list of integer\\n        # @return a list of lists of integer\\n        def subsetsWithDup(self, S):\\n            res = [[]]\\n            S.sort()\\n            for i in range(len(S)):\\n                if i == 0 or S[i] != S[i - 1]:\\n                    l = len(res)\\n                for j in range(len(res) - l, len(res)):\\n                    res.append(res[j] + [S[i]])\\n            return res\\n\\nif S[i] is same to S[i - 1], then it needn't to be added to all of the subset, just add it to the last l subsets which are created by adding S[i - 1]"
		},
		{
			"lc_ans_id":"30150",
			"view":"16281",
			"top":"4",
			"title":"Very simple and fast java solution",
			"vote":"44",
			"content":"    public List<List<Integer>> subsetsWithDup(int[] nums) {\\n        Arrays.sort(nums);\\n        List<List<Integer>> res = new ArrayList<>();\\n        List<Integer> each = new ArrayList<>();\\n        helper(res, each, 0, nums);\\n        return res;\\n    }\\n    public void helper(List<List<Integer>> res, List<Integer> each, int pos, int[] n) {\\n        if (pos <= n.length) {\\n            res.add(each);\\n        }\\n        int i = pos;\\n        while (i < n.length) {\\n            each.add(n[i]);\\n            helper(res, new ArrayList<>(each), i + 1, n);\\n            each.remove(each.size() - 1);\\n            i++;\\n            while (i < n.length && n[i] == n[i - 1]) {i++;}\\n        }\\n        return;\\n    }\\n\\n\\n----------\\nThe Basic idea is: use \"while (i < n.length && n[i] == n[i - 1]) {i++;}\" to avoid the duplicate. For example, the input is 2 2 2 3 4. Consider the helper function. The process is: \\n\\n - each.add(n[i]); --> add first 2 (index 0)\\n - helper(res, new ArrayList<>(each), i + 1, n); --> go to recursion part, list each is <2 (index 0)>\\n - while (i < n.length && n[i] == n[i - 1]) {i++;} --> after this, i == 3, add the element as in subset I"
		},
		{
			"lc_ans_id":"30158",
			"view":"3955",
			"top":"5",
			"title":"Standard DFS Java Solution",
			"vote":"28",
			"content":"    public class Solution {\\n        public List<List<Integer>> subsetsWithDup(int[] nums) {\\n            Arrays.sort(nums);\\n            List<List<Integer>> result= new ArrayList<>();\\n            dfs(nums,0,new ArrayList<Integer>(),result);\\n            return result;\\n        }\\n        \\n        public void dfs(int[] nums,int index,List<Integer> path,List<List<Integer>> result){\\n            result.add(path);\\n            for(int i=index;i<nums.length;i++){\\n                if(i>index&&nums[i]==nums[i-1]) continue;\\n                List<Integer> nPath= new ArrayList<>(path);\\n                nPath.add(nums[i]);\\n                dfs(nums,i+1,nPath,result);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"30242",
			"view":"3336",
			"top":"6",
			"title":"Share my 2ms java iteration solution (very simple and short)",
			"vote":"25",
			"content":"    \\n    public List<List<Integer>> subsetsWithDup(int[] nums) {\\n        Arrays.sort(nums);\\n\\t\\tList<List<Integer>> result = new ArrayList<List<Integer>>();\\n\\t\\tresult.add(new ArrayList<Integer>());\\n\\t\\tint begin = 0;\\n\\t\\tfor(int i = 0; i < nums.length; i++){\\n\\t\\t\\tif(i == 0 || nums[i] != nums[i - 1]) begin = 0;\\n\\t\\t\\tint size = result.size();\\n\\t\\t\\tfor(int j = begin; j < size; j++){\\n\\t\\t\\t\\tList<Integer> cur = new ArrayList<Integer>(result.get(j));\\n\\t\\t\\t\\tcur.add(nums[i]);\\n\\t\\t\\t\\tresult.add(cur);\\n\\t\\t\\t}\\n\\t\\t\\tbegin = size;\\n\\t\\t}\\n\\t\\treturn result;\\n    }"
		},
		{
			"lc_ans_id":"30304",
			"view":"2439",
			"top":"7",
			"title":"48ms solution with subset construction method",
			"vote":"15",
			"content":"One possible solution is to generate all possible subset using bit-mask, and use a set to test the existence of a subset. However, this method may generate duplicate subsets during the process, and has unsatisfiable time complexity. E.g. for input <1 1 1 1 1 1 1 1 1>, the above method will generate too many duplicate subsets.\\n\\nI use a subset construction method, whose mechanism is illustrated with an example:\\n\\ninput: <1 2 2 3 3 3> (assumed to be sorted)\\n\\ninitialization: empty set <>. ret = {<>}\\n\\nfor element 1, add it to ret, and we get: <1>. ret = {<> <1>}\\n\\nfor element 2, add it to ret, and we get: <2> <1 2>; however, notice that we have two elements of 2, hence we further need to add <2 2> to {<> <1>}, and get <2 2> <1 2 2>. ret = {<> <1> <2> <1 2> <2 2> <1 2 2>}\\n\\nfor element 3, we newly construct the following:              \\n<3> <1 3> <2 3> <1 2 3> < 2 2 3> < 1 2 2 3>             \\n<3 3> <1 3 3> <2 3 3> <1 2 3 3> <2 2 3 3> <1 2 2 3 3>             \\n<3 3 3> <1 3 3 3> < 2 3 3 3> <1 2 3 3 3> <2 2 3 3 3> <1 2 2 3 3 3>                 \\nfinally, ret = {<> <1> <2> <1 2> <2 2> <1 2 2>   \\n<3> <1 3> <2 3> <1 2 3> < 2 2 3> < 1 2 2 3>   \\n<3 3> <1 3 3> <2 3 3> <1 2 3 3> <2 2 3 3> <1 2 2 3 3>   \\n<3 3 3> <1 3 3 3> < 2 3 3 3> <1 2 3 3 3> <2 2 3 3 3> <1 2 2 3 3 3>\\n}\\n\\n    class Solution {\\n    public:\\n        vector<vector<int> > subsetsWithDup(vector<int> &S) {\\n            vector<vector<int> > ret;\\n            ret.push_back(vector<int>());\\n            sort(S.begin(), S.end());\\n            for (int i = 0; i < S.size(); ) {\\n                int j = i;\\n                while (j < S.size() && S[j] == S[i]) j++;\\n                int size = ret.size();\\n                for (int len = 1; i + len <= j; len++) {\\n                    for (int cnt = 0; cnt < size; cnt++) {\\n                        vector<int> subset(ret[cnt]);\\n                        for (int k = 0; k < len; k++) subset.push_back(S[i]);\\n                        ret.push_back(subset);\\n                    }\\n                }\\n                i = j;\\n            }\\n            return ret;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"30292",
			"view":"1335",
			"top":"8",
			"title":"Share my 12ms C++ solution",
			"vote":"12",
			"content":"    class Solution {\\n    public:\\n        vector<vector<int>> subsetsWithDup(vector<int>& nums) {\\n            sort(nums.begin(), nums.end());\\n            vector<vector<int>> subsets;\\n            vector<int> subset;\\n            subsetsWithDupWorker(nums, subsets, subset, 0);\\n            return subsets;\\n        }\\n    private:\\n        void subsetsWithDupWorker(const vector<int>& nums, vector<vector<int>>& subsets, vector<int>& subset, int begin) {\\n            subsets.push_back(subset);\\n            for (int i = begin; i < nums.size(); i++) {\\n                if (i != begin && nums[i] == nums[i-1]) continue;\\n                subset.push_back(nums[i]);\\n                subsetsWithDupWorker(nums, subsets, subset, i+1);\\n                subset.pop_back();\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"30305",
			"view":"1141",
			"top":"9",
			"title":"Simple python solution (DFS).",
			"vote":"10",
			"content":"      \\n    # DFS  \\n    def subsetsWithDup(self, nums):\\n        res = []\\n        nums.sort()\\n        self.dfs(nums, 0, [], res)\\n        return res\\n        \\n    def dfs(self, nums, index, path, res):\\n        res.append(path)\\n        for i in xrange(index, len(nums)):\\n            if i > index and nums[i] == nums[i-1]:\\n                continue\\n            self.dfs(nums, i+1, path+[nums[i]], res)"
		}
	],
	"id":"90",
	"title":"Subsets II",
	"content":"<p>\r\nGiven a collection of integers that might contain duplicates, <b><i>nums</i></b>, return all possible subsets (the power set).\r\n</p>\r\n<p><b>Note:</b> The solution set must not contain duplicate subsets.\r\n</p>\r\n<p>\r\nFor example,<br />\r\nIf <b><i>nums</i></b> = <code>[1,2,2]</code>, a solution is:\r\n</p>\r\n\r\n<pre>\r\n[\r\n  [2],\r\n  [1],\r\n  [1,2,2],\r\n  [2,2],\r\n  [1,2],\r\n  []\r\n]\r\n</pre>",
	"frequency":"268",
	"ac_num":"136058"
}