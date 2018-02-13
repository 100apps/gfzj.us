{
	"difficulty":"2",
	"submit_num":"331560",
	"show_id":"207",
	"leetcode_id":"207",
	"answers":[
		{
			"lc_ans_id":"58509",
			"view":"29217",
			"top":"0",
			"title":"18-22 lines C++ BFS/DFS Solutions",
			"vote":"123",
			"content":"As suggested by the hints, this problem is equivalent to detecting a cycle in the graph represented by `prerequisites`. Both BFS and DFS can be used to solve it using the idea of **topological sort**. If you find yourself unfamiliar with these concepts, you may refer to their wikipedia pages. Specifically, you may only need to refer to the link in the third hint to solve this problem. \\n \\nSince `pair<int, int>` is inconvenient for the implementation of graph algorithms, we first transform it to a graph. If course `u` is a prerequisite of course `v`, we will add a directed edge from node `u` to node `v`.\\n \\n----------\\n**BFS**\\n\\nBFS uses the indegrees of each node. We will first try to find a node with `0` indegree. If we fail to do so, there must be a cycle in the graph and we return `false`. Otherwise we have found one. We set its indegree to be `-1` to prevent from visiting it again and reduce the indegrees of all its neighbors by `1`. This process will be repeated for `n` (number of nodes) times. If we have not returned `false`, we will return `true`.\\n\\n    class Solution {\\n    public:\\n        bool canFinish(int numCourses, vector<pair<int, int>>& prerequisites) {\\n            vector<unordered_set<int>> graph = make_graph(numCourses, prerequisites);\\n            vector<int> degrees = compute_indegree(graph);\\n            for (int i = 0; i < numCourses; i++) {\\n                int j = 0;\\n                for (; j < numCourses; j++)\\n                    if (!degrees[j]) break;\\n                if (j == numCourses) return false;\\n                degrees[j] = -1;\\n                for (int neigh : graph[j])\\n                    degrees[neigh]--;\\n            }\\n            return true;\\n        }\\n    private:\\n        vector<unordered_set<int>> make_graph(int numCourses, vector<pair<int, int>>& prerequisites) {\\n            vector<unordered_set<int>> graph(numCourses);\\n            for (auto pre : prerequisites)\\n                graph[pre.second].insert(pre.first);\\n            return graph;\\n        }\\n        vector<int> compute_indegree(vector<unordered_set<int>>& graph) {\\n            vector<int> degrees(graph.size(), 0);\\n            for (auto neighbors : graph)\\n                for (int neigh : neighbors)\\n                    degrees[neigh]++;\\n            return degrees;\\n        }\\n    }; \\n\\n----------\\n**DFS**\\n\\nFor DFS, it will first visit a node, then one neighbor of it, then one neighbor of this neighbor... and so on. If it meets a node which was visited in the current process of DFS visit, a cycle is detected and we will return `false`. Otherwise it will start from another unvisited node and repeat this process till all the nodes have been visited. Note that you should make two records: one is to record all the visited nodes and the other is to record the visited nodes in the current DFS visit.\\n\\nThe code is as follows. We use a `vector<bool> visited` to record all the visited nodes and another `vector<bool> onpath` to record the visited nodes of the current DFS visit. Once the current visit is finished, we reset the `onpath` value of the starting node to `false`. \\n\\n    class Solution {\\n    public:\\n        bool canFinish(int numCourses, vector<pair<int, int>>& prerequisites) {\\n            vector<unordered_set<int>> graph = make_graph(numCourses, prerequisites);\\n            vector<bool> onpath(numCourses, false), visited(numCourses, false);\\n            for (int i = 0; i < numCourses; i++)\\n                if (!visited[i] && dfs_cycle(graph, i, onpath, visited))\\n                    return false;\\n            return true;\\n        }\\n    private:\\n        vector<unordered_set<int>> make_graph(int numCourses, vector<pair<int, int>>& prerequisites) {\\n            vector<unordered_set<int>> graph(numCourses);\\n            for (auto pre : prerequisites)\\n                graph[pre.second].insert(pre.first);\\n            return graph;\\n        } \\n        bool dfs_cycle(vector<unordered_set<int>>& graph, int node, vector<bool>& onpath, vector<bool>& visited) {\\n            if (visited[node]) return false;\\n            onpath[node] = visited[node] = true; \\n            for (int neigh : graph[node])\\n                if (onpath[neigh] || dfs_cycle(graph, neigh, onpath, visited))\\n                    return true;\\n            return onpath[node] = false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"58516",
			"view":"41264",
			"top":"1",
			"title":"Easy BFS Topological sort, Java",
			"vote":"114",
			"content":"\\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\\n        int[][] matrix = new int[numCourses][numCourses]; // i -> j\\n        int[] indegree = new int[numCourses];\\n        \\n        for (int i=0; i<prerequisites.length; i++) {\\n            int ready = prerequisites[i][0];\\n            int pre = prerequisites[i][1];\\n            if (matrix[pre][ready] == 0)\\n                indegree[ready]++; //duplicate case\\n            matrix[pre][ready] = 1;\\n        }\\n        \\n        int count = 0;\\n        Queue<Integer> queue = new LinkedList();\\n        for (int i=0; i<indegree.length; i++) {\\n            if (indegree[i] == 0) queue.offer(i);\\n        }\\n        while (!queue.isEmpty()) {\\n            int course = queue.poll();\\n            count++;\\n            for (int i=0; i<numCourses; i++) {\\n                if (matrix[course][i] != 0) {\\n                    if (--indegree[i] == 0)\\n                        queue.offer(i);\\n                }\\n            }\\n        }\\n        return count == numCourses;\\n    }"
		},
		{
			"lc_ans_id":"58524",
			"view":"28759",
			"top":"2",
			"title":"Java DFS and BFS solution",
			"vote":"71",
			"content":"According to my code test, BFS is much faster than DFS. From my perspective DFS searches more branches. EX: 1->3->4 //1->5->3   the first branch we need search 3's children, in second we still need to do so.\\n\\nBFS:\\n\\n    public class Solution {\\n        public boolean canFinish(int numCourses, int[][] prerequisites) {\\n            ArrayList[] graph = new ArrayList[numCourses];\\n            int[] degree = new int[numCourses];\\n            Queue queue = new LinkedList();\\n            int count=0;\\n            \\n            for(int i=0;i<numCourses;i++)\\n                graph[i] = new ArrayList();\\n                \\n            for(int i=0; i<prerequisites.length;i++){\\n                degree[prerequisites[i][1]]++;\\n                graph[prerequisites[i][0]].add(prerequisites[i][1]);\\n            }\\n            for(int i=0; i<degree.length;i++){\\n                if(degree[i] == 0){\\n                    queue.add(i);\\n                    count++;\\n                }\\n            }\\n            \\n            while(queue.size() != 0){\\n                int course = (int)queue.poll();\\n                for(int i=0; i<graph[course].size();i++){\\n                    int pointer = (int)graph[course].get(i);\\n                    degree[pointer]--;\\n                    if(degree[pointer] == 0){\\n                        queue.add(pointer);\\n                        count++;\\n                    }\\n                }\\n            }\\n            if(count == numCourses)\\n                return true;\\n            else    \\n                return false;\\n        }\\n    }\\n\\nDFS:\\n\\n    public class Solution {\\n            public boolean canFinish(int numCourses, int[][] prerequisites) {\\n                ArrayList[] graph = new ArrayList[numCourses];\\n                for(int i=0;i<numCourses;i++)\\n                    graph[i] = new ArrayList();\\n                    \\n                boolean[] visited = new boolean[numCourses];\\n                for(int i=0; i<prerequisites.length;i++){\\n                    graph[prerequisites[i][1]].add(prerequisites[i][0]);\\n                }\\n    \\n                for(int i=0; i<numCourses; i++){\\n                    if(!dfs(graph,visited,i))\\n                        return false;\\n                }\\n                return true;\\n            }\\n    \\n            private boolean dfs(ArrayList[] graph, boolean[] visited, int course){\\n                if(visited[course])\\n                    return false;\\n                else\\n                    visited[course] = true;;\\n    \\n                for(int i=0; i<graph[course].size();i++){\\n                    if(!dfs(graph,visited,(int)graph[course].get(i)))\\n                        return false;\\n                }\\n                visited[course] = false;\\n                return true;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"58523",
			"view":"8972",
			"top":"3",
			"title":"JAVA---------Easy Version To UnderStand!!!!!!!!!!!!!!!!!",
			"vote":"50",
			"content":"    public static boolean canFinish(int numCourses, int[][] prerequisites) {\\n\\t\\tif (numCourses <= 0)\\n\\t\\t\\treturn false;\\n\\t\\tQueue<Integer> queue = new LinkedList<>();\\n\\t\\tint[] inDegree = new int[numCourses];\\n\\t\\tfor (int i = 0; i < prerequisites.length; i++) {\\n\\t\\t\\tinDegree[prerequisites[i][1]]++;\\n\\t\\t}\\n\\t\\tfor (int i = 0; i < inDegree.length; i++) {\\n\\t\\t\\tif (inDegree[i] == 0)\\n\\t\\t\\t\\tqueue.offer(i);\\n\\t\\t}\\n\\t\\twhile (!queue.isEmpty()) {\\n\\t\\t\\tint x = queue.poll();\\n\\t\\t\\tfor (int i = 0; i < prerequisites.length; i++) {\\n\\t\\t\\t\\tif (x == prerequisites[i][0]) {\\n\\t\\t\\t\\t\\tinDegree[prerequisites[i][1]]--;\\n\\t\\t\\t\\t\\tif (inDegree[prerequisites[i][1]] == 0)\\n\\t\\t\\t\\t\\t\\tqueue.offer(prerequisites[i][1]);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tfor (int i = 0; i < inDegree.length; i++) {\\n\\t\\t\\tif (inDegree[i] != 0)\\n\\t\\t\\t\\treturn false;\\n\\t\\t}\\n\\t\\treturn true;\\n\\t}"
		},
		{
			"lc_ans_id":"58586",
			"view":"7656",
			"top":"4",
			"title":"Python 20 lines DFS solution sharing with explanation",
			"vote":"46",
			"content":"    def canFinish(self, numCourses, prerequisites):\\n        graph = [[] for _ in xrange(numCourses)]\\n        visit = [0 for _ in xrange(numCourses)]\\n        for x, y in prerequisites:\\n            graph[x].append(y)\\n        def dfs(i):\\n            if visit[i] == -1:\\n                return False\\n            if visit[i] == 1:\\n                return True\\n            visit[i] = -1\\n            for j in graph[i]:\\n                if not dfs(j):\\n                    return False\\n            visit[i] = 1\\n            return True\\n        for i in xrange(numCourses):\\n            if not dfs(i):\\n                return False\\n        return True\\n\\n1. if node `v` has not been visited, then mark it as `0`.\\n2. if node `v` is being visited, then mark it as `-1`. If we find a vertex marked as `-1` in DFS, then their is a ring.\\n3. if node `v` has been visited, then mark it as `1`. If a vertex was marked as `1`, then no ring contains `v` or its successors.\\n\\n*References: [daoluan.net][1]* \\n\\n\\n  [1]: http://daoluan.net/blog/map-ring/"
		},
		{
			"lc_ans_id":"58709",
			"view":"15762",
			"top":"5",
			"title":"BFS(Topological Sort) and DFS(Finding cycle) by C++",
			"vote":"43",
			"content":"#### 1. BFS(Topological Sort)\\n\\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites)\\n    {\\n        vector<unordered_set<int>> matrix(numCourses); // save this directed graph\\n        for(int i = 0; i < prerequisites.size(); ++ i)\\n            matrix[prerequisites[i][1]].insert(prerequisites[i][0]);\\n        \\n        vector<int> d(numCourses, 0); // in-degree\\n        for(int i = 0; i < numCourses; ++ i)\\n            for(auto it = matrix[i].begin(); it != matrix[i].end(); ++ it)\\n                ++ d[*it];\\n        \\n        for(int j = 0, i; j < numCourses; ++ j)\\n        {\\n            for(i = 0; i < numCourses && d[i] != 0; ++ i); // find a node whose in-degree is 0\\n            \\n            if(i == numCourses) // if not find\\n                return false;\\n            \\n            d[i] = -1;\\n            for(auto it = matrix[i].begin(); it != matrix[i].end(); ++ it)\\n                -- d[*it];\\n        }\\n        \\n        return true;\\n    }\\n\\n#### 2. DFS(Finding cycle)\\n\\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites)\\n    {\\n        vector<unordered_set<int>> matrix(numCourses); // save this directed graph\\n        for(int i = 0; i < prerequisites.size(); ++ i)\\n            matrix[prerequisites[i][1]].insert(prerequisites[i][0]);\\n        \\n        unordered_set<int> visited;\\n        vector<bool> flag(numCourses, false);\\n        for(int i = 0; i < numCourses; ++ i)\\n            if(!flag[i])\\n                if(DFS(matrix, visited, i, flag))\\n                    return false;\\n        return true;\\n    }\\n    bool DFS(vector<unordered_set<int>> &matrix, unordered_set<int> &visited, int b, vector<bool> &flag)\\n    {\\n        flag[b] = true;\\n        visited.insert(b);\\n        for(auto it = matrix[b].begin(); it != matrix[b].end(); ++ it)\\n            if(visited.find(*it) != visited.end() || DFS(matrix, visited, *it, flag))\\n                return true;\\n        visited.erase(b);\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"58713",
			"view":"6443",
			"top":"6",
			"title":"OO easy to read java solution",
			"vote":"38",
			"content":"    public class Solution {\\n        static class Course {\\n            private boolean vis;\\n            private boolean done;\\n            private ArrayList<Course> pre = new ArrayList<Course>();\\n            \\n            void addPre(Course preCourse) {\\n                pre.add(preCourse);\\n            }\\n            \\n            boolean isCyclic() {\\n                if( done ) {\\n                    return false;\\n                }\\n                if( vis ) {\\n                    return true;\\n                }\\n                vis = true;\\n                \\n                for(Course preCourse: pre ) {\\n                    if( preCourse.isCyclic() ) {\\n                        return true;\\n                    }\\n                }\\n                \\n                vis = false;\\n                done = true;\\n                return false;\\n            }\\n        }\\n        \\n            \\n        public boolean canFinish(int numCourses, int[][] prerequisites) {\\n            Course clist[] = new Course[numCourses];\\n            \\n            for(int i=0; i<numCourses; i++) {\\n                clist[i] = new Course();\\n            }\\n            \\n            for(int[] couple: prerequisites ) {\\n                Course c1 = clist[couple[0]];\\n                Course c2 = clist[couple[1]];\\n                c1.addPre(c2);\\n            }\\n            \\n            for(int i=0; i<numCourses; i++) {\\n                if( clist[i].isCyclic() ) {\\n                    return false;\\n                }\\n            }\\n            \\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"58669",
			"view":"2886",
			"top":"7",
			"title":"Concise JAVA solutions based on BFS and DFS with explanation",
			"vote":"32",
			"content":"**BFS Solution: (Topological sorting)**\\n\\nThe basic idea is to use Topological algorithm: put NODE with 0 indgree into the queue, then make indegree of NODE's successor dereasing 1. Keep the above steps with BFS. \\n\\nFinally, if each node' indgree equals 0, then it is validated DAG (Directed Acyclic Graph), which means the course schedule can be finished.\\n\\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\\n        if (numCourses == 0 || prerequisites.length == 0) return true;\\n    \\n        // Convert graph presentation from edges to indegree of adjacent list.\\n        int indegree[] = new int[numCourses];\\n        for (int i = 0; i < prerequisites.length; i++) // Indegree - how many prerequisites are needed.\\n            indegree[prerequisites[i][0]]++;    \\n    \\n        Queue<Integer> queue = new LinkedList<Integer>();\\n        for (int i = 0; i < numCourses; i++) \\n            if (indegree[i] == 0)\\n                queue.add(i);\\n    \\n        // How many courses don't need prerequisites.\\n        int canFinishCount = queue.size();  \\n        while (!queue.isEmpty()) {\\n            int prerequisite = queue.remove(); // Already finished this prerequisite course.\\n            for (int i = 0; i < prerequisites.length; i++)  {\\n                if (prerequisites[i][1] == prerequisite) { \\n                    indegree[prerequisites[i][0]]--;\\n                    if (indegree[prerequisites[i][0]] == 0) {\\n                        canFinishCount++;\\n                        queue.add(prerequisites[i][0]);\\n                    }\\n                }\\n            }\\n        }\\n    \\n        return (canFinishCount == numCourses);    \\n    }\\n\\n**DFS Solution:**\\n\\nThe basic idea is using DFS to check if the current node was already included in the traveling path. In this case, we need to convert graph presentation from edge list to adjacency list first, and then check if there's cycle existing in any subset. Because tree is a connected graph, we can start from any node.\\n\\nThe graph is possibly not connected, so need to check every node. \\n\\nTo do memorization and pruning, a HashMap is used to save the previous results for the specific node.\\n\\n\\n    HashMap<Integer, Boolean>memo = new HashMap<Integer, Boolean>();//Memorization HashMap for DFS pruning \\n    public boolean canFinish(int n, int[][] edges) {\\t\\t \\n        if (edges.length != 0) { \\n            HashMap<Integer, HashSet<Integer>> neighbors = new HashMap<Integer, HashSet<Integer>>(); // Neighbors of each node\\n            HashSet<Integer>curPath = new HashSet<Integer>(); // Nodes on the current path\\n            for (int i = 0; i < edges.length; i++) {// Convert graph presentation from edge list to adjacency list \\n                if (!neighbors.containsKey(edges[i][1])) \\n                    neighbors.put(edges[i][1], new HashSet<Integer>());            \\n                neighbors.get(edges[i][1]).add(edges[i][0]);\\n            }\\n            \\n            for (int a[] : edges) // The graph is possibly not connected, so need to check every node.\\n    \\t        if (hasCycle(neighbors, a[0], -1, curPath))// Use DFS method to check if there's cycle in any curPath\\n    \\t            return false;\\n        } \\n        return true;\\n    }     \\n\\n    boolean hasCycle(HashMap<Integer, HashSet<Integer>> neighbors, int kid, int parent, HashSet<Integer>curPath) {\\n    \\tif (memo.containsKey(kid)) return memo.get(kid);\\n        if (curPath.contains(kid)) return true;// The current node is already in the set of the current path\\t    \\n        if (!neighbors.containsKey(kid)) return false;\\t   \\n        \\n        curPath.add(kid);\\n        for (Integer neighbor : neighbors.get(kid)) {\\n        \\tboolean hasCycle = hasCycle(neighbors, neighbor, kid, curPath);// DFS\\n        \\tmemo.put(kid, hasCycle);\\t        \\t\\n            if (hasCycle) return true;\\n        }\\n        curPath.remove(kid);\\t    \\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"58537",
			"view":"2399",
			"top":"8",
			"title":"AC Python topological sort 52 ms solution, O(V + E) time and O(V + E) space",
			"vote":"21",
			"content":"    def canFinish(self, n, pres):\\n        from collections import deque\\n        ind = [[] for _ in xrange(n)]  # indegree\\n        oud = [0] * n  # outdegree\\n        for p in pres:\\n            oud[p[0]] += 1\\n            ind[p[1]].append(p[0])\\n        dq = deque()\\n        for i in xrange(n):\\n            if oud[i] == 0:\\n                dq.append(i)\\n        k = 0\\n        while dq:\\n            x = dq.popleft()\\n            k += 1\\n            for i in ind[x]:\\n                oud[i] -= 1\\n                if oud[i] == 0:\\n                    dq.append(i)\\n        return k == n\\n\\n\\n    # 34 / 34 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 52 ms\\n    # 99.68%\\n\\n\\nThe topological sort is natural for this problem. We always take the courses with no unstudied prereqs and so on until no more courses we can take. The oud[i] is the number of prereqs for course i and indegree keep a list of courses require course i."
		},
		{
			"lc_ans_id":"58775",
			"view":"2465",
			"top":"9",
			"title":"My Java BFS solution",
			"vote":"14",
			"content":"    public class Solution {\\n        public boolean canFinish(int numCourses, int[][] prerequisites) {\\n            Map<Integer, ArrayList<Integer>> map = new HashMap<Integer, ArrayList<Integer>>();\\n            int[] indegree = new int[numCourses];\\n            Queue<Integer> queue = new LinkedList<Integer>();\\n            int count = numCourses;\\n            for (int i = 0; i < numCourses; i++) {\\n                map.put(i, new ArrayList<Integer>());\\n            }\\n            for (int i = 0; i < prerequisites.length; i++) {\\n                map.get(prerequisites[i][0]).add(prerequisites[i][1]);\\n                indegree[prerequisites[i][1]]++;\\n            }\\n            for (int i = 0; i < numCourses; i++) {\\n                if (indegree[i] == 0) {\\n                    queue.offer(i);\\n                }\\n            }\\n            while (!queue.isEmpty()) {\\n                int current = queue.poll();\\n                for (int i : map.get(current)) {\\n                    if (--indegree[i] == 0) {\\n                        queue.offer(i);\\n                    }\\n                }\\n                count--;\\n            }\\n            return count == 0;\\n        }\\n    }"
		}
	],
	"id":"207",
	"title":"Course Schedule",
	"content":"<p>\r\nThere are a total of <i>n</i> courses you have to take, labeled from <code>0</code> to <code>n - 1</code>.</p>\r\n\r\n<p>Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: <code>[0,1]</code></p>\r\n\r\n<p>\r\nGiven the total number of courses and a list of prerequisite <b>pairs</b>, is it possible for you to finish all courses?\r\n</p>\r\n\r\n<p>For example:</p>\r\n<pre>2, [[1,0]]</pre>\r\n<p>There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.</p>\r\n\r\n<pre>2, [[1,0],[0,1]]</pre>\r\n<p>There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The input prerequisites is a graph represented by <b>a list of edges</b>, not adjacency matrices. Read more about <a href=\"https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs\" target=\"_blank\">how a graph is represented</a>.</li>\r\n<li>You may assume that there are no duplicate edges in the input prerequisites.</li>\r\n</ol>\r\n</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show more hints.</a></p>\r\n\r\n<div class=\"spoilers\"><b>Hints:</b>\r\n<ol>\r\n<li>This problem is equivalent to finding if a cycle exists in a directed graph. If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.</li>\r\n<li><a href=\"https://class.coursera.org/algo-003/lecture/52\" target=\"_blank\">Topological Sort via DFS</a> - A great video tutorial (21 minutes) on Coursera explaining the basic concepts of Topological Sort.</li>\r\n<li>Topological sort could also be done via <a href=\"http://en.wikipedia.org/wiki/Topological_sorting#Algorithms\" target=\"_blank\">BFS</a>.</li>\r\n</ol>\r\n</div>",
	"frequency":"315",
	"ac_num":"110257"
}