{
	"difficulty":"2",
	"submit_num":"87834",
	"show_id":"397",
	"leetcode_id":"397",
	"answers":[
		{
			"lc_ans_id":"87920",
			"view":"19594",
			"top":"0",
			"title":"A couple of Java solutions with explanations",
			"vote":"119",
			"content":"I really think it should be tagged medium because there are many subtleties and good understanding of binary arithmetic is required.\\n\\nThe first step towards solution is to realize that you're allowed to remove the LSB only if it's zero. And to reach the target as fast as possible, removing digits is the best way to go. Hence, even numbers are better than odd. This is quite obvious.\\n\\nWhat is not so obvious is what to do with odd numbers. One may think that you just need to remove as many 1's as possible to increase the evenness of the number. Wrong! Look at this example:\\n\\n    111011 -> 111010 -> 11101 -> 11100 -> 1110 -> 111 -> 1000 -> 100 -> 10 -> 1\\n\\nAnd yet, this is not the best way because\\n\\n    111011 -> 111100 -> 11110 -> 1111 -> 10000 -> 1000 -> 100 -> 10 -> 1\\n\\nSee? Both ```111011 -> 111010``` and ```111011 -> 111100``` remove the same number of 1's, but the second way is better.\\n\\nSo, we just need to remove as many 1's as possible, doing +1 in case of a tie? Not quite. The infamous test with n=3 fails for that strategy because ```11 -> 10 -> 1``` is better than ```11 -> 100 -> 10 -> 1```. Fortunately, that's the only exception (or at least I can't think of any other, and there are none in the tests).\\n\\nSo the logic is:\\n\\n1. If ```n``` is even, halve it.\\n2. If ```n=3``` or ```n-1``` has less 1's than ```n+1```, decrement ```n```.\\n3. Otherwise, increment ```n```.\\n\\nHere is an example of such a solution in Java:\\n\\n    public int integerReplacement(int n) {\\n        int c = 0;\\n        while (n != 1) {\\n            if ((n & 1) == 0) {\\n                n >>>= 1;\\n            } else if (n == 3 || Integer.bitCount(n + 1) > Integer.bitCount(n - 1)) {\\n                --n;\\n            } else {\\n                ++n;\\n            }\\n            ++c;\\n        }\\n        return c;\\n    }\\n\\nOf course, doing ```bitCount``` on every iteration is not the best way. It is enough to examine the last two digits to figure out whether incrementing or decrementing will give more 1's. Indeed, if a number ends with 01, then certainly decrementing is the way to go. Otherwise, if it ends with 11, then certainly incrementing is at least as good as decrementing (```*011 -> *010 / *100```) or even better (if there are three or more 1's). This leads to the following solution:\\n\\n    public int integerReplacement(int n) {\\n        int c = 0;\\n        while (n != 1) {\\n            if ((n & 1) == 0) {\\n                n >>>= 1;\\n            } else if (n == 3 || ((n >>> 1) & 1) == 0) {\\n                --n;\\n            } else {\\n                ++n;\\n            }\\n            ++c;\\n        }\\n        return c;\\n    }\\n\\nAn alternative approach to intuitive algorithm was very well put by @dettier in a [discussion](https://discuss.leetcode.com/topic/58330/is-this-greedy-solution-correct/6): you should create as many trailing zeroes as you can. This way you can avoid the tie-breaking trap (there can be no ties), but you'll still have to handle the n=3 exception separately."
		},
		{
			"lc_ans_id":"87928",
			"view":"7016",
			"top":"1",
			"title":"Java 12 line 4(5)ms iterative solution with explanations. No other data structures.",
			"vote":"42",
			"content":"When n is even, the operation is fixed. The procedure is unknown when it is odd. When n is odd it can be written into the form n = 2k+1 (k is a non-negative integer.). That is, n+1 = 2k+2 and n-1 = 2k. Then, (n+1)/2 = k+1 and (n-1)/2 = k. So one of (n+1)/2 and (n-1)/2 is even, the other is odd. And the \"best\" case of this problem is to divide as much as possible. Because of that, always pick n+1 or n-1 based on if it can be divided by 4. The only special case of that is when n=3 you would like to pick n-1 rather than n+1.   \\n   \\n    public int integerReplacement(int n) {\\n        if (n == Integer.MAX_VALUE) return 32; //n = 2^31-1;\\n        int count = 0;\\n        while (n > 1){\\n            if (n % 2 == 0) n  /= 2;\\n            else{\\n                if ( (n + 1) % 4 == 0 && (n - 1 != 2) ) n++;\\n                else n--;\\n            }\\n            count++;\\n        }\\n        return count;\\n    }"
		},
		{
			"lc_ans_id":"87948",
			"view":"2840",
			"top":"2",
			"title":"Python O(log n) time, O(1) space with explanation and proof",
			"vote":"15",
			"content":"Denote f(n) the minimum number of jumps from n to 1.\\nBy definition, we have the recurrence\\nf(1) = 0, f(2n) = 1 + f(n), f(2n + 1) = min(f(2n) + 1, f(2n + 2) + 1).\\nFirst notice that this sequence is well defined because f(2n + 2) = f(n + 1) + 1, so f(2n + 1) = min(f(2n) + 1, f(n + 1) + 2). Every element is defined by some element before it.\\nWe want to show (*):\\nIf n % 4 = 3 and n != 3, then f(n) = f(n + 1) + 1.\\nIf n % 4 = 1 or n = 3, then f(n) = f(n - 1) + 1.\\nThis gives us an O(log n) time, O(1) space solution.\\n\\n```\\nclass Solution(object):\\n    def integerReplacement(self, n):\\n        rtn = 0\\n        while n > 1:\\n            rtn += 1\\n            if n % 2 == 0:\\n                n //= 2\\n            elif n % 4 == 1 or n == 3:\\n                n -= 1\\n            else:\\n                n += 1\\n        return rtn\\n```\\nIn this code, n will drop to at most n / 2 in at most 2 iterations, so the number of iterations is at most 2 * log(n). In each iteration, the time complexity is constant. So the overall time complexity is O(log n). The space complexity is obviously 1. Correctness is guaranteed by (*).\\n\\n\\nLemma 1. f(k+1) <= f(k) + 1\\nProve by induction:\\nf(2) = 1 <= 0 + 1 = f(1) + 1\\nAssume this hold for any 1 <= k' < k,\\nIf k is even, f(k + 1) = min(f(k) + 1, f(k + 2) + 1) <= f(k) + 1;\\nIf k is odd, denote k = 2l + 1 (l >= 1), then f(k + 1) = f(2l + 2) = 1 + f(l + 1) <= 1 + 1 + f(l) = 1 + f(2l) = 1 + f(k - 1). Also, f(k + 1) = 1 + f(l + 1) = f(2l + 2) = f(k + 1) <= f(k + 1) + 1. Hence, f(k + 1) <= min(f(k - 1) + 1, f(k + 1) + 1) = f(k) <= f(k) + 1.\\n\\nLemma 2. f(k) <= 1 + f(k + 1), k >= 1\\nProve by induction:\\nf(1) = 0 <= 1 + f(2)\\nAssume this hold for any 1 <= k' < k,\\nIf k is odd, f(k) = min(1 + f(k - 1), 1 + f(k + 1)) <= 1 + f(k + 1)\\nIf k is even, denote k = 2l (l >= 1), then f(k) = f(2l) = 1 + f(l)\\n1 + f(l) <= 3 + f(l) = 2 + f(2l) = 1 + (1 + f(2l))\\n1 + f(l) <= 1 + 1 + f(l + 1) <= 3 + f(l + 1) = 2 + f(2l + 2) = 1 + (1 + f(2l + 2))\\n=> f(k) = 1 + f(l) <= 1 + min(1 + f(2l), 1 + f(2l + 2)) = 1 + f(2l + 1) = 1 + f(k + 1).\\n\\nProof of (*):\\n1) If n % 4 = 3 and n != 3, denote n = 4k + 3 where k >= 1.\\nf(n - 1) = f(4k + 2) = 1 + f(2k + 1) = 1 + min(f(2k) + 1, f(2k + 2) + 1) = min(f(2k) + 2, f(2k + 2) + 2)\\nf(2k) + 2 = f(k) + 3 >= f(k + 1) + 2 = 1 + f(2k + 2)\\nand f(2k + 2) + 2 > f(2k + 2) + 1, so f(n - 1) >= 1 + f(2k + 2) = f(4k + 4) = f(n + 1) => f(n) = min(f(n - 1) + 1, f(n + 1) + 1) = f(n + 1) + 1.\\n\\n2) If n = 3, it's obvious that f(3) = min(f(2) + 1, f(2) + 2) = f(2) + 1.\\n3) If n % 4 = 1 and n > 1, denote n = 4k + 1 where k >= 1.\\nf(n - 1) = f(4k) = 1 + f(2k)\\n1 + f(2k) < 2 + f(2k)\\n1 + f(2k) = 2 + f(k) <= 3 + f(k + 1) = 2 + f(2k + 2)\\n=> f(n - 1) = 1 + f(2k) <= min(2 + f(2k), 2 + f(2k + 2)) = 1 + min(f(2k) + 1, f(2k + 2) + 1) = 1 + f(2k + 1) = f(4k + 2) = f(n + 1)\\n=> f(n) = min(f(n - 1) + 1, f(n + 1) + 1) = f(n - 1) + 1."
		},
		{
			"lc_ans_id":"87942",
			"view":"5777",
			"top":"3",
			"title":"0 ms C++ recursion solution with Explanation",
			"vote":"9",
			"content":"All you need is determine replace `n` with `n + 1` or `n - 1`, when n is odd. since,\\n- if n is even, you get no choice, just replace it with `n / 2`.\\n- if n is odd, you can either `add 1` or `reduce 1`. \\n\\nIf `n + 1 % 4 == 0`, replace `n` with `n + 1` will short the path. Otherwise, replace `n` with `n - 1` is always the right direction.\\n\\n **Examle:**\\n```\\nInput:\\n31\\n\\n- 1. Replace 31 with 32:\\n31 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1\\n\\n- 2. Replace 31 with 30:\\n31 -> 30 -> 15 -> 16 -> 8 -> 4 -> 2 -> 1\\n\\nOutput:\\n6\\n```\\n\\n **Code:**\\n```c++\\nclass Solution \\n{\\n    // date: 2016-09-11     location: Vista Del Lago III Apartments\\n    int res = 0;\\npublic:\\n    int integerReplacement(int n) \\n    {\\n        if (n == 1)\\n            return res;\\n        if (n == 3)\\n        {\\n            res += 2;\\n            return res;\\n        }\\n        if (n == INT_MAX)\\n            return 32;\\n        if (n & 1)     // odd\\n        {\\n            res ++;\\n            if ((n + 1) % 4 == 0)\\n                integerReplacement(n + 1);\\n            else\\n                integerReplacement(n - 1);\\n        }\\n        else     // even\\n        {\\n            res ++;\\n            integerReplacement(n / 2);\\n        }\\n        return res;\\n    }\\n};\\n```\\n\\n\\nmake it shorter:\\n```c++\\nclass Solution \\n{\\n    // date: 2016-09-11     location: Vista Del Lago III Apartments\\n    int res = 0;\\npublic:\\n    int integerReplacement(int n) \\n    {\\n        if (n == 1)\\n            return res;\\n        if (n == 3)\\n        {\\n            res += 2;\\n            return res;\\n        }\\n        if (n == INT_MAX)\\n            return 32;\\n        \\n        res ++;\\n        if (n & 1)\\n            if ((n + 1) % 4 == 0)\\n                integerReplacement(n + 1);\\n            else\\n                integerReplacement(n - 1);\\n        else\\n            integerReplacement(n / 2);\\n            \\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"87966",
			"view":"3215",
			"top":"4",
			"title":"JAVA 3ms Bit Manipulation Solution",
			"vote":"8",
			"content":"For this problem, if we look at the binary form of each number, we can get the idea that for each '1' (except for the first '1') it counts to two steps, for each '0', it counts to one step.\\nSo our goal is to use +1 or -1 to reduce steps.\\n\\nFor example,\\n13 = 1101\\nIf we plus one, we can get 1110; if we reduce one, we can get 1100; \\n1110 needs 2+2+1 = 5 steps, while 1100 only needs 2+1+1 = 4 steps, so we choose n-1 in this step. \\n\\nUse long to avoid overflow (if n is Integer.MAX_VALUE).\\n```\\npublic class Solution {\\n    public int integerReplacement(int n) {\\n        long N = n;\\n        long small,big;\\n        int cnt = 0;\\n        while( N != 1){\\n        \\tsmall = (N  & ( N -1));\\n        \\tbig = ( N & (N + 1));\\n        \\tif( (N & 1) == 0){\\n        \\t\\tN >>= 1;\\n        \\t}\\n        \\telse if ( (small & (small-1)) <= (big & (big-1))){\\n        \\t\\tN = N - 1;\\n        \\t}\\n        \\telse{\\n        \\t\\tN = N +1;\\n        \\t}\\n        \\tcnt++;\\n        }\\n        return cnt;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"88013",
			"view":"1495",
			"top":"5",
			"title":"my java solution with memorization search, handling overflow test case",
			"vote":"6",
			"content":"Same idea with other recursive solutions, but two ticky points here.\\n1. With the helper of  hashmap, we don't need to search for one intermediate result multiple times\\n2. To hand the overflow for test case INT.MAX, use ``` 1 + (n - 1) / 2 ``` instead of ``` (n + 1) / 2```. The idea comes from solving some binary search questions. To avoid overflow, we use ``` int mid = start + (end - start) / 2 ``` instead of ``` int mid = (start + end) / 2```\\n\\n```\\npublic class Solution {\\n    public int integerReplacement(int n) {\\n        Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n        map.put(1, 0);\\n        map.put(2, 1);\\n\\n        return helper(n, map);\\n    }\\n    \\n    private int helper(int n, Map<Integer, Integer> map) {\\n        if (map.containsKey(n)) {\\n            return map.get(n);\\n        }\\n        \\n        int steps = -1;\\n        if (n % 2 == 0) {\\n            steps = helper(n / 2, map) + 1;\\n        } else {\\n            steps = Math.min(helper((n - 1), map) + 1, helper(1 + (n - 1) / 2, map) + 2);\\n        }\\n        \\n        map.put(n, steps);\\n        \\n        return steps;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"87933",
			"view":"1816",
			"top":"6",
			"title":"Could you anyone offer an elegant solution to deal with 2147483647?",
			"vote":"6",
			"content":"```\\npublic int integerReplacement(int n) {\\n        if (n == 1) return 0;\\n        if (n == 2147483647) {\\n            return Math.min(1 + integerReplacement(2147483647 - 1), 2 + integerReplacement((2147483646 / 2) + 1));\\n        }\\n        if (n % 2 == 0) {\\n            return (1 + integerReplacement(n / 2));\\n        } else {\\n            return (1 + Math.min(integerReplacement(n - 1), integerReplacement(n + 1)));\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"88016",
			"view":"1284",
			"top":"7",
			"title":"C++ 0ms 11 lines \"DP\" solution",
			"vote":"5",
			"content":"To me this is a very typical DP problem, so my initial approach was an O(n) DP solution as below, but it failed with LTE:\\n```\\nint integerReplacement(int n) {\\n        int dp[n + 1]; memset(dp, 0, sizeof(dp));\\n        for (int i = 2; i <= n; i++) {\\n            dp[i] = 1 + (i & 1 == 0 ? dp[i / 2] : min(dp[i - 1], 1 + dp[i / 2 + 1]));\\n        }\\n        return dp[n];\\n}\\n```\\nFortunately DP can always be done in a recursion way (with a hash table), and this gives me a chance to decrease the run time to somewhere between O(logn) and O(n):\\n```\\nclass Solution {\\nprivate:\\n    unordered_map<int, int> visited;\\n\\npublic:\\n    int integerReplacement(int n) {        \\n        if (n == 1) { return 0; }\\n        if (visited.count(n) == 0) {\\n            if (n & 1 == 1) {\\n                visited[n] = 2 + min(integerReplacement(n / 2), integerReplacement(n / 2 + 1));\\n            } else {\\n                visited[n] = 1 + integerReplacement(n / 2);\\n            }\\n        }\\n        return visited[n];\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"88047",
			"view":"889",
			"top":"8",
			"title":"Java BFS solution, tail recursion",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public int integerReplacement(int n) {\\n        assert n > 0;\\n        Queue<Long> queue = new LinkedList<>();\\n        queue.offer((long)n);\\n        return bfs(queue, 0);\\n    }\\n    \\n    private int bfs(Queue<Long> oldqueue, int level) {\\n        Queue<Long> newqueue = new LinkedList<>();\\n        while (!oldqueue.isEmpty()) {\\n            long n = oldqueue.poll();\\n            if (n == 1) {\\n                return level;\\n            }\\n            if (n % 2 == 0) {\\n                newqueue.offer(n / 2);\\n            } else {\\n                newqueue.offer(n + 1);\\n                newqueue.offer(n - 1);\\n            }\\n        }\\n        return bfs(newqueue, level + 1);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"88053",
			"view":"929",
			"top":"9",
			"title":"3 Lines Python Recursive AC Solution",
			"vote":"4",
			"content":"```\\nclass Solution(object):\\n    def integerReplacement(self, n, counter=0):\\n    \\tif n == 1: return counter\\n    \\tif not n%2: return self.integerReplacement(n/2, counter+1)\\n    \\telse: return min(self.integerReplacement(n+1, counter+1), self.integerReplacement(n-1, counter+1))\\n```\\n**EDIT:**\\nPlease refer to more improvements by @WKVictor's post under this topic."
		}
	],
	"id":"397",
	"title":"Integer Replacement",
	"content":"<p>\r\nGiven a positive integer <i>n</i> and you can do operations as follow:\r\n</p>\r\n\r\n<p>\r\n<ol>\r\n<li>If <i>n</i> is even, replace <i>n</i> with <code><i>n</i>/2</code>.</li>\r\n<li>If <i>n</i> is odd, you can replace <i>n</i> with either <code><i>n</i> + 1</code> or <code><i>n</i> - 1</code>.</li>\r\n</ol>\r\n</p>\r\n\r\n<p>\r\nWhat is the minimum number of replacements needed for <i>n</i> to become 1?\r\n</p>\r\n\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b>\r\n8\r\n\r\n<b>Output:</b>\r\n3\r\n\r\n<b>Explanation:</b>\r\n8 -> 4 -> 2 -> 1\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b>\r\n7\r\n\r\n<b>Output:</b>\r\n4\r\n\r\n<b>Explanation:</b>\r\n7 -> 8 -> 4 -> 2 -> 1\r\nor\r\n7 -> 6 -> 3 -> 2 -> 1\r\n</pre>\r\n</p>",
	"frequency":"138",
	"ac_num":"26675"
}