{
	"difficulty":"2",
	"submit_num":"116165",
	"show_id":"378",
	"leetcode_id":"378",
	"answers":[
		{
			"lc_ans_id":"85173",
			"view":"55492",
			"top":"0",
			"title":"Share my thoughts and Clean Java Code",
			"vote":"263",
			"content":"Solution 1 : Heap\\nHere is the step of my solution:\\n1. Build a minHeap of elements from the first row.\\n2. Do the following operations k-1 times : \\n  Every time when you poll out the root(Top Element in Heap),  you need to know the row number and column number of that element(so we can create a tuple class here), replace that root with the next element from the same column.\\n\\nAfter you finish this problem, thinks more :\\n1. For this question, you can also build a min Heap from the first column, and do the similar operations as above.(Replace the root with the next element from the same row)\\n2. What is more, this problem is exact the same with Leetcode373 Find K Pairs with Smallest Sums, I use the same code which beats 96.42%, after you solve this problem, you can check with this link:\\nhttps://discuss.leetcode.com/topic/52953/share-my-solution-which-beat-96-42\\n```\\npublic class Solution {\\n    public int kthSmallest(int[][] matrix, int k) {\\n        int n = matrix.length;\\n        PriorityQueue<Tuple> pq = new PriorityQueue<Tuple>();\\n        for(int j = 0; j <= n-1; j++) pq.offer(new Tuple(0, j, matrix[0][j]));\\n        for(int i = 0; i < k-1; i++) {\\n            Tuple t = pq.poll();\\n            if(t.x == n-1) continue;\\n            pq.offer(new Tuple(t.x+1, t.y, matrix[t.x+1][t.y]));\\n        }\\n        return pq.poll().val;\\n    }\\n}\\n\\nclass Tuple implements Comparable<Tuple> {\\n    int x, y, val;\\n    public Tuple (int x, int y, int val) {\\n        this.x = x;\\n        this.y = y;\\n        this.val = val;\\n    }\\n    \\n    @Override\\n    public int compareTo (Tuple that) {\\n        return this.val - that.val;\\n    }\\n}\\n```\\n\\nSolution 2 : Binary Search\\nWe are done here, but let's think about this problem in another way:\\nThe key point for any binary search is to figure out the \"Search Space\". For me, I think there are two kind of \"Search Space\" -- index and range(the range from the smallest number to the biggest number). Most usually, when the array is sorted in one direction, we can use index as \"search space\", when the array is unsorted and we are going to find a specific number, we can use \"range\".\\n\\nLet me give you two examples of these two \"search space\"\\n1. index -- A bunch of examples -- https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/ ( the array is sorted)\\n2. range -- https://leetcode.com/problems/find-the-duplicate-number/ (Unsorted Array)\\n\\nThe reason why we did not use index as \"search space\" for this problem is the matrix is sorted in two directions, we can not find a linear way to map the number and its index.\\n```\\npublic class Solution {\\n    public int kthSmallest(int[][] matrix, int k) {\\n        int lo = matrix[0][0], hi = matrix[matrix.length - 1][matrix[0].length - 1] + 1;//[lo, hi)\\n        while(lo < hi) {\\n            int mid = lo + (hi - lo) / 2;\\n            int count = 0,  j = matrix[0].length - 1;\\n            for(int i = 0; i < matrix.length; i++) {\\n                while(j >= 0 && matrix[i][j] > mid) j--;\\n                count += (j + 1);\\n            }\\n            if(count < k) lo = mid + 1;\\n            else hi = mid;\\n        }\\n        return lo;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85182",
			"view":"30611",
			"top":"1",
			"title":"My solution using Binary Search in C++",
			"vote":"56",
			"content":"```\\nclass Solution\\n{\\npublic:\\n\\tint kthSmallest(vector<vector<int>>& matrix, int k)\\n\\t{\\n\\t\\tint n = matrix.size();\\n\\t\\tint le = matrix[0][0], ri = matrix[n - 1][n - 1];\\n\\t\\tint mid = 0;\\n\\t\\twhile (le < ri)\\n\\t\\t{\\n\\t\\t\\tmid = le + (ri-le)/2;\\n\\t\\t\\tint num = 0;\\n\\t\\t\\tfor (int i = 0; i < n; i++)\\n\\t\\t\\t{\\n\\t\\t\\t\\tint pos = upper_bound(matrix[i].begin(), matrix[i].end(), mid) - matrix[i].begin();\\n\\t\\t\\t\\tnum += pos;\\n\\t\\t\\t}\\n\\t\\t\\tif (num < k)\\n\\t\\t\\t{\\n\\t\\t\\t\\tle = mid + 1;\\n\\t\\t\\t}\\n\\t\\t\\telse\\n\\t\\t\\t{\\n\\t\\t\\t\\tri = mid;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn le;\\n\\t}\\n};\\n```"
		},
		{
			"lc_ans_id":"85177",
			"view":"11396",
			"top":"2",
			"title":"Java 1ms nlog(max -min) solution",
			"vote":"46",
			"content":"Main loop is binary search of max - min.\\nSwap from left-bottom to right-top can get  count <= mid in O(n) time instead of O(nlogn), total complexity will be O(nlogm) while m = max - min.\\n\\n```\\npublic class Solution {\\n    public int kthSmallest(int[][] matrix, int k) {\\n        int n = matrix.length;\\n        int lo = matrix[0][0], hi = matrix[n - 1][n - 1];\\n        while (lo <= hi) {\\n            int mid = lo + (hi - lo) / 2;\\n            int count = getLessEqual(matrix, mid);\\n            if (count < k) lo = mid + 1;\\n            else hi = mid - 1;\\n        }\\n        return lo;\\n    }\\n    \\n    private int getLessEqual(int[][] matrix, int val) {\\n        int res = 0;\\n        int n = matrix.length, i = n - 1, j = 0;\\n        while (i >= 0 && j < n) {\\n            if (matrix[i][j] > val) i--;\\n            else {\\n                res += i + 1;\\n                j++;\\n            }\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85170",
			"view":"16838",
			"top":"3",
			"title":"O(n) from paper. Yes, O(#rows).",
			"vote":"35",
			"content":"It's O(n) where n is the number of rows (and columns), not the number of elements. So it's very efficient. The algorithm is from the paper [Selection in X + Y and matrices with sorted rows and columns](http://www.cse.yorku.ca/~andy/pubs/X+Y.pdf), which I first saw mentioned by @elmirap (thanks).\\n\\n**The basic idea:** Consider the submatrix you get by removing every second row and every second column. This has about a quarter of the elements of the original matrix. And the k-th element (k-th *smallest* I mean) of the original matrix is roughly the (k/4)-th element of the submatrix. So roughly get the (k/4)-th element of the submatrix and then use that to find the k-th element of the original matrix in O(n) time. It's recursive, going down to smaller and smaller submatrices until a trivial 2\\xd72 matrix. For more details I suggest checking out the paper, the first half is easy to read and explains things well. Or @zhiqing_xiao's [solution+explanation](https://discuss.leetcode.com/topic/54262/o-row-time-o-row-space-solution-with-detail-intuitive-explanation-c-accepted).\\n\\n**Cool:** It uses variants of [saddleback search](http://cs.geneseo.edu/~baldwin/math-thinking/saddleback.html) that you might know for example from the [Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/) problem. And it uses the [median of medians](https://en.wikipedia.org/wiki/Median_of_medians) algorithm for linear-time selection.\\n\\n**Optimization:** If k is less than n, we only need to consider the top-left k\\xd7k matrix. Similar if k is almost n<sup>2</sup>. So it's even O(min(n, k, n^2-k)), I just didn't mention that in the title because I wanted to keep it simple and because those few very small or very large k are unlikely, most of the time k will be \"medium\" (and average n<sup>2</sup>/2).\\n\\n**Implementation:** I implemented the submatrix by using an index list through which the actual matrix data gets accessed. If [0, 1, 2, ..., n-1] is the index list of the original matrix, then [0, 2, 4, ...] is the index list of the submatrix and [0, 4, 8, ...] is the index list of the subsubmatrix and so on. This also covers the above optimization by starting with [0, 1, 2, ..., **k**-1] when applicable.\\n\\n**Application:** I believe it can be used to easily solve the [Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/) problem in time O(k) instead of O(k log n), which I think is the best posted so far. I might try that later if nobody beats me to it (if you do, let me know :-). ***Update:*** I [did that now](https://discuss.leetcode.com/topic/53380/o-k-solution).\\n\\n```\\nclass Solution(object):\\n    def kthSmallest(self, matrix, k):\\n\\n        # The median-of-medians selection function.\\n        def pick(a, k):\\n            if k == 1:\\n                return min(a)\\n            groups = (a[i:i+5] for i in range(0, len(a), 5))\\n            medians = [sorted(group)[len(group) / 2] for group in groups]\\n            pivot = pick(medians, len(medians) / 2 + 1)\\n            smaller = [x for x in a if x < pivot]\\n            if k <= len(smaller):\\n                return pick(smaller, k)\\n            k -= len(smaller) + a.count(pivot)\\n            return pivot if k < 1 else pick([x for x in a if x > pivot], k)\\n\\n        # Find the k1-th and k2th smallest entries in the submatrix.\\n        def biselect(index, k1, k2):\\n\\n            # Provide the submatrix.\\n            n = len(index)\\n            def A(i, j):\\n                return matrix[index[i]][index[j]]\\n            \\n            # Base case.\\n            if n <= 2:\\n                nums = sorted(A(i, j) for i in range(n) for j in range(n))\\n                return nums[k1-1], nums[k2-1]\\n\\n            # Solve the subproblem.\\n            index_ = index[::2] + index[n-1+n%2:]\\n            k1_ = (k1 + 2*n) / 4 + 1 if n % 2 else n + 1 + (k1 + 3) / 4\\n            k2_ = (k2 + 3) / 4\\n            a, b = biselect(index_, k1_, k2_)\\n\\n            # Prepare ra_less, rb_more and L with saddleback search variants.\\n            ra_less = rb_more = 0\\n            L = []\\n            jb = n   # jb is the first where A(i, jb) is larger than b.\\n            ja = n   # ja is the first where A(i, ja) is larger than or equal to a.\\n            for i in range(n):\\n                while jb and A(i, jb - 1) > b:\\n                    jb -= 1\\n                while ja and A(i, ja - 1) >= a:\\n                    ja -= 1\\n                ra_less += ja\\n                rb_more += n - jb\\n                L.extend(A(i, j) for j in range(jb, ja))\\n                \\n            # Compute and return x and y.\\n            x = a if ra_less <= k1 - 1 else \\\\\\n                b if k1 + rb_more - n*n <= 0 else \\\\\\n                pick(L, k1 + rb_more - n*n)\\n            y = a if ra_less <= k2 - 1 else \\\\\\n                b if k2 + rb_more - n*n <= 0 else \\\\\\n                pick(L, k2 + rb_more - n*n)\\n            return x, y\\n\\n        # Set up and run the search.\\n        n = len(matrix)\\n        start = max(k - n*n + n-1, 0)\\n        k -= n*n - (n - start)**2\\n        return biselect(range(start, min(n, start+k)), k, k)[0]\\n```"
		},
		{
			"lc_ans_id":"85222",
			"view":"5624",
			"top":"4",
			"title":"C++ priority queue solution O(klogn)",
			"vote":"15",
			"content":"```\\nclass Solution {\\npublic:\\nstruct compare\\n{\\n    bool operator()(const pair<int,pair<int, int> >& a, const pair<int,pair<int, int> >& b)\\n    {\\n        return a.first>b.first;\\n    }\\n};\\n    int kthSmallest(vector<vector<int>>& arr, int k) {\\n        \\n        int n=arr.size(),m=arr[0].size();\\n        \\n        priority_queue< pair<int,pair<int, int> >, vector<pair<int, pair<int, int> > >, compare > p;\\n        \\n        for(int i=0;i<n;i++)\\n        p.push(make_pair(arr[i][0],make_pair(i,0)));\\n        \\n        int x=k,ans;\\n        while(x--)\\n        {\\n            int e=p.top().first;\\n            int i=p.top().second.first;\\n            int j=p.top().second.second;\\n            ans=e;\\n            p.pop();\\n            if(j!=m-1)\\n            p.push(make_pair(arr[i][j+1],make_pair(i,j+1)));\\n        }\\n        return ans;\\n        \\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"85201",
			"view":"4265",
			"top":"5",
			"title":"C++ O(n)-time O(n)-space solution with detail intuitive explanation",
			"vote":"14",
			"content":"This thread is inspired by [**@StefanPochmann**'s thread](https://discuss.leetcode.com/topic/53126/o-n-from-paper-yes-o-rows), which mentioned [**Mirzaian** and **Arjoandi**'s paper](http://www.cse.yorku.ca/~andy/pubs/X+Y.pdf).\\n\\n**Preparations**\\n1. When `n==1` (i.e. the matrix is `1x1`. `n` is the number of row), the problem is trival. Hencefore we only consider the case `n>=2`.\\n2. Rather than finding one `k`-th element from the matrix, we will select **TWO** elements (say, `k0`-th element and `k1`-th element) simultaneously, such that `0<=k0<=k1<n*n` and `k1-k0<=4n`. Obviously, if we can complete the aforementioned selection in *O*(n), we can find the `k`-th element in *O*(n) by simply letting `k=k0=k1`.\\nLet `x0` denote the `k0`-th element; let `x1` denote the `k1`-th element. Obviously we have `x0<=x1`.\\n\\nNow we will introduce how to select `x0` and `x1` in *O*(n).\\n\\n**General idea:**\\nFor an `nxn` matrix, where `n` is large, we try to select  `x0` and `x1` in a recursive way. \\n1. (**Determine submatrix**) This step constructs one submatrix, whose number of elements will be approximately a quarter of the original matrix. The submatrix is defined as every other row and every other column of the original matrix. The last row and the last column are included too (the reason will be stated in the sequel.) Then the dimension of the matrix is approximately `(n/2) x (n/2)`. The submatrix is recorded by the indices in the original matrix.\\n*Example 1:* *the original matrix has indices {0, 1, 2, 3, 4}, then the submatrix has indices {0, 2, 4}.*\\n*Example 2:* *the original matrix has indices {0,1, 2, 3, 4, 5}, then the submatrix has indices {0, 2,4, 5}.*\\n2. (**Determine new k's**)  This step determines two new k's (denoted as `k0_` and `k1_`) such that **(i)** `k0_` is the largest possible integer to ensure `k0_`-th element in the new submatrix (denoted as `x0_`) is not greater than `x0`; **(ii)** `k1_` is the smallest possible integer to ensure `k1_`-th element in the new submatrix (denoted as `x1_`) is not less than `x1`. This step is the most tricky step.\\n\\n\\t\\tk0_ = floor(k0 / 4)\\n\\t\\tk1_ = floor(k1 / 4) + n + 1 (when n is even)\\n\\t         floor((k1 + 2 * n + 1) / 4) (when n is odd)\\n\\n![Picture: the way to determine k0_ and k1_: https://drive.google.com/open?id=0By2m48ItFbTeeDFvaS1WcV9qSWM](https://drive.google.com/open?id=0By2m48ItFbTeeDFvaS1WcV9qSWM)\\n\\nThe picture can also be founded [here](https://drive.google.com/open?id=0By2m48ItFbTeeDFvaS1WcV9qSWM).\\n\\n   *Recall that we mentioned the last row and column shall always be included in the matrix. That is to ensure we can always found the* `x1_` *such that* `x1_ >= x1`.\\n3. (**Call recursively**) Obtain`x0_` and `x1_` by recursion.\\n4. (**Partition**)  Partition all elements in the original `nxn` elements into three parts: `P1={e: e < x0_}`, `P2={e: x0_ <= e < x1_ }`, `P3={e: x1_ < e} `. We only need to record the cardinality of `P1` and `P2` (denoted as `|P1|` and `|P2|` respectively), and the elements in `P2`. Obviously, the cardinality of `P2` is *O*(n).\\n5. (**Get x0 and x1**) From the definition of `k0_` and `k1_`, we have `|P1| < k0 <= |P1|+|P2|`. When `|P1| < k0 < |P1|+|P2|`, `x0` is the `k0-|P1|`-th element of P2; otherwise `x0=x1_`. `x1` can be determined in a similar way. This action is also *O*(n).\\n    \\n------------------------------------------------\\n**Complexities:**\\n- Time: *O*(n) -----   *Apply* `T(n) = T(n/2) + O(n)` *in the Master's Theorem.*\\n- Space: *O*(n)\\n------------------------------------------------\\n**C++ Accepted Code:**\\n\\n\\tclass Solution {\\n\\tpublic:\\n\\t\\tint kthSmallest(const std::vector<std::vector<int>> & matrix, int k)\\n\\t\\t{\\n\\t\\t\\tif (k == 1) // guard for 1x1 matrix\\n\\t\\t\\t{\\n\\t\\t\\t\\treturn matrix.front().front();\\n\\t\\t\\t}\\n\\n\\t\\t\\tsize_t n = matrix.size();\\n\\t\\t\\tstd::vector<size_t> indices(n);\\n\\t\\t\\tstd::iota(indices.begin(), indices.end(), 0);\\n\\t\\t\\tstd::array<size_t, 2> ks = { k - 1, k - 1 }; // use zero-based indices\\n\\t\\t\\tstd::array<int, 2> results = biSelect(matrix, indices, ks);\\n\\t\\t\\treturn results[0];\\n\\t\\t}\\n\\n\\tprivate:\\n\\t\\t// select two elements from four elements, recursively\\n\\t\\tstd::array<int, 2> biSelect(\\n\\t\\t\\tconst std::vector<std::vector<int>> & matrix,\\n\\t\\t\\tconst std::vector<size_t> & indices,\\n\\t\\t\\tconst std::array<size_t, 2> & ks)\\n\\t\\t// Select both ks[0]-th element and ks[1]-th element in the matrix,\\n\\t\\t// where k0 = ks[0] and k1 = ks[1] and n = indices.size() satisfie\\n\\t\\t// 0 <= k0 <= k1 < n*n  and  k1 - k0 <= 4n-4 = O(n)   and  n>=2\\n\\t\\t{\\n\\t\\t\\tsize_t n = indices.size();\\t\\t\\n\\t\\t\\tif (n == 2u) // base case of resursion\\n\\t\\t\\t{\\t\\t\\t\\n\\t\\t\\t\\treturn biSelectNative(matrix, indices, ks);\\n\\t\\t\\t}\\n\\t\\t\\t\\n\\t\\t\\t// update indices\\n\\t\\t\\tstd::vector<size_t> indices_;\\n\\t\\t\\tfor (size_t idx = 0; idx < n; idx += 2)\\n\\t\\t\\t{\\n\\t\\t\\t\\tindices_.push_back(indices[idx]);\\n\\t\\t\\t}\\n\\t\\t\\tif (n % 2 == 0) // ensure the last indice is included\\n\\t\\t\\t{\\n\\t\\t\\t\\tindices_.push_back(indices.back());\\n\\t\\t\\t}\\n\\n\\t\\t\\t// update ks\\n\\t\\t\\t// the new interval [xs_[0], xs_[1]] should contain [xs[0], xs[1]]\\n\\t\\t\\t// but the length of the new interval should be as small as possible\\n\\t\\t\\t// therefore, ks_[0] is the largest possible index to ensure xs_[0] <= xs[0]\\n\\t\\t\\t// ks_[1] is the smallest possible index to ensure xs_[1] >= xs[1]\\n\\t\\t\\tstd::array<size_t, 2> ks_ = { ks[0] / 4, 0 };\\n\\t\\t\\tif (n % 2 == 0) // even\\n\\t\\t\\t{\\n\\t\\t\\t\\tks_[1] = ks[1] / 4 + n + 1;\\n\\t\\t\\t}\\n\\t\\t\\telse // odd\\n\\t\\t\\t{\\n\\t\\t\\t\\tks_[1] = (ks[1] + 2 * n + 1) / 4;\\n\\t\\t\\t}\\n\\n\\t\\t\\t// call recursively\\n\\t\\t\\tstd::array<int, 2> xs_ = biSelect(matrix, indices_, ks_);\\n\\n\\t\\t\\t// Now we partipate all elements into three parts:\\n\\t\\t\\t// Part 1: {e : e < xs_[0]}.  For this part, we only record its cardinality\\n\\t\\t\\t// Part 2: {e : xs_[0] <= e < xs_[1]}. We store the set elementsBetween\\n\\t\\t\\t// Part 3: {e : x >= xs_[1]}. No use. Discard.\\n\\t\\t\\tstd::array<int, 2> numbersOfElementsLessThanX = { 0, 0 };\\n\\t\\t\\tstd::vector<int> elementsBetween; // [xs_[0], xs_[1])\\n\\n\\t\\t\\tstd::array<size_t, 2> cols = { n, n }; // column index such that elem >= x\\n\\t\\t\\t // the first column where matrix(r, c) > b\\n\\t\\t\\t // the first column where matrix(r, c) >= a\\n\\t\\t\\tfor (size_t row = 0; row < n; ++row)\\n\\t\\t\\t{\\n\\t\\t\\t\\tsize_t row_indice = indices[row];\\n\\t\\t\\t\\tfor (size_t idx : {0, 1})\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\twhile ((cols[idx] > 0)\\n\\t\\t\\t\\t\\t\\t&& (matrix[row_indice][indices[cols[idx] - 1]] >= xs_[idx]))\\n\\t\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\t\\t--cols[idx];\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\tnumbersOfElementsLessThanX[idx] += cols[idx];\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\tfor (size_t col = cols[0]; col < cols[1]; ++col)\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\telementsBetween.push_back(matrix[row_indice][indices[col]]);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\n\\t\\t\\tstd::array<int, 2> xs; // the return value\\n\\t\\t\\tfor (size_t idx : {0, 1})\\n\\t\\t\\t{\\n\\t\\t\\t\\tsize_t k = ks[idx];\\n\\t\\t\\t\\tif (k < numbersOfElementsLessThanX[0]) // in the Part 1\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\txs[idx] = xs_[0];\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\telse if (k < numbersOfElementsLessThanX[1]) // in the Part 2\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\tsize_t offset = k - numbersOfElementsLessThanX[0];\\n\\t\\t\\t\\t\\tstd::vector<int>::iterator nth = std::next(elementsBetween.begin(), offset);\\n\\t\\t\\t\\t\\tstd::nth_element(elementsBetween.begin(), nth, elementsBetween.end());\\n\\t\\t\\t\\t\\txs[idx] = (*nth);\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\telse // in the Part 3\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\txs[idx] = xs_[1];\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\treturn xs;\\n\\t\\t}\\n\\n\\t\\t// select two elements from four elements, using native way\\n\\t\\tstd::array<int, 2> biSelectNative(\\n\\t\\t\\tconst std::vector<std::vector<int>> & matrix,\\n\\t\\t\\tconst std::vector<size_t> & indices,\\n\\t\\t\\tconst std::array<size_t, 2> & ks)\\n\\t\\t{\\n\\t\\t\\tstd::vector<int> allElements;\\n\\t\\t\\tfor (size_t r : indices)\\n\\t\\t\\t{\\n\\t\\t\\t\\tfor (size_t c : indices)\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\tallElements.push_back(matrix[r][c]);\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\tstd::sort(allElements.begin(), allElements.end());\\n\\t\\t\\tstd::array<int, 2> results;\\n\\t\\t\\tfor (size_t idx : {0, 1})\\n\\t\\t\\t{\\n\\t\\t\\t\\tresults[idx] = allElements[ks[idx]];\\n\\t\\t\\t}\\n\\t\\t\\treturn results;\\n\\t\\t}\\n\\t};"
		},
		{
			"lc_ans_id":"85193",
			"view":"3204",
			"top":"6",
			"title":"Binary Search, Heap and Sorting comparison, with concise code and 1-liners, Python 72 ms",
			"vote":"14",
			"content":"For n X n matrix,\\n\\n**1. Binary search** (based on the [solution](https://discuss.leetcode.com/topic/52865/my-solution-using-binary-search-in-c) from @\\u5149\\u901f\\u5c0f\\u5b50) gives me 72 ms. \\n\\nThe time complexity is O(n * log(n) * log(N)), where N is the search space that ranges from the smallest element to the biggest element. You can argue that int implies N = 2^32, so log(N) is constant. In a way, this is an O(n * log(n)) solution.\\n\\nThe space complexity is constant.\\n\\nI thought this idea was weird for a while. Then I noticed the previous problem 377. Combination Sum IV is pretty much doing the same thing, so this idea may actually be intended.\\n\\nHere is a 8-liner implementation:\\n```\\nclass Solution(object):\\n    def kthSmallest(self, matrix, k):\\n        lo, hi = matrix[0][0], matrix[-1][-1]\\n        while lo<hi:\\n            mid = (lo+hi)//2\\n            if sum(bisect.bisect_right(row, mid) for row in matrix) < k:\\n                lo = mid+1\\n            else:\\n                hi = mid\\n        return lo\\n```\\n\\n**2. Heap solution** gives me 176 ms. The time complexity is O(k * log n), so the worst-case and average-case time complexity is O(n^2 * log n). Space complexity is O(n).\\n\\n```\\nclass Solution(object):\\n    def kthSmallest(self, matrix, k):\\n        heap = [(row[0], i, 0) for i, row in enumerate(matrix)]\\n        heapq.heapify(heap)\\n        ret = 0\\n        for _ in range(k):\\n            ret, i, j = heapq.heappop(heap)\\n            if j+1 < len(matrix[0]):\\n                heapq.heappush(heap, (matrix[i][j+1], i, j+1))\\n        return ret\\n```\\n\\n**3. Sorting** gives me 80ms. Time complexity of sorting an array of size n^2 is O(n^2 * log n). Space complexity is O(n^2).\\n\\nThe difference is that Timsort implemented in Python is capable of taking advantage of existing partial orderings. Moving sorted data in bulk is always faster than comparing and moving individual data elements, due to modern hardware architecture. Time complexity is the same because merging n sorted arrays of size n is still O(n^2 * log n) in the worst case.\\n \\n```\\nclass Solution(object):\\n    def kthSmallest(self, matrix, k):\\n        l = []\\n        for row in matrix:\\n            l += row\\n        return sorted(l)[k-1]\\n```\\n\\nHere are some O(n^3) (slow due to list concatenation) 1-liners:\\n```\\nclass Solution(object):\\n    def kthSmallest(self, matrix, k):\\n        return sorted(sum(matrix, []))[k-1]\\n```\\nand\\n```\\nclass Solution(object):\\n    def kthSmallest(self, matrix, k):\\n        return sorted(reduce(lambda a,b:a+b, matrix))[k-1]\\n```\\n\\nHere are some O(n^2 * log n) 1-liners provided by @StefanPochmann \\n```\\n    return sorted(itertools.chain(*matrix))[k-1]\\n    return sorted(a for row in matrix for a in row)[k-1]\\n    return sorted(itertools.chain.from_iterable(matrix))[k-1]\\n```"
		},
		{
			"lc_ans_id":"85188",
			"view":"4798",
			"top":"7",
			"title":"python one-line solution ...",
			"vote":"13",
			"content":" life is too short to figure out more intelligent solution...\\n```\\nimport heapq\\nclass Solution(object):\\n    def kthSmallest(self, matrix, k):\\n        return list(heapq.merge(*matrix))[k-1]\\n\\n```"
		},
		{
			"lc_ans_id":"85178",
			"view":"2744",
			"top":"8",
			"title":"Java heap klog(k)",
			"vote":"7",
			"content":"Similar to [Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/).\\n```\\npublic class Solution {\\n    public int kthSmallest(final int[][] matrix, int k) {\\n        int c = 0;\\n        PriorityQueue<int[]> queue = new PriorityQueue<>(\\n            k, (o1, o2) -> matrix[o1[0]][o1[1]] - matrix[o2[0]][o2[1]]);\\n        queue.offer(new int[] {0, 0});\\n        while (true) {\\n            int[] pair = queue.poll();\\n            if (++c == k) {\\n                return matrix[pair[0]][pair[1]];\\n            }\\n            if (pair[0] == 0 && pair[1] + 1 < matrix[0].length) {\\n                queue.offer(new int[] {0, pair[1] + 1});\\n            }\\n            if (pair[0] + 1 < matrix.length) {\\n                queue.offer(new int[] {pair[0] + 1, pair[1]});\\n            }\\n        }\\n    }\\n}"
		},
		{
			"lc_ans_id":"85230",
			"view":"2863",
			"top":"9",
			"title":"Share My Python Solution using Heap",
			"vote":"6",
			"content":"**Algorithm**\\n\\n1. ``h``: list of tuple ``(element, row, index)``, which is initialised with first element of each row in the matrix.\\n2. We maintain a heap. In the for loop, we get the smallest element ``v`` which is in row ``r``, and replace ``v`` with the next element in the row ``r``\\n\\n**Time Complexity**\\n\\n- insert an element into heap: O(log(n)), where n is the width of the matrix\\n- find k the k-th element O(k)\\n- Overall: O(klog(n))   \\n\\n```python\\nfrom heapq import heappush, heappop, heapreplace, heapify\\nclass Solution(object):\\n    def kthSmallest(self, matrix, k):\\n        \"\"\"\\n        :type matrix: List[List[int]]\\n        :type k: int\\n        :rtype: int\\n        \"\"\"\\n        h = [(row[0], row, 1) for row in matrix]\\n        heapify(h)\\n\\n        # Since we want to find kth, we pop the first k elements \\n        for _ in xrange(k - 1):\\n            v, r, i = h[0]\\n            if i < len(r):\\n                heapreplace(h, (r[i], r, i + 1))\\n            else:\\n                heappop(h)\\n\\n        return h[0][0]\\n```"
		}
	],
	"id":"378",
	"title":"Kth Smallest Element in a Sorted Matrix",
	"content":"<p>Given a <i>n</i> x <i>n</i> matrix where each of the rows and columns are sorted in ascending order, find the kth smallest element in the matrix.</p>\r\n\r\n<p>\r\nNote that it is the kth smallest element in the sorted order, not the kth distinct element.\r\n</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nmatrix = [\r\n   [ 1,  5,  9],\r\n   [10, 11, 13],\r\n   [12, 13, 15]\r\n],\r\nk = 8,\r\n\r\nreturn 13.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note: </b><br>\r\nYou may assume k is always valid, 1 &le; k &le; n<sup>2</sup>.</p>",
	"frequency":"331",
	"ac_num":"52760"
}