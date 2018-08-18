{
	"difficulty":"2",
	"submit_num":"283568",
	"show_id":"230",
	"leetcode_id":"230",
	"answers":[
		{
			"lc_ans_id":"63660",
			"view":"64127",
			"top":"0",
			"title":"3 ways implemented in JAVA (Python): Binary Search, in-order iterative & recursive",
			"vote":"273",
			"content":"Binary Search (dfs): most preferable\\n\\n      public int kthSmallest(TreeNode root, int k) {\\n            int count = countNodes(root.left);\\n            if (k <= count) {\\n                return kthSmallest(root.left, k);\\n            } else if (k > count + 1) {\\n                return kthSmallest(root.right, k-1-count); // 1 is counted as current node\\n            }\\n            \\n            return root.val;\\n        }\\n        \\n        public int countNodes(TreeNode n) {\\n            if (n == null) return 0;\\n            \\n            return 1 + countNodes(n.left) + countNodes(n.right);\\n        }\\n\\n\\nDFS in-order recursive:\\n\\n        // better keep these two variables in a wrapper class\\n        private static int number = 0;\\n        private static int count = 0;\\n\\n        public int kthSmallest(TreeNode root, int k) {\\n            count = k;\\n            helper(root);\\n            return number;\\n        }\\n        \\n        public void helper(TreeNode n) {\\n            if (n.left != null) helper(n.left);\\n            count--;\\n            if (count == 0) {\\n                number = n.val;\\n                return;\\n            }\\n            if (n.right != null) helper(n.right);\\n        }\\n\\nDFS in-order iterative:\\n\\n      public int kthSmallest(TreeNode root, int k) {\\n            Stack<TreeNode> st = new Stack<>();\\n            \\n            while (root != null) {\\n                st.push(root);\\n                root = root.left;\\n            }\\n                \\n            while (k != 0) {\\n                TreeNode n = st.pop();\\n                k--;\\n                if (k == 0) return n.val;\\n                TreeNode right = n.right;\\n                while (right != null) {\\n                    st.push(right);\\n                    right = right.left;\\n                }\\n            }\\n            \\n            return -1; // never hit if k is valid\\n      }\\n\\n\\n*2 yrs later...*\\nAppreciated everyone reviewing my answers and leaving insightful comments here through the last two years, I've never got chance to reply to all of them, and unfortunately, I no longer write in JAVA and this might be the excuse I won't go back editing my stupid codes any more lol. Below is my Python answer that I just picked up lately, it's more fun and hopefully, easier to understand by its simple structure.\\n\\n**note: requirement has been changed a bit since last time I visited that the counting could be looked up frequently and BST itself could be altered (inserted/deleted) by multiple times, so that's the main reason that I stored them in an array.** \\n```\\nclass Solution(object):\\n    def kthSmallest(self, root, k):\\n        \"\"\"\\n        :type root: TreeNode\\n        :type k: int\\n        :rtype: int\\n        \"\"\"\\n        count = []\\n        self.helper(root, count)\\n        return count[k-1]\\n        \\n    def helper(self, node, count):\\n        if not node:\\n            return\\n        \\n        self.helper(node.left, count)\\n        count.append(node.val)\\n        self.helper(node.right, count)\\n```\\n\\nThanks again!"
		},
		{
			"lc_ans_id":"63659",
			"view":"17397",
			"top":"1",
			"title":"What if you could modify the BST node's structure?",
			"vote":"78",
			"content":"If we could add a count field in the BST node class, it will take O(n) time when we calculate the count value for the whole tree, but after that, it will take O(logn) time when insert/delete a node or calculate the kth smallest element.\\n\\n       public class Solution {\\n            public int kthSmallest(TreeNode root, int k) {\\n                TreeNodeWithCount rootWithCount = buildTreeWithCount(root);\\n                return kthSmallest(rootWithCount, k);\\n            }\\n            \\n            private TreeNodeWithCount buildTreeWithCount(TreeNode root) {\\n                if (root == null) return null;\\n                TreeNodeWithCount rootWithCount = new TreeNodeWithCount(root.val);\\n                rootWithCount.left = buildTreeWithCount(root.left);\\n                rootWithCount.right = buildTreeWithCount(root.right);\\n                if (rootWithCount.left != null) rootWithCount.count += rootWithCount.left.count;\\n                if (rootWithCount.right != null) rootWithCount.count += rootWithCount.right.count;\\n                return rootWithCount;\\n            }\\n            \\n            private int kthSmallest(TreeNodeWithCount rootWithCount, int k) {\\n                if (k <= 0 || k > rootWithCount.count) return -1;\\n                if (rootWithCount.left != null) {\\n                    if (rootWithCount.left.count >= k) return kthSmallest(rootWithCount.left, k);\\n                    if (rootWithCount.left.count == k-1) return rootWithCount.val;\\n                    return kthSmallest(rootWithCount.right, k-1-rootWithCount.left.count);\\n                } else {\\n                    if (k == 1) return rootWithCount.val;\\n                    return kthSmallest(rootWithCount.right, k-1);\\n                }\\n            }\\n            \\n            class TreeNodeWithCount {\\n                int val;\\n                int count;\\n                TreeNodeWithCount left;\\n                TreeNodeWithCount right;\\n                TreeNodeWithCount(int x) {val = x; count = 1;};\\n            }\\n        }"
		},
		{
			"lc_ans_id":"63673",
			"view":"25556",
			"top":"2",
			"title":"4 Lines in C++.",
			"vote":"53",
			"content":"Go inorder and decrease `k` at each node. Stop the whole search as soon as `k` is zero, and then the k-th element is immediately returned all the way to the recursion top and to the original caller.\\n\\nTry the left subtree first. If that made `k` zero, then its answer is the overall answer and we return it right away. Otherwise, decrease `k` for the current node, and if that made `k` zero, then we return the current node's value right away. Otherwise try the right subtree and return whatever comes back from there.\\n\\n    int kthSmallest(TreeNode* root, int& k) {\\n        if (root) {\\n            int x = kthSmallest(root->left, k);\\n            return !k ? x : !--k ? root->val : kthSmallest(root->right, k);\\n        }\\n    }\\n\\n---\\n\\nYou might notice that I changed `k` from `int` to `int&` because I didn't feel like adding a helper just for that and the OJ doesn't mind. Oh well, here is that now:\\n\\n    int kthSmallest(TreeNode* root, int k) {\\n        return find(root, k);\\n    }\\n    int find(TreeNode* root, int& k) {\\n        if (root) {\\n            int x = find(root->left, k);\\n            return !k ? x : !--k ? root->val : find(root->right, k);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"63783",
			"view":"11722",
			"top":"3",
			"title":"Two Easiest In Order Traverse (Java)",
			"vote":"42",
			"content":"In order traverse for BST gives the natural order of numbers. No need to use array.\\n\\nRecursive:\\n\\n    int count = 0;\\n    int result = Integer.MIN_VALUE;\\n    \\n    public int kthSmallest(TreeNode root, int k) {\\n        traverse(root, k);\\n        return result;\\n    }\\n    \\n    public void traverse(TreeNode root, int k) {\\n        if(root == null) return;\\n        traverse(root.left, k);\\n        count ++;\\n        if(count == k) result = root.val;\\n        traverse(root.right, k);       \\n    }\\n\\nIterative:\\n\\n     public int kthSmallest(TreeNode root, int k) {\\n         Stack<TreeNode> stack = new Stack<TreeNode>();\\n         TreeNode p = root;\\n         int count = 0;\\n         \\n         while(!stack.isEmpty() || p != null) {\\n             if(p != null) {\\n                 stack.push(p);  // Just like recursion\\n                 p = p.left;   \\n                 \\n             } else {\\n                TreeNode node = stack.pop();\\n                if(++count == k) return node.val; \\n                p = node.right;\\n             }\\n         }\\n         \\n         return Integer.MIN_VALUE;\\n     }"
		},
		{
			"lc_ans_id":"63696",
			"view":"6735",
			"top":"4",
			"title":"Share my C++ iterative ALG.",
			"vote":"35",
			"content":"    class Solution {\\n    public:\\n        int kthSmallest(TreeNode* root, int k) {\\n            stack<TreeNode *> st;\\n            TreeNode *p = root;\\n            while(p || !st.empty())\\n            {\\n                while(p)\\n                {\\n                    st.push(p);\\n                    p = p->left;\\n                }\\n                p = st.top();\\n                if(--k == 0)\\n                    return p->val;\\n                st.pop();\\n                p = p->right;\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"63703",
			"view":"2938",
			"top":"5",
			"title":"Pythonic approach with generator",
			"vote":"28",
			"content":"With generator in python, one very straightforward solution might be:\\n\\n    class Solution:\\n        # @param {TreeNode} root\\n        # @param {integer} k\\n        # @return {integer}\\n        def kthSmallest(self, root, k):\\n            for val in self.inorder(root):\\n                if k == 1:\\n                    return val\\n                else:\\n                    k -= 1\\n            \\n        def inorder(self, root):\\n            if root is not None:\\n                for val in self.inorder(root.left):\\n                    yield val\\n                yield root.val\\n                for val in self.inorder(root.right):\\n                    yield val"
		},
		{
			"lc_ans_id":"63829",
			"view":"1957",
			"top":"6",
			"title":"Python Easy Iterative and Recursive Solution",
			"vote":"19",
			"content":"Recursive:\\n\\n    def kthSmallest(self, root, k):\\n        self.k = k\\n        self.res = None\\n        self.helper(root)\\n        return self.res\\n    \\n    def helper(self, node):\\n        if not node:\\n            return\\n        self.helper(node.left)\\n        self.k -= 1\\n        if self.k == 0:\\n            self.res = node.val\\n            return\\n        self.helper(node.right)\\n\\n\\nIterative:\\n\\n    def kthSmallest(root, k):\\n        stack = []\\n        while root or stack:\\n            while root:\\n                stack.append(root)\\n                root = root.left\\n            root = stack.pop()\\n            k -= 1\\n            if k == 0:\\n                return root.val\\n            root = root.right"
		},
		{
			"lc_ans_id":"63896",
			"view":"3148",
			"top":"7",
			"title":"Simple and Clean Java solution with explanation",
			"vote":"19",
			"content":"    public static int ans = 0;\\n    public int kthSmallest(TreeNode root, int k) {\\n        helper(root, k);\\n        return ans;\\n    }\\n    \\n    public int helper(TreeNode root, int k) {\\n        if (root == null) {\\n            return 0;\\n        }\\n        int leftCount = helper(root.left, k);\\n        int rightCount = helper(root.right, k - leftCount - 1);\\n        if (k == leftCount + 1) {\\n            ans = root.val;\\n        }\\n        return leftCount + rightCount + 1;\\n    }\\n\\nWe count the number of nodes of left sub tree and right sub tree recursively. Suppose the Kth smallest element is in the right sub tree, then we need to update k as k - leftCount - 1 (leftCount + 1 is the number of nodes of left sub tree plus the root node). Only when k equals leftCount + 1, we find the target."
		},
		{
			"lc_ans_id":"63743",
			"view":"3805",
			"top":"8",
			"title":"Java divide-and-conquer solution considering augmenting tree structure for the follow-up",
			"vote":"15",
			"content":"The idea behind the follow up question is what extra information is required for divide-and-conquer.  Basically is we can know the number of nodes on the left subtree, we get to know what is the position of the root node in the in-order traversal, which is basically the the kth number.  the left value can be saved in each node of the tree, and when we are finding the kth number, the complexity is O(lgn).\\n\\n       public class Solution {\\n            public int kthSmallest(TreeNode root, int k) {\\n                int left = nodeCount(root.left);  // this value can be saved in the root node\\n                if(left + 1 == k) {\\n                    return root.val;\\n                } else if (left + 1 < k) {\\n                    return kthSmallest(root.right, k - left - 1);\\n                } else {\\n                    return kthSmallest(root.left, k);\\n                }\\n            }\\n            \\n            private int nodeCount(TreeNode root) {\\n                if(root == null) {\\n                    return 0;\\n                }\\n                return 1 + nodeCount(root.left) + nodeCount(root.right);\\n            }\\n        }"
		},
		{
			"lc_ans_id":"63772",
			"view":"3956",
			"top":"9",
			"title":"O(k) Java solution",
			"vote":"12",
			"content":"The number of nodes (**n**) in the tree is irrelevant to the complexity.  My code inorder traverse the tree and it stops when it finds the Kth node.  The time complexity for this code is O(k). \\n\\n=======Update============\\n\\nThe number of nodes in the tree does change the time complexity. The program actually goes to the left bottom node first and start from there to search for the Kth smallest. Thus the time complexity should be O(log(n) + K). What do you think ?\\n\\n    public class Solution {\\n    public int kthSmallest(TreeNode root, int k) {\\n        ArrayList<Integer> buffer = new ArrayList<Integer>();\\n        inorderSearch(root, buffer, k);\\n        return buffer.get(k-1);\\n    }\\n    public void inorderSearch(TreeNode node, ArrayList<Integer> buffer, int k){\\n        if(buffer.size() >= k)\\n            return;\\n        if(node.left != null){\\n            inorderSearch(node.left, buffer, k);\\n        }\\n        buffer.add(node.val);\\n        if(node.right != null){\\n            inorderSearch(node.right, buffer, k);\\n        }\\n    }\\n}"
		}
	],
	"id":"230",
	"title":"Kth Smallest Element in a BST",
	"content":"<p>Given a binary search tree, write a function <code>kthSmallest</code> to find the <b>k</b>th smallest element in it.</p>\r\n\r\n<p><b>Note: </b><br>\r\nYou may assume k is always valid, 1 &le; k &le; BST's total elements.</p>\r\n\r\n<p><b>Follow up:</b><br>\r\nWhat if the BST is modified (insert/delete operations) often and you need to find the kth smallest frequently? How would you optimize the kthSmallest routine?</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/ts\">@ts</a> for adding this problem and creating all test cases.</p>",
	"frequency":"368",
	"ac_num":"127369"
}