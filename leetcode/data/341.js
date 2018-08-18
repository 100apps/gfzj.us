{
	"difficulty":"2",
	"submit_num":"130365",
	"show_id":"341",
	"leetcode_id":"341",
	"answers":[
		{
			"lc_ans_id":"80147",
			"view":"31867",
			"top":"0",
			"title":"Simple Java solution using a stack with explanation",
			"vote":"154",
			"content":"A question before this is the Nested List Weight Sum, and it requires recursion to solve.  As it carries to this problem that we will need recursion to solve it.  But since we need to access each NestedInteger at a time, we will use a stack to help.  \\n\\nIn the constructor, we push all the nestedList into the stack from back to front, so when we pop the stack, it returns the very first element.  Second, in the hasNext() function, we peek the first element in stack currently, and if it is an Integer, we will return true and pop the element.  If it is a list, we will further flatten it.  This is iterative version of flatting the nested list.  Again, we need to iterate from the back to front of the list.\\n\\n    public class NestedIterator implements Iterator<Integer> {\\n        Stack<NestedInteger> stack = new Stack<>();\\n        public NestedIterator(List<NestedInteger> nestedList) {\\n            for(int i = nestedList.size() - 1; i >= 0; i--) {\\n                stack.push(nestedList.get(i));\\n            }\\n        }\\n    \\n        @Override\\n        public Integer next() {\\n            return stack.pop().getInteger();\\n        }\\n    \\n        @Override\\n        public boolean hasNext() {\\n            while(!stack.isEmpty()) {\\n                NestedInteger curr = stack.peek();\\n                if(curr.isInteger()) {\\n                    return true;\\n                }\\n                stack.pop();\\n                for(int i = curr.getList().size() - 1; i >= 0; i--) {\\n                    stack.push(curr.getList().get(i));\\n                }\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"80146",
			"view":"25918",
			"top":"1",
			"title":"Real iterator in Python, Java, C++",
			"vote":"123",
			"content":"In my opinion an iterator shouldn't copy the entire data (which some solutions have done) but just iterate over the original data structure.\\n\\nI keep the current progress in a stack. My `hasNext` tries to find an integer. My `next` returns it and moves on. I call `hasNext` in `next` because `hasNext` is optional. Some user of the iterator might call only `next` and never `hasNext`, e.g., if they know how many integers are in the structure or if they want to handle the ending with exception handling.\\n\\n---\\n\\n**Python**\\n\\nUsing a stack of [list, index] pairs.\\n\\n    class NestedIterator(object):\\n    \\n        def __init__(self, nestedList):\\n            self.stack = [[nestedList, 0]]\\n    \\n        def next(self):\\n            self.hasNext()\\n            nestedList, i = self.stack[-1]\\n            self.stack[-1][1] += 1\\n            return nestedList[i].getInteger()\\n                \\n        def hasNext(self):\\n            s = self.stack\\n            while s:\\n                nestedList, i = s[-1]\\n                if i == len(nestedList):\\n                    s.pop()\\n                else:\\n                    x = nestedList[i]\\n                    if x.isInteger():\\n                        return True\\n                    s[-1][1] += 1\\n                    s.append([x.getList(), 0])\\n            return False\\n\\n---\\n\\n**Java**\\n\\nUsing a stack of ListIterators.\\n\\n    public class NestedIterator implements Iterator<Integer> {\\n    \\n        public NestedIterator(List<NestedInteger> nestedList) {\\n            lists = new Stack<>();\\n            lists.push(nestedList.listIterator());\\n        }\\n    \\n        public Integer next() {\\n            hasNext();\\n            return lists.peek().next().getInteger();\\n        }\\n    \\n        public boolean hasNext() {\\n            while (!lists.empty()) {\\n                if (!lists.peek().hasNext()) {\\n                    lists.pop();\\n                } else {\\n                    NestedInteger x = lists.peek().next();\\n                    if (x.isInteger())\\n                        return lists.peek().previous() == x;\\n                    lists.push(x.getList().listIterator());\\n                }\\n            }\\n            return false;\\n        }\\n        \\n        private Stack<ListIterator<NestedInteger>> lists;\\n    }\\n\\n---\\n\\n**C++**\\n\\nUsing stacks of begin and end iterators.\\n\\n    class NestedIterator {\\n    public:\\n        NestedIterator(vector<NestedInteger> &nestedList) {\\n            begins.push(nestedList.begin());\\n            ends.push(nestedList.end());\\n        }\\n    \\n        int next() {\\n            hasNext();\\n            return (begins.top()++)->getInteger();\\n        }\\n    \\n        bool hasNext() {\\n            while (begins.size()) {\\n                if (begins.top() == ends.top()) {\\n                    begins.pop();\\n                    ends.pop();\\n                } else {\\n                    auto x = begins.top();\\n                    if (x->isInteger())\\n                        return true;\\n                    begins.top()++;\\n                    begins.push(x->getList().begin());\\n                    ends.push(x->getList().end());\\n                }\\n            }\\n            return false;\\n        }\\n    \\n    private:\\n        stack<vector<NestedInteger>::iterator> begins, ends;\\n    };"
		},
		{
			"lc_ans_id":"80175",
			"view":"10242",
			"top":"2",
			"title":"Share my Java neat solution, 8ms",
			"vote":"40",
			"content":"I feel my solution is pretty neat compared to the existing solutions, so I want to share it with you to provide some extra ingredients. Basically, I have similar idea as [StafanPochmann][1]'s [solution][2], but I feel to use listIterator seems overkill. So what I do is just to keep an additional field storing the next integer. Please check the code.\\n\\n    public class NestedIterator implements Iterator<Integer> {\\n        NestedInteger nextInt;\\n        Stack<Iterator<NestedInteger>> stack;\\n\\n        public NestedIterator(List<NestedInteger> nestedList) {\\n            stack = new Stack<Iterator<NestedInteger>>();\\n            stack.push(nestedList.iterator());\\n        }\\n\\n        @Override\\n        public Integer next() {\\n            return nextInt != null ? nextInt.getInteger() : null; //Just in case\\n        }\\n\\n        @Override\\n        public boolean hasNext() {\\n            while (!stack.isEmpty()) {\\n                if (!stack.peek().hasNext()) stack.pop();\\n                else if ((nextInt = stack.peek().next()).isInteger()) return true;\\n                else stack.push(nextInt.getList().iterator());\\n            }\\n            return false;\\n        }\\n    }\\n\\n\\n  [1]: https://leetcode.com/discuss/user/StefanPochmann\\n  [2]: https://leetcode.com/discuss/95934/real-iterator-in-python-java-c"
		},
		{
			"lc_ans_id":"80169",
			"view":"5594",
			"top":"3",
			"title":"Concise C++ without storing all values at initialization",
			"vote":"19",
			"content":"    class NestedIterator {\\n    private:\\n        stack<NestedInteger> nodes;\\n        \\n    public:\\n        NestedIterator(vector<NestedInteger> &nestedList) {\\n            int size = nestedList.size();\\n            for(int i = size - 1; i >= 0; --i) {\\n                nodes.push(nestedList[i]);\\n            }\\n        }\\n\\n    int next() {\\n        int result = nodes.top().getInteger();\\n        nodes.pop();\\n        return result;\\n    }\\n\\n    bool hasNext() {\\n        while(!nodes.empty()) {\\n            NestedInteger curr = nodes.top();\\n            if(curr.isInteger()) {\\n                return true;\\n            }\\n            \\n            nodes.pop();\\n            vector<NestedInteger>& adjs = curr.getList();\\n            int size = adjs.size();\\n            for(int i = size - 1; i >= 0; --i) {\\n                nodes.push(adjs[i]);\\n            }\\n        }\\n        \\n        return false;\\n        }\\n    };\\n\\nThe same idea as a DFS, the only tricky part probably is you have to find a value node to claim there is next. And to do that, you have to look through all the nodes in the worst case in the entire graph. So you just keep going until you find a value node; if you can't, there is no next."
		},
		{
			"lc_ans_id":"80156",
			"view":"4276",
			"top":"4",
			"title":"Flatten the list and iterate with plain next() and hasNext() (Java)",
			"vote":"18",
			"content":"First flatten the list to a list of Integer by using DFS, then just call the plain <code>next()</code> and <code>hasNext()</code>\\n   \\n    public class NestedIterator implements Iterator<Integer> {\\n    \\n    private List<Integer> flattenedList;\\n    private Iterator<Integer> it;\\n  \\n    public NestedIterator(List<NestedInteger> nestedList) {\\n        flattenedList = new LinkedList<Integer>();\\n        flatten(nestedList);\\n        it = flattenedList.iterator();\\n    }\\n\\n    private void flatten(List<NestedInteger> nestedList) {\\n        for (NestedInteger i : nestedList) {\\n            if (i.isInteger()) {\\n                flattenedList.add(i.getInteger());\\n            } else {\\n                flatten(i.getList());\\n            }\\n        }\\n    }\\n\\n    @Override\\n    public Integer next() {\\n        return it.next();\\n    }\\n\\n    @Override\\n    public boolean hasNext() {\\n        return it.hasNext();\\n    }"
		},
		{
			"lc_ans_id":"80142",
			"view":"1552",
			"top":"5",
			"title":"8-line Python Solution",
			"vote":"15",
			"content":"    class NestedIterator(object):\\n    \\n        def __init__(self, nestedList):\\n            \"\"\"\\n            Initialize your data structure here.\\n            :type nestedList: List[NestedInteger]\\n            \"\"\"\\n            self.stack = nestedList[::-1]\\n            \\n        def next(self):\\n            \"\"\"\\n            :rtype: int\\n            \"\"\"\\n            return self.stack.pop().getInteger()\\n            \\n        def hasNext(self):\\n            \"\"\"\\n            :rtype: bool\\n            \"\"\"\\n            while self.stack:\\n                top = self.stack[-1]\\n                if top.isInteger():\\n                    return True\\n                self.stack = self.stack[:-1] + top.getList()[::-1]\\n            return False"
		},
		{
			"lc_ans_id":"80222",
			"view":"3285",
			"top":"6",
			"title":"Flatten Nested List Iterator",
			"vote":"12",
			"content":"For this problem \"Run Code\" button is not working and code can't be tested. Please fix it :)"
		},
		{
			"lc_ans_id":"80247",
			"view":"2674",
			"top":"7",
			"title":"Python Generators solution",
			"vote":"11",
			"content":"    class NestedIterator(object):\\n    \\n        def __init__(self, nestedList):\\n            def gen(nestedList):\\n                for x in nestedList:\\n                    if x.isInteger():\\n                        yield x.getInteger()\\n                    else:\\n                        for y in gen(x.getList()):\\n                            yield y\\n            self.gen = gen(nestedList)\\n    \\n        def next(self):\\n            return self.value\\n    \\n        def hasNext(self):\\n            try:\\n                self.value = next(self.gen)\\n                return True\\n            except StopIteration:\\n                return False\\n\\nThis assumes that the iterator is just used as described in the problem. Usually, hasNext should be both optional and idempotent, but a next+hasNext iterator is very unpythonic anyway, so I decided to not do that here, as I feel it would distract from the generator.\\n\\nAnd of course while this solution is (IMHO) somewhat cute, it passes each value through each level it's nested in, so it's not efficient."
		},
		{
			"lc_ans_id":"80212",
			"view":"1389",
			"top":"8",
			"title":"For the interview, is it better to use the constructor to construct the entire flattened list first, or no?",
			"vote":"8",
			"content":"I noticed simple approach is to just flatten entire list first in constructor, since this makes next and hasNext O(1), even though constructor is O(N). Would an interviewer be ok with this approach, or would he want to actually dynamically maintain some kind of stack so that it always has the next integer?"
		},
		{
			"lc_ans_id":"80404",
			"view":"2739",
			"top":"9",
			"title":"Simple iterative DFS using stack",
			"vote":"8",
			"content":"    public class NestedIterator implements Iterator<Integer> {\\n        Stack<Iterator<NestedInteger>> stack = new Stack<>();\\n        Integer current = null;\\n        \\n        public NestedIterator(List<NestedInteger> nestedList) {\\n            if (nestedList != null) {\\n                stack.push(nestedList.iterator());\\n            }\\n        }\\n    \\n        @Override\\n        public Integer next() {\\n            return current;\\n        }\\n    \\n        @Override\\n        public boolean hasNext() {\\n            while (!stack.isEmpty()) {\\n                Iterator<NestedInteger> node = stack.peek();\\n        \\n                // This will clear out empty iterators.\\n                if (!node.hasNext()) {\\n                    stack.pop();\\n                    continue;\\n                }\\n                \\n                // If the value is an integer, done - load up and return.\\n                // Otherwise push the current list to the top of the stack and continue.\\n                NestedInteger value = node.next();\\n                if (value.isInteger()) {\\n                    current = value.getInteger();\\n                    return true;\\n                } else {\\n                    stack.push(value.getList().iterator());\\n                }\\n            }\\n            \\n            return false;\\n        }\\n    }"
		}
	],
	"id":"341",
	"title":"Flatten Nested List Iterator",
	"content":"<p>Given a nested list of integers, implement an iterator to flatten it.</p>\r\n\r\n<p>Each element is either an integer, or a list -- whose elements may also be integers or other lists.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\nGiven the list <code>[[1,1],2,[1,1]]</code>,\r\n<p>\r\nBy calling <i>next</i> repeatedly until <i>hasNext</i> returns false, the order of elements returned by <i>next</i> should be: <code>[1,1,2,1,1]</code>.\r\n</p>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\nGiven the list <code>[1,[4,[6]]]</code>,\r\n<p>\r\nBy calling <i>next</i> repeatedly until <i>hasNext</i> returns false, the order of elements returned by <i>next</i> should be: <code>[1,4,6]</code>.\r\n</p>\r\n</p>",
	"frequency":"404",
	"ac_num":"55833"
}