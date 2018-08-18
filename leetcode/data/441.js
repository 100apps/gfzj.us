{
	"difficulty":"1",
	"submit_num":"69909",
	"show_id":"447",
	"leetcode_id":"447",
	"answers":[
		{
			"lc_ans_id":"92861",
			"view":"24360",
			"top":"0",
			"title":"Clean java solution: O(n^2) 166ms",
			"vote":"88",
			"content":"    public int numberOfBoomerangs(int[][] points) {\\n        int res = 0;\\n\\n        Map<Integer, Integer> map = new HashMap<>();\\n        for(int i=0; i<points.length; i++) {\\n            for(int j=0; j<points.length; j++) {\\n                if(i == j)\\n                    continue;\\n                \\n                int d = getDistance(points[i], points[j]);                \\n                map.put(d, map.getOrDefault(d, 0) + 1);\\n            }\\n            \\n            for(int val : map.values()) {\\n                res += val * (val-1);\\n            }            \\n            map.clear();\\n        }\\n        \\n        return res;\\n    }\\n    \\n    private int getDistance(int[] a, int[] b) {\\n        int dx = a[0] - b[0];\\n        int dy = a[1] - b[1];\\n        \\n        return dx*dx + dy*dy;\\n    }\\n\\t\\n\\tTime complexity:  O(n^2)\\n\\tSpace complexity: O(n)"
		},
		{
			"lc_ans_id":"92872",
			"view":"6873",
			"top":"1",
			"title":"7 lines ~1050 ms C++",
			"vote":"22",
			"content":"    int numberOfBoomerangs(vector<pair<int, int>>& points) {\\n        int booms = 0;\\n        for (auto &p : points) {\\n            unordered_map<double, int> ctr(points.size());\\n            for (auto &q : points)\\n                booms += 2 * ctr[hypot(p.first - q.first, p.second - q.second)]++;\\n        }\\n        return booms;\\n    }\\n\\nTry each point as the \"axis\" of the boomerang, i.e., the \"i\" part of the triple. Group its distances to all other points by distance, counting the boomerangs as we go. No need to avoid q == p, as it'll be alone in the distance == 0 group and thus won't influence the outcome.\\n\\nSubmitted five times, accepted in 1059, 1022, 1102, 1026 and 1052 ms, average is 1052.2 ms. The initial capacity for `ctr` isn't necessary, just helps make it fast. Without it, I got accepted in 1542, 1309, 1302, 1306 and 1338 ms."
		},
		{
			"lc_ans_id":"92868",
			"view":"5778",
			"top":"2",
			"title":"Short Python O(n^2) hashmap solution",
			"vote":"21",
			"content":"for each point, create a hashmap and count all points with same distance. If for a point p, there are k points with distance d, number of boomerangs corresponding to that are k*(k-1). Keep adding these to get the final result.\\n```\\n        res = 0\\n        for p in points:\\n            cmap = {}\\n            for q in points:\\n                f = p[0]-q[0]\\n                s = p[1]-q[1]\\n                cmap[f*f + s*s] = 1 + cmap.get(f*f + s*s, 0)\\n            for k in cmap:\\n                res += cmap[k] * (cmap[k] -1)\\n        return res\\n\\n```"
		},
		{
			"lc_ans_id":"92870",
			"view":"10223",
			"top":"3",
			"title":"Share my straightforward solution with HashMap, O(N^2)",
			"vote":"20",
			"content":"The idea is simple, for every point, we aggregate points with the same distance and put them in a `Set`. \\n\\nUpdate: \\n\\nI got this solution during the contest, and as troy351  said, Actually we don't need `Map<Integer, Set>`, and `Map<Integer, Integer>` is enough.\\n\\n\\n\\n```\\npublic class Solution {\\n    public int numberOfBoomerangs(int[][] points) {\\n        if(points.length==0 || points[0].length==0) return 0;\\n        int ret = 0;\\n        for(int i=0;i<points.length;i++){\\n            Map<Integer, Set<int[]>> map = new HashMap<>();\\n            int[] p = points[i];\\n            for(int j=0;j<points.length;j++){\\n                if(j==i) continue;\\n                int[] q = points[j];\\n                int dis = getDis(p, q);\\n                if(!map.containsKey(dis)) map.put(dis, new HashSet<int[]>());\\n                map.get(dis).add(q);\\n            }\\n            for(Integer key : map.keySet()){\\n                int size = map.get(key).size();\\n                if(size>=2) ret += (size*(size-1));\\n            }\\n        }\\n        return ret;\\n    }\\n    public int getDis(int[] p, int[] q){\\n        int a = p[0]-q[0];\\n        int b = p[1]-q[1];\\n        return a*a+b*b;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"92866",
			"view":"5439",
			"top":"4",
			"title":"C++ clean solution O(n^2). Fully commented and explained.",
			"vote":"11",
			"content":"For each point ```i```,  ```map<```distance ```d,``` count of all points at distance ```d``` from ```i>```.\\nGiven that count, choose ```2``` (with permutation) from it, to form a boomerang with point ```i```.\\n[use ```long``` appropriately for ```dx```, ```dy``` and ```key```; though not required for the given test cases]\\n\\nTime Complexity: ```O(n^2)```\\n\\nUpdated: Using initial size for the map to avoid table resizing. Thanks @StefanPochmann \\n```\\nint numberOfBoomerangs(vector<pair<int, int>>& points) {\\n    \\n    int res = 0;\\n    \\n    // iterate over all the points\\n    for (int i = 0; i < points.size(); ++i) {\\n        \\n        unordered_map<long, int> group(points.size());\\n        \\n        // iterate over all points other than points[i]\\n        for (int j = 0; j < points.size(); ++j) {\\n            \\n            if (j == i) continue;\\n            \\n            int dy = points[i].second - points[j].second;\\n            int dx = points[i].first - points[j].first;\\n            \\n            // compute squared euclidean distance from points[i]\\n            int key = dy * dy;\\n            key += dx * dx;\\n            \\n            // accumulate # of such \"j\"s that are \"key\" distance from \"i\"\\n            ++group[key];\\n        }\\n        \\n        for (auto& p : group) {\\n            if (p.second > 1) {\\n                /*\\n                 * for all the groups of points, \\n                 * number of ways to select 2 from n = \\n                 * nP2 = n!/(n - 2)! = n * (n - 1)\\n                 */\\n                res += p.second * (p.second - 1);\\n            }\\n        }\\n    }\\n    \\n    return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"92885",
			"view":"1263",
			"top":"5",
			"title":"17 lines ~106 ms Java",
			"vote":"9",
			"content":"```\\npublic class Solution {\\n    public int numberOfBoomerangs(int[][] points) {\\n        int result = 0;\\n        HashMap<Integer,Integer> distMap = new HashMap<Integer,Integer>();\\n        for(int[] i : points) {\\n            for(int[] j : points) {\\n                if(i==j) continue;\\n                int dist = (i[0]-j[0])*(i[0]-j[0]) + (i[1]-j[1])*(i[1]-j[1]);\\n                int prevDist = distMap.containsKey(dist) ? distMap.get(dist) : 0;\\n                result += 2*prevDist;\\n                distMap.put(dist, prevDist+1);\\n            }\\n            distMap.clear();\\n        }\\n        return result;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"92874",
			"view":"1493",
			"top":"6",
			"title":"Simple Java Solution using HashMap, beats 90%",
			"vote":"5",
			"content":"Idea is to add the distance between ```point i and point j``` in a HashMap and keep checking the value. Trick is to keep incrementing the value when you will find distance equal to key. It will take care of all the combinations possible. Also as ```[a,b,c] and [a,c,b] ```are two different cases we need to multiply count by 2.\\n```\\npublic int numberOfBoomerangs(int[][] p) {\\n        int n = p.length;\\n        if(n==0) return 0;\\n        int count = 0;\\n        for(int i=0;i<n;i++){\\n            Map<Double,Integer> map = new HashMap<>();\\n            for(int j=0;j<n;j++){\\n                if(map.containsKey(distance(p[i],p[j]))){\\n                    int value = map.get(distance(p[i],p[j]));\\n                    count+=2*value;\\n                    map.put(distance(p[i],p[j]),value+1);\\n                } else {\\n                    map.put(distance(p[i],p[j]),1);\\n                }\\n            }\\n        }\\n        return count;\\n    }\\n    \\n    public Double distance(int[] a, int[]b){\\n        return Math.sqrt(Math.pow(a[0]-b[0],2) + Math.pow(a[1]-b[1],2));\\n    }```"
		},
		{
			"lc_ans_id":"92901",
			"view":"968",
			"top":"7",
			"title":"9-line Simple Python Solution with Hash O(n^2)",
			"vote":"5",
			"content":"    class Solution(object):\\n        def numberOfBoomerangs(self, points):\\n            count = 0\\n            for i in range(len(points)):\\n                h = {}\\n                for j in range(len(points)):\\n                    if i != j:\\n                        dt = pow(points[i][0] - points[j][0], 2) + pow(points[i][1] - points[j][1], 2)\\n                        count += h.get(dt, 0)\\n                        h[dt] = h.get(dt, 0) + 1\\n            return count*2"
		},
		{
			"lc_ans_id":"92908",
			"view":"1307",
			"top":"8",
			"title":"1-line Python O(N^2)",
			"vote":"4",
			"content":"**Update:**\\n\\n1-line solution as suggested by @StefanPochmann \\n```python\\ndef numberOfBoomerangs(self, points):\\n    return sum(\\n        n * (n - 1)\\n        for x1, y1 in points\\n        for n in collections.Counter(\\n            (x1 - x2) ** 2 + (y1 - y2) ** 2\\n            for x2, y2 in points).values())\\n```\\n\\n**Old:**\\n\\nJust for fun:\\n```python\\ndef numberOfBoomerangs(self, points):\\n    dist = lambda (x1, y1, x2, y2): (x1 - x2) ** 2 + (y1 - y2) ** 2\\n    \\n    return sum(\\n        n * (n - 1)\\n        for x1, y1 in points\\n        for n in collections.Counter(dist((x1, y1, x2, y2)) for x2, y2 in points).values())\\n```\\n\\nHere is a more clear version:\\n```python\\ndef numberOfBoomrangs(self, points):\\n    nums = 0\\n    for x1, y1 in points:\\n        distance = collections.defaultdict(int)\\n        for x2, y2 in points:\\n            dx = abs(x2 - x1)\\n            dy = abs(y2 - y1)\\n            d = dx * dx + dy * dy\\n            distance[d] += 1\\n\\n        nums += sum(n * (n-1) for n in distance.values())\\n    return nums\\n```"
		},
		{
			"lc_ans_id":"92920",
			"view":"632",
			"top":"9",
			"title":"C# - HashTable solution O(n^2) time, O(n) space with explaination",
			"vote":"3",
			"content":"\\nForeach point, call this a center point, group the other points into buckets where each bucket contains points that are the same distance from the center point. Each bucket with more than 1 point can make boomerangs.\\n\\nHow many boomerangs can a bucket make?\\n\\nEach point in a bucket can make a boomerang with all other points in the bucket. A bucket with N points, can make N * (N - 1) boomerangs.\\n\\n```    \\n    public int NumberOfBoomerangs(int[,] points) \\n    {\\n        int n = points.GetLength(0);\\n        int count = 0;\\n\\n        for (int p0 = 0; p0 < n; p0++)\\n        {\\n            // Keep a lookup of the distance from p0 to all other points\\n            // if you find another point with same distance give that distance\\n            // a count of 1 (one other point), if you see another point of this\\n            // distance move count to 2 and so on.  \\n            Dictionary<int,int> distSqMap = new Dictionary<int,int>();\\n            for (int p1 = 0; p1 < n; p1++)\\n            {\\n                if (p1 == p0) continue;\\n                \\n                // avoid square root calculation - do distance check against distance square\\n                int distSq = (points[p0,0] - points[p1,0])*(points[p0,0] - points[p1,0]) \\n                        + (points[p0,1] - points[p1,1])*(points[p0,1] - points[p1,1]);\\n                \\n                if (!distSqMap.ContainsKey(distSq))\\n                {\\n                    distSqMap[distSq] = 0;\\n                }\\n                else\\n                {\\n                    distSqMap[distSq]++;\\n                }\\n            }\\n            \\n            // count number of combinations for groups of equally distanced points\\n            foreach (int groupCount in distSqMap.Values)\\n            {\\n                count += groupCount * (groupCount + 1);\\n            }\\n        }    \\n        \\n        return count;\\n    }\\n```"
		}
	],
	"id":"441",
	"title":"Number of Boomerangs",
	"content":"<p>Given <i>n</i> points in the plane that are all pairwise distinct, a \"boomerang\" is a tuple of points <code>(i, j, k)</code> such that the distance between <code>i</code> and <code>j</code> equals the distance between <code>i</code> and <code>k</code> (<b>the order of the tuple matters</b>).</p>\r\n\r\n<p>Find the number of boomerangs. You may assume that <i>n</i> will be at most <b>500</b> and coordinates of points are all in the range <b>[-10000, 10000]</b> (inclusive).</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n[[0,0],[1,0],[2,0]]\r\n\r\n<b>Output:</b>\r\n2\r\n\r\n<b>Explanation:</b>\r\nThe two boomerangs are <b>[[1,0],[0,0],[2,0]]</b> and <b>[[1,0],[2,0],[0,0]]</b>\r\n</pre>\r\n</p>",
	"frequency":"271",
	"ac_num":"32298"
}