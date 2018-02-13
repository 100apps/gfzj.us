{
	"difficulty":"3",
	"submit_num":"16885",
	"show_id":"630",
	"leetcode_id":"630",
	"answers":[
		{
			"lc_ans_id":"104845",
			"view":"3350",
			"top":"0",
			"title":"Short Java code using PriorityQueue",
			"vote":"34",
			"content":"\\n```\\npublic class Solution {\\n    public int scheduleCourse(int[][] courses) {\\n        Arrays.sort(courses,(a,b)->a[1]-b[1]); //Sort the courses by their deadlines (Greedy! We have to deal with courses with early deadlines first)\\n        PriorityQueue<Integer> pq=new PriorityQueue<>((a,b)->b-a);\\n        int time=0;\\n        for (int[] c:courses) \\n        {\\n            time+=c[0]; // add current course to a priority queue\\n            pq.add(c[0]);\\n            if (time>c[1]) time-=pq.poll(); //If time exceeds, drop the previous course which costs the most time. (That must be the best choice!)\\n        }        \\n        return pq.size();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104847",
			"view":"3863",
			"top":"1",
			"title":"Python, Straightforward with Explanation",
			"vote":"33",
			"content":"Sort all the courses by their ending time.  When considering the first K courses, they all end before ```end```.  A necessary and sufficient condition for our schedule to be valid, is that (for all K), the courses we choose to take within the first K of them, have total duration less than ```end```.\\n\\nFor each K, we will greedily remove the largest-length course until the total duration ```start``` is ```<= end```.  To select these largest-length courses, we will use a max heap.  ```start``` will maintain the loop invariant that it is the sum of the lengths of the courses we have currently taken.\\n\\nClearly, this greedy choice makes the number of courses used maximal for each K.  When considering potential future K, there's never a case where we preferred having a longer course to a shorter one, so indeed our greedy choice dominates all other candidates.\\n\\n```\\ndef scheduleCourse(self, A):\\n    pq = []\\n    start = 0\\n    for t, end in sorted(A, key = lambda (t, end): end):\\n        start += t\\n        heapq.heappush(pq, -t)\\n        while start > end:\\n            start += heapq.heappop(pq)\\n    return len(pq)\\n```\\n\\n(With thanks to @uwi - see his solution [here](https://leetcode.com/contest/leetcode-weekly-contest-38/ranking/))"
		},
		{
			"lc_ans_id":"104840",
			"view":"2712",
			"top":"2",
			"title":"C++ 13 lines With Explanation",
			"vote":"10",
			"content":"First, we sort courses by the end date, this way, when we're iterating through the courses, we can switch out any previous course with the current one without worrying about end date.\\n\\nNext, we iterate through each course, if we have enough days, we'll add it to our multiset.  If we don't have enough days, then we can either ignore this course, or we can use it to replace a longer course we added earlier.\\n```\\nclass Solution {\\npublic:\\n    int scheduleCourse(vector<vector<int>>& courses) {\\n        // sort courses by the end date\\n        sort(courses.begin(),courses.end(),\\n            [](vector<int> a, vector<int> b){return a.back()<b.back();});\\n            \\n        multiset<int> cls; // store lengths of each course we take (could be duplicates!)\\n        int cursum=0;\\n        \\n        for (int i=0; i<courses.size(); i++) {\\n            \\n            // if we have enough time, we will take this course\\n            if (cursum+courses[i].front()<=courses[i].back()) {\\n                cls.insert(courses[i].front());\\n                cursum+=courses[i].front();\\n            } else if (*cls.rbegin()>courses[i].front()) {\\n                // if we don't have enough time, we switch out a longer course\\n                cursum+=courses[i].front()-*cls.rbegin();\\n                cls.erase(--cls.end());\\n                cls.insert(courses[i].front());\\n            } // if we don't have enough time for course[i], \\n              //and it's longer than any courses taken, then we ignore it\\n        }\\n        \\n        return cls.size();\\n    }\\n};\\n```\\nMy final consideration was when we replace a longer course with a much shorter one, does that mean we'll have enough room to take some courses previously ignored for being too long?\\n\\nThe answer is no, because any courses we missed would be longer than what's in multiset ```cls```.  So the increase in number of days cannot be larger than the largest element in ```cls```, and certainly will be less than a previously ignored course which has to be even longer."
		},
		{
			"lc_ans_id":"104844",
			"view":"1160",
			"top":"3",
			"title":"C++ Short & Elegant O(nlogn) Time, O(k) Space Solution",
			"vote":"6",
			"content":"k is the number of courses you can take.\\n```\\nclass Solution {\\npublic:\\n    int scheduleCourse(vector<vector<int>>& courses) {\\n        sort(courses.begin(), courses.end(), [](vector<int> a, vector<int> b){return a[1] < b[1];});\\n        priority_queue<int> heap;\\n        int now = 0;\\n        for (int i = 0; i < courses.size(); ++ i)\\n        {\\n            heap.push(courses[i][0]);\\n            now += courses[i][0];\\n            if (now > courses[i][1])\\n                now -= heap.top(), heap.pop();\\n        }\\n        return heap.size();\\n    }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"104854",
			"view":"314",
			"top":"4",
			"title":"A little Difficult, just do some optimization on a O(N^2) algorithm",
			"vote":"2",
			"content":"**General** idea of an O(N^2) algorithm:\\n1. sort the tasks according to their deadline.\\n2. keep a \"list\", where list.get(k) is the shortest time which can be achieved using k tasks until now and without any violations. Initially this list is empty, with tasks added in, the list is growing. When a task is processed, the list is updated.\\n3. when processing the kth task, do the following:\\n```\\nfor(int i = list.size() - 1; i >=0; i--){\\n        int nextdeadline = list.get(i) + curtask.length;\\n        if( nextdeadline < curtask.deadline && nextdeadline < list.get(i+1)){\\n                list.set(i+1, nextdeadline);\\n        }\\n   }\\n```\\n4. return list.size();\\nThe following code just makes some optimization, initial O(N2) algorithm got TLE exception.\\n```\\npublic class Solution {\\n\\n    public int scheduleCourse(int[][] courses) {\\n        if(courses == null || courses.length == 0) return 0;\\n        Arrays.sort(courses, (a,b)->a[1]==b[1]?Integer.compare(a[0], b[0]):Integer.compare(a[1], b[1]));\\n        // int[] { diff, index }\\n        TreeSet<int[]> map = new TreeSet<>((a,b)->a[0]==b[0]?Integer.compare(b[1], a[1]):Integer.compare(b[0], a[0]));\\n        List<Integer> firstk = new ArrayList<>();\\n        firstk.add(0);\\n        List<int[]> removed = new ArrayList<>();\\n        for(int[] a : courses){\\n            removed.clear();\\n            Iterator<int[]> it = map.iterator();\\n            while(it.hasNext()){\\n                int[] e = it.next();\\n                if(e[0] > a[0]){\\n                    it.remove();\\n                    removed.add(e);\\n                }else\\n                    break;\\n            }\\n            if(firstk.get(firstk.size() - 1) + a[0] <= a[1]){\\n                firstk.add(firstk.get(firstk.size() - 1) + a[0]);\\n                int[] x = new int[]{a[0], firstk.size() - 1};\\n                map.add(x);\\n                removed.add(x);\\n            }\\n            for(int[] t : removed){\\n                firstk.set(t[1], firstk.get(t[1]) - t[0] + a[0]);  // update value at index\\n                t[0] = a[0];  // update diff\\n            }\\n            for(int[] t : removed){\\n                t[0] = firstk.get(t[1]) - firstk.get(t[1]-1);  // update diff\\n            }\\n            map.addAll(removed);\\n        }\\n        return firstk.size() - 1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104852",
			"view":"1319",
			"top":"5",
			"title":"Simple Java Solution",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    public int scheduleCourse(int[][] courses) {\\n        int r = courses.length,c=0,ans=0,l=r,temp=0;\\n        \\n        if(r != 0){\\n            c = courses[0].length;\\n        }else{\\n            return 0;\\n        }\\n        Arrays.sort(courses, new Comparator<int[]>(){\\n            public int compare(int[] a,int[] b){\\n                 return a[1]-b[1];\\n            }\\n        });\\n        \\n        \\n        PriorityQueue<int[]> heap = new PriorityQueue<int[]>(l,new Comparator<int[]>(){\\n            public int compare(int[] a,int[] b){\\n                return b[0] - a[0];\\n            }\\n            \\n        });\\n        heap.offer(courses[0]);\\n        temp += courses[0][0];\\n        for(int i=1;i<l;i++){\\n            int[] curr = heap.poll();\\n\\n            if(temp+courses[i][0] <= courses[i][1]){\\n               \\n                    heap.offer(courses[i]);\\n                    temp += courses[i][0];\\n            }else if(temp-curr[0]+courses[i][0] <= courses[i][1] && courses[i][0] < curr[0]){\\n                temp -= curr[0];\\n                curr = courses[i];\\n                temp += courses[i][0];\\n            }\\n            \\n            heap.offer(curr);\\n        }\\n        ans = heap.size();\\n        \\n        return ans;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104853",
			"view":"171",
			"top":"6",
			"title":"C# AC solution with Sort and BinarySearch",
			"vote":"1",
			"content":"This is a c# implementation of @baselRus    https://discuss.leetcode.com/topic/93708/c-13-lines-with-explanation/12\\n\\nIt is always difficult for c# dev to find a elegant solution when we need to sort a 2d array (not jagged array) and leverage PriorityQueue or Multiset (need to support duplicate value)\\n\\nfor sort 2d array, we have to convert to jagged array first. Actually, it caused runtime issue in some contest's question. I wish leetcode could convert all 2d array input to jagged arry or List<List<T>>\\nfor PriorityQueue, there is such data structure or alternative in .Net. There is no sorted list (support duplicated) as well. In this problem I just maintain a sorted list by using BinarySearch. with O(log(n)) cost.\\n\\n \\n\\n \\n```\\npublic class Solution {\\n    public int ScheduleCourse(int[,] courses)\\n    {\\n        var c = courses.To2D();\\n        Array.Sort(c, Comparer<int[]>.Create((a, b) => a[1] == b[1] ? a[0].CompareTo(b[0]) : a[1].CompareTo(b[1])));\\n        courses = c.To2D();\\n\\n        var sl = new List<int>();\\n    \\n        var n = courses.GetLength(0);\\n        var timeTillNow = 0;\\n        for (var i = 0; i < n; ++i)\\n        {\\n            if (timeTillNow + courses[i, 0] <= courses[i, 1]) // valid\\n            {\\n                Add(sl, courses[i, 0]);\\n                timeTillNow += courses[i, 0];\\n            }\\n            else if (sl.Last() > courses[i, 0]) // we already sorted end time, if time cost is small the pre, always better to switch\\n            {\\n                timeTillNow += courses[i, 0] - sl.Last();\\n                sl.RemoveAt(sl.Count - 1);\\n                Add(sl, courses[i, 0]);\\n            }\\n            // time cost even big , ignore.\\n        }\\n\\n        return sl.Count;\\n    }\\n    \\n    public void Add(List<int> l, int val)\\n    {\\n        var index = l.BinarySearch(val);\\n        index = index < 0 ? ~index : index;\\n        l.Insert(index, val);\\n    }\\n}\\n\\npublic static class ArrayExtensions\\n{\\n\\n    public static T[][] To2D<T>(this T[,] arr)\\n    {\\n        var ret = new T[arr.GetLength(0)][];\\n        for (var i = 0; i < arr.GetLength(0); i++)\\n        {\\n            ret[i] = new T[arr.GetLength(1)];\\n            for (var j = 0; j < arr.GetLength(1); j++)\\n            {\\n                ret[i][j] = arr[i,j];\\n            }\\n        }\\n\\n        return ret;\\n    }\\n\\n    public static T[,] To2D<T>(this T[][] arr)\\n    {\\n        var ret = new T[arr.Length, arr[0].Length];\\n        for(var i = 0; i < arr.Length; i++)\\n        {\\n            for(var j = 0; j < arr[0].Length; j++)\\n            {\\n                ret[i, j] = arr[i][j];\\n            }\\n        }\\n\\n        return ret;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"104839",
			"view":"37",
			"top":"7",
			"title":"Simple Python code using priority queue with explanation",
			"vote":"0",
			"content":"```\\nclass Solution:\\n    def scheduleCourse(self, courses):\\n        \"\"\"\\n        :type courses: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        import heapq\\n        sorted_courses = sorted(courses, key=lambda x: x[1])\\n        start = 0\\n        completed_courses = []\\n\\n        \"\"\"\\n        Sort courses in ascending order of deadline\\n        Maintain a priority queue based on the length of the course\\n        At each deadline/course, check whether this course can meet deadline or not\\n        If the course can not meed deadline, remove the longest course if the priority queue if the length\\n        of the longest course if smaller than this course\\n        \"\"\"\\n\\n        for t, d in sorted_courses:\\n            if d >= start + t:\\n                # we want a max heap, therefore need to use -t instead\\n                heapq.heappush(completed_courses, -t)\\n                start += t\\n            else:\\n                t_longest = completed_courses[0]\\n                if t <= -t_longest:\\n                    heapq.heappop(completed_courses)\\n                    heapq.heappush(completed_courses, -t)\\n                    start -= (-t_longest - t)\\n        return len(completed_courses)\\n\\n```"
		},
		{
			"lc_ans_id":"104841",
			"view":"48",
			"top":"8",
			"title":"C++ priority queue solution",
			"vote":"0",
			"content":"```\\nclass Solution {\\npublic:\\n    int scheduleCourse(vector<vector<int>>& courses) {\\n        sort(courses.begin(),courses.end(),[](vector<int>a,vector<int>b){return a.back()<b.back();});\\n        priority_queue<int> pq;\\n        int time = 0;\\n        for(auto course:courses)\\n        {\\n            pq.push(course[0]);\\n            time+=course[0];\\n            if(time>course[1]){time-=pq.top(),pq.pop();}\\n        }\\n        return pq.size();  \\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"104842",
			"view":"53",
			"top":"9",
			"title":"Not fast but very simple Python Solution",
			"vote":"0",
			"content":"We can regard this problem simply as a backpack problem(let the duration (course length) **t** be the size of stuff, and the deadline **d** of each course is the current capacity of backpack).Specially, the size of the backpack can be changed.\\n\\nTraverse the courses (stuff) with following strategies (**currentV** is the capacity of backpack, **currentUse** is the current occupied space):\\n1. if **currentUse** + **duration** <= **currentV** then put this course into your backpack\\n2. if **currentUse** + **duration** > **currentV** find the largest stuff (the longest duration) **maxD** in your backpack,  if **maxD** < **duration** then replace **maxD** with **duration** else give up the idea of take this course. \\n(strategy 2 is designed to make your current schedule more flexible in order to take part in more courses)\\n\\ncode:\\n```\\nimport queue\\n\\nclass Solution(object):\\n    \"\"\"docstring for Solution\"\"\"\\n    def scheduleCourse(self, courses):\\n        courses.sort(key = lambda x: x[1])\\n        maxCourses, currentV, currentUse = 0, 0, 0\\n        maxQueue = queue.PriorityQueue()\\n        for course in courses:\\n            currentV = course[1]\\n            if currentUse + course[0] <= currentV:\\n                maxCourses += 1\\n                currentUse += course[0]\\n                maxQueue.put((-course[0], course[0]))\\n            else:\\n                currentMax = maxQueue.get()[1]\\n                if currentMax > course[0]:\\n                    currentUse = currentUse - currentMax + course[0]\\n                    maxQueue.put((-course[0], course[0]))\\n                else:\\n                    maxQueue.put((-currentMax, currentMax))\\n        return maxCourses\\n```"
		}
	],
	"id":"608",
	"title":"Course Schedule III",
	"content":"<p>\r\nThere are <code>n</code> different online courses numbered from <code>1</code> to <code>n</code>. Each course has some duration(course length)  <code>t</code> and closed on <code>d<sub>th</sub></code> day. A course should be taken <b>continuously</b> for <code>t</code> days and must be finished before or on the <code>d<sub>th</sub></code> day. You will start at the <code>1<sub>st</sub></code> day.\r\n</p>\r\n\r\n<p>\r\nGiven <code>n</code> online courses represented by pairs <code>(t,d)</code>, your task is to find the maximal number of courses that can be taken.\r\n</p>\r\n\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]\r\n<b>Output:</b> 3\r\n<b>Explanation:</b> \r\nThere're totally 4 courses, but you can take 3 courses at most:\r\nFirst, take the 1st course, it costs 100 days so you will finish it on the 100th day, and ready to take the next course on the 101st day.\r\nSecond, take the 3rd course, it costs 1000 days so you will finish it on the 1100th day, and ready to take the next course on the 1101st day. \r\nThird, take the 2nd course, it costs 200 days so you will finish it on the 1300th day. \r\nThe 4th course cannot be taken now, since you will finish it on the 3300th day, which exceeds the closed date.\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The integer 1 <= d, t, n <= 10,000. </li>\r\n<li>You can't take two courses simultaneously.</li>\r\n</ol>\r\n</p>",
	"frequency":"114",
	"ac_num":"4918"
}