{
	"difficulty":"2",
	"submit_num":"14163",
	"show_id":"469",
	"leetcode_id":"469",
	"answers":[
		{
			"lc_ans_id":"95570",
			"view":"5736",
			"top":"0",
			"title":"Beyond my knowledge... Java solution with in-line explanation",
			"vote":"23",
			"content":"Well, I have to say that this problem is beyond my knowledge. @Ipeq1 and @zzg_zzm have explained how to solve this problem in their posts \\nhttps://discuss.leetcode.com/topic/70643/i-believe-this-time-it-s-far-beyond-my-ability-to-get-a-good-grade-of-the-contest\\nhttps://discuss.leetcode.com/topic/70664/c-7-line-o-n-solution-to-check-convexity-with-cross-product-of-adajcent-vectors-detailed-explanation\\nThe algorithm itself is not hard but I have no idea there exists such a way to determine if a polygon is convex or not. Laugh at me for my ignorance... I believe 90% of programmers can solve this problem if they were given the formula.\\nAnyway, following is the Java solution with in-line explanation. Accepted, 32ms. Reference: http://csharphelper.com/blog/2014/07/determine-whether-a-polygon-is-convex-in-c/\\n\\n```\\npublic class Solution {\\n    public boolean isConvex(List<List<Integer>> points) {\\n        // For each set of three adjacent points A, B, C, find the cross product AB \\xb7 BC. If the sign of\\n        // all the cross products is the same, the angles are all positive or negative (depending on the\\n        // order in which we visit them) so the polygon is convex.\\n        boolean gotNegative = false;\\n        boolean gotPositive = false;\\n        int numPoints = points.size();\\n        int B, C;\\n        for (int A = 0; A < numPoints; A++) {\\n            // Trick to calc the last 3 points: n - 1, 0 and 1.\\n            B = (A + 1) % numPoints;\\n            C = (B + 1) % numPoints;\\n    \\n            int crossProduct =\\n                crossProductLength(\\n                    points.get(A).get(0), points.get(A).get(1),\\n                    points.get(B).get(0), points.get(B).get(1),\\n                    points.get(C).get(0), points.get(C).get(1));\\n            if (crossProduct < 0) {\\n                gotNegative = true;\\n            }\\n            else if (crossProduct > 0) {\\n                gotPositive = true;\\n            }\\n            if (gotNegative && gotPositive) return false;\\n        }\\n    \\n        // If we got this far, the polygon is convex.\\n        return true;\\n    }\\n    \\n    // Return the cross product AB x BC.\\n    // The cross product is a vector perpendicular to AB and BC having length |AB| * |BC| * Sin(theta) and\\n    // with direction given by the right-hand rule. For two vectors in the X-Y plane, the result is a\\n    // vector with X and Y components 0 so the Z component gives the vector's length and direction.\\n    private int crossProductLength(int Ax, int Ay, int Bx, int By, int Cx, int Cy)\\n    {\\n        // Get the vectors' coordinates.\\n        int BAx = Ax - Bx;\\n        int BAy = Ay - By;\\n        int BCx = Cx - Bx;\\n        int BCy = Cy - By;\\n    \\n        // Calculate the Z coordinate of the cross product.\\n        return (BAx * BCy - BAy * BCx);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95584",
			"view":"1382",
			"top":"1",
			"title":"java easy solution",
			"vote":"12",
			"content":"The solution is based on http://www.geeksforgeeks.org/orientation-3-ordered-points/\\n```\\npublic boolean isConvex(List<List<Integer>> points) {\\n        int flag = 0;\\n        for (int i = 0; i < points.size(); i++) {\\n            int angle = getAngle(points, i);\\n            if (angle == 0) continue;\\n            if (flag == 0) flag = angle > 0 ? 1 : -1;\\n            else if (flag > 0 != angle > 0) return false;\\n        }\\n        return true;\\n    }\\n    \\n    private int getAngle(List<List<Integer>> points, int i) {\\n        List<Integer> c = points.get(i % points.size());\\n        List<Integer> b = points.get((i + 1) % points.size());\\n        List<Integer> a = points.get((i + 2) % points.size());\\n        return (a.get(1) - b.get(1)) * (b.get(0) - c.get(0)) - (b.get(1) - c.get(1)) * (a.get(0) - b.get(0));\\n    }\\n```"
		},
		{
			"lc_ans_id":"95590",
			"view":"3518",
			"top":"2",
			"title":"C++ 5-liner O(N) checking convexity with cross product of adjacent vectors (detailed explanation)",
			"vote":"11",
			"content":"Great solution inspired by @Ipeq1! Here is a C++ version with extracted determinant calculation.\\n\\nThe key observation for convexity is that **vector p<sub>i+1</sub>-p<sub>i</sub> always turns to the same direction to p<sub>i+2</sub>-p<sub>i</sub> formed by any 3 sequentially adjacent vertices, i.e., cross product (p<sub>i+1</sub>-p<sub>i</sub>) x (p<sub>i+2</sub>-p<sub>i</sub>) does not change sign when traversing sequentially along polygon vertices**. \\n\\nNote that for any 2D vectors **v<sub>1</sub>**, **v<sub>2</sub>**,\\n* **v<sub>1</sub> x v<sub>2</sub> = det([v<sub>1</sub>, v<sub>2</sub>])**\\n\\nwhich is the determinant of 2x2 matrix **[v<sub>1</sub>, v<sub>2</sub>]**. And the sign of **det([v<sub>1</sub>, v<sub>2</sub>])** represents the positive z-direction of right-hand system from **v<sub>1</sub>** to **v<sub>2</sub>**. So **det([v<sub>1</sub>, v<sub>2</sub>]) &ge; 0** if and only if **v<sub>1</sub>** turns at most 180 degrees **counterclockwise** to **v<sub>2</sub>**.\\n![0_1480993864673_Right_hand_rule_cross_product.png](/uploads/files/1480993854384-right_hand_rule_cross_product.png) \\n\\n**Version 1:** use `pos, neg` as `0-1` flags to store if positive or negative determinant has ever been encountered:\\n```\\n    bool isConvex(vector<vector<int>>& p) {\\n      for (int i=0, pos=0, neg=0, n=p.size(); i < n; ++i) {\\n        long det = det2({p[i], p[(i+1)%n], p[(i+2)%n]});\\n        if ((pos|=(det>0))*(neg|=(det<0))) return false;\\n      }    \\n      return true;\\n    }\\n    // determinant of 2x2 matrix [A1-A0, A2-A0]\\n    long det2(const vector<vector<int>>& A) {\\n    \\treturn (A[1][0]-A[0][0])*(A[2][1]-A[0][1]) - (A[1][1]-A[0][1])*(A[2][0]-A[0][0]);\\n    }\\n```\\n**Version 2:** use `prev` and `cur` to store previous and current non-zero determinants:\\n```\\n    bool isConvex(vector<vector<int>>& p) {\\n      for (long i = 0, n = p.size(), prev = 0, cur; i < n; ++i)\\n        if (cur = det2({p[i], p[(i+1)%n], p[(i+2)%n]})) \\n          if (cur*prev < 0) return false; \\n          else prev = cur;\\n\\n      return true;\\n    }\\n```"
		},
		{
			"lc_ans_id":"95573",
			"view":"5441",
			"top":"3",
			"title":"I believe this time it's far beyond my ability to get a good grade of the contest!",
			"vote":"8",
			"content":"get the **cross produc**t of the sequential input edge a, b as **tmp**, then:\\n\\n if **tmp** == 0, a -> b 180\\xb0 on the same line;\\nelif **tmp** > 0, a -> b clockwise;\\nelse **tmp** < 0, a ->  anticlockwise;\\n\\ntmp = (p1[0]-p0[0])*(p2[1]-p0[1])-(p2[0]-p0[0])*(p1[1]-p0[1])\\n```\\nclass Solution(object):\\n    def isConvex(self, points):\\n        last = 0\\n        for i in xrange(2, len(points) + 2):\\n            p0, p1, p2 = points[(i - 2) % len(points)], points[(i - 1) % len(points)], points[i % len(points)]\\n            tmp = (p1[0]-p0[0])*(p2[1]-p0[1])-(p2[0]-p0[0])*(p1[1]-p0[1])\\n            if last * tmp < 0:\\n                return False\\n            last = tmp\\n        return last * tmp >= 0\\n```\\nUpdate instead of just maintaining the sequential cross product result, any of the two cross product shouldn't multiplies to minus:\\n```\\nclass Solution(object):\\n    def isConvex(self, points):\\n        last, tmp = 0, 0\\n        for i in xrange(2, len(points) + 3):\\n            p0, p1, p2 = points[(i - 2) % len(points)], points[(i - 1) % len(points)], points[i % len(points)]\\n            tmp = (p1[0]-p0[0])*(p2[1]-p0[1])-(p2[0]-p0[0])*(p1[1]-p0[1])\\n            if tmp:\\n                if last * tmp < 0:\\n                    return False\\n                last = tmp\\n        return True\\n```"
		},
		{
			"lc_ans_id":"95578",
			"view":"578",
			"top":"4",
			"title":"Python O(n), by checking the directions of every edge, learned from Robert Sedgewick's Algorithm course",
			"vote":"5",
			"content":"The idea is to check whether the edges are always make turns in the same directions (clockwise or counterclockwise)\\nThe method to check direction is from Robert Sedgewick's Algorithm course.\\n\\n![0_1481526003952_upload-ab761926-b302-44da-8a64-2f9f7d63bf9f](/uploads/files/1481526007792-upload-ab761926-b302-44da-8a64-2f9f7d63bf9f.png) \\n\\n```\\nclass Solution(object):\\n    def isConvex(self, points):\\n        \"\"\"\\n        :type points: List[List[int]]\\n        :rtype: bool\\n        \"\"\"\\n        def direction(a,b,c):\\n            return (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0])\\n        d = None\\n        for i in range(1,len(points)):\\n            a = direction(points[i-2],points[i-1],points[i])\\n            if a == 0: continue\\n            if d == None: d = a\\n            else:\\n                if a*d < 0: return False\\n        if direction(points[-2],points[-1],points[0]) * d < 0:return False\\n        return True"
		},
		{
			"lc_ans_id":"95579",
			"view":"192",
			"top":"5",
			"title":"Straightforward O(N) Java Solution by Checking Orientation",
			"vote":"2",
			"content":"A triplet can have 3 possible orientations [[reference](http://www.geeksforgeeks.org/orientation-3-ordered-points/)]: **clockwise**, **counterclockwise** and **collinear**. \\nFor a convex polygon, a triplet formed by three sequential points should not have both **clockwise** and **counterclockwise** orientation. So we can take advantage of this to solve the problem.\\n\\n```java\\npublic class Solution {\\n    public boolean isConvex(List<List<Integer>> points) {\\n        int globalOrientation = 0; //1 -> clockwise; -1 -> counterclockwise; 0 -> collinear\\n        int size = points.size();\\n        for (int i = 0; i < size; i++) {\\n            List<Integer> point1 = points.get(i);\\n            List<Integer> point2 = points.get((i + 1) % size);\\n            List<Integer> point3 = points.get((i + 2) % size);\\n            int orientation = getOrientation(point1, point2, point3);\\n            if (orientation == 0) {\\n                continue;\\n            }\\n            if (globalOrientation == 0) {\\n                globalOrientation = orientation;\\n            } else if (globalOrientation != orientation) {\\n                return false;\\n            }\\n        }\\n        return true;\\n    }\\n\\n    public int getOrientation(List<Integer> point1, List<Integer> point2, List<Integer> point3) {\\n        int val = (point2.get(1) - point1.get(1)) * (point3.get(0) - point2.get(0)) - (point3.get(1) - point2.get(1)) * (point2.get(0) - point1.get(0));\\n        return val == 0 ? 0 : (val > 0) ? 1 : -1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95586",
			"view":"812",
			"top":"6",
			"title":"C++ Concise Solution",
			"vote":"2",
			"content":"```\\n    bool isConvex(vector<vector<int>>& points) {\\n        if (points.size() < 3) return false;\\n        int res = -1;\\n        for (int i = 0; i < points.size(); i++) {\\n            auto pre = i == 0 ? points.back() : points[i - 1];\\n            auto after = i == points.size() - 1 ? points[0] : points[i + 1];\\n            int x1 = points[i][0] - pre[0], y1 = points[i][1] - pre[1];\\n            int x2 = after[0] - points[i][0], y2 = after[1] - points[i][1];\\n            int flag = x1 * y2 - x2 * y1;\\n            if (res == -1) {\\n                if (flag) res = flag > 0;\\n            }\\n            else if (res != flag > 0) return false;\\n        }\\n        return true;\\n    }\\n```"
		},
		{
			"lc_ans_id":"95580",
			"view":"685",
			"top":"7",
			"title":"O(N) easy to understand c++ solution (69ms)",
			"vote":"1",
			"content":"x1*y2-x2*y1:\\nU^ X V^ = \\ni^     j^     k^\\nx1   y1   z1\\nx2   y2   z2\\n\\n= (x1*y2 - y1*x2)k^ (ignoring i^ and j^ components because z1 & z2 are zeros)\\n* a^ means a with an arrow on top of it. Basically, it's a vector.\\n* X mean cross product.\\n\\n**update**: bug fixed to handle new test cases by adding this line:\\n``` if(cur == 0) continue;```\\n```class Solution {\\npublic:\\n    bool isConvex(vector<vector<int>>& points) {\\n        int n = points.size();\\n        if(n <= 3) return true;\\n        points.push_back(points[0]);\\n        points.push_back(points[1]);\\n        long cur = 0, pre = 0;\\n        for(int i = 2; i < n+2; ++i) {\\n            int x1 = points[i-1][0] - points[i-2][0];\\n            int y1 = points[i-1][1] - points[i-2][1];\\n            int x2 = points[i][0] - points[i-2][0];\\n            int y2 = points[i][1] - points[i-2][1];\\n            cur = x1*y2-x2*y1;\\n            if(cur == 0) continue;\\n            if(pre*cur < 0) return false;\\n            else pre = cur;\\n        }\\n        points.pop_back();\\n        points.pop_back();\\n        return true;\\n    }\\n};"
		},
		{
			"lc_ans_id":"95596",
			"view":"327",
			"top":"8",
			"title":"One line Python by calculating the cross product of two vectors",
			"vote":"1",
			"content":"Well, I know it's a little bit \"long\" for one line but it's still one line.\\n\\nFor given three points p1 = (x1,y1), p2 = (x2,y2), p3 = (x3,y3), we calculate the cross product of vector V1 = (p1 -> p2) and V2 = (p2 -> p3). If all cross products have same signs (all >= 0 or all <= 0), return True.\\n\\n```\\nclass Solution(object):\\n    def isConvex(self, p):\\n        \"\"\"\\n        :type p: List[List[int]]\\n        :rtype: bool\\n        \"\"\"\\n        return all(((p[i-1][0]-p[i][0])*(p[i][1]-p[i+1][1]) - \\\\\\n               (p[i][0]-p[i+1][0])*(p[i-1][1]-p[i][1])) >= 0 \\\\\\n               for i in range(-1, len(p)-1)) or \\\\\\n               all(((p[i-1][0]-p[i][0])*(p[i][1]-p[i+1][1]) - \\\\\\n               (p[i][0]-p[i+1][0])*(p[i-1][1]-p[i][1])) <= 0 \\\\\\n               for i in range(-1, len(p)-1))\\n```"
		},
		{
			"lc_ans_id":"95566",
			"view":"28",
			"top":"9",
			"title":"JAVA AC solution",
			"vote":"0",
			"content":"    public boolean isConvex(List<List<Integer>> points) {\\n        Integer sign = null;\\n        for(int i=0; i<points.size(); ++i){\\n            List<Integer> pointA = points.get(i);\\n            List<Integer> pointB = points.get((i+1) % points.size());\\n            List<Integer> pointC = points.get((i+2) % points.size());\\n            int sn = det(pointA, pointB, pointC);\\n            if(sn==0) continue;\\n            if(sign == null) sign = sn;\\n            else if(sign != sn) return false;\\n        }\\n        return sign != null;\\n    }\\n    public int det(List<Integer> A, List<Integer> B, List<Integer> C ){\\n        int ABx = B.get(0) - A.get(0), ABy = B.get(1) - A.get(1);\\n        int ACx = C.get(0) - A.get(0), ACy = C.get(1) - A.get(1);\\n        int det = ABx * ACy - ABy * ACx;\\n        return det > 0 ? 1 : det < 0 ? -1 : 0;\\n    }"
		}
	],
	"id":"463",
	"title":"Convex Polygon",
	"content":"<p>Given a list of points that form a polygon when joined sequentially, find if this polygon is convex <a href=\"https://en.wikipedia.org/wiki/Convex_polygon\" target=\"_blank\">(Convex polygon definition)</a>.</p>\r\n\r\n<p><b>Note:</b>\r\n<ol>\r\n<li>There are at least 3 and at most 10,000 points.</li>\r\n<li>Coordinates are in the range -10,000 to 10,000.</li>\r\n<li>You may assume the polygon formed by given points is always a simple polygon<a href=\"https://en.wikipedia.org/wiki/Simple_polygon\" target=\"_blank\"> (Simple polygon definition)</a>. In other words, we ensure that exactly two edges intersect at each vertex, and that edges otherwise <b>don't intersect each other</b>. \r\n</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n[[0,0],[0,1],[1,1],[1,0]]\r\n\r\nAnswer: True\r\n\r\nExplanation:<img src=\"/static/images/problemset/polygon_convex.png\" width=\"100\" height=\"100\">\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n[[0,0],[0,10],[10,10],[10,0],[5,5]]\r\n\r\nAnswer: False\r\n\r\nExplanation:<img src=\"/static/images/problemset/polygon_not_convex.png\" width=\"100\" height=\"100\">\r\n</pre>\r\n</p>",
	"frequency":"40",
	"ac_num":"4818"
}