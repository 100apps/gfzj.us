{
	"difficulty":"1",
	"submit_num":"57521",
	"show_id":"653",
	"leetcode_id":"653",
	"answers":[
		{
			"lc_ans_id":"106059",
			"view":"12855",
			"top":"0",
			"title":"[Java/C++] Three simple methods - choose one you like",
			"vote":"39",
			"content":"**Method 1.** \\nThis method also works for those who are not BSTs. The idea is to use a hashtable  to save the values of the nodes in the BST. Each time when we insert the value of a new node into the hashtable, we check if the hashtable contains ```k - node.val ```.\\n\\nTime Complexity: ```O(n)```, Space Complexity: ```O(n)```.\\n\\nJava version:\\n```\\n    public boolean findTarget(TreeNode root, int k) {\\n        HashSet<Integer> set = new HashSet<>();\\n        return dfs(root, set, k);\\n    }\\n    \\n    public boolean dfs(TreeNode root, HashSet<Integer> set, int k){\\n        if(root == null)return false;\\n        if(set.contains(k - root.val))return true;\\n        set.add(root.val);\\n        return dfs(root.left, set, k) || dfs(root.right, set, k);\\n    }\\n```\\nC++ version:\\n```\\n    bool findTarget(TreeNode* root, int k) {\\n        unordered_set<int> set;\\n        return dfs(root, set, k);\\n    }\\n    \\n    bool dfs(TreeNode* root, unordered_set<int>& set, int k){\\n        if(root == NULL)return false;\\n        if(set.count(k - root->val))return true;\\n        set.insert(root->val);\\n        return dfs(root->left, set, k) || dfs(root->right, set, k);\\n    }\\n```\\n\\n**Method 2.** \\nThe idea is to use a sorted array to save the values of the nodes in the BST by using an inorder traversal. Then, we use two pointers which begins from  the start and end of the array to find if there is a sum ```k```.\\n\\nTime Complexity: ```O(n)```, Space Complexity: ```O(n)```.\\n\\nJava version:\\n```\\n    public boolean findTarget(TreeNode root, int k) {\\n        List<Integer> nums = new ArrayList<>();\\n        inorder(root, nums);\\n        for(int i = 0, j = nums.size()-1; i<j;){\\n            if(nums.get(i) + nums.get(j) == k)return true;\\n            if(nums.get(i) + nums.get(j) < k)i++;\\n            else j--;\\n        }\\n        return false;\\n    }\\n    \\n    public void inorder(TreeNode root, List<Integer> nums){\\n        if(root == null)return;\\n        inorder(root.left, nums);\\n        nums.add(root.val);\\n        inorder(root.right, nums);\\n    }\\n```\\n\\nC++ version:\\n```\\n    bool findTarget(TreeNode* root, int k) {\\n        vector<int> nums;\\n        inorder(root, nums);\\n        for(int i = 0, j = nums.size()-1; i<j;){\\n            if(nums[i] + nums[j] == k)return true;\\n            (nums[i] + nums[j] < k)? i++ : j--;\\n        }\\n        return false;\\n    }\\n    \\n    void inorder(TreeNode* root, vector<int>& nums){\\n        if(root == NULL)return;\\n        inorder(root->left, nums);\\n        nums.push_back(root->val);\\n        inorder(root->right, nums);\\n    }\\n```\\n\\n**Method 3.**\\nThe idea is to use binary search method. For each node, we check if  ```k - node.val ``` exists in this BST.\\n\\nTime Complexity: ```O(nlogn)```, Space Complexity: ```O(h)```. ```h``` is the height of the tree, which is ```logn``` at best case, and ```n``` at worst case. \\n\\nJava version:\\n```\\n    public boolean findTarget(TreeNode root, int k) {\\n        return dfs(root, root,  k);\\n    }\\n    \\n    public boolean dfs(TreeNode root,  TreeNode cur, int k){\\n        if(cur == null)return false;\\n        return search(root, cur, k - cur.val) || dfs(root, cur.left, k) || dfs(root, cur.right, k);\\n    }\\n    \\n    public boolean search(TreeNode root, TreeNode cur, int value){\\n        if(root == null)return false;\\n        return (root.val == value) && (root != cur) \\n            || (root.val < value) && search(root.right, cur, value) \\n                || (root.val > value) && search(root.left, cur, value);\\n    }\\n```\\n\\nC++ version:\\n```\\n    bool findTarget(TreeNode* root, int k) {\\n        return dfs(root, root,  k);\\n    }\\n    \\n    bool dfs(TreeNode* root,  TreeNode* cur, int k){\\n        if(cur == NULL)return false;\\n        return search(root, cur, k - cur->val) || dfs(root, cur->left, k) || dfs(root, cur->right, k);\\n    }\\n    \\n    bool search(TreeNode* root, TreeNode *cur, int value){\\n        if(root == NULL)return false;\\n        return (root->val == value) && (root != cur) \\n            || (root->val < value) && search(root->right, cur, value) \\n                || (root->val > value) && search(root->left, cur, value);\\n    }\\n```"
		},
		{
			"lc_ans_id":"106061",
			"view":"2097",
			"top":"1",
			"title":"Java Simple AC with Time O(n) Space O(log n) in Average",
			"vote":"18",
			"content":"There are few possible solutions:\\n\\n#### (1) Use hash set to keep those visited value for fast lookup.\\n-- It can be applied to any kinds of tree.  Time/Space: n/n\\n#### (2) Dump values to array list in-order and search by the way just like in 2sum.\\n -- Time/Space: n/n\\n#### (3) Use the stack and search just like 2sum without dumping all the value out in the beginning.\\n-- Time/Space: n/logn  in average\\n\\nIf I have to choose one from them, I would prefer the **third** one because it takes advantage of the property of BST and is with lower space complexity in average. Its code is shown below.\\n\\n```\\n    public boolean findTarget(TreeNode root, int k) {\\n        if(root == null) return false;\\n    \\tStack<TreeNode> l_stack = new Stack<>();\\n    \\tStack<TreeNode> r_stack = new Stack<>();\\n    \\tstackAdd(l_stack, root, true);\\n    \\tstackAdd(r_stack, root, false);\\n    \\twhile(l_stack.peek() != r_stack.peek()){\\n    \\t    int n = l_stack.peek().val + r_stack.peek().val;\\n    \\t    if(n == k){\\n    \\t\\treturn true;\\n    \\t    }else if(n > k){\\n    \\t\\tstackNext(r_stack, false);\\n    \\t    }else{\\n\\t\\tstackNext(l_stack, true);\\n    \\t    }\\n    \\t}\\n    \\treturn false;\\n    }\\n    \\n    private void stackAdd(Stack<TreeNode> stack, TreeNode node, boolean isLeft){\\n    \\twhile(node != null){\\n    \\t    stack.push(node);\\n            node = (isLeft) ? node.left : node.right;\\n    \\t}\\n    }\\n\\n    private void stackNext(Stack<TreeNode> stack, boolean isLeft){\\n    \\tTreeNode node = stack.pop();\\n    \\tif(isLeft){\\n    \\t    stackAdd(stack, node.right, isLeft);\\n    \\t}else{\\n    \\t    stackAdd(stack, node.left, isLeft);\\n    \\t}\\n    }\\n```"
		},
		{
			"lc_ans_id":"106063",
			"view":"4496",
			"top":"2",
			"title":"[C++] Clean Code - O(n) time O(lg n) space - BinaryTree Iterator",
			"vote":"17",
			"content":"**O(n) time O(n) space - Inorder Vector**\\n```\\nclass Solution {\\npublic:\\n    bool findTarget(TreeNode* root, int k) {\\n        vector<int> nums;\\n        inorder(root, nums);\\n        return findTargetInSortedArray(nums, k);\\n    }\\n\\nprivate:\\n    void inorder(TreeNode* node, vector<int>& nums) {\\n        if (!node) return;\\n        inorder(node->left, nums);\\n        nums.push_back(node->val);\\n        inorder(node->right, nums);\\n    }\\n\\n    bool findTargetInSortedArray(vector<int> a, int target) {\\n        for (int i = 0, j = a.size() - 1; i < j;) {\\n            int sum = a[i] + a[j];\\n            if (sum == target) {\\n                return true;\\n            }\\n            else if (sum < target) {\\n                i++;\\n            }\\n            else {\\n                j--;\\n            }\\n        }\\n\\n        return false;\\n    }\\n};\\n```\\n**O(n) time O(lg n) space - BinaryTree Iterator**\\n```\\nclass BSTIterator {\\n    stack<TreeNode*> s;\\n    TreeNode* node;\\n    bool forward;\\npublic:\\n    BSTIterator(TreeNode *root, bool forward) : node(root), forward(forward) {};\\n    bool hasNext() {\\n        return node != nullptr || !s.empty();\\n    }\\n    int next() {\\n        while (node || !s.empty()) {\\n            if (node) {\\n                s.push(node);\\n                node = forward ? node->left : node->right;\\n            }\\n            else {\\n                node = s.top();\\n                s.pop();\\n                int nextVal = node->val;\\n                node = forward ? node->right : node->left;\\n                return nextVal;\\n            }\\n        }\\n\\n        return -1;  // never reach & not necessary\\n    }\\n};\\nclass Solution {\\npublic:\\n    bool findTarget(TreeNode* root, int k) {\\n        if (!root) return false;\\n        BSTIterator l(root, true);\\n        BSTIterator r(root, false);\\n        for (int i = l.next(), j = r.next(); i < j;) {\\n            int sum = i + j;\\n            if (sum == k) {\\n                return true;\\n            }\\n            else if (sum < k) {\\n                i = l.next();\\n            }\\n            else {\\n                j = r.next();\\n            }\\n        }\\n        return false;\\n    }\\n};\\n```\\nSimplified using operator overloading\\n```\\nclass BSTIterator {\\n    stack<TreeNode*> s;\\n    TreeNode* node;\\n    bool forward;\\n    int cur;\\npublic:\\n    BSTIterator(TreeNode *root, bool forward) : node(root), forward(forward) { (*this)++; };\\n    int operator*() { return cur; }\\n    void operator++(int) {\\n        while (node || !s.empty()) {\\n            if (node) {\\n                s.push(node);\\n                node = forward ? node->left : node->right;\\n            }\\n            else {\\n                node = s.top();\\n                s.pop();\\n                cur = node->val;\\n                node = forward ? node->right : node->left;\\n                break;\\n            }\\n        }\\n    }\\n};\\nclass Solution {\\npublic:\\n    bool findTarget(TreeNode* root, int k) {\\n        if (!root) return false;\\n        BSTIterator l(root, true);\\n        BSTIterator r(root, false);\\n        while (*l < *r) {\\n            if (*l + *r == k) return true;\\n            else if (*l + *r < k) l++;\\n            else r++;\\n        }\\n        return false;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"106067",
			"view":"3301",
			"top":"3",
			"title":"C++/Python Straight Forward Solution",
			"vote":"9",
			"content":"In my solution, I check the target value during the search, whick makes the solution conciser.\\n\\nC++:\\n````\\nclass Solution {\\n    set<int> s;\\n    bool dfs(TreeNode *cur, int k) {\\n        if (!cur) return false;\\n        if (s.count(k - cur->val)) return true;\\n        s.insert(cur->val);\\n        return dfs(cur->left, k) || dfs(cur->right, k);\\n    }\\npublic:\\n    bool findTarget(TreeNode* root, int k) {\\n        s.clear();\\n        return dfs(root, k);\\n    }\\n};\\n`````\\nPython:\\n\\n`````\\ndef findTarget(self, root, k):\\n        if not root: return False\\n        bfs, s = [root], set()\\n        for i in bfs:\\n            if k - i.val in s: return True\\n            s.add(i.val)\\n            if i.left: bfs.append(i.left)\\n            if i.right: bfs.append(i.right)\\n        return False"
		},
		{
			"lc_ans_id":"106129",
			"view":"1863",
			"top":"4",
			"title":"Java solution, tree traversal and two pointers",
			"vote":"5",
			"content":"1. Get a sorted array by in-order traversing a ```BST```.\\n2. Solve Two Sum problem in a sorted array.\\n```\\npublic class Solution {\\n    public boolean findTarget(TreeNode root, int k) {\\n        if (root == null) return false;\\n        \\n        List<Integer> list = new ArrayList<>();\\n        inOrder(root, list);\\n        \\n        int i = 0, j = list.size() - 1;\\n        while (i < j) {\\n            int sum = list.get(i) + list.get(j);\\n            if (sum == k) return true;\\n            if (sum < k) {\\n                i++;\\n            }\\n            else {\\n                j--;\\n            }\\n        }\\n        \\n        return false;\\n    }\\n    \\n    private void inOrder(TreeNode root, List<Integer> list) {\\n        if (root == null) return;\\n        \\n        inOrder(root.left, list);\\n        list.add(root.val);\\n        inOrder(root.right, list);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106110",
			"view":"180",
			"top":"5",
			"title":"Java Code - O(n) time / O(lg(n)) space using DFS + Stack",
			"vote":"4",
			"content":"If we convert BST to sorted array and use two pointers, we need <strong>O(n)</strong> space. In fact, we only need <strong>O(lg(n))</strong> space, by implement two iterators using stack.\\n\\nThe idea of using interator is from [173. Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/description/). Since the in-order treversal of BST ouputs the value in ascending order, we can use iterator to get next smallest value in <strong>O(1) average time</strong>. Similarly, we can also implement a reverse iterator to get next largest value each time from BST. (For how to use stack to implement iterator, please refer to: https://discuss.leetcode.com/topic/6604/ideal-solution-using-stack-java)\\n\\nWith those two iterators in hand, now we can use two pointers to solve the problem.\\n\\nSince the size iterator(stack) is the height of the BST tree, it only requries <strong>O(lg(n))</strong> space.\\n\\nSo the overall performace is: O(n)/O(lg(n)).\\n\\nHere is my Java implementation:\\n```\\n    public boolean findTarget(TreeNode root, int k) {\\n        Stack<TreeNode> stackL = new Stack<TreeNode>();  // iterator 1 that gets next smallest value\\n        Stack<TreeNode> stackR = new Stack<TreeNode>();  // iterator 2 that gets next largest value\\n        \\n        for(TreeNode cur = root; cur != null; cur = cur.left)  \\n            stackL.push(cur);\\n        for(TreeNode cur = root; cur != null; cur = cur.right)  \\n            stackR.push(cur);\\n            \\n        while(stackL.size() != 0 && stackR.size() != 0 && stackL.peek() != stackR.peek()){\\n            int tmpSum = stackL.peek().val + stackR.peek().val;\\n            if(tmpSum == k)  return true;\\n            else if(tmpSum < k)\\n                for(TreeNode cur = stackL.pop().right; cur != null; cur = cur.left) \\n                    stackL.push(cur);\\n            else\\n                for(TreeNode cur = stackR.pop().left; cur != null; cur = cur.right) \\n                    stackR.push(cur);\\n        }\\n        \\n        return false;\\n    }\\n```"
		},
		{
			"lc_ans_id":"106090",
			"view":"124",
			"top":"6",
			"title":"My C++ non-recursive solution using unordered_set and stack",
			"vote":"3",
			"content":"````\\n    bool findTarget(TreeNode* root, int k) {\\n        unordered_set<int> s;\\n        stack<TreeNode*> q;\\n        q.push(root);\\n        TreeNode *temp;\\n        while(q.size())\\n        {\\n            temp = q.top();\\n            q.pop();\\n            if(temp){\\n                if(s.count(k-temp->val)) return true;\\n                else s.insert(temp->val);\\n                if(temp->right) q.push(temp->right);\\n                if(temp->left) q.push(temp->left);\\n            }\\n        }\\n        return false;\\n    }\\n````"
		},
		{
			"lc_ans_id":"106066",
			"view":"442",
			"top":"7",
			"title":"Two simple elegant approaches in JavaScript. O(n) time O(n) space",
			"vote":"3",
			"content":"**Approach 1**\\n\\nKeep a set of existing values and check for the complement value as you traverse the BST.\\n\\n```\\nvar findTarget = function(root, k) {\\n    const values = new Set();\\n    let found = false;\\n    function inorder(node) {\\n        if (!node) {\\n            return;\\n        }\\n        inorder(node.left);\\n        if (values.has(k - node.val)) {\\n            found = true;\\n            return;\\n        }\\n        values.add(node.val);\\n        inorder(node.right);\\n    }\\n    inorder(root);\\n    return found;\\n};\\n```\\n\\n**Approach 2**\\n\\nThis problem can be solved by composing two steps:\\n\\n1. Collect all values into a sorted list.\\n2. You have just reduced the problem into a Two Sum problem on a sorted list, simply use any of the methods proposed [here](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/solution/). In my case I opted for a two pointer approach.\\n\\n```\\nvar findTarget = function(root, k) {\\n    const values = [];\\n    function inorder(node) {\\n        if (!node) {\\n            return;\\n        }\\n        inorder(node.left);\\n        values.push(node.val);\\n        inorder(node.right);\\n    }\\n    inorder(root);\\n    let start = 0, end = values.length - 1;\\n    while (start < end) {\\n        const total = values[start] + values[end];\\n        if (total > k) {\\n            end--;\\n        } else if (total < k) {\\n            start++;\\n        } else {\\n            return true;\\n        }\\n    }\\n    return false;\\n};\\n```"
		},
		{
			"lc_ans_id":"106134",
			"view":"443",
			"top":"8",
			"title":"Simple Python O(n) Solution with Explanation",
			"vote":"2",
			"content":"As you traverse the tree, put each node's value into a set. In order for some value `x` to sum up to `k`, the value `k - x` must have been in the set already. Therefore, assuming we have a set of node values, if we find a complement of a node in that set, we have found two values that sum up to `k`.\\n\\n```\\nclass Solution(object):\\n    def findTarget(self, root, k):\\n        \"\"\"\\n        :type root: TreeNode\\n        :type k: int\\n        :rtype: bool\\n        \"\"\"\\n        if not root:\\n            return False\\n\\n        return self._findTarget(root, set(), k)\\n    \\n    def _findTarget(self, node, nodes, k):\\n        if not node:\\n            return False\\n\\n        complement = k - node.val\\n        if complement in nodes:\\n            return True\\n\\n        nodes.add(node.val)\\n\\n        return self._findTarget(node.left, nodes, k) or self._findTarget(node.right, nodes, k)\\n```"
		},
		{
			"lc_ans_id":"106105",
			"view":"941",
			"top":"9",
			"title":"Python Simple O(n) DFS",
			"vote":"2",
			"content":"    def findTarget(self, root, k):\\n        a = set()\\n        self.f = False\\n        def dfs(root, k):\\n            if not root:\\n                return \\n            if root.val not in a:\\n                a.add(k - root.val)\\n            else:\\n                self.f = True\\n            dfs(root.left, k)\\n            dfs(root.right, k)\\n        dfs(root, k)\\n        return self.f"
		}
	],
	"id":"630",
	"title":"Two Sum IV - Input is a BST",
	"content":"<p>Given a Binary Search Tree and a target number, return true if there exist two elements in the BST such that their sum is equal to the given target.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n    5\r\n   / \\\r\n  3   6\r\n / \\   \\\r\n2   4   7\r\n\r\nTarget = 9\r\n\r\n<b>Output:</b> True\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n    5\r\n   / \\\r\n  3   6\r\n / \\   \\\r\n2   4   7\r\n\r\nTarget = 28\r\n\r\n<b>Output:</b> False\r\n</pre>\r\n</p>\r\n\r\n",
	"frequency":"283",
	"ac_num":"28964"
}