{
	"difficulty":"1",
	"submit_num":"519045",
	"show_id":"100",
	"leetcode_id":"100",
	"answers":[
		{
			"lc_ans_id":"32687",
			"view":"28861",
			"top":"0",
			"title":"Five line Java solution with recursion",
			"vote":"85",
			"content":"    public boolean isSameTree(TreeNode p, TreeNode q) {\\n        if(p == null && q == null) return true;\\n        if(p == null || q == null) return false;\\n        if(p.val == q.val)\\n            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"32685",
			"view":"10515",
			"top":"1",
			"title":"Here's a C++ recursion solution in minimal lines of code",
			"vote":"58",
			"content":"    //\\n    // Algorithm for the recursion:\\n    // 1)\\n    // If one of the node is NULL then return the equality result of p an q.\\n    // This boils down to if both are NULL then return true, \\n    // but if one of them is NULL but not the other one then return false\\n    // 2)\\n    // At this point both root nodes represent valid pointers.\\n    // Return true if the root nodes have same value and \\n    // the left tree of the roots are same (recursion)\\n    // and the right tree of the roots are same (recursion). \\n    // Otherwise return false. \\n    //\\n    \\n    bool isSameTree(TreeNode *p, TreeNode *q) {\\n        if (p == NULL || q == NULL) return (p == q);\\n        return (p->val == q->val && isSameTree(p->left, q->left) && isSameTree(p->right, q->right));\\n    }"
		},
		{
			"lc_ans_id":"32684",
			"view":"13277",
			"top":"2",
			"title":"My non-recursive method",
			"vote":"53",
			"content":"the idea is to use stack for preorder traverse \\n\\n    public boolean isSameTree(TreeNode p, TreeNode q) {\\n    \\t     Stack<TreeNode> stack_p = new Stack <> ();       \\n    \\t     Stack<TreeNode> stack_q = new Stack <> ();\\n    \\t     if (p != null) stack_p.push( p ) ;\\n    \\t     if (q != null) stack_q.push( q ) ;\\n    \\t     while (!stack_p.isEmpty() && !stack_q.isEmpty()) {\\n    \\t    \\t TreeNode pn = stack_p.pop() ;\\n    \\t    \\t TreeNode qn = stack_q.pop() ;\\t    \\t\\n    \\t    \\t if (pn.val != qn.val) return false ;\\n    \\t    \\t if (pn.right != null) stack_p.push(pn.right) ;\\n    \\t    \\t if (qn.right != null) stack_q.push(qn.right) ;\\n    \\t    \\t if (stack_p.size() != stack_q.size()) return false ;\\n    \\t    \\t if (pn.left != null) stack_p.push(pn.left) ;\\t    \\t \\t    \\t \\n    \\t    \\t if (qn.left != null) stack_q.push(qn.left) ;\\n    \\t    \\t if (stack_p.size() != stack_q.size()) return false ;\\n    \\t     }\\t\\t     \\n    \\t     return stack_p.size() == stack_q.size() ;\\t \\n    \\t }"
		},
		{
			"lc_ans_id":"32729",
			"view":"8837",
			"top":"3",
			"title":"Shortest+simplest Python",
			"vote":"30",
			"content":"The \"proper\" way:\\n\\n    def isSameTree(self, p, q):\\n        if p and q:\\n            return p.val == q.val and self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)\\n        return p is q\\n\\nThe \"tupleify\" way:\\n\\n    def isSameTree(self, p, q):\\n        def t(n):\\n            return n and (n.val, t(n.left), t(n.right))\\n        return t(p) == t(q)\\n\\nThe first way as one-liner:\\n\\n    def isSameTree(self, p, q):\\n        return p and q and p.val == q.val and all(map(self.isSameTree, (p.left, p.right), (q.left, q.right))) or p is q"
		},
		{
			"lc_ans_id":"32721",
			"view":"6954",
			"top":"4",
			"title":"2 Lines Java Code",
			"vote":"19",
			"content":"    public class Solution {\\n        public boolean isSameTree(TreeNode p, TreeNode q) {\\n            if (p == null && q == null) return true;\\n            return p != null && q != null && p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\\n        } }"
		},
		{
			"lc_ans_id":"32926",
			"view":"1601",
			"top":"5",
			"title":"2 lines C++ simple solution, easy understanding",
			"vote":"18",
			"content":"    bool isSameTree(TreeNode* p, TreeNode* q) {\\n        if (!p || !q) return q == p;\\n        return p->val == q->val && isSameTree(p->left, q->left) && isSameTree(p->right, q->right);\\n    }"
		},
		{
			"lc_ans_id":"32733",
			"view":"2448",
			"top":"6",
			"title":"Simple java solution, both recurison and iteration",
			"vote":"18",
			"content":"\\n    public boolean isSameTree(TreeNode p, TreeNode q) {\\n        // recurision method\\n        if (p == null && q == null) return true;\\n        if (p == null && q != null || p != null && q == null) return false;\\n        if (p.val != q.val) return false;\\n        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\\n    }\\n\\n\\n----------\\n\\n    public boolean isSameTree(TreeNode p, TreeNode q) {\\n        // iteration method\\n        if (p == null && q == null) return true;\\n        if (p == null && q != null || p != null && q == null) return false;\\n        Stack<TreeNode> stackP = new Stack<>();\\n        Stack<TreeNode> stackQ = new Stack<>();\\n        stackP.add(p);\\n        stackQ.add(q);\\n        while (!stackP.isEmpty() && !stackQ.isEmpty()) {\\n            TreeNode tmpP = stackP.pop();\\n            TreeNode tmpQ = stackQ.pop();\\n            if (tmpP.val != tmpQ.val) return false;\\n            if (tmpP.left != null && tmpQ.left != null) {\\n                stackP.push(tmpP.left);\\n                stackQ.push(tmpQ.left);\\n            } else if (tmpP.left == null && tmpQ.left == null) {\\n            } else {\\n                return false;\\n            }\\n            if (tmpP.right != null && tmpQ.right != null) {\\n                stackP.push(tmpP.right);\\n                stackQ.push(tmpQ.right);\\n            } else if (tmpP.right == null && tmpQ.right == null) {\\n            } else {\\n                return false;\\n            }\\n        }\\n        if (!stackP.isEmpty() || !stackQ.isEmpty()) return false;\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"32856",
			"view":"2181",
			"top":"7",
			"title":"3 lines Java solution",
			"vote":"14",
			"content":"    public boolean isSameTree(TreeNode p, TreeNode q) {\\n        if(p==null && q==null) return true;\\n        if(p==null || q==null) return false;\\n        return (p.val==q.val) && isSameTree(p.left,q.left) && isSameTree(p.right,q.right);\\n    }\\n\\nrecursion"
		},
		{
			"lc_ans_id":"32894",
			"view":"1902",
			"top":"8",
			"title":"Python Recursive solution and DFS Iterative solution with stack and BFS Iterative solution with queue",
			"vote":"13",
			"content":"    def isSameTree1(self, p, q):\\n        if p and q:\\n            return p.val == q.val and self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)\\n        else:\\n            return p == q\\n    \\n    # DFS with stack        \\n    def isSameTree2(self, p, q):\\n        stack = [(p, q)]\\n        while stack:\\n            node1, node2 = stack.pop()\\n            if not node1 and not node2:\\n                continue\\n            elif None in [node1, node2]:\\n                return False\\n            else:\\n                if node1.val != node2.val:\\n                    return False\\n                stack.append((node1.right, node2.right))\\n                stack.append((node1.left, node2.left))\\n        return True\\n     \\n    # BFS with queue    \\n    def isSameTree3(self, p, q):\\n        queue = [(p, q)]\\n        while queue:\\n            node1, node2 = queue.pop(0)\\n            if not node1 and not node2:\\n                continue\\n            elif None in [node1, node2]:\\n                return False\\n            else:\\n                if node1.val != node2.val:\\n                    return False\\n                queue.append((node1.left, node2.left))\\n                queue.append((node1.right, node2.right))\\n        return True"
		},
		{
			"lc_ans_id":"32969",
			"view":"909",
			"top":"9",
			"title":"Three lines Java Solution",
			"vote":"12",
			"content":"public class Same_Tree {\\n\\n    public boolean isSameTree(TreeNode p, TreeNode q) {\\n        if (p == null || q == null) return p == q; // if they are null at the same time\\n\\n        if (p.val != q.val) return false;\\n\\n        return isSameTree(p.right, q.right) && isSameTree(p.left, q.left);\\n    }\\n}"
		}
	],
	"id":"100",
	"title":"Same Tree",
	"content":"<p>\r\nGiven two binary trees, write a function to check if they are the same or not.\r\n</p>\r\n\r\n<p>Two binary trees are considered the same if they are structurally identical and the nodes have the same value.\r\n</p>\r\n\r\n<br />\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b>     1         1\r\n          / \\       / \\\r\n         2   3     2   3\r\n\r\n        [1,2,3],   [1,2,3]\r\n\r\n<b>Output:</b> true\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b>     1         1\r\n          /           \\\r\n         2             2\r\n\r\n        [1,2],     [1,null,2]\r\n\r\n<b>Output:</b> false\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b>\r\n<pre>\r\n<b>Input:</b>     1         1\r\n          / \\       / \\\r\n         2   1     1   2\r\n\r\n        [1,2,1],   [1,1,2]\r\n\r\n<b>Output:</b> false\r\n</pre>\r\n</p>",
	"frequency":"525",
	"ac_num":"245996"
}