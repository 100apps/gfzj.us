{
	"difficulty":"1",
	"submit_num":"450726",
	"show_id":"235",
	"leetcode_id":"235",
	"answers":[
		{
			"lc_ans_id":"64963",
			"view":"43594",
			"top":"0",
			"title":"3 lines with O(1) space, 1-Liners, Alternatives",
			"vote":"269",
			"content":"Just walk down from the whole tree's root as long as both p and q are in the same subtree (meaning their values are both smaller or both larger than root's). This walks straight from the root to the LCA, not looking at the rest of the tree, so it's pretty much as fast as it gets. A few ways to do it:\\n\\n**Iterative, O(1) space**\\n\\nPython\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        while (root.val - p.val) * (root.val - q.val) > 0:\\n            root = (root.left, root.right)[p.val > root.val]\\n        return root\\n\\nJava\\n\\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n        while ((root.val - p.val) * (root.val - q.val) > 0)\\n            root = p.val < root.val ? root.left : root.right;\\n        return root;\\n    }\\n\\n(in case of overflow, I'd do `(root.val - (long)p.val) * (root.val - (long)q.val)`)\\n\\nDifferent Python\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        a, b = sorted([p.val, q.val])\\n        while not a <= root.val <= b:\\n            root = (root.left, root.right)[a > root.val]\\n        return root\\n\\n\"Long\" Python, maybe easiest to understand\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        while root:\\n            if p.val < root.val > q.val:\\n                root = root.left\\n            elif p.val > root.val < q.val:\\n                root = root.right\\n            else:\\n                return root\\n\\n**Recursive**\\n\\nPython\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        next = p.val < root.val > q.val and root.left or \\\\\\n               p.val > root.val < q.val and root.right\\n        return self.lowestCommonAncestor(next, p, q) if next else root\\n\\nPython One-Liner\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        return root if (root.val - p.val) * (root.val - q.val) < 1 else \\\\\\n               self.lowestCommonAncestor((root.left, root.right)[p.val > root.val], p, q)\\n\\nJava One-Liner\\n\\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n        return (root.val - p.val) * (root.val - q.val) < 1 ? root :\\n               lowestCommonAncestor(p.val < root.val ? root.left : root.right, p, q);\\n    }\\n\\n\"Long\" Python, maybe easiest to understand\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        if p.val < root.val > q.val:\\n            return self.lowestCommonAncestor(root.left, p, q)\\n        if p.val > root.val < q.val:\\n            return self.lowestCommonAncestor(root.right, p, q)\\n        return root"
		},
		{
			"lc_ans_id":"64954",
			"view":"24924",
			"top":"1",
			"title":"My Java Solution",
			"vote":"109",
			"content":"    public class Solution {\\n        public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n            if(root.val > p.val && root.val > q.val){\\n                return lowestCommonAncestor(root.left, p, q);\\n            }else if(root.val < p.val && root.val < q.val){\\n                return lowestCommonAncestor(root.right, p, q);\\n            }else{\\n                return root;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"64980",
			"view":"13514",
			"top":"2",
			"title":"Easy C++ Recursive and Iterative Solutions",
			"vote":"83",
			"content":"Well, remember to take advantage of the property of binary search trees, which is, `node -> left -> val < node -> val < node -> right -> val`. Moreover, both `p` and `q` will be the descendants of the `root` of the subtree that contains both of them. And the `root` with the largest depth is just the lowest common ancestor. This idea can be turned into the following simple recursive code.\\n\\n    class Solution {\\n    public:\\n        TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\\n            if (p -> val < root -> val && q -> val < root -> val)\\n                return lowestCommonAncestor(root -> left, p, q);\\n            if (p -> val > root -> val && q -> val > root -> val)\\n                return lowestCommonAncestor(root -> right, p, q);\\n            return root;\\n        }\\n    };\\n\\nOf course, we can also solve it iteratively.\\n\\n    class Solution { \\n    public:\\n        TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\\n            TreeNode* cur = root;\\n            while (true) {\\n                if (p -> val < cur -> val && q -> val < cur -> val)\\n                    cur = cur -> left;\\n                else if (p -> val > cur -> val && q -> val > cur -> val)\\n                    cur = cur -> right;\\n                else return cur; \\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"65008",
			"view":"5492",
			"top":"3",
			"title":"11ms java solution, 3 lines",
			"vote":"18",
			"content":"     public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n        if(root.val<Math.min(p.val,q.val)) return lowestCommonAncestor(root.right,p,q);\\n        if(root.val>Math.max(p.val,q.val)) return lowestCommonAncestor(root.left,p,q);\\n        return root;\\n    }"
		},
		{
			"lc_ans_id":"64955",
			"view":"3890",
			"top":"4",
			"title":"Clear Java 10 ms",
			"vote":"16",
			"content":"    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n        if(root==null) return null;\\n        if(p.val<root.val&&q.val<root.val) {\\n            return lowestCommonAncestor(root.left,p,q);\\n        }\\n        else if(p.val>root.val&&q.val>root.val){\\n            return lowestCommonAncestor(root.right,p,q);\\n        }\\n        else\\n        return root;\\n    }"
		},
		{
			"lc_ans_id":"65074",
			"view":"2964",
			"top":"5",
			"title":"Python Iterative Solution",
			"vote":"16",
			"content":"    class Solution:\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        while root:\\n            if root.val > p.val and root.val > q.val:\\n                root = root.left\\n            elif root.val < p.val and root.val < q.val:\\n                root = root.right\\n            else:\\n                return root"
		},
		{
			"lc_ans_id":"65091",
			"view":"1353",
			"top":"6",
			"title":"My java solution to share",
			"vote":"15",
			"content":"public class Solution {\\n\\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n        if(p.val>q.val)\\n            return lowestCommonAncestor(root, q,p);\\n        if(root.val>= p.val && root.val<=q.val)\\n            return root;\\n        return lowestCommonAncestor(root.val>p.val?root.left:root.right, p,q);    \\n    }\\n\\n}"
		},
		{
			"lc_ans_id":"65019",
			"view":"2857",
			"top":"7",
			"title":"3-lines Java concise and easy understanding solution",
			"vote":"15",
			"content":"        if(root.val > p.val && root.val > q.val) return lowestCommonAncestor(root.left, p, q);\\n        else if(root.val < p.val && root.val < q.val) return lowestCommonAncestor(root.right, p, q);\\n        else return root;"
		},
		{
			"lc_ans_id":"65051",
			"view":"2872",
			"top":"8",
			"title":"C++ solution . 40ms",
			"vote":"14",
			"content":"    /**\\n     * Definition for a binary tree node.\\n     * struct TreeNode {\\n     *     int val;\\n     *     TreeNode *left;\\n     *     TreeNode *right;\\n     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\\n     * };\\n     */\\n    class Solution {\\n    public:\\n        TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\\n            if(!root){\\n                return NULL;\\n            }\\n            // check if the current value is larger than both nodes , go left\\n            if(p->val < root->val && q->val < root->val){\\n                lowestCommonAncestor(root->left , p , q);\\n             // go right\\n            }else if(p->val > root->val && q->val > root->val){\\n                lowestCommonAncestor(root->right , p , q);\\n            }// my LCA \\n            else{\\n                return root;\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"65093",
			"view":"1137",
			"top":"9",
			"title":"Simple Java Solution",
			"vote":"13",
			"content":"    If the given both nodes values are less than that of root, then both the nodes must be on the left side of the root , so now we have to check only left tree of the root.\\n    Otherwise If the given both nodes values are greater than that of root, then both the nodes must be on the right side of the root , so now we have to check only right tree of the root.\\n    Otherwise . both the nodes will be on the either side of the root, this implies the lowest common ancestor is root.\\n    \\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n            if(p.val < root.val && q.val < root.val){\\n            return lowestCommonAncestor(root.left,p,q);}\\n            else if(p.val > root.val && q.val > root.val){\\n            return lowestCommonAncestor(root.right,p,q);}\\n            else{\\n            return root;}\\n        }"
		}
	],
	"id":"235",
	"title":"Lowest Common Ancestor of a Binary Search Tree",
	"content":"<p>\nGiven a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.\n</p>\n\n<p>\nAccording to the <a href=\"https://en.wikipedia.org/wiki/Lowest_common_ancestor\" target=\"_blank\">definition of LCA on Wikipedia</a>: “The lowest common ancestor is defined between two nodes v and w as the lowest node in T that has both v and w as descendants (where we allow <b>a node to be a descendant of itself</b>).”\n</p>\n\n<pre>\n        _______6______\n       /              \\\n    ___2__          ___8__\n   /      \\        /      \\\n   0      _4       7       9\n         /  \\\n         3   5\n</pre>\n\n<p>\nFor example, the lowest common ancestor (LCA) of nodes <code>2</code> and <code>8</code> is <code>6</code>. Another example is LCA of nodes <code>2</code> and <code>4</code> is <code>2</code>, since a node can be a descendant of itself according to the LCA definition.</p>",
	"frequency":"502",
	"ac_num":"178616"
}