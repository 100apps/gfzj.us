{
	"difficulty":"2",
	"submit_num":"36380",
	"show_id":"526",
	"leetcode_id":"526",
	"answers":[
		{
			"lc_ans_id":"99707",
			"view":"14107",
			"top":"0",
			"title":"Java Solution, Backtracking",
			"vote":"51",
			"content":"Just try every possible number at each position...\\n\\n```\\npublic class Solution {\\n    int count = 0;\\n    \\n    public int countArrangement(int N) {\\n        if (N == 0) return 0;\\n        helper(N, 1, new int[N + 1]);\\n        return count;\\n    }\\n    \\n    private void helper(int N, int pos, int[] used) {\\n        if (pos > N) {\\n            count++;\\n            return;\\n        }\\n        \\n        for (int i = 1; i <= N; i++) {\\n            if (used[i] == 0 && (i % pos == 0 || pos % i == 0)) {\\n                used[i] = 1;\\n                helper(N, pos + 1, used);\\n                used[i] = 0;\\n            }\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99711",
			"view":"3555",
			"top":"1",
			"title":"Java 6ms beats 98% back tracking (swap) starting from the back",
			"vote":"23",
			"content":"The back tracking start from the back so that each search won't go too deep before it fails because smaller numbers have higher chance to be divisible among themselves. Also I don't use \"visited\" boolean array but use swap of an array of 1~N to avoid duplication.\\n```\\n    private int count = 0;\\n    private void swap(int[] nums, int i, int j) {\\n        int tmp = nums[i];\\n        nums[i] = nums[j];\\n        nums[j] = tmp;\\n    }\\n    private void helper(int[] nums, int start) {\\n        if (start == 0) {\\n            count++;\\n            return;\\n        }\\n        for (int i = start; i > 0; i--) {\\n            swap(nums, start, i);\\n            if (nums[start] % start == 0 || start % nums[start] == 0) helper(nums, start-1);\\n            swap(nums,i, start);\\n        }\\n    }\\n    public int countArrangement(int N) {\\n        if (N == 0) return 0;\\n        int[] nums = new int[N+1];\\n        for (int i = 0; i <= N; i++) nums[i] = i;\\n        helper(nums, N);\\n        return count;\\n    }\\n```"
		},
		{
			"lc_ans_id":"99714",
			"view":"6631",
			"top":"2",
			"title":"My C++ elegant solution with back-tracking",
			"vote":"17",
			"content":"```\\n// By lovellp\\n// Time: 6ms\\nclass Solution {\\npublic:\\n    int countArrangement(int N) {\\n        vector<int> vs;\\n        for (int i=0; i<N; ++i) vs.push_back(i+1);\\n        return counts(N, vs);\\n    }\\n    int counts(int n, vector<int>& vs) {\\n        if (n <= 0) return 1;\\n        int ans = 0;\\n        for (int i=0; i<n; ++i) {\\n            if (vs[i]%n==0 || n%vs[i]==0) {\\n                swap(vs[i], vs[n-1]);\\n                ans += counts(n-1, vs);\\n                swap(vs[i], vs[n-1]);\\n            }\\n        }\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"99721",
			"view":"3438",
			"top":"3",
			"title":"12 ms Java Backtracking sulotion",
			"vote":"11",
			"content":"The trick is: Arrange the values starting from the end of the array. \\n\\n```\\npublic class Solution {\\n    public int countArrangement(int N) {\\n        dfs(N, N, new boolean[N + 1]);\\n        return count;\\n    }\\n    \\n    int count = 0;\\n    \\n    void dfs(int N, int k, boolean[] visited) {\\n        if (k == 0) {\\n            count++;\\n            return;\\n        }\\n        for (int i = 1; i <= N; i++) {\\n            if (visited[i] || k % i != 0 && i % k != 0) {\\n                continue;\\n            }\\n            visited[i] = true;\\n            dfs(N, k - 1, visited);\\n            visited[i] = false;\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"99717",
			"view":"3748",
			"top":"4",
			"title":"Python recursion + DP 66ms",
			"vote":"8",
			"content":"Save the pre-computed the result globally and reuse.\\n```\\ncache = {}\\nclass Solution(object):\\n    def countArrangement(self, N):\\n        def helper(i, X):\\n            if i == 1:\\n                return 1\\n            key = (i, X)\\n            if key in cache:\\n                return cache[key]\\n            total = 0\\n            for j in xrange(len(X)):\\n                if X[j] % i == 0 or i % X[j] == 0:\\n                    total += helper(i - 1, X[:j] + X[j + 1:])\\n            cache[key] = total\\n            return total\\n        return helper(N, tuple(range(1, N + 1)))\\n```"
		},
		{
			"lc_ans_id":"99727",
			"view":"2373",
			"top":"5",
			"title":"If worried about Time Limit Exceeded... [Contest Strategy]",
			"vote":"6",
			"content":"There are only 15 possible inputs, so if you're worried about your solution being too slow or if your solution **is** too slow, you can just precompute all answers and submit an O(1) solution. If your precomputation is so slow that it takes *minutes*, you can even let it run in the background while you're solving the next problem(s). Remember that your contest ranking doesn't depend on the *sum* of your problem times but on the *largest* one.\\n\\n    def countArrangement(self, N):\\n        return (1, 2, 3, 8, 10, 36, 41, 132, 250, 700, 750, 4010, 4237, 10680, 24679)[N - 1]"
		},
		{
			"lc_ans_id":"99738",
			"view":"1768",
			"top":"6",
			"title":"Easy Python, ~230ms",
			"vote":"5",
			"content":"My `X` is the set of still available numbers. Gets accepted in about 230 ms:\\n\\n    def countArrangement(self, N):\\n        def count(i, X):\\n            if i == 1:\\n                return 1\\n            return sum(count(i - 1, X - {x})\\n                       for x in X\\n                       if x % i == 0 or i % x == 0)\\n        return count(N, set(range(1, N + 1)))\\n\\nNote that my `i` goes **downwards**, from N to 1. Because position `i = 1` can hold **any** number, so I don't even have to check whether the last remaining number fits there. Also, position `i = 2` happily holds every second number and `i = 3` happily holds every third number, so filling the lowest positions **last** has a relatively high chance of success. In other words, it's relatively hard to end up with dead ends this way.\\n\\nIf I go **upwards** (from 1 to N), it takes about 2300 ms:\\n\\n    def countArrangement(self, N):\\n        def count(i, X):\\n            if i > N:\\n                return 1\\n            return sum(count(i + 1, X - {x})\\n                       for x in X\\n                       if x % i == 0 or i % x == 0)\\n        return count(1, set(range(1, N + 1)))"
		},
		{
			"lc_ans_id":"99780",
			"view":"1249",
			"top":"7",
			"title":"Share My Backtrack solution",
			"vote":"3",
			"content":"```\\nint res;\\npublic int countArrangement(int N) {\\n\\tres = 0;\\n\\tList<Integer> list = new ArrayList<>();\\n\\tfor (int i = 1; i <= N; i++) list.add(i);\\n\\thelper(list, 1, N);\\n\\treturn res;\\n}\\n\\t\\t\\nprivate void helper(List<Integer> list, int id, int n) {\\n\\tif (id > n) {\\n\\t\\tres++;\\n\\t\\treturn;\\n\\t}\\n\\tfor (int i = 0; i < list.size(); i++) {\\n\\t\\tif (list.get(i) %id == 0 || id % list.get(i) == 0){\\n\\t\\t\\tint temp = list.remove(i);\\n\\t\\t\\thelper(list, id+1, n);\\n\\t\\t\\tlist.add(i, temp);\\n\\t\\t}\\n\\t}\\n}\\n```"
		},
		{
			"lc_ans_id":"99713",
			"view":"1073",
			"top":"8",
			"title":"Python BFS solution",
			"vote":"2",
			"content":"```\\nclass Solution(object):\\n    def countArrangement(self, N):\\n        \"\"\"\\n        :type N: int\\n        :rtype: int\\n        \"\"\"\\n        \\n        counter = 0\\n        queue = []\\n        x = []\\n        queue.append(x);\\n        while(len(queue) >0):\\n            x = queue.pop()\\n            if len(x) == N:\\n                counter+=1\\n            else:\\n                for i in range(1,N+1):\\n                    y = x[:]\\n                    if i not in y:\\n                        if (i % (len(y)+1) ==0) or ((1+len(y)) % i ==0):\\n                            y.append(i)\\n                            queue.append(y)\\n        return counter\\n        ```"
		},
		{
			"lc_ans_id":"99718",
			"view":"160",
			"top":"9",
			"title":"A general approach to backtrack problem",
			"vote":"1",
			"content":"The answer for this problem based on the template provided by @issac3, and is able to provide detailed answer if the problem changed.\\n```\\nclass Solution {\\npublic:\\n    int countArrangement(int N) {\\n        vector<int> tempList;\\n        vector<vector<int>> result;\\n        buildBeautiful(result, tempList, 1, N);\\n        return result.size();\\n    }\\n    \\n    void buildBeautiful(vector<vector<int>> &result, vector<int> tempList, int start, int end){\\n        if(start > end ){\\n            result.push_back(tempList);\\n            return;\\n        }\\n        for(int i=1; i<=end; i++){\\n            if(((tempList.size()+1)%i) != 0 && (i%(tempList.size()+1)) != 0)    continue;\\n            else if(find(tempList.begin(), tempList.end(), i) != tempList.end())    continue;\\n            tempList.push_back(i);\\n            buildBeautiful(result, tempList, start+1, end);\\n            tempList.pop_back();\\n        }\\n    }\\n};\\n```\\n@issac3 said in [A general approach to backtracking questions in Java \\\\(Subsets, Permutations, Combination Sum, Palindrome Partitioning\\\\)](/post/47844):\\n> This structure might apply to many other backtracking questions, but here I am just going to demonstrate Subsets, Permutations, and Combination Sum. \\n> \\n> Subsets : [https://leetcode.com/problems/subsets/][1]\\n> \\n>     public List<List<Integer>> subsets(int[] nums) {\\n>         List<List<Integer>> list = new ArrayList<>();\\n>         Arrays.sort(nums);\\n>         backtrack(list, new ArrayList<>(), nums, 0);\\n>         return list;\\n>     }\\n>     \\n>     private void backtrack(List<List<Integer>> list , List<Integer> tempList, int [] nums, int start){\\n>         list.add(new ArrayList<>(tempList));\\n>         for(int i = start; i < nums.length; i++){\\n>             tempList.add(nums[i]);\\n>             backtrack(list, tempList, nums, i + 1);\\n>             tempList.remove(tempList.size() - 1);\\n>         }\\n>     }\\n> \\n> \\n> Subsets II (contains duplicates) : [https://leetcode.com/problems/subsets-ii/][2]\\n> \\n>     public List<List<Integer>> subsetsWithDup(int[] nums) {\\n>         List<List<Integer>> list = new ArrayList<>();\\n>         Arrays.sort(nums);\\n>         backtrack(list, new ArrayList<>(), nums, 0);\\n>         return list;\\n>     }\\n>     \\n>     private void backtrack(List<List<Integer>> list, List<Integer> tempList, int [] nums, int start){\\n>         list.add(new ArrayList<>(tempList));\\n>         for(int i = start; i < nums.length; i++){\\n>             if(i > start && nums[i] == nums[i-1]) continue; // skip duplicates\\n>             tempList.add(nums[i]);\\n>             backtrack(list, tempList, nums, i + 1);\\n>             tempList.remove(tempList.size() - 1);\\n>         }\\n>     } \\n> \\n> \\n> ----------\\n> \\n> Permutations : [https://leetcode.com/problems/permutations/][3]\\n> \\n>     public List<List<Integer>> permute(int[] nums) {\\n>        List<List<Integer>> list = new ArrayList<>();\\n>        // Arrays.sort(nums); // not necessary\\n>        backtrack(list, new ArrayList<>(), nums);\\n>        return list;\\n>     }\\n>     \\n>     private void backtrack(List<List<Integer>> list, List<Integer> tempList, int [] nums){\\n>        if(tempList.size() == nums.length){\\n>           list.add(new ArrayList<>(tempList));\\n>        } else{\\n>           for(int i = 0; i < nums.length; i++){ \\n>              if(tempList.contains(nums[i])) continue; // element already exists, skip\\n>              tempList.add(nums[i]);\\n>              backtrack(list, tempList, nums);\\n>              tempList.remove(tempList.size() - 1);\\n>           }\\n>        }\\n>     } \\n> \\n> Permutations II (contains duplicates) : [https://leetcode.com/problems/permutations-ii/][4]\\n> \\n>     public List<List<Integer>> permuteUnique(int[] nums) {\\n>         List<List<Integer>> list = new ArrayList<>();\\n>         Arrays.sort(nums);\\n>         backtrack(list, new ArrayList<>(), nums, new boolean[nums.length]);\\n>         return list;\\n>     }\\n>     \\n>     private void backtrack(List<List<Integer>> list, List<Integer> tempList, int [] nums, boolean [] used){\\n>         if(tempList.size() == nums.length){\\n>             list.add(new ArrayList<>(tempList));\\n>         } else{\\n>             for(int i = 0; i < nums.length; i++){\\n>                 if(used[i] || i > 0 && nums[i] == nums[i-1] && !used[i - 1]) continue;\\n>                 used[i] = true; \\n>                 tempList.add(nums[i]);\\n>                 backtrack(list, tempList, nums, used);\\n>                 used[i] = false; \\n>                 tempList.remove(tempList.size() - 1);\\n>             }\\n>         }\\n>     }\\n> \\n> \\n> ----------\\n> \\n> Combination Sum : [https://leetcode.com/problems/combination-sum/][5]\\n> \\n>     public List<List<Integer>> combinationSum(int[] nums, int target) {\\n>         List<List<Integer>> list = new ArrayList<>();\\n>         Arrays.sort(nums);\\n>         backtrack(list, new ArrayList<>(), nums, target, 0);\\n>         return list;\\n>     }\\n>     \\n>     private void backtrack(List<List<Integer>> list, List<Integer> tempList, int [] nums, int remain, int start){\\n>         if(remain < 0) return;\\n>         else if(remain == 0) list.add(new ArrayList<>(tempList));\\n>         else{ \\n>             for(int i = start; i < nums.length; i++){\\n>                 tempList.add(nums[i]);\\n>                 backtrack(list, tempList, nums, remain - nums[i], i); // not i + 1 because we can reuse same elements\\n>                 tempList.remove(tempList.size() - 1);\\n>             }\\n>         }\\n>     }\\n> \\n> Combination Sum II (can't reuse same element) : [https://leetcode.com/problems/combination-sum-ii/][6]\\n> \\n>     public List<List<Integer>> combinationSum2(int[] nums, int target) {\\n>         List<List<Integer>> list = new ArrayList<>();\\n>         Arrays.sort(nums);\\n>         backtrack(list, new ArrayList<>(), nums, target, 0);\\n>         return list;\\n>         \\n>     }\\n>     \\n>     private void backtrack(List<List<Integer>> list, List<Integer> tempList, int [] nums, int remain, int start){\\n>         if(remain < 0) return;\\n>         else if(remain == 0) list.add(new ArrayList<>(tempList));\\n>         else{\\n>             for(int i = start; i < nums.length; i++){\\n>                 if(i > start && nums[i] == nums[i-1]) continue; // skip duplicates\\n>                 tempList.add(nums[i]);\\n>                 backtrack(list, tempList, nums, remain - nums[i], i + 1);\\n>                 tempList.remove(tempList.size() - 1); \\n>             }\\n>         }\\n>     } \\n> \\n> \\n> Palindrome Partitioning : [https://leetcode.com/problems/palindrome-partitioning/][7]\\n> \\n>     public List<List<String>> partition(String s) {\\n>        List<List<String>> list = new ArrayList<>();\\n>        backtrack(list, new ArrayList<>(), s, 0);\\n>        return list;\\n>     }\\n>     \\n>     public void backtrack(List<List<String>> list, List<String> tempList, String s, int start){\\n>        if(start == s.length())\\n>           list.add(new ArrayList<>(tempList));\\n>        else{\\n>           for(int i = start; i < s.length(); i++){\\n>              if(isPalindrome(s, start, i)){\\n>                 tempList.add(s.substring(start, i + 1));\\n>                 backtrack(list, tempList, s, i + 1);\\n>                 tempList.remove(tempList.size() - 1);\\n>              }\\n>           }\\n>        }\\n>     }\\n>     \\n>     public boolean isPalindrome(String s, int low, int high){\\n>        while(low < high)\\n>           if(s.charAt(low++) != s.charAt(high--)) return false;\\n>        return true;\\n>     } \\n> \\n> \\n> \\n>   [1]: https://leetcode.com/problems/subsets/\\n>   [2]: https://leetcode.com/problems/subsets-ii/\\n>   [3]: https://leetcode.com/problems/permutations/\\n>   [4]: https://leetcode.com/problems/permutations-ii/\\n>   [5]: https://leetcode.com/problems/combination-sum/\\n>   [6]: https://leetcode.com/problems/combination-sum-ii/\\n>   [7]: https://leetcode.com/problems/palindrome-partitioning/"
		}
	],
	"id":"511",
	"title":"Beautiful Arrangement",
	"content":"<p>\r\nSuppose you have <b>N</b> integers from 1 to N. We define a beautiful arrangement as an array that is constructed by these <b>N</b> numbers successfully if one of the following is true for the i<sub>th</sub> position (1 <= i <= N) in this array:\r\n<ol>\r\n<li>The number at the i<sub>th</sub> position is divisible by <b>i</b>.</li>\r\n<li><b>i</b> is divisible by the number at the i<sub>th</sub> position.</li>\r\n</ol>\r\n</p>\r\n\r\n<p>\r\nNow given N, how many beautiful arrangements can you construct?\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> 2\r\n<b>Output:</b> 2\r\n<b>Explanation:</b> \r\n<br/>The first beautiful arrangement is [1, 2]:\r\n<br/>Number at the 1st position (i=1) is 1, and 1 is divisible by i (i=1).\r\n<br/>Number at the 2nd position (i=2) is 2, and 2 is divisible by i (i=2).\r\n<br/>The second beautiful arrangement is [2, 1]:\r\n<br/>Number at the 1st position (i=1) is 2, and 2 is divisible by i (i=1).\r\n<br/>Number at the 2nd position (i=2) is 1, and i (i=2) is divisible by 1.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li><b>N</b> is a positive integer and will not exceed 15.</li>\r\n</ol>\r\n</p>",
	"frequency":"254",
	"ac_num":"19559"
}