{
	"difficulty":"1",
	"submit_num":"548803",
	"show_id":"70",
	"leetcode_id":"70",
	"answers":[
		{
			"lc_ans_id":"25299",
			"view":"49580",
			"top":"0",
			"title":"Basically it's a fibonacci.",
			"vote":"240",
			"content":"The problem seems to be a *dynamic programming* one. **Hint**: the tag also suggests that! \\nHere are the steps to get the solution incrementally. \\n\\n- Base cases:  \\nif n <= 0, then the number of ways should be zero. \\nif n == 1, then there is only way to climb the stair. \\nif n == 2, then there are two ways to climb the stairs. One solution is one step by another; the other one is two steps at one time. \\n\\n- The key intuition to solve the problem is that given a number of stairs n, if we know the number ways to get to the points `[n-1]` and `[n-2]` respectively, denoted as `n1` and `n2` , then the total ways to get to the point `[n]` is `n1 + n2`. Because from the `[n-1]` point, we can take one single step to reach `[n]`. And from the `[n-2]` point, we could take two steps to get there. There is NO overlapping between these two solution sets, because we differ in the final step. \\n\\nNow given the above intuition, one can construct an array where each node stores the solution for each number n. Or if we look at it closer, it is clear that this is basically a fibonacci number, with the starting numbers as 1 and 2, instead of 1 and 1. \\n\\nThe implementation in Java as follows: \\n\\n    public int climbStairs(int n) {\\n        // base cases\\n        if(n <= 0) return 0;\\n        if(n == 1) return 1;\\n        if(n == 2) return 2;\\n        \\n        int one_step_before = 2;\\n        int two_steps_before = 1;\\n        int all_ways = 0;\\n        \\n        for(int i=2; i<n; i++){\\n        \\tall_ways = one_step_before + two_steps_before;\\n        \\ttwo_steps_before = one_step_before;\\n\\t        one_step_before = all_ways;\\n        }\\n        return all_ways;\\n    }"
		},
		{
			"lc_ans_id":"25296",
			"view":"24438",
			"top":"1",
			"title":"3-4 short lines in every language",
			"vote":"70",
			"content":"Same simple algorithm written in every offered language. Variable `a` tells you the number of ways to reach the current step, and `b` tells you the number of ways to reach the next step. So for the situation one step further up, the old `b` becomes the new `a`, and the new `b` is the old `a+b`, since that new step can be reached by climbing 1 step from what `b` represented or 2 steps from what `a` represented.\\n\\nRuby wins, and *\"the C languages\"* all look the same.\\n\\n**Ruby** (60 ms)\\n\\n    def climb_stairs(n)\\n        a = b = 1\\n        n.times { a, b = b, a+b }\\n        a\\n    end\\n\\n**C++** (0 ms)\\n\\n    int climbStairs(int n) {\\n        int a = 1, b = 1;\\n        while (n--)\\n            a = (b += a) - a;\\n        return a;\\n    }\\n\\n**Java** (208 ms)\\n\\n    public int climbStairs(int n) {\\n        int a = 1, b = 1;\\n        while (n-- > 0)\\n            a = (b += a) - a;\\n        return a;\\n    }\\n\\n**Python** (52 ms)\\n\\n    def climbStairs(self, n):\\n        a = b = 1\\n        for _ in range(n):\\n            a, b = b, a + b\\n        return a\\n\\n**C** (0 ms)\\n\\n    int climbStairs(int n) {\\n        int a = 1, b = 1;\\n        while (n--)\\n            a = (b += a) - a;\\n        return a;\\n    }\\n\\n**C#** (48 ms)\\n\\n    public int ClimbStairs(int n) {\\n        int a = 1, b = 1;\\n        while (n-- > 0)\\n            a = (b += a) - a;\\n        return a;\\n    }\\n\\n**Javascript** (116 ms)\\n\\n    var climbStairs = function(n) {\\n        a = b = 1\\n        while (n--)\\n            a = (b += a) - a\\n        return a\\n    };"
		},
		{
			"lc_ans_id":"25345",
			"view":"21493",
			"top":"2",
			"title":"Easy solutions for suggestions.",
			"vote":"49",
			"content":"Hi guys, I come up with this arithmetic way. Find the inner logic relations and get the answer.\\n\\n\\n    public class Solution {\\n    \\n    public int climbStairs(int n) {\\n        if(n == 0 || n == 1 || n == 2){return n;}\\n        int[] mem = new int[n];\\n        mem[0] = 1;\\n        mem[1] = 2;\\n        for(int i = 2; i < n; i++){\\n            mem[i] = mem[i-1] + mem[i-2];\\n        }\\n        return mem[n-1];\\n    }\\n    \\n}"
		},
		{
			"lc_ans_id":"25313",
			"view":"7067",
			"top":"3",
			"title":"Python different solutions (bottom up, top down).",
			"vote":"25",
			"content":"    \\n    # Top down - TLE\\n    def climbStairs1(self, n):\\n        if n == 1:\\n            return 1\\n        if n == 2:\\n            return 2\\n        return self.climbStairs(n-1)+self.climbStairs(n-2)\\n     \\n    # Bottom up, O(n) space\\n    def climbStairs2(self, n):\\n        if n == 1:\\n            return 1\\n        res = [0 for i in xrange(n)]\\n        res[0], res[1] = 1, 2\\n        for i in xrange(2, n):\\n            res[i] = res[i-1] + res[i-2]\\n        return res[-1]\\n    \\n    # Bottom up, constant space\\n    def climbStairs3(self, n):\\n        if n == 1:\\n            return 1\\n        a, b = 1, 2\\n        for i in xrange(2, n):\\n            tmp = b\\n            b = a+b\\n            a = tmp\\n        return b\\n        \\n    # Top down + memorization (list)\\n    def climbStairs4(self, n):\\n        if n == 1:\\n            return 1\\n        dic = [-1 for i in xrange(n)]\\n        dic[0], dic[1] = 1, 2\\n        return self.helper(n-1, dic)\\n        \\n    def helper(self, n, dic):\\n        if dic[n] < 0:\\n            dic[n] = self.helper(n-1, dic)+self.helper(n-2, dic)\\n        return dic[n]\\n        \\n    # Top down + memorization (dictionary)  \\n    def __init__(self):\\n        self.dic = {1:1, 2:2}\\n        \\n    def climbStairs(self, n):\\n        if n not in self.dic:\\n            self.dic[n] = self.climbStairs(n-1) + self.climbStairs(n-2)\\n        return self.dic[n]"
		},
		{
			"lc_ans_id":"25436",
			"view":"8183",
			"top":"4",
			"title":"Using the Fibonacci formular to get the answer directly",
			"vote":"23",
			"content":"    \\nThis is Fibonacci number, and the world has already worked out an formula that\\n\\n![enter image description here][1]\\n\\nand where \\n\\n![enter image description here][2]\\n\\nor you can check the wiki [Fibonacci Number][3]\\n\\nand noticed the Fibonacci begins with F(0)=0, F(1)=1, F(2)=1, F(3)=2\\n\\nbut this problem begins with F'(1)=1, F'(2)=2\\n\\nSo we need a (n++) at the beginning to match the Fibonacci formula\\n\\n    int climbStairs(int n) {\\n        n++;\\n        double root5 = pow(5, 0.5);\\n        double result = 1/root5*( pow((1+root5)/2, n) - pow((1-root5)/2, n) );\\n        return (int)(result);\\n    }\\n\\n\\n  [1]: https://upload.wikimedia.org/math/5/9/9/5992591704ae747ece79e8808dcadd63.png\\n  [2]: https://upload.wikimedia.org/math/4/9/e/49e8a76ceee7c67c84383ebdf06683be.png\\n  [3]: https://en.wikipedia.org/wiki/Fibonacci_number"
		},
		{
			"lc_ans_id":"25609",
			"view":"2595",
			"top":"5",
			"title":"Simple and Clear 2ms Solution in C++ Without Recursion",
			"vote":"18",
			"content":"    class Solution {\\n    public:\\n        int climbStairs(int n) {\\n            int StepOne = 1;\\n            int StepTwo = 0;\\n            int ret = 0;\\n            for(int i=0;i<n;i++)\\n            {\\n                ret = StepOne + StepTwo;\\n                StepTwo = StepOne;\\n                StepOne = ret;\\n            }\\n            return ret;\\n        }\\n    };\\n\\nThis problem is a Fibonacci problem.\\nF(n)=F(n-1)+F(n-2);\\nSolving this problem by recursion ,we will do a lot of same recursion.\\nExample:\\nF(10)=F(9)+F(8);\\nF(9)=F(8)+F(7);\\nwe calculate F(8) twice,when n is large,this will increase as a rate of n's exponent.\\n\\nSo a more efficient way to solve this problem is from Bottom to Top.\\nCalculate F(0) ,F(1);\\nthen F(2)........."
		},
		{
			"lc_ans_id":"25315",
			"view":"3824",
			"top":"6",
			"title":"My DP solution in C++ with explanation",
			"vote":"15",
			"content":"     int climbStairs(int n) \\n    {\\n         vector<int> steps(n,0);\\n         steps[0]=1;\\n         steps[1]=2;\\n         for(int i=2;i<n;i++)\\n         {\\n             steps[i]=steps[i-2]+steps[i-1];\\n         }\\n         return steps[n-1];\\n     }\\n\\nArray 'steps' stands for how many distinct ways to climb to each level (index from 0,  so 0 means level 1, 1 means level 2 and so on.... ).   It's trivial to know it has 1 distinct way to climb to stair 1 , and 2 distinct ways to climb to stair 2 .   For stair level n (n>=3) ,   you can either (1) climb to stair n-2 , and climb 2 more steps to reach n  ,  OR (2) climb to stair n-1, and climb 1 more step to reach n.   That said ,  steps[n]=steps[n-1]+steps[n-2].     In another word,  the number of distinct ways to reach level n is the sum of  number of distinct ways to reach level n-1 and n-2."
		},
		{
			"lc_ans_id":"25459",
			"view":"2667",
			"top":"7",
			"title":"Memoization with recursion, top-down approach + Dynamic Programming, bottom-up",
			"vote":"15",
			"content":"This problem is nothing but a Fibonacci Sequence.\\n\\nLet\\u2019s define a function T(n) for the number of choices available with n stairs(n steps).There are 2 choices for the first step: One choice is to climb only one stair, and has T(n-1) choices for the remaining n-1 stairs. The other one is to jump two stairs at the first step, and has T(n-2) choices for the remaining n-2 stairs. Therefore, the total number of choices for n stairs is T(n) = T(n-1) + T(n- 2), which is the nothing but Fibonacci Sequence.\\n\\nFor example, there are three choices to climb up a stair with three levels: (1) climb in three steps, one stair for each climb; (2) climb in two steps, one level for the first step and two levels for the second; or (3) climb with two steps, two levels for the first step and one level for the last jump.\\n\\nNow if we code a recursive function T(n) = T(n-1) + T(n-2), each recursive call is called twice for large n, making 2^n calls. This is not recommended. Instead, we save result from each call and check if its available before triggering another call. \\n\\nThis type of saving the intermediate results to get final result is called Memoization. Here we follow top-down approach.\\n\\n    int f(int n, int *arr)\\n    {\\n    \\tif (n == 0 || n == 1) return 1;\\n    \\tif (arr[n] != 0) return arr[n];\\n    \\telse{\\n    \\t  arr[n] = f(n - 1, arr) + f(n - 2, arr);\\n    \\t  return arr[n];\\n    \\t}\\n    }\\n\\n    int climbStairs(int n) {\\n    \\tint *p = (int *)malloc(sizeof(int) * (n + 1));\\n    \\tint res, i;\\n    \\t\\n    \\tif (n == 0 || n == 1) p[n] = 1;  //Base condition\\n    \\t\\n    \\tfor (i = 2; i <= n; i++) p[i] = 0; //For memoization, defaulting all values to 0\\n    \\t\\n    \\tres = f(n, p);\\n    \\tfree(p);\\n    \\t\\n    \\treturn res;\\n    }\\n\\nNow this even can be simplified, what we call as 'Dynamic Programming'. Instead of going from top down, we will do bottom up approach. Calculate T(n) for small values and build larger values using them.\\nThe code looks something like this...\\n\\n    ....\\n    store[0] = 1;\\n    store[1] = 1;\\n    for (i = 2; i <=n; i++)\\n        store[i] = store[i - 1] + store[i - 2];\\n    return store[n];\\n    ..."
		},
		{
			"lc_ans_id":"25338",
			"view":"3679",
			"top":"8",
			"title":"Fibonacci sequence solution in Java",
			"vote":"12",
			"content":"public class Solution {\\n\\n    public int climbStairs(int n) {\\n        if(n < 0)\\n            return 0;\\n        if(n == 1)\\n            return 1;\\n            \\n        int[] store = new int[n];\\n        \\n        store[0] = 1;\\n        store[1] = 2;\\n        \\n        for(int i = 2; i < n; ++i)\\n            store[i] = store[i-1] + store[i-2];\\n            \\n        return store[n-1];\\n    }\\n}"
		},
		{
			"lc_ans_id":"25368",
			"view":"2928",
			"top":"9",
			"title":"Dynamic Programming Solution Using Java",
			"vote":"9",
			"content":"\\n\\n    /*\\n     * Ideas:\\n     * Use Dynamic Programming,\\n     * for each step, the stair could ether combine with the previous one or as a single step.\\n     * Ways to climb to ith stair is W(i) = W(i-1) + W(i-2)\\n     * where W(i-1) is when the ith stair is as a single step\\n     * and W(i-2) is when the ith stair is paired with the previous one.\\n     */\\n    public int climbStairs(int n) {\\n            int[] tmp = new int[n];\\n            if (n < 2){\\n                return 1;\\n            }\\n            tmp[0] = 1;\\n            tmp[1] = 2;\\n            for (int i = 2; i < n; i++){\\n                tmp[i] = tmp[i-1] + tmp[i-2];\\n            }\\n            return tmp[n-1];\\n        }"
		}
	],
	"id":"70",
	"title":"Climbing Stairs",
	"content":"<p>You are climbing a stair case. It takes <i>n</i> steps to reach to the top.</p>\r\n\r\n<p>Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\r\n</p>\r\n\r\n<p><b>Note:</b> Given <i>n</i> will be a positive integer.\r\n</p>\r\n\r\n<br />\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b> 2\r\n<b>Output:</b>  2\r\n<b>Explanation:</b>  There are two ways to climb to the top.\r\n\r\n1. 1 step + 1 step\r\n2. 2 steps\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b> 3\r\n<b>Output:</b>  3\r\n<b>Explanation:</b>  There are three ways to climb to the top.\r\n\r\n1. 1 step + 1 step + 1 step\r\n2. 1 step + 2 steps\r\n3. 2 steps + 1 step\r\n</pre>\r\n</p>",
	"frequency":"586",
	"ac_num":"224204"
}