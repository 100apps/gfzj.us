{
	"difficulty":"2",
	"submit_num":"39788",
	"show_id":"362",
	"leetcode_id":"362",
	"answers":[
		{
			"lc_ans_id":"83483",
			"view":"20664",
			"top":"0",
			"title":"Super easy design O(1) hit()  O(s) getHits() no fancy data structure is needed!",
			"vote":"130",
			"content":"O(s) s is total seconds in given time interval, in this case 300.\\nbasic ideal is using buckets. 1 bucket for every second because we only need to keep the recent hits info for 300 seconds.  hit[] array is wrapped around by mod operation. Each hit bucket is associated with times[] bucket which record current time. If it is not current time, it means it is 300s or 600s... ago and need to reset to 1.\\n\\n\\n\\n\\n    public class HitCounter {\\n        private int[] times;\\n        private int[] hits;\\n        /** Initialize your data structure here. */\\n        public HitCounter() {\\n            times = new int[300];\\n            hits = new int[300];\\n        }\\n        \\n        /** Record a hit.\\n            @param timestamp - The current timestamp (in seconds granularity). */\\n        public void hit(int timestamp) {\\n            int index = timestamp % 300;\\n            if (times[index] != timestamp) {\\n                times[index] = timestamp;\\n                hits[index] = 1;\\n            } else {\\n                hits[index]++;\\n            }\\n        }\\n        \\n        /** Return the number of hits in the past 5 minutes.\\n            @param timestamp - The current timestamp (in seconds granularity). */\\n        public int getHits(int timestamp) {\\n            int total = 0;\\n            for (int i = 0; i < 300; i++) {\\n                if (timestamp - times[i] < 300) {\\n                    total += hits[i];\\n                }\\n            }\\n            return total;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83505",
			"view":"10359",
			"top":"1",
			"title":"Simple Java Solution with explanation",
			"vote":"53",
			"content":" In this problem, I use a queue to record the information of all the hits. Each time we call the function getHits( ), we have to delete the elements which hits beyond 5 mins (300). The result would be the length of the queue : )\\n\\n  \\n\\n    public class HitCounter {\\n            Queue<Integer> q = null;\\n            /** Initialize your data structure here. */\\n            public HitCounter() {\\n                q = new LinkedList<Integer>();\\n            }\\n            \\n            /** Record a hit.\\n                @param timestamp - The current timestamp (in seconds granularity). */\\n            public void hit(int timestamp) {\\n                q.offer(timestamp);\\n            }\\n            \\n            /** Return the number of hits in the past 5 minutes.\\n                @param timestamp - The current timestamp (in seconds granularity). */\\n            public int getHits(int timestamp) {\\n                while(!q.isEmpty() && timestamp - q.peek() >= 300) {\\n                    q.poll();\\n                }\\n                return q.size();\\n            }\\n        }"
		},
		{
			"lc_ans_id":"83490",
			"view":"4512",
			"top":"2",
			"title":"Java Circular Array Solution with a really detailed explanation post.",
			"vote":"18",
			"content":"This solution is based on the idea in this post:  \\n[https://nuttynanaus.wordpress.com/2014/03/09/software-engineer-interview-questions/][1]  \\nThere are two solutions, the first one we choose 1s as granularity, the other is full accuracy(see the post).\\nWe call move() before hit() and getHits(). move() will take time at most O(N), where N is the length of the array.\\n\\n\\n    public class HitCounter {\\n        int N;\\n        int[] count;\\n        int lastPosition;\\n        int lastTime;\\n        int sum;\\n    \\n        /** Initialize your data structure here. */\\n        public HitCounter() {\\n            N = 300;\\n            count = new int[N];\\n            lastPosition = 0;\\n            lastTime = 0;\\n            sum = 0;\\n        }\\n        \\n        /** Record a hit.\\n            @param timestamp - The current timestamp (in seconds granularity). */\\n        public void hit(int timestamp) {\\n            move(timestamp);\\n            count[lastPosition]++;\\n            sum++;\\n        }\\n        \\n        /** Return the number of hits in the past 5 minutes.\\n            @param timestamp - The current timestamp (in seconds granularity). */\\n        public int getHits(int timestamp) {\\n            move(timestamp);\\n            return sum;\\n        }\\n        \\n        void move(int timestamp){\\n            int gap = Math.min(timestamp-lastTime, N);\\n            for(int i=0; i<gap;i++){\\n                lastPosition = (lastPosition+1)%N;\\n                sum -= count[lastPosition];\\n                count[lastPosition] = 0;\\n            }\\n            lastTime = timestamp;\\n        }\\n    }\\n\\n\\n  [1]: https://nuttynanaus.wordpress.com/2014/03/09/software-engineer-interview-questions/"
		},
		{
			"lc_ans_id":"83477",
			"view":"2214",
			"top":"3",
			"title":"48ms Python Concise Solution",
			"vote":"11",
			"content":"    class HitCounter(object):\\n\\n    def __init__(self):\\n        \"\"\"\\n        Initialize your data structure here.\\n        \"\"\"\\n        from collections import deque\\n        \\n        self.num_of_hits = 0\\n        self.time_hits = deque()\\n        \\n\\n    def hit(self, timestamp):\\n        \"\"\"\\n        Record a hit.\\n        @param timestamp - The current timestamp (in seconds granularity).\\n        :type timestamp: int\\n        :rtype: void\\n        \"\"\"\\n        if not self.time_hits or self.time_hits[-1][0] != timestamp:\\n            self.time_hits.append([timestamp, 1])\\n        else:\\n            self.time_hits[-1][1] += 1\\n        \\n        self.num_of_hits += 1\\n                \\n        \\n\\n    def getHits(self, timestamp):\\n        \"\"\"\\n        Return the number of hits in the past 5 minutes.\\n        @param timestamp - The current timestamp (in seconds granularity).\\n        :type timestamp: int\\n        :rtype: int\\n        \"\"\"\\n        while self.time_hits and self.time_hits[0][0] <= timestamp - 300:\\n            self.num_of_hits -= self.time_hits.popleft()[1]\\n        \\n        return self.num_of_hits"
		},
		{
			"lc_ans_id":"83487",
			"view":"4813",
			"top":"4",
			"title":"Your design should consider removal performance",
			"vote":"10",
			"content":"Since this is a design question, we need to ask interviewer how this class is going to be used? \\nA working code is not the answer to this question, but how you adjust your program to meet different use cases.\\n\\nConsider: There are 1000 frequent hit() followed by 1 getHits(). If we only do removal in getHits() function, it will be very time consuming. For me, I prefer to do removal in both hit() and getHits(), so that the program avoids system lag in this case.\\nThis is important when you design a time-critical system."
		},
		{
			"lc_ans_id":"83510",
			"view":"1320",
			"top":"5",
			"title":"AC scalable 0ms super easy C++ design with queue and aggregated O(1) operation for hit and gethits",
			"vote":"9",
			"content":"The idea is quite simple, we use a queue to keep track of the hits, and each element in the queue is a pair of timestamp $t and the cnt of the hits at time $t. And we use a counter to keep track of the number of hits within 300s.\\n\\nWhen a hit comes, we need to maintain the queue and pop the (timestamp, hit_cnt) pair iff it is not in last 300 second.\\n\\nSince it take O(1) to push/pop each element in queue and each element only goes into the queue once, the time complexity of all operations is O(1) in an aggregated sense.\\n\\n\\n    class HitCounter {\\n    private:\\n        queue<pair<int, int> >  hits;\\n        int cnt;\\n    public:\\n        /** Initialize your data structure here. */\\n        HitCounter() {\\n            cnt = 0;\\n        }\\n        \\n        /** Record a hit.\\n            @param timestamp - The current timestamp (in seconds granularity). */\\n        void hit(int timestamp) {\\n            // maintain the queue to get rid of the outdated hit pair \\n            while(!hits.empty() && timestamp - hits.front().first >= 300 ){\\n                cnt -= hits.front().second;\\n                hits.pop();\\n            }\\n            // count the current hit:\\n            ++cnt;\\n            if(!hits.empty() && timestamp == hits.back().first)  ++(hits.back().second);\\n            else    hits.push(make_pair(timestamp,1));\\n        }\\n        \\n        /** Return the number of hits in the past 5 minutes.\\n            @param timestamp - The current timestamp (in seconds granularity). */\\n        int getHits(int timestamp) {\\n            while(!hits.empty() && timestamp - hits.front().first >= 300){\\n                cnt -= hits.front().second;\\n                hits.pop();\\n            }\\n            return cnt;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"83548",
			"view":"1433",
			"top":"6",
			"title":"Straight-forward Java Solution using Queue",
			"vote":"5",
			"content":"    public class HitCounter {\\n        \\n        class Tuple {\\n            int time;\\n            int count;\\n            public Tuple(int time, int count) {\\n                this.time = time;\\n                this.count = count;\\n            }\\n        }\\n        \\n        Queue<Tuple> q;\\n        int currCount;\\n    \\n        public HitCounter() {\\n            q = new LinkedList<>();\\n            currCount = 0;\\n        }\\n        \\n        public void hit(int timestamp) {\\n            advance(timestamp);\\n            if(!q.isEmpty() && q.peek().time==timestamp) {\\n                q.peek().count += 1;\\n            } else {\\n                q.offer(new Tuple(timestamp, 1));\\n            }\\n            currCount += 1;\\n        }\\n        \\n        private void advance(int timestamp) {\\n            while(!q.isEmpty() && q.peek().time <= timestamp-300) {\\n                currCount -= q.poll().count;\\n            }\\n        }\\n        \\n        public int getHits(int timestamp) {\\n            advance(timestamp);\\n            return currCount;\\n        }\\n}"
		},
		{
			"lc_ans_id":"83489",
			"view":"1297",
			"top":"7",
			"title":"A simple java solution that scales, O(1)both time and space! beats 94%",
			"vote":"3",
			"content":"```\\npublic class HitCounter {\\n    Deque<Second> q = new LinkedList<Second>();\\n    int hits = 0;\\n    /** Initialize your data structure here. */\\n    public HitCounter() {\\n        \\n    }\\n    \\n    /** Record a hit.\\n        @param timestamp - The current timestamp (in seconds granularity). */\\n    public void hit(int timestamp) {\\n        while(!q.isEmpty() && timestamp - q.peek().sec > 299){ //at most 299 cycles, therefore O(1)\\n            hits -= q.peek().count;\\n            q.poll();\\n        }\\n        if(!q.isEmpty() && q.peekLast().sec == timestamp){\\n            q.getLast().count++;\\n            hits++;\\n        }else{\\n            q.offer(new Second(timestamp));\\n            hits++;\\n        }\\n    }\\n    \\n    /** Return the number of hits in the past 5 minutes.\\n        @param timestamp - The current timestamp (in seconds granularity). */\\n    public int getHits(int timestamp) {\\n        while(!q.isEmpty() && timestamp - q.peek().sec > 299){ //at most 299 cycles, therefore O(1)\\n            hits -= q.peek().count;\\n            q.poll();\\n        }\\n        return hits;\\n    }\\n}\\nclass Second{\\n    int sec, count;\\n    public Second(int sec){\\n        this.sec = sec;\\n        count = 1;\\n    }\\n}\\n```\\nEach time we get a new window, we delete old Seconds and subtract counts from total hits.\\nthis solution also scales on space because we at most have 300 items on the queue. we combine identical hits."
		},
		{
			"lc_ans_id":"83538",
			"view":"676",
			"top":"8",
			"title":"python hashtable,  O(1) hit() O(s(300 here)) getHits()",
			"vote":"3",
			"content":"```\\nclass HitCounter(object):\\n\\n    def __init__(self):\\n        \"\"\"\\n        Initialize your data structure here.\\n        \"\"\"\\n        self.dic = collections.defaultdict(int)\\n\\n    def hit(self, timestamp):\\n        \"\"\"\\n        Record a hit.\\n        @param timestamp - The current timestamp (in seconds granularity).\\n        :type timestamp: int\\n        :rtype: void\\n        \"\"\"\\n        self.dic[timestamp] += 1\\n\\n    def getHits(self, timestamp):\\n        \"\"\"\\n        Return the number of hits in the past 5 minutes.\\n        @param timestamp - The current timestamp (in seconds granularity).\\n        :type timestamp: int\\n        :rtype: int\\n        \"\"\"\\n        start = timestamp-300+1 if timestamp > 300 else 0\\n        summation = 0\\n        for i in range(start, timestamp+1):\\n            summation += self.dic[i]\\n        return summation\\n\\n\\n# Your HitCounter object will be instantiated and called as such:\\n# obj = HitCounter()\\n# obj.hit(timestamp)\\n# param_2 = obj.getHits(timestamp)\\n```"
		},
		{
			"lc_ans_id":"83581",
			"view":"654",
			"top":"9",
			"title":"Using multiset, 3 line C++",
			"vote":"2",
			"content":"    class HitCounter {\\n    public:\\n        /** Initialize your data structure here. */\\n        multiset<int>S;\\n        HitCounter() {\\n            \\n        }\\n        \\n        /** Record a hit.\\n            @param timestamp - The current timestamp (in seconds granularity). */\\n        void hit(int timestamp) {\\n            S.insert(timestamp);\\n        }\\n        \\n        /** Return the number of hits in the past 5 minutes.\\n            @param timestamp - The current timestamp (in seconds granularity). */\\n        int getHits(int timestamp) {\\n            int span = max(0, timestamp - 300);\\n            auto it = S.upper_bound(span), it2 = S.upper_bound(timestamp);\\n            return distance(it, it2);\\n        }\\n    };\\n    \\n    /**\\n     * Your HitCounter object will be instantiated and called as such:\\n     * HitCounter obj = new HitCounter();\\n     * obj.hit(timestamp);\\n     * int param_2 = obj.getHits(timestamp);\\n     */"
		}
	],
	"id":"362",
	"title":"Design Hit Counter",
	"content":"<p>Design a hit counter which counts the number of hits received in the past 5 minutes.</p>\r\n\r\n<p>Each function accepts a timestamp parameter (in seconds granularity) and you may assume that calls are being made to the system in chronological order (ie, the timestamp is monotonically increasing). You may assume that the earliest timestamp starts at 1.</p>\r\n\r\n<p>It is possible that several hits arrive roughly at the same time.</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\nHitCounter counter = new HitCounter();\r\n\r\n// hit at timestamp 1.\r\ncounter.hit(1);\r\n\r\n// hit at timestamp 2.\r\ncounter.hit(2);\r\n\r\n// hit at timestamp 3.\r\ncounter.hit(3);\r\n\r\n// get hits at timestamp 4, should return 3.\r\ncounter.getHits(4);\r\n\r\n// hit at timestamp 300.\r\ncounter.hit(300);\r\n\r\n// get hits at timestamp 300, should return 4.\r\ncounter.getHits(300);\r\n\r\n// get hits at timestamp 301, should return 3.\r\ncounter.getHits(301); \r\n</pre>\r\n</p>\r\n\r\n<p><b>Follow up:</b><br />\r\nWhat if the number of hits per second could be very large? Does your design scale?\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://discuss.leetcode.com/user/elmirap\">@elmirap</a> for adding this problem and creating all test cases.</p>",
	"frequency":"256",
	"ac_num":"21845"
}