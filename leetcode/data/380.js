{
	"difficulty":"2",
	"submit_num":"130114",
	"show_id":"380",
	"leetcode_id":"380",
	"answers":[
		{
			"lc_ans_id":"85401",
			"view":"45327",
			"top":"0",
			"title":"Java solution using a HashMap and an ArrayList along with a follow-up. (131 ms)",
			"vote":"204",
			"content":"I got a similar question for my phone interview. The difference is that the duplicated number is allowed. So, think that is a follow-up of this question.\\nHow do you modify your code to allow duplicated number?\\n \\n```\\npublic class RandomizedSet {\\n    ArrayList<Integer> nums;\\n    HashMap<Integer, Integer> locs;\\n    java.util.Random rand = new java.util.Random();\\n    /** Initialize your data structure here. */\\n    public RandomizedSet() {\\n        nums = new ArrayList<Integer>();\\n        locs = new HashMap<Integer, Integer>();\\n    }\\n    \\n    /** Inserts a value to the set. Returns true if the set did not already contain the specified element. */\\n    public boolean insert(int val) {\\n        boolean contain = locs.containsKey(val);\\n        if ( contain ) return false;\\n        locs.put( val, nums.size());\\n        nums.add(val);\\n        return true;\\n    }\\n    \\n    /** Removes a value from the set. Returns true if the set contained the specified element. */\\n    public boolean remove(int val) {\\n        boolean contain = locs.containsKey(val);\\n        if ( ! contain ) return false;\\n        int loc = locs.get(val);\\n        if (loc < nums.size() - 1 ) { // not the last one than swap the last one with this val\\n            int lastone = nums.get(nums.size() - 1 );\\n            nums.set( loc , lastone );\\n            locs.put(lastone, loc);\\n        }\\n        locs.remove(val);\\n        nums.remove(nums.size() - 1);\\n        return true;\\n    }\\n    \\n    /** Get a random element from the set. */\\n    public int getRandom() {\\n        return nums.get( rand.nextInt(nums.size()) );\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85397",
			"view":"8231",
			"top":"1",
			"title":"Simple solution in Python",
			"vote":"35",
			"content":"We just keep track of the index of the added elements, so when we remove them, we copy the last one into it.\\n\\nFrom Python docs (https://wiki.python.org/moin/TimeComplexity) we know that `list.append()` takes O(1), both average and amortized. Dictionary `get` and `set` functions take O(1) average, so we are OK.\\n\\n```\\nimport random\\n\\nclass RandomizedSet(object):\\n\\n    def __init__(self):\\n        self.nums, self.pos = [], {}\\n        \\n    def insert(self, val):\\n        if val not in self.pos:\\n            self.nums.append(val)\\n            self.pos[val] = len(self.nums) - 1\\n            return True\\n        return False\\n        \\n\\n    def remove(self, val):\\n        if val in self.pos:\\n            idx, last = self.pos[val], self.nums[-1]\\n            self.nums[idx], self.pos[last] = last, idx\\n            self.nums.pop(); self.pos.pop(val, 0)\\n            return True\\n        return False\\n            \\n    def getRandom(self):\\n        return self.nums[random.randint(0, len(self.nums) - 1)]\\n\\n# 15 / 15 test cases passed.\\n# Status: Accepted\\n# Runtime: 144 ms\\n```"
		},
		{
			"lc_ans_id":"85422",
			"view":"11032",
			"top":"2",
			"title":"AC C++ Solution. Unordered_map + Vector",
			"vote":"24",
			"content":"```\\nclass RandomizedSet {\\npublic:\\n    /** Initialize your data structure here. */\\n    RandomizedSet() {\\n        \\n    }\\n    \\n    /** Inserts a value to the set. Returns true if the set did not already contain the specified element. */\\n    bool insert(int val) {\\n        if (m.find(val) != m.end()) return false;\\n        nums.emplace_back(val);\\n        m[val] = nums.size() - 1;\\n        return true;\\n    }\\n    \\n    /** Removes a value from the set. Returns true if the set contained the specified element. */\\n    bool remove(int val) {\\n        if (m.find(val) == m.end()) return false;\\n        int last = nums.back();\\n        m[last] = m[val];\\n        nums[m[val]] = last;\\n        nums.pop_back();\\n        m.erase(val);\\n        return true;\\n    }\\n    \\n    /** Get a random element from the set. */\\n    int getRandom() {\\n        return nums[rand() % nums.size()];\\n    }\\nprivate:\\n    vector<int> nums;\\n    unordered_map<int, int> m;\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"85434",
			"view":"5753",
			"top":"3",
			"title":"Java solution with two HashMaps: easy to understand",
			"vote":"9",
			"content":"If we assume the operation of HashMap is O(1), then we have the following solution.\\n\\n```\\nimport java.util.Random;\\n\\npublic class RandomizedSet {\\n    \\n    private HashMap<Integer, Integer> keyMap = null;\\n    private HashMap<Integer, Integer> valueMap = null;\\n    int count;\\n\\n    /** Initialize your data structure here. */\\n    public RandomizedSet() {\\n        keyMap = new HashMap<Integer, Integer>();\\n        valueMap = new HashMap<Integer, Integer>();\\n    }\\n    \\n    /** Inserts a value to the set. Returns true if the set did not already contain the specified element. */\\n    public boolean insert(int val) {\\n        if(keyMap.containsKey(val)) {\\n            return false;\\n        } else {\\n            keyMap.put(val, count);\\n            valueMap.put(count, val);\\n            count = keyMap.size();\\n            return true;\\n        }\\n    }\\n    \\n    /** Removes a value from the set. Returns true if the set contained the specified element. */\\n    public boolean remove(int val) {\\n        if(!keyMap.containsKey(val)) {\\n            return false;\\n        } else {\\n            int valueKey = keyMap.get(val);\\n            keyMap.remove(val);\\n            if(valueKey != valueMap.size() - 1) {\\n                valueMap.put(valueKey, valueMap.get(valueMap.size() - 1));\\n                keyMap.put(valueMap.get(valueMap.size() - 1), valueKey);\\n                valueMap.remove(valueMap.size() - 1);\\n            } else {\\n                valueMap.remove(valueKey);\\n            }\\n            count = keyMap.size();\\n            return true;\\n        }\\n    }\\n    \\n    /** Get a random element from the set. */\\n    public int getRandom() {\\n        Random random = new Random();\\n        int n = random.nextInt(keyMap.size());\\n        return valueMap.get(n);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85459",
			"view":"2023",
			"top":"4",
			"title":"JAVA Solution, concise code with HashMap and ArrayList, easy to understand",
			"vote":"8",
			"content":"```\\npublic class RandomizedSet {\\n    HashMap<Integer, Integer> map;\\n    ArrayList<Integer> list;\\n    \\n    /** Initialize your data structure here. */\\n    public RandomizedSet() {\\n        map = new HashMap<Integer, Integer>();\\n        list = new ArrayList<Integer>();\\n    }\\n    \\n    /** Inserts a value to the set. Returns true if the set did not already contain the specified element. */\\n    public boolean insert(int val) {\\n        if(map.containsKey(val)) {\\n            return false;\\n        }else {\\n            map.put(val, list.size());\\n            list.add(val);\\n            return true;\\n        }\\n    }\\n    \\n    /** Removes a value from the set. Returns true if the set contained the specified element. */\\n    public boolean remove(int val) {\\n        if(!map.containsKey(val)) {\\n            return false;\\n        }else {\\n            int key = map.get(val);\\n            int lastElement = list.get(list.size() - 1);\\n            map.put(lastElement, key);\\n            list.set(key, lastElement);\\n            map.remove(val);\\n            list.remove(list.size() - 1);\\n            return true;\\n        }\\n    }\\n    \\n    /** Get a random element from the set. */\\n    public int getRandom() {\\n        Random random = new Random();\\n        return list.get( random.nextInt(list.size()) );\\n    }\\n}\\n\\n/**\\n * Your RandomizedSet object will be instantiated and called as such:\\n * RandomizedSet obj = new RandomizedSet();\\n * boolean param_1 = obj.insert(val);\\n * boolean param_2 = obj.remove(val);\\n * int param_3 = obj.getRandom();\\n */\\n```"
		},
		{
			"lc_ans_id":"85411",
			"view":"9327",
			"top":"5",
			"title":"Are hash tables ok here? They're not really O(1), are they?",
			"vote":"8",
			"content":"I predict that many of us will think of using a hash table, but I'm not aware of any that really offer the needed operations in O(1). Are there any?\\n\\nWe do usually think of them as O(1), and I think that's ok because in practice they do average/amortize O(1) and everybody knows what is meant (right?) and they're usually just a small building block in the actual algorithm. Would be pretty annoying if we had to always asterisk the complexity discussion of every algorithm that uses hash tables. But here, the set data structure isn't just a helping part in the actual thing we're building. It ***is*** the actual thing. And we're explicitly required to achieve O(1), it's even the problem title. So I think we shouldn't be sloppy here.\\n\\n**Update:** The problem has been updated to say \"average\"."
		},
		{
			"lc_ans_id":"85414",
			"view":"1003",
			"top":"6",
			"title":"2 Python implementations using dictionary and list (Syned and Asyned), with explanation",
			"vote":"5",
			"content":"Quite a number of people have posted their C++ code based on the same idea, which is:\\n1. A plain list does most of the job. It makes sure ```insert``` and ```getRandom``` is O(1).\\n2. The dictionary comes in handy when you need to make ```remove``` O(1). The dictionary maps the values to their indices in the list, so when you want to quickly remove something from the list, you always know where to start.\\n\\nSo, here come 2 flavors:\\n\\n**Synced version**, in which the list and dictionary are always having the same size.\\nNo actual swapping is needed for ```remove``` because the last element of the list is always going to be popped out, anyway. Don't bother to write to the last slot.\\n```\\nimport random\\nclass RandomizedSet(object):\\n    def __init__(self):\\n        self.l = []\\n        self.d = {}\\n\\n    def insert(self, val):\\n        if val in self.d:\\n            return False\\n        self.d[val] = len(self.l)\\n        self.l.append(val)\\n        return True        \\n\\n    def remove(self, val):\\n        if val not in self.d:\\n            return False\\n        i, newVal = self.d[val], self.l[-1]\\n        self.l[i], self.d[newVal] = newVal, i\\n        del self.d[val]\\n        self.l.pop()\\n        return True\\n\\n    def getRandom(self):\\n        return random.choice(self.l)\\n```\\n\\n**Asynced version**, in which I use the dict to keep track of the array size so I can avoid shrinking the list.\\n```\\nimport random\\nclass RandomizedSet(object):\\n\\n    def __init__(self):\\n        self.l = []\\n        self.d = {}\\n\\n    def insert(self, val):\\n        if val in self.d:\\n            return False\\n        i = len(self.d)\\n        self.d[val] = i\\n        if i < len(self.l):\\n            self.l[i] = val\\n        else:\\n            self.l.append(val)\\n        return True        \\n\\n    def remove(self, val):\\n        if val not in self.d:\\n            return False\\n        i, newVal = self.d[val], self.l[len(self.d)-1]\\n        self.l[i], self.d[newVal] = newVal, i\\n        del self.d[val]\\n        return True\\n\\n    def getRandom(self):\\n        return self.l[random.randrange(len(self.d))]\\n```\\n\\nThe first implementation is shorter and cleaner, but i may prefer the second one in real life because it has less memory expansion and shrinking."
		},
		{
			"lc_ans_id":"85485",
			"view":"1584",
			"top":"7",
			"title":"Java with HashTable + ArrayList",
			"vote":"4",
			"content":"The idea is pretty straightforward. Have a HashMap so we now where are our values are in the list. Use the list to get a random number. During remove be careful how to update the map and the list itself.\\n\\n```java\\npublic class RandomizedSet {\\n\\n    Map<Integer, Integer> map = new HashMap<>();\\n    List<Integer> list = new ArrayList<>();\\n    Random rnd = new Random();\\n\\n    public boolean insert(int val) {\\n        if(map.containsKey(val)) {\\n            return false;\\n        }\\n        \\n        map.put(val, list.size());\\n        list.add(val);\\n        return true;\\n    }\\n    \\n    public boolean remove(int val) {\\n        if(!map.containsKey(val)) {\\n            return false;\\n        }\\n        \\n        int idx = map.remove(val);\\n        int last = list.remove(list.size() - 1);\\n        if(val != last) {\\n            list.set(idx, last);\\n            map.put(last, idx);\\n        }\\n        return true;\\n    }\\n    \\n    public int getRandom() {\\n        return list.get(rnd.nextInt(list.size()));\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85495",
			"view":"2483",
			"top":"8",
			"title":"How is this tested?",
			"vote":"3",
			"content":"This OJ problem is intrinsically different from all others, as randomness is involved here.\\n\\nLet's say someone comes up with an answer where getRandom always returns the smallest val (or maybe first val in some array or hash set). Then, how can the test cases tell that this solution is wrong?\\n\\nEven when some random choice algorithm is used, how can it be tested that all values are equally likely to be chosen, and different calls of getRandom are independent?"
		},
		{
			"lc_ans_id":"85410",
			"view":"186",
			"top":"9",
			"title":"Logic behind using a hashmap and an arraylist.",
			"vote":"2",
			"content":"If we just use a hashset (unordered_set), then we can implement both `insert()` and `remove()` in O(1) time, by using the `insert()` and `erase()` methods.  [Refer [this](https://stackoverflow.com/questions/222658/multiset-map-and-hash-map-complexity) link for more details).  \\n\\nThe only challenge is with implementing `getRandom()` in `O(1)`.  Something naive like just `rand()` cannot be used on a hashset, so we need to use the `std::advance()` method which would inturn result in this being an `O(n)` method.  \\n\\nThus, in order to implement `getRandom()` as well in O(1), we need to use a different method (of using a hashMap and arraylist) than just using a hashset.\\n\\nPlease let me know if you find something incorrect in this post.\\n\\nThanks,\\nBatCoder."
		}
	],
	"id":"380",
	"title":"Insert Delete GetRandom O(1)",
	"content":"<p>Design a data structure that supports all following operations in <i>average</i> <b>O(1)</b> time.</p>\r\n\r\n<p>\r\n<ol>\r\n<li><code>insert(val)</code>: Inserts an item val to the set if not already present.</li>\r\n<li><code>remove(val)</code>: Removes an item val from the set if present.</li>\r\n<li><code>getRandom</code>: Returns a random element from current set of elements. Each element must have the <b>same probability</b> of being returned.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n// Init an empty set.\r\nRandomizedSet randomSet = new RandomizedSet();\r\n\r\n// Inserts 1 to the set. Returns true as 1 was inserted successfully.\r\nrandomSet.insert(1);\r\n\r\n// Returns false as 2 does not exist in the set.\r\nrandomSet.remove(2);\r\n\r\n// Inserts 2 to the set, returns true. Set now contains [1,2].\r\nrandomSet.insert(2);\r\n\r\n// getRandom should return either 1 or 2 randomly.\r\nrandomSet.getRandom();\r\n\r\n// Removes 1 from the set, returns true. Set now contains [2].\r\nrandomSet.remove(1);\r\n\r\n// 2 was already in the set, so return false.\r\nrandomSet.insert(2);\r\n\r\n// Since 2 is the only number in the set, getRandom always return 2.\r\nrandomSet.getRandom();\r\n</pre>\r\n</p>",
	"frequency":"323",
	"ac_num":"51783"
}