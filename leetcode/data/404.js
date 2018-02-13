{
	"difficulty":"1",
	"submit_num":"162631",
	"show_id":"404",
	"leetcode_id":"404",
	"answers":[
		{
			"lc_ans_id":"88950",
			"view":"25515",
			"top":"0",
			"title":"Java iterative and recursive solutions",
			"vote":"59",
			"content":"**Recursive method.** For given node we check whether its left child is a leaf. If it is the case, we add its value to answer, otherwise recursively call method on left child. For right child we call method only if it has at least one nonnull child.\\n\\n```\\npublic int sumOfLeftLeaves(TreeNode root) {\\n    if(root == null) return 0;\\n    int ans = 0;\\n    if(root.left != null) {\\n        if(root.left.left == null && root.left.right == null) ans += root.left.val;\\n        else ans += sumOfLeftLeaves(root.left);\\n    }\\n    ans += sumOfLeftLeaves(root.right);\\n    \\n    return ans;\\n}\\n```\\n\\n**Iterative method.** Here for each node in the tree we check whether its left child is a leaf. If it is true, we add its value to answer, otherwise add left child to the stack to process it later. For right child we add it to stack only if it is not a leaf.\\n``` \\npublic int sumOfLeftLeaves(TreeNode root) {\\n    if(root == null) return 0;\\n    int ans = 0;\\n    Stack<TreeNode> stack = new Stack<TreeNode>();\\n    stack.push(root);\\n    \\n    while(!stack.empty()) {\\n        TreeNode node = stack.pop();\\n        if(node.left != null) {\\n            if (node.left.left == null && node.left.right == null)\\n                ans += node.left.val;\\n            else\\n                stack.push(node.left);\\n        }\\n        if(node.right != null) {\\n            if (node.right.left != null || node.right.right != null)\\n                stack.push(node.right);\\n        }\\n    }\\n    return ans;\\n}\\n```"
		},
		{
			"lc_ans_id":"89060",
			"view":"8999",
			"top":"1",
			"title":"Java Solution using BFS",
			"vote":"29",
			"content":"```\\npublic class Solution {\\n    public int sumOfLeftLeaves(TreeNode root) {\\n        if(root == null || root.left == null && root.right == null) return 0;\\n        \\n        int res = 0;\\n        Queue<TreeNode> queue = new LinkedList<>();\\n        queue.offer(root);\\n        \\n        while(!queue.isEmpty()) {\\n            TreeNode curr = queue.poll();\\n\\n            if(curr.left != null && curr.left.left == null && curr.left.right == null) res += curr.left.val;\\n            if(curr.left != null) queue.offer(curr.left);\\n            if(curr.right != null) queue.offer(curr.right);\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"88976",
			"view":"6165",
			"top":"2",
			"title":"3-line c++ solution",
			"vote":"26",
			"content":"```\\nclass Solution {\\npublic:\\n    int sumOfLeftLeaves(TreeNode* root) {\\n        if (!root) return 0;\\n        if (root->left && !root->left->left && !root->left->right) return root->left->val + sumOfLeftLeaves(root->right);\\n        return sumOfLeftLeaves(root->left) + sumOfLeftLeaves(root->right);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"88951",
			"view":"5871",
			"top":"3",
			"title":"3 line recursive c++ solution, no need to explain",
			"vote":"22",
			"content":"```\\nint sumOfLeftLeaves(TreeNode* root, bool isleft = false) {\\n    if (!root) return 0;\\n    if (!root->left && !root->right) return isleft ? root->val : 0;\\n    return sumOfLeftLeaves(root->left, true) + sumOfLeftLeaves(root->right, false);\\n}\\n```"
		},
		{
			"lc_ans_id":"88952",
			"view":"2771",
			"top":"4",
			"title":"Java, clean, no helper, recursive",
			"vote":"8",
			"content":"```\\npublic class Solution {\\n    public int sumOfLeftLeaves(TreeNode n) {\\n        if(n==null ||(n.left==null && n.right ==null))return 0;\\n        int l=0,r=0;\\n        if(n.left!=null)l=(n.left.left==null && n.left.right==null)?n.left.val:sumOfLeftLeaves(n.left);\\n        if(n.right!=null)r=sumOfLeftLeaves(n.right);\\n        return l+r;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"89055",
			"view":"889",
			"top":"5",
			"title":"Java solution with Stack",
			"vote":"8",
			"content":"```\\n    public int sumOfLeftLeaves(TreeNode root) {\\n        int res = 0;\\n\\n        Stack<TreeNode> stack = new Stack<>();\\n        stack.push(root);\\n        \\n        while (!stack.isEmpty()) {\\n            TreeNode node = stack.pop();\\n            if (node != null) {\\n                if (node.left != null && node.left.left == null && node.left.right == null)\\n                    res += node.left.val;\\n                stack.push(node.left);\\n                stack.push(node.right);\\n            }\\n        }\\n\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"88977",
			"view":"4602",
			"top":"6",
			"title":"4 Lines Python Recursive AC Solution",
			"vote":"8",
			"content":"base case  =>  node is none\\nrecursive case  =>  Left child is / isn't Leave\\n\\n```\\nclass Solution(object):\\n    def sumOfLeftLeaves(self, root):\\n        if not root: return 0\\n        if root.left and not root.left.left and not root.left.right:\\n            return root.left.val + self.sumOfLeftLeaves(root.right)\\n        return self.sumOfLeftLeaves(root.left) + self.sumOfLeftLeaves(root.right)   # isn't leave\\n```\\n**EDIT:**\\nCould be 3 Lines, but L2 would be too long.\\nthanks @tototo's advise!"
		},
		{
			"lc_ans_id":"89095",
			"view":"971",
			"top":"7",
			"title":"5-line easy Python recursion",
			"vote":"6",
			"content":"    class Solution(object):\\n        def sumOfLeftLeaves(self, root):\\n            if not root:\\n                return 0\\n            if root.left and not root.left.left and not root.left.right:\\n                return root.left.val + self.sumOfLeftLeaves(root.right)\\n            return self.sumOfLeftLeaves(root.left) + self.sumOfLeftLeaves(root.right)"
		},
		{
			"lc_ans_id":"89184",
			"view":"596",
			"top":"8",
			"title":"Accepted Java solution using Recursion, simple, easy to understand",
			"vote":"5",
			"content":"Use a helper recursion function that specifies if the node is left node or right node.\\n```\\npublic class Solution {\\n    public int sumOfLeftLeaves(TreeNode root) {\\n        return sumOfLeftLeavesHelper(root, false);\\n    }\\n    \\n    public int sumOfLeftLeavesHelper(TreeNode root, boolean b) {\\n        if (root == null) return 0;\\n        if (root.left == null && root.right == null) {\\n            if (b) return root.val;\\n            else return 0;\\n        }\\n        return sumOfLeftLeavesHelper(root.left, true) + sumOfLeftLeavesHelper(root.right, false);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"89043",
			"view":"525",
			"top":"9",
			"title":"Java Clean Recursive Solution",
			"vote":"4",
			"content":"Use a helper function and sum to track the sum of all left leaves\\n\\n```\\npublic class Solution {\\n    private int sum = 0;\\n    public int sumOfLeftLeaves(TreeNode root) {\\n        helper(root, false);\\n        return sum;\\n    }\\n\\n    private void helper(TreeNode root, boolean isLeft) {\\n        if (root == null) {\\n            return;\\n        }\\n        if (isLeft == true && root.left == null && root.right == null) {\\n            sum += root.val;\\n        }\\n        helper(root.left, true);\\n        helper(root.right, false);\\n    }\\n}\\n```"
		}
	],
	"id":"404",
	"title":"Sum of Left Leaves",
	"content":"<p>Find the sum of all left leaves in a given binary tree.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n    3\r\n   / \\\r\n  9  20\r\n    /  \\\r\n   15   7\r\n\r\nThere are two left leaves in the binary tree, with values <b>9</b> and <b>15</b> respectively. Return <b>24</b>.\r\n</pre>\r\n</p>",
	"frequency":"250",
	"ac_num":"77112"
}