{
	"difficulty":"3",
	"submit_num":"399494",
	"show_id":"145",
	"leetcode_id":"145",
	"answers":[
		{
			"lc_ans_id":"45551",
			"view":"27708",
			"top":"0",
			"title":"Preorder, Inorder, and Postorder Iteratively Summarization",
			"vote":"235",
			"content":"Here I summarize the iterative implementation for preorder, inorder, and postorder traverse.\\n\\n<hr>\\n<h3>Pre Order Traverse</h3>\\n<hr>\\n\\n    public List<Integer> preorderTraversal(TreeNode root) {\\n        List<Integer> result = new ArrayList<>();\\n        Deque<TreeNode> stack = new ArrayDeque<>();\\n        TreeNode p = root;\\n        while(!stack.isEmpty() || p != null) {\\n            if(p != null) {\\n                stack.push(p);\\n                result.add(p.val);  // Add before going to children\\n                p = p.left;\\n            } else {\\n                TreeNode node = stack.pop();\\n                p = node.right;   \\n            }\\n        }\\n        return result;\\n    }\\n\\n<hr>\\n<h3>In Order Traverse</h3>\\n<hr>\\n\\n    public List<Integer> inorderTraversal(TreeNode root) {\\n        List<Integer> result = new ArrayList<>();\\n        Deque<TreeNode> stack = new ArrayDeque<>();\\n        TreeNode p = root;\\n        while(!stack.isEmpty() || p != null) {\\n            if(p != null) {\\n                stack.push(p);\\n                p = p.left;\\n            } else {\\n                TreeNode node = stack.pop();\\n                result.add(node.val);  // Add after all left children\\n                p = node.right;   \\n            }\\n        }\\n        return result;\\n    }\\n\\n<hr>\\n<h3>Post Order Traverse</h3>\\n<hr>\\n\\n    public List<Integer> postorderTraversal(TreeNode root) {\\n        LinkedList<Integer> result = new LinkedList<>();\\n        Deque<TreeNode> stack = new ArrayDeque<>();\\n        TreeNode p = root;\\n        while(!stack.isEmpty() || p != null) {\\n            if(p != null) {\\n                stack.push(p);\\n                result.addFirst(p.val);  // Reverse the process of preorder\\n                p = p.right;             // Reverse the process of preorder\\n            } else {\\n                TreeNode node = stack.pop();\\n                p = node.left;           // Reverse the process of preorder\\n            }\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"45559",
			"view":"30189",
			"top":"1",
			"title":"My Accepted code with explaination. Does anyone have a better idea?",
			"vote":"201",
			"content":"pre-order traversal is **root-left-right**, and post order is **left-right-root**. modify the code for pre-order to make it root-right-left, and then  **reverse** the output so that we can get left-right-root .\\n\\n\\n 1. Create an empty stack, Push root node to the stack.\\n 2. Do following while stack is not empty.\\n\\n 2.1. pop an item from the stack and print it.\\n \\n 2.2. push the left child of popped item to stack.\\n\\n 2.3. push the right child of popped item to stack.\\n\\n 3. reverse the ouput.\\n\\n        class Solution {\\n        public:\\n            vector<int> postorderTraversal(TreeNode *root) {\\n                stack<TreeNode*> nodeStack;\\n                vector<int> result;\\n                //base case\\n                if(root==NULL)\\n                return result;\\n                nodeStack.push(root);\\n            while(!nodeStack.empty())\\n            {\\n                TreeNode* node= nodeStack.top();  \\n                result.push_back(node->val);\\n                nodeStack.pop();\\n                if(node->left)\\n                nodeStack.push(node->left);\\n                if(node->right)\\n                nodeStack.push(node->right);\\n            }\\n             reverse(result.begin(),result.end());\\n             return result;\\n            \\n        }\\n    };"
		},
		{
			"lc_ans_id":"45550",
			"view":"7855",
			"top":"2",
			"title":"0 ms Clear C++ solutions --- iterative, recursive, Morris traversal (3 different solutions!)",
			"vote":"64",
			"content":"Hi, this is a fundamental and yet classic problem. I share my three solutions here:\\n\\n 1. Iterative solution using stack --- `O(n)` time and `O(n)` space;\\n 2. Recursive solution --- `O(n)` time and `O(n)` space (considering the spaces of function call stack);\\n 3. **Morris traversal --- `O(n)` time and `O(1)` space!!!**\\n\\nIterative solution using stack:\\n\\n    vector<int> postorderTraversal(TreeNode* root) {\\n        vector<int> nodes;\\n        stack<TreeNode*> toVisit;\\n        TreeNode* curNode = root;\\n        TreeNode* lastNode = NULL;\\n        while (curNode || !toVisit.empty()) {\\n            if (curNode) {\\n                toVisit.push(curNode);\\n                curNode = curNode -> left;\\n            }\\n            else {\\n                TreeNode* topNode = toVisit.top();\\n                if (topNode -> right && lastNode != topNode -> right)\\n                    curNode = topNode -> right;\\n                else {\\n                    nodes.push_back(topNode -> val);\\n                    lastNode = topNode;\\n                    toVisit.pop();\\n                }\\n            }\\n        }\\n        return nodes;\\n    }\\n\\nRecursive solution:\\n\\n    void postorder(TreeNode* root, vector<int>& nodes) {\\n        if (!root) return; \\n        postorder(root -> left, nodes);\\n        postorder(root -> right, nodes);\\n        nodes.push_back(root -> val);\\n    }\\n    vector<int> postorderTraversal(TreeNode* root) {\\n        vector<int> nodes;\\n        postorder(root, nodes);\\n        return nodes;\\n    } \\n\\nMorris traversal:\\n\\n    void reverseNodes(TreeNode* start, TreeNode* end) {\\n        if (start == end) return;\\n        TreeNode* x = start;\\n        TreeNode* y = start -> right;\\n        TreeNode* z;\\n        while (x != end) {\\n            z = y -> right;\\n            y -> right = x;\\n            x = y;\\n            y = z;\\n        }\\n    }\\n    void reverseAddNodes(TreeNode* start, TreeNode* end, vector<int>& nodes) {\\n        reverseNodes(start, end);\\n        TreeNode* node = end;\\n        while (true) {\\n            nodes.push_back(node -> val);\\n            if (node == start) break;\\n            node = node -> right;\\n        }\\n        reverseNodes(end, start);\\n    }\\n    vector<int> postorderTraversal(TreeNode* root) {\\n        vector<int> nodes;\\n        TreeNode* dump = new TreeNode(0);\\n        dump -> left = root;\\n        TreeNode* curNode = dump;\\n        while (curNode) {\\n            if (curNode -> left) {\\n                TreeNode* predecessor = curNode -> left;\\n                while (predecessor -> right && predecessor -> right != curNode)\\n                    predecessor = predecessor -> right;\\n                if (!(predecessor -> right)) {\\n                    predecessor -> right = curNode;\\n                    curNode = curNode -> left;\\n                }\\n                else {\\n                    reverseAddNodes(curNode -> left, predecessor, nodes);\\n                    predecessor -> right = NULL;\\n                    curNode = curNode -> right;\\n                }\\n            }\\n            else curNode = curNode -> right;\\n        }\\n        return nodes;\\n    }"
		},
		{
			"lc_ans_id":"45558",
			"view":"11255",
			"top":"3",
			"title":"A very concise solution",
			"vote":"63",
			"content":"i have saw lots of post in this discussion, but most of them are not concise, just share mine for your  reference, writing a concise code is very important\\n  \\n    vector<int> postorderTraversal(TreeNode *root) {\\n        vector<int> v;\\n        if (!root) return v;\\n        \\n        stack<TreeNode *> s;\\n        s.push(root);\\n        \\n        TreeNode *p = NULL;\\n        while(!s.empty()) {\\n            p = s.top();\\n            s.pop();\\n            v.insert(v.begin(), p->val);\\n            if (p->left) s.push(p->left);\\n            if (p->right) s.push(p->right);\\n        }\\n        \\n        return v;\\n    }"
		},
		{
			"lc_ans_id":"45556",
			"view":"7279",
			"top":"4",
			"title":"Java simple and clean",
			"vote":"54",
			"content":"    public List<Integer> postorderTraversal(TreeNode root) {\\n    \\tLinkedList<Integer> ans = new LinkedList<>();\\n    \\tStack<TreeNode> stack = new Stack<>();\\n    \\tif (root == null) return ans;\\n    \\t\\n    \\tstack.push(root);\\n    \\twhile (!stack.isEmpty()) {\\n    \\t\\tTreeNode cur = stack.pop();\\n    \\t\\tans.addFirst(cur.val);\\n    \\t\\tif (cur.left != null) {\\n    \\t\\t\\tstack.push(cur.left);\\n    \\t\\t}\\n    \\t\\tif (cur.right != null) {\\n    \\t\\t\\tstack.push(cur.right);\\n    \\t\\t} \\n    \\t}\\n    \\treturn ans;\\n    }"
		},
		{
			"lc_ans_id":"45674",
			"view":"3868",
			"top":"5",
			"title":"Accepted tiny Java solution. Only left-hand children in stack.",
			"vote":"27",
			"content":"Share my solution using stack and LinkedList.\\n\\nNotes:\\n\\n 1. In this code I push only left-hand children in to the stack.\\n 2. To store result I use LinkedList and addFirst() method of it.\\n     With such approuch we can save on reverce the result.\\n\\n----------\\n\\n    public List<Integer> postorderTraversal(TreeNode node) {\\n\\t\\tLinkedList<Integer> result = new LinkedList<Integer>();\\n\\t\\tStack<TreeNode> leftChildren = new Stack<TreeNode>();\\n\\t\\twhile(node != null) {\\n\\t\\t\\tresult.addFirst(node.val);\\n\\t\\t\\tif (node.left != null) {\\n\\t\\t\\t\\tleftChildren.push(node.left);\\n\\t\\t\\t}\\n\\t\\t\\tnode = node.right;\\n\\t\\t\\tif (node == null && !leftChildren.isEmpty()) {\\n\\t\\t\\t\\tnode = leftChildren.pop();\\n\\t\\t\\t}\\n\\t\\t}\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"45785",
			"view":"1625",
			"top":"6",
			"title":"Share my two Python iterative solutions, post-order and modified preorder then reverse",
			"vote":"24",
			"content":"The first is by postorder using a flag to indicate whether the node has been visited or not.\\n\\n    class Solution:\\n        # @param {TreeNode} root\\n        # @return {integer[]}\\n        def postorderTraversal(self, root):\\n            traversal, stack = [], [(root, False)]\\n            while stack:\\n                node, visited = stack.pop()\\n                if node:\\n                    if visited:\\n                        # add to result if visited\\n                        traversal.append(node.val)\\n                    else:\\n                        # post-order\\n                        stack.append((node, True))\\n                        stack.append((node.right, False))\\n                        stack.append((node.left, False))\\n    \\n            return traversal\\n\\nThe 2nd uses modified preorder (right subtree first). Then reverse the result.\\n\\n    class Solution:\\n        # @param {TreeNode} root\\n        # @return {integer[]}\\n        def postorderTraversal(self, root):\\n            traversal, stack = [], [root]\\n            while stack:\\n                node = stack.pop()\\n                if node:\\n                    # pre-order, right first\\n                    traversal.append(node.val)\\n                    stack.append(node.left)\\n                    stack.append(node.right)\\n    \\n            # reverse result\\n            return traversal[::-1]"
		},
		{
			"lc_ans_id":"45621",
			"view":"2864",
			"top":"7",
			"title":"Preorder, Inorder and Postorder Traversal Iterative Java Solution",
			"vote":"23",
			"content":"Postorder traversal : [Binary Tree Postorder Traversal][1]\\n\\n    public List<Integer> postorderTraversal(TreeNode root) {\\n        List<Integer> list = new ArrayList<>();\\n        if(root == null) return list;\\n        Stack<TreeNode> stack = new Stack<>();\\n        stack.push(root);\\n        while(!stack.empty()){\\n            root = stack.pop();\\n            list.add(0, root.val);\\n            if(root.left != null) stack.push(root.left);\\n            if(root.right != null) stack.push(root.right);\\n        }\\n        return list;\\n    }\\n\\n\\nPreorder traversal : [Binary Tree Preorder Traversal][2]\\n\\n    public List<Integer> preorderTraversal(TreeNode root) {\\n        List<Integer> list = new ArrayList<>();\\n        if(root == null) return list;\\n        Stack<TreeNode> stack = new Stack<>();\\n        stack.push(root);\\n        while(!stack.empty()){\\n            root = stack.pop();\\n            list.add(root.val);\\n            if(root.right != null) stack.push(root.right);\\n            if(root.left != null) stack.push(root.left);\\n        }\\n        return list;\\n    }\\n\\n\\nInorder traversal : [Binary Tree Inorder Traversal][3]\\n\\n    public List<Integer> inorderTraversal(TreeNode root) {\\n        List<Integer> list = new ArrayList<>();\\n        if(root == null) return list;\\n        Stack<TreeNode> stack = new Stack<>();\\n        while(root != null || !stack.empty()){\\n            while(root != null){\\n                stack.push(root);\\n                root = root.left;\\n            }\\n            root = stack.pop();\\n            list.add(root.val);\\n            root = root.right;\\n        }\\n        return list;\\n    }\\n\\n\\n  [1]: https://leetcode.com/problems/binary-tree-postorder-traversal/\\n  [2]: https://leetcode.com/problems/binary-tree-preorder-traversal/\\n  [3]: https://leetcode.com/problems/binary-tree-inorder-traversal/"
		},
		{
			"lc_ans_id":"45539",
			"view":"1872",
			"top":"8",
			"title":"Iterative method to do three kinds of  traversal just like recursive method only changing one line code",
			"vote":"21",
			"content":"For three different kinds of traversal, we only need to change the order of tuples in one line as we've done this in the recursive solution which is very decent and classical. Just put `(0, p[1])` in different position!\\n\\nFor post-order traversal:\\n\\n    def postorderTraversal(self, root):\\n        res, stack = [], [(1, root)]\\n        while stack:\\n            p = stack.pop()\\n            if not p[1]: continue\\n            stack.extend([(0, p[1]), (1, p[1].right), (1, p[1].left)]) if p[0] != 0 else res.append(p[1].val)\\n        return res\\n\\nFor in-order traversal:\\n\\n    def inorderTraversal(self, root):\\n        res, stack = [], [(1, root)]\\n        while stack:\\n            p = stack.pop()\\n            if not p[1]: continue\\n            stack.extend([(1, p[1].right), (0, p[1]), (1, p[1].left)]) if p[0] != 0 else res.append(p[1].val)\\n        return res\\n\\n\\nFor pre-order traversal:\\n\\n    def preorderTraversal(self, root):\\n        res, stack = [], [(1, root)]\\n        while stack:\\n            p = stack.pop()\\n            if not p[1]: continue\\n            stack.extend([(1, p[1].right), (1, p[1].left), (0, p[1])]) if p[0] != 0 else res.append(p[1].val)\\n        return res"
		},
		{
			"lc_ans_id":"45803",
			"view":"724",
			"top":"9",
			"title":"Java solution using two stacks",
			"vote":"19",
			"content":"    public List<Integer> postorderTraversal(TreeNode root) {\\n      List<Integer> res = new ArrayList<Integer>();\\n      \\n      if (root == null)\\n        return res;\\n          \\n      Stack<TreeNode> s1 = new Stack<TreeNode>();\\n      Stack<TreeNode> s2 = new Stack<TreeNode>();\\n      \\n      s1.push(root);\\n      \\n      while (!s1.isEmpty()) {\\n        TreeNode node = s1.pop();\\n        s2.push(node);\\n        \\n        if (node.left != null)\\n          s1.push(node.left);\\n        \\n        if (node.right != null)\\n          s1.push(node.right);\\n      }\\n      \\n      while (!s2.isEmpty())\\n        res.add(s2.pop().val);\\n      \\n      return res;\\n    }"
		}
	],
	"id":"145",
	"title":"Binary Tree Postorder Traversal",
	"content":"<p>Given a binary tree, return the <em>postorder</em> traversal of its nodes&#39; values.</p>\r\n\r\n<p>For example:<br />\r\nGiven binary tree <code>[1,null,2,3]</code>,</p>\r\n\r\n<pre>\r\n   1\r\n    \\\r\n     2\r\n    /\r\n   3\r\n</pre>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>return <code>[3,2,1]</code>.</p>\r\n\r\n<p><strong>Note:</strong> Recursive solution is trivial, could you do it iteratively?</p>\r\n",
	"frequency":"296",
	"ac_num":"164874"
}