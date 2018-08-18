{
	"difficulty":"2",
	"submit_num":"514444",
	"show_id":"94",
	"leetcode_id":"94",
	"answers":[
		{
			"lc_ans_id":"31213",
			"view":"39556",
			"top":"0",
			"title":"Iterative solution in Java - simple and readable",
			"vote":"327",
			"content":"    \\n    public List<Integer> inorderTraversal(TreeNode root) {\\n        List<Integer> list = new ArrayList<Integer>();\\n\\n        Stack<TreeNode> stack = new Stack<TreeNode>();\\n        TreeNode cur = root;\\n\\n        while(cur!=null || !stack.empty()){\\n            while(cur!=null){\\n                stack.add(cur);\\n                cur = cur.left;\\n            }\\n            cur = stack.pop();\\n            list.add(cur.val);\\n            cur = cur.right;\\n        }\\n\\n        return list;\\n    }"
		},
		{
			"lc_ans_id":"31232",
			"view":"14994",
			"top":"1",
			"title":"Three Methods to Solve (C++)",
			"vote":"77",
			"content":"Method 1: Using one stack and the binary tree node will be changed. Easy ,not Practical\\n\\n    class Solution {\\n    public:\\n        vector<int> inorderTraversal(TreeNode *root) {\\n            vector<int> vector;\\n            if(!root)\\n            return vector;\\n            stack<TreeNode *> stack;\\n            stack.push(root);\\n            while(!stack.empty())\\n            {\\n                TreeNode *pNode = stack.top();\\n                if(pNode->left)\\n                {\\n                    stack.push(pNode->left);\\n                    pNode->left = NULL;\\n                }\\n                else\\n                {\\n                    vector.push_back(pNode->val);\\n                    stack.pop();\\n                    if(pNode->right)\\n                    stack.push(pNode->right);\\n                }\\n            }\\n            return vector;\\n        }\\n    };\\n\\nMethod 2: Using one stack and one unordered_map, this will not changed the node. Better\\n\\n    class Solution {\\n    public:\\n        vector<int> inorderTraversal(TreeNode *root) {\\n            vector<int> vector;\\n            if(!root)\\n            return vector;\\n            unordered_map<TreeNode *, bool> map;//left child has been visited:true.\\n            stack<TreeNode *> stack;\\n            stack.push(root);\\n            while(!stack.empty())\\n            {\\n                TreeNode *pNode = stack.top();\\n                if(pNode->left && !map[pNode])\\n                {\\n                    stack.push(pNode->left);\\n                    map[pNode] = true;\\n                }\\n                else\\n                {\\n                    vector.push_back(pNode->val);\\n                    stack.pop();\\n                    if(pNode->right)\\n                    stack.push(pNode->right);\\n                }\\n            }\\n            return vector;\\n        }\\n    };\\n\\nMethod 3: Using one stack  and will not changed the node. Best(at least in this three solutions)\\n\\n    class Solution {\\n    public:\\n        vector<int> inorderTraversal(TreeNode *root) {\\n            vector<int> vector;\\n            stack<TreeNode *> stack;\\n            TreeNode *pCurrent = root;\\n            \\n            while(!stack.empty() || pCurrent)\\n            {\\n                if(pCurrent)\\n                {\\n                    stack.push(pCurrent);\\n                    pCurrent = pCurrent->left;\\n                }\\n                else\\n                {\\n                    TreeNode *pNode = stack.top();\\n                    vector.push_back(pNode->val);\\n                    stack.pop();\\n                    pCurrent = pNode->right;\\n                }\\n            }\\n            return vector;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"31231",
			"view":"9825",
			"top":"2",
			"title":"Clear C++ solutions --- iterative, recursive and Morris traversal (3 different solutions!)",
			"vote":"61",
			"content":"Hi, this is a fundamental and yet classic problem. I share my three solutions here:\\n\\n 1. Iterative solution using stack --- `O(n)` time and `O(n)` space;\\n 2. Recursive solution --- `O(n)` time and `O(n)` space (considering the spaces of function call stack);\\n 3. **Morris traversal --- `O(n)` time and `O(1)` space!!!**\\n\\nIterative solution using stack:\\n\\n    vector<int> inorderTraversal(TreeNode* root) {\\n        vector<int> nodes;\\n        stack<TreeNode*> toVisit;\\n        TreeNode* curNode = root;\\n        while (curNode || !toVisit.empty()) {\\n            if (curNode) {\\n                toVisit.push(curNode);\\n                curNode = curNode -> left;\\n            }\\n            else {\\n                curNode = toVisit.top();\\n                toVisit.pop();\\n                nodes.push_back(curNode -> val);\\n                curNode = curNode -> right;\\n            }\\n        }\\n        return nodes;\\n    }\\n\\nRecursive solution:\\n\\n    void inorder(TreeNode* root, vector<int>& nodes) {\\n        if (!root) return;\\n        inorder(root -> left, nodes);\\n        nodes.push_back(root -> val);\\n        inorder(root -> right, nodes);\\n    }\\n    vector<int> inorderTraversal(TreeNode* root) {\\n        vector<int> nodes;\\n        inorder(root, nodes);\\n        return nodes;\\n    } \\n\\nMorris traversal:\\n\\n    vector<int> inorderTraversal(TreeNode* root) {\\n        TreeNode* curNode = root;\\n        vector<int> nodes;\\n        while (curNode) {\\n            if (curNode -> left) {\\n                TreeNode* predecessor = curNode -> left;\\n                while (predecessor -> right && predecessor -> right != curNode)\\n                    predecessor = predecessor -> right;\\n                if (!(predecessor -> right)) {\\n                    predecessor -> right = curNode;\\n                    curNode = curNode -> left;\\n                }\\n                else {\\n                    predecessor -> right = NULL;\\n                    nodes.push_back(curNode -> val);\\n                    curNode = curNode -> right;\\n                }\\n            }\\n            else {\\n                nodes.push_back(curNode -> val);\\n                curNode = curNode -> right;\\n            }\\n        }\\n        return nodes;\\n    }"
		},
		{
			"lc_ans_id":"31381",
			"view":"8382",
			"top":"3",
			"title":"Python recursive and iterative solutions.",
			"vote":"37",
			"content":"        \\n    # recursively\\n    def inorderTraversal1(self, root):\\n        res = []\\n        self.helper(root, res)\\n        return res\\n        \\n    def helper(self, root, res):\\n        if root:\\n            self.helper(root.left, res)\\n            res.append(root.val)\\n            self.helper(root.right, res)\\n     \\n    # iteratively       \\n    def inorderTraversal(self, root):\\n        res, stack = [], []\\n        while True:\\n            while root:\\n                stack.append(root)\\n                root = root.left\\n            if not stack:\\n                return res\\n            node = stack.pop()\\n            res.append(node.val)\\n            root = node.right"
		},
		{
			"lc_ans_id":"31404",
			"view":"6511",
			"top":"4",
			"title":"Concise JAVA solution based on Stack",
			"vote":"32",
			"content":"**Explanation**\\n\\nThe basic idea is referred from [here][1]: using stack to simulate the recursion procedure: for each node, travel to its left child until it's left leaf, then pop to left leaf's higher level node A, and switch to A's right branch. Keep the above steps until cur is null and stack is empty. As the following:\\n\\n**Runtime = O(n)**: As each node is visited once\\n\\n**Space = O(n)**\\n\\n\\n    public List<Integer> inorderTraversal(TreeNode root) {\\n    \\tList<Integer> res = new LinkedList<Integer>();\\n    \\tif (root == null) return res;\\n    \\t\\n    \\tStack<TreeNode> stack = new Stack<TreeNode>();\\n    \\tTreeNode cur = root;\\n    \\twhile (cur != null || !stack.isEmpty()) { \\n    \\t\\twhile (cur != null) {// Travel to each node's left child, till reach the left leaf\\n    \\t\\t\\tstack.push(cur);\\n    \\t\\t\\tcur = cur.left;\\t\\t\\t\\t\\n    \\t\\t}\\t\\t \\n    \\t\\tcur = stack.pop(); // Backtrack to higher level node A\\n    \\t\\tres.add(cur.val);  // Add the node to the result list\\n    \\t\\tcur = cur.right;   // Switch to A'right branch\\n    \\t}\\n    \\treturn res;\\n    }\\n\\n\\n  [1]: https://leetcode.com/discuss/19765/iterative-solution-in-java-simple-and-readable"
		},
		{
			"lc_ans_id":"31467",
			"view":"4679",
			"top":"5",
			"title":"Morris Traversal------- NO RECURSION NO STACK",
			"vote":"23",
			"content":"\\tpublic class TreeNode {\\n\\t    int val;\\n\\t    TreeNode left;\\n\\t    TreeNode right;\\n\\t    TreeNode(int x) { val = x; }\\n\\t}\\n\\t\\n\\tpublic class Solution {\\n\\t    public List<Integer> inorderTraversal(TreeNode root) {\\n\\t        if(root == null) return new ArrayList<Integer>();\\n\\t        List<Integer> res = new ArrayList<Integer>();\\n\\t        TreeNode pre = null;\\n\\t        while(root != null){\\n\\t        \\tif(root.left == null){\\n\\t        \\t\\tres.add(root.val);\\n\\t        \\t\\troot = root.right;\\n\\t        \\t}else{\\n\\t        \\t\\tpre = root.left;\\n\\t        \\t\\twhile(pre.right != null && pre.right != root){\\n\\t        \\t\\t\\tpre = pre.right;\\n\\t        \\t\\t}\\n\\t        \\t\\tif(pre.right == null){\\n\\t        \\t\\t\\tpre.right = root;\\n\\t        \\t\\t\\troot = root.left;\\n\\t        \\t\\t}else{\\n\\t        \\t\\t\\tpre.right = null;\\n\\t        \\t\\t\\tres.add(root.val);\\n\\t        \\t\\t\\troot = root.right;\\n\\t        \\t\\t}\\n\\t        \\t}\\n\\t        }\\n\\t        return res;\\n\\t    }\\n\\t}"
		},
		{
			"lc_ans_id":"31228",
			"view":"2314",
			"top":"6",
			"title":"Simple Python iterative solution by using a visited flag - O(n) 56ms",
			"vote":"22",
			"content":"    # Definition for a binary tree node.\\n    # class TreeNode:\\n    #     def __init__(self, x):\\n    #         self.val = x\\n    #         self.left = None\\n    #         self.right = None\\n    \\n    class Solution:\\n        # @param {TreeNode} root\\n        # @return {integer[]}\\n        def inorderTraversal(self, root):\\n            result, stack = [], [(root, False)]\\n    \\n            while stack:\\n                cur, visited = stack.pop()\\n                if cur:\\n                    if visited:\\n                        result.append(cur.val)\\n                    else:\\n                        stack.append((cur.right, False))\\n                        stack.append((cur, True))\\n                        stack.append((cur.left, False))\\n    \\n            return result"
		},
		{
			"lc_ans_id":"31372",
			"view":"3438",
			"top":"7",
			"title":"Java solution, both recursion and iteration",
			"vote":"19",
			"content":"\\n    public List<Integer> inorderTraversal(TreeNode root) {\\n        List<Integer> res = new ArrayList<>();\\n        // method 1: recursion\\n\\n        helper(root, res);\\n        return res;\\n\\n        //helper function for method 1\\n        private void helper(TreeNode root, List<Integer> res) {\\n            if (root != null) {\\n                if (root.left != null) {\\n                    helper(root.left, res);\\n                }\\n                res.add(root.val);\\n                if (root.right != null) {\\n                    helper(root.right, res);\\n               }\\n           }\\n       }\\n\\n\\n----------\\n\\n    public List<Integer> inorderTraversal(TreeNode root) {\\n        List<Integer> res = new ArrayList<>();\\n        // method 2: iteration\\n        Stack<TreeNode> stack = new Stack<>();\\n        TreeNode cur = root;\\n        while (cur != null || !stack.isEmpty()) {\\n            while (cur != null) {\\n                stack.push(cur);\\n                cur = cur.left;\\n            }\\n            cur = stack.pop();\\n            res.add(cur.val);\\n            cur = cur.right;\\n        }\\n        return res;        \\n    }"
		},
		{
			"lc_ans_id":"31407",
			"view":"1393",
			"top":"8",
			"title":"My 3 solutions in c++",
			"vote":"14",
			"content":"\\n    // recursive, it's trivial...\\n    vector<int> v;\\n    vector<int> inorderTraversal(TreeNode* root) {\\n        if(!root) return v;\\n        inorderTraversal(root->left);\\n        v.push_back(root->val);\\n        inorderTraversal(root->right);\\n        return v;\\n    }\\n    \\n    \\n    // iterate, use stack\\n    vector<int> inorderTraversal(TreeNode* root) {\\n        vector<int> v;\\n        if(!root) return v;\\n        TreeNode* temp = root;\\n        stack<TreeNode*> s;\\n        while(true){\\n            while(temp){\\n                s.push(temp);\\n                temp = temp->left;\\n            }\\n            if(s.empty()) break;\\n            temp = s.top();\\n            s.pop();\\n            v.push_back(temp->val);\\n            temp = temp->right;\\n        }\\n        return v;\\n    }\\n    \\n    \\n    // iterate, morris traversal, without stack\\n    vector<int> inorderTraversal(TreeNode* root) {\\n        vector<int> v;\\n        if(!root) return v;\\n        TreeNode* temp = root, *prev;\\n        while(temp){\\n            if(!temp->left){\\n                v.push_back(temp->val);\\n                temp = temp->right;\\n            }else{\\n                prev = temp->left;\\n                while(prev->right&&(prev->right != temp))\\n                    prev = prev->right;\\n                if(!prev->right){\\n                    prev->right = temp;\\n                    temp = temp->left;\\n                }else{\\n                    v.push_back(temp->val);\\n                    prev->right = NULL;\\n                    temp = temp->right;\\n                }\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"31464",
			"view":"973",
			"top":"9",
			"title":"4ms iterative c++ solution",
			"vote":"10",
			"content":"    class Solution {\\n    public:\\n        vector<int> inorderTraversal(TreeNode *root) {\\n            stack<TreeNode*> s;\\n            pushAllLeft(s, root);\\n            vector<int> result;\\n            while(!s.empty()) {\\n                TreeNode* p = s.top();\\n                s.pop();\\n                result.push_back(p->val);\\n                pushAllLeft(s,p->right);\\n            }\\n            return result;\\n        }\\n        \\n        void pushAllLeft(stack<TreeNode*>& s, TreeNode* root) {\\n            while(root) {\\n                s.push(root);\\n                root = root->left;\\n            }\\n        }\\n    };"
		}
	],
	"id":"94",
	"title":"Binary Tree Inorder Traversal",
	"content":"<p>Given a binary tree, return the <i>inorder</i> traversal of its nodes' values.</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven binary tree <code>[1,null,2,3]</code>,<br />\r\n<pre>\r\n   1\r\n    \\\r\n     2\r\n    /\r\n   3\r\n</pre>\r\n</p>\r\n<p>\r\nreturn <code>[1,3,2]</code>.\r\n</p>\r\n\r\n<p><b>Note:</b> Recursive solution is trivial, could you do it iteratively?</p>",
	"frequency":"346",
	"ac_num":"250164"
}