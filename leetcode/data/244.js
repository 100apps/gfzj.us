{
	"difficulty":"2",
	"submit_num":"70329",
	"show_id":"244",
	"leetcode_id":"244",
	"answers":[
		{
			"lc_ans_id":"67028",
			"view":"17725",
			"top":"0",
			"title":"Java Solution using HashMap",
			"vote":"69",
			"content":"    public class WordDistance {\\n    \\n    private Map<String, List<Integer>> map;\\n    \\n    public WordDistance(String[] words) {\\n        map = new HashMap<String, List<Integer>>();\\n        for(int i = 0; i < words.length; i++) {\\n            String w = words[i];\\n            if(map.containsKey(w)) {\\n                map.get(w).add(i);\\n            } else {\\n                List<Integer> list = new ArrayList<Integer>();\\n                list.add(i);\\n                map.put(w, list);\\n            }\\n        }\\n    }\\n\\n    public int shortest(String word1, String word2) {\\n        List<Integer> list1 = map.get(word1);\\n        List<Integer> list2 = map.get(word2);\\n        int ret = Integer.MAX_VALUE;\\n        for(int i = 0, j = 0; i < list1.size() && j < list2.size(); ) {\\n            int index1 = list1.get(i), index2 = list2.get(j);\\n            if(index1 < index2) {\\n                ret = Math.min(ret, index2 - index1);\\n                i++;\\n            } else {\\n                ret = Math.min(ret, index1 - index2);\\n                j++;\\n            }\\n        }\\n        return ret;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"67066",
			"view":"4545",
			"top":"1",
			"title":"9-line O(n) C++ Solution",
			"vote":"21",
			"content":"    class WordDistance {\\n    public:\\n        WordDistance(vector<string>& words) {\\n            for(int i=0;i<words.size();i++)\\n                wordMap[words[i]].push_back(i);\\n        }\\n        int shortest(string word1, string word2) {\\n            int  i=0, j=0, dist = INT_MAX;\\n            while(i < wordMap[word1].size() && j <wordMap[word2].size()) { \\n                dist = min(dist, abs(wordMap[word1][i] - wordMap[word2][j]));\\n                wordMap[word1][i]<wordMap[word2][j]?i++:j++;\\n            }\\n            return dist;\\n        }\\n    private:\\n        unordered_map<string, vector<int>> wordMap;\\n    };"
		},
		{
			"lc_ans_id":"67035",
			"view":"3795",
			"top":"2",
			"title":"Why a O(n^2) preprocessing time while O(1) for shortest not a good idea?",
			"vote":"17",
			"content":"We can use a hash map to store the shortest distances for any pair of words."
		},
		{
			"lc_ans_id":"67061",
			"view":"1715",
			"top":"3",
			"title":"Short'n'Clean O(n) init, O(n) query in Python",
			"vote":"9",
			"content":"    class WordDistance(object):\\n        def __init__(self, words):\\n            self.d = {}\\n            for i, w in enumerate(words):\\n                self.d[w] = self.d.get(w, []) + [i]\\n    \\n        def shortest(self, w1, w2):\\n            a, b = self.d[w1], self.d[w2]\\n            m, n, i, j, res = len(a), len(b), 0, 0, sys.maxsize\\n            while i < m and j < n:\\n                res = min(res, abs(a[i] - b[j]))\\n                if a[i] < b[j]:\\n                    i += 1\\n                else:\\n                    j += 1\\n            return res"
		},
		{
			"lc_ans_id":"67067",
			"view":"1685",
			"top":"4",
			"title":"Clean and concise Java solution. O(n) time",
			"vote":"6",
			"content":"The idea is pretty simple. Memorizing all the positions that each string appears. Put it into a array and store  <String, List<Integer>> as a pair in the hash map. When we need to find the shortest path of two string, just get the two list of these two string. Use two pointers and scan the two lists at the same time. When any pointer reach the end. Stop the loop. When we found out that the first position is greater than the second one. We add one to the second pointer. Else, add to the first pointer. This idea is like always keep minimum difference between the two position and move the two pointers.\\n\\n\\n    \\n    Map<String, List<Integer>> map;\\n    public WordDistance(String[] words) {\\n        map=new HashMap<String, List<Integer>>();\\n        for(int i=0; i<words.length; i++){\\n            String temp=words[i];\\n            if(map.containsKey(temp)){\\n                map.get(temp).add(i);\\n            }else{\\n                List<Integer> list=new ArrayList<Integer>();\\n                list.add(i);\\n                map.put(temp, list);\\n            }\\n        }\\n    }\\n\\n    public int shortest(String word1, String word2) {\\n        int min=Integer.MAX_VALUE;\\n        List<Integer> list1=map.get(word1);\\n        List<Integer> list2=map.get(word2);\\n        int size1=list1.size(), size2=list2.size();\\n        int i=0, j=0;\\n        while(i< size1 && j<size2){\\n            int t1=list1.get(i), t2=list2.get(j);\\n            if(t1<t2){\\n                min=Math.min(min, t2-t1);\\n                i++;\\n            }else{\\n                min=Math.min(min, t1-t2);\\n                j++;\\n            }\\n        }                                \\n        return min;     \\n    }"
		},
		{
			"lc_ans_id":"67075",
			"view":"649",
			"top":"5",
			"title":"Python O(m+n) time solution.",
			"vote":"5",
			"content":"        \\n    def __init__(self, words):\\n        self.dic, self.l = {}, len(words)\\n        for i, w in enumerate(words):\\n            self.dic[w] = self.dic.get(w, []) + [i]\\n\\n    # @param {string} word1\\n    # @param {string} word2\\n    # @return {integer}\\n    # Adds a word into the data structure.\\n    def shortest(self, word1, word2):\\n        l1, l2 = self.dic[word1], self.dic[word2]\\n        i = j = 0\\n        res = self.l\\n        # O(m+n) time complexity\\n        while i < len(l1) and j < len(l2):\\n            res = min(res, abs(l1[i]-l2[j]))\\n            if l1[i] < l2[j]:\\n                i += 1\\n            else:\\n                j += 1\\n        return res"
		},
		{
			"lc_ans_id":"67041",
			"view":"1634",
			"top":"6",
			"title":"Python short solution 92ms using dict",
			"vote":"5",
			"content":"    class WordDistance:\\n        def __init__(self, words):\\n            self.dic = {}\\n            for index, w in enumerate(words):\\n                self.dic[w] = self.dic.get(w, []) + [index]\\n\\n        def shortest(self, word1, word2):\\n            return min(abs(i1 - i2) for i1 in self.dic[word1] for i2 in self.dic[word2])"
		},
		{
			"lc_ans_id":"67078",
			"view":"634",
			"top":"7",
			"title":"Python two solutions.",
			"vote":"3",
			"content":"\\n\\n    class WordDistance(object):\\n        def __init__(self, words):\\n            self.d = collections.defaultdict(list)\\n            for i, w in enumerate(words):\\n                self.d[w].append(i)\\n    \\n        def shortest(self, word1, word2):\\n            return min([abs(n1 - n2) for n1 in self.d[word1] for n2 in self.d[word2]])\\n\\nAbove version is O(m*n). Below is a version with O(m+n): \\n\\n    def shortest(self, word1, word2):\\n        l1 = self.d[word1]\\n        l2 = self.d[word2]\\n        i, j = 0, 0\\n        shortest = sys.maxint\\n        while i < len(l1) and j < len(l2):\\n            shortest = min(shortest, abs(l1[i] - l2[j]))\\n            if l1[i] > l2[j]:\\n                j += 1\\n            else:\\n                i += 1\\n        return shortest\\n\\n\\nSeems like there's no significant speed difference for the current test cases."
		},
		{
			"lc_ans_id":"67080",
			"view":"587",
			"top":"8",
			"title":"*Java* solution with HashMap (17-19 ms)",
			"vote":"2",
			"content":"The idea is to store unique words into a HashMap, where the value of the HashMap is a list of locations of all of the same words.\\n\\n    public class WordDistance {\\n    \\n    private HashMap<String, ArrayList<Integer>> map;\\n    \\n    public WordDistance(String[] words) {\\n        map = new HashMap<String, ArrayList<Integer>>();\\n        for(int i=0, L=words.length; i<L; i++) {\\n            if(!map.containsKey(words[i])) {\\n            \\tArrayList<Integer> list = new ArrayList<Integer>();\\n            \\tlist.add(i);\\n                map.put(words[i], list);\\n            }\\n            else \\n                map.get(words[i]).add(i);\\n        }\\n    }\\n\\n    public int shortest(String word1, String word2) {\\n        ArrayList<Integer> list1 = map.get(word1);\\n        ArrayList<Integer> list2 = map.get(word2);\\n        int size1 = list1.size();\\n        int size2 = list2.size();\\n        int shortest = 0x7fffffff;\\n        int i=0, j=0;\\n        while(i<size1 && j<size2) {\\n            if(shortest==1) return shortest;\\n            int w1 = list1.get(i);\\n            int w2 = list2.get(j);\\n            if(w1 < w2) {\\n                shortest = w2-w1 < shortest ? w2-w1 : shortest;\\n                ++i;\\n            }\\n            else {\\n                shortest = w1-w2 < shortest ? w1-w2 : shortest;\\n                ++j;\\n            }\\n        }\\n        return shortest;\\n    }\\n    }"
		},
		{
			"lc_ans_id":"67088",
			"view":"638",
			"top":"9",
			"title":"56ms C++ solution",
			"vote":"2",
			"content":"    class WordDistance {\\n    public:\\n        WordDistance(vector<string>& words) {\\n            for(int i=0; i<words.size(); ++i)\\n            {\\n                mp[words[i]].push_back(i);\\n            }\\n        }\\n    \\n        int shortest(string word1, string word2) {\\n            vector<int> w1 = mp[word1];\\n            vector<int> w2 = mp[word2];\\n            int res=INT_MAX;\\n            for(int i=0; i<w1.size(); ++i)\\n                for(int j=0; j<w2.size(); ++j)\\n                    res=(abs(w1[i]-w2[j])<res)? abs(w1[i]-w2[j]) : res;\\n            return res;\\n        }\\n    private:\\n        unordered_map<string, vector<int>> mp;\\n    };"
		}
	],
	"id":"244",
	"title":"Shortest Word Distance II",
	"content":"<p>This is a <b>follow up</b> of <a href=\"/problems/shortest-word-distance\">Shortest Word Distance</a>. The only difference is now you are given the list of words and your method will be called <i>repeatedly</i> many times with different parameters. How would you optimize it?</p>\n\n<p>Design a class which receives a list of words in the constructor, and implements a method that takes two words <i>word1</i> and <i>word2</i> and return the shortest distance between these two words in the list.</p>\n\n<p>For example,<br>\nAssume that words = <code>[\"practice\", \"makes\", \"perfect\", \"coding\", \"makes\"]</code>.\n</p>\n\n<p>\nGiven <i>word1</i> = <code>“coding”</code>, <i>word2</i> = <code>“practice”</code>, return 3.<br>\nGiven <i>word1</i> = <code>\"makes\"</code>, <i>word2</i> = <code>\"coding\"</code>, return 1.\n</p>\n\n<p>\n<b>Note:</b><br>\nYou may assume that <i>word1</i> <b>does not equal to</b> <i>word2</i>, and <i>word1</i> and <i>word2</i> are both in the list.\n</p>",
	"frequency":"272",
	"ac_num":"28510"
}