{
	"difficulty":"1",
	"submit_num":"102999",
	"show_id":"543",
	"leetcode_id":"543",
	"answers":[
		{
			"lc_ans_id":"101132",
			"view":"27607",
			"top":"0",
			"title":"Java Solution, MaxDepth",
			"vote":"70",
			"content":"For ```every``` node, length of longest path which ```pass it``` = MaxDepth of its left subtree + MaxDepth of its right subtree.\\n\\n```\\npublic class Solution {\\n    int max = 0;\\n    \\n    public int diameterOfBinaryTree(TreeNode root) {\\n        maxDepth(root);\\n        return max;\\n    }\\n    \\n    private int maxDepth(TreeNode root) {\\n        if (root == null) return 0;\\n        \\n        int left = maxDepth(root.left);\\n        int right = maxDepth(root.right);\\n        \\n        max = Math.max(max, left + right);\\n        \\n        return Math.max(left, right) + 1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101118",
			"view":"6171",
			"top":"1",
			"title":"Python, Simple with Explanation",
			"vote":"13",
			"content":"Let's calculate the depth of a node in the usual way: max(depth of node.left, depth of node.right) + 1.  While we do, a path \"through\" this node uses 1 + (depth of node.left) + (depth of node.right) nodes.  Let's search each node and remember the highest number of nodes used in some path.  The desired length is 1 minus this number.\\n```\\ndef diameterOfBinaryTree(self, root):\\n    self.best = 1\\n    def depth(root):\\n        if not root: return 0\\n        ansL = depth(root.left)\\n        ansR = depth(root.right)\\n        self.best = max(self.best, ansL + ansR + 1)\\n        return 1 + max(ansL, ansR)\\n        \\n    depth(root)\\n    return self.best - 1\\n```"
		},
		{
			"lc_ans_id":"101115",
			"view":"5129",
			"top":"2",
			"title":"[543. Diameter of Binary Tree] C++_Recursive_with brief explanation",
			"vote":"11",
			"content":"We can solve this problem with two different cases:\\n1. If the longest path will include the root node, then the longest path must be the depth(root->right) + depth (root->left)\\n2. If the longest path does not include the root node, this problem is divided into 2 sub-problem: set left child and right child as the new root separately, and repeat step1.\\n\\nWe could get the solution by returning the max path of 1 and 2.\\n\\n    class Solution {\\n    public:\\n    int diameterOfBinaryTree(TreeNode* root) {\\n        if(root == nullptr) return 0;\\n        int res = depth(root->left) + depth(root->right);\\n        return max(res, max(diameterOfBinaryTree(root->left), diameterOfBinaryTree(root->right)));\\n    }\\n    \\n    int depth(TreeNode* root){\\n        if(root == nullptr) return 0;\\n        return 1 + max(depth(root->left), depth(root->right));\\n    }\\n    };"
		},
		{
			"lc_ans_id":"101120",
			"view":"5286",
			"top":"3",
			"title":"Java easy to understand solution",
			"vote":"10",
			"content":"``` \\npublic class Solution {\\n    public int diameterOfBinaryTree(TreeNode root) {\\n        if(root == null){\\n            return 0;\\n        }\\n       int dia = depth(root.left) + depth(root.right);\\n       int ldia = diameterOfBinaryTree(root.left);\\n       int rdia = diameterOfBinaryTree(root.right);\\n       return Math.max(dia,Math.max(ldia,rdia));\\n        \\n    }\\n    public int depth(TreeNode root){\\n        if(root == null){\\n            return 0;\\n        }\\n        return 1+Math.max(depth(root.left), depth(root.right));\\n    }\\n    \\n}\\n\\n ```"
		},
		{
			"lc_ans_id":"101145",
			"view":"3288",
			"top":"4",
			"title":"Simple Python",
			"vote":"10",
			"content":"Just go through the tree.\\n```\\nclass Solution(object):\\n    def diameterOfBinaryTree(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: int\\n        \"\"\"\\n        self.ans = 0\\n        \\n        def depth(p):\\n            if not p: return 0\\n            left, right = depth(p.left), depth(p.right)\\n            self.ans = max(self.ans, left+right)\\n            return 1 + max(left, right)\\n            \\n        depth(root)\\n        return self.ans\\n```"
		},
		{
			"lc_ans_id":"101222",
			"view":"2990",
			"top":"5",
			"title":"C++ Solution, DFS",
			"vote":"5",
			"content":"```cpp\\nclass Solution {\\npublic:\\n    int maxdiadepth = 0;\\n    \\n    int dfs(TreeNode* root){        \\n        if(root == NULL) return 0;\\n        \\n        int leftdepth = dfs(root->left);\\n        int rightdepth = dfs(root->right);\\n        \\n        if(leftdepth + rightdepth > maxdiadepth) maxdiadepth = leftdepth + rightdepth;\\n        return max(leftdepth +1, rightdepth + 1);     \\n    }\\n    \\n    int diameterOfBinaryTree(TreeNode* root) {        \\n        dfs(root);\\n        \\n        return maxdiadepth;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"101130",
			"view":"1954",
			"top":"6",
			"title":"[C++] [Java] Clean Code",
			"vote":"5",
			"content":"**C++**\\n```\\nclass Solution {\\npublic:\\n    int diameterOfBinaryTree(TreeNode* root) {\\n        int diameter = 0;\\n        height(root, diameter);\\n        return diameter;\\n    }\\nprivate:\\n    int height(TreeNode* node, int& diameter) {\\n        if (!node) {\\n            return 0;\\n        }\\n        int lh = height(node->left, diameter);\\n        int rh = height(node->right, diameter);\\n        diameter = max(diameter, lh + rh);\\n        return 1 + max(lh, rh);\\n    }\\n};\\n```\\n**Java**\\n```\\npublic class Solution {\\n    public int diameterOfBinaryTree(TreeNode root) {\\n        int[] diameter = new int[1];\\n        height(root, diameter);\\n        return diameter[0];        \\n    }\\n\\n    private int height(TreeNode node, int[] diameter) {\\n        if (node == null) {\\n            return 0;\\n        }\\n        int lh = height(node.left, diameter);\\n        int rh = height(node.right, diameter);\\n        diameter[0] = Math.max(diameter[0], lh + rh);\\n        return 1 + Math.max(lh, rh);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101129",
			"view":"140",
			"top":"7",
			"title":"Solution by minions_",
			"vote":"4",
			"content":"\\n#### Approach #1 Brute Force [Time Limit Exceeded]\\n\\n**Intuition**\\n\\nBrute Force Approach would be to list out all possible permutation of paths between two nodes\\nI.e. take all pairs of two nodes and find distance between them and finally print the largest distance.\\n\\n\\n**Complexity Analysis**\\n\\n* Time complexity : $$O(n^3)$$.\\n\\nTaking permutation of two nodes will be O(n^2) and per two node finding distance would be O(n)\\nSo total would be O(n^3).\\n\\n* Space complexity : $$O(n)$$.\\n\\n---\\n#### Approach #2 O(n^2) [Accepted]\\n\\n**Intuition**\\n\\nComputing height of left and right subtree at each node\\nNote\\nheight =number of vertices on the longest path from the node to a leaf\\nOr recursively height = max(left subtree height , right subtree height) + 1\\nWhere NULL nodes have height 0 and leaf nodes have height 1\\nFor example:\\n(![0_1506392292167_1.png](/assets/uploads/files/1506392293595-1.png) \\n**[img1.png]**\\n\\nthis tree have height as 3 for path 1 - 2 - 4 comprising of three nodes.\\n\\n**Algorithm**\\nFor each node there would be two cases\\n1. the diameter passes through the node\\n2. the diameter doesn\\u2019t passes through the node\\n\\n\\nCase 1 : diameter passes through the node\\n    Then diameter would be height of left subtree + height of right subtree\\n![0_1506392310862_2.png](/assets/uploads/files/1506392312388-2.png) \\n**[img2.png]**\\n\\n\\nFor e.g. in above figure diameter is 3 as node 1 is part of path of diameter which is\\n4 - 2 - 1 - 3\\nDiameter = left subtree height (2) + right subtree height (1)\\n\\nCase 2 : diameter does not passes through the node\\nIf this is the case, then diameter would be\\nmaximum of (diameter of left subtree , diameter of right subtree)\\nIt is because there is some path in lower parts of tree which is longer than including\\ncurrent node.\\n\\n![0_1506621609740_3.png](/assets/uploads/files/1506621607833-3.png) \\n\\nFor example in above figure diameter is 8 [10-8-6-4-2-5-7-9-11] and it is not passing through 1. Which is maximum of diameter of left tree (8) and right tree (0).\\n\\nSo, for each node recursive formula would be maximum of three quantity\\n1. Diameter of left subtree\\n2. Diameter of right subtree\\n3. Left subtree height + right subtree height\\n\\nWhere first two point assumes that diameter doesn\\u2019t passes through that node\\nAnd third point assumes that diameter passes through that node.\\n\\n\\n**C++**\\n\\n```C++\\nclass Solution {\\npublic:\\n\\n    int height(TreeNode *root)\\n    {\\n        if(!root) // if node is null\\n            return 0;\\n        return max(height(root->left),height(root->right))+1;\\n    }\\n\\n    int diameterOfBinaryTree(TreeNode* root) {\\n\\n        if(!root)return 0;\\n    // computing left subtree height and right subtree height at each node\\n        int lh = height(root->left);\\n        int rh = height(root->right);\\n\\n        return max(max(diameterOfBinaryTree(root->left),diameterOfBinaryTree(root->right)),lh+rh);\\n\\n    }\\n\\n};\\n```\\n\\n**Complexity Analysis**\\n\\n* Time complexity : $$O(n^2)$$.\\n\\nAt each node we are calculating height for left and right subtree\\nheight()    ----->   $$O(n)$$\\nWe are calculating height for each node\\nSo complexity =$$ O(n*n) = O(n^2)$$\\n\\n\\n* Space complexity : $$O(n)$$.\\n\\n\\n#### Approach #2 O(n) [Accepted]\\nStoring height at each node\\n**Intuition**\\n\\nHere main concern is calculation of height at each node.\\nWhat we can do is to save height calculated so far and use that to calculate height of the parent node. For that we need to return height of child to its parent in recursive call.\\n\\nAs we are calculating diameter by return statement we can pass a variable by reference so that its value is changed and seen by the calling parent.\\n\\n\\n\\nWe pass another variable to the function\\ndia(node ptr, var height passed by reference )\\n\\nConsidering base case for leaf nodes : left child and right child are NULL\\nHeight of left subtree = 0\\nHeight of right subtree = 0\\nAs variable is passed by reference\\nLeft height = 0\\nRight height = 0\\nSo height = 0+0+1 = 1\\nAs this variable is also passed by reference the parent of leaf node will get its left subtree or right subtree(depending on whether leaf node is left child or right child) height as 1. Same process goes on recursively.\\n\\nIntuitively, there are basically two variables which are changing with each call\\n\\n1. Diameter calculated till that node so far (by return statement)\\n2. Height (by passed by reference variable)\\n\\nFinally, logic for diameter is same as above algo i.e. maximum of three quantities\\n1. Diameter of left subtree\\n2. Diameter of right subtree\\n3. Left subtree height + right subtree height\\n\\n\\n\\nVisualization\\n\\n[Gif Here]\\n\\nTest Case\\n[4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2]\\nOutput - 8\\n\\n\\n\\n\\n\\n\\n[GIF Link]\\nhttp://gph.is/2fTc9FJ\\n\\n![alt text](![0_1506392342853_leetcode diameter.gif](Uploading 100%) image url)\\n[0_1506620484882_diaporama(1).zip](Uploading 100%) \\n[Gif here]\\n\\n**Solution**\\n```\\nclass Solution {\\npublic:\\n    int dia(TreeNode * root, int &height)\\n    {\\n        int lh=0,rh=0,ld,rd;\\n        if(!root)\\n        {\\n            height=0;\\n            return 0; // dia = 0\\n        }\\n        ld = dia(root->left,lh); // lh passed as a reference\\n        rd = dia(root->right,rh); // rh passed as a reference\\n        height = max(lh,rh)+1;\\n\\n        return max(max(ld,rd),lh+rh);\\n\\n    }\\n    int diameterOfBinaryTree(TreeNode* root) {\\n        int h=0;\\n        if(!root)return 0;\\n        return dia(root,h);\\n    }\\n};\\n```\\n***Complexity Analysis***\\n* Time complexity : $$O(n)$$\\nFor each node, height is calculated in O(1) and recursion goes for all nodes in the tree. Therefore complexity is O(n).\\n* Space complexity : $$O(n)$$."
		},
		{
			"lc_ans_id":"101167",
			"view":"592",
			"top":"8",
			"title":"C solution, DFS 6ms with explanation.",
			"vote":"3",
			"content":"To compute the length of the diameter of the tree, we take the highest value of the sum of the height of the left child + 1 and the height of the right child + 1 for each node. \\n\\nHowever, we can avoid making this calculation for somes nodes. If a node has only one child, the diameter of hils child would be the value of the diameter of the current node -1 < current node <= diameter of the tree.  \\n\\n```\\n static inline int max(int a, int b) //return the highest value of two int, usefull to compute the hight\\n {\\n     return a > b? a :b;\\n }\\nstatic int height(struct TreeNode *t)\\n{\\n  if(!t)\\n    return 0;\\n  return 1 + max(height(t->left), height(t->right));\\n}\\n\\nstatic void dfs(struct TreeNode *root, int *maxi)\\n{\\n    if(root)\\n    {\\n        if(root->left && !root->right)\\n            dfs(root->left, maxi);\\n        else if(root->right && !root->left)\\n            dfs(root->right, maxi);\\n        else\\n        {\\n            int hei = height(root->left) + height(root->right);\\n            if(hei > *maxi)\\n                *maxi = hei;\\n                \\n            dfs(root->left, maxi);\\n            dfs(root->right, maxi);\\n        }\\n    }\\n}\\nint diameterOfBinaryTree(struct TreeNode* root)\\n{\\n    if(!root)\\n      return 0;\\n    int max;\\n    max = height(root->left) + height(root->right);\\n    dfs(root->left, &max);\\n    dfs(root->right, &max);\\n    return max;      \\n}\\n\\n```"
		},
		{
			"lc_ans_id":"101219",
			"view":"128",
			"top":"9",
			"title":"C# easy to understand",
			"vote":"2",
			"content":"calculate depth of both sub-tree of every node\\n```\\nint maxDiameter = 0;\\n        public int DiameterOfBinaryTree(TreeNode root)\\n        {\\n            if (root == null)\\n                return 0;\\n\\n            DiameterOfBinaryTree(root.left);\\n            maxDiameter = Math.Max(findDepth(root.left) + findDepth(root.right), maxDiameter);            \\n            DiameterOfBinaryTree(root.right);\\n\\n            return maxDiameter;\\n        }\\n        int findDepth(TreeNode node)\\n        {\\n            if (node == null)\\n                return 0;\\n\\n            return 1 + Math.Max(findDepth(node.left), findDepth(node.right));\\n        }\\n```"
		}
	],
	"id":"527",
	"title":"Diameter of Binary Tree",
	"content":"<p>\r\nGiven a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the <b>longest</b> path between any two nodes in a tree. This path may or may not pass through the root.\r\n</p>\r\n\r\n<p>\r\n<b>Example:</b><br />\r\nGiven a binary tree <br />\r\n<pre>\r\n          1\r\n         / \\\r\n        2   3\r\n       / \\     \r\n      4   5    \r\n</pre>\r\n</p>\r\n<p>\r\nReturn <b>3</b>, which is the length of the path [4,2,1,3] or [5,2,1,3].\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe length of path between two nodes is represented by the number of edges between them.\r\n</p>",
	"frequency":"326",
	"ac_num":"46488"
}