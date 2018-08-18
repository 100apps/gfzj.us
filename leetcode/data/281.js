{
	"difficulty":"2",
	"submit_num":"64965",
	"show_id":"281",
	"leetcode_id":"281",
	"answers":[
		{
			"lc_ans_id":"71779",
			"view":"14536",
			"top":"0",
			"title":"Simple Java solution for K-vector",
			"vote":"159",
			"content":"Uses a linkedlist to store the iterators in different vectors. Every time we call next(), we pop an element from the list, and re-add it to the end to cycle through the lists.\\n\\n    public class ZigzagIterator {\\n        LinkedList<Iterator> list;\\n        public ZigzagIterator(List<Integer> v1, List<Integer> v2) {\\n            list = new LinkedList<Iterator>();\\n            if(!v1.isEmpty()) list.add(v1.iterator());\\n            if(!v2.isEmpty()) list.add(v2.iterator());\\n        }\\n    \\n        public int next() {\\n            Iterator poll = list.remove();\\n            int result = (Integer)poll.next();\\n            if(poll.hasNext()) list.add(poll);\\n            return result;\\n        }\\n    \\n        public boolean hasNext() {\\n            return !list.isEmpty();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71835",
			"view":"6821",
			"top":"1",
			"title":"C++ with queue (compatible with k vectors)",
			"vote":"79",
			"content":"    class ZigzagIterator {\\n    public:\\n        ZigzagIterator(vector<int>& v1, vector<int>& v2) {\\n            if (v1.size() != 0)\\n                Q.push(make_pair(v1.begin(), v1.end()));\\n            if (v2.size() != 0)\\n                Q.push(make_pair(v2.begin(), v2.end()));\\n        }\\n    \\n        int next() {\\n            vector<int>::iterator it = Q.front().first;\\n            vector<int>::iterator endIt = Q.front().second;\\n            Q.pop();\\n            if (it + 1 != endIt)\\n                Q.push(make_pair(it+1, endIt));\\n            return *it;\\n        }\\n    \\n        bool hasNext() {\\n            return !Q.empty();\\n        }\\n    private:\\n        queue<pair<vector<int>::iterator, vector<int>::iterator>> Q;\\n    };\\n\\nsomehow similar to BFS."
		},
		{
			"lc_ans_id":"71781",
			"view":"9549",
			"top":"2",
			"title":"Short Java O(1) space",
			"vote":"74",
			"content":"Two iterators, one for each list. Switching them *before* reading the next number instead of afterwards saves a bit of code, I think.\\n\\n     public class ZigzagIterator {\\n    \\n        private Iterator<Integer> i, j, tmp;\\n    \\n        public ZigzagIterator(List<Integer> v1, List<Integer> v2) {\\n            i = v2.iterator();\\n            j = v1.iterator();\\n        }\\n    \\n        public int next() {\\n            if (j.hasNext()) { tmp = j; j = i; i = tmp; }\\n            return i.next();\\n        }\\n    \\n        public boolean hasNext() {\\n            return i.hasNext() || j.hasNext();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71786",
			"view":"5296",
			"top":"3",
			"title":"Python O(1) space solutions",
			"vote":"20",
			"content":"**Solution 1**\\n\\nWith a list of remaining **downcounter + iterator** pairs:\\n\\n\\n    class ZigzagIterator(object):\\n    \\n        def __init__(self, v1, v2):\\n            self.data = [(len(v), iter(v)) for v in (v1, v2) if v]\\n    \\n        def next(self):\\n            len, iter = self.data.pop(0)\\n            if len > 1:\\n                self.data.append((len-1, iter))\\n            return next(iter)\\n    \\n        def hasNext(self):\\n            return bool(self.data)\\n\\n---\\n\\n**Solution 2**\\n\\nWith a **generator expression** and a **down counter**:\\n\\n    class ZigzagIterator(object):\\n    \\n        def __init__(self, v1, v2):\\n            self.vals = (v[i] for i in itertools.count() for v in (v1, v2) if i < len(v))\\n            self.n = len(v1) + len(v2)\\n    \\n        def next(self):\\n            self.n -= 1\\n            return next(self.vals)\\n    \\n        def hasNext(self):\\n            return self.n > 0\\n\\n---\\n\\n**Solution 3**\\n\\nWith a **generator function** and a **down counter**:\\n\\n    class ZigzagIterator(object):\\n    \\n        def __init__(self, v1, v2):\\n            def vals():\\n                for i in itertools.count():\\n                    for v in v1, v2:\\n                        if i < len(v):\\n                            yield v[i]\\n            self.vals = vals()\\n            self.n = len(v1) + len(v2)\\n    \\n        def next(self):\\n            self.n -= 1\\n            return next(self.vals)\\n    \\n        def hasNext(self):\\n            return self.n > 0"
		},
		{
			"lc_ans_id":"71830",
			"view":"1926",
			"top":"4",
			"title":"Python Queue Solution",
			"vote":"14",
			"content":"class ZigzagIterator(object):\\n\\n    def __init__(self, v1, v2):\\n        \"\"\"\\n        Initialize your data structure here.\\n        :type v1: List[int]\\n        :type v2: List[int]\\n        \"\"\"\\n        self.queue=[_ for _ in (v1,v2) if _]\\n\\n    def next(self):\\n        \"\"\"\\n        :rtype: int\\n        \"\"\"\\n        v=self.queue.pop(0)\\n        ret=v.pop(0)\\n        if v: self.queue.append(v)\\n        return ret\\n\\n    def hasNext(self):\\n        \"\"\"\\n        :rtype: bool\\n        \"\"\"\\n        if self.queue: return True\\n        return False"
		},
		{
			"lc_ans_id":"71784",
			"view":"1254",
			"top":"5",
			"title":"C++ O(1)-space with Explanations",
			"vote":"8",
			"content":"**Update**: when `k` vectors are provided, what the results should be still remain to be a question (you may refer to [this post][1]). So the following notes do not focus on that now.\\n\\n----------\\n\\nThe idea is as follows: keep the two beginning iterators and the two end iterators of `v1` and `v2` into two arrays of type `vector<int>::iterator` with size `2`. Then we keep a variable `p` (initialized to be `0`) to record which iterator should be used: `p` takes values ranging from `0` to `1`. Each time we call `next`, update `p` by `p = (p + 1) % 2` to circulate it to point to the next vector.\\n\\nThe code is as follows.\\n\\n    class ZigzagIterator {\\n    public:\\n        ZigzagIterator(vector<int>& v1, vector<int>& v2) {\\n            bs[0] = v1.begin(), bs[1] = v2.begin();\\n            es[0] = v1.end(), es[1] = v2.end();\\n            p = 0;\\n        }\\n      \\n        int next() {\\n            int elem;\\n            if (bs[0] == es[0]) elem = *bs[1]++;\\n            else if (bs[1] == es[1]) elem = *bs[0]++;\\n            else {\\n                elem = *bs[p]++;\\n                p = (p + 1) % 2;\\n            }\\n            return elem;\\n        }\\n    \\n        bool hasNext() {\\n            return bs[0] != es[0] || bs[1] != es[1];\\n        }\\n    private:\\n        int p; \\n        vector<int>::iterator bs[2], es[2]; \\n    };\\n\\n[1]: https://leetcode.com/discuss/57986/what-k-lists-should-produce"
		},
		{
			"lc_ans_id":"71847",
			"view":"2133",
			"top":"6",
			"title":"O(n) Time & O(1) Space Java Solution",
			"vote":"8",
			"content":"Basically, we can use array to store all iterators. My solution is as follows and for k lists, the only thing we need to do is to increase the size of ***its*** array to store all lists' iterators.\\n\\nThanks for @StefanPochmann's advice to post my solution as a single question.\\n\\n    public class ZigzagIterator {\\n        Iterator<Integer>[] its;\\n        int pos;\\n    \\n        public ZigzagIterator(List<Integer> v1, List<Integer> v2) {\\n            its = new Iterator[]{v1.iterator(), v2.iterator()};\\n            pos = 0;\\n        }\\n    \\n        public int next() {\\n            int next = its[pos].next();\\n            pos = (pos == its.length - 1) ? 0 : pos + 1;\\n            return next;\\n        }\\n    \\n        public boolean hasNext() {\\n            if (its[pos].hasNext()) return true;\\n            for (int i = pos + 1; i < its.length; i++) {\\n                if (its[i].hasNext()) {\\n                    pos = i;\\n                    return true;\\n                }\\n            }\\n            for (int i = 0; i < pos; i++) {\\n                if (its[i].hasNext()) {\\n                    pos = i;\\n                    return true;\\n                }\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71867",
			"view":"1350",
			"top":"7",
			"title":"Clean Java Solution works for K lists",
			"vote":"7",
			"content":"    public class ZigzagIterator {\\n        \\n        List<Iterator<Integer>> itrs;\\n        int idx;\\n    \\n        public ZigzagIterator(List<Integer> v1, List<Integer> v2) {\\n            itrs = new ArrayList<Iterator<Integer>>();\\n            itrs.add(v1.iterator());\\n            itrs.add(v2.iterator());\\n    \\t    idx = 0;\\n        }\\n    \\n        public int next() {\\n    \\t    hasNext();\\n            int val = itrs.get(idx).next();\\n     \\t    idx = (idx + 1) % itrs.size();\\n            return val;\\n        }\\n    \\n        public boolean hasNext() {\\n    \\t    if(itrs.size()==0)\\n    \\t        return false;\\n    \\t    else if(itrs.get(idx).hasNext())\\n    \\t        return true;\\n    \\t    else {\\n                do {\\n    \\t   \\t        itrs.remove(idx);\\n    \\t   \\t        if(itrs.size()==0)\\n    \\t\\t            return false;\\n    \\t            idx %= itrs.size();\\n    \\t        } while(!itrs.get(idx).hasNext());\\n    \\t        return true;\\n    \\t    }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71819",
			"view":"359",
			"top":"8",
			"title":"Java easy to understand solution using Queue!",
			"vote":"4",
			"content":"```\\npublic class ZigzagIterator {\\n    Queue<Iterator<Integer>> queue; \\n    public ZigzagIterator(List<Integer> v1, List<Integer> v2) {\\n        this.queue = new LinkedList<Iterator<Integer>> ();\\n        if(v1.iterator().hasNext()) \\n            queue.offer(v1.iterator());\\n        if(v2.iterator().hasNext()) \\n            queue.offer(v2.iterator());\\n    }\\n\\n    public int next() {\\n        Iterator<Integer> next = queue.poll();\\n        int a  = next.next();\\n        if(next.hasNext()) queue.offer(next);\\n        return a;\\n    }\\n\\n    public boolean hasNext() {\\n        return !queue.isEmpty();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"71800",
			"view":"612",
			"top":"9",
			"title":"C++, how about combining the input vectors into one in the beginning?",
			"vote":"4",
			"content":"    class ZigzagIterator {\\n        vector<int> data;\\n        int nxtPos;\\n    public:\\n        ZigzagIterator(vector<int>& v1, vector<int>& v2) {\\n            int n1 = v1.size(), n2 = v2.size();\\n            data.reserve(n1+n2);\\n            int n = max(n1, n2);\\n            for (int i=0; i<n; ++i) {\\n                if (i<n1) data.push_back(v1[i]);\\n                if (i<n2) data.push_back(v2[i]);\\n            }\\n            nxtPos = 0;\\n        }\\n\\n        int next() {\\n            return data[nxtPos++];\\n        }\\n\\n        bool hasNext() {\\n            return nxtPos < data.size();\\n        `}\\n    };"
		}
	],
	"id":"281",
	"title":"Zigzag Iterator",
	"content":"<p>\r\nGiven two 1d vectors, implement an iterator to return their elements alternately.\r\n</p>\r\n\r\n<p>For example, given two 1d vectors:\r\n<pre>\r\nv1 = [1, 2]\r\nv2 = [3, 4, 5, 6]\r\n</pre>\r\n</p>\r\n<p>\r\nBy calling <i>next</i> repeatedly until <i>hasNext</i> returns <code>false</code>, the order of elements returned by <i>next</i> should be: <code>[1, 3, 2, 4, 5, 6]</code>.\r\n</p>\r\n\r\n<p>\r\n<b>Follow up</b>: What if you are given <code>k</code> 1d vectors? How well can your code be extended to such cases?</p>\r\n\r\n<p>\r\n<b><u>Clarification for the follow up question - <font color=\"red\">Update (2015-09-18):</font></u></b><br>\r\nThe \"Zigzag\" order is not clearly defined and is ambiguous for <code>k > 2</code> cases. If \"Zigzag\" does not look right to you, replace \"Zigzag\" with \"Cyclic\". For example, given the following input:\r\n<pre>\r\n[1,2,3]\r\n[4,5,6,7]\r\n[8,9]\r\n</pre>\r\nIt should return <code>[1,4,8,2,5,9,3,6,7]</code>.\r\n</p>",
	"frequency":"291",
	"ac_num":"33822"
}