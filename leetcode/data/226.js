{
	"difficulty":"1",
	"submit_num":"403303",
	"show_id":"226",
	"leetcode_id":"226",
	"answers":[
		{
			"lc_ans_id":"62707",
			"view":"32774",
			"top":"0",
			"title":"Straightforward DFS recursive, iterative, BFS solutions",
			"vote":"135",
			"content":"As in many other cases this problem has more than one possible solutions:\\n\\n----------\\n\\nLets start with straightforward - recursive DFS - it's easy to write and pretty much concise.\\n\\n----------\\n\\n    public class Solution {\\n        public TreeNode invertTree(TreeNode root) {\\n            \\n            if (root == null) {\\n                return null;\\n            }\\n    \\n            final TreeNode left = root.left,\\n                    right = root.right;\\n            root.left = invertTree(right);\\n            root.right = invertTree(left);\\n            return root;\\n        }\\n    }\\n\\n----------\\n\\nThe above solution is correct, but it is also bound to the application stack, which means that it's no so much scalable - (you can find the problem size that will overflow the stack and crash your application), so more robust solution would be to use stack data structure.\\n\\n----------\\n\\n\\n    public class Solution {\\n        public TreeNode invertTree(TreeNode root) {\\n            \\n            if (root == null) {\\n                return null;\\n            }\\n    \\n            final Deque<TreeNode> stack = new LinkedList<>();\\n            stack.push(root);\\n            \\n            while(!stack.isEmpty()) {\\n                final TreeNode node = stack.pop();\\n                final TreeNode left = node.left;\\n                node.left = node.right;\\n                node.right = left;\\n                \\n                if(node.left != null) {\\n                    stack.push(node.left);\\n                }\\n                if(node.right != null) {\\n                    stack.push(node.right);\\n                }\\n            }\\n            return root;\\n        }\\n    }\\n\\n----------\\n\\nFinally we can easly convert the above solution to BFS - or so called level order traversal.\\n\\n----------\\n\\n    public class Solution {\\n        public TreeNode invertTree(TreeNode root) {\\n            \\n            if (root == null) {\\n                return null;\\n            }\\n    \\n            final Queue<TreeNode> queue = new LinkedList<>();\\n            queue.offer(root);\\n    \\n            while(!queue.isEmpty()) {\\n                final TreeNode node = queue.poll();\\n                final TreeNode left = node.left;\\n                node.left = node.right;\\n                node.right = left;\\n    \\n                if(node.left != null) {\\n                    queue.offer(node.left);\\n                }\\n                if(node.right != null) {\\n                    queue.offer(node.right);\\n                }\\n            }\\n            return root;\\n        }\\n    }\\n\\n----------\\n\\nIf I can write this code, does it mean I can get job at Google? ;)"
		},
		{
			"lc_ans_id":"62731",
			"view":"12558",
			"top":"1",
			"title":"Recursive and non-recursive C++ both 4ms",
			"vote":"57",
			"content":"Recursive \\n\\n    TreeNode* invertTree(TreeNode* root) {\\n        if (root) {\\n            invertTree(root->left);\\n            invertTree(root->right);\\n            std::swap(root->left, root->right);\\n        }\\n        return root;\\n    }\\n\\nNon-Recursive\\n\\n    TreeNode* invertTree(TreeNode* root) {\\n        std::stack<TreeNode*> stk;\\n        stk.push(root);\\n        \\n        while (!stk.empty()) {\\n            TreeNode* p = stk.top();\\n            stk.pop();\\n            if (p) {\\n                stk.push(p->left);\\n                stk.push(p->right);\\n                std::swap(p->left, p->right);\\n            }\\n        }\\n        return root;\\n    }"
		},
		{
			"lc_ans_id":"62714",
			"view":"11487",
			"top":"2",
			"title":"3-4 lines Python",
			"vote":"52",
			"content":"    def invertTree(self, root):\\n        if root:\\n            root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)\\n            return root\\n\\nMaybe make it four lines for better readability:\\n\\n    def invertTree(self, root):\\n        if root:\\n            invert = self.invertTree\\n            root.left, root.right = invert(root.right), invert(root.left)\\n            return root\\n\\n---\\n\\nAnd an iterative version using my own stack:\\n\\n    def invertTree(self, root):\\n        stack = [root]\\n        while stack:\\n            node = stack.pop()\\n            if node:\\n                node.left, node.right = node.right, node.left\\n                stack += node.left, node.right\\n        return root"
		},
		{
			"lc_ans_id":"62719",
			"view":"10126",
			"top":"3",
			"title":"My simple recursion java solution",
			"vote":"29",
			"content":"    public class Solution {\\n        public TreeNode invertTree(TreeNode root) {\\n            if(root == null) return null;\\n            TreeNode tmp = root.left;\\n            root.left = invertTree(root.right);\\n            root.right = invertTree(tmp);\\n            return root;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"62705",
			"view":"3348",
			"top":"4",
			"title":"Python solutions (recursively, dfs, bfs).",
			"vote":"25",
			"content":"        \\n    # recursively\\n    def invertTree1(self, root):\\n        if root:\\n            root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)\\n            return root\\n            \\n    # BFS\\n    def invertTree2(self, root):\\n        queue = collections.deque([(root)])\\n        while queue:\\n            node = queue.popleft()\\n            if node:\\n                node.left, node.right = node.right, node.left\\n                queue.append(node.left)\\n                queue.append(node.right)\\n        return root\\n        \\n    # DFS\\n    def invertTree(self, root):\\n        stack = [root]\\n        while stack:\\n            node = stack.pop()\\n            if node:\\n                node.left, node.right = node.right, node.left\\n                stack.extend([node.right, node.left])\\n        return root"
		},
		{
			"lc_ans_id":"62858",
			"view":"2632",
			"top":"5",
			"title":"My simple Java Solution",
			"vote":"17",
			"content":"\\n    public class Solution {\\n        public TreeNode invertTree(TreeNode root) {\\n            if (root == null)\\n                return root;\\n            \\n            TreeNode tmp = root.left;\\n            root.left = invertTree(root.right);\\n            root.right = invertTree(tmp);\\n            \\n            return root;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"62891",
			"view":"1739",
			"top":"6",
			"title":"C++, no-recursion, clean BFS solution",
			"vote":"12",
			"content":"If you draw the 3 or 4 level, just to make sure, binary tree and invert it on a paper, you will easily see that all have to be done is to swap kids for each node. This can be done many ways: recursion or using queue to store nodes of one level. Recursion is not good way to go due to performance overhead and risk to run it against huge tree. With standard queue solution looks simple robust and runs faster.\\n\\n    TreeNode* invertTree(TreeNode* root) {\\n        \\n        if(nullptr == root) return root;\\n        \\n        queue<TreeNode*> myQueue;   // our queue to do BFS\\n        myQueue.push(root);         // push very first item - root\\n\\n        while(!myQueue.empty()){    // run until there are nodes in the queue \\n            \\n            TreeNode *node = myQueue.front();  // get element from queue\\n            myQueue.pop();                     // remove element from queue\\n                     \\n            if(node->left != nullptr){         // add left kid to the queue if it exists\\n                myQueue.push(node->left);\\n            }\\n            \\n            if(node->right != nullptr){        // add right kid \\n                myQueue.push(node->right);\\n            }\\n            \\n            // invert left and right pointers      \\n            TreeNode* tmp = node->left;\\n            node->left = node->right;\\n            node->right = tmp;\\n\\n        }\\n\\n        return root;\\n    }"
		},
		{
			"lc_ans_id":"62819",
			"view":"2006",
			"top":"7",
			"title":"Easy iterative in java",
			"vote":"8",
			"content":"    public class Solution {\\n        public TreeNode invertTree(TreeNode root) {\\n            if(root == null) return root;\\n            Queue<TreeNode> queue = new LinkedList<TreeNode>();\\n            queue.offer(root);\\n            while(!queue.isEmpty()){\\n                TreeNode node = queue.poll();\\n                TreeNode tmp = node.left;\\n                node.left = node.right;\\n                node.right = tmp;\\n                if(node.left != null) queue.offer(node.left);\\n                if(node.right != null) queue.offer(node.right);\\n            }\\n            return root;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"62890",
			"view":"1496",
			"top":"8",
			"title":"My simple c++ solution",
			"vote":"8",
			"content":"    class Solution \\n    {\\n    public:\\n    TreeNode* invertTree(TreeNode* root) \\n        {\\n            if(root!=NULL)\\n            {\\n                TreeNode* tmp=root->left;\\n                root->left=root->right;\\n                root->right=tmp;\\n                invertTree(root->left);\\n                invertTree(root->right);\\n            }\\n            return root;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"62766",
			"view":"1607",
			"top":"9",
			"title":"Straightforward Java recursive DFS solution",
			"vote":"8",
			"content":"    public TreeNode invertTree(TreeNode root) {\\n        if (root == null || (root.left == null && root.right == null)) return root;\\n        \\n        TreeNode left = root.left;\\n        root.left = invertTree(root.right);\\n        root.right = invertTree(left);\\n        return root;\\n    }"
		}
	],
	"id":"226",
	"title":"Invert Binary Tree",
	"content":"Invert a binary tree.\n<pre>     4\n   /   \\\n  2     7\n / \\   / \\\n1   3 6   9</pre>\n\nto\n<pre>     4\n   /   \\\n  7     2\n / \\   / \\\n9   6 3   1</pre>\n\n<b>Trivia:</b><br>\nThis problem was inspired by <a href=\"https://twitter.com/mxcl/status/608682016205344768\" target=\"_blank\">this original tweet</a> by <a href=\"https://twitter.com/mxcl\" target=\"_blank\">Max Howell</a>:\n<blockquote>Google: 90% of our engineers use the software you wrote (Homebrew), but you can’t invert a binary tree on a whiteboard so fuck off.</blockquote>",
	"frequency":"576",
	"ac_num":"213216"
}