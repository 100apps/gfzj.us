{
	"difficulty":"2",
	"submit_num":"44877",
	"show_id":"540",
	"leetcode_id":"540",
	"answers":[
		{
			"lc_ans_id":"100754",
			"view":"6057",
			"top":"0",
			"title":"Java Binary Search, short (7l), O(log(n)) w/ explanations",
			"vote":"49",
			"content":"All credits go to [@Penghuan](/post/175763) who thought of using the pairs wisely.\\n\\nThis method seems to be a bit simpler to understand, since it doesn't start with the left half and stays a little bit closer to the conventional solutions.\\n\\n```\\n   public static int singleNonDuplicate(int[] nums) {\\n        int start = 0, end = nums.length - 1;\\n\\n        while (start < end) {\\n            // We want the first element of the middle pair,\\n            // which should be at an even index if the left part is sorted.\\n            // Example:\\n            // Index: 0 1 2 3 4 5 6\\n            // Array: 1 1 3 3 4 8 8\\n            //            ^\\n            int mid = (start + end) / 2;\\n            if (mid % 2 == 1) mid--;\\n\\n            // We didn't find a pair. The single element must be on the left.\\n            // (pipes mean start & end)\\n            // Example: |0 1 1 3 3 6 6|\\n            //               ^ ^\\n            // Next:    |0 1 1|3 3 6 6\\n            if (nums[mid] != nums[mid + 1]) end = mid;\\n\\n            // We found a pair. The single element must be on the right.\\n            // Example: |1 1 3 3 5 6 6|\\n            //               ^ ^\\n            // Next:     1 1 3 3|5 6 6|\\n            else start = mid + 2;\\n        }\\n\\n        // 'start' should always be at the beginning of a pair.\\n        // When 'start > end', start must be the single element.\\n        return nums[start];\\n    }\\n```"
		},
		{
			"lc_ans_id":"100759",
			"view":"14506",
			"top":"1",
			"title":"Java Binary Search O(log(n)) Shorter Than Others",
			"vote":"46",
			"content":"My solution using binary search. lo and hi are not regular index, but the pair index here. Basically you want to find the first even-index number not followed by the same number.\\n```\\npublic class Solution {\\n    public int singleNonDuplicate(int[] nums) {\\n        // binary search\\n        int n=nums.length, lo=0, hi=n/2;\\n        while (lo < hi) {\\n            int m = (lo + hi) / 2;\\n            if (nums[2*m]!=nums[2*m+1]) hi = m;\\n            else lo = m+1;\\n        }\\n        return nums[2*lo];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100732",
			"view":"3542",
			"top":"2",
			"title":"Short, compare nums[i] with nums[i^1]",
			"vote":"17",
			"content":"Simply find the first index whose \"partner index\" (the index xor 1) holds a different value.\\n\\n**Ruby:**\\n```\\ndef single_non_duplicate(nums)\\n  nums[(0..nums.size).bsearch { |i| nums[i] != nums[i^1] }]\\nend\\n```\\n**Python**\\n\\n    def singleNonDuplicate(self, nums):\\n        lo, hi = 0, len(nums) - 1\\n        while lo < hi:\\n            mid = (lo + hi) / 2\\n            if nums[mid] == nums[mid ^ 1]:\\n                lo = mid + 1\\n            else:\\n                hi = mid\\n        return nums[lo]\\n\\n**Java:**\\n\\n    public int singleNonDuplicate(int[] nums) {\\n        int lo = 0, hi = nums.length - 1;\\n        while (lo < hi) {\\n            int mid = (lo + hi) >>> 1;\\n            if (nums[mid] == nums[mid ^ 1])\\n                lo = mid + 1;\\n            else\\n                hi = mid;\\n        }\\n        return nums[lo];\\n    }"
		},
		{
			"lc_ans_id":"100763",
			"view":"6219",
			"top":"3",
			"title":"Java Code by using binary search O(log(n))",
			"vote":"12",
			"content":"public int singleNonDuplicate(int[] nums) {\\n        int low = 0;\\n        int high = nums.length-1;\\n        \\n        while(low < high) {\\n            int mid = low + (high - low)/2;\\n            if(nums[mid] != nums[mid+1] && nums[mid] != nums[mid-1])\\n                return nums[mid];\\n            else if(nums[mid] == nums[mid+1] && mid % 2 == 0)\\n                low = mid+1;\\n            else if(nums[mid] == nums[mid-1] && mid % 2 == 1)\\n                low = mid+1;\\n            else\\n                high = mid-1;\\n        }\\n        return nums[low];\\n    }"
		},
		{
			"lc_ans_id":"100766",
			"view":"4322",
			"top":"4",
			"title":"C++ binary search",
			"vote":"6",
			"content":"```\\nclass Solution {\\npublic:\\n    int singleNonDuplicate(vector<int>& nums) {\\n        int n = nums.size(), left = 0, right = n - 1;\\n        while (left < right) {\\n            int mid = left + (right - left) / 2;\\n            if (mid % 2 == 0) {\\n                if (nums[mid] == nums[mid-1]) right = mid - 2;\\n                else if (nums[mid] == nums[mid+1]) left = mid + 2;\\n                else return nums[mid];\\n            }\\n            else {\\n                if (nums[mid] == nums[mid-1]) left = mid + 1;\\n                else if (nums[mid] == nums[mid+1]) right = mid - 1;\\n            }\\n        }\\n        return nums[left];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"100829",
			"view":"412",
			"top":"5",
			"title":"Using Collections.binarySearch (for fun)",
			"vote":"3",
			"content":"Longer than writing my own binary search, but I wanted to see how this would look. I let `Collections.binarySearch` search in a special `List` object which returns `-1` for indexes before the single element, `0` for the index of the single element, and `1` for indexes after the single element. So I run binary search for `0`. Since my special `List` object computes its entries only on the fly when requested, this solution takes O(log n) time and O(1) space.\\n\\n    public int singleNonDuplicate(int[] nums) {\\n        List list = new ArrayList() {\\n            public int size() {\\n                return nums.length;\\n            }\\n            public Integer get(int index) {\\n                if ((index ^ 1) < size() && nums[index] == nums[index ^ 1])\\n                    return -1;\\n                if (index == 0 || index % 2 == 0 && nums[index - 1] != nums[index])\\n                    return 0;\\n                return 1;\\n            }\\n        };\\n        return nums[Collections.binarySearch(list, 0)];\\n    }\\n\\nA variation, the helper `isOff` tells whether the index is in the part that's \"off\" (the single element and everything after it):\\n\\n    public int singleNonDuplicate(int[] nums) {\\n        List list = new ArrayList() {\\n            public int size() {\\n                return nums.length;\\n            }\\n            public Integer get(int index) {\\n                return isOff(index) + isOff(index - 1);\\n            }\\n            int isOff(int i) {\\n                return i == size() - 1 || i >= 0 && nums[i] != nums[i ^ 1] ? 1 : 0;\\n            }\\n        };\\n        return nums[Collections.binarySearch(list, 1)];\\n    }"
		},
		{
			"lc_ans_id":"100787",
			"view":"758",
			"top":"6",
			"title":"Ruby oneliner",
			"vote":"3",
			"content":"It's the first even-index number not followed by the same number.\\n```\\ndef single_non_duplicate(nums)\\n  nums[2 * (0..nums.size/2).bsearch { |i| nums[2*i] != nums[2*i+1] }]\\nend\\n```\\n**Edit:** Found [an even shorter way](https://discuss.leetcode.com/topic/83310/very-short-compare-nums-i-with-nums-i-1)."
		},
		{
			"lc_ans_id":"100765",
			"view":"159",
			"top":"7",
			"title":"Java Binary Search O(lgN) : clear, easy, explained, no tricks",
			"vote":"2",
			"content":"First, the code:\\n```java\\npublic class Solution {\\n    public int singleNonDuplicate(int[] nums) {\\n        int n = nums.length;\\n        int lo = 0, hi = n - 1;\\n        while (lo < hi) {\\n            int mid = lo + (hi - lo) / 2;\\n            if ((mid % 2 == 0 && mid + 1 < n && nums[mid] == nums[mid + 1]) ||\\n                (mid % 2 == 1 && mid - 1 >= 0 && nums[mid] == nums[mid - 1]))\\n                lo = mid + 1;\\n            else\\n                hi = mid - 1;\\n        }\\n        return nums[lo];\\n    }\\n}\\n```\\nThe logic behind this is very easy: for each `mid`, we try to find understand whether the single number is on the **left** half. The `if` header tests that *`nums[mid]` is not single and neither is anything on its left*.\\n* if `mid` is even, then there are `2m` numbers on the left of `mid`. For the statement of *`nums[mid]` is not single and neither is anything on its left* to hold, we need the `2m` numbers to the left of `mid` to be `m` pairs, and also `nums[mid]` be in a pair with `nums[mid + 1]`. Indeed, we only have to make sure in this case that `nums[mid], nums[mid + 1]` is a pair. You can prove by contradiction that as long as this holds, the sole single number can't be on the left of `mid`. Now that the statement of *`nums[mid]` is not single and neither is anything on its left* is proven, we can just go to the right half.\\n* if `mid` is odd, then to prove *`nums[mid]` is not single and neither is anything on its left*, we only need to prove that `nums[mid - 1], nums[mid]` is a pair. `mid - 1` is even, and as long as `nums[mid - 1], nums[mid - 1 + 1]` forms a pair, we can actually use the argument of previous paragraph to prove that no entry to the left of `mid` is single. And neither is `mid` itself obviously. With *`nums[mid]` is not single and neither is anything on its left* proven, we can again to the right half.\\n* If *`nums[mid]` is not single and neither is anything on its left* not provable, then go to left half since the single number is there.\\n\\nI am not entirely sure the above explanation suffices, but I do hope it helps."
		},
		{
			"lc_ans_id":"100773",
			"view":"232",
			"top":"8",
			"title":"JavaScript solution using Array.find",
			"vote":"2",
			"content":"```\\n/**\\n * @param {number[]} nums\\n * @return {number}\\n */\\nvar singleNonDuplicate = function(nums) {\\n    return nums.find(n => nums.indexOf(n) === nums.lastIndexOf(n))\\n}\\n```\\n\\nedit: switched out \"filter\" for \"find\" since we don't need an array"
		},
		{
			"lc_ans_id":"100850",
			"view":"532",
			"top":"9",
			"title":"6 lines simple Python Binary Search",
			"vote":"2",
			"content":"Since all elements in the array are sorted and every element appears twice except one for once, for a given ```mid``` point, we can easily determine whether single element is in the ```left``` part or ```right``` part. Thus it's obvious that we can use binary search to achieve O(log(n)).\\n\\nIf index ```mid``` is even, when ```mid``` element ```nums[mid-1]``` equals to the neighbor on the left ```nums[mid-2]```, we know all elements until ```mid``` element are two pairs. Thus single element must be on the right side of ```mid``` index and we make ```l = mid+1```. Similarly, if index ```mid``` is odd, when when ```mid``` element ```nums[mid-1]``` doesn't equal to the neighbor on the left ```nums[mid-2]``` we meet the exact same situation. Others are pretty straight forward.\\n```\\nclass Solution(object):\\n    def singleNonDuplicate(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        l, r, n = 1, len(nums), len(nums)\\n        while l < r:\\n            mid = (l + r) >> 1\\n            if mid < n and nums[mid-2]<nums[mid-1]<nums[mid]: return nums[mid-1]\\n            l, r = [(mid+1,r), (l,mid-1)][(mid&1) ^ (nums[mid-1] != nums[mid-2])]\\n        return nums[l-1]\\n```"
		}
	],
	"id":"524",
	"title":"Single Element in a Sorted Array",
	"content":"<p>\r\nGiven a sorted array consisting of only integers where every element appears twice except for one element which appears once. Find this single element that appears only once. \r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,1,2,3,3,4,4,8,8]\r\n<b>Output:</b> 2\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [3,3,7,7,10,11,11]\r\n<b>Output:</b> 10\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nYour solution should run in O(log n) time and O(1) space.\r\n</p>\r\n",
	"frequency":"507",
	"ac_num":"25166"
}