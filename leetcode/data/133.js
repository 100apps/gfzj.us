{
	"difficulty":"2",
	"submit_num":"547178",
	"show_id":"133",
	"leetcode_id":"133",
	"answers":[
		{
			"lc_ans_id":"42309",
			"view":"33865",
			"top":"0",
			"title":"Depth First Simple Java Solution",
			"vote":"105",
			"content":"    public class Solution {\\n        private HashMap<Integer, UndirectedGraphNode> map = new HashMap<>();\\n        public UndirectedGraphNode cloneGraph(UndirectedGraphNode node) {\\n            return clone(node);\\n        }\\n    \\n        private UndirectedGraphNode clone(UndirectedGraphNode node) {\\n            if (node == null) return null;\\n            \\n            if (map.containsKey(node.label)) {\\n                return map.get(node.label);\\n            }\\n            UndirectedGraphNode clone = new UndirectedGraphNode(node.label);\\n            map.put(clone.label, clone);\\n            for (UndirectedGraphNode neighbor : node.neighbors) {\\n                clone.neighbors.add(clone(neighbor));\\n            }\\n            return clone;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"42319",
			"view":"18412",
			"top":"1",
			"title":"Simple Java iterative BFS solution with HashMap and queue",
			"vote":"67",
			"content":"Use HashMap to look up nodes and add connection to them while performing BFS.\\n\\n    public class Solution {\\n        public UndirectedGraphNode cloneGraph(UndirectedGraphNode node) {\\n            if (node == null) return null;\\n            \\n            UndirectedGraphNode newNode = new UndirectedGraphNode(node.label); //new node for return\\n            HashMap<Integer, UndirectedGraphNode> map = new HashMap(); //store visited nodes\\n            \\n            map.put(newNode.label, newNode); //add first node to HashMap\\n            \\n            LinkedList<UndirectedGraphNode> queue = new LinkedList(); //to store **original** nodes need to be visited\\n            queue.add(node); //add first **original** node to queue\\n            \\n            while (!queue.isEmpty()) { //if more nodes need to be visited\\n                UndirectedGraphNode n = queue.pop(); //search first node in the queue\\n                for (UndirectedGraphNode neighbor : n.neighbors) {\\n                    if (!map.containsKey(neighbor.label)) { //add to map and queue if this node hasn't been searched before\\n                        map.put(neighbor.label, new UndirectedGraphNode(neighbor.label));\\n                        queue.add(neighbor);\\n                    }\\n                    map.get(n.label).neighbors.add(map.get(neighbor.label)); //add neighbor to new created nodes\\n                }\\n            }\\n            \\n            return newNode;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"42313",
			"view":"8573",
			"top":"2",
			"title":"7-17 lines C++ BFS/DFS Solutions",
			"vote":"56",
			"content":"This problem is an application of graph traversal, which has two systematic methods: **Bread-First Search (BFS)** and **Depth-First Search (DFS)**. In the following, I am going to assume that you are familiar with them and just focus on what I think is the most tricky part of this problem, that is, what else is needed beyond graph traversal to clone a graph? \\n \\nIn order to clone a graph, you need to have a **copy** of each node in the original graph. Well, you may not have too many ideas about it. Let's do an example.\\n\\nSuppose we are given a graph `{0, 1 # 1, 0}`. We know that the graph has two nodes `0` and `1` and they are connected to each other.\\n\\nWe now start from `0`. We make a copy of `0`. Then we check `0`'s neighbors and we see `1`. We make a copy of `1` and we add the copy to the neighbors of the copy of `0`. Now the cloned graph is `{0 (copy), 1 (copy)}`. Then we visit `1`. We make a copy of `1`... well, wait, why do we make another copy of it? We already have one! **Note that if you make a new copy of the node, these copies are not the same and the graph structure will be wrong!** This is just what I mean by \"the most tricky part of this problem\". In fact, we need to maintain a mapping from each node to its copy. If the node has an existed copy, we simply use it. So in the above example, the remaining process is that we visit the copy of `1` and add the copy of `0` to its neighbors and the cloned graph is eventually `{0 (copy), 1 (copy) # 1 (copy), 0 (copy)}`.  \\n\\nNote that the above process uses BFS. Of course, you can use DFS. The key is the node-copy mapping, anyway.\\n\\n----------\\n**BFS**\\n\\n    class Solution {\\n    public:\\n        UndirectedGraphNode *cloneGraph(UndirectedGraphNode *node) {\\n            if (!node) return NULL;\\n            UndirectedGraphNode* copy = new UndirectedGraphNode(node -> label);\\n            mp[node] = copy;\\n            queue<UndirectedGraphNode*> toVisit;\\n            toVisit.push(node);\\n            while (!toVisit.empty()) {\\n                UndirectedGraphNode* cur = toVisit.front();\\n                toVisit.pop();\\n                for (UndirectedGraphNode* neigh : cur -> neighbors) {\\n                    if (mp.find(neigh) == mp.end()) {\\n                        UndirectedGraphNode* neigh_copy = new UndirectedGraphNode(neigh -> label);\\n                        mp[neigh] = neigh_copy;\\n                        toVisit.push(neigh);\\n                    }\\n                    mp[cur] -> neighbors.push_back(mp[neigh]);\\n                }\\n            }\\n            return copy; \\n        }\\n    private:\\n        unordered_map<UndirectedGraphNode*, UndirectedGraphNode*> mp;\\n    };\\n\\n----------\\n**DFS**\\n\\nThis very succinct DFS code is taken from [this post][1].\\n\\n    class Solution {\\n    public:\\n        UndirectedGraphNode *cloneGraph(UndirectedGraphNode *node) {\\n            if (!node) return NULL;\\n            if (mp.find(node) == mp.end()) {\\n                mp[node] = new UndirectedGraphNode(node -> label);\\n                for (UndirectedGraphNode* neigh : node -> neighbors)\\n                    mp[node] -> neighbors.push_back(cloneGraph(neigh));\\n            }\\n            return mp[node];\\n        } \\n    private:\\n        unordered_map<UndirectedGraphNode*, UndirectedGraphNode*> mp;\\n    };\\n\\nIf you want to learn more about this problem, you may refer to [this article][2].\\n\\n  [1]: https://leetcode.com/discuss/26440/9-line-c-dfs-solution\\n  [2]: http://articles.leetcode.com/2012/05/clone-graph-part-i.html"
		},
		{
			"lc_ans_id":"42362",
			"view":"9133",
			"top":"3",
			"title":"9 line c++ DFS Solution",
			"vote":"49",
			"content":"The solution is same as https://oj.leetcode.com/discuss/22244/simple-c-solution-using-dfs-and-recursion\\nI just make it shorter;\\n\\n    /**\\n    *  author : s2003zy\\n    *  weibo  : http://weibo.com/songzy982\\n    *  blog   : s2003zy.com\\n    *  date   : 2015.02.27\\n    */\\n    class Solution {\\n    public:\\n        unordered_map<UndirectedGraphNode*, UndirectedGraphNode*> hash;\\n        UndirectedGraphNode *cloneGraph(UndirectedGraphNode *node) {\\n           if (!node) return node;\\n           if(hash.find(node) == hash.end()) {\\n               hash[node] = new UndirectedGraphNode(node -> label);\\n               for (auto x : node -> neighbors) {\\n                    (hash[node] -> neighbors).push_back( cloneGraph(x) );\\n               }\\n           }\\n           return hash[node];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"42317",
			"view":"6956",
			"top":"4",
			"title":"Graph representation?",
			"vote":"36",
			"content":"Problem statement says that this is an undirected graph, but how does the adjacency list correspond to it?\\n{0,1,2#1,2#2,2}\\nmeans that adjacency list for the give graph is:\\n\\n    0   1, 2\\n    1   2\\n    2   2\\n\\nIn an undirected graph, adjacency list for 1 should contain 0 as well, and 2 should contain 0 and 1. What I would expect is:\\n\\n    0   1, 2\\n    1   2, 0\\n    2   2, 0, 1\\n\\n\\nThe  first representation looks like directed graph, because there is an edge 0->1 but not 1->0."
		},
		{
			"lc_ans_id":"42482",
			"view":"1556",
			"top":"5",
			"title":"Java BFS solution",
			"vote":"28",
			"content":"    public UndirectedGraphNode cloneGraph(UndirectedGraphNode root) {\\n      if (root == null) return null;\\n      \\n      // use a queue to help BFS\\n      Queue<UndirectedGraphNode> queue = new LinkedList<UndirectedGraphNode>();\\n      queue.add(root);\\n      \\n      // use a map to save cloned nodes\\n      Map<UndirectedGraphNode, UndirectedGraphNode> map = new HashMap<UndirectedGraphNode, UndirectedGraphNode>();\\n      \\n      // clone the root\\n      map.put(root, new UndirectedGraphNode(root.label));\\n      \\n      while (!queue.isEmpty()) {\\n        UndirectedGraphNode node = queue.poll();\\n        \\n        // handle the neighbors\\n        for (UndirectedGraphNode neighbor : node.neighbors) {\\n          if (!map.containsKey(neighbor)) {\\n            // clone the neighbor\\n            map.put(neighbor, new UndirectedGraphNode(neighbor.label));\\n            // add it to the next level\\n            queue.add(neighbor);\\n          }\\n          \\n          // copy the neighbor\\n          map.get(node).neighbors.add(map.get(neighbor));\\n        }\\n      }\\n      \\n      return map.get(root);\\n    }"
		},
		{
			"lc_ans_id":"42354",
			"view":"3571",
			"top":"6",
			"title":"Python DFS short solution",
			"vote":"23",
			"content":"Use a dictionary to store the UndirectedGraphNode\\n\\n    def cloneGraph(self, node):\\n        if not node:\\n            return node\\n        root = UndirectedGraphNode(node.label)\\n        stack = [node]\\n        visit = {}\\n        visit[node.label] = root\\n        while stack:\\n            top = stack.pop()\\n        \\n            for n in top.neighbors:\\n                if n.label not in visit:\\n                    stack.append(n)\\n                    visit[n.label] = UndirectedGraphNode(n.label)\\n                visit[top.label].neighbors.append(visit[n.label])\\n        \\n        return root"
		},
		{
			"lc_ans_id":"42314",
			"view":"3002",
			"top":"7",
			"title":"Python solutions (BFS, DFS iteratively, DFS recursively).",
			"vote":"22",
			"content":"        \\n    # BFS\\n    def cloneGraph1(self, node):\\n        if not node:\\n            return \\n        nodeCopy = UndirectedGraphNode(node.label)\\n        dic = {node: nodeCopy}\\n        queue = collections.deque([node])\\n        while queue:\\n            node = queue.popleft()\\n            for neighbor in node.neighbors:\\n                if neighbor not in dic: # neighbor is not visited\\n                    neighborCopy = UndirectedGraphNode(neighbor.label)\\n                    dic[neighbor] = neighborCopy\\n                    dic[node].neighbors.append(neighborCopy)\\n                    queue.append(neighbor)\\n                else:\\n                    dic[node].neighbors.append(dic[neighbor])\\n        return nodeCopy\\n        \\n    # DFS iteratively\\n    def cloneGraph2(self, node):\\n        if not node:\\n            return \\n        nodeCopy = UndirectedGraphNode(node.label)\\n        dic = {node: nodeCopy}\\n        stack = [node]\\n        while stack:\\n            node = stack.pop()\\n            for neighbor in node.neighbors:\\n                if neighbor not in dic:\\n                    neighborCopy = UndirectedGraphNode(neighbor.label)\\n                    dic[neighbor] = neighborCopy\\n                    dic[node].neighbors.append(neighborCopy)\\n                    stack.append(neighbor)\\n                else:\\n                    dic[node].neighbors.append(dic[neighbor])\\n        return nodeCopy\\n        \\n    # DFS recursively\\n    def cloneGraph(self, node):\\n        if not node:\\n            return \\n        nodeCopy = UndirectedGraphNode(node.label)\\n        dic = {node: nodeCopy}\\n        self.dfs(node, dic)\\n        return nodeCopy\\n        \\n    def dfs(self, node, dic):\\n        for neighbor in node.neighbors:\\n            if neighbor not in dic:\\n                neighborCopy = UndirectedGraphNode(neighbor.label)\\n                dic[neighbor] = neighborCopy\\n                dic[node].neighbors.append(neighborCopy)\\n                self.dfs(neighbor, dic)\\n            else:\\n                dic[node].neighbors.append(dic[neighbor])"
		},
		{
			"lc_ans_id":"42502",
			"view":"3417",
			"top":"8",
			"title":"Accepted recursive depth first search solution",
			"vote":"19",
			"content":"    class Solution {\\n    public:\\n    \\tUndirectedGraphNode *cloneGraph(UndirectedGraphNode *node) \\n    \\t{\\n    \\t\\t// initialize marks\\n    \\t\\tmap<int, UndirectedGraphNode*> marks;\\n    \\t\\tif (node) return dfs(node, marks);\\n    \\t\\telse return NULL;\\n    \\t}\\n    \\n    \\tUndirectedGraphNode * dfs(UndirectedGraphNode *node, map<int, UndirectedGraphNode*> & marks)\\n    \\t{\\n    \\t\\t// create new node and search its all neighbors\\n    \\t\\tUndirectedGraphNode *p;\\n    \\t\\tp = new UndirectedGraphNode(node->label);\\n    \\t\\tmarks[p->label] = p;\\n    \\n    \\t\\t// loop all neighbors\\n    \\t\\tfor(UndirectedGraphNode* n : node->neighbors)\\n    \\t\\t{\\n    \\t\\t\\t// hook already created and searched node\\n    \\t\\t\\tif(marks.count(n->label) > 0)\\n    \\t\\t\\t\\t(p->neighbors).push_back(marks[n->label]);\\n    \\t\\t\\telse\\n    \\t\\t\\t\\t(p->neighbors).push_back(dfs(n,marks));\\n    \\t\\t}\\n    \\t\\treturn p;\\n    \\t}\\n    };"
		},
		{
			"lc_ans_id":"42508",
			"view":"2606",
			"top":"9",
			"title":"Simple C++ solution using DFS and recursion.",
			"vote":"12",
			"content":"Create a new node if the node map doesn't already contain a node with this label, otherwise return the pointer to the node with that label from the node map. Add the children to new nodes recursively through BFS. \\n\\n    UndirectedGraphNode *cloneGraph(UndirectedGraphNode *node) {\\n        if(!node) return node;\\n        \\n        unordered_map<int, UndirectedGraphNode*>::iterator itr = mNodeMap.find(node->label);\\n        if(itr == mNodeMap.end()){\\n            UndirectedGraphNode* newNode = new UndirectedGraphNode(node->label);\\n            mNodeMap[node->label] = newNode;\\n            for(int i = 0; i < node->neighbors.size(); ++i){\\n                newNode->neighbors.push_back(cloneGraph(node->neighbors[i]));   \\n            }\\n            return newNode;\\n        }else{\\n            return itr->second;\\n        }\\n    }\\n    \\n    unordered_map<int, UndirectedGraphNode*> mNodeMap;"
		}
	],
	"id":"133",
	"title":"Clone Graph",
	"content":"<p>\r\nClone an undirected graph. Each node in the graph contains a <code>label</code> and a list of its <code>neighbors</code>.\r\n</p>\r\n\r\n<div>\r\n<br>\r\n<b>OJ's undirected graph serialization:</b>\r\n\r\n<p>\r\nNodes are labeled uniquely.\r\n</p>\r\n\r\nWe use <code>#</code> as a separator for each node, and <code>,</code> as a separator for node label and each neighbor of the node.\r\n</p>\r\n\r\n\r\n<p>\r\nAs an example, consider the serialized graph <code><font color=\"red\">{<font color=\"black\">0</font>,1,2#</font><font color=\"blue\"><font color=\"black\">1</font>,2#</font><font color=\"green\"><font color=\"black\">2</font>,2}</font></code>.\r\n</p>\r\n\r\n<p>\r\nThe graph has a total of three nodes, and therefore contains three parts as separated by <code>#</code>.\r\n<ol>\r\n<li>First node is labeled as <code><font color=\"black\">0</font></code>. Connect node <code><font color=\"black\">0</font></code> to both nodes <code><font color=\"red\">1</font></code> and <code><font color=\"red\">2</font></code>.</li>\r\n<li>Second node is labeled as <code><font color=\"black\">1</font></code>. Connect node <code><font color=\"black\">1</font></code> to node <code><font color=\"blue\">2</font></code>.</li>\r\n<li>Third node is labeled as <code><font color=\"black\">2</font></code>. Connect node <code><font color=\"black\">2</font></code> to node <code><font color=\"green\">2</font></code> (itself), thus forming a self-cycle.</li>\r\n</ol>\r\n</p>\r\n\r\n<p>\r\nVisually, the graph looks like the following:\r\n<pre>\r\n       1\r\n      / \\\r\n     /   \\\r\n    0 --- 2\r\n         / \\\r\n         \\_/\r\n</pre>\r\n</p>\r\n\r\n</div>",
	"frequency":"372",
	"ac_num":"137832"
}