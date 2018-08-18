{
	"difficulty":"3",
	"submit_num":"4007",
	"show_id":"732",
	"leetcode_id":"732",
	"answers":[
		{
			"lc_ans_id":"109556",
			"view":"966",
			"top":"0",
			"title":"[Java/C++] Clean Code",
			"vote":"10",
			"content":"**Summarize**\\n`This is to find the maximum number of concurrent ongoing event at any time.`\\n\\nWe can log the `start` & `end` of each event on the timeline, each `start` add a new ongoing event at that time, each `end` terminate an ongoing event. Then we can scan the timeline to figure out the maximum number of ongoing event at any time.\\n\\nThe most intuitive data structure for `timeline` would be `array`, but the time spot we have could be very `sparse`, so we can use `sorted map` to simulate the time line to save space.\\n\\n**Java**\\n```\\nclass MyCalendarThree {\\n    private TreeMap<Integer, Integer> timeline = new TreeMap<>();\\n    public int book(int s, int e) {\\n        timeline.put(s, timeline.getOrDefault(s, 0) + 1); // 1 new event will be starting at [s]\\n        timeline.put(e, timeline.getOrDefault(e, 0) - 1); // 1 new event will be ending at [e];\\n        int ongoing = 0, k = 0;\\n        for (int v : timeline.values())\\n            k = Math.max(k, ongoing += v);\\n        return k;\\n    }\\n}\\n```\\n**C++**\\n```\\nclass MyCalendarThree {\\n    map<int, int> timeline;\\npublic:\\n    int book(int s, int e) {\\n        timeline[s]++; // 1 new event will be starting at [s]\\n        timeline[e]--; // 1 new event will be ending at [e];\\n        int ongoing = 0, k = 0;\\n        for (pair<int, int> t : timeline)\\n            k = max(k, ongoing += t.second);\\n        return k;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109569",
			"view":"288",
			"top":"1",
			"title":"Question explanation please",
			"vote":"4",
			"content":"Can some one explain me,\\n1. Why would *MyCalendarThree.book(5, 10);*  return 3 graphing it shows only one other overlap so it should be 2\\n2. And this sentence *\"Note that the last event locally causes a 2-booking, but the answer is still 3 because\\neg. [10, 20), [10, 40), and [5, 15) are still triple booked.\"* the last event refers to MyCalendarThree.book(25, 55); why would it locally return 2"
		},
		{
			"lc_ans_id":"109558",
			"view":"835",
			"top":"2",
			"title":"C++ O(n) method",
			"vote":"3",
			"content":"The logic is: let's walk though the start and end time points one by one in sorting order. If the point is start, increase one. If the point is end, decrease one.  The sum is always greater or equal than 0, and it is the overlap number between the previous time to the next time.\\n\\nThis method can be used to solve My Calendar I and II as well.\\n```\\nclass MyCalendarThree {\\npublic:\\n    MyCalendarThree() {\\n        \\n    }\\n    \\n    int book(int start, int end) {\\n        m[start]++;\\n        m[end]--;\\n        int res = 0;\\n        int cur = 0;\\n        for (auto & event: m)\\n        {\\n            cur += event.second;\\n            if (cur > res)\\n            {\\n                res = cur;\\n            }\\n        }\\n        return res;\\n    }\\nprivate:\\n    map<int, int> m;\\n};\\n\\n/**\\n * Your MyCalendarThree object will be instantiated and called as such:\\n * MyCalendarThree obj = new MyCalendarThree();\\n * int param_1 = obj.book(start,end);\\n */\\n```"
		},
		{
			"lc_ans_id":"109557",
			"view":"64",
			"top":"3",
			"title":"Build time -> count map and do NOT re-compute everything (beat 94%)",
			"vote":"1",
			"content":"Note that this is actually a data structure design problem, which means we should expect that method `book` will be invoked many times by client. However, I see many `O(N)` solutions with `std::map` re-compute overlap count at **ALL** event time stamps regardless of current event interval `[s, e)`. I think this is inefficient as a single event might typically only cover a few time stamps as the calendar size growing.\\n\\nActually, we could define `std::map<int, int>` directly to be from time stamp to overlap count, and only update counts in current time window `[s, e)`. Even though the asymptotic time complexity of `book` is still `O(N)`, it does not need to update data outside this time window.\\n\\nSome final thoughts: for data structure design problems, I think it is a good practice to define useful class variables, etc to make each API call as efficient as possible since the server side does not have control on how clients will consume the API's.\\n```cpp\\nclass MyCalendarThree \\n{\\nprivate:\\n    int _k; // max overlap count\\n    map<int, int> _kCount; // map: time stamp -> overlap count\\n    \\n    // insert time stamp t into map and copy previous time value\\n    map<int, int>::iterator insert(int t) \\n    {\\n        auto it_bool = _kCount.emplace(t,0); // O(logN)\\n        if (it_bool.second && it_bool.first != _kCount.begin())\\n            it_bool.first->second = prev(it_bool.first)->second;\\n\\n        return it_bool.first;\\n    }\\n    \\npublic:\\n    MyCalendarThree():_k(0) { }\\n    \\n    int book(int s, int e) \\n    {   // only update time in [s, e)\\n        for (auto i = insert(s), j = insert(e); i!=j; ++i) // O(itrs between i, j)\\n            _k = max(_k, ++(i->second));       \\n        return _k;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109567",
			"view":"250",
			"top":"4",
			"title":"C++ beats 100% for now",
			"vote":"1",
			"content":"59ms and beats 100% for now. My thought is refer to my solution of [My Calendar II](https://discuss.leetcode.com/topic/111879/65ms-beats-95-69-o-lgn-2n-2-map-binary-search)\\n```\\nclass MyCalendarThree {\\nprivate:\\n    map<int,int>intervals;\\n    int m=1;\\npublic:\\n    MyCalendarThree() {}\\n    int book(int start, int end) {\\n        map<int,int>::iterator it;\\n        bool f=0;\\n        int mt=0;\\n        tie(it,f)=intervals.emplace(start,1);\\n        if(!f)it->second++;\\n        else if(it!=intervals.begin())it->second=prev(it,1)->second+1;\\n        if(m<it->second)m=it->second;\\n        mt=it->second-1;it++;\\n        for(;it!=intervals.end()&&it->first<end;it++){\\n            mt=it->second;it->second++;\\n            if(m<it->second)m=it->second;\\n        }\\n        if(it->first!=end)intervals.emplace_hint(it,end,mt);\\n        return m;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109562",
			"view":"39",
			"top":"5",
			"title":"Use TreeMap java",
			"vote":"0",
			"content":"```java\\nclass MyCalendarThree {\\n    \\n    int max = 0;\\n    \\n    // invariant: tree[t] = # of concurrent events right after moment t\\n    TreeMap<Integer, Integer> tree;\\n\\n    public MyCalendarThree() {\\n        tree = new TreeMap<>();\\n    }\\n    \\n    public int book(int start, int end) {\\n        if (tree.get(start) == null) {\\n            Map.Entry<Integer, Integer> last = tree.floorEntry(start);\\n            if (last != null) {\\n                tree.put(start, last.getValue() + 1);\\n                max = Math.max(max, last.getValue() + 1);\\n            } else {\\n                tree.put(start, 1);\\n                max = Math.max(max, 1);\\n            }\\n        } else {\\n            tree.put(start, tree.get(start) + 1);\\n            max = Math.max(max, tree.get(start));\\n        }\\n        for (int time : tree.subMap(start, false, end, false).keySet()) {\\n            tree.put(time, tree.get(time) + 1);\\n            max = Math.max(max, tree.get(time));\\n        }\\n        if (tree.get(end) == null) {\\n            tree.put(end, tree.floorEntry(end).getValue() - 1);\\n            max = Math.max(max, tree.get(end));\\n        }\\n        \\n        return max;\\n    }\\n}\\n\\n/**\\n * Your MyCalendarThree object will be instantiated and called as such:\\n * MyCalendarThree obj = new MyCalendarThree();\\n * int param_1 = obj.book(start,end);\\n */\\n```"
		},
		{
			"lc_ans_id":"109563",
			"view":"31",
			"top":"6",
			"title":"Straightforward but slow python solution",
			"vote":"0",
			"content":"    class MyCalendarThree:\\n\\n    def __init__(self):\\n        self.start = []\\n        self.end = []\\n        \\n    def book(self, start, end):\\n        \"\"\"\\n        :type start: int\\n        :type end: int\\n        :rtype: int\\n        \"\"\"\\n        bisect.insort(self.start, start, 0, len(self.start))\\n        bisect.insort(self.end, end, 0, len(self.end))\\n        start_index = end_index = count = max_count = 0\\n        while start_index < len(self.start) and end_index < len(self.end):\\n            if self.start[start_index] < self.end[end_index]:\\n                start_index += 1\\n                count += 1\\n            else:\\n                end_index += 1\\n                count -= 1\\n            max_count = max(max_count, count)\\n        return max_count"
		},
		{
			"lc_ans_id":"109564",
			"view":"53",
			"top":"7",
			"title":"two sorted arrays solution based on Meeting Room II",
			"vote":"0",
			"content":"The idea is maintaining two sorted arrays to store the event starts and ends separately. For every new event, insert the start and end to the corresponding array and count the maximum event overlap according to the idea in a great solution of Meeting Room II. See the Meeting Room II solution and explanation at https://discuss.leetcode.com/topic/30610/super-easy-java-solution-beats-98-8, https://discuss.leetcode.com/topic/35253/explanation-of-super-easy-java-solution-beats-98-8-from-pinkfloyda/24. \\n\\n```\\nclass MyCalendarThree {\\nprivate:\\n    vector<int> starts;\\n    vector<int> ends;\\npublic:\\n    MyCalendarThree() {\\n        \\n    }\\n    \\n    int book(int start, int end) {\\n        auto it1 = lower_bound(starts.begin(), starts.end(), start);\\n        starts.insert(it1, start);\\n        auto it2 = lower_bound(ends.begin(), ends.end(), end);\\n        ends.insert(it2, end);\\n        int res = 0, idx = 0;\\n        for(int i = 0; i < starts.size(); i++){\\n            if(starts[i] >= ends[idx]) idx++;\\n            else res++;            \\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109565",
			"view":"56",
			"top":"8",
			"title":"Interval Tree solution",
			"vote":"0",
			"content":"Below is an recursive interval tree solution  with comments. \\n\\n'''\\nclass MyCalendarThree {\\npublic:\\n    \\n    class MyEvent{\\n    public:\\n        MyEvent(int s,int e,int cnt=1):start(s),end(e),count(cnt){\\n            left = NULL;\\n            right = NULL;\\n            //max = e;\\n        }\\n        \\n        int start;\\n        int end;\\n        int count = 0;\\n        MyEvent* left;\\n        MyEvent* right;\\n        //int max;\\n    };\\n    \\n    int insert(int s, int e, MyEvent* root, int cnt=1){\\n        MyEvent* cur = root;\\n        //cur->max = max(e,root->max); // update max of the current node\\n        int maxcnt = cnt;\\n        //     s--------------e \\n        //                        cur->s-----------cur->e\\n        if(cur->start>=e){// left\\n            if(cur->left==NULL)\\n                cur->left = new MyEvent(s,e,cnt);\\n            else\\n                maxcnt = insert(s,e,cur->left,cnt);\\n        }\\n        //                                 s--------------e \\n        //     cur->s-----------cur->e\\n        else if(cur->end<=s){// right\\n            if(cur->right==NULL)\\n                cur->right = new MyEvent(s,e,cnt);\\n            else\\n                maxcnt = insert(s,e,cur->right,cnt);\\n        }\\n        else{\\n            int idx[4] = {s,e,cur->start,cur->end};\\n            sort(idx,idx+4);\\n            \\n            if(idx[0]!=idx[1]){\\n                //default\\n                //     s----------------\\n                //         cur->s-------\\n                cnt = 1;\\n                \\n                //                s-----\\n                //     cur->s-----------\\n                if(idx[0] >= cur->start) \\n                    cnt = cur->count;\\n                if(cur->left){\\n                    int tmp = insert(idx[0],idx[1],cur->left,cnt);\\n                    maxcnt = tmp > maxcnt? tmp:maxcnt;\\n                }\\n                else\\n                    cur->left = new MyEvent(idx[0],idx[1],cnt);\\n            }\\n            if(idx[2]!=idx[3]){\\n                //default\\n                //  ------------------e\\n                //  -------cur->e\\n                cnt = 1;\\n                //  -------e\\n                //  -------------cur->e\\n                if(idx[3] <= cur->end) \\n                    cnt = cur->count;\\n                if (cur->right){\\n                    int tmp = insert(idx[2],idx[3],cur->right,cnt);\\n                    maxcnt = tmp > maxcnt? tmp:maxcnt;\\n                }\\n                else\\n                    cur->right = new MyEvent(idx[2],idx[3],cnt);\\n            }\\n                \\n            cur->start = idx[1];\\n            cur->end = idx[2];\\n            cur->count++;\\n            maxcnt = cur->count>maxcnt?cur->count:maxcnt;\\n        } \\n        if(gMaxCnt<maxcnt)\\n            gMaxCnt = maxcnt;\\n        return gMaxCnt;\\n    }\\n    \\n    MyCalendarThree() {\\n        root = new MyEvent(0,0);\\n    }\\n    \\n    int book(int start, int end) {\\n        return insert(start,end, root);\\n    }\\n    MyEvent* root;\\n    int gMaxCnt = 0; // K\\n}\\n'''"
		},
		{
			"lc_ans_id":"109566",
			"view":"45",
			"top":"9",
			"title":"Binary searches over adjacent non-overlapping intervals",
			"vote":"0",
			"content":"```\\nclass MyCalendarThree {\\nprivate:\\n\\tmap<int, pair<int, int>> m;\\n\\tint maxK;\\n\\tconst int minPos = 0;\\n\\tconst int maxPos = 1000000000;\\n\\npublic:\\n\\tMyCalendarThree() {\\n\\t\\tm.emplace(minPos, make_pair(maxPos, 0));\\n\\t\\tmaxK = 0;\\n\\t}\\n\\n\\tint book(int start, int end) {\\n\\t\\tauto lb1 = prev(m.upper_bound(start));\\n\\t\\tint s1 = lb1->first;\\n\\t\\tauto p1 = lb1->second;\\n\\t\\tif (s1 < start) {\\n\\t\\t\\tlb1->second = make_pair(start, p1.second);\\n\\t\\t}\\n        else {\\n\\t\\t    m.erase(lb1);            \\n        }\\n\\n\\t\\tif (start < p1.first) {\\n\\t\\t\\tm.emplace(start, make_pair(p1.first, p1.second));\\n\\t\\t}\\n\\n\\t\\tauto lb2 = prev(m.upper_bound(end));\\n\\t\\tint s2 = lb2->first;\\n\\t\\tauto p2 = lb2->second;\\n\\t\\tif (s2 < end) {\\n\\t\\t\\tlb2->second = make_pair(end, p2.second);\\n\\t\\t}\\n        else {\\n\\t\\t    m.erase(lb2);            \\n        }\\n        \\n\\t\\tif (p2.first > end) {\\n\\t\\t\\tm.emplace(end, make_pair(p2.first, p2.second));\\n\\t\\t}\\n\\n\\n\\t\\tlb1 = m.find(start);\\n\\t\\tlb2 = m.find(end);\\n\\n\\t\\twhile (lb1 != lb2) {\\n\\t\\t\\tmaxK = max(maxK, ++lb1->second.second);\\n\\t\\t\\t++lb1;\\n\\t\\t}\\n\\n\\t\\treturn maxK;\\n\\t}\\n}; \\n```"
		}
	],
	"id":"698",
	"title":"My Calendar III",
	"content":"<p>\r\nImplement a <code>MyCalendarThree</code> class to store your events. A new event can <b>always</b> be added.\r\n</p><p>\r\nYour class will have one method, <code>book(int start, int end)</code>.  Formally, this represents a booking on the half open interval <code>[start, end)</code>, the range of real numbers <code>x</code> such that <code>start <= x < end</code>.\r\n</p><p>\r\nA <i>K-booking</i> happens when <b>K</b> events have some non-empty intersection (ie., there is some time that is common to all K events.)\r\n</p><p>\r\nFor each call to the method <code>MyCalendar.book</code>, return an integer <code>K</code> representing the largest integer such that there exists a <code>K</code>-booking in the calendar.\r\n</p>\r\n\r\nYour class will be called like this:\r\n<code>MyCalendarThree cal = new MyCalendarThree();</code>\r\n<code>MyCalendarThree.book(start, end)</code>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\nMyCalendarThree();\r\nMyCalendarThree.book(10, 20); // returns 1\r\nMyCalendarThree.book(50, 60); // returns 1\r\nMyCalendarThree.book(10, 40); // returns 2\r\nMyCalendarThree.book(5, 15); // returns 3\r\nMyCalendarThree.book(5, 10); // returns 3\r\nMyCalendarThree.book(25, 55); // returns 3\r\n<b>Explanation:</b> \r\nThe first two events can be booked and are disjoint, so the maximum K-booking is a 1-booking.\r\nThe third event [10, 40) intersects the first event, and the maximum K-booking is a 2-booking.\r\nThe remaining events cause the maximum K-booking to be only a 3-booking.\r\nNote that the last event locally causes a 2-booking, but the answer is still 3 because\r\neg. [10, 20), [10, 40), and [5, 15) are still triple booked.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>The number of calls to <code>MyCalendarThree.book</code> per test case will be at most <code>400</code>.</li>\r\n<li>In calls to <code>MyCalendarThree.book(start, end)</code>, <code>start</code> and <code>end</code> are integers in the range <code>[0, 10^9]</code>.</li>\r\n</p>",
	"frequency":"186",
	"ac_num":"2157"
}