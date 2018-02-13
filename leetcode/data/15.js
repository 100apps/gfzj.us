{
	"difficulty":"2",
	"submit_num":"1315495",
	"show_id":"15",
	"leetcode_id":"15",
	"answers":[
		{
			"lc_ans_id":"7380",
			"view":"118523",
			"top":"0",
			"title":"Concise O(N^2) Java solution",
			"vote":"338",
			"content":"Hi guys!\\n\\nThe idea is to sort an input array and then run through all indices of a possible first element of a triplet. For each possible first element we make a standard bi-directional 2Sum sweep of the remaining part of the array. Also we want to skip equal elements to avoid duplicates in the answer without making a set or smth like that.   \\n\\n    public List<List<Integer>> threeSum(int[] num) {\\n        Arrays.sort(num);\\n        List<List<Integer>> res = new LinkedList<>(); \\n        for (int i = 0; i < num.length-2; i++) {\\n            if (i == 0 || (i > 0 && num[i] != num[i-1])) {\\n                int lo = i+1, hi = num.length-1, sum = 0 - num[i];\\n                while (lo < hi) {\\n                    if (num[lo] + num[hi] == sum) {\\n                        res.add(Arrays.asList(num[i], num[lo], num[hi]));\\n                        while (lo < hi && num[lo] == num[lo+1]) lo++;\\n                        while (lo < hi && num[hi] == num[hi-1]) hi--;\\n                        lo++; hi--;\\n                    } else if (num[lo] + num[hi] < sum) lo++;\\n                    else hi--;\\n               }\\n            }\\n        }\\n        return res;\\n    }\\n\\nHave a nice coding!"
		},
		{
			"lc_ans_id":"7402",
			"view":"50619",
			"top":"1",
			"title":"Share my AC C++ solution, around 50ms, O(N*N), with explanation and comments",
			"vote":"165",
			"content":"the key idea is the same as the `TwoSum` problem. When we fix the `1st` number, the `2nd` and `3rd` number can be found following the same reasoning as `TwoSum`. \\n\\nThe only difference is that, the `TwoSum` problem of LEETCODE has a unique solution. However, in `ThreeSum`, we have multiple duplicate solutions that can be found. Most of the OLE errors happened here because you could've ended up with a solution with so many duplicates.\\n\\nThe naive solution for the duplicates will be using the STL methods like below :\\n\\n\\n    std::sort(res.begin(), res.end());\\n    res.erase(unique(res.begin(), res.end()), res.end());\\n\\n\\nBut according to my submissions, this way will cause you double your time consuming almostly.\\n\\nA better approach is that, to jump over the number which has been scanned, no matter it is part of some solution or not.\\n\\nIf the three numbers formed a solution, we can safely ignore all the duplicates of them.\\n\\nWe can do this to all the three numbers such that we can remove the duplicates. \\n\\nHere's my AC C++ Code:\\n\\n\\n    vector<vector<int> > threeSum(vector<int> &num) {\\n        \\n        vector<vector<int> > res;\\n\\n        std::sort(num.begin(), num.end());\\n\\n        for (int i = 0; i < num.size(); i++) {\\n            \\n            int target = -num[i];\\n            int front = i + 1;\\n            int back = num.size() - 1;\\n\\n            while (front < back) {\\n\\n                int sum = num[front] + num[back];\\n                \\n                // Finding answer which start from number num[i]\\n                if (sum < target)\\n                    front++;\\n\\n                else if (sum > target)\\n                    back--;\\n\\n                else {\\n                    vector<int> triplet(3, 0);\\n                    triplet[0] = num[i];\\n                    triplet[1] = num[front];\\n                    triplet[2] = num[back];\\n                    res.push_back(triplet);\\n                    \\n                    // Processing duplicates of Number 2\\n                    // Rolling the front pointer to the next different number forwards\\n                    while (front < back && num[front] == triplet[1]) front++;\\n\\n                    // Processing duplicates of Number 3\\n                    // Rolling the back pointer to the next different number backwards\\n                    while (front < back && num[back] == triplet[2]) rear--;\\n                }\\n                \\n            }\\n\\n            // Processing duplicates of Number 1\\n            while (i + 1 < num.size() && num[i + 1] == num[i]) \\n                i++;\\n\\n        }\\n        \\n        return res;\\n        \\n    }"
		},
		{
			"lc_ans_id":"7399",
			"view":"47449",
			"top":"2",
			"title":"Easiest Java Solution",
			"vote":"98",
			"content":"Sort the array, iterate through the list, and use another two pointers to approach the target. \\n  \\n    public List<List<Integer>> threeSum(int[] nums) {\\n        List<List<Integer>> res = new ArrayList<>();\\n        Arrays.sort(nums);\\n        for (int i = 0; i + 2 < nums.length; i++) {\\n            if (i > 0 && nums[i] == nums[i - 1]) {              // skip same result\\n                continue;\\n            }\\n            int j = i + 1, k = nums.length - 1;  \\n            int target = -nums[i];\\n            while (j < k) {\\n                if (nums[j] + nums[k] == target) {\\n                    res.add(Arrays.asList(nums[i], nums[j], nums[k]));\\n                    j++;\\n                    k--;\\n                    while (j < k && nums[j] == nums[j - 1]) j++;  // skip same result\\n                    while (j < k && nums[k] == nums[k + 1]) k--;  // skip same result\\n                } else if (nums[j] + nums[k] > target) {\\n                    k--;\\n                } else {\\n                    j++;\\n                }\\n            }\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"7392",
			"view":"33585",
			"top":"3",
			"title":"Python easy to understand solution (O(n*n) time).",
			"vote":"59",
			"content":"        \\n    def threeSum(self, nums):\\n        res = []\\n        nums.sort()\\n        for i in xrange(len(nums)-2):\\n            if i > 0 and nums[i] == nums[i-1]:\\n                continue\\n            l, r = i+1, len(nums)-1\\n            while l < r:\\n                s = nums[i] + nums[l] + nums[r]\\n                if s < 0:\\n                    l +=1 \\n                elif s > 0:\\n                    r -= 1\\n                else:\\n                    res.append((nums[i], nums[l], nums[r]))\\n                    while l < r and nums[l] == nums[l+1]:\\n                        l += 1\\n                    while l < r and nums[r] == nums[r-1]:\\n                        r -= 1\\n                    l += 1; r -= 1\\n        return res"
		},
		{
			"lc_ans_id":"7373",
			"view":"22372",
			"top":"4",
			"title":"Share my simple java solution",
			"vote":"45",
			"content":"    public class Solution {\\n        public List<List<Integer>> threeSum(int[] nums) {\\n            List<List<Integer>> result = new ArrayList<>();\\n            if(nums.length < 3) return result;\\n            Arrays.sort(nums);\\n            int i = 0;\\n            while(i < nums.length - 2) {\\n                if(nums[i] > 0) break;\\n                int j = i + 1;\\n                int k = nums.length - 1;\\n                while(j < k) {\\n                    int sum = nums[i] + nums[j] + nums[k];\\n                    if(sum == 0) result.add(Arrays.asList(nums[i], nums[j], nums[k]));\\n                    if(sum <= 0) while(nums[j] == nums[++j] && j < k);\\n                    if(sum >= 0) while(nums[k--] == nums[k] && j < k);\\n                }\\n                while(nums[i] == nums[++i] && i < nums.length - 2);\\n            }\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"7585",
			"view":"7643",
			"top":"5",
			"title":"Simple O(n^2) two pointers Java solution",
			"vote":"28",
			"content":"**Runtime = O(n^2); Space = O(1)**\\n\\n    public List<List<Integer>> threeSum(int[] A) {\\n    \\tList<List<Integer>>res = new ArrayList<List<Integer>>();\\n    \\tif (A == null || A.length == 0)\\n    \\t\\treturn res;\\n    \\tArrays.sort(A);\\n    \\tfor (int i = 0; i < A.length; i++) {\\n    \\t\\tif (i - 1 >= 0 && A[i] == A[i - 1]) continue;// Skip equal elements to avoid duplicates\\n    \\t\\t  \\n    \\t\\tint left = i + 1, right = A.length - 1; \\n    \\t\\twhile (left < right) {// Two Pointers\\n    \\t\\t\\tint sum = A[i] + A[left] + A[right];\\n    \\t\\t\\tif (sum == 0) { \\n    \\t\\t\\t\\tres.add(Arrays.asList(A[i], A[left], A[right]));\\n    \\t\\t\\t\\twhile (left + 1 < right && A[left] == A[left+1])// Skip equal elements to avoid duplicates\\n    \\t\\t\\t\\t\\tleft++;\\n    \\t\\t\\t\\twhile (right -1 > left && A[right] == A[right-1])// Skip equal elements to avoid duplicates\\n    \\t\\t\\t\\t\\tright--;\\n    \\t\\t\\t\\tleft++; \\n    \\t\\t\\t\\tright--;\\n    \\t\\t\\t} else if (sum < 0) { \\n    \\t\\t\\t\\tleft++;\\n    \\t\\t\\t} else {\\n    \\t\\t\\t\\tright--;\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t}\\n    \\treturn res;\\n    }"
		},
		{
			"lc_ans_id":"7514",
			"view":"7410",
			"top":"6",
			"title":"~20 lines. 68ms. c++ solution. Used two pointers similar to 2sum",
			"vote":"27",
			"content":"    vector<vector<int> > threeSum(vector<int>& nums) {\\n        if(nums.size() <=2) return {};\\n        vector<vector<int> > rtn;\\n        sort(nums.begin(), nums.end());\\n        \\n        for(int i =0; i < nums.size();){\\n            int start = i+1, end = nums.size()-1;\\n    \\n            while(start < end){\\n                if(nums[i]+nums[start]+nums[end] == 0){\\n                    rtn.push_back({nums[i],nums[start],nums[end]});\\n                    start++;\\n                    end--;\\n                    while((start < end) && nums[start] == nums[start-1]) start++;\\n                    while((start < end) && nums[end] == nums[end+1]) end--;\\n    \\n                }else if(nums[i]+nums[start]+nums[end]<0){\\n                    start++;\\n                    while((start < end) && nums[start] == nums[start-1]) start++;\\n                }else{\\n                    end--;\\n                    while((start < end) && nums[end] == nums[end+1]) end--;\\n                }\\n            }\\n            \\n            i++;\\n            while((i < nums.size()) && nums[i] == nums[i-1])\\n                i++;\\n            \\n        }\\n        return rtn;\\n    }\\n\\nThanks to my friend Yang Li inspired me of using two pointers"
		},
		{
			"lc_ans_id":"7631",
			"view":"4243",
			"top":"7",
			"title":"Simple Java Solution - Without using Hash/Set",
			"vote":"22",
			"content":"    public List<List<Integer>> threeSum(int[] nums) {\\n        Arrays.sort(nums);\\n        List<List<Integer>> list = new ArrayList<List<Integer>>();\\n        for(int i = 0; i < nums.length-2; i++) {\\n            if(i > 0 && (nums[i] == nums[i-1])) continue; // avoid duplicates\\n            for(int j = i+1, k = nums.length-1; j<k;) {\\n                if(nums[i] + nums[j] + nums[k] == 0) {\\n                    list.add(Arrays.asList(nums[i],nums[j],nums[k]));\\n                    j++;k--;\\n                    while((j < k) && (nums[j] == nums[j-1]))j++;// avoid duplicates\\n                    while((j < k) && (nums[k] == nums[k+1]))k--;// avoid duplicates\\n                }else if(nums[i] + nums[j] + nums[k] > 0) k--;\\n                else j++;\\n            }\\n        }\\n        return list;\\n    }"
		},
		{
			"lc_ans_id":"7438",
			"view":"3234",
			"top":"8",
			"title":"C++ two-pointes solution (easy way to handle duplicaiton).",
			"vote":"21",
			"content":"        \\n    vector<vector<int>> threeSum(vector<int>& nums) {\\n        sort(nums.begin(), nums.end());\\n        vector<vector<int>> res;\\n        for (unsigned int i=0; i<nums.size(); i++) {\\n            if ((i>0) && (nums[i]==nums[i-1]))\\n                continue;\\n            int l = i+1, r = nums.size()-1;\\n            while (l<r) {\\n                int s = nums[i]+nums[l]+nums[r];\\n                if (s>0) r--;\\n                else if (s<0) l++;\\n                else {\\n                    res.push_back(vector<int> {nums[i], nums[l], nums[r]});\\n                    while (nums[l]==nums[l+1]) l++;\\n                    while (nums[r]==nums[r-1]) r--;\\n                    l++; r--;\\n                }\\n            }\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"7393",
			"view":"4022",
			"top":"9",
			"title":"Straight forward Python AC O(n^2) solution with decent explanation",
			"vote":"14",
			"content":"    class Solution:\\n        # @param {integer[]} nums\\n        # @return {integer[][]}\\n        def threeSum(self, nums):\\n            if len(nums) <3: # deal with special input\\n                return []\\n            elif len(nums) == 3:\\n                if sum(nums) == 0:\\n                    return [sorted(nums)]\\n    \\n    \\n            nums = sorted(nums) # sorted, O(nlgn)\\n            ans = []\\n    \\n            for i in range(len(nums) -2):\\n                j = i+1\\n                k = len(nums) -1 # hence i < j < k\\n    \\n                while j<k: # if not cross line\\n                    temp_sum = nums[i] + nums[j] + nums[k]\\n                    if temp_sum == 0:\\n                        ans.append((nums[i], nums[j], nums[k]))\\n    \\n                    if temp_sum > 0: # which means we need smaller sum, move k backward, remember we sort the array\\n                        k -= 1\\n                    else:\\n                        j += 1\\n    \\n            return list(set(tuple(ans))) # I bet this is not the best way to eliminate duplicate solutions"
		}
	],
	"id":"15",
	"title":"3Sum",
	"content":"<p>Given an array <i>S</i> of <i>n</i> integers, are there elements <i>a</i>, <i>b</i>, <i>c</i> in <i>S</i> such that <i>a</i> + <i>b</i> + <i>c</i> = 0? Find all unique triplets in the array which gives the sum of zero.</p>\r\n\r\n<p><b>Note:</b> The solution set must not contain duplicate triplets.</p>\r\n\r\n<pre>\r\nFor example, given array S = [-1, 0, 1, 2, -1, -4],\r\n\r\nA solution set is:\r\n[\r\n  [-1, 0, 1],\r\n  [-1, -1, 2]\r\n]\r\n</pre>",
	"frequency":"570",
	"ac_num":"287011"
}