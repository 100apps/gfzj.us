{
	"difficulty":"2",
	"submit_num":"509694",
	"show_id":"55",
	"leetcode_id":"55",
	"answers":[
		{
			"lc_ans_id":"20917",
			"view":"25179",
			"top":"0",
			"title":"Linear and simple solution in C++",
			"vote":"217",
			"content":"I just iterate and update the maximal index that I can reach\\n\\n    bool canJump(int A[], int n) {\\n        int i = 0;\\n        for (int reach = 0; i < n && i <= reach; ++i)\\n            reach = max(i + A[i], reach);\\n        return i == n;\\n    }"
		},
		{
			"lc_ans_id":"20900",
			"view":"19586",
			"top":"1",
			"title":"Simplest O(N) solution with constant space",
			"vote":"112",
			"content":"Idea is to work backwards from the last index. Keep track of the smallest index that can \"jump\" to the last index. Check whether the current index can jump to this smallest index.\\n\\n    bool canJump(int A[], int n) {\\n        int last=n-1,i,j;\\n        for(i=n-2;i>=0;i--){\\n            if(i+A[i]>=last)last=i;\\n        }\\n        return last<=0;\\n    }"
		},
		{
			"lc_ans_id":"20923",
			"view":"13877",
			"top":"2",
			"title":"Java Solution easy to understand",
			"vote":"88",
			"content":"    public boolean canJump(int[] A) {\\n        int max = 0;\\n        for(int i=0;i<A.length;i++){\\n            if(i>max) {return false;}\\n            max = Math.max(A[i]+i,max);\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"20932",
			"view":"9505",
			"top":"3",
			"title":"6 line java solution in O(n)",
			"vote":"52",
			"content":"The basic idea is this: at each step, we keep track of the furthest reachable index. The nature of the problem (eg. maximal jumps where you can hit a range of targets instead of singular jumps where you can only hit one target) is that for an index to be reachable, each of the previous indices have to be reachable.\\n\\nHence, it suffices that we iterate over each index, and If we ever encounter an index that is not reachable, we abort and return false. By the end, we will have iterated to the last index. If the loop finishes, then the last index is reachable.\\n\\n    public boolean canJump(int[] nums) {\\n        int reachable = 0;\\n        for (int i=0; i<nums.length; ++i) {\\n            if (i > reachable) return false;\\n            reachable = Math.max(reachable, i + nums[i]);\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"20944",
			"view":"5259",
			"top":"4",
			"title":"Java 98% Percentile Solution",
			"vote":"29",
			"content":"The easiest way to think about this problem is to ask are the elements with a 0 value avoidable? this is the algorithm that I constructed to answer this question.Starting from the second to last element in the array we continue to decrement towards the start of the array. Only stopping if we hit an element with a value of 0; in this case we evaluate if there exist an element somewhere at the start of the array which has a jump value large enough to jump over this 0 value element. \\n\\n    public class Solution {\\n        public boolean canJump(int[] nums) {\\n           if(nums.length < 2) return true;\\n           \\n           for(int curr = nums.length-2; curr>=0;curr--){\\n               if(nums[curr] == 0){\\n                   int neededJumps = 1;\\n                   while(neededJumps > nums[curr]){\\n                       neededJumps++;\\n                       curr--;\\n                       if(curr < 0) return false;\\n                   }\\n               }\\n           }\\n           return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"21121",
			"view":"1985",
			"top":"5",
			"title":"C++, elegant solution, O(n) time.",
			"vote":"18",
			"content":"    bool canJump(vector<int>& nums) {\\n        int size=nums.size();\\n        int step=nums[0];\\n        for(int i=1;i<size;++i){\\n            step--;\\n            if(step<0)\\n               return false;\\n            if(nums[i]>step)\\n               step=nums[i];\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"20907",
			"view":"2164",
			"top":"6",
			"title":"1-6 lines, O(n) time, O(1) space",
			"vote":"18",
			"content":"**Solution 1**\\n\\nGoing forwards. `m` tells the maximum index we can reach so far.\\n\\n    def canJump(self, nums):\\n        m = 0\\n        for i, n in enumerate(nums):\\n            if i > m:\\n                return False\\n            m = max(m, i+n)\\n        return True\\n\\n**Solution 2**\\n\\nOne-liner version:\\n\\n    def canJump(self, nums):\\n        return reduce(lambda m, (i, n): max(m, i+n) * (i <= m), enumerate(nums, 1), 1) > 0\\n\\n**Solution 3**\\n\\nGoing backwards, most people seem to do that, here's my version.\\n\\n    def canJump(self, nums):\\n        goal = len(nums) - 1\\n        for i in range(len(nums))[::-1]:\\n            if i + nums[i] >= goal:\\n                goal = i\\n        return not goal\\n\\n**Solution 4**\\n\\nC version.\\n\\n    bool canJump(int* nums, int n) {\\n        int goal=n-1, i;\\n        for (i=n; i--;)\\n            if (i+nums[i] >= goal)\\n                goal=i;\\n        return !goal;\\n    }"
		},
		{
			"lc_ans_id":"20974",
			"view":"1586",
			"top":"7",
			"title":"3ms simple JAVA solution",
			"vote":"16",
			"content":"    public boolean canJump(int[] nums) {\\n        int maxIndex = nums.length-1;\\n        int maxJump  = nums[0];\\n        for(int i = 0; i <= maxJump; i++){\\n            maxJump=Math.max(maxJump,i+nums[i]);\\n            if(maxJump>=maxIndex) return true;\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"21146",
			"view":"1337",
			"top":"8",
			"title":"C++ smiple and easy to understand O(n) time 4 lines",
			"vote":"13",
			"content":"    class Solution {\\n    public:\\n    \\tbool canJump(vector<int>& nums) {\\n    \\t\\tint truepos=nums.size()-1;//the lowest starting point that you can reach the end \\n    \\t\\tfor(int i=nums.size()-2;i>=0;i--)\\n    \\t\\t\\ttruepos=(i+nums[i])>=truepos?i:truepos;\\n    \\t\\treturn(truepos==0);\\t\\n    \\t}\\n    };"
		},
		{
			"lc_ans_id":"21080",
			"view":"1468",
			"top":"9",
			"title":"Greedy, 14ms. O(n), O(1),  easy C++ solution, easy understanding.",
			"vote":"11",
			"content":"\\n\\n    bool canJump(int A[], int n) { // Greedy\\n        \\n        n==1?({return true;}):({;});  // Return true if already reach the end\\n        \\n        int max_index_can_jump = 0; // So far the current max index we can jump to.\\n        \\n        for (int i = 0; i <= max_index_can_jump; ++i )\\n        {\\n            if( (A[i]+i) > max_index_can_jump ) // check if need to update the current max index we can jump to\\n            {\\n                if((A[i]+i) >= (n - 1)) // check if we can jump to the last index (end)\\n                {\\n                    return true;\\n                }\\n                else\\n                {\\n                    max_index_can_jump = A[i]+i; // Then update\\n                }\\n            }\\n        }\\n        \\n        //return max_index_can_jump == (n-1); // First line is only one of the case\\n        \\n        return false;\\n    }"
		}
	],
	"id":"55",
	"title":"Jump Game",
	"content":"<p>\r\nGiven an array of non-negative integers, you are initially positioned at the first index of the array.\r\n</p>\r\n<p>\r\nEach element in the array represents your maximum jump length at that position. \r\n</p>\r\n<p>\r\nDetermine if you are able to reach the last index.\r\n</p>\r\n\r\n<p>\r\nFor example:<br />\r\nA = <code>[2,3,1,1,4]</code>, return <code>true</code>.\r\n</p>\r\n<p>\r\nA = <code>[3,2,1,0,4]</code>, return <code>false</code>.\r\n</p>",
	"frequency":"414",
	"ac_num":"150910"
}