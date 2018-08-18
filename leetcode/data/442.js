{
	"difficulty":"1",
	"submit_num":"146517",
	"show_id":"448",
	"leetcode_id":"448",
	"answers":[
		{
			"lc_ans_id":"92956",
			"view":"50509",
			"top":"0",
			"title":"Java accepted simple solution",
			"vote":"170",
			"content":"The basic idea is that we iterate through the input array and mark elements as negative using ```nums[nums[i] -1] = -nums[nums[i]-1]```. In this way all the numbers that we have seen will be marked as negative. In the second iteration, if a value is not marked as negative, it implies we have never seen that index before, so just add it to the return list.\\n\\n```\\n    public List<Integer> findDisappearedNumbers(int[] nums) {\\n        List<Integer> ret = new ArrayList<Integer>();\\n        \\n        for(int i = 0; i < nums.length; i++) {\\n            int val = Math.abs(nums[i]) - 1;\\n            if(nums[val] > 0) {\\n                nums[val] = -nums[val];\\n            }\\n        }\\n        \\n        for(int i = 0; i < nums.length; i++) {\\n            if(nums[i] > 0) {\\n                ret.add(i+1);\\n            }\\n        }\\n        return ret;\\n    }\\n```"
		},
		{
			"lc_ans_id":"92980",
			"view":"22547",
			"top":"1",
			"title":"5-line Java Easy-understanding",
			"vote":"48",
			"content":"```\\npublic List<Integer> findDisappearedNumbers(int[] nums) {\\n        List<Integer> res = new ArrayList<>();\\n        int n = nums.length;\\n        for (int i = 0; i < nums.length; i ++) nums[(nums[i]-1) % n] += n;\\n        for (int i = 0; i < nums.length; i ++) if (nums[i] <= n) res.add(i+1);\\n        return res;\\n    }\\n````"
		},
		{
			"lc_ans_id":"92958",
			"view":"15978",
			"top":"2",
			"title":"c++ solution O(1) space",
			"vote":"35",
			"content":"The idea is very similar to problem 442. Find All Duplicates in an Array: https://leetcode.com/problems/find-all-duplicates-in-an-array/.\\n\\nFirst iteration to negate values at position whose equal to values appear in array. Second iteration to collect all position whose value is positive, which are the missing values. Complexity is O(n) Time and O(1) space.\\n```\\nclass Solution {\\npublic:\\n    vector<int> findDisappearedNumbers(vector<int>& nums) {\\n        int len = nums.size();\\n        for(int i=0; i<len; i++) {\\n            int m = abs(nums[i])-1; // index start from 0\\n            nums[m] = nums[m]>0 ? -nums[m] : nums[m];\\n        }\\n        vector<int> res;\\n        for(int i = 0; i<len; i++) {\\n            if(nums[i] > 0) res.push_back(i+1);\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"92955",
			"view":"13902",
			"top":"3",
			"title":"Python 4 lines with short explanation",
			"vote":"33",
			"content":"For each number i in nums,\\nwe mark the number that i points as negative.\\nThen we filter the list, get all the indexes\\nwho points to a positive number.\\nSince those indexes are not visited.\\n\\n```\\nclass Solution(object):\\n    def findDisappearedNumbers(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        # For each number i in nums,\\n        # we mark the number that i points as negative.\\n        # Then we filter the list, get all the indexes\\n        # who points to a positive number\\n        for i in xrange(len(nums)):\\n            index = abs(nums[i]) - 1\\n            nums[index] = - abs(nums[index])\\n\\n        return [i + 1 for i in range(len(nums)) if nums[i] > 0]\\n\\n```"
		},
		{
			"lc_ans_id":"92957",
			"view":"13466",
			"top":"4",
			"title":"2ms O(n) In-Space Java",
			"vote":"26",
			"content":"Think we surely have to negate anytime we are given an array with values from 1 to the length of array. If anyone has a better idea, will be happy to hear.\\n\\nThe steps followed in this is:\\n1. Negate each number while traversing\\n2. Run again and find the index that is not negated. \\n\\n``` public List<Integer> findDisappearedNumbers(int[] nums) {\\n        List<Integer> result = new ArrayList<Integer>();\\n        for( int i=0;i< nums.length; i++){\\n            int index = nums[i];\\n            if(nums[Math.abs(index)-1] > 0){\\n                nums[Math.abs(index)-1]= -nums[Math.abs(index)-1];\\n            }\\n        }\\n        \\n        for(int j =1 ;j <= nums.length ; j++){\\n            if(nums[j-1] > 0){\\n                result.add(j);\\n            }\\n        }\\n        return result;\\n        \\n    }"
		},
		{
			"lc_ans_id":"92954",
			"view":"2852",
			"top":"5",
			"title":"Python One-liner",
			"vote":"19",
			"content":"```\\ndef findDisappearedNumbers(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        return list(set(range(1, len(nums)+1)) - set(nums))\\n```"
		},
		{
			"lc_ans_id":"93007",
			"view":"4375",
			"top":"6",
			"title":"Simple Java In-place sort solution",
			"vote":"18",
			"content":"The idea is simple, if nums[i] != i + 1 and nums[i] != nums[nums[i] - 1], then we swap nums[i] with nums[nums[i] - 1], for example, nums[0] = 4 and nums[3] = 7, then we swap nums[0] with nums[3]. So In the end the array will be sorted and if nums[i] != i + 1, then i + 1 is missing.\\nThe example run as follows\\n```\\n[4,3,2,7,8,2,3,1]\\n[7,3,2,4,8,2,3,1]\\n[3,3,2,4,8,2,7,1]\\n[2,3,3,4,8,2,7,1]\\n[3,2,3,4,8,2,7,1]\\n[3,2,3,4,1,2,7,8]\\n[1,2,3,4,3,2,7,8]\\n```\\n\\nSince every swap we put at least one number to its correct position, the time is O(n)\\n\\n```java\\npublic class Solution {\\n    public List<Integer> findDisappearedNumbers(int[] nums) {\\n        for (int i = 0; i < nums.length; i++) {\\n            while (nums[i] != i + 1 && nums[i] != nums[nums[i] - 1]) {\\n                int tmp = nums[i];\\n                nums[i] = nums[tmp - 1];\\n                nums[tmp - 1] = tmp;\\n            }\\n        }\\n        List<Integer> res = new ArrayList<Integer>();\\n        for (int i = 0; i < nums.length; i++) {\\n            if (nums[i] != i + 1) {\\n                res.add(i + 1);\\n            }\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"93098",
			"view":"954",
			"top":"7",
			"title":"Python solution without using abs()",
			"vote":"6",
			"content":"Basically the same idea a lot of previous solutions implement. I was thinking whether we could get rid of the abs operation around the index to make the code faster. I exploited the fact that each repeating elements don't appear more than twice so I set the increment to 0.4 as to maintain the value of the index when being floored.\\n\\nThe funny thing is the code actually ran slower LOL. However just want to share with you guys my idea.\\n```\\nclass Solution(object):\\n    def findDisappearedNumbers(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        for v in nums:\\n            index = int(v) - 1\\n            nums[index] += 0.4\\n        return [i+1 for i in xrange(len(nums)) if nums[i] == int(nums[i])]\\n```"
		},
		{
			"lc_ans_id":"93097",
			"view":"2510",
			"top":"8",
			"title":"Why only once or twice?",
			"vote":"6",
			"content":"Does anyone have an idea why elements appear only once or twice? At least the common *\"mark by negating\"* solution also works when elements appear more often. Is there a better solution that takes advantage of the fact that elements don't appear more than twice?\\n\\n@yuhaowang001 ?"
		},
		{
			"lc_ans_id":"92959",
			"view":"1165",
			"top":"9",
			"title":"C Solution (O(n) and no additional space)",
			"vote":"5",
			"content":"```\\nint* findDisappearedNumbers(int* nums, int numsSize, int* returnSize) {\\n    int* histogram = (int*) malloc(sizeof(int) * (numsSize + 1)); \\n    memset(histogram, 0, sizeof(int) * numsSize);\\n\\n    for (int index = 0; index < numsSize; index++) {\\n        histogram[nums[index]]++;\\n    }\\n\\n    histogram[0] = 1;\\n    for (int index = 1; index <= numsSize; index++) {\\n        if (histogram[index] == 0) {\\n            histogram[histogram[0]] = index;\\n            histogram[0]++;\\n        }\\n    }\\n    *returnSize = histogram[0] - 1;\\n    return &histogram[1];\\n}\\n```\\nKeeping a histogram array, and later traversing the histogram to return elements with 0 values allows us to solve this problem with O(n) complexity. Index 0 of the histogram was used to store the number of missing numbers."
		}
	],
	"id":"442",
	"title":"Find All Numbers Disappeared in an Array",
	"content":"<p>Given an array of integers where 1 &le; a[i] &le; <i>n</i> (<i>n</i> = size of array), some elements appear twice and others appear once.</p>\r\n\r\n<p>Find all the elements of [1, <i>n</i>] inclusive that do not appear in this array.</p>\r\n\r\n<p>Could you do it without extra space and in O(<i>n</i>) runtime? You may assume the returned list does not count as extra space.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n<b>Input:</b>\r\n[4,3,2,7,8,2,3,1]\r\n\r\n<b>Output:</b>\r\n[5,6]\r\n</pre>\r\n</p>",
	"frequency":"475",
	"ac_num":"75186"
}