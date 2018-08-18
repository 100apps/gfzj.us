{
	"difficulty":"2",
	"submit_num":"17928",
	"show_id":"676",
	"leetcode_id":"676",
	"answers":[
		{
			"lc_ans_id":"107446",
			"view":"4248",
			"top":"0",
			"title":"Easy 14 lines Java solution, HashMap",
			"vote":"21",
			"content":"1. For each word in ```dict```, for each char, remove the char and put the rest of the word as key, a pair of index of the removed char and the char as ```part of``` value list into a map. e.g.\\n\"hello\" -> {\"ello\":[[0, 'h']], \"hllo\":[[1, 'e']], \"helo\":[[2, 'l'],[3, 'l']], \"hell\":[[4, 'o']]}\\n2. During search, generate the keys as in step 1. When we see there's pair of same index but different char in the value array, we know the answer is true. e.g.\\n\"healo\" when remove ```a```, key is \"helo\" and there is a pair [2, 'l'] which has same index but different char. Then the answer is true;\\n\\n```\\nclass MagicDictionary {\\n\\n    Map<String, List<int[]>> map = new HashMap<>();\\n    /** Initialize your data structure here. */\\n    public MagicDictionary() {\\n    }\\n    \\n    /** Build a dictionary through a list of words */\\n    public void buildDict(String[] dict) {\\n        for (String s : dict) {\\n            for (int i = 0; i < s.length(); i++) {\\n                String key = s.substring(0, i) + s.substring(i + 1);\\n                int[] pair = new int[] {i, s.charAt(i)};\\n                \\n                List<int[]> val = map.getOrDefault(key, new ArrayList<int[]>());\\n                val.add(pair);\\n                \\n                map.put(key, val);\\n            }\\n        }\\n    }\\n    \\n    /** Returns if there is any word in the trie that equals to the given word after modifying exactly one character */\\n    public boolean search(String word) {\\n        for (int i = 0; i < word.length(); i++) {\\n            String key = word.substring(0, i) + word.substring(i + 1);\\n            if (map.containsKey(key)) {\\n                for (int[] pair : map.get(key)) {\\n                    if (pair[0] == i && pair[1] != word.charAt(i)) return true;\\n                }\\n            }\\n        }\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107454",
			"view":"2317",
			"top":"1",
			"title":"Python, without *26 factor in complexity",
			"vote":"17",
			"content":"A word `'apple'` has neighbors `'*pple', 'a*ple', 'ap*le', 'app*e', 'appl*'`.  When searching for a target word like `'apply'`, we know that a necessary condition is a neighbor of `'apply'` is a neighbor of some source word in our magic dictionary.  If there is more than one source word that does this, then at least one of those source words will be different from the target word.  Otherwise, we need to check that the source doesn't equal the target.\\n\\n```python\\nclass MagicDictionary(object):\\n    def _candidates(self, word):\\n        for i in xrange(len(word)):\\n            yield word[:i] + '*' + word[i+1:]\\n            \\n    def buildDict(self, words):\\n        self.words = set(words)\\n        self.near = collections.Counter(cand for word in words\\n                                        for cand in self._candidates(word))\\n\\n    def search(self, word):\\n        return any(self.near[cand] > 1 or \\n                   self.near[cand] == 1 and word not in self.words\\n                   for cand in self._candidates(word))\\n```"
		},
		{
			"lc_ans_id":"107453",
			"view":"1683",
			"top":"2",
			"title":"Easiest JAVA with Trie, no need to count the number of changes",
			"vote":"8",
			"content":"Below is my accepted java code.\\nFirst build a trie tree, and in search(String word) function, we just edit every character from 'a' to 'z' and search the new string. \\n (This process is like \"word ladder\")\\n\\n````\\nclass MagicDictionary {\\n    class TrieNode {\\n        TrieNode[] children = new TrieNode[26];\\n        boolean isWord;\\n        public TrieNode() {}\\n    }\\n    TrieNode root;\\n    /** Initialize your data structure here. */\\n    public MagicDictionary() {\\n        root = new TrieNode();\\n    }\\n    \\n    /** Build a dictionary through a list of words */\\n    public void buildDict(String[] dict) {\\n        for (String s : dict) {\\n            TrieNode node = root;\\n            for (char c : s.toCharArray()) {\\n                if (node.children[c - 'a'] == null) {\\n                    node.children[c - 'a'] = new TrieNode();\\n                }\\n                node = node.children[c - 'a'];\\n            }\\n            node.isWord = true;\\n        }\\n    }\\n    \\n    /** Returns if there is any word in the trie that equals to the given word after modifying exactly one character */\\n    public boolean search(String word) {\\n        char[] arr = word.toCharArray();\\n        for (int i = 0; i < word.length(); i++) {\\n            for (char c = 'a'; c <= 'z'; c++) {\\n                if (arr[i] == c) {\\n                    continue;\\n                }\\n                char org = arr[i];\\n                arr[i] = c;\\n                if (helper(new String(arr), root)) {\\n                    return true;\\n                }\\n                arr[i] = org;\\n            }\\n        }\\n        return false;\\n    }\\n    public boolean helper(String s, TrieNode root) {\\n        TrieNode node = root;\\n        for (char c : s.toCharArray()) {\\n            if (node.children[c - 'a'] == null) {\\n                return false;\\n            }\\n            node = node.children[c - 'a'];\\n        }\\n        return node.isWord;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"107466",
			"view":"634",
			"top":"3",
			"title":"Python intuitive solution using dictionary",
			"vote":"5",
			"content":"The basic idea here is very simple: we construct a dictionary, whose key is the length of the given words, and the value is a list containing the words with the same length specified in the key. And when we search a word (say word \"hello\") in the magic dictionary, we only need to check those words in dic[len(\"hellow\")], ( named candi in my code). Simple and quite intuitive but beat 90% :-)\\n\\n```\\nclass MagicDictionary(object):\\n\\n    def __init__(self):\\n        \"\"\"\\n        Initialize your data structure here.\\n        \"\"\"\\n        self.wordsdic={}\\n\\n    def buildDict(self, dict):\\n        \"\"\"\\n        Build a dictionary through a list of words\\n        :type dict: List[str]\\n        :rtype: void\\n        \"\"\"\\n        for i in dict:\\n            self.wordsdic[len(i)]=self.wordsdic.get(len(i),[])+[i]\\n\\n    def search(self, word):\\n        \"\"\"\\n        Returns if there is any word in the trie that equals to the given word after modifying exactly one character\\n        :type word: str\\n        :rtype: bool\\n        \"\"\"\\n        for candi in self.wordsdic.get(len(word),[]):\\n                countdiff=0\\n                for j in range(len(word)):\\n                    if candi[j]!=word[j]:\\n                        countdiff+=1\\n                if countdiff==1:\\n                    return True\\n        return False\\n                    \\n        \\n\\n\\n# Your MagicDictionary object will be instantiated and called as such:\\n# obj = MagicDictionary()\\n# obj.buildDict(dict)\\n# param_2 = obj.search(word)\\n```"
		},
		{
			"lc_ans_id":"107465",
			"view":"1965",
			"top":"4",
			"title":"Efficient Trie and Java 8 w/ Explanation",
			"vote":"3",
			"content":"The implementation is a simple Trie, with the method relaxedSearch.\\n\\nrelaxedSearch searches for a word, with one deviation from a normal trie.\\n\\nIf there is a match with the current character, it proceeds as usual in that branch.\\nBut for all the non matched characters, it still continues searching, by incrementing the changedTimes variable, which maintains how many times a character was changed in the word search from the root.\\n\\n\\nAny search that involves changedTimes > 1, is immediately terminated by returning false as we are allowed to change only one character.\\n\\nThe solution is reached, when we find word in the trie and the changedTimes is exactly == 1.\\n```\\nclass MagicDictionary {\\n\\n        Trie trie;\\n        public MagicDictionary() {\\n            trie = new Trie(256);\\n        }\\n\\n        public void buildDict(String[] dict) {\\n            Arrays.stream(dict).forEach(s -> trie.insert(s));\\n        }\\n\\n        public boolean search(String word) {\\n            return trie.relaxedSearch(word);\\n        }\\n\\n        class Trie {\\n            private int R;\\n            private TrieNode root;\\n\\n            public Trie(int R) {\\n                this.R = R;\\n                root = new TrieNode();\\n            }\\n            \\n            public boolean relaxedSearch(String word) {\\n                return relaxedSearch(root, word, 0);\\n            }\\n\\n            private boolean relaxedSearch(TrieNode root, String word, int changedTimes) {\\n                if (root == null || (!root.isWord && word.isEmpty()) || changedTimes > 1) return false;\\n                if (root.isWord && word.isEmpty()) return changedTimes == 1;\\n                return Arrays.stream(root.next).anyMatch(nextNode -> relaxedSearch(nextNode, word.substring(1),\\n                        root.next[word.charAt(0)] == nextNode ? changedTimes : changedTimes+1));\\n            }\\n\\n            // Inserts a word into the trie.\\n            public void insert(String word) {\\n                insert(root, word);\\n            }\\n\\n            private void insert(TrieNode root, String word) {\\n                if (word.isEmpty()) { root.isWord = true; return; }\\n                if (root.next[word.charAt(0)] == null) root.next[word.charAt(0)] = new TrieNode();\\n                insert(root.next[word.charAt(0)], word.substring(1));\\n            }\\n\\n            private class TrieNode {\\n                private TrieNode[] next = new TrieNode[R];\\n                private boolean isWord;\\n            }\\n\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"107496",
			"view":"105",
			"top":"5",
			"title":"Simple Iterative Java Solution",
			"vote":"2",
			"content":"In order for a string to exist in a magic dictionary one character in the string must be modified. This means we can compare the incoming string against strings in the dictionary and count how many characters do not match between the two. If only one character does not match the word exists in the magic dictionary. \\n\\nThere are some additional optimizations that we can make like only checking strings that have the same length as the input string and skipping over a word once more than one character has been found to not match.\\n\\n```\\nclass MagicDictionary {\\n        private final List<String> words = new ArrayList<>();\\n    /** Initialize your data structure here. */\\n    public MagicDictionary() {\\n    }\\n    \\n    /** Build a dictionary through a list of words */\\n    public void buildDict(String[] dict) {\\n        for (String s : dict) {\\n            words.add(s);\\n        }\\n    }\\n    \\n    /** Returns if there is any word in the trie that equals to the given word after modifying exactly one character */\\n    public boolean search(String word) {\\n        for (String s : words) {\\n            // Only check strings that are the same length\\n            if (word.length() != s.length()) {\\n                continue;\\n            }\\n            \\n            int numWrong = 0;\\n            \\n            // Compare each letter of each word and count how many letters are off.\\n            for (int i = 0; i < word.length(); i++) {\\n                char a = word.charAt(i);\\n                char b = s.charAt(i);\\n                \\n                if (a != b) {\\n                    numWrong++;\\n                }\\n                \\n                // optimization\\n                if (numWrong > 1) {\\n                    break;\\n                }\\n            }\\n\\n            // If only one letter for each word is off, this is acceptable.\\n            if (numWrong == 1) {\\n                return true;\\n            } \\n        }\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107506",
			"view":"442",
			"top":"6",
			"title":"C++, unordered_set",
			"vote":"2",
			"content":"The solution is to use hash table to save the dictionary. For each word to search, generate all possible candidates and verify whether it is in the dictionary.\\nFor the follow-up question, we should implement a trie rather than use hash table. Trie uses less space and more efficient for a large dictionary. \\n```\\nclass MagicDictionary {\\npublic:\\n    /** Initialize your data structure here. */\\n    MagicDictionary() {\\n        \\n    }\\n    \\n    /** Build a dictionary through a list of words */\\n    void buildDict(vector<string> dict) {\\n        for (string &s:dict) words.insert(s);\\n    }\\n    \\n    /** Returns if there is any word in the trie that equals to the given word after modifying exactly one character */\\n    bool search(string word) {\\n          for (int i = 0; i < word.size(); i++) {\\n            char c = word[i];\\n            for (int j = 0; j < 26; j++) {\\n                if (c == j+'a') continue;\\n                word[i] = j+'a';\\n                if (words.count(word)) return true;\\n            }\\n            word[i] = c;\\n        }\\n        return false;\\n    }\\nprivate:\\n    unordered_set<string> words;\\n};\\n```"
		},
		{
			"lc_ans_id":"107507",
			"view":"562",
			"top":"7",
			"title":"Easy Java Solution",
			"vote":"2",
			"content":"Some thoughts:\\nIt may not be necessary to implement the trie for this problem.\\nThe time complexity and space complexity are the same.\\nAnd in some cases, trie version might be even slower? \\n\\n```\\nclass MagicDictionary {\\n\\n    HashSet<String> dictSet;\\n    \\n    /** Initialize your data structure here. */\\n    public MagicDictionary() {\\n        dictSet = new HashSet<>();\\n    }\\n    \\n    /** Build a dictionary through a list of words */\\n    public void buildDict(String[] dict) {\\n        dictSet = new HashSet<String>();\\n        for(String word : dict)\\n            dictSet.add(word);\\n    }\\n    \\n    /** Returns if there is any word in the trie that equals to the given word after modifying exactly one character */\\n    public boolean search(String word) {\\n        char[] chars = word.toCharArray();\\n        for(int i = 0; i < chars.length; i++){\\n            char ch = chars[i];\\n            for (char c = 'a'; c <= 'z'; c++){\\n                if (c != ch){\\n                    chars[i] = c;\\n                    if (dictSet.contains(new String(chars)))\\n                        return true;\\n                }\\n            }\\n            chars[i] = ch;\\n        }\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107493",
			"view":"61",
			"top":"8",
			"title":"[Bug] The question does NOT support Swift!",
			"vote":"1",
			"content":"Please add the Swift support for the question @administrators"
		},
		{
			"lc_ans_id":"107500",
			"view":"201",
			"top":"9",
			"title":"Efficient Python Trie solution, without traversing all characters (a-z) at each step",
			"vote":"1",
			"content":"```\\nclass MagicDictionary(object):\\n\\n    def __init__(self):\\n        self.trie = {}\\n\\n    def buildDict(self, dict):\\n        for word in dict: \\n            node = self.trie \\n            for letter in word: \\n                if letter not in node: \\n                    node[letter] = {}\\n                node = node[letter] \\n            node[None] = None \\n\\n    def search(self, word):\\n        def find(node, i, mistakeAllowed): \\n            if i == len(word):\\n                if None in node and not mistakeAllowed: \\n                    return True\\n                return False \\n            if word[i] not in node: \\n                return any(find(node[letter], i+1, False) for letter in node if letter) if mistakeAllowed else False \\n            \\n            if mistakeAllowed: \\n                return find(node[word[i]], i+1, True) or any(find(node[letter], i+1, False) for letter in node if letter and letter != word[i])\\n            return find(node[word[i]], i+1, False)\\n            \\n        return find(self.trie, 0, True)        \\n\\n```"
		}
	],
	"id":"653",
	"title":"Implement Magic Dictionary",
	"content":"<p>\r\nImplement a magic directory with <code>buildDict</code>, and <code>search</code> methods.\r\n</p>\r\n\r\n<p>\r\nFor the method <code>buildDict</code>, you'll be given a list of non-repetitive words to build a dictionary.\r\n</p>\r\n\r\n<p>\r\nFor the method <code>search</code>, you'll be given a word, and judge whether if you modify <b>exactly</b> one character into <b>another</b> character in this word, the modified word is in the dictionary you just built.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\nInput: buildDict([\"hello\", \"leetcode\"]), Output: Null\r\nInput: search(\"hello\"), Output: False\r\nInput: search(\"hhllo\"), Output: True\r\nInput: search(\"hell\"), Output: False\r\nInput: search(\"leetcoded\"), Output: False\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>You may assume that all the inputs are consist of lowercase letters <code>a-z</code>.</li>\r\n<li>For contest purpose, the test data is rather small by now. You could think about highly efficient algorithm after the contest.</li>\r\n<li>Please remember to <b>RESET</b> your class variables declared in class MagicDictionary, as static/class variables are <b>persisted across multiple test cases</b>. Please see <a href=\"https://leetcode.com/faq/#different-output\">here</a> for more details.</li>\r\n</ol>\r\n</p>",
	"frequency":"68",
	"ac_num":"8918"
}