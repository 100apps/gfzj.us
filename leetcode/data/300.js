{
	"difficulty":"2",
	"submit_num":"284247",
	"show_id":"300",
	"leetcode_id":"300",
	"answers":[
		{
			"lc_ans_id":"74824",
			"view":"34618",
			"top":"0",
			"title":"Java/Python Binary search O(nlogn) time with explanation",
			"vote":"225",
			"content":"`tails` is an array storing the smallest tail of all increasing subsequences with length `i+1` in `tails[i]`.\\nFor example, say we have `nums = [4,5,6,3]`, then all the available increasing subsequences are:\\n    \\n    len = 1   :      [4], [5], [6], [3]   => tails[0] = 3\\n    len = 2   :      [4, 5], [5, 6]       => tails[1] = 5\\n    len = 3   :      [4, 5, 6]            => tails[2] = 6\\n\\nWe can easily prove that tails is a increasing array. Therefore it is possible to do a binary search in tails array to find the one needs update.\\n\\nEach time we only do one of the two:\\n\\n    (1) if x is larger than all tails, append it, increase the size by 1\\n    (2) if tails[i-1] < x <= tails[i], update tails[i]\\n\\nDoing so will maintain the tails invariant. The the final answer is just the size.\\n\\n**Java**\\n\\n    public int lengthOfLIS(int[] nums) {\\n        int[] tails = new int[nums.length];\\n        int size = 0;\\n        for (int x : nums) {\\n            int i = 0, j = size;\\n            while (i != j) {\\n                int m = (i + j) / 2;\\n                if (tails[m] < x)\\n                    i = m + 1;\\n                else\\n                    j = m;\\n            }\\n            tails[i] = x;\\n            if (i == size) ++size;\\n        }\\n        return size;\\n    }\\n    // Runtime: 2 ms\\n\\n**Python**\\n\\n    def lengthOfLIS(self, nums):\\n        tails = [0] * len(nums)\\n        size = 0\\n        for x in nums:\\n            i, j = 0, size\\n            while i != j:\\n                m = (i + j) / 2\\n                if tails[m] < x:\\n                    i = m + 1\\n                else:\\n                    j = m\\n            tails[i] = x\\n            size = max(i + 1, size)\\n        return size\\n\\n    # Runtime: 48 ms"
		},
		{
			"lc_ans_id":"74825",
			"view":"53397",
			"top":"1",
			"title":"Short Java solution using DP O(n log n)",
			"vote":"202",
			"content":"    public class Solution {\\n        public int lengthOfLIS(int[] nums) {            \\n            int[] dp = new int[nums.length];\\n            int len = 0;\\n    \\n            for(int x : nums) {\\n                int i = Arrays.binarySearch(dp, 0, len, x);\\n                if(i < 0) i = -(i + 1);\\n                dp[i] = x;\\n                if(i == len) len++;\\n            }\\n    \\n            return len;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"74848",
			"view":"21118",
			"top":"2",
			"title":"9 lines C++ code with O(NlogN) complexity",
			"vote":"100",
			"content":"Inspired by http://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/\\n\\n    int lengthOfLIS(vector<int>& nums) {\\n        vector<int> res;\\n        for(int i=0; i<nums.size(); i++) {\\n            auto it = std::lower_bound(res.begin(), res.end(), nums[i]);\\n            if(it==res.end()) res.push_back(nums[i]);\\n            else *it = nums[i];\\n        }\\n        return res.size();\\n    }"
		},
		{
			"lc_ans_id":"74836",
			"view":"16731",
			"top":"3",
			"title":"My easy to understand O(n^2) solution using DP with video explanation",
			"vote":"56",
			"content":"This solution is taken from this great guy - \\nhttps://www.youtube.com/watch?v=CE2b_-XfVDk   \\n\\n        public int lengthOfLIS(int[] nums) \\n    \\t{\\n    \\t\\t// Base case\\n    \\t\\tif(nums.length <= 1) \\n    \\t\\t\\treturn nums.length;\\n    \\n    \\t\\t// This will be our array to track longest sequence length\\n    \\t\\tint T[] = new int[nums.length];\\n    \\n    \\t\\t// Fill each position with value 1 in the array\\n    \\t\\tfor(int i=0; i < nums.length; i++)\\n    \\t\\t\\tT[i] = 1;\\n    \\n    \\n    \\t\\t// Mark one pointer at i. For each i, start from j=0.\\n    \\t\\tfor(int i=1; i < nums.length; i++)\\n    \\t\\t{\\n    \\t\\t\\tfor(int j=0; j < i; j++)\\n    \\t\\t\\t{\\n    \\t\\t\\t\\t// It means next number contributes to increasing sequence.\\n    \\t\\t\\t\\tif(nums[j] < nums[i])\\n    \\t\\t\\t\\t{\\n    \\t\\t\\t\\t\\t// But increase the value only if it results in a larger value of the sequence than T[i]\\n    \\t\\t\\t\\t\\t// It is possible that T[i] already has larger value from some previous j'th iteration\\n    \\t\\t\\t\\t\\tif(T[j] + 1 > T[i])\\n    \\t\\t\\t\\t\\t{\\n    \\t\\t\\t\\t\\t\\tT[i] = T[j] + 1;\\n    \\t\\t\\t\\t\\t}\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\n    \\t\\t// Find the maximum length from the array that we just generated \\n    \\t\\tint longest = 0;\\n    \\t\\tfor(int i=0; i < T.length; i++)\\n    \\t\\t\\tlongest = Math.max(longest, T[i]);\\n    \\n    \\t\\treturn longest;\\n    \\t}"
		},
		{
			"lc_ans_id":"74989",
			"view":"11865",
			"top":"4",
			"title":"[C++] Typical DP N^2 solution and NLogN solution from GeekForGeek",
			"vote":"44",
			"content":"This is a classic problem and here is a DP solution for reference \\nPlease note a NLogN solution can be found in the following link\\n[Geek for Geek ][1]\\n\\n    class Solution {\\n    public:\\n        // There's a typical DP solution with O(N^2) Time and O(N) space \\n        // DP[i] means the result ends at i\\n        // So for dp[i], dp[i] is max(dp[j]+1), for all j < i and nums[j] < nums[i]\\n        int lengthOfLIS(vector<int>& nums) {\\n            const int size = nums.size();\\n            if (size == 0) { return 0; } \\n            vector<int> dp(size, 1);\\n            int res = 1;\\n            for (int i = 1; i < size; ++i) {\\n                for (int j = 0; j < i; ++j) {\\n                    if (nums[j] < nums[i]) {\\n                        dp[i] = max(dp[i], dp[j]+1);\\n                    }\\n                }\\n                res = max (res, dp[i]);\\n            }\\n            return res;\\n        }\\n    };\\n\\n\\n  [1]: http://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/"
		},
		{
			"lc_ans_id":"74897",
			"view":"7290",
			"top":"5",
			"title":"Fast Java Binary Search Solution with detailed explanation",
			"vote":"37",
			"content":"This solution uses Binary Search + DP\\n\\n    1, traverse from 0 to len-1, the DP array keep the longest sequence.\\n    2, if the val is bigger than largest in the dp array, add it to the end;\\n    3, if it is among the sequence, return the pos that bigger than pres, update the array with this position if val is smaller than dp[pos];\\n    This is to keep the sequence element with the smallest number.\\n\\nFor example:\\n\\n    10, 9, 2, 5, 3, 7, 101, 18\\n    \\n    10 \\n    9\\n    2\\n    2,5\\n    2,3\\n    2,3,7\\n    2,3,7,101\\n    2,3,7,18\\nThe follow is the solution:\\n\\n    public class Solution {\\n        public int lengthOfLIS(int[] nums) {\\n            if (nums == null || nums.length == 0) {\\n                return 0;\\n            }\\n            int[] dp = new int[nums.length];\\n            dp[0] = nums[0];\\n            int len = 0;\\n            for (int i = 1; i < nums.length; i++) {\\n                int pos = binarySearch(dp,len,nums[i]);\\n                if (nums[i] < dp[pos]) dp[pos] = nums[i];\\n                if (pos > len) {\\n                    len = pos;\\n                    dp[len] = nums[i];\\n                }\\n            }\\n            return len+1;\\n        }\\n        private int binarySearch(int[] dp, int len, int val) {\\n            int left = 0;\\n            int right = len;\\n            while(left+1 < right) {\\n                int mid = left + (right-left)/2;\\n                if (dp[mid] == val) {\\n                    return mid;\\n                } else {\\n                    if (dp[mid] < val) {\\n                        left = mid;\\n                    } else {\\n                        right = mid;\\n                    }\\n                }\\n            }\\n            if (dp[right] < val) return len+1;\\n            else if (dp[left] >= val) return left;\\n            else return right;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"74869",
			"view":"4858",
			"top":"6",
			"title":"Simple java O(nlogn) solution",
			"vote":"29",
			"content":"    public int lengthOfLIS(int[] nums) \\n    {\\n        List<Integer> sequence = new ArrayList();\\n        for(int n : nums) update(sequence, n);\\n        \\n        return sequence.size();\\n    }\\n    \\n    private void update(List<Integer> seq, int n)\\n    {\\n        if(seq.isEmpty() || seq.get(seq.size() - 1) < n) seq.add(n);\\n        else\\n        {\\n            seq.set(findFirstLargeEqual(seq, n), n);\\n        }\\n    }\\n\\n    private int findFirstLargeEqual(List<Integer> seq, int target)\\n    {\\n        int lo = 0;\\n        int hi = seq.size() - 1;\\n        while(lo < hi)\\n        {\\n            int mid = lo + (hi - lo) / 2;\\n            if(seq.get(mid) < target) lo = mid + 1;\\n            else hi = mid;\\n        }\\n        \\n        return lo;\\n    }"
		},
		{
			"lc_ans_id":"74880",
			"view":"5102",
			"top":"7",
			"title":"JAVA--------------Easy Version To Understand!!!!!!!!",
			"vote":"27",
			"content":"    public static int findPositionToReplace(int[] a, int low, int high, int x) {\\n\\t\\tint mid;\\n\\t\\twhile (low <= high) {\\n\\t\\t\\tmid = low + (high - low) / 2;\\n\\t\\t\\tif (a[mid] == x)\\n\\t\\t\\t\\treturn mid;\\n\\t\\t\\telse if (a[mid] > x)\\n\\t\\t\\t\\thigh = mid - 1;\\n\\t\\t\\telse\\n\\t\\t\\t\\tlow = mid + 1;\\n\\t\\t}\\n\\t\\treturn low;\\n\\t}\\n\\n\\tpublic static int lengthOfLIS(int[] nums) {\\n\\t\\tif (nums == null | nums.length == 0)\\n\\t\\t\\treturn 0;\\n\\t\\tint n = nums.length, len = 0;\\n\\t\\tint[] increasingSequence = new int[n];\\n\\t\\tincreasingSequence[len++] = nums[0];\\n\\t\\tfor (int i = 1; i < n; i++) {\\n\\t\\t\\tif (nums[i] > increasingSequence[len - 1])\\n\\t\\t\\t\\tincreasingSequence[len++] = nums[i];\\n\\t\\t\\telse {\\n\\t\\t\\t\\tint position = findPositionToReplace(increasingSequence, 0, len - 1, nums[i]);\\n\\t\\t\\t\\tincreasingSequence[position] = nums[i];\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn len;\\n\\t}"
		},
		{
			"lc_ans_id":"74855",
			"view":"2288",
			"top":"8",
			"title":"Short C++ STL-based solution: O(n log n) time, O(1) space, with explanation",
			"vote":"23",
			"content":"This solution can be viewed as d.p., but I find it easier not to think of it that way.\\n\\n**Runtime**: To get an O(n log n ) runtime, I'm going to create a second list S.  (Stick with me for now -- I'll get rid of it in a minute to get O(1) space.)  I'll do a single pass through **nums**, and as I look at each element:\\n\\n* The length of S will be equal to the length of the longest subsequence I've found to that point.\\n* The last element of S will be the last element of that subsequence.  (However, the earlier elements may no longer be part of that sequence -- S is not actually the subsequence itself.)\\n\\nAt the end, the *length* of S will be our solution.\\n\\nS will be sorted at all times.  Each new element is inserted into S, replacing the smallest element in S that is not smaller than it (which we can find with a binary search). If that element is larger than the last element of S, then we extend S by one -- maintaining both properties.\\n\\nFor example, if \\n\\n    nums = [5,6,7,1,2,8,3,4,0,5,9]\\n\\nthen after we prcoess the 7:\\n \\n    S = [5,6,7]\\n\\nafter w process the 2:\\n \\n    S = [1,2,7]\\n\\nafter we process the 8:\\n\\n    S = [1,2,7,8]\\n\\nThen we process the 3:\\n\\n    S = [1,2,3,8]\\n\\nWe process the 4:\\n\\n    S = [1,2,3,4]\\n\\nand now the next three elements:\\n\\n    S = [0,2,3,4,5,9]\\n\\nS is not the actual subsequence, but it is the right length (end ends in the right number).\\n\\nWe are making 1 pass on **n** elements, and doing a binary search each time.  So **O(n log n)** time.\\n\\n**Space**: Assuming we are allowed to destroy the list, we don't need S.  Since S will never be larger then the number of elements we have looked at, and we only need to look at each element once, we can just use the beginning of **nums** for S (keeping track of the size of \"S\" in a separate variable).\\n\\nMaking using of the STL lower_bound function (find the smallest element in a sorted list that is not smaller than the target):\\n\\n    int lengthOfLIS(vector<int>& nums) {\\n        if (nums.size() == 0)\\n            return nums.size();\\n\\n        vector<int>::iterator m = nums.begin();  // m will mark the virtual \"S.end()\".\\n        for (int& val : nums) {\\n            auto it = lower_bound(nums.begin(), m, val);\\n            *it = val;\\n            if (it == m)\\n                m++;\\n        }\\n        \\n        return m - nums.begin();\\n    }"
		},
		{
			"lc_ans_id":"74953",
			"view":"2556",
			"top":"9",
			"title":"Java solution, dp, simple",
			"vote":"23",
			"content":"    public int lengthOfLIS(int[] nums) {\\n        if(nums==null || nums.length==0){\\n            return 0;\\n        }\\n        int[] dp = new int[nums.length];\\n        int max = 1;\\n        for(int index=0; index<nums.length;index++){\\n            dp[index]=1;\\n            for(int dpIndex=0; dpIndex<index; dpIndex++){\\n                if(nums[dpIndex]<nums[index]){\\n                    dp[index]=Math.max(dp[index],dp[dpIndex]+1);\\n                    max=Math.max(dp[index],max);\\n                }\\n            }\\n        }\\n        return max;\\n    }"
		}
	],
	"id":"300",
	"title":"Longest Increasing Subsequence",
	"content":"<p>\r\nGiven an unsorted array of integers, find the length of longest increasing subsequence.\r\n</p>\r\n<p>\r\nFor example,<br />\r\nGiven <code>[10, 9, 2, 5, 3, 7, 101, 18]</code>,<br />\r\nThe longest increasing subsequence is <code>[2, 3, 7, 101]</code>, therefore the length is <code>4</code>. Note that there may be more than one LIS combination, it is only necessary for you to return the length.\r\n</p>\r\n<p>\r\nYour algorithm should run in O(<i>n<sup>2</sup></i>) complexity.\r\n</p>\r\n\r\n<p><b>Follow up:</b> Could you improve it to O(<i>n</i> log <i>n</i>) time complexity? </p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/pbrother\">@pbrother</a> for adding this problem and creating all test cases.</p>",
	"frequency":"340",
	"ac_num":"110365"
}