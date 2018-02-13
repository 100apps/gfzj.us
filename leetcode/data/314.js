{
	"difficulty":"2",
	"submit_num":"103021",
	"show_id":"314",
	"leetcode_id":"314",
	"answers":[
		{
			"lc_ans_id":"76401",
			"view":"29101",
			"top":"0",
			"title":"5ms Java Clean Solution",
			"vote":"146",
			"content":"The following solution takes `5ms`. \\n\\n- BFS, put `node`, `col` into queue at the same time\\n- Every left child access `col - 1` while right child  `col + 1`\\n- This maps `node` into different `col` buckets\\n- Get `col` boundary `min` and `max` on the fly\\n- Retrieve `result` from `cols`\\n\\nNote that `TreeMap` version takes `9ms`.\\n\\n<hr>\\n\\nHere is an example of `[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]`. Notice that every child access changes one column bucket id. So `12` actually goes ahead of `11`.\\n\\n<div class='pixels-photo'>\\n  <p>\\n    <img src='https://drscdn.500px.org/photo/135826875/m%3D900/7e1d9c2bdc47791e3b54f25bf50b6370' alt='vertical by yavinci on 500px.com'>\\n  </p>\\n  <a href='https://500px.com/photo/135826875/vertical-by-yavinci' alt='vertical by yavinci on 500px.com'></a>\\n</div>\\n\\n<hr>\\n\\n    public List<List<Integer>> verticalOrder(TreeNode root) {\\n        List<List<Integer>> res = new ArrayList<>();\\n        if (root == null) {\\n            return res;\\n        }\\n        \\n        Map<Integer, ArrayList<Integer>> map = new HashMap<>();\\n        Queue<TreeNode> q = new LinkedList<>();\\n        Queue<Integer> cols = new LinkedList<>();\\n    \\n        q.add(root); \\n        cols.add(0);\\n    \\n        int min = 0;\\n        int max = 0;\\n        \\n        while (!q.isEmpty()) {\\n            TreeNode node = q.poll();\\n            int col = cols.poll();\\n            \\n            if (!map.containsKey(col)) {\\n                map.put(col, new ArrayList<Integer>());\\n            }\\n            map.get(col).add(node.val);\\n    \\n            if (node.left != null) {\\n                q.add(node.left); \\n                cols.add(col - 1);\\n                min = Math.min(min, col - 1);\\n            }\\n            \\n            if (node.right != null) {\\n                q.add(node.right);\\n                cols.add(col + 1);\\n                max = Math.max(max, col + 1);\\n            }\\n        }\\n    \\n        for (int i = min; i <= max; i++) {\\n            res.add(map.get(i));\\n        }\\n    \\n        return res;\\n    }\\n\\n<hr>\\n\\nAlternatively, we can calculate the rang first, then insert into buckets. Credit to @Jinx_boom  \\n<hr>\\n\\n    public List<List<Integer>> verticalOrder(TreeNode root) {\\n        List<List<Integer>> cols = new ArrayList<>();\\n        if (root == null) {\\n            return cols;\\n        }\\n        \\n        int[] range = new int[] {0, 0};\\n        getRange(root, range, 0);\\n        \\n        for (int i = range[0]; i <= range[1]; i++) {\\n            cols.add(new ArrayList<Integer>());\\n        }\\n        \\n        Queue<TreeNode> queue = new LinkedList<>();\\n        Queue<Integer> colQueue = new LinkedList<>();\\n        \\n        queue.add(root);\\n        colQueue.add(-range[0]);\\n        \\n        while (!queue.isEmpty()) {\\n            TreeNode node = queue.poll();\\n            int col = colQueue.poll();\\n            \\n            cols.get(col).add(node.val);\\n            \\n            if (node.left != null) {\\n                queue.add(node.left);   \\n                colQueue.add(col - 1);\\n            } \\n            if (node.right != null) {\\n                queue.add(node.right);\\n                colQueue.add(col + 1);\\n            }\\n        }\\n        \\n        return cols;\\n    }\\n    \\n    public void getRange(TreeNode root, int[] range, int col) {\\n        if (root == null) {\\n            return;\\n        }\\n        range[0] = Math.min(range[0], col);\\n        range[1] = Math.max(range[1], col);\\n        \\n        getRange(root.left, range, col - 1);\\n        getRange(root.right, range, col + 1);\\n    }"
		},
		{
			"lc_ans_id":"76424",
			"view":"7644",
			"top":"1",
			"title":"Python solution",
			"vote":"49",
			"content":"    def verticalOrder(self, root):\\n        cols = collections.defaultdict(list)\\n        queue = [(root, 0)]\\n        for node, i in queue:\\n            if node:\\n                cols[i].append(node.val)\\n                queue += (node.left, i - 1), (node.right, i + 1)\\n        return [cols[i] for i in sorted(cols)]"
		},
		{
			"lc_ans_id":"76508",
			"view":"8801",
			"top":"2",
			"title":"3ms java solution beats 100%",
			"vote":"31",
			"content":"    private int min = 0, max = 0;\\n    public List<List<Integer>> verticalOrder(TreeNode root) {\\n        List<List<Integer>> list = new ArrayList<>();\\n        if(root == null)    return list;\\n        computeRange(root, 0);\\n        for(int i = min; i <= max; i++) list.add(new ArrayList<>());\\n        Queue<TreeNode> q = new LinkedList<>();\\n        Queue<Integer> idx = new LinkedList<>();\\n        idx.add(-min);\\n        q.add(root);\\n        while(!q.isEmpty()){\\n            TreeNode node = q.poll();\\n            int i = idx.poll();\\n            list.get(i).add(node.val);\\n            if(node.left != null){\\n                q.add(node.left);\\n                idx.add(i - 1);\\n            }\\n            if(node.right != null){\\n                q.add(node.right);\\n                idx.add(i + 1);\\n            }\\n        }\\n        return list;\\n    }\\n    private void computeRange(TreeNode root, int idx){\\n        if(root == null)    return;\\n        min = Math.min(min, idx);\\n        max = Math.max(max, idx);\\n        computeRange(root.left, idx - 1);\\n        computeRange(root.right, idx + 1);\\n    }\\nThere is no difference when using HashMap.  Since by using HashMap it need keep track of min and max as well, I'd rather directly insert into list by computing min and max in advance."
		},
		{
			"lc_ans_id":"76463",
			"view":"5858",
			"top":"3",
			"title":"Using HashMap,BFS Java Solution",
			"vote":"23",
			"content":"    public class Solution {\\n        public List<List<Integer>> verticalOrder(TreeNode root) {\\n            List<List<Integer>> res = new ArrayList<>();\\n            if (root == null) {\\n                return res;\\n            }\\n           //map's key is column, we assume the root column is zero, the left node will minus 1 ,and the right node will plus 1\\n            HashMap<Integer, ArrayList<Integer>> map = new HashMap<Integer, ArrayList<Integer>>();\\n            Queue<TreeNode> queue = new LinkedList<>();\\n           //use a HashMap to store the TreeNode and the according cloumn value\\n            HashMap<TreeNode, Integer> weight = new HashMap<TreeNode, Integer>();\\n            queue.offer(root);\\n            weight.put(root, 0);\\n            int min = 0;\\n            while (!queue.isEmpty()) {\\n                TreeNode node = queue.poll();\\n                int w = weight.get(node);\\n                if (!map.containsKey(w)) {\\n                    map.put(w, new ArrayList<>());\\n                }\\n                map.get(w).add(node.val);\\n                if (node.left != null) {\\n                    queue.add(node.left);\\n                    weight.put(node.left, w - 1);\\n                } \\n                if (node.right != null) {\\n                    queue.add(node.right);\\n                    weight.put(node.right, w + 1);\\n                }\\n                //update min ,min means the minimum column value, which is the left most node\\n                min = Math.min(min, w);\\n            }\\n            while (map.containsKey(min)) {\\n                res.add(map.get(min++));\\n            }\\n            return res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"76479",
			"view":"5002",
			"top":"4",
			"title":"My Solution in C++",
			"vote":"13",
			"content":"class Solution {\\npublic:\\n    \\n    vector<vector<int>> verticalOrder(TreeNode* root) {\\n        vector<vector<int>> output;\\n        if(!root){\\n            return output;\\n        }\\n        map<int, vector<int>> m;\\n        queue<pair<int, TreeNode*>> q;\\n        q.push(make_pair(0,root));\\n        while(!q.empty()){\\n            int size = q.size();\\n            for(int i = 0;  i < size; i++){\\n                TreeNode* t = q.front().second;\\n                int tmp = q.front().first;\\n                q.pop();\\n                m[tmp].push_back(t->val);\\n                if(t->left){\\n                    q.push(make_pair(tmp - 1, t->left));\\n                }\\n                if(t->right){\\n                    q.push(make_pair(tmp + 1, t->right));\\n                    \\n                }\\n            }\\n        }\\n        for(auto& v : m){\\n            output.push_back(v.second);\\n        }\\n        return output;\\n        \\n    }\\n};"
		},
		{
			"lc_ans_id":"76529",
			"view":"1558",
			"top":"5",
			"title":"4ms Java Solution - no map needed",
			"vote":"8",
			"content":"\\n    public List<List<Integer>> verticalOrder(TreeNode root) {\\n        List<List<Integer>> rst = new ArrayList<>();\\n        if (root == null) return rst;\\n        List<Integer> zeroCol = new ArrayList<>();\\n        rst.add(zeroCol);\\n        int minCol = 0; //use minCol and maxCol to help insert List at right position (no need for map)\\n        int maxCol = 0;\\n\\n        Queue<TreeNode> level = new LinkedList<TreeNode>();\\n        Queue<Integer> levelCol = new LinkedList<Integer>();\\n        level.add(root);\\n        levelCol.add(0);\\n        \\n        while(!level.isEmpty() && !levelCol.isEmpty()) {\\n            TreeNode curr = level.poll();\\n            int currCol = levelCol.poll();\\n            \\n            if (currCol < minCol) { //create new List when new column found\\n                List<Integer> newCol = new ArrayList<>();\\n                newCol.add(curr.val);\\n                rst.add(0, newCol); //new leftmost column\\n                minCol = currCol;\\n            } else if (currCol > maxCol) {\\n                List<Integer> newCol = new ArrayList<>();\\n                newCol.add(curr.val); // new rightmost column\\n                rst.add(maxCol - minCol + 1, newCol);\\n                maxCol = currCol;\\n            } else {\\n                rst.get(currCol - minCol).add(curr.val);\\n            }\\n            \\n            if (curr.left != null) {\\n                level.add(curr.left);\\n                levelCol.add(currCol - 1);\\n            }\\n            \\n            if (curr.right != null) {\\n                level.add(curr.right);\\n                levelCol.add(currCol + 1);\\n            }\\n        }\\n        \\n        return rst;\\n    }"
		},
		{
			"lc_ans_id":"76457",
			"view":"1326",
			"top":"6",
			"title":"3 solutions, beats 98.9%, using DoubleLinkedList (Or hashmap\\\\ vector), C++",
			"vote":"8",
			"content":"    struct doubleList{\\n        vector<int> val;\\n        doubleList *left;\\n        doubleList *right;\\n    };\\n    class Solution {\\n    public:\\n        vector<vector<int>> verticalOrder(TreeNode* root) {\\n            //Double Linked List. Fastest\\n\\n            vector<vector<int> > res;\\n            if(!root)\\n                return res;\\n            doubleList *mid = new doubleList();\\n            queue<pair<TreeNode *,doubleList *> > Q;\\n            Q.push({root,mid});\\n            doubleList *leftbound = mid;\\n            while(!Q.empty())\\n            {\\n                auto node = Q.front();\\n                Q.pop();\\n                node.second->val.push_back(node.first->val);\\n                if(node.first->left)\\n                {\\n                    if(node.second->left==NULL)\\n                    {\\n                        node.second->left = new doubleList();\\n                        node.second->left->right = node.second;\\n                        leftbound = node.second->left;\\n                    }\\n                    Q.push({node.first->left,node.second->left});\\n                }\\n                if(node.first->right)\\n                {\\n                    if(node.second->right==NULL)\\n                    {\\n                        node.second->right = new doubleList();\\n                        node.second->right->left = node.second;\\n                    }\\n                    Q.push({node.first->right,node.second->right});\\n                }\\n            }\\n            while(leftbound)\\n            {\\n                res.push_back(leftbound->val);\\n                leftbound = leftbound->right;\\n            }\\n            return res;\\n\\n            // // ------Two vectors-----\\n            // vector<vector<int>> res;\\n            // if(!root)\\n            //     return res;\\n            // vector<vector<int>>left;\\n            // vector<vector<int>> right;\\n            // vector<int> mid;\\n            // queue<pair<TreeNode *,int> > Q;\\n            // Q.push({root,0});\\n            // while(!Q.empty())\\n            // {\\n            //     auto node = Q.front();\\n            //     Q.pop();\\n            //     if(node.second == 0)\\n            //         mid.push_back(node.first->val);\\n            //     else if(node.second>0)\\n            //     {\\n            //         if(node.second > right.size())\\n            //         {\\n            //             right.push_back({node.first->val});\\n            //         }\\n            //         else\\n            //             right[node.second-1].push_back(node.first->val);\\n            //     }\\n            //     else if(node.second<0)\\n            //     {\\n            //         if(-node.second > left.size())\\n            //         {\\n            //             left.push_back({node.first->val});\\n            //         }\\n            //         else \\n            //             left[-node.second-1].push_back(node.first->val);\\n            //     }\\n            //     if(node.first->left) Q.push({node.first->left,node.second-1});\\n            //     if(node.first->right) Q.push({node.first->right,node.second+1});\\n            // }\\n            // reverse(left.begin(),left.end());\\n            // left.push_back(mid);\\n            // for(auto it:right)\\n            // left.push_back(it);\\n            // return left;\\n            \\n            \\n            // ------HashMap----\\n            \\n            // unordered_map<int, vector<int>> vertical;\\n            // vector<vector<int> > res;\\n            // if(!root)\\n            //     return res;\\n            // queue<pair<TreeNode *, int> > Q;\\n            // Q.push({root,0});\\n            // int minindex = 0,maxindex = 0;\\n            // while(!Q.empty())\\n            // {\\n            //     auto node = Q.front();\\n            //     Q.pop();\\n            //     vertical[node.second].push_back(node.first->val);\\n            //     minindex = min(node.second,minindex);\\n            //     maxindex = max(node.second,maxindex);\\n            //     if(node.first->left) Q.push({node.first->left,node.second-1});\\n            //     if(node.first->right) Q.push({node.first->right,node.second+1});\\n            // }\\n            // for(int i = minindex;i<=maxindex;i++)\\n            // res.push_back(vertical[i]);\\n            // return res;\\n            \\n        }\\n    };"
		},
		{
			"lc_ans_id":"76448",
			"view":"923",
			"top":"7",
			"title":"Python - modified level order traversal",
			"vote":"7",
			"content":"It's basically a modified level-order traversal\\n\\n    class Solution(object):\\n        def verticalOrder(self, root):\\n            \"\"\"\\n            :type root: TreeNode\\n            :rtype: List[List[int]]\\n            \"\"\"\\n            if root is None:\\n                return []\\n            \\n            q = []\\n    \\n            node = root\\n            q.append([node,0])\\n            \\n            output = {}\\n        \\n            while len(q) > 0:\\n                node,level = q.pop(0)\\n                \\n                if not (level in output):\\n                    output[level] = [node.val]\\n                else:\\n                    output[level].append(node.val)\\n                \\n                if node.left is not None:\\n                    q.append([node.left,level-1])\\n                if node.right is not None:\\n                    q.append([node.right,level+1])\\n            \\n            sortedkeys = sorted(output.keys())\\n            vertorder = []\\n            for i in sortedkeys:\\n                vertorder.append(output[i])\\n            return vertorder"
		},
		{
			"lc_ans_id":"76420",
			"view":"216",
			"top":"8",
			"title":"Vertical Order in Python",
			"vote":"5",
			"content":"```py\\n# Definition for a binary tree node.\\n# class TreeNode(object):\\n#     def __init__(self, x):\\n#         self.val = x\\n#         self.left = None\\n#         self.right = None\\n\\nclass Solution(object):\\n    \\n    def verticalOrder(self, root):\\n        \"\"\"\\n        :type root: TreeNode\\n        :rtype: List[List[int]]\\n        \\n        this problem seemed very hard but actually once you draw a picture on a paper or in your brain, it becomes pretty clear.\\n        - for the left  node, you set its index as index - 1\\n        - for the right node, you set its index as index + 1\\n        - use queue to loop through all the nodes in a tree\\n        - set index as a key to the hashmap() and value as a list of vals\\n        - add node.data into hashmap() with index as a key\\n        - keep track of min and max index and store into solution list and return it\\n        \"\"\"\\n        if not(root): return []\\n        \\n        res, MIN, MAX = [], 0, 0\\n        table = {}\\n        queue = [(root,0)]\\n        \\n        while queue:\\n            \\n            # order matters\\n            node, index = queue.pop(0)\\n            if index not in table:\\n                table[index] = [node.val]\\n            else:\\n                table[index].append(node.val)\\n            \\n            # left comes first.\\n            if node.left:\\n                MIN = min(MIN, index - 1)\\n                queue.append((node.left, index - 1))\\n            if node.right:\\n                MAX = max(MAX, index + 1)\\n                queue.append((node.right, index + 1))\\n        \\n        for i in range(MIN,MAX+1):\\n            res.append(table[i])\\n        \\n        return res\\n        \\n        \\n        \\n        \\n```"
		},
		{
			"lc_ans_id":"76514",
			"view":"1663",
			"top":"9",
			"title":"C++, 8ms without using HashMap",
			"vote":"5",
			"content":"Well, we are using hashmap because we want the container to be **two-way-expandable**. \\n\\nThus, we can use other data structures like **double linked list** to contain these TreeNode values. \\n\\nHowever, I want to introduce a \"traditional\" method using ***vector***. \\n\\nBasically, it's like using two vectors to expand into two directions, left and right. And at the end, just combine these two vector toghther.\\n\\nWell, I have to admit that this method is not so serious... The most elegant way is using hashmap, though.\\n\\n**- Without using hashmap:**\\n\\n    class Solution {\\n    public:\\n        vector<vector<int>> verticalOrder(TreeNode* root) {\\n            std::queue<pair<int, TreeNode*>> q;\\n            vector<vector<int>> left;\\n            vector<vector<int>> right;\\n            vector<int> mid;\\n            if(!root) return left;\\n            q.push({0,root});\\n            while(!q.empty()){\\n                auto p = q.front();\\n                q.pop();\\n                if(p.first == 0) mid.push_back(p.second->val);\\n                else if(p.first > 0){\\n                    if(p.first > right.size()) right.push_back(vector<int>());\\n                    right[p.first-1].push_back(p.second->val);\\n                }\\n                else{\\n                    if(0-p.first > left.size()) left.push_back(vector<int>());\\n                    left[-1-p.first].push_back(p.second->val);\\n                }\\n                if(p.second->left) q.push({p.first-1, p.second->left});\\n                if(p.second->right) q.push({p.first+1, p.second->right});\\n            }\\n            int  r = right.size();\\n            reverse(left.begin(), left.end());\\n            left.push_back(mid);\\n            for(int i=0; i<r; i++) left.push_back(right[i]);\\n            return left;\\n        }\\n    };\\n\\n\\n**- Using hashmap:**\\n\\n    class Solution {\\n    public:\\n        vector<vector<int>> verticalOrder(TreeNode* root) {\\n            std::map<int, vector<int>> mp;\\n            std::queue<pair<int, TreeNode*>> q;\\n            vector<vector<int>> ret;\\n            if(root) q.push({0, root});\\n            while(!q.empty()){\\n                auto p = q.front();\\n                q.pop();\\n                mp[p.first].push_back(p.second->val);\\n                if(p.second->left) q.push({p.first-1, p.second->left});\\n                if(p.second->right) q.push({p.first+1, p.second->right});\\n            }\\n            for(auto it=mp.begin(); it!=mp.end(); ++it)\\n                ret.push_back(it->second);\\n            return ret;\\n        }\\n    };"
		}
	],
	"id":"314",
	"title":"Binary Tree Vertical Order Traversal",
	"content":"<p>Given a binary tree, return the <i>vertical order</i> traversal of its nodes' values. (ie, from top to bottom, column by column).</p>\r\n<p>If two nodes are in the same row and column, the order should be from <b>left to right</b>.</p>\r\n<p>\r\n<b>Examples:</b><br /></p>\r\n<p>\r\n<ol>\r\n<li>Given binary tree <code>[3,9,20,null,null,15,7]</code>,<br />\r\n<pre>\r\n   3\r\n  /\\\r\n /  \\\r\n 9  20\r\n    /\\\r\n   /  \\\r\n  15   7\r\n</pre>\r\n</p>\r\n<p>\r\nreturn its vertical order traversal as:<br />\r\n<pre>\r\n[\r\n  [9],\r\n  [3,15],\r\n  [20],\r\n  [7]\r\n]\r\n</pre>\r\n</li>\r\n\r\n<li>Given binary tree <code>[3,9,8,4,0,1,7]</code>,<br />\r\n<pre>\r\n     3\r\n    /\\\r\n   /  \\\r\n   9   8\r\n  /\\  /\\\r\n /  \\/  \\\r\n 4  01   7\r\n</pre>\r\n</p>\r\n<p>\r\nreturn its vertical order traversal as:<br />\r\n<pre>\r\n[\r\n  [4],\r\n  [9],\r\n  [3,0,1],\r\n  [8],\r\n  [7]\r\n]\r\n</pre>\r\n</li>\r\n\r\n<li>Given binary tree <code>[3,9,8,4,0,1,7,null,null,null,2,5]</code> (0's right child is 2 and 1's left child is 5),<br />\r\n<pre>\r\n     3\r\n    /\\\r\n   /  \\\r\n   9   8\r\n  /\\  /\\\r\n /  \\/  \\\r\n 4  01   7\r\n    /\\\r\n   /  \\\r\n   5   2\r\n</pre>\r\n</p>\r\n<p>\r\nreturn its vertical order traversal as:<br />\r\n<pre>\r\n[\r\n  [4],\r\n  [9,5],\r\n  [3,0,1],\r\n  [8,2],\r\n  [7]\r\n]\r\n</pre>\r\n</li>\r\n</ol>\r\n</p>",
	"frequency":"204",
	"ac_num":"38958"
}