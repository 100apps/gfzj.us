{
	"difficulty":"1",
	"submit_num":"364303",
	"show_id":"108",
	"leetcode_id":"108",
	"answers":[
		{
			"lc_ans_id":"35220",
			"view":"34448",
			"top":"0",
			"title":"My Accepted Java Solution",
			"vote":"118",
			"content":"Hi everyone, this is my accepted recursive Java solution. I get overflow problems at first because I didn't use mid - 1 and mid + 1 as the bound. Hope this helps :)\\n\\n    public TreeNode sortedArrayToBST(int[] num) {\\n        if (num.length == 0) {\\n            return null;\\n        }\\n        TreeNode head = helper(num, 0, num.length - 1);\\n        return head;\\n    }\\n    \\n    public TreeNode helper(int[] num, int low, int high) {\\n        if (low > high) { // Done\\n            return null;\\n        }\\n        int mid = (low + high) / 2;\\n        TreeNode node = new TreeNode(num[mid]);\\n        node.left = helper(num, low, mid - 1);\\n        node.right = helper(num, mid + 1, high);\\n        return node;\\n    }"
		},
		{
			"lc_ans_id":"35218",
			"view":"13266",
			"top":"1",
			"title":"Java Iterative Solution",
			"vote":"46",
			"content":"I came up with the recursion solution first and tried to translate it into an iterative solution. It is very similar to doing a tree inorder traversal, I use three stacks -  nodeStack stores the node I am going to process next, and  **leftIndexStack** and **rightIndexStack** store the range where this node need to read from the **nums**.\\n\\n    public class Solution {\\n        \\n        public TreeNode sortedArrayToBST(int[] nums) {\\n            \\n            int len = nums.length;\\n            if ( len == 0 ) { return null; }\\n            \\n            // 0 as a placeholder\\n            TreeNode head = new TreeNode(0); \\n            \\n            Deque<TreeNode> nodeStack       = new LinkedList<TreeNode>() {{ push(head);  }};\\n            Deque<Integer>  leftIndexStack  = new LinkedList<Integer>()  {{ push(0);     }};\\n            Deque<Integer>  rightIndexStack = new LinkedList<Integer>()  {{ push(len-1); }};\\n            \\n            while ( !nodeStack.isEmpty() ) {\\n                TreeNode currNode = nodeStack.pop();\\n                int left  = leftIndexStack.pop();\\n                int right = rightIndexStack.pop();\\n                int mid   = left + (right-left)/2; // avoid overflow\\n                currNode.val = nums[mid];\\n                if ( left <= mid-1 ) {\\n                    currNode.left = new TreeNode(0);  \\n                    nodeStack.push(currNode.left);\\n                    leftIndexStack.push(left);\\n                    rightIndexStack.push(mid-1);\\n                }\\n                if ( mid+1 <= right ) {\\n                    currNode.right = new TreeNode(0);\\n                    nodeStack.push(currNode.right);\\n                    leftIndexStack.push(mid+1);\\n                    rightIndexStack.push(right);\\n                }\\n            }\\n            return head;\\n        }\\n    \\n    }"
		},
		{
			"lc_ans_id":"35246",
			"view":"12336",
			"top":"2",
			"title":"Accepted C++ recursive solution within a single method",
			"vote":"33",
			"content":"Recursively call the **sortedArrayToBST()** method providing new vector for each call to construct left and right children: \\n\\n    class Solution {\\n    public:\\n        TreeNode *sortedArrayToBST(vector<int> &num) {\\n            if(num.size() == 0) return NULL;\\n            if(num.size() == 1)\\n            {\\n                return new TreeNode(num[0]);\\n            }\\n            \\n            int middle = num.size()/2;\\n            TreeNode* root = new TreeNode(num[middle]);\\n            \\n            vector<int> leftInts(num.begin(), num.begin()+middle);\\n            vector<int> rightInts(num.begin()+middle+1, num.end());\\n            \\n            root->left = sortedArrayToBST(leftInts);\\n            root->right = sortedArrayToBST(rightInts);\\n            \\n            return root;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"35223",
			"view":"8260",
			"top":"3",
			"title":"An easy Python solution",
			"vote":"24",
			"content":"The idea is to find the root first, then recursively build each left and right subtree\\n\\n    # Definition for a  binary tree node\\n    # class TreeNode:\\n    #     def __init__(self, x):\\n    #         self.val = x\\n    #         self.left = None\\n    #         self.right = None\\n    \\n    class Solution:\\n        # @param num, a list of integers\\n        # @return a tree node\\n        # 12:37\\n        def sortedArrayToBST(self, num):\\n            if not num:\\n                return None\\n    \\n            mid = len(num) // 2\\n    \\n            root = TreeNode(num[mid])\\n            root.left = self.sortedArrayToBST(num[:mid])\\n            root.right = self.sortedArrayToBST(num[mid+1:])\\n    \\n            return root"
		},
		{
			"lc_ans_id":"35242",
			"view":"6481",
			"top":"4",
			"title":"16 ms C++ solution",
			"vote":"19",
			"content":"\\n    class Solution {\\n        TreeNode* sortedArrayToBST(vector<int>& nums, int start, int end){\\n            if(end<=start) return NULL; \\n            int midIdx=(end+start)/2;\\n            TreeNode* root=new TreeNode(nums[midIdx]);\\n            root->left=sortedArrayToBST(nums, start, midIdx);\\n            root->right=sortedArrayToBST(nums, midIdx+1,end);\\n            return root;\\n        }\\n    public:\\n        TreeNode* sortedArrayToBST(vector<int>& nums) {\\n            return sortedArrayToBST(nums, 0,nums.size());\\n        }\\n    };"
		},
		{
			"lc_ans_id":"35236",
			"view":"2120",
			"top":"5",
			"title":"Java recursive solution",
			"vote":"10",
			"content":"    public class Solution {\\n        public TreeNode sortedArrayToBST(int[] nums) {\\n            if (nums == null || nums.length ==0){\\n                return null;\\n            }\\n            return getTreeNode(nums, 0, nums.length-1);\\n        }\\n        \\n        private TreeNode getTreeNode(int[] nums, int start, int end){\\n            if (start > end){\\n                return null;\\n            }\\n            int middle = start + (end-start)/2;\\n            TreeNode n = new TreeNode(nums[middle]);\\n            n.left = getTreeNode(nums, start, middle-1);\\n            n.right = getTreeNode(nums, middle+1, end);\\n            return n;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"35427",
			"view":"1255",
			"top":"6",
			"title":"My  C solution with  recursion,7ms",
			"vote":"9",
			"content":"    struct TreeNode* convert(int* nums,int start,int end)\\n    {\\n         if(start > end)\\n              return NULL;\\n         else{\\n             int mid = (start+end)/2;\\n             struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));\\n             node->val = nums[mid];\\n             node->left = convert(nums,start,mid-1);\\n             node->right = convert(nums,mid+1,end);\\n             return node;\\n         }\\n    }\\n \\n\\n    struct TreeNode* sortedArrayToBST(int* nums, int numsSize) {\\n            return convert(nums,0,numsSize-1);\\n    }"
		},
		{
			"lc_ans_id":"35448",
			"view":"1185",
			"top":"7",
			"title":"Smallest and fastest Python solution. 147 ms",
			"vote":"7",
			"content":"    class Solution:\\n\\n        def sortedArrayToBST(self, num):\\n\\n            if not num:\\n                return None\\n\\n            median  = len(num)/2\\n            new_node = TreeNode(num[median])\\n    \\n            new_node.left = self.sortedArrayToBST(num[:median])\\n            new_node.right = self.sortedArrayToBST(num[median+1:])\\n            \\n            return new_node"
		},
		{
			"lc_ans_id":"35428",
			"view":"1733",
			"top":"8",
			"title":"Accepted C++ solution w/o constructing new vectors",
			"vote":"6",
			"content":"As far as I know, construction of \"subvectors\" could be expensive ( O(n) operation). So I tried to avoid creating new vectors for performance. Here's my solution.\\n\\n\\n    class Solution {\\n        TreeNode *dfs(vector<int> &num, int start, int end) {\\n            int idx = start + (end-start)/2;\\n            TreeNode *node = new TreeNode(num[idx]);\\n            \\n            //Base case\\n            if(end == start) \\n                return node;  \\n                \\n            //recurse if valid\\n            if(start <= idx-1)\\n                node->left = dfs(num, start, idx-1);\\n            if(idx+1 <= end)\\n                node->right = dfs(num, idx+1, end);\\n            \\n            return node;\\n        }\\n    public:\\n        TreeNode *sortedArrayToBST(vector<int> &num) {\\n            if(num.empty()) return nullptr;    //check empty case\\n            \\n            return dfs(num, 0, num.size()-1);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"35388",
			"view":"994",
			"top":"9",
			"title":"Very Simple Java Solution",
			"vote":"5",
			"content":"    public class Solution {\\n      public TreeNode sortedArrayToBST(int[] nums) {\\n        return helper(nums, 0, nums.length-1);\\n      }\\n    \\n      private TreeNode helper(int[] nums, int l, int r){\\n        if (l>r) return null;\\n        if (l==r) return new TreeNode(nums[l]);\\n        int mid = (l+r)/2;\\n        TreeNode root = new TreeNode(nums[mid]);\\n        root.left = helper(nums, l, mid-1);\\n        root.right = helper(nums, mid+1, r);\\n        return root;\\n      }\\n    }"
		}
	],
	"id":"108",
	"title":"Convert Sorted Array to Binary Search Tree",
	"content":"<p>Given an array where elements are sorted in ascending order, convert it to a height balanced BST.</p>\r\n\r\n<p>For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of <i>every</i> node never differ by more than 1.</p>\r\n\r\n<br />\r\n\r\n<p>\r\n<b>Example:</b>\r\n<pre>\r\nGiven the sorted array: [-10,-3,0,5,9],\r\n\r\nOne possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:\r\n\r\n      0\r\n     / \\\r\n   -3   9\r\n   /   /\r\n -10  5\r\n</pre>\r\n</p>",
	"frequency":"493",
	"ac_num":"158674"
}