{
	"difficulty":"2",
	"submit_num":"46322",
	"show_id":"250",
	"leetcode_id":"250",
	"answers":[
		{
			"lc_ans_id":"67573",
			"view":"10745",
			"top":"0",
			"title":"My Concise JAVA Solution",
			"vote":"69",
			"content":"    public class Solution {\\n        public int countUnivalSubtrees(TreeNode root) {\\n            int[] count = new int[1];\\n            helper(root, count);\\n            return count[0];\\n        }\\n        \\n        private boolean helper(TreeNode node, int[] count) {\\n            if (node == null) {\\n                return true;\\n            }\\n            boolean left = helper(node.left, count);\\n            boolean right = helper(node.right, count);\\n            if (left && right) {\\n                if (node.left != null && node.val != node.left.val) {\\n                    return false;\\n                }\\n                if (node.right != null && node.val != node.right.val) {\\n                    return false;\\n                }\\n                count[0]++;\\n                return true;\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67602",
			"view":"8873",
			"top":"1",
			"title":"Java, 11 lines added",
			"vote":"42",
			"content":"Helper `all` tells whether all nodes in the given tree have the given value. And while doing that, it also counts the uni-value subtrees.\\n\\n    public class Solution {\\n        int count = 0;\\n        boolean all(TreeNode root, int val) {\\n            if (root == null)\\n                return true;\\n            if (!all(root.left, root.val) | !all(root.right, root.val))\\n                return false;\\n            count++;\\n            return root.val == val;\\n        }\\n        public int countUnivalSubtrees(TreeNode root) {\\n            all(root, 0);\\n            return count;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67611",
			"view":"3206",
			"top":"2",
			"title":"Very easy JAVA solution, post order recursion",
			"vote":"17",
			"content":"    public class Solution {\\n        public int countUnivalSubtrees(TreeNode root) {\\n            int[] arr = new int[1];\\n            postOrder(arr, root);\\n            return arr[0];\\n        }\\n        public boolean postOrder (int[] arr, TreeNode node) {\\n            if (node == null) return true;\\n            boolean left = postOrder(arr, node.left);\\n            boolean right = postOrder(arr, node.right);\\n            if (left && right) {\\n                if (node.left != null && node.left.val != node.val) return false;\\n                if (node.right != null && node.right.val != node.val) return false;\\n                arr[0]++;\\n                return true;\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67612",
			"view":"2245",
			"top":"3",
			"title":"C++ one-pass recursive solution",
			"vote":"9",
			"content":"It was important for me to realize that: (a) when determining whether a subtree is univalue or not, we don't have to store the value it might be univalue with, since it's already stored at its root, so just the bool indicator is enough; (b) the counter has better to be stored separately from the recursion stack, and used as an accumulator rather than a return value we'd later sum between left and right subtrees.\\n\\nSo the considerations above led to the following transparent solution:\\n\\n\\n       class Solution {\\n        public:\\n            int countUnivalSubtrees(TreeNode* root) {\\n                int count = 0;\\n                countUnivalSubtreesRecursive(root, count);\\n                return count;\\n            }\\n            \\n            bool countUnivalSubtreesRecursive(TreeNode* root, int& count)\\n            {\\n                if(root == NULL) return true;\\n                \\n                auto isLeftUnival = countUnivalSubtreesRecursive(root->left, count);\\n                auto isRightUnival = countUnivalSubtreesRecursive(root->right, count);\\n                \\n                if(isLeftUnival && isRightUnival\\n                    && ((root->left == NULL) || root->left->val == root->val)\\n                    && ((root->right == NULL) || root->right->val == root->val)\\n                )\\n                {\\n                    ++count;\\n                    return true;\\n                }\\n                return false;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"67590",
			"view":"1725",
			"top":"4",
			"title":"My AC Java Code",
			"vote":"7",
			"content":"    public class Solution {\\n        public int countUnivalSubtrees(TreeNode root) {\\n            if (root == null) {\\n                return 0;\\n            }\\n            int[] counter = new int[1];\\n            count(root, counter, root.val);\\n            return counter[0];\\n        }\\n        \\n        private boolean count(TreeNode root, int[] counter, int val) {\\n            if (root == null) {\\n                return true;\\n            }\\n            boolean l = count(root.left, counter, root.val);\\n            boolean r = count(root.right, counter, root.val);\\n        \\n            if (l && r) {\\n                counter[0]++;\\n            }\\n            \\n            return l && r && root.val == val;\\n        }\\n        \\n    }"
		},
		{
			"lc_ans_id":"67646",
			"view":"686",
			"top":"5",
			"title":"Python solution with comments (bottom-up).",
			"vote":"7",
			"content":"        \\n    def countUnivalSubtrees(self, root):\\n        self.count = 0\\n        self.checkUni(root)\\n        return self.count\\n    \\n    # bottom-up, first check the leaf nodes and count them, \\n    # then go up, if both children are \"True\" and root.val is \\n    # equal to both children's values if exist, then root node\\n    # is uniValue suntree node. \\n    def checkUni(self, root):\\n        if not root:\\n            return True\\n        l, r = self.checkUni(root.left), self.checkUni(root.right)\\n        if l and r and (not root.left or root.left.val == root.val) and \\\\\\n        (not root.right or root.right.val == root.val):\\n            self.count += 1\\n            return True\\n        return False"
		},
		{
			"lc_ans_id":"67644",
			"view":"822",
			"top":"6",
			"title":"AC clean Java solution",
			"vote":"7",
			"content":"    public class Solution {\\n        int count;\\n        \\n        public int countUnivalSubtrees(TreeNode root) {\\n            count = 0;\\n            helper(root);\\n            return count;\\n        }\\n        \\n        boolean helper(TreeNode root) {\\n            if (root == null) return true;\\n                \\n            boolean left = helper(root.left);\\n            boolean right = helper(root.right);\\n            \\n            if (left && right && \\n               (root.left == null || root.val == root.left.val) && \\n               (root.right == null || root.val == root.right.val)) {\\n                count++;\\n                return true;\\n            }\\n            \\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67600",
			"view":"1061",
			"top":"7",
			"title":"7-line accepted code in Java",
			"vote":"5",
			"content":"    public class Solution {\\n        int count = 0;\\n        public int countUnivalSubtrees(TreeNode root) {\\n            return (root==null || isUni(root)) ? count : count;\\n        }\\n        public boolean isUni(TreeNode root){\\n            boolean left = root.left == null || isUni(root.left) && root.val == root.left.val;\\n            boolean right = root.right == null || isUni(root.right) && root.val == root.right.val;\\n            return left && right && ++count==count;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67636",
			"view":"449",
			"top":"8",
			"title":"Clean DFS solution",
			"vote":"3",
			"content":"The idea is to use DFS to traverse the tree. During traversal, check every node to see if that node is a univalue node. Here, a univalue node means a subtree with that node the root node is a univalue subtree.\\n\\nJava code is as follows:\\n\\n    public class Solution {\\n    \\n    private int count;\\n    \\n    public int countUnivalSubtrees(TreeNode root) {\\n        count = 0;\\n        dfs(root);\\n        return count;\\n    }\\n    \\n    private boolean dfs(TreeNode root) {\\n        if(root==null) return true;\\n        if(root.left==null && root.right==null) {\\n            count++;\\n            return true;\\n        }\\n        boolean leftUni = dfs(root.left);\\n        boolean rightUni = dfs(root.right);\\n        if(leftUni && rightUni \\n            && (root.left==null || root.left.val==root.val) \\n            && (root.right==null || root.val==root.right.val) ) {\\n            count += 1;\\n            return true;\\n        }\\n        return false;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"67645",
			"view":"636",
			"top":"9",
			"title":"Java solution with DFS",
			"vote":"3",
			"content":"    public int countUnivalSubtrees(TreeNode root) {\\n        // DFS\\n        int[] ret = new int[1];\\n        ret[0] = 0;\\n        IsUnivalue(root, ret);\\n        return ret[0];\\n    }\\n    \\n    // Return if this tree is Univalue\\n    private boolean IsUnivalue(TreeNode root, int[] ret)\\n    {\\n        if(root == null)\\n            return true;\\n        \\n        boolean isLeft = IsUnivalue(root.left, ret);\\n        boolean isRight = IsUnivalue(root.right, ret);\\n        if(!isLeft || !isRight)\\n            return false;\\n            \\n        if(root.left != null && root.val != root.left.val)\\n            return false;\\n\\n        if(root.right != null && root.val != root.right.val)\\n            return false;\\n        \\n        ret[0] += 1;\\n        return true;\\n    }"
		}
	],
	"id":"250",
	"title":"Count Univalue Subtrees",
	"content":"<p>Given a binary tree, count the number of uni-value subtrees.</p>\r\n<p>A Uni-value subtree means all nodes of the subtree have the same value.</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven binary tree,<br />\r\n<pre>\r\n              5\r\n             / \\\r\n            1   5\r\n           / \\   \\\r\n          5   5   5\r\n</pre>\r\n</p>\r\n<p>\r\nreturn <code>4</code>.\r\n</p>",
	"frequency":"316",
	"ac_num":"20114"
}