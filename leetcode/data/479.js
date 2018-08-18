{
	"difficulty":"2",
	"submit_num":"23078",
	"show_id":"487",
	"leetcode_id":"487",
	"answers":[
		{
			"lc_ans_id":"96920",
			"view":"7859",
			"top":"0",
			"title":"Java clean solution easily extensible to flipping k zero and follow-up handled",
			"vote":"107",
			"content":"The idea is to keep a window ```[l, h]``` that contains at most ```k``` zero\\n\\nThe following solution does not handle follow-up, because ```nums[l]``` will need to access previous input stream\\n```Time: O(n) Space: O(1)```\\n```\\n    public int findMaxConsecutiveOnes(int[] nums) {\\n        int max = 0, zero = 0, k = 1; // flip at most k zero\\n        for (int l = 0, h = 0; h < nums.length; h++) {\\n            if (nums[h] == 0)                                           \\n                zero++;\\n            while (zero > k)\\n                if (nums[l++] == 0)\\n                    zero--;                                     \\n            max = Math.max(max, h - l + 1);\\n        }                                                               \\n        return max;             \\n    }\\n```\\nNow let's deal with follow-up, we need to store up to ```k``` indexes of zero within the window ```[l, h]``` so that we know where to move ```l``` next when the window contains more than ```k``` zero. If the input stream is infinite, then the output could be extremely large because there could be super long consecutive ones. In that case we can use ```BigInteger``` for all indexes. For simplicity, here we will use ```int```\\n```Time: O(n) Space: O(k)```\\n```\\n    public int findMaxConsecutiveOnes(int[] nums) {                 \\n        int max = 0, k = 1; // flip at most k zero\\n        Queue<Integer> zeroIndex = new LinkedList<>(); \\n        for (int l = 0, h = 0; h < nums.length; h++) {\\n            if (nums[h] == 0)\\n                zeroIndex.offer(h);\\n            if (zeroIndex.size() > k)                                   \\n                l = zeroIndex.poll() + 1;\\n            max = Math.max(max, h - l + 1);\\n        }\\n        return max;                     \\n    }\\n```\\nNote that setting ```k = 0``` will give a solution to the earlier version [Max Consecutive Ones](https://leetcode.com/problems/max-consecutive-ones/)\\n\\nFor ```k = 1``` we can apply the same idea to simplify the solution. Here ```q``` stores the index of zero within the window ```[l, h]``` so its role is similar to ```Queue``` in the above solution\\n```\\n    public int findMaxConsecutiveOnes(int[] nums) {\\n        int max = 0, q = -1;\\n        for (int l = 0, h = 0; h < nums.length; h++) {\\n            if (nums[h] == 0) {\\n                l = q + 1;\\n                q = h;\\n            }\\n            max = Math.max(max, h - l + 1);\\n        }                                                               \\n        return max;             \\n    }\\n```"
		},
		{
			"lc_ans_id":"96929",
			"view":"2866",
			"top":"1",
			"title":"Java Concise O(n) Time O(1) Space",
			"vote":"26",
			"content":"```\\npublic int findMaxConsecutiveOnes(int[] nums) {\\n     int maxConsecutive = 0, zeroLeft = 0, zeroRight = 0;\\n     for (int i=0;i<nums.length;i++) {\\n         zeroRight++;\\n         if (nums[i] == 0) {\\n             zeroLeft = zeroRight;\\n             zeroRight = 0;\\n         }\\n         maxConsecutive = Math.max(maxConsecutive, zeroLeft+zeroRight); \\n     }\\n     return maxConsecutive;\\n}\\n```"
		},
		{
			"lc_ans_id":"96916",
			"view":"996",
			"top":"2",
			"title":"Sliding window+2 pointers,O(n) time 1 pass,O(1) space",
			"vote":"7",
			"content":"I learned this from the decent tutorial by @zjh08177,thank you !! https://discuss.leetcode.com/topic/30941/here-is-a-10-line-template-that-can-solve-most-substring-problems\\n```\\npublic class Solution {\\n    public int findMaxConsecutiveOnes(int[] nums) {\\n        int j=0;\\n        int len=0;\\n        int zero=0;\\n        for(int i=0;i<nums.length;i++){\\n            if(nums[i]==0){\\n                zero++;\\n            }\\n            \\n            while(zero>1){\\n                if(nums[j]==0){\\n                    zero--;\\n                }\\n                j++;\\n            }\\n            len=Math.max(i-j+1,len);\\n        }\\n        \\n        return len;\\n    }\\n}"
		},
		{
			"lc_ans_id":"96981",
			"view":"1608",
			"top":"3",
			"title":"Concise O(n) solution. Slight modification of two pointers. And 1-liner solution for fun",
			"vote":"7",
			"content":"The solution for the previous problem \"Max Consecutive Ones\" is as simple as this\\n```\\nclass Solution(object):\\n    def findMaxConsecutiveOnes(self, nums):\\n        nums.append(0)\\n        lo = 0\\n        ret = 0\\n        for hi,n in enumerate(nums):\\n            if n==0:\\n                ret = max(ret, hi-lo)\\n                lo = hi+1\\n        return ret\\n```\\n\\nBased on the above solution, for \"Max Consecutive Ones II\", we simply keep track of 2 low pointers:\\n```\\nclass Solution(object):\\n    def findMaxConsecutiveOnes(self, nums):\\n        nums.append(0)\\n        lo1, lo2 = 0, 0\\n        ret = 0\\n        for hi,n in enumerate(nums):\\n            if n==0:\\n                ret = max(ret, hi-lo1)\\n                lo1, lo2 = lo2, hi+1\\n        return ret\\n```\\n\\nA code golfing version just for fun:\\n```\\nclass Solution(object):\\n    def findMaxConsecutiveOnes(self, nums):\\n        return reduce(lambda l,e:(max(l[0],e[0]-l[1]),[l[2],l[1]][e[1]>0],[e[0]+1,l[2]][e[1]>0]),enumerate(nums+[0]),[0,0,0])[0]\\n```"
		},
		{
			"lc_ans_id":"96921",
			"view":"157",
			"top":"4",
			"title":"O(n) time and O(k) space Very Easy Solution for Any K Flips and Stream Input",
			"vote":"5",
			"content":"It is similar to the Stock Buy and Sell K Times problem. We can use dynamic programming to solve this problem. \\n\\nSupposed that we can flip k zeros, and we use cnt[k] to represents the maximum length if we flip exactly k zeros.\\nSo cnt[0] is the maximum length if we do not flip any zero.\\n\\nIf we encounter a '1', then every cnt[i] (0 <= i <= k) should increase one.\\n\\nIf we encounter a '0', since cnt[k] means we already flip k times, so we can not flip any more zero, this the current maximum length, we update the result by \"res = max(res, cnt[k])\". For cnt[k-1], we still can flip one zero, do it, then we can update cnt[k] by \"cnt[k] = cnt[k-1] + 1\". In this way, we can update all cnts except cnt[0]. In fact, cnt[0] shuld be 0.\\n\\nAfter processing all numbers from the stream, we need look at all cnts and update result if there is a bigger number.\\n\\n\\n```\\n    int findMaxConsecutiveOnes(vector<int>& nums) {\\n        int k = 1; // flip at most k zeros\\n        vector<int> cnt(k + 1, 0);\\n        int res = 0;\\n        \\n        for (int i: nums) {\\n            if (i == 1) {\\n                for (int &c: cnt) {\\n                    ++c;\\n                }\\n            } else {\\n                res = max(res, cnt[k]);\\n                for (int j = k; j > 0; --j) {\\n                    cnt[j] = 1 + cnt[j - 1];\\n                }\\n                cnt[0] = 0;\\n            }\\n        }\\n        \\n        for (int i: cnt) {\\n            res = max(res, i);\\n        }\\n        \\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"96924",
			"view":"177",
			"top":"5",
			"title":"C++ DP solution with O(n) time and O(1) space",
			"vote":"3",
			"content":"Using two variables to store the current consecutive 1's and previous consecutive 1's (if only one 0 apart), the result will be the sum of the two variables and 1 (turn one 0 into 1)\\n\\n```\\nclass Solution {\\npublic:\\n    int findMaxConsecutiveOnes(vector<int>& nums) {\\n        int res = 0;\\n        int currContOnes = 0;\\n        int prevContOnes = -1; // set to -1 to handle the case when the vectors starts with 1\\n        for (int num : nums) {\\n            if (num == 1) {\\n                currContOnes++; // increase curr continuous ones\\n            } else {\\n                if (currContOnes == 0) {\\n                    prevContOnes = 0; // the two continuous 1's are apart by more than one 0's\\n                } else {\\n                    prevContOnes = currContOnes;\\n                    currContOnes = 0;\\n                }\\n            }\\n            res = max(res, currContOnes + prevContOnes + 1);\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"96983",
			"view":"235",
			"top":"6",
			"title":"AC Simple Python, 1 Pass O(n), 2 counters, with elabration",
			"vote":"3",
			"content":"The problem states there are 1s and 0s in the array, look for the maximum consecutive 1s with at most one 0 in between. The idea is basically look for 1s in blocks and if there is one 0 between 2 blocks of 1s, count it into total number of 1s.\\nDetail as follows:\\n\\n1. keep 3 counters, **maxCnt**, **prev**, **cur**, initialized to **0**\\n2. count the number of consecutive 1s, record in **cur**\\n3. if 0 is encountered, the consecutive 1s is broken,    \\n    * treat 0 as a digit that can be flipped\\n    * compare **1+cur+prev** with **maxCnt**, store the max into **maxCnt**\\n    * put the count **cur** into **prev**\\n    * reset **cur** to 0\\n4. count next block\\n5. after the loop is finished, if the ending digit is 1, need to compare 1 more time, and make sure the length is less than or equal to len(nums)\\n\\n\\n    \\n   \\n\\n  \\n\\n\\n\\n\\n    def findMaxConsecutiveOnes(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        maxCnt = prev = cur = 0\\n        for num in nums:\\n            if num == 0:\\n                maxCnt = max(maxCnt, prev+cur+1)\\n                prev, cur = cur, 0\\n            else:\\n                cur += 1\\n        maxCnt =min(max(maxCnt, prev+cur+1), len(nums))\\n        #if the last one is 1, we need to count it one more time\\n        #if all numbers are 1, it will exceed total length, so choose len(nums)\\n        return maxCnt"
		},
		{
			"lc_ans_id":"96928",
			"view":"816",
			"top":"7",
			"title":"Java DP O(n) Solution",
			"vote":"3",
			"content":"The idea is to use an extra array ```dp``` to store number of ```1``` to its left and right. Then the answer is the ```MAX```of  ```dp[i] + 1``` of all ```nums[i] == 0```.\\n```\\npublic class Solution {\\n    public int findMaxConsecutiveOnes(int[] nums) {\\n        int result = 0, n = nums.length, count = 0;\\n        int[] dp = new int[n];\\n        \\n        for (int i = 0; i < n; i++) {\\n            dp[i] = count;\\n            if (nums[i] == 1) {\\n        \\tcount++;\\n        \\tresult = Math.max(count, result);\\n            }\\n            else count = 0;\\n        }\\n        \\n        count = 0;\\n        for (int i = n - 1; i >= 0; i--) {\\n            dp[i] += count;\\n            if (nums[i] == 1) count++;\\n            else count = 0;\\n        }\\n        \\n        for (int i = 0; i < n; i++) {\\n            if (nums[i] == 0) {\\n        \\tresult = Math.max(result, dp[i] + 1);\\n            }\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"96946",
			"view":"172",
			"top":"8",
			"title":"Concise Python solution good for follow-up, time O(n), space O(1)",
			"vote":"2",
			"content":"store the length of previous and current consecutive 1's (separated by the last 0) as `pre` and `curr` , respectively. <br>\\n\\nWhenever we get a new number, update these two variables accordingly. The consecutive length would be `pre  + 1 + curr`, where the `1` is a zero that got flipped to 1. (note that `pre` is initialized to `-1`, meaning that we haven't seen any 0 yet)\\n\\n```\\nclass Solution(object):\\n    def findMaxConsecutiveOnes(self, nums):\\n        # previous and current length of consecutive 1 \\n        pre, curr, maxlen = -1, 0, 0\\n        for n in nums:\\n            if n == 0:\\n                pre, curr = curr, 0\\n            else:\\n                curr += 1\\n            maxlen = max(maxlen, pre + 1 + curr )\\n        \\n        return maxlen\\n```"
		},
		{
			"lc_ans_id":"96966",
			"view":"132",
			"top":"9",
			"title":"Easy Java solution",
			"vote":"2",
			"content":"The result is made of \"previous consecutive 1s\" + 0 + \"current consecutive 1s\". Each time a 0 is encountered, the number of \"current consecutive 1s\" plus 1 becomes the number of \"previous consecutive 1s\".\\n```\\n public int findMaxConsecutiveOnes(int[] nums) {\\n        int pre = 0;\\n        int cur = 0;\\n        int result = 0;\\n        for (int num: nums) {\\n            if (num == 1) {\\n                cur++;\\n            } else {\\n                pre = cur + 1;\\n                cur = 0;\\n            }\\n             result = Math.max(result, cur + pre);\\n        }\\n        return result;\\n    }\\n```"
		}
	],
	"id":"479",
	"title":"Max Consecutive Ones II",
	"content":"<p>\r\nGiven a binary array, find the maximum number of consecutive 1s in this array if you can flip at most one 0.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,0,1,1,0]\r\n<b>Output:</b> 4\r\n<b>Explanation:</b> Flip the first zero will get the the maximum number of consecutive 1s.\r\n    After flipping, the maximum number of consecutive 1s is 4.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<ul>\r\n<li>The input array will only contain <code>0</code> and <code>1</code>.</li>\r\n<li>The length of input array is a positive integer and will not exceed 10,000</li>\r\n</ul>\r\n</p>\r\n\r\n<p><b>Follow up:</b><br />\r\nWhat if the input numbers come in one by one as an <b>infinite stream</b>? In other words, you can't store all numbers coming from the stream as it's too large to hold in memory. Could you solve it efficiently?\r\n</p>",
	"frequency":"32",
	"ac_num":"10661"
}