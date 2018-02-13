{
	"difficulty":"1",
	"submit_num":"417966",
	"show_id":"217",
	"leetcode_id":"217",
	"answers":[
		{
			"lc_ans_id":"60858",
			"view":"41804",
			"top":"0",
			"title":"Possible solutions.",
			"vote":"187",
			"content":"This problem seems trivial, so lets try different approaches to solve it:\\n\\nStarting from worst time complexity to the best one:\\n\\n----------\\n\\nTime complexity: O(N^2), memory: O(1)\\n\\nThe naive approach would be to run a iteration for each element and see whether a duplicate value can be found: this results in O(N^2) time complexity.\\n\\n----------\\n\\n    public boolean containsDuplicate(int[] nums) {\\n    \\n            for(int i = 0; i < nums.length; i++) {\\n                for(int j = i + 1; j < nums.length; j++) {\\n                    if(nums[i] == nums[j]) {\\n                        return true;\\n                    }\\n                }\\n            }\\n            return false;\\n        }\\n\\n----------\\n\\nTime complexity: O(N lg N), memory: O(1) - not counting the memory used by sort\\n\\nSince it is trivial task to find duplicates in sorted array, we can sort it as the first step of the algorithm and then search for consecutive duplicates.\\n\\n----------\\n\\n        public boolean containsDuplicate(int[] nums) {\\n    \\n            Arrays.sort(nums);\\n            for(int ind = 1; ind < nums.length; ind++) {\\n                if(nums[ind] == nums[ind - 1]) {\\n                    return true;\\n                }\\n            }\\n            return false;\\n        }\\n\\n----------\\n\\nTime complexity: O(N), memory: O(N)\\n\\nFinally we can used a well known data structure hash table that will help us to identify whether an element has been previously encountered in the array.\\n\\n----------\\n\\n    public boolean containsDuplicate(int[] nums) {\\n    \\n        final Set<Integer> distinct = new HashSet<Integer>();\\n        for(int num : nums) {\\n            if(distinct.contains(num)) {\\n                return true;\\n            }\\n            distinct.add(num);\\n        }\\n        return false;\\n    }\\n\\n----------\\n\\nThis is trivial but quite nice example of space-time tradeoff."
		},
		{
			"lc_ans_id":"60898",
			"view":"15364",
			"top":"1",
			"title":"Single line C++ solution 60ms",
			"vote":"133",
			"content":"Using anonymous set<>.<br>\\nNot the most efficient as many already pointed out... but if you like one-liners ;) <br>\\nakin to the solution possible with python. \\n\\n    #include <set>\\n    using namespace std;\\n    \\n    class Solution {\\n    public:\\n        bool containsDuplicate(vector<int>& nums) {\\n            return nums.size() > set<int>(nums.begin(), nums.end()).size();        \\n        }\\n    };"
		},
		{
			"lc_ans_id":"60861",
			"view":"16601",
			"top":"2",
			"title":"5 lines in Java",
			"vote":"50",
			"content":"The Set's add method can be used for this situation,because it will return false if the element already exists .   \\n\\n    public  boolean containsDuplicate(int[] nums) {\\n    \\t\\t Set<Integer> set = new HashSet<Integer>();\\n    \\t\\t for(int i : nums)\\n    \\t\\t\\t if(!set.add(i))// if there is same\\n    \\t\\t\\t\\t return true; \\n    \\t\\t return false;\\n    \\t }"
		},
		{
			"lc_ans_id":"60850",
			"view":"8187",
			"top":"3",
			"title":"One line solution in python",
			"vote":"48",
			"content":"    class Solution(object):\\n    def containsDuplicate(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: bool\\n        \"\"\"\\n        return len(nums) != len(set(nums))"
		},
		{
			"lc_ans_id":"60909",
			"view":"8836",
			"top":"4",
			"title":"C++ solution. simply one line.",
			"vote":"38",
			"content":"    class Solution {\\n      public:\\n        bool containsDuplicate(vector<int>& nums) {\\n            return set<int>(nums.begin(), nums.end()).size() < nums.size();\\n        }\\n    };"
		},
		{
			"lc_ans_id":"60866",
			"view":"3796",
			"top":"5",
			"title":"12ms C language solution with in-house HashSet",
			"vote":"26",
			"content":"    struct Node\\n    {\\n        int val;\\n        struct Node *next;\\n    };\\n    \\n    struct Set\\n    {\\n        int bucketSize;\\n        struct Node **table;\\n    };\\n    \\n    void initSet(struct Set *set, int bucketSize)\\n    {\\n        set->bucketSize = bucketSize;\\n        set->table = malloc(sizeof(struct Node*) * bucketSize);\\n        memset(set->table, 0, sizeof(struct Node*) * bucketSize);\\n    }\\n    \\n    bool addValue(struct Set *s, int val)\\n    {\\n        int idx = val > 0 ? val : -val;\\n        idx %= s->bucketSize;\\n        struct Node *ptr = s->table[idx];\\n        while(ptr != NULL)\\n        {\\n            if(ptr->val == val)\\n            {\\n                return false;\\n            }\\n        \\n            ptr = ptr->next;\\n        }\\n        ptr = malloc(sizeof(struct Node));\\n        ptr->val = val;\\n        ptr->next = s->table[idx];\\n        s->table[idx] = ptr;\\n        return true;\\n    }\\n    void releaseSet(struct Set *s)\\n    {\\n        struct Node *ptr, *tmp;\\n        for(int i = 0; i < s->bucketSize; ++i)\\n        {\\n            ptr = s->table[i];\\n            while(ptr != NULL)\\n            {\\n                tmp = ptr;\\n                ptr = ptr->next;\\n                free(tmp);\\n            }\\n        }\\n        free(s->table);\\n        s->table = NULL;\\n        s->bucketSize = 0;\\n    }\\n    bool containsDuplicate(int* nums, int numsSize) {\\n        if(numsSize < 2)\\n        {\\n            return false;\\n        }\\n        struct Set set;\\n        initSet(&set, numsSize / 2);\\n        for(int i = 0; i < numsSize; ++i)\\n        {\\n            if(!addValue(&set, nums[i]))\\n            {\\n                releaseSet(&set);\\n                return true;\\n            }\\n        }\\n        releaseSet(&set);\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"60937",
			"view":"5643",
			"top":"6",
			"title":"3ms Java Solution with Bit Manipulation",
			"vote":"22",
			"content":"if the range of element provided, we can use byte array as a marker.    \\n\\n\\n    public class Solution {\\n    public boolean containsDuplicate(int[] nums) {\\n        byte[] mark = new byte[150000];\\n        for (int i : nums) {\\n            int j = i/8;\\n            int k = i%8;\\n            int check = 1<<k;\\n            if ((mark[j] & check) != 0) {\\n                return true;\\n            }\\n            mark[j]|=check;\\n        }\\n        return false;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"61076",
			"view":"4726",
			"top":"7",
			"title":"In python this problem is a joke",
			"vote":"20",
			"content":"    class Solution:\\n        # @param {integer[]} nums\\n        # @return {boolean}\\n        def containsDuplicate(self, nums):\\n            return not (len(nums) == len(set(nums)))"
		},
		{
			"lc_ans_id":"61110",
			"view":"1926",
			"top":"8",
			"title":"C++ solutions (sorting, maps and sets).",
			"vote":"16",
			"content":"        \\n    bool containsDuplicate1(vector<int>& nums) {\\n        sort(nums.begin(), nums.end());\\n        for (int i=0; i<int(nums.size())-1; i++) {\\n            if (nums[i]==nums[i+1])\\n                return true;\\n        }\\n        return false;    \\n    }\\n    \\n    bool containsDuplicate2(vector<int>& nums) {\\n        map<int, bool> myMap;\\n        // unordered_map<int, bool> myMap;\\n        for (auto& num: nums) {\\n            if (myMap.find(num) != myMap.end())\\n                return true;\\n            else\\n                myMap[num] = true;\\n        }\\n        return false;\\n    }\\n    \\n    bool containsDuplicate3(vector<int>& nums) {\\n        multimap<int, bool> myMap;\\n        // unordered_multimap<int, bool> myMap;\\n        for (auto& num: nums) {\\n            if (myMap.find(num) != myMap.end())\\n                return true;\\n            myMap.insert(make_pair(num, true));\\n        }\\n        return false;\\n    }\\n    \\n    bool containsDuplicate4(vector<int>& nums) {\\n        set<int> mySet;\\n        // unordered_set<int> mySet;\\n        // multiset<int> mySet;\\n        // unordered_multiset<int> mySet;\\n        for (auto& num: nums) {\\n            if (mySet.find(num) != mySet.end())\\n                return true;\\n            mySet.insert(num);\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"60851",
			"view":"2297",
			"top":"9",
			"title":"Basic 48ms C++ solution with unordered_map",
			"vote":"16",
			"content":"    class Solution {\\n    public:\\n        bool containsDuplicate(vector<int>& nums) {\\n            if (nums.empty()) { return false; }\\n            unordered_map<int,int> mp;\\n            for (int i : nums) {\\n                if (++mp[i] > 1) {\\n                    return true;\\n                }\\n            }\\n            return false;\\n        }\\n    };"
		}
	],
	"id":"217",
	"title":"Contains Duplicate",
	"content":"<p>\r\nGiven an array of integers, find if the array contains any duplicates. Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.\r\n</p>",
	"frequency":"569",
	"ac_num":"195201"
}