{
	"difficulty":"1",
	"submit_num":"49002",
	"show_id":"687",
	"leetcode_id":"687",
	"answers":[
		{
			"lc_ans_id":"108136",
			"view":"9048",
			"top":"0",
			"title":"[Java/C++] Clean Code",
			"vote":"20",
			"content":"`Longest-Univalue-Path` of a tree is among those `Longest-Univalue-Path-Across` at each node;\\n`Longest-Univalue-Path-Across` a node is sum of { `Longest-Univalue-Path-Start-At` each child with same value, + 1}\\n \\n**Java**\\n```\\nclass Solution {\\n    public int longestUnivaluePath(TreeNode root) {\\n        int[] res = new int[1];\\n        if (root != null) dfs(root, res);\\n        return res[0];\\n    }\\n\\n    private int dfs(TreeNode node, int[] res) {\\n        int l = node.left != null ? dfs(node.left, res) : 0;\\n        int r = node.right != null ? dfs(node.right, res) : 0;\\n        int resl = node.left != null && node.left.val == node.val ? l + 1 : 0;\\n        int resr = node.right != null && node.right.val == node.val ? r + 1 : 0;\\n        res[0] = Math.max(res[0], resl + resr);\\n        return Math.max(resl, resr);\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int longestUnivaluePath(TreeNode* root) {\\n        int lup = 0;\\n        if (root) dfs(root, lup);\\n        return lup;\\n    }\\n\\nprivate:\\n    int dfs(TreeNode* node, int& lup) {\\n        int l = node->left ? dfs(node->left, lup) : 0;\\n        int r = node->right ? dfs(node->right, lup) : 0;\\n        int resl = node->left && node->left->val == node->val ? l + 1 : 0;\\n        int resr = node->right && node->right->val == node->val ? r + 1 : 0;\\n        lup = max(lup, resl + resr);\\n        return max(resl, resr);\\n    }\\n};\\n```\\n**Varables**\\n`l` is the length of single direction `Longest-Univalue-Path` start from `left-child`, \\n`r` is the length of single direction `Longest-Univalue-Path` start from `right-child`, \\n`resl` is the length of single direction `Longest-Univalue-Path` start from `parent` go left, \\n`resr` is the length of single direction `Longest-Univalue-Path` start from `parent` go right.\\n`int dfs(node)` returns the `Longest-Univalue-Path-Start-At` that `node`, and update the result of `Longest-Univalue-Path-Across` that `node` through side effect.\\nIt is really hard to name those variables to reflect these concept.\\n\\n**Example:**\\n```\\n                ...\\n               /   \\n              4 (res = resl + resr = 3)\\n  (resl = 2) / \\\\ (resr= 1)\\n    (l = 1) 4   4 (r = 0)\\n           /     \\n          4\\n```\\nresl is `Longest-Univalue-Path-Start-At` left node + 1,\\nresr is `Longest-Univalue-Path-Start-At` right node + 1,\\nin here the local result of `Longest-Univalue-Path-Across` at this node is the sum of the 2;"
		},
		{
			"lc_ans_id":"108175",
			"view":"3314",
			"top":"1",
			"title":"java solution with global variable",
			"vote":"14",
			"content":"    int len = 0; // global variable\\n    public int longestUnivaluePath(TreeNode root) {\\n        if (root == null) return 0;\\n        len = 0;\\n        getLen(root, root.val);\\n        return len;\\n    }\\n    \\n    private int getLen(TreeNode node, int val) {\\n        if (node == null) return 0;\\n        int left = getLen(node.left, node.val);\\n        int right = getLen(node.right, node.val);\\n        len = Math.max(len, left + right);\\n        if (val == node.val)  return Math.max(left, right) + 1;\\n        return 0;\\n    }"
		},
		{
			"lc_ans_id":"108142",
			"view":"3137",
			"top":"2",
			"title":"Python Simple to Understand",
			"vote":"10",
			"content":"The approach is similar to the [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) question except that we reset the left/right to 0 whenever the current node does not match the children node value.\\n\\nIn the Diameter of Binary Tree question, the path can either go through the root or it doesn't.\\n\\n![Imgur](https://i.imgur.com/N0zniqa.png)\\n\\nHence at the end of each recursive loop, return the longest length using that node as the root so that the node's parent can potentially use it in its longest path computation.\\n\\nWe also use an external variable `longest` that keeps track of the longest path seen so far.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def longestUnivaluePath(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: int\\n        \"\"\"\\n        # Time: O(n)\\n        # Space: O(n)\\n        longest = [0]\\n        def traverse(node):\\n            if not node:\\n                return 0\\n            left_len, right_len = traverse(node.left), traverse(node.right)\\n            left = (left_len + 1) if node.left and node.left.val == node.val else 0\\n            right = (right_len + 1) if node.right and node.right.val == node.val else 0\\n            longest[0] = max(longest[0], left + right)\\n            return max(left, right)\\n        traverse(root)\\n        return longest[0]\\n```"
		},
		{
			"lc_ans_id":"108146",
			"view":"3350",
			"top":"3",
			"title":"Concise DFS solution with no global variables",
			"vote":"5",
			"content":"```\\nclass Solution {\\npublic:\\n    int helper(TreeNode* root, int val)\\n    {\\n        if(!root || root->val != val) return 0;\\n        return 1 + max(helper(root->left,val),helper(root->right,val));\\n    }\\n    int longestUnivaluePath(TreeNode* root) {\\n        if(!root) return 0;\\n        int sub = max(longestUnivaluePath(root->left),longestUnivaluePath(root->right));\\n        return max(sub,helper(root->left,root->val) + helper(root->right,root->val));\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108141",
			"view":"694",
			"top":"4",
			"title":"Concise Javascript solution using recursion",
			"vote":"4",
			"content":"This solution is based on understanding the problem definition as follows.  The longest Univalue Path falls into ONE of the three possible scenarios:\\n\\n* It exists somewhere in the Left subtree\\n\\n* It exists somewhere in the Right subtree\\n\\n* It exists as a straight path from the Left subtree, through the Root, and to a path in the Right subtree.\\n\\nTherefore, I needed to write a helper function called ```straightUnivaluePath```, which takes a node and a uniVal, and returns the length of the longest straight path (meaning there is no branching out along the path) through nodes with the uniVal.\\n\\n```\\nvar straightUnivaluePath = function(node, uniVal) {\\n    if(!node || node.val !== uniVal) return 0;\\n    return Math.max(straightUnivaluePath(node.left, uniVal), straightUnivaluePath(node.right, uniVal)) + 1;\\n}\\n\\nvar longestUnivaluePath = function(root) {\\n    if(!root) return 0;\\n    \\n    return Math.max(\\n        longestUnivaluePath(root.left),\\n        longestUnivaluePath(root.right),\\n        straightUnivaluePath(root.left, root.val) + straightUnivaluePath(root.right, root.val)\\n    )\\n};\\n```"
		},
		{
			"lc_ans_id":"108155",
			"view":"312",
			"top":"5",
			"title":"C++ DFS with explanation",
			"vote":"2",
			"content":"Perform DFS by recursively invoking ```helper``` for left and right subtrees.  When coming back up the recursive stack, check to see if the root value is equal to the left and right subtree root value, if so, add one onto the max path value returned by the subtree to include the one additional path between the root and the subtree root.\\n\\nThere are 3 possible use cases to consider when coming back up the recursive stack:\\n\\n**Case 1:** If the root value is equal to BOTH the left and right subtree root values, then set ```m``` to the maximum of itself compared to the \"up-side-down-V shaped\" path created by including the left and right subtrees max paths with the root ( ```l=l+1``` and ```r=r+1``` ).  Return the max path value of the left and right subtrees ```return max(l,r)``` which is needed in case the next parent up the recursive stack is also the same value.\\n\\n**Case 2:** If the root value is NOT equal to EITHER the left INCLUSIVE-OR right subtree values, then set BOTH ```l=0``` and ```r=0``` and return 0 ( i.e. ```return max(0,0)``` ).\\n\\n**Case 3:** If the root value is equal to the left subtree root value XOR the right subtree root value, then either ```l=0 and r=r+1``` XOR ```l=l+1 and r=0```, return the maximum of the left and right subtree path values ( i.e. ```return max(l,0)``` XOR ```return max(0,r)``` ).\\n\\nAlways check for a new max for each of these 3 use cases by adding the path value of the left subtree and right subtree.  ```m=max(m,l+r)```.  It is OK to add ```l``` and ```r``` together when checking for a new max for each of the 3 use cases above, since ```l``` and/or ```r``` are set to 0 when applicable ( i.e. for case 2: ```0+0==0``` and for case 3: ```l+0==l``` XOR ```0+r==r```  ).\\n\\n**Solution:**\\n```\\nclass Solution {\\npublic:\\n    int longestUnivaluePath(TreeNode* root) {\\n        if (!root) return 0;\\n        int longestPath=0;\\n        helper(root, longestPath);\\n        return longestPath;\\n    }\\nprivate:\\n    int helper(TreeNode* root, int& m){\\n        int l=root->left ? helper(root->left, m) : 0;\\n        int r=root->right ? helper(root->right, m) : 0;\\n        l=(root->left && root->left->val==root->val) ? l+1 : 0;\\n        r=(root->right && root->right->val==root->val) ? r+1 : 0;\\n        m=max(m,l+r);\\n        return max(l,r);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108177",
			"view":"366",
			"top":"6",
			"title":"java easy understand solution",
			"vote":"2",
			"content":"the max path length is `left path length + right path length`\\n```\\nclass Solution {\\n    int res = 0;\\n    public int longestUnivaluePath(TreeNode root) {\\n        if(root == null) return 0;\\n        help(root);\\n        return res;\\n    }\\n    public void help(TreeNode root) {\\n        if(root == null) return;\\n        int temp = count(root.left,root.val)+count(root.right,root.val);\\n        res = Math.max(res,temp);\\n        help(root.left);\\n        help(root.right);\\n    }\\n    public int count(TreeNode root,int val) {\\n        if(root == null || root.val != val) return 0;\\n        int left = count(root.left,val) + 1;\\n        int right = count(root.right,val) + 1;\\n        \\n        return Math.max(left,right);                                                  \\n    }\\n}"
		},
		{
			"lc_ans_id":"108179",
			"view":"382",
			"top":"7",
			"title":"python dfs",
			"vote":"2",
			"content":"```\\n    def longestUnivaluePath(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: int\\n        \"\"\"\\n        def dfs(root,res):\\n            l,r=0,0\\n            if root.left:\\n                l=dfs(root.left,res)\\n                l=l+1 if root.left.val==root.val else 0\\n            if root.right:\\n                r=dfs(root.right,res)\\n                r=r+1 if root.right.val==root.val else 0\\n            res[0]=max(res[0],r+l)\\n            return max(l,r)\\n               \\n\\n        if not root:\\n            return 0\\n        res=[0]\\n        dfs(root,res)\\n        return res[0]"
		},
		{
			"lc_ans_id":"108165",
			"view":"844",
			"top":"8",
			"title":"C++ 3 lines",
			"vote":"2",
			"content":"```\\nint longestUnivaluePath(TreeNode* c, TreeNode* r = nullptr) {\\n    if (c == nullptr) return 0;\\n    if (r == nullptr) return max(longestUnivaluePath(c, c),\\n        max(longestUnivaluePath(c->left, nullptr), longestUnivaluePath(c->right, nullptr)));\\n    return c->val != r->val ? 0 : (c == r ? longestUnivaluePath(c->left, r) + longestUnivaluePath(c->right, r) :\\n            1 + max(longestUnivaluePath(c->left, r), longestUnivaluePath(c->right, r)));\\n}\\n```"
		},
		{
			"lc_ans_id":"108140",
			"view":"114",
			"top":"9",
			"title":"test cases incorrect",
			"vote":"1",
			"content":"There are some test cases that are expecting incorrect output values. Namely, one with 6 val->26 nodes connected at the top of the tree (and thus 5 connecting branches) expects 4."
		}
	],
	"id":"664",
	"title":"Longest Univalue Path",
	"content":"<p>Given a binary tree, find the length of the longest path where each node in the path has the same value. This path may or may not pass through the root.</p>\r\n\r\n<p><b>Note:</b> The length of path between two nodes is represented by the number of edges between them.</p>\r\n\r\n<p>\r\n<b>Example 1:</b>\r\n</p>\r\n\r\n\r\n<p>\r\nInput:\r\n<pre>\r\n              5\r\n             / \\\r\n            4   5\r\n           / \\   \\\r\n          1   1   5\r\n</pre>\r\n</p>\r\n\r\n<p>\r\nOutput:\r\n<pre>\r\n2\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Example 2:</b>\r\n</p>\r\n\r\n\r\n<p>\r\nInput:\r\n<pre>\r\n              1\r\n             / \\\r\n            4   5\r\n           / \\   \\\r\n          4   4   5\r\n</pre>\r\n</p>\r\n\r\n<p>\r\nOutput:\r\n<pre>\r\n2\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe given binary tree has not more than 10000 nodes.  The height of the tree is not more than 1000.\r\n</p>",
	"frequency":"269",
	"ac_num":"16460"
}