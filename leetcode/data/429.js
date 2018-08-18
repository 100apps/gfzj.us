{
	"difficulty":"2",
	"submit_num":"45880",
	"show_id":"435",
	"leetcode_id":"435",
	"answers":[
		{
			"lc_ans_id":"91713",
			"view":"12620",
			"top":"0",
			"title":"Java: Least is Most",
			"vote":"62",
			"content":"Actually, the problem is the same as \"Given a collection of intervals, find the maximum number of intervals that are non-overlapping.\" (the classic Greedy problem: [Interval Scheduling](https://en.wikipedia.org/wiki/Interval_scheduling#Interval_Scheduling_Maximization)). With the solution to that problem, guess how do we get the minimum number of intervals to remove? : )\\n\\nSorting Interval.end in ascending order is O(nlogn), then traverse intervals array to get the maximum number of non-overlapping intervals is O(n). Total is O(nlogn).\\n\\n```\\n    public int eraseOverlapIntervals(Interval[] intervals) {\\n        if (intervals.length == 0)  return 0;\\n\\n        Arrays.sort(intervals, new myComparator());\\n        int end = intervals[0].end;\\n        int count = 1;        \\n\\n        for (int i = 1; i < intervals.length; i++) {\\n            if (intervals[i].start >= end) {\\n                end = intervals[i].end;\\n                count++;\\n            }\\n        }\\n        return intervals.length - count;\\n    }\\n    \\n    class myComparator implements Comparator<Interval> {\\n        public int compare(Interval a, Interval b) {\\n            return a.end - b.end;\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"91721",
			"view":"2556",
			"top":"1",
			"title":"Short Ruby and Python",
			"vote":"18",
			"content":"Which interval would be the best **first** (leftmost) interval to keep? One that ends first, as it leaves the most room for the rest. So take one with smallest `end`, remove all the bad ones overlapping it, and repeat (taking the one with smallest `end` of the remaining ones). For the overlap test, just keep track of the current end, initialized with negative infinity.\\n\\n## Ruby\\nTake out intervals as described above, so what's left is the bad overlapping ones, so just return their number.\\n```\\ndef erase_overlap_intervals(intervals)\\n  end_ = -1.0 / 0\\n  intervals.sort_by(&:end).reject { |i|\\n    end_ = i.end if i.start >= end_\\n  }.size\\nend\\n```\\nAlternatively, `i.start >= end_ and end_ = i.end` works, too.\\n\\n## Python\\n\\n    def eraseOverlapIntervals(self, intervals):\\n        end = float('-inf')\\n        erased = 0\\n        for i in sorted(intervals, key=lambda i: i.end):\\n            if i.start >= end:\\n                end = i.end\\n            else:\\n                erased += 1\\n        return erased"
		},
		{
			"lc_ans_id":"91771",
			"view":"3444",
			"top":"2",
			"title":"Java Solution with clear explain",
			"vote":"11",
			"content":"First we sort the array by below rules\\n- `1) sort by end, smaller end in front`\\n- `2) if end is same, sort by start, bigger start in front`\\n\\nThen, visited array by end. If we visited next closest end interval, access the bigger start priority.\\n\\n```\\n/**\\n     * 16 / 16 test cases passed\\n     * Status: Accepted\\n     * Runtime: 9 - 10 ms\\n     *\\n     * @param intervals\\n     * @return\\n     */\\npublic int eraseOverlapIntervals(Interval[] intervals) {\\n        Arrays.sort(intervals, new Comparator<Interval>() {\\n            @Override\\n            public int compare(Interval o1, Interval o2) {\\n                if (o1.end != o2.end) return o1.end - o2.end;  //first sort by end\\n                return o2.start - o1.start;  //second sort by start\\n            }\\n        });\\n\\n        int end = Integer.MIN_VALUE;\\n        int count = 0;\\n        for (Interval interval : intervals) {\\n            if (interval.start >= end) end = interval.end;\\n            else count++;\\n        }\\n\\n        return count;\\n    }\\n```"
		},
		{
			"lc_ans_id":"91700",
			"view":"4524",
			"top":"3",
			"title":"Concise C++ Solution",
			"vote":"11",
			"content":"```\\nclass Solution {\\npublic:\\n    int eraseOverlapIntervals(vector<Interval>& intervals) {\\n        auto comp = [](const Interval& i1, const Interval& i2){ return i1.start < i2.start; };\\n        sort(intervals.begin(), intervals.end(), comp);\\n        int res = 0, pre = 0;\\n        for (int i = 1; i < intervals.size(); i++) {\\n            if (intervals[i].start < intervals[pre].end) {\\n                res++;\\n                if (intervals[i].end < intervals[pre].end) pre = i;\\n            }\\n            else pre = i;\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"91768",
			"view":"1628",
			"top":"4",
			"title":"Python greedy solution with explanation",
			"vote":"7",
			"content":"Sort the intervals by their start time. If two intervals overlap, the interval with larger end time will be removed so as to have as little impact on subsequent intervals as possible.\\n```\\ndef eraseOverlapIntervals(self, intervals):\\n        \"\"\"\\n        :type intervals: List[Interval]\\n        :rtype: int\\n        \"\"\"\\n        if not intervals: return 0\\n        intervals.sort(key=lambda x: x.start)  # sort on start time\\n        currEnd, cnt = intervals[0].end, 0\\n        for x in intervals[1:]:\\n            if x.start < currEnd:  # find overlapping interval\\n                cnt += 1\\n                currEnd = min(currEnd, x.end)  # erase the one with larger end time\\n            else:\\n                currEnd = x.end   # update end time\\n        return cnt\\n```"
		},
		{
			"lc_ans_id":"91772",
			"view":"315",
			"top":"5",
			"title":"Simple Solution",
			"vote":"5",
			"content":"1. Order intervals by start point.\\n2. Record the end of the last valid interval.\\n3. For each interval, if is start point is >= the end of the last valid interval, increment the count of valid intervals, and move the end point to the end of the current interval. Otherwise just set the new end point to the minimum between the two overlapping intervals.\\n4. Return the difference between the number of intervals in the input array and the number of valid intervals you found in the previous way.\\n\\nHere is my implementation:\\n```\\npublic int eraseOverlapIntervals(Interval[] intervals) {\\n\\tif(intervals==null || intervals.length==0) return 0;\\n\\tArrays.sort(intervals, new Comparator<Interval>() {\\n\\t\\tpublic int compare(Interval i1, Interval i2) {\\n\\t\\t\\treturn i1.start-i2.start;\\n\\t\\t}\\n\\t});\\n\\tint count=1;\\n\\tint lastEnd = intervals[0].end;\\n\\tfor(int i=1;i<intervals.length;i++) {\\n\\t\\tInterval currentInterval = intervals[i];\\n\\t\\tif(currentInterval.start>=lastEnd) {\\n\\t\\t\\tcount++;\\n\\t\\t\\tlastEnd=currentInterval.end;\\n\\t\\t} else {\\n\\t\\t\\tlastEnd=Math.min(currentInterval.end,lastEnd);\\n\\t\\t}\\n\\t}\\n\\treturn intervals.length-count;\\n}\\n```"
		},
		{
			"lc_ans_id":"91703",
			"view":"54",
			"top":"6",
			"title":"Simplest greedy approach so far...",
			"vote":"2",
			"content":"Steps:\\n1. Sort intervals by end\\n2. fix end to be end of first interval and until start of next interval is smaller than this end, keep incrementing the count which means remove all those intervals\\n3. once an interval is found with start >= end (end fixed above), update the end with end of this interval\\n\\n```\\nclass Solution(object):\\n    def eraseOverlapIntervals(self, intervals):\\n        \"\"\"\\n        :type intervals: List[Interval]\\n        :rtype: int\\n        \"\"\"\\n        if not intervals: \\n            return 0\\n        intervals = sorted(intervals, key=lambda x: (x.end,x.start))\\n        end = intervals[0].end\\n        j = 1\\n        cnt = 0\\n        \\n        while(j < len(intervals)):\\n            if intervals[j].start < end:\\n                cnt += 1 \\n            else:\\n                end = intervals[j].end\\n            j += 1\\n        return cnt\\n```"
		},
		{
			"lc_ans_id":"91745",
			"view":"186",
			"top":"7",
			"title":"java O(n^2) using DP [Accepted]",
			"vote":"2",
			"content":"```java\\npublic class Solution {\\n    class myComparator implements Comparator<Interval> {\\n        public int compare(Interval a, Interval b) {\\n            return a.start - b.start;\\n        }\\n    }\\n    public boolean isOverlapping(Interval i, Interval j) {\\n        return i.end > j.start;\\n    }\\n    public int eraseOverlapIntervals(Interval[] intervals) {\\n        if (intervals.length == 0) {\\n            return 0;\\n        }\\n        Arrays.sort(intervals, new myComparator());\\n        int dp[] = new int[intervals.length];\\n        dp[0] = 1;\\n        int ans = 1;\\n        for (int i = 1; i < dp.length; i++) {\\n            int max = 0;\\n            for (int j = i - 1; j >= 0; j--) {\\n                if (!isOverlapping(intervals[j], intervals[i])) {\\n                    max = Math.max(dp[j], max);\\n                }\\n            }\\n            dp[i] = max + 1;\\n            ans = Math.max(ans, dp[i]);\\n\\n        }\\n        return intervals.length - ans;\\n    }\\n}"
		},
		{
			"lc_ans_id":"91786",
			"view":"659",
			"top":"8",
			"title":"Java O(nlogn) very easy solution",
			"vote":"2",
			"content":"1. Sort Intervals by end.\\n2. Count valid intervals (non-overlapping).\\n3. Answer is len - count\\n\\n\\n    public int eraseOverlapIntervals(Interval[] intervals) {\\n        if (intervals == null || intervals.length == 0) return 0;\\n        \\n        Arrays.sort(intervals, new Comparator<Interval>() {\\n            public int compare(Interval o1, Interval o2) {\\n                return o1.end - o2.end;\\n            }\\n        });\\n        \\n        int count = 1;\\n        int last = 0;\\n        for (int i = 1; i < intervals.length; i++) {\\n            if (intervals[last].end <= intervals[i].start) {\\n                count++;\\n                last = i;\\n            }\\n        }\\n        return intervals.length - count;\\n        \\n    }"
		},
		{
			"lc_ans_id":"91787",
			"view":"924",
			"top":"9",
			"title":"O(nlogn) java solution,",
			"vote":"2",
			"content":"used similar logic to \"Merge Inteval\" problem in leetcode to solve this problem.\\nhttps://discuss.leetcode.com/topic/4319/a-simple-java-solution/2\\n\\n```\\npublic int eraseOverlapIntervals(Interval[] intervals) {\\n        if (intervals == null || intervals.length < 2){\\n            return 0;\\n        }\\n        \\n        //sort based on start time of the interval\\n        Arrays.sort(intervals, new Comparator<Interval>(){\\n            @Override\\n            public int compare(Interval e0, Interval e1){\\n                return Integer.compare(e0.start, e1.start);\\n            }\\n        });\\n        \\n        int n = intervals.length;\\n        int endLast = intervals[0].end;\\n        \\n        int ret = 0;\\n        for (int i = 1; i < n; i++){\\n           int incremental = endLast > intervals[i].start? +1: 0;\\n           endLast  = incremental == 1? Math.min(endLast, intervals[i].end): intervals[i].end;\\n           ret += incremental;\\n        }\\n        return ret;\\n    }\\n```"
		}
	],
	"id":"429",
	"title":"Non-overlapping Intervals",
	"content":"<p>\r\nGiven a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\n<ol>\r\n<li>You may assume the interval's end point is always bigger than its start point.</li>\r\n<li>Intervals like [1,2] and [2,3] have borders \"touching\" but they don't overlap each other.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [ [1,2], [2,3], [3,4], [1,3] ]\r\n\r\n<b>Output:</b> 1\r\n\r\n<b>Explanation:</b> [1,3] can be removed and the rest of intervals are non-overlapping.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [ [1,2], [1,2], [1,2] ]\r\n\r\n<b>Output:</b> 2\r\n\r\n<b>Explanation:</b> You need to remove two [1,2] to make the rest of intervals non-overlapping.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b> [ [1,2], [2,3] ]\r\n\r\n<b>Output:</b> 0\r\n\r\n<b>Explanation:</b> You don't need to remove any of the intervals since they're already non-overlapping.\r\n</pre>\r\n</p>",
	"frequency":"150",
	"ac_num":"19059"
}