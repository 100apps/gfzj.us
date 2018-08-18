{
	"difficulty":"2",
	"submit_num":"17772",
	"show_id":"663",
	"leetcode_id":"663",
	"answers":[
		{
			"lc_ans_id":"106727",
			"view":"4138",
			"top":"0",
			"title":"[Java/C++] Simple solution with only one HashMap<>.",
			"vote":"33",
			"content":"The idea is to use a hash table to record all the different sums of each subtree in the tree. If the total sum of the tree is ```sum```, we just need to check if the hash table constains ```sum/2```. \\n\\nThe following code has the correct result at a special case when the tree is ```[0,-1,1]```, which many solutions dismiss. I think this test case should be added.  \\n\\nJava version:\\n```\\n    public boolean checkEqualTree(TreeNode root) {\\n        Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n        int sum = getsum(root, map);\\n        if(sum == 0)return map.getOrDefault(sum, 0) > 1;\\n        return sum%2 == 0 && map.containsKey(sum/2);\\n    }\\n    \\n    public int getsum(TreeNode root, Map<Integer, Integer> map ){\\n        if(root == null)return 0;\\n        int cur = root.val + getsum(root.left, map) + getsum(root.right, map);\\n        map.put(cur, map.getOrDefault(cur,0) + 1);\\n        return cur;\\n    }\\n        \\n```\\n\\nC++ version:\\n```\\n    bool checkEqualTree(TreeNode* root) {\\n        unordered_map<int, int> map;\\n        int sum = getsum(root, map);\\n        if(sum == 0)return map[sum] > 1;\\n        return sum%2 == 0 && map.count(sum/2);\\n    }\\n    \\n    int getsum(TreeNode* root,  unordered_map<int, int>& map){\\n        if(root == NULL)return 0;\\n        int cur = root->val + getsum(root->left, map) + getsum(root->right, map);\\n        map[cur]++;\\n        return cur;\\n    }\\n    \\n```"
		},
		{
			"lc_ans_id":"106724",
			"view":"941",
			"top":"1",
			"title":"Two Pythons...",
			"vote":"7",
			"content":"Cutting an edge means cutting off a proper subtree (i.e., a subtree but not the whole tree). I collect the sums of these proper subtrees in a set and check whether half the total tree sum is a possible cut.\\n\\n    def checkEqualTree(self, root):\\n        def sum(node):\\n            if not node:\\n                return 0\\n            s = node.val + sum(node.left) + sum(node.right)\\n            if node is not root:\\n                cuts.add(s)\\n            return s\\n        cuts = set()\\n        return sum(root) / 2 in cuts\\n\\nAlternatively, I collect all subtree sums in a *list* so that the whole tree's sum is at the end. No need for a hash set's searching speed, as I'm searching the collection only once.\\n\\n    def checkEqualTree(self, root):\\n        def sum(root):\\n            if not root:\\n                return 0\\n            sums.append(root.val + sum(root.left) + sum(root.right))\\n            return sums[-1]\\n        sums = []\\n        sum(root)\\n        return sums.pop() / 2 in sums\\n\\nOh, an alternative ending (not sure what I like better):\\n\\n        sums = []\\n        return sum(root) / 2 in sums[:-1]\\n\\nNote: I used Python 3. In Python 2, change the `/ 2` to `/ 2.`."
		},
		{
			"lc_ans_id":"106718",
			"view":"1838",
			"top":"2",
			"title":"Java solution, Tree traversal and Sum",
			"vote":"5",
			"content":"```\\nclass Solution {\\n    boolean equal = false;\\n    long total = 0;\\n    \\n    public boolean checkEqualTree(TreeNode root) {\\n        if (root.left == null && root.right == null) return false;\\n        total = getTotal(root);\\n        checkEqual(root);\\n        return equal;\\n    }\\n    \\n    private long getTotal(TreeNode root) {\\n        if (root == null) return 0;\\n        return getTotal(root.left) + getTotal(root.right) + root.val;\\n    }\\n    \\n    private long checkEqual(TreeNode root) {\\n        if (root == null || equal) return 0;\\n        \\n        long curSum = checkEqual(root.left) + checkEqual(root.right) + root.val;\\n        if (total - curSum == curSum) {\\n            equal = true;\\n            return 0;\\n        }\\n        return curSum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106745",
			"view":"348",
			"top":"3",
			"title":"Missing some testcases",
			"vote":"4",
			"content":"input [1, -1],\\ninput [5,10,-10,null,null,-2,-3]\\noutput should be false,while OJ gives true.\\n\\nLooks if the total sum is zero, OJ gives the wrong answer\\n\\nRun Code Result:\\xd7\\n\\nYour input\\n\\n[1,-1]\\nYour answer\\n\\nfalse\\nExpected answer\\n\\ntrue"
		},
		{
			"lc_ans_id":"106721",
			"view":"48",
			"top":"4",
			"title":"Time O(N)  Space O(1)   Easy Solution without Global Variable (13 ms beats 95.8%)",
			"vote":"3",
			"content":"The idea is very simple. It is a two pass method.\\nFirst pass is to get the **total sum** of whole tree.\\nSecond pass is almost the same as first time. \\nThe only difference is that **each node** needs to check **if the total sum of its current subtree equals to sum/2**.\\n\\nThe time complexity is O(N) and the space complexity is O(1) not considering the memory occupation of recursion.\\n\\n```\\npublic boolean checkEqualTree(TreeNode root) {\\n\\t// check root\\n\\tif(root == null) {\\n\\t\\treturn false;\\n\\t}\\n\\t// get the total sum\\n\\tint sum = getTotalSum(root);\\n\\n\\t// check  if the sum can be divided by 2\\n\\tif(sum % 2 != 0) {\\n\\t\\treturn false;\\n\\t}\\n\\tboolean[] isFind = new boolean[1];\\n\\tcheckSubtreeSum(root.left, sum / 2, isFind);\\n        // check if already find out from the left side\\n        if(isFind[0]) {\\n            return isFind[0];\\n        }\\n        checkSubtreeSum(root.right, sum / 2, isFind);\\n        return isFind[0];\\n}\\n\\n\\nprivate int getTotalSum(TreeNode node) {\\n\\tif(node == null) {\\n\\t\\treturn 0;\\n\\t}\\n\\treturn node.val + getTotalSum(node.left) + getTotalSum(node.right);\\n}\\n\\nprivate int checkSubtreeSum(TreeNode node, int target, boolean[] isFind) {\\n\\tif(node == null || isFind[0]) {\\n\\t\\treturn 0;\\n\\t}\\n\\tint curNum = node.val + checkSubtreeSum(node.left, target, isFind) + checkSubtreeSum(node.right, target, isFind);\\n\\tif(curNum == target) {\\n\\t\\tisFind[0] = true;\\n\\t}\\n\\treturn curNum;\\n\\n}\\n```"
		},
		{
			"lc_ans_id":"106738",
			"view":"303",
			"top":"5",
			"title":"Clean Java and C#Solution - with Explanation and Visualization - No Extra Data Structure",
			"vote":"3",
			"content":"Steps:\\n- Update the same tree and each node is gonna be sum of all the nodes below it, including itself. `UpdateTreeSumDFS(root)`.\\nFor example:\\n![0_1503209367839_tree.png](/assets/uploads/files/1503209368031-tree-resized.png) \\n- Now, if any edge is removed, the separated subtree will have `the sum=total_sum - its_value`.\\nFor example if we remove 28's left subtree, we will have two trees which have sums of: `28-7=21` and `7`.\\n- We keep the total sum which is the given root's value. (Root of the updated tree).\\n- Then we perform a DFS and check node by node, if by removing an edge, sum of the remaining nodes (`rootSum - root.right.val`) equals to sum of separated subtree (`root.right.val`), we return true.\\n\\nCode:\\n\\nJava:\\n```\\n    public boolean checkEqualTree(TreeNode root)\\n    {\\n        UpdateTreeSumDFS(root);\\n        return CheckEqualDFS(root,root.val);\\n    }\\n    private void UpdateTreeSumDFS(TreeNode root)\\n    {\\n        if (root == null) return;\\n\\n        UpdateTreeSumDFS(root.left);\\n        UpdateTreeSumDFS(root.right);\\n\\n        if (root.left != null)\\n            root.val += root.left.val;\\n\\n        if (root.right != null)\\n            root.val += root.right.val;\\n    }\\n    private boolean CheckEqualDFS(TreeNode root,int rootSum)\\n    {\\n        if (root == null) return false;\\n\\n        if(root.left!=null)\\n        {\\n            if (rootSum - root.left.val == root.left.val)\\n                return true;\\n        }\\n\\n        if(root.right!=null)\\n        {\\n            if (rootSum - root.right.val == root.right.val)\\n                return true;\\n        }\\n\\n        return CheckEqualDFS(root.left,rootSum) || CheckEqualDFS(root.right,rootSum);\\n\\n    }  \\n```\\n\\nC#:\\n```\\n    public bool CheckEqualTree(TreeNode root)\\n    {\\n        UpdateTreeSumDFS(root);\\n        return CheckEqualDFS(root,root.val);\\n    }\\n    private void UpdateTreeSumDFS(TreeNode root)\\n    {\\n        if (root == null) return;\\n\\n        UpdateTreeSumDFS(root.left);\\n        UpdateTreeSumDFS(root.right);\\n\\n        if (root.left != null)\\n            root.val += root.left.val;\\n\\n        if (root.right != null)\\n            root.val += root.right.val;\\n    }\\n    private bool CheckEqualDFS(TreeNode root,int rootSum)\\n    {\\n        if (root == null) return false;\\n\\n        if(root.left!=null)\\n        {\\n            if (rootSum - root.left.val == root.left.val)\\n                return true;\\n        }\\n\\n        if(root.right!=null)\\n        {\\n            if (rootSum - root.right.val == root.right.val)\\n                return true;\\n        }\\n\\n        return CheckEqualDFS(root.left,rootSum) || CheckEqualDFS(root.right,rootSum);\\n\\n    }\\n```"
		},
		{
			"lc_ans_id":"106729",
			"view":"908",
			"top":"6",
			"title":"C++ 4 lines O(n) unordered_multiset",
			"vote":"3",
			"content":"I am traversing the tree and inserting sums of subtrees in the hash set. The tree can be partitioned if there is a subtree sum that is half of the whole tree sum. Note that I am using multiset as it shortens the code a bit and also to check for one-node tree. \\n```\\nint tSum(TreeNode* r, unordered_multiset<long long>& s) {\\n    return r == nullptr ? 0 : *s.insert(r->val + tSum(r->left, s) + tSum(r->right, s));\\n}\\nbool checkEqualTree(TreeNode* root) {\\n    unordered_multiset<long long> sums;\\n    auto sum = tSum(root, sums);\\n    return sum % 2 == 0 && sums.size() > 1 && sums.find(sum / 2) != sums.end();\\n}\\n```"
		},
		{
			"lc_ans_id":"106726",
			"view":"56",
			"top":"7",
			"title":"Clean and passed code for all testcase",
			"vote":"2",
			"content":"```\\n/**\\n * Definition for a binary tree node.\\n * public class TreeNode {\\n *     int val;\\n *     TreeNode left;\\n *     TreeNode right;\\n *     TreeNode(int x) { val = x; }\\n * }\\n */\\nclass Solution {\\n    private int sumTree = 0;\\n    private boolean res = false;\\n    public boolean checkEqualTree(TreeNode root) {\\n        if(root == null) return true;\\n        totalSum(root);\\n        dfs(root);\\n        return res;\\n    }\\n    private void totalSum(TreeNode root){\\n        if(root == null) return ;\\n        sumTree += root.val;\\n        totalSum(root.left);\\n        totalSum(root.right);\\n    }\\n    private int dfs(TreeNode root) {\\n        if(root.left == null && root.right == null) return root.val;\\n        int left = root.left != null ? dfs(root.left) : 0;\\n        int right = root.right != null ? dfs(root.right) : 0;\\n        int cur = root.val + left + right;\\n        if(!res && root.left != null && sumTree - left == left) res = true;\\n        if(!res && root.right != null && sumTree - right == right) res = true;\\n        return cur;\\n    }\\n}"
		},
		{
			"lc_ans_id":"106740",
			"view":"368",
			"top":"8",
			"title":"Straightforward DFS Java Solution with detailed explanation",
			"vote":"2",
			"content":"Get the sum of whole tree and the sum of each subtree. Then check whether one of the sum of a subtree equals the total sum - the sum of this subtree\\n```\\nclass Solution {\\n    private boolean ans = false;\\n    List<Integer> list = new ArrayList<>();// record sum of each subtree\\n    public boolean checkEqualTree(TreeNode root) {\\n        if(root==null) return false;\\n        if(root.left==null&&root.right==null) return false;\\n        int sum = dfs(root);\\n        if(sum==0){\\n            int count = 0;\\n            for(int num : list){\\n                if(num==0){\\n                    count++;\\n                }\\n            }\\n            return count>=2;// check whether there are at least 1 subtress whose sum == 0 so that the other part is also 0. \\n//Then the tree could be divided into 2 eqivalent parts.\\n        }\\n        for(int num : list){\\n            if(num==sum-num){// if the sum of this subtree == total sum - sum of itself, this means the sum of two parts are equal\\n                return true;\\n            }\\n        }\\n        return false;\\n    }\\n    public int dfs(TreeNode root){\\n        if(root==null) return 0;\\n        int cur = root.val;\\n        int left = dfs(root.left);\\n        int right = dfs(root.right);\\n        int sum = cur+left+right;\\n        list.add(sum);\\n        return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106736",
			"view":"104",
			"top":"9",
			"title":"share my concise recursion method with O(1) space complexity",
			"vote":"1",
			"content":"1. check the sum of entire tree, if it isn't a multiple of 2, return false;\\n2. if the tree can be divided into two equal trees, then there must be a node other than root with which we can build a subtree and the sum of it would be half of the sum of the entire tree.\\n```\\nclass Solution {\\n    public boolean checkEqualTree(TreeNode root) {\\n        int sum = sum(root);\\n        if(sum % 2 != 0) return false;\\n        \\n        return checkEqualTree(sum / 2, root.left) || checkEqualTree(sum / 2, root.right);\\n    }\\n    \\n    private boolean checkEqualTree(int target, TreeNode root){\\n        if(root == null) return false;\\n        return target == sum(root) || \\n            (target == sum(root.left) && root.left != null) || \\n            (target == sum(root.right) && root.right != null) ||\\n            checkEqualTree(target, root.left) || checkEqualTree(target, root.right);\\n    }\\n    \\n    public int sum(TreeNode root){\\n        if(root == null) return 0;\\n        return root.val + sum(root.left) + sum(root.right);\\n    }\\n}\\n```"
		}
	],
	"id":"640",
	"title":"Equal Tree Partition",
	"content":"<p>\r\nGiven a binary tree with <code>n</code> nodes, your task is to check if it's possible to partition the tree to two trees which have the equal sum of values after removing <b>exactly</b> one edge on the original tree.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>     \r\n    5\r\n   / \\\r\n  10 10\r\n    /  \\\r\n   2   3\r\n\r\n<b>Output:</b> True\r\n<b>Explanation:</b> \r\n    5\r\n   / \r\n  10\r\n      \r\nSum: 15\r\n\r\n   10\r\n  /  \\\r\n 2    3\r\n\r\nSum: 15\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b>     \r\n    1\r\n   / \\\r\n  2  10\r\n    /  \\\r\n   2   20\r\n\r\n<b>Output:</b> False\r\n<b>Explanation:</b> You can't split the tree into two trees with equal sum after removing exactly one edge on the tree.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The range of tree node value is in the range of [-100000, 100000].</li>\r\n<li>1 <= n <= 10000</li>\r\n</ol>\r\n</p>",
	"frequency":"42",
	"ac_num":"6489"
}