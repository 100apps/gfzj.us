{
	"difficulty":"1",
	"submit_num":"550181",
	"show_id":"110",
	"leetcode_id":"110",
	"answers":[
		{
			"lc_ans_id":"35691",
			"view":"54537",
			"top":"0",
			"title":"The bottom up O(N) solution would be better",
			"vote":"314",
			"content":"This problem is generally believed to have two solutions: the top down approach and the bottom up way.\\n\\n1.The first method checks whether the tree is balanced strictly according to the definition of balanced binary tree: the difference between the heights of the two sub trees are not bigger than 1, and both the left sub tree and right sub tree are also balanced. With the helper function depth(), we could easily write the code; \\n\\n    class solution {\\n    public:\\n        int depth (TreeNode *root) {\\n            if (root == NULL) return 0;\\n            return max (depth(root -> left), depth (root -> right)) + 1;\\n        }\\n    \\n        bool isBalanced (TreeNode *root) {\\n            if (root == NULL) return true;\\n            \\n            int left=depth(root->left);\\n            int right=depth(root->right);\\n            \\n            return abs(left - right) <= 1 && isBalanced(root->left) && isBalanced(root->right);\\n        }\\n    };\\n\\nFor the current node root, calling depth() for its left and right children actually has to access all of its children, thus the complexity is O(N). We do this for each node in the tree, so the overall complexity of isBalanced will be O(N^2). This is a top down approach.\\n\\n2.The second method is based on DFS. Instead of calling depth() explicitly for each child node, we return the height of the current node in DFS recursion. When the sub tree of the current node (inclusive) is balanced, the function dfsHeight() returns a non-negative value as the height. Otherwise -1 is returned.  According to the leftHeight and rightHeight of the two children, the parent node could check if the sub tree\\nis balanced, and decides its return value.\\n\\n    class solution {\\n    public:\\n    int dfsHeight (TreeNode *root) {\\n            if (root == NULL) return 0;\\n            \\n            int leftHeight = dfsHeight (root -> left);\\n            if (leftHeight == -1) return -1;\\n            int rightHeight = dfsHeight (root -> right);\\n            if (rightHeight == -1) return -1;\\n            \\n            if (abs(leftHeight - rightHeight) > 1)  return -1;\\n            return max (leftHeight, rightHeight) + 1;\\n        }\\n        bool isBalanced(TreeNode *root) {\\n            return dfsHeight (root) != -1;\\n        }\\n    };\\n\\nIn this bottom up approach, each node in the tree only need to be accessed once. Thus the time complexity is O(N), better than the first solution."
		},
		{
			"lc_ans_id":"35686",
			"view":"22011",
			"top":"1",
			"title":"Java solution based on height, check left and right node in every recursion to avoid further useless search",
			"vote":"64",
			"content":"\\n    public boolean isBalanced(TreeNode root) {\\n        if(root==null){\\n            return true;\\n        }\\n        return height(root)!=-1;\\n        \\n    }\\n    public int height(TreeNode node){\\n        if(node==null){\\n            return 0;\\n        }\\n        int lH=height(node.left);\\n        if(lH==-1){\\n            return -1;\\n        }\\n        int rH=height(node.right);\\n        if(rH==-1){\\n            return -1;\\n        }\\n        if(lH-rH<-1 || lH-rH>1){\\n            return -1;\\n        }\\n        return Math.max(lH,rH)+1;\\n    }"
		},
		{
			"lc_ans_id":"36042",
			"view":"13354",
			"top":"2",
			"title":"Two different definitions of balanced binary tree result in two different judgments",
			"vote":"47",
			"content":"Input:\\t{1,2,2,3,3,3,3,4,4,4,4,4,4,#,#,5,5}\\n\\nOutput:\\tfalse (based on balanced binary definition **\"no 2 leaf nodes differ in distance from the root by more than 1\"**)\\n\\nExpected:\\ttrue (base on balanced binary definition **\"two subtrees of every node never differ by more than 1\"** )"
		},
		{
			"lc_ans_id":"35708",
			"view":"7182",
			"top":"3",
			"title":"VERY SIMPLE Python solutions (iterative and recursive), both beat 90%",
			"vote":"31",
			"content":"```  \\nclass Solution(object):\\n    def isBalanced(self, root):\\n            \\n        def check(root):\\n            if root is None:\\n                return 0\\n            left  = check(root.left)\\n            right = check(root.right)\\n            if left == -1 or right == -1 or abs(left - right) > 1:\\n                return -1\\n            return 1 + max(left, right)\\n            \\n        return check(root) != -1\\n\\n# 226 / 226 test cases passed.\\n# Status: Accepted\\n# Runtime: 80 ms\\n```\\n\\n\\nIterative, based on postorder traversal:\\n\\n```\\nclass Solution(object):\\n    def isBalanced(self, root):\\n        stack, node, last, depths = [], root, None, {}\\n        while stack or node:\\n            if node:\\n                stack.append(node)\\n                node = node.left\\n            else:\\n                node = stack[-1]\\n                if not node.right or last == node.right:\\n                    node = stack.pop()\\n                    left, right  = depths.get(node.left, 0), depths.get(node.right, 0)\\n                    if abs(left - right) > 1: return False\\n                    depths[node] = 1 + max(left, right)\\n                    last = node\\n                    node = None\\n                else:\\n                    node = node.right\\n        return True\\n\\n\\n# 226 / 226 test cases passed.\\n# Status: Accepted\\n# Runtime: 84 ms\\n\\n```"
		},
		{
			"lc_ans_id":"35694",
			"view":"13575",
			"top":"4",
			"title":"Accepted O(n) solution",
			"vote":"20",
			"content":"We determine recursively the height of the root node but when the recursion is coming upwards we return UNBALANCED instead of the actual height if we know that the tree is already known to be unbalanced. \\n\\nWe visit each node just once thus it has linear time complexity.\\n\\n\\n    private static final int UNBALANCED = -99;\\n    \\n    public boolean isBalanced(TreeNode root) {\\n        if (root == null) {\\n            return true;\\n        }\\n        return getHeight(root) != UNBALANCED;\\n    }\\n    \\n    private int getHeight(TreeNode root) {\\n        if (root == null) {\\n            return -1;\\n        }\\n        int l = getHeight(root.left);\\n        int r = getHeight(root.right);\\n        if (l == UNBALANCED || r == UNBALANCED || Math.abs(l-r) > 1) {\\n            return UNBALANCED;\\n        }\\n        return 1 + Math.max(l,r);\\n    }"
		},
		{
			"lc_ans_id":"35988",
			"view":"9879",
			"top":"5",
			"title":"Can we have a better solution",
			"vote":"15",
			"content":"My solution for this problem is as follows:\\n\\n    public class Solution {\\n    public boolean isBalanced(TreeNode root) {\\n        if (root == null)\\n            return true;\\n        if (Math.abs(depth(root.left) - depth(root.right)) >1)\\n            return false;\\n        return isBalanced(root.left) && isBalanced(root.right);\\n    }\\n    \\n    private int depth(TreeNode root){\\n        if (root == null)\\n            return 0;\\n        return Math.max(depth(root.left), depth(root.right)) + 1;\\n    }\\n}\\n\\nBut it has two recursions, one for depth() and one for isBalanced(). Will there be a performance issue?"
		},
		{
			"lc_ans_id":"35943",
			"view":"4954",
			"top":"6",
			"title":"JAVA O(n) solution based on Maximum Depth of Binary Tree",
			"vote":"14",
			"content":"    public class Solution {\\n    private boolean result = true;\\n\\n    public boolean isBalanced(TreeNode root) {\\n        maxDepth(root);\\n        return result;\\n    }\\n\\n    public int maxDepth(TreeNode root) {\\n        if (root == null)\\n            return 0;\\n        int l = maxDepth(root.left);\\n        int r = maxDepth(root.right);\\n        if (Math.abs(l - r) > 1)\\n            result = false;\\n        return 1 + Math.max(l, r);\\n    }\\n    }"
		},
		{
			"lc_ans_id":"35863",
			"view":"2224",
			"top":"7",
			"title":"Java 1ms Solution",
			"vote":"12",
			"content":"This is perhaps a bit hacky but, hey, it works!\\n\\n    private int helper(TreeNode root, int height)\\n    {\\n        if (root == null)\\n        {\\n            return height;\\n        }\\n        \\n        int leftTree = helper(root.left, height + 1);\\n        int rightTree = helper(root.right, height + 1);\\n        if (leftTree < 0 || rightTree < 0 || Math.abs(leftTree - rightTree) > 1)\\n        {\\n            return -1;\\n        }\\n        \\n        return Math.max(leftTree, rightTree);\\n    }\\n    \\n    public boolean isBalanced(TreeNode root) {\\n        return helper(root, 0) >= 0;\\n    }\\n\\nI tried to avoid mutual recursion or having two functions that both recurse.  Having two functions that both recurse, one to get the depth of the left and right subtree, and one to continue down the tree if that node checks out, works fine but can recurse an unnecessary number of times if the tree is valid.  This function will always complete in O(nodes) since it just calculates the max depth of each subtree and when the recursion unwinds it checks to see if the restriction on the height has been broken.  If it has, it sets the height to -1 (hacky), indicating that the restrictions has been broken.  Essentially, this just gets around returning two values, one for whether the restriction has been broken and one for the max height of tree."
		},
		{
			"lc_ans_id":"35975",
			"view":"2843",
			"top":"8",
			"title":"My C++ solution in 15ms",
			"vote":"12",
			"content":"\\tclass Solution {\\n\\t\\tpublic:\\n\\t\\t\\tint height(TreeNode *root) {\\n\\t\\t\\t\\tif(root == NULL)return 0;\\n\\t\\t\\t\\treturn max(height(root->left), height(root->right)) + 1;\\n\\t\\t\\t}\\n\\t\\t\\tbool isBalanced(TreeNode* root) {\\n\\t\\t\\t\\tif(root == NULL)return true;\\n\\t\\t\\t\\treturn isBalanced(root->left) && isBalanced(root->right) && abs(height(root->left) - height(root->right)) <= 1;\\n\\t\\t\\t}\\n\\t};"
		},
		{
			"lc_ans_id":"35947",
			"view":"1862",
			"top":"9",
			"title":"Input: \\t{1,2,2,3,3,3,3,4,4,4,4,4,4,#,#,5,5}  Expected: \\ttrue",
			"vote":"12",
			"content":"Hi, \\n\\nHow come this input tree is balanced?\\nInput: \\t{1,2,2,3,3,3,3,4,4,4,4,4,4,#,#,5,5}\\nOutput: \\tfalse\\nExpected: \\ttrue\\n\\n                1\\n           2           2\\n        3     3     3     3 \\n      4  4   4 4   4 4   # # \\n     5 5 \\n\\nfrom root 1, the depth to 5 is 4 and from 1 to 3 is 2."
		}
	],
	"id":"110",
	"title":"Balanced Binary Tree",
	"content":"<p>Given a binary tree, determine if it is height-balanced.</p>\r\n\r\n<p>For this problem, a height-balanced binary tree is defined as:</p>\r\n\r\n<blockquote>\r\n<p>a binary tree in which the depth of the two subtrees of <em>every</em> node never differ by more than 1.</p>\r\n</blockquote>\r\n\r\n<p><strong>Example 1:</strong></p>\r\n\r\n<p>Given the following tree <code>[3,9,20,null,null,15,7]</code>:</p>\r\n\r\n<pre>\r\n    3\r\n   / \\\r\n  9  20\r\n    /  \\\r\n   15   7</pre>\r\n\r\n<p>Return true.<br />\r\n<br />\r\n<strong>Example 2:</strong></p>\r\n\r\n<p>Given the following tree <code>[1,2,2,3,3,null,null,4,4]</code>:</p>\r\n\r\n<pre>\r\n       1\r\n      / \\\r\n     2   2\r\n    / \\\r\n   3   3\r\n  / \\\r\n 4   4\r\n</pre>\r\n\r\n<p>Return false.</p>\r\n",
	"frequency":"502",
	"ac_num":"209741"
}