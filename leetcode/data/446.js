{
	"difficulty":"2",
	"submit_num":"42894",
	"show_id":"452",
	"leetcode_id":"452",
	"answers":[
		{
			"lc_ans_id":"93703",
			"view":"5160",
			"top":"0",
			"title":"Share my explained Greedy solution as the highest voted java solution right now is not ideal",
			"vote":"45",
			"content":"No offense but the currently highest voted java solution is not ideal, the sorting can be adjusted so that there's no need to check again in the for loop.\\n\\n**Idea:**\\nWe know that eventually we have to shoot down every balloon, so for each ballon there must be an arrow whose position is between **balloon[0]** and **balloon[1]**. Given that, we can sort the array of balloons by their **ending position**. Then we make sure that **while we take care of each balloon from the beginning, we can shoot as many following balloons as possible.**\\n\\nSo what position should we pick? We should shoot as right as possible, because all balloons' end position is to the right of the current one. Therefore the position should be **currentBalloon[1]**, because we still need to shoot down the current one.\\n\\nThis is exactly what I do in the for loop: check how many balloons I can shoot down with one shot aiming at the **ending position of the current balloon**. Then I skip all these balloons and start again from the next one (or the leftmost remaining one) that needs another arrow.\\n\\n\\n**Example:**\\n```\\nballoons = [[7,10], [1,5], [3,6], [2,4], [1,4]]\\n```\\nAfter sorting, it becomes:\\n```\\nballoons = [[2,4], [1,4], [1,5], [3,6], [7,10]]\\n```\\nSo first of all, we shoot at position **4**, we go through the array and see that all first 4 balloons can be taken care of by this single shot. Then we need another shot for one last balloon. So the result should be 2.\\n<br>\\n\\n\\n**Code:**\\n```\\npublic int findMinArrowShots(int[][] points) {\\n        if (points.length == 0) {\\n            return 0;\\n        }\\n        Arrays.sort(points, (a, b) -> a[1] - b[1]);\\n        int arrowPos = points[0][1];\\n        int arrowCnt = 1;\\n        for (int i = 1; i < points.length; i++) {\\n            if (arrowPos >= points[i][0]) {\\n                continue;\\n            }\\n            arrowCnt++;\\n            arrowPos = points[i][1];\\n        }\\n        return arrowCnt;\\n    }\\n```"
		},
		{
			"lc_ans_id":"93711",
			"view":"8382",
			"top":"1",
			"title":"Java Greedy Soution",
			"vote":"22",
			"content":"```\\npublic int findMinArrowShots(int[][] points) {\\n\\tif(points==null || points.length==0 || points[0].length==0) return 0;\\n\\tArrays.sort(points, new Comparator<int[]>() {\\n\\t\\tpublic int compare(int[] a, int[] b) {\\n\\t\\t\\tif(a[0]==b[0]) return a[1]-b[1];\\n\\t\\t\\telse return a[0]-b[0];\\n\\t\\t}\\n\\t});\\n\\t\\n\\tint minArrows = 1;\\n\\tint arrowLimit = points[0][1];\\n\\tfor(int i=1;i<points.length;i++) {\\n\\t\\tint[] baloon = points[i];\\n\\t\\tif(baloon[0]<=arrowLimit) {\\n\\t\\t\\tarrowLimit=Math.min(arrowLimit, baloon[1]);\\n\\t\\t} else {\\n\\t\\t\\tminArrows++;\\n\\t\\t\\tarrowLimit=baloon[1];\\n\\t\\t}\\n\\t}\\n\\treturn minArrows;\\n}\\n```"
		},
		{
			"lc_ans_id":"93719",
			"view":"3362",
			"top":"2",
			"title":"Greedy, Python (132 ms)",
			"vote":"20",
			"content":"1. Sort intervals by ending value;\\n2. Only count valid intervals we need, and skip overlapping intervals\\nreturn the count\\n\\n```\\nclass Solution(object):\\n    def findMinArrowShots(self, points):\\n        \"\"\"\\n        :type points: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        points = sorted(points, key = lambda x: x[1])\\n        res, end = 0, -float('inf')\\n        for interval in points:\\n            if interval[0] > end:\\n                res += 1\\n                end = interval[1]\\n        return res\\n```"
		},
		{
			"lc_ans_id":"93695",
			"view":"4773",
			"top":"3",
			"title":"C++ easy understood solution (sort)",
			"vote":"15",
			"content":"First, we sort balloons by increasing points.end (if ends are the same, then by increasing of points.start). Every time arrow shot points.end, say, points[i].second. If next balloon.start <= points[i].second, it is also shot, thus we continue.\\n```\\n    int findMinArrowShots(vector<pair<int, int>>& points) {\\n        int count = 0, arrow = INT_MIN;\\n        sort(points.begin(), points.end(), mysort);\\n        for(int i = 0; i<points.size(); i++){\\n            if(arrow!=INT_MIN && points[i].first<=arrow){continue;} //former arrow shot points[i] \\n            arrow = points[i].second; // new arrow shot the end of points[i]\\n            count++;\\n        }\\n        return count;\\n    }\\n    static bool mysort(pair<int, int>& a, pair<int, int>& b){\\n        return a.second==b.second?a.first<b.first:a.second<b.second;\\n    }\\n```"
		},
		{
			"lc_ans_id":"93735",
			"view":"471",
			"top":"4",
			"title":"A Concise Template for \"Overlapping Interval Problem\"",
			"vote":"7",
			"content":"Here I provide a concise template that I summarize for the so-called \"Overlapping Interval Problem\", e.g. Minimum Number of Arrows to Burst Balloons, and Non-overlapping Intervals etc. I found these problems share some similarities on their solutions.\\n* Sort intervals/pairs in increasing order of the start position.\\n* Scan the sorted intervals, and maintain an \"active set\" for overlapping intervals. At most times, we do not need to use an explicit set to store them. Instead, we just need to maintain several key parameters, e.g. the number of overlapping intervals (count), the minimum ending point among all overlapping intervals (minEnd). \\n* If the interval that we are currently checking overlaps with the active set, which can be characterized by cur.start > minEnd, we need to renew those key parameters or change some states.\\n* If the current interval does not overlap with the active set, we just drop current active set, record some parameters, and create a new active set that contains the current interval.\\n```\\nint count = 0; // Global parameters that are useful for results.\\nint minEnd = INT_MAX; // Key parameters characterizing the \"active set\" for overlapping intervals, e.g. the minimum ending point among all overlapping intervals.\\nsort(points.begin(), points.end()); // Sorting the intervals/pairs in ascending order of its starting point\\nfor each interval {\\n      if(interval.start > minEnd) { // If the \\n\\t // changing some states, record some information, and start a new active set. \\n\\tcount++;\\n\\tminEnd = p.second;\\n      }\\n     else {\\n\\t// renew key parameters of the active set\\n\\tminEnd = min(minEnd, p.second);\\n      } \\n }\\nreturn the result recorded in or calculated from the global information;\\n```\\n\\nFor example, for the problem Minimum \"**Number of Arrows to Burst Balloons**\", we have\\n* Sort balloons in increasing order of the start position.\\n* Scan the sorted pairs, and maintain a pointer for the minimum end position for current \"active balloons\", whose diameters are overlapping. \\n* When the next balloon starts after all active balloons, shoot an arrow to burst all active balloons, and start to record next active balloons.\\n\\n```\\nint findMinArrowShots(vector<pair<int, int>>& points) {\\n        int count = 0, minEnd = INT_MAX;\\n        sort(points.begin(), points.end());\\n        for(auto& p: points) {\\n            if(p.first > minEnd) {count++; minEnd = p.second;}\\n            else minEnd = min(minEnd, p.second);\\n        }\\n        return count + !points.empty();\\n    }\\n```\\n\\nFor the problem \"**Non-overlapping Intervals**\", we have\\n```\\nint eraseOverlapIntervals(vector<Interval>& intervals) {\\n        int total = 0, minEnd = INT_MIN, overNb = 1;\\n        sort(intervals.begin(), intervals.end(), [&](Interval& inter1, Interval& inter2) {return inter1.start < inter2.start;});\\n        for(auto& p: intervals) {\\n            if(p.start >= minEnd) {\\n                total += overNb-1;\\n                overNb = 1;\\n                minEnd = p.end;\\n            }\\n            else {\\n                overNb++;\\n                minEnd = min(minEnd, p.end);\\n            }\\n        }\\n        return total + overNb-1;\\n    }\\n```"
		},
		{
			"lc_ans_id":"93737",
			"view":"2331",
			"top":"5",
			"title":"Concise Java solution tracking the end of overlapping intervals",
			"vote":"7",
			"content":"```\\npublic class Solution {\\n    public int findMinArrowShots(int[][] points) {\\n        if(points == null || points.length < 1) return 0;\\n        Arrays.sort(points, (a, b)->(a[0]-b[0]));\\n        int result = 1;\\n        int end = points[0][1];\\n        for(int i = 1; i < points.length; i ++) {\\n            if(points[i][0] > end) {\\n                result ++;\\n                end = points[i][1];\\n            } else {\\n                end = Math.min(end, points[i][1]);\\n            }\\n        }\\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"93767",
			"view":"543",
			"top":"6",
			"title":"Java easy to understand solution",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public int findMinArrowShots(int[][] points) {\\n        if (points == null || points.length == 0)   return 0;\\n\\n        Arrays.sort(points,(a, b) -> a[0] - b[0]);       //sort the balloons according to their start coordinate\\n        \\n        int minRight = Integer.MAX_VALUE, count = 0;\\n        //minRight record the leftmost end of previous balloons\\n        for (int i = 0; i < points.length; ++i) {\\n            //whenever current balloon's start is bigger than minRight\\n            //that means we need an arrow to clear all previous balloons\\n            if (points[i][0] > minRight) {                   \\n                count++;\\n                minRight = points[i][1];\\n            } else {\\n                minRight = Math.min(minRight, points[i][1]);\\n            }\\n        }\\n        return count + 1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"93787",
			"view":"517",
			"top":"7",
			"title":"C++ O(nlogn) solution in 8 lines",
			"vote":"3",
			"content":"\\n    int findMinArrowShots(vector<pair<int, int>>& points) {\\n        int res = 0, i = 0, temp;\\n        sort(points.begin(), points.end(), [](pair<int, int> a, pair<int, int> b){return a.second < b.second;});\\n        while (i < points.size()) {\\n            res++;\\n            temp = points[i++].second;\\n            while (i < points.size() && points[i].first <= temp) i++;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"93734",
			"view":"95",
			"top":"8",
			"title":"C# - sort by start - count when start is non-overlapping",
			"vote":"1",
			"content":"Here I sort by start and keep track of the current balloon.  The idea is that if the next balloon overlaps you don't need to use another arrow.  The only catch is that if the overlapping balloon ends earlier you need to adjust your end marker to the lesser of the ends.\\n\\n```\\n    public int FindMinArrowShots(int[,] points) \\n    {\\n        // multidimensional array cannot be sorted directly - copy to objects\\n        Pt[] pts = new Pt[points.GetLength(0)];\\n        for (int i = 0; i < points.GetLength(0); i++) pts[i] = new Pt(points[i,0], points[i,1]);\\n        Array.Sort(pts, (a,b) => a.start.CompareTo(b.start));\\n        \\n        int cnt = 0;\\n        Pt prev = null;\\n        for (int i = 0; i < pts.Length; i++)\\n        {\\n            if (prev == null || prev.end < pts[i].start)\\n            {\\n                cnt++;\\n                prev = pts[i];\\n            }\\n            else if (pts[i].end < prev.end)\\n            {\\n                prev.end = pts[i].end;\\n            }\\n        }\\n        return cnt;\\n    }\\n    \\n    public class Pt\\n    {\\n        public int start;\\n        public int end;\\n        public Pt(int s, int e) { start = s; end = e; }\\n    }\\n```"
		},
		{
			"lc_ans_id":"93738",
			"view":"252",
			"top":"9",
			"title":"Greedy C++ (105 ms) O(n log(n))",
			"vote":"1",
			"content":"I know I am not deleting my arrays :-)\\n\\n```\\nclass Solution {\\n    \\n    typedef struct ext\\n    {\\n        pair<int, int> val;\\n        bool seen;\\n        ext(): val(0,0), seen(false) {}\\n    } ext;\\n\\n    static bool compare_first(ext *&a, ext *&b)\\n    {\\n        return a->val.first < b->val.first;\\n    }\\n    \\n    static bool compare_second(ext *&a, ext *&b)\\n    {\\n        return a->val.second < b->val.second;\\n    }\\n    \\n    \\npublic:\\n    int findMinArrowShots(vector<pair<int, int>>& points)\\n    {\\n        if (points.empty())\\n            return 0;\\n            \\n        int res = 0;\\n        \\n        ext *first[points.size()], *second[points.size()];\\n        for (int i = 0; i < points.size(); ++i)\\n        {\\n            ext *obj = new ext();\\n            obj->val = points[i];\\n            obj->seen = false;\\n            first[i] = obj;\\n            second[i] = obj;\\n        }\\n\\n        std::sort(first, first + points.size(), compare_first);\\n        std::sort(second, second + points.size(), compare_second);\\n        int index = 0;\\n        \\n        for (int i = 0; i < points.size() && index < points.size(); ++i)\\n        {\\n            if (second[i]->seen)\\n                continue;\\n    \\n            ++res;\\n            while (index < points.size() && first[index]->val.first <= second[i]->val.second)\\n            {\\n                first[index]->seen = true;\\n                ++index;\\n            }\\n        }\\n        \\n        return res;\\n    }\\n};\\n```"
		}
	],
	"id":"446",
	"title":"Minimum Number of Arrows to Burst Balloons",
	"content":"<p>There are a number of spherical balloons spread in two-dimensional space. For each balloon, provided input is the start and end coordinates of the horizontal diameter. Since it's horizontal, y-coordinates don't matter and hence the x-coordinates of start and end of the diameter suffice. Start is always smaller than end. There will be at most 10<sup>4</sup> balloons.</p>\r\n\r\n<p>An arrow can be shot up exactly vertically from different points along the x-axis. A balloon with x<sub>start</sub> and x<sub>end</sub> bursts by an arrow shot at x if x<sub>start</sub> &le; x &le; x<sub>end</sub>. There is no limit to the number of arrows that can be shot. An arrow once shot keeps travelling up infinitely. The problem is to find the minimum number of arrows that must be shot to burst all balloons. </p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n<b>Input:</b>\r\n[[10,16], [2,8], [1,6], [7,12]]\r\n\r\n<b>Output:</b>\r\n2\r\n\r\n<b>Explanation:</b>\r\nOne way is to shoot one arrow for example at x = 6 (bursting the balloons [2,8] and [1,6]) and another arrow at x = 11 (bursting the other two balloons).\r\n</pre>\r\n</p>",
	"frequency":"182",
	"ac_num":"19103"
}