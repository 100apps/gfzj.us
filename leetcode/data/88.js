{
	"difficulty":"1",
	"submit_num":"656467",
	"show_id":"88",
	"leetcode_id":"88",
	"answers":[
		{
			"lc_ans_id":"29522",
			"view":"51346",
			"top":"0",
			"title":"This is my AC code, may help you",
			"vote":"255",
			"content":"    class Solution {\\n    public:\\n        void merge(int A[], int m, int B[], int n) {\\n            int i=m-1;\\n    \\t\\tint j=n-1;\\n    \\t\\tint k = m+n-1;\\n    \\t\\twhile(i >=0 && j>=0)\\n    \\t\\t{\\n    \\t\\t\\tif(A[i] > B[j])\\n    \\t\\t\\t\\tA[k--] = A[i--];\\n    \\t\\t\\telse\\n    \\t\\t\\t\\tA[k--] = B[j--];\\n    \\t\\t}\\n    \\t\\twhile(j>=0)\\n    \\t\\t\\tA[k--] = B[j--];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"29515",
			"view":"18737",
			"top":"1",
			"title":"4ms C++ solution with single loop",
			"vote":"86",
			"content":"This code relies on the simple observation that once all of the numbers from `nums2` have been merged into `nums1`, the rest of the numbers in `nums1` that were not moved are already in the correct place.\\n\\n    class Solution {\\n    public:\\n        void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\\n            int i = m - 1, j = n - 1, tar = m + n - 1;\\n            while (j >= 0) {\\n                nums1[tar--] = i >= 0 && nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"29498",
			"view":"31110",
			"top":"2",
			"title":"3 line Java Solution",
			"vote":"76",
			"content":"    public void merge(int A[], int m, int B[], int n) {\\n        int i=m-1, j=n-1, k=m+n-1;\\n        while (i>-1 && j>-1) A[k--]= (A[i]>B[j]) ? A[i--] : B[j--];\\n        while (j>-1)         A[k--]=B[j--];\\n    }"
		},
		{
			"lc_ans_id":"29503",
			"view":"16721",
			"top":"3",
			"title":"Beautiful Python Solution",
			"vote":"71",
			"content":"    def merge(self, nums1, m, nums2, n):\\n            while m > 0 and n > 0:\\n                if nums1[m-1] >= nums2[n-1]:\\n                    nums1[m+n-1] = nums1[m-1]\\n                    m -= 1\\n                else:\\n                    nums1[m+n-1] = nums2[n-1]\\n                    n -= 1\\n            if n > 0:\\n                nums1[:n] = nums2[:n]"
		},
		{
			"lc_ans_id":"29505",
			"view":"12050",
			"top":"4",
			"title":"1 Line Solution",
			"vote":"37",
			"content":"    while(n>0) A[m+n-1] = (m==0||B[n-1] > A[m-1]) ? B[--n] : A[--m];"
		},
		{
			"lc_ans_id":"29578",
			"view":"4061",
			"top":"5",
			"title":"Share my accepted Java solution!",
			"vote":"33",
			"content":"    public class Solution {\\n        public void merge(int A[], int m, int B[], int n) {\\n            int i = m - 1, j = n - 1, k = m + n - 1;\\n            while(i >= 0 && j >= 0) {\\n                A[k--] = A[i] > B[j] ? A[i--] : B[j--];\\n            }\\n            while(j >= 0) {\\n                A[k--] = B[j--];\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"29556",
			"view":"2279",
			"top":"6",
			"title":"2 lines very simple C++ solution",
			"vote":"22",
			"content":"    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\\n       for(int i=m-1, j=n-1, k=m+n-1; j>=0; )\\n           nums1[k--] = i>=0 && nums1[i]>nums2[j]? nums1[i--]: nums2[j--];\\n    }"
		},
		{
			"lc_ans_id":"29614",
			"view":"2944",
			"top":"7",
			"title":"C++ solution, runtime O(n), in-place, easy to understand",
			"vote":"22",
			"content":"The idea is to go from the last indexes of both arrays, compare and put elements from either A or B to the final position, which can easily get since we know that A have enough space to store them all and we know size of A and B. Please refer to the comments for details.\\n\\n    class Solution {\\n    public:\\n        void merge(int A[], int m, int B[], int n) {\\n            \\n            int a=m-1;\\n            int b=n-1;\\n            int i=m+n-1;    // calculate the index of the last element of the merged array\\n            \\n            // go from the back by A and B and compare and put to the A element which is larger\\n            while(a>=0 && b>=0){\\n                if(A[a]>B[b])   A[i--]=A[a--];\\n                else            A[i--]=B[b--];\\n            }\\n            \\n            // if B is longer than A just copy the rest of B to A location, otherwise no need to do anything\\n            while(b>=0)         A[i--]=B[b--];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"29825",
			"view":"3776",
			"top":"8",
			"title":"Cleanest Solution",
			"vote":"22",
			"content":"    class Solution {\\n    public:\\n        void merge(int A[], int m, int B[], int n) {\\n            int i = m-1;\\n            int j = n-1;\\n            for (int k = m+n-1; k >= 0; k--) {\\n                if (i < 0)              A[k] = B[j--];\\n                else if (j < 0)         A[k] = A[i--];\\n                else if (A[i] < B[j])   A[k] = B[j--];\\n                else                    A[k] = A[i--];\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"29511",
			"view":"2683",
			"top":"9",
			"title":"A bug in testing case?",
			"vote":"21",
			"content":"I found that for corner case\\nnums1 = [1], m = 1;\\nnums2 = [0], n = 1.\\nThe result should be [0,1], but Leetcode gives [1].\\nDoes Leetcode go wrong here?"
		}
	],
	"id":"88",
	"title":"Merge Sorted Array",
	"content":"<p>Given two sorted integer arrays <i>nums1</i> and <i>nums2</i>, merge <i>nums2</i> into <i>nums1</i> as one sorted array.</p>\r\n\r\n<p>\r\n<b>Note:</b><br />\r\nYou may assume that <i>nums1</i> has enough space (size that is greater or equal to <i>m</i> + <i>n</i>) to hold additional elements from <i>nums2</i>. The number of elements initialized in <i>nums1</i> and <i>nums2</i> are <i>m</i> and <i>n</i> respectively.</p>",
	"frequency":"559",
	"ac_num":"211146"
}