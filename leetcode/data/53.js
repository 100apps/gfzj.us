{
	"difficulty":"1",
	"submit_num":"683238",
	"show_id":"53",
	"leetcode_id":"53",
	"answers":[
		{
			"lc_ans_id":"20193",
			"view":"73060",
			"top":"0",
			"title":"DP solution & some thoughts",
			"vote":"352",
			"content":"Analysis of this problem:\\n Apparently, this is a optimization problem, which can be usually solved by DP. So when it comes to DP, the first thing for us to figure out is the format of the sub problem(or the state of each sub problem).  The format of the sub problem can be helpful when we are trying to come up with the recursive relation. \\n\\nAt first, I think the sub problem should look like: `maxSubArray(int A[], int i, int j)`, which means the maxSubArray for A[i: j]. In this way, our goal is to figure out what `maxSubArray(A, 0, A.length - 1)` is. However, if we define the format of the sub problem in this way, it's hard to find the connection from the sub problem to the original problem(at least for me). In other words, I can't find a way to divided the original problem into the sub problems and use the solutions of the sub problems to somehow create the solution of the original one. \\n\\nSo I change the format of the sub problem into something like: `maxSubArray(int A[], int i)`, which means the maxSubArray for A[0:i ] which must has A[i] as the end element. Note that now the sub problem's format is less flexible and less powerful than the previous one because there's a limitation that A[i] should be contained in that sequence and we have to keep track of each solution of the sub problem to update the global optimal value. However, now the connect between the sub problem & the original one becomes clearer:\\n \\n\\n    maxSubArray(A, i) = maxSubArray(A, i - 1) > 0 ? maxSubArray(A, i - 1) : 0 + A[i]; \\n\\nAnd here's the code\\n\\n    public int maxSubArray(int[] A) {\\n            int n = A.length;\\n            int[] dp = new int[n];//dp[i] means the maximum subarray ending with A[i];\\n            dp[0] = A[0];\\n            int max = dp[0];\\n            \\n            for(int i = 1; i < n; i++){\\n                dp[i] = A[i] + (dp[i - 1] > 0 ? dp[i - 1] : 0);\\n                max = Math.max(max, dp[i]);\\n            }\\n            \\n            return max;\\n    }"
		},
		{
			"lc_ans_id":"20211",
			"view":"52488",
			"top":"1",
			"title":"Accepted O(n) solution in java",
			"vote":"265",
			"content":"this problem was discussed by Jon Bentley (Sep. 1984 Vol. 27 No. 9 Communications of the ACM P885)\\n\\nthe paragraph below was copied from his paper (with a little modifications)\\n\\nalgorithm that operates on arrays: it starts at the left end (element A[1]) and scans through to the right end (element A[n]), keeping track of the maximum sum subvector seen so far. The maximum is initially A[0]. Suppose we've solved the problem for A[1 .. i - 1]; how can we extend that to A[1 .. i]? The maximum \\nsum in the first I elements is either the maximum sum in the first i - 1 elements (which we'll call MaxSoFar), or it is that of a subvector that ends in position i (which we'll call MaxEndingHere).  \\n\\nMaxEndingHere is either A[i] plus the previous MaxEndingHere, or just A[i], whichever is larger.\\n\\n    public static int maxSubArray(int[] A) {\\n        int maxSoFar=A[0], maxEndingHere=A[0];\\n        for (int i=1;i<A.length;++i){\\n        \\tmaxEndingHere= Math.max(maxEndingHere+A[i],A[i]);\\n        \\tmaxSoFar=Math.max(maxSoFar, maxEndingHere);\\t\\n        }\\n        return maxSoFar;\\n    }"
		},
		{
			"lc_ans_id":"20189",
			"view":"27349",
			"top":"2",
			"title":"Simplest and fastest O(n) C++ solution",
			"vote":"73",
			"content":"Idea is very simple. Basically, keep adding each integer to the sequence until the sum drops below 0. \\nIf sum is negative, then should reset the sequence.\\n\\n    class Solution {\\n    public:\\n        int maxSubArray(int A[], int n) {\\n            int ans=A[0],i,j,sum=0;\\n            for(i=0;i<n;i++){\\n                sum+=A[i];\\n                ans=max(sum,ans);\\n                sum=max(sum,0);\\n            }\\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"20194",
			"view":"13258",
			"top":"3",
			"title":"A Python solution",
			"vote":"60",
			"content":"    class Solution:\\n        # @param A, a list of integers\\n        # @return an integer\\n        # 6:57\\n        def maxSubArray(self, A):\\n            if not A:\\n                return 0\\n    \\n            curSum = maxSum = A[0]\\n            for num in A[1:]:\\n                curSum = max(num, curSum + num)\\n                maxSum = max(maxSum, curSum)\\n    \\n            return maxSum"
		},
		{
			"lc_ans_id":"20210",
			"view":"15837",
			"top":"4",
			"title":"O(n) Java solution",
			"vote":"59",
			"content":"The catch here is that we have to take care of negative value.\\nThe solution does 1 iteration with constant space and no DP.\\n\\n    public class Solution {\\n    public int maxSubArray(int[] A) {\\n        int max = Integer.MIN_VALUE, sum = 0;\\n        for (int i = 0; i < A.length; i++) {\\n            if (sum < 0) \\n                sum = A[i];\\n            else \\n                sum += A[i];\\n            if (sum > max)\\n                max = sum;\\n        }\\n        return max;\\n    }\\n}"
		},
		{
			"lc_ans_id":"20200",
			"view":"10530",
			"top":"5",
			"title":"Share my solutions - both greedy and divide and conquer",
			"vote":"42",
			"content":"**greedy:**\\n\\n    class Solution {\\n    public:\\n        int maxSubArray(int A[], int n) {\\n            int sum = 0, min = 0, res = A[0];\\n            for(int i = 0; i < n; i++) {\\n                sum += A[i];\\n                if(sum - min > res) res = sum - min;\\n                if(sum < min) min = sum;\\n            }\\n            return res;\\n        }\\n    };\\n\\nThe idea is to find the largest difference between the sums when you summing up the array from left to right. The largest difference corresponds to the sub-array with largest sum. I worked it out independently although It is very  close to lucastan's solution https://oj.leetcode.com/discuss/11288/simple-o-n-c-solution-no-dp-no-divide-and-conquer\\n\\n**divide and conquer:**\\n\\n    struct val {\\n        int l, m, r, s;\\n        val(int l, int m, int r, int s):l(l), m(m), r(r), s(s){}\\n    };\\n    \\n    class Solution {\\n    public:\\n        val dac(int A[], int n) {\\n            if(n == 1) return val(A[0], A[0], A[0], A[0]);\\n            val v1 = dac(A, n / 2), v2 = dac(A + n / 2, n - n / 2);\\n            int l, m, r, s;\\n            l = max(v1.l, v1.s + v2.l);\\n            m = max(v1.r + v2.l, max(v1.m, v2.m));\\n            r = max(v2.r, v1.r + v2.s);\\n            s = v1.s + v2.s;\\n            return val(l, m, r, s);\\n        }\\n        int maxSubArray(int A[], int n) {\\n            val v = dac(A, n);\\n            return v.m;\\n        }\\n    };\\n\\nthe idea is: for each sub array we calculate 4 values in O(1) time based on the return values of its two halves. The meaning of the values:\\n\\n - l: the sum of the sub array with largest sum starting from the  first\\n   element\\n - m: the sum of the sub array with largest sum\\n - r: the sum of the sub array with largest sum ending at the  last\\n   element\\n - s: the sum of the whole array\\n\\nthe recursive relation is clear in the code."
		},
		{
			"lc_ans_id":"20360",
			"view":"5230",
			"top":"6",
			"title":"[C++] An clear O(n) divide and conquer solution with comments",
			"vote":"32",
			"content":"For each subarray, calculate four attributes: \\n\\n    mx (largest sum of this subarray), \\n    lmx(largest sum starting from the left most element), \\n    rmx(largest sum ending with the right most element), \\n    sum(the sum of the total subarray). \\nThe recurrence is: T(n) = 2T(n / 2) + O(1). So the running time of this algorithm is O(n).\\n\\n    class Solution {\\n    public:\\n        void maxSubArray(vector<int>& nums, int l, int r, int& mx, int& lmx, int& rmx, int& sum) {\\n            if (l == r) {\\n                mx = lmx = rmx = sum = nums[l];\\n            }\\n            else {\\n                int m = (l + r) / 2;\\n                int mx1, lmx1, rmx1, sum1;\\n                int mx2, lmx2, rmx2, sum2;\\n                maxSubArray(nums, l, m, mx1, lmx1, rmx1, sum1);\\n                maxSubArray(nums, m + 1, r, mx2, lmx2, rmx2, sum2);\\n                mx = max(max(mx1, mx2), rmx1 + lmx2);\\n                lmx = max(lmx1, sum1 + lmx2);\\n                rmx = max(rmx2, sum2 + rmx1);\\n                sum = sum1 + sum2;\\n            }\\n        }\\n        int maxSubArray(vector<int>& nums) {\\n            if (nums.size() == 0) {\\n                return 0;\\n            }\\n            int mx, lmx, rmx, sum;\\n            maxSubArray(nums, 0, nums.size() - 1, mx, lmx, rmx, sum);\\n            return mx;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"20372",
			"view":"37691",
			"top":"7",
			"title":"How to solve \"Maximum Subarray\" by using the divide and conquer approach ?",
			"vote":"21",
			"content":"I solve this problem in O(n). But the hint says it would be solved by using the divide and conquer approach.\\nI cannot figure out how to do it with divide and conquer.\\nYou guys have ideas?"
		},
		{
			"lc_ans_id":"20442",
			"view":"2387",
			"top":"8",
			"title":"My concise O(n) DP JAVA Solution",
			"vote":"20",
			"content":"**Explanation**\\n\\nAlthough there're some other simplified solutions, but DP solution can make the original thought for this problem clearer. In this solution, dp[i] means the largest sum among the subarrays whose last element is A[i].\\n\\n**Solution1. DP Solution - O(n) time, O(n) space**\\n   \\n\\n    public int maxSubArray(int[] A) {\\n    \\tint dp[] = new int[A.length]; int max = A[0]; dp[0] = A[0]; \\n    \\tfor (int i = 1; i < A.length; i++) {\\t\\t\\t\\n    \\t\\tdp[i] = Math.max(dp[i-1] + A[i] ,A[i]);\\n    \\t\\tmax = Math.max(max, dp[i]);\\n    \\t}\\n    \\treturn max;\\n    }\\n\\n**Solution2. Simplified DP Solution - O(n) time, O(1) space** *- Special thanks for TWiStErRob's smart comment*\\n\\nThe basic idea is to check previous sum, reset it to 0 if it's less than 0.\\n\\n    public int maxSubArray(int[] A) {\\n        int res = Integer.MIN_VALUE, sum = 0;\\n        for (int i = 0; i < A.length; i++) {\\n            sum = Math.max(sum, 0) + A[i];\\n            res = Math.max(res, sum);\\n        }\\n        return res;\\n    }  \\n\\n\\n**Solution3. Pre-Sum Array Solution - O(n) time, O(n) space**\\n\\nThe basic idea is to use pre-sum array, max =  Math.max(max, sum[i] - minSum). (minSum is the minimum sum before A[i])\\n\\n    public int maxSubArray(int[] A) {\\n    \\tif (A == null || A.length == 0) return 0;\\n    \\tint max = A[0], minSum = Integer.MAX_VALUE;\\n    \\tint sum[] = new int[A.length];\\n    \\tsum[0] = A[0];\\t\\n    \\tfor (int i = 1; i < A.length; i++) {\\n    \\t\\tsum[i] = sum[i-1] + A[i];\\n    \\t\\tminSum = Math.min(0, Math.min(minSum, sum[i-1]));\\n    \\t\\tmax = Math.max(max, sum[i] - minSum); \\n    \\t}\\n    \\treturn max;\\n    }"
		},
		{
			"lc_ans_id":"20225",
			"view":"2878",
			"top":"9",
			"title":"My Divide and Conquer Solution in Java under instruction of CLRS(O(nlogn))",
			"vote":"16",
			"content":"    public class Solution {//divdie and conquer\\n        public int maxSubArray(int[] nums) {\\n            return Subarray(nums, 0 ,nums.length -1 );\\n        }\\n        public int Subarray(int[] A,int left, int right){\\n            if(left == right){return A[left];}\\n            int mid = left + (right - left) / 2;\\n            int leftSum = Subarray(A,left,mid);// left part \\n            int rightSum = Subarray(A,mid+1,right);//right part\\n            int crossSum = crossSubarray(A,left,right);// cross part\\n            if(leftSum >= rightSum && leftSum >= crossSum){// left part is max\\n                return leftSum;\\n            }\\n            if(rightSum >= leftSum && rightSum >= crossSum){// right part is max\\n                return rightSum;\\n            }\\n            return crossSum; // cross part is max\\n        }\\n        public int crossSubarray(int[] A,int left,int right){\\n            int leftSum = Integer.MIN_VALUE;\\n            int rightSum = Integer.MIN_VALUE;\\n            int sum = 0;\\n            int mid = left + (right - left) / 2;\\n            for(int i = mid; i >= left ; i--){\\n                sum = sum + A[i];\\n                if(leftSum < sum){\\n                    leftSum = sum;\\n                }\\n            }\\n            sum = 0;\\n            for(int j = mid + 1; j <= right; j++){\\n                sum = sum + A[j];\\n                if(rightSum < sum){\\n                    rightSum = sum;\\n                }\\n            }\\n            return leftSum + rightSum;\\n        }\\n    }"
		}
	],
	"id":"53",
	"title":"Maximum Subarray",
	"content":"<p>\r\nFind the contiguous subarray within an array (containing at least one number) which has the largest sum.\r\n</p>\r\n<p>\r\nFor example, given the array <code>[-2,1,-3,4,-1,2,1,-5,4]</code>,<br />\r\nthe contiguous subarray <code>[4,-1,2,1]</code> has the largest sum = <code>6</code>.\r\n</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show more practice.</a></p>\r\n\r\n<div class=\"spoilers\"><b>More practice:</b>\r\n\r\n<p>If you have figured out the O(<i>n</i>) solution, try coding another solution using the divide and conquer approach, which is more subtle.</p>\r\n</div>",
	"frequency":"591",
	"ac_num":"274277"
}