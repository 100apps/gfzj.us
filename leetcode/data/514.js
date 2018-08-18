{
	"difficulty":"1",
	"submit_num":"65419",
	"show_id":"530",
	"leetcode_id":"530",
	"answers":[
		{
			"lc_ans_id":"99905",
			"view":"17414",
			"top":"0",
			"title":"Two Solutions, in-order traversal and a more general way using TreeSet",
			"vote":"65",
			"content":"The most common idea is to first ```inOrder``` traverse the tree and compare the delta between each of the adjacent values. It's guaranteed to have the correct answer because it is a ```BST``` thus ```inOrder``` traversal values are ```sorted```.\\n\\nSolution 1 - In-Order traverse, time complexity O(N), space complexity O(1).\\n```\\npublic class Solution {\\n    int min = Integer.MAX_VALUE;\\n    Integer prev = null;\\n    \\n    public int getMinimumDifference(TreeNode root) {\\n        if (root == null) return min;\\n        \\n        getMinimumDifference(root.left);\\n        \\n        if (prev != null) {\\n            min = Math.min(min, root.val - prev);\\n        }\\n        prev = root.val;\\n        \\n        getMinimumDifference(root.right);\\n        \\n        return min;\\n    }\\n    \\n}\\n```\\nWhat  if it is not a ```BST```? (Follow up of the problem) The idea is to put values in a TreeSet and then every time we can use ```O(lgN)``` time to lookup for the nearest values.\\n\\nSolution 2 - Pre-Order traverse, time complexity O(NlgN), space complexity O(N).\\n```\\npublic class Solution {\\n    TreeSet<Integer> set = new TreeSet<>();\\n    int min = Integer.MAX_VALUE;\\n    \\n    public int getMinimumDifference(TreeNode root) {\\n        if (root == null) return min;\\n        \\n        if (!set.isEmpty()) {\\n            if (set.floor(root.val) != null) {\\n                min = Math.min(min, root.val - set.floor(root.val));\\n            }\\n            if (set.ceiling(root.val) != null) {\\n                min = Math.min(min, set.ceiling(root.val) - root.val);\\n            }\\n        }\\n        \\n        set.add(root.val);\\n        \\n        getMinimumDifference(root.left);\\n        getMinimumDifference(root.right);\\n        \\n        return min;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99938",
			"view":"6616",
			"top":"1",
			"title":"C++ 7 lines, O(n) run-time O(h) memory",
			"vote":"15",
			"content":"In-order traversal of BST yields sorted sequence. So, we just need to subtract the previous element from the current one, and keep track of the minimum. We need O(1) memory as we only store the previous element, but we still need O(h) for the stack.\\n```\\nvoid inorderTraverse(TreeNode* root, int& val, int& min_dif) {\\n    if (root->left != NULL) inorderTraverse(root->left, val, min_dif);\\n    if (val >= 0) min_dif = min(min_dif, root->val - val);\\n    val = root->val;\\n    if (root->right != NULL) inorderTraverse(root->right, val, min_dif);\\n}\\nint getMinimumDifference(TreeNode* root) {\\n    auto min_dif = INT_MAX, val = -1;\\n    inorderTraverse(root, val, min_dif);\\n    return min_dif;\\n}\\n```\\nAnother solution with the member variables (6 lines):\\n```\\nclass Solution {\\n    int min_dif = INT_MAX, val = -1;\\npublic:\\nint getMinimumDifference(TreeNode* root) {\\n    if (root->left != NULL) getMinimumDifference(root->left);\\n    if (val >= 0) min_dif = min(min_dif, root->val - val);\\n    val = root->val;\\n    if (root->right != NULL) getMinimumDifference(root->right);\\n    return min_dif;\\n}\\n```"
		},
		{
			"lc_ans_id":"99941",
			"view":"7305",
			"top":"2",
			"title":"Java O(n) Time Inorder Traversal Solution",
			"vote":"14",
			"content":"Since this is a BST, the inorder traversal of its nodes results in a sorted list of values. Thus, the minimum absolute difference must occur in any adjacently traversed nodes. I use the global variable \"prev\" to keep track of each node's inorder predecessor.\\n\\n```\\npublic class Solution {\\n    \\n    int minDiff = Integer.MAX_VALUE;\\n    TreeNode prev;\\n    \\n    public int getMinimumDifference(TreeNode root) {\\n        inorder(root);\\n        return minDiff;\\n    }\\n    \\n    public void inorder(TreeNode root) {\\n        if (root == null) return;\\n        inorder(root.left);\\n        if (prev != null) minDiff = Math.min(minDiff, root.val - prev.val);\\n        prev = root;\\n        inorder(root.right);\\n    }\\n\\n}\\n```"
		},
		{
			"lc_ans_id":"99918",
			"view":"3402",
			"top":"3",
			"title":"Java No In-order Traverse Solution,  just pass upper bound and lower bound",
			"vote":"11",
			"content":"Make use of the property of BST that value of nodes is bounded by their \"previous\" and \"next\" node. \\nEdit: Thanks to Stefan pointing out a small bug. Previous code would fail when testing [2147483647, 2147483646]. \\nNow Long.MAX_VALUE/MIN_VALUE is used to mark the INF.\\n\\n\\n    long minDiff = Long.MAX_VALUE;\\n    public int getMinimumDifference(TreeNode root) {\\n        helper(root,Long.MIN_VALUE,Long.MAX_VALUE);\\n        return (int)minDiff;\\n    }\\n    private void helper(TreeNode curr, long lb, long rb){\\n        if(curr==null) return;\\n        if(lb!=Long.MIN_VALUE){\\n            minDiff = Math.min(minDiff,curr.val - lb);\\n        }\\n        if(rb!=Long.MAX_VALUE){\\n        minDiff = Math.min(minDiff,rb - curr.val);\\n        }\\n        helper(curr.left,lb,curr.val);\\n        helper(curr.right,curr.val,rb);\\n    }"
		},
		{
			"lc_ans_id":"99926",
			"view":"3018",
			"top":"4",
			"title":"Python easy understand solution",
			"vote":"7",
			"content":"Just inorder travel the tree.\\nNote: There are at least two nodes in this BST. \\n````\\ndef getMinimumDifference(self, root):\\n        def dfs(node, l=[]):\\n            if node.left: dfs(node.left, l)\\n            l.append(node.val)\\n            if node.right: dfs(node.right, l)\\n            return l\\n        l = dfs(root)\\n        return min([abs(a-b) for a,b in zip(l, l[1:])])\\n````\\nIf it's not a BST, just apply ````l = sorted(bfs(root))````"
		},
		{
			"lc_ans_id":"99928",
			"view":"1034",
			"top":"5",
			"title":"Python Inorder Traversal 3 Line",
			"vote":"5",
			"content":"    class Solution(object):\\n        def getMinimumDifference(self, root):\\n            nums = self.inorder(root)\\n            return min(nums[i+1]-nums[i] for i in range(len(nums)-1))\\n            \\n        def inorder(self, root):\\n            return self.inorder(root.left) + [root.val] + self.inorder(root.right) if root else []"
		},
		{
			"lc_ans_id":"99913",
			"view":"958",
			"top":"6",
			"title":"Short Simple Python - O(N) Time - O(N) Space",
			"vote":"4",
			"content":"```\\ndef getMinimumDifference(self, root):\\n    self.previous = self.minimum = float('inf')\\n    \\n    def inorder(node):\\n        if node:\\n            inorder(node.left)\\n            self.minimum = min(self.minimum, abs(node.val-self.previous))\\n            self.previous = node.val\\n            inorder(node.right)\\n    \\n    inorder(root)\\n    return self.minimum\\n\\n```"
		},
		{
			"lc_ans_id":"99975",
			"view":"2066",
			"top":"7",
			"title":"[Minimum Absolute Difference in BST] [C++] - Short Solution",
			"vote":"3",
			"content":"**Lambda Version**\\n```\\nclass Solution {\\npublic:\\n    int getMinimumDifference(TreeNode* root) {\\n        long mindiff = INT_MAX;\\n        TreeNode* prev = nullptr;\\n        find(root, prev, mindiff);\\n        return mindiff;\\n    }\\nprivate:\\n    bool find(TreeNode* node, TreeNode*& prev, long& mindiff) {\\n        return (node->left && find(node->left, prev, mindiff)) | [&]() { mindiff = !prev ? mindiff : std::min(mindiff, (long)abs(node->val - prev->val)); prev = node; return true; }() | (node->right && find(node->right, prev, mindiff));\\n    }\\n};\\n```\\n\\n**Regular Version:**\\n```\\nclass Solution {\\npublic:\\n    int getMinimumDifference(TreeNode* root) {\\n        long mindiff = INT_MAX;\\n        TreeNode* prev = nullptr;\\n        find(root, prev, mindiff);\\n        return mindiff;\\n    }\\nprivate:\\n    void find(TreeNode* node, TreeNode*& prev, long& mindiff) {\\n        if (node->left) { \\n            find(node->left, prev, mindiff);\\n        }\\n\\n        if (prev != nullptr) {\\n            mindiff = std::min(mindiff, (long)abs(node->val - prev->val));\\n        }\\n        prev = node;\\n\\n        if (node->right) {\\n            find(node->right, prev, mindiff);\\n        }\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99936",
			"view":"142",
			"top":"8",
			"title":"JavaScript recursive solution",
			"vote":"2",
			"content":"```\\nvar getMinimumDifference = function(root) {\\n  let pre = undefined;\\n  let diff = Infinity;\\n  function inOrder(root) {\\n    if (root === null) {\\n      return;\\n    }\\n    inOrder(root.left);\\n    if (pre !== undefined && diff > root.val - pre) {\\n      diff = root.val - pre;\\n    }\\n    pre = root.val;\\n    inOrder(root.right);\\n  }\\n  inOrder(root);\\n  return diff;\\n};"
		},
		{
			"lc_ans_id":"100007",
			"view":"139",
			"top":"9",
			"title":"C# - O(n) in order traversal - collect min diff between visits",
			"vote":"2",
			"content":"If you do an in order traversal you'll be visiting the nodes in sorted order.  The min difference will exist between values when sorted.\\n\\n```\\n    public int GetMinimumDifference(TreeNode root) {\\n        Stack<TreeNode> stack = new Stack<TreeNode>();\\n        TreeNode curr = root;\\n        int diff = int.MaxValue;\\n        int prev = 0;\\n        bool first = true;\\n        while (curr != null || stack.Count > 0)\\n        {\\n            if (curr != null)\\n            {\\n                stack.Push(curr);\\n                curr = curr.left;\\n            }\\n            else\\n            {\\n                curr = stack.Pop();\\n                if (!first) diff = Math.Min(diff, Math.Abs(prev - curr.val));\\n                else first = false;\\n                prev = curr.val;\\n                \\n                curr = curr.right;\\n            }\\n        }\\n        return diff;\\n    }\\n```"
		}
	],
	"id":"514",
	"title":"Minimum Absolute Difference in BST",
	"content":"<p>Given a binary search tree with non-negative values, find the minimum <a href=\"https://en.wikipedia.org/wiki/Absolute_difference\">absolute difference</a> between values of any two nodes.</p>\r\n\r\n<p>\r\n<b>Example:</b>\r\n<pre>\r\n<b>Input:</b>\r\n\r\n   1\r\n    \\\r\n     3\r\n    /\r\n   2\r\n\r\n<b>Output:</b>\r\n1\r\n\r\n<b>Explanation:</b>\r\nThe minimum absolute difference is 1, which is the difference between 2 and 1 (or between 2 and 3).\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Note:</b>\r\nThere are at least two nodes in this BST.\r\n</p>",
	"frequency":"224",
	"ac_num":"30868"
}