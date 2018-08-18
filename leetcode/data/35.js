{
	"difficulty":"1",
	"submit_num":"571996",
	"show_id":"35",
	"leetcode_id":"35",
	"answers":[
		{
			"lc_ans_id":"15080",
			"view":"30804",
			"top":"0",
			"title":"My 8 line Java solution",
			"vote":"138",
			"content":"        public int searchInsert(int[] A, int target) {\\n            int low = 0, high = A.length-1;\\n            while(low<=high){\\n                int mid = (low+high)/2;\\n                if(A[mid] == target) return mid;\\n                else if(A[mid] > target) high = mid-1;\\n                else low = mid+1;\\n            }\\n            return low;\\n        }"
		},
		{
			"lc_ans_id":"15101",
			"view":"16070",
			"top":"1",
			"title":"C++ O(logn) Binary Search that handles duplicate",
			"vote":"76",
			"content":"If there are duplicate elements equal to *target*, my code will always return the one with smallest index.\\n\\n    class Solution {\\n    public:\\n        int searchInsert(vector<int>& nums, int target) {\\n            int low = 0, high = nums.size()-1;\\n    \\n            // Invariant: the desired index is between [low, high+1]\\n            while (low <= high) {\\n                int mid = low + (high-low)/2;\\n    \\n                if (nums[mid] < target)\\n                    low = mid+1;\\n                else\\n                    high = mid-1;\\n            }\\n    \\n            // (1) At this point, low > high. That is, low >= high+1\\n            // (2) From the invariant, we know that the index is between [low, high+1], so low <= high+1. Follwing from (1), now we know low == high+1.\\n            // (3) Following from (2), the index is between [low, high+1] = [low, low], which means that low is the desired index\\n            //     Therefore, we return low as the answer. You can also return high+1 as the result, since low == high+1\\n            return low;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"15081",
			"view":"4457",
			"top":"2",
			"title":"Python one liner 48ms",
			"vote":"18",
			"content":"    class Solution(object):\\n        def searchInsert(self, nums, target):\\n            \"\"\"\\n            :type nums: List[int]\\n            :type target: int\\n            :rtype: int\\n            \"\"\"       \\n            return len([x for x in nums if x<target])"
		},
		{
			"lc_ans_id":"15110",
			"view":"6797",
			"top":"3",
			"title":"Very concise and efficient solution in Java",
			"vote":"17",
			"content":"I have several solutions to this problem; this is the most concise and efficient one I have.\\n\\n    public class Solution {\\n    public int searchInsert(int[] nums, int target) {\\n        int low = 0, high = nums.length;\\n        while(low < high) {\\n            int mid = low + (high - low) / 2;\\n            if(nums[mid] < target)\\n                low = mid + 1;\\n            else\\n                high = mid;\\n        }\\n        return low;\\n    }\\n}"
		},
		{
			"lc_ans_id":"15106",
			"view":"9057",
			"top":"4",
			"title":"Python beats 98%",
			"vote":"16",
			"content":"    class Solution(object):\\n    def searchInsert(self, nums, key):\\n        if key > nums[len(nums) - 1]:\\n            return len(nums)\\n\\n        if key < nums[0]:\\n            return 0\\n\\n        l, r = 0, len(nums) - 1\\n        while l <= r:\\n            m = (l + r)/2\\n            if nums[m] > key:\\n                r = m - 1\\n                if r >= 0:\\n                    if nums[r] < key:\\n                        return r + 1\\n                else:\\n                    return 0\\n\\n            elif nums[m] < key:\\n                l = m + 1\\n                if l < len(nums):\\n                    if nums[l] > key:\\n                        return l\\n                else:\\n                    return len(nums)\\n            else:\\n                return m\\n\\nOnce the left border is larger than key, than return index. Once the right border is less than key, then return index."
		},
		{
			"lc_ans_id":"15372",
			"view":"1187",
			"top":"5",
			"title":"Simple Java solution",
			"vote":"10",
			"content":"    public int searchInsert(int[] nums, int target) {\\n        for (int i = 0; i < nums.length; i++) {\\n            if (nums[i] >= target)\\n                return i;\\n        }\\n        return nums.length;\\n    }"
		},
		{
			"lc_ans_id":"15303",
			"view":"8104",
			"top":"6",
			"title":"Simple Binary Search Solution",
			"vote":"9",
			"content":"I think the solution does not need a lot of if statement.\\nOnly two cases:\\n1 if found, just return current index\\n2 if not found, return next index where the search end\\n\\n    int search(int A[], int start, int end, int target) {\\n        if (start > end) return start;\\n        int mid = (start + end) / 2;\\n        if (A[mid] == target) return mid;\\n        else if (A[mid] > target) return search(A, start, mid - 1, target);\\n        else return search(A, mid + 1, end, target);\\n    }\\n    int searchInsert(int A[], int n, int target) {\\n        return search(A, 0, n - 1, target);\\n    }"
		},
		{
			"lc_ans_id":"15371",
			"view":"2549",
			"top":"7",
			"title":"My understanding of (lower bound,upper bound) binary search, in C++, thanks to two post",
			"vote":"8",
			"content":"thanks to [A simple CPP solution with lower_bound][1]\\nand [C++ O(logn) Binary Search that handles duplicate][2],  thanks to phu1ku 's answer on the second post.\\n\\nlinks for [std::lower_bound][3]  and  [std::upper_bound][4]\\n\\n    class Solution {\\n    public:\\n        int searchInsert(vector<int>& nums, int target) {\\n            /// return index of first one that comp(item,target)==true, or nums.size() if not found\\n\\t\\t\\t/// comp is greater or equal to for lower_bound\\n\\t\\t\\t/// comp is greater for upper_bound\\n            int first=0, last=nums.size(), mid;\\n            while (first<last) {\\n                mid=first+((last-first)>>1); // first<=mid, mid<last\\n\\t\\t\\t\\t/// if comp(item,target)==false, advance first\\n\\t\\t\\t\\t// if(nums[mid]<=target) // for upper_bound\\n\\t\\t\\t\\tif (nums[mid]<target) // for lower_bound\\n\\t\\t\\t\\t\\tfirst=mid+1; // first always increases\\n\\t\\t\\t\\telse /// else recede last\\n\\t\\t\\t\\t\\tlast=mid; // last always decreases (even last-first==1)\\n            }\\n            return first;\\n        }\\n    };\\n\\n\\n\\n  [1]: https://leetcode.com/discuss/41251/a-simple-cpp-solution-with-lower_bound\\n  [2]: https://leetcode.com/discuss/39829/c-o-logn-binary-search-that-handles-duplicate\\n  [3]: http://en.cppreference.com/w/cpp/algorithm/lower_bound\\n  [4]: http://en.cppreference.com/w/cpp/algorithm/upper_bound"
		},
		{
			"lc_ans_id":"15391",
			"view":"1112",
			"top":"8",
			"title":"A simple CPP solution with lower_bound",
			"vote":"8",
			"content":"Actually, what we need here is std::lower_bound in C++ STL, which returns an iterator pointing to the first element that does not less than target. And then, things are quite simple:\\n\\n    class Solution {\\n    public:\\n        int searchInsert(vector<int>& nums, int target) {\\n            return lower_bound(nums.begin(), nums.end(), target) - nums.begin();\\n        }\\n    };\\nOr we can implement an inline lower_bound:\\n\\n    class Solution {\\n    public:\\n        int searchInsert(vector<int>& nums, int target) {\\n            auto first = nums.begin(), last = nums.end();\\n            while (first < last) {\\n                auto mid = first + ((last - first) >> 1);\\n                if (*mid < target) {\\n                    first = mid + 1;\\n                } else {\\n                    last = mid;\\n                }\\n            }\\n            return first - nums.begin();\\n        }\\n    };"
		},
		{
			"lc_ans_id":"15111",
			"view":"2149",
			"top":"9",
			"title":"My 8ms accepted code.",
			"vote":"7",
			"content":"    class Solution {\\n    public:\\n        int searchInsert(int A[], int n, int target) {\\n            int low = 0,high = n - 1;\\n    \\t\\twhile (low <= high){\\n    \\t\\t\\tint mid = (low + high) / 2;\\n    \\t\\t\\tif(A[mid]==target) return mid;\\n    \\t\\t\\telse if (A[mid] >target){\\n    \\t\\t\\t\\thigh = mid - 1;\\n    \\t\\t\\t}\\n    \\t\\t\\telse{\\n    \\t\\t\\t\\tlow = mid + 1;\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\treturn low;\\n    \\t}\\n    };"
		}
	],
	"id":"35",
	"title":"Search Insert Position",
	"content":"<p>Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.</p>\r\n\r\n<p>You may assume no duplicates in the array.</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b> [1,3,5,6], 5\r\n<b>Output:</b> 2\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b> [1,3,5,6], 2\r\n<b>Output:</b> 1\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b>\r\n<pre>\r\n<b>Input:</b> [1,3,5,6], 7\r\n<b>Output:</b> 4\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b> [1,3,5,6], 0\r\n<b>Output:</b> 0\r\n</pre>\r\n</p>",
	"frequency":"391",
	"ac_num":"228943"
}