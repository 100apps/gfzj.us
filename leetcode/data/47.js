{
	"difficulty":"2",
	"submit_num":"435081",
	"show_id":"47",
	"leetcode_id":"47",
	"answers":[
		{
			"lc_ans_id":"18594",
			"view":"38213",
			"top":"0",
			"title":"Really easy Java solution, much easier than the solutions with very high vote",
			"vote":"132",
			"content":"Use an extra boolean array \" boolean[] used\"  to indicate whether the value is added to list. \\n\\nSort the array \"int[] nums\" to make sure we can skip the same value.\\n\\nwhen a number has the same value with its previous, we can use this number only if his previous is used\\n \\n\\n    public class Solution {\\n        public List<List<Integer>> permuteUnique(int[] nums) {\\n            List<List<Integer>> res = new ArrayList<List<Integer>>();\\n            if(nums==null || nums.length==0) return res;\\n            boolean[] used = new boolean[nums.length];\\n            List<Integer> list = new ArrayList<Integer>();\\n            Arrays.sort(nums);\\n            dfs(nums, used, list, res);\\n            return res;\\n        }\\n    \\n        public void dfs(int[] nums, boolean[] used, List<Integer> list, List<List<Integer>> res){\\n            if(list.size()==nums.length){\\n                res.add(new ArrayList<Integer>(list));\\n                return;\\n            }\\n            for(int i=0;i<nums.length;i++){\\n                if(used[i]) continue;\\n                if(i>0 &&nums[i-1]==nums[i] && !used[i-1]) continue;\\n                used[i]=true;\\n                list.add(nums[i]);\\n                dfs(nums,used,list,res);\\n                used[i]=false;\\n                list.remove(list.size()-1);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"18596",
			"view":"41035",
			"top":"1",
			"title":"A simple C++ solution in only 20 lines",
			"vote":"120",
			"content":"    class Solution {\\n    public:\\n        void recursion(vector<int> num, int i, int j, vector<vector<int> > &res) {\\n            if (i == j-1) {\\n                res.push_back(num);\\n                return;\\n            }\\n            for (int k = i; k < j; k++) {\\n                if (i != k && num[i] == num[k]) continue;\\n                swap(num[i], num[k]);\\n                recursion(num, i+1, j, res);\\n            }\\n        }\\n        vector<vector<int> > permuteUnique(vector<int> &num) {\\n            sort(num.begin(), num.end());\\n            vector<vector<int> >res;\\n            recursion(num, 0, num.size(), res);\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"18604",
			"view":"13600",
			"top":"2",
			"title":"A non-recursive C++ implementation with O(1) space cost",
			"vote":"47",
			"content":"    class Solution {\\n    public:\\n    \\tvector<vector<int> > permuteUnique(vector<int> &S) {\\n    \\t\\t// res.clear();\\n    \\t\\tsort(S.begin(), S.end());\\t\\t\\n    \\t\\tres.push_back(S);\\n    \\t\\tint j;\\n    \\t\\tint i = S.size()-1;\\n    \\t\\twhile (1){\\n    \\t\\t\\tfor (i=S.size()-1; i>0; i--){\\n    \\t\\t\\t\\tif (S[i-1]< S[i]){\\n    \\t\\t\\t\\t\\tbreak;\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t}\\n    \\t\\t\\tif(i == 0){\\n    \\t\\t\\t\\tbreak;\\n    \\t\\t\\t}\\n    \\n    \\t\\t\\tfor (j=S.size()-1; j>i-1; j--){\\n    \\t\\t\\t\\tif (S[j]>S[i-1]){\\n    \\t\\t\\t\\t\\tbreak;\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t}\\t\\t\\t\\t\\t\\n    \\t\\t\\tswap(S[i-1], S[j]);\\n    \\t\\t\\treverse(S, i, S.size()-1);\\n    \\t\\t\\tres.push_back(S);\\n    \\t\\t}\\n    \\t\\treturn res;\\n        }\\n    \\tvoid reverse(vector<int> &S, int s, int e){\\t\\t\\n    \\t\\twhile (s<e){\\n    \\t\\t\\tswap(S[s++], S[e--]);\\n    \\t\\t}\\n    \\t}\\n    \\t\\n    \\tvector<vector<int> > res;\\n    };\\n\\nBasically, assume we have \"1234\", the idea is to increase the number in ascending order, so next is \"1243\", next is \"1324\", and so on."
		},
		{
			"lc_ans_id":"18602",
			"view":"8810",
			"top":"3",
			"title":"9-line python solution with 1 line to handle duplication, beat 99% of others :-)",
			"vote":"41",
			"content":"Very similar to Permutation I, see explanations in https://leetcode.com/discuss/19510/my-ac-simple-iterative-java-python-solution. To handle duplication, just avoid inserting a number before any of its duplicates.\\n\\n    def permuteUnique(self, nums):\\n        ans = [[]]\\n        for n in nums:\\n            new_ans = []\\n            for l in ans:\\n                for i in xrange(len(l)+1):\\n                    new_ans.append(l[:i]+[n]+l[i:])\\n                    if i<len(l) and l[i]==n: break              #handles duplication\\n            ans = new_ans\\n        return ans"
		},
		{
			"lc_ans_id":"18648",
			"view":"5746",
			"top":"4",
			"title":"Share my Java code with detailed explanantion",
			"vote":"40",
			"content":"    public class Solution {\\n        public List<List<Integer>> permuteUnique(int[] nums) {\\n            List<List<Integer>> ans = new ArrayList<>();\\n            if (nums==null || nums.length==0) { return ans; }\\n            permute(ans, nums, 0);\\n            return ans;\\n        }\\n        \\n        private void permute(List<List<Integer>> ans, int[] nums, int index) {\\n            if (index == nums.length) { \\n                List<Integer> temp = new ArrayList<>();\\n                for (int num: nums) { temp.add(num); }\\n                ans.add(temp);\\n                return;\\n            }\\n            Set<Integer> appeared = new HashSet<>();\\n            for (int i=index; i<nums.length; ++i) {\\n                if (appeared.add(nums[i])) {\\n                    swap(nums, index, i);\\n                    permute(ans, nums, index+1);\\n                    swap(nums, index, i);\\n                }\\n            }\\n        }\\n        \\n        private void swap(int[] nums, int i, int j) {\\n            int save = nums[i];\\n            nums[i] = nums[j];\\n            nums[j] = save;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"18628",
			"view":"9253",
			"top":"5",
			"title":"Accepted backtracking C++ solution by using map (28ms)",
			"vote":"36",
			"content":"I see most solutions are using next permutation. That's great and only uses O(1) space.\\n\\nAnyway I am sharing backtracking solution which uses O(n) space. This is actually a typical backtracking problem. We can use hash map to check whether the element was already taken. However, we could get TLE if we check vector<int> num every time. So we iterate the hash map instead.\\n\\n    class Solution {\\n    public:\\n    vector<vector<int> > permuteUnique(vector<int> &num) {\\n        vector<vector<int>> v;\\n        vector<int> r;\\n        map<int, int> map;\\n        for (int i : num)\\n        {\\n            if (map.find(i) == map.end()) map[i] = 0;\\n            map[i]++;\\n        }\\n        permuteUnique(v, r, map, num.size());\\n        return v;\\n    }\\n    \\n    void permuteUnique(vector<vector<int>> &v, vector<int> &r, map<int, int> &map, int n)\\n    {\\n        if (n <= 0)\\n        {\\n            v.push_back(r);\\n            return;\\n        }\\n        for (auto &p : map)\\n        {\\n            if (p.second <= 0) continue;\\n            p.second--;\\n            r.push_back(p.first);\\n            permuteUnique(v, r, map, n - 1);\\n            r.pop_back();\\n            p.second++;\\n        }\\n    }\\n    };"
		},
		{
			"lc_ans_id":"18724",
			"view":"6145",
			"top":"6",
			"title":"Share my recursive solution",
			"vote":"26",
			"content":"    public class Solution {\\n        public List<List<Integer>> permuteUnique(int[] num) {\\n            Arrays.sort(num);\\n            List<List<Integer>> result = new ArrayList<List<Integer>>();\\n            List<Integer> current = new ArrayList<Integer>();\\n            boolean[] visited = new boolean[num.length];\\n            permute(result, current, num, visited);\\n            return result;\\n        }\\n        \\n        private void permute(List<List<Integer>> result, List<Integer> current, int[] num, boolean[] visited) {\\n            if (current.size() == num.length) {\\n                result.add(new ArrayList<Integer>(current));\\n                return;\\n            }\\n            for (int i=0; i<visited.length; i++) {\\n                if (!visited[i]) {\\n                    if (i > 0 && num[i] == num[i-1] && visited[i-1]) {\\n                        return;\\n                    }\\n                    visited[i] = true;\\n                    current.add(num[i]);\\n                    permute(result, current, num, visited);\\n                    current.remove(current.size()-1);\\n                    visited[i] = false;\\n                }\\n            }\\n        }\\n    }\\n\\nThe idea to resolve duplicate is to ensure that for elements with the same value, we make sure that they are picked up in the ascending order of index. To implement this, every time we try to pick up some value, we just check if the previous element has the same value and is visited or not. If so, we just return!"
		},
		{
			"lc_ans_id":"18601",
			"view":"6438",
			"top":"7",
			"title":"Short iterative Java solution",
			"vote":"24",
			"content":"Hi guys!\\n\\nHere's an iterative solution which doesn't use nextPermutation helper. It builds the permutations for i-1 first elements of an input array and tries to insert the ith element into all positions of each prebuilt i-1 permutation. I couldn't come up with more effective controling of uniqueness than just using a Set.\\n\\nSee the code below!\\n\\n----------\\n\\n    public class Solution {\\n        public List<List<Integer>> permuteUnique(int[] num) {\\n            LinkedList<List<Integer>> res = new LinkedList<>();\\n            res.add(new ArrayList<>());\\n            for (int i = 0; i < num.length; i++) {\\n                Set<String> cache = new HashSet<>();\\n                while (res.peekFirst().size() == i) {\\n                    List<Integer> l = res.removeFirst();\\n                    for (int j = 0; j <= l.size(); j++) {\\n                        List<Integer> newL = new ArrayList<>(l.subList(0,j));\\n                        newL.add(num[i]);\\n                        newL.addAll(l.subList(j,l.size()));\\n                        if (cache.add(newL.toString())) res.add(newL);\\n                    }\\n                }\\n            }\\n            return res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"18657",
			"view":"3251",
			"top":"8",
			"title":"Iterative Python solution without using set, 111ms",
			"vote":"20",
			"content":"Duplication happens when we insert the duplicated element before and after the same element, to eliminate duplicates, just insert only after the same element.\\n\\n    \\n    def permuteUnique(self, num):\\n        if not num:\\n            return []\\n        num.sort()\\n        ret = [[]]\\n        for n in num:\\n            new_ret = []\\n            l = len(ret[-1])\\n            for seq in ret:\\n                for i in range(l, -1, -1):\\n                    if i < l and seq[i] == n:\\n                        break\\n                    new_ret.append(seq[:i] + [n] + seq[i:])\\n            ret = new_ret\\n        return ret"
		},
		{
			"lc_ans_id":"18670",
			"view":"4446",
			"top":"9",
			"title":"Short and Fast Recursive Java solution Easy to understand with Explaination",
			"vote":"16",
			"content":"The idea is to try to put every number at the beginning of the array, and then do the same thing for the rest of the array.\\n\\n    public class Solution {\\n        public List<List<Integer>> permuteUnique(int[] nums) {\\n            List<List<Integer>> res = new ArrayList<List<Integer>>();\\n            Arrays.sort(nums);\\n            LinkedList<Integer> list = new LinkedList<Integer>();\\n            for (int num : nums) list.add(num);\\n            permute(list, 0, res);\\n            return res;\\n        }\\n        private void permute(LinkedList<Integer> nums, int start, List<List<Integer>> res){\\n            if (start == nums.size() - 1){\\n                res.add(new LinkedList<Integer>(nums));\\n                return;\\n            }\\n            for (int i = start; i < nums.size(); i++){\\n                if (i > start && nums.get(i) == nums.get(i - 1)) continue;\\n                nums.add(start, nums.get(i));\\n                nums.remove(i + 1);\\n                permute(nums, start + 1, res);\\n                nums.add(i + 1, nums.get(start));\\n                nums.remove(start);\\n            }\\n        }\\n    }"
		}
	],
	"id":"47",
	"title":"Permutations II",
	"content":"<p>\r\nGiven a collection of numbers that might contain duplicates, return all possible unique permutations.\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\n<code>[1,1,2]</code> have the following unique permutations:<br />\r\n<pre>\r\n[\r\n  [1,1,2],\r\n  [1,2,1],\r\n  [2,1,1]\r\n]\r\n</pre>\r\n</p>",
	"frequency":"311",
	"ac_num":"149732"
}