{
	"difficulty":"3",
	"submit_num":"77246",
	"show_id":"330",
	"leetcode_id":"330",
	"answers":[
		{
			"lc_ans_id":"78488",
			"view":"30995",
			"top":"0",
			"title":"Solution + explanation",
			"vote":"445",
			"content":"**Solution**\\n\\n    int minPatches(vector<int>& nums, int n) {\\n        long miss = 1, added = 0, i = 0;\\n        while (miss <= n) {\\n            if (i < nums.size() && nums[i] <= miss) {\\n                miss += nums[i++];\\n            } else {\\n                miss += miss;\\n                added++;\\n            }\\n        }\\n        return added;\\n    }\\n\\n---\\n\\n**Explanation**\\n\\nLet `miss` be the smallest sum in `[0,n]` that we might be missing. Meaning we already know we can build all sums in `[0,miss)`. Then if we have a number `num <= miss` in the given array, we can add it to those smaller sums to build all sums in `[0,miss+num)`. If we don't, then we must add such a number to the array, and it's best to add `miss` itself, to maximize the reach.\\n\\n---\\n\\n**Example:** Let's say the input is `nums = [1, 2, 4, 13, 43]` and `n = 100`. We need to ensure that all sums in the range [1,100] are possible.\\n\\nUsing the given numbers 1, 2 and 4, we can already build all sums from 0 to 7, i.e., the range [0,8). But we can't build the sum 8, and the next given number (13) is too large. So we insert 8 into the array. Then we can build all sums in [0,16).\\n\\nDo we need to insert 16 into the array? No! We can already build the sum 3, and adding the given 13 gives us sum 16. We can also add the 13 to the other sums, extending our range to [0,29).\\n\\nAnd so on. The given 43 is too large to help with sum 29, so we must insert 29 into our array. This extends our range to [0,58). But then the 43 becomes useful and expands our range to [0,101). At which point we're done.\\n\\n---\\n\\n**Another implementation**, though I prefer the above one.\\n\\n    int minPatches(vector<int>& nums, int n) {\\n        int count = 0, i = 0;\\n        for (long miss=1; miss <= n; count++)\\n            miss += (i < nums.size() && nums[i] <= miss) ? nums[i++] : miss;\\n        return count - i;\\n    }"
		},
		{
			"lc_ans_id":"78495",
			"view":"9832",
			"top":"1",
			"title":"Share my thinking process",
			"vote":"132",
			"content":"The question asked for the \"**minimum** number of patches required\". In other words, it asked for an optimal solution. Lots of problems involving optimal solution can be solved by dynamic programming and/or greedy algorithm. I started with greedy algorithm which is conceptually easy to design. Typically, a greedy algorithm needs selection of best moves for a subproblem. So what is our best move? \\n\\nThink about this example: nums = [1, 2, 3, 9].  We naturally want to iterate through nums from left to right and see what we would discover. After we encountered 1, we know 1...1 is patched completely. After encountered 2, we know 1...3 (1+2) is patched completely. After we encountered 3, we know 1...6 (1+2+3) is patched completely. After we encountered 9, the smallest number we can get is 9. So we must patch a new number here so that we don't miss 7, 8. To have 7, the numbers we can patch is 1, 2, 3 ... 7. Any number greater than 7 won't help here. Patching  8 will not help you get 7. So we have 7 numbers (1...7) to choose from. I hope you can see number 7 works best here because if we chose number 7, we can move all the way up to 1+2+3+7 = 13. (1...13 is patched completely) and it makes us reach n as quickly as possible. After we patched 7 and reach 13, we can consider last element 9 in nums. Having 9 makes us reach 13+9 = 22, which means 1...22 is completely patched. If we still did't reach n, we can then patch 23, which makes 1...45 (22+23) completely patched. We continue until we reach n."
		},
		{
			"lc_ans_id":"78492",
			"view":"3357",
			"top":"2",
			"title":"C++, 8ms, greedy solution with explanation",
			"vote":"36",
			"content":"show the algorithm with an example,\\n\\nlet nums=[1 2 5 6 20], n = 50.\\n\\nInitial value: with 0 nums, we can only get 0 maximumly.\\n\\nThen we need to get 1, since nums[0]=1, then we can get 1 using [1]. now the maximum number we can get is 1. (actually, we can get all number no greater than the maximum number)\\n\\n    number used [1], number added []\\n    can achieve 1~1\\n\\nThen we need to get 2 (maximum number +1). Since nums[1]=2, we can get 2. Now we can get all number between 1 ~ 3 (3=previous maximum value + the new number 2). and 3 is current maximum number we can get.\\n\\n    number used [1 2], number added []\\n    can achieve 1~3\\n\\nThen we need to get 4 (3+1). Since nums[2]=5>4; we need to add a new number to get 4. The optimal solution is to add 4 directly. In this case, we could achieve maximumly 7, using [1,2,4].\\n\\n    number used [1 2], number added [4]\\n    can achieve 1~7\\n\\nThen we need to get 8 (7+1). Since nums[2]=5<8, we can first try to use 5. Now the maximum number we can get is 7+5=12. Since 12>8, we successfully get 8.\\n\\n    number used [1 2 5], number added [4]\\n    can achieve 1~12\\n\\nThen we need to get 13 (12+1), Since nums[3]=6<13, we can first try to use 6. Now the maximum number we can get is 12+6=18. Since 18>13, we successfully get 13.\\n\\n    number used [1 2 5 6], number added [4]\\n    can achieve 1~18\\n\\nThen we need to get 19 (18+1), Since nums[4]=20>19, we need to add a new number to get 19. The optimal solution is to add 19 directly. In this case, we could achieve maximumly 37.\\n\\n    number used [1 2 5 6], number added [4 19]\\n    can achieve 1~37\\n\\nThen we need to get 38(37+1), Since nums[4]=20<38, we can first try to use 20. Now the maximum number we can get is 37+20=57. Since 57>38, we successfully get 38.\\n\\n    number used [1 2 5 6 20], number added [4 19]\\n    can achieve 1~57\\n\\nSince 57>n=50, we can all number no greater than 50. \\n\\nThe extra number we added are 4 and 19,  so we return 2.\\n\\n\\nThe code is given as follows\\n\\n    class Solution {\\n    public:\\n    int minPatches(vector<int>& nums, int n) {\\n        int cnt=0,i=0;\\n        long long maxNum=0;\\n        while (maxNum<n){\\n           if (i<nums.size() && nums[i]<=maxNum+1)\\n                maxNum+=nums[i++];\\n           else{\\n                maxNum+=maxNum+1;cnt++;\\n           }\\n       }\\n       return cnt;\\n    }\\n    };"
		},
		{
			"lc_ans_id":"78490",
			"view":"4016",
			"top":"3",
			"title":"Share my greedy solution by Java with simple explanation (time: 1 ms)",
			"vote":"23",
			"content":"    public static int minPatches(int[] nums, int n) {\\n\\t\\tlong max = 0;\\n\\t\\tint cnt = 0;\\n\\t\\tfor (int i = 0; max < n;) {\\n\\t\\t\\tif (i >= nums.length || max < nums[i] - 1) {\\n\\t\\t\\t\\tmax += max + 1;\\n\\t\\t\\t\\tcnt++;\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tmax += nums[i];\\n\\t\\t\\t\\ti++;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn cnt;\\n\\t}\\n\\nThe variable `max` records the maximal value that can be formed by the elements in `nums` and patched numbers. If `max` is less than `nums[i] - 1` which means we need to patch a new number, we then patch `max + 1`."
		},
		{
			"lc_ans_id":"78515",
			"view":"2268",
			"top":"4",
			"title":"My simple accepted C++ solution",
			"vote":"12",
			"content":"Idea: 1. Check the content if the current one is within sum +1, which is the total sum of all previous existing numbers. If yes, we proceed and update sum. If not, we patch one number that is within sum + 1. \\n2. Keep updating the sum until it reaches n.\\n   \\n\\n\\n\\n\\n\\n     int minPatches(vector<int>& nums, int n) {\\n        \\n        int len = nums.size();\\n        int sum = 0;\\n        int patch = 0;\\n        int count = 0;\\n\\n        while (sum < n) {\\n            if (count != len && nums[count] <= sum + 1) {\\n                sum += nums[count];\\n                count ++;\\n            }\\n            else {\\n                patch ++;\\n                if (sum > (INT_MAX - 1) / 2) {\\n                    sum = INT_MAX;\\n                }\\n                else {\\n                    sum = sum * 2 + 1;\\n                }\\n            }\\n        }\\n        \\n        return patch;\\n    }"
		},
		{
			"lc_ans_id":"78512",
			"view":"2800",
			"top":"5",
			"title":"Simple intuitive and well-explained solution accepted as best in C",
			"vote":"10",
			"content":"Before we hack this, we should be generous and think nothing about performance and try to come up with a sub-problem of it and then boot it from the beginning point.\\n\\nSo before we truly get started, let's suppose we are in a state where we can reach <font color=\"#ff0000\">**top**</font> by its sub-array nums[0...i] then what should we consider for the next element nums[i+1]? \\n\\n - now we need to check if `nums[i+1]<=top+1` then update <font color=\"#ff0000\">**top**</font> to **top+nums[i+1]** and move to the next element;\\n\\n - but if nums[i+1] is greater than top+1, then there is a gap (how many? God knows) between top and nums[i+1]; in this case we need to patch a number to the array, then what number it should be? As we have discussed, it should top+1 which will be the largest we can achieve now  **by patching** and then the top will be updated to **2*top+1**, right? Good, let's move on...\\n - the generalised case have been discussed, then so what's the start? As we can easily get that the start value should be 1 then the top should be initialized to 0 and then everything just moves around! \\n\\n> End of the story!\\n\\nAs for the time cost, the nums array is limited and n is then determined by the **top = 2*top+1** equation, so O(logn) should be better to describe its time cost.\\n\\n - Space cost O(1)\\n - Time cost O(logn)\\n\\n----------\\n\\n    int minPatches(int* nums, int size, int n)\\n    {\\n        int count=0, index=0;\\n        long long top = 0;\\n        while(top < n)\\n        {\\n            if(index<size && nums[index]<=(top+1))\\n                top += nums[index++];\\n            else\\n            {\\n                count++;\\n                top = 2*top+1;\\n            }\\n        }\\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"78498",
			"view":"765",
			"top":"6",
			"title":"Simple 9-line Python Solution",
			"vote":"9",
			"content":"    class Solution(object):\\n        def minPatches(self, nums, n):\\n            \"\"\"\\n            :type nums: List[int]\\n            :type n: int\\n            :rtype: int\\n            \"\"\"\\n            miss, i, added = 1, 0, 0\\n            while miss <= n:\\n                if i < len(nums) and nums[i] <= miss:\\n                    miss += nums[i]\\n                    i += 1\\n                else:\\n                    miss += miss\\n                    added += 1\\n            return added"
		},
		{
			"lc_ans_id":"78507",
			"view":"1977",
			"top":"7",
			"title":"1ms Java solution with explain",
			"vote":"8",
			"content":"    public int minPatches(int[] nums, int n) {\\n        int index = 0;\\n        int addedCount = 0;\\n        long canReachTo = 0;\\n        while( canReachTo < n){\\n            if( nums.length > index){\\n                int nextExisting = nums[index];\\n                if(nextExisting == canReachTo + 1){\\n                    canReachTo = (canReachTo << 1) + 1;\\n                    index++;\\n                } else if(nextExisting > canReachTo + 1){\\n                    addedCount++;\\n                    canReachTo = (canReachTo << 1) + 1;\\n                } else {\\n                    canReachTo = nextExisting + canReachTo;\\n                    index++;\\n                }\\n            } else {\\n                addedCount++;\\n                canReachTo = (canReachTo << 1) + 1;\\n            }\\n        }\\n        return addedCount;\\n    }\\n\\nThis solution is based on greedy method. \\nFor example, if you have 1, 2, it can reach 2+(2-1) = 3. So when we want to add up to 4, we have to add 4 into the list. And 1,2,4 can reach to 4+(4-1). \\nSimilarly, for any added number n, they can add up to n+(n-1) without missing one number. \\nIf there is one number x which satisfies n < x < n+(n-1), then we don't have to worry about the numbers until x + n + n - 1. Repeatedly evaluate the next number that the list of numbers can reach to, and add into the list next one when missing.\\nSo basically this method is <log(n) time complexity and O(1) space complexity."
		},
		{
			"lc_ans_id":"78544",
			"view":"1196",
			"top":"8",
			"title":"Simple C++ 12ms easy understanding O(n)",
			"vote":"6",
			"content":"    class Solution {\\n    public:\\n        int minPatches(vector<int>& nums, int n) {\\n            if (n == 0) return 0;\\n            int num = nums.size();\\n            long reach = 0;\\n            int patch = 0;\\n            for (int i = 0; i < num; ){\\n                while (nums[i] > reach + 1){\\n                    reach += (reach + 1);\\n                    ++patch;\\n                    if (reach >= n) return patch;\\n                }\\n                reach += nums[i];\\n                if (reach >= n) return patch;\\n                ++i;\\n            }\\n            while (reach < n){\\n                reach += (reach + 1);\\n                ++patch;\\n            } \\n            return patch;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"78547",
			"view":"746",
			"top":"9",
			"title":"Greedy solution in Python",
			"vote":"5",
			"content":"I used a greedy algorithm. When traversing through the given number list, consider each number as a **goal** and **resource**. When in the for loop for the *ith* number, try to add some numbers so that you can represent every number in the range [ 1, nums[i] ). Then, add the *ith* number to your source for further loops. \\n\\nTo reach the goal, suppose all the resource (the numbers smaller than the goal) sums to a number `sum`, then, `sum+1` is what we don't have. So we need to add a `sum+1` to our resource. And now you can represent all the numbers not bigger than `sum+sum+1`.\\n\\n    class Solution(object):\\n\\n    def minPatches(self, nums, n):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type n: int\\n        :rtype: int\\n        \"\"\"\\n        count = 0\\n        sum = 0\\n        for x in nums:\\n            if sum >= n:\\n                return count\\n            while sum < x-1:  # x-1 is the goal; when reaches the goal, we can represent [1, x)\\n                count += 1\\n                sum += sum + 1  # add a resource number\\n                if sum >= n:\\n                    return count\\n            sum += x\\n        while sum + 1 <= n:\\n            count += 1\\n            sum += sum + 1\\n        return count"
		}
	],
	"id":"330",
	"title":"Patching Array",
	"content":"<p>Given a sorted positive integer array <i>nums</i> and an integer <i>n</i>, add/patch elements to the array such that any number in range <code>[1, n]</code> inclusive can be formed by the sum of some elements in the array. Return the minimum number of patches required.\r\n</p>\r\n\r\n<p><strong>Example 1:</strong><br>\r\n<i>nums</i> = <code>[1, 3]</code>, <i>n</i> = <code>6</code><br>\r\nReturn <code>1</code>.</p>\r\n\r\n<p>Combinations of <i>nums</i> are <code>[1], [3], [1,3]</code>, which form possible sums of: <code>1, 3, 4</code>.<br>\r\nNow if we add/patch <code>2</code> to <i>nums</i>, the combinations are: <code>[1], [2], [3], [1,3], [2,3], [1,2,3]</code>.<br>\r\nPossible sums are <code>1, 2, 3, 4, 5, 6</code>, which now covers the range <code>[1, 6]</code>.<br>\r\nSo we only need <code>1</code> patch.</p>\r\n\r\n<p><strong>Example 2:</strong><br>\r\n<i>nums</i> = <code>[1, 5, 10]</code>, <i>n</i> = <code>20</code><br>\r\nReturn <code>2</code>.<br>\r\nThe two patches can be <code>[2, 4]</code>.</p>\r\n\r\n<p><strong>Example 3:</strong><br>\r\n<i>nums</i> = <code>[1, 2, 2]</code>, <i>n</i> = <code>5</code><br>\r\nReturn <code>0</code>.<br>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/dietpepsi\">@dietpepsi</a> for adding this problem and creating all test cases.</p>",
	"frequency":"304",
	"ac_num":"25137"
}