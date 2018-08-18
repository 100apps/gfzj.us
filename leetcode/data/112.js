{
	"difficulty":"1",
	"submit_num":"574815",
	"show_id":"112",
	"leetcode_id":"112",
	"answers":[
		{
			"lc_ans_id":"36378",
			"view":"28737",
			"top":"0",
			"title":"[Accepted]My recursive solution in Java",
			"vote":"164",
			"content":"The basic idea is to subtract the value of current node from sum until it reaches a leaf node and the subtraction equals 0, then we know that we got a hit. Otherwise the subtraction at the end could not be 0.\\n\\n    public class Solution {\\n        public boolean hasPathSum(TreeNode root, int sum) {\\n            if(root == null) return false;\\n        \\n            if(root.left == null && root.right == null && sum - root.val == 0) return true;\\n        \\n            return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"36367",
			"view":"13707",
			"top":"1",
			"title":"3 lines of  c++ solution",
			"vote":"79",
			"content":"    bool hasPathSum(TreeNode *root, int sum) {\\n            if (root == NULL) return false;\\n            if (root->val == sum && root->left ==  NULL && root->right == NULL) return true;\\n            return hasPathSum(root->left, sum-root->val) || hasPathSum(root->right, sum-root->val);\\n        }"
		},
		{
			"lc_ans_id":"36360",
			"view":"6103",
			"top":"2",
			"title":"Short Python recursive solution - O(n)",
			"vote":"44",
			"content":"    # Definition for a  binary tree node\\n    # class TreeNode:\\n    #     def __init__(self, x):\\n    #         self.val = x\\n    #         self.left = None\\n    #         self.right = None\\n    \\n    class Solution:\\n        # @param root, a tree node\\n        # @param sum, an integer\\n        # @return a boolean\\n        # 1:27\\n        def hasPathSum(self, root, sum):\\n            if not root:\\n                return False\\n    \\n            if not root.left and not root.right and root.val == sum:\\n                return True\\n            \\n            sum -= root.val\\n    \\n            return self.hasPathSum(root.left, sum) or self.hasPathSum(root.right, sum)"
		},
		{
			"lc_ans_id":"36382",
			"view":"10918",
			"top":"3",
			"title":"[Accepted] By using postorder traversal",
			"vote":"43",
			"content":"In the postorder traversal, the node will be removed from the stack only when the right sub-tree has been visited.so the path will be stored in the stack. we can keep check the SUM, the length from root to leaf node.\\nat leaf node, if SUM == sum, OK, return true. After postorder traversal, return false.\\n\\nI have compared this solution with recursion solutions. In the leetcode OJ, the run time of two solutions is very near.\\n\\nbelow is my iterator code.\\n\\n\\n    class Solution {\\n    public:\\n        bool hasPathSum(TreeNode *root, int sum) {\\n            stack<TreeNode *> s;\\n            TreeNode *pre = NULL, *cur = root;\\n            int SUM = 0;\\n            while (cur || !s.empty()) {\\n                while (cur) {\\n                    s.push(cur);\\n                    SUM += cur->val;\\n                    cur = cur->left;\\n                }\\n                cur = s.top();\\n                if (cur->left == NULL && cur->right == NULL && SUM == sum) {\\n                    return true;\\n                }\\n                if (cur->right && pre != cur->right) {\\n                    cur = cur->right;\\n                } else {\\n                    pre = cur;\\n                    s.pop();\\n                    SUM -= cur->val;\\n                    cur = NULL;\\n                }\\n            }\\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"36370",
			"view":"6101",
			"top":"4",
			"title":"A Java Concise solution",
			"vote":"23",
			"content":"    public boolean hasPathSum(TreeNode root, int sum) {\\n       if(root == null){\\n\\t     return false;\\n\\t   }\\n       if(root.left == null && root.right == null){\\n\\t      return (root.val == sum);\\n\\t   }\\n\\t   return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);\\n       \\t   \\n    }"
		},
		{
			"lc_ans_id":"36534",
			"view":"3056",
			"top":"5",
			"title":"My java no-recursive method",
			"vote":"20",
			"content":"the idea is preorder traverse , instead of using recursive call, I am using a stack.\\nthe only problem is that I changed TreeNode value\\n\\n    public boolean hasPathSum(TreeNode root, int sum) {\\n    \\t    Stack <TreeNode> stack = new Stack<> ();\\t    \\n    \\t    stack.push(root) ;\\t    \\n    \\t    while (!stack.isEmpty() && root != null){\\n    \\t    \\tTreeNode cur = stack.pop() ;\\t\\n    \\t    \\tif (cur.left == null && cur.right == null){\\t    \\t\\t\\n    \\t    \\t\\tif (cur.val == sum ) return true ;\\n    \\t    \\t}\\n    \\t    \\tif (cur.right != null) {\\n    \\t    \\t\\tcur.right.val = cur.val + cur.right.val ;\\n    \\t    \\t\\tstack.push(cur.right) ;\\n    \\t    \\t}\\n    \\t    \\tif (cur.left != null) {\\n    \\t    \\t\\tcur.left.val = cur.val + cur.left.val;\\n    \\t    \\t\\tstack.push(cur.left);\\n    \\t    \\t}\\n    \\t    }\\t    \\n    \\t    return false ;\\n    \\t }"
		},
		{
			"lc_ans_id":"36372",
			"view":"1720",
			"top":"6",
			"title":"Easy, 5 Lines and Clean Java Solution",
			"vote":"18",
			"content":"   You simply check if current node (starting with root) is a leaf node and sum is equal its value. If not, you just check left or right with the decremented sum. If one of them returns true, it has a path.\\n\\n    public boolean hasPathSum(TreeNode root, int sum) {    \\n      if (root == null)\\n         return false;\\n            \\n      if (root.left == null && root.right == null && root.val == sum) // Leaf check\\n         return true;\\n            \\n      return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);\\n    }"
		},
		{
			"lc_ans_id":"36486",
			"view":"2137",
			"top":"7",
			"title":"Python solutions (DFS recursively, DFS+stack, BFS+queue)",
			"vote":"16",
			"content":"    # DFS Recursively \\n    def hasPathSum1(self, root, sum):\\n        res = []\\n        self.dfs(root, sum, res)\\n        return any(res)\\n        \\n    def dfs(self, root, target, res):\\n        if root:\\n            if not root.left and not root.right:\\n                if root.val == target:\\n                    res.append(True)\\n            if root.left:\\n                self.dfs(root.left, target-root.val, res)\\n            if root.right:\\n                self.dfs(root.right, target-root.val, res)\\n    \\n    # DFS with stack\\n    def hasPathSum2(self, root, sum):\\n        if not root:\\n            return False\\n        stack = [(root, root.val)]\\n        while stack:\\n            curr, val = stack.pop()\\n            if not curr.left and not curr.right:\\n                if val == sum:\\n                    return True\\n            if curr.right:\\n                stack.append((curr.right, val+curr.right.val))\\n            if curr.left:\\n                stack.append((curr.left, val+curr.left.val))\\n        return False\\n        \\n    # BFS with queue\\n    def hasPathSum(self, root, sum):\\n        if not root:\\n            return False\\n        queue = [(root, sum-root.val)]\\n        while queue:\\n            curr, val = queue.pop(0)\\n            if not curr.left and not curr.right:\\n                if val == 0:\\n                    return True\\n            if curr.left:\\n                queue.append((curr.left, val-curr.left.val))\\n            if curr.right:\\n                queue.append((curr.right, val-curr.right.val))\\n        return False"
		},
		{
			"lc_ans_id":"36436",
			"view":"1761",
			"top":"8",
			"title":"Why is the output of \"{1, 2}, 1\" is false?",
			"vote":"14",
			"content":"       1\\n2            *\\n\\nThe struct is like above, and the sum of  right path is 1. Why the output is false?\\n\\nAdditional:\\n\\nFind another problem: the output of \"{1}, 1\" is true......\\n\\nwhy....."
		},
		{
			"lc_ans_id":"36580",
			"view":"1280",
			"top":"9",
			"title":"Java solution, both recursion and iteration",
			"vote":"12",
			"content":"  \\n    public boolean hasPathSum(TreeNode root, int sum) {\\n        // iteration method\\n        if (root == null) {return false;}\\n        Stack<TreeNode> path = new Stack<>();\\n        Stack<Integer> sub = new Stack<>();\\n        path.push(root);\\n        sub.push(root.val);\\n        while (!path.isEmpty()) {\\n            TreeNode temp = path.pop();\\n            int tempVal = sub.pop();\\n            if (temp.left == null && temp.right == null) {if (tempVal == sum) return true;}\\n            else {\\n                if (temp.left != null) {\\n                    path.push(temp.left);\\n                    sub.push(temp.left.val + tempVal);\\n                }\\n                if (temp.right != null) {\\n                    path.push(temp.right);\\n                    sub.push(temp.right.val + tempVal);\\n                }\\n            }\\n        }\\n        return false;\\n    }\\n\\n\\n----------\\n\\n    public boolean hasPathSum(TreeNode root, int sum) {\\n        // recursion method\\n        if (root == null) return false;\\n        if (root.left == null && root.right == null && root.val == sum) return true;\\n        return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);\\n    }"
		}
	],
	"id":"112",
	"title":"Path Sum",
	"content":"<p>Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.</p>\r\n\r\n<p>For example:<br />\r\nGiven the below binary tree and <code>sum = 22</code>,</p>\r\n\r\n<pre>\r\n              5\r\n             / \\\r\n            4   8\r\n           /   / \\\r\n          11  13  4\r\n         /  \\      \\\r\n        7    2      1\r\n</pre>\r\n\r\n<p>return true, as there exist a root-to-leaf path <code>5-&gt;4-&gt;11-&gt;2</code> which sum is 22.</p>\r\n",
	"frequency":"378",
	"ac_num":"198603"
}