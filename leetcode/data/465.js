{
	"difficulty":"3",
	"submit_num":"33523",
	"show_id":"472",
	"leetcode_id":"472",
	"answers":[
		{
			"lc_ans_id":"95652",
			"view":"10192",
			"top":"0",
			"title":"Java DP Solution",
			"vote":"37",
			"content":"Do you still remember how did you solve this problem? https://leetcode.com/problems/word-break/\\n\\nIf you do know one optimized solution for above question is using ```DP```, this problem is just one more step further. We iterate through each ```word``` and see if it can be formed by using other ```words```.\\n\\nOf course it is also obvious that a ```word``` can only be formed by ```words``` shorter than it. So we can first sort the input by length of each ```word```, and only try to form one ```word``` by using ```words``` in front of it.\\n```\\npublic class Solution {\\n    public static List<String> findAllConcatenatedWordsInADict(String[] words) {\\n        List<String> result = new ArrayList<>();\\n        Set<String> preWords = new HashSet<>();\\n        Arrays.sort(words, new Comparator<String>() {\\n            public int compare (String s1, String s2) {\\n                return s1.length() - s2.length();\\n            }\\n        });\\n        \\n        for (int i = 0; i < words.length; i++) {\\n            if (canForm(words[i], preWords)) {\\n                result.add(words[i]);\\n            }\\n            preWords.add(words[i]);\\n        }\\n        \\n        return result;\\n    }\\n\\t\\n    private static boolean canForm(String word, Set<String> dict) {\\n        if (dict.isEmpty()) return false;\\n\\tboolean[] dp = new boolean[word.length() + 1];\\n\\tdp[0] = true;\\n\\tfor (int i = 1; i <= word.length(); i++) {\\n\\t    for (int j = 0; j < i; j++) {\\n\\t\\tif (!dp[j]) continue;\\n\\t\\tif (dict.contains(word.substring(j, i))) {\\n\\t\\t    dp[i] = true;\\n\\t\\t    break;\\n\\t\\t}\\n\\t    }\\n\\t}\\n\\treturn dp[word.length()];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95644",
			"view":"2932",
			"top":"1",
			"title":"102ms java Trie + DFS solution. With explanation, easy to understand.",
			"vote":"19",
			"content":"```\\npublic List<String> findAllConcatenatedWordsInADict(String[] words) {\\n        List<String> res = new ArrayList<String>();\\n        if (words == null || words.length == 0) {\\n            return res;\\n        }\\n        TrieNode root = new TrieNode();\\n        for (String word : words) { // construct Trie tree\\n            if (word.length() == 0) {\\n                continue;\\n            }\\n            addWord(word, root);\\n        }\\n        for (String word : words) { // test word is a concatenated word or not\\n            if (word.length() == 0) {\\n                continue;\\n            }\\n            if (testWord(word.toCharArray(), 0, root, 0)) {\\n                res.add(word);\\n            }\\n        }\\n        return res;\\n    }\\n    public boolean testWord(char[] chars, int index, TrieNode root, int count) { // count means how many words during the search path\\n        TrieNode cur = root;\\n        int n = chars.length;\\n        for (int i = index; i < n; i++) {\\n            if (cur.sons[chars[i] - 'a'] == null) {\\n                return false;\\n            }\\n            if (cur.sons[chars[i] - 'a'].isEnd) {\\n                if (i == n - 1) { // no next word, so test count to get result.\\n                    return count >= 1;\\n                }\\n                if (testWord(chars, i + 1, root, count + 1)) {\\n                    return true;\\n                }\\n            }\\n            cur = cur.sons[chars[i] - 'a'];\\n        }\\n        return false;\\n    }\\n    public void addWord(String str, TrieNode root) {\\n        char[] chars = str.toCharArray();\\n        TrieNode cur = root;\\n        for (char c : chars) {\\n            if (cur.sons[c - 'a'] == null) {\\n                cur.sons[c - 'a'] = new TrieNode();\\n            }\\n            cur = cur.sons[c - 'a'];\\n        }\\n        cur.isEnd = true;\\n    }\\n}\\nclass TrieNode {\\n    TrieNode[] sons;\\n    boolean isEnd;\\n    public TrieNode() {\\n        sons = new TrieNode[26];\\n    }\\n```"
		},
		{
			"lc_ans_id":"95636",
			"view":"5037",
			"top":"2",
			"title":"Simple Java Trie + DFS solution 144ms",
			"vote":"12",
			"content":"Most of lines are adding words into Trie Tree \\nThis solution is like putting two pointers to search through the tree. When find a word, put the other pointer back on root then continue searching.\\nBut I'm not sure about the time complexity of my solution. Suppose word length is len and there are n words. Is the time complexity O(len * n ^ 2)?\\n```\\npublic class Solution {\\n    class TrieNode {\\n        TrieNode[] children;\\n        String word;\\n        boolean isEnd;\\n        boolean combo; //if this word is a combination of simple words\\n        boolean added; //if this word is already added in result\\n        public TrieNode() {\\n            this.children = new TrieNode[26];\\n            this.word = new String();\\n            this.isEnd = false;\\n            this.combo = false;\\n            this.added = false;\\n        }\\n    }\\n    private void addWord(String str) {\\n        TrieNode node = root;\\n        for (char ch : str.toCharArray()) {\\n            if (node.children[ch - 'a'] == null) {\\n                node.children[ch - 'a'] = new TrieNode();\\n            }\\n            node = node.children[ch - 'a'];\\n        }\\n        node.isEnd = true;\\n        node.word = str;\\n    }\\n    private TrieNode root;\\n    private List<String> result;\\n    public List<String> findAllConcatenatedWordsInADict(String[] words) {\\n        root = new TrieNode();\\n        for (String str : words) {\\n            if (str.length() == 0) {\\n                continue;\\n            }\\n            addWord(str);\\n        }\\n        result = new ArrayList<>();\\n        dfs(root, 0);\\n        return result;\\n    }\\n    private void dfs(TrieNode node, int multi) {\\n    \\t//multi counts how many single words combined in this word\\n        if(node.isEnd && !node.added && multi > 1) {\\n            node.combo = true;\\n            node.added = true;\\n            result.add(node.word);\\n        }\\n        searchWord(node, root, multi);\\n    }\\n    private void searchWord(TrieNode node1, TrieNode node2, int multi) {\\n        if (node2.combo) {\\n            return;\\n        }\\n        if (node2.isEnd) {\\n            //take the pointer of node2 back to root\\n            dfs(node1, multi + 1);\\n        }\\n        for (int  i = 0; i < 26; i++) {\\n            if (node1.children[i] != null && node2.children[i] != null) {\\n                searchWord(node1.children[i], node2.children[i], multi);\\n            }\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95677",
			"view":"2146",
			"top":"3",
			"title":"C++ 772 ms dp solution",
			"vote":"9",
			"content":"For any qualified word, there must be at least 3 indexes (at least 1 besides 0 and n-1 which n is the length of the word), which can be used to split the whole string to at least two sub strings and all sub strings can be found in words.\\nE.g. input ```[\"cat\",\"cats\", \"dog\", \"sdog\",\"dogcatsdog\"]```, for word ```dogcatsdog```, there are 2 sets of numbers: ```[0, 3, 6, 10]``` and ```[0, 3, 7, 10]``` which can be formed by concatenating ```[dog, cat, sdog]``` and ```[dog, cats, dog]``` respectively.\\nSo, we can use a ```vector<int> dp(n+1)``` to store if ```w.substr(0, i)``` can be formed by existing words. Once ```i``` reach to ```n``` and it is not the word itself, we put the word to results.\\n\\n```\\n    vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {\\n        unordered_set<string> s(words.begin(), words.end());\\n        vector<string> res;\\n        for (auto w : words) {\\n            int n = w.size();\\n            vector<int> dp(n+1);\\n            dp[0] = 1;\\n            for (int i = 0; i < n; i++) {\\n                if (dp[i] == 0) continue;\\n                for (int j = i+1; j <= n; j++) {\\n                    if (j - i < n && s.count(w.substr(i, j-i))) dp[j] = 1;\\n                }\\n                if (dp[n]) { res.push_back(w); break; }\\n            }\\n        }\\n        return res;\\n    }\\n```"
		},
		{
			"lc_ans_id":"95647",
			"view":"1988",
			"top":"4",
			"title":"Python Explanation",
			"vote":"6",
			"content":"Let's discuss whether a word should be included in our answer.\\nConsider the word as a topologically sorted directed graph, where each node is a letter, and an edge exists from i to j if word[i:j] is in our wordlist, [and there is no edge from i=0 to j=len(word)-1].  We want to know if there is a path from beginning to end.  If there is, then the word can be broken into concatenated parts from our wordlist.  To answer this question, we DFS over this graph.\\n\\nCode:\\n```\\nS = set(A)\\nans = []\\nfor word in A:\\n  if not word: continue\\n  stack = [0]\\n  seen = {0}\\n  M = len(word)\\n  while stack:\\n    node = stack.pop()\\n    if node == M:\\n      ans.append(word)\\n      break\\n    for j in xrange(M - node + 1):\\n      if (word[node:node+j] in S and \\n          node + j not in seen and\\n          (node > 0 or node + j != M)):\\n        stack.append(node + j)\\n        seen.add(node + j)\\n\\nreturn ans\\n```"
		},
		{
			"lc_ans_id":"95700",
			"view":"386",
			"top":"5",
			"title":"Python DFS Solution",
			"vote":"4",
			"content":"```\\nclass Solution(object):\\n    def findAllConcatenatedWordsInADict(self, words):\\n        \"\"\"\\n        :type words: List[str]\\n        :rtype: List[str]\\n        \"\"\"\\n        word_set = set(words)\\n        ans = []\\n        def helper(w, cur, cnt):\\n            if cur == len(w):\\n                if cnt > 1:\\n                    return True\\n                else:\\n                    return False\\n            for i in xrange(cur + 1, len(w) + 1):\\n                if w[cur : i] in word_set and helper(w, i, cnt + 1):\\n                    return True\\n            return False\\n        for w in words:\\n            if helper(w, 0, 0):\\n                ans.append(w)\\n        return ans\\n\\n```"
		},
		{
			"lc_ans_id":"95640",
			"view":"1923",
			"top":"6",
			"title":"C++ Solutions, Backtrack, DP, or Trie.",
			"vote":"4",
			"content":"First, I provide my working solution using unorederd_set. But I think a better solution should use Trie. Though it passed all test cases, I always get MLE. But the java solution using Trie can be accepted. Did anybody have any suggestions about this? I have already made some optimization on it, e.g., a word that can be concatenated by shorter words will not be inserted into the Trie. But I still get MLE.\\n\\nunordered_set solution  486 ms\\n```\\nvector<string> findAllConcatenatedWordsInADict(vector<string>& words) {\\n        vector<string> result;\\n        if(words.empty()) return result; \\n        auto mycomp = [&](const string& str1, const string& str2){return str1.size() < str2.size();};\\n        sort(words.begin(), words.end(), mycomp);\\n        unordered_set<string> mp;\\n        for(auto& word: words) {\\n            string path = \"\";\\n            if(dfs(word, 0, path, 0, mp)) result.push_back(word); // We don't need to insert this word, because it can be concatenated from other words.\\n            else mp.insert(word); \\n        }\\n        return result;\\n    }\\n    \\nprivate:\\n    bool dfs(string& word, int pos, string& path, int nb, unordered_set<string>& mp) {\\n        if(pos == word.size()) {\\n            if(mp.find(path) != mp.end() && nb > 0) return true;\\n            else return false;\\n        }\\n        path.push_back(word[pos]);\\n        if(mp.find(path) != mp.end()) {\\n            string temp = \"\";\\n            if(dfs(word, pos+1, temp, nb+1, mp)) return true;\\n        }\\n        if(dfs(word, pos+1, path, nb, mp)) return true;\\n        else return false;\\n    }\\n```\\n\\nDP solution based on Word Break  739 ms\\n```\\nvector<string> findAllConcatenatedWordsInADict(vector<string>& words) {\\n        vector<string> result;\\n        if(words.empty()) return result; \\n        auto mycomp = [&](const string& str1, const string& str2){return str1.size() < str2.size();};\\n        sort(words.begin(), words.end(), mycomp);\\n        unordered_set<string> mp;\\n        for(auto& word: words) {\\n            string path = \"\";\\n            if(wordBreak(word, mp)) result.push_back(word); // We don't need to insert this word, because it can be concatenated from other words.\\n            else mp.insert(word); \\n        }\\n        return result;\\n    }\\n    \\nprivate:\\n    bool wordBreak(string& s, unordered_set<string>& wordDict) {\\n        if(s.empty() || wordDict.empty()) return false;\\n        vector<bool> dp(s.size()+1, false);\\n        dp[0] = true;\\n        for(int i = 1; i <= s.size(); i++) {\\n            for(int k = i-1; k >= 0; k--) {\\n                if(dp[k] && wordDict.find(s.substr(k, i-k)) != wordDict.end()) {\\n                    dp[i] = true;\\n                    break;\\n                }\\n            }\\n        }\\n        return dp[s.size()];\\n    }\\n```\\n\\nHere I provide my Trie-based solution, but it gets MLE.\\n```\\nclass Solution {\\npublic:\\n    struct TrieNode {\\n        bool isWord;\\n        unordered_map<char, TrieNode*> children;\\n        TrieNode(): isWord(false) {};\\n    };\\n\\n    vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {\\n        vector<string> result;\\n        if(words.empty()) return result; \\n        auto mycomp = [&](const string& str1, const string& str2){return str1.size() < str2.size();};\\n        sort(words.begin(), words.end(), mycomp);\\n        \\n        root = new TrieNode();\\n        for(auto& word: words) {\\n            if(dfs(word, 0, root, 0)) result.push_back(word);\\n            else insert(word);\\n        }\\n        return result;\\n    }\\n    \\nprivate:\\n    TrieNode* root;\\n    \\n    void insert(string& word) {\\n        auto run = root;\\n        for(char c: word) {\\n            if(run->children.find(c) == run->children.end()) {\\n                TrieNode* newnode = new TrieNode();\\n                run->children[c] = newnode;\\n            }\\n            run = run->children[c];\\n        }\\n        run->isWord = true;\\n    }\\n    \\n    bool dfs(string& word, int pos, TrieNode* node, int nb) {\\n        if(pos == word.size()) {\\n            if(node->isWord && nb > 0) return true;\\n            else return false;\\n        }\\n        \\n        if(node->children.find(word[pos]) == node->children.end()) return false;\\n        auto next = node->children[word[pos]];\\n        if(next->isWord) {\\n            if(dfs(word, pos+1, root, nb+1)) return true;\\n        }\\n        if(dfs(word, pos+1, next, nb)) return true;\\n        else return false;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"95638",
			"view":"296",
			"top":"7",
			"title":"having been troubled by this for a long time....   here is my pretty short java code beats 78%   quite easy  no comlicated data structure",
			"vote":"3",
			"content":"```\\npublic List<String> findAllConcatenatedWordsInADict(String[] words) {\\n        List<String> list = new ArrayList<>();\\n        Set<String> dictionary = new HashSet<>();\\n        for(String string : words) dictionary.add(string);\\n        for(String word:words) {\\n            dictionary.remove(word);\\n            if(check(word,dictionary)) list.add(word);\\n            dictionary.add(word);\\n        }\\n        return list;\\n    }\\n    \\n    private boolean check(String word,Set<String> dictionary) {\\n        if(dictionary.contains(word)) return true;\\n        int i = word.length() - 1;\\n        while(i >= 1) {\\n            if(dictionary.contains(word.substring(0,i)) && check(word.substring(i),dictionary)) return true;\\n            i--;\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"95654",
			"view":"148",
			"top":"8",
			"title":"20 line C++ 169 ms Beats 100% & Why I think this problem is not properly judged.",
			"vote":"2",
			"content":"The following simple naive brutal force easily beats 100% C++ submission from the past 6 months!\\n\\n**You know why your algorithm was slower?**\\n**Because you are too smart!**\\n\\n DO NOT memorize the intermediate results and DO NOT use trie. The additional data structure slows the algorithm down!!\\n\\nThis is why I think this problem is not properly judged. The judge system should favor smarter solutions, like DP (DFS with memoization) or Trie over a naive solution like mine. \\n\\nAnd truth to be told, this brutal force naive one is actually my 3rd attempts: Trie is MLE, DFS with memoization is too slow (220 ms)...\\n```\\nclass Solution {\\n    vector<string> results;\\n    unordered_set<string> dict;\\n    int min_len = 1;\\n    bool isConcatenated(string const & word)\\n    {\\n        if (dict.count(word)) return true;\\n        for (int i =  min_len; i < word.size() - min_len + 1 ; ++ i)\\n            if (dict.count(word.substr(0, i)) > 0 && isConcatenated(word.substr(i, word.size() - i)))\\n                return true;\\n        return false;\\n    }\\npublic:\\n    vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {\\n        sort(words.begin(), words.end(), [](const string &lhs, const string &rhs){return lhs.size() < rhs.size();});\\n        min_len = max(1ul, words.front().size());\\n        for (int i = 0; i < words.size(); dict.insert(words[i++]))\\n            if (words[i].size() >= min_len * 2 && isConcatenated(words[i]))\\n                results.push_back(words[i]);\\n        return results;\\n    }\\n};\\n```\\n\\nThis is my Trie which got a MLE\\n```\\n///Passed all cases but last one got a MLE (memory limit exceeded).\\nstruct TrieNode\\n{\\n    const static char BEGC = '`', ENDC = '{';\\n    TrieNode * m_children[27] = {nullptr};\\n    TrieNode(char c = BEGC)\\n    {\\n    }\\n    inline const TrieNode * operator[](char c) const\\n    {\\n        return m_children[c - 'a'];\\n    }\\n    inline TrieNode *& operator[](char c)\\n    {\\n        return m_children[c - 'a'];\\n    }\\n    virtual ~TrieNode ()\\n    {\\n        for (auto ptr : m_children)\\n            delete ptr;\\n    }\\n};\\nstruct Trie\\n{\\n    TrieNode* root;\\n    const static char BEGC = TrieNode::BEGC, ENDC = TrieNode::ENDC;\\n    virtual ~Trie()\\n    {\\n        delete root;\\n    }\\n    Trie()\\n    {\\n        root = new TrieNode();\\n    }\\n    void insert(const string & word)\\n    {\\n        TrieNode *cur_node_ptr = root;\\n        for (const auto c : word)\\n        {\\n            TrieNode &cur_node = *cur_node_ptr;\\n            if (cur_node[c] == nullptr)\\n                cur_node[c] = new TrieNode(c);\\n            cur_node_ptr = cur_node[c];\\n        }\\n        TrieNode &cur_node = *cur_node_ptr;\\n        if (cur_node[ENDC] == nullptr)\\n            cur_node[ENDC] = new TrieNode(ENDC);\\n    }\\n};\\nclass Solution {\\n    vector<string> results;\\n    Trie trie;\\n    bool isConcatenated(string const & word, int start)\\n    {\\n        TrieNode * cur_node_ptr = trie.root;\\n        for (int i = start; i < word.size(); ++i)\\n        {\\n            TrieNode & cur_node = *cur_node_ptr;\\n            if (cur_node[Trie::ENDC] != nullptr && isConcatenated(word, i))\\n                return true;\\n            cur_node_ptr = cur_node[word[i]];\\n            if (cur_node_ptr == nullptr)\\n                return false;\\n        }\\n        if ((*cur_node_ptr)[Trie::ENDC] != nullptr)\\n            return true;\\n        return false;\\n    }\\npublic:\\n    vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {\\n        sort(words.begin(), words.end(), [](const string &lhs, const string &rhs){return lhs.size() < rhs.size();});\\n        for (auto word : words)\\n        {\\n            if (word.empty())\\n                continue;\\n            if (isConcatenated(word, 0))\\n                results.push_back(word);\\n            trie.insert(word);\\n        }\\n        return results;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"95646",
			"view":"683",
			"top":"9",
			"title":"Simple C++ 199ms hash map solution (no tries and no dp)",
			"vote":"2",
			"content":"I am so surprised that this simple (kind of brute force) solution can work that good. It basically puts every word into a hash map and then checks if sub-component of each word existed in the hash map recursively.\\n\\n\\n```\\nclass Solution {\\npublic:\\n    vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {\\n        unordered_map<string,bool> dic;\\n        for (int i=0;i<words.size();i++) {\\n            dic[words[i]]=true;\\n        }\\n        \\n        vector<string> res;\\n        for (int i=0;i<words.size();i++) {\\n            if (isConcatenated(words[i],dic,false)) res.push_back(words[i]);\\n        }\\n        return res;\\n    }\\n    \\n    bool isConcatenated(string word, unordered_map<string,bool>& dic, bool compareWholeWord) {\\n        if (word.size()==0) return compareWholeWord;\\n        if (compareWholeWord&&dic.count(word)>0) return dic[word];\\n        for (int len=1;len<word.size();len++) {\\n            if (dic.count(word.substr(0,len))>0&&dic[word.substr(0,len)]) {\\n                if (isConcatenated(word.substr(len),dic,true)) {\\n                    dic[word]=true;\\n                    return true;\\n                }\\n            } \\n        }\\n        return false;\\n    }\\n};\\n```"
		}
	],
	"id":"465",
	"title":"Concatenated Words",
	"content":"Given a list of words (<b>without duplicates</b>), please write a program that returns all concatenated words in the given list of words.\r\n<p>A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> [\"cat\",\"cats\",\"catsdogcats\",\"dog\",\"dogcatsdog\",\"hippopotamuses\",\"rat\",\"ratcatdogcat\"]\r\n\r\n<b>Output:</b> [\"catsdogcats\",\"dogcatsdog\",\"ratcatdogcat\"]\r\n\r\n<b>Explanation:</b> \"catsdogcats\" can be concatenated by \"cats\", \"dog\" and \"cats\"; <br> \"dogcatsdog\" can be concatenated by \"dog\", \"cats\" and \"dog\"; <br>\"ratcatdogcat\" can be concatenated by \"rat\", \"cat\", \"dog\" and \"cat\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The number of elements of the given array will not exceed <code>10,000 </code>\r\n<li>The length sum of elements in the given array will not exceed <code>600,000</code>. </li>\r\n<li>All the input string will only include lower case letters.</li>\r\n<li>The returned elements order does not matter. </li>\r\n</ol>\r\n</p>",
	"frequency":"107",
	"ac_num":"10326"
}