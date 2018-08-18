{
	"difficulty":"2",
	"submit_num":"39839",
	"show_id":"436",
	"leetcode_id":"436",
	"answers":[
		{
			"lc_ans_id":"91789",
			"view":"9189",
			"top":"0",
			"title":"Java clear O(n logn) solution based on TreeMap",
			"vote":"38",
			"content":"```\\npublic class Solution {\\n    public int[] findRightInterval(Interval[] intervals) {\\n        int[] result = new int[intervals.length];\\n        java.util.NavigableMap<Integer, Integer> intervalMap = new TreeMap<>();\\n        \\n        for (int i = 0; i < intervals.length; ++i) {\\n            intervalMap.put(intervals[i].start, i);    \\n        }\\n        \\n        for (int i = 0; i < intervals.length; ++i) {\\n            Map.Entry<Integer, Integer> entry = intervalMap.ceilingEntry(intervals[i].end);\\n            result[i] = (entry != null) ? entry.getValue() : -1;\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"91819",
			"view":"4161",
			"top":"1",
			"title":"C++ map solution",
			"vote":"24",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<int> findRightInterval(vector<Interval>& intervals) {\\n        map<int, int> hash;\\n        vector<int> res;\\n        int n = intervals.size();\\n        for (int i = 0; i < n; ++i)\\n            hash[intervals[i].start] = i;\\n        for (auto in : intervals) {\\n            auto itr = hash.lower_bound(in.end);\\n            if (itr == hash.end()) res.push_back(-1);\\n            else res.push_back(itr->second);\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"91806",
			"view":"3631",
			"top":"2",
			"title":"Python O(nlogn) short solution with explanation",
			"vote":"15",
			"content":"My solution from contest with minimal cleanup. For each end point search for the first start point that is equal or higher in a previously constructed ordered list of start points. If there is one then return its index. If not return -1:\\n```\\ndef findRightInterval(self, intervals):\\n    l = sorted((e.start, i) for i, e in enumerate(intervals))\\n    res = []\\n    for e in intervals:\\n        r = bisect.bisect_left(l, (e.end,))\\n        res.append(l[r][1] if r < len(l) else -1)\\n    return res\\n```"
		},
		{
			"lc_ans_id":"91793",
			"view":"4155",
			"top":"3",
			"title":"Java Concise Binary Search",
			"vote":"14",
			"content":"\\nIf we are not allowed to use TreeMap:\\n1. Sort starts\\n2. For each end, find leftmost start using binary search\\n3. To get the original index, we need a map\\n\\n\\n    public int[] findRightInterval(Interval[] intervals) {\\n        Map<Integer, Integer> map = new HashMap<>();\\n        List<Integer> starts = new ArrayList<>();\\n        for (int i = 0; i < intervals.length; i++) {\\n            map.put(intervals[i].start, i);\\n            starts.add(intervals[i].start);\\n        }\\n        \\n        Collections.sort(starts);\\n        int[] res = new int[intervals.length];\\n        for (int i = 0; i < intervals.length; i++) {\\n            int end = intervals[i].end;\\n            int start = binarySearch(starts, end);\\n            if (start < end) {\\n                res[i] = -1;\\n            } else {\\n                res[i] = map.get(start);\\n            }\\n        }\\n        return res;\\n    }\\n    \\n    public int binarySearch(List<Integer> list, int x) {\\n        int left = 0, right = list.size() - 1;\\n        while (left < right) {\\n            int mid = left + (right - left) / 2;\\n            if (list.get(mid) < x) { \\n                left = mid + 1;\\n            } else {\\n                right = mid;\\n            }\\n        }\\n        return list.get(left);\\n    }"
		},
		{
			"lc_ans_id":"91872",
			"view":"1035",
			"top":"4",
			"title":"2 lines Python / Ruby",
			"vote":"8",
			"content":"Just sort the starts (with attached original indexes), then binary search the ends in them.\\n\\nPython:\\n\\n    def findRightInterval(self, intervals):\\n        starts = sorted([I.start, i] for i, I in enumerate(intervals)) + [[float('inf'), -1]]\\n        return [starts[bisect.bisect(starts, [I.end])][1] for I in intervals]\\n\\nRuby:\\n```\\ndef find_right_interval(intervals)\\n  starts = intervals.map.with_index { |interval, i| [interval.start, i] }.sort\\n  intervals.map { |interval| (starts.bsearch { |s, i| s >= interval.end } || [-1])[-1] }\\nend\\n```"
		},
		{
			"lc_ans_id":"91815",
			"view":"1061",
			"top":"5",
			"title":"Commented Java O(n*logn) solution. Sort + Binary Search.",
			"vote":"4",
			"content":"Time compexity: ```n*log(n)```\\n```n*log(n)``` for sorting\\n```log(n)``` for binary search X ```n``` times is ```n*log(n)```\\n\\nSpace complexity: ```n``` \\n```n``` for auxilliary array\\n\\nAlgorithm:\\n1) Clone intervals and update ```end``` with index.\\n2) Sort clone-intervals by ```start```\\n3) Iterate over each interval and find the  ```right``` by binary searching the clone-intervals.\\n4) If found, shove the  ```end``` i.e., the original index of the ```right``` interval from clone-intervals into the output array.\\n\\n```\\npublic int[] findRightInterval(Interval[] intervals) {\\n        \\n        int n;\\n        // boundary case\\n        if (intervals == null || (n = intervals.length) == 0) return new int[]{};\\n        \\n        // output\\n        int[] res = new int[intervals.length];\\n        // auxilliary array to store sorted intervals\\n        Interval[] sintervals = new Interval[n];\\n        \\n        // sintervals don't have any use of 'end', so let's use it for tracking original index\\n        for (int i = 0; i < n; ++i) {\\n            sintervals[i] = new Interval(intervals[i].start, i);\\n        }\\n        \\n        // sort\\n        Arrays.sort(sintervals, (a, b)->a.start-b.start);\\n        \\n        int i = 0;\\n        for (; i < n; ++i) {\\n            int key = intervals[i].end;\\n            // binary search in sintervals for key\\n            int l = 0, r = n - 1;\\n            int right = -1;\\n            while (l <= r) {\\n                int m = l + (r - l) / 2;\\n                if (sintervals[m].start == key) {\\n                    right = sintervals[m].end; // original index is stored in end\\n                    break;\\n                } else if (sintervals[m].start < key) {\\n                    l = m + 1;\\n                } else {\\n                    r = m - 1;\\n                }\\n            }\\n            \\n            // if we haven't found the key, try looking for 'start' that's just greater\\n            if ((right == -1) && (l < n) && (sintervals[l].start > key)) {\\n                right = sintervals[l].end; // original index is stored in end\\n            }\\n            \\n            res[i] = right;\\n        }\\n        \\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"91797",
			"view":"2147",
			"top":"6",
			"title":"Java Sweep-Line Solution O(nlogn)",
			"vote":"4",
			"content":"1. wrapper class: Point \\n   1. value\\n   2. flag:  1 indicates start,  2 indicates end\\n   3. index:  original pos in intervals array\\n   4. Comparable: sort by value ascending, end in front of start if they have same value.\\n\\n\\n2. Iterate intervals array and fill a points list, then sort it\\n\\n3. Iterate points list, since the sequence will be \"order by position, and end will come before start\".\\n   1.  whenever meet a end point, keep a list(prevIdxs) before next start, save original index of curr interval to the list.\\n   2.  whenever meet a start point, this start point is the right interval to the intervals in the list (prevIdxs). Take out each index in it and update to result.\\n\\n\\n\\n\\n    class Point implements Comparable<Point>{\\n        int val;\\n        int flag; //1 start, 0 end\\n        int index;\\n        public Point(int val, int flag, int index) {\\n            this.val = val;\\n            this.flag = flag;\\n            this.index = index;\\n        }\\n        public int compareTo(Point o) {\\n            if (this.val == o.val) return this.flag - o.flag; //end in front of start\\n            return this.val - o.val;\\n        }\\n    }\\n    public int[] findRightInterval(Interval[] intervals) {\\n        if (intervals == null || intervals.length == 0) return new int[]{};\\n        \\n        int[] res = new int[intervals.length];\\n        Arrays.fill(res, -1);\\n        \\n        List<Point> points = new ArrayList<>();\\n        for (int i = 0; i < intervals.length; i++) {\\n            points.add(new Point(intervals[i].start, 1, i));\\n            points.add(new Point(intervals[i].end, 0, i));\\n        }\\n        \\n        Collections.sort(points);\\n        \\n        List<Integer> prevIdxs = new ArrayList<>();\\n        \\n        for (Point point: points) {\\n            if (point.flag == 1) {\\n                    for (Integer prevIdx: prevIdxs) {\\n                       res[prevIdx] = point.index; \\n                    }\\n                    prevIdxs = new ArrayList<>();\\n            } else {\\n                prevIdxs.add(point.index);\\n            }\\n        }\\n        \\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"91861",
			"view":"562",
			"top":"7",
			"title":"Concise O(nlgn) C++ solution using BST(std::map)",
			"vote":"3",
			"content":"std::map's implementation is red-black-tree, lower_bound finds the first key in the BST that is no less than the given key. We first store all the indexes of intervals using starting point as key into the BST, then search it using end points of each interval. Time complexity O(nlgn).\\n\\n```\\nclass Solution {\\npublic:\\n    vector<int> findRightInterval(vector<Interval>& intervals) {\\n        std::map<int,int> start_indexes;\\n        for (int index = 0; index < intervals.size(); ++index) {\\n        \\tstart_indexes.emplace(intervals[index].start, index);\\n        }\\n        vector<int> result;\\n        for (auto& interval : intervals) {\\n        \\tauto lower_bound_it = start_indexes.lower_bound(interval.end);\\n        \\tresult.push_back(lower_bound_it == start_indexes.end() ? -1 : lower_bound_it->second);\\n        }\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"91862",
			"view":"292",
			"top":"8",
			"title":"Java O(nlogn) solution with sorting & binary searching",
			"vote":"2",
			"content":"To begin, we have this `O(n^2)` naive solution: for each interval, compare its end point to the start point of all other intervals in the input array and find one, if any, with a minimum start point that is no less than the given end point. This is essentially equivalent to searching in the given array for an interval satisfying the given criteria.\\n\\nPlain searching involves iterating through the whole array, which leads to the bad time performance (`O(n^2)`). What if the input array is sorted according to the start point of the intervals? Then we can simply do binary search to reduce the time complexity down to `O(nlogn)`.\\n\\nOne tricky point is that we need to know the index of the element in the original input array but sorting will break the order. The solution is to bind the original index of each interval to its start point so we still have the index info after sorting the start points. This can be done using either a TreeMap (start point as key and original index as value) or simply a new `n-by-2` array (start point as the first element and original index as the second one).\\n\\nThe following solution uses an `n-by-2` array. One advantage is that the binary search can start from the index of each interval in the new array, instead of from the beginning every time. Here is a quick explanation:\\n\\na. `res` is the result array; `arr` is an auxiliary array whose element will encode the start point and index info of the interval from the input array.\\n\\nb. First populate the `arr` array and sort it according to the start points. Then for each interval in `arr`, do binary search to find the smallest index of an interval with start point no less than its end point. Set the result to the corresponding index if we can find it or `-1` if no index is found.\\n```\\npublic int[] findRightInterval(Interval[] intervals) {\\n    int[] res = new int[intervals.length];\\n    int[][] arr = new int[intervals.length][2];\\n        \\n    for (int i = 0; i < intervals.length; i++) {\\n        arr[i][0] = intervals[i].start;\\n        arr[i][1] = i;\\n    }\\n        \\n    Arrays.sort(arr, new Comparator<int[]>() {\\n        public int compare(int[] a, int[] b) {\\n            return Integer.compare(a[0], b[0]);\\n        }\\n    });\\n     \\n    for (int i = 0; i < arr.length; i++) {\\n        int l = i + 1, r = arr.length - 1, m = 0;\\n            \\n        while (l <= r) {\\n            m = l + ((r - l) >>> 1);\\n                \\n            if (intervals[arr[i][1]].end <= arr[m][0]) {\\n                r = m - 1;\\n            } else {\\n                l = m + 1;\\n            }\\n        }\\n            \\n        res[arr[i][1]] = (l < arr.length ? arr[l][1] : -1);\\n    }\\n        \\n    return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"91801",
			"view":"123",
			"top":"9",
			"title":"Java O(nlogn) solution base on BinarySearch [Accepted]",
			"vote":"1",
			"content":"```\\npublic int[] findRightInterval(Interval[] intervals) {\\n        int n = intervals.length;\\n        int[] results = new int[n]; \\n        results[0] = -1;\\n        if (n == 1) return results;\\n        \\n        Interval[] temp = new Interval[n];\\n        // O(n)\\n        for (int i = 0; i < n; ++i){\\n            Interval value = new Interval(intervals[i].start, i);\\n            temp[i] = value;\\n        }\\n        \\n        //O(nlogn)\\n        Arrays.sort(temp, new Comparator<Interval>() {\\n\\t\\t\\t@Override\\n\\t\\t\\tpublic int compare(Interval o1, Interval o2) {\\n\\t\\t\\t\\treturn o1.start - o2.start;\\n\\t\\t\\t}\\n\\t\\t});\\n\\t\\t\\n\\t\\t//O(nlogn)\\n\\t\\tfor (int i = 0; i < n; ++i){\\n\\t\\t    \\n\\t\\t    int left = 0;\\n\\t\\t    int right = n-1;\\n\\t\\t    int index = -1;\\n\\t\\t    while (left <= right){\\n\\t\\t        int mid = left + (right - left)/2;\\n\\t\\t        \\n\\t\\t        if (temp[mid].start == intervals[i].end){\\n\\t\\t            index = temp[mid].end;\\n\\t\\t            break;\\n\\t\\t        }\\n\\t\\t        else if (temp[mid].start > intervals[i].end){\\n\\t\\t            index = temp[mid].end;\\n\\t\\t            right = mid -1;\\n\\t\\t        }\\n\\t\\t        else{\\n\\t\\t            left = mid + 1;\\n\\t\\t        }\\n\\t\\t    }\\n\\t\\t    \\n\\t\\t    results[i] = index;\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn results;\\n    }\\n```"
		}
	],
	"id":"430",
	"title":"Find Right Interval",
	"content":"<p>\r\nGiven a set of intervals, for each of the interval i, check if there exists an interval j whose start point is bigger than or equal to the end point of the interval i, which can be called that j is on the \"right\" of i.\r\n</p>\r\n\r\n<p>\r\nFor any interval i, you need to store the minimum interval j's index, which means that the interval j has the minimum start point to build the \"right\" relationship for interval i. If the interval j doesn't exist, store -1 for the interval i. Finally, you need output the stored value of each interval as an array.\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\n<ol>\r\n<li>You may assume the interval's end point is always bigger than its start point.</li>\r\n<li>You may assume none of these intervals have the same start point.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [ [1,2] ]\r\n\r\n<b>Output:</b> [-1]\r\n\r\n<b>Explanation:</b> There is only one interval in the collection, so it outputs -1.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [ [3,4], [2,3], [1,2] ]\r\n\r\n<b>Output:</b> [-1, 0, 1]\r\n\r\n<b>Explanation:</b> There is no satisfied \"right\" interval for [3,4].\r\nFor [2,3], the interval [3,4] has minimum-\"right\" start point;\r\nFor [1,2], the interval [2,3] has minimum-\"right\" start point.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b> [ [1,4], [2,3], [3,4] ]\r\n\r\n<b>Output:</b> [-1, 2, -1]\r\n\r\n<b>Explanation:</b> There is no satisfied \"right\" interval for [1,4] and [3,4].\r\nFor [2,3], the interval [3,4] has minimum-\"right\" start point.\r\n</pre>\r\n</p>",
	"frequency":"77",
	"ac_num":"16532"
}