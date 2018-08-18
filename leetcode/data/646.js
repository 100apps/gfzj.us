{
	"difficulty":"1",
	"submit_num":"36782",
	"show_id":"669",
	"leetcode_id":"669",
	"answers":[
		{
			"lc_ans_id":"107000",
			"view":"7778",
			"top":"0",
			"title":"Java solution, 6 liner",
			"vote":"40",
			"content":"```\\nclass Solution {\\n    public TreeNode trimBST(TreeNode root, int L, int R) {\\n        if (root == null) return null;\\n        \\n        if (root.val < L) return trimBST(root.right, L, R);\\n        if (root.val > R) return trimBST(root.left, L, R);\\n        \\n        root.left = trimBST(root.left, L, R);\\n        root.right = trimBST(root.right, L, R);\\n        \\n        return root;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107046",
			"view":"3494",
			"top":"1",
			"title":"C++, recursion",
			"vote":"9",
			"content":"The code works as recursion. \\n```\\nIf the root value in the range [L, R]\\n      we need return the root, but trim its left and right subtree;\\nelse if the root value < L\\n      because of binary search tree property, the root and the left subtree are not in range;\\n      we need return trimmed right subtree.\\nelse\\n      similarly we need return trimmed left subtree.\\n```\\nWithout freeing memory\\n```\\nclass Solution {\\npublic:\\n    TreeNode* trimBST(TreeNode* root, int L, int R) {\\n        if (root == NULL) return NULL;\\n        if (root->val < L) return trimBST(root->right, L, R);\\n        if (root->val > R) return trimBST(root->left, L, R);\\n        root->left = trimBST(root->left, L, R);\\n        root->right = trimBST(root->right, L, R);\\n        return root;\\n    }\\n};\\n\\n```\\nFree the memory\\nAs @StefanPochmann pointed out, it works well to delete only non-root nodes of the whole tree. His solution is as below. Thanks.\\n```\\nTreeNode* trimBST(TreeNode* root, int L, int R, bool top=true) {\\n    if (!root)\\n        return root;\\n    root->left = trimBST(root->left, L, R, false);\\n    root->right = trimBST(root->right, L, R, false);\\n    if (root->val >= L && root->val <= R)\\n        return root;\\n    auto result = root->val < L ? root->right : root->left;\\n    if (!top)\\n        delete root;\\n    return result;\\n}\\n```"
		},
		{
			"lc_ans_id":"107026",
			"view":"360",
			"top":"2",
			"title":"Java solution, iteration version",
			"vote":"8",
			"content":"I just found everyone using recursion to solve this problem. And it's true that recursive solution is much clean and readable. But I just want to write a iterative version which is much longer. Using three loops, one for finding a new root. Second for removing the invalid nodes from left subtree of new root. The last one for removing the invalids nodes from right subtree of new root. Have fun with this solution. lol\\n```\\nclass Solution {\\n    public TreeNode trimBST(TreeNode root, int L, int R) {\\n        if (root == null) {\\n            return root;\\n        }\\n        //Find a valid root which is used to return.\\n        while (root.val < L || root.val > R) {\\n            if (root.val < L) {\\n                root = root.right;\\n            }\\n            if (root.val > R) {\\n                root = root.left;\\n            }\\n        }\\n        TreeNode dummy = root;\\n        // Remove the invalid nodes from left subtree.\\n        while (dummy != null) {\\n            while (dummy.left != null && dummy.left.val < L) {\\n                dummy.left = dummy.left.right; \\n                // If the left child is smaller than L, then we just keep the right subtree of it. \\n            }\\n            dummy = dummy.left;\\n        }\\n        dummy = root;\\n        // Remove the invalid nodes from right subtree\\n        while (dummy != null) {\\n            while (dummy.right != null && dummy.right.val > R) {\\n                dummy.right = dummy.right.left;\\n                // If the right child is biggrt than R, then we just keep the left subtree of it. \\n            }\\n            dummy = dummy.right;\\n        }\\n        return root;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107013",
			"view":"1855",
			"top":"3",
			"title":"clear python solution",
			"vote":"7",
			"content":"```\\nclass Solution(object):\\n    def trimBST(self, root, L, R):\\n        \"\"\"\\n        :type root: TreeNode\\n        :type L: int\\n        :type R: int\\n        :rtype: TreeNode\\n        \"\"\"\\n        if not root:\\n            return None\\n        if L > root.val:\\n            return self.trimBST(root.right, L, R)\\n        elif R < root.val:\\n            return self.trimBST(root.left, L, R)\\n        root.left = self.trimBST(root.left, L, R)\\n        root.right = self.trimBST(root.right, L, R)\\n        return root\\n```"
		},
		{
			"lc_ans_id":"107059",
			"view":"1809",
			"top":"4",
			"title":"Simple Java recursive solution",
			"vote":"6",
			"content":"```\\npublic TreeNode trimBST(TreeNode root, int L, int R) {\\n        if (root == null) {\\n            return root;\\n        }\\n\\n        if (root.val > R) {\\n            return trimBST(root.left, L, R);\\n        }\\n\\n        if (root.val < L) {\\n            return trimBST(root.right, L, R);\\n        }\\n\\n        root.left = trimBST(root.left, L, R);\\n        root.right = trimBST(root.right, L, R);\\n        return root;\\n    }\\n```\\nAlso viewable [here](https://github.com/fishercoder1534/Leetcode/blob/master/src/main/java/com/fishercoder/solutions/_669.java) on Github."
		},
		{
			"lc_ans_id":"107036",
			"view":"733",
			"top":"5",
			"title":"easy java",
			"vote":"4",
			"content":"```\\n    public TreeNode trimBST(TreeNode root, int L, int R) {\\n        if (root == null) return null;\\n        TreeNode left = trimBST(root.left, L, R);\\n        TreeNode right = trimBST(root.right, L, R);\\n        root.left = left;\\n        root.right = right;\\n        return root.val >= L && root.val <= R? root : root.val < L? right : left; \\n    }\\n```"
		},
		{
			"lc_ans_id":"107030",
			"view":"95",
			"top":"6",
			"title":"c++ 13ms (not recursive)",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    TreeNode* trimBST(TreeNode* root, int L, int R) {\\n        \\n       // find the proper root\\n        while(root->val<L || root->val>R)\\n        {\\n            if(root->val<L) { root = root->right; }\\n            else { root = root->left; }\\n        }\\n        \\n        // temporary pointer for left and right subtree\\n        TreeNode *Ltemp = root;\\n        TreeNode *Rtemp = root;\\n        \\n        // remove the elements larger than L\\n        while(Ltemp->left)\\n        {\\n            if( (Ltemp->left->val)<L ) { Ltemp->left = Ltemp->left->right; }\\n            else { Ltemp = Ltemp->left; }\\n        }\\n         // remove the elements larger than R\\n        while(Rtemp->right)\\n        {\\n            if( (Rtemp->right->val)>R) { Rtemp->right = Rtemp->right->left; }\\n            else { Rtemp = Rtemp->right; }\\n        }\\n\\n        return root;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"107056",
			"view":"372",
			"top":"7",
			"title":"Python, Straightforward with Explanation",
			"vote":"2",
			"content":"Let `trim(node)` be the answer for the subtree at that node.\\n\\nWhen `node.val > R`, we know the trimmed binary tree must occur to the left of the node.  Similarly, when `node.val < L`, the trimmed binary tree occurs to the right of the node.  Otherwise, we will trim both sides of the tree.\\n\\n```\\ndef trimBST(self, root, L, R):\\n    def trim(node):\\n        if node:\\n            if node.val > R:\\n                return trim(node.left)\\n            elif node.val < L:\\n                return trim(node.right)\\n            else:\\n                node.left = trim(node.left)\\n                node.right = trim(node.right)\\n                return node\\n\\n    return trim(root)\\n```"
		},
		{
			"lc_ans_id":"107055",
			"view":"568",
			"top":"8",
			"title":"Simple Java recursive solution",
			"vote":"2",
			"content":"If the root is well within the range, then just delegating the problem to left and right subtrees.\\nif the root is out of the range and less than L, then the entire left subtree can be discarded including the root.\\nif the root is out of the range and greater than R, then the entire right subtree can be discarded including the root.\\n```\\npublic TreeNode trimBST(TreeNode root, int L, int R) {\\n        if(root == null) return null;\\n        if(root.val >= L && root.val <= R) {\\n            root.left = trimBST(root.left, L, R);\\n            root.right = trimBST(root.right, L, R);\\n            return root;\\n        }\\n        if(root.val < L)  return trimBST(root.right, L, R);\\n        if(root.val > R)  return trimBST(root.left, L, R);\\n    }\\n```"
		},
		{
			"lc_ans_id":"107023",
			"view":"61",
			"top":"9",
			"title":"JavaScript Solution",
			"vote":"1",
			"content":"```\\n/**\\n * Definition for a binary tree node.\\n * function TreeNode(val) {\\n *     this.val = val;\\n *     this.left = this.right = null;\\n * }\\n */\\n/**\\n * @param {TreeNode} root\\n * @param {number} L\\n * @param {number} R\\n * @return {TreeNode}\\n */\\nvar trimBST = function(root, L, R) {\\n  if (root === null) {\\n    return null;\\n  }\\n  if (root.val > R) {\\n    return trimBST(root.left, L, R);\\n  }\\n  if (root.val < L) {\\n    return trimBST(root.right, L, R);\\n  }\\n  root.left = trimBST(root.left, L, R);\\n  root.right = trimBST(root.right, L, R);\\n  return root;\\n};\\n```"
		}
	],
	"id":"646",
	"title":"Trim a Binary Search Tree",
	"content":"<p>\r\nGiven a binary search tree and the lowest and highest boundaries as <code>L</code> and <code>R</code>, trim the tree so that all its elements lies in <code>[L, R]</code> (R >= L). You might need to change the root of the tree, so the result should return the new root of the trimmed binary search tree.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n    1\r\n   / \\\r\n  0   2\r\n\r\n  L = 1\r\n  R = 2\r\n\r\n<b>Output:</b> \r\n    1\r\n      \\\r\n       2\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n    3\r\n   / \\\r\n  0   4\r\n   \\\r\n    2\r\n   /\r\n  1\r\n\r\n  L = 1\r\n  R = 3\r\n\r\n<b>Output:</b> \r\n      3\r\n     / \r\n   2   \r\n  /\r\n 1\r\n</pre>\r\n</p>",
	"frequency":"426",
	"ac_num":"21469"
}