{
	"difficulty":"2",
	"submit_num":"16966",
	"show_id":"677",
	"leetcode_id":"677",
	"answers":[
		{
			"lc_ans_id":"107513",
			"view":"1628",
			"top":"0",
			"title":"Java solution, Trie",
			"vote":"9",
			"content":"```\\nclass MapSum {\\n    class TrieNode {\\n        Map<Character, TrieNode> children;\\n        boolean isWord;\\n        int value;\\n\\n        public TrieNode() {\\n            children = new HashMap<Character, TrieNode>();\\n            isWord = false;\\n            value = 0;\\n        }\\n    }\\n    \\n    TrieNode root;\\n    \\n    /** Initialize your data structure here. */\\n    public MapSum() {\\n        root = new TrieNode();\\n    }\\n    \\n    public void insert(String key, int val) {\\n        TrieNode curr = root;\\n        for (char c : key.toCharArray()) {\\n            TrieNode next = curr.children.get(c);\\n            if (next == null) {\\n                next = new TrieNode();\\n                curr.children.put(c, next);\\n            }\\n            curr = next;\\n        }\\n        curr.isWord = true;\\n        curr.value = val;\\n    }\\n    \\n    public int sum(String prefix) {\\n        TrieNode curr = root;\\n\\tfor (char c : prefix.toCharArray()) {\\n\\t    TrieNode next = curr.children.get(c);\\n\\t    if (next == null) {\\n\\t        return 0;\\n\\t    }\\n\\t    curr = next;\\n        }\\n\\t\\t\\n        return dfs(curr);\\n    }\\n    \\n    private int dfs(TrieNode root) {\\n        int sum = 0;\\n        for (char c : root.children.keySet()) {\\n            sum += dfs(root.children.get(c));\\n        }\\n        return sum + root.value;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107520",
			"view":"1531",
			"top":"1",
			"title":"C++, Easy solution, ordered map",
			"vote":"8",
			"content":"```\\nclass MapSum {\\npublic:\\n    /** Initialize your data structure here. */    \\n    void insert(string key, int val) {\\n        mp[key] = val;\\n    }\\n    \\n    int sum(string prefix) {\\n        int sum = 0, n = prefix.size();\\n        for (auto it = mp.lower_bound(prefix); it != mp.end() && it->first.substr(0, n) == prefix; it++) \\n            sum += it->second;\\n        return sum;\\n    }\\nprivate:\\n    map<string, int> mp;\\n};\\n```"
		},
		{
			"lc_ans_id":"107515",
			"view":"2598",
			"top":"2",
			"title":"Simple Java HashMap Solution - O(1) sum, and O(len(key)) insert",
			"vote":"8",
			"content":"***UPDATE : Okay, let me tell you that even though solution look so concise, why you should NOT do this. \\nIt's because of `s += c`. This operation is not O(1), it's O(String::length), which makes for loop to be k^2. And this will break when string is long. Try it yourself as learning with this input for insert - https://pastebin.com/Pjymymgh*** \\n\\nBut if the constraint is that the string are small, like dictionary words or people names, then it should be good.\\n\\nThe key idea is to keep two hash maps, one with just original strings. The other with all prefixes. \\n\\nWhen a duplicate insert is found, then update all it's prefixes with the difference of previous value of the same key(take it from original map)\\n\\nTime Complexity for sum is `O(1)`\\nTime Complexity for insert is ~~`O(len(key))`~~ `O(len(key) ^ 2)`\\n\\n\\n    /** Initialize your data structure here. */\\n    Map<String, Integer> map;\\n    Map<String, Integer> original;\\n    public MapSum() {\\n        map = new HashMap<>();\\n        original = new HashMap<>();\\n    }\\n\\n    public void insert(String key, int val) {\\n        val -= original.getOrDefault(key, 0); // calculate the diff to be added to prefixes\\n        String s = \"\";\\n        for(char c : key.toCharArray()) {\\n            s += c; // creating all prefixes\\n            map.put(s, map.getOrDefault(s, 0) + val); //update/insert all prefixes with new value\\n        }\\n        original.put(key, original.getOrDefault(key, 0) + val);\\n    }\\n\\n    public int sum(String prefix) {\\n        return map.getOrDefault(prefix, 0);\\n    }"
		},
		{
			"lc_ans_id":"107508",
			"view":"979",
			"top":"3",
			"title":"Python Efficient O(k) Insert and Sum using Trie",
			"vote":"3",
			"content":"A standard `Trie`-based solution where each node keeps track of the total count of its children. \\n\\nFor inserting, we first determine if the string already exists in the Trie. If it does, we calculate the difference in the previous and new value, and update the nodes with the difference as we traverse down the Trie nodes. \\n\\nSum is simple because each node already holds the sum of its children and we simply have to traverse to the node and obtain its count.\\n\\nThis results in both operations being O(k), where k is the length of the string/prefix.\\n\\n*- Yangshun*\\n\\n```\\nclass TrieNode():\\n    def __init__(self, count = 0):\\n        self.count = count\\n        self.children = {}\\n                \\nclass MapSum(object):\\n\\n    def __init__(self):\\n        \"\"\"\\n        Initialize your data structure here.\\n        \"\"\"\\n        self.root = TrieNode()\\n        self.keys = {}\\n\\n    def insert(self, key, val):\\n        \"\"\"\\n        :type key: str\\n        :type val: int\\n        :rtype: void\\n        \"\"\"\\n        # Time: O(k)\\n        curr = self.root\\n        delta = val - self.keys.get(key, 0)\\n        self.keys[key] = val\\n        \\n        curr = self.root\\n        curr.count += delta\\n        for char in key:\\n            if char not in curr.children:\\n                curr.children[char] = TrieNode()\\n            curr = curr.children[char]\\n            curr.count += delta\\n        \\n    def sum(self, prefix):\\n        \"\"\"\\n        :type prefix: str\\n        :rtype: int\\n        \"\"\"\\n        # Time: O(k)\\n        curr = self.root\\n        for char in prefix:\\n            if char not in curr.children:\\n                return 0\\n            curr = curr.children[char]\\n        return curr.count\\n```"
		},
		{
			"lc_ans_id":"107535",
			"view":"144",
			"top":"4",
			"title":"Java O(length(key))-insert/sum Trie solution with clear explanation",
			"vote":"2",
			"content":"The solution is based on the standard Trie and its insert and search methods, with changes for the fields of TrieNode. TrieNode is defined as TrieNode {int val; int sum; boolean isAWord; TrieNode[] children;}. \\n\\nTo insert a pair {key, val}, in addition to the standard insert method, we update the sum as sum+=val of all the nodes along the insertion path. Notice that if the key existed in the Trie, we call insert again with {key, -old_val} so as to update the sum of all the nodes along the path again.\\n\\nTo get the sum, we just apply standard search method but return the sum.\\n```\\nclass MapSum {\\n\\tprivate TrieNode root;\\n\\n\\t/** Initialize your data structure here. */\\n\\tpublic MapSum() {\\n\\t\\troot = new TrieNode(0);\\n\\t}\\n\\n\\tpublic void insert(String key, int val) {\\n\\t\\tTrieNode node = root;\\n\\t\\tint ci;\\n\\t\\tfor (int i = 0; i < key.length(); i++) {\\n\\t\\t\\tci = key.charAt(i) - 'a';\\n\\t\\t\\tif (node.children[ci] == null)\\n\\t\\t\\t\\tnode.children[ci] = new TrieNode(val);\\n\\t\\t\\telse // update node.sum along the path\\n\\t\\t\\t\\tnode.children[ci].sum += val;\\n\\t\\t\\tnode = node.children[ci];\\n\\t\\t}\\n\\t\\tif (node.isAWord) { // key existed\\n\\t\\t\\tnode.isAWord = false;\\n\\t\\t\\tinsert(key, -node.val);\\n\\t\\t\\t// for updating all pre nodes'sum along the path\\n\\t\\t}\\n\\t\\tnode.val = val;\\n\\t\\tnode.isAWord = true;\\n\\t}\\n\\n\\tpublic int sum(String prefix) {\\n\\t\\tTrieNode node = root;\\n\\t\\tfor (int i = 0; i < prefix.length(); i++) {\\n\\t\\t\\tnode = node.children[prefix.charAt(i) - 'a'];\\n\\t\\t\\tif (node == null)\\n\\t\\t\\t\\treturn 0;\\n\\t\\t}\\n\\t\\treturn node.sum;\\n\\t}\\n}\\n\\nclass TrieNode {\\n\\tpublic int val;\\n\\tpublic int sum;\\n\\tpublic boolean isAWord;\\n\\tpublic TrieNode[] children;\\n\\n\\tpublic TrieNode(int val) {\\n\\t\\tsum = this.val = val;\\n\\t\\tisAWord = false;\\n\\t\\tchildren = new TrieNode[26];\\n\\t}\\n}\\n```"
		},
		{
			"lc_ans_id":"107554",
			"view":"498",
			"top":"5",
			"title":"C++ O(1) 9 lines, Trie + Hash map",
			"vote":"2",
			"content":"Hash map is to locate existing values, and trie is store the prefixes sum. Technically, the runtime complexity is affected by the size of individual strings, but here we can say O(1) as the string size is limited to 100. \\n```\\nstruct trie { trie* ch[26] = {}; int sum = 0; } root;\\nunordered_map<string, int> pairs;\\nvoid insert(string key, int val) {\\n    auto p = &root;\\n    for (auto i = 0; i < key.size(); p->sum += val - pairs[key], ++i) \\n        p = p->ch[key[i] - 'a'] = p->ch[key[i]  - 'a'] == nullptr ? new trie() : p->ch[key[i] - 'a'];\\n    pairs[key] = val;\\n}\\nint sum(string prefix) {\\n    auto p = &root;\\n    for (auto i = 0; i < prefix.size() && p != nullptr; p = p->ch[prefix[i] - 'a'], ++i) ;\\n    return p == nullptr ? 0 : p->sum;\\n}\\n```"
		},
		{
			"lc_ans_id":"107553",
			"view":"495",
			"top":"6",
			"title":"Java-Map solution!",
			"vote":"2",
			"content":"```\\nclass MapSum {\\n    Map<String,Integer> map = new HashMap<>();\\n    /** Initialize your data structure here. */\\n    public MapSum() {\\n        \\n    }\\n    \\n    public void insert(String key, int val) {\\n           map.put(key,val);\\n    }\\n    \\n    public int sum(String prefix) {\\n        int sum = 0;\\n        for(String str:map.keySet()){\\n            if(str.startsWith(prefix)){\\n                sum+=map.get(str);\\n            }\\n        }\\n        \\n        return sum;\\n    }\\n}\\n\\n/**\\n * Your MapSum object will be instantiated and called as such:\\n * MapSum obj = new MapSum();\\n * obj.insert(key,val);\\n * int param_2 = obj.sum(prefix);\\n */\\n\\n```"
		},
		{
			"lc_ans_id":"107522",
			"view":"49",
			"top":"7",
			"title":"Python Solution",
			"vote":"1",
			"content":"```\\nclass MapSum(object):\\n    def __init__(self):\\n        \"\"\"\\n        Initialize your data structure here.\\n        \"\"\"\\n        self.dict = {}\\n\\n    def insert(self, key, val):\\n        \"\"\"\\n        :type key: str\\n        :type val: int\\n        :rtype: void\\n        \"\"\"\\n        self.dict[key] = val\\n\\n    def sum(self, prefix):\\n        \"\"\"\\n        :type prefix: str\\n        :rtype: int\\n        \"\"\"\\n        res = 0\\n        for key in self.dict:\\n            if key.startswith(prefix):\\n                res += self.dict[key]\\n            else :\\n                continue\\n        return res"
		},
		{
			"lc_ans_id":"107536",
			"view":"78",
			"top":"8",
			"title":"Please add one more test case",
			"vote":"1",
			"content":"I misunderstood the description but still got AC.\\nPlease add this test case:\\n[\"MapSum\", \"insert\", \"insert\", \"insert\", \"sum\"]\\n[[], [\"apple\",3], [\"ap\",4], [\"apple\",5], [\"ap\"]]\\n```\\n    Map<String, Integer> valueMap;\\n    Map<String, Integer> prefixMap;\\n    /** Initialize your data structure here. */\\n    public MapSum() {\\n        valueMap = new HashMap<>();\\n        prefixMap = new HashMap<>();\\n    }\\n    public void insert(String key, int val) {\\n        StringBuilder temp = new StringBuilder();\\n        for (int i = 0; i < key.length(); i++) {\\n            temp.append(key.charAt(i));\\n            prefixMap.put(temp.toString(), valueMap.containsKey(key)? val : \\n                                   prefixMap.getOrDefault(temp.toString(), 0) + val);\\n        }\\n        valueMap.put(key, val);\\n    }  \\n    public int sum(String prefix) {\\n        return prefixMap.getOrDefault(prefix, 0);\\n    }\\n```"
		},
		{
			"lc_ans_id":"107551",
			"view":"157",
			"top":"9",
			"title":"Python easy and concise 3 lines solution",
			"vote":"1",
			"content":"```\\nclass MapSum(object):\\n\\n    def __init__(self): \\n        self.d = {}\\n\\n    def insert(self, key, val): \\n        self.d[key] = val\\n\\n    def sum(self, prefix):\\n        return sum(self.d[i] for i in self.d if i.startswith(prefix))\\n````\\nEdited after Stefan's suggestion."
		}
	],
	"id":"654",
	"title":"Map Sum Pairs",
	"content":"<p>\r\nImplement a MapSum class with <code>insert</code>, and <code>sum</code> methods.\r\n</p>\r\n\r\n<p>\r\nFor the method <code>insert</code>, you'll be given a pair of (string, integer). The string represents the key and the integer represents the value. If the key already existed, then the original key-value pair will be overridden to the new one.\r\n</p>\r\n\r\n<p>\r\nFor the method <code>sum</code>, you'll be given a string representing the prefix, and you need to return the sum of all the pairs' value whose key starts with the prefix.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\nInput: insert(\"apple\", 3), Output: Null\r\nInput: sum(\"ap\"), Output: 3\r\nInput: insert(\"app\", 2), Output: Null\r\nInput: sum(\"ap\"), Output: 5\r\n</pre>\r\n</p>\r\n",
	"frequency":"90",
	"ac_num":"8853"
}