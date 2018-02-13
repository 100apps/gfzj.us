{
	"difficulty":"2",
	"submit_num":"32756",
	"show_id":"654",
	"leetcode_id":"654",
	"answers":[
		{
			"lc_ans_id":"106146",
			"view":"7576",
			"top":"0",
			"title":"C++ O(N) solution",
			"vote":"40",
			"content":"This solution is inspired by @votrubac\\nHere is his brilliant solution\\nhttps://discuss.leetcode.com/topic/98454/c-9-lines-o-n-log-n-map\\n\\nThe key idea is:\\n1. We scan numbers from left to right, build the tree one node by one step;\\n2. We use a stack to keep some (not all) tree nodes and ensure a decreasing order;\\n3. For each number, we keep pop the stack until empty or a bigger number; The bigger number (if exist, it will be still in stack) is current number's root, and the last popped number (if exist) is current number's right child (temporarily, this relationship may change in the future); Then we push current number into the stack.\\n\\n```\\n/**\\n * Definition for a binary tree node.\\n * struct TreeNode {\\n *     int val;\\n *     TreeNode *left;\\n *     TreeNode *right;\\n *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\\n * };\\n */\\nclass Solution {\\npublic:\\n    TreeNode* constructMaximumBinaryTree(vector<int>& nums) {\\n        vector<TreeNode*> stk;\\n        for (int i = 0; i < nums.size(); ++i)\\n        {\\n            TreeNode* cur = new TreeNode(nums[i]);\\n            while (!stk.empty() && stk.back()->val < nums[i])\\n            {\\n                cur->left = stk.back();\\n                stk.pop_back();\\n            }\\n            if (!stk.empty())\\n                stk.back()->right = cur;\\n            stk.push_back(cur);\\n        }\\n        return stk.front();\\n    }\\n};\\n```\\n\\nThis solution will be slightly faster than normal recursive solution.\\n\\nAgain, great thanks to @votrubac  !!!"
		},
		{
			"lc_ans_id":"106149",
			"view":"6763",
			"top":"1",
			"title":"Java solution, recursion",
			"vote":"15",
			"content":"A typical recursion problem. \\n\\n```\\npublic class Solution {\\n    public TreeNode constructMaximumBinaryTree(int[] nums) {\\n        if (nums == null) return null;\\n        return build(nums, 0, nums.length - 1);\\n    }\\n    \\n    private TreeNode build(int[] nums, int start, int end) {\\n        if (start > end) return null;\\n        \\n        int idxMax = start;\\n        for (int i = start + 1; i <= end; i++) {\\n            if (nums[i] > nums[idxMax]) {\\n                idxMax = i;\\n            }\\n        }\\n        \\n        TreeNode root = new TreeNode(nums[idxMax]);\\n        \\n        root.left = build(nums, start, idxMax - 1);\\n        root.right = build(nums, idxMax + 1, end);\\n        \\n        return root;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106156",
			"view":"712",
			"top":"2",
			"title":"Java worst case O(N) solution",
			"vote":"8",
			"content":"Each node went into stack once, and went out stack once. Worst case time complexity O(N).\\n\\n```\\nclass Solution {\\n    public TreeNode constructMaximumBinaryTree(int[] nums) {\\n        Deque<TreeNode> stack = new LinkedList<>();\\n        for(int i = 0; i < nums.length; i++) {\\n            TreeNode curr = new TreeNode(nums[i]);\\n            while(!stack.isEmpty() && stack.peek().val < nums[i]) {\\n                curr.left = stack.pop();\\n            }\\n            if(!stack.isEmpty()) {\\n                stack.peek().right = curr;\\n            }\\n            stack.push(curr);\\n        }\\n        \\n        return stack.isEmpty() ? null : stack.removeLast();\\n    }\\n}"
		},
		{
			"lc_ans_id":"106147",
			"view":"3424",
			"top":"3",
			"title":"C++ 9 lines O(n log n) map, plus stack with binary search",
			"vote":"6",
			"content":"We populate right subtree if numbers are decreasing. If the current number is larger than any numbers in the right subtree, we find the first that is smaller, and make it a left subtree of the current number. The current number becomes a leaf of the right subtree.\\n\\nI use map as it provides the convenient insert operation, that returns the position of the inserted element in O (log n).\\n```\\nTreeNode* constructMaximumBinaryTree(vector<int>& nums) {\\n    map<int, TreeNode*> q = { { nums[0], new TreeNode(nums[0]) } };\\n    for (auto i = 1; i < nums.size(); ++i) {\\n        auto it_b = q.insert({ nums[i], new TreeNode(nums[i]) });\\n        if (it_b.first != q.begin()) { // left tree.\\n            it_b.first->second->left = next(it_b.first, -1)->second;\\n            q.erase(q.begin(), it_b.first);\\n        }\\n        if (next(it_b.first, 1) != q.end()) // right tree.\\n            next(it_b.first, 1)->second->right = it_b.first->second;\\n    }\\n    return q.rbegin()->second;\\n}\\n```\\nAs pointed out by @Mrsuyi, we can use stack instead of map, as map adds some overhead to maintain internal BST. Below is the solution based on the one proposed by @Mrsuyi, optimized to use the binary search (as our stack will be always sorted).\\n```\\nTreeNode* constructMaximumBinaryTree(vector<int>& nums) {\\n    vector<TreeNode*> s { new TreeNode(nums[0]) };\\n    for (int i = 1; i < nums.size(); ++i) {\\n        TreeNode* cur = new TreeNode(nums[i]);\\n        auto it = upper_bound(s.rbegin(), s.rend(), cur, \\n                              [](const TreeNode* a, const TreeNode* b) { return a->val < b->val; });\\n        if (it != s.rend()) (*it)->right = cur;\\n        if (it != s.rbegin()) cur->left = *next(it, -1);\\n        s.resize(distance(it, s.rend()));\\n        s.push_back(cur);\\n    }\\n    return s.front();\\n}\\n```"
		},
		{
			"lc_ans_id":"106194",
			"view":"2050",
			"top":"4",
			"title":"[Java/C++] Simple recursive method.",
			"vote":"4",
			"content":"The idea is to use divide and conquer. Each time we create a node ```root``` for the maximum value in the range. Then, we split it into a left range and a right range, which are the left subtree and right subtree of this maximum node ```root```.\\n\\nJava version:\\n```\\n  public TreeNode constructMaximumBinaryTree(int[] nums) {\\n        return helper(nums, 0, nums.length - 1);\\n    }\\n    \\n    //max_index denotes the index of the maximum number in range [left, right]\\n    public TreeNode helper(int[] nums, int left, int right){\\n        if(left>right)return null;\\n        \\n        int max_index = left;\\n        for(int i = left; i <= right; i++){\\n            if(nums[i] > nums[max_index])max_index = i; \\n        }\\n        \\n        TreeNode root = new TreeNode(nums[max_index]);\\n        root.left = helper(nums, left, max_index - 1);\\n        root.right = helper(nums, max_index + 1, right);\\n        return root;\\n    }\\n```\\n\\nC++ version:\\n```\\n   TreeNode* constructMaximumBinaryTree(vector<int>& nums) {\\n        return helper(nums, 0, nums.size() - 1);\\n    }\\n    \\n    //max_index denotes the index of the maximum number in range [left, right]\\n    TreeNode* helper(vector<int>& nums, int left, int right){\\n        if(left>right)return NULL;\\n        \\n        int max_index = left;\\n        for(int i = left; i<=right; i++){\\n            if(nums[i] > nums[max_index])max_index = i; \\n        }\\n        \\n        TreeNode* root = new TreeNode(nums[max_index]);\\n        root->left = helper(nums, left, max_index - 1);\\n        root->right = helper(nums, max_index + 1, right);\\n        return root;\\n    }\\n```"
		},
		{
			"lc_ans_id":"106164",
			"view":"773",
			"top":"5",
			"title":"Very simple tree insertion. No need recursion.",
			"vote":"3",
			"content":"This is the simple, easy to understand insertion. (59 ms)\\n```\\nclass Solution {\\npublic:\\n    TreeNode* constructMaximumBinaryTree(vector<int>& nums) {\\n        if(nums.empty())    return nullptr;\\n        TreeNode* root = new TreeNode(nums[0]);\\n        for(int i=1; i<nums.size(); i++)\\n            root = insert(nums[i],root);\\n        return root;\\n    }\\n    \\n    //insert the num to the tree and return the root\\n    TreeNode* insert(int num, TreeNode* root){\\n        TreeNode* n = new TreeNode(num);\\n        if(num>root->val){   //num is the largest among all the previous number\\n            n->left = root;  // n is the new root\\n            return n;\\n        }\\n        TreeNode* prev = root;\\n        TreeNode* tmp = root->right;\\n        while(tmp && num<tmp->val){\\n            prev = tmp;\\n            tmp = tmp->right;\\n        }\\n        prev->right = n;\\n        n->left = tmp;\\n        return root;\\n    }\\n};\\n```\\n\\nHere is another recursion solution. Instead of finding only one maximum from interval ```[l,r]```, we can find 3 maximum indices, maximum index ```M``` in ```[l,r]```, maximum index ```L``` in ```[l,M-1]```, and maximum index ```R``` in ```[M+1,r]```. Then we can build 2 tree layers at a time.\\n```\\nclass Solution {\\npublic:\\n    TreeNode* constructMaximumBinaryTree(vector<int>& nums) {\\n        return build(nums,0,nums.size()-1);\\n    }\\n    \\n    TreeNode* build(const vector<int>& nums, int left, int right){\\n        if(left>right) return nullptr;\\n        else if(left==right)   return new TreeNode(nums[left]);\\n        else{\\n            int L=-1, M=left, R=-1; //set index to -1 if not found\\n            for(int i=left+1; i<=right; i++){\\n                if(nums[i]>nums[M]){\\n                    L = M;\\n                    M = i;\\n                    R = -1;\\n                }\\n                else if(R==-1 || nums[i]>nums[R])\\n                    R = i;\\n            }\\n            // e.g. nums=[3,6,2,1,7,0,5,4]\\n            // L=1(nums[L]=6), M=4(nums[M]=7), R=6(nums[R]=5)\\n            \\n            TreeNode* n = new TreeNode(nums[M]);\\n            if(L!=-1){\\n                n->left = new TreeNode(nums[L]);\\n                n->left->left = build(nums,left,L-1);\\n                n->left->right = build(nums,L+1,M-1);\\n            }\\n            if(R!=-1){\\n                n->right = new TreeNode(nums[R]);\\n                n->right->left = build(nums,M+1,R-1);\\n                n->right->right = build(nums,R+1,right);\\n            }\\n            return n;\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"106138",
			"view":"1801",
			"top":"6",
			"title":"Python Simple DFS",
			"vote":"2",
			"content":"    def constructMaximumBinaryTree(self, nums):   \\n        dummy = TreeNode(None)\\n        def d(root, nums):\\n            if not nums:\\n                return \\n            i = nums.index(max(nums))\\n            root.val = max(nums)\\n            if nums[:i]:\\n                root.left = TreeNode(None)\\n                d(root.left, nums[:i])\\n            if nums[i+1:]:\\n                root.right = TreeNode(None)\\n                d(root.right, nums[i+1:])\\n        d(dummy, nums)\\n        return dummy"
		},
		{
			"lc_ans_id":"106177",
			"view":"57",
			"top":"7",
			"title":"JAVA non recursion solution O(n)time no extra space used",
			"vote":"1",
			"content":"**Compare root value or root's right value when inserting a new node.** \\n\\n    public TreeNode constructMaximumBinaryTree(int[] nums) {\\n        if(nums.length == 0) return null;\\n        TreeNode root = new TreeNode(nums[0]);\\n        for(int i = 1; i < nums.length; i++){\\n            TreeNode node = new TreeNode(nums[i]);\\n            if(nums[i] > root.val){ // make the new node as root\\n                TreeNode temp = root;\\n                root = node;\\n                root.left = temp;\\n            }else{\\n               TreeNode right = root;\\n               while( right.right != null && right.right.val > node.val) right = right.right; // find a right branch is small than the new node\\n               TreeNode left = right.right;\\n               right.right = node;\\n               node.left = left;\\n            }\\n        }\\n        return root;\\n    }"
		},
		{
			"lc_ans_id":"106186",
			"view":"248",
			"top":"8",
			"title":"Two C++ solution with explanation O(n)time O(1)space no recursion And O(n^2) recursion",
			"vote":"1",
			"content":"Solution 1:\\nThe idea is  we traverse from left to right. So if the current node->val more than the head->val we just put the head to the current  node's left, because the current node aways at the right of the head. And then make the current node be the new head. we the current node->val is less than head, keep travel the right of head, right->right,  right->right->right ......, when find a right node->val less than the current node->val, we put the current node to the right node's place and put the right node to the current node's left. But if all right node are all more than the current node, we need put the current node to the last right node 's right.\\n```\\n //O(n) method\\n    TreeNode* constructMaximumBinaryTree(vector<int>& nums) {\\n        if(nums.size()==0)\\n            return nullptr;\\n        TreeNode *head=new TreeNode(nums[0]);\\n        TreeNode *rightNode=head;\\n        for(int i=1;i<nums.size();++i)\\n        {\\n            TreeNode *nowNode=new TreeNode(nums[i]);\\n            rightNode=head;\\n            if(head->val<nowNode->val)\\n            {\\n                nowNode->left=head;\\n                head=nowNode;\\n            }else\\n            {\\n                bool find=false;\\n                while(rightNode->right)\\n                {\\n                    if(nowNode->val>rightNode->right->val)\\n                    {\\n                        nowNode->left=rightNode->right;\\n                        rightNode->right=nowNode;\\n                        find=true;\\n                        break;\\n                    }else\\n                        rightNode=rightNode->right;\\n                }\\n                if(find==false)\\n                    rightNode->right=nowNode;\\n            }                           \\n        }\\n        return head;\\n    }\\n```\\nSolution 2:\\nEasy to understand. just find the max num as the head, and do same to the left part and right part.\\n```\\n//O(n^2) method\\n    TreeNode* constructMaximumBinaryTree(vector<int>& nums) {\\n        if(nums.size()==0)\\n            return nullptr;\\n        return helpBuildTree(nums,0,nums.size()-1);\\n    }\\n    TreeNode* helpBuildTree(vector<int>& nums,int left,int right) {\\n        if(left>right)\\n            return nullptr;\\n        int maxIndex=left,maxNum=nums[left];\\n        for(int i=left+1;i<=right;++i)\\n        {\\n            if(nums[i]>maxNum)\\n            {\\n                maxNum=nums[i];\\n                maxIndex=i;\\n            }\\n        }\\n        //cout<<maxNum<<\" \";\\n        TreeNode *head=new TreeNode(maxNum);\\n        head->left=helpBuildTree(nums,left,maxIndex-1);\\n        head->right=helpBuildTree(nums,maxIndex+1,right);\\n        return head;\\n        \\n    }\\n```"
		},
		{
			"lc_ans_id":"106200",
			"view":"84",
			"top":"9",
			"title":"another way to recursion",
			"vote":"1",
			"content":"don't need to record max...\\n\\n```\\npublic class Solution {\\n    public TreeNode constructMaximumBinaryTree(int[] nums) {\\n        if(nums == null) return null;\\n        TreeNode root = null;\\n        for(int i: nums)\\n            root = helper(root,i);\\n        return root;\\n    }\\n    \\n    private TreeNode helper(TreeNode x, int i){\\n        if(x == null) return new TreeNode(i);\\n        if(x.val > i) \\n            x.right = helper(x.right,i);\\n        else\\n        {\\n            TreeNode root = new TreeNode(i);\\n            root.left = x;\\n            return root;\\n        }\\n        return x;\\n    }\\n}\\n```"
		}
	],
	"id":"631",
	"title":"Maximum Binary Tree",
	"content":"<p>\r\nGiven an integer array with no duplicates. A maximum tree building on this array is defined as follow:\r\n<ol>\r\n<li>The root is the maximum number in the array. </li>\r\n<li>The left subtree is the maximum tree constructed from left part subarray divided by the maximum number.</li>\r\n<li>The right subtree is the maximum tree constructed from right part subarray divided by the maximum number.</li> \r\n</ol>\r\n</p>\r\n\r\n<p>\r\nConstruct the maximum tree by the given array and output the root node of this tree.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [3,2,1,6,0,5]\r\n<b>Output:</b> return the tree root node representing the following tree:\r\n\r\n      6\r\n    /   \\\r\n   3     5\r\n    \\    / \r\n     2  0   \r\n       \\\r\n        1\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The size of the given array will be in the range [1,1000].</li>\r\n</ol>\r\n</p>",
	"frequency":"405",
	"ac_num":"22870"
}