{
	"difficulty":"2",
	"submit_num":"892689",
	"show_id":"98",
	"leetcode_id":"98",
	"answers":[
		{
			"lc_ans_id":"32112",
			"view":"27173",
			"top":"0",
			"title":"Learn one iterative inorder traversal, apply it to multiple tree questions (Java Solution)",
			"vote":"277",
			"content":"I will show you all how to tackle various tree questions using iterative inorder traversal. First one is the standard iterative inorder traversal using stack. Hope everyone agrees with this solution. \\n\\nQuestion : [Binary Tree Inorder Traversal][1]\\n\\n    public List<Integer> inorderTraversal(TreeNode root) {\\n        List<Integer> list = new ArrayList<>();\\n        if(root == null) return list;\\n        Stack<TreeNode> stack = new Stack<>();\\n        while(root != null || !stack.empty()){\\n            while(root != null){\\n                stack.push(root);\\n                root = root.left;\\n            }\\n            root = stack.pop();\\n            list.add(root.val);\\n            root = root.right;\\n            \\n        }\\n        return list;\\n    }\\n\\nNow, we can use this structure to find the Kth smallest element in BST.\\n\\nQuestion : [Kth Smallest Element in a BST][2]\\n\\n     public int kthSmallest(TreeNode root, int k) {\\n         Stack<TreeNode> stack = new Stack<>();\\n         while(root != null || !stack.isEmpty()) {\\n             while(root != null) {\\n                 stack.push(root);    \\n                 root = root.left;   \\n             } \\n             root = stack.pop();\\n             if(--k == 0) break;\\n             root = root.right;\\n         }\\n         return root.val;\\n     }\\n\\nWe can also use this structure to solve BST validation question. \\n\\nQuestion : [Validate Binary Search Tree][3]\\n\\n    public boolean isValidBST(TreeNode root) {\\n       if (root == null) return true;\\n       Stack<TreeNode> stack = new Stack<>();\\n       TreeNode pre = null;\\n       while (root != null || !stack.isEmpty()) {\\n          while (root != null) {\\n             stack.push(root);\\n             root = root.left;\\n          }\\n          root = stack.pop();\\n          if(pre != null && root.val <= pre.val) return false;\\n          pre = root;\\n          root = root.right;\\n       }\\n       return true;\\n    }\\n\\n\\n\\n  [1]: https://leetcode.com/problems/binary-tree-inorder-traversal/\\n  [2]: https://leetcode.com/problems/kth-smallest-element-in-a-bst/\\n  [3]: https://leetcode.com/problems/validate-binary-search-tree/"
		},
		{
			"lc_ans_id":"32109",
			"view":"51812",
			"top":"1",
			"title":"My simple Java solution in 3 lines",
			"vote":"209",
			"content":"    public class Solution {\\n        public boolean isValidBST(TreeNode root) {\\n            return isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE);\\n        }\\n        \\n        public boolean isValidBST(TreeNode root, long minVal, long maxVal) {\\n            if (root == null) return true;\\n            if (root.val >= maxVal || root.val <= minVal) return false;\\n            return isValidBST(root.left, minVal, root.val) && isValidBST(root.right, root.val, maxVal);\\n        }\\n    }\\n\\nBasically what I am doing is recursively iterating over the tree while defining interval `<minVal, maxVal>` for each node which value must fit in."
		},
		{
			"lc_ans_id":"32104",
			"view":"41024",
			"top":"2",
			"title":"C++ in-order traversal, and please do not rely on buggy INT_MAX, INT_MIN solutions any more",
			"vote":"204",
			"content":"    class Solution {\\n    public:\\n        bool isValidBST(TreeNode* root) {\\n            TreeNode* prev = NULL;\\n            return validate(root, prev);\\n        }\\n        bool validate(TreeNode* node, TreeNode* &prev) {\\n            if (node == NULL) return true;\\n            if (!validate(node->left, prev)) return false;\\n            if (prev != NULL && prev->val >= node->val) return false;\\n            prev = node;\\n            return validate(node->right, prev);\\n        }\\n    };\\n\\n> Update:\\n> \\n> If we use in-order traversal to serialize a binary search tree, we can\\n> get a list of values in ascending order. It can be proved with the\\n> definition of BST. And here I use the reference of TreeNode\\n> pointer `prev` as a global variable to mark the address of previous node in the\\n> list.\\n> \\n> \\u201cIn-order Traversal\\u201d:\\n> [https://en.wikipedia.org/wiki/Tree_traversal#In-order]()\\n\\nIf you know what `INT_MAX` or `INT_MIN` is, then it is no excuse for your carelessness."
		},
		{
			"lc_ans_id":"32141",
			"view":"16256",
			"top":"3",
			"title":"C++ simple recursive solution",
			"vote":"100",
			"content":"    bool isValidBST(TreeNode* root) {\\n        return isValidBST(root, NULL, NULL);\\n    }\\n    \\n    bool isValidBST(TreeNode* root, TreeNode* minNode, TreeNode* maxNode) {\\n        if(!root) return true;\\n        if(minNode && root->val <= minNode->val || maxNode && root->val >= maxNode->val)\\n            return false;\\n        return isValidBST(root->left, minNode, root) && isValidBST(root->right, root, maxNode);\\n    }"
		},
		{
			"lc_ans_id":"32101",
			"view":"16543",
			"top":"4",
			"title":"My java inorder iteration solution",
			"vote":"70",
			"content":"the idea is to do a inorder Traversal and keep the value of the\\n\\n    public boolean isValidBST (TreeNode root){\\n    \\t\\t   Stack<TreeNode> stack = new Stack<TreeNode> ();\\n    \\t\\t   TreeNode cur = root ;\\n    \\t\\t   TreeNode pre = null ;\\t\\t   \\n    \\t\\t   while (!stack.isEmpty() || cur != null) {\\t\\t\\t   \\n    \\t\\t\\t   if (cur != null) {\\n    \\t\\t\\t\\t   stack.push(cur);\\n    \\t\\t\\t\\t   cur = cur.left ;\\n    \\t\\t\\t   } else {\\t\\t\\t\\t   \\n    \\t\\t\\t\\t   TreeNode p = stack.pop() ;\\n    \\t\\t\\t\\t   if (pre != null && p.val <= pre.val) {\\t\\t\\t\\t\\t   \\n    \\t\\t\\t\\t\\t   return false ;\\n    \\t\\t\\t\\t   }\\t\\t\\t\\t   \\n    \\t\\t\\t\\t   pre = p ;\\t\\t\\t\\t\\t   \\n    \\t\\t\\t\\t   cur = p.right ;\\n    \\t\\t\\t   }\\n    \\t\\t   }\\n    \\t\\t   return true ; \\n    \\t   }"
		},
		{
			"lc_ans_id":"32138",
			"view":"5151",
			"top":"5",
			"title":"Another passed Java solution",
			"vote":"48",
			"content":"    public class Solution {\\n        public boolean isValidBST(TreeNode root) {\\n            return helper(root, null, null);\\n        }\\n        \\n        boolean helper(TreeNode root, Integer min, Integer max) {\\n            if (root == null)\\n                return true;\\n            \\n            if ((min != null && root.val <= min) || (max != null && root.val >= max))\\n                return false;\\n            \\n            return helper(root.left, min, root.val) && helper(root.right, root.val, max);\\n        }\\n    }\\n\\nMy original solution was calling helper(root, Integer.MIN_VALUE, Integer.MAX_VALUE), but it failed when a tree node is either Integer.MIN_VALUE or Integer.MAX_VALUE. The correct solution is don't check with them."
		},
		{
			"lc_ans_id":"32178",
			"view":"4324",
			"top":"6",
			"title":"Clean Python Solution",
			"vote":"26",
			"content":"Use recursion. Pass down two parameters: `lessThan` (which means that all nodes in the the current subtree must be smaller than this value) and `largerThan` (all must be larger than it). Compare root of the current subtree with these two values. Then, recursively check the left and right subtree of the current one. Take care of the values passed down.\\n\\n\\n    class Solution(object):\\n        def isValidBST(self, root, lessThan = float('inf'), largerThan = float('-inf')):\\n            if not root:\\n                return True\\n            if root.val <= largerThan or root.val >= lessThan:\\n                return False\\n            return self.isValidBST(root.left, min(lessThan, root.val), largerThan) and \\\\\\n                   self.isValidBST(root.right, lessThan, max(root.val, largerThan))"
		},
		{
			"lc_ans_id":"32193",
			"view":"3682",
			"top":"7",
			"title":"1 ms Java Solution using Recursion",
			"vote":"22",
			"content":"    public class Solution {\\n    public boolean isValidBST(TreeNode root) {\\n        return isValid(root, null, null);\\n    }\\n    \\n    public boolean isValid(TreeNode root, Integer min, Integer max) {\\n        if(root == null) return true;\\n        if(min != null && root.val <= min) return false;\\n        if(max != null && root.val >= max) return false;\\n        \\n        return isValid(root.left, min, root.val) && isValid(root.right, root.val, max);\\n    }}"
		},
		{
			"lc_ans_id":"32153",
			"view":"4315",
			"top":"8",
			"title":"Python version based on inorder traversal",
			"vote":"20",
			"content":"    # Definition for a  binary tree node\\n    # class TreeNode:\\n    #     def __init__(self, x):\\n    #         self.val = x\\n    #         self.left = None\\n    #         self.right = None\\n    \\n    class Solution:\\n        # @param root, a tree node\\n        # @return a boolean\\n        # 7:38\\n        def isValidBST(self, root):\\n            output = []\\n            self.inOrder(root, output)\\n            \\n            for i in range(1, len(output)):\\n                if output[i-1] >= output[i]:\\n                    return False\\n    \\n            return True\\n    \\n        def inOrder(self, root, output):\\n            if root is None:\\n                return\\n            \\n            self.inOrder(root.left, output)\\n            output.append(root.val)\\n            self.inOrder(root.right, output)"
		},
		{
			"lc_ans_id":"32196",
			"view":"1845",
			"top":"9",
			"title":"1ms Java solution, O(n) time and O(1) space, using Integer object and null pointer",
			"vote":"18",
			"content":"    public class Solution {\\n        public boolean isValidBST(TreeNode root) {\\n            return isValidBSTHelper(root, null, null);\\n        }\\n    \\n        private boolean isValidBSTHelper(TreeNode root, Integer leftBound, Integer rightBound) {\\n            // recursively pass left and right bounds from higher level to lower level\\n            if (root == null) {\\n                return true;\\n            }\\n            if (leftBound != null && root.val <= leftBound || rightBound != null && root.val >= rightBound) {\\n                return false;\\n            }\\n            return isValidBSTHelper(root.left, leftBound, root.val) && isValidBSTHelper(root.right, root.val, rightBound);\\n        }\\n    }"
		}
	],
	"id":"98",
	"title":"Validate Binary Search Tree",
	"content":"<p>\r\nGiven a binary tree, determine if it is a valid binary search tree (BST).\r\n</p>\r\n\r\n<p>\r\nAssume a BST is defined as follows:\r\n<ul>\r\n<li>The left subtree of a node contains only nodes with keys <b>less than</b> the node's key.</li>\r\n<li>The right subtree of a node contains only nodes with keys <b>greater than</b> the node's key.</li>\r\n<li>Both the left and right subtrees must also be binary search trees.</li>\r\n</ul>\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n    2\r\n   / \\\r\n  1   3\r\n</pre>\r\nBinary tree <code>[2,1,3]</code>, return true.\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n    1\r\n   / \\\r\n  2   3\r\n</pre>\r\nBinary tree <code>[1,2,3]</code>, return false.\r\n</p>",
	"frequency":"317",
	"ac_num":"213893"
}