{
	"difficulty":"2",
	"submit_num":"70886",
	"show_id":"156",
	"leetcode_id":"156",
	"answers":[
		{
			"lc_ans_id":"49406",
			"view":"10784",
			"top":"0",
			"title":"Java recursive (O(logn) space) and iterative solutions (O(1) space) with explanation and figure",
			"vote":"162",
			"content":"This is not a very intuitive problem for me, I have to spent quite a while drawing figures to understand it.  As shown in the figure, 1 shows the original tree, you can think about it as a comb, with 1, 2, 4 form the bone, and 3, 5 as the teeth.  All we need to do is flip the teeth direction as shown in figure 2.  We will remove the link 1--3, 2--5, and add link 2--3, and 4--5.  And node 4 will be the new root.  \\n\\nAs the recursive solution, we will keep recurse on the left child and once we are are done, we found the newRoot, which is 4 for this case.  At this point, we will need to set the new children for node 2, basically the new left node is 3, and right node is 1.  Here is the recursive solution:\\n\\n\\n\\n![enter image description here][1]\\n\\n\\nRecursive:\\n\\n    public TreeNode upsideDownBinaryTree(TreeNode root) {\\n        if(root == null || root.left == null) {\\n            return root;\\n        }\\n        \\n        TreeNode newRoot = upsideDownBinaryTree(root.left);\\n        root.left.left = root.right;   // node 2 left children\\n        root.left.right = root;         // node 2 right children\\n        root.left = null;\\n        root.right = null;\\n        return newRoot;\\n    }\\n\\nFor the iterative solution, it follows the same thought, the only thing we need to pay attention to is to save the node information that will be overwritten.  \\n\\n![iterative][2]\\n\\n    public TreeNode upsideDownBinaryTree(TreeNode root) {\\n        TreeNode curr = root;\\n        TreeNode next = null;\\n        TreeNode temp = null;\\n        TreeNode prev = null;\\n        \\n        while(curr != null) {\\n            next = curr.left;\\n            \\n            // swapping nodes now, need temp to keep the previous right child\\n            curr.left = temp;\\n            temp = curr.right;\\n            curr.right = prev;\\n            \\n            prev = curr;\\n            curr = next;\\n        }\\n        return prev;\\n    }  \\n\\n\\n  [1]: http://i63.tinypic.com/1s1gcp.jpg\\n  [2]: http://i68.tinypic.com/2nkj582.jpg"
		},
		{
			"lc_ans_id":"49412",
			"view":"9450",
			"top":"1",
			"title":"Clean Java solution",
			"vote":"91",
			"content":"    public TreeNode upsideDownBinaryTree(TreeNode root) {\\n      if (root == null || root.left == null && root.right == null)\\n        return root;\\n    \\n      TreeNode newRoot = upsideDownBinaryTree(root.left);\\n      \\n      root.left.left = root.right;\\n      root.left.right = root;\\n      \\n      root.left = null;\\n      root.right = null;\\n          \\n      return newRoot;\\n    }"
		},
		{
			"lc_ans_id":"49432",
			"view":"5761",
			"top":"2",
			"title":"Easy O(n) iteration solution [Java]",
			"vote":"44",
			"content":"    public class Solution {\\n        public TreeNode UpsideDownBinaryTree(TreeNode root) {\\n            TreeNode curr = root;\\n            TreeNode prev = null;\\n            TreeNode next = null;\\n            TreeNode temp = null;\\n            \\n            while (curr != null) {\\n                next = curr.left;\\n                curr.left = temp;\\n                temp = curr.right;\\n                curr.right = prev;\\n                prev = curr;\\n                curr = next;\\n            }\\n            \\n            return prev;\\n        }\\n    }\\n\\n    Just think about how you can save the tree information \\n    you need before changing the tree structure."
		},
		{
			"lc_ans_id":"49410",
			"view":"3134",
			"top":"3",
			"title":"Explain the question and my solution, Python",
			"vote":"32",
			"content":"I need to admit that I totally didn't get how to do the \"upside-down\"\\n\\nAfter some struggling and googling, I saw the graph in [binary tree representation of trees](http://xlinux.nist.gov/dads/HTML/binaryTreeRepofTree.html).\\n\\nIt's not directly the same, but give me a sense of how to do it.\\n\\nThe transform of the base three-node case is like below: \\n      \\n                             Root                   L\\n                             /  \\\\                  /  \\\\\\n                            L    R                R   Root\\n\\nYou can image you grab the L to the top, then the Root becomes it's right node, and  the R becomes its left node.\\n\\nKnowing the base case, you can solve it recursively.\\n\\nHow? You keep finding the left most node, make it upside-down, then make its parent to be its right most subtree recursively.\\n\\n\\n**Here is a small point to be noticed, when you connect the root to the right subtree, you need to make sure you are not copying the original root, otherwise it will become cyclic!**\\n\\n        \\n    def upsideDownBinaryTree(self, root):\\n        if not root or not root.left:\\n            return root\\n        lRoot = self.upsideDownBinaryTree(root.left)\\n        rMost = lRoot\\n        while rMost.right:\\n            rMost = rMost.right\\n        root, rMost.left, rMost.right = lRoot, root.right, TreeNode(root.val)\\n        return root"
		},
		{
			"lc_ans_id":"49457",
			"view":"3198",
			"top":"4",
			"title":"C++ recursive solution , easy understanding",
			"vote":"22",
			"content":"    TreeNode* upsideDownBinaryTree(TreeNode* root) {\\n        if (!root || !root->left) return root;\\n        TreeNode* cur_left = root->left;\\n        TreeNode* cur_right = root->right;\\n        TreeNode* new_root = upsideDownBinaryTree(root->left);\\n        cur_left->right = root;\\n        cur_left->left = cur_right;\\n        root->left = nullptr;\\n        root->right = nullptr;\\n        return new_root;\\n    }"
		},
		{
			"lc_ans_id":"49453",
			"view":"862",
			"top":"5",
			"title":"C++ Recursive & Non-Recursive Solution Summary with Detailed Comments",
			"vote":"10",
			"content":"Let us first check the C++ recursive solution \\n\\n    class Solution {\\n    public:\\n        TreeNode* upsideDownBinaryTree(TreeNode* root) {\\n            /** the left most node, when backtrack we need to set the parent node left & right point to null **/\\n            if(!root || !root->left) return root;\\n            /** record the current left & right node before DFS **/\\n            TreeNode* cur_left = root->left;\\n            TreeNode* cur_right = root->right;\\n            /** DFS call to build the right sub tree **/\\n            TreeNode* new_root = upsideDownBinaryTree(root->left);\\n            cur_left->right = root;\\n            cur_left->left = cur_right;\\n            /** now the root node become the child node, so we need to clear the left & right sub node to avoid cycles**/\\n            root->left = nullptr;\\n            root->right = nullptr;\\n            return new_root;\\n        }\\n    };\\n\\nHere is a graph that can help you grasp the key ideas by one step of the algorithm:\\n\\n\\n                              1                                               4 \\n                            /     \\\\                 ----->                 /    \\\\\\n                          2       3                                       5    c(2)\\n                        /    \\\\                                                 /  \\\\ \\n                      c(4)    5                                              n     n\\n\\n                        root = 4                                       root = 2\\n                 \\n\\nNow let us check the Non-Recursive Solution \\n\\nThe idea is to record the parent node and child sibling node of the current node and assign them level by level ...\\n\\n    class Solution {\\n    public:\\n        TreeNode* upsideDownBinaryTree(TreeNode* root) {\\n            /** cur   : record the current root node \\n             * parent : record the parent node of the current node\\n             * right  : record the right child node of the parent node \\n             * next   : record the next level left child node **/\\n            TreeNode* cur = root;\\n            TreeNode* parent = NULL;\\n            TreeNode* right = NULL;\\n            TreeNode* next = NULL;\\n            while(cur != NULL) {\\n                next = cur->left;\\n                /** set the cur->left point to right and cur->right point to parent **/\\n                cur->left = right;\\n                right = cur->right;\\n                cur->right = parent;\\n                parent = cur;\\n                /** move left down to the next node **/\\n                cur = next;\\n            }\\n            return parent;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"49489",
			"view":"851",
			"top":"6",
			"title":"Recursive Java solution",
			"vote":"6",
			"content":"    public class Solution {\\n        public TreeNode UpsideDownBinaryTree(TreeNode root) {\\n            if(root == null)return null;\\n            if(root.left == null)return root;\\n            TreeNode newroot = UpsideDownBinaryTree(root.left);\\n            root.left.left = root.right;\\n            root.left.right = root;\\n            root.right = null;\\n            root.left = null;\\n            return newroot;\\n            \\n        }\\n    }\\n\\nThe leftmost node is the new root. The key is to go down along the leftmost path to find the new root and reset all pointers when poping up."
		},
		{
			"lc_ans_id":"49444",
			"view":"588",
			"top":"7",
			"title":"8-line recursive Python",
			"vote":"4",
			"content":"Three rules:\\n1. root's right node becomes the left node of the left node of root\\n2. root becomes the right node of root's left node\\n3. above rules apply on the left edge and return left node along the path.\\n\\n```\\nclass Solution(object):\\n    def upsideDownBinaryTree(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: TreeNode\\n        \"\"\"\\n        if not root or (not root.left and not root.right):\\n            return root\\n        left = self.upsideDownBinaryTree(root.left)\\n        root.left.left = root.right\\n        root.left.right = root\\n        root.left = None\\n        root.right = None\\n        return left\\n```"
		},
		{
			"lc_ans_id":"49488",
			"view":"713",
			"top":"8",
			"title":"Iteration Python solution",
			"vote":"4",
			"content":"     class Solution:\\n            # @param root, a tree node\\n            # @return root of the upside down tree\\n            def upsideDownBinaryTree(self, root):\\n                # take care of the empty case\\n                if not root:\\n                    return root\\n                # take care of the root\\n                l = root.left\\n                r = root.right\\n                root.left = None\\n                root.right = None\\n                # update the left and the right children, form the new tree, update root\\n                while l:\\n                    newL = l.left\\n                    newR = l.right\\n                    l.left = r\\n                    l.right = root\\n                    root = l\\n                    l = newL\\n                    r = newR\\n                return root"
		},
		{
			"lc_ans_id":"49468",
			"view":"412",
			"top":"9",
			"title":"O(n) time, O(1) space Iterative Java Solution",
			"vote":"3",
			"content":"\\n    public TreeNode upsideDownBinaryTree(TreeNode root) {\\n        if(root == null) return null;\\n        if(root.left == null) return root;\\n\\n        TreeNode curRoot = root, curLeft = null, curRight = null,\\n                nextLeft = root.left, nextRight = root.right;\\n        root.left = null; root.right = null;\\n        while(nextLeft != null) {\\n            curLeft = nextLeft;\\n            curRight = nextRight;\\n            nextLeft = curLeft.left;\\n            nextRight = curLeft.right;\\n\\n            curLeft.left = curRight;\\n            curLeft.right = curRoot;\\n            curRoot = curLeft;\\n        }\\n        return curLeft;\\n    }\\n\\nBefore changing the left and right child of current subtree, store the next subtree's left and right child. Note that you should nullify root.left and root.right in the beginning."
		}
	],
	"id":"156",
	"title":"Binary Tree Upside Down",
	"content":"<p>\r\nGiven a binary tree where all the right nodes are either leaf nodes with a sibling (a left node that shares the same parent node) or empty, flip it upside down and turn it into a tree where the original right nodes turned into left leaf nodes. Return the new root.\r\n</p>\r\n\r\nFor example:<br />\r\nGiven a binary tree <code>{1,2,3,4,5}</code>,<br />\r\n<pre>\r\n    1\r\n   / \\\r\n  2   3\r\n / \\\r\n4   5\r\n</pre>\r\n</p>\r\n<p>\r\nreturn the root of the binary tree <code>[4,5,2,#,#,3,1]</code>.<br/>\r\n<pre>\r\n   4\r\n  / \\\r\n 5   2\r\n    / \\\r\n   3   1  \r\n</pre>\r\n</p>\r\n\r\n<p class=\"showspoilers\">confused what <code>\"{1,#,2,3}\"</code> means? <a href=\"#\" onclick=\"showSpoilers(this); return false;\">> read more on how binary tree is serialized on OJ.</a></p>\r\n\r\n<div class=\"spoilers\"><br /><b>OJ's Binary Tree Serialization:</b>\r\n<p>\r\nThe serialization of a binary tree follows a level order traversal, where '#' signifies a path terminator where no node exists below.\r\n</p>\r\n<p>\r\nHere's an example:<br />\r\n<pre>\r\n   1\r\n  / \\\r\n 2   3\r\n    /\r\n   4\r\n    \\\r\n     5\r\n</pre>\r\nThe above binary tree is serialized as <code>\"{1,2,3,#,#,4,#,#,5}\"</code>. \r\n</p>\r\n</div>",
	"frequency":"267",
	"ac_num":"32275"
}