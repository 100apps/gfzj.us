{
	"difficulty":"3",
	"submit_num":"69692",
	"show_id":"403",
	"leetcode_id":"403",
	"answers":[
		{
			"lc_ans_id":"88824",
			"view":"14464",
			"top":"0",
			"title":"Very easy to understand JAVA solution with explanations",
			"vote":"49",
			"content":"Use map to represent a mapping from the stone (not index) to the steps that can be taken from this stone.\\n\\nso this will be \\n\\n[0,1,3,5,6,8,12,17]\\n\\n{17=[], 0=[1], 1=[1, 2], 3=[1, 2, 3], 5=[1, 2, 3], 6=[1, 2, 3, 4], 8=[1, 2, 3, 4], 12=[3, 4, 5]}\\n\\nNotice that no need to calculate the last stone.\\n\\nOn each step, we look if any other stone can be reached from it, if so, we update that stone's steps by adding step, step + 1, step - 1. If we can reach the final stone, we return true. No need to calculate to the last stone.\\n\\nHere is the code:\\n\\n```\\n    public boolean canCross(int[] stones) {\\n        if (stones.length == 0) {\\n        \\treturn true;\\n        }\\n        \\n        HashMap<Integer, HashSet<Integer>> map = new HashMap<Integer, HashSet<Integer>>(stones.length);\\n        map.put(0, new HashSet<Integer>());\\n        map.get(0).add(1);\\n        for (int i = 1; i < stones.length; i++) {\\n        \\tmap.put(stones[i], new HashSet<Integer>() );\\n        }\\n        \\n        for (int i = 0; i < stones.length - 1; i++) {\\n        \\tint stone = stones[i];\\n        \\tfor (int step : map.get(stone)) {\\n        \\t\\tint reach = step + stone;\\n        \\t\\tif (reach == stones[stones.length - 1]) {\\n        \\t\\t\\treturn true;\\n        \\t\\t}\\n        \\t\\tHashSet<Integer> set = map.get(reach);\\n        \\t\\tif (set != null) {\\n        \\t\\t    set.add(step);\\n        \\t\\t    if (step - 1 > 0) set.add(step - 1);\\n        \\t\\t    set.add(step + 1);\\n        \\t\\t}\\n        \\t}\\n        }\\n        \\n        return false;\\n    } \\n```"
		},
		{
			"lc_ans_id":"88805",
			"view":"11814",
			"top":"1",
			"title":"Straight-forward 9ms 7-line c++ solution with explanation",
			"vote":"31",
			"content":"Search for the last stone in a depth-first way, prune those exceeding the [k-1,k+1] range. Well, I think the code is simple enough and need no more explanation.\\n```\\nbool canCross(vector<int>& stones, int pos = 0, int k = 0) {\\n    for (int i = pos + 1; i < stones.size(); i++) {\\n        int gap = stones[i] - stones[pos];\\n        if (gap < k - 1) continue;\\n        if (gap > k + 1) return false;\\n        if (canCross(stones, i, gap)) return true;\\n    }\\n    return pos == stones.size() - 1;\\n}\\n```\\nThis can pass OJ at 9ms but is inefficient for extreme cases. (update: new test cases are added and the solution above no longer passes OJ, please see the solution below which takes 62ms) We can memorize the returns with minimum effort:\\n```\\nunordered_map<int, bool> dp;\\n\\nbool canCross(vector<int>& stones, int pos = 0, int k = 0) {\\n    int key = pos | k << 11;\\n\\n    if (dp.count(key) > 0)\\n        return dp[key];\\n\\n    for (int i = pos + 1; i < stones.size(); i++) {\\n        int gap = stones[i] - stones[pos];\\n        if (gap < k - 1)\\n            continue;\\n        if (gap > k + 1)\\n            return dp[key] = false;\\n        if (canCross(stones, i, gap))\\n            return dp[key] = true;\\n    }\\n\\n    return dp[key] = (pos == stones.size() - 1);\\n}\\n```\\nThe number of stones is less than 1100 so **pos** will always be less than 2^11 (2048).\\nStone positions could be theoretically up to 2^31 but **k** is practically not possible to be that big for the parameter as the steps must start from 0 and 1 and at the 1100th step the greatest valid k would be 1100. So combining **pos** and **k** is safe here."
		},
		{
			"lc_ans_id":"88804",
			"view":"3713",
			"top":"2",
			"title":"JAVA DFS 17ms beat 99.28% so far",
			"vote":"13",
			"content":"The idea is simple: \\n\\n(1) Using a HashSet to store all the positions of the stones. So when you are trying to jump to a position, you will know whether there is a stone at that position or not.\\n(2) Starting from the first valid position (the second stone if it is 1), you try to jump as far as possible. At each position, if you jumped x steps to this position, the next possible positions are position + x - 1, position + x and position + x + 1. If any of them is the last stone's position, then you can return true. If not, use DFS from the longest jump first.\\n(3) This path finding process can be terminated much earlier if there are two stones that are too far away. \\n\\n```   \\n public boolean canCross(int[] stones) {\\n        if (stones == null || stones.length == 0) {return false;}\\n        int n = stones.length;\\n        if (n == 1) {return true;}\\n        if (stones[1] != 1) {return false;}\\n        if (n == 2) {return true;}\\n        int last = stones[n - 1];\\n        HashSet<Integer> hs = new HashSet();\\n        for (int i = 0; i < n; i++) {\\n            if (i > 3 && stones[i] > stones[i - 1] * 2) {return false;} // The two stones are too far away. \\n            hs.add(stones[i]);\\n        }\\n        return canReach(hs, last, 1, 1);\\n    }\\n    \\n    private boolean canReach(HashSet<Integer> hs, int last, int pos, int jump) {\\n        if (pos + jump - 1 == last || pos + jump == last || pos + jump + 1 == last) {\\n            return true;\\n        }\\n        if (hs.contains(pos + jump + 1)) {\\n            if (canReach(hs, last, pos + jump + 1, jump + 1)) {return true;}\\n        }\\n        if (hs.contains(pos + jump)) {\\n            if (canReach(hs, last, pos + jump, jump)) {return true;}\\n        }\\n        if (jump > 1 && hs.contains(pos + jump - 1)) {\\n            if (canReach(hs, last, pos + jump - 1, jump - 1)) {return true;}\\n        }\\n        return false;\\n    }\\n```"
		},
		{
			"lc_ans_id":"88873",
			"view":"2651",
			"top":"3",
			"title":"Python DFS easy understanding using memo",
			"vote":"7",
			"content":"Following is my backtracking solution using dict for memorization.\\n\\nThe **memo** dict is using for save those dead end. So when we get to the same stone with the same speed we don't need to search further.\\n\\n```\\nclass Solution(object):\\n    def canCross(self, stones):\\n        self.memo = set()\\n        target = stones[-1]\\n        stones = set(stones)\\n\\n        res = self.bt(stones, 1, 1, target)\\n        return res\\n\\n    def bt(self, stones, cur, speed, target):\\n        # check memo\\n        if (cur, speed) in self.memo:\\n            return False\\n\\n        if cur==target:\\n            return True\\n        \\n        if cur>target or cur<0 or speed<=0 or cur not in stones:\\n            return False\\n        # dfs\\n        candidate = [speed-1, speed, speed+1]\\n        for c in candidate:\\n            if (cur + c) in stones:\\n                if self.bt(stones, cur+c, c, target):\\n                    return True\\n\\n        self.memo.add((cur,speed))\\n        return False\\n```"
		},
		{
			"lc_ans_id":"88858",
			"view":"4254",
			"top":"4",
			"title":"Easy Version java",
			"vote":"6",
			"content":"```\\npublic boolean canCross(int[] stones) {\\n        if(stones[1] > 1) return false;\\n        if(stones.length == 2) return true;\\n        return helper(stones, 1, 1);\\n    }\\n    private boolean helper(int[] arr, int i, int step){\\n        boolean pass = false;\\n        if(i == arr.length-1) return true;\\n        for(int j = i+1; j < arr.length; j++){\\n            if(arr[j] <= arr[i] + step + 1 && arr[j] >= arr[i]+step-1){\\n                pass = pass || helper(arr, j, arr[j] - arr[i]);\\n            }\\n        }\\n        return pass;\\n    }\\n```"
		},
		{
			"lc_ans_id":"88810",
			"view":"4392",
			"top":"5",
			"title":"C++ 9 lines O(n^2) iterative DP solution",
			"vote":"4",
			"content":"This solution is not as fast as some other O(n^2) DFS solutions possibly due to the OJ test cases. But it's simple and clean.\\nSpecial thanks @farahcs and @vesion for correcting the bug in previous code.\\n```\\nbool canCross(vector<int>& stones) {\\n        // To record available last steps to reach current position. Position 0 need 0 step to be reached\\n        unordered_map<int, unordered_set<int>> steps = {{0, {0}}};  \\n        \\n        for (int pos : stones) {\\n            for (auto it = steps[pos].begin(); it != steps[pos].end(); it++) {  // record all future reachable positions\\n                if (*it - 1) { steps[pos + *it - 1].insert(*it - 1); }\\n                steps[pos + *it].insert(*it);\\n                steps[pos + *it + 1].insert(*it + 1);\\n            }\\n        }\\n        \\n        return steps[stones.back()].size();                                     // check if the last position is reachable\\n    }\\n```"
		},
		{
			"lc_ans_id":"88939",
			"view":"730",
			"top":"6",
			"title":"Simple Easy to Understand Java solution",
			"vote":"4",
			"content":"```\\npublic static boolean canCross(int[] stones) {\\n        Map<Integer, Set<Integer>> stoneMap = new HashMap<>();\\n        for (int i = 1; i < stones.length; i++) {\\n            stoneMap.put(stones[i], new HashSet<Integer>());\\n        }\\n        if(stones[0]+1 == stones[1]) {\\n            stoneMap.get(stones[1]).add(1);\\n        }\\n        for(int i = 1; i < stones.length; i++) {\\n            int eachStone = stones[i];\\n            for(Integer K: stoneMap.get(eachStone)) {\\n                if(K != 1 &&  stoneMap.containsKey(eachStone + K - 1)) {\\n                    stoneMap.get(eachStone + K - 1).add(K - 1);\\n                }\\n                if(stoneMap.containsKey(eachStone + K)) {\\n                    stoneMap.get(eachStone + K).add(K);\\n                }\\n                if(stoneMap.containsKey(eachStone + K + 1)) {\\n                    stoneMap.get(eachStone + K + 1).add(K + 1);\\n                }\\n            }\\n        }\\n        return stoneMap.get(stones[stones.length - 1]).size() >= 1;\\n    }\\n```"
		},
		{
			"lc_ans_id":"88809",
			"view":"859",
			"top":"7",
			"title":"60ms Java O(N^2)   use a matrix for memorization",
			"vote":"3",
			"content":"memo[i][j] = 1 means that the frog can reach the final destination from i-th stone, with j being the previous step size. Because the maximum previous step size for the 0th, 1th, 2th stone is 0, 1, 2, ... , which means the maximum j is equal to i. So we can declare the matrix size as n*n where n is the number of stones.\\n\\nIf ignoring the recursive call overhead, this algorithm should have a time complexity of O(n^2) because we are just filling half of this matrix memo.\\n\\n```\\npublic class Solution {\\n    public boolean canCross(int[] stones) {\\n        if(stones[1] != 1) return false;\\n        int n = stones.length;\\n        int[][] memo = new int[n][n];\\n        for(int i = 0; i < n; i++) {\\n            for(int j = 0; j < n; j++)\\n            {\\n                memo[i][j] = -1;\\n            }\\n        }\\n        \\n        return canCross(stones, 0, 0, memo, n);\\n    }\\n    private boolean canCross(int[] stones, int i, int j, int[][] memo, int n) {\\n        if(memo[i][j]!=-1) return memo[i][j] == 1;\\n        if(i == n - 1) {\\n            memo[i][j] = 1;\\n            return true;\\n        }\\n\\n        for(int k = i + 1; k < n; k++) { \\n            if(stones[k] < j - 1 + stones[i]) continue;\\n            else if(stones[k] > j + 1 + stones[i]) {\\n                memo[i][j] = 0;\\n                return false;\\n            }\\n            else {\\n                if(canCross(stones, k, stones[k] - stones[i], memo, n)) {\\n                    memo[i][j] = 1;\\n                    return true;\\n                }\\n            }\\n        }\\n        memo[i][j] = 0;\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"88905",
			"view":"2365",
			"top":"8",
			"title":"Java Solution Using HashMap",
			"vote":"3",
			"content":"For each stone, we write down a set of jump distances taken from previous stones to reach this stone (for example, if the stones were 3, 5, 7, then for stone 7 we write down 7 - 3 = 4 and 7 - 5 = 2, assuming they're both valid moves). From the distance set we can find a set of \"imaginary\" stones reachable from this stone, so all we have to do is to figure out (through hash table) which of those target stones actually exists, and propagate the distance to their distance sets.\\n\\nFinally, we check if the last stone was reachable by checking if its distance set wasn't empty.\\n\\n```\\npublic class Solution {\\n    public boolean canCross(int[] stones) {\\n        final int l = stones != null ? stones.length : 0;\\n        if (l < 1 || stones[0] != 0) return false;\\n        final Map<Integer, Set<Integer>> map = new HashMap<>();\\n        for (int s : stones) map.put(s, new HashSet<Integer>());\\n        for (int s : stones) {\\n            Set<Integer> jSet = map.get(s);\\n            // Initial condition\\n            if (s == 0) {\\n                jSet.add(0);\\n                if (map.containsKey(1)) map.get(1).add(1);\\n                continue;\\n            }\\n            // For other stones\\n            for (int j : jSet) {\\n                int jj = j - 1;\\n                int ss = s + jj;\\n                // Previous jump - 1\\n                if (ss != s && map.containsKey(ss)) map.get(ss).add(jj);\\n                // Previous jump\\n                jj++; ss++;\\n                if (ss != s && map.containsKey(ss)) map.get(ss).add(jj);\\n                // Previous jump + 1\\n                jj++; ss++;\\n                if (ss != s && map.containsKey(ss)) map.get(ss).add(jj);\\n            }\\n        }\\n        return !map.get(stones[l - 1]).isEmpty();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"88896",
			"view":"389",
			"top":"9",
			"title":"Simple and easy understand java solution",
			"vote":"2",
			"content":"```\\npublic boolean canCross(int[] stones) {\\n        if (stones == null || stones.length == 0) {\\n            return false;\\n        }\\n        if (stones[1] > 1) {\\n            return false;\\n        }\\n\\n        Set[] lastJump = new Set[stones.length];\\n        for (int i = 1; i < stones.length; i++) {\\n            lastJump[i] = new HashSet<Integer>();\\n        }\\n        lastJump[1].add(1);\\n        \\n        for (int i = 2; i < stones.length; i++) {\\n            for (int j = 1; j < i; j++) {\\n                //cell j can be reached\\n                if (lastJump[j].size() > 0) {\\n                    int currJump = stones[i] - stones[j];\\n                    if (lastJump[j].contains(currJump) || \\n                        lastJump[j].contains(currJump + 1) ||\\n                        lastJump[j].contains(currJump - 1)) {\\n                        lastJump[i].add(currJump);\\n                    }\\n                }\\n            }\\n        }\\n        return lastJump[stones.length - 1].size() > 0;\\n    }\\n```"
		}
	],
	"id":"403",
	"title":"Frog Jump",
	"content":"<p>A frog is crossing a river. The river is divided into x units and at each unit there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water.</p>\r\n\r\n<p>Given a list of stones' positions (in units) in sorted ascending order, determine if the frog is able to cross the river by landing on the last stone. Initially, the frog is on the first stone and assume the first jump must be 1 unit.\r\n</p>\r\n\r\n<p>If the frog's last jump was <i>k</i> units, then its next jump must be either <i>k</i> - 1, <i>k</i>, or <i>k</i> + 1 units. Note that the frog can only jump in the forward direction.</p>\r\n\r\n<p><b>Note:</b>\r\n<ul>\r\n<li>The number of stones is &ge; 2 and is < 1,100.</li>\r\n<li>Each stone's position will be a non-negative integer < 2<sup>31</sup>.</li>\r\n<li>The first stone's position is always 0.</li>\r\n</ul>\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>[0,1,3,5,6,8,12,17]</b>\r\n\r\nThere are a total of 8 stones.\r\nThe first stone at the 0th unit, second stone at the 1st unit,\r\nthird stone at the 3rd unit, and so on...\r\nThe last stone at the 17th unit.\r\n\r\n<b>Return true</b>. The frog can jump to the last stone by jumping \r\n1 unit to the 2nd stone, then 2 units to the 3rd stone, then \r\n2 units to the 4th stone, then 3 units to the 6th stone, \r\n4 units to the 7th stone, and 5 units to the 8th stone.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>[0,1,2,3,4,8,9,11]</b>\r\n\r\n<b>Return false</b>. There is no way to jump to the last stone as \r\nthe gap between the 5th and 6th stone is too large.\r\n</pre>\r\n</p>",
	"frequency":"249",
	"ac_num":"22712"
}