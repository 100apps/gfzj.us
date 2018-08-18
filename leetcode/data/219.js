{
	"difficulty":"1",
	"submit_num":"408041",
	"show_id":"219",
	"leetcode_id":"219",
	"answers":[
		{
			"lc_ans_id":"61372",
			"view":"34153",
			"top":"0",
			"title":"Simple Java solution",
			"vote":"254",
			"content":"    public boolean containsNearbyDuplicate(int[] nums, int k) {\\n            Set<Integer> set = new HashSet<Integer>();\\n            for(int i = 0; i < nums.length; i++){\\n                if(i > k) set.remove(nums[i-k-1]);\\n                if(!set.add(nums[i])) return true;\\n            }\\n            return false;\\n     }"
		},
		{
			"lc_ans_id":"61390",
			"view":"13363",
			"top":"1",
			"title":"C++ solution with unordered_set",
			"vote":"64",
			"content":"    class Solution {\\n    public:\\n        bool containsNearbyDuplicate(vector<int>& nums, int k)\\n        {\\n           unordered_set<int> s;\\n           \\n           if (k <= 0) return false;\\n           if (k >= nums.size()) k = nums.size() - 1;\\n           \\n           for (int i = 0; i < nums.size(); i++)\\n           {\\n               if (i > k) s.erase(nums[i - k - 1]);\\n               if (s.find(nums[i]) != s.end()) return true;\\n               s.insert(nums[i]);\\n           }\\n           \\n           return false;\\n        }\\n    };\\n\\nThe basic idea is to maintain a set s which contain unique values from nums[i  - k] to nums[i - 1],\\nif nums[i] is in set s then return true else update the set."
		},
		{
			"lc_ans_id":"61397",
			"view":"11917",
			"top":"2",
			"title":"Short AC JAVA solution",
			"vote":"59",
			"content":"    public boolean containsNearbyDuplicate(int[] nums, int k) {\\n        Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n        for (int i = 0; i < nums.length; i++) {\\n            if (map.containsKey(nums[i])) {\\n                if (i - map.get(nums[i]) <= k) return true;\\n            }\\n            map.put(nums[i], i);\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"61375",
			"view":"6858",
			"top":"3",
			"title":"Python concise solution with dictionary.",
			"vote":"40",
			"content":"        \\n    def containsNearbyDuplicate(self, nums, k):\\n        dic = {}\\n        for i, v in enumerate(nums):\\n            if v in dic and i - dic[v] <= k:\\n                return True\\n            dic[v] = i\\n        return False"
		},
		{
			"lc_ans_id":"61378",
			"view":"8103",
			"top":"4",
			"title":"C++ 6 line solution. simple code and easy understanding",
			"vote":"31",
			"content":"    bool containsNearbyDuplicate(vector<int>& nums, int k) {\\n        set<int> cand;\\n        for (int i = 0; i < nums.size(); i++) {\\n            if (i > k) cand.erase(nums[i-k-1]);\\n            if (!cand.insert(nums[i]).second) return true;\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"61599",
			"view":"3237",
			"top":"5",
			"title":"Share my easy-to-understand C++ code",
			"vote":"22",
			"content":"Well, the basic idea is fairly straightforward. We maintain a mapping `mp` from a value in `nums` to its position (index) `i`. Each time we meet an unseen value, we add it to the map (`mp[nums[i]] = i`). Otherwise, depending on whether the recorded index `mp[nums[i]]` and the current index `i` satisfy `i - mp[nums[i]] <= k` (node that the new index `i` is larger than the old index `mp[nums[i]]`), we return `true` or update the index (`mp[nums[i]] = i`). If all the elements have been visited and we have not returned `true`, we will return `false`.\\n\\n    class Solution { \\n    public:\\n        bool containsNearbyDuplicate(vector<int>& nums, int k) {\\n            unordered_map<int, int> mp; \\n            for (int i = 0; i < nums.size(); i++) {\\n                if (mp.find(nums[i]) != mp.end() && i - mp[nums[i]] <= k)\\n                    return true;\\n                mp[nums[i]] = i; \\n            }\\n            return false; \\n        }\\n    };"
		},
		{
			"lc_ans_id":"61516",
			"view":"1883",
			"top":"6",
			"title":"Short HashSet Solution",
			"vote":"21",
			"content":"    public boolean containsNearbyDuplicate(int[] nums, int k) {\\n        HashSet<Integer> hs=new HashSet<>();\\n        for(int i=0;i<nums.length;i++)\\n        {\\n            if(hs.add(nums[i])==false) return true;\\n            if(hs.size()==k+1) hs.remove(nums[i-k]);\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"61572",
			"view":"1453",
			"top":"7",
			"title":"Java solution using HashMap's put()",
			"vote":"17",
			"content":"    public class Solution {\\n    public boolean containsNearbyDuplicate(int[] nums, int k) {\\n        Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n\\t\\t\\n\\t\\tfor(int i = 0; i <  nums.length; i++) {\\n\\t\\t\\tInteger ord = map.put(nums[i], i);\\n\\t\\t\\tif(ord != null && i - ord <= k) {\\n\\t\\t\\t\\treturn true;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn false;\\n    }\\n}"
		},
		{
			"lc_ans_id":"61619",
			"view":"2248",
			"top":"8",
			"title":"Java solution using Set and sliding window",
			"vote":"16",
			"content":"My solution is simple. My set only contain the numbers in the window. slide the  window which is size k, if the new coming number cannot be add to set then return true. The time complexity is O(n), space complexity is O(k).\\n\\n    public class Solution {\\n    public boolean containsNearbyDuplicate(int[] nums, int k) {\\n        HashSet<Integer> set = new HashSet<Integer>();\\n        \\n        for(int i=0;i<nums.length && i<=k;i++){\\n            if(!set.add(nums[i])){\\n                return true;\\n            }\\n        }\\n        \\n        for(int i=k+1;i<nums.length;i++){\\n            set.remove(nums[i-k-1]);\\n            if(!set.add(nums[i])){\\n                return true;\\n            }\\n        }\\n        return false;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"61534",
			"view":"1571",
			"top":"9",
			"title":"My simple solution in Java using HashMap",
			"vote":"11",
			"content":"Iterate through array and use HashMap to save `number[i]` as a key and `i` as a value. If the map already contains `number[i]` - subtract `map.get(number[i])` from `i` and return true if result is less or equal to `k`.\\n\\n    public boolean containsNearbyDuplicate(int[] nums, int k) {\\n        Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n        for (int i = 0; i < nums.length; i++) {\\n            if (map.containsKey(nums[i]) && (i - map.get(nums[i])) <= k) {\\n                return true;\\n            }\\n            map.put(nums[i], i);\\n        }\\n        return false;\\n    }"
		}
	],
	"id":"219",
	"title":"Contains Duplicate II",
	"content":"<p>\r\nGiven an array of integers and an integer <i>k</i>, find out whether there are two distinct indices <i>i</i> and <i>j</i> in the array such that <b>nums[i] = nums[j]</b> and the <b>absolute</b> difference between <i>i</i> and <i>j</i> is at most <i>k</i>.\r\n</p>",
	"frequency":"532",
	"ac_num":"133565"
}