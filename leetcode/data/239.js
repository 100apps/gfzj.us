{
	"difficulty":"3",
	"submit_num":"238059",
	"show_id":"239",
	"leetcode_id":"239",
	"answers":[
		{
			"lc_ans_id":"65884",
			"view":"46640",
			"top":"0",
			"title":"Java O(n) solution using deque with explanation",
			"vote":"227",
			"content":"We scan the array from 0 to n-1, keep \"promising\" elements in the deque. The algorithm is amortized O(n) as each element is put and polled once.\\n\\nAt each i, we keep \"promising\" elements, which are potentially max number in window [i-(k-1),i] or any subsequent window. This means\\n\\n1. If an element in the deque and it is out of i-(k-1), we discard them. We just need to poll from the head, as we are using a deque and elements are ordered as the sequence in the array\\n\\n2. Now only those elements within [i-(k-1),i]  are in the deque. We then discard elements smaller than a[i] from the tail. This is because if a[x] <a[i] and x<i, then a[x] has no chance to be the \"max\" in [i-(k-1),i], or any other subsequent window: a[i] would always be a better candidate. \\n\\n3. As a result elements in the deque are ordered in both sequence in array and their value. At each step the head of the deque is the max element in [i-(k-1),i]\\n\\n\\n-----------------------------------\\n    public int[] maxSlidingWindow(int[] a, int k) {\\t\\t\\n    \\t\\tif (a == null || k <= 0) {\\n    \\t\\t\\treturn new int[0];\\n    \\t\\t}\\n    \\t\\tint n = a.length;\\n    \\t\\tint[] r = new int[n-k+1];\\n    \\t\\tint ri = 0;\\n    \\t\\t// store index\\n    \\t\\tDeque<Integer> q = new ArrayDeque<>();\\n    \\t\\tfor (int i = 0; i < a.length; i++) {\\n    \\t\\t\\t// remove numbers out of range k\\n    \\t\\t\\twhile (!q.isEmpty() && q.peek() < i - k + 1) {\\n    \\t\\t\\t\\tq.poll();\\n    \\t\\t\\t}\\n    \\t\\t\\t// remove smaller numbers in k range as they are useless\\n    \\t\\t\\twhile (!q.isEmpty() && a[q.peekLast()] < a[i]) {\\n    \\t\\t\\t\\tq.pollLast();\\n    \\t\\t\\t}\\n    \\t\\t\\t// q contains index... r contains content\\n    \\t\\t\\tq.offer(i);\\n    \\t\\t\\tif (i >= k - 1) {\\n    \\t\\t\\t\\tr[ri++] = a[q.peek()];\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\treturn r;\\n    \\t}"
		},
		{
			"lc_ans_id":"65881",
			"view":"19896",
			"top":"1",
			"title":"O(n) solution in Java with two simple pass in the array",
			"vote":"107",
			"content":"\\nFor Example: A = [2,1,3,4,6,3,8,9,10,12,56],  w=4\\n\\n1. partition the array in blocks of size w=4. The last block may have less then w.\\n2, 1, 3, 4 | 6, 3, 8, 9 | 10, 12, 56|\\n\\n2. Traverse the list from start to end and calculate max_so_far. Reset max after each block boundary (of w elements).\\nleft_max[] = 2, 2, 3, 4 | 6, 6, 8, 9 | 10, 12, 56\\n\\n3. Similarly calculate max in future by traversing from end to start.\\nright_max[] = 4, 4, 4, 4 | 9, 9, 9, 9 | 56, 56, 56\\n\\n4. now, sliding max at each position i in current window, sliding-max(i) = max{right_max(i), left_max(i+w-1)}\\nsliding_max = 4, 6, 6, 8, 9, 10, 12, 56\\n\\ncode:\\n   \\n\\n     public static int[] slidingWindowMax(final int[] in, final int w) {\\n        final int[] max_left = new int[in.length];\\n        final int[] max_right = new int[in.length];\\n    \\n        max_left[0] = in[0];\\n        max_right[in.length - 1] = in[in.length - 1];\\n    \\n        for (int i = 1; i < in.length; i++) {\\n            max_left[i] = (i % w == 0) ? in[i] : Math.max(max_left[i - 1], in[i]);\\n    \\n            final int j = in.length - i - 1;\\n            max_right[j] = (j % w == 0) ? in[j] : Math.max(max_right[j + 1], in[j]);\\n        }\\n    \\n        final int[] sliding_max = new int[in.length - w + 1];\\n        for (int i = 0, j = 0; i + w <= in.length; i++) {\\n            sliding_max[j++] = Math.max(max_right[i], max_left[i + w - 1]);\\n        }\\n    \\n        return sliding_max;\\n    }"
		},
		{
			"lc_ans_id":"65898",
			"view":"17025",
			"top":"2",
			"title":"Clean C++ O(n) solution using a deque",
			"vote":"66",
			"content":"The data structure used is know as Monotonic Queue. Click [here](http://abitofcs.blogspot.com/2014/11/data-structure-sliding-window-minimum.html) for more information.\\n\\nYou can also view more solution on [Github](https://github.com/flexwang/CodeTest)\\n\\n    class Solution {\\n    public:\\n        vector<int> maxSlidingWindow(vector<int>& nums, int k) {\\n            deque<int> dq;\\n            vector<int> ans;\\n            for (int i=0; i<nums.size(); i++) {\\n                if (!dq.empty() && dq.front() == i-k) dq.pop_front();\\n                while (!dq.empty() && nums[dq.back()] < nums[i])\\n                    dq.pop_back();\\n                dq.push_back(i);\\n                if (i>=k-1) ans.push_back(nums[dq.front()]);\\n            }\\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"65885",
			"view":"14119",
			"top":"3",
			"title":"This is a typical monotonic queue problem",
			"vote":"63",
			"content":"Sliding window minimum/maximum = monotonic queue. I smelled the solution just when I read the title.\\nThis is essentially same idea as others' deque solution, but this is much more standardized and modulized. If you ever need to use it in your real product, this code is definitely more preferable. \\n\\nWhat does Monoqueue do here:\\n\\nIt has three basic options:\\n\\npush: push an element into the queue;  O (1) (amortized)\\n\\npop: pop an element out of the queue; O(1) (pop = remove, it can't report this element)\\n\\nmax: report the max element in queue;O(1)\\n\\nIt takes only O(n) time to process a N-size sliding window minimum/maximum problem.\\n\\nNote: different from a priority queue (which takes O(nlogk) to solve this problem),  it doesn't pop the max element: It pops the first element (in original order) in queue.\\n\\n    class Monoqueue\\n    {\\n        deque<pair<int, int>> m_deque; //pair.first: the actual value, \\n                                       //pair.second: how many elements were deleted between it and the one before it.\\n        public:\\n            void push(int val)\\n            {\\n                int count = 0;\\n                while(!m_deque.empty() && m_deque.back().first < val)\\n                {\\n                    count += m_deque.back().second + 1;\\n                    m_deque.pop_back();\\n                }\\n                m_deque.emplace_back(val, count);\\n            };\\n            int max()\\n            {\\n                return m_deque.front().first;\\n            }\\n            void pop ()\\n            {\\n                if (m_deque.front().second > 0)\\n                {\\n                    m_deque.front().second --;\\n                    return;\\n                }\\n                m_deque.pop_front();\\n            }\\n    };\\n    struct Solution {\\n        vector<int> maxSlidingWindow(vector<int>& nums, int k) {\\n            vector<int> results;\\n            Monoqueue mq;\\n            k = min(k, (int)nums.size());\\n            int i = 0;\\n            for (;i < k - 1; ++i) //push first k - 1 numbers;\\n            {\\n                mq.push(nums[i]);\\n            }\\n            for (; i < nums.size(); ++i)\\n            {\\n                mq.push(nums[i]);            // push a new element to queue;\\n                results.push_back(mq.max()); // report the current max in queue;\\n                mq.pop();                    // pop first element in queue;\\n            }\\n            return results;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"65956",
			"view":"4600",
			"top":"4",
			"title":"My C++ O(n) deque based solution with explanation",
			"vote":"33",
			"content":"The basic idea is to use a deque (buffer) to save all currently potential \"maximum\" elements (i.e. the element in the current k-element window [i-k+1, i], and it is larger than the elements after  itself). So for each i, we first pop up the elements  that are no larger than nums[i] from buffer until we find one that is larger than nums[i] or the buffer is empty since those elements will be covered by nums[i] and can not be a maximum of any k-element window. Then we put nums[i] in the buffer. If i>=k-1, we need to ouput the maximum for window [i-k+1, i], which is the front element of buffer. At last, we will check if the front element is nums[i-k+1], if so, we have to pop it up since it will be out of the window [i-k+2, i+1] in the next iteration. Since all the elements will be pushed into/ popped out of the buffer only once, so the time complexity is O(N).\\n\\n\\n    class Solution {\\n    public:\\n        vector<int> maxSlidingWindow(vector<int>& nums, int k) {\\n            deque<int> buffer;\\n            vector<int> res;\\n    \\n            for(auto i=0; i<nums.size();++i)\\n            {\\n                while(!buffer.empty() && nums[i]>=nums[buffer.back()]) buffer.pop_back();\\n                buffer.push_back(i);\\n    \\n                if(i>=k-1) res.push_back(nums[buffer.front()]);\\n                if(buffer.front()<= i-k + 1) buffer.pop_front();\\n            }\\n            return res;\\n        }"
		},
		{
			"lc_ans_id":"65901",
			"view":"3967",
			"top":"5",
			"title":"9 lines Ruby, 11 lines Python, O(n)",
			"vote":"22",
			"content":"Keep indexes of good candidates in deque `d`. The indexes in `d` are from the current window, they're increasing, and their corresponding `nums` are decreasing. Then the first deque element is the index of the largest window value.\\n\\nFor each index `i`:\\n\\n1. Pop (from the end) indexes of smaller elements (they'll be useless).\\n2. Append the current index.\\n3. Pop (from the front) the index `i - k`, if it's still in the deque (it falls out of the window).\\n4. If our window has reached size `k`, append the current window maximum to the output.\\n\\n---\\n\\n**Ruby**\\n\\nApparently Ruby doesn't have a deque, so I simulate one with an array, where `s` tells the start index of the queue in the array.\\n\\n    def max_sliding_window(nums, k)\\n        d, s = [], 0\\n        out = []\\n        nums.each_index{ |i|\\n            d.pop while d[s] && nums[d[-1]] < nums[i]\\n            d << i\\n            s += 1 if d[s] == i - k\\n            out << nums[d[s]] if i >= k - 1\\n        }\\n        out\\n    end\\n\\n---\\n\\n**Python**\\n\\n    def maxSlidingWindow(self, nums, k):\\n        d = collections.deque()\\n        out = []\\n        for i, n in enumerate(nums):\\n            while d and nums[d[-1]] < n:\\n                d.pop()\\n            d += i,\\n            if d[0] == i - k:\\n                d.popleft()\\n            if i >= k - 1:\\n                out += nums[d[0]],\\n        return out\\n\\nLast three lines could be this, but for relatively large k it would waste space:\\n\\n            out += nums[d[0]],\\n        return out[k-1:]"
		},
		{
			"lc_ans_id":"66077",
			"view":"1861",
			"top":"6",
			"title":"A clear solution using deque (C++)",
			"vote":"17",
			"content":"class Solution {\\npublic:\\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\\n      \\n        deque<int> q;\\n        vector<int> maxs;\\n        if(nums.empty()||k<=0) return maxs;\\n\\n        for(int i=0;i<nums.size();i++){\\n            while(!q.empty()&&nums[q.back()]<=nums[i]) \\n                q.pop_back();\\n            q.push_back(i);\\n            if(q.front()<=i-k) q.pop_front();\\n            \\n            if(i>=k-1) maxs.push_back(nums[q.front()]);\\n        }\\n        return maxs;\\n    }\\n};"
		},
		{
			"lc_ans_id":"65999",
			"view":"2546",
			"top":"7",
			"title":"3 C++ Solutions",
			"vote":"16",
			"content":"    1. O(NlogK)\\n    \\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\\n        vector<int> result;\\n        if (k == 0) return result;\\n        multiset<int> w;\\n        for (int i = 0, n = (int)nums.size(); i < n; i++) {\\n            if (i >= k)\\n                w.erase(w.find(nums[i-k]));\\n            w.insert(nums[i]);\\n            if (i >= k-1)\\n                result.push_back(*w.rbegin());\\n        }\\n        return result;\\n    }\\n    \\n    2. O(NlogN)\\n    \\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\\n        vector<int> result;\\n        if (k == 0) return result;\\n        priority_queue<pair<int, int>> w;\\n        for (int i = 0, n = (int)nums.size(); i < n; i++) {\\n            while (!w.empty() && w.top().second <= i-k)\\n                w.pop();\\n            w.push(make_pair(nums[i],i));\\n            if (i >= k-1)\\n                result.push_back(w.top().first);\\n        }\\n        return result;\\n    }\\n    \\n    3. O(N)\\n    \\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\\n        vector<int> result;\\n        if (k == 0) return result;\\n        deque<int> w;\\n        for (int i = 0, n = (int)nums.size(); i < n; i++) {\\n            while (!w.empty() && w.front() <= i-k)\\n                w.pop_front();\\n            while (!w.empty() && nums[w.back()] <= nums[i])\\n                w.pop_back();\\n            w.push_back(i);\\n            if (i >= k-1)\\n                result.push_back(nums[w.front()]);\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"66037",
			"view":"1826",
			"top":"8",
			"title":"A concise solution using deque",
			"vote":"15",
			"content":"    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\\n        if (k <= 0) return {};\\n        \\n        vector<int> ans(nums.size() - k + 1);\\n        deque<int> dq;\\n        for (int i = 0; i < nums.size(); ++i) {\\n            // delete those nodes whose value less than the current value\\n            while (!dq.empty() && nums[i] > nums[dq.back()]) dq.pop_back();\\n            dq.push_back(i);\\n            // delete the node pass the start of the window\\n            if (i - dq.front() + 1 > k) dq.pop_front();\\n            // assign result value\\n            if (i >= k - 1) ans[i - k + 1] = nums[dq.front()];\\n        }\\n        \\n        return ans;\\n    }"
		},
		{
			"lc_ans_id":"65936",
			"view":"3508",
			"top":"9",
			"title":"My Java Solution Using PriorityQueue",
			"vote":"11",
			"content":"Not a linear solution, instead, it is of O(nlogk) complexity, since add, pop and remove operation of PriorityQueue cost O(logk) time.\\n\\nWhat we need to do is just maintain a heap, that heap top gets the maximal value of the k elements.\\nSince we know which element is removed and which is added to the queue, the solution seems easy to understand.\\n\\n    public class Solution {\\n    public int[] maxSlidingWindow(int[] nums, int k) {\\n        int len = nums.length;\\n        int[] result = new int[len - k + 1];\\n        if(nums.length == 0) return new int[0];\\n        Queue<Integer> queue = new PriorityQueue<Integer>(new Comparator<Integer>(){\\n            @Override\\n            public int compare(Integer i1, Integer i2){\\n                return Integer.compare(i2, i1);\\n            }\\n        });\\n        \\n        for(int i = 0; i < k; i ++){\\n            queue.add(nums[i]);\\n        }\\n        result[0] = queue.peek();\\n        for(int i = k; i < len; i ++){\\n            queue.remove(nums[i - k]);\\n            queue.add(nums[i]);\\n            result[i - k + 1] = queue.peek();\\n        }\\n       \\n        return result;\\n    }\\n\\n\\nCould somebody suggest some linear solutions? The hint of using deque seems not that reasonable. We still need to maintain the k elements in the window in order.\\n\\nThank you,"
		}
	],
	"id":"239",
	"title":"Sliding Window Maximum",
	"content":"<p>Given an array <i>nums</i>, there is a sliding window of size <i>k</i> which is moving from the very left of the array to the very right. You can only see the <i>k</i> numbers in the window. Each time the sliding window moves right by one position.</p>\r\n\r\n<p>For example,<br>\r\nGiven <i>nums</i> = <code>[1,3,-1,-3,5,3,6,7]</code>, and <i>k</i> = 3.</p>\r\n\r\n<pre>\r\nWindow position                Max\r\n---------------               -----\r\n[1  3  -1] -3  5  3  6  7       3\r\n 1 [3  -1  -3] 5  3  6  7       3\r\n 1  3 [-1  -3  5] 3  6  7       5\r\n 1  3  -1 [-3  5  3] 6  7       5\r\n 1  3  -1  -3 [5  3  6] 7       6\r\n 1  3  -1  -3  5 [3  6  7]      7\r\n</pre>\r\n\r\n<p>Therefore, return the max sliding window as <code>[3,3,5,5,6,7]</code>.</p>\r\n\r\n<p><b>Note: </b><br>\r\nYou may assume <i>k</i> is always valid, ie: 1 &le; k &le; input array's size for non-empty array.</p>\r\n\r\n<p><b>Follow up:</b><br>\r\nCould you solve it in linear time?</p>",
	"frequency":"367",
	"ac_num":"80844"
}