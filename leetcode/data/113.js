{
	"difficulty":"2",
	"submit_num":"434893",
	"show_id":"113",
	"leetcode_id":"113",
	"answers":[
		{
			"lc_ans_id":"36683",
			"view":"27623",
			"top":"0",
			"title":"DFS with one LinkedList , accepted java solution",
			"vote":"64",
			"content":"\\tpublic List<List<Integer>> pathSum(TreeNode root, int sum){\\n\\t\\tList<List<Integer>> result  = new LinkedList<List<Integer>>();\\n\\t\\tList<Integer> currentResult  = new LinkedList<Integer>();\\n\\t\\tpathSum(root,sum,currentResult,result);\\n\\t\\treturn result;\\n\\t}\\n\\n\\tpublic void pathSum(TreeNode root, int sum, List<Integer> currentResult,\\n\\t\\t\\tList<List<Integer>> result) {\\n\\n\\t\\tif (root == null)\\n\\t\\t\\treturn;\\n\\t\\tcurrentResult.add(new Integer(root.val));\\n\\t\\tif (root.left == null && root.right == null && sum == root.val) {\\n\\t\\t\\tresult.add(new LinkedList(currentResult));\\n\\t\\t\\tcurrentResult.remove(currentResult.size() - 1);//don't forget to remove the last integer\\n\\t\\t\\treturn;\\n\\t\\t} else {\\n\\t\\t\\tpathSum(root.left, sum - root.val, currentResult, result);\\n\\t\\t\\tpathSum(root.right, sum - root.val, currentResult, result);\\n\\t\\t}\\n\\t\\tcurrentResult.remove(currentResult.size() - 1);\\n\\t}"
		},
		{
			"lc_ans_id":"36685",
			"view":"12799",
			"top":"1",
			"title":"12ms 11-lines C++ Solution",
			"vote":"45",
			"content":"Well, a typical backtracking problem. The code is as follows. You may walk through it using the example in the problem statement to see how it works.\\n\\n    class Solution {\\n    public:\\n        vector<vector<int>> pathSum(TreeNode* root, int sum) {\\n            vector<vector<int> > paths;\\n            vector<int> path;\\n            findPaths(root, sum, path, paths);\\n            return paths;  \\n        }\\n    private:\\n        void findPaths(TreeNode* node, int sum, vector<int>& path, vector<vector<int> >& paths) {\\n            if (!node) return;\\n            path.push_back(node -> val);\\n            if (!(node -> left) && !(node -> right) && sum == node -> val)\\n                paths.push_back(path);\\n            findPaths(node -> left, sum - node -> val, path, paths);\\n            findPaths(node -> right, sum - node -> val, path, paths);\\n            path.pop_back();\\n        }\\n    };"
		},
		{
			"lc_ans_id":"36673",
			"view":"10653",
			"top":"2",
			"title":"Simple DFS Java Solution",
			"vote":"21",
			"content":"Save intermediate result into stack and save the stack into result array once its sum == required sum.\\n\\n    public class Solution {\\n        private List<List<Integer>> resultList = new ArrayList<List<Integer>>();\\n        \\n        public void pathSumInner(TreeNode root, int sum, Stack<Integer>path) {\\n            path.push(root.val);\\n            if(root.left == null && root.right == null)\\n                if(sum == root.val) resultList.add(new ArrayList<Integer>(path));\\n            if(root.left!=null) pathSumInner(root.left, sum-root.val, path);\\n            if(root.right!=null)pathSumInner(root.right, sum-root.val, path);\\n            path.pop();\\n        }\\n        \\n        public List<List<Integer>> pathSum(TreeNode root, int sum) {\\n            if(root==null) return resultList;\\n            Stack<Integer> path = new Stack<Integer>();\\n            pathSumInner(root, sum, path);\\n            return resultList;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"36695",
			"view":"4000",
			"top":"3",
			"title":"Java Solution: iterative and recursive",
			"vote":"17",
			"content":"    //1. iterative: Using a stack to implement DFS\\n    //2. Recursive: \\n\\n    public class Solution {\\n        public List<List<Integer>> pathSum(TreeNode root, int sum) {\\n            List<List<Integer>> res = new ArrayList<>();\\n            List<Integer> path = new ArrayList<>();\\n            Stack<TreeNode> stack = new Stack<TreeNode>();\\n            int SUM = 0;\\n            TreeNode cur = root;\\n            TreeNode pre = null;\\n            while(cur!=null || !stack.isEmpty()){\\n                while(cur!=null){\\n                    stack.push(cur);\\n                    path.add(cur.val);\\n                    SUM+=cur.val;\\n                    cur=cur.left;\\n                }\\n                cur = stack.peek();\\n                if(cur.right!=null && cur.right!=pre){\\n                    cur = cur.right;\\n                    continue;\\n                } \\n                if(cur.left==null && cur.right==null && SUM==sum) \\n                    res.add(new ArrayList<Integer>(path));\\n      \\n                pre = cur;\\n                stack.pop();\\n                path.remove(path.size()-1);\\n                SUM-=cur.val;\\n                cur = null;\\n            \\n            }\\n            return res;\\n        }\\n    }\\n\\n   \\n    \\n        public class Solution {\\n            public List<List<Integer>> pathSum(TreeNode root, int sum) {\\n                List<List<Integer>> res = new ArrayList<>();\\n                List<Integer> path = new ArrayList<>();\\n                dfs(root, sum, res, path);\\n                return res;\\n            }\\n            \\n            public void dfs(TreeNode root, int sum, List<List<Integer>> res, List<Integer> path){\\n                if(root==null) return;\\n                path.add(root.val);\\n                \\n                if(root.left==null && root.right==null ){\\n                    if(root.val==sum)\\n                        res.add(new ArrayList<Integer>(path));\\n                    return;\\n                }\\n                if(root.left!=null) {\\n                    dfs(root.left,sum-root.val,res,path);\\n                    path.remove(path.size()-1);\\n                }\\n                if(root.right!=null) {\\n                    dfs(root.right,sum-root.val,res,path);\\n                    path.remove(path.size()-1);\\n                }\\n                \\n            }\\n        }"
		},
		{
			"lc_ans_id":"36829",
			"view":"3387",
			"top":"4",
			"title":"Python solutions (Recursively, BFS+queue, DFS+stack)",
			"vote":"16",
			"content":"    def pathSum(self, root, sum):\\n        if not root:\\n            return []\\n        res = []\\n        self.dfs(root, sum, [], res)\\n        return res\\n        \\n    def dfs(self, root, sum, ls, res):\\n        if not root.left and not root.right and sum == root.val:\\n            ls.append(root.val)\\n            res.append(ls)\\n        if root.left:\\n            self.dfs(root.left, sum-root.val, ls+[root.val], res)\\n        if root.right:\\n            self.dfs(root.right, sum-root.val, ls+[root.val], res)\\n            \\n    def pathSum2(self, root, sum):\\n        if not root:\\n            return []\\n        if not root.left and not root.right and sum == root.val:\\n            return [[root.val]]\\n        tmp = self.pathSum(root.left, sum-root.val) + self.pathSum(root.right, sum-root.val)\\n        return [[root.val]+i for i in tmp]\\n    \\n    # BFS + queue    \\n    def pathSum3(self, root, sum): \\n        if not root:\\n            return []\\n        res = []\\n        queue = [(root, root.val, [root.val])]\\n        while queue:\\n            curr, val, ls = queue.pop(0)\\n            if not curr.left and not curr.right and val == sum:\\n                res.append(ls)\\n            if curr.left:\\n                queue.append((curr.left, val+curr.left.val, ls+[curr.left.val]))\\n            if curr.right:\\n                queue.append((curr.right, val+curr.right.val, ls+[curr.right.val]))\\n        return res\\n        \\n    # DFS + stack I  \\n    def pathSum4(self, root, sum): \\n        if not root:\\n            return []\\n        res = []\\n        stack = [(root, sum-root.val, [root.val])]\\n        while stack:\\n            curr, val, ls = stack.pop()\\n            if not curr.left and not curr.right and val == 0:\\n                res.append(ls)\\n            if curr.right:\\n                stack.append((curr.right, val-curr.right.val, ls+[curr.right.val]))\\n            if curr.left:\\n                stack.append((curr.left, val-curr.left.val, ls+[curr.left.val]))\\n        return res \\n    \\n    # DFS + stack II   \\n    def pathSum5(self, root, s): \\n        if not root:\\n            return []\\n        res = []\\n        stack = [(root, [root.val])]\\n        while stack:\\n            curr, ls = stack.pop()\\n            if not curr.left and not curr.right and sum(ls) == s:\\n                res.append(ls)\\n            if curr.right:\\n                stack.append((curr.right, ls+[curr.right.val]))\\n            if curr.left:\\n                stack.append((curr.left, ls+[curr.left.val]))\\n        return res"
		},
		{
			"lc_ans_id":"36802",
			"view":"3314",
			"top":"5",
			"title":"Short python solution",
			"vote":"13",
			"content":"    class Solution:\\n \\n    def pathSum(self, root, sum):\\n        if not root: return []\\n        if root.left == None and root.right == None:\\n            if sum == root.val: \\n                return [[root.val]]\\n            else: \\n                return []\\n        a = self.pathSum(root.left, sum - root.val) + \\\\\\n            self.pathSum(root.right, sum - root.val)\\n        return [[root.val] + i for i in a]"
		},
		{
			"lc_ans_id":"36899",
			"view":"3605",
			"top":"6",
			"title":"18 ms c++ recursive solution",
			"vote":"12",
			"content":"    vector<vector<int> > pathSum(TreeNode *root, int sum) {\\n            vector<vector<int> > result;\\n            vector<int> cur_path(0);\\n            pathSumRec(root, sum, result, cur_path);\\n            return result;\\n        }\\n        \\n        // pass the current path as a reference and remember to pop out the last added element\\n        // this improves the performance by 5 times\\n        void pathSumRec(TreeNode* root, int sum, vector<vector<int> >& result, vector<int>& cur_path) {\\n            if (root == NULL) {\\n                return;\\n            }\\n            \\n            if (root->val == sum && root->left == NULL && root->right == NULL) {\\n                cur_path.push_back(root->val);\\n                result.push_back(cur_path);\\n                cur_path.pop_back();\\n                return;\\n            }\\n            \\n            int sum_left = sum - root->val;\\n            cur_path.push_back(root->val);\\n            pathSumRec(root->left, sum_left, result, cur_path);\\n            //cur_path.pop_back();\\n            pathSumRec(root->right, sum_left, result, cur_path);\\n            cur_path.pop_back();\\n        }"
		},
		{
			"lc_ans_id":"36698",
			"view":"3045",
			"top":"7",
			"title":"Another accepted Java solution",
			"vote":"11",
			"content":"    public class Solution {\\n        public List<List<Integer>> pathSum(TreeNode root, int sum) {\\n            List<List<Integer>> res = new ArrayList<List<Integer>>();\\n            pathSum(root, sum, new ArrayList<Integer>(), res);\\n            return res;\\n        }\\n        \\n        void pathSum(TreeNode root, int sum, List<Integer> sol, List<List<Integer>> res) {\\n            if (root == null) {\\n                return;\\n            }\\n            \\n            sol.add(root.val);\\n            \\n            if (root.left == null && root.right == null && sum == root.val) {\\n                res.add(new ArrayList<Integer>(sol));\\n            } else {\\n                pathSum(root.left, sum - root.val, sol, res);\\n                pathSum(root.right, sum - root.val, sol, res);\\n            }\\n            \\n            sol.remove(sol.size() - 1);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"36824",
			"view":"1665",
			"top":"8",
			"title":"My simple java solution",
			"vote":"9",
			"content":"    private List<List<Integer>> result = new ArrayList<List<Integer>>();\\n    \\n    public List<List<Integer>> pathSum(TreeNode root, int sum) {\\n        helper(new ArrayList<Integer>(), root, sum);\\n        return result;\\n    }\\n    \\n    private void helper(List<Integer> list, TreeNode root, int sum) {\\n        if (root == null) return;\\n        list.add(root.val);\\n        sum -= root.val;\\n        if (root.left == null && root.right == null) {\\n            if (sum == 0) result.add(list);\\n            return;\\n        }\\n        helper(new ArrayList<Integer>(list), root.left, sum);\\n        helper(new ArrayList<Integer>(list), root.right, sum);\\n    }"
		},
		{
			"lc_ans_id":"36827",
			"view":"978",
			"top":"9",
			"title":"Python Solution: DFS",
			"vote":"8",
			"content":"    class Solution:\\n    # @param {TreeNode} root\\n    # @param {integer} sum\\n    # @return {integer[][]}\\n    def pathSum(self, root, sum):\\n        ans = []\\n        self.dfs(root, sum, [],ans)\\n        return ans\\n    \\n    def dfs(self, root, sum, tmp, ans):\\n        if not root:\\n            return\\n        \\n        if root.left == None and root.right == None and sum == root.val:\\n            ans.append(tmp+[root.val])\\n            return\\n        \\n        self.dfs(root.left, sum-root.val, tmp+[root.val], ans)\\n        self.dfs(root.right, sum-root.val, tmp+[root.val], ans)"
		}
	],
	"id":"113",
	"title":"Path Sum II",
	"content":"<p>\r\nGiven a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.\r\n</p>\r\n\r\nFor example:<br />\r\nGiven the below binary tree and <code>sum = 22</code>,\r\n<pre>\r\n              5\r\n             / \\\r\n            4   8\r\n           /   / \\\r\n          11  13  4\r\n         /  \\    / \\\r\n        7    2  5   1\r\n</pre>\r\n\r\n<p>\r\nreturn<br />\r\n<pre>\r\n[\r\n   [5,4,11,2],\r\n   [5,8,4,5]\r\n]\r\n</pre>\r\n</p>",
	"frequency":"274",
	"ac_num":"152426"
}