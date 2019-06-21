{
	"difficulty":"3",
	"submit_num":"47407",
	"show_id":"391",
	"leetcode_id":"391",
	"answers":[
		{
			"lc_ans_id":"87181",
			"view":"18450",
			"top":"0",
			"title":"Really Easy Understanding Solution(O(n), Java)",
			"vote":"167",
			"content":"The right answer must satisfy two conditions:\\n1. the large rectangle area should be equal to the sum of small rectangles\\n2. count of all the points should be even, and that of all the four corner points should be one\\n\\n```\\npublic boolean isRectangleCover(int[][] rectangles) {\\n\\n        if (rectangles.length == 0 || rectangles[0].length == 0) return false;\\n\\n        int x1 = Integer.MAX_VALUE;\\n        int x2 = Integer.MIN_VALUE;\\n        int y1 = Integer.MAX_VALUE;\\n        int y2 = Integer.MIN_VALUE;\\n        \\n        HashSet<String> set = new HashSet<String>();\\n        int area = 0;\\n        \\n        for (int[] rect : rectangles) {\\n            x1 = Math.min(rect[0], x1);\\n            y1 = Math.min(rect[1], y1);\\n            x2 = Math.max(rect[2], x2);\\n            y2 = Math.max(rect[3], y2);\\n            \\n            area += (rect[2] - rect[0]) * (rect[3] - rect[1]);\\n            \\n            String s1 = rect[0] + \" \" + rect[1];\\n            String s2 = rect[0] + \" \" + rect[3];\\n            String s3 = rect[2] + \" \" + rect[3];\\n            String s4 = rect[2] + \" \" + rect[1];\\n            \\n            if (!set.add(s1)) set.remove(s1);\\n            if (!set.add(s2)) set.remove(s2);\\n            if (!set.add(s3)) set.remove(s3);\\n            if (!set.add(s4)) set.remove(s4);\\n        }\\n        \\n        if (!set.contains(x1 + \" \" + y1) || !set.contains(x1 + \" \" + y2) || !set.contains(x2 + \" \" + y1) || !set.contains(x2 + \" \" + y2) || set.size() != 4) return false;\\n        \\n        return area == (x2-x1) * (y2-y1);\\n    }\\n````"
		},
		{
			"lc_ans_id":"87180",
			"view":"15404",
			"top":"1",
			"title":"O(n) solution by counting corners with detailed explaination",
			"vote":"61",
			"content":"This is an expanded version of [my earlier post](https://discuss.leetcode.com/topic/55874/o-log-n-problem-2-and-o-n-problem-3-solution/3) under the contest discussion board.\\nThe following code passes through not only the OJ but also various test cases others have pointed out.\\n\\n#### Idea\\n![0_1472399247817_perfect_rectangle.jpg](/uploads/files/1472399247905-perfect_rectangle.jpg) \\n\\nConsider how the corners of all rectangles appear in the large rectangle if there's a perfect rectangular cover.\\n**Rule 1:** The local shape of the corner has to follow one of the three following patterns\\n* Corner of the large rectangle (blue): it occurs only once among all rectangles\\n* T-junctions (green): it occurs twice among all rectangles\\n* Cross (red): it occurs four times among all rectangles\\n\\n**Rule 2:** A point can only be the top-left corner of at most one sub-rectangle. Similarly it can be the top-right/bottom-left/bottom-right corner of  at most one sub-rectangle. Otherwise overlaps occur.\\n\\n#### Proof of correctness\\nObviously, any perfect cover satisfies the above rules. So the main question is whether there exists an input which satisfy the above rules, yet does not compose a rectangle.\\n\\nFirst, ***any overlap is not allowed based on the above rules*** because\\n- aligned overlap like [[0, 0, 1, 1], [0, 0, 2, 2]] are rejected by Rule 2.\\n- unaligned overlap will generate a corner in the interior of another sub-rectangle, so it will be rejected by Rule 1.\\n\\nSecond, consider the shape of boundary for the combined shape. The cross pattern does not create boundary. The corner pattern generates a straight angle on the boundary, and the T-junction generates a straight border. \\n***So the shape of the union of rectangles has to be rectangle(s).***\\n\\nFinally, if there are more than two non-overlapping rectangles, at least 8 corners will be found, and cannot be matched to the 4 bounding box corners (be reminded we have shown that there is no chance of overlapping). \\n***So the cover has to be a single rectangle*** if all above rules are satisfied.\\n\\n#### Algorithm\\n* **Step1:** Based on the above idea we maintain a mapping from (x, y)->mask by scanning the sub-rectangles from beginning to end. \\n    - (x, y) corresponds to corners of sub-rectangles\\n    - mask is a 4-bit binary mask. Each bit indicates whether there have been a sub-rectangle with a top-left/top-right/bottom-left/bottom-right corner at (x, y). If we see a conflict while updating mask, it suffice to return a false during the scan.\\n    - In the meantime we obtain the bounding box of all rectangles (which potentially be the rectangle cover) by getting the upper/lower bound of x/y values.\\n\\n* **Step 2:** Once the scan is done, we can just browse through the unordered_map to check the whether ***the mask corresponds to a T junction / cross, or corner if it is indeed a bounding box corner***.\\n(note: my earlier implementation uses counts of bits in mask to justify corners, and this would not work with certain cases as @StefanPochmann points out).\\n\\n#### Complexity\\nThe scan in step 1 is O(n) because it loop through rectangles and inside the loop it updates bounding box and unordered_map in O(1) time.\\n\\nStep2 visits 1 corner at a time with O(1) computations for at most 4n corners (actually much less because either corner overlap or early stopping occurs). So it's also O(n).\\n```\\n// pos encoding: 1 - TL 2- TR 4- BL 8-BR\\n// return false if a conflict in mask occurs (i.e. there used to be a rectangle with corner (x, y) at pos\\ninline bool insert_corner(unordered_map<int, unordered_map<int, int>>& corner_count, int x, int y, int pos) {\\n    int& m = corner_count[x][y];\\n    if (m & pos) return false;\\n    m |= pos;\\n    return true;\\n}\\n\\nbool isRectangleCover(vector<vector<int>>& rectangles) {\\n    // step 1: counting\\n    unordered_map<int, unordered_map<int, int>> corner_count;\\n    int minx = INT_MAX, maxx=INT_MIN, miny=INT_MAX, maxy=INT_MIN;\\n    for (auto& rect : rectangles) {\\n        minx = min(minx, rect[0]);\\n        maxx = max(maxx, rect[2]);\\n        miny = min(miny, rect[1]);\\n        maxy = max(maxy, rect[3]);\\n        if (!insert_corner(corner_count, rect[0], rect[1], 1)) return false;\\n        if (!insert_corner(corner_count, rect[2], rect[1], 2)) return false;\\n        if (!insert_corner(corner_count, rect[0], rect[3], 4)) return false;\\n        if (!insert_corner(corner_count, rect[2], rect[3], 8)) return false;\\n    }\\n    \\n    //step2: checking\\n    bool valid_corner[16] = {false};\\n    bool valid_interior[16] = {false};\\n    valid_corner[1] = valid_corner[2] = valid_corner[4] = valid_corner[8] = true;\\n    valid_interior[3] = valid_interior[5] = valid_interior[10] = valid_interior[12] = valid_interior[15] = true;\\n    \\n    for (auto itx = corner_count.begin(); itx != corner_count.end(); ++itx) {\\n        int x = itx->first;\\n        for (auto ity = itx->second.begin(); ity != itx->second.end(); ++ity) {\\n            int y = ity->first;\\n            int mask = ity->second;\\n            if (((x != minx && x != maxx) || (y != miny && y != maxy)) && !valid_interior[mask]) \\n                return false;\\n        }\\n    }\\n    return true;\\n}\\n```\\n\\nThe above code may be refined by changing the 2D unordered_map to 1D. But such improvements has no effect on complexity.\\n```\\nstruct pairhash {//double hash function for pair key\\npublic:\\n    template <typename T, typename U>\\n    size_t operator()(const pair<T, U> &rhs) const {\\n        size_t l = hash<T>()(rhs.first);\\n        size_t r = hash<U>()(rhs.second);\\n        return l + 0x9e3779b9 + (r << 6) + (r >> 2);\\n    }\\n};\\n\\nbool isRectangleCover(vector<vector<int>>& rectangles) {\\n    // step 1: counting\\n    unordered_map<pair<int, int>, int, pairhash> corner_count;\\n    int minx = INT_MAX, maxx=INT_MIN, miny=INT_MAX, maxy=INT_MIN;\\n    for (auto& rect : rectangles) {\\n        minx = min(minx, rect[0]);\\n        maxx = max(maxx, rect[2]);\\n        miny = min(miny, rect[1]);\\n        maxy = max(maxy, rect[3]);\\n        \\n        int& m1 = corner_count[make_pair(rect[0], rect[1])]; \\n        if (m1 & 1) return false; else m1 |= 1;\\n        int& m2 = corner_count[make_pair(rect[2], rect[1])];\\n        if (m2 & 2) return false; else m2 |= 2;\\n        int& m3 = corner_count[make_pair(rect[0], rect[3])]; \\n        if (m3 & 4) return false; else m3 |= 4;\\n        int& m4 = corner_count[make_pair(rect[2], rect[3])]; \\n        if (m4 & 8) return false; else m4 |= 8;\\n    }\\n    \\n    //step2: checking\\n    for (const auto& kv: corner_count) {\\n        pair<int, int> pos; int mask;\\n        tie(pos, mask) = kv;\\n        if ((pos.first != minx && pos.first != maxx) || (pos.second != miny && pos.second != maxy)) {\\n            if (mask != 3 && mask != 5 && mask != 10 && mask != 12 && mask != 15) return false;\\n        }\\n    }\\n    return true;\\n}\\n```"
		},
		{
			"lc_ans_id":"87188",
			"view":"7775",
			"top":"2",
			"title":"O(n log n) sweep line solution",
			"vote":"39",
			"content":"Standard sweep line solution. \\nBasic idea:\\nSort by x-coordinate.\\nInsert y-interval into TreeSet, and check if there are intersections.\\nDelete y-interval.\\n\\n```\\npublic class Event implements Comparable<Event> {\\n\\tint time;\\n\\tint[] rect;\\n\\n\\tpublic Event(int time, int[] rect) {\\n\\t\\tthis.time = time;\\n\\t\\tthis.rect = rect;\\n\\t}\\n\\t\\n\\tpublic int compareTo(Event that) {\\n\\t\\tif (this.time != that.time) return this.time - that.time;\\n\\t\\telse return this.rect[0] - that.rect[0];\\n\\t}\\n}\\n\\npublic boolean isRectangleCover(int[][] rectangles) {\\n\\tPriorityQueue<Event> pq = new PriorityQueue<Event> ();\\n        // border of y-intervals\\n\\tint[] border= {Integer.MAX_VALUE, Integer.MIN_VALUE};\\n\\tfor (int[] rect : rectangles) {\\n\\t\\tEvent e1 = new Event(rect[0], rect);\\n\\t\\tEvent e2 = new Event(rect[2], rect);\\n\\t\\tpq.add(e1);\\n\\t\\tpq.add(e2);\\n\\t\\tif (rect[1] < border[0]) border[0] = rect[1];\\n\\t\\tif (rect[3] > border[1]) border[1] = rect[3];\\n\\t}\\n\\tTreeSet<int[]> set = new TreeSet<int[]> (new Comparator<int[]> () {\\n\\t\\t@Override\\n                // if two y-intervals intersects, return 0\\n\\t\\tpublic int compare (int[] rect1, int[] rect2) {\\n\\t\\t\\tif (rect1[3] <= rect2[1]) return -1;\\n\\t\\t\\telse if (rect2[3] <= rect1[1]) return 1;\\n\\t\\t\\telse return 0;\\n\\t\\t}\\n\\t});\\n\\tint yRange = 0;\\n\\twhile (!pq.isEmpty()) {\\n\\t\\tint time = pq.peek().time;\\n\\t\\twhile (!pq.isEmpty() && pq.peek().time == time) {\\n\\t\\t\\tEvent e = pq.poll();\\n\\t\\t\\tint[] rect = e.rect;\\n\\t\\t\\tif (time == rect[2]) {\\n\\t\\t\\t\\tset.remove(rect);\\n\\t\\t\\t\\tyRange -= rect[3] - rect[1];\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tif (!set.add(rect)) return false;\\n\\t\\t\\t\\tyRange += rect[3] - rect[1];\\n\\t\\t\\t}\\n\\t\\t}\\n                // check intervals' range\\n\\t\\tif (!pq.isEmpty() && yRange != border[1] - border[0]) {\\n                        return false;\\n\\t\\t\\t//if (set.isEmpty()) return false;\\n\\t\\t\\t//if (yRange != border[1] - border[0]) return false;\\n\\t\\t}\\n\\t}\\n\\treturn true;\\n}\\n```"
		},
		{
			"lc_ans_id":"87207",
			"view":"4765",
			"top":"3",
			"title":"Short Java solution with explanation (updated)",
			"vote":"15",
			"content":"If all rectangles can form an exact rectangular area, they should follow these conditions:\\n1. The sum of area of all small rectangles should equal to the area of large rectangle.\\n2. At any position except outer four corners, the amount of overlapping corners should be even (2, 4).\\n3. Corners that overlap at the same point should be different type (top-left, top-right, bottom-left, bottom-right).\\n\\nSo, I used\\n1. Four int variables to record the boundaries of large rectangle and then calculate the area.\\n2. A hashmap that maps corner with its type.\\n3. Four numbers (1, 2, 4, 8) to represent four types of corner. Then use bit manipulation to modify and check.\\n\\nO(n) time complexity, O(n) space, 112 ms run time.\\nSpecial credit to @wu474purdue-edu \\n```\\npublic class Solution {\\n    Map<String, Integer> map = new HashMap<String, Integer>();\\n    public boolean isRectangleCover(int[][] rectangles) {\\n        if (rectangles.length == 0 || rectangles[0].length == 0) return false;\\n        int lx = Integer.MAX_VALUE, ly = lx, rx = Integer.MIN_VALUE, ry = rx, sum = 0;\\n        for (int[] rec : rectangles) {\\n            lx = Math.min(lx, rec[0]);\\n            ly = Math.min(ly, rec[1]);\\n            rx = Math.max(rx, rec[2]);\\n            ry = Math.max(ry, rec[3]);\\n            sum += (rec[2] - rec[0]) * (rec[3] - rec[1]);\\n            //bottom-left\\n            if (overlap(rec[0] + \" \" + rec[1], 1)) return false;\\n            //top-left\\n            if (overlap(rec[0] + \" \" + rec[3], 2)) return false;\\n            //bottom-right\\n            if (overlap(rec[2] + \" \" + rec[1], 4)) return false;\\n            //top-right\\n            if (overlap(rec[2] + \" \" + rec[3], 8)) return false;\\n        }\\n        int count = 0;\\n        Iterator<Integer> iter = map.values().iterator();\\n        while (iter.hasNext()) {\\n            Integer i = iter.next();\\n            if (i != 15 && i != 12 && i != 10 && i != 9 && i != 6 && i != 5 && i != 3) count++;\\n        }\\n        return count == 4 && sum == (rx - lx) * (ry - ly);\\n    }\\n    \\n    private boolean overlap(String corner, Integer type) {\\n        Integer temp = map.get(corner);\\n        if (temp == null) temp = type;\\n        else if ((temp & type) != 0) return true;\\n        else temp |= type;\\n        map.put(corner, temp);\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"87186",
			"view":"2209",
			"top":"4",
			"title":"Easy Understanding O(n) Python Solution",
			"vote":"11",
			"content":"Save area and all FOUR corners for each sub-rectangle:\\n1. sum of area of all sub-rectangle == area of maximum rectangle.\\n2. each corner should only appear either TWO or FOUR times, except four corners of big rectangle.\\n```\\nclass Solution(object):\\n    def isRectangleCover(self, rectangles):\\n        def recordCorner(point):\\n            if point in corners:\\n                corners[point] += 1\\n            else:\\n                corners[point] = 1\\n\\n        corners = {}                                # record all corners \\n        L, B, R, T, area = float('inf'), float('inf'), -float('inf'), -float('inf'), 0\\n\\n        for sub in rectangles:\\n            L, B, R, T = min(L, sub[0]), min(B, sub[1]), max(R, sub[2]), max(T, sub[3])\\n            ax, ay, bx, by = sub[:]\\n            area += (bx-ax)*(by-ay)                 # sum up the area of each sub-rectangle\\n            map(recordCorner, [(ax, ay), (bx, by), (ax, by), (bx, ay)])\\n\\n        if area != (T-B)*(R-L): return False        # check the area\\n\\n        big_four = [(L,B),(R,T),(L,T),(R,B)]\\n\\n        for bf in big_four:                         # check corners of big rectangle\\n            if bf not in corners or corners[bf] != 1:\\n                return False\\n\\n        for key in corners:                         # check existing \"inner\" points\\n            if corners[key]%2 and key not in big_four:\\n                return False\\n\\n        return True\\n```"
		},
		{
			"lc_ans_id":"87206",
			"view":"1407",
			"top":"5",
			"title":"C++ O(nlogn) solution using multiset, and O(n) solution using unordered_map",
			"vote":"7",
			"content":"O(nlogn) solution: check if areas equal, and also make sure no overlap exists:\\n\\nRegarding how the multiset is used to detect the overlapping:\\nThe trick is really inside the comparator: I used ```return a.second <= b.first;``` inside comparator. What it does is to make multiset treat overlapping elements as the same (equal) elements, and others as not equal (smaller/bigger).\\n\\ne.g.\\nSay we have ```a = [2,6]``` and ```b = [6,8]```, comparator will obviously return ```true``` for ```a.second <= b.first```, thus multiset will take ```a``` as the smaller element.\\nIn another case say we have ```a=[2,6]``` and ```b=[5,8]```, comparator will return ```false``` for both ```a.second <= b.first``` and ```b.second <= a.first```. As a result, multiset will treat ```a``` and ```b``` as same value. This is because by definition, the function will treat two elements as the same if both ```comp(a, b)``` and ```comp(b, a)``` return ```false```.\\n\\nGiven above, if the multiset.find() has found an element that's already in the multiset, we know there's overlapping existing.\\n```\\nclass Solution {\\nprivate:\\n    struct comp {\\n        bool operator () (const pair<int, int>& a, const pair<int, int>& b) { return a.second <= b.first; }\\n    };\\n    \\npublic:\\n    bool isRectangleCover(vector<vector<int>>& rectangles) {\\n        int area = 0, xmin = INT_MAX, ymin = INT_MAX, xmax = INT_MIN, ymax = INT_MIN;\\n        vector<vector<int>> verticalEdges;  // x, insertion/deletion event, ysmall, ylarge\\n        multiset<pair<int, int>, comp> s;   // for detecting overlaps\\n        \\n        // Calculate area, and configure verticalEdges\\n        for (auto v : rectangles) {\\n            area += (v[2] - v[0]) * (v[3] - v[1]);\\n            xmin = min(xmin, v[0]), ymin = min(ymin, v[1]), xmax = max(xmax, v[2]), ymax = max(ymax, v[3]);\\n            verticalEdges.push_back({v[0], 1, v[1], v[3]}), verticalEdges.push_back({v[2], -1, v[1], v[3]});\\n        }\\n        if (area != (xmax - xmin) * (ymax - ymin)) { return false; }\\n        \\n        // Check if any overlap exists\\n        sort(verticalEdges.begin(), verticalEdges.end());\\n        for (auto v : verticalEdges) {\\n            auto it = s.find(make_pair(v[2], v[3]));\\n            if (v[1] > 0) {                             // left edge, insertion event\\n                if (it != s.end()) { return false; }    // found an overlap\\n                s.insert(make_pair(v[2], v[3]));\\n            } else {                                    // right edge, deletion event\\n                s.erase(it);\\n            }\\n        }\\n        return true;\\n    }\\n};\\n```\\n\\n\\nAnd here's another O(n) solution inspired by @hxtang : check if areas equal, and points appeared odd times are the large rectangles's four corners exactly:\\n\\n```\\n    struct pairhash {   //double hash function for pair key\\n        template <typename T, typename U>\\n        size_t operator()(const pair<T, U> &p) const {\\n            size_t l = hash<T>()(p.first), r = hash<U>()(p.second);\\n            return l + 0x9e3779b9 + (r << 6) + (r >> 2);\\n        }\\n    };\\n    \\n    bool isRectangleCover(vector<vector<int>>& rectangles) {\\n        int area = 0, xmin = INT_MAX, ymin = INT_MAX, xmax = INT_MIN, ymax = INT_MIN;\\n        unordered_map<pair<int, int>, int, pairhash> m;\\n        \\n        // Calculate area, and count points of appearances\\n        vector<pair<int, int>> points = {{0, 1}, {0, 3}, {2, 3}, {2, 1}};\\n        for (auto v : rectangles) {\\n            for (auto point : points) {\\n                if (++m[make_pair(v[point.first], v[point.second])] > 4) { return false; }\\n            }\\n            area += (v[2] - v[0]) * (v[3] - v[1]);\\n            xmin = min(xmin, v[0]), ymin = min(ymin, v[1]), xmax = max(xmax, v[2]), ymax = max(ymax, v[3]);\\n        }\\n        if (area != (xmax - xmin) * (ymax - ymin)) { return false; }\\n        \\n        // Check if points appearing odd number of times are exactly large rectangles' 4 corners\\n        unordered_set<pair<int, int>, pairhash> s = {{xmin, ymin}, {xmin, ymax}, {xmax, ymax}, {xmax, ymin}};\\n        for (auto it = m.begin(); it != m.end(); it++) {\\n            if (it->second & 1 == 1) {\\n                if (s.count(it->first) > 0) {\\n                    s.erase(it->first); \\n                } else {\\n                    return false;\\n                }\\n            }\\n        }\\n        return s.empty();\\n    }\\n```"
		},
		{
			"lc_ans_id":"87201",
			"view":"1195",
			"top":"6",
			"title":"Might be the simplest O(n) solution, only count corners,no area, no maxmin(with comments)",
			"vote":"6",
			"content":"Key idea: a perfect rectangle must have 4 corners\\n```\\npublic boolean isRectangleCover(int[][] rectangles) {\\n        Set<String> set = new HashSet<>();\\n        for(int[] rec: rectangles){\\n            //b = bottom, l = left, r = right, t = top\\n            //create corners with type\\n            String bl = rec[0]+\",\"+rec[1]+\"bl\";\\n            String br = rec[2]+\",\"+rec[1]+\"br\";\\n            String tl = rec[0]+\",\"+rec[3]+\"tl\";\\n            String tr = rec[2]+\",\"+rec[3]+\"tr\";\\n            //if these corners already exist, return false\\n            if(!set.add(bl) || !set.add(br) || !set.add(tl) || !set.add(tr)) return false;\\n            //if these 4 corners and previously added corners form a line, remove them\\n            if(set.remove(rec[0]+\",\"+rec[1]+\"tl\")) set.remove(bl);\\n            else if(set.remove(rec[0]+\",\"+rec[1]+\"br\")) set.remove(bl);\\n            if(set.remove(rec[2]+\",\"+rec[1]+\"bl\")) set.remove(br);\\n            else if(set.remove(rec[2]+\",\"+rec[1]+\"tr\")) set.remove(br);\\n            if(set.remove(rec[0]+\",\"+rec[3]+\"tr\")) set.remove(tl);\\n            else if(set.remove(rec[0]+\",\"+rec[3]+\"bl\")) set.remove(tl);\\n            if(set.remove(rec[2]+\",\"+rec[3]+\"tl\")) set.remove(tr);\\n            else if(set.remove(rec[2]+\",\"+rec[3]+\"br\")) set.remove(tr);\\n        }\\n        //a perfect rectangle contains 4 corners\\n        return set.size()==4;\\n    }\\n```\\nA reference pic for the removal part:\\n![0_1478591653852_QQ\\u622a\\u56fe20161105154102.png](/uploads/files/1478591653850-qq\\u622a\\u56fe20161105154102.png) \\nClean and simple, please upvote, thanks!"
		},
		{
			"lc_ans_id":"87223",
			"view":"873",
			"top":"7",
			"title":"Concise 15 lines O(N) C++ solution",
			"vote":"5",
			"content":"Concise O(N) solution. Idea from @hxtang \\nhttps://discuss.leetcode.com/topic/55923/o-n-solution-by-counting-corners-with-detailed-explaination\\n```\\nbool isRectangleCover(vector<vector<int>>& rectangles) {\\n        unordered_map<string,int> mp;\\n        string corners[4];\\n        for(auto v: rectangles)\\n            for(int i = 0; i<4; ++i){\\n                corners[i] = to_string(v[i/2*2]) + \",\" + to_string(v[(i%2)*2+1]);\\n                if(mp[corners[i]] & int(pow(2,i))) return false;\\n                else mp[corners[i]] |= int(pow(2,i));\\n            }\\n        int corner = 0;\\n        for(auto i=mp.begin(); i!=mp.end(); ++i){\\n            int val = i->second;\\n            if(!(val & (val-1)) && (++corner >4)) return false;\\n            if((val & (val-1)) && !(val == 3 || val==12 || val==10 || val==5 || val==15)) return false;\\n        }\\n        return true;\\n    }\\n```"
		},
		{
			"lc_ans_id":"87253",
			"view":"1123",
			"top":"8",
			"title":"Simple Java Solution With HashMap",
			"vote":"4",
			"content":"To make a perfect rectangle, two conditions need to be met:\\n1. The total area of all sub-rectangles == (rightmost-leftmost)*(uppermost-lowermost);\\n2. For every side of each sub-rectangle, there should be one or more sub-rectangles with corresponding counter-sides, except for the outermost sides, i.e., for each top side, there should be corresponding bottom sides of other sub-rectangle(s) with the same values, and the right sides should have corresponding left ones . So we use four maps to store all sides(<Interval>) of the sub-rectangles, and for each key in topmap, except for the uppermost side of the parent-rectangle, there should be a same key in bottommap, and their values should be the same after merging.\\n\\n```\\npublic class Solution {\\n    public boolean isRectangleCover(int[][] rectangles) {\\n        long area=0;\\n        int up=Integer.MIN_VALUE, low = Integer.MAX_VALUE, rightest=Integer.MIN_VALUE, leftest=Integer.MAX_VALUE;\\n        HashMap<Integer,ArrayList<Interval>> topmap = new HashMap<>();\\n        HashMap<Integer,ArrayList<Interval>> bottommap = new HashMap<>();\\n        HashMap<Integer,ArrayList<Interval>> leftmap = new HashMap<>();\\n        HashMap<Integer,ArrayList<Interval>> rightmap = new HashMap<>();\\n        for(int i=0;i<rectangles.length;i++){\\n            int[] r1 = rectangles[i];\\n            int top = r1[3], right = r1[2], left = r1[0], bottom = r1[1];\\n            up = Math.max(top,up);\\n            low = Math.min(low, bottom);\\n            rightest = Math.max(right,rightest);\\n            leftest = Math.min(left, leftest);\\n            if (!topmap.containsKey(top))  topmap.put(top,new ArrayList<Interval>());\\n            topmap.get(top).add(new Interval(left,right));\\n            if (!bottommap.containsKey(bottom))  bottommap.put(bottom,new ArrayList<Interval>());\\n            bottommap.get(bottom).add(new Interval(left,right));\\n            if(!leftmap.containsKey(left)) leftmap.put(left,new ArrayList<Interval>());\\n            leftmap.get(left).add(new Interval(bottom,top));\\n            if(!rightmap.containsKey(right)) rightmap.put(right,new ArrayList<Interval>());\\n            rightmap.get(right).add(new Interval(bottom,top));\\n            area += (top-bottom)*(right-left);\\n        }\\n        if(area!=( rightest-leftest)*(up-low)) return false;\\n        if(bottommap.size()!=topmap.size()||leftmap.size()!=rightmap.size()) return false;\\n        return (compareMaps(bottommap,topmap,low) && compareMaps(rightmap,leftmap,rightest) ) ;\\n    }\\n    public boolean compareMaps(HashMap<Integer,ArrayList<Interval>> map1, HashMap<Integer,ArrayList<Interval>> map2, int side){\\n        for(int top: map1.keySet()  ){\\n            if(top==side) continue;\\n            List<Interval> mergedTopList = merge(map1.get(top));\\n            if(!map2.containsKey(top)) return false;\\n            List<Interval> mergedBottomeList = merge(map2.get(top));\\n            if(mergedBottomeList.size()!=mergedTopList.size()) return false;\\n            for(int i=0;i<mergedBottomeList.size();i++) {\\n                if(mergedBottomeList.get(i).start!=mergedTopList.get(i).start ||mergedBottomeList.get(i).end!=mergedTopList.get(i).end) return false;\\n            }\\n        }\\n        return true;\\n    }\\n    public List<Interval> merge(List<Interval> intervals) {\\n        List<Interval> res = new ArrayList<>();\\n        if(intervals==null||intervals.size()<2) return intervals;\\n        Collections.sort(intervals, new Comparator<Interval>(){public int compare(Interval i1, Interval i2) { return i1.start-i2.start; } } );\\n        int start = intervals.get(0).start, end=intervals.get(0).end;\\n        for(int i=1;i<intervals.size();i++){\\n            Interval cur = intervals.get(i);\\n            if(cur.start>end){\\n                res.add(new Interval(start, end) );\\n                start=cur.start;\\n            }\\n            if(cur.end>end) end=cur.end;\\n        }\\n        res.add(new Interval(start, end) ); \\n        return res;\\n    }\\n}\\nclass Interval {\\n    int start,end;\\n    Interval() { start = 0; end = 0; }\\n    Interval(int s, int e) { start = s; end = e; }\\n}\\n```"
		},
		{
			"lc_ans_id":"87196",
			"view":"1112",
			"top":"9",
			"title":"clean C++ sweep line solution",
			"vote":"3",
			"content":"A naive solution to the problem is to check rectangles pairwisely for overlap. Then compare the sum of areas of all rectangles to the area of its bounding box.\\n\\nBut the pairwise comparison is too slow. This is where the sweep line solution comes in to quickly check overlap of many rectangles. This is by scanning vertical edges of rectangles in the order of x, and maintaining an ordered list of y-intervals. Left edges are inserted into the intervals before which interval overlap is checked. Right edges are removed from the intervals.\\n\\nA complication here is that right edges should be processed before all left edges. I deal this problem by mapping x coordinate to time t with: t = 2x+1 for left edges and t = 2x for right edges.\\n```\\nstruct interval {\\n    int start;\\n    int end;\\n    interval(int start_, int end_) : start(start_), end(end_) {};\\n};\\n\\nstruct edge {\\n    int t;\\n    interval i;\\n    edge(int t_, interval i_) : t(t_), i(i_) {};\\n};\\n\\nstruct interval_cmp {\\n   bool operator()(interval i1, interval i2) { return i1.start < i2.start; }; \\n};\\n\\nstruct edge_cmp {\\n   bool operator()(edge e1, edge e2) { return e1.t > e2.t; }; \\n};\\n\\nbool isRectangleCover(vector<vector<int>>& rectangles) {\\n    priority_queue<edge, vector<edge>, edge_cmp>  q;\\n    set<interval, interval_cmp> active_intervals;\\n    \\n    int minx = INT_MAX, miny = INT_MAX, maxx = INT_MIN, maxy = INT_MIN;\\n    int area = 0;\\n    for (const auto& rect : rectangles) {\\n        area += (rect[2]-rect[0])* (rect[3]-rect[1]);\\n        minx = min(rect[0], minx);\\n        miny = min(rect[1], miny);\\n        maxx = max(rect[2], maxx);\\n        maxy = max(rect[3], maxy);\\n        q.emplace(rect[0]*2+1, interval(rect[1], rect[3]));\\n        q.emplace(rect[2]*2  , interval(rect[1], rect[3]));\\n    }\\n    \\n    while (!q.empty()) {\\n        int t = q.top().t;\\n        interval i = q.top().i;\\n        if (t % 2) { //insert interval\\n            auto it = active_intervals.lower_bound(i);\\n            if (it != active_intervals.begin() && prev(it)->end > i.start) return false;\\n            if (it != active_intervals.end() && it->start < i.end) return false;\\n            active_intervals.insert(it, i);\\n        }\\n        else { //remove interval\\n            active_intervals.erase(i);\\n        }\\n        q.pop();\\n    }\\n    return area == (maxx-minx) * (maxy - miny);\\n}\\n```"
		}
	],
	"id":"391",
	"title":"Perfect Rectangle",
	"content":"<p>\r\nGiven N axis-aligned rectangles where N > 0, determine if they all together form an exact cover of a rectangular region.\r\n</p>\r\n\r\n<p>\r\nEach rectangle is represented as a bottom-left point and a top-right point. For example, a unit square is represented as [1,1,2,2]. (coordinate of bottom-left point is (1, 1) and top-right point is (2, 2)).\r\n</p>\r\n\r\n<div style=\"float:right\"><img src=\"/static/images/problemset/rectangle_perfect.gif\" /></div>\r\n<p><b>Example 1:</b>\r\n<pre>\r\nrectangles = [\r\n  [1,1,3,3],\r\n  [3,1,4,2],\r\n  [3,2,4,4],\r\n  [1,3,2,4],\r\n  [2,3,3,4]\r\n]\r\n\r\nReturn true. All 5 rectangles together form an exact cover of a rectangular region.\r\n</pre>\r\n</p>\r\n\r\n<div style=\"clear:both\"></div>\r\n\r\n<div style=\"float:right\"><img src=\"/static/images/problemset/rectangle_separated.gif\" /></div>\r\n<p><b>Example 2:</b>\r\n<pre>\r\nrectangles = [\r\n  [1,1,2,3],\r\n  [1,3,2,4],\r\n  [3,1,4,2],\r\n  [3,2,4,4]\r\n]\r\n\r\nReturn false. Because there is a gap between the two rectangular regions.\r\n</pre>\r\n</p>\r\n\r\n<div style=\"clear:both\"></div>\r\n\r\n<div style=\"float:right\"><img src=\"/static/images/problemset/rectangle_hole.gif\" /></div>\r\n<p><b>Example 3:</b>\r\n<pre>\r\nrectangles = [\r\n  [1,1,3,3],\r\n  [3,1,4,2],\r\n  [1,3,2,4],\r\n  [3,2,4,4]\r\n]\r\n\r\nReturn false. Because there is a gap in the top center.\r\n</pre>\r\n</p>\r\n\r\n<div style=\"clear:both\"></div>\r\n\r\n<div style=\"float:right\"><img src=\"/static/images/problemset/rectangle_intersect.gif\" /></div>\r\n<p><b>Example 4:</b>\r\n<pre>\r\nrectangles = [\r\n  [1,1,3,3],\r\n  [3,1,4,2],\r\n  [1,3,2,4],\r\n  [2,2,4,4]\r\n]\r\n\r\nReturn false. Because two of the rectangles overlap with each other.\r\n</pre>\r\n</p>\r\n\r\n<div style=\"clear:both\"></div>",
	"frequency":"257",
	"ac_num":"12935"
}