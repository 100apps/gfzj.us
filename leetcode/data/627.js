{
	"difficulty":"2",
	"submit_num":"32819",
	"show_id":"650",
	"leetcode_id":"650",
	"answers":[
		{
			"lc_ans_id":"105899",
			"view":"11362",
			"top":"0",
			"title":"Java DP Solution",
			"vote":"46",
			"content":"```\\n    public int minSteps(int n) {\\n        int[] dp = new int[n+1];\\n\\n        for (int i = 2; i <= n; i++) {\\n            dp[i] = i;\\n            for (int j = i-1; j > 1; j--) {\\n                if (i % j == 0) {\\n                    dp[i] = dp[j] + (i/j);\\n                    break;\\n                }\\n                \\n            }\\n        }\\n        return dp[n];\\n    }\\n```"
		},
		{
			"lc_ans_id":"105897",
			"view":"5516",
			"top":"1",
			"title":"Loop best case log(n), no DP, no extra space, no recursion, with explanation",
			"vote":"35",
			"content":"We look for a divisor `d` so that we can make `d` copies of `(n / d)` to get `n`\\n\\nThe process of making `d` copies takes `d` steps (`1` step of **Copy All** and `d - 1` steps of **Paste**)\\n\\nWe keep reducing the problem to a smaller one in a loop.\\n\\nThe **best** cases occur when `n` is decreasing fast, and method is almost `O(log(n))`\\n\\nFor example, when `n = 1024` then `n` will be divided by `2` for only `10` iterations, which is much faster than `O(n)` DP method.\\n\\nThe **worst** cases occur when `n` is some multiple of large prime, e.g. `n = 997` but such cases are rare.\\n\\n```\\n    public int minSteps(int n) {\\n        int s = 0;\\n        for (int d = 2; d <= n; d++) {\\n            while (n % d == 0) {\\n                s += d;\\n                n /= d;\\n            }\\n        }\\n        return s;\\n    }\\n```"
		},
		{
			"lc_ans_id":"105928",
			"view":"3826",
			"top":"2",
			"title":"[C++] [Java] Clean Code with Explanation - 4 lines, No DP",
			"vote":"24",
			"content":"```\\n/**\\n * It take 2 op to double, 3 ops to triple, ...\\n * if n % 2 == 0, then f(n) = f(n/2) + 2\\n * if n % 3 == 0, then f(n) = f(n/3) + 3\\n * 2 * 2 = 2 + 2, 2 * 3 > 2 + 3, 4 * 4 > 4 + 4, so it is always better to divide whenever possible.\\n * now it became a problem for finding all possible factors;\\n */\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    int minSteps(int n) {\\n        if (n == 1) return 0;\\n        for (int i = 2; i < n; i++)\\n            if (n % i == 0) return i + minSteps(n / i);\\n        return n;\\n    }\\n};\\n```\\n**Java**\\n```\\nclass Solution {\\n    public int minSteps(int n) {\\n        if (n == 1) return 0;\\n        for (int i = 2; i < n; i++)\\n            if (n % i == 0) return i + minSteps(n / i);\\n        return n;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105908",
			"view":"2852",
			"top":"3",
			"title":"Very Simple Java Solution With Detail Explanation",
			"vote":"21",
			"content":"To get the DP solution, analyse the pattern first by generating first few solutions\\n1: 0\\n2: 2\\n3: 3\\n4: 4\\n5: 5\\n6: 5\\n7: 7\\n8: 6\\n9: 6\\n10: 7\\n11: 11\\n12: 7\\n13: 13\\n14: 9\\n15: 8\\n\\nNow, check the solution.\\nEg: n=6\\nTo get 6, we need to copy 3 'A's two time. (2)\\nTo get 3 'A's, copy the 1 'A' three times. (3)\\nSo the answer for 6 is 5\\n\\nNow, take n=9.\\nWe need the lowest number just before 9 such that (9% number =0). So the lowest number is 3.\\nSo 9%3=0. We need to copy 3 'A's three times to get 9. (3)\\nFor getting 3 'A's, we need to copy 1 'A' three times. (3)\\nSo the answer is 6\\n\\nFinally to analyse the below code, take n=81.\\nTo get 81 we check \\nif (81 % 2 ==0) No\\nif (81 % 3 ==0) Yes\\nSo we need to copy 81/3 = 27 'A's three times (3)\\nNow to get 27 'A's, we need to copy 27/3= 9 'A's three times (3)\\nTo get 9 'A's, we need to copy 9/3=3 'A's three times (3)\\nAnd to get 3 'A's, we need to copy 3/3=1 'A's three times (3)\\nFinal answer is 3+3+3+3 = 12\\n\\nLast Example, n=18\\n18/2 = 9   Copy 9 'A's 2 times (2)\\n9/3=3 Copy 3 'A's 3 times (3)\\n3/3=1 Copy 1'A's 3 times (3)\\nAnswer: 2+3+3= 8\\n\\n    public int minSteps(int n) {\\n        int res = 0;\\n        for(int i=2;i<=n;i++){\\n            while(n%i == 0){\\n                res+= i;\\n                n=n/i;\\n            }\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"105968",
			"view":"1108",
			"top":"4",
			"title":"Python, Straightforward with Explanation",
			"vote":"7",
			"content":"We can break the total sequence of operations into groups that take the form \"[copy][some number of pastes]\"  In K operations of this group, the length of the string is multiplied by K.\\n\\nNow, suppose N can be written as ```N = d_1 * d_2 * ... * d_k```.  By the above reasoning, ```N``` \"A\"s can be written on the tape in ```d_1 + d_2 + ... + d_k``` operations.  If any of the ```d_i``` are composite, say ```d_i = p*q``` (with ```p>1, q>1```), then we could write it in p + q instead of p*q operations by breaking up this divisor.  \\n\\nFor example, if we make 15 with 15 operations, we could instead make it with 3 operations to get AAA then another 5 operations.  Also, we should justify that ```p+q <= p*q``` (because (p-1)(q-1) is positive), so we indeed do get savings by breaking up this product.\\n\\n```\\ndef minSteps(self, n):\\n    def factors(n):\\n        d = 2\\n        while d * d <= n:\\n            while n % d == 0:\\n                n /= d\\n                yield d\\n            d += 1\\n        if n > 1:\\n            yield n\\n\\n    return sum(factors(n))\\n```"
		},
		{
			"lc_ans_id":"105900",
			"view":"581",
			"top":"5",
			"title":"C++, O(sqrt(n)), DP and greedy prime number solution",
			"vote":"6",
			"content":"We can solve this problem using standard DP or greedy algorithm, based on two observations.\\n1) if n%k == 0, we can copy n/k and paste k-1 times, so dp[n] = min (dp[n/k]+k, for all valid k); \\n2) if k is not a prime number, k = a*b, we can copy n/k and paste a-1 times, then copy n/b and copy b-1 times, the total is dp[n/k]+a+b. Because a+b is always <= a*b, by induction the answer is the sum of all prime number factors of n;\\n\\nStandard DP memorization solution, 3 ms, O(n*sqrt(n))\\n```\\nclass Solution {\\npublic:\\n    int minSteps(int n) {\\n        if (n == 1) return 0;\\n        vector<int> dp(n+1, 0);\\n        dp[2] = 2;\\n        return helper(dp, n);\\n    }\\nprivate:\\n    int helper(vector<int>& dp, int k) {\\n        if (dp[k]) return dp[k];\\n        int ans = k;\\n        for (int i = 2; i <= sqrt(k); i++) {\\n            if (k%i == 0) {\\n                ans = min(ans, helper(dp, i)+k/i);\\n                ans = min(ans, helper(dp, k/i)+i);\\n            } \\n        }\\n        dp[k] = ans;\\n        return ans;\\n    }\\n};\\n``` \\n\\nGreedy, 3 ms, O(sqrt(n))\\n```\\nclass Solution {\\npublic:\\n    int minSteps(int n) {\\n        int ans = 0;\\n        for (int i = 2; i <= sqrt(n); i++) {\\n            while (n%i == 0) {\\n                ans += i;\\n                n /= i;\\n            }\\n        }\\n        if (n > 1) ans += n;\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"105978",
			"view":"718",
			"top":"6",
			"title":"Java solution, Memorized BFS",
			"vote":"4",
			"content":"General idea is Memorized BFS. Some optimization to reduce status to be searched.\\n1. Use a class ```Stat``` to describe a status which contains two fields: ```currLen``` stands for the length of current ```A(s)```, ```clipLen``` stands for the length of ```A(s)``` in clipboard.\\n2. For each ```Stat```, there's two possible moves: ```Copy All``` and ```Paste```. But we can trim some of them using following methods.\\n3. If we see a ```Stat``` second time, no need to continue (by using a String HashSet);\\n4. If new length is greater than target length, no need to do ```Paste```.\\n\\n```\\npublic class Solution {\\n    class Stat {\\n        int currLen;\\n        int clipLen;\\n        public Stat (int a, int b) {\\n            currLen = a; clipLen = b;\\n        }\\n    }\\n    \\n    public int minSteps(int n) {\\n        if (n == 1) return 0;\\n        \\n        int step = 1;\\n        Queue<Stat> queue = new LinkedList<>();\\n        queue.add(new Stat(1, 1));\\n        Set<String> set = new HashSet<>();\\n        set.add(\"1,1\");\\n        \\n        while (!queue.isEmpty()) {\\n            step++;\\n            int size = queue.size();\\n            for (int i = 0; i < size; i++) {\\n                Stat s = queue.poll();\\n                // Copy All\\n                if (!set.contains(s.currLen + \",\" + s.currLen)) {\\n                    queue.add(new Stat(s.currLen, s.currLen));\\n                    set.add(s.currLen + \",\" + s.currLen);\\n                }\\n                // Paste\\n                if (s.currLen + s.clipLen == n) return step;\\n                if (!set.contains((s.currLen + s.clipLen) + \",\" + s.clipLen) && s.currLen + s.clipLen < n) {\\n                    queue.add(new Stat(s.currLen + s.clipLen, s.clipLen));\\n                    set.add((s.currLen + s.clipLen) + \",\" + s.clipLen);\\n                }\\n            }\\n        }\\n        \\n        return -1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105932",
			"view":"141",
			"top":"7",
			"title":"Java solutions from naive-DP to optimized-DP to non-DP",
			"vote":"3",
			"content":"This kind of problems bear the hallmarks of DP so I will explain in part `I` the naive DP solution first. Then in part `II`, I will introduce the optimized DP solution based on one interesting observation. Taking advantage of the same observation, the problem can actually be solved without any DP, as elaborated in part `III`. Lastly, a quick summary is given in part `IV` to share some thoughts about how to adapt the naive DP solution to the `4 Keys Keyboard` problem.\\n\\n---\\n**`I -- Naive DP`**\\n\\nAs usual, for DP problems, we need to identify the optimal substructures for the original problem and relate its solution to its subproblems. To begin with, let's define `T(k)` as the minimum number of steps to get exactly `k` **'A'** on the notepad. Then the original problem will be `T(n)` and we have the following termination conditions: `T(1) = 0`, since there is already one **'A'** on the notepad initially. Now the key part is how to relate `T(k)` to its subproblems.\\n\\nApparently `T(k)` will depend on the sequence of operations performed to get `k` **'A'** on the notepad. Now ask yourself these questions:\\n\\n1. Can this sequence of operations end with `Copy All`? The answer is **NO**, because if this is the case, the last operation can always be removed without changing the number of **'A'** on the notepad yet yielding a smaller number of steps.\\n\\n2. Can this sequence of operations contain only ? The answer is again **NO**, because at the beginning there is no character being copied so pasting along won't change the number of **'A'** on the notepad (a special case is when `n = 1`, but then we don't even need any operations).\\n\\nSo we conclude the sequence of operations must end with `Paste` with at least one `Copy All` in the middle. However, from the point of the last `Paste`, it only cares about characters which are copied last time, that is, the first `Copy All` operation from the end of the sequence. Assume the number of **'A'** on the notepad is `i` when this `Copy All` operation is performed. Then how many more steps do we need to get `k` **'A'** on the notepad by pasting only? The answer is `(k-i)/i`, where `k - i` is the remaining number of **'A'** and `i` is the number of **'A'** we can print on the notepad for each `Paste`. So the total number of steps from getting `i` **'A'** to `k` **'A'** is `k / i`, that is, one `Copy All` plus `(k-i)/i` `Paste`. Since we aim to minimize number of steps to get `k` **'A'**, we surely want to minimize the number of steps to `i` **'A'**, which by definition is `T(i)`, therefore the total number of steps getting `k` **'A'** for this case is given by `T(i) + k/i`.\\n\\nSince we don't really know when to perform the last `Copy All` operation, we can try each options and choose the one that produces the least number of steps. Here each option corresponds to a different value of `i` and if there are no additional restrictions, we have a total of `k - 1` such choices (`i` running from `1` to `k - 1`). Fortunately, we do require that the number of steps be  integers, therefore `i` must be a divisor of `k`. In summary, we have:\\n\\n`T(k) = min(T(i) + k/i)` where `1 <= i < k && k % i == 0`.\\n\\nHere is the naive DP solution, with time complexity `O(n^2)` and space complexity `O(n)`.\\n\\n```\\npublic static int minSteps(int n) {\\n    int[] dp = new int[n + 1];\\n    Arrays.fill(dp, Integer.MAX_VALUE);\\n\\n    for (int k = 2; k <= n; k++) {\\n        for (int i = 1; i < k; i++) {\\n            if (k % i != 0) continue;\\n            dp[k] = Math.min(dp[k], dp[i] + k / i);\\n        }\\n    }\\n        \\n    return dp[n];\\n}\\n```\\n\\n---\\n**`II -- Optimized DP`**\\n\\nIt turns out that the inner loop in the naive DP solution can terminate early based on the following observation (unfortunately not so obvious): \"In ascending order, let `k_1, k_2, ..., k_m` be the **proper divisors** of `k`, then we have `T(k_m) + k / k_m <= T(k_j) + k / k_j` for all `1 <= j < m`\".  The proof by mathematical induction is as follows (well, I was surprised that lots of you make use of this assumption without saying why).\\n\\nFirst the statement is true for the simple case when `n = 2`. Next we assume it is valid for all cases with `n < k`, and will show it holds for `n = k`.\\n\\nTo smoothen the proof, it is useful to introduce the [prime factorization](https://en.wikipedia.org/wiki/Integer_factorization) of integers, which says any positive integer can be uniquely decomposed into product of prime numbers. For an integer `k`, let `[p_1, p_2, ..., p_t]` be the prime numbers in ascending order in its factorization and `[e_1, e_2, ..., e_t]` be the corresponding exponent array, then `k = p_1^e_1 * p_2^e_2 * ... * p_t^e_t`. Here we assume all the exponents are positive (i.e., prime factors of zero exponents are ignored).\\n\\nNow if another integer `k'` is a divisor of `k`, then the prime factorization of `k'` has to satisfy the following two conditions:\\n1. The exponents of prime numbers other than `[p_1, p_2, ..., p_t]` must be zero.\\n2. Let `[e'_1, e'_2, ..., e'_t]` be the corresponding exponent array for `k'` in reference to `[p_1, p_2, ..., p_t]`, then `e'_j <= e_j` for all `1 <= j <= t` (Note that now `e'_j` is not necessarily positive but can be zero).\\n\\nWith the notations given above, we know `k`, `k_m` and `k_i` can be represented by three different exponent arrays, in reference to the same prime factors `[p_1, p_2, ..., p_t]`, since the latter two are proper divisors of the former. Assume again the exponent array for `k` is `[e_1, e_2, ..., e_t]`, then the exponent array for `k_m` will be `[e_1 - 1, e_2, ..., e_t]`, due to the fact that `k_m` is the largest proper divisor of `k`. Let `[e'_1, e'_2, ..., e'_t]` be the exponent array for `k_i`, we need to consider two cases: `k_m % k_i != 0` or `k_m % k_i == 0`.\\n\\nFor the former case, `k_i` is not a divisor of `k_m`. From our conclusion above, we must have `e'_1 > e_1 - 1 >= 0`, i.e., `e'_1` is positive. This is because `e'_j <= e_j` holds for all `2 <= j <= t` as `k_i` is a factor of `k`. If `e'_1 <= e'_1 - 1`, then `k_i` will also be a factor of `k_m`, contradicting with the condition that `k_m % k_i != 0`. Now let `d_i` be the largest proper factor of `k_i`, then the exponent array of `d_i` will be `[e'_1 - 1, e'_2, ..., e'_t]`. It is easy to show that `d_i` will also be a factor of `k_m`, since `e'_1 - 1 <= e_1 - 1`. Also we have the following equation `k * d_i = k_m * k_i`, which manifests itself in the notation of exponent arrays: `k * d_i = [e_1 + e'_1 - 1, e_2 + e'_2, ..., e_t + e'_t]` and `k_m * k_i = [e_1 - 1 + e'_1, e_2 + e'_2, ..., e_t + e'_t]`. Here comes the real proof for this case: `T(k_m) + k/k_m <= T(d_i) + k_m/d_i  + k/k_m = T(d_i) + k/k_i + k_i/d_i = T(k_i) + k/k_i`. The first inequality comes from the induction assumption: `k_m < k` and `k_m % d_i == 0` implies `T(k_m) <= T(d_i) + k_m/d_i`. The following equality takes advantage of the equation `k * d_i = k_m * k_i` and finally the last equality uses the induction assumption again: `T(k_i) = T(d_i) + k_i/d_i`.\\n\\nFor the latter case, `k_i` is a proper divisor of `k_m`. Then by our induction assumption, `T(k_m) + k/k_m <= T(k_i) + k_m/k_i + k/k_m`. We only need to show that `k_m/k_i + k/k_m <= k/k_i`. Note that `k = k_m * p_1`, then `k/k_i = p_1 * k_m/k_i = p_1 + p_1 * (k_m/k_i - 1) >= p_1 + k_m/k_i = k/k_m + k_m/k_i`, where we have used the facts that `p_1 >= 2` and `k_m/k_i >= 2` to derive the inequality in the middle.\\n\\nThus we conclude the induction assumption is also true for the case `n = k`, hence validate our observation above.\\n\\nHere is the optimized DP solution:\\n\\n```\\npublic int minSteps(int n) {\\n    int[] dp = new int[n + 1];\\n        \\n    for (int k = 2, i = 0; k <= n; k++) {\\n        for (i = k >> 1; i >= 1 && k % i != 0; i--);\\n        dp[k] = dp[i] + k / i;\\n    }\\n        \\n    return dp[n];\\n}\\n```\\n\\n---\\n`III -- Non-DP solution`\\n\\nOur DP solution is based on the assumption that there is overlapping among subproblems. However, from the observation in part `II`, to solve `T(k)`, we only need `T(k_m)`, which in turn only requires knowledge of `T(k_m_m)`, `...`, where `k_m` is the largest proper divisor of `k_m`, and `k_m_m` is the largest proper divisor of `k_m`, and so on. Since the largest proper divisors are decreasing, there won't be any overlapping among the subproblems and the DP solution is an overkill here.\\n\\nHere is the non-DP solution, which reduces the space complexity to O(1):\\n\\n```\\npublic int minSteps(int n) {\\n    int res = 0;\\n        \\n    for (int k = n, i = 0; k > 1; k = i) {\\n        for (i = k >> 1; k % i != 0; i--);\\n        res += k / i;\\n    }\\n        \\n    return res;\\n}\\n```\\nIf we look at the solution above more carefully, it is actually equivalent to adding up the prime factors of `n`, since the transformation sequence of the largest proper divisors will be (in the form of exponent array): `[e_1, e_2, ..., e_t] ==> [e_1 - 1, e_2, ..., e_t] ==> ... ==> [0, e_2, ..., e_t] ==> [0, e_2 - 1, ..., e_t] ==> ... ==> [0, 0, ..., 0]`. And for each such divisor, we add the corresponding prime factor to the resulting number of steps. Therefore the final answer will be `p_1 * e_1 + p_2 * e_2 + ... + p_t * e_t`. Here is the reformulated non-DP solution (more of a pure math solution):\\n\\n```\\npublic static int minSteps(int n) {\\n    int res = 0;\\n        \\n    for (int k = 2; k <= n; k++) {\\n        for (; n % k == 0; res += k, n /= k);\\n    }\\n        \\n    return res;\\n}\\n```\\n\\n---\\n`IV -- Summary`\\n\\nAlthough we have developed the non-DP solutions above, the ideas of the naive DP in part `I` carry merit as they can be adapted to solve the `4 Keys Keyboard` problem. The middle two operations `Ctrl-A` and `Ctrl-C` can be combined into one that resembles the `Copy All` operation here. Then again we can just try each position to perform the last `Ctrl-A` and `Ctrl-C` combo operation and choose the one that yields the most number of **'A'** on the screen. A key difference between the two is that we need to press the keys twice to complete the combo operation. And interestingly enough, we also have observations similar in part `II`, which can reduce the time complexity down to `O(n)`. Anyway, hope this helps for solving the `2 Keys and 4 Keys Keyboard` problems."
		},
		{
			"lc_ans_id":"105962",
			"view":"386",
			"top":"8",
			"title":"O(n) in swift",
			"vote":"3",
			"content":"Here in every step we check whether no of remaining 'A's to be printed is divisible by the no of 'A' already printed. \\n**If yes** we copy all the 'A's and paste. \\n**else** we paste whatever was last copied no of 'A' s\\n\\nclass Solution {\\n    \\n    func minSteps(_ n: Int) -> Int {\\n        \\n        var s = 0; // Steps\\n        var lc = 0; // Number of Last copied 'A' s\\n        var p = 1; // No of 'A' currently present on screen\\n        \\n        while(p<n)\\n        {\\n            \\n            if ( n % p == 0 )\\n            {\\n                lc = p;\\n                s = s + 1;\\n            }\\n            s = s + 1;\\n            p = p + lc;\\n        }\\n        return s;\\n        \\n    }\\n}"
		},
		{
			"lc_ans_id":"105979",
			"view":"309",
			"top":"9",
			"title":"Java recursive solution with explanation",
			"vote":"3",
			"content":"**m** represents the no of chars on screen. **clip** represents the no of chars in the clipboard. \\nAt every step, we either copy the screen or paste. We have to take the min of these two operations recursively to get the result.\\n```\\npublic class Solution {\\n    public int minSteps(int n) {\\n        //consider the 1st step done as there is only one possible - ie copy\\n        return n == 1 ? 0 : 1 + minSteps(1, 1, n);\\n    }\\n    \\n    private int minSteps(int m, int clip, int n) {\\n        if(m == n) {\\n            return 0;\\n        }\\n        \\n        if(m > n) {\\n\\t    // -1 signals that the key sequence followed so far is invalid\\n            return -1;\\n        }\\n        \\n        if(m == clip) {\\n\\t    //avoid a sequence with consecutive copies\\n            int pasteCost = minSteps(m + clip, clip, n);\\n            return pasteCost == -1 ? -1 : 1 + pasteCost;\\n        }\\n        \\n        int copyCost = minSteps(m, m, n);\\n        int pasteCost = minSteps(m + clip, clip, n);\\n        if(copyCost == -1 && pasteCost == -1) {\\n            return -1;\\n        }\\n        else if(copyCost == -1) {\\n            return 1 + pasteCost;\\n        }\\n        else if(pasteCost == -1) {\\n            return 1 + copyCost;\\n        }\\n        else {\\n            return 1 + Math.min(copyCost, pasteCost);    \\n        }\\n    }\\n}\\n```"
		}
	],
	"id":"627",
	"title":"2 Keys Keyboard",
	"content":"<p>\r\nInitially on a notepad only one character 'A' is present. You can perform two operations on this notepad for each step: \r\n<ol>\r\n<li><code>Copy All</code>: You can copy all the characters present on the notepad (partial copy is not allowed).</li>\r\n<li><code>Paste</code>: You can paste the characters which are copied <b>last time</b>.</li>\r\n</ol>\r\n</p>\r\n\r\n<p>\r\nGiven a number <code>n</code>. You have to get <b>exactly</b> <code>n</code> 'A' on the notepad by performing the minimum number of steps permitted. Output the minimum number of steps to get <code>n</code> 'A'. \r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> 3\r\n<b>Output:</b> 3\r\n<b>Explanation:</b>\r\nIntitally, we have one character 'A'.\r\nIn step 1, we use <b>Copy All</b> operation.\r\nIn step 2, we use <b>Paste</b> operation to get 'AA'.\r\nIn step 3, we use <b>Paste</b> operation to get 'AAA'.\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The <code>n</code> will be in the range [1, 1000].</li>\r\n</ol>\r\n</p>",
	"frequency":"172",
	"ac_num":"14734"
}