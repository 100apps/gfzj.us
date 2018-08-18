{
	"difficulty":"2",
	"submit_num":"38660",
	"show_id":"366",
	"leetcode_id":"366",
	"answers":[
		{
			"lc_ans_id":"83778",
			"view":"17627",
			"top":"0",
			"title":"10 lines simple Java solution using recursion with explanation",
			"vote":"124",
			"content":"    public class Solution {\\n        public List<List<Integer>> findLeaves(TreeNode root) {\\n            List<List<Integer>> res = new ArrayList<>();\\n            height(root, res);\\n            return res;\\n        }\\n        private int height(TreeNode node, List<List<Integer>> res){\\n            if(null==node)  return -1;\\n            int level = 1 + Math.max(height(node.left, res), height(node.right, res));\\n            if(res.size()<level+1)  res.add(new ArrayList<>());\\n            res.get(level).add(node.val);\\n            return level;\\n        }\\n    }\\nFor this question we need to take bottom-up approach. The key is to find the height of each node. Here the definition of height is:\\n<cite>The height of a node is the number of edges from the node to the deepest leaf. --[CMU 15-121 Binary Trees](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/trees.html)</cite>\\n\\nI used a helper function to return the height of current node. According to the definition, the height of leaf is 0. ```h(node) = 1 + max(h(node.left), h(node.right))```.\\nThe height of a node is also the its index in the result list (res). For example, leaves, whose heights are 0, are stored in res[0]. Once we find the height of a node, we can put it directly into the result.\\n\\nUPDATE:\\nThanks @adrianliu0729 for pointing out that my previous code does not actually remove leaves. I added one line ```node.left = node.right = null;``` to remove visited nodes\\n\\nUPDATE:\\nThere seems to be some debate over whether we need to actually \"remove\" leaves from the input tree. Anyway, it is just a matter of one line code. In the actual interview, just confirm with the interviewer whether removal is required."
		},
		{
			"lc_ans_id":"83775",
			"view":"5620",
			"top":"1",
			"title":"Java backtracking O(n) time O(n) space No hashing!",
			"vote":"29",
			"content":"The essential of problem is not to find the leaves, but group leaves of same level together and also to cut the tree. This is the exact role backtracking plays. The helper function returns the level which is the distance from its furthest subtree leaf to root, which helps to identify which group the root belongs to \\n\\n        public class Solution {\\n            public List<List<Integer>> findLeaves(TreeNode root) {\\n                List<List<Integer>> list = new ArrayList<>();\\n                findLeavesHelper(list, root);\\n                return list;\\n            }\\n            \\n      // return the level of root\\n            private int findLeavesHelper(List<List<Integer>> list, TreeNode root) {\\n                if (root == null) {\\n                    return -1;\\n                }\\n                int leftLevel = findLeavesHelper(list, root.left);\\n                int rightLevel = findLeavesHelper(list, root.right);\\n                int level = Math.max(leftLevel, rightLevel) + 1;\\n                if (list.size() == level) {\\n                    list.add(new ArrayList<>());\\n                }\\n                list.get(level).add(root.val);\\n                root.left = root.right = null;\\n                return level;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"83773",
			"view":"4280",
			"top":"2",
			"title":"1 ms Easy understand Java Solution",
			"vote":"20",
			"content":"\\n    public class Solution {\\n        public List<List<Integer>> findLeaves(TreeNode root) {\\n            \\n            List<List<Integer>> leavesList = new ArrayList< List<Integer>>();\\n            List<Integer> leaves = new ArrayList<Integer>();\\n            \\n            while(root != null) {\\n                if(isLeave(root, leaves)) root = null;\\n                leavesList.add(leaves);\\n                leaves = new ArrayList<Integer>();\\n            }\\n            return leavesList;\\n        }\\n        \\n        public boolean isLeave(TreeNode node, List<Integer> leaves) {\\n            \\n            if (node.left == null && node.right == null) {\\n                leaves.add(node.val);\\n                return true;\\n            }\\n            \\n            if (node.left != null) {\\n                 if(isLeave(node.left, leaves))  node.left = null;\\n            }\\n            \\n            if (node.right != null) {\\n                 if(isLeave(node.right, leaves)) node.right = null;\\n            }\\n            \\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83858",
			"view":"2796",
			"top":"3",
			"title":"C++ short easy understanding DFS solution",
			"vote":"18",
			"content":"    class Solution {\\n    private:\\n        int dfs(TreeNode* root, vector<vector<int>>& res){\\n            if(!root) return 0;\\n            int level = max(dfs(root->left, res), dfs(root->right, res)) + 1;\\n            if(level > (int)res.size()) res.push_back(vector<int>());\\n            res[level - 1].push_back(root->val);\\n            return level;\\n        }\\n    public:\\n        vector<vector<int>> findLeaves(TreeNode* root) {\\n            vector<vector<int>> res;\\n            dfs(root, res);\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"83815",
			"view":"2397",
			"top":"4",
			"title":"Simple Python solution using dict",
			"vote":"9",
			"content":"    class Solution(object):\\n        def findLeaves(self, root):\\n            def order(root, dic):\\n                if not root:\\n                    return 0\\n                left = order(root.left, dic)\\n                right = order(root.right, dic)\\n                lev = max(left, right) + 1\\n                dic[lev] += root.val,\\n                return lev\\n            dic, ret = collections.defaultdict(list), []\\n            order(root, dic)\\n            for i in range(1, len(dic) + 1):\\n                ret.append(dic[i])\\n            return ret"
		},
		{
			"lc_ans_id":"83851",
			"view":"816",
			"top":"5",
			"title":"Silly 3-liner...",
			"vote":"6",
			"content":"Do it for the two subtrees, combine their results, and add the root. Should be slow but got accepted in 52ms (fairly fast for Python).\\n\\n    def findLeaves(self, root):\\n        if not root: return []\\n        kids = map(self.findLeaves, (root.left, root.right))\\n        return map(lambda l, r: (l or []) + (r or []), *kids) + [[root.val]]"
		},
		{
			"lc_ans_id":"83811",
			"view":"1504",
			"top":"6",
			"title":"Simple Java recursive 1ms solution",
			"vote":"6",
			"content":"This is pretty straight forward but the general idea is to simply prune the leaves at each iteration of the while loop until the root itself is pruned.  We can do this using the x = change(x) paradigm for modifying a tree.  Whenever we come across a leaf node, we know we must add it to our result but then we prune it by just returning null. \\n\\n    public class Solution {\\n        private TreeNode removeLeaves(TreeNode root, List<Integer> result)\\n        {\\n            if (root == null) return null;\\n            if (root.left == null && root.right == null)\\n            {\\n                result.add(root.val);\\n                return null;\\n            }\\n            \\n            root.left = removeLeaves(root.left, result);\\n            root.right = removeLeaves(root.right, result);\\n            return root;\\n        }\\n        \\n        public List<List<Integer>> findLeaves(TreeNode root) {\\n            List<List<Integer>> results = new ArrayList<List<Integer>>();\\n            if (root == null) return results;\\n            \\n            while (root != null)\\n            {\\n                List<Integer> leaves = new ArrayList<Integer>();\\n                root = removeLeaves(root, leaves);\\n                results.add(leaves);\\n            }\\n            \\n            return results;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83849",
			"view":"549",
			"top":"7",
			"title":"Easy python solution explained",
			"vote":"4",
			"content":"When each node is visited, mark the value of the node as '#', which is treated as if the node is None in tree iteration. Each iteration gives a one level of leaves.\\n\\n\\n    class Solution(object):\\n        def findLeaves(self, root):\\n            def markLeaves(p, l):\\n                leaf = True\\n                if p.left and p.left.val!='#':\\n                    leaf = False\\n                    markLeaves(p.left, l)\\n                if p.right and p.right.val!='#':\\n                    leaf = False\\n                    markLeaves(p.right, l)\\n                if leaf:\\n                    l.append(p.val)\\n                    p.val = '#'\\n                    \\n            ret = []\\n            p = root\\n            while(p and p.val!='#'):\\n                l = []\\n                markLeaves(p, l)\\n                ret.append(l)\\n                p = root\\n            return ret"
		},
		{
			"lc_ans_id":"83808",
			"view":"793",
			"top":"8",
			"title":"Python solution that actually remove the leaves from the tree",
			"vote":"3",
			"content":"I thought we need to actually remove all the leaves so that's what my code below does. \\nAccording to other's solutions it looks like we don't need to remove the leaves from the tree but only group leaves by level.  \\nAnyway, I'm posting my code for actually removing leaves from the tree level by level using DFS. its time complexity is higher than others' solution but still PASS the the OJ. \\n\\n    class Solution(object):\\n        \\n        def findLeaves(self, root):\\n            \"\"\"\\n            :type root: TreeNode\\n            :rtype: List[List[int]]\\n            \"\"\"\\n            \\n            if not root:\\n                return []\\n            result=[]\\n            while root:\\n                curLeaves = []\\n                root = self._findLeaves(root, curLeaves)\\n                \\n                result.append(curLeaves)\\n            \\n            return result \\n    \\n        def _findLeaves(self, root, curLeaves):\\n            if not root:\\n                return None\\n            if not root.left and not root.right:\\n                curLeaves.append(root.val)\\n                return None\\n            else:\\n                root.left = self._findLeaves(root.left, curLeaves)\\n                root.right = self._findLeaves(root.right, curLeaves)\\n                return root"
		},
		{
			"lc_ans_id":"83871",
			"view":"661",
			"top":"9",
			"title":"Java Solution, similar to BFS Topological sort",
			"vote":"3",
			"content":"We delete nodes layer by layer: for each round,we delete the nodes whose outdegree=0, and update their parent's outdegree. It's very similar similar with what we did in Topological Sort(in TopoSort,each round we delete those whose indegree=1 and iterate)\\n\\nUse two HashMap, one for recording the outdegree of each TreeNode, and one for recording the parent of each TreeNode; first traverse the tree and load the maps, and then put those whose outdegree=0 into a Deque and iterate until running out of nodes.\\n\\n    import java.util.LinkedHashMap;\\n\\n     public class Solution{\\n\\tpublic List<List<Integer>> findLeaves(TreeNode root){\\n\\t\\t List<List<Integer>> res=new ArrayList<>();\\n\\n\\t\\t//record outdegree of every node\\n\\t\\tHashMap<TreeNode,Integer> outdegree=new LinkedHashMap<TreeNode,Integer>();\\n\\t\\t//record parent of every node\\n\\t\\tHashMap<TreeNode,TreeNode> parent=new HashMap<TreeNode,TreeNode>();\\n\\t\\tloadMap(root,outdegree,parent);\\n\\n\\t\\tDeque<TreeNode> q=new LinkedList<TreeNode>();\\n\\t\\tfor(TreeNode node:outdegree.keySet()){\\n\\t\\t\\tif(outdegree.get(node)==0){\\n\\t\\t\\t\\tq.offer(node);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\twhile(!q.isEmpty()){\\n\\t\\t\\tint size=q.size();\\n\\t\\t\\tList<Integer> tmp=new ArrayList<Integer>();\\n\\t\\t\\tfor(int i=0;i<size;i++){\\n\\t\\t\\t\\tTreeNode t=q.poll();\\n\\t\\t\\t\\ttmp.add(t.val);\\n\\t\\t\\t\\tif(t!=root){\\n\\t\\t\\t\\t\\toutdegree.put(parent.get(t),outdegree.get(parent.get(t))-1);\\n\\t\\t\\t\\t\\tif(outdegree.get(parent.get(t))==0){\\n\\t\\t\\t\\t\\t\\tq.offer(parent.get(t));\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\tres.add(tmp);\\n\\t\\t}\\n\\n\\t\\treturn res;\\n\\t}\\n\\n\\tpublic void loadMap(TreeNode root,HashMap<TreeNode,Integer> outdegree,HashMap<TreeNode,TreeNode> parent){\\n\\t\\tif(root==null){\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\t\\tif(root.left==null&&root.right==null){\\n\\t\\t\\toutdegree.put(root,0);\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\n\\t\\tint degree=0;\\n\\t\\tif(root.left!=null){\\n\\t\\t\\tdegree++;\\n\\t\\t\\tparent.put(root.left,root);\\n\\t\\t}\\n\\t\\tif(root.right!=null){\\n\\t\\t\\tdegree++;\\n\\t\\t\\tparent.put(root.right,root);\\n\\t\\t}\\n\\t\\toutdegree.put(root,degree);\\n\\t\\t\\n\\t\\tloadMap(root.left,outdegree,parent);\\n\\t\\tloadMap(root.right,outdegree,parent);\\n\\t}\\n}"
		}
	],
	"id":"366",
	"title":"Find Leaves of Binary Tree",
	"content":"<p>Given a binary tree, collect a tree's nodes as if you were doing this: Collect and remove all leaves, repeat until the tree is empty.\r\n</p>\r\n\r\n<p>\r\n<b>Example:</b><br />\r\nGiven binary tree <br />\r\n<pre>\r\n          1\r\n         / \\\r\n        2   3\r\n       / \\     \r\n      4   5    \r\n</pre>\r\n</p>\r\n<p>\r\nReturns <code>[4, 5, 3], [2], [1]</code>.\r\n</p>\r\n\r\n<p>\r\n<b>Explanation:</b><br />\r\n<p>\r\n1. Removing the leaves <code>[4, 5, 3]</code> would result in this tree:\r\n<pre>\r\n          1\r\n         / \r\n        2          \r\n</pre>\r\n</p>\r\n<p>\r\n2. Now removing the leaf <code>[2]</code> would result in this tree:\r\n<pre>\r\n          1          \r\n</pre>\r\n</p>\r\n<p>\r\n3. Now removing the leaf <code>[1]</code> would result in the empty tree:\r\n<pre>\r\n          []         \r\n</pre>\r\n</p>\r\n</p>\r\n<p>\r\nReturns <code>[4, 5, 3], [2], [1]</code>.\r\n<p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://discuss.leetcode.com/user/elmirap\">@elmirap</a> for adding this problem and creating all test cases.</p>",
	"frequency":"154",
	"ac_num":"23527"
}