{
	"difficulty":"2",
	"submit_num":"65347",
	"show_id":"513",
	"leetcode_id":"513",
	"answers":[
		{
			"lc_ans_id":"98779",
			"view":"12193",
			"top":"0",
			"title":"Right-to-Left BFS (Python + Java)",
			"vote":"105",
			"content":"Doing BFS right-to-left means we can simply return the **last** node's value and don't have to keep track of the first node in the current row or even care about rows at all. Inspired by @fallcreek's solution (not published) which uses two nested loops to go row by row but already had the right-to-left idea making it easier. I just took that further.\\n\\n**Python:**\\n\\n    def findLeftMostNode(self, root):\\n        queue = [root]\\n        for node in queue:\\n            queue += filter(None, (node.right, node.left))\\n        return node.val\\n\\n**Java:**\\n\\n    public int findLeftMostNode(TreeNode root) {\\n        Queue<TreeNode> queue = new LinkedList<>();\\n        queue.add(root);\\n        while (!queue.isEmpty()) {\\n            root = queue.poll();\\n            if (root.right != null)\\n                queue.add(root.right);\\n            if (root.left != null)\\n                queue.add(root.left);\\n        }\\n        return root.val;\\n    }"
		},
		{
			"lc_ans_id":"98802",
			"view":"10355",
			"top":"1",
			"title":"Simple Java Solution, beats 100.0%!",
			"vote":"33",
			"content":"``` java\\npublic class Solution {\\n    int ans=0, h=0;\\n    public int findBottomLeftValue(TreeNode root) {\\n        findBottomLeftValue(root, 1);\\n        return ans;\\n    }\\n    public void findBottomLeftValue(TreeNode root, int depth) {\\n        if (h<depth) {ans=root.val;h=depth;}\\n        if (root.left!=null) findBottomLeftValue(root.left, depth+1);\\n        if (root.right!=null) findBottomLeftValue(root.right, depth+1);\\n    }\\n}\\n```\\n\\nNo global variables, 6ms (faster):\\n```\\npublic class Solution {\\n    public int findBottomLeftValue(TreeNode root) {\\n        return findBottomLeftValue(root, 1, new int[]{0,0});\\n    }\\n    public int findBottomLeftValue(TreeNode root, int depth, int[] res) {\\n        if (res[1]<depth) {res[0]=root.val;res[1]=depth;}\\n        if (root.left!=null) findBottomLeftValue(root.left, depth+1, res);\\n        if (root.right!=null) findBottomLeftValue(root.right, depth+1, res);\\n        return res[0];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98786",
			"view":"7322",
			"top":"2",
			"title":"Verbose Java Solution, Binary tree level order traversal",
			"vote":"29",
			"content":"Typical way to do binary tree level order traversal. Only additional step is to remember the ```first``` element of each level.\\n```\\npublic class Solution {\\n    public int findLeftMostNode(TreeNode root) {\\n        if (root == null) return 0;\\n        \\n        int result = 0;\\n        Queue<TreeNode> queue = new LinkedList<>();\\n        queue.add(root);\\n        \\n        while (!queue.isEmpty()) {\\n            int size = queue.size();\\n            for (int i = 0; i < size; i++) {\\n                TreeNode node = queue.poll();\\n                if (i == 0) result = node.val;\\n                if (node.left != null) queue.add(node.left);\\n                if (node.right != null) queue.add(node.right);\\n            }\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98843",
			"view":"2976",
			"top":"3",
			"title":"C++ recursive solution (beats 100%) with basic explanation",
			"vote":"8",
			"content":"Idea is simple:\\nKeep track of the depth of the tree as you move along. Once you get out of left and right subtree of a node, update the leftVal. Code is quite self explanatory. I have added some basic documentation. I hope that it helps!\\n\\n```\\nclass Solution {\\npublic:\\n    void findBottomLeftValue(TreeNode* root, int& maxDepth, int& leftVal, int depth) {\\n        if (root == NULL) {\\n            return;\\n        }\\n        //Go to the left and right of each node \\n        findBottomLeftValue(root->left, maxDepth, leftVal, depth+1);\\n        findBottomLeftValue(root->right, maxDepth, leftVal, depth+1);\\n        \\n        //Update leftVal and maxDepth\\n        if (depth > maxDepth) {\\n            maxDepth = depth;\\n            leftVal = root->val;\\n        }\\n    }\\n    \\n    //Entry function\\n    int findBottomLeftValue(TreeNode* root) {\\n        int maxDepth = 0;\\n        //Initialize leftVal with root's value to cover the edge case with single node\\n        int leftVal = root->val;\\n        findBottomLeftValue(root, maxDepth, leftVal, 0);\\n        return leftVal;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"98817",
			"view":"393",
			"top":"4",
			"title":"my BFS solution for python",
			"vote":"5",
			"content":"class Solution(object):\\n\\n    def findBottomLeftValue(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: int\\n        \"\"\"\\n        queue=[root]; ans=0\\n        while any(queue):\\n            ans=queue[0].val\\n            queue=[leaf for node in queue for leaf in (node.left,node.right) if leaf]\\n        return ans"
		},
		{
			"lc_ans_id":"98827",
			"view":"1648",
			"top":"5",
			"title":"standard BFS in java",
			"vote":"5",
			"content":"```\\n    public int findBottomLeftValue(TreeNode root) {\\n        /*any initial value is valid*/\\n        int result = -1;\\n        ArrayDeque<TreeNode> queue = new ArrayDeque<>();\\n        queue.offer(root);\\n        while (!queue.isEmpty()) {\\n            result = queue.peek().val;\\n            int size = queue.size();\\n            for (int i = 0; i < size; i++) {\\n                TreeNode treeNode = queue.poll();\\n                if (treeNode.left != null) {\\n                    queue.offer(treeNode.left);\\n                }\\n                if (treeNode.right != null) {\\n                    queue.offer(treeNode.right);\\n                }\\n            }\\n        }\\n        return result;\\n    }\\n```"
		},
		{
			"lc_ans_id":"98895",
			"view":"2272",
			"top":"6",
			"title":"C++ BFS solution",
			"vote":"3",
			"content":"```\\nclass Solution {\\npublic:\\n    int findLeftMostNode(TreeNode* root) {\\n        queue<TreeNode*> q;\\n        queue<int> level;\\n        \\n        q.push(root);\\n        level.push(0);\\n        \\n        int m=0;\\n        while(q.size()){\\n            TreeNode *r = q.front(); q.pop();\\n            int l = level.front(); level.pop();\\n            if(r->left) {\\n                q.push(r->left);\\n                level.push(l+1);\\n            }\\n            \\n            if(r->right){\\n                q.push(r->right);\\n                level.push(l+1);\\n            }\\n            \\n            if(l > m){\\n                m = l;\\n                root = r;\\n            }\\n        }\\n        \\n        return root->val;\\n        \\n    }\\n};"
		},
		{
			"lc_ans_id":"98806",
			"view":"261",
			"top":"7",
			"title":"[C++] Clean Code - DFS Recursion with Explanation",
			"vote":"2",
			"content":"Imaging how we would find the max height of a tree. We can carry a ``max-height`` variable and keep updating it.\\nWith little change we can find the ``bottom-left`` as a byproduct of this process.\\n\\nThe idea is to update the ``bottom-left`` only when the depth reach to the next level, that is, whenever you need to update ``max-height`` when ``height > max-height``;\\n\\n**Find Bottom Left**\\n```\\nclass Solution {\\npublic:\\n    int findBottomLeftValue(TreeNode* root) {\\n        int bottomLeft = 0;\\n        int height = 0;\\n        dfs(root, 1, height, bottomLeft);\\n        return bottomLeft;\\n    }\\n\\nprivate:\\n    void dfs(TreeNode* node, int depth, int& height, int& res) {\\n        if (!node) {\\n            return;\\n        }\\n        if (depth > height) {\\n            res = node->val;    // update res only when redefine the height\\n            height = depth;\\n        }\\n        dfs(node->left, depth + 1, height, res);\\n        dfs(node->right, depth + 1, height, res);\\n    }\\n};\\n```\\n\\n**Find Tree Height**\\nHere is how would you find the height of the tree in this approach, it is very similar to Find The Bottom Left\\n```\\nclass Solution {\\npublic:\\n    int treeHeight(TreeNode* root) {\\n        int height = 0;\\n        dfs(root, 1, height);\\n        return height;\\n    }\\n\\nprivate:\\n    void dfs(TreeNode* node, int depth, int& height) {\\n        if (!node) {\\n            return;\\n        }\\n        if (depth > height) {\\n            height = depth;\\n        }\\n        dfs(node->left, depth + 1, height);\\n        dfs(node->right, depth + 1, height);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"98822",
			"view":"407",
			"top":"8",
			"title":"Java solution by post-order traversal (beats 54%)",
			"vote":"2",
			"content":"Since most of the answers use pre-order and level-order traversal. Here is my post-order traversal solution as an inspiration. The idea is to get the bottom left value of each subtree at each root, compare their depths and pass onto its parent.\\n\\n```\\nprivate class ResultSet {\\n    final int depth;\\n    final int val;\\n\\n    ResultSet(int depth, int val) {\\n        this.depth = depth;\\n        this.val = val;\\n    }\\n}\\n\\npublic int findBottomLeftValue(TreeNode root) {\\n    return bottomLeft(root, 0).val;\\n}\\n\\nprivate ResultSet bottomLeft(TreeNode root, int depth) {\\n    if (root == null) return null;\\n    if (root.left == null && root.right == null) return new ResultSet(depth, root.val);\\n    else if (root.left == null) return bottomLeft(root.right, depth + 1);\\n    else if (root.right == null) return bottomLeft(root.left, depth + 1);\\n    else {\\n        ResultSet left = bottomLeft(root.left, depth + 1);\\n        ResultSet right = bottomLeft(root.right, depth + 1);\\n        return right.depth > left.depth ? right : left;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98860",
			"view":"672",
			"top":"9",
			"title":"Python preorder traversal solution O(n) time, \"O(1)\" space",
			"vote":"2",
			"content":"For the space complicity part, just ignore my recursion ;)\\n\\nI use a variable keep track of the first element at a higher level.\\n```\\nclass Solution(object):\\n    def findLeftMostNode(self, root):\\n        self.max_level = 0\\n        self.val = None\\n        self.helper(root, 1)\\n        return self.val\\n        \\n    def helper(self, root, level):\\n        if not root: return\\n        if level > self.max_level:\\n            self.max_level = level\\n            self.val = root.val\\n        self.helper(root.left, level + 1)\\n        self.helper(root.right, level + 1)\\n```"
		}
	],
	"id":"499",
	"title":"Find Bottom Left Tree Value",
	"content":"<p>\r\nGiven a binary tree, find the leftmost value in the last row of the tree. \r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\nInput:\r\n\r\n    2\r\n   / \\\r\n  1   3\r\n\r\nOutput:\r\n1\r\n</pre>\r\n</p>\r\n\r\n<p> <b> Example 2: </b><br>\r\n<pre>\r\nInput:\r\n\r\n        1\r\n       / \\\r\n      2   3\r\n     /   / \\\r\n    4   5   6\r\n       /\r\n      7\r\n\r\nOutput:\r\n7\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nYou may assume the tree (i.e., the given root node) is not <b>NULL</b>.\r\n</p>",
	"frequency":"191",
	"ac_num":"36762"
}