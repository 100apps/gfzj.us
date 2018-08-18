{
	"difficulty":"2",
	"submit_num":"96283",
	"show_id":"298",
	"leetcode_id":"298",
	"answers":[
		{
			"lc_ans_id":"74468",
			"view":"16458",
			"top":"0",
			"title":"Easy Java DFS, is there better time complexity solution?",
			"vote":"72",
			"content":"Just very intuitive depth-first search, send cur node value to the next level and compare it with the next level node.\\n\\n    public class Solution {\\n        private int max = 0;\\n        public int longestConsecutive(TreeNode root) {\\n            if(root == null) return 0;\\n            helper(root, 0, root.val);\\n            return max;\\n        }\\n        \\n        public void helper(TreeNode root, int cur, int target){\\n            if(root == null) return;\\n            if(root.val == target) cur++;\\n            else cur = 1;\\n            max = Math.max(cur, max);\\n            helper(root.left, cur, root.val + 1);\\n            helper(root.right, cur, root.val + 1);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"74467",
			"view":"8315",
			"top":"1",
			"title":"Simple Recursive DFS without global variable",
			"vote":"49",
			"content":"    public class Solution {\\n        public int longestConsecutive(TreeNode root) {\\n            return (root==null)?0:Math.max(dfs(root.left, 1, root.val), dfs(root.right, 1, root.val));\\n        }\\n        \\n        public int dfs(TreeNode root, int count, int val){\\n            if(root==null) return count;\\n            count = (root.val - val == 1)?count+1:1;\\n            int left = dfs(root.left, count, root.val);\\n            int right = dfs(root.right, count, root.val);\\n            return Math.max(Math.max(left, right), count);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"74548",
			"view":"4861",
			"top":"2",
			"title":"C++ solution in 4 lines",
			"vote":"36",
			"content":"    class Solution {\\n    public:\\n        int longestConsecutive(TreeNode* root) {\\n            return search(root, nullptr, 0);\\n        }\\n        \\n        int search(TreeNode *root, TreeNode *parent, int len) {\\n            if (!root) return len;\\n            len = (parent && root->val == parent->val + 1)?len+1:1;\\n            return max(len, max(search(root->left, root, len), search(root->right, root, len)));\\n        }\\n    };\\n\\nlen stores the longest path till current node."
		},
		{
			"lc_ans_id":"74549",
			"view":"3401",
			"top":"3",
			"title":"Don't understand what is consecutive sequence",
			"vote":"21",
			"content":"Hi,\\n\\nCan anyone help me out?\\n\\nI don't understand what does the path mean.\\n \\n\\n      2\\n        \\\\\\n         3\\n        / \\n       2    \\n      / \\n     1\\n\\nwhy 3-2-1 not a path?\\n\\n\\nTHX!"
		},
		{
			"lc_ans_id":"74513",
			"view":"3497",
			"top":"4",
			"title":"Two simple iterative solutions, BFS and DFS",
			"vote":"14",
			"content":"Iterative Breadth-First Search\\n\\n    from collections import deque\\n    def longestConsecutive(self, root):\\n        if not root:\\n            return 0\\n        ans, dq = 0, deque([[root, 1]])\\n        while dq:\\n            node, length = dq.popleft()\\n            ans = max(ans, length)\\n            for child in [node.left, node.right]:\\n                if child:\\n                    l = length + 1 if child.val == node.val + 1 else 1\\n                    dq.append([child, l])\\n        return ans\\n\\n\\n    # 54 / 54 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 180 ms\\n\\n\\n\\nIterative Depth-First Search\\n\\n    def longestConsecutive(self, root):\\n        if not root:\\n            return 0\\n        ans, stack = 0, [[root, 1]]\\n        while stack:\\n            node, length = stack.pop()\\n            ans = max(ans, length)\\n            for child in [node.left, node.right]:\\n                if child:\\n                    l = length + 1 if child.val == node.val + 1 else 1\\n                    stack.append([child, l])\\n        return ans\\n\\n\\n    # 54 / 54 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 200 ms\\n\\n\\nEvery node is attached with a property \"length\" when pushed into the queue. It is the length of longest consecutive sequence end with that node. The answer is then the max of all popped lengths. The only difference of the two solutions is the data structure. BFS using deque and DFS using stack."
		},
		{
			"lc_ans_id":"74576",
			"view":"1286",
			"top":"5",
			"title":"13 lines of Python DFS solution",
			"vote":"9",
			"content":"    def longestConsecutive(root):\\n        if not root:\\n            return 0\\n            \\n        ret = 0\\n        stack = [(root, 1)]\\n        while stack:\\n            node, cnt = stack.pop()\\n            if node.left:\\n                stack.append((node.left, cnt+1 if node.left.val == node.val + 1 else 1))\\n            if node.right:\\n                stack.append((node.right, cnt+1 if node.right.val == node.val + 1 else 1))\\n            ret = max(ret, cnt)\\n            \\n        return ret"
		},
		{
			"lc_ans_id":"74517",
			"view":"1613",
			"top":"6",
			"title":"1ms easy to understand java solution, just traverse the tree once",
			"vote":"7",
			"content":"    public int longestConsecutive(TreeNode root) {\\n       int[] ret    = new int[]{0};\\n       int   curLen = 0;\\n    \\n       helper(null, root, curLen, ret);\\n       \\n       return ret[0];\\n    }\\n    \\n    private void helper(TreeNode parent, TreeNode cur, int curLen, int[] ret){\\n        if(cur == null){\\n            return;\\n        }\\n        \\n        curLen =   parent == null || cur.val != parent.val + 1\\n                 ? 1\\n                 : curLen + 1;\\n        \\n        ret[0] = Math.max(ret[0], curLen);\\n        \\n        helper(cur, cur.left,  curLen, ret);\\n        helper(cur, cur.right, curLen, ret);\\n    }"
		},
		{
			"lc_ans_id":"74602",
			"view":"708",
			"top":"7",
			"title":"Java recursive solution",
			"vote":"5",
			"content":"Recursively call `search(TreeNode root, int length, TreeNode parent) ` to get result.\\n\\n\\n    public int longestConsecutive(TreeNode root) {\\n        return search(root, 0, null);\\n    }\\n    \\n    private int search(TreeNode root, int length, TreeNode parent) {\\n        if (root == null) { return length; }\\n        if (parent == null || parent.val + 1 != root.val) {\\n            length = 0;\\n        }\\n        length += 1;\\n        int left = search(root.left, length, root);\\n        int right = search(root.right, length, root);\\n        return Math.max(length, Math.max(left, right));\\n    }"
		},
		{
			"lc_ans_id":"74605",
			"view":"585",
			"top":"8",
			"title":"Two java recursive solution, top down and bottom up and one Iteration solution using stack",
			"vote":"5",
			"content":"1 divide and conquer bottom up \\n\\n\\n     public int longestConsecutive(TreeNode root) {\\t        \\n    \\t    if (root == null) {\\n    \\t    \\treturn 0 ;\\n    \\t    }\\n    \\t    helper (root);\\n    \\t    return max ;\\n    \\t    \\n    \\t}\\n    \\tint max = Integer.MIN_VALUE ;\\n    \\tprivate int helper (TreeNode root){\\n    \\t\\tif (root == null) {\\n    \\t\\t\\treturn 0 ;\\n    \\t\\t}\\n    \\t\\tint left = helper (root.left);\\n    \\t\\tint right = helper (root.right);\\n    \\t\\tint maxLeft = (root.left != null &&  root.left.val - root.val == 1) ? 1 + left : 1;\\n    \\t\\tint maxRight = (root.right != null &&  root.right.val - root.val == 1) ? 1 + right : 1;\\n    \\t\\tmax = Math.max(max, Math.max(maxLeft, maxRight)) ;\\n    \\t\\treturn Math.max(maxLeft, maxRight) ;\\n    \\t}\\n\\n2  top down\\n\\n    public int longestConsecutive(TreeNode root) {\\t    \\n           if (root == null) return 0 ;\\n    \\t   return helper (root,Integer.MAX_VALUE,1); \\n    \\t}\\n    \\t\\n    \\tprivate int helper (TreeNode root, int pre, int len){\\n    \\t\\tif (root == null ) {\\n    \\t\\t\\treturn len ;\\n    \\t\\t}\\t\\t\\n    \\t\\tif (root.val - pre == 1) {\\n    \\t\\t\\treturn   Math.max(helper (root.left,root.val,len + 1),  helper (root.right,root.val,len + 1)) ;\\n    \\t\\t} else {\\n    \\t\\t\\treturn Math.max(len,Math.max(helper (root.left,root.val,1),  helper (root.right,root.val,1))) ;\\n    \\t\\t}\\n    \\t}\\n\\n\\n3 I use a map and stack to keep track the max path, but a bit memory consuming \\n\\n    public int longestConsecutive(TreeNode root) {\\t        \\n    \\t    if (root == null) {\\n    \\t    \\treturn 0 ;\\n    \\t    }\\n    \\t    int max = 1 ;\\n    \\t    Stack<TreeNode> stack = new Stack<> ();\\n    \\t    HashMap<TreeNode,Integer> map = new HashMap<> ();\\n    \\t    stack.push(root) ;\\n    \\t    map.put(root, 1);\\n    \\t    while (!stack.isEmpty()) {\\n    \\t      TreeNode cur = stack.pop() ;\\n    \\t      int left = cur.left != null && cur.left.val - cur.val == 1 ? map.get(cur) + 1 : 1 ;\\n    \\t      int right = cur.right != null && cur.right.val - cur.val == 1 ? map.get(cur) + 1 : 1 ;\\n    \\t      max = Math.max(max, Math.max(left, right)) ;\\n    \\t      if (cur.right != null) {\\n    \\t    \\t  stack.push(cur.right) ;\\n    \\t    \\t  map.put(cur.right, right) ;\\n    \\t      }\\n    \\t      if(cur.left != null) {\\n    \\t    \\t  stack.push(cur.left) ;\\n    \\t    \\t  map.put(cur.left, left);\\t    \\t  \\n    \\t      }\\t      \\n    \\t    }\\t    \\n    \\t    return max ;\\t    \\n    \\t}"
		},
		{
			"lc_ans_id":"74589",
			"view":"713",
			"top":"9",
			"title":"Both iterative and recursive methods with explanations",
			"vote":"4",
			"content":"Iterative method is quite straightforward: use BFS and update `max` level by level until reaching the bottom level. One detail is that I used another queue `q2` to store the length of the sequence ending at current node. \\n\\nCode in Java:\\n \\n    public int longestConsecutive(TreeNode root) {\\n        if(root==null) return 0;\\n        Queue<TreeNode> q = new LinkedList<>();\\n        Queue<Integer> q2 = new LinkedList<>();\\n        q.add(root);\\n        q2.add(1);\\n        int max = 1;\\n        while(!q.isEmpty()) {\\n            int size = q.size();\\n            for(int i=0; i<size; i++) {\\n                TreeNode current = q.poll();\\n                int count = q2.poll();\\n                if(current.left!=null) {\\n                    q.add(current.left);\\n                    if(current.left.val == current.val+1) {\\n                        q2.add(count+1);\\n                        max = count+1 > max ? count+1 : max;\\n                    }\\n                    else\\n                        q2.add(1);\\n                }\\n                if(current.right!=null) {\\n                    q.add(current.right);\\n                    if(current.right.val == current.val+1) {\\n                        q2.add(count+1);\\n                        max = count+1 > max ? count+1 : max;\\n                    }\\n                    else\\n                        q2.add(1);\\n                }\\n            }\\n        }\\n        return max;\\n    }\\n\\n\\nFor recursive method, the key is to use a state variable `max` that stores the global maximum length of all subtrees.\\n\\nCode in Java:\\n\\n    private int max;\\n    public int longestConsecutive(TreeNode root) {\\n        if(root==null) return 0;\\n        max = 1;\\n        helper(root, 1);\\n        return max;\\n    }\\n    private void helper(TreeNode root, int maxCurrent) {\\n        if(root==null) return;\\n        if(root.left!=null) {\\n            if(root.left.val == root.val+1) {\\n                max = maxCurrent+1 > max ? maxCurrent+1 : max;\\n                helper(root.left, maxCurrent+1);\\n            }\\n            else\\n                helper(root.left, 1);\\n        }\\n        if(root.right!=null) {\\n            if(root.right.val == root.val+1) {\\n                max = maxCurrent+1 > max ? maxCurrent+1 : max;\\n                helper(root.right, maxCurrent+1);\\n            }\\n            else\\n                helper(root.right, 1);\\n        }\\n        \\n    }"
		}
	],
	"id":"298",
	"title":"Binary Tree Longest Consecutive Sequence",
	"content":"<p>\r\nGiven a binary tree, find the length of the longest consecutive sequence path.\r\n<p>\r\n<p>\r\nThe path refers to any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The longest consecutive path need to be from parent to child (cannot be the reverse).\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\n<pre>\r\n   1\r\n    \\\r\n     3\r\n    / \\\r\n   2   4\r\n        \\\r\n         5\r\n</pre>\r\nLongest consecutive sequence path is <code>3-4-5</code>, so return <code>3</code>. \r\n<pre>\r\n   2\r\n    \\\r\n     3\r\n    / \r\n   2    \r\n  / \r\n 1\r\n</pre>\r\nLongest consecutive sequence path is <code>2-3</code>,not<code>3-2-1</code>, so return <code>2</code>.\r\n\r\n</p>",
	"frequency":"232",
	"ac_num":"40047"
}