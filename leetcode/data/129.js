{
	"difficulty":"2",
	"submit_num":"341681",
	"show_id":"129",
	"leetcode_id":"129",
	"answers":[
		{
			"lc_ans_id":"41363",
			"view":"17235",
			"top":"0",
			"title":"Short Java solution. Recursion.",
			"vote":"120",
			"content":"\\x01I use recursive solution to solve the problem.\\n\\n    public int sumNumbers(TreeNode root) {\\n\\t\\treturn sum(root, 0);\\n\\t}\\n\\t\\n\\tpublic int sum(TreeNode n, int s){\\n\\t\\tif (n == null) return 0;\\n\\t\\tif (n.right == null && n.left == null) return s*10 + n.val;\\n\\t\\treturn sum(n.left, s*10 + n.val) + sum(n.right, s*10 + n.val);\\n\\t}"
		},
		{
			"lc_ans_id":"41400",
			"view":"13415",
			"top":"1",
			"title":"Can you improve this algorithm?",
			"vote":"54",
			"content":"    /**\\n     * Definition for binary tree\\n     * public class TreeNode {\\n     *     int val;\\n     *     TreeNode left;\\n     *     TreeNode right;\\n     *     TreeNode(int x) { val = x; }\\n     * }\\n     */\\n    public class Solution {\\n        public int sumNumbers(TreeNode root) {\\n            if (root == null)\\n                return 0;\\n            return sumR(root, 0);\\n        }\\n        public int sumR(TreeNode root, int x) {\\n            if (root.right == null && root.left == null)\\n                return 10 * x + root.val;\\n            int val = 0;\\n            if (root.left != null)\\n                val += sumR(root.left, 10 * x + root.val);\\n            if (root.right != null)\\n                val += sumR(root.right, 10 * x + root.val);\\n            return val;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"41603",
			"view":"4556",
			"top":"2",
			"title":"One of the easier solution using preorder traversal (recursion)",
			"vote":"23",
			"content":"**The idea is to do a preorder traversal of the tree. In the preorder traversal, keep track of the value calculated till the current node, let this value be val. For every node, we update the val as val*10 plus node\\u2019s data.**\\n\\n\\n    /**\\n     * Definition for binary tree\\n     * struct TreeNode {\\n     *     int val;\\n     *     TreeNode *left;\\n     *     TreeNode *right;\\n     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\\n     * };\\n     */\\n    class Solution {\\n    public:\\n        int sumNumbers(TreeNode *root) {\\n           return  sumNumberUtil(root,0);\\n            \\n        }\\n        // preorder\\n        int sumNumberUtil(struct TreeNode* node, int val)\\n        {\\n            if(node==NULL)\\n            return 0;\\n            \\n            val= val*10+node->val;\\n            if(node->left==NULL && node->right==NULL)\\n            {\\n                return val;\\n            }\\n            \\n            return sumNumberUtil(node->left,val)+sumNumberUtil(node->right, val);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"41383",
			"view":"3613",
			"top":"3",
			"title":"Python solutions (dfs+stack, bfs+queue, dfs recursively).",
			"vote":"21",
			"content":"        \\n    # dfs + stack\\n    def sumNumbers1(self, root):\\n        if not root:\\n            return 0\\n        stack, res = [(root, root.val)], 0\\n        while stack:\\n            node, value = stack.pop()\\n            if node:\\n                if not node.left and not node.right:\\n                    res += value\\n                if node.right:\\n                    stack.append((node.right, value*10+node.right.val))\\n                if node.left:\\n                    stack.append((node.left, value*10+node.left.val))\\n        return res\\n        \\n    # bfs + queue\\n    def sumNumbers2(self, root):\\n        if not root:\\n            return 0\\n        queue, res = collections.deque([(root, root.val)]), 0\\n        while queue:\\n            node, value = queue.popleft()\\n            if node:\\n                if not node.left and not node.right:\\n                    res += value\\n                if node.left:\\n                    queue.append((node.left, value*10+node.left.val))\\n                if node.right:\\n                    queue.append((node.right, value*10+node.right.val))\\n        return res\\n        \\n    # recursively \\n    def sumNumbers(self, root):\\n        self.res = 0\\n        self.dfs(root, 0)\\n        return self.res\\n        \\n    def dfs(self, root, value):\\n        if root:\\n            #if not root.left and not root.right:\\n            #    self.res += value*10 + root.val\\n            self.dfs(root.left, value*10+root.val)\\n            #if not root.left and not root.right:\\n            #    self.res += value*10 + root.val\\n            self.dfs(root.right, value*10+root.val)\\n            if not root.left and not root.right:\\n                self.res += value*10 + root.val"
		},
		{
			"lc_ans_id":"41531",
			"view":"4355",
			"top":"4",
			"title":"Clean Java DFS solution (preorder traversal)",
			"vote":"20",
			"content":"    public class Solution {\\n        int total;\\n        \\n        public int sumNumbers(TreeNode root) {\\n            total = 0;\\n            helper(root, 0);\\n            return total;\\n        }\\n        \\n        void helper(TreeNode root, int sum) {\\n            if (root == null) return;\\n            \\n            sum = sum * 10 + root.val;\\n            \\n            if (root.left == null && root.right == null) {\\n                total += sum;\\n                return;\\n            }\\n            \\n            helper(root.left, sum);\\n            helper(root.right, sum);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"41367",
			"view":"3028",
			"top":"5",
			"title":"Non-recursive preorder traverse Java solution",
			"vote":"17",
			"content":"    \\n    public class Solution {\\n            public int sumNumbers(TreeNode root) {\\n                if(root==null){\\n                    return 0;\\n                }\\n                int sum = 0;\\n                TreeNode curr;\\n                Stack<TreeNode> ws = new Stack<TreeNode>();\\n                ws.push(root);\\n                \\n                while(!ws.empty()){\\n                    curr = ws.pop();\\n                    \\n                    if(curr.right!=null){\\n                        curr.right.val = curr.val*10+curr.right.val;\\n                        ws.push(curr.right);\\n                    }\\n                    \\n                    if(curr.left!=null){\\n                        curr.left.val = curr.val*10+curr.left.val;\\n                        ws.push(curr.left);\\n                    }\\n                    \\n                    if(curr.left==null && curr.right==null){ // leaf node\\n                        sum+=curr.val;\\n                    }\\n                }\\n                return sum;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"41513",
			"view":"1208",
			"top":"6",
			"title":"Super simple, DFS Solution",
			"vote":"12",
			"content":"    public class Solution {\\n        public int sumNumbers(TreeNode root) {\\n            return sumNumbers(root, 0);\\n        }\\n        \\n        private int sumNumbers(TreeNode root, int sum){\\n            if(root == null) return 0;\\n            if(root.left == null && root.right == null)\\n                return sum + root.val;\\n            \\n            return sumNumbers(root.left, (sum + root.val) * 10) + sumNumbers(root.right, (sum + root.val) * 10);\\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"41566",
			"view":"1656",
			"top":"7",
			"title":"5 ms C++ code using DFS",
			"vote":"9",
			"content":"    class Solution {\\n    public:\\n        int sumNumbers(TreeNode *root) {\\n            if(!root)\\n                return 0;\\n            sum=0;\\n            DFS(root, 0);\\n            return sum;\\n        }\\n        \\n        void DFS(TreeNode *&node, int currentSum)\\n        {\\n            currentSum=currentSum*10+node->val;\\n            if(!node->left&&!node->right)\\n                sum+=currentSum;\\n            if(node->left)\\n                DFS(node->left, currentSum);\\n            if(node->right)\\n                DFS(node->right, currentSum);\\n        }\\n    private:\\n        int sum;\\n    };"
		},
		{
			"lc_ans_id":"41452",
			"view":"1307",
			"top":"8",
			"title":"Iterative C++ solution using stack (similar to postorder traversal)",
			"vote":"6",
			"content":"Iterative C++ solution using postorder traversal to treat the nodes \\n\\n\\n\\n    /**\\n     * Definition for a binary tree node.\\n     * struct TreeNode {\\n     *     int val;\\n     *     TreeNode *left;\\n     *     TreeNode *right;\\n     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\\n     * };\\n     */\\n    class Solution {\\n    public:\\n        int sumNumbers(TreeNode* root) {\\n            \\n            stack<TreeNode*> nodes;\\n            if (!root)\\n             return 0;\\n             \\n            int total = 0;\\n            int current = 0;\\n            TreeNode* last = nullptr;\\n            while (root || !nodes.empty())\\n            {\\n                if (root)\\n                {\\n                    nodes.push(root);\\n                    current *= 10;\\n                    current += root->val;\\n                    root = root->left;\\n                }\\n                else \\n                {\\n                    root = nodes.top();\\n                    if (root->right && root->right != last)\\n                    {\\n                        root = root->right;\\n                    }\\n                    else \\n                    {\\n                         nodes.pop();\\n                         last = root;\\n                         // only add sum of leaf node\\n                         if (root->right == nullptr && root->left == nullptr)\\n                            total += current;\\n                         current /= 10;\\n                         root = nullptr;\\n                    }\\n                }\\n              }\\n            \\n             return total;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"41464",
			"view":"579",
			"top":"9",
			"title":"Share my Java Solution",
			"vote":"5",
			"content":"    public int sumNumbers(TreeNode root) {\\n        return dfs(root, 0);    \\n    }\\n    private int dfs(TreeNode root, int num){\\n        if(root==null){\\n            return 0;\\n        }\\n        \\n        num = num*10 + root.val;\\n        if(root.left == null && root.right == null) return num;\\n        \\n        return dfs(root.left, num) + dfs(root.right,num);\\n    }"
		}
	],
	"id":"129",
	"title":"Sum Root to Leaf Numbers",
	"content":"<p>Given a binary tree containing digits from <code>0-9</code> only, each root-to-leaf path could represent a number.</p>\r\n<p>An example is the root-to-leaf path <code>1->2->3</code> which represents the number <code>123</code>.</p>\r\n\r\n<p>Find the total sum of all root-to-leaf numbers.</p>\r\n\r\n<p>For example,\r\n<pre>\r\n    1\r\n   / \\\r\n  2   3\r\n</pre>\r\n</p>\r\n<p>\r\nThe root-to-leaf path <code>1->2</code> represents the number <code>12</code>.<br />\r\nThe root-to-leaf path <code>1->3</code> represents the number <code>13</code>.\r\n</p>\r\n<p>\r\nReturn the sum = 12 + 13 = <code>25</code>.\r\n</p>",
	"frequency":"243",
	"ac_num":"127972"
}