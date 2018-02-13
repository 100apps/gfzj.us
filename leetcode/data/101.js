{
	"difficulty":"1",
	"submit_num":"562156",
	"show_id":"101",
	"leetcode_id":"101",
	"answers":[
		{
			"lc_ans_id":"33054",
			"view":"47994",
			"top":"0",
			"title":"Recursive and non-recursive solutions in Java",
			"vote":"210",
			"content":"Recursive--400ms:\\n\\n    public boolean isSymmetric(TreeNode root) {\\n        return root==null || isSymmetricHelp(root.left, root.right);\\n    }\\n    \\n    private boolean isSymmetricHelp(TreeNode left, TreeNode right){\\n        if(left==null || right==null)\\n            return left==right;\\n        if(left.val!=right.val)\\n            return false;\\n        return isSymmetricHelp(left.left, right.right) && isSymmetricHelp(left.right, right.left);\\n    }\\n\\nNon-recursive(use Stack)--460ms:\\n\\n    public boolean isSymmetric(TreeNode root) {\\n        if(root==null)  return true;\\n        \\n        Stack<TreeNode> stack = new Stack<TreeNode>();\\n        TreeNode left, right;\\n        if(root.left!=null){\\n            if(root.right==null) return false;\\n            stack.push(root.left);\\n            stack.push(root.right);\\n        }\\n        else if(root.right!=null){\\n            return false;\\n        }\\n            \\n        while(!stack.empty()){\\n            if(stack.size()%2!=0)   return false;\\n            right = stack.pop();\\n            left = stack.pop();\\n            if(right.val!=left.val) return false;\\n            \\n            if(left.left!=null){\\n                if(right.right==null)   return false;\\n                stack.push(left.left);\\n                stack.push(right.right);\\n            }\\n            else if(right.right!=null){\\n                return false;\\n            }\\n                \\n            if(left.right!=null){\\n                if(right.left==null)   return false;\\n                stack.push(left.right);\\n                stack.push(right.left);\\n            }\\n            else if(right.left!=null){\\n                return false;\\n            }\\n        }\\n        \\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"33089",
			"view":"13941",
			"top":"1",
			"title":"My C++ Accepted code in 16ms with iteration solution",
			"vote":"76",
			"content":"    /**\\n     * Definition for binary tree\\n     * struct TreeNode {\\n     *     int val;\\n     *     TreeNode *left;\\n     *     TreeNode *right;\\n     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\\n     * };\\n     */\\n    class Solution {\\n    public:\\n        bool isSymmetric(TreeNode *root) {\\n            TreeNode *left, *right;\\n            if (!root)\\n                return true;\\n            \\n            queue<TreeNode*> q1, q2;\\n            q1.push(root->left);\\n            q2.push(root->right);\\n            while (!q1.empty() && !q2.empty()){\\n                left = q1.front();\\n                q1.pop();\\n                right = q2.front();\\n                q2.pop();\\n                if (NULL == left && NULL == right)\\n                    continue;\\n                if (NULL == left || NULL == right)\\n                    return false;\\n                if (left->val != right->val)\\n                    return false;\\n                q1.push(left->left);\\n                q1.push(left->right);\\n                q2.push(right->right);\\n                q2.push(right->left);\\n            }\\n            return true;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"33104",
			"view":"11054",
			"top":"2",
			"title":"1ms recursive Java Solution, easy to understand",
			"vote":"72",
			"content":"     public boolean isSymmetric(TreeNode root) {\\n        if(root==null) return true;\\n        return isMirror(root.left,root.right);\\n    }\\n    public boolean isMirror(TreeNode p, TreeNode q) {\\n        if(p==null && q==null) return true;\\n        if(p==null || q==null) return false;\\n        return (p.val==q.val) && isMirror(p.left,q.right) && isMirror(p.right,q.left);\\n    }"
		},
		{
			"lc_ans_id":"33152",
			"view":"6530",
			"top":"3",
			"title":"Short and clean java iterative solution",
			"vote":"45",
			"content":"     public boolean isSymmetric(TreeNode root) {\\n            Queue<TreeNode> q = new LinkedList<TreeNode>();\\n            if(root == null) return true;\\n            q.add(root.left);\\n            q.add(root.right);\\n            while(q.size() > 1){\\n                TreeNode left = q.poll(),\\n                         right = q.poll();\\n                if(left== null&& right == null) continue;\\n                if(left == null ^ right == null) return false;\\n                if(left.val != right.val) return false;\\n                q.add(left.left);\\n                q.add(right.right);\\n                q.add(left.right);\\n                q.add(right.left);            \\n            }\\n            return true;\\n        }"
		},
		{
			"lc_ans_id":"33056",
			"view":"7827",
			"top":"4",
			"title":"15 lines of c++ solution / 8 ms",
			"vote":"45",
			"content":"    bool isSymmetric(TreeNode *root) {\\n            if (!root) return true;\\n            return helper(root->left, root->right);\\n        }\\n        \\n        bool helper(TreeNode* p, TreeNode* q) {\\n            if (!p && !q) {\\n                return true;\\n            } else if (!p || !q) {\\n                return false;\\n            }\\n            \\n            if (p->val != q->val) {\\n                return false;\\n            }\\n            \\n            return helper(p->left,q->right) && helper(p->right, q->left); \\n        }"
		},
		{
			"lc_ans_id":"33050",
			"view":"4937",
			"top":"5",
			"title":"Recursively and iteratively solution in Python",
			"vote":"39",
			"content":"Basically, this question is recursively. Or we can say, the tree structure is recursively, so the recursively solution maybe easy to write:\\n\\nTC: O(b) SC: O(log n)\\n\\n    class Solution:\\n      def isSymmetric(self, root):\\n        if root is None:\\n          return True\\n        else:\\n          return self.isMirror(root.left, root.right)\\n\\n      def isMirror(self, left, right):\\n        if left is None and right is None:\\n          return True\\n        if left is None or right is None:\\n          return False\\n\\n        if left.val == right.val:\\n          outPair = self.isMirror(left.left, right.right)\\n          inPiar = self.isMirror(left.right, right.left)\\n          return outPair and inPiar\\n        else:\\n          return False\\n\\nThe essence of recursively is Stack, so we can use our own stack to rewrite it into iteratively:\\n\\n     class Solution2:\\n      def isSymmetric(self, root):\\n        if root is None:\\n          return True\\n\\n        stack = [[root.left, root.right]]\\n\\n        while len(stack) > 0:\\n          pair = stack.pop(0)\\n          left = pair[0]\\n          right = pair[1]\\n\\n          if left is None and right is None:\\n            continue\\n          if left is None or right is None:\\n            return False\\n          if left.val == right.val:\\n            stack.insert(0, [left.left, right.right])\\n\\n            stack.insert(0, [left.right, right.left])\\n          else:\\n            return False\\n        return True"
		},
		{
			"lc_ans_id":"33068",
			"view":"2209",
			"top":"6",
			"title":"6line AC python",
			"vote":"34",
			"content":"\\n\\n\\n        def isSymmetric(self, root):\\n            def isSym(L,R):\\n                if not L and not R: return True\\n                if L and R and L.val == R.val: \\n                    return isSym(L.left, R.right) and isSym(L.right, R.left)\\n                return False\\n            return isSym(root, root)"
		},
		{
			"lc_ans_id":"33313",
			"view":"2246",
			"top":"7",
			"title":"Slim Java solution",
			"vote":"30",
			"content":"The idea is:\\n1. level traversal.\\n2. push nodes onto stack, every 2 consecutive is a pair, and should either be both null or have equal value.\\nrepeat until stack is empty.\\n\\n    public boolean isSymmetric(TreeNode root) {\\n        if (root == null)\\n            return true;\\n        Stack<TreeNode> stack = new Stack<TreeNode>();\\n        stack.push(root.left);\\n        stack.push(root.right);\\n        while (!stack.isEmpty()) {\\n            TreeNode node1 = stack.pop();\\n            TreeNode node2 = stack.pop();\\n            if (node1 == null && node2 == null)\\n                continue;\\n            if (node1 == null || node2 == null)\\n                return false;\\n            if (node1.val != node2.val)\\n                return false;\\n            stack.push(node1.left);\\n            stack.push(node2.right);\\n            stack.push(node1.right);\\n            stack.push(node2.left);\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"33127",
			"view":"1003",
			"top":"8",
			"title":"Easy and simple using one queue iterative in java",
			"vote":"17",
			"content":"    public class Solution {\\n        public boolean isSymmetric(TreeNode root) {\\n            if(root == null) return true;\\n            Queue<TreeNode> queue = new LinkedList<TreeNode>();\\n            queue.offer(root.left);\\n            queue.offer(root.right);\\n            while(!queue.isEmpty()){\\n                TreeNode left = queue.poll();\\n                TreeNode right = queue.poll();\\n                if(left == null && right == null) continue;\\n                if(left == null || right == null) return false;\\n                if(left.val != right.val) return false;\\n                queue.offer(left.left);\\n                queue.offer(right.right);\\n                queue.offer(left.right);\\n                queue.offer(right.left);\\n                \\n            }\\n            return true;\\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"33247",
			"view":"795",
			"top":"9",
			"title":"2 lines Java solution use 1ms",
			"vote":"14",
			"content":"\\n\\n    public class Solution {\\n        public boolean isSymmetric(TreeNode root) {\\n            return isMirror(root,root);\\n        }\\n    \\n        public boolean isMirror(TreeNode a,TreeNode b){\\n            return a==null||b==null?a==b:a.val==b.val&&isMirror(a.left,b.right)&&isMirror(a.right,b.left);\\n        }\\n    }"
		}
	],
	"id":"101",
	"title":"Symmetric Tree",
	"content":"<p>Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).</p>\r\n\r\n<p>\r\nFor example, this binary tree <code>[1,2,2,3,4,4,3]</code> is symmetric:\r\n<pre>\r\n    1\r\n   / \\\r\n  2   2\r\n / \\ / \\\r\n3  4 4  3\r\n</pre>\r\n</p>\r\n<p>\r\nBut the following <code>[1,2,2,null,3,null,3]</code>  is not:<br />\r\n<pre>\r\n    1\r\n   / \\\r\n  2   2\r\n   \\   \\\r\n   3    3\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br />\r\nBonus points if you could solve it both recursively and iteratively.\r\n</p>",
	"frequency":"446",
	"ac_num":"224557"
}