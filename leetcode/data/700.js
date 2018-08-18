{
	"difficulty":"1",
	"submit_num":"16204",
	"show_id":"734",
	"leetcode_id":"734",
	"answers":[
		{
			"lc_ans_id":"109624",
			"view":"516",
			"top":"0",
			"title":"Simple Python Solution - 32ms!",
			"vote":"6",
			"content":"We use a dictionary to map words with their similar words and simply look up the dictionary when we compare pairs of words in `words1` and `words2` by checking if the second word is in the first word's similar word set.\\n\\nFor this pairs of words, the following dict is generated:\\n\\n`[[\"a\", \"b\"], [\"a\", \"c\"], [\"b\", \"d\"]]`\\n\\n```\\n{\\n  \"a\": set([\"b\", \"c\"]),\\n  \"b\": set([\"a\", \"d\"]),\\n  \"c\": set([\"a\"]),\\n  \"d\": set([\"b\"]),\\n}\\n```\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def areSentencesSimilar(self, words1, words2, pairs):\\n        from collections import defaultdict\\n        if len(words1) != len(words2):\\n            return False\\n        words = defaultdict(set)\\n        for word1, word2 in pairs:\\n            words[word1].add(word2)\\n            words[word2].add(word1)\\n        for word1, word2 in zip(words1, words2):\\n            if word1 != word2 and word2 not in words[word1]:\\n                return False\\n        return True\\n```"
		},
		{
			"lc_ans_id":"109633",
			"view":"720",
			"top":"1",
			"title":"Java Super Clean Code (Similarity I and II)",
			"vote":"4",
			"content":"Sentence Similarity I (Transitive is not allowed.)\\n```\\nclass Solution {\\n    public boolean areSentencesSimilar(String[] words1, String[] words2, String[][] pairs) {\\n        if (words1.length != words2.length) {\\n            return false;\\n        }\\n        \\n        Map<String, Set<String>> pairInfo = new HashMap<>();\\n        \\n        for (String[] pair : pairs) {\\n            if (!pairInfo.containsKey(pair[0])) {\\n                pairInfo.put(pair[0], new HashSet<>());\\n            }\\n            if (!pairInfo.containsKey(pair[1])) {\\n                pairInfo.put(pair[1], new HashSet<>());\\n            }\\n            \\n            pairInfo.get(pair[0]).add(pair[1]);\\n            pairInfo.get(pair[1]).add(pair[0]);\\n        }\\n        \\n        for (int i = 0; i < words1.length; i++) {\\n            if (words1[i].equals(words2[i])) continue;\\n            \\n            if (!pairInfo.containsKey(words1[i])) {\\n                return false;    \\n            }\\n            if (!pairInfo.get(words1[i]).contains(words2[i])) {\\n                return false;\\n            }\\n        }\\n        \\n        return true;\\n    }\\n}\\n```\\n\\n\\nSentence Similarity II (Transitive is allowed.)\\nThe idea is simple:\\n1. Build the graph according to the similar word pairs. Each word is a graph node.\\n2. For each word in words1, we do DFS search to see if the corresponding word is existing in words2.\\n\\nSee the clean code below. Happy coding!\\n```\\nclass Solution {\\n    public boolean areSentencesSimilarTwo(String[] words1, String[] words2, String[][] pairs) {\\n        if (words1.length != words2.length) {\\n            return false;\\n        }\\n        \\n        //Build the graph;\\n        Map<String, Set<String>> pairInfo = new HashMap<>();      \\n        for (String[] pair : pairs) {\\n            if (!pairInfo.containsKey(pair[0])) {\\n                pairInfo.put(pair[0], new HashSet<>());\\n            }\\n            if (!pairInfo.containsKey(pair[1])) {\\n                pairInfo.put(pair[1], new HashSet<>());\\n            }         \\n            pairInfo.get(pair[0]).add(pair[1]);\\n            pairInfo.get(pair[1]).add(pair[0]);\\n        }\\n        \\n        for (int i = 0; i < words1.length; i++) {\\n            if (words1[i].equals(words2[i])) continue;         \\n            if (!pairInfo.containsKey(words1[i])) return false;      \\n            if (!dfs(words1[i], words2[i], pairInfo, new HashSet<>())) return false;    //Search the graph.\\n        }\\n        \\n        return true;\\n    }\\n    \\n    public boolean dfs(String source, String target, Map<String, Set<String>> pairInfo, Set<String> visited) {\\n        if (pairInfo.get(source).contains(target)) return true;\\n        \\n        visited.add(source);\\n        for (String next : pairInfo.get(source)) {\\n            if (!visited.contains(next) && dfs(next, target, pairInfo, visited)) {\\n                return true;\\n            }\\n        }\\n        return false;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"109618",
			"view":"1296",
			"top":"2",
			"title":"[Java/C++] Clean Code",
			"vote":"4",
			"content":"**java**\\n```\\nclass Solution {\\n    public boolean areSentencesSimilar(String[] a, String[] b, String[][] pairs) {\\n        if (a.length != b.length) return false;\\n        Map<String, Set<String>> map = new HashMap<>();\\n        for (String[] p : pairs) {\\n            if (!map.containsKey(p[0])) map.put(p[0], new HashSet<>());\\n            map.get(p[0]).add(p[1]);\\n        }\\n\\n        for (int i = 0; i < a.length; i++)\\n            if (!a[i].equals(b[i]) && !map.getOrDefault(a[i], new HashSet<>()).contains(b[i]) && !map.getOrDefault(b[i], new HashSet<>()).contains(a[i]))\\n                return false;\\n        return true;\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    bool areSentencesSimilar(vector<string>& words1, vector<string>& words2, vector<pair<string, string>> pairs) {\\n        if (words1.size() != words2.size()) return false;\\n        map<string, set<string>> map;\\n        for (pair<string, string> p : pairs)\\n            map[p.first].insert(p.second);\\n\\n        for (int i = 0; i < words1.size(); i++)\\n            if (words1[i] != words2[i] && !map[words1[i]].count(words2[i]) && !map[words2[i]].count(words1[i]))\\n                return false;\\n        return true;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109660",
			"view":"148",
			"top":"3",
			"title":"Short Python solution based on dictionary",
			"vote":"3",
			"content":"```\\ndef areSentencesSimilar(self, words1, words2, pairs):\\n    if len(words1) != len(words2): return False\\n    map = defaultdict(set)\\n    for pair in pairs:\\n        map[pair[0]].add(pair[1])\\n    for i in range(len(words1)):\\n        if words1[i] == words2[i] or words1[i] in map[words2[i]] or words2[i] in map[words1[i]]: continue\\n        return False\\n    return True\\n```"
		},
		{
			"lc_ans_id":"109622",
			"view":"221",
			"top":"4",
			"title":"Java solution, HashMap & HashSet",
			"vote":"1",
			"content":"Time complexity: O(nk), space complexity O(nk). n is number of words, k is the average length of words.\\n```\\nclass Solution {\\n    public boolean areSentencesSimilar(String[] words1, String[] words2, String[][] pairs) {\\n        if (words1.length != words2.length) return false;\\n        Map<String, Set<String>> map = new HashMap<>();\\n        \\n        for (String[] p : pairs) {\\n            Set<String> set0 = map.getOrDefault(p[0], new HashSet<>());\\n            set0.add(p[1]);\\n            map.put(p[0], set0);\\n            \\n            Set<String> set1 = map.getOrDefault(p[1], new HashSet<>());\\n            set1.add(p[0]);\\n            map.put(p[1], set1);\\n        }\\n        \\n        for (int i = 0; i < words1.length; i++) {\\n            if (words1[i].equals(words2[i])) continue;\\n            if (map.containsKey(words1[i]) && map.get(words1[i]).contains(words2[i])) continue;\\n            return false;\\n        }\\n        \\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109635",
			"view":"243",
			"top":"5",
			"title":"Easy brute-force C++",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    bool areSentencesSimilar(vector<string>& words1, vector<string>& words2, vector<pair<string, string>> pairs) {\\n        if(words1.empty() && words2.empty())\\n            return true;\\n        if((words1.empty() || words2.empty()) || words1.size()!=words2.size()) \\n            return false;\\n        \\n        bool found=false;\\n        for(int i=0; i<words1.size(); i++) {\\n            found=false;\\n            for(int j=0; j<pairs.size(); j++) {\\n                if(words1[i] == pairs[j].first) {\\n                    if(words2[i] == pairs[j].second)\\n                        found=true;\\n                }\\n                if(words1[i] == pairs[j].second) {\\n                    if(words2[i] == pairs[j].first)\\n                        found=true;\\n                }\\n                if(words1[i] == words2[i])\\n                    found=true;\\n            }\\n            if(!found)\\n                return false;\\n        }\\n        \\n        return true;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109617",
			"view":"8",
			"top":"6",
			"title":"HashMap with HashSet(Java)",
			"vote":"0",
			"content":"```\\nclass Solution {\\n    public boolean areSentencesSimilar(String[] words1, String[] words2, String[][] pairs) {\\n        Map<String, Set<String>> table = new HashMap<String, Set<String>>();\\n        int len1 = words1.length;\\n        int len2 = words2.length;\\n        if(len1 != len2)\\n            return false;\\n        for(String [] pair : pairs) {\\n            if(!table.containsKey(pair[0])) {\\n                Set<String> set = new HashSet<String>();\\n                table.put(pair[0], set);\\n            }                \\n            table.get(pair[0]).add(pair[1]);\\n        }\\n        for(int i = 0; i < len1; i++) {\\n            if(!(words1[i].equals(words2[i]) \\n                 || match(table, words1[i], words2[i]) \\n                 || match(table, words2[i], words1[i])))\\n                return false;\\n        }\\n        return true;\\n    }\\n                   \\n    private boolean match(Map<String, Set<String>> table, String word1, String word2) {\\n        if(table.containsKey(word1)) \\n            return table.get(word1).contains(word2);\\n        return false;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109619",
			"view":"25",
			"top":"7",
			"title":"a question about a testcase",
			"vote":"0",
			"content":"Hi, I have a question about a custom testcase, say we have the following as testcase, the expected answer gave false, if we consider a <-> g, h <-> d and c <-> b within the pairs, shouldn't it be true?\\n\\n    [\"a\",\"h\",\"c\"]\\n    [\"b\",\"g\",\"d\"]\\n    [[\"a\",\"g\"],[\"h\",\"g\"],[\"h\",\"d\"],[\"c\",\"b\"]]"
		},
		{
			"lc_ans_id":"109620",
			"view":"16",
			"top":"8",
			"title":"A simple C solution[Accepted]",
			"vote":"0",
			"content":"```\\nbool compare(char* s,char* p)\\n{\\n    if(strlen(s)!=strlen(p))\\n    {return false;}\\n    while(*s!='\\\\0')\\n    {\\n        if((*s)!=(*p))\\n        {\\n            return false;\\n        }\\n        s++;\\n        p++;\\n    }\\n    return true;\\n}\\nbool areSentencesSimilar(char** words1, int words1Size, char** words2, int words2Size, char*** pairs, int pairsRowSize, int pairsColSize) {\\n    int flag=0;\\n    if(words1Size!=words2Size)\\n    {return false;}\\n    for(int i=0;i<words1Size;i++)\\n    { \\n        if(compare(words1[i],words2[i]))\\n        {continue;}\\n        else\\n        {\\n            int flag=0;\\n            for(int j=0;j<pairsRowSize;j++)\\n            {\\n                for(int k=0;k<pairsColSize;k++)\\n                { \\n                    if(compare(words1[i],pairs[j][k]))\\n                    {\\n                        if((k==0&&compare(words2[i],pairs[j][k+1]))||(k==1&&compare(words2[i],pairs[j][k-1])))\\n                        { \\n                            flag=1;\\n                            break;\\n                        }          \\n                    }\\n                }\\n                if(flag==1)\\n                {break;}\\n            }\\n            if(flag==0)\\n            {return false;}\\n        }\\n    }\\n    return true;\\n}\\n````"
		},
		{
			"lc_ans_id":"109621",
			"view":"18",
			"top":"9",
			"title":"Trivial Python solution using set comprehension",
			"vote":"0",
			"content":"    def areSentencesSimilar(self, words1, words2, pairs):\\n        if len(words1) != len(words2): return False\\n        s = {tuple(p) for p in pairs}\\n        return all(\\n            (w1 == w2) or ((w1,w2) in s) or ((w2,w1) in s)\\n            for w1,w2 in zip(words1, words2))"
		}
	],
	"id":"700",
	"title":"Sentence Similarity",
	"content":"<p>Given two sentences <code>words1, words2</code> (each represented as an array of strings), and a list of similar word pairs <code>pairs</code>, determine if two sentences are similar.</code>\r\n</p><p>\r\nFor example, \"great acting skills\" and \"fine drama talent\" are similar, if the similar word pairs are <code>pairs = [[\"great\", \"fine\"],\r\n [\"acting\",\"drama\"], [\"skills\",\"talent\"]]</code>.\r\n</p><p>\r\nNote that the similarity relation is not transitive. For example, if \"great\" and \"fine\" are similar, and \"fine\" and \"good\" are similar, \"great\" and \"good\" are <b>not</b> necessarily similar.\r\n</p><p>\r\nHowever, similarity is symmetric.  For example, \"great\" and \"fine\" being similar is the same as \"fine\" and \"great\" being similar.\r\n</p><p>\r\nAlso, a word is always similar with itself.  For example, the sentences <code>words1 = [\"great\"], words2 = [\"great\"], pairs = []</code> are similar, even though there are no specified similar word pairs.\r\n</p><p>\r\nFinally, sentences can only be similar if they have the same number of words.  So a sentence like <code>words1 = [\"great\"]</code> can never be similar to <code>words2 = [\"doubleplus\",\"good\"]</code>.\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>The length of <code>words1</code> and <code>words2</code> will not exceed <code>1000</code>.</li>\r\n<li>The length of <code>pairs</code> will not exceed <code>2000</code>.</li>\r\n<li>The length of each <code>pairs[i]</code> will be <code>2</code>.</li>\r\n<li>The length of each <code>words[i]</code> and <code>pairs[i][j]</code> will be in the range <code>[1, 20]</code>.</li>\r\n</p>",
	"frequency":"67",
	"ac_num":"6243"
}