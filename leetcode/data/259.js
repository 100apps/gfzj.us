{
	"difficulty":"2",
	"submit_num":"78993",
	"show_id":"259",
	"leetcode_id":"259",
	"answers":[
		{
			"lc_ans_id":"68817",
			"view":"15695",
			"top":"0",
			"title":"Simple and easy-understanding O(n^2) JAVA solution",
			"vote":"98",
			"content":"    public class Solution {\\n        int count;\\n        \\n        public int threeSumSmaller(int[] nums, int target) {\\n            count = 0;\\n            Arrays.sort(nums);\\n            int len = nums.length;\\n        \\n            for(int i=0; i<len-2; i++) {\\n                int left = i+1, right = len-1;\\n                while(left < right) {\\n                    if(nums[i] + nums[left] + nums[right] < target) {\\n                        count += right-left;\\n                        left++;\\n                    } else {\\n                        right--;\\n                    }\\n                }\\n            }\\n            \\n            return count;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"68820",
			"view":"5293",
			"top":"1",
			"title":"Accepted and Simple Java O(n^2) solution with detailed explanation",
			"vote":"60",
			"content":"We sort the array first. Then, for each element, we use the two pointer approach to find the number of triplets that meet the requirements. \\n\\nLet me illustrate how the two pointer technique works with an example:\\n\\n    target = 2\\n\\n      i  lo    hi\\n    [-2, 0, 1, 3]\\n\\nWe use a for loop (index i) to iterate through each element of the array. For each i, we create two pointers, lo and hi, where lo is initialized as the next element of i, and hi is initialized at the end of the array.  If we know that nums[i] + nums[lo] + nums[hi] < target, then we know that since the array is sorted, we can replace hi with any element from lo+1 to nums.length-1, and the requirements will still be met. Just like in the example above, we know that since -2 + 0 + 3 < 2, we can replace hi (3) with 1, and it would still work. Therefore, we can just add hi - lo to the triplet count.\\n\\n\\n    public class Solution {\\n        public int threeSumSmaller(int[] nums, int target) {\\n            int result = 0;\\n            Arrays.sort(nums);\\n            for(int i = 0; i <= nums.length-3; i++) {\\n                int lo = i+1;\\n                int hi = nums.length-1;\\n                while(lo < hi) {\\n                    if(nums[i] + nums[lo] + nums[hi] < target) {\\n                        result += hi - lo;\\n                        lo++;\\n                    } else {\\n                        hi--;\\n                    }\\n                }\\n            }\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"68818",
			"view":"4070",
			"top":"2",
			"title":"11 lines O(n^2) Python",
			"vote":"38",
			"content":"After sorting, if `i, j, k` is a valid triple, then `i, j-1, k`, ..., `i, i+1, k` are also valid triples. No need to count them one by one.\\n\\n    def threeSumSmaller(self, nums, target):\\n        nums.sort()\\n        count = 0\\n        for k in range(len(nums)):\\n            i, j = 0, k - 1\\n            while i < j:\\n                if nums[i] + nums[j] + nums[k] < target:\\n                    count += j - i\\n                    i += 1\\n                else:\\n                    j -= 1\\n        return count"
		},
		{
			"lc_ans_id":"68819",
			"view":"1962",
			"top":"3",
			"title":"*Java* straightforward O(n^2) solution with explanations",
			"vote":"13",
			"content":"Similar to 3-sum problem, we sort the array first. Again, similar to 3-sum problem, we use two pointers (`lo` and `hi`) to check if the sum satisfies the condition. The only trick here is that if we found out \\n   \\n    nums[i] + nums[lo] + nums[hi] < target\\n\\nthen for all `hi` in (lo, hi] satisfy the condition. That's why we have\\n\\n    count += hi-lo;\\n\\nin the code.\\n\\nCode in Java:\\n\\n\\n    public class Solution {\\n    public int threeSumSmaller(int[] nums, int target) {\\n        int L = nums.length;\\n        Arrays.sort(nums);\\n        int count = 0;\\n        for(int i=0; i<L-2; i++) {\\n    \\t\\tint lo = i+1;\\n    \\t\\tint hi = L-1;\\n    \\t\\twhile(lo<hi) {\\n    \\t\\t\\tif(nums[i] + nums[lo] + nums[hi] < target) {\\n    \\t\\t\\t\\tcount += hi-lo;\\n    \\t\\t\\t\\tlo++;\\n    \\t\\t\\t}\\n    \\t\\t\\telse\\n        \\t\\t\\thi--;\\n    \\t\\t}\\n        }\\n        return count;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"68871",
			"view":"2569",
			"top":"4",
			"title":"O(n^2) c++ solution",
			"vote":"13",
			"content":"    class Solution {\\n    public:\\n        int threeSumSmaller(vector<int>& nums, int target) {\\n            if(nums.size()<3)return 0;\\n            sort(nums.begin(),nums.end());\\n            int count=0;\\n            for(int i=0;i<nums.size()-2;++i){\\n                if(nums[i]+nums[i+1]+nums[i+2]>=target)break;\\n                int j=i+1,k=nums.size()-1;\\n                while(j<k){\\n                    while(j<k && nums[i]+nums[j]+nums[k]>=target)k--;\\n                    count+=k-j;\\n                    j++;\\n                }\\n            }\\n            return count;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"68823",
			"view":"908",
			"top":"5",
			"title":"Python beats 98%",
			"vote":"9",
			"content":"    class Solution(object):\\n    def threeSumSmaller(self, nums, target):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type target: int\\n        :rtype: int\\n        \"\"\"\\n        nums.sort()\\n        res = 0\\n        for i in xrange(0, len(nums) - 2):\\n            if 3*nums[i] >= target:\\n                return res\\n            start = i + 1\\n            end = len(nums) - 1\\n            while start < end:\\n                # print nums[i], nums[start], nums[end]\\n                if nums[i] + nums[start] + nums[end] < target:\\n                    res += end - start\\n                    start += 1\\n                else:\\n                    end -= 1\\n                \\n        return res\\n\\nSince the array is sorted, the lower bound of 3sum will be `3*nums[i]`. If `3*nums[i]` is not less than target, then the rest of them cannot meet the requirement too."
		},
		{
			"lc_ans_id":"68881",
			"view":"592",
			"top":"6",
			"title":"Python solution with comments.",
			"vote":"8",
			"content":"        \\n    # O(n*n) time\\n    def threeSumSmaller(self, nums, target):\\n        count = 0\\n        nums.sort()\\n        for i in xrange(len(nums)):\\n            j, k = i+1, len(nums)-1\\n            while j < k:\\n                s = nums[i] + nums[j] + nums[k]\\n                if s < target:\\n                    # if (i,j,k) works, then (i,j,k), (i,j,k-1),..., \\n                    # (i,j,j+1) all work, totally (k-j) triplets\\n                    count += k-j\\n                    j += 1\\n                else:\\n                    k -= 1\\n        return count"
		},
		{
			"lc_ans_id":"68869",
			"view":"472",
			"top":"7",
			"title":"Concise python solution with pruning",
			"vote":"4",
			"content":"    def threeSumSmaller(self, nums, target):\\n        ans = 0\\n        nums = sorted(nums)\\n        for i in xrange(len(nums)-2):\\n            prev_ans = ans                 # for pruning\\n            j,k = i+1, len(nums)-1\\n            while j<k:\\n                if nums[i] + nums[j] + nums[k] < target:\\n                    ans += (k-j)\\n                    j += 1\\n                else:\\n                    k -= 1\\n            if prev_ans == ans:\\n                break                   #if the ans doesn't change, then larger i won't change ans either\\n        return ans"
		},
		{
			"lc_ans_id":"68856",
			"view":"618",
			"top":"8",
			"title":"My O(n^2) c++ solution",
			"vote":"3",
			"content":"    class Solution {\\n    public:\\n        int threeSumSmaller(vector<int>& nums, int target) {\\n            sort(nums.begin(),nums.end());\\n            if(nums.size()<3)\\n            return 0;\\n            int start = 0, end = nums.size()-1;\\n            int count = 0;\\n            while(start<end){\\n                int a = nums[start];\\n                int left = start+1, right = end;\\n                while(left<right){\\n                    int b = nums[left], c = nums[right];\\n                    if(a+b+c >= target){\\n                        right--;\\n                    }\\n                    else if(a+b+c < target){\\n                        count = count + right - left;\\n                        left++;\\n                    }\\n                }\\n                start++;\\n            }\\n            return count;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"68850",
			"view":"1087",
			"top":"9",
			"title":"JAVA O(n^2) solution beats 95% - easy to understand",
			"vote":"3",
			"content":"public class Solution {\\n    \\n    public int threeSumSmaller(int[] nums, int target) {\\n        if(nums.length < 3){return 0;}\\n        int count = 0;\\n        Arrays.sort(nums);\\n        for(int i = 0; i < nums.length-2; i++){\\n            if(nums[i]*3 >= target){break;}\\n            count += find(nums, target-nums[i], i+1, nums.length-1);\\n        }\\n        return count;\\n    }\\n    \\n    //find number of pair that sum up smaller than target from given part of array\\n    public int find(int[] nums, int target, int start, int end){\\n        int count = 0;\\n        while(start < end){\\n            if(nums[start] + nums[end] >= target){\\n                end--;\\n            }else{\\n                count += end-start;\\n                start++;\\n            }\\n        }\\n        return count;\\n    }\\n    \\n    \\n}"
		}
	],
	"id":"259",
	"title":"3Sum Smaller",
	"content":"<p>Given an array of <i>n</i> integers <i>nums</i> and a <i>target</i>, find the number of index triplets <code>i, j, k</code> with <code>0 <= i < j < k < n</code> that satisfy the condition <code>nums[i] + nums[j] + nums[k] < target</code>.</p>\r\n\r\n<p>For example, given <i>nums</i> = <code>[-2, 0, 1, 3]</code>, and <i>target</i> = 2.</p>\r\n\r\n<p>Return 2. Because there are two triplets which sums are less than 2:</p>\r\n<pre>\r\n[-2, 0, 1]\r\n[-2, 0, 3]\r\n</pre>\r\n\r\n<p><b>Follow up:</b><br>\r\nCould you solve it in <i>O</i>(<i>n</i><sup>2</sup>) runtime?\r\n</p>",
	"frequency":"190",
	"ac_num":"33139"
}