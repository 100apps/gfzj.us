{
	"difficulty":"2",
	"submit_num":"40484",
	"show_id":"491",
	"leetcode_id":"491",
	"answers":[
		{
			"lc_ans_id":"97130",
			"view":"11836",
			"top":"0",
			"title":"Java 20 lines backtracking solution using set, beats 100%.",
			"vote":"32",
			"content":"\\n    public class Solution {\\n\\n         public List<List<Integer>> findSubsequences(int[] nums) {\\n             Set<List<Integer>> res= new HashSet<List<Integer>>();\\n             List<Integer> holder = new ArrayList<Integer>();\\n             findSequence(res, holder, 0, nums);\\n             List result = new ArrayList(res);\\n             return result;\\n         }\\n    \\n        public void findSequence(Set<List<Integer>> res, List<Integer> holder, int index, int[] nums) {\\n            if (holder.size() >= 2) {\\n                res.add(new ArrayList(holder));\\n            }\\n            for (int i = index; i < nums.length; i++) {\\n                if(holder.size() == 0 || holder.get(holder.size() - 1) <= nums[i]) {\\n                    holder.add(nums[i]);\\n                    findSequence(res, holder, i + 1, nums);\\n                    holder.remove(holder.size() - 1);\\n                }\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"97147",
			"view":"3993",
			"top":"1",
			"title":"Java solution beats 100%",
			"vote":"19",
			"content":"```\\npublic class Solution {\\n    public List<List<Integer>> findSubsequences(int[] nums) {\\n        List<List<Integer>> res = new LinkedList<>();\\n        helper(new LinkedList<Integer>(), 0, nums, res);\\n        return res; \\n    }\\n    private void helper(LinkedList<Integer> list, int index, int[] nums, List<List<Integer>> res){\\n        if(list.size()>1) res.add(new LinkedList<Integer>(list));\\n        Set<Integer> used = new HashSet<>();\\n        for(int i = index; i<nums.length; i++){\\n            if(used.contains(nums[i])) continue;\\n            if(list.size()==0 || nums[i]>=list.peekLast()){\\n                used.add(nums[i]);\\n                list.add(nums[i]); \\n                helper(list, i+1, nums, res);\\n                list.remove(list.size()-1);\\n            }\\n        }\\n    }\\n}\\n```\\n\\nPretty straightforward. Maybe one thing is: while nums is not necessarily sorted but we have to skip duplicates in each recursion, so we use a hash set to record what we have used in this particular recursion."
		},
		{
			"lc_ans_id":"97148",
			"view":"5413",
			"top":"2",
			"title":"Clean 20ms solution",
			"vote":"16",
			"content":"```\\npublic List<List<Integer>> findSubsequences(int[] nums) {\\n\\tList<List<Integer>> res = new ArrayList<>();\\n\\thelper(res, new ArrayList<Integer>(), nums, 0);\\n\\treturn res;\\n}\\n\\t\\nprivate void helper(List<List<Integer>> res, List<Integer> list, int[] nums, int id) {\\n\\tif (list.size() > 1) res.add(new ArrayList<Integer>(list));\\n\\tList<Integer> unique = new ArrayList<Integer>();\\n\\tfor (int i = id; i < nums.length; i++) {\\n\\t\\tif (id > 0 && nums[i] < nums[id-1]) continue; // skip non-increase\\n\\t\\tif (unique.contains(nums[i])) continue; // skip duplicate\\n\\t\\tunique.add(nums[i]);\\n\\t\\tlist.add(nums[i]);\\n\\t\\thelper(res, list, nums, i+1);\\n\\t\\tlist.remove(list.size()-1);\\n\\t}\\n}\\n```"
		},
		{
			"lc_ans_id":"97127",
			"view":"2881",
			"top":"3",
			"title":"Simple Python",
			"vote":"13",
			"content":"First build all increasing subsequences regardless of length, then filter out the too short ones.\\n\\n    def findSubsequences(self, nums):\\n        subs = {()}\\n        for num in nums:\\n            subs |= {sub + (num,)\\n                     for sub in subs\\n                     if not sub or sub[-1] <= num}\\n        return [sub for sub in subs if len(sub) >= 2]"
		},
		{
			"lc_ans_id":"97124",
			"view":"2809",
			"top":"4",
			"title":"C++ dfs solution using unordered_set",
			"vote":"13",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<vector<int>> findSubsequences(vector<int>& nums) {\\n        vector<vector<int>> res;\\n        vector<int> seq;\\n        dfs(res, seq, nums, 0);\\n        return res;\\n    }\\n    \\n    void dfs(vector<vector<int>>& res, vector<int>& seq, vector<int>& nums, int pos) {\\n        if(seq.size() > 1) res.push_back(seq);\\n        unordered_set<int> hash;\\n        for(int i = pos; i < nums.size(); ++i) {\\n            if((seq.empty() || nums[i] >= seq.back()) && hash.find(nums[i]) == hash.end()) {\\n                seq.push_back(nums[i]);\\n                dfs(res, seq, nums, i + 1);\\n                seq.pop_back();\\n                hash.insert(nums[i]);\\n            }\\n        }\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"97134",
			"view":"464",
			"top":"5",
			"title":"Evolve from intuitive solution to optimal",
			"vote":"6",
			"content":"This is similar to Subsets II. \\n\\n1.  O(n2^n) For each number, we can either take it or drop it. Duplicates are removed by set.\\n```\\n    vector<vector<int>> findSubsequences(vector<int>& nums) {\\n        set<vector<int>> res;\\n        vector<int> one;\\n        find(0,nums, one, res);\\n        return vector<vector<int>>(res.begin(),res.end());\\n    }\\n    void find(int p, vector<int>& nums, vector<int>& one, set<vector<int>>& res) {\\n        if(p==nums.size()) {\\n            if(one.size()>1) res.insert(one);\\n            return;\\n        }\\n        if(one.empty()||nums[p]>=one.back()) {\\n            one.push_back(nums[p]);\\n            find(p+1,nums,one,res);\\n            one.pop_back();\\n        }\\n        find(p+1,nums,one,res);\\n    }\\n```\\n2. We can also generate all increasing subsequences by adding each number to the current sequencies iteratively and use set to remove duplicates.\\n```\\n    vector<vector<int>> findSubsequences(vector<int>& nums) {\\n        vector<vector<int>> seq(1);\\n        set<vector<int>> bst;\\n        for(int i=0;i<nums.size();i++) {\\n            int n = seq.size();\\n            for(int j=0;j<n;j++)\\n                if(seq[j].empty() || seq[j].back()<=nums[i]) {\\n                    seq.push_back(seq[j]);\\n                    seq.back().push_back(nums[i]);\\n                    if(seq.back().size()>1) bst.insert(seq.back());\\n                }  \\n        }\\n        return vector<vector<int>>(bst.begin(),bst.end());\\n    }\\n```\\n3. We can do better by not generating duplicates. When adding a duplicate number to existing sequences, we don't need to add to all sequences because that will create duplicate sequence. We only need to add to the sequences created since adding this number last time.\\n```\\n    vector<vector<int>> findSubsequences(vector<int>& nums) {\\n        vector<vector<int>> res(1);\\n        unordered_map<int,int> ht;\\n        for(int i=0;i<nums.size();i++) {\\n            int n = res.size();\\n            int start = ht[nums[i]];\\n            ht[nums[i]] = n;\\n            for(int j=start;j<n;j++)\\n                if(res[j].empty() || res[j].back()<=nums[i]) {\\n                    res.push_back(res[j]);\\n                    res.back().push_back(nums[i]);\\n                }  \\n        }\\n        for(int i=res.size()-1;i>=0;i--) \\n            if(res[i].size()<2) {\\n                swap(res[i],res.back());\\n                res.pop_back();\\n            }\\n        return res;\\n    }\\n```\\n4. Duplicates can also be avoided in recursion. Starting from a given number, we pick the next number. We cache the numbers already tried to avoid duplicates.\\n```\\n    vector<vector<int>> findSubsequences(vector<int>& nums) {\\n        vector<vector<int>> res;\\n        vector<int> one;\\n        find(0,nums,one,res);\\n        return res;\\n    }\\n    void find(int p, vector<int>& nums, vector<int>& one, vector<vector<int>>& res) {\\n        int n = nums.size();\\n        if(one.size()>1) res.push_back(one);\\n        unordered_set<int> ht;\\n        for(int i=p;i<n;i++) {\\n            if((!one.empty() && nums[i] < one.back()) || ht.count(nums[i])) continue;\\n            ht.insert(nums[i]);\\n            one.push_back(nums[i]);\\n            find(i+1,nums,one,res);\\n            one.pop_back();\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"97197",
			"view":"1435",
			"top":"6",
			"title":"Python solution by easily checking all combinations",
			"vote":"6",
			"content":"````\\n  import itertools\\n\\n  def findSubsequences(self, nums):\\n    ret = []\\n    for i in range(2, len(nums) + 1):\\n      ret.extend(set(itertools.combinations(nums, i)))\\n    return [x for x in ret if self.isIncreasing(x)]\\n\\n  def isIncreasing(self, l):\\n    for i in range(1, len(l)):\\n      if l[i - 1] > l[i]:\\n        return False\\n    return True"
		},
		{
			"lc_ans_id":"97171",
			"view":"1771",
			"top":"7",
			"title":"C++ Backtracking solution using Set of Vectors",
			"vote":"4",
			"content":"    class Solution {\\n    private:\\n        void findSubsequences(vector<int> &nums, vector<int> &subsequence,\\n                            set<vector<int> > &result, int size, int index) {\\n        if (size >= 2)\\n            result.insert(subsequence);\\n\\n\\n        for (int i = index; i < nums.size(); ++i) {\\n            if (subsequence.size() == 0 || nums[i] >= subsequence[subsequence.size() - 1]) {\\n                subsequence.push_back(nums[i]);\\n                findSubsequences(nums, subsequence, result, size + 1, i + 1);\\n                subsequence.pop_back();\\n            }\\n        }\\n    }\\n\\n    public:\\n        vector<vector<int>> findSubsequences(vector<int>& nums) {\\n            set<vector<int>> resultSet;\\n            vector<int> subsequence;\\n            findSubsequences(nums, subsequence, resultSet, 0, 0);\\n\\n            vector<vector<int>> result(resultSet.begin(), resultSet.end());\\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"97157",
			"view":"625",
			"top":"8",
			"title":"DP solution: not as clean as other Python solutions, but beats 99% in speed",
			"vote":"3",
			"content":"The basic idea is to iterate backwards through `nums` and keep track of all subsequences starting at each element.  We do this by adding all the subsequences that we already found for elements after the current one that are greater than or equal to the current element.  The only twist is that we keep a `seen` set to skip over repeated elements.  After iterating through `nums`, just collect all the none empty lists.\\n\\n    def findSubsequences(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: List[List[int]]\\n        \"\"\"\\n        N = len(nums)\\n        dp = [[] for _ in xrange(N)]\\n        ans = []\\n        \\n        for i in xrange(N-2,-1,-1):\\n            ni = nums[i]\\n            seen = set()\\n            for j in xrange(i+1, N):\\n                nj = nums[j]\\n                if ni <= nj and nj not in seen:\\n                    seen.add(nj)\\n                    dp[i].extend([\\n                        [ni] + x for x in [[nj]] + dp[j] \\n                        ])\\n                    \\n        seen = set()\\n        for i in xrange(N):\\n            if nums[i] not in seen:\\n                seen.add(nums[i])\\n                ans += dp[i]\\n        return ans"
		},
		{
			"lc_ans_id":"97141",
			"view":"213",
			"top":"9",
			"title":"[C++] Clean Code - Iterative",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<vector<int>> findSubsequences(vector<int>& a) {\\n        set<vector<int>> seqs = {vector<int>(0)};\\n        for (int i = 0; i < a.size(); i++) {\\n            vector<vector<int>> built(seqs.size());\\n            std::copy(seqs.begin(), seqs.end(), built.begin());\\n            for (auto seq : built) {\\n                if (seq.empty() || a[i] >= seq.back()) {\\n                    seq.push_back(a[i]);\\n                    seqs.insert(seq);\\n                }\\n            }\\n        }\\n        \\n        vector<vector<int>> res;\\n        for (auto seq : seqs)\\n            if (seq.size() > 1) res.push_back(seq);\\n\\n        return res;\\n    }\\n};\\n```"
		}
	],
	"id":"482",
	"title":"Increasing Subsequences",
	"content":"<p>\r\nGiven an integer array, your task is to find all the different possible increasing subsequences of the given array, and the length of an increasing subsequence should be at least 2 .\r\n</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> [4, 6, 7, 7]\r\n<b>Output:</b> [[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The length of the given array will not exceed 15.</li>\r\n<li>The range of integer in the given array is [-100,100].</li>\r\n<li>The given array may contain duplicates, and two equal integers should also be considered as a special case of increasing sequence.</li>\r\n</ol>\r\n</p>",
	"frequency":"92",
	"ac_num":"15796"
}