{
	"difficulty":"2",
	"submit_num":"142079",
	"show_id":"285",
	"leetcode_id":"285",
	"answers":[
		{
			"lc_ans_id":"72653",
			"view":"28126",
			"top":"0",
			"title":"Share my Java recursive solution",
			"vote":"244",
			"content":"Just want to share my recursive solution for both getting the successor and predecessor for a given node in BST.\\n\\n**Successor**\\n\\n    public TreeNode successor(TreeNode root, TreeNode p) {\\n      if (root == null)\\n        return null;\\n    \\n      if (root.val <= p.val) {\\n        return successor(root.right, p);\\n      } else {\\n        TreeNode left = successor(root.left, p);\\n        return (left != null) ? left : root;\\n      }\\n    }\\n\\n\\n**Predecessor**\\n\\n    public TreeNode predecessor(TreeNode root, TreeNode p) {\\n      if (root == null)\\n        return null;\\n    \\n      if (root.val >= p.val) {\\n        return predecessor(root.left, p);\\n      } else {\\n        TreeNode right = predecessor(root.right, p);\\n        return (right != null) ? right : root;\\n      }\\n    }"
		},
		{
			"lc_ans_id":"72656",
			"view":"13119",
			"top":"1",
			"title":"Java/Python solution, O(h) time and O(1) space, iterative",
			"vote":"188",
			"content":"The inorder traversal of a BST is the nodes in ascending order. To find a successor, you just need to find the  smallest one that is larger than the given value since there are no duplicate values in a BST. It just like the binary search in a sorted list. The time complexity should be `O(h)` where h is the depth of the result node. `succ` is a pointer that keeps the possible successor. Whenever you go left the current root is the new possible successor, otherwise the it remains the same.\\n\\nOnly in a balanced BST `O(h) = O(log n)`. In the worst case `h` can be as large as `n`.\\n\\n**Java**\\n\\n    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {\\n        TreeNode succ = null;\\n        while (root != null) {\\n            if (p.val < root.val) {\\n                succ = root;\\n                root = root.left;\\n            }\\n            else\\n                root = root.right;\\n        }\\n        return succ;\\n    }\\n\\n    // 29 / 29 test cases passed.\\n    // Status: Accepted\\n    // Runtime: 5 ms\\n\\n**Python**\\n\\n    def inorderSuccessor(self, root, p):\\n        succ = None\\n        while root:\\n            if p.val < root.val:\\n                succ = root\\n                root = root.left\\n            else:\\n                root = root.right\\n        return succ\\n\\n    # 29 / 29 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 112 ms"
		},
		{
			"lc_ans_id":"72662",
			"view":"6697",
			"top":"2",
			"title":"*Java* 5ms short code with explanations",
			"vote":"105",
			"content":"The idea is to compare `root`'s value with `p`'s value if `root` is not null, and consider the following two cases:\\n\\n - `root.val > p.val`. In this case, `root` can be a possible answer, so we store the root node first and call it `res`. However, we don't know if there is anymore node on `root`'s left that is larger than `p.val`. So we move root to its left and check again.\\n\\n - `root.val <= p.val`. In this case, `root` cannot be `p`'s inorder successor, neither can `root`'s left child. So we only need to consider `root`'s right child, thus we move root to its right and check again.\\n\\nWe continuously move `root` until exhausted. To this point, we only need to return the `res` in case 1.\\n\\nCode in Java:\\n\\n    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {\\n        TreeNode res = null;\\n        while(root!=null) {\\n\\t        if(root.val > p.val) {\\n\\t        \\tres = root;\\n\\t        \\troot = root.left;\\n\\t        }\\n\\t        else root = root.right;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"72671",
			"view":"2888",
			"top":"3",
			"title":"C++ O(h) solution in one pass",
			"vote":"26",
			"content":"    class Solution {\\n    public:\\n        TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {\\n            if (root == NULL || p == NULL) return NULL;\\n            \\n            TreeNode *suc = NULL;\\n            while (root != NULL) {\\n                if (root->val <= p->val) {\\n                    root = root->right;\\n                } else {\\n                    suc = root;\\n                    root = root->left;\\n                }\\n            }\\n            \\n            return suc;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"72721",
			"view":"5328",
			"top":"4",
			"title":"10 (and 4) lines O(h) Java/C++",
			"vote":"26",
			"content":"**Update:** Ugh, turns out I didn't think it through and the big case distinction is unnecessary. Just search from root to bottom, trying to find the smallest node larger than p and return the last one that was larger. D'oh. Props to [smileyogurt.966](https://leetcode.com/discuss/59918/c-o-h-solution-in-one-pass) for doing that first, I think. I'll just write it in my ternary style for C++:\\n\\n    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {\\n        TreeNode* candidate = NULL;\\n        while (root)\\n            root = (root->val > p->val) ? (candidate = root)->left : root->right;\\n        return candidate;\\n    }\\n\\n---\\n\\n**Old:** If `p` has a right subtree, then get its successor from there. Otherwise do a regular search from `root` to `p` but remember the node of the last left-turn and return that. Same solution as everyone, I guess, just written a bit shorter. Runtime O(h), where h is the height of the tree.\\n\\n**C++**\\n\\n    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {\\n        if (p->right) {\\n            p = p->right;\\n            while (p->left)\\n                p = p->left;\\n            return p;\\n        }\\n        TreeNode* candidate = NULL;\\n        while (root != p)\\n            root = (p->val > root->val) ? root->right : (candidate = root)->left;\\n        return candidate;\\n    }\\n\\n**Java**\\n\\n    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {\\n        if (p.right != null) {\\n            p = p.right;\\n            while (p.left != null)\\n                p = p.left;\\n            return p;\\n        }\\n        TreeNode candidate = null;\\n        while (root != p)\\n            root = (p.val > root.val) ? root.right : (candidate = root).left;\\n        return candidate;\\n    }"
		},
		{
			"lc_ans_id":"72652",
			"view":"2303",
			"top":"5",
			"title":"For those who is not so clear about inorder successors.",
			"vote":"19",
			"content":"Here is a good explaination I found:\\nhttp://stackoverflow.com/questions/5471731/in-order-successor-in-binary-search-tree\\n\\nIf you have right child, do this approach (case 1 above):\\n\\n![enter image description here][1]\\n\\nIf you don't have a right child, do this approach (case 2 above):\\n\\n![enter image description here][2]\\n\\n\\n\\n  [1]: http://i.stack.imgur.com/yxHBF.png\\n  [2]: http://i.stack.imgur.com/Dulhx.png"
		},
		{
			"lc_ans_id":"72741",
			"view":"781",
			"top":"6",
			"title":"C++ in 13 lines",
			"vote":"10",
			"content":"There are just two cases:\\n\\n 1. The easier one: `p` has right subtree, then its successor is just the leftmost child of its right subtree;\\n 2. The harder one: `p` has no right subtree, then a traversal is needed to find its successor.\\n\\n**Traversal**: we start from the `root`, each time we see a node with `val` larger than `p -> val`, we know this node may be `p`'s successor. So we record it in `suc`. Then we try to move to the next level of the tree: if `p -> val > root -> val`, which means `p` is in the right subtree, then its successor is also in the right subtree, so we update `root = root -> right`; if `p -> val < root -> val`, we update `root = root -> left` similarly; once we find `p -> val == root -> val`, we know we've reached at `p` and the current `suc` is just its successor.\\n\\nThe code is as follows. You may try some examples to see how it works :-)\\n\\n    class Solution {\\n    public:\\n        TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {\\n            if (p -> right) return leftMost(p -> right);\\n            TreeNode* suc = NULL;\\n            while (root) {\\n                if (p -> val < root -> val) {\\n                    suc = root;\\n                    root = root -> left;\\n                }\\n                else if (p -> val > root -> val)\\n                    root = root -> right; \\n                else break;\\n            }\\n            return suc;\\n        }\\n    private:\\n        TreeNode* leftMost(TreeNode* node) {\\n            while (node -> left) node = node -> left;\\n            return node;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"72654",
			"view":"1002",
			"top":"7",
			"title":"Java Iterative Solution, concise and easy to understand",
			"vote":"8",
			"content":"```\\npublic TreeNode inorderSuccessor(TreeNode root, TreeNode p) {\\n         TreeNode ret = null;\\n        while (root != null) {\\n            if (root.val <= p.val) {\\n                root = root.right;\\n            } else {\\n                ret = root;\\n                root = root.left;\\n            }\\n        }\\n        return ret;\\n}\\n```"
		},
		{
			"lc_ans_id":"72723",
			"view":"636",
			"top":"8",
			"title":"Python Short Recursive solution 4 lines",
			"vote":"5",
			"content":"    def inorderSuccessor(self, root, p):\\n        if not root: return None\\n        if root.val>p.val: return self.inorderSuccessor(root.left,p) or root \\n        return self.inorderSuccessor(root.right,p)"
		},
		{
			"lc_ans_id":"72724",
			"view":"806",
			"top":"9",
			"title":"Java recursive 5ms and iterative 6ms",
			"vote":"4",
			"content":"the iterative and recursive solutions are essentially doing the same thing: probing as much as we can to the left.\\n\\ntime complexity: O(logn); \\nspace complexity: O(1) for iterative, O(logn) for recursive\\n\\n    public class Solution {\\n        public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {\\n            return inorderSuccessorRecursive(root, p);\\n            //return inorderSuccessorIterative(root, p);\\n        }\\n        \\n        // 6ms\\n        public TreeNode inorderSuccessorIterative(TreeNode root, TreeNode p) {\\n            if (root == null || p == null) {\\n                return null;\\n            }\\n            TreeNode lastLarger = null;\\n            while (root != null) {\\n                if (p.val < root.val) {\\n                    lastLarger = root;\\n                    root = root.left;\\n                } else {\\n                    root = root.right;\\n                }\\n            }\\n            return lastLarger;\\n        }\\n        \\n        // 5ms\\n        public TreeNode inorderSuccessorRecursive(TreeNode root, TreeNode p) {\\n            if (root == null || p == null) {\\n                return null;\\n            }\\n            if (p.val < root.val) {\\n                TreeNode leftResult = inorderSuccessor(root.left, p);\\n                return leftResult == null ? root : leftResult;\\n            }\\n            return inorderSuccessor(root.right, p);\\n        }\\n    }"
		}
	],
	"id":"285",
	"title":"Inorder Successor in BST",
	"content":"<p>\r\nGiven a binary search tree and a node in it, find the in-order successor of that node in the BST.\r\n</p>\r\n\r\n<p>\r\n<b>Note</b>: If the given node has no in-order successor in the tree, return <code>null</code>.\r\n</p>",
	"frequency":"286",
	"ac_num":"51372"
}