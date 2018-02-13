{
	"difficulty":"1",
	"submit_num":"861304",
	"show_id":"26",
	"leetcode_id":"26",
	"answers":[
		{
			"lc_ans_id":"11757",
			"view":"56402",
			"top":"0",
			"title":"My Solution : Time O(n), Space O(1)",
			"vote":"154",
			"content":"    class Solution {\\n        public:\\n        int removeDuplicates(int A[], int n) {\\n            if(n < 2) return n;\\n            int id = 1;\\n            for(int i = 1; i < n; ++i) \\n                if(A[i] != A[i-1]) A[id++] = A[i];\\n            return id;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"11782",
			"view":"18217",
			"top":"1",
			"title":"Share my clean C++ code",
			"vote":"122",
			"content":"    int count = 0;\\n    for(int i = 1; i < n; i++){\\n        if(A[i] == A[i-1]) count++;\\n        else A[i-count] = A[i];\\n    }\\n    return n-count;"
		},
		{
			"lc_ans_id":"11780",
			"view":"20696",
			"top":"2",
			"title":"5 lines C++/Java, nicer loops",
			"vote":"77",
			"content":"I don't like old-style indexed looping. I much prefer the \"enhanced\" (Java) / \"range-based\" (C++) loops, they make things much cleaner.\\n\\n---\\n\\n**C++**\\n\\n    int removeDuplicates(vector<int>& nums) {\\n        int i = 0;\\n        for (int n : nums)\\n            if (!i || n > nums[i-1])\\n                nums[i++] = n;\\n        return i;\\n    }\\n\\nAnd to not need the `!i` check in the loop:\\n\\n    int removeDuplicates(vector<int>& nums) {\\n        int i = !nums.empty();\\n        for (int n : nums)\\n            if (n > nums[i-1])\\n                nums[i++] = n;\\n        return i;\\n    }\\n\\n---\\n\\n**Java**\\n\\n    public int removeDuplicates(int[] nums) {\\n        int i = 0;\\n        for (int n : nums)\\n            if (i == 0 || n > nums[i-1])\\n                nums[i++] = n;\\n        return i;\\n    }\\n\\nAnd to not need the `i == 0` check in the loop:\\n\\n    public int removeDuplicates(int[] nums) {\\n        int i = nums.length > 0 ? 1 : 0;\\n        for (int n : nums)\\n            if (n > nums[i-1])\\n                nums[i++] = n;\\n        return i;\\n    }"
		},
		{
			"lc_ans_id":"11769",
			"view":"17845",
			"top":"3",
			"title":"5 lines Java solution",
			"vote":"30",
			"content":"    public int removeDuplicates(int[] A) {\\n        if (A.length==0) return 0;\\n        int j=0;\\n        for (int i=0; i<A.length; i++)\\n            if (A[i]!=A[j]) A[++j]=A[i];\\n        return ++j;\\n    }"
		},
		{
			"lc_ans_id":"11751",
			"view":"16640",
			"top":"4",
			"title":"Simple Python solution - O(n)",
			"vote":"25",
			"content":"    class Solution:\\n        # @param a list of integers\\n        # @return an integer\\n        def removeDuplicates(self, A):\\n            if not A:\\n                return 0\\n    \\n            newTail = 0\\n    \\n            for i in range(1, len(A)):\\n                if A[i] != A[newTail]:\\n                    newTail += 1\\n                    A[newTail] = A[i]\\n    \\n            return newTail + 1"
		},
		{
			"lc_ans_id":"11838",
			"view":"2570",
			"top":"5",
			"title":"Simple C++ O(n) solution",
			"vote":"15",
			"content":"\\n    int removeDuplicates(vector<int>& nums) {\\n        int pos = 0;\\n\\n        for (int i = 0; i < nums.size(); ++i) {\\n            if (i == 0 || nums[i] != nums[pos - 1])\\n                nums[pos++] = nums[i];\\n        }\\n\\n        return pos;\\n    }"
		},
		{
			"lc_ans_id":"12092",
			"view":"3275",
			"top":"6",
			"title":"Java Solution with Explanation",
			"vote":"14",
			"content":"    public class Solution {\\n        public int removeDuplicates(int[] nums) {\\n        \\n            int i = 1; //iterator thru array\\n            int j = 0; //current index\\n            for (; i<nums.length; i++) { \\n                if (nums[i] != nums[j]) { //new number\\n                    j++; //move current index\\n                    nums[j] = nums[i]; //fill current index with new number\\n                } \\n            }\\n        return j+1;\\n       }\\n    }"
		},
		{
			"lc_ans_id":"11870",
			"view":"2589",
			"top":"7",
			"title":"Simple 1ms Java Solution",
			"vote":"9",
			"content":"    public class Solution\\n    {\\n        public int removeDuplicates(int[] nums)\\n        {\\n            int dupes = 0;\\n            \\n            for (int i = 1; i < nums.length; i++)\\n            {\\n                if (nums[i] == nums[i - 1])\\n                    dupes++;\\n                \\n                nums[i - dupes] = nums[i];\\n            }\\n            \\n            return nums.length - dupes;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"12058",
			"view":"1433",
			"top":"8",
			"title":"Clean 5 Line Java Solution",
			"vote":"8",
			"content":"    public int removeDuplicates(int[] nums) {\\n        int cur = 0 ; \\n        for(int n:nums)\\n            if(n>nums[cur])\\n                nums[++cur] = n;\\n        return cur+1;\\n    }"
		},
		{
			"lc_ans_id":"12131",
			"view":"1211",
			"top":"9",
			"title":"C++ code, no trick",
			"vote":"8",
			"content":"Use an index last to record the next written position (i.e. copy a new element to last+1).\\n\\n    class Solution {\\n    public:\\n        int removeDuplicates(vector<int>& nums) {\\n            int last=0, i, len=nums.size();\\n            if(!len) return 0;\\n            for(i=0; i<len;++i)\\n            {\\n                if(nums[i]!=nums[last]) nums[++last] = nums[i];\\n            }\\n            return last+1;\\n            \\n        }\\n    };"
		}
	],
	"id":"26",
	"title":"Remove Duplicates from Sorted Array",
	"content":"<p>\r\nGiven a sorted array, remove the duplicates <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\"><b>in-place</b></a> such that each element appear only <i>once</i> and return the new length.</p>\r\n\r\n<p>Do not allocate extra space for another array, you must do this by <b>modifying the input array <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\">in-place</a></b> with O(1) extra memory.</p>\r\n\r\n<p>\r\n<b>Example:</b>\r\n<pre>\r\nGiven <i>nums</i> = [1,1,2],\r\n\r\nYour function should return length = 2, with the first two elements of <i>nums</i> being 1 and 2 respectively.\r\nIt doesn't matter what you leave beyond the new length.\r\n</pre>\r\n</p>",
	"frequency":"553",
	"ac_num":"309473"
}