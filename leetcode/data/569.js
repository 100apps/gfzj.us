{
	"difficulty":"3",
	"submit_num":"6429",
	"show_id":"588",
	"leetcode_id":"588",
	"answers":[
		{
			"lc_ans_id":"103331",
			"view":"2326",
			"top":"0",
			"title":"Java Solution, File class",
			"vote":"11",
			"content":"```\\npublic class FileSystem {\\n    class File {\\n        boolean isFile = false;\\n        Map<String, File> children = new HashMap<>();\\n        String content = \"\";\\n    }\\n    \\n    File root = null;\\n    \\n    public FileSystem() {\\n        root = new File();\\n    }\\n    \\n    public List<String> ls(String path) {\\n        String[] dirs = path.split(\"/\");\\n        File node = root;\\n        List<String> result = new ArrayList<>();\\n        String name = \"\";\\n        for (String dir : dirs) {\\n            if (dir.length() == 0) continue;\\n            if (!node.children.containsKey(dir)) {\\n                return result;\\n            }\\n            node = node.children.get(dir);\\n            name = dir;\\n        }\\n        \\n        if (node.isFile) {\\n            result.add(name);\\n        }\\n        else {\\n            for (String key : node.children.keySet()) {\\n                result.add(key);\\n            }\\n        }\\n        \\n        Collections.sort(result);\\n        \\n        return result;\\n    }\\n    \\n    public void mkdir(String path) {\\n        String[] dirs = path.split(\"/\");\\n        File node = root;\\n        for (String dir : dirs) {\\n            if (dir.length() == 0) continue;\\n            if (!node.children.containsKey(dir)) {\\n                File file = new File();\\n                node.children.put(dir, file);\\n            }\\n            node = node.children.get(dir);\\n        }\\n    }\\n    \\n    public void addContentToFile(String filePath, String content) {\\n        String[] dirs = filePath.split(\"/\");\\n        File node = root;\\n        for (String dir : dirs) {\\n            if (dir.length() == 0) continue;\\n            if (!node.children.containsKey(dir)) {\\n                File file = new File();\\n                node.children.put(dir, file);\\n            }\\n            node = node.children.get(dir);\\n        }\\n        node.isFile = true;\\n        node.content += content;\\n    }\\n    \\n    public String readContentFromFile(String filePath) {\\n        String[] dirs = filePath.split(\"/\");\\n        File node = root;\\n        for (String dir : dirs) {\\n            if (dir.length() == 0) continue;\\n            if (!node.children.containsKey(dir)) {\\n                File file = new File();\\n                node.children.put(dir, file);\\n            }\\n            node = node.children.get(dir);\\n        }\\n\\n        return node.content;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103329",
			"view":"715",
			"top":"1",
			"title":"C++ Trie Solution",
			"vote":"7",
			"content":"```\\nclass FileSystem {\\nprivate:\\n    struct TrieNode {\\n        bool isFile;\\n        string content;\\n        unordered_map<string, TrieNode *> children;\\n        TrieNode() : isFile(false) {}\\n    };\\n\\n    TrieNode *root;\\n    \\npublic:\\n    FileSystem() {\\n        root = new TrieNode();\\n    }\\n    \\n    vector<string> getStrs(string &path) {\\n        vector<string> ans;\\n        int i = 1, j = 1;\\n        while (j <= path.length()) {\\n            if (i != j && (j == path.length() || path[j] == '/')) {\\n                ans.push_back(path.substr(i, j - i));\\n                i = j + 1;\\n            }\\n            ++j;\\n        }\\n        return ans;\\n    }\\n    \\n    vector<string> ls(string path) {\\n        vector<string> strs = getStrs(path);\\n        TrieNode *curr = root;\\n        for (string &str : strs)\\n            curr = curr->children[str];\\n        \\n        if (curr->isFile)\\n            return {strs.back()};\\n        \\n        vector<string> ans;\\n        for (auto &p : curr->children)\\n            ans.push_back(p.first);\\n        sort(ans.begin(), ans.end());\\n        return ans;\\n    }\\n    \\n    void mkdir(string path) {\\n        vector<string> strs = getStrs(path);\\n        TrieNode *curr = root;\\n        for (string &str : strs) {\\n            if (!curr->children.count(str))\\n                curr->children[str] = new TrieNode();\\n            curr = curr->children[str];\\n        }\\n    }\\n    \\n    void addContentToFile(string filePath, string content) {\\n        vector<string> strs = getStrs(filePath);\\n        TrieNode *curr = root;\\n        for (string &str : strs) {\\n            if (!curr->children.count(str))\\n                curr->children[str] = new TrieNode();\\n            curr = curr->children[str];\\n        }\\n        curr->isFile = true;\\n        curr->content += content;\\n    }\\n    \\n    string readContentFromFile(string filePath) {\\n        vector<string> strs = getStrs(filePath);\\n        TrieNode *curr = root;\\n        for (string &str : strs)\\n            curr = curr->children[str];\\n        return curr->content;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"103362",
			"view":"341",
			"top":"2",
			"title":"Straightforward Python Solution",
			"vote":"4",
			"content":"I uses a dictionary of recursing dictionaries to model the file system tree. There's quite a bit of repetition in the code for traversing the file directories but it should still be quite straightforward.\\n\\n```\\ndef path_split(path):\\n    return [frag for frag in path.split('/') if frag.strip() != '']\\n\\nclass FileSystem(object):\\n\\n    def __init__(self):\\n        self.fs = {}\\n    \\n    def ls(self, path):\\n        \"\"\"\\n        :type path: str\\n        :rtype: List[str]\\n        \"\"\"\\n        curr = self.fs\\n        frags = path_split(path)\\n        for frag in frags:\\n            if frag not in curr:\\n                curr[frag] = {}\\n            curr = curr[frag]\\n            if type(curr) == unicode:\\n                return [frags[-1]]\\n        return sorted(curr.keys())\\n\\n    def mkdir(self, path):\\n        \"\"\"\\n        :type path: str\\n        :rtype: void\\n        \"\"\"\\n        curr = self.fs\\n        frags = path_split(path)\\n        for frag in frags:\\n            if frag not in curr:\\n                curr[frag] = {}\\n            curr = curr[frag]\\n        \\n\\n    def addContentToFile(self, filePath, content):\\n        \"\"\"\\n        :type filePath: str\\n        :type content: str\\n        :rtype: void\\n        \"\"\"\\n        curr = self.fs\\n        frags = path_split(filePath)\\n        for frag in frags[:-1]:\\n            if frag not in curr:\\n                curr[frag] = {}\\n            curr = curr[frag]\\n        file_name = frags[-1]\\n        if file_name not in curr:\\n            curr[file_name] = ''\\n        curr[file_name] += content\\n        \\n\\n    def readContentFromFile(self, filePath):\\n        \"\"\"\\n        :type filePath: str\\n        :rtype: str\\n        \"\"\"\\n        curr = self.fs\\n        frags = path_split(filePath)\\n        for frag in frags[:-1]:\\n            if frag not in curr:\\n                curr[frag] = {}\\n            curr = curr[frag]\\n        file_name = frags[-1]\\n        return curr[file_name]\\n\\n\\n# Your FileSystem object will be instantiated and called as such:\\n# obj = FileSystem()\\n# param_1 = obj.ls(path)\\n# obj.mkdir(path)\\n# obj.addContentToFile(filePath,content)\\n# param_4 = obj.readContentFromFile(filePath)\\n```"
		},
		{
			"lc_ans_id":"103334",
			"view":"400",
			"top":"3",
			"title":"Java Solution using Trie. No need to sort.",
			"vote":"2",
			"content":"```\\npublic class FileSystem {\\n    \\n    class Node {\\n        int type = 0; // 1 - dir ; 2 - file\\n        StringBuilder content;\\n        Node [] children = new Node[27];\\n    }\\n    \\n    Node root;\\n\\n    public FileSystem() {\\n        root = new Node();\\n        root.type = 1;\\n        root.children[26] = new Node();\\n    }\\n    \\n    Node traverse(String s, int type) {\\n        Node node = root;\\n        for (int i = 0; i < s.length(); i++) {\\n            int next = s.charAt(i) == '/' ? 26 : s.charAt(i) - 'a';\\n            if (node.children[next] == null) {\\n                node.children[next] = new Node();\\n            }\\n            node = node.children[next];\\n            if (i + 1 < s.length() && s.charAt(i + 1) == '/') {\\n                node.type = 1;\\n            }\\n        }\\n        if (node.type == 0) {\\n            node.type = type;\\n        }\\n        return node;\\n    }\\n   \\n    void dfs(List<String> list, Node root, StringBuilder sb) {\\n        if (root.type > 0) {\\n            list.add(sb.toString());\\n        }\\n        for (int i = 0; i < 26; i++) {\\n            if (root.children[i] != null) {\\n                sb.append((char)('a' + i));\\n                dfs(list, root.children[i], sb);\\n                sb.deleteCharAt(sb.length() - 1);\\n            }\\n        }\\n    }\\n    \\n    public List<String> ls(String path) {\\n        List<String> list = new ArrayList<>();\\n        if (\"/\".equals(path)) {\\n            dfs(list, root.children[26], new StringBuilder());\\n            return list;\\n        }\\n        \\n        Node node = traverse(path, 1);\\n\\n        if (node.type == 2) {\\n            int k = path.length() - 1;\\n            while (k >= 0 && path.charAt(k) != '/') {\\n                k--;\\n            }\\n            list.add(path.substring(k + 1));\\n        } else {\\n            if (node.children[26] == null) {\\n                return list;\\n            }\\n            dfs(list, node.children[26], new StringBuilder());\\n        }\\n        return list;\\n    }\\n    \\n    public void mkdir(String path) {\\n        traverse(path, 1);\\n    }\\n    \\n    public void addContentToFile(String filePath, String content) {\\n        Node node = traverse(filePath, 2);\\n        if (node.content == null) {\\n            node.content = new StringBuilder();\\n        }\\n        node.content.append(content);\\n    }\\n    \\n    public String readContentFromFile(String filePath) {\\n        Node node = traverse(filePath, 2);\\n        if (node.content == null) {\\n            return \"\";\\n        }\\n        return node.content.toString();\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"103359",
			"view":"298",
			"top":"4",
			"title":"Python, Straightforward with Explanation",
			"vote":"2",
			"content":"We'll keep two structures, ```self.fs``` being a Trie, and ```self.fileinfo``` being a dictionary mapping filepaths to the string content in their files.  For convenience, we can use a nested defaultdict structure instead of a proper Trie object.  This means we should exercise caution as our call to ```TrieNode.__getitem__(child)``` has potential side effects if ```child``` is not in the node, but otherwise our code is very similar.\\n\\n```\\nTrie = lambda: collections.defaultdict(Trie)\\n\\nclass FileSystem(object):\\n    def __init__(self):\\n        self.fs = Trie()\\n        self.fileinfo = collections.defaultdict(str)\\n        \\n    def ls(self, path):\\n        if path in self.fileinfo:\\n            return path.split('/')[-1:]\\n\\n        cur = self.fs\\n        for token in path.split('/'):\\n            if token in cur:\\n                cur = cur[token]\\n            elif token:\\n                return []\\n\\n        return sorted(cur.keys())\\n\\n    def mkdir(self, path):\\n        cur = self.fs\\n        for token in path.split('/'):\\n            if token: cur = cur[token]\\n\\n    def addContentToFile(self, filePath, content):\\n        self.mkdir(filePath)\\n        self.fileinfo[filePath] += content\\n\\n    def readContentFromFile(self, filePath):\\n        return self.fileinfo[filePath]\\n```\\n\\n\\nHere is the same solution using a TrieNode object.\\n\\n```\\nclass Node(object):\\n    def __init__(self):\\n        self.children = {}\\n        \\n    def setdefault(self, token):\\n        return self.children.setdefault(token, Node())\\n        \\n    def get(self, token):\\n        return self.children.get(token, None)\\n                          \\nclass FileSystem(object):\\n    def __init__(self):\\n        self.root = Node()\\n        self.fileinfo = collections.defaultdict(str)\\n        \\n    def ls(self, path):\\n        if path in self.fileinfo:\\n            return path.split('/')[-1:]\\n\\n        cur = self.root\\n        for token in path.split('/'):\\n            if cur and token:\\n                cur = cur.get(token)\\n\\n        return sorted(cur.children.keys()) if cur else []\\n\\n    def mkdir(self, path):\\n        cur = self.root\\n        for token in path.split('/'):\\n            if token: cur = cur.setdefault(token)\\n```"
		},
		{
			"lc_ans_id":"103336",
			"view":"123",
			"top":"5",
			"title":"Java modified Trie solution",
			"vote":"1",
			"content":"``` java\\nclass Directory {\\n    // TrieNode\\n    public Map<String, Object> contents;\\n    public Directory() {\\n        this.contents = new TreeMap<>();\\n    }\\n}\\n\\npublic class FileSystem {\\n\\n    private Directory root;\\n    public FileSystem() {\\n        root = new Directory();\\n    }\\n    \\n    public List<String> ls(String path) {\\n        List<String> ans = new ArrayList<>();\\n        if (path.equals(\"/\")) {\\n            ans.addAll(root.contents.keySet());\\n            return ans;\\n        }\\n        String[] nodes = path.split(\"/\");\\n        int n = nodes.length;\\n        Directory p = root;\\n        for (int i = 1; i < n - 1; i++) {\\n            p = (Directory) p.contents.get(nodes[i]);\\n        }\\n        Object last = p.contents.get(nodes[n - 1]);\\n        if (last instanceof Directory) {\\n            p = (Directory) last;\\n            ans.addAll(p.contents.keySet());\\n        } else {\\n            ans.add(nodes[n - 1]);\\n        }\\n        return ans;\\n    }\\n    \\n    public void mkdir(String path) {\\n        String[] nodes = path.split(\"/\");\\n        Directory p = root;\\n        for (int i = 1; i < nodes.length; i++) {\\n            if (!p.contents.containsKey(nodes[i])) {\\n                p.contents.put(nodes[i], new Directory());\\n            }\\n            p = (Directory) p.contents.get(nodes[i]);\\n        }\\n    }\\n    \\n    public void addContentToFile(String filePath, String content) {\\n        String[] nodes = filePath.split(\"/\");\\n        Directory p = root;\\n        for (int i = 1; i < nodes.length - 1; i++) {\\n            p = (Directory) p.contents.get(nodes[i]);\\n        }\\n        String fileName = nodes[nodes.length - 1];\\n        p.contents.put(fileName, p.contents.getOrDefault(fileName, \"\") + content);\\n    }\\n    \\n    public String readContentFromFile(String filePath) {\\n        String[] nodes = filePath.split(\"/\");\\n        Directory p = root;\\n        for (int i = 1; i < nodes.length - 1; i++) {\\n            p = (Directory) p.contents.get(nodes[i]);\\n        }\\n        return (String) p.contents.get(nodes[nodes.length - 1]);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103337",
			"view":"356",
			"top":"6",
			"title":"C++ fast no user defined types needed",
			"vote":"1",
			"content":"``` \\nclass FileSystem {\\npublic:\\n\\n\\tunordered_map<string, set<string>> dTable;  // dir name to contents\\n\\tunordered_map<string, string> fTable; //file name to contents \\n\\n\\npublic:\\n\\tFileSystem() {\\n\\t    dTable[\"/\"];\\n\\t}\\n\\n\\tvector<string> ls(string path) {\\n\\t\\tvector<string> res;\\n\\t\\tif (fTable.find(path) != fTable.end())\\n\\t\\t{\\n\\t\\t\\tint i = path.length() - 1;\\n\\n\\t\\t\\twhile (i >= 0 && path[i] != '/') --i;\\n\\n\\t\\t\\tres.push_back(path.substr(i + 1));\\n\\t\\t\\treturn res;\\n\\t\\t}\\n\\n\\t\\tif (dTable.find(path) != dTable.end())\\n\\t\\t{\\n\\t\\t\\tfor (auto s : dTable[path])\\n\\t\\t\\t\\tres.push_back(s);\\n\\t\\t}\\n\\n\\t\\treturn res;\\n\\t}\\n\\n\\tvoid mkdir(string path) {\\n\\t\\tstring prev = \"/\";\\n\\t\\tint prevPos = 1;\\n\\t\\tfor (int i = 1; i <= path.size(); ++i)\\n\\t\\t{\\n\\t\\t\\tif (path[i] == '/' || path[i] == 0)\\n\\t\\t\\t{\\n\\t\\t\\t\\tdTable[prev].insert(path.substr(prevPos, i - prevPos));\\n\\t\\t\\t\\tprevPos = i+1;\\n\\t\\t\\t\\tprev = path.substr(0, i);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n\\n\\tvoid addContentToFile(string filePath, string content) {\\n\\n\\t\\tint i = filePath.length() - 1;\\n\\n\\t\\twhile (i >= 0 && filePath[i] != '/') --i;\\n\\t\\t\\n\\t\\tstring path = filePath.substr(0, i);\\n\\t\\tstring file = filePath.substr(i + 1);\\n\\n\\t\\tif (path.empty()) path = \"/\";\\n\\n\\t\\tif (dTable.find(path) == dTable.end())\\n\\t\\t\\tmkdir(path);\\n\\t\\t\\n\\t\\tdTable[path].insert(file);\\n\\n\\t\\tfTable[filePath].append(content);\\n\\t\\t\\n\\t}\\n\\n\\tstring readContentFromFile(string filePath) {\\n\\t\\tif (fTable.find(filePath) != fTable.end())\\n\\t\\t\\treturn fTable[filePath];\\n\\t\\treturn \"\";\\n\\t}\\n};"
		},
		{
			"lc_ans_id":"103360",
			"view":"358",
			"top":"7",
			"title":"File system as a tree - Java",
			"vote":"1",
			"content":"```\\npublic class FileSystem {\\n    \\n    private class TreeNode implements Comparable<TreeNode> {\\n        String label;\\n        boolean isDir;\\n        Map<String, TreeNode> dirContents = new TreeMap<>();\\n        String fileContents;\\n        \\n        public int compareTo(TreeNode other) {\\n            return label.compareTo(other.label);\\n        }\\n        \\n        public int hashCode() {\\n            return Objects.hash(label);\\n        }\\n        \\n        public boolean equals(Object treeNode) {\\n            TreeNode other = (TreeNode) treeNode;\\n            return Objects.equals(label, other.label);\\n        }\\n    }    \\n    \\n    private TreeNode sentinel = new TreeNode();\\n\\n    public FileSystem() {\\n        TreeNode root = new TreeNode();\\n        root.label = \"\";\\n        root.isDir = true;\\n        sentinel.dirContents.put(\"\", root);\\n    }\\n    \\n    public List<String> ls(String path) {\\n        String[] labels = path.split(\"/\");\\n        TreeNode curr = (labels.length != 0) ? sentinel : sentinel.dirContents.get(\"\");\\n        List<String> result = new ArrayList<>();\\n        for(String label : labels) {\\n            curr = curr.dirContents.get(label);\\n            System.out.println(\">>\" + curr);\\n        }\\n        if(curr.isDir) {\\n            for(String label : curr.dirContents.keySet()) {\\n                result.add(label);\\n            }\\n        }\\n        else {\\n            result.add(curr.label);\\n        }\\n        \\n        return result;\\n    }\\n    \\n    public void mkdir(String path) {\\n        String[] labels = path.split(\"/\");\\n        TreeNode curr = sentinel;\\n        int currIndex = 0;\\n        for(String label : labels) {\\n            TreeNode next = curr.dirContents.get(label);\\n            if(next == null) {\\n                break;\\n            }\\n            currIndex++;\\n            curr = next;\\n        }\\n        \\n        for(int i = currIndex; i < labels.length; i++) {\\n            TreeNode newDir = new TreeNode();\\n            newDir.isDir = true;\\n            newDir.label = labels[i];\\n            curr.dirContents.put(labels[i], newDir);\\n            \\n            curr = newDir;\\n        }\\n    }\\n    \\n    public void addContentToFile(String filePath, String content) {\\n        String[] labels = filePath.split(\"/\");\\n        TreeNode curr = sentinel, prev = null;\\n        \\n        for(String label : labels) {\\n            prev = curr;\\n            if(curr == null) {\\n                break;\\n            }\\n            curr = curr.dirContents.get(label);\\n        }\\n        \\n        if(curr == null) {\\n            curr = new TreeNode();\\n            curr.isDir = false;\\n            curr.label = labels[labels.length - 1];\\n            curr.fileContents = content;\\n            prev.dirContents.put(curr.label, curr);\\n        }\\n        else {\\n            curr.fileContents = curr.fileContents == null ? content : curr.fileContents + content;\\n        }\\n    }\\n    \\n    public String readContentFromFile(String filePath) {\\n        String[] labels = filePath.split(\"/\");\\n        TreeNode curr = sentinel;\\n        \\n        for(String label : labels) {\\n            curr = curr.dirContents.get(label);\\n        }\\n        \\n        return (curr.fileContents == null) ? \"\" : curr.fileContents;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103326",
			"view":"28",
			"top":"8",
			"title":"My Straight Forward Trie based C++ Solution",
			"vote":"0",
			"content":"```c++\\nclass Node {\\npublic:\\n    string name;\\n    string content;\\n    bool isFile;\\n    map<string, Node*> next;\\n    Node(string label): name(label), content(\"\"), isFile(false) {}\\n};\\n\\nclass FileSystem {\\npublic:\\n    FileSystem() {\\n        root = new Node(\"/\");\\n    }\\n\\n    /* Get the target node and get all of its children */\\n    vector<string> ls(string path) {\\n        vector<string> res;        \\n        Node* t = find(path);\\n        if (t->isFile) {\\n            res.push_back(t->name);\\n        } else {\\n            for (auto entry : t->next) {\\n                res.push_back(entry.first);\\n            }\\n        }\\n        return res;\\n    }\\n    \\n    /* Add the node */\\n    void mkdir(string path) {\\n        addPath(path);\\n    }\\n    \\n    /* Add the node and save the content*/\\n    void addContentToFile(string filePath, string content) {\\n        Node* t = addPath(filePath);\\n        t->content += content;\\n        t->isFile = true;\\n    }\\n\\n    /*1. Find the target node. 2. Get the content*/\\n    string readContentFromFile(string filePath) {\\n        Node* t = find(filePath);\\n        return t->content;\\n    }\\n    \\nprivate:\\n    /** Find the node according to given path */\\n    Node* find(string& path) {\\n        istringstream in(path.substr(1));\\n        string token;\\n        Node* t = root;\\n        \\n        while (getline(in, token, '/')) {\\n            t = t->next[token];\\n        }\\n        return t;\\n    }\\n    \\n    /** Add node according to given path */\\n    Node* addPath(string& path) {\\n        istringstream in(path.substr(1));\\n        string token;\\n        Node* t = root;\\n        \\n        while (getline(in, token, '/')) {\\n            if (!t->next[token]) {\\n                t->next[token] = new Node(token);\\n            }\\n            t = t->next[token];\\n        }\\n        return t;\\n    }\\n    \\n    Node* root;\\n};\\n\\n\\n```"
		},
		{
			"lc_ans_id":"103327",
			"view":"27",
			"top":"9",
			"title":"C++ clean solution",
			"vote":"0",
			"content":"```\\nclass FileSystem {\\npublic:\\n    FileSystem() {\\n        \\n    }\\n    \\n    vector<string> ls(string path) {\\n        auto pn = GetNode(path);\\n        if(pn->is_file) return {pn->name};\\n        vector<string> vs;\\n        for(auto& p:pn->childs) vs.push_back(p.first);\\n        return vs;\\n    }\\n    \\n    void mkdir(string path) {\\n        auto pn = GetNode(path);\\n    }\\n    \\n    void addContentToFile(string filePath, string content) {\\n        auto pn = GetNode(filePath);\\n        pn->is_file = true;\\n        pn->content += content;\\n    }\\n    \\n    string readContentFromFile(string filePath) {\\n        auto pn = GetNode(filePath);\\n        return pn->content;\\n    }\\n\\nprivate:\\n    struct Node{\\n        string name;\\n        string content;\\n        bool is_file = false;\\n        map<string, Node*> childs;           \\n    };\\n    \\n    Node* GetNode(const string& path){\\n        auto p = root;\\n        stringstream ss(path);\\n        string token;\\n        while(std::getline(ss, token, '/')) {            \\n            if(token.empty()) continue;            \\n            if(p->childs.find(token) == p->childs.end()){\\n                p->childs[token] = new Node();\\n            }            \\n            p = p->childs[token];\\n            p->name = token;\\n        }            \\n        return p;\\n    }    \\n    \\n    Node* root = new Node();  \\n};\\n```"
		}
	],
	"id":"569",
	"title":"Design In-Memory File System",
	"content":"<p>Design an in-memory file system to simulate the following functions:</p>\r\n\r\n<p><code>ls</code>: Given a path in string format. If it is a file path, return a list that only contains this file's name. If it is a directory path, return the list of file and directory names <b>in this directory</b>. Your output (file and directory names together) should in <b>lexicographic order</b>.</p>\r\n\r\n<p><code>mkdir</code>: Given a <b>directory path</b> that does not exist, you should make a new directory according to the path. If the middle directories in the path don't exist either, you should create them as well. This function has void return type. </p>\r\n\r\n<p><code>addContentToFile</code>: Given a <b>file path</b> and <b>file content</b> in string format. If the file doesn't exist, you need to create that file containing given content. If the file already exists, you need to <b>append</b> given content to original content. This function has void return type.</p>\r\n\r\n<p><code>readContentFromFile</code>: Given a <b>file path</b>, return its <b>content</b> in string format.</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\n[\"FileSystem\",\"ls\",\"mkdir\",\"addContentToFile\",\"ls\",\"readContentFromFile\"]\r\n[[],[\"/\"],[\"/a/b/c\"],[\"/a/b/c/d\",\"hello\"],[\"/\"],[\"/a/b/c/d\"]]\r\n<b>Output:</b>\r\n[null,[],null,null,[\"a\"],\"hello\"]\r\n<b>Explanation:</b>\r\n<img src=\"https://leetcode.com/static/images/problemset/filesystem.png\" width = \"66%\" alt=\"filesystem\"/>\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>You can assume all file or directory paths are absolute paths which begin with <code>/</code> and do not end with <code>/</code> except that the path is just <code>\"/\"</code>.</li>\r\n<li>You can assume that all operations will be passed valid parameters and users will not attempt to retrieve file content or list a directory or file that does not exist.</li>\r\n<li>You can assume that all directory names and file names only contain lower-case letters, and same names won't exist in the same directory.</li>\r\n</ol>\r\n</p>",
	"frequency":"46",
	"ac_num":"2344"
}