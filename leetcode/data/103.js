{
	"difficulty":"2",
	"submit_num":"346325",
	"show_id":"103",
	"leetcode_id":"103",
	"answers":[
		{
			"lc_ans_id":"33815",
			"view":"33996",
			"top":"0",
			"title":"My accepted JAVA solution",
			"vote":"106",
			"content":"    public class Solution {\\n        public List<List<Integer>> zigzagLevelOrder(TreeNode root) \\n        {\\n            List<List<Integer>> sol = new ArrayList<>();\\n            travel(root, sol, 0);\\n            return sol;\\n        }\\n        \\n        private void travel(TreeNode curr, List<List<Integer>> sol, int level)\\n        {\\n            if(curr == null) return;\\n            \\n            if(sol.size() <= level)\\n            {\\n                List<Integer> newLevel = new LinkedList<>();\\n                sol.add(newLevel);\\n            }\\n            \\n            List<Integer> collection  = sol.get(level);\\n            if(level % 2 == 0) collection.add(curr.val);\\n            else collection.add(0, curr.val);\\n            \\n            travel(curr.left, sol, level + 1);\\n            travel(curr.right, sol, level + 1);\\n        }\\n    }\\n\\n1.  O(n) solution by using LinkedList along with ArrayList.  So insertion in the inner list and outer list are both O(1),\\n2.  Using DFS and creating new lists when needed.\\n\\nshould be quite straightforward.  any better answer?"
		},
		{
			"lc_ans_id":"33825",
			"view":"13384",
			"top":"1",
			"title":"[c++] 5ms version: one queue and without reverse operation by using size of each level",
			"vote":"75",
			"content":"  \\nAssuming after traversing the 1st level, nodes in queue are {9, 20, 8}, And we are going to traverse 2nd level, which is even line and should print value from right to left [8, 20, 9]. \\n\\nWe know there are 3 nodes in current queue, so the vector for this level in final result should be of size 3. \\nThen,     queue [i] -> goes to ->  vector[queue.size() - 1 - i]\\ni.e. the ith node in current queue should be placed in (queue.size() - 1 - i) position in vector for that line.\\n \\nFor example, for node(9), it's index in queue is 0, so its index in vector should be (3-1-0) = 2. \\n\\n\\n    vector<vector<int> > zigzagLevelOrder(TreeNode* root) {\\n        if (root == NULL) {\\n            return vector<vector<int> > ();\\n        }\\n        vector<vector<int> > result;\\n    \\n        queue<TreeNode*> nodesQueue;\\n        nodesQueue.push(root);\\n        bool leftToRight = true;\\n    \\n        while ( !nodesQueue.empty()) {\\n            int size = nodesQueue.size();\\n            vector<int> row(size);\\n            for (int i = 0; i < size; i++) {\\n                TreeNode* node = nodesQueue.front();\\n                nodesQueue.pop();\\n\\n                // find position to fill node's value\\n                int index = (leftToRight) ? i : (size - 1 - i);\\n\\n                row[index] = node->val;\\n                if (node->left) {\\n                    nodesQueue.push(node->left);\\n                }\\n                if (node->right) {\\n                    nodesQueue.push(node->right);\\n                }\\n            }\\n            // after this level\\n            leftToRight = !leftToRight;\\n            result.push_back(row);\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"33814",
			"view":"11283",
			"top":"2",
			"title":"A concise and easy understanding Java solution",
			"vote":"42",
			"content":"public class Solution {\\n    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\\n        List<List<Integer>> res = new ArrayList<>();\\n        if(root == null) return res;\\n\\n        Queue<TreeNode> q = new LinkedList<>();\\n        q.add(root);\\n        boolean order = true;\\n        int size = 1;\\n\\n        while(!q.isEmpty()) {\\n            List<Integer> tmp = new ArrayList<>();\\n            for(int i = 0; i < size; ++i) {\\n                TreeNode n = q.poll();\\n                if(order) {\\n                    tmp.add(n.val);\\n                } else {\\n                    tmp.add(0, n.val);\\n                }\\n                if(n.left != null) q.add(n.left);\\n                if(n.right != null) q.add(n.right);\\n            }\\n            res.add(tmp);\\n            size = q.size();\\n            order = order ? false : true;\\n        }\\n        return res;\\n    }\\n}"
		},
		{
			"lc_ans_id":"33931",
			"view":"5901",
			"top":"3",
			"title":"Clear iterative solution with deque, no reverse",
			"vote":"26",
			"content":" for zig, pop_back, push_front, left then right, \\n\\n for zag, pop_front, push_back, right then left\\n\\n    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {\\n        vector<vector<int>> res;\\n        if(!root) return res;\\n        std::deque<TreeNode*> deq;\\n        deq.push_back(root);\\n        int iszig=1;\\n        while(!deq.empty()) {\\n            int sz=deq.size();\\n            iszig=iszig^1;\\n            vector<int> row;\\n            while(sz--) {\\n                if(iszig) { // pop_front, push_back, right then left\\n                    root=deq.front();deq.pop_front();\\n                    row.push_back(root->val);\\n                    if(root->right) deq.push_back(root->right);\\n                    if(root->left) deq.push_back(root->left);\\n                }\\n                else { // pop_back, push_front, left then right\\n                    root=deq.back();deq.pop_back();\\n                    row.push_back(root->val);\\n                    if(root->left) deq.push_front(root->left);\\n                    if(root->right) deq.push_front(root->right);\\n                }\\n            }\\n            res.push_back(row);\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"33904",
			"view":"4066",
			"top":"4",
			"title":"JAVA Double Stack Solution",
			"vote":"20",
			"content":"    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\\n       TreeNode c=root;\\n       List<List<Integer>> ans =new ArrayList<List<Integer>>();\\n       if(c==null) return ans;\\n       Stack<TreeNode> s1=new Stack<TreeNode>();\\n       Stack<TreeNode> s2=new Stack<TreeNode>();\\n       s1.push(root);\\n       while(!s1.isEmpty()||!s2.isEmpty())\\n       {\\n           List<Integer> tmp=new ArrayList<Integer>();\\n            while(!s1.isEmpty())\\n            {\\n                c=s1.pop();\\n                tmp.add(c.val);\\n                if(c.left!=null) s2.push(c.left);\\n                if(c.right!=null) s2.push(c.right);\\n            }\\n            ans.add(tmp);\\n            tmp=new ArrayList<Integer>();\\n            while(!s2.isEmpty())\\n            {\\n                c=s2.pop();\\n                tmp.add(c.val);\\n                if(c.right!=null)s1.push(c.right);\\n                if(c.left!=null)s1.push(c.left);\\n            }\\n            if(!tmp.isEmpty()) ans.add(tmp);\\n       }\\n       return ans;\\n    }"
		},
		{
			"lc_ans_id":"33834",
			"view":"2284",
			"top":"5",
			"title":"Python simple BFS",
			"vote":"17",
			"content":"Simple straightforward solution using flag to decide whether from left to right or from right to left\\n\\n    class Solution(object):\\n    def zigzagLevelOrder(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: List[List[int]]\\n        \"\"\"\\n        if not root: return []\\n        res, temp, stack, flag=[], [], [root], 1\\n        while stack:\\n            for i in xrange(len(stack)):\\n                node=stack.pop(0)\\n                temp+=[node.val]\\n                if node.left: stack+=[node.left]\\n                if node.right: stack+=[node.right]\\n            res+=[temp[::flag]]\\n            temp=[]\\n            flag*=-1\\n        return res"
		},
		{
			"lc_ans_id":"34162",
			"view":"3071",
			"top":"6",
			"title":"My AC Java code",
			"vote":"13",
			"content":"I use two stacks, one for processing current layer and one for storing nodes for the next layer. I also use a flag (order in your code) to indicate the direction. It is straightforward\\n\\n    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\\n        List<List<Integer>> output = new ArrayList<List<Integer>>();\\n        if (root == null) return output;\\n        Stack<TreeNode> cur_layer = new Stack<TreeNode>(); cur_layer.push(root);\\n        Stack<TreeNode> next_layer = new Stack<TreeNode>();\\n        List<Integer> layer_output = new ArrayList<Integer>();\\n        int d = 0; // 0: left to right; 1: right to left.\\n        \\n        while (!cur_layer.isEmpty()){\\n        \\tTreeNode node = cur_layer.pop();\\n        \\tlayer_output.add(node.val);\\n        \\tif(d==0){\\n        \\t\\tif (node.left != null) next_layer.push(node.left);\\n        \\t\\tif (node.right != null) next_layer.push(node.right);\\n        \\t}else{\\n        \\t\\tif (node.right != null) next_layer.push(node.right);\\n        \\t\\tif (node.left != null) next_layer.push(node.left);\\n        \\t}\\n        \\t\\n        \\tif (cur_layer.isEmpty()){\\n        \\t\\toutput.add(layer_output);\\n        \\t\\tlayer_output = new ArrayList<Integer>();\\n        \\t\\tcur_layer = next_layer;\\n        \\t\\tnext_layer = new Stack<TreeNode>();;\\n        \\t\\td ^= 1;\\n        \\t}\\n        }\\n        return output;\\n    }"
		},
		{
			"lc_ans_id":"34049",
			"view":"1106",
			"top":"7",
			"title":"My Java Solution Beats 98%",
			"vote":"8",
			"content":"    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\\n        List<List<Integer>> res = new ArrayList();\\n        travel(res, 0, root);\\n        return res;\\n    }\\n    private void travel(List<List<Integer>> res, int level, TreeNode cur) {\\n        if (cur == null) return;\\n        if (res.size() <= level) {\\n            res.add(new ArrayList<Integer>());\\n        }\\n        if (level % 2 == 0) {\\n            res.get(level).add(cur.val);\\n        }   else {\\n            res.get(level).add(0, cur.val);\\n        }\\n        travel(res, level + 1, cur.left);\\n        travel(res, level + 1, cur.right);\\n    }"
		},
		{
			"lc_ans_id":"33898",
			"view":"1241",
			"top":"8",
			"title":"[recommend for beginners]clean C++ implementation with detailed explanation",
			"vote":"7",
			"content":"    class Solution {\\n    public:\\n        vector<vector<int>> zigzagLevelOrder(TreeNode* root) {\\n            vector<vector<int>> result;\\n            if(!root) return result;\\n            deque<TreeNode*> tree;\\n            tree.push_back(root);\\n            int flag=0;\\n            while(!tree.empty()){\\n                int count=tree.size();\\n                vector<int> level;\\n                while(count-- > 0){\\n                    TreeNode* cur=tree.front();\\n                    tree.pop_front();\\n                    level.push_back(cur->val);\\n                    if(cur->left) tree.push_back(cur->left);\\n                    if(cur->right) tree.push_back(cur->right);\\n                }\\n                if(flag & 1) reverse(level.begin(), level.end());\\n                result.push_back(level);\\n                flag++;\\n            }\\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"33833",
			"view":"1037",
			"top":"9",
			"title":"Simple and clear python solution with explain",
			"vote":"7",
			"content":"I use a additional function addLevel to record the level number of nodes, then according to the level number, I can easily deal with the level order, see the code for details\\n\\n    # Definition for a  binary tree node\\n    # class TreeNode:\\n    #     def __init__(self, x):\\n    #         self.val = x\\n    #         self.left = None\\n    #         self.right = None\\n    \\n    class Solution:\\n        # @param root, a tree node\\n        # @return a list of lists of integers\\n        def zigzagLevelOrder(self, root):\\n            ans = []\\n            self.addLevel(ans, 0, root)#level from 0\\n            return ans\\n            \\n            \\n        def addLevel(self, ans, level, root):\\n            if not root:\\n                return\\n            elif len(ans) <= level:\\n                    ans.append([root.val])\\n            elif not level%2:#if it is an even level, then then level ans should be inversed, so I use extend founction\\n                ans[level].extend([root.val])\\n            else:\\n                ans[level].insert(0,root.val)# if it is an odd level, then level ans should be ordinal, so I use insert function\\n            self.addLevel(ans, level + 1, root.left)\\n            self.addLevel(ans, level + 1, root.right)"
		}
	],
	"id":"103",
	"title":"Binary Tree Zigzag Level Order Traversal",
	"content":"<p>Given a binary tree, return the <i>zigzag level order</i> traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven binary tree <code>[3,9,20,null,null,15,7]</code>,<br />\r\n<pre>\r\n    3\r\n   / \\\r\n  9  20\r\n    /  \\\r\n   15   7\r\n</pre>\r\n</p>\r\n<p>\r\nreturn its zigzag level order traversal as:<br />\r\n<pre>\r\n[\r\n  [3],\r\n  [20,9],\r\n  [15,7]\r\n]\r\n</pre>\r\n</p>",
	"frequency":"289",
	"ac_num":"125318"
}