{
	"difficulty":"1",
	"submit_num":"262245",
	"show_id":"232",
	"leetcode_id":"232",
	"answers":[
		{
			"lc_ans_id":"64206",
			"view":"29438",
			"top":"0",
			"title":"Short O(1) amortized, C++ / Java / Ruby",
			"vote":"251",
			"content":"I have one input stack, onto which I push the incoming elements, and one output stack, from which I peek/pop. I move elements from input stack to output stack when needed, i.e., when I need to peek/pop but the output stack is empty. When that happens, I move all elements from input to output stack, thereby reversing the order so it's the correct order for peek/pop.\\n\\nThe loop in `peek` does the moving from input to output stack. Each element only ever gets moved like that once, though, and only after we already spent time pushing it, so the overall amortized cost for each operation is O(1).\\n\\n**Ruby**\\n\\n    class Queue\\n        def initialize\\n            @in, @out = [], []\\n        end\\n    \\n        def push(x)\\n            @in << x\\n        end\\n    \\n        def pop\\n            peek\\n            @out.pop\\n        end\\n    \\n        def peek\\n            @out << @in.pop until @in.empty? if @out.empty?\\n            @out.last\\n        end\\n    \\n        def empty\\n            @in.empty? && @out.empty?\\n        end\\n    end\\n\\n**Java**\\n\\n    class MyQueue {\\n    \\n        Stack<Integer> input = new Stack();\\n        Stack<Integer> output = new Stack();\\n        \\n        public void push(int x) {\\n            input.push(x);\\n        }\\n    \\n        public void pop() {\\n            peek();\\n            output.pop();\\n        }\\n    \\n        public int peek() {\\n            if (output.empty())\\n                while (!input.empty())\\n                    output.push(input.pop());\\n            return output.peek();\\n        }\\n    \\n        public boolean empty() {\\n            return input.empty() && output.empty();\\n        }\\n    }\\n\\n**C++**\\n\\n    class Queue {\\n        stack<int> input, output;\\n    public:\\n    \\n        void push(int x) {\\n            input.push(x);\\n        }\\n    \\n        void pop(void) {\\n            peek();\\n            output.pop();\\n        }\\n    \\n        int peek(void) {\\n            if (output.empty())\\n                while (input.size())\\n                    output.push(input.top()), input.pop();\\n            return output.top();\\n        }\\n    \\n        bool empty(void) {\\n            return input.empty() && output.empty();\\n        }\\n    };"
		},
		{
			"lc_ans_id":"64197",
			"view":"12267",
			"top":"1",
			"title":"Easy Java solution, just edit push() method",
			"vote":"36",
			"content":"    class MyQueue {\\n    Stack<Integer> queue = new Stack<Integer>();\\n    // Push element x to the back of queue.\\n    public void push(int x) {\\n        Stack<Integer> temp = new Stack<Integer>();\\n        while(!queue.empty()){\\n            temp.push(queue.pop());\\n        }\\n        queue.push(x);\\n        while(!temp.empty()){\\n            queue.push(temp.pop());\\n        }\\n    }\\n\\n    // Removes the element from in front of queue.\\n    public void pop() {\\n        queue.pop();\\n    }\\n\\n    // Get the front element.\\n    public int peek() {\\n        return queue.peek();\\n    }\\n\\n    // Return whether the queue is empty.\\n    public boolean empty() {\\n        return queue.empty();\\n    }\\n}"
		},
		{
			"lc_ans_id":"64196",
			"view":"4600",
			"top":"2",
			"title":"0 ms C++ solution using one Stack w/ explanation.",
			"vote":"17",
			"content":"You can implement queue using just one stack by either making push process costlier or pop costlier. Since we have two functions (`top()` and `pop()`) which require the top element of the stack, well make the push() function costlier - that is, for pushing a new element, we recursively pop the stack till it is empty and push it at the bottom of the stack, and take advantage of the recursive call to push back in the popped elements once the recursive call hits the base condition and returns. This implementation makes `pop()` and `peek()` functions easier. `pop()` is just going to pop off the top element in stack and `peek()` will return the top most element.\\n\\n    class Queue {\\n    public:\\n        stack<int> s;\\n        \\n        // Push element x to the back of queue.\\n        void push(int x) {\\n            pushHelper(x);\\n        }\\n        void pushHelper(int x){\\n            if(s.size()==0){\\n                s.push(x);\\n                return;\\n            }\\n            int data;\\n            data = s.top();\\n            s.pop();\\n            pushHelper(x);\\n            s.push(data);\\n            return;\\n            \\n        }\\n    \\n        // Removes the element from in front of queue.\\n        void pop(void) {\\n            s.pop();\\n        }\\n    \\n        // Get the front element.\\n        int peek(void) {\\n            return s.top();\\n        }\\n    \\n        // Return whether the queue is empty.\\n        bool empty(void) {\\n            return (s.size()==0);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"64198",
			"view":"5226",
			"top":"3",
			"title":"Share my python solution (32ms)",
			"vote":"15",
			"content":"The idea is to simulate a queue using two stacks (same as previous posts). I use python list as the underlying data structure for stack and add a \"move()\" method to simplify code: it moves all elements of the \"inStack\" to the \"outStack\" when the \"outStack\" is empty. Here is the code\\n\\n\\n    class Queue(object):\\n        def __init__(self):\\n            \"\"\"\\n            initialize your data structure here.\\n            \"\"\"\\n            self.inStack, self.outStack = [], []\\n    \\n        def push(self, x):\\n            \"\"\"\\n            :type x: int\\n            :rtype: nothing\\n            \"\"\"\\n            self.inStack.append(x)\\n    \\n        def pop(self):\\n            \"\"\"\\n            :rtype: nothing\\n            \"\"\"\\n            self.move()\\n            self.outStack.pop()\\n    \\n        def peek(self):\\n            \"\"\"\\n            :rtype: int\\n            \"\"\"\\n            self.move()\\n            return self.outStack[-1]\\n    \\n        def empty(self):\\n            \"\"\"\\n            :rtype: bool\\n            \"\"\"\\n            return (not self.inStack) and (not self.outStack) \\n            \\n        def move(self):\\n            \"\"\"\\n            :rtype nothing\\n            \"\"\"\\n            if not self.outStack:\\n                while self.inStack:\\n                    self.outStack.append(self.inStack.pop())"
		},
		{
			"lc_ans_id":"64250",
			"view":"3226",
			"top":"4",
			"title":"Accepted 0ms c++ solution with two std::stack, easy understand.",
			"vote":"12",
			"content":"    class Queue {\\n    public:\\n        // Push element x to the back of queue.\\n        void push(int x) {\\n    \\t\\twhile (!nums.empty()) {\\n    \\t\\t\\thelper.push(nums.top());\\n    \\t\\t\\tnums.pop();\\n    \\t\\t}\\n    \\t\\tnums.push(x);\\n    \\t\\twhile (!helper.empty()) {\\n    \\t\\t\\tnums.push(helper.top());\\n    \\t\\t\\thelper.pop();\\n    \\t\\t}\\n        }\\n        // Removes the element from in front of queue.\\n        void pop(void) {\\n            nums.pop();\\n        }\\n        // Get the front element.\\n        int peek(void) {\\n            return nums.top();\\n        }\\n        // Return whether the queue is empty.\\n        bool empty(void) {\\n    \\t\\treturn nums.empty();\\n        }\\n    private:\\n    \\tstd::stack<int> helper, nums;\\n    };"
		},
		{
			"lc_ans_id":"64284",
			"view":"787",
			"top":"5",
			"title":"Do you know when we should use two stacks to implement a queue?",
			"vote":"9",
			"content":"I was asked in the internship interview of a company two years ago.\\n\\nThe application for this implementation is to separate read & write of a queue in multi-processing. One of the stack is for read, and another is for write. They only interfere each other when the former one is full or latter is empty.\\n\\nThis is not only a trick. :)"
		},
		{
			"lc_ans_id":"64331",
			"view":"1855",
			"top":"6",
			"title":"Java solution using two stacks",
			"vote":"9",
			"content":"    class MyQueue {\\n        Stack<Integer> pushStack = new Stack<>();\\n        Stack<Integer> popStack = new Stack<>();\\n    \\n        // Push element x to the back of queue.\\n        public void push(int x) {\\n            pushStack.push(x);\\n        }\\n    \\n        // Removes the element from in front of queue.\\n        public void pop() {\\n            if(popStack.isEmpty()) {\\n                while(!pushStack.isEmpty()) {\\n                    popStack.push(pushStack.pop());\\n                }\\n            }\\n            popStack.pop();\\n        }\\n    \\n        // Get the front element.\\n        public int peek() {\\n            if(popStack.isEmpty()) {\\n                while(!pushStack.isEmpty()) {\\n                    popStack.push(pushStack.pop());\\n                }\\n            }\\n            return popStack.peek();\\n        }\\n    \\n        // Return whether the queue is empty.\\n        public boolean empty() {\\n            return pushStack.isEmpty() && popStack.isEmpty();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"64288",
			"view":"3696",
			"top":"7",
			"title":"Accepted clean Java solution",
			"vote":"9",
			"content":"      class MyQueue {\\n        \\n        Stack<Integer> s1 = new Stack();\\n        Stack<Integer> s2 = new Stack();\\n        \\n        // Push element x to the back of queue.\\n        public void push(int x) {\\n          while (!s2.isEmpty())\\n            s1.push(s2.pop());\\n          \\n          s1.push(x);\\n        }\\n    \\n        // Removes the element from in front of queue.\\n        public void pop() {\\n          while (!s1.isEmpty())\\n            s2.push(s1.pop());\\n          \\n          s2.pop();\\n        }\\n    \\n        // Get the front element.\\n        public int peek() {\\n          while (!s1.isEmpty())\\n            s2.push(s1.pop());\\n          \\n          return s2.peek();\\n        }\\n    \\n        // Return whether the queue is empty.\\n        public boolean empty() {\\n          return s1.isEmpty() && s2.isEmpty();\\n        }\\n    \\n      }"
		},
		{
			"lc_ans_id":"64358",
			"view":"1416",
			"top":"8",
			"title":"C++solution using two stack ,average O(1) time",
			"vote":"7",
			"content":"every elements at most 4 operation type,push in the si stack ,pop from the si stack\\uff0cpush in the so stack,pop from the stack\\uff0cfor one elements,each operation at most once,so the average time of one operation for the queue is O(1)\\n\\n    class Queue {\\n    public:\\n        // Push element x to the back of queue.\\n        stack<int> si;\\n        stack<int> so;\\n        int n;\\n        Queue(){\\n            n=0;\\n        }\\n        void push(int x) {\\n            n++;\\n            si.push(x);\\n        }\\n    \\n        // Removes the element from in front of queue.\\n        void pop(void) {\\n            n--;\\n            if(!so.empty()){\\n                so.pop();\\n            }\\n            else{\\n                int l=si.size();\\n                for(int i=0;i<l;i++){\\n                    so.push(si.top());\\n                    si.pop();\\n                }\\n                so.pop();\\n            }\\n        }\\n    \\n        // Get the front element.\\n        int peek(void) {\\n            if(!so.empty()){\\n                return so.top();\\n            }\\n            else{\\n                int l=si.size();\\n                for(int i=0;i<l;i++){\\n                    so.push(si.top());\\n                    si.pop();\\n                }\\n                return so.top();\\n            }\\n        }\\n    \\n        // Return whether the queue is empty.\\n        bool empty(void) {\\n            return(n==0);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"64316",
			"view":"1305",
			"top":"9",
			"title":"JAVA---Easy version to understand",
			"vote":"6",
			"content":"     Stack<Integer> s1=new Stack<Integer>();\\n    Stack<Integer> s2=new Stack<Integer>();\\n    // Push element x to the back of queue.\\n    public void push(int x) {\\n        s1.push(x);\\n    }\\n\\n    // Removes the element from in front of queue.\\n    public void pop() {\\n        if(!s2.empty())\\n          s2.pop();\\n        else{\\n        while(!s1.empty())\\n         s2.push(s1.pop());\\n         \\n         s2.pop();\\n      }\\n    }\\n\\n    // Get the front element.\\n    public int peek() {\\n        if(!s2.empty())\\n         return s2.peek();\\n        else{\\n        while(!s1.empty())\\n         s2.push(s1.pop());\\n         \\n        return s2.peek();\\n      }\\n    }\\n\\n    // Return whether the queue is empty.\\n    public boolean empty() {\\n        if(s1.empty()&&s2.empty())\\n            return true;\\n        else\\n            return false;\\n    }"
		}
	],
	"id":"232",
	"title":"Implement Queue using Stacks",
	"content":"<p>\r\nImplement the following operations of a queue using stacks.\r\n<ul>\r\n<li>\r\npush(x) -- Push element x to the back of queue.\r\n</li>\r\n<li>\r\npop() -- Removes the element from in front of queue.\r\n</li>\r\n<li>\r\npeek() -- Get the front element.\r\n</li>\r\n<li>\r\nempty() -- Return whether the queue is empty.\r\n</li>\r\n</ul>\r\n<b>Notes:</b><br>\r\n<ul>\r\n<li>You must use <i>only</i> standard operations of a stack -- which means only <code>push to top</code>, <code>peek/pop from top</code>, <code>size</code>, and <code>is empty</code> operations are valid.</li>\r\n<li>Depending on your language, stack may not be supported natively. You may simulate a stack by using a list or deque (double-ended queue), as long as you use only standard operations of a stack.</li>\r\n<li>You may assume that all operations are valid (for example, no pop or peek operations will be called on an empty queue).</li>\r\n</ul>\r\n</p>",
	"frequency":"428",
	"ac_num":"99072"
}