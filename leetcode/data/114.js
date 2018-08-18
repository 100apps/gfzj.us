{
	"difficulty":"2",
	"submit_num":"423123",
	"show_id":"114",
	"leetcode_id":"114",
	"answers":[
		{
			"lc_ans_id":"36977",
			"view":"45001",
			"top":"0",
			"title":"My short post order traversal Java solution for share",
			"vote":"465",
			"content":"    private TreeNode prev = null;\\n\\n    public void flatten(TreeNode root) {\\n        if (root == null)\\n            return;\\n        flatten(root.right);\\n        flatten(root.left);\\n        root.right = prev;\\n        root.left = null;\\n        prev = root;\\n    }"
		},
		{
			"lc_ans_id":"37010",
			"view":"27752",
			"top":"1",
			"title":"Share my simple NON-recursive solution, O(1) space complexity!",
			"vote":"174",
			"content":"    class Solution {\\n    public:\\n        void flatten(TreeNode *root) {\\n    \\t\\tTreeNode*now = root;\\n    \\t\\twhile (now)\\n    \\t\\t{\\n    \\t\\t\\tif(now->left)\\n    \\t\\t\\t{\\n                    //Find current node's prenode that links to current node's right subtree\\n    \\t\\t\\t\\tTreeNode* pre = now->left;\\n    \\t\\t\\t\\twhile(pre->right)\\n    \\t\\t\\t\\t{\\n    \\t\\t\\t\\t\\tpre = pre->right;\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t\\tpre->right = now->right;\\n                    //Use current node's left subtree to replace its right subtree(original right \\n                    //subtree is already linked by current node's prenode\\n    \\t\\t\\t\\tnow->right = now->left;\\n    \\t\\t\\t\\tnow->left = NULL;\\n    \\t\\t\\t}\\n    \\t\\t\\tnow = now->right;\\n    \\t\\t}\\n        }\\n    };"
		},
		{
			"lc_ans_id":"36987",
			"view":"18791",
			"top":"2",
			"title":"Straightforward Java Solution",
			"vote":"104",
			"content":"    public void flatten(TreeNode root) {\\n            if (root == null) return;\\n            \\n            TreeNode left = root.left;\\n            TreeNode right = root.right;\\n            \\n            root.left = null;\\n            \\n            flatten(left);\\n            flatten(right);\\n            \\n            root.right = left;\\n            TreeNode cur = root;\\n            while (cur.right != null) cur = cur.right;\\n            cur.right = right;\\n        }\\n\\n\\nThis solution is based on recursion. We simply flatten left and right subtree and paste each sublist to the right child of the root. (don't forget to set left child to null)"
		},
		{
			"lc_ans_id":"36991",
			"view":"10707",
			"top":"3",
			"title":"Accepted simple Java solution , iterative",
			"vote":"70",
			"content":"it is DFS so u need a stack. Dont forget to set the left child to null, or u'll get TLE. (tricky!)\\n \\n\\n       public void flatten(TreeNode root) {\\n            if (root == null) return;\\n            Stack<TreeNode> stk = new Stack<TreeNode>();\\n            stk.push(root);\\n            while (!stk.isEmpty()){\\n                TreeNode curr = stk.pop();\\n                if (curr.right!=null)  \\n                     stk.push(curr.right);\\n                if (curr.left!=null)  \\n                     stk.push(curr.left);\\n                if (!stk.isEmpty()) \\n                     curr.right = stk.peek();\\n                curr.left = null;  // dont forget this!! \\n            }\\n        }"
		},
		{
			"lc_ans_id":"37000",
			"view":"8606",
			"top":"4",
			"title":"8ms, Non-recursive, No stack, C++ solution",
			"vote":"50",
			"content":"    void flatten(TreeNode *root) {\\n\\t\\twhile (root) {\\n\\t\\t\\tif (root->left && root->right) {\\n\\t\\t\\t\\tTreeNode* t = root->left;\\n\\t\\t\\t\\twhile (t->right)\\n\\t\\t\\t\\t\\tt = t->right;\\n\\t\\t\\t\\tt->right = root->right;\\n\\t\\t\\t}\\n\\n            if(root->left)\\n\\t\\t\\t    root->right = root->left;\\n\\t\\t\\troot->left = NULL;\\n\\t\\t\\troot = root->right;\\n\\t\\t}\\n\\t}"
		},
		{
			"lc_ans_id":"37182",
			"view":"4415",
			"top":"5",
			"title":"My recursive solution is easy and clean!",
			"vote":"25",
			"content":"    void flatten(TreeNode* root) {\\n        if (!root) return;\\n        flatten(root->left);\\n        flatten(root->right);\\n        TreeNode *tmp = root->right;\\n        root->right = root->left;\\n        root->left = nullptr;\\n        while (root->right)\\n            root = root->right;\\n        root->right = tmp;\\n    }"
		},
		{
			"lc_ans_id":"37223",
			"view":"1814",
			"top":"6",
			"title":"Share my accepted recursive solution with comments - Java",
			"vote":"21",
			"content":"The idea is very simple:\\n\\n1. flatten left subtree\\n\\n2. flatten right subtree\\n\\n3. concatenate root -> left flatten subtree -> right flatten subtree\\n\\n        public void flatten(TreeNode root) {\\n            if(root == null)\\n        \\treturn;\\n        \\t\\n            flatten(root.left);\\n            flatten(root.right);\\n        \\n            // save current right for concatination\\n            TreeNode right = root.right;\\n        \\n            if(root.left != null) {\\n            \\n                // step 1: concatinate root with left flatten subtree\\n            \\troot.right = root.left;\\n            \\troot.left = null; // set left to null\\n        \\t\\n            \\t// step 2: move to the end of new added flatten subtree\\n            \\twhile(root.right != null)\\n            \\t\\troot = root.right;\\n        \\t\\t\\n            \\t// step 3: contatinate left flatten subtree with flatten right subtree\\t\\n            \\troot.right = right;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"37181",
			"view":"1799",
			"top":"7",
			"title":"Easy 1ms Java DFS solution",
			"vote":"17",
			"content":"     public class Solution {\\n        public void flatten(TreeNode root) {\\n            if(root==null)\\n                return;\\n            flatten(root.left);\\n            flatten(root.right);\\n            TreeNode left  = root.left;\\n            TreeNode right = root.right;\\n            root.left  = null;\\n            root.right = left; \\n            while(root.right!=null)\\n                root = root.right;\\n            root.right = right;\\n        }\\n    \\n    }"
		},
		{
			"lc_ans_id":"36984",
			"view":"2894",
			"top":"8",
			"title":"An inorder python solution",
			"vote":"14",
			"content":"    class Solution:\\n    # @param root, a tree node\\n    # @return nothing, do it in place\\n    prev = None\\n    def flatten(self, root):\\n        if not root:\\n            return\\n        self.prev = root\\n        self.flatten(root.left)\\n\\n        temp = root.right\\n        root.right, root.left = root.left, None\\n        self.prev.right = temp\\n\\n        self.flatten(temp)\\n\\n\\n\\n             *\\n           /\\n          n\\n       /     \\\\\\n     left   right\\n      \\\\ \\n       *\\n        *\\n         \\\\\\n          p\\n\\n\\nThe idea is very simple. Suppose n is the current visiting node, and p is the previous node of preorder traversal to n.right.\\n\\nWe just need to do the inorder replacement:\\n\\nn.left -> NULL\\n\\nn.right - > n.left\\n\\np->right -> n.right"
		},
		{
			"lc_ans_id":"37047",
			"view":"1760",
			"top":"9",
			"title":"16 lines iterative c++ solution",
			"vote":"13",
			"content":"    void flatten(TreeNode *root) {\\n        while(root){\\n            if(root->left == NULL)\\n                root = root->right;\\n            else {\\n                if(root->right){\\n                    TreeNode *l = root->left;\\n                    while(l->right) l = l->right;\\n                    l->right = root->right;\\n                }\\n                root->right = root->left;\\n                root->left = NULL;\\n                root = root->right;\\n            }\\n        }\\n    }\\n\\nInspired by Morris traversal."
		}
	],
	"id":"114",
	"title":"Flatten Binary Tree to Linked List",
	"content":"<p>\r\nGiven a binary tree, flatten it to a linked list in-place.\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven\r\n<pre>\r\n         1\r\n        / \\\r\n       2   5\r\n      / \\   \\\r\n     3   4   6\r\n</pre>\r\n</p>\r\n\r\nThe flattened tree should look like:<br />\r\n<pre>\r\n   1\r\n    \\\r\n     2\r\n      \\\r\n       3\r\n        \\\r\n         4\r\n          \\\r\n           5\r\n            \\\r\n             6\r\n</pre>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show hints.</a></p>\r\n\r\n<div class=\"spoilers\"><b>Hints:</b>\r\n<p>If you notice carefully in the flattened tree, each node's right child points to the next node of a pre-order traversal.</p>\r\n</div>",
	"frequency":"373",
	"ac_num":"152938"
}