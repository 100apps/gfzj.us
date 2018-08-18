{
	"difficulty":"1",
	"submit_num":"556735",
	"show_id":"104",
	"leetcode_id":"104",
	"answers":[
		{
			"lc_ans_id":"34189",
			"view":"28669",
			"top":"0",
			"title":"Can leetcode share top performing solution(s) of problems for each supported language ?",
			"vote":"180",
			"content":"After a solution is accepted it would be very helpful to know how to make it run faster looking at better performing solution(s)."
		},
		{
			"lc_ans_id":"34216",
			"view":"38614",
			"top":"1",
			"title":"Simple solution using Java",
			"vote":"156",
			"content":"if the node does not exist, simply return 0. Otherwise, return the 1+the longer distance of its subtree.\\n\\n    public int maxDepth(TreeNode root) {\\n            if(root==null){\\n                return 0;\\n            }\\n            return 1+Math.max(maxDepth(root.left),maxDepth(root.right));\\n        }"
		},
		{
			"lc_ans_id":"34207",
			"view":"20559",
			"top":"2",
			"title":"My code of C++, Depth-first-search and Breadth-first-search",
			"vote":"86",
			"content":"1. Depth-first-search\\n======\\n\\nOnly one line code.\\n\\n    int maxDepth(TreeNode *root)\\n    {\\n        return root == NULL ? 0 : max(maxDepth(root -> left), maxDepth(root -> right)) + 1;\\n    }\\n\\n2. Breadth-first-search\\n======\\n\\nCalculate the count of the last level.\\n\\n    int maxDepth(TreeNode *root)\\n    {\\n        if(root == NULL)\\n            return 0;\\n        \\n        int res = 0;\\n        queue<TreeNode *> q;\\n        q.push(root);\\n        while(!q.empty())\\n        {\\n            ++ res;\\n            for(int i = 0, n = q.size(); i < n; ++ i)\\n            {\\n                TreeNode *p = q.front();\\n                q.pop();\\n                \\n                if(p -> left != NULL)\\n                    q.push(p -> left);\\n                if(p -> right != NULL)\\n                    q.push(p -> right);\\n            }\\n        }\\n        \\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"34195",
			"view":"13517",
			"top":"3",
			"title":"Two Java Iterative solution DFS and BFS",
			"vote":"45",
			"content":"This is the iterative version of finding the depth.  The recursive version is trivial, so expect the interviewer to ask for the iterative version.  I used two stacks for the dfs one and a queue for the level-order traversal one.  Level order one is faster.\\n\\nDFS\\n\\n    public int maxDepth(TreeNode root) {\\n        if(root == null) {\\n            return 0;\\n        }\\n        \\n        Stack<TreeNode> stack = new Stack<>();\\n        Stack<Integer> value = new Stack<>();\\n        stack.push(root);\\n        value.push(1);\\n        int max = 0;\\n        while(!stack.isEmpty()) {\\n            TreeNode node = stack.pop();\\n            int temp = value.pop();\\n            max = Math.max(temp, max);\\n            if(node.left != null) {\\n                stack.push(node.left);\\n                value.push(temp+1);\\n            }\\n            if(node.right != null) {\\n                stack.push(node.right);\\n                value.push(temp+1);\\n            }\\n        }\\n        return max;\\n    }\\n    // 7ms\\n    \\nBFS\\n\\n    public int maxDepth(TreeNode root) {\\n        if(root == null) {\\n            return 0;\\n        }\\n        Queue<TreeNode> queue = new LinkedList<>();\\n        queue.offer(root);\\n        int count = 0;\\n        while(!queue.isEmpty()) {\\n            int size = queue.size();\\n            while(size-- > 0) {\\n                TreeNode node = queue.poll();\\n                if(node.left != null) {\\n                    queue.offer(node.left);\\n                }\\n                if(node.right != null) {\\n                    queue.offer(node.right);\\n                }\\n            }\\n            count++;\\n        }\\n        return count;\\n    }\\n    // 3ms"
		},
		{
			"lc_ans_id":"34212",
			"view":"7153",
			"top":"4",
			"title":"1 line Ruby and Python",
			"vote":"35",
			"content":"Just a bit shorter/different than previous solutions.\\n\\nRuby:\\n\\n    def max_depth(root)\\n      root ? 1 + [max_depth(root.left), max_depth(root.right)].max : 0\\n    end\\n\\nPython:\\n\\n    def maxDepth(self, root):\\n        return 1 + max(map(self.maxDepth, (root.left, root.right))) if root else 0"
		},
		{
			"lc_ans_id":"34238",
			"view":"10982",
			"top":"5",
			"title":"Clean Java Iterative Solution",
			"vote":"32",
			"content":"I do believe if you can think of an iterative solution, it's always better than using a recursive one. And technical y every recursive solution can be converted into a equivalent iterative one.\\n\\n    public int maxDepth(TreeNode root) {\\n\\t\\tif (root == null)\\n\\t\\t\\treturn 0;\\n\\t\\t\\n\\t\\tDeque<TreeNode> stack = new LinkedList<TreeNode>();\\n\\t\\t\\n\\t\\tstack.push(root);\\n\\t\\tint count = 0;\\n\\t\\t\\n\\t\\twhile (!stack.isEmpty()) {\\n\\t\\t\\tint size = stack.size();\\n\\t\\t\\twhile (size-- > 0) {\\n\\t\\t\\t\\tTreeNode cur = stack.pop();\\n\\t\\t\\t\\tif (cur.left != null)\\n\\t\\t\\t\\t\\tstack.addLast(cur.left);\\n\\t\\t\\t\\tif (cur.right != null)\\n\\t\\t\\t\\t\\tstack.addLast(cur.right);\\n\\t\\t\\t}\\n\\t\\t\\tcount++;\\n\\n\\t\\t}\\n\\t\\treturn count;\\n\\n\\t}"
		},
		{
			"lc_ans_id":"34190",
			"view":"4296",
			"top":"6",
			"title":"A simple Python recursive solution - O(n) 60ms",
			"vote":"24",
			"content":"    # Definition for a binary tree node.\\n    # class TreeNode:\\n    #     def __init__(self, x):\\n    #         self.val = x\\n    #         self.left = None\\n    #         self.right = None\\n    \\n    class Solution:\\n        # @param {TreeNode} root\\n        # @return {integer}\\n        def maxDepth(self, root):\\n            if not root:\\n                return 0\\n    \\n            return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))"
		},
		{
			"lc_ans_id":"34224",
			"view":"3311",
			"top":"7",
			"title":"My C++ Solution",
			"vote":"19",
			"content":"    int maxDepth(TreeNode* root) {\\n            if(root == NULL)\\n                return 0;\\n            return 1 + std::max(maxDepth(root->left), maxDepth(root->right));\\n        }"
		},
		{
			"lc_ans_id":"34462",
			"view":"2232",
			"top":"8",
			"title":"Simple 8ms C++ solution with recursion",
			"vote":"17",
			"content":"    class Solution {\\n    public:\\n        int maxDepth(TreeNode* root) {\\n            return root ? 1 + max(maxDepth(root->left), maxDepth(root->right)) : 0;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"34408",
			"view":"2674",
			"top":"9",
			"title":"Java solution, both recursion and iteration",
			"vote":"14",
			"content":"    // iteration method\\n    public int maxDepth(TreeNode root) {\\n        int max = 0;\\n        if (root == null) {return 0;}\\n        Stack<TreeNode> path = new Stack<>();\\n        Stack<Integer> sub = new Stack<>();\\n        path.push(root);\\n        sub.push(1);\\n        while (!path.isEmpty()) {\\n            TreeNode temp = path.pop();\\n            int tempVal = sub.pop();\\n            if (temp.left == null && temp.right == null) {max = Math.max(max, tempVal);}\\n            else {\\n                if (temp.left != null) {\\n                    path.push(temp.left);\\n                    sub.push(tempVal + 1);\\n                }\\n                if (temp.right != null) {\\n                    path.push(temp.right);\\n                    sub.push(tempVal + 1);\\n                }\\n            }\\n        }\\n        return max;\\n    }\\n\\n\\n----------\\n    // recursion method\\n    public int maxDepth(TreeNode root) {\\n        if (root == null) return 0;\\n        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;\\n    }"
		}
	],
	"id":"104",
	"title":"Maximum Depth of Binary Tree",
	"content":"<p>Given a binary tree, find its maximum depth.</p>\r\n\r\n<p>The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.</p>\r\n\r\n<p>For example:<br />\r\nGiven binary tree <code>[3,9,20,null,null,15,7]</code>,</p>\r\n\r\n<pre>\r\n    3\r\n   / \\\r\n  9  20\r\n    /  \\\r\n   15   7</pre>\r\n\r\n<p>return its depth = 3.</p>\r\n",
	"frequency":"603",
	"ac_num":"300009"
}