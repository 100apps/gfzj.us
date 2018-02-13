{
	"difficulty":"2",
	"submit_num":"335163",
	"show_id":"209",
	"leetcode_id":"209",
	"answers":[
		{
			"lc_ans_id":"59078",
			"view":"33145",
			"top":"0",
			"title":"Accepted clean Java O(n) solution (two pointers)",
			"vote":"188",
			"content":"    public int minSubArrayLen(int s, int[] a) {\\n      if (a == null || a.length == 0)\\n        return 0;\\n      \\n      int i = 0, j = 0, sum = 0, min = Integer.MAX_VALUE;\\n      \\n      while (j < a.length) {\\n        sum += a[j++];\\n        \\n        while (sum >= s) {\\n          min = Math.min(min, j - i);\\n          sum -= a[i++];\\n        }\\n      }\\n      \\n      return min == Integer.MAX_VALUE ? 0 : min;\\n    }"
		},
		{
			"lc_ans_id":"59103",
			"view":"19504",
			"top":"1",
			"title":"Two AC solutions in Java with time complexity of N and NLogN with explanation",
			"vote":"105",
			"content":"    public class Solution {\\n        public int minSubArrayLen(int s, int[] nums) {\\n            return solveNLogN(s, nums);\\n        }\\n        \\n        private int solveN(int s, int[] nums) {\\n            int start = 0, end = 0, sum = 0, minLen = Integer.MAX_VALUE;\\n            while (end < nums.length) {\\n                while (end < nums.length && sum < s) sum += nums[end++];\\n                if (sum < s) break;\\n                while (start < end && sum >= s) sum -= nums[start++];\\n                if (end - start + 1 < minLen) minLen = end - start + 1;\\n            }\\n            return minLen == Integer.MAX_VALUE ? 0 : minLen;\\n        }\\n    \\n        private int solveNLogN(int s, int[] nums) {\\n            int[] sums = new int[nums.length + 1];\\n            for (int i = 1; i < sums.length; i++) sums[i] = sums[i - 1] + nums[i - 1];\\n            int minLen = Integer.MAX_VALUE;\\n            for (int i = 0; i < sums.length; i++) {\\n                int end = binarySearch(i + 1, sums.length - 1, sums[i] + s, sums);\\n                if (end == sums.length) break;\\n                if (end - i < minLen) minLen = end - i;\\n            }\\n            return minLen == Integer.MAX_VALUE ? 0 : minLen;\\n        }\\n        \\n        private int binarySearch(int lo, int hi, int key, int[] sums) {\\n            while (lo <= hi) {\\n               int mid = (lo + hi) / 2;\\n               if (sums[mid] >= key){\\n                   hi = mid - 1;\\n               } else {\\n                   lo = mid + 1;\\n               }\\n            }\\n            return lo;\\n        }\\n    }\\n\\nSince the given array contains only positive integers, the subarray sum can only increase by including more elements. Therefore, you don't have to include more elements once the current subarray already has a sum large enough. This gives the linear time complexity solution by maintaining a minimum window with a two indices.\\n\\nAs to NLogN solution, logN immediately reminds you of binary search. In this case, you cannot sort as the current order actually matters. How does one get an ordered array then? Since all elements are positive, the cumulative sum must be strictly increasing. Then, a subarray sum can expressed as the difference between two cumulative sum. Hence, given a start index for the cumulative sum array, the other end index can be searched using binary search."
		},
		{
			"lc_ans_id":"59090",
			"view":"11565",
			"top":"2",
			"title":"4ms O(n) / 8ms O(nlogn) C++",
			"vote":"85",
			"content":"The problem statement has stated that there are both `O(n)` and `O(nlogn)` solutions to this problem. Let's see the `O(n)` solution first (taken from [this link][1]), which is pretty clever and short.\\n\\n    class Solution {\\n    public:\\n        int minSubArrayLen(int s, vector<int>& nums) {\\n            int n = nums.size(), start = 0, sum = 0, minlen = INT_MAX;\\n            for (int i = 0; i < n; i++) { \\n                sum += nums[i]; \\n                while (sum >= s) {\\n                    minlen = min(minlen, i - start + 1);\\n                    sum -= nums[start++];\\n                }\\n            }\\n            return minlen == INT_MAX ? 0 : minlen;\\n        }\\n    };\\n\\nWell, you may wonder how can it be `O(n)` since it contains an inner `while` loop. Well, the key is that the `while` loop executes at most once for each starting position `start`. Then `start` is increased by `1` and the `while` loop moves to the next element. Thus the inner `while` loop runs at most `O(n)` times during the whole `for` loop from `0` to `n - 1`. Thus both the `for` loop and `while` loop has `O(n)` time complexity in total and the overall running time is `O(n)`.\\n\\nThere is another `O(n)` solution in [this link][2], which is easier to understand and prove it is `O(n)`. I have rewritten it below.\\n\\n    class Solution {\\n    public:\\n        int minSubArrayLen(int s, vector<int>& nums) {\\n            int n = nums.size(), left = 0, right = 0, sum = 0, minlen = INT_MAX;\\n            while (right < n) {\\n                do sum += nums[right++];\\n                while (right < n && sum < s);\\n                while (left < right && sum - nums[left] >= s)\\n                    sum -= nums[left++];\\n                if (sum >= s) minlen = min(minlen, right - left);\\n            }\\n            return minlen == INT_MAX ? 0 : minlen;\\n        }\\n    };\\n\\nNow let's move on to the `O(nlogn)` solution. Well, this less efficient solution is far more difficult to come up with. The idea is to first maintain an array of accumulated summations of elements in `nums`. Specifically, for `nums = [2, 3, 1, 2, 4, 3]` in the problem statement, `sums = [0, 2, 5, 6, 8, 12, 15]`. Then for each element in `sums`, if it is not less than `s`, we search for the first element that is greater than `sums[i] - s` (in fact, this is just what the `upper_bound` function does) in `sums` using binary search.\\n\\nLet's do an example. Suppose we reach `12` in `sums`, which is greater than `s = 7`. We then search for the first element in `sums` that is greater than `sums[i] - s = 12 - 7 = 5` and we find `6`. Then we know that the elements in `nums` that correspond to `6, 8, 12` sum to a number `12 - 5 = 7` which is not less than `s = 7`. Let's check for that: `6` in `sums` corresponds to `1` in `nums`, `8` in `sums` corresponds to `2` in `nums`, `12` in `sums` corresponds to `4` in `nums`. `1, 2, 4` sum to `7`, which is `12` in `sums` minus `5` in `sums`.\\n\\nWe add a `0` in the first position of `sums` to account for cases like `nums = [3], s = 3`.\\n\\nThe code is as follows.\\n\\n    class Solution {\\n    public:\\n        int minSubArrayLen(int s, vector<int>& nums) {\\n            vector<int> sums = accumulate(nums);\\n            int n = nums.size(), minlen = INT_MAX;\\n            for (int i = 1; i <= n; i++) { \\n                if (sums[i] >= s) {\\n                    int p = upper_bound(sums, 0, i, sums[i] - s);\\n                    if (p != -1) minlen = min(minlen, i - p + 1);\\n                }\\n            }\\n            return minlen == INT_MAX ? 0 : minlen;\\n        }\\n    private:\\n        vector<int> accumulate(vector<int>& nums) {\\n            int n = nums.size();\\n            vector<int> sums(n + 1, 0);\\n            for (int i = 1; i <= n; i++) \\n                sums[i] = nums[i - 1] + sums[i - 1];\\n            return sums;\\n        }\\n        int upper_bound(vector<int>& sums, int left, int right, int target) {\\n            int l = left, r = right;\\n            while (l < r) {\\n                int m = l + ((r - l) >> 1);\\n                if (sums[m] <= target) l = m + 1;\\n                else r = m;\\n            }\\n            return sums[r] > target ? r : -1;\\n        }\\n    };  \\n\\n  [1]: https://leetcode.com/discuss/35464/c-simple-o-n-solution\\n  [2]: https://leetcode.com/discuss/35678/c-6ms-solution-sliding-window"
		},
		{
			"lc_ans_id":"59123",
			"view":"8393",
			"top":"3",
			"title":"O(N),O(NLogN) solutions, both O(1) space",
			"vote":"68",
			"content":"O(N) - keep a moving window expand until sum>=s, then shrink util sum<s. Each time after shrinking, update length. (similar to other solutions, just removed unnecessary min value assignment)\\n\\n    public class Solution {\\n        public int minSubArrayLen(int s, int[] nums) {\\n            int i = 0, j = 0, sum = 0, min = Integer.MAX_VALUE;\\n            while (j < nums.length) {\\n                while (sum < s && j < nums.length) sum += nums[j++];\\n                if(sum>=s){\\n                    while (sum >= s && i < j) sum -= nums[i++];\\n                    min = Math.min(min, j - i + 1);\\n                }\\n            }\\n            return min == Integer.MAX_VALUE ? 0 : min;\\n        }\\n    }\\n\\n\\n\\n\\nO(NLogN) - search if a window of size k exists that satisfy the condition\\n\\n    public class Solution {\\n        public int minSubArrayLen(int s, int[] nums) {\\n            int i = 1, j = nums.length, min = 0;\\n            while (i <= j) {\\n                int mid = (i + j) / 2;\\n                if (windowExist(mid, nums, s)) {\\n                    j = mid - 1;\\n                    min = mid;\\n                } else i = mid + 1;\\n            }\\n            return min;\\n        }\\n    \\n    \\n        private boolean windowExist(int size, int[] nums, int s) {\\n            int sum = 0;\\n            for (int i = 0; i < nums.length; i++) {\\n                if (i >= size) sum -= nums[i - size];\\n                sum += nums[i];\\n                if (sum >= s) return true;\\n            }\\n            return false;\\n        }\\n    }\\n\\n\\nAnother O(NLogN) solution that first calculate cumulative sum and then for each starting point binary search for end position. This uses O(N) space\\n\\n    public class Solution {\\n     public int minSubArrayLen(int s, int[] nums) {\\n            int sum = 0, min = Integer.MAX_VALUE;\\n    \\n            int[] sums = new int[nums.length];\\n            for (int i = 0; i < nums.length; i++)\\n                sums[i] = nums[i] + (i == 0 ? 0 : sums[i - 1]);\\n    \\n            for (int i = 0; i < nums.length; i++) {\\n                int j = findWindowEnd(i, sums, s);\\n                if (j == nums.length) break;\\n                min = Math.min(j - i + 1, min);\\n            }\\n            \\n            return min == Integer.MAX_VALUE ? 0 : min;\\n        }\\n    \\n        private int findWindowEnd(int start, int[] sums, int s) {\\n            int i = start, j = sums.length - 1, offset = start == 0 ? 0 : sums[start - 1];\\n            while (i <= j) {\\n                int m = (i + j) / 2;\\n                int sum = sums[m] - offset;\\n            if (sum >= s) j = m - 1;\\n            else i = m + 1;\\n        }\\n        return i;\\n    }\\n}"
		},
		{
			"lc_ans_id":"59110",
			"view":"3791",
			"top":"4",
			"title":"O(N)  template for Minimum Size Subarray Sum & Minimum Window Substring & Longest Substring Without Repeating Characters",
			"vote":"42",
			"content":"First , I will show you the solution of this problem,\\n\\n    class Solution {\\n    public:\\n        int minSubArrayLen(int s, vector<int>& nums) {\\n            int start=0, end=0;\\n            int minLen=INT_MAX, sum=0;\\n            while(end<nums.size()){\\n                if(sum<s) sum+=nums[end];\\n                end++;\\n                while(sum>=s){\\n                    if(end-start<minLen)\\n                        minLen=end-start;\\n                    sum-=nums[start];\\n                    start++;\\n                }\\n            }\\n            return minLen==INT_MAX ? 0 : minLen;\\n        }\\n    };\\n\\nNext, let me show you the solution to the problem \"Minimum Window Substring\"\\n\\n    class Solution {\\n    public:\\n        string minWindow(string s, string t) {\\n            vector<int> v(128, 0);\\n            for(auto c:t) v[c]++;\\n            int start=0, end=0, counter=t.size();\\n            int m_start=0, m_len=INT_MAX;\\n            while(end<s.size()){\\n                if(v[s[end]]>0)  counter--;\\n                v[s[end]]--;\\n                end++;\\n                /** loop from start to check whether we can find more short string **/\\n                while(counter==0){\\n                    if(m_len>end-start){\\n                        m_start=start;\\n                        m_len=end-start;\\n                    }\\n                    v[s[start]]++;\\n                    if(v[s[start]]>0) counter++;\\n                    start++;\\n                }\\n            }\\n            return m_len==INT_MAX ? \"\" : s.substr(m_start, m_len);\\n        }\\n    };\\n\\nThe solution for the problem \"Longest Substring Without Repeating Characters\" can also be solved in the \\n\\nsame pattern .\\n\\nHere is the solution for \"Longest Substring Without Repeating Characters\"\\n\\n    class Solution {\\n    public:\\n        int lengthOfLongestSubstring(string s) {\\n            vector<int> v(128, 0);\\n            int start=0, end=0;\\n            int m_len=INT_MIN;\\n            while(end<s.size()){\\n                if(v[s[end]]==0) m_len=max(m_len, end-start+1);\\n                v[s[end]]++;\\n                end++;\\n                while(v[s[end]]>0){\\n                    v[s[start]]--;\\n                    start++;\\n                }\\n            }\\n            return m_len==INT_MIN ? 0 : m_len;\\n        }\\n    };\\n\\nAs you can see, they all follow the same pattern !\\n\\nThis post deserves your up vote!"
		},
		{
			"lc_ans_id":"59091",
			"view":"5850",
			"top":"5",
			"title":"C++ Simple O(n) solution",
			"vote":"40",
			"content":"    class Solution {\\n    public:\\n    int minSubArrayLen(int s, vector<int>& nums) {\\n        int firstPos = 0, sum = 0, minLength = INT_MAX;\\n        for(int i = 0; i<nums.size(); i++) {\\n            sum += nums[i];\\n            while(sum >= s) {\\n                minLength = min(minLength, i - firstPos + 1);\\n                sum -= nums[firstPos++];\\n            }\\n        }\\n        \\n        return minLength == INT_MAX? 0 : minLength;\\n      }\\n    };"
		},
		{
			"lc_ans_id":"59144",
			"view":"2345",
			"top":"6",
			"title":"1 ms O(n) time solution in Java - dynamic sliding window",
			"vote":"20",
			"content":"We will maintain a window that grows until sum reach the given sum. Once the window grows to sum at least s then we can start shirking the window from left with the hope to find a smaller window. We shrink until sum falls below s. Then we can grow the window on right again and so on. We keep this procedure of growing-shrinking until the window start reaches the end of the array. Below is the implementation of the above idea which runs in O(n) time and O(1) space. \\n\\n\\n\\n    public class Solution {\\n        public int minSubArrayLen(int sum, int[] nums) {\\n            int minlen = Integer.MAX_VALUE;\\n    \\t\\tint curSum = 0;\\n    \\t\\tint start = 0;\\n    \\t\\tint end = 0;\\n    \\t\\t\\n    \\t\\twhile(start < nums.length){\\n    \\t\\t\\t//if current window doesn't add up to the given sum then \\n    \\t\\t\\t//strech the window to right\\n    \\t\\t\\tif(curSum < sum && end < nums.length){\\n    \\t\\t\\t\\tcurSum += nums[end];\\n    \\t\\t\\t\\tend++;\\n    \\t\\t\\t}\\n    \\t\\t\\t//if current window adds up to at least given sum then\\n    \\t\\t\\t//we can shrink the window \\n    \\t\\t\\telse if(curSum >= sum){\\n    \\t\\t\\t\\tminlen = Math.min(minlen, end-start);\\n    \\t\\t\\t\\tcurSum -= nums[start];\\n    \\t\\t\\t\\tstart++;\\n    \\t\\t\\t}\\n    \\t\\t\\t//cur sum less than required sum but we reach the end \\n    \\t\\t\\telse{\\n    \\t\\t\\t\\tbreak;\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\t\\n    \\t\\treturn (minlen == Integer.MAX_VALUE) ? 0 : minlen;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"59151",
			"view":"2511",
			"top":"7",
			"title":"C++ 6ms solution sliding window",
			"vote":"17",
			"content":"Any elegant way to replace do-while loop ? Look like it's the most fitting....\\n\\n    class Solution {\\n    public:\\n        int minSubArrayLen(int s, vector<int>& nums) {\\n            int num_len= nums.size();\\n            int left=0, right=0, total=0, min_len= num_len+1;\\n            while (right < num_len) {\\n                // move right silder forward till total >= s\\n                do { total += nums[right++]; } while (right<num_len && total< s);\\n                // move left slider forward while maintaining total >= s\\n                while (left<right && total-nums[left]>=s) total -= nums[left++];\\n                // record if it's the minimum\\n                if (total>=s && min_len> right- left) \\n                    min_len= right- left;\\n            }\\n            return min_len<=num_len ? min_len: 0;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"59093",
			"view":"3104",
			"top":"8",
			"title":"Python O(n) and O(n log n) solution",
			"vote":"14",
			"content":"    class Solution:\\n\\n    def minSubArrayLen(self, s, nums):\\n        total = left = 0\\n        result = len(nums) + 1\\n        for right, n in enumerate(nums):\\n            total += n\\n            while total >= s:\\n                result = min(result, right - left + 1)\\n                total -= nums[left]\\n                left += 1\\n        return result if result <= len(nums) else 0\\n\\n\\nO(n log n)\\n\\n    class Solution:\\n\\n    def minSubArrayLen(self, target, nums):\\n        result = len(nums) + 1\\n        for idx, n in enumerate(nums[1:], 1):\\n            nums[idx] = nums[idx - 1] + n\\n        left = 0\\n        for right, n in enumerate(nums):\\n            if n >= target:\\n                left = self.find_left(left, right, nums, target, n)\\n                result = min(result, right - left + 1)\\n        return result if result <= len(nums) else 0\\n\\n    def find_left(self, left, right, nums, target, n):\\n        while left < right:\\n            mid = (left + right) // 2\\n            if n - nums[mid] >= target:\\n                left = mid + 1\\n            else:\\n                right = mid\\n        return left"
		},
		{
			"lc_ans_id":"59304",
			"view":"1996",
			"top":"9",
			"title":"Java AC solution using two pointers",
			"vote":"11",
			"content":"Using two pointers to solve this question\\n\\n    public class Solution {\\n        public int minSubArrayLen(int s, int[] nums) {\\n            if(nums.length == 0)return 0;       \\n            int first = 0;\\n            int second = 0;\\n            int min = nums.length+1;\\n            int sum = nums[0];\\n            while(first<nums.length && second<=first)\\n            {\\n                \\n                if(sum<s){\\n                    first++;\\n                    if(first<nums.length)\\n                    sum+= nums[first];\\n                }\\n                else {\\n                    min = Math.min(first-second+1, min);\\n                    sum-=nums[second];\\n                    second++;\\n                    \\n                }\\n            }\\n            \\n            if(min == nums.length+1)return 0;\\n            return min;\\n        }\\n    }"
		}
	],
	"id":"209",
	"title":"Minimum Size Subarray Sum",
	"content":"<p>\r\nGiven an array of <strong>n</strong> positive integers and a positive integer <strong>s</strong>, find the minimal length of a <b>contiguous</b> subarray of which the sum &ge; <strong>s</strong>. If there isn't one, return 0 instead.\r\n</p>\r\n<p>\r\nFor example, given the array <code>[2,3,1,2,4,3]</code> and <code>s = 7</code>,<br />\r\nthe subarray <code>[4,3]</code> has the minimal length under the problem constraint.\r\n</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show more practice.</a></p>\r\n\r\n<div class=\"spoilers\"><b>More practice:</b>\r\n\r\n<p>If you have figured out the <i>O</i>(<i>n</i>) solution, try coding another solution of which the time complexity is <i>O</i>(<i>n</i> log <i>n</i>).</p>\r\n</div>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/Freezen\">@Freezen</a> for adding this problem and creating all test cases.</p>",
	"frequency":"303",
	"ac_num":"106540"
}