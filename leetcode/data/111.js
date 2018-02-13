{
	"difficulty":"1",
	"submit_num":"596125",
	"show_id":"111",
	"leetcode_id":"111",
	"answers":[
		{
			"lc_ans_id":"36045",
			"view":"36398",
			"top":"0",
			"title":"My 4 Line java solution",
			"vote":"159",
			"content":"    public class Solution {\\n        public int minDepth(TreeNode root) {\\n            if(root == null) return 0;\\n            int left = minDepth(root.left);\\n            int right = minDepth(root.right);\\n            return (left == 0 || right == 0) ? left + right + 1: Math.min(left,right) + 1;\\n           \\n        }\\n    }"
		},
		{
			"lc_ans_id":"36153",
			"view":"12852",
			"top":"1",
			"title":"My concise c++ solution",
			"vote":"65",
			"content":"\\n\\n    class Solution {\\n    public:\\n        int minDepth(TreeNode *root) {\\n            if(!root) return 0;\\n            if(!root->left) return 1 + minDepth(root->right);\\n            if(!root->right) return 1 + minDepth(root->left);\\n            return 1+min(minDepth(root->left),minDepth(root->right));\\n        }\\n    };"
		},
		{
			"lc_ans_id":"36055",
			"view":"10364",
			"top":"2",
			"title":"Why expected result for input of {1,2}  is 2? Shouldn't it be 1?",
			"vote":"54",
			"content":"Why expected result for input of {1,2}  is 2? Shouldn't it be 1?"
		},
		{
			"lc_ans_id":"36060",
			"view":"10524",
			"top":"3",
			"title":"3 lines in Every Language",
			"vote":"51",
			"content":"We need to add the smaller one of the child depths - except if that's zero, then add the larger one. The first Python solution is the clearest because it lets me directly say exactly that.\\n\\n**Python versions:**\\n\\n    def minDepth(self, root):\\n        if not root: return 0\\n        d = map(self.minDepth, (root.left, root.right))\\n        return 1 + (min(d) or max(d))\\n\\n    def minDepth(self, root):\\n        if not root: return 0\\n        d, D = sorted(map(self.minDepth, (root.left, root.right)))\\n        return 1 + (d or D)\\n\\n**C++ versions:**\\n\\n    int minDepth(TreeNode* root) {\\n        if (!root) return 0;\\n        int L = minDepth(root->left), R = minDepth(root->right);\\n        return 1 + (min(L, R) ? min(L, R) : max(L, R));\\n    }\\n\\n    int minDepth(TreeNode* root) {\\n        if (!root) return 0;\\n        int L = minDepth(root->left), R = minDepth(root->right);\\n        return 1 + (L && R ? min(L, R) : max(L, R));\\n    }\\n\\n    int minDepth(TreeNode* root) {\\n        if (!root) return 0;\\n        int L = minDepth(root->left), R = minDepth(root->right);\\n        return 1 + (!L-!R ? max(L, R) : min(L, R));\\n    }\\n\\n    int minDepth(TreeNode* root) {\\n        if (!root) return 0;\\n        int L = minDepth(root->left), R = minDepth(root->right);\\n        return L<R && L || !R ? 1+L : 1+R;\\n    }\\n\\n**Java versions:**\\n\\n    public int minDepth(TreeNode root) {\\n        if (root == null) return 0;\\n        int L = minDepth(root.left), R = minDepth(root.right);\\n        return 1 + (Math.min(L, R) > 0 ? Math.min(L, R) : Math.max(L, R));\\n    }\\n\\n    public int minDepth(TreeNode root) {\\n        if (root == null) return 0;\\n        int L = minDepth(root.left), R = minDepth(root.right), m = Math.min(L, R);\\n        return 1 + (m > 0 ? m : Math.max(L, R));\\n    }\\n\\n    public int minDepth(TreeNode root) {\\n        if (root == null) return 0;\\n        int L = minDepth(root.left), R = minDepth(root.right);\\n        return L<R && L>0 || R<1 ? 1+L : 1+R;\\n    }\\n\\n**Ruby version:**\\n\\n    def min_depth(root)\\n        return 0 if !root\\n        d, e = [min_depth(root.left), min_depth(root.right)].sort\\n        1 + (d>0 ? d : e)\\n    end\\n\\n**Javascript version:**\\n\\n    var minDepth = function(root) {\\n        if (!root) return 0\\n        var L = minDepth(root.left), R = minDepth(root.right)\\n        return 1 + (Math.min(L, R) || Math.max(L, R))\\n    };\\n\\n**C version:**\\n\\n    int minDepth(struct TreeNode* root) {\\n        if (!root) return 0;\\n        int L = minDepth(root->left), R = minDepth(root->right);\\n        return L<R && L || !R ? 1+L : 1+R;\\n    }\\n\\n**C# version:**\\n\\n    public int MinDepth(TreeNode root) {\\n        if (root == null) return 0;\\n        int L = MinDepth(root.left), R = MinDepth(root.right);\\n        return L<R && L>0 || R<1 ? 1+L : 1+R;\\n    }"
		},
		{
			"lc_ans_id":"36061",
			"view":"12881",
			"top":"4",
			"title":"My solution used level-order traversal",
			"vote":"44",
			"content":"level-order traversal and record current level depth, when meet a node which both child is null then return, no need to go farther\\n\\n    public class Solution {\\n    public int minDepth(TreeNode root) {\\n\\t\\tif (root == null)\\n\\t\\t\\treturn 0;\\n\\t\\tint depth = 1;\\n\\t\\tQueue<TreeNode> queue = new LinkedList<TreeNode>();\\n\\t\\tTreeNode temp,magic = new TreeNode(0);\\n\\t\\tqueue.add(root);\\n\\t\\tqueue.add(magic);\\n\\t\\twhile(!queue.isEmpty()){\\n\\t\\t\\ttemp = queue.poll();\\n\\t\\t\\tif(temp.equals(magic)){\\n\\t\\t\\t    if(!queue.isEmpty()){\\n\\t\\t\\t        depth++;\\n\\t\\t\\t\\t    queue.add(magic);\\n\\t\\t\\t    }\\n\\t\\t\\t    continue;\\n\\t\\t\\t}\\n\\t\\t\\tif(temp.left == null && temp.right == null)\\n\\t\\t\\t\\treturn depth;\\n\\t\\t\\tif(temp.left != null)\\n\\t\\t\\t\\tqueue.add(temp.left);\\n\\t\\t\\tif(temp.right != null)\\n\\t\\t\\t\\tqueue.add(temp.right);\\n\\t\\t}\\n\\t\\treturn depth;\\n\\t}\\n    }\\nAny better solution?"
		},
		{
			"lc_ans_id":"36071",
			"view":"4070",
			"top":"5",
			"title":"BFS, C++, 8ms, Beats 99.94% submissions",
			"vote":"32",
			"content":"    int minDepth(TreeNode* root) {\\n        if (root == NULL) return 0;\\n        queue<TreeNode*> Q;\\n        Q.push(root);\\n        int i = 0;\\n        while (!Q.empty()) {\\n            i++;\\n            int k = Q.size();\\n            for (int j=0; j<k; j++) {\\n                TreeNode* rt = Q.front();\\n                if (rt->left) Q.push(rt->left);\\n                if (rt->right) Q.push(rt->right);\\n                Q.pop();\\n                if (rt->left==NULL && rt->right==NULL) return i;\\n            }\\n        }\\n        return -1; //For the compiler thing. The code never runs here.\\n    }"
		},
		{
			"lc_ans_id":"36145",
			"view":"3828",
			"top":"6",
			"title":"4 lines Short and Neat Recursive Code. :) [JAVA]",
			"vote":"25",
			"content":"    public int minDepth(TreeNode root) {\\n        if(root == null) return 0;\\n        if(root.left == null || root.right == null) \\n        return 1 + Math.max(minDepth(root.left), minDepth(root.right));\\n        return 1 + Math.min(minDepth(root.left), minDepth(root.right));\\n    }"
		},
		{
			"lc_ans_id":"36188",
			"view":"3328",
			"top":"7",
			"title":"Very easy, with recursion, 1ms Java solution",
			"vote":"24",
			"content":"\\n    public int minDepth(TreeNode root) {\\n        if (root == null)\\n            return 0;\\n        if (root.left != null && root.right != null)\\n            return Math.min(minDepth(root.left), minDepth(root.right))+1;\\n        else\\n            return Math.max(minDepth(root.left), minDepth(root.right))+1;\\n    }"
		},
		{
			"lc_ans_id":"36094",
			"view":"4089",
			"top":"8",
			"title":"My solution in python",
			"vote":"19",
			"content":"The idea is to use recursion, the accepted short python code looks like follows:\\n\\n    class Solution:\\n        # @param root, a tree node\\n        # @return an integer    \\n        def minDepth(self, root):\\n            if root == None:\\n                return 0\\n            if root.left==None or root.right==None:\\n                return self.minDepth(root.left)+self.minDepth(root.right)+1\\n            return min(self.minDepth(root.right),self.minDepth(root.left))+1"
		},
		{
			"lc_ans_id":"36317",
			"view":"1291",
			"top":"9",
			"title":"Share my clean Java code",
			"vote":"14",
			"content":"\\n    public int minDepth(TreeNode root){\\n        if(root == null){\\n            return 0;\\n        }\\n        return helper(root);\\n    }\\n    \\n    public int helper(TreeNode root) {\\n        if(root == null){\\n            return Integer.MAX_VALUE;\\n        }\\n        if(root.left == null && root.right == null){\\n            return 1;\\n        }\\n        \\n        int depthLeft = helper(root.left);\\n        int depthRight = helper(root.right);\\n        \\n        return Math.min(depthLeft, depthRight) + 1;\\n    }"
		}
	],
	"id":"111",
	"title":"Minimum Depth of Binary Tree",
	"content":"<p>Given a binary tree, find its minimum depth.</p>\r\n\r\n<p>The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.</p>",
	"frequency":"361",
	"ac_num":"199608"
}