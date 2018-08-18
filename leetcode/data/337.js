{
	"difficulty":"2",
	"submit_num":"130520",
	"show_id":"337",
	"leetcode_id":"337",
	"answers":[
		{
			"lc_ans_id":"79330",
			"view":"40168",
			"top":"0",
			"title":"Step by step tackling of the problem",
			"vote":"869",
			"content":"---\\n\\n**Step I -- Think naively**\\n\\nAt first glance, the problem exhibits the feature of \"optimal substructure\": if we want to rob maximum amount of money from current binary tree (rooted at `root`), we surely hope that we can do the same to its left and right subtrees. \\n\\nSo going along this line, let's define the function `rob(root)` which will return the maximum amount of money that we can rob for the binary tree rooted at `root`; the key now is to construct the solution to the original problem from solutions to its subproblems, i.e., how to get `rob(root)` from `rob(root.left), rob(root.right), ...` etc.\\n\\nApparently the analyses above suggest a recursive solution. And for recursion, it's always worthwhile figuring out the following two properties:\\n\\n 1. Termination condition: when do we know the answer to `rob(root)` without any calculation? Of course when the tree is empty -- we've got nothing to rob so the amount of money is zero.\\n\\n 2. Recurrence relation: i.e., how to get `rob(root)` from `rob(root.left), rob(root.right), ...` etc. From the point of view of the tree root, there are only two scenarios at the end: `root` is robbed or is not. If it is, due to the constraint that \"we cannot rob any two directly-linked houses\", the next level of subtrees that are available would be the four \"**grandchild-subtrees**\" (`root.left.left, root.left.right, root.right.left, root.right.right`).  However if `root` is not robbed, the next level of available subtrees would just be the two \"**child-subtrees**\" (`root.left, root.right`). We only need to choose the scenario which yields the larger amount of money.\\n\\nHere is the program for the ideas above:\\n\\n    public int rob(TreeNode root) {\\n        if (root == null) return 0;\\n        \\n        int val = 0;\\n        \\n        if (root.left != null) {\\n            val += rob(root.left.left) + rob(root.left.right);\\n        }\\n        \\n        if (root.right != null) {\\n            val += rob(root.right.left) + rob(root.right.right);\\n        }\\n        \\n        return Math.max(val + root.val, rob(root.left) + rob(root.right));\\n    }\\n\\nHowever the solution runs very slowly (`1186 ms`) and barely got accepted (the time complexity turns out to be exponential, see my [comments](https://discuss.leetcode.com/topic/39834/step-by-step-tackling-of-the-problem/26?page=2) below).\\n\\n---\\n\\n**Step II -- Think one step further**\\n\\nIn step `I`, we only considered the aspect of \"optimal substructure\", but think little about the possibilities of overlapping of the subproblems. For example, to obtain `rob(root)`, we need `rob(root.left), rob(root.right), rob(root.left.left), rob(root.left.right), rob(root.right.left), rob(root.right.right)`; but to get `rob(root.left)`, we also need `rob(root.left.left), rob(root.left.right)`, similarly for `rob(root.right)`. The naive solution above computed these subproblems repeatedly, which resulted in bad time performance. Now if you recall the two conditions for dynamic programming: \"**optimal substructure**\" + \"**overlapping of subproblems**\", we actually have a DP problem. A naive way to implement DP here is to use a hash map to record the results for visited subtrees. \\n\\nAnd here is the improved solution:\\n\\n    public int rob(TreeNode root) {\\n        return robSub(root, new HashMap<>());\\n    }\\n    \\n    private int robSub(TreeNode root, Map<TreeNode, Integer> map) {\\n        if (root == null) return 0;\\n        if (map.containsKey(root)) return map.get(root);\\n        \\n        int val = 0;\\n        \\n        if (root.left != null) {\\n            val += robSub(root.left.left, map) + robSub(root.left.right, map);\\n        }\\n        \\n        if (root.right != null) {\\n            val += robSub(root.right.left, map) + robSub(root.right.right, map);\\n        }\\n        \\n        val = Math.max(val + root.val, robSub(root.left, map) + robSub(root.right, map));\\n        map.put(root, val);\\n        \\n        return val;\\n    }\\n\\nThe runtime is sharply reduced to `9 ms`, at the expense of `O(n)` space cost (`n` is the total number of nodes; stack cost for recursion is not counted).\\n\\n---\\n\\n**Step III -- Think one step back**\\n\\nIn step `I`, we defined our problem as `rob(root)`, which will yield the maximum amount of money that can be robbed of the binary tree rooted at `root`. This leads to the DP problem summarized in step `II`. \\n\\nNow let's take one step back and ask why we have overlapping subproblems. If you trace all the way back to the beginning, you'll find the answer lies in the way how we have defined `rob(root)`. As I mentioned, for each tree root, there are two scenarios: it is robbed or is not. `rob(root)` does not distinguish between these two cases, so \"information is lost as the recursion goes deeper and deeper\", which results in repeated subproblems.\\n\\nIf we were able to maintain the information about the two scenarios for each tree root, let's see how it plays out. Redefine `rob(root)` as a new function which will return an array of two elements, the first element of which denotes the maximum amount of money that can be robbed if `root` is **not robbed**, while the second element signifies the maximum amount of money robbed if it is **robbed**. \\n\\nLet's relate `rob(root)` to `rob(root.left)` and `rob(root.right)...`, etc. For the 1st element of `rob(root)`, we only need to sum up the larger elements of `rob(root.left)` and `rob(root.right)`, respectively, since `root` is not robbed and we are free to rob its left and right subtrees. For the 2nd element of `rob(root)`, however, we only need to add up the 1st elements of `rob(root.left)` and `rob(root.right)`, respectively, plus the value robbed from `root` itself, since in this case it's guaranteed that we cannot rob the nodes of `root.left` and `root.right`. \\n\\nAs you can see, by keeping track of the information of both scenarios, we decoupled the subproblems and the solution essentially boiled down to a greedy one. Here is the program:\\n\\n    public int rob(TreeNode root) {\\n        int[] res = robSub(root);\\n        return Math.max(res[0], res[1]);\\n    }\\n    \\n    private int[] robSub(TreeNode root) {\\n        if (root == null) return new int[2];\\n        \\n        int[] left = robSub(root.left);\\n        int[] right = robSub(root.right);\\n        int[] res = new int[2];\\n\\n        res[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);\\n        res[1] = root.val + left[0] + right[0];\\n        \\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"79363",
			"view":"11737",
			"top":"1",
			"title":"Easy understanding solution with dfs",
			"vote":"76",
			"content":"dfs all the nodes of the tree, each node return two number, int[] num, num[0] is the max value while rob this node, num[1] is max value while not rob this value. Current node return value only depend on its children's value. Transform function should be very easy to understand.\\n\\n    public class Solution {\\n        public int rob(TreeNode root) {\\n            int[] num = dfs(root);\\n            return Math.max(num[0], num[1]);\\n        }\\n        private int[] dfs(TreeNode x) {\\n            if (x == null) return new int[2];\\n            int[] left = dfs(x.left);\\n            int[] right = dfs(x.right);\\n            int[] res = new int[2];\\n            res[0] = left[1] + right[1] + x.val;\\n            res[1] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);\\n            return res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"79333",
			"view":"7473",
			"top":"2",
			"title":"Simple C++ solution",
			"vote":"46",
			"content":"    /**\\n     * Definition for a binary tree node.\\n     * struct TreeNode {\\n     *     int val;\\n     *     TreeNode *left;\\n     *     TreeNode *right;\\n     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\\n     * };\\n     */\\n    class Solution {\\n    public:\\n        int tryRob(TreeNode* root, int& l, int& r) {\\n            if (!root)\\n                return 0;\\n                \\n            int ll = 0, lr = 0, rl = 0, rr = 0;\\n            l = tryRob(root->left, ll, lr);\\n            r = tryRob(root->right, rl, rr);\\n            \\n            return max(root->val + ll + lr + rl + rr, l + r);\\n        }\\n    \\n        int rob(TreeNode* root) {\\n            int l, r;\\n            return tryRob(root, l, r);\\n        }\\n    };\\n\\nBasically you want to compare which one is bigger between 1) you + sum of your grandchildren and 2) sum of your children. Personally I like my solution better than the most voted solution because I don't need complex data structures like map."
		},
		{
			"lc_ans_id":"79437",
			"view":"5052",
			"top":"3",
			"title":"C++, JAVA, PYTHON &  explanation",
			"vote":"24",
			"content":"Let \\n\\n`f1(node)` be the value of maximum money we can rob from the subtree with `node` as root ( we can rob `node` if necessary).\\n\\n`f2(node)` be the value of maximum money we can rob from the subtree with `node` as root but without robbing `node`. \\n\\nThen we have \\n\\n`f2(node) = f1(node.left) + f1(node.right)` and \\n\\n`f1(node) = max(  f2(node.left)+f2(node.right)+node.value,  f2(node) )`.\\n\\n# C++\\n\\n    class Solution {\\n    public:\\n        int rob(TreeNode* root) {\\n            return robDFS(root).second;\\n        }\\n        pair<int, int> robDFS(TreeNode* node){\\n            if( !node) return make_pair(0,0);\\n            auto l = robDFS(node->left);\\n            auto r = robDFS(node->right);\\n            int f2 = l.second + r.second;\\n            int f1 = max(f2, l.first + r.first + node->val);\\n            return make_pair(f2, f1);\\n        }\\n    };\\n\\n\\n# JAVA\\n\\n    public class Solution {\\n        public int rob(TreeNode root) {\\n            return robDFS(root)[1];\\n        }\\n        int[] robDFS(TreeNode node){\\n            int [] res = new int[2];\\n            if(node==null) return res;\\n            int [] l = robDFS(node.left);\\n            int [] r = robDFS(node.right);\\n            res[0] = l[1] + r[1];\\n            res[1] = Math.max(res[0], l[0] + r[0] + node.val);\\n            return res;\\n        }\\n    }\\n\\n# PYTHON\\n\\n    class Solution(object):\\n        def rob(self, root):\\n            return self.robDFS(root)[1];\\n        def robDFS(self,node):\\n            if node is None:\\n                return (0,0)\\n            l = self.robDFS(node.left)\\n            r = self.robDFS(node.right)\\n            return (l[1] + r[1], max(l[1] + r[1], l[0] + r[0] + node.val))"
		},
		{
			"lc_ans_id":"79344",
			"view":"2769",
			"top":"4",
			"title":"Easy to understand(java)",
			"vote":"20",
			"content":"public class Solution {\\n    \\n    public int rob(TreeNode root) {\\n        if (root == null) return 0;\\n        return Math.max(robInclude(root), robExclude(root));\\n    }\\n    \\n    public int robInclude(TreeNode node) {\\n        if(node == null) return 0;\\n        return robExclude(node.left) + robExclude(node.right) + node.val;\\n    }\\n    \\n    public int robExclude(TreeNode node) {\\n        if(node == null) return 0;\\n        return rob(node.left) + rob(node.right);\\n    }\\n}"
		},
		{
			"lc_ans_id":"79360",
			"view":"3056",
			"top":"5",
			"title":"1ms Java Solution",
			"vote":"16",
			"content":"    public int rob(TreeNode root) {\\n        int[] maxVal = dpRob(root);\\n        return Math.max(maxVal[0], maxVal[1]);\\n    }\\n    \\n    public int[] dpRob(TreeNode root) {\\n        if (root == null) {\\n            return new int[]{0, 0};\\n        } else {\\n            int[] maxVal = new int[2];//maxVal[0] store the max value without robing current node, maxVal[1] store the max value with robing current node,\\n            int[] leftMax = dpRob(root.left);\\n            int[] rightMax = dpRob(root.right);\\n            maxVal[0] = Math.max(leftMax[0], leftMax[1]) + Math.max(rightMax[0], rightMax[1]);\\n            maxVal[1] = leftMax[0] + rightMax[0] + root.val;\\n            return maxVal;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"79403",
			"view":"1633",
			"top":"6",
			"title":"Not a solution, but can be helpful for people wants to find a desired job.",
			"vote":"11",
			"content":"Sorry that this blog is only in Chinese, I will try my best to get an English version soon. I don't know if it is okay to post here, so admin, if there is some problem, please let me know, thanks.\\n\\nhttp://blog.csdn.net/liaozhen/article/details/51654605"
		},
		{
			"lc_ans_id":"79359",
			"view":"1202",
			"top":"7",
			"title":"My simple Java recursive solution",
			"vote":"9",
			"content":"    public class Solution {\\n        public int rob(TreeNode root) {\\n            if(root==null) return 0;\\n            if(root.left==null&&root.right==null) return root.val;\\n            \\n            int left=0, right=0;\\n            int subleft=0, subright=0;\\n        \\n        if(root.left!=null){\\n            left=rob(root.left);\\n            subleft=rob(root.left.left)+rob(root.left.right);\\n        }\\n        \\n        if(root.right!=null){\\n            right=rob(root.right);\\n            subright=rob(root.right.left)+rob(root.right.right);\\n        }\\n        \\n        int sum1=left+right;\\n        int sum2=subleft+subright+root.val;\\n        \\n        return (sum1>sum2)?sum1:sum2;\\n    }\\n}"
		},
		{
			"lc_ans_id":"79394",
			"view":"576",
			"top":"8",
			"title":"Python O(n) code: Optimized for Readability",
			"vote":"7",
			"content":"Implementing the decoupled recursive approach detailed [here](https://discuss.leetcode.com/topic/39834/step-by-step-tackling-of-the-problem)\\n\\n```\\nclass Solution(object):\\n    def rob(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: int\\n        \"\"\"\\n        def superrob(node):\\n            # returns tuple of size two (now, later)\\n            # now: max money earned if input node is robbed\\n            # later: max money earned if input node is not robbed\\n            \\n            # base case\\n            if not node: return (0, 0)\\n            \\n            # get values\\n            left, right = superrob(node.left), superrob(node.right)\\n            \\n            # rob now\\n            now = node.val + left[1] + right[1]\\n            \\n            # rob later\\n            later = max(left) + max(right)\\n            \\n            return (now, later)\\n            \\n        return max(superrob(root))\\n```"
		},
		{
			"lc_ans_id":"79471",
			"view":"525",
			"top":"9",
			"title":"My 12ms C++ solution",
			"vote":"5",
			"content":" \\n\\n     int rob(TreeNode* node, int& lm, int& rm) {\\n        if (!node)  return 0;\\n        int lm1 = 0, lm2 = 0, rm1 = 0, rm2 = 0;\\n        \\n        lm = rob(node->left, lm1, rm1);\\n        rm = rob(node->right, lm2, rm2);\\n        \\n        return max(node->val + lm1 + rm1 + lm2 + rm2, lm + rm);\\n      }\\n\\n     int rob(TreeNode* root) {\\n        int res = 0;\\n        int lm = 0, rm = 0;\\n        res = rob(root, lm, rm);\\n        return res;\\n     }\\n\\n - **lm** is the max rob value of node->left\\n - **rm** is the max rob value of node->right\\n - **lm1** is the max rob value of node->left->left (Same as **lm2**)\\n - **rm1** is the max rob value of node->left->right (Same as **rm2**)\\n - So the max rob value of node is the max value between **(lm + rm)** and **(node->val + lm1 + lm2 + rm1 + rm2)**"
		}
	],
	"id":"337",
	"title":"House Robber III",
	"content":"<p>\r\nThe thief has found himself a new place for his thievery again. There is only one entrance to this area, called the \"root.\" Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that \"all houses in this place forms a binary tree\". It will automatically contact the police if two directly-linked houses were broken into on the same night.\r\n</p>\r\n\r\n<p>\r\nDetermine the maximum amount of money the thief can rob tonight without alerting the police.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n     <font color=\"red\">3</font>\r\n    / \\\r\n   2   3\r\n    \\   \\ \r\n     <font color=\"red\">3   1</font>\r\n</pre>\r\nMaximum amount of money the thief can rob = <font color=\"red\">3</font> + <font color=\"red\">3</font> + <font color=\"red\">1</font> = <b>7</b>.\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n     3\r\n    / \\\r\n   <font color=\"red\">4</font>   <font color=\"red\">5</font>\r\n  / \\   \\ \r\n 1   3   1\r\n</pre>\r\nMaximum amount of money the thief can rob = <font color=\"red\">4</font> + <font color=\"red\">5</font> = <b>9</b>.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/dietpepsi\">@dietpepsi</a> for adding this problem and creating all test cases.</p>",
	"frequency":"336",
	"ac_num":"57993"
}