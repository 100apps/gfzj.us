{
	"difficulty":"2",
	"submit_num":"62093",
	"show_id":"333",
	"leetcode_id":"333",
	"answers":[
		{
			"lc_ans_id":"78891",
			"view":"17657",
			"top":"0",
			"title":"Share my O(n) Java code with brief explanation and comments",
			"vote":"49",
			"content":"> edited code: thanks @hyj143 and @petrichory\\n\\n    public class Solution {\\n        \\n        class Result {  // (size, rangeLower, rangeUpper) -- size of current tree, range of current tree [rangeLower, rangeUpper]\\n            int size;\\n            int lower;\\n            int upper;\\n            \\n            Result(int size, int lower, int upper) {\\n                this.size = size;\\n                this.lower = lower;\\n                this.upper = upper;\\n            }\\n        }\\n        \\n        int max = 0;\\n        \\n        public int largestBSTSubtree(TreeNode root) {\\n            if (root == null) { return 0; }    \\n            traverse(root);\\n            return max;\\n        }\\n        \\n        private Result traverse(TreeNode root) {\\n            if (root == null) { return new Result(0, Integer.MAX_VALUE, Integer.MIN_VALUE); }\\n            Result left = traverse(root.left);\\n            Result right = traverse(root.right);\\n            if (left.size == -1 || right.size == -1 || root.val <= left.upper || root.val >= right.lower) {\\n                return new Result(-1, 0, 0);\\n            }\\n            int size = left.size + 1 + right.size;\\n            max = Math.max(size, max);\\n            return new Result(size, Math.min(left.lower, root.val), Math.max(right.upper, root.val));\\n        }\\n    }\\n\\n\\n----------\\n\\n\\n    /*\\n        in brute-force solution, we get information in a top-down manner.\\n        for O(n) solution, we do it in bottom-up manner, meaning we collect information during backtracking. \\n    */\\n    public class Solution {\\n        \\n        class Result {  // (size, rangeLower, rangeUpper) -- size of current tree, range of current tree [rangeLower, rangeUpper]\\n            int size;\\n            int lower;\\n            int upper;\\n            \\n            Result(int size, int lower, int upper) {\\n                this.size = size;\\n                this.lower = lower;\\n                this.upper = upper;\\n            }\\n        }\\n        \\n        int max = 0;\\n        \\n        public int largestBSTSubtree(TreeNode root) {\\n            if (root == null) { return 0; }    \\n            traverse(root, null);\\n            return max;\\n        }\\n        \\n        private Result traverse(TreeNode root, TreeNode parent) {\\n            if (root == null) { return new Result(0, parent.val, parent.val); }\\n            Result left = traverse(root.left, root);\\n            Result right = traverse(root.right, root);\\n            if (left.size==-1 || right.size==-1 || root.val<left.upper || root.val>right.lower) {\\n                return new Result(-1, 0, 0);\\n            }\\n            int size = left.size + 1 + right.size;\\n            max = Math.max(size, max);\\n            return new Result(size, left.lower, right.upper);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"78895",
			"view":"3162",
			"top":"1",
			"title":"Short Python solution",
			"vote":"24",
			"content":"    def largestBSTSubtree(self, root):\\n        def dfs(root):\\n            if not root:\\n                return 0, 0, float('inf'), float('-inf')\\n            N1, n1, min1, max1 = dfs(root.left)\\n            N2, n2, min2, max2 = dfs(root.right)\\n            n = n1 + 1 + n2 if max1 < root.val < min2 else float('-inf')\\n            return max(N1, N2, n), n, min(min1, root.val), max(max2, root.val)\\n        return dfs(root)[0]\\n\\nMy `dfs` returns four values:\\n\\n- `N` is the size of the largest BST in the tree.\\n- If the tree is a BST, then `n` is the number of nodes, otherwise it's -infinity.\\n- If the tree is a BST, then `min` and `max` are the minimum/maximum value in the tree."
		},
		{
			"lc_ans_id":"78892",
			"view":"4168",
			"top":"2",
			"title":"12ms C++ solution",
			"vote":"24",
			"content":"This solution is O(N) since it visits every node exactly once and does a constant amount of work for each.\\n\\n    class Solution {\\n    public:\\n        int largestBSTSubtree(TreeNode* root) {\\n            \\n            int res = 0;\\n            int mini, maxi;\\n            bool b = isBST(root, res, mini, maxi);\\n    \\n            return res;\\n        }\\n        bool isBST(TreeNode* node, int& res, int& mini, int& maxi) {\\n            \\n            if (!node)\\n                return true;\\n            \\n            int left_size=0, right_size=0;\\n            int left_mini, left_maxi, right_mini, right_maxi;\\n            \\n            bool leftB = isBST(node->left, left_size, left_mini, left_maxi);\\n            bool rightB = isBST(node->right, right_size, right_mini, right_maxi);\\n    \\n            if (leftB && rightB) {\\n                if ( (!node->left || node->val >= left_maxi) && (!node->right || node->val <= right_mini) ) {\\n                    /* The tree rooted at this node is a binary search tree */\\n                    res = left_size+right_size+1;\\n                    \\n                    mini = node->left ? left_mini : node->val;\\n                    maxi = node->right ? right_maxi : node->val;\\n                    return true;\\n                }\\n            }\\n            /* The tree rooted at this node is not a binary search tree, so take the maximum size of the BST in the left or right subtrees  */\\n            res = max(left_size, right_size);\\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"78896",
			"view":"4988",
			"top":"3",
			"title":"Clean and easy to understand Java Solution",
			"vote":"18",
			"content":"    public int largestBSTSubtree(TreeNode root) {\\n        if (root == null) return 0;\\n        if (root.left == null && root.right == null) return 1;\\n        if (isValid(root, null, null)) return countNode(root);\\n        return Math.max(largestBSTSubtree(root.left), largestBSTSubtree(root.right));\\n    }\\n    \\n    public boolean isValid(TreeNode root, Integer min, Integer max) {\\n        if (root == null) return true;\\n        if (min != null && min >= root.val) return false;\\n        if (max != null && max <= root.val) return false;\\n        return isValid(root.left, min, root.val) && isValid(root.right, root.val, max);\\n    }\\n    \\n    public int countNode(TreeNode root) {\\n        if (root == null) return 0;\\n        if (root.left == null && root.right == null) return 1;\\n        return 1 + countNode(root.left) + countNode(root.right);\\n    }"
		},
		{
			"lc_ans_id":"78898",
			"view":"2698",
			"top":"4",
			"title":"Java 1ms solution, by passing a three-element array up to parent",
			"vote":"15",
			"content":"Since this is not an overall boolean check, and each subtree can decide if itself is a BST, and update a global size variable, I have chosen to decide BST at each subtree, and pass a 3-element array up. If subtree is not BST, size will be -1, and parent tree will not be BST\\n\\ntime complexity is O(n), since each node is visited exactly once\\n\\n\\n    private int largestBSTSubtreeSize = 0;\\n    public int largestBSTSubtree(TreeNode root) {\\n        helper(root);\\n        return largestBSTSubtreeSize;\\n    }\\n    \\n    private int[] helper(TreeNode root) {\\n        // return 3-element array:\\n        // # of nodes in the subtree, leftmost value, rightmost value\\n        // # of nodes in the subtree will be -1 if it is not a BST\\n        int[] result = new int[3];\\n        if (root == null) {\\n            return result;\\n        }\\n        int[] leftResult = helper(root.left);\\n        int[] rightResult = helper(root.right);\\n        if ((leftResult[0] == 0 || leftResult[0] > 0 && leftResult[2] <= root.val) &&\\n            (rightResult[0] == 0 || rightResult[0] > 0 && rightResult[1] >= root.val)) {\\n           int size = 1 + leftResult[0] + rightResult[0];\\n           largestBSTSubtreeSize = Math.max(largestBSTSubtreeSize, size);\\n           int leftBoundary = leftResult[0] == 0 ? root.val : leftResult[1];\\n           int rightBoundary = rightResult[0] == 0 ? root.val : rightResult[2];\\n           result[0] = size;\\n           result[1] = leftBoundary;\\n           result[2] = rightBoundary;\\n        } else {\\n        \\tresult[0] = -1;\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"78910",
			"view":"1666",
			"top":"5",
			"title":"Share my Java O(n) solution! Very easy to understand",
			"vote":"8",
			"content":"    public class Solution {\\n        class Signal {\\n            int min = Integer.MAX_VALUE;\\n            int max = Integer.MIN_VALUE;\\n            boolean flag = true;\\n            int num = 0;\\n        }\\n        public int largestBSTSubtree(TreeNode root) {\\n            // O(n) complexity\\n            if (root == null) {\\n                return 0;\\n            }\\n            Signal signal = helper(root);\\n            return signal.num;\\n        }\\n        private Signal helper(TreeNode root) {\\n            Signal signal = new Signal();\\n            if (root == null) {\\n                return signal;\\n            } else if (root.left == null && root.right == null) {\\n                signal.num = 1;\\n                signal.min = root.val;\\n                signal.max = root.val;\\n                return signal;\\n            }\\n            Signal left = helper(root.left);\\n            Signal right = helper(root.right);\\n            if (left.flag == false || right.flag == false) {\\n                signal.num = Math.max(left.num,right.num);\\n                signal.flag = false;\\n                return signal;\\n            } else {\\n                if (root.val > left.max && root.val < right.min) {\\n                    signal.min = Math.min(left.min,root.val);\\n                    signal.max = Math.max(right.max,root.val);\\n                    signal.num = left.num + right.num + 1;\\n                    return signal;\\n                } else {\\n                    signal.num = Math.max(left.num, right.num);\\n                    signal.flag = false;\\n                    return signal;\\n                }\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"78977",
			"view":"606",
			"top":"6",
			"title":"Python Easy Understand Solution O(n)",
			"vote":"4",
			"content":"    class SubTree(object):\\n        def __init__(self, largest, n, min, max):\\n            self.largest = largest  # largest BST\\n            self.n = n              # number of nodes in this ST\\n            self.min = min          # min val in this ST\\n            self.max = max          # max val in this ST\\n    \\n    class Solution(object):\\n        def largestBSTSubtree(self, root):\\n            res = self.dfs(root)\\n            return res.largest\\n        \\n        def dfs(self, root):\\n            if not root:\\n                return SubTree(0, 0, float('inf'), float('-inf'))\\n            left = self.dfs(root.left)\\n            right = self.dfs(root.right)\\n            \\n            if root.val > left.max and root.val < right.min:  # valid BST\\n                n = left.n + right.n + 1\\n            else:\\n                n = float('-inf')\\n                \\n            largest = max(left.largest, right.largest, n)\\n            return SubTree(largest, n, min(left.min, root.val), max(right.max, root.val))"
		},
		{
			"lc_ans_id":"78948",
			"view":"1499",
			"top":"7",
			"title":"1ms Java solution",
			"vote":"4",
			"content":"Similar to post order traversal, but we store information in a short array res[], in which res[2] is the answer (res[0] is whether the node is the root of a BST, res[1] is the number of nodes, res[3] is the minimum value of the subtree, res[4] is the maximum value of the subtree). \\n\\nEvery node should be called just once.\\n    \\n    public int largestBSTSubtree(TreeNode root) {\\n        int[] res = recursive(root);\\n        return res[2];\\n    }\\n    \\n    private int[] recursive(TreeNode root) {\\n        int[] res = new int[5];\\n        res[0] = 1; res[3] = Integer.MAX_VALUE; res[4] = Integer.MIN_VALUE;\\n        // 0 - whether is BST, 1 - no. of nodes, 2 - max BST subtree, 3 - min value, 4 - max value\\n        if (root == null) return res;\\n        int[] resL = recursive(root.left);\\n        int[] resR = recursive(root.right);\\n        if (resL[0] == 0 || resR[0] == 0 || resL[4] > root.val || root.val > resR[3])\\n            res[0] = 0;\\n        res[1] = resL[1] + resR[1] + 1;\\n        res[2] = (res[0] > 0) ? res[1] : (Math.max(resL[2], resR[2]));\\n        res[3] = Math.min(root.val, Math.min(resL[3], resR[3]));\\n        res[4] = Math.max(root.val, Math.max(resL[4], resR[4]));\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"78983",
			"view":"417",
			"top":"8",
			"title":"New class solution in Java-- If we can return tup it could be easier",
			"vote":"3",
			"content":"    public class Solution {\\n    \\n        public int largestBSTSubtree(TreeNode root) {\\n            return bst(root).count;\\n        }\\n        \\n        public res bst(TreeNode root){\\n            if(root == null) return new res(0, true, Integer.MIN_VALUE, Integer.MAX_VALUE);\\n            if(root.left == null && root.right == null) return new res(1, true,root.val, root.val);\\n            res left = bst(root.left), right = bst(root.right);\\n\\n            // this line is a mess. it basically verify the BST features...\\n\\n            if(right.bst && (right.count == 0 || root.val<right.min) && left.bst && (left.count == 0 || root.val>left.max)) return new res(1+left.count+right.count, true,Math.max(root.val, right.max),Math.min(root.val, left.min));\\n            return new res(Math.max(left.count, right.count), false,0,0);\\n        }\\n    }\\n    \\n        class res{\\n            int count,max,min;\\n            boolean bst;\\n            \\n            res(int c, boolean b, int ma,int mi){\\n                count = c;\\n                bst = b;\\n                max= ma;\\n                min = mi;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"78928",
			"view":"148",
			"top":"9",
			"title":"C# - post order traversal using bottom up recursion",
			"vote":"2",
			"content":"```\\n    // data object to add to bottom up result or signal invalid subtree \\n    public class BSTNode\\n    {\\n        public bool isBST = false;\\n        public int min = 0;\\n        public int max = 0;\\n        public int count = 0;\\n    }\\n\\n    public class Solution\\n    {\\n        public static BSTNode TrueNode = new BSTNode() { isBST = true, count = 0, min = 0, max = 0 };\\n        public static BSTNode FalseNode = new BSTNode() { isBST = false, count = 0, min = 0, max = 0 };\\n        int best = 0;\\n        \\n        public int LargestBSTSubtree(TreeNode root)\\n        {\\n            best = 0;\\n            Find(root);\\n            return best;\\n        }\\n\\n        public BSTNode Find(TreeNode node)\\n        {\\n            if (node == null) return TrueNode;\\n            \\n            BSTNode left = Find(node.left);\\n            BSTNode right = Find(node.right);\\n            \\n            if (left == FalseNode || right == FalseNode) return FalseNode;\\n\\n            if ((left.count == 0 || node.val > left.max) && (right.count == 0 || node.val < right.min))\\n            {\\n                int curr = 1 + left.count + right.count;\\n                best = curr > best ? curr : best;\\n                \\n                return new BSTNode() \\n                { \\n                    isBST = true, \\n                    count = curr, \\n                    min = (left.count == 0 ? node.val : left.min),\\n                    max = (right.count == 0 ? node.val : right.max)\\n                };\\n            }\\n            else\\n            {\\n                return FalseNode;\\n            }\\n        }\\n    }\\n    \\n\\n```"
		}
	],
	"id":"333",
	"title":"Largest BST Subtree",
	"content":"<p>Given a binary tree, find the largest subtree which is a Binary Search Tree (BST), where largest means subtree with largest number of nodes in it.</p>\r\n<p><b>Note:</b><br>\r\nA subtree must include all of its descendants.<br>\r\nHere's an example:<br />\r\n<pre>\r\n    10\r\n    / \\\r\n   <font color=\"red\">5</font>  15\r\n  <font color=\"red\">/ \\</font>   \\ \r\n <font color=\"red\">1   8</font>   7\r\n</pre>\r\nThe Largest BST Subtree in this case is the highlighted one. <br>\r\nThe return value is the subtree's size, which is 3. \r\n</p>\r\n\r\n<p>\r\n<b>Follow up:</b><br>\r\nCan you figure out ways to solve it with O(n) time complexity?\r\n</p>",
	"frequency":"50",
	"ac_num":"19189"
}