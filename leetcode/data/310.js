{
	"difficulty":"2",
	"submit_num":"140460",
	"show_id":"310",
	"leetcode_id":"310",
	"answers":[
		{
			"lc_ans_id":"76055",
			"view":"46709",
			"top":"0",
			"title":"Share some thoughts",
			"vote":"427",
			"content":"**See [here for a better view](http://algobox.org/minimum-height-trees/)**\\n\\nFirst let's review some statement for tree in graph theory:\\n\\n> (1) A tree is an undirected graph in which any two vertices are\\n> connected by exactly one path.\\n> \\n> (2) Any connected graph who has `n` nodes with `n-1` edges is a tree.\\n> \\n> (3) The degree of a vertex of a graph is the number of\\n> edges incident to the vertex.\\n> \\n> (4) A leaf is a vertex of degree 1. An internal vertex is a vertex of\\n> degree at least 2.\\n> \\n> (5) A path graph is a tree with two or more vertices that is not\\n> branched at all.\\n> \\n> (6) A tree is called a rooted tree if one vertex has been designated\\n> the root.\\n> \\n> (7) The height of a rooted tree is the number of edges on the longest\\n> downward path between root and a leaf.\\n\\nOK. Let's stop here and look at our problem.\\n\\nOur problem want us to find the minimum height trees and return their root labels. First we can think about a simple case -- a path graph.\\n\\nFor a path graph of `n` nodes, find the minimum height trees is trivial. Just designate the middle point(s) as roots.\\n\\nDespite its triviality, let design a algorithm to find them.\\n\\nSuppose we don't know `n`, nor do we have random access of the nodes. We have to traversal. It is very easy to get the idea of two pointers. One from each end and move at the same speed. When they meet or they are one step away, (depends on the parity of `n`), we have the roots we want.\\n\\nThis gives us a lot of useful ideas to crack our real problem.\\n\\nFor a tree we can do some thing similar. We start from every end, by end we mean vertex of degree 1 (aka leaves). We let the pointers move the same speed. When two pointers meet, we keep only one of them, until the last two pointers meet or one step away we then find the roots.\\n\\nIt is easy to see that the last two pointers are from the two ends of the longest path in the graph.\\n\\nThe actual implementation is similar to the BFS topological sort. Remove the leaves, update the degrees of inner vertexes. Then remove the new leaves. Doing so level by level until there are 2 or 1 nodes left. What's left is our answer!\\n\\nThe time complexity and space complexity are both O(n). \\n\\nNote that for a tree we always have `V = n`, `E = n-1`.\\n\\n\\n**Java**\\n\\n    public List<Integer> findMinHeightTrees(int n, int[][] edges) {\\n        if (n == 1) return Collections.singletonList(0);\\n\\n        List<Set<Integer>> adj = new ArrayList<>(n);\\n        for (int i = 0; i < n; ++i) adj.add(new HashSet<>());\\n        for (int[] edge : edges) {\\n            adj.get(edge[0]).add(edge[1]);\\n            adj.get(edge[1]).add(edge[0]);\\n        }\\n\\n        List<Integer> leaves = new ArrayList<>();\\n        for (int i = 0; i < n; ++i)\\n            if (adj.get(i).size() == 1) leaves.add(i);\\n\\n        while (n > 2) {\\n            n -= leaves.size();\\n            List<Integer> newLeaves = new ArrayList<>();\\n            for (int i : leaves) {\\n                int j = adj.get(i).iterator().next();\\n                adj.get(j).remove(i);\\n                if (adj.get(j).size() == 1) newLeaves.add(j);\\n            }\\n            leaves = newLeaves;\\n        }\\n        return leaves;\\n    }\\n\\t\\n    // Runtime: 53 ms\\n\\n**Python**\\n\\n    def findMinHeightTrees(self, n, edges):\\n        if n == 1: return [0] \\n        adj = [set() for _ in xrange(n)]\\n        for i, j in edges:\\n            adj[i].add(j)\\n            adj[j].add(i)\\n\\n        leaves = [i for i in xrange(n) if len(adj[i]) == 1]\\n\\n        while n > 2:\\n            n -= len(leaves)\\n            newLeaves = []\\n            for i in leaves:\\n                j = adj[i].pop()\\n                adj[j].remove(i)\\n                if len(adj[j]) == 1: newLeaves.append(j)\\n            leaves = newLeaves\\n        return leaves\\n\\t\\t\\n    # Runtime : 104ms"
		},
		{
			"lc_ans_id":"76052",
			"view":"21926",
			"top":"1",
			"title":"Two O(n) solutions",
			"vote":"88",
			"content":"I am sharing two of my solutions, one is based on the longest path, and the other is related to Tree DP.\\n\\n**Longest Path**\\n\\nIt is easy to see that the root of an MHT has to be the middle point (or two middle points) of the longest path of the tree.\\nThough multiple longest paths can appear in an unrooted tree, they must share the same middle point(s).\\n\\nComputing the longest path of a unrooted tree can be done, in O(n) time, by tree dp, or simply 2 tree traversals (dfs or bfs).\\nThe following is some thought of the latter.\\n\\nRandomly select a node x as the root, do a dfs/bfs to find the node y that has the longest distance from x.\\nThen y must be one of the endpoints on some longest path.\\nLet y the new root, and do another dfs/bfs. Find the node z that has the longest distance from y.\\n\\nNow, the path from y to z is the longest one, and thus its middle point(s) is the answer. [Java Solution][1]\\n\\n\\n**Tree DP**\\n\\nAlternatively, one can solve this problem directly by tree dp.\\nLet dp[i] be the height of the tree when the tree root is i.\\nWe compute dp[0] ... dp[n - 1] by tree dp in a dfs manner.\\n\\nArbitrarily pick a node, say node 0, as the root, and do a dfs.\\nWhen we reach a node u, and let T be the subtree by removing all u's descendant (see the right figure below).\\nWe maintain a variable acc that keeps track of the length of the longest path in T with one endpoint being u.\\nThen dp[u] = max(height[u], acc)\\nNote, acc is 0 for the root of the tree.\\n\\n                 |                 |\\n                 .                 .\\n                /|\\\\               /|\\\\\\n               * u *             * u *\\n                /|\\\\\\n               / | \\\\\\n              *  v  *\\n\\n. denotes a single node, and * denotes a subtree (possibly empty).\\n\\nNow it remains to calculate the new acc for any of u's child, v.\\nIt is easy to see that the new acc is the max of the following\\n \\n 1. acc + 1 --- extend the previous path by edge uv;\\n 2. max(height[v'] + 2), where v != v' --- see below for an example.\\n \\n\\n                 u\\n                /|\\n               / |\\n              v' v\\n              |\\n              .\\n              .\\n              .\\n              |\\n              .\\n\\nIn fact, the second case can be computed in O(1) time instead of spending a time proportional to the degree of u.\\nOtherwise, the runtime can be quadratic when the degree of some node is Omega(n).\\nThe trick here is to maintain two heights of each node, the largest height (the conventional height), and the second largest height\\n(the height of the node after removing the branch w.r.t. the largest height).\\n\\nTherefore, after the dfs, all dp[i]'s are computed, and the problem can be answered trivially.\\nThe total runtime is still O(n). [Java Solution][2]\\n\\n\\n  [1]: https://github.com/lydxlx1/LeetCode/blob/master/src/_310.java\\n  [2]: https://github.com/lydxlx1/LeetCode/blob/master/src/_310_1.java"
		},
		{
			"lc_ans_id":"76104",
			"view":"10436",
			"top":"2",
			"title":"C++ Solution. O(n)-Time, O(n)-Space",
			"vote":"41",
			"content":"The basic idea is **\"keep deleting leaves layer-by-layer, until reach the root.\"**\\n\\nSpecifically, first find all the leaves, then remove them. After removing, some nodes will become new leaves. So we can continue remove them. Eventually, there is only 1 or 2 nodes left.  If there is only one node left, it is the root. If there are 2 nodes, either of them could be a possible root.\\n\\n**Time Complexity**: Since each node will be removed at most once, the complexity is **O(n)**.\\n\\nThanks for pointing out any mistakes.\\n\\n----\\n*Updates:\\nMore precisely, if the number of nodes is V, and the number of edges is E. The space complexity is O(V+2E), for storing the whole tree. The time complexity is O(E), because we gradually remove all the neighboring information. As some friends pointing out,  for a tree, if V=n, then E=n-1. Thus both time complexity and space complexity become O(n).*\\n\\n        class Solution {\\n        public:\\n            \\n            struct Node\\n            {\\n                unordered_set<int> neighbor;\\n                bool isLeaf()const{return neighbor.size()==1;}\\n            };\\n            \\n            vector<int> findMinHeightTrees(int n, vector<pair<int, int>>& edges) {\\n                \\n                vector<int> buffer1;\\n                vector<int> buffer2;\\n                vector<int>* pB1 = &buffer1;\\n                vector<int>* pB2 = &buffer2;\\n                if(n==1)\\n                {\\n                    buffer1.push_back(0);\\n                    return buffer1;\\n                }\\n                if(n==2)\\n                {\\n                    buffer1.push_back(0);\\n                    buffer1.push_back(1);\\n                    return buffer1;\\n                }\\n                \\n                // build the graph\\n                vector<Node> nodes(n);\\n                for(auto p:edges)\\n                {\\n                    nodes[p.first].neighbor.insert(p.second);\\n                    nodes[p.second].neighbor.insert(p.first);\\n                }\\n                \\n                // find all leaves\\n                for(int i=0; i<n; ++i)\\n                {\\n                    if(nodes[i].isLeaf()) pB1->push_back(i);\\n                }\\n    \\n                // remove leaves layer-by-layer            \\n                while(1)\\n                {\\n                    for(int i : *pB1)\\n                    {\\n                        for(auto n: nodes[i].neighbor)\\n                        {\\n                            nodes[n].neighbor.erase(i);\\n                            if(nodes[n].isLeaf()) pB2->push_back(n);\\n                        }\\n                    }\\n                    if(pB2->empty())\\n                    {\\n                        return *pB1;\\n                    }\\n                    pB1->clear();\\n                    swap(pB1, pB2);\\n                }\\n                \\n            }\\n        };"
		},
		{
			"lc_ans_id":"76064",
			"view":"6939",
			"top":"3",
			"title":"C++ BFS short clean solution with explanation",
			"vote":"32",
			"content":"    class Solution {\\n     public:\\n      vector<int> findMinHeightTrees(int n, vector<pair<int, int>>& edges) {\\n        // Initialize the undirected graph\\n        vector<unordered_set<int>> adj(n);\\n        for (pair<int, int> p : edges) {\\n          adj[p.first].insert(p.second);\\n          adj[p.second].insert(p.first);\\n        }\\n        // Corner case\\n        vector<int> current;\\n        if (n == 1) {\\n          current.push_back(0);\\n          return current;\\n        }\\n        // Create first leaf layer\\n        for (int i = 0; i < adj.size(); ++i) {\\n          if (adj[i].size() == 1) {\\n            current.push_back(i);\\n          }\\n        }\\n        // BFS the graph\\n        while (true) {\\n          vector<int> next;\\n          for (int node : current) {\\n            for (int neighbor : adj[node]) {\\n              adj[neighbor].erase(node);\\n              if (adj[neighbor].size() == 1) next.push_back(neighbor);\\n            }\\n          }\\n          if (next.empty()) return current;\\n          current = next;\\n        }\\n      }\\n    };"
		},
		{
			"lc_ans_id":"76124",
			"view":"7203",
			"top":"4",
			"title":"O(n) super clean solution just iteratively deleting leaves",
			"vote":"18",
			"content":"    class Solution {\\n    public: \\n        vector<int> findMinHeightTrees(int n, vector<pair<int, int>>& edges) {\\n            vector<unordered_set<int>> graph(n);\\n            for(auto e: edges){\\n                graph[e.first].insert(e.second);\\n                graph[e.second].insert(e.first);\\n            }\\n            vector<int> degree(n, 0);  //degree\\n            for(int i=0; i<n; i++) degree[i]=graph[i].size();\\n            for(int remain=n, j; remain>2;){\\n                vector<int> del; // nodes to delete\\n                for(j=0; j<n; j++){\\n                    if(degree[j]==1) { //find leaves\\n                        remain--;\\n                        del.push_back(j);\\n                        degree[j]=-1;\\n                    }\\n                }\\n                for(auto k: del){ //delete this node and its edges \\n                    for(auto neigh: graph[k]) degree[neigh]--;\\n                }\\n            }\\n            vector<int> res;\\n            for(int i=0; i<n; i++) if(degree[i]>=0) res.push_back(i);\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"76078",
			"view":"3426",
			"top":"5",
			"title":"Java Accepted Solution - remove nodes from leave to root",
			"vote":"17",
			"content":"    public class Solution {\\n        public List<Integer> findMinHeightTrees(int n, int[][] edges) {\\n            if (n == 0) return new ArrayList<>();\\n            else if (n == 1) {\\n                List<Integer> ret = new ArrayList<>();\\n                ret.add(0);\\n                return ret;\\n            }\\n            List<Integer>[] lists = new ArrayList[n];\\n            for (int i = 0; i < n; i++) {\\n                lists[i] = new ArrayList<>();\\n            }\\n            for (int i = 0; i < edges.length; i++) {\\n                int v1 = edges[i][0];\\n                int v2 = edges[i][1];\\n                lists[v1].add(v2);\\n                lists[v2].add(v1);\\n            }\\n            List<Integer> leaves = new ArrayList<>();\\n            for (int i = 0; i < n; i++) {\\n                if (lists[i].size() == 1) {\\n                    leaves.add(i);\\n                }\\n            }\\n            int count = n;\\n            while (count > 2) {\\n                int size = leaves.size();\\n                count -= size;\\n                List<Integer> newLeaves = new ArrayList<>();\\n                for (int i = 0; i < size; i++) {\\n                    int leaf = leaves.get(i);\\n                    for (int j = 0; j < lists[leaf].size(); j++) {\\n                        int toRemove = lists[leaf].get(j);\\n                        lists[toRemove].remove(Integer.valueOf(leaf));\\n                        if (lists[toRemove].size() == 1)\\n                            newLeaves.add(toRemove);\\n                    }\\n                }\\n                leaves = newLeaves;\\n            }\\n            return leaves;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"76129",
			"view":"2916",
			"top":"6",
			"title":"Share my BFS JAVA code using degree with explanation, which beats more than 95%",
			"vote":"13",
			"content":"Basically my code starts from the leaf nodes.\\n\\nFor leaf nodes, their degree = 1, which means each of them is only connected to one node.\\n\\nIn our loop, each time we delete the leaf nodes from our graph(just by putting their degrees to 0), and meanwhile we add the new leaf nodes after deleting them(just add their connected nodes with degree as 2) to the queue.\\n\\nSo basically in the end, the nodes in the queue would be connected to no other nodes but each other. They should be the answer.\\n\\n\\n   \\tList<List<Integer>> myGraph = new ArrayList<List<Integer>>();\\n    \\tList<Integer> res = new ArrayList<Integer>();\\n    \\tif (n==1) {\\n    \\t\\tres.add(0);\\n    \\t\\treturn res;\\n    \\t}\\n        int[] degree = new int[n];\\n        for(int i=0; i<n; i++) {\\n        \\tmyGraph.add(new ArrayList<Integer>());\\n        }\\n        for(int i=0; i<edges.length; i++) {\\n        \\tmyGraph.get(edges[i][0]).add(edges[i][1]);\\n        \\tmyGraph.get(edges[i][1]).add(edges[i][0]);\\n        \\tdegree[edges[i][0]]++;\\n        \\tdegree[edges[i][1]]++;\\n        }\\n        Queue<Integer> myQueue = new ArrayDeque<Integer>();\\n        \\n        for(int i=0; i<n; i++) \\n        \\tif (degree[i]==0) \\n        \\t\\treturn res;\\n        \\telse if (degree[i]==1) {\\n        \\t\\tmyQueue.offer(i);\\n        \\t}\\n        \\n        while (!myQueue.isEmpty()) {\\n        \\tres = new ArrayList<Integer>();\\n        \\tint count = myQueue.size();\\n        \\t\\n        \\tfor(int i=0; i<count; i++){\\n        \\t\\tint curr = myQueue.poll();\\n        \\t\\tres.add(curr);\\n        \\t\\tdegree[curr]--;\\n        \\t\\tfor(int k=0; k<myGraph.get(curr).size(); k++) {\\n        \\t\\t\\tint next = myGraph.get(curr).get(k);\\n        \\t\\t\\tif (degree[next]==0) continue;\\n        \\t\\t\\tif (degree[next]==2) {\\n        \\t\\t\\t\\tmyQueue.offer(next);\\n        \\t\\t\\t}\\n    \\t\\t\\t\\tdegree[next]--;\\n        \\t\\t}\\n        \\t}      \\t\\n        }\\n        return res;"
		},
		{
			"lc_ans_id":"76149",
			"view":"1772",
			"top":"7",
			"title":"Share my Accepted BFS Python Code with O(n) Time",
			"vote":"12",
			"content":"The obvious method is to BFS for each node with the complexity of O(n^2) (and will get TLE).\\n\\nHere is one insight for this problem: the root of MHT is the middle point of the longest path in the tree; hence there are at most two MHT roots.   \\n\\nHow to find them? We can BFS from the bottom (leaves) to the top until the last level with <=2 nodes. To build the current level from the previous level, we can monitor the degree of each node. If the node has degree of one, it will be added to the current level. Since it only check the edges once, the complexity is O(n).\\n\\n\\n    def findMinHeightTrees(self, n, edges):\\n        \"\"\"\\n        :type n: int\\n        :type edges: List[List[int]]\\n        :rtype: List[int]\\n        \"\"\"\\n        if n == 1: return [0]\\n        neighbors = collections.defaultdict(list)\\n        degrees = collections.defaultdict(int)\\n        for u, v in edges:\\n            neighbors[u].append(v)\\n            neighbors[v].append(u)\\n            degrees[u] += 1\\n            degrees[v] += 1\\n        \\n        # First find the leaves\\n        preLevel, unvisited = [], set(range(n))\\n        for i in range(n):\\n            if degrees[i] == 1: preLevel.append(i)\\n            \\n        while len(unvisited) > 2:\\n            thisLevel = []\\n            for u in preLevel:\\n                unvisited.remove(u)\\n                for v in neighbors[u]:\\n                    if v in unvisited: \\n                        degrees[v] -= 1\\n                        if degrees[v] == 1: thisLevel += [v]\\n            preLevel = thisLevel\\n                    \\n         return preLevel"
		},
		{
			"lc_ans_id":"76132",
			"view":"1692",
			"top":"8",
			"title":"Iterative remove leaves Python solution",
			"vote":"9",
			"content":"Because there're at most two nodes can be Minimum Height Trees. And all leaves are impossible because such nodes. So we can iterative remove leaves and related edges till we reach 1 or 2.\\n\\n        d = collections.defaultdict(set)\\n        for u, v in edges:\\n            d[u].add(v)\\n            d[v].add(u)\\n        s = set(range(n))\\n        while len(s) > 2:\\n            leaves = set(i for i in s if len(d[i]) == 1)\\n            s -= leaves\\n            for i in leaves:\\n                for j in d[i]:\\n                    d[j].remove(i)\\n        return list(s)"
		},
		{
			"lc_ans_id":"76108",
			"view":"966",
			"top":"9",
			"title":"Cpp easy to understand solution using graph",
			"vote":"7",
			"content":"    vector<int> findMinHeightTrees(int n, vector<pair<int, int>>& edges) {\\n        //The principle is that in a path graph, the node at the middle is the root wiht MHTs. Use two pointers to achieve\\n        //Like course schedule problem. First, construct the graph baesd on edges. Then construct the degree vector. Delete all the leaf nodes which the degree is 1. Then construct the next leaf node.Until only two odes are remaining and these two nodes are the two located on the longest path in the graph, which should be the result.\\n        vector<int>result;\\n        if (n == 1) {\\n            result.push_back(0);\\n            return result;\\n        }\\n        //Construct the graph\\n        vector<vector<int>>graph(n, vector<int>());\\n        vector<int>degree(n, 0);\\n        for (int i = 0; i < edges.size(); i++) {\\n            graph[edges[i].first].push_back(edges[i].second);\\n            graph[edges[i].second].push_back(edges[i].first);\\n            degree[edges[i].first]++;\\n            degree[edges[i].second]++;\\n        }\\n        int count = n;\\n        while (count > 2) {\\n            vector<int>records;\\n            for (int i = 0; i < n; i++) {\\n                if (degree[i] == 1) {\\n                    records.push_back(i);\\n                    degree[i] = -1;\\n                    count--;\\n                }\\n            }\\n            for (int i = 0; i < records.size(); i++) {\\n                for (auto it : graph[records[i]]) {\\n                    degree[it]--;\\n                }\\n            }\\n        }\\n        for (int i = 0; i < n; i++) {\\n            if (degree[i] == 1 || degree[i] == 0) {\\n                result.push_back(i);\\n            }\\n        }\\n        return result;\\n    }"
		}
	],
	"id":"310",
	"title":"Minimum Height Trees",
	"content":"<p>\n    For a undirected graph with tree characteristics, we can choose any node as the root. The result graph is then a rooted tree. Among all possible rooted trees, those with minimum height are called minimum height trees (MHTs).\n    Given such a graph, write a function to find all the MHTs and return a list of their root labels.\n</p>\n\n<p>\n    <b>Format</b><br/>\n    The graph contains <code>n</code> nodes which are labeled from <code>0</code> to <code>n - 1</code>.\n    You will be given the number <code>n</code> and a list of undirected <code>edges</code> (each edge is a pair of labels).\n</p>\n<p> \nYou can assume that no duplicate edges will appear in <code>edges</code>. Since all edges are\n    undirected, <code>[0, 1]</code> is the same as <code>[1, 0]</code> and thus will not appear together in\n    <code>edges</code>.\n</p>\n<p>\n    <b>Example 1:</b>\n</p>\n<p>\n    Given <code>n = 4</code>, <code>edges = [[1, 0], [1, 2], [1, 3]]</code>\n</p>\n\n<pre>\n        0\n        |\n        1\n       / \\\n      2   3\n</pre>\n<p>\n    return <code> [1]</code>\n</p>\n\n<p>\n    <b>Example 2:</b>\n</p>\n<p>\n    Given <code>n = 6</code>, <code>edges = [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]</code>\n</p>\n<pre>\n     0  1  2\n      \\ | /\n        3\n        |\n        4\n        |\n        5\n</pre>\n<p>\n    return <code> [3, 4]</code>\n</p>\n\n<p>\n    <b>Note</b>:\n</p>\n<p>\n    (1) According to the <a href=\"https://en.wikipedia.org/wiki/Tree_(graph_theory)\" target=\"_blank\">definition\n    of tree on Wikipedia</a>: “a tree is an undirected graph in which any two vertices are connected by\n    <i>exactly</i> one path. In other words, any connected graph without simple cycles is a tree.”\n</p>\n<p>\n    (2) The height of a rooted tree is the number of edges on the longest downward path between the root and a\n    leaf.\n</p>\n\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/dietpepsi\">@dietpepsi</a> for adding this problem and creating all test cases.</p>",
	"frequency":"161",
	"ac_num":"40700"
}