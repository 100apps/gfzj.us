{
	"difficulty":"2",
	"submit_num":"237593",
	"show_id":"199",
	"leetcode_id":"199",
	"answers":[
		{
			"lc_ans_id":"56012",
			"view":"32012",
			"top":"0",
			"title":"My simple accepted solution(JAVA)",
			"vote":"294",
			"content":"The core idea of this algorithm: \\n\\n1.Each depth of the tree only select one node.  \\n2. View depth is current size of result list.\\n\\nHere is the code:\\n\\n    public class Solution {\\n        public List<Integer> rightSideView(TreeNode root) {\\n            List<Integer> result = new ArrayList<Integer>();\\n            rightView(root, result, 0);\\n            return result;\\n        }\\n        \\n        public void rightView(TreeNode curr, List<Integer> result, int currDepth){\\n            if(curr == null){\\n                return;\\n            }\\n            if(currDepth == result.size()){\\n                result.add(curr.val);\\n            }\\n            \\n            rightView(curr.right, result, currDepth + 1);\\n            rightView(curr.left, result, currDepth + 1);\\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"56003",
			"view":"10127",
			"top":"1",
			"title":"My C++ solution, modified preorder traversal",
			"vote":"91",
			"content":"    class Solution {\\n    public:\\n        void recursion(TreeNode *root, int level, vector<int> &res)\\n        {\\n            if(root==NULL) return ;\\n            if(res.size()<level) res.push_back(root->val);\\n            recursion(root->right, level+1, res);\\n            recursion(root->left, level+1, res);\\n        }\\n        \\n        vector<int> rightSideView(TreeNode *root) {\\n            vector<int> res;\\n            recursion(root, 1, res);\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"56076",
			"view":"11023",
			"top":"2",
			"title":"Reverse Level Order Traversal, java",
			"vote":"70",
			"content":"    public class Solution {\\n        public List<Integer> rightSideView(TreeNode root) {\\n            // reverse level traversal\\n            List<Integer> result = new ArrayList();\\n            Queue<TreeNode> queue = new LinkedList();\\n            if (root == null) return result;\\n            \\n            queue.offer(root);\\n            while (queue.size() != 0) {\\n                int size = queue.size();\\n                for (int i=0; i<size; i++) {\\n                    TreeNode cur = queue.poll();\\n                    if (i == 0) result.add(cur.val);\\n                    if (cur.right != null) queue.offer(cur.right);\\n                    if (cur.left != null) queue.offer(cur.left);\\n                }\\n                \\n            }\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"56203",
			"view":"4445",
			"top":"3",
			"title":"Simple C++ solution (BTW: I like clean codes)",
			"vote":"30",
			"content":"    class Solution {\\n    public:\\n        void dfs(TreeNode* root, int lv, vector<int> &res){\\n            if(!root)   return;\\n            if(lv>=res.size()) res.push_back(root->val);\\n            dfs(root->right,lv+1,res);\\n            dfs(root->left,lv+1,res);\\n        }\\n\\n        vector<int> rightSideView(TreeNode* root) {\\n            vector<int> res;\\n            dfs(root, 0, res);\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"56064",
			"view":"3742",
			"top":"4",
			"title":"5-9 Lines Python, 48+ ms",
			"vote":"23",
			"content":"Solution 1: **Recursive, combine right and left:** 5 lines, 56 ms\\n\\nCompute the right view of both right and left left subtree, then combine them. For very unbalanced trees, this can be O(n^2), though.\\n\\n    def rightSideView(self, root):\\n        if not root:\\n            return []\\n        right = self.rightSideView(root.right)\\n        left = self.rightSideView(root.left)\\n        return [root.val] + right + left[len(right):]\\n\\n---\\n\\nSolution 2: **Recursive, first come first serve:** 9 lines, 48 ms\\n\\nDFS-traverse the tree right-to-left, add values to the view whenever we first reach a new record depth. This is O(n).\\n\\n    def rightSideView(self, root):\\n        def collect(node, depth):\\n            if node:\\n                if depth == len(view):\\n                    view.append(node.val)\\n                collect(node.right, depth+1)\\n                collect(node.left, depth+1)\\n        view = []\\n        collect(root, 0)\\n        return view\\n\\n---\\n\\nSolution 3: **Iterative, level-by-level:** 7 lines, 48 ms\\n\\nTraverse the tree level by level and add the last value of each level to the view. This is O(n).\\n\\n    def rightSideView(self, root):\\n        view = []\\n        if root:\\n            level = [root]\\n            while level:\\n                view += level[-1].val,\\n                level = [kid for node in level for kid in (node.left, node.right) if kid]\\n        return view"
		},
		{
			"lc_ans_id":"56178",
			"view":"2784",
			"top":"5",
			"title":"Simple Java solution w/ recursion (2ms)",
			"vote":"21",
			"content":"    public class Solution {\\n        public List<Integer> rightSideView(TreeNode root) {\\n            ArrayList list = new ArrayList();\\n            rightSideView(root, 0, list);\\n            \\n            return list;\\n        }\\n        \\n        public void rightSideView(TreeNode root, int level, ArrayList list) {\\n            if(root == null) return;\\n\\n            if(list.size() == level)\\n                list.add(root.val);\\n\\n            rightSideView(root.right, level + 1, list);\\n            rightSideView(root.left, level + 1, list);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"56062",
			"view":"2392",
			"top":"6",
			"title":"Java Solution using Divide and Conquer",
			"vote":"21",
			"content":"    public List<Integer> rightSideView(TreeNode root) {\\n        if(root==null)\\n            return new ArrayList<Integer>();\\n        List<Integer> left = rightSideView(root.left);\\n        List<Integer> right = rightSideView(root.right);\\n        List<Integer> re = new ArrayList<Integer>();\\n        re.add(root.val);\\n        for(int i=0;i<Math.max(left.size(), right.size());i++){\\n            if(i>=right.size())\\n                re.add(left.get(i));\\n            else\\n                re.add(right.get(i));\\n        }\\n        return re;\\n    }"
		},
		{
			"lc_ans_id":"56230",
			"view":"2147",
			"top":"7",
			"title":"Share my Java iterative solution, based on level order traversal",
			"vote":"18",
			"content":"    public class Solution {\\n        public List<Integer> rightSideView(TreeNode root) {\\n            List<Integer> ret = new ArrayList<Integer>();\\n            if(root == null) return ret;\\n            Queue<TreeNode> q = new LinkedList<TreeNode>();\\n            q.offer(root);\\n            while(!q.isEmpty()){\\n                int cnt = q.size();\\n                for(int i = 0;i < cnt;i++){\\n                    TreeNode cur = q.poll();\\n                    if(i == cnt-1){\\n                        ret.add(cur.val);\\n                    }\\n                    if(cur.left != null){\\n                        q.offer(cur.left);\\n                    } \\n                    if(cur.right != null){\\n                        q.offer(cur.right);\\n                    } \\n                }\\n            }\\n            return ret;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"56142",
			"view":"2156",
			"top":"8",
			"title":"9ms C++ BFS, O(n) time, concise with explanation",
			"vote":"12",
			"content":"**9ms C++ iterative, concise code with explanation**\\n\\nUsing a queue **mQ** to perform level order traversal. In the beginning of a level traversal, the last element is pushed into result array **ret**. The core idea is similar with [Binary Tree Level Order Traversal][1]\\n\\nO(n) time, O(logn) space\\n\\n    class Solution {\\n    public:\\n        vector<int> rightSideView(TreeNode *root) {\\n            queue<TreeNode*>mQ;\\n            vector<int> ret;\\n            if(!root)return ret;\\n            mQ.push(root);\\n            while(!mQ.empty()){\\n                ret.push_back(mQ.back()->val);\\n                for(int i=mQ.size();i>0;i--){\\n                    TreeNode *tn=mQ.front();\\n                    mQ.pop();\\n                    if(tn->left)mQ.push(tn->left);\\n                    if(tn->right)mQ.push(tn->right);\\n                }\\n            }\\n            return ret;\\n        }\\n    };\\n\\n\\n  [1]: https://leetcode.com/problems/binary-tree-level-order-traversal/"
		},
		{
			"lc_ans_id":"56167",
			"view":"866",
			"top":"9",
			"title":"DFS solution better than 90% solutions!",
			"vote":"10",
			"content":"    /**\\n     * Definition for a binary tree node.\\n     * public class TreeNode {\\n     *     int val;\\n     *     TreeNode left;\\n     *     TreeNode right;\\n     *     TreeNode(int x) { val = x; }\\n     * }\\n     */\\n    public class Solution {\\n        public List<Integer> rightSideView(TreeNode root) {\\n            List<Integer> res = new ArrayList<Integer>();\\n            if (root == null){\\n                return res;\\n            }\\n            dfs (root, res, 0);\\n            return res;\\n        }\\n        \\n        public void dfs (TreeNode root, List<Integer> res, int level){\\n            if (root == null){\\n                return;\\n            }\\n            if (res.size() == level){\\n                res.add (root.val);\\n            }\\n            if (root.right != null){\\n                dfs (root.right, res, level + 1);\\n            }\\n            if (root.left != null){\\n                dfs (root.left, res, level + 1);\\n            }\\n        }\\n    }"
		}
	],
	"id":"199",
	"title":"Binary Tree Right Side View",
	"content":"<p>Given a binary tree, imagine yourself standing on the <i>right</i> side of it, return the values of the nodes you can see ordered from top to bottom.</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven the following binary tree,<br />\r\n<pre>\r\n   1            <---\r\n /   \\\r\n2     3         <---\r\n \\     \\\r\n  5     4       <---\r\n</pre>\r\n</p>\r\n<p>\r\nYou should return <code>[1, 3, 4]</code>.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/amrsaqr\">@amrsaqr</a> for adding this problem and creating all test cases.</p>",
	"frequency":"348",
	"ac_num":"100011"
}