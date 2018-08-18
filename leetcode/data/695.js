{
	"difficulty":"2",
	"submit_num":"17575",
	"show_id":"729",
	"leetcode_id":"729",
	"answers":[
		{
			"lc_ans_id":"109462",
			"view":"2269",
			"top":"0",
			"title":"Java 8 liner, TreeMap",
			"vote":"27",
			"content":"```\\nclass MyCalendar {\\n\\n    TreeMap<Integer, Integer> calendar;\\n\\n    public MyCalendar() {\\n        calendar = new TreeMap<>();\\n    }\\n\\n    public boolean book(int start, int end) {\\n        Integer floorKey = calendar.floorKey(start);\\n        if (floorKey != null && calendar.get(floorKey) > start) return false;\\n        Integer ceilingKey = calendar.ceilingKey(start);\\n        if (ceilingKey != null && ceilingKey < end) return false;\\n\\n        calendar.put(start, end);\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109475",
			"view":"1608",
			"top":"1",
			"title":"[Java/C++] Clean Code with Explanation",
			"vote":"14",
			"content":"**Solution 1: Check every existed book for overlap**\\n`overlap` of 2 interval `a` `b` is `(max(a0, b0), min(a1, b1))` \\ndetail is in: https://discuss.leetcode.com/topic/111198\\n**Java**\\n```\\nclass MyCalendar {\\n    private List<int[]> books = new ArrayList<>();\\n    public boolean book(int start, int end) {\\n        for (int[] b : books)\\n            if (Math.max(b[0], start) < Math.min(b[1], end)) return false;\\n        books.add(new int[]{ start, end });\\n        return true;\\n    }\\n}\\n```\\n**C++**\\n```\\nclass MyCalendar {\\n    vector<pair<int, int>> books;\\npublic:    \\n    bool book(int start, int end) {\\n        for (pair<int, int> p : books)\\n            if (max(p.first, start) < min(end, p.second)) return false;\\n        books.push_back({start, end});\\n        return true;\\n    }\\n};\\n```\\n\\n**Solution 2: Keep existing books sorted and only check 2 books start right before & after the new book starts**\\nAnother way to check overlap of 2 intervals is `a started with b`, or, `b started within a`.\\n\\nKeep the intervals sorted,\\nif the interval started right before the new interval contains the start, or\\nif the interval started right after the new interval started within the `new interval`.\\n```\\n   floor      ceiling\\n... |----| ... |----| ...\\n       |---------|\\n      s         e\\nif s < floor.end or e > ceiling.start, there is an overlap.\\n\\nAnother way to think of it:\\nIf there is an interval start within the new book (must be the ceilingEntry) at all, or\\nbooks: |----|   |--|\\n            s |------| e\\n\\nbooks: |----|   |----|\\n            s |----| e\\nIf the new book start within an interval (must be the floorEntry) at all\\nbooks: |-------|   |--|\\n       s |---| e\\n\\nbooks: |----|   |----|\\n        s |----| e\\nThere is a overlap \\n\\n```\\n**Java**\\nTreeSet\\n```\\nclass MyCalendar {\\n    TreeSet<int[]> books = new TreeSet<int[]>((int[] a, int[] b) -> a[0] - b[0]);\\n\\n    public boolean book(int s, int e) {\\n        int[] book = new int[] { s, e }, floor = books.floor(book), ceiling = books.ceiling(book);\\n        if (floor != null && s < floor[1]) return false; // (s, e) start within floor\\n        if (ceiling != null && ceiling[0] < e) return false; // ceiling start within (s, e)\\n        books.add(book);\\n        return true;\\n    }\\n}\\n```\\nTreeMap\\n```\\nclass MyCalendar {\\n    TreeMap<Integer, Integer> books = new TreeMap<>();\\n\\n    public boolean book(int s, int e) {\\n        java.util.Map.Entry<Integer, Integer> floor = books.floorEntry(s), ceiling = books.ceilingEntry(s);\\n        if (floor != null && s < floor.getValue()) return false; // (s, e) start within floor\\n        if (ceiling != null && ceiling.getKey() < e) return false; // ceiling start within (s, e)\\n        books.put(s, e);\\n        return true;\\n    }\\n}\\n```\\n**C++**\\nordered set\\n```\\nclass MyCalendar {\\n    set<pair<int, int>> books;\\npublic:\\n    bool book(int s, int e) {\\n        auto next = books.lower_bound({s, e}); // first element with key not go before k (i.e., either it is equivalent or goes after).\\n        if (next != books.end() && next->first < e) return false; // a existing book started within the new book (next)\\n        if (next != books.begin() && s < (--next)->second) return false; // new book started within a existing book (prev)\\n        books.insert({ s, e });\\n        return true;\\n    }\\n};\\n```\\nordered map\\n```\\nclass MyCalendar {\\n    map<int, int> books;\\npublic:\\n    bool book(int s, int e) {\\n        auto next = books.lower_bound(s); // first element with key not go before k (i.e., either it is equivalent or goes after).\\n        if (next != books.end() && next->first < e) return false; // a existing book started within the new book (next)\\n        if (next != books.begin() && s < (--next)->second) return false; // new book started within a existing book (prev)\\n        books[s] = e;\\n        return true;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109476",
			"view":"744",
			"top":"2",
			"title":"Binary Search Tree python",
			"vote":"8",
			"content":"```\\nclass Node:\\n    def __init__(self,s,e):\\n        self.e = e\\n        self.s = s\\n        self.left = None\\n        self.right = None\\n\\n\\nclass MyCalendar(object):\\n\\n    def __init__(self):\\n        self.root = None\\n\\n    def book_helper(self,s,e,node):\\n        if s>=node.e:\\n            if node.right:\\n                return self.book_helper(s,e,node.right)\\n            else:\\n                node.right = Node(s,e)\\n                return True\\n        elif e<=node.s:\\n            if node.left:\\n                return self.book_helper(s,e,node.left)\\n            else:\\n                node.left = Node(s,e)\\n                return True\\n        else:\\n            return False\\n        \\n    def book(self, start, end):\\n        \"\"\"\\n        :type start: int\\n        :type end: int\\n        :rtype: bool\\n        \"\"\"\\n        if not self.root:\\n            self.root = Node(start,end)\\n            return True\\n        return self.book_helper(start,end,self.root)\\n        \\n        \\n        ```"
		},
		{
			"lc_ans_id":"109463",
			"view":"433",
			"top":"3",
			"title":"Short brute force python solution",
			"vote":"4",
			"content":"```\\nclass MyCalendar:\\n    def __init__(self):\\n        self.intervals = []\\n\\n    def book(self, start, end):\\n        for s, e in self.intervals:\\n            if not (start >= e or end <= s): return False\\n        self.intervals.append((start, end))\\n        return True\\n```"
		},
		{
			"lc_ans_id":"109493",
			"view":"287",
			"top":"4",
			"title":"A much smarter binarySearch algorithm",
			"vote":"3",
			"content":"    class MyCalendar {\\n    // algorithm 2017/11/19: keep intervals sorted, but we do not really care whether it is an accurate match; so long there is an overlapping, we deem the two intervals equals\\n    public MyCalendar() {\\n        \\n    }\\n    \\n    public boolean book(int start, int end) {\\n        assert start < end;\\n        Interval interval = new Interval(start, end-1);\\n        int foundIndex = Collections.binarySearch(entries, interval);\\n        if (foundIndex >= 0) {\\n            return false;\\n        }\\n        // insert and merge\\n        int insertPos = -(foundIndex+1);\\n        entries.add(insertPos, interval);\\n        // optionally merge\\n        return true;\\n    }\\n    \\n    private List<Interval> entries = new ArrayList<>();\\n    \\n    class Interval implements Comparable<Interval> {\\n        public Interval(int start, int end) {\\n            this.start = start;\\n            this.end   = end;\\n        }\\n        public int compareTo(Interval anotherInterval) {\\n            if (this.end < anotherInterval.start) {\\n                return -1;\\n            } else if (this.start > anotherInterval.end) {\\n                return 1;\\n            } else {\\n                return 0;       // intervals are equal so long they overlap\\n            }\\n        }\\n        \\n        int start;  // inclusive\\n        int end;    // inclusive\\n    }\\n    \\n    \\n    }"
		},
		{
			"lc_ans_id":"109473",
			"view":"53",
			"top":"5",
			"title":"[JAVA] Simple 6 line Solution, TreeMap lowerEntry",
			"vote":"1",
			"content":"```\\nclass MyCalendar {\\n    \\n    TreeMap tm;\\n\\n    public MyCalendar() {\\n        tm = new TreeMap<Integer, Integer>();\\n    }\\n    \\n    public boolean book(int start, int end) {\\n        Map.Entry<Integer, Integer> entry = tm.lowerEntry(end);\\n        if (entry != null && entry.getValue() > start) return false;\\n        tm.put(start, end);\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109481",
			"view":"91",
			"top":"6",
			"title":"c++ binary search",
			"vote":"1",
			"content":"```\\nclass MyCalendar {\\npublic:\\n    MyCalendar() {} \\n    bool book(int start, int end) {\\n        int p=0,st=0,en=arr.size()-1;\\n        while(st<=en){\\n            if(start<arr[st].first){p=st;break;}\\n            if(start>arr[en].first){p=en+1;break;}\\n            int mid=(st+en)>>1;\\n            if(start==arr[mid].first)return false;\\n            if(start<arr[mid].first)en=mid-1;\\n            else st=mid+1;\\n        }\\n        if((p>0&&start<arr[p-1].second)||(p<arr.size()&&end>arr[p].first))return false;\\n        arr.insert(arr.begin()+p,pair<int,int>(start,end));\\n        return true;\\n    }\\nprivate:\\n    vector<pair<int,int> >arr;\\n};\\n```"
		},
		{
			"lc_ans_id":"109461",
			"view":"3",
			"top":"7",
			"title":"O(log n) Check just one element in the map and not 2",
			"vote":"0",
			"content":"Observation is that if you store the elements in the map by `end` and not `start`, one can always query for the lower bound of the incoming interval's `start` timestamp, and check if this new interval overlaps with any interval already in the map which ends just at or after the new interval's `start` timestamp. If there is no overlap, then the existing interval will start strictly after the new interval (to be inserted) ends.\\n\\n```\\nclass MyCalendar {\\n    map<int, int> meetings;\\n    \\n    bool canBook(int start, int end) {\\n        --end;\\n        auto it = meetings.lower_bound(start);\\n        if (it == meetings.end()) return true;\\n        const auto itStart = it->second;\\n        const auto itEnd = it->first;\\n        // There is no overlap if the new interval ends before the existing interval begins\\n        return end < itStart;\\n    }\\npublic:\\n    MyCalendar() { }\\n\\n    bool book(int start, int end) {\\n        if (start == end) return true;\\n        if (canBook(start, end)) {\\n            meetings.insert(make_pair(end-1, start));\\n            return true;\\n        }\\n        return false;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109465",
			"view":"20",
			"top":"8",
			"title":"Java O(log(n)) solution",
			"vote":"0",
			"content":"We keep the starting points in a sorted map, and associate as value the\\ncorresponding ending point. When getting a new range, we search the starting\\npoints on the left and right; and for each case check whether we have an\\noverlapping.\\n\\nThere are a couple of special cases: where we have no one on the left, and when\\nwe have no one on the right. In such cases, we still need to validate there is\\nno overlapping using respectively the first and last entries.\\n\\n```\\nimport java.util.*;\\n\\nclass MyCalendar {\\n\\n    private TreeMap<Integer, Integer> slots;\\n\\n    public MyCalendar() {\\n        slots = new TreeMap<>();\\n    }\\n\\n    public boolean book(int start, int end) {\\n        Map.Entry<Integer, Integer> left = slots.floorEntry(start);\\n        if (left == null) {\\n            left = slots.firstEntry();\\n            if ( left != null && end > left.getKey() ) {\\n                return false;\\n            }\\n        } else if (left != null && start < left.getValue()) {\\n            return false;\\n        }\\n        Map.Entry<Integer, Integer> right = slots.ceilingEntry(start);\\n        if(right == null) {\\n            right = slots.lastEntry();\\n            if ( right != null && start < right.getValue()) {\\n                return false;\\n            }\\n        } else if(right != null && end > right.getKey()) {\\n            return false;\\n        }\\n        slots.put(start, end);\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109466",
			"view":"22",
			"top":"9",
			"title":"Python accepted insert sort",
			"vote":"0",
			"content":"```\\nclass MyCalendar(object):\\n\\n    def __init__(self):\\n        self.courses = []\\n\\n    def book(self, start, end):\\n        \"\"\"\\n        :type start: int\\n        :type end: int\\n        :rtype: bool\\n        \"\"\"\\n        for i in range(len(self.courses)):\\n            if self.courses[i][0] > start:\\n                if i == 0:\\n                    if end <= self.courses[i][0]:\\n                        self.courses.insert(i, [start, end])\\n                        return True\\n                    else:\\n                        return False\\n                else:\\n                    if start >= self.courses[i - 1][1] and end <= self.courses[i][0]:\\n                        self.courses.insert(i, [start, end])\\n                        return True\\n                    else:\\n                        return False\\n        if len(self.courses) != 0 and start < self.courses[-1][1]:\\n            return False\\n        self.courses.append([start, end])\\n        return True"
		}
	],
	"id":"695",
	"title":"My Calendar I",
	"content":"<p>\r\nImplement a <code>MyCalendar</code> class to store your events. A new event can be added if adding the event will not cause a double booking.\r\n</p><p>\r\nYour class will have the method, <code>book(int start, int end)</code>.  Formally, this represents a booking on the half open interval <code>[start, end)</code>, the range of real numbers <code>x</code> such that <code>start <= x < end</code>.\r\n</p><p>\r\nA <i>double booking</i> happens when two events have some non-empty intersection (ie., there is some time that is common to both events.)\r\n</p><p>\r\nFor each call to the method <code>MyCalendar.book</code>, return <code>true</code> if the event can be added to the calendar successfully without causing a double booking.  Otherwise, return <code>false</code> and do not add the event to the calendar.\r\n</p>\r\n\r\nYour class will be called like this:\r\n<code>MyCalendar cal = new MyCalendar();</code>\r\n<code>MyCalendar.book(start, end)</code>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\nMyCalendar();\r\nMyCalendar.book(10, 20); // returns true\r\nMyCalendar.book(15, 25); // returns false\r\nMyCalendar.book(20, 30); // returns true\r\n<b>Explanation:</b> \r\nThe first event can be booked.  The second can't because time 15 is already booked by another event.\r\nThe third event can be booked, as the first event takes every time less than 20, but not including 20.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>The number of calls to <code>MyCalendar.book</code> per test case will be at most <code>1000</code>.</li>\r\n<li>In calls to <code>MyCalendar.book(start, end)</code>, <code>start</code> and <code>end</code> are integers in the range <code>[0, 10^9]</code>.</li>\r\n</p>",
	"frequency":"66",
	"ac_num":"7335"
}