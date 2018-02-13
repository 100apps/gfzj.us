{
	"difficulty":"1",
	"submit_num":"56806",
	"show_id":"346",
	"leetcode_id":"346",
	"answers":[
		{
			"lc_ans_id":"81491",
			"view":"11767",
			"top":"0",
			"title":"Java O(1) time solution.",
			"vote":"36",
			"content":"The idea is to keep the sum so far and update the sum just by replacing the oldest number with the new entry.\\n\\n    public class MovingAverage {\\n        private int [] window;\\n        private int n, insert;\\n        private long sum;\\n        \\n        /** Initialize your data structure here. */\\n        public MovingAverage(int size) {\\n            window = new int[size];\\n            insert = 0;\\n            sum = 0;\\n        }\\n        \\n        public double next(int val) {\\n            if (n < window.length)  n++;\\n            sum -= window[insert];\\n            sum += val;\\n            window[insert] = val;\\n            insert = (insert + 1) % window.length;\\n            \\n            return (double)sum / n;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"81505",
			"view":"4943",
			"top":"1",
			"title":"Java easy to understand solution",
			"vote":"19",
			"content":"Essentially, we just need to keep track of the sum of the current window as we go. This prevents an O(n) traversal over the Queue as we add new numbers to get the new average.  If we need to evict then we just subtract that number off of our sum and divide by the size. \\n\\n    public class MovingAverage {\\n    private double previousSum = 0.0;\\n    private int maxSize;\\n    private Queue<Integer> currentWindow;\\n    \\n    public MovingAverage(int size) {\\n        currentWindow = new LinkedList<Integer>();\\n        maxSize = size;\\n    }\\n    \\n    public double next(int val) {\\n        if (currentWindow.size() == maxSize)\\n        {\\n            previousSum -= currentWindow.remove();\\n        }\\n        \\n        previousSum += val;\\n        currentWindow.add(val);\\n        return previousSum / currentWindow.size();\\n    }}"
		},
		{
			"lc_ans_id":"81495",
			"view":"4363",
			"top":"2",
			"title":"4-line Python Solution using deque",
			"vote":"19",
			"content":"    import collections\\n    \\n    class MovingAverage(object):\\n    \\n        def __init__(self, size):\\n            \"\"\"\\n            Initialize your data structure here.\\n            :type size: int\\n            \"\"\"\\n            self.queue = collections.deque(maxlen=size)\\n            \\n    \\n        def next(self, val):\\n            \"\"\"\\n            :type val: int\\n            :rtype: float\\n            \"\"\"\\n            queue = self.queue\\n            queue.append(val)\\n            return float(sum(queue))/len(queue)\\n            \\n    \\n    \\n    # Your MovingAverage object will be instantiated and called as such:\\n    # obj = MovingAverage(size)\\n    # param_1 = obj.next(val)"
		},
		{
			"lc_ans_id":"81489",
			"view":"1913",
			"top":"3",
			"title":"Simple Python solution based on Circular Array - real O(1) time next()",
			"vote":"11",
			"content":"    class MovingAverage(object):\\n    \\n        def __init__(self, size):\\n            self.vect, self.sums, self.idx, self.size = [0] * size, 0, 0, size\\n            \\n    \\n        def next(self, val):\\n            self.idx += 1\\n            self.sums -= self.vect[self.idx % self.size]\\n            self.vect[self.idx % self.size] = val\\n            self.sums += val\\n            return self.sums / float(min(self.idx, self.size))\\n\\nMy solution requires real `O(1)` time for `next()` operation as it is not needed to compute the sum every time. We just subtract the element that is exiting from the sliding window, and we're done. We need also to substitute that element with the new one."
		},
		{
			"lc_ans_id":"81587",
			"view":"2619",
			"top":"4",
			"title":"C++ easy solution using queue",
			"vote":"7",
			"content":"    class MovingAverage {\\n    private:\\n        queue<int> qu;\\n        int avergeSize;\\n        double sum;\\n    public:\\n        MovingAverage(int size):avergeSize(size),sum(0) {}\\n        \\n        double next(int val) {\\n            sum += val;\\n            qu.push(val);\\n            int queueSize = (int)qu.size();\\n            if(queueSize <= avergeSize){\\n                return sum / queueSize;\\n            }\\n            else{\\n                sum -= qu.front();\\n                qu.pop();\\n                return sum / avergeSize;\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"81555",
			"view":"2295",
			"top":"5",
			"title":"JAVA O(1) using Deque",
			"vote":"4",
			"content":"    public class MovingAverage {\\n    \\n    \\tDeque<Integer> dq;\\n    \\tint size;\\n    \\tint sum;\\n    \\tpublic MovingAverage(int size) {\\n    \\t\\tdq = new LinkedList<>();\\n    \\t\\tthis.size = size;\\n    \\t\\tthis.sum = 0;\\n    \\t}\\n    \\n    \\tpublic double next(int val) {\\n    \\t\\tif (dq.size() < size) {\\n    \\t\\t\\tsum += val;\\n    \\t\\t\\tdq.addLast(val);\\n    \\t\\t\\treturn (double) (sum / dq.size());\\n    \\t\\t} else {\\n    \\t\\t\\tint temp = dq.pollFirst();\\n    \\t\\t\\tsum -= temp;\\n    \\t\\t\\tdq.addLast(val);\\n    \\t\\t\\tsum += val;\\n    \\t\\t\\treturn (double) (sum / size);\\n    \\t\\t}\\n    \\t}\\n    \\n    }"
		},
		{
			"lc_ans_id":"81490",
			"view":"579",
			"top":"6",
			"title":"Simple O(1) Java solution",
			"vote":"3",
			"content":"Maintain a sum and count for elements in queue.\\n\\n```\\npublic class MovingAverage {\\n\\n    /** Initialize your data structure here. */\\n    Queue queue = new LinkedList();\\n    int size;\\n    int count;\\n    int sum;\\n    \\n    public MovingAverage(int size) {\\n        this.size = size;\\n    }\\n    \\n    public double next(int val) {\\n        if (count == size) {\\n            sum = sum - (int)queue.remove();\\n            sum += val;\\n            queue.add(val);\\n        } else {\\n            count++;\\n            sum += val;\\n            queue.add(val);\\n        }\\n        return (double)(sum)/(double)(count);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"81557",
			"view":"221",
			"top":"7",
			"title":"What if the size is too big to hold in memory?  How to handle?",
			"vote":"2",
			"content":"What if the size is too big to hold in memory?"
		},
		{
			"lc_ans_id":"81558",
			"view":"405",
			"top":"8",
			"title":"Simple O(1) python solution",
			"vote":"2",
			"content":"```\\nclass MovingAverage(object):\\n\\n    def __init__(self, size):\\n        self.queue = deque(maxlen=size)\\n        self.wsize = size\\n        self.cursum = 0\\n        \\n\\n    def next(self, val):\\n        self.cursum += val\\n        if len(self.queue) == self.wsize:\\n            self.cursum -= self.queue.popleft()\\n        self.queue.append(val)\\n        return float(self.cursum) / len(self.queue)\\n```"
		},
		{
			"lc_ans_id":"81509",
			"view":"108",
			"top":"9",
			"title":"C++ solution",
			"vote":"1",
			"content":"```cpp\\nclass MovingAverage {\\n    int window=0;\\n    queue<int> q;\\n    int sum = 0;\\npublic:\\n    /** Initialize your data structure here. */\\n    MovingAverage(int size) {\\n        window = size;\\n    }\\n    \\n    double next(int val) {\\n        if(q.size() == window)\\n        {\\n            sum-=q.front();\\n            q.pop();\\n        }\\n        q.push(val);\\n        sum+=val;\\n        return sum*1.0/q.size();\\n    }\\n};"
		}
	],
	"id":"346",
	"title":"Moving Average from Data Stream",
	"content":"<p>Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.</p>\r\n\r\n<p>For example,<br />\r\n<pre>\r\nMovingAverage m = new MovingAverage(3);\r\nm.next(1) = 1\r\nm.next(10) = (1 + 10) / 2\r\nm.next(3) = (1 + 10 + 3) / 3\r\nm.next(5) = (10 + 3 + 5) / 3\r\n</pre>\r\n</p>",
	"frequency":"318",
	"ac_num":"33999"
}