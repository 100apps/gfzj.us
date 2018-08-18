{
	"difficulty":"2",
	"submit_num":"61450",
	"show_id":"413",
	"leetcode_id":"413",
	"answers":[
		{
			"lc_ans_id":"90058",
			"view":"16845",
			"top":"0",
			"title":"Simple Java solution 9 lines, 2ms",
			"vote":"126",
			"content":"    public int numberOfArithmeticSlices(int[] A) {\\n        int curr = 0, sum = 0;\\n        for (int i=2; i<A.length; i++)\\n            if (A[i]-A[i-1] == A[i-1]-A[i-2]) {\\n                curr += 1;\\n                sum += curr;\\n            } else {\\n                curr = 0;\\n            }\\n        return sum;\\n    }"
		},
		{
			"lc_ans_id":"90093",
			"view":"8328",
			"top":"1",
			"title":"3ms C++ Standard DP Solution with Very Detailed Explanation",
			"vote":"45",
			"content":"```\\nclass Solution {\\npublic:\\n    int numberOfArithmeticSlices(vector<int>& A) {\\n        int n = A.size();\\n        if (n < 3) return 0;\\n        vector<int> dp(n, 0); // dp[i] means the number of arithmetic slices ending with A[i]\\n        if (A[2]-A[1] == A[1]-A[0]) dp[2] = 1; // if the first three numbers are arithmetic or not\\n        int result = dp[2];\\n        for (int i = 3; i < n; ++i) {\\n            // if A[i-2], A[i-1], A[i] are arithmetic, then the number of arithmetic slices ending with A[i] (dp[i])\\n            // equals to:\\n            //      the number of arithmetic slices ending with A[i-1] (dp[i-1], all these arithmetic slices appending A[i] are also arithmetic)\\n            //      +\\n            //      A[i-2], A[i-1], A[i] (a brand new arithmetic slice)\\n            // it is how dp[i] = dp[i-1] + 1 comes\\n            if (A[i]-A[i-1] == A[i-1]-A[i-2]) \\n                dp[i] = dp[i-1] + 1;\\n            result += dp[i]; // accumulate all valid slices\\n        }\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"90057",
			"view":"4340",
			"top":"2",
			"title":"2ms Java O(n) time, O(1) space solution",
			"vote":"11",
			"content":"\\n```\\npublic int numberOfArithmeticSlices(int[] A) {\\n        if(A == null || A.length < 3)\\n            return 0;\\n        int sum = 0;\\n        int len = 2;\\n\\n        for(int i=2;i<A.length;i++) {\\n\\n            // keep increasing the splice\\n            if(A[i] - A[i-1] == A[i-1] - A[i-2]) {\\n                len++;\\n            }\\n            else {\\n                if(len > 2) {\\n                    sum += calculateSlices(len);\\n                }\\n                // reset the length of new slice\\n                len = 2;\\n            }\\n        }\\n        // add up the slice in the rear\\n        if(len>2)\\n            sum += calculateSlices(len);\\n\\n        return sum;\\n    }\\n\\n    private int calculateSlices(int n){\\n        return (n-1)*(n-2)/2;\\n    }\\n```"
		},
		{
			"lc_ans_id":"90159",
			"view":"2088",
			"top":"3",
			"title":"3ms Question Maker Solution in CPP O(n) time and in space",
			"vote":"5",
			"content":"I met this question in friend's friend's OA (recursive friend) lol\\n\\nIt could be solved in O(n) with small math trick~~ O(n) time and in space. Thanks @JianShi for this solution!\\n```\\nclass Solution {\\npublic:\\n    int numberOfArithmeticSlices(vector<int>& A) {\\n        if (A.size() < 3) return 0;\\n        int size = (int) A.size();\\n        for (int i = 0; i < size - 1; i++) {\\n            A[i] = A[i + 1] - A[i];\\n        }\\n        A.resize(size - 1);\\n        size--;\\n        \\n        int res = 0;\\n        int len = 1;\\n        for (int i = 1; i < size; i++) {\\n            if (A[i] != A[i - 1]) {\\n                res += len * (len - 1) / 2;\\n                len = 1;\\n            } else {\\n                len++;\\n            }\\n        }\\n        if (len > 1) res += len * (len - 1) / 2;\\n        return res;\\n    }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"90112",
			"view":"2197",
			"top":"4",
			"title":"Python DP solution",
			"vote":"4",
			"content":"    def numberOfArithmeticSlices(self, A):\\n        \"\"\"\\n        :type A: List[int]\\n        :rtype: int\\n        \"\"\"\\n        opt, i = [0,0], 1\\n        for j in xrange(2,len(A)):\\n            if A[j]-A[j-1] == A[j-1]-A[j-2]:\\n                opt.append(opt[j-1]+i)\\n                i += 1\\n            else:\\n                opt.append(opt[j-1])\\n                i = 1\\n        return opt[-1]"
		},
		{
			"lc_ans_id":"90067",
			"view":"1672",
			"top":"5",
			"title":"java 2ms O(n) solution using DP with detail explanation",
			"vote":"4",
			"content":"trying to find the relationship between f(n)  and f(n - 1) when A[n] can be part of current arithmetic slice. \\n\\nthen easy to find that if A[n] can be the end of the current arithmetic slice, then the total number of arithmetic slices will be incremented by the length of current slice(including A[n]) - 3 + 1;\\n\\ne.g. \\nwhen 1 2 3 --> (1, 2, 3) increment is 3 - 3 + 1 = 1  \\nwhen 1 2 3 4 --> (2, 3, 4), (1, 2, 3,4),  increment is 4 - 3 + 1 = 2\\nwhen 1 2 3 4 5 --> (3, 4, 5), (2, 3, 4, 5), (1, 2, 3, 4, 5), increment is 5 - 3 + 1 = 3.\\n \\n\\nso the first step is to loop and store the length of arithmetic.\\nsecond loop is to added up all the increments.\\n\\ne.g. [1 2 3 4 0 0 7 8 9]\\nfirst loop [0 0 3 4 0 0 0 0 3];\\nsecond loop sum = (3 - 3 + 1) + (4 - 3 + 1) + 0 + 0 + 0 + 0 + (3 - 3 + 1) = 4\\n\\n```\\npublic class Solution {\\n    public int numberOfArithmeticSlices(int[] A) {\\n        if(A == null || A.length == 0) return 0;\\n        int[] index = new int[A.length];\\n        for(int i = 2; i < index.length; i++)\\n        {\\n        \\tif(A[i] - A[i - 1] == A[i - 1] - A[i - 2])\\n        \\t{\\n        \\t\\tif(index[i - 1] == 0) index[i] = 3;\\n        \\t\\telse index[i] = index[i - 1] + 1;\\n        \\t}\\n        \\telse index[i] = 0;\\n        }\\n\\n        int sum = 0;\\n        for(int i = 0; i < index.length; i++)\\n        {\\n        \\tif(index[i] != 0)\\n        \\t{\\n        \\t\\tsum += index[i] - 3 + 1;\\n        \\t}\\n        }\\n        return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"90100",
			"view":"160",
			"top":"6",
			"title":"A clear python solution with a little math",
			"vote":"2",
			"content":"The key idea is to find blocks with the same difference, i.e., for [1,2,3,4,7,9,11,13,15], the [1,2,3,4] and [7,9,11,13,15] are two blocks with difference 1 and 2, respectively. \\n\\nOnce we know the lengths, which are 4 and 5, then the number of slices are just (n-1)(n-2)/2, which is, n-2 + n-3 + ... + n-(n-1) for each n. Then just create a list of maximum lengths of blocks and apply the above formula. Enjoy!\\n\\n    def numberOfArithmeticSlices(self, A):\\n        if len(A) < 3: return 0\\n        ns, n = [], 0\\n        for i in range(2, len(A)):\\n            if A[i] - A[i-1] == A[i-1] - A[i-2]:\\n                n += 1\\n            else:\\n                if n >= 1: ns.append(n+2)\\n                n = 0\\n        else:\\n            if n >= 1: ns.append(n+2)\\n        return int(sum(list(map(lambda x: (x-1)*(x-2)/2, ns))))"
		},
		{
			"lc_ans_id":"90119",
			"view":"405",
			"top":"7",
			"title":"Solution with explanation. O(n) memory to O(1)",
			"vote":"2",
			"content":"To know how many sequences we can build for position i it is enough to know for how many sequences(with length>2) it can be the tail. \\nFor example: {1,2,4,6,8,10,11 }\\nThe number 8 at position 4 (0-based) can be tail for 2 sequences: \\n1) [2,4,6,8]; \\n2) [4,6,8]; \\n\\nThe number 10 can be tail for 3 sequence: \\n1) [2,4,6,8,10]\\n2) [4,6,8,10]\\n3) [6,8,10]\\n\\nThe sum of values of all tails will give us the number of possible sequences.\\n\\n```\\npublic class Solution {\\n    public int numberOfArithmeticSlices(int[] A) {\\n        HashMap<Integer, Integer> differences = new HashMap<>();\\n        \\n        int d[] = new int[A.length];\\n        int sum = 0;\\n        for (int i=2; i<A.length; i++) {\\n            if (A[i]-A[i-1] == A[i-1]-A[i-2]) {\\n                d[i] = d[i-1]+1;\\n            }\\n            sum+=d[i];\\n        }\\n        return sum;\\n    }\\n}\\n```\\n\\nOptimization for memory:\\nHowever, for calulating the length of sequence with equal differences at position i it is enough to know the answer only for position i-1. It is enough to store the value for i-1;\\n\\n```\\npublic class Solution {\\n    public int numberOfArithmeticSlices(int[] A) {\\n        int sum = 0;\\n        int cur = 0;\\n        for (int i=2; i<A.length; i++) {\\n            if ( A[i]-A[i-1] == A[i-1]-A[i-2] ) {\\n                cur++;\\n                sum+=cur;\\n            } else {\\n                cur = 0;\\n            }\\n        }\\n        return sum;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"90123",
			"view":"316",
			"top":"8",
			"title":"Concise, and simple C++ 8 lines Solution",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    int numberOfArithmeticSlices(vector<int>& A) {\\n        if(A.size() < 3) return 0;\\n        int count = 0, int ret = 0;\\n        for(int i = 1; i < A.size() - 1; i++)\\n        {\\n            if(A[i] - A[i-1] == A[i+1] - A[i]) ret += ++count;\\n            else count = 0;\\n        }\\n        return ret;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"90161",
			"view":"390",
			"top":"9",
			"title":"5 lines clean Java solution",
			"vote":"2",
			"content":"```\\n    public int numberOfArithmeticSlices(int[] A) {\\n        int[] lens = new int[A.length];\\n        for (int i = 2; i < A.length; ++i)\\n            if (A[i - 1] - A[i - 2] == A[i] - A[i - 1])\\n                lens[i] = Math.max(1, lens[i - 1] + 1);\\n        return Arrays.stream(lens).sum();\\n    }\\n```"
		}
	],
	"id":"413",
	"title":"Arithmetic Slices",
	"content":"<p>A sequence of number is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.</p>\r\n\r\n<p>For example, these are arithmetic sequence:</p>\r\n<pre>1, 3, 5, 7, 9\r\n7, 7, 7, 7\r\n3, -1, -5, -9</pre>\r\n\r\n<p>The following sequence is not arithmetic.</p> <pre>1, 1, 2, 5, 7</pre> \r\n<br/>\r\n\r\n<p>A zero-indexed array A consisting of N numbers is given. A slice of that array is any pair of integers (P, Q) such that 0 <= P < Q < N.</p>\r\n\r\n<p>A slice (P, Q) of array A is called arithmetic if the sequence:<br/>\r\n    A[P], A[p + 1], ..., A[Q - 1], A[Q] is arithmetic. In particular, this means that P + 1 < Q.</p>\r\n\r\n<p>The function should return the number of arithmetic slices in the array A. </p>\r\n<br/>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nA = [1, 2, 3, 4]\r\n\r\nreturn: 3, for 3 arithmetic slices in A: [1, 2, 3], [2, 3, 4] and [1, 2, 3, 4] itself.\r\n</pre>",
	"frequency":"305",
	"ac_num":"33593"
}