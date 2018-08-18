{
	"difficulty":"2",
	"submit_num":"341947",
	"show_id":"81",
	"leetcode_id":"81",
	"answers":[
		{
			"lc_ans_id":"28194",
			"view":"23894",
			"top":"0",
			"title":"C++ concise log(n) solution",
			"vote":"61",
			"content":"    class Solution {\\n    public:\\n      bool search(int A[], int n, int target) {\\n        int lo =0, hi = n-1;\\n        int mid = 0;\\n        while(lo<hi){\\n              mid=(lo+hi)/2;\\n              if(A[mid]==target) return true;\\n              if(A[mid]>A[hi]){\\n                  if(A[mid]>target && A[lo] <= target) hi = mid;\\n                  else lo = mid + 1;\\n              }else if(A[mid] < A[hi]){\\n                  if(A[mid]<target && A[hi] >= target) lo = mid + 1;\\n                  else hi = mid;\\n              }else{\\n                  hi--;\\n              }\\n              \\n        }\\n        return A[lo] == target ? true : false;\\n      }\\n    };"
		},
		{
			"lc_ans_id":"28218",
			"view":"7344",
			"top":"1",
			"title":"My 8ms C++ solution (o(logn) on average, o(n) worst case)",
			"vote":"56",
			"content":"The idea is the same as the previous one without duplicates\\n\\n    1) everytime check if targe == nums[mid], if so, we find it.\\n    2) otherwise, we check if the first half is in order (i.e. nums[left]<=nums[mid]) \\n      and if so, go to step 3), otherwise, the second half is in order,   go to step 4)\\n    3) check if target in the range of [left, mid-1] (i.e. nums[left]<=target < nums[mid]), if so, do search in the first half, i.e. right = mid-1; otherwise, search in the second half left = mid+1;\\n    4)  check if target in the range of [mid+1, right] (i.e. nums[mid]<target <= nums[right]), if so, do search in the second half, i.e. left = mid+1; otherwise search in the first half right = mid-1;\\n\\nThe only difference is that due to the existence of duplicates, we can have nums[left] == nums[mid] and in that case, the first half could be out of order (i.e. NOT in the ascending order, e.g. [3 1 2 3 3 3 3]) and we have to deal this case separately. In that case, it is guaranteed that nums[right] also equals to nums[mid], so what we can do is to check if nums[mid]== nums[left] == nums[right] before the original logic, and if so, we can move left and right both towards the middle by 1. and repeat.  \\n\\n    class Solution {\\n    public:\\n        bool search(vector<int>& nums, int target) {\\n            int left = 0, right =  nums.size()-1, mid;\\n            \\n            while(left<=right)\\n            {\\n                mid = (left + right) >> 1;\\n                if(nums[mid] == target) return true;\\n    \\n                // the only difference from the first one, trickly case, just updat left and right\\n                if( (nums[left] == nums[mid]) && (nums[right] == nums[mid]) ) {++left; --right;}\\n    \\n                else if(nums[left] <= nums[mid])\\n                {\\n                    if( (nums[left]<=target) && (nums[mid] > target) ) right = mid-1;\\n                    else left = mid + 1; \\n                }\\n                else\\n                {\\n                    if((nums[mid] < target) &&  (nums[right] >= target) ) left = mid+1;\\n                    else right = mid-1;\\n                }\\n            }\\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"28212",
			"view":"25569",
			"top":"2",
			"title":"When there are duplicates, the worst case is O(n). Could we do better?",
			"vote":"29",
			"content":"Since we will have some duplicate elements in this problem, it is a little tricky because sometimes we cannot decide whether to go to the left side or right side. So for this condition, I have to probe both left  and right side simultaneously to decide which side we need to find the number. Only in this condition, the time complexity may be *O(n)*. The rest conditions are always *O(log n)*.\\n\\nFor example:\\n\\ninput: `113111111111`,  Looking for *target* `3`.\\n\\nIs my solution correct? My code is as followed:\\n\\n    public class Solution {\\n        public boolean search(int[] A, int target) {\\n            // IMPORTANT: Please reset any member data you declared, as\\n            // the same Solution instance will be reused for each test case.\\n            int i = 0;\\n            int j = A.length - 1;\\n            while(i <= j){\\n                int mid = (i + j) / 2;\\n                if(A[mid] == target)\\n                    return true;\\n                else if(A[mid] < A[i]){\\n                    if(target > A[j])\\n                        j = mid - 1;\\n                    else if(target < A[mid])\\n                        j = mid - 1;\\n                    else\\n                        i = mid + 1;\\n                }else if(A[mid] > A[i]){\\n                    if(target < A[mid] && target >= A[i])\\n                        j = mid - 1;\\n                    else\\n                        i = mid + 1;\\n                }else{ // A[mid] == A[i]\\n                    if(A[mid] != A[j])\\n                        i = mid + 1;\\n                    else{\\n                        boolean flag = true;\\n                        for(int k = 1; mid - k >= i && mid + k <= j; k++){\\n                            if(A[mid] != A[mid - k]){\\n                                j = mid - k;\\n                                flag = false;\\n                                break;\\n                            }else if(A[mid] != A[mid + k]){\\n                                i = mid + k;\\n                                flag = false;\\n                                break;\\n                            }\\n                        }\\n                        if(flag)\\n                            return false;\\n                    }\\n                }\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"28202",
			"view":"12955",
			"top":"3",
			"title":"Neat JAVA solution using binary search",
			"vote":"26",
			"content":"        public boolean search(int[] nums, int target) {\\n            int start = 0, end = nums.length - 1, mid = -1;\\n            while(start <= end) {\\n                mid = (start + end) / 2;\\n                if (nums[mid] == target) {\\n                    return true;\\n                }\\n                //If we know for sure right side is sorted or left side is unsorted\\n                if (nums[mid] < nums[end] || nums[mid] < nums[start]) {\\n                    if (target > nums[mid] && target <= nums[end]) {\\n                        start = mid + 1;\\n                    } else {\\n                        end = mid - 1;\\n                    }\\n                //If we know for sure left side is sorted or right side is unsorted\\n                } else if (nums[mid] > nums[start] || nums[mid] > nums[end]) {\\n                    if (target < nums[mid] && target >= nums[start]) {\\n                        end = mid - 1;\\n                    } else {\\n                        start = mid + 1;\\n                    }\\n                //If we get here, that means nums[start] == nums[mid] == nums[end], then shifting out\\n                //any of the two sides won't change the result but can help remove duplicate from\\n                //consideration, here we just use end-- but left++ works too\\n                } else {\\n                    end--;\\n                }\\n            }\\n            \\n            return false;\\n        }\\n\\nIn case anyone wonders, yes I agree that we don't need to check two parts. It's just that Doing that can slightly boost the performance, no asymptotic difference though."
		},
		{
			"lc_ans_id":"28224",
			"view":"6916",
			"top":"4",
			"title":"Medium level question is follow up for a hard level question?",
			"vote":"17",
			"content":"It says this problem is a follow up for Search in Rotated Sorted Array.\\n\\nSearch in Rotated Sorted Array is a hard level question.\\n\\nIt is kinda un-intuitive for a medium level question to be a follow up for a hard question since I am doing all medium level questions first before I do hard level questions.\\n\\nIf this problem is easier than Search in Rotated Sorted Array, then I think Search in Rotated Sorted Array should be the follow up problem for this, not the other way around."
		},
		{
			"lc_ans_id":"28195",
			"view":"3121",
			"top":"5",
			"title":"Python easy to understand solution (with comments).",
			"vote":"17",
			"content":"        \\n    def search(self, nums, target):\\n        l, r = 0, len(nums)-1\\n        while l <= r:\\n            mid = l + (r-l)//2\\n            if nums[mid] == target:\\n                return True\\n            while l < mid and nums[l] == nums[mid]: # tricky part\\n                l += 1\\n            # the first half is ordered\\n            if nums[l] <= nums[mid]:\\n                # target is in the first half\\n                if nums[l] <= target < nums[mid]:\\n                    r = mid - 1\\n                else:\\n                    l = mid + 1\\n            # the second half is ordered\\n            else:\\n                # target is in the second half\\n                if nums[mid] < target <= nums[r]:\\n                    l = mid + 1\\n                else:\\n                    r = mid - 1\\n        return False"
		},
		{
			"lc_ans_id":"28295",
			"view":"2066",
			"top":"6",
			"title":"Easy C++ Solution based on Version I of the Problem",
			"vote":"13",
			"content":"For those who have already solved **Search in Rotated Sorted Array**, this problem can be solved similarly using codes for that problem and simply adding codes to skip the duplicates.\\n\\nFor **Search in Rotated Sorted Array**, I post solutions in C/C++/Python [here][1] (C and C++ only needs 11 lines). \\n\\nNow, based on the above codes, you can solve this problem by simply adding two lines to skip duplicates both starting from left and right.\\n\\n    class Solution {\\n    public: \\n        bool search(vector<int>& nums, int target) {\\n            int l = 0, r = nums.size() - 1;\\n            while (l <= r) {\\n                while (l < r && nums[l] == nums[l + 1]) l++; // skip duplicates from the left\\n                while (r > l && nums[r] == nums[r - 1]) r--; // skip duplicates from the right\\n                int mid = (l + r) / 2;\\n                if (nums[mid] == target) return true; \\n                if (nums[mid] > target) {\\n                    if (nums[l] <= target || nums[mid] < nums[l]) r = mid - 1;\\n                    else l = mid + 1;\\n                }\\n                else {\\n                    if (nums[l] > target || nums[mid] >= nums[l]) l = mid + 1;\\n                    else r = mid - 1;\\n                }\\n            } \\n            return false;\\n        }\\n    }; \\n\\n  [1]: https://leetcode.com/discuss/46655/11-lines-c-c-python-solutions"
		},
		{
			"lc_ans_id":"28272",
			"view":"1114",
			"top":"7",
			"title":"Simple C++ solution explained",
			"vote":"8",
			"content":"To see more details about the thought process, please go to my other [post][1]. The only difference here comparing to \"[33. Search in Rotated Sorted Array(Hard)][2]\" is to add a separate condition check for nums[mid] == nums[r], because here we can't decide which side to take, only knowing that nums[r] is not equal to target, so move r to the left one step at a time, which may potentially cause the runtime to go linear which may answer the follow up question.\\n\\n    class Solution {\\n    public:\\n        bool search(vector<int>& nums, int target) {\\n            int l = 0, r = nums.size() - 1;        \\n            while(l <= r){  \\n                int mid = l + (r - l) / 2;            \\n                if(nums[mid] == target) return true;\\n                if(nums[mid] > nums[r]){\\n                    if(target > nums[mid] || target <= nums[r]) l = mid + 1;    \\n                    else r = mid - 1;                                                               \\n                }else if(nums[mid] == nums[r]){\\n                    r --;   // may cause linear time here, e.g. [7, 8, 9, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], search for 0\\n                }\\n                else{\\n                    if(target <= nums[r] && target > nums[mid]) l = mid + 1; \\n                    else r = mid - 1;                                                               \\n                }\\n            }\\n            return false;        \\n        }\\n    };\\n\\n\\n  [1]: https://leetcode.com/discuss/94276/simple-concise-solution-detailed-explanation-thought-process\\n  [2]: https://leetcode.com/problems/search-in-rotated-sorted-array/"
		},
		{
			"lc_ans_id":"28286",
			"view":"2289",
			"top":"8",
			"title":"Java solution with comments",
			"vote":"6",
			"content":"    public boolean search(int[] A, int target) {\\n        int start = 0;\\n        int end = A.length - 1;\\n        while (start <= end) {\\n            int mid = start + (end - start) / 2;\\n            if (A[mid] == target) // case 0\\n                return true;\\n            // finally start == mid == end, if case 0, return true, else end the loop\\n            else if (A[start] == A[mid])\\n                start++;\\n            else if (A[end] == A[mid])\\n                end--;\\n            else if (A[start] <= target && target <= A[mid]) // case 1\\n                end = mid;\\n            else if (A[mid] < target && target <= A[end]) // case 2\\n                start = mid + 1;\\n            else if (A[start] > A[mid]) // case 2 is false, so target in this range\\n                end = mid;\\n            else   // case A[mid] > A[end] and case 1 is false, similar to above\\n                start = mid + 1;\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"28216",
			"view":"1304",
			"top":"9",
			"title":"Java 1ms binary search solution with comments",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public boolean search(int[] nums, int target) {\\n        // note here end is initialized to len instead of (len-1)\\n        int start = 0, end = nums.length;\\n        while (start < end) {\\n            int mid = (start + end) / 2;\\n            if (nums[mid] == target) return true;\\n            if (nums[mid] > nums[start]) { // nums[start..mid] is sorted\\n                // check if target in left half\\n                if (target < nums[mid] && target >= nums[start]) end = mid;\\n                else start = mid + 1;\\n            } else if (nums[mid] < nums[start]) { // nums[mid..end] is sorted\\n                // check if target in right half\\n                if (target > nums[mid] && target < nums[start]) start = mid + 1;\\n                else end = mid;\\n            } else { // have no idea about the array, but we can exclude nums[start] because nums[start] == nums[mid]\\n                start++;\\n            }\\n        }\\n        return false;\\n    }\\n}\\n```"
		}
	],
	"id":"81",
	"title":"Search in Rotated Sorted Array II",
	"content":"<blockquote>\r\n<p><i>Follow up</i> for \"Search in Rotated Sorted Array\":<br />\r\nWhat if <i>duplicates</i> are allowed?</p>\r\n\r\n<p>Would this affect the run-time complexity? How and why?</p>\r\n</blockquote>\r\n\r\n<p>Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.</p>\r\n\r\n<p>(i.e., <code>0 1 2 4 5 6 7</code> might become <code>4 5 6 7 0 1 2</code>).</p>\r\n\r\n<p>Write a function to determine if a given target is in the array.</p>\r\n\r\n<p>The array may contain duplicates.</p>",
	"frequency":"344",
	"ac_num":"111855"
}