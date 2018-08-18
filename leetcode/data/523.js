{
	"difficulty":"2",
	"submit_num":"31209",
	"show_id":"539",
	"leetcode_id":"539",
	"answers":[
		{
			"lc_ans_id":"100640",
			"view":"7886",
			"top":"0",
			"title":"Verbose Java Solution, Bucket",
			"vote":"41",
			"content":"There is only 24 * 60 = 1440 possible time points. Just create a boolean array, each element stands for if we see that time point or not. Then things become simple...\\n\\n```\\npublic class Solution {\\n    public int findMinDifference(List<String> timePoints) {\\n        boolean[] mark = new boolean[24 * 60];\\n        for (String time : timePoints) {\\n            String[] t = time.split(\":\");\\n            int h = Integer.parseInt(t[0]);\\n            int m = Integer.parseInt(t[1]);\\n            if (mark[h * 60 + m]) return 0;\\n            mark[h * 60 + m] = true;\\n        }\\n        \\n        int prev = 0, min = Integer.MAX_VALUE;\\n        int first = Integer.MAX_VALUE, last = Integer.MIN_VALUE;\\n        for (int i = 0; i < 24 * 60; i++) {\\n            if (mark[i]) {\\n                if (first != Integer.MAX_VALUE) {\\n                    min = Math.min(min, i - prev);\\n                }\\n                first = Math.min(first, i);\\n                last = Math.max(last, i);\\n                prev = i;\\n            }\\n        }\\n        \\n        min = Math.min(min, (24 * 60 - last + first));\\n        \\n        return min;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100636",
			"view":"2708",
			"top":"1",
			"title":"Java 10 liner solution. Simplest so far",
			"vote":"8",
			"content":"```\\npublic class Solution {\\n    public int findMinDifference(List<String> timePoints) {\\n        int mm = Integer.MAX_VALUE;\\n        List<Integer> time = new ArrayList<>();\\n        \\n        for(int i = 0; i < timePoints.size(); i++){\\n            Integer h = Integer.valueOf(timePoints.get(i).substring(0, 2));\\n            time.add(60 * h + Integer.valueOf(timePoints.get(i).substring(3, 5)));\\n        }\\n        \\n        Collections.sort(time, (Integer a, Integer b) -> a - b);\\n        \\n        for(int i = 1; i < time.size(); i++){\\n            System.out.println(time.get(i));\\n            mm = Math.min(mm, time.get(i) - time.get(i-1));\\n        }\\n        \\n        int corner = time.get(0) + (1440 - time.get(time.size()-1));\\n        return Math.min(mm, corner);\\n    }\\n}"
		},
		{
			"lc_ans_id":"100660",
			"view":"2890",
			"top":"2",
			"title":"[C++] Clean Code",
			"vote":"8",
			"content":"```\\nclass Solution {\\npublic:\\n    int findMinDifference(vector<string>& times) {\\n        int n = times.size();\\n        sort(times.begin(), times.end());\\n        int mindiff = INT_MAX;\\n        for (int i = 0; i < times.size(); i++) {\\n            int diff = abs(timeDiff(times[(i - 1 + n) % n], times[i]));\\n            diff = min(diff, 1440 - diff);\\n            mindiff = min(mindiff, diff);\\n        }\\n        return mindiff;\\n    }\\n\\nprivate:\\n    int timeDiff(string t1, string t2) {\\n        int h1 = stoi(t1.substr(0, 2));\\n        int m1 = stoi(t1.substr(3, 2));\\n        int h2 = stoi(t2.substr(0, 2));\\n        int m2 = stoi(t2.substr(3, 2));\\n        return (h2 - h1) * 60 + (m2 - m1);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"100643",
			"view":"3309",
			"top":"3",
			"title":"Java sorting with a sentinel node",
			"vote":"8",
			"content":"```\\npublic class Solution {\\n    public int findMinDifference(List<String> timePoints) {\\n        int n = timePoints.size();\\n        List<Time> times = new ArrayList<>();\\n        for (String tp : timePoints) {\\n            String[] strs = tp.split(\":\");\\n            times.add(new Time(Integer.parseInt(strs[0]), Integer.parseInt(strs[1])));\\n        }\\n        Collections.sort(times);\\n        Time earlist = times.get(0);\\n        times.add(new Time(earlist.h + 24, earlist.m));\\n        int minDiff = Integer.MAX_VALUE;\\n        for (int i = 0; i < n; i++) {\\n            int diff = (int) Math.abs(times.get(i).getDiff(times.get(i + 1)));\\n            minDiff = Math.min(minDiff, diff);\\n        }\\n        return minDiff;\\n    }\\n    \\n}\\n\\nclass Time implements Comparable<Time> {\\n    int h;\\n    int m;\\n    public Time(int h, int m) {\\n        this.h = h;\\n        this.m = m;\\n    }\\n    \\n    public int compareTo(Time other) {\\n        if (this.h == other.h) {\\n            return this.m - other.m;\\n        }\\n        return this.h - other.h;\\n    }\\n    \\n    public int getDiff(Time other) {\\n        return (this.h - other.h) * 60 + (this.m - other.m);            \\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100637",
			"view":"2209",
			"top":"4",
			"title":"Python, Straightforward with Explanation",
			"vote":"7",
			"content":"Convert each timestamp to it's integer number of minutes past midnight, and sort the array of minutes.\\nThe required minimum difference must be a difference between two adjacent elements in the circular array (so the last element is \"adjacent\" to the first.)  We take the minimum value of all of them.\\n\\n```\\ndef findMinDifference(self, A):\\n    def convert(time):\\n        return int(time[:2]) * 60 + int(time[3:])\\n    minutes = map(convert, A)\\n    minutes.sort()\\n    \\n    return min( (y - x) % (24 * 60) \\n                for x, y in zip(minutes, minutes[1:] + minutes[:1]) )\\n```"
		},
		{
			"lc_ans_id":"100698",
			"view":"227",
			"top":"5",
			"title":"easy to understand java solution",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    public int findMinDifference(List<String> timePoints) {\\n        int n = timePoints.size();\\n        int[] nums = new int[n];\\n        for (int i = 0; i < n; i++) {\\n            String[] s = timePoints.get(i).split(\":\");\\n            nums[i] = Integer.parseInt(s[0])*60  + Integer.parseInt(s[1]);\\n        }\\n        Arrays.sort(nums);        \\n        int min = Integer.MAX_VALUE;\\n        for (int i = 0; i < n; i++) {\\n            int cur = nums[i];\\n            int pre = nums[(n - 1 + i) % n];\\n            int diff = Math.abs(cur - pre);\\n            diff = Math.min(diff, 1440 - diff);\\n            min = Math.min(diff, min);\\n        } \\n        return min;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100644",
			"view":"1079",
			"top":"6",
			"title":"Java O(nlog(n))/O(n) Time O(1) Space Solutions",
			"vote":"2",
			"content":"O(nlog(n)) Time O(1) Space:\\n\\n```\\npublic int findMinDifference(List<String> timePoints) {\\n    Collections.sort(timePoints);\\n    int minDiff = Integer.MAX_VALUE;\\n    String prev = timePoints.get(timePoints.size()-1);\\n    for (String s : timePoints) {\\n        int prevMins = Integer.parseInt(prev.split(\":\")[0])*60 + Integer.parseInt(prev.split(\":\")[1]);\\n        int curMins = Integer.parseInt(s.split(\":\")[0])*60 + Integer.parseInt(s.split(\":\")[1]);\\n        int diff = curMins - prevMins;\\n        if (diff < 0) diff += 1440;\\n        minDiff = Math.min(minDiff, Math.min(diff, 1440 - diff));\\n        prev = s;\\n    }\\n    return minDiff;\\n}\\n```\\n\\nO(n) Time O(1) Space. Note that, more accurately, this is O(1) time as the number of iterations of the first loop is limited to 1440 due to the pigeonhole principle.\\n\\n```\\npublic int findMinDifference(List<String> timePoints) {\\n\\n    boolean[] timeSeen = new boolean[1440];\\n    for (String s : timePoints) {\\n        int mins = Integer.parseInt(s.split(\":\")[0])*60 + Integer.parseInt(s.split(\":\")[1]);\\n        if (timeSeen[mins]) return 0;\\n        timeSeen[mins] = true;\\n    }\\n    \\n    Integer firstTimeSeen = null, prevTimeSeen = null, minDiff = Integer.MAX_VALUE;\\n    for (int i=0;i<1440;i++) {\\n        if (!timeSeen[i]) continue;\\n        if (firstTimeSeen == null) {firstTimeSeen = i; prevTimeSeen = i;}\\n        else {\\n          minDiff = Math.min(minDiff, Math.min(i - prevTimeSeen, 1440 - i + prevTimeSeen));\\n          prevTimeSeen = i;\\n        }\\n    }\\n    \\n    minDiff = Math.min(minDiff, Math.min(prevTimeSeen - firstTimeSeen, 1440 - prevTimeSeen + firstTimeSeen));\\n    return minDiff;\\n}\\n```"
		},
		{
			"lc_ans_id":"100694",
			"view":"224",
			"top":"7",
			"title":"7-liner \"O(1)\" solution: only 60*24 possible different time points!",
			"vote":"1",
			"content":"Note that there are only maximum `60*24` different time point strings, so we definitely get duplicates if there are more than `60*24` time points, i.e., answer is simply zero! So the essential size of this problem is upper bounded by constant `60*24`.\\n```\\n    int findMinDifference(vector<string>& times) {\\n      if (times.size() > 60*24) return 0; // must have duplicates!\\n      sort(times.begin(), times.end()); // sort times in ascending order\\n      \\n      int minDiff = INT_MAX, pre = timeToInt(times.back()) - 60*24; // previous time in minutes\\n      for (auto& t:times)\\n        minDiff = min(minDiff, timeToInt(t)-pre), pre = timeToInt(t);\\n      return minDiff;\\n    }\\n    \\n    // convert time point string to int of minutes\\n    int timeToInt(const string& t) {\\n      return 60*stoi(t.substr(0,2)) + stoi(t.substr(3,2));    \\n    }\\n```"
		},
		{
			"lc_ans_id":"100641",
			"view":"295",
			"top":"8",
			"title":"python sort & bucket solution",
			"vote":"1",
			"content":"because there are only 1440 buckets, so the length limit of 20000 is useless.\\n\\nsort solution\\n```\\nclass Solution(object):\\n    def findMinDifference(self, timePoints):\\n        \"\"\"\\n        :type timePoints: List[str]\\n        :rtype: int\\n        \"\"\"\\n        if len(timePoints) > 1440:\\n            return 0\\n        s = sorted(map(lambda t: int(t[:2]) * 60 + int(t[3:]), timePoints))\\n        return min(s2 - s1 for s1, s2 in zip(s, s[1:] + [1440+s[0]]))\\n```\\n\\nbucket solution\\n```\\nclass Solution(object):\\n    def findMinDifference(self, timePoints):\\n        \"\"\"\\n        :type timePoints: List[str]\\n        :rtype: int\\n        \"\"\"\\n        if len(timePoints) > 1440:\\n            return 0\\n        buckets = [0] * 1440\\n        for tp in timePoints:\\n            seconds = int(tp[:2]) * 60 + int(tp[3:])\\n            buckets[seconds] += 1\\n            if buckets[seconds] > 1:\\n                return 0\\n        s = [i for i, cnt in enumerate(buckets) if cnt]\\n        return min(s2 - s1 for s1, s2 in zip(s, s[1:] + [1440 + s[0]]))\\n```"
		},
		{
			"lc_ans_id":"100724",
			"view":"238",
			"top":"9",
			"title":"PriorityQueue Solution",
			"vote":"1",
			"content":"```\\npublic int findMinDifference(List<String> timePoints) {\\n\\tPriorityQueue<Integer> pq = new PriorityQueue<>();\\n\\tfor (String s : timePoints) {\\n\\t\\tint h = Integer.valueOf(s.substring(0,2));\\n\\t\\tint m = Integer.valueOf(s.substring(3));\\n\\t\\tpq.offer(h*60+m);\\n\\t}\\n\\tif (pq.size() < 2) return 0;\\n\\tint res = Integer.MAX_VALUE, first = pq.poll();\\n\\tint cur = first;\\n\\twhile (!pq.isEmpty()) {\\n\\t\\tint next = pq.poll();\\n\\t\\tres = Math.min(res, next-cur);\\n\\t\\tcur = next;\\n\\t}\\n\\treturn Math.min(res, 24*60-cur+first);\\n}\\n```"
		}
	],
	"id":"523",
	"title":"Minimum Time Difference",
	"content":"Given a list of 24-hour clock time points in \"Hour:Minutes\" format, find the minimum <b>minutes</b> difference between any two time points in the list. \r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [\"23:59\",\"00:00\"]\r\n<b>Output:</b> 1\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The number of time points in the given list is at least 2 and won't exceed 20000.</li>\r\n<li>The input time is legal and ranges from 00:00 to 23:59.</li>\r\n</ol>\r\n</p>",
	"frequency":"156",
	"ac_num":"14373"
}