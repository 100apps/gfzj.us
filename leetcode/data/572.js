{
	"difficulty":"2",
	"submit_num":"23912",
	"show_id":"593",
	"leetcode_id":"593",
	"answers":[
		{
			"lc_ans_id":"103442",
			"view":"4508",
			"top":"0",
			"title":"C++ 3 lines (unordered_set)",
			"vote":"23",
			"content":"If we calculate all distances between 4 points, 4 smaller distances should be equal (sides), and 2 larger distances should be equal too (diagonals). As an optimization, we can compare squares of the distances, so we do not have to deal with the square root and precision loss.\\n\\nTherefore, our set will only contain 2 unique distances in case of square (beware of the zero distance though).\\n```\\nint d(vector<int>& p1, vector<int>& p2) {\\n    return (p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]);\\n}\\nbool validSquare(vector<int>& p1, vector<int>& p2, vector<int>& p3, vector<int>& p4) {\\n    unordered_set<int> s({ d(p1, p2), d(p1, p3), d(p1, p4), d(p2, p3), d(p2, p4), d(p3, p4) });\\n    return !s.count(0) && s.size() == 2;\\n}\\n```"
		},
		{
			"lc_ans_id":"103435",
			"view":"4137",
			"top":"1",
			"title":"Simple Java Solution - Square distances",
			"vote":"10",
			"content":"Just find the square of lenghts, and validate that\\n1. There are only two equal longest lenghts. \\n2. The non longest lengths are all equal.\\n\\n\\n    public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\\n        long[] lengths = {length(p1, p2), length(p2, p3), length(p3, p4),\\n                length(p4, p1), length(p1, p3),length(p2, p4)}; // all 6 sides\\n\\n        long max = 0, nonMax = 0;\\n        for(long len : lengths) {\\n            max = Math.max(max, len);\\n        }\\n        int count = 0;\\n        for(int i = 0; i < lengths.length; i++) {\\n            if(lengths[i] == max) count++;\\n            else nonMax = lengths[i]; // non diagonal side.\\n        }\\n        if(count != 2) return false; // diagonals lenghts have to be same.\\n\\n        for(long len : lengths) {\\n            if(len != max && len != nonMax) return false; // sides have to be same length\\n        }\\n        return true;\\n    }\\n    private long length(int[] p1, int[] p2) {\\n        return (long)Math.pow(p1[0]-p2[0],2) + (long)Math.pow(p1[1]-p2[1], 2);\\n    }"
		},
		{
			"lc_ans_id":"103432",
			"view":"2079",
			"top":"2",
			"title":"4 Liner Java",
			"vote":"8",
			"content":"```\\npublic boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\\n    HashSet<Integer> hs = new HashSet<>(Arrays.asList(dis(p1, p2), dis(p1, p3), dis(p1, p4), dis(p2, p3), dis(p2, p4), dis(p3, p4)));        \\n\\t return !hs.contains(0) && hs.size()==2; //One each for side & diagonal\\n    }\\n    int dis(int[] a, int[] b){\\n\\t return (a[0]-b[0])*(a[0]-b[0]) + (a[1]-b[1])*(a[1]-b[1]);\\n    }\\n```"
		},
		{
			"lc_ans_id":"103426",
			"view":"1299",
			"top":"3",
			"title":"Share my simple Python solution",
			"vote":"4",
			"content":"Number of unique distances should be 2. (4 for sides, and 2 for diagonals)\\n```\\nclass Solution(object):\\n    def validSquare(self, p1, p2, p3, p4):\\n        points = [p1, p2, p3, p4]\\n        \\n        dists = collections.Counter()\\n        for i in range(len(points)):\\n            for j in range(i+1, len(points)):\\n                dists[self.getDistance(points[i], points[j])] += 1\\n        \\n        return len(dists.values())==2 and 4 in dists.values() and 2 in dists.values()\\n        \\n    def getDistance(self, p1, p2):\\n        return (p1[0] - p2[0])**2 + (p1[1] - p2[1])**2\\n```"
		},
		{
			"lc_ans_id":"103433",
			"view":"216",
			"top":"4",
			"title":"A general solution to find combination of squares in n points in O(n^2) time",
			"vote":"3",
			"content":"The solution uses diag as the unique symbol to represent a square. First iterate through all possible edges and save in HashMap. In the second round, check each edge to see if the corresponding diag exists in Hash as well. If yes, add it to count.\\n```\\nclass Solution {\\n    public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\\n        if (p1 == null || p2 == null || p3 == null || p4 == null) return false;\\n        Map<String, Integer> map = new HashMap<>();\\n        List<int[]> list = new ArrayList<>();\\n        list.add(p1);\\n        list.add(p2);\\n        list.add(p3);\\n        list.add(p4);\\n        int count = 0;\\n        for (int i = 0; i < list.size() - 1; i++) {\\n            for (int j = i + 1; j < list.size(); j++) {\\n                if (!check(list.get(i), list.get(j))) continue;\\n                String str = genStr(list.get(i), list.get(j));\\n                map.put(str, 1 + map.getOrDefault(str, 0));\\n            }\\n        }\\n        for (int i = 0; i < list.size() - 1; i++) {\\n            for (int j = i + 1; j < list.size(); j++) {\\n                if (!check(list.get(i), list.get(j))) continue;\\n                String diag = createDiag(list.get(i), list.get(j));\\n                if (diag.length() == 0) continue;\\n                count += map.getOrDefault(diag, 0);\\n            }\\n        }\\n        count >>= 1;\\n        return count > 0;\\n    }\\n    \\n    private boolean check(int[] p1, int[] p2) {\\n        if (p1[0] == p2[0] && p1[1] == p2[1]) return false;\\n        return true;\\n    }\\n    \\n    private String genStr(int[] p1, int[] p2) {\\n        if (p1[0] < p2[0] || (p1[0] == p2[0] && p1[1] < p2[1])) {\\n            return String.format(\"%d,%d;%d,%d\", p1[0], p1[1], p2[0], p2[1]);\\n        } else {\\n            return String.format(\"%d,%d;%d,%d\", p2[0], p2[1], p1[0], p1[1]);\\n        }\\n        \\n    }\\n    \\n    private String createDiag(int[] a, int[] c) {\\n        int midX = a[0] + c[0];\\n        int midY = a[1] + c[1];\\n\\n        int Ax = 2*a[0] - midX;\\n        int Ay = 2*a[1] - midY;\\n        int bX = midX - Ay;\\n        int bY = midY + Ax;\\n\\n        int cX = 2*c[0] - midX;\\n        int cY = 2*c[1] - midY;\\n        int dX = midX - cY;\\n        int dY = midY + cX;\\n        if ((bX & 1) == 0 && (bY & 1) == 0 && (dX & 1) == 0 && (dY & 1) == 0) {\\n            if (bX < dX || (bX == dX && bY < dY)) {\\n                return String.format(\"%d,%d;%d,%d\", bX/2, bY/2, dX/2, dY/2);\\n            } else {\\n                return String.format(\"%d,%d;%d,%d\", dX/2, dY/2, bX/2, bY/2);\\n            }\\n        } else {\\n            return \"\";\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103448",
			"view":"113",
			"top":"5",
			"title":"Simple python solution by comparing distance",
			"vote":"1",
			"content":"The idea is to calculate all the distance between each two points, and sort them. In this way, we get **4 edges** and **2 diagonals** of the square in order. If the **4 edges** equal to each other, that means it should be **equilateral parallelogram**. Finally, we check whether the **2 diagonals** equal to each other so as to check if it's a **square**. \\n```\\n    def validSquare(self, p1, p2, p3, p4):\\n        if p1==p2==p3==p4:return False\\n        def dist(x,y):\\n            return (x[0]-y[0])**2+(x[1]-y[1])**2\\n        ls=[dist(p1,p2),dist(p1,p3),dist(p1,p4),dist(p2,p3),dist(p2,p4),dist(p3,p4)]\\n        ls.sort()\\n        if ls[0]==ls[1]==ls[2]==ls[3]:\\n            if ls[4]==ls[5]:\\n                return True\\n        return False\\n```"
		},
		{
			"lc_ans_id":"103461",
			"view":"226",
			"top":"6",
			"title":"Java easy to understand  :)",
			"vote":"1",
			"content":"first three if to judge whether is a rectangle\\nlast if for square\\n```\\npublic boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\\n        int d1 = getDist(p1, p2);\\n        if (d1 == 0 || d1 != getDist(p3, p4)) return false;\\n        int d2 = getDist(p1, p3);\\n        if (d2 == 0 || d2 != getDist(p2, p4)) return false;\\n        int d3 = getDist(p1, p4);\\n        if (d3 == 0 || d3 != getDist(p2, p3)) return false;\\n        if (d1 == d2 || d1 == d3 || d2 == d3) return true;\\n        return false;\\n    }\\n    \\n    private int getDist(int [] p1, int [] p2) {\\n        return (p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]);\\n    }\\n```"
		},
		{
			"lc_ans_id":"103465",
			"view":"255",
			"top":"7",
			"title":"12ms short Java Solution. No multiplication needed.",
			"vote":"1",
			"content":"Easy to write solution, but slow > 100ms\\n\\n```\\n    public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\\n        int[][] p = {p1, p2, p3, p4};\\n        Arrays.sort(p, (a, b) -> (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]));\\n        int [][] d = new int[4][2];\\n        for (int i = 1; i < 4; i++) {\\n            for (int j = 0; j < 2; j++) {\\n                d[i][j] = p[i][j] - p[0][j];\\n            }\\n            if (d[i][0] == 0 && d[i][1] == 0) {\\n                return false;\\n            }\\n        }        \\n        return d[3][0] == d[1][0] + d[2][0] \\n            && d[3][1] == d[1][1] + d[2][1]\\n            && (d[1][0] == d[2][1] && d[2][0] + d[1][1] == 0 \\n                || d[2][0] == d[1][1] && d[1][0] + d[2][1] == 0);\\n\\n    }\\n```\\n\\nA little optimization to bring it to 12ms\\n\\n```\\n    public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\\n        int[][] p = {p1, p2, p3, p4};\\n        for (int i = 0; i < 4; i++) {\\n            if (p[i][0] == p[0][0] && p[i][1] < p[0][1] || p[i][0] < p[0][0]) {\\n                swap(p, i, 0);\\n            }\\n            if (p[i][0] == p[3][0] && p[i][1] > p[3][1] || p[i][0] > p[3][0]) {\\n                swap(p, i, 3);\\n            }\\n        }\\n        //Arrays.sort(p, (a, b) -> (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]));\\n        int [][] d = new int[4][2];\\n        for (int i = 1; i < 4; i++) {\\n            for (int j = 0; j < 2; j++) {\\n                d[i][j] = p[i][j] - p[0][j];\\n            }\\n            if (d[i][0] == 0 && d[i][1] == 0) {\\n                return false;\\n            }\\n        }        \\n        return d[3][0] == d[1][0] + d[2][0] \\n            && d[3][1] == d[1][1] + d[2][1]\\n            && (d[1][0] == d[2][1] && d[2][0] + d[1][1] == 0\\n               || d[2][0] == d[1][1] && d[1][0] + d[2][1] == 0);\\n    }\\n    \\n    void swap (int[][] p, int i, int j) {\\n        int[] t = p[i];\\n        p[i] = p[j];\\n        p[j] = t;\\n    }\\n````"
		},
		{
			"lc_ans_id":"103486",
			"view":"960",
			"top":"8",
			"title":"Java Solution, calculate distance from rest of the points",
			"vote":"1",
			"content":"Reference: http://www.geeksforgeeks.org/check-given-four-points-form-square/\\n```\\npublic class Solution {\\n    public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {\\n        if (p1[0] == p2[0] && p1[1] == p2[1]\\n            || p1[0] == p3[0] && p1[1] == p3[1]\\n            || p1[0] == p4[0] && p1[1] == p4[1]) return false;\\n        \\n        int d2 = distSq(p1, p2);  // from p1 to p2\\n        int d3 = distSq(p1, p3);  // from p1 to p3\\n        int d4 = distSq(p1, p4);  // from p1 to p4\\n     \\n        // If lengths if (p1, p2) and (p1, p3) are same, then\\n        // following conditions must met to form a square.\\n        // 1) Square of length of (p1, p4) is same as twice\\n        //    the square of (p1, p2)\\n        // 2) p4 is at same distance from p2 and p3\\n        if (d2 == d3 && 2 * d2 == d4) {\\n            int d = distSq(p2, p4);\\n            return (d == distSq(p3, p4) && d == d2);\\n        }\\n     \\n        // The below two cases are similar to above case\\n        if (d3 == d4 && 2 * d3 == d2) {\\n            int d = distSq(p2, p3);\\n            return (d == distSq(p2, p4) && d == d3);\\n        }\\n        \\n        if (d2 == d4 && 2*d2 == d3) {\\n            int d = distSq(p2, p3);\\n            return (d == distSq(p3, p4) && d == d2);\\n        }\\n     \\n        return false;\\n    }\\n    \\n    int distSq(int[] p, int[] q) {\\n        return (p[0] - q[0])*(p[0] - q[0]) + (p[1] - q[1])*(p[1] - q[1]);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103423",
			"view":"12",
			"top":"9",
			"title":"My pure C solution. simple and esay understand.",
			"vote":"0",
			"content":"I judge `validSquare` by a diamond with a corner of the right angle.\\nAt First, It should be a diamond. That is to say, it's four edges are equal.\\nSecond, It have a right angle.\\nhowever, if you write your program by use this rules directly. you will found it's so hard to done.\\nI made it so esay to do. I choose any three points of them to determine whether to form an isosceles right angle triangle. By this way, We just need do this three times at most.\\n```\\nbool validIsoscelesRightTriangle(int* p1, int* p2, int* p3){\\n    int a = (*p1-*p2)*(*p1-*p2) + (*(p1+1)-*(p2+1))*(*(p1+1)-*(p2+1));\\n    int b = (*p1-*p3)*(*p1-*p3) + (*(p1+1)-*(p3+1))*(*(p1+1)-*(p3+1));\\n    int c = (*p2-*p3)*(*p2-*p3) + (*(p2+1)-*(p3+1))*(*(p2+1)-*(p3+1));\\n    return (a > b && a > c && b+c==a && b==c) || (b > c && b > a && a+c==b && a==c) || (c > a && c > b && a+b==c && a==b);\\n}\\nbool validSquare(int* p1, int p1Size, int* p2, int p2Size, int* p3, int p3Size, int* p4, int p4Size) {\\n    return validIsoscelesRightTriangle(p1, p2, p3) && validIsoscelesRightTriangle(p1, p2, p4) && validIsoscelesRightTriangle(p2, p3, p4);\\n}\\n```"
		}
	],
	"id":"572",
	"title":"Valid Square",
	"content":"<p>Given the coordinates of four points in 2D space, return whether the four points could construct a square.</p>\r\n\r\n<p>The coordinate (x,y) of a point is represented by an integer array with two integers.</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]\r\n<b>Output:</b> True\r\n</pre>\r\n</p>\r\n\r\n<p> Note: \r\n<ol>\r\n<li>All the input integers are in the range [-10000, 10000].</li>\r\n<li>A valid square has four equal sides with positive length and four equal angles (90-degree angles).</li>\r\n<li>Input points have no order.</li>\r\n</ol>\r\n</p>",
	"frequency":"130",
	"ac_num":"9614"
}