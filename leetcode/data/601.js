{
	"difficulty":"2",
	"submit_num":"27305",
	"show_id":"623",
	"leetcode_id":"623",
	"answers":[
		{
			"lc_ans_id":"104555",
			"view":"3072",
			"top":"0",
			"title":"[C++] [Java] 10 line Solution - no helper",
			"vote":"15",
			"content":"The idea is to: \\n    In addition to use ``1`` to indicate ``attach to left node`` as required, we can also use ``0`` to indicate ``attach to right node``;\\n**Compact C++**\\n```\\nclass Solution {\\npublic:\\n    TreeNode* addOneRow(TreeNode* root, int v, int d) {\\n        if (d == 0 || d == 1) {\\n            TreeNode* newroot = new TreeNode(v);\\n            (d ? newroot->left : newroot->right) = root;\\n            return newroot;\\n        }\\n        if (root && d >= 2) {\\n            root->left  = addOneRow(root->left,  v, d > 2 ? d - 1 : 1);\\n            root->right = addOneRow(root->right, v, d > 2 ? d - 1 : 0);\\n        }\\n        return root;\\n    }\\n};\\n```\\n**Compact Java**\\n```\\npublic class Solution {\\n    public TreeNode addOneRow(TreeNode root, int v, int d) {\\n        if (d == 0 || d == 1) {\\n            TreeNode newroot = new TreeNode(v);\\n            newroot.left = d == 1 ? root : null;\\n            newroot.right = d == 0 ? root : null;\\n            return newroot;\\n        }\\n        if (root != null && d >= 2) {\\n            root.left  = addOneRow(root.left,  v, d > 2 ? d - 1 : 1);\\n            root.right = addOneRow(root.right, v, d > 2 ? d - 1 : 0);\\n        }\\n        return root;\\n    }\\n}\\n```\\n**Plain C++**\\n```\\nclass Solution {\\npublic:\\n    TreeNode* addOneRow(TreeNode* root, int v, int d) {\\n        if (d == 1) {\\n            TreeNode* newroot = new TreeNode(v);\\n            newroot->left = root;\\n            return newroot;\\n        }\\n        else if (d == 0) {\\n            TreeNode* newroot = new TreeNode(v);\\n            newroot->right = root;\\n            return newroot;\\n        }\\n\\n        if (!root) {\\n            return nullptr;\\n        }\\n        else if (d == 2) {\\n            root->left  = addOneRow(root->left,  v, 1);\\n            root->right = addOneRow(root->right, v, 0);\\n            return root;\\n        }\\n        else if (d > 2) {\\n            root->left  = addOneRow(root->left,  v, d - 1);\\n            root->right = addOneRow(root->right, v, d - 1);\\n        }\\n        return root;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"104547",
			"view":"2050",
			"top":"1",
			"title":"Java, three methods, one BFS and two DFS",
			"vote":"11",
			"content":"1. BFS, find the d-1th row and add new children to each of them\\n```\\n    public TreeNode addOneRow(TreeNode root, int v, int d) {\\n        if (d == 1) {\\n            TreeNode newroot = new TreeNode(v);\\n            newroot.left = root;\\n            return newroot;\\n        }\\n        LinkedList<TreeNode> queue = new LinkedList<>();\\n        queue.add(root);\\n        for (int i = 0; i < d-2; i++) {\\n            int size = queue.size();\\n            for (int j = 0; j < size; j++) {\\n                TreeNode t = queue.poll();\\n                if (t.left != null) queue.add(t.left);\\n                if (t.right != null) queue.add(t.right);\\n            }\\n        }\\n        while (!queue.isEmpty()) {\\n            TreeNode t = queue.poll();\\n            TreeNode tmp = t.left;\\n            t.left = new TreeNode(v);\\n            t.left.left = tmp;\\n            tmp = t.right;\\n            t.right = new TreeNode(v);\\n            t.right.right = tmp;\\n        }\\n        return root;\\n    }\\n```\\n\\n2. DFS, with helper function that knows the current depth of each recursion\\n```\\n    private void dfs(TreeNode root, int depth, int v, int d) {\\n        if (root == null) return;\\n        if (depth < d-1) {\\n            dfs(root.left, depth+1, v, d);\\n            dfs(root.right, depth+1,v, d);\\n        } else {\\n            TreeNode tmp = root.left;\\n            root.left = new TreeNode(v);\\n            root.left.left = tmp;\\n            tmp = root.right;\\n            root.right = new TreeNode(v);\\n            root.right.right = tmp;\\n        }\\n    }\\n    public TreeNode addOneRow(TreeNode root, int v, int d) {\\n        if (d == 1) {\\n            TreeNode newroot = new TreeNode(v);\\n            newroot.left = root;\\n            return newroot;\\n        }\\n        dfs(root, 1, v, d);\\n        return root;\\n    }\\n```\\n\\n3. DFS without helper function, similar to @alexander 's top post\\n```\\n    public TreeNode addOneRow(TreeNode root, int v, int d) {\\n        if (d < 2) {\\n            TreeNode newroot = new TreeNode(v);\\n            if (d == 0) newroot.right = root;\\n            else newroot.left = root;\\n            return newroot;\\n        }\\n        if (root == null) return null;\\n        root.left = addOneRow(root.left, v, d == 2 ? 1 : d-1);\\n        root.right = addOneRow(root.right, v, d == 2 ? 0 : d-1);\\n        return root;\\n    }\\n```"
		},
		{
			"lc_ans_id":"104584",
			"view":"1839",
			"top":"2",
			"title":"Simple Java solution - O(N)",
			"vote":"4",
			"content":"Simply traverse recursively to the depth d - 1 and add nodes accordingly.\\n```\\n\\npublic class Solution {\\n\\tpublic TreeNode addOneRow(TreeNode root, int v, int d) {\\n\\t\\tif (d == 1) {\\n\\t\\t\\tTreeNode newRoot = new TreeNode(v);\\n\\t\\t\\tnewRoot.left = root;\\n\\t\\t\\treturn newRoot;\\n\\t\\t}\\n\\t\\tadd(root, v, d, 1);\\n\\t\\treturn root;\\n\\t}\\n\\n\\tprivate void add(TreeNode node, int v, int d, int currentDepth) {\\n\\t\\tif (node == null) {\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\n\\t\\tif (currentDepth == d - 1) {\\n\\t\\t\\tTreeNode temp = node.left;\\n\\t\\t\\tnode.left = new TreeNode(v);\\n\\t\\t\\tnode.left.left = temp;\\n\\n\\t\\t\\ttemp = node.right;\\n\\t\\t\\tnode.right = new TreeNode(v);\\n\\t\\t\\tnode.right.right = temp;\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\n\\t\\tadd(node.left, v, d, currentDepth + 1);\\n\\t\\tadd(node.right, v, d, currentDepth + 1);\\n\\t}\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"104582",
			"view":"1049",
			"top":"3",
			"title":"Short Python BFS",
			"vote":"3",
			"content":"Go row by row to the row at depth d-1, then insert the new nodes there.\\n\\n    def addOneRow(self, root, v, d):\\n        dummy, dummy.left = TreeNode(None), root\\n        row = [dummy]\\n        for _ in range(d - 1):\\n            row = [kid for node in row for kid in (node.left, node.right) if kid]\\n        for node in row:\\n            node.left, node.left.left = TreeNode(v), node.left\\n            node.right, node.right.right = TreeNode(v), node.right\\n        return dummy.left"
		},
		{
			"lc_ans_id":"104604",
			"view":"473",
			"top":"4",
			"title":"Simple C++ solution",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    void addOneRowR(TreeNode* root, int v, int d, int cd) {\\n        if (!root) return;\\n        \\n        if (cd == d) {\\n            TreeNode *savLeft = root->left;\\n            root->left = new TreeNode(v);\\n            root->left->left = savLeft;\\n            \\n            TreeNode *savRight = root->right;\\n            root->right = new TreeNode(v);\\n            root->right->right = savRight;\\n            return;\\n        }\\n        addOneRowR(root->left, v, d, cd + 1);\\n        addOneRowR(root->right, v, d, cd + 1);\\n    }\\n    TreeNode* addOneRow(TreeNode* root, int v, int d) {\\n        if (d == 1) {\\n            TreeNode *newRoot = new TreeNode(v);\\n            newRoot->left = root;\\n            return newRoot;\\n        }\\n        addOneRowR(root, v, d, 2);\\n        return root;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"104546",
			"view":"52",
			"top":"5",
			"title":"JAVA Solution, DFS and BFS",
			"vote":"1",
			"content":"Time flies! After three months later, when I met this question again, I solve it with totally different way. My previous version is DFS, now I solve it with BFS. Just wondering several months later when I met this question again, which method will I use. lol\\nDFS version:\\n```\\npublic class Solution {\\n    public TreeNode addOneRow(TreeNode root, int v, int d) {\\n        if(d == 1){\\n            TreeNode dummy = new TreeNode(v);\\n            dummy.left = root;\\n            return dummy;\\n        }\\n        helper(root, v, d, 1);\\n        return root;\\n    }\\n    public void helper(TreeNode root,int v, int d, int cur){\\n        if(root == null) return;\\n        if(cur == d - 1){\\n            TreeNode temp = new TreeNode(v);\\n            temp.left = root.left;\\n            root.left = temp;\\n            TreeNode temp2 = new TreeNode(v);\\n            temp2.right = root.right;\\n            root.right = temp2;\\n            return;\\n        }\\n        helper(root.left, v, d, cur + 1);\\n        helper(root.right, v, d, cur + 1);\\n    }\\n}\\n```\\nBFS version:\\n```\\nclass Solution {\\n    public TreeNode addOneRow(TreeNode root, int v, int d) {\\n        if (d == 1) {\\n            TreeNode newRoot = new TreeNode(v);\\n            newRoot.left = root;\\n            return newRoot;\\n        }\\n        Queue<TreeNode> queue = new LinkedList();\\n        queue.offer(root);\\n        int depth = 1;\\n        while (!queue.isEmpty()) {\\n            if (depth != d - 1){\\n                int size = queue.size();\\n                for (int i = 0; i < size; i++){\\n                    TreeNode node = queue.poll();\\n                    if (node.left != null) {\\n                        queue.offer(node.left);\\n                    }\\n                    if (node.right != null) {\\n                        queue.offer(node.right);\\n                    }\\n                }\\n                depth++;\\n            } else {\\n                int size = queue.size();\\n                for (int i = 0; i < size; i++){\\n                    TreeNode node = queue.poll();\\n                    TreeNode newLeft = new TreeNode(v);\\n                    newLeft.left = node.left;\\n                    node.left = newLeft;\\n                    TreeNode newRight = new TreeNode(v);\\n                    newRight.right = node.right;\\n                    node.right = newRight;\\n                }\\n                break;\\n            }\\n        }\\n        return root;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104565",
			"view":"113",
			"top":"6",
			"title":"Java: O(n): time O(n): space Queue - BFS - Easy solution",
			"vote":"1",
			"content":"```\\n/**\\n * Definition for a binary tree node.\\n * public class TreeNode {\\n *     int val;\\n *     TreeNode left;\\n *     TreeNode right;\\n *     TreeNode(int x) { val = x; }\\n * }\\n */\\npublic class Solution {\\n    public TreeNode addOneRow(TreeNode root, int v, int d) {\\n    \\n        int level = 1;\\n        \\n        // Handle edge case.\\n        if(d == 1) {\\n           TreeNode newRoot = new TreeNode(v);\\n            newRoot.left = root;\\n            \\n            return newRoot;\\n        }\\n        \\n        Queue<TreeNode> queue = new LinkedList<>();\\n        \\n        queue.add(root);\\n        \\n        // Iterate over the rows. Find the row, after which changes have to be made.\\n        for(int row = 1; row < d - 1; row++) {\\n            \\n            int size = queue.size();\\n\\n            for(int i = 0; i < size; i++) {\\n\\n                TreeNode top = queue.poll();\\n\\n                if(top.left != null) {\\n                    queue.offer(top.left);\\n                }\\n\\n                if(top.right != null) {\\n                    queue.offer(top.right);\\n                }\\n            }\\n            \\n        }\\n        \\n        while(!queue.isEmpty()){\\n            \\n            TreeNode node = queue.poll();\\n            \\n            TreeNode left = node.left;\\n            TreeNode right = node.right;\\n            \\n            TreeNode newLeft = new TreeNode(v);\\n            TreeNode newRight = new TreeNode(v);\\n            \\n            node.left = newLeft;\\n            newLeft.left = left;\\n            \\n            node.right = newRight;\\n            newRight.right = right;\\n            \\n        }\\n        \\n        return root;\\n    }\\n}"
		},
		{
			"lc_ans_id":"104541",
			"view":"25",
			"top":"7",
			"title":"c++ solution",
			"vote":"0",
			"content":"find all nodes of row number n-1,  then create two new nodes for each one,  very straightforward\\n\\n```\\nclass Solution {\\npublic:\\n    TreeNode* addOneRow(TreeNode* root, int v, int d) {\\n    \\tif (d < 1 || root == NULL) return root;\\n        if (d == 1) {\\n        \\tTreeNode* ret = new TreeNode(v);\\n        \\tret->left = root;\\n        \\treturn ret;\\n        }\\n        int currentDep = 1;\\n        deque<TreeNode*> row = { root };\\n        while (currentDep < d - 1) {\\n        \\tauto sz = row.size();\\n        \\tfor (auto i=0; i<sz; ++i) {\\n        \\t\\tTreeNode* node = row[0];\\n        \\t\\trow.pop_front();\\n        \\t\\tif (node->left) row.push_back(node->left);\\n        \\t\\tif (node->right) row.push_back(node->right);\\n        \\t}\\n        \\tcurrentDep += 1;\\n        }\\n        for (auto i=0; i<row.size(); ++i) {\\n        \\tTreeNode* lnode = new TreeNode(v);\\n        \\tTreeNode* rnode = new TreeNode(v);\\n        \\tlnode->left = row[i]->left;\\n        \\trnode->right = row[i]->right;\\n        \\trow[i]->left = lnode;\\n        \\trow[i]->right = rnode;\\n        }\\n        return root;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"104542",
			"view":"40",
			"top":"8",
			"title":"No helper and Recursion solution.",
			"vote":"0",
			"content":"\\n\\n    def addOneRow(self, root, v, d):\\n        \"\"\"\\n        :type root: TreeNode\\n        :type v: int\\n        :type d: int\\n        :rtype: TreeNode\\n        \"\"\"\\n        if d>2:\\n            if root.left:\\n                self.addOneRow(root.left, v, d-1)\\n            if root.right:\\n                self.addOneRow(root.right, v, d-1)\\n        if d == 1:\\n            new_root = TreeNode(v)\\n            new_root.left = root\\n            return new_root\\n        if d == 2:\\n            node2 = TreeNode(v)\\n            node1 = TreeNode(v)\\n            l = root.left\\n            r = root.right\\n            root.left = node2\\n            root.right = node1\\n            node2.left = l\\n            node1.right = r\\n            \\n      \\n        return root"
		},
		{
			"lc_ans_id":"104543",
			"view":"43",
			"top":"9",
			"title":"Run-time Error for JavaScript solution",
			"vote":"0",
			"content":"I've got run-time  error for my JavaScript solution which runs fine on my local machine.\\nThere is errors for the most basic test case, `[4, 2, 6, 3, 1, 5], 1, 2`. So I was wondering what's wrong with my code? And is JavaScript run-time on LeetCode differs a lot from my local machine one(Nodejs v7.9.0)?\\n\\n```javascript\\n\\nvar addOneRow = function(root, v, d) {\\n  if (root) {\\n    transversal(root, 1, d - 1, v);\\n  }\\n  return root;\\n};\\n\\nfunction transversal(node, cd, d, v) {\\n  if (node) {\\n    if (cd === d) {\\n      node.left =  { val: v, left: node.left,   right: null };\\n      node.right = { val: v, right: node.right, right: null };\\n    } else {\\n      transversal(node.left,  cd + 1, d, v);\\n      transversal(node.right, cd + 1, d, v);\\n    }\\n  }\\n}\\n```"
		}
	],
	"id":"601",
	"title":"Add One Row to Tree",
	"content":"<p>Given the root of a binary tree, then value <code>v</code> and depth <code>d</code>, you need to add a row of nodes with value <code>v</code> at the given depth <code>d</code>. The root node is at depth 1. </p>\r\n\r\n<p>The adding rule is: given a positive integer depth <code>d</code>, for each NOT null tree nodes <code>N</code> in depth <code>d-1</code>, create two tree nodes with value <code>v</code> as <code>N's</code> left subtree root and right subtree root. And <code>N's</code> <b>original left subtree</b> should be the left subtree of the new left subtree root, its <b>original right subtree</b> should be the right subtree of the new right subtree root. If depth <code>d</code> is 1 that means there is no depth d-1 at all, then create a tree node with value <b>v</b> as the new root of the whole original tree, and the original tree is the new root's left subtree.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nA binary tree as following:\r\n       4\r\n     /   \\\r\n    2     6\r\n   / \\   / \r\n  3   1 5   \r\n\r\n<b>v = 1</b>\r\n\r\n<b>d = 2</b>\r\n\r\n<b>Output:</b> \r\n       4\r\n      / \\\r\n     1   1\r\n    /     \\\r\n   2       6\r\n  / \\     / \r\n 3   1   5   \r\n\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nA binary tree as following:\r\n      4\r\n     /   \r\n    2    \r\n   / \\   \r\n  3   1    \r\n\r\n<b>v = 1</b>\r\n\r\n<b>d = 3</b>\r\n\r\n<b>Output:</b> \r\n      4\r\n     /   \r\n    2\r\n   / \\    \r\n  1   1\r\n /     \\  \r\n3       1\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The given d is in range [1, maximum depth of the given tree + 1].</li>\r\n<li>The given binary tree has at least one tree node.</li>\r\n</ol>\r\n</p>",
	"frequency":"94",
	"ac_num":"12677"
}