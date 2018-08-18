{
	"difficulty":"3",
	"submit_num":"188979",
	"show_id":"295",
	"leetcode_id":"295",
	"answers":[
		{
			"lc_ans_id":"74062",
			"view":"34409",
			"top":"0",
			"title":"Short simple Java/C++/Python, O(log n) + O(1)",
			"vote":"179",
			"content":"I keep two heaps (or priority queues):\\n\\n- Max-heap `small` has the smaller half of the numbers.\\n- Min-heap `large` has the larger half of the numbers.\\n\\nThis gives me direct access to the one or two middle values (they're the tops of the heaps), so getting the median takes O(1) time. And adding a number takes O(log n) time.\\n\\nSupporting both min- and max-heap is more or less cumbersome, depending on the language, so I simply negate the numbers in the heap in which I want the reverse of the default order. To prevent this from causing a bug with -2<sup>31</sup> (which negated is itself, when using 32-bit ints), I use integer types larger than 32 bits.\\n\\nUsing larger integer types also prevents an overflow error when taking the mean of the two middle numbers. I think almost all solutions posted previously have that bug.\\n\\n**Update:** These are pretty short already, but by now I wrote [even shorter ones](https://leetcode.com/discuss/64910/very-short-o-log-n-o-1).\\n\\n---\\n\\n**Java**\\n\\n    class MedianFinder {\\n    \\n        private Queue<Long> small = new PriorityQueue(),\\n                            large = new PriorityQueue();\\n    \\n        public void addNum(int num) {\\n            large.add((long) num);\\n            small.add(-large.poll());\\n            if (large.size() < small.size())\\n                large.add(-small.poll());\\n        }\\n    \\n        public double findMedian() {\\n            return large.size() > small.size()\\n                   ? large.peek()\\n                   : (large.peek() - small.peek()) / 2.0;\\n        }\\n    };\\n\\nProps to [larrywang2014's solution](https://leetcode.com/discuss/64842/32ms-easy-to-understand-java-solution) for making me aware that I can use Queue in the declaration instead of PriorityQueue (that's all I got from him, though (just saying because I just saw he changed his previously longer addNum and it's now equivalent to mine)).\\n\\n---\\n\\n**C++**\\n\\n    class MedianFinder {\\n        priority_queue<long> small, large;\\n    public:\\n    \\n        void addNum(int num) {\\n            small.push(num);\\n            large.push(-small.top());\\n            small.pop();\\n            if (small.size() < large.size()) {\\n                small.push(-large.top());\\n                large.pop();\\n            }\\n        }\\n    \\n        double findMedian() {\\n            return small.size() > large.size()\\n                   ? small.top()\\n                   : (small.top() - large.top()) / 2.0;\\n        }\\n    };\\n\\nBig thanks to jianchao.li.fighter for telling me that C++'s priority_queue is a max-queue (see comments below).\\n\\n---\\n\\n**Python**\\n\\n    from heapq import *\\n    \\n    class MedianFinder:\\n    \\n        def __init__(self):\\n            self.heaps = [], []\\n    \\n        def addNum(self, num):\\n            small, large = self.heaps\\n            heappush(small, -heappushpop(large, num))\\n            if len(large) < len(small):\\n                heappush(large, -heappop(small))\\n    \\n        def findMedian(self):\\n            small, large = self.heaps\\n            if len(large) > len(small):\\n                return float(large[0])\\n            return (large[0] - small[0]) / 2.0"
		},
		{
			"lc_ans_id":"74049",
			"view":"12196",
			"top":"1",
			"title":"Share my java solution logn to insert, O(1) to query",
			"vote":"56",
			"content":"Not sure why it is marked as hard, i think this is one of the easiest questions on leetcode.\\n\\n    class MedianFinder {\\n        // max queue is always larger or equal to min queue\\n        PriorityQueue<Integer> min = new PriorityQueue();\\n        PriorityQueue<Integer> max = new PriorityQueue(1000, Collections.reverseOrder());\\n        // Adds a number into the data structure.\\n        public void addNum(int num) {\\n            max.offer(num);\\n            min.offer(max.poll());\\n            if (max.size() < min.size()){\\n                max.offer(min.poll());\\n            }\\n        }\\n    \\n        // Returns the median of current data stream\\n        public double findMedian() {\\n            if (max.size() == min.size()) return (max.peek() + min.peek()) /  2.0;\\n            else return max.peek();\\n        }\\n    };"
		},
		{
			"lc_ans_id":"74144",
			"view":"7240",
			"top":"2",
			"title":"Easy to understand double-heap solution in Java",
			"vote":"35",
			"content":"The basic idea is to maintain two heaps: a max-heap and a min-heap. **The max heap stores the smaller half of all numbers while the min heap stores the larger half.** The sizes of two heaps need to be balanced each time when a new number is inserted so that their size will not be different by more than 1. Therefore each time when findMedian() is called we check if two heaps have the same size. If they do, we should return the average of the two top values of heaps. Otherwise we return the top of the heap which has one more element.\\n\\nTo do that, we first need to add two PriorityQueues to the class as the max-heap and min-heap:\\n\\n        private PriorityQueue<Integer> minH;\\n        private PriorityQueue<Integer> maxH;\\n\\nWe then define the constructor of the class so that the PriorityQueues get initialized. By default, the sorting order of a PriorityQueue is natural order which means it is a min-heap by default. Hence we need to provide a new Comparator to the constructor of the max heap to specify the reversed order.\\n\\n        MedianFinder(){\\n            minH = new PriorityQueue<Integer>();\\n            maxH = new PriorityQueue<Integer>(1, new Comparator<Integer>(){\\n                public int compare(Integer o1, Integer o2) {\\n                    if (o1.intValue()>o2.intValue()) return -1;\\n                    if (o1.intValue()<o2.intValue()) return 1;\\n                    return 0;\\n                }\\n            });\\n        }\\n\\nNow we have the data structure properly built. Let's write the addNum() function next.\\n\\n        public void addNum(int num) {\\n            if ((minH.size()==0)&&(maxH.size()==0)) minH.add(num);\\n            else if ((minH.size())>(maxH.size())) {\\n                if (num>minH.peek()) {\\n                    maxH.add(minH.poll());\\n                    minH.add(num);\\n                } else maxH.add(num);\\n            } else if ((minH.size())<(maxH.size())) {\\n                if (num<maxH.peek()) {\\n                    minH.add(maxH.poll());\\n                    maxH.add(num);\\n                } else minH.add(num);            \\n            } else {\\n                if (num<maxH.peek()) maxH.add(num);\\n                else minH.add(num);             \\n            }\\n        }\\n\\nThere are several possible situations when a new number is inserted: \\n\\n1)If both heap are empty, meaning that we are inserting the first number, we just arbitrarily inserted it into a heap, let's say, the min-heap. \\n\\n2)If min-heap has more elements (later we will argue that the size won't be different by more than 1), we need to compare the new number with the top of the min-heap. If it is larger than that, then the new number belongs to the larger half and it should be added to the min-heap. But since we have to balance the heap, we should move the top element of the min-heap to the max-heap. For the min-heap, we inserted a new number but removed the original top, its size won't change. For the max-heap, we inserted a new element (the top of the min-heap) so its size will increase by 1.\\n\\n3)If max-heap has more elements, we did the similar thing as 2).\\n\\n4)If they have the same size, we just compare the new number with one of the top to determine which heap the new number should be inserted. We just simply inserted it there.\\n\\nIt can be seen that for each insertion if it was in situation 1) and 4), then after insertion the heap size difference will be 1. For 2) and 3), the size of the heap with fewer element will increase by 1 to catch up with the heap with more elements. Hence their sizes are well-balanced and the difference will never exceeds 1.\\n\\nObviously, the median will be the top element of the heap which has one more element (if max-heap and min-heap have different sizes), or the average of the two tops (if max-heap and min-heap have equal sizes). So the findMedian() function is very straightforward:\\n\\n        // Returns the median of current data stream\\n        public double findMedian() {\\n            if ((minH.size()==0)&&(maxH.size()==0)) return 0.0;\\n            if ((minH.size())>(maxH.size())) return (double)(minH.peek());\\n            if ((minH.size())<(maxH.size())) return (double)(maxH.peek());\\n            return ((double)(maxH.peek()+minH.peek()))/2.0;\\n        }\\n\\n\\n\\nThe entire codes are here:\\n\\n    class MedianFinder {\\n        private PriorityQueue<Integer> minH;\\n        private PriorityQueue<Integer> maxH;\\n        \\n        MedianFinder(){\\n            minH = new PriorityQueue<Integer>();\\n            maxH = new PriorityQueue<Integer>(1, new Comparator<Integer>(){\\n                public int compare(Integer o1, Integer o2) {\\n                    if (o1.intValue()>o2.intValue()) return -1;\\n                    if (o1.intValue()<o2.intValue()) return 1;\\n                    return 0;\\n                }\\n            });\\n        }\\n        \\n        \\n        // Adds a number into the data structure.\\n        public void addNum(int num) {\\n            if ((minH.size()==0)&&(maxH.size()==0)) minH.add(num);\\n            else if ((minH.size())>(maxH.size())) {\\n                if (num>minH.peek()) {\\n                    maxH.add(minH.poll());\\n                    minH.add(num);\\n                } else maxH.add(num);\\n            } else if ((minH.size())<(maxH.size())) {\\n                if (num<maxH.peek()) {\\n                    minH.add(maxH.poll());\\n                    maxH.add(num);\\n                } else minH.add(num);            \\n            } else {\\n                if (num<maxH.peek()) maxH.add(num);\\n                else minH.add(num);             \\n            }\\n        }\\n    \\n        // Returns the median of current data stream\\n        public double findMedian() {\\n            if ((minH.size()==0)&&(maxH.size()==0)) return 0.0;\\n            if ((minH.size())>(maxH.size())) return (double)(minH.peek());\\n            if ((minH.size())<(maxH.size())) return (double)(maxH.peek());\\n            return ((double)(maxH.peek()+minH.peek()))/2.0;\\n        }\\n    };\\n    \\n    // Your MedianFinder object will be instantiated and called as such:\\n    // MedianFinder mf = new MedianFinder();\\n    // mf.addNum(1);\\n    // mf.findMedian();"
		},
		{
			"lc_ans_id":"74047",
			"view":"5596",
			"top":"3",
			"title":"Java/Python two heap solution, O(log n) add, O(1) find",
			"vote":"33",
			"content":"The invariant of the algorithm is two heaps, small and large, each represent half of the current list. The length of smaller half is kept to be n / 2 at all time and the length of the larger half is either n / 2 or n / 2 + 1 depend on n's parity. \\n\\nThis way we only need to peek the two heaps' top number to calculate median.\\n\\nAny time before we add a new number, there are two scenarios, (total n numbers, k = n / 2):\\n\\n    (1) length of (small, large) == (k, k)\\n    (2) length of (small, large) == (k, k + 1)\\n\\nAfter adding the number, total (n + 1) numbers, they will become:\\n\\n    (1) length of (small, large) == (k, k + 1)\\n    (2) length of (small, large) == (k + 1, k + 1)\\n\\nHere we take the first scenario for example, we know the large will gain one more item and small will remain the same size, but we cannot just push the item into large. What we should do is we push the new number into small and pop the maximum item from small then push it into large (all the pop and push here are heappop and heappush). By doing this kind of operations for the two scenarios we can keep our invariant.\\n\\nTherefore to add a number, we have 3 O(log n) heap operations. Luckily the heapq provided us a function \"heappushpop\" which saves some time by combine two into one. The document says:\\n\\n<blockquote>Push item on the heap, then pop and return the smallest item from the heap. The combined action runs more efficiently than heappush() followed by a separate call to heappop().</blockquote>\\n\\nAlltogether, the add operation is O(logn), The findMedian operation is O(1). \\n\\nNote that the heapq in python is a min heap, thus we need to invert the values in the smaller half to mimic a \"max heap\".\\n\\nA further observation is that the two scenarios take turns when adding numbers, thus it is possible to combine the two into one. For this please see [stefan's post][1]\\n\\n\\n**Java**\\n\\n    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\\n    private PriorityQueue<Integer> large = new PriorityQueue<>();\\n    private boolean even = true;\\n\\n    public double findMedian() {\\n        if (even)\\n            return (small.peek() + large.peek()) / 2.0;\\n        else\\n            return small.peek();\\n    }\\n\\n    public void addNum(int num) {\\n        if (even) {\\n            large.offer(num);\\n            small.offer(large.poll());\\n        } else {\\n            small.offer(num);\\n            large.offer(small.poll());\\n        }\\n        even = !even;\\n    }\\n\\n\\n**Python**\\n\\n    from heapq import *\\n    \\n    \\n    class MedianFinder:\\n        def __init__(self):\\n            self.small = []  # the smaller half of the list, max heap (invert min-heap)\\n            self.large = []  # the larger half of the list, min heap\\n    \\n        def addNum(self, num):\\n            if len(self.small) == len(self.large):\\n                heappush(self.large, -heappushpop(self.small, -num))\\n            else:\\n                heappush(self.small, -heappushpop(self.large, num))\\n    \\n        def findMedian(self):\\n            if len(self.small) == len(self.large):\\n                return float(self.large[0] - self.small[0]) / 2.0\\n            else:\\n                return float(self.large[0])\\n\\n    # 18 / 18 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 388 ms\\n\\n\\n\\n\\n  [1]: https://leetcode.com/discuss/64910/very-short-o-log-n-o-1"
		},
		{
			"lc_ans_id":"74044",
			"view":"10631",
			"top":"4",
			"title":"Very Short, O(log n) + O(1)",
			"vote":"32",
			"content":"Same idea [as before](https://leetcode.com/discuss/64850/short-simple-java-c-python-o-log-n-o-1), but really exploiting the symmetry of the two heaps by switching them whenever a number is added. Still O(log n) for adding and O(1) for median. Partially inspired by [peisi's updated solution](https://leetcode.com/discuss/64852/ac-python-two-heap-solution-o-log-n-add-o-1-find-388-ms).\\n\\n**Update:** Added a new Java version (the first one).\\n\\n---\\n\\n**Java**\\n\\n    class MedianFinder {\\n        \\n        Queue<Integer> q = new PriorityQueue(), z = q, t,\\n                       Q = new PriorityQueue(Collections.reverseOrder()); \\n    \\n        public void addNum(int num) {\\n            (t=Q).add(num);\\n            (Q=q).add((q=t).poll());\\n        }\\n    \\n        public double findMedian() {\\n            return (Q.peek() + z.peek()) / 2.;\\n        }\\n    };\\n\\nOr:\\n\\n    class MedianFinder {\\n    \\n        Queue[] q = {new PriorityQueue(), new PriorityQueue(Collections.reverseOrder())};\\n        int i = 0;\\n    \\n        public void addNum(int num) {\\n            q[i].add(num);\\n            q[i^=1].add(q[i^1].poll());\\n        }\\n    \\n        public double findMedian() {\\n            return ((int)(q[1].peek()) + (int)(q[i].peek())) / 2.0;\\n        }\\n    };\\n\\n---\\n\\n**Python**\\n\\n    from heapq import *\\n\\n    class MedianFinder:\\n    \\n        def __init__(self):\\n            self.heaps = None, [], []\\n            self.i = 1\\n    \\n        def addNum(self, num):\\n            heappush(self.heaps[-self.i], -heappushpop(self.heaps[self.i], num * self.i))\\n            self.i *= -1\\n    \\n        def findMedian(self):\\n            return (self.heaps[self.i][0] * self.i - self.heaps[-1][0]) / 2.0\\n\\nOr:\\n\\n    from heapq import *\\n\\n    class MedianFinder:\\n    \\n        def __init__(self):\\n            self.data = 1, [], []\\n    \\n        def addNum(self, num):\\n            sign, h1, h2 = self.data\\n            heappush(h2, -heappushpop(h1, num * sign))\\n            self.data = -sign, h2, h1\\n    \\n        def findMedian(self):\\n            sign, h1, h2 = d = self.data\\n            return (h1[0] * sign - d[-sign][0]) / 2.0"
		},
		{
			"lc_ans_id":"74163",
			"view":"1991",
			"top":"5",
			"title":"My C++ priority_queue based solution (140 ms)",
			"vote":"20",
			"content":"The idea is to use two heaps  (one max heap, one mn heap) to save the input data. firstQ is a max_heap to save the first half of the data with smaller values,  and secQ is a min_heap to save the second half of the data with bigger values. Everytime when inserting a new value, we first compare if it is smaller than the top of firstQ (the largest value of the first half), if so, insert into firstQ. Otherwise, it belongs to the second half.  After inserting, we have to balance the first half and the second half to make sure either they have the same length or the length difference is only 1. \\nThe median will be the mean of two top elements (when they have the same length) or the top element of the queue with a larger length. \\n\\n    class MedianFinder {\\n    private:\\n        priority_queue<int> firstQ; // max_heap for the first half\\n        priority_queue<int, std::vector<int>, std::greater<int> > secQ; // min_heap for the second half\\n    public:\\n        // Adds a number into the data structure.\\n        void addNum(int num) {\\n            if(firstQ.empty() || (firstQ.top()>num)) firstQ.push(num); // if it belongs to the smaller half\\n            else secQ.push(num); \\n            \\n            // rebalance the two halfs to make sure the length difference is no larger than 1\\n            if(firstQ.size() > (secQ.size()+1))\\n            {\\n                secQ.push(firstQ.top());\\n                firstQ.pop();\\n            }\\n            else if(firstQ.size()+1<secQ.size())\\n            {\\n                firstQ.push(secQ.top());\\n                secQ.pop();\\n            }\\n        }\\n    \\n        // Returns the median of current data stream\\n        double findMedian() {\\n            if(firstQ.size() == secQ.size()) return firstQ.empty()?0:( (firstQ.top()+secQ.top())/2.0);\\n            else return (firstQ.size() > secQ.size())? firstQ.top():secQ.top(); \\n        }\\n    };"
		},
		{
			"lc_ans_id":"74128",
			"view":"2089",
			"top":"6",
			"title":"JAVA-----------Easy Version To Understand!!!!!",
			"vote":"16",
			"content":"    \\tPriorityQueue<Integer> minHeap = new PriorityQueue<>();//heap is a minimal heap by default\\n\\tPriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());//change to a maximum heap\\n\\n\\t// Adds a number into the data structure.\\n\\tpublic void addNum(int num) {\\n\\t\\tmaxHeap.offer(num);\\n\\t\\tminHeap.offer(maxHeap.poll());\\n\\t\\tif (maxHeap.size() < minHeap.size())\\n\\t\\t\\tmaxHeap.offer(minHeap.poll());\\n\\t}\\n\\n\\t// Returns the median of current data stream\\n\\tpublic double findMedian() {\\n\\t\\tif (maxHeap.size() == minHeap.size())\\n\\t\\t\\treturn (maxHeap.peek() + minHeap.peek()) / 2.0;\\n\\t\\telse\\n\\t\\t\\treturn maxHeap.peek();\\n\\t}"
		},
		{
			"lc_ans_id":"74166",
			"view":"1500",
			"top":"7",
			"title":"Solution using Binary Search Tree",
			"vote":"12",
			"content":"As the input numbers are random, so the height of the binary search tree is O(logN)\\n\\nWe maintain every single node's children's size and it's easy to implement because it just has add operation.\\n\\n    struct BST {\\n        struct node {\\n            int val;\\n            int size;\\n            node* left, *right;\\n            node(int v) : size(1), val(v) {};\\n        } *Null, *root;\\n        \\n        BST() {\\n            Null = new node(0);\\n            Null -> size = 0;\\n            root = Null;\\n        }\\n        \\n        void add(int val, node*& R) {\\n            if(R == Null) {\\n                R = new node(val);\\n                R -> left = R -> right = Null;\\n                return;\\n            }\\n            if(R->val <= val) add(val, R->left);\\n            else add(val, R->right);\\n            R->size = R->left->size + R->right->size + 1;\\n            \\n        }\\n        \\n        int rank(int k) {\\n            node* t = root;\\n            while(true) {\\n                int leftSize =  t -> left -> size;\\n                if(leftSize == k) return t -> val;\\n                if(leftSize > k) {\\n                    t = t -> left;\\n                } else {\\n                    k = k - leftSize - 1;\\n                    t = t -> right;\\n                }\\n            }\\n            return -1;\\n        }\\n    };\\n    \\n    \\n    \\n    \\n    class MedianFinder {\\n    public:\\n        BST* bst;\\n        MedianFinder() {\\n            bst = new BST();\\n        }\\n        // Adds a number into the data structure.\\n        void addNum(int num) {\\n            bst->add(num, bst->root);\\n        }\\n        \\n        // Returns the median of current data stream\\n        double findMedian() {\\n            int sz = bst -> root -> size;\\n            if(sz % 2 == 0) {\\n                return 1.0 * (bst -> rank(sz / 2) + bst -> rank(sz / 2 - 1)) / 2;\\n            } else return bst->rank(sz / 2);\\n            \\n        }\\n    };"
		},
		{
			"lc_ans_id":"74077",
			"view":"1779",
			"top":"8",
			"title":"32ms easy-to-understand java solution",
			"vote":"12",
			"content":"    class MedianFinder {\\n    private Queue<Integer> maxHeap = new PriorityQueue(new Comparator<Integer>(){\\n       @Override\\n       public int compare(Integer i1, Integer i2){\\n           return Integer.compare(i2, i1);\\n       }\\n    });\\n    private Queue<Integer> minHeap = new PriorityQueue(new Comparator<Integer>(){\\n       @Override\\n       public int compare(Integer i1, Integer i2){\\n           return Integer.compare(i1, i2);\\n       }\\n    });\\n    \\n    // Adds a number into the data structure.\\n    public void addNum(int num) {\\n        minHeap.offer(num);\\n        maxHeap.offer(minHeap.poll());\\n        \\n        //if(maxHeap.size() > minHeap.size())\\n        if(maxHeap.size() - minHeap.size() == 1){\\n            minHeap.offer(maxHeap.poll());\\n        }\\n    }\\n\\n    // Returns the median of current data stream\\n    public double findMedian() {\\n        return minHeap.size() > maxHeap.size()\\n             ? (double)minHeap.peek()\\n             : (minHeap.peek() + maxHeap.peek())/2.0;\\n    }\\n};"
		},
		{
			"lc_ans_id":"74135",
			"view":"1829",
			"top":"9",
			"title":"Simple Java Solution with 2 Heaps and Explanation",
			"vote":"10",
			"content":"        class MedianFinder {\\n        PriorityQueue<Integer> min = null;\\n        PriorityQueue<Integer> max = null;\\n        int len = 0;\\n        \\n        public MedianFinder(){\\n            min = new PriorityQueue<>();\\n            max = new PriorityQueue<>(Collections.reverseOrder());\\n        }\\n        \\n        //Understanding is we will be maintain 2 heaps max and min. The max heap will store the smaller half\\n        //and the min heap will store the larger half of the incoming numbers. Basically we are trying to mimic a \\n        //balanced tree with this model of representation, which means the max heap at the most can have only one extra\\n        //element than the min heap. We need to maintain the ordering that the root of the max heap < root of min heap\\n        \\n        // Adds a number into the data structure.\\n        public void addNum(int num) {\\n            //if the number of elements is even then we need to add the new element to the max heap\\n            if(len%2==0){\\n                max.offer(num);\\n            }else{\\n                //if the number of elements is odd then we need to add the new element to the maxheap\\n                //then transfer the root of the max heap to the min heap\\n                max.offer(num);\\n                min.offer(max.poll());\\n            }    \\n            \\n            //increment the size\\n            len++;\\n            \\n            //if the root of max heap > root of min heap, then it conficts our order rule\\n            //so we shift the max heap's root to min heap and add the minimum element of our\\n            //min heap to max heap\\n            if(len > 1 && max.peek() > min.peek()){\\n                min.offer(max.poll());\\n                max.offer(min.poll());\\n            }\\n        }\\n    \\n        // Returns the median of current data stream\\n        public double findMedian() {\\n            return (len%2==0)?((double)((max.peek()+min.peek())/2.0)):((double)max.peek());\\n        }\\n    }"
		}
	],
	"id":"295",
	"title":"Find Median from Data Stream",
	"content":"<p>Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.</p>\r\nExamples: <br />\r\n<p><code>[2,3,4]</code> , the median is <code>3</code></p>\r\n<p><code>[2,3]</code>, the median is <code>(2 + 3) / 2 = 2.5</code> </p>\r\n\r\n<p>\r\nDesign a data structure that supports the following two operations:\r\n</p>\r\n<ul>\r\n<li>void addNum(int num) - Add a integer number from the data stream to the data structure.</li>\r\n<li>double findMedian() - Return the median of all elements so far.</li>\r\n</ul>\r\n\r\n<p>\r\nFor example:</p>\r\n<pre>\r\naddNum(1)\r\naddNum(2)\r\nfindMedian() -> 1.5\r\naddNum(3) \r\nfindMedian() -> 2\r\n</pre>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/Louis1992\">@Louis1992</a> for adding this problem and creating all test cases.</p>",
	"frequency":"372",
	"ac_num":"54299"
}