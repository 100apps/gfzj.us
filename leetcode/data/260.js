{
	"difficulty":"2",
	"submit_num":"146805",
	"show_id":"260",
	"leetcode_id":"260",
	"answers":[
		{
			"lc_ans_id":"68900",
			"view":"49656",
			"top":"0",
			"title":"Accepted C++/Java O(n)-time O(1)-space Easy Solution with Detail Explanations",
			"vote":"487",
			"content":"Once again, we need to use XOR to solve this problem. But this time, we need to do it in two passes:\\n\\n- In the first pass, we XOR all elements in the array, and get the XOR of the two numbers we need to find. Note that since the two numbers are distinct, so there must be a set bit (that is, the bit with value '1') in the XOR result. Find\\nout an arbitrary set bit (for example, the rightmost set bit).\\n\\n- In the second pass, we divide all numbers into two groups, one with the aforementioned bit set, another with the aforementinoed bit unset. Two different numbers we need to find must fall into thte two distrinct groups. XOR numbers in each group, we can find a number in either group.\\n\\n**Complexity:**\\n\\n- Time: *O* (*n*)\\n\\n- Space: *O* (1)\\n\\n**A Corner Case:**\\n\\n- When `diff == numeric_limits<int>::min()`, `-diff` is also `numeric_limits<int>::min()`. Therefore, the value of `diff` after executing `diff &= -diff` is still `numeric_limits<int>::min()`. The answer is still correct.\\n\\n\\nC++:\\n\\n    class Solution\\n    {\\n    public:\\n        vector<int> singleNumber(vector<int>& nums) \\n        {\\n            // Pass 1 : \\n            // Get the XOR of the two numbers we need to find\\n            int diff = accumulate(nums.begin(), nums.end(), 0, bit_xor<int>());\\n            // Get its last set bit\\n            diff &= -diff;\\n\\n            // Pass 2 :\\n            vector<int> rets = {0, 0}; // this vector stores the two numbers we will return\\n            for (int num : nums)\\n            {\\n                if ((num & diff) == 0) // the bit is not set\\n                {\\n                    rets[0] ^= num;\\n                }\\n                else // the bit is set\\n                {\\n                    rets[1] ^= num;\\n                }\\n            }\\n            return rets;\\n        }\\n    };\\n\\n\\nJava:\\n\\n    public class Solution {\\n        public int[] singleNumber(int[] nums) {\\n            // Pass 1 : \\n            // Get the XOR of the two numbers we need to find\\n            int diff = 0;\\n            for (int num : nums) {\\n                diff ^= num;\\n            }\\n            // Get its last set bit\\n            diff &= -diff;\\n            \\n            // Pass 2 :\\n            int[] rets = {0, 0}; // this array stores the two numbers we will return\\n            for (int num : nums)\\n            {\\n                if ((num & diff) == 0) // the bit is not set\\n                {\\n                    rets[0] ^= num;\\n                }\\n                else // the bit is set\\n                {\\n                    rets[1] ^= num;\\n                }\\n            }\\n            return rets;\\n        }\\n    }\\n\\nThanks for reading :)\\n\\n\\n----------\\n\\n\\nAcknowledgements:\\n\\n- Thank **@jianchao.li.fighter** for introducing this problem and for your encouragement.\\n\\n- Thank **@StefanPochmann** for your valuable suggestions and comments. Your idea of `diff &= -diff` is very elegent! And yes, it does not need to XOR for both group in the second pass. XOR for one group suffices. I revise my code accordingly. \\n\\n- Thank **@Nakagawa_Kanon** for posting this question and presenting the same idea in a previous thread (prior to this thread).\\n\\n- Thank **@caijun** for providing an interesting test case."
		},
		{
			"lc_ans_id":"68901",
			"view":"17978",
			"top":"1",
			"title":"Sharing explanation of the solution",
			"vote":"296",
			"content":"If you were stuck by this problem, it's easy to find a solution in the discussion. However, usually, the solution lacks some explanations.\\n\\nI'm sharing my understanding here:\\n\\nThe two numbers that appear only once must differ at some bit, this is how we can distinguish between them. Otherwise, they will be one of the duplicate numbers. \\n\\nOne important point is that by XORing all the numbers, we actually get the XOR of the two target numbers (because XORing two duplicate numbers always results in 0). Consider the XOR result of the two target numbers; if some bit of the XOR result is 1, it means that the two target numbers differ at that location. \\n\\nLet\\u2019s say the at the ith bit, the two desired numbers differ from each other. which means one number has bit i equaling: 0, the other number has bit i equaling 1.\\n\\nThus, all the numbers can be partitioned into two groups according to their bits at location i. \\nthe first group consists of all numbers whose bits at i is 0.\\nthe second group consists of all numbers whose bits at i is 1. \\n\\nNotice that, if a duplicate number has bit i as 0, then, two copies of it will belong to the first group. Similarly, if a duplicate number has bit i as 1, then, two copies of it will belong to the second group.\\n\\nby XoRing all numbers in the first group, we can get the first number.\\nby XoRing all numbers in the second group, we can get the second number."
		},
		{
			"lc_ans_id":"68921",
			"view":"12584",
			"top":"2",
			"title":"C++ solution O(n) time and O(1) space, easy-understaning with simple explanation",
			"vote":"97",
			"content":"    vector<int> singleNumber(vector<int>& nums) {\\n        int aXorb = 0;  // the result of a xor b;\\n        for (auto item : nums) aXorb ^= item;\\n        int lastBit = (aXorb & (aXorb - 1)) ^ aXorb;  // the last bit that a diffs b\\n        int intA = 0, intB = 0;\\n        for (auto item : nums) {\\n            // based on the last bit, group the items into groupA(include a) and groupB\\n            if (item & lastBit) intA = intA ^ item;\\n            else intB = intB ^ item;\\n        }\\n        return vector<int>{intA, intB};   \\n    }"
		},
		{
			"lc_ans_id":"68923",
			"view":"10988",
			"top":"3",
			"title":"Bit manipulation beats 99.62%",
			"vote":"58",
			"content":"Find the rightmost set bit, divide numbers into two groups. Each group will end up being one unique number.\\n\\n    public int[] singleNumber(int[] nums) {\\n        int result[] = new int[2];        \\n        int xor = nums[0];\\n        for (int i=1; i<nums.length; i++)\\n        {\\n            xor ^= nums[i];\\n        }\\n        \\n        int bit = xor & ~(xor-1);\\n        int num1 = 0;\\n        int num2 = 0;\\n        \\n        for (int num : nums)\\n        {\\n            if ((num & bit) > 0)\\n            {\\n                num1 ^= num;\\n            }\\n            else\\n            {\\n                num2 ^= num;\\n            }\\n        }\\n        \\n        result[0] = num1;\\n        result[1] = num2;\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"68945",
			"view":"3919",
			"top":"4",
			"title":"Share my C++ solution,",
			"vote":"37",
			"content":"> 1.assume that A and B are the two elements which we want to find;\\n\\n>2.use XOR for all elements,the result is : r = A^B,we just need to distinguish A from B next step;\\n\\n>3.if we can find a bit '1' in r,then the bit in corresponding position in A and B must be different.We can use {last = r & (~(r-1))} to get the last bit 1 int r;\\n\\n>4.we use last to divide all numbers into two groups,then A and B must fall into the two distrinct groups.XOR elements in eash group,get the A and B.\\n\\n    class Solution {\\n    public:\\n        vector<int> singleNumber(vector<int>& nums) {\\n            int r = 0, n = nums.size(), i = 0, last = 0;\\n            vector<int> ret(2, 0);\\n            \\n            for (i = 0; i < n; ++i) \\n                r ^= nums[i];\\n            \\n            last = r & (~(r - 1));\\n            for (i = 0; i < n; ++i)\\n            {\\n                if ((last & nums[i]) != 0)\\n                    ret[0] ^= nums[i];\\n                else\\n                    ret[1] ^= nums[i];\\n            }\\n            \\n            return ret;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"69006",
			"view":"4391",
			"top":"5",
			"title":"My Java solution adapted from the commonest solution here",
			"vote":"34",
			"content":"I read @zhiqing_xiao 's post to get an idea about the solution. His solution is really smart and elegant, but it took me a while to get understand how \"diff &= -diff\" works. I changed it a little bit to make it better understood, but it is totally based on his solution.\\n\\nInstead of using the right-most \"1\" of diff, I used the left-most \"1\" to divide groups. This should also do the trick.\\n\\n    public class Solution {\\n    public int[] singleNumber(int[] nums) {\\n        int diff = 0;\\n        for(int num: nums){\\n            diff^=num;\\n        }\\n        diff = Integer.highestOneBit(diff);\\n        \\n        int[] result = new int[2];\\n        Arrays.fill(result,0);\\n        for(int num: nums){\\n            if((diff & num) == 0){\\n                result[0] ^= num;\\n            }\\n            else{\\n                result[1] ^= num;\\n            }\\n        }\\n        return result;\\n    }\\n}"
		},
		{
			"lc_ans_id":"68953",
			"view":"3310",
			"top":"6",
			"title":"I only want to say: this problem is not Medium,it is Hard!",
			"vote":"29",
			"content":"What a strange brain can get the solution!:)"
		},
		{
			"lc_ans_id":"69007",
			"view":"2167",
			"top":"7",
			"title":"C O(n)-time O(1)-space 7-line Solution with Detail Explanation",
			"vote":"23",
			"content":"    int* singleNumber(int* nums, int numsSize, int* returnSize) {\\n        int i, *ret = calloc(*returnSize = 2, sizeof(int));\\n        for(i = 0; i < numsSize; ret[0] ^= nums[i++]);\\n        for(i = 0; i < numsSize; i++)\\n            if(nums[i] & ret[0] & -ret[0])\\n                ret[1] ^= nums[i];\\n        ret[0] ^= ret[1];\\n        return ret;\\n    }\\n\\nHowever I posted this question some days ago at https://leetcode.com/discuss/48119/single-number-iii .\\n\\n 1. x = xor of each element in the list ==> x = a xor b\\n 2. a != b => there are at least one 1-bit in x\\n 3. take an arbitrary 1-bit (which means a and b is different on this bit), the elements in the array can be classified into two groups according to this bit: one of them contains a, the other contains b. \\n 4. a = xor of each element in the list which the corresponding bit = 0 \\n 5. b = a xor x"
		},
		{
			"lc_ans_id":"69013",
			"view":"2036",
			"top":"8",
			"title":"16ms C++ solution",
			"vote":"22",
			"content":"Assume that the two single numbers are x and y. \\n\\n1. XOR all the numbers and all the duplicates will be neutralized, so the result will be x^y.\\n2. Get the number which contains a single one bit, i.e., the lowest one bit of x^y.\\n3. XOR all the numbers which has the lowest one bit of x^y. Assume that the lowest one bit of x^y comes from x. Then y won't be included in the xor operations. Since those duplicates which also have the lowest one bit of x^y are neutralized, the result will be x.\\n\\nCode:\\n\\n    class Solution \\n    {\\n    public:\\n        vector<int> singleNumber(vector<int>& nums) \\n        {\\n            vector<int> res;\\n            \\n            // Assume that the two single numbers are x and y. \\n            // XOR all the numbers and all the duplicates will \\n            // be neutralized, so the result will be x^y.\\n            int xXorY = 0;\\n            for (auto& i : nums)\\n            {\\n                xXorY ^= i;\\n            }\\n            \\n            // Get the number which contains a single one bit, \\n            // i.e., the lowest one bit of x^y.\\n            int lowestOneBit = xXorY & (~(xXorY - 1));\\n            \\n            // XOR all the numbers which has the lowest one bit \\n            // of x^y. Assume that the lowest one bit of x^y \\n            // comes from x. Then y won't be included in the \\n            // xor operations. Since those duplicates which also  \\n            // have the lowest one bit of x^y are neutralized, \\n            // the result will be x.\\n            int x = 0;\\n            for (auto& i : nums)\\n            {\\n                if (i & lowestOneBit)\\n                {\\n                    x ^= i;\\n                }\\n            }\\n            \\n            // y = (x^y)^x.\\n            int y = xXorY ^ x;\\n            \\n            res.push_back(x);\\n            res.push_back(y);\\n            \\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"68931",
			"view":"3491",
			"top":"9",
			"title":"Easy Python O(n) - O(1) solution",
			"vote":"17",
			"content":"    class Solution(object):\\n        def singleNumber(self, nums):\\n            \"\"\"\\n            :type nums: List[int]\\n            :rtype: List[int]\\n            \"\"\"\\n            xor = 0\\n            a = 0\\n            b = 0\\n            for num in nums:\\n                xor ^= num\\n            mask = 1\\n            while(xor&mask == 0):\\n                mask = mask << 1\\n            for num in nums:\\n                if num&mask:\\n                    a ^= num\\n                else:\\n                    b ^= num\\n            return [a, b]"
		}
	],
	"id":"260",
	"title":"Single Number III",
	"content":"<p>\r\nGiven an array of numbers <code>nums</code>, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.\r\n</p>\r\n<p>\r\nFor example:\r\n</p>\r\n<p>\r\nGiven <code>nums = [1, 2, 1, 3, 2, 5]</code>, return <code>[3, 5]</code>.\r\n</p>\r\n<p>\r\n<b>Note</b>:<br>\r\n<ol>\r\n<li>The order of the result is not important. So in the above example, <code>[5, 3]</code> is also correct.</li>\r\n<li>Your algorithm should run in linear runtime complexity. Could you implement it using only constant space complexity?</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"471",
	"ac_num":"77402"
}