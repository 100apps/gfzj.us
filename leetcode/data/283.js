{
	"difficulty":"1",
	"submit_num":"495433",
	"show_id":"283",
	"leetcode_id":"283",
	"answers":[
		{
			"lc_ans_id":"72011",
			"view":"46824",
			"top":"0",
			"title":"Simple O(N) Java Solution Using Insert Index",
			"vote":"238",
			"content":" \\n    // Shift non-zero values as far forward as possible\\n    // Fill remaining space with zeros\\n\\n    public void moveZeroes(int[] nums) {\\n        if (nums == null || nums.length == 0) return;        \\n\\n        int insertPos = 0;\\n        for (int num: nums) {\\n            if (num != 0) nums[insertPos++] = num;\\n        }        \\n\\n        while (insertPos < nums.length) {\\n            nums[insertPos++] = 0;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"72005",
			"view":"22361",
			"top":"1",
			"title":"My simple C++ solution",
			"vote":"122",
			"content":"    class Solution {\\n    public:\\n        void moveZeroes(vector<int>& nums) {\\n            int j = 0;\\n            // move all the nonzero elements advance\\n            for (int i = 0; i < nums.size(); i++) {\\n                if (nums[i] != 0) {\\n                    nums[j++] = nums[i];\\n                }\\n            }\\n            for (;j < nums.size(); j++) {\\n                nums[j] = 0;\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"72000",
			"view":"19498",
			"top":"2",
			"title":"1ms Java solution",
			"vote":"95",
			"content":"public class Solution {\\n    \\n    public void moveZeroes(int[] nums) {\\n\\n        int j = 0;\\n        for(int i = 0; i < nums.length; i++) {\\n            if(nums[i] != 0) {\\n                int temp = nums[j];\\n                nums[j] = nums[i];\\n                nums[i] = temp;\\n                j++;\\n            }\\n        }\\n    }\\n}"
		},
		{
			"lc_ans_id":"72045",
			"view":"9591",
			"top":"3",
			"title":"C++ Accepted Code",
			"vote":"42",
			"content":"    void moveZeroes(vector<int>& nums) {\\n        int last = 0, cur = 0;\\n        \\n        while(cur < nums.size()) {\\n            if(nums[cur] != 0) {\\n                swap(nums[last], nums[cur]);\\n                last++;\\n            }\\n            \\n            cur++;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"72012",
			"view":"5667",
			"top":"4",
			"title":"Python short in-place solution with comments.",
			"vote":"41",
			"content":"    \\n    # in-place\\n    def moveZeroes(self, nums):\\n        zero = 0  # records the position of \"0\"\\n        for i in xrange(len(nums)):\\n            if nums[i] != 0:\\n                nums[i], nums[zero] = nums[zero], nums[i]\\n                zero += 1"
		},
		{
			"lc_ans_id":"72132",
			"view":"6198",
			"top":"5",
			"title":"One line c++ code, 20ms",
			"vote":"36",
			"content":"The idea comes from the c++ erase/remove idiom.\\n\\n    class Solution {\\n    public:\\n        void moveZeroes(vector<int>& nums) {\\n            fill(remove(nums.begin(), nums.end(),0), nums.end(), 0);\\n        }\\n    };"
		},
		{
			"lc_ans_id":"72128",
			"view":"3151",
			"top":"6",
			"title":"0ms Java Solution",
			"vote":"21",
			"content":"   Insert the non-zero number first, then insert the zeroes.\\n\\n\\n     public class Solution{\\n        \\tpublic void moveZeroes(int[] nums){\\n        \\t\\tint index=0;\\n        \\t\\tfor (int i=0;i<nums.length;i++){\\n        \\t\\t\\tif (nums[i]!=0) nums[index++]=nums[i];\\n        \\t\\t}\\n        \\t\\twhile(index<nums.length){\\n        \\t\\t\\tnums[index++]=0;\\n        \\t\\t}\\n        \\t}\\n        \\n        }"
		},
		{
			"lc_ans_id":"72419",
			"view":"2712",
			"top":"7",
			"title":"Java - Short and Swappy - 1ms",
			"vote":"21",
			"content":"\\t\\n\\t\\n\\t\\n\\tpublic class Solution {    \\n\\t    \\n\\t    public void moveZeroes(int[] nums) {\\n\\t        int z = -1;\\n\\t        for (int i=0; i< nums.length; i++) {\\n\\t            int temp = nums[i];\\n\\t            if (temp != 0) {\\n\\t                nums[i]=nums[++z];\\n\\t                nums[z]=temp;\\n\\t            }\\n\\t        }\\n\\t    }\\n\\t\\n\\t}"
		},
		{
			"lc_ans_id":"72074",
			"view":"4140",
			"top":"8",
			"title":"Share my one line python solution",
			"vote":"20",
			"content":"nums.sort(key= lambda x: 1 if x == 0 else 0)"
		},
		{
			"lc_ans_id":"72418",
			"view":"1461",
			"top":"9",
			"title":"JAVA O(N) SOLUTION",
			"vote":"18",
			"content":"public void moveZeroes(int[] nums) {\\n    int count = 0 , size = nums.length;\\n        \\n    for (int i = 0; i< size; i++) {\\n        if ( nums[i] == 0) { count ++;}\\n         if ( nums[i] != 0) { nums[i - count] = nums[i];}\\n    }\\n    for (int i = 0; i < count; i++ ) {\\n        nums[size - count  + i] = 0;\\n    }\\n}"
		}
	],
	"id":"283",
	"title":"Move Zeroes",
	"content":"<p>\r\nGiven an array <code>nums</code>, write a function to move all <code>0</code>'s to the end of it while maintaining the relative order of the non-zero elements.\r\n</p>\r\n\r\n<p>\r\nFor example, given <code>nums  = [0, 1, 0, 3, 12]</code>, after calling your function, <code>nums</code> should be <code>[1, 3, 12, 0, 0]</code>.\r\n</p>\r\n\r\n<p>\r\n<b>Note</b>:<br>\r\n<ol>\r\n<li>You must do this <b>in-place</b> without making a copy of the array.</li>\r\n<li>Minimize the total number of operations.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"589",
	"ac_num":"253449"
}