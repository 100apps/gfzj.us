{
	"difficulty":"1",
	"submit_num":"90918",
	"show_id":"572",
	"leetcode_id":"572",
	"answers":[
		{
			"lc_ans_id":"102724",
			"view":"17278",
			"top":"0",
			"title":"Java Solution, tree traversal",
			"vote":"47",
			"content":"For each node during pre-order traversal of ```s```, use a recursive function ```isSame``` to validate if sub-tree started with this node is the same with ```t```.\\n```\\npublic class Solution {\\n    public boolean isSubtree(TreeNode s, TreeNode t) {\\n        if (s == null) return false;\\n        if (isSame(s, t)) return true;\\n        return isSubtree(s.left, t) || isSubtree(s.right, t);\\n    }\\n    \\n    private boolean isSame(TreeNode s, TreeNode t) {\\n        if (s == null && t == null) return true;\\n        if (s == null || t == null) return false;\\n        \\n        if (s.val != t.val) return false;\\n        \\n        return isSame(s.left, t.left) && isSame(s.right, t.right);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102760",
			"view":"8425",
			"top":"1",
			"title":"Easy O(n) java solution using preorder traversal",
			"vote":"27",
			"content":"```\\npublic class Solution {\\n public boolean isSubtree(TreeNode s, TreeNode t) {\\n        String spreorder = generatepreorderString(s); \\n        String tpreorder = generatepreorderString(t);\\n        \\n        return spreorder.contains(tpreorder) ;\\n    }\\n    public String generatepreorderString(TreeNode s){\\n        StringBuilder sb = new StringBuilder();\\n        Stack<TreeNode> stacktree = new Stack();\\n        stacktree.push(s);\\n        while(!stacktree.isEmpty()){\\n           TreeNode popelem = stacktree.pop();\\n           if(popelem==null)\\n              sb.append(\",#\"); // Appending # inorder to handle same values but not subtree cases\\n           else      \\n              sb.append(\",\"+popelem.val);\\n           if(popelem!=null){\\n                stacktree.push(popelem.right);    \\n                stacktree.push(popelem.left);  \\n           }\\n        }\\n        return sb.toString();\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"102741",
			"view":"5021",
			"top":"2",
			"title":"Python, Straightforward with Explanation (O(ST) and O(S+T) approaches)",
			"vote":"15",
			"content":"**Naive approach, O(|s| * |t|)**\\nFor each node of ```s```, let's check if it's subtree equals ```t```.  We can do that in a straightforward way by an ```isMatch``` function: check if ```s``` and ```t``` match at the values of their roots, plus their subtrees match.  Then, in our main function, we want to check if ```s``` and ```t``` match, or if ```t``` is a subtree of a child of ```s```.\\n\\n```\\ndef isMatch(self, s, t):\\n    if not(s and t):\\n        return s is t\\n    return (s.val == t.val and \\n            self.isMatch(s.left, t.left) and \\n            self.isMatch(s.right, t.right))\\n\\ndef isSubtree(self, s, t):\\n    if self.isMatch(s, t): return True\\n    if not s: return False\\n    return self.isSubtree(s.left, t) or self.isSubtree(s.right, t)\\n```\\n\\n**Advanced approach, O(|s| + |t|) (Merkle hashing):**\\nFor each node in a tree, we can create ```node.merkle```, a hash representing it's subtree.\\nThis hash is formed by hashing the concatenation of the merkle of the left child, the node's value, and the merkle of the right child.  Then, two trees are identical if and only if the merkle hash of their roots are equal (except when there is a hash collision.)  From there, finding the answer is straightforward: we simply check if any ```node``` in ```s``` has ```node.merkle == t.merkle```\\n\\n```\\ndef isSubtree(self, s, t):\\n    from hashlib import sha256\\n    def hash_(x):\\n        S = sha256()\\n        S.update(x)\\n        return S.hexdigest()\\n        \\n    def merkle(node):\\n        if not node:\\n            return '#'\\n        m_left = merkle(node.left)\\n        m_right = merkle(node.right)\\n        node.merkle = hash_(m_left + str(node.val) + m_right)\\n        return node.merkle\\n        \\n    merkle(s)\\n    merkle(t)\\n    def dfs(node):\\n        if not node:\\n            return False\\n        return (node.merkle == t.merkle or \\n                dfs(node.left) or dfs(node.right))\\n                    \\n    return dfs(s)\\n```"
		},
		{
			"lc_ans_id":"102736",
			"view":"4960",
			"top":"3",
			"title":"Java Concise O(n+m) Time O(n+m) Space",
			"vote":"13",
			"content":"```\\npublic boolean isSubtree(TreeNode s, TreeNode t) {\\n    return serialize(s).contains(serialize(t)); // Java uses a naive contains algorithm so to ensure linear time, \\n                                                // replace with KMP algorithm\\n}\\n\\npublic String serialize(TreeNode root) {\\n    StringBuilder res = new StringBuilder();\\n    serialize(root, res);\\n    return res.toString();\\n}\\n\\nprivate void serialize(TreeNode cur, StringBuilder res) {\\n    if (cur == null) {res.append(\",#\"); return;}\\n    res.append(\",\" + cur.val);\\n    serialize(cur.left, res);\\n    serialize(cur.right, res);\\n}\\n```"
		},
		{
			"lc_ans_id":"102734",
			"view":"2853",
			"top":"4",
			"title":"19ms C++ solution beats 99.9%",
			"vote":"9",
			"content":"Two trees are identical when they are recursively identical. Brute force solution would be recursively compare each node in s with t to check for identical. Better solution is to only compare nodes in `s` with the same max depth as `t`. First get max depth of `t`, then recursively check each node in `s`, if depth equals, push to a vector. Then compare each node in the vector with `t`.\\n\\n```\\nclass Solution {\\n    vector<TreeNode*> nodes;\\n\\npublic:\\n    bool isSubtree(TreeNode* s, TreeNode* t) {\\n        if (!s && !t) return true;\\n        if (!s || !t) return false;\\n\\n        getDepth(s, getDepth(t, -1));\\n\\n        for (TreeNode* n: nodes)\\n            if (identical(n, t))\\n                return true;\\n\\n        return false;\\n    }\\n\\n    int getDepth(TreeNode* r, int d) {\\n        if (!r)\\n            return -1;\\n\\n        int depth = max(getDepth(r->left, d), getDepth(r->right, d)) + 1;\\n\\n        // Check if depth equals required value\\n        // Require depth is -1 for tree t (only return the depth, no push)\\n        if (depth == d)\\n            nodes.push_back(r);\\n\\n        return depth;\\n    }\\n\\n    bool identical(TreeNode* a, TreeNode* b) {\\n        if (!a && !b) return true;\\n        if (!a || !b || a->val != b->val) return false;\\n\\n        return identical(a->left, b->left) && identical(a->right, b->right);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"102729",
			"view":"2467",
			"top":"5",
			"title":"Short Python by converting into strings",
			"vote":"6",
			"content":"Basically we convert our ```tree``` into ```string``` representation, then just check whether substring exists in target string.\\n```\\nclass Solution(object):\\n    def isSubtree(self, s, t):\\n        \"\"\"\\n        :type s: TreeNode\\n        :type t: TreeNode\\n        :rtype: bool\\n        \"\"\"\\n        def convert(p):\\n            return \"^\" + str(p.val) + \"#\" + convert(p.left) + convert(p.right) if p else \"$\"\\n        \\n        return convert(t) in convert(s)\\n```"
		},
		{
			"lc_ans_id":"102758",
			"view":"2461",
			"top":"6",
			"title":"[C++] [Java] Clean Code - 2 one liner",
			"vote":"5",
			"content":"**C++**\\n```\\nclass Solution {\\npublic:\\n    bool isSubtree(TreeNode* s, TreeNode* t) {\\n        return !t || s && (same(s, t) || isSubtree(s->left, t) || isSubtree(s->right, t));\\n    }\\n\\nprivate:\\n    bool isSameTree(TreeNode* s, TreeNode* t) {\\n        return !s ? !t : t && s->val == t->val && isSameTree(s->left, t->left) && isSameTree(s->right, t->right);\\n    }\\n};\\n```\\n\\nThere are other ways to implement the isSameTree\\n```\\n    bool same(TreeNode* s, TreeNode* t) {\\n        return (!s && !t) || (s && t) && (s->val == t->val) && same(s->left, t->left) && same(s->right, t->right);\\n    }\\n```\\n```\\n    bool same(TreeNode* s, TreeNode* t) {\\n        return (!s || !t) ? (s == t) : (s->val == t->val) && same(s->left, t->left) && same(s->right, t->right);\\n```\\n\\n**Java**\\n```\\npublic class Solution {\\n    public boolean isSubtree(TreeNode s, TreeNode t) {\\n        return t == null || s != null && (same(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t));\\n    }\\n\\n    private boolean same(TreeNode s, TreeNode t) {\\n        return s == null ? t == null : t != null && s.val == t.val && same(s.left, t.left) && same(s.right, t.right);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102767",
			"view":"189",
			"top":"7",
			"title":"c++ recursive",
			"vote":"3",
			"content":"referred from https://discuss.leetcode.com/topic/88508/java-solution-tree-traversal\\n\\n```\\n/**\\n * Definition for a binary tree node.\\n * struct TreeNode {\\n *     int val;\\n *     TreeNode *left;\\n *     TreeNode *right;\\n *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\\n * };\\n */\\nclass Solution {\\npublic:\\n    bool isSubtree(TreeNode* s, TreeNode* t) {\\n        \\n        if(!s) return false;\\n        if (isSame(s,t)) return true;\\n        \\n        return isSubtree(s->left,t) || isSubtree(s->right,t);\\n        \\n    }\\n    bool isSame(TreeNode *s, TreeNode *t)\\n    {\\n        if (!s && !t) return true;\\n        if (!s || !t) return false;\\n        if (s->val != t->val) return false;\\n        \\n        return isSame(s->left, t->left) && isSame(s->right, t->right);\\n        \\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"102802",
			"view":"230",
			"top":"8",
			"title":"My incorrect solution that didn't cover a case got accepted",
			"vote":"2",
			"content":"For the following two trees:\\n\\n```\\n[4,1,null,null,2]\\n[1,null,4,2]\\n```\\n\\nMy code gives `True` but in actual fact the expected value in Python 2 is `False`. My code that doesn't handle this case got accepted anyway.\\n\\nEDIT: I found that in Java, the expected value is `True`; there is some inconsistency.\\n\\n```\\nclass Solution(object):\\n    def isSubtree(self, s, t):\\n        \"\"\"\\n        :type s: TreeNode\\n        :type t: TreeNode\\n        :rtype: bool\\n        \"\"\"\\n        def serialize(node):\\n            if not node:\\n                return '#'\\n            return serialize(node.left) + str(node.val) + serialize(node.right)\\n        serialized_t = serialize(t)\\n        exists = [False]\\n        def traverse(node):\\n            if not node:\\n                return '#'\\n            serialized_tree = traverse(node.left) + str(node.val) + traverse(node.right)\\n            if serialized_tree == serialized_t:\\n                exists[0] = True\\n            return serialized_tree\\n        traverse(s)\\n        return exists[0]\\n```\\n\\nThe reason is that I used in-order traversal which does not guarantee a unique serialization of the tree. \\n\\nI have reported this missing test case."
		},
		{
			"lc_ans_id":"102756",
			"view":"77",
			"top":"9",
			"title":"JAVA Solution",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n\\tpublic boolean isSubtree(TreeNode s, TreeNode t) {\\n\\t\\treturn isSub(s, t, 1);\\n\\t}\\n\\n\\tprivate boolean isSub(TreeNode s, TreeNode t, int i) {\\n\\t\\tif (s == null && t == null)\\n\\t\\t\\treturn true;\\n\\t\\tif (s == null || t == null)\\n\\t\\t\\treturn false;\\n\\t\\tif (s.val == t.val)\\n\\t\\t\\tif (isSub(s.left, t.left, 0) && isSub(s.right, t.right, 0))\\n\\t\\t\\t\\treturn true;\\n\\t\\tif (i == 0)\\n\\t\\t\\treturn false;\\n\\t\\treturn isSub(s.left, t, 1) || isSub(s.right, t, 1);\\n\\t}\\n}\\n```"
		}
	],
	"id":"553",
	"title":"Subtree of Another Tree",
	"content":"<p>\r\nGiven two non-empty binary trees <b>s</b> and <b>t</b>, check whether tree <b>t</b> has exactly the same structure and node values with a subtree of <b>s</b>. A subtree of <b>s</b> is a tree consists of a node in <b>s</b> and all of this node's descendants. The tree <b>s</b> could also be considered as a subtree of itself.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br>\r\n\r\nGiven tree s:\r\n<pre>\r\n     3\r\n    / \\\r\n   4   5\r\n  / \\\r\n 1   2\r\n</pre>\r\nGiven tree t:\r\n<pre>\r\n   4 \r\n  / \\\r\n 1   2\r\n</pre>\r\nReturn <b>true</b>, because t has the same structure and node values with a subtree of s.\r\n</p>\r\n\r\n<p><b>Example 2:</b><br>\r\n\r\nGiven tree s:\r\n<pre>\r\n     3\r\n    / \\\r\n   4   5\r\n  / \\\r\n 1   2\r\n    /\r\n   0\r\n</pre>\r\nGiven tree t:\r\n<pre>\r\n   4\r\n  / \\\r\n 1   2\r\n</pre>\r\nReturn <b>false</b>.\r\n</p>",
	"frequency":"208",
	"ac_num":"37045"
}