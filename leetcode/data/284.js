{
	"difficulty":"2",
	"submit_num":"143525",
	"show_id":"284",
	"leetcode_id":"284",
	"answers":[
		{
			"lc_ans_id":"72558",
			"view":"20439",
			"top":"0",
			"title":"Concise Java Solution",
			"vote":"106",
			"content":"    class PeekingIterator implements Iterator<Integer> {  \\n        private Integer next = null;\\n        private Iterator<Integer> iter;\\n\\n        public PeekingIterator(Iterator<Integer> iterator) {\\n            // initialize any member here.\\n            iter = iterator;\\n            if (iter.hasNext())\\n                next = iter.next();\\n        }\\n        \\n        // Returns the next element in the iteration without advancing the iterator. \\n        public Integer peek() {\\n            return next; \\n        }\\n    \\n        // hasNext() and next() should behave the same as in the Iterator interface.\\n        // Override them if needed.\\n        @Override\\n        public Integer next() {\\n            Integer res = next;\\n            next = iter.hasNext() ? iter.next() : null;\\n            return res; \\n        }\\n\\n        @Override\\n        public boolean hasNext() {\\n            return next != null;\\n        }\\n    }\\n\\ncache the next element. If next is null, there is no more elements in iterator.\\n\\nEdit: check AlexTheGreat's answer. It's better.\\n\\nEdit after 2 years: the old solution didn't consider null values and @AlexTheGreat already posted the correct solution but looks like no one is checking his/her answer. So I took his/her answer as a reference:\\n```\\nimport java.util.NoSuchElementException;\\nclass PeekingIterator implements Iterator<Integer> {\\n    Integer next;\\n    Iterator<Integer> iter;\\n    boolean noSuchElement;\\n\\n    public PeekingIterator(Iterator<Integer> iterator) {\\n\\t// initialize any member here.\\n\\titer = iterator;\\n        advanceIter();\\n    }\\n\\n    // Returns the next element in the iteration without advancing the iterator.\\n    public Integer peek() {\\n        // you should confirm with interviewer what to return/throw\\n        // if there are no more values\\n        return next;\\n    }\\n\\n    // hasNext() and next() should behave the same as in the Iterator interface.\\n    // Override them if needed.\\n    @Override\\n    public Integer next() {\\n        if (noSuchElement)\\n            throw new NoSuchElementException();\\n        Integer res = next;\\n        advanceIter();\\n        return res;\\n    }\\n\\n    @Override \\n    public boolean hasNext() {\\n        return !noSuchElement;\\n    }\\n    \\n    private void advanceIter() {\\n        if (iter.hasNext()) {\\n            next = iter.next();\\n        } else {\\n            noSuchElement = true;\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"72554",
			"view":"12902",
			"top":"1",
			"title":"Simple C++ solution (1 line per method) without extra member variables",
			"vote":"65",
			"content":"Since `Iterator` has a copy constructor, we can just use it:\\n\\n    class PeekingIterator : public Iterator\\n    {\\n    public:\\n        PeekingIterator(const vector<int> &nums) : Iterator(nums)\\n        {\\n        }\\n    \\n        int peek()\\n        {\\n            return Iterator(*this).next();\\n        }\\n    \\n        int next()\\n        {\\n            return Iterator::next();\\n        }\\n    \\n        bool hasNext() const\\n        {\\n            return Iterator::hasNext();\\n        }\\n    };"
		},
		{
			"lc_ans_id":"72598",
			"view":"4899",
			"top":"2",
			"title":"Another C++ solution with one line in peek() and hasNext(), AC",
			"vote":"28",
			"content":"    class PeekingIterator : public Iterator {\\n    private:\\n        int m_next;\\n        bool m_hasnext;\\n    public:\\n    \\tPeekingIterator(const vector<int>& nums) : Iterator(nums) {\\n    \\t    m_hasnext = Iterator::hasNext();\\n    \\t    if (m_hasnext) m_next = Iterator::next();\\n    \\t}\\n    \\n    \\tint peek() {\\n            return m_next;\\n    \\t}\\n    \\n    \\tint next() {\\n    \\t    int t = m_next;\\n    \\t    m_hasnext = Iterator::hasNext();\\n    \\t    if (m_hasnext) m_next = Iterator::next();\\n    \\t    return t;\\n    \\t}\\n    \\n    \\tbool hasNext() const {\\n    \\t    return m_hasnext;\\n    \\t}\\n    };"
		},
		{
			"lc_ans_id":"72626",
			"view":"2864",
			"top":"3",
			"title":"Simple Python Solution",
			"vote":"28",
			"content":"Store the next value outside the iterator.  When next is called return the stored value and populate with next value from iterator.\\n\\n    class PeekingIterator(object):\\n        def __init__(self, iterator):\\n            self.iter = iterator\\n            self.temp = self.iter.next() if self.iter.hasNext() else None\\n    \\n        def peek(self):\\n            return self.temp\\n    \\n        def next(self):\\n            ret = self.temp\\n            self.temp = self.iter.next() if self.iter.hasNext() else None\\n            return ret\\n    \\n        def hasNext(self):\\n            return self.temp is not None"
		},
		{
			"lc_ans_id":"72570",
			"view":"4003",
			"top":"4",
			"title":"My 4ms  c++ supper easy solution",
			"vote":"14",
			"content":"    class PeekingIterator : public Iterator {\\n     public:\\n     PeekingIterator(const vector<int>& nums) : Iterator(nums) {\\n        // Initialize any member here.\\n        // **DO NOT** save a copy of nums and manipulate it directly.\\n        // You should only use the Iterator interface methods.\\n\\n    }\\n\\n    // Returns the next element in the iteration without advancing the iterator.\\n    int peek() {\\n        if(hasNext()){\\n            Iterator it(*this);\\n            return it.next();\\n        }\\n    }\\n\\n    // hasNext() and next() should behave the same as in the Iterator interface.\\n    // Override them if needed.\\n    int next() {\\n        Iterator::next();\\n    }\\n\\n    bool hasNext() const {\\n        Iterator::hasNext();\\n    }\\n};"
		},
		{
			"lc_ans_id":"72606",
			"view":"2697",
			"top":"5",
			"title":"Simple Java solution by caching next element",
			"vote":"13",
			"content":"quite straight forward solution by caching the next element and handling hasNext() and next() by using cached entry.\\n\\n\\n    class PeekingIterator implements Iterator<Integer> {\\n        Integer cache = null;\\n        Iterator<Integer> it;\\n        \\n    \\tpublic PeekingIterator(Iterator<Integer> iterator) {\\n    \\t    // initialize any member here.\\n    \\t    this.it = iterator;\\n    \\t    cache = it.next();\\n    \\t}\\n    \\n        // Returns the next element in the iteration without advancing the iterator.\\n    \\tpublic Integer peek() {\\n            return cache;\\n    \\t}\\n    \\n    \\t// hasNext() and next() should behave the same as in the Iterator interface.\\n    \\t// Override them if needed.\\n    \\t@Override\\n    \\tpublic Integer next() {\\n    \\t    int ret = cache;\\n    \\t    if(it.hasNext()){\\n    \\t        cache = it.next();\\n    \\t    }\\n    \\t    else{\\n    \\t        cache = null;\\n    \\t    }\\n    \\t    return ret;\\n    \\t}\\n    \\n    \\t@Override\\n    \\tpublic boolean hasNext() {\\n    \\t    return (cache != null);\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"72650",
			"view":"1705",
			"top":"6",
			"title":"10-line C++ and 14-line Java Implementation",
			"vote":"12",
			"content":"    class PeekingIterator : public Iterator {\\n        bool hasPeeked;\\n        int peekedElem;\\n    public:\\n    \\tPeekingIterator(const vector<int>& num) : Iterator(num) {\\n            hasPeeked = false;\\n    \\t}\\n    \\n    \\tint peek() {\\n            peekedElem = hasPeeked?peekedElem:Iterator::next();\\n            hasPeeked = true;\\n            return peekedElem;\\n    \\t}\\n    \\n    \\tint next() {\\n    \\t    int nextElem = hasPeeked?peekedElem:Iterator::next();\\n    \\t    hasPeeked = false;\\n    \\t    return nextElem;\\n    \\t}\\n    \\n    \\tbool hasNext() const {\\n    \\t    return hasPeeked||Iterator::hasNext();\\n    \\t}\\n    };  \\n\\nJava implementation, inspired by Google's guava library source code.\\n\\n    class PeekingIterator implements Iterator<Integer> {\\n        private final Iterator<Integer> iterator;\\n        private boolean hasPeeked;\\n        private Integer peekedElement;\\n        \\n    \\tpublic PeekingIterator(Iterator<Integer> iterator) {\\n    \\t    if(iterator==null)\\n    \\t        throw new NullPointerException();\\n    \\t    else\\n    \\t        this.iterator = iterator;\\n    \\t}\\n    \\n    \\tpublic Integer peek() {\\n            peekedElement = hasPeeked?peekedElement:iterator.next();\\n            hasPeeked = true;\\n            return peekedElement;\\n    \\t}\\n    \\n    \\t@Override\\n    \\tpublic Integer next() {\\n    \\t    int nextElem = hasPeeked?peekedElement:iterator.next();\\n            hasPeeked = false;\\n            return nextElem;\\n    \\t}\\n    \\n    \\t@Override\\n    \\tpublic boolean hasNext() {\\n    \\t    return hasPeeked || iterator.hasNext();\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"72632",
			"view":"2221",
			"top":"7",
			"title":"My Java solution",
			"vote":"9",
			"content":"    class PeekingIterator implements Iterator<Integer> {\\n        Integer n = null;\\n        private Iterator<Integer> iterator = null;\\n    \\tpublic PeekingIterator(Iterator<Integer> iterator) {\\n    \\t    this.iterator = iterator;\\n    \\t}\\n    \\n        public Integer peek() {\\n            if (n == null && iterator.hasNext()){\\n                n = iterator.next();\\n            }\\n            return n;\\n    \\t}\\n    \\tpublic Integer next() {\\n    \\t    if (n!=null){\\n    \\t        int temp = n;\\n    \\t        n = null;\\n    \\t        return temp;\\n    \\t    }\\n    \\t    return iterator.next();\\n    \\t}\\n    \\tpublic boolean hasNext() {\\n    \\t    if (n!=null){\\n    \\t        return true;\\n    \\t    }\\n    \\t    return iterator.hasNext();\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"72599",
			"view":"1214",
			"top":"8",
			"title":"Concise Java solution beats 99.52%, 95ms by caching next element",
			"vote":"8",
			"content":"    class PeekingIterator implements Iterator<Integer> {\\n    \\n        Integer peek;  // use to visit and store the next element\\n        Iterator<Integer> it;\\n        \\n    \\tpublic PeekingIterator(Iterator<Integer> iterator) {\\n    \\t    it = iterator;\\n            peek = it.hasNext()?it.next():null;\\n    \\t}\\n    \\n    \\tpublic Integer peek() {\\n            return peek;        \\n    \\t}\\n    \\n    \\t@Override\\n    \\tpublic Integer next() {\\n            if (peek==null) throw new java.util.NoSuchElementException();\\n    \\t    Integer ret = peek;\\n            peek = it.hasNext()?it.next():null;\\n            return ret;\\n    \\t}\\n    \\n    \\t@Override\\n    \\tpublic boolean hasNext() {\\n    \\t    return peek!=null;\\n    \\t}\\n    \\t\\n    }"
		},
		{
			"lc_ans_id":"72618",
			"view":"1733",
			"top":"9",
			"title":"A simple C++ solution",
			"vote":"5",
			"content":"    // Below is the interface for Iterator, which is already defined for you.\\n    // **DO NOT** modify the interface for Iterator.\\n    class Iterator {\\n        struct Data;\\n    \\tData* data;\\n    public:\\n    \\tIterator(const vector<int>& nums);\\n    \\tIterator(const Iterator& iter);\\n    \\tvirtual ~Iterator();\\n    \\t// Returns the next element in the iteration.\\n    \\tint next();\\n    \\t// Returns true if the iteration has more elements.\\n    \\tbool hasNext() const;\\n    };\\n    \\n    \\n    class PeekingIterator : public Iterator {\\n    public:\\n        bool peaked;\\n        int peakedElement;\\n    \\tPeekingIterator(const vector<int>& nums) : Iterator(nums) {\\n    \\t    // Initialize any member here.\\n    \\t    // **DO NOT** save a copy of nums and manipulate it directly.\\n    \\t    // You should only use the Iterator interface methods.\\n    \\t    peaked = false;\\n    \\t}\\n    \\n        // Returns the next element in the iteration without advancing the iterator.\\n    \\tint peek() \\n    \\t{\\n            if(!peaked && Iterator::hasNext())\\n            {\\n                peaked = true;\\n                peakedElement = Iterator::next();\\n                return peakedElement;\\n            }\\n            else if(peaked)\\n            {\\n                return peakedElement;\\n            }\\n    \\t}\\n    \\n    \\t// hasNext() and next() should behave the same as in the Iterator interface.\\n    \\t// Override them if needed.\\n    \\tint next() \\n    \\t{\\n    \\t    if(peaked)\\n    \\t    {\\n    \\t        peaked = false;\\n    \\t        return peakedElement;\\n    \\t    }\\n    \\t    if(Iterator::hasNext())\\n    \\t        return Iterator::next();\\n    \\t}\\n    \\n    \\tbool hasNext() const \\n    \\t{\\n    \\t    if(peaked)\\n    \\t        return true;\\n    \\t   return Iterator::hasNext();\\n    \\t}\\n    };"
		}
	],
	"id":"284",
	"title":"Peeking Iterator",
	"content":"<p>Given an Iterator class interface with methods: <code>next()</code> and <code>hasNext()</code>, design and implement a PeekingIterator that support the <code>peek()</code> operation -- it essentially peek() at the element that will be returned by the next call to next().</p>\r\n\r\n<hr />\r\n<p>Here is an example. Assume that the iterator is initialized to the beginning of the list: <code>[1, 2, 3]</code>.</p>\r\n\r\n<p>Call <code>next()</code> gets you 1, the first element in the list.</p>\r\n\r\n<p>Now you call <code>peek()</code> and it returns 2, the next element. Calling <code>next()</code> after that <i><b>still</b></i> return 2.</p>\r\n\r\n<p>You call <code>next()</code> the final time and it returns 3, the last element. Calling <code>hasNext()</code> after that should return false.</p>\r\n\r\n<p>\r\n<b>Follow up</b>: How would you extend your design to be generic and work with all types, not just integer?</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/porker2008\">@porker2008</a> for adding this problem and creating all test cases.</p>",
	"frequency":"303",
	"ac_num":"51001"
}