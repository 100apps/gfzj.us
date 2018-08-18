{
	"difficulty":"1",
	"submit_num":"627529",
	"show_id":"27",
	"leetcode_id":"27",
	"answers":[
		{
			"lc_ans_id":"12289",
			"view":"34363",
			"top":"0",
			"title":"My solution for your reference.",
			"vote":"152",
			"content":"    int removeElement(int A[], int n, int elem) {\\n        int begin=0;\\n        for(int i=0;i<n;i++) if(A[i]!=elem) A[begin++]=A[i];\\n        return begin;\\n    }"
		},
		{
			"lc_ans_id":"12286",
			"view":"15692",
			"top":"1",
			"title":"Accepted java solution",
			"vote":"53",
			"content":"public class Solution {\\n\\n    public int removeElement(int[] A, int elem) {\\n       int m = 0;    \\n       for(int i = 0; i < A.length; i++){\\n           \\n           if(A[i] != elem){\\n               A[m] = A[i];\\n               m++;\\n           }\\n       }\\n       \\n       return m;\\n    }\\n}"
		},
		{
			"lc_ans_id":"12405",
			"view":"9810",
			"top":"2",
			"title":"9-line java solution",
			"vote":"30",
			"content":"The basic idea is when elem is found at index i, let A[i] = the last element in the modifying array, then repeat searching until elem is not found.\\n\\n\\n    public int removeElement(int[] A, int elem) {\\n        int len = A.length;\\n        for (int i = 0 ; i< len; ++i){\\n            while (A[i]==elem && i< len) {\\n                A[i]=A[--len];\\n            }\\n        }\\n        return len;\\n    }"
		},
		{
			"lc_ans_id":"12299",
			"view":"9216",
			"top":"3",
			"title":"Very simple and optimal c++ solution.",
			"vote":"24",
			"content":"    int removeElement(vector<int>& nums, int val) {\\n        int cnt = 0;\\n        for(int i = 0 ; i < nums.size() ; ++i) {\\n            if(nums[i] == val)\\n                cnt++;\\n            else\\n                nums[i-cnt] = nums[i];\\n        }\\n        return nums.size()-cnt;\\n    }"
		},
		{
			"lc_ans_id":"12282",
			"view":"5194",
			"top":"4",
			"title":"Fast & Short Java Solution",
			"vote":"19",
			"content":"    public int removeElement(int[] A, int elem) {\\n        int l = A.length;\\n        for (int i=0; i<l; i++) {\\n            if (A[i] == elem) {\\n                A[i--] = A[l-- -1];\\n            }\\n        }\\n        return l;\\n    }"
		},
		{
			"lc_ans_id":"12306",
			"view":"5887",
			"top":"5",
			"title":"Simple Python O(n) two pointer in place solution",
			"vote":"16",
			"content":"Starting from the left every time we find a value that is the target value we swap it out with an item starting from the right.  We decrement end each time as we know that the final item is the target value and only increment start once we know the value is ok.  Once start reaches end we know all items after that point are the target value so we can stop there.\\n\\n\\n      def removeElement(self, nums, val):\\n        start, end = 0, len(nums) - 1\\n        while start <= end:\\n            if nums[start] == val:\\n                nums[start], nums[end], end = nums[end], nums[start], end - 1\\n            else:\\n                start +=1\\n        return start"
		},
		{
			"lc_ans_id":"12677",
			"view":"1490",
			"top":"6",
			"title":"Really concise one-pass Java code",
			"vote":"13",
			"content":"    public int removeElement(int[] A, int elem) {\\n        int next = 0;\\n        for(int i = 0; i < A.length; i++) {\\n            if(A[i] != elem) {\\n                A[next++] = A[i];\\n            }\\n        }\\n        return next;\\n    }\\n\\nI use \"next\" to track the position to put the next \"non-elem\" integer."
		},
		{
			"lc_ans_id":"12578",
			"view":"1015",
			"top":"7",
			"title":"7 lines Java Solution",
			"vote":"12",
			"content":"    public class Solution {\\n        public int removeElement(int[] nums, int val) {\\n            int idx = 0;\\n            for (int i = 0; i < nums.length; i++){\\n                if (nums[i] != val){\\n                    nums[idx++] = nums[i]; \\n                }\\n            }\\n            return idx;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"12757",
			"view":"1787",
			"top":"8",
			"title":"6 lines of c++ solution",
			"vote":"12",
			"content":"    int removeElement(int a[], int n, int elem) {\\n            int count = 0;\\n            for (int i = 0; i < n; ++i) {\\n                if (a[i] != elem) {\\n                    a[count++] = a[i];\\n                }\\n            }\\n            return count;\\n        }"
		},
		{
			"lc_ans_id":"12582",
			"view":"1218",
			"top":"9",
			"title":"Share my 3 lines c++ code",
			"vote":"11",
			"content":"        int removeElement(int A[], int n, int elem) {\\n                int i=0;\\n                while(i<n)A[i]==elem?A[i]=A[--n]:i++;\\n                return n;\\n        }"
		}
	],
	"id":"27",
	"title":"Remove Element",
	"content":"<p>Given an array and a value, remove all instances of that value <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\"><b>in-place</b></a> and return the new length.\r\n</p>\r\n\r\n<p>Do not allocate extra space for another array, you must do this by <b>modifying the input array <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\">in-place</a></b> with O(1) extra memory.</p>\r\n\r\n<p>The order of elements can be changed. It doesn't matter what you leave beyond the new length.</p>\r\n\r\n<p>\r\n<b>Example:</b>\r\n<pre>\r\nGiven <b>nums</b> = [3,2,2,3], <b>val</b> = 3,\r\n\r\nYour function should return length = 2, with the first two elements of <i>nums</i> being 2.\r\n</pre>\r\n</p>",
	"frequency":"556",
	"ac_num":"252852"
}