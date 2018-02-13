{
	"difficulty":"1",
	"submit_num":"59677",
	"show_id":"637",
	"leetcode_id":"637",
	"answers":[
		{
			"lc_ans_id":"105107",
			"view":"9870",
			"top":"0",
			"title":"Java BFS Solution",
			"vote":"34",
			"content":"Classic bfs problem. At each level, compute the average since you already know the size of the level.\\n\\n    public List<Double> averageOfLevels(TreeNode root) {\\n        List<Double> result = new ArrayList<>();\\n        Queue<TreeNode> q = new LinkedList<>();\\n        \\n        if(root == null) return result;\\n        q.add(root);\\n        while(!q.isEmpty()) {\\n            int n = q.size();\\n            double sum = 0.0;\\n            for(int i = 0; i < n; i++) {\\n                TreeNode node = q.poll();\\n                sum += node.val;\\n                if(node.left != null) q.offer(node.left);\\n                if(node.right != null) q.offer(node.right);\\n            }\\n            result.add(sum / n);\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"105131",
			"view":"3066",
			"top":"1",
			"title":"A good problem to practice (BFS + DFS)",
			"vote":"19",
			"content":"BFS:\\n```\\n    public List<Double> averageOfLevels(TreeNode root) {\\n        List<Double> list = new LinkedList<>();\\n        Queue<TreeNode> queue = new LinkedList<>();\\n        queue.offer(root);\\n        while (!queue.isEmpty()) {\\n            int count = queue.size();\\n            double sum = 0;\\n            for (int i = 0; i < count; i++) {\\n                TreeNode cur = queue.poll();\\n                sum += cur.val;\\n                if (cur.left != null) queue.offer(cur.left);\\n                if (cur.right != null) queue.offer(cur.right);\\n            }\\n            list.add(sum / count);\\n        }\\n        return list;\\n    }\\n```\\n\\nDFS:  a new node class make it more readable and professional\\n```\\n    class Node {\\n        double sum;\\n        int count;\\n        Node (double d, int c) {\\n            sum = d;\\n            count = c;\\n        }\\n    }\\n    public List<Double> averageOfLevels(TreeNode root) {\\n        List<Node> temp = new ArrayList<>();\\n        helper(root, temp, 0);\\n        List<Double> result = new LinkedList<>();\\n        for (int i = 0; i < temp.size(); i++) {\\n            result.add(temp.get(i).sum / temp.get(i).count);\\n        }\\n        return result;\\n    }\\n    public void helper(TreeNode root, List<Node> temp, int level) {\\n        if (root == null) return;\\n        if (level == temp.size()) {\\n            Node node = new Node((double)root.val, 1);\\n            temp.add(node);\\n        } else {\\n            temp.get(level).sum += root.val;\\n            temp.get(level).count++;\\n        }\\n        helper(root.left, temp, level + 1);\\n        helper(root.right, temp, level + 1);\\n    }\\n```"
		},
		{
			"lc_ans_id":"105108",
			"view":"3446",
			"top":"2",
			"title":"Python, Straightforward with Explanation",
			"vote":"12",
			"content":"Let's visit every node of the tree once, keeping track of what depth we are on.  We can do this with a simple DFS.  \\n\\nWhen we visit a node, info[depth] will be a two element list, keeping track of the sum of the nodes we have seen at this depth, and the number of nodes we have seen.  This is necessary and sufficient to be able to compute the average value at this depth.\\n\\nAt the end of our traversal, we can simply read off the answer.\\n\\n```\\ndef averageOfLevels(self, root):\\n    info = []\\n    def dfs(node, depth = 0):\\n        if node:\\n            if len(info) <= depth:\\n                info.append([0, 0])\\n            info[depth][0] += node.val\\n            info[depth][1] += 1\\n            dfs(node.left, depth + 1)\\n            dfs(node.right, depth + 1)\\n    dfs(root)\\n\\n    return [s/float(c) for s, c in info]\\n```"
		},
		{
			"lc_ans_id":"105178",
			"view":"1829",
			"top":"3",
			"title":"C++ simple and clear BFS solution",
			"vote":"10",
			"content":"```\\n    vector<double> averageOfLevels(TreeNode* root) {\\n        vector<double> res;\\n        queue<TreeNode*> q;\\n        q.push(root);\\n        while(!q.empty()) {\\n            long temp=0;\\n            int s=q.size();\\n            for(int i=0;i<s;i++) {\\n                TreeNode* t=q.front();\\n                q.pop();\\n                if(t->left) q.push(t->left);\\n                if(t->right) q.push(t->right);\\n                temp+=t->val;\\n            }\\n            res.push_back((double)temp/s);\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"105158",
			"view":"776",
			"top":"4",
			"title":"Java solution using DFS with full comments",
			"vote":"5",
			"content":"```\\n/**\\n * Definition for a binary tree node.\\n * public class TreeNode {\\n *     int val;\\n *     TreeNode left;\\n *     TreeNode right;\\n *     TreeNode(int x) { val = x; }\\n * }\\n */\\npublic class Solution {\\n    public List<Double> averageOfLevels(TreeNode root) {\\n        // list answer for sum all value in same level\\n        List<Double> answer = new ArrayList<Double>();\\n        \\n        // list counter for count number of node in same level\\n        List<Integer> counter = new ArrayList<Integer>();\\n        \\n        // using dfs to sum all value in same level and count number of node in same level\\n        dfs(0, root, answer, counter);\\n        \\n        // answer will be answer[level] / counter[level]\\n        for (int level = 0; level < answer.size(); level++) {\\n            answer.set(level, answer.get(level) / counter.get(level));\\n        }\\n        return answer;\\n    }\\n\\n    public void dfs(int level, TreeNode node, List<Double> answer, List<Integer> counter) {\\n        if (node == null) {\\n            return;\\n        }\\n\\n        if (answer.size() <= level) {\\n            answer.add(0.0);\\n            counter.add(0);\\n        }\\n\\n        answer.set(level, answer.get(level) + node.val);\\n        counter.set(level, counter.get(level) + 1);\\n\\n        // go left node and right node\\n        dfs(level + 1, node.left, answer, counter);\\n        dfs(level + 1, node.right, answer, counter);\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"105127",
			"view":"926",
			"top":"5",
			"title":"\"one-liner\"",
			"vote":"3",
			"content":"Well, one line in addition to copying&pasting a solution from the earlier [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/#/description) problem and importing the statistics module. I just like to reuse my code.\\n```\\nfrom statistics import mean\\n\\nclass Solution:\\n\\n    def averageOfLevels(self, root):\\n        return list(map(mean, self.levelOrder(root)))\\n\\n    # copied&pasted from old problem's solution:\\n    def levelOrder(self, root):\\n        levels = []\\n        level = [root]\\n        while any(level):\\n            levels.append([node.val for node in level])\\n            level = [kid for node in level for kid in (node.left, node.right) if kid]\\n        return levels\\n```\\n---\\nHere's a version without that help:\\n\\n    def averageOfLevels(self, root):\\n        averages = []\\n        level = [root]\\n        while level:\\n            averages.append(sum(node.val for node in level) / len(level))\\n            level = [kid for node in level for kid in (node.left, node.right) if kid]\\n        return averages"
		},
		{
			"lc_ans_id":"105117",
			"view":"646",
			"top":"6",
			"title":"python BFS",
			"vote":"3",
			"content":"```\\n    def averageOfLevels(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: List[float]\\n        \"\"\"\\n        res=[]\\n        if not root: return res\\n        q=[root]\\n        while q:\\n            q1=[]\\n            total=0\\n            cnt=0\\n            while q:\\n                node =q.pop()\\n                if node.left: q1.append(node.left)\\n                if node.right: q1.append(node.right)\\n                total+=node.val\\n                cnt+=1\\n            res.append(total*1.0/cnt)\\n            q=list(q1)\\n        return res\\n```"
		},
		{
			"lc_ans_id":"105156",
			"view":"112",
			"top":"7",
			"title":"C solution using BFS (No extra struct, only one help function)",
			"vote":"2",
			"content":"```\\nint getAverage(struct TreeNode* root, long** sum, int** number, int length, int level) {\\n\\tif (root == NULL) return length;\\n\\tint size = length;\\n\\tif (level > size - 1){\\n\\t\\t*sum = realloc(*sum, (size + 1) * sizeof(long));\\t\\n\\t\\t*number = realloc(*number, (size + 1) * sizeof(int));\\n\\t\\t(*sum)[size] = 0;\\n\\t\\t(*number)[size] = 0;\\t\\n\\t\\tsize ++;\\n\\t}\\n\\t(*sum)[level] += root -> val;\\n\\t(*number)[level] += 1;\\n\\tsize = getAverage(root -> left, sum, number, size, level + 1);\\n\\tsize = getAverage(root -> right, sum, number, size, level + 1);\\n\\treturn size;\\n}\\ndouble* averageOfLevels(struct TreeNode* root, int* returnSize) {\\n\\tlong* sum = calloc(0 , sizeof(long));\\n\\tint* number = calloc(0 , sizeof(int));\\n\\tint size = getAverage(root, &sum, &number, 0, 0);\\n\\t*returnSize = size;\\n\\tdouble* result = calloc(size , sizeof(double));\\n\\tfor (int i = 0; i < size; i ++){\\n\\t\\tif (number[i] != 0)\\n\\t\\tresult[i] = (double)sum[i] / number[i];\\t\\n\\t}\\n\\treturn result;\\n}\\n```"
		},
		{
			"lc_ans_id":"105191",
			"view":"1653",
			"top":"8",
			"title":"C++ nullptr",
			"vote":"2",
			"content":"    class Solution {\\n    public:\\n        vector<double> averageOfLevels(TreeNode* root) {\\n            vector<double> ret;\\n            double sum = 0, count = 0;\\n            queue<TreeNode*> q;\\n            q.push(root);\\n            q.push(nullptr);\\n            while (!q.empty()) {\\n                TreeNode* t = q.front();\\n                q.pop();\\n                if (t == nullptr) {\\n                    ret.push_back(sum / count);\\n                    sum = count = 0;\\n                    if (!q.empty()) q.push(nullptr);\\n                } else {\\n                    sum += t->val;\\n                    ++count;\\n                    if (t->left) q.push(t->left);\\n                    if (t->right) q.push(t->right);\\n                }\\n            }\\n            return ret;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"105192",
			"view":"902",
			"top":"9",
			"title":"Naive Java Solution with 2 lists with helper()",
			"vote":"2",
			"content":"sumLs: store the sum of each level.\\ncntLs: store each level node number.\\nindex in the list means level in the tree.\\n```\\npublic class Solution {\\n    public List<Double> averageOfLevels(TreeNode root) {\\n        List<Double> sumLs = new ArrayList<Double>();\\n        List<Integer> cntLs = new ArrayList<Integer>();\\n        if (root == null) return sumLs;\\n        helper(root, 0, sumLs, cntLs);\\n        for (int i = 0; i < sumLs.size(); i++)\\n            sumLs.set(i, sumLs.get(i) / cntLs.get(i));\\n        return sumLs;\\n    }\\n    \\n    private void helper(TreeNode root, int lv, List<Double> sumLs, List<Integer> cntLs) {\\n        if (root != null) {\\n        \\tif (sumLs.size() <= lv) {\\n        \\t\\tsumLs.add((double) root.val);\\n        \\t\\tcntLs.add(1);\\n        \\t} else {\\n        \\t\\tsumLs.set(lv, sumLs.get(lv) + root.val);\\n        \\t\\tcntLs.set(lv, cntLs.get(lv) + 1);\\n        \\t}\\n            helper(root.left, lv + 1, sumLs, cntLs);\\n            helper(root.right, lv + 1, sumLs, cntLs);\\n        }\\n    }\\n}\\n```"
		}
	],
	"id":"615",
	"title":"Average of Levels in Binary Tree",
	"content":"Given a non-empty binary tree, return the average value of the nodes on each level in the form of an array.\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n    3\r\n   / \\\r\n  9  20\r\n    /  \\\r\n   15   7\r\n<b>Output:</b> [3, 14.5, 11]\r\n<b>Explanation:</b>\r\nThe average value of nodes on level 0 is 3,  on level 1 is 14.5, and on level 2 is 11. Hence return [3, 14.5, 11].\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The range of node's value is in the range of 32-bit signed integer.</li>\r\n</ol>\r\n</p>",
	"frequency":"262",
	"ac_num":"33351"
}