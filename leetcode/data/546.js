{
	"difficulty":"2",
	"submit_num":"29259",
	"show_id":"565",
	"leetcode_id":"565",
	"answers":[
		{
			"lc_ans_id":"102432",
			"view":"5859",
			"top":"0",
			"title":"[C++] [Java] Clean Code - O(N)",
			"vote":"27",
			"content":"The idea is to, start from every number, find ``circle``s in those ``index-pointer-chains``, every time you find a set (a circle) ``mark every number as visited (-1)`` so that next time you won't step on it again.\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int arrayNesting(vector<int>& a) {\\n        size_t maxsize = 0;\\n        for (int i = 0; i < a.size(); i++) {\\n            size_t size = 0;\\n            for (int k = i; a[k] >= 0; size++) {\\n                int ak = a[k];\\n                a[k] = -1; // mark a[k] as visited;\\n                k = ak;\\n            }\\n            maxsize = max(maxsize, size);\\n        }\\n\\n        return maxsize;\\n    }\\n};\\n```\\n**Java**\\n```\\npublic class Solution {\\n    public int arrayNesting(int[] a) {\\n        int maxsize = 0;\\n        for (int i = 0; i < a.length; i++) {\\n            int size = 0;\\n            for (int k = i; a[k] >= 0; size++) {\\n                int ak = a[k];\\n                a[k] = -1; // mark a[k] as visited;\\n                k = ak;\\n            }\\n            maxsize = Integer.max(maxsize, size);\\n        }\\n\\n        return maxsize;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102472",
			"view":"2849",
			"top":"1",
			"title":"This is actually DFS",
			"vote":"9",
			"content":"```\\n\\t/ ** \\n\\t * This is actually a DFS.  Use a visited map to keep track of visited node. If a \\nnumber is visited before, then the set that starts at this number must be smaller then\\n previous max. So we can safely skip this number. In total it's O(n) complexity.\\n\\t */\\n\\n\\n\\npublic int arrayNesting(int[] nums) {\\n        int max = Integer.MIN_VALUE;\\n        boolean[] visited = new boolean[nums.length];\\n        for (int i = 0; i < nums.length; i++) {\\n        \\tif (visited[i]) \\n        \\t\\tcontinue;\\n        \\tmax = Math.max(max, calcLength(nums, i, visited));\\n        }\\n        return max;\\n    }\\n\\t\\n\\tprivate int calcLength(int[] nums, int start, boolean[] visited) {\\n\\t\\tint i = start, count = 0;\\n\\t\\twhile (count == 0 || i != start) {\\n\\t\\t\\tvisited[i] = true;\\n\\t\\t\\ti = nums[i];\\n\\t\\t\\tcount++;\\n\\t\\t}\\n\\t\\treturn count;\\n\\t}\\n```"
		},
		{
			"lc_ans_id":"102443",
			"view":"2622",
			"top":"2",
			"title":"Java O(n) Time O(1) Space",
			"vote":"6",
			"content":"```\\npublic int arrayNesting(int[] nums) {\\n    int res = 0;\\n    for (int i=0;i<nums.length;i++) {\\n        if (nums[i] < 0) continue;\\n        int length = 1, val = nums[i];\\n        while (Math.abs(val) != i) {\\n            length++;\\n            val = nums[Math.abs(val)];\\n            nums[Math.abs(val)] *= -1;\\n        }\\n        res = Math.max(res, length);\\n    }\\n    return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"102449",
			"view":"1338",
			"top":"3",
			"title":"Short Python",
			"vote":"5",
			"content":"Basically this problem means find the biggest cycle. One thing we shall notice is once ```i``` has been visited in previous different cycle, it must **not** in current cycle and we can ignore it.\\n```\\nclass Solution(object):\\n    def arrayNesting(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        ans, step, n = 0, 0, len(nums)\\n        seen = [False] * n\\n        for i in range(n):\\n            while not seen[i]:\\n                seen[i] = True\\n                i, step = nums[i], step + 1\\n            ans = max(ans, step)\\n            step = 0\\n        return ans\\n```"
		},
		{
			"lc_ans_id":"102489",
			"view":"1059",
			"top":"4",
			"title":"Java Solution, Union Find",
			"vote":"2",
			"content":"This is a typical Union Find problem.\\n\\n```\\npublic class Solution {\\n    class UnionFind {\\n        private int count = 0;\\n        private int[] parent, rank;\\n        \\n        public UnionFind(int n) {\\n            count = n;\\n            parent = new int[n];\\n            rank = new int[n];\\n            for (int i = 0; i < n; i++) {\\n                parent[i] = i;\\n            }\\n        }\\n        \\n        public int find(int p) {\\n            int q = parent[p];\\n            while (q != parent[q]) {\\n                q = parent[q];\\n            }\\n            parent[p] = q;\\n            return q;\\n        }\\n        \\n        public void union(int p, int q) {\\n            int rootP = find(p);\\n            int rootQ = find(q);\\n            if (rootP == rootQ) return;\\n            if (rank[rootQ] > rank[rootP]) {\\n                parent[rootP] = rootQ;\\n            }\\n            else {\\n                parent[rootQ] = rootP;\\n                if (rank[rootP] == rank[rootQ]) {\\n                    rank[rootP]++;\\n                }\\n            }\\n            count--;\\n        }\\n        \\n        public int count() {\\n            return count;\\n        }\\n        \\n        public int getMaxUnion() {\\n            Map<Integer, Integer> map = new HashMap<>();\\n            int max = 1;\\n            for (int i = 0; i < parent.length; i++) {\\n                int p = find(i);\\n                map.put(p, map.getOrDefault(p, 0) + 1);\\n                max = Math.max(max, map.get(p));\\n            }\\n            return max;\\n        }\\n    }\\n    \\n    public int arrayNesting(int[] nums) {\\n        int n = nums.length;\\n        UnionFind uf = new UnionFind(n);\\n        for (int i = 0; i < n; i++) {\\n            uf.union(i, nums[i]);\\n        }\\n        return uf.getMaxUnion();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102442",
			"view":"59",
			"top":"5",
			"title":"Java O(N) time O(1) space with Explanation and Proof",
			"vote":"1",
			"content":"This the code I use:\\n```java\\npublic class Solution {\\n    public int arrayNesting(int[] nums) {\\n        int n = nums.length, max = 0;\\n        for (int i = 0; i < n; i++) {\\n            int index = i, count = 0;\\n            while (nums[index] < n && nums[index] != i) {\\n                count++;\\n                nums[index] += n;\\n                index = nums[index] - n;\\n            }\\n            if (++count > max)\\n                max = count;\\n            if (max >= (n + 1) / 2)\\n                return max;\\n        }\\n        return max;\\n    }\\n}\\n```\\nThe given condition that **the index domain is the same as the value domain** is frequently encountered in Leetcode problems. When we have this condition, I tend to think of using a technique I call **inplace flag**. Instead of using an extra `visited` array, we can just mutate the input array to reflect the flag information we want.\\n\\nThe usual inplace flagging techniques include:\\n* negating: negate to reflect one visit, use `abs` to get the original value. This only works to detect odd numbers of previous occurrence. It is not appropriate for this problem also because the value can actually be 0 in this problem, so negating 0 does not really flag anything.\\n* module (which I used here): add one `n` to reflect a visit. Mod `n` with the entry to get the original value.\\n* sorting: put each number into its corresponding index. This is not recoverable with O(1) space, so not considered here.\\n\\nRegarding the problem of **Input Pollution**, it is actually easily fixable when using **inplace flagging**, albeit in a way some may argue imperfect. We can just recover the original input array before returning at the end. For negating, just do `abs`; for module method, just mod `n` at the end. This method fixes the problem in some situation but may still cause problem in a multithreading context.\\n\\n## Proof of this method\\nFirst, I personally like this explanation:\\n\\n@szlghl1 said in [\\\\[C\\\\+\\\\+\\\\] \\\\[Java\\\\] Clean Code \\\\- O\\\\(N\\\\)](/post/201606):\\n> Just some supplement.\\n> \\n> From the statement \"The array of size N contains number [0, N-1]\", we can know that in-degree of all nodes are exactly one (n different edges for n nodes).\\n> \\n> Therefore the graph should consist of several cycles and the cycles have no \"tails\". That's why we can skip the visited nodes, where to begin in a visited cycle doesn't matter in this circumstance.\\n\\nIt's concise and good enough for this problem. Also, I have not taken any automata course or learned anything about FSM theory. I have a feeling there are some theorems there to make the proofs here trivially easy. But again, I don't know any.\\n\\nBut in case you are into a more verbose proof, here goes.\\n\\n## Lemma 1: when we start from any `k`, we will eventually go back to `k`.\\n**Proof**: \\nFirst, let's understand each entry of `A[i] = e` as a mapping `i -> e`. Let's simplify. Suppose that there is no `k -> k` mapping for any `k`. That is no `k` is its own value. Then we ca easily see that there will be a cycle and when we start from `k` we will get back: there are only `n` distinct numbers in total. We get a different number each iteration, and then we are guaranteed to have a cycle somewhere.\\nOne caveat: what if there was a cycle when we start from `k`, but the cycle does not actually contain `k` itself? like `k -> a -> b -> c -> a`? This is also impossible, because in such a situation you will see that `a` actually belongs to two different mappings where it's a descendant: `k -> a` and `c -> a`. No number can have two different parents because that would mean in the original array, two different indices have the same value, that is just illegal.\\n\\nNow, what if there are actually *one* `k -> k` mappings? Just think of the subproblem formed by the `N-1` numbers: the lemma is valid in this subproblem. Regarding the sole `k -> k` itself, it's a cycle already, and does not undermine the proof of the lemma. \\nWhat if there are more such `k -> k` mappings? Just think inductively. They don't matter. \\n**End Of Proof**\\n\\nNow, lemma 1 proved why we do the duplicate detection as the loop header. But what about the *visited flag** part? Why is it that as long as we found a visited number, we can leave it there because it's already covered by some cycle from a previous `i`?\\n\\n## Lemma 2: All cycles are disjoint.\\n**Proof**: to make the lemma easier to prove, we rephrase:\\nIf we start from `k` and reached a visited `t`, then `k` must belong to the same cycle as `t`.\\n\\nThis is actually easily provable using the same thought regarding the  `k -> a -> b -> c -> a` above: now that `t` is visited, we know that `t` is in a cycle. And now that `k` can reach `t`, then if we start from `k`, we must enter this very cycle at some point. Say this point is `t'` (`t'` can be the same as `t`):\\n* if `t'` is not `t`: then we know that we must have a mapping `k -> t'`. Suppose `k` is not in this cycle for the purpose of contradiction. Then there must be a node `t''` in the cycle which is not `k` but which also provides `t'' -> t'`. Now `t'` has two distinct parents, and that is illegal. Thus contradiction.\\n* if `t'` equals `t`: so we have `k -> t`. Do something similar to the above case and it's also easily provable.\\n**End of Proof**\\n\\nI think these two lemmas suffice for understanding the problem and the algorithm now. Hope this helps."
		},
		{
			"lc_ans_id":"102473",
			"view":"69",
			"top":"6",
			"title":"Python solution",
			"vote":"1",
			"content":"`````\\ndef arrayNesting(self, nums):\\n        seen, res = [0] * len(nums), 0\\n        for i in nums:\\n            count, j = 0, i\\n            while not seen[j]:\\n                seen[j], count, j = 1, count + 1, nums[j]\\n            res = max(res, count)\\n        return res"
		},
		{
			"lc_ans_id":"102480",
			"view":"56",
			"top":"7",
			"title":"Easy understand Python code",
			"vote":"1",
			"content":"```\\nclass Solution(object):\\n    def arrayNesting(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        dic = {}\\n        result = -float('inf')\\n        for index in range(len(nums)):\\n            count = 1\\n            dic[index] = 1\\n            while True:\\n                if nums[index] not in dic:\\n                    count += 1\\n                    dic[nums[index]] = 1\\n                    index = nums[index]\\n                else:\\n                    result = max(result,count)\\n                    break\\n        return result\\n```"
		},
		{
			"lc_ans_id":"102488",
			"view":"129",
			"top":"8",
			"title":"Python, Straightforward with Explanation",
			"vote":"1",
			"content":"For every value ```0 <= x < N```, consider the set ```S_x = {x, A[x], A[A[x]], A[A[A[x]]],...}```\\nEvery node ```x``` belongs to some representative set ```S_i```.  We'll repeatedly take an unvisited node and visit all members of it's representative set.  We keep track of the size of this set ```bns = |S_i|``` and take a running max ```ans = max(ans, bns)```.\\n\\n```\\ndef arrayNesting(self, A):\\n    N = len(A)\\n    ans = 0\\n    seen = [False] * N\\n    for x in xrange(N):\\n    \\tbns = 0\\n    \\twhile not seen[x]:\\n            seen[x] = True\\n            x = A[x]\\n            bns += 1\\n        ans = max(ans, bns)\\n    return ans\\n```"
		},
		{
			"lc_ans_id":"102428",
			"view":"7",
			"top":"9",
			"title":"Should the example output be 4?",
			"vote":"0",
			"content":"For the example output, should it be 4 instead?\\n```\\nInput: A = [5,4,0,3,1,6,2]\\nOutput: 6\\nExplanation: \\nA[0] = 5, A[1] = 4, A[2] = 0, A[3] = 3, A[4] = 1, A[5] = 6, A[6] = 2.\\n\\nOne of the longest S[K]:\\nS[0] = {A[0], A[5], A[6], A[2]} = {5, 6, 2, 0}\\n```"
		}
	],
	"id":"546",
	"title":"Array Nesting",
	"content":"<p>A zero-indexed array A of length N contains all integers from 0 to N-1. Find and return the longest length of set S, where S[i] = {A[i], A[A[i]], A[A[A[i]]], ... } subjected to the rule below.</p>\n\n<p>Suppose the first element in S starts with the selection of element A[i] of index = i, the next element in S should be A[A[i]], and then A[A[A[i]]]… By that analogy, we stop adding right before a duplicate element occurs in S.</p>\n\n<p><b>Example 1:</b><br />\n<pre>\n<b>Input:</b> A = [5,4,0,3,1,6,2]\n<b>Output:</b> 6\n<b>Explanation:</b> \nA[0] = 5, A[1] = 4, A[2] = 0, A[3] = 3, A[4] = 1, A[5] = 6, A[6] = 2.\n\nOne of the longest S[K]:\nS[0] = {A[0], A[5], A[6], A[2]} = {5, 6, 2, 0}\n</pre>\n</p>\n\n<p><b>Note:</b><br>\n<ol>\n<li>N is an integer within the range [1, 20,000].</li>\n<li>The elements of A are all distinct.</li>\n<li>Each element of A is an integer within the range [0, N-1].</li>\n</ol>\n</p>\n",
	"frequency":"187",
	"ac_num":"14506"
}