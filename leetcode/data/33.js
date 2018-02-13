{
	"difficulty":"2",
	"submit_num":"712889",
	"show_id":"33",
	"leetcode_id":"33",
	"answers":[
		{
			"lc_ans_id":"14425",
			"view":"73501",
			"top":"0",
			"title":"Concise O(log N) Binary search solution",
			"vote":"262",
			"content":"    class Solution {\\n    public:\\n        int search(int A[], int n, int target) {\\n            int lo=0,hi=n-1;\\n            // find the index of the smallest value using binary search.\\n            // Loop will terminate since mid < hi, and lo or hi will shrink by at least 1.\\n            // Proof by contradiction that mid < hi: if mid==hi, then lo==hi and loop would have been terminated.\\n            while(lo<hi){\\n                int mid=(lo+hi)/2;\\n                if(A[mid]>A[hi]) lo=mid+1;\\n                else hi=mid;\\n            }\\n            // lo==hi is the index of the smallest value and also the number of places rotated.\\n            int rot=lo;\\n            lo=0;hi=n-1;\\n            // The usual binary search and accounting for rotation.\\n            while(lo<=hi){\\n                int mid=(lo+hi)/2;\\n                int realmid=(mid+rot)%n;\\n                if(A[realmid]==target)return realmid;\\n                if(A[realmid]<target)lo=mid+1;\\n                else hi=mid-1;\\n            }\\n            return -1;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"14436",
			"view":"33484",
			"top":"1",
			"title":"Revised Binary Search",
			"vote":"161",
			"content":"    public class Solution {\\n    public int search(int[] A, int target) {\\n        int lo = 0;\\n        int hi = A.length - 1;\\n        while (lo < hi) {\\n            int mid = (lo + hi) / 2;\\n            if (A[mid] == target) return mid;\\n            \\n            if (A[lo] <= A[mid]) {\\n                if (target >= A[lo] && target < A[mid]) {\\n                    hi = mid - 1;\\n                } else {\\n                    lo = mid + 1;\\n                }\\n            } else {\\n                if (target > A[mid] && target <= A[hi]) {\\n                    lo = mid + 1;\\n                } else {\\n                    hi = mid - 1;\\n                }\\n            }\\n        }\\n        return A[lo] == target ? lo : -1;\\n    }\\n}"
		},
		{
			"lc_ans_id":"14435",
			"view":"19328",
			"top":"2",
			"title":"Clever idea making it simple",
			"vote":"129",
			"content":"This very nice idea is from [rantos22's solution](https://leetcode.com/discuss/66853/c-4-lines-4ms) who sadly only commented *\"You are not expected to understand that :)\"*, which I guess is the reason it's now it's hidden among the most downvoted solutions. I present an explanation and a more usual implementation.\\n\\n---\\n\\n**Explanation**\\n\\nLet's say `nums` looks like this: [12, 13, 14, 15, 16, 17, 18, 19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]\\n\\nBecause it's not fully sorted, we can't do normal binary search. But here comes the trick:\\n\\n- If target is let's say 14, then we adjust `nums` to this, where \"inf\" means infinity:  \\n[12, 13, 14, 15, 16, 17, 18, 19, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf, inf]  \\n\\n- If target is let's say 7, then we adjust `nums` to this:  \\n[-inf, -inf, -inf, -inf, -inf, -inf, -inf, -inf, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]\\n\\nAnd then we can simply do ordinary binary search.\\n\\nOf course we don't actually adjust the whole array but instead adjust only on the fly only the elements we look at. And the adjustment is done by comparing both the target and the actual element against nums[0].\\n\\n---\\n\\n**Code**\\n\\nIf `nums[mid]` and `target` are *\"on the same side\"* of `nums[0]`, we just take `nums[mid]`. Otherwise we use -infinity or +infinity as needed.\\n\\n    int search(vector<int>& nums, int target) {\\n        int lo = 0, hi = nums.size();\\n        while (lo < hi) {\\n            int mid = (lo + hi) / 2;\\n            \\n            double num = (nums[mid] < nums[0]) == (target < nums[0])\\n                       ? nums[mid]\\n                       : target < nums[0] ? -INFINITY : INFINITY;\\n                       \\n            if (num < target)\\n                lo = mid + 1;\\n            else if (num > target)\\n                hi = mid;\\n            else\\n                return mid;\\n        }\\n        return -1;\\n    }"
		},
		{
			"lc_ans_id":"14472",
			"view":"20254",
			"top":"3",
			"title":"Java AC Solution using once binary search",
			"vote":"96",
			"content":"The idea is that when rotating the array, there must be one half of the array that is still in sorted order. \\nFor example,  6 7 1 2 3 4 5, the order is disrupted from the point between 7 and 1. So when doing binary search, we can make a judgement that which part is ordered and whether the target is in that range, if yes, continue the search in that half, if not continue in the other half. \\n    \\n    \\n\\n    public class Solution {\\n        public int search(int[] nums, int target) {\\n            int start = 0;\\n            int end = nums.length - 1;\\n            while (start <= end){\\n                int mid = (start + end) / 2;\\n                if (nums[mid] == target)\\n                    return mid;\\n            \\n                if (nums[start] <= nums[mid]){\\n                     if (target < nums[mid] && target >= nums[start]) \\n                        end = mid - 1;\\n                     else\\n                        start = mid + 1;\\n                } \\n            \\n                if (nums[mid] <= nums[end]){\\n                    if (target > nums[mid] && target <= nums[end])\\n                        start = mid + 1;\\n                     else\\n                        end = mid - 1;\\n                }\\n            }\\n            return -1;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"14419",
			"view":"10684",
			"top":"4",
			"title":"Pretty short C++/Java/Ruby/Python",
			"vote":"36",
			"content":"Explanation below the codes.\\n\\n**Ruby:**\\n\\n    def search(nums, target)\\n      i = (0...nums.size).bsearch { |i|\\n        (nums[0] <= target) ^ (nums[0] > nums[i]) ^ (target > nums[i])\\n      }\\n      nums[i || 0] == target ? i : -1\\n    end\\n\\n**Ruby Golf**, just once for fun:\\n\\n    def search(n, t)\\n      i=(0...n.size).bsearch{|i|(n[0]<=t)^(n[0]>n[i])^(t>n[i])};n[i||0]==t ?i:-1\\n    end\\n\\n**Python:**\\n\\n    def search(self, nums, target):\\n        lo, hi = 0, len(nums) - 1\\n        while lo < hi:\\n            mid = (lo + hi) / 2\\n            if (nums[0] > target) ^ (nums[0] > nums[mid]) ^ (target > nums[mid]):\\n                lo = mid + 1\\n            else:\\n                hi = mid\\n        return lo if target in nums[lo:lo+1] else -1\\n\\n**Python using `bisect`:**\\n\\n    class Solution:\\n        def search(self, nums, target):\\n            self.__getitem__ = lambda i: \\\\\\n                (nums[0] <= target) ^ (nums[0] > nums[i]) ^ (target > nums[i])\\n            i = bisect.bisect_left(self, True, 0, len(nums))\\n            return i if target in nums[i:i+1] else -1\\n\\n**C++:**\\n\\n    int search(vector<int>& nums, int target) {\\n        int lo = 0, hi = int(nums.size()) - 1;\\n        while (lo < hi) {\\n            int mid = (lo + hi) / 2;\\n            if ((nums[0] > target) ^ (nums[0] > nums[mid]) ^ (target > nums[mid]))\\n                lo = mid + 1;\\n            else\\n                hi = mid;\\n        }\\n        return lo == hi && nums[lo] == target ? lo : -1;\\n    }\\n\\n**Java:**\\n\\n    public int search(int[] nums, int target) {\\n        int lo = 0, hi = nums.length - 1;\\n        while (lo < hi) {\\n            int mid = (lo + hi) / 2;\\n            if ((nums[0] > target) ^ (nums[0] > nums[mid]) ^ (target > nums[mid]))\\n                lo = mid + 1;\\n            else\\n                hi = mid;\\n        }\\n        return lo == hi && nums[lo] == target ? lo : -1;\\n    }\\n\\n---\\n\\nExplanation\\n-\\n\\nMy solutions use binary search guided by the following thoughts:\\n\\nRemember the array is sorted, except it might drop at one point.\\n\\n- **If nums[0] <= nums[i]**, then nums[0..i] is sorted (in case of \"**==**\" it's just one element, and in case of \"**<**\" there must be a drop elsewhere). So we should keep searching in nums[0..i] if the target lies in this sorted range, i.e., if `nums[0] <= target <= nums[i]`.\\n\\n- **If nums[i] < nums[0]**, then nums[0..i] contains a drop, and thus nums[i+1..end] is sorted and lies strictly between nums[i] and nums[0]. So we should keep searching in nums[0..i] if the target *doesn't* lie strictly between them, i.e., if `target <= nums[i] < nums[0]` or `nums[i] < nums[0] <= target`\\n\\nThose three cases look cyclic:\\n\\n        nums[0] <= target <= nums[i]\\n                   target <= nums[i] < nums[0]\\n                             nums[i] < nums[0] <= target\\n\\nSo I have the three checks `(nums[0] <= target)`, `(target <= nums[i])` and `(nums[i] < nums[0])`, and I want to know whether exactly two of them are true. They can't all be true or all be false (check it), so I just need to distinguish between \"two true\" and \"one true\". Parity is enough for that, so instead of adding them I xor them, which is a bit shorter and particularly helpful in Java and Ruby, because those don't let me add booleans but do let me xor them.\\n\\n(Actually while developing this I thought of permutations of nums[0], target and nums[i] and the permutation parity and saw those three checks as representing inversions, but I had trouble putting that into words and now find the above explanation much better. But it helped me get there, so I wanted to mention it here.)"
		},
		{
			"lc_ans_id":"14437",
			"view":"3359",
			"top":"5",
			"title":"Python binary search solution - O(logn) - 48ms",
			"vote":"23",
			"content":"    class Solution:\\n        # @param {integer[]} numss\\n        # @param {integer} target\\n        # @return {integer}\\n        def search(self, nums, target):\\n            if not nums:\\n                return -1\\n    \\n            low, high = 0, len(nums) - 1\\n    \\n            while low <= high:\\n                mid = (low + high) / 2\\n                if target == nums[mid]:\\n                    return mid\\n    \\n                if nums[low] <= nums[mid]:\\n                    if nums[low] <= target <= nums[mid]:\\n                        high = mid - 1\\n                    else:\\n                        low = mid + 1\\n                else:\\n                    if nums[mid] <= target <= nums[high]:\\n                        low = mid + 1\\n                    else:\\n                        high = mid - 1\\n    \\n            return -1"
		},
		{
			"lc_ans_id":"14616",
			"view":"1653",
			"top":"6",
			"title":"C++ binary search with comments; easy to read and understand",
			"vote":"14",
			"content":"    class Solution {\\n    public:\\n        int search(vector<int>& nums, int target) {\\n            int l = 0, r = nums.size()-1;\\n            while (l <= r) {\\n                int mid = (l+r) / 2;\\n                if (target == nums[mid])\\n                    return mid;\\n                // there exists rotation; the middle element is in the left part of the array\\n                if (nums[mid] > nums[r]) {\\n                    if (target < nums[mid] && target >= nums[l])\\n                        r = mid - 1;\\n                    else\\n                        l = mid + 1;\\n                }\\n                // there exists rotation; the middle element is in the right part of the array\\n                else if (nums[mid] < nums[l]) {\\n                    if (target > nums[mid] && target <= nums[r])\\n                        l = mid + 1;\\n                    else\\n                        r = mid - 1;\\n                }\\n                // there is no rotation; just like normal binary search\\n                else {\\n                    if (target < nums[mid])\\n                        r = mid - 1;\\n                    else\\n                        l = mid + 1;\\n                }\\n            }\\n            return -1;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"14659",
			"view":"3831",
			"top":"7",
			"title":"Binary Search, Java Solusion. O(log(n))",
			"vote":"14",
			"content":"    public int search(int[] A, int target) {\\n        if (A.length == 0) return -1;\\n        int L = 0, R = A.length-1;\\n        //\\n        if (target < A[L] && target > A[R]) return -1;\\n        \\n        while (L < R) {\\n            int M = (L + R)/2;\\n            if (A[M] <= A[R]) {\\n                if (target > A[M] && target <= A[R]) {\\n                    L = M+1;\\n                } else {\\n                    R = M;\\n                }\\n                \\n            } else {\\n                if (target <= A[M] && target >= A[L]) {\\n                        R = M;\\n                } else {\\n                    L = M+1;\\n                }\\n            }\\n        }\\n        if (A[L] == target) return L;\\n        else return -1;\\n    }"
		},
		{
			"lc_ans_id":"14572",
			"view":"1177",
			"top":"8",
			"title":"Share my pretty neat Java BS solution",
			"vote":"11",
			"content":"I had different versions for this problem and read several other people's solutions and I came up with this neat solution. I want to share it here and hope you like it. The idea is to compare the middle element with the left element to decide which part is in order.\\n\\n    public int search(int[] nums, int target) {\\n        if (nums == null || nums.length == 0) return -1;\\n        int l = 0, r = nums.length - 1;\\n        while (l < r) {\\n            int m = l + (r - l) / 2;\\n            if (nums[m] >= nums[l]) {\\n                if (target <= nums[m] && target >= nums[l]) r = m;\\n                else l = m + 1;\\n            } else {\\n                if (target > nums[m] && target <= nums[r]) l = m + 1;\\n                else r = m;\\n            }\\n        }\\n        return nums[l] == target ? l : -1;\\n    }"
		},
		{
			"lc_ans_id":"14646",
			"view":"1701",
			"top":"9",
			"title":"My accepted C++ codes.  O(logN)  4ms",
			"vote":"8",
			"content":"Binary search. \\n\\n    class Solution {\\n    public:\\n        int search(vector<int>& nums, int target) {\\n            if(nums.size() == 0)\\n                return -1;\\n            int left = 0;\\n            int right = nums.size()-1;\\n            while(left <= right){\\n                int mid = (left+right)/2;\\n                if(target == nums[mid])\\n                    return mid;\\n                if((nums[mid]>=nums[left] && (target>nums[mid] || (target<nums[left]))) || (nums[mid]<nums[left] && target>nums[mid] && target<=nums[right]))\\n                    left = mid + 1;\\n                else\\n                    right = mid -1;\\n            }\\n            return -1;\\n        }\\n    };"
		}
	],
	"id":"33",
	"title":"Search in Rotated Sorted Array",
	"content":"<p>Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.</p>\r\n\r\n<p>(i.e., <code>0 1 2 4 5 6 7</code> might become <code>4 5 6 7 0 1 2</code>).</p>\r\n\r\n<p>You are given a target value to search. If found in the array return its index, otherwise return -1.</p>\r\n\r\n<p>You may assume no duplicate exists in the array.</p>",
	"frequency":"526",
	"ac_num":"228614"
}