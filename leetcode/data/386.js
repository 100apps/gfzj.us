{
	"difficulty":"2",
	"submit_num":"62019",
	"show_id":"386",
	"leetcode_id":"386",
	"answers":[
		{
			"lc_ans_id":"86242",
			"view":"18205",
			"top":"0",
			"title":"Java O(n) time, O(1) space iterative solution 130ms",
			"vote":"130",
			"content":"```\\npublic List<Integer> lexicalOrder(int n) {\\n        List<Integer> list = new ArrayList<>(n);\\n        int curr = 1;\\n        for (int i = 1; i <= n; i++) {\\n            list.add(curr);\\n            if (curr * 10 <= n) {\\n                curr *= 10;\\n            } else if (curr % 10 != 9 && curr + 1 <= n) {\\n                curr++;\\n            } else {\\n                while ((curr / 10) % 10 == 9) {\\n                    curr /= 10;\\n                }\\n                curr = curr / 10 + 1;\\n            }\\n        }\\n        return list;\\n    }\\n```\\n\\nThe basic idea is to find the next number to add.\\nTake 45 for example: if the current number is 45, the next one will be 450 (450 == 45 * 10)(if 450 <= n), or 46 (46 == 45 + 1) (if 46 <= n) or 5 (5 == 45 / 10 + 1)(5 is less than 45 so it is for sure less than n).\\nWe should also consider n = 600, and the current number = 499, the next number is 5 because there are all \"9\"s after \"4\" in \"499\" so we should divide 499 by 10 until the last digit is not \"9\".\\nIt is like a tree, and we are easy to get a sibling, a left most child and the parent of any node."
		},
		{
			"lc_ans_id":"86231",
			"view":"11292",
			"top":"1",
			"title":"Simple Java DFS Solution",
			"vote":"108",
			"content":"\\n```\\nThe idea is pretty simple. If we look at the order we can find out we just keep adding digit from 0 to 9 to every digit and make it a tree.\\nThen we visit every node in pre-order. \\n       1        2        3    ...\\n      /\\\\        /\\\\       /\\\\\\n   10 ...19  20...29  30...39   ....\\n\\n```\\n\\n\\n```\\npublic class Solution {\\n    public List<Integer> lexicalOrder(int n) {\\n        List<Integer> res = new ArrayList<>();\\n        for(int i=1;i<10;++i){\\n          dfs(i, n, res); \\n        }\\n        return res;\\n    }\\n    \\n    public void dfs(int cur, int n, List<Integer> res){\\n        if(cur>n)\\n            return;\\n        else{\\n            res.add(cur);\\n            for(int i=0;i<10;++i){\\n                if(10*cur+i>n)\\n                    return;\\n                dfs(10*cur+i, n, res);\\n            }\\n        }\\n    }\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"86237",
			"view":"4627",
			"top":"2",
			"title":"AC 200ms c++ solution, beats 98%",
			"vote":"37",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<int> lexicalOrder(int n) {\\n        vector<int> res(n);\\n        int cur = 1;\\n        for (int i = 0; i < n; i++) {\\n            res[i] = cur;\\n            if (cur * 10 <= n) {\\n                cur *= 10;\\n            } else {\\n                if (cur >= n) \\n                    cur /= 10;\\n                cur += 1;\\n                while (cur % 10 == 0)\\n                    cur /= 10;\\n            }\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"86228",
			"view":"2040",
			"top":"3",
			"title":"The most elegant python solution so far. 10 liner. iterative. O(n) time, O(1) space.",
			"vote":"17",
			"content":"Simple. easy to understand. No fking weird, rarely used built-int functions.\\n'''\\n\\n    class Solution(object):\\n        def lexicalOrder(self, n):\\n            ans = [1]\\n            while len(ans) < n:\\n                new = ans[-1] * 10\\n                while new > n:\\n                    new /= 10\\n                    new += 1\\n                    while new % 10 == 0:    # deal with case like 199+1=200 when we need to restart from 2.\\n                        new /= 10\\n                ans.append(new)    \\n            return ans\\n'''"
		},
		{
			"lc_ans_id":"86235",
			"view":"4147",
			"top":"4",
			"title":"Python with Sorting",
			"vote":"16",
			"content":"Three accepted solutions and me rambling on about failed attempts :-D\\n\\n<br>\\n\\n## Solution 1 <sup>(accepted in 1792, 1747, 1700 ms)</sup>\\n\\nI just sort the numbers 1 to n using my custom comparison. To compare two numbers, I \"left-shift\" them both before comparing them. For example if n = 49999, then I left-shift numbers so they're five digits. That is, 42 becomes 42000 and 123 becomes 12300. In case of ties, e.g., 420 also becoming 42000, the stability of `sorted` keeps them in order.\\n```\\ndef lexicalOrder(self, n):\\n    top = 1\\n    while top * 10 <= n:\\n        top *= 10\\n    def mycmp(a, b, top=top):\\n        while a < top: a *= 10\\n        while b < top: b *= 10\\n        return -1 if a < b else b < a\\n    return sorted(xrange(1, n+1), mycmp)\\n```\\n\\n<br>\\n\\n## Solution 2 <sup>(accepted in 1268, 1508, 1320, 1356, 1336 ms)</sup>\\n```\\ndef lexicalOrder(self, n):\\n    withKeys = []\\n    for i in xrange(1, n+1):\\n        key = i\\n        while key < 1000000:\\n            key *= 10\\n        withKeys.append(key * 10000000 + i)\\n    withKeys.sort()\\n    return [ki % 10000000 for ki in withKeys]\\n```\\nHere I combine each number with a left-aligned version of it, for example:\\n```\\n     42  =>  42000000000042\\n   4200  =>  42000000004200\\n 123456  =>  12345600123456\\n```\\nThen just sort these and then extract the lower parts.\\n\\n<br>\\n\\n## Complexity\\n\\nI think **Time** complexity and **space** complexity are both **O(n)** (at least if sort does what I think it does, I'll check some more), and the space complexity has a low hidden factor.\\n\\nThe time and memory limits for Python for this problem are pretty low, requiring a fairly efficient solution. On LeetCode, Python ints are 64 bits, so embedding the left-aligned version of numbers in the numbers (solution 2) doesn't cost extra memory. Also, sorting simple ints is fast. Especially since the order from 1 to n is already largely sorted lexicographically, like the streak from 100 to 999 and the streak from 1000 to 9999. And Python's (Tim)sort can take advantage of those streaks and just merge them. If it merges \"left to right\" like I think it does, then it merges the small streaks first and only integrates the longest streaks last, which leads to overall O(n) time.\\n\\n<br>\\n\\n## Optimizing Solution 2 <sup>(accepted in 980, 984, 980 ms)\\n\\nInstead of assuming that we get numbers up to seven digits long and using constants, this uses the largest power of 10 up to n.\\n```\\ndef lexicalOrder(self, n):\\n    highDigit = 1\\n    while highDigit * 10 <= n:\\n        highDigit *= 10\\n    higherDigit = highDigit * 10\\n    withKeys = []\\n    for i in xrange(1, n+1):\\n        key = i\\n        while key < highDigit:\\n            key *= 10\\n        withKeys.append(key * higherDigit + i)\\n    withKeys.sort()\\n    return [ki % higherDigit for ki in withKeys]\\n```\\n\\n<br>\\n\\n## History...\\n\\nOf course the first thing I had tried was this:\\n\\n    def lexicalOrder(self, n):\\n        return sorted(range(1, n+1), key=str)\\n\\nOutrageously, this wasn't accepted! Got \"Memory Limit Exceeded\" at input n=49999! So next I tried the `cmp`-version of `sorted` instead of the `key`-version, and building strings only on the fly so it takes less memory:\\n\\n    def lexicalOrder(self, n):\\n        return sorted(range(1, n+1), lambda a, b: cmp(str(a), str(b)))\\n\\nHorrendously, this wasn't accepted! Got \"Time Limit Exceeded\" at input n=49999! So next I tried converting to strings, sorting those, and converting back to ints. Uses more memory, but less time:\\n\\n    def lexicalOrder(self, n):\\n        return map(int, sorted(map(str, xrange(1, n+1))))\\n        \\nUnfathomably, this wasn't accepted! Got \"Memory Limit Exceeded\" at input n=49999! The horror! Apparently LeetCode really didn't want me to get away with being lazy. So I tried it without sorting or strings and built the numbers in correct order:\\n\\n    def lexicalOrder(self, n):\\n        def dfs(i):\\n            if i <= n:\\n                result.append(i)\\n                for d in xrange(10):\\n                    dfs(10 * i + d)\\n        result = []\\n        for i in range(1, 10):\\n            dfs(i)\\n        return result\\n\\nIrritatingly, this wasn't accepted! Got \"Time Limit Exceeded\"! At input n=**14959**! So it was even **slower** than the above. Geez. And none of this was even remotely close to the \"5,000,000\" that the problem threatened me with. I gave up. And implemented that last solution in C++. It got accepted.\\n\\nLater I found out that the \"5,000,000\" isn't even close to true, the largest actual test case is 49999. But even after lots of different attempts, I still can't get any simple stringify+sort solution accepted. The most efficient I came up with is this:\\n\\n    def lexicalOrder(self, n):\\n        return sorted(xrange(1, n+1), lambda a, b, s=str: 1 if s(b) < s(a) else -1)\\n\\nThat uses `xrange`, which is faster than `range`, uses the `cmp`-version of `sorted` because the `key` version gets memory limit exceeded, uses a fast local variable instead of the slower global `str`, and exploits that there are no duplicate numbers so I just have to distinguish two cases which I do with `<` instead of the `cmp` function. Still, after all of that optimization it's not fast enough. But based on comparing it with accepted solutions in custom testing, I think it's close. Maybe 10% too slow.\\n\\nI did get one stringify+sort solution accepted, but it's less simple. I'll post that one later..."
		},
		{
			"lc_ans_id":"86331",
			"view":"853",
			"top":"5",
			"title":"\"Merge Sort\" solution (with explanation)",
			"vote":"7",
			"content":"**Idea:** Each streak of same-length numbers (`1..9`, `10..99`, `100..999`, `1000..9999`, etc) is already lexicographically sorted. Just merge these streaks. First merge `1..9` with `10..99`, then merge with `100..999`, and so on.\\n\\n    vector<int> lexicalOrder(int n) {\\n        vector<int> result(n);\\n        int* first = &result[0];\\n        iota(first, first + n, 1);\\n        for (int ok = 9; ok < n; ok = 10*ok+9)\\n            inplace_merge(first,\\n                          first + ok,\\n                          first + min(ok*10+9, n),\\n                          [ok](int a, int b){\\n                              while (b <= ok) b *= 10;\\n                              return a < b;\\n                          });\\n        return result;\\n    }\\n\\nFirst I use `iota` to store the numbers 1 to n in normal order. Note that 1 to 9 are already `ok`, i.e., already lexicographically sorted. And 10 to 99 are as well. Now I just merge those two streaks and then the first 99 entries are already ok. Then I merge them with the streak 100 to 999, and so on. The comparison for the merging scales up the numbers from the already ok range. For example if I'm merging with the next streak 1000 to 9999, then the previously already ok numbers like 26 or 7 get scaled to 2600 and 7000."
		},
		{
			"lc_ans_id":"86249",
			"view":"1261",
			"top":"6",
			"title":"Recursive Java Solution using pre-order traversal",
			"vote":"6",
			"content":"The big idea is Tree's ```pre-order traversal```, which means we first output the root, and then its left and right child, and we cannot output right child until we finishing outputting all nodes on the left branch.\\nFor this problem, a dummy node is the top root, and its children are ```1``` through ```9```; for node ```1```, its children are ```10, 100, 1000``` and so on; for node ```10```, its children are ```11``` through ```19```. \\nNotes that we use ```(i + 1 <= (i / 10) * 10 + 9)``` to restrict the range of children.\\n```\\npublic class Solution {\\n    public List<Integer> lexicalOrder(int n) {\\n        List<Integer> res = new ArrayList<>();\\n        lexicalOrderHelper(res, 1, n);\\n        return res;\\n    }\\n\\n    private void lexicalOrderHelper(List<Integer> res, int i, int n) {\\n        if(i > n) return;\\n        res.add(i);\\n        lexicalOrderHelper(res, i * 10, n);\\n        if(i + 1 <= (i / 10) * 10 + 9) lexicalOrderHelper(res, i + 1, n);\\n        else return;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"86255",
			"view":"1456",
			"top":"7",
			"title":"Python with DFS",
			"vote":"5",
			"content":"Accepted python code with DFS (1073ms):\\n```\\n    def lexicalOrder(self, n):\\n        def dfs(k, res):\\n            if k <= n:\\n                res.append(k)\\n                t = 10*k\\n                if t <= n:\\n                    for i in range(10):\\n                        dfs(t + i, res)\\n        res = []\\n        for i in range(1, 10):\\n            dfs(i, res)\\n        return res\\n```\\nInterestingly, with only one modification to the above code, the following code gets Memory Limit Exceeded.\\n```\\n    def lexicalOrder(self, n):\\n        def dfs(k):\\n            if k <= n:\\n                res.append(k)\\n                t = 10*k\\n                if t <= n:\\n                    for i in range(10):\\n                        dfs(t + i)\\n        res = []\\n        for i in range(1, 10):\\n            dfs(i)\\n        return res\\n```\\nThe only difference between these two is that, in the latter one, we do not pass the list `res` as an argument to the function `dfs`. Can anybody explain this phenomenon? Thanks!"
		},
		{
			"lc_ans_id":"86285",
			"view":"739",
			"top":"8",
			"title":"Java Backtracking Solution, Similar to Subsets",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public List<Integer> lexicalOrder(int n) {\\n        List<Integer> result = new ArrayList<>();\\n        for (int i = 1; i <= 9; i++) {\\n            if (i <= n) {\\n                helper(result, n, i);\\n            }\\n        }\\n        return result;\\n    }\\n    \\n    private void helper(List<Integer> result, int n, int last) {\\n        if (last > n) {\\n            return;\\n        }\\n\\n        result.add(last);\\n\\n        for (int i = 0; i <= 9; i++) {\\n            helper(result, n, last * 10 + i);\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"86288",
			"view":"477",
			"top":"9",
			"title":"7 lines simple C++ recursive solution",
			"vote":"3",
			"content":"Just repeatedly try from 1 to 9, 1 -> 10 -> 100 first, and then plus 1 to the deepest number. Take 13 as example:\\n```1 -> 10 -> (100) -> 11 -> (110) -> 12 -> (120) -> 13 -> (130) -> (14) -> 2 -> (20) ... -> 9 -> (90) ```\\n\\n```\\nclass Solution {\\npublic:\\n    vector<int> lexicalOrder(int n) {\\n        vector<int> res;\\n        helper(1, n, res);\\n        return res;\\n    }\\n    \\n    void helper(int target, int n, vector<int>& res) {\\n        if (target > n) return;\\n        res.push_back(target);\\n        helper(target * 10, n, res);\\n        if (target % 10 != 9) helper(target+1, n, res);\\n    }\\n};\\n```"
		}
	],
	"id":"386",
	"title":"Lexicographical Numbers",
	"content":"<p>\r\nGiven an integer <i>n</i>, return 1 - <i>n</i> in lexicographical order.\r\n</p>\r\n\r\n<p>\r\nFor example, given 13, return: [1,10,11,12,13,2,3,4,5,6,7,8,9].\r\n</p>\r\n\r\n<p>\r\nPlease optimize your algorithm to use less time and space. The input size may be as large as 5,000,000.\r\n</p>",
	"frequency":"438",
	"ac_num":"26134"
}