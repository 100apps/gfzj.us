{
	"difficulty":"3",
	"submit_num":"17499",
	"show_id":"632",
	"leetcode_id":"632",
	"answers":[
		{
			"lc_ans_id":"104893",
			"view":"6601",
			"top":"0",
			"title":"Java Code using PriorityQueue. similar to merge k array",
			"vote":"27",
			"content":"Image you are merging k sorted array using a heap. Then everytime you pop the smallest element out and add the next element of that array to the heap. By keep doing this, you will have the smallest range. \\n\\n```\\npublic int[] smallestRange(int[][] nums) {\\n\\t\\tPriorityQueue<Element> pq = new PriorityQueue<Element>(new Comparator<Element>() {\\n\\t\\t\\tpublic int compare(Element a, Element b) {\\n\\t\\t\\t\\treturn a.val - b.val;\\n\\t\\t\\t}\\n\\t\\t});\\n\\t\\tint min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;\\n\\t\\tfor (int i = 0; i < nums.length; i++) {\\n\\t\\t\\tElement e = new Element(i, 0, nums[i][0]);\\n\\t\\t\\tpq.offer(e);\\n\\t\\t\\tmax = Math.max(max, nums[i][0]);\\n\\t\\t}\\n\\t\\tint range = Integer.MAX_VALUE;\\n\\t\\tint start = -1, end = -1;\\n\\t\\twhile (pq.size() == nums.length) {\\n\\n\\t\\t\\tElement curr = pq.poll();\\n\\t\\t\\tif (max - curr.val < range) {\\n\\t\\t\\t\\trange = max - curr.val;\\n\\t\\t\\t\\tstart = curr.val;\\n\\t\\t\\t\\tend = max;\\n\\t\\t\\t}\\n\\t\\t\\tif (curr.idx + 1 < nums[curr.row].length) {\\n\\t\\t\\t\\tcurr.idx = curr.idx + 1;\\n\\t\\t\\t\\tcurr.val = nums[curr.row][curr.idx];\\n\\t\\t\\t\\tpq.offer(curr);\\n\\t\\t\\t\\tif (curr.val > max) {\\n\\t\\t\\t\\t\\tmax = curr.val;\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\treturn new int[] { start, end };\\n\\t}\\n\\n\\tclass Element {\\n\\t\\tint val;\\n\\t\\tint idx;\\n\\t\\tint row;\\n\\n\\t\\tpublic Element(int r, int i, int v) {\\n\\t\\t\\tval = v;\\n\\t\\t\\tidx = i;\\n\\t\\t\\trow = r;\\n\\t\\t}\\n\\t}\\n```"
		},
		{
			"lc_ans_id":"104886",
			"view":"2494",
			"top":"1",
			"title":"Clean C++ priority_queue solution using iterators",
			"vote":"15",
			"content":"Yes. The idea is just similar to Merge K Sorted List. Keep a priority queue of iterators/pointers which points to the current head of a row.\\n\\n```\\nclass Solution {\\npublic:\\n    vector<int> smallestRange(vector<vector<int>>& nums) {\\n        typedef vector<int>::iterator vi;\\n        \\n        struct comp {\\n            bool operator()(pair<vi, vi> p1, pair<vi, vi> p2) {\\n                return *p1.first > *p2.first;\\n            }\\n        };\\n        \\n        int lo = INT_MAX, hi = INT_MIN;\\n        priority_queue<pair<vi, vi>, vector<pair<vi, vi>>, comp> pq;\\n        for (auto &row : nums) {\\n            lo = min(lo, row[0]);\\n            hi = max(hi, row[0]);\\n            pq.push({row.begin(), row.end()});\\n        }\\n        \\n        vector<int> ans = {lo, hi};\\n        while (true) {\\n            auto p = pq.top();\\n            pq.pop();\\n            ++p.first;\\n            if (p.first == p.second)\\n                break;\\n            pq.push(p);\\n            \\n            lo = *pq.top().first;\\n            hi = max(hi, *p.first);\\n            if (hi - lo < ans[1] - ans[0])\\n                ans = {lo, hi};\\n        }\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"104904",
			"view":"2173",
			"top":"2",
			"title":"Python, Heap-based solution",
			"vote":"14",
			"content":"```\\ndef smallestRange(self, A):\\n    pq = [(row[0], i, 0) for i, row in enumerate(A)]\\n    heapq.heapify(pq)\\n    \\n    ans = -1e9, 1e9\\n    right = max(row[0] for row in A)\\n    while pq:\\n        left, i, j = heapq.heappop(pq)\\n        if right - left < ans[1] - ans[0]:\\n            ans = left, right\\n        if j + 1 == len(A[i]):\\n            return ans\\n        v = A[i][j+1]\\n        right = max(right, v)\\n        heapq.heappush(pq, (v, i, j+1))\\n```\\n\\nKeep a heap of the smallest elements.  As we pop element A[i][j], we'll replace it with A[i][j+1].  For each such element ```left```, we want ```right```, the maximum of the closest value in each row of the array that is ```>= left```, which is also equal to the current maximum of our heap.  We'll keep track of ```right``` as we proceed.\\n\\n*Edited with thanks to @StefanPochmann*"
		},
		{
			"lc_ans_id":"104920",
			"view":"2000",
			"top":"3",
			"title":"Java 8, Sliding window",
			"vote":"5",
			"content":"The idea is to sort all the elements in the k lists and run a sliding window over the sorted list, to find the minimum window that satisfies the criteria of having atleast one element from each list.\\n```\\npublic static int[] smallestRange(List<List<Integer>> nums) {\\n        List<int[]> list = IntStream.range(0, nums.size())\\n                .mapToObj( i -> nums.get(i).stream().map(x -> new int[]{x, i}))\\n                .flatMap(y -> y)\\n                .sorted(Comparator.comparingInt(p -> p[0])).collect(toList());\\n        int[] counts = new int[nums.size()];\\n        BitSet set = new BitSet(nums.size());\\n        int start = -1;\\n        int[] res = new int[2];\\n        for(int i = 0; i < list.size(); i++) {\\n            int[] p = list.get(i);\\n            set.set(p[1]);\\n            counts[p[1]] += 1;\\n            if(start == -1) { start = 0; }\\n            while(start < i && counts[list.get(start)[1]] > 1) {\\n                counts[list.get(start)[1]]--;\\n                start++;\\n            }\\n            if(set.cardinality() == nums.size()) {\\n                if( (res[0] == 0 && res[1] == 0) || (list.get(i)[0] - list.get(start)[0]) < res[1] - res[0]) {\\n                    res[0] = list.get(start)[0];\\n                    res[1] = list.get(i)[0];\\n                }\\n            }\\n        }\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"104905",
			"view":"1687",
			"top":"4",
			"title":"Python, Straightforward with Explanation",
			"vote":"2",
			"content":"```\\ndef smallestRange(self, A):\\n    A = [row[::-1] for row in A]\\n    \\n    ans = -1e9, 1e9\\n    for left in sorted(reduce(set.union, map(set, A))):\\n        right = -1e9\\n        for B in A:\\n            while B and B[-1] < left:\\n                B.pop()\\n            if not B:\\n                return ans\\n            right = max(right, B[-1])\\n        if right - left < ans[1] - ans[0]:\\n            ans = left, right\\n    return ans\\n```\\n\\nClearly, each left and right bound must be a value in some array.\\n\\nFor each candidate left bound equal to some value in some array, let's determine the next-rightmost value of each array.  If it doesn't exist, then our left is already too large for any subsequent candidates to have a solution.  Otherwise, we can choose the maximum of these to be the corresponding right bound for our candidate left bound.  We take the maximum of all such candidates."
		},
		{
			"lc_ans_id":"104910",
			"view":"311",
			"top":"5",
			"title":"[C++] 45ms O(n) space O(n) time sol, without priority queue, iterators, just vectors",
			"vote":"1",
			"content":"The idea is storing all elements in a single array as pairs<number, list come from>. And then traverse the list using two pointer methods to find the smallest range.\\n```\\nclass Solution {\\npublic:\\n    vector<int> smallestRange(vector<vector<int>>& nums) { \\n        vector<pair<int, int>> data;   // first: number, second: the list the num comes from\\n        vector<int> hascover(nums.size(), 0);  // num of elements from each list in current range\\n        vector<int> result;\\n\\n        for (int i=0; i<nums.size(); i++) {\\n            for (int each: nums[i]) {\\n                data.push_back({each, i});\\n            }\\n        }  \\n        sort(data.begin(), data.end());\\n\\n        int minindex = 0;\\n        int mindiff = INT_MAX;\\n        int count = nums.size();  // nums of lists are in the range, 0 means all\\n        \\n        for (int i=0; i<data.size(); i++) {\\n            if (hascover[data[i].second] == 0) count--;\\n            hascover[data[i].second]++;\\n            \\n            while (count==0 && minindex <= i) {\\n                int minnum = data[minindex].first;\\n                int maxnum = data[i].first;\\n                if (maxnum - minnum < mindiff) {\\n                    mindiff = maxnum - minnum;\\n                    result.clear();\\n                    result.push_back(minnum);\\n                    result.push_back(maxnum);\\n                }\\n                hascover[data[minindex].second]--;\\n                if (hascover[data[minindex].second] == 0) count++;\\n                minindex++;\\n            }\\n        }\\n        return result;\\n    }\\n\\n};"
		},
		{
			"lc_ans_id":"104918",
			"view":"194",
			"top":"6",
			"title":"Java Solution with maxHeap&minHeap",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int[] smallestRange(List<List<Integer>> nums) {\\n          PriorityQueue<int[]> min=new PriorityQueue<>(1,new Comparator<int[]>(){\\n              public int compare(int[] n1,int[] n2){\\n                  return nums.get(n1[0]).get(n1[1])-nums.get(n2[0]).get(n2[1]);\\n              }              \\n          });\\n          \\n          PriorityQueue<int[]> max=new PriorityQueue<>(1,new Comparator<int[]>(){\\n              public int compare(int[] n1,int[] n2){\\n                  return nums.get(n2[0]).get(n2[1])-nums.get(n1[0]).get(n1[1]);\\n              }\\n          });\\n          \\n          for(int i=0;i<nums.size();i++){\\n                int[] tmp=new int[]{i,0};\\n                min.offer(tmp);\\n                max.offer(tmp);\\n          }\\n          int[] res=new int[]{Integer.MIN_VALUE,Integer.MAX_VALUE};\\n          \\n          while(min.size()==nums.size()){\\n              int[] m1=max.peek();\\n              int[] m2=min.poll();\\n              if((long)nums.get(m1[0]).get(m1[1])-(long)nums.get(m2[0]).get(m2[1])<(long)res[1]-(long)res[0]){\\n                  res[0]=nums.get(m2[0]).get(m2[1]);\\n                  res[1]=nums.get(m1[0]).get(m1[1]);\\n              }\\n              \\n              if(m2[1]+1<nums.get(m2[0]).size()){\\n                  int[] m3=new int[]{m2[0],m2[1]+1};\\n                  min.offer(m3);\\n                  max.offer(m3);\\n                  max.remove(m2);\\n              }\\n          }\\n          \\n          return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104919",
			"view":"112",
			"top":"7",
			"title":"C# accept solution",
			"vote":"1",
			"content":"Idea: from end to start, using quick select to insert index. \\nevery time find the biggest value of index(in nums array), remove it and insert it's next small one, until the biggest value of index == 0; \\n\\n```\\npublic class Solution {\\n    public int[] SmallestRange(IList<IList<int>> nums) {\\n        var list = new List<int>();\\n        int len = nums.Count;\\n        var indexArr = new int[len];\\n        for(int i = 0;i<len;i++){\\n            indexArr[i] = nums[i].Count-1;\\n            int index = FindIndex(list,i,nums,indexArr);\\n            list.Insert(index,i);\\n        }\\n        //Console.WriteLine(string.Join(\",\",indexArr));\\n        int[] result = new int[]{nums[list.First()][indexArr[list.First()]],nums[list.Last()][indexArr[list.Last()]]};\\n        \\n        while(true){\\n            var lastIndex = list.Last();\\n            if(--indexArr[lastIndex] == -1)\\n                break;\\n        \\t//Console.WriteLine(j+\",\"+indexArr[j]);\\n            list.RemoveAt(list.Count-1);\\n            \\n        \\tlist.Insert(FindIndex(list,lastIndex,nums,indexArr),lastIndex);\\n            \\n        \\tint n1 = nums[list.First()][indexArr[list.First()]];\\n        \\tint n2 = nums[list.Last()][indexArr[list.Last()]];\\n            \\n            if(n2-n1 < result[1]-result[0] || n2-n1 == result[1]-result[0] && n1 < result[0]){\\n                result[0] = n1;\\n                result[1] = n2;\\n            }   \\n            //Console.WriteLine(string.Join(\",\",list));\\n        }\\n        \\n        return result;\\n    }\\n    \\n    private int FindIndex(List<int> list,int index,IList<IList<int>> nums,int[] indexArr){\\n        if(list.Count == 0)\\n        \\treturn 0;\\n        \\n        int low = 0;\\n        int high = list.Count-1;\\n        int v = nums[index][indexArr[index]];\\n        while(low < high-1){\\n            int mid = low + (high-low)/2;\\n            \\n            int mid_v = nums[list[mid]][indexArr[list[mid]]];\\n            \\n            if(mid_v == v)\\n                return mid;\\n            else if(mid_v < v)\\n                low = mid;\\n        \\telse\\n                high = mid;\\n        }\\n        if(nums[list[low]][indexArr[list[low]]] >= v)\\n            return low;\\n        else if(nums[list[high]][indexArr[list[high]]]>= v)\\n            return high;\\n        else\\n            return high+1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104924",
			"view":"174",
			"top":"8",
			"title":"Like merge K sorted array using minHeap",
			"vote":"1",
			"content":"This problem is very similar to merge K sorted array. We maintain a minHeap with K elements inside. \\n```\\npublic class Solution {\\n    public int[] smallestRange(List<List<Integer>> nums) {\\n        int[] result = new int[2];\\n        PriorityQueue<Pair> minHeap = new PriorityQueue<Pair>(new Comparator<Pair>(){\\n            @Override\\n            public int compare(Pair p1, Pair p2) {\\n                return p1.val - p2.val;\\n            }\\n            \\n        });\\n        int endVal = Integer.MIN_VALUE;\\n        int k = nums.size();\\n        for (int i = 0; i < k; i++) {\\n            endVal = Math.max(endVal, nums.get(i).get(0));\\n            minHeap.offer(new Pair(i, 0, nums.get(i).get(0)));\\n        }\\n        int startVal = minHeap.peek().val;\\n        result[0] = startVal;\\n        result[1] = endVal;\\n        while (!minHeap.isEmpty()) {\\n            Pair curr = minHeap.poll();\\n            int row = curr.row;\\n            int col = curr.col + 1;\\n            if (col < nums.get(row).size()) {\\n                minHeap.offer(new Pair(row, col, nums.get(row).get(col)));\\n                endVal = Math.max(endVal, nums.get(row).get(col));\\n            }\\n            else {\\n                break;\\n            }\\n            startVal = minHeap.peek().val;\\n            if (smallerRange(startVal, endVal, result)) {\\n                result[0] = startVal;\\n                result[1] = endVal;\\n            }\\n        }\\n        return result;\\n        \\n    }\\n    private boolean smallerRange(int startVal, int endVal, int[] result) {\\n        if (endVal - startVal < result[1] - result[0]) {\\n            return true;\\n        }\\n        else if (endVal - startVal == result[1] - result[0]) {\\n            return startVal < result[0];\\n        }\\n        else {\\n            return false;\\n        }\\n    }\\n}\\n\\nclass Pair {\\n    int row, col, val;\\n    public Pair(int row, int col, int val) {\\n        this.row = row;\\n        this.col = col;\\n        this.val = val;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104913",
			"view":"272",
			"top":"9",
			"title":"Python heap solution with explanation",
			"vote":"1",
			"content":"Suppose we have formed a range with one element from each list. We can form another range by advancing one value along its belonging list. If we're not advancing the smallest value, the left bound will remain unchanged and the right bound will be increased. It's impossible to find the smallest range within such searching space. In other words, it's safe to advancing the smallest value in the current range.\\n```\\ndef smallestRange(self, nums):\\n    iters = [iter(l) for l in nums]\\n    heap = [(next(it), i) for i,it in enumerate(iters)]\\n    heapq.heapify(heap)\\n\\n    lo, hi = 0, float('inf')\\n    rbound = max(heap)[0]\\n    while True:\\n        lbound, i = heap[0]\\n        if rbound - lbound < hi - lo:\\n            lo, hi = lbound, rbound\\n        nxt = next(iters[i], None)\\n        if nxt is None:\\n            return [lo, hi]\\n        rbound = max(rbound, nxt)\\n        heapq.heappushpop(heap, (nxt,i))\\n```"
		}
	],
	"id":"610",
	"title":"Smallest Range",
	"content":"<p>You have <code>k</code> lists of sorted integers in ascending order. Find the <b>smallest</b> range that includes at least one number from each of the <code>k</code> lists. </p>\r\n\r\n<p>We define the range [a,b] is smaller than range [c,d] if <code>b-a < d-c</code> or <code>a < c</code> if <code>b-a == d-c</code>.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>[[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]\r\n<b>Output:</b> [20,24]\r\n<b>Explanation:</b> \r\nList 1: [4, 10, 15, 24,26], 24 is in range [20,24].\r\nList 2: [0, 9, 12, 20], 20 is in range [20,24].\r\nList 3: [5, 18, 22, 30], 22 is in range [20,24].\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br/>\r\n<ol>\r\n<li>The given list may contain duplicates, so ascending order means >= here.</li>\r\n<li>1 <= <code>k</code> <= 3500</li>\r\n<li> -10<sup>5</sup> <= <code>value of elements</code> <= 10<sup>5</sup>.</li>\r\n<li><b>For Java users, please note that the input type has been changed to List&lt;List&lt;Integer&gt;&gt;. And after you reset the code template, you'll see this point.</b></li>\r\n</ol>\r\n<br/>\r\n</p>",
	"frequency":"307",
	"ac_num":"7401"
}