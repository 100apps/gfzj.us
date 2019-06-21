{
	"difficulty":"2",
	"submit_num":"282000",
	"show_id":"211",
	"leetcode_id":"211",
	"answers":[
		{
			"lc_ans_id":"59554",
			"view":"20888",
			"top":"0",
			"title":"My simple and clean Java code",
			"vote":"58",
			"content":"Using backtrack to check each character of word to search.\\n\\n    public class WordDictionary {\\n        public class TrieNode {\\n            public TrieNode[] children = new TrieNode[26];\\n            public String item = \"\";\\n        }\\n        \\n        private TrieNode root = new TrieNode();\\n    \\n        public void addWord(String word) {\\n            TrieNode node = root;\\n            for (char c : word.toCharArray()) {\\n                if (node.children[c - 'a'] == null) {\\n                    node.children[c - 'a'] = new TrieNode();\\n                }\\n                node = node.children[c - 'a'];\\n            }\\n            node.item = word;\\n        }\\n    \\n        public boolean search(String word) {\\n            return match(word.toCharArray(), 0, root);\\n        }\\n        \\n        private boolean match(char[] chs, int k, TrieNode node) {\\n            if (k == chs.length) return !node.item.equals(\"\");   \\n            if (chs[k] != '.') {\\n                return node.children[chs[k] - 'a'] != null && match(chs, k + 1, node.children[chs[k] - 'a']);\\n            } else {\\n                for (int i = 0; i < node.children.length; i++) {\\n                    if (node.children[i] != null) {\\n                        if (match(chs, k + 1, node.children[i])) {\\n                            return true;\\n                        }\\n                    }\\n                }\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"59552",
			"view":"15529",
			"top":"1",
			"title":"80ms Clear C++ Code with Detailed Explanations",
			"vote":"52",
			"content":"This problem is an application of the Trie data structure. In the following, it is assumed that you have solved [Implement Trie (Prefix Tree)][1].\\n\\nNow, let's first look at the `TrieNode` class. I define it as follows.\\n\\n    class TrieNode {\\n    public:\\n        bool isKey;\\n        TrieNode* children[26];\\n        TrieNode(): isKey(false) {\\n            memset(children, NULL, sizeof(TrieNode*) * 26); \\n        }\\n    };\\n \\nThe field `isKey` is to label whether the string comprised of characters starting from `root` to the current node is a key (word that has been added). In this problem, only lower-case letters `a - z` need to be considered, so each `TrieNode` has at most `26` children. I store it in an array of `TrieNode*`: `children[i]` corresponds to letter `'a' + i`. The remaining code defines the constructor of the `TrieNode` class. \\n\\nAdding a word can be done in the same way as in [Implement Trie (Prefix Tree)][2]. The basic idea is to create a `TrieNode` corresponding to each letter in the word. When we are done, label the last node to be a key (set `isKey = true`). The code is as follows. \\n\\n    void addWord(string word) {\\n        TrieNode* run = root;\\n        for (char c : word) {\\n            if (!(run -> children[c - 'a']))\\n                run -> children[c - 'a'] = new TrieNode();\\n            run = run -> children[c - 'a']; \\n        }\\n        run -> isKey = true;\\n    }\\n\\nBy the way, `root` is defined as private data of `WordDictionary`:\\n\\n    private:\\n        TrieNode* root;\\n\\nAnd the `WordDictionary` class has a constructor to initialize `root`:\\n\\n    WordDictionary() {\\n        root = new TrieNode();\\n    }\\n\\nNow we are left only with `search`. Let's do it. The basic idea is still the same as typical search operations in a Trie. The critical part is how to deal with the dots `.`. Well, my solution is very naive in this place. Each time when we reach a `.`, just traverse all the children of the current node and recursively search the remaining substring in `word` starting from that children. So I define a helper function `query` for `search` that takes in a string and a starting node. And the initial call to `query` is like `query(word, root)`. \\n\\nBy the way, I pass a `char*` instead of `string` to `query` and it greatly speeds up the code. So the initial call to `query` is actually `query(word.c_str(), root)`.\\n\\nNow I put all the codes together below. Hope it to be useful! \\n\\n    class TrieNode {\\n    public:\\n        bool isKey;\\n        TrieNode* children[26];\\n        TrieNode(): isKey(false) {\\n            memset(children, NULL, sizeof(TrieNode*) * 26);\\n        }\\n    };\\n    \\n    class WordDictionary {\\n    public:\\n        WordDictionary() {\\n            root = new TrieNode();\\n        }\\n    \\n        // Adds a word into the data structure.\\n        void addWord(string word) {\\n            TrieNode* run = root;\\n            for (char c : word) {\\n                if (!(run -> children[c - 'a'])) \\n                    run -> children[c - 'a'] = new TrieNode();\\n                run = run -> children[c - 'a'];\\n            }\\n            run -> isKey = true;\\n        }\\n    \\n        // Returns if the word is in the data structure. A word could\\n        // contain the dot character '.' to represent any one letter.\\n        bool search(string word) {\\n            return query(word.c_str(), root);\\n        }\\n    \\n    private:\\n        TrieNode* root;\\n    \\n        bool query(const char* word, TrieNode* node) {\\n            TrieNode* run = node;\\n            for (int i = 0; word[i]; i++) {\\n                if (run && word[i] != '.')\\n                    run = run -> children[word[i] - 'a'];\\n                else if (run && word[i] == '.') { \\n                    TrieNode* tmp = run;\\n                    for (int j = 0; j < 26; j++) {\\n                        run = tmp -> children[j];\\n                        if (query(word + i + 1, run))\\n                            return true;\\n                    }\\n                }\\n                else break;\\n            }\\n            return run && run -> isKey; \\n        }\\n    };\\n    \\n    // Your WordDictionary object will be instantiated and called as such:\\n    // WordDictionary wordDictionary;\\n    // wordDictionary.addWord(\"word\");\\n    // wordDictionary.search(\"pattern\");  \\n\\n  [1]: https://leetcode.com/problems/implement-trie-prefix-tree/\\n  [2]: https://leetcode.com/problems/implement-trie-prefix-tree/"
		},
		{
			"lc_ans_id":"59549",
			"view":"5811",
			"top":"2",
			"title":"Python 168ms-beat-100% solution",
			"vote":"25",
			"content":"    class WordDictionary(object):\\n        def __init__(self):\\n            self.word_dict = collections.defaultdict(list)\\n            \\n    \\n        def addWord(self, word):\\n            if word:\\n                self.word_dict[len(word)].append(word)\\n    \\n        def search(self, word):\\n            if not word:\\n                return False\\n            if '.' not in word:\\n                return word in self.word_dict[len(word)]\\n            for v in self.word_dict[len(word)]:\\n                # match xx.xx.x with yyyyyyy\\n                for i, ch in enumerate(word):\\n                    if ch != v[i] and ch != '.':\\n                        break\\n                else:\\n                    return True\\n            return False\\n\\nThe search function could be done in a more pythonic way, but I see that performance has suffered so I just wrote the raw logic by myself."
		},
		{
			"lc_ans_id":"59576",
			"view":"6771",
			"top":"3",
			"title":"Tree solutions, 18-20 lines",
			"vote":"23",
			"content":"    class WordDictionary:\\n    \\n        def __init__(self):\\n            self.root = {}\\n        \\n        def addWord(self, word):\\n            node = self.root\\n            for char in word:\\n                node = node.setdefault(char, {})\\n            node[None] = None\\n    \\n        def search(self, word):\\n            def find(word, node):\\n                if not word:\\n                    return None in node\\n                char, word = word[0], word[1:]\\n                if char != '.':\\n                    return char in node and find(word, node[char])\\n                return any(find(word, kid) for kid in node.values() if kid)\\n            return find(word, self.root)\\n\\nAn iterative alternative for the `search` method:\\n\\n        def search(self, word):\\n            nodes = [self.root]\\n            for char in word:\\n                nodes = [kid\\n                         for node in nodes\\n                         for key, kid in node.items()\\n                         if char in (key, '.') and kid]\\n            return any(None in node for node in nodes)\\n\\nAnd one that's a bit longer but faster:\\n\\n        def search(self, word):\\n            nodes = [self.root]\\n            for char in word:\\n                nodes = [kid for node in nodes for kid in\\n                         ([node[char]] if char in node else\\n                          filter(None, node.values()) if char == '.' else [])]\\n            return any(None in node for node in nodes)\\n\\nAnd a neat version where I append my end-marker to the word to simplify the final check:\\n\\n    class WordDictionary:\\n    \\n        def __init__(self):\\n            self.root = {}\\n        \\n        def addWord(self, word):\\n            node = self.root\\n            for char in word:\\n                node = node.setdefault(char, {})\\n            node['$'] = None\\n    \\n        def search(self, word):\\n            nodes = [self.root]\\n            for char in word + '$':\\n                nodes = [kid for node in nodes for kid in\\n                         ([node[char]] if char in node else\\n                          filter(None, node.values()) if char == '.' else [])]\\n            return bool(nodes)"
		},
		{
			"lc_ans_id":"59633",
			"view":"11488",
			"top":"4",
			"title":"My JAVA Trie based solution",
			"vote":"23",
			"content":"    public class WordDictionary {\\n        WordNode root = new WordNode();\\n    \\tpublic void addWord(String word) {\\n    \\t\\tchar chars[] = word.toCharArray();\\n            addWord(chars, 0, root);\\n        }\\n    \\t\\n    \\tprivate void addWord(char[] chars, int index, WordNode parent) {\\n    \\t\\tchar c = chars[index];\\n    \\t\\tint idx = c-'a';\\n            WordNode node = parent.children[idx];\\n            if (node == null){\\n            \\tnode = new WordNode();\\n            \\tparent.children[idx]=node;\\n            }\\n            if (chars.length == index+1){\\n            \\tnode.isLeaf=true;\\n            \\treturn;\\n            }\\n            addWord(chars, ++index, node);\\n        }\\n    \\n    \\n        public boolean search(String word) {\\n        \\treturn search(word.toCharArray(), 0, root);\\t\\t\\t\\t     \\n        }\\n        \\n        private boolean search(char[] chars, int index, WordNode parent){\\n        \\tif (index == chars.length){\\n        \\t\\tif (parent.isLeaf){\\n        \\t\\t\\treturn true;\\n        \\t\\t}\\n        \\t\\treturn false;\\n        \\t}\\n        \\tWordNode[] childNodes = parent.children;\\n        \\tchar c = chars[index];\\n        \\tif (c == '.'){\\n    \\t    \\tfor (int i=0;i<childNodes.length;i++){\\n    \\t    \\t\\tWordNode n = childNodes[i];\\n    \\t    \\t\\tif (n !=null){\\n    \\t    \\t\\t\\tboolean b = search(chars, index+1, n);\\n    \\t    \\t\\t\\tif (b){\\n    \\t    \\t\\t\\t\\treturn true;\\n    \\t    \\t\\t\\t}\\n    \\t    \\t\\t}\\n    \\t    \\t}\\n    \\t    \\treturn false;\\n        \\t}\\n        \\tWordNode node = childNodes[c-'a'];\\n        \\tif (node == null){\\n        \\t\\treturn false;\\n        \\t}\\n        \\treturn search(chars, ++index, node);\\n        }\\n        \\n    \\n        \\n        private class WordNode{\\n        \\tboolean isLeaf;\\n        \\tWordNode[] children = new WordNode[26];\\n        }\\n    }"
		},
		{
			"lc_ans_id":"59669",
			"view":"3139",
			"top":"5",
			"title":"Java Solution, easy understand",
			"vote":"17",
			"content":"    public class WordDictionary {\\n        \\n        Map<Integer, List<String>> map = new HashMap<Integer, List<String>>();\\n        // Adds a word into the data structure.\\n        public void addWord(String word) {\\n            int index = word.length();\\n            if(!map.containsKey(index)){\\n                List<String> list = new ArrayList<String>();\\n                list.add(word);\\n                map.put(index, list);\\n            }else{\\n                map.get(index).add(word);\\n            }\\n            \\n        }\\n    \\n        // Returns if the word is in the data structure. A word could\\n        // contain the dot character '.' to represent any one letter.\\n        public boolean search(String word) {\\n            int index = word.length();\\n            if(!map.containsKey(index)){\\n                return false;\\n            }\\n            List<String> list = map.get(index);\\n            if(isWords(word)){\\n                return list.contains(word);\\n            }\\n            for(String s : list){\\n                if(isSame(s, word)){\\n                    return true;\\n                }\\n            }\\n            return false;\\n        }\\n        \\n        boolean isWords(String s){\\n            for(int i = 0; i < s.length(); i++){\\n                if(!Character.isLetter(s.charAt(i))){\\n                    return false;\\n                }\\n            }\\n            return true;\\n        }\\n        \\n        boolean isSame(String a, String search){\\n            if(a.length() != search.length()){\\n                return false;\\n            }\\n            for(int i = 0; i < a.length(); i++){\\n                if(search.charAt(i) != '.' && search.charAt(i) != a.charAt(i)){\\n                    return false;\\n                }\\n            }\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"59687",
			"view":"1334",
			"top":"6",
			"title":"Trie Tree java solution! very easy to understand!",
			"vote":"14",
			"content":"This solution uses Trier tree and DFS to search '.' case.\\n\\n    1, first build the standard trier tree root.\\n    2, add the word into the tree.\\n    3, basic search for normal character 'a'-'z' and DFS for the '.'\\n\\nHere is the solution, it is fast that beat 80%-90% solutions.\\n\\n    public class WordDictionary {\\n    \\n        // Adds a word into the data structure.\\n        Trier root = new Trier();\\n        public void addWord(String word) {\\n            Trier pointer = root;\\n            for(int i = 0; i < word.length(); i++) {\\n                char c = word.charAt(i);\\n                if (pointer.children[c-'a'] == null) {\\n                    pointer.children[c-'a'] = new Trier();\\n                    pointer = pointer.children[c-'a'];\\n                } else {\\n                    pointer = pointer.children[c-'a'];\\n                }\\n            }\\n            pointer.flag = true;\\n        }\\n    \\n        // Returns if the word is in the data structure. A word could\\n        // contain the dot character '.' to represent any one letter.\\n        public boolean search(String word) {\\n            Trier pointer = root;\\n            return helper(word,0,pointer);\\n        }\\n        private boolean helper(String word, int start, Trier cur) {\\n            if (start == word.length()) {\\n                if (cur.flag) {\\n                    return true;\\n                } else {\\n                    return false;\\n                }\\n            }\\n            char c = word.charAt(start);\\n            if (c == '.') {\\n                for (int i = 0; i < 26; i++) {\\n                    if (cur.children[i] != null) {\\n                        if (helper(word,start+1,cur.children[i])) {\\n                            return true;\\n                        }\\n                    }\\n                }\\n            } else {\\n                if (cur.children[c-'a'] == null) {\\n                    return false;\\n                } else {\\n                    return helper(word,start+1,cur.children[c-'a']);\\n                }\\n            }\\n            return false;\\n        }\\n        class Trier {\\n            Trier[] children;\\n            char c;\\n            boolean flag;\\n            public Trier() {\\n                children = new Trier[26];\\n                flag = false;\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"59720",
			"view":"929",
			"top":"7",
			"title":"Python solution recursive version (DFS)",
			"vote":"12",
			"content":"\\nclass TrieNode(object):\\n\\n    def __init__(self):\\n        self.word = False\\n        self.children = {}\\n\\nclass WordDictionary(object):\\n\\n    def __init__(self):\\n        self.root = TrieNode()\\n\\n    def addWord(self, word):\\n        node = self.root\\n        for c in word:\\n            if c not in node.children:\\n                node.children[c] = TrieNode()\\n            node = node.children[c]\\n        node.word = True\\n\\n    def search(self, word):\\n        return self.searchFrom(self.root, word)\\n\\n    def searchFrom(self, node, word):\\n        for i in xrange(len(word)):\\n            c = word[i]\\n            if c == '.':\\n                for k in node.children:\\n                    if self.searchFrom(node.children[k], word[i+1:]):\\n                        return True\\n                return False\\n            elif c not in node.children:\\n                return False\\n            node = node.children[c]\\n        return node.word"
		},
		{
			"lc_ans_id":"59694",
			"view":"2320",
			"top":"8",
			"title":"C++ using Trie and DFS for search. easy understand solution",
			"vote":"11",
			"content":"     struct Trie {\\n         vector<Trie *> child;\\n         bool isWord;\\n         Trie() : isWord(false), child(vector<Trie *>(26, nullptr)) {}\\n     };\\n     Trie *root;\\n     WordDictionary() : root(new Trie()) {}\\n\\n    void addWord(string word) {\\n        const int size_w = word.size();\\n        Trie *cur = root;\\n        for (int i = 0; i < size_w; i++) {\\n            int index = word[i] - 'a';\\n            if (!cur->child[index]) cur->child[index] = new Trie();\\n            cur = cur->child[index];\\n        }\\n        cur->isWord = true;\\n    }\\n\\n    bool search(string word) {\\n        return search(word.c_str(), root);\\n    }\\n    bool search(const char *ch, TrieNode *cur) {\\n        if (!cur) return false;\\n        if (*ch == '\\\\0') return cur->isWord;\\n        if (*ch != '.') {\\n             return search(ch+1, cur->child[*ch - 'a']);\\n        } else {\\n            for (int i = 0; i <= 25; i++) {\\n                if (search(ch+1, cur->child[i])) return true;\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"59705",
			"view":"1740",
			"top":"9",
			"title":"Java 19ms solution (modified trie solution)",
			"vote":"8",
			"content":"1\\u3001use HashMap to categorized words by length.\\n\\n      Map<Integer,TrieNode>trieMap = new HashMap<Integer,TrieNode>();\\n\\n2\\u3001all words of the same length are put in to a trie.\\n \\nIn a normal trie solution,we can only search one letter per time, \\n\\nhowever,there are many cases where letters are continuously the same, say \"caaaab\"\\n\\nso we can condense these continuously duplicated letters into one trie node instead of multiple trie node\\n\\nHere is how TrieNode is defined:\\n\\n    class TrieNode{\\n\\t\\tTrieNode children[];\\n\\t\\tint len = 0;  //record the number of character that is continuously duplicated\\n\\t\\tpublic TrieNode(){\\n\\t\\t\\tchildren = new TrieNode[26];\\n\\t\\t}\\n\\t}\\n\\nthis helps to reduce the trie height and the search path \\n\\nPS:\\n \\nI was able to beat 100% percent of java submission( about 15ms) just using a small trick\\n\\nChange the type of trieMap to an array \\n\\n    TrieNode[]trieMap = new TrieNode[512];  //the maximum length of all testd words is about 500"
		}
	],
	"id":"211",
	"title":"Add and Search Word - Data structure design",
	"content":"<p>\r\nDesign a data structure that supports the following two operations:\r\n</p>\r\n<pre>\r\nvoid addWord(word)\r\nbool search(word)\r\n</pre>\r\n\r\n<p>\r\nsearch(word) can search a literal word or a regular expression string containing only letters <code>a-z</code> or <code>.</code>. A <code>.</code> means it can represent any one letter.</p>\r\n\r\n<p>\r\nFor example:</p>\r\n<pre>\r\naddWord(\"bad\")\r\naddWord(\"dad\")\r\naddWord(\"mad\")\r\nsearch(\"pad\") -> false\r\nsearch(\"bad\") -> true\r\nsearch(\".ad\") -> true\r\nsearch(\"b..\") -> true\r\n</pre>\r\n\r\n<p>\r\n<b>Note:</b><br>\r\nYou may assume that all words are consist of lowercase letters <code>a-z</code>.\r\n</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show hint.</a></p>\r\n\r\n<div class=\"spoilers\">You should be familiar with how a Trie works. If not, please work on this problem: <a href=\"https://leetcode.com/problems/implement-trie-prefix-tree/\">Implement Trie (Prefix Tree)</a> first.\r\n</div>",
	"frequency":"194",
	"ac_num":"69683"
}