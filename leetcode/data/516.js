{
	"difficulty":"1",
	"submit_num":"112448",
	"show_id":"532",
	"leetcode_id":"532",
	"answers":[
		{
			"lc_ans_id":"100098",
			"view":"20067",
			"top":"0",
			"title":"Java O(n) solution - one Hashmap, easy to understand",
			"vote":"79",
			"content":"```\\npublic class Solution {\\n    public int findPairs(int[] nums, int k) {\\n        if (nums == null || nums.length == 0 || k < 0)   return 0;\\n        \\n        Map<Integer, Integer> map = new HashMap<>();\\n        int count = 0;\\n        for (int i : nums) {\\n            map.put(i, map.getOrDefault(i, 0) + 1);\\n        }\\n        \\n        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {\\n            if (k == 0) {\\n                //count how many elements in the array that appear more than twice.\\n                if (entry.getValue() >= 2) {\\n                    count++;\\n                } \\n            } else {\\n                if (map.containsKey(entry.getKey() + k)) {\\n                    count++;\\n                }\\n            }\\n        }\\n        \\n        return count;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100116",
			"view":"7331",
			"top":"1",
			"title":"1-liner in Python, O(n) time",
			"vote":"19",
			"content":"```\\n    def findPairs(self, nums, k):\\n       return len(set(nums)&{n+k for n in nums}) if k>0 else sum(v>1 for v in collections.Counter(nums).values()) if k==0 else 0\\n```\\nwhich is equivalent to:\\n```\\n    def findPairs(self, nums, k):\\n        if k>0:\\n            return len(set(nums)&set(n+k for n in nums))\\n        elif k==0:\\n            sum(v>1 for v in collections.Counter(nums).values())\\n        else:\\n            return 0\\n```"
		},
		{
			"lc_ans_id":"100104",
			"view":"11151",
			"top":"2",
			"title":"Two-pointer Approach",
			"vote":"18",
			"content":"The problem is just a variant of 2-sum.\\n**Update:** Fixed a bug that can cause integer subtraction overflow.\\n**Update:** The code runs in `O(n log n)` time, using `O(1)` space.\\n\\n```java\\npublic int findPairs(int[] nums, int k) {\\n    int ans = 0;\\n    Arrays.sort(nums);\\n    for (int i = 0, j = 0; i < nums.length; i++) {\\n        for (j = Math.max(j, i + 1); j < nums.length && (long) nums[j] - nums[i] < k; j++) ;\\n        if (j < nums.length && (long) nums[j] - nums[i] == k) ans++;\\n        while (i + 1 < nums.length && nums[i] == nums[i + 1]) i++;\\n    }\\n    return ans;\\n}\\n```"
		},
		{
			"lc_ans_id":"100151",
			"view":"6769",
			"top":"3",
			"title":"[C++] [Java] Clean Code with Explanation [set] [map]",
			"vote":"11",
			"content":"**C++**\\n```\\nclass Solution {\\npublic:\\n    /**\\n     * for every number in the array:\\n     *  - if there was a number previously k-diff with it, save the smaller to a set;\\n     *  - and save the value-index to a map;\\n     */\\n    int findPairs(vector<int>& nums, int k) {\\n        if (k < 0) {\\n            return 0;\\n        }\\n        unordered_set<int> starters;\\n        unordered_map<int, int> indices;\\n        for (int i = 0; i < nums.size(); i++) {\\n            if (indices.count(nums[i] - k)) {\\n                starters.insert(nums[i] - k);\\n            }\\n            if (indices.count(nums[i] + k)) {\\n                starters.insert(nums[i]);\\n            }\\n\\n            indices[nums[i]] += 1;\\n        }\\n        \\n        return starters.size();\\n    }\\n};\\n```\\n**Java**\\n```\\npublic class Solution {\\n    public int findPairs(int[] nums, int k) {\\n        if (k < 0) { return 0; }\\n\\n        Set<Integer> starters = new HashSet<Integer>();\\n        Set<Integer> uniqs = new HashSet<Integer>();\\n        for (int i = 0; i < nums.length; i++) {\\n            if (uniqs.contains(nums[i] - k)) starters.add(nums[i] - k);\\n            if (uniqs.contains(nums[i] + k)) starters.add(nums[i]);\\n            uniqs.add(nums[i]);\\n        }\\n\\n        return starters.size();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100135",
			"view":"1885",
			"top":"4",
			"title":"Easy understand Python solution",
			"vote":"10",
			"content":"```\\ndef findPairs(self, nums, k):\\n        res = 0\\n        c = collections.Counter(nums)\\n        for i in c:\\n            if k > 0 and i + k in c or k == 0 and c[i] > 1:\\n                res += 1\\n        return res\\n````\\nwhich is equivalent to:\\n`````\\ndef findPairs(self, nums, k):\\n        c = collections.Counter(nums)\\n        return  sum(k > 0 and i + k in c or k == 0 and c[i] > 1 for i in c)"
		},
		{
			"lc_ans_id":"100101",
			"view":"650",
			"top":"5",
			"title":"C++ O(N) Time with unordered_map",
			"vote":"8",
			"content":"```\\n// OJ: https://leetcode.com/problems/k-diff-pairs-in-an-array\\n// Author: github.com/lzl124631x\\n// Time: O(N)\\n// Space: O(N)\\nclass Solution {\\npublic:\\n  int findPairs(vector<int>& nums, int k) {\\n    if (k < 0) return 0;\\n    unordered_map<int, int> m;\\n    for (int n : nums) m[n]++;\\n    int cnt = 0;\\n    for (auto p : m) {\\n      if ((!k && p.second > 1)\\n        || (k && m.count(p.first + k))) ++cnt;\\n    }\\n    return cnt;\\n  }\\n};\\n```"
		},
		{
			"lc_ans_id":"100109",
			"view":"1112",
			"top":"6",
			"title":"Interesting Java Solution/ HashSet Only",
			"vote":"7",
			"content":"Put all numbers n in Hashset S1.\\nPut all numbers n+k in HashSet S2.\\nThe number of pairs are the intersection of the two Hashsets. Different conditions apply to k=0 or k<0.\\n\\n```\\npublic class Solution {\\n    public int findPairs(int[] nums, int k) {\\n        \\n        int ans = 0;\\n        \\n        if(k<0) return ans;\\n        \\n        Set<Integer> set1 = new HashSet<Integer> ();\\n        Set<Integer> set2 = new HashSet<Integer> ();\\n        \\n        if(k==0){\\n                for(int n:nums){\\n                    if(!set1.contains(n))\\n                        {set1.add(n);}\\n                    else{\\n                        set1.remove(n);\\n                        if(!set2.contains(n)) ans++;\\n                        set2.add(n);\\n                        }\\n                }\\n        }\\n        else{\\n            for(int n:nums){\\n                set1.add(n);\\n                set2.add(n+k);\\n            }\\n            set1.retainAll(set2);\\n            ans = set1.size();\\n        }\\n        \\n        return ans;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100111",
			"view":"3274",
			"top":"7",
			"title":"O(n) concise solution, C++",
			"vote":"6",
			"content":"```\\nclass Solution {\\npublic:\\n    int findPairs(vector<int>& nums, int k) {\\n        if(k < 0) return 0;\\n        unordered_map<int,int> m;\\n        for(int i = 0; i < nums.size(); ++i)\\n           ++m[nums[i]];\\n        int res = 0;\\n        if(k != 0) {\\n            for(auto it = m.begin(); it != m.end(); ++it)\\n               if(m.find(it->first+k) != m.end())\\n                   ++res;\\n        } else {\\n            for(auto it = m.begin(); it != m.end(); ++it)\\n               if(it->second > 1)\\n                   ++res;\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"100148",
			"view":"388",
			"top":"8",
			"title":"Simple Java O(n) with single For-loop & single HashMap",
			"vote":"4",
			"content":"Solved it by One For-loop and One HashMap\\n```\\npublic int findPairs(int[] nums, int k) {\\n    if(k < 0) return 0;\\n    Map<Integer, Boolean> map = new HashMap<Integer, Boolean>();\\n    int ret = 0;\\n    for(int n : nums){\\n        /* if smaller matched value exists */\\n        if(map.containsKey(n-k) && !map.get(n-k)){\\n            map.put(n-k,true);\\n            ret++;\\n        }\\n        /* if larger matched value exists */\\n        if(map.containsKey(n+k) && (!map.containsKey(n) || !map.get(n))){\\n            map.put(n, true);\\n            ret++;\\n        }\\n        /* if current value has not yet been added*/\\n        if(!map.containsKey(n)){\\n            map.put(n, false);\\n        }\\n    }\\n    return ret;\\n}\\n````"
		},
		{
			"lc_ans_id":"100114",
			"view":"1059",
			"top":"9",
			"title":"Self-explained AC Java Sliding Window",
			"vote":"4",
			"content":"```\\n public  int findPairs(int[] nums, int k) {\\n\\tif(k<0 || nums.length<=1){\\n\\t    return 0;\\n\\t}\\n\\t\\t \\n         Arrays.sort(nums);\\n         int count = 0;\\n         int left = 0;\\n         int right = 1;\\n         \\n         while(right<nums.length){\\n             int firNum = nums[left];\\n             int secNum = nums[right];\\n             // If less than k, increase the right index\\n             if(secNum-firNum<k){\\n                 right++;\\n             }\\n             // If larger than k, increase the left index\\n             else if(secNum - firNum>k){\\n                 left++;   \\n             }\\n             // If equal, move left and right to next different number\\n             else{\\n                 count++;\\n                 while(left<nums.length && nums[left]==firNum){\\n                     left++;\\n                 }\\n                 while(right<nums.length && nums[right]==secNum){\\n                     right++;\\n                 }\\n                             \\n             }\\n             //left and right should not be the same number\\n             if(right==left){\\n             \\tright++;\\n             }\\n         }\\n        return count;\\n    }\\n```"
		}
	],
	"id":"516",
	"title":"K-diff Pairs in an Array",
	"content":"<p>\r\nGiven an array of integers and an integer <b>k</b>, you need to find the number of <b>unique</b> k-diff pairs in the array. Here a <b>k-diff</b> pair is defined as an integer pair (i, j), where <b>i</b> and <b>j</b> are both numbers in the array and their <a href = \"https://en.wikipedia.org/wiki/Absolute_difference\">absolute difference</a> is <b>k</b>.\r\n</p>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [3, 1, 4, 1, 5], k = 2\r\n<b>Output:</b> 2\r\n<b>Explanation: </b>There are two 2-diff pairs in the array, (1, 3) and (3, 5).</br>Although we have two 1s in the input, we should only return the number of <b>unique</b> pairs.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b>[1, 2, 3, 4, 5], k = 1\r\n<b>Output: </b>4\r\n<b>Explanation:</b> There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input: </b>[1, 3, 1, 5, 4], k = 0\r\n<b>Output: </b>1\r\n<b>Explanation:</b> There is one 0-diff pair in the array, (1, 1).\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The pairs (i, j) and (j, i) count as the same pair.</li>\r\n<li>The length of the array won't exceed 10,000.</li>\r\n<li>All the integers in the given input belong to the range: [-1e7, 1e7].</li>\r\n</ol>\r\n</p>",
	"frequency":"155",
	"ac_num":"31714"
}