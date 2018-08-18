{
	"difficulty":"2",
	"submit_num":"9488",
	"show_id":"548",
	"leetcode_id":"548",
	"answers":[
		{
			"lc_ans_id":"101481",
			"view":"3507",
			"top":"0",
			"title":"Simple Java solution O(n^2)",
			"vote":"47",
			"content":"Here j is used for middle cut, i for left cut and k for right cut. \\nIterate middle cuts and then find left cuts which divides the first half into two equal quarters, store that quarter sums in  the hashset. Then find right cuts which divides the second half into two equal quarters and check if quarter sum is present in the hashset. If yes return true.\\n```\\npublic class Solution {\\n    public boolean splitArray(int[] nums) {\\n        if (nums.length < 7)\\n            return false;\\n        int[] sum = new int[nums.length];\\n        sum[0] = nums[0];\\n        for (int i = 1; i < nums.length; i++) {\\n            sum[i] = sum[i - 1] + nums[i];\\n        }\\n        for (int j = 3; j < nums.length - 3; j++) {\\n            HashSet < Integer > set = new HashSet < > ();\\n            for (int i = 1; i < j - 1; i++) {\\n                if (sum[i - 1] == sum[j - 1] - sum[i])\\n                    set.add(sum[i - 1]);\\n            }\\n            for (int k = j + 2; k < nums.length - 1; k++) {\\n                if (sum[nums.length - 1] - sum[k] == sum[k - 1] - sum[j] && set.contains(sum[k - 1] - sum[j]))\\n                    return true;\\n            }\\n        }\\n        return false;\\n    }\\n}"
		},
		{
			"lc_ans_id":"101484",
			"view":"1902",
			"top":"1",
			"title":"Java solution, DFS",
			"vote":"7",
			"content":"Just think this problem as a DFS. What we need is to search for ```3``` positions (i, j, k) and see if they divide the array to ```4``` parts with same summary. Some tricks:\\n1. Calculate ```left``` on the fly. Thus at last we don't need to calc summary of the ```4th``` part.\\n2. Skip ```0``` during calculate ```target``` because adding zero won't change it.\\n\\n```\\npublic class Solution {\\n    public boolean splitArray(int[] nums) {\\n        int sum = 0, target = 0;\\n        for (int num : nums) sum += num;\\n        for (int i = 1; i + 5 < nums.length; i++) {\\n            if (i != 1 && nums[i - 1] == 0  && nums[i] == 0) continue;\\n            target += nums[i - 1];\\n            if (dfs(nums, i + 1, target, sum - target - nums[i], 1)) return true;\\n        }\\n        return false;\\n    }\\n    \\n    private boolean dfs(int[] nums, int start, int target, int left, int depth) {\\n        if (depth == 3) {\\n            if (left == target) return true;\\n            return false;\\n        }\\n        \\n        int sub = 0;\\n        for (int j = start + 1; j + 5 - depth * 2 < nums.length; j++) {\\n            sub += nums[j - 1];\\n            if (sub == target) {\\n                if (dfs(nums, j + 1, target, left - sub - nums[j], depth + 1)) {\\n                    return true;\\n                }\\n            }\\n        }\\n        \\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101486",
			"view":"198",
			"top":"2",
			"title":"C++ EZ understanding 23ms-29ms clean math solution and something else...",
			"vote":"2",
			"content":"Basicly we know: \\n1. Need to find three point: x, y, z\\n2. Total = 4*subArray + nums[x] + nums[y] + nums[z]\\n\\nthen... I think the code will show you the idea...   \\n```cpp\\nclass Solution {\\npublic:\\n    bool splitArray(vector<int>& nums) {\\n        int i=0, j=nums.size()-2;\\n        int s=0; vector<int> sum;\\n        for(auto x: nums)\\n        {\\n            s+=x;\\n            sum.push_back(s);\\n        }\\n        int total = sum.back();\\n        for(j=nums.size()-2; j>i; j--)\\n        {\\n            for(i=0; i<j-1; i++)\\n            {\\n                if(sum[i]==total-sum[j]) //found i+1 = x, j = z\\n                {\\n                    int y = total - 4*sum[i] - nums[i+1] - nums[j]; \\n                    for(int k = i+1+1; k < j-1; k++)\\n                        if(nums[k] == y) return true;\\n                }\\n            }\\n            i=0;\\n        }\\n        return false;\\n    }\\n};\\n```\\n\\nThis one I thought will be faster but actually slower(29ms-45ms)... forget this one\\n```cpp\\nclass Solution {\\npublic:\\n    bool splitArray(vector<int>& nums) {\\n        int i=0, j=nums.size()-2;\\n        int s=0; vector<int> sum;\\n        unordered_map<int, vector<int>> map;\\n        for(int x=0; x<nums.size(); x++)\\n        {\\n            s+=nums[x];\\n            map[nums[x]].push_back(x);\\n            sum.push_back(s);\\n        }\\n        int total = sum.back();\\n        for(j=nums.size()-2; j>i; j--)\\n        {\\n            for(i=0; i<j-1; i++)\\n            {\\n                if(sum[i]==total-sum[j]) \\n                {\\n                    int y = total - 4*sum[i] - nums[i+1] - nums[j]; \\n                    if(map.find(y)!=map.end())\\n                    {\\n                        for(int x=0; x<map[y].size(); x++)\\n                        {\\n                            vector<int> bs = map[y];\\n                            int step = lower_bound(bs.begin(), bs.end(), i+2) - bs.begin();\\n                            if(step < j-1) return true;\\n                        }\\n                    }\\n                }\\n            }\\n            i=0;\\n        }\\n        return false;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"101495",
			"view":"523",
			"top":"3",
			"title":"5 lines simple Python",
			"vote":"2",
			"content":"The key idea is kind like divide and conquer (only twice though).\\n\\nFirst, for every middle point ```j```, we split ```nums``` into two subarray ```nums[:j]``` and ```nums[j+1:]```. In the helper function ```split```, try to remove one element from the subarray, if the the sums of two remaining left and right sub-subarray are equal, we keep the ```sum``` of sub-subarray in the set we return. Once we have any intersection between the two sets, we know we can make it. \\n\\nKeep in mind ```len(nums) > 6``` is a must since we need to split original array into four parts.\\n```\\nclass Solution(object):\\n    def splitArray(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: bool\\n        \"\"\"\\n        def split(A):\\n            total = sum(A)\\n            for i in range(1, len(A)): A[i] += A[i-1]\\n            return {A[i-1] for i in range(1, len(A)-1) if A[i-1] == total - A[i]}\\n            \\n        return len(nums) > 6 and any(split(nums[:j]) & split(nums[j+1:]) \\\\\\n                             for j in range(3, len(nums)-3))\\n```"
		},
		{
			"lc_ans_id":"101488",
			"view":"762",
			"top":"4",
			"title":"Python, Simple Explanation",
			"vote":"2",
			"content":"Let **A** be the array.  As in most problems involving querying the sum of contiguous elements of an array, let P[x] = sum(A[:x]) be the prefix sums of A, which can be found in linear time.\\n\\nThen the sums in question are P[i] = P[j] - P[i+1] = P[k] - P[j+1] = P[-1] - P[k+1].  For every j < k, P[i] = P[-1] - P[k+1] is a necessary requirement to choose i, so let's iterate over those indices first.  This gives us the advantage that since we are iterating over a sorted list of candidate indices i, we can break when i >= j.\\n\\n```\\ndef splitArray(self, A):\\n    P = [0]\\n    for x in A: P.append(P[-1] + x)\\n    \\n    N = len(A)\\n    Pinv = collections.defaultdict(list)\\n    for i, u in enumerate(P):\\n        Pinv[u].append(i)\\n        \\n    for j in xrange(1, N-1):\\n        for k in xrange(j+1, N-1):\\n            for i in Pinv[P[-1] - P[k+1]]:\\n                if i >= j: break\\n                if P[i] == P[j] - P[i+1] == P[k] - P[j+1]:\\n                    return True\\n    return False\\n```"
		},
		{
			"lc_ans_id":"101490",
			"view":"108",
			"top":"5",
			"title":"O(n2) solution",
			"vote":"1",
			"content":"```public class Solution {\\n    public boolean splitArray(int[] nums) {\\n        int n = nums.length;\\n        if(n < 7) return false;\\n        int[] sum = new int[nums.length];\\n        int res = 0;\\n        for(int i = 0; i < n; i++){\\n            res += nums[i];\\n            sum[i] = res;\\n        }\\n        \\n        for(int j = 3; j < n - 3; j++){\\n            HashSet<Integer> tmp = new HashSet<>();\\n            for(int i = 1; i < j - 1; i++){\\n                if(sum[i - 1] == sum[j - 1] - sum [i]){\\n                    tmp.add(sum[i - 1]);\\n                }\\n            }\\n            for(int k = j + 2; k < n - 1; k++){\\n                if(sum[k - 1] - sum[j] == sum[n - 1] - sum[k] && tmp.contains(sum[n - 1] - sum[k])) return true;\\n            }\\n        }\\n        \\n        return false;\\n    }\\n}\\n```\\nOne thing to notice is that there could be multiple possible sum satisfy the first half, so we need to use a set to contain all of them."
		},
		{
			"lc_ans_id":"101489",
			"view":"493",
			"top":"6",
			"title":"Lazy java 27ms O(n^2) solution explained.",
			"vote":"1",
			"content":"The point in this algorithm is to do as less work as possible. And if we already found the answer, the program should stop immediately.\\nIn the first round, I compute all possible sum for the 4th subarray.\\nIn the second round, I check if there is a possibility that the sum of 1st subarray is the same as the 4th subarray.\\nIn the last round, I check if I can found a valid j value and stop when I found it.\\nThe best case: O(N); the worst case: O(N^2).\\nWelcome to any optimization!\\n```\\npublic static boolean splitArray(int[] nums) {\\n        if(nums.length < 7) return false;\\n        int sum = nums[nums.length - 1];\\n        HashMap<Integer, LinkedList<Integer>> map = new HashMap();\\n        for(int i = nums.length - 2; i > 0; i--) {\\n        \\tif(map.containsKey(sum)) map.get(sum).add(i);\\n        \\telse {\\n        \\t\\tLinkedList<Integer> tmp = new LinkedList();\\n        \\t\\ttmp.add(i);\\n        \\t\\tmap.put(sum, tmp);\\n        \\t}\\n        \\tsum += nums[i];\\n        }\\n        sum = nums[0];\\n        for(int i = 1; i < nums.length - 5; i++) {\\n        \\tif(map.containsKey(sum)) {\\n        \\t\\tLinkedList<Integer> list = map.get(sum);\\n        \\t\\tfor(Integer k : list) {\\n        \\t\\t\\tif(k > i + 3 && checker(sum, nums, i + 1, k - 1)) return true;\\n        \\t\\t}\\n        \\t}\\n        \\tsum += nums[i];\\n        }\\n        return false;\\n    }\\n\\t\\n\\tprivate static boolean checker(int target, int[] array, int start, int end) {\\n\\t\\tint sum = 0;\\n\\t\\tfor(int i = start; i <= end; i++) sum += array[i];\\n\\t\\tint left = array[start], right = sum - array[start] - array[start + 1];\\n\\t\\tfor(int i = start + 1; i < end; i++) {\\n\\t\\t\\tif(left == right && left == target) return true;\\n\\t\\t\\telse {\\n\\t\\t\\t\\tleft += array[i];\\n\\t\\t\\t\\tright -= array[i + 1];\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn false;\\n\\t}\\n```"
		},
		{
			"lc_ans_id":"101478",
			"view":"28",
			"top":"7",
			"title":"12ms C++",
			"vote":"0",
			"content":"```\\nbool splitArray(vector<int>& nums) {\\n        unordered_map<int, vector<int>> leftSum;\\n        int leftTemp = nums.front(), rightTemp = nums.back();\\n        for(int i = 1; i < nums.size(); i++){\\n            leftSum[leftTemp].push_back(i-1);\\n            leftTemp += nums[i];\\n        }\\n        for(int i = nums.size()-2; i > 0; i--){\\n            if(leftSum.find(rightTemp) != leftSum.end()){\\n                for(int start : leftSum[rightTemp]){\\n                    if(check(nums, start + 2, i-1, rightTemp))\\n                        return true;\\n                }\\n            }\\n            rightTemp += nums[i];\\n        }\\n        return false;\\n    }\\n    \\n    bool check(vector<int>& nums, int start, int end, int prevSum){\\n        int target = start + 1, leftSum = nums[target-1], rightSum = 0;\\n        for(int i = target+1; i <= end; i++)\\n            rightSum += nums[i];\\n        \\n        while(target < end){\\n            if(leftSum == rightSum && leftSum == prevSum)\\n                return true;\\n            leftSum += nums[target];\\n            target++;\\n            rightSum -= nums[target];\\n        }\\n        \\n        return false;\\n    }\\n```"
		},
		{
			"lc_ans_id":"101479",
			"view":"47",
			"top":"8",
			"title":"The simplest idea. Beats 99%.",
			"vote":"0",
			"content":"````\\nclass Solution {\\n    public boolean splitArray(int[] nums) {\\n        int sum0 = 0;\\n        \\n        for(int i = 1; i < nums.length -5; i++){\\n            if(nums[i-1] == 0) continue;\\n            sum0 += nums[i-1];\\n            int sum1 = 0;\\n            for(int j = i + 2; j < nums.length - 3; j++){\\n                sum1 += nums[j-1];\\n                if(sum0 == sum1){\\n                    int sum2 = 0;\\n                    for(int k = j + 2; k < nums.length - 1; k++){\\n                        sum2 += nums[k-1];\\n                        if(sum2 == sum1){\\n                            int sum3 = 0;\\n                            for(int f = k+1; f < nums.length; f++){\\n                                sum3 += nums[f];\\n                            }\\n                            if(sum3 == sum2)    return true;\\n                        }\\n                    }\\n                }\\n            }\\n        }\\n        return false;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"101480",
			"view":"46",
			"top":"9",
			"title":"The simplest idea. Beats 99%.",
			"vote":"0",
			"content":"The simplest idea. Beats 99%.\\n\\nclass Solution {\\n    public boolean splitArray(int[] nums) {\\n        int sum0 = 0;\\n        \\n        for(int i = 1; i < nums.length -5; i++){\\n            if(nums[i-1] == 0) continue;\\n            sum0 += nums[i-1];\\n            int sum1 = 0;\\n            for(int j = i + 2; j < nums.length - 3; j++){\\n                sum1 += nums[j-1];\\n                if(sum0 == sum1){\\n                    int sum2 = 0;\\n                    for(int k = j + 2; k < nums.length - 1; k++){\\n                        sum2 += nums[k-1];\\n                        if(sum2 == sum1){\\n                            int sum3 = 0;\\n                            for(int f = k+1; f < nums.length; f++){\\n                                sum3 += nums[f];\\n                            }\\n                            if(sum3 == sum2)    return true;\\n                        }\\n                    }\\n                }\\n            }\\n        }\\n        return false;\\n    }\\n}"
		}
	],
	"id":"532",
	"title":"Split Array with Equal Sum",
	"content":"<p>\r\nGiven an array with n integers, you need to find if there are triplets  (i, j, k) which satisfies following conditions:\r\n<ol>\r\n<li> 0 < i, i + 1 < j, j + 1 < k < n - 1 </li>\r\n<li> Sum of subarrays (0, i - 1), (i + 1, j - 1), (j + 1, k - 1) and (k + 1, n - 1) should be equal. </li>\r\n</ol>\r\nwhere we define that subarray (L, R) represents a slice of the original array starting from the element indexed L to the element indexed R.\r\n</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,1,2,1,2,1]\r\n<b>Output:</b> True\r\n<b>Explanation:</b>\r\ni = 1, j = 3, k = 5. \r\nsum(0, i - 1) = sum(0, 0) = 1\r\nsum(i + 1, j - 1) = sum(2, 2) = 1\r\nsum(j + 1, k - 1) = sum(4, 4) = 1\r\nsum(k + 1, n - 1) = sum(6, 6) = 1\r\n</pre>\r\n</p>\r\n\r\n<b>Note:</b>\r\n<ol>\r\n<li> 1 <= n <= 2000. </li>\r\n<li> Elements in the given array will be in range [-1,000,000, 1,000,000]. </li>\r\n</ol>",
	"frequency":"46",
	"ac_num":"3569"
}