{
	"difficulty":"3",
	"submit_num":"437423",
	"show_id":"124",
	"leetcode_id":"124",
	"answers":[
		{
			"lc_ans_id":"39775",
			"view":"41802",
			"top":"0",
			"title":"Accepted short solution in Java",
			"vote":"235",
			"content":"Here's my ideas:\\n\\n - A path from start to end, goes up on the tree for 0 or more steps, then goes down for 0 or more steps. Once it goes down, it can't go up. Each path has a highest node, which is also the lowest common ancestor of all other nodes on the path.\\n - A recursive method `maxPathDown(TreeNode node)` (1) computes the maximum path sum with highest node is the input node, update maximum if necessary (2) returns the maximum sum of the path that can be extended to input node's parent.\\n\\nCode:\\n\\n    public class Solution {\\n        int maxValue;\\n        \\n        public int maxPathSum(TreeNode root) {\\n            maxValue = Integer.MIN_VALUE;\\n            maxPathDown(root);\\n            return maxValue;\\n        }\\n        \\n        private int maxPathDown(TreeNode node) {\\n            if (node == null) return 0;\\n            int left = Math.max(0, maxPathDown(node.left));\\n            int right = Math.max(0, maxPathDown(node.right));\\n            maxValue = Math.max(maxValue, left + right + node.val);\\n            return Math.max(left, right) + node.val;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"39869",
			"view":"20238",
			"top":"1",
			"title":"Simple O(n) algorithm with one traversal through the tree",
			"vote":"79",
			"content":"    class Solution {\\n        int maxToRoot(TreeNode *root, int &re) {\\n            if (!root) return 0;\\n            int l = maxToRoot(root->left, re);\\n            int r = maxToRoot(root->right, re);\\n            if (l < 0) l = 0;\\n            if (r < 0) r = 0;\\n            if (l + r + root->val > re) re = l + r + root->val;\\n            return root->val += max(l, r);\\n        }\\n    public:\\n        int maxPathSum(TreeNode *root) {\\n            int max = -2147483648;\\n            maxToRoot(root, max);\\n            return max;\\n        }\\n    };\\n\\nupdate the val of each node of the tree bottom-up, the new val of TreeNode *x stands for the max sum started from any node in subtree x and ended in x, mataining the re for result in traversal at the same time."
		},
		{
			"lc_ans_id":"39875",
			"view":"10385",
			"top":"2",
			"title":"Elegant Java solution",
			"vote":"68",
			"content":"    public class Solution {\\n        int max = Integer.MIN_VALUE;\\n        \\n        public int maxPathSum(TreeNode root) {\\n            helper(root);\\n            return max;\\n        }\\n        \\n        // helper returns the max branch \\n        // plus current node's value\\n        int helper(TreeNode root) {\\n            if (root == null) return 0;\\n            \\n            int left = Math.max(helper(root.left), 0);\\n            int right = Math.max(helper(root.right), 0);\\n            \\n            max = Math.max(max, root.val + left + right);\\n            \\n            return root.val + Math.max(left, right);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"39807",
			"view":"7785",
			"top":"3",
			"title":"A very concise recursive solution",
			"vote":"25",
			"content":"    int maxPathSum(TreeNode *root) {\\n        int maxPath = INT_MIN;\\n        dfsMaxPath(root, maxPath);\\n        return maxPath;\\n    }\\n    \\n    int dfsMaxPath(TreeNode *root, int &maxPath) {\\n        if (!root) return 0;\\n        int l = max(0, dfsMaxPath(root->left, maxPath));\\n        int r = max(0, dfsMaxPath(root->right, maxPath));\\n        maxPath = max(maxPath, l + r + root->val);\\n        return root->val + max(l, r);\\n    }"
		},
		{
			"lc_ans_id":"39811",
			"view":"6719",
			"top":"4",
			"title":"What is the meaning of path in this problem?",
			"vote":"25",
			"content":"Can someone help me understanding the problem?\\n\\nI am not clear on the path of the tree in this problem. Is the path meant to be one of tree traverse. Like level order, in , pre or post order traverse?"
		},
		{
			"lc_ans_id":"39933",
			"view":"6037",
			"top":"5",
			"title":"Accepted O(n) solution",
			"vote":"18",
			"content":"The idea is based on the solution of max sum of a sequence array, Here is the explaination of the code:\\n\\n - Have a recursive method which traverse the binary tree, it also\\n   return the max possible sum of left branch and right branch\\n   saperately. for example, For node A, when it's left and right node\\n   recusive call returned, we will know the max possible sum of left\\n   branch, right branch.\\n   \\n - Have a CheckMax function which will compare the sequence sum and\\n   record the max history. For node A, check whether left branch + this \\n   node + right branch is the maximum, check whether left branch + this \\n   node is max\\uff0c check whether right branch + this node is max.\\n - When recursive method return, we should only return the max sum of one path - either the left branch + this node, or the right branch +\\n   this node. So that this is still a single path and can be used to\\n   link by node A's parent node.\\n\\nIt's accepted by OL. Let me know if you have any question\\n\\n    class Solution {\\n        public:\\n            int maxPathSum(TreeNode *root) {\\n                if(!root) return 0;\\n                maxSum = root->val;\\n                recNodes(root); \\n                return maxSum;\\n            }\\n        \\n        protected:\\n            int recNodes(TreeNode* node)\\n            {\\n                int numl=0,numr=0;\\n                if (node->left)\\n                    numl = recNodes(node->left);\\n                if (node->right)\\n                    numr = recNodes(node->right);\\n        \\n                //choose the max path, either left or right \\n                int value = node->val;\\n                int sumWhole = checkMax(value,numl+numr);\\n                int sumLeft = numl>0?checkMax(value,numl):value;\\n                int sumRight = numr>0?checkMax(value,numr):value;\\n        \\n                return max(sumLeft,sumRight);\\n            }\\n        \\n            int checkMax(int value, int sum)\\n            {\\n                if(sum>0)\\n                    sum+=value;\\n                else\\n                    sum=value;\\n                if(sum>maxSum)\\n                    maxSum = sum;\\n                return sum;\\n            }\\n        \\n            int maxSum;\\n        };"
		},
		{
			"lc_ans_id":"39873",
			"view":"2000",
			"top":"6",
			"title":"[recommend for beginners]clean C++ implementation with detailed explanation",
			"vote":"13",
			"content":"    class Solution {\\n        int sum;\\n    public:\\n        int maxPathSum(TreeNode* root) {\\n            sum=INT_MIN;\\n            help(root);\\n            return sum;\\n        }\\n        \\n        /*** return the max-value-ended-at-root-node ***/\\n        int help(TreeNode* root){\\n            if(!root)   return 0;\\n            int left = max(0, help(root->left));\\n            int right = max(0, help(root->right));\\n            /*** key parts : embedding the max-value-find in the recursion process ***/\\n            sum = max(sum, left+right+root->val);\\n            /*** get the max-value-ended-at-root ***/\\n            return max(left, right)+root->val;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"39871",
			"view":"1155",
			"top":"7",
			"title":"Sharing a simple JAVA solution",
			"vote":"12",
			"content":"\\n    int max = Integer.MIN_VALUE;\\n    \\n    public int maxPathSum(TreeNode root) {\\n        helper(root);\\n        return max;\\n    }\\n    \\n    public int helper(TreeNode root) {\\n        if(root == null)\\n            return Integer.MIN_VALUE;\\n        int left = Math.max(0, helper(root.left));\\n        int right = Math.max(0, helper(root.right));\\n        max = Math.max(max, root.val + left + right);\\n        return root.val + Math.max(left, right);\\n    }"
		},
		{
			"lc_ans_id":"39888",
			"view":"1572",
			"top":"8",
			"title":"A recursive solution with comment",
			"vote":"11",
			"content":"        \\n        // global max\\n        int max = Integer.MIN_VALUE;\\n\\n        public int maxPathSum(TreeNode root) {\\n            dfs(root);\\n            return max;\\n        }\\n        \\n        private int dfs(TreeNode root) {\\n            if (root == null) return 0;\\n            // 2 possible choices\\n            // 1.Already calculated in left or right child\\n            // 2.left max path + right max path + root\\n            int lMax = dfs(root.left);\\n            int rMax = dfs(root.right);\\n            if (lMax + rMax + root.val > max) max = lMax + rMax + root.val;\\n            // if the below path is negative, just make it 0 so that we could 'ignore' it\\n            return Math.max(0, root.val + Math.max(lMax, rMax));\\n        }"
		},
		{
			"lc_ans_id":"39913",
			"view":"1961",
			"top":"9",
			"title":"Clean c++ solution",
			"vote":"10",
			"content":"    class Solution {\\n        int res;\\n    public:\\n        int depth(TreeNode *root){\\n            if(root==NULL) return 0;\\n            int a=depth(root->left), b=depth(root->right);\\n            res=max(res,a+b+root->val);//if *root is the top node in the path\\n            return max(0,max(a, b)+root->val);//if *root is in the path, if this branch a burden or a plus\\n        }\\n        int maxPathSum(TreeNode *root) {\\n            if(root==NULL) return 0;\\n            res=root->val;\\n            depth(root);\\n            return res;\\n        }\\n    };"
		}
	],
	"id":"124",
	"title":"Binary Tree Maximum Path Sum",
	"content":"<p>\r\nGiven a binary tree, find the maximum path sum.\r\n</p>\r\n\r\n<p>For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain <b>at least one node</b> and does not need to go through the root.</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven the below binary tree,\r\n<pre>\r\n       1\r\n      / \\\r\n     2   3\r\n</pre>\r\n</p>\r\n<p>\r\nReturn <code>6</code>.\r\n</p>",
	"frequency":"447",
	"ac_num":"117631"
}