{
	"difficulty":"2",
	"submit_num":"484839",
	"show_id":"236",
	"leetcode_id":"236",
	"answers":[
		{
			"lc_ans_id":"65225",
			"view":"74720",
			"top":"0",
			"title":"4 lines C++/Java/Python/Ruby",
			"vote":"348",
			"content":"Same solution in several languages. It's recursive and expands the meaning of the function. If the current (sub)tree contains both p and q, then the function result is their LCA. If only one of them is in that subtree, then the result is that one of them. If neither are in that subtree, the result is null/None/nil.\\n\\nUpdate: I also wrote [two iterative solutions](https://leetcode.com/discuss/45603/iterative-solution) now, one of them being a version of the solution here. They're more complicated than this simple recursive solution, but I do find them interesting.\\n\\n---\\n\\n**C++**\\n\\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\\n        if (!root || root == p || root == q) return root;\\n        TreeNode* left = lowestCommonAncestor(root->left, p, q);\\n        TreeNode* right = lowestCommonAncestor(root->right, p, q);\\n        return !left ? right : !right ? left : root;\\n    }\\n\\n---\\n\\n**Python**\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        if root in (None, p, q): return root\\n        left, right = (self.lowestCommonAncestor(kid, p, q)\\n                       for kid in (root.left, root.right))\\n        return root if left and right else left or right\\n\\nOr using that `None` is considered smaller than any node:\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        if root in (None, p, q): return root\\n        subs = [self.lowestCommonAncestor(kid, p, q)\\n                for kid in (root.left, root.right)]\\n        return root if all(subs) else max(subs)\\n\\n---\\n\\n**Ruby**\\n\\n    def lowest_common_ancestor(root, p, q)\\n        return root if [nil, p, q].index root\\n        left = lowest_common_ancestor(root.left, p, q)\\n        right = lowest_common_ancestor(root.right, p, q)\\n        left && right ? root : left || right\\n    end\\n\\n---\\n\\n**Java**\\n\\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n        if (root == null || root == p || root == q) return root;\\n        TreeNode left = lowestCommonAncestor(root.left, p, q);\\n        TreeNode right = lowestCommonAncestor(root.right, p, q);\\n        return left == null ? right : right == null ? left : root;\\n    }"
		},
		{
			"lc_ans_id":"65226",
			"view":"37703",
			"top":"1",
			"title":"My Java Solution which is easy to understand",
			"vote":"118",
			"content":"    public class Solution {\\n        public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n            if(root == null || root == p || root == q)  return root;\\n            TreeNode left = lowestCommonAncestor(root.left, p, q);\\n            TreeNode right = lowestCommonAncestor(root.right, p, q);\\n            if(left != null && right != null)   return root;\\n            return left != null ? left : right;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"65236",
			"view":"20179",
			"top":"2",
			"title":"Java/Python iterative solution",
			"vote":"113",
			"content":"**Python**\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        stack = [root]\\n        parent = {root: None}\\n        while p not in parent or q not in parent:\\n            node = stack.pop()\\n            if node.left:\\n                parent[node.left] = node\\n                stack.append(node.left)\\n            if node.right:\\n                parent[node.right] = node\\n                stack.append(node.right)\\n        ancestors = set()\\n        while p:\\n            ancestors.add(p)\\n            p = parent[p]\\n        while q not in ancestors:\\n            q = parent[q]\\n        return q\\n\\n    # 31 / 31 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 108 ms\\n    # 99.14%\\n\\n\\n**Java**\\n\\n    public class Solution {\\n        public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n            Map<TreeNode, TreeNode> parent = new HashMap<>();\\n            Deque<TreeNode> stack = new ArrayDeque<>();\\n            parent.put(root, null);\\n            stack.push(root);\\n    \\n            while (!parent.containsKey(p) || !parent.containsKey(q)) {\\n                TreeNode node = stack.pop();\\n                if (node.left != null) {\\n                    parent.put(node.left, node);\\n                    stack.push(node.left);\\n                }\\n                if (node.right != null) {\\n                    parent.put(node.right, node);\\n                    stack.push(node.right);\\n                }\\n            }\\n            Set<TreeNode> ancestors = new HashSet<>();\\n            while (p != null) {\\n                ancestors.add(p);\\n                p = parent.get(p);\\n            }\\n            while (!ancestors.contains(q))\\n                q = parent.get(q);\\n            return q;\\n        }\\n    }\\n\\nTo find the lowest common ancestor, we need to find where is `p` and `q` and a way to track their ancestors. A `parent` pointer for each node found is good for the job. After we found both `p` and `q`, we create a set of `p`'s `ancestors`. Then we travel through `q`'s `ancestors`, the first one appears in `p`'s is our answer."
		},
		{
			"lc_ans_id":"65245",
			"view":"17753",
			"top":"3",
			"title":"Iterative Solutions in Python/C++",
			"vote":"36",
			"content":"**Solution 1**\\n\\nSame algorithm as [my recursive solution](https://leetcode.com/discuss/45386/4-lines-c-java-python-ruby) (look there if you want some explanation), but iterative. I do a post-order traversal with a stack. Each stack element at first is a [node, parent] pair, where parent is the stack element of the node's parent node. When the children of a parent get finished, their results are appended to their parent's stack element. So when a parent gets finished, we have the results of its children/subtrees available (its stack element at that point is [node, parent, resultForLeftSubtree, resultForRightSubtree]).\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        answer = []\\n        stack = [[root, answer]]\\n        while stack:\\n            top = stack.pop()\\n            (node, parent), subs = top[:2], top[2:]\\n            if node in (None, p, q):\\n                parent += node,\\n            elif not subs:\\n                stack += top, [node.right, top], [node.left, top]\\n            else:\\n                parent += node if all(subs) else max(subs),\\n        return answer[0]\\n\\n---\\n\\n**Solution 2**\\n\\nHere I find the paths to p and q and then find the last node where the paths match. I just came up with the path-building technique for this, and I find it quite neat and maybe it could be useful elsewhere.\\n\\n    def lowestCommonAncestor(self, root, p, q):\\n        def path(root, goal):\\n            path, stack = [], [root]\\n            while True:\\n                node = stack.pop()\\n                if node:\\n                    if node not in path[-1:]:\\n                        path += node,\\n                        if node == goal:\\n                            return path\\n                        stack += node, node.right, node.left\\n                    else:\\n                        path.pop()\\n        return next(a for a, b in zip(path(root, p), path(root, q))[::-1] if a == b)\\n\\n---\\n\\n**C++ version of Solution 1**\\n\\nI don't use C++ much, so maybe there's room for improvement with stuff that I don't know.\\n\\n    class Solution {\\n        struct Frame {\\n            TreeNode* node;\\n            Frame* parent;\\n            vector<TreeNode*> subs;\\n        };\\n    public:\\n        TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\\n            Frame answer;\\n            stack<Frame> stack;\\n            stack.push({root, &answer});\\n            while (stack.size()) {\\n                Frame *top = &stack.top(), *parent = top->parent;\\n                TreeNode *node = top->node;\\n                if (!node || node == p || node == q) {\\n                    parent->subs.push_back(node);\\n                    stack.pop();\\n                } else if (top->subs.empty()) {\\n                    stack.push({node->right, top});\\n                    stack.push({node->left, top});\\n                } else {\\n                    TreeNode *left = top->subs[0], *right = top->subs[1];\\n                    parent->subs.push_back(!left ? right : !right ? left : node);\\n                    stack.pop();\\n                }\\n            }\\n            return answer.subs[0];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"65228",
			"view":"10040",
			"top":"4",
			"title":"5 lines Java solution",
			"vote":"30",
			"content":"    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n        if(root == null) return null;\\n        if(root == p || root == q) return root;\\n        TreeNode left = lowestCommonAncestor(root.left, p, q);\\n        TreeNode right = lowestCommonAncestor(root.right, p, q);\\n        return left != null && right != null ? root : left == null ? right : left; \\n    }"
		},
		{
			"lc_ans_id":"65375",
			"view":"3740",
			"top":"5",
			"title":"Very simple dfs c++ solution , only 10 lines",
			"vote":"28",
			"content":"    TreeNode * dfsTraverse(TreeNode * root, TreeNode * p , TreeNode * q)\\n    {\\n        if( root == p || root == q || root == NULL)\\n            return root;\\n        TreeNode * parent1 = dfsTraverse(root->left, p, q);\\n        TreeNode * parent2 = dfsTraverse(root->right, p, q);\\n        if( parent1 && parent2)\\n            return root;\\n        else\\n            return parent1 ? parent1:parent2;\\n    }\\n    TreeNode * lowestCommonAncestor(TreeNode * root, TreeNode * p, TreeNode * q)\\n    {\\n        return dfsTraverse(root, p, q);\\n    }"
		},
		{
			"lc_ans_id":"65404",
			"view":"5775",
			"top":"6",
			"title":"Accepted 24ms DFS c++ solution, only 3 lines.",
			"vote":"25",
			"content":"    class Solution {\\n    public:\\n\\t    TreeNode *lowestCommonAncestor(TreeNode *root, TreeNode *p, TreeNode *q) {\\n\\t\\t    if (root == p || root == q || root == NULL) return root;\\n\\t\\t    TreeNode *left = lowestCommonAncestor(root->left, p, q), *right = lowestCommonAncestor(root->right, p, q);\\n\\t\\t    return left && right ? root : left ? left : right;\\n\\t    }\\n    };"
		},
		{
			"lc_ans_id":"65227",
			"view":"6150",
			"top":"7",
			"title":"10-line Java solution, solved in one traversal",
			"vote":"20",
			"content":"    public class Solution {\\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\\n        if(root == null){\\n            return null;\\n        }\\n        \\n        if(root == p || root == q){\\n            return root;\\n        }\\n        \\n        TreeNode l = lowestCommonAncestor(root.left,p,q);\\n        TreeNode r = lowestCommonAncestor(root.right,p,q);\\n        \\n        if(l != null && r != null){\\n            return root;\\n        }\\n        \\n        return l != null ? l:r;\\n \\n    }\\n}\\n\\n\\n\\nA modified version of pre-order traversal. The point to understand this is, once a sub-branch has a possible ancestor, all its super branches will have the same one."
		},
		{
			"lc_ans_id":"65281",
			"view":"2352",
			"top":"8",
			"title":"IMPORTANT NOTE: the given two nodes is in the tree",
			"vote":"18",
			"content":"Note that the problem description said that \" two given nodes in the tree.\" So the parameters `p` and `q` are node references in the tree. \\n\\nUse \\n\\n`if (root == p)` instead of  `if(root.val == p.val)`"
		},
		{
			"lc_ans_id":"65369",
			"view":"3433",
			"top":"9",
			"title":"Short and clean C++ solution",
			"vote":"18",
			"content":"Want to share my solution.\\n\\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\\n        \\n        if (!root || !p || !q) {\\n            return NULL;\\n        }\\n        \\n        if (root == p || root == q) {\\n            return root;\\n        }\\n        \\n        TreeNode* l = lowestCommonAncestor(root->left, p, q);\\n        TreeNode* r = lowestCommonAncestor(root->right, p, q);\\n        \\n        if (l && r) {\\n            return root;\\n        }\\n        \\n        return l? l : r;\\n    }"
		}
	],
	"id":"236",
	"title":"Lowest Common Ancestor of a Binary Tree",
	"content":"<p>\nGiven a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.\n</p>\n\n<p>\nAccording to the <a href=\"https://en.wikipedia.org/wiki/Lowest_common_ancestor\" target=\"_blank\">definition of LCA on Wikipedia</a>: “The lowest common ancestor is defined between two nodes v and w as the lowest node in T that has both v and w as descendants (where we allow <b>a node to be a descendant of itself</b>).”\n</p>\n\n<pre>\n        _______3______\n       /              \\\n    ___5__          ___1__\n   /      \\        /      \\\n   6      _2       0       8\n         /  \\\n         7   4\n</pre>\n\n<p>\nFor example, the lowest common ancestor (LCA) of nodes <code>5</code> and <code>1</code> is <code>3</code>. Another example is LCA of nodes <code>5</code> and <code>4</code> is <code>5</code>, since a node can be a descendant of itself according to the LCA definition.</p>",
	"frequency":"445",
	"ac_num":"145407"
}