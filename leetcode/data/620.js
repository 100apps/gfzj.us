{
	"difficulty":"1",
	"submit_num":"60937",
	"show_id":"643",
	"leetcode_id":"643",
	"answers":[
		{
			"lc_ans_id":"105432",
			"view":"6631",
			"top":"0",
			"title":"Java solution, Sum of Sliding window",
			"vote":"24",
			"content":"```\\npublic class Solution {\\n    public double findMaxAverage(int[] nums, int k) {\\n        long sum = 0;\\n        for (int i = 0; i < k; i++) sum += nums[i];\\n        long max = sum;\\n        \\n        for (int i = k; i < nums.length; i++) {\\n            sum += nums[i] - nums[i - k];\\n            max = Math.max(max, sum);\\n        }\\n        \\n        return max / 1.0 / k;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105428",
			"view":"1113",
			"top":"1",
			"title":"C++ simple sliding-window solution",
			"vote":"6",
			"content":"```\\n    double findMaxAverage(vector<int>& nums, int k) {\\n        double sum=0, res=INT_MIN;\\n        for(int i=0;i<nums.size();i++) {\\n            if(i<k) sum+=nums[i];\\n            else {\\n                res=max(sum, res);\\n                sum+=nums[i]-nums[i-k];\\n            }\\n        }\\n        res=max(sum, res);\\n        return res/k;\\n    }"
		},
		{
			"lc_ans_id":"105473",
			"view":"1195",
			"top":"2",
			"title":"Simple Java solution - sliding window",
			"vote":"6",
			"content":"```\\npublic class Solution {\\n    public double findMaxAverage(int[] nums, int k) {\\n        int sum = 0;\\n        for(int i = 0; i < k; i++) {\\n            sum += nums[i];\\n        }\\n        \\n        int maxSum = sum;\\n        for(int i = 0, j = k; j < nums.length; i++, j++) {\\n            sum = sum - nums[i] + nums[j];\\n            maxSum = Math.max(sum, maxSum);\\n        }\\n        \\n        return ((double) maxSum) / ((double) k);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105469",
			"view":"1810",
			"top":"3",
			"title":"Python, Straightforward with Explanation",
			"vote":"5",
			"content":"We want to find the maximum K-length sum.  After, we can divide by K to get the average.\\nWe have two techniques for getting these sums efficiently: prefix sums, or sliding window.\\n\\nIn the first approach, we calculate ```P[i] = A[0] + A[1] + ... + A[i-1]``` in linear time.  Then, ```A[i] + A[i+1] + ... + A[i+K-1] = P[i+K] - P[i]```, and we should find the max of these.\\n\\n```\\ndef findMaxAverage(self, A, K):\\n    P = [0]\\n    for x in A:\\n        P.append(P[-1] + x)\\n\\n    ma = max(P[i+K] - P[i] \\n             for i in xrange(len(A) - K + 1))\\n    return ma / float(K)\\n```\\n\\n<hr></hr>\\n\\nIn the second approach, we maintain ```su = the sum of A[i-K+1] + A[i-K+2] + ... + A[i]```.  Then, when we have K elements in this sum (```if i >= K-1```), it is a candidate to be the maximum sum ```ma```.\\n\\n```\\ndef findMaxAverage(self, A, K):\\n    su = 0\\n    ma = float('-inf')\\n    for i, x in enumerate(A):\\n        su += x\\n        if i >= K:\\n            su -= A[i-K]\\n        if i >= K - 1:\\n            ma = max(ma, su)\\n    return ma / float(K)\\n```"
		},
		{
			"lc_ans_id":"105435",
			"view":"1683",
			"top":"4",
			"title":"2 lines Python, 2 versions",
			"vote":"4",
			"content":"Using prefix sums (where `sums[i]` is the sum of the first `i` numbers) to compute subarray sums.\\n\\n    def findMaxAverage(self, nums, k):\\n        sums = [0] + list(itertools.accumulate(nums))\\n        return max(map(operator.sub, sums[k:], sums)) / k\\n\\nNumPy version (requires `import numpy as np`):\\n\\n    def findMaxAverage(self, nums, k):\\n        sums = np.cumsum([0] + nums)\\n        return int(max(sums[k:] - sums[:-k])) / k"
		},
		{
			"lc_ans_id":"105460",
			"view":"1260",
			"top":"5",
			"title":"Java 8, 2 lines, using reduce w/ explanation",
			"vote":"4",
			"content":"Java 8's reduce functional feature comes in handy when we have to go through an array and calculate a result out of its contents. This solution is a bit more convoluted than the straightforward approach of using a for loop, but its a good way to look at the reduce function for single pass array problems.\\n\\nThe trick in using the reduce function boils down to following:\\n\\n1) As we look at every element in the array, we need to access two information, \\n    - the rolling sum\\n    - the max sum \\nThese are the two variables we can maintain as the accumulator, that gets passed down to each iteration.\\n\\n2) When using Java's reduce and to reduce the integer array to anything other than the type of the array, we need to use the 3 parameter version of reduce.\\n\\nwhich is \\n\\n```\\n<U> U reduce(U identity,\\n         BiFunction<U,? super T,U> accumulator,\\n         BinaryOperator<U> combiner)\\n```\\n  - identity refers to the initial value of the accumulator, in our case, we are going to accumulate both sum and maxSum in an integer[].\\n  - accumulator, is a Function that takes the\\n     - the same integer array that gets passed down through each iteration which is the acc int[]\\n    - and returns the new integer[], which will contain the updated sum and the updated maxSum\\n - combiner is not used unless we have a parallel stream, so its of no significance in this context\\n\\n``` \\npublic static double findMaxAverage(int[] nums, int k) {\\n        int sum = IntStream.range(0, k).map(i -> nums[i]).sum();\\n        return IntStream.range(k, nums.length).boxed().reduce(\\n                new int[] {sum - nums[0], sum},\\n                (arr, i) -> new int[] {arr[0] + nums[i] - nums[i-k+1], Math.max(arr[1], arr[0] + nums[i])},\\n                (x, y) -> x)[1] / (double)k;\\n\\n    }\\n```"
		},
		{
			"lc_ans_id":"105433",
			"view":"656",
			"top":"6",
			"title":"[C++] Clean Code",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    double findMaxAverage(vector<int>& nums, int k) {\\n        int maxsum = INT_MIN;\\n        int sum = 0;\\n        // k = min((size_t)k, nums.size());\\n        for (int i = 0; i < nums.size(); i++) {\\n            sum += nums[i];\\n            if (i >= k) {\\n                sum -= nums[i - k];\\n            }\\n            if (i >= k - 1) {\\n                maxsum = max(maxsum, sum);            \\n            }\\n        }\\n        return (double)maxsum / k;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"105422",
			"view":"383",
			"top":"7",
			"title":"Sliding window python",
			"vote":"1",
			"content":"\\n```\\nclass Solution(object):\\n    def findMaxAverage(self, nums, k):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type k: int\\n        :rtype: float\\n        \"\"\"\\n        begin = 0\\n        end   = 0\\n        n     = len(nums)\\n        kavg  = 0\\n        if k < len(nums):\\n            ksum  = sum(nums[0:k])  # sum of first k items\\n            kavg  = ksum / float(k) # avg of first k items\\n            beg   = 0 # beginning of avg window\\n            x     = k # end of avg window\\n            \\n            while x < n: # when end falls beyond n\\n                ksum = ksum - nums[beg] + nums[x]      # get ksum\\n                kavg = max( kavg , (ksum / float(k)) ) # set kavg to maximum of kavg and new kavg\\n                beg += 1                               # begining of avg window increases\\n                x   += 1                               # end of avg window increases\\n        else:\\n            kavg = sum(nums) / float(len(nums))        # kavg if items are lesser than k\\n        return kavg"
		},
		{
			"lc_ans_id":"105415",
			"view":"15",
			"top":"8",
			"title":"Python 7 lines one-time traverse beats 99.41 %[accepted]",
			"vote":"0",
			"content":"```\\nclass Solution(object):\\n    def findMaxAverage(self, nums, k):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type k: int\\n        :rtype: float\\n        \"\"\"\\n        maxi = sum(nums[:k])\\n        temp = maxi\\n        for i in range(len(nums) - k):\\n            temp = temp - nums[i] + nums[i + k]\\n            if temp > maxi:\\n                maxi = temp\\n        return float(maxi) / float(k)"
		},
		{
			"lc_ans_id":"105416",
			"view":"16",
			"top":"9",
			"title":"JS shortest solution beating 98.36%",
			"vote":"0",
			"content":"```\\nvar findMaxAverage = function(nums, k) {\\n  var curr = 0\\n  var max = -Infinity\\n  for (var i = 0; i < nums.length; i++) {\\n    curr += nums[i]\\n    if (i >= k) {\\n      curr -= nums[i - k]\\n    }\\n    if (i >= k - 1) {\\n      max = Math.max(curr, max)\\n    }\\n\\n  }\\n  return max / k\\n};\\n```"
		}
	],
	"id":"620",
	"title":"Maximum Average Subarray I",
	"content":"<p>\r\nGiven an array consisting of <code>n</code> integers, find the contiguous subarray of given length <code>k</code> that has the maximum average value. And you need to output the maximum average value.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,12,-5,-6,50,3], k = 4\r\n<b>Output:</b> 12.75\r\n<b>Explanation:</b> Maximum average is (12-5-6+50)/4 = 51/4 = 12.75\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>1 <= <code>k</code> <= <code>n</code> <= 30,000.</li>\r\n<li>Elements of the given array will be in the range [-10,000, 10,000].</li>\r\n</ol>\r\n</p>",
	"frequency":"231",
	"ac_num":"22959"
}