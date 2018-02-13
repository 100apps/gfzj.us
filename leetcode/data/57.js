{
	"difficulty":"3",
	"submit_num":"408134",
	"show_id":"57",
	"leetcode_id":"57",
	"answers":[
		{
			"lc_ans_id":"21602",
			"view":"34350",
			"top":"0",
			"title":"Short and straight-forward Java solution",
			"vote":"221",
			"content":"Hi guys!\\n\\nHere's a pretty straight-forward and concise solution below.\\n\\n    public List<Interval> insert(List<Interval> intervals, Interval newInterval) {\\n        List<Interval> result = new LinkedList<>();\\n        int i = 0;\\n        // add all the intervals ending before newInterval starts\\n        while (i < intervals.size() && intervals.get(i).end < newInterval.start)\\n            result.add(intervals.get(i++));\\n        // merge all overlapping intervals to one considering newInterval\\n        while (i < intervals.size() && intervals.get(i).start <= newInterval.end) {\\n            newInterval = new Interval( // we could mutate newInterval here also\\n                    Math.min(newInterval.start, intervals.get(i).start),\\n                    Math.max(newInterval.end, intervals.get(i).end));\\n            i++;\\n        }\\n        result.add(newInterval); // add the union of intervals we got\\n        // add all the rest\\n        while (i < intervals.size()) result.add(intervals.get(i++)); \\n        return result;\\n    }\\n\\nHope it helps."
		},
		{
			"lc_ans_id":"21622",
			"view":"14882",
			"top":"1",
			"title":"7+ lines, 3 easy solutions",
			"vote":"82",
			"content":"**Solution 1:** (7 lines, 88 ms)\\n\\nCollect the intervals strictly left or right of the new interval, then merge the new one with the middle ones (if any) before inserting it between left and right ones.\\n\\n    def insert(self, intervals, newInterval):\\n        s, e = newInterval.start, newInterval.end\\n        left = [i for i in intervals if i.end < s]\\n        right = [i for i in intervals if i.start > e]\\n        if left + right != intervals:\\n            s = min(s, intervals[len(left)].start)\\n            e = max(e, intervals[~len(right)].end)\\n        return left + [Interval(s, e)] + right\\n\\n---\\n\\n**Solution 2:** (8 lines, 84 ms)\\n\\nSame algorithm as solution 1, but different implementation with only one pass and explicitly collecting the to-be-merged intervals.\\n\\n    def insert(self, intervals, newInterval):\\n        s, e = newInterval.start, newInterval.end\\n        parts = merge, left, right = [], [], []\\n        for i in intervals:\\n            parts[(i.end < s) - (i.start > e)].append(i)\\n        if merge:\\n            s = min(s, merge[0].start)\\n            e = max(e, merge[-1].end)\\n        return left + [Interval(s, e)] + right\\n\\n---\\n\\n**Solution 3:** (11 lines, 80 ms)\\n\\nSame again, but collect and merge while going over the intervals once.\\n\\n    def insert(self, intervals, newInterval):\\n        s, e = newInterval.start, newInterval.end\\n        left, right = [], []\\n        for i in intervals:\\n            if i.end < s:\\n                left += i,\\n            elif i.start > e:\\n                right += i,\\n            else:\\n                s = min(s, i.start)\\n                e = max(e, i.end)\\n        return left + [Interval(s, e)] + right"
		},
		{
			"lc_ans_id":"21600",
			"view":"5961",
			"top":"2",
			"title":"Short java code",
			"vote":"39",
			"content":"    public List<Interval> insert(List<Interval> intervals, Interval newInterval) {\\n        List<Interval> result = new ArrayList<Interval>();\\n        for (Interval i : intervals) {\\n            if (newInterval == null || i.end < newInterval.start)\\n                result.add(i);\\n            else if (i.start > newInterval.end) {\\n                result.add(newInterval);\\n                result.add(i);\\n                newInterval = null;\\n            } else {\\n                newInterval.start = Math.min(newInterval.start, i.start);\\n                newInterval.end = Math.max(newInterval.end, i.end);\\n            }\\n        }\\n        if (newInterval != null)\\n            result.add(newInterval);\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"21599",
			"view":"2838",
			"top":"3",
			"title":"Elegant C++ STL solution, using \"equal_range\" to find overlapped intervals.",
			"vote":"27",
			"content":"    class Solution {\\n    public:\\n        vector<Interval> insert(vector<Interval>& intervals, Interval newInterval) {\\n            auto compare = [] (const Interval &intv1, const Interval &intv2)\\n                              { return intv1.end < intv2.start; };\\n            auto range = equal_range(intervals.begin(), intervals.end(), newInterval, compare);\\n            auto itr1 = range.first, itr2 = range.second;\\n            if (itr1 == itr2) {\\n                intervals.insert(itr1, newInterval);\\n            } else {\\n                itr2--;\\n                itr2->start = min(newInterval.start, itr1->start);\\n                itr2->end = max(newInterval.end, itr2->end);\\n                intervals.erase(itr1, itr2);\\n            }\\n            return intervals;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"21632",
			"view":"8940",
			"top":"4",
			"title":"Very short and easy to understand C++ solution",
			"vote":"26",
			"content":"    vector<Interval> insert(vector<Interval>& intervals, Interval newInterval) {\\n        vector<Interval> ret;\\n        auto it = intervals.begin();\\n        for(; it!=intervals.end(); ++it){\\n\\t\\t\\tif(newInterval.end < (*it).start) //all intervals after will not overlap with the newInterval\\n\\t\\t\\t\\tbreak; \\n\\t\\t\\telse if(newInterval.start > (*it).end) //*it will not overlap with the newInterval\\n\\t\\t\\t\\tret.push_back(*it); \\n            else{ //update newInterval bacause *it overlap with the newInterval\\n                newInterval.start = min(newInterval.start, (*it).start);\\n                newInterval.end = max(newInterval.end, (*it).end);\\n            }\\t\\n        }\\n        // don't forget the rest of the intervals and the newInterval\\n\\t\\tret.push_back(newInterval);\\n\\t\\tfor(; it!=intervals.end(); ++it)\\n\\t\\t\\tret.push_back(*it);\\n\\t\\treturn ret;\\n    }\\nMy question is why this code need 500ms !?"
		},
		{
			"lc_ans_id":"21659",
			"view":"2072",
			"top":"5",
			"title":"My Binary Search Approach Implementation, 2ms",
			"vote":"15",
			"content":"I know this is a little messy. For clean and simple code, please use the O(n) approach. We have great answer here with just 3 while loops. The BS approach utilizes the ordered characteristic of the input. For me, I want to get the position of the interval that is the first to have start equal to or larger than the inserted interval's start. Similarly, I get the position of the interval that is the first to have end equal to or larger than the new interval's end. Then I can get the range of intervals that the new interval connects. There are some corner cases that need to be considered, i.e. when the new interval has no overlap with any of the existing intervals (smaller, larger, or the original list is empty). In these corner cases, we just don't need to update the new interval. The code could possibly be cleaner and simpler without sacrificing the speed, or even with less time and space. Please let me know if you have any suggestions. Thank you!\\n\\n    public List<Interval> insert(List<Interval> intervals, Interval newInterval) {\\n        List<Interval> result = new ArrayList<>();\\n        if (intervals == null || newInterval == null) return result;\\n        int iStart = findStartPos(intervals, newInterval.start);\\n        int iEnd = findEndPos(intervals, newInterval.end);\\n        if (iStart > 0 && intervals.get(iStart - 1).end >= newInterval.start) iStart--;\\n        if (iEnd == intervals.size() || intervals.get(iEnd).start > newInterval.end) iEnd--;\\n        \\n        //If not in the corner cases, this condition should apply.\\n        if (iStart <= iEnd) {\\n            newInterval = new Interval(Math.min(newInterval.start, intervals.get(iStart).start),Math.max(newInterval.end, intervals.get(iEnd).end));\\n        }\\n\\n        int i = 0;\\n        while (i < iStart) result.add(intervals.get(i++));\\n        result.add(newInterval);\\n        i = iEnd + 1;\\n        while (i < intervals.size()) result.add(intervals.get(i++));\\n        return result;\\n    }\\n    \\n    private int findStartPos(List<Interval> intervals, int value) {\\n        int l = 0, r = intervals.size() - 1;\\n        while (l <= r) {\\n            int m = (l + r) >> 1;\\n            if (intervals.get(m).start == value) return m;\\n            else if (intervals.get(m).start < value) l = m + 1;\\n            else r = m - 1;\\n        }\\n        return l;\\n    }\\n    \\n    private int findEndPos(List<Interval> intervals, int value) {\\n        int l = 0, r = intervals.size() - 1;\\n        while (l <= r) {\\n            int m = (l + r) >> 1;\\n            if (intervals.get(m).end == value) return m;\\n            else if (intervals.get(m).end < value) l = m + 1;\\n            else r = m - 1;\\n        }\\n        return l;\\n    }"
		},
		{
			"lc_ans_id":"21669",
			"view":"1315",
			"top":"6",
			"title":"Easy and clean O(n) C++ solution",
			"vote":"15",
			"content":"Very easy to understand code as follows.\\n\\nFirst, put all intervals that are to the left of the inserted interval. \\nSecond, merge all intervals that intersect with the inserted interval. \\nFinally, put all intervals that are to the right of the inserted interval.\\n\\nThat's it! You are done!\\n\\n    class Solution {\\n    public:\\n        vector<Interval> insert(vector<Interval>& intervals, Interval newInterval) {\\n            vector<Interval> res;\\n            int index = 0;\\n            while(index < intervals.size() && intervals[index].end < newInterval.start){\\n                res.push_back(intervals[index++]);\\n            }\\n            while(index < intervals.size() && intervals[index].start <= newInterval.end){\\n                newInterval.start = min(newInterval.start, intervals[index].start);\\n                newInterval.end = max(newInterval.end, intervals[index].end);\\n                index++;\\n            }\\n            res.push_back(newInterval);\\n            while(index < intervals.size()){\\n                res.push_back(intervals[index++]);\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"21753",
			"view":"2108",
			"top":"7",
			"title":"O(n) Python solution",
			"vote":"14",
			"content":"    class Solution:\\n        # @param intervals, a list of Intervals\\n        # @param newInterval, a Interval\\n        # @return a list of Interval\\n        def insert(self, intervals, newInterval):\\n            start = newInterval.start\\n            end = newInterval.end\\n            result = []\\n            i = 0\\n            while i < len(intervals):\\n                if start <= intervals[i].end:\\n                    if end < intervals[i].start:\\n                        break\\n                    start = min(start, intervals[i].start)\\n                    end = max(end, intervals[i].end)\\n                else:\\n                    result.append(intervals[i])\\n                i += 1\\n            result.append(Interval(start, end))\\n            result += intervals[i:]\\n            return result"
		},
		{
			"lc_ans_id":"21815",
			"view":"1220",
			"top":"8",
			"title":"Two Easy O(n) C++ Solutions with Explanations",
			"vote":"9",
			"content":"By far the best solution I have seen is of `O(n)` time (some solutions claim to be of `O(logn)` turns out to be `O(n)`). One of the simplest ideas is to compare each interval in `intervals` (`intervals[i]`) with `newInterval` and then perform respective operations according to their relationships.\\n\\n 1. If they overlap, merge them to `newInterval`;\\n 2. If `intervals[i]` is to the left of `newInterval`, push `intervals[i]` to the result vector;\\n 3. If `newInterval` is to the left of `intervals[i]`, push `newInterval` and all the remaining intervals (`intervals[i]`, ..., `intervals[n - 1]`) to the result vector.\\n\\nThe code is as follows. \\n\\n    class Solution {\\n    public:\\n        vector<Interval> insert(vector<Interval>& intervals, Interval newInterval) {\\n            vector<Interval> res;\\n            int n = intervals.size();\\n            for (int i = 0; i < n; i++) {\\n                if (intervals[i].end < newInterval.start)\\n                    res.push_back(intervals[i]);\\n                else if (newInterval.end < intervals[i].start) {\\n                    res.push_back(newInterval);\\n                    for (int j = i; j < n; j++)\\n                        res.push_back(intervals[j]);\\n                    return res; \\n                }\\n                else newInterval = merge(intervals[i], newInterval);\\n            }\\n            res.push_back(newInterval);\\n            return res;\\n        }\\n    private:\\n        Interval merge(Interval& interval1, Interval& interval2) {\\n            int start = min(interval1.start, interval2.start);\\n            int end = max(interval1.end, interval2.end);\\n            return Interval(start, end);\\n        }\\n    };\\n\\nAnother idea is to search for the two ends of the overlapping intervals using binary search. Then we only need to merge `newInterval` with the intervals at the two ends if they overlap. All the intervals within the two ends will be contained in` newInterval`.\\n\\nLet's do the example in the problem statement: `intervals = [1, 2], [3, 5], [6, 7], [8, 10], [12, 16]` and `newInterval = [4, 9]`. We first find the rightmost interval with `start` smaller than that of `newInterval`, which is `[3, 5]`. Then we find the leftmost interval with `end` larger than that of `newInterval`, which is `[8, 10]`. Then all the intervals between them will be contained within `newInterval` (you may check this to convince yourself) and so can be safely ignored. We only need to check whether `newInterval` overlaps with the two intervals on the two ends and merge them if necessary.\\n\\nThe complete code is as follows.\\n\\n    class Solution {\\n    public:\\n        vector<Interval> insert(vector<Interval>& intervals, Interval newInterval) {\\n            int n = intervals.size(), leftEnd, rightEnd, l, r;\\n            vector<Interval> res;\\n            // Find the rightmost interval with start smaller than that of newInterval\\n            for (l = 0, r = n - 1; l <= r; ) {\\n                int mid = l + ((r - l) >> 1);\\n                if (intervals[mid].start > newInterval.start)\\n                    r = mid - 1;\\n                else l = mid + 1;\\n            } \\n            leftEnd = r;\\n            // Find the leftmost interval with end larger than that of newInterval\\n            for (l = 0, r = n - 1; l <= r; ) {\\n                int mid = l + ((r - l) >> 1);\\n                if (intervals[mid].end < newInterval.end)\\n                    l = mid + 1;\\n                else r = mid - 1;\\n            }\\n            rightEnd = l;\\n            // Merge newInterval with intervals[leftEnd] and intervals[rightEnd] if necessary\\n            if (leftEnd >= 0 && intervals[leftEnd].end >= newInterval.start)\\n                newInterval.start = intervals[leftEnd--].start;\\n            if (rightEnd < n && intervals[rightEnd].start <= newInterval.end)\\n                newInterval.end = intervals[rightEnd++].end;\\n            // Save the intervals sequentially\\n            for (int i = 0; i <= leftEnd; i++)\\n                res.push_back(intervals[i]);\\n            res.push_back(newInterval);\\n            for (int i = rightEnd; i < n; i++)\\n                res.push_back(intervals[i]);\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"21828",
			"view":"2027",
			"top":"9",
			"title":"My AC Java In-place solution",
			"vote":"9",
			"content":"    public class Solution {\\n        public List<Interval> insert(List<Interval> intervals, Interval newInterval) {\\n            if(intervals.isEmpty()){\\n                intervals.add(newInterval);\\n                return intervals;\\n            }\\n            \\n            int start = newInterval.start;\\n            int end = newInterval.end;\\n            ListIterator<Interval> li = intervals.listIterator();\\n            boolean inserted = false;\\n            while(li.hasNext()){\\n                Interval itv = li.next();\\n                if(start <= itv.end){\\n                    if(end < itv.start){ //newInterval does not overlap with current itv, time to insert\\n                        li.remove();\\n                        li.add(new Interval(start, end));\\n                        li.add(itv);\\n                        inserted = true;\\n                        break;\\n                    }\\n                    \\n                    // still some overlap so compare start & end\\n                    start = Math.min(start, itv.start);\\n                    end = Math.max(end, itv.end);\\n                    li.remove();\\n                }\\n            }\\n            \\n            if(!inserted){\\n                intervals.add(new Interval(start, end));\\n            }\\n            \\n            return intervals;\\n        }\\n    }"
		}
	],
	"id":"57",
	"title":"Insert Interval",
	"content":"<p>Given a set of <i>non-overlapping</i> intervals, insert a new interval into the intervals (merge if necessary).</p>\r\n\r\n<p>You may assume that the intervals were initially sorted according to their start times.</p>\r\n\r\n<p>\r\n<b>Example 1:</b><br />\r\nGiven intervals <code>[1,3],[6,9]</code>, insert and merge <code>[2,5]</code> in as <code>[1,5],[6,9]</code>.\r\n</p>\r\n\r\n<p>\r\n<b>Example 2:</b><br />\r\nGiven <code>[1,2],[3,5],[6,7],[8,10],[12,16]</code>, insert and merge <code>[4,9]</code> in as <code>[1,2],[3,10],[12,16]</code>.\r\n</p>\r\n\r\n<p>\r\nThis is because the new interval <code>[4,9]</code> overlaps with <code>[3,5],[6,7],[8,10]</code>.\r\n</p>",
	"frequency":"320",
	"ac_num":"117027"
}