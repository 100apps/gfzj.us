{
	"difficulty":"1",
	"submit_num":"552620",
	"show_id":"155",
	"leetcode_id":"155",
	"answers":[
		{
			"lc_ans_id":"49031",
			"view":"65299",
			"top":"0",
			"title":"Share my Java solution with ONLY ONE stack",
			"vote":"372",
			"content":"The question is ask to construct One stack. So I am using one stack.\\n\\nThe idea is to store the gap between the min value and the current value; \\n\\nThe problem for my solution is the cast. I have no idea to avoid the cast. Since the possible gap between the current value and the min value could be Integer.MAX_VALUE-Integer.MIN_VALUE;\\n\\n\\n\\n\\n\\n    public class MinStack {\\n        long min;\\n        Stack<Long> stack;\\n    \\n        public MinStack(){\\n            stack=new Stack<>();\\n        }\\n        \\n        public void push(int x) {\\n            if (stack.isEmpty()){\\n                stack.push(0L);\\n                min=x;\\n            }else{\\n                stack.push(x-min);//Could be negative if min value needs to change\\n                if (x<min) min=x;\\n            }\\n        }\\n    \\n        public void pop() {\\n            if (stack.isEmpty()) return;\\n            \\n            long pop=stack.pop();\\n            \\n            if (pop<0)  min=min-pop;//If negative, increase the min value\\n            \\n        }\\n    \\n        public int top() {\\n            long top=stack.peek();\\n            if (top>0){\\n                return (int)(top+min);\\n            }else{\\n               return (int)(min);\\n            }\\n        }\\n    \\n        public int getMin() {\\n            return (int)min;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"49014",
			"view":"34423",
			"top":"1",
			"title":"Java accepted solution using one stack",
			"vote":"268",
			"content":"````\\nclass MinStack {\\n    int min = Integer.MAX_VALUE;\\n    Stack<Integer> stack = new Stack<Integer>();\\n    public void push(int x) {\\n        // only push the old minimum value when the current \\n        // minimum value changes after pushing the new value x\\n        if(x <= min){          \\n            stack.push(min);\\n            min=x;\\n        }\\n        stack.push(x);\\n    }\\n\\n    public void pop() {\\n        // if pop operation could result in the changing of the current minimum value, \\n        // pop twice and change the current minimum value to the last minimum value.\\n        if(stack.pop() == min) min=stack.pop();\\n    }\\n\\n    public int top() {\\n        return stack.peek();\\n    }\\n\\n    public int getMin() {\\n        return min;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"49016",
			"view":"20060",
			"top":"2",
			"title":"C++ using two stacks, quite short and easy to understand",
			"vote":"107",
			"content":"    class MinStack {\\n    private:\\n\\t    stack<int> s1;\\n\\t    stack<int> s2;\\n    public:\\n\\t    void push(int x) {\\n\\t\\t    s1.push(x);\\n\\t\\t    if (s2.empty() || x <= getMin())  s2.push(x);\\t    \\n        }\\n        void pop() {\\n\\t\\t    if (s1.top() == getMin())  s2.pop();\\n\\t\\t    s1.pop();\\n\\t    }\\n        int top() {\\n\\t\\t    return s1.top();\\n\\t    }\\n        int getMin() {\\n\\t\\t    return s2.top();\\n\\t    }\\n    };"
		},
		{
			"lc_ans_id":"49010",
			"view":"15951",
			"top":"3",
			"title":"Clean 6ms Java solution",
			"vote":"91",
			"content":"    class MinStack {\\n        private Node head;\\n        \\n        public void push(int x) {\\n            if(head == null) \\n                head = new Node(x, x);\\n            else \\n                head = new Node(x, Math.min(x, head.min), head);\\n        }\\n    \\n        public void pop() {\\n            head = head.next;\\n        }\\n    \\n        public int top() {\\n            return head.val;\\n        }\\n    \\n        public int getMin() {\\n            return head.min;\\n        }\\n        \\n        private class Node {\\n            int val;\\n            int min;\\n            Node next;\\n            \\n            private Node(int val, int min) {\\n                this(val, min, null);\\n            }\\n            \\n            private Node(int val, int min, Node next) {\\n                this.val = val;\\n                this.min = min;\\n                this.next = next;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"49022",
			"view":"12352",
			"top":"4",
			"title":"My Python solution",
			"vote":"73",
			"content":"    class MinStack:\\n    \\n    def __init__(self):\\n        self.q = []\\n\\n    # @param x, an integer\\n    # @return an integer\\n    def push(self, x):\\n        curMin = self.getMin()\\n        if curMin == None or x < curMin:\\n            curMin = x\\n        self.q.append((x, curMin));\\n\\n    # @return nothing\\n    def pop(self):\\n        self.q.pop()\\n\\n\\n    # @return an integer\\n    def top(self):\\n        if len(self.q) == 0:\\n            return None\\n        else:\\n            return self.q[len(self.q) - 1][0]\\n\\n\\n    # @return an integer\\n    def getMin(self):\\n        if len(self.q) == 0:\\n            return None\\n        else:\\n            return self.q[len(self.q) - 1][1]"
		},
		{
			"lc_ans_id":"49078",
			"view":"9203",
			"top":"5",
			"title":"Simple Java solution 12 line",
			"vote":"51",
			"content":"class MinStack {\\n\\n    Stack<Integer> stack=new Stack<>();\\n    int min=Integer.MAX_VALUE;\\n    public void push(int x) {\\n        if(x<=min) {stack.push(min); min=x;}\\n        stack.push(x);\\n    }\\n    public void pop() {\\n        if(stack.peek()==min){ stack.pop(); min=stack.pop(); }\\n        else stack.pop();\\n    }\\n    public int top() {\\n        return stack.peek();\\n    }\\n    public int getMin() {\\n        return min;\\n    }\\n}"
		},
		{
			"lc_ans_id":"49163",
			"view":"4833",
			"top":"6",
			"title":"Please make the question more concrete.",
			"vote":"46",
			"content":"For example,\\n\\ngetMin(), top(),  pop() when the stack is empty, what shall we do? return -1? return INT_MIN?"
		},
		{
			"lc_ans_id":"49181",
			"view":"4133",
			"top":"7",
			"title":"Java solution (accepted)",
			"vote":"26",
			"content":"    private Stack<Integer> mStack = new Stack<Integer>();\\n\\tprivate Stack<Integer> mMinStack = new Stack<Integer>();\\n\\t\\n\\tpublic void push(int x) {\\n\\t\\tmStack.push(x);\\n\\t\\tif (mMinStack.size() != 0) {\\n\\t\\t\\tint min = mMinStack.peek();\\n\\t\\t\\tif (x <= min) {\\n\\t\\t\\t\\tmMinStack.push(x);\\n\\t\\t\\t}\\n\\t\\t} else {\\n\\t\\t\\tmMinStack.push(x);\\n\\t\\t}\\n    }\\n\\n    public void pop() {\\n    \\tint x = mStack.pop();\\n\\t\\tif (mMinStack.size() != 0) {\\n\\t\\t\\tif (x == mMinStack.peek()) {\\n\\t\\t\\t\\tmMinStack.pop();\\n\\t\\t\\t}\\n\\t\\t}\\n    }\\n\\n    public int top() {\\n    \\treturn mStack.peek();\\n    }\\n\\n    public int getMin() {\\n        return mMinStack.peek();\\n    }"
		},
		{
			"lc_ans_id":"49062",
			"view":"4320",
			"top":"8",
			"title":"C++ O(1) solution",
			"vote":"24",
			"content":"    class MinStack {\\n    public:\\n        vector<int> a;\\n        vector<int> min;\\n        MinStack() {\\n            min.push_back(2147483647);\\n        }\\n        void push(int x) {\\n            a.push_back(x);\\n            if (x < min.back()) {\\n                min.push_back(x);\\n            } else {\\n                min.push_back(min.back());\\n            }\\n        }\\n    \\n        void pop() {\\n            a.pop_back();\\n            min.pop_back();\\n        }\\n    \\n        int top() {\\n            return a.back();\\n        }\\n    \\n        int getMin() {\\n            return min.back();\\n        }\\n    };"
		},
		{
			"lc_ans_id":"49217",
			"view":"2052",
			"top":"9",
			"title":"6ms Java Solution using Linked List. Clean, self-explanatory and efficient.",
			"vote":"24",
			"content":"    class MinStack {\\n        class Node{\\n            int value;\\n            int min;\\n            Node next;\\n            \\n            Node(int x, int min){\\n                this.value=x;\\n                this.min=min;\\n                next = null;\\n            }\\n        }\\n        Node head;\\n        public void push(int x) {\\n            if(null==head){\\n                head = new Node(x,x);\\n            }else{\\n                Node n = new Node(x, Math.min(x,head.min));\\n                n.next=head;\\n                head=n;\\n            }\\n        }\\n    \\n        public void pop() {\\n            if(head!=null)\\n                head =head.next;\\n        }\\n    \\n        public int top() {\\n            if(head!=null)\\n                return head.value;\\n            return -1;\\n        }\\n    \\n        public int getMin() {\\n            if(null!=head)\\n                return head.min;\\n            return -1;\\n        }\\n    }"
		}
	],
	"id":"155",
	"title":"Min Stack",
	"content":"<p>\r\nDesign a stack that supports push, pop, top, and retrieving the minimum element in constant time.\r\n<ul>\r\n<li>\r\npush(x) -- Push element x onto stack.\r\n</li>\r\n<li>\r\npop() -- Removes the element on top of the stack.\r\n</li>\r\n<li>\r\ntop() -- Get the top element.\r\n</li>\r\n<li>\r\ngetMin() -- Retrieve the minimum element in the stack.\r\n</li>\r\n</ul>\r\n</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\nMinStack minStack = new MinStack();\r\nminStack.push(-2);\r\nminStack.push(0);\r\nminStack.push(-3);\r\nminStack.getMin();   --> Returns -3.\r\nminStack.pop();\r\nminStack.top();      --> Returns 0.\r\nminStack.getMin();   --> Returns -2.\r\n</pre>\r\n</p>",
	"frequency":"594",
	"ac_num":"168068"
}