{
	"difficulty":"3",
	"submit_num":"75675",
	"show_id":"305",
	"leetcode_id":"305",
	"answers":[
		{
			"lc_ans_id":"75470",
			"view":"30582",
			"top":"0",
			"title":"Easiest Java Solution with Explanations",
			"vote":"173",
			"content":"This is a basic `union-find` problem. Given a graph with points being added, we can at least solve:\\n\\n 1. How many islands in total?\\n 2. Which island is pointA belonging to?\\n 3. Are pointA and pointB connected?\\n\\nThe idea is simple. To represent a list of islands,  we use **trees**.  i.e., a list of roots. This helps us find the identifier of an island faster. If `roots[c] = p` means the parent of node c is p, we can climb up the parent chain to find out the identifier of an island, i.e., which island this point belongs to:\\n\\n    Do root[root[roots[c]]]... until root[c] == c;\\n\\nTo transform the two dimension problem into the classic UF, perform a linear mapping:\\n\\n    int id = n * x + y;\\n\\nInitially assume every cell are in  non-island set `{-1}`. When point A is added, we create a new root, i.e., a new island. Then, check if any of its 4 neighbors belong to the same island. If not, `union` the neighbor by setting the root to be the same. Remember to skip non-island cells. \\n\\n**UNION** operation is only changing the root parent so the running time is `O(1)`.\\n\\n**FIND** operation is proportional to the depth of the tree. If N is the number of points added, the average running time is `O(logN)`, and a sequence of `4N` operations take `O(NlogN)`. If there is no balancing, the worse case could be `O(N^2)`.\\n\\nRemember that one island could have different `roots[node]` value for each node. Because `roots[node]` is the parent of the node, not the highest root of the island. To find the actually root, we have to climb up the tree by calling **findIsland** function.\\n\\nHere I've attached my solution. There can be at least two improvements:  `union by rank` & `path compression`. However I suggest first finish the basis, then discuss the improvements.\\n\\nCheers! \\n\\n    int[][] dirs = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}};\\n\\n    public List<Integer> numIslands2(int m, int n, int[][] positions) {\\n        List<Integer> result = new ArrayList<>();\\n        if(m <= 0 || n <= 0) return result;\\n\\n        int count = 0;                      // number of islands\\n        int[] roots = new int[m * n];       // one island = one tree\\n        Arrays.fill(roots, -1);            \\n\\n        for(int[] p : positions) {\\n            int root = n * p[0] + p[1];     // assume new point is isolated island\\n            roots[root] = root;             // add new island\\n            count++;\\n\\n            for(int[] dir : dirs) {\\n                int x = p[0] + dir[0]; \\n                int y = p[1] + dir[1];\\n                int nb = n * x + y;\\n                if(x < 0 || x >= m || y < 0 || y >= n || roots[nb] == -1) continue;\\n                \\n                int rootNb = findIsland(roots, nb);\\n                if(root != rootNb) {        // if neighbor is in another island\\n                    roots[root] = rootNb;   // union two islands \\n                    root = rootNb;          // current tree root = joined tree root\\n                    count--;               \\n                }\\n            }\\n\\n            result.add(count);\\n        }\\n        return result;\\n    }\\n\\n    public int findIsland(int[] roots, int id) {\\n        while(id != roots[id]) id = roots[id];\\n        return id;\\n    }\\n\\n<hr>\\n<h3> Path Compression (Bonus) </h3>\\n<hr>\\n\\nIf you have time, add one line to shorten the tree. The new runtime becomes: `19ms (95.94%)`.\\n\\n    public int findIsland(int[] roots, int id) {\\n        while(id != roots[id]) {\\n            roots[id] = roots[roots[id]];   // only one line added\\n            id = roots[id];\\n        }\\n        return id;\\n    }"
		},
		{
			"lc_ans_id":"75459",
			"view":"13525",
			"top":"1",
			"title":"Java/Python clear solution with UnionFind Class (Weighting and Path compression)",
			"vote":"110",
			"content":"**Union Find**\\nis an abstract data structure supporting `find` and `unite` on disjointed sets of objects, typically used to solve the network connectivity problem.\\n\\nThe two operations are defined like this: \\n\\n`find(a,b)` : are `a` and `b` belong to the same set?\\n\\n`unite(a,b)` : if `a` and `b` are not in the same set, unite the sets they belong to.\\n\\nWith this data structure, it is very fast for solving our problem. Every position is an new land, if the new land connect two islands `a` and `b`, we combine them to form a whole. The answer is then the number of the disjointed sets.\\n\\n\\nThe following algorithm is derived from [Princeton's lecture note on Union Find][1] in [Algorithms and Data Structures][2] It is a well organized note with clear illustration describing from the naive QuickFind to the one with Weighting and Path compression.\\nWith Weighting and Path compression, The algorithm runs in `O((M+N) log* N)` where `M` is the number of operations ( unite and find ), `N` is the number of objects, `log*` is [iterated logarithm][3] while the naive runs in `O(MN)`.\\n\\nFor our problem, If there are `N` positions, then there are `O(N)` operations and `N` objects then total is `O(N log*N)`, when we don't consider the `O(mn)` for array initialization.\\n\\nNote that `log*N` is almost constant (for `N` = 265536, `log*N` = 5) in this universe, so the algorithm is almost linear with `N`.\\n\\nHowever, if the map is very big, then the initialization of the arrays can cost a lot of time when `mn` is much larger than `N`. In this case we should consider using a hashmap/dictionary for the underlying data structure to avoid this overhead.\\n\\nOf course, we can put all the functionality into the Solution class which will make the code a lot shorter. But from a design point of view a separate class dedicated to the data sturcture is more readable and reusable.\\n\\nI implemented the idea with 2D interface to better fit the problem.\\n\\n**Java**\\n\\n    public class Solution {\\n    \\n        private int[][] dir = {{0, 1}, {0, -1}, {-1, 0}, {1, 0}};\\n    \\n        public List<Integer> numIslands2(int m, int n, int[][] positions) {\\n            UnionFind2D islands = new UnionFind2D(m, n);\\n            List<Integer> ans = new ArrayList<>();\\n            for (int[] position : positions) {\\n                int x = position[0], y = position[1];\\n                int p = islands.add(x, y);\\n                for (int[] d : dir) {\\n                    int q = islands.getID(x + d[0], y + d[1]);\\n                    if (q > 0 && !islands.find(p, q))\\n                        islands.unite(p, q);\\n                }\\n                ans.add(islands.size());\\n            }\\n            return ans;\\n        }\\n    }\\n\\n    class UnionFind2D {\\n        private int[] id;\\n        private int[] sz;\\n        private int m, n, count;\\n\\n        public UnionFind2D(int m, int n) {\\n            this.count = 0;\\n            this.n = n;\\n            this.m = m;\\n            this.id = new int[m * n + 1];\\n            this.sz = new int[m * n + 1];\\n        }\\n\\n        public int index(int x, int y) { return x * n + y + 1; }\\n\\n        public int size() { return this.count; }\\n\\n        public int getID(int x, int y) {\\n            if (0 <= x && x < m && 0<= y && y < n)\\n                return id[index(x, y)];\\n            return 0;\\n        }\\n\\n        public int add(int x, int y) {\\n            int i = index(x, y);\\n            id[i] = i; sz[i] = 1;\\n            ++count;\\n            return i;\\n        }\\n\\n        public boolean find(int p, int q) {\\n            return root(p) == root(q);\\n        }\\n\\n        public void unite(int p, int q) {\\n            int i = root(p), j = root(q);\\n            if (sz[i] < sz[j]) { //weighted quick union\\n                id[i] = j; sz[j] += sz[i];\\n            } else {\\n                id[j] = i; sz[i] += sz[j];\\n            }\\n            --count;\\n        }\\n\\n        private int root(int i) {\\n            for (;i != id[i]; i = id[i])\\n                id[i] = id[id[i]]; //path compression\\n            return i;\\n        }\\n    }\\n    //Runtime: 20 ms\\n\\n\\n**Python (using dict)**\\n    \\n    class Solution(object):\\n        def numIslands2(self, m, n, positions):\\n            ans = []\\n            islands = Union()\\n            for p in map(tuple, positions):\\n                islands.add(p)\\n                for dp in (0, 1), (0, -1), (1, 0), (-1, 0):\\n                    q = (p[0] + dp[0], p[1] + dp[1])\\n                    if q in islands.id:\\n                        islands.unite(p, q)\\n                ans += [islands.count]\\n            return ans\\n    \\n    class Union(object):\\n        def __init__(self):\\n            self.id = {}\\n            self.sz = {}\\n            self.count = 0\\n    \\n        def add(self, p):\\n            self.id[p] = p\\n            self.sz[p] = 1\\n            self.count += 1\\n    \\n        def root(self, i):\\n            while i != self.id[i]:\\n                self.id[i] = self.id[self.id[i]]\\n                i = self.id[i]\\n            return i\\n    \\n        def unite(self, p, q):\\n            i, j = self.root(p), self.root(q)\\n            if i == j:\\n                return\\n            if self.sz[i] > self.sz[j]:\\n                i, j = j, i\\n            self.id[i] = j\\n            self.sz[j] += self.sz[i]\\n            self.count -= 1\\n\\n    #Runtime: 300 ms\\n\\n\\n  [1]: https://www.cs.princeton.edu/~rs/AlgsDS07/01UnionFind.pdf\\n  [2]: https://www.cs.princeton.edu/~rs/AlgsDS07/\\n  [3]: https://en.wikipedia.org/wiki/Iterated_logarithm"
		},
		{
			"lc_ans_id":"75485",
			"view":"3790",
			"top":"2",
			"title":"C++ union-find solution with Path Compression",
			"vote":"12",
			"content":"This is a C++ implementation based @yavinci 's solution, which implemented using Java. For more detailed Explanations, please see [https://leetcode.com/discuss/69572/easiest-java-solution-with-explanations][1] \\n\\n\\n    vector<int> numIslands2(int m, int n, vector<pair<int, int>>& positions) {\\n        vector<int> res;\\n        roots = vector<int>(m * n, -1);\\n        vector<pair<int, int>> dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\\n        int island = 0;\\n        for (auto pos : positions) {\\n            int x = pos.first, y = pos.second, idx_p = x * n + y;\\n            roots[idx_p] = idx_p;\\n            ++island;\\n            for (auto dir : dirs) {\\n                int row = x + dir.first, col = y + dir.second, idx_new = row * n + col;\\n                if (row >= 0 && row < m && col >= 0 && col < n && roots[idx_new] != -1) {\\n                    int rootNew = findRoot(idx_new), rootPos = findRoot(idx_p);\\n                    if (rootPos != rootNew) {\\n                        roots[rootPos] = rootNew;\\n                        --island;\\n                    }\\n                }\\n            }\\n            res.push_back(island);\\n        }\\n        return res;\\n    }\\n\\n    private:\\n    vector<int> roots;\\n    int findRoot(int idx) {\\n        while(idx != roots[idx]) {\\n            roots[idx] = roots[roots[idx]]; \\n            idx = roots[idx];\\n        }\\n        return idx;\\n    }\\n\\n\\n  [1]: https://leetcode.com/discuss/69572/easiest-java-solution-with-explanations"
		},
		{
			"lc_ans_id":"75474",
			"view":"4457",
			"top":"3",
			"title":"My simple Union-Find solution",
			"vote":"12",
			"content":"The basic idea is the Union-Find approach. We assign a root number for each island, and use an array to record this number. For each input, we check its four neighbor cells. If the neighbor cell is an island, then we retrieve the root number of this island.  If two neighbor cells belong to two different islands, then we union them and therefore the total number of islands will become one less. \\n\\n    public List<Integer> numIslands2(int m, int n, int[][] positions) {\\n        //use an array to hold root number of each island\\n    \\tint[] roots = new int[m*n];\\n        //initialize the array with -1, so we know non negative number is a root number\\n        Arrays.fill(roots, -1);\\n        \\n        int[] xOffset ={0, 0, 1, -1};\\n        int[] yOffset = {1, -1, 0, 0};\\n        \\n        List<Integer> result = new ArrayList<Integer>();\\n        \\n        for(int[] position : positions){\\n        \\t//for each input cell, its initial root number is itself\\n            roots[position[0]*n + position[1]] = position[0]*n + position[1];\\n            //count variable is used to count the island in current matrix.\\n            //firstly, we assume current input is an isolated island\\n            int count = result.isEmpty()? 1 : result.get(result.size()-1) + 1;\\n            //check neighbor cells\\n            for(int i = 0; i < 4; i++){\\n                int newX = xOffset[i] + position[0];\\n                int newY = yOffset[i] + position[1];\\n                //if we found one neighbor is a part of island\\n                if(newX >= 0 && newX < m && newY >= 0 && newY < n && roots[newX * n + newY] != -1){\\n                \\t//get the root number of this island\\n                    int root1 = find(newX * n + newY, roots);\\n                    //get the root number of input island\\n                    int root2 = roots[position[0]*n + position[1]];\\n                    //if root1 and root2 are different, then we can connect two isolated island together,\\n                    // so the num of island - 1\\n                    if(root1 != root2) count--;\\n                    //update root number accordingly\\n                    roots[root1] = root2;\\n                }\\n            }\\n            result.add(count); \\n        }\\n        \\n        return result;\\n    }\\n    \\n    public int find(int target, int[] roots){\\n    \\t//found root\\n        if(roots[target] == target) return target;\\n        //searching for root and update the cell accordingly\\n        roots[target] = find(roots[target], roots);\\n        //return root number\\n        return roots[target];\\n    }"
		},
		{
			"lc_ans_id":"75468",
			"view":"2599",
			"top":"4",
			"title":"Compact Python.",
			"vote":"7",
			"content":"Pretty much just Wikipedia's [Disjoint-set forests](https://en.wikipedia.org/wiki/Disjoint-set_data_structure#Disjoint-set_forests), using *\"union by rank\"* and *\"path compression\"*. I don't see the point of `m` and `n`, so I ignore them.\\n\\n    def numIslands2(self, m, n, positions):\\n        parent, rank, count = {}, {}, [0]\\n        def find(x):\\n            if parent[x] != x:\\n                parent[x] = find(parent[x])\\n            return parent[x]\\n        def union(x, y):\\n            x, y = find(x), find(y)\\n            if x != y:\\n                if rank[x] < rank[y]:\\n                    x, y = y, x\\n                parent[y] = x\\n                rank[x] += rank[x] == rank[y]\\n                count[0] -= 1\\n        def add((i, j)):\\n            x = parent[x] = i, j\\n            rank[x] = 0\\n            count[0] += 1\\n            for y in (i+1, j), (i-1, j), (i, j+1), (i, j-1):\\n                if y in parent:\\n                    union(x, y)\\n            return count[0]\\n        return map(add, positions)\\n\\nToo bad Python 2 doesn't have `nonlocal` yet, hence the somewhat ugly `count[0]` \"hack\". Here's a different way:\\n\\n    def numIslands2(self, m, n, positions):\\n        parent, rank = {}, {}\\n        def find(x):\\n            if parent[x] != x:\\n                parent[x] = find(parent[x])\\n            return parent[x]\\n        def union(x, y):\\n            x, y = find(x), find(y)\\n            if x == y:\\n                return 0\\n            if rank[x] < rank[y]:\\n                x, y = y, x\\n            parent[y] = x\\n            rank[x] += rank[x] == rank[y]\\n            return 1\\n        counts, count = [], 0\\n        for i, j in positions:\\n            x = parent[x] = i, j\\n            rank[x] = 0\\n            count += 1\\n            for y in (i+1, j), (i-1, j), (i, j+1), (i, j-1):\\n                if y in parent:\\n                    count -= union(x, y)\\n            counts.append(count)\\n        return counts"
		},
		{
			"lc_ans_id":"75497",
			"view":"1556",
			"top":"5",
			"title":"Java union find with rank beats 98% easy to understand with short explanation",
			"vote":"6",
			"content":"    public class Solution {\\n    //  Inspired by the other union find solution, I set array of a size(m*n+1) to avoid the initialization, \\n    // Set the union function to return a boolean instead of void, just to make the code cleaner, \\n    // Personally I think realistically, it's better to create a class of something like  \\n    //\"class island{int parent, int rank}\", I didn't do that just for the speed.\\n\\n    public List<Integer> numIslands2(int m, int n, int[][] positions) {\\n        List<Integer> ans = new ArrayList<Integer>();\\n        int[] parent = new int[m*n+1], rank = new int[m*n+1];\\n        int numIslands = 0;\\n        \\n        for(int i = 0; i<positions.length; i++){\\n            int x = positions[i][0];\\n            int y = positions[i][1];\\n            int offset = x*n + y+1;\\n            parent[offset] = offset;\\n            numIslands++;\\n            \\n            if(x > 0 && parent[offset-n] != 0 && union(parent, rank, offset, offset-n)){\\n                numIslands--;    //check the grid on top of current grid\\n            }\\n            if(x < m-1 && parent[offset+n] != 0 && union(parent, rank, offset, offset+n) ){\\n                numIslands--; // check the grid below current grid\\n            }\\n            if(y > 0 && parent[offset-1] != 0 && union(parent, rank, offset, offset-1) ){\\n                numIslands--; // check the grid to the left of the current grid\\n            }\\n            if(y < n-1 && parent[offset+1] != 0 && union(parent, rank, offset, offset+1) ){\\n                numIslands--; // check the grid to the right of the current grid\\n            }\\n            ans.add(numIslands);\\n        }\\n        return ans;\\n    }\\n    \\n    private int find(int[] parent, int x){\\n        if(parent[x] == x){\\n            return x;\\n        }\\n        return find(parent, parent[x]);\\n    }\\n    \\n    private boolean union(int[] parent, int[] rank, int x, int y){\\n        int xparent = find(parent, x);\\n        int yparent = find(parent, y);\\n        if(xparent == yparent){\\n            return false;\\n        }\\n        if(rank[xparent] == rank[yparent]){\\n            parent[xparent] = yparent;\\n            rank[yparent]++;\\n        }\\n        else if(rank[xparent] < rank[yparent]){\\n            parent[xparent] = yparent;\\n        }\\n        else{\\n            parent[yparent] = xparent;\\n        }\\n        \\n        \\n        return true;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"75563",
			"view":"909",
			"top":"6",
			"title":"C++ Disjoint-set Solution",
			"vote":"4",
			"content":"    struct SetNode {\\n    \\tSetNode* parent;\\n    \\tint rank;\\n    };\\n    \\n    void make_set(SetNode* node) {\\n    \\tnode->parent = node;\\n    \\tnode->rank = 0;\\n    }\\n    \\n    SetNode* find(SetNode* node) {\\n    \\tif (node == node->parent)\\n    \\t\\treturn node;\\n    \\telse {\\n    \\t\\tnode->parent = find(node->parent);\\n    \\t\\treturn node->parent; \\n    \\t}\\n    }\\n    \\n    void set_union(SetNode* node1, SetNode* node2) {\\n    \\t\\n    \\tSetNode* root1 = find(node1);\\n    \\tSetNode* root2 = find(node2);\\n    \\n    \\tif (root1 == root2)\\n    \\t\\treturn;\\n    \\n    \\tif (root1->rank > root2->rank)\\n    \\t\\troot2->parent = root1;\\n    \\telse if (root1->rank < root2->rank)\\n    \\t\\troot1->parent = root2;\\n    \\telse {\\n    \\t\\troot1->parent = root2;\\n    \\t\\troot2->rank += 1;\\n    \\t}\\n    }\\n    \\n    \\n    class Solution {\\n    public:\\n    \\tvector<int> numIslands2(int m, int n, vector<pair<int, int>>& positions) {\\n    \\n    \\t\\tvector<SetNode> nodes(positions.size());\\n    \\t\\tfor (int i = 0; i < positions.size(); ++i)\\n    \\t\\t\\tmake_set(&nodes[i]);\\n    \\n    \\t\\tunordered_map<int, SetNode*> mm;\\n    \\t\\tvector<int> res;\\n    \\n    \\t\\tfor (int i = 0; i < positions.size(); ++i)\\n    \\t\\t{\\n    \\t\\t\\tint r = positions[i].first, c = positions[i].second;\\n    \\n    \\t\\t\\tint val = 1;\\n    \\t\\t\\tif (r - 1 >= 0) {\\n    \\t\\t\\t\\tint idx = (r - 1) * n + c;\\n    \\t\\t\\t\\tif (mm.count(idx)) {\\n    \\t\\t\\t\\t\\tif (find(&nodes[i]) != find(mm[idx])) {\\n    \\t\\t\\t\\t\\t\\t--val;\\n    \\t\\t\\t\\t\\t\\tset_union(&nodes[i], mm[idx]);\\n    \\t\\t\\t\\t\\t}\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t}\\n    \\n    \\t\\t\\tif (r + 1 < m) {\\n    \\t\\t\\t\\tint idx = (r + 1) * n + c;\\n    \\t\\t\\t\\tif (mm.count(idx)) {\\n    \\t\\t\\t\\t\\tif (find(&nodes[i]) != find(mm[idx])) {\\n    \\t\\t\\t\\t\\t\\t--val;\\n    \\t\\t\\t\\t\\t\\tset_union(&nodes[i], mm[idx]);\\n    \\t\\t\\t\\t\\t}\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t}\\n    \\n    \\t\\t\\tif (c - 1 >= 0) {\\n    \\t\\t\\t\\tint idx = r * n + c - 1;\\n    \\t\\t\\t\\tif (mm.count(idx)) {\\n    \\t\\t\\t\\t\\tif (find(&nodes[i]) != find(mm[idx])) {\\n    \\t\\t\\t\\t\\t\\t--val;\\n    \\t\\t\\t\\t\\t\\tset_union(&nodes[i], mm[idx]);\\n    \\t\\t\\t\\t\\t}\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t}\\n    \\n    \\t\\t\\tif (c + 1 < n) {\\n    \\t\\t\\t\\tint idx = r * n + c + 1;\\n    \\t\\t\\t\\tif (mm.count(idx)) {\\n    \\t\\t\\t\\t\\tif (find(&nodes[i]) != find(mm[idx])) {\\n    \\t\\t\\t\\t\\t\\t--val;\\n    \\t\\t\\t\\t\\t\\tset_union(&nodes[i], mm[idx]);\\n    \\t\\t\\t\\t\\t}\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t}\\n    \\n    \\t\\t\\tint idx = r * n + c;\\n    \\t\\t\\tmm[idx] = &nodes[i];\\n    \\n    \\t\\t\\tif (res.size() == 0)\\n    \\t\\t\\t\\tres.push_back(1);\\n    \\t\\t\\telse {\\n    \\t\\t\\t\\tres.push_back(res.back() + val);\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\n    \\t\\treturn res;\\n    \\t}\\n    };"
		},
		{
			"lc_ans_id":"75513",
			"view":"584",
			"top":"7",
			"title":"Weighted Quick Union-Find With Path Compression",
			"vote":"3",
			"content":"There is a professor who teaches quick union which inspires me a lot [link text](https://www.youtube.com/watch?v=mIRzdueGXd4)\\nThis problem is a typical quick union find problem. It's almost like number of island. You can also use the class UnionFind without a word change in number of island. And the time complexity is almost linear, since currently there is no theory linear algrithom to quick union find.\\n\\n\\n```\\npublic class Solution {\\n    int[][] direction = new int[][]{{1, 0}, {0, 1}, {-1, 0}, {0, -1}};\\n    public List<Integer> numIslands2(int m, int n, int[][] positions) {\\n        List<Integer> res = new ArrayList<>();\\n        if(m == 0 || n == 0 || positions == null || positions.length == 0) {\\n            return res;\\n        }\\n        int[] id = new int[m * n];\\n        int[] size = new int[m * n];\\n        UnionFind uf = new UnionFind(id, size);\\n        int count = 0;\\n        for(int[] p: positions) {\\n            count++;\\n            int x = p[0];\\n            int y = p[1];\\n            int idx = x * n + y;\\n            id[idx] = idx;\\n           // Set size[idx] to 0 as unvisited.\\n            size[idx] = 1;\\n            for(int[] d: direction){\\n                int i = x + d[0];\\n                int j = y + d[1];\\n                int newIdx = i * n + j;\\n                if(i >= 0 && i < m && j >= 0 && j < n && size[newIdx] != 0) {\\n                    if(!uf.isConnected(idx, newIdx)) {\\n                        uf.union(idx, newIdx);\\n                        count--;\\n                    }\\n                }\\n            }\\n            \\n            res.add(count);\\n        }\\n        return res;\\n    }\\n}\\n\\n//weighted quick union find with path compression\\nclass UnionFind{\\n    private int[] id;\\n    private int[] size;\\n    public UnionFind(int[] id, int[] size) {\\n        this.id = id;\\n        this.size = size;\\n    }\\n    \\n    public int root(int i) {\\n      // Modify the root, make the tree more flat and easier to trace.\\n      // Here is the hint. if 1 is connected to 2, 3 is connected to 4, \\n      // 4 is connected to 3, so 2,3,4 they all have the same root which is 1.\\n        while(i != id[i]) {\\n            id[i] = id[id[i]];\\n            i = id[i];\\n        }\\n        return i;\\n    }\\n    public boolean isConnected(int p, int q) {\\n        return root(p) == root(q);\\n    }\\n    public void union(int p, int q) {\\n        int i = root(p);\\n        int j = root(q);\\n        if(i == j) {\\n            return;\\n        }\\n        // Below is the path compression\\n        // Root should be the one with larger size\\n        if(size[i] < size[j]) {\\n            id[i] = id[j];\\n            size[j] += size[i]; \\n        }else {\\n            id[j] = id[i];\\n            size[i] += size[j];\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"75517",
			"view":"1159",
			"top":"8",
			"title":"Java simple Union-Find solution beating 97.94%",
			"vote":"3",
			"content":"    public class Solution {\\n        private int[] roots;\\n        private int count;\\n        public List<Integer> numIslands2(int m, int n, int[][] positions) {\\n            int[][] matrix = new int[m][n];\\n            roots = new int[m*n];\\n            List<Integer> res = new ArrayList<>();\\n            // initialize roots\\n            for(int i=0; i<m*n; i++){\\n                roots[i] = i;\\n            }\\n            for(int[] pos:positions){\\n                int x = pos[0], y = pos[1];\\n                // check if current position is already land\\n                if(1==matrix[x][y]){\\n                    res.add(count);\\n                    continue;\\n                }\\n                int cur = x*n+y;\\n                matrix[x][y] = 1;\\n                ++count;\\n                // visit neighbors\\n                if(y>0 && matrix[x][y-1]>0){\\n                    union(cur, cur-1);\\n                }\\n                if(y<n-1 && matrix[x][y+1]>0){\\n                    union(cur, cur+1);\\n                }\\n                if(x>0 && matrix[x-1][y]>0){\\n                    union(cur, cur-n);\\n                }\\n                if(x<m-1 && matrix[x+1][y]>0){\\n                    union(cur, cur+n);\\n                }\\n                res.add(count);\\n            }\\n            return res;\\n        }\\n        private int find(int t){\\n            while(t!=roots[t]){\\n                roots[t] = roots[roots[t]];\\n                t = roots[t];\\n            }\\n            return t;\\n        }\\n        private void union(int a, int b){\\n            int aroot = find(a), broot = find(b);\\n            if(aroot!=broot){\\n                roots[aroot] = broot;\\n                --count;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"75542",
			"view":"512",
			"top":"9",
			"title":"My simple C++ code with union find (2000ms)",
			"vote":"3",
			"content":"    class Solution {\\n    public:\\n        int *fa;\\n        int find(int x){\\n            if(x==fa[x]) return x;\\n            return fa[x] = find(fa[x]);\\n        }\\n        vector<int> numIslands2(int m, int n, vector<pair<int, int>>& positions) {\\n            fa = new int[m*n];\\n            vector<int>res;\\n            int num = 0;\\n            \\n            bool vis[m][n];\\n            for(int i=0; i<m; ++i)\\n                for(int j=0; j<n; ++j){\\n                    fa[ n*i+j ] = n*i+j;\\n                    vis[i][j] = false;\\n                }\\n            \\n            int go[4][2] = { {1,0},{-1,0},{0,1},{0,-1} };\\n            for( auto pos:positions ){\\n                int x = pos.first, y = pos.second;\\n                if(vis[x][y]) continue;\\n                vis[x][y] = true;\\n                num++;\\n                for(int k=0; k<4; ++k){\\n                    int nx = x+go[k][0];\\n                    int ny = y+go[k][1];\\n                    if(nx<0||nx>=m || ny<0||ny>=n) continue;\\n                    int id = n*x+y;\\n                    if(vis[nx][ny]){\\n                        int nf = find( n*nx+ny );\\n                        if(nf!=id){\\n                            num--;\\n                            fa[nf] = id;\\n                        }\\n                    }\\n                }\\n                res.emplace_back(num);\\n            }\\n            return res;\\n        }\\n    };"
		}
	],
	"id":"305",
	"title":"Number of Islands II",
	"content":"<p>A 2d grid map of <code>m</code> rows and <code>n</code> columns is initially filled with water.\r\nWe may perform an <i>addLand</i> operation which turns the water at position (row, col) into a land.\r\nGiven a list of positions to operate, <b>count the number of islands after each <i>addLand</i> operation</b>.\r\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.\r\nYou may assume all four edges of the grid are all surrounded by water.</p>\r\n\r\n<p><b>Example:</b></p>\r\n<p>Given <code>m = 3, n = 3</code>, <code>positions = [[0,0], [0,1], [1,2], [2,1]]</code>.<br>\r\nInitially, the 2d grid <code>grid</code> is filled with water. (Assume 0 represents water and 1 represents land).</p>\r\n<pre>\r\n0 0 0\r\n0 0 0\r\n0 0 0\r\n</pre>\r\n<p>Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land.</p>\r\n<pre>\r\n1 0 0\r\n0 0 0   Number of islands = 1\r\n0 0 0\r\n</pre>\r\n<p>Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land.</p>\r\n<pre>\r\n1 1 0\r\n0 0 0   Number of islands = 1\r\n0 0 0\r\n</pre>\r\n<p>Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land.</p>\r\n<pre>\r\n1 1 0\r\n0 0 1   Number of islands = 2\r\n0 0 0\r\n</pre>\r\n<p>Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land.</p>\r\n<pre>\r\n1 1 0\r\n0 0 1   Number of islands = 3\r\n0 1 0\r\n</pre>\r\n<p>We return the result as an array: <code>[1, 1, 2, 3]</code></p>\r\n\r\n<p><b>Challenge:</b></p>\r\n<p>Can you do it in time complexity O(k log mn), where k is the length of the <code>positions</code>?</p>",
	"frequency":"195",
	"ac_num":"29950"
}