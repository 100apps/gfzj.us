{
	"difficulty":"1",
	"submit_num":"257798",
	"show_id":"225",
	"leetcode_id":"225",
	"answers":[
		{
			"lc_ans_id":"62527",
			"view":"17668",
			"top":"0",
			"title":"A simple C++ solution",
			"vote":"154",
			"content":"\\tclass Stack {\\n\\tpublic:\\n\\t\\tqueue<int> que;\\n\\t\\t// Push element x onto stack.\\n\\t\\tvoid push(int x) {\\n\\t\\t\\tque.push(x);\\n\\t\\t\\tfor(int i=0;i<que.size()-1;++i){\\n\\t\\t\\t\\tque.push(que.front());\\n\\t\\t\\t\\tque.pop();\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\t// Removes the element on top of the stack.\\n\\t\\tvoid pop() {\\n\\t\\t\\tque.pop();\\n\\t\\t}\\n\\n\\t\\t// Get the top element.\\n\\t\\tint top() {\\n\\t\\t\\treturn que.front();\\n\\t\\t}\\n\\n\\t\\t// Return whether the stack is empty.\\n\\t\\tbool empty() {\\n\\t\\t\\treturn que.empty();\\n\\t\\t}\\n\\t};"
		},
		{
			"lc_ans_id":"62519",
			"view":"14893",
			"top":"1",
			"title":"Only push is O(n), others are O(1). Using one queue. Combination of two shared solutions",
			"vote":"85",
			"content":"    class MyStack \\n    {\\n        Queue<Integer> queue;\\n        \\n        public MyStack()\\n        {\\n            this.queue=new LinkedList<Integer>();\\n        }\\n        \\n        // Push element x onto stack.\\n        public void push(int x) \\n        {\\n           queue.add(x);\\n           for(int i=0;i<queue.size()-1;i++)\\n           {\\n               queue.add(queue.poll());\\n           }\\n        }\\n    \\n        // Removes the element on top of the stack.\\n        public void pop() \\n        {\\n            queue.poll();\\n        }\\n    \\n        // Get the top element.\\n        public int top() \\n        {\\n            return queue.peek();\\n        }\\n    \\n        // Return whether the stack is empty.\\n        public boolean empty() \\n        {\\n            return queue.isEmpty();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"62533",
			"view":"9832",
			"top":"2",
			"title":"Java solutions about three ways one of which utilizes one queue, and the others utilize two queues",
			"vote":"51",
			"content":"First, let's see the most easiest way: one queue.\\nIn this method,  the point is that after you add one element to the queue, rotate the queue to make the tail be the head.\\n\\n    class MyStack {\\n    \\n    //one Queue solution\\n    private Queue<Integer> q = new LinkedList<Integer>();\\n    \\n    // Push element x onto stack.\\n    public void push(int x) {\\n        q.add(x);\\n        for(int i = 1; i < q.size(); i ++) { //rotate the queue to make the tail be the head\\n            q.add(q.poll());\\n        }\\n    }\\n\\n    // Removes the element on top of the stack.\\n    public void pop() {\\n        q.poll();\\n    }\\n\\n    // Get the top element.\\n    public int top() {\\n        return q.peek();        \\n    }\\n\\n    // Return whether the stack is empty.\\n    public boolean empty() {\\n        return q.isEmpty();\\n    }\\n    }\\n\\nThen, two queue ways.\\n\\n1  Push method is inefficient.\\n\\nwhen you push an element, choose one empty queue(whichever when both are empty) to add this element, and then push all elements of the other queue into the chosen queue. After that, the newest element is at the head of the chosen queue so that whenever you want to do pop() or top(), you always get the newest element.\\n\\nFor example,\\n\\npush(1):\\n\\n[ , ,1]    [ , , ]\\n\\npush(2):\\n\\n[ , , ]   [ ,1,2]\\n\\npush(3):\\n\\n[ 1, 2,3 ] [ , , ] \\n\\n\\n    class MyStack {\\n    //using two queue. The push is inefficient.\\n    private Queue<Integer> q1 = new LinkedList<Integer>();\\n    private Queue<Integer> q2 = new LinkedList<Integer>();\\n    public void push(int x) {\\n        if(q1.isEmpty()) {\\n            q1.add(x);\\n            for(int i = 0; i < q2.size(); i ++)\\n                q1.add(q2.poll());\\n        }else {\\n            q2.add(x);\\n            for(int i = 0; i < q1.size(); i++)\\n                q2.add(q1.poll());\\n        }\\n    }\\n    \\n    public void pop() {\\n        if(!q1.isEmpty()) \\n            q1.poll();\\n        else\\n            q2.poll();\\n    }\\n    public int top() {\\n        return q1.isEmpty() ? q2.peek() : q1.peek();\\n    }\\n    public boolean empty() {\\n        return q1.isEmpty() && q2.isEmpty();\\n    }\\n    }\\n\\n2 pop() and top() are inefficient\\n\\nWhen you push elements, choose a queue which is not empty(whichever when both are empty).\\nWhen you do pop() or top(), first pop all elements of the queue except the tail into another empty queue, and then pop the tail which is your want.\\n\\nFor example:\\n\\npush(1):\\n\\n[ , , 1] [ , , ]\\n\\npush(2):\\n\\n[ ,2,1] [ , , ]\\n\\ntop();\\n\\n[ , , 2] [ , ,1] -> [ , , ] [ ,2,1]\\n\\npop():\\n\\n[ , , 1] [ , ,2]  -> [ , ,1] [ , , ]\\n\\npush(3) :\\n \\n[ ,3,1] [ , , ]\\n\\n    class MyStack{\\n    //using two queue. The pop and top are inefficient.\\n    private Queue<Integer> q1 = new LinkedList<Integer>();\\n    private Queue<Integer> q2 = new LinkedList<Integer>();\\n    public void push(int x) {\\n        if(!q1.isEmpty()) \\n            q1.add(x);\\n        else\\n            q2.add(x);\\n    }\\n    public void pop() {\\n        if(q1.isEmpty()) {\\n            int size = q2.size();\\n            for(int i = 1; i < size; i ++) {\\n                q1.add(q2.poll());\\n            }\\n            q2.poll();\\n        }else {\\n            int size = q1.size();\\n            for(int i = 1; i < size; i ++) {\\n                q2.add(q1.poll());\\n            }\\n            q1.poll();\\n        }\\n    }\\n    public int top() {\\n        int res;\\n        if(q1.isEmpty()) {\\n            int size = q2.size();\\n            for(int i = 1; i < size; i ++) {\\n                q1.add(q2.poll());\\n            }\\n            res = q2.poll();\\n            q1.add(res);\\n        }else {\\n            int size = q1.size();\\n            for(int i = 1; i < size; i ++) {\\n                q2.add(q1.poll());\\n            }\\n            res = q1.poll();\\n            q2.add(res);\\n        }\\n        return res;\\n    }\\n    public boolean empty() {\\n        return q1.isEmpty() && q2.isEmpty();\\n    }\\n    }"
		},
		{
			"lc_ans_id":"62516",
			"view":"9093",
			"top":"3",
			"title":"Concise 1 Queue - Java, C++, Python",
			"vote":"46",
			"content":"**Explanation:**\\n\\nJust use a queue where you *\"push to front\"* by pushing to back and then rotating the queue until the new element is at the front (i.e., size-1 times move the front element to the back).\\n\\n---\\n\\n**C++:** 0 ms\\n\\n    class Stack {\\n        queue<int> q;\\n    public:\\n        void push(int x) {\\n            q.push(x);\\n            for (int i=1; i<q.size(); i++) {\\n                q.push(q.front());\\n                q.pop();\\n            }\\n        }\\n    \\n        void pop() {\\n            q.pop();\\n        }\\n    \\n        int top() {\\n            return q.front();\\n        }\\n    \\n        bool empty() {\\n            return q.empty();\\n        }\\n    };\\n\\n---\\n\\n**Java:** 140 ms\\n\\n    class MyStack {\\n    \\n        private Queue<Integer> queue = new LinkedList<>();\\n    \\n        public void push(int x) {\\n            queue.add(x);\\n            for (int i=1; i<queue.size(); i++)\\n                queue.add(queue.remove());\\n        }\\n    \\n        public void pop() {\\n            queue.remove();\\n        }\\n    \\n        public int top() {\\n            return queue.peek();\\n        }\\n    \\n        public boolean empty() {\\n            return queue.isEmpty();\\n        }\\n    }\\n\\n---\\n\\n**Python:** 36 ms\\n\\n    class Stack:\\n    \\n        def __init__(self):\\n            self._queue = collections.deque()\\n    \\n        def push(self, x):\\n            q = self._queue\\n            q.append(x)\\n            for _ in range(len(q) - 1):\\n                q.append(q.popleft())\\n            \\n        def pop(self):\\n            return self._queue.popleft()\\n    \\n        def top(self):\\n            return self._queue[0]\\n        \\n        def empty(self):\\n            return not len(self._queue)"
		},
		{
			"lc_ans_id":"62522",
			"view":"9838",
			"top":"4",
			"title":"O(1) purely with queues",
			"vote":"32",
			"content":"**Note that I truly only use the allowed queue operations.** While I use `LinkedList`, I'm not using it as such. I only use it because in Java, `Queue` is only an interface and there is no class `Queue` (see [All Known Implementing Classes](https://docs.oracle.com/javase/8/docs/api/java/util/Queue.html)).\\n\\nWhat I do is I that I **simulate** a linked list stack purely with queues. Each queue only has two elements: an integer at the front and another queue at the back (that's where the remaining integers/queues live).\\n\\n**Yes, I know this is silly :-)**  \\nThen again, forbidding to use stacks/vectors/etc is silly to begin with. Also, it's not actually silly if you consider that it's O(1) and thus much *better* than the usual O(n) solutions (and btw I did also write [some of those](https://leetcode.com/discuss/39814/easy-java-c-python)).\\n\\n    class MyStack {\\n    \\n        private Queue queue;\\n    \\n        public void push(int x) {\\n            Queue q = new LinkedList();     // could be any queue type, see note above\\n            q.add(x);\\n            q.add(queue);\\n            queue = q;\\n        }\\n    \\n        public void pop() {\\n            queue.remove();\\n            queue = (Queue) queue.peek();\\n        }\\n    \\n        public int top() {\\n            return (int) queue.peek();\\n        }\\n    \\n        public boolean empty() {\\n            return queue == null;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"62580",
			"view":"3100",
			"top":"5",
			"title":"Accepted clean Java solution",
			"vote":"25",
			"content":"      class MyStack {\\n        Queue<Integer> q = new LinkedList<Integer>();\\n        \\n        // Push element x onto stack.\\n        public void push(int x) {\\n            q.add(x);\\n            \\n            int n = q.size();\\n            while (n-- > 1)\\n                q.add(q.poll());\\n        }\\n    \\n        // Removes the element on top of the stack.\\n        public void pop() {\\n            q.poll();\\n        }\\n    \\n        // Get the top element.\\n        public int top() {\\n            return q.peek();\\n        }\\n    \\n        // Return whether the stack is empty.\\n        public boolean empty() {\\n            return q.isEmpty();\\n        }\\n    \\n      }"
		},
		{
			"lc_ans_id":"62621",
			"view":"4236",
			"top":"6",
			"title":"One Queue Java Solution",
			"vote":"19",
			"content":"    class MyStack {\\n        Queue<Integer> q = new LinkedList<Integer>();\\n        \\n        // Push element x onto stack.\\n        public void push(int x) {\\n            q.add(x);\\n        }\\n    \\n        // Removes the element on top of the stack.\\n        public void pop() {\\n            int size = q.size();\\n            for(int i = 1; i < size; i++)\\n                q.add(q.remove());\\n            q.remove();\\n        }\\n    \\n        // Get the top element.\\n        public int top() {\\n            int size = q.size();\\n            for(int i = 1; i < size; i++)\\n                q.add(q.remove());\\n            int ret = q.remove();\\n            q.add(ret);\\n            return ret;\\n        }\\n    \\n        // Return whether the stack is empty.\\n        public boolean empty() {\\n            return q.isEmpty();        \\n        }\\n    }"
		},
		{
			"lc_ans_id":"62643",
			"view":"1698",
			"top":"7",
			"title":"Accepted 0ms c++ solution with one queue.",
			"vote":"13",
			"content":"    class Stack {\\n    public:\\n        // Push element x onto stack.\\n        void push(int x) {\\n    \\t\\tnums.push(x);\\n        }\\n        // Removes the element on top of the stack.\\n        void pop() {\\n    \\t\\tif (!empty()) {\\n    \\t\\t\\tint len = nums.size();\\n    \\t\\t\\tfor (int i = 0; i != len - 1; ++i) {\\n    \\t\\t\\t\\tnums.push(nums.front());\\n    \\t\\t\\t\\tnums.pop();\\n    \\t\\t\\t}\\n    \\t\\t\\tnums.pop();\\n    \\t\\t}\\n        }\\n        // Get the top element.\\n        int top() {\\n    \\t\\treturn nums.back();\\n        }\\n        // Return whether the stack is empty.\\n        bool empty() {\\n    \\t\\treturn nums.empty();\\n        }\\n    private:\\n    \\tstd::queue<int> nums;\\n    };\\n\\nThanks for StefanPochmann to remind me that `back()` is forbidden, so the right solution should be:\\n\\n    class Stack {\\n    public:\\n        // Push element x onto stack.\\n        void push(int x) {\\n    \\t\\tint len = nums.size();\\n    \\t\\tnums.push(x);\\n    \\t\\tfor (int i = 0; i != len; ++i) {\\n    \\t\\t\\tnums.push(nums.front());\\n    \\t\\t\\tnums.pop();\\n    \\t\\t}\\n        }\\n        // Removes the element on top of the stack.\\n        void pop() {\\n    \\t\\tnums.pop();\\n        }\\n        // Get the top element.\\n        int top() {\\n    \\t\\treturn nums.front();\\n        }\\n        // Return whether the stack is empty.\\n        bool empty() {\\n    \\t\\treturn nums.empty();\\n        }\\n    private:\\n    \\tstd::queue<int> nums;\\n    };"
		},
		{
			"lc_ans_id":"62555",
			"view":"2506",
			"top":"8",
			"title":"Is there a faster solution?",
			"vote":"12",
			"content":"I found that almost all solutions are either push time complexity is O(n) every time, or pop time complexity is  O(n) every time.\\n\\nI wunder is there a faster solution that requires less time complexity in average?"
		},
		{
			"lc_ans_id":"62529",
			"view":"2746",
			"top":"9",
			"title":"Java Line 26: error: cannot find symbol: method top() why?",
			"vote":"8",
			"content":"y\\nclass Stack {\\n\\n    Queue<Integer> queue1 = new LinkedList<Integer>();\\n    Queue<Integer> queue2 = new LinkedList<Integer>();\\n\\n    // Push element x onto stack.\\n    public void push(int x) {\\n        while (!queue1.isEmpty()) {\\n            int num = queue1.poll();\\n            queue2.add(num);\\n        }\\n        queue1.add(x);\\n    }\\n\\n    // Removes the element on top of the stack.\\n    public void pop() {\\n        if (!queue1.isEmpty()) {\\n            queue1.poll();\\n            return;\\n        }\\n        while (queue2.size() != 1) {\\n            int num = queue2.poll();\\n            queue1.add(num);\\n        }\\n        queue2.poll();\\n    }\\n    \\n    // Get the top element.\\n    public int top() {\\n        if (!queue1.isEmpty()) {\\n            return queue1.peek();\\n        }\\n        while (queue2.size() != 1) {\\n            int num = queue2.poll();\\n            queue1.add(num);\\n        }\\n        int num = queue2.poll();\\n        queue1.add(num);\\n        return num;\\n    }\\n\\n    // Return whether the stack is empty.\\n    public boolean empty() {\\n        return queue1.isEmpty() && queue2.isEmpty();\\n    }\\n}"
		}
	],
	"id":"225",
	"title":"Implement Stack using Queues",
	"content":"<p>\r\nImplement the following operations of a stack using queues.\r\n<ul>\r\n<li>\r\npush(x) -- Push element x onto stack.\r\n</li>\r\n<li>\r\npop() -- Removes the element on top of the stack.\r\n</li>\r\n<li>\r\ntop() -- Get the top element.\r\n</li>\r\n<li>\r\nempty() -- Return whether the stack is empty.\r\n</li>\r\n</ul>\r\n<b>Notes:</b><br>\r\n<ul>\r\n<li>You must use <i>only</i> standard operations of a queue -- which means only <code>push to back</code>, <code>peek/pop from front</code>, <code>size</code>, and <code>is empty</code> operations are valid.</li>\r\n<li>Depending on your language, queue may not be supported natively. You may simulate a queue by using a list or deque (double-ended queue), as long as you use only standard operations of a queue.</li>\r\n<li>You may assume that all operations are valid (for example, no pop or top operations will be called on an empty stack).</li>\r\n</ul>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and all test cases.</p>",
	"frequency":"297",
	"ac_num":"87357"
}