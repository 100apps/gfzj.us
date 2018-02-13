{
	"difficulty":"2",
	"submit_num":"43599",
	"show_id":"356",
	"leetcode_id":"356",
	"answers":[
		{
			"lc_ans_id":"82970",
			"view":"8957",
			"top":"0",
			"title":"Simple java hashset solution",
			"vote":"64",
			"content":"       public boolean isReflected(int[][] points) {\\n        int max = Integer.MIN_VALUE;\\n        int min = Integer.MAX_VALUE;\\n        HashSet<String> set = new HashSet<>();\\n        for(int[] p:points){\\n            max = Math.max(max,p[0]);\\n            min = Math.min(min,p[0]);\\n            String str = p[0] + \"a\" + p[1];\\n            set.add(str);\\n        }\\n        int sum = max+min;\\n        for(int[] p:points){\\n            //int[] arr = {sum-p[0],p[1]};\\n            String str = (sum-p[0]) + \"a\" + p[1];\\n            if( !set.contains(str))\\n                return false;\\n            \\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"82968",
			"view":"5224",
			"top":"1",
			"title":"11ms two-pass HashSet-based Java Solution",
			"vote":"20",
			"content":"The idea is quite simple. If there exists a line reflecting the points, then each pair of symmetric points will have their x coordinates adding up to the same value, including the pair with the maximum and minimum x coordinates. So, in the first pass, I iterate through the array, adding each point to the hash set, and keeping record of the minimum and maximum x coordinates. Then, in the second pass, I check for every point to the left of the reflecting line, if its symmetric point is in the point set or not. If all points pass the test, then there exists a reflecting line. Otherwise, not.\\n\\nBy the way, here, to hash the content of an array, rather than the reference value, I use **Arrays.hashCode(int[])** first, and then re-hash this hash code. You can also use **Arrays.toString(int[])** to first convey the 2d array to a string, and then hash the string. But the second method is slower.\\n\\n    public class Solution {\\n        public boolean isReflected(int[][] points) {\\n            HashSet<Integer> pointSet = new HashSet<>();\\n            int sum;\\n            int maxX, minX;\\n            \\n            minX = Integer.MAX_VALUE;\\n            maxX = Integer.MIN_VALUE;\\n            for(int[] point:points) {\\n                maxX = Math.max(maxX, point[ 0 ]);\\n                minX = Math.min(minX, point[ 0 ]);\\n                pointSet.add(Arrays.hashCode(point));\\n            }\\n            \\n            sum = maxX+minX;\\n            for(int[] point:points) {\\n                if(!pointSet.contains(Arrays.hashCode(new int[]{sum-point[ 0 ], point[ 1 ]}))) {\\n                    return false;\\n                }\\n            }\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83009",
			"view":"4304",
			"top":"2",
			"title":"1 line Ruby, 2 lines Python",
			"vote":"13",
			"content":"**Idea:** Reflect the points by replacing every x with minX+maxX-x and then check whether you get the same points. Why minX+maxX-x? I actually thought of it as minX+(maxX-x), i.e., first the subtraction (maxX-x). That's how far x is away from the max, so instead go that distance from the min.\\n\\n---\\n\\n**Update to reflect the changed problem:** (Originally, the problem was about a set of points, so no duplicates.)\\n```\\ndef is_reflected(points)\\n  points.sort!.uniq == points.map { |x, y| [points[0][0] + points[-1][0] - x, y] }.sort.uniq\\nend\\n```\\n```\\ndef isReflected(self, points):\\n    points = sorted(set(map(tuple, points)))\\n    return points == sorted((points[0][0] + points[-1][0] - x, y)\\n                            for x, y in points)\\n```\\n---\\n\\n**Ruby**\\n\\n    def is_reflected(points)\\n      points.sort! == points.map { |x, y| [points[0][0] + points[-1][0] - x, y] }.sort\\n    end\\n\\n---\\n\\n**Python**\\n\\n    def isReflected(self, points):\\n        points.sort()\\n        return points == sorted([points[0][0] + points[-1][0] - x, y]\\n                                for x, y in points)\\n\\n---\\n\\nA linear time one:\\n\\n    def isReflected(self, points):\\n        if not points: return True\\n        X = min(points)[0] + max(points)[0]\\n        return {(x, y) for x, y in points} == {(X - x, y) for x, y in points}\\n\\nShorter, but I think less nice:\\n\\n        return set(map(tuple, points)) == {(X - x, y) for x, y in points}"
		},
		{
			"lc_ans_id":"82997",
			"view":"907",
			"top":"3",
			"title":"What is exactly problem?",
			"vote":"5",
			"content":"If I have two points say (-4,1) and (-2, 6)\\nThen reflection of line is (4, 1) and (2, 6).\\n\\nSo For this problem if I have input set = [(-4,1), (-2, 6), (4, 1), (2, 6)]\\nThen it should return true. But say I've additional point on line which is\\nnot reflected then False.\\n\\nSo I'm thinking simplest O(n^2) solution first, (really didn't understand what question is!)\\n\\n1) For every point I need to find reflected point (-x, same y)\\n2) Then after grouping into two set, need to see in both group each point has same slope?\\n\\nIs my understanding of question right, if so what I think as brute-force (1) & (2) are right?"
		},
		{
			"lc_ans_id":"82977",
			"view":"1494",
			"top":"4",
			"title":"40ms C++ solution using set in the map, two pointers",
			"vote":"5",
			"content":"Using set in the map to keep the x values of a particular y value sorted. The second pass iterate from the beginning and end of the set and compare with the middle line.\\n\\n    bool isReflected(vector<pair<int, int>>& points) {\\n        int len = points.size();\\n        if (len==0 || len==1) return true;\\n        \\n        unordered_map<int, set<int>> mp;\\n        int max = points[0].first, min = points[0].first;\\n        // build the map, find min and max\\n        for (int i=0; i<len; ++i) {\\n            if (points[i].first < min) min = points[i].first;\\n            if (points[i].first > max) max = points[i].first;\\n            mp[points[i].second].insert(points[i].first);\\n        }\\n        double line = (min + max) / 2.0;\\n        \\n        // mirror the sorted x value in the set using two pointer\\n        for (auto it = mp.begin(); it!=mp.end(); ++it) {\\n            set<int>& s = it->second;\\n            for (auto start=s.begin(), end = s.end(); start!=end; ++start) {\\n                if ((*start + *(--end)) / 2.0 != line)\\n                    return false;\\n                if (start==end) break;\\n            }\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"82990",
			"view":"1931",
			"top":"5",
			"title":"8ms Java. No hash, just sort. O(1) space",
			"vote":"5",
			"content":"The trick is in comparator.\\n\\n    public class Solution {\\n        int mid = 0;\\n        public boolean isReflected(int[][] points) {\\n            if (points.length<=1) return true;\\n            int min = points[0][0];\\n            int max = points[0][0];\\n            for (int[] p : points){\\n                min = Math.min(min,p[0]);\\n                max = Math.max(max,p[0]);\\n            }\\n            mid = (min+max)/2;\\n            \\n            Arrays.sort(points, new myCompare());\\n            \\n            int left = 0, right = points.length -1;\\n            while (left <= right){\\n                if ((points[left][0] -min ) != (max - points[right][0]))\\n                    return false;\\n                if (points[left][0]==points[right][0])\\n                    return true;\\n                if (points[left][1] != points[right][1])\\n                    return false;\\n                ++left;\\n                --right;\\n            }\\n            return true;\\n        }\\n        public class myCompare implements Comparator<int[]>{\\n                @Override\\n                public int compare(int[] p1, int[] p2){\\n                    if (p1[0]!=p2[0])\\n                        return Integer.compare(p1[0],p2[0]);\\n                    if (p1[0] <= mid)\\n                        return Integer.compare(p1[1],p2[1]);\\n                    return Integer.compare(p2[1],p1[1]);\\n                }\\n            }\\n    }"
		},
		{
			"lc_ans_id":"83002",
			"view":"767",
			"top":"6",
			"title":"Concise O(n) C++ Solution",
			"vote":"2",
			"content":"    struct hashFunc {\\n        size_t operator()(const pair<int, int> &point) const {\\n            return hash<int>()(point.first) ^ (hash<int>()(point.second) << 1) >> 1;\\n        }\\n    };\\n    \\n    class Solution {\\n    public:\\n        bool isReflected(vector<pair<int, int>>& points) {\\n            if (points.size() <= 1) return true;\\n            unordered_set<pair<int, int>, hashFunc> points_set;\\n            int xmin = numeric_limits<int>::max();\\n            int xmax = numeric_limits<int>::min();\\n            for (const auto point : points) {\\n                xmin = min(xmin, point.first);\\n                xmax = max(xmax, point.first);\\n                points_set.emplace(point);\\n            }\\n            for (const auto point : points_set) {\\n                if (!points_set.count(make_pair(xmax + xmin - point.first, point.second)))\\n                    return false;\\n            }\\n            return true;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"83018",
			"view":"504",
			"top":"7",
			"title":"O(N) time/space complexity C++ solution with unordered_set",
			"vote":"2",
			"content":"Idea:\\n\\n1. Notice that if there is a valid symmetry line, the two points with max x and min x must be symmetric about it.\\n2. After finding out the line, iterate through each point and look for its symmetric counterpart. If symmetric point cannot be found, return false.\\n\\nIn order to store pairs I used a custom hash. In other languages it should not be necessary.\\n\\n    struct pairhash {\\n      template <typename T, typename U>\\n      std::size_t operator() (const std::pair<T, U> &x) const\\n      {\\n        return  3 * std::hash<T>()(x.first) + std::hash<U>()(x.second);\\n      }\\n    };\\n    \\n    bool isReflected(vector<pair<int, int>>& points) {\\n        unordered_set<pair<int, int>, pairhash> set_points;\\n        int max_x = INT_MIN;\\n        int min_x = INT_MAX;\\n        for (const auto& p : points) {\\n            max_x = max(max_x, p.first);\\n            min_x = min(min_x, p.first);\\n            set_points.emplace(p);\\n        }\\n        \\n        bool val = true;\\n        int symmetric_x_doubled = max_x + min_x;\\n        for (auto p : set_points) {\\n            auto reflect = make_pair(symmetric_x_doubled - p.first, p.second);\\n            if (set_points.count(reflect) == 0) {\\n                val = false;\\n            }\\n        }\\n        return val;\\n    }"
		},
		{
			"lc_ans_id":"82998",
			"view":"239",
			"top":"8",
			"title":"Easy to understand Python solution",
			"vote":"1",
			"content":"The idea is:\\n1) we ignore duplicates in all points with same y values and only save once for duplicates (e.g., for [16,1], [16,1], [16,1], we only save [16,1] once to the dictionary).\\n2) we calculate an average x value for all saved points\\n3) for all points with same y values, set two pointers (from left and right) to check whether the point pair has the same distance to the average x value.\\n\\n'''\\n    \\n    def isReflected(self, points):\\n\\n        if (not points):\\n            return True\\n\\n        dic = {}\\n        sumx = 0\\n        lenwithoutdup = 0\\n        for point in points:\\n            if point[1] not in dic:\\n                dic[point[1]] = {point[0]}\\n                sumx += point[0]\\n                lenwithoutdup += 1\\n            else:\\n                if point[0] not in dic[point[1]]:\\n                    dic[point[1]].add(point[0])\\n                    sumx += point[0]\\n                    lenwithoutdup += 1\\n\\n        #print sumx, lenwithoutdup\\n        avgx = float(sumx)/lenwithoutdup\\n        for item in dic:\\n            lst = list(dic[item])\\n            lst.sort()\\n            i, j = 0, len(lst)-1  # two pointers\\n            while i <= j:\\n                #print lst[i], avgx, lst[j]\\n                if lst[i] - avgx != avgx - lst[j]:\\n                    return False\\n                i += 1\\n                j -= 1\\n\\n        return True"
		},
		{
			"lc_ans_id":"83014",
			"view":"515",
			"top":"9",
			"title":"My wrong solution got accepted-testcase missing",
			"vote":"1",
			"content":"For testcase [[-16,1],[16,1],[16,1]],  my code below will return True but expected answer is False. \\nWhen I submit, it got accepted. \\nHowever, if I click on Run Code and use this testcase, it will show correctly that expected answer is False, and my return is True. \\n\\n\\n    class Solution(object):\\n        def isReflected(self, points):\\n            \"\"\"\\n            :type points: List[List[int]]\\n            :rtype: bool\\n            \"\"\"\\n            if not points:\\n                return True\\n    \\n            xList = [point[0] for point in points]\\n            minX = min(xList)\\n            maxX = max(xList)\\n            \\n            reflectX = (minX+maxX)/2.0\\n            \\n            table= collections.defaultdict(int)\\n            for point in points:\\n                table[(point[0], point[1])] += 1\\n    \\n            for point in points:\\n                if point[0] == reflectX:\\n                    continue\\n                if (2*reflectX-point[0], point[1]) in table and (point[0], point[1]) in table:\\n                    table[(2*reflectX-point[0], point[1])] -= 1\\n                    table[(point[0], point[1])] -= 1\\n                    continue\\n                else:\\n                    return False\\n            return True"
		}
	],
	"id":"356",
	"title":"Line Reflection",
	"content":"<p>Given n points on a 2D plane, find if there is such a line parallel to y-axis that reflect the given points.</p>\r\n\r\n<p>\r\n    <b>Example 1:</b><br/>\r\n</p>\r\n<p>\r\nGiven <i>points</i> = <code>[[1,1],[-1,1]]</code>, return <code>true</code>.\r\n</p>\r\n\r\n<p>\r\n    <b>Example 2:</b><br/>\r\n</p>\r\n<p>\r\nGiven <i>points</i> = <code>[[1,1],[-1,-1]]</code>, return <code>false</code>.\r\n</p>\r\n\r\n<p><b>Follow up:</b><br />\r\nCould you do better than O(<i>n</i><sup>2</sup>)?\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://discuss.leetcode.com/user/memoryless\">@memoryless</a> for adding this problem and creating all test cases.</p>",
	"frequency":"30",
	"ac_num":"13181"
}