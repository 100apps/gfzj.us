{
	"difficulty":"2",
	"submit_num":"361919",
	"show_id":"162",
	"leetcode_id":"162",
	"answers":[
		{
			"lc_ans_id":"50232",
			"view":"41829",
			"top":"0",
			"title":"Find the maximum by binary search (recursion and iteration)",
			"vote":"227",
			"content":"Consider that each local maximum is one valid peak.\\nMy solution is to find one local maximum with binary search.\\nBinary search satisfies the O(logn) computational complexity.\\n\\nBinary Search: recursion\\n\\n    class Solution {\\n    public:\\n\\n    int findPeakElement(const vector<int> &num) {\\n        return Helper(num, 0, num.size()-1);\\n    }\\n    int Helper(const vector<int> &num, int low, int high)\\n    {\\n        if(low == high)\\n            return low;\\n        else\\n        {\\n            int mid1 = (low+high)/2;\\n            int mid2 = mid1+1;\\n            if(num[mid1] > num[mid2])\\n                return Helper(num, low, mid1);\\n            else\\n                return Helper(num, mid2, high);\\n        }\\n    }\\n    };\\n\\nBinary Search: iteration\\n\\n    class Solution {\\n    public:\\n        int findPeakElement(const vector<int> &num) \\n        {\\n            int low = 0;\\n            int high = num.size()-1;\\n            \\n            while(low < high)\\n            {\\n                int mid1 = (low+high)/2;\\n                int mid2 = mid1+1;\\n                if(num[mid1] < num[mid2])\\n                    low = mid2;\\n                else\\n                    high = mid1;\\n            }\\n            return low;\\n        }\\n    };\\n\\nSequential Search:\\n\\n    class Solution {\\n    public:\\n        int findPeakElement(const vector<int> &num) {\\n            for(int i = 1; i < num.size(); i ++)\\n            {\\n                if(num[i] < num[i-1])\\n                {// <\\n                    return i-1;\\n                }\\n            }\\n            return num.size()-1;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"50236",
			"view":"20615",
			"top":"1",
			"title":"O(logN) Solution JavaCode",
			"vote":"96",
			"content":"\\nThis problem is similar to Local Minimum. And according to the given condition, num[i] != num[i+1], there must exist a O(logN) solution. So we use binary search for this problem.\\n\\n - If  num[i-1] < num[i] > num[i+1], then num[i] is peak\\n - If num[i-1] < num[i] < num[i+1], then num[i+1...n-1] must contains a peak\\n - If num[i-1] > num[i] > num[i+1], then num[0...i-1] must contains a peak\\n - If num[i-1] > num[i] < num[i+1], then both sides have peak\\n(n is num.length)\\n\\nHere is the code\\n\\n    public int findPeakElement(int[] num) {    \\n        return helper(num,0,num.length-1);\\n    }\\n    \\n    public int helper(int[] num,int start,int end){\\n        if(start == end){\\n            return start;\\n        }else if(start+1 == end){\\n            if(num[start] > num[end]) return start;\\n            return end;\\n        }else{\\n            \\n            int m = (start+end)/2;\\n            \\n            if(num[m] > num[m-1] && num[m] > num[m+1]){\\n    \\n                return m;\\n    \\n            }else if(num[m-1] > num[m] && num[m] > num[m+1]){\\n    \\n                return helper(num,start,m-1);\\n    \\n            }else{\\n    \\n                return helper(num,m+1,end);\\n    \\n            }\\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"50239",
			"view":"8585",
			"top":"2",
			"title":"Java solution and explanation using invariants",
			"vote":"86",
			"content":"I find it useful to reason about binary search problems using invariants. While there are many solutions posted here, neither of them provide (in my opinion) a good explanation about why they work. I just spent some time thinking about this and I thought it might be a good idea to share my thoughts.\\n\\nAssume we initialize left = 0, right = nums.length - 1. The invariant I'm using is the following:\\n\\n**nums[left - 1] < nums[left] && nums[right] > nums[right + 1]**\\n\\nThat basically means that in the current interval we're looking, [left, right] the function started increasing to left and will eventually decrease at right. The behavior between [left, right] falls into the following 3 categories:\\n\\n1) nums[left] > nums[left + 1]. From the invariant, nums[left - 1] < nums[left] => left is a peak\\n\\n2) The function is increasing from left to right i.e. nums[left] < nums[left + 1] < .. < nums[right - 1] < nums[right]. From the invariant, nums[right] > nums[right + 1] => right is a peak\\n\\n3) the function increases for a while and then decreases (in which case the point just before it starts decreasing is a peak) e.g. 2 5 6 3 (6 is the point in question)\\n\\n\\nAs shown, if the invariant above holds, there is at least a peak between [left, right]. Now we need to show 2 things:\\n\\nI) the invariant is initially true. Since left = 0 and right = nums.length - 1 initially and we know that nums[-1] = nums[nums.length] = -oo, this is obviously true\\n\\nII) At every step of the loop the invariant gets reestablished. If we consider the code in the loop, we have mid = (left + right) / 2 and the following 2 cases:\\n\\na) nums[mid] < nums[mid + 1]. It turns out that the interval [mid + 1, right] respects the invariant (nums[mid] < nums[mid + 1] -> part of the cond + nums[right] > nums[right + 1] -> part of the invariant in the previous loop iteration)\\n\\nb) nums[mid] > nums[mid + 1]. Similarly, [left, mid] respects the invariant (nums[left - 1] < nums[left] -> part of the invariant in the previous loop iteration and nums[mid] > nums[mid + 1] -> part of the cond)\\n\\nAs a result, the invariant gets reestablished and it will also hold when we exit the loop. In that case we have an interval of length 2 i.e. right = left + 1. If nums[left] > nums[right], using the invariant (nums[left - 1] < nums[left]), we get that left is a peak. Otherwise right is the peak (nums[left] < nums[right] and nums[right] < nums[right + 1] from the invariant).\\n\\n    public int findPeakElement(int[] nums) {\\n        int N = nums.length;\\n        if (N == 1) {\\n            return 0;\\n        }\\n       \\n        int left = 0, right = N - 1;\\n        while (right - left > 1) {\\n            int mid = left + (right - left) / 2;\\n            if (nums[mid] < nums[mid + 1]) {\\n                left = mid + 1;\\n            } else {\\n                right = mid;\\n            }\\n        }\\n        \\n        return (left == N - 1 || nums[left] > nums[left + 1]) ? left : right;\\n    }\\n\\n\\nI hope this makes things clear despite the long explanation."
		},
		{
			"lc_ans_id":"50237",
			"view":"7931",
			"top":"3",
			"title":"A concise standard binary search solution",
			"vote":"23",
			"content":"    int findPeakElement(const vector<int> &num) {\\n        if (num.size() <= 1) return 0;\\n        int mid = 0, l = 0, h = num.size() - 1;\\n        \\n        while (l < h) {\\n            mid = (l + h) / 2;\\n            if (num[mid] > num[mid + 1])\\n                h = mid;\\n            else if (num[mid] < num[mid + 1])\\n                l = mid + 1;\\n        }\\n        \\n        return l;\\n    }"
		},
		{
			"lc_ans_id":"50259",
			"view":"2956",
			"top":"4",
			"title":"My clean and readable python solution",
			"vote":"19",
			"content":"    Basic Idea: Binary search\\n\\n    Elaboration: \\n     if an element(not the right-most one) is smaller than its right neighbor, then there must be a peak element on its right, because the elements on its right is either \\n       1. always increasing  -> the right-most element is the peak\\n       2. always decreasing  -> the left-most element is the peak\\n       3. first increasing then decreasing -> the pivot point is the peak\\n       4. first decreasing then increasing -> the left-most element is the peak  \\n\\n       Therefore, we can find the peak only on its right elements( cut the array to half)\\n\\n       The same idea applies to that an element(not the left-most one) is smaller than its left neighbor.\\n\\n\\n\\n    Conditions:\\n         1. array length is 1  -> return the only index \\n         2. array length is 2  -> return the bigger number's index \\n         3. array length is bigger than 2 -> \\n               (1) find mid, compare it with its left and right neighbors  \\n               (2) return mid if nums[mid] greater than both neighbors\\n               (3) take the right half array if nums[mid] smaller than right neighbor\\n               (4) otherwise, take the left half\\n    \\n    Run time: O(logn)\\n    Memory: constant\\n    Test cases: \\n         [1]\\n         [1,2]\\n         [2,1]\\n         [1,2,3]\\n         [3,2,1]\\n         [2,1,3]\\n    \\n    \\n    def findPeakElement(self, nums):\\n        left = 0\\n        right = len(nums)-1\\n    \\n        # handle condition 3\\n        while left < right-1:\\n            mid = (left+right)/2\\n            if nums[mid] > nums[mid+1] and nums[mid] > nums[mid-1]:\\n                return mid\\n                \\n            if nums[mid] < nums[mid+1]:\\n                left = mid+1\\n            else:\\n                right = mid-1\\n                \\n        #handle condition 1 and 2\\n        return left if nums[left] >= nums[right] else right"
		},
		{
			"lc_ans_id":"50222",
			"view":"5634",
			"top":"5",
			"title":"Sharing a more standard Binary Search C++ Solution",
			"vote":"19",
			"content":"    class Solution {\\n    public:\\n        int findPeakElement(const vector<int> &num) {\\n            int low = 0, high = num.size() - 1;\\n            while (low < high - 1) {\\n                int mid = (low + high) / 2;\\n                if (num[mid] > num[mid - 1] && num[mid] > num[mid + 1]) \\n                    return mid;\\n                else if (num[mid] > num[mid + 1]) \\n                        high = mid - 1;\\n                     else \\n                        low = mid + 1;    \\n            }\\n            return num[low] > num[high] ? low : high;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"50304",
			"view":"2433",
			"top":"6",
			"title":"Java Short and Neat Code - 10 line.",
			"vote":"17",
			"content":"        public int findPeakElement(int[] a) {\\n            int low = 0, mid = 0, high = a.length - 1;\\n            while(low < high) {\\n                mid = low + (high-low)/2;\\n                if(a[mid] < a[mid+1]) low = mid+1;\\n                else high = mid;\\n            }\\n            return low;\\n        }"
		},
		{
			"lc_ans_id":"50327",
			"view":"1021",
			"top":"7",
			"title":"General binary search in Java",
			"vote":"10",
			"content":"We want to check mid and mid+1 elements. `if(nums[mid] < nums[mid+1])`, `lo = mid + 1`, otherwise `hi = mid`.  The reason is that when there are even or odd number of elements, the mid element is always going to have a next one `mid+1`.  We don't need to consider the case when there is less than 1 element as it is not valid case for this problem.  Finally we return `lo` as it will always be a solution since it goes to `mid+1` element in the first case, which is larger.\\n\\n    public int findPeakElement(int[] nums) {\\n        int n = nums.length;\\n        int lo = 0, hi = n - 1;\\n        while(lo < hi) {\\n            int mid = lo + (hi - lo) / 2;\\n            if(nums[mid] < nums[mid+1]) {\\n                lo = mid + 1; \\n            } else {\\n                hi = mid;\\n            }\\n        }\\n        return lo;\\n    }"
		},
		{
			"lc_ans_id":"50387",
			"view":"3523",
			"top":"8",
			"title":"Java - Binary-Search Solution",
			"vote":"10",
			"content":"public class Solution {\\n    public int findPeakElement(int[] num) {\\n        int l = 0;\\n        int r = num.length-1;\\n        int mid = r/2;\\n        while (l<r){\\n            if(num[mid]<num[mid+1]){\\n                l=mid+1;\\n            }else{\\n                r=mid;\\n            }\\n            mid=(l+r)/2;\\n        }\\n        return l;\\n    }\\n}"
		},
		{
			"lc_ans_id":"50433",
			"view":"1899",
			"top":"9",
			"title":"My O(log(n)) Java solution using binary search",
			"vote":"8",
			"content":"    public class Solution {\\n        public int findPeakElement(int[] num) {\\n            for (int i = 0, j = num.length - 1, mid = j / 2; i < j; mid = (i + j) / 2) {\\n                if (mid == i) { return num[mid] > num[j] ? mid : j; }\\n                i = num[mid] < num[mid + 1] ? mid : i;\\n                j = num[mid] > num[mid + 1] ? mid : j;\\n            }\\n            return 0;\\n        }\\n    }"
		}
	],
	"id":"162",
	"title":"Find Peak Element",
	"content":"<p>A peak element is an element that is greater than its neighbors.</p>\r\n\r\n<p>Given an input array where <code>num[i] &ne; num[i+1]</code>, find a peak element and return its index.</p>\r\n\r\n<p>The array may contain multiple peaks, in that case return the index to any one of the peaks is fine.</p>\r\n\r\n<p>You may imagine that <code>num[-1] = num[n] = -&infin;</code>.</p>\r\n\r\n<p>For example, in array <code>[1, 2, 3, 1]</code>, 3 is a peak element and your function should return the index number 2.</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show spoilers.</a></p>\r\n\r\n<div class=\"spoilers\"><b>Note:</b>\r\n<p>Your solution should be in logarithmic complexity.</p>\r\n</div>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/ts\">@ts</a> for adding this problem and creating all test cases.</p>",
	"frequency":"441",
	"ac_num":"139465"
}