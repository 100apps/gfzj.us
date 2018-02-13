{
	"difficulty":"2",
	"submit_num":"68379",
	"show_id":"323",
	"leetcode_id":"323",
	"answers":[
		{
			"lc_ans_id":"77574",
			"view":"13082",
			"top":"0",
			"title":"Easiest 2ms Java Solution",
			"vote":"98",
			"content":"This is 1D version of [Number of Islands II][1]. For more explanations, check out this [2D Solution][1].\\n\\n 1. `n` points = `n` islands = `n` trees = `n` roots.\\n 2. With each edge added, check which island is `e[0]` or `e[1]` belonging to.\\n 4. If `e[0]` and `e[1]` are in same islands, do nothing.\\n 5. Otherwise, **union** two islands, and  reduce islands count by `1`.\\n 6. Bonus: path compression can reduce time by `50%`.\\n\\nHope it helps!\\n\\n    public int countComponents(int n, int[][] edges) {\\n        int[] roots = new int[n];\\n        for(int i = 0; i < n; i++) roots[i] = i; \\n\\n        for(int[] e : edges) {\\n            int root1 = find(roots, e[0]);\\n            int root2 = find(roots, e[1]);\\n            if(root1 != root2) {      \\n                roots[root1] = root2;  // union\\n                n--;\\n            }\\n        }\\n        return n;\\n    }\\n\\n    public int find(int[] roots, int id) {\\n        while(roots[id] != id) {\\n            roots[id] = roots[roots[id]];  // optional: path compression\\n            id = roots[id];\\n        }\\n        return id;\\n    }\\n\\n  [1]: https://leetcode.com/discuss/69572/easiest-java-solution-with-explanations"
		},
		{
			"lc_ans_id":"77578",
			"view":"5345",
			"top":"1",
			"title":"Java concise DFS",
			"vote":"34",
			"content":"start dfsVisit with sources 0-n-1, count number of unvisited sources.\\n\\n    public class Solution {\\n        public int countComponents(int n, int[][] edges) {\\n            if (n <= 1)\\n                return n;\\n            Map<Integer, List<Integer>> map = new HashMap<>();\\n            for (int i = 0; i < n; i++) {\\n                map.put(i, new ArrayList<>());\\n            }\\n            for (int[] edge : edges) {\\n                map.get(edge[0]).add(edge[1]);\\n                map.get(edge[1]).add(edge[0]);\\n            }\\n            Set<Integer> visited = new HashSet<>();\\n            int count = 0;\\n            for (int i = 0; i < n; i++) {\\n                if (visited.add(i)) {\\n                    dfsVisit(i, map, visited);\\n                    count++;\\n                }\\n            }\\n            return count;\\n        }\\n        \\n        private void dfsVisit(int i, Map<Integer, List<Integer>> map, Set<Integer> visited) {\\n            for (int j : map.get(i)) {\\n                if (visited.add(j))\\n                    dfsVisit(j, map, visited);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"77638",
			"view":"4108",
			"top":"2",
			"title":"Python DFS, BFS, Union Find solutions",
			"vote":"24",
			"content":"DFS:\\n \\n\\n    def countComponents(n, edges):\\n            def dfs(n, g, visited):\\n                if visited[n]:\\n                    return\\n                visited[n] = 1\\n                for x in g[n]:\\n                    dfs(x, g, visited)\\n                    \\n            visited = [0] * n\\n            g = {x:[] for x in xrange(n)}\\n            for x, y in edges:\\n                g[x].append(y)\\n                g[y].append(x)\\n                \\n            ret = 0\\n            for i in xrange(n):\\n                if not visited[i]:\\n                    dfs(i, g, visited)\\n                    ret += 1\\n                    \\n            return ret\\n\\nBFS:\\n\\n    def countComponents(n, edges):\\n            g = {x:[] for x in xrange(n)}\\n            for x, y in edges:\\n                g[x].append(y)\\n                g[y].append(x)\\n                \\n            ret = 0\\n            for i in xrange(n):\\n                queue = [i]\\n                ret += 1 if i in g else 0\\n                for j in queue:\\n                    if j in g:\\n                        queue += g[j]\\n                        del g[j]\\n    \\n            return ret\\n\\nUnion Find:\\n\\n    def countComponents(n, edges):\\n            def find(x):\\n                if parent[x] != x:\\n                    parent[x] = find(parent[x])\\n                return parent[x]\\n                \\n            def union(xy):\\n                x, y = map(find, xy)\\n                if rank[x] < rank[y]:\\n                    parent[x] = y\\n                else:\\n                    parent[y] = x\\n                    if rank[x] == rank[y]:\\n                        rank[x] += 1\\n            \\n            parent, rank = range(n), [0] * n\\n            map(union, edges)\\n            return len({find(x) for x in parent})"
		},
		{
			"lc_ans_id":"77583",
			"view":"3214",
			"top":"3",
			"title":"Java Union find & DFS & BFS Code (very clean)",
			"vote":"23",
			"content":"    public class Solution {\\n        \\n        public int countComponents(int n, int[][] edges) {\\n            if (n <= 1) {\\n                return n;\\n            }\\n            int[] roots = new int[n];\\n            for (int i = 0; i < n; i++) {\\n                roots[i] = i;\\n            }\\n            for (int[] edge : edges) {\\n                int x = find(roots, edge[0]);\\n                int y = find(roots, edge[1]);\\n                if (x != y) {\\n                    roots[x] = y;\\n                    n--;\\n                }\\n            }\\n            \\n            return n;\\n        }\\n        \\n        public int find(int[] roots, int id) {\\n            int x = id;\\n            while (roots[id] != id) {\\n                id = roots[id];\\n            }\\n            while (roots[x] != id) {\\n                int fa = roots[x];\\n                roots[x] = id;\\n                x = fa;\\n            }\\n            \\n            return id;\\n        }\\n    }\\n\\n\\n\\n\\nDFS:\\n\\n    public class Solution {\\n        \\n        public int countComponents(int n, int[][] edges) {\\n            if (n <= 1) {\\n                return n;\\n            }\\n            List<List<Integer>> adjList = new ArrayList<List<Integer>>();\\n            for (int i = 0; i < n; i++) {\\n                adjList.add(new ArrayList<Integer>());\\n            }\\n            for (int[] edge : edges) {\\n                adjList.get(edge[0]).add(edge[1]);\\n                adjList.get(edge[1]).add(edge[0]);\\n            }\\n            boolean[] visited = new boolean[n];\\n            int count = 0;\\n            for (int i = 0; i < n; i++) {\\n                if (!visited[i]) {\\n                    count++;\\n                    dfs(visited, i, adjList);\\n                }\\n            }\\n            \\n            return count;\\n        }\\n        \\n        public void dfs(boolean[] visited, int index, List<List<Integer>> adjList) {\\n            visited[index] = true;\\n            for (int i : adjList.get(index)) {\\n                if (!visited[i]) {\\n                    dfs(visited, i, adjList);\\n                }\\n            }\\n        }\\n    }\\n\\n\\nBFS:\\n\\n    public class Solution {\\n        \\n        public int countComponents(int n, int[][] edges) {\\n            if (n <= 1) {\\n                return n;\\n            }\\n            List<List<Integer>> adjList = new ArrayList<List<Integer>>();\\n            for (int i = 0; i < n; i++) {\\n                adjList.add(new ArrayList<Integer>());\\n            }\\n            for (int[] edge : edges) {\\n                adjList.get(edge[0]).add(edge[1]);\\n                adjList.get(edge[1]).add(edge[0]);\\n            }\\n            boolean[] visited = new boolean[n];\\n            int count = 0;\\n            for (int i = 0; i < n; i++) {\\n                if (!visited[i]) {\\n                    count++;\\n                    Queue<Integer> queue = new LinkedList<Integer>();\\n                    queue.offer(i);\\n                    while (!queue.isEmpty()) {\\n                        int index = queue.poll();\\n                        visited[index] = true;\\n                        for (int next : adjList.get(index)) {\\n                            if (!visited[next]) {\\n                                queue.offer(next);\\n                            }\\n                        }\\n                    }\\n                }\\n            }\\n            \\n            return count;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"77584",
			"view":"6009",
			"top":"4",
			"title":"AC JAVA code, Union Find",
			"vote":"23",
			"content":"        private int[] father;\\n    public int countComponents(int n, int[][] edges) {\\n        \\n        Set<Integer> set = new HashSet<Integer>();\\n        father = new int[n];\\n        for (int i = 0; i < n; i++) {\\n            father[i] = i;\\n        }\\n        for (int i = 0; i < edges.length; i++) {\\n             union(edges[i][0], edges[i][1]);\\n        }\\n        \\n        for (int i = 0; i < n; i++){ \\n            set.add(find(i));\\n        }\\n        return set.size();\\n    }\\n    \\n    int find(int node) {\\n        if (father[node] == node) {\\n            return node;\\n        }\\n        father[node] = find(father[node]);\\n        return father[node];\\n    }\\n    \\n    void union(int node1, int node2) {\\n        father[find(node1)] = find(node2);\\n    }"
		},
		{
			"lc_ans_id":"77625",
			"view":"5315",
			"top":"5",
			"title":"Short Union-Find in Python / Ruby / C++",
			"vote":"20",
			"content":"Simple union-find with path compression.\\n\\n---\\n\\n**Python solution 1**\\n\\n    def countComponents(self, n, edges):\\n        p = range(n)\\n        def find(v):\\n            if p[v] != v:\\n                p[v] = find(p[v])\\n            return p[v]\\n        for v, w in edges:\\n            p[find(v)] = find(w)\\n        return len(set(map(find, p)))\\n\\n---\\n\\n**Python solution 2**\\n\\n    def countComponents(self, n, edges):\\n        p = range(n)\\n        def find(v):\\n            if p[v] != v:\\n                p[v] = find(p[v])\\n            return p[v]\\n        for e in edges:\\n            v, w = map(find, e)\\n            p[v] = w\\n            n -= v != w\\n        return n\\n\\n---\\n\\n**Ruby solution**\\n\\n    def count_components(n, edges)\\n      p = (0...n).to_a\\n      find = ->(v) { p[v] == v ? v : p[v] = find[p[v]] }\\n      edges.each do |v, w|\\n        v, w = find[v], find[w]\\n        p[v] = w\\n        n -= 1 if v != w\\n      end\\n      n\\n    end\\n\\n---\\n\\n**C++ solution 1**\\n\\n    int countComponents(int n, vector<pair<int, int>>& edges) {\\n        vector<int> p(n);\\n        iota(begin(p), end(p), 0);\\n        for (auto& edge : edges) {\\n            int v = edge.first, w = edge.second;\\n            while (p[v] != v) v = p[v] = p[p[v]];\\n            while (p[w] != w) w = p[w] = p[p[w]];\\n            p[v] = w;\\n            n -= v != w;\\n        }\\n        return n;\\n    }\\n\\n---\\n\\n**C++ solution 2**\\n\\n    int countComponents(int n, vector<pair<int, int>>& edges) {\\n        vector<int> p(n);\\n        iota(begin(p), end(p), 0);\\n        function<int (int)> find = [&](int v) {\\n            return p[v] == v ? v : p[v] = find(p[v]);\\n        };\\n        for (auto& edge : edges) {\\n            int v = find(edge.first), w = find(edge.second);\\n            p[v] = w;\\n            n -= v != w;\\n        }\\n        return n;\\n    }"
		},
		{
			"lc_ans_id":"77596",
			"view":"1197",
			"top":"6",
			"title":"Concise Java Union-Find with path compression",
			"vote":"10",
			"content":"The idea is very clear.  Each node is in a set of size 1 initially. Every edge would connect 2 separate sets if the nodes the edge incident to are in different sets. After processing all nodes, we count the number of nodes whose root is itself. \\n\\n    public class Solution {\\n    public int countComponents(int n, int[][] edges) {\\n        int[] root = new int[n];\\n        for(int i = 0; i < n; i++) root[i] = i;\\n        for(int[] edge : edges){\\n            int root1 = findRoot(root, edge[0]), root2 = findRoot(root, edge[1]);\\n            //Union\\n            if(root1 != root2) root[root2] = root1;\\n        }\\n        //Count components\\n        int count = 0;\\n        for(int i = 0; i < n; i++) if(root[i] == i) count++;\\n        return count;\\n    }\\n    \\n    //Find with path compression \\n    private int findRoot(int[] root, int i){\\n        while(root[i] != i){\\n            root[i] = root[root[i]];\\n            i = root[i];\\n        }\\n        return i;\\n    }\\n    \\n    \\n}"
		},
		{
			"lc_ans_id":"77660",
			"view":"1144",
			"top":"7",
			"title":"Similar to Number of Islands II, with a findRoot function",
			"vote":"6",
			"content":"Use the similar method as Number of Islands II. Use a findRoot function. See more details in https://leetcode.com/discuss/69572/easiest-java-solution-with-explanations\\n\\n\\n    public int countComponents(int n, int[][] edges) {\\n        int res = n;\\n    \\n        int[] root = new int[n];\\n        for (int i = 0; i < n; i++) {\\n            root[i] = i;\\n        }\\n        for (int[] pair : edges) {\\n            int rootX = findRoot(root, pair[0]);\\n            int rootY = findRoot(root, pair[1]);\\n            if (rootX != rootY) {\\n                root[rootY] = rootX;\\n                res--;\\n            }\\n        }\\n        return res;\\n    }\\n    public int findRoot(int[] root, int i) {\\n        while (root[i] != i) i = root[i];\\n        return i;\\n    }"
		},
		{
			"lc_ans_id":"77655",
			"view":"533",
			"top":"8",
			"title":"Clean Java Code, Union Find",
			"vote":"4",
			"content":"Basically, initialize count = n, when two unconnected node become connected, decrease count.\\n\\n    public class Solution {\\n        public int countComponents(int n, int[][] edges) {\\n            int[] nums = new int[n];\\n            Arrays.fill(nums, -1);\\n            int count = n;\\n            for (int[] e : edges) {\\n                int x = find(nums, e[0]);\\n                int y = find(nums, e[1]);\\n                if (x != y) {\\n                    nums[x] = y;\\n                    count--;\\n                }\\n            }\\n            return count;\\n        }\\n        private int find(int[] nums, int i) {\\n            if (nums[i] == -1) {\\n                return i;\\n            }\\n            return find(nums, nums[i]);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"77615",
			"view":"1494",
			"top":"9",
			"title":"C++ Solution using union-find",
			"vote":"4",
			"content":"I used union and find to see each time we add edges, I check if they belong to the same set, if so, we do nothing. Otherwise, I call union that effectively remove one set. Once we are done processing edges, we know that we can subtract the number of union from 'n' value and that is the remaining number of set.\\n\\n    vector<int> id;\\n    public:\\n    int find(int i) {\\n        while (i != id[i]) {\\n            id[i] = id[id[i]]; // compression\\n            i = id[i];\\n        }\\n        return i;\\n    }\\n    void unions(int p, int q) {\\n        int x = find(p);\\n        int y = find(q);\\n        id[x] = y;\\n    }\\n    int countComponents(int n, vector<pair<int, int>>& edges) {\\n        id.resize(n);\\n        for (int i = 0; i < n; i++) {\\n            id[i] = i;\\n        }\\n        int count = 0;\\n        for (const auto& edge: edges) {\\n            int x = find(edge.first);\\n            int y = find(edge.second);\\n            if (x != y) {\\n                unions(edge.first, edge.second);\\n                count++;\\n            }\\n        }\\n        return n-count;\\n    }"
		}
	],
	"id":"323",
	"title":"Number of Connected Components in an Undirected Graph",
	"content":"<p>\r\nGiven <code>n</code> nodes labeled from <code>0</code> to <code>n - 1</code> and a list of undirected edges (each edge is a pair of nodes), write a function to find the number of connected components in an undirected graph.\r\n</p>\r\n\r\n<p>\r\n    <b>Example 1:</b><br/>\r\n</p>\r\n<pre>\r\n     0          3\r\n     |          |\r\n     1 --- 2    4\r\n</pre>\r\n<p>\r\n    Given <code>n = 5</code> and <code>edges = [[0, 1], [1, 2], [3, 4]]</code>, return <code>2</code>.\r\n</p>\r\n<p>\r\n    <b>Example 2:</b><br/>\r\n</p>\r\n<pre>\r\n     0           4\r\n     |           |\r\n     1 --- 2 --- 3\r\n</pre>\r\n<p>\r\n    Given <code>n = 5</code> and <code>edges = [[0, 1], [1, 2], [2, 3], [3, 4]]</code>, return <code>1</code>.\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br>\r\nYou can assume that no duplicate edges will appear in <code>edges</code>. Since all edges are undirected, <code>[0, 1]</code> is the same as <code>[1, 0]</code> and thus will not appear together in <code>edges</code>.\r\n</p>",
	"frequency":"83",
	"ac_num":"33331"
}