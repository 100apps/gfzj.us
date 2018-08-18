{
	"difficulty":"2",
	"submit_num":"444348",
	"show_id":"153",
	"leetcode_id":"153",
	"answers":[
		{
			"lc_ans_id":"48493",
			"view":"26712",
			"top":"0",
			"title":"Compact and clean C++ solution",
			"vote":"123",
			"content":"Classic binary search problem. \\n\\nLooking at subarray with index [start,end]. We can find out that if the first member is less than the last member, there's no rotation in the array. So we could directly return the first element in this subarray.\\n\\nIf the first element is larger than the last one, then we compute the element in the middle, and compare it with the first element. If  value of the element in the middle is larger than the first element, we know the rotation is at the second half of this array. Else, it is in the first half in the array.\\n \\nWelcome to put your comments and suggestions.\\n \\n\\n     int findMin(vector<int> &num) {\\n            int start=0,end=num.size()-1;\\n            \\n            while (start<end) {\\n                if (num[start]<num[end])\\n                    return num[start];\\n                \\n                int mid = (start+end)/2;\\n                \\n                if (num[mid]>=num[start]) {\\n                    start = mid+1;\\n                } else {\\n                    end = mid;\\n                }\\n            }\\n            \\n            return num[start];\\n        }\\n\\nSome corner cases will be discussed  [here][1]\\n\\n\\n \\n\\n\\n  [1]: http://changhaz.wordpress.com/2014/10/15/leetcode-find-minimum-in-rotated-sorted-array/"
		},
		{
			"lc_ans_id":"48499",
			"view":"8724",
			"top":"1",
			"title":"4ms simple C++ code with explanation",
			"vote":"40",
			"content":"In this problem, we have only three cases. \\n\\nCase 1. The leftmost value is less than the rightmost value in the list: This means that the list is not rotated. \\ne.g>  [1 2 3 4 5 6 7 ]\\n\\nCase 2. The value in the middle of the list is greater than the leftmost and rightmost values in the list. \\ne.g>  [ 4 5 6 7 0 1 2 3 ]\\n\\nCase 3. The value in the middle of the list is less than the leftmost and rightmost values in the list. \\ne.g>  [ 5 6 7 0 1 2 3 4 ]\\n\\nAs you see in the examples above, if we have case 1, we just return the leftmost value in the list. If we have case 2, we just move to the right side of the list. If we have case 3 we need to move to the left side of the list. \\n\\nFollowing is the code that implements the concept described above.\\n\\n    int findMin(vector<int>& nums) {\\n        int left = 0,  right = nums.size() - 1;\\n        while(left < right) {\\n            if(nums[left] < nums[right]) \\n                return nums[left];\\n                \\n            int mid = (left + right)/2;\\n            if(nums[mid] > nums[right])\\n                left = mid + 1;\\n            else\\n                right = mid;\\n        }\\n        \\n        return nums[left];\\n    }"
		},
		{
			"lc_ans_id":"48484",
			"view":"8968",
			"top":"2",
			"title":"A concise solution with proof in the comment",
			"vote":"35",
			"content":"    class Solution {\\n    public:\\n        int findMin(vector<int> &num) {\\n            int low = 0, high = num.size() - 1;\\n            // loop invariant: 1. low < high\\n            //                 2. mid != high and thus A[mid] != A[high] (no duplicate exists)\\n            //                 3. minimum is between [low, high]\\n            // The proof that the loop will exit: after each iteration either the 'high' decreases\\n            // or the 'low' increases, so the interval [low, high] will always shrink.\\n            while (low < high) {\\n                auto mid = low + (high - low) / 2;\\n                if (num[mid] < num[high])\\n                    // the mininum is in the left part\\n                    high = mid;\\n                else if (num[mid] > num[high])\\n                    // the mininum is in the right part\\n                    low = mid + 1;\\n            }\\n    \\n            return num[low];\\n        }\\n    };"
		},
		{
			"lc_ans_id":"48486",
			"view":"8146",
			"top":"3",
			"title":"Simplest and fastest C++ solution O(lg N), you can't beat this!",
			"vote":"34",
			"content":"Binary search: basically eliminate the impossible elements by half each time by exploiting the sorted property.\\n\\n        int findMin(vector<int> &num) {\\n            int lo =0, hi = num.size()-1;\\n            while(lo<hi){\\n                  int mid=(lo+hi)/2;\\n                  if(num[mid]>num[hi]) lo=mid+1;\\n                  else hi=mid;\\n            }\\n            return num[lo];\\n        }"
		},
		{
			"lc_ans_id":"48487",
			"view":"15921",
			"top":"4",
			"title":"Java solution with binary search",
			"vote":"30",
			"content":"The minimum element must satisfy one of two conditions: 1) If rotate, A[min] < A[min - 1]; 2) If not, A[0]. Therefore, we can use binary search: check the middle element, if it is less than previous one, then it is minimum. If not, there are 2 conditions as well: If it is greater than both left and right element, then minimum element should be on its right, otherwise on its left.\\n\\n    public class Solution {\\n        public int findMin(int[] num) {\\n            if (num == null || num.length == 0) {\\n                return 0;\\n            }\\n            if (num.length == 1) {\\n                return num[0];\\n            }\\n            int start = 0, end = num.length - 1;\\n            while (start < end) {\\n                int mid = (start + end) / 2;\\n                if (mid > 0 && num[mid] < num[mid - 1]) {\\n                    return num[mid];\\n                }\\n                if (num[start] <= num[mid] && num[mid] > num[end]) {\\n                    start = mid + 1;\\n                } else {\\n                    end = mid - 1;\\n                }\\n            }\\n            return num[start];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"48589",
			"view":"3733",
			"top":"5",
			"title":"9-line java code, beats 95.14% run times",
			"vote":"18",
			"content":"if the array is indeed rotated by some pivot, there are only 2 possibilities\\n\\n> 1. a[mid] > a[left] && a[mid] > a[right], meaning we are on the bigger part, the smaller part is on our right, so go right\\n\\n> 2. a[mid] < a[left] && a[mid] < a[right], meaning we are on the smaller part, to find the smallest element, go left\\n\\nif the array is not rotated (actually one rotating cycle completed), we just need to go left, in this case a[mid] < a[right] always holds.\\n\\ncombining the cases above, we conclude that\\n> if a[mid] > a[right], go right; if a[mid] < a[right], go left.\\n\\n    public class Solution {\\n        public int findMin(int[] nums) {\\n            if (nums==null || nums.length==0) { return Integer.MIN_VALUE; } \\n            int left = 0, right = nums.length-1;\\n            while (left < right-1) {  // while (left < right-1) is a useful technique\\n                int mid = left + (right-left)/2;\\n                if (nums[mid] > nums[right]) { left = mid; }\\n                else { right = mid; }\\n            }\\n            if (nums[left] > nums[right]) { return nums[right]; }\\n            return nums[left];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"48718",
			"view":"1895",
			"top":"6",
			"title":"7-Line O(LogN) Solution",
			"vote":"16",
			"content":"    public int FindMin(int[] nums) {\\n        int left = 0, right = nums.Length - 1, mid = 0;\\n        while(left < right){\\n            mid = (left + right) >> 1;\\n            if(nums[mid] > nums[right]) left = mid + 1;\\n            else right = mid;\\n        }\\n        return nums[right];\\n    }"
		},
		{
			"lc_ans_id":"48491",
			"view":"1590",
			"top":"7",
			"title":"1-2 lines Ruby/Python",
			"vote":"12",
			"content":"Use binary search to find the first number that's less than or equal to the last.\\n\\n---\\n\\n**Ruby**\\n\\nDirect translation of the above sentence into Ruby.\\n\\n    def find_min(nums)\\n      nums.bsearch { |num| num <= nums.last }\\n    end\\n\\n---\\n\\n**Python**\\n\\nA little hack.\\n\\n    class Solution:\\n        def findMin(self, nums):\\n            self.__getitem__ = lambda i: nums[i] <= nums[-1]\\n            return nums[bisect.bisect(self, False, 0, len(nums))]"
		},
		{
			"lc_ans_id":"48619",
			"view":"2386",
			"top":"8",
			"title":"9-line python clean code",
			"vote":"12",
			"content":"Just use binary search\\n\\n    class Solution(object):\\n        def findMin(self, nums):\\n            \"\"\"\\n            :type nums: List[int]\\n            :rtype: int\\n            \"\"\"\\n            i = 0\\n            j = len(nums) - 1\\n            while i < j:\\n                m = i + (j - i) / 2\\n                if nums[m] > nums[j]:\\n                    i = m + 1\\n                else:\\n                    j = m\\n            return nums[i]"
		},
		{
			"lc_ans_id":"48748",
			"view":"1497",
			"top":"9",
			"title":"Very Simple Java Binary Search",
			"vote":"10",
			"content":"    public class Solution {\\n    public int findMin(int[] num) {\\n        int low = 0;\\n        int high = num.length - 1;\\n        while(low < high){\\n            int mid = (low + high) / 2;\\n            if(num[high] < num[mid]){\\n                low = mid + 1;\\n            } else {\\n                high = mid;\\n            }\\n        }\\n        return num[high];\\n    }\\n}"
		}
	],
	"id":"153",
	"title":"Find Minimum in Rotated Sorted Array",
	"content":"<p>Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.</p>\r\n\r\n<p>(i.e., <code>0 1 2 4 5 6 7</code> might become <code>4 5 6 7 0 1 2</code>).</p>\r\n\r\n<p>Find the minimum element.</p>\r\n\r\n<p>You may assume no duplicate exists in the array.</p>",
	"frequency":"535",
	"ac_num":"180365"
}