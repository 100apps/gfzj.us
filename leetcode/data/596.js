{
	"difficulty":"1",
	"submit_num":"94480",
	"show_id":"617",
	"leetcode_id":"617",
	"answers":[
		{
			"lc_ans_id":"104302",
			"view":"8222",
			"top":"0",
			"title":"Python, Straightforward with Explanation",
			"vote":"34",
			"content":"Let's create a recursive solution.\\n* If both trees are empty then we return empty.\\n* Otherwise, we will return a tree.  The root value will be t1.val + t2.val, except these values are 0 if the tree is empty.\\n* The left child will be the merge of t1.left and t2.left, except these trees are empty if the parent is empty.\\n* The right child is similar.\\n\\n```\\ndef mergeTrees(self, t1, t2):\\n    if not t1 and not t2: return None\\n    ans = TreeNode((t1.val if t1 else 0) + (t2.val if t2 else 0))\\n    ans.left = self.mergeTrees(t1 and t1.left, t2 and t2.left)\\n    ans.right = self.mergeTrees(t1 and t1.right, t2 and t2.right)\\n    return ans\\n```"
		},
		{
			"lc_ans_id":"104299",
			"view":"19383",
			"top":"1",
			"title":"Java Solution, 6 lines, Tree Traversal",
			"vote":"34",
			"content":"```\\npublic class Solution {\\n    public TreeNode mergeTrees(TreeNode t1, TreeNode t2) {\\n        if (t1 == null && t2 == null) return null;\\n        \\n        int val = (t1 == null ? 0 : t1.val) + (t2 == null ? 0 : t2.val);\\n        TreeNode newNode = new TreeNode(val);\\n        \\n        newNode.left = mergeTrees(t1 == null ? null : t1.left, t2 == null ? null : t2.left);\\n        newNode.right = mergeTrees(t1 == null ? null : t1.right, t2 == null ? null : t2.right);\\n        \\n        return newNode;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104301",
			"view":"4497",
			"top":"2",
			"title":"Short Recursive Solution w/ Python & C++",
			"vote":"17",
			"content":"python solution\\n```\\nclass Solution(object):\\n    def mergeTrees(self, t1, t2):\\n        if t1 and t2:\\n            root = TreeNode(t1.val + t2.val)\\n            root.left = self.mergeTrees(t1.left, t2.left)\\n            root.right = self.mergeTrees(t1.right, t2.right)\\n            return root\\n        else:\\n            return t1 or t2\\n```\\nc++ solution\\n```\\nclass Solution {\\npublic:\\n    TreeNode* mergeTrees(TreeNode* t1, TreeNode* t2) {\\n        if ( t1 && t2 ) {\\n            TreeNode * root = new TreeNode(t1->val + t2->val);\\n            root->left = mergeTrees(t1->left, t2->left);\\n            root->right = mergeTrees(t1->right, t2->right);\\n            return root;\\n        } else {\\n            return t1 ? t1 : t2;\\n        }\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"104308",
			"view":"6701",
			"top":"3",
			"title":"C++ Clean Code - Unique Node | Shared Node",
			"vote":"8",
			"content":"**Create new Nodes**\\nI like to create new nodes for newly formed tree in this type of problem, as you are literally creating nested graph otherwise.\\n```\\nclass Solution {\\npublic:\\n    TreeNode* mergeTrees(TreeNode* t1, TreeNode* t2) {\\n        if (!t1 && !t2) {\\n            return nullptr;\\n        }\\n        TreeNode* node = new TreeNode((t1 ? t1->val : 0) + (t2 ? t2->val : 0));\\n        node->left = mergeTrees((t1 ? t1->left : nullptr), (t2 ? t2->left : nullptr));\\n        node->right = mergeTrees((t1 ? t1->right : nullptr), (t2 ? t2->right : nullptr));\\n        return node;\\n    }\\n};\\n```\\n\\n**Share Nodes with the nonnull TreeNode**\\nAs @zqfan point out, this problem explicitly tell you to use the NOT null node, there is no need to create new nodes. And the code would also be simpler.\\n```\\nclass Solution {\\npublic:\\n    TreeNode* mergeTrees(TreeNode* t1, TreeNode* t2) {\\n        if (!t1) return t2;\\n        if (!t2) return t1;\\n\\n        TreeNode* node = new TreeNode(t1->val + t2->val);\\n        node->left = mergeTrees(t1->left, t2->left);\\n        node->right = mergeTrees(t1->right, t2->right);\\n        return node;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"104325",
			"view":"1774",
			"top":"4",
			"title":"A few lines of JavaScript",
			"vote":"7",
			"content":"```\\nvar mergeTrees = function(t1, t2) {\\n    if (!t1 && !t2) return null;\\n    const root = new TreeNode(((t1 || 0).val || 0) + ((t2 || 0).val || 0));\\n    root.left = mergeTrees(t1 && t1.left, t2 && t2.left);\\n    root.right = mergeTrees(t1 && t1.right, t2 && t2.right);\\n    return root;\\n};\\n```"
		},
		{
			"lc_ans_id":"104399",
			"view":"234",
			"top":"5",
			"title":"5 lines Elegant Solution",
			"vote":"5",
			"content":"```\\n    public TreeNode MergeTrees(TreeNode t1, TreeNode t2) {\\n        if(t1 == null || t2 == null) return t1 == null ? t2:t1;\\n        t1.val += t2.val;\\n        t1.left = MergeTrees(t1.left, t2.left);\\n        t1.right = MergeTrees(t1.right, t2.right);\\n        return t1;\\n    }"
		},
		{
			"lc_ans_id":"104298",
			"view":"561",
			"top":"6",
			"title":"C++ O(n) space iterative solution, no new tree!",
			"vote":"5",
			"content":"```\\n    TreeNode* mergeTrees(TreeNode* t1, TreeNode* t2) {\\n        if(t2==NULL) return t1;\\n        if(t1==NULL) return t2;\\n        TreeNode* res=t1;\\n        stack<TreeNode*> s1, s2;\\n        s1.push(t1), s2.push(t2);\\n        while(!s1.empty()) {\\n            TreeNode* c1=s1.top();\\n            TreeNode* c2=s2.top();\\n            s1.pop(), s2.pop();\\n            c1->val+=c2->val;\\n            if(c1->right==NULL&&c2->right!=NULL) c1->right=c2->right;\\n            else if(c1->right!=NULL&&c2->right!=NULL) s1.push(c1->right), s2.push(c2->right);\\n            if(c1->left==NULL&&c2->left!=NULL) c1->left=c2->left;\\n            else if(c1->left!=NULL&&c2->left!=NULL) s1.push(c1->left), s2.push(c2->left);\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"104460",
			"view":"1636",
			"top":"7",
			"title":"Simple Python recursive",
			"vote":"4",
			"content":"The idea is simple, when ```t1``` and ```t2``` are both ```None```, return ```None``` otherwise just turtle all the way down.\\n```\\nclass Solution(object):\\n    def mergeTrees(self, t1, t2):\\n        \"\"\"\\n        :type t1: TreeNode\\n        :type t2: TreeNode\\n        :rtype: TreeNode\\n        \"\"\"\\n        if not t1 and not t2: return None\\n        if t1:\\n            v1, L1, R1 = t1.val, t1.left, t1.right\\n        else:\\n            v1, L1, R1 = 0, None, None\\n        if t2:\\n            v2, L2, R2 = t2.val, t2.left, t2.right\\n        else:\\n            v2, L2, R2 = 0, None, None\\n        node = TreeNode(v1+v2)\\n        node.left = self.mergeTrees(L1, L2)\\n        node.right = self.mergeTrees(R1, R2)\\n        return node\\n```"
		},
		{
			"lc_ans_id":"104369",
			"view":"2179",
			"top":"8",
			"title":"Simple Java recursive solution - O(n)",
			"vote":"3",
			"content":"\\n```\\npublic class Solution {\\n    public TreeNode merge(TreeNode t1, TreeNode t2) {\\n        if(t1 == null && t2 == null) {\\n            return null;\\n        }\\n        \\n        TreeNode newNode = new TreeNode(-1);\\n        if(t1 == null) {\\n            newNode.val = t2.val;\\n            newNode.left = merge(null, t2.left);\\n            newNode.right = merge(null, t2.right);\\n        }\\n        else if(t2 == null) {\\n            newNode.val = t1.val;\\n            newNode.left = merge(t1.left, null);\\n            newNode.right = merge(t1.right, null);\\n        }\\n        else {\\n            newNode.val = t1.val + t2.val;\\n            newNode.left = merge(t1.left, t2.left);\\n            newNode.right = merge(t1.right, t2.right);\\n        }\\n        \\n        return newNode;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104407",
			"view":"647",
			"top":"9",
			"title":"Runtime beat 100%, 6 lines JAVA recursive solution",
			"vote":"2",
			"content":"\\n\\tpublic TreeNode mergeTrees(TreeNode t1, TreeNode t2) {\\n\\t\\tif (t1 == null) return t2;\\n\\t\\tif (t2 == null) return t1;\\n\\n\\t\\tTreeNode temp = new TreeNode(t1.val + t2.val);\\n\\t\\ttemp.left = mergeTrees(t1.left, t2.left);\\n\\t\\ttemp.right = mergeTrees(t1.right, t2.right);\\n\\n\\t\\treturn temp;\\n\\t}"
		}
	],
	"id":"596",
	"title":"Merge Two Binary Trees",
	"content":"<p>\r\nGiven two binary trees and imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. \r\n</p>\r\n<p>\r\nYou need to merge them into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree.\r\n</p>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n\tTree 1                     Tree 2                  \r\n          1                         2                             \r\n         / \\                       / \\                            \r\n        3   2                     1   3                        \r\n       /                           \\   \\                      \r\n      5                             4   7                  \r\n<b>Output:</b> \r\nMerged tree:\r\n\t     3\r\n\t    / \\\r\n\t   4   5\r\n\t  / \\   \\ \r\n\t 5   4   7\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Note:</b>\r\nThe merging process must start from the root nodes of both trees.\r\n</p>\r\n",
	"frequency":"554",
	"ac_num":"63892"
}