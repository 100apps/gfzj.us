{
	"difficulty":"2",
	"submit_num":"22534",
	"show_id":"684",
	"leetcode_id":"684",
	"answers":[
		{
			"lc_ans_id":"107984",
			"view":"5848",
			"top":"0",
			"title":"10 line Java solution, Union Find.",
			"vote":"19",
			"content":"```\\nclass Solution {\\n    public int[] findRedundantConnection(int[][] edges) {\\n        int[] parent = new int[2001];\\n        for (int i = 0; i < parent.length; i++) parent[i] = i;\\n        \\n        for (int[] edge: edges){\\n            int f = edge[0], t = edge[1];\\n            if (find(parent, f) == find(parent, t)) return edge;\\n            else parent[find(parent, f)] = find(parent, t);\\n        }\\n        \\n        return new int[2];\\n    }\\n    \\n    private int find(int[] parent, int f) {\\n        if (f != parent[f]) {\\n          parent[f] = find(parent, parent[f]);  \\n        }\\n        return parent[f];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107998",
			"view":"2822",
			"top":"1",
			"title":"Why does this(Input: [[2,3],[5,2],[1,5],[4,2],[4,1]] Output: [4,2] Expected: [4,1] ) happens?",
			"vote":"16",
			"content":"@administrators \\n@contributors \\nAs the title says, my solution is not accepted. Why does this happen? I think we should remove [4,2] as my solution. What is wrong?\\n\\nInput: [[2,3],[5,2],[1,5],[4,2],[4,1]]\\nOutput: [4,2]\\nExpected: [4,1]\\n\\n```\\nclass Solution {\\npublic:\\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\\n        map<int, int> parent;\\n        for (auto e : edges) {\\n            if (parent.find(e[1]) != parent.end()) {\\n                return e; \\n            }\\n            if (parent.find(e[0]) != parent.end()) {\\n                if (parent[e[0]] == e[1])\\n                    return e;\\n            }\\n            parent[e[1]] = e[0];\\n        } \\n        set<int> root;\\n        for (auto e : edges) {\\n            if (root.find(e[1]) != root.end())\\n                return e;\\n            root.insert(e[0]);\\n        }\\n        return edges.back();\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108002",
			"view":"3645",
			"top":"2",
			"title":"Unicode-Find (5 short lines)",
			"vote":"16",
			"content":"    def findRedundantConnection(self, edges):\\n        tree = ''.join(map(chr, range(1001)))\\n        for u, v in edges:\\n            if tree[u] == tree[v]:\\n                return [u, v]\\n            tree = tree.replace(tree[u], tree[v])\\n\\nStart with each node being its own tree, then combine trees by adding the edges. The first (and only) edge closing a loop is the last edge in that loop, which is the edge we must return.\\n\\nMy `tree[u]` denotes the tree of node `u`. I use a string because it has a convenient and fast `replace` method. My title is of course a pun on [Union-Find](https://en.wikipedia.org/wiki/Disjoint-set_data_structure)."
		},
		{
			"lc_ans_id":"107990",
			"view":"891",
			"top":"3",
			"title":"Python 52ms DFS Algorithm with Explanations (compared with 52ms union-find)",
			"vote":"7",
			"content":"The algorithm based on the following fact in graph theory:\\n\\n**a simple connected graph with no cycle is a tree**.\\n\\nThe statement of the problem guarantees that by deleting one and only one edge the graph is a tree, so we know it is connected and has one cycle. Our goal is to find the edge in this cycle with the largest index and return it.\\n\\nHow? DFS!\\n\\nWe store the graph in a dictionary `e` so that we can easily find adjacent vertices. `indices` helps me keep track of the original indices of edges in `edges`. `path` is to record the fact that we arrive at a vertex `v` from `path[v]`.\\n\\nWhen constructing `e`, we already get rid of the 2-cycle case by\\n```\\n            if p[1] in e[p[0]]:\\n                return p\\n```\\nso in DFS, we only focus on cycles whose length >= 3. Since the graph is connected, we will find the cycle wherever we start. Pick one randomly (i.e., `e.keys()[0]`) and set off!\\n\\nIn `DFS(v)`: \\n1) Look at all vertices 'w' adjacent to v such that the predecessor of `v` in DFS path is not `w` (otherwise it would be a two-vertex infinite loop, and we know there is no 2-cycle).\\n\\n2) If `path[w] != 0`, means `w` is on the current DFS path! The cycle is found and just need to make the change `path[w] = v` to complete the cycle and return the result.\\n\\n3) Standard DFS things: we record down the path in `path` and after DFS change it back to 0 state.\\n\\n4) It is possible that the DFS path goes into a dead end, so in a branch of DFS, it is possible that nothing is returned. We respect this possibility and do the check\\n```\\n                temp = DFS(w)\\n                if temp:\\n                    return temp\\n```\\nThe function `Result` is just a practice of typing once we have `indices` which indicates the corresponding indices for edges.\\n\\nMy thought is pretty natural besides the fact that for this problem union-find is a method much easier to type up (and could be as fast). Anyway, here is my DFS algorithm:\\n\\n```\\n        def Result(w):  # given w is a vertex in a cycle, find the edge with the largest index in this cycle\\n            prev, curr =w, path[w]\\n            M = indices[(curr, prev)]\\n            while curr != w:\\n                prev, curr = curr, path[curr]\\n                M = max(M,indices[(curr, prev)])\\n\\n            return edges[M]\\n        \\n        def DFS(v):\\n            for w in e[v]:\\n                if path[v] == w:  # if predecessor of v is w, it's bad\\n                    continue\\n\\n                if path[w] != 0:  # the cycle is found\\n                    path[w] = v   # complete the cycle\\n                    return Result(w)\\n\\n                path[w] = v\\n                temp = DFS(w)\\n                if temp:          # in case it is a dead end and returns nothing\\n                    return temp\\n                path[w] = 0\\n        \\n        e = collections.defaultdict(set)  # e[x] is the set of all vertices adjacent to x\\n        indices = {}                      # key is edge, value is indices in the list 'edges'\\n        for i,p in enumerate(edges):\\n            if p[1] in e[p[0]]:\\n                return p                  # if one edge appears twice in 'edges', return tha latter one\\n            e[p[0]].add(p[1])\\n            e[p[1]].add(p[0])\\n            indices[(p[0],p[1])] = indices[(p[1],p[0])] = i\\n\\n        path = {x:0 for x in e}           # record the path in DFS\\n        return DFS(e.keys()[0])\\n```\\nMy union-find algorithm with best time performance:\\n```\\n        def find(v):                         # find the root of the tree\\n            return find(parent[v]) if v in parent else v\\n\\n        parent = {}                          # record the child: parent relation in the forest\\n        for i,p in enumerate(edges):\\n            r1, r2 = map(find, p)\\n            if r1 == r2:\\n                return p\\n            else:\\n                parent[r1] = parent[r2] = str(i) # use str(i) as the tree label\\n```"
		},
		{
			"lc_ans_id":"108003",
			"view":"2060",
			"top":"4",
			"title":"Problem is wrong. Check is test case, it is obviously not a tree even after the edge is deleted.",
			"vote":"7",
			"content":"The test cases obviously don't follow the problem statement.\\n![0_1506222486182_f718dd0c-fa5e-4a69-8017-79d67663c7c4-image.png](/assets/uploads/files/1506222488258-f718dd0c-fa5e-4a69-8017-79d67663c7c4-image-resized.png) \\ncheck this, is this really a tree even after the [4,3] is deleted?\\nRequest to remove the point of this problem from contest.\\n@administrators \\n@contributors"
		},
		{
			"lc_ans_id":"107987",
			"view":"95",
			"top":"5",
			"title":"A completely difference approach: recursively remove leaf nodes to uncover the cycle in the graph",
			"vote":"2",
			"content":"Although union-find is a natural fit to this problem, I find there is another way to tackle this problem which is also intuitive and easy to understand. That is, `we can recursively remove leaf nodes from the graph to uncover the cycle existing in the graph.` A leaf node in an undirected graph is defined as `a node that is has only one adjacent neighbor.` For example, consider the following graph:\\n                                 \\n               1 \\u2014\\u2014\\u2014 2 \\n                \\\\   /\\n                  3 \\u2014\\u2014 4\\n`node 4` would be a leaf node.\\nBefore removing the leaf node, the graph is:\\n1: 2, 3\\n2: 1,3\\n3: 1,2,4\\n4: 3\\nBefore removing the leaf node, the graph becomes:\\n1: 2, 3\\n2: 1,3\\n3: 1,2\\n\\nSince now the graph only contains cycle, it's straightforward to find the answer.\\nBelow is my C++ code to implement this:\\n```\\nclass Solution {\\nprivate:\\n  void uncoverCycle(unordered_map<int, unordered_set<int>>& graph) {\\n    int n = graph.size();\\n    vector<int> remove = {};\\n    for (auto& kv : graph) {\\n      int node = kv.first;\\n      auto& adjlist = kv.second;\\n      if (adjlist.size() == 1) { // leaf node\\n        remove.push_back(node);\\n        auto it = adjlist.begin();\\n        graph[*it].erase(node);\\n      }\\n    }\\n\\n    if (remove.empty()) return;\\n    else {\\n      for (int node : remove) graph.erase(node);\\n      uncoverCycle(graph);\\n    }\\n  }\\n\\npublic:\\n  vector<int> findRedundantConnection(vector<vector<int>>& edges) {\\n    int n = edges.size();\\n    unordered_map<int, unordered_set<int>> graph;\\n    for (int i = 0; i < n; ++i) { // undirected graph\\n      graph[edges[i][0]].insert(edges[i][1]);\\n      graph[edges[i][1]].insert(edges[i][0]);\\n    }\\n\\n    // recursively remove leaf nodes to uncover the cycle\\n    uncoverCycle(graph);\\n\\n    for (int i = n - 1; i >= 0; --i) {\\n      if (graph.count(edges[i][0]) && graph.count(edges[i][1])) return edges[i];\\n    }\\n\\n    return {};\\n  }\\n};\\n```"
		},
		{
			"lc_ans_id":"108015",
			"view":"213",
			"top":"6",
			"title":"Why does this test case [[2,3],[5,3],[2,1],[5,4],[3,2]] expects [5,3]? I don't understand...",
			"vote":"2",
			"content":"If [5,3] is removed, [2,3] and [3,2] forms a cycle, doesn't it?"
		},
		{
			"lc_ans_id":"108038",
			"view":"194",
			"top":"7",
			"title":"I can't understand { { 2,3 },{ 5,2 },{ 1,5 },{ 4,2 },{ 4,1 } } case.",
			"vote":"2",
			"content":"I can't understand { { 2,3 },{ 5,2 },{ 1,5 },{ 4,2 },{ 4,1 } } case.\\nProblem say \"each element pair [u, v] represents that v is a child of u in the tree. \"\\n\\nAt step 2, 2 have already parent 5.\\nbut, Step 4 represent 4 is parent of 4.\\n\\nI think if I erase only step4, tree is perpect.\\nwhy answer said erase step 5?"
		},
		{
			"lc_ans_id":"108010",
			"view":"250",
			"top":"8",
			"title":"C++ solution  using union find",
			"vote":"1",
			"content":"O(n) time union find solution\\n```\\nclass Solution {\\npublic:\\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\\n        vector<int> p(2000, 0);\\n        for(int i = 0; i < p.size(); i++ )\\n            p[i] = i;\\n        \\n        vector<int> res;\\n        for(auto v : edges ){\\n            int n1 = v[0], n2 = v[1];\\n            while(n1 != p[n1]) n1 = p[n1];\\n            while(n2 != p[n2]) n2 = p[n2];\\n            if( n1 == n2 )\\n                res = v;\\n            else\\n                p[n1] = n2;\\n        }\\n        return res;\\n    }\\n};\\n````"
		},
		{
			"lc_ans_id":"108013",
			"view":"617",
			"top":"9",
			"title":"C++, Union Find",
			"vote":"1",
			"content":"One of the test case is definitely not tree. I think the answer is to find acyclic connect graph, in which a node could have more than one parents.\\n```\\nclass Solution {\\npublic:\\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\\n        vector<int> parent;\\n        for (int i = 0; i < 2001; i++) parent.push_back(i);\\n        for (auto edge:edges) { \\n            int pa = root(parent, edge[0]), pb = root(parent, edge[1]);\\n            if (pa == pb) return edge; //already connected\\n            parent[pb] = pa;\\n        }\\n        return vector<int>(0, 0);\\n    }\\nprivate:\\n    int root(vector<int>& parent, int k) {\\n        if (parent[k] != k) \\n            parent[k] = root(parent, parent[k]); // path compression\\n        return parent[k];\\n    }\\n};\\n```"
		}
	],
	"id":"661",
	"title":"Redundant Connection",
	"content":"<p>\r\nIn this problem, a tree is an <b>undirected</b> graph that is connected and has no cycles.\r\n</p><p>\r\nThe given input is a graph that started as a tree with N nodes (with distinct values 1, 2, ..., N), with one additional edge added.  The added edge has two different vertices chosen from 1 to N, and was not an edge that already existed.\r\n</p><p>\r\nThe resulting graph is given as a 2D-array of <code>edges</code>.  Each element of <code>edges</code> is a pair <code>[u, v]</code> with <code>u < v</code>, that represents an <b>undirected</b> edge connecting nodes <code>u</code> and <code>v</code>.\r\n</p><p>\r\nReturn an edge that can be removed so that the resulting graph is a tree of N nodes.  If there are multiple answers, return the answer that occurs last in the given 2D-array.  The answer edge <code>[u, v]</code> should be in the same format, with <code>u < v</code>.\r\n</p><p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [[1,2], [1,3], [2,3]]\r\n<b>Output:</b> [2,3]\r\n<b>Explanation:</b> The given undirected graph will be like this:\r\n  1\r\n / \\\r\n2 - 3\r\n</pre>\r\n</p>\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [[1,2], [2,3], [3,4], [1,4], [1,5]]\r\n<b>Output:</b> [1,4]\r\n<b>Explanation:</b> The given undirected graph will be like this:\r\n5 - 1 - 2\r\n    |   |\r\n    4 - 3\r\n</pre>\r\n</p>\r\n<p><b>Note:</b><br />\r\n<li>The size of the input 2D-array will be between 3 and 1000.</li>\r\n<li>Every integer represented in the 2D-array will be between 1 and N, where N is the size of the input array.</li>\r\n</p>\r\n\r\n<br />\r\n\r\n<p>\r\n<b><font color=\"red\">Update (2017-09-26):</font></b><br>\r\nWe have overhauled the problem description + test cases and specified clearly the graph is an <b><i>undirected</i></b> graph. For the <b><i>directed</i></b> graph follow up please see <b><a href=\"https://leetcode.com/problems/redundant-connection-ii/description/\">Redundant Connection II</a></b>). We apologize for any inconvenience caused.\r\n</p>",
	"frequency":"82",
	"ac_num":"9609"
}