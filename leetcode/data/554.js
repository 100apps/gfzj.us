{
	"difficulty":"2",
	"submit_num":"6914",
	"show_id":"573",
	"leetcode_id":"573",
	"answers":[
		{
			"lc_ans_id":"102822",
			"view":"2205",
			"top":"0",
			"title":"Java 5-liner O(|nuts|) Time O(1) Space",
			"vote":"23",
			"content":"Proof: Let the minimum distance from each nut to the tree be `a_1, ..., a_n` and let the minimum distance from each nut to the initial squirrel position be `b_1, ..., b_n`. Note that the minimum distance between two positions in the matrix is determined by their Manhattan distance.\\n\\nThen, if the squirrel were to start at the tree, then the minimum total distance required to collect all the nuts is `2a_1 + ... + 2a_n`. However, since the squirrel starts elsewhere, we just need to substitute one of the `2a_i` terms with `a_i + b_i`. Or equivalently, we replace one of the `a_i` terms in the sum with `b_i`. To minimize the total sum value at the end, we choose `i` that maximizes `a_i - b_i`.\\n\\n```\\npublic int minDistance(int height, int width, int[] tree, int[] squirrel, int[][] nuts) {\\n    int sum = 0, maxDiff = Integer.MIN_VALUE;\\n    for (int[] nut : nuts) {\\n        int dist = Math.abs(tree[0] - nut[0]) + Math.abs(tree[1] - nut[1]);\\n        sum += 2*dist;\\n        maxDiff = Math.max(maxDiff, dist - Math.abs(squirrel[0] - nut[0]) - Math.abs(squirrel[1] - nut[1]));\\n    }\\n    return sum - maxDiff;\\n}\\n```"
		},
		{
			"lc_ans_id":"102837",
			"view":"1517",
			"top":"1",
			"title":"Java Solution, O(n), Manhattan distance",
			"vote":"13",
			"content":"Time complexity O(n), n = number of nuts.\\n```\\npublic class Solution {\\n    public int minDistance(int height, int width, int[] tree, int[] squirrel, int[][] nuts) {\\n        int n = nuts.length;\\n        int[] nutToTree = new int[n];\\n        int[] nutToSquirrel = new int[n];\\n        \\n        int sum = 0;\\n        for (int i = 0; i < n; i++) {\\n            nutToTree[i] = Math.abs(nuts[i][0] - tree[0]) + Math.abs(nuts[i][1] - tree[1]);\\n            sum += nutToTree[i] * 2;\\n            nutToSquirrel[i] = Math.abs(nuts[i][0] - squirrel[0]) + Math.abs(nuts[i][1] - squirrel[1]);\\n        }\\n        \\n        int min = Integer.MAX_VALUE;\\n        for (int i = 0; i < n; i++) {\\n            int dist = sum + nutToSquirrel[i] - nutToTree[i];\\n            min = Math.min(min, dist);\\n        }\\n        \\n        return min;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"102819",
			"view":"454",
			"top":"2",
			"title":"Python, Straightforward with Explanation",
			"vote":"4",
			"content":"Let ```D``` be the taxicab distance, ```D(P, Q) = abs(Px - Qx) + abs(Py - Qy)```.\\n\\nSuppose the squirrel is already at the tree.  The distance of his path will be:\\n```S = D(tree, nut_1) + D(nut_1, tree) + D(tree, nut_2) + D(nut_2, tree) + D(tree, nut_3) + ...```\\nand so\\n```S = sum_{i=1..N} 2 * D(tree, nut_i)```.\\n\\nAt the beginning, the squirrel goes to some ```nut_k```, then to the tree, then does the usual path described above except doesn't visit ```nut_k```.  Thus, his path has distance:  \\n```D(squirrel, nut_k) + D(nut_k, tree) + S - (2 * D(tree, nut_k))```\\nwhich equals\\n```S + D(squirrel, nut_k) - D(nut_k, tree)```.\\n\\n```\\ndef minDistance(self, height, width, tree, squirrel, nuts):\\n    def taxi(p, q):\\n        return abs(p[0] - q[0]) + abs(p[1] - q[1])\\n    \\n    S = sum(2 * taxi(tree, nut) for nut in nuts)\\n    return min(S + taxi(squirrel, nut) - taxi(nut, tree) for nut in nuts)\\n```"
		},
		{
			"lc_ans_id":"102842",
			"view":"361",
			"top":"3",
			"title":"[C++] Clean Code with Explanation",
			"vote":"3",
			"content":"```\\n/**\\n * find out the minimum distance dist[i] to all nuts, and the dist_sum;\\n * if Squirrel is start at the tree, then the min distance to collect all nuts would be 2 * dist_sum;\\n * but most likely, it is not at the tree, Squirrel need to go to a nuts, then come to the tree single-trip, the round trip to the rest nuts.\\n * The sum would be : dist_sum + (dist_Squirrel_to_nut[I] - dist_nut[I]-to-tree), and we want the latter to be minimal.\\n * \\n */\\nclass Solution {\\npublic:\\n    int minDistance(int height, int width, vector<int>& tree, vector<int>& squirrel, vector<vector<int>>& nuts) {\\n        int sum = 0;\\n        int minextra = INT_MAX; // nut with the minimal (nut2squirrel - nut2tree)\\n        for (vector<int> nut : nuts) {\\n            int nut2tree = dist(nut, tree);\\n            int nut2squirrel = dist(nut, squirrel);\\n            sum += nut2tree;\\n            minextra = min(minextra, nut2squirrel - nut2tree);\\n        }\\n        return 2 * sum + minextra;\\n    }\\n\\nprivate:\\n    int dist(vector<int> a, vector<int> b) {\\n        return abs(a[0] - b[0]) + abs(a[1] - b[1]);\\n    }\\n\\n};\\n```"
		},
		{
			"lc_ans_id":"102827",
			"view":"291",
			"top":"4",
			"title":"Easy-To-Understand solution beats 89%",
			"vote":"2",
			"content":"The logic is as follows:\\n1. Assume start point of squirrel is tree, then the minimal sum of distance of collecting all nuts will always be Sum1 = Sum(2*distance of tree to nut(i) {i=0->n})  (1)\\n 2. Assume  start point of squirrel is not tree, that means we have to go back at first,  then it would shorten the total distance if we let our little squirrel collect one (any one) nut by its way to tree at the first time. So the critical part is which one should we take?\\n3. Assume we pick nut(i), Result = Min(Sum1 - 2 * distance of tree to nut(i) +(distance of squirrel to nut(i) + distance of tree to nut(i) ) ) = Min(Sum1 - (distance of tree to nut - distance of squirrel to nut ) ). Since Sum1 doesn't change, It finally becomes Result =  Sum1 - Max( distance of tree to nut - distance of squirrel to nut ) (2);\\nDistance of two point a1[], a2[] can be calculated by Math.abs(a1[0]-a2[0])+Math.abs(a1[1]-a2[1]);\\nequation 2 is all you need.\\n  \\n```\\n    public int minDistance(int height, int width, int[] tree, int[] squirrel, int[][] nuts) {\\n        int s1 = 0;int max = Integer.MIN_VALUE;\\n        for(int[]nut :nuts){\\n            int treeToNut = distance(tree,nut);\\n            int squrToNut = distance(squirrel,nut);\\n            s1 += 2 * treeToNut;\\n            max = Math.max(max,treeToNut-squrToNut);\\n        }\\n        return s1 - max;\\n    }\\n    int distance(int[] a1, int[] a2){\\n        return Math.abs(a1[0]-a2[0])+Math.abs(a1[1]-a2[1]);\\n    }\\n```"
		},
		{
			"lc_ans_id":"102831",
			"view":"153",
			"top":"5",
			"title":"O(n) Time,O(n) Space, inspired by 238.Product of Array Except Self, no Math",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int minDistance(int height, int width, int[] tree, int[] squirrel, int[][] nuts) {\\n        int[] dp=new int[nuts.length];\\n        int pre=0;\\n        int min=Integer.MAX_VALUE;\\n        \\n        for(int i=0;i<nuts.length;i++){\\n            dp[i]+=dist(nuts[i],squirrel)+pre;\\n            pre+=dist(nuts[i],tree);\\n        }\\n        \\n        pre=0;\\n        for(int i=nuts.length-1;i>=0;i--){\\n            dp[i]+=pre;\\n            pre+=dist(nuts[i],tree);\\n            min=Math.min(min,dp[i]);\\n        }\\n        \\n        return min+pre;\\n    }\\n    \\n    public int dist(int[] n1,int[] n2){\\n        return Math.abs(n1[0]-n2[0])+Math.abs(n1[1]-n2[1]);\\n    }\\n}"
		},
		{
			"lc_ans_id":"102815",
			"view":"149",
			"top":"6",
			"title":"Java O(nuts) Explanation",
			"vote":"1",
			"content":"```\\n    public int minDistance(int height, int width, int[] tree, int[] squirrel, int[][] nuts) {\\n    \\n    //Distance between each nut and the tree. Since we need to go from Tree to Nut, and Nut to tree, the total steps with be 2 times the distance.\\n\\n    int total = 0;\\t\\n    for (int i = 0; i < nuts.length; i++)\\n    {\\n    \\ttotal = total + 2 * dist(tree, nuts[i]);\\n    }\\n    \\n//For the first nut, \\n//let a be the distance from Tree to Nut j\\n//let b be the distance from Squirrel to Nut j\\n//We need to remove a from the total, and add b to the total\\n//Therefore we will MINIMIZE the equation (b-a)\\n\\n    int min = Integer.MAX_VALUE;\\n    int min_index = -1;\\n    for (int j = 0; j < nuts.length; j++)\\n    {\\n    \\tint cur = dist(squirrel, nuts[j]) - dist(nuts[j], tree);\\n    \\t\\n    \\tif ( cur < min)\\n    \\t{\\n    \\t\\tmin = cur;\\n    \\t\\tmin_index = j;\\n    \\t}\\n    }\\n    \\n//We remove a, and add b\\n    total = total - dist(nuts[min_index], tree) + dist(nuts[min_index], squirrel);\\n   \\n    \\n    return total;\\n    }\\n    \\n    \\n    public int dist(int[] a, int[] b)\\n\\n    {\\n    \\tint a_x =a[0];\\n    \\tint a_y =a[1];\\n    \\tint b_x =b[0];\\n    \\tint b_y =b[1];\\n    \\t\\n    \\tint out = Math.abs(a_x - b_x) + Math.abs(a_y - b_y);\\n    \\treturn out;\\n    }"
		},
		{
			"lc_ans_id":"102816",
			"view":"60",
			"top":"7",
			"title":"10 lines python solution beats 100%",
			"vote":"0",
			"content":"Imaging the squirrel is starting at tree position, no matter which nuts to get first, the total distance will be 2 * tree to each nut, which is 'sum' in my code.\\nNow we need to get the max distance difference between the squirrel to one of the nuts, and that nuts to the tree, where max = Tree_dis - squirrel dis, and total distance = sum - (Tree_dis - squirrel_dis) = sum - Tree_dis + squirrel_dis.\\n\\nSo the important part is to find the max distance difference between the squirrel to one of the nuts, and that nuts to the tree. Height and width are not useful here.\\n\\n\"\"\"\\n\\ndef minDistance(self, height, width, tree, squirrel, nuts):\\n        maxs = 0\\n        sums = 0\\n        for nut in nuts:\\n            trees = abs(tree[0]-nut[0]) + abs(tree[1]-nut[1])\\n            sums += 2*trees\\n            dis = abs(squirrel[0]-nut[0]) + abs(squirrel[1]-nut[1])\\n            if trees - dis > maxs:\\n                maxs = trees - dis\\n        return sums - maxs if maxs else sums + abs(trees-dis)\\n\"\"\""
		},
		{
			"lc_ans_id":"102818",
			"view":"48",
			"top":"8",
			"title":"Java solution beats 99%",
			"vote":"0",
			"content":"```\\nclass Solution {\\n    private int computeDist(int[] a, int[] b) {\\n        return (int)Math.abs(a[0] - b[0]) + (int)Math.abs(a[1] - b[1]);\\n    }\\n    \\n    public int minDistance(int height, int width, int[] tree, int[] squirrel, int[][] nuts) {\\n        int ret = 0;\\n        int min = Integer.MAX_VALUE;\\n        int diff = 0;\\n        for (int i = 0; i < nuts.length; i++) {\\n            int treeDist = computeDist(tree, nuts[i]);\\n            int squirrelDist =computeDist(squirrel, nuts[i]);\\n            ret += treeDist;\\n            diff = squirrelDist - treeDist;\\n            if (diff < min) {\\n                min = diff;\\n            }\\n        }\\n        return ret * 2 + min;\\n    }\\n}\\n'''"
		},
		{
			"lc_ans_id":"102820",
			"view":"73",
			"top":"9",
			"title":"C++ solution with explanation",
			"vote":"0",
			"content":"the only variable in this question is which nut we choose first. Once we choose a nut to take first the rest of the solution is fixed: it is the sum of Manhattan distances of the rest of the nuts to the tree and back. So all we need is to find the sum of all nut's distances to the tree and back - denote it as sum. Then for each nut we remove the distance of this nut from the sum and add instead the distance of the squirrel to that nut. The minimum yielded for all nuts is the answer.\\n```\\nclass Solution {\\npublic:\\n   \\n    #define DIST(n,e)\\\\\\n        (abs(n[0] - e[0]) + abs(n[1] - e[1]))\\n    \\n     int minDistance(int height, int width, vector<int>& tree, vector<int>& squirrel, vector<vector<int>>& nuts) {\\n        \\n        int sum = 0;\\n        \\n        for(const auto &n : nuts) {\\n            sum += 2*DIST(n,tree);\\n        }\\n        \\n        int minDist = INT_MAX;\\n        \\n        for(const auto &n : nuts){\\n            int dist = sum - DIST(n,tree) + DIST(n,squirrel);\\n            minDist = min(minDist,dist);\\n        }\\n        \\n        return minDist;\\n    }\\n};\\n```"
		}
	],
	"id":"554",
	"title":"Squirrel Simulation",
	"content":"There's a tree, a squirrel, and several nuts. Positions are represented by the cells in a 2D grid. Your goal is to find the <b>minimal</b> distance for the squirrel to collect all the nuts and put them under the tree one by one. The squirrel can only take at most <b>one nut</b> at one time and can move in four directions - up, down, left and right, to the adjacent cell. The distance is represented by the number of moves. \r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nHeight : 5\r\nWidth : 7\r\nTree position : [2,2]\r\nSquirrel : [4,4]\r\nNuts : [[3,0], [2,5]]\r\n<b>Output:</b> 12\r\n<b>Explanation:</b>\r\n<img src=\"/static/images/problemset/squirrel_simulation.png\" width = \"40%\" />\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>All given positions won't overlap.</li>\r\n<li>The squirrel can take at most one nut at one time.</li>\r\n<li>The given positions of nuts have no order.</li>\r\n<li>Height and width are positive integers. 3 <= height * width <= 10,000.</li>\r\n<li>The given positions contain at least one nut, only one tree and one squirrel.</li>\r\n</ol>\r\n</p>",
	"frequency":"31",
	"ac_num":"3644"
}