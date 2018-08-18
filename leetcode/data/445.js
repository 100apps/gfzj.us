{
	"difficulty":"2",
	"submit_num":"88620",
	"show_id":"451",
	"leetcode_id":"451",
	"answers":[
		{
			"lc_ans_id":"93404",
			"view":"16053",
			"top":"0",
			"title":"C++ O(n) solution without sort()",
			"vote":"50",
			"content":"```\\nclass Solution {\\npublic:\\n    string frequencySort(string s) {\\n        unordered_map<char,int> freq;\\n        vector<string> bucket(s.size()+1, \"\");\\n        string res;\\n        \\n        //count frequency of each character\\n        for(char c:s) freq[c]++;\\n        //put character into frequency bucket\\n        for(auto& it:freq) {\\n            int n = it.second;\\n            char c = it.first;\\n            bucket[n].append(n, c);\\n        }\\n        //form descending sorted string\\n        for(int i=s.size(); i>0; i--) {\\n            if(!bucket[i].empty())\\n                res.append(bucket[i]);\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"93420",
			"view":"14777",
			"top":"1",
			"title":"Java O(n) Bucket Sort Solution / O(nlogn) PriorityQueue Solution, easy to understand",
			"vote":"36",
			"content":"The logic is very similar to NO.347 and here we just use a map a count and according to the frequency to put it into the right bucket. Then we go through the bucket to get the most frequently character and append that to the final stringbuilder.\\n```\\npublic class Solution {\\n    public String frequencySort(String s) {\\n        Map<Character, Integer> map = new HashMap<>();\\n        for (char c : s.toCharArray()) {\\n            if (map.containsKey(c)) {\\n                map.put(c, map.get(c) + 1);\\n            } else {\\n                map.put(c, 1);\\n            }\\n        }\\n        List<Character> [] bucket = new List[s.length() + 1];\\n        for (char key : map.keySet()) {\\n            int frequency = map.get(key);\\n            if (bucket[frequency] == null) {\\n                bucket[frequency] = new ArrayList<>();\\n            }\\n            bucket[frequency].add(key);\\n        }\\n        StringBuilder sb = new StringBuilder();\\n        for (int pos = bucket.length - 1; pos >=0; pos--) {\\n            if (bucket[pos] != null) {\\n                for (char num : bucket[pos]) {\\n                    for (int i = 0; i < map.get(num); i++) {\\n                        sb.append(num);\\n                    }\\n                }\\n            }\\n        }\\n        return sb.toString();\\n    }\\n}\\n\\n````\\n\\n\\nAnd we have normal way using PriorityQueue as follows:\\n```\\npublic class Solution {\\n    public String frequencySort(String s) {\\n        Map<Character, Integer> map = new HashMap<>();\\n        for (char c : s.toCharArray()) {\\n            if (map.containsKey(c)) {\\n                map.put(c, map.get(c) + 1);\\n            } else {\\n                map.put(c, 1);\\n            }\\n        }\\n        PriorityQueue<Map.Entry<Character, Integer>> pq = new PriorityQueue<>(\\n            new Comparator<Map.Entry<Character, Integer>>() {\\n                @Override\\n                public int compare(Map.Entry<Character, Integer> a, Map.Entry<Character, Integer> b) {\\n                    return b.getValue() - a.getValue();\\n                }\\n            }\\n        );\\n        pq.addAll(map.entrySet());\\n        StringBuilder sb = new StringBuilder();\\n        while (!pq.isEmpty()) {\\n            Map.Entry e = pq.poll();\\n            for (int i = 0; i < (int)e.getValue(); i++) {\\n                sb.append(e.getKey());\\n            }\\n        }\\n        return sb.toString();\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"93445",
			"view":"19368",
			"top":"2",
			"title":"O(n) Easy to understand Java Solution",
			"vote":"26",
			"content":"1. Build a map of characters to the number of times it occurs in the string\\n2. Create an array where the index of the array represents how many times that character occurred in the String\\n3. Iterate from the end of the array to the beginning, and at each index, append each character to the return string that number of times.\\n\\n```\\npublic String frequencySort(String s) {\\n    if (s == null) {\\n        return null;\\n    }\\n    Map<Character, Integer> map = new HashMap();\\n    char[] charArray = s.toCharArray();\\n    int max = 0;\\n    for (Character c : charArray) {\\n        if (!map.containsKey(c)) {\\n            map.put(c, 0);\\n        }\\n        map.put(c, map.get(c) + 1);\\n        max = Math.max(max, map.get(c));\\n    }\\n\\n    List<Character>[] array = buildArray(map, max);\\n\\n    return buildString(array);\\n}\\n\\nprivate List<Character>[] buildArray(Map<Character, Integer> map, int maxCount) {\\n    List<Character>[] array = new List[maxCount + 1];\\n    for (Character c : map.keySet()) {\\n        int count = map.get(c);\\n        if (array[count] == null) {\\n            array[count] = new ArrayList();\\n        }\\n        array[count].add(c);\\n    }\\n    return array;\\n}\\n\\nprivate String buildString(List<Character>[] array) {\\n    StringBuilder sb = new StringBuilder();\\n    for (int i = array.length - 1; i > 0; i--) {\\n        List<Character> list = array[i];\\n        if (list != null) {\\n            for (Character c : list) {\\n                for (int j = 0; j < i; j++) {\\n                    sb.append(c);\\n                }\\n            }\\n        }\\n    }\\n    return sb.toString();\\n}\\n```"
		},
		{
			"lc_ans_id":"93409",
			"view":"4892",
			"top":"3",
			"title":"Concise C++ solution using STL sort",
			"vote":"19",
			"content":"```\\nclass Solution {\\npublic:\\n    string frequencySort(string s) {\\n        int counts[256] = {0};\\n        for (char ch : s)\\n            ++counts[ch];\\n        sort(s.begin(), s.end(), [&](char a, char b) { \\n            return counts[a] > counts[b] || (counts[a] == counts[b] && a < b); \\n        });\\n        return s;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"93521",
			"view":"6485",
			"top":"4",
			"title":"Super simple O(n) Bucket Sort based Java solution (11 ms). No fancy Data structure needed. Beats 96%.",
			"vote":"14",
			"content":"Could not find a simpler way to do this. I see people are using HashMap/TreeMap which are not at all required. If you know bucket sort then following solution will be easy to understand!\\n\\n```\\npublic String frequencySort(String s) {\\n        if(s.length() < 3)\\n            return s;\\n        int max = 0;\\n        int[] map = new int[256];\\n        for(char ch : s.toCharArray()) {\\n            map[ch]++;\\n            max = Math.max(max,map[ch]);\\n        }\\n        String[] buckets = new String[max + 1]; // create max buckets\\n        for(int i = 0 ; i < 256; i++) { // join chars in the same bucket\\n            String str = buckets[map[i]];\\n            if(map[i] > 0)\\n                buckets[map[i]] = (str == null) ? \"\" + (char)i : (str + (char) i);\\n        }\\n        StringBuilder strb = new StringBuilder();\\n        for(int i = max; i >= 0; i--) { // create string for each bucket.\\n            if(buckets[i] != null)\\n                for(char ch : buckets[i].toCharArray())\\n                    for(int j = 0; j < i; j++)\\n                        strb.append(ch);\\n        }\\n        return strb.toString();\\n    }\\n```"
		},
		{
			"lc_ans_id":"93519",
			"view":"3293",
			"top":"5",
			"title":"Python O(N) solution using Hash-Map.",
			"vote":"12",
			"content":"* Frequency of a character can vary from 0 to len(s).\\n* Create a hashmap H1 of character to character frequency for the input string.\\n* Iterate H1 to create hashmap H2 with key as frequency and value as substrings of repeated strings with length as the frequency.\\n* Finally lookup all potential frequencies in decreasing order in H2 and produce the final result.\\n```\\nfrom collections import Counter\\nclass Solution(object):\\n    def frequencySort(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: str\\n        \"\"\"\\n        c1, c2 = Counter(s), {}\\n        for k,v in c1.items():\\n            c2.setdefault(v, []).append(k*v)\\n        return \"\".join([\"\".join(c2[i]) for i in range(len(s), -1, -1) if i in c2])\\n```"
		},
		{
			"lc_ans_id":"93410",
			"view":"2897",
			"top":"6",
			"title":"1 line Python code.",
			"vote":"12",
			"content":"```\\nclass Solution(object):\\n    def frequencySort(self, str):\\n        \"\"\"\\n        :type str: str\\n        :rtype: str\\n        \"\"\"\\n        return \"\".join([char * times for char, times in collections.Counter(str).most_common()])\\n```"
		},
		{
			"lc_ans_id":"93535",
			"view":"1810",
			"top":"7",
			"title":"Java O(n) bucket sort + HashMap",
			"vote":"8",
			"content":"    public String frequencySort(String s) {\\n        char[] arr = s.toCharArray();\\n        \\n        // bucket sort\\n        int[] count = new int[256];\\n        for(char c : arr) count[c]++;\\n        \\n        // count values and their corresponding letters\\n        Map<Integer, List<Character>> map = new HashMap<>();\\n        for(int i = 0; i < 256; i++){\\n            if(count[i] == 0) continue;\\n            int cnt = count[i];\\n            if(!map.containsKey(cnt)){\\n                map.put(cnt, new ArrayList<Character>());\\n            }\\n            map.get(cnt).add((char)i);\\n        }\\n   \\n        // loop throught possible count values\\n        StringBuilder sb = new StringBuilder();\\n        for(int cnt = arr.length; cnt > 0; cnt--){ \\n            if(!map.containsKey(cnt)) continue;\\n            List<Character> list = map.get(cnt);\\n            for(Character c: list){\\n                for(int i = 0; i < cnt; i++){\\n                    sb.append(c);\\n                }\\n            }\\n        }\\n        return sb.toString();\\n    }\\n------------\\nEdit:\\nThis method has an assumption that there are 256 or less possible numbers of characters (which should not always be true). If the question requires the entire set of unicode, this method is not efficient enough."
		},
		{
			"lc_ans_id":"93499",
			"view":"1041",
			"top":"8",
			"title":"C++ with std::unordered_map and std::sort",
			"vote":"6",
			"content":"```\\nclass Solution {\\npublic:\\n    string frequencySort(string s) {\\n        unordered_map<char, int> hist;\\n        for (auto c : s) {\\n            ++hist[c];\\n        }\\n        \\n        auto pred = [&hist] (char a, char b) {\\n            return hist[a] > hist[b] || (hist[a] == hist[b] && a > b);\\n        };\\n        \\n        sort(s.begin(), s.end(), pred);\\n        \\n        return s;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"93411",
			"view":"631",
			"top":"9",
			"title":"Two ways of Python Solution, easy to understand.",
			"vote":"5",
			"content":"The basic idea is \\n1. Count the char;\\n2. Sort the counts of all chars;\\n3. Construct return String from the char with highest counts\\nAlthough it is really easy to use collections.Counter(Solution1), I still re-code it using normal operations(Solution2). Cos in most interviews, I guess you are supposed to write the code in the second way.\\nHappy coding!!! \\n\\nThis is a solution based on collections.Counter\\n```\\nclass Solution(object):\\n    def frequencySort(self, s):\\n        import collections\\n        if not s:\\n            return \"\"\\n        count_s = collections.Counter(s)\\n        counter = count_s.most_common()\\n        rs = ''\\n        for i in counter:\\n            rs += i[0] * i[1]\\n        return rs\\n```\\n\\nThis is a solution that doesn't use collections.Counter\\n```\\nclass Solution(object):\\n    def frequencySort(self, s):\\n        import operator\\n        if not s:\\n            return \"\"\\n        counter = {}; rs = ''\\n        for i in s:\\n            counter[i] = 1 if i not in counter else counter[i]+1\\n        sorted_counter = sorted(counter.items(), key=operator.itemgetter(1))\\n        sorted_counter.reverse()\\n        for i in sorted_counter:\\n            rs += i[0] * i[1]\\n        return rs\\n```"
		}
	],
	"id":"445",
	"title":"Sort Characters By Frequency",
	"content":"<p>Given a string, sort it in decreasing order based on the frequency of characters.</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b>\r\n\"tree\"\r\n\r\n<b>Output:</b>\r\n\"eert\"\r\n\r\n<b>Explanation:</b>\r\n'e' appears twice while 'r' and 't' both appear once.\r\nSo 'e' must appear before both 'r' and 't'. Therefore \"eetr\" is also a valid answer.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b>\r\n\"cccaaa\"\r\n\r\n<b>Output:</b>\r\n\"cccaaa\"\r\n\r\n<b>Explanation:</b>\r\nBoth 'c' and 'a' appear three times, so \"aaaccc\" is also a valid answer.\r\nNote that \"cacaca\" is incorrect, as the same characters must be together.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b>\r\n<pre>\r\n<b>Input:</b>\r\n\"Aabb\"\r\n\r\n<b>Output:</b>\r\n\"bbAa\"\r\n\r\n<b>Explanation:</b>\r\n\"bbaA\" is also a valid answer, but \"Aabb\" is incorrect.\r\nNote that 'A' and 'a' are treated as two different characters.\r\n</pre>\r\n</p>",
	"frequency":"297",
	"ac_num":"45597"
}