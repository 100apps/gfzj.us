{
	"difficulty":"3",
	"submit_num":"7291",
	"show_id":"716",
	"leetcode_id":"716",
	"answers":[
		{
			"lc_ans_id":"108933",
			"view":"1542",
			"top":"0",
			"title":"O(1) isn't possible",
			"vote":"9",
			"content":"Because if it were, you could use this data structure to sort an array of numbers in O(n) time.\\n\\nSo, at the very least, either push(x) or popMax() must be O(logn)"
		},
		{
			"lc_ans_id":"108938",
			"view":"838",
			"top":"1",
			"title":"Java AC solution",
			"vote":"8",
			"content":"```\\nclass MaxStack {\\n    Stack<Integer> stack;\\n    Stack<Integer> maxStack;\\n    /** initialize your data structure here. */\\n    public MaxStack() {\\n        stack = new Stack<>();\\n        maxStack = new Stack<>();\\n    }\\n    \\n    public void push(int x) {\\n        pushHelper(x);\\n    }\\n    \\n    public void pushHelper(int x) {\\n        int tempMax = maxStack.isEmpty() ? Integer.MIN_VALUE : maxStack.peek();\\n        if (x > tempMax) {\\n            tempMax = x;\\n        }\\n        stack.push(x);\\n        maxStack.push(tempMax);\\n    }\\n    \\n    public int pop() {\\n        maxStack.pop();\\n        return stack.pop();\\n    }\\n    \\n    public int top() {\\n        return stack.peek();\\n    }\\n    \\n    public int peekMax() {\\n        return maxStack.peek();\\n    }\\n    \\n    public int popMax() {\\n        int max = maxStack.peek();\\n        Stack<Integer> temp = new Stack<>();\\n        \\n        while (stack.peek() != max) {\\n            temp.push(stack.pop());\\n            maxStack.pop();\\n        }\\n        stack.pop();\\n        maxStack.pop();\\n        while (!temp.isEmpty()) {\\n            int x = temp.pop();\\n            pushHelper(x);\\n        }\\n        return max;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108931",
			"view":"117",
			"top":"2",
			"title":"Python O(logN) with stack + heap and lazy removal",
			"vote":"3",
			"content":"A regular stack already supports the first 3 operations and max heap can take care of the last two. But the main issue is when popping an element form  the top of one data structure how can we efficiently remove that element from the other. We can use lazy removal (similar to [Approach #2](https://leetcode.com/articles/sliding-window-median/#approach-2-two-heaps-lazy-removal-accepted) from [480. Sliding Window Median](https://leetcode.com/problems/sliding-window-median/)) to achieve this is in average O(log N) time.\\n```\\nclass MaxStack(object):\\n\\n    def __init__(self):\\n        \"\"\"\\n        initialize your data structure here.\\n        \"\"\"\\n        self.stack = []\\n        self.maxHeap = []\\n        self.toPop_heap = {} #to keep track of things to remove from the heap\\n        self.toPop_stack = set() #to keep track of things to remove from the stack\\n\\n    def push(self, x):\\n        \"\"\"\\n        :type x: int\\n        :rtype: void\\n        \"\"\"\\n        heapq.heappush(self.maxHeap, (-x,-len(self.stack)))\\n        self.stack.append(x)\\n        \\n    def pop(self):\\n        \"\"\"\\n        :rtype: int\\n        \"\"\"             \\n        self.top()\\n        x = self.stack.pop()\\n        key = (-x,-len(self.stack))\\n        self.toPop_heap[key] = self.toPop_heap.get(key,0) + 1\\n        return x\\n\\n    def top(self):\\n        \"\"\"\\n        :rtype: int\\n        \"\"\"\\n        while self.stack and len(self.stack)-1 in self.toPop_stack:\\n            x = self.stack.pop()\\n            self.toPop_stack.remove(len(self.stack))\\n        return self.stack[-1]\\n        \\n    def peekMax(self):\\n        \"\"\"\\n        :rtype: int\\n        \"\"\"\\n        while self.maxHeap and self.toPop_heap.get(self.maxHeap[0],0):\\n            x = heapq.heappop(self.maxHeap)\\n            self.toPop_heap[x] -= 1\\n        return -self.maxHeap[0][0]\\n\\n    def popMax(self):\\n        \"\"\"\\n        :rtype: int\\n        \"\"\"\\n        self.peekMax()\\n        x,idx = heapq.heappop(self.maxHeap)\\n        x,idx = -x,-idx\\n        self.toPop_stack.add(idx)\\n        return x\\n```"
		},
		{
			"lc_ans_id":"108928",
			"view":"604",
			"top":"3",
			"title":"Java accepted with one stack and one pq",
			"vote":"3",
			"content":"The code is very clear and short\\nUsing pq to get max while using stack to store data\\n\\n\\nclass MaxStack {\\n    \\n    Stack<Integer> s;\\n    PriorityQueue<Integer> pq;\\n    /** initialize your data structure here. */\\n    public MaxStack() {\\n        s = new Stack<Integer>();\\n        pq = new PriorityQueue<Integer>(10000, Collections.reverseOrder());\\n    }\\n    \\n    public void push(int x) {\\n        s.push(x);\\n        pq.offer(x);\\n    }\\n    \\n    public int pop() {\\n        int pop = s.pop();\\n        pq.remove(pop);\\n        return pop;\\n    }\\n    \\n    public int top() {\\n        return s.peek();\\n    }\\n    \\n    public int peekMax() {\\n        return pq.peek();\\n    }\\n    \\n    public int popMax() {\\n        int max = pq.poll();\\n        Stack<Integer> sp = new Stack<Integer>();\\n        while (!s.isEmpty()) {\\n            if (s.peek() != max) {\\n                sp.push(s.pop());\\n            } else {\\n                s.pop();\\n                break;\\n            }\\n        }\\n        while (!sp.isEmpty()) {\\n            s.push(sp.pop());\\n        }\\n        return max;\\n    }\\n}"
		},
		{
			"lc_ans_id":"108941",
			"view":"841",
			"top":"4",
			"title":"C++ using Two Stack",
			"vote":"3",
			"content":"The difference between max stack and min stack is the `popMax()` function. When we pop element, we just have to check whether the tops of `maxStk` and `stk` are the same or not. It costs O(1) time in this operation.\\n\\nHowever, in the case of `popMax()`, the top of `maxStk` may not be the same as the top of `stk`. Therefore, the idea here is to use `tmp` stack to store the element of `stk` until we find the max element, remove it. Then, we put the elements in `tmp` back to `stk` and `maxStk`. It costs `O(n)` in worst case.  \\n\\n```c++\\nclass MaxStack {\\npublic:\\n    /** initialize your data structure here. */\\n    MaxStack() {\\n        \\n    }\\n    \\n    void push(int x) {  \\n        addMax(x);\\n        stk.push(x);\\n    }\\n    \\n    int pop() {\\n        int val = stk.top();\\n        if (stk.top() == maxStk.top()) {\\n            maxStk.pop();\\n        }\\n        stk.pop();\\n        return val;\\n    }\\n    \\n    int top() {\\n        return stk.top();\\n    }\\n    \\n    int peekMax() {\\n        return maxStk.top();\\n    }\\n    \\n    int popMax() {\\n        int val = maxStk.top();\\n        stack<int> tmp;\\n        \\n        while (maxStk.top() != stk.top()) {\\n            tmp.push(stk.top());\\n            stk.pop();\\n        } // maxStk.top() == stk.top()\\n        \\n        maxStk.pop();\\n        stk.pop();\\n        \\n        while (!tmp.empty()) {\\n            stk.push(tmp.top());\\n            addMax(tmp.top());\\n            tmp.pop();\\n        }\\n        \\n        return val;\\n    }\\n    \\nprivate:\\n    void addMax(int x) {\\n        if (maxStk.empty() || x >= maxStk.top()) {\\n            maxStk.push(x);\\n        }\\n    }\\n    \\n    stack<int> maxStk;\\n    stack<int> stk;\\n};\\n```"
		},
		{
			"lc_ans_id":"108947",
			"view":"60",
			"top":"5",
			"title":"Java TreeMap and Double LinkedList",
			"vote":"1",
			"content":"```\\nclass MaxStack {\\n\\n    Node head;\\n    Node tail;\\n    TreeMap<Integer, List<Node>> map;\\n    \\n    public MaxStack() {\\n        head = new Node(0);\\n        tail = new Node(0);\\n        head.next = tail;\\n        tail.pre = head;\\n        map = new TreeMap<>();\\n    }\\n    \\n    public void push(int x) {\\n        Node newNode = new Node(x);\\n        newNode.pre = tail.pre;\\n        newNode.next = tail;\\n        tail.pre.next = newNode;\\n        tail.pre = newNode;\\n        if(!map.containsKey(x))    map.put(x, new ArrayList<Node>());\\n        map.get(x).add(newNode);\\n    }\\n    \\n    public int pop() {\\n        int value = tail.pre.val;\\n        removeNode(tail.pre);\\n        int listSize = map.get(value).size();\\n        map.get(value).remove(listSize - 1);\\n        if(listSize == 1)    map.remove(value);\\n        return value;\\n    }\\n    \\n    public int top() {\\n        return tail.pre.val;\\n    }\\n    \\n    public int peekMax() {\\n        return map.lastKey();\\n    }\\n    \\n    public int popMax() {\\n        int maxVal = map.lastKey();\\n        int listSize = map.get(maxVal).size();\\n        Node node = map.get(maxVal).remove(listSize - 1);\\n        removeNode(node);\\n        if(listSize == 1)    map.remove(maxVal);\\n        return maxVal;\\n    }\\n    \\n    private void removeNode(Node n){\\n        Node preNode = n.pre;\\n        Node nextNode = n.next;\\n        preNode.next = nextNode;\\n        nextNode.pre = preNode;\\n    }\\n    \\n    class Node{\\n        Node pre;\\n        Node next;\\n        int val;\\n        public Node(int x){\\n            this.val = x;\\n            this.pre = null;\\n            this.next = null;\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108957",
			"view":"203",
			"top":"6",
			"title":"If LRU Cache is \"Hard\", so is this",
			"vote":"1",
			"content":"This question is roughly on the same level as LRU Cache in terms of difficulty, so why is this one \"Easy\" and LRU Cache \"Hard\"?\\n\\nIt's easier to get a solution accepted by writing sub-optimal O(n) solutions I guess, but just because the wrong answer is easy doesn't mean the question is easy. This question is very complicated with a lot of different possibilities and time/space trade-offs.\\n\\nHarder than LRU Cache imo."
		},
		{
			"lc_ans_id":"108937",
			"view":"218",
			"top":"7",
			"title":"C++ solution with 2 stacks, just like minStack",
			"vote":"1",
			"content":"O(n) for popMax and O(1) for the rest\\n```\\n    int mx=INT_MIN;\\n    stack<int> stk;\\n    MaxStack() {\\n        \\n    }\\n    \\n    void push(int x) {\\n        if(stk.empty()) {\\n            mx=x;\\n            stk.push(0);\\n        }\\n        else {\\n            stk.push(x-mx);\\n            mx=max(mx, x);\\n        }\\n    }\\n    \\n    int pop() {\\n        if(stk.top()>=0) mx-=stk.top();\\n        int res=stk.top();\\n        stk.pop();\\n        return res+mx;\\n    }\\n    \\n    int top() {\\n        if(stk.top()>=0) return mx;\\n        return stk.top()+mx;\\n    }\\n    \\n    int peekMax() {\\n        return mx;\\n    }\\n    \\n    int popMax() {\\n        int tm=mx;\\n        stack<int> temp; \\n        while(stk.top()<0) {\\n            temp.push(stk.top());\\n            stk.pop();\\n        }\\n        mx-=stk.top();\\n        stk.pop(); \\n        while(!temp.empty()) {\\n            push(tm+temp.top());\\n            temp.pop();\\n        }\\n        return tm;\\n    }"
		},
		{
			"lc_ans_id":"108963",
			"view":"128",
			"top":"8",
			"title":"C++: Using double linked list for the stack",
			"vote":"1",
			"content":"\\n\\n\\nDouble linked list allows for O(1) element removal, which helps with popMax\\n\\n```\\nclass MaxStack {\\nprivate:\\n    list<int> st;    \\n    using Iter = list<int>::iterator;\\n    map<int, stack<Iter>> m;\\n    \\npublic:\\n    /** initialize your data structure here. */\\n    MaxStack() {        \\n    }\\n    \\n    void push(int x) {\\n        st.push_back(x);\\n        m[x].push(prev(st.end()));\\n    }\\n    \\n    int pop() {\\n        int x = st.back();\\n        st.pop_back();\\n        \\n        auto f = m.find(x);\\n        f->second.pop();\\n        if (f->second.empty())\\n            m.erase(f);\\n        \\n        return x;\\n    }\\n    \\n    int top() {\\n        int x = st.back();\\n        return x;\\n    }\\n    \\n    int peekMax() {\\n        return m.rbegin()->first;\\n    }\\n    \\n    int popMax() {\\n        auto top = prev(m.end());\\n        int x = top->first;        \\n        \\n        auto& stNode = top->second;\\n        list<int>::iterator del = stNode.top();\\n        stNode.pop();\\n        if (stNode.empty()) {\\n            m.erase(top);\\n        }\\n        \\n        st.erase(del);        \\n        return x;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108929",
			"view":"17",
			"top":"9",
			"title":"clean python solution",
			"vote":"0",
			"content":"````\\nfrom heapq import heappush, heappop\\nTS = float('-inf')\\nclass MaxStack:\\n\\n    def __init__(self):\\n        \"\"\"\\n        initialize your data structure here.\\n        \"\"\"\\n        self.stack = []\\n        self.pq = []\\n\\n    def push(self, x):\\n        \"\"\"\\n        :type x: int\\n        :rtype: void\\n        \"\"\"\\n        stack, pq = self.stack, self.pq\\n        entry = [-x, -len(stack)]\\n        heappush(pq, entry)\\n        stack.append(entry)\\n\\n    def pop(self):\\n        \"\"\"\\n        :rtype: int\\n        \"\"\"\\n        stack, pq = self.stack, self.pq\\n        rm_tombstones(stack, pq)\\n        entry = stack.pop()\\n        entry[1] = TS\\n        return -entry[0]\\n\\n    def top(self):\\n        \"\"\"\\n        :rtype: int\\n        \"\"\"\\n        stack, pq = self.stack, self.pq\\n        rm_tombstones(stack, pq)\\n        return -stack[-1][0]\\n\\n    def peekMax(self):\\n        \"\"\"\\n        :rtype: int\\n        \"\"\"\\n        stack, pq = self.stack, self.pq\\n        rm_tombstones(stack, pq)\\n        return -pq[0][0]\\n\\n    def popMax(self):\\n        \"\"\"\\n        :rtype: int\\n        \"\"\"\\n        stack, pq = self.stack, self.pq\\n        rm_tombstones(stack, pq)\\n        entry = heappop(pq)\\n        entry[1] = TS\\n        return -entry[0]\\n\\ndef rm_tombstones(stack, pq):\\n    while stack[-1][1] == TS:\\n        stack.pop()\\n    while pq[0][1] == TS:\\n        heappop(pq)        \\n    \\n# Your MaxStack object will be instantiated and called as such:\\n# obj = MaxStack()\\n# obj.push(x)\\n# param_2 = obj.pop()\\n# param_3 = obj.top()\\n# param_4 = obj.peekMax()\\n# param_5 = obj.popMax()\\n````"
		}
	],
	"id":"682",
	"title":"Max Stack",
	"content":"<p>Design a max stack that supports push, pop, top, peekMax and popMax.</p>\r\n\r\n<p>\r\n<ol>\r\n<li>push(x) -- Push element x onto stack.</li>\r\n<li>pop() -- Remove the element on top of the stack and return it.</li>\r\n<li>top() -- Get the element on the top.</li>\r\n<li>peekMax() -- Retrieve the maximum element in the stack.</li>\r\n<li>popMax() -- Retrieve the maximum element in the stack, and remove it. If you find more than one maximum elements, only remove the top-most one.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\nMaxStack stack = new MaxStack();\r\nstack.push(5); \r\nstack.push(1);\r\nstack.push(5);\r\nstack.top(); -> 5\r\nstack.popMax(); -> 5\r\nstack.top(); -> 1\r\nstack.peekMax(); -> 5\r\nstack.pop(); -> 1\r\nstack.top(); -> 5\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>-1e7 <= x <= 1e7</li>\r\n<li>Number of operations won't exceed 10000.</li>\r\n<li>The last four operations won't be called when stack is empty.</li>\r\n</ol>\r\n</p>",
	"frequency":"123",
	"ac_num":"2717"
}