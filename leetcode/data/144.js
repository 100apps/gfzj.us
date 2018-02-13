{
	"difficulty":"2",
	"submit_num":"452437",
	"show_id":"144",
	"leetcode_id":"144",
	"answers":[
		{
			"lc_ans_id":"45266",
			"view":"20721",
			"top":"0",
			"title":"Accepted iterative solution in Java using stack.",
			"vote":"85",
			"content":"Note that in this solution only right children are stored to stack.\\n\\n    public List<Integer> preorderTraversal(TreeNode node) {\\n\\t\\tList<Integer> list = new LinkedList<Integer>();\\n\\t\\tStack<TreeNode> rights = new Stack<TreeNode>();\\n\\t\\twhile(node != null) {\\n\\t\\t\\tlist.add(node.val);\\n\\t\\t\\tif (node.right != null) {\\n\\t\\t\\t\\trights.push(node.right);\\n\\t\\t\\t}\\n\\t\\t\\tnode = node.left;\\n\\t\\t\\tif (node == null && !rights.isEmpty()) {\\n\\t\\t\\t\\tnode = rights.pop();\\n\\t\\t\\t}\\n\\t\\t}\\n        return list;\\n    }"
		},
		{
			"lc_ans_id":"45493",
			"view":"8464",
			"top":"1",
			"title":"Accepted code. Explaination with Algo.",
			"vote":"45",
			"content":" 1. Create an empty stack, Push root node to the stack.\\n 2. Do following while stack is not empty.\\n\\n 2.1. pop an item from the stack and print it.\\n \\n 2.2. push the right child of popped item to stack.\\n\\n 2.3. push the left child of popped item to stack.\\n\\n \\n\\n\\n>     class Solution {\\n>     public:\\n>         vector<int> preorderTraversal(TreeNode *root) {\\n>             stack<TreeNode*> nodeStack;\\n>             vector<int> result;\\n>             //base case\\n>             if(root==NULL)\\n>             return result;\\n>             nodeStack.push(root);\\n>             while(!nodeStack.empty())\\n>             {\\n>                 TreeNode* node= nodeStack.top();\\n>                 result.push_back(node->val);\\n>                 nodeStack.pop();\\n>                 if(node->right)\\n>                 nodeStack.push(node->right);\\n>                 if(node->left)\\n>                 nodeStack.push(node->left);\\n>             }\\n>             return result;\\n>             \\n>         }\\n>     };"
		},
		{
			"lc_ans_id":"45468",
			"view":"7108",
			"top":"2",
			"title":"3 Different Solutions",
			"vote":"41",
			"content":"Recursive method with List as returning value:\\n\\n    \\tpublic List<Integer> preorderTraversal(TreeNode root) {\\n    \\t\\tList<Integer> pre = new LinkedList<Integer>();\\n    \\t\\tif(root==null) return pre;\\n    \\t\\tpre.add(root.val);\\n    \\t\\tpre.addAll(preorderTraversal(root.left));\\n    \\t\\tpre.addAll(preorderTraversal(root.right));\\n    \\t\\treturn pre;\\n    \\t}\\n\\nRecursive method with Helper method to have a List as paramater, so we can modify the parameter and don't have to instantiate a new List at each recursive call:\\n\\n    \\tpublic List<Integer> preorderTraversal(TreeNode root) {\\n    \\t\\tList<Integer> pre = new LinkedList<Integer>();\\n    \\t\\tpreHelper(root,pre);\\n    \\t\\treturn pre;\\n    \\t}\\n    \\tpublic void preHelper(TreeNode root, List<Integer> pre) {\\n    \\t\\tif(root==null) return;\\n    \\t\\tpre.add(root.val);\\n    \\t\\tpreHelper(root.left,pre);\\n    \\t\\tpreHelper(root.right,pre);\\n    \\t}\\n\\nIterative method with Stack:\\n\\n    \\tpublic List<Integer> preorderIt(TreeNode root) {\\n    \\t\\tList<Integer> pre = new LinkedList<Integer>();\\n    \\t\\tif(root==null) return pre;\\n    \\t\\tStack<TreeNode> tovisit = new Stack<TreeNode>();\\n    \\t\\ttovisit.push(root);\\n    \\t\\twhile(!tovisit.empty()) {\\n    \\t\\t\\tTreeNode visiting = tovisit.pop();\\n    \\t\\t\\tpre.add(visiting.val);\\n    \\t\\t\\tif(visiting.right!=null) tovisit.push(visiting.right);\\n    \\t\\t\\tif(visiting.left!=null) tovisit.push(visiting.left);\\n    \\t\\t}\\n    \\t\\treturn pre;\\n    \\t}"
		},
		{
			"lc_ans_id":"45273",
			"view":"3710",
			"top":"3",
			"title":"Very simple iterative Python solution",
			"vote":"35",
			"content":"Classical usage of stack's LIFO feature, very easy to grasp:\\n\\n    \\n    def preorderTraversal(self, root):\\n        ret = []\\n        stack = [root]\\n        while stack:\\n            node = stack.pop()\\n            if node:\\n                ret.append(node.val)\\n                stack.append(node.right)\\n                stack.append(node.left)\\n        return ret"
		},
		{
			"lc_ans_id":"45259",
			"view":"5382",
			"top":"4",
			"title":"Easy C++ solution using Stack",
			"vote":"32",
			"content":"    class Solution {\\n    public:\\n    vector<int> preorderTraversal(TreeNode *root) {\\n        if (root==NULL) {\\n            return vector<int>();\\n        }\\n        vector<int> result;\\n        stack<TreeNode *> treeStack;\\n        treeStack.push(root);\\n        while (!treeStack.empty()) {\\n            TreeNode *temp = treeStack.top();\\n            result.push_back(temp->val);\\n            treeStack.pop();\\n            if (temp->right!=NULL) {\\n                treeStack.push(temp->right);\\n            }\\n            if (temp->left!=NULL) {\\n                treeStack.push(temp->left);\\n            }\\n        }\\n        return result;\\n    }\\n    };"
		},
		{
			"lc_ans_id":"45435",
			"view":"1810",
			"top":"5",
			"title":"4 solutions in c++",
			"vote":"26",
			"content":"\\n    // recursive, but it's trivial...\\n    vector<int> preorderTraversal(TreeNode* root) {\\n        vector<int> v;\\n        preTraversal(root, v);\\n        return v;\\n    }\\n    void preTraversal(TreeNode* root, vector<int>& v){\\n        if(!root) return;\\n        v.push_back(root->val);\\n        preTraversal(root->left, v);\\n        preTraversal(root->right, v);\\n    }\\n    \\n    \\n    // iterate, use stack to imitate recursive\\n    vector<int> preorderTraversal(TreeNode* root) {\\n        vector<int> v;\\n        if(!root) return v;\\n        TreeNode* temp = root;\\n        stack<TreeNode*> s;\\n        s.push(root);\\n        while(!s.empty()){\\n            temp = s.top();\\n            s.pop();\\n            v.push_back(temp->val);\\n            if(temp->right) s.push(temp->right);\\n            if(temp->left) s.push(temp->left);\\n        }\\n    }\\n    \\n    \\n    vector<int> preorderTraversal(TreeNode* root) {\\n        vector<int> v;\\n        if(!root) return v;\\n        TreeNode* temp = root;\\n        stack<TreeNode*> s;\\n        while(true){\\n            while(temp){\\n                v.push_back(temp->val);\\n                if(temp->right) s.push(temp->right);\\n                temp = temp->left;\\n            }\\n            if(s.empty()) break;\\n            temp = s.top();\\n            s.pop();\\n        };\\n    }\\n    \\n    // morris traversal\\uff0c O(1) space\\n    vector<int> preorderTraversal(TreeNode* root) {\\n        vector<int> v;\\n        if(!root) return v;\\n        TreeNode* temp = root, *prev;\\n        while(temp){\\n            if(!temp->left){\\n                v.push_back(temp->val);\\n                temp = temp->right;\\n            }else{\\n                prev = temp->left;\\n                while(prev->right&&(prev->right != temp))\\n                    prev = prev->right;\\n                if(!prev->right){\\n                    v.push_back(temp->val);\\n                    prev->right = temp;\\n                    temp = temp->left;\\n                }else{\\n                    prev->right = NULL;\\n                    temp = temp->right;\\n                }\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"45338",
			"view":"1698",
			"top":"6",
			"title":"Preorder\\u3001inorder\\u3001postorder iterative solution by c++",
			"vote":"17",
			"content":"preorder:\\n\\n    vector<int> preorderTraversal(TreeNode* root) {\\n    \\tvector<int> res;\\n    \\tstd::stack<TreeNode*> temp;\\n    \\twhile (root || !temp.empty()) {\\n    \\t\\twhile (root) {\\n    \\t\\t\\ttemp.push(root);\\n    \\t\\t\\tres.push_back(root->val);\\n    \\t\\t\\troot = root->left;\\n    \\t\\t}\\n    \\t\\troot = temp.top();\\n    \\t\\ttemp.pop();\\n    \\t\\troot = root->right;\\n    \\t}\\n    \\treturn res;\\n    }\\ninorder:\\n\\n    vector<int> inorderTraversal(TreeNode* root) {\\n    \\tvector<int> res;\\n    \\tstd::stack<TreeNode*> temp;\\n    \\twhile (root || !temp.empty()) {\\n    \\t\\twhile (root) {\\n    \\t\\t\\ttemp.push(root);\\n    \\t\\t\\troot = root->left;\\n    \\t\\t}\\n    \\t\\troot = temp.top();\\n    \\t\\ttemp.pop();\\n    \\t\\tres.push_back(root->val);\\n    \\t\\troot = root->right;\\n    \\t}\\n    \\treturn res;\\n    }\\n\\npostorder:\\n\\n    vector<int> postorderTraversal(TreeNode* root) {\\n    \\tvector<int> res;\\n    \\tstd::stack<TreeNode*> temp;\\n    \\twhile (root || !temp.empty()) {\\n    \\t\\twhile (root) {\\n    \\t\\t\\ttemp.push(root);\\n    \\t\\t\\tres.insert(res.begin(),root->val);\\n    \\t\\t\\troot = root->right;\\n    \\t\\t}\\n    \\t\\troot = temp.top();\\n    \\t\\ttemp.pop();\\n    \\t\\troot = root->left;\\n    \\t}\\n    \\treturn res;\\n    }"
		},
		{
			"lc_ans_id":"45417",
			"view":"2144",
			"top":"7",
			"title":"Preorder Traversal Java solution both iteration and recursion",
			"vote":"16",
			"content":"    // recursive\\n    public class Solution {\\n        public List<Integer> preorderTraversal(TreeNode root) {\\n            List<Integer> result = new ArrayList<Integer>();\\n            if (root != null){\\n                result.add(root.val);\\n                result.addAll(preorderTraversal(root.left));\\n                result.addAll(preorderTraversal(root.right));\\n            }\\n            return result;\\n        }\\n    }\\n    \\n    // iterative\\n    public class Solution {\\n        public List<Integer> preorderTraversal(TreeNode root) {\\n            List<Integer> result = new ArrayList<Integer>();\\n            if (root == null) return result;\\n            Stack<TreeNode> stack = new Stack<TreeNode>();\\n            stack.push(root);\\n            while (!stack.isEmpty()){\\n                TreeNode node = stack.pop();\\n                result.add(node.val);\\n                if (node.right != null) stack.push(node.right);\\n                if (node.left != null) stack.push(node.left);\\n            }\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"45466",
			"view":"1020",
			"top":"8",
			"title":"Clear C++ solutions --- iterative, recursive and Morris traversal (3 different solutions!)",
			"vote":"11",
			"content":"Hi, this is a fundamental and yet classic problem. I share my three solutions here:\\n\\n 1. Iterative solution using stack --- `O(n)` time and `O(n)` space;\\n 2. Recursive solution --- `O(n)` time and `O(n)` space (considering the spaces of function call stack);\\n 3. **Morris traversal --- `O(n)` time and `O(1)` space!!!**\\n\\nIterative solution using stack:    \\n\\n    vector<int> preorderTraversal(TreeNode* root) {\\n             vector<int> nodes;\\n             stack<TreeNode*> toVisit;\\n             TreeNode* curNode = root;\\n             while (curNode || !toVisit.empty()) {\\n                 if (curNode) {\\n                     nodes.push_back(curNode -> val);\\n                     if (curNode -> right) toVisit.push(curNode -> right);\\n                     curNode = curNode -> left;\\n                 }\\n                 else {\\n                     curNode = toVisit.top();\\n                     toVisit.pop();\\n                 }\\n             }\\n             return nodes;\\n        }\\n\\n \\nRecursive solution:\\n\\n    void preorder(TreeNode* root, vector<int>& nodes) {\\n        if (!root) return;\\n        nodes.push_back(root -> val);\\n        preorder(root -> left, nodes);\\n        preorder(root -> right, nodes);\\n    } \\n    vector<int> preorderTraversal(TreeNode* root) {\\n        vector<int> nodes;\\n        preorder(root, nodes);\\n        return nodes;\\n    } \\n\\nMorris traversal:\\n\\n    vector<int> preorderTraversal(TreeNode* root) {\\n        TreeNode* curNode = root;\\n        vector<int> nodes;\\n        while (curNode) {\\n            if (curNode -> left) {\\n                TreeNode* predecessor = curNode -> left;\\n                while (predecessor -> right && predecessor -> right != curNode)\\n                    predecessor = predecessor -> right;\\n                if (!(predecessor -> right)) {\\n                    nodes.push_back(curNode -> val);\\n                    predecessor -> right = curNode;\\n                    curNode = curNode -> left;\\n                }\\n                else {\\n                    predecessor -> right = NULL;\\n                    curNode = curNode -> right;\\n                }\\n            }\\n            else {\\n                nodes.push_back(curNode -> val);\\n                curNode = curNode -> right;\\n            }\\n        }\\n        return nodes;\\n    }"
		},
		{
			"lc_ans_id":"45290",
			"view":"981",
			"top":"9",
			"title":"Python solutions (recursively and iteratively).",
			"vote":"10",
			"content":"        \\n    # recursively\\n    def preorderTraversal1(self, root):\\n        res = []\\n        self.dfs(root, res)\\n        return res\\n        \\n    def dfs(self, root, res):\\n        if root:\\n            res.append(root.val)\\n            self.dfs(root.left, res)\\n            self.dfs(root.right, res)\\n    \\n    # iteratively\\n    def preorderTraversal(self, root):\\n        stack, res = [root], []\\n        while stack:\\n            node = stack.pop()\\n            if node:\\n                res.append(node.val)\\n                stack.append(node.right)\\n                stack.append(node.left)\\n        return res"
		}
	],
	"id":"144",
	"title":"Binary Tree Preorder Traversal",
	"content":"<p>Given a binary tree, return the <i>preorder</i> traversal of its nodes' values.</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven binary tree <code>[1,null,2,3]</code>,<br />\r\n<pre>\r\n   1\r\n    \\\r\n     2\r\n    /\r\n   3\r\n</pre>\r\n</p>\r\n<p>\r\nreturn <code>[1,2,3]</code>.\r\n</p>\r\n\r\n<p><b>Note:</b> Recursive solution is trivial, could you do it iteratively?</p>",
	"frequency":"333",
	"ac_num":"209336"
}