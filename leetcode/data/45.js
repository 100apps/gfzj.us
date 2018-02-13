{
	"difficulty":"3",
	"submit_num":"414426",
	"show_id":"45",
	"leetcode_id":"45",
	"answers":[
		{
			"lc_ans_id":"18028",
			"view":"30372",
			"top":"0",
			"title":"O(n), BFS solution",
			"vote":"109",
			"content":"I try to change this problem to a BFS problem, where nodes in level i are all the nodes that can be reached in i-1th jump. for example.   2 3 1 1 4 , is \\n                   2||\\n               3   1||\\n               1   4  || \\n\\nclearly,  the minimum jump of 4 is 2 since 4 is in level 3.  my ac code.\\n\\n\\n\\n     int jump(int A[], int n) {\\n    \\t if(n<2)return 0;\\n    \\t int level=0,currentMax=0,i=0,nextMax=0;\\n    \\n    \\t while(currentMax-i+1>0){\\t\\t//nodes count of current level>0\\n    \\t\\t level++;\\n    \\t\\t for(;i<=currentMax;i++){\\t//traverse current level , and update the max reach of next level\\n    \\t\\t\\tnextMax=max(nextMax,A[i]+i);\\n    \\t\\t\\tif(nextMax>=n-1)return level;   // if last element is in level+1,  then the min jump=level \\n    \\t\\t }\\n    \\t\\t currentMax=nextMax;\\n    \\t }\\n    \\t return 0;\\n     }"
		},
		{
			"lc_ans_id":"18023",
			"view":"22556",
			"top":"1",
			"title":"Single loop simple java solution",
			"vote":"79",
			"content":"    public int jump(int[] A) {\\n        int sc = 0;\\n        int e = 0;\\n        int max = 0;\\n        for(int i=0; i<A.length-1; i++) {\\n            max = Math.max(max, i+A[i]);\\n            if( i == e ) {\\n                sc++;\\n                e = max;\\n            } \\n        }\\n        return sc;\\n    }"
		},
		{
			"lc_ans_id":"18014",
			"view":"10803",
			"top":"2",
			"title":"Concise O(n) one loop JAVA solution based on Greedy",
			"vote":"57",
			"content":"**Explanation**\\n\\nThe main idea is based on greedy. Let's say the range of the current jump is [curBegin, curEnd], curFarthest is the farthest point that all points in [curBegin, curEnd] can reach.  Once the current point reaches curEnd, then trigger another jump, and set the new curEnd with curFarthest, then keep the above steps, as the following:\\n\\n    public int jump(int[] A) {\\n    \\tint jumps = 0, curEnd = 0, curFarthest = 0;\\n    \\tfor (int i = 0; i < A.length - 1; i++) {\\n    \\t\\tcurFarthest = Math.max(curFarthest, i + A[i]);\\n    \\t\\tif (i == curEnd) {\\n    \\t\\t\\tjumps++;\\n    \\t\\t\\tcurEnd = curFarthest;\\n    \\t\\t}\\n    \\t}\\n    \\treturn jumps;\\n    }"
		},
		{
			"lc_ans_id":"18019",
			"view":"8388",
			"top":"3",
			"title":"10-lines C++ (16ms) / Python BFS Solutions with Explanations",
			"vote":"41",
			"content":"This problem has a nice BFS structure. Let's illustrate it using the example `nums = [2, 3, 1, 1, 4]` in the problem statement. We are initially at position `0`. Then we can move at most `nums[0]` steps from it. So, after one move, we may reach `nums[1] = 3` or `nums[2] = 1`. So these nodes are reachable in `1` move. From these nodes, we can further move to `nums[3] = 1` and `nums[4] = 4`. Now you can see that the target `nums[4] = 4` is reachable in `2` moves. \\n\\nPutting these into codes, we keep two pointers `start` and `end` that record the current range of the starting nodes. Each time after we make a move, update `start` to be `end  + 1` and `end` to be the farthest index that can be reached in `1` move from the current `[start, end]`. \\n \\nTo get an accepted solution, it is important to handle all the edge cases. And the following codes handle all of them in a unified way without using the unclean `if` statements :-)\\n \\n----------\\n**C++**\\n\\n    class Solution {\\n    public:\\n        int jump(vector<int>& nums) {\\n            int n = nums.size(), step = 0, start = 0, end = 0;\\n            while (end < n - 1) {\\n                step++; \\n    \\t\\t\\tint maxend = end + 1;\\n    \\t\\t\\tfor (int i = start; i <= end; i++) {\\n                    if (i + nums[i] >= n - 1) return step;\\n    \\t\\t\\t\\tmaxend = max(maxend, i + nums[i]);\\n    \\t\\t\\t}\\n                start = end + 1;\\n                end = maxend;\\n            }\\n    \\t\\treturn step;\\n        }\\n    };\\n\\n----------\\n**Python** \\n\\n    class Solution:\\n        # @param {integer[]} nums\\n        # @return {integer}\\n        def jump(self, nums):\\n            n, start, end, step = len(nums), 0, 0, 0\\n            while end < n - 1:\\n                step += 1\\n                maxend = end + 1\\n                for i in range(start, end + 1):\\n                    if i + nums[i] >= n - 1:\\n                        return step\\n                    maxend = max(maxend, i + nums[i])\\n                start, end = end + 1, maxend\\n            return step"
		},
		{
			"lc_ans_id":"18093",
			"view":"10300",
			"top":"4",
			"title":"Sharing My AC Java Solution",
			"vote":"37",
			"content":"Hi All, below is my AC solution:\\n \\n>     public int jump(int[] A) {\\n>         int maxReach = A[0];\\n>         int edge = 0;\\n>         int minstep = 0;\\n>         \\n>         for(int i = 1; i < A.length; i++) {\\n>             if (i > edge) {\\n>                 minstep += 1;\\n>                 edge = maxReach;\\n>                 if(edge > A.length - 1)\\n>                     return minstep;\\n>             }\\n>             maxReach = Math.max(maxReach, A[i] + i);\\n>             if (maxReach == i):\\n>                 return -1;\\n>         }\\n>         \\n>         return minstep;\\n>     } \\n\\nWhen iterate the array, I set an edge for the Search phase, which means that if I exceeds the edge, the minstep must add one and the maxReach will be update. And when the last index is within the range of the edge, output the minstep.\\n\\n[2, 3, 1, 1, 4]\\n\\nFirst, the edge is 0;\\nSecond, after start iterate the array, it exceeds the edge 0 when reaching the A[0] and update the edge to 2;\\nThird, after it reach the A[2], it exceeds the edge 2 and update the new edge to the maxReach 4.\\nFinally, end of the array is inside the edge, output the minstep."
		},
		{
			"lc_ans_id":"18207",
			"view":"4061",
			"top":"5",
			"title":"Sharing my straightforward C++ solution",
			"vote":"20",
			"content":"    int jump(int A[], int n) {\\n        if(n == 0){\\n            return 0;\\n        }\\n        int maxReachPos = A[0];\\n        int curMaxReachPos = A[0];\\n        int curStep = 1;\\n        for(int i = 1; i <= min(n, maxReachPos); i++){\\n            curMaxReachPos = max(curMaxReachPos, i + A[i]);\\n            if(i == n - 1){\\n                return curStep;\\n            }\\n            if(i == maxReachPos){\\n                maxReachPos = curMaxReachPos;\\n                curStep++;\\n            }\\n        }\\n        return 0;\\n    }\\n\\nThe variable maxReachPos indicates the farthest reachable position and the variable curMaxReachPos indicates the current farthest reachable position.\\n\\nAt the very beginning, both maxReachPos and curMaxReachPos are equal to A[0].\\n\\nIn the For loop, we keep updating curMaxReachPos while i <= maxReachPos. However, if( i == n - 1), we return curStep, which is the minimum step. If i reaches the maxReachPos, we update maxReachPos with curMaxReachPos and increment curStep by one. \\n\\nFinally, if we can't reach the end point, just return 0."
		},
		{
			"lc_ans_id":"18152",
			"view":"1648",
			"top":"6",
			"title":"Java Solution with explanation",
			"vote":"14",
			"content":"    public class Solution {\\n    public int jump(int[] nums) {\\n        // If nums.length < 2, means that we do not\\n        // need to move at all.\\n        if (nums == null || nums.length < 2) {\\n            return 0;\\n        }\\n\\n        // First set up current region, which is\\n        // from 0 to nums[0].\\n        int l = 0;\\n        int r = nums[0];\\n        // Since the length of nums is greater than\\n        // 1, we need at least 1 step.\\n        int step = 1;\\n\\n        // We go through all elements in the region.\\n        while (l <= r) {\\n\\n            // If the right of current region is greater\\n            // than nums.length - 1, that means we are done.\\n            if (r >= nums.length - 1) {\\n                return step;\\n            }\\n\\n            // We should know how far can we reach in current\\n            // region.\\n            int max = Integer.MIN_VALUE;\\n            for (; l <= r; l++) {\\n                max = Math.max(max, l + nums[l]);\\n            }\\n\\n            // If we can reach far more in this round, we update\\n            // the boundary of current region, and also add a step.\\n            if (max > r) {\\n                l = r;\\n                r = max;\\n                step++;\\n            }\\n        }\\n\\n        // We can not finish the job.\\n        return -1;\\n    }\\n}"
		},
		{
			"lc_ans_id":"18035",
			"view":"2016",
			"top":"7",
			"title":"Easy Python Greedy solution with explanation",
			"vote":"12",
			"content":"    class Solution:\\n    # @param A, a list of integers\\n    # @return an integer\\n    def jump(self, A):\\n        last_max_reach, current_max_reach = 0 , 0\\n        njump , i = 0 , 0\\n        while current_max_reach < len(A)-1:\\n            while i <= last_max_reach:\\n                current_max_reach = max(i+A[i],current_max_reach)\\n                i+=1\\n            if last_max_reach == current_max_reach:\\n                return -1\\n            last_max_reach = current_max_reach\\n            njump+=1\\n        return njump\\n\\n\\nThe basic thoughts underline is a greedy style. Every one more jump, you want to jump as far as possible.\\nIn Jump Game I, when you at position i, you care about what is the furthest position could be reached from i th position. but here in Jump Game II, instead you care about what would be the next furthest jump could be made when you could reach as far as ith position from last jump.  So you iterate all positions could be reached from last jump till i th position to find it out."
		},
		{
			"lc_ans_id":"18177",
			"view":"1282",
			"top":"8",
			"title":"Concise O(n) Java Solution with Explanation",
			"vote":"10",
			"content":"For each step of jump, there is a range you can reach. \\nThen try jumping from each position in current range, you will get a new range where the next step can reach.\\nRepeat this process util the range covers the last index.\\n\\n    public class Solution {\\n        public int jump(int[] nums){\\n            int step = 0;\\n            for(int l = 0, r = 0; r < nums.length - 1; step++){\\n            \\tint rNew = 0;\\n            \\tfor(int i = l; i <= r; i++) rNew = Math.max(rNew, i + nums[i]);\\n            \\tl = r + 1;\\n            \\tr = rNew;\\n            }\\n            return step;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"18201",
			"view":"2164",
			"top":"9",
			"title":"17ms AC C++ code, very easy to understand",
			"vote":"10",
			"content":"    int jump(int A[], int n) {\\n    \\t\\tint i = 0, j = 1, cnt = 0, mx;\\n    \\n    \\t\\tif (n == 1) return 0;\\n    \\n    \\t\\twhile (i < n - 1 && i + A[i] < n - 1) {\\n    \\t\\t\\tfor (mx = j; j <= i + A[i]; j++) { mx = (mx + A[mx] <= j + A[j]) ? j : mx; }\\n    \\t\\t\\ti = mx; cnt++;\\n    \\t\\t}\\n    \\t\\treturn ++cnt; /* One more step to last index. */\\n    \\t}\\n\\nAll we have to do is to iterate though all positions we can jump from where we standing, find the largest i + A[i] (greedy) and jump to that index. O(n) in time and constant space."
		}
	],
	"id":"45",
	"title":"Jump Game II",
	"content":"<p>\r\nGiven an array of non-negative integers, you are initially positioned at the first index of the array.\r\n</p>\r\n<p>\r\nEach element in the array represents your maximum jump length at that position. \r\n</p>\r\n<p>\r\nYour goal is to reach the last index in the minimum number of jumps.\r\n</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven array A = <code>[2,3,1,1,4]</code>\r\n</p>\r\n<p>\r\nThe minimum number of jumps to reach the last index is <code>2</code>. (Jump <code>1</code> step from index 0 to 1, then <code>3</code> steps to the last index.)\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br>\r\nYou can assume that you can always reach the last index.</p>",
	"frequency":"394",
	"ac_num":"108380"
}