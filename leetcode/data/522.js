{
	"difficulty":"1",
	"submit_num":"67474",
	"show_id":"538",
	"leetcode_id":"538",
	"answers":[
		{
			"lc_ans_id":"100506",
			"view":"15784",
			"top":"0",
			"title":"Java Recursive O(n) time",
			"vote":"45",
			"content":"Since this is a BST, we can do a reverse inorder traversal to traverse the nodes of the tree in descending order. In the process, we keep track of the running sum of all nodes which we have traversed thus far.\\n\\n```\\npublic class Solution {\\n\\n    int sum = 0;\\n    \\n    public TreeNode convertBST(TreeNode root) {\\n        convert(root);\\n        return root;\\n    }\\n    \\n    public void convert(TreeNode cur) {\\n        if (cur == null) return;\\n        convert(cur.right);\\n        cur.val += sum;\\n        sum = cur.val;\\n        convert(cur.left);\\n    }\\n    \\n}\\n```"
		},
		{
			"lc_ans_id":"100610",
			"view":"4996",
			"top":"1",
			"title":"c++ solution beats 100%",
			"vote":"15",
			"content":"The solution is the modification of inorder travel. Namely, travel right subtree, change the root value, and travel left subtree.\\n```\\nclass Solution {\\nprivate:\\n    int cur_sum = 0;\\npublic:\\n    void travel(TreeNode* root){\\n        if (!root) return;\\n        if (root->right) travel(root->right);\\n        \\n        root->val = (cur_sum += root->val);\\n        if (root->left) travel(root->left);\\n    }\\n    TreeNode* convertBST(TreeNode* root) {\\n        travel(root);\\n        return root;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"100543",
			"view":"4698",
			"top":"2",
			"title":"Java Solution, 7 liner, reversed traversal",
			"vote":"11",
			"content":"Idea: ```Reversely``` traverse the tree and keep a sum of all previously visited values. Because its a BST, values seen before are all greater than current ```node.val```. That's what we want according to the problem.\\n\\n```\\npublic class Solution {\\n    int sum = 0;\\n    \\n    public TreeNode convertBST(TreeNode root) {\\n        if (root == null) return null;\\n        \\n        convertBST(root.right);\\n        \\n        root.val += sum;\\n        sum = root.val;\\n        \\n        convertBST(root.left);\\n        \\n        return root;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100516",
			"view":"2366",
			"top":"3",
			"title":"Java Three O(n) Methods: Recursive, Iterative, and Morris Traversal",
			"vote":"9",
			"content":"The basic idea is to do a reversed inorder traversal. When we visit a node we add the sum of all previous nodes (to the right) to its value and also update the sum.\\n1. recursive method\\n```\\n    private int sum = 0;\\n    public TreeNode convertBST(TreeNode root) {\\n        if (root == null) return null;\\n        convertBST(root.right);\\n        int tmp = root.val;\\n        root.val += sum;\\n        sum += tmp;\\n        convertBST(root.left);\\n        return root;\\n    }\\n```\\n2. iterative method using stack\\n```\\n    public TreeNode convertBST(TreeNode root) {\\n        if (root == null) return null;\\n        int sum = 0;\\n        Stack<TreeNode> stack = new Stack<>();\\n        TreeNode cur = root;\\n        while (!stack.isEmpty() || cur != null) {\\n            while (cur != null) {\\n                stack.push(cur);\\n                cur = cur.right;\\n            }\\n            cur = stack.pop();\\n            int tmp = cur.val;\\n            cur.val += sum;\\n            sum += tmp;\\n            cur = cur.left;\\n        }\\n        return root;\\n    }\\n```\\n3. Morris Traversal\\n```\\n    public TreeNode convertBST(TreeNode root) {\\n        TreeNode cur= root;\\n        int sum = 0;\\n        while (cur != null) {\\n            if (cur.right == null) {\\n                int tmp = cur.val;\\n                cur.val += sum;\\n                sum += tmp;\\n                cur = cur.left;\\n            } else {\\n                TreeNode prev = cur.right;\\n                while (prev.left != null && prev.left != cur)\\n                    prev = prev.left;\\n                if (prev.left == null) {\\n                    prev.left = cur;\\n                    cur = cur.right;\\n                } else {\\n                    prev.left = null;\\n                    int tmp = cur.val;\\n                    cur.val += sum;\\n                    sum += tmp;\\n                    cur = cur.left;\\n                }\\n            }\\n        }\\n        return root;\\n    }\\n```"
		},
		{
			"lc_ans_id":"100619",
			"view":"2540",
			"top":"4",
			"title":"Java 6 lines",
			"vote":"6",
			"content":"Reversed inorder traversal.\\n```\\npublic class Solution {\\n    public TreeNode convertBST(TreeNode root) {\\n        if(root == null) return null;\\n        DFS(root, 0);\\n        return root;\\n    }\\n    \\n    public int DFS(TreeNode root, int preSum){\\n        if(root.right != null) preSum = DFS(root.right, preSum);\\n        root.val = root.val + preSum;\\n        return (root.left != null) ? DFS(root.left, root.val) : root.val;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100555",
			"view":"2604",
			"top":"5",
			"title":"Python, Simple with Explanation",
			"vote":"3",
			"content":"We first traverse the tree \"inorder\" and keep track of all values.  This will be all values in the tree in ascending order.\\nWe then traverse the tree \"reverse inorder\" and set our node values as the suffix sums of values we have found.\\n```\\ndef convertBST(self, root):\\n    def visit1(root):\\n        if root:\\n            visit1(root.left)\\n            vals.append(root.val)\\n            visit1(root.right)\\n    vals = []\\n    visit1(root)\\n    \\n    self.s = 0\\n    def visit2(root):\\n        if root:\\n            visit2(root.right)\\n            self.s += vals.pop()\\n            root.val = self.s\\n            visit2(root.left)\\n    visit2(root)\\n\\n    return root\\n```"
		},
		{
			"lc_ans_id":"100585",
			"view":"314",
			"top":"6",
			"title":"Beat 100% C++",
			"vote":"2",
			"content":"```\\n/**\\n * Definition for a binary tree node.\\n * struct TreeNode {\\n *     int val;\\n *     TreeNode *left;\\n *     TreeNode *right;\\n *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\\n * };\\n */\\nclass Solution {\\npublic:\\n    TreeNode* convertBST(TreeNode* root) {\\n        stack<TreeNode*> s;\\n        TreeNode* cur = root;\\n        int sum = 0;\\n        while(!s.empty() || cur) {\\n            if(cur){\\n                s.push(cur);\\n                cur = cur->right;\\n            }\\n            else {\\n                cur = s.top()->left;\\n                int tmp = sum;\\n                sum += s.top()->val;\\n                s.top()->val += tmp;\\n                s.pop();\\n            }\\n        }\\n        return root;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"100520",
			"view":"93",
			"top":"7",
			"title":"Java Recursive O(n) time, 5 lines",
			"vote":"1",
			"content":"```\\nclass Solution {\\n    public TreeNode convertBST(TreeNode root) {\\n        foo(root, 0);\\n        return root;\\n    }\\n    \\n    public int foo(TreeNode node, int arg) {\\n        if(node == null) return arg;\\n        node.val += foo(node.right, arg);\\n        return foo(node.left, node.val);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100531",
			"view":"115",
			"top":"8",
			"title":"Almost same two Javascript solutions, but why one work, the other one not!?",
			"vote":"1",
			"content":"This is my solution that past:\\n```\\nvar convertBST = function(root) {\\n    var sum = 0\\n    var helper =function(node) {\\n        if (node === null) return;\\n        \\n        helper(node.right)\\n        node.val += sum\\n        sum = node.val\\n        helper(node.left)\\n    }\\n    helper(root);\\n    return root\\n};\\n```\\nAnd this is my first attempt:\\n```\\nvar sum = 0;\\n\\nvar convertBST = function(root) {\\n    helper(root);\\n    return root;\\n};\\n\\nvar helper = function(node) {\\n    if (node === null) return;\\n    helper(node.right);\\n    node.val = Number(sum) + Number(node.val);\\n    sum = Number(node.val);\\n    helper(node.left);\\n};\\n```\\nI believe these two should work the same here, however, the second solution keeps failing as such, but it can pass the custom testcase. That makes me wondering why, or if it's just the leetcode has something wrong with it?\\n![0_1501556828196_output.JPG](/assets/uploads/files/1501556828570-output-resized.jpg)"
		},
		{
			"lc_ans_id":"100544",
			"view":"123",
			"top":"9",
			"title":"Description Clarification",
			"vote":"1",
			"content":"The other problems that have similar addition/subtraction usually notes that the sum will never be less than INT_MIN or more than INT_MAX, it would be nice to have the same clarification on this problem for consistency.\\n\\nBest"
		}
	],
	"id":"522",
	"title":"Convert BST to Greater Tree",
	"content":"<p>Given a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.</p>\r\n\r\n<p>\r\n<b>Example:</b>\r\n<pre>\r\n<b>Input:</b> The root of a Binary Search Tree like this:\r\n              5\r\n            /   \\\r\n           2     13\r\n\r\n<b>Output:</b> The root of a Greater Tree like this:\r\n             18\r\n            /   \\\r\n          20     13\r\n</pre>\r\n</p>",
	"frequency":"279",
	"ac_num":"33109"
}