{
	"difficulty":"2",
	"submit_num":"65165",
	"show_id":"280",
	"leetcode_id":"280",
	"answers":[
		{
			"lc_ans_id":"71692",
			"view":"19457",
			"top":"0",
			"title":"Java O(N) solution",
			"vote":"85",
			"content":"    public class Solution {\\n        public void wiggleSort(int[] nums) {\\n            for(int i=0;i<nums.length;i++)\\n                if(i%2==1){\\n                   if(nums[i-1]>nums[i]) swap(nums, i);\\n                }else if(i!=0 && nums[i-1]<nums[i]) swap(nums, i);\\n        }\\n        public void swap(int[] nums, int i){\\n              int tmp=nums[i];\\n              nums[i]=nums[i-1];\\n              nums[i-1]=tmp;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71688",
			"view":"7455",
			"top":"1",
			"title":"4-lines O(n) C++",
			"vote":"36",
			"content":"The final sorted `nums` needs to satisfy two conditions:\\n\\n 1. If `i` is odd, then `nums[i] >= nums[i - 1]`;\\n 2. If `i` is even, then `nums[i] <= nums[i - 1]`.\\n\\nThe code is just to fix the orderings of `nums` that do not satisfy 1 and 2.\\n\\n    class Solution {\\n    public: \\n        void wiggleSort(vector<int>& nums) {\\n            int n = nums.size();\\n            for (int i = 1; i < n; i++)\\n                if (((i & 1) && nums[i] < nums[i - 1]) || (!(i & 1) && nums[i] > nums[i - 1]))\\n                    swap(nums[i], nums[i - 1]);\\n        } \\n    };"
		},
		{
			"lc_ans_id":"71693",
			"view":"4022",
			"top":"2",
			"title":"My explanations of the best voted Algo",
			"vote":"35",
			"content":"I have to say nobody explains the sufficiency of the following algo:\\n\\n> The final sorted nums needs to satisfy two conditions:\\n> \\n> If i is odd, then nums[i] >= nums[i - 1];\\n> \\n> If i is even, then nums[i] <= nums[i - 1].\\n> \\n> The code is just to fix the orderings of nums that do not satisfy 1\\n> and 2.\\n\\n(from https://leetcode.com/discuss/57120/4-lines-o-n-c)\\n\\nwhy is this greedy solution can ensure previous sequences and coming sequences W.R.T position i wiggled? \\n\\nMy explanation is recursive, \\n\\nsuppose nums[0 .. i - 1] is wiggled, for position i:\\n\\nif i is odd, we already have, nums[i - 2] >= nums[i - 1],\\n\\nif nums[i - 1] <= nums[i], then we does not need to do anything, its already wiggled.\\n\\nif nums[i - 1] > nums[i], then we swap element at i -1 and i. Due to previous wiggled elements (nums[i - 2] >= nums[i - 1]), we know after swap the sequence is ensured to be nums[i - 2] > nums[i - 1] < nums[i], which is wiggled.\\n\\nsimilarly,\\n\\nif i is even, we already have, nums[i - 2] <= nums[i - 1],\\n\\nif nums[i - 1] >= nums[i], pass\\n\\nif nums[i - 1] <  nums[i], after swap, we are sure to have wiggled nums[i - 2] < nums[i - 1] > nums[i].\\n\\nThe same recursive solution applies to all the elements in the sequence, ensuring the algo success.\\n\\n    public void wiggleSort(int[] nums) {\\n        for (int i = 1; i < nums.length; i++)\\n            if (((i & 1) == 0) == (nums[i - 1] < nums[i])) xwap(nums, i);\\n    }\\n    \\n    private void xwap(int[] a, int i) {\\n        int t = a[i]; a[i] = a[i - 1]; a[i - 1] = t;\\n    }"
		},
		{
			"lc_ans_id":"71687",
			"view":"2055",
			"top":"3",
			"title":"2 lines neat Python",
			"vote":"17",
			"content":"    def wiggleSort(self, nums):\\n        for i in range(len(nums)):\\n            nums[i:i+2] = sorted(nums[i:i+2], reverse=i%2)"
		},
		{
			"lc_ans_id":"71747",
			"view":"3706",
			"top":"4",
			"title":"Java/Python O(n) time O(1) space solution 3+ lines",
			"vote":"16",
			"content":"**Python**\\n\\n    class Solution(object):\\n        def wiggleSort(self, nums):\\n            for i in xrange(1, len(nums)):\\n                if (i % 2) ^ (nums[i] > nums[i - 1]):\\n                    nums[i], nums[i - 1] = nums[i - 1], nums[i]\\n\\n\\n    # 125 / 125 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 80 ms\\n\\n**Java**\\n\\n    public void wiggleSort(int[] nums) {\\n        for (int i = 1; i < nums.length; ++i) {\\n            if ((i % 2 == 1) != (nums[i] > nums[i - 1])) {\\n                int cache = nums[i];\\n                nums[i] = nums[i-1];\\n                nums[i-1] = cache;\\n            }\\n        }\\n    }\\n\\n    // 125 / 125 test cases passed.\\n    // Status: Accepted\\n    // Runtime: 1 ms"
		},
		{
			"lc_ans_id":"71722",
			"view":"2197",
			"top":"5",
			"title":"Java O(n) 10 lines consice solution",
			"vote":"10",
			"content":"    public class Solution {\\n        public void wiggleSort(int[] nums) {\\n            for (int i = 1; i < nums.length; i++)\\n                if ((i % 2 == 1 && nums[i] < nums[i - 1]) || (i % 2 == 0 && nums[i] > nums[i - 1])) {\\n                    int tmp = nums[i];\\n                    nums[i] = nums[i - 1];\\n                    nums[i - 1] = tmp;\\n                }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71742",
			"view":"1239",
			"top":"6",
			"title":"C++ O(n) concise solution.",
			"vote":"7",
			"content":"        \\n    void wiggleSort(vector<int>& nums) {\\n        for (int i=0; i<(int)nums.size()-1; i++) {\\n            if (i%2==0 && nums[i]>nums[i+1])\\n                swap(nums[i], nums[i+1]);\\n            if (i%2==1 && nums[i]<nums[i+1])\\n                swap(nums[i], nums[i+1]);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"71705",
			"view":"1152",
			"top":"7",
			"title":"Easy code of python.",
			"vote":"6",
			"content":"    class Solution(object):\\n        def wiggleSort(self, a):\\n            if not a:\\n                return\\n            n = len(a)\\n            for i in xrange(1, n, 2):\\n                if a[i] < a[i-1]:\\n                    a[i], a[i-1] = a[i-1], a[i]\\n                \\n                if i + 1 < n and a[i] < a[i+1]:\\n                    a[i], a[i+1] = a[i+1], a[i]"
		},
		{
			"lc_ans_id":"71724",
			"view":"1048",
			"top":"8",
			"title":"Java Solution with Explanation & Thoughts",
			"vote":"4",
			"content":"The basic idea is to make sure that every odd position is greater than (or equal to) its two adjacent even postions. For example, if the current odd position is `i`, then we need to make sure the `nums[i-1] <= nums[i]` and `nums[i+1] <= nums[i]`. If you do that for the entire array, then the result will satisfy Wiggle Sort's requirement. (It's kind of like a greedy solution IMO, where local optimum leads to global optimum).\\n\\nI also thought about the proof (please tell me if i'm wrong here). I was wondering if there could be a case where a group of 3 numbers couldn't be arranged to meet the requirement. Turns out this is not the case. Let's say we have 3 consecutive numbers in the mid of the array ` a, b, and c`, where `b` is at an odd index and `a, c` are at even indices. There are only 4 possible cases:\\n`1. a <= b <= c --> swap(b, c)`\\n`2. a <= b >= c --> done`\\n`3. a >= b <= c --> swap(a, b), then it could be either case 1 or 2`\\n`4. a >= b >= c --> swap(a, b)`\\nWhatever the case it is, we will always be able to satisfy the requirement `nums[i-1] <= nums[i]` and `nums[i] >= nums[i+1]`. In addition, whether we swap `(a, b)` or not, it will still maintain the correct order for the previous group (e.g. if we have `d, a, b, c` where `d >= a`. If `a >= b` then we `swap(a, b)`, but still `d >= b`). Thus, if we do this operation to each `[even, odd, even]` index group of the array, then we should have the final solution.\\n\\nMy code can be more concise, but I want it to be crystal clear so I wrote it in the more verbose way.\\n\\n```\\npublic class Solution {\\n    public void wiggleSort(int[] nums) {\\n        for (int i = 1; i < nums.length; i++) {\\n            if (i % 2 == 0 && nums[i-1] < nums[i]) {  // at even index, check if it's greater than previous number\\n                swap(nums, i-1, i);\\n            }\\n            if (i % 2 != 0 && nums[i-1] > nums[i]) {  // at odd index, check if it's smaller than previous number\\n                swap(nums, i-1, i);\\n            }\\n        }\\n    }\\n    \\n    private void swap(int[] arr, int i, int j) {\\n        int temp = arr[i];\\n        arr[i] = arr[j];\\n        arr[j] = temp;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"71748",
			"view":"945",
			"top":"9",
			"title":"Simple Java Solution O(n log n)",
			"vote":"4",
			"content":"    public class Solution {\\n        public void wiggleSort(int[] nums) {\\n            Arrays.sort(nums);\\n            \\n            for(int i = 0; i < nums.length - 1; i++) {\\n                if(i % 2 == 1) {\\n                    int temp = nums[i];\\n                    nums[i] = nums[i + 1];\\n                    nums[i + 1] = temp;\\n                }\\n            }\\n        }\\n    }\\n\\nI felt like all the other solutions were too confusing so here's mine."
		}
	],
	"id":"280",
	"title":"Wiggle Sort",
	"content":"<p>\r\nGiven an unsorted array <code>nums</code>, reorder it <b>in-place</b> such that <code>nums[0] <= nums[1] >= nums[2] <= nums[3]...</code>.\r\n</p>\r\n<p>\r\nFor example, given <code>nums = [3, 5, 2, 1, 6, 4]</code>, one possible answer is <code>[1, 6, 2, 5, 3, 4]</code>.\r\n</p>",
	"frequency":"407",
	"ac_num":"38079"
}