{
	"difficulty":"2",
	"submit_num":"12119",
	"show_id":"651",
	"leetcode_id":"651",
	"answers":[
		{
			"lc_ans_id":"105980",
			"view":"4934",
			"top":"0",
			"title":"Java 4 lines recursion, with step-by-step explanation to derive DP",
			"vote":"32",
			"content":"We use `i` steps to reach `maxA(i)` then use the remaining `n - i` steps to reach `n - i - 1` copies of `maxA(i)`\\n\\nFor example:\\nA, A, A, Ctrl A, Ctrl C, Ctrl V, Ctrl V\\nHere we have `n = 7` and we used `i = 3` steps to reach `AAA`\\nThen we use the remaining `n - i = 4` steps: Ctrl A, Ctrl C, Ctrl V, Ctrl V, to reach `n - i - 1 = 3` copies of `AAA`\\n\\nWe either don't make copies at all, in which case the answer is just `n`, or if we want to make copies, we need to have 3 steps reserved for Ctrl A, Ctrl C, Ctrl V so `i` can be at most `n - 3`\\n\\n```\\n    public int maxA(int n) {\\n        int max = n;\\n        for (int i = 1; i <= n - 3; i++)\\n            max = Math.max(max, maxA(i) * (n - i - 1));\\n        return max;\\n    }\\n```\\n\\nNow making it a DP where `dp[i]` is the solution to sub-problem `maxA(i)`\\n\\n```\\n    public int maxA(int n) {\\n        int[] dp = new int[n + 1];\\n        for (int i = 0; i <= n; i++) {\\n            dp[i] = i;\\n            for (int j = 1; j <= i - 3; j++)\\n                dp[i] = Math.max(dp[i], dp[j] * (i - j - 1));\\n        }\\n        return dp[n];\\n    }\\n```"
		},
		{
			"lc_ans_id":"105987",
			"view":"3600",
			"top":"1",
			"title":"Two Java DP solution O(n^2) and O(n)",
			"vote":"12",
			"content":"dp[i] = max(dp[i], dp[i-j]*(j-1)) j in [3, i)\\n```\\npublic int maxA(int N) {\\n        int[] dp = new int[N+1];\\n        for(int i=1;i<=N;i++){\\n            dp[i] = i;\\n            for(int j=3;j<i;j++){\\n                dp[i] = Math.max(dp[i], dp[i-j] * (j-1));\\n            }\\n        }\\n        return dp[N];\\n    }\\n```\\nThis one is O(n), inspired by paulalexis58. We don't have to run the second loop between [3,i). Instead, we only need to recalculate the last two steps. It's interesting to observe that dp[i - 4] * 3 and dp[i - 5] * 4 always the largest number in the series. Welcome to add your mathematics proof here.\\n```\\npublic int maxA(int N) {\\n    if (N <= 6)  return N;\\n    int[] dp = new int[N + 1];\\n    for (int i = 1; i <= 6; i++) {\\n      dp[i] = i;\\n    }\\n    for (int i = 7; i <= N; i++) {\\n      dp[i] = Math.max(dp[i - 4] * 3, dp[i - 5] * 4);\\n      // dp[i] = Math.max(dp[i - 4] * 3, Math.max(dp[i - 5] * 4, dp[i - 6] * 5));\\n    }\\n    return dp[N];\\n  }\\n```"
		},
		{
			"lc_ans_id":"105982",
			"view":"1669",
			"top":"2",
			"title":"O(1) time O(1) space c++ solution, possibly shortest and fastest",
			"vote":"8",
			"content":"```\\nint maxA(int N) {\\n    if (N <= 6) return N;\\n    if (N == 10) return 20;\\n    int n = N / 5 + 1, n3 = n * 5 - 1 - N;\\n    return pow(3, n3) * pow(4, n - n3);\\n}\\n```\\nPure math. This problem is to partition number N into 3's and 4's and get their product. ***n = N / 5 + 1*** is to compute the number of factors(the total number of 3's and 4's). With n, it's easy to know how many out of them are 3's by computing ***n3 = n * 5 - 1 - N***. We minus 1 here because adding a single factor requires one step more than the factor itself, e.g. x4 takes 5 steps (select all, copy, paste, paste, paste). 10 is special here because it's the only > 6 number where there is no enough factors to share cuts from decrement of the number of 3's which means a 5 has to be introduced."
		},
		{
			"lc_ans_id":"105997",
			"view":"765",
			"top":"3",
			"title":"Mathematical proof of the O(N) solution",
			"vote":"7",
			"content":"The reason we could use ```dp[i] = max(dp[i-4]*3, dp[i-5]*4)``` instead of  ```dp[i] = max(dp[i-3]*2, dp[i-4]*3, dp[i-5]*4, dp[i-6]*5, ...)``` is the following property:\\n\\nWhen ```i >= 6```, we have ```5/4 * dp[i] <= dp[i+1] <= 3/2 * dp[i]```.\\n\\nWe prove it using strong mathematical induction. Base case is trivial: ```dp[6] = 6, dp[7] = 9, dp[8] = 12```.\\nNow assume ```5/4 * dp[i] <= dp[i+1] <= 3/2 * dp[i]``` for all ```i >= 6 && i < n```, we prove ```5/4 * dp[n] <= dp[n+1] <= 3/2 * dp[n]```. By the given DP formula, ```dp[n+1] = max(dp[n-2]*2, dp[n-3]*3, dp[n-4]*4, dp[n-5]*5, ...)```. We have ```dp[n-3]*3 >= dp[n-2]*2``` because ```dp[i+1] <= 3/2 * dp[i]``` holds when ```i = n-3```. Similarly, we have ```dp[n-4]*4 >= dp[n-5]*5``` because ```dp[i+1] >= 5/4 * dp[i]``` holds when ```i = n-5```.\\nNow the key part: for all ```k >= 5 && k < n```, we have ```dp[n-4]*4 >= dp[n-k]*k``` i.e. ```dp[n-4] >= k/4 * dp[n-k]``` because ```dp[n-4] >= 5/4 * dp[n-5] >= (5/4)^2 * dp[n-6] >= ... >= (5/4)^j * dp[n-j-4]```. Now let ```j = k-4```, we get ```dp[n-4] >= (5/4)^(k-4) * dp[n-k] = (1 + 1/4)^(k-4) * dp[n-k] >= (1 + 1/4 * (k - 4)) * dp[n-k] = k/4 * dp[n-k]```, by the Bernoulli inequality. Proof complete.\\n\\n\\n\\n\\n(To be ultimately rigorous, I actually have to prove ```dp[n-5] >= k/5 * dp[n-k]``` and ```dp[n-4] >= 5/4 * dp[n-5]``` separately, due to the ```i >= 6``` limit in the property. But I'd rather keep the proof simpler.)"
		},
		{
			"lc_ans_id":"105981",
			"view":"1207",
			"top":"4",
			"title":"Python, Straightforward with Explanation",
			"vote":"6",
			"content":"We can prove that the operations can be simplified into two types:\\n- [1 move] Add one A.\\n- [k+1 moves] Multiply the number of A's by K\\n\\nSay ```best[k]``` is the maximum number of A's that can be printed after ```k``` moves.  The last (simplified) operation must have been addition or multiplication.  Thus, ```best[k] = max(best[k-1] + 1, best[k-2] * 1, best[k-3] * 2, best[k-4] * 3, ...)```.\\n\\n```\\ndef maxA(self, N):\\n    best = [0, 1]\\n    for x in xrange(2, N+1):\\n        cur = best[x-1] + 1\\n        for y in xrange(x-1):\\n            cur = max(cur, best[y] * (x-y-1))\\n        best.append(cur)\\n    return best[N]\\n```"
		},
		{
			"lc_ans_id":"105991",
			"view":"1509",
			"top":"5",
			"title":"Java solution, DP",
			"vote":"5",
			"content":"Reference: http://www.geeksforgeeks.org/how-to-print-maximum-number-of-a-using-given-four-keys/\\n\\n```\\npublic class Solution {\\n    public int maxA(int N) {\\n        // The optimal string length is N when N is smaller than 7\\n        if (N <= 6) return N;\\n\\n        // An array to store result of subproblems\\n        int[] screen = new int[N];\\n\\n        int b;  // To pick a breakpoint\\n\\n        // Initializing the optimal lengths array for uptil 6 input\\n        // strokes.\\n        int n;\\n        for (n = 1; n <= 6; n++) screen[n - 1] = n;\\n\\n        // Solve all subproblems in bottom manner\\n        for (n = 7; n <= N; n++) {\\n            // Initialize length of optimal string for n keystrokes\\n            screen[n - 1] = 0;\\n\\n            // For any keystroke n, we need to loop from n-3 keystrokes\\n            // back to 1 keystroke to find a breakpoint 'b' after which we\\n            // will have ctrl-a, ctrl-c and then only ctrl-v all the way.\\n            for (b = n - 3; b >= 1; b--) {\\n                // if the breakpoint is at b'th keystroke then\\n                // the optimal string would have length\\n                // (n-b-1)*screen[b-1];\\n                int curr = (n - b - 1) * screen[b - 1];\\n                if (curr > screen[n - 1]) screen[n - 1] = curr;\\n            }\\n        }\\n\\n        return screen[N - 1];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"106000",
			"view":"625",
			"top":"6",
			"title":"C++, DP O(n) time O(1) space , 3ms",
			"vote":"4",
			"content":"We can solve this problem using DP with optimization in O(N) time, based on two observations. Here I assume n >= 6.\\n1) For dp[n], we can copy dp[n-3] and paste 1 time, or copy dp[n-4] and paste 2 times, and so on. \\nSo dp[n] = max(dp[n-i]x(i-1), for i >= 3 && i  <= n-1); This will result in an O(N^2) solution.\\n2) However, when i >= 7, i-3 is the same or more optimal than i. The reason is that we can select, copy and paste 1 time, then select, copy and keep pasting, dp[n] = dp[n-i]x2x(i-4).  2(i-4) >= i-1 when i >= 7.\\nSo only i = 3, 4, 5, 6 are considered.\\n```\\nclass Solution {\\npublic:\\n    int maxA(int N) {\\n        if (N < 6) return N;\\n        vector<int> dp(N+1, 0);\\n        for (int i = 1; i <= 6; i++)\\n            dp[i] = i;\\n        for (int i = 7; i <= N; i++) {\\n            for (int j = 3; j <= 6; j++) \\n                dp[i] = max(dp[i], dp[i-j]*(j-1));\\n        }\\n        return dp[N];\\n    }\\n};\\n```\\n\\nO(1) space\\n```\\nclass Solution {\\npublic:\\n    int maxA(int N) {\\n        if (N < 6) return N;\\n        vector<int> dp(6, 0);\\n        for (int i = 0; i < 6; i++)\\n            dp[i] = i;\\n        for (int i = 6; i <= N; i++) {\\n            int tmp = 0;\\n            for (int j = 0; j <= 3; j++) \\n                tmp = max(tmp, dp[j]*(5-j));\\n            for (int j = 0; j < 5; j++)\\n                dp[j] = dp[j+1];\\n            dp.back() = tmp;\\n        }\\n        return dp.back();\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"105993",
			"view":"136",
			"top":"7",
			"title":"Python solution with detailed explanation",
			"vote":"2",
			"content":"**4 Keys Keyboard** https://leetcode.com/problems/4-keys-keyboard/description/\\n\\n**Memoization with O(N^2) time & O(N^3) space: TLE**\\n* We can either do key1, key4, or key2,key3,key4 i.e. either type 'A', or paste what is in the buffer, or copy the current screen into buffer and paste on screen again.\\n* x: number of items in buffer\\n* y: number of items on screen\\n* n: number of remaining strokes\\n* The problem is parameterized by x,y,n. We use a cache to store the results of the sub-problem.\\n```\\nfrom collections import defaultdict\\nclass Solution:\\n    def helper(self, x, y, n, cache):\\n        if n == 0:\\n            return y\\n        elif x in cache and y in cache[x] and n in cache[x][y]:\\n            return cache[x][y][n]\\n        else:\\n            cache[x][y][n] = self.helper(x, y+1, n-1, cache)\\n            if x > 0:\\n                cache[x][y][n] = max(cache[x][y][n], self.helper(x, y+x, n-1, cache))\\n            if n >= 3 and y > 0:\\n                cache[x][y][n] = max(cache[x][y][n], self.helper(y, 2*y, n-3, cache))\\n            return cache[x][y][n]\\n    \\n    def maxA(self, N):\\n        \"\"\"\\n        :type N: int\\n        :rtype: int\\n        \"\"\"\\n        cache = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))\\n        return self.helper(0, 0, N, cache)\\n```\\n\\n**DP using O(N^2) time and O(N) space**\\n* The key insight is that the optimal number will be generated using a sequence 'A', followed by select+copy+paste, and then followed by a sequence of pastes.\\n* Assume you are at x. select+copy+paste takes you to 2x in 3 strokes. Now if you apply the three strokes again, you will reach 4x after 6 strokes. Instead, if you used paste in strokes 4 to 6, you would have 5x. This gives the intuition for optimal sequence.\\n* The above insight naturally gives the DP algorithm. For example, when i = 7, we can think of invoking select+copy+paste after 1,2,3,4 strokes. Say j=3 with optimal value as dp[i], then we will have select+copy+paste+paste, which triples dp[i].\\n```\\nclass Solution:\\n    def maxA(self, N):\\n        \"\"\"\\n        :type N: int\\n        :rtype: int\\n        \"\"\"\\n        dp = [i for i in range(N+1)]\\n        for i in range(1,N+1):\\n            for j in range(1,i):\\n                if j+3<=i:\\n                    dp[i] = max(dp[i], dp[j]*(i-j-2) + dp[j])\\n        return dp[N]\\n```"
		},
		{
			"lc_ans_id":"106001",
			"view":"261",
			"top":"8",
			"title":"Bonus O(1) Pencil and Paper Solution",
			"vote":"2",
			"content":"As [before [link]](https://discuss.leetcode.com/topic/97626/python-straightforward-with-explanation), we've simplified our operation into two types:\\n\\n- [cost 1] Add 1 to the current number\\n- [cost k+1] Multiply the current number by k\\n\\nLet's get some reasonable bounds for when we should use these operations.\\n\\nFirst, we only need to consider multiplying by ```2, 3, 4``` or ```5```.  \\n- If we were to multiply by ```2N```, paying ```2N+1```, we could instead multiply by ```N``` then ```2```, paying ```N+4```.  When ```N >= 3```, we pay less this way, so we will never multiply by ```2N (N >= 3)```.  Similarly, if we were to multiply by ```2N+1``` paying ```2N+2```, we could instead multiply by ```N+1``` then ```2```, paying ```N+5```.  Thus, we will never multiply by ```2N+1 (N >= 3)```.\\n\\nSecond, our addition operations are very limited: we should not add after multiplying, and we should not add after our number is 5 or more.\\n- Suppose we multiplied by ```k``` then added ```c```.  We could have instead multiplied by ```k+c```.  Comparing the results, ```xk+c``` versus ```x(k+c) = xk+xc```, when ```x >= 1``` we should not add after multiplying.\\n- Suppose we add 1 then multiply by ```k```: ```x -> (x+1) * k```  If we instead multiply by ```k+1```, then we get ```x -> x*(k+1)```, which dominates the previous option when ```x >= k```.  Since ```k``` is at most 5, when ```x >= 5```, we never need to consider an addition before a multiplication.\\n- Suppose we never multiply.  We pay cost ```x``` to get result ```x```.  We could also pay ```x+3``` to get ```2x``` by multiplying by 2 instead - so when ```x >= 3```, we get a better result multiplying.  In total, we should not add when ```x >= 6```.\\n\\n---\\n\\nTo recap, this leaves us with the following options:\\n- Start with 1, 2, 3, 4, or 5 [cost 1, 2, 3, 4, 5 respectively]\\n- Multiply by 2, 3, 4, or 5 [cost 3, 4, 5, 6 respectively].\\n\\nNow observe that when we multiply by ```b``` a total of ```e``` times, we pay a cost of ```C = e(b+1)```.  Fixing the cost, the growth per cost is ```(b^e) / C = b^(C/(b+1)) / C``` which is affected only by ```f(b) = b^(1/(b+1))```.  \\n\\nWe can observe that ```f(4) > f(3) > f(5) > f(2).```  Thus, eventually (meaning, there exists some ```N``` so that for every ```n >= N```), our answer ```best[n] = the highest number possible in n moves```, will satisfy the recurrence ```best[n] = 4 * best[n-5]```.  \\n\\nLet us justify where this N is.  All the multiplication operations commute, so that:\\n- Every time we've multiplied by 2 two times, we prefer to multiply by 4 once for less cost.  *(4^1 for a cost of 5, vs 2^2 for a cost of 6.)*\\n- Every time we've multiplied by 3 five times, we prefer to multiply by 4 four times for the same cost but a larger result. *(4^4 > 3^5, and cost is 20.)*\\n- Every time we've multiplied by 5 five times, we prefer to multiply by 4 six times for the same cost but a larger result. *(4^6 > 5^5, and cost is 30.)*\\n\\nAltogether, this proves that we can consider the number of multiplications by 2, 3, and 5 to be at most ```(2-1) + (5-1) + (5-1) = 9```.  Together with having at most 5 additions, this shows that there can only be at most 14 operations that do not multiply by 4.\\n\\nWe can find the first 14 numbers by hand: we write 1, 2, 3, 4, 5 quickly, then consider only 4 possibilities at each of 9 new numbers.  The first 14 numbers are: ```1, 2, 3, 4, 5, 6, 9, 12, 16, 20, 27, 36, 48, 64```.  After that, every subsequent number is achieved by multiplying by 4: ie., ```best[n] = 4 * best[n-5]```."
		},
		{
			"lc_ans_id":"105985",
			"view":"477",
			"top":"9",
			"title":"Python, Simple O(n) code (not O(n^2) like most of the posts)",
			"vote":"2",
			"content":"```\\nclass Solution:\\n    def maxA(self, n):\\n        \"\"\"\\n        :type N: int\\n        :rtype: int\\n        \"\"\"\\n        dp = [i for i in range(n+1)]\\n        if n<=6:\\n            return(dp[n])\\n        for i in range(7,n+1):\\n            dp[i] = max(dp[i-4]*3,dp[i-5]*4)\\n        return(dp[n])\\n```"
		}
	],
	"id":"628",
	"title":"4 Keys Keyboard",
	"content":"<p>Imagine you have a special keyboard with the following keys: </p>\r\n<p><code>Key 1: (A)</code>:  Print one 'A' on screen.</p>\r\n<p><code>Key 2: (Ctrl-A)</code>: Select the whole screen.</p>\r\n<p><code>Key 3: (Ctrl-C)</code>: Copy selection to buffer.</p>\r\n<p><code>Key 4: (Ctrl-V)</code>: Print buffer on screen appending it after what has already been printed. </p>\r\n\r\n\r\n\r\n<p>Now, you can only press the keyboard for <b>N</b> times (with the above four keys), find out the maximum numbers of 'A' you can print on screen.</p>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> N = 3\r\n<b>Output:</b> 3\r\n<b>Explanation:</b> \r\nWe can at most get 3 A's on screen by pressing following key sequence:\r\nA, A, A\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> N = 7\r\n<b>Output:</b> 9\r\n<b>Explanation:</b> \r\nWe can at most get 9 A's on screen by pressing following key sequence:\r\nA, A, A, Ctrl A, Ctrl C, Ctrl V, Ctrl V\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>1 <= N <= 50 </li>\r\n<li>Answers will be in the range of 32-bit signed integer.</li>\r\n</ol>\r\n</p>\r\n",
	"frequency":"34",
	"ac_num":"5989"
}