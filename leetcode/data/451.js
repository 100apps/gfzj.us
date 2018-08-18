{
	"difficulty":"2",
	"submit_num":"20559",
	"show_id":"457",
	"leetcode_id":"457",
	"answers":[
		{
			"lc_ans_id":"94146",
			"view":"6155",
			"top":"0",
			"title":"I cannot understand why test case [-2, 1, -1, -2, -2] gives false?",
			"vote":"30",
			"content":"For example, starting at index 1, nums[1] is 1, move 1 step forward to index 2. Then nums[2] is -1, move back 1 step to index 1. The loop contains indices 1 and 2. Is this a valid loop?"
		},
		{
			"lc_ans_id":"94148",
			"view":"8945",
			"top":"1",
			"title":"Java Slow/Fast Pointer Solution",
			"vote":"21",
			"content":"Just think it as finding a loop in Linkedlist, except that loops with only 1 element do not count. Use a slow and fast pointer, slow pointer moves 1 step a time while fast pointer moves 2 steps a time. If there is a loop (fast == slow), we return true, else if we meet element with different directions, then the search fail, we set all elements along the way to 0. Because 0 is fail for sure so when later search meet 0 we know the search will fail.\\n\\n```java\\npublic class Solution {\\n    public boolean circularArrayLoop(int[] nums) {\\n        int n = nums.length;\\n        for (int i = 0; i < n; i++) {\\n            if (nums[i] == 0) {\\n                continue;\\n            }\\n            // slow/fast pointer\\n            int j = i, k = getIndex(i, nums);\\n            while (nums[k] * nums[i] > 0 && nums[getIndex(k, nums)] * nums[i] > 0) {\\n                if (j == k) {\\n                    // check for loop with only one element\\n                    if (j == getIndex(j, nums)) {\\n                        break;\\n                    }\\n                    return true;\\n                }\\n                j = getIndex(j, nums);\\n                k = getIndex(getIndex(k, nums), nums);\\n            }\\n            // loop not found, set all element along the way to 0\\n            j = i;\\n            int val = nums[i];\\n            while (nums[j] * val > 0) {\\n                int next = getIndex(j, nums);\\n                nums[j] = 0;\\n                j = next;\\n            }\\n        }\\n        return false;\\n    }\\n    \\n    public int getIndex(int i, int[] nums) {\\n        int n = nums.length;\\n        return i + nums[i] >= 0? (i + nums[i]) % n: n + ((i + nums[i]) % n);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"94152",
			"view":"1071",
			"top":"2",
			"title":"Why {3, 1, 2} is a loop and {-1, -2, -3, -4, -5} is not?",
			"vote":"10",
			"content":"In the {3, 1, 2} case we jump and return to the same position. So there is really one step and it is considered a loop. Is it because we \"fly over 2 positions\"? Fine. Then why {-1, -2, -3, -4, -5} is not a loop? We make one step from -1 to -5 and then we do exactly the same as in case {3, 1, 2) but to the left.\\n\\nFor this question to be reasonable the description should take these cases:\\n\\n{-1, 2} -> False\\n\\n{-2, 1, -1, -2, -2} -> False\\n\\n{2, -1, 1, -2, -2} -> False\\n\\n{3, 1, 2} -> True\\n\\n{-1, -2, -3, -4, -5} -> False\\n\\nand spell out why exactly the expected results are the way they are."
		},
		{
			"lc_ans_id":"94155",
			"view":"4324",
			"top":"3",
			"title":"two pass O(n) solution by marking failed loop by zero",
			"vote":"6",
			"content":"hopefully this isn't too slow, haven't spent much time improving it. The basic idea is to detect a loop by maintaining a one-step and a two-step pointers, just like an old problem from leetcode. And each time a possible attempt failed we mark every index on the path by zero, since zero is guaranteed  to fail. Since the problem asks only forward of backward solution we simply run it for positive indices and negative indices twice.\\n\\nBy the way, the problem states that the array has only pos and neg numbers, which is apparently a little inaccurate. The presence of zero though doesn't seem to cause much problem.\\n\\n\\n\\n      class Solution {\\n      public:\\n          bool circularArrayLoop(vector<int>& nums) {\\n      \\t\\tint n = nums.size();\\n\\n                    // check for zero\\n                    for(auto i : nums) if(i==0) return false;\\n\\n      \\t\\t// forward:\\n      \\t\\tfor(int i = 0; i < n; i++) {\\n      \\t\\t\\tif(nums[i] <= 0 || nums[i] == n) continue;\\n      \\t\\t\\tint one = i;\\n      \\t\\t\\tint two = i;\\n      \\t\\t\\tint m = 2*n;\\n      \\t\\t\\twhile(m-- > 0) {\\n      \\t\\t\\t\\tint jump_one = (one + nums[one]) % n;\\n      \\t\\t\\t\\tif(nums[jump_one] <= 0 || jump_one == one){\\n      \\t\\t\\t\\t\\tbreak;\\n      \\t\\t\\t\\t}\\n      \\t\\t\\t\\tone = jump_one;\\n      \\n      \\t\\t\\t\\tint jump_two = (two+nums[two]) % n;\\n      \\t\\t\\t\\tif(nums[jump_two] <= 0 || jump_two == two) {\\n      \\t\\t\\t\\t\\tbreak;\\n      \\t\\t\\t\\t}\\n      \\t\\t\\t\\ttwo = jump_two;\\n      \\n      \\t\\t\\t\\tjump_two = (two+nums[two]) % n;\\n      \\t\\t\\t\\tif(nums[jump_two] <= 0 || jump_two == two) {\\n      \\t\\t\\t\\t\\tbreak;\\n      \\t\\t\\t\\t}\\n      \\t\\t\\t\\ttwo = jump_two;\\n      \\n      \\t\\t\\t\\tif(one == two) return true;\\n      \\t\\t\\t}\\n      \\t\\t\\t// no forward for this chain\\n      \\t\\t\\tone = i;\\n      \\t\\t\\twhile(nums[one] > 0) {\\n      \\t\\t\\t\\tint t = nums[one];\\n      \\t\\t\\t\\tnums[one] = 0;\\n      \\t\\t\\t\\tone = (one + t) % n;\\n      \\t\\t\\t}\\n      \\t\\t}\\n      \\n      \\n      \\t\\t// backward:\\n      \\t\\tfor(int i = n-1; i >= 0; i--) {\\n      \\t\\t\\tif(nums[i] >= 0 || nums[i] == n) continue;\\n      \\t\\t\\tint one = i;\\n      \\t\\t\\tint two = i;\\n      \\t\\t\\tint m = 2*n;\\n      \\t\\t\\twhile(m-- > 0) {\\n      \\t\\t\\t\\tint jump_one = ((one + nums[one]) % n + n) % n;\\n      \\t\\t\\t\\tif(nums[jump_one] >= 0 || jump_one == one){\\n      \\t\\t\\t\\t\\tbreak;\\n      \\t\\t\\t\\t}\\n      \\t\\t\\t\\tone = jump_one;\\n      \\n      \\t\\t\\t\\tint jump_two = ((two+nums[two]) % n + n) % n;\\n      \\t\\t\\t\\tif(nums[jump_two] >= 0 || jump_two == two) {\\n      \\t\\t\\t\\t\\tbreak;\\n      \\t\\t\\t\\t}\\n      \\t\\t\\t\\ttwo = jump_two;\\n      \\n      \\t\\t\\t\\tjump_two = ((two+nums[two]) % n + n ) % n;\\n      \\t\\t\\t\\tif(nums[jump_two] >= 0 || jump_two == two) {\\n      \\t\\t\\t\\t\\tbreak;\\n      \\t\\t\\t\\t}\\n      \\t\\t\\t\\ttwo = jump_two;\\n      \\n      \\t\\t\\t\\tif(one == two) return true;\\n      \\t\\t\\t}\\n      \\t\\t\\t// no backward for this chain\\n      \\t\\t\\tone = i;\\n      \\t\\t\\twhile(nums[one] < 0) {\\n      \\t\\t\\t\\tint t  = nums[one];\\n      \\t\\t\\t\\tnums[one] = 0;\\n      \\t\\t\\t\\tone = ((one + t) % n + n) % n;\\n      \\t\\t\\t}\\n      \\t\\t}\\n      \\n      \\t\\treturn false;\\n          }\\n      };"
		},
		{
			"lc_ans_id":"94197",
			"view":"2837",
			"top":"4",
			"title":"Clean Java Slow/Fast Solution",
			"vote":"3",
			"content":"```\\npublic class Solution {\\n    public boolean circularArrayLoop(int[] nums) {\\n        if(nums == null || nums.length == 0) return false;\\n        int n = nums.length;\\n        for(int i=0; i<n; i++){\\n            if(nums[i] == 0) continue;\\n            int slow = i, fast = i, count = 0;\\n            boolean forward = nums[slow] > 0;\\n            do{\\n                int tempSlow = slow;\\n                slow = (slow + nums[slow] + n) % n;\\n        \\n                if(forward && nums[fast] < 0 || !forward && nums[fast] > 0) return false;\\n                fast = (fast + nums[fast] + n) % n;\\n        \\n                if(forward && nums[fast] < 0 || !forward && nums[fast] > 0) return false;\\n                fast = (fast + nums[fast] + n) % n;\\n        \\n                nums[tempSlow] = 0;\\n                count++;\\n                \\n            } while(slow != fast);\\n            if(count > 1) return true;\\n        }\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"94261",
			"view":"1145",
			"top":"5",
			"title":"what is the result for test case 1, 2, 0, 3, 4",
			"vote":"2",
			"content":"according to the example:\\n\\n```\\nExample 3: Given the array [2, 0, 2, 1, 3], return false since 0 is not supposed to appear in the array.\\n```\\n\\nI conclude that, if there is an zero in the array, the answer should be false; but the test case 1, 2, 0, 3, 4 expect true.\\n\\nIs the example wrong? or the test case?"
		},
		{
			"lc_ans_id":"94182",
			"view":"74",
			"top":"6",
			"title":"My solution with O(n) complexity in C++",
			"vote":"1",
			"content":"When the travelling direction changed, set all points on the path before the change point to zero. The worst case Each point will be visited once, set to zero once. The times that zero points be visited will be no more than n.  The complexity is O(n). O(1) extra space used.\\n```\\nclass Solution {\\npublic:\\n    bool circularArrayLoop(vector<int>& nums) {\\n        int size = nums.size();\\n        if (nums.empty())\\n            return false;\\n        for (int i = 0; i<size;i++){\\n            if (nums[i]==0)\\n                continue;\\n            int step = 0;\\n            int j = i;\\n            while (step<=(size+3)){\\n                if (nums[i]*nums[j]<=0){\\n                    setZero(nums,i,step);\\n                    break;\\n                }\\n                int prev = j;\\n                j = j + nums[j];\\n                j = j%size;\\n                if (j<0)\\n                    j+= size;\\n                step++;\\n                if ((step>size)&&j!=prev)\\n                    return true;\\n            }\\n        }\\n        return false;\\n    }\\n    void setZero(vector<int>&nums,int i,int step){\\n        int size = nums.size();\\n        int k = i;\\n        int step1 = 0;\\n        while(step1<step){\\n            int temp = nums[k];\\n            nums[k] = 0;\\n            k+=temp;\\n            k = k%size;\\n            if (k<0)\\n                k+= size;\\n            step1++;\\n        }\\n        return;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"94187",
			"view":"98",
			"top":"7",
			"title":"Java solution, easy to follow",
			"vote":"1",
			"content":"This algo divides responsibilities in a way that I believe makes it easier to follow.  It is also non-destructive to the input data.  The \"next\" function detects cases that we can abandon, while the main code focuses on finding a loop.\\n\\nThe main loop is a simple slow/fast pointer search to find loops.  The next function uses Integer object, so that it can pass or return null as an end case.  And null returns end the search.\\n\\nNull can be returned from next in the following cases:\\n1.  When input pos value is null (fast pointer that double-calls would cause this)\\n2.  When direction changes.  Direction is captured on the first step in the \"dir\" value, and then passed to all follow-on calls to next.  So the first time the product of dir and num[pos] is less than zero, we know we've changed direction, so return null.\\n3.  When a \"self pointer\" is found, meaning the next value from pos is the same index as pos.\\n\\n```\\npublic class Solution {\\n    public boolean circularArrayLoop(int[] nums) {\\n        boolean found = false;\\n\\n        for ( int n=0; n<nums.length; n++ ) {\\n            Integer ps = n;\\n            Integer pf = next(nums, 0, n);\\n            int dir = nums[n];\\n\\n            while ( ps != null && pf != null && ps != pf ) {\\n                ps = next(nums, dir, ps);\\n                pf = next(nums, dir, next(nums, dir, pf));\\n            }\\n\\n            if ( ps != null && ps == pf ) {\\n                found = true;\\n                break;\\n            }\\n        }\\n\\n        return found;\\n    }\\n\\n    Integer next(int[] nums, int dir, Integer pos) {\\n        if ( pos == null ) return null; // null, return null\\n        if ( dir * nums[pos] < 0 ) return null; // change in direction, return null\\n\\n        Integer next = (pos + nums[pos]) % nums.length;\\n        if ( next < 0 ) next += nums.length; // wrap negative\\n\\n        if ( next == pos ) next = null; // self-pointer, return null\\n        return next;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"94178",
			"view":"338",
			"top":"8",
			"title":"Why is my test case [-1,-2,-3,-4,-5] failing ?",
			"vote":"1",
			"content":"-1 : take 1 step backward. It will go to -5\\n-5: take 5 steps backward. it will go back to -5. Hence a loop.\\nMy code is return TRUE. but the test case expects a FALSE. Any Idea ?"
		},
		{
			"lc_ans_id":"94171",
			"view":"347",
			"top":"9",
			"title":"how can [3,1,2] be true and [2,-1] be false ?",
			"vote":"1",
			"content":"[3,1,2] results in 0->0->0->0 .....\\n\\n[2,-1] also results in 0->0->0"
		}
	],
	"id":"451",
	"title":"Circular Array Loop",
	"content":"<p>\r\nYou are given an array of positive and negative integers. If a number n at an index is positive, then move forward n steps. Conversely, if it's negative (-n), move backward n steps. Assume the first element of the array is forward next to the last element, and the last element is backward next to the first element. Determine if there is a loop in this array. A loop starts and ends at a particular index with more than 1 element along the loop. The loop must be \"forward\" or \"backward'.\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n\r\nGiven the array [2, -1, 1, 2, 2], there is a loop, from index 0 -> 2 -> 3 -> 0.\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n\r\nGiven the array [-1, 2], there is no loop.\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n\r\nThe given array is guaranteed to contain no element \"0\".\r\n</p>\r\n\r\n<p>\r\nCan you do it in <b>O(n)</b> time complexity and <b>O(1)</b> space complexity?\r\n</p>\r\n",
	"frequency":"470",
	"ac_num":"4455"
}