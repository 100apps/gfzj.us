{
	"difficulty":"1",
	"submit_num":"20854",
	"show_id":"720",
	"leetcode_id":"720",
	"answers":[
		{
			"lc_ans_id":"109114",
			"view":"2854",
			"top":"0",
			"title":"[Java/C++] Clean Code",
			"vote":"15",
			"content":"1. Sort the words alphabetically, therefore shorter words always comes before longer words;\\n2. Along the sorted list, populate the words that can be built;\\n3. Any prefix of a word must comes before that  word.\\n\\n**Java**\\n```\\nclass Solution {\\n    public String longestWord(String[] words) {\\n        Arrays.sort(words);\\n        Set<String> built = new HashSet<String>();\\n        String res = \"\";\\n        for (String w : words) {\\n            if (w.length() == 1 || built.contains(w.substring(0, w.length() - 1))) {\\n                res = w.length() > res.length() ? w : res;\\n                built.add(w);\\n            }\\n        }\\n        return res;\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    string longestWord(vector<string>& words) {\\n        sort(words.begin(), words.end());\\n        unordered_set<string> built;\\n        string res;\\n        for (string w : words) {\\n            if (w.size() == 1 || built.count(w.substr(0, w.size() - 1))) {\\n                res = w.size() > res.size() ? w : res;\\n                built.insert(w);\\n            }\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109140",
			"view":"1339",
			"top":"1",
			"title":"Simple short 7 lines python solution using sorting and set",
			"vote":"6",
			"content":"The idea is to first sort the words, and once sorted, add each word to the resultset, if the prefix of the word word[:-1] is there in the sortedset. \\n\\nBy commutative property, if the prefix is there in the resultset, then that implies all the prefixes of length 1, 2, 3 .. are also there in the resultset, due to sorted data.\\n\\nAlso maintaining a global res_word and updating it every time we add a word to the resultset, makes it easy to find the final result.\\n\\n```\\n    def longestWord(self, words):\\n        words, resword, res = sorted(words), '', set()\\n        for word in words:\\n            if len(word) == 1 or word[:-1] in res:\\n                res.add(word)\\n                resword = word if resword == '' else word if len(word) > len(resword) else resword\\n        return resword\\n```"
		},
		{
			"lc_ans_id":"109118",
			"view":"1154",
			"top":"2",
			"title":"Java solution with Trie",
			"vote":"5",
			"content":"```\\nclass Solution {\\n    class TrieNode{\\n        public char val;\\n        public TrieNode[] hash;\\n        public boolean isWord;\\n        public TrieNode(){\\n            this.val='\\\\u0000';\\n            this.hash=new TrieNode[26];\\n            this.isWord=false;\\n        }\\n        public TrieNode(char c){\\n            this.val=c;\\n            this.hash=new TrieNode[26];\\n            this.isWord=false;\\n        }\\n        public StringBuilder dfs(StringBuilder res){\\n             \\n            StringBuilder max=new StringBuilder();\\n            for(int i=0;i<26;i++){\\n                if(hash[i]!=null && hash[i].isWord){\\n                    StringBuilder temp=new StringBuilder();\\n                    temp.append(hash[i].val);\\n                    temp.append(hash[i].dfs(temp));\\n                    if(temp.length() > max.length())\\n                        max=temp;\\n                }\\n            }\\n            return max;\\n        }\\n        \\n    }\\n    public String longestWord(String[] words) {\\n        TrieNode root=new TrieNode();\\n        for(String word:words){\\n            TrieNode curr=root;\\n            for(int i=0;i<word.length();i++){\\n                if(curr.hash[word.charAt(i)-'a']==null){\\n                    TrieNode temp=new TrieNode(word.charAt(i));\\n                    curr.hash[word.charAt(i)-'a']=temp;\\n                }\\n                curr=curr.hash[word.charAt(i)-'a'];\\n                if(i==word.length()-1)\\n                    curr.isWord=true;                    \\n            }\\n        }\\n        StringBuilder res=new StringBuilder();\\n        res=root.dfs(res);\\n        \\n        return res.toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109143",
			"view":"460",
			"top":"3",
			"title":"1-liner",
			"vote":"3",
			"content":"I build triples `(missingPrefixes, negatedLength, word)` so I can just take the smallest such triple and extract its word. I add the empty string to the words so it's there already and beats any word with missing prefixes. And `accumulate` supports strings, giving me all non-empty prefixes (e.g., for \"test\" it produces \"t\", \"te\", \"tes\" and \"test\").\\n\\n    def longestWord(self, words):\\n        return min((set(itertools.accumulate(w)) - set(words), -len(w), w)\\n                   for w in words + [''])[2]\\n\\nDense version:\\n\\n    def longestWord(self, W):\\n        return min((set(itertools.accumulate(w))-set(W),-len(w),w)for w in W+[''])[2]"
		},
		{
			"lc_ans_id":"109150",
			"view":"403",
			"top":"4",
			"title":"Python Elegant and Extremely Easy to Understand",
			"vote":"2",
			"content":"Firstly sort the words to ensure that we iterate in a lexicographical fashion. Also, maintain a set of seen words to check whether there is a \"path\" to the current word we are iterating through. We can lengthen the path when we see that there is a previous word that meets the criteria. Lastly, in every iteration where there is a path lengthening, check to see if we can update the `longest_word`.\\n\\n*By Yangshun*\\n\\n```\\nclass Solution(object):\\n    def longestWord(self, words):\\n        words.sort()\\n        words_set, longest_word = set(['']), ''\\n        for word in words:\\n            if word[:-1] in words_set:\\n                words_set.add(word)\\n                if len(word) > len(longest_word):\\n                    longest_word = word\\n        return longest_word\\n```"
		},
		{
			"lc_ans_id":"109149",
			"view":"891",
			"top":"5",
			"title":"Easy to understand (using set) (C++) (with explanation).",
			"vote":"2",
			"content":"Pretty straightforward implementation:\\n\\n````\\nclass Solution {\\npublic:\\n    \\n//The comparator is used for sorting the set elements when they are inserted.\\n    struct myComp {\\n        bool operator()(auto& lhs, auto& rhs) const{\\n            if(lhs.size() > rhs.size())\\n                return true;\\n            if(lhs.size() == rhs.size())\\n                return lhs<rhs;\\n            return false;\\n        }\\n    };\\n    \\n    string longestWord(vector<string>& words) {\\n        if(words.empty())\\n            return \"\";\\n        \\n        //create a set such that the elements are ordered as per their decreasing lengths.  If the lengths are equal, then they are ordered lexicographically.  \\n        set<string, myComp> s(words.begin(), words.end());\\n        \\n        int i=1;\\n        for(auto& each : s) {\\n            for(i=1; i<each.size(); i++) {\\n                //Find the substring starting from the 0th character to `i`\\n                string str = each.substr(0, i);\\n                if(s.find(str)==s.end())\\n                    break;\\n            }\\n            if (i==each.size()) return each;\\n        }\\n        \\n        return \"\";\\n    }\\n};\\n````"
		},
		{
			"lc_ans_id":"109113",
			"view":"91",
			"top":"6",
			"title":"Java Solution with Trie + BFS",
			"vote":"1",
			"content":"The idea is simple. First, we construct a trie for the dictionary. Then we traverse the whole trie to get the longest word.\\nWe could choose DFS or BFS to achieve the trie traversal. Here, I leverage the property of BFS that it would get a layer of a tree from top to down at one time. Therefore, every time we get a new candidate word, we could replace the old one. Also, I scan the children of a trie node from last to first because we want the word with the smallest lexicographical order.\\n```\\nclass Solution {\\n    class TrieNode {\\n        TrieNode[] children;\\n        boolean isWord;\\n        String word;\\n        \\n        public TrieNode() {\\n            children = new TrieNode[26];\\n        }\\n    }\\n    \\n    class Trie {\\n        private TrieNode root;\\n        \\n        public Trie() {\\n            root = new TrieNode();\\n        }\\n        \\n        public void insert(String word) {\\n            TrieNode node = root;\\n            for (int i = 0; i < word.length(); i++) {\\n                int idx = word.charAt(i) - 'a';\\n                if (node.children[idx] == null) {\\n                    node.children[idx] = new TrieNode();\\n                }\\n                node = node.children[idx];\\n            }\\n            node.isWord = true;\\n            node.word = word;\\n        }\\n        \\n        public String findLongestWord() {\\n            String result = null;\\n            Queue<TrieNode> queue = new LinkedList<>();\\n            queue.offer(root);\\n            while (!queue.isEmpty()) {\\n                int size = queue.size();\\n                for (int i = 0; i < size; i++) {\\n                    TrieNode node = queue.poll();\\n                    for (int j = 25; j >= 0; j--) {\\n                        if (node.children[j] != null && node.children[j].isWord) {\\n                            result = node.children[j].word;\\n                            queue.offer(node.children[j]);\\n                        }\\n                    }\\n                }\\n            }\\n            return result;\\n        }\\n    }\\n    \\n    public String longestWord(String[] words) {\\n        Trie trie = new Trie();\\n        for (String word : words) {\\n            trie.insert(word);\\n        }\\n        \\n        return trie.findLongestWord();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109101",
			"view":"75",
			"top":"7",
			"title":"Python solution with detailed explanation",
			"vote":"1",
			"content":"**Longest Word in Dictionary** https://leetcode.com/problems/longest-word-in-dictionary/description/\\n\\n**Linear Time Solution - No Sorting**\\n* In a single pass, bucket the words into a dictionary with the key as the length and value as a list of indices where idx is the index into array words. In the same pass determine the range of the length of the words in the array.\\n* Now iterate the words in order of increasing length. Maintain a set called seen such that if words w[1...N] is in seen, then w[1...N-1], w[1...N-2], ....w[1] are words in the original array of words. This means that when we have a word w1 such that w1[:-1] is w[1...N], then w1 is a candidate solution.\\n* Once we identify a candidate solution, we simply update res, which is an internal variable for the optimial solution.\\n* Time is O(N) and Space is O(N).\\n```\\nfrom collections import defaultdict\\nclass Solution(object):\\n    def longestWord(self, words):\\n        \"\"\"\\n        :type words: List[str]\\n        :rtype: str\\n        \"\"\"\\n        seen, res = set(['']), \"\"\\n        buckets = defaultdict(list)\\n        min_len, max_len = float('inf'), float('-inf')\\n        for idx, w in enumerate(words):\\n            buckets[len(w)].append(idx)\\n            min_len, max_len = min(min_len, len(w)), max(max_len, len(w))\\n        for l in range(min_len, max_len+1):\\n            for idx in buckets[l]:\\n                w = words[idx]\\n                if w[:-1] in seen:\\n                    seen.add(w)\\n                    if len(w) > len(res) or (len(w) == len(res) and res > w):\\n                        res = w\\n        return res\\n```"
		},
		{
			"lc_ans_id":"109151",
			"view":"340",
			"top":"8",
			"title":"Java solution (easy to understand)",
			"vote":"1",
			"content":"```\\n    public String longestWord(String[] words) {\\n        Arrays.sort(words);\\n        Set<String> set = new HashSet<String>();\\n        String max = \"\";\\n        for (int i = 0; i < words.length; i++) {\\n            if (words[i].length() == 1 || set.contains(words[i].substring(0, words[i].length() - 1))) {\\n                set.add(words[i]);\\n                if (max.length() < words[i].length()) max = words[i];\\n            }\\n        }\\n        return max;\\n    }\\n```"
		},
		{
			"lc_ans_id":"109098",
			"view":"9",
			"top":"9",
			"title":"cout for final result gives correct value, but the function shows return value on testing as empty",
			"vote":"0",
			"content":"const int mx = 26;\\nclass Solution {\\nstruct TrieNode {\\n    char val;\\n    vector<TrieNode*> children;\\n    bool isEnd;\\n    TrieNode() {\\n        isEnd = false;\\n        children.clear();\\n        children.resize(26, nullptr);\\n    }\\n    TrieNode(char _val) {\\n        val = _val;\\n        isEnd = false;\\n        children.clear();\\n        children.resize(26, nullptr);\\n    }\\n};\\n\\n struct Trie {\\n    private:\\n        TrieNode *root;\\n        int getVal(const char ch) {\\n            return ch - 'a';\\n        }\\n    \\n        void update(string &res, string cur) {\\n            cout << cur << \" \" << res << endl;\\n            if (cur.size() > res.size()) {\\n                res = cur;\\n            } else if (res.size() == cur.size()) {\\n                res = min(res, cur);\\n            }\\n            return;\\n        }\\n        void search(TrieNode *node, string &cur, string &res) {\\n            if (!node || !node->isEnd) {\\n                         //   cout << cur << \" \" << res << endl;\\n\\n                if (cur.size() > res.size()) {\\n                    res = cur;\\n                } else if (res.size() == cur.size()) {\\n                    res = min(res, cur);\\n                }\\n               // if (cur != \"\") {\\n                    // update(res, cur);\\n               // }\\n                return;\\n            }\\n            cur.push_back(node->val);\\n            \\n            for (int i = 0; i < node->children.size(); i++) {\\n                search(node->children[i], cur, res);\\n            }\\n            cur.pop_back();\\n        }\\n    \\n    public:\\n        string result;\\n        Trie() {\\n            this->root = new TrieNode();\\n            this->root->isEnd = true;\\n        }\\n    \\n        void insert(const string &s) {\\n            TrieNode *node = root;\\n            for (int i = 0; i < s.size(); i++) {\\n                if (!node->children[s[i] - 'a']) {\\n                    node->children[s[i] - 'a'] = new TrieNode(s[i]);\\n                }\\n                node = node->children[s[i] - 'a'];\\n\\n            }\\n            \\n            node->isEnd = true;\\n            cout << endl;\\n        }\\n    \\n        string search() {\\n            static string res = \"\";\\n            string cur = \"\";\\n            if(!root)\\n            {\\n                cout << \"root null \\\\n\";\\n            }\\n            search(root, cur, res);\\n            cout << \"res is : \" << res << endl;\\n            result = res;\\n            return res;\\n        }\\n};\\n\\n\\npublic:\\n    string longestWord(vector<string>& words) {\\n        Trie *trie = new Trie();\\n        for (int i = 0; i < words.size(); i++) {\\n            trie->insert(words[i]);\\n        }\\n        cout << \"insert completed\" << endl;\\n        string ret = (trie->search());\\n        cout << ret << \" \" << trie->result << endl;\\n        return ret;\\n    }\\n};"
		}
	],
	"id":"686",
	"title":"Longest Word in Dictionary",
	"content":"<p>Given a list of strings <code>words</code> representing an English Dictionary, find the longest word in <code>words</code> that can be built one character at a time by other words in <code>words</code>.  If there is more than one possible answer, return the longest word with the smallest lexicographical order.</p>  If there is no answer, return the empty string.\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nwords = [\"w\",\"wo\",\"wor\",\"worl\", \"world\"]\r\n<b>Output:</b> \"world\"\r\n<b>Explanation:</b> \r\nThe word \"world\" can be built one character at a time by \"w\", \"wo\", \"wor\", and \"worl\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nwords = [\"a\", \"banana\", \"app\", \"appl\", \"ap\", \"apply\", \"apple\"]\r\n<b>Output:</b> \"apple\"\r\n<b>Explanation:</b> \r\nBoth \"apply\" and \"apple\" can be built from other words in the dictionary. However, \"apple\" is lexicographically smaller than \"apply\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>All the strings in the input will only contain lowercase letters.</li>\r\n<li>The length of <code>words</code> will be in the range <code>[1, 1000]</code>.</li>\r\n<li>The length of <code>words[i]</code> will be in the range <code>[1, 30]</code>.</li>\r\n</p>",
	"frequency":"146",
	"ac_num":"8725"
}