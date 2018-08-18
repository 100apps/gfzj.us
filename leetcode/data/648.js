{
	"difficulty":"1",
	"submit_num":"41648",
	"show_id":"671",
	"leetcode_id":"671",
	"answers":[
		{
			"lc_ans_id":"107159",
			"view":"5469",
			"top":"0",
			"title":"C++, DFS recursion",
			"vote":"18",
			"content":"This question is very similar to searching for minimum value in the Binary Tree. \\nThe only requirement is that this value must be different from the root value, k. \\n```\\nIf the root value of a subtree == k, \\n         keep searching its children.\\nelse, \\n         return the root value because it is the minimum of current subtree.\\n```\\n```\\nclass Solution {\\npublic:\\n    int findSecondMinimumValue(TreeNode* root) {\\n        if (!root) return -1;\\n        int ans = minval(root, root->val);\\n        return ans;\\n    }\\nprivate:\\n    int minval(TreeNode* p, int first) {\\n        if (p == nullptr) return -1;\\n        if (p->val != first) return p->val;\\n        int left = minval(p->left, first), right = minval(p->right, first);\\n        // if all nodes of a subtree = root->val, \\n        // there is no second minimum value, return -1\\n        if (left == -1) return right;\\n        if (right == -1) return left;\\n        return min(left, right);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"107158",
			"view":"3425",
			"top":"1",
			"title":"Java divide and conquer solution",
			"vote":"8",
			"content":"for left and right sub-node, if their value is the same with the parent node value, need to using recursion to find the next candidate, otherwise use their node value as the candidate.\\n```  \\npublic int findSecondMinimumValue(TreeNode root) {\\n    if (root == null) {\\n        return -1;\\n    }\\n    if (root.left == null && root.right == null) {\\n        return -1;\\n    }\\n    \\n    int left = root.left.val;\\n    int right = root.right.val;\\n    \\n    // if value same as root value, need to find the next candidate\\n    if (root.left.val == root.val) {\\n        left = findSecondMinimumValue(root.left);\\n    }\\n    if (root.right.val == root.val) {\\n        right = findSecondMinimumValue(root.right);\\n    }\\n    \\n    if (left != -1 && right != -1) {\\n        return Math.min(left, right);\\n    } else if (left != -1) {\\n        return left;\\n    } else {\\n        return right;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107164",
			"view":"4565",
			"top":"2",
			"title":"Very simple Java solution",
			"vote":"5",
			"content":"```\\npublic int findSecondMinimumValue(TreeNode root) {\\n            if (root == null) {\\n                return -1;\\n            }\\n            Set<Integer> set = new TreeSet<>();\\n            dfs(root, set);\\n            Iterator<Integer> iterator = set.iterator();\\n            int count = 0;\\n            while (iterator.hasNext()) {\\n                count++;\\n                int result = iterator.next();\\n                if (count == 2) {\\n                    return result;\\n                }\\n            }\\n            return -1;\\n        }\\n\\n        private void dfs(TreeNode root, Set<Integer> set) {\\n            if (root == null) {\\n                return;\\n            }\\n            set.add(root.val);\\n            dfs(root.left, set);\\n            dfs(root.right, set);\\n            return;\\n        }\\n```\\n\\nAlso viewable [here](https://github.com/fishercoder1534/Leetcode/blob/master/src/main/java/com/fishercoder/solutions/_671.java) on Github."
		},
		{
			"lc_ans_id":"107165",
			"view":"1738",
			"top":"3",
			"title":"Python Extremely Easy To Understand (Beats 91%)",
			"vote":"5",
			"content":"Based on the special property of the tree, we can guarantee that the root node is the smallest node in the tree. We just have to recursively traverse the tree and find a node that is bigger than the root node but smaller than any existing node we have come across.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def findSecondMinimumValue(self, root):\\n        res = [float('inf')]\\n        def traverse(node):\\n            if not node:\\n                return\\n            if root.val < node.val < res[0]:\\n                res[0] = node.val\\n            traverse(node.left)\\n            traverse(node.right)\\n        traverse(root)\\n        return -1 if res[0] == float('inf') else res[0]\\n```"
		},
		{
			"lc_ans_id":"107163",
			"view":"2551",
			"top":"4",
			"title":"BFS Acc Solution (Java and C# code)",
			"vote":"4",
			"content":"Java:\\n```\\npublic int findSecondMinimumValue(TreeNode root) \\n{\\n    int rootVal = root.val;\\n    int secondSmall =Integer.MAX_VALUE;\\n    boolean diffFound = false;\\n    Queue<TreeNode> Q= new LinkedList<TreeNode>();\\n    Q.add(root);\\n\\n    while(!Q.isEmpty())\\n    {\\n        TreeNode curr=Q.poll();\\n        if(curr.val!=rootVal && curr.val < secondSmall)\\n        {\\n            secondSmall=curr.val;\\n            diffFound=true;\\n        }\\n        if(curr.left!=null)\\n        {\\n            Q.add(curr.left);\\n            Q.add(curr.right);\\n        }\\n    }\\n\\n    return (secondSmall == Integer.MAX_VALUE && !diffFound) ? -1 : secondSmall;\\n} \\n```\\n\\nC#:\\n```\\n    public int FindSecondMinimumValue(TreeNode root)\\n    {\\n        int rootVal = root.val;\\n        int secondSmall = int.MaxValue;\\n        bool diffFound = false;\\n        Queue<TreeNode> Q = new Queue<TreeNode>();\\n        Q.Enqueue(root);\\n\\n        while (Q.Any()) //while Q is not empty\\n        {\\n            TreeNode curr = Q.Dequeue();\\n            if (curr.val != rootVal && curr.val <= secondSmall)\\n            {\\n                secondSmall = curr.val;\\n                diffFound = true;\\n            }\\n            if (curr.left != null)\\n            {\\n                Q.Enqueue(curr.left);\\n                Q.Enqueue(curr.right);\\n            }\\n        }\\n        return (secondSmall == int.MaxValue && !diffFound) ? -1 : secondSmall;\\n    }\\n```"
		},
		{
			"lc_ans_id":"107203",
			"view":"192",
			"top":"5",
			"title":"Easy like finding second minimum element in an array",
			"vote":"2",
			"content":"**public int findSecondMinimumValue(TreeNode root) {\\n        int min=Integer.MAX_VALUE,min2=Integer.MAX_VALUE;\\n        Queue<TreeNode> q = new LinkedList<>();\\n        q.add(root);\\n        while(!q.isEmpty()){\\n            TreeNode temp = q.remove();\\n            if(min>temp.val){\\n                min2=min;\\n                min=temp.val;\\n            } else if(temp.val!=min && min2>temp.val){\\n                min2 = temp.val;\\n            }\\n            if(temp.left!=null){\\n                q.add(temp.left);\\n            }\\n            if(temp.right!=null){\\n                q.add(temp.right);\\n            }\\n        }\\n        if(min2==Integer.MAX_VALUE){\\n            min2=-1;\\n        }\\n        return min2;\\n    }**\\n\\nUse queue to traverse through tree and find the second minimum element as you would do in an array. This way is bfs as you move level wise."
		},
		{
			"lc_ans_id":"107228",
			"view":"595",
			"top":"6",
			"title":"Python, Straightforward with Explanation",
			"vote":"2",
			"content":"Say the value of the root is `min1`.  If some node's value is larger, it might be the answer, but every descendant node will be at least as big, so we don't need to check them.\\n\\n```python\\ndef findSecondMinimumValue(self, root):\\n    self.ans = float('inf')\\n    min1 = root.val\\n\\n    def dfs(node):\\n        if node:\\n            if min1 < node.val < self.ans:\\n                self.ans = node.val\\n            elif node.val == min1:\\n                dfs(node.left)\\n                dfs(node.right)\\n\\n    dfs(root)\\n    return self.ans if self.ans < float('inf') else -1\\n```"
		},
		{
			"lc_ans_id":"107189",
			"view":"452",
			"top":"7",
			"title":"Java DFS, no Set",
			"vote":"2",
			"content":"Hi, Everyone:\\nI just want to share my solution here:\\n```\\nclass Solution {\\n    private Integer m1=null;\\n    private Integer m2=null;\\n    \\n    private void helper(TreeNode root){\\n        if(root==null)\\n            return;\\n        if( (m2==null && root.val>m1.intValue()) || (m2!=null && root.val>m1.intValue() && root.val<m2) )\\n            m2 = root.val;\\n        \\n        helper(root.left);\\n        helper(root.right);\\n    }\\n    \\n    public int findSecondMinimumValue(TreeNode root) {\\n        if(root==null)\\n            return -1;\\n        \\n        m1 = root.val;\\n        helper(root);\\n        if(m2==null)\\n            return -1;\\n        return m2.intValue();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107233",
			"view":"139",
			"top":"8",
			"title":"Java 4 lines",
			"vote":"1",
			"content":"```\\npublic int findSecondMinimumValue(TreeNode root) {\\n        if(root.left == null) return -1;\\n        \\n        int l = root.left.val == root.val ? findSecondMinimumValue(root.left) : root.left.val;\\n        int r = root.right.val == root.val ? findSecondMinimumValue(root.right) : root.right.val;\\n        \\n        return l == -1 || r == -1 ? Math.max(l, r) : Math.min(l, r);\\n    }\\n```"
		},
		{
			"lc_ans_id":"107235",
			"view":"74",
			"top":"9",
			"title":"C# DFS solution",
			"vote":"1",
			"content":"```\\n    public int FindSecondMinimumValue(TreeNode root) {\\n        int[] liaValue = new int[] { root.val, -1};\\n        helper( root, liaValue );\\n        return liaValue[1];\\n    }\\n    \\n    private void helper( TreeNode root, int[] piaValue ) {\\n        if ( root != null && ( piaValue[1] == -1 || root.val < piaValue[1]))  {\\n           if ( root.val != piaValue[0] ) \\n               piaValue[1] = root.val;\\n            \\n            helper( root.left, piaValue );\\n            helper( root.right, piaValue );\\n    \\n        }\\n    }\\n```"
		}
	],
	"id":"648",
	"title":"Second Minimum Node In a Binary Tree",
	"content":"<p>\r\nGiven a non-empty special binary tree consisting of nodes with the non-negative value, where each node in this tree has exactly <code>two</code> or <code>zero</code> sub-node. If the node has two sub-nodes, then this node's value is the smaller value among its two sub-nodes. \r\n</p>\r\n\r\n<p>\r\nGiven such a binary tree, you need to output the <b>second minimum</b> value in the set made of all the nodes' value in the whole tree. \r\n</p>\r\n\r\n<p>\r\nIf no such second minimum value exists, output -1 instead.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n    2\r\n   / \\\r\n  2   5\r\n     / \\\r\n    5   7\r\n\r\n<b>Output:</b> 5\r\n<b>Explanation:</b> The smallest value is 2, the second smallest value is 5.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n    2\r\n   / \\\r\n  2   2\r\n\r\n<b>Output:</b> -1\r\n<b>Explanation:</b> The smallest value is 2, but there isn't any second smallest value.\r\n</pre>\r\n</p>",
	"frequency":"152",
	"ac_num":"17487"
}