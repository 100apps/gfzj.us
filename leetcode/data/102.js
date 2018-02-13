{
	"difficulty":"2",
	"submit_num":"515074",
	"show_id":"102",
	"leetcode_id":"102",
	"answers":[
		{
			"lc_ans_id":"33450",
			"view":"39074",
			"top":"0",
			"title":"Java solution with a queue used",
			"vote":"170",
			"content":"    public class Solution {\\n        public List<List<Integer>> levelOrder(TreeNode root) {\\n            Queue<TreeNode> queue = new LinkedList<TreeNode>();\\n            List<List<Integer>> wrapList = new LinkedList<List<Integer>>();\\n            \\n            if(root == null) return wrapList;\\n            \\n            queue.offer(root);\\n            while(!queue.isEmpty()){\\n                int levelNum = queue.size();\\n                List<Integer> subList = new LinkedList<Integer>();\\n                for(int i=0; i<levelNum; i++) {\\n                    if(queue.peek().left != null) queue.offer(queue.peek().left);\\n                    if(queue.peek().right != null) queue.offer(queue.peek().right);\\n                    subList.add(queue.poll().val);\\n                }\\n                wrapList.add(subList);\\n            }\\n            return wrapList;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"33468",
			"view":"17436",
			"top":"1",
			"title":"One of C++ solutions (preorder)",
			"vote":"104",
			"content":"    vector<vector<int>> ret;\\n    \\n    void buildVector(TreeNode *root, int depth)\\n    {\\n        if(root == NULL) return;\\n        if(ret.size() == depth)\\n            ret.push_back(vector<int>());\\n        \\n        ret[depth].push_back(root->val);\\n        buildVector(root->left, depth + 1);\\n        buildVector(root->right, depth + 1);\\n    }\\n\\n    vector<vector<int> > levelOrder(TreeNode *root) {\\n        buildVector(root, 0);\\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"33443",
			"view":"11104",
			"top":"2",
			"title":"C++ solution using only one queue / use a marker NULL",
			"vote":"88",
			"content":"    class Solution {\\n    public:\\n        vector<vector<int> > levelOrder(TreeNode *root) {\\n            vector<vector<int> >  result;\\n            if (!root) return result;\\n            queue<TreeNode*> q;\\n            q.push(root);\\n            q.push(NULL);\\n            vector<int> cur_vec;\\n            while(!q.empty()) {\\n                TreeNode* t = q.front();\\n                q.pop();\\n                if (t==NULL) {\\n                    result.push_back(cur_vec);\\n                    cur_vec.resize(0);\\n                    if (q.size() > 0) {\\n                        q.push(NULL);\\n                    }\\n                } else {\\n                    cur_vec.push_back(t->val);\\n                    if (t->left) q.push(t->left);\\n                    if (t->right) q.push(t->right);\\n                }\\n            }\\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"33445",
			"view":"17139",
			"top":"3",
			"title":"Java Solution using DFS",
			"vote":"85",
			"content":"Nothing special. Just wanna provide a different way from BFS.\\n\\n    public List<List<Integer>> levelOrder(TreeNode root) {\\n            List<List<Integer>> res = new ArrayList<List<Integer>>();\\n            levelHelper(res, root, 0);\\n            return res;\\n        }\\n        \\n        public void levelHelper(List<List<Integer>> res, TreeNode root, int height) {\\n            if (root == null) return;\\n            if (height >= res.size()) {\\n                res.add(new LinkedList<Integer>());\\n            }\\n            res.get(height).add(root.val);\\n            levelHelper(res, root.left, height+1);\\n            levelHelper(res, root.right, height+1);\\n        }"
		},
		{
			"lc_ans_id":"33464",
			"view":"9543",
			"top":"4",
			"title":"5-6 lines fast python solution (48 ms)",
			"vote":"48",
			"content":"`level` is a list of the nodes in the current level. Keep appending a list of the values of these nodes to `ans` and then updating `level` with all the nodes in the next level (kids) until it reaches an empty level. Python's list comprehension makes it easier to deal with many conditions in a concise manner. \\n\\n<br>\\nSolution 1, (6 lines)\\n\\n    def levelOrder(self, root):\\n        ans, level = [], [root]\\n        while root and level:\\n            ans.append([node.val for node in level])\\n            LRpair = [(node.left, node.right) for node in level]\\n            level = [leaf for LR in LRpair for leaf in LR if leaf]\\n        return ans\\n<br>\\nSolution 2, (5 lines), same idea but use only one list comprehension in while loop to get the next level\\n\\n    def levelOrder(self, root):\\n        ans, level = [], [root]\\n        while root and level:\\n            ans.append([node.val for node in level])            \\n            level = [kid for n in level for kid in (n.left, n.right) if kid]\\n        return ans\\n\\n<br>\\nSolution 3 (10 lines), just an expansion of solution 1&2 for better understanding.\\n\\n    def levelOrder(self, root):\\n        if not root:\\n            return []\\n        ans, level = [], [root]\\n        while level:\\n            ans.append([node.val for node in level])\\n            temp = []\\n            for node in level:\\n                temp.extend([node.left, node.right])\\n            level = [leaf for leaf in temp if leaf]\\n        return ans"
		},
		{
			"lc_ans_id":"33749",
			"view":"3558",
			"top":"5",
			"title":"Share my clean and easy java solution",
			"vote":"22",
			"content":"        public class Solution {\\n        public List<List<Integer>> levelOrder(TreeNode root) {\\n           List<List<Integer>> result = new ArrayList<List<Integer>>();\\n           \\n           if(root == null){\\n              return result;\\n           }\\n           \\n           Queue<TreeNode> queue = new LinkedList<TreeNode>();\\n           queue.offer(root);\\n           \\n           int curL = 0;\\n           while(!queue.isEmpty()){\\n               List<Integer> levelRs = new ArrayList<Integer>(); \\n               curL = queue.size();\\n               for(int i=0;i<curL;i++){\\n                   TreeNode peek = queue.poll();\\n                   levelRs.add(peek.val);\\n                   if(peek.left!=null){\\n                       queue.offer(peek.left);\\n                   }\\n                   if(peek.right!=null){\\n                       queue.offer(peek.right);\\n                   }\\n               }\\n               result.add(levelRs);\\n           }\\n           \\n           return result;\\n        }  \\n    }"
		},
		{
			"lc_ans_id":"33709",
			"view":"3094",
			"top":"6",
			"title":"Short 8ms C++ solution with queue",
			"vote":"19",
			"content":"    class Solution {\\n    public:\\n        vector<vector<int>> levelOrder(TreeNode* root) {\\n            if (!root) { return {}; }\\n            vector<int> row;\\n            vector<vector<int> > result;\\n            queue<TreeNode*> q;\\n            q.push(root);\\n            int count = 1;\\n    \\n                while (!q.empty()) {\\n                if (q.front()->left) { q.push(q.front()->left); }\\n                if (q.front()->right) { q.push(q.front()->right); }\\n                row.push_back(q.front()->val), q.pop();\\n                if (--count == 0) {\\n                    result.emplace_back(row), row.clear();\\n                    count = q.size();\\n                }\\n            }\\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"33562",
			"view":"2305",
			"top":"7",
			"title":"Java 1ms DFS recursive solution and 2ms BFS iterative solution",
			"vote":"15",
			"content":"DFS recursive:\\n\\n    public List<List<Integer>> levelOrder(TreeNode root) {\\n    \\t\\tList<List<Integer>> res = new ArrayList<>();\\n    \\t\\tif (root == null)\\n    \\t\\t\\treturn res;\\n    \\t\\tlevelOrderHelper(res, root, 0);\\n    \\t\\treturn res;\\n    \\t}\\n    \\t\\n    \\tpublic void levelOrderHelper(List<List<Integer>> res, TreeNode root, int level) {\\n    \\t\\tif (root == null)\\n    \\t\\t\\treturn;\\n    \\t\\tList<Integer> curr;\\n    \\t\\tif (level >= res.size()) {\\n    \\t\\t\\tcurr = new ArrayList<>();\\n    \\t\\t\\tcurr.add(root.val);\\n    \\t\\t\\tres.add(curr);\\n    \\t\\t} else {\\n    \\t\\t\\tcurr = res.get(level); \\n    \\t\\t\\tcurr.add(root.val); \\n    \\t\\t\\t//res.add(curr); // No need to add the curr into the res, because the res.get(index) method does not remove the index element\\n    \\t\\t}\\n    \\t\\tlevelOrderHelper(res, root.left, level + 1);\\n    \\t\\tlevelOrderHelper(res, root.right, level + 1);\\n    \\t}\\n\\nBFS iterative:\\n\\n    public List<List<Integer>> levelOrder(TreeNode root) {\\n    \\t\\tList<List<Integer>> res = new ArrayList<>();\\n    \\t\\tif (root == null)\\n    \\t\\t\\treturn res;\\n    \\t\\tQueue<TreeNode> q = new LinkedList<>();\\n    \\t\\tq.add(root);\\n    \\t\\twhile(!q.isEmpty()) {\\n    \\t\\t\\tint levelSize = q.size();\\n    \\t\\t\\tList<Integer> currLevel = new ArrayList<>();\\n    \\t\\t\\tfor(int i = 0; i < levelSize; i++) {\\n    \\t\\t\\t\\tTreeNode currNode = q.poll();\\n    \\t\\t\\t\\tcurrLevel.add(currNode.val);\\n    \\t\\t\\t\\tif (currNode.left != null)\\n    \\t\\t\\t\\t\\tq.add(currNode.left);\\n    \\t\\t\\t\\tif (currNode.right != null)\\n    \\t\\t\\t\\t\\tq.add(currNode.right);\\n    \\t\\t\\t}\\n    \\t\\t\\tres.add(currLevel);\\n    \\t\\t}\\n    \\t\\treturn res;\\n    \\t}"
		},
		{
			"lc_ans_id":"33559",
			"view":"2439",
			"top":"8",
			"title":"My 1ms Java solution",
			"vote":"12",
			"content":"    public class Solution {\\n    public List<List<Integer>> levelOrder(TreeNode root) {\\n        List<List<Integer>> ll = new ArrayList<>();\\n        if(root == null)\\n            return ll;\\n        traversal(ll, root, 1);\\n        return ll;\\n    }\\n    public void traversal(List<List<Integer>> ll, TreeNode node, int depth){\\n        if(node == null)\\n            return;\\n        if(ll.size() == depth - 1) {\\n            List<Integer> l = new ArrayList<>();\\n            l.add(node.val);\\n            ll.add(l);\\n        }\\n        else if(ll.size() >= depth) {\\n            List<Integer> li = ll.get(depth - 1);\\n            li.add(node.val);\\n        }\\n        traversal(ll, node.left, depth + 1);\\n        traversal(ll, node.right, depth + 1);\\n    }\\n}"
		},
		{
			"lc_ans_id":"33693",
			"view":"1018",
			"top":"9",
			"title":"Java Clean and Concise using a Queue",
			"vote":"10",
			"content":"    public List<List<Integer>> levelOrder(TreeNode root) {\\n        List<List<Integer>> result = new ArrayList<List<Integer>>();\\n        if(root==null) return result;\\n        Queue<TreeNode> q = new LinkedList<>();\\n        q.add(root);\\n        while(q.size()>0){\\n            List<Integer> list = new ArrayList<>();\\n            int size = q.size();\\n            for(int i=0; i<size; i++){\\n                TreeNode node = q.poll();\\n                list.add(node.val);\\n                if(node.left!=null) q.add(node.left);\\n                if(node.right!=null) q.add(node.right);\\n            }\\n            result.add(list);\\n        }\\n        return result;\\n    }"
		}
	],
	"id":"102",
	"title":"Binary Tree Level Order Traversal",
	"content":"<p>Given a binary tree, return the <i>level order</i> traversal of its nodes' values. (ie, from left to right, level by level).</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven binary tree <code>[3,9,20,null,null,15,7]</code>,<br />\r\n<pre>\r\n    3\r\n   / \\\r\n  9  20\r\n    /  \\\r\n   15   7\r\n</pre>\r\n</p>\r\n<p>\r\nreturn its level order traversal as:<br />\r\n<pre>\r\n[\r\n  [3],\r\n  [9,20],\r\n  [15,7]\r\n]\r\n</pre>\r\n</p>",
	"frequency":"413",
	"ac_num":"214734"
}