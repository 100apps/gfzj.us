{
	"difficulty":"2",
	"submit_num":"508015",
	"show_id":"16",
	"leetcode_id":"16",
	"answers":[
		{
			"lc_ans_id":"7873",
			"view":"38806",
			"top":"0",
			"title":"A n^2 Solution, Can we do better ?",
			"vote":"85",
			"content":"Here is a solution in Order(N^2). I got help from this post on \\n[stackoverflow][1] <br>\\nCan we improve this time complexity ?\\n\\n    int threeSumClosest(vector<int> &num, int target) {        \\n        vector<int> v(num.begin(), num.end()); // I didn't wanted to disturb original array.\\n        int n = 0;\\n        int ans = 0;\\n        int sum;\\n        \\n        sort(v.begin(), v.end());\\n        \\n        // If less then 3 elements then return their sum\\n        while (v.size() <= 3) {\\n            return accumulate(v.begin(), v.end(), 0);\\n        }\\n        \\n        n = v.size();\\n        \\n        /* v[0] v[1] v[2] ... v[i] .... v[j] ... v[k] ... v[n-2] v[n-1]\\n         *                    v[i]  <=  v[j]  <= v[k] always, because we sorted our array. \\n         * Now, for each number, v[i] : we look for pairs v[j] & v[k] such that \\n         * absolute value of (target - (v[i] + v[j] + v[k]) is minimised.\\n         * if the sum of the triplet is greater then the target it implies\\n         * we need to reduce our sum, so we do K = K - 1, that is we reduce\\n         * our sum by taking a smaller number.\\n         * Simillarly if sum of the triplet is less then the target then we\\n         * increase out sum by taking a larger number, i.e. J = J + 1.\\n         */\\n        ans = v[0] + v[1] + v[2];\\n        for (int i = 0; i < n-2; i++) {\\n            int j = i + 1;\\n            int k = n - 1;\\n            while (j < k) {\\n                sum = v[i] + v[j] + v[k];\\n                if (abs(target - ans) > abs(target - sum)) {\\n                    ans = sum;\\n                    if (ans == target) return ans;\\n                }\\n                (sum > target) ? k-- : j++;\\n            }\\n        }\\n        return ans;\\n    }\\n\\n<b>Edit:</b>Thanks @thr for pointing out that. I have corrected it and also renamed 'mx' by 'ans'.\\n  [1]: http://stackoverflow.com/questions/2070359/finding-three-elements-in-an-array-whose-sum-is-closest-to-an-given-number"
		},
		{
			"lc_ans_id":"7872",
			"view":"22368",
			"top":"1",
			"title":"Java solution with O(n2) for reference",
			"vote":"80",
			"content":"Similar to 3 Sum problem, use 3 pointers to point current element, next element and the last element. If the sum is less than target, it means we have to add a larger element so next element move to the next. If the sum is greater, it means we have to add a smaller element so last element move to the second last element. Keep doing this until the end. Each time compare the difference between sum and target, if it is less than minimum difference so far, then replace result with it, otherwise keep iterating.\\n\\n    public class Solution {\\n        public int threeSumClosest(int[] num, int target) {\\n            int result = num[0] + num[1] + num[num.length - 1];\\n            Arrays.sort(num);\\n            for (int i = 0; i < num.length - 2; i++) {\\n                int start = i + 1, end = num.length - 1;\\n                while (start < end) {\\n                    int sum = num[i] + num[start] + num[end];\\n                    if (sum > target) {\\n                        end--;\\n                    } else {\\n                        start++;\\n                    }\\n                    if (Math.abs(sum - target) < Math.abs(result - target)) {\\n                        result = sum;\\n                    }\\n                }\\n            }\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"7883",
			"view":"11957",
			"top":"2",
			"title":"C++ solution O(n^2) using sort",
			"vote":"63",
			"content":"Sort the vector and then no need to run *O(N^3)* algorithm as each index has a direction to move.\\n\\nThe code starts from this formation.\\n\\n    ----------------------------------------------------\\n    ^  ^                                               ^\\n    |  |                                               |\\n    |  +- second                                     third\\n    +-first\\n\\nif  *nums[first] + nums[second] + nums[third]* is smaller than the *target*, we know we have to increase the sum. so only choice is moving the second index forward.\\n\\n    ----------------------------------------------------\\n    ^    ^                                             ^\\n    |    |                                             |\\n    |    +- second                                   third\\n    +-first\\n\\n\\nif the *sum* is bigger than the *target*, we know that we need to reduce the *sum*. so only choice is moving '*third*' to backward. of course if the *sum* equals to *target*, we can immediately return the *sum*.\\n\\n    ----------------------------------------------------\\n    ^    ^                                          ^\\n    |    |                                          |\\n    |    +- second                                third\\n    +-first\\n\\n\\nwhen *second* and *third* cross, the round is done so start next round by moving '*first*' and resetting *second* and *third*.\\n\\n    ----------------------------------------------------\\n      ^    ^                                           ^\\n      |    |                                           |\\n      |    +- second                                 third\\n      +-first\\n\\nwhile doing this, collect the *closest sum* of each stage by calculating and comparing delta. Compare *abs(target-newSum)* and *abs(target-closest)*. At the end of the process the three indexes will eventually be gathered at the end of the array.\\n\\n    ----------------------------------------------------\\n                                             ^    ^    ^\\n                                             |    |    `- third\\n                                             |    +- second\\n                                             +-first\\n\\nif no exactly matching *sum* has been found so far, the value in *closest* will be the answer.\\n\\n\\n    int threeSumClosest(vector<int>& nums, int target) {\\n        if(nums.size() < 3) return 0;\\n        int closest = nums[0]+nums[1]+nums[2];\\n        sort(nums.begin(), nums.end());\\n        for(int first = 0 ; first < nums.size()-2 ; ++first) {\\n            if(first > 0 && nums[first] == nums[first-1]) continue;\\n            int second = first+1;\\n            int third = nums.size()-1;            \\n            while(second < third) {\\n                int curSum = nums[first]+nums[second]+nums[third];\\n                if(curSum == target) return curSum;\\n                if(abs(target-curSum)<abs(target-closest)) {\\n                    closest = curSum;\\n                }\\n                if(curSum > target) {\\n                    --third;\\n                } else {\\n                    ++second;\\n                }\\n            }\\n        }\\n        return closest;\\n    }"
		},
		{
			"lc_ans_id":"7871",
			"view":"7545",
			"top":"3",
			"title":"Python O(N^2) solution",
			"vote":"30",
			"content":"    class Solution:\\n        # @return an integer\\n        def threeSumClosest(self, num, target):\\n            num.sort()\\n            result = num[0] + num[1] + num[2]\\n            for i in range(len(num) - 2):\\n                j, k = i+1, len(num) - 1\\n                while j < k:\\n                    sum = num[i] + num[j] + num[k]\\n                    if sum == target:\\n                        return sum\\n                    \\n                    if abs(sum - target) < abs(result - target):\\n                        result = sum\\n                    \\n                    if sum < target:\\n                        j += 1\\n                    elif sum > target:\\n                        k -= 1\\n                \\n            return result"
		},
		{
			"lc_ans_id":"7987",
			"view":"3176",
			"top":"4",
			"title":"12 lines concise and easy understand c++ solultion",
			"vote":"15",
			"content":"    class Solution {\\n    public:\\n        int threeSumClosest(vector<int>& nums, int target) {\\n            sort(nums.begin(), nums.end());\\n            int res = nums[0] + nums[1] + nums[2];\\n            for(int i = 0; i < nums.size() - 2; i++){\\n                int j = i + 1, k = nums.size() - 1;\\n                while(j < k){\\n                    int num = nums[i] + nums[j] + nums[k];\\n                    if(abs(num - target) < abs(res - target)) res = num;\\n                    if(num < target) j++;\\n                    else k--;\\n                }\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"7906",
			"view":"2615",
			"top":"5",
			"title":"7ms and o(n^2) java solution",
			"vote":"11",
			"content":"My solution does not need compare each sum ,just need to compare possible sum ,so can save time.\\n\\n    public class Solution {\\n    public int threeSumClosest(int[] nums, int target) {\\n        Arrays.sort(nums);\\n        int closest=nums[0]+nums[1]+nums[2];\\n        int low,high;\\n        for(int i=0;i<nums.length-1;i++){\\n            low=i+1;\\n            high=nums.length-1;\\n            while(low<high){\\n                if(nums[low]+nums[high]==target-nums[i]) return target;\\n                else if(nums[low]+nums[high]>target-nums[i]){\\n                    while(low<high&&nums[low]+nums[high]>target-nums[i]) high--;\\n                    if(Math.abs(nums[i]+nums[low]+nums[high+1]-target)<Math.abs(closest-target))\\n                        closest=nums[i]+nums[low]+nums[high+1];\\n                }\\n                else{\\n                    while(low<high&&nums[low]+nums[high]<target-nums[i]) low++;\\n                    if(Math.abs(nums[i]+nums[low-1]+nums[high]-target)<Math.abs(closest-target))\\n                        closest=nums[i]+nums[low-1]+nums[high];\\n                }\\n            }\\n        }\\n        return closest;\\n    }\\n}"
		},
		{
			"lc_ans_id":"8026",
			"view":"1407",
			"top":"6",
			"title":"Python solution (two-pointer).",
			"vote":"11",
			"content":"        \\n    def threeSumClosest(self, nums, target):\\n        nums.sort()\\n        res = sum(nums[:3])\\n        for i in xrange(len(nums)):\\n            l, r = i+1, len(nums)-1\\n            while l < r:\\n                s = sum((nums[i], nums[l], nums[r]))\\n                if abs(s-target) < abs(res-target):\\n                    res = s\\n                if s < target:\\n                    l += 1\\n                elif s > target:\\n                    r -= 1\\n                else: # break early \\n                    return res\\n        return res"
		},
		{
			"lc_ans_id":"7972",
			"view":"1991",
			"top":"7",
			"title":"Share my 24-line Java code (beats 94.57% run times)",
			"vote":"9",
			"content":"    public class Solution {\\n        public int threeSumClosest(int[] nums, int target) {\\n            Arrays.sort(nums);\\n            int diff = Integer.MAX_VALUE, closest = 0;\\n            for (int k=0; k<nums.length-2; ++k) {\\n                for (int i=k+1, j=nums.length-1; i<j; ) {\\n                    int sum = nums[k] + nums[i] + nums[j];\\n                    if (sum == target) { return target; }\\n                    else if (sum > target) {\\n                        if (sum-target < diff) {\\n                            diff = sum-target;\\n                            closest = sum;\\n                        }\\n                        --j;\\n                    } else {\\n                        if (target-sum < diff) {\\n                            diff = target-sum;\\n                            closest = sum;\\n                        }\\n                        ++i;\\n                    }\\n                }\\n            }\\n            return closest;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"7963",
			"view":"906",
			"top":"8",
			"title":"\\u3010Python\\u3011Beating 95% solution with two pointers\\u3010O(N ^ 2)\\u3011",
			"vote":"6",
			"content":"Same algorithm as 3sum problem, where we sort `nums`, then use two pointers to check all the possible combinations, while fixing one element. \\n\\nIn this problem, we just need to add a new variable `diff` to track the difference between target and current best result. In addition, we move the pointers in terms of `diff` (be careful with the sign)\\n\\n    \\n    def threeSumClosest(self, nums, target):\\n        result, diff = 0, sys.maxint\\n        nums.sort()\\n        \\n        for i in xrange(len(nums) - 2):\\n            if i > 0 and nums[i] == nums[i - 1]:\\n                continue\\n            \\n            left, right = i + 1, len(nums) - 1\\n            \\n            while left < right:\\n                total = nums[i] + nums[left] + nums[right]\\n                hold_diff = abs (total - target)\\n                \\n                if not hold_diff:\\n                    return total\\n                    \\n                if hold_diff  < diff:\\n                    result = total\\n                    diff = hold_diff\\n                    \\n                if total < target:\\n                    left += 1\\n                \\n                else:\\n                    right -= 1\\n                    \\n        return result"
		},
		{
			"lc_ans_id":"7915",
			"view":"1498",
			"top":"9",
			"title":"Sharing my Java Optimized solution 5ms, beats 99.9%",
			"vote":"5",
			"content":"It is just some optimized work after basic 3Sum structure.\\n\\n    public int threeSumClosest(int[] nums, int target) {\\n        if(nums.length<3) return 0;\\n        Arrays.sort(nums);\\n        int min = Integer.MAX_VALUE;int result =Integer.MAX_VALUE;\\n        for(int i=0;i<nums.length-2;i++)\\n        {\\n            if(3*nums[i]>target) \\n            {\\n                int sum3 = nums[i]+nums[i+1]+nums[i+2];\\n                if(Math.abs(sum3-target)<min)  return sum3;\\n                //break;           //should break here but seems slower after adding it\\n            }\\n            int left = i+1; \\n            int right = nums.length-1;\\n            int sum = target - nums[i];\\n            if(2*nums[right]<sum) {\\n                int sum2 = nums[i]+nums[right]+nums[right-1];\\n                 if(Math.abs(sum2-target)<min){\\n                     min = Math.abs(target-sum2);\\n                     result = sum2;\\n                 }\\n               continue;\\n            }\\n            while(left<right)\\n            {\\n                int temp = nums[i] + nums[left]+nums[right];\\n                if(temp==target) return target;\\n                if(2*nums[left]>sum) \\n                {\\n                  int sumsum = nums[i]+nums[left]+nums[left+1];\\n                  if(Math.abs(sumsum-target)<min){\\n                      min = Math.abs(target-sumsum);\\n                      result = sumsum;\\n                    }\\n                   break;\\n                }\\n                else if(Math.abs(target-temp)<min)\\n                {\\n                    min = Math.abs(target-temp);\\n                    result = temp;\\n                }\\n                if(temp<target) \\n                   left++;\\n                else right --;\\n            }\\n        }\\n        return result;\\n        }"
		}
	],
	"id":"16",
	"title":"3Sum Closest",
	"content":"<p>Given an array <i>S</i> of <i>n</i> integers, find three integers in <i>S</i> such that the sum is closest to a given number, target. Return the sum of the three integers. You may assume that each input would have exactly one solution.</p>\r\n\r\n<pre>\r\n    For example, given array S = {-1 2 1 -4}, and target = 1.\r\n\r\n    The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).\r\n</pre>",
	"frequency":"495",
	"ac_num":"160152"
}