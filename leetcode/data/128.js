{
	"difficulty":"3",
	"submit_num":"342146",
	"show_id":"128",
	"leetcode_id":"128",
	"answers":[
		{
			"lc_ans_id":"41055",
			"view":"56598",
			"top":"0",
			"title":"My really simple Java O(n) solution - Accepted",
			"vote":"440",
			"content":"We will use HashMap. The key thing is to keep track of the sequence length and store that in the boundary points of the sequence. For example, as a result, for sequence {1, 2, 3, 4, 5}, map.get(1) and map.get(5) should both return 5.\\n\\nWhenever a new element **n** is inserted into the map, do two things:\\n\\n 1. See if **n - 1** and **n + 1** exist in the map, and if so, it means there is an existing sequence next to **n**. Variables **left** and **right** will be the length of those two sequences, while **0** means there is no sequence and **n** will be the boundary point later. Store **(left + right + 1)** as the associated value to key **n** into the map.\\n 2. Use **left** and **right** to locate the other end of the sequences to the left and right of **n** respectively, and replace the value with the new length.\\n\\n\\nEverything inside the **for** loop is O(1) so the total time is O(n). Please comment if you see something wrong. Thanks.\\n\\n    public int longestConsecutive(int[] num) {\\n        int res = 0;\\n        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();\\n        for (int n : num) {\\n            if (!map.containsKey(n)) {\\n                int left = (map.containsKey(n - 1)) ? map.get(n - 1) : 0;\\n                int right = (map.containsKey(n + 1)) ? map.get(n + 1) : 0;\\n                // sum: length of the sequence n is in\\n                int sum = left + right + 1;\\n                map.put(n, sum);\\n                \\n                // keep track of the max length \\n                res = Math.max(res, sum);\\n                \\n                // extend the length to the boundary(s)\\n                // of the sequence\\n                // will do nothing if n has no neighbors\\n                map.put(n - left, sum);\\n                map.put(n + right, sum);\\n            }\\n            else {\\n                // duplicates\\n                continue;\\n            }\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"41057",
			"view":"35727",
			"top":"1",
			"title":"Simple O(n) with Explanation - Just walk each streak",
			"vote":"287",
			"content":"First turn the input into a *set* of numbers. That takes O(n) and then we can ask in O(1) whether we have a certain number.\\n\\nThen go through the numbers. If the number x is the start of a streak (i.e., x-1 is not in the set), then test y = x+1, x+2, x+3, ... and stop at the first number y *not* in the set. The length of the streak is then simply y-x and we update our global best with that. Since we check each streak only once, this is overall O(n). This ran in 44 ms on the OJ, one of the fastest Python submissions.\\n\\n    def longestConsecutive(self, nums):\\n        nums = set(nums)\\n        best = 0\\n        for x in nums:\\n            if x - 1 not in nums:\\n                y = x + 1\\n                while y in nums:\\n                    y += 1\\n                best = max(best, y - x)\\n        return best"
		},
		{
			"lc_ans_id":"41088",
			"view":"15112",
			"top":"2",
			"title":"Possibly shortest cpp solution, only 6 lines.",
			"vote":"97",
			"content":"use a hash map to store boundary information of consecutive sequence for each element; there 4 cases when a new element i reached: \\n\\n1) neither i+1 nor i-1 has been seen: m[i]=1;\\n\\n2) both i+1 and i-1 have been seen: extend m[i+m[i+1]] and m[i-m[i-1]] to each other;\\n\\n3) only i+1 has been seen: extend m[i+m[i+1]] and m[i] to each other;\\n\\n4) only i-1 has been seen: extend m[i-m[i-1]] and m[i] to each other.\\n\\n\\n    int longestConsecutive(vector<int> &num) {\\n    \\tunordered_map<int, int> m;\\n    \\tint r = 0;\\n    \\tfor (int i : num) {\\n    \\t\\tif (m[i]) continue;\\n    \\t\\tr = max(r, m[i] = m[i + m[i + 1]] = m[i - m[i - 1]] = m[i + 1] + m[i - 1] + 1);\\n    \\t}\\n    \\treturn r;\\n    }"
		},
		{
			"lc_ans_id":"41067",
			"view":"10692",
			"top":"3",
			"title":"Simple fast Java solution using Set",
			"vote":"69",
			"content":"Using a set to collect all elements that hasn't been visited. search element will be O(1) and eliminates visiting element again.\\n\\n    public class Solution {\\n    public int longestConsecutive(int[] nums) {\\n        if(nums == null || nums.length == 0) return 0;\\n        \\n        Set<Integer> set = new HashSet<Integer>();\\n        \\n        for(int num: nums) set.add(num);\\n        int max = 1;\\n        for(int num: nums) {\\n            if(set.remove(num)) {//num hasn't been visited\\n                int val = num;\\n                int sum = 1;\\n                while(set.remove(val-1)) val--;\\n                sum += num - val;\\n                \\n                val = num;\\n                while(set.remove(val+1)) val++;\\n                sum += val - num;\\n                \\n                max = Math.max(max, sum);\\n            }\\n        }\\n        return max;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"41060",
			"view":"7997",
			"top":"4",
			"title":"A simple C++,solution using unordered_set.And simple consideration about this problem",
			"vote":"54",
			"content":"I have seen a lot of discussion about this problem.In my opinion,it is not correct to use set(which is ordered),because very time we insert an element to a ordered set,it will cost O(n),so the total complexity is O(nlogn),which violates the request of the problem.So here we use an unordered_set,and one is enough.\\n\\nBesides,to think about this problem,one principle issue we should realize is that usually when we want to reduce the time complexity,we have to increase the space complexity.In this case,if we want to access an element within O(1),we have to use hash table.\\n\\n    class Solution {\\n    public:\\n        int longestConsecutive(vector<int> &num) {\\n            unordered_set<int> record(num.begin(),num.end());\\n            int res = 1;\\n            for(int n : num){\\n                if(record.find(n)==record.end()) continue;\\n                record.erase(n);\\n                int prev = n-1,next = n+1;\\n                while(record.find(prev)!=record.end()) record.erase(prev--);\\n                while(record.find(next)!=record.end()) record.erase(next++);\\n                res = max(res,next-prev-1);\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"41130",
			"view":"4167",
			"top":"5",
			"title":"Another accepted Java O(n) solution",
			"vote":"41",
			"content":"    public int longestConsecutive(int[] num) {\\n      int max = 0;\\n      \\n      Set<Integer> set = new HashSet<Integer>();\\n      for (int i = 0; i < nums.length; i++) {\\n        set.add(nums[i]);\\n      }\\n      \\n      for (int i = 0; i < nums.length; i++) {\\n        int count = 1;\\n        \\n        // look left\\n        int num = nums[i];\\n        while (set.contains(--num)) {\\n          count++;\\n          set.remove(num);\\n        }\\n        \\n        // look right\\n        num = nums[i];\\n        while (set.contains(++num)) {\\n          count++;\\n          set.remove(num);\\n        }\\n        \\n        max = Math.max(max, count);\\n      }\\n      \\n      return max;\\n    }"
		},
		{
			"lc_ans_id":"41062",
			"view":"4039",
			"top":"6",
			"title":"My Java Solution using UnionFound",
			"vote":"36",
			"content":"        \\n    public class Solution {\\n            public int longestConsecutive(int[] nums) {\\n                UF uf = new UF(nums.length);\\n                Map<Integer,Integer> map = new HashMap<Integer,Integer>(); // <value,index>\\n                for(int i=0; i<nums.length; i++){\\n                    if(map.containsKey(nums[i])){\\n                        continue;\\n                    }\\n                    map.put(nums[i],i);\\n                    if(map.containsKey(nums[i]+1)){\\n                        uf.union(i,map.get(nums[i]+1));\\n                    }\\n                    if(map.containsKey(nums[i]-1)){\\n                        uf.union(i,map.get(nums[i]-1));\\n                    }\\n                }\\n                return uf.maxUnion();\\n            }\\n        }\\n        \\n        class UF{\\n            private int[] list;\\n            public UF(int n){\\n                list = new int[n];\\n                for(int i=0; i<n; i++){\\n                    list[i] = i;\\n                }\\n            }\\n            \\n            private int root(int i){\\n                while(i!=list[i]){\\n                    list[i] = list[list[i]];\\n                    i = list[i];\\n                }\\n                return i;\\n            }\\n            \\n            public boolean connected(int i, int j){\\n                return root(i) == root(j);\\n            }\\n            \\n            public void union(int p, int q){\\n              int i = root(p);\\n              int j = root(q);\\n              list[i] = j;\\n            }\\n            \\n            // returns the maxium size of union\\n            public int maxUnion(){ // O(n)\\n                int[] count = new int[list.length];\\n                int max = 0;\\n                for(int i=0; i<list.length; i++){\\n                    count[root(i)] ++;\\n                    max = Math.max(max, count[root(i)]);\\n                }\\n                return max;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"41141",
			"view":"3095",
			"top":"7",
			"title":"O(n) HashMap Java Solution",
			"vote":"22",
			"content":"Use a hashmap to map a number to its longest consecutive sequence length, each time find a new consecutive sequence, only the begin number and end number need to be modified.\\n\\n    public class Solution {\\n        public int longestConsecutive(int[] num) {\\n            int longest = 0;\\n            Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n            for(int i = 0;i < num.length;i++){\\n                // if there is no duplicates, these two lines can be commented\\n                if(map.containsKey(num[i])) continue;\\n                map.put(num[i],1);\\n                \\n                int end = num[i];\\n                int begin = num[i];\\n                if(map.containsKey(num[i]+1))\\n                    end = num[i] + map.get(num[i]+1);\\n                if(map.containsKey(num[i]-1))\\n                    begin = num[i] - map.get(num[i]-1);\\n                longest = Math.max(longest, end-begin+1);\\n                map.put(end, end-begin+1);\\n                map.put(begin, end-begin+1);\\n            }\\n            return longest;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"41281",
			"view":"4437",
			"top":"8",
			"title":"13-line C++ solution",
			"vote":"19",
			"content":"Thought I would share it here. May be useful for some one. The algorithm itself is pretty straightforward. But it benefited quite much from the neat expression of C++ idioms. Comments are appreciated!\\n\\n    int longestConsecutive(const vector<int> &num) {\\n        unordered_set<int> s(num.begin(), num.end()), searched;\\n        int longest = 0;\\n        for (int i: num) {\\n            if (searched.find(i) != searched.end()) continue;\\n            searched.insert(i);\\n            int j = i - 1, k = i + 1;\\n            while (s.find(j) != s.end()) searched.insert(j--);\\n            while (s.find(k) != s.end()) searched.insert(k++);\\n            longest = max(longest, k - 1 - j);\\n        }\\n        return longest;\\n    }"
		},
		{
			"lc_ans_id":"41126",
			"view":"2454",
			"top":"9",
			"title":"One Java solution",
			"vote":"18",
			"content":"\\tpublic int longestConsecutive(int[] num) {\\n        Set<Integer> set = new HashSet<Integer>(num.length);\\n        for (int n: num) {\\n        \\tset.add(n);\\n        }\\n        \\n        int maxLength = 0;\\n        for (int n: num) {\\n        \\tif (set.contains(n)) {\\n        \\t\\tint length = 1;\\n            \\tint next = n - 1;\\n            \\twhile (set.contains(next)) {\\n            \\t\\tlength++;\\n            \\t\\tset.remove(next);\\n            \\t\\tnext--;\\n            \\t}\\n            \\tnext = n+1;\\n            \\twhile (set.contains(next)) {\\n            \\t\\tlength++;\\n            \\t\\tset.remove(next);\\n            \\t\\tnext++;\\n            \\t}\\n            \\t\\n            \\tif (length > maxLength) {\\n            \\t\\tmaxLength = length;\\n            \\t}\\n        \\t}\\n        }\\n        \\n        return maxLength;\\n\\t}\\n\\nThe basic idea is put all integers into a set. Iterate all the integers and for every integer try to find its consecutive numbers in the set and accumulate the length. The trick is remove the integer whenever it has been visited, which makes the process O(n) because every integer will only be visited once."
		}
	],
	"id":"128",
	"title":"Longest Consecutive Sequence",
	"content":"<p>\r\nGiven an unsorted array of integers, find the length of the longest consecutive elements sequence.\r\n</p>\r\n<p>\r\nFor example,<br />\r\nGiven <code>[100, 4, 200, 1, 3, 2]</code>,<br />\r\nThe longest consecutive elements sequence is <code>[1, 2, 3, 4]</code>. Return its length: <code>4</code>.\r\n</p>\r\n<p>\r\nYour algorithm should run in O(<i>n</i>) complexity.\r\n</p>",
	"frequency":"503",
	"ac_num":"129710"
}