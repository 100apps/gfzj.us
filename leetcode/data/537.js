{
	"difficulty":"2",
	"submit_num":"40340",
	"show_id":"554",
	"leetcode_id":"554",
	"answers":[
		{
			"lc_ans_id":"101728",
			"view":"10431",
			"top":"0",
			"title":"I DON'T THINK THERE IS A BETTER PERSON THAN ME TO ANSWER THIS QUESTION",
			"vote":"133",
			"content":"We want to cut from the edge of the most common location among all the levels, hence using a map to record the locations and their corresponding occurrence. Most importantly, Mexico will pay for it! (I wish)\\n```\\npublic class Solution {\\n    public int leastBricks(List<List<Integer>> wall) {\\n        if(wall.size() == 0) return 0;\\n        int count = 0;\\n        Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n        for(List<Integer> list : wall){\\n            int length = 0;\\n            for(int i = 0; i < list.size() - 1; i++){\\n                length += list.get(i);\\n                map.put(length, map.getOrDefault(length, 0) + 1);\\n                count = Math.max(count, map.get(length));\\n            }\\n        }\\n        return wall.size() - count;\\n    }\\n}"
		},
		{
			"lc_ans_id":"101738",
			"view":"2974",
			"top":"1",
			"title":"C++ 6 lines (hash map)",
			"vote":"9",
			"content":"For each potential cut position - which is at the edge of any brick, I am counting the number of brick edges for all rows. Note that we need to use hash map to only track potential (not all) cuts. If bricks are very wide, you'll get MLE if you store all cut positions.\\n```\\nint leastBricks(vector<vector<int>>& wall) {\\n    unordered_map<int, int> edges;\\n    auto min_bricks = wall.size();\\n    for (auto row : wall)\\n        for (auto i = 0, width = 0; i < row.size() - 1; ++i) // skip last brick\\n            min_bricks = min(min_bricks, wall.size() - (++edges[width += row[i]]));\\n    return min_bricks;\\n}\\n```"
		},
		{
			"lc_ans_id":"101726",
			"view":"1434",
			"top":"2",
			"title":"Clear Python Solution",
			"vote":"7",
			"content":"```\\nclass Solution(object):\\n    def leastBricks(self, wall):\\n        \"\"\"\\n        :type wall: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        d = collections.defaultdict(int)\\n        for line in wall:\\n            i = 0\\n            for brick in line[:-1]:\\n                i += brick\\n                d[i] += 1\\n        # print len(wall), d\\n        return len(wall)-max(d.values()+[0])\\n```"
		},
		{
			"lc_ans_id":"101794",
			"view":"892",
			"top":"3",
			"title":"Verbose Java Solution, PriorityQueue",
			"vote":"6",
			"content":"```\\npublic class Solution {\\n    public int leastBricks(List<List<Integer>> wall) {\\n        int R = wall.size(), min = R;\\n        if (R == 1 && wall.get(0).size() > 1) return 0;\\n        \\n        // [0: end, 1: row, 2: col]\\n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> (a[0] - b[0]));\\n        \\n        for (int i = 0; i < R; i++) {\\n            pq.add(new int[] {wall.get(i).get(0), i, 0});\\n        }\\n        \\n        while (!pq.isEmpty()) {\\n            int end = pq.peek()[0], count = 0;\\n            \\n            while (!pq.isEmpty() && pq.peek()[0] == end) {\\n                count++;\\n                int[] brick = pq.poll();\\n                if (brick[2] < wall.get(brick[1]).size() - 1) {\\n                    pq.add(new int[] {end + wall.get(brick[1]).get(brick[2] + 1), brick[1], brick[2] + 1});\\n                }\\n            }\\n            \\n            if (!pq.isEmpty()) {\\n                min = Math.min(min, R - count);\\n            }\\n        }\\n        \\n        return min;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101752",
			"view":"3590",
			"top":"4",
			"title":"Neat Java Solution O(n) using hashmap",
			"vote":"6",
			"content":"```\\npublic class Solution {\\n    public int leastBricks(List < List < Integer >> wall) {\\n        HashMap < Integer, Integer > map = new HashMap < > ();\\n        for (List < Integer > row: wall) {\\n            int sum = 0;\\n            for (int i = 0; i < row.size() - 1; i++) {\\n                sum += row.get(i);\\n                if (map.containsKey(sum))\\n                    map.put(sum, map.get(sum) + 1);\\n                else\\n                    map.put(sum, 1);\\n            }\\n        }\\n        int res = wall.size();\\n        for (int key: map.keySet())\\n            res = Math.min(res, wall.size() - map.get(key));\\n        return res;\\n    }\\n}"
		},
		{
			"lc_ans_id":"101746",
			"view":"675",
			"top":"5",
			"title":"[C++] [Java] Clean Code",
			"vote":"3",
			"content":"for every row, whenever add a brick, record the end position as +1.\\ngoal is to find the position where most row have a break on that position.\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int leastBricks(vector<vector<int>>& wall) {\\n        map<int, int> ends;\\n        int maxend = 0;\\n        for (int i = 0; i < wall.size(); i++) {\\n            int sum = 0;\\n            for (int j = 0; j + 1 < wall[i].size(); j++) {\\n                ends[sum += wall[i][j]]++;\\n                maxend = max(maxend, ends[sum]);\\n            }\\n        }\\n\\n        return wall.size() - maxend;\\n    }\\n};\\n```\\n**Java**\\n```\\npublic class Solution {\\n    public int leastBricks(List<List<Integer>> wall) {\\n        Map<Integer, Integer> ends = new HashMap<Integer, Integer>();\\n        int maxend = 0;\\n        for (int i = 0; i < wall.size(); i++) {\\n            int sum = 0;\\n            for (int j = 0; j + 1 < wall.get(i).size(); j++) {\\n                sum += wall.get(i).get(j);\\n                ends.put(sum, ends.getOrDefault(sum, 0) + 1);\\n                maxend = Math.max(maxend, ends.get(sum));\\n            }\\n        }\\n\\n        return wall.size() - maxend;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101739",
			"view":"139",
			"top":"6",
			"title":"Draw a line through the most common sum",
			"vote":"1",
			"content":"Find the most common sum of all the rows.\\nReturn the difference of wall size and most common sum.\\nThats it!!\\n```\\n    public int leastBricks(List<List<Integer>> wall) {\\n        int max = Integer.MIN_VALUE;\\n        int sum = 0;        \\n        Map<Integer, Integer> map = new HashMap<>();\\n        for(List<Integer> l : wall) {\\n            sum = 0;\\n            for(int i=0;i<l.size()-1;i++) {\\n                sum += l.get(i);\\n                map.put(sum, map.getOrDefault(sum,0)+1);\\n                max = Math.max(max, map.get(sum));\\n            }\\n        }\\n        return (max==Integer.MIN_VALUE)?wall.size():wall.size()-max;\\n    }\\n```"
		},
		{
			"lc_ans_id":"101742",
			"view":"192",
			"top":"7",
			"title":"Easy Python with dictionary",
			"vote":"1",
			"content":"## Brute Force way\\nMy first idea was to go through each column of the whole wall, but it would lead to TLE, since the length of a brick could be very huge:\\n```py\\nclass Solution(object):\\n    def leastBricks(self, wall):\\n        least = len(wall)\\n        while wall[0] and not (wall[0][0] == 1 and len(wall[0]) == 1):\\n            count = 0\\n            for row in wall:\\n                if row[0] == 1:\\n                    row.pop(0)\\n                else:\\n                    row[0] -= 1\\n                    count += 1\\n            least = min(least, count)\\n        return least\\n```\\n\\n## Using hashtable\\nThen I realized I only needed to count the occurrence of each brick space and used the height of wall to subtract the max occurrence of the space\\n```py\\nclass Solution(object):\\n    def leastBricks(self, wall):\\n        spaceMap = dict()\\n        for row in wall:\\n            spacelen = 0\\n            for brick in row[:-1]: # avoid counting wall edge\\n                spacelen += brick\\n                if spacelen not in spaceMap:\\n                    spaceMap[spacelen] = 1\\n                else:\\n                    spaceMap[spacelen] += 1\\n        least = len(wall) - max(spaceMap.values())\\n        return least\\n```\\n> Time Complexity: O(n), n for number of bricks\\n> Space Complexity: O(n)"
		},
		{
			"lc_ans_id":"101751",
			"view":"72",
			"top":"8",
			"title":"Consice C++ solution using unordered_map",
			"vote":"1",
			"content":"The worst case scenario is that we have # of rows cuts which will basically cut every brick from each row. So we keep an unordered_set to store the possible cuts and how many time this cut has been visited by all the rows. Then # of rows + mincut (which is a minus number here) will get us the minimal cuts.\\n```\\n    int leastBricks(vector<vector<int>>& wall) \\n    {\\n        if(wall.empty()) return 0;\\n        int row = wall.size(), width = 0, minCut = 0;\\n        unordered_map<int, int> cut;\\n        for(int i=0; i<row; i++)\\n        {\\n            int rowWidth = 0;\\n            for(int j=0; j<wall[i].size()-1; j++) \\n            {\\n                rowWidth += wall[i][j];\\n                cut[rowWidth]--;\\n                minCut = min(minCut, cut[rowWidth]);\\n            }\\n        }\\n        return row+minCut;\\n    }\\n```"
		},
		{
			"lc_ans_id":"101724",
			"view":"17",
			"top":"9",
			"title":"python simple dictionary",
			"vote":"0",
			"content":"```\\nclass Solution(object):\\n    def leastBricks(self, wall):\\n        \"\"\"\\n        :type wall: List[List[int]]\\n        :rtype: int\\n        \"\"\"\\n        edgeCount = {}\\n        for i in range(len(wall)):\\n            sum = 0\\n            for j in range(len(wall[i]) - 1):\\n                sum += wall[i][j]\\n                if edgeCount.has_key(sum):\\n                    edgeCount[sum] += 1\\n                else:\\n                    edgeCount[sum] = 1\\n        edgeCount = sorted(edgeCount.items(), key=lambda d: d[1], reverse=True)\\n        if len(edgeCount) == 0:\\n            return len(wall)\\n        return len(wall) - edgeCount[0][1]"
		}
	],
	"id":"537",
	"title":"Brick Wall",
	"content":"<p>There is a brick wall in front of you. The wall is rectangular and has several rows of bricks. The bricks have the same height but different width. You want to draw a vertical line from the <b>top</b> to the <b>bottom</b> and cross the <b>least</b> bricks. </p>\r\n\r\n<p>\r\nThe brick wall is represented by a list of rows. Each row is a list of integers representing the width of each brick in this row from left to right. \r\n</p>\r\n\r\n<p>If your line go through the edge of a brick, then the brick is not considered as crossed. You need to find out how to draw the line to cross the least bricks and return the number of crossed bricks. </p>\r\n\r\n<p><b>You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks. </b></p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n[[1,2,2,1],\r\n [3,1,2],\r\n [1,3,2],\r\n [2,4],\r\n [3,1,2],\r\n [1,3,1,1]]\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> \r\n<img src=\"/static/images/problemset/brick_wall.png\" width = \"30%\" />\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The width sum of bricks in different rows are the same and won't exceed INT_MAX.</li>\r\n<li>The number of bricks in each row is in range [1,10,000]. The height of wall is in range [1,10,000]. Total number of bricks of the wall won't exceed 20,000. </li>\r\n</ol>\r\n</p>",
	"frequency":"117",
	"ac_num":"18585"
}