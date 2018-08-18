{
	"difficulty":"1",
	"submit_num":"52092",
	"show_id":"563",
	"leetcode_id":"563",
	"answers":[
		{
			"lc_ans_id":"102334",
			"view":"8810",
			"top":"0",
			"title":"Java Solution, post-order traversal",
			"vote":"20",
			"content":"```\\npublic class Solution {\\n    int result = 0;\\n    \\n    public int findTilt(TreeNode root) {\\n        postOrder(root);\\n        return result;\\n    }\\n    \\n    private int postOrder(TreeNode root) {\\n        if (root == null) return 0;\\n        \\n        int left = postOrder(root.left);\\n        int right = postOrder(root.right);\\n        \\n        result += Math.abs(left - right);\\n        \\n        return left + right + root.val;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102327",
			"view":"3000",
			"top":"1",
			"title":"Simple Java Solution  -- without Global Variable",
			"vote":"11",
			"content":"To avoid using global variable, you can take use of size-1 array or any other objects.  \\n\\n```\\npublic int findTilt(TreeNode root) {\\n    int[] ret = new int[1];\\n    helper(root, ret);\\n    return ret[0];\\n}\\n    \\nprivate int helper(TreeNode node, int[] ret){\\n    if(node == null){\\n        return 0;\\n    }\\n    int l_sum = helper(node.left, ret);\\n    int r_sum = helper(node.right, ret);\\n    ret[0] += Math.abs(l_sum - r_sum);\\n    return l_sum + r_sum + node.val\\n}\\n````"
		},
		{
			"lc_ans_id":"102321",
			"view":"3380",
			"top":"2",
			"title":"Python, Simple with Explanation",
			"vote":"11",
			"content":"If we had each node's subtree sum, our answer would look like this psuedocode:  ```for each node: ans += abs(node.left.subtreesum - node.right.subtreesum)```.  Let ```_sum(node)``` be the node's subtree sum.  We can find it by adding the subtree sum of the left child, plus the subtree sum of the right child, plus the node's value.  While we are visiting the node (each node is visited exactly once), we might as well do the ```ans += abs(left_sum - right_sum)``` part.\\n```\\ndef findTilt(self, root):\\n    self.ans = 0\\n    def _sum(node):\\n        if not node: return 0\\n        left, right = _sum(node.left), _sum(node.right)\\n        self.ans += abs(left - right)\\n        return node.val + left + right\\n    _sum(root)\\n    return self.ans\\n```"
		},
		{
			"lc_ans_id":"102369",
			"view":"1125",
			"top":"3",
			"title":"Python straightforward solution",
			"vote":"6",
			"content":"Think about a recursive function. Beside the tilt of subtrees, we also need to get the sum of subtrees. \\nSo I came up with the idea of sub function ````tilt(root)````, which returns the tuple  ````(sum, tilt)```` of tree\\n```````\\ndef findTilt(self, root):\\n        def tilt(root):\\n            # return (sum, tilt) of tree\\n            if not root: return (0, 0)\\n            left = tilt(root.left)\\n            right = tilt(root.right)\\n            return (left[0] + right[0] + root.val, abs(left[0] - right[0]) + left[1] + right[1])\\n        return tilt(root)[1]"
		},
		{
			"lc_ans_id":"102350",
			"view":"2479",
			"top":"4",
			"title":"C++ postorder traverse solution",
			"vote":"5",
			"content":"```cpp\\nclass Solution {\\npublic:\\n    int findTilt(TreeNode* root) {\\n        if(root == NULL) return 0;\\n        \\n        int res = 0;\\n        \\n        postorder(root, res);\\n        \\n        return res;\\n    }\\nprivate:\\n    int postorder(TreeNode* root, int& res){\\n        if(root == NULL) return 0;\\n        \\n        int leftsum= postorder(root->left,res);\\n        \\n        int rightsum = postorder(root->right,res);\\n        \\n        res += abs(leftsum - rightsum);\\n        \\n        return leftsum + rightsum + root->val;\\n        \\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"102323",
			"view":"526",
			"top":"5",
			"title":"C++ easy and clean soluion",
			"vote":"4",
			"content":"```\\n    int res=0;\\n    int findTilt(TreeNode* root) {\\n        DFS(root);\\n        return res;\\n    }\\n    \\n    int DFS(TreeNode* n) {\\n        if(n==NULL) return 0;\\n        int l=DFS(n->left);\\n        int r=DFS(n->right);\\n        res+=abs(l-r);\\n        return l+r+n->val;\\n    }"
		},
		{
			"lc_ans_id":"102331",
			"view":"3992",
			"top":"6",
			"title":"Java O(n) Postorder Traversal",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    \\n    int tilt = 0;\\n    \\n    public int findTilt(TreeNode root) {\\n        postorder(root);\\n        return tilt;\\n    }\\n    \\n    public int postorder(TreeNode root) {\\n        if (root == null) return 0;\\n        int leftSum = postorder(root.left);\\n        int rightSum = postorder(root.right);\\n        tilt += Math.abs(leftSum - rightSum);\\n        return leftSum + rightSum + root.val;\\n    }\\n    \\n}\\n```"
		},
		{
			"lc_ans_id":"102352",
			"view":"280",
			"top":"7",
			"title":"Java Solution, no globle varible, Easy and clean",
			"vote":"2",
			"content":"I don't understand the question when I do it at the first time.\\nBut now I got it.\\nFor example:\\n&nbsp;&nbsp;&nbsp;&nbsp;1\\n&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;\\\\\\\\\\n&nbsp;&nbsp;2 &nbsp;&nbsp;&nbsp;&nbsp;3\\n&nbsp;/&nbsp;\\\\\\\\ &nbsp;&nbsp;&nbsp;/\\n  4&nbsp;&nbsp;#&nbsp;5\\n\\nOutput: 11\\nExplanation: \\nTilt of node 4 : 0\\nTilt of node 5 : 0\\nTilt of node 2 : |4-0| = 4\\nTilt of node 3 : |5-0| = 5\\nTilt of node 1 : |sum(2,4)-sum(3,5)| = |6-8| = 2\\nTilt of binary tree : 0 + 0 + 4 + 5 + 2 = 11\\n```\\n    public int findTilt(TreeNode root) {\\n        if (root == null) return 0;\\n        int curVal = 0;\\n        curVal = Math.abs(sumSubTree(root.left) - sumSubTree(root.right));\\n        return curVal + findTilt(root.left) + findTilt(root.right);\\n    }\\n\\n    private int sumSubTree(TreeNode root) {\\n        if (root == null) return 0;\\n        return root.val + sumSubTree(root.left) + sumSubTree(root.right);\\n    }"
		},
		{
			"lc_ans_id":"102335",
			"view":"144",
			"top":"8",
			"title":"Python solution, easy to understand",
			"vote":"1",
			"content":"First, write a function csum(root) which can sum up the sum of the whole nodes in this tree, then easy to calculate.\\n```\\nclass Solution(object):\\n    def findTilt(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: int\\n        \"\"\"\\n        if not root:\\n            return 0\\n        def csum(root):\\n            if not root:\\n                return 0\\n            return root.val+csum(root.left)+csum(root.right)\\n        return abs(csum(root.left)-csum(root.right))+self.findTilt(root.left)+self.findTilt(root.right)\\n```"
		},
		{
			"lc_ans_id":"102337",
			"view":"358",
			"top":"9",
			"title":"Binary tilt tree: Explain the given test case.",
			"vote":"1",
			"content":"Link to problem: https://leetcode.com/problems/binary-tree-tilt/#/description\\n\\nTest case to explain: [1,2,3,4,null,5]\\nExpected O/P for test case: 11\\nMy O/P: 10\\n\\nKindly explain the approach arithmetically and program logic is not required."
		}
	],
	"id":"544",
	"title":"Binary Tree Tilt",
	"content":"<p>Given a binary tree, return the tilt of the <b>whole tree</b>.</p>\r\n\r\n<p>The tilt of a <b>tree node</b> is defined as the <b>absolute difference</b> between the sum of all left subtree node values and the sum of all right subtree node values. Null node has tilt 0.</p>\r\n\r\n<p>The tilt of the <b>whole tree</b> is defined as the sum of all nodes' tilt.</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n         1\r\n       /   \\\r\n      2     3\r\n<b>Output:</b> 1\r\n<b>Explanation:</b> \r\nTilt of node 2 : 0\r\nTilt of node 3 : 0\r\nTilt of node 1 : |2-3| = 1\r\nTilt of binary tree : 0 + 0 + 1 = 1\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<ol>\r\n<li>The sum of node values in any subtree won't exceed the range of 32-bit integer. </li>\r\n<li>All the tilt values won't exceed the range of 32-bit integer.</li>\r\n</ol>\r\n</p>",
	"frequency":"195",
	"ac_num":"24603"
}