{
	"difficulty":"1",
	"submit_num":"129860",
	"show_id":"485",
	"leetcode_id":"485",
	"answers":[
		{
			"lc_ans_id":"96693",
			"view":"18073",
			"top":"0",
			"title":"Java 4 lines concise solution with explanation",
			"vote":"44",
			"content":"\\n```\\n    public int findMaxConsecutiveOnes(int[] nums) {\\n        int maxHere = 0, max = 0;\\n        for (int n : nums)\\n            max = Math.max(max, maxHere = n == 0 ? 0 : maxHere + 1);\\n        return max; \\n    } \\n```\\n\\nThe idea is to reset ```maxHere``` to 0 if we see 0, otherwise increase ```maxHere``` by 1\\nThe max of all ```maxHere``` is the solution\\n\\n```\\n110111\\n^ maxHere = 1\\n\\n110111\\n.^ maxHere = 2\\n\\n110111\\n..^ maxHere = 0\\n\\n110111\\n...^ maxHere = 1\\n\\n110111\\n....^ maxHere = 2\\n\\n110111\\n.....^ maxHere = 3\\n```\\n\\nWe can also solve this problem by setting ```k = 0``` of [Max Consecutive Ones II](https://discuss.leetcode.com/topic/75445/java-clean-solution-easily-extensible-to-flipping-k-zero-and-follow-up-handled)"
		},
		{
			"lc_ans_id":"96715",
			"view":"9355",
			"top":"1",
			"title":"Easy Java Solution",
			"vote":"16",
			"content":"This is a really easy problem. No explanation :)\\n```\\npublic class Solution {\\n    public int findMaxConsecutiveOnes(int[] nums) {\\n        int result = 0;\\n        int count = 0;\\n        \\n        for (int i = 0; i < nums.length; i++) {\\n            if (nums[i] == 1) {\\n        \\tcount++;\\n        \\tresult = Math.max(count, result);\\n            }\\n            else count = 0;\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"96700",
			"view":"3582",
			"top":"2",
			"title":"Simple C Solution with easy explanation",
			"vote":"13",
			"content":"Use the fact that multiplication with 0 resets everything..\\n\\n```\\nint findMaxConsecutiveOnes(int* nums, int numsSize) {\\n int max = 0;\\n int sum = 0;\\n for (int i=0; i<numsSize; i++)\\n {\\n     sum = (sum+nums[i])*nums[i];\\n     if(max<sum){max=sum;}\\n }\\nreturn max;\\n}\\n```"
		},
		{
			"lc_ans_id":"96712",
			"view":"7217",
			"top":"3",
			"title":"Simple Python",
			"vote":"11",
			"content":"```\\nclass Solution(object):\\n    def findMaxConsecutiveOnes(self, nums):\\n        cnt = 0\\n        ans = 0\\n        for num in nums:\\n            if num == 1:\\n                cnt += 1\\n                ans = max(ans, cnt)\\n            else:\\n                cnt = 0\\n        return ans\\n```"
		},
		{
			"lc_ans_id":"96730",
			"view":"4879",
			"top":"4",
			"title":"C++ solution with O(n)",
			"vote":"6",
			"content":"class Solution {\\npublic:\\n    int findMaxConsecutiveOnes(vector<int>& nums) {\\n        int max=0,cur=0;\\n        for(int i=0;i<nums.size();i++)\\n        {\\n            if(nums[i]&1)\\n            {\\n                max=max>++cur?max:cur;\\n            }\\n            else cur=0;\\n        }\\n        return max;        \\n    }\\n};"
		},
		{
			"lc_ans_id":"96690",
			"view":"760",
			"top":"5",
			"title":"A Python Solution",
			"vote":"5",
			"content":"    def findMaxConsecutiveOnes(self, nums):\\n        n = 0\\n        maxn = 0\\n        for i,v in enumerate(nums):\\n            if v == 1:\\n                n += 1\\n            else:\\n                maxn = max(maxn, n)\\n                n = 0\\n        maxn = max(maxn, n)\\n        return maxn"
		},
		{
			"lc_ans_id":"96742",
			"view":"560",
			"top":"6",
			"title":"Simple C++ code",
			"vote":"4",
			"content":"```\\n    int findMaxConsecutiveOnes(vector<int>& nums) {\\n        int max_cnt = 0, cnt = 0;\\n        for (auto n : nums) {\\n            if (n == 1) max_cnt = max(++cnt, max_cnt);\\n            else cnt = 0;\\n        }\\n        return max_cnt;\\n    }\\n```"
		},
		{
			"lc_ans_id":"96722",
			"view":"1450",
			"top":"7",
			"title":"one-liner",
			"vote":"4",
			"content":"Turning the array into a string so I get a nice split function.\\n```\\ndef find_max_consecutive_ones(nums)\\n  nums.join.split('0').map(&:size).max || 0\\nend\\n```"
		},
		{
			"lc_ans_id":"96674",
			"view":"221",
			"top":"8",
			"title":"Python Solution",
			"vote":"3",
			"content":"\\n\\n    def findMaxConsecutiveOnes(self, nums):\\n\\n        num_str = ''.join(map(str,nums))\\n        num_list = num_str.split('0')\\n        \\n        return len(max(num_list))"
		},
		{
			"lc_ans_id":"96746",
			"view":"1540",
			"top":"9",
			"title":"Java Straightforward O(n) solution",
			"vote":"3",
			"content":"Also viewable [here](https://github.com/fishercoder1534/Leetcode/blob/master/leetcode-algorithms/src/main/java/com/stevesun/solutions/MaxConsecutiveOnes.java).\\n\\n```\\n\\n    public int findMaxConsecutiveOnes(int[] nums) {\\n        int maxOnes = 0;\\n        for (int i = 0; i < nums.length; i++){\\n            int newOnes = 0;\\n            while (i < nums.length && nums[i] == 1){\\n                newOnes++;\\n                i++;\\n            }\\n            maxOnes = Math.max(maxOnes, newOnes);\\n        }\\n        return maxOnes;\\n    }\\n```"
		}
	],
	"id":"477",
	"title":"Max Consecutive Ones",
	"content":"<p>Given a binary array, find the maximum number of consecutive 1s in this array.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,1,0,1,1,1]\r\n<b>Output:</b> 3\r\n<b>Explanation:</b> The first two digits or the last three digits are consecutive 1s.\r\n    The maximum number of consecutive 1s is 3.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<ul>\r\n<li>The input array will only contain <code>0</code> and <code>1</code>.</li>\r\n<li>The length of input array is a positive integer and will not exceed 10,000</li>\r\n</ul>\r\n</p>",
	"frequency":"276",
	"ac_num":"70031"
}