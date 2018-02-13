{
	"difficulty":"2",
	"submit_num":"273363",
	"show_id":"173",
	"leetcode_id":"173",
	"answers":[
		{
			"lc_ans_id":"52525",
			"view":"47822",
			"top":"0",
			"title":"My solutions in 3 languages with Stack",
			"vote":"287",
			"content":"I use Stack to store directed left children from root.\\nWhen next() be called, I just pop one element and process its right child as new root.\\nThe code is pretty straightforward.\\n\\nSo this can satisfy O(h) memory, hasNext() in O(1) time,\\nBut next() is O(h) time.\\n\\nI can't find a solution that can satisfy both next() in O(1) time, space in O(h).\\n\\nJava:\\n\\n    public class BSTIterator {\\n        private Stack<TreeNode> stack = new Stack<TreeNode>();\\n        \\n        public BSTIterator(TreeNode root) {\\n            pushAll(root);\\n        }\\n    \\n        /** @return whether we have a next smallest number */\\n        public boolean hasNext() {\\n            return !stack.isEmpty();\\n        }\\n    \\n        /** @return the next smallest number */\\n        public int next() {\\n            TreeNode tmpNode = stack.pop();\\n            pushAll(tmpNode.right);\\n            return tmpNode.val;\\n        }\\n        \\n        private void pushAll(TreeNode node) {\\n            for (; node != null; stack.push(node), node = node.left);\\n        }\\n    }\\n\\nC++:\\n\\n\\n    class BSTIterator {\\n        stack<TreeNode *> myStack;\\n    public:\\n        BSTIterator(TreeNode *root) {\\n            pushAll(root);\\n        }\\n    \\n        /** @return whether we have a next smallest number */\\n        bool hasNext() {\\n            return !myStack.empty();\\n        }\\n    \\n        /** @return the next smallest number */\\n        int next() {\\n            TreeNode *tmpNode = myStack.top();\\n            myStack.pop();\\n            pushAll(tmpNode->right);\\n            return tmpNode->val;\\n        }\\n    \\n    private:\\n        void pushAll(TreeNode *node) {\\n            for (; node != NULL; myStack.push(node), node = node->left);\\n        }\\n    };\\n\\n\\nPython:\\n\\n    class BSTIterator:\\n        # @param root, a binary search tree's root node\\n        def __init__(self, root):\\n            self.stack = list()\\n            self.pushAll(root)\\n    \\n        # @return a boolean, whether we have a next smallest number\\n        def hasNext(self):\\n            return self.stack\\n    \\n        # @return an integer, the next smallest number\\n        def next(self):\\n            tmpNode = self.stack.pop()\\n            self.pushAll(tmpNode.right)\\n            return tmpNode.val\\n            \\n        def pushAll(self, node):\\n            while node is not None:\\n                self.stack.append(node)\\n                node = node.left"
		},
		{
			"lc_ans_id":"52526",
			"view":"24156",
			"top":"1",
			"title":"Ideal Solution using Stack (Java)",
			"vote":"128",
			"content":"My idea comes from this: My first thought was to use inorder traversal to put every node into an array, and then make an index pointer for the next() and hasNext(). That meets the O(1) run time but not the O(h) memory. O(h) is really much more less than O(n) when the tree is huge.\\n\\nThis means I cannot use a lot of memory, which suggests that I need to make use of the tree structure itself. And also, one thing to notice is the \"average O(1) run time\". It's weird to say average O(1), because there's nothing below O(1) in run time, which suggests in most cases, I solve it in O(1), while in some cases, I need to solve it in O(n) or O(h). These two limitations are big hints.\\n\\nBefore I come up with this solution, I really draw a lot binary trees and try inorder traversal on them. We all know that, once you get to a TreeNode, in order to get the smallest, you need to go all the way down its left branch. So our first step is to point to pointer to the left most TreeNode. The problem is how to do back trace. Since the TreeNode doesn't have father pointer, we cannot get a TreeNode's father node in O(1) without store it beforehand. Back to the first step, when we are traversal to the left most TreeNode, we store each TreeNode we met ( They are all father nodes for back trace). \\n\\nAfter that, I try an example, for next(), I directly return where the pointer pointing at, which should be the left most TreeNode I previously found. What to do next? After returning the smallest TreeNode, I need to point the pointer to the next smallest TreeNode. When the current TreeNode has a right branch (It cannot have left branch, remember we traversal to the left most), we need to jump to its right child first and then traversal to its right child's left most TreeNode. When the current TreeNode doesn't have a right branch, it means there cannot be a node with value smaller than itself father node, point the pointer at its father node.\\n\\nThe overall thinking leads to the structure Stack, which fits my requirement so well.\\n\\n    /**\\n     * Definition for binary tree\\n     * public class TreeNode {\\n     *     int val;\\n     *     TreeNode left;\\n     *     TreeNode right;\\n     *     TreeNode(int x) { val = x; }\\n     * }\\n     */\\n    \\n    public class BSTIterator {\\n        \\n        private Stack<TreeNode> stack;\\n        public BSTIterator(TreeNode root) {\\n            stack = new Stack<>();\\n            TreeNode cur = root;\\n            while(cur != null){\\n                stack.push(cur);\\n                if(cur.left != null)\\n                    cur = cur.left;\\n                else\\n                    break;\\n            }\\n        }\\n    \\n        /** @return whether we have a next smallest number */\\n        public boolean hasNext() {\\n            return !stack.isEmpty();\\n        }\\n    \\n        /** @return the next smallest number */\\n        public int next() {\\n            TreeNode node = stack.pop();\\n            TreeNode cur = node;\\n            // traversal right branch\\n            if(cur.right != null){\\n                cur = cur.right;\\n                while(cur != null){\\n                    stack.push(cur);\\n                    if(cur.left != null)\\n                        cur = cur.left;\\n                    else\\n                        break;\\n                }\\n            }\\n            return node.val;\\n        }\\n    }\\n    \\n    /**\\n     * Your BSTIterator will be called like this:\\n     * BSTIterator i = new BSTIterator(root);\\n     * while (i.hasNext()) v[f()] = i.next();\\n     */"
		},
		{
			"lc_ans_id":"52584",
			"view":"8508",
			"top":"2",
			"title":"My java accepted solution",
			"vote":"39",
			"content":"the idea is same as using stack to do Binary Tree Inorder Traversal    \\n\\n    public class BSTIterator {\\n        \\n            Stack<TreeNode> stack =  null ;            \\n            TreeNode current = null ;\\n        \\t\\n            public BSTIterator(TreeNode root) {\\n            \\t  current = root;\\t     \\n            \\t  stack = new Stack<> ();\\n        \\t}\\n        \\n        \\t/** @return whether we have a next smallest number */\\n        \\tpublic boolean hasNext() {\\t\\t  \\n        \\t      return !stack.isEmpty() || current != null;  \\n        \\t}\\n        \\n        \\t    /** @return the next smallest number */\\n        \\tpublic int next() {\\n        \\t\\twhile (current != null) {\\n        \\t\\t\\tstack.push(current);\\n        \\t\\t\\tcurrent = current.left ;\\n        \\t\\t}\\t\\t\\n        \\t\\tTreeNode t = stack.pop() ;\\t\\t\\n        \\t\\tcurrent = t.right ;\\t\\t\\n        \\t\\treturn t.val ;\\n        \\t}\\n        }"
		},
		{
			"lc_ans_id":"52519",
			"view":"10883",
			"top":"3",
			"title":"My Solution in C++, in average O(1) time and uses O(h) memory",
			"vote":"33",
			"content":"    class BSTIterator {\\n    private:\\n        stack<TreeNode*> st;\\n    public:\\n        BSTIterator(TreeNode *root) {\\n            find_left(root);\\n        }\\n    \\n        /** @return whether we have a next smallest number */\\n        bool hasNext() {\\n            if (st.empty())\\n                return false;\\n            return true;\\n        }\\n    \\n        /** @return the next smallest number */\\n        int next() {\\n            TreeNode* top = st.top();\\n            st.pop();\\n            if (top->right != NULL)\\n                find_left(top->right);\\n                \\n            return top->val;\\n        }\\n        \\n        /** put all the left child() of root */\\n        void find_left(TreeNode* root)\\n        {\\n            TreeNode* p = root;\\n            while (p != NULL)\\n            {\\n                st.push(p);\\n                p = p->left;\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"52592",
			"view":"4835",
			"top":"4",
			"title":"My Solution with less than 10 lines of code",
			"vote":"25",
			"content":"\\n\\n public class BSTIterator {\\n\\n\\n    private Stack<TreeNode> stack = new Stack<TreeNode>();\\n\\n    public BSTIterator(TreeNode root) {\\n        pushAllNodes(root);\\n    }\\n\\n    /** @return whether we have a next smallest number */\\n    public boolean hasNext() {\\n        return !stack.isEmpty();\\n    }\\n\\n    /** @return the next smallest number */\\n    public int next() {\\n        TreeNode minNode = stack.pop();\\n        pushAllNodes(minNode.right);\\n        return minNode.val;\\n    }\\n\\n    private void pushAllNodes(TreeNode node) {\\n        while(node != null)\\n        {\\n            stack.push(node);\\n            node = node.left;\\n        }\\n    }\\n}\\n\\n/**\\n * Your BSTIterator will be called like this:\\n * BSTIterator i = new BSTIterator(root);\\n * while (i.hasNext()) v[f()] = i.next();\\n */"
		},
		{
			"lc_ans_id":"52642",
			"view":"2972",
			"top":"5",
			"title":"Two Python solutions, stack and generator",
			"vote":"23",
			"content":"stack solution: \\n\\n\\n    def __init__(self, root):\\n        self.stack = []\\n        while root:\\n            self.stack.append(root)\\n            root = root.left\\n\\n    # @return a boolean, whether we have a next smallest number\\n    def hasNext(self):\\n        return len(self.stack) > 0\\n\\n    # @return an integer, the next smallest number\\n    def next(self):\\n        node = self.stack.pop()\\n        x = node.right\\n        while x:\\n            self.stack.append(x)\\n            x = x.left\\n        return node.val\\n\\ngenerator solution:\\n    \\n    def __init__(self, root):\\n        self.last = root\\n        while self.last and self.last.right:\\n            self.last = self.last.right\\n        self.current = None\\n        self.g = self.iterate(root)\\n\\n    # @return a boolean, whether we have a next smallest number\\n    def hasNext(self):\\n        return self.current is not self.last\\n\\n    # @return an integer, the next smallest number\\n    def next(self):\\n        return next(self.g)\\n        \\n    def iterate(self, node):\\n        if node is None:\\n            return\\n        for x in self.iterate(node.left):\\n            yield x\\n        self.current = node\\n        yield node.val\\n        for x in self.iterate(node.right):\\n            yield x"
		},
		{
			"lc_ans_id":"52621",
			"view":"2756",
			"top":"6",
			"title":"Very concise solution by using stack in java",
			"vote":"19",
			"content":"    public class BSTIterator {\\n        Stack<TreeNode> stack;\\n        public BSTIterator(TreeNode root) {\\n            stack = new Stack<TreeNode>();\\n            setNext(root);\\n        }\\n    \\n        /** @return whether we have a next smallest number */\\n        public boolean hasNext() {\\n            return !stack.isEmpty();\\n        }\\n    \\n        /** @return the next smallest number */\\n        public int next() {\\n            if(stack.isEmpty()) return -1;\\n            TreeNode node = stack.pop();\\n            int val = node.val;\\n            setNext(node.right);\\n            return val;\\n        }\\n        \\n        private void setNext(TreeNode root){\\n           while(root != null){\\n               stack.push(root);\\n               root = root.left;\\n           }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"52705",
			"view":"2826",
			"top":"7",
			"title":"Morris traverse solution",
			"vote":"19",
			"content":"Traverse a BST from the smallest to the largest, then i solve this question simply use the inorder traversal.\\nTo implement a iterator means we should traverse the tree step by step, so just split the inorder traversal.\\n\\n    class BSTIterator {\\n    public:\\n    BSTIterator(TreeNode *root) {\\n        p = root;\\n    }\\n\\n    /** @return whether we have a next smallest number */\\n    bool hasNext() {\\n        return p != NULL;\\n    }\\n\\n    /** @return the next smallest number */\\n    int next() {\\n        TreeNode *tmp;\\n        int ret;\\n        while(p) {\\n            if (p->left == NULL) {  \\n                ret = p->val;\\n                p = p->right;\\n                break;\\n            }  \\n            else {  \\n                tmp = p->left;  \\n                while (tmp->right != NULL && tmp->right != p)  \\n                    tmp = tmp->right;  \\n                if (tmp->right == NULL) {  \\n                    tmp->right = p;  \\n                    p = p->left;  \\n                }  \\n                else {\\n                    ret = p->val;\\n                    tmp->right = NULL;  \\n                    p = p->right;\\n                    break;\\n                }  \\n            }  \\n        }\\n        \\n        return ret;\\n    }\\n    \\n    TreeNode *p;\\n    };"
		},
		{
			"lc_ans_id":"52554",
			"view":"2591",
			"top":"8",
			"title":"What does it mean by the next smallest?",
			"vote":"13",
			"content":"Can some one give one example?"
		},
		{
			"lc_ans_id":"52703",
			"view":"1607",
			"top":"9",
			"title":"C++. using stack.",
			"vote":"12",
			"content":"    /**\\n     * Definition for binary tree\\n     * struct TreeNode {\\n     *     int val;\\n     *     TreeNode *left;\\n     *     TreeNode *right;\\n     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\\n     * };\\n     */\\n    class BSTIterator {\\n    private:\\n        TreeNode *current = NULL; \\n        stack<TreeNode*> s;\\n    public:\\n        BSTIterator(TreeNode *root) {\\n             // initialize the current pointer\\n            current = root;\\n        }\\n    \\n        /** @return whether we have a next smallest number */\\n        bool hasNext() {\\n            while(current){\\n                s.push(current);\\n                current = current->left;\\n            }\\n            if(s.empty()){\\n                return false;\\n            }\\n            return true;\\n        }\\n    \\n        /** @return the next smallest number */\\n        int next() {\\n            TreeNode* node = s.top();\\n            s.pop();\\n            current = node->right;\\n            return node->val;\\n        }\\n    };\\n    \\n    /**\\n     * Your BSTIterator will be called like this:\\n     * BSTIterator i = BSTIterator(root);\\n     * while (i.hasNext()) cout << i.next();\\n     */\\n\\nThe basic idea behind this solution is that we have to implement inorder iteratively but it will gets split into two functions i.e. hasNext and next.\\nhasNext() will push all the left elements and check and return accordingly if elements are in the stack.\\nnext() will just pop() the top element from the stack and update the current pointer to right .\\nFor this we are taking a stack and a current pointer.\\nBut maybe I may be wrong in hasNext as the requirement of question is O(1) for hasNext() as well.\\n\\nOpen for comments."
		}
	],
	"id":"173",
	"title":"Binary Search Tree Iterator",
	"content":"<p>Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.</p>\r\n\r\n<p>Calling <code>next()</code> will return the next smallest number in the BST.</p>\r\n\r\n<p><b>Note: </b><code>next()</code> and <code>hasNext()</code> should run in average O(1) time and uses O(<i>h</i>) memory, where <i>h</i> is the height of the tree. </p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/ts\">@ts</a> for adding this problem and creating all test cases.</p>",
	"frequency":"514",
	"ac_num":"117576"
}