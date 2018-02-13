{
	"difficulty":"3",
	"submit_num":"240546",
	"show_id":"154",
	"leetcode_id":"154",
	"answers":[
		{
			"lc_ans_id":"48808",
			"view":"29591",
			"top":"0",
			"title":"My pretty simple code to solve it",
			"vote":"197",
			"content":"    class Solution {\\n    public:\\n        int findMin(vector<int> &num) {\\n            int lo = 0;\\n            int hi = num.size() - 1;\\n            int mid = 0;\\n            \\n            while(lo < hi) {\\n                mid = lo + (hi - lo) / 2;\\n                \\n                if (num[mid] > num[hi]) {\\n                    lo = mid + 1;\\n                }\\n                else if (num[mid] < num[hi]) {\\n                    hi = mid;\\n                }\\n                else { // when num[mid] and num[hi] are same\\n                    hi--;\\n                }\\n            }\\n            return num[lo];\\n        }\\n    };\\n\\nWhen num[mid] == num[hi], we couldn't sure the position of minimum in mid's left or right, so just let upper bound reduce one."
		},
		{
			"lc_ans_id":"48817",
			"view":"9616",
			"top":"1",
			"title":"One simple and clear method with O(1) space and worst O(n) time",
			"vote":"37",
			"content":"    class Solution {\\n    public:\\n        int findMin(vector<int> &num) {\\n            if(num.empty())\\n                return 0;\\n            int i=0,j=num.size()-1;\\n            while(i<j)\\n            {\\n                int mid=(i+j)/2;\\n                if(num[j]<num[mid]){\\n                    i=mid+1;\\n                }\\n                else if(num[mid]<num[j]){\\n                    j=mid;\\n                }\\n                else{//num[mid]==num[j]\\n                    if(num[i]==num[mid]){//linear complexity\\n                        i++;\\n                        j--;\\n                    }\\n                    else\\n                        j=mid;\\n                }\\n            }\\n            return num[j];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"48810",
			"view":"6229",
			"top":"2",
			"title":"Super simple and clean Java, binary search.",
			"vote":"29",
			"content":"    \\n    public int findMin(int[] nums) {\\n    \\t int l = 0, r = nums.length-1;\\n    \\t while (l < r) {\\n    \\t\\t int mid = (l + r) / 2;\\n    \\t\\t if (nums[mid] < nums[r]) {\\n    \\t\\t\\t r = mid;\\n    \\t\\t } else if (nums[mid] > nums[r]){\\n    \\t\\t\\t l = mid + 1;\\n    \\t\\t } else {  \\n    \\t\\t\\t r--;  //nums[mid]=nums[r] no idea, but we can eliminate nums[r];\\n    \\t\\t }\\n    \\t }\\n    \\t return nums[l];\\n    }"
		},
		{
			"lc_ans_id":"48815",
			"view":"2760",
			"top":"3",
			"title":"Only two more lines code on top of the solution for Part I",
			"vote":"17",
			"content":"    public class Solution {\\n        public int findMin(int[] nums) {\\n            if (nums == null || nums.length == 0) {\\n                return Integer.MIN_VALUE;\\n            }\\n            \\n            int start = 0, end = nums.length - 1;\\n            \\n            //only need to add the following while loop on top of the solution \\n            //for Part I\\n            //if two line segments have overlap, remove the overlap.\\n            //so, the problem can be solved as Part I\\n            while (nums[end] == nums[start] && end > start) {\\n                end--;\\n            }\\n            \\n            while (start < end) {\\n                //if the linear monotonically increasing in [start, end]\\n                if (nums[start] < nums[end]) {\\n                    return nums[start];\\n                }\\n                \\n                int mid = start + (end - start) / 2;\\n                if (nums[mid] >= nums[start]) {\\n                    start = mid + 1;\\n                }\\n                else {\\n                    end = mid;\\n                }\\n            }\\n            \\n            return nums[start];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"48812",
			"view":"3292",
			"top":"4",
			"title":"My C++ solution 24ms is there any better solution ?",
			"vote":"12",
			"content":"    class Solution {\\n    public:\\n    int findMin(vector<int> &num) {\\n        int start = 0;\\n        int end = num.size()-1;\\n        int mid;\\n        while(start<end){\\n            if(num[start]<num[end])\\n            break;\\n            mid = start+(end-start)/2;\\n            if(num[mid]>num[end]){\\n                start = mid+1;\\n            }\\n            else if(num[mid]==num[end]){\\n                start++;\\n                end--;\\n            }\\n            else\\n            end= mid;\\n        }\\n        return num[start];\\n     }\\n    };"
		},
		{
			"lc_ans_id":"48883",
			"view":"1756",
			"top":"5",
			"title":"8ms 13-lines C++ Solution",
			"vote":"10",
			"content":"This problem is more or less the same as [Find Minimum in Rotated Sorted Array][1]. And one key difference is as stated in the solution tag. That is, due to duplicates, we may not be able to throw one half sometimes. And in this case, we could just apply linear search and the time complexity will become `O(n)`.\\n\\nThe idea to solve this problem is still to use invariants. We set `l` to be the left pointer and `r` to be the right pointer. Since duplicates exist, the invatiant is `nums[l] >= nums[r]` (if it does not hold, then `nums[l]` will simply be the minimum). We then begin binary search by comparing `nums[l], nums[r]` with `nums[mid]`.\\n\\n 1. If `nums[l] = nums[r] = nums[mid]`, simply apply linear search within `nums[l..r]`.\\n 2. If `nums[mid] <= nums[r]`, then the mininum cannot appear right to `mid`, so set `r = mid`;\\n 3. If `nums[mid] > nums[r]`, then `mid` is in the first larger half and `r` is in the second smaller half, so the minimum is to the right of `mid`: set `l = mid + 1`.\\n\\nThe code is as follows.\\n\\n    class Solution {\\n    public:\\n        int findMin(vector<int>& nums) {\\n            int l = 0, r = nums.size() - 1;\\n            while (nums[l] >= nums[r]) {\\n                int mid = (l & r) + ((l ^ r) >> 1);\\n                if (nums[l] == nums[r] && nums[mid] == nums[l])\\n                    return findMinLinear(nums, l, r);\\n                if (nums[mid] <= nums[r]) r = mid;\\n                else l = mid + 1;\\n            }\\n            return nums[l];\\n        } \\n    private:\\n        int findMinLinear(vector<int>& nums, int l, int r) {\\n            int minnum = nums[l];\\n            for (int p = l + 1; p <= r; p++)\\n                minnum = min(minnum, nums[p]);\\n            return minnum;\\n        }\\n    };\\n\\n[1]: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
		},
		{
			"lc_ans_id":"48977",
			"view":"1693",
			"top":"6",
			"title":"Rough sketch of proof why O(lg N) is impossible",
			"vote":"10",
			"content":"Refer to this image:  ![array config][1]\\n\\nBig version here: http://postimg.org/image/asbbeo2c9/\\n\\nThere are generally 3 types of array config, assuming sorted from smallest to biggest. x-axis is the array index, y-axis is the element value.\\n\\nFor non-duplicate case, you may use `num[mid] > num[end]` to distinguish (1)&(2) from (3), and thus safely eliminate half of the array, at each iteration.\\n\\n\\nFor dup case, it is not as straightforward (impossible?)  to distinguish between (1), (2) and (3), and hence eliminate half of the array by doing O(1) comparison, at each iteration.\\n\\n\\n  [1]: http://s28.postimg.org/asbbeo2c9/Photo_16_11_14_2_38_34_pm.jpg"
		},
		{
			"lc_ans_id":"48828",
			"view":"966",
			"top":"7",
			"title":"Python solution. Worst case O(N)",
			"vote":"7",
			"content":"\\n    def findMin(self, nums):\\n        beg = 0\\n        end = len(nums)-1\\n        while beg <= end:\\n            while beg < end and nums[beg] == nums[beg + 1]:\\n                beg += 1\\n            while end > beg and nums[end] == nums[end - 1]:\\n                end -= 1\\n            if beg == end:\\n                return nums[beg]\\n            \\n            mid = (beg+end)/2\\n            if nums[mid] > nums[end]:\\n                beg = mid + 1\\n            else:\\n                end = mid\\n            \\n                \\n        return nums[beg]"
		},
		{
			"lc_ans_id":"48997",
			"view":"1721",
			"top":"8",
			"title":"My accepted java code",
			"vote":"6",
			"content":"The runtime is O(n). I don't think it can be faster\\n\\n    public int findMin(int[] num) {\\n            if(num == null || num.length == 0) {\\n                return -1; // should throw an exception, not sure if leetcode supports it\\n            }\\n            int l = 0;\\n            int r = num.length-1;\\n            while(l < r) {\\n                if(num[l] < num[r]) {\\n                    return num[l];\\n                }\\n                int m = l + (r-l)/2;\\n                if(num[l] > num[m]) {\\n                    r = m;\\n                } else if(num[l] < num[m]) {\\n                    l = m+1;\\n                } else { // num[l] == num[m]\\n                    if(num[l] == num[r]) {\\n                        l++;\\n                        r--;\\n                    } else { // only the num[l] == num[m] >  num[r] case left\\n                        l = m+1;\\n                    }\\n                }\\n            }\\n            return num[l];\\n        }"
		},
		{
			"lc_ans_id":"48827",
			"view":"1590",
			"top":"9",
			"title":"Solution in C++, well-explained",
			"vote":"4",
			"content":"### Solution\\nIn a rotate array, there will be a position where the `sequence changes`, no longer ascending and that number will be the minimum we are searching for. Accordingly, we can adopt binary searching to find it out and the key will be that `sequence change`. Let's suppose `l` and `r` will be the start and the end of the array and `m` is the middle between them.\\n\\n- First, if `nums[m] > nums[r]` then the `sequence change` number will be between m and r.\\n- Second, if `nums[m] < nums[r]`, then the `sequence change` number will be between l and m.\\n- Third, if there exist duplicates and result in `nums[m]==nums[r]` then we will not know that that `sequence change` number but one thing for sure, `nums[r]` will not be the minimum so we can just move the `r` backward to eliminate `nums[r]` by `r--`, which can then be able to terminate the searching properly.\\n\\nThe third part is the essential, which delicately handle the duplicates and terminate the searching elegantly.\\n\\n```\\nclass Solution {\\npublic:\\n    int findMin(vector<int>& nums) {\\n        int l = 0, r = nums.size()-1;\\n        while(l < r){\\n            int m = l+((r-l)>>1);\\n            if(nums[m] < nums[r]) r = m;\\n            else if(nums[m] > nums[r]) l = m+1;\\n            else r--;\\n        }\\n        return nums[l];\\n    }\\n};\\n```\\n\\nAlways welcome new ideas and `practical` tricks, just leave them in the comments!"
		}
	],
	"id":"154",
	"title":"Find Minimum in Rotated Sorted Array II",
	"content":"<blockquote>\r\n<p><i>Follow up</i> for \"Find Minimum in Rotated Sorted Array\":<br />\r\nWhat if <i>duplicates</i> are allowed?</p>\r\n\r\n<p>Would this affect the run-time complexity? How and why?</p>\r\n</blockquote>\r\n\r\n<p>Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.</p>\r\n\r\n<p>(i.e., <code>0 1 2 4 5 6 7</code> might become <code>4 5 6 7 0 1 2</code>).</p>\r\n\r\n<p>Find the minimum element.</p>\r\n\r\n<p>The array may contain duplicates.</p>",
	"frequency":"389",
	"ac_num":"90602"
}