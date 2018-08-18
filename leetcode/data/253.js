{
	"difficulty":"2",
	"submit_num":"150132",
	"show_id":"253",
	"leetcode_id":"253",
	"answers":[
		{
			"lc_ans_id":"67857",
			"view":"37970",
			"top":"0",
			"title":"AC Java solution using min heap",
			"vote":"157",
			"content":"Just want to share another idea that uses min heap, average time complexity is O(nlogn).\\n\\n    public int minMeetingRooms(Interval[] intervals) {\\n        if (intervals == null || intervals.length == 0)\\n            return 0;\\n            \\n        // Sort the intervals by start time\\n        Arrays.sort(intervals, new Comparator<Interval>() {\\n            public int compare(Interval a, Interval b) { return a.start - b.start; }\\n        });\\n        \\n        // Use a min heap to track the minimum end time of merged intervals\\n        PriorityQueue<Interval> heap = new PriorityQueue<Interval>(intervals.length, new Comparator<Interval>() {\\n            public int compare(Interval a, Interval b) { return a.end - b.end; }\\n        });\\n        \\n        // start with the first meeting, put it to a meeting room\\n        heap.offer(intervals[0]);\\n        \\n        for (int i = 1; i < intervals.length; i++) {\\n            // get the meeting room that finishes earliest\\n            Interval interval = heap.poll();\\n            \\n            if (intervals[i].start >= interval.end) {\\n                // if the current meeting starts right after \\n                // there's no need for a new room, merge the interval\\n                interval.end = intervals[i].end;\\n            } else {\\n                // otherwise, this meeting needs a new room\\n                heap.offer(intervals[i]);\\n            }\\n            \\n            // don't forget to put the meeting room back\\n            heap.offer(interval);\\n        }\\n        \\n        return heap.size();\\n    }"
		},
		{
			"lc_ans_id":"67855",
			"view":"23885",
			"top":"1",
			"title":"Explanation of \"Super Easy Java Solution Beats 98.8%\" from @pinkfloyda",
			"vote":"143",
			"content":"The solution is proposed by @pinkfloyda at [\"Super Easy Java Solution Beats 98.8%\"][1] , which is amazing.\\n\\nHere I would like to explain why it works a little bit.\\n\\nThe code from @pinkfloyda:\\n\\n    public class Solution {\\n        public int minMeetingRooms(Interval[] intervals) {\\n            int[] starts = new int[intervals.length];\\n            int[] ends = new int[intervals.length];\\n            for(int i=0; i<intervals.length; i++) {\\n                starts[i] = intervals[i].start;\\n                ends[i] = intervals[i].end;\\n            }\\n            Arrays.sort(starts);\\n            Arrays.sort(ends);\\n            int rooms = 0;\\n            int endsItr = 0;\\n            for(int i=0; i<starts.length; i++) {\\n                if(starts[i]<ends[endsItr])\\n                    rooms++;\\n                else\\n                    endsItr++;\\n            }\\n            return rooms;\\n        }\\n    }\\n\\nTo understand why it works, first let\\u2019s define two events:\\nMeeting Starts\\nMeeting Ends\\n\\nNext, we acknowledge three facts:\\nThe numbers of the intervals give chronological orders\\nWhen an ending event occurs, there must be a starting event has happened before that, where \\u201chappen before\\u201d is defined by the chronological orders given by the intervals\\nMeetings that started which haven\\u2019t ended yet have to be put into different meeting rooms, and the number of rooms needed is the number of such meetings\\n\\nSo, what this algorithm works as follows:\\n\\nfor example, we have meetings that span along time as follows:\\n\\n    |_____|\\n          |______|\\n    |________|\\n            |_______|\\n\\nThen, the start time array and end time array after sorting appear like follows:\\n\\n    ||    ||\\n         |   |   |  |\\n\\nInitially, `endsItr` points to the first end event, and we move `i` which is the start event pointer. As we examine the start events, we\\u2019ll find the first two start events happen before the end event that `endsItr` points to, so we need two rooms (we magically created two rooms), as shown by the variable rooms. Then, as `i` points to the third start event, we\\u2019ll find that this event happens after the end event pointed by `endsItr`, then we increment `endsItr` so that it points to the next end event. What happens here can be thought of as one of the two previous meetings ended, and we moved the newly started meeting into that vacant room, thus we don\\u2019t need to increment rooms at this time and move both of the pointers forward.\\nNext, because `endsItr` moves to the next end event, we\\u2019ll find that the start event pointed by `i` happens before the end event pointed by `endsItr`. Thus, now we have 4 meetings started but only one ended, so we need one more room. And it goes on as this.\\n\\n\\n  [1]: https://leetcode.com/discuss/71846/super-easy-java-solution-beats-98-8%25"
		},
		{
			"lc_ans_id":"67860",
			"view":"9910",
			"top":"2",
			"title":"My Python Solution With Explanation",
			"vote":"59",
			"content":"     # Very similar with what we do in real life. Whenever you want to start a meeting, \\n     # you go and check if any empty room available (available > 0) and\\n     # if so take one of them ( available -=1 ). Otherwise,\\n     # you need to find a new room someplace else ( numRooms += 1 ).  \\n     # After you finish the meeting, the room becomes available again ( available += 1 ).\\n     \\n     def minMeetingRooms(self, intervals):\\n            starts = []\\n            ends = []\\n            for i in intervals:\\n                starts.append(i.start)\\n                ends.append(i.end)\\n            \\n            starts.sort()\\n            ends.sort()\\n            s = e = 0\\n            numRooms = available = 0\\n            while s < len(starts):\\n                if starts[s] < ends[e]:\\n                    if available == 0:\\n                        numRooms += 1\\n                    else:\\n                        available -= 1\\n                        \\n                    s += 1\\n                else:\\n                    available += 1\\n                    e += 1\\n            \\n            return numRooms"
		},
		{
			"lc_ans_id":"67883",
			"view":"7563",
			"top":"3",
			"title":"Super Easy Java Solution Beats 98.8%",
			"vote":"46",
			"content":"    public class Solution {\\n        public int minMeetingRooms(Interval[] intervals) {\\n            int[] starts = new int[intervals.length];\\n            int[] ends = new int[intervals.length];\\n            for(int i=0; i<intervals.length; i++) {\\n                starts[i] = intervals[i].start;\\n                ends[i] = intervals[i].end;\\n            }\\n            Arrays.sort(starts);\\n            Arrays.sort(ends);\\n            int rooms = 0;\\n            int endsItr = 0;\\n            for(int i=0; i<starts.length; i++) {\\n                if(starts[i]<ends[endsItr])\\n                    rooms++;\\n                else\\n                    endsItr++;\\n            }\\n            return rooms;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67996",
			"view":"9653",
			"top":"4",
			"title":"C++, O(n log n), 584+ ms, 3 solutions",
			"vote":"45",
			"content":"First collect the changes: at what times the number of meetings goes up or down and by how much. Then go through those changes in ascending order and keep track of the current and maximum number of rooms needed.\\n\\n---\\n\\n**Solution 1: Using `map`** ... 600 ms\\n\\n    int minMeetingRooms(vector<Interval>& intervals) {\\n        map<int, int> changes;\\n        for (auto i : intervals) {\\n            changes[i.start] += 1;\\n            changes[i.end] -= 1;\\n        }\\n        int rooms = 0, maxrooms = 0;\\n        for (auto change : changes)\\n            maxrooms = max(maxrooms, rooms += change.second);\\n        return maxrooms;\\n    }\\n\\n---\\n\\n**Solution 2: Using `vector`** ... 588 ms\\n\\n    int minMeetingRooms(vector<Interval>& intervals) {\\n        vector<pair<int, int>> changes;\\n        for (auto i : intervals) {\\n            changes.push_back({i.start, 1});\\n            changes.push_back({i.end, -1});\\n        };\\n        sort(begin(changes), end(changes));\\n        int rooms = 0, maxrooms = 0;\\n        for (auto change : changes)\\n            maxrooms = max(maxrooms, rooms += change.second);\\n        return maxrooms;\\n    }\\n\\n---\\n\\n**Solution 3: Using two `vector`s** ... 584 ms\\n\\nBased on [yinfeng.zhang.9's Python solution](https://leetcode.com/discuss/50793/my-python-solution-with-explanation). Uses separate vectors for start and end times, which ends up consistently being fastest. I'm guessing it's mostly because working with ints is simpler than working with pairs of ints. The initial sorting also needs fewer steps, 2(nlogn) instead of (2n)log(2n), but I think the added merging in the later loop cancels that advantage out.\\n\\n    int minMeetingRooms(vector<Interval>& intervals) {\\n        vector<int> starts, ends;\\n        for (auto i : intervals) {\\n            starts.push_back(i.start);\\n            ends.push_back(i.end);\\n        }\\n        sort(begin(starts), end(starts));\\n        sort(begin(ends), end(ends));\\n        int e = 0, rooms = 0, available = 0;\\n        for (int start : starts) {\\n            while (ends[e] <= start) {\\n                ++e;\\n                ++available;\\n            }\\n            available ? --available : ++rooms;\\n        }\\n        return rooms;\\n    }"
		},
		{
			"lc_ans_id":"67866",
			"view":"3719",
			"top":"5",
			"title":"C++ solution using a map.  total 11 lines",
			"vote":"36",
			"content":"\\nclass Solution {\\npublic:\\n    int minMeetingRooms(vector<Interval>& intervals) {\\n        map<int, int> mp; // key: time;  val: +1 if start, -1 if end\\n        \\n        for(int i=0; i< intervals.size(); i++) {\\n            mp[intervals[i].start] ++;\\n            mp[intervals[i].end] --;\\n        }\\n        \\n        int cnt = 0, maxCnt = 0;\\n        for(auto it = mp.begin(); it != mp.end(); it++) {\\n            cnt += it->second;\\n            maxCnt = max( cnt, maxCnt);\\n        }\\n        \\n        return maxCnt;\\n    }\\n};"
		},
		{
			"lc_ans_id":"67920",
			"view":"3669",
			"top":"6",
			"title":"[Java] Another thinking: process event queue",
			"vote":"34",
			"content":"Simulate event queue procession. Create event for each `start` and `end` of intervals. Then for `start` event, open one more room;  for `end` event, close one meeting room. At the same time, update the most rooms that is required.\\n\\nBe careful of events like `[(end at 11), (start at 11)]`. Put `end` before `start` event when they share the same happening time, so that two events can share one meeting room.\\n\\n\\n    public class Solution {\\n        \\n        private static final int START = 1;\\n    \\n        private static final int END = 0;\\n        \\n        private class Event {\\n            int time;\\n            int type; // end event is 0; start event is 1\\n    \\n            public Event(int time, int type) {\\n                this.time = time;\\n                this.type = type;\\n            }\\n        }\\n        \\n        public int minMeetingRooms(Interval[] intervals) {\\n            int rooms = 0; // occupied meeting rooms\\n            int res = 0;\\n    \\n            // initialize an event queue based on event's happening time\\n            Queue<Event> events = new PriorityQueue<>(new Comparator<Event>() {\\n                @Override\\n                public int compare(Event e1, Event e2) {\\n                    // for same time, let END event happens first to save rooms\\n                    return e1.time != e2.time ? \\n                           e1.time - e2.time : e1.type - e2.type;\\n                }\\n            });\\n    \\n            // create event and push into event queue\\n            for (Interval interval : intervals) {\\n                events.offer(new Event(interval.start, START));\\n                events.offer(new Event(interval.end, END));\\n            }\\n            \\n            // process events\\n            while (!events.isEmpty()) {\\n                Event event = events.poll();\\n                if (event.type == START) {\\n                    rooms++;\\n                    res = Math.max(res, rooms);\\n                } else {\\n                    rooms--; \\n                }\\n            }\\n            \\n            return res;\\n        }\\n    \\n    }"
		},
		{
			"lc_ans_id":"67917",
			"view":"2054",
			"top":"7",
			"title":"Python heap solution with comments.",
			"vote":"22",
			"content":"        \\n    def minMeetingRooms(self, intervals):\\n        intervals.sort(key=lambda x:x.start)\\n        heap = []  # stores the end time of intervals\\n        for i in intervals:\\n            if heap and i.start >= heap[0]: \\n                # means two intervals can use the same room\\n                heapq.heapreplace(heap, i.end)\\n            else:\\n                # a new room is allocated\\n                heapq.heappush(heap, i.end)\\n        return len(heap)"
		},
		{
			"lc_ans_id":"67989",
			"view":"1655",
			"top":"8",
			"title":"Concise C++ Solution with min_heap, sort, greedy",
			"vote":"15",
			"content":"    // greedy : always change the smallest end time;\\n    // heap : min_heap\\n    // sort : sort the intervals by start time O(nlogn)\\n    int minMeetingRooms(vector<Interval>& intervals) {\\n        sort(intervals.begin(), intervals.end(), [](Interval &i, Interval &j){return i.start < j.start;});\\n        priority_queue<int, vector<int>, greater<int>> min_heap;\\n        for(auto interval : intervals){\\n            if(!min_heap.empty() && min_heap.top() <= interval.start) min_heap.pop();\\n            min_heap.push(interval.end);\\n        }\\n        return min_heap.size();\\n    }"
		},
		{
			"lc_ans_id":"68004",
			"view":"1422",
			"top":"9",
			"title":"Super easy Java solution using TreeMap",
			"vote":"11",
			"content":"    public class Solution {\\n        public int minMeetingRooms(Interval[] intervals) {\\n            Map<Integer, Integer> map = new TreeMap<Integer, Integer>(); // Sort Key based on nature order\\n            for (Interval i : intervals) {\\n                if (map.containsKey(i.start)) {\\n                    map.put(i.start, map.get(i.start)+1);\\n                } else {\\n                    map.put(i.start, 1);\\n                }\\n                if (map.containsKey(i.end)) {\\n                    map.put(i.end, map.get(i.end)-1);\\n                } else {\\n                    map.put(i.end, -1);\\n                }\\n            }\\n            int maxRoom = 0; int curRoom = 0;\\n            for (int i : map.keySet()) {\\n                maxRoom = Math.max(maxRoom, curRoom += map.get(i));\\n            }\\n            return maxRoom;\\n        }\\n    }"
		}
	],
	"id":"253",
	"title":"Meeting Rooms II",
	"content":"<p>Given an array of meeting time intervals consisting of start and end times <code>[[s1,e1],[s2,e2],...]</code> (s<sub>i</sub> < e<sub>i</sub>), find the minimum number of conference rooms required.</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven <code>[[0, 30],[5, 10],[15, 20]]</code>,<br />\r\nreturn <code>2</code>.\r\n</p>",
	"frequency":"375",
	"ac_num":"59378"
}