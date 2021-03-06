{
	"difficulty":"3",
	"submit_num":"36990",
	"show_id":"480",
	"leetcode_id":"480",
	"answers":[
		{
			"lc_ans_id":"96340",
			"view":"11545",
			"top":"0",
			"title":"O(n log k) C++ using multiset and updating middle-iterator",
			"vote":"40",
			"content":"Keep the window elements in a multiset and keep an iterator pointing to the middle value (to \"index\" k/2, to be precise). Thanks to [@votrubac's solution and comments](https://discuss.leetcode.com/topic/74739/c-95-ms-single-multiset-o-n-log-n).\\n\\n    vector<double> medianSlidingWindow(vector<int>& nums, int k) {\\n        multiset<int> window(nums.begin(), nums.begin() + k);\\n        auto mid = next(window.begin(), k / 2);\\n        vector<double> medians;\\n        for (int i=k; ; i++) {\\n    \\n            // Push the current median.\\n            medians.push_back((double(*mid) + *prev(mid, 1 - k%2)) / 2);\\n    \\n            // If all done, return.\\n            if (i == nums.size())\\n                return medians;\\n                \\n            // Insert nums[i].\\n            window.insert(nums[i]);\\n            if (nums[i] < *mid)\\n                mid--;\\n    \\n            // Erase nums[i-k].\\n            if (nums[i-k] <= *mid)\\n                mid++;\\n            window.erase(window.lower_bound(nums[i-k]));\\n        }\\n    }"
		},
		{
			"lc_ans_id":"96353",
			"view":"6098",
			"top":"1",
			"title":"Easy to understand O(nlogk) Java solution using TreeMap",
			"vote":"21",
			"content":"TreeMap is used to implement an ordered MultiSet.\\n\\nIn this problem, I use two Ordered MultiSets as Heaps. One heap maintains the lowest 1/2 of the elements, and the other heap maintains the higher 1/2 of elements.\\n \\nThis implementation is faster than the usual implementation that uses 2 PriorityQueues, because unlike PriorityQueue, TreeMap can remove arbitrary element in logarithmic time.\\n```\\npublic class Solution {\\n    public double[] medianSlidingWindow(int[] nums, int k) {\\n        double[] res = new double[nums.length-k+1];\\n        TreeMap<Integer, Integer> minHeap = new TreeMap<Integer, Integer>();\\n        TreeMap<Integer, Integer> maxHeap = new TreeMap<Integer, Integer>(Collections.reverseOrder());\\n        \\n        int minHeapCap = k/2; //smaller heap when k is odd.\\n        int maxHeapCap = k - minHeapCap; \\n        \\n        for(int i=0; i< k; i++){\\n            maxHeap.put(nums[i], maxHeap.getOrDefault(nums[i], 0) + 1);\\n        }\\n        int[] minHeapSize = new int[]{0};\\n        int[] maxHeapSize = new int[]{k};\\n        for(int i=0; i< minHeapCap; i++){\\n            move1Over(maxHeap, minHeap, maxHeapSize, minHeapSize);\\n        }\\n        \\n        res[0] = getMedian(maxHeap, minHeap, maxHeapSize, minHeapSize);\\n        int resIdx = 1;\\n        \\n        for(int i=0; i< nums.length-k; i++){\\n            int addee = nums[i+k];\\n            if(addee <= maxHeap.keySet().iterator().next()){\\n                add(addee, maxHeap, maxHeapSize);\\n            } else {\\n                add(addee, minHeap, minHeapSize);\\n            }\\n            \\n            int removee = nums[i];\\n            if(removee <= maxHeap.keySet().iterator().next()){\\n                remove(removee, maxHeap, maxHeapSize);\\n            } else {\\n                remove(removee, minHeap, minHeapSize);\\n            }\\n\\n            //rebalance\\n            if(minHeapSize[0] > minHeapCap){\\n                move1Over(minHeap, maxHeap, minHeapSize, maxHeapSize);\\n            } else if(minHeapSize[0] < minHeapCap){\\n                move1Over(maxHeap, minHeap, maxHeapSize, minHeapSize);\\n            }\\n            \\n            res[resIdx] = getMedian(maxHeap, minHeap, maxHeapSize, minHeapSize);\\n            resIdx++;\\n        }\\n        return res;\\n    }\\n\\n    public double getMedian(TreeMap<Integer, Integer> bigHeap, TreeMap<Integer, Integer> smallHeap, int[] bigHeapSize, int[] smallHeapSize){\\n        return bigHeapSize[0] > smallHeapSize[0] ? (double) bigHeap.keySet().iterator().next() : ((double) bigHeap.keySet().iterator().next() + (double) smallHeap.keySet().iterator().next()) / 2.0;\\n    }\\n    \\n    //move the top element of heap1 to heap2\\n    public void move1Over(TreeMap<Integer, Integer> heap1, TreeMap<Integer, Integer> heap2, int[] heap1Size, int[] heap2Size){\\n        int peek = heap1.keySet().iterator().next();\\n        add(peek, heap2, heap2Size);\\n        remove(peek, heap1, heap1Size);\\n    }\\n    \\n    public void add(int val, TreeMap<Integer, Integer> heap, int[] heapSize){\\n        heap.put(val, heap.getOrDefault(val,0) + 1);\\n        heapSize[0]++;\\n    }\\n    \\n    public void remove(int val, TreeMap<Integer, Integer> heap, int[] heapSize){\\n        if(heap.put(val, heap.get(val) - 1) == 1) heap.remove(val);\\n        heapSize[0]--;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"96348",
			"view":"8471",
			"top":"2",
			"title":"Java solution using two PriorityQueues",
			"vote":"20",
			"content":"Almost the same idea of ```Find Median from Data Stream``` https://leetcode.com/problems/find-median-from-data-stream/\\n1. Use two ```Heaps``` to store numbers. ```maxHeap``` for numbers smaller than current median,  ```minHeap``` for numbers bigger than and ```equal``` to current median. A small trick I used is always make size of ```minHeap``` equal (when there are ```even``` numbers) or 1 element more (when there are ```odd``` numbers) than the size of ```maxHeap```. Then it will become very easy to calculate current median.\\n2. Keep adding number from the right side of the sliding window and remove number from left side of the sliding window. And keep adding current median to the result.\\n```\\npublic class Solution {\\n    PriorityQueue<Integer> minHeap = new PriorityQueue<Integer>();\\n    PriorityQueue<Integer> maxHeap = new PriorityQueue<Integer>(\\n        new Comparator<Integer>() {\\n            public int compare(Integer i1, Integer i2) {\\n                return i2.compareTo(i1);\\n            }\\n        }\\n    );\\n\\t\\n    public double[] medianSlidingWindow(int[] nums, int k) {\\n        int n = nums.length - k + 1;\\n\\tif (n <= 0) return new double[0];\\n        double[] result = new double[n];\\n        \\n        for (int i = 0; i <= nums.length; i++) {\\n            if (i >= k) {\\n        \\tresult[i - k] = getMedian();\\n        \\tremove(nums[i - k]);\\n            }\\n            if (i < nums.length) {\\n        \\tadd(nums[i]);\\n            }\\n        }\\n        \\n        return result;\\n    }\\n    \\n    private void add(int num) {\\n\\tif (num < getMedian()) {\\n\\t    maxHeap.add(num);\\n\\t}\\n\\telse {\\n\\t    minHeap.add(num);\\n\\t}\\n\\tif (maxHeap.size() > minHeap.size()) {\\n            minHeap.add(maxHeap.poll());\\n\\t}\\n        if (minHeap.size() - maxHeap.size() > 1) {\\n            maxHeap.add(minHeap.poll());\\n        }\\n    }\\n\\t\\n    private void remove(int num) {\\n\\tif (num < getMedian()) {\\n\\t    maxHeap.remove(num);\\n\\t}\\n\\telse {\\n\\t    minHeap.remove(num);\\n\\t}\\n\\tif (maxHeap.size() > minHeap.size()) {\\n            minHeap.add(maxHeap.poll());\\n\\t}\\n        if (minHeap.size() - maxHeap.size() > 1) {\\n            maxHeap.add(minHeap.poll());\\n        }\\n    }\\n\\t\\n    private double getMedian() {\\n\\tif (maxHeap.isEmpty() && minHeap.isEmpty()) return 0;\\n\\t    \\n\\tif (maxHeap.size() == minHeap.size()) {\\n\\t    return ((double)maxHeap.peek() + (double)minHeap.peek()) / 2.0;\\n\\t}\\n\\telse {\\n            return (double)minHeap.peek();\\n\\t}\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"96346",
			"view":"1076",
			"top":"3",
			"title":"Java using two Tree Sets - O(n logk)",
			"vote":"10",
			"content":"Inspired by this [solution](https://discuss.leetcode.com/topic/27521/short-simple-java-c-python-o-log-n-o-1). to the problem: [295. Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)\\n\\nHowever instead of using two priority queue's we use two ```Tree Sets``` as we want ```O(logk)``` for ```remove(element)```. Priority Queue would have been ```O(k)``` for ```remove(element)``` giving us an overall time complexity of ```O(nk)``` instead of ```O(nlogk)```.\\n\\nHowever there is an issue when it comes to duplicate values so to get around this we store the ```index``` into ```nums``` in our ```Tree Set```. To break ties in our Tree Set comparator we compare the index.\\n\\n```\\npublic double[] medianSlidingWindow(int[] nums, int k) {\\n    Comparator<Integer> comparator = (a, b) -> nums[a] != nums[b] ? Integer.compare(nums[a], nums[b]) : a - b;\\n    TreeSet<Integer> left = new TreeSet<>(comparator.reversed());\\n    TreeSet<Integer> right = new TreeSet<>(comparator);\\n    \\n    Supplier<Double> median = (k % 2 == 0) ?\\n        () -> ((double) nums[left.first()] + nums[right.first()]) / 2 :\\n        () -> (double) nums[right.first()];\\n    \\n    // balance lefts size and rights size (if not equal then right will be larger by one)\\n    Runnable balance = () -> { while (left.size() > right.size()) right.add(left.pollFirst()); };\\n    \\n    double[] result = new double[nums.length - k + 1];\\n    \\n    for (int i = 0; i < k; i++) left.add(i);\\n    balance.run(); result[0] = median.get();\\n    \\n    for (int i = k, r = 1; i < nums.length; i++, r++) {\\n        // remove tail of window from either left or right\\n        if(!left.remove(i - k)) right.remove(i - k);\\n\\n        // add next num, this will always increase left size\\n        right.add(i); left.add(right.pollFirst());\\n        \\n        // rebalance left and right, then get median from them\\n        balance.run(); result[r] = median.get();\\n    }\\n    \\n    return result;\\n}\\n```"
		},
		{
			"lc_ans_id":"96347",
			"view":"4516",
			"top":"4",
			"title":"O(n*log(n)) Time C++ Solution Using Two Heaps and a Hash Table",
			"vote":"10",
			"content":"There are a few solutions using BST with worst case time complexity O(n*k), but we know k can be become large. I wanted to come up with a solution that is guaranteed to run in O(n\\\\*log(n)) time. This is in my opinion the best solution so far.\\n\\nThe idea is inspired by solutions to [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/): use two heaps to store numbers in the sliding window. However there is the issue of numbers moving out of the window, and it turns out that a hash table that records these numbers will just work (and is surprisingly neat). The recorded numbers will only be deleted when they come to the top of the heaps.\\n```\\nclass Solution {\\npublic:\\n    vector<double> medianSlidingWindow(vector<int>& nums, int k) {\\n        vector<double> medians;\\n        unordered_map<int, int> hash;                          // count numbers to be deleted\\n        priority_queue<int, vector<int>> bheap;                // heap on the bottom\\n        priority_queue<int, vector<int>, greater<int>> theap;  // heap on the top\\n        \\n        int i = 0;\\n        \\n        // Initialize the heaps\\n        while (i < k)  { bheap.push(nums[i++]); }\\n        for (int count = k/2; count > 0; --count) {\\n            theap.push(bheap.top()); bheap.pop();\\n        }\\n        \\n        while (true) {\\n            // Get median\\n            if (k % 2) medians.push_back(bheap.top());\\n            else medians.push_back( ((double)bheap.top() + theap.top()) / 2 );\\n            \\n            if (i == nums.size()) break;\\n            int m = nums[i-k], n = nums[i++], balance = 0;\\n            \\n            // What happens to the number m that is moving out of the window\\n            if (m <= bheap.top())  { --balance;  if (m == bheap.top()) bheap.pop(); else ++hash[m]; }\\n            else                   { ++balance;  if (m == theap.top()) theap.pop(); else ++hash[m]; }\\n            \\n            // Insert the new number n that enters the window\\n            if (!bheap.empty() && n <= bheap.top())  { ++balance; bheap.push(n); }\\n            else                                     { --balance; theap.push(n); }\\n            \\n            // Rebalance the bottom and top heaps\\n            if      (balance < 0)  { bheap.push(theap.top()); theap.pop(); }\\n            else if (balance > 0)  { theap.push(bheap.top()); bheap.pop(); }\\n            \\n            // Remove numbers that should be discarded at the top of the two heaps\\n            while (!bheap.empty() && hash[bheap.top()])  { --hash[bheap.top()]; bheap.pop(); }\\n            while (!theap.empty() && hash[theap.top()])  { --hash[theap.top()]; theap.pop(); }\\n        }\\n        \\n        return medians;\\n    }\\n};\\n```\\nSince both heaps will never have a size greater than n, the time complexity is O(n*log(n)) in the worst case."
		},
		{
			"lc_ans_id":"96355",
			"view":"3135",
			"top":"5",
			"title":"Easy Python O(nk)",
			"vote":"10",
			"content":"Just keep the window as a sorted list.\\n\\n    def medianSlidingWindow(self, nums, k):\\n        window = sorted(nums[:k])\\n        medians = []\\n        for a, b in zip(nums, nums[k:] + [0]):\\n            medians.append((window[k/2] + window[~(k/2)]) / 2.)\\n            window.remove(a)\\n            bisect.insort(window, b)\\n        return medians"
		},
		{
			"lc_ans_id":"96378",
			"view":"704",
			"top":"6",
			"title":"Python Hash Heap Implementation",
			"vote":"5",
			"content":"Apparently, we need a data structure which supports both `Insert` and `Remove` operation in `O(log K)` time and supports `getMin` operation in `O(1)` or `O(log K)` time.\\n\\nThe Data Structure we could choose may be Balanced BST or Hash Heap. But there is no such implemented data structure in Python. Here is my implementation of Hash Heap in Python. Then, with this data structure, this problem could be easily solved just as [LeetCode 295 Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/). \\n\\n[The Chinese version on my blog](http://hankerzheng.com/blog/Python-Hash-Heap)\\n\\n```python\\n# This is the Python implementation of Hash Heap based on the list implementation \\n# of binary heap. The difference between Hash Heap and Binary Heap is that Hash\\n# Heap supports the `heapRemove` operation in O(log n) time and can check whether\\n# certain element is in the Hash Heap or not in O(1) time.\\n# \\n# Basic automatic tests are given in `pushpopTest()` and `removeTest()`.\\n# Note: It may takes about 10 seconds to run both test functions.\\n\\n# import random module for test use.\\nimport random\\n\\nclass HeapNode(object):\\n    \"\"\"\\n    The node in the HashHeap to deal with duplicates.\\n    Each node store the value of each element and the number of duplicates\\n    with the same value.\\n    \"\"\"\\n    def __init__(self, val, cnt):\\n        self.val = val\\n        self.cnt = cnt\\n\\n    def __cmp__(self, other):\\n        return self.val - other.val\\n\\n    def __str__(self):\\n        return \"[%s, %d]\" % (self.val, self.cnt)\\n    __repr__ = __str__\\n\\nclass HashHeap(object):\\n    \"\"\"\\n    This HashHeap is the same as the list implementation of binary heap, but with\\n    a hashMap to map the value of one elemnt to its index in the list.\\n    \"\"\"\\n    def __init__(self, arr):\\n        \"\"\"\\n        `_cap` - the number of elements in the HashHeap\\n        `_maxIdx` - the max index of the binary heap\\n        `_data` - the list implementation of the binary heap\\n        `_hashMap` - mapping the element to its index in the binary heap\\n        \"\"\"\\n        elemCnt = self._preProcess(arr)\\n        self._cap = len(arr)\\n        self._maxIdx = len(elemCnt) - 1\\n        self._data = [HeapNode(key, value) for key, value in elemCnt.items()]\\n        self._hashMap = {node.val: idx for idx, node in enumerate(self._data)}\\n        self._heapify()\\n\\n    def _preProcess(self, arr):\\n        \"\"\"\\n        Convert the input array into a dict object.\\n        The key to the dict is the value of the element.\\n        The value of the dict is the occurence of each element.\\n        \"\"\"\\n        elemCnt = {}\\n        for elem in arr:\\n            elemCnt[elem] = elemCnt.get(elem, 0) + 1\\n        return elemCnt\\n\\n    def _swap(self, idx1, idx2):\\n        \"\"\"\\n        Swap the 2 elements in the heap.\\n        Also, change the index stored in `self._hashMap`\\n        \"\"\"\\n        elem1, elem2 = self._data[idx1], self._data[idx2]\\n        self._hashMap[elem1.val] = idx2\\n        self._hashMap[elem2.val] = idx1\\n        self._data[idx1], self._data[idx2] = elem2, elem1\\n\\n    def _heapify(self):\\n        idx = self._maxIdx\\n        while idx > 0:\\n            parentIdx = (idx - 1) / 2\\n            if self._data[parentIdx] > self._data[idx]:\\n                self._swap(parentIdx, idx)\\n                self._siftDown(idx)\\n            idx -= 1\\n\\n    def _siftDown(self, idx):\\n        def heapValid(idx):\\n            left, right = idx * 2 + 1, idx * 2 + 2\\n            if left > self._maxIdx:\\n                return True\\n            if right > self._maxIdx:\\n                return self._data[idx] <= self._data[left]\\n            return self._data[idx] <= self._data[left] and self._data[idx] <= self._data[right]\\n        def smallerChild(idx):\\n            left, right = idx * 2 + 1, idx * 2 + 2\\n            if left > self._maxIdx:\\n                return None\\n            if right > self._maxIdx:\\n                return left\\n            return left if self._data[left] < self._data[right] else right\\n\\n        current = idx\\n        while not heapValid(current):\\n            child = smallerChild(current)\\n            self._swap(current, child)\\n            current = child\\n\\n    def _siftUp(self, idx):\\n        current = idx\\n        parent = (current - 1) / 2\\n        while current > 0 and self._data[parent] > self._data[current]:\\n            self._swap(parent, current)\\n            current = parent\\n            parent = (current - 1) / 2\\n\\n    def _removeLastNode(self):\\n        rmNode = self._data.pop(-1)\\n        self._cap -= 1\\n        self._maxIdx -= 1\\n        self._hashMap.pop(rmNode.val)\\n\\n    def _removeByIdx(self, idx):\\n        thisNode = self._data[idx]\\n        retVal = thisNode.val\\n        if thisNode.cnt > 1:\\n            thisNode.cnt -= 1\\n            self._cap -= 1\\n        elif idx == self._maxIdx:\\n            # the node itself is the last node\\n            self._removeLastNode()\\n        else:\\n            self._swap(idx, self._maxIdx)\\n            self._removeLastNode()\\n            pidx = (idx - 1) / 2\\n            # check to see we should sift up or sift down\\n            if pidx >= 0 and self._data[pidx] > self._data[idx]:\\n                self._siftUp(idx)\\n            else:\\n                self._siftDown(idx)\\n        return retVal\\n\\n    @property\\n    def length(self):\\n        \"\"\"\\n        Return the number of elements in the Hash Heap\\n        \"\"\"\\n        return self._cap\\n\\n    def heapPeep(self):\\n        \"\"\"\\n        Return the MIN element in the Hash Heap\\n        \"\"\"\\n        if not self._data:\\n            return float(\"inf\")\\n        return self._data[0].val\\n\\n    def heapPop(self):\\n        \"\"\"\\n        Remove the MIN element from the Hash Heap and return its value\\n        \"\"\"\\n        return self._removeByIdx(0)\\n\\n    def heapPush(self, elem):\\n        \"\"\"\\n        Push a new element into the Hash Heap\\n        \"\"\"\\n        self._cap += 1\\n        if elem not in self._hashMap:\\n            self._maxIdx += 1\\n            self._data.append(HeapNode(elem, 1))\\n            self._hashMap[elem] = self._maxIdx\\n            self._siftUp(self._maxIdx)\\n        else:\\n            idx = self._hashMap[elem]\\n            self._data[idx].cnt += 1\\n        \\n    def heapRemove(self, elem):\\n        \"\"\"\\n        Remove a existing element from the Hash Heap\\n        If the element to be removed is not in the Hash Heap, raise an error.\\n        \"\"\"\\n        if elem not in self._hashMap:\\n            raise ValueError(\"Element to be removed is not in HashHeap!!!\")\\n        idx = self._hashMap[elem]\\n        self._removeByIdx(idx)\\n\\n    def __contains__(self, value):\\n        return value in self._hashMap\\n\\n    def __str__(self):\\n        return \"%s\" % [elem.val for elem in self._data]\\n    __repr__ = __str__\\n\\n\\ndef pushpopTest():\\n    \"\"\"\\n    Randomly generate a list, and push each element into the heap.\\n    Test HeapPush by comparing the first element in the heap with the \\n    smallest element in the List.\\n    Test HeapPop by comparing the popped element from the heap with the\\n    sorted list one by one. \\n    \"\"\"\\n    for _ in xrange(100):\\n        thisHeap = HashHeap([0])\\n        testList = [0]\\n        for i in xrange(1000):\\n            thisRandom = random.randrange(-100, 100000)\\n            thisHeap.heapPush(thisRandom)\\n            testList.append(thisRandom)\\n            assert min(testList) == thisHeap.heapPeep()\\n            assert len(testList) == thisHeap.length\\n            assert len(thisHeap._hashMap) == thisHeap._maxIdx + 1\\n        testList.sort()\\n        assert len(testList) == thisHeap.length\\n        for idx, num in enumerate(testList):\\n            assert num == thisHeap.heapPop()\\n            assert len(testList) - 1 - idx == thisHeap.length\\n            assert len(thisHeap._hashMap) == thisHeap._maxIdx + 1\\n\\ndef removeTest():\\n    \"\"\"\\n    Randomly generate a list, and push each element into the heap.\\n    Test HeapRemove by randomly delete one element from the heap by the probability\\n    of 0.2, and then check whether the first element in the heap is the same as the\\n    smallest element in the list.\\n    \"\"\"\\n    for _ in xrange(100):\\n        thisHeap = HashHeap([0])\\n        testList = [0]\\n        for i in xrange(1000):\\n            thisRandom = random.randrange(-100, 100000)\\n            thisHeap.heapPush(thisRandom)\\n            if random.random() < 0.2:\\n                thisHeap.heapRemove(thisRandom)\\n            else:\\n                testList.append(thisRandom)\\n            assert min(testList) == thisHeap.heapPeep()\\n            assert len(testList) == thisHeap.length\\n            assert len(thisHeap._hashMap) == thisHeap._maxIdx + 1\\n        testList.sort()\\n        assert len(testList) == thisHeap.length\\n        for idx, num in enumerate(testList):\\n            assert num == thisHeap.heapPop()\\n            assert len(testList) - 1 - idx == thisHeap.length\\n            assert len(thisHeap._hashMap) == thisHeap._maxIdx + 1\\n\\n\\nif __name__ == '__main__':\\n    pushpopTest()\\n    removeTest()\\n```"
		},
		{
			"lc_ans_id":"96339",
			"view":"502",
			"top":"7",
			"title":"Java clean and easily readable solution with a helper class",
			"vote":"5",
			"content":"```\\n    public double[] medianSlidingWindow(int[] nums, int k) {\\n        MedianQueue window = new MedianQueue();\\n        double[] median = new double[nums.length - k + 1]; \\n        for (int i = 0; i < nums.length; i++) {\\n            window.add(nums[i]);\\n            if (i >= k) window.remove(nums[i - k]);\\n            if (i >= k - 1) median[i - k + 1] = window.median();\\n        }   \\n        return median;\\n    }   \\n\\n    static class MedianQueue {\\n        Queue<Long> maxHeap = new PriorityQueue<>(Collections.reverseOrder()), minHeap = new PriorityQueue<>();\\n\\n        public void add(long n) {\\n            maxHeap.add(n);\\n            minHeap.add(maxHeap.poll());\\n        }   \\n\\n        public double median() {\\n            while (maxHeap.size() - minHeap.size() >= 2) minHeap.offer(maxHeap.poll());\\n            while (minHeap.size() - maxHeap.size() >= 1) maxHeap.offer(minHeap.poll());\\n            return maxHeap.size() == minHeap.size() ? (maxHeap.peek() + minHeap.peek()) / 2.0 : maxHeap.peek();\\n        }   \\n\\n        public boolean remove(long n) {\\n            return maxHeap.remove(n) || minHeap.remove(n);\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"96396",
			"view":"1228",
			"top":"8",
			"title":"C++ Solution O(n*k)",
			"vote":"5",
			"content":"The idea is to maintain a BST of the window and just search for the k/2 largest element and k/2 smallest element  then the average of these two is the median of the window.\\n\\n Now if the STL's multiset  BST maintained how many element were in each subtree finding each median would take O(log k) time  but since it  doesn't it takes O(k) time to find each  median.\\n\\n```class Solution {\\npublic:\\n    vector<double> medianSlidingWindow(vector<int>& nums, int k) {\\n        multiset<int> mp;\\n        vector<double> med;\\n        \\n        for(int i=0; i<k-1; ++i) mp.insert(nums[i]);\\n        \\n        for(int i=k-1; i< nums.size(); ++i){\\n            mp.insert(nums[i]); // Add the next number\\n            \\n            auto itb = mp.begin(); advance(itb, (k-1)/2); //Find the lower median\\n            auto ite = mp.end(); advance(ite, -(k+1)/2); //Find the upper median\\n        \\n            double avg = ((long)(*itb) + (*ite)) / 2.0;\\n            med.push_back(avg);\\n        \\n            mp.erase(mp.find(nums[i-k+1])); //Remove the oldest element\\n        }\\n        \\n        return med;\\n    }\\n};"
		},
		{
			"lc_ans_id":"96337",
			"view":"202",
			"top":"9",
			"title":"Python SortedArray (beats 100%) and 2-Heap(beats 90%) solution",
			"vote":"3",
			"content":"\\n### Array based solution:  \\n- the window is an array maintained in sorted order\\n- the mid of the array is used to calculate the median\\n- every iteration, the incoming number is added in sorted order in the array using insert - `O(log K)` ?\\n- every iteration, the outgoing number is removed from the array using bisect `O(log K)` ?\\n\\n`O(N logK)`  beats 100%\\n```\\n# 132 ms\\nclass SolutionSortedArrayFast(object):\\n    def medianSlidingWindow(self, nums, k):\\n        win, rv = nums[:k], []\\n        win.sort()\\n        odd = k%2\\n        for i,n in enumerate(nums[k:],k):\\n            rv.append((win[k/2]+win[k/2-1])/2. if not odd else win[(k-1)/2]*1.)\\n            win.pop(bisect(win, nums[i-k])-1) # <<< bisect is faster than .remove()\\n            insort(win, nums[i])\\n        rv.append((win[k/2]+win[k/2-1])/2. if not odd else win[(k-1)/2]*1.)\\n        return rv\\n```\\n\\n### 2-heap (min, max) based solution:  \\n- uses 2 heaps left-(max)heap `lh` and right-(min)heap `rh`. The key idea is the maintain the size invariance of the heaps as we add and remove elements. The top of both the heaps can be used to calculate the median.\\n- We use `lazy-deletion` from the heap \\n- using the first `k` elements construct a min heap `lh`. Then pop `k-k/2` and add it to the `rh`. Now the heap sized are set at `k/2` and `k-k/2`\\n- Iterate over rest of the numbers and add it to the appropriate heap and maintain heap size invariance by moving the top number from one heap to another as needed.\\n\\n`O(N logK)` beats 90%\\n\\n```\\n# avg:180ms\\nclass SolutionHeap(object):\\n    def medianSlidingWindow(self, nums, k):\\n        lh,rh,rv = [],[],[]\\n        # create the initial left and right heap\\n        for i,n in enumerate(nums[:k]): heappush(lh, (-n,i))\\n        for i in range(k-k/2):\\n            heappush(rh, (-lh[0][0], lh[0][1]))\\n            heappop(lh)\\n        for i,n in enumerate(nums[k:]):\\n            rv.append(rh[0][0]/1. if k%2 else (rh[0][0] - lh[0][0])/2.)\\n            if n >= rh[0][0]:\\n                heappush(rh,(n,i+k))        # rh +1\\n                if nums[i] <= rh[0][0]:     # lh-1, unbalanced\\n                    heappush(lh, (-rh[0][0], rh[0][1]))\\n                    heappop(rh)\\n                # else: pass                # rh-1, balanced\\n            else:\\n                heappush(lh,(-n,i+k))        # rh +1\\n                if nums[i] >= rh[0][0]:     # rh-1, unbalanced\\n                    heappush(rh, (-lh[0][0], lh[0][1]))\\n                    heappop(lh)\\n                # else: pass                # lh-1, balanced\\n            while(lh and lh[0][1] <= i): heappop(lh)  # lazy-deletion\\n            while(rh and rh[0][1] <= i): heappop(rh)  # lazy-deletion\\n        rv.append(rh[0][0]/1. if k%2 else (rh[0][0] - lh[0][0])/2.)\\n        return rv\\n```"
		}
	],
	"id":"472",
	"title":"Sliding Window Median",
	"content":"<p>Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.</p>\r\nExamples: <br />\r\n<p><code>[2,3,4]</code> , the median is <code>3</code></p>\r\n<p><code>[2,3]</code>, the median is <code>(2 + 3) / 2 = 2.5</code> </p>\r\n\r\n<p>Given an array <i>nums</i>, there is a sliding window of size <i>k</i> which is moving from the very left of the array to the very right. You can only see the <i>k</i> numbers in the window. Each time the sliding window moves right by one position. Your job is to output the median array for each window in the original array.</p>\r\n\r\n<p>For example,<br>\r\nGiven <i>nums</i> = <code>[1,3,-1,-3,5,3,6,7]</code>, and <i>k</i> = 3.</p>\r\n\r\n<pre>\r\nWindow position                Median\r\n---------------               -----\r\n[1  3  -1] -3  5  3  6  7       1\r\n 1 [3  -1  -3] 5  3  6  7       -1\r\n 1  3 [-1  -3  5] 3  6  7       -1\r\n 1  3  -1 [-3  5  3] 6  7       3\r\n 1  3  -1  -3 [5  3  6] 7       5\r\n 1  3  -1  -3  5 [3  6  7]      6\r\n</pre>\r\n\r\n<p>Therefore, return the median sliding window as <code>[1,-1,-1,3,5,6]</code>.</p>\r\n\r\n<p><b>Note: </b><br>\r\nYou may assume <code>k</code> is always valid, ie: <code>k</code> is always smaller than input array's size for non-empty array.</p>",
	"frequency":"88",
	"ac_num":"11503"
}