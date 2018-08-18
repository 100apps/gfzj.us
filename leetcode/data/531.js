{
	"difficulty":"2",
	"submit_num":"59051",
	"show_id":"547",
	"leetcode_id":"547",
	"answers":[
		{
			"lc_ans_id":"101338",
			"view":"12380",
			"top":"0",
			"title":"Neat DFS java solution",
			"vote":"42",
			"content":"```\\npublic class Solution {\\n    public void dfs(int[][] M, int[] visited, int i) {\\n        for (int j = 0; j < M.length; j++) {\\n            if (M[i][j] == 1 && visited[j] == 0) {\\n                visited[j] = 1;\\n                dfs(M, visited, j);\\n            }\\n        }\\n    }\\n    public int findCircleNum(int[][] M) {\\n        int[] visited = new int[M.length];\\n        int count = 0;\\n        for (int i = 0; i < M.length; i++) {\\n            if (visited[i] == 0) {\\n                dfs(M, visited, i);\\n                count++;\\n            }\\n        }\\n        return count;\\n    }\\n}"
		},
		{
			"lc_ans_id":"101336",
			"view":"10711",
			"top":"1",
			"title":"Java solution, Union Find",
			"vote":"34",
			"content":"This is a typical ```Union Find``` problem. I abstracted it as a standalone class. Remember the template, you will be able to use it later.\\n```\\npublic class Solution {\\n    class UnionFind {\\n        private int count = 0;\\n        private int[] parent, rank;\\n        \\n        public UnionFind(int n) {\\n            count = n;\\n            parent = new int[n];\\n            rank = new int[n];\\n            for (int i = 0; i < n; i++) {\\n                parent[i] = i;\\n            }\\n        }\\n        \\n        public int find(int p) {\\n        \\twhile (p != parent[p]) {\\n                parent[p] = parent[parent[p]];    // path compression by halving\\n                p = parent[p];\\n            }\\n            return p;\\n        }\\n        \\n        public void union(int p, int q) {\\n            int rootP = find(p);\\n            int rootQ = find(q);\\n            if (rootP == rootQ) return;\\n            if (rank[rootQ] > rank[rootP]) {\\n                parent[rootP] = rootQ;\\n            }\\n            else {\\n                parent[rootQ] = rootP;\\n                if (rank[rootP] == rank[rootQ]) {\\n                    rank[rootP]++;\\n                }\\n            }\\n            count--;\\n        }\\n        \\n        public int count() {\\n            return count;\\n        }\\n    }\\n    \\n    public int findCircleNum(int[][] M) {\\n        int n = M.length;\\n        UnionFind uf = new UnionFind(n);\\n        for (int i = 0; i < n - 1; i++) {\\n            for (int j = i + 1; j < n; j++) {\\n                if (M[i][j] == 1) uf.union(i, j);\\n            }\\n        }\\n        return uf.count();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101340",
			"view":"4357",
			"top":"2",
			"title":"Oneliners :-P",
			"vote":"18",
			"content":"Solution 1, using a SciPy function:\\n```\\nimport scipy.sparse\\n\\nclass Solution(object):\\n    def findCircleNum(self, M):\\n        return scipy.sparse.csgraph.connected_components(M)[0]\\n```\\n\\nSolution 2, compute the transitive closure of the (boolean) matrix and count the number of different rows:\\n```\\nimport numpy as np\\n\\nclass Solution(object):\\n    def findCircleNum(self, M):\\n        return len(set(map(tuple, (np.matrix(M, dtype='bool')**len(M)).A)))\\n```"
		},
		{
			"lc_ans_id":"101349",
			"view":"4642",
			"top":"3",
			"title":"Python, Simple Explanation",
			"vote":"11",
			"content":"From some source, we can visit every connected node to it with a simple DFS.  As is the case with DFS's, **seen** will keep track of nodes that have been visited.  \\n\\nFor every node, we can visit every node connected to it with this DFS, and increment our answer as that represents one friend circle (connected component.)\\n\\n```\\ndef findCircleNum(self, A):\\n    N = len(A)\\n    seen = set()\\n    def dfs(node):\\n        for nei, adj in enumerate(A[node]):\\n            if adj and nei not in seen:\\n                seen.add(nei)\\n                dfs(nei)\\n    \\n    ans = 0\\n    for i in xrange(N):\\n        if i not in seen:\\n            dfs(i)\\n            ans += 1\\n    return ans\\n```"
		},
		{
			"lc_ans_id":"101354",
			"view":"5074",
			"top":"4",
			"title":"[C++] Clean Code - DFS|UnionFind",
			"vote":"9",
			"content":"**DFS**\\n```\\nclass Solution {\\npublic:\\n    int findCircleNum(vector<vector<int>>& M) {\\n        if (M.empty()) return 0;\\n        int n = M.size();\\n        vector<bool> visited(n, false);\\n        int groups = 0;\\n        for (int i = 0; i < visited.size(); i++) {\\n            groups += dfs(i, M, visited) > 0;\\n        }\\n        return groups;\\n    }\\n\\nprivate:\\n    int dfs(int i, vector<vector<int>>& M, vector<bool>& visited) {\\n        if (visited[i]) {\\n            return 0;\\n        }\\n\\n        int ppl = 1;\\n        visited[i] = true;\\n        for (int j = 0; j < visited.size(); j++) {\\n            if (i != j && M[i][j]) {\\n                ppl += dfs(j, M, visited);\\n            }\\n        }\\n\\n        return ppl;\\n    }\\n};\\n```\\n\\nCould be shorter. If the dfs() doesn't care how many people in each group;\\n```\\nclass Solution {\\npublic:\\n    int findCircleNum(vector<vector<int>>& M) {\\n        if (M.empty()) return 0;\\n        int n = M.size();\\n        vector<bool> visited(n, false);\\n        int groups = 0;\\n        for (int i = 0; i < visited.size(); i++) {\\n            groups += !visited[i] ? dfs(i, M, visited), 1 : 0;\\n        }\\n        return groups;\\n    }\\n\\nprivate:\\n    void dfs(int i, vector<vector<int>>& M, vector<bool>& visited) {\\n        visited[i] = true;\\n        for (int j = 0; j < visited.size(); j++) {\\n            if (i != j && M[i][j] && !visited[j]) {\\n                dfs(j, M, visited);\\n            }\\n        }\\n    }\\n};\\n```\\n**UnionFind**\\n```\\nclass Solution {\\npublic:\\n    int findCircleNum(vector<vector<int>>& M) {\\n        if (M.empty()) return 0;\\n        int n = M.size();\\n\\n        vector<int> leads(n, 0);\\n        for (int i = 0; i < n; i++) { leads[i] = i; }   // initialize leads for every kid as themselves\\n\\n        int groups = n;\\n        for (int i = 0; i < n; i++) {\\n            for (int j = i + 1; j < n; j++) {   // avoid recalculate M[i][j], M[j][i]\\n                if (M[i][j]) {\\n                    int lead1 = find(i, leads);\\n                    int lead2 = find(j, leads);\\n                    if (lead1 != lead2) {       // if 2 group belongs 2 different leads, merge 2 group to 1\\n                        leads[lead1] = lead2;\\n                        groups--;\\n                    }\\n                }\\n            }\\n        }\\n        return groups;\\n    }\\n\\nprivate:\\n    int find(int x, vector<int>& parents) {\\n        return parents[x] == x ? x : find(parents[x], parents);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"101344",
			"view":"1690",
			"top":"5",
			"title":"Java BFS - Equivalent to Finding Connected Components in a Graph",
			"vote":"5",
			"content":"```\\npublic int findCircleNum(int[][] M) {\\n    int count = 0;\\n    for (int i=0; i<M.length; i++)\\n        if (M[i][i] == 1) { count++; BFS(i, M); }\\n    return count;\\n}\\n\\npublic void BFS(int student, int[][] M) {\\n    Queue<Integer> queue = new LinkedList<>();\\n    queue.add(student);\\n    while (queue.size() > 0) {\\n        int queueSize = queue.size();\\n        for (int i=0;i<queueSize;i++) {\\n            int j = queue.poll();\\n            M[j][j] = 2; // marks as visited\\n            for (int k=0;k<M[0].length;k++) \\n                if (M[j][k] == 1 && M[k][k] == 1) queue.add(k);\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101387",
			"view":"354",
			"top":"6",
			"title":"Easy Java Union Find Solution",
			"vote":"3",
			"content":"```\\npublic class Solution {\\n    public int findCircleNum(int[][] M) {\\n        int count = M.length;\\n        int[] root = new int[M.length];\\n        for(int i=0;i<M.length;i++){\\n            root[i] =i;\\n        }\\n        for(int i=0;i<M.length;i++){\\n            for(int j=0;j<M[0].length;j++){\\n                if(M[i][j]==1){\\n                    int rooti = findRoot(root,i);\\n                    int rootj = findRoot(root,j);\\n                    if(rooti!=rootj){\\n                        root[rooti] = rootj;\\n                        count--;\\n                    }\\n                }\\n            }\\n        }\\n        return count;\\n    }\\n    public int findRoot(int[] roots,int id){\\n        while(roots[id]!=id){\\n            roots[id] = roots[roots[id]];\\n            id = roots[id];\\n        }\\n        return id;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101476",
			"view":"613",
			"top":"7",
			"title":"python solution using union find",
			"vote":"3",
			"content":"This question is similar to Number of Connected Components in an Undirected Graph\\n\\nsee this for union find explanation: https://youtu.be/ID00PMy0-vE\\n\\n```\\nclass Solution(object):\\n    def findCircleNum(self, M):\\n        \"\"\"\\n        :type M: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        ds = DisjointSet()\\n\\n        for i in range(len(M)):\\n            ds.make_set(i)\\n\\n        for i in range(len(M)):\\n            for j in range(len(M)):\\n                if M[i][j] == 1:\\n                    ds.union(i, j)\\n\\n        return ds.num_sets\\n\\nclass Node(object):\\n    def __init__(self, data, parent=None, rank=0):\\n        self.data = data\\n        self.parent = parent\\n        self.rank = rank\\n\\nclass DisjointSet(object):\\n    def __init__(self):\\n        self.map = {}\\n        self.num_sets = 0\\n\\n    def make_set(self, data):\\n        node = Node(data)\\n        node.parent = node\\n        self.map[data] = node\\n        self.num_sets += 1\\n\\n    def union(self, data1, data2):\\n        node1 = self.map[data1]\\n        node2 = self.map[data2]\\n\\n        parent1 = self.find_set_util(node1)\\n        parent2 = self.find_set_util(node2)\\n\\n        if parent1.data == parent2.data:\\n            return\\n\\n        if parent1.rank >= parent2.rank:\\n            if parent1.rank == parent2.rank:\\n                parent1.rank += 1\\n            parent2.parent = parent1\\n        else:\\n            parent1.parent = parent2\\n\\n        self.num_sets -= 1\\n\\n\\n    def find_set(self, data):\\n        return self.find_set_util(self.map[data])\\n\\n    def find_set_util(self, node):\\n        parent = node.parent\\n        if parent == node:\\n            return parent\\n\\n        node.parent = self.find_set_util(node.parent) # path compression\\n        return node.parent\\n```"
		},
		{
			"lc_ans_id":"101357",
			"view":"254",
			"top":"8",
			"title":"The problem description is quite confusing isn't it?",
			"vote":"2",
			"content":"The matrix representation is a bit confusing by looking at it. It appears to be asking to number the disjoint sets in the graph. But what it actually asks is who are forming a single disjoint set and how many disjoint sets are there. M[i][i] can simply be ignored. M[i][j] means i and j are connected."
		},
		{
			"lc_ans_id":"101378",
			"view":"115",
			"top":"9",
			"title":"C# Solution",
			"vote":"2",
			"content":"```\\npublic int FindCircleNum(int[,] M) {\\n        int result = 0;\\n        bool[] visited = new bool[M.GetLength(0)];\\n        \\n        for (int i = 0; i <= M.GetLength(0) - 1; i++)\\n            if(!visited[i])\\n            {\\n                DFS(i, M, visited);\\n                result++;\\n            }\\n            \\n        return result;\\n    }\\n    \\n    private void DFS(int startNode, int[,] graph, bool[] visited)\\n    {\\n        visited[startNode] = true;\\n        \\n        for (int i = 0; i <= graph.GetLength(1) - 1; i++)\\n        {\\n            if (startNode == i)\\n                continue;\\n            \\n            if (graph[startNode, i] == 1 && !visited[i])\\n                DFS(i, graph, visited);\\n        }\\n    }"
		}
	],
	"id":"531",
	"title":"Friend Circles",
	"content":"<p>\r\nThere are <b>N</b> students in a class. Some of them are friends, while some are not. Their friendship is transitive in nature. For example, if A is a <b>direct</b> friend of B, and B is a <b>direct</b> friend of C, then A is an <b>indirect</b> friend of C. And we defined a friend circle is a group of students who are direct or indirect friends.\r\n</p>\r\n\r\n<p>\r\nGiven a <b>N*N</b> matrix <b>M</b> representing the friend relationship between students in the class. If M[i][j] = 1, then the i<sub>th</sub> and j<sub>th</sub> students are <b>direct</b> friends with each other, otherwise not. And you have to output the total number of friend circles among all the students.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n[[1,1,0],\r\n [1,1,0],\r\n [0,0,1]]\r\n<b>Output:</b> 2\r\n<b>Explanation:</b>The 0<sub>th</sub> and 1<sub>st</sub> students are direct friends, so they are in a friend circle. <br/>The 2<sub>nd</sub> student himself is in a friend circle. So return 2.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n[[1,1,0],\r\n [1,1,1],\r\n [0,1,1]]\r\n<b>Output:</b> 1\r\n<b>Explanation:</b>The 0<sub>th</sub> and 1<sub>st</sub> students are direct friends, the 1<sub>st</sub> and 2<sub>nd</sub> students are direct friends, <br/>so the 0<sub>th</sub> and 2<sub>nd</sub> students are indirect friends. All of them are in the same friend circle, so return 1.\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>N is in range [1,200].</li>\r\n<li>M[i][i] = 1 for all students.</li>\r\n<li>If M[i][j] = 1, then M[j][i] = 1.</li>\r\n</ol>\r\n</p>",
	"frequency":"304",
	"ac_num":"29054"
}