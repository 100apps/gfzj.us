{
	"difficulty":"2",
	"submit_num":"79208",
	"show_id":"254",
	"leetcode_id":"254",
	"answers":[
		{
			"lc_ans_id":"68040",
			"view":"20362",
			"top":"0",
			"title":"My Recursive DFS Java Solution",
			"vote":"84",
			"content":"    public List<List<Integer>> getFactors(int n) {\\n        List<List<Integer>> result = new ArrayList<List<Integer>>();\\n        helper(result, new ArrayList<Integer>(), n, 2);\\n        return result;\\n    }\\n    \\n    public void helper(List<List<Integer>> result, List<Integer> item, int n, int start){\\n        if (n <= 1) {\\n            if (item.size() > 1) {\\n                result.add(new ArrayList<Integer>(item));\\n            }\\n            return;\\n        }\\n        \\n        for (int i = start; i <= n; ++i) {\\n            if (n % i == 0) {\\n                item.add(i);\\n                helper(result, item, n/i, i);\\n                item.remove(item.size()-1);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"68039",
			"view":"7443",
			"top":"1",
			"title":"A simple java solution",
			"vote":"42",
			"content":"    public List<List<Integer>> getFactors(int n) {\\n        List<List<Integer>> result = new ArrayList<List<Integer>>();\\n        if (n <= 3) return result;\\n        helper(n, -1, result, new ArrayList<Integer>());\\n        return result; \\n    }\\n    \\n    public void helper(int n, int lower, List<List<Integer>> result, List<Integer> cur) {\\n        if (lower != -1) {\\n            cur.add(n);\\n            result.add(new ArrayList<Integer>(cur));\\n            cur.remove(cur.size() - 1);\\n        }\\n        int upper = (int) Math.sqrt(n);\\n        for (int i = Math.max(2, lower); i <= upper; ++i) {\\n            if (n % i == 0) {\\n                cur.add(i);\\n                helper(n / i, i, result, cur);\\n                cur.remove(cur.size() - 1);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"68132",
			"view":"4762",
			"top":"2",
			"title":"Share simple C++, DFS accepted solution",
			"vote":"28",
			"content":"    class Solution {\\n        public:\\n            void getResult(vector<vector<int>> &result,vector<int> &row,int n){\\n                int i=row.empty()?2:row.back();\\n                for(;i<=n/i;++i){\\n                    if(n%i==0){\\n                        row.push_back(i);\\n                        row.push_back(n/i);\\n                        result.push_back(row);\\n                        row.pop_back();\\n                        getResult(result,row,n/i);\\n                        row.pop_back();\\n                    }\\n                }\\n            }\\n        \\n            vector<vector<int>> getFactors(int n) {\\n                vector<vector<int>> result;\\n                vector<int>row;\\n                getResult(result,row,n);\\n                return result;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"68044",
			"view":"5503",
			"top":"3",
			"title":"Iterative and Recursive Python",
			"vote":"17",
			"content":"**Iterative:**\\n\\n    def getFactors(self, n):\\n        todo, combis = [(n, 2, [])], []\\n        while todo:\\n            n, i, combi = todo.pop()\\n            while i * i <= n:\\n                if n % i == 0:\\n                    combis += combi + [i, n/i],\\n                    todo += (n/i, i, combi+[i]),\\n                i += 1\\n        return combis\\n\\n**Recursive:**\\n\\n    def getFactors(self, n):\\n        def factor(n, i, combi, combis):\\n            while i * i <= n:\\n                if n % i == 0:\\n                    combis += combi + [i, n/i],\\n                    factor(n/i, i, combi+[i], combis)\\n                i += 1\\n            return combis\\n        return factor(n, 2, [], [])"
		},
		{
			"lc_ans_id":"68041",
			"view":"2945",
			"top":"4",
			"title":"My short Java solution which Is EASY to understand",
			"vote":"16",
			"content":"Here is my JAVA solution which will print the result in the following way:  \\ne.g.   \\ngiven `n = 24`, output: `[[2,12], [2,2,6], [2,2,2,3], [2,3,4], [3,8], [4,6]]`\\n\\n    public class Solution {\\n        public List<List<Integer>> getFactors(int n) {\\n            List<List<Integer>> ret = new LinkedList<List<Integer>>();\\n            if(n <= 3)  return ret;\\n            List<Integer> path = new LinkedList<Integer>();\\n            getFactors(2, n, path, ret);\\n            return ret;\\n        }\\n        \\n        private void getFactors(int start, int n, List<Integer> path, List<List<Integer>> ret){\\n           for(int i = start; i <= Math.sqrt(n); i++){\\n               if(n % i == 0 && n/i >= i){  // The previous factor is no bigger than the next\\n                   path.add(i);\\n                   path.add(n/i);\\n                   ret.add(new LinkedList<Integer>(path));\\n                   path.remove(path.size() - 1);\\n                   getFactors(i, n/i, path, ret);\\n                   path.remove(path.size() - 1);\\n               }\\n           }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"68103",
			"view":"1817",
			"top":"5",
			"title":"Share: Clean and simple 0ms C++ solution, with explanation",
			"vote":"13",
			"content":"    class Solution {\\n    private:\\n        vector<vector<int>> res;\\n    public:\\n        vector<vector<int>> getFactors(int n) {\\n            vector<int> line;\\n            getFHelp(n, 2, line);\\n            return res;\\n        }\\n        \\n        void getFHelp(int n, int bottom, vector<int> line) {\\n            for(int i=bottom; i<=sqrt(n); i++){\\n                if(n%i == 0) {\\n                    vector<int> new_line = line;\\n                    new_line.push_back(i);\\n                    getFHelp(n/i, i, new_line);\\n                    new_line.push_back(n/i);\\n                    res.push_back(new_line);\\n                }\\n            }\\n        }\\n    };\\n1. If the factor is bigger than sqrt(n), then it's next factor will be smaller than sqrt(n), so we only have to loop until the index reaches sqrt(n);\\n2. After we push the factor into the vector, we make the division result to be the next 'n', and call the recursive function. After the function is called, we push the division result into the vector."
		},
		{
			"lc_ans_id":"68124",
			"view":"1877",
			"top":"6",
			"title":"Simple python iterative backtracking solution",
			"vote":"12",
			"content":"    def getFactors(self, n):\\n        ans, stack, x = [], [], 2\\n        while True:\\n            if x > n / x:\\n                if not stack:\\n                    return ans\\n                ans.append(stack + [n])\\n                x = stack.pop()\\n                n *= x\\n                x += 1\\n            elif n % x == 0:\\n                stack.append(x)\\n                n /= x\\n            else:\\n                x += 1\\n\\n\\n    # 20 / 20 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 40 ms\\n    # 97.25%"
		},
		{
			"lc_ans_id":"68095",
			"view":"1249",
			"top":"7",
			"title":"Very easy to understand 2ms java backtracking solution",
			"vote":"8",
			"content":"The upper bound for the factors of n is (int)sqrt(n), and when you find one factor of n, then put the factor and its corresponding factor to a temp list, and add the temp list to the result list. Then we remove the larger factor from the temp list, and recursively do the larger factor from the smaller factor to upper bound for the same procedure.\\n\\nFor example, n = 16. Let the variable i be from 2 to 4, when i = 2, then i is one factor of 16, and its corresponding factor is 8, so we add 2 and 8 to a temp list, then add the temp list to the result list. And remove 8 from the temp list, and recursively do 8 from 2 to 2 for the same procedure.\\n\\nThe result should be:\\n[2, 8]\\n[2, 2, 4]\\n[2, 2, 2, 2]\\n[4, 4]\\n\\n    public class Solution {\\n    public List<List<Integer>> getFactors(int n) {\\n        List<List<Integer>> res = new ArrayList<>();\\n        backTrack(res, new ArrayList<Integer>(), 2, n);\\n        return res;\\n    }\\n    \\n    public void backTrack(List<List<Integer>> res, List<Integer> cur, int start, int n) {\\n        int upper = (int)Math.sqrt(n);\\n        for(int i = start; i <= upper; i++) {\\n            int factor = -1;\\n            if(n % i == 0) {\\n                factor = n/i;\\n            }\\n            if(factor != -1 && factor >= i) {\\n                cur.add(i);\\n                cur.add(factor);\\n                res.add(new ArrayList<Integer>(cur));\\n                cur.remove(cur.size()-1);\\n                backTrack(res, cur, i, factor);\\n                cur.remove(cur.size()-1);\\n            }\\n        }\\n    }\\n}"
		},
		{
			"lc_ans_id":"68060",
			"view":"869",
			"top":"8",
			"title":"Share simple Python solution",
			"vote":"6",
			"content":"    class Solution(object):\\n        def getFactors(self, n):\\n            \"\"\"\\n            :type n: int\\n            :rtype: List[List[int]]\\n            \"\"\"\\n            \\n            if n <= 1:\\n                return []\\n            \\n            res = []\\n            \\n            i = 2\\n            while i * i <= n:\\n                if n % i == 0:\\n                    q = n / i\\n                    res.append([i, q])\\n                    subres = self.getFactors(q)\\n                    for r in subres:\\n                        if r[0] >= i:\\n                            res.append([i] + r)\\n                i += 1\\n                    \\n            return res"
		},
		{
			"lc_ans_id":"68102",
			"view":"1026",
			"top":"9",
			"title":"Java 2ms easy to understand, short and sweet",
			"vote":"5",
			"content":"        public List<List<Integer>> getFactors(int n) {\\n        List<List<Integer>> ans  = new ArrayList();\\n        if (n < 4){\\n            return ans;\\n        }\\n        DFS(n, ans, 2, new ArrayList<Integer>());\\n        return ans;\\n    }\\n    \\n    private void DFS(int n, List<List<Integer>> ans, int factor, List<Integer> entry){\\n        int limit = (int)Math.sqrt(n);\\n        for(int x = factor; x<=limit; x++){\\n            if(n%x == 0){\\n                entry.add(x);\\n                DFS(n/x, ans, x, entry);\\n                entry.add(n/x);\\n                ans.add(new ArrayList(entry));\\n                entry.remove(entry.size()-1);\\n                entry.remove(entry.size()-1);\\n            }\\n        }\\n    }"
		}
	],
	"id":"254",
	"title":"Factor Combinations",
	"content":"<p>Numbers can be regarded as product of its factors. For example,  </p>\r\n<pre>\r\n8 = 2 x 2 x 2;\r\n  = 2 x 4.\r\n</pre>\r\n<p>Write a function that takes an integer <i>n</i> and return all possible combinations of its factors. \r\n</p>\r\n\r\n<p><b>Note:</b> <br/>\r\n<ol>\r\n<li>You may assume that <i>n</i> is always positive. </li>\r\n<li>Factors should be greater than 1 and less than <i>n</i>.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Examples: </b><br/>\r\n input: <code>1</code><br/>\r\n output: <br/>\r\n<pre>\r\n[]\r\n</pre>\r\ninput: <code>37</code><br/>\r\n output: <br/>\r\n<pre>\r\n[]\r\n</pre>\r\n input: <code>12</code><br/>\r\n output:<br/>\r\n<pre>\r\n[\r\n  [2, 6],\r\n  [2, 2, 3],\r\n  [3, 4]\r\n]\r\n</pre>\r\n input: <code>32</code><br/>\r\n output:<br/>\r\n<pre>\r\n[\r\n  [2, 16],\r\n  [2, 2, 8],\r\n  [2, 2, 2, 4],\r\n  [2, 2, 2, 2, 2],\r\n  [2, 4, 4],\r\n  [4, 8]\r\n]\r\n</pre>\r\n</p>",
	"frequency":"163",
	"ac_num":"34670"
}