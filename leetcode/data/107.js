{
	"difficulty":"1",
	"submit_num":"368241",
	"show_id":"107",
	"leetcode_id":"107",
	"answers":[
		{
			"lc_ans_id":"34981",
			"view":"34915",
			"top":"0",
			"title":"My DFS and BFS java solution",
			"vote":"117",
			"content":"DFS solution:\\n\\n    public class Solution {\\n        public List<List<Integer>> levelOrderBottom(TreeNode root) {\\n            Queue<TreeNode> queue = new LinkedList<TreeNode>();\\n            List<List<Integer>> wrapList = new LinkedList<List<Integer>>();\\n            \\n            if(root == null) return wrapList;\\n            \\n            queue.offer(root);\\n            while(!queue.isEmpty()){\\n                int levelNum = queue.size();\\n                List<Integer> subList = new LinkedList<Integer>();\\n                for(int i=0; i<levelNum; i++) {\\n                    if(queue.peek().left != null) queue.offer(queue.peek().left);\\n                    if(queue.peek().right != null) queue.offer(queue.peek().right);\\n                    subList.add(queue.poll().val);\\n                }\\n                wrapList.add(0, subList);\\n            }\\n            return wrapList;\\n        }\\n    }\\n\\nBFS solution:\\n\\n    public class Solution {\\n            public List<List<Integer>> levelOrderBottom(TreeNode root) {\\n                List<List<Integer>> wrapList = new LinkedList<List<Integer>>();\\n                levelMaker(wrapList, root, 0);\\n                return wrapList;\\n            }\\n            \\n            public void levelMaker(List<List<Integer>> list, TreeNode root, int level) {\\n                if(root == null) return;\\n                if(level >= list.size()) {\\n                    list.add(0, new LinkedList<Integer>());\\n                }\\n                levelMaker(list, root.left, level+1);\\n                levelMaker(list, root.right, level+1);\\n                list.get(list.size()-level-1).add(root.val);\\n            }\\n        }"
		},
		{
			"lc_ans_id":"34970",
			"view":"31633",
			"top":"1",
			"title":"Is there any better idea than doing regular level order traversal and reverse the result?",
			"vote":"83",
			"content":"The way I see this problem is that it is EXACTLY the same as \"Level-Order Traversal I\" except that we need to reverse the final container for output, which is trivial. Is there a better idea that fits this problem specifically?\\n\\nThe attached is my current recursive solution. In each function call, we pass in the current node and its level. If this level does not yet exist in the output container, then we should add a new empty level. Then, we add the current node to the end of the current level, and recursively call the function passing the two children of the current node at the next level. This algorithm is really a DFS, but it saves the level information for each node and produces the same result as BFS would.\\n\\n    vector<vector<int> > res;\\n\\n    void DFS(TreeNode* root, int level)\\n    {\\n        if (root == NULL) return;\\n        if (level == res.size()) // The level does not exist in output\\n        {\\n            res.push_back(vector<int>()); // Create a new level\\n        }\\n        \\n        res[level].push_back(root->val); // Add the current value to its level\\n        DFS(root->left, level+1); // Go to the next level\\n        DFS(root->right,level+1);\\n    }\\n    \\n    vector<vector<int> > levelOrderBottom(TreeNode *root) {\\n        DFS(root, 0);\\n        return vector<vector<int> > (res.rbegin(), res.rend());\\n    }"
		},
		{
			"lc_ans_id":"34978",
			"view":"7622",
			"top":"2",
			"title":"Python solutions (dfs recursively, dfs+stack, bfs+queue).",
			"vote":"40",
			"content":"        \\n    # dfs recursively\\n    def levelOrderBottom1(self, root):\\n        res = []\\n        self.dfs(root, 0, res)\\n        return res\\n    \\n    def dfs(self, root, level, res):\\n        if root:\\n            if len(res) < level + 1:\\n                res.insert(0, [])\\n            res[-(level+1)].append(root.val)\\n            self.dfs(root.left, level+1, res)\\n            self.dfs(root.right, level+1, res)\\n            \\n    # dfs + stack\\n    def levelOrderBottom2(self, root):\\n        stack = [(root, 0)]\\n        res = []\\n        while stack:\\n            node, level = stack.pop()\\n            if node:\\n                if len(res) < level+1:\\n                    res.insert(0, [])\\n                res[-(level+1)].append(node.val)\\n                stack.append((node.right, level+1))\\n                stack.append((node.left, level+1))\\n        return res\\n     \\n    # bfs + queue   \\n    def levelOrderBottom(self, root):\\n        queue, res = collections.deque([(root, 0)]), []\\n        while queue:\\n            node, level = queue.popleft()\\n            if node:\\n                if len(res) < level+1:\\n                    res.insert(0, [])\\n                res[-(level+1)].append(node.val)\\n                queue.append((node.left, level+1))\\n                queue.append((node.right, level+1))\\n        return res"
		},
		{
			"lc_ans_id":"35089",
			"view":"6772",
			"top":"3",
			"title":"Java Solution. Using Queue",
			"vote":"29",
			"content":"    public List<List<Integer>> levelOrderBottom(TreeNode root) {\\n \\n        List<List<Integer>> result = new ArrayList<List<Integer>>();\\n        if(root==null) return result;\\n        Queue<TreeNode> q = new LinkedList<>();\\n        q.add(root);\\n        while(q.size()>0){\\n            List<Integer> list = new ArrayList<>();\\n            int size = q.size();\\n            for(int i=0; i<size; i++){\\n                TreeNode node = q.poll();\\n                list.add(node.val);\\n                if(node.left!=null) q.add(node.left);\\n                if(node.right!=null) q.add(node.right);\\n            }\\n            result.add(0,list);\\n        }\\n        return result;\\n\\n    }"
		},
		{
			"lc_ans_id":"35045",
			"view":"8640",
			"top":"4",
			"title":"Simple Java solution with LinkedList.",
			"vote":"27",
			"content":"The addFirst() method of LinkedLinked save us from reverse final result.\\n\\n    public List<List<Integer>> levelOrderBottom(TreeNode root) {\\n\\t\\tLinkedList<List<Integer>> list = new LinkedList<List<Integer>>();\\n\\t\\taddLevel(list, 0, root);\\n\\t\\treturn list;\\n    }\\n\\t\\n\\tprivate void addLevel(LinkedList<List<Integer>> list, int level, TreeNode node) {\\n\\t\\tif (node == null) return;\\n\\t\\tif (list.size()-1 < level) list.addFirst(new LinkedList<Integer>());\\n\\t\\tlist.get(list.size()-1-level).add(node.val);\\n\\t\\taddLevel(list, level+1, node.left);\\n\\t\\taddLevel(list, level+1, node.right);\\n\\t}"
		},
		{
			"lc_ans_id":"34976",
			"view":"6857",
			"top":"5",
			"title":"My Neat Solution in C++",
			"vote":"26",
			"content":"    vector<vector<int> > levelOrder(TreeNode *root) {\\n    \\tvector<vector<int> > retVal;\\n\\n    \\tlevelOrder(root, retVal, 0);\\n\\n    \\treverse(retVal.begin(), retVal.end());\\n\\n    \\treturn retVal;\\n    }\\n\\n    void levelOrder(TreeNode* root, vector<vector<int> > &v, int currLevel) {\\n    \\tif (root == NULL) {\\n    \\t\\treturn;\\n    \\t}\\n\\n    \\tif (v.empty() || currLevel > (v.size() - 1)) {\\n    \\t\\tv.push_back(vector<int>());\\n    \\t}\\n\\n    \\tv[currLevel].push_back(root->val);\\n\\n    \\tlevelOrder(root->left, v, currLevel + 1);\\n    \\tlevelOrder(root->right, v, currLevel + 1);\\n    }"
		},
		{
			"lc_ans_id":"35108",
			"view":"3579",
			"top":"6",
			"title":"C++ 4ms solution!",
			"vote":"20",
			"content":"First version costs 8ms:\\n\\n    void levelOrder(vector<vector<int>> &ans, TreeNode *node, int level) {\\n        if (!node) return;\\n        if (level >= ans.size())\\n            ans.push_back({});\\n        ans[level].push_back(node->val);\\n        levelOrder(ans,node->left,level+1);\\n        levelOrder(ans,node->right,level+1);\\n    }\\n\\n    vector<vector<int>> levelOrderBottom(TreeNode* root) {\\n        vector<vector<int>> ans;\\n        levelOrder(ans,root,0);\\n        reverse(ans.begin(),ans.end());\\n        return ans;\\n    }\\n\\n\\n\\nSecond version costs 4ms:\\n\\n    int depth(TreeNode *root) {\\n        if (!root) return 0;\\n        return max(depth(root->left),depth(root->right))+1;\\n    }\\n\\n    void levelOrder(vector<vector<int>> &ans, TreeNode *node, int level) {\\n        if (!node) return;\\n        ans[level].push_back(node->val);\\n        levelOrder(ans,node->left,level-1);\\n        levelOrder(ans,node->right,level-1);\\n    }\\n\\n    vector<vector<int>> levelOrderBottom(TreeNode* root) {\\n        int d = depth(root);\\n        vector<vector<int>> ans(d,vector<int> {});\\n        levelOrder(ans,root,d-1);\\n        return ans;\\n    }"
		},
		{
			"lc_ans_id":"35106",
			"view":"1559",
			"top":"7",
			"title":"Java solution that beats 80%",
			"vote":"13",
			"content":"    public class Solution {\\n    public List<List<Integer>> levelOrderBottom(TreeNode root) {\\n        \\n        List<List<Integer>> counts = new ArrayList<List<Integer>>();\\n        \\n        visit(root, counts, 0);\\n        Collections.reverse(counts);\\n\\n        return counts;\\n    }\\n    \\n    public void visit(TreeNode node, List<List<Integer>> counts, int level){\\n        if(node == null)\\n            return;\\n        if(counts.size() < level+1)\\n            counts.add(new ArrayList<Integer>());\\n        counts.get(level).add(node.val);\\n        \\n        visit(node.left, counts, level+1);\\n        visit(node.right, counts, level+1);\\n    }\\n    }"
		},
		{
			"lc_ans_id":"35026",
			"view":"1531",
			"top":"8",
			"title":"JAVA SOLUTION WITH LINKEDLIST",
			"vote":"12",
			"content":"This solution is nearly identical to the traditional 'Level Order traversal' only difference is the DataStructure used to hold the data. Instead of Using an `ArrayList` and appending each level after the other I used a `LinkedList` and added each new level to the `head` of the `LinkedList`.\\n\\n    public class Solution {\\n        public List<List<Integer>> levelOrderBottom(TreeNode root) {\\n            if(root == null) return new LinkedList<List<Integer>>();\\n            List<List<Integer>> levels = new LinkedList<List<Integer>>();\\n            Queue<TreeNode> q = new LinkedList<TreeNode>(); \\n            q.add(root);\\n            \\n            while(!q.isEmpty()){\\n                List<Integer> list = new ArrayList<Integer>(); \\n                int size = q.size();\\n                for(int i = 0; i < size; i++){\\n                    TreeNode node = q.remove();\\n                    list.add(node.val);\\n                    if(node.left != null) q.add(node.left);\\n                    if(node.right != null) q.add(node.right);\\n                }\\n                ((LinkedList)levels).addFirst(list);\\n            }\\n            return levels;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"35162",
			"view":"1966",
			"top":"9",
			"title":"19 line C++ 8ms Solution, very easy",
			"vote":"9",
			"content":"    class Solution {\\n    protected:\\n        vector<vector<int>> ans;\\n        void dfs(TreeNode *root, int height){\\n            if (root == NULL) \\n                return;\\n            while (ans.size() <= height)\\n                ans.push_back(vector<int>());\\n            ans[height].push_back(root->val);\\n            dfs(root->left, height + 1);\\n            dfs(root->right, height + 1);\\n        }\\n\\n    public:\\n        vector<vector<int>> levelOrderBottom(TreeNode* root) {\\n           dfs(root, 0);\\n           reverse(ans.begin(), ans.end());\\n            return ans;    \\n        }\\n    };"
		}
	],
	"id":"107",
	"title":"Binary Tree Level Order Traversal II",
	"content":"<p>Given a binary tree, return the <i>bottom-up level order</i> traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven binary tree <code>[3,9,20,null,null,15,7]</code>,<br />\r\n<pre>\r\n    3\r\n   / \\\r\n  9  20\r\n    /  \\\r\n   15   7\r\n</pre>\r\n</p>\r\n<p>\r\nreturn its bottom-up level order traversal as:<br />\r\n<pre>\r\n[\r\n  [15,7],\r\n  [9,20],\r\n  [3]\r\n]\r\n</pre>\r\n</p>",
	"frequency":"338",
	"ac_num":"152985"
}