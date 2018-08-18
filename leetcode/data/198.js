{
	"difficulty":"1",
	"submit_num":"449302",
	"show_id":"198",
	"leetcode_id":"198",
	"answers":[
		{
			"lc_ans_id":"55693",
			"view":"44365",
			"top":"0",
			"title":"C 1ms, O(1)space,  very simple solution",
			"vote":"201",
			"content":"    #define max(a, b) ((a)>(b)?(a):(b))\\n    int rob(int num[], int n) {\\n        int a = 0;\\n        int b = 0;\\n        \\n        for (int i=0; i<n; i++)\\n        {\\n            if (i%2==0)\\n            {\\n                a = max(a+num[i], b);\\n            }\\n            else\\n            {\\n                b = max(a, b+num[i]);\\n            }\\n        }\\n        \\n        return max(a, b);\\n    }"
		},
		{
			"lc_ans_id":"55681",
			"view":"39508",
			"top":"1",
			"title":"Java O(n) solution, space O(1)",
			"vote":"160",
			"content":"    public int rob(int[] num) {\\n        int[][] dp = new int[num.length + 1][2];\\n        for (int i = 1; i <= num.length; i++) {\\n            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);\\n            dp[i][1] = num[i - 1] + dp[i - 1][0];\\n        }\\n        return Math.max(dp[num.length][0], dp[num.length][1]);\\n    }\\n\\ndp[i][1] means we rob the current house and dp[i][0] means we don't,\\n\\nso it is easy to convert this to O(1) space\\n\\n    public int rob(int[] num) {\\n        int prevNo = 0;\\n        int prevYes = 0;\\n        for (int n : num) {\\n            int temp = prevNo;\\n            prevNo = Math.max(prevNo, prevYes);\\n            prevYes = n + temp;\\n        }\\n        return Math.max(prevNo, prevYes);\\n    }"
		},
		{
			"lc_ans_id":"55696",
			"view":"14541",
			"top":"2",
			"title":"Python solution, 3 lines.",
			"vote":"88",
			"content":"Based on the recursive formula:\\n\\n>     f(0) = nums[0]\\n>     f(1) = max(num[0], num[1])\\n>     f(k) = max( f(k-2) + nums[k], f(k-1) )\\n\\n    class Solution:\\n        \\n        def rob(self, nums):\\n            \\n            last, now = 0, 0\\n            \\n            for i in nums: last, now = now, max(last + i, now)\\n                    \\n            return now"
		},
		{
			"lc_ans_id":"55695",
			"view":"15894",
			"top":"3",
			"title":"JAVA DP Solution, O(n) runtime and O(1) space, with inline comment",
			"vote":"83",
			"content":"    public int rob(int[] num) {\\n        int rob = 0; //max monney can get if rob current house\\n        int notrob = 0; //max money can get if not rob current house\\n        for(int i=0; i<num.length; i++) {\\n            int currob = notrob + num[i]; //if rob current value, previous house must not be robbed\\n            notrob = Math.max(notrob, rob); //if not rob ith house, take the max value of robbed (i-1)th house and not rob (i-1)th house\\n            rob = currob;\\n        }\\n        return Math.max(rob, notrob);\\n    }"
		},
		{
			"lc_ans_id":"55838",
			"view":"12062",
			"top":"4",
			"title":"DP O(N) time, O(1) space with easy to understand explanation",
			"vote":"53",
			"content":"For every house k, there are two options: either to rob it (include this house: i) or not rob it (exclude this house: e). \\n\\n1. Include this house:\\ni = num[k] + e (money of this house + money robbed excluding the previous house)\\n\\n2. Exclude this house:\\ne = max(i, e) (max of money robbed including the previous house or money robbed excluding the previous house)\\n(note that i and e of the previous step, that's why we use tmp here to store the previous i when calculating e, to make O(1) space)\\n\\nHere is the code:\\n\\n    public class Solution {\\n        public int rob(int[] num) {\\n            int i = 0;\\n            int e = 0;\\n            for (int k = 0; k<num.length; k++) {\\n                int tmp = i;\\n                i = num[k] + e;\\n                e = Math.max(tmp, e);\\n            }\\n            return Math.max(i,e);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"55761",
			"view":"5769",
			"top":"5",
			"title":"Java 0ms solution using Dynamic Programming",
			"vote":"40",
			"content":"    public int rob(int[] nums) {  \\n        if(nums.length==0) return 0;\\n        if(nums.length==1) return nums[0];\\n\\n        //Initialize an arrays to store the money\\n    \\tint[] mark = new int[nums.length];\\n\\n        //We can infer the formula from problem:mark[i]=max(num[i]+mark[i-2],mark[i-1])\\n        //so initialize two nums at first.\\n    \\tmark[0] = nums[0];\\n    \\tmark[1] = Math.max(nums[0], nums[1]);\\n\\n        //Using Dynamic Programming to mark the max money in loop.\\n    \\tfor(int i=2;i<nums.length;i++){\\n    \\t\\tmark[i] = Math.max(nums[i]+mark[i-2], mark[i-1]);\\n    \\t}\\n\\t\\treturn mark[nums.length-1];\\n    }"
		},
		{
			"lc_ans_id":"55907",
			"view":"3872",
			"top":"6",
			"title":"Simplest java solution",
			"vote":"33",
			"content":"    public class Solution {\\n    \\n        public int rob(int[] num) {\\n            int last = 0;\\n            int now = 0;\\n            int tmp;\\n            for (int n :num) {\\n                tmp = now;\\n                now = Math.max(last + n, now);\\n                last = tmp;\\n            }\\n            return now;        \\n        }\\n    }"
		},
		{
			"lc_ans_id":"55800",
			"view":"4163",
			"top":"7",
			"title":"The correct DP solution",
			"vote":"28",
			"content":"Here is the DP formula that leads to the right answer:\\n\\n - M(k) = money at the kth house\\n - P(0) = 0\\n - P(1) = M(1)\\n - P(k) = max(P(k\\u22122) + M(k), P(k\\u22121))"
		},
		{
			"lc_ans_id":"55736",
			"view":"3271",
			"top":"8",
			"title":"C++,My solution,DP",
			"vote":"22",
			"content":"    class Solution {\\n    public:\\n        int rob(vector<int>& nums) {\\n            const int n = nums.size();\\n            if (n == 0) return 0;\\n            if (n == 1) return nums[0];\\n            if (n == 2) return max(nums[0], nums[1]);\\n            vector<int> f(n, 0);\\n            f[0] = nums[0];\\n            f[1] = max(nums[0], nums[1]);\\n            for (int i = 2; i < n; ++i)\\n                f[i] = max(f[i-2] + nums[i], f[i-1]);\\n            return f[n-1];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"55976",
			"view":"2781",
			"top":"9",
			"title":"Java O(n) DP solution with 13 lines clean code.",
			"vote":"18",
			"content":"     public int rob(int[] num) {\\n    \\t\\tint n = num.length;\\n    \\t\\tif (n < 2)\\n    \\t\\t\\treturn n == 0 ? 0 : num[0];\\n    \\t\\tint[] cache = new int[n];\\n    \\t\\tcache[0] = num[0];\\n    \\t\\tcache[1] = num[0] > num[1] ? num[0] : num[1];\\n    \\t\\tfor (int i = 2; i < n; i++) {\\n    \\t\\t\\tcache[i] = cache[i - 2] + num[i];\\n    \\t\\t\\tcache[i] = cache[i] > cache[i-1]? cache[i] : cache[i-1];\\n    \\t\\t}\\n    \\t\\treturn cache[n - 1];\\n    \\t}"
		}
	],
	"id":"198",
	"title":"House Robber",
	"content":"<p>You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and <b>it will automatically contact the police if two adjacent houses were broken into on the same night</b>.</p>\r\n\r\n<p>Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight <b>without alerting the police</b>.</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/ifanchu\">@ifanchu</a> for adding this problem and creating all test cases. Also thanks to <a href=\"https://oj.leetcode.com/discuss/user/ts\">@ts</a> for adding additional test cases.</p>",
	"frequency":"572",
	"ac_num":"178553"
}