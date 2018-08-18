{
	"difficulty":"2",
	"submit_num":"26997",
	"show_id":"648",
	"leetcode_id":"648",
	"answers":[
		{
			"lc_ans_id":"105767",
			"view":"5106",
			"top":"0",
			"title":"Java Simple/Classical Trie question/solution (Beat 96%)",
			"vote":"17",
			"content":"```\\npublic String replaceWords(List<String> dict, String sentence) {\\n        String[] tokens = sentence.split(\" \");\\n        TrieNode trie = buildTrie(dict);\\n        return replaceWords(tokens, trie);\\n    }\\n\\n    private String replaceWords(String[] tokens, TrieNode root) {\\n        StringBuilder stringBuilder = new StringBuilder();\\n        for (String token : tokens) {\\n            stringBuilder.append(getShortestReplacement(token, root));\\n            stringBuilder.append(\" \");\\n        }\\n        return stringBuilder.substring(0, stringBuilder.length()-1);\\n    }\\n\\n    private String getShortestReplacement(String token, final TrieNode root) {\\n        TrieNode temp = root;\\n        StringBuilder stringBuilder = new StringBuilder();\\n        for (char c : token.toCharArray()) {\\n            stringBuilder.append(c);\\n            if (temp.children[c - 'a'] != null) {\\n                if (temp.children[c - 'a'].isWord) {\\n                    return stringBuilder.toString();\\n                }\\n                temp = temp.children[c - 'a'];\\n            } else {\\n                return token;\\n            }\\n        }\\n        return token;\\n    }\\n\\n    private TrieNode buildTrie(List<String> dict) {\\n        TrieNode root = new TrieNode(' ');\\n        for (String word : dict) {\\n            TrieNode temp = root;\\n            for (char c : word.toCharArray()) {\\n                if (temp.children[c - 'a'] == null) {\\n                    temp.children[c - 'a'] = new TrieNode(c);\\n                }\\n                temp = temp.children[c - 'a'];\\n            }\\n            temp.isWord = true;\\n        }\\n        return root;\\n    }\\n\\n    public class TrieNode {\\n        char val;\\n        TrieNode[] children;\\n        boolean isWord;\\n\\n        public TrieNode(char val) {\\n            this.val = val;\\n            this.children = new TrieNode[26];\\n            this.isWord = false;\\n        }\\n    }\\n```\\n\\nAlso viewable on Github [here](https://github.com/fishercoder1534/Leetcode)."
		},
		{
			"lc_ans_id":"105755",
			"view":"2637",
			"top":"1",
			"title":"Python, Straightforward with Explanation (Prefix hash, Trie solutions)",
			"vote":"10",
			"content":"We can check the prefixes directly.  For each word in the sentence, we'll look at successive prefixes and see if we saw them before.\\n\\n```\\ndef replaceWords(self, roots, sentence):\\n    rootset = set(roots)\\n\\n    def replace(word):\\n        for i in xrange(1, len(word)):\\n            if word[:i] in rootset:\\n                return word[:i]\\n        return word\\n\\n    return \" \".join(map(replace, sentence.split()))\\n```\\n\\n\\nWe could also use a trie.  We'll insert each root in the trie.  Then, for each word in the sentence, we'll replace it with the first root we encounter upon traversal of the trie.\\n\\n```\\ndef replaceWords(self, roots, sentence):\\n    _trie = lambda: collections.defaultdict(_trie)\\n    trie = _trie()\\n    END = True\\n    for root in roots:\\n        cur = trie\\n        for letter in root:\\n            cur = cur[letter]\\n        cur[END] = root\\n\\n    def replace(word):\\n        cur = trie\\n        for letter in word:\\n            if letter not in cur: break\\n            cur = cur[letter]\\n            if END in cur:\\n                return cur[END]\\n        return word\\n\\n    return \" \".join(map(replace, sentence.split()))\\n```"
		},
		{
			"lc_ans_id":"105795",
			"view":"4241",
			"top":"2",
			"title":"Simple Java 8 and Trie based solution",
			"vote":"7",
			"content":"The only modification to the standard Trie, is that we need a function getShortestPrefix  that returns the shortest prefix of the given word in the trie, if the shortest prefix exists or return the original word. Once we have this, all we have to do is iterate through the sentence and replace each word with the getShortestPrefix(word) in the trie.\\n```\\npublic String replaceWords(List<String> dict, String sentence) {\\n    Trie trie = new Trie(256);\\n    dict.forEach(s -> trie.insert(s));\\n    List<String> res = new ArrayList<>();\\n    Arrays.stream(sentence.split(\" \")).forEach(str -> res.add(trie.getShortestPrefix(str)));\\n    return res.stream().collect(Collectors.joining(\" \"));\\n}\\n\\n\\nclass Trie {\\n    private int R;\\n    private TrieNode root;\\n\\n    public Trie(int R) {\\n        this.R = R;\\n        root = new TrieNode();\\n    }\\n\\n    // Returns the shortest prefix of the word that is there in the trie\\n    // If no such prefix exists, return the original word\\n    public String getShortestPrefix(String word) {\\n        int len =  getShortestPrefix(root, word, -1);\\n        return (len < 1) ? word : word.substring(0, len);\\n    }\\n\\n    private int getShortestPrefix(TrieNode root, String word, int res) {\\n        if(root == null || word.isEmpty()) return 0;\\n        if(root.isWord) return res + 1;\\n        return getShortestPrefix(root.next[word.charAt(0)], word.substring(1), res+1);\\n    }\\n\\n    // Inserts a word into the trie.\\n    public void insert(String word) {\\n        insert(root, word);\\n    }\\n\\n    private void insert(TrieNode root, String word) {\\n        if (word.isEmpty()) { root.isWord = true; return; }\\n        if (root.next[word.charAt(0)] == null) root.next[word.charAt(0)] = new TrieNode();\\n        insert(root.next[word.charAt(0)], word.substring(1));\\n    }\\n\\n    private class TrieNode {\\n        private TrieNode[] next = new TrieNode[R];\\n        private boolean isWord;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105757",
			"view":"3449",
			"top":"3",
			"title":"Java solution, 12 lines, HashSet",
			"vote":"5",
			"content":"Why it is a hard problem? Anyway...\\n\\n```\\npublic class Solution {\\n    public String replaceWords(List<String> dict, String sentence) {\\n        if (dict == null || dict.size() == 0) return sentence;\\n        \\n        Set<String> set = new HashSet<>();\\n        for (String s : dict) set.add(s);\\n        \\n        StringBuilder sb = new StringBuilder();\\n        String[] words = sentence.split(\"\\\\\\\\s+\");\\n        \\n        for (String word : words) {\\n            String prefix = \"\";\\n            for (int i = 1; i <= word.length(); i++) {\\n                prefix = word.substring(0, i);\\n                if (set.contains(prefix)) break;\\n            }\\n            sb.append(\" \" + prefix);\\n        }\\n        \\n        return sb.deleteCharAt(0).toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105811",
			"view":"346",
			"top":"4",
			"title":"Easy Python Solution, 6 Lines",
			"vote":"3",
			"content":"Iterate through the dict and then iterate through sentence to see if it starts with the prefix. If it does, replace it.\\n```\\nclass Solution(object):\\n    def replaceWords(self, dict, sentence):\\n        \"\"\"\\n        :type dict: List[str]\\n        :type sentence: str\\n        :rtype: str\\n        \"\"\"\\n        setenceAsList = sentence.split(\" \")\\n        for i in range(len(setenceAsList)):\\n            for j in dict:\\n                if setenceAsList[i].startswith(j):\\n                    setenceAsList[i] = j\\n        return \" \".join(setenceAsList)\\n```"
		},
		{
			"lc_ans_id":"105763",
			"view":"113",
			"top":"5",
			"title":"One Line Regex Solution - Java and JavaScript",
			"vote":"2",
			"content":"`\\\\b(cat|rat|bat).*?\\\\b` `g`\\n\\nJust replace the word with your capture!\\n\\nWhat'cha think?\\n\\n#### JavaScript\\n```js\\nvar replaceWords = function(dict, sentence) {\\n    return sentence.replace( new RegExp(`\\\\\\\\b(${dict.join(\"|\")}).*?\\\\\\\\b`, \"g\"), \"$1\" );\\n};\\n```\\n\\n#### Java\\n```java\\npublic String replaceWords(List<String> dict, String sentence) {\\n    return sentence.replaceAll(\"\\\\\\\\b(\"+String.join(\"|\", dict)+\").*?\\\\\\\\b\", \"$1\");\\n}\\n```"
		},
		{
			"lc_ans_id":"105794",
			"view":"296",
			"top":"6",
			"title":"C++ trietree solution easy to read and understand",
			"vote":"2",
			"content":"The idea is very simple. Use the vector of string to build a trie tree. When there is a shorter root word then we stop build. For sentence, we check the tree and find is there any word to replace. For node, we record its corresponding string.\\n\\n```\\nclass Solution {\\npublic:\\n    string replaceWords(vector<string>& dict, string sentence) {\\n        stringstream sen(sentence);\\n        string res=\"\";\\n        string token;\\n        TrieTree tree;\\n        tree.buildTree(dict);\\n         while(getline(sen,token,' ')){\\n             res+=tree.replace(token);\\n             res+=\" \";\\n         }\\n        return res.substr(0,res.size()-1);  //ignore last space\\n    }\\n    \\nclass TrieNode{\\npublic:\\n    bool end;\\n    string str;\\n    TrieNode* children[26];\\n    TrieNode(bool flag, string s){\\n        end=flag;\\n        str=s;\\n        memset(children, 0, sizeof(children));;\\n        }\\n    };\\nclass TrieTree{\\npublic:\\n        TrieNode* root;\\n        TrieTree(){\\n            root= new TrieNode(false,\"\");\\n        }\\n    \\n       void buildTree(vector<string>& dict){\\n            for(string s:dict){\\n                TrieNode* cur =root;\\n                for(char c:s){\\n                    if(cur->children[c-'a'] == NULL){\\n                        cur->children[c-'a'] = new TrieNode(false,\"\");\\n                        cur = cur->children[c-'a'];\\n                    }\\n                    else if(cur->children[c-'a']->end==true){   //if a shorter root exists, we just stop build\\n                        cur=NULL;\\n                        break;\\n                    }\\n                    else cur=cur->children[c-'a'];\\n                }\\n                if(cur!=NULL){    //mark the string and flag\\n                    cur->end=true;\\n                    cur->str=s;\\n                }\\n            }\\n           return ;\\n        }\\n        string replace(string s){\\n            TrieNode* cur =root;\\n            string res=\"\";\\n            for(char c:s){\\n                cur=cur->children[c-'a'];\\n                if(cur==NULL) break;\\n                if(cur->end==true){\\n                    res=cur->str;\\n                    break;\\n                }\\n            }\\n            if(res!=\"\") return res;\\n            return s;\\n        }\\n    };\\n\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"105824",
			"view":"165",
			"top":"7",
			"title":"Trie Tree concise Java solution, easy to understand",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    TrieNode root = new TrieNode();\\n    \\n    public String replaceWords(List<String> dict, String sentence) {\\n        StringBuilder sb = new StringBuilder();\\n        String[] words = sentence.split(\" \");\\n        for (String word : dict) {\\n            build(word);\\n        }\\n        for (String word : words) {\\n            if (sb.length() > 0) {\\n                sb.append(\" \");\\n            }\\n            sb.append(next(word));\\n        }\\n        return sb.toString();\\n    }\\n    \\n    public void build(String word) {\\n        TrieNode curRoot = root;\\n        for (int i = 0; i < word.length(); i++) {\\n            char c = word.charAt(i);\\n            if (curRoot.children[c - 'a'] == null) {\\n                curRoot.children[c - 'a'] = new TrieNode();\\n            }\\n            curRoot = curRoot.children[c - 'a'];\\n        }\\n        curRoot.isTail = true;\\n    }\\n    \\n    public String next(String word) {\\n        TrieNode curRoot = root;\\n        StringBuilder sb = new StringBuilder();\\n        for (int i = 0; i < word.length(); i++) {\\n            char c = word.charAt(i);\\n            if (curRoot.children[c - 'a'] == null) {\\n                break;\\n            }\\n            sb.append(c);\\n            curRoot = curRoot.children[c - 'a'];\\n            if (curRoot.isTail) return sb.toString();\\n        }\\n        return word;\\n    }\\n}\\n\\nclass TrieNode {\\n    TrieNode[] children;\\n    boolean isTail = false;\\n    public TrieNode() {\\n        children = new TrieNode[26];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"105832",
			"view":"87",
			"top":"8",
			"title":"Javascript solution, 1 line",
			"vote":"2",
			"content":"var replaceWords = (dict, sentence) => dict.slice().sort().reduce((x, y) => x.replace(new RegExp(`\\\\\\\\b${y}.*?\\\\\\\\b`, \"g\"), y), sentence); // use RegExp and Array.sort, just one line, but not fast  \\uff5e\\uff5e((\\u30ce*T_T*)\\u30ce\\u2534\\u2014\\u2534  !"
		},
		{
			"lc_ans_id":"105846",
			"view":"141",
			"top":"9",
			"title":"Simple Java Sort Solution",
			"vote":"2",
			"content":"Sort the dictionary ascending order of length. The for each word in the sentence, just try to find the first match in the dictionary. \\n\\n    public String replaceWords(List<String> dict, String sentence) {\\n        Collections.sort(dict, Comparator.comparingInt(a -> a.length()));\\n        String[] words = sentence.split(\"\\\\\\\\s\");\\n        StringBuilder sb = new StringBuilder();\\n        \\n        for(String word : words) {\\n            for(String match : dict) {\\n                if(word.startsWith(match)) {\\n                    word = match;\\n                    break;\\n                }\\n            }\\n            sb.append(word + \" \");\\n        }\\n        sb.replace(sb.length()-1, sb.length(), \"\");\\n        return sb.toString();\\n    }"
		}
	],
	"id":"625",
	"title":"Replace Words",
	"content":"<p>\r\nIn English, we have a concept called <code>root</code>, which can be followed by some other words to form another longer word - let's call this word <code>successor</code>. For example, the root <code>an</code>, followed by <code>other</code>, which can form another word <code>another</code>.\r\n</p>\r\n\r\n\r\n<p>\r\nNow, given a dictionary consisting of many roots and a sentence. You need to replace all the <code>successor</code> in the sentence with the <code>root</code> forming it. If a <code>successor</code> has many <code>roots</code> can form it, replace it with the root with the shortest length.\r\n</p>\r\n\r\n<p>\r\nYou need to output the sentence after the replacement.\r\n</p>\r\n\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> dict = [\"cat\", \"bat\", \"rat\"]\r\nsentence = \"the cattle was rattled by the battery\"\r\n<b>Output:</b> \"the cat was rat by the bat\"\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The input will only have lower-case letters.</li>\r\n<li> 1 <= dict words number <= 1000 </li>\r\n<li> 1 <= sentence words number <= 1000  </li>\r\n<li> 1 <= root length <= 100 </li>\r\n<li> 1 <= sentence words length <= 1000 </li>\r\n</ol>\r\n</p>",
	"frequency":"221",
	"ac_num":"12866"
}