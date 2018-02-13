{
	"difficulty":"1",
	"submit_num":"120002",
	"show_id":"437",
	"leetcode_id":"437",
	"answers":[
		{
			"lc_ans_id":"91889",
			"view":"17195",
			"top":"0",
			"title":"Simple Java DFS",
			"vote":"142",
			"content":"Typical recursive DFS.\\nSpace: O(n) due to recursion.\\nTime: O(n^2) in worst case (no branching); O(nlogn) in best case (balanced tree).\\n```\\npublic class Solution {\\n    public int pathSum(TreeNode root, int sum) {\\n        if (root == null) return 0;\\n        return pathSumFrom(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);\\n    }\\n    \\n    private int pathSumFrom(TreeNode node, int sum) {\\n        if (node == null) return 0;\\n        return (node.val == sum ? 1 : 0) \\n            + pathSumFrom(node.left, sum - node.val) + pathSumFrom(node.right, sum - node.val);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"91878",
			"view":"37027",
			"top":"1",
			"title":"17 ms O(n) java Prefix sum method",
			"vote":"136",
			"content":"So the idea is similar as Two sum, using HashMap to store ( key : the prefix sum, value : how many ways get to this prefix sum) , and whenever reach a node, we check if prefix sum - target exists in hashmap or not, if it does, we added up the ways of prefix sum - target into res.\\nFor instance : in one path we have 1,2,-1,-1,2, then the prefix sum will be: 1, 3, 2, 1, 3, let's say we want to find target sum is 2, then we will have{2}, {1,2,-1},  {2,-1,-1,2} and {2}ways.\\n\\nI used global variable count, but obviously we can avoid global variable by passing the count from bottom up. The time complexity is O(n). This is my first post in discuss, open to any improvement or criticism. :)\\n\\n```\\n    public int pathSum(TreeNode root, int sum) {\\n        HashMap<Integer, Integer> preSum = new HashMap();\\n        preSum.put(0,1);\\n        helper(root, 0, sum, preSum);\\n        return count;\\n    }\\n    int count = 0;\\n    public void helper(TreeNode root, int currSum, int target, HashMap<Integer, Integer> preSum) {\\n        if (root == null) {\\n            return;\\n        }\\n        \\n        currSum += root.val;\\n\\n        if (preSum.containsKey(currSum - target)) {\\n            count += preSum.get(currSum - target);\\n        }\\n        \\n        if (!preSum.containsKey(currSum)) {\\n            preSum.put(currSum, 1);\\n        } else {\\n            preSum.put(currSum, preSum.get(currSum)+1);\\n        }\\n        \\n        helper(root.left, currSum, target, preSum);\\n        helper(root.right, currSum, target, preSum);\\n        preSum.put(currSum, preSum.get(currSum) - 1);\\n    }\\n```\\n\\nThanks for your advice, @StefanPochmann . Here is the modified version, concise and shorter:\\n```\\n    public int pathSum(TreeNode root, int sum) {\\n        HashMap<Integer, Integer> preSum = new HashMap();\\n        preSum.put(0,1);\\n        return helper(root, 0, sum, preSum);\\n    }\\n    \\n    public int helper(TreeNode root, int currSum, int target, HashMap<Integer, Integer> preSum) {\\n        if (root == null) {\\n            return 0;\\n        }\\n        \\n        currSum += root.val;\\n        int res = preSum.getOrDefault(currSum - target, 0);\\n        preSum.put(currSum, preSum.getOrDefault(currSum, 0) + 1);\\n        \\n        res += helper(root.left, currSum, target, preSum) + helper(root.right, currSum, target, preSum);\\n        preSum.put(currSum, preSum.get(currSum) - 1);\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"91884",
			"view":"16820",
			"top":"2",
			"title":"Simple AC Java Solution DFS",
			"vote":"59",
			"content":"Each time find all the path start from current node\\nThen move start node to the child and repeat. \\nTime Complexity should be O(N^2) for the worst case and O(NlogN) for balanced binary Tree.\\n```\\npublic class Solution {\\n    public int pathSum(TreeNode root, int sum) {\\n        if(root == null)\\n            return 0;\\n        return findPath(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);\\n    }\\n    \\n    public int findPath(TreeNode root, int sum){\\n        int res = 0;\\n        if(root == null)\\n            return res;\\n        if(sum == root.val)\\n            res++;\\n        res += findPath(root.left, sum - root.val);\\n        res += findPath(root.right, sum - root.val);\\n        return res;\\n    }\\n   \\n}\\n````\\nA better solution is suggested in <a href =\"https://discuss.leetcode.com/topic/64526/17-ms-o-n-java-prefix-sum-method\"> 17ms O(n) java prefix sum </a> by tankztc. It use a hash map to store all the prefix sum and each time check if the any subarray sum to the target, add with some comments:\\n```\\n    public int pathSum(TreeNode root, int sum) {\\n        Map<Integer, Integer> map = new HashMap<>();\\n        map.put(0, 1);  //Default sum = 0 has one count\\n        return backtrack(root, 0, sum, map); \\n    }\\n    //BackTrack one pass\\n    public int backtrack(TreeNode root, int sum, int target, Map<Integer, Integer> map){\\n        if(root == null)\\n            return 0;\\n        sum += root.val;\\n        int res = map.getOrDefault(sum - target, 0);    //See if there is a subarray sum equals to target\\n        map.put(sum, map.getOrDefault(sum, 0)+1);\\n        //Extend to left and right child\\n        res += backtrack(root.left, sum, target, map) + backtrack(root.right, sum, target, map);\\n        map.put(sum, map.get(sum)-1);   //Remove the current node so it wont affect other path\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"91877",
			"view":"12006",
			"top":"3",
			"title":"C++ 5 Line Body Code DFS Solution",
			"vote":"32",
			"content":"For tree structure problems. recursion is usually intuitive and easy to write. lol\\n```\\nclass Solution {\\npublic:\\n    int pathSum(TreeNode* root, int sum) {\\n        if(!root) return 0;\\n        return sumUp(root, 0, sum) + pathSum(root->left, sum) + pathSum(root->right, sum);\\n    }\\nprivate:\\n    int sumUp(TreeNode* root, int pre, int& sum){\\n        if(!root) return 0;\\n        int current = pre + root->val;\\n        return (current == sum) + sumUp(root->left, current, sum) + sumUp(root->right, current, sum);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"91892",
			"view":"6386",
			"top":"4",
			"title":"Python solution with detailed explanation",
			"vote":"22",
			"content":"**Path Sum III** https://leetcode.com/problems/path-sum-iii/\\n\\n**Brute Force Solution**\\n* The simplest solution is to traverse each node (preorder traversal) and then find all paths which sum to the target using this node as root.\\n* The worst case complexity for this method is N^2. \\n* If we have a balanced tree, we have the recurrence: T(N) = N + 2T(N/2). This is the merge sort recurrence and suggests NlgN.\\n```\\nclass SolutionBruteForce(object):\\n    def find_paths(self, root, target):\\n        if root:\\n            return int(root.val == target) + self.find_paths(root.left, target-root.val) + self.find_paths(root.right, target-root.val)\\n        return 0\\n\\n    def pathSum(self, root, sum):\\n        \"\"\"\\n        :type root: TreeNode\\n        :type sum: int\\n        :rtype: int\\n        \"\"\"\\n        if root:\\n            return self.find_paths(root, sum) + self.pathSum(root.left, sum) + self.pathSum(root.right, sum)\\n        return 0\\n```\\n\\n**Two Sum Method: Optimized Solution**\\n\\n* A more efficient implementation uses the Two Sum idea. It uses a hash table (extra memory of order N). With more space, it gives us an O(N) complexity.\\n* As we traverse down the tree, at an arbitrary node N, we store the sum until this node N (sum_so_far (prefix) + N.val). in hash-table.  Note this sum is the sum from root to N.\\n* Now at a grand-child of N, say G, we can compute the sum from the root until G since we have the prefix_sum until this grandchild available.We pass in our recursive routine.\\n* How do we know if we have a path of target sum which ends at this grand-child G? Say there are multiple such paths that end at G and say they start at A, B, C where A,B,C are predecessors of G. Then sum(root->G) - sum(root->A) = target. Similarly sum(root->G)-sum(root>B) = target. Therefore we can compute the complement at G as sum_so_far+G.val-target and look up the hash-table for the number of paths which had this sum\\n* Now after we are done with a node and all its grandchildren, we remove it from the hash-table. This makes sure that the number of complement paths returned always correspond to paths that ended at a predecessor node.\\n```\\nclass Solution(object):\\n    def helper(self, root, target, so_far, cache):\\n        if root:\\n            complement = so_far + root.val - target\\n            if complement in cache:\\n                self.result += cache[complement]\\n            cache.setdefault(so_far+root.val, 0)\\n            cache[so_far+root.val] += 1\\n            self.helper(root.left, target, so_far+root.val, cache)\\n            self.helper(root.right, target, so_far+root.val, cache)\\n            cache[so_far+root.val] -= 1\\n        return\\n\\n    def pathSum(self, root, sum):\\n        \"\"\"\\n        :type root: TreeNode\\n        :type sum: int\\n        :rtype: int\\n        \"\"\"\\n        self.result = 0\\n        self.helper(root, sum, 0, {0:1})\\n        return self.result\\n```"
		},
		{
			"lc_ans_id":"91942",
			"view":"3452",
			"top":"5",
			"title":"Easy Recursive Python 7 lines Solution",
			"vote":"9",
			"content":"Similar to #112 and #113, check the whole tree.\\nThe only difference is: Any node can play as start or end in a valid path.\\nAfter each visit, use current node as start, and update the \"targets\" list.\\nPass the updated targets and initial target through.\\n\\nBase case:\\n1. node is None\\n\\nRecursive case:\\n1. node fits in certain path sum.\\n2. node doesn't meet.\\n\\n```\\nclass Solution(object):\\n    def pathSum(self, root, s):\\n        return self.helper(root, s, [s])\\n\\n    def helper(self, node, origin, targets):\\n        if not node: return 0\\n        hit = 0\\n        for t in targets:\\n            if not t-node.val: hit += 1                          # count if sum == target\\n        targets = [t-node.val for t in targets]+[origin]         # update the targets\\n        return hit+self.helper(node.left, origin, targets)+self.helper(node.right, origin, targets)\\n```"
		},
		{
			"lc_ans_id":"91996",
			"view":"2801",
			"top":"6",
			"title":"Easy to understand Java solution with comment.",
			"vote":"8",
			"content":"Any suggestion is greatly appreciated.\\n```\\n/**\\n * Definition for a binary tree node.\\n * public class TreeNode {\\n *     int val;\\n *     TreeNode left;\\n *     TreeNode right;\\n *     TreeNode(int x) { val = x; }\\n * }\\n */\\n \\n/*\\nfor each parent node in the tree, we have 2 choices:\\n1. include it in the path to reach sum.\\n2. not include it in the path to reach sum. \\n\\nfor each child node in the tree, we have 2 choices:\\n1. take what your parent left you.\\n2. start from yourself to form the path.\\n\\none little thing to be careful:\\nevery node in the tree can only try to be the start point once.\\n\\nfor example, When we try to start with node 1, node 3, as a child, could choose to start by itself.\\n             Later when we try to start with 2, node 3, still as a child, \\n             could choose to start by itself again, but we don't want to add the count to result again.\\n     1\\n      \\\\\\n       2\\n        \\\\\\n         3\\n         \\n*/ \\npublic class Solution {\\n    int target;\\n    Set<TreeNode> visited;\\n    public int pathSum(TreeNode root, int sum) {\\n        target = sum;\\n        visited = new HashSet<TreeNode>();  // to store the nodes that have already tried to start path by themselves.\\n        return pathSumHelper(root, sum, false);\\n    }\\n    \\n    public int pathSumHelper(TreeNode root, int sum, boolean hasParent) {\\n        if(root == null) return 0;\\n        //the hasParent flag is used to handle the case when parent path sum is 0.\\n        //in this case we still want to explore the current node.\\n        if(sum == target && visited.contains(root) && !hasParent) return 0;\\n        if(sum == target && !hasParent) visited.add(root);\\n        int count = (root.val == sum)?1:0;\\n        count += pathSumHelper(root.left, sum - root.val, true);\\n        count += pathSumHelper(root.right, sum - root.val, true);\\n        count += pathSumHelper(root.left, target , false);\\n        count += pathSumHelper(root.right, target, false);\\n        return count;\\n    }\\n}````"
		},
		{
			"lc_ans_id":"91888",
			"view":"2505",
			"top":"7",
			"title":"18ms Fast One Pass C++ Solution",
			"vote":"8",
			"content":"```\\nclass Solution {\\npublic:\\n    int help(TreeNode* root, int sum, unordered_map<int, int>& store, int pre) {\\n        if (!root) return 0;\\n        root->val += pre;\\n        int res = (root->val == sum) + (store.count(root->val - sum) ? store[root->val - sum] : 0);\\n        store[root->val]++;\\n        res += help(root->left, sum, store, root->val) + help(root->right, sum, store, root->val);\\n        store[root->val]--;\\n        return res;\\n    }\\n\\n    int pathSum(TreeNode* root, int sum) {\\n        unordered_map<int, int> store;\\n        return help(root, sum, store, 0);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"91958",
			"view":"1950",
			"top":"8",
			"title":"12-line Python O(N) guaranteed",
			"vote":"5",
			"content":"Just copy the code from another problem Maximum size subarray sum which is solved by an O(N) algorithm.\\n\\n```\\nclass Solution(object):\\n    def pathSum(self, root, target):\\n        \"\"\"\\n        :type root: TreeNode\\n        :type target: int\\n        :rtype: int\\n        \"\"\"\\n        self.count = 0\\n        preDict = {0: 1}\\n        def dfs(p, target, pathSum, preDict):\\n            if p:\\n                pathSum += p.val\\n                self.count += preDict.get(pathSum - target, 0)\\n                preDict[pathSum] = preDict.get(pathSum, 0) + 1\\n                dfs(p.left, target, pathSum, preDict)\\n                dfs(p.right, target, pathSum, preDict)\\n                preDict[pathSum] -= 1\\n        dfs(root, target, 0, preDict)\\n        return self.count\\n```"
		},
		{
			"lc_ans_id":"92004",
			"view":"1081",
			"top":"9",
			"title":"C++ straight forward solution",
			"vote":"5",
			"content":"```\\nclass Solution {\\npublic:\\n    int pathSum(TreeNode* root, int sum) {\\n        int res = 0;\\n        pathSumHelper(root, sum, res, false);\\n        return res;\\n    }\\n    void pathSumHelper(TreeNode* root, int sum, int &res, bool parent_used) {\\n        if (!root)\\n            return;\\n        if (sum - root->val == 0)\\n            res++;\\n        pathSumHelper(root->left, sum - root->val, res, true);\\n        pathSumHelper(root->right, sum - root->val, res, true);\\n        if (parent_used == false) { //if parent is part of the sum, then we cannot start a new path which jump over this node\\n            pathSumHelper(root->left, sum, res, false);\\n            pathSumHelper(root->right, sum, res, false);\\n        }\\n    }\\n};\\n````"
		}
	],
	"id":"431",
	"title":"Path Sum III",
	"content":"<p>You are given a binary tree in which each node contains an integer value.</p>\r\n\r\n<p>Find the number of paths that sum to a given value.</p>\r\n\r\n<p>The path does not need to start or end at the root or a leaf, but it must go downwards\r\n(traveling only from parent nodes to child nodes).</p>\r\n\r\n<p>The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nroot = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8\r\n\r\n      10\r\n     /  \\\r\n    <b>5</b>   <b>-3</b>\r\n   <b>/</b> <b>\\</b>    <b>\\</b>\r\n  <b>3</b>   <b>2</b>   <b>11</b>\r\n / \\   <b>\\</b>\r\n3  -2   <b>1</b>\r\n\r\nReturn 3. The paths that sum to 8 are:\r\n\r\n1.  5 -> 3\r\n2.  5 -> 2 -> 1\r\n3. -3 -> 11\r\n</pre>\r\n</p>",
	"frequency":"307",
	"ac_num":"48085"
}