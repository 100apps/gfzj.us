{
	"difficulty":"1",
	"submit_num":"85092",
	"show_id":"665",
	"leetcode_id":"665",
	"answers":[
		{
			"lc_ans_id":"106826",
			"view":"9853",
			"top":"0",
			"title":"[Java/C++] Simple greedy like solution with explanation",
			"vote":"42",
			"content":"This problem is like a greedy problem. When you find ```nums[i-1] > nums[i]``` for some ```i```, you will prefer to change ```nums[i-1]```'s value, since a larger ```nums[i]``` will give you more risks that you get inversion errors after position ```i```. But, if you also find ```nums[i-2] > nums[i]```, then you have to change ```nums[i]```'s value instead, or else you need to change both of ```nums[i-2]```'s and ```nums[i-1]```'s values.\\n\\nJava version:\\n```\\n public boolean checkPossibility(int[] nums) {\\n        int cnt = 0;                                                                    //the number of changes\\n        for(int i = 1; i < nums.length && cnt<=1 ; i++){\\n            if(nums[i-1] > nums[i]){\\n                cnt++;\\n                if(i-2<0 || nums[i-2] <= nums[i])nums[i-1] = nums[i];                    //modify nums[i-1] of a priority\\n                else nums[i] = nums[i-1];                                                //have to modify nums[i]\\n            }\\n        }\\n        return cnt<=1; \\n    }\\n```\\nC++ version:\\n```\\nbool checkPossibility(vector<int>& nums) {\\n        int cnt = 0;                                                                    //the number of changes\\n        for(int i = 1; i < nums.size() && cnt<=1 ; i++){\\n            if(nums[i-1] > nums[i]){\\n                cnt++;\\n                if(i-2<0 || nums[i-2] <= nums[i])nums[i-1] = nums[i];                    //modify nums[i-1] of a priority\\n                else nums[i] = nums[i-1];                                                //have to modify nums[i]\\n            }\\n        }\\n        return cnt<=1;\\n    } \\n```"
		},
		{
			"lc_ans_id":"106816",
			"view":"3510",
			"top":"1",
			"title":"Python Extremely Easy to Understand",
			"vote":"15",
			"content":"First, find a pair where the order is wrong. Then there are two possibilities, either the first in the pair can be modified or the second can be modified to create a valid sequence. We simply modify both of them and check for validity of the modified arrays by comparing with the array after sorting.\\n\\nI find this approach the easiest to reason about and understand.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def checkPossibility(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: bool\\n        \"\"\"\\n        one, two = nums[:], nums[:]\\n        for i in range(len(nums) - 1):\\n            if nums[i] > nums[i + 1]:\\n                one[i] = nums[i + 1]\\n                two[i + 1] = nums[i]\\n                break\\n        return one == sorted(one) or two == sorted(two)\\n```\\n\\nThanks to @xiaoyudeng666 for the tip (:"
		},
		{
			"lc_ans_id":"106849",
			"view":"3543",
			"top":"2",
			"title":"[C++] [Java] Clean Code - 6 liner Without Modifying Input",
			"vote":"10",
			"content":"The strategy is to `lower a[i-1]` to match `a[i]` if possible - (`a[i-2]` not exist or no smaller than `a[i]`);\\notherwise `rise a[i]` to match `a[i-1]`.\\n```\\n2 Examples:\\n 0  ...  i ...\\n 1 1 2 4[2]5 6  - in this case we can just raise a[i] to 4;\\n         4\\n 1 1 2[4]2 3 4  - in this case lower a[i-1] is better;\\n       2\\n```\\n**Java - Modifying Input**\\n```\\nclass Solution {\\n    public boolean checkPossibility(int[] a) {\\n        int modified = 0;\\n        for (int i = 1; i < a.length; i++) {\\n            if (a[i] < a[i - 1]) {\\n                if (modified++ > 0) return false;\\n                if (i - 2 < 0 || a[i - 2] <= a[i]) a[i - 1] = a[i]; // lower a[i - 1]\\n                else a[i] = a[i - 1]; // rise a[i]\\n            }\\n        }\\n        return true;\\n    }\\n}\\n```\\nWe can also do it without modifying the input by using a variable `prev` to hold the `a[i-1]`; if we have to `lower a[i]` to match `a[i-1]` instead of `raising a[i-1]`, simply skip updating `prev`;\\n**Java - Without Modifying Input**\\n```\\nclass Solution {\\n    public boolean checkPossibility(int[] a) {\\n        int modified = 0;\\n        for (int i = 1, prev = a[0]; i < a.length; i++) {\\n            if (a[i] < prev) {\\n                if (modified++ > 0) return false;\\n                if (i - 2 >= 0 && a[i - 2] > a[i]) continue;\\n            }\\n            prev = a[i];\\n        }\\n        return true;\\n    }\\n}\\n```\\nOr\\n```\\nclass Solution {\\n    public boolean checkPossibility(int[] a) {\\n        int modified = 0;\\n        for (int i = 1, prev = a[0]; i < a.length; i++) {\\n            if (a[i] < prev && modified++ > 0) return false;\\n            if (a[i] < prev && i - 2 >= 0 && a[i - 2] > a[i]) continue;\\n            prev = a[i];\\n        }\\n        return true;\\n    }\\n}\\n```\\n\\n**C++ - Modifying Input**\\n```\\nclass Solution {\\npublic:\\n    bool checkPossibility(vector<int>& a) {\\n        bool modified = false;\\n        for (int i = 1; i < a.size(); i++) {\\n            if (a[i] < a[i - 1]) {\\n                if (modified++) return false;\\n                (i - 2 < 0 || a[i - 2] <= a[i]) ? a[i - 1] = a[i] : a[i] = a[i - 1];\\n            }\\n        }\\n        return true;\\n    }\\n};\\n```\\n**C++ - Without Modifying Input**\\n```\\nclass Solution {\\npublic:\\n    bool checkPossibility(vector<int>& a) {\\n        bool modified = false;\\n        for (int i = 1, prev = a[0]; i < a.size(); i++) {\\n            if (a[i] < prev && modified++) return false;\\n            if (a[i] < prev && i - 2 >= 0 && a[i - 2] > a[i]) continue;\\n            prev = a[i];\\n        }\\n        return true;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"106818",
			"view":"3846",
			"top":"3",
			"title":"Java solution, 7 liner.",
			"vote":"6",
			"content":"```\\nclass Solution {\\n    public boolean checkPossibility(int[] nums) {\\n        int n = nums.length, count = 0;\\n        \\n        for (int i = 0; i + 1 < n; i++) {\\n            if (nums[i] > nums[i + 1]) {\\n                count++;\\n                if (i > 0 && nums[i + 1] < nums[i - 1]) nums[i + 1] = nums[i];\\n                else nums[i] = nums[i + 1];\\n            }\\n        }\\n            \\n        return count <= 1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106835",
			"view":"1261",
			"top":"4",
			"title":"Very easy to understand C++",
			"vote":"5",
			"content":"**\"NON-DECREASING\"** is a double negative.  This is the **same as an array sorted in ascending order** where ```nums[i] <= nums[i+1]```.\\n\\nFind the first exception to this rule where ```nums[i] > nums[i+1]```,\\nthen see if the rest of the array is sorted in ascending order **( ```without nums[i]``` ) XOR ( ```without nums[i+1]``` )**.\\n\\n```\\nclass Solution {\\npublic:\\n    bool checkPossibility(vector<int>& nums) {\\n        for (int i=0; i < nums.size()-1; i++){\\n            if (nums[i] > nums[i+1]){\\n                \\n                int temp = nums[i];\\n                //\\n                // \"erase\" nums[i], then check if nums is sorted without nums[i]\\n                //\\n                nums[i] = nums[i+1];\\n                if (is_sorted(nums.begin(), nums.end())) { return true; }\\n                \\n                //\\n                // \"erase\" nums[i+1], then check if nums is sorted without nums[i+1]\\n                //\\n                nums[i+1] = nums[i] = temp;\\n                if (is_sorted(nums.begin(), nums.end())) { return true; }\\n                \\n                //\\n                // nums is NOT sorted (without nums[i] XOR without nums[i+1])\\n                //\\n                return false;\\n            }\\n        }\\n        return true;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"106842",
			"view":"119",
			"top":"5",
			"title":"The easiest python solution....",
			"vote":"3",
			"content":"Well, I use **count** to remember how many descending pairs in the array, if **count**>=2, obviously we cannot modify a single element to obtain a non-descreaing array, so we return False. When **count** equals one, we check if we can modify **nums[i]** (the first one in the descending pair, by decreasing it) or **nums[i+1]** (the second one in the descending pair, by increasing it), if in both situations, we cannot, then we will also return False. In this way, the situation that return False is complete, the others will return True. And also in this way, we can return much earlier :-)\\n```\\nclass Solution(object):\\n    def checkPossibility(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: bool\\n        \"\"\"\\n        count=0\\n        for i in range(len(nums)-1):\\n            if nums[i]>nums[i+1]:\\n                count+=1\\n                if count>1 or ((i-1>=0 and nums[i-1]>nums[i+1]) and (i+2<len(nums) and nums[i+2]<nums[i])):\\n                    return False\\n        return True\\n```"
		},
		{
			"lc_ans_id":"106869",
			"view":"245",
			"top":"6",
			"title":"JAVA O(N) easy and no modifying",
			"vote":"3",
			"content":"```java\\nclass Solution {\\n    public boolean checkPossibility(int[] nums) {\\n        int count = 0;\\n        for (int i = 0; i < nums.length - 1; i++)\\n            if (!(nums[i] <= nums[i + 1])) {\\n                if (count > 0)\\n                    return false;\\n                if (i - 1 >= 0 && i + 2 < nums.length && (nums[i] > nums[i + 2] && nums[i + 1] < nums[i - 1]))\\n                    return false;\\n                count++;\\n            }\\n        return true;\\n    }\\n}\\n```\\nFind each **downtick**. \\n* If there are more than one downtick, return false;\\n* If you are at your first downtick, but it's one that *cannot be erased by modifying only one endpoint* of that downtick, then return false;\\n\\nWhat is a downtick that *cannot be erased by modifying only one endpoint*? If the downtick is at the indices `i, i+1`, then after modifying, we hope that all four of `i-1, i, i+1, i+2` falls into the same range as delimited by `i-1` and `i+2`. But we can only modify one of `i, i+1`, so if both `i, i+1` are out of the range described above, then this downtick is beyond remedy, we return false; Otherwise, just increment count and move on."
		},
		{
			"lc_ans_id":"106860",
			"view":"478",
			"top":"7",
			"title":"Java solution with explanation",
			"vote":"3",
			"content":"Given:  a1, a2, a3, a4, a5, ...\\n\\nSuppose a4<a3, we must modify either a3 or a4, the goal is to make a1...a4 satisfy the conditions and a4 has a relative small value. \\n\\nif a4<a2, then we have to modify a4, and the best choice is to let a4 = a3;\\notherwise, it's better to modify a3 to let a3 = a4 (no change to a4);\\n\\n```\\nclass Solution {\\n    public boolean checkPossibility(int[] nums) {\\n        if (nums == null || nums.length <= 1) return true;\\n        boolean found = false;\\n        for (int i = 1; i< nums.length; i++){\\n            if(nums[i]<nums[i-1]){\\n                if(found) return false;\\n                else {\\n                    if(i-2>=0 && nums[i]<nums[i-2]) nums[i] = nums[i-1];\\n                    found = true;\\n                }\\n            }\\n        }\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106885",
			"view":"864",
			"top":"8",
			"title":"Simple Python solution",
			"vote":"3",
			"content":"The logic is to first find any inversions, and if the number of inversions is > 1, then we need to modify more than 1 element and hence we return False.\\n\\nOnce we find an inversion,\\n\\nWe have to fix either the current value or the next value appropriately so that any future inversions can be detected correctly.\\n\\n```\\ndef checkPossibility(self, nums):\\n    count_dec = 0\\n    for i in range(len(nums) - 1):\\n        if nums[i] > nums[i + 1]:\\n            count_dec += 1\\n            if i == 0:\\n                nums[i] = nums[i + 1]\\n            elif nums[i - 1] <= nums[i + 1]:\\n                nums[i] = nums[i - 1]\\n            else:\\n                nums[i + 1] = nums[i]\\n        if count_dec > 1:\\n            return False\\n    return True\\n```"
		},
		{
			"lc_ans_id":"106873",
			"view":"193",
			"top":"9",
			"title":"Python, Straightforward with Explanation",
			"vote":"2",
			"content":"Call the array `A` *good* if it is monotone increasing.\\n\\nIf there is more than one index for which `A[i] > A[i+1]`, then more than one element of the array must be changed for `A` to be good.  If there is no index for which `A[i] > A[i+1]`, then the array is already good.\\n\\nOtherwise, let `p` be the problem index for which `A[p] > A[p+1]`.  There are a few cases.\\n\\n* If `p = 0`, then we could make the array good by setting `A[p] = A[p+1]`.\\n* If `p = len(A) - 2`, then we could make the array good by setting `A[p+1] = A[p]`.\\n* Otherwise, `A[p-1], A[p], A[p+1], A[p+2]` all exist, and:\\n    * We could change `A[p]` to be between `A[p-1]` and `A[p+1]` if possible, or;\\n    * We could change `A[p+1]` to be between `A[p]` and `A[p+2]` if possible.\\n\\n```\\ndef checkPossibility(self, A):\\n    p = None\\n    for i in xrange(len(A) - 1):\\n        if A[i] > A[i+1]:\\n            if p is not None:\\n                return False\\n            p = i\\n\\n    return (p is None or p == 0 or p == len(A)-2 or \\n            A[p-1] <= A[p+1] or A[p] <= A[p+2])\\n```"
		}
	],
	"id":"642",
	"title":"Non-decreasing Array",
	"content":"<p>\r\nGiven an array with <code>n</code> integers, your task is to check if it could become non-decreasing by modifying <b>at most</b> <code>1</code> element.\r\n</p>\r\n\r\n<p>\r\nWe define an array is non-decreasing if <code>array[i] <= array[i + 1]</code> holds for every <code>i</code> (1 <= i < n).\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [4,2,3]\r\n<b>Output:</b> True\r\n<b>Explanation:</b> You could modify the first <code>4</code> to <code>1</code> to get a non-decreasing array.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [4,2,1]\r\n<b>Output:</b> False\r\n<b>Explanation:</b> You can't get a non-decreasing array by modify at most one element.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe <code>n</code> belongs to [1, 10,000].\r\n</p>",
	"frequency":"236",
	"ac_num":"17651"
}