{
	"difficulty":"2",
	"submit_num":"27727",
	"show_id":"692",
	"leetcode_id":"692",
	"answers":[
		{
			"lc_ans_id":"108346",
			"view":"4335",
			"top":"0",
			"title":"My simple Java solution using HashMap & PriorityQueue - O(nlogk) time & O(n) space",
			"vote":"12",
			"content":"The idea is to keep a count of each word in a HashMap and then insert in a Priority Queue.\\nWhile inserting in pq, if the count of two words is same then insert based on string compare of the keys.\\n```\\nclass Solution {\\n    public List<String> topKFrequent(String[] words, int k) {\\n        \\n        List<String> result = new LinkedList<>();\\n        Map<String, Integer> map = new HashMap<>();\\n        for(int i=0; i<words.length; i++)\\n        {\\n            if(map.containsKey(words[i]))\\n                map.put(words[i], map.get(words[i])+1);\\n            else\\n                map.put(words[i], 1);\\n        }\\n        \\n        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>(\\n                 (a,b) -> a.getValue()==b.getValue() ? b.getKey().compareTo(a.getKey()) : a.getValue()-b.getValue()\\n        );\\n        \\n        for(Map.Entry<String, Integer> entry: map.entrySet())\\n        {\\n            pq.offer(entry);\\n            if(pq.size()>k)\\n                pq.poll();\\n        }\\n\\n        while(!pq.isEmpty())\\n            result.add(0, pq.poll().getKey());\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108348",
			"view":"1530",
			"top":"1",
			"title":"Python 3 solution with O(nlogk) and O(n)",
			"vote":"9",
			"content":"```\\nimport collections\\nimport heapq\\nimport functools\\n\\n@functools.total_ordering\\nclass Element:\\n    def __init__(self, count, word):\\n        self.count = count\\n        self.word = word\\n        \\n    def __lt__(self, other):\\n        if self.count == other.count:\\n            return self.word > other.word\\n        return self.count < other.count\\n    \\n    def __eq__(self, other):\\n        return self.count == other.count and self.word == other.word\\n\\nclass Solution(object):\\n    def topKFrequent(self, words, k):\\n        \"\"\"\\n        :type words: List[str]\\n        :type k: int\\n        :rtype: List[str]\\n        \"\"\"\\n        counts = collections.Counter(words)   \\n        \\n        freqs = []\\n        heapq.heapify(freqs)\\n        for word, count in counts.items():\\n            heapq.heappush(freqs, (Element(count, word), word))\\n            if len(freqs) > k:\\n                heapq.heappop(freqs)\\n        \\n        res = []\\n        for _ in range(k):\\n            res.append(heapq.heappop(freqs)[1])\\n        return res[::-1]\\n    \\n```"
		},
		{
			"lc_ans_id":"108399",
			"view":"1441",
			"top":"2",
			"title":"Java O(n) solution using HashMap, BucketSort and Trie - 22ms Beat 81%",
			"vote":"6",
			"content":"This problem is quite similar to the problem [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/description/). You can refer to [this post](https://discuss.leetcode.com/topic/44237/java-o-n-solution-bucket-sort) for the solution of the problem.\\n\\nWe can solve this problem with the similar idea:\\nFirstly, we need to calculate the frequency of each word and store the result in a hashmap.\\n\\nSecondly, we will use bucket sort to store words. Why? Because the minimum frequency is greater than or equal to 1 and the maximum frequency is less than or equal to the length of the input string array. \\n\\nThirdly, we can define a trie within each bucket to store all the words with the same frequency. With Trie, it ensures that the lower alphabetical word will be met first, saving the trouble to sort the words within the bucket. \\n\\nFrom the above analysis, we can see the time complexity is O(n).\\nHere is my code:\\n```\\npublic List<String> topKFrequent(String[] words, int k) {\\n        // calculate frequency of each word\\n        Map<String, Integer> freqMap = new HashMap<>();\\n        for(String word : words) {\\n            freqMap.put(word, freqMap.getOrDefault(word, 0) + 1);\\n        }\\n        // build the buckets\\n        TrieNode[] count = new TrieNode[words.length + 1];\\n        for(String word : freqMap.keySet()) {\\n            int freq = freqMap.get(word);\\n            if(count[freq] == null) {\\n                count[freq] = new TrieNode();\\n            }\\n            addWord(count[freq], word);\\n        }\\n        // get k frequent words\\n        List<String> list = new LinkedList<>();\\n        for(int f = count.length - 1; f >= 1 && list.size() < k; f--) {\\n            if(count[f] == null) continue;\\n            getWords(count[f], list, k);\\n        }\\n        return list;\\n    }\\n    \\n    private void getWords(TrieNode node, List<String> list, int k) {\\n        if(node == null) return;\\n        if(node.word != null) {\\n            list.add(node.word);\\n        }\\n        if(list.size() == k) return;\\n        for(int i = 0; i < 26; i++) {\\n            if(node.next[i] != null) {\\n                getWords(node.next[i], list, k);\\n            }\\n        }\\n    }\\n    \\n    private boolean addWord(TrieNode root, String word) {\\n        TrieNode curr = root;\\n        for(char c : word.toCharArray()) {\\n            if(curr.next[c - 'a'] == null) {\\n                curr.next[c - 'a'] = new TrieNode();\\n            }\\n            curr = curr.next[c - 'a'];\\n        }\\n        curr.word = word;\\n        return true;\\n    }\\n    \\n    class TrieNode {\\n        TrieNode[] next;\\n        String word;\\n        TrieNode() {\\n            this.next = new TrieNode[26];\\n            this.word = null;\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"108359",
			"view":"789",
			"top":"3",
			"title":"Java HashMap & MaxHeap O(nlogn)",
			"vote":"5",
			"content":"Below solution is MaxHeap with O(nlogn) time.  For O(nlogk), please refer to [min heap solution](https://discuss.leetcode.com/topic/107751/my-simple-java-solution-using-hashmap-priorityqueue-o-nlogk-time-o-n-space)\\n\\n```\\npublic List<String> topKFrequent(String[] words, int k) {\\n        HashMap<String, Integer > map = new HashMap<>();\\n        for (String s : words)  map.put(s, map.getOrDefault(s,0) + 1);  // Frequent hashmap\\n        \\n        PriorityQueue<Map.Entry<String,Integer>> maxHeap = new PriorityQueue<>(k, (a,b) -> \\n            a.getValue()==b.getValue() ? a.getKey().compareTo(b.getKey()) : b.getValue()-a.getValue()); \\n        // if same frequency, then sort alphabetical .  \\n        \\n        for (Map.Entry<String,Integer> entry : map.entrySet() ) maxHeap.add(entry);\\n        \\n        List<String> res = new ArrayList<>();\\n        while (res.size() < k) res.add(maxHeap.poll().getKey());  //add top k\\n        return res;\\n}\\n```"
		},
		{
			"lc_ans_id":"108366",
			"view":"1332",
			"top":"4",
			"title":"O(nlog(k)) Priority Queue C++ code",
			"vote":"4",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<string> topKFrequent(vector<string>& words, int k) {\\n        unordered_map<string, int> freq;\\n        for(auto w : words){\\n            freq[w]++;\\n        }\\n        \\n        auto comp = [&](const pair<string,int>& a, const pair<string,int>& b) {\\n            return a.second > b.second || (a.second == b.second && a.first < b.first);\\n        };\\n        typedef priority_queue< pair<string,int>, vector<pair<string,int>>, decltype(comp) > my_priority_queue_t;\\n        my_priority_queue_t  pq(comp);\\n        \\n        for(auto w : freq ){\\n            pq.emplace(w.first, w.second);\\n            if(pq.size()>k) pq.pop();\\n        }\\n        \\n        vector<string> output;\\n        while(!pq.empty()){\\n            output.insert(output.begin(), pq.top().first);\\n            pq.pop();\\n        }\\n        return output;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108384",
			"view":"1039",
			"top":"5",
			"title":"Python with explanation",
			"vote":"3",
			"content":"We know that the maximum frequency of words cannot exceed N because there is only a maximum of N words.\\n\\nInput: `[\"i\", \"love\", \"leetcode\", \"i\", \"love\", \"coding\"]`\\n\\nFrequency: `{\"i\": 2, \"love\": 2, \"leetcode\": 1, \"coding\": 1}`\\n\\nGroup by frequency: `{ 1: [\"leetcode\", \"coding\"], 2: [\"i\", \"love\"] }`\\n\\nHence we can count the frequency of the words and group them by frequency. Iterate through the group starting from a frequency of N and collect until you have at least k words. We then sort the final list and that takes approximately O(klgk), worst case O(nlgn) if every word only appears once.\\n\\n```\\nclass Solution(object):\\n    def topKFrequent(self, words, k):\\n        \"\"\"\\n        :type words: List[str]\\n        :type k: int\\n        :rtype: List[str]\\n        \"\"\"\\n        # Time: O(n + klgk)\\n        # Space: O(n)\\n        from collections import Counter\\n        counter = Counter(words)\\n        freqs = {}\\n        for word, count in counter.items():\\n            if count not in freqs:\\n                freqs[count] = []\\n            freqs[count].append(word)\\n        res = []\\n        for i in range(len(words), 0, -1):\\n            if i in freqs:\\n                for word in freqs[i]:\\n                    res.append((word, i))\\n            if len(res) >= k:\\n                break\\n        res.sort(cmp=lambda a, b: (b[1] - a[1]) if a[1] != b[1] else (-1 if a[0] < b[0] else 1))\\n        return [el[0] for el in res[:k]]\\n```\\n\\n*- Yangshun*"
		},
		{
			"lc_ans_id":"108355",
			"view":"101",
			"top":"6",
			"title":"Simplest Python Solution",
			"vote":"2",
			"content":"```\\n    def topKFrequent(self, words, k):\\n        d = {}\\n        for word in words:\\n            d[word] = d.get(word, 0) + 1\\n        \\n        ret = sorted(d, key=lambda word: (-d[word], word))\\n        \\n        return ret[:k]\\n```"
		},
		{
			"lc_ans_id":"108361",
			"view":"1403",
			"top":"7",
			"title":"Java solution, O(n) extra space, O(nlogk) time",
			"vote":"2",
			"content":"```\\n       public List<String> topKFrequent(String[] words, int k) {\\n            Map<String, Integer> map = new HashMap<>();\\n            for (String word : words) {\\n                map.put(word, map.getOrDefault(word, 0) + 1);\\n            }\\n\\n            SortedSet<Map.Entry<String, Integer>> sortedset = new TreeSet<>(\\n                    (e1, e2) -> {\\n                        if (e1.getValue() != e2.getValue()) {\\n                            return e2.getValue() - e1.getValue();\\n                        } else {\\n                            return e1.getKey().compareToIgnoreCase(e2.getKey());\\n                        }\\n                    });\\n            sortedset.addAll(map.entrySet());\\n\\n            List<String> result = new ArrayList<>();\\n            Iterator<Map.Entry<String, Integer>> iterator = sortedset.iterator();\\n            while (iterator.hasNext() && k-- > 0) {\\n                result.add(iterator.next().getKey());\\n            }\\n            return result;\\n        }\\n```"
		},
		{
			"lc_ans_id":"108360",
			"view":"2306",
			"top":"8",
			"title":"O(nlog(k)) PriorityQueue simple",
			"vote":"2",
			"content":"class Solution {\\n    public List<String> topKFrequent(String[] words, int k) {\\n        HashMap<String, Integer> map = new HashMap();\\n        for(String s : words){\\n            map.put(s, map.getOrDefault(s, 0) + 1);\\n        }\\n        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>((a, b) -> a.getValue() == b.getValue() ? b.getKey().compareTo(a.getKey())\\n                                                                            : a.getValue() - b.getValue());\\n        for(Map.Entry<String, Integer> m : map.entrySet()){\\n            if(pq.size() < k){\\n                pq.offer(m);\\n            }else{\\n                if(pq.peek().getValue() < m.getValue()){\\n                    pq.poll();\\n                    pq.offer(m);\\n                }else if(pq.peek().getValue() == m.getValue() && pq.peek().getKey().compareTo(m.getKey()) > 0){\\n                     pq.poll();\\n                     pq.offer(m);\\n                }\\n            }\\n        }\\n        List<String> rs = new ArrayList<>();\\n        while(!pq.isEmpty()) rs.add(0, pq.poll().getKey());\\n        return rs;\\n    }\\n}"
		},
		{
			"lc_ans_id":"108365",
			"view":"116",
			"top":"9",
			"title":"An easy python solution!",
			"vote":"1",
			"content":"```\\nfrom heapq import *\\nclass Solution(object):\\n    def topKFrequent(self, words, k):\\n        \"\"\"\\n        :type words: List[str]\\n        :type k: int\\n        :rtype: List[str]\\n        \"\"\"\\n        dic = {}\\n        for i in words:\\n            dic[i] = dic.get(i, 0) - 1\\n        tu = [(i, n) for n, i in dic.items()]\\n        h = nsmallest(k, tu)\\n        return [i[1] for i in h]\\n```"
		}
	],
	"id":"669",
	"title":"Top K Frequent Words",
	"content":"<p>Given a non-empty list of words, return the <i>k</i> most frequent elements.</p>\r\n<p>Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [\"i\", \"love\", \"leetcode\", \"i\", \"love\", \"coding\"], k = 2\r\n<b>Output:</b> [\"i\", \"love\"]\r\n<b>Explanation:</b> \"i\" and \"love\" are the two most frequent words.\r\n    Note that \"i\" comes before \"love\" due to a lower alphabetical order.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [\"the\", \"day\", \"is\", \"sunny\", \"the\", \"the\", \"the\", \"sunny\", \"is\", \"is\"], k = 4\r\n<b>Output:</b> [\"the\", \"is\", \"sunny\", \"day\"]\r\n<b>Explanation:</b> \"the\", \"is\", \"sunny\" and \"day\" are the four most frequent words,\r\n    with the number of occurrence being 4, 3, 2 and 1 respectively.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>You may assume <i>k</i> is always valid, 1 &le; <i>k</i> &le; number of unique elements.</li>\r\n<li>Input words contain only lowercase letters.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Follow up:</b><br />\r\n<ol>\r\n<li>Try to solve it in <i>O</i>(<i>n</i> log <i>k</i>) time and <i>O</i>(<i>n</i>) extra space.</li>\r\n</ol>\r\n</p>",
	"frequency":"184",
	"ac_num":"11530"
}