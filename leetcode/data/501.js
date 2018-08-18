{
	"difficulty":"2",
	"submit_num":"58923",
	"show_id":"515",
	"leetcode_id":"515",
	"answers":[
		{
			"lc_ans_id":"98971",
			"view":"10540",
			"top":"0",
			"title":"9ms JAVA DFS solution",
			"vote":"37",
			"content":"**Just a simple pre-order traverse idea. Use depth to expand result list size and put the max value in the appropriate position.**\\n\\n```\\npublic class Solution {\\n    public List<Integer> largestValues(TreeNode root) {\\n        List<Integer> res = new ArrayList<Integer>();\\n        helper(root, res, 0);\\n        return res;\\n    }\\n    private void helper(TreeNode root, List<Integer> res, int d){\\n        if(root == null){\\n            return;\\n        }\\n       //expand list size\\n        if(d == res.size()){\\n            res.add(root.val);\\n        }\\n        else{\\n        //or set value\\n            res.set(d, Math.max(res.get(d), root.val));\\n        }\\n        helper(root.left, res, d+1);\\n        helper(root.right, res, d+1);\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"99000",
			"view":"4814",
			"top":"1",
			"title":"Python BFS",
			"vote":"24",
			"content":"    def findValueMostElement(self, root):\\n        maxes = []\\n        row = [root]\\n        while any(row):\\n            maxes.append(max(node.val for node in row))\\n            row = [kid for node in row for kid in (node.left, node.right) if kid]\\n        return maxes"
		},
		{
			"lc_ans_id":"98976",
			"view":"6016",
			"top":"2",
			"title":"Java BFS",
			"vote":"12",
			"content":"```\\n    public int[] findValueMostElement(TreeNode root) {\\n        Queue<TreeNode> queue = new LinkedList<TreeNode>();\\n        List<Integer> res = new ArrayList<Integer>();\\n        queue.add(root);\\n        int queueSize = root == null ? 0 : 1;\\n        while (queueSize > 0) {\\n            int largestElement = Integer.MIN_VALUE;\\n            for (int i=0;i<queueSize;i++) {\\n                TreeNode cur = queue.poll();\\n                largestElement = Math.max(cur.val, largestElement);\\n                if (cur.left != null) queue.add(cur.left);\\n                if (cur.right != null) queue.add(cur.right);\\n            }\\n            res.add(largestElement);\\n            queueSize = queue.size();\\n        }\\n        int[] resArray = new int[res.size()];\\n        for (int i=0;i<res.size();i++) resArray[i] = res.get(i);\\n        return resArray;\\n    }\\n```"
		},
		{
			"lc_ans_id":"99045",
			"view":"1141",
			"top":"3",
			"title":"1-liner Python, Divide and conquer",
			"vote":"10",
			"content":"Do it for the left and right subtree, then combine their results by taking the maximum of left and right for each level (and prepend the root's value).\\n\\nFirst a more readable version:\\n\\n    def largestValues(self, root):\\n        if not root:\\n            return []\\n        left = self.largestValues(root.left)\\n        right = self.largestValues(root.right)\\n        return [root.val] + map(max, left, right)\\n\\nAnd here's the 1-liner:\\n\\n    def largestValues(self, root):\\n        return [root.val] + map(max, *map(self.largestValues, (root.left, root.right))) if root else []\\n\\nEdit: In case you're interested in complexities, there's a little discussion about it [here](https://discuss.leetcode.com/topic/31162/mergesort-solution/37)."
		},
		{
			"lc_ans_id":"99035",
			"view":"3067",
			"top":"4",
			"title":"C++ a different approach (12ms beats 100%)",
			"vote":"8",
			"content":"```\\nclass Solution {\\n    vector<int> solution;\\npublic:\\n    void helper(TreeNode* node, int cl) {\\n        if (node == NULL) {\\n            return;\\n        }\\n        if (solution.size() < cl + 1) {\\n            solution.push_back(node->val);\\n        } else {\\n            if (solution[cl] < node->val) {\\n                solution[cl] = node->val;\\n            }\\n        }\\n        helper(node->left, cl+1);\\n        helper(node->right, cl+1);\\n    }\\n    //vector<int> largestValues(TreeNode* root) {\\n    vector<int> findValueMostElement(TreeNode* root) {\\n        if(root == NULL) {\\n            return solution;\\n        }\\n        \\n        helper(root, 0);\\n        return solution;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99026",
			"view":"2768",
			"top":"5",
			"title":"Verbose Java Solution, Binary tree level order traversal, again.",
			"vote":"6",
			"content":"Alright, two binary tree level order traversal problems in one contest. This time, mission is to find the ```max``` of each level...\\n\\n```\\npublic class Solution {\\n    public int[] findValueMostElement(TreeNode root) {\\n        List<Integer> res = new ArrayList<>();\\n        if (root == null) return new int[0];\\n        \\n        Queue<TreeNode> queue = new LinkedList<>();\\n        queue.add(root);\\n        \\n        while (!queue.isEmpty()) {\\n            int size = queue.size();\\n            int max = Integer.MIN_VALUE;\\n            for (int i = 0; i < size; i++) {\\n                TreeNode node = queue.poll();\\n                max = Math.max(max, node.val);\\n                if (node.left != null) queue.add(node.left);\\n                if (node.right != null) queue.add(node.right);\\n            }\\n            res.add(max);\\n        }\\n        \\n        int[] result = new int[res.size()];\\n        for (int i = 0; i < res.size(); i++) {\\n            result[i] = res.get(i);\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98977",
			"view":"582",
			"top":"6",
			"title":"C++ Simple Solution, Concise Code, Morris Traversal",
			"vote":"4",
			"content":"Recursion\\nO(n) space\\nO(n) time\\n```\\nclass Solution {\\n    void dfs(TreeNode* cur, vector<int>& res, int height) {\\n        if (!cur)\\n            return;\\n        if (height >= res.size())\\n            res.push_back(cur->val);\\n        else\\n            res[height] = max(res[height], cur->val);\\n        dfs(cur->left, res, height + 1);\\n        dfs(cur->right, res, height + 1);\\n    }\\npublic:\\n    vector<int> largestValues(TreeNode* root) {\\n        vector<int> res;\\n        int height = 0;\\n        dfs(root, res, height);\\n        return res;\\n    }\\n};\\n```\\n\\nMorris Traversal\\nO(1) space\\nO(n) time\\n[Morris Traversal](http://yongblog.us/2017/01/28/Morris-Traversal/)\\n[Get Height by Morris Traversal](http://yongblog.us/2017/02/06/Get-Height-of-Binary-Tree-by-MorrisTraversal/)\\n```\\nclass Solution {\\npublic:\\n    vector<int> largestValues(TreeNode* root) {\\n        vector<int> res;\\n        TreeNode* cur = root, *prev = NULL;\\n        int deep = 0;\\n        while (cur) {\\n            if (cur->left == NULL) {\\n                //\\n                if (deep >= res.size())\\n                    res.push_back(cur->val);\\n                else\\n                    res[deep] = max(res[deep], cur->val);\\n                cur = cur->right;\\n                deep++;\\n            } else {\\n                prev = cur->left;\\n                int move = 1;\\n                while (prev->right && prev->right != cur) {\\n                    prev = prev->right;\\n                    move++;\\n                }\\n                if (prev->right == NULL) {\\n                    if (deep >= res.size())\\n                        res.push_back(cur->val);\\n                    prev->right = cur;\\n                    cur = cur->left;\\n                    deep++;\\n                } else {\\n                    // back to parent node, remove connection\\n                    prev->right = NULL;\\n                    deep -= move + 1;\\n                    //\\n                    if (deep >= res.size())\\n                        res.push_back(cur->val);\\n                    else\\n                        res[deep] = max(res[deep], cur->val);\\n                    cur = cur->right;\\n                    deep++;\\n                }\\n            }\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99018",
			"view":"493",
			"top":"7",
			"title":"Python BFS & DFS",
			"vote":"4",
			"content":"    class Solution(object):\\n        def largestValues(self, root):\\n            ans = []\\n            if root is None:\\n                return ans\\n            queue  = [root]\\n            while queue:\\n                ans.append(max(x.val for x in queue))\\n                new_queue = []\\n                for node in queue:\\n                    if node.left:\\n                        new_queue.append(node.left)\\n                    if node.right:\\n                        new_queue.append(node.right)\\n                queue = new_queue\\n            return ans\\n\\n    class Solution(object):\\n        def largestValues(self, root):\\n            self.ans = []\\n            self.helper(root, 0)\\n            return self.ans\\n        \\n        def helper(self, node, level):\\n            if not node:\\n                return\\n            if len(self.ans) == level:\\n                self.ans.append(node.val)\\n            else:\\n                self.ans[level] = max(self.ans[level], node.val)\\n            self.helper(node.left, level+1)\\n            self.helper(node.right, level+1)"
		},
		{
			"lc_ans_id":"99006",
			"view":"233",
			"top":"8",
			"title":"[C++] Clean Code - DFS : PreOrder & PostOrder",
			"vote":"3",
			"content":"**PreOrder**\\n```\\nclass Solution {\\npublic:\\n    vector<int> largestValues(TreeNode* root) {\\n        vector<int> maxs;\\n        find(root, 0, maxs);\\n        return maxs;\\n    }\\n\\nprivate:\\n    void find(TreeNode* node, int row, vector<int>& maxs) {\\n        if (!node) {\\n            return;\\n        }\\n\\n        if (row >= maxs.size()) {\\n            maxs.push_back(node->val);\\n        }\\n        else {\\n            maxs[row] = max(maxs[row], node->val);\\n        }\\n\\n        find(node->left, row + 1, maxs);\\n        find(node->right, row + 1, maxs);\\n    }\\n};\\n```\\n\\n**Post Order**\\nIn preorder solution the vector have been constantly resized, and each time add 1 because we don't know how deep the tree is. If change to post order, we can resize the vector only at leaf node, this should improve the performance.\\n```\\nclass Solution {\\npublic:\\n    vector<int> largestValues(TreeNode* root) {\\n        vector<int> res;\\n        dfs(root, 1, res);\\n        return res;\\n    }\\n\\nprivate:\\n    void dfs(TreeNode* node, int depth, vector<int>& res) {\\n        if (!node) {\\n            return;\\n        }\\n        dfs(node->left, depth + 1, res);\\n        dfs(node->right, depth + 1, res);\\n        if (depth > res.size()) {\\n            res.resize(depth, INT_MIN);\\n        }\\n        res[depth - 1] = max(res[depth - 1], node->val);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99098",
			"view":"800",
			"top":"9",
			"title":"Standard travel by level - Java BFS",
			"vote":"3",
			"content":"Use a queue to travel the tree level by level. \\n```\\npublic class Solution {\\n    public int[] findValueMostElement(TreeNode root) {\\n        if(root==null) return new int[0];\\n        List<Integer> res = new LinkedList<>();\\n        Queue<TreeNode> q = new LinkedList<>();\\n        q.add(root);\\n        while(!q.isEmpty()){\\n            int max = q.peek().val;\\n            int size = q.size();\\n            for(int i = 0; i<size; i++){\\n                TreeNode cur = q.poll();\\n                max = Math.max(max, cur.val);\\n                if(cur.left!=null) q.add(cur.left);\\n                if(cur.right!=null) q.add(cur.right);\\n            }\\n            res.add(max);\\n        }\\n        return res.stream().mapToInt(k->k).toArray();\\n    }\\n}\\n```"
		}
	],
	"id":"501",
	"title":"Find Largest Value in Each Tree Row",
	"content":"<p>You need to find the largest value in each row of a binary tree.</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n\r\n          1\r\n         / \\\r\n        3   2\r\n       / \\   \\  \r\n      5   3   9 \r\n\r\n<b>Output:</b> [1, 3, 9]\r\n</pre>\r\n</p>\r\n",
	"frequency":"167",
	"ac_num":"32612"
}