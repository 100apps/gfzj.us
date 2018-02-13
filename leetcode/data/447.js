{
	"difficulty":"1",
	"submit_num":"78255",
	"show_id":"453",
	"leetcode_id":"453",
	"answers":[
		{
			"lc_ans_id":"93817",
			"view":"18625",
			"top":"0",
			"title":"It is a math question",
			"vote":"144",
			"content":"let's define sum as the sum of all the numbers, before any moves; minNum as the min number int the list; n is the length of the list;\\n\\nAfter, say m moves, we get all the numbers as x , and we will get the following equation\\n```\\n sum + m * (n - 1) = x * n\\n```\\nand actually, \\n```\\n  x = minNum + m\\n```\\n\\nand finally, we will get \\n```\\n  sum - minNum * n = m\\n```\\n\\nSo, it is clear and easy now."
		},
		{
			"lc_ans_id":"93815",
			"view":"21985",
			"top":"1",
			"title":"Java O(n) solution. Short.",
			"vote":"112",
			"content":"Adding ```1``` to ```n - 1``` elements is the same as subtracting ```1``` from one element, w.r.t goal of making the elements in the array equal.\\nSo, best way to do this is make all the elements in the array equal to the ```min``` element.\\n```sum(array) - n * minimum```\\n```\\npublic class Solution {\\n    public int minMoves(int[] nums) {\\n        if (nums.length == 0) return 0;\\n        int min = nums[0];\\n        for (int n : nums) min = Math.min(min, n);\\n        int res = 0;\\n        for (int n : nums) res += n - min;\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"93822",
			"view":"11592",
			"top":"2",
			"title":"Simple one-liners",
			"vote":"62",
			"content":"Incrementing all but one is equivalent to decrementing that one. So let's do that instead. How many single-element decrements to make all equal? No point to decrementing below the current minimum, so how many single-element decrements to make all equal to the current minimum? Just take the difference from what we currently have (the sum) to what we want (n times the minimum).\\n\\nPython:\\n\\n    def minMoves(self, nums):\\n        return sum(nums) - len(nums) * min(nums)\\n\\nRuby:\\n```\\ndef min_moves(nums)\\n  nums.inject(:+) - nums.size * nums.min\\nend\\n```\\n\\nJava (ugh :-):\\n\\n    public int minMoves(int[] nums) {\\n        return IntStream.of(nums).sum() - nums.length * IntStream.of(nums).min().getAsInt();\\n    }\\n\\nC++ (more ugh):\\n\\n    int minMoves(vector<int>& nums) {\\n        return accumulate(begin(nums), end(nums), 0L) - nums.size() * *min_element(begin(nums), end(nums));\\n    }\\n(edit: I changed 0 to 0L because it failed the apparently added testcase [1,2147483647])"
		},
		{
			"lc_ans_id":"93828",
			"view":"3578",
			"top":"3",
			"title":"What if we are not smart enough to come up with decrease 1. Here is how we do it.",
			"vote":"19",
			"content":"First, the method of decreasing 1 instead of adding 1 for n-1 elements is brilliant. But, when I was doing the contest, I was dumb, so dumb to think outside the box. And this is how I tackled it using just math logic.\\n\\nFirst, traverse the array, get the sum and the minimum value. If every element is equal, then min*(len) should equal to sum. This part is easy to understand. So, if they are not equal, what should we do? we should keep adding 1 to the array for k times until min*(len)==sum. Then we have:\\n\\nlen*(min+k)=sum+k*(len-1). \\n==> k=sum-min*len;\\n\\nLooks familiar? If you do it by decreasing 1 each time, this equation should be easy to understand!\\nSome of you may have this question: how can I be sure that after adding 1 to (n-1) elements in the array, the minimum value is the previous min plus one. Is it possible that the minimum value stays the same after this? The answer is no, it's not possible. As long as all elements are not same, adding 1 to (n-1) elements meaning only one element in the array is not getting a candy. And I'm sure you will choose not to give the candy to the oldest one. So, yes, every time you do that add operation, the min value adds 1. \\n```\\npublic int minMoves(int[] nums) {\\n        if(nums==null||nums.length<=1) return 0;\\n        long min=(long)nums[0];\\n        long sum=0;\\n        for(int i=0;i<nums.length;i++){\\n            sum+=(long)nums[i];\\n            min=Math.min(min,nums[i]);\\n        }\\n        return (int)(sum-min*nums.length);\\n    }\\n```"
		},
		{
			"lc_ans_id":"93905",
			"view":"2815",
			"top":"4",
			"title":"Four Python solutions with detailed explanation",
			"vote":"11",
			"content":"**Brute Force Solution: TLE**\\n* Add 1 to all elements except the maximum element. If there are multiple max elements, ignore just one of the maximum elements.\\n* Repeat the above as long as there is a distinct max and min element - i.e. all elements are not same.\\n```\\nclass Solution(object):\\n    def minMoves(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        c = 0\\n        while True:\\n            max1, min1 = max(nums), min(nums)\\n            if max1 == min1:\\n                break\\n            idx, c = nums.index(max1), c+1\\n            for i in range(len(nums)):\\n                nums[i] = nums[i] + 1 if i != idx else nums[i]\\n        return c\\n```\\n\\n**Improved Brute Force Solution: TLE**\\n* Instead of incrementing by 1 in each iteration, increment in batch. Find the minimum and the maximum. Now we want the minimum to catch up with the maximum. So we perform a batch of moves (maximum - minimum) on all elements except the maximum.\\n* Now after the above step, the minimum would have caught up with the initial maximum and we would have a new maximum now. Repeat this until we have all equal elements.\\n\\n```\\nclass Solution(object):\\n    def minMoves(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        c = 0\\n        while True:\\n            max1, min1 = max(nums), min(nums)\\n            if max1 == min1:\\n                break\\n            diff = max1 - min1\\n            idx, c = nums.index(max1), c + diff\\n            for i in range(len(nums)):\\n                nums[i] = nums[i] + diff if i != idx else nums[i]\\n        return c\\n```\\n\\n**Optimal Solution by Transforming the problem**\\n* A move can be interpreted as: \"Add 1 to every element and subtract one from any one element\". sum(nums_new) = sum(nums) + (n-1): we increment only (n-1) elements by 1.\\n* Visualize the nums array as a bar graph where the value at each index is a bar of height nums[i]. We are looking for minimum moves such that all bars reach the final same height. \\n* Now adding 1 to all the bars in the initial state does not change the initial state - it simply shifts the initial state uniformly by 1.This gives us the insight that a single move is equivalent to subtracting 1 from any one element with respect to the goal of reaching a final state with equal heights.\\n* So our new problem is to find the minimum number of moves to reach a final state where all nums are equal and in each move we subtract 1 from any element.\\n* The final state must be a state where every element is equal to the minimum element. Say we make K moves to reach the final state. Then we have the equation, N * min(nums) = sum(nums) - K.\\n\\n```\\nclass Solution(object):\\n    def minMoves(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        return sum(nums) - len(nums)*min(nums)\\n```\\n\\n**Solution using sorting the array**\\n* Visualize the nums array as a bar graph where the value at each index is a bar of height nums[i]. Sort the array such that the bar at index 0 is minimum height and the bar at index N-1 is highest.\\n* Now in the first iteration, make a sequence of moves such that the height at index 0 is equal to height at index N-1. Clearly this takes nums[N-1]-nums[0] moves. After these moves, index N-2 will be the highest and index 0 will still be the minimum and nums[0] will be same as nums[N-1].\\n* In the next iteration, lets do nums[N-2]-nums[0] moves. After this iteration, nums[0], nums[N-2], and nums[N-1] will be the same.\\n\\n```\\nclass Solution(object):\\n    def minMoves(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        nums.sort()\\n        c = 0\\n        for i in range(len(nums)-1, -1, -1):\\n            if nums[i] == nums[0]:\\n                break\\n            c += nums[i] - nums[0]\\n        return c\\n```"
		},
		{
			"lc_ans_id":"93886",
			"view":"2274",
			"top":"5",
			"title":"Thinking process of solving problems use Java, 37ms",
			"vote":"6",
			"content":"First time, I try to `find the max num every time, and +1 to rest num`, code like below:\\n```\\n    public int minMoves(int[] nums) {\\n        return helper(nums, 0);\\n    }\\n\\n    private int helper(int[] nums, int count) {\\n        int max = 0;\\n        int total = 1;\\n        for (int i = 1; i < nums.length; i++) {\\n            if (nums[i] > nums[max]) max = i;\\n            else if (nums[i] == nums[max]) total++;\\n        }\\n        if (total == nums.length) return count;\\n\\n        for (int i = 0; i < nums.length; i++) {\\n            if (i != max) nums[i]++;\\n        }\\n        return helper(nums, ++count);\\n    }\\n```\\n\\nbut when the nums is `[1, 1, 2147483647]`, it will be `java.lang.StackOverflowError`.\\n\\nSo I try to improve in this way that `find the max and min num every time, and +(max - min) to rest num`, code like below:\\n```\\n    public int minMoves(int[] nums) {\\n        return helper(nums, 0);\\n    }\\n\\n    private int helper(int[] nums, int count) {\\n        int max = 0, min = 0;\\n        int total = 1;\\n        for (int i = 1; i < nums.length; i++) {\\n            if (nums[i] > nums[max]) max = i;\\n            else if (nums[i] < nums[min]) min = i;\\n            else if (nums[i] == nums[max]) total++;\\n        }\\n        if (total == nums.length) return count;\\n\\n        int dis = nums[max] - nums[min];\\n        for (int i = 0; i < nums.length; i++) {\\n            if (i != max) nums[i] += dis;\\n        }\\n        return helper(nums, count + dis);\\n    }\\n```\\nBut when the num length is bigger to 10000, it wil be `Time Limit Exceeded`.\\n\\nThen, I want to `implements it by no recursive way and use insert sort every time in order to reduce unnecessary traversal operation`. code like below:\\n\\n```\\n    public int minMoves(int[] nums) {\\n        int res = 0;\\n        int n = nums.length;\\n        Arrays.sort(nums);\\n\\n        while (nums[n - 1] != nums[0]) {\\n            int dis = nums[n - 1] - nums[0];\\n            for (int i = 0; i < n - 1; i++) {\\n                nums[i] += dis;\\n            }\\n            res += dis;\\n\\n            //insert sort\\n            int max = nums[n - 1];\\n            int i = n - 2;\\n            while (i >= 0) {\\n                if (nums[i] > max) nums[i + 1] = nums[i--];\\n                else break;\\n            }\\n            nums[i + 1] = max;\\n        }\\n\\n        return res;\\n    }\\n```\\nBut it still `Time Limit Exceeded`.\\n\\n============== **The final solution is as follows** ==============\\n\\n\\nThe final flash, I though that should we use `dynamic programming`? \\n- `[step] is The number of steps arrive at the state of [all equal]`\\n- `[finalNum] is The value of the state of [all equal]`\\n\\nwe can know that \\n- `step[i] = (step[i-1] + num[i]) - finalNum[i-1] + step[i-1]`\\n- `finalNum[i] = num[i] + step[i-1]`\\n\\n\\n\\n```\\n    public int minMoves(int[] nums) {\\n        Arrays.sort(nums);\\n\\n        int n = nums.length;\\n        int step = 0;\\n        int finalNum = nums[0];\\n\\n        for (int i = 1; i < n; i++) {\\n            int tmp = finalNum;\\n            finalNum = nums[i] + step;\\n            if (finalNum == tmp) continue;   //attention!!\\n            step = finalNum - tmp + step;\\n        }\\n\\n        return step;\\n    }\\n```"
		},
		{
			"lc_ans_id":"93914",
			"view":"1721",
			"top":"6",
			"title":"C++ solution with explanation",
			"vote":"6",
			"content":"Adding 1 to (n-1) elements is equivalent to subtracting 1 from one of the elements and adding 1 to all elements. Adding 1 to all elements does not change anything in terms of equality. So we must find the min number of (subtract 1 from any element) operations. The only way to make all elements equal this way is to make them all equal to the min element of the array.\\nHence, number of moves = sum(array) - n*min_element\\n```\\nclass Solution {\\npublic:\\n    int minMoves(vector<int>& nums) {\\n       int n = nums.size();\\n       if(n <= 1)\\n          return 0;\\n       int mn = nums[0];\\n       long sum = nums[0];\\n       for(int i = 1; i < n; ++i)\\n       {\\n           mn = min(mn,nums[i]);\\n           sum += nums[i];\\n       }\\n       return sum -long(mn)*long(n); \\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"93840",
			"view":"251",
			"top":"7",
			"title":"java  one loop 5 line solution beats 99%",
			"vote":"4",
			"content":"    public int minMoves(int[] nums) {\\n        int total = 0, min = nums[0];\\n        for (int n  : nums) {\\n            total += n;\\n            if (n < min) min = n;\\n        }\\n        return total - nums.length * min;\\n    }"
		},
		{
			"lc_ans_id":"93879",
			"view":"1289",
			"top":"8",
			"title":"Simple O(n) Java solution with explanation",
			"vote":"4",
			"content":"The key idea is **increasing n - 1 elements by 1 has the same effect of decreasing 1 element by 1**\\nSo we first find the minimum value of the array and count the steps of decreasing every element to the minimum.\\n```\\n    public int minMoves(int[] nums) {\\n        int min = Integer.MAX_VALUE;\\n        for (int x : nums) {\\n            if (x < min) {\\n                min = x;\\n            }\\n        }\\n        int count = 0;\\n        for (int x : nums) {\\n            count += x - min;\\n        }\\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"93900",
			"view":"801",
			"top":"9",
			"title":"Java O(n) Accepted Solution With Explanation",
			"vote":"3",
			"content":"The effect of increasing n-1 elements by one is equal to decrease the left element by one. The goal is to decrease every element larger than the minimum element to the minimum element. So, the number of operation needed is sum-min*(nums.length).\\n```\\n    public int minMoves(int[] nums) {\\n        if (nums.length <= 1) return 0;\\n        int min = Integer.MAX_VALUE;\\n        int sum = 0;\\n        \\n        for (int i = 0; i < nums.length; i++) {\\n            sum += nums[i];\\n            min = Math.min(min, nums[i]);\\n        }\\n\\n        return sum-nums.length*min;\\n    }"
		}
	],
	"id":"447",
	"title":"Minimum Moves to Equal Array Elements",
	"content":"<p>Given a <b>non-empty</b> integer array of size <i>n</i>, find the minimum number of moves required to make all array elements equal, where a move is incrementing <i>n</i> - 1 elements by 1.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n<b>Input:</b>\r\n[1,2,3]\r\n\r\n<b>Output:</b>\r\n3\r\n\r\n<b>Explanation:</b>\r\nOnly three moves are needed (remember each move increments two elements):\r\n\r\n[1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]\r\n</pre>\r\n</p>",
	"frequency":"411",
	"ac_num":"37543"
}