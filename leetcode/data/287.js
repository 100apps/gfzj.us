{
	"difficulty":"2",
	"submit_num":"215852",
	"show_id":"287",
	"leetcode_id":"287",
	"answers":[
		{
			"lc_ans_id":"72846",
			"view":"90289",
			"top":"0",
			"title":"My easy understood solution with O(n) time and O(1) space without modifying the array. With clear explanation.",
			"vote":"453",
			"content":"The main idea is the same with problem ***Linked List Cycle II***,*https://leetcode.com/problems/linked-list-cycle-ii/*. Use two pointers the fast and the slow. The fast one goes forward two steps each time, while the slow one goes only step each time. They must meet the same item when slow==fast. In fact, they meet in a circle, the duplicate number must be the entry point of the circle when visiting the array from nums[0]. Next we just need to find the entry point. We use a point(we can use the fast one before) to visit form begining with one step each time, do the same job to slow. When fast==slow, they meet at the entry point of the circle. The easy understood code is as follows.\\n\\n    int findDuplicate3(vector<int>& nums)\\n    {\\n    \\tif (nums.size() > 1)\\n    \\t{\\n    \\t\\tint slow = nums[0];\\n    \\t\\tint fast = nums[nums[0]];\\n    \\t\\twhile (slow != fast)\\n    \\t\\t{\\n    \\t\\t\\tslow = nums[slow];\\n    \\t\\t\\tfast = nums[nums[fast]];\\n    \\t\\t}\\n    \\n    \\t\\tfast = 0;\\n    \\t\\twhile (fast != slow)\\n    \\t\\t{\\n    \\t\\t\\tfast = nums[fast];\\n    \\t\\t\\tslow = nums[slow];\\n    \\t\\t}\\n    \\t\\treturn slow;\\n    \\t}\\n    \\treturn -1;\\n    }"
		},
		{
			"lc_ans_id":"72844",
			"view":"52065",
			"top":"1",
			"title":"Two Solutions (with explanation): O(nlog(n)) and O(n) time , O(1) space, without changing the input array",
			"vote":"223",
			"content":"This solution is based on binary search.\\n\\nAt first the search space is numbers between 1 to n. Each time I select a number `mid` (which is the one in the middle) and count all the numbers equal to or less than `mid`. Then if the `count` is more than `mid`, the search space will be `[1 mid]` otherwise `[mid+1 n]`. I do this until search space is only one number.\\n \\nLet's say `n=10` and I select `mid=5`. Then I count all the numbers in the array which are less than equal `mid`. If the there are more than `5` numbers that are less than `5`, then by Pigeonhole Principle (https://en.wikipedia.org/wiki/Pigeonhole_principle) one of them has occurred more than once. So I shrink the search space from `[1 10]` to `[1 5]`. Otherwise the duplicate number is in the second half so for the next step the search space would be `[6 10]`. \\n\\n    class Solution(object):\\n        def findDuplicate(self, nums):\\n            \"\"\"\\n            :type nums: List[int]\\n            :rtype: int\\n            \"\"\"\\n            low = 1\\n            high = len(nums)-1\\n            \\n            while low < high:\\n                mid = low+(high-low)/2\\n                count = 0\\n                for i in nums:\\n                    if i <= mid:\\n                        count+=1\\n                if count <= mid:\\n                    low = mid+1\\n                else:\\n                    high = mid\\n            return low\\n\\n\\nThere's also a better algorithm with `O(n)` time. Please read this very interesting solution here:\\n[http://keithschwarz.com/interesting/code/?dir=find-duplicate](http://keithschwarz.com/interesting/code/?dir=find-duplicate)"
		},
		{
			"lc_ans_id":"72845",
			"view":"26443",
			"top":"2",
			"title":"Java O(n) time and O(1) space solution. Similar to find loop in linkedlist.",
			"vote":"121",
			"content":"suppose the array is \\n\\n\\n> index: 0 1 2 3 4 5\\n> \\n> value: 2 5 1 1 4 3\\n\\nfirst subtract 1 from each element in the array, so it is much easy to understand.\\n    use the value as pointer. the array becomes:\\n\\n\\n> index: 0 1 2 3 4 5\\n> \\n> value: 1 4 0 0 3 2\\n\\n![enter image description here][1]\\n\\n\\n  [1]: http://cyukang.com/images/cycle3.png\\n\\nSecond if the array is \\n\\n> index: 0 1 2 3 4 5\\n> \\n> value: 0 1 2 4 2 3\\n\\nwe must choose the last element as the head of the linked list. If we choose 0, we can not detect the cycle.\\n\\nNow the problem is the same as find the cycle in linkedlist!\\n\\n    public int findDuplicate(int[] nums) {\\n        int n = nums.length;\\n        for(int i=0;i<nums.length;i++) nums[i]--;\\n        int slow = n-1;\\n        int fast = n-1;\\n        do{\\n            slow = nums[slow];\\n            fast = nums[nums[fast]];\\n        }while(slow != fast);\\n        slow = n-1;\\n        while(slow != fast){\\n            slow = nums[slow];\\n            fast = nums[fast];\\n        }\\n        return slow+1;\\n    }\\n\\nOne condition is we cannot modify the array. So the solution is\\n\\n    public int findDuplicate(int[] nums) {\\n        int n = nums.length;\\n        int slow = n;\\n        int fast = n;\\n        do{\\n            slow = nums[slow-1];\\n            fast = nums[nums[fast-1]-1];\\n        }while(slow != fast);\\n        slow = n;\\n        while(slow != fast){\\n            slow = nums[slow-1];\\n            fast = nums[fast-1];\\n        }\\n        return slow;\\n    }"
		},
		{
			"lc_ans_id":"73045",
			"view":"8723",
			"top":"3",
			"title":"Simple C++ code with O(1) space and O(nlogn) time complexity",
			"vote":"82",
			"content":"class Solution {\\n\\npublic:\\n\\n    int findDuplicate(vector<int>& nums) {\\n        int n=nums.size()-1;\\n        int low=1;\\n        int high=n;\\n        int mid;\\n        while(low<high){\\n            mid=(low+high)/2;\\n            int count=0;\\n            for(int num:nums){\\n                if(num<=mid) count++;\\n            }\\n            if(count>mid) high=mid;\\n            else low=mid+1; \\n        }\\n        return low;\\n    }\\n};"
		},
		{
			"lc_ans_id":"72934",
			"view":"14229",
			"top":"4",
			"title":"Share my solution O(N) time O(1) space. 12 ms",
			"vote":"55",
			"content":"    class Solution {\\n    public:\\n    int findDuplicate(vector<int>& nums) {\\n        int slow = 0;\\n\\t\\tint fast = 0;\\n\\t\\tint finder = 0;\\n\\n\\t\\twhile (true)\\n\\t\\t{\\n\\t\\t\\tslow = nums[slow];\\n\\t\\t\\tfast = nums[nums[fast]];\\n\\n\\t\\t\\tif (slow == fast)\\n\\t\\t\\t\\tbreak;\\n\\t\\t}\\n\\t\\twhile (true)\\n\\t\\t{\\n\\t\\t\\tslow = nums[slow];\\n\\t\\t\\tfinder = nums[finder];\\n\\t\\t\\tif (slow == finder)\\n\\t\\t\\t\\treturn slow;\\n\\t\\t}\\n    }\\n};"
		},
		{
			"lc_ans_id":"72841",
			"view":"12007",
			"top":"5",
			"title":"Java O(1)space using Binary-Search",
			"vote":"55",
			"content":"    public int findDuplicate(int[] nums) {\\n\\t\\tint low = 1, high = nums.length - 1;\\n        while (low <= high) {\\n            int mid = (int) (low + (high - low) * 0.5);\\n            int cnt = 0;\\n            for (int a : nums) {\\n                if (a <= mid) ++cnt;\\n            }\\n            if (cnt <= mid) low = mid + 1;\\n            else high = mid - 1;\\n        }\\n        return low;\\n    }"
		},
		{
			"lc_ans_id":"72872",
			"view":"4490",
			"top":"6",
			"title":"O(32*N) solution using bit manipulation in 10 lines",
			"vote":"42",
			"content":"We can count the sum of each 32 bits separately for the given array (stored in \"b\" variable) and for the array [1, 2, 3, ..., n] (stored in \"a\" variable). If \"b\" is greater than \"a\", it means that duplicated number has 1 at the current bit position (otherwise, \"b\" couldn't be greater than \"a\"). This way we retrieve the answer bit by bit:\\n\\n\\n    public int findDuplicate(int[] nums) {\\n        int n = nums.length-1, res = 0;\\n        for (int p = 0; p < 32; ++ p) {\\n            int bit = (1 << p), a = 0, b = 0;\\n            for (int i = 0; i <= n; ++ i) {\\n                if (i > 0 && (i & bit) > 0) ++a;\\n                if ((nums[i] & bit) > 0) ++b;\\n            }\\n            if (b > a) res += bit;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"72906",
			"view":"7985",
			"top":"7",
			"title":"JAVA-------------Easy Version To UnderStand!!!!!!!!!",
			"vote":"38",
			"content":"    \\tpublic static int findDuplicate(int[] nums) {\\n\\t\\tif (nums.length == 0 || nums == null)\\n\\t\\t\\treturn 0;\\n\\t\\tint low = 1, high = nums.length - 1, mid;\\n\\t\\twhile (low < high) {\\n\\t\\t\\tmid = low + (high - low) / 2;\\n\\t\\t\\tint count = 0;\\n\\t\\t\\tfor (int i = 0; i < nums.length; i++) {\\n\\t\\t\\t\\tif (nums[i] <= mid)\\n\\t\\t\\t\\t\\tcount++;\\n\\t\\t\\t}\\n\\t\\t\\tif (count > mid)\\n\\t\\t\\t\\thigh = mid;\\n\\t\\t\\telse\\n\\t\\t\\t\\tlow = mid + 1;\\n\\t\\t}\\n\\t\\treturn low;\\n\\t}"
		},
		{
			"lc_ans_id":"73015",
			"view":"4674",
			"top":"8",
			"title":"AC c++ code with O(n) time and O(1) space.",
			"vote":"26",
			"content":"Please read the link to understand it:http://keithschwarz.com/interesting/code/?dir=find-duplicate\\n\\n    class Solution {\\n    public:\\n        int findDuplicate(vector<int>& nums) {\\n            int l=nums.size();\\n            int slow =l-1;int fast = l-1;\\n            while(1){\\n                slow=nums[slow]-1;\\n                fast=nums[nums[fast]-1]-1;\\n                if(slow == fast){\\n                    break;\\n                }\\n            }\\n            fast = l-1;\\n            while(1){\\n                slow=nums[slow]-1;\\n                fast=nums[fast]-1;\\n                if(slow==fast)return slow+1;\\n            }\\n            \\n        }\\n    };"
		},
		{
			"lc_ans_id":"73022",
			"view":"2950",
			"top":"9",
			"title":"Python Solution with O(1) space and O(nlogn) time",
			"vote":"25",
			"content":"    class Solution(object):\\n        def findDuplicate(self, nums):\\n            low = 0\\n            high = len(nums) - 1\\n            mid = (high + low) / 2\\n            while high - low > 1:\\n                count = 0\\n                for k in nums:\\n                    if mid < k <= high:\\n                        count += 1\\n                if count > high - mid:\\n                    low = mid\\n                else:\\n                    high = mid\\n                mid = (high + low) / 2\\n            return high\\n\\nThe difficulty in this problem lies in O(1) space, and many solution using O(n) space can also be accepted by OJ.\\nThe solution is applying bi-search in the range[1, n] by counting the element which falls in sub range(n/2, n].\\nIf the number is bigger than capacity of that sub range, it means the duplicated integer falls in the sub-range.\\nOtherwise the duplicated integer falls in the other half sub range."
		}
	],
	"id":"287",
	"title":"Find the Duplicate Number",
	"content":"<p>\r\nGiven an array <i>nums</i> containing <i>n</i> + 1 integers where each integer is between 1 and <i>n</i> (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br>\r\n<ol>\r\n<li>You <b>must not</b> modify the array (assume the array is read only).</li>\r\n<li>You must use only constant, <i>O</i>(1) extra space.</li>\r\n<li>Your runtime complexity should be less than <code>O(n<sup>2</sup>)</code>.</li>\r\n<li>There is only one duplicate number in the array, but it could be repeated more than once.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"484",
	"ac_num":"95154"
}